var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var org;
(function (org) {
    var kevoree;
    (function (kevoree) {
        var modeling;
        (function (modeling) {
            var KActionType = (function () {
                function KActionType(code) {
                    this._code = "";
                    this._code = code;
                }
                KActionType.prototype.toString = function () {
                    return this._code;
                };
                KActionType.prototype.code = function () {
                    return this._code;
                };
                KActionType.parse = function (s) {
                    for (var i = 0; i < org.kevoree.modeling.KActionType.values().length; i++) {
                        var current = org.kevoree.modeling.KActionType.values()[i];
                        if (current.code().equals(s)) {
                            return current;
                        }
                    }
                    return null;
                };
                KActionType.prototype.equals = function (other) {
                    return this == other;
                };
                KActionType.values = function () {
                    return KActionType._KActionTypeVALUES;
                };
                KActionType.CALL = new KActionType("CALL");
                KActionType.CALL_RESPONSE = new KActionType("CALL_RESPONSE");
                KActionType.SET = new KActionType("SET");
                KActionType.ADD = new KActionType("ADD");
                KActionType.REMOVE = new KActionType("DEL");
                KActionType.NEW = new KActionType("NEW");
                KActionType._KActionTypeVALUES = [
                    KActionType.CALL,
                    KActionType.CALL_RESPONSE,
                    KActionType.SET,
                    KActionType.ADD,
                    KActionType.REMOVE,
                    KActionType.NEW
                ];
                return KActionType;
            })();
            modeling.KActionType = KActionType;
            var KConfig = (function () {
                function KConfig() {
                }
                KConfig.TREE_CACHE_SIZE = 3;
                KConfig.CALLBACK_HISTORY = 1000;
                KConfig.LONG_SIZE = 53;
                KConfig.PREFIX_SIZE = 16;
                KConfig.BEGINNING_OF_TIME = -0x001FFFFFFFFFFFFE;
                KConfig.END_OF_TIME = 0x001FFFFFFFFFFFFE;
                KConfig.NULL_LONG = 0x001FFFFFFFFFFFFF;
                KConfig.KEY_PREFIX_MASK = 0x0000001FFFFFFFFF;
                KConfig.KEY_SEP = '/';
                KConfig.KEY_SIZE = 3;
                KConfig.CACHE_INIT_SIZE = 16;
                KConfig.CACHE_LOAD_FACTOR = (75 / 100);
                return KConfig;
            })();
            modeling.KConfig = KConfig;
            var KInferState = (function () {
                function KInferState() {
                }
                KInferState.prototype.save = function () {
                    throw "Abstract method";
                };
                KInferState.prototype.load = function (payload) {
                    throw "Abstract method";
                };
                KInferState.prototype.isDirty = function () {
                    throw "Abstract method";
                };
                KInferState.prototype.cloneState = function () {
                    throw "Abstract method";
                };
                return KInferState;
            })();
            modeling.KInferState = KInferState;
            var KVisitResult = (function () {
                function KVisitResult() {
                }
                KVisitResult.prototype.equals = function (other) {
                    return this == other;
                };
                KVisitResult.values = function () {
                    return KVisitResult._KVisitResultVALUES;
                };
                KVisitResult.CONTINUE = new KVisitResult();
                KVisitResult.SKIP = new KVisitResult();
                KVisitResult.STOP = new KVisitResult();
                KVisitResult._KVisitResultVALUES = [
                    KVisitResult.CONTINUE,
                    KVisitResult.SKIP,
                    KVisitResult.STOP
                ];
                return KVisitResult;
            })();
            modeling.KVisitResult = KVisitResult;
            var abs;
            (function (abs) {
                var AbstractKDataType = (function () {
                    function AbstractKDataType(p_name, p_isEnum) {
                        this._name = p_name;
                        this._isEnum = p_isEnum;
                    }
                    AbstractKDataType.prototype.name = function () {
                        return this._name;
                    };
                    AbstractKDataType.prototype.isEnum = function () {
                        return this._isEnum;
                    };
                    AbstractKDataType.prototype.save = function (src) {
                        if (src != null && this != org.kevoree.modeling.meta.PrimitiveTypes.TRANSIENT) {
                            if (this == org.kevoree.modeling.meta.PrimitiveTypes.STRING) {
                                return org.kevoree.modeling.format.json.JsonString.encode(src.toString());
                            }
                            else {
                                return src.toString();
                            }
                        }
                        return null;
                    };
                    AbstractKDataType.prototype.load = function (payload) {
                        if (this == org.kevoree.modeling.meta.PrimitiveTypes.TRANSIENT) {
                            return null;
                        }
                        if (this == org.kevoree.modeling.meta.PrimitiveTypes.STRING) {
                            return org.kevoree.modeling.format.json.JsonString.unescape(payload);
                        }
                        if (this == org.kevoree.modeling.meta.PrimitiveTypes.LONG) {
                            return java.lang.Long.parseLong(payload);
                        }
                        if (this == org.kevoree.modeling.meta.PrimitiveTypes.INT) {
                            return java.lang.Integer.parseInt(payload);
                        }
                        if (this == org.kevoree.modeling.meta.PrimitiveTypes.BOOL) {
                            return java.lang.Boolean.parseBoolean(payload);
                        }
                        if (this == org.kevoree.modeling.meta.PrimitiveTypes.SHORT) {
                            return java.lang.Short.parseShort(payload);
                        }
                        if (this == org.kevoree.modeling.meta.PrimitiveTypes.DOUBLE) {
                            return java.lang.Double.parseDouble(payload);
                        }
                        if (this == org.kevoree.modeling.meta.PrimitiveTypes.FLOAT) {
                            return java.lang.Float.parseFloat(payload);
                        }
                        return null;
                    };
                    return AbstractKDataType;
                })();
                abs.AbstractKDataType = AbstractKDataType;
                var AbstractKDefer = (function () {
                    function AbstractKDefer() {
                        this._isDone = false;
                        this._isReady = false;
                        this._nbRecResult = 0;
                        this._nbExpectedResult = 0;
                        this._nextTasks = null;
                        this._results = null;
                        this._thenCB = null;
                        this._results = new org.kevoree.modeling.memory.struct.map.StringHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                    }
                    AbstractKDefer.prototype.setDoneOrRegister = function (next) {
                        if (next != null) {
                            if (this._nextTasks == null) {
                                this._nextTasks = new java.util.ArrayList();
                            }
                            this._nextTasks.add(next);
                            return this._isDone;
                        }
                        else {
                            this._isDone = true;
                            if (this._nextTasks != null) {
                                for (var i = 0; i < this._nextTasks.size(); i++) {
                                    this._nextTasks.get(i).informParentEnd(this);
                                }
                            }
                            return this._isDone;
                        }
                    };
                    AbstractKDefer.prototype.equals = function (obj) {
                        return obj == this;
                    };
                    AbstractKDefer.prototype.informParentEnd = function (end) {
                        if (end == null) {
                            this._nbRecResult = this._nbRecResult + this._nbExpectedResult;
                        }
                        else {
                            if (end != this) {
                                this._nbRecResult--;
                            }
                        }
                        if (this._nbRecResult == 0 && this._isReady) {
                            this.setDoneOrRegister(null);
                            if (this._thenCB != null) {
                                this._thenCB(null);
                            }
                        }
                    };
                    AbstractKDefer.prototype.waitDefer = function (p_previous) {
                        if (p_previous != this) {
                            if (!p_previous.setDoneOrRegister(this)) {
                                this._nbExpectedResult++;
                            }
                        }
                        return this;
                    };
                    AbstractKDefer.prototype.next = function () {
                        var nextTask = new org.kevoree.modeling.abs.AbstractKDefer();
                        nextTask.waitDefer(this);
                        return nextTask;
                    };
                    AbstractKDefer.prototype.wait = function (resultName) {
                        var _this = this;
                        return function (o) {
                            _this._results.put(resultName, o);
                        };
                    };
                    AbstractKDefer.prototype.isDone = function () {
                        return this._isDone;
                    };
                    AbstractKDefer.prototype.getResult = function (resultName) {
                        if (this._isDone) {
                            return this._results.get(resultName);
                        }
                        else {
                            throw new java.lang.Exception("Task is not executed yet !");
                        }
                    };
                    AbstractKDefer.prototype.then = function (cb) {
                        this._thenCB = cb;
                        this._isReady = true;
                        this.informParentEnd(null);
                    };
                    return AbstractKDefer;
                })();
                abs.AbstractKDefer = AbstractKDefer;
                var AbstractKModel = (function () {
                    function AbstractKModel() {
                        this._manager = new org.kevoree.modeling.memory.manager.DefaultKDataManager(this);
                        this._key = this._manager.nextModelKey();
                    }
                    AbstractKModel.prototype.metaModel = function () {
                        throw "Abstract method";
                    };
                    AbstractKModel.prototype.connect = function (cb) {
                        this._manager.connect(cb);
                    };
                    AbstractKModel.prototype.close = function (cb) {
                        this._manager.close(cb);
                    };
                    AbstractKModel.prototype.manager = function () {
                        return this._manager;
                    };
                    AbstractKModel.prototype.newUniverse = function () {
                        var nextKey = this._manager.nextUniverseKey();
                        var newDimension = this.internalCreateUniverse(nextKey);
                        this.manager().initUniverse(newDimension, null);
                        return newDimension;
                    };
                    AbstractKModel.prototype.internalCreateUniverse = function (universe) {
                        throw "Abstract method";
                    };
                    AbstractKModel.prototype.internalCreateObject = function (universe, time, uuid, clazz) {
                        throw "Abstract method";
                    };
                    AbstractKModel.prototype.createProxy = function (universe, time, uuid, clazz) {
                        return this.internalCreateObject(universe, time, uuid, clazz);
                    };
                    AbstractKModel.prototype.universe = function (key) {
                        var newDimension = this.internalCreateUniverse(key);
                        this.manager().initUniverse(newDimension, null);
                        return newDimension;
                    };
                    AbstractKModel.prototype.save = function (cb) {
                        this._manager.save(cb);
                    };
                    AbstractKModel.prototype.discard = function (cb) {
                        this._manager.discard(null, cb);
                    };
                    AbstractKModel.prototype.setContentDeliveryDriver = function (p_driver) {
                        this.manager().setContentDeliveryDriver(p_driver);
                        return this;
                    };
                    AbstractKModel.prototype.setScheduler = function (p_scheduler) {
                        this.manager().setScheduler(p_scheduler);
                        return this;
                    };
                    AbstractKModel.prototype.setOperation = function (metaOperation, operation) {
                        this.manager().operationManager().registerOperation(metaOperation, operation, null);
                    };
                    AbstractKModel.prototype.setInstanceOperation = function (metaOperation, target, operation) {
                        this.manager().operationManager().registerOperation(metaOperation, operation, target);
                    };
                    AbstractKModel.prototype.defer = function () {
                        return new org.kevoree.modeling.abs.AbstractKDefer();
                    };
                    AbstractKModel.prototype.key = function () {
                        return this._key;
                    };
                    AbstractKModel.prototype.clearListenerGroup = function (groupID) {
                        this.manager().cdn().unregisterGroup(groupID);
                    };
                    AbstractKModel.prototype.nextGroup = function () {
                        return this.manager().nextGroupKey();
                    };
                    AbstractKModel.prototype.create = function (clazz, universe, time) {
                        if (!org.kevoree.modeling.util.Checker.isDefined(clazz)) {
                            return null;
                        }
                        var newObj = this.internalCreateObject(universe, time, this._manager.nextObjectKey(), clazz);
                        if (newObj != null) {
                            this._manager.initKObject(newObj);
                        }
                        return newObj;
                    };
                    AbstractKModel.prototype.createByName = function (metaClassName, universe, time) {
                        return this.create(this._manager.model().metaModel().metaClass(metaClassName), universe, time);
                    };
                    return AbstractKModel;
                })();
                abs.AbstractKModel = AbstractKModel;
                var AbstractKObject = (function () {
                    function AbstractKObject(p_universe, p_time, p_uuid, p_metaClass, p_manager) {
                        this._universe = p_universe;
                        this._time = p_time;
                        this._uuid = p_uuid;
                        this._metaClass = p_metaClass;
                        this._manager = p_manager;
                        this._manager.cache().monitor(this);
                    }
                    AbstractKObject.prototype.uuid = function () {
                        return this._uuid;
                    };
                    AbstractKObject.prototype.metaClass = function () {
                        return this._metaClass;
                    };
                    AbstractKObject.prototype.now = function () {
                        return this._time;
                    };
                    AbstractKObject.prototype.universe = function () {
                        return this._universe;
                    };
                    AbstractKObject.prototype.timeWalker = function () {
                        return new org.kevoree.modeling.abs.AbstractTimeWalker(this);
                    };
                    AbstractKObject.prototype.delete = function (cb) {
                        var selfPointer = this;
                        var rawPayload = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.DELETE);
                        if (rawPayload == null) {
                            cb(new java.lang.Exception(AbstractKObject.OUT_OF_CACHE_MSG));
                        }
                        else {
                            var collector = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            for (var i = 0; i < this._metaClass.metaReferences().length; i++) {
                                var inboundsKeys = rawPayload.getRef(this._metaClass.metaReferences()[i].index(), this._metaClass);
                                for (var j = 0; j < inboundsKeys.length; j++) {
                                    collector.put(inboundsKeys[j], inboundsKeys[j]);
                                }
                            }
                            var flatCollected = new Array();
                            var indexI = new Array();
                            indexI[0] = 0;
                            collector.each(function (key, value) {
                                flatCollected[indexI[0]] = key;
                                indexI[0]++;
                            });
                            this._manager.lookupAllobjects(this._universe, this._time, flatCollected, function (resolved) {
                                for (var i = 0; i < resolved.length; i++) {
                                    if (resolved[i] != null) {
                                        var linkedReferences = resolved[i].referencesWith(selfPointer);
                                        for (var j = 0; j < linkedReferences.length; j++) {
                                            resolved[i].internal_mutate(org.kevoree.modeling.KActionType.REMOVE, linkedReferences[j], selfPointer, false);
                                        }
                                    }
                                }
                                if (cb != null) {
                                    cb(null);
                                }
                            });
                        }
                    };
                    AbstractKObject.prototype.select = function (query, cb) {
                        if (!org.kevoree.modeling.util.Checker.isDefined(query)) {
                            cb(new Array());
                        }
                        else {
                            var cleanedQuery = query;
                            if (cleanedQuery.startsWith("/")) {
                                cleanedQuery = cleanedQuery.substring(1);
                            }
                            if (query.startsWith("/")) {
                                var finalCleanedQuery = cleanedQuery;
                                this._manager.getRoot(this._universe, this._time, function (rootObj) {
                                    if (rootObj == null) {
                                        cb(new Array());
                                    }
                                    else {
                                        org.kevoree.modeling.traversal.selector.KSelector.select(rootObj, finalCleanedQuery, cb);
                                    }
                                });
                            }
                            else {
                                org.kevoree.modeling.traversal.selector.KSelector.select(this, query, cb);
                            }
                        }
                    };
                    AbstractKObject.prototype.listen = function (groupId, listener) {
                        this._manager.cdn().registerListener(groupId, this, listener);
                    };
                    AbstractKObject.prototype.domainKey = function () {
                        var builder = new java.lang.StringBuilder();
                        var atts = this.metaClass().metaAttributes();
                        for (var i = 0; i < atts.length; i++) {
                            var att = atts[i];
                            if (att.key()) {
                                if (builder.length != 0) {
                                    builder.append(",");
                                }
                                builder.append(att.metaName());
                                builder.append("=");
                                var payload = this.get(att);
                                if (payload != null) {
                                    builder.append(payload.toString());
                                }
                            }
                        }
                        var result = builder.toString();
                        if (result.equals("")) {
                            return this.uuid() + "";
                        }
                        else {
                            return result;
                        }
                    };
                    AbstractKObject.prototype.get = function (p_attribute) {
                        var transposed = this.internal_transpose_att(p_attribute);
                        if (transposed == null) {
                            throw new java.lang.RuntimeException("Bad KMF usage, the attribute named " + p_attribute.metaName() + " is not part of " + this.metaClass().metaName());
                        }
                        else {
                            return transposed.strategy().extrapolate(this, transposed);
                        }
                    };
                    AbstractKObject.prototype.getByName = function (atributeName) {
                        var transposed = this._metaClass.attribute(atributeName);
                        if (transposed != null) {
                            return transposed.strategy().extrapolate(this, transposed);
                        }
                        else {
                            return null;
                        }
                    };
                    AbstractKObject.prototype.set = function (p_attribute, payload) {
                        var transposed = this.internal_transpose_att(p_attribute);
                        if (transposed == null) {
                            throw new java.lang.RuntimeException("Bad KMF usage, the attribute named " + p_attribute.metaName() + " is not part of " + this.metaClass().metaName());
                        }
                        else {
                            transposed.strategy().mutate(this, transposed, payload);
                        }
                    };
                    AbstractKObject.prototype.setByName = function (atributeName, payload) {
                        var transposed = this._metaClass.attribute(atributeName);
                        if (transposed != null) {
                            transposed.strategy().mutate(this, transposed, payload);
                        }
                    };
                    AbstractKObject.prototype.mutate = function (actionType, metaReference, param) {
                        this.internal_mutate(actionType, metaReference, param, true);
                    };
                    AbstractKObject.prototype.internal_mutate = function (actionType, metaReferenceP, param, setOpposite) {
                        var metaReference = this.internal_transpose_ref(metaReferenceP);
                        if (metaReference == null) {
                            if (metaReferenceP == null) {
                                throw new java.lang.RuntimeException("Bad KMF usage, the reference " + " is null in metaClass named " + this.metaClass().metaName());
                            }
                            else {
                                throw new java.lang.RuntimeException("Bad KMF usage, the reference named " + metaReferenceP.metaName() + " is not part of " + this.metaClass().metaName());
                            }
                        }
                        if (actionType.equals(org.kevoree.modeling.KActionType.ADD)) {
                            if (metaReference.single()) {
                                this.internal_mutate(org.kevoree.modeling.KActionType.SET, metaReference, param, setOpposite);
                            }
                            else {
                                var raw = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.WRITE);
                                if (raw != null) {
                                    if (raw.addRef(metaReference.index(), param.uuid(), this._metaClass)) {
                                        if (setOpposite) {
                                            param.internal_mutate(org.kevoree.modeling.KActionType.ADD, metaReference.opposite(), this, false);
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if (actionType.equals(org.kevoree.modeling.KActionType.SET)) {
                                if (!metaReference.single()) {
                                    this.internal_mutate(org.kevoree.modeling.KActionType.ADD, metaReference, param, setOpposite);
                                }
                                else {
                                    if (param == null) {
                                        this.internal_mutate(org.kevoree.modeling.KActionType.REMOVE, metaReference, null, setOpposite);
                                    }
                                    else {
                                        var payload = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.WRITE);
                                        var previous = payload.getRef(metaReference.index(), this._metaClass);
                                        var singleValue = new Array();
                                        singleValue[0] = param.uuid();
                                        payload.set(metaReference.index(), singleValue, this._metaClass);
                                        if (setOpposite) {
                                            if (previous != null) {
                                                var self = this;
                                                this._manager.lookupAllobjects(this._universe, this._time, previous, function (kObjects) {
                                                    for (var i = 0; i < kObjects.length; i++) {
                                                        kObjects[i].internal_mutate(org.kevoree.modeling.KActionType.REMOVE, metaReference.opposite(), self, false);
                                                    }
                                                    param.internal_mutate(org.kevoree.modeling.KActionType.ADD, metaReference.opposite(), self, false);
                                                });
                                            }
                                            else {
                                                param.internal_mutate(org.kevoree.modeling.KActionType.ADD, metaReference.opposite(), this, false);
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (actionType.equals(org.kevoree.modeling.KActionType.REMOVE)) {
                                    if (metaReference.single()) {
                                        var raw = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.WRITE);
                                        var previousKid = raw.getRef(metaReference.index(), this._metaClass);
                                        raw.set(metaReference.index(), null, this._metaClass);
                                        if (setOpposite) {
                                            if (previousKid != null) {
                                                var self = this;
                                                this._manager.lookupAllobjects(this._universe, this._time, previousKid, function (resolvedParams) {
                                                    if (resolvedParams != null) {
                                                        for (var dd = 0; dd < resolvedParams.length; dd++) {
                                                            if (resolvedParams[dd] != null) {
                                                                resolvedParams[dd].internal_mutate(org.kevoree.modeling.KActionType.REMOVE, metaReference.opposite(), self, false);
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                    else {
                                        var payload = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.WRITE);
                                        if (payload != null) {
                                            if (payload.removeRef(metaReference.index(), param.uuid(), this._metaClass)) {
                                                if (setOpposite) {
                                                    param.internal_mutate(org.kevoree.modeling.KActionType.REMOVE, metaReference.opposite(), this, false);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    };
                    AbstractKObject.prototype.size = function (p_metaReference) {
                        var transposed = this.internal_transpose_ref(p_metaReference);
                        if (transposed == null) {
                            throw new java.lang.RuntimeException("Bad KMF usage, the attribute named " + p_metaReference.metaName() + " is not part of " + this.metaClass().metaName());
                        }
                        else {
                            var raw = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.READ);
                            if (raw != null) {
                                var ref = raw.get(transposed.index(), this._metaClass);
                                if (ref == null) {
                                    return 0;
                                }
                                else {
                                    try {
                                        var castedRefArray = ref;
                                        return castedRefArray.length;
                                    }
                                    catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e = $ex$;
                                            e.printStackTrace();
                                            return 0;
                                        }
                                    }
                                }
                            }
                            else {
                                return 0;
                            }
                        }
                    };
                    AbstractKObject.prototype.ref = function (p_metaReference, cb) {
                        var transposed = this.internal_transpose_ref(p_metaReference);
                        if (transposed == null) {
                            throw new java.lang.RuntimeException("Bad KMF usage, the reference named " + p_metaReference.metaName() + " is not part of " + this.metaClass().metaName());
                        }
                        else {
                            var raw = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.READ);
                            if (raw == null) {
                                cb(new Array());
                            }
                            else {
                                var o = raw.getRef(transposed.index(), this._metaClass);
                                if (o == null) {
                                    cb(new Array());
                                }
                                else {
                                    this._manager.lookupAllobjects(this._universe, this._time, o, cb);
                                }
                            }
                        }
                    };
                    AbstractKObject.prototype.visitAttributes = function (visitor) {
                        if (!org.kevoree.modeling.util.Checker.isDefined(visitor)) {
                            return;
                        }
                        var metaAttributes = this.metaClass().metaAttributes();
                        for (var i = 0; i < metaAttributes.length; i++) {
                            visitor(metaAttributes[i], this.get(metaAttributes[i]));
                        }
                    };
                    AbstractKObject.prototype.visit = function (p_visitor, cb) {
                        this.internal_visit(p_visitor, cb, new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR), new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR));
                    };
                    AbstractKObject.prototype.internal_visit = function (visitor, end, visited, traversed) {
                        if (!org.kevoree.modeling.util.Checker.isDefined(visitor)) {
                            return;
                        }
                        if (traversed != null) {
                            traversed.put(this._uuid, this._uuid);
                        }
                        var toResolveIds = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        for (var i = 0; i < this.metaClass().metaReferences().length; i++) {
                            var reference = this.metaClass().metaReferences()[i];
                            var raw = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.READ);
                            if (raw != null) {
                                var obj = raw.get(reference.index(), this._metaClass);
                                if (obj != null) {
                                    try {
                                        var idArr = obj;
                                        for (var k = 0; k < idArr.length; k++) {
                                            if (traversed == null || !traversed.containsKey(idArr[k])) {
                                                toResolveIds.put(idArr[k], idArr[k]);
                                            }
                                        }
                                    }
                                    catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e = $ex$;
                                            e.printStackTrace();
                                        }
                                    }
                                }
                            }
                        }
                        if (toResolveIds.size() == 0) {
                            if (org.kevoree.modeling.util.Checker.isDefined(end)) {
                                end(null);
                            }
                        }
                        else {
                            var trimmed = new Array();
                            var inserted = [0];
                            toResolveIds.each(function (key, value) {
                                trimmed[inserted[0]] = key;
                                inserted[0]++;
                            });
                            this._manager.lookupAllobjects(this._universe, this._time, trimmed, function (resolvedArr) {
                                var nextDeep = new java.util.ArrayList();
                                for (var i = 0; i < resolvedArr.length; i++) {
                                    var resolved = resolvedArr[i];
                                    var result = org.kevoree.modeling.KVisitResult.CONTINUE;
                                    if (resolved != null) {
                                        if (visitor != null && (visited == null || !visited.containsKey(resolved.uuid()))) {
                                            result = visitor(resolved);
                                        }
                                        if (visited != null) {
                                            visited.put(resolved.uuid(), resolved.uuid());
                                        }
                                    }
                                    if (result != null && result.equals(org.kevoree.modeling.KVisitResult.STOP)) {
                                        if (org.kevoree.modeling.util.Checker.isDefined(end)) {
                                            end(null);
                                        }
                                    }
                                    else {
                                        if (result.equals(org.kevoree.modeling.KVisitResult.CONTINUE)) {
                                            if (traversed == null || !traversed.containsKey(resolved.uuid())) {
                                                nextDeep.add(resolved);
                                            }
                                        }
                                    }
                                }
                                if (!nextDeep.isEmpty()) {
                                    var index = new Array();
                                    index[0] = 0;
                                    var next = new java.util.ArrayList();
                                    next.add(function (throwable) {
                                        index[0] = index[0] + 1;
                                        if (index[0] == nextDeep.size()) {
                                            if (org.kevoree.modeling.util.Checker.isDefined(end)) {
                                                end(null);
                                            }
                                        }
                                        else {
                                            var abstractKObject = nextDeep.get(index[0]);
                                            abstractKObject.internal_visit(visitor, next.get(0), visited, traversed);
                                        }
                                    });
                                    var abstractKObject = nextDeep.get(index[0]);
                                    abstractKObject.internal_visit(visitor, next.get(0), visited, traversed);
                                }
                                else {
                                    if (org.kevoree.modeling.util.Checker.isDefined(end)) {
                                        end(null);
                                    }
                                }
                            });
                        }
                    };
                    AbstractKObject.prototype.toJSON = function () {
                        var raw = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.READ);
                        if (raw != null) {
                            return org.kevoree.modeling.memory.manager.JsonRaw.encode(raw, this._uuid, this._metaClass, false);
                        }
                        else {
                            return null;
                        }
                    };
                    AbstractKObject.prototype.toString = function () {
                        return this.toJSON();
                    };
                    AbstractKObject.prototype.equals = function (obj) {
                        if (!(obj instanceof org.kevoree.modeling.abs.AbstractKObject)) {
                            return false;
                        }
                        else {
                            var casted = obj;
                            return casted._uuid == this._uuid && casted._time == this._time && casted._universe == this._universe;
                        }
                    };
                    AbstractKObject.prototype.hashCode = function () {
                        return (this._universe ^ this._time ^ this._uuid);
                    };
                    AbstractKObject.prototype.jump = function (p_time, p_callback) {
                        var resolve_entry = this._manager.cache().get(this._universe, p_time, this._uuid);
                        if (resolve_entry != null) {
                            var timeTree = this._manager.cache().get(this._universe, org.kevoree.modeling.KConfig.NULL_LONG, this._uuid);
                            timeTree.inc();
                            var universeTree = this._manager.cache().get(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, this._uuid);
                            universeTree.inc();
                            resolve_entry.inc();
                            p_callback(this._manager.model().createProxy(this._universe, p_time, this._uuid, this._metaClass));
                        }
                        else {
                            var timeTree = this._manager.cache().get(this._universe, org.kevoree.modeling.KConfig.NULL_LONG, this._uuid);
                            if (timeTree != null) {
                                var resolvedTime = timeTree.previousOrEqual(p_time);
                                if (resolvedTime != org.kevoree.modeling.KConfig.NULL_LONG) {
                                    var entry = this._manager.cache().get(this._universe, resolvedTime, this._uuid);
                                    if (entry != null) {
                                        var universeTree = this._manager.cache().get(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, this._uuid);
                                        universeTree.inc();
                                        timeTree.inc();
                                        entry.inc();
                                        p_callback(this._manager.model().createProxy(this._universe, p_time, this._uuid, this._metaClass));
                                    }
                                    else {
                                        this._manager.lookup(this._universe, p_time, this._uuid, p_callback);
                                    }
                                }
                            }
                            else {
                                this._manager.lookup(this._universe, p_time, this._uuid, p_callback);
                            }
                        }
                    };
                    AbstractKObject.prototype.internal_transpose_ref = function (p) {
                        if (!org.kevoree.modeling.util.Checker.isDefined(p)) {
                            return null;
                        }
                        else {
                            return this.metaClass().metaByName(p.metaName());
                        }
                    };
                    AbstractKObject.prototype.internal_transpose_att = function (p) {
                        if (!org.kevoree.modeling.util.Checker.isDefined(p)) {
                            return null;
                        }
                        else {
                            return this.metaClass().metaByName(p.metaName());
                        }
                    };
                    AbstractKObject.prototype.internal_transpose_op = function (p) {
                        if (!org.kevoree.modeling.util.Checker.isDefined(p)) {
                            return null;
                        }
                        else {
                            return this.metaClass().metaByName(p.metaName());
                        }
                    };
                    AbstractKObject.prototype.traversal = function () {
                        return new org.kevoree.modeling.traversal.DefaultKTraversal(this);
                    };
                    AbstractKObject.prototype.referencesWith = function (o) {
                        if (org.kevoree.modeling.util.Checker.isDefined(o)) {
                            var raw = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.READ);
                            if (raw != null) {
                                var allReferences = this.metaClass().metaReferences();
                                var selected = new java.util.ArrayList();
                                for (var i = 0; i < allReferences.length; i++) {
                                    var rawI = raw.getRef(allReferences[i].index(), this._metaClass);
                                    if (rawI != null) {
                                        var oUUID = o.uuid();
                                        for (var h = 0; h < rawI.length; h++) {
                                            if (rawI[h] == oUUID) {
                                                selected.add(allReferences[i]);
                                                break;
                                            }
                                        }
                                    }
                                }
                                return selected.toArray(new Array());
                            }
                            else {
                                return new Array();
                            }
                        }
                        else {
                            return new Array();
                        }
                    };
                    AbstractKObject.prototype.call = function (p_operation, p_params, cb) {
                        this._manager.operationManager().call(this, p_operation, p_params, cb);
                    };
                    AbstractKObject.prototype.manager = function () {
                        return this._manager;
                    };
                    AbstractKObject.OUT_OF_CACHE_MSG = "Out of cache Error";
                    return AbstractKObject;
                })();
                abs.AbstractKObject = AbstractKObject;
                var AbstractKObjectInfer = (function (_super) {
                    __extends(AbstractKObjectInfer, _super);
                    function AbstractKObjectInfer(p_universe, p_time, p_uuid, p_metaClass, p_manager) {
                        _super.call(this, p_universe, p_time, p_uuid, p_metaClass, p_manager);
                    }
                    AbstractKObjectInfer.prototype.readOnlyState = function () {
                        var raw = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.READ);
                        if (raw != null) {
                            if (raw.get(org.kevoree.modeling.meta.MetaInferClass.getInstance().getCache().index(), this.metaClass()) == null) {
                                this.internal_load(raw);
                            }
                            return raw.get(org.kevoree.modeling.meta.MetaInferClass.getInstance().getCache().index(), this.metaClass());
                        }
                        else {
                            return null;
                        }
                    };
                    AbstractKObjectInfer.prototype.modifyState = function () {
                        var raw = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.WRITE);
                        if (raw != null) {
                            if (raw.get(org.kevoree.modeling.meta.MetaInferClass.getInstance().getCache().index(), this.metaClass()) == null) {
                                this.internal_load(raw);
                            }
                            return raw.get(org.kevoree.modeling.meta.MetaInferClass.getInstance().getCache().index(), this.metaClass());
                        }
                        else {
                            return null;
                        }
                    };
                    AbstractKObjectInfer.prototype.internal_load = function (raw) {
                        if (raw.get(org.kevoree.modeling.meta.MetaInferClass.getInstance().getCache().index(), this.metaClass()) == null) {
                            var currentState = this.createEmptyState();
                            currentState.load(raw.get(org.kevoree.modeling.meta.MetaInferClass.getInstance().getRaw().index(), this.metaClass()).toString());
                            raw.set(org.kevoree.modeling.meta.MetaInferClass.getInstance().getCache().index(), currentState, this.metaClass());
                        }
                    };
                    AbstractKObjectInfer.prototype.train = function (trainingSet, expectedResultSet, callback) {
                        throw "Abstract method";
                    };
                    AbstractKObjectInfer.prototype.infer = function (features) {
                        throw "Abstract method";
                    };
                    AbstractKObjectInfer.prototype.accuracy = function (testSet, expectedResultSet) {
                        throw "Abstract method";
                    };
                    AbstractKObjectInfer.prototype.clear = function () {
                        throw "Abstract method";
                    };
                    AbstractKObjectInfer.prototype.createEmptyState = function () {
                        throw "Abstract method";
                    };
                    return AbstractKObjectInfer;
                })(org.kevoree.modeling.abs.AbstractKObject);
                abs.AbstractKObjectInfer = AbstractKObjectInfer;
                var AbstractKUniverse = (function () {
                    function AbstractKUniverse(p_key, p_manager) {
                        this._universe = p_key;
                        this._manager = p_manager;
                    }
                    AbstractKUniverse.prototype.key = function () {
                        return this._universe;
                    };
                    AbstractKUniverse.prototype.model = function () {
                        return this._manager.model();
                    };
                    AbstractKUniverse.prototype.delete = function (cb) {
                        this.model().manager().delete(this, cb);
                    };
                    AbstractKUniverse.prototype.time = function (timePoint) {
                        if (timePoint <= org.kevoree.modeling.KConfig.END_OF_TIME && timePoint >= org.kevoree.modeling.KConfig.BEGINNING_OF_TIME) {
                            return this.internal_create(timePoint);
                        }
                        else {
                            throw new java.lang.RuntimeException("The selected Time " + timePoint + " is out of the range of KMF managed time");
                        }
                    };
                    AbstractKUniverse.prototype.internal_create = function (timePoint) {
                        throw "Abstract method";
                    };
                    AbstractKUniverse.prototype.equals = function (obj) {
                        if (!(obj instanceof org.kevoree.modeling.abs.AbstractKUniverse)) {
                            return false;
                        }
                        else {
                            var casted = obj;
                            return casted._universe == this._universe;
                        }
                    };
                    AbstractKUniverse.prototype.origin = function () {
                        return this._manager.model().universe(this._manager.parentUniverseKey(this._universe));
                    };
                    AbstractKUniverse.prototype.diverge = function () {
                        var casted = this._manager.model();
                        var nextKey = this._manager.nextUniverseKey();
                        var newUniverse = casted.internalCreateUniverse(nextKey);
                        this._manager.initUniverse(newUniverse, this);
                        return newUniverse;
                    };
                    AbstractKUniverse.prototype.descendants = function () {
                        var descendentsKey = this._manager.descendantsUniverseKeys(this._universe);
                        var childs = new java.util.ArrayList();
                        for (var i = 0; i < descendentsKey.length; i++) {
                            childs.add(this._manager.model().universe(descendentsKey[i]));
                        }
                        return childs;
                    };
                    AbstractKUniverse.prototype.lookupAllTimes = function (uuid, times, cb) {
                        throw new java.lang.RuntimeException("Not implemented Yet !");
                    };
                    AbstractKUniverse.prototype.listenAll = function (groupId, objects, multiListener) {
                        this.model().manager().cdn().registerMultiListener(groupId, this, objects, multiListener);
                    };
                    return AbstractKUniverse;
                })();
                abs.AbstractKUniverse = AbstractKUniverse;
                var AbstractKView = (function () {
                    function AbstractKView(p_universe, _time, p_manager) {
                        this._universe = p_universe;
                        this._time = _time;
                        this._manager = p_manager;
                    }
                    AbstractKView.prototype.now = function () {
                        return this._time;
                    };
                    AbstractKView.prototype.universe = function () {
                        return this._universe;
                    };
                    AbstractKView.prototype.setRoot = function (elem, cb) {
                        this._manager.setRoot(elem, cb);
                    };
                    AbstractKView.prototype.getRoot = function (cb) {
                        this._manager.getRoot(this._universe, this._time, cb);
                    };
                    AbstractKView.prototype.select = function (query, cb) {
                        if (org.kevoree.modeling.util.Checker.isDefined(cb)) {
                            if (query == null || query.length == 0) {
                                cb(new Array());
                            }
                            else {
                                this._manager.getRoot(this._universe, this._time, function (rootObj) {
                                    if (rootObj == null) {
                                        cb(new Array());
                                    }
                                    else {
                                        var cleanedQuery = query;
                                        if (query.length == 1 && query.charAt(0) == '/') {
                                            var param = new Array();
                                            param[0] = rootObj;
                                            cb(param);
                                        }
                                        else {
                                            if (cleanedQuery.charAt(0) == '/') {
                                                cleanedQuery = cleanedQuery.substring(1);
                                            }
                                            org.kevoree.modeling.traversal.selector.KSelector.select(rootObj, cleanedQuery, cb);
                                        }
                                    }
                                });
                            }
                        }
                    };
                    AbstractKView.prototype.lookup = function (kid, cb) {
                        this._manager.lookup(this._universe, this._time, kid, cb);
                    };
                    AbstractKView.prototype.lookupAll = function (keys, cb) {
                        this._manager.lookupAllobjects(this._universe, this._time, keys, cb);
                    };
                    AbstractKView.prototype.create = function (clazz) {
                        return this._manager.model().create(clazz, this._universe, this._time);
                    };
                    AbstractKView.prototype.createByName = function (metaClassName) {
                        return this.create(this._manager.model().metaModel().metaClass(metaClassName));
                    };
                    AbstractKView.prototype.json = function () {
                        return new org.kevoree.modeling.format.json.JsonFormat(this._universe, this._time, this._manager);
                    };
                    AbstractKView.prototype.xmi = function () {
                        return new org.kevoree.modeling.format.xmi.XmiFormat(this._universe, this._time, this._manager);
                    };
                    AbstractKView.prototype.equals = function (obj) {
                        if (!org.kevoree.modeling.util.Checker.isDefined(obj)) {
                            return false;
                        }
                        if (!(obj instanceof org.kevoree.modeling.abs.AbstractKView)) {
                            return false;
                        }
                        else {
                            var casted = obj;
                            return casted._time == this._time && casted._universe == this._universe;
                        }
                    };
                    return AbstractKView;
                })();
                abs.AbstractKView = AbstractKView;
                var AbstractMetaAttribute = (function () {
                    function AbstractMetaAttribute(p_name, p_index, p_precision, p_key, p_metaType, p_extrapolation) {
                        this._name = p_name;
                        this._index = p_index;
                        this._precision = p_precision;
                        this._key = p_key;
                        this._metaType = p_metaType;
                        this._extrapolation = p_extrapolation;
                    }
                    AbstractMetaAttribute.prototype.attributeType = function () {
                        return this._metaType;
                    };
                    AbstractMetaAttribute.prototype.index = function () {
                        return this._index;
                    };
                    AbstractMetaAttribute.prototype.metaName = function () {
                        return this._name;
                    };
                    AbstractMetaAttribute.prototype.metaType = function () {
                        return org.kevoree.modeling.meta.MetaType.ATTRIBUTE;
                    };
                    AbstractMetaAttribute.prototype.precision = function () {
                        return this._precision;
                    };
                    AbstractMetaAttribute.prototype.key = function () {
                        return this._key;
                    };
                    AbstractMetaAttribute.prototype.strategy = function () {
                        return this._extrapolation;
                    };
                    AbstractMetaAttribute.prototype.setExtrapolation = function (extrapolation) {
                        this._extrapolation = extrapolation;
                    };
                    return AbstractMetaAttribute;
                })();
                abs.AbstractMetaAttribute = AbstractMetaAttribute;
                var AbstractMetaClass = (function () {
                    function AbstractMetaClass(p_name, p_index) {
                        this._indexes = null;
                        this._name = p_name;
                        this._index = p_index;
                    }
                    AbstractMetaClass.prototype.metaByName = function (name) {
                        return this._indexes.get(name);
                    };
                    AbstractMetaClass.prototype.attribute = function (name) {
                        if (this._indexes == null) {
                            return null;
                        }
                        else {
                            var resolved = this._indexes.get(name);
                            if (resolved != null && resolved instanceof org.kevoree.modeling.abs.AbstractMetaAttribute) {
                                return resolved;
                            }
                            return null;
                        }
                    };
                    AbstractMetaClass.prototype.reference = function (name) {
                        if (this._indexes == null) {
                            return null;
                        }
                        else {
                            var resolved = this._indexes.get(name);
                            if (resolved != null && resolved instanceof org.kevoree.modeling.abs.AbstractMetaReference) {
                                return resolved;
                            }
                            return null;
                        }
                    };
                    AbstractMetaClass.prototype.operation = function (name) {
                        if (this._indexes == null) {
                            return null;
                        }
                        else {
                            var resolved = this._indexes.get(name);
                            if (resolved != null && resolved instanceof org.kevoree.modeling.abs.AbstractMetaOperation) {
                                return resolved;
                            }
                            return null;
                        }
                    };
                    AbstractMetaClass.prototype.metaElements = function () {
                        return this._meta;
                    };
                    AbstractMetaClass.prototype.index = function () {
                        return this._index;
                    };
                    AbstractMetaClass.prototype.metaName = function () {
                        return this._name;
                    };
                    AbstractMetaClass.prototype.metaType = function () {
                        return org.kevoree.modeling.meta.MetaType.CLASS;
                    };
                    AbstractMetaClass.prototype.init = function (p_meta) {
                        this._indexes = new org.kevoree.modeling.memory.struct.map.StringHashMap(p_meta.length, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._meta = p_meta;
                        var nbAtt = 0;
                        var nbRef = 0;
                        for (var i = 0; i < p_meta.length; i++) {
                            if (p_meta[i].metaType().equals(org.kevoree.modeling.meta.MetaType.ATTRIBUTE)) {
                                nbAtt++;
                            }
                            else {
                                if (p_meta[i].metaType().equals(org.kevoree.modeling.meta.MetaType.REFERENCE)) {
                                    nbRef++;
                                }
                            }
                            this._indexes.put(p_meta[i].metaName(), p_meta[i]);
                        }
                        this._atts = new Array();
                        this._refs = new Array();
                        nbAtt = 0;
                        nbRef = 0;
                        for (var i = 0; i < p_meta.length; i++) {
                            if (p_meta[i].metaType().equals(org.kevoree.modeling.meta.MetaType.ATTRIBUTE)) {
                                this._atts[nbAtt] = p_meta[i];
                                nbAtt++;
                            }
                            else {
                                if (p_meta[i].metaType().equals(org.kevoree.modeling.meta.MetaType.REFERENCE)) {
                                    this._refs[nbRef] = p_meta[i];
                                    nbRef++;
                                }
                            }
                            this._indexes.put(p_meta[i].metaName(), p_meta[i]);
                        }
                    };
                    AbstractMetaClass.prototype.meta = function (index) {
                        if (index >= 0 && index < this._meta.length) {
                            return this._meta[index];
                        }
                        else {
                            return null;
                        }
                    };
                    AbstractMetaClass.prototype.metaAttributes = function () {
                        return this._atts;
                    };
                    AbstractMetaClass.prototype.metaReferences = function () {
                        return this._refs;
                    };
                    return AbstractMetaClass;
                })();
                abs.AbstractMetaClass = AbstractMetaClass;
                var AbstractMetaModel = (function () {
                    function AbstractMetaModel(p_name, p_index) {
                        this._metaClasses_indexes = null;
                        this._name = p_name;
                        this._index = p_index;
                    }
                    AbstractMetaModel.prototype.index = function () {
                        return this._index;
                    };
                    AbstractMetaModel.prototype.metaName = function () {
                        return this._name;
                    };
                    AbstractMetaModel.prototype.metaType = function () {
                        return org.kevoree.modeling.meta.MetaType.MODEL;
                    };
                    AbstractMetaModel.prototype.metaClasses = function () {
                        return this._metaClasses;
                    };
                    AbstractMetaModel.prototype.metaClass = function (name) {
                        if (this._metaClasses_indexes == null) {
                            return null;
                        }
                        var resolved = this._metaClasses_indexes.get(name);
                        if (resolved == null) {
                            return null;
                        }
                        else {
                            return this._metaClasses[resolved];
                        }
                    };
                    AbstractMetaModel.prototype.init = function (p_metaClasses) {
                        this._metaClasses_indexes = new org.kevoree.modeling.memory.struct.map.StringHashMap(p_metaClasses.length, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._metaClasses = p_metaClasses;
                        for (var i = 0; i < this._metaClasses.length; i++) {
                            this._metaClasses_indexes.put(this._metaClasses[i].metaName(), i);
                        }
                    };
                    return AbstractMetaModel;
                })();
                abs.AbstractMetaModel = AbstractMetaModel;
                var AbstractMetaOperation = (function () {
                    function AbstractMetaOperation(p_name, p_index, p_lazyMetaClass) {
                        this._name = p_name;
                        this._index = p_index;
                        this._lazyMetaClass = p_lazyMetaClass;
                    }
                    AbstractMetaOperation.prototype.index = function () {
                        return this._index;
                    };
                    AbstractMetaOperation.prototype.metaName = function () {
                        return this._name;
                    };
                    AbstractMetaOperation.prototype.metaType = function () {
                        return org.kevoree.modeling.meta.MetaType.OPERATION;
                    };
                    AbstractMetaOperation.prototype.origin = function () {
                        if (this._lazyMetaClass != null) {
                            return this._lazyMetaClass();
                        }
                        return null;
                    };
                    return AbstractMetaOperation;
                })();
                abs.AbstractMetaOperation = AbstractMetaOperation;
                var AbstractMetaReference = (function () {
                    function AbstractMetaReference(p_name, p_index, p_visible, p_single, p_lazyMetaType, op_name, p_lazyMetaOrigin) {
                        this._name = p_name;
                        this._index = p_index;
                        this._visible = p_visible;
                        this._single = p_single;
                        this._lazyMetaType = p_lazyMetaType;
                        this._op_name = op_name;
                        this._lazyMetaOrigin = p_lazyMetaOrigin;
                    }
                    AbstractMetaReference.prototype.single = function () {
                        return this._single;
                    };
                    AbstractMetaReference.prototype.type = function () {
                        if (this._lazyMetaType != null) {
                            return this._lazyMetaType();
                        }
                        else {
                            return null;
                        }
                    };
                    AbstractMetaReference.prototype.opposite = function () {
                        if (this._op_name != null) {
                            return this.type().reference(this._op_name);
                        }
                        return null;
                    };
                    AbstractMetaReference.prototype.origin = function () {
                        if (this._lazyMetaOrigin != null) {
                            return this._lazyMetaOrigin();
                        }
                        return null;
                    };
                    AbstractMetaReference.prototype.index = function () {
                        return this._index;
                    };
                    AbstractMetaReference.prototype.metaName = function () {
                        return this._name;
                    };
                    AbstractMetaReference.prototype.metaType = function () {
                        return org.kevoree.modeling.meta.MetaType.REFERENCE;
                    };
                    AbstractMetaReference.prototype.visible = function () {
                        return this._visible;
                    };
                    return AbstractMetaReference;
                })();
                abs.AbstractMetaReference = AbstractMetaReference;
                var AbstractTimeWalker = (function () {
                    function AbstractTimeWalker(p_origin) {
                        this._origin = null;
                        this._origin = p_origin;
                    }
                    AbstractTimeWalker.prototype.internal_times = function (start, end, cb) {
                        var _this = this;
                        var keys = new Array();
                        keys[0] = org.kevoree.modeling.memory.KContentKey.createGlobalUniverseTree();
                        keys[1] = org.kevoree.modeling.memory.KContentKey.createUniverseTree(this._origin.uuid());
                        var manager = this._origin._manager;
                        manager.bumpKeysToCache(keys, function (kCacheElements) {
                            var objUniverse = kCacheElements[1];
                            if (kCacheElements[0] == null || kCacheElements[1] == null) {
                                cb(null);
                            }
                            else {
                                var collectedUniverse = org.kevoree.modeling.memory.manager.ResolutionHelper.universeSelectByRange(kCacheElements[0], kCacheElements[1], start, end, _this._origin.universe());
                                var timeTreeToLoad = new Array();
                                for (var i = 0; i < collectedUniverse.length; i++) {
                                    timeTreeToLoad[i] = org.kevoree.modeling.memory.KContentKey.createTimeTree(collectedUniverse[i], _this._origin.uuid());
                                }
                                manager.bumpKeysToCache(timeTreeToLoad, function (timeTrees) {
                                    var collector = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                    var previousDivergenceTime = end;
                                    for (var i = 0; i < collectedUniverse.length; i++) {
                                        var timeTree = timeTrees[i];
                                        if (timeTree != null) {
                                            var currentDivergenceTime = objUniverse.get(collectedUniverse[i]);
                                            var finalI = i;
                                            var finalPreviousDivergenceTime = previousDivergenceTime;
                                            timeTree.range(currentDivergenceTime, previousDivergenceTime, function (t) {
                                                if (collector.size() == 0) {
                                                    collector.put(collector.size(), t);
                                                }
                                                else {
                                                    if (t != finalPreviousDivergenceTime) {
                                                        collector.put(collector.size(), t);
                                                    }
                                                }
                                            });
                                            previousDivergenceTime = currentDivergenceTime;
                                        }
                                    }
                                    var orderedTime = new Array();
                                    for (var i = 0; i < collector.size(); i++) {
                                        orderedTime[i] = collector.get(i);
                                    }
                                    cb(orderedTime);
                                });
                            }
                        });
                    };
                    AbstractTimeWalker.prototype.allTimes = function (cb) {
                        this.internal_times(org.kevoree.modeling.KConfig.BEGINNING_OF_TIME, org.kevoree.modeling.KConfig.END_OF_TIME, cb);
                    };
                    AbstractTimeWalker.prototype.timesBefore = function (endOfSearch, cb) {
                        this.internal_times(org.kevoree.modeling.KConfig.BEGINNING_OF_TIME, endOfSearch, cb);
                    };
                    AbstractTimeWalker.prototype.timesAfter = function (beginningOfSearch, cb) {
                        this.internal_times(beginningOfSearch, org.kevoree.modeling.KConfig.END_OF_TIME, cb);
                    };
                    AbstractTimeWalker.prototype.timesBetween = function (beginningOfSearch, endOfSearch, cb) {
                        this.internal_times(beginningOfSearch, endOfSearch, cb);
                    };
                    return AbstractTimeWalker;
                })();
                abs.AbstractTimeWalker = AbstractTimeWalker;
            })(abs = modeling.abs || (modeling.abs = {}));
            var extrapolation;
            (function (extrapolation) {
                var DiscreteExtrapolation = (function () {
                    function DiscreteExtrapolation() {
                    }
                    DiscreteExtrapolation.instance = function () {
                        if (DiscreteExtrapolation.INSTANCE == null) {
                            DiscreteExtrapolation.INSTANCE = new org.kevoree.modeling.extrapolation.DiscreteExtrapolation();
                        }
                        return DiscreteExtrapolation.INSTANCE;
                    };
                    DiscreteExtrapolation.prototype.extrapolate = function (current, attribute) {
                        var payload = current._manager.segment(current, org.kevoree.modeling.memory.AccessMode.READ);
                        if (payload != null) {
                            return payload.get(attribute.index(), current.metaClass());
                        }
                        else {
                            return null;
                        }
                    };
                    DiscreteExtrapolation.prototype.mutate = function (current, attribute, payload) {
                        var internalPayload = current._manager.segment(current, org.kevoree.modeling.memory.AccessMode.WRITE);
                        if (internalPayload != null) {
                            internalPayload.set(attribute.index(), payload, current.metaClass());
                        }
                    };
                    DiscreteExtrapolation.prototype.save = function (cache, attribute) {
                        if (cache != null) {
                            return attribute.attributeType().save(cache);
                        }
                        else {
                            return null;
                        }
                    };
                    DiscreteExtrapolation.prototype.load = function (payload, attribute, now) {
                        if (payload != null) {
                            return attribute.attributeType().load(payload);
                        }
                        return null;
                    };
                    return DiscreteExtrapolation;
                })();
                extrapolation.DiscreteExtrapolation = DiscreteExtrapolation;
                var PolynomialExtrapolation = (function () {
                    function PolynomialExtrapolation() {
                    }
                    PolynomialExtrapolation.prototype.extrapolate = function (current, attribute) {
                        var pol = current._manager.segment(current, org.kevoree.modeling.memory.AccessMode.READ).get(attribute.index(), current.metaClass());
                        if (pol != null) {
                            var extrapolatedValue = pol.extrapolate(current.now());
                            if (attribute.attributeType() == org.kevoree.modeling.meta.PrimitiveTypes.DOUBLE) {
                                return extrapolatedValue;
                            }
                            else {
                                if (attribute.attributeType() == org.kevoree.modeling.meta.PrimitiveTypes.LONG) {
                                    return extrapolatedValue.longValue();
                                }
                                else {
                                    if (attribute.attributeType() == org.kevoree.modeling.meta.PrimitiveTypes.FLOAT) {
                                        return extrapolatedValue.floatValue();
                                    }
                                    else {
                                        if (attribute.attributeType() == org.kevoree.modeling.meta.PrimitiveTypes.INT) {
                                            return extrapolatedValue.intValue();
                                        }
                                        else {
                                            if (attribute.attributeType() == org.kevoree.modeling.meta.PrimitiveTypes.SHORT) {
                                                return extrapolatedValue.shortValue();
                                            }
                                            else {
                                                return null;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            return null;
                        }
                    };
                    PolynomialExtrapolation.prototype.mutate = function (current, attribute, payload) {
                        var raw = current._manager.segment(current, org.kevoree.modeling.memory.AccessMode.READ);
                        var previous = raw.get(attribute.index(), current.metaClass());
                        if (previous == null) {
                            var pol = this.createPolynomialModel(current.now(), attribute.precision());
                            pol.insert(current.now(), this.castNumber(payload));
                            current._manager.segment(current, org.kevoree.modeling.memory.AccessMode.WRITE).set(attribute.index(), pol, current.metaClass());
                        }
                        else {
                            var previousPol = previous;
                            if (!previousPol.insert(current.now(), this.castNumber(payload))) {
                                var pol = this.createPolynomialModel(previousPol.lastIndex(), attribute.precision());
                                pol.insert(previousPol.lastIndex(), previousPol.extrapolate(previousPol.lastIndex()));
                                pol.insert(current.now(), this.castNumber(payload));
                                current._manager.segment(current, org.kevoree.modeling.memory.AccessMode.WRITE).set(attribute.index(), pol, current.metaClass());
                            }
                            else {
                                if (previousPol.isDirty()) {
                                    raw.set(attribute.index(), previousPol, current.metaClass());
                                }
                            }
                        }
                    };
                    PolynomialExtrapolation.prototype.castNumber = function (payload) {
                        return +payload;
                    };
                    PolynomialExtrapolation.prototype.save = function (cache, attribute) {
                        try {
                            return cache.save();
                        }
                        catch ($ex$) {
                            if ($ex$ instanceof java.lang.Exception) {
                                var e = $ex$;
                                e.printStackTrace();
                                return null;
                            }
                        }
                    };
                    PolynomialExtrapolation.prototype.load = function (payload, attribute, now) {
                        var pol = this.createPolynomialModel(now, attribute.precision());
                        pol.load(payload);
                        return pol;
                    };
                    PolynomialExtrapolation.instance = function () {
                        if (PolynomialExtrapolation.INSTANCE == null) {
                            PolynomialExtrapolation.INSTANCE = new org.kevoree.modeling.extrapolation.PolynomialExtrapolation();
                        }
                        return PolynomialExtrapolation.INSTANCE;
                    };
                    PolynomialExtrapolation.prototype.createPolynomialModel = function (origin, precision) {
                        return new org.kevoree.modeling.extrapolation.polynomial.doublepolynomial.DoublePolynomialModel(origin, precision, 20, org.kevoree.modeling.extrapolation.polynomial.util.Prioritization.LOWDEGREES);
                    };
                    return PolynomialExtrapolation;
                })();
                extrapolation.PolynomialExtrapolation = PolynomialExtrapolation;
                var polynomial;
                (function (polynomial) {
                    var doublepolynomial;
                    (function (doublepolynomial) {
                        var DoublePolynomialModel = (function () {
                            function DoublePolynomialModel(p_timeOrigin, p_toleratedError, p_maxDegree, p_prioritization) {
                                this._isDirty = false;
                                this._polyTime = new org.kevoree.modeling.extrapolation.polynomial.doublepolynomial.TimePolynomial(p_timeOrigin);
                                this._prioritization = p_prioritization;
                                this._maxDegree = p_maxDegree;
                                this._toleratedError = p_toleratedError;
                            }
                            DoublePolynomialModel.prototype.degree = function () {
                                if (this._weights == null) {
                                    return -1;
                                }
                                else {
                                    return this._weights.length - 1;
                                }
                            };
                            DoublePolynomialModel.prototype.timeOrigin = function () {
                                return this._polyTime.timeOrigin();
                            };
                            DoublePolynomialModel.prototype.comparePolynome = function (p2, err) {
                                if (this._weights.length != p2._weights.length) {
                                    return false;
                                }
                                for (var i = 0; i < this._weights.length; i++) {
                                    if (Math.abs(this._weights[i] - this._weights[i]) > err) {
                                        return false;
                                    }
                                }
                                return true;
                            };
                            DoublePolynomialModel.prototype.extrapolate = function (time) {
                                return this.test_extrapolate(this._polyTime.denormalize(time), this._weights);
                            };
                            DoublePolynomialModel.prototype.insert = function (time, value) {
                                if (this._weights == null) {
                                    this.internal_feed(time, value);
                                    this._isDirty = true;
                                    return true;
                                }
                                if (this._polyTime.insert(time)) {
                                    var maxError = this.maxErr();
                                    if (Math.abs(this.extrapolate(time) - value) <= maxError) {
                                        return true;
                                    }
                                    var deg = this.degree();
                                    var newMaxDegree = Math.min(this._polyTime.nbSamples() - 1, this._maxDegree);
                                    if (deg < newMaxDegree) {
                                        deg++;
                                        var ss = Math.min(deg * 2, this._polyTime.nbSamples() - 1);
                                        var times = new Array();
                                        var values = new Array();
                                        var current = this._polyTime.nbSamples() - 1;
                                        for (var i = 0; i < ss; i++) {
                                            times[i] = this._polyTime.getNormalizedTime((i * current / ss));
                                            values[i] = this.test_extrapolate(times[i], this._weights);
                                        }
                                        times[ss] = this._polyTime.denormalize(time);
                                        values[ss] = value;
                                        var pf = new org.kevoree.modeling.extrapolation.polynomial.util.PolynomialFitEjml(deg);
                                        pf.fit(times, values);
                                        if (this.maxError(pf.getCoef(), time, value) <= maxError) {
                                            this._weights = new Array();
                                            for (var i = 0; i < pf.getCoef().length; i++) {
                                                this._weights[i] = pf.getCoef()[i];
                                            }
                                            this._isDirty = true;
                                            return true;
                                        }
                                    }
                                    this._polyTime.removeLast();
                                    return false;
                                }
                                else {
                                    return false;
                                }
                            };
                            DoublePolynomialModel.prototype.lastIndex = function () {
                                return this._polyTime.lastIndex();
                            };
                            DoublePolynomialModel.prototype.save = function () {
                                var builder = new java.lang.StringBuilder();
                                for (var i = 0; i < this._weights.length; i++) {
                                    if (i != 0) {
                                        builder.append(DoublePolynomialModel.sepW);
                                    }
                                    builder.append(this._weights[i] + "");
                                }
                                builder.append(DoublePolynomialModel.sep);
                                builder.append(this._polyTime.save());
                                this._isDirty = false;
                                return builder.toString();
                            };
                            DoublePolynomialModel.prototype.load = function (payload) {
                                var parts = payload.split(DoublePolynomialModel.sep);
                                if (parts.length == 2) {
                                    var welems = parts[0].split(DoublePolynomialModel.sepW);
                                    this._weights = new Array();
                                    for (var i = 0; i < welems.length; i++) {
                                        this._weights[i] = java.lang.Double.parseDouble(welems[i]);
                                    }
                                    this._polyTime.load(parts[1]);
                                }
                                else {
                                    System.err.println("Bad Polynomial String " + payload);
                                }
                                this._isDirty = false;
                            };
                            DoublePolynomialModel.prototype.isDirty = function () {
                                return this._isDirty || this._polyTime.isDirty();
                            };
                            DoublePolynomialModel.prototype.maxErr = function () {
                                var tol = this._toleratedError;
                                if (this._prioritization == org.kevoree.modeling.extrapolation.polynomial.util.Prioritization.HIGHDEGREES) {
                                    tol = this._toleratedError / Math.pow(2, this._maxDegree - this.degree());
                                }
                                else {
                                    if (this._prioritization == org.kevoree.modeling.extrapolation.polynomial.util.Prioritization.LOWDEGREES) {
                                        tol = this._toleratedError / Math.pow(2, this.degree() + 0.5);
                                    }
                                    else {
                                        if (this._prioritization == org.kevoree.modeling.extrapolation.polynomial.util.Prioritization.SAMEPRIORITY) {
                                            tol = this._toleratedError * this.degree() * 2 / (2 * this._maxDegree);
                                        }
                                    }
                                }
                                return tol;
                            };
                            DoublePolynomialModel.prototype.internal_feed = function (time, value) {
                                if (this._weights == null) {
                                    this._weights = new Array();
                                    this._weights[0] = value;
                                    this._polyTime.insert(time);
                                }
                            };
                            DoublePolynomialModel.prototype.maxError = function (computedWeights, time, value) {
                                var maxErr = 0;
                                var temp;
                                var ds;
                                for (var i = 0; i < this._polyTime.nbSamples() - 1; i++) {
                                    ds = this._polyTime.getNormalizedTime(i);
                                    var val = this.test_extrapolate(ds, computedWeights);
                                    temp = Math.abs(val - this.test_extrapolate(ds, this._weights));
                                    if (temp > maxErr) {
                                        maxErr = temp;
                                    }
                                }
                                temp = Math.abs(this.test_extrapolate(this._polyTime.denormalize(time), computedWeights) - value);
                                if (temp > maxErr) {
                                    maxErr = temp;
                                }
                                return maxErr;
                            };
                            DoublePolynomialModel.prototype.test_extrapolate = function (time, weights) {
                                var result = 0;
                                var power = 1;
                                for (var j = 0; j < weights.length; j++) {
                                    result += weights[j] * power;
                                    power = power * time;
                                }
                                return result;
                            };
                            DoublePolynomialModel.sep = "/";
                            DoublePolynomialModel.sepW = "%";
                            return DoublePolynomialModel;
                        })();
                        doublepolynomial.DoublePolynomialModel = DoublePolynomialModel;
                        var TimePolynomial = (function () {
                            function TimePolynomial(p_timeOrigin) {
                                this._isDirty = false;
                                this._timeOrigin = p_timeOrigin;
                            }
                            TimePolynomial.prototype.timeOrigin = function () {
                                return this._timeOrigin;
                            };
                            TimePolynomial.prototype.samplingPeriod = function () {
                                return this._samplingPeriod;
                            };
                            TimePolynomial.prototype.weights = function () {
                                return this._weights;
                            };
                            TimePolynomial.prototype.degree = function () {
                                if (this._weights == null) {
                                    return -1;
                                }
                                else {
                                    return this._weights.length - 1;
                                }
                            };
                            TimePolynomial.prototype.denormalize = function (p_time) {
                                return (p_time - this._timeOrigin) / this._samplingPeriod;
                            };
                            TimePolynomial.prototype.getNormalizedTime = function (id) {
                                var result = 0;
                                var power = 1;
                                for (var j = 0; j < this._weights.length; j++) {
                                    result += this._weights[j] * power;
                                    power = power * id;
                                }
                                return result;
                            };
                            TimePolynomial.prototype.extrapolate = function (id) {
                                return this.test_extrapolate(id, this._weights);
                            };
                            TimePolynomial.prototype.nbSamples = function () {
                                return this._nbSamples;
                            };
                            TimePolynomial.prototype.insert = function (time) {
                                if (this._weights == null) {
                                    this._timeOrigin = time;
                                    this._weights = new Array();
                                    this._weights[0] = 0;
                                    this._nbSamples = 1;
                                    this._isDirty = true;
                                    return true;
                                }
                                if (this._nbSamples == 1) {
                                    this._samplingPeriod = time - this._timeOrigin;
                                    this._weights = new Array();
                                    this._weights[0] = 0;
                                    this._weights[1] = 1;
                                    this._nbSamples = 2;
                                    this._isDirty = true;
                                    return true;
                                }
                                if (time > this.extrapolate(this._nbSamples - 1)) {
                                    var maxError = this._samplingPeriod / TimePolynomial.toleratedErrorRatio;
                                    if (Math.abs(this.extrapolate(this._nbSamples) - time) <= maxError) {
                                        this._nbSamples++;
                                        this._isDirty = true;
                                        return true;
                                    }
                                    var deg = this.degree();
                                    var newMaxDegree = Math.min(this._nbSamples, TimePolynomial.maxTimeDegree);
                                    while (deg < newMaxDegree) {
                                        deg++;
                                        var ss = Math.min(deg * 2, this._nbSamples);
                                        var ids = new Array();
                                        var times = new Array();
                                        var idtemp;
                                        for (var i = 0; i < ss; i++) {
                                            idtemp = (i * this._nbSamples / ss);
                                            ids[i] = idtemp;
                                            times[i] = (this.extrapolate(idtemp) - this._timeOrigin) / (this._samplingPeriod);
                                        }
                                        ids[ss] = this._nbSamples;
                                        times[ss] = (time - this._timeOrigin) / (this._samplingPeriod);
                                        var pf = new org.kevoree.modeling.extrapolation.polynomial.util.PolynomialFitEjml(deg);
                                        pf.fit(ids, times);
                                        if (this.maxError(pf.getCoef(), this._nbSamples, time) <= maxError) {
                                            this._weights = new Array();
                                            for (var i = 0; i < pf.getCoef().length; i++) {
                                                this._weights[i] = pf.getCoef()[i];
                                            }
                                            this._nbSamples++;
                                            this._isDirty = true;
                                            return true;
                                        }
                                    }
                                    return false;
                                }
                                else {
                                }
                                return false;
                            };
                            TimePolynomial.prototype.maxError = function (computedWeights, lastId, newtime) {
                                var maxErr = 0;
                                var time;
                                var temp;
                                for (var i = 0; i < lastId; i++) {
                                    time = this.test_extrapolate(i, computedWeights);
                                    temp = Math.abs(time - this.extrapolate(i));
                                    if (temp > maxErr) {
                                        maxErr = temp;
                                    }
                                }
                                temp = Math.abs(this.test_extrapolate(this._nbSamples, computedWeights) - newtime);
                                if (temp > maxErr) {
                                    maxErr = temp;
                                }
                                return maxErr;
                            };
                            TimePolynomial.prototype.test_extrapolate = function (id, newWeights) {
                                var result = 0;
                                var power = 1;
                                for (var j = 0; j < newWeights.length; j++) {
                                    result += newWeights[j] * power;
                                    power = power * id;
                                }
                                result = result * (this._samplingPeriod) + this._timeOrigin;
                                return result;
                            };
                            TimePolynomial.prototype.removeLast = function () {
                                this._nbSamples = this._nbSamples - 1;
                            };
                            TimePolynomial.prototype.lastIndex = function () {
                                if (this._nbSamples > 0) {
                                    return this.extrapolate(this._nbSamples - 1);
                                }
                                return -1;
                            };
                            TimePolynomial.prototype.save = function () {
                                var builder = new java.lang.StringBuilder();
                                for (var i = 0; i < this._weights.length; i++) {
                                    if (i != 0) {
                                        builder.append(org.kevoree.modeling.extrapolation.polynomial.doublepolynomial.DoublePolynomialModel.sepW);
                                    }
                                    builder.append(this._weights[i] + "");
                                }
                                builder.append(org.kevoree.modeling.extrapolation.polynomial.doublepolynomial.DoublePolynomialModel.sepW);
                                builder.append(this._nbSamples);
                                builder.append(org.kevoree.modeling.extrapolation.polynomial.doublepolynomial.DoublePolynomialModel.sepW);
                                builder.append(this._samplingPeriod);
                                this._isDirty = false;
                                return builder.toString();
                            };
                            TimePolynomial.prototype.load = function (payload) {
                                var parts = payload.split(org.kevoree.modeling.extrapolation.polynomial.doublepolynomial.DoublePolynomialModel.sepW);
                                this._weights = new Array();
                                for (var i = 0; i < parts.length - 2; i++) {
                                    this._weights[i] = java.lang.Double.parseDouble(parts[i]);
                                }
                                this._nbSamples = java.lang.Integer.parseInt(parts[parts.length - 1]);
                                this._samplingPeriod = java.lang.Integer.parseInt(parts[parts.length - 2]);
                                this._isDirty = false;
                            };
                            TimePolynomial.prototype.isDirty = function () {
                                return this._isDirty;
                            };
                            TimePolynomial.toleratedErrorRatio = 10;
                            TimePolynomial.maxTimeDegree = 20;
                            return TimePolynomial;
                        })();
                        doublepolynomial.TimePolynomial = TimePolynomial;
                    })(doublepolynomial = polynomial.doublepolynomial || (polynomial.doublepolynomial = {}));
                    var simplepolynomial;
                    (function (simplepolynomial) {
                        var SimplePolynomialModel = (function () {
                            function SimplePolynomialModel(timeOrigin, toleratedError, maxDegree, prioritization) {
                                this._lastIndex = -1;
                                this._isDirty = false;
                                this.timeOrigin = timeOrigin;
                                this.degradeFactor = 1;
                                this.prioritization = prioritization;
                                this.maxDegree = maxDegree;
                                this.toleratedError = toleratedError;
                            }
                            SimplePolynomialModel.prototype.getDegree = function () {
                                if (this.weights == null) {
                                    return -1;
                                }
                                else {
                                    return this.weights.length - 1;
                                }
                            };
                            SimplePolynomialModel.prototype.getTimeOrigin = function () {
                                return this.timeOrigin;
                            };
                            SimplePolynomialModel.prototype.getMaxErr = function (degree, toleratedError, maxDegree, prioritization) {
                                return toleratedError;
                            };
                            SimplePolynomialModel.prototype.internal_feed = function (time, value) {
                                if (this.weights == null) {
                                    this.weights = new Array();
                                    this.weights[0] = value;
                                    this.timeOrigin = time;
                                }
                            };
                            SimplePolynomialModel.prototype.maxError = function (computedWeights, time, value) {
                                var maxErr = 0;
                                var temp = 0;
                                var ds;
                                temp = Math.abs(this.internal_extrapolate(time, computedWeights) - value);
                                if (temp > maxErr) {
                                    maxErr = temp;
                                }
                                return maxErr;
                            };
                            SimplePolynomialModel.prototype.comparePolynome = function (p2, err) {
                                if (this.weights.length != p2.weights.length) {
                                    return false;
                                }
                                for (var i = 0; i < this.weights.length; i++) {
                                    if (Math.abs(this.weights[i] - this.weights[i]) > err) {
                                        return false;
                                    }
                                }
                                return true;
                            };
                            SimplePolynomialModel.prototype.internal_extrapolate = function (time, weights) {
                                var result = 0;
                                var t = (time - this.timeOrigin) / this.degradeFactor;
                                var power = 1;
                                for (var j = 0; j < weights.length; j++) {
                                    result += weights[j] * power;
                                    power = power * t;
                                }
                                return result;
                            };
                            SimplePolynomialModel.prototype.extrapolate = function (time) {
                                return this.internal_extrapolate(time, this.weights);
                            };
                            SimplePolynomialModel.prototype.insert = function (time, value) {
                                if (true) {
                                    return true;
                                }
                                if (this.weights == null) {
                                    this.internal_feed(time, value);
                                    this._lastIndex = time;
                                    this._isDirty = true;
                                    return true;
                                }
                                var maxError = this.getMaxErr(this.getDegree(), this.toleratedError, this.maxDegree, this.prioritization);
                                if (Math.abs(this.extrapolate(time) - value) <= maxError) {
                                    this._lastIndex = time;
                                    return true;
                                }
                                var deg = this.getDegree();
                                return false;
                            };
                            SimplePolynomialModel.prototype.lastIndex = function () {
                                return this._lastIndex;
                            };
                            SimplePolynomialModel.prototype.save = function () {
                                var builder = new java.lang.StringBuilder();
                                for (var i = 0; i < this.weights.length; i++) {
                                    if (i != 0) {
                                        builder.append(SimplePolynomialModel.sep);
                                    }
                                    builder.append(this.weights[i] + "");
                                }
                                this._isDirty = false;
                                return builder.toString();
                            };
                            SimplePolynomialModel.prototype.load = function (payload) {
                                var elems = payload.split(SimplePolynomialModel.sep);
                                this.weights = new Array();
                                for (var i = 0; i < elems.length; i++) {
                                    this.weights[i] = java.lang.Double.parseDouble(elems[i]);
                                }
                                this._isDirty = false;
                            };
                            SimplePolynomialModel.prototype.isDirty = function () {
                                return this._isDirty;
                            };
                            SimplePolynomialModel.sep = "/";
                            return SimplePolynomialModel;
                        })();
                        simplepolynomial.SimplePolynomialModel = SimplePolynomialModel;
                    })(simplepolynomial = polynomial.simplepolynomial || (polynomial.simplepolynomial = {}));
                    var util;
                    (function (util) {
                        var AdjLinearSolverQr = (function () {
                            function AdjLinearSolverQr() {
                                this.maxRows = -1;
                                this.maxCols = -1;
                                this.decomposer = new org.kevoree.modeling.extrapolation.polynomial.util.QRDecompositionHouseholderColumn_D64();
                            }
                            AdjLinearSolverQr.prototype.setA = function (A) {
                                if (A.numRows > this.maxRows || A.numCols > this.maxCols) {
                                    this.setMaxSize(A.numRows, A.numCols);
                                }
                                this.numRows = A.numRows;
                                this.numCols = A.numCols;
                                if (!this.decomposer.decompose(A)) {
                                    return false;
                                }
                                this.Q.reshape(this.numRows, this.numRows, false);
                                this.R.reshape(this.numRows, this.numCols, false);
                                this.decomposer.getQ(this.Q, false);
                                this.decomposer.getR(this.R, false);
                                return true;
                            };
                            AdjLinearSolverQr.prototype.solveU = function (U, b, n) {
                                for (var i = n - 1; i >= 0; i--) {
                                    var sum = b[i];
                                    var indexU = i * n + i + 1;
                                    for (var j = i + 1; j < n; j++) {
                                        sum -= U[indexU++] * b[j];
                                    }
                                    b[i] = sum / U[i * n + i];
                                }
                            };
                            AdjLinearSolverQr.prototype.solve = function (B, X) {
                                var BnumCols = B.numCols;
                                this.Y.reshape(this.numRows, 1, false);
                                this.Z.reshape(this.numRows, 1, false);
                                for (var colB = 0; colB < BnumCols; colB++) {
                                    for (var i = 0; i < this.numRows; i++) {
                                        this.Y.data[i] = B.unsafe_get(i, colB);
                                    }
                                    org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.multTransA(this.Q, this.Y, this.Z);
                                    this.solveU(this.R.data, this.Z.data, this.numCols);
                                    for (var i = 0; i < this.numCols; i++) {
                                        X.cset(i, colB, this.Z.data[i]);
                                    }
                                }
                            };
                            AdjLinearSolverQr.prototype.setMaxSize = function (maxRows, maxCols) {
                                maxRows += 5;
                                this.maxRows = maxRows;
                                this.maxCols = maxCols;
                                this.Q = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(maxRows, maxRows);
                                this.R = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(maxRows, maxCols);
                                this.Y = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(maxRows, 1);
                                this.Z = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(maxRows, 1);
                            };
                            return AdjLinearSolverQr;
                        })();
                        util.AdjLinearSolverQr = AdjLinearSolverQr;
                        var DataSample = (function () {
                            function DataSample(time, value) {
                                this.time = time;
                                this.value = value;
                            }
                            return DataSample;
                        })();
                        util.DataSample = DataSample;
                        var DenseMatrix64F = (function () {
                            function DenseMatrix64F(numRows, numCols) {
                                this.data = new Array();
                                this.numRows = numRows;
                                this.numCols = numCols;
                            }
                            DenseMatrix64F.multTransA_smallMV = function (A, B, C) {
                                var cIndex = 0;
                                for (var i = 0; i < A.numCols; i++) {
                                    var total = 0.0;
                                    var indexA = i;
                                    for (var j = 0; j < A.numRows; j++) {
                                        total += A.get(indexA) * B.get(j);
                                        indexA += A.numCols;
                                    }
                                    C.set(cIndex++, total);
                                }
                            };
                            DenseMatrix64F.multTransA_reorderMV = function (A, B, C) {
                                if (A.numRows == 0) {
                                    org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.fill(C, 0);
                                    return;
                                }
                                var B_val = B.get(0);
                                for (var i = 0; i < A.numCols; i++) {
                                    C.set(i, A.get(i) * B_val);
                                }
                                var indexA = A.numCols;
                                for (var i = 1; i < A.numRows; i++) {
                                    B_val = B.get(i);
                                    for (var j = 0; j < A.numCols; j++) {
                                        C.plus(j, A.get(indexA++) * B_val);
                                    }
                                }
                            };
                            DenseMatrix64F.multTransA_reorderMM = function (a, b, c) {
                                if (a.numCols == 0 || a.numRows == 0) {
                                    org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.fill(c, 0);
                                    return;
                                }
                                var valA;
                                for (var i = 0; i < a.numCols; i++) {
                                    var indexC_start = i * c.numCols;
                                    valA = a.get(i);
                                    var indexB = 0;
                                    var end = indexB + b.numCols;
                                    var indexC = indexC_start;
                                    while (indexB < end) {
                                        c.set(indexC++, valA * b.get(indexB++));
                                    }
                                    for (var k = 1; k < a.numRows; k++) {
                                        valA = a.unsafe_get(k, i);
                                        end = indexB + b.numCols;
                                        indexC = indexC_start;
                                        while (indexB < end) {
                                            c.plus(indexC++, valA * b.get(indexB++));
                                        }
                                    }
                                }
                            };
                            DenseMatrix64F.multTransA_smallMM = function (a, b, c) {
                                var cIndex = 0;
                                for (var i = 0; i < a.numCols; i++) {
                                    for (var j = 0; j < b.numCols; j++) {
                                        var indexA = i;
                                        var indexB = j;
                                        var end = indexB + b.numRows * b.numCols;
                                        var total = 0;
                                        for (; indexB < end; indexB += b.numCols) {
                                            total += a.get(indexA) * b.get(indexB);
                                            indexA += a.numCols;
                                        }
                                        c.set(cIndex++, total);
                                    }
                                }
                            };
                            DenseMatrix64F.multTransA = function (a, b, c) {
                                if (b.numCols == 1) {
                                    if (a.numCols >= org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH) {
                                        org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.multTransA_reorderMV(a, b, c);
                                    }
                                    else {
                                        org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.multTransA_smallMV(a, b, c);
                                    }
                                }
                                else {
                                    if (a.numCols >= org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH || b.numCols >= org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH) {
                                        org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.multTransA_reorderMM(a, b, c);
                                    }
                                    else {
                                        org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.multTransA_smallMM(a, b, c);
                                    }
                                }
                            };
                            DenseMatrix64F.setIdentity = function (mat) {
                                var width = mat.numRows < mat.numCols ? mat.numRows : mat.numCols;
                                java.util.Arrays.fill(mat.data, 0, mat.getNumElements(), 0);
                                var index = 0;
                                for (var i = 0; i < width; i++) {
                                    mat.data[index] = 1;
                                    index += mat.numCols + 1;
                                }
                            };
                            DenseMatrix64F.widentity = function (width) {
                                var ret = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(width, width);
                                for (var i = 0; i < width; i++) {
                                    ret.cset(i, i, 1.0);
                                }
                                return ret;
                            };
                            DenseMatrix64F.identity = function (numRows, numCols) {
                                var ret = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(numRows, numCols);
                                var small = numRows < numCols ? numRows : numCols;
                                for (var i = 0; i < small; i++) {
                                    ret.cset(i, i, 1.0);
                                }
                                return ret;
                            };
                            DenseMatrix64F.fill = function (a, value) {
                                java.util.Arrays.fill(a.data, 0, a.getNumElements(), value);
                            };
                            DenseMatrix64F.prototype.get = function (index) {
                                return this.data[index];
                            };
                            DenseMatrix64F.prototype.set = function (index, val) {
                                return this.data[index] = val;
                            };
                            DenseMatrix64F.prototype.plus = function (index, val) {
                                return this.data[index] += val;
                            };
                            DenseMatrix64F.prototype.reshape = function (numRows, numCols, saveValues) {
                                if (this.data.length < numRows * numCols) {
                                    var d = new Array();
                                    if (saveValues) {
                                        System.arraycopy(this.data, 0, d, 0, this.getNumElements());
                                    }
                                    this.data = d;
                                }
                                this.numRows = numRows;
                                this.numCols = numCols;
                            };
                            DenseMatrix64F.prototype.cset = function (row, col, value) {
                                this.data[row * this.numCols + col] = value;
                            };
                            DenseMatrix64F.prototype.unsafe_get = function (row, col) {
                                return this.data[row * this.numCols + col];
                            };
                            DenseMatrix64F.prototype.getNumElements = function () {
                                return this.numRows * this.numCols;
                            };
                            DenseMatrix64F.MULT_COLUMN_SWITCH = 15;
                            return DenseMatrix64F;
                        })();
                        util.DenseMatrix64F = DenseMatrix64F;
                        var PolynomialFitEjml = (function () {
                            function PolynomialFitEjml(degree) {
                                this.coef = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(degree + 1, 1);
                                this.A = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(1, degree + 1);
                                this.y = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(1, 1);
                                this.solver = new org.kevoree.modeling.extrapolation.polynomial.util.AdjLinearSolverQr();
                            }
                            PolynomialFitEjml.prototype.getCoef = function () {
                                return this.coef.data;
                            };
                            PolynomialFitEjml.prototype.fit = function (samplePoints, observations) {
                                this.y.reshape(observations.length, 1, false);
                                System.arraycopy(observations, 0, this.y.data, 0, observations.length);
                                this.A.reshape(this.y.numRows, this.coef.numRows, false);
                                for (var i = 0; i < observations.length; i++) {
                                    var obs = 1;
                                    for (var j = 0; j < this.coef.numRows; j++) {
                                        this.A.cset(i, j, obs);
                                        obs *= samplePoints[i];
                                    }
                                }
                                this.solver.setA(this.A);
                                this.solver.solve(this.y, this.coef);
                            };
                            return PolynomialFitEjml;
                        })();
                        util.PolynomialFitEjml = PolynomialFitEjml;
                        var Prioritization = (function () {
                            function Prioritization() {
                            }
                            Prioritization.prototype.equals = function (other) {
                                return this == other;
                            };
                            Prioritization.values = function () {
                                return Prioritization._PrioritizationVALUES;
                            };
                            Prioritization.SAMEPRIORITY = new Prioritization();
                            Prioritization.HIGHDEGREES = new Prioritization();
                            Prioritization.LOWDEGREES = new Prioritization();
                            Prioritization._PrioritizationVALUES = [
                                Prioritization.SAMEPRIORITY,
                                Prioritization.HIGHDEGREES,
                                Prioritization.LOWDEGREES
                            ];
                            return Prioritization;
                        })();
                        util.Prioritization = Prioritization;
                        var QRDecompositionHouseholderColumn_D64 = (function () {
                            function QRDecompositionHouseholderColumn_D64() {
                            }
                            QRDecompositionHouseholderColumn_D64.prototype.setExpectedMaxSize = function (numRows, numCols) {
                                this.numCols = numCols;
                                this.numRows = numRows;
                                this.minLength = Math.min(numCols, numRows);
                                var maxLength = Math.max(numCols, numRows);
                                if (this.dataQR == null || this.dataQR.length < numCols || this.dataQR[0].length < numRows) {
                                    this.dataQR = new Array(new Array());
                                    for (var i = 0; i < numCols; i++) {
                                        this.dataQR[i] = new Array();
                                    }
                                    this.v = new Array();
                                    this.gammas = new Array();
                                }
                                if (this.v.length < maxLength) {
                                    this.v = new Array();
                                }
                                if (this.gammas.length < this.minLength) {
                                    this.gammas = new Array();
                                }
                            };
                            QRDecompositionHouseholderColumn_D64.prototype.getQ = function (Q, compact) {
                                if (compact) {
                                    if (Q == null) {
                                        Q = org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.identity(this.numRows, this.minLength);
                                    }
                                    else {
                                        org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.setIdentity(Q);
                                    }
                                }
                                else {
                                    if (Q == null) {
                                        Q = org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.widentity(this.numRows);
                                    }
                                    else {
                                        org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.setIdentity(Q);
                                    }
                                }
                                for (var j = this.minLength - 1; j >= 0; j--) {
                                    var u = this.dataQR[j];
                                    var vv = u[j];
                                    u[j] = 1;
                                    org.kevoree.modeling.extrapolation.polynomial.util.QRDecompositionHouseholderColumn_D64.rank1UpdateMultR(Q, u, this.gammas[j], j, j, this.numRows, this.v);
                                    u[j] = vv;
                                }
                                return Q;
                            };
                            QRDecompositionHouseholderColumn_D64.prototype.getR = function (R, compact) {
                                if (R == null) {
                                    if (compact) {
                                        R = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(this.minLength, this.numCols);
                                    }
                                    else {
                                        R = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(this.numRows, this.numCols);
                                    }
                                }
                                else {
                                    for (var i = 0; i < R.numRows; i++) {
                                        var min = Math.min(i, R.numCols);
                                        for (var j = 0; j < min; j++) {
                                            R.cset(i, j, 0);
                                        }
                                    }
                                }
                                for (var j = 0; j < this.numCols; j++) {
                                    var colR = this.dataQR[j];
                                    var l = Math.min(j, this.numRows - 1);
                                    for (var i = 0; i <= l; i++) {
                                        var val = colR[i];
                                        R.cset(i, j, val);
                                    }
                                }
                                return R;
                            };
                            QRDecompositionHouseholderColumn_D64.prototype.decompose = function (A) {
                                this.setExpectedMaxSize(A.numRows, A.numCols);
                                this.convertToColumnMajor(A);
                                this.error = false;
                                for (var j = 0; j < this.minLength; j++) {
                                    this.householder(j);
                                    this.updateA(j);
                                }
                                return !this.error;
                            };
                            QRDecompositionHouseholderColumn_D64.prototype.convertToColumnMajor = function (A) {
                                for (var x = 0; x < this.numCols; x++) {
                                    var colQ = this.dataQR[x];
                                    for (var y = 0; y < this.numRows; y++) {
                                        colQ[y] = A.data[y * this.numCols + x];
                                    }
                                }
                            };
                            QRDecompositionHouseholderColumn_D64.prototype.householder = function (j) {
                                var u = this.dataQR[j];
                                var max = org.kevoree.modeling.extrapolation.polynomial.util.QRDecompositionHouseholderColumn_D64.findMax(u, j, this.numRows - j);
                                if (max == 0.0) {
                                    this.gamma = 0;
                                    this.error = true;
                                }
                                else {
                                    this.tau = org.kevoree.modeling.extrapolation.polynomial.util.QRDecompositionHouseholderColumn_D64.computeTauAndDivide(j, this.numRows, u, max);
                                    var u_0 = u[j] + this.tau;
                                    org.kevoree.modeling.extrapolation.polynomial.util.QRDecompositionHouseholderColumn_D64.divideElements(j + 1, this.numRows, u, u_0);
                                    this.gamma = u_0 / this.tau;
                                    this.tau *= max;
                                    u[j] = -this.tau;
                                }
                                this.gammas[j] = this.gamma;
                            };
                            QRDecompositionHouseholderColumn_D64.prototype.updateA = function (w) {
                                var u = this.dataQR[w];
                                for (var j = w + 1; j < this.numCols; j++) {
                                    var colQ = this.dataQR[j];
                                    var val = colQ[w];
                                    for (var k = w + 1; k < this.numRows; k++) {
                                        val += u[k] * colQ[k];
                                    }
                                    val *= this.gamma;
                                    colQ[w] -= val;
                                    for (var i = w + 1; i < this.numRows; i++) {
                                        colQ[i] -= u[i] * val;
                                    }
                                }
                            };
                            QRDecompositionHouseholderColumn_D64.findMax = function (u, startU, length) {
                                var max = -1;
                                var index = startU;
                                var stopIndex = startU + length;
                                for (; index < stopIndex; index++) {
                                    var val = u[index];
                                    val = (val < 0.0) ? -val : val;
                                    if (val > max) {
                                        max = val;
                                    }
                                }
                                return max;
                            };
                            QRDecompositionHouseholderColumn_D64.divideElements = function (j, numRows, u, u_0) {
                                for (var i = j; i < numRows; i++) {
                                    u[i] /= u_0;
                                }
                            };
                            QRDecompositionHouseholderColumn_D64.computeTauAndDivide = function (j, numRows, u, max) {
                                var tau = 0;
                                for (var i = j; i < numRows; i++) {
                                    var d = u[i] /= max;
                                    tau += d * d;
                                }
                                tau = Math.sqrt(tau);
                                if (u[j] < 0) {
                                    tau = -tau;
                                }
                                return tau;
                            };
                            QRDecompositionHouseholderColumn_D64.rank1UpdateMultR = function (A, u, gamma, colA0, w0, w1, _temp) {
                                for (var i = colA0; i < A.numCols; i++) {
                                    _temp[i] = u[w0] * A.data[w0 * A.numCols + i];
                                }
                                for (var k = w0 + 1; k < w1; k++) {
                                    var indexA = k * A.numCols + colA0;
                                    var valU = u[k];
                                    for (var i = colA0; i < A.numCols; i++) {
                                        _temp[i] += valU * A.data[indexA++];
                                    }
                                }
                                for (var i = colA0; i < A.numCols; i++) {
                                    _temp[i] *= gamma;
                                }
                                for (var i = w0; i < w1; i++) {
                                    var valU = u[i];
                                    var indexA = i * A.numCols + colA0;
                                    for (var j = colA0; j < A.numCols; j++) {
                                        A.data[indexA++] -= valU * _temp[j];
                                    }
                                }
                            };
                            return QRDecompositionHouseholderColumn_D64;
                        })();
                        util.QRDecompositionHouseholderColumn_D64 = QRDecompositionHouseholderColumn_D64;
                    })(util = polynomial.util || (polynomial.util = {}));
                })(polynomial = extrapolation.polynomial || (extrapolation.polynomial = {}));
            })(extrapolation = modeling.extrapolation || (modeling.extrapolation = {}));
            var format;
            (function (format) {
                var json;
                (function (json) {
                    var JsonFormat = (function () {
                        function JsonFormat(p_universe, p_time, p_manager) {
                            this._manager = p_manager;
                            this._universe = p_universe;
                            this._time = p_time;
                        }
                        JsonFormat.prototype.save = function (model, cb) {
                            if (org.kevoree.modeling.util.Checker.isDefined(model) && org.kevoree.modeling.util.Checker.isDefined(cb)) {
                                org.kevoree.modeling.format.json.JsonModelSerializer.serialize(model, cb);
                            }
                            else {
                                throw new java.lang.RuntimeException(JsonFormat.NULL_PARAM_MSG);
                            }
                        };
                        JsonFormat.prototype.saveRoot = function (cb) {
                            if (org.kevoree.modeling.util.Checker.isDefined(cb)) {
                                this._manager.getRoot(this._universe, this._time, function (root) {
                                    if (root == null) {
                                        cb(null);
                                    }
                                    else {
                                        org.kevoree.modeling.format.json.JsonModelSerializer.serialize(root, cb);
                                    }
                                });
                            }
                        };
                        JsonFormat.prototype.load = function (payload, cb) {
                            if (org.kevoree.modeling.util.Checker.isDefined(payload)) {
                                org.kevoree.modeling.format.json.JsonModelLoader.load(this._manager, this._universe, this._time, payload, cb);
                            }
                            else {
                                throw new java.lang.RuntimeException(JsonFormat.NULL_PARAM_MSG);
                            }
                        };
                        JsonFormat.KEY_META = "@class";
                        JsonFormat.KEY_UUID = "@uuid";
                        JsonFormat.KEY_ROOT = "@root";
                        JsonFormat.NULL_PARAM_MSG = "one parameter is null";
                        return JsonFormat;
                    })();
                    json.JsonFormat = JsonFormat;
                    var JsonModelLoader = (function () {
                        function JsonModelLoader() {
                        }
                        JsonModelLoader.load = function (manager, universe, time, payload, callback) {
                            if (payload == null) {
                                callback(null);
                            }
                            else {
                                var toLoadObj = JSON.parse(payload);
                                var rootElem = [];
                                var mappedKeys = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(toLoadObj.length, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                for (var i = 0; i < toLoadObj.length; i++) {
                                    var elem = toLoadObj[i];
                                    var kid = elem[org.kevoree.modeling.format.json.JsonFormat.KEY_UUID];
                                    mappedKeys.put(kid, manager.nextObjectKey());
                                }
                                for (var i = 0; i < toLoadObj.length; i++) {
                                    var elemRaw = toLoadObj[i];
                                    var elem2 = new org.kevoree.modeling.memory.struct.map.StringHashMap(Object.keys(elemRaw).length, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                    for (var ik in elemRaw) {
                                        elem2[ik] = elemRaw[ik];
                                    }
                                    try {
                                        org.kevoree.modeling.format.json.JsonModelLoader.loadObj(elem2, manager, universe, time, mappedKeys, rootElem);
                                    }
                                    catch (e) {
                                        console.error(e);
                                    }
                                }
                                if (rootElem[0] != null) {
                                    manager.setRoot(rootElem[0], function (throwable) {
                                        if (callback != null) {
                                            callback(throwable);
                                        }
                                    });
                                }
                                else {
                                    if (callback != null) {
                                        callback(null);
                                    }
                                }
                            }
                        };
                        JsonModelLoader.loadObj = function (p_param, manager, universe, time, p_mappedKeys, p_rootElem) {
                            var kid = java.lang.Long.parseLong(p_param.get(org.kevoree.modeling.format.json.JsonFormat.KEY_UUID).toString());
                            var meta = p_param.get(org.kevoree.modeling.format.json.JsonFormat.KEY_META).toString();
                            var metaClass = manager.model().metaModel().metaClass(meta);
                            var current = manager.model().createProxy(universe, time, p_mappedKeys.get(kid), metaClass);
                            manager.initKObject(current);
                            var raw = manager.segment(current, org.kevoree.modeling.memory.AccessMode.WRITE);
                            p_param.each(function (metaKey, payload_content) {
                                if (metaKey.equals(org.kevoree.modeling.format.json.JsonFormat.KEY_ROOT)) {
                                    p_rootElem[0] = current;
                                }
                                else {
                                    var metaElement = metaClass.metaByName(metaKey);
                                    if (payload_content != null) {
                                        if (metaElement != null && metaElement.metaType().equals(org.kevoree.modeling.meta.MetaType.ATTRIBUTE)) {
                                            raw.set(metaElement.index(), metaElement.strategy().load(payload_content.toString(), metaElement, time), current.metaClass());
                                        }
                                        else {
                                            if (metaElement != null && metaElement instanceof org.kevoree.modeling.abs.AbstractMetaReference) {
                                                try {
                                                    raw.set(metaElement.index(), org.kevoree.modeling.format.json.JsonModelLoader.transposeArr(payload_content, p_mappedKeys), current.metaClass());
                                                }
                                                catch ($ex$) {
                                                    if ($ex$ instanceof java.lang.Exception) {
                                                        var e = $ex$;
                                                        e.printStackTrace();
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        };
                        JsonModelLoader.transposeArr = function (plainRawSet, p_mappedKeys) {
                            if (plainRawSet == null) {
                                return null;
                            }
                            var convertedRaw = new Array();
                            for (var l in plainRawSet) {
                                try {
                                    var converted = java.lang.Long.parseLong(plainRawSet[l]);
                                    if (p_mappedKeys.containsKey(converted)) {
                                        converted = p_mappedKeys.get(converted);
                                    }
                                    convertedRaw[l] = converted;
                                }
                                catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e = $ex$;
                                        e.printStackTrace();
                                    }
                                }
                            }
                            return convertedRaw;
                        };
                        return JsonModelLoader;
                    })();
                    json.JsonModelLoader = JsonModelLoader;
                    var JsonModelSerializer = (function () {
                        function JsonModelSerializer() {
                        }
                        JsonModelSerializer.serialize = function (model, callback) {
                            model._manager.getRoot(model.universe(), model.now(), function (rootObj) {
                                var isRoot = false;
                                if (rootObj != null) {
                                    isRoot = rootObj.uuid() == model.uuid();
                                }
                                var builder = new java.lang.StringBuilder();
                                builder.append("[\n");
                                org.kevoree.modeling.format.json.JsonModelSerializer.printJSON(model, builder, isRoot);
                                model.visit(function (elem) {
                                    var isRoot2 = false;
                                    if (rootObj != null) {
                                        isRoot2 = rootObj.uuid() == elem.uuid();
                                    }
                                    builder.append(",\n");
                                    try {
                                        org.kevoree.modeling.format.json.JsonModelSerializer.printJSON(elem, builder, isRoot2);
                                    }
                                    catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e = $ex$;
                                            e.printStackTrace();
                                            builder.append("{}");
                                        }
                                    }
                                    return org.kevoree.modeling.KVisitResult.CONTINUE;
                                }, function (throwable) {
                                    builder.append("\n]\n");
                                    callback(builder.toString());
                                });
                            });
                        };
                        JsonModelSerializer.printJSON = function (elem, builder, isRoot) {
                            if (elem != null) {
                                var raw = elem._manager.segment(elem, org.kevoree.modeling.memory.AccessMode.READ);
                                if (raw != null) {
                                    builder.append(org.kevoree.modeling.memory.manager.JsonRaw.encode(raw, elem.uuid(), elem.metaClass(), isRoot));
                                }
                            }
                        };
                        return JsonModelSerializer;
                    })();
                    json.JsonModelSerializer = JsonModelSerializer;
                    var JsonObjectReader = (function () {
                        function JsonObjectReader() {
                        }
                        JsonObjectReader.prototype.parseObject = function (payload) {
                            this.readObject = JSON.parse(payload);
                        };
                        JsonObjectReader.prototype.get = function (name) {
                            return this.readObject[name];
                        };
                        JsonObjectReader.prototype.getAsStringArray = function (name) {
                            return this.readObject[name];
                        };
                        JsonObjectReader.prototype.keys = function () {
                            var keysArr = [];
                            for (var key in this.readObject) {
                                keysArr.push(key);
                            }
                            return keysArr;
                        };
                        return JsonObjectReader;
                    })();
                    json.JsonObjectReader = JsonObjectReader;
                    var JsonString = (function () {
                        function JsonString() {
                        }
                        JsonString.encodeBuffer = function (buffer, chain) {
                            if (chain == null) {
                                return;
                            }
                            var i = 0;
                            while (i < chain.length) {
                                var ch = chain.charAt(i);
                                if (ch == '"') {
                                    buffer.append(JsonString.ESCAPE_CHAR);
                                    buffer.append('"');
                                }
                                else {
                                    if (ch == JsonString.ESCAPE_CHAR) {
                                        buffer.append(JsonString.ESCAPE_CHAR);
                                        buffer.append(JsonString.ESCAPE_CHAR);
                                    }
                                    else {
                                        if (ch == '\n') {
                                            buffer.append(JsonString.ESCAPE_CHAR);
                                            buffer.append('n');
                                        }
                                        else {
                                            if (ch == '\r') {
                                                buffer.append(JsonString.ESCAPE_CHAR);
                                                buffer.append('r');
                                            }
                                            else {
                                                if (ch == '\t') {
                                                    buffer.append(JsonString.ESCAPE_CHAR);
                                                    buffer.append('t');
                                                }
                                                else {
                                                    if (ch == '\u2028') {
                                                        buffer.append(JsonString.ESCAPE_CHAR);
                                                        buffer.append('u');
                                                        buffer.append('2');
                                                        buffer.append('0');
                                                        buffer.append('2');
                                                        buffer.append('8');
                                                    }
                                                    else {
                                                        if (ch == '\u2029') {
                                                            buffer.append(JsonString.ESCAPE_CHAR);
                                                            buffer.append('u');
                                                            buffer.append('2');
                                                            buffer.append('0');
                                                            buffer.append('2');
                                                            buffer.append('9');
                                                        }
                                                        else {
                                                            buffer.append(ch);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                i = i + 1;
                            }
                        };
                        JsonString.encode = function (p_chain) {
                            var sb = new java.lang.StringBuilder();
                            org.kevoree.modeling.format.json.JsonString.encodeBuffer(sb, p_chain);
                            return sb.toString();
                        };
                        JsonString.unescape = function (p_src) {
                            if (p_src == null) {
                                return null;
                            }
                            if (p_src.length == 0) {
                                return p_src;
                            }
                            var builder = null;
                            var i = 0;
                            while (i < p_src.length) {
                                var current = p_src.charAt(i);
                                if (current == JsonString.ESCAPE_CHAR) {
                                    if (builder == null) {
                                        builder = new java.lang.StringBuilder();
                                        builder.append(p_src.substring(0, i));
                                    }
                                    i++;
                                    var current2 = p_src.charAt(i);
                                    switch (current2) {
                                        case '"':
                                            builder.append('\"');
                                            break;
                                        case '\\':
                                            builder.append(current2);
                                            break;
                                        case '/':
                                            builder.append(current2);
                                            break;
                                        case 'b':
                                            builder.append('\b');
                                            break;
                                        case 'f':
                                            builder.append('\f');
                                            break;
                                        case 'n':
                                            builder.append('\n');
                                            break;
                                        case 'r':
                                            builder.append('\r');
                                            break;
                                        case 't':
                                            builder.append('\t');
                                            break;
                                        case '{':
                                            builder.append("\\{");
                                            break;
                                        case '}':
                                            builder.append("\\}");
                                            break;
                                        case '[':
                                            builder.append("\\[");
                                            break;
                                        case ']':
                                            builder.append("\\]");
                                            break;
                                        case ',':
                                            builder.append("\\,");
                                            break;
                                    }
                                }
                                else {
                                    if (builder != null) {
                                        builder = builder.append(current);
                                    }
                                }
                                i++;
                            }
                            if (builder != null) {
                                return builder.toString();
                            }
                            else {
                                return p_src;
                            }
                        };
                        JsonString.ESCAPE_CHAR = '\\';
                        return JsonString;
                    })();
                    json.JsonString = JsonString;
                })(json = format.json || (format.json = {}));
                var xmi;
                (function (xmi) {
                    var SerializationContext = (function () {
                        function SerializationContext() {
                            this.ignoreGeneratedID = false;
                            this.addressTable = new org.kevoree.modeling.memory.struct.map.LongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            this.elementsCount = new org.kevoree.modeling.memory.struct.map.StringHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            this.packageList = new java.util.ArrayList();
                        }
                        return SerializationContext;
                    })();
                    xmi.SerializationContext = SerializationContext;
                    var XMILoadingContext = (function () {
                        function XMILoadingContext() {
                            this.loadedRoots = null;
                            this.resolvers = new java.util.ArrayList();
                            this.map = new org.kevoree.modeling.memory.struct.map.StringHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            this.elementsCount = new org.kevoree.modeling.memory.struct.map.StringHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        }
                        return XMILoadingContext;
                    })();
                    xmi.XMILoadingContext = XMILoadingContext;
                    var XMIModelLoader = (function () {
                        function XMIModelLoader() {
                        }
                        XMIModelLoader.unescapeXml = function (src) {
                            var builder = null;
                            var i = 0;
                            while (i < src.length) {
                                var c = src.charAt(i);
                                if (c == '&') {
                                    if (builder == null) {
                                        builder = new java.lang.StringBuilder();
                                        builder.append(src.substring(0, i));
                                    }
                                    if (src.charAt(i + 1) == 'a') {
                                        if (src.charAt(i + 2) == 'm') {
                                            builder.append("&");
                                            i = i + 5;
                                        }
                                        else {
                                            if (src.charAt(i + 2) == 'p') {
                                                builder.append("'");
                                                i = i + 6;
                                            }
                                        }
                                    }
                                    else {
                                        if (src.charAt(i + 1) == 'q') {
                                            builder.append("\"");
                                            i = i + 6;
                                        }
                                        else {
                                            if (src.charAt(i + 1) == 'l') {
                                                builder.append("<");
                                                i = i + 4;
                                            }
                                            else {
                                                if (src.charAt(i + 1) == 'g') {
                                                    builder.append(">");
                                                    i = i + 4;
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (builder != null) {
                                        builder.append(c);
                                    }
                                    i++;
                                }
                            }
                            if (builder != null) {
                                return builder.toString();
                            }
                            else {
                                return src;
                            }
                        };
                        XMIModelLoader.load = function (manager, universe, time, str, callback) {
                            var parser = new org.kevoree.modeling.format.xmi.XmlParser(str);
                            if (!parser.hasNext()) {
                                callback(null);
                            }
                            else {
                                var context = new org.kevoree.modeling.format.xmi.XMILoadingContext();
                                context.successCallback = callback;
                                context.xmiReader = parser;
                                org.kevoree.modeling.format.xmi.XMIModelLoader.deserialize(manager, universe, time, context);
                            }
                        };
                        XMIModelLoader.deserialize = function (manager, universe, time, context) {
                            try {
                                var nsURI;
                                var reader = context.xmiReader;
                                while (reader.hasNext()) {
                                    var nextTag = reader.next();
                                    if (nextTag.equals(org.kevoree.modeling.format.xmi.XmlToken.START_TAG)) {
                                        var localName = reader.getLocalName();
                                        if (localName != null) {
                                            var ns = new org.kevoree.modeling.memory.struct.map.StringHashMap(reader.getAttributeCount(), org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                            for (var i = 0; i < reader.getAttributeCount() - 1; i++) {
                                                var attrLocalName = reader.getAttributeLocalName(i);
                                                var attrLocalValue = reader.getAttributeValue(i);
                                                if (attrLocalName.equals(XMIModelLoader.LOADER_XMI_NS_URI)) {
                                                    nsURI = attrLocalValue;
                                                }
                                                ns.put(attrLocalName, attrLocalValue);
                                            }
                                            var xsiType = reader.getTagPrefix();
                                            var realTypeName = ns.get(xsiType);
                                            if (realTypeName == null) {
                                                realTypeName = xsiType;
                                            }
                                            context.loadedRoots = org.kevoree.modeling.format.xmi.XMIModelLoader.loadObject(manager, universe, time, context, "/", xsiType + "." + localName);
                                        }
                                    }
                                }
                                for (var i = 0; i < context.resolvers.size(); i++) {
                                    context.resolvers.get(i).run();
                                }
                                manager.setRoot(context.loadedRoots, null);
                                context.successCallback(null);
                            }
                            catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e = $ex$;
                                    context.successCallback(e);
                                }
                            }
                        };
                        XMIModelLoader.callFactory = function (manager, universe, time, ctx, objectType) {
                            var modelElem = null;
                            if (objectType != null) {
                                modelElem = manager.model().createByName(objectType, universe, time);
                                if (modelElem == null) {
                                    var xsiType = null;
                                    for (var i = 0; i < (ctx.xmiReader.getAttributeCount() - 1); i++) {
                                        var localName = ctx.xmiReader.getAttributeLocalName(i);
                                        var xsi = ctx.xmiReader.getAttributePrefix(i);
                                        if (localName.equals(XMIModelLoader.LOADER_XMI_LOCAL_NAME) && xsi.equals(XMIModelLoader.LOADER_XMI_XSI)) {
                                            xsiType = ctx.xmiReader.getAttributeValue(i);
                                            break;
                                        }
                                    }
                                    if (xsiType != null) {
                                        var realTypeName = xsiType.substring(0, xsiType.lastIndexOf(":"));
                                        var realName = xsiType.substring(xsiType.lastIndexOf(":") + 1, xsiType.length);
                                        modelElem = manager.model().createByName(realTypeName + "." + realName, universe, time);
                                    }
                                }
                            }
                            else {
                                modelElem = manager.model().createByName(ctx.xmiReader.getLocalName(), universe, time);
                            }
                            return modelElem;
                        };
                        XMIModelLoader.loadObject = function (manager, universe, time, ctx, xmiAddress, objectType) {
                            var elementTagName = ctx.xmiReader.getLocalName();
                            var modelElem = org.kevoree.modeling.format.xmi.XMIModelLoader.callFactory(manager, universe, time, ctx, objectType);
                            if (modelElem == null) {
                                throw new java.lang.Exception("Could not create an object for local name " + elementTagName);
                            }
                            ctx.map.put(xmiAddress, modelElem);
                            for (var i = 0; i < ctx.xmiReader.getAttributeCount(); i++) {
                                var prefix = ctx.xmiReader.getAttributePrefix(i);
                                if (prefix == null || prefix.equals("")) {
                                    var attrName = ctx.xmiReader.getAttributeLocalName(i).trim();
                                    var valueAtt = ctx.xmiReader.getAttributeValue(i).trim();
                                    if (valueAtt != null) {
                                        var metaElement = modelElem.metaClass().metaByName(attrName);
                                        if (metaElement != null && metaElement.metaType().equals(org.kevoree.modeling.meta.MetaType.ATTRIBUTE)) {
                                            modelElem.set(metaElement, org.kevoree.modeling.format.xmi.XMIModelLoader.unescapeXml(valueAtt));
                                        }
                                        else {
                                            if (metaElement != null && metaElement instanceof org.kevoree.modeling.abs.AbstractMetaReference) {
                                                var referenceArray = valueAtt.split(" ");
                                                for (var j = 0; j < referenceArray.length; j++) {
                                                    var xmiRef = referenceArray[j];
                                                    var adjustedRef = (xmiRef.startsWith("#") ? xmiRef.substring(1) : xmiRef);
                                                    adjustedRef = adjustedRef.replace(".0", "");
                                                    var ref = ctx.map.get(adjustedRef);
                                                    if (ref != null) {
                                                        modelElem.mutate(org.kevoree.modeling.KActionType.ADD, metaElement, ref);
                                                    }
                                                    else {
                                                        ctx.resolvers.add(new org.kevoree.modeling.format.xmi.XMIResolveCommand(ctx, modelElem, org.kevoree.modeling.KActionType.ADD, attrName, adjustedRef));
                                                    }
                                                }
                                            }
                                            else {
                                            }
                                        }
                                    }
                                }
                            }
                            var done = false;
                            while (!done) {
                                if (ctx.xmiReader.hasNext()) {
                                    var tok = ctx.xmiReader.next();
                                    if (tok.equals(org.kevoree.modeling.format.xmi.XmlToken.START_TAG)) {
                                        var subElemName = ctx.xmiReader.getLocalName();
                                        var key = xmiAddress + "/@" + subElemName;
                                        var i = ctx.elementsCount.get(key);
                                        if (i == null) {
                                            i = 0;
                                            ctx.elementsCount.put(key, i);
                                        }
                                        var subElementId = xmiAddress + "/@" + subElemName + (i != 0 ? "." + i : "");
                                        var containedElement = org.kevoree.modeling.format.xmi.XMIModelLoader.loadObject(manager, universe, time, ctx, subElementId, subElemName);
                                        modelElem.mutate(org.kevoree.modeling.KActionType.ADD, modelElem.metaClass().metaByName(subElemName), containedElement);
                                        ctx.elementsCount.put(xmiAddress + "/@" + subElemName, i + 1);
                                    }
                                    else {
                                        if (tok.equals(org.kevoree.modeling.format.xmi.XmlToken.END_TAG)) {
                                            if (ctx.xmiReader.getLocalName().equals(elementTagName)) {
                                                done = true;
                                            }
                                        }
                                    }
                                }
                                else {
                                    done = true;
                                }
                            }
                            return modelElem;
                        };
                        XMIModelLoader.LOADER_XMI_LOCAL_NAME = "type";
                        XMIModelLoader.LOADER_XMI_XSI = "xsi";
                        XMIModelLoader.LOADER_XMI_NS_URI = "nsURI";
                        return XMIModelLoader;
                    })();
                    xmi.XMIModelLoader = XMIModelLoader;
                    var XMIModelSerializer = (function () {
                        function XMIModelSerializer() {
                        }
                        XMIModelSerializer.save = function (model, callback) {
                            callback(null);
                        };
                        return XMIModelSerializer;
                    })();
                    xmi.XMIModelSerializer = XMIModelSerializer;
                    var XMIResolveCommand = (function () {
                        function XMIResolveCommand(context, target, mutatorType, refName, ref) {
                            this.context = context;
                            this.target = target;
                            this.mutatorType = mutatorType;
                            this.refName = refName;
                            this.ref = ref;
                        }
                        XMIResolveCommand.prototype.run = function () {
                            var referencedElement = this.context.map.get(this.ref);
                            if (referencedElement != null) {
                                this.target.mutate(this.mutatorType, this.target.metaClass().metaByName(this.refName), referencedElement);
                                return;
                            }
                            referencedElement = this.context.map.get("/");
                            if (referencedElement != null) {
                                this.target.mutate(this.mutatorType, this.target.metaClass().metaByName(this.refName), referencedElement);
                                return;
                            }
                            throw new java.lang.Exception("KMF Load error : reference " + this.ref + " not found in map when trying to  " + this.mutatorType + " " + this.refName + "  on " + this.target.metaClass().metaName() + "(uuid:" + this.target.uuid() + ")");
                        };
                        return XMIResolveCommand;
                    })();
                    xmi.XMIResolveCommand = XMIResolveCommand;
                    var XmiFormat = (function () {
                        function XmiFormat(p_universe, p_time, p_manager) {
                            this._universe = p_universe;
                            this._time = p_time;
                            this._manager = p_manager;
                        }
                        XmiFormat.prototype.save = function (model, cb) {
                            org.kevoree.modeling.format.xmi.XMIModelSerializer.save(model, cb);
                        };
                        XmiFormat.prototype.saveRoot = function (cb) {
                            this._manager.getRoot(this._universe, this._time, function (root) {
                                if (root == null) {
                                    if (cb != null) {
                                        cb(null);
                                    }
                                }
                                else {
                                    org.kevoree.modeling.format.xmi.XMIModelSerializer.save(root, cb);
                                }
                            });
                        };
                        XmiFormat.prototype.load = function (payload, cb) {
                            org.kevoree.modeling.format.xmi.XMIModelLoader.load(this._manager, this._universe, this._time, payload, cb);
                        };
                        return XmiFormat;
                    })();
                    xmi.XmiFormat = XmiFormat;
                    var XmlParser = (function () {
                        function XmlParser(str) {
                            this.current = 0;
                            this.readSingleton = false;
                            this.attributesNames = new java.util.ArrayList();
                            this.attributesPrefixes = new java.util.ArrayList();
                            this.attributesValues = new java.util.ArrayList();
                            this.attributeName = new java.lang.StringBuilder();
                            this.attributeValue = new java.lang.StringBuilder();
                            this.payload = str;
                            this.currentChar = this.readChar();
                        }
                        XmlParser.prototype.getTagPrefix = function () {
                            return this.tagPrefix;
                        };
                        XmlParser.prototype.hasNext = function () {
                            this.read_lessThan();
                            return this.current < this.payload.length;
                        };
                        XmlParser.prototype.getLocalName = function () {
                            return this.tagName;
                        };
                        XmlParser.prototype.getAttributeCount = function () {
                            return this.attributesNames.size();
                        };
                        XmlParser.prototype.getAttributeLocalName = function (i) {
                            return this.attributesNames.get(i);
                        };
                        XmlParser.prototype.getAttributePrefix = function (i) {
                            return this.attributesPrefixes.get(i);
                        };
                        XmlParser.prototype.getAttributeValue = function (i) {
                            return this.attributesValues.get(i);
                        };
                        XmlParser.prototype.readChar = function () {
                            if (this.current < this.payload.length) {
                                var re = this.payload.charAt(this.current);
                                this.current++;
                                return re;
                            }
                            return '\0';
                        };
                        XmlParser.prototype.next = function () {
                            if (this.readSingleton) {
                                this.readSingleton = false;
                                return org.kevoree.modeling.format.xmi.XmlToken.END_TAG;
                            }
                            if (!this.hasNext()) {
                                return org.kevoree.modeling.format.xmi.XmlToken.END_DOCUMENT;
                            }
                            this.attributesNames.clear();
                            this.attributesPrefixes.clear();
                            this.attributesValues.clear();
                            this.read_lessThan();
                            this.currentChar = this.readChar();
                            if (this.currentChar == '?') {
                                this.currentChar = this.readChar();
                                this.read_xmlHeader();
                                return org.kevoree.modeling.format.xmi.XmlToken.XML_HEADER;
                            }
                            else {
                                if (this.currentChar == '!') {
                                    do {
                                        this.currentChar = this.readChar();
                                    } while (this.currentChar != '>');
                                    return org.kevoree.modeling.format.xmi.XmlToken.COMMENT;
                                }
                                else {
                                    if (this.currentChar == '/') {
                                        this.currentChar = this.readChar();
                                        this.read_closingTag();
                                        return org.kevoree.modeling.format.xmi.XmlToken.END_TAG;
                                    }
                                    else {
                                        this.read_openTag();
                                        if (this.currentChar == '/') {
                                            this.read_upperThan();
                                            this.readSingleton = true;
                                        }
                                        return org.kevoree.modeling.format.xmi.XmlToken.START_TAG;
                                    }
                                }
                            }
                        };
                        XmlParser.prototype.read_lessThan = function () {
                            while (this.currentChar != '<' && this.currentChar != '\0') {
                                this.currentChar = this.readChar();
                            }
                        };
                        XmlParser.prototype.read_upperThan = function () {
                            while (this.currentChar != '>') {
                                this.currentChar = this.readChar();
                            }
                        };
                        XmlParser.prototype.read_xmlHeader = function () {
                            this.read_tagName();
                            this.read_attributes();
                            this.read_upperThan();
                        };
                        XmlParser.prototype.read_closingTag = function () {
                            this.read_tagName();
                            this.read_upperThan();
                        };
                        XmlParser.prototype.read_openTag = function () {
                            this.read_tagName();
                            if (this.currentChar != '>' && this.currentChar != '/') {
                                this.read_attributes();
                            }
                        };
                        XmlParser.prototype.read_tagName = function () {
                            this.tagName = "" + this.currentChar;
                            this.tagPrefix = null;
                            this.currentChar = this.readChar();
                            while (this.currentChar != ' ' && this.currentChar != '>' && this.currentChar != '/') {
                                if (this.currentChar == ':') {
                                    this.tagPrefix = this.tagName;
                                    this.tagName = "";
                                }
                                else {
                                    this.tagName += this.currentChar;
                                }
                                this.currentChar = this.readChar();
                            }
                        };
                        XmlParser.prototype.read_attributes = function () {
                            var end_of_tag = false;
                            while (this.currentChar == ' ') {
                                this.currentChar = this.readChar();
                            }
                            while (!end_of_tag) {
                                while (this.currentChar != '=') {
                                    if (this.currentChar == ':') {
                                        this.attributePrefix = this.attributeName.toString();
                                        this.attributeName = new java.lang.StringBuilder();
                                    }
                                    else {
                                        this.attributeName.append(this.currentChar);
                                    }
                                    this.currentChar = this.readChar();
                                }
                                do {
                                    this.currentChar = this.readChar();
                                } while (this.currentChar != '"');
                                this.currentChar = this.readChar();
                                while (this.currentChar != '"') {
                                    this.attributeValue.append(this.currentChar);
                                    this.currentChar = this.readChar();
                                }
                                this.attributesNames.add(this.attributeName.toString());
                                this.attributesPrefixes.add(this.attributePrefix);
                                this.attributesValues.add(this.attributeValue.toString());
                                this.attributeName = new java.lang.StringBuilder();
                                this.attributePrefix = null;
                                this.attributeValue = new java.lang.StringBuilder();
                                do {
                                    this.currentChar = this.readChar();
                                    if (this.currentChar == '?' || this.currentChar == '/' || this.currentChar == '-' || this.currentChar == '>') {
                                        end_of_tag = true;
                                    }
                                } while (!end_of_tag && this.currentChar == ' ');
                            }
                        };
                        return XmlParser;
                    })();
                    xmi.XmlParser = XmlParser;
                    var XmlToken = (function () {
                        function XmlToken() {
                        }
                        XmlToken.prototype.equals = function (other) {
                            return this == other;
                        };
                        XmlToken.values = function () {
                            return XmlToken._XmlTokenVALUES;
                        };
                        XmlToken.XML_HEADER = new XmlToken();
                        XmlToken.END_DOCUMENT = new XmlToken();
                        XmlToken.START_TAG = new XmlToken();
                        XmlToken.END_TAG = new XmlToken();
                        XmlToken.COMMENT = new XmlToken();
                        XmlToken.SINGLETON_TAG = new XmlToken();
                        XmlToken._XmlTokenVALUES = [
                            XmlToken.XML_HEADER,
                            XmlToken.END_DOCUMENT,
                            XmlToken.START_TAG,
                            XmlToken.END_TAG,
                            XmlToken.COMMENT,
                            XmlToken.SINGLETON_TAG
                        ];
                        return XmlToken;
                    })();
                    xmi.XmlToken = XmlToken;
                })(xmi = format.xmi || (format.xmi = {}));
            })(format = modeling.format || (modeling.format = {}));
            var infer;
            (function (infer) {
                var AnalyticKInfer = (function (_super) {
                    __extends(AnalyticKInfer, _super);
                    function AnalyticKInfer(p_universe, p_time, p_uuid, p_metaClass, p_manager) {
                        _super.call(this, p_universe, p_time, p_uuid, p_metaClass, p_manager);
                    }
                    AnalyticKInfer.prototype.train = function (trainingSet, expectedResultSet, callback) {
                        var currentState = this.modifyState();
                        for (var i = 0; i < expectedResultSet.length; i++) {
                            var value = java.lang.Double.parseDouble(expectedResultSet[i].toString());
                            currentState.train(value);
                        }
                    };
                    AnalyticKInfer.prototype.infer = function (features) {
                        var currentState = this.readOnlyState();
                        return currentState.getAverage();
                    };
                    AnalyticKInfer.prototype.accuracy = function (testSet, expectedResultSet) {
                        return null;
                    };
                    AnalyticKInfer.prototype.clear = function () {
                        var currentState = this.modifyState();
                        currentState.clear();
                    };
                    AnalyticKInfer.prototype.createEmptyState = function () {
                        return new org.kevoree.modeling.infer.states.AnalyticKInferState();
                    };
                    return AnalyticKInfer;
                })(org.kevoree.modeling.abs.AbstractKObjectInfer);
                infer.AnalyticKInfer = AnalyticKInfer;
                var GaussianClassificationKInfer = (function (_super) {
                    __extends(GaussianClassificationKInfer, _super);
                    function GaussianClassificationKInfer(p_universe, p_time, p_uuid, p_metaClass, p_manager) {
                        _super.call(this, p_universe, p_time, p_uuid, p_metaClass, p_manager);
                        this.alpha = 0.05;
                    }
                    GaussianClassificationKInfer.prototype.getAlpha = function () {
                        return this.alpha;
                    };
                    GaussianClassificationKInfer.prototype.setAlpha = function (alpha) {
                        this.alpha = alpha;
                    };
                    GaussianClassificationKInfer.prototype.train = function (trainingSet, expectedResultSet, callback) {
                        var currentState = this.modifyState();
                        var featuresize = trainingSet[0].length;
                        var features = new Array();
                        var results = new Array();
                        for (var i = 0; i < trainingSet.length; i++) {
                            features[i] = new Array();
                            for (var j = 0; j < featuresize; j++) {
                                features[i][j] = trainingSet[i][j];
                            }
                            results[i] = expectedResultSet[i];
                            currentState.train(features[i], results[i], this.alpha);
                        }
                    };
                    GaussianClassificationKInfer.prototype.infer = function (features) {
                        var currentState = this.readOnlyState();
                        var ft = new Array();
                        for (var i = 0; i < features.length; i++) {
                            ft[i] = features[i];
                        }
                        return currentState.infer(ft);
                    };
                    GaussianClassificationKInfer.prototype.accuracy = function (testSet, expectedResultSet) {
                        return null;
                    };
                    GaussianClassificationKInfer.prototype.clear = function () {
                    };
                    GaussianClassificationKInfer.prototype.createEmptyState = function () {
                        return null;
                    };
                    return GaussianClassificationKInfer;
                })(org.kevoree.modeling.abs.AbstractKObjectInfer);
                infer.GaussianClassificationKInfer = GaussianClassificationKInfer;
                var LinearRegressionKInfer = (function (_super) {
                    __extends(LinearRegressionKInfer, _super);
                    function LinearRegressionKInfer(p_universe, p_time, p_uuid, p_metaClass, p_manager) {
                        _super.call(this, p_universe, p_time, p_uuid, p_metaClass, p_manager);
                        this.alpha = 0.0001;
                        this.iterations = 100;
                    }
                    LinearRegressionKInfer.prototype.getAlpha = function () {
                        return this.alpha;
                    };
                    LinearRegressionKInfer.prototype.setAlpha = function (alpha) {
                        this.alpha = alpha;
                    };
                    LinearRegressionKInfer.prototype.getIterations = function () {
                        return this.iterations;
                    };
                    LinearRegressionKInfer.prototype.setIterations = function (iterations) {
                        this.iterations = iterations;
                    };
                    LinearRegressionKInfer.prototype.calculate = function (weights, features) {
                        var result = 0;
                        for (var i = 0; i < features.length; i++) {
                            result += weights[i] * features[i];
                        }
                        result += weights[features.length];
                        return result;
                    };
                    LinearRegressionKInfer.prototype.train = function (trainingSet, expectedResultSet, callback) {
                        var currentState = this.modifyState();
                        var weights = currentState.getWeights();
                        var featuresize = trainingSet[0].length;
                        if (weights == null) {
                            weights = new Array();
                        }
                        var features = new Array();
                        var results = new Array();
                        for (var i = 0; i < trainingSet.length; i++) {
                            features[i] = new Array();
                            for (var j = 0; j < featuresize; j++) {
                                features[i][j] = trainingSet[i][j];
                            }
                            results[i] = expectedResultSet[i];
                        }
                        for (var j = 0; j < this.iterations; j++) {
                            for (var i = 0; i < trainingSet.length; i++) {
                                var h = this.calculate(weights, features[i]);
                                var err = -this.alpha * (h - results[i]);
                                for (var k = 0; k < featuresize; k++) {
                                    weights[k] = weights[k] + err * features[i][k];
                                }
                                weights[featuresize] = weights[featuresize] + err;
                            }
                        }
                        currentState.setWeights(weights);
                    };
                    LinearRegressionKInfer.prototype.infer = function (features) {
                        var currentState = this.readOnlyState();
                        var weights = currentState.getWeights();
                        var ft = new Array();
                        for (var i = 0; i < features.length; i++) {
                            ft[i] = features[i];
                        }
                        return this.calculate(weights, ft);
                    };
                    LinearRegressionKInfer.prototype.accuracy = function (testSet, expectedResultSet) {
                        return null;
                    };
                    LinearRegressionKInfer.prototype.clear = function () {
                        var currentState = this.modifyState();
                        currentState.setWeights(null);
                    };
                    LinearRegressionKInfer.prototype.createEmptyState = function () {
                        return new org.kevoree.modeling.infer.states.DoubleArrayKInferState();
                    };
                    return LinearRegressionKInfer;
                })(org.kevoree.modeling.abs.AbstractKObjectInfer);
                infer.LinearRegressionKInfer = LinearRegressionKInfer;
                var PerceptronClassificationKInfer = (function (_super) {
                    __extends(PerceptronClassificationKInfer, _super);
                    function PerceptronClassificationKInfer(p_universe, p_time, p_uuid, p_metaClass, p_manager) {
                        _super.call(this, p_universe, p_time, p_uuid, p_metaClass, p_manager);
                        this.alpha = 0.001;
                        this.iterations = 100;
                    }
                    PerceptronClassificationKInfer.prototype.getAlpha = function () {
                        return this.alpha;
                    };
                    PerceptronClassificationKInfer.prototype.setAlpha = function (alpha) {
                        this.alpha = alpha;
                    };
                    PerceptronClassificationKInfer.prototype.getIterations = function () {
                        return this.iterations;
                    };
                    PerceptronClassificationKInfer.prototype.setIterations = function (iterations) {
                        this.iterations = iterations;
                    };
                    PerceptronClassificationKInfer.prototype.calculate = function (weights, features) {
                        var res = 0;
                        for (var i = 0; i < features.length; i++) {
                            res = res + weights[i] * (features[i]);
                        }
                        res = res + weights[features.length];
                        if (res >= 0) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    };
                    PerceptronClassificationKInfer.prototype.train = function (trainingSet, expectedResultSet, callback) {
                        var currentState = this.modifyState();
                        var weights = currentState.getWeights();
                        var featuresize = trainingSet[0].length;
                        if (weights == null) {
                            weights = new Array();
                        }
                        var features = new Array();
                        var results = new Array();
                        for (var i = 0; i < trainingSet.length; i++) {
                            features[i] = new Array();
                            for (var j = 0; j < featuresize; j++) {
                                features[i][j] = trainingSet[i][j];
                            }
                            results[i] = expectedResultSet[i];
                            if (results[i] == 0) {
                                results[i] = -1;
                            }
                        }
                        for (var j = 0; j < this.iterations; j++) {
                            for (var i = 0; i < trainingSet.length; i++) {
                                var h = this.calculate(weights, features[i]);
                                if (h == 0) {
                                    h = -1;
                                }
                                if (h * results[i] <= 0) {
                                    for (var k = 0; k < featuresize; k++) {
                                        weights[k] = weights[k] + this.alpha * (results[i] * features[i][k]);
                                    }
                                    weights[featuresize] = weights[featuresize] + this.alpha * (results[i]);
                                }
                            }
                        }
                        currentState.setWeights(weights);
                    };
                    PerceptronClassificationKInfer.prototype.infer = function (features) {
                        var currentState = this.readOnlyState();
                        var weights = currentState.getWeights();
                        var ft = new Array();
                        for (var i = 0; i < features.length; i++) {
                            ft[i] = features[i];
                        }
                        return this.calculate(weights, ft);
                    };
                    PerceptronClassificationKInfer.prototype.accuracy = function (testSet, expectedResultSet) {
                        return null;
                    };
                    PerceptronClassificationKInfer.prototype.clear = function () {
                        var currentState = this.modifyState();
                        currentState.setWeights(null);
                    };
                    PerceptronClassificationKInfer.prototype.createEmptyState = function () {
                        return new org.kevoree.modeling.infer.states.DoubleArrayKInferState();
                    };
                    return PerceptronClassificationKInfer;
                })(org.kevoree.modeling.abs.AbstractKObjectInfer);
                infer.PerceptronClassificationKInfer = PerceptronClassificationKInfer;
                var PolynomialOfflineKInfer = (function (_super) {
                    __extends(PolynomialOfflineKInfer, _super);
                    function PolynomialOfflineKInfer(p_universe, p_time, p_uuid, p_metaClass, p_manager) {
                        _super.call(this, p_universe, p_time, p_uuid, p_metaClass, p_manager);
                        this.maxDegree = 20;
                        this.toleratedErr = 0.01;
                    }
                    PolynomialOfflineKInfer.prototype.getToleratedErr = function () {
                        return this.toleratedErr;
                    };
                    PolynomialOfflineKInfer.prototype.setToleratedErr = function (toleratedErr) {
                        this.toleratedErr = toleratedErr;
                    };
                    PolynomialOfflineKInfer.prototype.getMaxDegree = function () {
                        return this.maxDegree;
                    };
                    PolynomialOfflineKInfer.prototype.setMaxDegree = function (maxDegree) {
                        this.maxDegree = maxDegree;
                    };
                    PolynomialOfflineKInfer.prototype.calculateLong = function (time, weights, timeOrigin, unit) {
                        var t = (time - timeOrigin) / unit;
                        return this.calculate(weights, t);
                    };
                    PolynomialOfflineKInfer.prototype.calculate = function (weights, t) {
                        var result = 0;
                        var power = 1;
                        for (var j = 0; j < weights.length; j++) {
                            result += weights[j] * power;
                            power = power * t;
                        }
                        return result;
                    };
                    PolynomialOfflineKInfer.prototype.train = function (trainingSet, expectedResultSet, callback) {
                        var currentState = this.modifyState();
                        var weights;
                        var featuresize = trainingSet[0].length;
                        var times = new Array();
                        var results = new Array();
                        for (var i = 0; i < trainingSet.length; i++) {
                            times[i] = trainingSet[i][0];
                            results[i] = expectedResultSet[i];
                        }
                        if (times.length == 0) {
                            return;
                        }
                        if (times.length == 1) {
                            weights = new Array();
                            weights[0] = results[0];
                            currentState.setWeights(weights);
                            return;
                        }
                        var maxcurdeg = Math.min(times.length, this.maxDegree);
                        var timeOrigin = times[0];
                        var unit = times[1] - times[0];
                        var normalizedTimes = new Array();
                        for (var i = 0; i < times.length; i++) {
                            normalizedTimes[i] = (times[i] - times[0]) / unit;
                        }
                        for (var deg = 0; deg < maxcurdeg; deg++) {
                            var pf = new org.kevoree.modeling.extrapolation.polynomial.util.PolynomialFitEjml(deg);
                            pf.fit(normalizedTimes, results);
                            if (org.kevoree.modeling.infer.states.PolynomialKInferState.maxError(pf.getCoef(), normalizedTimes, results) <= this.toleratedErr) {
                                currentState.setUnit(unit);
                                currentState.setTimeOrigin(timeOrigin);
                                currentState.setWeights(pf.getCoef());
                                return;
                            }
                        }
                    };
                    PolynomialOfflineKInfer.prototype.infer = function (features) {
                        var currentState = this.readOnlyState();
                        var time = features[0];
                        return currentState.infer(time);
                    };
                    PolynomialOfflineKInfer.prototype.accuracy = function (testSet, expectedResultSet) {
                        return null;
                    };
                    PolynomialOfflineKInfer.prototype.clear = function () {
                        var currentState = this.modifyState();
                        currentState.setWeights(null);
                    };
                    PolynomialOfflineKInfer.prototype.createEmptyState = function () {
                        return new org.kevoree.modeling.infer.states.DoubleArrayKInferState();
                    };
                    return PolynomialOfflineKInfer;
                })(org.kevoree.modeling.abs.AbstractKObjectInfer);
                infer.PolynomialOfflineKInfer = PolynomialOfflineKInfer;
                var PolynomialOnlineKInfer = (function (_super) {
                    __extends(PolynomialOnlineKInfer, _super);
                    function PolynomialOnlineKInfer(p_universe, p_time, p_uuid, p_metaClass, p_manager) {
                        _super.call(this, p_universe, p_time, p_uuid, p_metaClass, p_manager);
                        this.maxDegree = 20;
                        this.toleratedErr = 0.01;
                    }
                    PolynomialOnlineKInfer.prototype.getToleratedErr = function () {
                        return this.toleratedErr;
                    };
                    PolynomialOnlineKInfer.prototype.setToleratedErr = function (toleratedErr) {
                        this.toleratedErr = toleratedErr;
                    };
                    PolynomialOnlineKInfer.prototype.getMaxDegree = function () {
                        return this.maxDegree;
                    };
                    PolynomialOnlineKInfer.prototype.setMaxDegree = function (maxDegree) {
                        this.maxDegree = maxDegree;
                    };
                    PolynomialOnlineKInfer.prototype.calculateLong = function (time, weights, timeOrigin, unit) {
                        var t = (time - timeOrigin) / unit;
                        return this.calculate(weights, t);
                    };
                    PolynomialOnlineKInfer.prototype.calculate = function (weights, t) {
                        var result = 0;
                        var power = 1;
                        for (var j = 0; j < weights.length; j++) {
                            result += weights[j] * power;
                            power = power * t;
                        }
                        return result;
                    };
                    PolynomialOnlineKInfer.prototype.train = function (trainingSet, expectedResultSet, callback) {
                        var currentState = this.modifyState();
                        var weights;
                        var featuresize = trainingSet[0].length;
                        var times = new Array();
                        var results = new Array();
                        for (var i = 0; i < trainingSet.length; i++) {
                            times[i] = trainingSet[i][0];
                            results[i] = expectedResultSet[i];
                        }
                        if (times.length == 0) {
                            return;
                        }
                        if (times.length == 1) {
                            weights = new Array();
                            weights[0] = results[0];
                            currentState.setWeights(weights);
                            return;
                        }
                        var maxcurdeg = Math.min(times.length, this.maxDegree);
                        var timeOrigin = times[0];
                        var unit = times[1] - times[0];
                        var normalizedTimes = new Array();
                        for (var i = 0; i < times.length; i++) {
                            normalizedTimes[i] = (times[i] - times[0]) / unit;
                        }
                        for (var deg = 0; deg < maxcurdeg; deg++) {
                            var pf = new org.kevoree.modeling.extrapolation.polynomial.util.PolynomialFitEjml(deg);
                            pf.fit(normalizedTimes, results);
                            if (org.kevoree.modeling.infer.states.PolynomialKInferState.maxError(pf.getCoef(), normalizedTimes, results) <= this.toleratedErr) {
                                currentState.setUnit(unit);
                                currentState.setTimeOrigin(timeOrigin);
                                currentState.setWeights(pf.getCoef());
                                return;
                            }
                        }
                    };
                    PolynomialOnlineKInfer.prototype.infer = function (features) {
                        var currentState = this.readOnlyState();
                        var time = features[0];
                        return currentState.infer(time);
                    };
                    PolynomialOnlineKInfer.prototype.accuracy = function (testSet, expectedResultSet) {
                        return null;
                    };
                    PolynomialOnlineKInfer.prototype.clear = function () {
                        var currentState = this.modifyState();
                        currentState.setWeights(null);
                    };
                    PolynomialOnlineKInfer.prototype.createEmptyState = function () {
                        return new org.kevoree.modeling.infer.states.DoubleArrayKInferState();
                    };
                    return PolynomialOnlineKInfer;
                })(org.kevoree.modeling.abs.AbstractKObjectInfer);
                infer.PolynomialOnlineKInfer = PolynomialOnlineKInfer;
                var WinnowClassificationKInfer = (function (_super) {
                    __extends(WinnowClassificationKInfer, _super);
                    function WinnowClassificationKInfer(p_universe, p_time, p_uuid, p_metaClass, p_manager) {
                        _super.call(this, p_universe, p_time, p_uuid, p_metaClass, p_manager);
                        this.alpha = 2;
                        this.beta = 2;
                    }
                    WinnowClassificationKInfer.prototype.getAlpha = function () {
                        return this.alpha;
                    };
                    WinnowClassificationKInfer.prototype.setAlpha = function (alpha) {
                        this.alpha = alpha;
                    };
                    WinnowClassificationKInfer.prototype.getBeta = function () {
                        return this.beta;
                    };
                    WinnowClassificationKInfer.prototype.setBeta = function (beta) {
                        this.beta = beta;
                    };
                    WinnowClassificationKInfer.prototype.calculate = function (weights, features) {
                        var result = 0;
                        for (var i = 0; i < features.length; i++) {
                            result += weights[i] * features[i];
                        }
                        if (result >= features.length) {
                            return 1.0;
                        }
                        else {
                            return 0.0;
                        }
                    };
                    WinnowClassificationKInfer.prototype.train = function (trainingSet, expectedResultSet, callback) {
                        var currentState = this.modifyState();
                        var weights = currentState.getWeights();
                        var featuresize = trainingSet[0].length;
                        if (weights == null) {
                            weights = new Array();
                            for (var i = 0; i < weights.length; i++) {
                                weights[i] = 2;
                            }
                        }
                        var features = new Array();
                        var results = new Array();
                        for (var i = 0; i < trainingSet.length; i++) {
                            features[i] = new Array();
                            for (var j = 0; j < featuresize; j++) {
                                features[i][j] = trainingSet[i][j];
                            }
                            results[i] = expectedResultSet[i];
                        }
                        for (var i = 0; i < trainingSet.length; i++) {
                            if (this.calculate(weights, features[i]) == results[i]) {
                                continue;
                            }
                            if (results[i] == 0) {
                                for (var j = 0; j < features[i].length; j++) {
                                    if (features[i][j] != 0) {
                                        weights[j] = weights[j] / this.beta;
                                    }
                                }
                            }
                            else {
                                for (var j = 0; i < features[i].length; j++) {
                                    if (features[i][j] != 0) {
                                        weights[j] = weights[j] * this.alpha;
                                    }
                                }
                            }
                        }
                        currentState.setWeights(weights);
                    };
                    WinnowClassificationKInfer.prototype.infer = function (features) {
                        var currentState = this.readOnlyState();
                        var weights = currentState.getWeights();
                        var ft = new Array();
                        for (var i = 0; i < features.length; i++) {
                            ft[i] = features[i];
                        }
                        return this.calculate(weights, ft);
                    };
                    WinnowClassificationKInfer.prototype.accuracy = function (testSet, expectedResultSet) {
                        return null;
                    };
                    WinnowClassificationKInfer.prototype.clear = function () {
                        var currentState = this.modifyState();
                        currentState.setWeights(null);
                    };
                    WinnowClassificationKInfer.prototype.createEmptyState = function () {
                        return new org.kevoree.modeling.infer.states.DoubleArrayKInferState();
                    };
                    return WinnowClassificationKInfer;
                })(org.kevoree.modeling.abs.AbstractKObjectInfer);
                infer.WinnowClassificationKInfer = WinnowClassificationKInfer;
                var states;
                (function (states) {
                    var AnalyticKInferState = (function (_super) {
                        __extends(AnalyticKInferState, _super);
                        function AnalyticKInferState() {
                            _super.apply(this, arguments);
                            this._isDirty = false;
                            this.sumSquares = 0;
                            this.sum = 0;
                            this.nb = 0;
                        }
                        AnalyticKInferState.prototype.getSumSquares = function () {
                            return this.sumSquares;
                        };
                        AnalyticKInferState.prototype.setSumSquares = function (sumSquares) {
                            this.sumSquares = sumSquares;
                        };
                        AnalyticKInferState.prototype.getMin = function () {
                            return this.min;
                        };
                        AnalyticKInferState.prototype.setMin = function (min) {
                            this._isDirty = true;
                            this.min = min;
                        };
                        AnalyticKInferState.prototype.getMax = function () {
                            return this.max;
                        };
                        AnalyticKInferState.prototype.setMax = function (max) {
                            this._isDirty = true;
                            this.max = max;
                        };
                        AnalyticKInferState.prototype.getNb = function () {
                            return this.nb;
                        };
                        AnalyticKInferState.prototype.setNb = function (nb) {
                            this._isDirty = true;
                            this.nb = nb;
                        };
                        AnalyticKInferState.prototype.getSum = function () {
                            return this.sum;
                        };
                        AnalyticKInferState.prototype.setSum = function (sum) {
                            this._isDirty = true;
                            this.sum = sum;
                        };
                        AnalyticKInferState.prototype.getAverage = function () {
                            if (this.nb != 0) {
                                return this.sum / this.nb;
                            }
                            else {
                                return null;
                            }
                        };
                        AnalyticKInferState.prototype.train = function (value) {
                            if (this.nb == 0) {
                                this.max = value;
                                this.min = value;
                            }
                            else {
                                if (value < this.min) {
                                    this.min = value;
                                }
                                if (value > this.max) {
                                    this.max = value;
                                }
                            }
                            this.sum += value;
                            this.sumSquares += value * value;
                            this.nb++;
                            this._isDirty = true;
                        };
                        AnalyticKInferState.prototype.getVariance = function () {
                            if (this.nb != 0) {
                                var avg = this.sum / this.nb;
                                var newvar = this.sumSquares / this.nb - avg * avg;
                                return newvar;
                            }
                            else {
                                return null;
                            }
                        };
                        AnalyticKInferState.prototype.clear = function () {
                            this.nb = 0;
                            this.sum = 0;
                            this.sumSquares = 0;
                            this._isDirty = true;
                        };
                        AnalyticKInferState.prototype.save = function () {
                            return this.sum + "/" + this.nb + "/" + this.min + "/" + this.max + "/" + this.sumSquares;
                        };
                        AnalyticKInferState.prototype.load = function (payload) {
                            try {
                                var previousState = payload.split("/");
                                this.sum = java.lang.Double.parseDouble(previousState[0]);
                                this.nb = java.lang.Integer.parseInt(previousState[1]);
                                this.min = java.lang.Double.parseDouble(previousState[2]);
                                this.max = java.lang.Double.parseDouble(previousState[3]);
                                this.sumSquares = java.lang.Double.parseDouble(previousState[4]);
                            }
                            catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e = $ex$;
                                    this.sum = 0;
                                    this.nb = 0;
                                }
                            }
                            this._isDirty = false;
                        };
                        AnalyticKInferState.prototype.isDirty = function () {
                            return this._isDirty;
                        };
                        AnalyticKInferState.prototype.cloneState = function () {
                            var cloned = new org.kevoree.modeling.infer.states.AnalyticKInferState();
                            cloned.setSumSquares(this.getSumSquares());
                            cloned.setNb(this.getNb());
                            cloned.setSum(this.getSum());
                            cloned.setMax(this.getMax());
                            cloned.setMin(this.getMin());
                            return cloned;
                        };
                        return AnalyticKInferState;
                    })(org.kevoree.modeling.KInferState);
                    states.AnalyticKInferState = AnalyticKInferState;
                    var BayesianClassificationState = (function (_super) {
                        __extends(BayesianClassificationState, _super);
                        function BayesianClassificationState() {
                            _super.apply(this, arguments);
                        }
                        BayesianClassificationState.prototype.initialize = function (metaFeatures, MetaClassification) {
                            this.numOfFeatures = metaFeatures.length;
                            this.numOfClasses = 0;
                            this.states = new Array(new Array());
                            this.classStats = new org.kevoree.modeling.infer.states.Bayesian.EnumSubstate();
                            this.classStats.initialize(this.numOfClasses);
                            for (var i = 0; i < this.numOfFeatures; i++) {
                            }
                        };
                        BayesianClassificationState.prototype.predict = function (features) {
                            var temp;
                            var prediction = -1;
                            var max = 0;
                            for (var i = 0; i < this.numOfClasses; i++) {
                                temp = this.classStats.calculateProbability(i);
                                for (var j = 0; j < this.numOfFeatures; j++) {
                                    temp = temp * this.states[i][j].calculateProbability(features[j]);
                                }
                                if (temp >= max) {
                                    max = temp;
                                    prediction = i;
                                }
                            }
                            return prediction;
                        };
                        BayesianClassificationState.prototype.train = function (features, classNum) {
                            for (var i = 0; i < this.numOfFeatures; i++) {
                                this.states[classNum][i].train(features[i]);
                                this.states[this.numOfClasses][i].train(features[i]);
                            }
                            this.classStats.train(classNum);
                        };
                        BayesianClassificationState.prototype.save = function () {
                            var sb = new java.lang.StringBuilder();
                            sb.append(this.numOfClasses + BayesianClassificationState.interStateSep);
                            sb.append(this.numOfFeatures + BayesianClassificationState.interStateSep);
                            for (var i = 0; i < this.numOfClasses + 1; i++) {
                                for (var j = 0; j < this.numOfFeatures; j++) {
                                    sb.append(this.states[i][j].save(BayesianClassificationState.stateSep));
                                    sb.append(BayesianClassificationState.interStateSep);
                                }
                            }
                            sb.append(this.classStats.save(BayesianClassificationState.stateSep));
                            return sb.toString();
                        };
                        BayesianClassificationState.prototype.load = function (payload) {
                            var st = payload.split(BayesianClassificationState.interStateSep);
                            this.numOfClasses = java.lang.Integer.parseInt(st[0]);
                            this.numOfFeatures = java.lang.Integer.parseInt(st[1]);
                            this.states = new Array(new Array());
                            var counter = 2;
                            for (var i = 0; i < this.numOfClasses + 1; i++) {
                                for (var j = 0; j < this.numOfFeatures; j++) {
                                    var s = st[counter].split(BayesianClassificationState.stateSep)[0];
                                    if (s.equals("EnumSubstate")) {
                                        this.states[i][j] = new org.kevoree.modeling.infer.states.Bayesian.EnumSubstate();
                                    }
                                    else {
                                        if (s.equals("GaussianSubState")) {
                                            this.states[i][j] = new org.kevoree.modeling.infer.states.Bayesian.GaussianSubState();
                                        }
                                    }
                                    s = st[counter].substring(s.length + 1);
                                    this.states[i][j].load(s, BayesianClassificationState.stateSep);
                                    counter++;
                                }
                            }
                            var s = st[counter].split(BayesianClassificationState.stateSep)[0];
                            s = st[counter].substring(s.length + 1);
                            this.classStats = new org.kevoree.modeling.infer.states.Bayesian.EnumSubstate();
                            this.classStats.load(s, BayesianClassificationState.stateSep);
                        };
                        BayesianClassificationState.prototype.isDirty = function () {
                            return false;
                        };
                        BayesianClassificationState.prototype.cloneState = function () {
                            return null;
                        };
                        BayesianClassificationState.stateSep = "/";
                        BayesianClassificationState.interStateSep = "|";
                        return BayesianClassificationState;
                    })(org.kevoree.modeling.KInferState);
                    states.BayesianClassificationState = BayesianClassificationState;
                    var DoubleArrayKInferState = (function (_super) {
                        __extends(DoubleArrayKInferState, _super);
                        function DoubleArrayKInferState() {
                            _super.apply(this, arguments);
                            this._isDirty = false;
                        }
                        DoubleArrayKInferState.prototype.save = function () {
                            var s = "";
                            var sb = new java.lang.StringBuilder();
                            if (this.weights != null) {
                                for (var i = 0; i < this.weights.length; i++) {
                                    sb.append(this.weights[i] + "/");
                                }
                                s = sb.toString();
                            }
                            return s;
                        };
                        DoubleArrayKInferState.prototype.load = function (payload) {
                            try {
                                var previousState = payload.split("/");
                                if (previousState.length > 0) {
                                    this.weights = new Array();
                                    for (var i = 0; i < previousState.length; i++) {
                                        this.weights[i] = java.lang.Double.parseDouble(previousState[i]);
                                    }
                                }
                            }
                            catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e = $ex$;
                                }
                            }
                            this._isDirty = false;
                        };
                        DoubleArrayKInferState.prototype.isDirty = function () {
                            return this._isDirty;
                        };
                        DoubleArrayKInferState.prototype.set_isDirty = function (value) {
                            this._isDirty = value;
                        };
                        DoubleArrayKInferState.prototype.cloneState = function () {
                            var cloned = new org.kevoree.modeling.infer.states.DoubleArrayKInferState();
                            var clonearray = new Array();
                            for (var i = 0; i < this.weights.length; i++) {
                                clonearray[i] = this.weights[i];
                            }
                            cloned.setWeights(clonearray);
                            return cloned;
                        };
                        DoubleArrayKInferState.prototype.getWeights = function () {
                            return this.weights;
                        };
                        DoubleArrayKInferState.prototype.setWeights = function (weights) {
                            this.weights = weights;
                            this._isDirty = true;
                        };
                        return DoubleArrayKInferState;
                    })(org.kevoree.modeling.KInferState);
                    states.DoubleArrayKInferState = DoubleArrayKInferState;
                    var GaussianArrayKInferState = (function (_super) {
                        __extends(GaussianArrayKInferState, _super);
                        function GaussianArrayKInferState() {
                            _super.apply(this, arguments);
                            this._isDirty = false;
                            this.sumSquares = null;
                            this.sum = null;
                            this.epsilon = 0;
                            this.nb = 0;
                        }
                        GaussianArrayKInferState.prototype.getSumSquares = function () {
                            return this.sumSquares;
                        };
                        GaussianArrayKInferState.prototype.setSumSquares = function (sumSquares) {
                            this.sumSquares = sumSquares;
                        };
                        GaussianArrayKInferState.prototype.getNb = function () {
                            return this.nb;
                        };
                        GaussianArrayKInferState.prototype.setNb = function (nb) {
                            this._isDirty = true;
                            this.nb = nb;
                        };
                        GaussianArrayKInferState.prototype.getSum = function () {
                            return this.sum;
                        };
                        GaussianArrayKInferState.prototype.setSum = function (sum) {
                            this._isDirty = true;
                            this.sum = sum;
                        };
                        GaussianArrayKInferState.prototype.calculateProbability = function (features) {
                            var size = this.sum.length;
                            var avg = new Array();
                            var variances = new Array();
                            var p = 1;
                            for (var i = 0; i < size; i++) {
                                avg[i] = this.sum[i] / this.nb;
                                variances[i] = this.sumSquares[i] / this.nb - avg[i] * avg[i];
                                p = p * (1 / Math.sqrt(2 * Math.PI * variances[i])) * Math.exp(-((features[i] - avg[i]) * (features[i] - avg[i])) / (2 * variances[i]));
                            }
                            return p;
                        };
                        GaussianArrayKInferState.prototype.infer = function (features) {
                            return (this.calculateProbability(features) <= this.epsilon);
                        };
                        GaussianArrayKInferState.prototype.getAverage = function () {
                            if (this.nb != 0) {
                                var size = this.sum.length;
                                var avg = new Array();
                                for (var i = 0; i < size; i++) {
                                    avg[i] = this.sum[i] / this.nb;
                                }
                                return avg;
                            }
                            else {
                                return null;
                            }
                        };
                        GaussianArrayKInferState.prototype.train = function (features, result, alpha) {
                            var size = features.length;
                            if (this.nb == 0) {
                                this.sumSquares = new Array();
                                this.sum = new Array();
                            }
                            for (var i = 0; i < size; i++) {
                                this.sum[i] += features[i];
                                this.sumSquares[i] += features[i] * features[i];
                            }
                            this.nb++;
                            var proba = this.calculateProbability(features);
                            var diff = proba - this.epsilon;
                            if ((proba < this.epsilon && result == false) || (proba > this.epsilon && result == true)) {
                                this.epsilon = this.epsilon + alpha * diff;
                            }
                            this._isDirty = true;
                        };
                        GaussianArrayKInferState.prototype.getVariance = function () {
                            if (this.nb != 0) {
                                var size = this.sum.length;
                                var avg = new Array();
                                var newvar = new Array();
                                for (var i = 0; i < size; i++) {
                                    avg[i] = this.sum[i] / this.nb;
                                    newvar[i] = this.sumSquares[i] / this.nb - avg[i] * avg[i];
                                }
                                return newvar;
                            }
                            else {
                                return null;
                            }
                        };
                        GaussianArrayKInferState.prototype.clear = function () {
                            this.nb = 0;
                            this.sum = null;
                            this.sumSquares = null;
                            this._isDirty = true;
                        };
                        GaussianArrayKInferState.prototype.save = function () {
                            var sb = new java.lang.StringBuilder();
                            sb.append(this.nb + "/");
                            sb.append(this.epsilon + "/");
                            var size = this.sumSquares.length;
                            for (var i = 0; i < size; i++) {
                                sb.append(this.sum[i] + "/");
                            }
                            for (var i = 0; i < size; i++) {
                                sb.append(this.sumSquares[i] + "/");
                            }
                            return sb.toString();
                        };
                        GaussianArrayKInferState.prototype.load = function (payload) {
                            try {
                                var previousState = payload.split("/");
                                this.nb = java.lang.Integer.parseInt(previousState[0]);
                                this.epsilon = java.lang.Double.parseDouble(previousState[1]);
                                var size = (previousState.length - 2) / 2;
                                this.sum = new Array();
                                this.sumSquares = new Array();
                                for (var i = 0; i < size; i++) {
                                    this.sum[i] = java.lang.Double.parseDouble(previousState[i + 2]);
                                }
                                for (var i = 0; i < size; i++) {
                                    this.sumSquares[i] = java.lang.Double.parseDouble(previousState[i + 2 + size]);
                                }
                            }
                            catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e = $ex$;
                                    this.sum = null;
                                    this.sumSquares = null;
                                    this.nb = 0;
                                }
                            }
                            this._isDirty = false;
                        };
                        GaussianArrayKInferState.prototype.isDirty = function () {
                            return this._isDirty;
                        };
                        GaussianArrayKInferState.prototype.cloneState = function () {
                            var cloned = new org.kevoree.modeling.infer.states.GaussianArrayKInferState();
                            cloned.setNb(this.getNb());
                            if (this.nb != 0) {
                                var newSum = new Array();
                                var newSumSquares = new Array();
                                for (var i = 0; i < this.sum.length; i++) {
                                    newSum[i] = this.sum[i];
                                    newSumSquares[i] = this.sumSquares[i];
                                }
                                cloned.setSum(newSum);
                                cloned.setSumSquares(newSumSquares);
                            }
                            return cloned;
                        };
                        GaussianArrayKInferState.prototype.getEpsilon = function () {
                            return this.epsilon;
                        };
                        return GaussianArrayKInferState;
                    })(org.kevoree.modeling.KInferState);
                    states.GaussianArrayKInferState = GaussianArrayKInferState;
                    var PolynomialKInferState = (function (_super) {
                        __extends(PolynomialKInferState, _super);
                        function PolynomialKInferState() {
                            _super.apply(this, arguments);
                            this._isDirty = false;
                        }
                        PolynomialKInferState.prototype.getTimeOrigin = function () {
                            return this.timeOrigin;
                        };
                        PolynomialKInferState.prototype.setTimeOrigin = function (timeOrigin) {
                            this.timeOrigin = timeOrigin;
                        };
                        PolynomialKInferState.prototype.is_isDirty = function () {
                            return this._isDirty;
                        };
                        PolynomialKInferState.prototype.getUnit = function () {
                            return this.unit;
                        };
                        PolynomialKInferState.prototype.setUnit = function (unit) {
                            this.unit = unit;
                        };
                        PolynomialKInferState.maxError = function (coef, normalizedTimes, results) {
                            var maxErr = 0;
                            var temp = 0;
                            for (var i = 0; i < normalizedTimes.length; i++) {
                                var val = org.kevoree.modeling.infer.states.PolynomialKInferState.internal_extrapolate(normalizedTimes[i], coef);
                                temp = Math.abs(val - results[i]);
                                if (temp > maxErr) {
                                    maxErr = temp;
                                }
                            }
                            return maxErr;
                        };
                        PolynomialKInferState.internal_extrapolate = function (normalizedTime, coef) {
                            var result = 0;
                            var power = 1;
                            for (var j = 0; j < coef.length; j++) {
                                result += coef[j] * power;
                                power = power * normalizedTime;
                            }
                            return result;
                        };
                        PolynomialKInferState.prototype.save = function () {
                            var s = "";
                            var sb = new java.lang.StringBuilder();
                            sb.append(this.timeOrigin + "/");
                            sb.append(this.unit + "/");
                            if (this.weights != null) {
                                for (var i = 0; i < this.weights.length; i++) {
                                    sb.append(this.weights[i] + "/");
                                }
                                s = sb.toString();
                            }
                            return s;
                        };
                        PolynomialKInferState.prototype.load = function (payload) {
                            try {
                                var previousState = payload.split("/");
                                if (previousState.length > 0) {
                                    this.timeOrigin = java.lang.Long.parseLong(previousState[0]);
                                    this.unit = java.lang.Long.parseLong(previousState[1]);
                                    var size = previousState.length - 2;
                                    this.weights = new Array();
                                    for (var i = 0; i < size; i++) {
                                        this.weights[i] = java.lang.Double.parseDouble(previousState[i - 2]);
                                    }
                                }
                            }
                            catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e = $ex$;
                                }
                            }
                            this._isDirty = false;
                        };
                        PolynomialKInferState.prototype.isDirty = function () {
                            return this._isDirty;
                        };
                        PolynomialKInferState.prototype.set_isDirty = function (value) {
                            this._isDirty = value;
                        };
                        PolynomialKInferState.prototype.cloneState = function () {
                            var cloned = new org.kevoree.modeling.infer.states.PolynomialKInferState();
                            var clonearray = new Array();
                            for (var i = 0; i < this.weights.length; i++) {
                                clonearray[i] = this.weights[i];
                            }
                            cloned.setWeights(clonearray);
                            cloned.setTimeOrigin(this.getTimeOrigin());
                            cloned.setUnit(this.getUnit());
                            return cloned;
                        };
                        PolynomialKInferState.prototype.getWeights = function () {
                            return this.weights;
                        };
                        PolynomialKInferState.prototype.setWeights = function (weights) {
                            this.weights = weights;
                            this._isDirty = true;
                        };
                        PolynomialKInferState.prototype.infer = function (time) {
                            var t = (time - this.timeOrigin) / this.unit;
                            return org.kevoree.modeling.infer.states.PolynomialKInferState.internal_extrapolate(t, this.weights);
                        };
                        return PolynomialKInferState;
                    })(org.kevoree.modeling.KInferState);
                    states.PolynomialKInferState = PolynomialKInferState;
                    var Bayesian;
                    (function (Bayesian) {
                        var BayesianSubstate = (function () {
                            function BayesianSubstate() {
                            }
                            BayesianSubstate.prototype.calculateProbability = function (feature) {
                                throw "Abstract method";
                            };
                            BayesianSubstate.prototype.train = function (feature) {
                                throw "Abstract method";
                            };
                            BayesianSubstate.prototype.save = function (separator) {
                                throw "Abstract method";
                            };
                            BayesianSubstate.prototype.load = function (payload, separator) {
                                throw "Abstract method";
                            };
                            BayesianSubstate.prototype.cloneState = function () {
                                throw "Abstract method";
                            };
                            return BayesianSubstate;
                        })();
                        Bayesian.BayesianSubstate = BayesianSubstate;
                        var EnumSubstate = (function (_super) {
                            __extends(EnumSubstate, _super);
                            function EnumSubstate() {
                                _super.apply(this, arguments);
                                this.total = 0;
                            }
                            EnumSubstate.prototype.getCounter = function () {
                                return this.counter;
                            };
                            EnumSubstate.prototype.setCounter = function (counter) {
                                this.counter = counter;
                            };
                            EnumSubstate.prototype.getTotal = function () {
                                return this.total;
                            };
                            EnumSubstate.prototype.setTotal = function (total) {
                                this.total = total;
                            };
                            EnumSubstate.prototype.initialize = function (number) {
                                this.counter = new Array();
                            };
                            EnumSubstate.prototype.calculateProbability = function (feature) {
                                var res = feature;
                                var p = this.counter[res];
                                if (this.total != 0) {
                                    return p / this.total;
                                }
                                else {
                                    return 0;
                                }
                            };
                            EnumSubstate.prototype.train = function (feature) {
                                var res = feature;
                                this.counter[res]++;
                                this.total++;
                            };
                            EnumSubstate.prototype.save = function (separator) {
                                if (this.counter == null || this.counter.length == 0) {
                                    return "EnumSubstate" + separator;
                                }
                                var sb = new java.lang.StringBuilder();
                                sb.append("EnumSubstate" + separator);
                                for (var i = 0; i < this.counter.length; i++) {
                                    sb.append(this.counter[i] + separator);
                                }
                                return sb.toString();
                            };
                            EnumSubstate.prototype.load = function (payload, separator) {
                                var res = payload.split(separator);
                                this.counter = new Array();
                                this.total = 0;
                                for (var i = 0; i < res.length; i++) {
                                    this.counter[i] = java.lang.Integer.parseInt(res[i]);
                                    this.total += this.counter[i];
                                }
                            };
                            EnumSubstate.prototype.cloneState = function () {
                                var cloned = new org.kevoree.modeling.infer.states.Bayesian.EnumSubstate();
                                var newCounter = new Array();
                                for (var i = 0; i < this.counter.length; i++) {
                                    newCounter[i] = this.counter[i];
                                }
                                cloned.setCounter(newCounter);
                                cloned.setTotal(this.total);
                                return cloned;
                            };
                            return EnumSubstate;
                        })(org.kevoree.modeling.infer.states.Bayesian.BayesianSubstate);
                        Bayesian.EnumSubstate = EnumSubstate;
                        var GaussianSubState = (function (_super) {
                            __extends(GaussianSubState, _super);
                            function GaussianSubState() {
                                _super.apply(this, arguments);
                                this.sumSquares = 0;
                                this.sum = 0;
                                this.nb = 0;
                            }
                            GaussianSubState.prototype.getSumSquares = function () {
                                return this.sumSquares;
                            };
                            GaussianSubState.prototype.setSumSquares = function (sumSquares) {
                                this.sumSquares = sumSquares;
                            };
                            GaussianSubState.prototype.getNb = function () {
                                return this.nb;
                            };
                            GaussianSubState.prototype.setNb = function (nb) {
                                this.nb = nb;
                            };
                            GaussianSubState.prototype.getSum = function () {
                                return this.sum;
                            };
                            GaussianSubState.prototype.setSum = function (sum) {
                                this.sum = sum;
                            };
                            GaussianSubState.prototype.calculateProbability = function (feature) {
                                var fet = feature;
                                var avg = this.sum / this.nb;
                                var variances = this.sumSquares / this.nb - avg * avg;
                                return (1 / Math.sqrt(2 * Math.PI * variances)) * Math.exp(-((fet - avg) * (fet - avg)) / (2 * variances));
                            };
                            GaussianSubState.prototype.getAverage = function () {
                                if (this.nb != 0) {
                                    var avg = this.sum / this.nb;
                                    return avg;
                                }
                                else {
                                    return null;
                                }
                            };
                            GaussianSubState.prototype.train = function (feature) {
                                var fet = feature;
                                this.sum += fet;
                                this.sumSquares += fet * fet;
                                this.nb++;
                            };
                            GaussianSubState.prototype.getVariance = function () {
                                if (this.nb != 0) {
                                    var avg = this.sum / this.nb;
                                    var newvar = this.sumSquares / this.nb - avg * avg;
                                    return newvar;
                                }
                                else {
                                    return null;
                                }
                            };
                            GaussianSubState.prototype.clear = function () {
                                this.nb = 0;
                                this.sum = 0;
                                this.sumSquares = 0;
                            };
                            GaussianSubState.prototype.save = function (separator) {
                                var sb = new java.lang.StringBuilder();
                                sb.append("GaussianSubState" + separator);
                                sb.append(this.nb + separator);
                                sb.append(this.sum + separator);
                                sb.append(this.sumSquares);
                                return sb.toString();
                            };
                            GaussianSubState.prototype.load = function (payload, separator) {
                                try {
                                    var previousState = payload.split(separator);
                                    this.nb = java.lang.Integer.parseInt(previousState[0]);
                                    this.sum = java.lang.Double.parseDouble(previousState[1]);
                                    this.sumSquares = java.lang.Double.parseDouble(previousState[2]);
                                }
                                catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e = $ex$;
                                        this.sum = 0;
                                        this.sumSquares = 0;
                                        this.nb = 0;
                                    }
                                }
                            };
                            GaussianSubState.prototype.cloneState = function () {
                                var cloned = new org.kevoree.modeling.infer.states.Bayesian.GaussianSubState();
                                cloned.setNb(this.getNb());
                                cloned.setSum(this.getSum());
                                cloned.setSumSquares(this.getSumSquares());
                                return cloned;
                            };
                            return GaussianSubState;
                        })(org.kevoree.modeling.infer.states.Bayesian.BayesianSubstate);
                        Bayesian.GaussianSubState = GaussianSubState;
                    })(Bayesian = states.Bayesian || (states.Bayesian = {}));
                })(states = infer.states || (infer.states = {}));
            })(infer = modeling.infer || (modeling.infer = {}));
            var memory;
            (function (memory) {
                var AccessMode = (function () {
                    function AccessMode() {
                    }
                    AccessMode.prototype.equals = function (other) {
                        return this == other;
                    };
                    AccessMode.values = function () {
                        return AccessMode._AccessModeVALUES;
                    };
                    AccessMode.READ = new AccessMode();
                    AccessMode.WRITE = new AccessMode();
                    AccessMode.DELETE = new AccessMode();
                    AccessMode._AccessModeVALUES = [
                        AccessMode.READ,
                        AccessMode.WRITE,
                        AccessMode.DELETE
                    ];
                    return AccessMode;
                })();
                memory.AccessMode = AccessMode;
                var KContentKey = (function () {
                    function KContentKey(p_universeID, p_timeID, p_objID) {
                        this.universe = p_universeID;
                        this.time = p_timeID;
                        this.obj = p_objID;
                    }
                    KContentKey.createUniverseTree = function (p_objectID) {
                        return new org.kevoree.modeling.memory.KContentKey(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, p_objectID);
                    };
                    KContentKey.createTimeTree = function (p_universeID, p_objectID) {
                        return new org.kevoree.modeling.memory.KContentKey(p_universeID, org.kevoree.modeling.KConfig.NULL_LONG, p_objectID);
                    };
                    KContentKey.createObject = function (p_universeID, p_quantaID, p_objectID) {
                        return new org.kevoree.modeling.memory.KContentKey(p_universeID, p_quantaID, p_objectID);
                    };
                    KContentKey.createGlobalUniverseTree = function () {
                        return new org.kevoree.modeling.memory.KContentKey(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG);
                    };
                    KContentKey.createRootUniverseTree = function () {
                        return new org.kevoree.modeling.memory.KContentKey(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.END_OF_TIME);
                    };
                    KContentKey.createRootTimeTree = function (universeID) {
                        return new org.kevoree.modeling.memory.KContentKey(universeID, org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.END_OF_TIME);
                    };
                    KContentKey.createLastPrefix = function () {
                        return new org.kevoree.modeling.memory.KContentKey(org.kevoree.modeling.KConfig.END_OF_TIME, org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG);
                    };
                    KContentKey.createLastObjectIndexFromPrefix = function (prefix) {
                        return new org.kevoree.modeling.memory.KContentKey(org.kevoree.modeling.KConfig.END_OF_TIME, org.kevoree.modeling.KConfig.NULL_LONG, java.lang.Long.parseLong(prefix.toString()));
                    };
                    KContentKey.createLastUniverseIndexFromPrefix = function (prefix) {
                        return new org.kevoree.modeling.memory.KContentKey(org.kevoree.modeling.KConfig.END_OF_TIME, org.kevoree.modeling.KConfig.NULL_LONG, java.lang.Long.parseLong(prefix.toString()));
                    };
                    KContentKey.create = function (payload) {
                        if (payload == null || payload.length == 0) {
                            return null;
                        }
                        else {
                            var temp = new Array();
                            for (var i = 0; i < org.kevoree.modeling.KConfig.KEY_SIZE; i++) {
                                temp[i] = org.kevoree.modeling.KConfig.NULL_LONG;
                            }
                            var maxRead = payload.length;
                            var indexStartElem = -1;
                            var indexElem = 0;
                            for (var i = 0; i < maxRead; i++) {
                                if (payload.charAt(i) == org.kevoree.modeling.KConfig.KEY_SEP) {
                                    if (indexStartElem != -1) {
                                        try {
                                            temp[indexElem] = java.lang.Long.parseLong(payload.substring(indexStartElem, i));
                                        }
                                        catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e = $ex$;
                                                e.printStackTrace();
                                            }
                                        }
                                    }
                                    indexStartElem = -1;
                                    indexElem = indexElem + 1;
                                }
                                else {
                                    if (indexStartElem == -1) {
                                        indexStartElem = i;
                                    }
                                }
                            }
                            if (indexStartElem != -1) {
                                try {
                                    temp[indexElem] = java.lang.Long.parseLong(payload.substring(indexStartElem, maxRead));
                                }
                                catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e = $ex$;
                                        e.printStackTrace();
                                    }
                                }
                            }
                            return new org.kevoree.modeling.memory.KContentKey(temp[0], temp[1], temp[2]);
                        }
                    };
                    KContentKey.prototype.toString = function () {
                        var buffer = new java.lang.StringBuilder();
                        if (this.universe != org.kevoree.modeling.KConfig.NULL_LONG) {
                            buffer.append(this.universe);
                        }
                        buffer.append(org.kevoree.modeling.KConfig.KEY_SEP);
                        if (this.time != org.kevoree.modeling.KConfig.NULL_LONG) {
                            buffer.append(this.time);
                        }
                        buffer.append(org.kevoree.modeling.KConfig.KEY_SEP);
                        if (this.obj != org.kevoree.modeling.KConfig.NULL_LONG) {
                            buffer.append(this.obj);
                        }
                        return buffer.toString();
                    };
                    KContentKey.prototype.equals = function (param) {
                        if (param instanceof org.kevoree.modeling.memory.KContentKey) {
                            var remote = param;
                            return remote.universe == this.universe && remote.time == this.time && remote.obj == this.obj;
                        }
                        else {
                            return false;
                        }
                    };
                    return KContentKey;
                })();
                memory.KContentKey = KContentKey;
                var cache;
                (function (cache) {
                    var HashMemoryCache = (function () {
                        function HashMemoryCache() {
                            this.initalCapacity = org.kevoree.modeling.KConfig.CACHE_INIT_SIZE;
                            this.loadFactor = org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR;
                            this.elementCount = 0;
                            this.elementData = new Array();
                            this.elementDataSize = this.initalCapacity;
                            this.threshold = (this.elementDataSize * this.loadFactor);
                        }
                        HashMemoryCache.prototype.get = function (universe, time, obj) {
                            if (this.elementDataSize == 0) {
                                return null;
                            }
                            var index = ((universe ^ time ^ obj) & 0x7FFFFFFF) % this.elementDataSize;
                            var m = this.elementData[index];
                            while (m != null) {
                                if (m.universe == universe && m.time == time && m.obj == obj) {
                                    return m.value;
                                }
                                m = m.next;
                            }
                            return null;
                        };
                        HashMemoryCache.prototype.put = function (universe, time, obj, payload) {
                            var entry = null;
                            var hash = (universe ^ time ^ obj);
                            var index = (hash & 0x7FFFFFFF) % this.elementDataSize;
                            if (this.elementDataSize != 0) {
                                var m = this.elementData[index];
                                while (m != null) {
                                    if (m.universe == universe && m.time == time && m.obj == obj) {
                                        entry = m;
                                        break;
                                    }
                                    m = m.next;
                                }
                            }
                            if (entry == null) {
                                entry = this.complex_insert(index, hash, universe, time, obj);
                            }
                            entry.value = payload;
                        };
                        HashMemoryCache.prototype.complex_insert = function (previousIndex, hash, universe, time, obj) {
                            var index = previousIndex;
                            if (++this.elementCount > this.threshold) {
                                var length = (this.elementDataSize == 0 ? 1 : this.elementDataSize << 1);
                                var newData = new Array();
                                for (var i = 0; i < this.elementDataSize; i++) {
                                    var entry = this.elementData[i];
                                    while (entry != null) {
                                        index = ((entry.universe ^ entry.time ^ entry.obj) & 0x7FFFFFFF) % length;
                                        var next = entry.next;
                                        entry.next = newData[index];
                                        newData[index] = entry;
                                        entry = next;
                                    }
                                }
                                this.elementData = newData;
                                this.elementDataSize = length;
                                this.threshold = (this.elementDataSize * this.loadFactor);
                                index = (hash & 0x7FFFFFFF) % this.elementDataSize;
                            }
                            var entry = new org.kevoree.modeling.memory.cache.HashMemoryCache.Entry();
                            entry.universe = universe;
                            entry.time = time;
                            entry.obj = obj;
                            entry.next = this.elementData[index];
                            this.elementData[index] = entry;
                            return entry;
                        };
                        HashMemoryCache.prototype.dirties = function () {
                            var nbDirties = 0;
                            for (var i = 0; i < this.elementDataSize; i++) {
                                if (this.elementData[i] != null) {
                                    var current = this.elementData[i];
                                    if (this.elementData[i].value.isDirty()) {
                                        nbDirties++;
                                    }
                                    while (current.next != null) {
                                        current = current.next;
                                        if (current.value.isDirty()) {
                                            nbDirties++;
                                        }
                                    }
                                }
                            }
                            var collectedDirties = new Array();
                            nbDirties = 0;
                            for (var i = 0; i < this.elementDataSize; i++) {
                                if (nbDirties < collectedDirties.length) {
                                    if (this.elementData[i] != null) {
                                        var current = this.elementData[i];
                                        if (this.elementData[i].value.isDirty()) {
                                            var dirty = new org.kevoree.modeling.memory.cache.KCacheDirty(new org.kevoree.modeling.memory.KContentKey(current.universe, current.time, current.obj), this.elementData[i].value);
                                            collectedDirties[nbDirties] = dirty;
                                            this.elementData[i].value.setClean();
                                            nbDirties++;
                                        }
                                        while (current.next != null) {
                                            current = current.next;
                                            if (current.value.isDirty()) {
                                                var dirty = new org.kevoree.modeling.memory.cache.KCacheDirty(new org.kevoree.modeling.memory.KContentKey(current.universe, current.time, current.obj), current.value);
                                                collectedDirties[nbDirties] = dirty;
                                                current.value.setClean();
                                                nbDirties++;
                                            }
                                        }
                                    }
                                }
                            }
                            return collectedDirties;
                        };
                        HashMemoryCache.prototype.clean = function () {
                        };
                        HashMemoryCache.prototype.monitor = function (origin) {
                        };
                        HashMemoryCache.prototype.size = function () {
                            return this.elementCount;
                        };
                        HashMemoryCache.prototype.remove = function (universe, time, obj) {
                            var hash = (universe ^ time ^ obj);
                            var index = (hash & 0x7FFFFFFF) % this.elementDataSize;
                            if (this.elementDataSize != 0) {
                                var previous = null;
                                var m = this.elementData[index];
                                while (m != null) {
                                    if (m.universe == universe && m.time == time && m.obj == obj) {
                                        this.elementCount--;
                                        if (previous == null) {
                                            this.elementData[index] = m.next;
                                        }
                                        else {
                                            previous.next = m.next;
                                        }
                                    }
                                    previous = m;
                                    m = m.next;
                                }
                            }
                        };
                        HashMemoryCache.prototype.clear = function () {
                            if (this.elementCount > 0) {
                                this.elementCount = 0;
                                this.elementData = new Array();
                                this.elementDataSize = this.initalCapacity;
                            }
                        };
                        return HashMemoryCache;
                    })();
                    cache.HashMemoryCache = HashMemoryCache;
                    var HashMemoryCache;
                    (function (HashMemoryCache) {
                        var Entry = (function () {
                            function Entry() {
                            }
                            return Entry;
                        })();
                        HashMemoryCache.Entry = Entry;
                    })(HashMemoryCache = cache.HashMemoryCache || (cache.HashMemoryCache = {}));
                    var KCacheDirty = (function () {
                        function KCacheDirty(key, object) {
                            this.key = key;
                            this.object = object;
                        }
                        return KCacheDirty;
                    })();
                    cache.KCacheDirty = KCacheDirty;
                })(cache = memory.cache || (memory.cache = {}));
                var cdn;
                (function (cdn) {
                    var AtomicOperationFactory = (function () {
                        function AtomicOperationFactory() {
                        }
                        AtomicOperationFactory.getMutatePrefixOperation = function () {
                            return { operationKey: function () {
                                return AtomicOperationFactory.PREFIX_MUTATE_OPERATION;
                            }, mutate: function (previous) {
                                try {
                                    var previousPrefix;
                                    if (previous != null) {
                                        previousPrefix = java.lang.Short.parseShort(previous);
                                    }
                                    else {
                                        previousPrefix = java.lang.Short.parseShort("0");
                                    }
                                    if (previousPrefix == java.lang.Short.MAX_VALUE) {
                                        return "" + java.lang.Short.MIN_VALUE;
                                    }
                                    else {
                                        return "" + (previousPrefix + 1);
                                    }
                                }
                                catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e = $ex$;
                                        e.printStackTrace();
                                        return "" + java.lang.Short.MIN_VALUE;
                                    }
                                }
                            } };
                        };
                        AtomicOperationFactory.getOperationWithKey = function (key) {
                            switch (key) {
                                case AtomicOperationFactory.PREFIX_MUTATE_OPERATION:
                                    return org.kevoree.modeling.memory.cdn.AtomicOperationFactory.getMutatePrefixOperation();
                            }
                            return null;
                        };
                        AtomicOperationFactory.PREFIX_MUTATE_OPERATION = 0;
                        return AtomicOperationFactory;
                    })();
                    cdn.AtomicOperationFactory = AtomicOperationFactory;
                    var KContentPutRequest = (function () {
                        function KContentPutRequest(requestSize) {
                            this._size = 0;
                            this._content = new Array();
                        }
                        KContentPutRequest.prototype.put = function (p_key, p_payload) {
                            var newLine = new Array();
                            newLine[KContentPutRequest.KEY_INDEX] = p_key;
                            newLine[KContentPutRequest.CONTENT_INDEX] = p_payload;
                            this._content[this._size] = newLine;
                            this._size = this._size + 1;
                        };
                        KContentPutRequest.prototype.getKey = function (index) {
                            if (index < this._content.length) {
                                return this._content[index][0];
                            }
                            else {
                                return null;
                            }
                        };
                        KContentPutRequest.prototype.getContent = function (index) {
                            if (index < this._content.length) {
                                return this._content[index][1];
                            }
                            else {
                                return null;
                            }
                        };
                        KContentPutRequest.prototype.size = function () {
                            return this._size;
                        };
                        KContentPutRequest.KEY_INDEX = 0;
                        KContentPutRequest.CONTENT_INDEX = 1;
                        KContentPutRequest.SIZE_INDEX = 2;
                        return KContentPutRequest;
                    })();
                    cdn.KContentPutRequest = KContentPutRequest;
                    var MemoryKContentDeliveryDriver = (function () {
                        function MemoryKContentDeliveryDriver() {
                            this.backend = new org.kevoree.modeling.memory.struct.map.StringHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            this._localEventListeners = new org.kevoree.modeling.util.LocalEventListeners();
                        }
                        MemoryKContentDeliveryDriver.prototype.atomicGetMutate = function (key, operation, callback) {
                            var result = this.backend.get(key.toString());
                            var mutated = operation.mutate(result);
                            if (MemoryKContentDeliveryDriver.DEBUG) {
                                System.out.println("ATOMIC GET " + key + "->" + result);
                                System.out.println("ATOMIC PUT " + key + "->" + mutated);
                            }
                            this.backend.put(key.toString(), mutated);
                            callback(result, null);
                        };
                        MemoryKContentDeliveryDriver.prototype.get = function (keys, callback) {
                            var values = new Array();
                            for (var i = 0; i < keys.length; i++) {
                                if (keys[i] != null) {
                                    values[i] = this.backend.get(keys[i].toString());
                                }
                                if (MemoryKContentDeliveryDriver.DEBUG) {
                                    System.out.println("GET " + keys[i] + "->" + values[i]);
                                }
                            }
                            if (callback != null) {
                                callback(values, null);
                            }
                        };
                        MemoryKContentDeliveryDriver.prototype.put = function (p_request, p_callback) {
                            for (var i = 0; i < p_request.size(); i++) {
                                this.backend.put(p_request.getKey(i).toString(), p_request.getContent(i));
                                if (MemoryKContentDeliveryDriver.DEBUG) {
                                    System.out.println("PUT " + p_request.getKey(i).toString() + "->" + p_request.getContent(i));
                                }
                            }
                            if (p_callback != null) {
                                p_callback(null);
                            }
                        };
                        MemoryKContentDeliveryDriver.prototype.remove = function (keys, callback) {
                            for (var i = 0; i < keys.length; i++) {
                                this.backend.remove(keys[i]);
                            }
                            if (callback != null) {
                                callback(null);
                            }
                        };
                        MemoryKContentDeliveryDriver.prototype.connect = function (callback) {
                            if (callback != null) {
                                callback(null);
                            }
                        };
                        MemoryKContentDeliveryDriver.prototype.close = function (callback) {
                            this._localEventListeners.clear();
                            this.backend.clear();
                            callback(null);
                        };
                        MemoryKContentDeliveryDriver.prototype.registerListener = function (groupId, p_origin, p_listener) {
                            this._localEventListeners.registerListener(groupId, p_origin, p_listener);
                        };
                        MemoryKContentDeliveryDriver.prototype.unregisterGroup = function (groupId) {
                            this._localEventListeners.unregister(groupId);
                        };
                        MemoryKContentDeliveryDriver.prototype.registerMultiListener = function (groupId, origin, objects, listener) {
                            this._localEventListeners.registerListenerAll(groupId, origin.key(), objects, listener);
                        };
                        MemoryKContentDeliveryDriver.prototype.send = function (msgs) {
                            this._localEventListeners.dispatch(msgs);
                        };
                        MemoryKContentDeliveryDriver.prototype.setManager = function (manager) {
                            this._localEventListeners.setManager(manager);
                        };
                        MemoryKContentDeliveryDriver.DEBUG = false;
                        return MemoryKContentDeliveryDriver;
                    })();
                    cdn.MemoryKContentDeliveryDriver = MemoryKContentDeliveryDriver;
                })(cdn = memory.cdn || (memory.cdn = {}));
                var manager;
                (function (manager) {
                    var DefaultKDataManager = (function () {
                        function DefaultKDataManager(model) {
                            this._objectKeyCalculator = null;
                            this._universeKeyCalculator = null;
                            this.isConnected = false;
                            this.UNIVERSE_INDEX = 0;
                            this.OBJ_INDEX = 1;
                            this.GLO_TREE_INDEX = 2;
                            this._cache = new org.kevoree.modeling.memory.cache.HashMemoryCache();
                            this._modelKeyCalculator = new org.kevoree.modeling.memory.manager.KeyCalculator(DefaultKDataManager.zeroPrefix, 0);
                            this._groupKeyCalculator = new org.kevoree.modeling.memory.manager.KeyCalculator(DefaultKDataManager.zeroPrefix, 0);
                            this._db = new org.kevoree.modeling.memory.cdn.MemoryKContentDeliveryDriver();
                            this._db.setManager(this);
                            this._operationManager = new org.kevoree.modeling.util.DefaultOperationManager(this);
                            this._scheduler = new org.kevoree.modeling.scheduler.DirectScheduler();
                            this._model = model;
                        }
                        DefaultKDataManager.prototype.cache = function () {
                            return this._cache;
                        };
                        DefaultKDataManager.prototype.model = function () {
                            return this._model;
                        };
                        DefaultKDataManager.prototype.close = function (callback) {
                            this.isConnected = false;
                            if (this._db != null) {
                                this._db.close(callback);
                            }
                            else {
                                callback(null);
                            }
                        };
                        DefaultKDataManager.prototype.nextUniverseKey = function () {
                            if (this._universeKeyCalculator == null) {
                                throw new java.lang.RuntimeException(DefaultKDataManager.UNIVERSE_NOT_CONNECTED_ERROR);
                            }
                            var nextGeneratedKey = this._universeKeyCalculator.nextKey();
                            if (nextGeneratedKey == org.kevoree.modeling.KConfig.NULL_LONG || nextGeneratedKey == org.kevoree.modeling.KConfig.END_OF_TIME) {
                                nextGeneratedKey = this._universeKeyCalculator.nextKey();
                            }
                            return nextGeneratedKey;
                        };
                        DefaultKDataManager.prototype.nextObjectKey = function () {
                            if (this._objectKeyCalculator == null) {
                                throw new java.lang.RuntimeException(DefaultKDataManager.UNIVERSE_NOT_CONNECTED_ERROR);
                            }
                            var nextGeneratedKey = this._objectKeyCalculator.nextKey();
                            if (nextGeneratedKey == org.kevoree.modeling.KConfig.NULL_LONG || nextGeneratedKey == org.kevoree.modeling.KConfig.END_OF_TIME) {
                                nextGeneratedKey = this._objectKeyCalculator.nextKey();
                            }
                            return nextGeneratedKey;
                        };
                        DefaultKDataManager.prototype.nextModelKey = function () {
                            return this._modelKeyCalculator.nextKey();
                        };
                        DefaultKDataManager.prototype.nextGroupKey = function () {
                            return this._groupKeyCalculator.nextKey();
                        };
                        DefaultKDataManager.prototype.globalUniverseOrder = function () {
                            return this._cache.get(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG);
                        };
                        DefaultKDataManager.prototype.initUniverse = function (p_universe, p_parent) {
                            var cached = this.globalUniverseOrder();
                            if (cached != null && cached.get(p_universe.key()) == org.kevoree.modeling.KConfig.NULL_LONG) {
                                if (p_parent == null) {
                                    cached.put(p_universe.key(), p_universe.key());
                                }
                                else {
                                    cached.put(p_universe.key(), p_parent.key());
                                }
                            }
                        };
                        DefaultKDataManager.prototype.parentUniverseKey = function (currentUniverseKey) {
                            var cached = this.globalUniverseOrder();
                            if (cached != null) {
                                return cached.get(currentUniverseKey);
                            }
                            else {
                                return org.kevoree.modeling.KConfig.NULL_LONG;
                            }
                        };
                        DefaultKDataManager.prototype.descendantsUniverseKeys = function (currentUniverseKey) {
                            var cached = this.globalUniverseOrder();
                            if (cached != null) {
                                var temp = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                cached.each(function (key, value) {
                                    if (value == currentUniverseKey && key != currentUniverseKey) {
                                        temp.put(key, value);
                                    }
                                });
                                var result = new Array();
                                var insertIndex = [0];
                                temp.each(function (key, value) {
                                    result[insertIndex[0]] = key;
                                    insertIndex[0]++;
                                });
                                return result;
                            }
                            else {
                                return new Array();
                            }
                        };
                        DefaultKDataManager.prototype.save = function (callback) {
                            var _this = this;
                            var dirtiesEntries = this._cache.dirties();
                            var request = new org.kevoree.modeling.memory.cdn.KContentPutRequest(dirtiesEntries.length + 2);
                            var notificationMessages = new org.kevoree.modeling.msg.KEvents(dirtiesEntries.length);
                            for (var i = 0; i < dirtiesEntries.length; i++) {
                                var cachedObject = dirtiesEntries[i].object;
                                var meta;
                                if (dirtiesEntries[i].object instanceof org.kevoree.modeling.memory.struct.segment.HeapCacheSegment) {
                                    var segment = dirtiesEntries[i].object;
                                    meta = segment.modifiedIndexes(this._model.metaModel().metaClasses()[segment.metaClassIndex()]);
                                }
                                else {
                                    meta = null;
                                }
                                notificationMessages.setEvent(i, dirtiesEntries[i].key, meta);
                                request.put(dirtiesEntries[i].key, cachedObject.serialize(this._model.metaModel()));
                                cachedObject.setClean();
                            }
                            request.put(org.kevoree.modeling.memory.KContentKey.createLastObjectIndexFromPrefix(this._objectKeyCalculator.prefix()), "" + this._objectKeyCalculator.lastComputedIndex());
                            request.put(org.kevoree.modeling.memory.KContentKey.createLastUniverseIndexFromPrefix(this._universeKeyCalculator.prefix()), "" + this._universeKeyCalculator.lastComputedIndex());
                            this._db.put(request, function (throwable) {
                                if (throwable == null) {
                                    _this._db.send(notificationMessages);
                                }
                                if (callback != null) {
                                    callback(throwable);
                                }
                            });
                        };
                        DefaultKDataManager.prototype.initKObject = function (obj) {
                            var cacheEntry = new org.kevoree.modeling.memory.struct.segment.HeapCacheSegment();
                            cacheEntry.init(obj.metaClass());
                            cacheEntry.setDirty();
                            cacheEntry.inc();
                            var timeTree = new org.kevoree.modeling.memory.struct.tree.ooheap.OOKLongTree();
                            timeTree.inc();
                            timeTree.insert(obj.now());
                            var universeTree = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            universeTree.inc();
                            universeTree.put(obj.universe(), obj.now());
                            this._cache.put(obj.universe(), org.kevoree.modeling.KConfig.NULL_LONG, obj.uuid(), timeTree);
                            this._cache.put(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, obj.uuid(), universeTree);
                            this._cache.put(obj.universe(), obj.now(), obj.uuid(), cacheEntry);
                        };
                        DefaultKDataManager.prototype.connect = function (connectCallback) {
                            var _this = this;
                            if (this.isConnected) {
                                if (connectCallback != null) {
                                    connectCallback(null);
                                }
                            }
                            if (this._db == null) {
                                if (connectCallback != null) {
                                    connectCallback(new java.lang.Exception("Please attach a KDataBase AND a KBroker first !"));
                                }
                            }
                            else {
                                this._db.connect(function (throwable) {
                                    if (throwable == null) {
                                        _this._db.atomicGetMutate(org.kevoree.modeling.memory.KContentKey.createLastPrefix(), org.kevoree.modeling.memory.cdn.AtomicOperationFactory.getMutatePrefixOperation(), function (payloadPrefix, error) {
                                            if (error != null) {
                                                if (connectCallback != null) {
                                                    connectCallback(error);
                                                }
                                            }
                                            else {
                                                var cleanedPrefixPayload = payloadPrefix;
                                                if (cleanedPrefixPayload == null || cleanedPrefixPayload.equals("")) {
                                                    cleanedPrefixPayload = "0";
                                                }
                                                var newPrefix;
                                                try {
                                                    newPrefix = java.lang.Short.parseShort(cleanedPrefixPayload);
                                                }
                                                catch ($ex$) {
                                                    if ($ex$ instanceof java.lang.Exception) {
                                                        var e = $ex$;
                                                        newPrefix = java.lang.Short.parseShort("0");
                                                    }
                                                }
                                                var connectionElemKeys = new Array();
                                                connectionElemKeys[_this.UNIVERSE_INDEX] = org.kevoree.modeling.memory.KContentKey.createLastUniverseIndexFromPrefix(newPrefix);
                                                connectionElemKeys[_this.OBJ_INDEX] = org.kevoree.modeling.memory.KContentKey.createLastObjectIndexFromPrefix(newPrefix);
                                                connectionElemKeys[_this.GLO_TREE_INDEX] = org.kevoree.modeling.memory.KContentKey.createGlobalUniverseTree();
                                                var finalNewPrefix = newPrefix;
                                                _this._db.get(connectionElemKeys, function (strings, errorL2) {
                                                    if (errorL2 != null) {
                                                        if (connectCallback != null) {
                                                            connectCallback(errorL2);
                                                        }
                                                    }
                                                    else {
                                                        if (strings.length == 3) {
                                                            var detected = null;
                                                            try {
                                                                var uniIndexPayload = strings[_this.UNIVERSE_INDEX];
                                                                if (uniIndexPayload == null || uniIndexPayload.equals("")) {
                                                                    uniIndexPayload = "0";
                                                                }
                                                                var objIndexPayload = strings[_this.OBJ_INDEX];
                                                                if (objIndexPayload == null || objIndexPayload.equals("")) {
                                                                    objIndexPayload = "0";
                                                                }
                                                                var globalUniverseTreePayload = strings[_this.GLO_TREE_INDEX];
                                                                var globalUniverseTree;
                                                                if (globalUniverseTreePayload != null) {
                                                                    globalUniverseTree = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(0, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                                                    try {
                                                                        globalUniverseTree.unserialize(org.kevoree.modeling.memory.KContentKey.createGlobalUniverseTree(), globalUniverseTreePayload, _this.model().metaModel());
                                                                    }
                                                                    catch ($ex$) {
                                                                        if ($ex$ instanceof java.lang.Exception) {
                                                                            var e = $ex$;
                                                                            e.printStackTrace();
                                                                        }
                                                                    }
                                                                }
                                                                else {
                                                                    globalUniverseTree = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                                                }
                                                                _this._cache.put(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, globalUniverseTree);
                                                                var newUniIndex = java.lang.Long.parseLong(uniIndexPayload);
                                                                var newObjIndex = java.lang.Long.parseLong(objIndexPayload);
                                                                _this._universeKeyCalculator = new org.kevoree.modeling.memory.manager.KeyCalculator(finalNewPrefix, newUniIndex);
                                                                _this._objectKeyCalculator = new org.kevoree.modeling.memory.manager.KeyCalculator(finalNewPrefix, newObjIndex);
                                                                _this.isConnected = true;
                                                            }
                                                            catch ($ex$) {
                                                                if ($ex$ instanceof java.lang.Exception) {
                                                                    var e = $ex$;
                                                                    detected = e;
                                                                }
                                                            }
                                                            if (connectCallback != null) {
                                                                connectCallback(detected);
                                                            }
                                                        }
                                                        else {
                                                            if (connectCallback != null) {
                                                                connectCallback(new java.lang.Exception("Error while connecting the KDataStore..."));
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        if (connectCallback != null) {
                                            connectCallback(throwable);
                                        }
                                    }
                                });
                            }
                        };
                        DefaultKDataManager.prototype.segment = function (origin, accessMode) {
                            var currentEntry = this._cache.get(origin.universe(), origin.now(), origin.uuid());
                            if (currentEntry != null) {
                                return currentEntry;
                            }
                            var objectUniverseTree = this._cache.get(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, origin.uuid());
                            var resolvedUniverse = org.kevoree.modeling.memory.manager.ResolutionHelper.resolve_universe(this.globalUniverseOrder(), objectUniverseTree, origin.now(), origin.universe());
                            var timeTree = this._cache.get(resolvedUniverse, org.kevoree.modeling.KConfig.NULL_LONG, origin.uuid());
                            if (timeTree == null) {
                                throw new java.lang.RuntimeException(DefaultKDataManager.OUT_OF_CACHE_MESSAGE + " : TimeTree not found for " + org.kevoree.modeling.memory.KContentKey.createTimeTree(resolvedUniverse, origin.uuid()) + " from " + origin.universe() + "/" + resolvedUniverse);
                            }
                            var resolvedTime = timeTree.previousOrEqual(origin.now());
                            if (resolvedTime != org.kevoree.modeling.KConfig.NULL_LONG) {
                                var needTimeCopy = accessMode.equals(org.kevoree.modeling.memory.AccessMode.WRITE) && (resolvedTime != origin.now());
                                var needUniverseCopy = accessMode.equals(org.kevoree.modeling.memory.AccessMode.WRITE) && (resolvedUniverse != origin.universe());
                                var entry = this._cache.get(resolvedUniverse, resolvedTime, origin.uuid());
                                if (entry == null) {
                                    return null;
                                }
                                if (accessMode.equals(org.kevoree.modeling.memory.AccessMode.DELETE)) {
                                    timeTree.delete(origin.now());
                                    return entry;
                                }
                                if (!needTimeCopy && !needUniverseCopy) {
                                    if (accessMode.equals(org.kevoree.modeling.memory.AccessMode.WRITE)) {
                                        entry.setDirty();
                                    }
                                    return entry;
                                }
                                else {
                                    var clonedEntry = entry.clone(origin.metaClass());
                                    this._cache.put(origin.universe(), origin.now(), origin.uuid(), clonedEntry);
                                    if (!needUniverseCopy) {
                                        timeTree.insert(origin.now());
                                    }
                                    else {
                                        var newTemporalTree = new org.kevoree.modeling.memory.struct.tree.ooheap.OOKLongTree();
                                        newTemporalTree.insert(origin.now());
                                        newTemporalTree.inc();
                                        timeTree.dec();
                                        this._cache.put(origin.universe(), org.kevoree.modeling.KConfig.NULL_LONG, origin.uuid(), newTemporalTree);
                                        objectUniverseTree.put(origin.universe(), origin.now());
                                    }
                                    entry.dec();
                                    clonedEntry.inc();
                                    return clonedEntry;
                                }
                            }
                            else {
                                System.err.println(DefaultKDataManager.OUT_OF_CACHE_MESSAGE + " Time not resolved " + origin.now());
                                return null;
                            }
                        };
                        DefaultKDataManager.prototype.discard = function (p_universe, callback) {
                            this._cache.clear();
                            var globalUniverseTree = new Array();
                            globalUniverseTree[0] = org.kevoree.modeling.memory.KContentKey.createGlobalUniverseTree();
                            this.reload(globalUniverseTree, function (throwable) {
                                callback(throwable);
                            });
                        };
                        DefaultKDataManager.prototype.delete = function (p_universe, callback) {
                            throw new java.lang.RuntimeException("Not implemented yet !");
                        };
                        DefaultKDataManager.prototype.lookup = function (universe, time, uuid, callback) {
                            var keys = new Array();
                            keys[0] = uuid;
                            this.lookupAllobjects(universe, time, keys, function (kObjects) {
                                if (kObjects.length == 1) {
                                    if (callback != null) {
                                        callback(kObjects[0]);
                                    }
                                }
                                else {
                                    if (callback != null) {
                                        callback(null);
                                    }
                                }
                            });
                        };
                        DefaultKDataManager.prototype.lookupAllobjects = function (universe, time, uuids, callback) {
                            this._scheduler.dispatch(new org.kevoree.modeling.memory.manager.LookupAllRunnable(universe, time, uuids, callback, this));
                        };
                        DefaultKDataManager.prototype.lookupAlltimes = function (universe, time, uuid, callback) {
                            throw new java.lang.RuntimeException("Not Implemented Yet !");
                        };
                        DefaultKDataManager.prototype.cdn = function () {
                            return this._db;
                        };
                        DefaultKDataManager.prototype.setContentDeliveryDriver = function (p_dataBase) {
                            this._db = p_dataBase;
                            p_dataBase.setManager(this);
                        };
                        DefaultKDataManager.prototype.setScheduler = function (p_scheduler) {
                            if (p_scheduler != null) {
                                this._scheduler = p_scheduler;
                            }
                        };
                        DefaultKDataManager.prototype.operationManager = function () {
                            return this._operationManager;
                        };
                        DefaultKDataManager.prototype.getRoot = function (universe, time, callback) {
                            var _this = this;
                            this.bumpKeyToCache(org.kevoree.modeling.memory.KContentKey.createRootUniverseTree(), function (rootGlobalUniverseIndex) {
                                if (rootGlobalUniverseIndex == null) {
                                    callback(null);
                                }
                                else {
                                    var closestUniverse = org.kevoree.modeling.memory.manager.ResolutionHelper.resolve_universe(_this.globalUniverseOrder(), rootGlobalUniverseIndex, time, universe);
                                    var universeTreeRootKey = org.kevoree.modeling.memory.KContentKey.createRootTimeTree(closestUniverse);
                                    _this.bumpKeyToCache(universeTreeRootKey, function (universeTree) {
                                        if (universeTree == null) {
                                            callback(null);
                                        }
                                        else {
                                            var resolvedVal = universeTree.previousOrEqualValue(time);
                                            if (resolvedVal == org.kevoree.modeling.KConfig.NULL_LONG) {
                                                callback(null);
                                            }
                                            else {
                                                _this.lookup(universe, time, resolvedVal, callback);
                                            }
                                        }
                                    });
                                }
                            });
                        };
                        DefaultKDataManager.prototype.setRoot = function (newRoot, callback) {
                            var _this = this;
                            this.bumpKeyToCache(org.kevoree.modeling.memory.KContentKey.createRootUniverseTree(), function (globalRootTree) {
                                var cleanedTree = globalRootTree;
                                if (cleanedTree == null) {
                                    cleanedTree = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                    _this._cache.put(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.END_OF_TIME, cleanedTree);
                                }
                                var closestUniverse = org.kevoree.modeling.memory.manager.ResolutionHelper.resolve_universe(_this.globalUniverseOrder(), cleanedTree, newRoot.now(), newRoot.universe());
                                cleanedTree.put(newRoot.universe(), newRoot.now());
                                if (closestUniverse != newRoot.universe()) {
                                    var newTimeTree = new org.kevoree.modeling.memory.struct.tree.ooheap.OOKLongLongTree();
                                    newTimeTree.insert(newRoot.now(), newRoot.uuid());
                                    var universeTreeRootKey = org.kevoree.modeling.memory.KContentKey.createRootTimeTree(newRoot.universe());
                                    _this._cache.put(universeTreeRootKey.universe, universeTreeRootKey.time, universeTreeRootKey.obj, newTimeTree);
                                    if (callback != null) {
                                        callback(null);
                                    }
                                }
                                else {
                                    var universeTreeRootKey = org.kevoree.modeling.memory.KContentKey.createRootTimeTree(closestUniverse);
                                    _this.bumpKeyToCache(universeTreeRootKey, function (resolvedRootTimeTree) {
                                        var initializedTree = resolvedRootTimeTree;
                                        if (initializedTree == null) {
                                            initializedTree = new org.kevoree.modeling.memory.struct.tree.ooheap.OOKLongLongTree();
                                            _this._cache.put(universeTreeRootKey.universe, universeTreeRootKey.time, universeTreeRootKey.obj, initializedTree);
                                        }
                                        initializedTree.insert(newRoot.now(), newRoot.uuid());
                                        if (callback != null) {
                                            callback(null);
                                        }
                                    });
                                }
                            });
                        };
                        DefaultKDataManager.prototype.reload = function (keys, callback) {
                            var _this = this;
                            var toReload = new java.util.ArrayList();
                            for (var i = 0; i < keys.length; i++) {
                                var cached = this._cache.get(keys[i].universe, keys[i].time, keys[i].obj);
                                if (cached != null && !cached.isDirty()) {
                                    toReload.add(keys[i]);
                                }
                            }
                            var toReload_flat = toReload.toArray(new Array());
                            this._db.get(toReload_flat, function (strings, error) {
                                if (error != null) {
                                    error.printStackTrace();
                                    if (callback != null) {
                                        callback(null);
                                    }
                                }
                                else {
                                    for (var i = 0; i < strings.length; i++) {
                                        if (strings[i] != null) {
                                            var correspondingKey = toReload_flat[i];
                                            var cachedObj = _this._cache.get(correspondingKey.universe, correspondingKey.time, correspondingKey.obj);
                                            if (cachedObj != null && !cachedObj.isDirty()) {
                                                cachedObj = _this.internal_unserialize(correspondingKey, strings[i]);
                                                if (cachedObj != null) {
                                                    _this._cache.put(correspondingKey.universe, correspondingKey.time, correspondingKey.obj, cachedObj);
                                                }
                                            }
                                        }
                                    }
                                    if (callback != null) {
                                        callback(null);
                                    }
                                }
                            });
                        };
                        DefaultKDataManager.prototype.bumpKeyToCache = function (contentKey, callback) {
                            var _this = this;
                            var cached = this._cache.get(contentKey.universe, contentKey.time, contentKey.obj);
                            if (cached != null) {
                                callback(cached);
                            }
                            else {
                                var keys = new Array();
                                keys[0] = contentKey;
                                this._db.get(keys, function (strings, error) {
                                    if (strings[0] != null) {
                                        var newObject = _this.internal_unserialize(contentKey, strings[0]);
                                        if (newObject != null) {
                                            _this._cache.put(contentKey.universe, contentKey.time, contentKey.obj, newObject);
                                        }
                                        callback(newObject);
                                    }
                                    else {
                                        callback(null);
                                    }
                                });
                            }
                        };
                        DefaultKDataManager.prototype.bumpKeysToCache = function (contentKeys, callback) {
                            var _this = this;
                            var toLoadIndexes = null;
                            var nbElem = 0;
                            var result = new Array();
                            for (var i = 0; i < contentKeys.length; i++) {
                                if (contentKeys[i] != null) {
                                    result[i] = this._cache.get(contentKeys[i].universe, contentKeys[i].time, contentKeys[i].obj);
                                    if (result[i] == null) {
                                        if (toLoadIndexes == null) {
                                            toLoadIndexes = new Array();
                                        }
                                        toLoadIndexes[i] = true;
                                        nbElem++;
                                    }
                                }
                            }
                            if (toLoadIndexes == null) {
                                callback(result);
                            }
                            else {
                                var toLoadDbKeys = new Array();
                                var originIndexes = new Array();
                                var toLoadIndex = 0;
                                for (var i = 0; i < contentKeys.length; i++) {
                                    if (toLoadIndexes[i]) {
                                        toLoadDbKeys[toLoadIndex] = contentKeys[i];
                                        originIndexes[toLoadIndex] = i;
                                        toLoadIndex++;
                                    }
                                }
                                this._db.get(toLoadDbKeys, function (payloads, error) {
                                    for (var i = 0; i < payloads.length; i++) {
                                        if (payloads[i] != null) {
                                            var newObjKey = toLoadDbKeys[i];
                                            var newObject = _this.internal_unserialize(newObjKey, payloads[i]);
                                            if (newObject != null) {
                                                _this._cache.put(newObjKey.universe, newObjKey.time, newObjKey.obj, newObject);
                                                var originIndex = originIndexes[i];
                                                result[originIndex] = newObject;
                                            }
                                        }
                                    }
                                    callback(result);
                                });
                            }
                        };
                        DefaultKDataManager.prototype.internal_unserialize = function (key, payload) {
                            var result;
                            var isUniverseNotNull = key.universe != org.kevoree.modeling.KConfig.NULL_LONG;
                            if (org.kevoree.modeling.KConfig.END_OF_TIME == key.obj) {
                                if (isUniverseNotNull) {
                                    result = new org.kevoree.modeling.memory.struct.tree.ooheap.OOKLongLongTree();
                                }
                                else {
                                    result = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(0, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                }
                            }
                            else {
                                var isTimeNotNull = key.time != org.kevoree.modeling.KConfig.NULL_LONG;
                                var isObjNotNull = key.obj != org.kevoree.modeling.KConfig.NULL_LONG;
                                if (isUniverseNotNull && isTimeNotNull && isObjNotNull) {
                                    result = new org.kevoree.modeling.memory.struct.segment.HeapCacheSegment();
                                }
                                else {
                                    if (isUniverseNotNull && !isTimeNotNull && isObjNotNull) {
                                        result = new org.kevoree.modeling.memory.struct.tree.ooheap.OOKLongTree();
                                    }
                                    else {
                                        result = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(0, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                    }
                                }
                            }
                            try {
                                result.unserialize(key, payload, this.model().metaModel());
                                return result;
                            }
                            catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e = $ex$;
                                    e.printStackTrace();
                                    return null;
                                }
                            }
                        };
                        DefaultKDataManager.OUT_OF_CACHE_MESSAGE = "KMF Error: your object is out of cache, you probably kept an old reference. Please reload it with a lookup";
                        DefaultKDataManager.UNIVERSE_NOT_CONNECTED_ERROR = "Please connect your model prior to create a universe or an object";
                        DefaultKDataManager.zeroPrefix = 0;
                        return DefaultKDataManager;
                    })();
                    manager.DefaultKDataManager = DefaultKDataManager;
                    var JsonRaw = (function () {
                        function JsonRaw() {
                        }
                        JsonRaw.decode = function (payload, now, metaModel, entry) {
                            if (payload == null) {
                                return false;
                            }
                            var objectReader = new org.kevoree.modeling.format.json.JsonObjectReader();
                            objectReader.parseObject(payload);
                            if (objectReader.get(org.kevoree.modeling.format.json.JsonFormat.KEY_META) == null) {
                                return false;
                            }
                            else {
                                var metaClass = metaModel.metaClass(objectReader.get(org.kevoree.modeling.format.json.JsonFormat.KEY_META).toString());
                                entry.init(metaClass);
                                var metaKeys = objectReader.keys();
                                for (var i = 0; i < metaKeys.length; i++) {
                                    var metaElement = metaClass.metaByName(metaKeys[i]);
                                    var insideContent = objectReader.get(metaKeys[i]);
                                    if (insideContent != null) {
                                        if (metaElement != null && metaElement.metaType().equals(org.kevoree.modeling.meta.MetaType.ATTRIBUTE)) {
                                            entry.set(metaElement.index(), metaElement.strategy().load(insideContent.toString(), metaElement, now), metaClass);
                                        }
                                        else {
                                            if (metaElement != null && metaElement instanceof org.kevoree.modeling.abs.AbstractMetaReference) {
                                                try {
                                                    var plainRawSet = objectReader.getAsStringArray(metaKeys[i]);
                                                    var convertedRaw = new Array();
                                                    for (var l = 0; l < plainRawSet.length; l++) {
                                                        try {
                                                            convertedRaw[l] = java.lang.Long.parseLong(plainRawSet[l]);
                                                        }
                                                        catch ($ex$) {
                                                            if ($ex$ instanceof java.lang.Exception) {
                                                                var e = $ex$;
                                                                e.printStackTrace();
                                                            }
                                                        }
                                                    }
                                                    entry.set(metaElement.index(), convertedRaw, metaClass);
                                                }
                                                catch ($ex$) {
                                                    if ($ex$ instanceof java.lang.Exception) {
                                                        var e = $ex$;
                                                        e.printStackTrace();
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                entry.setClean();
                                return true;
                            }
                        };
                        JsonRaw.encode = function (raw, uuid, p_metaClass, isRoot) {
                            var builder = {};
                            builder[org.kevoree.modeling.format.json.JsonFormat.KEY_META] = p_metaClass.metaName();
                            if (uuid != null) {
                                builder[org.kevoree.modeling.format.json.JsonFormat.KEY_UUID] = uuid;
                            }
                            if (isRoot) {
                                builder[org.kevoree.modeling.format.json.JsonFormat.KEY_ROOT] = true;
                            }
                            var metaElements = p_metaClass.metaElements();
                            var payload_res;
                            for (var i = 0; i < metaElements.length; i++) {
                                payload_res = raw.get(metaElements[i].index(), p_metaClass);
                                if (payload_res != null && payload_res !== undefined) {
                                    if (metaElements[i] != null && metaElements[i].metaType() === org.kevoree.modeling.meta.MetaType.ATTRIBUTE) {
                                        if (metaElements[i]['attributeType']() != org.kevoree.modeling.meta.PrimitiveTypes.TRANSIENT) {
                                            var attrsPayload = metaElements[i]['strategy']().save(payload_res, metaElements[i]);
                                            builder[metaElements[i].metaName()] = attrsPayload;
                                        }
                                    }
                                    else {
                                        builder[metaElements[i].metaName()] = payload_res;
                                    }
                                }
                            }
                            return JSON.stringify(builder);
                        };
                        return JsonRaw;
                    })();
                    manager.JsonRaw = JsonRaw;
                    var KeyCalculator = (function () {
                        function KeyCalculator(prefix, currentIndex) {
                            this._prefix = "0x" + prefix.toString(org.kevoree.modeling.KConfig.PREFIX_SIZE);
                            this._currentIndex = currentIndex;
                        }
                        KeyCalculator.prototype.nextKey = function () {
                            if (this._currentIndex == org.kevoree.modeling.KConfig.KEY_PREFIX_MASK) {
                                throw new java.lang.IndexOutOfBoundsException("Object Index could not be created because it exceeded the capacity of the current prefix. Ask for a new prefix.");
                            }
                            this._currentIndex++;
                            var indexHex = this._currentIndex.toString(org.kevoree.modeling.KConfig.PREFIX_SIZE);
                            var objectKey = parseInt(this._prefix + "000000000".substring(0, 9 - indexHex.length) + indexHex, org.kevoree.modeling.KConfig.PREFIX_SIZE);
                            if (objectKey >= org.kevoree.modeling.KConfig.NULL_LONG) {
                                throw new java.lang.IndexOutOfBoundsException("Object Index exceeds teh maximum JavaScript number capacity. (2^" + org.kevoree.modeling.KConfig.LONG_SIZE + ")");
                            }
                            return objectKey;
                        };
                        KeyCalculator.prototype.lastComputedIndex = function () {
                            return this._currentIndex;
                        };
                        KeyCalculator.prototype.prefix = function () {
                            return parseInt(this._prefix, org.kevoree.modeling.KConfig.PREFIX_SIZE);
                        };
                        return KeyCalculator;
                    })();
                    manager.KeyCalculator = KeyCalculator;
                    var LookupAllRunnable = (function () {
                        function LookupAllRunnable(p_universe, p_time, p_keys, p_callback, p_store) {
                            this._universe = p_universe;
                            this._time = p_time;
                            this._keys = p_keys;
                            this._callback = p_callback;
                            this._store = p_store;
                        }
                        LookupAllRunnable.prototype.run = function () {
                            var _this = this;
                            var tempKeys = new Array();
                            for (var i = 0; i < this._keys.length; i++) {
                                if (this._keys[i] != org.kevoree.modeling.KConfig.NULL_LONG) {
                                    tempKeys[i] = org.kevoree.modeling.memory.KContentKey.createUniverseTree(this._keys[i]);
                                }
                            }
                            this._store.bumpKeysToCache(tempKeys, function (universeIndexes) {
                                for (var i = 0; i < _this._keys.length; i++) {
                                    var toLoadKey = null;
                                    if (universeIndexes[i] != null) {
                                        var closestUniverse = org.kevoree.modeling.memory.manager.ResolutionHelper.resolve_universe(_this._store.globalUniverseOrder(), universeIndexes[i], _this._time, _this._universe);
                                        toLoadKey = org.kevoree.modeling.memory.KContentKey.createTimeTree(closestUniverse, _this._keys[i]);
                                    }
                                    tempKeys[i] = toLoadKey;
                                }
                                _this._store.bumpKeysToCache(tempKeys, function (timeIndexes) {
                                    for (var i = 0; i < _this._keys.length; i++) {
                                        var resolvedContentKey = null;
                                        if (timeIndexes[i] != null) {
                                            var cachedIndexTree = timeIndexes[i];
                                            var resolvedNode = cachedIndexTree.previousOrEqual(_this._time);
                                            if (resolvedNode != org.kevoree.modeling.KConfig.NULL_LONG) {
                                                resolvedContentKey = org.kevoree.modeling.memory.KContentKey.createObject(tempKeys[i].universe, resolvedNode, _this._keys[i]);
                                            }
                                        }
                                        tempKeys[i] = resolvedContentKey;
                                    }
                                    _this._store.bumpKeysToCache(tempKeys, function (cachedObjects) {
                                        var proxies = new Array();
                                        for (var i = 0; i < _this._keys.length; i++) {
                                            if (cachedObjects[i] != null && cachedObjects[i] instanceof org.kevoree.modeling.memory.struct.segment.HeapCacheSegment) {
                                                proxies[i] = _this._store.model().createProxy(_this._universe, _this._time, _this._keys[i], _this._store.model().metaModel().metaClasses()[cachedObjects[i].metaClassIndex()]);
                                                if (proxies[i] != null) {
                                                    var cachedIndexTree = timeIndexes[i];
                                                    cachedIndexTree.inc();
                                                    var universeTree = universeIndexes[i];
                                                    universeTree.inc();
                                                    cachedObjects[i].inc();
                                                }
                                            }
                                        }
                                        _this._callback(proxies);
                                    });
                                });
                            });
                        };
                        return LookupAllRunnable;
                    })();
                    manager.LookupAllRunnable = LookupAllRunnable;
                    var ResolutionHelper = (function () {
                        function ResolutionHelper() {
                        }
                        ResolutionHelper.resolve_trees = function (universe, time, uuid, cache) {
                            var result = new org.kevoree.modeling.memory.manager.ResolutionResult();
                            var objectUniverseTree = cache.get(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, uuid);
                            var globalUniverseOrder = cache.get(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG);
                            result.universeTree = objectUniverseTree;
                            var resolvedUniverse = org.kevoree.modeling.memory.manager.ResolutionHelper.resolve_universe(globalUniverseOrder, objectUniverseTree, time, universe);
                            result.universe = resolvedUniverse;
                            var timeTree = cache.get(resolvedUniverse, org.kevoree.modeling.KConfig.NULL_LONG, uuid);
                            if (timeTree != null) {
                                result.timeTree = timeTree;
                                var resolvedTime = timeTree.previousOrEqual(time);
                                result.time = resolvedTime;
                                result.segment = cache.get(resolvedUniverse, resolvedTime, uuid);
                            }
                            result.uuid = uuid;
                            return result;
                        };
                        ResolutionHelper.resolve_universe = function (globalTree, objUniverseTree, timeToResolve, originUniverseId) {
                            if (globalTree == null || objUniverseTree == null) {
                                return originUniverseId;
                            }
                            var currentUniverse = originUniverseId;
                            var previousUniverse = org.kevoree.modeling.KConfig.NULL_LONG;
                            var divergenceTime = objUniverseTree.get(currentUniverse);
                            while (currentUniverse != previousUniverse) {
                                if (divergenceTime != org.kevoree.modeling.KConfig.NULL_LONG && divergenceTime <= timeToResolve) {
                                    return currentUniverse;
                                }
                                previousUniverse = currentUniverse;
                                currentUniverse = globalTree.get(currentUniverse);
                                divergenceTime = objUniverseTree.get(currentUniverse);
                            }
                            return originUniverseId;
                        };
                        ResolutionHelper.universeSelectByRange = function (globalTree, objUniverseTree, rangeMin, rangeMax, originUniverseId) {
                            var collected = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            var currentUniverse = originUniverseId;
                            var previousUniverse = org.kevoree.modeling.KConfig.NULL_LONG;
                            var divergenceTime = objUniverseTree.get(currentUniverse);
                            while (currentUniverse != previousUniverse) {
                                if (divergenceTime != org.kevoree.modeling.KConfig.NULL_LONG) {
                                    if (divergenceTime <= rangeMin) {
                                        collected.put(collected.size(), currentUniverse);
                                        break;
                                    }
                                    else {
                                        if (divergenceTime <= rangeMax) {
                                            collected.put(collected.size(), currentUniverse);
                                        }
                                    }
                                }
                                previousUniverse = currentUniverse;
                                currentUniverse = globalTree.get(currentUniverse);
                                divergenceTime = objUniverseTree.get(currentUniverse);
                            }
                            var trimmed = new Array();
                            for (var i = 0; i < collected.size(); i++) {
                                trimmed[i] = collected.get(i);
                            }
                            return trimmed;
                        };
                        return ResolutionHelper;
                    })();
                    manager.ResolutionHelper = ResolutionHelper;
                    var ResolutionResult = (function () {
                        function ResolutionResult() {
                        }
                        return ResolutionResult;
                    })();
                    manager.ResolutionResult = ResolutionResult;
                })(manager = memory.manager || (memory.manager = {}));
                var struct;
                (function (struct) {
                    var map;
                    (function (map) {
                        var IntHashMap = (function () {
                            function IntHashMap(initalCapacity, loadFactor) {
                            }
                            IntHashMap.prototype.clear = function () {
                                for (var p in this) {
                                    if (this.hasOwnProperty(p)) {
                                        delete this[p];
                                    }
                                }
                            };
                            IntHashMap.prototype.get = function (key) {
                                return this[key];
                            };
                            IntHashMap.prototype.put = function (key, pval) {
                                var previousVal = this[key];
                                this[key] = pval;
                                return previousVal;
                            };
                            IntHashMap.prototype.containsKey = function (key) {
                                return this.hasOwnProperty(key);
                            };
                            IntHashMap.prototype.remove = function (key) {
                                var tmp = this[key];
                                delete this[key];
                                return tmp;
                            };
                            IntHashMap.prototype.size = function () {
                                return Object.keys(this).length;
                            };
                            IntHashMap.prototype.each = function (callback) {
                                for (var p in this) {
                                    if (this.hasOwnProperty(p)) {
                                        callback(p, this[p]);
                                    }
                                }
                            };
                            return IntHashMap;
                        })();
                        map.IntHashMap = IntHashMap;
                        var LongHashMap = (function () {
                            function LongHashMap(initalCapacity, loadFactor) {
                            }
                            LongHashMap.prototype.clear = function () {
                                for (var p in this) {
                                    if (this.hasOwnProperty(p)) {
                                        delete this[p];
                                    }
                                }
                            };
                            LongHashMap.prototype.get = function (key) {
                                return this[key];
                            };
                            LongHashMap.prototype.put = function (key, pval) {
                                var previousVal = this[key];
                                this[key] = pval;
                                return previousVal;
                            };
                            LongHashMap.prototype.containsKey = function (key) {
                                return this.hasOwnProperty(key);
                            };
                            LongHashMap.prototype.remove = function (key) {
                                var tmp = this[key];
                                delete this[key];
                                return tmp;
                            };
                            LongHashMap.prototype.size = function () {
                                return Object.keys(this).length;
                            };
                            LongHashMap.prototype.each = function (callback) {
                                for (var p in this) {
                                    if (this.hasOwnProperty(p)) {
                                        callback(p, this[p]);
                                    }
                                }
                            };
                            return LongHashMap;
                        })();
                        map.LongHashMap = LongHashMap;
                        var LongLongHashMap = (function () {
                            function LongLongHashMap(initalCapacity, loadFactor) {
                                this._counter = 0;
                                this._isDirty = false;
                            }
                            LongLongHashMap.prototype.clear = function () {
                                for (var p in this) {
                                    if (this.hasOwnProperty(p) && p.indexOf('_') != 0) {
                                        delete this[p];
                                    }
                                }
                            };
                            LongLongHashMap.prototype.get = function (key) {
                                return this[key];
                            };
                            LongLongHashMap.prototype.put = function (key, pval) {
                                this._isDirty = false;
                                var previousVal = this[key];
                                this[key] = pval;
                                return previousVal;
                            };
                            LongLongHashMap.prototype.containsKey = function (key) {
                                return this.hasOwnProperty(key);
                            };
                            LongLongHashMap.prototype.remove = function (key) {
                                var tmp = this[key];
                                delete this[key];
                                return tmp;
                            };
                            LongLongHashMap.prototype.size = function () {
                                return Object.keys(this).length - 2;
                            };
                            LongLongHashMap.prototype.each = function (callback) {
                                for (var p in this) {
                                    if (this.hasOwnProperty(p) && p.indexOf('_') != 0) {
                                        callback(p, this[p]);
                                    }
                                }
                            };
                            LongLongHashMap.prototype.counter = function () {
                                return this._counter;
                            };
                            LongLongHashMap.prototype.inc = function () {
                                this._counter++;
                            };
                            LongLongHashMap.prototype.dec = function () {
                                this._counter--;
                            };
                            LongLongHashMap.prototype.isDirty = function () {
                                return this._isDirty;
                            };
                            LongLongHashMap.prototype.setClean = function () {
                                this._isDirty = false;
                            };
                            LongLongHashMap.prototype.setDirty = function () {
                                this._isDirty = true;
                            };
                            LongLongHashMap.prototype.serialize = function (m) {
                                var buffer = "" + this.size();
                                this.each(function (key, value) {
                                    buffer = buffer + LongLongHashMap.CHUNK_SEP + key + LongLongHashMap.ELEMENT_SEP + value;
                                });
                                return buffer;
                            };
                            LongLongHashMap.prototype.unserialize = function (key, payload, metaModel) {
                                if (payload == null || payload.length == 0) {
                                    return;
                                }
                                var cursor = 0;
                                while (cursor < payload.length && payload.charAt(cursor) != LongLongHashMap.CHUNK_SEP) {
                                    cursor++;
                                }
                                var nbElement = java.lang.Integer.parseInt(payload.substring(0, cursor));
                                while (cursor < payload.length) {
                                    cursor++;
                                    var beginChunk = cursor;
                                    while (cursor < payload.length && payload.charAt(cursor) != LongLongHashMap.ELEMENT_SEP) {
                                        cursor++;
                                    }
                                    var middleChunk = cursor;
                                    while (cursor < payload.length && payload.charAt(cursor) != LongLongHashMap.CHUNK_SEP) {
                                        cursor++;
                                    }
                                    var loopKey = java.lang.Long.parseLong(payload.substring(beginChunk, middleChunk));
                                    var loopVal = java.lang.Long.parseLong(payload.substring(middleChunk + 1, cursor));
                                    this.put(loopKey, loopVal);
                                }
                                this._isDirty = false;
                            };
                            LongLongHashMap.ELEMENT_SEP = ',';
                            LongLongHashMap.CHUNK_SEP = '/';
                            return LongLongHashMap;
                        })();
                        map.LongLongHashMap = LongLongHashMap;
                        var StringHashMap = (function () {
                            function StringHashMap(initalCapacity, loadFactor) {
                            }
                            StringHashMap.prototype.clear = function () {
                                for (var p in this) {
                                    if (this.hasOwnProperty(p)) {
                                        delete this[p];
                                    }
                                }
                            };
                            StringHashMap.prototype.get = function (key) {
                                return this[key];
                            };
                            StringHashMap.prototype.put = function (key, pval) {
                                var previousVal = this[key];
                                this[key] = pval;
                                return previousVal;
                            };
                            StringHashMap.prototype.containsKey = function (key) {
                                return this.hasOwnProperty(key);
                            };
                            StringHashMap.prototype.remove = function (key) {
                                var tmp = this[key];
                                delete this[key];
                                return tmp;
                            };
                            StringHashMap.prototype.size = function () {
                                return Object.keys(this).length;
                            };
                            StringHashMap.prototype.each = function (callback) {
                                for (var p in this) {
                                    if (this.hasOwnProperty(p)) {
                                        callback(p, this[p]);
                                    }
                                }
                            };
                            return StringHashMap;
                        })();
                        map.StringHashMap = StringHashMap;
                    })(map = struct.map || (struct.map = {}));
                    var segment;
                    (function (segment) {
                        var HeapCacheSegment = (function () {
                            function HeapCacheSegment() {
                                this._counter = 0;
                                this._metaClassIndex = -1;
                                this._modifiedIndexes = null;
                                this._dirty = false;
                            }
                            HeapCacheSegment.prototype.init = function (p_metaClass) {
                                this.raw = new Array();
                                this._metaClassIndex = p_metaClass.index();
                            };
                            HeapCacheSegment.prototype.metaClassIndex = function () {
                                return this._metaClassIndex;
                            };
                            HeapCacheSegment.prototype.isDirty = function () {
                                return this._dirty;
                            };
                            HeapCacheSegment.prototype.serialize = function (metaModel) {
                                return org.kevoree.modeling.memory.manager.JsonRaw.encode(this, org.kevoree.modeling.KConfig.NULL_LONG, metaModel.metaClasses()[this._metaClassIndex], false);
                            };
                            HeapCacheSegment.prototype.modifiedIndexes = function (p_metaClass) {
                                if (this._modifiedIndexes == null) {
                                    return new Array();
                                }
                                else {
                                    var nbModified = 0;
                                    for (var i = 0; i < this._modifiedIndexes.length; i++) {
                                        if (this._modifiedIndexes[i]) {
                                            nbModified = nbModified + 1;
                                        }
                                    }
                                    var result = new Array();
                                    var inserted = 0;
                                    for (var i = 0; i < this._modifiedIndexes.length; i++) {
                                        if (this._modifiedIndexes[i]) {
                                            result[inserted] = i;
                                            inserted = inserted + 1;
                                        }
                                    }
                                    return result;
                                }
                            };
                            HeapCacheSegment.prototype.setClean = function () {
                                this._dirty = false;
                                this._modifiedIndexes = null;
                            };
                            HeapCacheSegment.prototype.setDirty = function () {
                                this._dirty = true;
                            };
                            HeapCacheSegment.prototype.unserialize = function (key, payload, metaModel) {
                                org.kevoree.modeling.memory.manager.JsonRaw.decode(payload, key.time, metaModel, this);
                            };
                            HeapCacheSegment.prototype.counter = function () {
                                return this._counter;
                            };
                            HeapCacheSegment.prototype.inc = function () {
                                this._counter++;
                            };
                            HeapCacheSegment.prototype.dec = function () {
                                this._counter--;
                            };
                            HeapCacheSegment.prototype.get = function (index, p_metaClass) {
                                if (this.raw != null) {
                                    return this.raw[index];
                                }
                                else {
                                    return null;
                                }
                            };
                            HeapCacheSegment.prototype.getRef = function (index, p_metaClass) {
                                if (this.raw != null) {
                                    var previousObj = this.raw[index];
                                    if (previousObj != null) {
                                        try {
                                            return previousObj;
                                        }
                                        catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e = $ex$;
                                                e.printStackTrace();
                                                this.raw[index] = null;
                                                return null;
                                            }
                                        }
                                    }
                                    else {
                                        return null;
                                    }
                                }
                                else {
                                    return null;
                                }
                            };
                            HeapCacheSegment.prototype.addRef = function (index, newRef, metaClass) {
                                if (this.raw != null) {
                                    var previous = this.raw[index];
                                    if (previous == null) {
                                        previous = new Array();
                                        previous[0] = newRef;
                                    }
                                    else {
                                        for (var i = 0; i < previous.length; i++) {
                                            if (previous[i] == newRef) {
                                                return false;
                                            }
                                        }
                                        var incArray = new Array();
                                        System.arraycopy(previous, 0, incArray, 0, previous.length);
                                        incArray[previous.length] = newRef;
                                        previous = incArray;
                                    }
                                    this.raw[index] = previous;
                                    if (this._modifiedIndexes == null) {
                                        this._modifiedIndexes = new Array();
                                    }
                                    this._modifiedIndexes[index] = true;
                                    this._dirty = true;
                                    return true;
                                }
                                return false;
                            };
                            HeapCacheSegment.prototype.removeRef = function (index, newRef, metaClass) {
                                if (this.raw != null) {
                                    var previous = this.raw[index];
                                    if (previous != null) {
                                        var indexToRemove = -1;
                                        for (var i = 0; i < previous.length; i++) {
                                            if (previous[i] == newRef) {
                                                indexToRemove = i;
                                                break;
                                            }
                                        }
                                        if (indexToRemove != -1) {
                                            var newArray = new Array();
                                            System.arraycopy(previous, 0, newArray, 0, indexToRemove);
                                            System.arraycopy(previous, indexToRemove + 1, newArray, indexToRemove, previous.length - indexToRemove - 1);
                                            this.raw[index] = newArray;
                                            if (this._modifiedIndexes == null) {
                                                this._modifiedIndexes = new Array();
                                            }
                                            this._modifiedIndexes[index] = true;
                                            this._dirty = true;
                                        }
                                    }
                                }
                                return false;
                            };
                            HeapCacheSegment.prototype.set = function (index, content, p_metaClass) {
                                this.raw[index] = content;
                                this._dirty = true;
                                if (this._modifiedIndexes == null) {
                                    this._modifiedIndexes = new Array();
                                }
                                this._modifiedIndexes[index] = true;
                            };
                            HeapCacheSegment.prototype.clone = function (p_metaClass) {
                                if (this.raw == null) {
                                    return new org.kevoree.modeling.memory.struct.segment.HeapCacheSegment();
                                }
                                else {
                                    var cloned = new Array();
                                    for (var i = 0; i < this.raw.length; i++) {
                                        var resolved = this.raw[i];
                                        if (resolved != null) {
                                            if (resolved instanceof org.kevoree.modeling.KInferState) {
                                                cloned[i] = resolved.cloneState();
                                            }
                                            else {
                                                cloned[i] = resolved;
                                            }
                                        }
                                    }
                                    var clonedEntry = new org.kevoree.modeling.memory.struct.segment.HeapCacheSegment();
                                    clonedEntry._dirty = true;
                                    clonedEntry.raw = cloned;
                                    clonedEntry._metaClassIndex = this._metaClassIndex;
                                    return clonedEntry;
                                }
                            };
                            return HeapCacheSegment;
                        })();
                        segment.HeapCacheSegment = HeapCacheSegment;
                    })(segment = struct.segment || (struct.segment = {}));
                    var tree;
                    (function (tree) {
                        var ooheap;
                        (function (ooheap) {
                            var LongTreeNode = (function () {
                                function LongTreeNode(key, value, color, left, right) {
                                    this.parent = null;
                                    this.key = key;
                                    this.value = value;
                                    this.color = color;
                                    this.left = left;
                                    this.right = right;
                                    if (left != null) {
                                        left.parent = this;
                                    }
                                    if (right != null) {
                                        right.parent = this;
                                    }
                                    this.parent = null;
                                }
                                LongTreeNode.prototype.grandparent = function () {
                                    if (this.parent != null) {
                                        return this.parent.parent;
                                    }
                                    else {
                                        return null;
                                    }
                                };
                                LongTreeNode.prototype.sibling = function () {
                                    if (this.parent == null) {
                                        return null;
                                    }
                                    else {
                                        if (this == this.parent.left) {
                                            return this.parent.right;
                                        }
                                        else {
                                            return this.parent.left;
                                        }
                                    }
                                };
                                LongTreeNode.prototype.uncle = function () {
                                    if (this.parent != null) {
                                        return this.parent.sibling();
                                    }
                                    else {
                                        return null;
                                    }
                                };
                                LongTreeNode.prototype.getLeft = function () {
                                    return this.left;
                                };
                                LongTreeNode.prototype.setLeft = function (left) {
                                    this.left = left;
                                };
                                LongTreeNode.prototype.getRight = function () {
                                    return this.right;
                                };
                                LongTreeNode.prototype.setRight = function (right) {
                                    this.right = right;
                                };
                                LongTreeNode.prototype.getParent = function () {
                                    return this.parent;
                                };
                                LongTreeNode.prototype.setParent = function (parent) {
                                    this.parent = parent;
                                };
                                LongTreeNode.prototype.serialize = function (builder) {
                                    builder.append("|");
                                    if (this.color == true) {
                                        builder.append(LongTreeNode.BLACK);
                                    }
                                    else {
                                        builder.append(LongTreeNode.RED);
                                    }
                                    builder.append(this.key);
                                    builder.append("@");
                                    builder.append(this.value);
                                    if (this.left == null && this.right == null) {
                                        builder.append("%");
                                    }
                                    else {
                                        if (this.left != null) {
                                            this.left.serialize(builder);
                                        }
                                        else {
                                            builder.append("#");
                                        }
                                        if (this.right != null) {
                                            this.right.serialize(builder);
                                        }
                                        else {
                                            builder.append("#");
                                        }
                                    }
                                };
                                LongTreeNode.prototype.next = function () {
                                    var p = this;
                                    if (p.right != null) {
                                        p = p.right;
                                        while (p.left != null) {
                                            p = p.left;
                                        }
                                        return p;
                                    }
                                    else {
                                        if (p.parent != null) {
                                            if (p == p.parent.left) {
                                                return p.parent;
                                            }
                                            else {
                                                while (p.parent != null && p == p.parent.right) {
                                                    p = p.parent;
                                                }
                                                return p.parent;
                                            }
                                        }
                                        else {
                                            return null;
                                        }
                                    }
                                };
                                LongTreeNode.prototype.previous = function () {
                                    var p = this;
                                    if (p.left != null) {
                                        p = p.left;
                                        while (p.right != null) {
                                            p = p.right;
                                        }
                                        return p;
                                    }
                                    else {
                                        if (p.parent != null) {
                                            if (p == p.parent.right) {
                                                return p.parent;
                                            }
                                            else {
                                                while (p.parent != null && p == p.parent.left) {
                                                    p = p.parent;
                                                }
                                                return p.parent;
                                            }
                                        }
                                        else {
                                            return null;
                                        }
                                    }
                                };
                                LongTreeNode.unserialize = function (ctx) {
                                    return org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode.internal_unserialize(true, ctx);
                                };
                                LongTreeNode.internal_unserialize = function (rightBranch, ctx) {
                                    if (ctx.index >= ctx.payload.length) {
                                        return null;
                                    }
                                    var ch = ctx.payload.charAt(ctx.index);
                                    if (ch == '%') {
                                        if (rightBranch) {
                                            ctx.index = ctx.index + 1;
                                        }
                                        return null;
                                    }
                                    if (ch == '#') {
                                        ctx.index = ctx.index + 1;
                                        return null;
                                    }
                                    if (ch != '|') {
                                        throw new java.lang.Exception("Error while loading BTree");
                                    }
                                    ctx.index = ctx.index + 1;
                                    ch = ctx.payload.charAt(ctx.index);
                                    var colorLoaded = true;
                                    if (ch == LongTreeNode.RED) {
                                        colorLoaded = false;
                                    }
                                    ctx.index = ctx.index + 1;
                                    ch = ctx.payload.charAt(ctx.index);
                                    var i = 0;
                                    while (ctx.index + 1 < ctx.payload.length && ch != '|' && ch != '#' && ch != '%' && ch != '@') {
                                        ctx.buffer[i] = ch;
                                        i++;
                                        ctx.index = ctx.index + 1;
                                        ch = ctx.payload.charAt(ctx.index);
                                    }
                                    if (ch != '|' && ch != '#' && ch != '%' && ch != '@') {
                                        ctx.buffer[i] = ch;
                                        i++;
                                    }
                                    var key = java.lang.Long.parseLong(StringUtils.copyValueOf(ctx.buffer, 0, i));
                                    i = 0;
                                    ctx.index = ctx.index + 1;
                                    ch = ctx.payload.charAt(ctx.index);
                                    while (ctx.index + 1 < ctx.payload.length && ch != '|' && ch != '#' && ch != '%' && ch != '@') {
                                        ctx.buffer[i] = ch;
                                        i++;
                                        ctx.index = ctx.index + 1;
                                        ch = ctx.payload.charAt(ctx.index);
                                    }
                                    if (ch != '|' && ch != '#' && ch != '%' && ch != '@') {
                                        ctx.buffer[i] = ch;
                                        i++;
                                    }
                                    var value = java.lang.Long.parseLong(StringUtils.copyValueOf(ctx.buffer, 0, i));
                                    var p = new org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode(key, value, colorLoaded, null, null);
                                    var left = org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode.internal_unserialize(false, ctx);
                                    if (left != null) {
                                        left.setParent(p);
                                    }
                                    var right = org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode.internal_unserialize(true, ctx);
                                    if (right != null) {
                                        right.setParent(p);
                                    }
                                    p.setLeft(left);
                                    p.setRight(right);
                                    return p;
                                };
                                LongTreeNode.BLACK = '0';
                                LongTreeNode.RED = '2';
                                return LongTreeNode;
                            })();
                            ooheap.LongTreeNode = LongTreeNode;
                            var OOKLongLongTree = (function () {
                                function OOKLongLongTree() {
                                    this.root = null;
                                    this._size = 0;
                                    this._dirty = false;
                                    this._counter = 0;
                                    this._previousOrEqualsCacheValues = null;
                                    this._lookupCacheValues = null;
                                    this._lookupCacheValues = new Array();
                                    this._previousOrEqualsCacheValues = new Array();
                                    this._previousOrEqualsNextCacheElem = 0;
                                    this._lookupNextCacheElem = 0;
                                }
                                OOKLongLongTree.prototype.size = function () {
                                    return this._size;
                                };
                                OOKLongLongTree.prototype.counter = function () {
                                    return this._counter;
                                };
                                OOKLongLongTree.prototype.inc = function () {
                                    this._counter++;
                                };
                                OOKLongLongTree.prototype.dec = function () {
                                    this._counter--;
                                };
                                OOKLongLongTree.prototype.toString = function () {
                                    return this.serialize(null);
                                };
                                OOKLongLongTree.prototype.isDirty = function () {
                                    return this._dirty;
                                };
                                OOKLongLongTree.prototype.setDirty = function () {
                                    this._dirty = true;
                                };
                                OOKLongLongTree.prototype.serialize = function (metaModel) {
                                    var builder = new java.lang.StringBuilder();
                                    builder.append(this._size);
                                    if (this.root != null) {
                                        this.root.serialize(builder);
                                    }
                                    return builder.toString();
                                };
                                OOKLongLongTree.prototype.tryPreviousOrEqualsCache = function (key) {
                                    if (this._previousOrEqualsCacheValues != null) {
                                        for (var i = 0; i < this._previousOrEqualsNextCacheElem; i++) {
                                            if (this._previousOrEqualsCacheValues[i] != null && key == this._previousOrEqualsCacheValues[i].key) {
                                                return this._previousOrEqualsCacheValues[i];
                                            }
                                        }
                                    }
                                    return null;
                                };
                                OOKLongLongTree.prototype.tryLookupCache = function (key) {
                                    if (this._lookupCacheValues != null) {
                                        for (var i = 0; i < this._lookupNextCacheElem; i++) {
                                            if (this._lookupCacheValues[i] != null && key == this._lookupCacheValues[i].key) {
                                                return this._lookupCacheValues[i];
                                            }
                                        }
                                    }
                                    return null;
                                };
                                OOKLongLongTree.prototype.resetCache = function () {
                                    this._previousOrEqualsNextCacheElem = 0;
                                    this._lookupNextCacheElem = 0;
                                };
                                OOKLongLongTree.prototype.putInPreviousOrEqualsCache = function (resolved) {
                                    if (this._previousOrEqualsNextCacheElem == org.kevoree.modeling.KConfig.TREE_CACHE_SIZE) {
                                        this._previousOrEqualsNextCacheElem = 0;
                                    }
                                    this._previousOrEqualsCacheValues[this._previousOrEqualsNextCacheElem] = resolved;
                                    this._previousOrEqualsNextCacheElem++;
                                };
                                OOKLongLongTree.prototype.putInLookupCache = function (resolved) {
                                    if (this._lookupNextCacheElem == org.kevoree.modeling.KConfig.TREE_CACHE_SIZE) {
                                        this._lookupNextCacheElem = 0;
                                    }
                                    this._lookupCacheValues[this._lookupNextCacheElem] = resolved;
                                    this._lookupNextCacheElem++;
                                };
                                OOKLongLongTree.prototype.setClean = function () {
                                    this._dirty = false;
                                };
                                OOKLongLongTree.prototype.unserialize = function (key, payload, metaModel) {
                                    if (payload == null || payload.length == 0) {
                                        return;
                                    }
                                    var i = 0;
                                    var buffer = new java.lang.StringBuilder();
                                    var ch = payload.charAt(i);
                                    while (i < payload.length && ch != '|') {
                                        buffer.append(ch);
                                        i = i + 1;
                                        ch = payload.charAt(i);
                                    }
                                    this._size = java.lang.Integer.parseInt(buffer.toString());
                                    var ctx = new org.kevoree.modeling.memory.struct.tree.ooheap.TreeReaderContext();
                                    ctx.index = i;
                                    ctx.payload = payload;
                                    ctx.buffer = new Array();
                                    this.root = org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode.unserialize(ctx);
                                    this._dirty = false;
                                    this.resetCache();
                                };
                                OOKLongLongTree.prototype.lookupValue = function (key) {
                                    var result = this.internal_lookup(key);
                                    if (result != null) {
                                        return result.value;
                                    }
                                    else {
                                        return org.kevoree.modeling.KConfig.NULL_LONG;
                                    }
                                };
                                OOKLongLongTree.prototype.internal_lookup = function (key) {
                                    var n = this.tryLookupCache(key);
                                    if (n != null) {
                                        return n;
                                    }
                                    n = this.root;
                                    if (n == null) {
                                        return null;
                                    }
                                    while (n != null) {
                                        if (key == n.key) {
                                            this.putInLookupCache(n);
                                            return n;
                                        }
                                        else {
                                            if (key < n.key) {
                                                n = n.getLeft();
                                            }
                                            else {
                                                n = n.getRight();
                                            }
                                        }
                                    }
                                    this.putInLookupCache(null);
                                    return n;
                                };
                                OOKLongLongTree.prototype.previousOrEqualValue = function (key) {
                                    var result = this.internal_previousOrEqual(key);
                                    if (result != null) {
                                        return result.value;
                                    }
                                    else {
                                        return org.kevoree.modeling.KConfig.NULL_LONG;
                                    }
                                };
                                OOKLongLongTree.prototype.internal_previousOrEqual = function (key) {
                                    var p = this.tryPreviousOrEqualsCache(key);
                                    if (p != null) {
                                        return p;
                                    }
                                    p = this.root;
                                    if (p == null) {
                                        return null;
                                    }
                                    while (p != null) {
                                        if (key == p.key) {
                                            this.putInPreviousOrEqualsCache(p);
                                            return p;
                                        }
                                        if (key > p.key) {
                                            if (p.getRight() != null) {
                                                p = p.getRight();
                                            }
                                            else {
                                                this.putInPreviousOrEqualsCache(p);
                                                return p;
                                            }
                                        }
                                        else {
                                            if (p.getLeft() != null) {
                                                p = p.getLeft();
                                            }
                                            else {
                                                var parent = p.getParent();
                                                var ch = p;
                                                while (parent != null && ch == parent.getLeft()) {
                                                    ch = parent;
                                                    parent = parent.getParent();
                                                }
                                                this.putInPreviousOrEqualsCache(parent);
                                                return parent;
                                            }
                                        }
                                    }
                                    return null;
                                };
                                OOKLongLongTree.prototype.nextOrEqual = function (key) {
                                    var p = this.root;
                                    if (p == null) {
                                        return null;
                                    }
                                    while (p != null) {
                                        if (key == p.key) {
                                            return p;
                                        }
                                        if (key < p.key) {
                                            if (p.getLeft() != null) {
                                                p = p.getLeft();
                                            }
                                            else {
                                                return p;
                                            }
                                        }
                                        else {
                                            if (p.getRight() != null) {
                                                p = p.getRight();
                                            }
                                            else {
                                                var parent = p.getParent();
                                                var ch = p;
                                                while (parent != null && ch == parent.getRight()) {
                                                    ch = parent;
                                                    parent = parent.getParent();
                                                }
                                                return parent;
                                            }
                                        }
                                    }
                                    return null;
                                };
                                OOKLongLongTree.prototype.previous = function (key) {
                                    var p = this.root;
                                    if (p == null) {
                                        return null;
                                    }
                                    while (p != null) {
                                        if (key < p.key) {
                                            if (p.getLeft() != null) {
                                                p = p.getLeft();
                                            }
                                            else {
                                                return p.previous();
                                            }
                                        }
                                        else {
                                            if (key > p.key) {
                                                if (p.getRight() != null) {
                                                    p = p.getRight();
                                                }
                                                else {
                                                    return p;
                                                }
                                            }
                                            else {
                                                return p.previous();
                                            }
                                        }
                                    }
                                    return null;
                                };
                                OOKLongLongTree.prototype.next = function (key) {
                                    var p = this.root;
                                    if (p == null) {
                                        return null;
                                    }
                                    while (p != null) {
                                        if (key < p.key) {
                                            if (p.getLeft() != null) {
                                                p = p.getLeft();
                                            }
                                            else {
                                                return p;
                                            }
                                        }
                                        else {
                                            if (key > p.key) {
                                                if (p.getRight() != null) {
                                                    p = p.getRight();
                                                }
                                                else {
                                                    return p.next();
                                                }
                                            }
                                            else {
                                                return p.next();
                                            }
                                        }
                                    }
                                    return null;
                                };
                                OOKLongLongTree.prototype.first = function () {
                                    var p = this.root;
                                    if (p == null) {
                                        return null;
                                    }
                                    while (p != null) {
                                        if (p.getLeft() != null) {
                                            p = p.getLeft();
                                        }
                                        else {
                                            return p;
                                        }
                                    }
                                    return null;
                                };
                                OOKLongLongTree.prototype.last = function () {
                                    var p = this.root;
                                    if (p == null) {
                                        return null;
                                    }
                                    while (p != null) {
                                        if (p.getRight() != null) {
                                            p = p.getRight();
                                        }
                                        else {
                                            return p;
                                        }
                                    }
                                    return null;
                                };
                                OOKLongLongTree.prototype.rotateLeft = function (n) {
                                    var r = n.getRight();
                                    this.replaceNode(n, r);
                                    n.setRight(r.getLeft());
                                    if (r.getLeft() != null) {
                                        r.getLeft().setParent(n);
                                    }
                                    r.setLeft(n);
                                    n.setParent(r);
                                };
                                OOKLongLongTree.prototype.rotateRight = function (n) {
                                    var l = n.getLeft();
                                    this.replaceNode(n, l);
                                    n.setLeft(l.getRight());
                                    if (l.getRight() != null) {
                                        l.getRight().setParent(n);
                                    }
                                    l.setRight(n);
                                    n.setParent(l);
                                };
                                OOKLongLongTree.prototype.replaceNode = function (oldn, newn) {
                                    if (oldn.getParent() == null) {
                                        this.root = newn;
                                    }
                                    else {
                                        if (oldn == oldn.getParent().getLeft()) {
                                            oldn.getParent().setLeft(newn);
                                        }
                                        else {
                                            oldn.getParent().setRight(newn);
                                        }
                                    }
                                    if (newn != null) {
                                        newn.setParent(oldn.getParent());
                                    }
                                };
                                OOKLongLongTree.prototype.insert = function (key, value) {
                                    this.resetCache();
                                    this._dirty = true;
                                    var insertedNode = new org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode(key, value, false, null, null);
                                    if (this.root == null) {
                                        this._size++;
                                        this.root = insertedNode;
                                    }
                                    else {
                                        var n = this.root;
                                        while (true) {
                                            if (key == n.key) {
                                                n.value = value;
                                                return;
                                            }
                                            else {
                                                if (key < n.key) {
                                                    if (n.getLeft() == null) {
                                                        n.setLeft(insertedNode);
                                                        this._size++;
                                                        break;
                                                    }
                                                    else {
                                                        n = n.getLeft();
                                                    }
                                                }
                                                else {
                                                    if (n.getRight() == null) {
                                                        n.setRight(insertedNode);
                                                        this._size++;
                                                        break;
                                                    }
                                                    else {
                                                        n = n.getRight();
                                                    }
                                                }
                                            }
                                        }
                                        insertedNode.setParent(n);
                                    }
                                    this.insertCase1(insertedNode);
                                };
                                OOKLongLongTree.prototype.insertCase1 = function (n) {
                                    if (n.getParent() == null) {
                                        n.color = true;
                                    }
                                    else {
                                        this.insertCase2(n);
                                    }
                                };
                                OOKLongLongTree.prototype.insertCase2 = function (n) {
                                    if (this.nodeColor(n.getParent()) == true) {
                                        return;
                                    }
                                    else {
                                        this.insertCase3(n);
                                    }
                                };
                                OOKLongLongTree.prototype.insertCase3 = function (n) {
                                    if (this.nodeColor(n.uncle()) == false) {
                                        n.getParent().color = true;
                                        n.uncle().color = true;
                                        n.grandparent().color = false;
                                        this.insertCase1(n.grandparent());
                                    }
                                    else {
                                        this.insertCase4(n);
                                    }
                                };
                                OOKLongLongTree.prototype.insertCase4 = function (n_n) {
                                    var n = n_n;
                                    if (n == n.getParent().getRight() && n.getParent() == n.grandparent().getLeft()) {
                                        this.rotateLeft(n.getParent());
                                        n = n.getLeft();
                                    }
                                    else {
                                        if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getRight()) {
                                            this.rotateRight(n.getParent());
                                            n = n.getRight();
                                        }
                                    }
                                    this.insertCase5(n);
                                };
                                OOKLongLongTree.prototype.insertCase5 = function (n) {
                                    n.getParent().color = true;
                                    n.grandparent().color = false;
                                    if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getLeft()) {
                                        this.rotateRight(n.grandparent());
                                    }
                                    else {
                                        this.rotateLeft(n.grandparent());
                                    }
                                };
                                OOKLongLongTree.prototype.delete = function (key) {
                                    var n = this.internal_lookup(key);
                                    if (n == null) {
                                        return;
                                    }
                                    else {
                                        this._size--;
                                        if (n.getLeft() != null && n.getRight() != null) {
                                            var pred = n.getLeft();
                                            while (pred.getRight() != null) {
                                                pred = pred.getRight();
                                            }
                                            n.key = pred.key;
                                            n.value = pred.value;
                                            n = pred;
                                        }
                                        var child;
                                        if (n.getRight() == null) {
                                            child = n.getLeft();
                                        }
                                        else {
                                            child = n.getRight();
                                        }
                                        if (this.nodeColor(n) == true) {
                                            n.color = this.nodeColor(child);
                                            this.deleteCase1(n);
                                        }
                                        this.replaceNode(n, child);
                                    }
                                };
                                OOKLongLongTree.prototype.deleteCase1 = function (n) {
                                    if (n.getParent() == null) {
                                        return;
                                    }
                                    else {
                                        this.deleteCase2(n);
                                    }
                                };
                                OOKLongLongTree.prototype.deleteCase2 = function (n) {
                                    if (this.nodeColor(n.sibling()) == false) {
                                        n.getParent().color = false;
                                        n.sibling().color = true;
                                        if (n == n.getParent().getLeft()) {
                                            this.rotateLeft(n.getParent());
                                        }
                                        else {
                                            this.rotateRight(n.getParent());
                                        }
                                    }
                                    this.deleteCase3(n);
                                };
                                OOKLongLongTree.prototype.deleteCase3 = function (n) {
                                    if (this.nodeColor(n.getParent()) == true && this.nodeColor(n.sibling()) == true && this.nodeColor(n.sibling().getLeft()) == true && this.nodeColor(n.sibling().getRight()) == true) {
                                        n.sibling().color = false;
                                        this.deleteCase1(n.getParent());
                                    }
                                    else {
                                        this.deleteCase4(n);
                                    }
                                };
                                OOKLongLongTree.prototype.deleteCase4 = function (n) {
                                    if (this.nodeColor(n.getParent()) == false && this.nodeColor(n.sibling()) == true && this.nodeColor(n.sibling().getLeft()) == true && this.nodeColor(n.sibling().getRight()) == true) {
                                        n.sibling().color = false;
                                        n.getParent().color = true;
                                    }
                                    else {
                                        this.deleteCase5(n);
                                    }
                                };
                                OOKLongLongTree.prototype.deleteCase5 = function (n) {
                                    if (n == n.getParent().getLeft() && this.nodeColor(n.sibling()) == true && this.nodeColor(n.sibling().getLeft()) == false && this.nodeColor(n.sibling().getRight()) == true) {
                                        n.sibling().color = false;
                                        n.sibling().getLeft().color = true;
                                        this.rotateRight(n.sibling());
                                    }
                                    else {
                                        if (n == n.getParent().getRight() && this.nodeColor(n.sibling()) == true && this.nodeColor(n.sibling().getRight()) == false && this.nodeColor(n.sibling().getLeft()) == true) {
                                            n.sibling().color = false;
                                            n.sibling().getRight().color = true;
                                            this.rotateLeft(n.sibling());
                                        }
                                    }
                                    this.deleteCase6(n);
                                };
                                OOKLongLongTree.prototype.deleteCase6 = function (n) {
                                    n.sibling().color = this.nodeColor(n.getParent());
                                    n.getParent().color = true;
                                    if (n == n.getParent().getLeft()) {
                                        n.sibling().getRight().color = true;
                                        this.rotateLeft(n.getParent());
                                    }
                                    else {
                                        n.sibling().getLeft().color = true;
                                        this.rotateRight(n.getParent());
                                    }
                                };
                                OOKLongLongTree.prototype.nodeColor = function (n) {
                                    if (n == null) {
                                        return true;
                                    }
                                    else {
                                        return n.color;
                                    }
                                };
                                return OOKLongLongTree;
                            })();
                            ooheap.OOKLongLongTree = OOKLongLongTree;
                            var OOKLongTree = (function () {
                                function OOKLongTree() {
                                    this._size = 0;
                                    this.root = null;
                                    this._previousOrEqualsCacheValues = null;
                                    this._counter = 0;
                                    this._dirty = false;
                                    this._previousOrEqualsCacheValues = new Array();
                                    this._nextCacheElem = 0;
                                }
                                OOKLongTree.prototype.size = function () {
                                    return this._size;
                                };
                                OOKLongTree.prototype.counter = function () {
                                    return this._counter;
                                };
                                OOKLongTree.prototype.inc = function () {
                                    this._counter++;
                                };
                                OOKLongTree.prototype.dec = function () {
                                    this._counter--;
                                };
                                OOKLongTree.prototype.tryPreviousOrEqualsCache = function (key) {
                                    if (this._previousOrEqualsCacheValues != null) {
                                        for (var i = 0; i < this._nextCacheElem; i++) {
                                            if (this._previousOrEqualsCacheValues[i] != null && this._previousOrEqualsCacheValues[i].key == key) {
                                                return this._previousOrEqualsCacheValues[i];
                                            }
                                        }
                                        return null;
                                    }
                                    else {
                                        return null;
                                    }
                                };
                                OOKLongTree.prototype.resetCache = function () {
                                    this._nextCacheElem = 0;
                                };
                                OOKLongTree.prototype.putInPreviousOrEqualsCache = function (resolved) {
                                    if (this._nextCacheElem == org.kevoree.modeling.KConfig.TREE_CACHE_SIZE) {
                                        this._nextCacheElem = 0;
                                    }
                                    this._previousOrEqualsCacheValues[this._nextCacheElem] = resolved;
                                    this._nextCacheElem++;
                                };
                                OOKLongTree.prototype.isDirty = function () {
                                    return this._dirty;
                                };
                                OOKLongTree.prototype.setClean = function () {
                                    this._dirty = false;
                                };
                                OOKLongTree.prototype.setDirty = function () {
                                    this._dirty = true;
                                };
                                OOKLongTree.prototype.serialize = function (metaModel) {
                                    var builder = new java.lang.StringBuilder();
                                    builder.append(this._size);
                                    if (this.root != null) {
                                        this.root.serialize(builder);
                                    }
                                    return builder.toString();
                                };
                                OOKLongTree.prototype.toString = function () {
                                    return this.serialize(null);
                                };
                                OOKLongTree.prototype.unserialize = function (key, payload, metaModel) {
                                    if (payload == null || payload.length == 0) {
                                        return;
                                    }
                                    var i = 0;
                                    var buffer = new java.lang.StringBuilder();
                                    var ch = payload.charAt(i);
                                    while (i < payload.length && ch != '|') {
                                        buffer.append(ch);
                                        i = i + 1;
                                        ch = payload.charAt(i);
                                    }
                                    this._size = java.lang.Integer.parseInt(buffer.toString());
                                    var ctx = new org.kevoree.modeling.memory.struct.tree.ooheap.TreeReaderContext();
                                    ctx.index = i;
                                    ctx.payload = payload;
                                    this.root = org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode.unserialize(ctx);
                                    this.resetCache();
                                };
                                OOKLongTree.prototype.previousOrEqual = function (key) {
                                    var resolvedNode = this.internal_previousOrEqual(key);
                                    if (resolvedNode != null) {
                                        return resolvedNode.key;
                                    }
                                    return org.kevoree.modeling.KConfig.NULL_LONG;
                                };
                                OOKLongTree.prototype.internal_previousOrEqual = function (key) {
                                    var cachedVal = this.tryPreviousOrEqualsCache(key);
                                    if (cachedVal != null) {
                                        return cachedVal;
                                    }
                                    var p = this.root;
                                    if (p == null) {
                                        return null;
                                    }
                                    while (p != null) {
                                        if (key == p.key) {
                                            this.putInPreviousOrEqualsCache(p);
                                            return p;
                                        }
                                        if (key > p.key) {
                                            if (p.getRight() != null) {
                                                p = p.getRight();
                                            }
                                            else {
                                                this.putInPreviousOrEqualsCache(p);
                                                return p;
                                            }
                                        }
                                        else {
                                            if (p.getLeft() != null) {
                                                p = p.getLeft();
                                            }
                                            else {
                                                var parent = p.getParent();
                                                var ch = p;
                                                while (parent != null && ch == parent.getLeft()) {
                                                    ch = parent;
                                                    parent = parent.getParent();
                                                }
                                                this.putInPreviousOrEqualsCache(parent);
                                                return parent;
                                            }
                                        }
                                    }
                                    return null;
                                };
                                OOKLongTree.prototype.nextOrEqual = function (key) {
                                    var p = this.root;
                                    if (p == null) {
                                        return null;
                                    }
                                    while (p != null) {
                                        if (key == p.key) {
                                            return p;
                                        }
                                        if (key < p.key) {
                                            if (p.getLeft() != null) {
                                                p = p.getLeft();
                                            }
                                            else {
                                                return p;
                                            }
                                        }
                                        else {
                                            if (p.getRight() != null) {
                                                p = p.getRight();
                                            }
                                            else {
                                                var parent = p.getParent();
                                                var ch = p;
                                                while (parent != null && ch == parent.getRight()) {
                                                    ch = parent;
                                                    parent = parent.getParent();
                                                }
                                                return parent;
                                            }
                                        }
                                    }
                                    return null;
                                };
                                OOKLongTree.prototype.previous = function (key) {
                                    var p = this.root;
                                    if (p == null) {
                                        return null;
                                    }
                                    while (p != null) {
                                        if (key < p.key) {
                                            if (p.getLeft() != null) {
                                                p = p.getLeft();
                                            }
                                            else {
                                                return p.previous();
                                            }
                                        }
                                        else {
                                            if (key > p.key) {
                                                if (p.getRight() != null) {
                                                    p = p.getRight();
                                                }
                                                else {
                                                    return p;
                                                }
                                            }
                                            else {
                                                return p.previous();
                                            }
                                        }
                                    }
                                    return null;
                                };
                                OOKLongTree.prototype.next = function (key) {
                                    var p = this.root;
                                    if (p == null) {
                                        return null;
                                    }
                                    while (p != null) {
                                        if (key < p.key) {
                                            if (p.getLeft() != null) {
                                                p = p.getLeft();
                                            }
                                            else {
                                                return p;
                                            }
                                        }
                                        else {
                                            if (key > p.key) {
                                                if (p.getRight() != null) {
                                                    p = p.getRight();
                                                }
                                                else {
                                                    return p.next();
                                                }
                                            }
                                            else {
                                                return p.next();
                                            }
                                        }
                                    }
                                    return null;
                                };
                                OOKLongTree.prototype.first = function () {
                                    var p = this.root;
                                    if (p == null) {
                                        return null;
                                    }
                                    while (p != null) {
                                        if (p.getLeft() != null) {
                                            p = p.getLeft();
                                        }
                                        else {
                                            return p;
                                        }
                                    }
                                    return null;
                                };
                                OOKLongTree.prototype.last = function () {
                                    var p = this.root;
                                    if (p == null) {
                                        return null;
                                    }
                                    while (p != null) {
                                        if (p.getRight() != null) {
                                            p = p.getRight();
                                        }
                                        else {
                                            return p;
                                        }
                                    }
                                    return null;
                                };
                                OOKLongTree.prototype.lookup = function (key) {
                                    var n = this.root;
                                    if (n == null) {
                                        return org.kevoree.modeling.KConfig.NULL_LONG;
                                    }
                                    while (n != null) {
                                        if (key == n.key) {
                                            return n.key;
                                        }
                                        else {
                                            if (key < n.key) {
                                                n = n.getLeft();
                                            }
                                            else {
                                                n = n.getRight();
                                            }
                                        }
                                    }
                                    return org.kevoree.modeling.KConfig.NULL_LONG;
                                };
                                OOKLongTree.prototype.range = function (start, end, walker) {
                                    var it = this.internal_previousOrEqual(end);
                                    while (it != null && it.key >= start) {
                                        walker(it.key);
                                        it = it.previous();
                                    }
                                };
                                OOKLongTree.prototype.rotateLeft = function (n) {
                                    var r = n.getRight();
                                    this.replaceNode(n, r);
                                    n.setRight(r.getLeft());
                                    if (r.getLeft() != null) {
                                        r.getLeft().setParent(n);
                                    }
                                    r.setLeft(n);
                                    n.setParent(r);
                                };
                                OOKLongTree.prototype.rotateRight = function (n) {
                                    var l = n.getLeft();
                                    this.replaceNode(n, l);
                                    n.setLeft(l.getRight());
                                    if (l.getRight() != null) {
                                        l.getRight().setParent(n);
                                    }
                                    l.setRight(n);
                                    n.setParent(l);
                                };
                                OOKLongTree.prototype.replaceNode = function (oldn, newn) {
                                    if (oldn.getParent() == null) {
                                        this.root = newn;
                                    }
                                    else {
                                        if (oldn == oldn.getParent().getLeft()) {
                                            oldn.getParent().setLeft(newn);
                                        }
                                        else {
                                            oldn.getParent().setRight(newn);
                                        }
                                    }
                                    if (newn != null) {
                                        newn.setParent(oldn.getParent());
                                    }
                                };
                                OOKLongTree.prototype.insert = function (key) {
                                    this._dirty = true;
                                    var insertedNode;
                                    if (this.root == null) {
                                        this._size++;
                                        insertedNode = new org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode(key, false, null, null);
                                        this.root = insertedNode;
                                    }
                                    else {
                                        var n = this.root;
                                        while (true) {
                                            if (key == n.key) {
                                                this.putInPreviousOrEqualsCache(n);
                                                return;
                                            }
                                            else {
                                                if (key < n.key) {
                                                    if (n.getLeft() == null) {
                                                        insertedNode = new org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode(key, false, null, null);
                                                        n.setLeft(insertedNode);
                                                        this._size++;
                                                        break;
                                                    }
                                                    else {
                                                        n = n.getLeft();
                                                    }
                                                }
                                                else {
                                                    if (n.getRight() == null) {
                                                        insertedNode = new org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode(key, false, null, null);
                                                        n.setRight(insertedNode);
                                                        this._size++;
                                                        break;
                                                    }
                                                    else {
                                                        n = n.getRight();
                                                    }
                                                }
                                            }
                                        }
                                        insertedNode.setParent(n);
                                    }
                                    this.insertCase1(insertedNode);
                                    this.putInPreviousOrEqualsCache(insertedNode);
                                };
                                OOKLongTree.prototype.insertCase1 = function (n) {
                                    if (n.getParent() == null) {
                                        n.color = true;
                                    }
                                    else {
                                        this.insertCase2(n);
                                    }
                                };
                                OOKLongTree.prototype.insertCase2 = function (n) {
                                    if (this.nodeColor(n.getParent()) == true) {
                                        return;
                                    }
                                    else {
                                        this.insertCase3(n);
                                    }
                                };
                                OOKLongTree.prototype.insertCase3 = function (n) {
                                    if (this.nodeColor(n.uncle()) == false) {
                                        n.getParent().color = true;
                                        n.uncle().color = true;
                                        n.grandparent().color = false;
                                        this.insertCase1(n.grandparent());
                                    }
                                    else {
                                        this.insertCase4(n);
                                    }
                                };
                                OOKLongTree.prototype.insertCase4 = function (n_n) {
                                    var n = n_n;
                                    if (n == n.getParent().getRight() && n.getParent() == n.grandparent().getLeft()) {
                                        this.rotateLeft(n.getParent());
                                        n = n.getLeft();
                                    }
                                    else {
                                        if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getRight()) {
                                            this.rotateRight(n.getParent());
                                            n = n.getRight();
                                        }
                                    }
                                    this.insertCase5(n);
                                };
                                OOKLongTree.prototype.insertCase5 = function (n) {
                                    n.getParent().color = true;
                                    n.grandparent().color = false;
                                    if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getLeft()) {
                                        this.rotateRight(n.grandparent());
                                    }
                                    else {
                                        this.rotateLeft(n.grandparent());
                                    }
                                };
                                OOKLongTree.prototype.delete = function (key) {
                                    var n = null;
                                    var nn = this.root;
                                    while (nn != null) {
                                        if (key == nn.key) {
                                            n = nn;
                                        }
                                        else {
                                            if (key < nn.key) {
                                                nn = nn.getLeft();
                                            }
                                            else {
                                                nn = nn.getRight();
                                            }
                                        }
                                    }
                                    if (n == null) {
                                        return;
                                    }
                                    else {
                                        this._size--;
                                        if (n.getLeft() != null && n.getRight() != null) {
                                            var pred = n.getLeft();
                                            while (pred.getRight() != null) {
                                                pred = pred.getRight();
                                            }
                                            n.key = pred.key;
                                            n = pred;
                                        }
                                        var child;
                                        if (n.getRight() == null) {
                                            child = n.getLeft();
                                        }
                                        else {
                                            child = n.getRight();
                                        }
                                        if (this.nodeColor(n) == true) {
                                            n.color = this.nodeColor(child);
                                            this.deleteCase1(n);
                                        }
                                        this.replaceNode(n, child);
                                    }
                                };
                                OOKLongTree.prototype.deleteCase1 = function (n) {
                                    if (n.getParent() == null) {
                                        return;
                                    }
                                    else {
                                        this.deleteCase2(n);
                                    }
                                };
                                OOKLongTree.prototype.deleteCase2 = function (n) {
                                    if (this.nodeColor(n.sibling()) == false) {
                                        n.getParent().color = false;
                                        n.sibling().color = true;
                                        if (n == n.getParent().getLeft()) {
                                            this.rotateLeft(n.getParent());
                                        }
                                        else {
                                            this.rotateRight(n.getParent());
                                        }
                                    }
                                    this.deleteCase3(n);
                                };
                                OOKLongTree.prototype.deleteCase3 = function (n) {
                                    if (this.nodeColor(n.getParent()) == true && this.nodeColor(n.sibling()) == true && this.nodeColor(n.sibling().getLeft()) == true && this.nodeColor(n.sibling().getRight()) == true) {
                                        n.sibling().color = false;
                                        this.deleteCase1(n.getParent());
                                    }
                                    else {
                                        this.deleteCase4(n);
                                    }
                                };
                                OOKLongTree.prototype.deleteCase4 = function (n) {
                                    if (this.nodeColor(n.getParent()) == false && this.nodeColor(n.sibling()) == true && this.nodeColor(n.sibling().getLeft()) == true && this.nodeColor(n.sibling().getRight()) == true) {
                                        n.sibling().color = false;
                                        n.getParent().color = true;
                                    }
                                    else {
                                        this.deleteCase5(n);
                                    }
                                };
                                OOKLongTree.prototype.deleteCase5 = function (n) {
                                    if (n == n.getParent().getLeft() && this.nodeColor(n.sibling()) == true && this.nodeColor(n.sibling().getLeft()) == false && this.nodeColor(n.sibling().getRight()) == true) {
                                        n.sibling().color = false;
                                        n.sibling().getLeft().color = true;
                                        this.rotateRight(n.sibling());
                                    }
                                    else {
                                        if (n == n.getParent().getRight() && this.nodeColor(n.sibling()) == true && this.nodeColor(n.sibling().getRight()) == false && this.nodeColor(n.sibling().getLeft()) == true) {
                                            n.sibling().color = false;
                                            n.sibling().getRight().color = true;
                                            this.rotateLeft(n.sibling());
                                        }
                                    }
                                    this.deleteCase6(n);
                                };
                                OOKLongTree.prototype.deleteCase6 = function (n) {
                                    n.sibling().color = this.nodeColor(n.getParent());
                                    n.getParent().color = true;
                                    if (n == n.getParent().getLeft()) {
                                        n.sibling().getRight().color = true;
                                        this.rotateLeft(n.getParent());
                                    }
                                    else {
                                        n.sibling().getLeft().color = true;
                                        this.rotateRight(n.getParent());
                                    }
                                };
                                OOKLongTree.prototype.nodeColor = function (n) {
                                    if (n == null) {
                                        return true;
                                    }
                                    else {
                                        return n.color;
                                    }
                                };
                                return OOKLongTree;
                            })();
                            ooheap.OOKLongTree = OOKLongTree;
                            var TreeNode = (function () {
                                function TreeNode(key, color, left, right) {
                                    this.parent = null;
                                    this.key = key;
                                    this.color = color;
                                    this.left = left;
                                    this.right = right;
                                    if (left != null) {
                                        left.parent = this;
                                    }
                                    if (right != null) {
                                        right.parent = this;
                                    }
                                    this.parent = null;
                                }
                                TreeNode.prototype.getKey = function () {
                                    return this.key;
                                };
                                TreeNode.prototype.grandparent = function () {
                                    if (this.parent != null) {
                                        return this.parent.parent;
                                    }
                                    else {
                                        return null;
                                    }
                                };
                                TreeNode.prototype.sibling = function () {
                                    if (this.parent == null) {
                                        return null;
                                    }
                                    else {
                                        if (this == this.parent.left) {
                                            return this.parent.right;
                                        }
                                        else {
                                            return this.parent.left;
                                        }
                                    }
                                };
                                TreeNode.prototype.uncle = function () {
                                    if (this.parent != null) {
                                        return this.parent.sibling();
                                    }
                                    else {
                                        return null;
                                    }
                                };
                                TreeNode.prototype.getLeft = function () {
                                    return this.left;
                                };
                                TreeNode.prototype.setLeft = function (left) {
                                    this.left = left;
                                };
                                TreeNode.prototype.getRight = function () {
                                    return this.right;
                                };
                                TreeNode.prototype.setRight = function (right) {
                                    this.right = right;
                                };
                                TreeNode.prototype.getParent = function () {
                                    return this.parent;
                                };
                                TreeNode.prototype.setParent = function (parent) {
                                    this.parent = parent;
                                };
                                TreeNode.prototype.serialize = function (builder) {
                                    builder.append("|");
                                    if (this.color == true) {
                                        builder.append(TreeNode.BLACK);
                                    }
                                    else {
                                        builder.append(TreeNode.RED);
                                    }
                                    builder.append(this.key);
                                    if (this.left == null && this.right == null) {
                                        builder.append("%");
                                    }
                                    else {
                                        if (this.left != null) {
                                            this.left.serialize(builder);
                                        }
                                        else {
                                            builder.append("#");
                                        }
                                        if (this.right != null) {
                                            this.right.serialize(builder);
                                        }
                                        else {
                                            builder.append("#");
                                        }
                                    }
                                };
                                TreeNode.prototype.next = function () {
                                    var p = this;
                                    if (p.right != null) {
                                        p = p.right;
                                        while (p.left != null) {
                                            p = p.left;
                                        }
                                        return p;
                                    }
                                    else {
                                        if (p.parent != null) {
                                            if (p == p.parent.left) {
                                                return p.parent;
                                            }
                                            else {
                                                while (p.parent != null && p == p.parent.right) {
                                                    p = p.parent;
                                                }
                                                return p.parent;
                                            }
                                        }
                                        else {
                                            return null;
                                        }
                                    }
                                };
                                TreeNode.prototype.previous = function () {
                                    var p = this;
                                    if (p.left != null) {
                                        p = p.left;
                                        while (p.right != null) {
                                            p = p.right;
                                        }
                                        return p;
                                    }
                                    else {
                                        if (p.parent != null) {
                                            if (p == p.parent.right) {
                                                return p.parent;
                                            }
                                            else {
                                                while (p.parent != null && p == p.parent.left) {
                                                    p = p.parent;
                                                }
                                                return p.parent;
                                            }
                                        }
                                        else {
                                            return null;
                                        }
                                    }
                                };
                                TreeNode.unserialize = function (ctx) {
                                    return org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode.internal_unserialize(true, ctx);
                                };
                                TreeNode.internal_unserialize = function (rightBranch, ctx) {
                                    if (ctx.index >= ctx.payload.length) {
                                        return null;
                                    }
                                    var tokenBuild = new java.lang.StringBuilder();
                                    var ch = ctx.payload.charAt(ctx.index);
                                    if (ch == '%') {
                                        if (rightBranch) {
                                            ctx.index = ctx.index + 1;
                                        }
                                        return null;
                                    }
                                    if (ch == '#') {
                                        ctx.index = ctx.index + 1;
                                        return null;
                                    }
                                    if (ch != '|') {
                                        throw new java.lang.Exception("Error while loading BTree");
                                    }
                                    ctx.index = ctx.index + 1;
                                    ch = ctx.payload.charAt(ctx.index);
                                    var colorLoaded;
                                    if (ch == org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode.BLACK) {
                                        colorLoaded = true;
                                    }
                                    else {
                                        colorLoaded = false;
                                    }
                                    ctx.index = ctx.index + 1;
                                    ch = ctx.payload.charAt(ctx.index);
                                    while (ctx.index + 1 < ctx.payload.length && ch != '|' && ch != '#' && ch != '%') {
                                        tokenBuild.append(ch);
                                        ctx.index = ctx.index + 1;
                                        ch = ctx.payload.charAt(ctx.index);
                                    }
                                    if (ch != '|' && ch != '#' && ch != '%') {
                                        tokenBuild.append(ch);
                                    }
                                    var p = new org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode(java.lang.Long.parseLong(tokenBuild.toString()), colorLoaded, null, null);
                                    var left = org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode.internal_unserialize(false, ctx);
                                    if (left != null) {
                                        left.setParent(p);
                                    }
                                    var right = org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode.internal_unserialize(true, ctx);
                                    if (right != null) {
                                        right.setParent(p);
                                    }
                                    p.setLeft(left);
                                    p.setRight(right);
                                    return p;
                                };
                                TreeNode.BLACK = '0';
                                TreeNode.RED = '1';
                                return TreeNode;
                            })();
                            ooheap.TreeNode = TreeNode;
                            var TreeReaderContext = (function () {
                                function TreeReaderContext() {
                                }
                                return TreeReaderContext;
                            })();
                            ooheap.TreeReaderContext = TreeReaderContext;
                        })(ooheap = tree.ooheap || (tree.ooheap = {}));
                    })(tree = struct.tree || (struct.tree = {}));
                })(struct = memory.struct || (memory.struct = {}));
            })(memory = modeling.memory || (modeling.memory = {}));
            var meta;
            (function (meta) {
                var MetaInferClass = (function () {
                    function MetaInferClass() {
                        this._attributes = null;
                        this._metaReferences = new Array();
                        this._attributes = new Array();
                        this._attributes[0] = new org.kevoree.modeling.abs.AbstractMetaAttribute("RAW", 0, -1, false, org.kevoree.modeling.meta.PrimitiveTypes.STRING, new org.kevoree.modeling.extrapolation.DiscreteExtrapolation());
                        this._attributes[1] = new org.kevoree.modeling.abs.AbstractMetaAttribute("CACHE", 1, -1, false, org.kevoree.modeling.meta.PrimitiveTypes.TRANSIENT, new org.kevoree.modeling.extrapolation.DiscreteExtrapolation());
                    }
                    MetaInferClass.getInstance = function () {
                        if (MetaInferClass._INSTANCE == null) {
                            MetaInferClass._INSTANCE = new org.kevoree.modeling.meta.MetaInferClass();
                        }
                        return MetaInferClass._INSTANCE;
                    };
                    MetaInferClass.prototype.getRaw = function () {
                        return this._attributes[0];
                    };
                    MetaInferClass.prototype.getCache = function () {
                        return this._attributes[1];
                    };
                    MetaInferClass.prototype.metaElements = function () {
                        return new Array();
                    };
                    MetaInferClass.prototype.meta = function (index) {
                        if (index == 0 || index == 1) {
                            return this._attributes[index];
                        }
                        else {
                            return null;
                        }
                    };
                    MetaInferClass.prototype.metaAttributes = function () {
                        return this._attributes;
                    };
                    MetaInferClass.prototype.metaReferences = function () {
                        return this._metaReferences;
                    };
                    MetaInferClass.prototype.metaByName = function (name) {
                        return this.attribute(name);
                    };
                    MetaInferClass.prototype.attribute = function (name) {
                        if (name == null) {
                            return null;
                        }
                        else {
                            if (name.equals(this._attributes[0].metaName())) {
                                return this._attributes[0];
                            }
                            else {
                                if (name.equals(this._attributes[1].metaName())) {
                                    return this._attributes[1];
                                }
                                else {
                                    return null;
                                }
                            }
                        }
                    };
                    MetaInferClass.prototype.reference = function (name) {
                        return null;
                    };
                    MetaInferClass.prototype.operation = function (name) {
                        return null;
                    };
                    MetaInferClass.prototype.metaName = function () {
                        return "KInfer";
                    };
                    MetaInferClass.prototype.metaType = function () {
                        return org.kevoree.modeling.meta.MetaType.CLASS;
                    };
                    MetaInferClass.prototype.index = function () {
                        return -1;
                    };
                    MetaInferClass._INSTANCE = null;
                    return MetaInferClass;
                })();
                meta.MetaInferClass = MetaInferClass;
                var MetaType = (function () {
                    function MetaType() {
                    }
                    MetaType.prototype.equals = function (other) {
                        return this == other;
                    };
                    MetaType.values = function () {
                        return MetaType._MetaTypeVALUES;
                    };
                    MetaType.ATTRIBUTE = new MetaType();
                    MetaType.REFERENCE = new MetaType();
                    MetaType.OPERATION = new MetaType();
                    MetaType.CLASS = new MetaType();
                    MetaType.MODEL = new MetaType();
                    MetaType._MetaTypeVALUES = [
                        MetaType.ATTRIBUTE,
                        MetaType.REFERENCE,
                        MetaType.OPERATION,
                        MetaType.CLASS,
                        MetaType.MODEL
                    ];
                    return MetaType;
                })();
                meta.MetaType = MetaType;
                var PrimitiveTypes = (function () {
                    function PrimitiveTypes() {
                    }
                    PrimitiveTypes.STRING = new org.kevoree.modeling.abs.AbstractKDataType("STRING", false);
                    PrimitiveTypes.LONG = new org.kevoree.modeling.abs.AbstractKDataType("LONG", false);
                    PrimitiveTypes.INT = new org.kevoree.modeling.abs.AbstractKDataType("INT", false);
                    PrimitiveTypes.BOOL = new org.kevoree.modeling.abs.AbstractKDataType("BOOL", false);
                    PrimitiveTypes.SHORT = new org.kevoree.modeling.abs.AbstractKDataType("SHORT", false);
                    PrimitiveTypes.DOUBLE = new org.kevoree.modeling.abs.AbstractKDataType("DOUBLE", false);
                    PrimitiveTypes.FLOAT = new org.kevoree.modeling.abs.AbstractKDataType("FLOAT", false);
                    PrimitiveTypes.TRANSIENT = new org.kevoree.modeling.abs.AbstractKDataType("TRANSIENT", false);
                    return PrimitiveTypes;
                })();
                meta.PrimitiveTypes = PrimitiveTypes;
                var reflexive;
                (function (reflexive) {
                    var DynamicKModel = (function (_super) {
                        __extends(DynamicKModel, _super);
                        function DynamicKModel() {
                            _super.apply(this, arguments);
                            this._metaModel = null;
                        }
                        DynamicKModel.prototype.setMetaModel = function (p_metaModel) {
                            this._metaModel = p_metaModel;
                        };
                        DynamicKModel.prototype.metaModel = function () {
                            return this._metaModel;
                        };
                        DynamicKModel.prototype.internalCreateUniverse = function (universe) {
                            return new org.kevoree.modeling.meta.reflexive.DynamicKUniverse(universe, this._manager);
                        };
                        DynamicKModel.prototype.internalCreateObject = function (universe, time, uuid, clazz) {
                            return new org.kevoree.modeling.meta.reflexive.DynamicKObject(universe, time, uuid, clazz, this._manager);
                        };
                        return DynamicKModel;
                    })(org.kevoree.modeling.abs.AbstractKModel);
                    reflexive.DynamicKModel = DynamicKModel;
                    var DynamicKObject = (function (_super) {
                        __extends(DynamicKObject, _super);
                        function DynamicKObject(p_universe, p_time, p_uuid, p_metaClass, p_manager) {
                            _super.call(this, p_universe, p_time, p_uuid, p_metaClass, p_manager);
                        }
                        return DynamicKObject;
                    })(org.kevoree.modeling.abs.AbstractKObject);
                    reflexive.DynamicKObject = DynamicKObject;
                    var DynamicKUniverse = (function (_super) {
                        __extends(DynamicKUniverse, _super);
                        function DynamicKUniverse(p_key, p_manager) {
                            _super.call(this, p_key, p_manager);
                        }
                        DynamicKUniverse.prototype.internal_create = function (timePoint) {
                            return new org.kevoree.modeling.meta.reflexive.DynamicKView(this._universe, timePoint, this._manager);
                        };
                        return DynamicKUniverse;
                    })(org.kevoree.modeling.abs.AbstractKUniverse);
                    reflexive.DynamicKUniverse = DynamicKUniverse;
                    var DynamicKView = (function (_super) {
                        __extends(DynamicKView, _super);
                        function DynamicKView(p_universe, _time, p_manager) {
                            _super.call(this, p_universe, _time, p_manager);
                        }
                        return DynamicKView;
                    })(org.kevoree.modeling.abs.AbstractKView);
                    reflexive.DynamicKView = DynamicKView;
                    var DynamicMetaClass = (function (_super) {
                        __extends(DynamicMetaClass, _super);
                        function DynamicMetaClass(p_name, p_index) {
                            _super.call(this, p_name, p_index);
                            this.cached_meta = new org.kevoree.modeling.memory.struct.map.StringHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            this._globalIndex = 0;
                            this.internalInit();
                        }
                        DynamicMetaClass.prototype.addAttribute = function (p_name, p_type) {
                            var tempAttribute = new org.kevoree.modeling.abs.AbstractMetaAttribute(p_name, this._globalIndex, -1, false, p_type, org.kevoree.modeling.extrapolation.DiscreteExtrapolation.instance());
                            this.cached_meta.put(tempAttribute.metaName(), tempAttribute);
                            this._globalIndex = this._globalIndex + 1;
                            this.internalInit();
                            return this;
                        };
                        DynamicMetaClass.prototype.getOrCreate = function (p_name, p_oppositeName, p_oppositeClass, p_visible, p_single) {
                            var previous = this.reference(p_name);
                            if (previous != null) {
                                return previous;
                            }
                            var tempOrigin = this;
                            var tempReference = new org.kevoree.modeling.abs.AbstractMetaReference(p_name, this._globalIndex, p_visible, p_single, function () {
                                return p_oppositeClass;
                            }, p_oppositeName, function () {
                                return tempOrigin;
                            });
                            this.cached_meta.put(tempReference.metaName(), tempReference);
                            this._globalIndex = this._globalIndex + 1;
                            this.internalInit();
                            return tempReference;
                        };
                        DynamicMetaClass.prototype.addReference = function (p_name, p_metaClass, oppositeName) {
                            var tempOrigin = this;
                            var opName = oppositeName;
                            if (opName == null) {
                                opName = "op_" + p_name;
                                p_metaClass.getOrCreate(opName, p_name, this, false, false);
                            }
                            else {
                                p_metaClass.getOrCreate(opName, p_name, this, true, false);
                            }
                            var tempReference = new org.kevoree.modeling.abs.AbstractMetaReference(p_name, this._globalIndex, false, false, function () {
                                return p_metaClass;
                            }, opName, function () {
                                return tempOrigin;
                            });
                            this.cached_meta.put(tempReference.metaName(), tempReference);
                            this._globalIndex = this._globalIndex + 1;
                            this.internalInit();
                            return this;
                        };
                        DynamicMetaClass.prototype.addOperation = function (p_name) {
                            var tempOrigin = this;
                            var tempOperation = new org.kevoree.modeling.abs.AbstractMetaOperation(p_name, this._globalIndex, function () {
                                return tempOrigin;
                            });
                            this.cached_meta.put(tempOperation.metaName(), tempOperation);
                            this._globalIndex = this._globalIndex + 1;
                            this.internalInit();
                            return this;
                        };
                        DynamicMetaClass.prototype.internalInit = function () {
                            var tempMeta = new Array();
                            var loopKey = new Array();
                            loopKey[0] = 0;
                            this.cached_meta.each(function (key, value) {
                                tempMeta[loopKey[0]] = value;
                                loopKey[0]++;
                            });
                            this.init(tempMeta);
                        };
                        return DynamicMetaClass;
                    })(org.kevoree.modeling.abs.AbstractMetaClass);
                    reflexive.DynamicMetaClass = DynamicMetaClass;
                    var DynamicMetaModel = (function () {
                        function DynamicMetaModel(p_metaName) {
                            this._metaName = null;
                            this._classes = null;
                            this._metaName = p_metaName;
                            this._classes = new org.kevoree.modeling.memory.struct.map.StringHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        }
                        DynamicMetaModel.prototype.metaClasses = function () {
                            var tempResult = new Array();
                            var loopI = new Array();
                            this._classes.each(function (key, value) {
                                tempResult[value.index()] = value;
                                loopI[0]++;
                            });
                            return tempResult;
                        };
                        DynamicMetaModel.prototype.metaClass = function (name) {
                            return this._classes.get(name);
                        };
                        DynamicMetaModel.prototype.metaName = function () {
                            return this._metaName;
                        };
                        DynamicMetaModel.prototype.metaType = function () {
                            return org.kevoree.modeling.meta.MetaType.MODEL;
                        };
                        DynamicMetaModel.prototype.index = function () {
                            return -1;
                        };
                        DynamicMetaModel.prototype.createMetaClass = function (name) {
                            if (this._classes.containsKey(name)) {
                                return this._classes.get(name);
                            }
                            else {
                                var dynamicMetaClass = new org.kevoree.modeling.meta.reflexive.DynamicMetaClass(name, this._classes.size());
                                this._classes.put(name, dynamicMetaClass);
                                return dynamicMetaClass;
                            }
                        };
                        DynamicMetaModel.prototype.model = function () {
                            var universe = new org.kevoree.modeling.meta.reflexive.DynamicKModel();
                            universe.setMetaModel(this);
                            return universe;
                        };
                        return DynamicMetaModel;
                    })();
                    reflexive.DynamicMetaModel = DynamicMetaModel;
                })(reflexive = meta.reflexive || (meta.reflexive = {}));
            })(meta = modeling.meta || (modeling.meta = {}));
            var msg;
            (function (msg) {
                var KAtomicGetRequest = (function () {
                    function KAtomicGetRequest() {
                    }
                    KAtomicGetRequest.prototype.json = function () {
                        var buffer = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.msg.KMessageLoader.ID_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.key, org.kevoree.modeling.msg.KMessageLoader.KEY_NAME, buffer);
                        if (this.operation != null) {
                            org.kevoree.modeling.msg.KMessageHelper.printElem(this.operation.operationKey(), org.kevoree.modeling.msg.KMessageLoader.OPERATION_NAME, buffer);
                        }
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    };
                    KAtomicGetRequest.prototype.type = function () {
                        return org.kevoree.modeling.msg.KMessageLoader.ATOMIC_OPERATION_REQUEST_TYPE;
                    };
                    return KAtomicGetRequest;
                })();
                msg.KAtomicGetRequest = KAtomicGetRequest;
                var KAtomicGetResult = (function () {
                    function KAtomicGetResult() {
                    }
                    KAtomicGetResult.prototype.json = function () {
                        var buffer = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.msg.KMessageLoader.ID_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.value, org.kevoree.modeling.msg.KMessageLoader.VALUE_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    };
                    KAtomicGetResult.prototype.type = function () {
                        return org.kevoree.modeling.msg.KMessageLoader.ATOMIC_OPERATION_RESULT_TYPE;
                    };
                    return KAtomicGetResult;
                })();
                msg.KAtomicGetResult = KAtomicGetResult;
                var KEvents = (function () {
                    function KEvents(nbObject) {
                        this._objIds = new Array();
                        this._metaindexes = new Array();
                        this._size = nbObject;
                    }
                    KEvents.prototype.allKeys = function () {
                        return this._objIds;
                    };
                    KEvents.prototype.json = function () {
                        var buffer = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        buffer.append(",");
                        buffer.append("\"");
                        buffer.append(org.kevoree.modeling.msg.KMessageLoader.KEYS_NAME).append("\":[");
                        for (var i = 0; i < this._objIds.length; i++) {
                            if (i != 0) {
                                buffer.append(",");
                            }
                            buffer.append("\"");
                            buffer.append(this._objIds[i]);
                            buffer.append("\"");
                        }
                        buffer.append("]\n");
                        if (this._metaindexes != null) {
                            buffer.append(",");
                            buffer.append("\"");
                            buffer.append(org.kevoree.modeling.msg.KMessageLoader.VALUES_NAME).append("\":[");
                            for (var i = 0; i < this._metaindexes.length; i++) {
                                if (i != 0) {
                                    buffer.append(",");
                                }
                                buffer.append("\"");
                                var metaModified = this._metaindexes[i];
                                if (metaModified != null) {
                                    for (var j = 0; j < metaModified.length; j++) {
                                        if (j != 0) {
                                            buffer.append("%");
                                        }
                                        buffer.append(metaModified[j]);
                                    }
                                }
                                buffer.append("\"");
                            }
                            buffer.append("]\n");
                        }
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    };
                    KEvents.prototype.type = function () {
                        return org.kevoree.modeling.msg.KMessageLoader.EVENTS_TYPE;
                    };
                    KEvents.prototype.size = function () {
                        return this._size;
                    };
                    KEvents.prototype.setEvent = function (index, p_objId, p_metaIndexes) {
                        this._objIds[index] = p_objId;
                        this._metaindexes[index] = p_metaIndexes;
                    };
                    KEvents.prototype.getKey = function (index) {
                        return this._objIds[index];
                    };
                    KEvents.prototype.getIndexes = function (index) {
                        return this._metaindexes[index];
                    };
                    return KEvents;
                })();
                msg.KEvents = KEvents;
                var KGetRequest = (function () {
                    function KGetRequest() {
                    }
                    KGetRequest.prototype.json = function () {
                        var buffer = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.msg.KMessageLoader.ID_NAME, buffer);
                        if (this.keys != null) {
                            buffer.append(",");
                            buffer.append("\"");
                            buffer.append(org.kevoree.modeling.msg.KMessageLoader.KEYS_NAME).append("\":[");
                            for (var i = 0; i < this.keys.length; i++) {
                                if (i != 0) {
                                    buffer.append(",");
                                }
                                buffer.append("\"");
                                buffer.append(this.keys[i].toString());
                                buffer.append("\"");
                            }
                            buffer.append("]\n");
                        }
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    };
                    KGetRequest.prototype.type = function () {
                        return org.kevoree.modeling.msg.KMessageLoader.GET_REQ_TYPE;
                    };
                    return KGetRequest;
                })();
                msg.KGetRequest = KGetRequest;
                var KGetResult = (function () {
                    function KGetResult() {
                    }
                    KGetResult.prototype.json = function () {
                        var buffer = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.msg.KMessageLoader.ID_NAME, buffer);
                        if (this.values != null) {
                            buffer.append(",");
                            buffer.append("\"");
                            buffer.append(org.kevoree.modeling.msg.KMessageLoader.VALUES_NAME).append("\":[");
                            for (var i = 0; i < this.values.length; i++) {
                                if (i != 0) {
                                    buffer.append(",");
                                }
                                buffer.append("\"");
                                buffer.append(org.kevoree.modeling.format.json.JsonString.encode(this.values[i]));
                                buffer.append("\"");
                            }
                            buffer.append("]\n");
                        }
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    };
                    KGetResult.prototype.type = function () {
                        return org.kevoree.modeling.msg.KMessageLoader.GET_RES_TYPE;
                    };
                    return KGetResult;
                })();
                msg.KGetResult = KGetResult;
                var KMessageHelper = (function () {
                    function KMessageHelper() {
                    }
                    KMessageHelper.printJsonStart = function (builder) {
                        builder.append("{\n");
                    };
                    KMessageHelper.printJsonEnd = function (builder) {
                        builder.append("}\n");
                    };
                    KMessageHelper.printType = function (builder, type) {
                        builder.append("\"");
                        builder.append(org.kevoree.modeling.msg.KMessageLoader.TYPE_NAME);
                        builder.append("\":\"");
                        builder.append(type);
                        builder.append("\"\n");
                    };
                    KMessageHelper.printElem = function (elem, name, builder) {
                        if (elem != null) {
                            builder.append(",");
                            builder.append("\"");
                            builder.append(name);
                            builder.append("\":\"");
                            builder.append(elem.toString());
                            builder.append("\"\n");
                        }
                    };
                    return KMessageHelper;
                })();
                msg.KMessageHelper = KMessageHelper;
                var KMessageLoader = (function () {
                    function KMessageLoader() {
                    }
                    KMessageLoader.load = function (payload) {
                        if (payload == null) {
                            return null;
                        }
                        var objectReader = new org.kevoree.modeling.format.json.JsonObjectReader();
                        objectReader.parseObject(payload);
                        try {
                            var parsedType = java.lang.Integer.parseInt(objectReader.get(KMessageLoader.TYPE_NAME).toString());
                            if (parsedType == KMessageLoader.EVENTS_TYPE) {
                                var eventsMessage = null;
                                if (objectReader.get(KMessageLoader.KEYS_NAME) != null) {
                                    var objIdsRaw = objectReader.getAsStringArray(KMessageLoader.KEYS_NAME);
                                    eventsMessage = new org.kevoree.modeling.msg.KEvents(objIdsRaw.length);
                                    var keys = new Array();
                                    for (var i = 0; i < objIdsRaw.length; i++) {
                                        try {
                                            keys[i] = org.kevoree.modeling.memory.KContentKey.create(objIdsRaw[i]);
                                        }
                                        catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e = $ex$;
                                                e.printStackTrace();
                                            }
                                        }
                                    }
                                    eventsMessage._objIds = keys;
                                    if (objectReader.get(KMessageLoader.VALUES_NAME) != null) {
                                        var metaInt = objectReader.getAsStringArray(KMessageLoader.VALUES_NAME);
                                        var metaIndexes = new Array();
                                        for (var i = 0; i < metaInt.length; i++) {
                                            try {
                                                if (metaInt[i] != null) {
                                                    var splitted = metaInt[i].split("%");
                                                    var newMeta = new Array();
                                                    for (var h = 0; h < splitted.length; h++) {
                                                        if (splitted[h] != null && !splitted[h].isEmpty()) {
                                                            newMeta[h] = java.lang.Integer.parseInt(splitted[h]);
                                                        }
                                                    }
                                                    metaIndexes[i] = newMeta;
                                                }
                                            }
                                            catch ($ex$) {
                                                if ($ex$ instanceof java.lang.Exception) {
                                                    var e = $ex$;
                                                    e.printStackTrace();
                                                }
                                            }
                                        }
                                        eventsMessage._metaindexes = metaIndexes;
                                    }
                                }
                                return eventsMessage;
                            }
                            else {
                                if (parsedType == KMessageLoader.GET_REQ_TYPE) {
                                    var getKeysRequest = new org.kevoree.modeling.msg.KGetRequest();
                                    if (objectReader.get(KMessageLoader.ID_NAME) != null) {
                                        getKeysRequest.id = java.lang.Long.parseLong(objectReader.get(KMessageLoader.ID_NAME).toString());
                                    }
                                    if (objectReader.get(KMessageLoader.KEYS_NAME) != null) {
                                        var metaInt = objectReader.getAsStringArray(KMessageLoader.KEYS_NAME);
                                        var keys = new Array();
                                        for (var i = 0; i < metaInt.length; i++) {
                                            keys[i] = org.kevoree.modeling.memory.KContentKey.create(metaInt[i]);
                                        }
                                        getKeysRequest.keys = keys;
                                    }
                                    return getKeysRequest;
                                }
                                else {
                                    if (parsedType == KMessageLoader.GET_RES_TYPE) {
                                        var getResult = new org.kevoree.modeling.msg.KGetResult();
                                        if (objectReader.get(KMessageLoader.ID_NAME) != null) {
                                            getResult.id = java.lang.Long.parseLong(objectReader.get(KMessageLoader.ID_NAME).toString());
                                        }
                                        if (objectReader.get(KMessageLoader.VALUES_NAME) != null) {
                                            var metaInt = objectReader.getAsStringArray(KMessageLoader.VALUES_NAME);
                                            var values = new Array();
                                            for (var i = 0; i < metaInt.length; i++) {
                                                values[i] = org.kevoree.modeling.format.json.JsonString.unescape(metaInt[i]);
                                            }
                                            getResult.values = values;
                                        }
                                        return getResult;
                                    }
                                    else {
                                        if (parsedType == KMessageLoader.PUT_REQ_TYPE) {
                                            var putRequest = new org.kevoree.modeling.msg.KPutRequest();
                                            if (objectReader.get(KMessageLoader.ID_NAME) != null) {
                                                putRequest.id = java.lang.Long.parseLong(objectReader.get(KMessageLoader.ID_NAME).toString());
                                            }
                                            var toFlatKeys = null;
                                            var toFlatValues = null;
                                            if (objectReader.get(KMessageLoader.KEYS_NAME) != null) {
                                                toFlatKeys = objectReader.getAsStringArray(KMessageLoader.KEYS_NAME);
                                            }
                                            if (objectReader.get(KMessageLoader.VALUES_NAME) != null) {
                                                toFlatValues = objectReader.getAsStringArray(KMessageLoader.VALUES_NAME);
                                            }
                                            if (toFlatKeys != null && toFlatValues != null && toFlatKeys.length == toFlatValues.length) {
                                                if (putRequest.request == null) {
                                                    putRequest.request = new org.kevoree.modeling.memory.cdn.KContentPutRequest(toFlatKeys.length);
                                                }
                                                for (var i = 0; i < toFlatKeys.length; i++) {
                                                    putRequest.request.put(org.kevoree.modeling.memory.KContentKey.create(toFlatKeys[i]), org.kevoree.modeling.format.json.JsonString.unescape(toFlatValues[i]));
                                                }
                                            }
                                            return putRequest;
                                        }
                                        else {
                                            if (parsedType == KMessageLoader.PUT_RES_TYPE) {
                                                var putResult = new org.kevoree.modeling.msg.KPutResult();
                                                if (objectReader.get(KMessageLoader.ID_NAME) != null) {
                                                    putResult.id = java.lang.Long.parseLong(objectReader.get(KMessageLoader.ID_NAME).toString());
                                                }
                                                return putResult;
                                            }
                                            else {
                                                if (parsedType == KMessageLoader.OPERATION_CALL_TYPE) {
                                                    var callMessage = new org.kevoree.modeling.msg.KOperationCallMessage();
                                                    if (objectReader.get(KMessageLoader.ID_NAME) != null) {
                                                        callMessage.id = java.lang.Long.parseLong(objectReader.get(KMessageLoader.ID_NAME).toString());
                                                    }
                                                    if (objectReader.get(KMessageLoader.KEY_NAME) != null) {
                                                        callMessage.key = org.kevoree.modeling.memory.KContentKey.create(objectReader.get(KMessageLoader.KEY_NAME).toString());
                                                    }
                                                    if (objectReader.get(KMessageLoader.CLASS_IDX_NAME) != null) {
                                                        callMessage.classIndex = java.lang.Integer.parseInt(objectReader.get(KMessageLoader.CLASS_IDX_NAME).toString());
                                                    }
                                                    if (objectReader.get(KMessageLoader.OPERATION_NAME) != null) {
                                                        callMessage.opIndex = java.lang.Integer.parseInt(objectReader.get(KMessageLoader.OPERATION_NAME).toString());
                                                    }
                                                    if (objectReader.get(KMessageLoader.PARAMETERS_NAME) != null) {
                                                        var params = objectReader.getAsStringArray(KMessageLoader.PARAMETERS_NAME);
                                                        var toFlat = new Array();
                                                        for (var i = 0; i < params.length; i++) {
                                                            toFlat[i] = org.kevoree.modeling.format.json.JsonString.unescape(params[i]);
                                                        }
                                                        callMessage.params = toFlat;
                                                    }
                                                    return callMessage;
                                                }
                                                else {
                                                    if (parsedType == KMessageLoader.OPERATION_RESULT_TYPE) {
                                                        var resultMessage = new org.kevoree.modeling.msg.KOperationResultMessage();
                                                        if (objectReader.get(KMessageLoader.ID_NAME) != null) {
                                                            resultMessage.id = java.lang.Long.parseLong(objectReader.get(KMessageLoader.ID_NAME).toString());
                                                        }
                                                        if (objectReader.get(KMessageLoader.KEY_NAME) != null) {
                                                            resultMessage.key = org.kevoree.modeling.memory.KContentKey.create(objectReader.get(KMessageLoader.KEY_NAME).toString());
                                                        }
                                                        if (objectReader.get(KMessageLoader.VALUE_NAME) != null) {
                                                            resultMessage.value = objectReader.get(KMessageLoader.VALUE_NAME).toString();
                                                        }
                                                        return resultMessage;
                                                    }
                                                    else {
                                                        if (parsedType == KMessageLoader.ATOMIC_OPERATION_REQUEST_TYPE) {
                                                            var atomicGetMessage = new org.kevoree.modeling.msg.KAtomicGetRequest();
                                                            if (objectReader.get(KMessageLoader.ID_NAME) != null) {
                                                                atomicGetMessage.id = java.lang.Long.parseLong(objectReader.get(KMessageLoader.ID_NAME).toString());
                                                            }
                                                            if (objectReader.get(KMessageLoader.KEY_NAME) != null) {
                                                                atomicGetMessage.key = org.kevoree.modeling.memory.KContentKey.create(objectReader.get(KMessageLoader.KEY_NAME).toString());
                                                            }
                                                            if (objectReader.get(KMessageLoader.OPERATION_NAME) != null) {
                                                                atomicGetMessage.operation = org.kevoree.modeling.memory.cdn.AtomicOperationFactory.getOperationWithKey(java.lang.Integer.parseInt(objectReader.get(KMessageLoader.OPERATION_NAME)));
                                                            }
                                                            return atomicGetMessage;
                                                        }
                                                        else {
                                                            if (parsedType == KMessageLoader.ATOMIC_OPERATION_RESULT_TYPE) {
                                                                var atomicGetResultMessage = new org.kevoree.modeling.msg.KAtomicGetResult();
                                                                if (objectReader.get(KMessageLoader.ID_NAME) != null) {
                                                                    atomicGetResultMessage.id = java.lang.Long.parseLong(objectReader.get(KMessageLoader.ID_NAME).toString());
                                                                }
                                                                if (objectReader.get(KMessageLoader.VALUE_NAME) != null) {
                                                                    atomicGetResultMessage.value = objectReader.get(KMessageLoader.VALUE_NAME).toString();
                                                                }
                                                                return atomicGetResultMessage;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            return null;
                        }
                        catch ($ex$) {
                            if ($ex$ instanceof java.lang.Exception) {
                                var e = $ex$;
                                e.printStackTrace();
                                return null;
                            }
                        }
                    };
                    KMessageLoader.TYPE_NAME = "type";
                    KMessageLoader.OPERATION_NAME = "op";
                    KMessageLoader.KEY_NAME = "key";
                    KMessageLoader.KEYS_NAME = "keys";
                    KMessageLoader.ID_NAME = "id";
                    KMessageLoader.VALUE_NAME = "value";
                    KMessageLoader.VALUES_NAME = "values";
                    KMessageLoader.CLASS_IDX_NAME = "class";
                    KMessageLoader.PARAMETERS_NAME = "params";
                    KMessageLoader.EVENTS_TYPE = 0;
                    KMessageLoader.GET_REQ_TYPE = 1;
                    KMessageLoader.GET_RES_TYPE = 2;
                    KMessageLoader.PUT_REQ_TYPE = 3;
                    KMessageLoader.PUT_RES_TYPE = 4;
                    KMessageLoader.OPERATION_CALL_TYPE = 5;
                    KMessageLoader.OPERATION_RESULT_TYPE = 6;
                    KMessageLoader.ATOMIC_OPERATION_REQUEST_TYPE = 7;
                    KMessageLoader.ATOMIC_OPERATION_RESULT_TYPE = 8;
                    return KMessageLoader;
                })();
                msg.KMessageLoader = KMessageLoader;
                var KOperationCallMessage = (function () {
                    function KOperationCallMessage() {
                    }
                    KOperationCallMessage.prototype.json = function () {
                        var buffer = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.msg.KMessageLoader.ID_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.key, org.kevoree.modeling.msg.KMessageLoader.KEY_NAME, buffer);
                        buffer.append(",\"").append(org.kevoree.modeling.msg.KMessageLoader.CLASS_IDX_NAME).append("\":\"").append(this.classIndex).append("\"");
                        buffer.append(",\"").append(org.kevoree.modeling.msg.KMessageLoader.OPERATION_NAME).append("\":\"").append(this.opIndex).append("\"");
                        if (this.params != null) {
                            buffer.append(",\"");
                            buffer.append(org.kevoree.modeling.msg.KMessageLoader.PARAMETERS_NAME).append("\":[");
                            for (var i = 0; i < this.params.length; i++) {
                                if (i != 0) {
                                    buffer.append(",");
                                }
                                buffer.append("\"");
                                buffer.append(org.kevoree.modeling.format.json.JsonString.encode(this.params[i]));
                                buffer.append("\"");
                            }
                            buffer.append("]\n");
                        }
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    };
                    KOperationCallMessage.prototype.type = function () {
                        return org.kevoree.modeling.msg.KMessageLoader.OPERATION_CALL_TYPE;
                    };
                    return KOperationCallMessage;
                })();
                msg.KOperationCallMessage = KOperationCallMessage;
                var KOperationResultMessage = (function () {
                    function KOperationResultMessage() {
                    }
                    KOperationResultMessage.prototype.json = function () {
                        var buffer = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.msg.KMessageLoader.ID_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.key, org.kevoree.modeling.msg.KMessageLoader.KEY_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.value, org.kevoree.modeling.msg.KMessageLoader.VALUE_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    };
                    KOperationResultMessage.prototype.type = function () {
                        return org.kevoree.modeling.msg.KMessageLoader.OPERATION_RESULT_TYPE;
                    };
                    return KOperationResultMessage;
                })();
                msg.KOperationResultMessage = KOperationResultMessage;
                var KPutRequest = (function () {
                    function KPutRequest() {
                    }
                    KPutRequest.prototype.json = function () {
                        var buffer = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.msg.KMessageLoader.ID_NAME, buffer);
                        if (this.request != null) {
                            buffer.append(",\"");
                            buffer.append(org.kevoree.modeling.msg.KMessageLoader.KEYS_NAME).append("\":[");
                            for (var i = 0; i < this.request.size(); i++) {
                                if (i != 0) {
                                    buffer.append(",");
                                }
                                buffer.append("\"");
                                buffer.append(this.request.getKey(i));
                                buffer.append("\"");
                            }
                            buffer.append("]\n");
                            buffer.append(",\"");
                            buffer.append(org.kevoree.modeling.msg.KMessageLoader.VALUES_NAME).append("\":[");
                            for (var i = 0; i < this.request.size(); i++) {
                                if (i != 0) {
                                    buffer.append(",");
                                }
                                buffer.append("\"");
                                buffer.append(org.kevoree.modeling.format.json.JsonString.encode(this.request.getContent(i)));
                                buffer.append("\"");
                            }
                            buffer.append("]\n");
                        }
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    };
                    KPutRequest.prototype.type = function () {
                        return org.kevoree.modeling.msg.KMessageLoader.PUT_REQ_TYPE;
                    };
                    return KPutRequest;
                })();
                msg.KPutRequest = KPutRequest;
                var KPutResult = (function () {
                    function KPutResult() {
                    }
                    KPutResult.prototype.json = function () {
                        var buffer = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.msg.KMessageLoader.ID_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    };
                    KPutResult.prototype.type = function () {
                        return org.kevoree.modeling.msg.KMessageLoader.PUT_RES_TYPE;
                    };
                    return KPutResult;
                })();
                msg.KPutResult = KPutResult;
            })(msg = modeling.msg || (modeling.msg = {}));
            var scheduler;
            (function (scheduler) {
                var DirectScheduler = (function () {
                    function DirectScheduler() {
                    }
                    DirectScheduler.prototype.dispatch = function (runnable) {
                        runnable.run();
                    };
                    DirectScheduler.prototype.stop = function () {
                    };
                    return DirectScheduler;
                })();
                scheduler.DirectScheduler = DirectScheduler;
                var ExecutorServiceScheduler = (function () {
                    function ExecutorServiceScheduler() {
                    }
                    ExecutorServiceScheduler.prototype.dispatch = function (p_runnable) {
                        p_runnable.run();
                    };
                    ExecutorServiceScheduler.prototype.stop = function () {
                    };
                    return ExecutorServiceScheduler;
                })();
                scheduler.ExecutorServiceScheduler = ExecutorServiceScheduler;
            })(scheduler = modeling.scheduler || (modeling.scheduler = {}));
            var traversal;
            (function (traversal) {
                var DefaultKTraversal = (function () {
                    function DefaultKTraversal(p_root) {
                        this._terminated = false;
                        this._initObjs = new Array();
                        this._initObjs[0] = p_root;
                    }
                    DefaultKTraversal.prototype.internal_chain_action = function (p_action) {
                        if (this._terminated) {
                            throw new java.lang.RuntimeException(DefaultKTraversal.TERMINATED_MESSAGE);
                        }
                        if (this._initAction == null) {
                            this._initAction = p_action;
                        }
                        if (this._lastAction != null) {
                            this._lastAction.chain(p_action);
                        }
                        this._lastAction = p_action;
                        return this;
                    };
                    DefaultKTraversal.prototype.traverse = function (p_metaReference) {
                        return this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KTraverseAction(p_metaReference));
                    };
                    DefaultKTraversal.prototype.traverseQuery = function (p_metaReferenceQuery) {
                        return this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KTraverseQueryAction(p_metaReferenceQuery));
                    };
                    DefaultKTraversal.prototype.withAttribute = function (p_attribute, p_expectedValue) {
                        return this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KFilterAttributeAction(p_attribute, p_expectedValue));
                    };
                    DefaultKTraversal.prototype.withoutAttribute = function (p_attribute, p_expectedValue) {
                        return this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KFilterNotAttributeAction(p_attribute, p_expectedValue));
                    };
                    DefaultKTraversal.prototype.attributeQuery = function (p_attributeQuery) {
                        return this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KFilterAttributeQueryAction(p_attributeQuery));
                    };
                    DefaultKTraversal.prototype.filter = function (p_filter) {
                        return this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KFilterAction(p_filter));
                    };
                    DefaultKTraversal.prototype.collect = function (metaReference, continueCondition) {
                        return this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KDeepCollectAction(metaReference, continueCondition));
                    };
                    DefaultKTraversal.prototype.then = function (cb) {
                        this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KFinalAction(cb));
                        this._terminated = true;
                        this._initAction.execute(this._initObjs);
                    };
                    DefaultKTraversal.prototype.map = function (attribute, cb) {
                        this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KMapAction(attribute, cb));
                        this._terminated = true;
                        this._initAction.execute(this._initObjs);
                    };
                    DefaultKTraversal.TERMINATED_MESSAGE = "Promise is terminated by the call of done method, please create another promise";
                    return DefaultKTraversal;
                })();
                traversal.DefaultKTraversal = DefaultKTraversal;
                var actions;
                (function (actions) {
                    var KDeepCollectAction = (function () {
                        function KDeepCollectAction(p_reference, p_continueCondition) {
                            this._alreadyPassed = null;
                            this._finalElements = null;
                            this._reference = p_reference;
                            this._continueCondition = p_continueCondition;
                        }
                        KDeepCollectAction.prototype.chain = function (p_next) {
                            this._next = p_next;
                        };
                        KDeepCollectAction.prototype.execute = function (p_inputs) {
                            var _this = this;
                            if (p_inputs == null || p_inputs.length == 0) {
                                this._next.execute(p_inputs);
                                return;
                            }
                            else {
                                this._alreadyPassed = new org.kevoree.modeling.memory.struct.map.LongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                this._finalElements = new org.kevoree.modeling.memory.struct.map.LongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                var filtered_inputs = new Array();
                                for (var i = 0; i < p_inputs.length; i++) {
                                    if (this._continueCondition == null || this._continueCondition(p_inputs[i])) {
                                        filtered_inputs[i] = p_inputs[i];
                                        this._alreadyPassed.put(p_inputs[i].uuid(), p_inputs[i]);
                                    }
                                }
                                var iterationCallbacks = new Array();
                                iterationCallbacks[0] = function (traversed) {
                                    var filtered_inputs2 = new Array();
                                    var nbSize = 0;
                                    for (var i = 0; i < traversed.length; i++) {
                                        if ((_this._continueCondition == null || _this._continueCondition(traversed[i])) && !_this._alreadyPassed.containsKey(traversed[i].uuid())) {
                                            filtered_inputs2[i] = traversed[i];
                                            _this._alreadyPassed.put(traversed[i].uuid(), traversed[i]);
                                            _this._finalElements.put(traversed[i].uuid(), traversed[i]);
                                            nbSize++;
                                        }
                                    }
                                    if (nbSize > 0) {
                                        _this.executeStep(filtered_inputs2, iterationCallbacks[0]);
                                    }
                                    else {
                                        var trimmed = new Array();
                                        var nbInserted = [0];
                                        _this._finalElements.each(function (key, value) {
                                            trimmed[nbInserted[0]] = value;
                                            nbInserted[0]++;
                                        });
                                        _this._next.execute(trimmed);
                                    }
                                };
                                this.executeStep(filtered_inputs, iterationCallbacks[0]);
                            }
                        };
                        KDeepCollectAction.prototype.executeStep = function (p_inputStep, private_callback) {
                            var currentObject = null;
                            var nextIds = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            for (var i = 0; i < p_inputStep.length; i++) {
                                if (p_inputStep[i] != null) {
                                    try {
                                        var loopObj = p_inputStep[i];
                                        currentObject = loopObj;
                                        var raw = loopObj._manager.segment(loopObj, org.kevoree.modeling.memory.AccessMode.READ);
                                        if (raw != null) {
                                            if (this._reference == null) {
                                                for (var j = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                                                    var ref = loopObj.metaClass().metaReferences()[j];
                                                    var resolved = raw.getRef(ref.index(), loopObj.metaClass());
                                                    if (resolved != null) {
                                                        for (var k = 0; k < resolved.length; k++) {
                                                            nextIds.put(resolved[k], resolved[k]);
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                var translatedRef = loopObj.internal_transpose_ref(this._reference);
                                                if (translatedRef != null) {
                                                    var resolved = raw.getRef(translatedRef.index(), loopObj.metaClass());
                                                    if (resolved != null) {
                                                        for (var j = 0; j < resolved.length; j++) {
                                                            nextIds.put(resolved[j], resolved[j]);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e = $ex$;
                                            e.printStackTrace();
                                        }
                                    }
                                }
                            }
                            var trimmed = new Array();
                            var inserted = [0];
                            nextIds.each(function (key, value) {
                                trimmed[inserted[0]] = key;
                                inserted[0]++;
                            });
                            currentObject._manager.lookupAllobjects(currentObject.universe(), currentObject.now(), trimmed, function (kObjects) {
                                private_callback(kObjects);
                            });
                        };
                        return KDeepCollectAction;
                    })();
                    actions.KDeepCollectAction = KDeepCollectAction;
                    var KFilterAction = (function () {
                        function KFilterAction(p_filter) {
                            this._filter = p_filter;
                        }
                        KFilterAction.prototype.chain = function (p_next) {
                            this._next = p_next;
                        };
                        KFilterAction.prototype.execute = function (p_inputs) {
                            var selectedIndex = new Array();
                            var selected = 0;
                            for (var i = 0; i < p_inputs.length; i++) {
                                try {
                                    if (this._filter(p_inputs[i])) {
                                        selectedIndex[i] = true;
                                        selected++;
                                    }
                                }
                                catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e = $ex$;
                                        e.printStackTrace();
                                    }
                                }
                            }
                            var nextStepElement = new Array();
                            var inserted = 0;
                            for (var i = 0; i < p_inputs.length; i++) {
                                if (selectedIndex[i]) {
                                    nextStepElement[inserted] = p_inputs[i];
                                    inserted++;
                                }
                            }
                            this._next.execute(nextStepElement);
                        };
                        return KFilterAction;
                    })();
                    actions.KFilterAction = KFilterAction;
                    var KFilterAttributeAction = (function () {
                        function KFilterAttributeAction(p_attribute, p_expectedValue) {
                            this._attribute = p_attribute;
                            this._expectedValue = p_expectedValue;
                        }
                        KFilterAttributeAction.prototype.chain = function (p_next) {
                            this._next = p_next;
                        };
                        KFilterAttributeAction.prototype.execute = function (p_inputs) {
                            if (p_inputs == null || p_inputs.length == 0) {
                                this._next.execute(p_inputs);
                                return;
                            }
                            else {
                                var selectedIndexes = new Array();
                                var nbSelected = 0;
                                for (var i = 0; i < p_inputs.length; i++) {
                                    try {
                                        var loopObj = p_inputs[i];
                                        var raw = (loopObj)._manager.segment(loopObj, org.kevoree.modeling.memory.AccessMode.READ);
                                        if (raw != null) {
                                            if (this._attribute == null) {
                                                if (this._expectedValue == null) {
                                                    selectedIndexes[i] = true;
                                                    nbSelected++;
                                                }
                                                else {
                                                    var addToNext = false;
                                                    for (var j = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                                        var ref = loopObj.metaClass().metaAttributes()[j];
                                                        var resolved = raw.get(ref.index(), loopObj.metaClass());
                                                        if (resolved == null) {
                                                            if (this._expectedValue.toString().equals("*")) {
                                                                addToNext = true;
                                                            }
                                                        }
                                                        else {
                                                            if (resolved.equals(this._expectedValue)) {
                                                                addToNext = true;
                                                            }
                                                            else {
                                                                if (resolved.toString().matches(this._expectedValue.toString().replace("*", ".*"))) {
                                                                    addToNext = true;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (addToNext) {
                                                        selectedIndexes[i] = true;
                                                        nbSelected++;
                                                    }
                                                }
                                            }
                                            else {
                                                var translatedAtt = loopObj.internal_transpose_att(this._attribute);
                                                if (translatedAtt != null) {
                                                    var resolved = raw.get(translatedAtt.index(), loopObj.metaClass());
                                                    if (this._expectedValue == null) {
                                                        if (resolved == null) {
                                                            selectedIndexes[i] = true;
                                                            nbSelected++;
                                                        }
                                                    }
                                                    else {
                                                        if (resolved == null) {
                                                            if (this._expectedValue.toString().equals("*")) {
                                                                selectedIndexes[i] = true;
                                                                nbSelected++;
                                                            }
                                                        }
                                                        else {
                                                            if (resolved.equals(this._expectedValue)) {
                                                                selectedIndexes[i] = true;
                                                                nbSelected++;
                                                            }
                                                            else {
                                                                if (resolved.toString().matches(this._expectedValue.toString().replace("*", ".*"))) {
                                                                    selectedIndexes[i] = true;
                                                                    nbSelected++;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            System.err.println("WARN: Empty KObject " + loopObj.uuid());
                                        }
                                    }
                                    catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e = $ex$;
                                            e.printStackTrace();
                                        }
                                    }
                                }
                                var nextStepElement = new Array();
                                var inserted = 0;
                                for (var i = 0; i < p_inputs.length; i++) {
                                    if (selectedIndexes[i]) {
                                        nextStepElement[inserted] = p_inputs[i];
                                        inserted++;
                                    }
                                }
                                this._next.execute(nextStepElement);
                            }
                        };
                        return KFilterAttributeAction;
                    })();
                    actions.KFilterAttributeAction = KFilterAttributeAction;
                    var KFilterAttributeQueryAction = (function () {
                        function KFilterAttributeQueryAction(p_attributeQuery) {
                            this._attributeQuery = p_attributeQuery;
                        }
                        KFilterAttributeQueryAction.prototype.chain = function (p_next) {
                            this._next = p_next;
                        };
                        KFilterAttributeQueryAction.prototype.execute = function (p_inputs) {
                            if (p_inputs == null || p_inputs.length == 0) {
                                this._next.execute(p_inputs);
                                return;
                            }
                            else {
                                var selectedIndexes = new Array();
                                var nbSelected = 0;
                                for (var i = 0; i < p_inputs.length; i++) {
                                    try {
                                        var loopObj = p_inputs[i];
                                        if (this._attributeQuery == null) {
                                            selectedIndexes[i] = true;
                                            nbSelected++;
                                        }
                                        else {
                                            var params = this.buildParams(this._attributeQuery);
                                            var selectedForNext = [true];
                                            params.each(function (key, param) {
                                                for (var j = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                                    var metaAttribute = loopObj.metaClass().metaAttributes()[j];
                                                    if (metaAttribute.metaName().matches(param.name())) {
                                                        var o_raw = loopObj.get(metaAttribute);
                                                        if (o_raw != null) {
                                                            if (param.value().equals("null")) {
                                                                if (!param.isNegative()) {
                                                                    selectedForNext[0] = false;
                                                                }
                                                            }
                                                            else {
                                                                if (o_raw.toString().matches(param.value())) {
                                                                    if (param.isNegative()) {
                                                                        selectedForNext[0] = false;
                                                                    }
                                                                }
                                                                else {
                                                                    if (!param.isNegative()) {
                                                                        selectedForNext[0] = false;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            if (param.value().equals("null") || param.value().equals("*")) {
                                                                if (param.isNegative()) {
                                                                    selectedForNext[0] = false;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            });
                                            if (selectedForNext[0]) {
                                                selectedIndexes[i] = true;
                                                nbSelected++;
                                            }
                                        }
                                    }
                                    catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e = $ex$;
                                            e.printStackTrace();
                                        }
                                    }
                                }
                                var nextStepElement = new Array();
                                var inserted = 0;
                                for (var i = 0; i < p_inputs.length; i++) {
                                    if (selectedIndexes[i]) {
                                        nextStepElement[inserted] = p_inputs[i];
                                        inserted++;
                                    }
                                }
                                this._next.execute(nextStepElement);
                            }
                        };
                        KFilterAttributeQueryAction.prototype.buildParams = function (p_paramString) {
                            var params = new org.kevoree.modeling.memory.struct.map.StringHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            var iParam = 0;
                            var lastStart = iParam;
                            while (iParam < p_paramString.length) {
                                if (p_paramString.charAt(iParam) == ',') {
                                    var p = p_paramString.substring(lastStart, iParam).trim();
                                    if (!p.equals("") && !p.equals("*")) {
                                        if (p.endsWith("=")) {
                                            p = p + "*";
                                        }
                                        var pArray = p.split("=");
                                        var pObject;
                                        if (pArray.length > 1) {
                                            var paramKey = pArray[0].trim();
                                            var negative = paramKey.endsWith("!");
                                            pObject = new org.kevoree.modeling.traversal.selector.KQueryParam(paramKey.replace("!", "").replace("*", ".*"), pArray[1].trim().replace("*", ".*"), negative);
                                            params.put(pObject.name(), pObject);
                                        }
                                    }
                                    lastStart = iParam + 1;
                                }
                                iParam = iParam + 1;
                            }
                            var lastParam = p_paramString.substring(lastStart, iParam).trim();
                            if (!lastParam.equals("") && !lastParam.equals("*")) {
                                if (lastParam.endsWith("=")) {
                                    lastParam = lastParam + "*";
                                }
                                var pArray = lastParam.split("=");
                                var pObject;
                                if (pArray.length > 1) {
                                    var paramKey = pArray[0].trim();
                                    var negative = paramKey.endsWith("!");
                                    pObject = new org.kevoree.modeling.traversal.selector.KQueryParam(paramKey.replace("!", "").replace("*", ".*"), pArray[1].trim().replace("*", ".*"), negative);
                                    params.put(pObject.name(), pObject);
                                }
                            }
                            return params;
                        };
                        return KFilterAttributeQueryAction;
                    })();
                    actions.KFilterAttributeQueryAction = KFilterAttributeQueryAction;
                    var KFilterNotAttributeAction = (function () {
                        function KFilterNotAttributeAction(p_attribute, p_expectedValue) {
                            this._attribute = p_attribute;
                            this._expectedValue = p_expectedValue;
                        }
                        KFilterNotAttributeAction.prototype.chain = function (p_next) {
                            this._next = p_next;
                        };
                        KFilterNotAttributeAction.prototype.execute = function (p_inputs) {
                            if (p_inputs == null || p_inputs.length == 0) {
                                this._next.execute(p_inputs);
                            }
                            else {
                                var selectedIndexes = new Array();
                                var nbSelected = 0;
                                for (var i = 0; i < p_inputs.length; i++) {
                                    try {
                                        var loopObj = p_inputs[i];
                                        var raw = loopObj._manager.segment(loopObj, org.kevoree.modeling.memory.AccessMode.READ);
                                        if (raw != null) {
                                            if (this._attribute == null) {
                                                if (this._expectedValue == null) {
                                                    selectedIndexes[i] = true;
                                                    nbSelected++;
                                                }
                                                else {
                                                    var addToNext = true;
                                                    for (var j = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                                        var ref = loopObj.metaClass().metaAttributes()[j];
                                                        var resolved = raw.get(ref.index(), loopObj.metaClass());
                                                        if (resolved == null) {
                                                            if (this._expectedValue.toString().equals("*")) {
                                                                addToNext = false;
                                                            }
                                                        }
                                                        else {
                                                            if (resolved.equals(this._expectedValue)) {
                                                                addToNext = false;
                                                            }
                                                            else {
                                                                if (resolved.toString().matches(this._expectedValue.toString().replace("*", ".*"))) {
                                                                    addToNext = false;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (addToNext) {
                                                        selectedIndexes[i] = true;
                                                        nbSelected++;
                                                    }
                                                }
                                            }
                                            else {
                                                var translatedAtt = loopObj.internal_transpose_att(this._attribute);
                                                if (translatedAtt != null) {
                                                    var resolved = raw.get(translatedAtt.index(), loopObj.metaClass());
                                                    if (this._expectedValue == null) {
                                                        if (resolved != null) {
                                                            selectedIndexes[i] = true;
                                                            nbSelected++;
                                                        }
                                                    }
                                                    else {
                                                        if (resolved == null) {
                                                            if (!this._expectedValue.toString().equals("*")) {
                                                                selectedIndexes[i] = true;
                                                                nbSelected++;
                                                            }
                                                        }
                                                        else {
                                                            if (resolved.equals(this._expectedValue)) {
                                                            }
                                                            else {
                                                                if (resolved.toString().matches(this._expectedValue.toString().replace("*", ".*"))) {
                                                                }
                                                                else {
                                                                    selectedIndexes[i] = true;
                                                                    nbSelected++;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            System.err.println("WARN: Empty KObject " + loopObj.uuid());
                                        }
                                    }
                                    catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e = $ex$;
                                            e.printStackTrace();
                                        }
                                    }
                                }
                                var nextStepElement = new Array();
                                var inserted = 0;
                                for (var i = 0; i < p_inputs.length; i++) {
                                    if (selectedIndexes[i]) {
                                        nextStepElement[inserted] = p_inputs[i];
                                        inserted++;
                                    }
                                }
                                this._next.execute(nextStepElement);
                            }
                        };
                        return KFilterNotAttributeAction;
                    })();
                    actions.KFilterNotAttributeAction = KFilterNotAttributeAction;
                    var KFinalAction = (function () {
                        function KFinalAction(p_callback) {
                            this._finalCallback = p_callback;
                        }
                        KFinalAction.prototype.chain = function (next) {
                        };
                        KFinalAction.prototype.execute = function (inputs) {
                            this._finalCallback(inputs);
                        };
                        return KFinalAction;
                    })();
                    actions.KFinalAction = KFinalAction;
                    var KMapAction = (function () {
                        function KMapAction(p_attribute, p_callback) {
                            this._finalCallback = p_callback;
                            this._attribute = p_attribute;
                        }
                        KMapAction.prototype.chain = function (next) {
                        };
                        KMapAction.prototype.execute = function (inputs) {
                            var selected = new Array();
                            var nbElem = 0;
                            for (var i = 0; i < inputs.length; i++) {
                                if (inputs[i] != null) {
                                    var resolved = inputs[i].get(this._attribute);
                                    if (resolved != null) {
                                        selected[i] = resolved;
                                        nbElem++;
                                    }
                                }
                            }
                            var trimmed = new Array();
                            var nbInserted = 0;
                            for (var i = 0; i < inputs.length; i++) {
                                if (selected[i] != null) {
                                    trimmed[nbInserted] = selected[i];
                                    nbInserted++;
                                }
                            }
                            this._finalCallback(trimmed);
                        };
                        return KMapAction;
                    })();
                    actions.KMapAction = KMapAction;
                    var KRemoveDuplicateAction = (function () {
                        function KRemoveDuplicateAction() {
                        }
                        KRemoveDuplicateAction.prototype.chain = function (p_next) {
                            this._next = p_next;
                        };
                        KRemoveDuplicateAction.prototype.execute = function (p_inputs) {
                            var elems = new org.kevoree.modeling.memory.struct.map.LongHashMap(p_inputs.length, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            for (var i = 0; i < p_inputs.length; i++) {
                                elems.put(p_inputs[i].uuid(), p_inputs[i]);
                            }
                            var trimmed = new Array();
                            var nbInserted = [0];
                            elems.each(function (key, value) {
                                trimmed[nbInserted[0]] = value;
                                nbInserted[0]++;
                            });
                            this._next.execute(trimmed);
                        };
                        return KRemoveDuplicateAction;
                    })();
                    actions.KRemoveDuplicateAction = KRemoveDuplicateAction;
                    var KTraverseAction = (function () {
                        function KTraverseAction(p_reference) {
                            this._reference = p_reference;
                        }
                        KTraverseAction.prototype.chain = function (p_next) {
                            this._next = p_next;
                        };
                        KTraverseAction.prototype.execute = function (p_inputs) {
                            var _this = this;
                            if (p_inputs == null || p_inputs.length == 0) {
                                this._next.execute(p_inputs);
                                return;
                            }
                            else {
                                var currentObject = p_inputs[0];
                                var nextIds = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                for (var i = 0; i < p_inputs.length; i++) {
                                    try {
                                        var loopObj = p_inputs[i];
                                        var raw = currentObject._manager.segment(loopObj, org.kevoree.modeling.memory.AccessMode.READ);
                                        if (raw != null) {
                                            if (this._reference == null) {
                                                for (var j = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                                                    var ref = loopObj.metaClass().metaReferences()[j];
                                                    var resolved = raw.getRef(ref.index(), currentObject.metaClass());
                                                    if (resolved != null) {
                                                        for (var k = 0; k < resolved.length; k++) {
                                                            nextIds.put(resolved[k], resolved[k]);
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                var translatedRef = loopObj.internal_transpose_ref(this._reference);
                                                if (translatedRef != null) {
                                                    var resolved = raw.getRef(translatedRef.index(), currentObject.metaClass());
                                                    if (resolved != null) {
                                                        for (var j = 0; j < resolved.length; j++) {
                                                            nextIds.put(resolved[j], resolved[j]);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e = $ex$;
                                            e.printStackTrace();
                                        }
                                    }
                                }
                                var trimmed = new Array();
                                var inserted = [0];
                                nextIds.each(function (key, value) {
                                    trimmed[inserted[0]] = key;
                                    inserted[0]++;
                                });
                                currentObject._manager.lookupAllobjects(currentObject.universe(), currentObject.now(), trimmed, function (kObjects) {
                                    _this._next.execute(kObjects);
                                });
                            }
                        };
                        return KTraverseAction;
                    })();
                    actions.KTraverseAction = KTraverseAction;
                    var KTraverseQueryAction = (function () {
                        function KTraverseQueryAction(p_referenceQuery) {
                            this.SEP = ",";
                            this._referenceQuery = p_referenceQuery;
                        }
                        KTraverseQueryAction.prototype.chain = function (p_next) {
                            this._next = p_next;
                        };
                        KTraverseQueryAction.prototype.execute = function (p_inputs) {
                            var _this = this;
                            if (p_inputs == null || p_inputs.length == 0) {
                                this._next.execute(p_inputs);
                                return;
                            }
                            else {
                                var currentFirstObject = p_inputs[0];
                                var nextIds = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                for (var i = 0; i < p_inputs.length; i++) {
                                    try {
                                        var loopObj = p_inputs[i];
                                        var raw = loopObj._manager.segment(loopObj, org.kevoree.modeling.memory.AccessMode.READ);
                                        if (raw != null) {
                                            if (this._referenceQuery == null) {
                                                for (var j = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                                                    var ref = loopObj.metaClass().metaReferences()[j];
                                                    var resolved = raw.get(ref.index(), loopObj.metaClass());
                                                    if (resolved != null) {
                                                        var resolvedArr = resolved;
                                                        for (var k = 0; k < resolvedArr.length; k++) {
                                                            var idResolved = resolvedArr[k];
                                                            nextIds.put(idResolved, idResolved);
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                var queries = this._referenceQuery.split(this.SEP);
                                                for (var k = 0; k < queries.length; k++) {
                                                    queries[k] = queries[k].replace("*", ".*");
                                                }
                                                var loopRefs = loopObj.metaClass().metaReferences();
                                                for (var h = 0; h < loopRefs.length; h++) {
                                                    var ref = loopRefs[h];
                                                    var selected = false;
                                                    for (var k = 0; k < queries.length; k++) {
                                                        if (queries[k] != null && queries[k].startsWith("#")) {
                                                            if (ref.opposite().metaName().matches(queries[k].substring(1))) {
                                                                selected = true;
                                                                break;
                                                            }
                                                        }
                                                        else {
                                                            if (ref.metaName().matches(queries[k])) {
                                                                selected = true;
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    if (selected) {
                                                        var resolved = raw.get(ref.index(), loopObj.metaClass());
                                                        if (resolved != null) {
                                                            var resolvedCasted = resolved;
                                                            for (var j = 0; j < resolvedCasted.length; j++) {
                                                                nextIds.put(resolvedCasted[j], resolvedCasted[j]);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e = $ex$;
                                            e.printStackTrace();
                                        }
                                    }
                                }
                                var trimmed = new Array();
                                var inserted = [0];
                                nextIds.each(function (key, value) {
                                    trimmed[inserted[0]] = key;
                                    inserted[0]++;
                                });
                                currentFirstObject._manager.lookupAllobjects(currentFirstObject.universe(), currentFirstObject.now(), trimmed, function (kObjects) {
                                    _this._next.execute(kObjects);
                                });
                            }
                        };
                        return KTraverseQueryAction;
                    })();
                    actions.KTraverseQueryAction = KTraverseQueryAction;
                })(actions = traversal.actions || (traversal.actions = {}));
                var selector;
                (function (selector) {
                    var KQuery = (function () {
                        function KQuery(relationName, params) {
                            this.relationName = relationName;
                            this.params = params;
                        }
                        KQuery.prototype.toString = function () {
                            return "KQuery{" + "relationName='" + this.relationName + '\'' + ", params='" + this.params + '\'' + '}';
                        };
                        KQuery.buildChain = function (query) {
                            var result = new java.util.ArrayList();
                            if (query == null || query.length == 0) {
                                return null;
                            }
                            var i = 0;
                            var escaped = false;
                            var previousKQueryStart = 0;
                            var previousKQueryNameEnd = -1;
                            var previousKQueryAttributesEnd = -1;
                            var previousKQueryAttributesStart = 0;
                            while (i < query.length) {
                                var notLastElem = (i + 1) != query.length;
                                if (escaped && notLastElem) {
                                    escaped = false;
                                }
                                else {
                                    var currentChar = query.charAt(i);
                                    if (currentChar == KQuery.CLOSE_BRACKET && notLastElem) {
                                        previousKQueryAttributesEnd = i;
                                    }
                                    else {
                                        if (currentChar == '\\' && notLastElem) {
                                            escaped = true;
                                        }
                                        else {
                                            if (currentChar == KQuery.OPEN_BRACKET && notLastElem) {
                                                previousKQueryNameEnd = i;
                                                previousKQueryAttributesStart = i + 1;
                                            }
                                            else {
                                                if (currentChar == KQuery.QUERY_SEP || !notLastElem) {
                                                    var relationName;
                                                    var atts = null;
                                                    if (previousKQueryNameEnd == -1) {
                                                        if (notLastElem) {
                                                            previousKQueryNameEnd = i;
                                                        }
                                                        else {
                                                            previousKQueryNameEnd = i + 1;
                                                        }
                                                    }
                                                    else {
                                                        if (previousKQueryAttributesStart != -1) {
                                                            if (previousKQueryAttributesEnd == -1) {
                                                                if (notLastElem || currentChar == KQuery.QUERY_SEP || currentChar == KQuery.CLOSE_BRACKET) {
                                                                    previousKQueryAttributesEnd = i;
                                                                }
                                                                else {
                                                                    previousKQueryAttributesEnd = i + 1;
                                                                }
                                                            }
                                                            atts = query.substring(previousKQueryAttributesStart, previousKQueryAttributesEnd);
                                                            if (atts.length == 0) {
                                                                atts = null;
                                                            }
                                                        }
                                                    }
                                                    relationName = query.substring(previousKQueryStart, previousKQueryNameEnd);
                                                    var additionalQuery = new org.kevoree.modeling.traversal.selector.KQuery(relationName, atts);
                                                    result.add(additionalQuery);
                                                    previousKQueryStart = i + 1;
                                                    previousKQueryNameEnd = -1;
                                                    previousKQueryAttributesEnd = -1;
                                                    previousKQueryAttributesStart = -1;
                                                }
                                            }
                                        }
                                    }
                                }
                                i = i + 1;
                            }
                            return result;
                        };
                        KQuery.OPEN_BRACKET = '[';
                        KQuery.CLOSE_BRACKET = ']';
                        KQuery.QUERY_SEP = '/';
                        return KQuery;
                    })();
                    selector.KQuery = KQuery;
                    var KQueryParam = (function () {
                        function KQueryParam(p_name, p_value, p_negative) {
                            this._name = p_name;
                            this._value = p_value;
                            this._negative = p_negative;
                        }
                        KQueryParam.prototype.name = function () {
                            return this._name;
                        };
                        KQueryParam.prototype.value = function () {
                            return this._value;
                        };
                        KQueryParam.prototype.isNegative = function () {
                            return this._negative;
                        };
                        return KQueryParam;
                    })();
                    selector.KQueryParam = KQueryParam;
                    var KSelector = (function () {
                        function KSelector() {
                        }
                        KSelector.select = function (root, query, callback) {
                            if (callback == null) {
                                return;
                            }
                            var current = null;
                            var extracted = org.kevoree.modeling.traversal.selector.KQuery.buildChain(query);
                            if (extracted != null) {
                                for (var i = 0; i < extracted.size(); i++) {
                                    if (current == null) {
                                        current = root.traversal().traverseQuery(extracted.get(i).relationName);
                                    }
                                    else {
                                        current = current.traverseQuery(extracted.get(i).relationName);
                                    }
                                    current = current.attributeQuery(extracted.get(i).params);
                                }
                            }
                            if (current != null) {
                                current.then(callback);
                            }
                            else {
                                callback(new Array());
                            }
                        };
                        return KSelector;
                    })();
                    selector.KSelector = KSelector;
                })(selector = traversal.selector || (traversal.selector = {}));
            })(traversal = modeling.traversal || (modeling.traversal = {}));
            var util;
            (function (util) {
                var Checker = (function () {
                    function Checker() {
                    }
                    Checker.isDefined = function (param) {
                        return param != undefined && param != null;
                    };
                    return Checker;
                })();
                util.Checker = Checker;
                var DefaultOperationManager = (function () {
                    function DefaultOperationManager(p_manager) {
                        this.remoteCallCallbacks = new org.kevoree.modeling.memory.struct.map.LongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._callbackId = 0;
                        this.staticOperations = new org.kevoree.modeling.memory.struct.map.IntHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this.instanceOperations = new org.kevoree.modeling.memory.struct.map.LongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._manager = p_manager;
                    }
                    DefaultOperationManager.prototype.registerOperation = function (operation, callback, target) {
                        if (target == null) {
                            var clazzOperations = this.staticOperations.get(operation.origin().index());
                            if (clazzOperations == null) {
                                clazzOperations = new org.kevoree.modeling.memory.struct.map.IntHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                this.staticOperations.put(operation.origin().index(), clazzOperations);
                            }
                            clazzOperations.put(operation.index(), callback);
                        }
                        else {
                            var objectOperations = this.instanceOperations.get(target.uuid());
                            if (objectOperations == null) {
                                objectOperations = new org.kevoree.modeling.memory.struct.map.IntHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                this.instanceOperations.put(target.uuid(), objectOperations);
                            }
                            objectOperations.put(operation.index(), callback);
                        }
                    };
                    DefaultOperationManager.prototype.searchOperation = function (source, clazz, operation) {
                        var objectOperations = this.instanceOperations.get(source);
                        if (objectOperations != null) {
                            return objectOperations.get(operation);
                        }
                        var clazzOperations = this.staticOperations.get(clazz);
                        if (clazzOperations != null) {
                            return clazzOperations.get(operation);
                        }
                        return null;
                    };
                    DefaultOperationManager.prototype.call = function (source, operation, param, callback) {
                        var operationCore = this.searchOperation(source.uuid(), operation.origin().index(), operation.index());
                        if (operationCore != null) {
                            operationCore(source, param, callback);
                        }
                        else {
                            this.sendToRemote(source, operation, param, callback);
                        }
                    };
                    DefaultOperationManager.prototype.sendToRemote = function (source, operation, param, callback) {
                        var stringParams = new Array();
                        for (var i = 0; i < param.length; i++) {
                            stringParams[i] = param[i].toString();
                        }
                        var contentKey = new org.kevoree.modeling.memory.KContentKey(source.universe(), source.now(), source.uuid());
                        var operationCall = new org.kevoree.modeling.msg.KOperationCallMessage();
                        operationCall.id = this.nextKey();
                        operationCall.key = contentKey;
                        operationCall.classIndex = source.metaClass().index();
                        operationCall.opIndex = operation.index();
                        operationCall.params = stringParams;
                        this.remoteCallCallbacks.put(operationCall.id, callback);
                        this._manager.cdn().send(operationCall);
                    };
                    DefaultOperationManager.prototype.nextKey = function () {
                        if (this._callbackId == org.kevoree.modeling.KConfig.CALLBACK_HISTORY) {
                            this._callbackId = 0;
                        }
                        else {
                            this._callbackId++;
                        }
                        return this._callbackId;
                    };
                    DefaultOperationManager.prototype.operationEventReceived = function (operationEvent) {
                        var _this = this;
                        if (operationEvent.type() == org.kevoree.modeling.msg.KMessageLoader.OPERATION_RESULT_TYPE) {
                            var operationResult = operationEvent;
                            var cb = this.remoteCallCallbacks.get(operationResult.id);
                            if (cb != null) {
                                cb(operationResult.value);
                            }
                        }
                        else {
                            if (operationEvent.type() == org.kevoree.modeling.msg.KMessageLoader.OPERATION_CALL_TYPE) {
                                var operationCall = operationEvent;
                                var sourceKey = operationCall.key;
                                var operationCore = this.searchOperation(sourceKey.obj, operationCall.classIndex, operationCall.opIndex);
                                if (operationCore != null) {
                                    var view = this._manager.model().universe(sourceKey.universe).time(sourceKey.time);
                                    view.lookup(sourceKey.obj, function (kObject) {
                                        if (kObject != null) {
                                            operationCore(kObject, operationCall.params, function (o) {
                                                var operationResultMessage = new org.kevoree.modeling.msg.KOperationResultMessage();
                                                operationResultMessage.key = operationCall.key;
                                                operationResultMessage.id = operationCall.id;
                                                operationResultMessage.value = o.toString();
                                                _this._manager.cdn().send(operationResultMessage);
                                            });
                                        }
                                    });
                                }
                            }
                            else {
                                System.err.println("BAD ROUTING !");
                            }
                        }
                    };
                    return DefaultOperationManager;
                })();
                util.DefaultOperationManager = DefaultOperationManager;
                var LocalEventListeners = (function () {
                    function LocalEventListeners() {
                        this._internalListenerKeyGen = new org.kevoree.modeling.memory.manager.KeyCalculator(0, 0);
                        this._simpleListener = new org.kevoree.modeling.memory.struct.map.LongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._multiListener = new org.kevoree.modeling.memory.struct.map.LongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._obj2Listener = new org.kevoree.modeling.memory.struct.map.LongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._listener2Object = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._listener2Objects = new org.kevoree.modeling.memory.struct.map.LongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._group2Listener = new org.kevoree.modeling.memory.struct.map.LongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                    }
                    LocalEventListeners.prototype.registerListener = function (groupId, origin, listener) {
                        var generateNewID = this._internalListenerKeyGen.nextKey();
                        this._simpleListener.put(generateNewID, listener);
                        this._listener2Object.put(generateNewID, origin.universe());
                        var subLayer = this._obj2Listener.get(origin.uuid());
                        if (subLayer == null) {
                            subLayer = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            this._obj2Listener.put(origin.uuid(), subLayer);
                        }
                        subLayer.put(generateNewID, origin.universe());
                        subLayer = this._group2Listener.get(groupId);
                        if (subLayer == null) {
                            subLayer = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            this._group2Listener.put(groupId, subLayer);
                        }
                        subLayer.put(generateNewID, 1);
                    };
                    LocalEventListeners.prototype.registerListenerAll = function (groupId, universe, objects, listener) {
                        var generateNewID = this._internalListenerKeyGen.nextKey();
                        this._multiListener.put(generateNewID, listener);
                        this._listener2Objects.put(generateNewID, objects);
                        var subLayer;
                        for (var i = 0; i < objects.length; i++) {
                            subLayer = this._obj2Listener.get(objects[i]);
                            if (subLayer == null) {
                                subLayer = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                this._obj2Listener.put(objects[i], subLayer);
                            }
                            subLayer.put(generateNewID, universe);
                        }
                        subLayer = this._group2Listener.get(groupId);
                        if (subLayer == null) {
                            subLayer = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            this._group2Listener.put(groupId, subLayer);
                        }
                        subLayer.put(generateNewID, 2);
                    };
                    LocalEventListeners.prototype.unregister = function (groupId) {
                        var _this = this;
                        var groupLayer = this._group2Listener.get(groupId);
                        if (groupLayer != null) {
                            groupLayer.each(function (listenerID, value) {
                                if (value == 1) {
                                    _this._simpleListener.remove(listenerID);
                                    var previousObject = _this._listener2Object.get(listenerID);
                                    _this._listener2Object.remove(listenerID);
                                    var _obj2ListenerLayer = _this._obj2Listener.get(previousObject);
                                    if (_obj2ListenerLayer != null) {
                                        _obj2ListenerLayer.remove(listenerID);
                                    }
                                }
                                else {
                                    _this._multiListener.remove(listenerID);
                                    var previousObjects = _this._listener2Objects.get(listenerID);
                                    for (var i = 0; i < previousObjects.length; i++) {
                                        var _obj2ListenerLayer = _this._obj2Listener.get(previousObjects[i]);
                                        if (_obj2ListenerLayer != null) {
                                            _obj2ListenerLayer.remove(listenerID);
                                        }
                                    }
                                    _this._listener2Objects.remove(listenerID);
                                }
                            });
                            this._group2Listener.remove(groupId);
                        }
                    };
                    LocalEventListeners.prototype.clear = function () {
                        this._simpleListener.clear();
                        this._multiListener.clear();
                        this._obj2Listener.clear();
                        this._group2Listener.clear();
                        this._listener2Object.clear();
                        this._listener2Objects.clear();
                    };
                    LocalEventListeners.prototype.setManager = function (manager) {
                        this._manager = manager;
                    };
                    LocalEventListeners.prototype.dispatch = function (param) {
                        var _this = this;
                        if (this._manager != null) {
                            var _cacheUniverse = new org.kevoree.modeling.memory.struct.map.LongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            if (param instanceof org.kevoree.modeling.msg.KEvents) {
                                var messages = param;
                                var toLoad = new Array();
                                var multiCounters = new Array();
                                for (var i = 0; i < messages.size(); i++) {
                                    var loopKey = messages.getKey(i);
                                    var listeners = this._obj2Listener.get(loopKey.obj);
                                    var isSelect = [false];
                                    if (listeners != null) {
                                        listeners.each(function (listenerKey, universeKey) {
                                            if (universeKey == loopKey.universe) {
                                                isSelect[0] = true;
                                                if (_this._multiListener.containsKey(listenerKey)) {
                                                    if (multiCounters[0] == null) {
                                                        multiCounters[0] = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                                    }
                                                    var previous = 0;
                                                    if (multiCounters[0].containsKey(listenerKey)) {
                                                        previous = multiCounters[0].get(listenerKey);
                                                    }
                                                    previous++;
                                                    multiCounters[0].put(listenerKey, previous);
                                                }
                                            }
                                        });
                                    }
                                    if (isSelect[0]) {
                                        toLoad[i] = loopKey;
                                    }
                                }
                                this._manager.bumpKeysToCache(toLoad, function (kCacheElements) {
                                    var multiObjectSets = new Array();
                                    var multiObjectIndexes = new Array();
                                    if (multiCounters[0] != null) {
                                        multiObjectSets[0] = new org.kevoree.modeling.memory.struct.map.LongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                        multiObjectIndexes[0] = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                        multiCounters[0].each(function (listenerKey, value) {
                                            multiObjectSets[0].put(listenerKey, new Array());
                                            multiObjectIndexes[0].put(listenerKey, 0);
                                        });
                                    }
                                    var listeners;
                                    for (var i = 0; i < messages.size(); i++) {
                                        if (kCacheElements[i] != null && kCacheElements[i] instanceof org.kevoree.modeling.memory.struct.segment.HeapCacheSegment) {
                                            var correspondingKey = toLoad[i];
                                            listeners = _this._obj2Listener.get(correspondingKey.obj);
                                            if (listeners != null) {
                                                var cachedUniverse = _cacheUniverse.get(correspondingKey.universe);
                                                if (cachedUniverse == null) {
                                                    cachedUniverse = _this._manager.model().universe(correspondingKey.universe);
                                                    _cacheUniverse.put(correspondingKey.universe, cachedUniverse);
                                                }
                                                var segment = kCacheElements[i];
                                                var toDispatch = _this._manager.model().createProxy(correspondingKey.universe, correspondingKey.time, correspondingKey.obj, _this._manager.model().metaModel().metaClasses()[segment.metaClassIndex()]);
                                                if (toDispatch != null) {
                                                    kCacheElements[i].inc();
                                                }
                                                var meta = new Array();
                                                for (var j = 0; j < messages.getIndexes(i).length; j++) {
                                                    meta[j] = toDispatch.metaClass().meta(messages.getIndexes(i)[j]);
                                                }
                                                listeners.each(function (listenerKey, value) {
                                                    var listener = _this._simpleListener.get(listenerKey);
                                                    if (listener != null) {
                                                        listener(toDispatch, meta);
                                                    }
                                                    else {
                                                        var multiListener = _this._multiListener.get(listenerKey);
                                                        if (multiListener != null) {
                                                            if (multiObjectSets[0] != null && multiObjectIndexes[0] != null) {
                                                                var index = multiObjectIndexes[0].get(listenerKey);
                                                                multiObjectSets[0].get(listenerKey)[index] = toDispatch;
                                                                index = index + 1;
                                                                multiObjectIndexes[0].put(listenerKey, index);
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                    if (multiObjectSets[0] != null) {
                                        multiObjectSets[0].each(function (key, value) {
                                            var multiListener = _this._multiListener.get(key);
                                            if (multiListener != null) {
                                                multiListener(value);
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    };
                    return LocalEventListeners;
                })();
                util.LocalEventListeners = LocalEventListeners;
            })(util = modeling.util || (modeling.util = {}));
        })(modeling = kevoree.modeling || (kevoree.modeling = {}));
    })(kevoree = org.kevoree || (org.kevoree = {}));
})(org || (org = {}));
