package org.kevoree.modeling.cpp.generator.model;

import org.apache.velocity.Template;
import org.apache.velocity.app.VelocityEngine;
import org.eclipse.emf.ecore.EClass;
import org.kevoree.modeling.cpp.generator.GenerationContext;

/**
 * Created with IntelliJ IDEA.
 * User: jed
 * Date: 29/10/13
 * Time: 10:23
 * To change this templates use File | Settings | File Templates.
 */
public abstract  class AGenerator {
    protected GenerationContext ctx;
    protected StringBuilder header;
    protected StringBuilder gen_class;
    protected StringBuilder private_attributes;
    protected StringBuilder public_attributes;
    protected StringBuilder body;
    protected StringBuilder api_result;
    protected StringBuilder class_result;
    protected StringBuilder constructor;
    protected StringBuilder destructor;

    protected VelocityEngine ve = new VelocityEngine();

    protected void add_CONSTRUCTOR(String source){
       constructor.append(source+"\n");
   }

    protected void add_DESTRUCTOR(String source){
        destructor.append(source+"\n");
    }

    protected void add_CPP(String source){
        class_result.append(source+"\n");
    }

    protected String msg_DEBUG(EClass cls,String msg){
        return "LOGGER_WRITE(Logger::DEBUG_MODEL,\""+cls.getName()+" --> "+msg+"\");";
    }

    protected String msg_ERROR(EClass cls,String msg){
        return "LOGGER_WRITE(Logger::DEBUG_MODEL,\""+cls.getName()+" --> "+msg+"\");";
    }
    protected void ADD_DEBUG(EClass cls,String msg){
        if(ctx.isDebug_model()){
            add_CPP(msg_DEBUG(cls,msg));
        }
    }
    protected void add_H(String s){
        body.append(s+"\n");
    }

    protected void add_HEADER(String source){
        header.append(source);
    }

    protected void add_PUBLIC_ATTRIBUTE(String source){
        public_attributes.append(source);
    }

    protected void add_PRIVATE_ATTRIBUTE(String source){
        private_attributes.append(source);
    }
    protected void initGeneration(){
        header = new StringBuilder();
        gen_class = new StringBuilder();
        private_attributes = new StringBuilder();
        public_attributes = new StringBuilder();
        body = new StringBuilder();
        api_result = new StringBuilder();
        class_result = new StringBuilder() ;
        constructor = new StringBuilder();
        destructor = new StringBuilder();

    }



    protected void generateDestructorMethod(EClass cls) {
        add_H("~"+cls.getName()+"();\n");
        add_CPP(cls.getName()+"::~"+cls.getName()+"(){\n");
        add_CPP(destructor.toString());
        add_CPP("}\n");
    }

    protected void generateConstructorMethod(EClass cls) {

        add_H(cls.getName()+"();\n");
        add_CPP(cls.getName()+"::"+cls.getName()+"(){\n");
        add_CPP(constructor.toString());
        add_CPP("}\n");


    }

    public void link_generation(){
        api_result.append(header);
        api_result.append(gen_class);
        api_result.append(private_attributes);
        api_result.append(public_attributes);
        api_result.append(body);
    }

}
