package org.kevoree.modeling.cpp.generator.model;

import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EReference;
import org.kevoree.modeling.cpp.generator.ConverterDataTypes;
import org.kevoree.modeling.cpp.generator.GenerationContext;
import org.kevoree.modeling.cpp.generator.utils.HelperGenerator;
import org.kevoree.modeling.cpp.generator.utils.FileManager;

import java.io.File;
import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: jed
 * Date: 28/10/13
 * Time: 11:26
 * To change this template use File | Settings | File Templates.
 */
public class ClassGenerator extends AClassGenerator {

    private GenerationContext ctx;

    public ClassGenerator(GenerationContext   ctx){
        this.ctx = ctx;
    }



    public void generateClass(EClass cls) throws IOException {

        initGeneration();

        generateBeginClassHeader(cls);
        generateAttributes(cls);
        generateFlatReflexiveSetters(ctx,cls);
        generateVisit(ctx,cls);
        generateConstructor(cls);
        generateDestructor(cls);
        link_generation();
        generateEndClass(cls);

        writeFiles(cls);

    }

    private void generateDestructor(EClass cls) {

        add_H("~"+cls.getName()+"();");

        add_CPP(cls.getName()+"::~"+cls.getName()+"(){\n");
        add_CPP(destructor.toString());
        add_CPP("}\n");

    }

    private void generateConstructor(EClass cls) {

        add_H(cls.getName()+"();");


        add_CPP(cls.getName()+"::"+cls.getName()+"(){\n");
        add_CPP(constructor.toString());
        add_CPP("}\n");


    }


    private void generateFlatReflexiveSetters(GenerationContext ctx,EClass eClass) {

        add_H("void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );\n");


        add_CPP("void "+eClass.getName()+"::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){\n");

        add_CPP("}\n");
    }


    private void generateVisit(GenerationContext ctx,EClass eClass){
        add_H("void visit(ModelVisitor visitor,bool recursive,bool containedReference ,bool nonContainedReference);\n");

        add_CPP("void "+eClass.getName()+"::visit(ModelVisitor visitor,bool recursive,bool containedReference ,bool nonContainedReference){\n");
        add_CPP("visitor.beginVisitElem(this);\n");
        add_CPP("}\n");
    }



    public void generateMethodAdd(EClass cls,EReference ref,String type)
    {

        add_H("void add"+ref.getName()+"("+type+" *ptr);\n");

        add_CPP("void "+cls.getName()+"::add"+ref.getName()+"("+type+" *ptr){\n");

        if(ref.getUpperBound() == -1)
        {
            if(ref.getEReferenceType().getEIDAttribute() == null)
            {
                add_CPP(ref.getName()+".push_back(ptr);\n");
            }else
            {

                add_CPP(ref.getName()+"[((KMFContainerImpl*)ptr)->internalGetKey()]=ptr;\n");
            }

        }  else
        {

            add_CPP(ref.getName()+" =ptr;\n");
        }

        add_CPP("}\n");
    }

    public void generateinternalGetKey(EClass cls,EAttribute eAttribute)  {

        String type = ConverterDataTypes.getInstance().getType(eAttribute.getEAttributeType().getName());
        add_H(type+" internalGetKey();\n");

        add_CPP(type+" "+cls.getName()+"::internalGetKey(){\n");
        add_CPP("return "+eAttribute.getName()+";\n");
        add_CPP("}\n");


    }

    public void generateFindbyId(EClass eClass,EReference ref){

        String type = ref.getEReferenceType().getName();
        String name = ref.getName();


        add_H(type + " *find" + name + "ByID(std::string id);\n");


        add_CPP(type+"* "+eClass.getName()+"::find"+name+"ByID(std::string id){\n");
        add_CPP("return "+ref.getName()+"[id];\n");
        add_CPP("}\n");


    }



    private void generateAttributes(EClass cls){


        add_PUBLIC_ATTRIBUTE("public:\n");
        for( EAttribute eAttribute : cls.getEAllAttributes() )
        {
            add_PUBLIC_ATTRIBUTE(ConverterDataTypes.getInstance().getType(eAttribute.getEAttributeType().getName()));
            add_PUBLIC_ATTRIBUTE(" "+eAttribute.getName()+";\n");
            if(eAttribute.isID())
            {    generateinternalGetKey(cls,eAttribute);

            }
        }


        for(EReference ref : cls.getEReferences()  ){

            String gen_type;
            String type_ref = ref.getEReferenceType().getName();
            header.append("class "+type_ref+";\n\n");
            // convert Type
            if(ConverterDataTypes.getInstance().dataTypes.containsKey(ref.getEReferenceType().getName())){
                gen_type = (ConverterDataTypes.getInstance().getType(ref.getEReferenceType().getName()));
            }  else
            {
                gen_type = (ref.getEReferenceType().getName());
            }


            if(ref.getUpperBound() == -1)
            {
                if(ref.getEReferenceType().getEIDAttribute() != null)
                {
                    add_PUBLIC_ATTRIBUTE("google::dense_hash_map<string,"+gen_type+"*> "+ref.getName()+"; \n") ;
                    add_CONSTRUCTOR(ref.getName() + ".set_empty_key(\"\");");
                    generateFindbyId(cls, ref);
                }  else
                {
                    add_PUBLIC_ATTRIBUTE("std::list<"+gen_type+"*>  "+ref.getName()+"; \n") ;
                }

            }else
            {
                add_PUBLIC_ATTRIBUTE(gen_type+" *"+ref.getName()+"; \n");
            }
            generateMethodAdd(cls,ref,gen_type);
        }


    }

    public void generateBeginClassHeader(EClass cls)
    {
        String name =   cls.getName();
        add_HEADER(HelperGenerator.genIFDEF(name));
        add_CPP(HelperGenerator.genIncludeLocal(name));

        add_HEADER(HelperGenerator.genInclude("KMFContainerImpl.h"));
        add_HEADER(HelperGenerator.genInclude("list"));
        add_HEADER(HelperGenerator.genInclude("string"));
        add_HEADER(HelperGenerator.genInclude("google/dense_hash_map"));

        if(cls.getESuperTypes().size() >0)
        {
            gen_class.append("class "+name+" : ");
        } else {
            gen_class.append("class "+name+" :public KMFContainerImpl");
        }

        boolean first = true;
        int i=0;
        for(EClass super_eclass : cls.getESuperTypes() )
        {
            // header inclule
            add_HEADER(HelperGenerator.genInclude(super_eclass.getName() + ".h"));

            // implements
            gen_class.append("public "+super_eclass.getName());
            if(first && i <cls.getESuperTypes().size()-1 ) {
                gen_class.append(",");
            }
            i++;
        }

        gen_class.append("{ \n");
    }


    public void generateEndClass(EClass cls){
        api_result.append("}; // END CLASS \n");
        api_result.append(HelperGenerator.genENDIF());
    }


    public void link_generation(){
        api_result.append(header);
        api_result.append(gen_class);
        api_result.append(private_attributes);
        api_result.append(public_attributes);
        api_result.append(body);
    }


    public void writeFiles(EClass cls) throws IOException {
        // WRITE
        String output =   ctx.getRootGenerationDirectory()+File.separatorChar+ctx.getName_package()+File.separatorChar;
        FileManager.writeFile(output+cls.getName()+".cpp",class_result.toString(),false);
        FileManager.writeFile(output+cls.getName()+".h", api_result.toString(),false);
    }




}
