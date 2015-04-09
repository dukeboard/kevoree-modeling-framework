package org.kevoree.modeling.api;

import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.meta.MetaModel;
import org.kevoree.modeling.api.meta.MetaOperation;

/**
 * Created by duke on 9/30/14.
 */

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

    KDefer<Throwable> save();

    KDefer<Throwable> discard();

    KDefer<Throwable> connect();

    KDefer<Throwable> close();

    void clearListenerGroup(long groupID);

    long nextGroup();

}