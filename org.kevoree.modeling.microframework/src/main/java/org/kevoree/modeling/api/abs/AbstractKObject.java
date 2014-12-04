package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.InboundReference;
import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelAttributeVisitor;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.ModelVisitor;
import org.kevoree.modeling.api.TraceRequest;
import org.kevoree.modeling.api.VisitResult;
import org.kevoree.modeling.api.data.AccessMode;
import org.kevoree.modeling.api.data.Index;
import org.kevoree.modeling.api.event.DefaultKEvent;
import org.kevoree.modeling.api.event.ListenerScope;
import org.kevoree.modeling.api.data.JsonRaw;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.operation.DefaultModelCloner;
import org.kevoree.modeling.api.operation.DefaultModelCompare;
import org.kevoree.modeling.api.operation.DefaultModelSlicer;
import org.kevoree.modeling.api.select.KSelector;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.trace.ModelAddTrace;
import org.kevoree.modeling.api.trace.ModelSetTrace;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.trace.TraceSequence;
import org.kevoree.modeling.api.util.Helper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 10/9/14.
 */
public abstract class AbstractKObject<A extends KObject, B extends KView> implements KObject<A, B> {

    private B _view;
    private long _uuid;
    private TimeTree _timeTree;
    private MetaClass _metaClass;

    public AbstractKObject(B p_view, long p_uuid, TimeTree p_timeTree, MetaClass p_metaClass) {
        this._view = p_view;
        this._uuid = p_uuid;
        this._timeTree = p_timeTree;
        this._metaClass = p_metaClass;
    }

    @Override
    public B view() {
        return _view;
    }

    @Override
    public long uuid() {
        return _uuid;
    }

    @Override
    public MetaClass metaClass() {
        return _metaClass;
    }

    @Override
    public boolean isRoot() {
        Boolean isRoot = (Boolean) _view.dimension().universe().storage().raw(this, AccessMode.READ)[Index.IS_ROOT_INDEX];
        if (isRoot == null) {
            return false;
        } else {
            return isRoot;
        }
    }

    public void setRoot(boolean isRoot) {
        _view.dimension().universe().storage().raw(this, AccessMode.READ)[Index.IS_ROOT_INDEX] = isRoot;
    }

    @Override
    public long now() {
        return _view.now();
    }

    @Override
    public TimeTree timeTree() {
        return _timeTree;
    }

    @Override
    public KDimension dimension() {
        return _view.dimension();
    }

