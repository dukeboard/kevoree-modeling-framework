package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.events.ModelElementListener;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.util.CallBackChain;
import org.kevoree.modeling.api.util.Helper;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by duke on 10/9/14.
 */
public abstract class AbstractKObject<A extends KObject, B extends KView> implements KObject<A, B> {

    private B factory;

    private MetaClass metaClass;

    @Override
    public B factory() {
        return factory;
    }

    public AbstractKObject(B factory, MetaClass metaClass, String path, long now, KDimension dimension, TimeTree timeTree) {
        this.factory = factory;
        this.metaClass = metaClass;
        this.path = path;
        this.now = now;
        this.dimension = dimension;
        this.timeTree = timeTree;
    }

    @Override
    public MetaClass metaClass() {
        return this.metaClass;
    }

    private boolean isDeleted = false;

    @Override
    public boolean isDeleted() {
        return isDeleted;
    }

    private boolean isRoot = false;

    @Override
    public boolean isRoot() {
        return isRoot;
    }

    private long now;

    @Override
    public long now() {
        return timeTree().resolve(now);
    }

    private TimeTree timeTree;

    @Override
    public TimeTree timeTree() {
        return timeTree;
    }

    private KDimension dimension;

    @Override
    public KDimension dimension() {
        return dimension;
    }

    private String path = null;

    @Override
    public String path() {
        return path;
    }

    protected void setPath(String newPath) {
        this.path = newPath;
    }

    @Override
    public String parentPath() {
        return Helper.parentPath(path());
    }

    @Override
    public void parent(Callback<KObject> callback) {
        String parentPath = parentPath();
        if (parentPath == null) {
            callback.on(null);
        } else {
            factory.lookup(parentPath, callback);
        }
    }

    protected void setReferenceInParent(MetaReference referenceInParent) {
        this.referenceInParent = referenceInParent;
    }

    private MetaReference referenceInParent = null;

    @Override
    public MetaReference referenceInParent() {
        return referenceInParent;
    }

    @Override
    public void delete(Callback<Boolean> callback) {

    }


    @Override
    public boolean modelEquals(A similarObj) {
        return false;
    }

    @Override
    public void deepModelEquals(A similarObj, Callback<Boolean> callback) {

    }

    @Override
    public void findByID(String relationName, String idP, Callback<KObject> callback) {

    }

    @Override
    public void select(String query, Callback<List<KObject>> callback) {

    }

    @Override
    public void stream(String query, Callback<KObject> callback) {

    }

    @Override
    public void addModelElementListener(ModelElementListener lst) {

    }

    @Override
    public void removeModelElementListener(ModelElementListener lst) {

    }

    @Override
    public void removeAllModelElementListeners() {

    }

    @Override
    public void addModelTreeListener(ModelElementListener lst) {

    }

    @Override
    public void removeModelTreeListener(ModelElementListener lst) {

    }

    @Override
    public void removeAllModelTreeListeners() {

    }

    @Override
    public List<ModelTrace> createTraces(A similarObj, boolean isInter, boolean isMerge, boolean onlyReferences, boolean onlyAttributes) {
        return null;
    }

    @Override
    public List<ModelTrace> toTraces(boolean attributes, boolean references) {
        return null;
    }

    @Override
    public void jump(Long time, Callback<A> callback) {
        factory().dimension().time(time).lookup(path(), (o) -> {
            callback.on((A) o);
        });
    }

    @Override
    public String key() {
        StringBuilder builder = new StringBuilder();
        MetaAttribute[] atts = metaAttributes();
        for (int i = 0; i < atts.length; i++) {
            MetaAttribute att = atts[i];
            if (att.key()) {
                if (builder.length() != 0) {
                    builder.append(",");
                }
                builder.append(att.metaName());
                builder.append("=");
                Object payload = get(att);
                if (payload != null) {
                    builder.append(payload.toString());//TODO, forbid multiple cardinality as key
                }
            }
        }
        return builder.toString();
    }

