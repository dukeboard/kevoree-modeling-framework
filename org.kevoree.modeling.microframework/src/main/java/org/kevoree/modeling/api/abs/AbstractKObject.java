package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.data.manager.Index;
import org.kevoree.modeling.api.data.manager.JsonRaw;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.map.LongLongHashMapCallBack;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.util.ArrayUtils;
import org.kevoree.modeling.api.traversal.DefaultKTraversal;
import org.kevoree.modeling.api.traversal.KTraversal;
import org.kevoree.modeling.api.traversal.selector.KSelector;
import org.kevoree.modeling.api.util.Checker;

import java.util.ArrayList;
import java.util.List;

public abstract class AbstractKObject implements KObject {

    private KView _view;
    private long _uuid;
    private MetaClass _metaClass;
    private static final String OUT_OF_CACHE_MSG = "Out of cache Error";

    public AbstractKObject(KView p_view, long p_uuid, MetaClass p_metaClass) {
        this._view = p_view;
        this._uuid = p_uuid;
        this._metaClass = p_metaClass;
        p_view.universe().model().manager().cache().monitor(this);
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
    public KUniverse universe() {
        return _view.universe();
    }

    @Override
    public long parentUuid() {
        KCacheEntry raw = _view.universe().model().manager().entry(this, AccessMode.READ);
        if (raw != null) {
            long[] parentKey = raw.getRef(Index.PARENT_INDEX);
            if (parentKey != null && parentKey.length > 0) {
                return parentKey[0];
            }
        }
        return KConfig.NULL_LONG;
    }

    @Override
    public KTimeWalker timeWalker() {
        return new AbstractTimeWalker(this);
    }

    @Override
    public KDefer<KObject> parent() {
        long parentKID = parentUuid();
        if (parentKID == KConfig.NULL_LONG) {
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
        final AbstractKDeferWrapper<Throwable> task = new AbstractKDeferWrapper<Throwable>();
        final KObject toRemove = this;
        KCacheEntry rawPayload = _view.universe().model().manager().entry(this, AccessMode.DELETE);
        if (rawPayload == null) {
            task.initCallback().on(new Exception(OUT_OF_CACHE_MSG));
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
                task.initCallback().on(new Exception(OUT_OF_CACHE_MSG));
            }
        }
        return task;
    }

    @Override
    public KDefer<KObject[]> select(String query) {
        final AbstractKDeferWrapper<KObject[]> task = new AbstractKDeferWrapper<KObject[]>();
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
    public void listen(long groupId, KEventListener listener) {
        universe().model().manager().cdn().registerListener(groupId, this, listener);
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
        if (param != null && param.parentUuid() != KConfig.NULL_LONG && param.parentUuid() != _uuid) {
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
        final MetaReference metaReference = internal_transpose_ref(metaReferenceP);
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
                                            ((AbstractKObject) resolvedParam).set_parent(KConfig.NULL_LONG, null);
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
                long[] previous = payload.getRef(metaReference.index());
                if (previous != null) {
                    try {
                        previous = ArrayUtils.remove(previous, param.uuid());
                        payload.set(metaReference.index(), previous);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    if (!inDelete && metaReference.contained()) {
                        ((AbstractKObject) param).set_parent(KConfig.NULL_LONG, null);
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
    public KDefer<Throwable> visit(VisitRequest p_request, ModelVisitor p_visitor) {
        AbstractKDeferWrapper<Throwable> task = new AbstractKDeferWrapper<Throwable>();
        if (p_request.equals(VisitRequest.CHILDREN)) {
            internal_visit(p_visitor, task.initCallback(), false, false, null, null);
        } else if (p_request.equals(VisitRequest.ALL)) {
            internal_visit(p_visitor, task.initCallback(), true, false, new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR), new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR));
        } else if (p_request.equals(VisitRequest.CONTAINED)) {
            internal_visit(p_visitor, task.initCallback(), true, true, null, null);
        }
        return task;
    }

    private void internal_visit(final ModelVisitor visitor, final Callback<Throwable> end, final boolean deep, final boolean containedOnly, final LongLongHashMap visited, final LongLongHashMap traversed) {
        if (!Checker.isDefined(visitor)) {
            return;
        }
        if (traversed != null) {
            traversed.put(_uuid, _uuid);
        }
        final LongLongHashMap toResolveIds = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
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
                                if (traversed == null || !traversed.containsKey(idArr[k])) { // this is for optimization
                                    toResolveIds.put(idArr[k], idArr[k]);
                                }
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
        if (toResolveIds.size() == 0) {
            if (Checker.isDefined(end)) {
                end.on(null);
            }
        } else {
            final long[] trimmed = new long[toResolveIds.size()];
            final int[] inserted = {0};
            toResolveIds.each(new LongLongHashMapCallBack() {
                @Override
                public void on(long key, long value) {
                    trimmed[inserted[0]] = key;
                    inserted[0]++;
                }
            });
            ((AbstractKView) view()).internalLookupAll(trimmed, new Callback<KObject[]>() {
                @Override
                public void on(KObject[] resolvedArr) {
                    final List<KObject> nextDeep = new ArrayList<KObject>();

                    for (int i = 0; i < resolvedArr.length; i++) {
                        final KObject resolved = resolvedArr[i];
                        VisitResult result = VisitResult.CONTINUE;
                        if (resolved != null) {
                            if (visitor != null && (visited == null || !visited.containsKey(resolved.uuid()))) {
                                result = visitor.visit(resolved);
                            }
                            if (visited != null) {
                                visited.put(resolved.uuid(), resolved.uuid());
                            }
                        }
                        if (result != null && result.equals(VisitResult.STOP)) {
                            if (Checker.isDefined(end)) {
                                end.on(null);
                            }
                        } else {
                            if (deep) {
                                if (result.equals(VisitResult.CONTINUE)) {
                                    if (traversed == null || !traversed.containsKey(resolved.uuid())) {
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
            return JsonRaw.encode(raw, _uuid, _metaClass, false);
        } else {
            return null;
        }
    }

    @Override
    public String toString() {
        return toJSON();
    }

    @Override
    public KDefer<KObject[]> inbounds() {
        KCacheEntry rawPayload = view().universe().model().manager().entry(this, AccessMode.READ);
        if (rawPayload != null) {
            long[] payload = rawPayload.getRef(Index.INBOUNDS_INDEX);
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

    public void set_parent(long p_parentKID, MetaReference p_metaReference) {
        KCacheEntry raw = _view.universe().model().manager().entry(this, AccessMode.WRITE);
        if (raw != null) {
            if (p_parentKID != KConfig.NULL_LONG) {
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
    public <U extends KObject> KDefer<U> jump(long time) {
        final AbstractKDeferWrapper<U> task = new AbstractKDeferWrapper<U>();
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

    @Override
    public KTraversal traversal() {
        return new DefaultKTraversal(this);
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
