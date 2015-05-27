package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.data.manager.JsonRaw;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.map.LongLongHashMapCallBack;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.rbtree.KLongTree;
import org.kevoree.modeling.api.util.ArrayUtils;
import org.kevoree.modeling.api.traversal.DefaultKTraversal;
import org.kevoree.modeling.api.traversal.KTraversal;
import org.kevoree.modeling.api.traversal.selector.KSelector;
import org.kevoree.modeling.api.util.Checker;

import java.util.ArrayList;
import java.util.List;

public abstract class AbstractKObject implements KObject {

    final protected long _uuid;
    final protected long _time;
    final protected long _universe;
    final private MetaClass _metaClass;
    final public KDataManager _manager;
    final private static String OUT_OF_CACHE_MSG = "Out of cache Error";

    public AbstractKObject(long p_universe, long p_time, long p_uuid, MetaClass p_metaClass, KDataManager p_manager) {
        this._universe = p_universe;
        this._time = p_time;
        this._uuid = p_uuid;
        this._metaClass = p_metaClass;
        this._manager = p_manager;
        this._manager.cache().monitor(this);
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
        return _time;
    }

    @Override
    public long universe() {
        return _universe;
    }

    @Override
    public KTimeWalker timeWalker() {
        return new AbstractTimeWalker(this);
    }

    @Override
    public void delete(Callback cb) {
        final KObject selfPointer = this;
        KCacheEntry rawPayload = _manager.entry(this, AccessMode.DELETE);
        if (rawPayload == null) {
            cb.on(new Exception(OUT_OF_CACHE_MSG));
        } else {
            LongLongHashMap collector = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            for (int i = 0; i < _metaClass.metaReferences().length; i++) {
                long[] inboundsKeys = rawPayload.getRef(_metaClass.metaReferences()[i].index());
                for (int j = 0; j < inboundsKeys.length; j++) {
                    collector.put(inboundsKeys[j], inboundsKeys[j]);
                }
            }
            long[] flatCollected = new long[collector.size()];
            int[] indexI = new int[1];
            indexI[0] = 0;
            collector.each(new LongLongHashMapCallBack() {
                @Override
                public void on(long key, long value) {
                    flatCollected[indexI[0]] = key;
                    indexI[0]++;
                }
            });
            _manager.lookupAllobjects(_universe, _time, flatCollected, new Callback<KObject[]>() {
                @Override
                public void on(KObject[] resolved) {
                    for (int i = 0; i < resolved.length; i++) {
                        if (resolved[i] != null) {
                            //TODO optimize
                            MetaReference[] linkedReferences = resolved[i].referencesWith(selfPointer);
                            for (int j = 0; j < linkedReferences.length; j++) {
                                ((AbstractKObject) resolved[i]).internal_mutate(KActionType.REMOVE, linkedReferences[j], selfPointer, false);
                            }
                        }
                    }
                    if (cb != null) {
                        cb.on(null);
                    }
                }
            });
        }
    }

    @Override
    public void select(String query, Callback<KObject[]> cb) {
        if (!Checker.isDefined(query)) {
            cb.on(new KObject[0]);
        } else {
            String cleanedQuery = query;
            if (cleanedQuery.startsWith("/")) {
                cleanedQuery = cleanedQuery.substring(1);
            }
            if (query.startsWith("/")) {
                final String finalCleanedQuery = cleanedQuery;
                _manager.getRoot(_universe, _time, new Callback<KObject>() {
                    @Override
                    public void on(KObject rootObj) {
                        if (rootObj == null) {
                            cb.on(new KObject[0]);
                        } else {
                            KSelector.select(rootObj, finalCleanedQuery, cb);
                        }
                    }
                });
            } else {
                KSelector.select(this, query, cb);
            }
        }
    }

