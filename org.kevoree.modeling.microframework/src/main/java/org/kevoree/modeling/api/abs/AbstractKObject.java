package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.event.DefaultKEvent;
import org.kevoree.modeling.api.json.JSONModelSerializer;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.select.KSelector;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.trace.ModelAddTrace;
import org.kevoree.modeling.api.trace.ModelSetTrace;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.util.Helper;

import java.util.*;

/**
 * Created by duke on 10/9/14.
 */
public abstract class AbstractKObject<A extends KObject, B extends KView> implements KObject<A, B> {

    public final static int PARENT_INDEX = 0;
    public final static int INBOUNDS_INDEX = 1;

    private boolean isDirty = false;

    public boolean isDirty() {
        return isDirty;
    }

    public void setDirty(boolean isDirty) {
        this.isDirty = isDirty;
    }

    private B view;

    private MetaClass metaClass;

    @Override
    public B view() {
        return view;
    }

    private long kid;

    public long uuid() {
        return kid;
    }

    public AbstractKObject(B view, MetaClass metaClass, long kid, long now, KDimension dimension, TimeTree timeTree) {
        this.view = view;
        this.metaClass = metaClass;
        this.kid = kid;
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

    public void setRoot(boolean isRoot) {
        this.isRoot = isRoot;
    }

    private long now;

    @Override
    public long now() {
        return now;
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
    public void path(final Callback<String> callback) {
        if (isRoot) {
            callback.on("/");
        } else {
            parent(new Callback<KObject>() {
                @Override
                public void on(KObject parent) {
                    if (parent == null) {
                        callback.on(null);
                    } else {
                        parent.path(new Callback<String>() {
                            @Override
                            public void on(String parentPath) {
                                callback.on(Helper.path(parentPath, referenceInParent, AbstractKObject.this));
                            }
                        });
                    }
                }
            });
        }
    }

    @Override
    public Long parentUuid() {
        return (Long) view.dimension().universe().storage().raw(this, KStore.AccessMode.READ)[PARENT_INDEX];
    }

    public void setParentUuid(Long parentKID) {
        view.dimension().universe().storage().raw(this, KStore.AccessMode.WRITE)[PARENT_INDEX] = parentKID;
    }

    @Override
    public void parent(Callback<KObject> callback) {
        Long parentKID = parentUuid();
        if (parentKID == null) {
            callback.on(null);
        } else {
            view.lookup(parentKID, callback);
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
        //TODO
    }

    @Override
    public void select(String query, Callback<List<KObject>> callback) {
        KSelector.select(this, query, callback);
    }

    @Override
    public void stream(String query, Callback<KObject> callback) {
        //TODO
    }

    public void listen(ModelListener listener) {
        view().dimension().universe().storage().registerListener(this, listener);
    }

    @Override
    public void jump(Long time, final Callback<A> callback) {
        view().dimension().time(time).lookup(kid, new Callback<KObject>() {
            @Override
            public void on(KObject kObject) {
                callback.on((A) kObject);
            }
        });
    }

    @Override
    public String domainKey() {
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
                    builder.append(payload.toString());//TODO, forbid multiple cardinality as domainKey
                }
            }
        }
        return builder.toString();
    }

    @Override
    public Object get(MetaAttribute attribute) {
        return attribute.strategy().extrapolate(this, attribute, cachedDependencies(attribute));
    }

    @Override
    public void set(MetaAttribute attribute, Object payload) {
        attribute.strategy().mutate(this, attribute, payload, cachedDependencies(attribute));
        KEvent event = new DefaultKEvent(KActionType.SET, attribute, this, null, payload);
        view().dimension().universe().storage().notify(event);
    }

    private KObject[] cachedDependencies(MetaAttribute attribute) {
        Long[] timedDependencies = attribute.strategy().timedDependencies(this);
        KObject[] cachedObjs = new KObject[timedDependencies.length];
        for (int i = 0; i < timedDependencies.length; i++) {
            if (timedDependencies[i] == now()) {
                cachedObjs[i] = this;
            } else {//call the cache
                cachedObjs[i] = view().dimension().universe().storage().cacheLookup(dimension(), timedDependencies[i], uuid());
            }
        }
        return cachedObjs;
    }

