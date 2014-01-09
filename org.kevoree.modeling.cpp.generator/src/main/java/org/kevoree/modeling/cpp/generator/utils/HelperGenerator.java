package org.kevoree.modeling.cpp.generator.utils;



/**
 * Created with IntelliJ IDEA.
 * User: jed
 * Date: 09/10/13
 * Time: 13:29
 * To change this templates use File | Settings | File Templates.
 */
public class HelperGenerator {

    public static final String internal_id_name  = "generated_KMF_ID";
    public static String genInclude(String name){
        return   "#include <"+name+">\n";
    }


    public static String genIncludeLocal(String name){
        return   "#include \""+name+".h\"\n";
    }


    public static String genIFDEF(String name){
        return   "#ifndef __"+name+"_H\n" +
                "#define __"+name+"_H\n";
    }

    public static String genENDIF() {
        return "#endif\n";
    }
}
