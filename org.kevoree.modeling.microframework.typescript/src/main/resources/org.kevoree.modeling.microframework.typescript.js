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
            var api;
            (function (api) {
                var InboundReference = (function () {
                    function InboundReference(p_reference, p_source) {
                        this._reference = p_reference;
                        this._source = p_source;
                    }
                    InboundReference.prototype.getReference = function () {
                        return this._reference;
                    };
                    InboundReference.prototype.getSource = function () {
                        return this._source;
                    };
                    return InboundReference;
                })();
                api.InboundReference = InboundReference;
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
                        for (var i = 0; i < org.kevoree.modeling.api.KActionType.values().length; i++) {
                            var current = org.kevoree.modeling.api.KActionType.values()[i];
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
                api.KActionType = KActionType;
                var TraceRequest = (function () {
                    function TraceRequest() {
                    }
                    TraceRequest.prototype.equals = function (other) {
                        return this == other;
                    };
                    TraceRequest.values = function () {
                        return TraceRequest._TraceRequestVALUES;
                    };
                    TraceRequest.ATTRIBUTES_ONLY = new TraceRequest();
                    TraceRequest.REFERENCES_ONLY = new TraceRequest();
                    TraceRequest.ATTRIBUTES_REFERENCES = new TraceRequest();
                    TraceRequest._TraceRequestVALUES = [
                        TraceRequest.ATTRIBUTES_ONLY,
                        TraceRequest.REFERENCES_ONLY,
                        TraceRequest.ATTRIBUTES_REFERENCES
                    ];
                    return TraceRequest;
                })();
                api.TraceRequest = TraceRequest;
                var VisitRequest = (function () {
                    function VisitRequest() {
                    }
                    VisitRequest.prototype.equals = function (other) {
                        return this == other;
                    };
                    VisitRequest.values = function () {
                        return VisitRequest._VisitRequestVALUES;
                    };
                    VisitRequest.CHILDREN = new VisitRequest();
                    VisitRequest.CONTAINED = new VisitRequest();
                    VisitRequest.ALL = new VisitRequest();
                    VisitRequest._VisitRequestVALUES = [
                        VisitRequest.CHILDREN,
                        VisitRequest.CONTAINED,
                        VisitRequest.ALL
                    ];
                    return VisitRequest;
                })();
                api.VisitRequest = VisitRequest;
                var VisitResult = (function () {
                    function VisitResult() {
                    }
                    VisitResult.prototype.equals = function (other) {
                        return this == other;
                    };
                    VisitResult.values = function () {
                        return VisitResult._VisitResultVALUES;
                    };
                    VisitResult.CONTINUE = new VisitResult();
                    VisitResult.SKIP = new VisitResult();
                    VisitResult.STOP = new VisitResult();
                    VisitResult._VisitResultVALUES = [
                        VisitResult.CONTINUE,
                        VisitResult.SKIP,
                        VisitResult.STOP
                    ];
                    return VisitResult;
                })();
                api.VisitResult = VisitResult;
                var abs;
                (function (abs) {
                    var AbstractKDataType = (function () {
                        function AbstractKDataType(p_name, p_isEnum) {
                            this._isEnum = false;
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
                            if (src != null) {
                                if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING) {
                                    return org.kevoree.modeling.api.json.JsonString.encode(src.toString());
                                }
                                else {
                                    return src.toString();
                                }
                            }
                            return "";
                        };
                        AbstractKDataType.prototype.load = function (payload) {
                            if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING) {
                                return org.kevoree.modeling.api.json.JsonString.unescape(payload);
                            }
                            if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.LONG) {
                                return java.lang.Long.parseLong(payload);
                            }
                            if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.INT) {
                                return java.lang.Integer.parseInt(payload);
                            }
                            if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL) {
                                return payload.equals("true");
                            }
                            if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.SHORT) {
                                return java.lang.Short.parseShort(payload);
                            }
                            if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.DOUBLE) {
                                return java.lang.Double.parseDouble(payload);
                            }
                            if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.FLOAT) {
                                return java.lang.Float.parseFloat(payload);
                            }
                            return null;
                        };
                        return AbstractKDataType;
                    })();
                    abs.AbstractKDataType = AbstractKDataType;
                    var AbstractKModel = (function () {
                        function AbstractKModel() {
                            this._storage = new org.kevoree.modeling.api.data.DefaultKStore(this);
                        }
                        AbstractKModel.prototype.metaModel = function () {
                            throw "Abstract method";
                        };
                        AbstractKModel.prototype.connect = function (callback) {
                            this._storage.connect(callback);
                        };
                        AbstractKModel.prototype.close = function (callback) {
                            this._storage.close(callback);
                        };
                        AbstractKModel.prototype.storage = function () {
                            return this._storage;
                        };
                        AbstractKModel.prototype.newUniverse = function () {
                            var nextKey = this._storage.nextUniverseKey();
                            var newDimension = this.internal_create(nextKey);
                            this.storage().initUniverse(newDimension);
                            return newDimension;
                        };
                        AbstractKModel.prototype.internal_create = function (key) {
                            throw "Abstract method";
                        };
                        AbstractKModel.prototype.universe = function (key) {
                            var newDimension = this.internal_create(key);
                            this.storage().initUniverse(newDimension);
                            return newDimension;
                        };
                        AbstractKModel.prototype.save = function (callback) {
                        };
                        AbstractKModel.prototype.discard = function (callback) {
                        };
                        AbstractKModel.prototype.unload = function (callback) {
                        };
                        AbstractKModel.prototype.disable = function (listener) {
                        };
                        AbstractKModel.prototype.listen = function (listener) {
                            this.storage().eventBroker().registerListener(this, listener, null);
                        };
                        AbstractKModel.prototype.setEventBroker = function (p_eventBroker) {
                            this.storage().setEventBroker(p_eventBroker);
                            p_eventBroker.setMetaModel(this.metaModel());
                            return this;
                        };
                        AbstractKModel.prototype.setDataBase = function (p_dataBase) {
                            this.storage().setDataBase(p_dataBase);
                            return this;
                        };
                        AbstractKModel.prototype.setScheduler = function (p_scheduler) {
                            this.storage().setScheduler(p_scheduler);
                            return this;
                        };
                        AbstractKModel.prototype.setOperation = function (metaOperation, operation) {
                            this.storage().operationManager().registerOperation(metaOperation, operation, null);
                        };
                        AbstractKModel.prototype.setInstanceOperation = function (metaOperation, target, operation) {
                            this.storage().operationManager().registerOperation(metaOperation, operation, target);
                        };
                        AbstractKModel.prototype.task = function () {
                            return new org.kevoree.modeling.api.abs.AbstractKTask();
                        };
                        AbstractKModel.prototype.taskSave = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.save(task.initCallback());
                            return task;
                        };
                        AbstractKModel.prototype.taskDiscard = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.discard(task.initCallback());
                            return task;
                        };
                        AbstractKModel.prototype.taskUnload = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.unload(task.initCallback());
                            return task;
                        };
                        AbstractKModel.prototype.taskConnect = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.connect(task.initCallback());
                            return task;
                        };
                        AbstractKModel.prototype.taskClose = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.close(task.initCallback());
                            return task;
                        };
                        return AbstractKModel;
                    })();
                    abs.AbstractKModel = AbstractKModel;
                    var AbstractKObject = (function () {
                        function AbstractKObject(p_view, p_uuid, p_timeTree, p_metaClass) {
                            this._view = p_view;
                            this._uuid = p_uuid;
                            this._timeTree = p_timeTree;
                            this._metaClass = p_metaClass;
                        }
                        AbstractKObject.prototype.view = function () {
                            return this._view;
                        };
                        AbstractKObject.prototype.uuid = function () {
                            return this._uuid;
                        };
                        AbstractKObject.prototype.metaClass = function () {
                            return this._metaClass;
                        };
                        AbstractKObject.prototype.isRoot = function () {
                            var raw = this._view.universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                            if (raw != null) {
                                var isRoot = raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX];
                                if (isRoot == null) {
                                    return false;
                                }
                                else {
                                    return isRoot;
                                }
                            }
                            else {
                                return false;
                            }
                        };
                        AbstractKObject.prototype.setRoot = function (isRoot) {
                            var raw = this._view.universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                            if (raw != null) {
                                raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = isRoot;
                            }
                        };
                        AbstractKObject.prototype.now = function () {
                            return this._view.now();
                        };
                        AbstractKObject.prototype.timeTree = function () {
                            return this._timeTree;
                        };
                        AbstractKObject.prototype.universe = function () {
                            return this._view.universe();
                        };
                        AbstractKObject.prototype.path = function (callback) {
                            var _this = this;
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(callback)) {
                                return;
                            }
                            if (this.isRoot()) {
                                callback("/");
                            }
                            else {
                                this.parent(function (parent) {
                                    if (parent == null) {
                                        callback(null);
                                    }
                                    else {
                                        parent.path(function (parentPath) {
                                            callback(org.kevoree.modeling.api.util.PathHelper.path(parentPath, _this.referenceInParent(), _this));
                                        });
                                    }
                                });
                            }
                        };
                        AbstractKObject.prototype.parentUuid = function () {
                            var raw = this._view.universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                            if (raw == null) {
                                return null;
                            }
                            else {
                                return raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX];
                            }
                        };
                        AbstractKObject.prototype.parent = function (callback) {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(callback)) {
                                return;
                            }
                            var parentKID = this.parentUuid();
                            if (parentKID == null) {
                                callback(null);
                            }
                            else {
                                this._view.lookup(parentKID, callback);
                            }
                        };
                        AbstractKObject.prototype.referenceInParent = function () {
                            var raw = this._view.universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                            if (raw == null) {
                                return null;
                            }
                            else {
                                return raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX];
                            }
                        };
                        AbstractKObject.prototype.delete = function (callback) {
                            var toRemove = this;
                            var rawPayload = this._view.universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.DELETE);
                            if (rawPayload == null) {
                                callback(new java.lang.Exception("Out of cache Error"));
                            }
                            else {
                                var payload = rawPayload[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                if (payload != null) {
                                    var inboundsKeys = payload;
                                    var refArr = inboundsKeys.toArray(new Array());
                                    this.view().lookupAll(refArr, function (resolved) {
                                        for (var i = 0; i < resolved.length; i++) {
                                            if (resolved[i] != null) {
                                                var linkedReferences = resolved[i].referencesWith(toRemove);
                                                for (var j = 0; j < linkedReferences.length; j++) {
                                                    resolved[i].internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, linkedReferences[j], toRemove, false, true);
                                                }
                                            }
                                        }
                                        if (callback != null) {
                                            callback(null);
                                        }
                                    });
                                }
                                else {
                                    callback(new java.lang.Exception("Out of cache error"));
                                }
                            }
                        };
                        AbstractKObject.prototype.select = function (query, callback) {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(callback)) {
                                return;
                            }
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(query)) {
                                callback(new Array());
                                return;
                            }
                            var cleanedQuery = query;
                            if (cleanedQuery.startsWith("/")) {
                                cleanedQuery = cleanedQuery.substring(1);
                            }
                            if (this.isRoot()) {
                                org.kevoree.modeling.api.traversal.selector.KSelector.select(this, cleanedQuery, callback);
                            }
                            else {
                                if (query.startsWith("/")) {
                                    var finalCleanedQuery = cleanedQuery;
                                    this.universe().model().storage().getRoot(this.view(), function (rootObj) {
                                        if (rootObj == null) {
                                            callback(new Array());
                                        }
                                        else {
                                            org.kevoree.modeling.api.traversal.selector.KSelector.select(rootObj, finalCleanedQuery, callback);
                                        }
                                    });
                                }
                                else {
                                    org.kevoree.modeling.api.traversal.selector.KSelector.select(this, query, callback);
                                }
                            }
                        };
                        AbstractKObject.prototype.listen = function (listener) {
                            this.universe().model().storage().eventBroker().registerListener(this, listener, null);
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
                        AbstractKObject.prototype.set = function (p_attribute, payload) {
                            var transposed = this.internal_transpose_att(p_attribute);
                            if (transposed == null) {
                                throw new java.lang.RuntimeException("Bad KMF usage, the attribute named " + p_attribute.metaName() + " is not part of " + this.metaClass().metaName());
                            }
                            else {
                                transposed.strategy().mutate(this, transposed, payload);
                                this.view().universe().model().storage().eventBroker().notify(new org.kevoree.modeling.api.event.DefaultKEvent(org.kevoree.modeling.api.KActionType.SET, this, transposed, payload));
                            }
                        };
                        AbstractKObject.prototype.removeFromContainer = function (param) {
                            if (param != null && param.parentUuid() != null && param.parentUuid() != this._uuid) {
                                this.view().lookup(param.parentUuid(), function (parent) {
                                    parent.internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, param.referenceInParent(), param, true, false);
                                });
                            }
                        };
                        AbstractKObject.prototype.mutate = function (actionType, metaReference, param) {
                            this.internal_mutate(actionType, metaReference, param, true, false);
                        };
                        AbstractKObject.prototype.internal_mutate = function (actionType, metaReferenceP, param, setOpposite, inDelete) {
                            var _this = this;
                            var metaReference = this.internal_transpose_ref(metaReferenceP);
                            if (metaReference == null) {
                                if (metaReferenceP == null) {
                                    throw new java.lang.RuntimeException("Bad KMF usage, the reference " + " is null in metaClass named " + this.metaClass().metaName());
                                }
                                else {
                                    throw new java.lang.RuntimeException("Bad KMF usage, the reference named " + metaReferenceP.metaName() + " is not part of " + this.metaClass().metaName());
                                }
                            }
                            if (actionType.equals(org.kevoree.modeling.api.KActionType.ADD)) {
                                if (metaReference.single()) {
                                    this.internal_mutate(org.kevoree.modeling.api.KActionType.SET, metaReference, param, setOpposite, inDelete);
                                }
                                else {
                                    var raw = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                    var previousList;
                                    if (raw[metaReference.index()] != null && raw[metaReference.index()] instanceof java.util.Set) {
                                        previousList = raw[metaReference.index()];
                                    }
                                    else {
                                        if (raw[metaReference.index()] != null) {
                                            try {
                                                throw new java.lang.Exception("Bad cache values in KMF, " + raw[metaReference.index()] + " is not an instance of Set for the reference " + metaReference.metaName() + ", index:" + metaReference.index());
                                            }
                                            catch ($ex$) {
                                                if ($ex$ instanceof java.lang.Exception) {
                                                    var e = $ex$;
                                                    e.printStackTrace();
                                                }
                                            }
                                        }
                                        previousList = new java.util.HashSet();
                                        raw[metaReference.index()] = previousList;
                                    }
                                    previousList.add(param.uuid());
                                    if (metaReference.opposite() != null && setOpposite) {
                                        param.internal_mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference.opposite(), this, false, inDelete);
                                    }
                                    if (metaReference.contained()) {
                                        this.removeFromContainer(param);
                                        param.set_parent(this._uuid, metaReference);
                                    }
                                    var rawParam = this.view().universe().model().storage().raw(param, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                    var previousInbounds;
                                    if (rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null && rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] instanceof java.util.Set) {
                                        previousInbounds = rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                    }
                                    else {
                                        if (rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null) {
                                            try {
                                                throw new java.lang.Exception("Bad cache values in KMF, " + rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] + " is not an instance of Set for the INBOUNDS storage");
                                            }
                                            catch ($ex$) {
                                                if ($ex$ instanceof java.lang.Exception) {
                                                    var e = $ex$;
                                                    e.printStackTrace();
                                                }
                                            }
                                        }
                                        previousInbounds = new java.util.HashSet();
                                        rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] = previousInbounds;
                                    }
                                    previousInbounds.add(this.uuid());
                                    var event = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, param);
                                    this.view().universe().model().storage().eventBroker().notify(event);
                                }
                            }
                            else {
                                if (actionType.equals(org.kevoree.modeling.api.KActionType.SET)) {
                                    if (!metaReference.single()) {
                                        this.internal_mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference, param, setOpposite, inDelete);
                                    }
                                    else {
                                        if (param == null) {
                                            this.internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference, null, setOpposite, inDelete);
                                        }
                                        else {
                                            var payload = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                            var previous = payload[metaReference.index()];
                                            if (previous != null) {
                                                this.internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference, null, setOpposite, inDelete);
                                            }
                                            payload[metaReference.index()] = param.uuid();
                                            if (metaReference.contained()) {
                                                this.removeFromContainer(param);
                                                param.set_parent(this._uuid, metaReference);
                                            }
                                            var rawParam = this.view().universe().model().storage().raw(param, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                            var previousInbounds;
                                            if (rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null && rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] instanceof java.util.Set) {
                                                previousInbounds = rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                            }
                                            else {
                                                if (rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null) {
                                                    try {
                                                        throw new java.lang.Exception("Bad cache values in KMF, " + rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] + " is not an instance of Set for the INBOUNDS storage");
                                                    }
                                                    catch ($ex$) {
                                                        if ($ex$ instanceof java.lang.Exception) {
                                                            var e = $ex$;
                                                            e.printStackTrace();
                                                        }
                                                    }
                                                }
                                                previousInbounds = new java.util.HashSet();
                                                rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] = previousInbounds;
                                            }
                                            previousInbounds.add(this.uuid());
                                            var self = this;
                                            if (metaReference.opposite() != null && setOpposite) {
                                                if (previous != null) {
                                                    this.view().lookup(previous, function (resolved) {
                                                        resolved.internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), self, false, inDelete);
                                                    });
                                                }
                                                param.internal_mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference.opposite(), this, false, inDelete);
                                            }
                                            var event = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, param);
                                            this.view().universe().model().storage().eventBroker().notify(event);
                                        }
                                    }
                                }
                                else {
                                    if (actionType.equals(org.kevoree.modeling.api.KActionType.REMOVE)) {
                                        if (metaReference.single()) {
                                            var raw = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                            var previousKid = raw[metaReference.index()];
                                            raw[metaReference.index()] = null;
                                            if (previousKid != null) {
                                                var self = this;
                                                this._view.universe().model().storage().lookup(this._view, previousKid, function (resolvedParam) {
                                                    if (resolvedParam != null) {
                                                        if (metaReference.contained()) {
                                                            resolvedParam.set_parent(null, null);
                                                        }
                                                        if (metaReference.opposite() != null && setOpposite) {
                                                            resolvedParam.internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), self, false, inDelete);
                                                        }
                                                        var rawParam = _this.view().universe().model().storage().raw(resolvedParam, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                                        var previousInbounds;
                                                        if (rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null && rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] instanceof java.util.Set) {
                                                            previousInbounds = rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                                        }
                                                        else {
                                                            if (rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null) {
                                                                try {
                                                                    throw new java.lang.Exception("Bad cache values in KMF, " + rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] + " is not an instance of Set for the INBOUNDS storage");
                                                                }
                                                                catch ($ex$) {
                                                                    if ($ex$ instanceof java.lang.Exception) {
                                                                        var e = $ex$;
                                                                        e.printStackTrace();
                                                                    }
                                                                }
                                                            }
                                                            previousInbounds = new java.util.HashSet();
                                                            rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] = previousInbounds;
                                                        }
                                                        previousInbounds.remove(_this._uuid);
                                                    }
                                                });
                                                var event = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, previousKid);
                                                this.view().universe().model().storage().eventBroker().notify(event);
                                            }
                                        }
                                        else {
                                            var payload = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                            var previous = payload[metaReference.index()];
                                            if (previous != null) {
                                                var previousList = previous;
                                                previousList.remove(param.uuid());
                                                if (!inDelete && metaReference.contained()) {
                                                    param.set_parent(null, null);
                                                }
                                                if (metaReference.opposite() != null && setOpposite) {
                                                    param.internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), this, false, inDelete);
                                                }
                                                var event = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, param);
                                                this.view().universe().model().storage().eventBroker().notify(event);
                                            }
                                            if (!inDelete) {
                                                var rawParam = this.view().universe().model().storage().raw(param, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                                if (rawParam != null && rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null && rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] instanceof java.util.Set) {
                                                    var previousInbounds = rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                                    previousInbounds.remove(this._uuid);
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
                                var raw = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                                if (raw != null) {
                                    var ref = raw[transposed.index()];
                                    if (ref == null) {
                                        return 0;
                                    }
                                    else {
                                        var refSet = ref;
                                        return refSet.size();
                                    }
                                }
                                else {
                                    return 0;
                                }
                            }
                        };
                        AbstractKObject.prototype.ref = function (p_metaReference, p_callback) {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(p_callback)) {
                                return;
                            }
                            var transposed = this.internal_transpose_ref(p_metaReference);
                            if (transposed == null) {
                                throw new java.lang.RuntimeException("Bad KMF usage, the reference named " + p_metaReference.metaName() + " is not part of " + this.metaClass().metaName());
                            }
                            else {
                                var raw = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                                if (raw == null) {
                                    p_callback(new Array());
                                }
                                else {
                                    var o = raw[transposed.index()];
                                    if (o == null) {
                                        p_callback(new Array());
                                    }
                                    else {
                                        if (o instanceof java.util.Set) {
                                            var objs = o;
                                            var setContent = objs.toArray(new Array());
                                            this.view().lookupAll(setContent, function (result) {
                                                try {
                                                    p_callback(result);
                                                }
                                                catch ($ex$) {
                                                    if ($ex$ instanceof java.lang.Throwable) {
                                                        var t = $ex$;
                                                        t.printStackTrace();
                                                        p_callback(null);
                                                    }
                                                }
                                            });
                                        }
                                        else {
                                            var content = [o];
                                            this.view().lookupAll(content, function (result) {
                                                try {
                                                    p_callback(result);
                                                }
                                                catch ($ex$) {
                                                    if ($ex$ instanceof java.lang.Throwable) {
                                                        var t = $ex$;
                                                        t.printStackTrace();
                                                        p_callback(null);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        };
                        AbstractKObject.prototype.inferRef = function (p_metaReference, p_callback) {
                        };
                        AbstractKObject.prototype.visitAttributes = function (visitor) {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(visitor)) {
                                return;
                            }
                            var metaAttributes = this.metaClass().metaAttributes();
                            for (var i = 0; i < metaAttributes.length; i++) {
                                visitor(metaAttributes[i], this.get(metaAttributes[i]));
                            }
                        };
                        AbstractKObject.prototype.visit = function (p_visitor, p_end, p_request) {
                            if (p_request.equals(org.kevoree.modeling.api.VisitRequest.CHILDREN)) {
                                this.internal_visit(p_visitor, p_end, false, false, null, null);
                            }
                            else {
                                if (p_request.equals(org.kevoree.modeling.api.VisitRequest.ALL)) {
                                    this.internal_visit(p_visitor, p_end, true, false, new java.util.HashSet(), new java.util.HashSet());
                                }
                                else {
                                    if (p_request.equals(org.kevoree.modeling.api.VisitRequest.CONTAINED)) {
                                        this.internal_visit(p_visitor, p_end, true, true, null, null);
                                    }
                                }
                            }
                        };
                        AbstractKObject.prototype.internal_visit = function (visitor, end, deep, containedOnly, visited, traversed) {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(visitor)) {
                                return;
                            }
                            if (traversed != null) {
                                traversed.add(this._uuid);
                            }
                            var toResolveIds = new java.util.HashSet();
                            for (var i = 0; i < this.metaClass().metaReferences().length; i++) {
                                var reference = this.metaClass().metaReferences()[i];
                                if (!(containedOnly && !reference.contained())) {
                                    var raw = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                                    var obj = null;
                                    if (raw != null) {
                                        obj = raw[reference.index()];
                                    }
                                    if (obj != null) {
                                        if (obj instanceof java.util.Set) {
                                            var ids = obj;
                                            var idArr = ids.toArray(new Array());
                                            for (var k = 0; k < idArr.length; k++) {
                                                if (traversed == null || !traversed.contains(idArr[k])) {
                                                    toResolveIds.add(idArr[k]);
                                                }
                                            }
                                        }
                                        else {
                                            if (traversed == null || !traversed.contains(obj)) {
                                                toResolveIds.add(obj);
                                            }
                                        }
                                    }
                                }
                            }
                            if (toResolveIds.isEmpty()) {
                                if (org.kevoree.modeling.api.util.Checker.isDefined(end)) {
                                    end(null);
                                }
                            }
                            else {
                                var toResolveIdsArr = toResolveIds.toArray(new Array());
                                this.view().lookupAll(toResolveIdsArr, function (resolvedArr) {
                                    var nextDeep = new java.util.ArrayList();
                                    for (var i = 0; i < resolvedArr.length; i++) {
                                        var resolved = resolvedArr[i];
                                        var result = org.kevoree.modeling.api.VisitResult.CONTINUE;
                                        if (visitor != null && (visited == null || !visited.contains(resolved.uuid()))) {
                                            result = visitor(resolved);
                                        }
                                        if (visited != null) {
                                            visited.add(resolved.uuid());
                                        }
                                        if (result != null && result.equals(org.kevoree.modeling.api.VisitResult.STOP)) {
                                            if (org.kevoree.modeling.api.util.Checker.isDefined(end)) {
                                                end(null);
                                            }
                                        }
                                        else {
                                            if (deep) {
                                                if (result.equals(org.kevoree.modeling.api.VisitResult.CONTINUE)) {
                                                    if (traversed == null || !traversed.contains(resolved.uuid())) {
                                                        nextDeep.add(resolved);
                                                    }
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
                                                if (org.kevoree.modeling.api.util.Checker.isDefined(end)) {
                                                    end(null);
                                                }
                                            }
                                            else {
                                                var abstractKObject = nextDeep.get(index[0]);
                                                if (containedOnly) {
                                                    abstractKObject.internal_visit(visitor, next.get(0), true, true, visited, traversed);
                                                }
                                                else {
                                                    abstractKObject.internal_visit(visitor, next.get(0), true, false, visited, traversed);
                                                }
                                            }
                                        });
                                        var abstractKObject = nextDeep.get(index[0]);
                                        if (containedOnly) {
                                            abstractKObject.internal_visit(visitor, next.get(0), true, true, visited, traversed);
                                        }
                                        else {
                                            abstractKObject.internal_visit(visitor, next.get(0), true, false, visited, traversed);
                                        }
                                    }
                                    else {
                                        if (org.kevoree.modeling.api.util.Checker.isDefined(end)) {
                                            end(null);
                                        }
                                    }
                                });
                            }
                        };
                        AbstractKObject.prototype.toJSON = function () {
                            var raw = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                            if (raw != null) {
                                return org.kevoree.modeling.api.data.JsonRaw.encode(raw, this._uuid, this._metaClass, true);
                            }
                            else {
                                return "";
                            }
                        };
                        AbstractKObject.prototype.toString = function () {
                            return this.toJSON();
                        };
                        AbstractKObject.prototype.traces = function (request) {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(request)) {
                                return null;
                            }
                            var traces = new java.util.ArrayList();
                            if (org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_ONLY.equals(request) || org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
                                for (var i = 0; i < this.metaClass().metaAttributes().length; i++) {
                                    var current = this.metaClass().metaAttributes()[i];
                                    var payload = this.get(current);
                                    if (payload != null) {
                                        traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(this._uuid, current, payload));
                                    }
                                }
                            }
                            if (org.kevoree.modeling.api.TraceRequest.REFERENCES_ONLY.equals(request) || org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
                                for (var i = 0; i < this.metaClass().metaReferences().length; i++) {
                                    var ref = this.metaClass().metaReferences()[i];
                                    var raw = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                                    var o = null;
                                    if (raw != null) {
                                        o = raw[ref.index()];
                                    }
                                    if (o instanceof java.util.Set) {
                                        var contents = o;
                                        var contentsArr = contents.toArray(new Array());
                                        for (var j = 0; j < contentsArr.length; j++) {
                                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(this._uuid, ref, contentsArr[j]));
                                        }
                                    }
                                    else {
                                        if (o != null) {
                                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(this._uuid, ref, o));
                                        }
                                    }
                                }
                            }
                            return traces.toArray(new Array());
                        };
                        AbstractKObject.prototype.inbounds = function (callback) {
                            var rawPayload = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                            if (rawPayload != null) {
                                var payload = rawPayload[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                if (payload != null) {
                                    var inboundsKeys = payload;
                                    var keysArr = inboundsKeys.toArray(new Array());
                                    this._view.lookupAll(keysArr, callback);
                                }
                                else {
                                    callback(new Array());
                                }
                            }
                            else {
                                callback(new Array());
                            }
                        };
                        AbstractKObject.prototype.set_parent = function (p_parentKID, p_metaReference) {
                            var raw = this._view.universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                            if (raw != null) {
                                raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX] = p_parentKID;
                                raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX] = p_metaReference;
                            }
                        };
                        AbstractKObject.prototype.equals = function (obj) {
                            if (!(obj instanceof org.kevoree.modeling.api.abs.AbstractKObject)) {
                                return false;
                            }
                            else {
                                var casted = obj;
                                return (casted.uuid() == this._uuid) && this._view.equals(casted._view);
                            }
                        };
                        AbstractKObject.prototype.hashCode = function () {
                            var hashString = this.uuid() + "-" + this.view().now() + "-" + this.view().universe().key();
                            return hashString.hashCode();
                        };
                        AbstractKObject.prototype.diff = function (target, callback) {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.diff(this, target, callback);
                        };
                        AbstractKObject.prototype.merge = function (target, callback) {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.merge(this, target, callback);
                        };
                        AbstractKObject.prototype.intersection = function (target, callback) {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.intersection(this, target, callback);
                        };
                        AbstractKObject.prototype.jump = function (time, callback) {
                            this.view().universe().time(time).lookup(this._uuid, function (kObject) {
                                if (callback != null) {
                                    try {
                                        callback(kObject);
                                    }
                                    catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Throwable) {
                                            var e = $ex$;
                                            e.printStackTrace();
                                            callback(null);
                                        }
                                    }
                                }
                            });
                        };
                        AbstractKObject.prototype.internal_transpose_ref = function (p) {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(p)) {
                                return null;
                            }
                            else {
                                return this.metaClass().metaReference(p.metaName());
                            }
                        };
                        AbstractKObject.prototype.internal_transpose_att = function (p) {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(p)) {
                                return null;
                            }
                            else {
                                return this.metaClass().metaAttribute(p.metaName());
                            }
                        };
                        AbstractKObject.prototype.internal_transpose_op = function (p) {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(p)) {
                                return null;
                            }
                            else {
                                return this.metaClass().metaOperation(p.metaName());
                            }
                        };
                        AbstractKObject.prototype.traverse = function (p_metaReference) {
                            return new org.kevoree.modeling.api.traversal.DefaultKTraversal(this, new org.kevoree.modeling.api.traversal.actions.KTraverseAction(p_metaReference));
                        };
                        AbstractKObject.prototype.traverseQuery = function (metaReferenceQuery) {
                            return new org.kevoree.modeling.api.traversal.DefaultKTraversal(this, new org.kevoree.modeling.api.traversal.actions.KTraverseQueryAction(metaReferenceQuery));
                        };
                        AbstractKObject.prototype.traverseInbounds = function (metaReferenceQuery) {
                            return new org.kevoree.modeling.api.traversal.DefaultKTraversal(this, new org.kevoree.modeling.api.traversal.actions.KReverseQueryAction(metaReferenceQuery));
                        };
                        AbstractKObject.prototype.traverseParent = function () {
                            return new org.kevoree.modeling.api.traversal.DefaultKTraversal(this, new org.kevoree.modeling.api.traversal.actions.KParentsAction());
                        };
                        AbstractKObject.prototype.referencesWith = function (o) {
                            if (org.kevoree.modeling.api.util.Checker.isDefined(o)) {
                                var raw = this._view.universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                                if (raw != null) {
                                    var allReferences = this.metaClass().metaReferences();
                                    var selected = new java.util.ArrayList();
                                    for (var i = 0; i < allReferences.length; i++) {
                                        var rawI = raw[allReferences[i].index()];
                                        if (rawI instanceof java.util.Set) {
                                            try {
                                                var castedSet = rawI;
                                                if (castedSet.contains(o.uuid())) {
                                                    selected.add(allReferences[i]);
                                                }
                                            }
                                            catch ($ex$) {
                                                if ($ex$ instanceof java.lang.Exception) {
                                                    var e = $ex$;
                                                    e.printStackTrace();
                                                }
                                            }
                                        }
                                        else {
                                            if (rawI != null) {
                                                try {
                                                    var casted = rawI;
                                                    if (casted == o.uuid()) {
                                                        selected.add(allReferences[i]);
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
                        AbstractKObject.prototype.taskVisit = function (p_visitor, p_request) {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.visit(p_visitor, task.initCallback(), p_request);
                            return task;
                        };
                        AbstractKObject.prototype.taskDelete = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.delete(task.initCallback());
                            return task;
                        };
                        AbstractKObject.prototype.taskParent = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.parent(task.initCallback());
                            return task;
                        };
                        AbstractKObject.prototype.taskSelect = function (p_query) {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.select(p_query, task.initCallback());
                            return task;
                        };
                        AbstractKObject.prototype.taskRef = function (p_metaReference) {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.ref(p_metaReference, task.initCallback());
                            return task;
                        };
                        AbstractKObject.prototype.taskInbounds = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.inbounds(task.initCallback());
                            return task;
                        };
                        AbstractKObject.prototype.taskDiff = function (p_target) {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.diff(p_target, task.initCallback());
                            return task;
                        };
                        AbstractKObject.prototype.taskMerge = function (p_target) {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.merge(p_target, task.initCallback());
                            return task;
                        };
                        AbstractKObject.prototype.taskIntersection = function (p_target) {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.intersection(p_target, task.initCallback());
                            return task;
                        };
                        AbstractKObject.prototype.taskJump = function (p_time) {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.jump(p_time, task.initCallback());
                            return task;
                        };
                        AbstractKObject.prototype.taskPath = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.path(task.initCallback());
                            return task;
                        };
                        AbstractKObject.prototype.taskInferObjects = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.inferObjects(task.initCallback());
                            return task;
                        };
                        AbstractKObject.prototype.inferObjects = function (p_callback) {
                        };
                        AbstractKObject.prototype.call = function (p_operation, p_params, p_callback) {
                            this.view().universe().model().storage().operationManager().call(this, p_operation, p_params, p_callback);
                        };
                        AbstractKObject.prototype.taskCall = function (p_operation, p_params) {
                            var temp_task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.call(p_operation, p_params, temp_task.initCallback());
                            return temp_task;
                        };
                        AbstractKObject.prototype.inferAttribute = function (attribute) {
                            return null;
                        };
                        AbstractKObject.prototype.inferCall = function (operation, params, callback) {
                        };
                        return AbstractKObject;
                    })();
                    abs.AbstractKObject = AbstractKObject;
                    var AbstractKObjectInfer = (function (_super) {
                        __extends(AbstractKObjectInfer, _super);
                        function AbstractKObjectInfer(p_view, p_uuid, p_timeTree, p_metaClass) {
                            _super.call(this, p_view, p_uuid, p_timeTree, p_metaClass);
                        }
                        AbstractKObjectInfer.prototype.readOnlyState = function () {
                            var raw = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                            if (raw != null) {
                                if (raw[org.kevoree.modeling.api.meta.MetaInferClass.getInstance().getCache().index()] == null) {
                                    this.internal_load(raw);
                                }
                                return raw[org.kevoree.modeling.api.meta.MetaInferClass.getInstance().getCache().index()];
                            }
                            else {
                                return null;
                            }
                        };
                        AbstractKObjectInfer.prototype.modifyState = function () {
                            var raw = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                            if (raw != null) {
                                if (raw[org.kevoree.modeling.api.meta.MetaInferClass.getInstance().getCache().index()] == null) {
                                    this.internal_load(raw);
                                }
                                return raw[org.kevoree.modeling.api.meta.MetaInferClass.getInstance().getCache().index()];
                            }
                            else {
                                return null;
                            }
                        };
                        AbstractKObjectInfer.prototype.internal_load = function (raw) {
                            if (raw[org.kevoree.modeling.api.meta.MetaInferClass.getInstance().getCache().index()] == null) {
                                var currentState = this.createEmptyState();
                                currentState.load(raw[org.kevoree.modeling.api.meta.MetaInferClass.getInstance().getRaw().index()].toString());
                                raw[org.kevoree.modeling.api.meta.MetaInferClass.getInstance().getCache().index()] = currentState;
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
                    })(org.kevoree.modeling.api.abs.AbstractKObject);
                    abs.AbstractKObjectInfer = AbstractKObjectInfer;
                    var AbstractKTask = (function () {
                        function AbstractKTask() {
                            this._isDone = false;
                            this._isReady = false;
                            this._nbRecResult = 0;
                            this._nbExpectedResult = 0;
                            this._results = new java.util.HashMap();
                            this._previousTasks = new java.util.HashSet();
                            this._nextTasks = new java.util.HashSet();
                            this._result = null;
                        }
                        AbstractKTask.prototype.setDoneOrRegister = function (next) {
                            if (next != null) {
                                this._nextTasks.add(next);
                                return this._isDone;
                            }
                            else {
                                this._isDone = true;
                                var childrenTasks = this._nextTasks.toArray(new Array());
                                for (var i = 0; i < childrenTasks.length; i++) {
                                    childrenTasks[i].informParentEnd(this);
                                }
                                return this._isDone;
                            }
                        };
                        AbstractKTask.prototype.informParentEnd = function (end) {
                            if (end == null) {
                                this._nbRecResult = this._nbRecResult + this._nbExpectedResult;
                            }
                            else {
                                if (end != this) {
                                    var castedEnd = end;
                                    var keys = castedEnd._results.keySet().toArray(new Array());
                                    for (var i = 0; i < keys.length; i++) {
                                        this._results.put(keys[i], castedEnd._results.get(keys[i]));
                                    }
                                    this._results.put(end, castedEnd._result);
                                    this._nbRecResult--;
                                }
                            }
                            if (this._nbRecResult == 0 && this._isReady) {
                                if (this._job != null) {
                                    this._job(this);
                                }
                                this.setDoneOrRegister(null);
                            }
                        };
                        AbstractKTask.prototype.wait = function (p_previous) {
                            if (p_previous != this) {
                                this._previousTasks.add(p_previous);
                                if (!p_previous.setDoneOrRegister(this)) {
                                    this._nbExpectedResult++;
                                }
                                else {
                                    var castedEnd = p_previous;
                                    var keys = castedEnd._results.keySet().toArray(new Array());
                                    for (var i = 0; i < keys.length; i++) {
                                        this._results.put(keys[i], castedEnd._results.get(keys[i]));
                                    }
                                    this._results.put(p_previous, castedEnd._result);
                                }
                            }
                        };
                        AbstractKTask.prototype.ready = function () {
                            if (!this._isReady) {
                                this._isReady = true;
                                this.informParentEnd(null);
                            }
                        };
                        AbstractKTask.prototype.results = function () {
                            return this._results;
                        };
                        AbstractKTask.prototype.setResult = function (p_result) {
                            this._result = p_result;
                        };
                        AbstractKTask.prototype.getResult = function () {
                            if (this._isDone) {
                                return this._result;
                            }
                            else {
                                throw new java.lang.Exception("Task is not executed yet !");
                            }
                        };
                        AbstractKTask.prototype.isDone = function () {
                            return this._isDone;
                        };
                        AbstractKTask.prototype.setJob = function (p_kjob) {
                            this._job = p_kjob;
                        };
                        return AbstractKTask;
                    })();
                    abs.AbstractKTask = AbstractKTask;
                    var AbstractKTaskWrapper = (function (_super) {
                        __extends(AbstractKTaskWrapper, _super);
                        function AbstractKTaskWrapper() {
                            _super.call(this);
                            this._callback = null;
                            var selfPointer = this;
                            this._callback = function (a) {
                                selfPointer._isReady = true;
                                selfPointer.setResult(a);
                                selfPointer.setDoneOrRegister(null);
                            };
                        }
                        AbstractKTaskWrapper.prototype.initCallback = function () {
                            return this._callback;
                        };
                        AbstractKTaskWrapper.prototype.wait = function (previous) {
                            throw new java.lang.RuntimeException("Wait action is forbidden on wrapped tasks, please create a sub task");
                        };
                        AbstractKTaskWrapper.prototype.setJob = function (p_kjob) {
                            throw new java.lang.RuntimeException("setJob action is forbidden on wrapped tasks, please create a sub task");
                        };
                        AbstractKTaskWrapper.prototype.ready = function () {
                        };
                        return AbstractKTaskWrapper;
                    })(org.kevoree.modeling.api.abs.AbstractKTask);
                    abs.AbstractKTaskWrapper = AbstractKTaskWrapper;
                    var AbstractKUniverse = (function () {
                        function AbstractKUniverse(p_model, p_key) {
                            this._model = p_model;
                            this._key = p_key;
                        }
                        AbstractKUniverse.prototype.key = function () {
                            return this._key;
                        };
                        AbstractKUniverse.prototype.model = function () {
                            return this._model;
                        };
                        AbstractKUniverse.prototype.save = function (callback) {
                            this.model().storage().save(this, callback);
                        };
                        AbstractKUniverse.prototype.unload = function (callback) {
                            this.model().storage().saveUnload(this, callback);
                        };
                        AbstractKUniverse.prototype.delete = function (callback) {
                            this.model().storage().delete(this, callback);
                        };
                        AbstractKUniverse.prototype.discard = function (callback) {
                            this.model().storage().discard(this, callback);
                        };
                        AbstractKUniverse.prototype.time = function (timePoint) {
                            return this.internal_create(timePoint);
                        };
                        AbstractKUniverse.prototype.listen = function (listener) {
                            this.model().storage().eventBroker().registerListener(this, listener, null);
                        };
                        AbstractKUniverse.prototype.listenAllTimes = function (target, listener) {
                            this.model().storage().eventBroker().registerListener(this, listener, target);
                        };
                        AbstractKUniverse.prototype.internal_create = function (timePoint) {
                            throw "Abstract method";
                        };
                        AbstractKUniverse.prototype.equals = function (obj) {
                            if (!(obj instanceof org.kevoree.modeling.api.abs.AbstractKUniverse)) {
                                return false;
                            }
                            else {
                                var casted = obj;
                                return casted._key == this._key;
                            }
                        };
                        AbstractKUniverse.prototype.origin = function (callback) {
                        };
                        AbstractKUniverse.prototype.split = function (callback) {
                        };
                        AbstractKUniverse.prototype.descendants = function (callback) {
                        };
                        AbstractKUniverse.prototype.taskSplit = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.split(task.initCallback());
                            return task;
                        };
                        AbstractKUniverse.prototype.taskOrigin = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.origin(task.initCallback());
                            return task;
                        };
                        AbstractKUniverse.prototype.taskDescendants = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.descendants(task.initCallback());
                            return task;
                        };
                        AbstractKUniverse.prototype.taskSave = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.save(task.initCallback());
                            return task;
                        };
                        AbstractKUniverse.prototype.taskUnload = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.unload(task.initCallback());
                            return task;
                        };
                        AbstractKUniverse.prototype.taskDelete = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.delete(task.initCallback());
                            return task;
                        };
                        AbstractKUniverse.prototype.taskDiscard = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.discard(task.initCallback());
                            return task;
                        };
                        return AbstractKUniverse;
                    })();
                    abs.AbstractKUniverse = AbstractKUniverse;
                    var AbstractKView = (function () {
                        function AbstractKView(p_now, p_universe) {
                            this._now = p_now;
                            this._universe = p_universe;
                        }
                        AbstractKView.prototype.now = function () {
                            return this._now;
                        };
                        AbstractKView.prototype.universe = function () {
                            return this._universe;
                        };
                        AbstractKView.prototype.createFQN = function (metaClassName) {
                            return this.create(this.universe().model().metaModel().metaClass(metaClassName));
                        };
                        AbstractKView.prototype.setRoot = function (elem, callback) {
                            elem.set_parent(null, null);
                            elem.setRoot(true);
                            this.universe().model().storage().setRoot(elem, callback);
                        };
                        AbstractKView.prototype.select = function (query, callback) {
                            if (callback == null) {
                                return;
                            }
                            if (query == null) {
                                callback(new Array());
                                return;
                            }
                            this.universe().model().storage().getRoot(this, function (rootObj) {
                                if (rootObj == null) {
                                    callback(new Array());
                                }
                                else {
                                    var cleanedQuery = query;
                                    if (cleanedQuery.equals("/")) {
                                        var param = new Array();
                                        param[0] = rootObj;
                                        callback(param);
                                    }
                                    else {
                                        if (cleanedQuery.startsWith("/")) {
                                            cleanedQuery = cleanedQuery.substring(1);
                                        }
                                        org.kevoree.modeling.api.traversal.selector.KSelector.select(rootObj, cleanedQuery, callback);
                                    }
                                }
                            });
                        };
                        AbstractKView.prototype.lookup = function (kid, callback) {
                            this.universe().model().storage().lookup(this, kid, callback);
                        };
                        AbstractKView.prototype.lookupAll = function (keys, callback) {
                            this.universe().model().storage().lookupAll(this, keys, callback);
                        };
                        AbstractKView.prototype.createProxy = function (clazz, timeTree, key) {
                            return this.internalCreate(clazz, timeTree, key);
                        };
                        AbstractKView.prototype.create = function (clazz) {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(clazz)) {
                                return null;
                            }
                            var newObj = this.internalCreate(clazz, new org.kevoree.modeling.api.time.DefaultTimeTree().insert(this.now()), this.universe().model().storage().nextObjectKey());
                            if (newObj != null) {
                                this.universe().model().storage().initKObject(newObj, this);
                                this.universe().model().storage().eventBroker().notify(new org.kevoree.modeling.api.event.DefaultKEvent(org.kevoree.modeling.api.KActionType.NEW, newObj, clazz, null));
                            }
                            return newObj;
                        };
                        AbstractKView.prototype.listen = function (listener) {
                            this.universe().model().storage().eventBroker().registerListener(this, listener, null);
                        };
                        AbstractKView.prototype.internalCreate = function (clazz, timeTree, key) {
                            throw "Abstract method";
                        };
                        AbstractKView.prototype.json = function () {
                            return new org.kevoree.modeling.api.json.JsonFormat(this);
                        };
                        AbstractKView.prototype.xmi = function () {
                            return new org.kevoree.modeling.api.xmi.XmiFormat(this);
                        };
                        AbstractKView.prototype.equals = function (obj) {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(obj)) {
                                return false;
                            }
                            if (!(obj instanceof org.kevoree.modeling.api.abs.AbstractKView)) {
                                return false;
                            }
                            else {
                                var casted = obj;
                                return (casted._now == this._now) && this._universe.equals(casted._universe);
                            }
                        };
                        AbstractKView.prototype.taskLookup = function (key) {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.lookup(key, task.initCallback());
                            return task;
                        };
                        AbstractKView.prototype.taskLookupAll = function (keys) {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.lookupAll(keys, task.initCallback());
                            return task;
                        };
                        AbstractKView.prototype.taskSelect = function (query) {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.select(query, task.initCallback());
                            return task;
                        };
                        AbstractKView.prototype.taskSetRoot = function (elem) {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.setRoot(elem, task.initCallback());
                            return task;
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
                        AbstractMetaAttribute.prototype.metaType = function () {
                            return this._metaType;
                        };
                        AbstractMetaAttribute.prototype.index = function () {
                            return this._index;
                        };
                        AbstractMetaAttribute.prototype.metaName = function () {
                            return this._name;
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
                            this._atts_indexes = new java.util.HashMap();
                            this._refs_indexes = new java.util.HashMap();
                            this._ops_indexes = new java.util.HashMap();
                            this._name = p_name;
                            this._index = p_index;
                        }
                        AbstractMetaClass.prototype.index = function () {
                            return this._index;
                        };
                        AbstractMetaClass.prototype.metaName = function () {
                            return this._name;
                        };
                        AbstractMetaClass.prototype.init = function (p_atts, p_refs, p_operations) {
                            this._atts = p_atts;
                            for (var i = 0; i < this._atts.length; i++) {
                                this._atts_indexes.put(this._atts[i].metaName(), i);
                            }
                            this._refs = p_refs;
                            for (var i = 0; i < this._refs.length; i++) {
                                this._refs_indexes.put(this._refs[i].metaName(), i);
                            }
                            this._operations = p_operations;
                            for (var i = 0; i < this._operations.length; i++) {
                                this._ops_indexes.put(this._operations[i].metaName(), i);
                            }
                        };
                        AbstractMetaClass.prototype.metaAttributes = function () {
                            return this._atts;
                        };
                        AbstractMetaClass.prototype.metaReferences = function () {
                            return this._refs;
                        };
                        AbstractMetaClass.prototype.metaOperations = function () {
                            return this._operations;
                        };
                        AbstractMetaClass.prototype.metaAttribute = function (name) {
                            var resolved = this._atts_indexes.get(name);
                            if (resolved == null) {
                                return null;
                            }
                            else {
                                return this._atts[resolved];
                            }
                        };
                        AbstractMetaClass.prototype.metaReference = function (name) {
                            var resolved = this._refs_indexes.get(name);
                            if (resolved == null) {
                                return null;
                            }
                            else {
                                return this._refs[resolved];
                            }
                        };
                        AbstractMetaClass.prototype.metaOperation = function (name) {
                            var resolved = this._ops_indexes.get(name);
                            if (resolved == null) {
                                return null;
                            }
                            else {
                                return this._operations[resolved];
                            }
                        };
                        return AbstractMetaClass;
                    })();
                    abs.AbstractMetaClass = AbstractMetaClass;
                    var AbstractMetaModel = (function () {
                        function AbstractMetaModel(p_name, p_index) {
                            this._metaClasses_indexes = new java.util.HashMap();
                            this._name = p_name;
                            this._index = p_index;
                        }
                        AbstractMetaModel.prototype.index = function () {
                            return this._index;
                        };
                        AbstractMetaModel.prototype.metaName = function () {
                            return this._name;
                        };
                        AbstractMetaModel.prototype.metaClasses = function () {
                            return this._metaClasses;
                        };
                        AbstractMetaModel.prototype.metaClass = function (name) {
                            var resolved = this._metaClasses_indexes.get(name);
                            if (resolved == null) {
                                return null;
                            }
                            else {
                                return this._metaClasses[resolved];
                            }
                        };
                        AbstractMetaModel.prototype.init = function (p_metaClasses) {
                            this._metaClasses_indexes.clear();
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
                        function AbstractMetaReference(p_name, p_index, p_contained, p_single, p_lazyMetaType, p_lazyMetaOpposite, p_lazyMetaOrigin) {
                            this._name = p_name;
                            this._index = p_index;
                            this._contained = p_contained;
                            this._single = p_single;
                            this._lazyMetaType = p_lazyMetaType;
                            this._lazyMetaOpposite = p_lazyMetaOpposite;
                            this._lazyMetaOrigin = p_lazyMetaOrigin;
                        }
                        AbstractMetaReference.prototype.single = function () {
                            return this._single;
                        };
                        AbstractMetaReference.prototype.metaType = function () {
                            if (this._lazyMetaType != null) {
                                return this._lazyMetaType();
                            }
                            else {
                                return null;
                            }
                        };
                        AbstractMetaReference.prototype.opposite = function () {
                            if (this._lazyMetaOpposite != null) {
                                return this._lazyMetaOpposite();
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
                        AbstractMetaReference.prototype.contained = function () {
                            return this._contained;
                        };
                        return AbstractMetaReference;
                    })();
                    abs.AbstractMetaReference = AbstractMetaReference;
                })(abs = api.abs || (api.abs = {}));
                var data;
                (function (data) {
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
                    data.AccessMode = AccessMode;
                    var CacheEntry = (function () {
                        function CacheEntry() {
                        }
                        return CacheEntry;
                    })();
                    data.CacheEntry = CacheEntry;
                    var DefaultKStore = (function () {
                        function DefaultKStore(model) {
                            this.caches = new java.util.HashMap();
                            this._objectKeyCalculator = null;
                            this._dimensionKeyCalculator = null;
                            this.isConnected = false;
                            this._db = new org.kevoree.modeling.api.data.MemoryKDataBase();
                            this._eventBroker = new org.kevoree.modeling.api.event.DefaultKBroker();
                            this._eventBroker.setKStore(this);
                            this._operationManager = new org.kevoree.modeling.api.util.DefaultOperationManager(this);
                            this._scheduler = new org.kevoree.modeling.api.scheduler.DirectScheduler();
                            this._model = model;
                        }
                        DefaultKStore.prototype.connect = function (callback) {
                            var _this = this;
                            if (this.isConnected) {
                                if (callback != null) {
                                    callback(null);
                                }
                                return;
                            }
                            if (this._db == null || this._eventBroker == null) {
                                if (callback != null) {
                                    callback(new java.lang.Exception("Please attach a KDataBase AND a KBroker first !"));
                                }
                            }
                            else {
                                this._eventBroker.connect(function (throwable) {
                                    if (throwable == null) {
                                        _this._db.connect(function (throwable) {
                                            if (throwable == null) {
                                                var keys = new Array();
                                                keys[0] = _this.keyLastPrefix();
                                                _this._db.get(keys, function (strings, error) {
                                                    if (error != null) {
                                                        if (callback != null) {
                                                            callback(error);
                                                        }
                                                    }
                                                    else {
                                                        if (strings.length == 1) {
                                                            try {
                                                                var payloadPrefix = strings[0];
                                                                if (payloadPrefix == null || payloadPrefix.equals("")) {
                                                                    payloadPrefix = "0";
                                                                }
                                                                var newPrefix = java.lang.Short.parseShort(payloadPrefix);
                                                                var keys2 = new Array();
                                                                keys2[0] = _this.keyLastDimIndex(payloadPrefix);
                                                                keys2[1] = _this.keyLastObjIndex(payloadPrefix);
                                                                _this._db.get(keys2, function (strings, error) {
                                                                    if (error != null) {
                                                                        if (callback != null) {
                                                                            callback(error);
                                                                        }
                                                                    }
                                                                    else {
                                                                        if (strings.length == 2) {
                                                                            try {
                                                                                var dimIndexPayload = strings[0];
                                                                                if (dimIndexPayload == null || dimIndexPayload.equals("")) {
                                                                                    dimIndexPayload = "0";
                                                                                }
                                                                                var objIndexPayload = strings[1];
                                                                                if (objIndexPayload == null || objIndexPayload.equals("")) {
                                                                                    objIndexPayload = "0";
                                                                                }
                                                                                var newDimIndex = java.lang.Long.parseLong(dimIndexPayload);
                                                                                var newObjIndex = java.lang.Long.parseLong(objIndexPayload);
                                                                                var keys3 = new Array(new Array());
                                                                                var payloadKeys3 = new Array();
                                                                                payloadKeys3[0] = _this.keyLastPrefix();
                                                                                if (newPrefix == java.lang.Short.MAX_VALUE) {
                                                                                    payloadKeys3[1] = "" + java.lang.Short.MIN_VALUE;
                                                                                }
                                                                                else {
                                                                                    payloadKeys3[1] = "" + (newPrefix + 1);
                                                                                }
                                                                                keys3[0] = payloadKeys3;
                                                                                _this._db.put(keys3, function (throwable) {
                                                                                    _this._dimensionKeyCalculator = new org.kevoree.modeling.api.data.KeyCalculator(newPrefix, newDimIndex);
                                                                                    _this._objectKeyCalculator = new org.kevoree.modeling.api.data.KeyCalculator(newPrefix, newObjIndex);
                                                                                    _this.isConnected = true;
                                                                                    if (callback != null) {
                                                                                        callback(null);
                                                                                    }
                                                                                });
                                                                            }
                                                                            catch ($ex$) {
                                                                                if ($ex$ instanceof java.lang.Exception) {
                                                                                    var e = $ex$;
                                                                                    if (callback != null) {
                                                                                        callback(e);
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        else {
                                                                            if (callback != null) {
                                                                                callback(new java.lang.Exception("Error while connecting the KDataStore..."));
                                                                            }
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                            catch ($ex$) {
                                                                if ($ex$ instanceof java.lang.Exception) {
                                                                    var e = $ex$;
                                                                    if (callback != null) {
                                                                        callback(e);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            if (callback != null) {
                                                                callback(new java.lang.Exception("Error while connecting the KDataStore..."));
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                            else {
                                                callback(throwable);
                                            }
                                        });
                                    }
                                    else {
                                        callback(throwable);
                                    }
                                });
                            }
                        };
                        DefaultKStore.prototype.close = function (callback) {
                            var _this = this;
                            this.isConnected = false;
                            if (this._db != null) {
                                this._db.close(function (throwable) {
                                    if (_this._eventBroker != null) {
                                        _this._eventBroker.close(callback);
                                    }
                                    else {
                                        callback(null);
                                    }
                                });
                            }
                        };
                        DefaultKStore.prototype.keyTree = function (dim, key) {
                            return "" + dim + DefaultKStore.KEY_SEP + key;
                        };
                        DefaultKStore.prototype.keyRoot = function (dim) {
                            return "" + dim + DefaultKStore.KEY_SEP + "root";
                        };
                        DefaultKStore.prototype.keyRootTree = function (dim) {
                            return "" + dim.key() + DefaultKStore.KEY_SEP + "root";
                        };
                        DefaultKStore.prototype.keyPayload = function (dim, time, key) {
                            return "" + dim + DefaultKStore.KEY_SEP + time + DefaultKStore.KEY_SEP + key;
                        };
                        DefaultKStore.prototype.keyLastPrefix = function () {
                            return "ring_prefix";
                        };
                        DefaultKStore.prototype.keyLastDimIndex = function (prefix) {
                            return "index_dim_" + prefix;
                        };
                        DefaultKStore.prototype.keyLastObjIndex = function (prefix) {
                            return "index_obj_" + prefix;
                        };
                        DefaultKStore.prototype.nextUniverseKey = function () {
                            if (this._dimensionKeyCalculator == null) {
                                throw new java.lang.RuntimeException(DefaultKStore.UNIVERSE_NOT_CONNECTED_ERROR);
                            }
                            return this._dimensionKeyCalculator.nextKey();
                        };
                        DefaultKStore.prototype.nextObjectKey = function () {
                            if (this._objectKeyCalculator == null) {
                                throw new java.lang.RuntimeException(DefaultKStore.UNIVERSE_NOT_CONNECTED_ERROR);
                            }
                            return this._objectKeyCalculator.nextKey();
                        };
                        DefaultKStore.prototype.initUniverse = function (p_universe) {
                        };
                        DefaultKStore.prototype.initKObject = function (obj, originView) {
                            this.write_tree(obj.universe().key(), obj.uuid(), obj.timeTree());
                            var cacheEntry = new org.kevoree.modeling.api.data.CacheEntry();
                            cacheEntry.raw = new Array();
                            cacheEntry.raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = true;
                            cacheEntry.metaClass = obj.metaClass();
                            cacheEntry.timeTree = obj.timeTree();
                            this.write_cache(obj.universe().key(), obj.now(), obj.uuid(), cacheEntry);
                        };
                        DefaultKStore.prototype.raw = function (origin, accessMode) {
                            var resolvedTime = origin.timeTree().resolve(origin.now());
                            var needCopy = accessMode.equals(org.kevoree.modeling.api.data.AccessMode.WRITE) && (resolvedTime != origin.now());
                            var universeCache = this.caches.get(origin.universe().key());
                            if (universeCache == null) {
                                System.err.println(DefaultKStore.OUT_OF_CACHE_MESSAGE);
                            }
                            var timeCache = universeCache.timesCaches.get(resolvedTime);
                            if (timeCache == null) {
                                System.err.println(DefaultKStore.OUT_OF_CACHE_MESSAGE);
                                return null;
                            }
                            var entry = timeCache.payload_cache.get(origin.uuid());
                            if (entry == null) {
                                System.err.println(DefaultKStore.OUT_OF_CACHE_MESSAGE);
                                return null;
                            }
                            var payload = entry.raw;
                            if (accessMode.equals(org.kevoree.modeling.api.data.AccessMode.DELETE)) {
                                entry.timeTree.delete(origin.now());
                                entry.raw = null;
                                return payload;
                            }
                            if (payload == null) {
                                System.err.println(DefaultKStore.DELETED_MESSAGE);
                                return null;
                            }
                            else {
                                if (!needCopy) {
                                    if (accessMode.equals(org.kevoree.modeling.api.data.AccessMode.WRITE)) {
                                        payload[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = true;
                                    }
                                    return payload;
                                }
                                else {
                                    var cloned = new Array();
                                    for (var i = 0; i < payload.length; i++) {
                                        var resolved = payload[i];
                                        if (resolved != null) {
                                            if (resolved instanceof java.util.Set) {
                                                var clonedSet = new java.util.HashSet();
                                                clonedSet.addAll(resolved);
                                                cloned[i] = clonedSet;
                                            }
                                            else {
                                                if (resolved instanceof java.util.List) {
                                                    var clonedList = new java.util.ArrayList();
                                                    clonedList.addAll(resolved);
                                                    cloned[i] = clonedList;
                                                }
                                                else {
                                                    cloned[i] = resolved;
                                                }
                                            }
                                        }
                                    }
                                    cloned[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = true;
                                    var clonedEntry = new org.kevoree.modeling.api.data.CacheEntry();
                                    clonedEntry.raw = cloned;
                                    clonedEntry.metaClass = entry.metaClass;
                                    clonedEntry.timeTree = entry.timeTree;
                                    entry.timeTree.insert(origin.now());
                                    this.write_cache(origin.universe().key(), origin.now(), origin.uuid(), clonedEntry);
                                    return clonedEntry.raw;
                                }
                            }
                        };
                        DefaultKStore.prototype.discard = function (p_universe, callback) {
                            this.caches.remove(p_universe.key());
                            if (callback != null) {
                                callback(null);
                            }
                        };
                        DefaultKStore.prototype.delete = function (p_universe, callback) {
                            throw new java.lang.RuntimeException("Not implemented yet !");
                        };
                        DefaultKStore.prototype.save = function (p_universe, callback) {
                            var universeCache = this.caches.get(p_universe.key());
                            if (universeCache == null) {
                                if (callback != null) {
                                    callback(null);
                                }
                            }
                            else {
                                var times = universeCache.timesCaches.keySet().toArray(new Array());
                                var sizeCache = this.size_dirties(universeCache) + 2;
                                var payloads = new Array(new Array());
                                var i = 0;
                                for (var j = 0; j < times.length; j++) {
                                    var now = times[j];
                                    var timeCache = universeCache.timesCaches.get(now);
                                    var keys = timeCache.payload_cache.keySet().toArray(new Array());
                                    for (var k = 0; k < keys.length; k++) {
                                        var idObj = keys[k];
                                        var cached_entry = timeCache.payload_cache.get(idObj);
                                        var cached_raw = cached_entry.raw;
                                        if (cached_raw != null && cached_raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] != null && cached_raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX].toString().equals("true")) {
                                            var payloadA = new Array();
                                            payloadA[0] = this.keyPayload(p_universe.key(), now, idObj);
                                            payloadA[1] = org.kevoree.modeling.api.data.JsonRaw.encode(cached_raw, idObj, cached_entry.metaClass, true);
                                            payloads[i] = payloadA;
                                            cached_raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = false;
                                            i++;
                                        }
                                    }
                                }
                                var keyArr = universeCache.timeTreeCache.keySet().toArray(new Array());
                                for (var l = 0; l < keyArr.length; l++) {
                                    var timeTreeKey = keyArr[l];
                                    var timeTree = universeCache.timeTreeCache.get(timeTreeKey);
                                    if (timeTree.isDirty()) {
                                        var payloadC = new Array();
                                        payloadC[0] = this.keyTree(p_universe.key(), timeTreeKey);
                                        payloadC[1] = timeTree.toString();
                                        payloads[i] = payloadC;
                                        timeTree.setDirty(false);
                                        i++;
                                    }
                                }
                                if (universeCache.roots != null && universeCache.roots.dirty) {
                                    var payloadD = new Array();
                                    payloadD[0] = this.keyRootTree(p_universe);
                                    payloadD[1] = universeCache.roots.serialize();
                                    payloads[i] = payloadD;
                                    universeCache.roots.dirty = false;
                                    i++;
                                }
                                var payloadDim = new Array();
                                payloadDim[0] = this.keyLastDimIndex("" + this._dimensionKeyCalculator.prefix());
                                payloadDim[1] = "" + this._dimensionKeyCalculator.lastComputedIndex();
                                payloads[i] = payloadDim;
                                i++;
                                var payloadObj = new Array();
                                payloadObj[0] = this.keyLastDimIndex("" + this._objectKeyCalculator.prefix());
                                payloadObj[1] = "" + this._objectKeyCalculator.lastComputedIndex();
                                payloads[i] = payloadObj;
                                this._db.put(payloads, callback);
                                this._eventBroker.flush(p_universe.key());
                            }
                        };
                        DefaultKStore.prototype.saveUnload = function (p_universe, callback) {
                            var _this = this;
                            this.save(p_universe, function (throwable) {
                                if (throwable == null) {
                                    _this.discard(p_universe, callback);
                                }
                                else {
                                    if (callback != null) {
                                        callback(throwable);
                                    }
                                }
                            });
                        };
                        DefaultKStore.prototype.lookup = function (originView, key, callback) {
                            var keys = new Array();
                            keys[0] = key;
                            this.lookupAll(originView, keys, function (kObjects) {
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
                        DefaultKStore.prototype.lookupAll = function (originView, keys, callback) {
                            this._scheduler.dispatch(new org.kevoree.modeling.api.data.LookupAllRunnable(originView, keys, callback, this));
                        };
                        DefaultKStore.prototype.getRoot = function (originView, callback) {
                            var _this = this;
                            this.resolve_roots(originView.universe(), function (longRBTree) {
                                if (longRBTree == null) {
                                    callback(null);
                                }
                                else {
                                    var resolved = longRBTree.previousOrEqual(originView.now());
                                    if (resolved == null) {
                                        callback(null);
                                    }
                                    else {
                                        _this.lookup(originView, resolved.value, callback);
                                    }
                                }
                            });
                        };
                        DefaultKStore.prototype.setRoot = function (newRoot, callback) {
                            this.resolve_roots(newRoot.universe(), function (longRBTree) {
                                longRBTree.insert(newRoot.now(), newRoot.uuid());
                                newRoot.setRoot(true);
                                if (callback != null) {
                                    callback(null);
                                }
                            });
                        };
                        DefaultKStore.prototype.eventBroker = function () {
                            return this._eventBroker;
                        };
                        DefaultKStore.prototype.setEventBroker = function (p_eventBroker) {
                            this._eventBroker = p_eventBroker;
                            this._eventBroker.setKStore(this);
                        };
                        DefaultKStore.prototype.dataBase = function () {
                            return this._db;
                        };
                        DefaultKStore.prototype.setDataBase = function (p_dataBase) {
                            this._db = p_dataBase;
                        };
                        DefaultKStore.prototype.setScheduler = function (p_scheduler) {
                            if (p_scheduler != null) {
                                this._scheduler = p_scheduler;
                            }
                        };
                        DefaultKStore.prototype.operationManager = function () {
                            return this._operationManager;
                        };
                        DefaultKStore.prototype.read_cache = function (dimensionKey, timeKey, uuid) {
                            var universeCache = this.caches.get(dimensionKey);
                            if (universeCache != null) {
                                var timeCache = universeCache.timesCaches.get(timeKey);
                                if (timeCache == null) {
                                    return null;
                                }
                                else {
                                    return timeCache.payload_cache.get(uuid);
                                }
                            }
                            else {
                                return null;
                            }
                        };
                        DefaultKStore.prototype.write_cache = function (dimensionKey, timeKey, uuid, cacheEntry) {
                            var universeCache = this.caches.get(dimensionKey);
                            if (universeCache == null) {
                                universeCache = new org.kevoree.modeling.api.data.cache.UniverseCache();
                                this.caches.put(dimensionKey, universeCache);
                            }
                            var timeCache = universeCache.timesCaches.get(timeKey);
                            if (timeCache == null) {
                                timeCache = new org.kevoree.modeling.api.data.cache.TimeCache();
                                universeCache.timesCaches.put(timeKey, timeCache);
                            }
                            timeCache.payload_cache.put(uuid, cacheEntry);
                        };
                        DefaultKStore.prototype.write_tree = function (dimensionKey, uuid, timeTree) {
                            var universeCache = this.caches.get(dimensionKey);
                            if (universeCache == null) {
                                universeCache = new org.kevoree.modeling.api.data.cache.UniverseCache();
                                this.caches.put(dimensionKey, universeCache);
                            }
                            universeCache.timeTreeCache.put(uuid, timeTree);
                        };
                        DefaultKStore.prototype.write_roots = function (dimensionKey, timeTree) {
                            var universeCache = this.caches.get(dimensionKey);
                            if (universeCache == null) {
                                universeCache = new org.kevoree.modeling.api.data.cache.UniverseCache();
                                this.caches.put(dimensionKey, universeCache);
                            }
                            universeCache.roots = timeTree;
                        };
                        DefaultKStore.prototype.size_dirties = function (universeCache) {
                            var times = universeCache.timesCaches.keySet().toArray(new Array());
                            var sizeCache = 0;
                            for (var i = 0; i < times.length; i++) {
                                var timeCache = universeCache.timesCaches.get(times[i]);
                                if (timeCache != null) {
                                    var keys = timeCache.payload_cache.keySet().toArray(new Array());
                                    for (var k = 0; k < keys.length; k++) {
                                        var idObj = keys[k];
                                        var cachedEntry = timeCache.payload_cache.get(idObj);
                                        if (cachedEntry != null && cachedEntry.raw != null && cachedEntry.raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] != null && cachedEntry.raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX].toString().equals("true")) {
                                            sizeCache++;
                                        }
                                    }
                                    if (timeCache.rootDirty) {
                                        sizeCache++;
                                    }
                                }
                            }
                            var ids = universeCache.timeTreeCache.keySet().toArray(new Array());
                            for (var k = 0; k < ids.length; k++) {
                                var timeTree = universeCache.timeTreeCache.get(ids[k]);
                                if (timeTree != null && timeTree.isDirty()) {
                                    sizeCache++;
                                }
                            }
                            if (universeCache.roots != null && universeCache.roots.dirty) {
                                sizeCache++;
                            }
                            return sizeCache;
                        };
                        DefaultKStore.prototype.internal_resolve_dim_time = function (originView, uuids, callback) {
                            var result = new Array(new Array());
                            this.resolve_timeTrees(originView.universe(), uuids, function (timeTrees) {
                                for (var i = 0; i < timeTrees.length; i++) {
                                    var resolved = new Array();
                                    resolved[DefaultKStore.INDEX_RESOLVED_DIM] = originView.universe().key();
                                    resolved[DefaultKStore.INDEX_RESOLVED_TIME] = timeTrees[i].resolve(originView.now());
                                    resolved[DefaultKStore.INDEX_RESOLVED_TIMETREE] = timeTrees[i];
                                    result[i] = resolved;
                                }
                                callback(result);
                            });
                        };
                        DefaultKStore.prototype.resolve_timeTrees = function (p_universe, keys, callback) {
                            var _this = this;
                            var toLoad = new java.util.ArrayList();
                            var result = new Array();
                            for (var i = 0; i < keys.length; i++) {
                                var universeCache = this.caches.get(p_universe.key());
                                if (universeCache == null) {
                                    toLoad.add(i);
                                }
                                else {
                                    var cachedTree = universeCache.timeTreeCache.get(keys[i]);
                                    if (cachedTree != null) {
                                        result[i] = cachedTree;
                                    }
                                    else {
                                        toLoad.add(i);
                                    }
                                }
                            }
                            if (toLoad.isEmpty()) {
                                callback(result);
                            }
                            else {
                                var toLoadKeys = new Array();
                                for (var i = 0; i < toLoad.size(); i++) {
                                    toLoadKeys[i] = this.keyTree(p_universe.key(), keys[toLoad.get(i)]);
                                }
                                this._db.get(toLoadKeys, function (res, error) {
                                    if (error != null) {
                                        error.printStackTrace();
                                    }
                                    for (var i = 0; i < res.length; i++) {
                                        var newTree = new org.kevoree.modeling.api.time.DefaultTimeTree();
                                        try {
                                            if (res[i] != null) {
                                                newTree.load(res[i]);
                                            }
                                            else {
                                                newTree.insert(p_universe.key());
                                            }
                                            _this.write_tree(p_universe.key(), keys[toLoad.get(i)], newTree);
                                            result[toLoad.get(i)] = newTree;
                                        }
                                        catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e = $ex$;
                                                e.printStackTrace();
                                            }
                                        }
                                    }
                                    callback(result);
                                });
                            }
                        };
                        DefaultKStore.prototype.resolve_roots = function (p_universe, callback) {
                            var _this = this;
                            var universeCache = this.caches.get(p_universe.key());
                            if (universeCache != null && universeCache.roots != null) {
                                callback(universeCache.roots);
                            }
                            else {
                                var keys = new Array();
                                keys[0] = this.keyRoot(p_universe.key());
                                this._db.get(keys, function (res, error) {
                                    var tree = new org.kevoree.modeling.api.time.rbtree.LongRBTree();
                                    if (error != null) {
                                        error.printStackTrace();
                                    }
                                    else {
                                        if (res != null && res.length == 1 && res[0] != null && !res[0].equals("")) {
                                            try {
                                                tree.unserialize(res[0]);
                                            }
                                            catch ($ex$) {
                                                if ($ex$ instanceof java.lang.Exception) {
                                                    var e = $ex$;
                                                    e.printStackTrace();
                                                }
                                            }
                                        }
                                    }
                                    _this.write_roots(p_universe.key(), tree);
                                    callback(tree);
                                });
                            }
                        };
                        DefaultKStore.prototype.getModel = function () {
                            return this._model;
                        };
                        DefaultKStore.KEY_SEP = ',';
                        DefaultKStore.OUT_OF_CACHE_MESSAGE = "KMF Error: your object is out of cache, you probably kept an old reference. Please reload it with a lookup";
                        DefaultKStore.DELETED_MESSAGE = "KMF Error: your object has been deleted. Please do not use object pointer after a call to delete method";
                        DefaultKStore.UNIVERSE_NOT_CONNECTED_ERROR = "Please connect your model prior to create a universe or an object";
                        DefaultKStore.INDEX_RESOLVED_DIM = 0;
                        DefaultKStore.INDEX_RESOLVED_TIME = 1;
                        DefaultKStore.INDEX_RESOLVED_TIMETREE = 2;
                        return DefaultKStore;
                    })();
                    data.DefaultKStore = DefaultKStore;
                    var Index = (function () {
                        function Index() {
                        }
                        Index.PARENT_INDEX = 0;
                        Index.INBOUNDS_INDEX = 1;
                        Index.IS_DIRTY_INDEX = 2;
                        Index.IS_ROOT_INDEX = 3;
                        Index.REF_IN_PARENT_INDEX = 4;
                        Index.INFER_CHILDREN = 5;
                        Index.RESERVED_INDEXES = 6;
                        return Index;
                    })();
                    data.Index = Index;
                    var JsonRaw = (function () {
                        function JsonRaw() {
                        }
                        JsonRaw.decode = function (payload, currentView, now) {
                            if (payload == null) {
                                return null;
                            }
                            var lexer = new org.kevoree.modeling.api.json.Lexer(payload);
                            var currentAttributeName = null;
                            var arrayPayload = null;
                            var content = new java.util.HashMap();
                            var currentToken = lexer.nextToken();
                            while (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.EOF) {
                                if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.LEFT_BRACKET)) {
                                    arrayPayload = new java.util.HashSet();
                                }
                                else {
                                    if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.RIGHT_BRACKET)) {
                                        content.put(currentAttributeName, arrayPayload);
                                        arrayPayload = null;
                                        currentAttributeName = null;
                                    }
                                    else {
                                        if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.LEFT_BRACE)) {
                                        }
                                        else {
                                            if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.RIGHT_BRACE)) {
                                            }
                                            else {
                                                if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.VALUE)) {
                                                    if (currentAttributeName == null) {
                                                        currentAttributeName = currentToken.value().toString();
                                                    }
                                                    else {
                                                        if (arrayPayload == null) {
                                                            content.put(currentAttributeName, currentToken.value().toString());
                                                            currentAttributeName = null;
                                                        }
                                                        else {
                                                            arrayPayload.add(currentToken.value().toString());
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                currentToken = lexer.nextToken();
                            }
                            if (content.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META) == null) {
                                return null;
                            }
                            else {
                                var entry = new org.kevoree.modeling.api.data.CacheEntry();
                                var metaModel = currentView.universe().model().metaModel();
                                entry.metaClass = metaModel.metaClass(content.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META).toString());
                                entry.raw = new Array();
                                entry.raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = false;
                                var metaKeys = content.keySet().toArray(new Array());
                                for (var i = 0; i < metaKeys.length; i++) {
                                    if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.INBOUNDS_META)) {
                                        var inbounds = new java.util.HashSet();
                                        entry.raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] = inbounds;
                                        var raw_payload = content.get(metaKeys[i]);
                                        try {
                                            var raw_keys = raw_payload;
                                            var raw_keys_p = raw_keys.toArray(new Array());
                                            for (var j = 0; j < raw_keys_p.length; j++) {
                                                try {
                                                    var parsed = java.lang.Long.parseLong(raw_keys_p[j]);
                                                    inbounds.add(parsed);
                                                }
                                                catch ($ex$) {
                                                    if ($ex$ instanceof java.lang.Exception) {
                                                        var e = $ex$;
                                                        e.printStackTrace();
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
                                    else {
                                        if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_META)) {
                                            try {
                                                entry.raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX] = java.lang.Long.parseLong(content.get(metaKeys[i]).toString());
                                            }
                                            catch ($ex$) {
                                                if ($ex$ instanceof java.lang.Exception) {
                                                    var e = $ex$;
                                                    e.printStackTrace();
                                                }
                                            }
                                        }
                                        else {
                                            if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_REF_META)) {
                                                try {
                                                    var raw_payload_ref = content.get(metaKeys[i]).toString();
                                                    var elemsRefs = raw_payload_ref.split(JsonRaw.SEP);
                                                    if (elemsRefs.length == 2) {
                                                        var foundMeta = metaModel.metaClass(elemsRefs[0].trim());
                                                        if (foundMeta != null) {
                                                            var metaReference = foundMeta.metaReference(elemsRefs[1].trim());
                                                            if (metaReference != null) {
                                                                entry.raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX] = metaReference;
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
                                            else {
                                                if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_ROOT)) {
                                                    try {
                                                        if ("true".equals(content.get(metaKeys[i]))) {
                                                            entry.raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = true;
                                                        }
                                                        else {
                                                            entry.raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = false;
                                                        }
                                                    }
                                                    catch ($ex$) {
                                                        if ($ex$ instanceof java.lang.Exception) {
                                                            var e = $ex$;
                                                            e.printStackTrace();
                                                        }
                                                    }
                                                }
                                                else {
                                                    if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META)) {
                                                    }
                                                    else {
                                                        var metaAttribute = entry.metaClass.metaAttribute(metaKeys[i]);
                                                        var metaReference = entry.metaClass.metaReference(metaKeys[i]);
                                                        var insideContent = content.get(metaKeys[i]);
                                                        if (insideContent != null) {
                                                            if (metaAttribute != null) {
                                                                entry.raw[metaAttribute.index()] = metaAttribute.strategy().load(insideContent.toString(), metaAttribute, now);
                                                            }
                                                            else {
                                                                if (metaReference != null) {
                                                                    if (metaReference.single()) {
                                                                        try {
                                                                            entry.raw[metaReference.index()] = java.lang.Long.parseLong(insideContent.toString());
                                                                        }
                                                                        catch ($ex$) {
                                                                            if ($ex$ instanceof java.lang.Exception) {
                                                                                var e = $ex$;
                                                                                e.printStackTrace();
                                                                            }
                                                                        }
                                                                    }
                                                                    else {
                                                                        try {
                                                                            var convertedRaw = new java.util.HashSet();
                                                                            var plainRawSet = insideContent;
                                                                            var plainRawList = plainRawSet.toArray(new Array());
                                                                            for (var l = 0; l < plainRawList.length; l++) {
                                                                                var plainRaw = plainRawList[l];
                                                                                try {
                                                                                    var converted = java.lang.Long.parseLong(plainRaw);
                                                                                    convertedRaw.add(converted);
                                                                                }
                                                                                catch ($ex$) {
                                                                                    if ($ex$ instanceof java.lang.Exception) {
                                                                                        var e = $ex$;
                                                                                        e.printStackTrace();
                                                                                    }
                                                                                }
                                                                            }
                                                                            entry.raw[metaReference.index()] = convertedRaw;
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
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                return entry;
                            }
                        };
                        JsonRaw.encode = function (raw, uuid, p_metaClass, endline) {
                            var metaReferences = p_metaClass.metaReferences();
                            var metaAttributes = p_metaClass.metaAttributes();
                            var builder = new java.lang.StringBuilder();
                            builder.append("\t{\n");
                            builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META + "\": \"");
                            builder.append(p_metaClass.metaName());
                            builder.append("\",\n");
                            builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID + "\": \"");
                            builder.append(uuid);
                            if (raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] != null && raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX].toString().equals("true")) {
                                builder.append("\",\n");
                                builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_ROOT + "\": \"");
                                builder.append("true");
                            }
                            if (raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX] != null) {
                                builder.append("\",\n");
                                builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_META + "\": \"");
                                builder.append(raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX].toString());
                            }
                            if (raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX] != null) {
                                builder.append("\",\n");
                                builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_REF_META + "\": \"");
                                try {
                                    builder.append(raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX].origin().metaName());
                                    builder.append(JsonRaw.SEP);
                                    builder.append(raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX].metaName());
                                }
                                catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e = $ex$;
                                        e.printStackTrace();
                                    }
                                }
                            }
                            if (raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null) {
                                builder.append("\",\n");
                                builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.INBOUNDS_META + "\": [");
                                try {
                                    var elemsInRaw = raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                    var elemsArr = elemsInRaw.toArray(new Array());
                                    var isFirst = true;
                                    for (var j = 0; j < elemsArr.length; j++) {
                                        if (!isFirst) {
                                            builder.append(",");
                                        }
                                        builder.append("\"");
                                        builder.append(elemsArr[j]);
                                        builder.append("\"");
                                        isFirst = false;
                                    }
                                }
                                catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e = $ex$;
                                        e.printStackTrace();
                                    }
                                }
                                builder.append("]");
                                builder.append(",\n");
                            }
                            else {
                                builder.append("\",\n");
                            }
                            var nbElemToPrint = 0;
                            for (var i = org.kevoree.modeling.api.data.Index.RESERVED_INDEXES; i < raw.length; i++) {
                                if (raw[i] != null) {
                                    nbElemToPrint++;
                                }
                            }
                            var nbElemPrinted = 0;
                            for (var i = 0; i < metaAttributes.length; i++) {
                                var payload_res = raw[metaAttributes[i].index()];
                                if (payload_res != null) {
                                    var attrsPayload = metaAttributes[i].strategy().save(payload_res, metaAttributes[i]);
                                    if (attrsPayload != null) {
                                        builder.append("\t\t");
                                        builder.append("\"");
                                        builder.append(metaAttributes[i].metaName());
                                        builder.append("\": \"");
                                        builder.append(attrsPayload);
                                        builder.append("\"");
                                        nbElemPrinted++;
                                        if (nbElemPrinted < nbElemToPrint) {
                                            builder.append(",");
                                        }
                                        builder.append("\n");
                                    }
                                }
                            }
                            for (var i = 0; i < metaReferences.length; i++) {
                                var refPayload = raw[metaReferences[i].index()];
                                if (refPayload != null) {
                                    builder.append("\t\t");
                                    builder.append("\"");
                                    builder.append(metaReferences[i].metaName());
                                    builder.append("\":");
                                    if (metaReferences[i].single()) {
                                        builder.append("\"");
                                        builder.append(refPayload);
                                        builder.append("\"");
                                    }
                                    else {
                                        var elems = refPayload;
                                        var elemsArr = elems.toArray(new Array());
                                        builder.append(" [");
                                        for (var j = 0; j < elemsArr.length; j++) {
                                            builder.append("\"");
                                            builder.append(elemsArr[j]);
                                            builder.append("\"");
                                            if (j != elemsArr.length - 1) {
                                                builder.append(",");
                                            }
                                        }
                                        builder.append("]");
                                    }
                                    nbElemPrinted++;
                                    if (nbElemPrinted < nbElemToPrint) {
                                        builder.append(",");
                                    }
                                    builder.append("\n");
                                }
                            }
                            if (endline) {
                                builder.append("\t}\n");
                            }
                            else {
                                builder.append("\t}");
                            }
                            return builder.toString();
                        };
                        JsonRaw.SEP = "@";
                        return JsonRaw;
                    })();
                    data.JsonRaw = JsonRaw;
                    var KeyCalculator = (function () {
                        function KeyCalculator(prefix, currentIndex) {
                            this._prefix = "0x" + prefix.toString(16);
                            this._currentIndex = currentIndex;
                        }
                        KeyCalculator.prototype.nextKey = function () {
                            if (this._currentIndex == KeyCalculator.INDEX_LIMIT) {
                                throw new java.lang.IndexOutOfBoundsException("Object Index could not be created because it exceeded the capacity of the current prefix. Ask for a new prefix.");
                            }
                            this._currentIndex++;
                            var indexHex = this._currentIndex.toString(16);
                            var objectKey = parseInt(this._prefix + "000000000".substring(0, 9 - indexHex.length) + indexHex, 16);
                            if (objectKey > KeyCalculator.LONG_LIMIT_JS) {
                                throw new java.lang.IndexOutOfBoundsException("Object Index exceeds teh maximum JavaScript number capacity. (2^53)");
                            }
                            return objectKey;
                        };
                        KeyCalculator.prototype.lastComputedIndex = function () {
                            return this._currentIndex;
                        };
                        KeyCalculator.prototype.prefix = function () {
                            return parseInt(this._prefix, 16);
                        };
                        KeyCalculator.LONG_LIMIT_JS = 0x001FFFFFFFFFFFFF;
                        KeyCalculator.INDEX_LIMIT = 0x0000001FFFFFFFFF;
                        return KeyCalculator;
                    })();
                    data.KeyCalculator = KeyCalculator;
                    var LookupAllRunnable = (function () {
                        function LookupAllRunnable(p_originView, p_keys, p_callback, p_store) {
                            this._originView = p_originView;
                            this._keys = p_keys;
                            this._callback = p_callback;
                            this._store = p_store;
                        }
                        LookupAllRunnable.prototype.run = function () {
                            var _this = this;
                            this._store.internal_resolve_dim_time(this._originView, this._keys, function (objects) {
                                var resolved = new Array();
                                var toLoadIndexes = new java.util.ArrayList();
                                for (var i = 0; i < objects.length; i++) {
                                    if (objects[i][org.kevoree.modeling.api.data.DefaultKStore.INDEX_RESOLVED_TIME] != null) {
                                        var entry = _this._store.read_cache(objects[i][org.kevoree.modeling.api.data.DefaultKStore.INDEX_RESOLVED_DIM], objects[i][org.kevoree.modeling.api.data.DefaultKStore.INDEX_RESOLVED_TIME], _this._keys[i]);
                                        if (entry == null) {
                                            toLoadIndexes.add(i);
                                        }
                                        else {
                                            resolved[i] = _this._originView.createProxy(entry.metaClass, entry.timeTree, _this._keys[i]);
                                        }
                                    }
                                }
                                if (toLoadIndexes.isEmpty()) {
                                    _this._callback(resolved);
                                }
                                else {
                                    var toLoadKeys = new Array();
                                    for (var i = 0; i < toLoadIndexes.size(); i++) {
                                        var toLoadIndex = toLoadIndexes.get(i);
                                        toLoadKeys[i] = _this._store.keyPayload(objects[toLoadIndex][org.kevoree.modeling.api.data.DefaultKStore.INDEX_RESOLVED_DIM], objects[toLoadIndex][org.kevoree.modeling.api.data.DefaultKStore.INDEX_RESOLVED_TIME], _this._keys[i]);
                                    }
                                    _this._store.dataBase().get(toLoadKeys, function (strings, error) {
                                        if (error != null) {
                                            error.printStackTrace();
                                            _this._callback(null);
                                        }
                                        else {
                                            for (var i = 0; i < strings.length; i++) {
                                                if (strings[i] != null) {
                                                    var index = toLoadIndexes.get(i);
                                                    var entry = org.kevoree.modeling.api.data.JsonRaw.decode(strings[i], _this._originView, objects[i][org.kevoree.modeling.api.data.DefaultKStore.INDEX_RESOLVED_TIME]);
                                                    if (entry != null) {
                                                        entry.timeTree = objects[i][org.kevoree.modeling.api.data.DefaultKStore.INDEX_RESOLVED_TIMETREE];
                                                        resolved[index] = _this._originView.createProxy(entry.metaClass, entry.timeTree, _this._keys[i]);
                                                        _this._store.write_cache(objects[i][org.kevoree.modeling.api.data.DefaultKStore.INDEX_RESOLVED_DIM], objects[i][org.kevoree.modeling.api.data.DefaultKStore.INDEX_RESOLVED_TIME], _this._keys[i], entry);
                                                    }
                                                }
                                            }
                                            _this._callback(resolved);
                                        }
                                    });
                                }
                            });
                        };
                        return LookupAllRunnable;
                    })();
                    data.LookupAllRunnable = LookupAllRunnable;
                    var MemoryKDataBase = (function () {
                        function MemoryKDataBase() {
                            this.backend = new java.util.HashMap();
                        }
                        MemoryKDataBase.prototype.put = function (payloads, callback) {
                            for (var i = 0; i < payloads.length; i++) {
                                this.backend.put(payloads[i][0], payloads[i][1]);
                                if (MemoryKDataBase.DEBUG) {
                                    System.out.println("PUT " + payloads[i][0] + "->" + payloads[i][1]);
                                }
                            }
                            if (callback != null) {
                                callback(null);
                            }
                        };
                        MemoryKDataBase.prototype.get = function (keys, callback) {
                            var values = new Array();
                            for (var i = 0; i < keys.length; i++) {
                                values[i] = this.backend.get(keys[i]);
                                if (MemoryKDataBase.DEBUG) {
                                    System.out.println("GET " + keys[i] + "->" + values[i]);
                                }
                            }
                            if (callback != null) {
                                callback(values, null);
                            }
                        };
                        MemoryKDataBase.prototype.remove = function (keys, callback) {
                            for (var i = 0; i < keys.length; i++) {
                                this.backend.remove(keys[i]);
                            }
                            if (callback != null) {
                                callback(null);
                            }
                        };
                        MemoryKDataBase.prototype.commit = function (callback) {
                            if (callback != null) {
                                callback(null);
                            }
                        };
                        MemoryKDataBase.prototype.connect = function (callback) {
                            if (callback != null) {
                                callback(null);
                            }
                        };
                        MemoryKDataBase.prototype.close = function (callback) {
                            this.backend.clear();
                        };
                        MemoryKDataBase.DEBUG = false;
                        return MemoryKDataBase;
                    })();
                    data.MemoryKDataBase = MemoryKDataBase;
                    var cache;
                    (function (cache) {
                        var TimeCache = (function () {
                            function TimeCache() {
                                this.payload_cache = new java.util.HashMap();
                                this.root = null;
                                this.rootDirty = false;
                            }
                            return TimeCache;
                        })();
                        cache.TimeCache = TimeCache;
                        var UniverseCache = (function () {
                            function UniverseCache() {
                                this.timeTreeCache = new java.util.HashMap();
                                this.timesCaches = new java.util.HashMap();
                                this.roots = null;
                            }
                            return UniverseCache;
                        })();
                        cache.UniverseCache = UniverseCache;
                    })(cache = data.cache || (data.cache = {}));
                })(data = api.data || (api.data = {}));
                var event;
                (function (_event) {
                    var DefaultKBroker = (function () {
                        function DefaultKBroker() {
                            this.listeners = new java.util.HashMap();
                        }
                        DefaultKBroker.prototype.connect = function (callback) {
                            if (callback != null) {
                                callback(null);
                            }
                        };
                        DefaultKBroker.prototype.close = function (callback) {
                            this.listeners.clear();
                            if (callback != null) {
                                callback(null);
                            }
                        };
                        DefaultKBroker.prototype.registerListener = function (origin, listener, scope) {
                            var tuple = new Array();
                            if (origin instanceof org.kevoree.modeling.api.abs.AbstractKUniverse) {
                                tuple[DefaultKBroker.DIM_INDEX] = origin.key();
                            }
                            else {
                                if (origin instanceof org.kevoree.modeling.api.abs.AbstractKView) {
                                    tuple[DefaultKBroker.DIM_INDEX] = origin.universe().key();
                                    tuple[DefaultKBroker.TIME_INDEX] = origin.now();
                                }
                                else {
                                    if (origin instanceof org.kevoree.modeling.api.abs.AbstractKObject) {
                                        var casted = origin;
                                        if (scope == null) {
                                            tuple[DefaultKBroker.DIM_INDEX] = casted.universe().key();
                                            tuple[DefaultKBroker.TIME_INDEX] = casted.now();
                                            tuple[DefaultKBroker.UUID_INDEX] = casted.uuid();
                                        }
                                        else {
                                            tuple[DefaultKBroker.UUID_INDEX] = casted.uuid();
                                            if (scope instanceof org.kevoree.modeling.api.abs.AbstractKUniverse) {
                                                tuple[DefaultKBroker.DIM_INDEX] = scope.key();
                                            }
                                        }
                                    }
                                }
                            }
                            this.listeners.put(listener, tuple);
                        };
                        DefaultKBroker.prototype.notify = function (event) {
                            var keys = this.listeners.keySet().toArray(new Array());
                            for (var i = 0; i < keys.length; i++) {
                                var tuple = this.listeners.get(keys[i]);
                                var match = true;
                                if (tuple[DefaultKBroker.DIM_INDEX] != null) {
                                    if (!tuple[DefaultKBroker.DIM_INDEX].equals(event.universe())) {
                                        match = false;
                                    }
                                }
                                if (tuple[DefaultKBroker.TIME_INDEX] != null) {
                                    if (!tuple[DefaultKBroker.TIME_INDEX].equals(event.time())) {
                                        match = false;
                                    }
                                }
                                if (tuple[DefaultKBroker.UUID_INDEX] != null) {
                                    if (!tuple[DefaultKBroker.UUID_INDEX].equals(event.uuid())) {
                                        match = false;
                                    }
                                }
                                if (match) {
                                    keys[i](event);
                                }
                            }
                        };
                        DefaultKBroker.prototype.sendOperationEvent = function (eventk) {
                        };
                        DefaultKBroker.prototype.flush = function (dimensionKey) {
                        };
                        DefaultKBroker.prototype.setKStore = function (store) {
                            this._store = store;
                        };
                        DefaultKBroker.prototype.setMetaModel = function (p_metaModel) {
                            this._metaModel = p_metaModel;
                        };
                        DefaultKBroker.prototype.unregister = function (listener) {
                            this.listeners.remove(listener);
                        };
                        DefaultKBroker.DIM_INDEX = 0;
                        DefaultKBroker.TIME_INDEX = 1;
                        DefaultKBroker.UUID_INDEX = 2;
                        DefaultKBroker.TUPLE_SIZE = 3;
                        return DefaultKBroker;
                    })();
                    _event.DefaultKBroker = DefaultKBroker;
                    var DefaultKEvent = (function () {
                        function DefaultKEvent(p_type, p_source, p_meta, p_newValue) {
                            if (p_source != null) {
                                this._dimensionKey = p_source.universe().key();
                                this._time = p_source.now();
                                this._uuid = p_source.uuid();
                                this._metaClass = p_source.metaClass();
                            }
                            if (p_type != null) {
                                this._actionType = p_type;
                            }
                            if (p_meta != null) {
                                this._metaElement = p_meta;
                            }
                            if (p_newValue != null) {
                                this._value = p_newValue;
                            }
                        }
                        DefaultKEvent.prototype.universe = function () {
                            return this._dimensionKey;
                        };
                        DefaultKEvent.prototype.time = function () {
                            return this._time;
                        };
                        DefaultKEvent.prototype.uuid = function () {
                            return this._uuid;
                        };
                        DefaultKEvent.prototype.actionType = function () {
                            return this._actionType;
                        };
                        DefaultKEvent.prototype.metaClass = function () {
                            return this._metaClass;
                        };
                        DefaultKEvent.prototype.metaElement = function () {
                            return this._metaElement;
                        };
                        DefaultKEvent.prototype.value = function () {
                            return this._value;
                        };
                        DefaultKEvent.prototype.toString = function () {
                            return this.toJSON();
                        };
                        DefaultKEvent.prototype.toJSON = function () {
                            var sb = new java.lang.StringBuilder();
                            sb.append(DefaultKEvent.LEFT_BRACE);
                            sb.append("\"").append(DefaultKEvent.DIMENSION_KEY).append("\":\"").append(this._dimensionKey).append("\",");
                            sb.append("\"").append(DefaultKEvent.TIME_KEY).append("\":\"").append(this._time).append("\",");
                            sb.append("\"").append(DefaultKEvent.UUID_KEY).append("\":\"").append(this._uuid).append("\",");
                            sb.append("\"").append(DefaultKEvent.TYPE_KEY).append("\":\"").append(this._actionType.toString()).append("\",");
                            sb.append("\"").append(DefaultKEvent.CLASS_KEY).append("\":\"").append(this._metaClass.metaName()).append("\"");
                            if (this._metaElement != null) {
                                sb.append(",\"").append(DefaultKEvent.ELEMENT_KEY).append("\":\"").append(this._metaElement.metaName()).append("\"");
                            }
                            if (this._value != null) {
                                sb.append(",\"").append(DefaultKEvent.VALUE_KEY).append("\":\"").append(org.kevoree.modeling.api.json.JsonString.encode(this._value.toString())).append("\"");
                            }
                            sb.append(DefaultKEvent.RIGHT_BRACE);
                            return sb.toString();
                        };
                        DefaultKEvent.fromJSON = function (payload, metaModel) {
                            var lexer = new org.kevoree.modeling.api.json.Lexer(payload);
                            var currentToken = lexer.nextToken();
                            if (currentToken.tokenType() == org.kevoree.modeling.api.json.Type.LEFT_BRACE) {
                                var currentAttributeName = null;
                                var event = new org.kevoree.modeling.api.event.DefaultKEvent(null, null, null, null);
                                currentToken = lexer.nextToken();
                                while (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.EOF) {
                                    if (currentToken.tokenType() == org.kevoree.modeling.api.json.Type.VALUE) {
                                        if (currentAttributeName == null) {
                                            currentAttributeName = currentToken.value().toString();
                                        }
                                        else {
                                            org.kevoree.modeling.api.event.DefaultKEvent.setEventAttribute(event, currentAttributeName, currentToken.value().toString(), metaModel);
                                            currentAttributeName = null;
                                        }
                                    }
                                    currentToken = lexer.nextToken();
                                }
                                return event;
                            }
                            return null;
                        };
                        DefaultKEvent.setEventAttribute = function (event, currentAttributeName, value, metaModel) {
                            if (currentAttributeName.equals(DefaultKEvent.DIMENSION_KEY)) {
                                event._dimensionKey = java.lang.Long.parseLong(value);
                            }
                            else {
                                if (currentAttributeName.equals(DefaultKEvent.TIME_KEY)) {
                                    event._time = java.lang.Long.parseLong(value);
                                }
                                else {
                                    if (currentAttributeName.equals(DefaultKEvent.UUID_KEY)) {
                                        event._uuid = java.lang.Long.parseLong(value);
                                    }
                                    else {
                                        if (currentAttributeName.equals(DefaultKEvent.TYPE_KEY)) {
                                            event._actionType = org.kevoree.modeling.api.KActionType.parse(value);
                                        }
                                        else {
                                            if (currentAttributeName.equals(DefaultKEvent.CLASS_KEY)) {
                                                event._metaClass = metaModel.metaClass(value);
                                            }
                                            else {
                                                if (currentAttributeName.equals(DefaultKEvent.ELEMENT_KEY)) {
                                                    if (event._metaClass != null) {
                                                        event._metaElement = event._metaClass.metaAttribute(value);
                                                        if (event._metaElement == null) {
                                                            event._metaElement = event._metaClass.metaReference(value);
                                                        }
                                                        if (event._metaElement == null) {
                                                            event._metaElement = event._metaClass.metaOperation(value);
                                                        }
                                                    }
                                                }
                                                else {
                                                    if (currentAttributeName.equals(DefaultKEvent.VALUE_KEY)) {
                                                        event._value = org.kevoree.modeling.api.json.JsonString.unescape(value);
                                                    }
                                                    else {
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        };
                        DefaultKEvent.prototype.toTrace = function () {
                            if (this._actionType.equals(org.kevoree.modeling.api.KActionType.ADD)) {
                                return new org.kevoree.modeling.api.trace.ModelAddTrace(this._uuid, this._metaElement, this._value.uuid());
                            }
                            if (this._actionType.equals(org.kevoree.modeling.api.KActionType.NEW)) {
                                return new org.kevoree.modeling.api.trace.ModelNewTrace(this._uuid, this._metaElement);
                            }
                            if (this._actionType.equals(org.kevoree.modeling.api.KActionType.REMOVE)) {
                                return new org.kevoree.modeling.api.trace.ModelAddTrace(this._uuid, this._metaElement, this._value.uuid());
                            }
                            if (this._actionType.equals(org.kevoree.modeling.api.KActionType.SET)) {
                                return new org.kevoree.modeling.api.trace.ModelSetTrace(this._uuid, this._metaElement, this._value);
                            }
                            return null;
                        };
                        DefaultKEvent.LEFT_BRACE = "{";
                        DefaultKEvent.RIGHT_BRACE = "}";
                        DefaultKEvent.DIMENSION_KEY = "dim";
                        DefaultKEvent.TIME_KEY = "time";
                        DefaultKEvent.UUID_KEY = "uuid";
                        DefaultKEvent.TYPE_KEY = "type";
                        DefaultKEvent.CLASS_KEY = "class";
                        DefaultKEvent.ELEMENT_KEY = "elem";
                        DefaultKEvent.VALUE_KEY = "value";
                        return DefaultKEvent;
                    })();
                    _event.DefaultKEvent = DefaultKEvent;
                })(event = api.event || (api.event = {}));
                var extrapolation;
                (function (extrapolation) {
                    var DiscreteExtrapolation = (function () {
                        function DiscreteExtrapolation() {
                        }
                        DiscreteExtrapolation.instance = function () {
                            if (DiscreteExtrapolation.INSTANCE == null) {
                                DiscreteExtrapolation.INSTANCE = new org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation();
                            }
                            return DiscreteExtrapolation.INSTANCE;
                        };
                        DiscreteExtrapolation.prototype.extrapolate = function (current, attribute) {
                            var payload = current.view().universe().model().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ);
                            if (payload != null) {
                                return payload[attribute.index()];
                            }
                            else {
                                return null;
                            }
                        };
                        DiscreteExtrapolation.prototype.mutate = function (current, attribute, payload) {
                            var internalPayload = current.view().universe().model().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE);
                            if (internalPayload != null) {
                                internalPayload[attribute.index()] = payload;
                            }
                        };
                        DiscreteExtrapolation.prototype.save = function (cache, attribute) {
                            if (cache != null) {
                                return attribute.metaType().save(cache);
                            }
                            else {
                                return null;
                            }
                        };
                        DiscreteExtrapolation.prototype.load = function (payload, attribute, now) {
                            if (payload != null) {
                                return attribute.metaType().load(payload);
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
                            var pol = current.view().universe().model().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[attribute.index()];
                            if (pol != null) {
                                var extrapolatedValue = pol.extrapolate(current.now());
                                if (attribute.metaType() == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.DOUBLE) {
                                    return extrapolatedValue;
                                }
                                else {
                                    if (attribute.metaType() == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.LONG) {
                                        return extrapolatedValue.longValue();
                                    }
                                    else {
                                        if (attribute.metaType() == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.FLOAT) {
                                            return extrapolatedValue.floatValue();
                                        }
                                        else {
                                            if (attribute.metaType() == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.INT) {
                                                return extrapolatedValue.intValue();
                                            }
                                            else {
                                                if (attribute.metaType() == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.SHORT) {
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
                            var raw = current.view().universe().model().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ);
                            var previous = raw[attribute.index()];
                            if (previous == null) {
                                var pol = this.createPolynomialModel(current.now(), attribute.precision());
                                pol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()));
                                current.view().universe().model().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE)[attribute.index()] = pol;
                            }
                            else {
                                var previousPol = previous;
                                if (!previousPol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()))) {
                                    var pol = this.createPolynomialModel(previousPol.lastIndex(), attribute.precision());
                                    pol.insert(previousPol.lastIndex(), previousPol.extrapolate(previousPol.lastIndex()));
                                    pol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()));
                                    current.view().universe().model().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE)[attribute.index()] = pol;
                                }
                                else {
                                    if (previousPol.isDirty()) {
                                        raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = true;
                                    }
                                }
                            }
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
                                PolynomialExtrapolation.INSTANCE = new org.kevoree.modeling.api.extrapolation.PolynomialExtrapolation();
                            }
                            return PolynomialExtrapolation.INSTANCE;
                        };
                        PolynomialExtrapolation.prototype.createPolynomialModel = function (origin, precision) {
                            return new org.kevoree.modeling.api.polynomial.doublepolynomial.DoublePolynomialModel(origin, precision, 20, org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES);
                        };
                        return PolynomialExtrapolation;
                    })();
                    extrapolation.PolynomialExtrapolation = PolynomialExtrapolation;
                })(extrapolation = api.extrapolation || (api.extrapolation = {}));
                var infer;
                (function (infer) {
                    var AverageKInfer = (function (_super) {
                        __extends(AverageKInfer, _super);
                        function AverageKInfer(p_view, p_uuid, p_timeTree) {
                            _super.call(this, p_view, p_uuid, p_timeTree, null);
                        }
                        AverageKInfer.prototype.train = function (trainingSet, expectedResultSet, callback) {
                            var currentState = this.modifyState();
                            for (var i = 0; i < expectedResultSet.length; i++) {
                                currentState.setSum(currentState.getSum() + java.lang.Double.parseDouble(expectedResultSet[i].toString()));
                                currentState.setNb(currentState.getNb() + 1);
                            }
                        };
                        AverageKInfer.prototype.infer = function (features) {
                            var currentState = this.readOnlyState();
                            if (currentState.getNb() != 0) {
                                return currentState.getSum() / currentState.getNb();
                            }
                            else {
                                return null;
                            }
                        };
                        AverageKInfer.prototype.accuracy = function (testSet, expectedResultSet) {
                            return null;
                        };
                        AverageKInfer.prototype.clear = function () {
                            var currentState = this.modifyState();
                            currentState.setSum(0);
                            currentState.setNb(0);
                        };
                        AverageKInfer.prototype.createEmptyState = function () {
                            return new org.kevoree.modeling.api.infer.AverageKInferState();
                        };
                        return AverageKInfer;
                    })(org.kevoree.modeling.api.abs.AbstractKObjectInfer);
                    infer.AverageKInfer = AverageKInfer;
                    var AverageKInferState = (function () {
                        function AverageKInferState() {
                            this._isDirty = false;
                            this.sum = 0;
                            this.nb = 0;
                        }
                        AverageKInferState.prototype.getNb = function () {
                            return this.nb;
                        };
                        AverageKInferState.prototype.setNb = function (nb) {
                            this._isDirty = true;
                            this.nb = nb;
                        };
                        AverageKInferState.prototype.getSum = function () {
                            return this.sum;
                        };
                        AverageKInferState.prototype.setSum = function (sum) {
                            this._isDirty = true;
                            this.sum = sum;
                        };
                        AverageKInferState.prototype.save = function () {
                            return this.sum + "/" + this.nb;
                        };
                        AverageKInferState.prototype.load = function (payload) {
                            try {
                                var previousState = payload.split("/");
                                this.sum = java.lang.Double.parseDouble(previousState[0]);
                                this.nb = java.lang.Integer.parseInt(previousState[1]);
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
                        AverageKInferState.prototype.isDirty = function () {
                            return this._isDirty;
                        };
                        AverageKInferState.prototype.cloneState = function () {
                            var cloned = new org.kevoree.modeling.api.infer.AverageKInferState();
                            cloned.setNb(this.getNb());
                            cloned.setSum(this.getSum());
                            return cloned;
                        };
                        return AverageKInferState;
                    })();
                    infer.AverageKInferState = AverageKInferState;
                })(infer = api.infer || (api.infer = {}));
                var json;
                (function (json) {
                    var JsonFormat = (function () {
                        function JsonFormat(p_view) {
                            this._view = p_view;
                        }
                        JsonFormat.prototype.save = function (model, callback) {
                            if (org.kevoree.modeling.api.util.Checker.isDefined(model) && org.kevoree.modeling.api.util.Checker.isDefined(callback)) {
                                org.kevoree.modeling.api.json.JsonModelSerializer.serialize(model, callback);
                            }
                            else {
                                throw new java.lang.RuntimeException("one parameter is null");
                            }
                        };
                        JsonFormat.prototype.saveRoot = function (callback) {
                            if (org.kevoree.modeling.api.util.Checker.isDefined(callback)) {
                                this._view.universe().model().storage().getRoot(this._view, function (root) {
                                    if (root == null) {
                                        callback("", new java.lang.Exception("Root not set yet !"));
                                    }
                                    else {
                                        org.kevoree.modeling.api.json.JsonModelSerializer.serialize(root, callback);
                                    }
                                });
                            }
                            else {
                                throw new java.lang.RuntimeException("one parameter is null");
                            }
                        };
                        JsonFormat.prototype.load = function (payload, callback) {
                            if (org.kevoree.modeling.api.util.Checker.isDefined(payload) && org.kevoree.modeling.api.util.Checker.isDefined(callback)) {
                                org.kevoree.modeling.api.json.JsonModelLoader.load(this._view, payload, callback);
                            }
                            else {
                                throw new java.lang.RuntimeException("one parameter is null");
                            }
                        };
                        return JsonFormat;
                    })();
                    json.JsonFormat = JsonFormat;
                    var JsonModelLoader = (function () {
                        function JsonModelLoader() {
                        }
                        JsonModelLoader.load = function (factory, payload, callback) {
                            if (payload == null) {
                                callback(null);
                            }
                            else {
                                var metaModel = factory.universe().model().metaModel();
                                var lexer = new org.kevoree.modeling.api.json.Lexer(payload);
                                var currentToken = lexer.nextToken();
                                if (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.LEFT_BRACKET) {
                                    callback(null);
                                }
                                else {
                                    var alls = new java.util.ArrayList();
                                    var content = new java.util.HashMap();
                                    var currentAttributeName = null;
                                    var arrayPayload = null;
                                    currentToken = lexer.nextToken();
                                    while (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.EOF) {
                                        if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.LEFT_BRACKET)) {
                                            arrayPayload = new java.util.HashSet();
                                        }
                                        else {
                                            if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.RIGHT_BRACKET)) {
                                                content.put(currentAttributeName, arrayPayload);
                                                arrayPayload = null;
                                                currentAttributeName = null;
                                            }
                                            else {
                                                if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.LEFT_BRACE)) {
                                                    content = new java.util.HashMap();
                                                }
                                                else {
                                                    if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.RIGHT_BRACE)) {
                                                        alls.add(content);
                                                        content = new java.util.HashMap();
                                                    }
                                                    else {
                                                        if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.VALUE)) {
                                                            if (currentAttributeName == null) {
                                                                currentAttributeName = currentToken.value().toString();
                                                            }
                                                            else {
                                                                if (arrayPayload == null) {
                                                                    content.put(currentAttributeName, currentToken.value().toString());
                                                                    currentAttributeName = null;
                                                                }
                                                                else {
                                                                    arrayPayload.add(currentToken.value().toString());
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        currentToken = lexer.nextToken();
                                    }
                                    var mappedKeys = new java.util.HashMap();
                                    for (var i = 0; i < alls.size(); i++) {
                                        try {
                                            var elem = alls.get(i);
                                            var kid = java.lang.Long.parseLong(elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID).toString());
                                            mappedKeys.put(kid, factory.universe().model().storage().nextObjectKey());
                                        }
                                        catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e = $ex$;
                                                e.printStackTrace();
                                            }
                                        }
                                    }
                                    for (var i = 0; i < alls.size(); i++) {
                                        try {
                                            var elem = alls.get(i);
                                            var kid = java.lang.Long.parseLong(elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID).toString());
                                            var meta = elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META).toString();
                                            var timeTree = new org.kevoree.modeling.api.time.DefaultTimeTree();
                                            timeTree.insert(factory.now());
                                            var metaClass = metaModel.metaClass(meta);
                                            var current = factory.createProxy(metaClass, timeTree, mappedKeys.get(kid));
                                            factory.universe().model().storage().initKObject(current, factory);
                                            var raw = factory.universe().model().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                            var metaKeys = elem.keySet().toArray(new Array());
                                            for (var h = 0; h < metaKeys.length; h++) {
                                                var metaKey = metaKeys[h];
                                                var payload_content = elem.get(metaKey);
                                                if (metaKey.equals(org.kevoree.modeling.api.json.JsonModelSerializer.INBOUNDS_META)) {
                                                    var inbounds = new java.util.HashSet();
                                                    raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] = inbounds;
                                                    try {
                                                        var raw_keys = payload_content;
                                                        var raw_keys_p = raw_keys.toArray(new Array());
                                                        for (var hh = 0; hh < raw_keys_p.length; hh++) {
                                                            try {
                                                                var converted = java.lang.Long.parseLong(raw_keys_p[hh]);
                                                                if (mappedKeys.containsKey(converted)) {
                                                                    converted = mappedKeys.get(converted);
                                                                }
                                                                inbounds.add(converted);
                                                            }
                                                            catch ($ex$) {
                                                                if ($ex$ instanceof java.lang.Exception) {
                                                                    var e = $ex$;
                                                                    e.printStackTrace();
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
                                                else {
                                                    if (metaKey.equals(org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_META)) {
                                                        try {
                                                            var raw_k = java.lang.Long.parseLong(payload_content.toString());
                                                            if (mappedKeys.containsKey(raw_k)) {
                                                                raw_k = mappedKeys.get(raw_k);
                                                            }
                                                            raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX] = raw_k;
                                                        }
                                                        catch ($ex$) {
                                                            if ($ex$ instanceof java.lang.Exception) {
                                                                var e = $ex$;
                                                                e.printStackTrace();
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        if (metaKey.equals(org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_REF_META)) {
                                                            try {
                                                                var parentRef_payload = payload_content.toString();
                                                                var elems = parentRef_payload.split(org.kevoree.modeling.api.data.JsonRaw.SEP);
                                                                if (elems.length == 2) {
                                                                    var foundMeta = metaModel.metaClass(elems[0].trim());
                                                                    if (foundMeta != null) {
                                                                        var metaReference = foundMeta.metaReference(elems[1].trim());
                                                                        if (metaReference != null) {
                                                                            raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX] = metaReference;
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
                                                        else {
                                                            if (metaKey.equals(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_ROOT)) {
                                                                try {
                                                                    if ("true".equals(payload_content)) {
                                                                        raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = true;
                                                                    }
                                                                    else {
                                                                        raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = false;
                                                                    }
                                                                }
                                                                catch ($ex$) {
                                                                    if ($ex$ instanceof java.lang.Exception) {
                                                                        var e = $ex$;
                                                                        e.printStackTrace();
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                if (metaKey.equals(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META)) {
                                                                }
                                                                else {
                                                                    var metaAttribute = metaClass.metaAttribute(metaKey);
                                                                    var metaReference = metaClass.metaReference(metaKey);
                                                                    if (payload_content != null) {
                                                                        if (metaAttribute != null) {
                                                                            raw[metaAttribute.index()] = metaAttribute.strategy().load(payload_content.toString(), metaAttribute, factory.now());
                                                                        }
                                                                        else {
                                                                            if (metaReference != null) {
                                                                                if (metaReference.single()) {
                                                                                    try {
                                                                                        var converted = java.lang.Long.parseLong(payload_content.toString());
                                                                                        if (mappedKeys.containsKey(converted)) {
                                                                                            converted = mappedKeys.get(converted);
                                                                                        }
                                                                                        raw[metaReference.index()] = converted;
                                                                                    }
                                                                                    catch ($ex$) {
                                                                                        if ($ex$ instanceof java.lang.Exception) {
                                                                                            var e = $ex$;
                                                                                            e.printStackTrace();
                                                                                        }
                                                                                    }
                                                                                }
                                                                                else {
                                                                                    try {
                                                                                        var convertedRaw = new java.util.HashSet();
                                                                                        var plainRawSet = payload_content;
                                                                                        var plainRawList = plainRawSet.toArray(new Array());
                                                                                        for (var l = 0; l < plainRawList.length; l++) {
                                                                                            var plainRaw = plainRawList[l];
                                                                                            try {
                                                                                                var converted = java.lang.Long.parseLong(plainRaw);
                                                                                                if (mappedKeys.containsKey(converted)) {
                                                                                                    converted = mappedKeys.get(converted);
                                                                                                }
                                                                                                convertedRaw.add(converted);
                                                                                            }
                                                                                            catch ($ex$) {
                                                                                                if ($ex$ instanceof java.lang.Exception) {
                                                                                                    var e = $ex$;
                                                                                                    e.printStackTrace();
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                        raw[metaReference.index()] = convertedRaw;
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
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            if (raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] == null) {
                                                raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = false;
                                            }
                                            if (raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX].equals(true)) {
                                                factory.setRoot(current, null);
                                            }
                                        }
                                        catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e = $ex$;
                                                e.printStackTrace();
                                            }
                                        }
                                    }
                                    if (callback != null) {
                                        callback(null);
                                    }
                                }
                            }
                        };
                        return JsonModelLoader;
                    })();
                    json.JsonModelLoader = JsonModelLoader;
                    var JsonModelSerializer = (function () {
                        function JsonModelSerializer() {
                        }
                        JsonModelSerializer.serialize = function (model, callback) {
                            var builder = new java.lang.StringBuilder();
                            builder.append("[\n");
                            org.kevoree.modeling.api.json.JsonModelSerializer.printJSON(model, builder);
                            model.visit(function (elem) {
                                builder.append(",\n");
                                try {
                                    org.kevoree.modeling.api.json.JsonModelSerializer.printJSON(elem, builder);
                                }
                                catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e = $ex$;
                                        e.printStackTrace();
                                        builder.append("{}");
                                    }
                                }
                                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            }, function (throwable) {
                                builder.append("\n]\n");
                                callback(builder.toString(), throwable);
                            }, org.kevoree.modeling.api.VisitRequest.ALL);
                        };
                        JsonModelSerializer.printJSON = function (elem, builder) {
                            if (elem != null) {
                                var raw = elem.view().universe().model().storage().raw(elem, org.kevoree.modeling.api.data.AccessMode.READ);
                                if (raw != null) {
                                    builder.append(org.kevoree.modeling.api.data.JsonRaw.encode(raw, elem.uuid(), elem.metaClass(), false));
                                }
                            }
                        };
                        JsonModelSerializer.KEY_META = "@meta";
                        JsonModelSerializer.KEY_UUID = "@uuid";
                        JsonModelSerializer.KEY_ROOT = "@root";
                        JsonModelSerializer.PARENT_META = "@parent";
                        JsonModelSerializer.PARENT_REF_META = "@ref";
                        JsonModelSerializer.INBOUNDS_META = "@inbounds";
                        JsonModelSerializer.TIME_META = "@time";
                        JsonModelSerializer.DIM_META = "@universe";
                        return JsonModelSerializer;
                    })();
                    json.JsonModelSerializer = JsonModelSerializer;
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
                        JsonString.encode = function (chain) {
                            var sb = new java.lang.StringBuilder();
                            org.kevoree.modeling.api.json.JsonString.encodeBuffer(sb, chain);
                            return sb.toString();
                        };
                        JsonString.unescape = function (src) {
                            if (src == null) {
                                return null;
                            }
                            if (src.length == 0) {
                                return src;
                            }
                            var builder = null;
                            var i = 0;
                            while (i < src.length) {
                                var current = src.charAt(i);
                                if (current == JsonString.ESCAPE_CHAR) {
                                    if (builder == null) {
                                        builder = new java.lang.StringBuilder();
                                        builder.append(src.substring(0, i));
                                    }
                                    i++;
                                    var current2 = src.charAt(i);
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
                                return src;
                            }
                        };
                        JsonString.ESCAPE_CHAR = '\\';
                        return JsonString;
                    })();
                    json.JsonString = JsonString;
                    var JsonToken = (function () {
                        function JsonToken(p_tokenType, p_value) {
                            this._tokenType = p_tokenType;
                            this._value = p_value;
                        }
                        JsonToken.prototype.toString = function () {
                            var v;
                            if (this._value != null) {
                                v = " (" + this._value + ")";
                            }
                            else {
                                v = "";
                            }
                            var result = this._tokenType.toString() + v;
                            return result;
                        };
                        JsonToken.prototype.tokenType = function () {
                            return this._tokenType;
                        };
                        JsonToken.prototype.value = function () {
                            return this._value;
                        };
                        return JsonToken;
                    })();
                    json.JsonToken = JsonToken;
                    var Lexer = (function () {
                        function Lexer(payload) {
                            this.BOOLEAN_LETTERS = null;
                            this.DIGIT = null;
                            this.index = 0;
                            this.bytes = payload;
                            this.EOF = new org.kevoree.modeling.api.json.JsonToken(org.kevoree.modeling.api.json.Type.EOF, null);
                        }
                        Lexer.prototype.isSpace = function (c) {
                            return c == ' ' || c == '\r' || c == '\n' || c == '\t';
                        };
                        Lexer.prototype.nextChar = function () {
                            return this.bytes.charAt(this.index++);
                        };
                        Lexer.prototype.peekChar = function () {
                            return this.bytes.charAt(this.index);
                        };
                        Lexer.prototype.isDone = function () {
                            return this.index >= this.bytes.length;
                        };
                        Lexer.prototype.isBooleanLetter = function (c) {
                            if (this.BOOLEAN_LETTERS == null) {
                                this.BOOLEAN_LETTERS = new java.util.HashSet();
                                this.BOOLEAN_LETTERS.add('f');
                                this.BOOLEAN_LETTERS.add('a');
                                this.BOOLEAN_LETTERS.add('l');
                                this.BOOLEAN_LETTERS.add('s');
                                this.BOOLEAN_LETTERS.add('e');
                                this.BOOLEAN_LETTERS.add('t');
                                this.BOOLEAN_LETTERS.add('r');
                                this.BOOLEAN_LETTERS.add('u');
                            }
                            return this.BOOLEAN_LETTERS.contains(c);
                        };
                        Lexer.prototype.isDigit = function (c) {
                            if (this.DIGIT == null) {
                                this.DIGIT = new java.util.HashSet();
                                this.DIGIT.add('0');
                                this.DIGIT.add('1');
                                this.DIGIT.add('2');
                                this.DIGIT.add('3');
                                this.DIGIT.add('4');
                                this.DIGIT.add('5');
                                this.DIGIT.add('6');
                                this.DIGIT.add('7');
                                this.DIGIT.add('8');
                                this.DIGIT.add('9');
                            }
                            return this.DIGIT.contains(c);
                        };
                        Lexer.prototype.isValueLetter = function (c) {
                            return c == '-' || c == '+' || c == '.' || this.isDigit(c) || this.isBooleanLetter(c);
                        };
                        Lexer.prototype.nextToken = function () {
                            if (this.isDone()) {
                                return this.EOF;
                            }
                            var tokenType = org.kevoree.modeling.api.json.Type.EOF;
                            var c = this.nextChar();
                            var currentValue = new java.lang.StringBuilder();
                            var jsonValue = null;
                            while (!this.isDone() && this.isSpace(c)) {
                                c = this.nextChar();
                            }
                            if ('"' == c) {
                                tokenType = org.kevoree.modeling.api.json.Type.VALUE;
                                if (!this.isDone()) {
                                    c = this.nextChar();
                                    while (this.index < this.bytes.length && c != '"') {
                                        currentValue.append(c);
                                        if (c == '\\' && this.index < this.bytes.length) {
                                            c = this.nextChar();
                                            currentValue.append(c);
                                        }
                                        c = this.nextChar();
                                    }
                                    jsonValue = currentValue.toString();
                                }
                            }
                            else {
                                if ('{' == c) {
                                    tokenType = org.kevoree.modeling.api.json.Type.LEFT_BRACE;
                                }
                                else {
                                    if ('}' == c) {
                                        tokenType = org.kevoree.modeling.api.json.Type.RIGHT_BRACE;
                                    }
                                    else {
                                        if ('[' == c) {
                                            tokenType = org.kevoree.modeling.api.json.Type.LEFT_BRACKET;
                                        }
                                        else {
                                            if (']' == c) {
                                                tokenType = org.kevoree.modeling.api.json.Type.RIGHT_BRACKET;
                                            }
                                            else {
                                                if (':' == c) {
                                                    tokenType = org.kevoree.modeling.api.json.Type.COLON;
                                                }
                                                else {
                                                    if (',' == c) {
                                                        tokenType = org.kevoree.modeling.api.json.Type.COMMA;
                                                    }
                                                    else {
                                                        if (!this.isDone()) {
                                                            while (this.isValueLetter(c)) {
                                                                currentValue.append(c);
                                                                if (!this.isValueLetter(this.peekChar())) {
                                                                    break;
                                                                }
                                                                else {
                                                                    c = this.nextChar();
                                                                }
                                                            }
                                                            var v = currentValue.toString();
                                                            if ("true".equals(v.toLowerCase())) {
                                                                jsonValue = true;
                                                            }
                                                            else {
                                                                if ("false".equals(v.toLowerCase())) {
                                                                    jsonValue = false;
                                                                }
                                                                else {
                                                                    jsonValue = v.toLowerCase();
                                                                }
                                                            }
                                                            tokenType = org.kevoree.modeling.api.json.Type.VALUE;
                                                        }
                                                        else {
                                                            tokenType = org.kevoree.modeling.api.json.Type.EOF;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            return new org.kevoree.modeling.api.json.JsonToken(tokenType, jsonValue);
                        };
                        Lexer.DEFAULT_BUFFER_SIZE = 1024 * 4;
                        return Lexer;
                    })();
                    json.Lexer = Lexer;
                    var Type = (function () {
                        function Type(p_value) {
                            this._value = p_value;
                        }
                        Type.prototype.equals = function (other) {
                            return this == other;
                        };
                        Type.values = function () {
                            return Type._TypeVALUES;
                        };
                        Type.VALUE = new Type(0);
                        Type.LEFT_BRACE = new Type(1);
                        Type.RIGHT_BRACE = new Type(2);
                        Type.LEFT_BRACKET = new Type(3);
                        Type.RIGHT_BRACKET = new Type(4);
                        Type.COMMA = new Type(5);
                        Type.COLON = new Type(6);
                        Type.EOF = new Type(42);
                        Type._TypeVALUES = [
                            Type.VALUE,
                            Type.LEFT_BRACE,
                            Type.RIGHT_BRACE,
                            Type.LEFT_BRACKET,
                            Type.RIGHT_BRACKET,
                            Type.COMMA,
                            Type.COLON,
                            Type.EOF
                        ];
                        return Type;
                    })();
                    json.Type = Type;
                })(json = api.json || (api.json = {}));
                var meta;
                (function (meta) {
                    var MetaInferClass = (function () {
                        function MetaInferClass() {
                            this._attributes = null;
                            this._references = new Array();
                            this._operations = new Array();
                            this._attributes = new Array();
                            this._attributes[0] = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("RAW", org.kevoree.modeling.api.data.Index.RESERVED_INDEXES, -1, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, new org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation());
                            this._attributes[1] = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("CACHE", org.kevoree.modeling.api.data.Index.RESERVED_INDEXES + 1, -1, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.TRANSIENT, new org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation());
                        }
                        MetaInferClass.getInstance = function () {
                            if (MetaInferClass._INSTANCE == null) {
                                MetaInferClass._INSTANCE = new org.kevoree.modeling.api.meta.MetaInferClass();
                            }
                            return MetaInferClass._INSTANCE;
                        };
                        MetaInferClass.prototype.getRaw = function () {
                            return this._attributes[0];
                        };
                        MetaInferClass.prototype.getCache = function () {
                            return this._attributes[1];
                        };
                        MetaInferClass.prototype.metaAttributes = function () {
                            return this._attributes;
                        };
                        MetaInferClass.prototype.metaReferences = function () {
                            return this._references;
                        };
                        MetaInferClass.prototype.metaOperations = function () {
                            return this._operations;
                        };
                        MetaInferClass.prototype.metaAttribute = function (name) {
                            return null;
                        };
                        MetaInferClass.prototype.metaReference = function (name) {
                            return null;
                        };
                        MetaInferClass.prototype.metaOperation = function (name) {
                            return null;
                        };
                        MetaInferClass.prototype.metaName = function () {
                            return "KInfer";
                        };
                        MetaInferClass.prototype.index = function () {
                            return -1;
                        };
                        MetaInferClass._INSTANCE = null;
                        return MetaInferClass;
                    })();
                    meta.MetaInferClass = MetaInferClass;
                    var PrimitiveMetaTypes = (function () {
                        function PrimitiveMetaTypes() {
                        }
                        PrimitiveMetaTypes.STRING = new org.kevoree.modeling.api.abs.AbstractKDataType("STRING", false);
                        PrimitiveMetaTypes.LONG = new org.kevoree.modeling.api.abs.AbstractKDataType("LONG", false);
                        PrimitiveMetaTypes.INT = new org.kevoree.modeling.api.abs.AbstractKDataType("INT", false);
                        PrimitiveMetaTypes.BOOL = new org.kevoree.modeling.api.abs.AbstractKDataType("BOOL", false);
                        PrimitiveMetaTypes.SHORT = new org.kevoree.modeling.api.abs.AbstractKDataType("SHORT", false);
                        PrimitiveMetaTypes.DOUBLE = new org.kevoree.modeling.api.abs.AbstractKDataType("DOUBLE", false);
                        PrimitiveMetaTypes.FLOAT = new org.kevoree.modeling.api.abs.AbstractKDataType("FLOAT", false);
                        PrimitiveMetaTypes.TRANSIENT = new org.kevoree.modeling.api.abs.AbstractKDataType("TRANSIENT", false);
                        return PrimitiveMetaTypes;
                    })();
                    meta.PrimitiveMetaTypes = PrimitiveMetaTypes;
                })(meta = api.meta || (api.meta = {}));
                var operation;
                (function (operation) {
                    var DefaultModelCloner = (function () {
                        function DefaultModelCloner() {
                        }
                        DefaultModelCloner.clone = function (originalObject, callback) {
                            if (originalObject == null || originalObject.view() == null || originalObject.view().universe() == null) {
                                callback(null);
                            }
                            else {
                                originalObject.view().universe().split(function (o) {
                                    o.time(originalObject.view().now()).lookup(originalObject.uuid(), function (clonedObject) {
                                        callback(clonedObject);
                                    });
                                });
                            }
                        };
                        return DefaultModelCloner;
                    })();
                    operation.DefaultModelCloner = DefaultModelCloner;
                    var DefaultModelCompare = (function () {
                        function DefaultModelCompare() {
                        }
                        DefaultModelCompare.diff = function (origin, target, callback) {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.internal_diff(origin, target, false, false, callback);
                        };
                        DefaultModelCompare.merge = function (origin, target, callback) {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.internal_diff(origin, target, false, true, callback);
                        };
                        DefaultModelCompare.intersection = function (origin, target, callback) {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.internal_diff(origin, target, true, false, callback);
                        };
                        DefaultModelCompare.internal_diff = function (origin, target, inter, merge, callback) {
                            var traces = new java.util.ArrayList();
                            var tracesRef = new java.util.ArrayList();
                            var objectsMap = new java.util.HashMap();
                            traces.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(origin, target, inter, merge, false, true));
                            tracesRef.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(origin, target, inter, merge, true, false));
                            origin.visit(function (elem) {
                                objectsMap.put(elem.uuid(), elem);
                                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            }, function (throwable) {
                                if (throwable != null) {
                                    throwable.printStackTrace();
                                    callback(null);
                                }
                                else {
                                    target.visit(function (elem) {
                                        var childUUID = elem.uuid();
                                        if (objectsMap.containsKey(childUUID)) {
                                            if (inter) {
                                                traces.add(new org.kevoree.modeling.api.trace.ModelNewTrace(elem.uuid(), elem.metaClass()));
                                                traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.parentUuid(), elem.referenceInParent(), elem.uuid()));
                                            }
                                            traces.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(objectsMap.get(childUUID), elem, inter, merge, false, true));
                                            tracesRef.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(objectsMap.get(childUUID), elem, inter, merge, true, false));
                                            objectsMap.remove(childUUID);
                                        }
                                        else {
                                            if (!inter) {
                                                traces.add(new org.kevoree.modeling.api.trace.ModelNewTrace(elem.uuid(), elem.metaClass()));
                                                traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.parentUuid(), elem.referenceInParent(), elem.uuid()));
                                                traces.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(elem, elem, true, merge, false, true));
                                                tracesRef.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(elem, elem, true, merge, true, false));
                                            }
                                        }
                                        return org.kevoree.modeling.api.VisitResult.CONTINUE;
                                    }, function (throwable) {
                                        if (throwable != null) {
                                            throwable.printStackTrace();
                                            callback(null);
                                        }
                                        else {
                                            traces.addAll(tracesRef);
                                            if (!inter && !merge) {
                                                var diffChildKeys = objectsMap.keySet().toArray(new Array());
                                                for (var i = 0; i < diffChildKeys.length; i++) {
                                                    var diffChildKey = diffChildKeys[i];
                                                    var diffChild = objectsMap.get(diffChildKey);
                                                    var src = diffChild.parentUuid();
                                                    traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(src, diffChild.referenceInParent(), diffChild.uuid()));
                                                }
                                            }
                                            callback(new org.kevoree.modeling.api.trace.TraceSequence().populate(traces));
                                        }
                                    }, org.kevoree.modeling.api.VisitRequest.CONTAINED);
                                }
                            }, org.kevoree.modeling.api.VisitRequest.CONTAINED);
                        };
                        DefaultModelCompare.internal_createTraces = function (current, sibling, inter, merge, references, attributes) {
                            var traces = new java.util.ArrayList();
                            var values = new java.util.HashMap();
                            if (attributes) {
                                if (current != null) {
                                    current.visitAttributes(function (metaAttribute, value) {
                                        if (value == null) {
                                            values.put(metaAttribute, null);
                                        }
                                        else {
                                            values.put(metaAttribute, value.toString());
                                        }
                                    });
                                }
                                if (sibling != null) {
                                    sibling.visitAttributes(function (metaAttribute, value) {
                                        var flatAtt2 = null;
                                        if (value != null) {
                                            flatAtt2 = value.toString();
                                        }
                                        var flatAtt1 = values.get(metaAttribute);
                                        var isEquals = true;
                                        if (flatAtt1 == null) {
                                            if (flatAtt2 == null) {
                                                isEquals = true;
                                            }
                                            else {
                                                isEquals = false;
                                            }
                                        }
                                        else {
                                            isEquals = flatAtt1.equals(flatAtt2);
                                        }
                                        if (isEquals) {
                                            if (inter) {
                                                traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(current.uuid(), metaAttribute, flatAtt2));
                                            }
                                        }
                                        else {
                                            if (!inter) {
                                                traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(current.uuid(), metaAttribute, flatAtt2));
                                            }
                                        }
                                        values.remove(metaAttribute);
                                    });
                                }
                                if (!inter && !merge && !values.isEmpty()) {
                                    var mettaAttributes = values.keySet().toArray(new Array());
                                    for (var i = 0; i < mettaAttributes.length; i++) {
                                        var hashLoopRes = mettaAttributes[i];
                                        traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(current.uuid(), hashLoopRes, null));
                                        values.remove(hashLoopRes);
                                    }
                                }
                            }
                            var valuesRef = new java.util.HashMap();
                            if (references) {
                                for (var i = 0; i < current.metaClass().metaReferences().length; i++) {
                                    var reference = current.metaClass().metaReferences()[i];
                                    var payload = current.view().universe().model().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[reference.index()];
                                    valuesRef.put(reference, payload);
                                }
                                if (sibling != null) {
                                    for (var i = 0; i < sibling.metaClass().metaReferences().length; i++) {
                                        var reference = sibling.metaClass().metaReferences()[i];
                                        var payload2 = sibling.view().universe().model().storage().raw(sibling, org.kevoree.modeling.api.data.AccessMode.READ)[reference.index()];
                                        var payload1 = valuesRef.get(reference);
                                        if (reference.single()) {
                                            var isEquals = true;
                                            if (payload1 == null) {
                                                if (payload2 == null) {
                                                    isEquals = true;
                                                }
                                                else {
                                                    isEquals = false;
                                                }
                                            }
                                            else {
                                                isEquals = payload1.equals(payload2);
                                            }
                                            if (isEquals) {
                                                if (inter) {
                                                    if (payload2 != null) {
                                                        traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, payload2));
                                                    }
                                                }
                                            }
                                            else {
                                                if (!inter) {
                                                    traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, payload2));
                                                }
                                            }
                                        }
                                        else {
                                            if (payload1 == null && payload2 != null) {
                                                var siblingToAdd = payload2.toArray(new Array());
                                                for (var j = 0; j < siblingToAdd.length; j++) {
                                                    var siblingElem = siblingToAdd[j];
                                                    if (!inter) {
                                                        traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, siblingElem));
                                                    }
                                                }
                                            }
                                            else {
                                                if (payload1 != null) {
                                                    var currentPaths = payload1.toArray(new Array());
                                                    for (var j = 0; j < currentPaths.length; j++) {
                                                        var currentPath = currentPaths[j];
                                                        var isFound = false;
                                                        if (payload2 != null) {
                                                            var siblingPaths = payload2;
                                                            isFound = siblingPaths.contains(currentPath);
                                                        }
                                                        if (isFound) {
                                                            if (inter) {
                                                                traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, currentPath));
                                                            }
                                                        }
                                                        else {
                                                            if (!inter) {
                                                                traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(current.uuid(), reference, currentPath));
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        valuesRef.remove(reference);
                                    }
                                    if (!inter && !merge && !valuesRef.isEmpty()) {
                                        var metaReferences = valuesRef.keySet().toArray(new Array());
                                        for (var i = 0; i < metaReferences.length; i++) {
                                            var hashLoopResRef = metaReferences[i];
                                            var payload = valuesRef.get(hashLoopResRef);
                                            if (payload != null) {
                                                if (payload instanceof java.util.Set) {
                                                    var toRemoveSet = payload.toArray(new Array());
                                                    for (var j = 0; j < toRemoveSet.length; j++) {
                                                        var toRemovePath = toRemoveSet[j];
                                                        traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(current.uuid(), hashLoopResRef, toRemovePath));
                                                    }
                                                }
                                                else {
                                                    traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(current.uuid(), hashLoopResRef, payload));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            return traces;
                        };
                        return DefaultModelCompare;
                    })();
                    operation.DefaultModelCompare = DefaultModelCompare;
                })(operation = api.operation || (api.operation = {}));
                var polynomial;
                (function (polynomial) {
                    var doublepolynomial;
                    (function (doublepolynomial) {
                        var DoublePolynomialModel = (function () {
                            function DoublePolynomialModel(p_timeOrigin, p_toleratedError, p_maxDegree, p_prioritization) {
                                this._isDirty = false;
                                this._polyTime = new org.kevoree.modeling.api.polynomial.doublepolynomial.TimePolynomial(p_timeOrigin);
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
                                        var pf = new org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml(deg);
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
                                if (this._prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.HIGHDEGREES) {
                                    tol = this._toleratedError / Math.pow(2, this._maxDegree - this.degree());
                                }
                                else {
                                    if (this._prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES) {
                                        tol = this._toleratedError / Math.pow(2, this.degree() + 0.5);
                                    }
                                    else {
                                        if (this._prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.SAMEPRIORITY) {
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
                                        var pf = new org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml(deg);
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
                                        builder.append(org.kevoree.modeling.api.polynomial.doublepolynomial.DoublePolynomialModel.sepW);
                                    }
                                    builder.append(this._weights[i] + "");
                                }
                                builder.append(org.kevoree.modeling.api.polynomial.doublepolynomial.DoublePolynomialModel.sepW);
                                builder.append(this._nbSamples);
                                builder.append(org.kevoree.modeling.api.polynomial.doublepolynomial.DoublePolynomialModel.sepW);
                                builder.append(this._samplingPeriod);
                                this._isDirty = false;
                                return builder.toString();
                            };
                            TimePolynomial.prototype.load = function (payload) {
                                var parts = payload.split(org.kevoree.modeling.api.polynomial.doublepolynomial.DoublePolynomialModel.sepW);
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
                                this.samples = new java.util.ArrayList();
                                this._lastIndex = -1;
                                this._isDirty = false;
                                this.timeOrigin = timeOrigin;
                                this.degradeFactor = 1;
                                this.prioritization = prioritization;
                                this.maxDegree = maxDegree;
                                this.toleratedError = toleratedError;
                            }
                            SimplePolynomialModel.prototype.getSamples = function () {
                                return this.samples;
                            };
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
                                var tol = toleratedError;
                                if (prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.HIGHDEGREES) {
                                    tol = toleratedError / Math.pow(2, maxDegree - degree);
                                }
                                else {
                                    if (prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES) {
                                        tol = toleratedError / Math.pow(2, degree + 0.5);
                                    }
                                    else {
                                        if (prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.SAMEPRIORITY) {
                                            tol = toleratedError * degree * 2 / (2 * maxDegree);
                                        }
                                    }
                                }
                                return tol;
                            };
                            SimplePolynomialModel.prototype.internal_feed = function (time, value) {
                                if (this.weights == null) {
                                    this.weights = new Array();
                                    this.weights[0] = value;
                                    this.timeOrigin = time;
                                    this.samples.add(new org.kevoree.modeling.api.polynomial.util.DataSample(time, value));
                                }
                            };
                            SimplePolynomialModel.prototype.maxError = function (computedWeights, time, value) {
                                var maxErr = 0;
                                var temp = 0;
                                var ds;
                                for (var i = 0; i < this.samples.size(); i++) {
                                    ds = this.samples.get(i);
                                    var val = this.internal_extrapolate(ds.time, computedWeights);
                                    temp = Math.abs(val - ds.value);
                                    if (temp > maxErr) {
                                        maxErr = temp;
                                    }
                                }
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
                                if (this.weights == null) {
                                    this.internal_feed(time, value);
                                    this._lastIndex = time;
                                    this._isDirty = true;
                                    return true;
                                }
                                var maxError = this.getMaxErr(this.getDegree(), this.toleratedError, this.maxDegree, this.prioritization);
                                if (Math.abs(this.extrapolate(time) - value) <= maxError) {
                                    this.samples.add(new org.kevoree.modeling.api.polynomial.util.DataSample(time, value));
                                    this._lastIndex = time;
                                    return true;
                                }
                                var deg = this.getDegree();
                                if (deg < this.maxDegree) {
                                    deg++;
                                    var ss = Math.min(deg * 2, this.samples.size());
                                    var times = new Array();
                                    var values = new Array();
                                    var current = this.samples.size();
                                    for (var i = 0; i < ss; i++) {
                                        var index = Math.round(i * current / ss);
                                        var ds = this.samples.get(index);
                                        times[i] = (ds.time - this.timeOrigin) / this.degradeFactor;
                                        values[i] = ds.value;
                                    }
                                    times[ss] = (time - this.timeOrigin) / this.degradeFactor;
                                    values[ss] = value;
                                    var pf = new org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml(deg);
                                    pf.fit(times, values);
                                    if (this.maxError(pf.getCoef(), time, value) <= maxError) {
                                        this.weights = new Array();
                                        for (var i = 0; i < pf.getCoef().length; i++) {
                                            this.weights[i] = pf.getCoef()[i];
                                        }
                                        this.samples.add(new org.kevoree.modeling.api.polynomial.util.DataSample(time, value));
                                        this._lastIndex = time;
                                        this._isDirty = true;
                                        return true;
                                    }
                                }
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
                                this.decomposer = new org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64();
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
                                    org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA(this.Q, this.Y, this.Z);
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
                                this.Q = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(maxRows, maxRows);
                                this.R = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(maxRows, maxCols);
                                this.Y = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(maxRows, 1);
                                this.Z = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(maxRows, 1);
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
                                    org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.fill(C, 0);
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
                                    org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.fill(c, 0);
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
                                    if (a.numCols >= org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH) {
                                        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA_reorderMV(a, b, c);
                                    }
                                    else {
                                        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA_smallMV(a, b, c);
                                    }
                                }
                                else {
                                    if (a.numCols >= org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH || b.numCols >= org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH) {
                                        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA_reorderMM(a, b, c);
                                    }
                                    else {
                                        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA_smallMM(a, b, c);
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
                                var ret = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(width, width);
                                for (var i = 0; i < width; i++) {
                                    ret.cset(i, i, 1.0);
                                }
                                return ret;
                            };
                            DenseMatrix64F.identity = function (numRows, numCols) {
                                var ret = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(numRows, numCols);
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
                                this.coef = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(degree + 1, 1);
                                this.A = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(1, degree + 1);
                                this.y = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(1, 1);
                                this.solver = new org.kevoree.modeling.api.polynomial.util.AdjLinearSolverQr();
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
                                        Q = org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.identity(this.numRows, this.minLength);
                                    }
                                    else {
                                        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.setIdentity(Q);
                                    }
                                }
                                else {
                                    if (Q == null) {
                                        Q = org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.widentity(this.numRows);
                                    }
                                    else {
                                        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.setIdentity(Q);
                                    }
                                }
                                for (var j = this.minLength - 1; j >= 0; j--) {
                                    var u = this.dataQR[j];
                                    var vv = u[j];
                                    u[j] = 1;
                                    org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64.rank1UpdateMultR(Q, u, this.gammas[j], j, j, this.numRows, this.v);
                                    u[j] = vv;
                                }
                                return Q;
                            };
                            QRDecompositionHouseholderColumn_D64.prototype.getR = function (R, compact) {
                                if (R == null) {
                                    if (compact) {
                                        R = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(this.minLength, this.numCols);
                                    }
                                    else {
                                        R = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(this.numRows, this.numCols);
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
                                var max = org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64.findMax(u, j, this.numRows - j);
                                if (max == 0.0) {
                                    this.gamma = 0;
                                    this.error = true;
                                }
                                else {
                                    this.tau = org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64.computeTauAndDivide(j, this.numRows, u, max);
                                    var u_0 = u[j] + this.tau;
                                    org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64.divideElements(j + 1, this.numRows, u, u_0);
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
                })(polynomial = api.polynomial || (api.polynomial = {}));
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
                        DynamicKModel.prototype.internal_create = function (key) {
                            return new org.kevoree.modeling.api.reflexive.DynamicKUniverse(this, key);
                        };
                        return DynamicKModel;
                    })(org.kevoree.modeling.api.abs.AbstractKModel);
                    reflexive.DynamicKModel = DynamicKModel;
                    var DynamicKObject = (function (_super) {
                        __extends(DynamicKObject, _super);
                        function DynamicKObject(p_view, p_uuid, p_timeTree, p_metaClass) {
                            _super.call(this, p_view, p_uuid, p_timeTree, p_metaClass);
                        }
                        return DynamicKObject;
                    })(org.kevoree.modeling.api.abs.AbstractKObject);
                    reflexive.DynamicKObject = DynamicKObject;
                    var DynamicKUniverse = (function (_super) {
                        __extends(DynamicKUniverse, _super);
                        function DynamicKUniverse(p_universe, p_key) {
                            _super.call(this, p_universe, p_key);
                        }
                        DynamicKUniverse.prototype.internal_create = function (timePoint) {
                            return new org.kevoree.modeling.api.reflexive.DynamicKView(timePoint, this);
                        };
                        return DynamicKUniverse;
                    })(org.kevoree.modeling.api.abs.AbstractKUniverse);
                    reflexive.DynamicKUniverse = DynamicKUniverse;
                    var DynamicKView = (function (_super) {
                        __extends(DynamicKView, _super);
                        function DynamicKView(p_now, p_dimension) {
                            _super.call(this, p_now, p_dimension);
                        }
                        DynamicKView.prototype.internalCreate = function (clazz, timeTree, key) {
                            return new org.kevoree.modeling.api.reflexive.DynamicKObject(this, key, timeTree, clazz);
                        };
                        return DynamicKView;
                    })(org.kevoree.modeling.api.abs.AbstractKView);
                    reflexive.DynamicKView = DynamicKView;
                    var DynamicMetaClass = (function (_super) {
                        __extends(DynamicMetaClass, _super);
                        function DynamicMetaClass(p_name, p_index) {
                            _super.call(this, p_name, p_index);
                            this.cached_attributes = new java.util.HashMap();
                            this.cached_references = new java.util.HashMap();
                            this.cached_methods = new java.util.HashMap();
                            this._globalIndex = -1;
                            this._globalIndex = org.kevoree.modeling.api.data.Index.RESERVED_INDEXES;
                        }
                        DynamicMetaClass.prototype.addAttribute = function (p_name, p_type) {
                            var tempAttribute = new org.kevoree.modeling.api.abs.AbstractMetaAttribute(p_name, this._globalIndex, -1, false, p_type, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                            this.cached_attributes.put(tempAttribute.metaName(), tempAttribute);
                            this._globalIndex = this._globalIndex + 1;
                            this.internalInit();
                            return this;
                        };
                        DynamicMetaClass.prototype.addReference = function (p_name, p_metaClass, contained) {
                            var tempOrigin = this;
                            var tempReference = new org.kevoree.modeling.api.abs.AbstractMetaReference(p_name, this._globalIndex, contained, false, function () {
                                return p_metaClass;
                            }, null, function () {
                                return tempOrigin;
                            });
                            this.cached_references.put(tempReference.metaName(), tempReference);
                            this._globalIndex = this._globalIndex + 1;
                            this.internalInit();
                            return this;
                        };
                        DynamicMetaClass.prototype.addOperation = function (p_name) {
                            var tempOrigin = this;
                            var tempOperation = new org.kevoree.modeling.api.abs.AbstractMetaOperation(p_name, this._globalIndex, function () {
                                return tempOrigin;
                            });
                            this.cached_methods.put(tempOperation.metaName(), tempOperation);
                            this._globalIndex = this._globalIndex + 1;
                            this.internalInit();
                            return this;
                        };
                        DynamicMetaClass.prototype.internalInit = function () {
                            var tempAttributes = new Array();
                            var tempReference = new Array();
                            var tempOperation = new Array();
                            var keysAttributes = this.cached_attributes.keySet().toArray(new Array());
                            for (var i = 0; i < keysAttributes.length; i++) {
                                var resAtt = this.cached_attributes.get(keysAttributes[i]);
                                tempAttributes[i] = resAtt;
                            }
                            var keysReferences = this.cached_references.keySet().toArray(new Array());
                            for (var i = 0; i < keysReferences.length; i++) {
                                var resRef = this.cached_references.get(keysReferences[i]);
                                tempReference[i] = resRef;
                            }
                            var keysOperations = this.cached_methods.keySet().toArray(new Array());
                            for (var i = 0; i < keysOperations.length; i++) {
                                var resOp = this.cached_methods.get(keysOperations[i]);
                                tempOperation[i] = resOp;
                            }
                            this.init(tempAttributes, tempReference, tempOperation);
                        };
                        return DynamicMetaClass;
                    })(org.kevoree.modeling.api.abs.AbstractMetaClass);
                    reflexive.DynamicMetaClass = DynamicMetaClass;
                    var DynamicMetaModel = (function () {
                        function DynamicMetaModel(p_metaName) {
                            this._metaName = null;
                            this._classes = new java.util.HashMap();
                            this._metaName = p_metaName;
                        }
                        DynamicMetaModel.prototype.metaClasses = function () {
                            var tempResult = new Array();
                            var keys = this._classes.keySet().toArray(new Array());
                            for (var i = 0; i < keys.length; i++) {
                                var res = this._classes.get(keys[i]);
                                tempResult[res.index()] = res;
                            }
                            return tempResult;
                        };
                        DynamicMetaModel.prototype.metaClass = function (name) {
                            return this._classes.get(name);
                        };
                        DynamicMetaModel.prototype.metaName = function () {
                            return this._metaName;
                        };
                        DynamicMetaModel.prototype.index = function () {
                            return -1;
                        };
                        DynamicMetaModel.prototype.createMetaClass = function (name) {
                            if (this._classes.containsKey(name)) {
                                return this._classes.get(name);
                            }
                            else {
                                var dynamicMetaClass = new org.kevoree.modeling.api.reflexive.DynamicMetaClass(name, this._classes.keySet().size());
                                this._classes.put(name, dynamicMetaClass);
                                return dynamicMetaClass;
                            }
                        };
                        DynamicMetaModel.prototype.model = function () {
                            var universe = new org.kevoree.modeling.api.reflexive.DynamicKModel();
                            universe.setMetaModel(this);
                            return universe;
                        };
                        return DynamicMetaModel;
                    })();
                    reflexive.DynamicMetaModel = DynamicMetaModel;
                })(reflexive = api.reflexive || (api.reflexive = {}));
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
                })(scheduler = api.scheduler || (api.scheduler = {}));
                var time;
                (function (_time) {
                    var DefaultTimeTree = (function () {
                        function DefaultTimeTree() {
                            this.dirty = true;
                            this.versionTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                        }
                        DefaultTimeTree.prototype.walk = function (walker) {
                            this.walkAsc(walker);
                        };
                        DefaultTimeTree.prototype.walkAsc = function (walker) {
                            var elem = this.versionTree.first();
                            while (elem != null) {
                                walker(elem.getKey());
                                elem = elem.next();
                            }
                        };
                        DefaultTimeTree.prototype.walkDesc = function (walker) {
                            var elem = this.versionTree.last();
                            while (elem != null) {
                                walker(elem.getKey());
                                elem = elem.previous();
                            }
                        };
                        DefaultTimeTree.prototype.walkRangeAsc = function (walker, from, to) {
                            var from2 = from;
                            var to2 = to;
                            if (from > to) {
                                from2 = to;
                                to2 = from;
                            }
                            var elem = this.versionTree.previousOrEqual(from2);
                            while (elem != null) {
                                walker(elem.getKey());
                                elem = elem.next();
                                if (elem != null) {
                                    if (elem.getKey() >= to2) {
                                        return;
                                    }
                                }
                            }
                        };
                        DefaultTimeTree.prototype.walkRangeDesc = function (walker, from, to) {
                            var from2 = from;
                            var to2 = to;
                            if (from > to) {
                                from2 = to;
                                to2 = from;
                            }
                            var elem = this.versionTree.previousOrEqual(to2);
                            while (elem != null) {
                                walker(elem.getKey());
                                elem = elem.previous();
                                if (elem != null) {
                                    if (elem.getKey() <= from2) {
                                        walker(elem.getKey());
                                        return;
                                    }
                                }
                            }
                        };
                        DefaultTimeTree.prototype.first = function () {
                            var firstNode = this.versionTree.first();
                            if (firstNode != null) {
                                return firstNode.getKey();
                            }
                            else {
                                return null;
                            }
                        };
                        DefaultTimeTree.prototype.last = function () {
                            var lastNode = this.versionTree.last();
                            if (lastNode != null) {
                                return lastNode.getKey();
                            }
                            else {
                                return null;
                            }
                        };
                        DefaultTimeTree.prototype.next = function (from) {
                            var nextNode = this.versionTree.next(from);
                            if (nextNode != null) {
                                return nextNode.getKey();
                            }
                            else {
                                return null;
                            }
                        };
                        DefaultTimeTree.prototype.previous = function (from) {
                            var previousNode = this.versionTree.previous(from);
                            if (previousNode != null) {
                                return previousNode.getKey();
                            }
                            else {
                                return null;
                            }
                        };
                        DefaultTimeTree.prototype.resolve = function (time) {
                            var previousNode = this.versionTree.previousOrEqual(time);
                            if (previousNode != null) {
                                return previousNode.getKey();
                            }
                            else {
                                return null;
                            }
                        };
                        DefaultTimeTree.prototype.insert = function (time) {
                            this.versionTree.insert(time, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                            this.dirty = true;
                            return this;
                        };
                        DefaultTimeTree.prototype.delete = function (time) {
                            this.versionTree.insert(time, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                            this.dirty = true;
                            return this;
                        };
                        DefaultTimeTree.prototype.isDirty = function () {
                            return this.dirty;
                        };
                        DefaultTimeTree.prototype.size = function () {
                            return this.versionTree.size();
                        };
                        DefaultTimeTree.prototype.setDirty = function (state) {
                            this.dirty = state;
                        };
                        DefaultTimeTree.prototype.toString = function () {
                            return this.versionTree.serialize();
                        };
                        DefaultTimeTree.prototype.load = function (payload) {
                            this.versionTree.unserialize(payload);
                            this.dirty = false;
                        };
                        return DefaultTimeTree;
                    })();
                    _time.DefaultTimeTree = DefaultTimeTree;
                    var rbtree;
                    (function (rbtree) {
                        var Color = (function () {
                            function Color() {
                            }
                            Color.prototype.equals = function (other) {
                                return this == other;
                            };
                            Color.values = function () {
                                return Color._ColorVALUES;
                            };
                            Color.RED = new Color();
                            Color.BLACK = new Color();
                            Color._ColorVALUES = [
                                Color.RED,
                                Color.BLACK
                            ];
                            return Color;
                        })();
                        rbtree.Color = Color;
                        var LongRBTree = (function () {
                            function LongRBTree() {
                                this.root = null;
                                this._size = 0;
                                this.dirty = false;
                            }
                            LongRBTree.prototype.size = function () {
                                return this._size;
                            };
                            LongRBTree.prototype.serialize = function () {
                                var builder = new java.lang.StringBuilder();
                                builder.append(this._size);
                                if (this.root != null) {
                                    this.root.serialize(builder);
                                }
                                return builder.toString();
                            };
                            LongRBTree.prototype.unserialize = function (payload) {
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
                                var ctx = new org.kevoree.modeling.api.time.rbtree.TreeReaderContext();
                                ctx.index = i;
                                ctx.payload = payload;
                                ctx.buffer = new Array();
                                this.root = org.kevoree.modeling.api.time.rbtree.LongTreeNode.unserialize(ctx);
                                this.dirty = false;
                            };
                            LongRBTree.prototype.previousOrEqual = function (key) {
                                var p = this.root;
                                if (p == null) {
                                    return null;
                                }
                                while (p != null) {
                                    if (key == p.key) {
                                        return p;
                                    }
                                    if (key > p.key) {
                                        if (p.getRight() != null) {
                                            p = p.getRight();
                                        }
                                        else {
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
                                            return parent;
                                        }
                                    }
                                }
                                return null;
                            };
                            LongRBTree.prototype.nextOrEqual = function (key) {
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
                            LongRBTree.prototype.previous = function (key) {
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
                            LongRBTree.prototype.previousWhileNot = function (key, until) {
                                var elm = this.previousOrEqual(key);
                                if (elm.value == until) {
                                    return null;
                                }
                                else {
                                    if (elm.key == key) {
                                        elm = elm.previous();
                                    }
                                }
                                if (elm == null || elm.value == until) {
                                    return null;
                                }
                                else {
                                    return elm;
                                }
                            };
                            LongRBTree.prototype.next = function (key) {
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
                            LongRBTree.prototype.nextWhileNot = function (key, until) {
                                var elm = this.nextOrEqual(key);
                                if (elm.value == until) {
                                    return null;
                                }
                                else {
                                    if (elm.key == key) {
                                        elm = elm.next();
                                    }
                                }
                                if (elm == null || elm.value == until) {
                                    return null;
                                }
                                else {
                                    return elm;
                                }
                            };
                            LongRBTree.prototype.first = function () {
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
                            LongRBTree.prototype.last = function () {
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
                            LongRBTree.prototype.firstWhileNot = function (key, until) {
                                var elm = this.previousOrEqual(key);
                                if (elm == null) {
                                    return null;
                                }
                                else {
                                    if (elm.value == until) {
                                        return null;
                                    }
                                }
                                var prev = null;
                                do {
                                    prev = elm.previous();
                                    if (prev == null || prev.value == until) {
                                        return elm;
                                    }
                                    else {
                                        elm = prev;
                                    }
                                } while (elm != null);
                                return prev;
                            };
                            LongRBTree.prototype.lastWhileNot = function (key, until) {
                                var elm = this.previousOrEqual(key);
                                if (elm == null) {
                                    return null;
                                }
                                else {
                                    if (elm.value == until) {
                                        return null;
                                    }
                                }
                                var next;
                                do {
                                    next = elm.next();
                                    if (next == null || next.value == until) {
                                        return elm;
                                    }
                                    else {
                                        elm = next;
                                    }
                                } while (elm != null);
                                return next;
                            };
                            LongRBTree.prototype.lookupNode = function (key) {
                                var n = this.root;
                                if (n == null) {
                                    return null;
                                }
                                while (n != null) {
                                    if (key == n.key) {
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
                                return n;
                            };
                            LongRBTree.prototype.lookup = function (key) {
                                var n = this.lookupNode(key);
                                if (n == null) {
                                    return null;
                                }
                                else {
                                    return n.value;
                                }
                            };
                            LongRBTree.prototype.rotateLeft = function (n) {
                                var r = n.getRight();
                                this.replaceNode(n, r);
                                n.setRight(r.getLeft());
                                if (r.getLeft() != null) {
                                    r.getLeft().setParent(n);
                                }
                                r.setLeft(n);
                                n.setParent(r);
                            };
                            LongRBTree.prototype.rotateRight = function (n) {
                                var l = n.getLeft();
                                this.replaceNode(n, l);
                                n.setLeft(l.getRight());
                                if (l.getRight() != null) {
                                    l.getRight().setParent(n);
                                }
                                l.setRight(n);
                                n.setParent(l);
                            };
                            LongRBTree.prototype.replaceNode = function (oldn, newn) {
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
                            LongRBTree.prototype.insert = function (key, value) {
                                this.dirty = true;
                                var insertedNode = new org.kevoree.modeling.api.time.rbtree.LongTreeNode(key, value, org.kevoree.modeling.api.time.rbtree.Color.RED, null, null);
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
                            LongRBTree.prototype.insertCase1 = function (n) {
                                if (n.getParent() == null) {
                                    n.color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                }
                                else {
                                    this.insertCase2(n);
                                }
                            };
                            LongRBTree.prototype.insertCase2 = function (n) {
                                if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    return;
                                }
                                else {
                                    this.insertCase3(n);
                                }
                            };
                            LongRBTree.prototype.insertCase3 = function (n) {
                                if (this.nodeColor(n.uncle()) == org.kevoree.modeling.api.time.rbtree.Color.RED) {
                                    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    n.uncle().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    n.grandparent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    this.insertCase1(n.grandparent());
                                }
                                else {
                                    this.insertCase4(n);
                                }
                            };
                            LongRBTree.prototype.insertCase4 = function (n_n) {
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
                            LongRBTree.prototype.insertCase5 = function (n) {
                                n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                n.grandparent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getLeft()) {
                                    this.rotateRight(n.grandparent());
                                }
                                else {
                                    this.rotateLeft(n.grandparent());
                                }
                            };
                            LongRBTree.prototype.delete = function (key) {
                                var n = this.lookupNode(key);
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
                                    if (this.nodeColor(n) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                        n.color = this.nodeColor(child);
                                        this.deleteCase1(n);
                                    }
                                    this.replaceNode(n, child);
                                }
                            };
                            LongRBTree.prototype.deleteCase1 = function (n) {
                                if (n.getParent() == null) {
                                    return;
                                }
                                else {
                                    this.deleteCase2(n);
                                }
                            };
                            LongRBTree.prototype.deleteCase2 = function (n) {
                                if (this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.RED) {
                                    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    if (n == n.getParent().getLeft()) {
                                        this.rotateLeft(n.getParent());
                                    }
                                    else {
                                        this.rotateRight(n.getParent());
                                    }
                                }
                                this.deleteCase3(n);
                            };
                            LongRBTree.prototype.deleteCase3 = function (n) {
                                if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    this.deleteCase1(n.getParent());
                                }
                                else {
                                    this.deleteCase4(n);
                                }
                            };
                            LongRBTree.prototype.deleteCase4 = function (n) {
                                if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                }
                                else {
                                    this.deleteCase5(n);
                                }
                            };
                            LongRBTree.prototype.deleteCase5 = function (n) {
                                if (n == n.getParent().getLeft() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    n.sibling().getLeft().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    this.rotateRight(n.sibling());
                                }
                                else {
                                    if (n == n.getParent().getRight() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                        n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                        n.sibling().getRight().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                        this.rotateLeft(n.sibling());
                                    }
                                }
                                this.deleteCase6(n);
                            };
                            LongRBTree.prototype.deleteCase6 = function (n) {
                                n.sibling().color = this.nodeColor(n.getParent());
                                n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                if (n == n.getParent().getLeft()) {
                                    n.sibling().getRight().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    this.rotateLeft(n.getParent());
                                }
                                else {
                                    n.sibling().getLeft().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    this.rotateRight(n.getParent());
                                }
                            };
                            LongRBTree.prototype.nodeColor = function (n) {
                                if (n == null) {
                                    return org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                }
                                else {
                                    return n.color;
                                }
                            };
                            return LongRBTree;
                        })();
                        rbtree.LongRBTree = LongRBTree;
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
                                if (this.color == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
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
                                return org.kevoree.modeling.api.time.rbtree.LongTreeNode.internal_unserialize(true, ctx);
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
                                var color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                if (ch == LongTreeNode.RED) {
                                    color = org.kevoree.modeling.api.time.rbtree.Color.RED;
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
                                var p = new org.kevoree.modeling.api.time.rbtree.LongTreeNode(key, value, color, null, null);
                                var left = org.kevoree.modeling.api.time.rbtree.LongTreeNode.internal_unserialize(false, ctx);
                                if (left != null) {
                                    left.setParent(p);
                                }
                                var right = org.kevoree.modeling.api.time.rbtree.LongTreeNode.internal_unserialize(true, ctx);
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
                        rbtree.LongTreeNode = LongTreeNode;
                        var RBTree = (function () {
                            function RBTree() {
                                this.root = null;
                                this._size = 0;
                            }
                            RBTree.prototype.size = function () {
                                return this._size;
                            };
                            RBTree.prototype.serialize = function () {
                                var builder = new java.lang.StringBuilder();
                                builder.append(this._size);
                                if (this.root != null) {
                                    this.root.serialize(builder);
                                }
                                return builder.toString();
                            };
                            RBTree.prototype.unserialize = function (payload) {
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
                                var ctx = new org.kevoree.modeling.api.time.rbtree.TreeReaderContext();
                                ctx.index = i;
                                ctx.payload = payload;
                                this.root = org.kevoree.modeling.api.time.rbtree.TreeNode.unserialize(ctx);
                            };
                            RBTree.prototype.previousOrEqual = function (key) {
                                var p = this.root;
                                if (p == null) {
                                    return null;
                                }
                                while (p != null) {
                                    if (key == p.key) {
                                        return p;
                                    }
                                    if (key > p.key) {
                                        if (p.getRight() != null) {
                                            p = p.getRight();
                                        }
                                        else {
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
                                            return parent;
                                        }
                                    }
                                }
                                return null;
                            };
                            RBTree.prototype.nextOrEqual = function (key) {
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
                            RBTree.prototype.previous = function (key) {
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
                            RBTree.prototype.previousWhileNot = function (key, until) {
                                var elm = this.previousOrEqual(key);
                                if (elm.value.equals(until)) {
                                    return null;
                                }
                                else {
                                    if (elm.key == key) {
                                        elm = elm.previous();
                                    }
                                }
                                if (elm == null || elm.value.equals(until)) {
                                    return null;
                                }
                                else {
                                    return elm;
                                }
                            };
                            RBTree.prototype.next = function (key) {
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
                            RBTree.prototype.nextWhileNot = function (key, until) {
                                var elm = this.nextOrEqual(key);
                                if (elm.value.equals(until)) {
                                    return null;
                                }
                                else {
                                    if (elm.key == key) {
                                        elm = elm.next();
                                    }
                                }
                                if (elm == null || elm.value.equals(until)) {
                                    return null;
                                }
                                else {
                                    return elm;
                                }
                            };
                            RBTree.prototype.first = function () {
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
                            RBTree.prototype.last = function () {
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
                            RBTree.prototype.firstWhileNot = function (key, until) {
                                var elm = this.previousOrEqual(key);
                                if (elm == null) {
                                    return null;
                                }
                                else {
                                    if (elm.value.equals(until)) {
                                        return null;
                                    }
                                }
                                var prev = null;
                                do {
                                    prev = elm.previous();
                                    if (prev == null || prev.value.equals(until)) {
                                        return elm;
                                    }
                                    else {
                                        elm = prev;
                                    }
                                } while (elm != null);
                                return prev;
                            };
                            RBTree.prototype.lastWhileNot = function (key, until) {
                                var elm = this.previousOrEqual(key);
                                if (elm == null) {
                                    return null;
                                }
                                else {
                                    if (elm.value.equals(until)) {
                                        return null;
                                    }
                                }
                                var next;
                                do {
                                    next = elm.next();
                                    if (next == null || next.value.equals(until)) {
                                        return elm;
                                    }
                                    else {
                                        elm = next;
                                    }
                                } while (elm != null);
                                return next;
                            };
                            RBTree.prototype.lookupNode = function (key) {
                                var n = this.root;
                                if (n == null) {
                                    return null;
                                }
                                while (n != null) {
                                    if (key == n.key) {
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
                                return n;
                            };
                            RBTree.prototype.lookup = function (key) {
                                var n = this.lookupNode(key);
                                if (n == null) {
                                    return null;
                                }
                                else {
                                    return n.value;
                                }
                            };
                            RBTree.prototype.rotateLeft = function (n) {
                                var r = n.getRight();
                                this.replaceNode(n, r);
                                n.setRight(r.getLeft());
                                if (r.getLeft() != null) {
                                    r.getLeft().setParent(n);
                                }
                                r.setLeft(n);
                                n.setParent(r);
                            };
                            RBTree.prototype.rotateRight = function (n) {
                                var l = n.getLeft();
                                this.replaceNode(n, l);
                                n.setLeft(l.getRight());
                                if (l.getRight() != null) {
                                    l.getRight().setParent(n);
                                }
                                l.setRight(n);
                                n.setParent(l);
                            };
                            RBTree.prototype.replaceNode = function (oldn, newn) {
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
                            RBTree.prototype.insert = function (key, value) {
                                var insertedNode = new org.kevoree.modeling.api.time.rbtree.TreeNode(key, value, org.kevoree.modeling.api.time.rbtree.Color.RED, null, null);
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
                            RBTree.prototype.insertCase1 = function (n) {
                                if (n.getParent() == null) {
                                    n.color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                }
                                else {
                                    this.insertCase2(n);
                                }
                            };
                            RBTree.prototype.insertCase2 = function (n) {
                                if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    return;
                                }
                                else {
                                    this.insertCase3(n);
                                }
                            };
                            RBTree.prototype.insertCase3 = function (n) {
                                if (this.nodeColor(n.uncle()) == org.kevoree.modeling.api.time.rbtree.Color.RED) {
                                    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    n.uncle().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    n.grandparent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    this.insertCase1(n.grandparent());
                                }
                                else {
                                    this.insertCase4(n);
                                }
                            };
                            RBTree.prototype.insertCase4 = function (n_n) {
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
                            RBTree.prototype.insertCase5 = function (n) {
                                n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                n.grandparent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getLeft()) {
                                    this.rotateRight(n.grandparent());
                                }
                                else {
                                    this.rotateLeft(n.grandparent());
                                }
                            };
                            RBTree.prototype.delete = function (key) {
                                var n = this.lookupNode(key);
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
                                    if (this.nodeColor(n) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                        n.color = this.nodeColor(child);
                                        this.deleteCase1(n);
                                    }
                                    this.replaceNode(n, child);
                                }
                            };
                            RBTree.prototype.deleteCase1 = function (n) {
                                if (n.getParent() == null) {
                                    return;
                                }
                                else {
                                    this.deleteCase2(n);
                                }
                            };
                            RBTree.prototype.deleteCase2 = function (n) {
                                if (this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.RED) {
                                    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    if (n == n.getParent().getLeft()) {
                                        this.rotateLeft(n.getParent());
                                    }
                                    else {
                                        this.rotateRight(n.getParent());
                                    }
                                }
                                this.deleteCase3(n);
                            };
                            RBTree.prototype.deleteCase3 = function (n) {
                                if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    this.deleteCase1(n.getParent());
                                }
                                else {
                                    this.deleteCase4(n);
                                }
                            };
                            RBTree.prototype.deleteCase4 = function (n) {
                                if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                }
                                else {
                                    this.deleteCase5(n);
                                }
                            };
                            RBTree.prototype.deleteCase5 = function (n) {
                                if (n == n.getParent().getLeft() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    n.sibling().getLeft().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    this.rotateRight(n.sibling());
                                }
                                else {
                                    if (n == n.getParent().getRight() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                        n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                        n.sibling().getRight().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                        this.rotateLeft(n.sibling());
                                    }
                                }
                                this.deleteCase6(n);
                            };
                            RBTree.prototype.deleteCase6 = function (n) {
                                n.sibling().color = this.nodeColor(n.getParent());
                                n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                if (n == n.getParent().getLeft()) {
                                    n.sibling().getRight().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    this.rotateLeft(n.getParent());
                                }
                                else {
                                    n.sibling().getLeft().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    this.rotateRight(n.getParent());
                                }
                            };
                            RBTree.prototype.nodeColor = function (n) {
                                if (n == null) {
                                    return org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                }
                                else {
                                    return n.color;
                                }
                            };
                            return RBTree;
                        })();
                        rbtree.RBTree = RBTree;
                        var State = (function () {
                            function State() {
                            }
                            State.prototype.equals = function (other) {
                                return this == other;
                            };
                            State.values = function () {
                                return State._StateVALUES;
                            };
                            State.EXISTS = new State();
                            State.DELETED = new State();
                            State._StateVALUES = [
                                State.EXISTS,
                                State.DELETED
                            ];
                            return State;
                        })();
                        rbtree.State = State;
                        var TreeNode = (function () {
                            function TreeNode(key, value, color, left, right) {
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
                                if (this.value == org.kevoree.modeling.api.time.rbtree.State.DELETED) {
                                    if (this.color == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                        builder.append(TreeNode.BLACK_DELETE);
                                    }
                                    else {
                                        builder.append(TreeNode.RED_DELETE);
                                    }
                                }
                                else {
                                    if (this.color == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                        builder.append(TreeNode.BLACK_EXISTS);
                                    }
                                    else {
                                        builder.append(TreeNode.RED_EXISTS);
                                    }
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
                                return org.kevoree.modeling.api.time.rbtree.TreeNode.internal_unserialize(true, ctx);
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
                                var color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                var state = org.kevoree.modeling.api.time.rbtree.State.EXISTS;
                                switch (ch) {
                                    case org.kevoree.modeling.api.time.rbtree.TreeNode.BLACK_DELETE:
                                        color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                        state = org.kevoree.modeling.api.time.rbtree.State.DELETED;
                                        break;
                                    case org.kevoree.modeling.api.time.rbtree.TreeNode.BLACK_EXISTS:
                                        color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                        state = org.kevoree.modeling.api.time.rbtree.State.EXISTS;
                                        break;
                                    case org.kevoree.modeling.api.time.rbtree.TreeNode.RED_DELETE:
                                        color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                        state = org.kevoree.modeling.api.time.rbtree.State.DELETED;
                                        break;
                                    case org.kevoree.modeling.api.time.rbtree.TreeNode.RED_EXISTS:
                                        color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                        state = org.kevoree.modeling.api.time.rbtree.State.EXISTS;
                                        break;
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
                                var p = new org.kevoree.modeling.api.time.rbtree.TreeNode(java.lang.Long.parseLong(tokenBuild.toString()), state, color, null, null);
                                var left = org.kevoree.modeling.api.time.rbtree.TreeNode.internal_unserialize(false, ctx);
                                if (left != null) {
                                    left.setParent(p);
                                }
                                var right = org.kevoree.modeling.api.time.rbtree.TreeNode.internal_unserialize(true, ctx);
                                if (right != null) {
                                    right.setParent(p);
                                }
                                p.setLeft(left);
                                p.setRight(right);
                                return p;
                            };
                            TreeNode.BLACK_DELETE = '0';
                            TreeNode.BLACK_EXISTS = '1';
                            TreeNode.RED_DELETE = '2';
                            TreeNode.RED_EXISTS = '3';
                            return TreeNode;
                        })();
                        rbtree.TreeNode = TreeNode;
                        var TreeReaderContext = (function () {
                            function TreeReaderContext() {
                            }
                            return TreeReaderContext;
                        })();
                        rbtree.TreeReaderContext = TreeReaderContext;
                    })(rbtree = _time.rbtree || (_time.rbtree = {}));
                })(time = api.time || (api.time = {}));
                var trace;
                (function (_trace) {
                    var ModelAddTrace = (function () {
                        function ModelAddTrace(p_srcUUID, p_reference, p_paramUUID) {
                            this._srcUUID = p_srcUUID;
                            this._reference = p_reference;
                            this._paramUUID = p_paramUUID;
                        }
                        ModelAddTrace.prototype.toString = function () {
                            var buffer = new java.lang.StringBuilder();
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.openJSON);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.traceType);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.KActionType.ADD.toString());
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.src);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this._srcUUID + "");
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            if (this._reference != null) {
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.meta);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(this._reference.origin().metaName());
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.sep);
                                buffer.append(this._reference.metaName());
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            }
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.previouspath);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this._paramUUID + "");
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.closeJSON);
                            return buffer.toString();
                        };
                        ModelAddTrace.prototype.meta = function () {
                            return this._reference;
                        };
                        ModelAddTrace.prototype.traceType = function () {
                            return org.kevoree.modeling.api.KActionType.ADD;
                        };
                        ModelAddTrace.prototype.sourceUUID = function () {
                            return null;
                        };
                        ModelAddTrace.prototype.paramUUID = function () {
                            return this._paramUUID;
                        };
                        return ModelAddTrace;
                    })();
                    _trace.ModelAddTrace = ModelAddTrace;
                    var ModelNewTrace = (function () {
                        function ModelNewTrace(p_srcUUID, p_metaClass) {
                            this._srcUUID = p_srcUUID;
                            this._metaClass = p_metaClass;
                        }
                        ModelNewTrace.prototype.meta = function () {
                            return this._metaClass;
                        };
                        ModelNewTrace.prototype.traceType = function () {
                            return org.kevoree.modeling.api.KActionType.NEW;
                        };
                        ModelNewTrace.prototype.sourceUUID = function () {
                            return this._srcUUID;
                        };
                        return ModelNewTrace;
                    })();
                    _trace.ModelNewTrace = ModelNewTrace;
                    var ModelRemoveTrace = (function () {
                        function ModelRemoveTrace(p_srcUUID, p_reference, p_paramUUID) {
                            this._srcUUID = p_srcUUID;
                            this._reference = p_reference;
                            this._paramUUID = p_paramUUID;
                        }
                        ModelRemoveTrace.prototype.toString = function () {
                            var buffer = new java.lang.StringBuilder();
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.openJSON);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.traceType);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.KActionType.REMOVE);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.src);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this._srcUUID + "");
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.meta);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(this._reference.metaName());
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.objpath);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this._paramUUID + "");
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.closeJSON);
                            return buffer.toString();
                        };
                        ModelRemoveTrace.prototype.meta = function () {
                            return this._reference;
                        };
                        ModelRemoveTrace.prototype.traceType = function () {
                            return org.kevoree.modeling.api.KActionType.REMOVE;
                        };
                        ModelRemoveTrace.prototype.sourceUUID = function () {
                            return this._srcUUID;
                        };
                        ModelRemoveTrace.prototype.paramUUID = function () {
                            return this._paramUUID;
                        };
                        return ModelRemoveTrace;
                    })();
                    _trace.ModelRemoveTrace = ModelRemoveTrace;
                    var ModelSetTrace = (function () {
                        function ModelSetTrace(p_srcUUID, p_attribute, p_content) {
                            this._srcUUID = p_srcUUID;
                            this._attribute = p_attribute;
                            this._content = p_content;
                        }
                        ModelSetTrace.prototype.toString = function () {
                            var buffer = new java.lang.StringBuilder();
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.openJSON);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.traceType);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.KActionType.SET);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.src);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this._srcUUID + "");
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.meta);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(this._attribute.metaName());
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            if (this._content != null) {
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.content);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this._content.toString());
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            }
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.closeJSON);
                            return buffer.toString();
                        };
                        ModelSetTrace.prototype.meta = function () {
                            return this._attribute;
                        };
                        ModelSetTrace.prototype.traceType = function () {
                            return org.kevoree.modeling.api.KActionType.SET;
                        };
                        ModelSetTrace.prototype.sourceUUID = function () {
                            return this._srcUUID;
                        };
                        ModelSetTrace.prototype.content = function () {
                            return this._content;
                        };
                        return ModelSetTrace;
                    })();
                    _trace.ModelSetTrace = ModelSetTrace;
                    var ModelTraceApplicator = (function () {
                        function ModelTraceApplicator(p_targetModel) {
                            this._targetModel = p_targetModel;
                        }
                        ModelTraceApplicator.prototype.applyTraceSequence = function (traceSeq, callback) {
                            var _this = this;
                            try {
                                var traces = traceSeq.traces();
                                var dependencies = new java.util.HashSet();
                                for (var i = 0; i < traces.length; i++) {
                                    if (traces[i] instanceof org.kevoree.modeling.api.trace.ModelAddTrace) {
                                        dependencies.add(traces[i].paramUUID());
                                        dependencies.add(traces[i].sourceUUID());
                                    }
                                    if (traces[i] instanceof org.kevoree.modeling.api.trace.ModelRemoveTrace) {
                                        dependencies.add(traces[i].paramUUID());
                                        dependencies.add(traces[i].sourceUUID());
                                    }
                                    if (traces[i] instanceof org.kevoree.modeling.api.trace.ModelSetTrace) {
                                        if (traces[i].meta() instanceof org.kevoree.modeling.api.abs.AbstractMetaAttribute) {
                                            dependencies.add(traces[i].sourceUUID());
                                        }
                                        else {
                                            try {
                                                var paramUUID = java.lang.Long.parseLong(traces[i].content().toString());
                                                dependencies.add(paramUUID);
                                                dependencies.add(traces[i].sourceUUID());
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
                                var dependenciesArray = dependencies.toArray(new Array());
                                this._targetModel.view().lookupAll(dependenciesArray, function (kObjects) {
                                    var cached = new java.util.HashMap();
                                    for (var i = 0; i < traces.length; i++) {
                                        try {
                                            var trace = traces[i];
                                            var sourceObject = cached.get(trace.sourceUUID());
                                            if (sourceObject != null) {
                                                if (trace instanceof org.kevoree.modeling.api.trace.ModelRemoveTrace) {
                                                    var removeTrace = trace;
                                                    var param = cached.get(removeTrace.paramUUID());
                                                    if (param != null) {
                                                        sourceObject.mutate(org.kevoree.modeling.api.KActionType.REMOVE, removeTrace.meta(), param);
                                                    }
                                                }
                                                else {
                                                    if (trace instanceof org.kevoree.modeling.api.trace.ModelAddTrace) {
                                                        var addTrace = trace;
                                                        var param = cached.get(addTrace.paramUUID());
                                                        if (param != null) {
                                                            sourceObject.mutate(org.kevoree.modeling.api.KActionType.ADD, addTrace.meta(), param);
                                                        }
                                                    }
                                                    else {
                                                        if (trace instanceof org.kevoree.modeling.api.trace.ModelSetTrace) {
                                                            var setTrace = trace;
                                                            if (trace.meta() instanceof org.kevoree.modeling.api.abs.AbstractMetaAttribute) {
                                                                sourceObject.set(trace.meta(), setTrace.content());
                                                            }
                                                            else {
                                                                try {
                                                                    var paramUUID = java.lang.Long.parseLong(traces[i].content().toString());
                                                                    var param = cached.get(paramUUID);
                                                                    if (param != null) {
                                                                        sourceObject.mutate(org.kevoree.modeling.api.KActionType.SET, trace.meta(), param);
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
                                                        else {
                                                            if (trace instanceof org.kevoree.modeling.api.trace.ModelNewTrace) {
                                                                var tree = new org.kevoree.modeling.api.time.DefaultTimeTree();
                                                                tree.insert(_this._targetModel.now());
                                                                var newCreated = _this._targetModel.view().createProxy(trace.meta(), tree, trace.sourceUUID());
                                                                cached.put(newCreated.uuid(), newCreated);
                                                            }
                                                            else {
                                                                System.err.println("Unknow traceType: " + trace);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                System.err.println("Unknow object: " + trace);
                                            }
                                        }
                                        catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e = $ex$;
                                                e.printStackTrace();
                                                System.err.println("Error " + e);
                                            }
                                        }
                                    }
                                    callback(null);
                                });
                            }
                            catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e = $ex$;
                                    callback(e);
                                }
                            }
                        };
                        return ModelTraceApplicator;
                    })();
                    _trace.ModelTraceApplicator = ModelTraceApplicator;
                    var ModelTraceConstants = (function () {
                        function ModelTraceConstants(p_code) {
                            this._code = "";
                            this._code = p_code;
                        }
                        ModelTraceConstants.prototype.toString = function () {
                            return this._code;
                        };
                        ModelTraceConstants.prototype.equals = function (other) {
                            return this == other;
                        };
                        ModelTraceConstants.values = function () {
                            return ModelTraceConstants._ModelTraceConstantsVALUES;
                        };
                        ModelTraceConstants.traceType = new ModelTraceConstants("type");
                        ModelTraceConstants.src = new ModelTraceConstants("src");
                        ModelTraceConstants.meta = new ModelTraceConstants("meta");
                        ModelTraceConstants.previouspath = new ModelTraceConstants("prev");
                        ModelTraceConstants.typename = new ModelTraceConstants("class");
                        ModelTraceConstants.objpath = new ModelTraceConstants("orig");
                        ModelTraceConstants.content = new ModelTraceConstants("val");
                        ModelTraceConstants.openJSON = new ModelTraceConstants("{");
                        ModelTraceConstants.closeJSON = new ModelTraceConstants("}");
                        ModelTraceConstants.bb = new ModelTraceConstants("\"");
                        ModelTraceConstants.sep = new ModelTraceConstants("@");
                        ModelTraceConstants.coma = new ModelTraceConstants(",");
                        ModelTraceConstants.dp = new ModelTraceConstants(":");
                        ModelTraceConstants._ModelTraceConstantsVALUES = [
                            ModelTraceConstants.traceType,
                            ModelTraceConstants.src,
                            ModelTraceConstants.meta,
                            ModelTraceConstants.previouspath,
                            ModelTraceConstants.typename,
                            ModelTraceConstants.objpath,
                            ModelTraceConstants.content,
                            ModelTraceConstants.openJSON,
                            ModelTraceConstants.closeJSON,
                            ModelTraceConstants.bb,
                            ModelTraceConstants.sep,
                            ModelTraceConstants.coma,
                            ModelTraceConstants.dp
                        ];
                        return ModelTraceConstants;
                    })();
                    _trace.ModelTraceConstants = ModelTraceConstants;
                    var TraceSequence = (function () {
                        function TraceSequence() {
                            this._traces = new java.util.ArrayList();
                        }
                        TraceSequence.prototype.traces = function () {
                            return this._traces.toArray(new Array());
                        };
                        TraceSequence.prototype.populate = function (addtraces) {
                            this._traces.addAll(addtraces);
                            return this;
                        };
                        TraceSequence.prototype.append = function (seq) {
                            this._traces.addAll(seq._traces);
                            return this;
                        };
                        TraceSequence.prototype.toString = function () {
                            var buffer = new java.lang.StringBuilder();
                            buffer.append("[");
                            var isFirst = true;
                            for (var i = 0; i < this._traces.size(); i++) {
                                var trace = this._traces.get(i);
                                if (!isFirst) {
                                    buffer.append(",\n");
                                }
                                buffer.append(trace);
                                isFirst = false;
                            }
                            buffer.append("]");
                            return buffer.toString();
                        };
                        TraceSequence.prototype.applyOn = function (target, callback) {
                            var traceApplicator = new org.kevoree.modeling.api.trace.ModelTraceApplicator(target);
                            traceApplicator.applyTraceSequence(this, callback);
                            return true;
                        };
                        TraceSequence.prototype.reverse = function () {
                            java.util.Collections.reverse(this._traces);
                            return this;
                        };
                        TraceSequence.prototype.size = function () {
                            return this._traces.size();
                        };
                        return TraceSequence;
                    })();
                    _trace.TraceSequence = TraceSequence;
                })(trace = api.trace || (api.trace = {}));
                var traversal;
                (function (traversal) {
                    var DefaultKTraversal = (function () {
                        function DefaultKTraversal(p_root, p_initAction) {
                            this._terminated = false;
                            this._initAction = p_initAction;
                            this._initObjs = new Array();
                            this._initObjs[0] = p_root;
                            this._lastAction = this._initAction;
                        }
                        DefaultKTraversal.prototype.traverse = function (p_metaReference) {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
                            }
                            var tempAction = new org.kevoree.modeling.api.traversal.actions.KTraverseAction(p_metaReference);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        };
                        DefaultKTraversal.prototype.traverseQuery = function (p_metaReferenceQuery) {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
                            }
                            var tempAction = new org.kevoree.modeling.api.traversal.actions.KTraverseQueryAction(p_metaReferenceQuery);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        };
                        DefaultKTraversal.prototype.withAttribute = function (p_attribute, p_expectedValue) {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
                            }
                            var tempAction = new org.kevoree.modeling.api.traversal.actions.KFilterAttributeAction(p_attribute, p_expectedValue);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        };
                        DefaultKTraversal.prototype.withoutAttribute = function (p_attribute, p_expectedValue) {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
                            }
                            var tempAction = new org.kevoree.modeling.api.traversal.actions.KFilterNotAttributeAction(p_attribute, p_expectedValue);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        };
                        DefaultKTraversal.prototype.attributeQuery = function (p_attributeQuery) {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
                            }
                            var tempAction = new org.kevoree.modeling.api.traversal.actions.KFilterAttributeQueryAction(p_attributeQuery);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        };
                        DefaultKTraversal.prototype.filter = function (p_filter) {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
                            }
                            var tempAction = new org.kevoree.modeling.api.traversal.actions.KFilterAction(p_filter);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        };
                        DefaultKTraversal.prototype.reverse = function (p_metaReference) {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
                            }
                            var tempAction = new org.kevoree.modeling.api.traversal.actions.KReverseAction(p_metaReference);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        };
                        DefaultKTraversal.prototype.reverseQuery = function (p_metaReferenceQuery) {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
                            }
                            var tempAction = new org.kevoree.modeling.api.traversal.actions.KReverseQueryAction(p_metaReferenceQuery);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        };
                        DefaultKTraversal.prototype.parents = function () {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
                            }
                            var tempAction = new org.kevoree.modeling.api.traversal.actions.KParentsAction();
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        };
                        DefaultKTraversal.prototype.then = function (callback) {
                            this._terminated = true;
                            this._lastAction.chain(new org.kevoree.modeling.api.traversal.actions.KFinalAction(callback));
                            this._initAction.execute(this._initObjs);
                        };
                        DefaultKTraversal.prototype.map = function (attribute, callback) {
                            this._terminated = true;
                            this._lastAction.chain(new org.kevoree.modeling.api.traversal.actions.KMapAction(attribute, callback));
                            this._initAction.execute(this._initObjs);
                        };
                        DefaultKTraversal.prototype.taskThen = function () {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.then(task.initCallback());
                            return task;
                        };
                        DefaultKTraversal.prototype.taskMap = function (attribute) {
                            var task = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper();
                            this.map(attribute, task.initCallback());
                            return task;
                        };
                        return DefaultKTraversal;
                    })();
                    traversal.DefaultKTraversal = DefaultKTraversal;
                    var actions;
                    (function (actions) {
                        var KFilterAction = (function () {
                            function KFilterAction(p_filter) {
                                this._filter = p_filter;
                            }
                            KFilterAction.prototype.chain = function (p_next) {
                                this._next = p_next;
                            };
                            KFilterAction.prototype.execute = function (p_inputs) {
                                var nextStep = new java.util.HashSet();
                                for (var i = 0; i < p_inputs.length; i++) {
                                    try {
                                        if (this._filter(p_inputs[i])) {
                                            nextStep.add(p_inputs[i]);
                                        }
                                    }
                                    catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e = $ex$;
                                            e.printStackTrace();
                                        }
                                    }
                                }
                                this._next.execute(nextStep.toArray(new Array()));
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
                                    var currentView = p_inputs[0].view();
                                    var nextStep = new java.util.HashSet();
                                    for (var i = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj = p_inputs[i];
                                            var raw = currentView.universe().model().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
                                            if (raw != null) {
                                                if (this._attribute == null) {
                                                    if (this._expectedValue == null) {
                                                        nextStep.add(loopObj);
                                                    }
                                                    else {
                                                        var addToNext = false;
                                                        for (var j = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                                            var ref = loopObj.metaClass().metaAttributes()[j];
                                                            var resolved = raw[ref.index()];
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
                                                            nextStep.add(loopObj);
                                                        }
                                                    }
                                                }
                                                else {
                                                    var translatedAtt = loopObj.internal_transpose_att(this._attribute);
                                                    if (translatedAtt != null) {
                                                        var resolved = raw[translatedAtt.index()];
                                                        if (this._expectedValue == null) {
                                                            if (resolved == null) {
                                                                nextStep.add(loopObj);
                                                            }
                                                        }
                                                        else {
                                                            if (resolved == null) {
                                                                if (this._expectedValue.toString().equals("*")) {
                                                                    nextStep.add(loopObj);
                                                                }
                                                            }
                                                            else {
                                                                if (resolved.equals(this._expectedValue)) {
                                                                    nextStep.add(loopObj);
                                                                }
                                                                else {
                                                                    if (resolved.toString().matches(this._expectedValue.toString().replace("*", ".*"))) {
                                                                        nextStep.add(loopObj);
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
                                    this._next.execute(nextStep.toArray(new Array()));
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
                                    var currentView = p_inputs[0].view();
                                    var nextStep = new java.util.HashSet();
                                    for (var i = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj = p_inputs[i];
                                            var raw = currentView.universe().model().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
                                            if (raw != null) {
                                                if (this._attributeQuery == null) {
                                                    nextStep.add(loopObj);
                                                }
                                                else {
                                                    var params = this.buildParams(this._attributeQuery);
                                                    var selectedForNext = true;
                                                    var paramKeys = params.keySet().toArray(new Array());
                                                    for (var h = 0; h < paramKeys.length; h++) {
                                                        var param = params.get(paramKeys[h]);
                                                        for (var j = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                                            var metaAttribute = loopObj.metaClass().metaAttributes()[j];
                                                            if (metaAttribute.metaName().matches(param.name())) {
                                                                var o_raw = loopObj.get(metaAttribute);
                                                                if (o_raw != null) {
                                                                    if (param.value().equals("null")) {
                                                                        if (!param.isNegative()) {
                                                                            selectedForNext = false;
                                                                        }
                                                                    }
                                                                    else {
                                                                        if (o_raw.toString().matches(param.value())) {
                                                                            if (param.isNegative()) {
                                                                                selectedForNext = false;
                                                                            }
                                                                        }
                                                                        else {
                                                                            if (!param.isNegative()) {
                                                                                selectedForNext = false;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                else {
                                                                    if (param.value().equals("null") || param.value().equals("*")) {
                                                                        if (param.isNegative()) {
                                                                            selectedForNext = false;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (selectedForNext) {
                                                        nextStep.add(loopObj);
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
                                    this._next.execute(nextStep.toArray(new Array()));
                                }
                            };
                            KFilterAttributeQueryAction.prototype.buildParams = function (p_paramString) {
                                var params = new java.util.HashMap();
                                var iParam = 0;
                                var lastStart = iParam;
                                while (iParam < p_paramString.length) {
                                    if (p_paramString.charAt(iParam) == ',') {
                                        var p = p_paramString.substring(lastStart, iParam).trim();
                                        if (p.equals("") && !p.equals("*")) {
                                            if (p.endsWith("=")) {
                                                p = p + "*";
                                            }
                                            var pArray = p.split("=");
                                            var pObject;
                                            if (pArray.length > 1) {
                                                var paramKey = pArray[0].trim();
                                                var negative = paramKey.endsWith("!");
                                                pObject = new org.kevoree.modeling.api.traversal.selector.KQueryParam(paramKey.replace("!", "").replace("*", ".*"), pArray[1].trim().replace("*", ".*"), negative);
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
                                        pObject = new org.kevoree.modeling.api.traversal.selector.KQueryParam(paramKey.replace("!", "").replace("*", ".*"), pArray[1].trim().replace("*", ".*"), negative);
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
                                    var currentView = p_inputs[0].view();
                                    var nextStep = new java.util.HashSet();
                                    for (var i = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj = p_inputs[i];
                                            var raw = currentView.universe().model().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
                                            if (raw != null) {
                                                if (this._attribute == null) {
                                                    if (this._expectedValue == null) {
                                                        nextStep.add(loopObj);
                                                    }
                                                    else {
                                                        var addToNext = true;
                                                        for (var j = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                                            var ref = loopObj.metaClass().metaAttributes()[j];
                                                            var resolved = raw[ref.index()];
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
                                                            nextStep.add(loopObj);
                                                        }
                                                    }
                                                }
                                                else {
                                                    var translatedAtt = loopObj.internal_transpose_att(this._attribute);
                                                    if (translatedAtt != null) {
                                                        var resolved = raw[translatedAtt.index()];
                                                        if (this._expectedValue == null) {
                                                            if (resolved != null) {
                                                                nextStep.add(loopObj);
                                                            }
                                                        }
                                                        else {
                                                            if (resolved == null) {
                                                                if (!this._expectedValue.toString().equals("*")) {
                                                                    nextStep.add(loopObj);
                                                                }
                                                            }
                                                            else {
                                                                if (resolved.equals(this._expectedValue)) {
                                                                }
                                                                else {
                                                                    if (resolved.toString().matches(this._expectedValue.toString().replace("*", ".*"))) {
                                                                    }
                                                                    else {
                                                                        nextStep.add(loopObj);
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
                                    this._next.execute(nextStep.toArray(new Array()));
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
                                var collected = new java.util.ArrayList();
                                for (var i = 0; i < inputs.length; i++) {
                                    if (inputs[i] != null) {
                                        var resolved = inputs[i].get(this._attribute);
                                        if (resolved != null) {
                                            collected.add(resolved);
                                        }
                                    }
                                }
                                this._finalCallback(collected.toArray(new Array()));
                            };
                            return KMapAction;
                        })();
                        actions.KMapAction = KMapAction;
                        var KParentsAction = (function () {
                            function KParentsAction() {
                            }
                            KParentsAction.prototype.chain = function (p_next) {
                                this._next = p_next;
                            };
                            KParentsAction.prototype.execute = function (p_inputs) {
                                var _this = this;
                                if (p_inputs == null || p_inputs.length == 0) {
                                    this._next.execute(p_inputs);
                                    return;
                                }
                                else {
                                    var currentView = p_inputs[0].view();
                                    var nextIds = new java.util.HashSet();
                                    for (var i = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj = p_inputs[i];
                                            var raw = currentView.universe().model().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
                                            var resolved = raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX];
                                            if (resolved != null) {
                                                try {
                                                    nextIds.add(resolved);
                                                }
                                                catch ($ex$) {
                                                    if ($ex$ instanceof java.lang.Exception) {
                                                        var e = $ex$;
                                                        e.printStackTrace();
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
                                    currentView.lookupAll(nextIds.toArray(new Array()), function (kObjects) {
                                        _this._next.execute(kObjects);
                                    });
                                }
                            };
                            return KParentsAction;
                        })();
                        actions.KParentsAction = KParentsAction;
                        var KReverseAction = (function () {
                            function KReverseAction(p_reference) {
                                this._reference = p_reference;
                            }
                            KReverseAction.prototype.chain = function (p_next) {
                                this._next = p_next;
                            };
                            KReverseAction.prototype.execute = function (p_inputs) {
                                var _this = this;
                                if (p_inputs == null || p_inputs.length == 0) {
                                    this._next.execute(p_inputs);
                                    return;
                                }
                                else {
                                    var currentView = p_inputs[0].view();
                                    var nextIds = new java.util.HashSet();
                                    var toFilter = new java.util.HashMap();
                                    for (var i = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj = p_inputs[i];
                                            var raw = currentView.universe().model().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
                                            if (this._reference == null) {
                                                if (raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null && raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] instanceof java.util.Set) {
                                                    var casted = raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                                    var castedArr = casted.toArray(new Array());
                                                    for (var j = 0; j < castedArr.length; j++) {
                                                        nextIds.add(castedArr[j]);
                                                    }
                                                }
                                            }
                                            else {
                                                if (raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null && raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] instanceof java.util.Set) {
                                                    var casted = raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                                    var castedArr = casted.toArray(new Array());
                                                    for (var j = 0; j < castedArr.length; j++) {
                                                        toFilter.put(castedArr[j], p_inputs[i]);
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
                                    if (toFilter.keySet().size() == 0) {
                                        currentView.lookupAll(nextIds.toArray(new Array()), function (kObjects) {
                                            _this._next.execute(kObjects);
                                        });
                                    }
                                    else {
                                        var toFilterKeys = toFilter.keySet().toArray(new Array());
                                        currentView.lookupAll(toFilterKeys, function (kObjects) {
                                            for (var i = 0; i < toFilterKeys.length; i++) {
                                                if (kObjects[i] != null) {
                                                    var references = kObjects[i].referencesWith(toFilter.get(toFilterKeys[i]));
                                                    for (var h = 0; h < references.length; h++) {
                                                        if (references[h].metaName().equals(_this._reference.metaName())) {
                                                            nextIds.add(kObjects[i].uuid());
                                                        }
                                                    }
                                                }
                                            }
                                            currentView.lookupAll(nextIds.toArray(new Array()), function (kObjects) {
                                                _this._next.execute(kObjects);
                                            });
                                        });
                                    }
                                }
                            };
                            return KReverseAction;
                        })();
                        actions.KReverseAction = KReverseAction;
                        var KReverseQueryAction = (function () {
                            function KReverseQueryAction(p_referenceQuery) {
                                if (this._referenceQuery != null) {
                                    this._referenceQuery = p_referenceQuery.replace("*", ".*");
                                }
                            }
                            KReverseQueryAction.prototype.chain = function (p_next) {
                                this._next = p_next;
                            };
                            KReverseQueryAction.prototype.execute = function (p_inputs) {
                                var _this = this;
                                if (p_inputs == null || p_inputs.length == 0) {
                                    this._next.execute(p_inputs);
                                    return;
                                }
                                else {
                                    var currentView = p_inputs[0].view();
                                    var nextIds = new java.util.HashSet();
                                    var toFilter = new java.util.HashMap();
                                    for (var i = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj = p_inputs[i];
                                            var raw = currentView.universe().model().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
                                            if (this._referenceQuery == null) {
                                                if (raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null && raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] instanceof java.util.Set) {
                                                    var casted = raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                                    var castedArr = casted.toArray(new Array());
                                                    for (var j = 0; j < castedArr.length; j++) {
                                                        nextIds.add(castedArr[j]);
                                                    }
                                                }
                                            }
                                            else {
                                                if (raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null && raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] instanceof java.util.Set) {
                                                    var casted = raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                                    var castedArr = casted.toArray(new Array());
                                                    for (var j = 0; j < castedArr.length; j++) {
                                                        toFilter.put(castedArr[j], p_inputs[i]);
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
                                    if (toFilter.keySet().size() == 0) {
                                        currentView.lookupAll(nextIds.toArray(new Array()), function (kObjects) {
                                            _this._next.execute(kObjects);
                                        });
                                    }
                                    else {
                                        var toFilterKeys = toFilter.keySet().toArray(new Array());
                                        currentView.lookupAll(toFilterKeys, function (kObjects) {
                                            for (var i = 0; i < toFilterKeys.length; i++) {
                                                if (kObjects[i] != null) {
                                                    var references = kObjects[i].referencesWith(toFilter.get(toFilterKeys[i]));
                                                    for (var h = 0; h < references.length; h++) {
                                                        if (references[h].metaName().matches(_this._referenceQuery)) {
                                                            nextIds.add(kObjects[i].uuid());
                                                        }
                                                    }
                                                }
                                            }
                                            currentView.lookupAll(nextIds.toArray(new Array()), function (kObjects) {
                                                _this._next.execute(kObjects);
                                            });
                                        });
                                    }
                                }
                            };
                            return KReverseQueryAction;
                        })();
                        actions.KReverseQueryAction = KReverseQueryAction;
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
                                    var currentView = p_inputs[0].view();
                                    var nextIds = new java.util.HashSet();
                                    for (var i = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj = p_inputs[i];
                                            var raw = currentView.universe().model().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
                                            if (this._reference == null) {
                                                for (var j = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                                                    var ref = loopObj.metaClass().metaReferences()[j];
                                                    var resolved = raw[ref.index()];
                                                    if (resolved != null) {
                                                        if (resolved instanceof java.util.Set) {
                                                            var resolvedCasted = resolved;
                                                            var resolvedArr = resolvedCasted.toArray(new Array());
                                                            for (var k = 0; k < resolvedArr.length; k++) {
                                                                var idResolved = resolvedArr[k];
                                                                if (idResolved != null) {
                                                                    nextIds.add(idResolved);
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            try {
                                                                nextIds.add(resolved);
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
                                            else {
                                                var translatedRef = loopObj.internal_transpose_ref(this._reference);
                                                if (translatedRef != null) {
                                                    var resolved = raw[translatedRef.index()];
                                                    if (resolved != null) {
                                                        if (resolved instanceof java.util.Set) {
                                                            var resolvedCasted = resolved;
                                                            var resolvedArr = resolvedCasted.toArray(new Array());
                                                            for (var j = 0; j < resolvedArr.length; j++) {
                                                                var idResolved = resolvedArr[j];
                                                                if (idResolved != null) {
                                                                    nextIds.add(idResolved);
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            try {
                                                                nextIds.add(resolved);
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
                                        }
                                        catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e = $ex$;
                                                e.printStackTrace();
                                            }
                                        }
                                    }
                                    currentView.lookupAll(nextIds.toArray(new Array()), function (kObjects) {
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
                                    var currentView = p_inputs[0].view();
                                    var nextIds = new java.util.HashSet();
                                    for (var i = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj = p_inputs[i];
                                            var raw = currentView.universe().model().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
                                            if (this._referenceQuery == null) {
                                                for (var j = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                                                    var ref = loopObj.metaClass().metaReferences()[j];
                                                    var resolved = raw[ref.index()];
                                                    if (resolved != null) {
                                                        if (resolved instanceof java.util.Set) {
                                                            var resolvedCasted = resolved;
                                                            var resolvedArr = resolvedCasted.toArray(new Array());
                                                            for (var k = 0; k < resolvedArr.length; k++) {
                                                                var idResolved = resolvedArr[k];
                                                                if (idResolved != null) {
                                                                    nextIds.add(idResolved);
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            try {
                                                                nextIds.add(resolved);
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
                                                        if (ref.metaName().matches(queries[k])) {
                                                            selected = true;
                                                            break;
                                                        }
                                                    }
                                                    if (selected) {
                                                        var resolved = raw[ref.index()];
                                                        if (resolved != null) {
                                                            if (resolved instanceof java.util.Set) {
                                                                var resolvedCasted = resolved;
                                                                var resolvedArr = resolvedCasted.toArray(new Array());
                                                                for (var j = 0; j < resolvedArr.length; j++) {
                                                                    var idResolved = resolvedArr[j];
                                                                    if (idResolved != null) {
                                                                        nextIds.add(idResolved);
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                try {
                                                                    nextIds.add(resolved);
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
                                            }
                                        }
                                        catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e = $ex$;
                                                e.printStackTrace();
                                            }
                                        }
                                    }
                                    currentView.lookupAll(nextIds.toArray(new Array()), function (kObjects) {
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
                                                        var additionalQuery = new org.kevoree.modeling.api.traversal.selector.KQuery(relationName, atts);
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
                                var extracted = org.kevoree.modeling.api.traversal.selector.KQuery.buildChain(query);
                                for (var i = 0; i < extracted.size(); i++) {
                                    if (current == null) {
                                        if (extracted.get(i).relationName.equals("..")) {
                                            current = root.traverseInbounds("*");
                                        }
                                        else {
                                            if (extracted.get(i).relationName.startsWith("..")) {
                                                current = root.traverseInbounds(extracted.get(i).relationName.substring(2));
                                            }
                                            else {
                                                if (extracted.get(i).relationName.equals("@parent")) {
                                                    current = root.traverseParent();
                                                }
                                                else {
                                                    current = root.traverseQuery(extracted.get(i).relationName);
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if (extracted.get(i).relationName.equals("..")) {
                                            current = current.reverseQuery("*");
                                        }
                                        else {
                                            if (extracted.get(i).relationName.startsWith("..")) {
                                                current = current.reverseQuery(extracted.get(i).relationName.substring(2));
                                            }
                                            else {
                                                if (extracted.get(i).relationName.equals("@parent")) {
                                                    current = current.parents();
                                                }
                                                else {
                                                    current = current.traverseQuery(extracted.get(i).relationName);
                                                }
                                            }
                                        }
                                    }
                                    current = current.attributeQuery(extracted.get(i).params);
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
                })(traversal = api.traversal || (api.traversal = {}));
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
                        function DefaultOperationManager(store) {
                            this.staticOperations = new java.util.HashMap();
                            this.instanceOperations = new java.util.HashMap();
                            this.remoteCallCallbacks = new java.util.HashMap();
                            this._store = store;
                        }
                        DefaultOperationManager.prototype.registerOperation = function (operation, callback, target) {
                            if (target == null) {
                                var clazzOperations = this.staticOperations.get(operation.origin().index());
                                if (clazzOperations == null) {
                                    clazzOperations = new java.util.HashMap();
                                    this.staticOperations.put(operation.origin().index(), clazzOperations);
                                }
                                clazzOperations.put(operation.index(), callback);
                            }
                            else {
                                var objectOperations = this.instanceOperations.get(target.uuid());
                                if (objectOperations == null) {
                                    objectOperations = new java.util.HashMap();
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
                            var tuple = new Array();
                            tuple[DefaultOperationManager.DIM_INDEX] = source.universe().key();
                            tuple[DefaultOperationManager.TIME_INDEX] = source.now();
                            tuple[DefaultOperationManager.UUID_INDEX] = source.uuid();
                            tuple[DefaultOperationManager.OPERATION_INDEX] = operation.index();
                            this.remoteCallCallbacks.put(tuple, callback);
                            var sb = new java.lang.StringBuilder();
                            sb.append("[");
                            if (param.length > 0) {
                                sb.append("\"").append(this.protectString(param[0].toString())).append("\"");
                                for (var i = 1; i < param.length; i++) {
                                    sb.append(",").append("\"").append(this.protectString(param[i].toString())).append("\"");
                                }
                            }
                            sb.append("]");
                            var operationCallEvent = new org.kevoree.modeling.api.event.DefaultKEvent(org.kevoree.modeling.api.KActionType.CALL, source, operation, sb.toString());
                            this._store.eventBroker().sendOperationEvent(operationCallEvent);
                        };
                        DefaultOperationManager.prototype.protectString = function (input) {
                            var sb = new java.lang.StringBuilder();
                            for (var i = 0; i < input.length; i++) {
                                var c = input.charAt(i);
                                if (c == '{' || c == '}' || c == '[' || c == ']' || c == ',' || c == '\\' || c == '"') {
                                    sb.append('\\');
                                }
                                sb.append(c);
                            }
                            return sb.toString();
                        };
                        DefaultOperationManager.prototype.parseParams = function (inParams) {
                            var params = new java.util.ArrayList();
                            var sb = new java.lang.StringBuilder();
                            if (inParams.length > 2) {
                                if (inParams.charAt(0) == '[') {
                                    var i = 1;
                                    var c = inParams.charAt(i);
                                    var inParam = false;
                                    while (i < inParams.length && c != ']') {
                                        if (c == '\\') {
                                            i++;
                                            sb.append(inParams.charAt(i));
                                        }
                                        else {
                                            if (c == '"') {
                                                if (inParam) {
                                                    params.add(sb.toString());
                                                    sb = new java.lang.StringBuilder();
                                                }
                                                inParam = !inParam;
                                            }
                                            else {
                                                if (inParam) {
                                                    sb.append(c);
                                                }
                                            }
                                        }
                                        i++;
                                        c = inParams.charAt(i);
                                    }
                                }
                            }
                            return params.toArray(new Array());
                        };
                        DefaultOperationManager.prototype.operationEventReceived = function (operationEvent) {
                            var _this = this;
                            if (operationEvent.actionType() == org.kevoree.modeling.api.KActionType.CALL_RESPONSE) {
                                var keys = this.remoteCallCallbacks.keySet().toArray(new Array());
                                for (var i = 0; i < keys.length; i++) {
                                    var tuple = keys[i];
                                    if (tuple[DefaultOperationManager.DIM_INDEX].equals(operationEvent.universe())) {
                                        if (tuple[DefaultOperationManager.TIME_INDEX].equals(operationEvent.time())) {
                                            if (tuple[DefaultOperationManager.UUID_INDEX].equals(operationEvent.uuid())) {
                                                if (tuple[DefaultOperationManager.OPERATION_INDEX].equals(operationEvent.metaElement().index())) {
                                                    var returnParam = this.parseParams(operationEvent.value());
                                                    var cb = this.remoteCallCallbacks.get(tuple);
                                                    this.remoteCallCallbacks.remove(tuple);
                                                    cb(returnParam);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (operationEvent.actionType() == org.kevoree.modeling.api.KActionType.CALL) {
                                    var operationCore = this.searchOperation(operationEvent.uuid(), operationEvent.metaClass().index(), operationEvent.metaElement().index());
                                    if (operationCore != null) {
                                        var view = this._store.getModel().universe(operationEvent.universe()).time(operationEvent.time());
                                        view.lookup(operationEvent.uuid(), function (kObject) {
                                            if (kObject != null) {
                                                var params = _this.parseParams(operationEvent.value());
                                                operationCore(kObject, params, function (o) {
                                                    var operationCallResponseEvent = new org.kevoree.modeling.api.event.DefaultKEvent(org.kevoree.modeling.api.KActionType.CALL_RESPONSE, kObject, operationEvent.metaElement(), "[\"" + _this.protectString(o.toString()) + "\"]");
                                                    _this._store.eventBroker().sendOperationEvent(operationCallResponseEvent);
                                                });
                                            }
                                        });
                                    }
                                }
                                else {
                                }
                            }
                        };
                        DefaultOperationManager.DIM_INDEX = 0;
                        DefaultOperationManager.TIME_INDEX = 1;
                        DefaultOperationManager.UUID_INDEX = 2;
                        DefaultOperationManager.OPERATION_INDEX = 3;
                        DefaultOperationManager.TUPLE_SIZE = 4;
                        return DefaultOperationManager;
                    })();
                    util.DefaultOperationManager = DefaultOperationManager;
                    var PathHelper = (function () {
                        function PathHelper() {
                        }
                        PathHelper.parentPath = function (currentPath) {
                            if (currentPath == null || currentPath.length == 0) {
                                return null;
                            }
                            if (currentPath.length == 1) {
                                return null;
                            }
                            var lastIndex = currentPath.lastIndexOf(PathHelper.pathSep);
                            if (lastIndex != -1) {
                                if (lastIndex == 0) {
                                    return PathHelper.rootPath;
                                }
                                else {
                                    return currentPath.substring(0, lastIndex);
                                }
                            }
                            else {
                                return null;
                            }
                        };
                        PathHelper.isRoot = function (path) {
                            return path.length == 1 && path.charAt(0) == org.kevoree.modeling.api.util.PathHelper.pathSep;
                        };
                        PathHelper.path = function (parent, reference, target) {
                            if (org.kevoree.modeling.api.util.PathHelper.isRoot(parent)) {
                                return PathHelper.pathSep + reference.metaName() + PathHelper.pathIDOpen + target.domainKey() + PathHelper.pathIDClose;
                            }
                            else {
                                return parent + PathHelper.pathSep + reference.metaName() + PathHelper.pathIDOpen + target.domainKey() + PathHelper.pathIDClose;
                            }
                        };
                        PathHelper.pathSep = '/';
                        PathHelper.pathIDOpen = '[';
                        PathHelper.pathIDClose = ']';
                        PathHelper.rootPath = "/";
                        return PathHelper;
                    })();
                    util.PathHelper = PathHelper;
                    var TimeMachine = (function () {
                        function TimeMachine() {
                            this._listener = null;
                        }
                        TimeMachine.prototype.set = function (target) {
                            var _this = this;
                            if (this._syncCallback != null) {
                                if (this._previous == null) {
                                    if (this._deepMonitoring) {
                                        target.intersection(target, function (traceSequence) {
                                            if (_this._syncCallback != null) {
                                                _this._syncCallback(traceSequence);
                                            }
                                        });
                                    }
                                    else {
                                        var sequence = new org.kevoree.modeling.api.trace.TraceSequence();
                                        var traces = new java.util.ArrayList();
                                        var tempTraces = target.traces(org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_REFERENCES);
                                        for (var i = 0; i < tempTraces.length; i++) {
                                            traces.add(tempTraces[i]);
                                        }
                                        sequence.populate(traces);
                                        this._syncCallback(sequence);
                                    }
                                }
                                else {
                                    this._previous.universe().model().storage().eventBroker().unregister(this._listener);
                                    this._previous.merge(target, function (traceSequence) {
                                        if (_this._syncCallback != null) {
                                            _this._syncCallback(traceSequence);
                                        }
                                    });
                                }
                                this._listener = function (evt) {
                                    var sequence = new org.kevoree.modeling.api.trace.TraceSequence();
                                    var traces = new java.util.ArrayList();
                                    traces.add(evt.toTrace());
                                    sequence.populate(traces);
                                    _this._syncCallback(sequence);
                                };
                                target.listen(this._listener);
                            }
                            this._previous = target;
                        };
                        TimeMachine.prototype.jumpTime = function (targetTime) {
                            var _this = this;
                            if (this._previous != null) {
                                this._previous.jump(targetTime, function (resolved) {
                                    _this.set(resolved);
                                });
                            }
                        };
                        TimeMachine.prototype.jumpDimension = function (targetDimension) {
                            var _this = this;
                            if (this._previous != null) {
                                this._previous.universe().model().universe(targetDimension).time(this._previous.now()).lookup(this._previous.uuid(), function (resolved) {
                                    _this.set(resolved);
                                });
                            }
                        };
                        TimeMachine.prototype.init = function (p_deepMonitoring, p_callback) {
                            this._syncCallback = p_callback;
                            this._deepMonitoring = p_deepMonitoring;
                            return this;
                        };
                        return TimeMachine;
                    })();
                    util.TimeMachine = TimeMachine;
                })(util = api.util || (api.util = {}));
                var xmi;
                (function (xmi) {
                    var SerializationContext = (function () {
                        function SerializationContext() {
                            this.ignoreGeneratedID = false;
                            this.addressTable = new java.util.HashMap();
                            this.elementsCount = new java.util.HashMap();
                            this.packageList = new java.util.ArrayList();
                        }
                        return SerializationContext;
                    })();
                    xmi.SerializationContext = SerializationContext;
                    var XMILoadingContext = (function () {
                        function XMILoadingContext() {
                            this.loadedRoots = null;
                            this.resolvers = new java.util.ArrayList();
                            this.map = new java.util.HashMap();
                            this.elementsCount = new java.util.HashMap();
                            this.stats = new java.util.HashMap();
                            this.oppositesAlreadySet = new java.util.HashMap();
                        }
                        XMILoadingContext.prototype.isOppositeAlreadySet = function (localRef, oppositeRef) {
                            return (this.oppositesAlreadySet.get(oppositeRef + "_" + localRef) != null || (this.oppositesAlreadySet.get(localRef + "_" + oppositeRef) != null));
                        };
                        XMILoadingContext.prototype.storeOppositeRelation = function (localRef, oppositeRef) {
                            this.oppositesAlreadySet.put(localRef + "_" + oppositeRef, true);
                        };
                        return XMILoadingContext;
                    })();
                    xmi.XMILoadingContext = XMILoadingContext;
                    var XMIModelLoader = (function () {
                        function XMIModelLoader(p_factory) {
                            this._factory = p_factory;
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
                        XMIModelLoader.load = function (p_view, str, callback) {
                            var parser = new org.kevoree.modeling.api.xmi.XmlParser(str);
                            if (!parser.hasNext()) {
                                callback(null);
                            }
                            else {
                                var context = new org.kevoree.modeling.api.xmi.XMILoadingContext();
                                context.successCallback = callback;
                                context.xmiReader = parser;
                                org.kevoree.modeling.api.xmi.XMIModelLoader.deserialize(p_view, context);
                            }
                        };
                        XMIModelLoader.deserialize = function (p_view, context) {
                            try {
                                var nsURI;
                                var reader = context.xmiReader;
                                while (reader.hasNext()) {
                                    var nextTag = reader.next();
                                    if (nextTag.equals(org.kevoree.modeling.api.xmi.XmlToken.START_TAG)) {
                                        var localName = reader.getLocalName();
                                        if (localName != null) {
                                            var ns = new java.util.HashMap();
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
                                            context.loadedRoots = org.kevoree.modeling.api.xmi.XMIModelLoader.loadObject(p_view, context, "/", xsiType + "." + localName);
                                        }
                                    }
                                }
                                for (var i = 0; i < context.resolvers.size(); i++) {
                                    context.resolvers.get(i).run();
                                }
                                p_view.setRoot(context.loadedRoots, null);
                                context.successCallback(null);
                            }
                            catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e = $ex$;
                                    context.successCallback(e);
                                }
                            }
                        };
                        XMIModelLoader.callFactory = function (p_view, ctx, objectType) {
                            var modelElem = null;
                            if (objectType != null) {
                                modelElem = p_view.createFQN(objectType);
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
                                        modelElem = p_view.createFQN(realTypeName + "." + realName);
                                    }
                                }
                            }
                            else {
                                modelElem = p_view.createFQN(ctx.xmiReader.getLocalName());
                            }
                            return modelElem;
                        };
                        XMIModelLoader.loadObject = function (p_view, ctx, xmiAddress, objectType) {
                            var elementTagName = ctx.xmiReader.getLocalName();
                            var modelElem = org.kevoree.modeling.api.xmi.XMIModelLoader.callFactory(p_view, ctx, objectType);
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
                                        var kAttribute = modelElem.metaClass().metaAttribute(attrName);
                                        if (kAttribute != null) {
                                            modelElem.set(kAttribute, org.kevoree.modeling.api.xmi.XMIModelLoader.unescapeXml(valueAtt));
                                        }
                                        else {
                                            var kreference = modelElem.metaClass().metaReference(attrName);
                                            if (kreference != null) {
                                                var referenceArray = valueAtt.split(" ");
                                                for (var j = 0; j < referenceArray.length; j++) {
                                                    var xmiRef = referenceArray[j];
                                                    var adjustedRef = (xmiRef.startsWith("#") ? xmiRef.substring(1) : xmiRef);
                                                    adjustedRef = adjustedRef.replace(".0", "");
                                                    var ref = ctx.map.get(adjustedRef);
                                                    if (ref != null) {
                                                        modelElem.mutate(org.kevoree.modeling.api.KActionType.ADD, kreference, ref);
                                                    }
                                                    else {
                                                        ctx.resolvers.add(new org.kevoree.modeling.api.xmi.XMIResolveCommand(ctx, modelElem, org.kevoree.modeling.api.KActionType.ADD, attrName, adjustedRef));
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
                                    if (tok.equals(org.kevoree.modeling.api.xmi.XmlToken.START_TAG)) {
                                        var subElemName = ctx.xmiReader.getLocalName();
                                        var key = xmiAddress + "/@" + subElemName;
                                        var i = ctx.elementsCount.get(key);
                                        if (i == null) {
                                            i = 0;
                                            ctx.elementsCount.put(key, i);
                                        }
                                        var subElementId = xmiAddress + "/@" + subElemName + (i != 0 ? "." + i : "");
                                        var containedElement = org.kevoree.modeling.api.xmi.XMIModelLoader.loadObject(p_view, ctx, subElementId, subElemName);
                                        modelElem.mutate(org.kevoree.modeling.api.KActionType.ADD, modelElem.metaClass().metaReference(subElemName), containedElement);
                                        ctx.elementsCount.put(xmiAddress + "/@" + subElemName, i + 1);
                                    }
                                    else {
                                        if (tok.equals(org.kevoree.modeling.api.xmi.XmlToken.END_TAG)) {
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
                            var context = new org.kevoree.modeling.api.xmi.SerializationContext();
                            context.model = model;
                            context.finishCallback = callback;
                            context.attributesVisitor = function (metaAttribute, value) {
                                if (value != null) {
                                    if (context.ignoreGeneratedID && metaAttribute.metaName().equals("generated_KMF_ID")) {
                                        return;
                                    }
                                    context.printer.append(" " + metaAttribute.metaName() + "=\"");
                                    org.kevoree.modeling.api.xmi.XMIModelSerializer.escapeXml(context.printer, value.toString());
                                    context.printer.append("\"");
                                }
                            };
                            context.printer = new java.lang.StringBuilder();
                            context.addressTable.put(model.uuid(), "/");
                            var addressCreationTask = context.model.taskVisit(function (elem) {
                                var parentXmiAddress = context.addressTable.get(elem.parentUuid());
                                var key = parentXmiAddress + "/@" + elem.referenceInParent().metaName();
                                var i = context.elementsCount.get(key);
                                if (i == null) {
                                    i = 0;
                                    context.elementsCount.put(key, i);
                                }
                                context.addressTable.put(elem.uuid(), parentXmiAddress + "/@" + elem.referenceInParent().metaName() + "." + i);
                                context.elementsCount.put(parentXmiAddress + "/@" + elem.referenceInParent().metaName(), i + 1);
                                var pack = elem.metaClass().metaName().substring(0, elem.metaClass().metaName().lastIndexOf('.'));
                                if (!context.packageList.contains(pack)) {
                                    context.packageList.add(pack);
                                }
                                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            }, org.kevoree.modeling.api.VisitRequest.CONTAINED);
                            var serializationTask = context.model.universe().model().task();
                            serializationTask.wait(addressCreationTask);
                            serializationTask.setJob(function (currentTask) {
                                context.printer.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
                                context.printer.append("<" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_"));
                                context.printer.append(" xmlns:xsi=\"http://wwww.w3.org/2001/XMLSchema-instance\"");
                                context.printer.append(" xmi:version=\"2.0\"");
                                context.printer.append(" xmlns:xmi=\"http://www.omg.org/XMI\"");
                                var index = 0;
                                while (index < context.packageList.size()) {
                                    context.printer.append(" xmlns:" + context.packageList.get(index).replace(".", "_") + "=\"http://" + context.packageList.get(index) + "\"");
                                    index++;
                                }
                                context.model.visitAttributes(context.attributesVisitor);
                                var nonContainedRefsTasks = context.model.universe().model().task();
                                for (var i = 0; i < context.model.metaClass().metaReferences().length; i++) {
                                    if (!context.model.metaClass().metaReferences()[i].contained()) {
                                        nonContainedRefsTasks.wait(org.kevoree.modeling.api.xmi.XMIModelSerializer.nonContainedReferenceTaskMaker(context.model.metaClass().metaReferences()[i], context, context.model));
                                    }
                                }
                                nonContainedRefsTasks.setJob(function (currentTask) {
                                    context.printer.append(">\n");
                                    var containedRefsTasks = context.model.universe().model().task();
                                    for (var i = 0; i < context.model.metaClass().metaReferences().length; i++) {
                                        if (context.model.metaClass().metaReferences()[i].contained()) {
                                            containedRefsTasks.wait(org.kevoree.modeling.api.xmi.XMIModelSerializer.containedReferenceTaskMaker(context.model.metaClass().metaReferences()[i], context, context.model));
                                        }
                                    }
                                    containedRefsTasks.setJob(function (currentTask) {
                                        context.printer.append("</" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_") + ">\n");
                                        context.finishCallback(context.printer.toString(), null);
                                    });
                                    containedRefsTasks.ready();
                                });
                                nonContainedRefsTasks.ready();
                            });
                            serializationTask.ready();
                        };
                        XMIModelSerializer.escapeXml = function (ostream, chain) {
                            if (chain == null) {
                                return;
                            }
                            var i = 0;
                            var max = chain.length;
                            while (i < max) {
                                var c = chain.charAt(i);
                                if (c == '"') {
                                    ostream.append("&quot;");
                                }
                                else {
                                    if (c == '&') {
                                        ostream.append("&amp;");
                                    }
                                    else {
                                        if (c == '\'') {
                                            ostream.append("&apos;");
                                        }
                                        else {
                                            if (c == '<') {
                                                ostream.append("&lt;");
                                            }
                                            else {
                                                if (c == '>') {
                                                    ostream.append("&gt;");
                                                }
                                                else {
                                                    ostream.append(c);
                                                }
                                            }
                                        }
                                    }
                                }
                                i = i + 1;
                            }
                        };
                        XMIModelSerializer.formatMetaClassName = function (metaClassName) {
                            var lastPoint = metaClassName.lastIndexOf('.');
                            var pack = metaClassName.substring(0, lastPoint);
                            var cls = metaClassName.substring(lastPoint + 1);
                            return pack + ":" + cls;
                        };
                        XMIModelSerializer.nonContainedReferenceTaskMaker = function (ref, p_context, p_currentElement) {
                            var allTask = p_currentElement.taskRef(ref);
                            var thisTask = p_context.model.universe().model().task();
                            thisTask.wait(allTask);
                            thisTask.setJob(function (currentTask) {
                                try {
                                    var objects = currentTask.results().get(allTask);
                                    for (var i = 0; i < objects.length; i++) {
                                        var adjustedAddress = p_context.addressTable.get(objects[i].uuid());
                                        p_context.printer.append(" " + ref.metaName() + "=\"" + adjustedAddress + "\"");
                                    }
                                }
                                catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e = $ex$;
                                        e.printStackTrace();
                                    }
                                }
                            });
                            thisTask.ready();
                            return thisTask;
                        };
                        XMIModelSerializer.containedReferenceTaskMaker = function (ref, context, currentElement) {
                            var allTask = currentElement.taskRef(ref);
                            var thisTask = context.model.universe().model().task();
                            thisTask.wait(allTask);
                            thisTask.setJob(function (currentTask) {
                                try {
                                    if (currentTask.results().get(allTask) != null) {
                                        var objs = currentTask.results().get(allTask);
                                        for (var i = 0; i < objs.length; i++) {
                                            var elem = objs[i];
                                            context.printer.append("<");
                                            context.printer.append(ref.metaName());
                                            context.printer.append(" xsi:type=\"" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(elem.metaClass().metaName()) + "\"");
                                            elem.visitAttributes(context.attributesVisitor);
                                            var nonContainedRefsTasks = context.model.universe().model().task();
                                            for (var j = 0; j < elem.metaClass().metaReferences().length; j++) {
                                                if (!elem.metaClass().metaReferences()[i].contained()) {
                                                    nonContainedRefsTasks.wait(org.kevoree.modeling.api.xmi.XMIModelSerializer.nonContainedReferenceTaskMaker(elem.metaClass().metaReferences()[i], context, elem));
                                                }
                                            }
                                            nonContainedRefsTasks.setJob(function (currentTask) {
                                                context.printer.append(">\n");
                                                var containedRefsTasks = context.model.universe().model().task();
                                                for (var i = 0; i < elem.metaClass().metaReferences().length; i++) {
                                                    if (elem.metaClass().metaReferences()[i].contained()) {
                                                        containedRefsTasks.wait(org.kevoree.modeling.api.xmi.XMIModelSerializer.containedReferenceTaskMaker(elem.metaClass().metaReferences()[i], context, elem));
                                                    }
                                                }
                                                containedRefsTasks.setJob(function (currentTask) {
                                                    context.printer.append("</");
                                                    context.printer.append(ref.metaName());
                                                    context.printer.append('>');
                                                    context.printer.append("\n");
                                                });
                                                containedRefsTasks.ready();
                                            });
                                            nonContainedRefsTasks.ready();
                                        }
                                    }
                                }
                                catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e = $ex$;
                                        e.printStackTrace();
                                    }
                                }
                            });
                            thisTask.ready();
                            return thisTask;
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
                                this.target.mutate(this.mutatorType, this.target.metaClass().metaReference(this.refName), referencedElement);
                                return;
                            }
                            referencedElement = this.context.map.get("/");
                            if (referencedElement != null) {
                                this.target.mutate(this.mutatorType, this.target.metaClass().metaReference(this.refName), referencedElement);
                                return;
                            }
                            throw new java.lang.Exception("KMF Load error : reference " + this.ref + " not found in map when trying to  " + this.mutatorType + " " + this.refName + "  on " + this.target.metaClass().metaName() + "(uuid:" + this.target.uuid() + ")");
                        };
                        return XMIResolveCommand;
                    })();
                    xmi.XMIResolveCommand = XMIResolveCommand;
                    var XmiFormat = (function () {
                        function XmiFormat(p_view) {
                            this._view = p_view;
                        }
                        XmiFormat.prototype.save = function (model, callback) {
                            org.kevoree.modeling.api.xmi.XMIModelSerializer.save(model, callback);
                        };
                        XmiFormat.prototype.saveRoot = function (callback) {
                            if (org.kevoree.modeling.api.util.Checker.isDefined(callback)) {
                                this._view.universe().model().storage().getRoot(this._view, function (root) {
                                    if (root == null) {
                                        callback("", new java.lang.Exception("Root not set yet !"));
                                    }
                                    else {
                                        org.kevoree.modeling.api.xmi.XMIModelSerializer.save(root, callback);
                                    }
                                });
                            }
                            else {
                                throw new java.lang.RuntimeException("one parameter is null");
                            }
                        };
                        XmiFormat.prototype.load = function (payload, callback) {
                            org.kevoree.modeling.api.xmi.XMIModelLoader.load(this._view, payload, callback);
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
                                return org.kevoree.modeling.api.xmi.XmlToken.END_TAG;
                            }
                            if (!this.hasNext()) {
                                return org.kevoree.modeling.api.xmi.XmlToken.END_DOCUMENT;
                            }
                            this.attributesNames.clear();
                            this.attributesPrefixes.clear();
                            this.attributesValues.clear();
                            this.read_lessThan();
                            this.currentChar = this.readChar();
                            if (this.currentChar == '?') {
                                this.currentChar = this.readChar();
                                this.read_xmlHeader();
                                return org.kevoree.modeling.api.xmi.XmlToken.XML_HEADER;
                            }
                            else {
                                if (this.currentChar == '!') {
                                    do {
                                        this.currentChar = this.readChar();
                                    } while (this.currentChar != '>');
                                    return org.kevoree.modeling.api.xmi.XmlToken.COMMENT;
                                }
                                else {
                                    if (this.currentChar == '/') {
                                        this.currentChar = this.readChar();
                                        this.read_closingTag();
                                        return org.kevoree.modeling.api.xmi.XmlToken.END_TAG;
                                    }
                                    else {
                                        this.read_openTag();
                                        if (this.currentChar == '/') {
                                            this.read_upperThan();
                                            this.readSingleton = true;
                                        }
                                        return org.kevoree.modeling.api.xmi.XmlToken.START_TAG;
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
                })(xmi = api.xmi || (api.xmi = {}));
            })(api = modeling.api || (modeling.api = {}));
        })(modeling = kevoree.modeling || (kevoree.modeling = {}));
    })(kevoree = org.kevoree || (org.kevoree = {}));
})(org || (org = {}));
