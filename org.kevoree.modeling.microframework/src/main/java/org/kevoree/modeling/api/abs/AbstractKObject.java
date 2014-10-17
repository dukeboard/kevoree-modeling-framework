package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.events.ModelElementListener;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.trace.ModelAddTrace;
import org.kevoree.modeling.api.trace.ModelSetTrace;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.util.CallBackChain;
import org.kevoree.modeling.api.util.Helper;
import org.kevoree.modeling.api.util.InternalInboundRef;

import java.util.ArrayList;
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

    private long kid;

    public long kid() {
        return kid;
    }

    public AbstractKObject(B factory, MetaClass metaClass, long kid, long now, KDimension dimension, TimeTree timeTree) {
        this.factory = factory;
        this.metaClass = metaClass;
        this.kid = kid;
        this.factoryNow = now;
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

    public void setRoot(boolean isRoot) {
        this.isRoot = isRoot;
    }

    private long factoryNow;

    @Override
    public long now() {
        return timeTree().resolve(factoryNow);
    }

    private TimeTree timeTree;

    @Override
    public TimeTree timeTree() {
        return timeTree;
    }

    private KDimension dimension;

    @Override
    public KDimension dimension() {
        //TODO resolve the best local dimension
        return dimension;
    }

    @Override
    public String path() {
        throw new RuntimeException("Not implemented yet");
    }

    final static int PARENT_INDEX = 0;

    @Override
    public Long parentKID() {
        Object[] raw = factory.dimension().universe().storage().raw(dimension(), now(), kid);
        return (Long) raw[PARENT_INDEX];
    }

    public void setParentKID(Long parentKID) {
        factory.dimension().universe().storage().raw(dimension(), now(), kid)[PARENT_INDEX] = parentKID;
    }

    @Override
    public void parent(Callback<KObject> callback) {
        /*
        String parentPath = parentPath();
        if (parentPath == null) {
            callback.on(null);
        } else {
            factory.lookup(parentPath, callback);
        }
        */
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
        //TODO
    }


    @Override
    public void findByID(String relationName, String idP, Callback<KObject> callback) {
        //TODO
    }

    @Override
    public void select(String query, Callback<List<KObject>> callback) {
        //TODO
    }

    @Override
    public void stream(String query, Callback<KObject> callback) {
        //TODO
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
    public void jump(Long time, Callback<A> callback) {
        factory().dimension().time(time).lookup(kid, (o) -> {
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
    @Override
    public Object get(MetaAttribute attribute) {
        Object[] payload = factory().dimension().universe().storage().raw(dimension(), now(), kid());
        if (payload != null) {
            return payload[attribute.index()];
        } else {
            return null;
        }
    }

    @Override
    public void set(MetaAttribute attribute, Object payload, boolean fireEvents) {
        Object[] internalPayload = factory().dimension().universe().storage().raw(dimension, factoryNow, kid);
        if (internalPayload != null) {
            internalPayload[attribute.index()] = payload;
        } else {
            throw new RuntimeException("Storage damaged");
        }
        internalUpdateTimeTrees();
    }

    private void internalUpdateTimeTrees() {
        timeTree().insert(factoryNow);
        factory().dimension().globalTimeTree().insert(factoryNow);
    }


    @Override
    public void mutate(KActionType actionType, MetaReference metaReference, KObject param, boolean setOpposite, boolean fireEvent) {
        switch (actionType) {
            case ADD:
                if (metaReference.single()) {
                    mutate(KActionType.SET, metaReference, param, setOpposite, fireEvent);
                } else {
                    Object previous = factory().dimension().universe().storage().raw(dimension(), now(), kid())[metaReference.index()];
                    if (previous == null) {
                        previous = new HashSet<String>();
                        factory().dimension().universe().storage().raw(dimension(), factoryNow, kid())[metaReference.index()] = previous;
                    }
                    Set<Long> previousList = (Set<Long>) previous;
                    if (now() != factoryNow) {
                        previousList = new HashSet<Long>(previousList);
                        factory().dimension().universe().storage().raw(dimension(), factoryNow, kid())[metaReference.index()] = previous;
                    }
                    previousList.add(param.kid());
                    if (metaReference.opposite() != null && setOpposite) {
                        param.mutate(KActionType.ADD, metaReference.opposite(), this, false, fireEvent);
                    }
                    if(metaReference.contained()){
                        ((AbstractKObject)param).setReferenceInParent(metaReference);
                        ((AbstractKObject)param).setParentKID(kid);
                    }
                    internalUpdateTimeTrees();
                }
                break;
            case SET:
                if (!metaReference.single()) {
                    mutate(KActionType.ADD, metaReference, param, setOpposite, fireEvent);
                } else {
                    Object previous = factory().dimension().universe().storage().raw(dimension(), now(), kid())[metaReference.index()];
                    factory().dimension().universe().storage().raw(dimension, factoryNow, kid())[metaReference.index()] = param.kid();
                    if(metaReference.contained()){
                        ((AbstractKObject)param).setReferenceInParent(metaReference);
                        ((AbstractKObject)param).setParentKID(kid);
                    }
                    internalUpdateTimeTrees();
                    if (metaReference.opposite() != null && setOpposite) {
                        if (previous == null) {
                            param.mutate(KActionType.ADD, metaReference.opposite(), this, false, fireEvent);
                        } else {
                            factory().lookup((Long) previous, (resolved) -> {
                                //TODO detach
                                resolved.mutate(KActionType.REMOVE, metaReference.opposite(), this, false, fireEvent);
                                param.mutate(KActionType.ADD, metaReference.opposite(), this, false, fireEvent);
                            });
                        }
                    }
                }
                break;
            case REMOVE:
                if (metaReference.single()) {
                    factory().dimension().universe().storage().raw(dimension(), factoryNow, kid())[metaReference.index()] = null;
                    if(metaReference.contained()){
                        ((AbstractKObject)param).setReferenceInParent(null);
                        ((AbstractKObject)param).setParentKID(null);
                    }
                    internalUpdateTimeTrees();
                    if (metaReference.opposite() != null && setOpposite) {
                        param.mutate(KActionType.REMOVE, metaReference.opposite(), this, false, fireEvent);
                    }
                } else {
                    Object previous = factory().dimension().universe().storage().raw(dimension(), now(), kid())[metaReference.index()];
                    if (previous != null) {
                        Set<Long> previousList = (Set<Long>) previous;
                        if (now() != factoryNow) {
                            previousList = new HashSet<Long>(previousList);
                            factory().dimension().universe().storage().raw(dimension(), factoryNow, kid())[metaReference.index()] = previousList;
                        }
                        previousList.remove(param.kid());
                        if(metaReference.contained()){
                            ((AbstractKObject)param).setReferenceInParent(null);
                            ((AbstractKObject)param).setParentKID(null);
                        }
                        internalUpdateTimeTrees();
                        if (metaReference.opposite() != null && setOpposite) {
                            param.mutate(KActionType.REMOVE, metaReference.opposite(), this, false, fireEvent);
                        }
                    }
                }
                break;
            default:
                break;
        }
    }

    public <C extends KObject> void each(MetaReference metaReference, Callback<C> callback, Callback<Throwable> end) {
        Object o = factory().dimension().universe().storage().raw(dimension(), now(), kid())[metaReference.index()];
        if (o instanceof Long) {
            factory().lookup((Long) o, new Callback<KObject>() {
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
            if (o instanceof Set) {
                Set<Long> objs = (Set<Long>) o;
                factory().dimension().universe().storage().lookupAll(dimension(), now(), objs, (result) -> {
                    boolean endAlreadyCalled = false;
                    try {
                        for (KObject resolved : result) {
                            callback.on((C) resolved);
                        }
                        endAlreadyCalled = true;
                        end.on(null);
                    } catch (Throwable t) {
                        if (!endAlreadyCalled) {
                            end.on(t);
                        }
                    }
                });
            } else {
                if (end != null) {
                    end.on(new Exception("Inconsistent storage, Internal Error"));
                }
            }
        }
    }

    @Override
    public void visitAttributes(ModelAttributeVisitor visitor) {
        MetaAttribute[] metaAttributes = metaAttributes();
        for (int i = 0; i < metaAttributes.length; i++) {
            visitor.visit(metaAttributes[i], get(metaAttributes[i]));
        }
    }

    @Override
    public MetaAttribute metaAttribute(String name) {
        for (int i = 0; i < metaAttributes().length; i++) {
            if (metaAttributes()[i].metaName().equals(name)) {
                return metaAttributes()[i];
            }
        }
        return null;
    }

    @Override
    public MetaReference metaReference(String name) {
        for (int i = 0; i < metaReferences().length; i++) {
            if (metaReferences()[i].metaName().equals(name)) {
                return metaReferences()[i];
            }
        }
        return null;
    }

    public void visit(ModelVisitor visitor, Callback<Throwable> end) {
        internal_visit(visitor, end, false, false, null);
    }

    private void internal_visit(ModelVisitor visitor, Callback<Throwable> end, boolean deep, boolean treeOnly, HashSet<Long> alreadyVisited) {
        if (alreadyVisited != null) {
            alreadyVisited.add(kid());
        }
        Helper.forall(metaReferences(), new CallBackChain<MetaReference>() {
            @Override
            public void on(MetaReference metaReference, Callback<Throwable> nextReference) {
                if (treeOnly && !metaReference.contained()) {
                    nextReference.on(null);
                } else {
                    Object[] raw = factory().dimension().universe().storage().raw(dimension(), now(), kid());
                    Object o = null;
                    if (raw != null) {
                        o = raw[metaReference.index()];
                    }
                    if (o instanceof Long) {
                        factory().lookup((Long) o, (resolved) -> {
                            visitor.visit(resolved, (res) -> {
                                if (res.equals(ModelVisitor.Result.STOP)) {
                                    end.on(null);
                                } else {
                                    if (deep) {
                                        if (res.equals(ModelVisitor.Result.CONTINUE)) {
                                            if (alreadyVisited == null || !alreadyVisited.contains(resolved.kid())) {
                                                ((AbstractKObject) resolved).internal_visit(visitor, (t) -> {
                                                    nextReference.on(null);
                                                }, deep, treeOnly, alreadyVisited);
                                            } else {
                                                nextReference.on(null);
                                            }
                                        } else {
                                            nextReference.on(null);
                                        }
                                    } else {
                                        nextReference.on(null);
                                    }
                                }
                            });
                        });
                    } else if (o instanceof Set) {
                        Set<Long> elems = (Set<Long>) o;
                        final boolean[] aborded = {false};
                        Helper.forall(elems.toArray(new Long[elems.size()]), new CallBackChain<Long>() {
                            @Override
                            public void on(Long s, Callback<Throwable> nextElemInRef) {
                                factory().lookup(s, (resolved) -> {
                                    if (resolved == null) {
                                        nextElemInRef.on(null);
                                    } else {
                                        visitor.visit(resolved, (res) -> {
                                            if (res.equals(ModelVisitor.Result.STOP)) {
                                                end.on(null);
                                            } else {
                                                if (res.equals(ModelVisitor.Result.SKIP)) {
                                                    aborded[0] = true;
                                                    nextReference.on(null);
                                                } else {
                                                    if (deep) {
                                                        if (alreadyVisited == null || !alreadyVisited.contains(resolved.kid())) {
                                                            ((AbstractKObject) resolved).internal_visit(visitor, (t) -> {
                                                                nextElemInRef.on(null);
                                                            }, deep, treeOnly, alreadyVisited);
                                                        } else {
                                                            nextElemInRef.on(null);
                                                        }
                                                    } else {
                                                        nextElemInRef.on(null);
                                                    }
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        }, new Callback<Throwable>() {
                            @Override
                            public void on(Throwable throwable) {
                                if (!aborded[0]) {
                                    nextReference.on(null);
                                }
                            }
                        });
                    } else if (o == null) {
                        nextReference.on(null);
                        //noop
                    } else {
                        end.on(new Exception("Internal error, " + o));
                    }
                }
            }
        }, end);
    }

    public void graphVisit(ModelVisitor visitor, Callback<Throwable> end) {
        internal_visit(visitor, end, true, false, new HashSet<Long>());
    }

    public void treeVisit(ModelVisitor visitor, Callback<Throwable> end) {
        internal_visit(visitor, end, true, true, null);
    }

    public String toJSON() {
        StringBuilder builder = new StringBuilder();
        builder.append("{\n");
        builder.append("\t\"@meta\" : \"");
        builder.append(metaClass().metaName());
        builder.append("\",\n");
        builder.append("\t\"@path\" : \"");
        builder.append(path());
        builder.append("\",\n");
        for (int i = 0; i < metaAttributes().length; i++) {
            Object payload = get(metaAttributes()[i]);
            if (payload != null) {
                builder.append("\t");
                builder.append("\"");
                builder.append(metaAttributes()[i].metaName());
                builder.append("\":\"");
                builder.append(payload);
                builder.append("\",\n");
            }
        }
        for (int i = 0; i < metaReferences().length; i++) {
            Object[] raw = factory().dimension().universe().storage().raw(dimension(), now(), kid());
            Object payload = null;
            if (raw != null) {
                payload = raw[metaReferences()[i].index()];
            }
            if (payload != null) {
                builder.append("\t");
                builder.append("\"");
                builder.append(metaReferences()[i].metaName());
                builder.append("\":");
                if (metaReferences()[i].single()) {
                    builder.append("\"");
                    builder.append(payload);
                    builder.append("\"");
                } else {
                    Set<String> elems = (Set<String>) payload;
                    String[] elemsArr = elems.toArray(new String[elems.size()]);
                    boolean isFirst = true;
                    builder.append(" [");
                    for (int j = 0; j < elemsArr.length; j++) {
                        if (!isFirst) {
                            builder.append(",");
                        }
                        builder.append("\"");
                        builder.append(elemsArr[j]);
                        builder.append("\"");
                        isFirst = false;
                    }
                    builder.append("]");
                }
                builder.append(",\n");
            }
        }
        int lastcomma = builder.lastIndexOf(",");
        builder.setCharAt(lastcomma, ' ');
        builder.append("}\n");
        return builder.toString();
    }

    @Override
    public String toString() {
        return toJSON();
    }

    @Override
    public List<ModelTrace> traces(TraceRequest request) {
        List<ModelTrace> traces = new ArrayList<ModelTrace>();
        if (TraceRequest.ATTRIBUTES_ONLY.equals(request) || TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
            for (int i = 0; i < metaAttributes().length; i++) {
                MetaAttribute current = metaAttributes()[i];
                Object payload = get(current);
                if (payload != null) {
                    traces.add(new ModelSetTrace(kid, current, payload));
                }
            }
        }
        if (TraceRequest.REFERENCES_ONLY.equals(request) || TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
            for (int i = 0; i < metaReferences().length; i++) {
                MetaReference ref = metaReferences()[i];
                Object[] raw = factory().dimension().universe().storage().raw(dimension(), now(), kid());
                Object o = null;
                if (raw != null) {
                    o = raw[ref.index()];
                }
                if (o instanceof Set) {
                    Set<Long> contents = (Set<Long>) o;
                    Long[] contentsArr = contents.toArray(new Long[contents.size()]);
                    for (int j = 0; j < contentsArr.length; j++) {
                        traces.add(new ModelAddTrace(kid, ref, contentsArr[j], null));
                    }
                } else if (o != null) {
                    traces.add(new ModelAddTrace(kid, ref, (Long) o, null));
                }
            }
        }
        return traces;
    }

    public void inbounds(Callback<InboundReference> callback, Callback<Throwable> end) {
        /*
        int maxIndex = metaAttributes().length + metaReferences().length;
        Object[] rawPayload = factory().dimension().universe().storage().raw(dimension(), now(), kid());
        Object payload = null;
        if (rawPayload != null) {
            payload = rawPayload[maxIndex];
        }
        if (payload != null) {
            Set<InternalInboundRef> refs = (Set<InternalInboundRef>) payload;
            Helper.forall(refs.toArray(new InternalInboundRef[refs.size()]), new CallBackChain<InternalInboundRef>() {
                @Override
                public void on(InternalInboundRef internalInboundRef, Callback<Throwable> next) {
                    factory().lookup(internalInboundRef.getPath(), (resolved) -> {
                        if (resolved != null) {
                            InboundReference reference = new InboundReference(resolved.metaReference(internalInboundRef.getMeta()), resolved);
                            try {
                                callback.on(reference);
                                next.on(null);
                            } catch (Throwable t) {
                                end.on(t);
                            }
                        } else {
                            next.on(new Exception("Path not resolvable " + internalInboundRef.getPath()));
                        }
                    });
                }
            }, new Callback<Throwable>() {
                @Override
                public void on(Throwable throwable) {
                    end.on(throwable);
                }
            });
        } else {
            end.on(null);
        }*/
    }

}
