package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.KInfer;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KDefer;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelAttributeVisitor;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.ModelVisitor;
import org.kevoree.modeling.api.TraceRequest;
import org.kevoree.modeling.api.VisitRequest;
import org.kevoree.modeling.api.VisitResult;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.data.manager.Index;
import org.kevoree.modeling.api.data.manager.JsonRaw;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.operation.DefaultModelCompare;
import org.kevoree.modeling.api.util.ArrayUtils;
import org.kevoree.modeling.api.util.TimeWalker;
import org.kevoree.modeling.api.rbtree.LongRBTree;
import org.kevoree.modeling.api.traversal.DefaultKTraversal;
import org.kevoree.modeling.api.traversal.KTraversal;
import org.kevoree.modeling.api.traversal.actions.KParentsAction;
import org.kevoree.modeling.api.traversal.actions.KReverseQueryAction;
import org.kevoree.modeling.api.traversal.actions.KTraverseAction;
import org.kevoree.modeling.api.traversal.actions.KTraverseQueryAction;
import org.kevoree.modeling.api.traversal.selector.KSelector;
import org.kevoree.modeling.api.trace.ModelAddTrace;
import org.kevoree.modeling.api.trace.ModelSetTrace;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.trace.TraceSequence;
import org.kevoree.modeling.api.util.Checker;
import org.kevoree.modeling.api.util.PathHelper;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

/**
 * Created by duke on 10/9/14.
 */
public abstract class AbstractKObject implements KObject {

    private KView _view;
    private long _uuid;
    private LongRBTree _universeTree;
    private MetaClass _metaClass;