    @Override
    public void listen(long groupId, KEventListener listener) {
        _manager.cdn().registerListener(groupId, this, listener);
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
    public Object getByName(String atributeName) {
        MetaAttribute transposed = _metaClass.attribute(atributeName);
        if (transposed != null) {
            return transposed.strategy().extrapolate(this, transposed);
        } else {
            return null;
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

    @Override
    public void setByName(String atributeName, Object payload) {
        MetaAttribute transposed = _metaClass.attribute(atributeName);
        if (transposed != null) {
            transposed.strategy().mutate(this, transposed, payload);
        }
    }

    @Override
    public void mutate(KActionType actionType, final MetaReference metaReference, KObject param) {
        internal_mutate(actionType, metaReference, param, true);
    }

    public void internal_mutate(KActionType actionType, final MetaReference metaReferenceP, KObject param, final boolean setOpposite) {
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
                internal_mutate(KActionType.SET, metaReference, param, setOpposite);
            } else {
                KCacheEntry raw = _manager.entry(this, AccessMode.WRITE);
                long[] previousList = raw.getRef(metaReference.index());
                if (previousList == null) {
                    previousList = new long[1];
                    previousList[0] = param.uuid();
                } else {
                    //TODO move to KCacheEntry API to hide it
                    previousList = ArrayUtils.add(previousList, param.uuid());
                }
                //In all the case we reset the value (set dirty is true now)
                raw.set(metaReference.index(), previousList);
                //Opposite
                if (setOpposite) {
                    ((AbstractKObject) param).internal_mutate(KActionType.ADD, metaReference.opposite(), this, false);
                }
            }
        } else if (actionType.equals(KActionType.SET)) {
            if (!metaReference.single()) {
                internal_mutate(KActionType.ADD, metaReference, param, setOpposite);
            } else {
                if (param == null) {
                    internal_mutate(KActionType.REMOVE, metaReference, null, setOpposite);
                } else {
                    KCacheEntry payload = _manager.entry(this, AccessMode.WRITE);
                    long[] previous = payload.getRef(metaReference.index());
                    //override
                    long[] singleValue = new long[1];
                    singleValue[0] = param.uuid();
                    payload.set(metaReference.index(), singleValue);
                    if (setOpposite) {
                        if (previous != null) {
                            KObject self = this;
                            _manager.lookupAllobjects(_universe, _time, previous, new Callback<KObject[]>() {
                                @Override
                                public void on(KObject[] kObjects) {
                                    for (int i = 0; i < kObjects.length; i++) {
                                        ((AbstractKObject) kObjects[i]).internal_mutate(KActionType.REMOVE, metaReference.opposite(), self, false);
                                    }
                                    ((AbstractKObject) param).internal_mutate(KActionType.ADD, metaReference.opposite(), self, false);
                                }
                            });
                        } else {
                            ((AbstractKObject) param).internal_mutate(KActionType.ADD, metaReference.opposite(), this, false);
                        }
                    }
                }
            }
        } else if (actionType.equals(KActionType.REMOVE)) {
            if (metaReference.single()) {
                KCacheEntry raw = _manager.entry(this, AccessMode.WRITE);
                long[] previousKid = raw.getRef(metaReference.index());
                raw.set(metaReference.index(), null);
                if (setOpposite) {
                    if (previousKid != null) {
                        final KObject self = this;
                        _manager.lookupAllobjects(_universe, _time, previousKid, new Callback<KObject[]>() {
                            @Override
                            public void on(KObject[] resolvedParams) {
                                if (resolvedParams != null) {
                                    for (int dd = 0; dd < resolvedParams.length; dd++) {
                                        if (resolvedParams[dd] != null) {
                                            ((AbstractKObject) resolvedParams[dd]).internal_mutate(KActionType.REMOVE, metaReference.opposite(), self, false);
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            } else {
                KCacheEntry payload = _manager.entry(this, AccessMode.WRITE);
                long[] previous = payload.getRef(metaReference.index());
                if (previous != null) {
                    try {
                        previous = ArrayUtils.remove(previous, param.uuid());
                        payload.set(metaReference.index(), previous);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    if (setOpposite) {
                        ((AbstractKObject) param).internal_mutate(KActionType.REMOVE, metaReference.opposite(), this, false);
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
            KCacheEntry raw = _manager.entry(this, AccessMode.READ);
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

    @Override
    public void ref(MetaReference p_metaReference, Callback<KObject[]> cb) {
        MetaReference transposed = internal_transpose_ref(p_metaReference);
        if (transposed == null) {
            throw new RuntimeException("Bad KMF usage, the reference named " + p_metaReference.metaName() + " is not part of " + metaClass().metaName());
        } else {
            KCacheEntry raw = _manager.entry(this, AccessMode.READ);
            if (raw == null) {
                cb.on(new KObject[0]);
            } else {
                long[] o = raw.getRef(transposed.index());
                if (o == null) {
                    cb.on(new KObject[0]);
                } else {
                    _manager.lookupAllobjects(_universe, _time, o, cb);
                }
            }
        }
    }

    @Override
    public void visitAttributes(KModelAttributeVisitor visitor) {
        if (!Checker.isDefined(visitor)) {
            return;
        }
        MetaAttribute[] metaAttributes = metaClass().metaAttributes();
        for (int i = 0; i < metaAttributes.length; i++) {
            visitor.visit(metaAttributes[i], get(metaAttributes[i]));
        }
    }

    @Override
    public void visit(KModelVisitor p_visitor, Callback cb) {
        internal_visit(p_visitor, cb, new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR), new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR));
    }

    private void internal_visit(final KModelVisitor visitor, final Callback end, final LongLongHashMap visited, final LongLongHashMap traversed) {
        if (!Checker.isDefined(visitor)) {
            return;
        }
        if (traversed != null) {
            traversed.put(_uuid, _uuid);
        }
        final LongLongHashMap toResolveIds = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        for (int i = 0; i < metaClass().metaReferences().length; i++) {
            final MetaReference reference = metaClass().metaReferences()[i];
            KCacheEntry raw = _manager.entry(this, AccessMode.READ);
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
            _manager.lookupAllobjects(_universe, _time, trimmed, new Callback<KObject[]>() {
                @Override
                public void on(KObject[] resolvedArr) {
                    final List<KObject> nextDeep = new ArrayList<KObject>();

                    for (int i = 0; i < resolvedArr.length; i++) {
                        final KObject resolved = resolvedArr[i];
                        KVisitResult result = KVisitResult.CONTINUE;
                        if (resolved != null) {
                            if (visitor != null && (visited == null || !visited.containsKey(resolved.uuid()))) {
                                result = visitor.visit(resolved);
                            }
                            if (visited != null) {
                                visited.put(resolved.uuid(), resolved.uuid());
                            }
                        }
                        if (result != null && result.equals(KVisitResult.STOP)) {
                            if (Checker.isDefined(end)) {
                                end.on(null);
                            }
                        } else {
                            if (result.equals(KVisitResult.CONTINUE)) {
                                if (traversed == null || !traversed.containsKey(resolved.uuid())) {
                                    nextDeep.add(resolved);
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
                                    abstractKObject.internal_visit(visitor, next.get(0), visited, traversed);
                                }
                            }
                        });
                        final AbstractKObject abstractKObject = (AbstractKObject) nextDeep.get(index[0]);
                        abstractKObject.internal_visit(visitor, next.get(0), visited, traversed);
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
        KCacheEntry raw = _manager.entry(this, AccessMode.READ);
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
    public boolean equals(Object obj) {
        if (!(obj instanceof AbstractKObject)) {
            return false;
        } else {
            AbstractKObject casted = (AbstractKObject) obj;
            return casted._uuid == _uuid && casted._time == _time && casted._universe == _universe;
        }
    }

    @Override
    public int hashCode() {
        return (int) (_universe ^ _time ^ _uuid);
    }

    @Override
    public void jump(long p_time, Callback<KObject> p_callback) {
        KCacheEntry resolve_entry = (KCacheEntry) _manager.cache().get(_universe, p_time, _uuid);
        if (resolve_entry != null) {
            p_callback.on(((AbstractKModel) _manager.model()).createProxy(_universe, p_time, _uuid, _metaClass));
        } else {
            KLongTree timeTree = (KLongTree) _manager.cache().get(_universe, KConfig.NULL_LONG, _uuid);
            if (timeTree != null) {
                final long resolvedTime = timeTree.previousOrEqual(p_time);
                if (resolvedTime != KConfig.NULL_LONG) {
                    KCacheEntry entry = (KCacheEntry) _manager.cache().get(_universe, resolvedTime, _uuid);
                    if (entry != null) {
                        p_callback.on(((AbstractKModel) _manager.model()).createProxy(_universe, p_time, _uuid, _metaClass));
                    } else {
                        //TODO optimize
                        _manager.lookup(_universe, p_time, _uuid, p_callback);
                    }
                }
            } else {
                _manager.lookup(_universe, p_time, _uuid, p_callback);
            }
        }
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
            KCacheEntry raw = _manager.entry(this, AccessMode.READ);
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
    public void call(MetaOperation p_operation, Object[] p_params, Callback<Object> cb) {
        _manager.operationManager().call(this, p_operation, p_params, cb);
    }

    @Override
    public KDataManager manager() {
        return _manager;
    }

}
