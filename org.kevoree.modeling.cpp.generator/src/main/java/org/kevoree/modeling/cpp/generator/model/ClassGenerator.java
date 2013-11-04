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


    private Template gen_method_add;
    private Template gen_method_remove;
    private Template gen_visitor;
    private Template gen_visitor_ref;
    private Template gen_destructor_ref;

    public ClassGenerator(GenerationContext   ctx){
        this.ctx = ctx;
        ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName()) ;
        ve.init();
        gen_method_add = ve.getTemplate("templates/add_method.vm");
        gen_method_remove = ve.getTemplate("templates/remove_method.vm");
        gen_visitor = ve.getTemplate("templates/visitor.vm");
        gen_visitor_ref = ve.getTemplate("templates/visitor_ref.vm");
        gen_destructor_ref = ve.getTemplate("templates/destructor_ref.vm");
    }



    public String generateClass(EClass cls) throws IOException {

        initGeneration();
        generateBeginClassHeader(cls);
        generateAttributes(cls);
        generateMethodAdd(cls);
        generateMethodRemove(cls);
        generateGettermetaClassName(cls);
        generateFlatReflexiveSetters(cls);
        generateFindById(cls);
        generateVisitor( cls);
        generateVisitorAttribute(cls);
        generateDestructor(cls);
        generateConstructorMethod(cls);
        generateDestructorMethod(cls);
        link_generation();
        generateEndClass(cls);
        writeHeader(cls);

        return class_result.toString();
    }


    private void generateDestructor(EClass cls) {
        StringWriter result = new StringWriter();

        for(EReference ref :cls.getEAllReferences())
        {
            if(ref.getUpperBound() == -1 &&   ref.getEReferenceType().getEIDAttribute() != null)
            {


                VelocityContext context = new VelocityContext();
                context.put("refname",ref.getName());
                context.put("type",ref.getEReferenceType().getName());

                gen_destructor_ref.merge(context,result);            }
        }
        add_DESTRUCTOR(result.toString());
    }

    private void generateGettermetaClassName(EClass cls) {
        add_H("string metaClassName();");
        add_CPP("string "+cls.getName()+"::metaClassName() {");
        add_CPP("return \""+cls.getName()+"\";");
        add_CPP("}");
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
                    context_visitor_ref.put("debug",msg_DEBUG(cls,"Visiting reference "+ref.getName()));
                }else {
                    context_visitor_ref.put("debug","");
                }


                gen_visitor_ref.merge(context_visitor_ref,result_visitor_ref);
            }
        }


        VelocityContext context_visitor = new VelocityContext();
        StringWriter result_visitor = new StringWriter();
        context_visitor.put("classname",cls.getName());
        context_visitor.put("visitor_refs",result_visitor_ref);

        if(ctx.isDebug_model()){
            context_visitor.put("debug",msg_DEBUG(cls,"Visiting class "+cls.getName()));
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

        for(EAttribute a: cls.getEAttributes() )
        {
            ADD_DEBUG(cls,"Visiting attribute -> "+a.getName());
            add_CPP("visitor->visit(any("+a.getName()+"),\""+a.getName()+"\",this);");
        }

        add_CPP("}");


    }

    private void generateMethodRemove(EClass cls) {

        for(EReference ref : cls.getEReferences()  ){

            String type = ConverterDataTypes.getInstance().getType(ref.getEReferenceType().getName());
            add_H("void remove"+ref.getName()+"("+type+" *ptr);");


            if(ref.getUpperBound() == -1)
            {
                if(ref.getEReferenceType().getEIDAttribute() == null)
                {
                    add_CPP("void " + cls.getName() + "::remove" + ref.getName() + "(" + type + " *ptr){");
                    add_CPP("delete ptr;");
                    add_CPP("}\n");
                }else
                {
                    VelocityContext context = new VelocityContext();
                    context.put("classname",cls.getName());
                    context.put("refname",ref.getName());
                    context.put("typeadd",type);

                    StringWriter result = new StringWriter();
                    gen_method_remove.merge(context, result);
                    add_CPP(result.toString());
                }

            }  else
            {
                add_CPP("void " + cls.getName() + "::remove" + ref.getName() + "(" + type + " *ptr){");
                add_CPP("delete ptr;");
                add_CPP("}\n");
            }

        }
    }


    public void generateMethodAdd(EClass cls)
    {
        for(EReference ref : cls.getEReferences()  ){

            String type = ConverterDataTypes.getInstance().getType(ref.getEReferenceType().getName());
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
    }

    public void generateinternalGetKey(EClass cls)
    {

        List<EAttribute> eAttribute  = new ArrayList<EAttribute>();

        for(EAttribute a : cls.getEAllAttributes()){
            if(a.isID()){
                eAttribute.add(a);
            }
        }

        if(eAttribute.size() >0){

            String type = ConverterDataTypes.getInstance().getType(eAttribute.get(0).getEAttributeType().getName());
            add_H(type+" internalGetKey();");
            add_CPP(type + " " + cls.getName() + "::internalGetKey(){");
            class_result.append("return ");

            for(int i=0;i<eAttribute.size();i++){
                class_result.append(eAttribute.get(i).getName());
                if(i < eAttribute.size()-1){
                    class_result.append("+");
                }
            }

            add_CPP(";");

            add_CPP("}");
        }  else {
            // generate ID
            add_H("std::string"+" internalGetKey();");
            add_CPP("std::string" + " " + cls.getName() + "::internalGetKey(){");

            // TODO   gene



            add_CPP("}");

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

        for( EAttribute eAttribute : cls.getEAttributes() )
        {
            add_PUBLIC_ATTRIBUTE(ConverterDataTypes.getInstance().getType(eAttribute.getEAttributeType().getName()));
            add_PUBLIC_ATTRIBUTE(" "+eAttribute.getName()+";\n");


        }

        generateinternalGetKey(cls);


        for(EReference ref : cls.getEReferences()  ){

            String gen_type;
            String type_ref = ref.getEReferenceType().getName();

            if(ref.getEReferenceType().getEAllReferences().contains(cls)){
                // cycle dependency
                if(!type_ref.equals(cls.getName())){
                    header.append("class "+type_ref+";\n\n");
                }

            }else {
                if(!type_ref.equals(cls.getName())){
                    //   header.append(  HelperGenerator.genIncludeLocal(type_ref));
                    header.append("class "+type_ref+";\n\n");
                }

                //
            }





            gen_type = ConverterDataTypes.getInstance().getType(ref.getEReferenceType().getName());


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
                // TODO implements shared_ptr to fix delete from other class
                add_PUBLIC_ATTRIBUTE(gen_type+" *"+ref.getName()+"; \n");
            }

        }


    }


    public void generateBeginClassHeader(EClass cls)
    {
        String name =   cls.getName();
        add_HEADER(HelperGenerator.genIFDEF(name));
        //  add_CPP(HelperGenerator.genIncludeLocal(name));

        //
        add_HEADER(HelperGenerator.genInclude("list"));
        add_HEADER(HelperGenerator.genInclude("string"));
        add_HEADER(HelperGenerator.genInclude("google/dense_hash_map"));

        if(cls.getESuperTypes().size() >0)
        {
            gen_class.append("class "+name+" : ");  // FIX
        } else {
            add_HEADER(HelperGenerator.genInclude("KMFContainerImpl.h"));
            gen_class.append("class "+name+" : public KMFContainerImpl");
        }

        boolean first = true;
        int i=0;


        for(EClass super_eclass : cls.getESuperTypes() )
        {
            /*
            TODO FIX ME CHECK DIAMANT ISSUE  ADD VIRTUAL ON ONE C++ CLASS
             */

            add_HEADER(HelperGenerator.genIncludeLocal(super_eclass.getName()));
            //    add_HEADER("class "+super_eclass.getName()+"\n");

            // implements
            gen_class.append("public " + super_eclass.getName());


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





    public void writeHeader(EClass cls) throws IOException {
        // WRITE
        FileManager.writeFile(ctx.getPackageGenerationDirectory()+cls.getName()+".h", api_result.toString(),false);
    }




}
