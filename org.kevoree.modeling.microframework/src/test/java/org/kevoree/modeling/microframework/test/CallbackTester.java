package org.kevoree.modeling.microframework.test;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.util.CallBackChain;
import org.kevoree.modeling.api.util.Helper;

/**
 * Created by duke on 10/17/14.
 */
public class CallbackTester {

    //@Test
    public void callbackTest(){
        String[] big = new String[1000000];
        for(int i=0;i<big.length;i++){
            big[i]= "say_"+i;
        }
        Helper.forall(big, new CallBackChain<String>() {
            @Override
            public void on(String s, Callback<Throwable> next) {
                next.on(null);
            }
        }, new Callback<Throwable>() {
            @Override
            public void on(Throwable t) {
            }
        });

    }



}
