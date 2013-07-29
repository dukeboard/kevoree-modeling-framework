package org.kevoree.test.modelsync;

import org.kevoree.cloner.ModelCloner;
import org.kevoree.container.KMFContainer;
import org.kevoree.events.ModelEvent;
import org.kevoree.events.ModelTreeListener;
import org.kevoree.util.ElementAttributeType;
import org.kevoree.serializer.JSONModelSerializer;

/**
 * Created by duke on 24/07/13.
 */
public class ModelSyncListener implements ModelTreeListener {

    private KMFContainer currentModel = null;
    final ModelCloner cloner = new ModelCloner();
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

        if (modelEvent.getElementAttributeType() == ElementAttributeType.CONTAINMENT) {
            target.reflexiveMutator(modelEvent.getType(), modelEvent.getElementAttributeName(), cloner.clone(modelEvent.getValue()));
        } else {
            if (modelEvent.getValue() instanceof KMFContainer) {
                KMFContainer eventObj = (KMFContainer) modelEvent.getValue();
                String originPath = eventObj.path();
                target.reflexiveMutator(modelEvent.getType(), modelEvent.getElementAttributeName(), currentModel.findByPath(originPath));
            } else {
                target.reflexiveMutator(modelEvent.getType(), modelEvent.getElementAttributeName(), modelEvent.getValue());
            }
        }

    }
}
