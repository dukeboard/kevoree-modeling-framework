package org.kevoree.modeling.microframework.test.event;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.*;
import org.kevoree.modeling.memory.KContentKey;
import org.kevoree.modeling.util.LocalEventListeners;
import org.kevoree.modeling.meta.Meta;
import org.kevoree.modeling.meta.PrimitiveTypes;
import org.kevoree.modeling.msg.KEvents;
import org.kevoree.modeling.meta.reflexive.DynamicMetaClass;
import org.kevoree.modeling.meta.reflexive.DynamicMetaModel;

/**
 * Created by duke on 22/03/15.
 */
public class LocalEventListenersTest {

    private KModel _model;

    private LocalEventListeners localEventListeners;

    private KView t0;

    public LocalEventListenersTest() {
        DynamicMetaModel metaModel = new DynamicMetaModel("TestMM");
        DynamicMetaClass metaClass = metaModel.createMetaClass("TestMC");
        metaClass.addAttribute("name", PrimitiveTypes.STRING);
        _model = metaModel.model();
        localEventListeners = new LocalEventListeners();
        localEventListeners.setManager(_model.manager());
        _model.connect(null);
        t0 = _model.universe(0).time(0);
    }

    @Test
    public void test() {
        KObject obj = t0.create(_model.metaModel().metaClassByName("TestMC"));
        int[] counter = new int[]{0};
        KEventListener listener = new KEventListener() {
            @Override
            public void on(KObject src, Meta[] modifications) {
                counter[0]++;
            }
        };
        localEventListeners.registerListener(0, obj, listener);
        KEvents events = new KEvents(1);
        int metaNameIndex = obj.metaClass().attribute("name").index();
        int[] metas = new int[]{metaNameIndex};
        events.setEvent(0, KContentKey.createObject(obj.universe(), obj.now(), obj.uuid()), metas);
        localEventListeners.dispatch(events);
        Assert.assertEquals(counter[0], 1);
        localEventListeners.registerListener(0, obj, listener);
        //test the double registration
        localEventListeners.dispatch(events);
        Assert.assertEquals(counter[0], 3);
        //drop group 0
        localEventListeners.unregister(0);
        localEventListeners.dispatch(events);
        Assert.assertEquals(counter[0], 3);
    }

    @Test
    public void testMulti() {
        KObject obj = t0.create(_model.metaModel().metaClassByName("TestMC"));
        KObject obj2 = t0.create(_model.metaModel().metaClassByName("TestMC"));
        int[] counter = new int[]{0};
        KEventMultiListener multiListener = new KEventMultiListener() {
            @Override
            public void on(KObject[] objects) {
                counter[0] = counter[0] + objects.length;
            }
        };
        long[] toListen = new long[1];
        toListen[0] = obj.uuid();
        localEventListeners.registerListenerAll(0, t0.universe(), toListen, multiListener);
        KEvents events = new KEvents(1);
        int metaNameIndex = obj.metaClass().attribute("name").index();
        int[] metas = new int[]{metaNameIndex};
        events.setEvent(0, KContentKey.createObject(obj.universe(), obj.now(), obj.uuid()), metas);
        localEventListeners.dispatch(events);
        Assert.assertEquals(counter[0], 1);
        counter[0] = 0;
        localEventListeners.unregister(0);
        localEventListeners.dispatch(events);
        Assert.assertEquals(counter[0], 0);
        KEvents events2 = new KEvents(2);
        events2.setEvent(0, KContentKey.createObject(obj.universe(), obj.now(), obj.uuid()), metas);
        events2.setEvent(1, KContentKey.createObject(obj2.universe(), obj.now(), obj.uuid()), metas);
        long[] toListen2 = new long[2];
        toListen2[0] = obj.uuid();
        toListen2[1] = obj2.uuid();
        localEventListeners.registerListenerAll(0, t0.universe(), toListen2, multiListener);
        localEventListeners.dispatch(events2);
        Assert.assertEquals(counter[0], 2);
    }


}
