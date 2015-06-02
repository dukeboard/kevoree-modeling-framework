package org.kevoree.modeling.abs;

import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KActionType;
import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.KEventListener;
import org.kevoree.modeling.KModelAttributeVisitor;
import org.kevoree.modeling.KModelVisitor;
import org.kevoree.modeling.KObject;
import org.kevoree.modeling.KTimeWalker;
import org.kevoree.modeling.KVisitResult;
import org.kevoree.modeling.memory.struct.segment.HeapCacheSegment;
import org.kevoree.modeling.memory.AccessMode;
import org.kevoree.modeling.memory.manager.JsonRaw;
import org.kevoree.modeling.memory.KDataManager;
import org.kevoree.modeling.memory.struct.map.LongLongHashMap;
import org.kevoree.modeling.memory.struct.map.LongLongHashMapCallBack;
import org.kevoree.modeling.meta.MetaAttribute;
import org.kevoree.modeling.meta.MetaClass;
import org.kevoree.modeling.meta.MetaOperation;
import org.kevoree.modeling.meta.MetaReference;
import org.kevoree.modeling.memory.struct.tree.KLongTree;
import org.kevoree.modeling.traversal.DefaultKTraversal;
import org.kevoree.modeling.traversal.KTraversal;
import org.kevoree.modeling.traversal.selector.KSelector;
import org.kevoree.modeling.util.Checker;

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
        HeapCacheSegment rawPayload = _manager.segment(this, AccessMode.DELETE);
        if (rawPayload == null) {
            cb.on(new Exception(OUT_OF_CACHE_MSG));
        } else {
            LongLongHashMap collector = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            for (int i = 0; i < _metaClass.metaReferences().length; i++) {
                long[] inboundsKeys = rawPayload.getRef(_metaClass.metaReferences()[i].index(), _metaClass);
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
                HeapCacheSegment raw = _manager.segment(this, AccessMode.WRITE);
                if (raw != null) {
                    if (raw.addRef(metaReference.index(), param.uuid(), _metaClass)) {
                        if (setOpposite) {
                            ((AbstractKObject) param).internal_mutate(KActionType.ADD, metaReference.opposite(), this, false);
                        }
                    }
                }
            }
        } else if (actionType.equals(KActionType.SET)) {
            if (!metaReference.single()) {
                internal_mutate(KActionType.ADD, metaReference, param, setOpposite);
            } else {
                if (param == null) {
                    internal_mutate(KActionType.REMOVE, metaReference, null, setOpposite);
                } else {
                    HeapCacheSegment payload = _manager.segment(this, AccessMode.WRITE);
                    long[] previous = payload.getRef(metaReference.index(), _metaClass);
                    //override
                    long[] singleValue = new long[1];
                    singleValue[0] = param.uuid();
                    payload.set(metaReference.index(), singleValue, _metaClass);
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
                HeapCacheSegment raw = _manager.segment(this, AccessMode.WRITE);
                long[] previousKid = raw.getRef(metaReference.index(), _metaClass);
                raw.set(metaReference.index(), null, _metaClass);
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
                HeapCacheSegment payload = _manager.segment(this, AccessMode.WRITE);
                if (payload != null) {
                    if (payload.removeRef(metaReference.index(), param.uuid(), _metaClass)) {
                        if (setOpposite) {
                            ((AbstractKObject) param).internal_mutate(KActionType.REMOVE, metaReference.opposite(), this, false);
                        }
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
            HeapCacheSegment raw = _manager.segment(this, AccessMode.READ);
            if (raw != null) {
                Object ref = raw.get(transposed.index(), _metaClass);
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
            HeapCacheSegment raw = _manager.segment(this, AccessMode.READ);
            if (raw == null) {
                cb.on(new KObject[0]);
            } else {
                long[] o = raw.getRef(transposed.index(), _metaClass);
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
            HeapCacheSegment raw = _manager.segment(this, AccessMode.READ);
            if (raw != null) {
                Object obj = raw.get(reference.index(), _metaClass);
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
        HeapCacheSegment raw = _manager.segment(this, AccessMode.READ);
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
        HeapCacheSegment resolve_entry = (HeapCacheSegment) _manager.cache().get(_universe, p_time, _uuid);
        if (resolve_entry != null) {
            KLongTree timeTree = (KLongTree) _manager.cache().get(_universe, KConfig.NULL_LONG, _uuid);
            timeTree.inc();
            LongLongHashMap universeTree = (LongLongHashMap) _manager.cache().get(KConfig.NULL_LONG, KConfig.NULL_LONG, _uuid);
            universeTree.inc();
            resolve_entry.inc();
            p_callback.on(((AbstractKModel) _manager.model()).createProxy(_universe, p_time, _uuid, _metaClass));
        } else {
            KLongTree timeTree = (KLongTree) _manager.cache().get(_universe, KConfig.NULL_LONG, _uuid);
            if (timeTree != null) {
                final long resolvedTime = timeTree.previousOrEqual(p_time);
                if (resolvedTime != KConfig.NULL_LONG) {
                    HeapCacheSegment entry = (HeapCacheSegment) _manager.cache().get(_universe, resolvedTime, _uuid);
                    if (entry != null) {
                        LongLongHashMap universeTree = (LongLongHashMap) _manager.cache().get(KConfig.NULL_LONG, KConfig.NULL_LONG, _uuid);
                        universeTree.inc();
                        timeTree.inc();
                        entry.inc();
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
            HeapCacheSegment raw = _manager.segment(this, AccessMode.READ);
            if (raw != null) {
                MetaReference[] allReferences = metaClass().metaReferences();
                List<MetaReference> selected = new ArrayList<MetaReference>();
                for (int i = 0; i < allReferences.length; i++) {
                    long[] rawI = raw.getRef(allReferences[i].index(), _metaClass);
                    if (rawI != null) {
                        long oUUID = o.uuid();
                        for (int h = 0; h < rawI.length; h++) {
                            if (rawI[h] == oUUID) {
                                selected.add(allReferences[i]);
                                break;
                            }
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