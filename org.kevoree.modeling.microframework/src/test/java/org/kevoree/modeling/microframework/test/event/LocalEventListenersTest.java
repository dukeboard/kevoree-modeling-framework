package org.kevoree.modeling.microframework.test.event;

import org.junit.Test;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.KModel;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.event.LocalEventListeners;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.meta.PrimitiveTypes;
import org.kevoree.modeling.api.msg.KEvents;
import org.kevoree.modeling.api.reflexive.DynamicMetaClass;
import org.kevoree.modeling.api.reflexive.DynamicMetaModel;

/**
 * Created by duke on 22/03/15.
 */
public class LocalEventListenersTest {

    private KModel _model;

    private LocalEventListeners localEventListeners;

    public LocalEventListenersTest() {
        DynamicMetaModel metaModel = new DynamicMetaModel("TestMM");
        DynamicMetaClass metaClass = metaModel.createMetaClass("TestMC");
        metaClass.addAttribute("name", PrimitiveTypes.STRING);
        _model = metaModel.model();
        localEventListeners = new LocalEventListeners();
        localEventListeners.setManager(_model.manager());
        _model.connect();
    }

    @Test
    public void test() {
        KView t0 = _model.universe(0).time(0);
        KObject obj = t0.create(_model.metaModel().metaClass("TestMC"));
        KEventListener listener = new KEventListener() {
            @Override
            public void on(KObject src, Meta[] modifications) {
                System.err.println("Hello");
            }
        };
        localEventListeners.registerListener(0, obj, listener);

        KEvents events = new KEvents(1);
        int metaNameIndex = obj.metaClass().attribute("name").index();
        int[] metas = new int[]{metaNameIndex};
        events.setEvent(0, KContentKey.createObject(obj.universe().key(), obj.now(), obj.uuid()), metas);

        localEventListeners.dispatch(events);

    }

}
