package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelCloner;
import org.kevoree.modeling.api.ModelCompare;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.ModelLoader;
import org.kevoree.modeling.api.ModelSerializer;
import org.kevoree.modeling.api.ModelSlicer;
import org.kevoree.modeling.api.clone.DefaultModelCloner;
import org.kevoree.modeling.api.compare.DefaultModelCompare;
import org.kevoree.modeling.api.event.DefaultKEvent;
import org.kevoree.modeling.api.json.JSONModelLoader;
import org.kevoree.modeling.api.json.JSONModelSerializer;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.select.KSelector;
import org.kevoree.modeling.api.slice.DefaultModelSlicer;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.time.DefaultTimeTree;
import org.kevoree.modeling.api.xmi.XMIModelLoader;
import org.kevoree.modeling.api.xmi.XMIModelSerializer;

import java.util.*;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKView implements KView {

    private long _now;

    private KDimension _dimension;

    protected AbstractKView(long p_now, KDimension p_dimension) {
        this._now = p_now;
        this._dimension = p_dimension;
    }

    @Override
    public long now() {
        return _now;
    }

    @Override
    public KDimension dimension() {
        return _dimension;
    }

    @Override
    public ModelSerializer createJSONSerializer() {
        return new JSONModelSerializer();
    }

    @Override
    public ModelLoader createJSONLoader() {
        return new JSONModelLoader(this);
    }

    @Override
    public ModelSerializer createXMISerializer() {
        return new XMIModelSerializer();
    }

    @Override
    public ModelLoader createXMILoader() {
        return new XMIModelLoader(this);
    }

    @Override
    public ModelCompare createModelCompare() {
        return new DefaultModelCompare(this);
    }

    @Override
    public ModelCloner createModelCloner() {
        return new DefaultModelCloner(this);
    }

    @Override
    public ModelSlicer createModelSlicer() {
        return new DefaultModelSlicer();
    }

    public MetaClass metaClass(String fqName) {
        MetaClass[] metaClasses = metaClasses();
        for (int i = 0; i < metaClasses.length; i++) {
            if (metaClasses[i].metaName().equals(fqName)) {
                return metaClasses[i];
            }
        }
        return null;
    }

    @Override
    public KObject createFQN(String metaClassName) {
        return create(metaClass(metaClassName));
    }

    protected KObject manageCache(KObject obj) {
        dimension().universe().storage().initKObject(obj, this);
        return obj;
    }

    @Override
    public void setRoot(KObject elem) {
        ((AbstractKObject) elem).set_referenceInParent(null);
        ((AbstractKObject) elem).setRoot(true);
        dimension().universe().storage().setRoot(elem);
    }

    @Override
    public void select(final String query, final Callback<List<KObject>> callback) {
        dimension().universe().storage().getRoot(this, new Callback<KObject>() {
            @Override
            public void on(KObject rootObj) {
                String cleanedQuery = query;
                if(cleanedQuery.equals("/")) {
                    ArrayList<KObject> res = new ArrayList<KObject>();
                    if(rootObj != null) {
                        res.add(rootObj);
                    }
                    callback.on(res);
                } else {
                    if (cleanedQuery.startsWith("/")) {
                        cleanedQuery = cleanedQuery.substring(1);
                    }
                    KSelector.select(rootObj, cleanedQuery, callback);
                }
            }
        });
    }

    @Override
    public void lookup(long kid, Callback<KObject> callback) {
        dimension().universe().storage().lookup(this, kid, callback);
    }

    public void lookupAll(Set<Long> keys, Callback<List<KObject>> callback) {
        dimension().universe().storage().lookupAll(this, keys, callback);
    }

    @Override
    public void stream(String query, Callback<KObject> callback) {

    }

    @Override
    public KObject createProxy(MetaClass clazz, TimeTree timeTree, long key) {
        return internalCreate(clazz, timeTree, key);
    }

    @Override
    public KObject create(MetaClass clazz) {
        KObject newObj = internalCreate(clazz, new DefaultTimeTree().insert(now()), dimension().universe().storage().nextObjectKey());
        if(newObj != null) {
            dimension().universe().storage().notify(new DefaultKEvent(KActionType.NEW, null, newObj, null, newObj));
        }
        return newObj;
    }

    public void listen(ModelListener listener) {
        dimension().universe().storage().registerListener(this, listener);
    }

    protected abstract KObject internalCreate(MetaClass clazz, TimeTree timeTree, long key);

    public abstract MetaClass[] metaClasses();

}