    @Override
    public void path(final Callback<String> callback) {
        if (isRoot()) {
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
                                callback.on(Helper.path(parentPath, referenceInParent(), AbstractKObject.this));
                            }
                        });
                    }
                }
            });
        }
    }

    @Override
    public Long parentUuid() {
        return (Long) _view.dimension().universe().storage().raw(this, AccessMode.READ)[Index.PARENT_INDEX];
    }

    @Override
    public void parent(Callback<KObject> callback) {
        Long parentKID = parentUuid();
        if (parentKID == null) {
            callback.on(null);
        } else {
            _view.lookup(parentKID, callback);
        }
    }

    @Override
    public MetaReference referenceInParent() {
        return (MetaReference) _view.dimension().universe().storage().raw(this, AccessMode.READ)[Index.REF_IN_PARENT_INDEX];
    }

    @Override
    public void delete(Callback<Throwable> callback) {
        KObject toRemove = this;
        Object[] rawPayload = _view.dimension().universe().storage().raw(this, AccessMode.DELETE);
        Object payload = rawPayload[Index.INBOUNDS_INDEX];
        if (payload != null) {
            try {
                Map<Long, MetaReference> refs = (Map<Long, MetaReference>) payload;
                Long[] refArr = refs.keySet().toArray(new Long[refs.size()]);
                view().lookupAll(refArr, new Callback<KObject[]>() {
                    @Override
                    public void on(KObject[] resolved) {
                        for (int i = 0; i < resolved.length; i++) {
                            if (resolved[i] != null) {
                                resolved[i].mutate(KActionType.REMOVE, refs.get(refArr[i]), toRemove, false);
                            }
                        }
                        callback.on(null);
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
                callback.on(e);
            }
        } else {
            callback.on(new Exception("Out of cache error"));
        }
    }

    @Override
    public void select(String query, Callback<KObject[]> callback) {
        KSelector.select(this, query, callback);
    }

    @Override
    public void stream(String query, Callback<KObject> callback) {
        //TODO
    }

    @Override
    public void listen(ModelListener listener, ListenerScope scope) {
        view().dimension().universe().storage().eventBroker().registerListener(this, listener, scope);
    }

    @Override
    public void jump(Long time, final Callback<A> callback) {
        view().dimension().time(time).lookup(_uuid, new Callback<KObject>() {
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
        return attribute.strategy().extrapolate(this, attribute);
    }

    @Override
    public void set(MetaAttribute attribute, Object payload) {
        attribute.strategy().mutate(this, attribute, payload);
        view().dimension().universe().storage().eventBroker().notify(new DefaultKEvent(KActionType.SET, this, attribute, payload));
    }

    private Object getCreateOrUpdatePayloadList(KObject obj, int payloadIndex) {
        Object previous = view().dimension().universe().storage().raw(obj, AccessMode.WRITE)[payloadIndex];
        if (previous == null) {
            if (payloadIndex == Index.INBOUNDS_INDEX) {
                previous = new HashMap<Long, MetaReference>();
            } else {
                previous = new HashSet<Long>();
            }
            view().dimension().universe().storage().raw(obj, AccessMode.WRITE)[payloadIndex] = previous;
        }
        return previous;
    }

    private void removeFromContainer(final KObject param) {
        if (param != null && param.parentUuid() != null && param.parentUuid() != _uuid) {
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
        if (actionType.equals(KActionType.ADD)) {
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
                    ((AbstractKObject) param).set_parent(_uuid, metaReference);
                }
                //Inbound
                Map<Long, MetaReference> inboundRefs = (Map<Long, MetaReference>) getCreateOrUpdatePayloadList(param, Index.INBOUNDS_INDEX);
                inboundRefs.put(uuid(), metaReference);

                //publish event
                KEvent event = new DefaultKEvent(actionType, this, metaReference, param);
                view().dimension().universe().storage().eventBroker().notify(event);

            }
        } else if (actionType.equals(KActionType.SET)) {
            if (!metaReference.single()) {
                mutate(KActionType.ADD, metaReference, param, setOpposite);
            } else {
                if (param == null) {
                    mutate(KActionType.REMOVE, metaReference, null, setOpposite);
                } else {
                    //Actual add
                    Object[] payload = view().dimension().universe().storage().raw(this, AccessMode.WRITE);
                    Object previous = payload[metaReference.index()];
                    if (previous != null) {
                        mutate(KActionType.REMOVE, metaReference, null, setOpposite);
                    }
                    payload[metaReference.index()] = param.uuid();
                    //Container
                    if (metaReference.contained()) {
                        removeFromContainer(param);
                        ((AbstractKObject) param).set_parent(_uuid, metaReference);
                    }
                    //Inbound
                    Map<Long, MetaReference> inboundRefs = (Map<Long, MetaReference>) getCreateOrUpdatePayloadList(param, Index.INBOUNDS_INDEX);
                    inboundRefs.put(uuid(), metaReference);
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

                    KEvent event = new DefaultKEvent(actionType, this, metaReference, param);
                    view().dimension().universe().storage().eventBroker().notify(event);

                }
            }
        } else if (actionType.equals(KActionType.REMOVE)) {
            if (metaReference.single()) {
                Object[] raw = view().dimension().universe().storage().raw(this, AccessMode.WRITE);
                Object previousKid = raw[metaReference.index()];
                raw[metaReference.index()] = null;
                if (previousKid != null) {
                    final KObject self = this;
                    _view.dimension().universe().storage().lookup(_view, (Long) previousKid, new Callback<KObject>() {
                        @Override
                        public void on(KObject resolvedParam) {
                            if (resolvedParam != null) {
                                if (metaReference.contained()) {
                                    //removeFromContainer(resolvedParam, fireEvent);
                                    ((AbstractKObject) resolvedParam).set_parent(null, null);
                                }
                                if (metaReference.opposite() != null && setOpposite) {
                                    resolvedParam.mutate(KActionType.REMOVE, metaReference.opposite(), self, false);
                                }
                                //Inbounds
                                Map<Long, MetaReference> inboundRefs = (Map<Long, MetaReference>) getCreateOrUpdatePayloadList(resolvedParam, Index.INBOUNDS_INDEX);
                                inboundRefs.remove(uuid());
                            }
                        }
                    });
                    //publish event
                    KEvent event = new DefaultKEvent(actionType, this, metaReference, previousKid);
                    view().dimension().universe().storage().eventBroker().notify(event);
                }
            } else {
                Object[] payload = view().dimension().universe().storage().raw(this, AccessMode.WRITE);
                Object previous = payload[metaReference.index()];
                if (previous != null) {
                    Set<Long> previousList = (Set<Long>) previous;
                    previousList.remove(param.uuid());
                    if (metaReference.contained()) {
                        ((AbstractKObject) param).set_parent(null, null);
                    }
                    if (metaReference.opposite() != null && setOpposite) {
                        param.mutate(KActionType.REMOVE, metaReference.opposite(), this, false);
                    }
                    //publish event
                    KEvent event = new DefaultKEvent(actionType, this, metaReference, param);
                    view().dimension().universe().storage().eventBroker().notify(event);
                }

                //Inbounds
                Map<Long, MetaReference> inboundRefs = (Map<Long, MetaReference>) getCreateOrUpdatePayloadList(param, Index.INBOUNDS_INDEX);
                inboundRefs.remove(uuid());
            }
        }
    }

    public int size(MetaReference metaReference) {
        Object[] raw = view().dimension().universe().storage().raw(this, AccessMode.READ);
        Object ref = raw[metaReference.index()];
        if (ref == null) {
            return 0;
        } else {
            Set<Object> refSet = (Set<Object>) ref;
            return refSet.size();
        }
    }

    public <C extends KObject> void each(MetaReference metaReference, final Callback<C> callback, final Callback<Throwable> end) {
        Object o = view().dimension().universe().storage().raw(this, AccessMode.READ)[metaReference.index()];
        if (o == null) {
            if (end != null) {
                end.on(null);
            } else {//case of Get on single ref
                callback.on(null);
            }
        } else if (o instanceof Set) {
            Set<Long> objs = (Set<Long>) o;
            Long[] setContent = objs.toArray(new Long[objs.size()]);
            view().lookupAll(setContent, new Callback<KObject[]>() {
                @Override
                public void on(KObject[] result) {
                    boolean endAlreadyCalled = false;
                    try {
                        for (int l = 0; l < result.length; l++) {
                            callback.on((C) result[l]);
                        }
                        endAlreadyCalled = true;
                        if (end != null) {
                            end.on(null);
                        }
                    } catch (Throwable t) {
                        if (!endAlreadyCalled) {
                            if (end != null) {
                                end.on(t);
                            }
                        }
                    }
                }
            });
        } else {
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

    @Override
    public MetaOperation metaOperation(String name) {
        for (int i = 0; i < metaOperations().length; i++) {
            if (metaOperations()[i].metaName().equals(name)) {
                return metaOperations()[i];
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
                Object[] raw = view().dimension().universe().storage().raw(this, AccessMode.READ);
                Object o = null;
                if (raw != null) {
                    o = raw[reference.index()];
                }
                if (o != null) {
                    if (o instanceof Set) {
                        Set<Long> ol = (Set<Long>) o;
                        Long[] olArr = ol.toArray(new Long[ol.size()]);
                        for (int k = 0; k < olArr.length; k++) {
                            toResolveds.add(olArr[k]);
                        }
                    } else {
                        toResolveds.add((Long) o);
                    }
                }
            }
        }
        if (toResolveds.isEmpty()) {
            end.on(null);
        } else {
            view().lookupAll(toResolveds.toArray(new Long[toResolveds.size()]), new Callback<KObject[]>() {
                @Override
                public void on(KObject[] resolveds) {
                    final List<KObject> nextDeep = new ArrayList<KObject>();
                    for (int i = 0; i < resolveds.length; i++) {
                        KObject resolved = resolveds[i];
                        VisitResult result = visitor.visit(resolved);
                        if (result.equals(VisitResult.STOP)) {
                            end.on(null);
                        } else {
                            if (deep) {
                                if (result.equals(VisitResult.CONTINUE)) {
                                    if (alreadyVisited == null || !alreadyVisited.contains(resolved.uuid())) {
                                        nextDeep.add(resolved);
                                    }
                                }
                            }
                        }
                    }
                    if (!nextDeep.isEmpty()) {
                        final int[] ii = new int[1];
                        ii[0] = 0;
                        final List<Callback<Throwable>> next = new ArrayList<Callback<Throwable>>();
                        next.add(new Callback<Throwable>() {
                            @Override
                            public void on(Throwable throwable) {
                                ii[0] = ii[0] + 1;
                                if (ii[0] == nextDeep.size()) {
                                    end.on(null);
                                } else {
                                    if (treeOnly) {
                                        nextDeep.get(ii[0]).treeVisit(visitor, next.get(0));
                                    } else {
                                        nextDeep.get(ii[0]).graphVisit(visitor, next.get(0));
                                    }
                                }
                            }
                        });
                        if (treeOnly) {
                            nextDeep.get(ii[0]).treeVisit(visitor, next.get(0));
                        } else {
                            nextDeep.get(ii[0]).graphVisit(visitor, next.get(0));
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
        return JsonRaw.encode(view().dimension().universe().storage().raw(this, AccessMode.READ), _uuid, _metaClass);
    }

    @Override
    public String toString() {
        return toJSON();
    }

    @Override
    public ModelTrace[] traces(TraceRequest request) {
        List<ModelTrace> traces = new ArrayList<ModelTrace>();
        if (TraceRequest.ATTRIBUTES_ONLY.equals(request) || TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
            for (int i = 0; i < metaAttributes().length; i++) {
                MetaAttribute current = metaAttributes()[i];
                Object payload = get(current);
                if (payload != null) {
                    traces.add(new ModelSetTrace(_uuid, current, payload));
                }
            }
        }
        if (TraceRequest.REFERENCES_ONLY.equals(request) || TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
            for (int i = 0; i < metaReferences().length; i++) {
                MetaReference ref = metaReferences()[i];
                Object[] raw = view().dimension().universe().storage().raw(this, AccessMode.READ);
                Object o = null;
                if (raw != null) {
                    o = raw[ref.index()];
                }
                if (o instanceof Set) {
                    Set<Long> contents = (Set<Long>) o;
                    Long[] contentsArr = contents.toArray(new Long[contents.size()]);
                    for (int j = 0; j < contentsArr.length; j++) {
                        traces.add(new ModelAddTrace(_uuid, ref, contentsArr[j], null));
                    }
                } else if (o != null) {
                    traces.add(new ModelAddTrace(_uuid, ref, (Long) o, null));
                }
            }
        }
        return traces.toArray(new ModelTrace[traces.size()]);
    }

    public void inbounds(final Callback<InboundReference> callback, final Callback<Throwable> end) {
        Object[] rawPayload = view().dimension().universe().storage().raw(this, AccessMode.READ);
        if (rawPayload == null) {
            end.on(new Exception("Object not initialized."));
        } else {
            Object payload = rawPayload[Index.INBOUNDS_INDEX];
            if (payload != null) {
                if (payload instanceof Map) {
                    final Map<Long, MetaReference> refs = (Map<Long, MetaReference>) payload;
                    Set<Long> oppositeKids = new HashSet<Long>();
                    oppositeKids.addAll(refs.keySet());
                    _view.lookupAll(oppositeKids.toArray(new Long[oppositeKids.size()]), new Callback<KObject[]>() {
                        @Override
                        public void on(KObject[] oppositeElements) {
                            if (oppositeElements != null) {
                                for (int k = 0; k < oppositeElements.length; k++) {
                                    KObject opposite = oppositeElements[k];
                                    MetaReference metaRef = refs.get(opposite.uuid());
                                    if (metaRef != null) {
                                        InboundReference reference = new InboundReference(metaRef, opposite);
                                        try {
                                            if (callback != null) {
                                                callback.on(reference);
                                            }
                                        } catch (Throwable t) {
                                            if (end != null) {
                                                end.on(t);
                                            }
                                        }
                                    } else {
                                        if (end != null) {
                                            end.on(new Exception("MetaReference not found with index:" + metaRef + " in refs of " + opposite.metaClass().metaName()));
                                        }
                                    }
                                }
                                if (end != null) {
                                    end.on(null);
                                }
                            } else {
                                if (end != null) {
                                    end.on(new Exception("Could not resolve opposite objects"));
                                }
                            }
                        }
                    });
                } else {
                    if (end != null) {
                        end.on(new Exception("Inbound refs payload is not a cset"));
                    }
                }
            } else {
                if (end != null) {
                    end.on(null);
                }
            }
        }
    }

    public void set_parent(Long p_parentKID, MetaReference p_metaReference) {
        Object[] raw = _view.dimension().universe().storage().raw(this, AccessMode.WRITE);
        raw[Index.PARENT_INDEX] = p_parentKID;
        raw[Index.REF_IN_PARENT_INDEX] = p_metaReference;
    }

    public abstract MetaAttribute[] metaAttributes();

    public abstract MetaReference[] metaReferences();

    public abstract MetaOperation[] metaOperations();

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof AbstractKObject)) {
            return false;
        } else {
            AbstractKObject casted = (AbstractKObject) obj;
            return (casted.uuid() == _uuid) && _view.equals(casted._view);
        }
    }

    @Override
    public void diff(KObject target, Callback<TraceSequence> callback) {
        DefaultModelCompare.diff(this, target, callback);
    }

    @Override
    public void merge(KObject target, Callback<TraceSequence> callback) {
        DefaultModelCompare.merge(this, target, callback);
    }

    @Override
    public void intersection(KObject target, Callback<TraceSequence> callback) {
        DefaultModelCompare.intersection(this, target, callback);
    }

    public void clone(Callback<A> callback) {
        DefaultModelCloner.clone((A) this, callback);
    }

    public void slice(Callback<TraceSequence> callback) {
        ArrayList<KObject> params = new ArrayList<KObject>();
        params.add(this);
        DefaultModelSlicer.slice(params, callback);
    }

}
