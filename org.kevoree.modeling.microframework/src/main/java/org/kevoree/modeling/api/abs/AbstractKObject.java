package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.data.AccessMode;
import org.kevoree.modeling.api.data.Index;
import org.kevoree.modeling.api.data.JsonRaw;
import org.kevoree.modeling.api.event.DefaultKEvent;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.operation.DefaultModelCompare;
import org.kevoree.modeling.api.operation.DefaultModelSlicer;
import org.kevoree.modeling.api.traversal.DefaultKTraversalPromise;
import org.kevoree.modeling.api.traversal.KTraversalPromise;
import org.kevoree.modeling.api.select.KSelector;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.trace.ModelAddTrace;
import org.kevoree.modeling.api.trace.ModelSetTrace;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.trace.TraceSequence;
import org.kevoree.modeling.api.util.Checker;
import org.kevoree.modeling.api.util.Helper;

import java.util.*;

/**
 * Created by duke on 10/9/14.
 */
public abstract class AbstractKObject implements KObject {

    private KView _view;
    private long _uuid;
    private TimeTree _timeTree;
    private MetaClass _metaClass;

    public AbstractKObject(KView p_view, long p_uuid, TimeTree p_timeTree, MetaClass p_metaClass) {
        this._view = p_view;
        this._uuid = p_uuid;
        this._timeTree = p_timeTree;
        this._metaClass = p_metaClass;
    }

    @Override
    public KView view() {
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
        Object[] raw = _view.universe().model().storage().raw(this, AccessMode.READ);
        if (raw != null) {
            Boolean isRoot = (Boolean) raw[Index.IS_ROOT_INDEX];
            if (isRoot == null) {
                return false;
            } else {
                return isRoot;
            }
        } else {
            return false;
        }
    }