    private Object getCreateOrUpdatePayloadList(KObject obj, int payloadIndex) {
        Object previous = view().dimension().universe().storage().raw(obj, KStore.AccessMode.WRITE)[payloadIndex];
        if (previous == null) {
            if (payloadIndex == INBOUNDS_INDEX) {
                previous = new HashMap<Long, Integer>();
            } else {
                previous = new HashSet<Long>();
            }
            view().dimension().universe().storage().raw(obj, KStore.AccessMode.WRITE)[payloadIndex] = previous;
        }
        return previous;
    }

    private void removeFromContainer(final KObject param) {
        if (param != null && param.parentUuid() != null && param.parentUuid() != kid) {
            view().lookup(param.parentUuid(), new Callback<KObject>() {
                @Override
                public void on(KObject parent) {
                    parent.mutate(KActionType.REMOVE, param.referenceInParent(), param, true);
                }
            });
        }
    }

    @Override
    public void mutate(KActionType actionType, final MetaReference metaReference, KObject param, final boolean setOpposite) {
        switch (actionType) {
            case ADD:
                if (metaReference.single()) {
                    mutate(KActionType.SET, metaReference, param, setOpposite);
                } else {
                    Set<Long> previousList = (Set<Long>) getCreateOrUpdatePayloadList(this, metaReference.index());
                    //Actual add
                    previousList.add(param.uuid());
                    //Opposite
                    if (metaReference.opposite() != null && setOpposite) {
                        param.mutate(KActionType.ADD, metaReference.opposite(), this, false);
                    }
                    //Container
                    if (metaReference.contained()) {
                        removeFromContainer(param);
                        ((AbstractKObject) param).setReferenceInParent(metaReference);
                        ((AbstractKObject) param).setParentUuid(kid);
                    }
                    //Inbound
                    Map<Long, Integer> inboundRefs = (Map<Long, Integer>) getCreateOrUpdatePayloadList(param, INBOUNDS_INDEX);
                    inboundRefs.put(uuid(), metaReference.index());
                }
                break;
            case SET:
                if (!metaReference.single()) {
                    mutate(KActionType.ADD, metaReference, param, setOpposite);
                } else {
                    if (param == null) {
                        mutate(KActionType.REMOVE, metaReference, null, setOpposite);
                    } else {
                        //Actual add
                        Object[] payload = view().dimension().universe().storage().raw(this, KStore.AccessMode.WRITE);
                        Object previous = payload[metaReference.index()];
                        if (previous != null) {
                            mutate(KActionType.REMOVE, metaReference, null, setOpposite);
                        }
                        payload[metaReference.index()] = param.uuid();
                        //Container
                        if (metaReference.contained()) {
                            removeFromContainer(param);
                            ((AbstractKObject) param).setReferenceInParent(metaReference);
                            ((AbstractKObject) param).setParentUuid(kid);
                        }
                        //Inbound
                        Map<Long, Integer> inboundRefs = (Map<Long, Integer>) getCreateOrUpdatePayloadList(param, INBOUNDS_INDEX);
                        inboundRefs.put(uuid(), metaReference.index());
                        //Opposite
                        final KObject self = this;
                        if (metaReference.opposite() != null && setOpposite) {
                            if (previous != null) {
                                view().lookup((Long) previous, new Callback<KObject>() {
                                    @Override
                                    public void on(KObject resolved) {
                                        resolved.mutate(KActionType.REMOVE, metaReference.opposite(), self, false);
                                    }
                                });
                            }
                            param.mutate(KActionType.ADD, metaReference.opposite(), this, false);
                        }
                    }
                }
                break;
            case REMOVE:
                if (metaReference.single()) {
                    Object[] raw = view().dimension().universe().storage().raw(this, KStore.AccessMode.WRITE);
                    Object previousKid = raw[metaReference.index()];
                    raw[metaReference.index()] = null;
                    if (previousKid != null) {
                        final KObject self = this;
                        view.dimension().universe().storage().lookup(view, (Long) previousKid, new Callback<KObject>() {
                            @Override
                            public void on(KObject resolvedParam) {
                                if (resolvedParam != null) {
                                    if (metaReference.contained()) {
                                        //removeFromContainer(resolvedParam, fireEvent);
                                        ((AbstractKObject) resolvedParam).setReferenceInParent(null);
                                        ((AbstractKObject) resolvedParam).setParentUuid(null);
                                    }
                                    if (metaReference.opposite() != null && setOpposite) {
                                        resolvedParam.mutate(KActionType.REMOVE, metaReference.opposite(), self, false);
                                    }
                                    //Inbounds
                                    Map<Long, Integer> inboundRefs = (Map<Long, Integer>) getCreateOrUpdatePayloadList(resolvedParam, INBOUNDS_INDEX);
                                    inboundRefs.remove(uuid());
                                }
                            }
                        });
                    }
                } else {
                    Object[] payload = view().dimension().universe().storage().raw(this, KStore.AccessMode.WRITE);
                    Object previous = payload[metaReference.index()];
                    if (previous != null) {
                        Set<Long> previousList = (Set<Long>) previous;
                        if (now() != now) {
                            previousList = new HashSet<Long>(previousList);
                            payload[metaReference.index()] = previousList;
                        }
                        previousList.remove(param.uuid());
                        if (metaReference.contained()) {
                            //removeFromContainer(param, fireEvent);
                            ((AbstractKObject) param).setReferenceInParent(null);
                            ((AbstractKObject) param).setParentUuid(null);
                        }
                        if (metaReference.opposite() != null && setOpposite) {
                            param.mutate(KActionType.REMOVE, metaReference.opposite(), this, false);
                        }
                    }

                    //Inbounds
                    Map<Long, Integer> inboundRefs = (Map<Long, Integer>) getCreateOrUpdatePayloadList(param, INBOUNDS_INDEX);
                    inboundRefs.remove(uuid());
                }
                break;
            default:
                break;
        }
        //publish event
        KEvent event = new DefaultKEvent(actionType, metaReference, this, null, param);
        view().dimension().universe().storage().notify(event);
    }

