package org.kevoree.test.modelsync;

import org.kevoree.modeling.api.KMFContainer;
import org.kevoree.modeling.api.ModelCloner;
import org.kevoree.modeling.api.events.*;
import org.kevoree.modeling.api.util.ElementAttributeType;
import org.kevoree.serializer.JSONModelSerializer;

/**
 * Created by duke on 24/07/13.
 */
public class ModelSyncListener implements ModelTreeListener {

    private KMFContainer currentModel = null;
    final ModelCloner cloner = new org.kevoree.cloner.DefaultModelCloner();
    final JSONModelSerializer saver = new JSONModelSerializer();

    public ModelSyncListener(KMFContainer m0) {
        currentModel = m0;
    }

    @Override
    public void elementChanged(ModelEvent modelEvent) {

        System.out.println(modelEvent);

        try {
            //   saver.serialize(modelEvent.getValue(), System.out);
        } catch (Throwable e) {
            e.printStackTrace();
        }

        KMFContainer target = null;
        if (modelEvent.getSourcePath().equals("")) {
            target = currentModel;
        } else {
            //DO find by path
            target = (KMFContainer) currentModel.findByPath(modelEvent.getSourcePath());
        }
        //reflexive apply

        if (modelEvent.getElementAttributeType() == ElementAttributeType.instance$.getCONTAINMENT()) {
            target.reflexiveMutator(modelEvent.getType(), modelEvent.getElementAttributeName(), cloner.clone((KMFContainer)modelEvent.getValue()), false, true);
        } else {
            if (modelEvent.getValue() instanceof KMFContainer) {
                KMFContainer eventObj = (KMFContainer) modelEvent.getValue();
                String originPath = eventObj.path();
                target.reflexiveMutator(modelEvent.getType(), modelEvent.getElementAttributeName(), currentModel.findByPath(originPath), false, true);
            } else {
                target.reflexiveMutator(modelEvent.getType(), modelEvent.getElementAttributeName(), modelEvent.getValue(), false, true);
            }
        }

    }
}
