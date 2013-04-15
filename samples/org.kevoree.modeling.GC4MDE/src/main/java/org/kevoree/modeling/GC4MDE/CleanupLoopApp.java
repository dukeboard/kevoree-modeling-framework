package org.kevoree.modeling.GC4MDE;

import org.kermeta.language.structure.Metamodel;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 15/04/13
 * Time: 15:39
 */
public class CleanupLoopApp {

    public static void main(String[] args) {
        SimpleLoopApp app = new SimpleLoopApp(){
            @Override
            public void cleanupModel(List<Metamodel> models) {
                for(Metamodel mm : models){
                    mm.delete();
                }
            }
        };
        app.test();
    }

}
