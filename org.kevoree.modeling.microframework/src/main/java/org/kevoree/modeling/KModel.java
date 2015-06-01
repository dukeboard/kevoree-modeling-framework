package org.kevoree.modeling;

import org.kevoree.modeling.memory.KContentDeliveryDriver;
import org.kevoree.modeling.memory.KDataManager;
import org.kevoree.modeling.meta.MetaClass;
import org.kevoree.modeling.meta.MetaModel;
import org.kevoree.modeling.meta.MetaOperation;

public interface KModel<A extends KUniverse> {

    long key();

    A newUniverse();

    A universe(long key);

    KDataManager manager();

    KModel<A> setContentDeliveryDriver(KContentDeliveryDriver dataBase);

    KModel<A> setScheduler(KScheduler scheduler);

    void setOperation(MetaOperation metaOperation, KOperation operation);

    void setInstanceOperation(MetaOperation metaOperation, KObject target, KOperation operation);

    MetaModel metaModel();

    KDefer defer();

    void save(Callback cb);

    void discard(Callback cb);

    void connect(Callback cb);

    void close(Callback cb);

    void clearListenerGroup(long groupID);

    long nextGroup();

    KObject createByName(String metaClassName, long universe, long time);

    KObject create(MetaClass clazz, long universe, long time);

}