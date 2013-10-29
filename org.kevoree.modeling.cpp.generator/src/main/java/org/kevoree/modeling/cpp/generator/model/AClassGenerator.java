package org.kevoree.modeling.cpp.generator.model;

/**
 * Created with IntelliJ IDEA.
 * User: jed
 * Date: 29/10/13
 * Time: 10:23
 * To change this template use File | Settings | File Templates.
 */
public abstract  class AClassGenerator {

    protected StringBuilder header;
    protected StringBuilder gen_class;
    protected StringBuilder private_attributes;
    protected StringBuilder public_attributes;
    protected StringBuilder body;
    protected StringBuilder api_result;
    protected StringBuilder class_result;
    protected StringBuilder constructor;
    protected StringBuilder destructor;


   protected void add_CONSTRUCTOR(String source){
       constructor.append(source+"\n");
   }

    protected void add_DESTRUCTOR(String source){
        constructor.append(source+"\n");
    }

    protected void add_CPP(String source){
        class_result.append(source);
    }
    protected void add_H(String s){
        body.append(s);
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

}
