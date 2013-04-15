package org.kevoree.modeling.GC4MDE.flyweight;

import org.kermeta.language.container.KMFContainer;
import org.kermeta.language.loader.ModelLoader;
import org.kermeta.language.loader.XMIModelLoader;
import org.kermeta.language.structure.Metamodel;
import org.kevoree.modeling.GC4MDE.SimpleLoopApp;

import java.util.List;
import java.util.Scanner;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 15/04/13
 * Time: 17:58
 */
public class SimpleVisitor {

    public static void main(String[] args){
        String content = buildTestRes();
        ModelLoader loader = new XMIModelLoader();
        List<Metamodel> models = loader.loadModelFromString(content);
        for(Metamodel mm : models){
            print(mm,0);
        }
    }

    public static String buildTestRes(){
        return new Scanner(SimpleLoopApp.class.getClassLoader().getResourceAsStream("kompren_beforeCheckingforScopeRESOLVED.km"),"UTF-8").useDelimiter("\\A").next();
    }

    private static  void print(KMFContainer elem, int indice){
        for(int i=0;i<indice;i++){System.out.print('\t');}
        System.out.println(elem);
        List<Object> subElems = elem.selectByQuery("contained[*]");
        for(Object subContainer : subElems){
            print((KMFContainer)subContainer,indice+1);
        }
    }




}
