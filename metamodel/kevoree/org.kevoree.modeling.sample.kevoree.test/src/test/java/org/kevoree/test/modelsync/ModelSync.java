package org.kevoree.test.modelsync;


import org.kevoree.modeling.api.KMFContainer;

/**
 * Created by duke on 24/07/13.
 */
public class ModelSync {

    private KMFContainer m0;
    private KMFContainer m1;

    public ModelSync(KMFContainer _m0, KMFContainer _m1) {
        m0 = _m0;
        m1 = _m1;
        m0.addModelTreeListener(new ModelSyncListener(m1));

        //todo avoid loop :-)
        //m1.addModelTreeListener(new ModelSyncListener(m0));
    }


}
