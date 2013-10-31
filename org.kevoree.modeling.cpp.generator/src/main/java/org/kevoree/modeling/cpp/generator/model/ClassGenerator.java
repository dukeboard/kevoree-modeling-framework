package org.kevoree.modeling.cpp.generator.model;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EReference;
import org.kevoree.modeling.cpp.generator.utils.ConverterDataTypes;
import org.kevoree.modeling.cpp.generator.GenerationContext;
import org.kevoree.modeling.cpp.generator.utils.HelperGenerator;
import org.kevoree.modeling.cpp.generator.utils.FileManager;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: jed
 * Date: 28/10/13
 * Time: 11:26
 * To change this templates use File | Settings | File Templates.
 */
public class ClassGenerator extends AGenerator {

    private GenerationContext ctx;
    private Template gen_method_add;
    private Template gen_visitor;
    private Template gen_visitor_ref;

    public ClassGenerator(GenerationContext   ctx){
        this.ctx = ctx;
        ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName()) ;
        ve.init();
        gen_method_add = ve.getTemplate("templates/add_method.vm");
        gen_visitor = ve.getTemplate("templates/visitor.vm");
        gen_visitor_ref = ve.getTemplate("templates/visitor_ref.vm");
    }



    public void generateClass(EClass cls) throws IOException {

        initGeneration();
        generateBeginClassHeader(cls);
        generateAttributes(cls);
        generateFlatReflexiveSetters(cls);
        generateFindById(cls);
        generateVisitor( cls);
        generateVisitorAttribute(cls);
        generateConstructor(cls);
        generateDestructor(cls);
        link_generation();
        generateEndClass(cls);

        writeFiles(cls);

    }



    private void generateFindById(EClass cls)
    {


        Boolean add = true;
        Boolean end = false;
        for(EReference ref :cls.getEAllReferences())
        {
            if(ref.getUpperBound() == -1 &&   ref.getEReferenceType().getEIDAttribute() != null)
            {

                if(add)
                {
                    add_H("KMFContainer* findByID(string relationName,string idP);");
                    add_CPP("KMFContainer* " + cls.getName() + "::findByID(string relationName,string idP){");
                    add=false;
                    end = true;

                }

                add_CPP("if(relationName.compare(\""+ref.getName()+"\")== 0){");
                add_CPP("return (KMFContainer*)find"+ref.getName()+"ByID(idP);");
                add_CPP("}\n");
            }


        }

        if(end){
            add_CPP("return NULL;\n");
            add_CPP("}\n");

        }
    }


    private void generateFlatReflexiveSetters(EClass eClass) {

        add_H("void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent );");


        add_CPP("void " + eClass.getName() + "::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){");

        add_CPP("}\n");
    }


    private void generateVisitor(EClass cls){

        add_H("void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference);");

        StringWriter result_visitor_ref = new StringWriter();
        for(EReference ref :cls.getEAllReferences())
        {
            if(ref.getUpperBound() == -1 &&   ref.getEReferenceType().getEIDAttribute() != null)
            {


                VelocityContext context_visitor_ref = new VelocityContext();
                context_visitor_ref.put("refname",ref.getName());
                context_visitor_ref.put("type",ref.getEReferenceType().getName());
                if(ctx.isDebug_model()){
                    context_visitor_ref.put("debug","");
                }else {
                    context_visitor_ref.put("debug","");
                }


                gen_visitor_ref.merge(context_visitor_ref,result_visitor_ref);
            }
        }

        VelocityContext context_visitor = new VelocityContext();
        StringWriter result_visitor = new StringWriter();
        context_visitor.put("classname",cls.getName());
        context_visitor.put("visitor_refs",result_visitor_ref) ;
        if(ctx.isDebug_model()){
            context_visitor.put("debug","");
        }else {
            context_visitor.put("debug","");
        }
        gen_visitor.merge(context_visitor, result_visitor);

        add_CPP(result_visitor.toString());
    }

    private void generateVisitorAttribute(EClass cls)
    {
        add_H("void visitAttributes(ModelAttributeVisitor *visitor);");

        add_CPP("void "+cls.getName()+"::visitAttributes(ModelAttributeVisitor *visitor){");

        for(EAttribute a: cls.getEAllAttributes() )
        {
            ADD_DEBUG(cls,"Visiting attribute -> "+a.getName());
         add_CPP("visitor->visit(any("+a.getName()+"),\""+a.getName()+"\",this);");
        }

        add_CPP("}");


    }


    //  (agentsP as org.kevoree.planrouge.container.KMFContainerImpl).setEContainer(this,org.kevoree.planrouge.container.RemoveFromContainerCommand(this, org.kevoree.modeling.api.util.ActionType.REMOVE, org.kevoree.planrouge.util.Constants.Ref_agents, agentsP),org.kevoree.planrouge.util.Constants.Ref_agents)

    public void generateMethodAdd(EClass cls,EReference ref,String type)
    {

        add_H("void add"+ref.getName()+"("+type+" *ptr);");




        if(ref.getUpperBound() == -1)
        {
            if(ref.getEReferenceType().getEIDAttribute() == null)
            {
                add_CPP("void " + cls.getName() + "::add" + ref.getName() + "(" + type + " *ptr){");
                add_CPP(ref.getName()+".push_back(ptr);");
                add_CPP("}\n");
            }else
            {
                VelocityContext context = new VelocityContext();
                context.put("classname",cls.getName());
                context.put("refname",ref.getName());
                context.put("typeadd",type);

                StringWriter result = new StringWriter();
                gen_method_add.merge(context, result);
                add_CPP(result.toString());
            }

        }  else
        {
            add_CPP("void " + cls.getName() + "::add" + ref.getName() + "(" + type + " *ptr){");
            add_CPP(ref.getName()+" =ptr;");
            add_CPP("}\n");
        }


    }

    public void generateinternalGetKey(EClass cls,List<EAttribute> eAttribute)  {

        if(eAttribute.size() >0){
            String type = ConverterDataTypes.getInstance().getType(eAttribute.get(0).getEAttributeType().getName());
            add_H(type+" internalGetKey();");
            add_CPP(type + " " + cls.getName() + "::internalGetKey(){");
            add_CPP("return ");

            for(int i=0;i<eAttribute.size();i++){
                add_CPP(eAttribute.get(i).getName());
                if(i < eAttribute.size()-1){
                    add_CPP("+");
                }
            }

            add_CPP(";\n");

            add_CPP("}\n");
        }
    }

    public void generateFindbyIdAttribute(EClass eClass,EReference ref){

        String type = ref.getEReferenceType().getName();
        String name = ref.getName();


        add_H(type + " *find" + name + "ByID(std::string id);");

        add_CPP(type+"* "+eClass.getName()+"::find"+name+"ByID(std::string id){");
        add_CPP("return "+ref.getName()+"[id];");
        add_CPP("}");

    }



    private void generateAttributes(EClass cls){


        add_PUBLIC_ATTRIBUTE("public:\n");
        List<EAttribute> ids = new ArrayList<EAttribute>();
        for( EAttribute eAttribute : cls.getEAllAttributes() )
        {
            add_PUBLIC_ATTRIBUTE(ConverterDataTypes.getInstance().getType(eAttribute.getEAttributeType().getName()));
            add_PUBLIC_ATTRIBUTE(" "+eAttribute.getName()+";\n");

            if(eAttribute.isID())
            {
                ids.add(eAttribute);

            }
        }

        generateinternalGetKey(cls,ids);


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
                    generateFindbyIdAttribute(cls, ref);
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
            /*
            TODO FIX ME CHECK DIAMANT ISSUE  ADD VIRTUAL ON ONE C++ CLASS
             */

            add_HEADER(HelperGenerator.genIncludeLocal(super_eclass.getName()));

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
