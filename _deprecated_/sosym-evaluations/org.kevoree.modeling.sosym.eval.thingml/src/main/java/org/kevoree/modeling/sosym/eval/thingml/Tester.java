package org.kevoree.modeling.sosym.eval.thingml;

import kmf.thingml.Thing;
import kmf.thingml.impl.DefaultThingmlFactory;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 17/06/13
 * Time: 10:44
 * To change this template use File | Settings | File Templates.
 */
public class Tester {

    public static void main(String[] args) {

        DefaultThingmlFactory factory = new DefaultThingmlFactory();
        Thing t = factory.createThing();

        System.out.println(t.getClass().getName());

        Method[] methos = t.getClass().getMethods();
        for(int i=0;i<methos.length;i++){

            //if(Modifier.isAbstract(methos[i].getModifiers())){
                System.out.println(methos[i]);
            //}

        }


        t.setFragment(true);




    }

}