    public AbstractKObject(KView p_view, long p_uuid, LongRBTree p_universeTree, MetaClass p_metaClass) {
        this._view = p_view;
        this._uuid = p_uuid;
        this._metaClass = p_metaClass;
        this._universeTree = p_universeTree;
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
    public long now() {
        return _view.now();
    }

    @Override
    public LongRBTree universeTree() {
        return _universeTree;
    }

    @Override
    public KUniverse universe() {
        return _view.universe();
    }

    @Override
    public KDefer<String> path() {
        AbstractKDeferWrapper<String> task = new AbstractKDeferWrapper<String>();
        parent().then(new Callback<KObject>() {
            @Override
            public void on(KObject parent) {
                if (parent == null) {
                    task.initCallback().on("/");
                } else {
                    parent.path().then(new Callback<String>() {
                        @Override
                        public void on(String parentPath) {
                            task.initCallback().on(PathHelper.path(parentPath, referenceInParent(), AbstractKObject.this));
                        }
                    });
                }
            }
        });
        return task;
    }

    @Override
    public Long parentUuid() {
        KCacheEntry raw = _view.universe().model().manager().entry(this, AccessMode.READ);
        if (raw != null) {
            long[] parentKey = raw.getRef(Index.PARENT_INDEX);
            if (parentKey != null && parentKey.length > 0) {
                return parentKey[0];
            }
        }
        return null;
    }

    @Override
    public TimeWalker timeWalker() {
        return new TimeWalker(this);
    }

    @Override
    public KDefer<KObject> parent() {
        Long parentKID = parentUuid();
        if (parentKID == null) {
            AbstractKDeferWrapper<KObject> task = new AbstractKDeferWrapper<KObject>();
            task.initCallback().on(null);
            return task;
        } else {
            return _view.lookup(parentKID);
        }
    }

    @Override
    public MetaReference referenceInParent() {
        KCacheEntry raw = _view.universe().model().manager().entry(this, AccessMode.READ);
        if (raw == null) {
            return null;
        } else {
            return (MetaReference) raw.get(Index.REF_IN_PARENT_INDEX);
        }
    }

    @Override
    public KDefer<Throwable> delete() {
        AbstractKDeferWrapper<Throwable> task = new AbstractKDeferWrapper<Throwable>();
        KObject toRemove = this;
        KCacheEntry rawPayload = _view.universe().model().manager().entry(this, AccessMode.DELETE);
        if (rawPayload == null) {
            task.initCallback().on(new Exception("Out of cache Error"));
        } else {
            long[] inboundsKeys = rawPayload.getRef(Index.INBOUNDS_INDEX);
            if (inboundsKeys != null) {
                try {
                    ((AbstractKView) view()).internalLookupAll(inboundsKeys, new Callback<KObject[]>() {
                        @Override
                        public void on(KObject[] resolved) {
                            for (int i = 0; i < resolved.length; i++) {
                                if (resolved[i] != null) {
                                    MetaReference[] linkedReferences = resolved[i].referencesWith(toRemove);
                                    for (int j = 0; j < linkedReferences.length; j++) {
                                        ((AbstractKObject) resolved[i]).internal_mutate(KActionType.REMOVE, linkedReferences[j], toRemove, false, true);
                                    }
                                }
                            }
                            task.initCallback().on(null);
                        }
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                task.initCallback().on(new Exception("Out of cache error"));
            }
        }
        return task;
    }

    @Override
    public KDefer<KObject[]> select(String query) {
        AbstractKDeferWrapper<KObject[]> task = new AbstractKDeferWrapper<KObject[]>();
        if (!Checker.isDefined(query)) {
            task.initCallback().on(new KObject[0]);
        } else {
            String cleanedQuery = query;
            if (cleanedQuery.startsWith("/")) {
                cleanedQuery = cleanedQuery.substring(1);
            }
            if (query.startsWith("/")) {
                final String finalCleanedQuery = cleanedQuery;
                universe().model().manager().getRoot(this.view(), new Callback<KObject>() {
                    @Override
                    public void on(KObject rootObj) {
                        if (rootObj == null) {
                            task.initCallback().on(new KObject[0]);
                        } else {
                            KSelector.select(rootObj, finalCleanedQuery, task.initCallback());
                        }
                    }
                });
            } else {
                KSelector.select(this, query, task.initCallback());
            }
        }
        return task;
    }

    @Override
    public void listen(KEventListener listener) {
        universe().model().manager().cdn().registerListener(this, listener, null);
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
        }
    }

    private void removeFromContainer(final KObject param) {
        if (param != null && param.parentUuid() != null && param.parentUuid() != _uuid) {
            view().lookup(param.parentUuid()).then(new Callback<KObject>() {
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
            if (metaReferenceP == null) {
                throw new RuntimeException("Bad KMF usage, the reference " + " is null in metaClass named " + metaClass().metaName());
            } else {
                throw new RuntimeException("Bad KMF usage, the reference named " + metaReferenceP.metaName() + " is not part of " + metaClass().metaName());
            }
        }
        if (actionType.equals(KActionType.ADD)) {
            if (metaReference.single()) {
                internal_mutate(KActionType.SET, metaReference, param, setOpposite, inDelete);
            } else {
                KCacheEntry raw = view().universe().model().manager().entry(this, AccessMode.WRITE);
                long[] previousList = raw.getRef(metaReference.index());
                if (previousList == null) {
                    previousList = new long[1];
                    previousList[0] = param.uuid();
                } else {
                    previousList = ArrayUtils.add(previousList, param.uuid());
                }
                //In all the case we reset the value (set dirty is true now)
                raw.set(metaReference.index(), previousList);
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
                KCacheEntry rawParam = view().universe().model().manager().entry(param, AccessMode.WRITE);
                long[] previousInbounds = rawParam.getRef(Index.INBOUNDS_INDEX);
                if (previousInbounds == null) {
                    previousInbounds = new long[1];
                    previousInbounds[0] = uuid();
                } else {
                    previousInbounds = ArrayUtils.add(previousInbounds, uuid());
                }
                //In all the case we reset the value (set dirty to true now);
                rawParam.set(Index.INBOUNDS_INDEX, previousInbounds);
            }
        } else if (actionType.equals(KActionType.SET)) {
            if (!metaReference.single()) {
                internal_mutate(KActionType.ADD, metaReference, param, setOpposite, inDelete);
            } else {
                if (param == null) {
                    internal_mutate(KActionType.REMOVE, metaReference, null, setOpposite, inDelete);
                } else {
                    //Actual add
                    KCacheEntry payload = view().universe().model().manager().entry(this, AccessMode.WRITE);
                    long[] previous = payload.getRef(metaReference.index());
                    if (previous != null) {
                        internal_mutate(KActionType.REMOVE, metaReference, null, setOpposite, inDelete);
                    }
                    long[] singleValue = new long[1];
                    singleValue[0] = param.uuid();
                    payload.set(metaReference.index(), singleValue);
                    //Container
                    if (metaReference.contained()) {
                        removeFromContainer(param);
                        ((AbstractKObject) param).set_parent(_uuid, metaReference);
                    }
                    //Inbound
                    KCacheEntry rawParam = view().universe().model().manager().entry(param, AccessMode.WRITE);
                    long[] previousInbounds = rawParam.getRef(Index.INBOUNDS_INDEX);
                    if (previousInbounds == null) {
                        previousInbounds = new long[1];
                        previousInbounds[0] = uuid();
                    } else {
                        previousInbounds = ArrayUtils.add(previousInbounds, uuid());
                    }
                    rawParam.set(Index.INBOUNDS_INDEX, previousInbounds);
                    //Opposite
                    final KObject self = this;
                    if (metaReference.opposite() != null && setOpposite) {
                        if (previous != null) {
                            ((AbstractKView) view()).internalLookupAll(previous, new Callback<KObject[]>() {
                                @Override
                                public void on(KObject[] kObjects) {
                                    for (int i = 0; i < kObjects.length; i++) {
                                        ((AbstractKObject) kObjects[i]).internal_mutate(KActionType.REMOVE, metaReference.opposite(), self, false, inDelete);
                                    }
                                }
                            });
                        }
                        ((AbstractKObject) param).internal_mutate(KActionType.ADD, metaReference.opposite(), this, false, inDelete);
                    }
                }
            }
        } else if (actionType.equals(KActionType.REMOVE)) {
            if (metaReference.single()) {
                KCacheEntry raw = view().universe().model().manager().entry(this, AccessMode.WRITE);
                long[] previousKid = raw.getRef(metaReference.index());
                raw.set(metaReference.index(), null);
                if (previousKid != null) {
                    final KObject self = this;
                    _view.universe().model().manager().lookupAll(_view, previousKid, new Callback<KObject[]>() {
                        @Override
                        public void on(KObject[] resolvedParams) {
                            if (resolvedParams != null) {
                                for (int dd = 0; dd < resolvedParams.length; dd++) {
                                    if (resolvedParams[dd] != null) {
                                        KObject resolvedParam = resolvedParams[dd];
                                        if (metaReference.contained()) {
                                            ((AbstractKObject) resolvedParam).set_parent(null, null);
                                        }
                                        if (metaReference.opposite() != null && setOpposite) {
                                            ((AbstractKObject) resolvedParam).internal_mutate(KActionType.REMOVE, metaReference.opposite(), self, false, inDelete);
                                        }
                                        //Inbound
                                        KCacheEntry rawParam = view().universe().model().manager().entry(resolvedParam, AccessMode.WRITE);
                                        if (rawParam != null) {
                                            long[] previousInbounds = rawParam.getRef(Index.INBOUNDS_INDEX);
                                            if (previousInbounds != null) {
                                                previousInbounds = ArrayUtils.remove(previousInbounds, uuid());
                                                rawParam.set(Index.INBOUNDS_INDEX, previousInbounds);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            } else {
                KCacheEntry payload = view().universe().model().manager().entry(this, AccessMode.WRITE);
                Object previous = payload.get(metaReference.index());
                if (previous != null) {
                    try {
                        long[] previousList = (long[]) previous;
                        previousList = ArrayUtils.remove(previousList, param.uuid());
                        payload.set(metaReference.index(), previousList);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    if (!inDelete && metaReference.contained()) {
                        ((AbstractKObject) param).set_parent(null, null);
                    }
                    if (metaReference.opposite() != null && setOpposite) {
                        ((AbstractKObject) param).internal_mutate(KActionType.REMOVE, metaReference.opposite(), this, false, inDelete);
                    }
                }
                //Inbounds
                if (!inDelete) {
                    //Inbound
                    KCacheEntry rawParam = view().universe().model().manager().entry(param, AccessMode.WRITE);
                    if (rawParam != null && rawParam.get(Index.INBOUNDS_INDEX) != null) {
                        long[] previousInbounds;
                        try {
                            previousInbounds = (long[]) rawParam.get(Index.INBOUNDS_INDEX);
                        } catch (Exception e) {
                            e.printStackTrace();
                            previousInbounds = new long[0];
                        }
                        rawParam.set(Index.INBOUNDS_INDEX, previousInbounds);
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
            KCacheEntry raw = view().universe().model().manager().entry(this, AccessMode.READ);
            if (raw != null) {
                Object ref = raw.get(transposed.index());
                if (ref == null) {
                    return 0;
                } else {
                    try {
                        long[] castedRefArray = (long[]) ref;
                        return castedRefArray.length;
                    } catch (Exception e) {
                        e.printStackTrace();
                        return 0;
                    }
                }
            } else {
                return 0;
            }
        }
    }

    public void internal_ref(MetaReference p_metaReference, Callback<KObject[]> callback) {
        MetaReference transposed = internal_transpose_ref(p_metaReference);
        if (transposed == null) {
            throw new RuntimeException("Bad KMF usage, the reference named " + p_metaReference.metaName() + " is not part of " + metaClass().metaName());
        } else {
            KCacheEntry raw = view().universe().model().manager().entry(this, AccessMode.READ);
            if (raw == null) {
                callback.on(new KObject[0]);
            } else {
                Object o = raw.get(transposed.index());
                if (o == null) {
                    callback.on(new KObject[0]);
                } else {
                    ((AbstractKView) view()).internalLookupAll((long[]) o, callback);
                }
            }
        }
    }

    @Override
    public KDefer<KObject[]> ref(MetaReference p_metaReference) {
        AbstractKDeferWrapper<KObject[]> task = new AbstractKDeferWrapper<KObject[]>();
        internal_ref(p_metaReference, task.initCallback());
        return task;
    }

    @Override
    public KDefer<KObject[]> inferRef(MetaReference p_metaReference) {
        AbstractKDeferWrapper<KObject[]> task = new AbstractKDeferWrapper<KObject[]>();
        //TODO
        return task;
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

    @Override
    public KDefer<Throwable> visit(ModelVisitor p_visitor, VisitRequest p_request) {
        AbstractKDeferWrapper<Throwable> task = new AbstractKDeferWrapper<Throwable>();
        if (p_request.equals(VisitRequest.CHILDREN)) {
            internal_visit(p_visitor, task.initCallback(), false, false, null, null);
        } else if (p_request.equals(VisitRequest.ALL)) {
            internal_visit(p_visitor, task.initCallback(), true, false, new HashSet<Long>(), new HashSet<Long>());
        } else if (p_request.equals(VisitRequest.CONTAINED)) {
            internal_visit(p_visitor, task.initCallback(), true, true, null, null);
        }
        return task;
    }

    private void internal_visit(final ModelVisitor visitor, final Callback<Throwable> end, boolean deep, boolean containedOnly, final HashSet<Long> visited, final HashSet<Long> traversed) {
        if (!Checker.isDefined(visitor)) {
            return;
        }
        if (traversed != null) {
            traversed.add(_uuid);
        }
        final HashSet<Long> toResolveIds = new HashSet<Long>();
        for (int i = 0; i < metaClass().metaReferences().length; i++) {
            final MetaReference reference = metaClass().metaReferences()[i];
            if (!(containedOnly && !reference.contained())) {
                KCacheEntry raw = view().universe().model().manager().entry(this, AccessMode.READ);
                if (raw != null) {
                    Object obj = raw.get(reference.index());
                    if (obj != null) {
                        try {
                            long[] idArr = (long[]) obj;
                            for (int k = 0; k < idArr.length; k++) {
                                if (traversed == null || !traversed.contains(idArr[k])) { // this is for optimization
                                    toResolveIds.add(idArr[k]);
                                }
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
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
            long[] flattedRes = ArrayUtils.flatSet(toResolveIds);
            ((AbstractKView) view()).internalLookupAll(flattedRes, new Callback<KObject[]>() {
                @Override
                public void on(KObject[] resolvedArr) {
                    final List<KObject> nextDeep = new ArrayList<KObject>();

                    for (int i = 0; i < resolvedArr.length; i++) {
                        final KObject resolved = resolvedArr[i];
                        VisitResult result = VisitResult.CONTINUE;
                        if (resolved != null) {
                            if (visitor != null && (visited == null || !visited.contains(resolved.uuid()))) {
                                result = visitor.visit(resolved);
                            }
                            if (visited != null) {
                                visited.add(resolved.uuid());
                            }
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

    public String toJSON() {
        KCacheEntry raw = view().universe().model().manager().entry(this, AccessMode.READ);
        if (raw != null) {
            return JsonRaw.encode(raw, _uuid, _metaClass, true, false);
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
                KCacheEntry raw = view().universe().model().manager().entry(this, AccessMode.READ);
                if (raw != null) {
                    Object o = raw.get(ref.index());
                    try {
                        long[] castedArr = (long[]) o;
                        for (int j = 0; j < castedArr.length; j++) {
                            traces.add(new ModelAddTrace(_uuid, ref, castedArr[j]));
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return traces.toArray(new ModelTrace[traces.size()]);
    }

    @Override
    public KDefer<KObject[]> inbounds() {
        KCacheEntry rawPayload = view().universe().model().manager().entry(this, AccessMode.READ);
        if (rawPayload != null) {
            Object payload = rawPayload.get(Index.INBOUNDS_INDEX);
            if (payload != null) {
                try {
                    return _view.lookupAll((long[]) payload);
                } catch (Exception e) {
                    e.printStackTrace();
                    return _view.lookupAll(new long[0]);
                }
            } else {
                AbstractKDeferWrapper<KObject[]> task = new AbstractKDeferWrapper<KObject[]>();
                task.initCallback().on(new KObject[0]);
                return task;
            }
        } else {
            AbstractKDeferWrapper<KObject[]> task = new AbstractKDeferWrapper<KObject[]>();
            task.initCallback().on(new KObject[0]);
            return task;
        }
    }

    public void set_parent(Long p_parentKID, MetaReference p_metaReference) {
        KCacheEntry raw = _view.universe().model().manager().entry(this, AccessMode.WRITE);
        if (raw != null) {
            if (p_parentKID != null) {
                long[] parentKey = new long[1];
                parentKey[0] = p_parentKID;
                raw.set(Index.PARENT_INDEX, parentKey);
            } else {
                raw.set(Index.PARENT_INDEX, null);
            }
            raw.set(Index.REF_IN_PARENT_INDEX, p_metaReference);
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
    public int hashCode() {
        //TODO use Array hash function to be more efficient
        String hashString = uuid() + "-" + view().now() + "-" + view().universe().key();
        return hashString.hashCode();
    }

    @Override
    public KDefer<TraceSequence> diff(KObject target) {
        AbstractKDeferWrapper<TraceSequence> task = new AbstractKDeferWrapper<TraceSequence>();
        DefaultModelCompare.diff(this, target, task.initCallback());
        return task;
    }

    @Override
    public KDefer<TraceSequence> merge(KObject target) {
        AbstractKDeferWrapper<TraceSequence> task = new AbstractKDeferWrapper<TraceSequence>();
        DefaultModelCompare.merge(this, target, task.initCallback());
        return task;
    }

    @Override
    public KDefer<TraceSequence> intersection(KObject target) {
        AbstractKDeferWrapper<TraceSequence> task = new AbstractKDeferWrapper<TraceSequence>();
        DefaultModelCompare.intersection(this, target, task.initCallback());
        return task;
    }

    @Override
    public <U extends KObject> KDefer<U> jump(long time) {
        AbstractKDeferWrapper<U> task = new AbstractKDeferWrapper<U>();
        view().universe().time(time).lookup(_uuid).then(new Callback<KObject>() {
            @Override
            public void on(KObject kObject) {
                U casted = null;
                try {
                    casted = (U) kObject;
                } catch (Throwable e) {
                    e.printStackTrace();
                }
                task.initCallback().on(casted);
            }
        });
        return task;
    }

    public MetaReference internal_transpose_ref(MetaReference p) {
        if (!Checker.isDefined(p)) {
            return null;
        } else {
            return (MetaReference) metaClass().metaByName(p.metaName());
        }
    }

    public MetaAttribute internal_transpose_att(MetaAttribute p) {
        if (!Checker.isDefined(p)) {
            return null;
        } else {
            return (MetaAttribute) metaClass().metaByName(p.metaName());
        }
    }

    public MetaOperation internal_transpose_op(MetaOperation p) {
        if (!Checker.isDefined(p)) {
            return null;
        } else {
            return (MetaOperation) metaClass().metaByName(p.metaName());
        }
    }

    public KTraversal traverse(MetaReference p_metaReference) {
        return new DefaultKTraversal(this, new KTraverseAction(p_metaReference));
    }

    public KTraversal traverseQuery(String metaReferenceQuery) {
        return new DefaultKTraversal(this, new KTraverseQueryAction(metaReferenceQuery));
    }

    public KTraversal traverseInbounds(String metaReferenceQuery) {
        return new DefaultKTraversal(this, new KReverseQueryAction(metaReferenceQuery));
    }

    public KTraversal traverseParent() {
        return new DefaultKTraversal(this, new KParentsAction());
    }

    @Override
    public MetaReference[] referencesWith(KObject o) {
        if (Checker.isDefined(o)) {
            KCacheEntry raw = _view.universe().model().manager().entry(this, AccessMode.READ);
            if (raw != null) {
                MetaReference[] allReferences = metaClass().metaReferences();
                List<MetaReference> selected = new ArrayList<MetaReference>();
                for (int i = 0; i < allReferences.length; i++) {
                    long[] rawI = raw.getRef(allReferences[i].index());
                    if (rawI != null) {
                        if (ArrayUtils.contains(rawI, o.uuid()) != -1) {
                            selected.add(allReferences[i]);
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

    @Override
    public KDefer<Object> call(MetaOperation p_operation, Object[] p_params) {
        AbstractKDeferWrapper<Object> temp_task = new AbstractKDeferWrapper<Object>();
        view().universe().model().manager().operationManager().call(this, p_operation, p_params, temp_task.initCallback());
        return temp_task;
    }

    @Override
    public KDefer<KInfer[]> inferObjects() {
        AbstractKDeferWrapper<KInfer[]> task = new AbstractKDeferWrapper<KInfer[]>();
        //TODO
        return task;
    }

    @Override
    public Object inferAttribute(MetaAttribute attribute) {
        //TODO
        return null;
    }

    @Override
    public KDefer<Object> inferCall(MetaOperation operation, Object[] params) {
        AbstractKDeferWrapper<Object> temp_task = new AbstractKDeferWrapper<Object>();
        //TODO
        return temp_task;
    }

}
