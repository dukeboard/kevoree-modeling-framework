package org.kevoree.modeling.cpp.generator.model;

import org.eclipse.emf.ecore.EClass;
import org.kevoree.modeling.cpp.generator.GenerationContext;
import org.kevoree.modeling.cpp.generator.utils.FileManager;
import org.kevoree.modeling.cpp.generator.utils.HelperGenerator;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: jed
 * Date: 31/10/13
 * Time: 08:50
 * To change this template use File | Settings | File Templates.
 */
public class FactoryGenerator extends AGenerator
{

    private StringBuilder result = new StringBuilder();
    private String factoryname;
    private List<String> classes = new ArrayList<String>();
    public FactoryGenerator(GenerationContext context) {
        super();

        this.ctx=context;
        factoryname ="Default"+ctx.getName_package()+"Factory";
        initGeneration();
        generateClassHeader();
    }

    public void generateFactory(EClass e){
        if(!e.isAbstract() && !e.isInterface()){
            generateClass(e);
            classes.add(e.getName());
        }
    }


    public void generateClassHeader(){
        add_H(HelperGenerator.genIFDEF(factoryname));
        add_H(HelperGenerator.genIncludeLocal(ctx.getName_package()));
        add_H(HelperGenerator.genInclude("microframework/api/KMFFactory.h"));

        add_H("class "+factoryname+" : public KMFFactory {");
        add_H("public:");

    }
    public void generateClass(EClass e){
        add_CPP(e.getName() + "* create" + e.getName() + "(){return new " + e.getName() + "();\n};");
    }

    public void generateVersion()
    {
        add_H("string getVersion();");
        add_CPP("string getVersion(){ return "+ctx.getVersion()+";\n}");
    }

    public void generateCreate(){
        add_CPP("KMFContainer* create(std::string metaClassName){");
            for (String name : classes){
                add_CPP("if(metaClassName.compare(\"org."+ctx.getName_package()+"."+name+"\")==0){");
                add_CPP("return create"+name+"();");
                add_CPP("}");
            }
        add_CPP("return NULL;");
        add_CPP("}");
    }
    public void write(){
        link_generation();
        try
        {
            generateCreate();
            class_result.append("};\n"); // end class
            class_result.append(HelperGenerator.genENDIF());

            FileManager.writeFile(ctx.getPackageGenerationDirectory()+factoryname+".h", api_result.toString(),false);
            FileManager.writeFile(ctx.getPackageGenerationDirectory()+factoryname+".h", class_result.toString(),true);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }




}