    public void setRoot(boolean isRoot) {
        Object[] raw = _view.universe().model().storage().raw(this, AccessMode.WRITE);
        if (raw != null) {
            raw[Index.IS_ROOT_INDEX] = isRoot;
        }
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
    public KUniverse dimension() {
        return _view.universe();
    }

    @Override
    public void path(final Callback<String> callback) {
        if (!Checker.isDefined(callback)) {
            return;
        }
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
        Object[] raw = _view.universe().model().storage().raw(this, AccessMode.READ);
        if (raw == null) {
            return null;
        } else {
            return (Long) raw[Index.PARENT_INDEX];
        }
    }

    @Override
    public void parent(Callback<KObject> callback) {
        if (!Checker.isDefined(callback)) {
            return;
        }
        Long parentKID = parentUuid();
        if (parentKID == null) {
            callback.on(null);
        } else {
            _view.lookup(parentKID, callback);
        }
    }

    @Override
    public MetaReference referenceInParent() {
        Object[] raw = _view.universe().model().storage().raw(this, AccessMode.READ);
        if (raw == null) {
            return null;
        } else {
            return (MetaReference) raw[Index.REF_IN_PARENT_INDEX];
        }
    }

    @Override
    public void delete(Callback<Throwable> callback) {
        KObject toRemove = this;
        Object[] rawPayload = _view.universe().model().storage().raw(this, AccessMode.DELETE);
        if (rawPayload == null) {
            callback.on(null);
        } else {
            Object payload = rawPayload[Index.INBOUNDS_INDEX];
            if (payload != null) {
                Map<Long, MetaReference> refs;
                try {
                    refs = (Map<Long, MetaReference>) payload;
                } catch (Exception e) {
                    refs = null;
                    e.printStackTrace();
                    if (callback != null) {
                        callback.on(e);
                    }
                }
                if (refs != null) {
                    Long[] refArr = refs.keySet().toArray(new Long[refs.size()]);
                    final Map<Long, MetaReference> finalRefs = refs;
                    view().lookupAll(refArr, new Callback<KObject[]>() {
                        @Override
                        public void on(KObject[] resolved) {
                            for (int i = 0; i < resolved.length; i++) {
                                if (resolved[i] != null) {
                                    ((AbstractKObject) resolved[i]).internal_mutate(KActionType.REMOVE, finalRefs.get(refArr[i]), toRemove, false, true);
                                }
                            }
                            if (callback != null) {
                                callback.on(null);
                            }
                        }
                    });
                }
            } else {
                if (callback != null) {
                    callback.on(new Exception("Out of cache error"));
                }
            }
        }
    }

    @Override
    public void select(String query, Callback<KObject[]> callback) {
        if (!Checker.isDefined(callback)) {
            return;
        }
        if (!Checker.isDefined(query)) {
            callback.on(new KObject[0]);
            return;
        }
        String cleanedQuery = query;
        if (cleanedQuery.startsWith("/")) {
            cleanedQuery = cleanedQuery.substring(1);
        }
        if (isRoot()) {
            KObject[] roots = new KObject[1];
            roots[0] = this;
            KSelector.select(this.view(), roots, cleanedQuery, callback);
        } else {
            if (query.startsWith("/")) {
                final String finalCleanedQuery = cleanedQuery;
                dimension().model().storage().getRoot(this.view(), new Callback<KObject>() {
                    @Override
                    public void on(KObject rootObj) {
                        if (rootObj == null) {
                            callback.on(new KObject[0]);
                        } else {
                            KObject[] roots = new KObject[1];
                            roots[0] = rootObj;
                            KSelector.select(rootObj.view(), roots, finalCleanedQuery, callback);
                        }
                    }
                });
            } else {
                KObject[] roots = new KObject[1];
                roots[0] = this;
                KSelector.select(this.view(), roots, query, callback);
            }
        }
    }

    @Override
    public void listen(ModelListener listener) {
        dimension().model().storage().eventBroker().registerListener(this, listener, null);
    }

    @Override
    public String domainKey() {
        StringBuilder builder = new StringBuilder();
        MetaAttribute[] atts = metaClass().metaAttributes();
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
                    //TODO, forbid multiple cardinality as domainKey
                    builder.append(payload.toString());
                }
            }
        }
        String result = builder.toString();
        if (result.equals("")) {
            return uuid() + "";
        } else {
            return result;
        }
    }

    @Override
    public Object get(MetaAttribute p_attribute) {
        MetaAttribute transposed = internal_transpose_att(p_attribute);
        if (transposed == null) {
            throw new RuntimeException("Bad KMF usage, the attribute named " + p_attribute.metaName() + " is not part of " + metaClass().metaName());
        } else {
            return transposed.strategy().extrapolate(this, transposed);
        }
    }

    @Override
    public void set(MetaAttribute p_attribute, Object payload) {
        MetaAttribute transposed = internal_transpose_att(p_attribute);
        if (transposed == null) {
            throw new RuntimeException("Bad KMF usage, the attribute named " + p_attribute.metaName() + " is not part of " + metaClass().metaName());
        } else {
            transposed.strategy().mutate(this, transposed, payload);
            view().universe().model().storage().eventBroker().notify(new DefaultKEvent(KActionType.SET, this, transposed, payload));
        }
    }

    private HashMap<Long, MetaReference> getOrCreateInbounds(KObject obj) {
        Object[] rawWrite = view().universe().model().storage().raw(obj, AccessMode.WRITE);
        if (rawWrite == null) {
            return null;
        } else {
            if (rawWrite[Index.INBOUNDS_INDEX] != null && rawWrite[Index.INBOUNDS_INDEX] instanceof HashMap) {
                return (HashMap<Long, MetaReference>) rawWrite[Index.INBOUNDS_INDEX];
            } else {
                if (rawWrite[Index.INBOUNDS_INDEX] != null) {
                    try {
                        throw new Exception("Bad cache values in KMF, " + rawWrite[Index.INBOUNDS_INDEX] + " is not an instance of Map for the inbounds reference ");
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                HashMap<Long, MetaReference> newRefs = new HashMap<Long, MetaReference>();
                rawWrite[Index.INBOUNDS_INDEX] = newRefs;
                return newRefs;
            }
        }
    }

    private void removeFromContainer(final KObject param) {
        if (param != null && param.parentUuid() != null && param.parentUuid() != _uuid) {
            view().lookup(param.parentUuid(), new Callback<KObject>() {
                @Override
                public void on(KObject parent) {
                    ((AbstractKObject) parent).internal_mutate(KActionType.REMOVE, param.referenceInParent(), param, true, false);
                }
            });
        }
    }

    @Override
    public void mutate(KActionType actionType, final MetaReference metaReference, KObject param) {
        internal_mutate(actionType, metaReference, param, true, false);
    }

    public void internal_mutate(KActionType actionType, final MetaReference metaReferenceP, KObject param, final boolean setOpposite, final boolean inDelete) {
        MetaReference metaReference = internal_transpose_ref(metaReferenceP);
        if (metaReference == null) {
            if(metaReferenceP == null){
                throw new RuntimeException("Bad KMF usage, the reference " + " is null in metaClass named " + metaClass().metaName());
            } else {
                throw new RuntimeException("Bad KMF usage, the reference named " + metaReferenceP.metaName() + " is not part of " + metaClass().metaName());
            }
        }
        if (actionType.equals(KActionType.ADD)) {
            if (metaReference.single()) {
                internal_mutate(KActionType.SET, metaReference, param, setOpposite, inDelete);
            } else {
                Object[] raw = view().universe().model().storage().raw(this, AccessMode.WRITE);
                Set<Long> previousList;
                if (raw[metaReference.index()] != null && raw[metaReference.index()] instanceof Set) {
                    previousList = (Set<Long>) raw[metaReference.index()];
                } else {
                    if (raw[metaReference.index()] != null) {
                        try {
                            throw new Exception("Bad cache values in KMF, " + raw[metaReference.index()] + " is not an instance of Set for the reference " + metaReference.metaName() + ", index:" + metaReference.index());
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    previousList = new HashSet<Long>();
                    raw[metaReference.index()] = previousList;
                }
                //Actual add
                previousList.add(param.uuid());
                //Opposite
                if (metaReference.opposite() != null && setOpposite) {
                    ((AbstractKObject) param).internal_mutate(KActionType.ADD, metaReference.opposite(), this, false, inDelete);
                }
                //Container
                if (metaReference.contained()) {
                    removeFromContainer(param);
                    ((AbstractKObject) param).set_parent(_uuid, metaReference);
                }
                //Inbound
                Map<Long, MetaReference> inboundRefs = getOrCreateInbounds(param);
                inboundRefs.put(uuid(), metaReference);

                //publish event
                KEvent event = new DefaultKEvent(actionType, this, metaReference, param);
                view().universe().model().storage().eventBroker().notify(event);

            }
        } else if (actionType.equals(KActionType.SET)) {
            if (!metaReference.single()) {
                internal_mutate(KActionType.ADD, metaReference, param, setOpposite, inDelete);
            } else {
                if (param == null) {
                    internal_mutate(KActionType.REMOVE, metaReference, null, setOpposite, inDelete);
                } else {
                    //Actual add
                    Object[] payload = view().universe().model().storage().raw(this, AccessMode.WRITE);
                    Object previous = payload[metaReference.index()];
                    if (previous != null) {
                        internal_mutate(KActionType.REMOVE, metaReference, null, setOpposite, inDelete);
                    }
                    payload[metaReference.index()] = param.uuid();
                    //Container
                    if (metaReference.contained()) {
                        removeFromContainer(param);
                        ((AbstractKObject) param).set_parent(_uuid, metaReference);
                    }
                    //Inbound
                    Map<Long, MetaReference> inboundRefs = getOrCreateInbounds(param);
                    inboundRefs.put(uuid(), metaReference);
                    //Opposite
                    final KObject self = this;
                    if (metaReference.opposite() != null && setOpposite) {
                        if (previous != null) {
                            view().lookup((Long) previous, new Callback<KObject>() {
                                @Override
                                public void on(KObject resolved) {
                                    ((AbstractKObject) resolved).internal_mutate(KActionType.REMOVE, metaReference.opposite(), self, false, inDelete);
                                }
                            });
                        }
                        ((AbstractKObject) param).internal_mutate(KActionType.ADD, metaReference.opposite(), this, false, inDelete);
                    }
                    KEvent event = new DefaultKEvent(actionType, this, metaReference, param);
                    view().universe().model().storage().eventBroker().notify(event);
                }
            }
        } else if (actionType.equals(KActionType.REMOVE)) {
            if (metaReference.single()) {
                Object[] raw = view().universe().model().storage().raw(this, AccessMode.WRITE);
                Object previousKid = raw[metaReference.index()];
                raw[metaReference.index()] = null;
                if (previousKid != null) {
                    final KObject self = this;
                    _view.universe().model().storage().lookup(_view, (Long) previousKid, new Callback<KObject>() {
                        @Override
                        public void on(KObject resolvedParam) {
                            if (resolvedParam != null) {
                                if (metaReference.contained()) {
                                    ((AbstractKObject) resolvedParam).set_parent(null, null);
                                }
                                if (metaReference.opposite() != null && setOpposite) {
                                    ((AbstractKObject) resolvedParam).internal_mutate(KActionType.REMOVE, metaReference.opposite(), self, false, inDelete);
                                }
                                //Inbounds
                                Map<Long, MetaReference> inboundRefs = getOrCreateInbounds(resolvedParam);
                                inboundRefs.remove(uuid());
                            }
                        }
                    });
                    //publish event
                    KEvent event = new DefaultKEvent(actionType, this, metaReference, previousKid);
                    view().universe().model().storage().eventBroker().notify(event);
                }
            } else {
                Object[] payload = view().universe().model().storage().raw(this, AccessMode.WRITE);
                Object previous = payload[metaReference.index()];
                if (previous != null) {
                    Set<Long> previousList = (Set<Long>) previous;
                    previousList.remove(param.uuid());
                    if (!inDelete && metaReference.contained()) {
                        ((AbstractKObject) param).set_parent(null, null);
                    }
                    if (metaReference.opposite() != null && setOpposite) {
                        ((AbstractKObject) param).internal_mutate(KActionType.REMOVE, metaReference.opposite(), this, false, inDelete);
                    }
                    //publish event
                    KEvent event = new DefaultKEvent(actionType, this, metaReference, param);
                    view().universe().model().storage().eventBroker().notify(event);
                }
                //Inbounds
                if (!inDelete) {
                    Map<Long, MetaReference> inboundRefs = getOrCreateInbounds(param);
                    if (inboundRefs != null) {
                        inboundRefs.remove(uuid());
                    }
                }
            }
        }
    }

    public int size(MetaReference p_metaReference) {
        MetaReference transposed = internal_transpose_ref(p_metaReference);
        if (transposed == null) {
            throw new RuntimeException("Bad KMF usage, the attribute named " + p_metaReference.metaName() + " is not part of " + metaClass().metaName());
        } else {
            Object[] raw = view().universe().model().storage().raw(this, AccessMode.READ);
            if (raw != null) {
                Object ref = raw[transposed.index()];
                if (ref == null) {
                    return 0;
                } else {
                    Set<Object> refSet = (Set<Object>) ref;
                    return refSet.size();
                }
            } else {
                return 0;
            }
        }
    }

    public void single(MetaReference p_metaReference, Callback<KObject> p_callback) {
        MetaReference transposed = internal_transpose_ref(p_metaReference);
        if (transposed == null) {
            throw new RuntimeException("Bad KMF usage, the reference named " + p_metaReference.metaName() + " is not part of " + metaClass().metaName());
        } else {
            Object[] raw = view().universe().model().storage().raw(this, AccessMode.READ);
            if (raw == null || raw[transposed.index()] == null) {
                p_callback.on(null);
            } else {
                Object o = raw[transposed.index()];
                Long casted = null;
                try {
                    casted = (Long) o;
                } catch (Exception e) {
                    e.printStackTrace();
                    p_callback.on(null);
                }
                if (casted != null) {
                    view().lookup(casted, new Callback<KObject>() {
                        @Override
                        public void on(KObject resolved) {
                            p_callback.on(resolved);
                        }
                    });
                }
            }
        }
    }

    public void all(MetaReference p_metaReference, final Callback<KObject[]> p_callback) {
        if (!Checker.isDefined(p_callback)) {
            return;
        }
        MetaReference transposed = internal_transpose_ref(p_metaReference);
        if (transposed == null) {
            throw new RuntimeException("Bad KMF usage, the reference named " + p_metaReference.metaName() + " is not part of " + metaClass().metaName());
        } else {
            Object[] raw = view().universe().model().storage().raw(this, AccessMode.READ);
            if (raw == null) {
                p_callback.on(new KObject[0]);
            } else {
                Object o = raw[transposed.index()];
                if (o == null) {
                    p_callback.on(new KObject[0]);
                } else if (o instanceof Set) {
                    Set<Long> objs = (Set<Long>) o;
                    Long[] setContent = objs.toArray(new Long[objs.size()]);
                    view().lookupAll(setContent, new Callback<KObject[]>() {
                        @Override
                        public void on(KObject[] result) {
                            try {
                                p_callback.on(result);
                            } catch (Throwable t) {
                                t.printStackTrace();
                                p_callback.on(null);
                            }
                        }
                    });
                } else {
                    p_callback.on(new KObject[0]);
                }
            }
        }
    }

    @Override
    public void visitAttributes(ModelAttributeVisitor visitor) {
        if (!Checker.isDefined(visitor)) {
            return;
        }
        MetaAttribute[] metaAttributes = metaClass().metaAttributes();
        for (int i = 0; i < metaAttributes.length; i++) {
            visitor.visit(metaAttributes[i], get(metaAttributes[i]));
        }
    }

    public void visit(ModelVisitor visitor, Callback<Throwable> end) {
        internal_visit(visitor, end, false, false, null, null);
    }

    private void internal_visit(final ModelVisitor visitor, final Callback<Throwable> end, boolean deep, boolean containedOnly, final HashSet<Long> visited, final HashSet<Long> traversed) {
        if (!Checker.isDefined(visitor)) {
            return;
        }
        if (traversed != null) {
            traversed.add(uuid());
        }
        final Set<Long> toResolveIds = new HashSet<Long>();
        for (int i = 0; i < metaClass().metaReferences().length; i++) {
            final MetaReference reference = metaClass().metaReferences()[i];
            if (!(containedOnly && !reference.contained())) {
                Object[] raw = view().universe().model().storage().raw(this, AccessMode.READ);
                Object obj = null;
                if (raw != null) {
                    obj = raw[reference.index()];
                }
                if (obj != null) {
                    if (obj instanceof Set) {
                        Set<Long> ids = (Set<Long>) obj;
                        Long[] idArr = ids.toArray(new Long[ids.size()]);
                        for (int k = 0; k < idArr.length; k++) {
                            if (traversed == null || !traversed.contains(idArr[k])) { // this is for optimization
                                toResolveIds.add(idArr[k]);
                            }
                        }
                    } else {
                        if (traversed == null || !traversed.contains(obj)) { // this is for optimization
                            toResolveIds.add((Long) obj);
                        }
                    }
                }
            }
        }
        if (toResolveIds.isEmpty()) {
            if (Checker.isDefined(end)) {
                end.on(null);
            }
        } else {
            final Long[] toResolveIdsArr = toResolveIds.toArray(new Long[toResolveIds.size()]);
            view().lookupAll(toResolveIdsArr, new Callback<KObject[]>() {
                @Override
                public void on(KObject[] resolvedArr) {
                    final List<KObject> nextDeep = new ArrayList<KObject>();

                    for (int i = 0; i < resolvedArr.length; i++) {
                        final KObject resolved = resolvedArr[i];
                        VisitResult result = VisitResult.CONTINUE;
                        if (visitor != null && (visited == null || !visited.contains(resolved.uuid()))) {
                            result = visitor.visit(resolved);
                        }
                        if (visited != null) {
                            visited.add(resolved.uuid());
                        }
                        if (result != null && result.equals(VisitResult.STOP)) {
                            if (Checker.isDefined(end)) {
                                end.on(null);
                            }
                        } else {
                            if (deep) {
                                if (result.equals(VisitResult.CONTINUE)) {
                                    if (traversed == null || !traversed.contains(resolved.uuid())) {
                                        nextDeep.add(resolved);
                                    }
                                }
                            }
                        }
                    }
                    if (!nextDeep.isEmpty()) {
                        final int[] index = new int[1];
                        index[0] = 0;
                        final List<Callback<Throwable>> next = new ArrayList<Callback<Throwable>>();
                        next.add(new Callback<Throwable>() {
                            @Override
                            public void on(Throwable throwable) {
                                index[0] = index[0] + 1;
                                if (index[0] == nextDeep.size()) {
                                    if (Checker.isDefined(end)) {
                                        end.on(null);
                                    }
                                } else {
                                    final AbstractKObject abstractKObject = (AbstractKObject) nextDeep.get(index[0]);
                                    if (containedOnly) {
                                        abstractKObject.internal_visit(visitor, next.get(0), true, true, visited, traversed);
                                    } else {
                                        abstractKObject.internal_visit(visitor, next.get(0), true, false, visited, traversed);
                                    }
                                }
                            }
                        });

                        final AbstractKObject abstractKObject = (AbstractKObject) nextDeep.get(index[0]);
                        if (containedOnly) {
                            abstractKObject.internal_visit(visitor, next.get(0), true, true, visited, traversed);
                        } else {
                            abstractKObject.internal_visit(visitor, next.get(0), true, false, visited, traversed);
                        }
                    } else {
                        if (Checker.isDefined(end)) {
                            end.on(null);
                        }
                    }
                }
            });
        }
    }

    public void graphVisit(ModelVisitor visitor, Callback<Throwable> end) {
        internal_visit(visitor, end, true, false, new HashSet<Long>(), new HashSet<Long>());
    }

    public void treeVisit(ModelVisitor visitor, Callback<Throwable> end) {
        internal_visit(visitor, end, true, true, null, null);
    }

    public String toJSON() {
        Object[] raw = view().universe().model().storage().raw(this, AccessMode.READ);
        if (raw != null) {
            return JsonRaw.encode(raw, _uuid, _metaClass);
        } else {
            return "";
        }
    }

    @Override
    public String toString() {
        return toJSON();
    }

    @Override
    public ModelTrace[] traces(TraceRequest request) {
        if (!Checker.isDefined(request)) {
            return null;
        }
        List<ModelTrace> traces = new ArrayList<ModelTrace>();
        if (TraceRequest.ATTRIBUTES_ONLY.equals(request) || TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
            for (int i = 0; i < metaClass().metaAttributes().length; i++) {
                MetaAttribute current = metaClass().metaAttributes()[i];
                Object payload = get(current);
                if (payload != null) {
                    traces.add(new ModelSetTrace(_uuid, current, payload));
                }
            }
        }
        if (TraceRequest.REFERENCES_ONLY.equals(request) || TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
            for (int i = 0; i < metaClass().metaReferences().length; i++) {
                MetaReference ref = metaClass().metaReferences()[i];
                Object[] raw = view().universe().model().storage().raw(this, AccessMode.READ);
                Object o = null;
                if (raw != null) {
                    o = raw[ref.index()];
                }
                if (o instanceof Set) {
                    Set<Long> contents = (Set<Long>) o;
                    Long[] contentsArr = contents.toArray(new Long[contents.size()]);
                    for (int j = 0; j < contentsArr.length; j++) {
                        traces.add(new ModelAddTrace(_uuid, ref, contentsArr[j]));
                    }
                } else if (o != null) {
                    traces.add(new ModelAddTrace(_uuid, ref, (Long) o));
                }
            }
        }
        return traces.toArray(new ModelTrace[traces.size()]);
    }

    public void inbounds(final Callback<InboundReference> callback, final Callback<Throwable> end) {
        Object[] rawPayload = view().universe().model().storage().raw(this, AccessMode.READ);
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
        Object[] raw = _view.universe().model().storage().raw(this, AccessMode.WRITE);
        if (raw != null) {
            raw[Index.PARENT_INDEX] = p_parentKID;
            raw[Index.REF_IN_PARENT_INDEX] = p_metaReference;
        }
    }

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

    public void slice(Callback<TraceSequence> callback) {
        ArrayList<KObject> params = new ArrayList<KObject>();
        params.add(this);
        DefaultModelSlicer.slice(params, callback);
    }

    @Override
    public <U extends KObject> void jump(Long time, final Callback<U> callback) {
        view().universe().time(time).lookup(uuid(), new Callback<KObject>() {
            @Override
            public void on(KObject kObject) {
                if (callback != null) {
                    try {
                        callback.on((U) kObject);
                    } catch (Throwable e) {
                        e.printStackTrace();
                        callback.on(null);
                    }
                }
            }
        });
    }

    public MetaReference internal_transpose_ref(MetaReference p) {
        if (!Checker.isDefined(p)) {
            return null;
        } else {
            return metaClass().metaReference(p.metaName());
        }
    }

    public MetaAttribute internal_transpose_att(MetaAttribute p) {
        if (!Checker.isDefined(p)) {
            return null;
        } else {
            return metaClass().metaAttribute(p.metaName());
        }
    }

    public MetaOperation internal_transpose_op(MetaOperation p) {
        if (!Checker.isDefined(p)) {
            return null;
        } else {
            return metaClass().metaOperation(p.metaName());
        }
    }

    public KTraversalPromise traverse(MetaReference p_metaReference) {
        return new DefaultKTraversalPromise(this, p_metaReference);
    }

    @Override
    public MetaReference[] referencesWith(KObject o) {
        if (Checker.isDefined(o)) {
            Object[] raw = _view.universe().model().storage().raw(this, AccessMode.READ);
            if (raw != null) {
                MetaReference[] allReferences = metaClass().metaReferences();
                List<MetaReference> selected = new ArrayList<MetaReference>();
                for (int i = 0; i < allReferences.length; i++) {
                    Object rawI = raw[allReferences[i].index()];
                    if (rawI instanceof Set) {
                        try {
                            Set<Long> castedSet = (Set<Long>) rawI;
                            if (castedSet.contains(o.uuid())) {
                                selected.add(allReferences[i]);
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    } else if (rawI != null) {
                        try {
                            Long casted = (Long) rawI;
                            if (casted == o.uuid()) {
                                selected.add(allReferences[i]);
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }
                return selected.toArray(new MetaReference[selected.size()]);
            } else {
                return new MetaReference[0];
            }
        } else {
            return new MetaReference[0];
        }
    }

}