    //TODO optimize , maybe dangerous if cache is unloaded ...
    public Object get(MetaAttribute attribute) {
        //here potentially manage learned attributes
        return factory().dimension().univers().dataCache().getPayload(dimension(), now(), path(), attribute.index());
    }

    public void set(MetaAttribute attribute, Object payload) {
        factory().dimension().univers().dataCache().putPayload(dimension(), now, path(), attribute.index(), payload);
        internalUpdateTimeTrees();
    }

    private void internalUpdateTimeTrees() {
        timeTree().insert(now);
        factory().dimension().globalTimeTree().insert(now);
    }

    private void attach(MetaReference metaReference, KObject param, boolean fireEvent, Callback<Boolean> callback) {
        if (metaReference.contained()) {
            String newPath = Helper.path(this, metaReference, param);
            factory().dimension().univers().dataCache().put(dimension(), now, newPath, param);
            param.visitAttributes(new ModelAttributeVisitor() {
                @Override
                public void visit(MetaAttribute metaAttribute, Object value) {
                    //TODO optimize for copy the object
                    factory().dimension().univers().dataCache().putPayload(dimension(), now, newPath, metaAttribute.index(), value);
                }
            });
            ((AbstractKObject) param).setPath(newPath);
            ((AbstractKObject) param).setReferenceInParent(metaReference);
            //TODO rename here, process inbounds reference and so on
            //TODO end async
            callback.on(true);
        } else {
            callback.on(true);
        }
    }

    private void detach(MetaReference metaReference, KObject param, boolean fireEvent, Callback<Boolean> callback) {
        if (metaReference.contained()) {
            String newPath = Helper.newPath();
            factory().dimension().univers().dataCache().put(dimension(), now, newPath, param);
            param.visitAttributes(new ModelAttributeVisitor() {
                @Override
                public void visit(MetaAttribute metaAttribute, Object value) {
                    //TODO optimize for copy the object
                    factory().dimension().univers().dataCache().putPayload(dimension(), now, newPath, metaAttribute.index(), value);
                }
            });
            ((AbstractKObject) param).setPath(newPath);
            ((AbstractKObject) param).setReferenceInParent(null);
            //TODO rename here, process inbounds reference and so on
            //TODO end async
            callback.on(true);
        } else {
            callback.on(true);
        }
    }