    public int size(MetaReference metaReference) {
        return ((Set) view().dimension().universe().storage().raw(this, KStore.AccessMode.READ)[metaReference.index()]).size();
    }

    public <C extends KObject> void each(MetaReference metaReference, final Callback<C> callback, final Callback<Throwable> end) {
        Object o = view().dimension().universe().storage().raw(this, KStore.AccessMode.READ)[metaReference.index()];
        if (o == null) {
            if (end != null) {
                end.on(null);
            } else {//case of Get on single ref
                callback.on(null);
            }
        } else if (o instanceof Long) {
            view().lookup((Long) o, new Callback<KObject>() {
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
        } else if (o instanceof Set) {
            Set<Long> objs = (Set<Long>) o;
            view().lookupAll(objs, new Callback<List<KObject>>() {
                @Override
                public void on(List<KObject> result) {
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
                }
            });
        } else {
            if (end != null) {
                end.on(new Exception("Inconsistent storage, Internal Error"));
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

    private void internal_visit(final ModelVisitor visitor, final Callback<Throwable> end, final boolean deep, final boolean treeOnly, final HashSet<Long> alreadyVisited) {
        if (alreadyVisited != null) {
            alreadyVisited.add(uuid());
        }
        Set<Long> toResolveds = new HashSet<Long>();
        for (int i = 0; i < metaReferences().length; i++) {
            MetaReference reference = metaReferences()[i];
            if (!(treeOnly && !reference.contained())) {
                Object[] raw = view().dimension().universe().storage().raw(this, KStore.AccessMode.READ);
                Object o = null;
                if (raw != null) {
                    o = raw[reference.index()];
                }
                if (o != null) {
                    if (o instanceof Long) {
                        toResolveds.add((Long) o);
                    } else {
                        if (o instanceof Set) {
                            Set<Long> ol = (Set<Long>) o;
                            for (Long toAdd : ol) {
                                toResolveds.add(toAdd);
                            }
                        }
                    }
                }
            }
        }
        if (toResolveds.isEmpty()) {
            end.on(null);
        } else {
            view().lookupAll(toResolveds, new Callback<List<KObject>>() {
                @Override
                public void on(List<KObject> resolveds) {
                    final List<KObject> nextDeep = new ArrayList<KObject>();
                    for (KObject resolved : resolveds) {
                        ModelVisitor.VisitResult result = visitor.visit(resolved);
                        if (result.equals(ModelVisitor.VisitResult.STOP)) {
                            end.on(null);
                        } else {
                            if (deep) {
                                if (result.equals(ModelVisitor.VisitResult.CONTINUE)) {
                                    if (alreadyVisited == null || !alreadyVisited.contains(resolved.uuid())) {
                                        nextDeep.add(resolved);
                                    }
                                }
                            }
                        }
                    }
                    if (!nextDeep.isEmpty()) {
                        final int[] i = new int[1];
                        i[0] = 0;
                        final Callback<Throwable>[] next = new Callback[1];
                        next[0] = new Callback<Throwable>() {
                            @Override
                            public void on(Throwable throwable) {
                                i[0] = i[0] + 1;
                                if (i[0] == nextDeep.size()) {
                                    end.on(null);
                                } else {
                                    if (treeOnly) {
                                        nextDeep.get(i[0]).treeVisit(visitor, next[0]);
                                    } else {
                                        nextDeep.get(i[0]).graphVisit(visitor, next[0]);
                                    }
                                }
                            }
                        };
                        if (treeOnly) {
                            nextDeep.get(i[0]).treeVisit(visitor, next[0]);
                        } else {
                            nextDeep.get(i[0]).graphVisit(visitor, next[0]);
                        }
                    } else {
                        end.on(null);
                    }
                }
            });
        }
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
        builder.append("\t\"" + JSONModelSerializer.keyMeta + "\" : \"");
        builder.append(metaClass().metaName());
        builder.append("\",\n");
        builder.append("\t\"" + JSONModelSerializer.keyKid + "\" : \"");
        builder.append(uuid());
        if (isRoot()) {
            builder.append("\",\n");
            builder.append("\t\"" + JSONModelSerializer.keyRoot + "\" : \"");
            builder.append("true");
        }
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
            Object[] raw = view().dimension().universe().storage().raw(this, KStore.AccessMode.READ);
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
                    Set<Long> elems = (Set<Long>) payload;
                    Long[] elemsArr = elems.toArray(new Long[elems.size()]);
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
                Object[] raw = view().dimension().universe().storage().raw(this, KStore.AccessMode.READ);
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


    public void inbounds(final Callback<InboundReference> callback, final Callback<Throwable> end) {
        Object[] rawPayload = view().dimension().universe().storage().raw(this, KStore.AccessMode.READ);
        if (rawPayload == null) {
            end.on(new Exception("Object not initialized."));
        } else {
            Object payload = rawPayload[INBOUNDS_INDEX];
            if (payload != null) {
                if (payload instanceof Map) {
                    final Map<Long, Integer> refs = (Map<Long, Integer>) payload;
                    Set<Long> oppositeKids = new HashSet<Long>();
                    oppositeKids.addAll(refs.keySet());
                    view.lookupAll(oppositeKids, new Callback<List<KObject>>() {
                        @Override
                        public void on(List<KObject> oppositeElements) {
                            if (oppositeElements != null) {
                                for (KObject opposite : oppositeElements) {
                                    Integer inboundRef = refs.get(opposite.uuid());
                                    MetaReference metaRef = null;
                                    MetaReference[] metaReferences = opposite.metaReferences();
                                    for (int i = 0; i < metaReferences.length; i++) {
                                        if (metaReferences[i].index() == inboundRef) {
                                            metaRef = metaReferences[i];
                                            break;
                                        }
                                    }
                                    if (metaRef != null) {
                                        InboundReference reference = new InboundReference(metaRef, opposite);
                                        try {
                                            callback.on(reference);
                                        } catch (Throwable t) {
                                            end.on(t);
                                        }
                                    } else {
                                        end.on(new Exception("MetaReference not found with index:" + inboundRef + " in refs of " + opposite.metaClass().metaName()));
                                    }
                                }
                                end.on(null);
                            } else {
                                end.on(new Exception("Could not resolve opposite objects"));
                            }
                        }
                    });
                } else {
                    end.on(new Exception("Inbound refs payload is not a set"));
                }
            } else {
                end.on(null);
            }
        }
    }

}
