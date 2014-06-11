package org.kevoree.modeling.cpp.generator.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: jed
 * Date: 09/10/13
 * Time: 11:47
 * To change this templates use File | Settings | File Templates.
 */
public class ConverterDataTypes {

   static ConverterDataTypes singleton = null;


 public static ConverterDataTypes getInstance(){
           if(singleton == null){
               singleton = new ConverterDataTypes();
           }
     return  singleton;
    }


     public List<String>  cpp_reserve = new ArrayList<String>();

     public  HashMap dataTypes = new HashMap<String, String>() ;

     public ConverterDataTypes(){


         cpp_reserve.add("namespace");
         cpp_reserve.add("Namespace");
         cpp_reserve.add("typeid");


         dataTypes.put("Object", "KMFContainer *")    ;
         dataTypes.put("EBigDecimal", "bigint")    ;
         dataTypes.put("EBigInteger", "bigint") ;
         dataTypes.put("EBoolean", "bool")    ;
         dataTypes.put("EBooleanObject", "short") ;
         dataTypes.put("EByte", "unsigned char")     ;
         dataTypes.put("EByteArray", "unsigned char[]");

         dataTypes.put("EChar", "char")   ;
         dataTypes.put("ECharacterObject", "char") ;
         dataTypes.put("EDate", "char")             ;
         dataTypes.put("EDiagnosticChain", "Any")    ;
         dataTypes.put("EDouble", "Double")           ;
         dataTypes.put("EDoubleObject", "Double")      ;
         dataTypes.put("EEList", "List")                ;
         dataTypes.put("EEnumerator", "Enum")            ;
         dataTypes.put("EFeatureMap", "Any")              ;
         dataTypes.put("EFeatureMapEntry", "Any");
         dataTypes.put("EFloat", "Float")                  ;
         dataTypes.put("EFloatObject", "Float")             ;
         dataTypes.put("EInt", "int")                        ;
         dataTypes.put("EIntegerObject", "int")               ;
         dataTypes.put("EJavaClass", "Class")                  ;
         dataTypes.put("EJavaObject", "Any")                    ;
         dataTypes.put("ELong", "Long")                          ;
         dataTypes.put("ELongObject", "Long")                     ;
         dataTypes.put("EMap", "Map")                              ;
         dataTypes.put("EResource", "Any") ;
         dataTypes.put("EResourceSet", "Any")                       ;
         dataTypes.put("EShort", "short")                            ;
         dataTypes.put("EShortObject", "Short")                       ;
         dataTypes.put("EString", "std::string")                            ;
         dataTypes.put("EStringToStringMapEntry", "Any")                ;
         dataTypes.put("ETreeIterator", "Any")                           ;
         dataTypes.put("EInvocationTargetException", "Any")               ;

    }

    public String check_type(String t){
        if(dataTypes.containsKey(t)){
            return dataTypes.get(t).toString() ;
        }   else {
            return t;
        }

    }


    public String check_class_name(String name)
    {
        if(cpp_reserve.contains(name)){
            return "_"+name;
        }  else {
            return name;
        }
    }




}