    @Override
    public void mutate(KActionType actionType, MetaReference metaReference, KObject param, boolean setOpposite, boolean fireEvent, Callback<Boolean> callback) {
        switch (actionType) {
            case ADD:
                if (metaReference.single()) {
                    mutate(KActionType.SET, metaReference, param, setOpposite, fireEvent, callback);
                } else {
                    Object previous = factory().dimension().univers().dataCache().getPayload(dimension(), now(), path(), metaReference.index());
                    if (previous == null) {
                        previous = new HashSet<String>();
                    }
                    Set<String> previousList = (Set<String>) previous;
                    if (now() != now) {
                        previousList = new HashSet<String>(previousList);
                        factory().dimension().univers().dataCache().putPayload(dimension(), now, path(), metaReference.index(), previous);
                    }
                    previousList.add(param.path());
                    internalUpdateTimeTrees();
                    attach(metaReference, param, fireEvent, (res) -> {
                        if (metaReference.opposite() != null && setOpposite) {
                            param.mutate(KActionType.ADD, metaReference.opposite(), this, false, fireEvent, callback);
                        } else {
                            callback.on(true);
                        }
                    });
                }
                break;
            case SET:
                if (!metaReference.single()) {
                    mutate(KActionType.ADD, metaReference, param, setOpposite, fireEvent, callback);
                } else {
                    Object previous = factory().dimension().univers().dataCache().getPayload(dimension(), now(), path(), metaReference.index());
                    factory().dimension().univers().dataCache().putPayload(dimension(), now, path(), metaReference.index(), param.path());
                    internalUpdateTimeTrees();
                    attach(metaReference, param, fireEvent, (res) -> {
                        if (metaReference.opposite() != null && setOpposite) {
                            if (previous == null) {
                                param.mutate(KActionType.ADD, metaReference.opposite(), this, false, fireEvent, callback);
                            } else {
                                factory().lookup(previous.toString(), (resolved) -> {
                                    detach(metaReference, resolved, fireEvent, (res2) -> {
                                        resolved.mutate(KActionType.REMOVE, metaReference.opposite(), this, false, fireEvent, (result) -> {
                                            param.mutate(KActionType.ADD, metaReference.opposite(), this, false, fireEvent, callback);
                                        });
                                    });
                                });
                            }
                        } else {
                            callback.on(true);
                        }
                    });
                }
                break;
            case REMOVE:
                if (metaReference.single()) {
                    factory().dimension().univers().dataCache().putPayload(dimension(), now, path(), metaReference.index(), null);
                    internalUpdateTimeTrees();
                    detach(metaReference, param, fireEvent, (res2) -> {
                        if (metaReference.opposite() != null && setOpposite) {
                            param.mutate(KActionType.REMOVE, metaReference.opposite(), this, false, fireEvent, callback);
                        } else {
                            callback.on(true);
                        }
                    });
                } else {
                    Object previous = factory().dimension().univers().dataCache().getPayload(dimension(), now(), path(), metaReference.index());
                    if (previous != null) {
                        Set<String> previousList = (Set<String>) previous;
                        if (now() != now) {
                            previousList = new HashSet<String>(previousList);
                            factory().dimension().univers().dataCache().putPayload(dimension(), now, path(), metaReference.index(), previousList);
                        }
                        previousList.remove(param.path());
                        internalUpdateTimeTrees();
                        detach(metaReference, param, fireEvent, (res2) -> {
                            if (metaReference.opposite() != null && setOpposite) {
                                param.mutate(KActionType.REMOVE, metaReference.opposite(), this, false, fireEvent, callback);
                            } else {
                                callback.on(true);
                            }
                        });
                    } else {
                        callback.on(false);
                    }
                }
                break;
            default:
                break;
        }
    }

    public <C extends KObject> void each(MetaReference metaReference, Callback<C> callback, Callback<Throwable> end) {
        long previous = timeTree().resolve(now());
        Object o = factory().dimension().univers().dataCache().getPayload(dimension(), previous, path(), metaReference.index());
        if (o instanceof String) {
            factory().lookup((String) o, new Callback<KObject>() {
                @Override
                public void on(KObject resolved) {
                    if (callback != null) {
                        callback.on((C) resolved);
                    }
                    if (end != null) {
                        end.on(null);
                    }
                }
            });
        } else {
            if (o instanceof List) {
                List objs = (List) o;
                Helper.forall(objs, new CallBackChain() {
                    @Override
                    public void on(Object o, Callback next) {
                        if (callback != null) {
                            callback.on((C) o);
                        }
                        next.on(null);
                    }
                }, new Callback<Throwable>() {
                    @Override
                    public void on(Throwable throwable) {
                        if (end != null) {
                            end.on(throwable);
                        }
                    }
                });
            } else {
                end.on(new Exception("Inconsistent storage, Internal Error"));
            }
        }
    }

    @Override
    public void visitNotContained(ModelVisitor visitor, Callback<Throwable> end) {

    }

    @Override
    public void visitContained(ModelVisitor visitor, Callback<Throwable> end) {

    }

    @Override
    public void visitAll(ModelVisitor visitor, Callback<Throwable> end) {

    }

    @Override
    public void deepVisitNotContained(ModelVisitor visitor, Callback<Throwable> end) {

    }

    @Override
    public void deepVisitContained(ModelVisitor visitor, Callback<Throwable> end) {

    }

    @Override
    public void deepVisitAll(ModelVisitor visitor, Callback<Throwable> end) {

    }

    @Override
    public void visitAttributes(ModelAttributeVisitor visitor) {
        MetaAttribute[] metaAttributes = metaAttributes();
        for (int i = 0; i < metaAttributes.length; i++) {
            visitor.visit(metaAttributes[i], get(metaAttributes[i]));
        }
    }

    private void internalVisit(boolean recursive, boolean onlyContained, ModelVisitor visitor, Callback<Throwable> end) {

    }

}
