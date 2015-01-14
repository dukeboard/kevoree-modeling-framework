var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var System = (function () {
    function System() {
    }
    System.arraycopy = function (src, srcPos, dest, destPos, numElements) {
        for (var i = 0; i < numElements; i++) {
            dest[destPos + i] = src[srcPos + i];
        }
    };
    System.out = {
        println: function (obj) {
            console.log(obj);
        },
        print: function (obj) {
            console.log(obj);
        }
    };
    System.err = {
        println: function (obj) {
            console.log(obj);
        },
        print: function (obj) {
            console.log(obj);
        }
    };
    return System;
})();
var TSMap = Map;
var TSSet = Set;
Number.prototype.equals = function (other) {
    return this == other;
};
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.copyValueOf = function (data, offset, count) {
        var result = "";
        for (var i = offset; i < offset + count; i++) {
            result += data[i];
        }
        return result;
    };
    return StringUtils;
})();
String.prototype.matches = function (regEx) {
    if (regEx == null) {
        return false;
    }
    else {
        var m = this.match(regEx);
        return m != null && m.length > 0;
    }
};
String.prototype.isEmpty = function () {
    return this.length == 0;
};
String.prototype.equals = function (other) {
    return this == other;
};
String.prototype.startsWith = function (other) {
    for (var i = 0; i < other.length; i++) {
        if (other.charAt(i) != this.charAt(i)) {
            return false;
        }
    }
    return true;
};
String.prototype.endsWith = function (other) {
    for (var i = other.length - 1; i >= 0; i--) {
        if (other.charAt(i) != this.charAt(i)) {
            return false;
        }
    }
    return true;
};
Boolean.prototype.equals = function (other) {
    return this == other;
};
var java;
(function (java) {
    var lang;
    (function (lang) {
        var Double = (function () {
            function Double() {
            }
            Double.parseDouble = function (val) {
                return +val;
            };
            return Double;
        })();
        lang.Double = Double;
        var Float = (function () {
            function Float() {
            }
            Float.parseFloat = function (val) {
                return +val;
            };
            return Float;
        })();
        lang.Float = Float;
        var Integer = (function () {
            function Integer() {
            }
            Integer.parseInt = function (val) {
                return +val;
            };
            return Integer;
        })();
        lang.Integer = Integer;
        var Long = (function () {
            function Long() {
            }
            Long.parseLong = function (val) {
                return +val;
            };
            return Long;
        })();
        lang.Long = Long;
        var Short = (function () {
            function Short() {
            }
            Short.parseShort = function (val) {
                return +val;
            };
            Short.MIN_VALUE = -0x8000;
            Short.MAX_VALUE = 0x7FFF;
            return Short;
        })();
        lang.Short = Short;
        var Throwable = (function () {
            function Throwable(message) {
                this.message = message;
                this.error = new Error(message);
            }
            Throwable.prototype.printStackTrace = function () {
                console.error(this.error['stack']);
            };
            return Throwable;
        })();
        lang.Throwable = Throwable;
        var Exception = (function (_super) {
            __extends(Exception, _super);
            function Exception() {
                _super.apply(this, arguments);
            }
            return Exception;
        })(Throwable);
        lang.Exception = Exception;
        var RuntimeException = (function (_super) {
            __extends(RuntimeException, _super);
            function RuntimeException() {
                _super.apply(this, arguments);
            }
            return RuntimeException;
        })(Exception);
        lang.RuntimeException = RuntimeException;
        var IndexOutOfBoundsException = (function (_super) {
            __extends(IndexOutOfBoundsException, _super);
            function IndexOutOfBoundsException() {
                _super.apply(this, arguments);
            }
            return IndexOutOfBoundsException;
        })(Exception);
        lang.IndexOutOfBoundsException = IndexOutOfBoundsException;
        var StringBuilder = (function () {
            function StringBuilder() {
                this.buffer = "";
                this.length = 0;
            }
            StringBuilder.prototype.append = function (val) {
                this.buffer = this.buffer + val;
                length = this.buffer.length;
                return this;
            };
            StringBuilder.prototype.toString = function () {
                return this.buffer;
            };
            return StringBuilder;
        })();
        lang.StringBuilder = StringBuilder;
    })(lang = java.lang || (java.lang = {}));
    var util;
    (function (util) {
        var Random = (function () {
            function Random() {
            }
            Random.prototype.nextInt = function (max) {
                return Math.random() * max;
            };
            return Random;
        })();
        util.Random = Random;
        var Arrays = (function () {
            function Arrays() {
            }
            Arrays.fill = function (data, begin, nbElem, param) {
                var max = begin + nbElem;
                for (var i = begin; i < max; i++) {
                    data[i] = param;
                }
            };
            return Arrays;
        })();
        util.Arrays = Arrays;
        var Collections = (function () {
            function Collections() {
            }
            Collections.reverse = function (p) {
                var temp = new List();
                for (var i = 0; i < p.size(); i++) {
                    temp.add(p.get(i));
                }
                p.clear();
                for (var i = temp.size() - 1; i >= 0; i--) {
                    p.add(temp.get(i));
                }
            };
            Collections.sort = function (p) {
                p.sort();
            };
            return Collections;
        })();
        util.Collections = Collections;
        var Collection = (function () {
            function Collection() {
            }
            Collection.prototype.add = function (val) {
                throw new java.lang.Exception("Abstract implementation");
            };
            Collection.prototype.addAll = function (vals) {
                throw new java.lang.Exception("Abstract implementation");
            };
            Collection.prototype.remove = function (val) {
                throw new java.lang.Exception("Abstract implementation");
            };
            Collection.prototype.clear = function () {
                throw new java.lang.Exception("Abstract implementation");
            };
            Collection.prototype.isEmpty = function () {
                throw new java.lang.Exception("Abstract implementation");
            };
            Collection.prototype.size = function () {
                throw new java.lang.Exception("Abstract implementation");
            };
            Collection.prototype.contains = function (val) {
                throw new java.lang.Exception("Abstract implementation");
            };
            Collection.prototype.toArray = function (a) {
                throw new java.lang.Exception("Abstract implementation");
            };
            return Collection;
        })();
        util.Collection = Collection;
        var List = (function (_super) {
            __extends(List, _super);
            function List() {
                _super.apply(this, arguments);
                this.internalArray = [];
            }
            List.prototype.sort = function () {
                this.internalArray = this.internalArray.sort(function (a, b) {
                    if (a == b) {
                        return 0;
                    }
                    else {
                        if (a < b) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                });
            };
            List.prototype.addAll = function (vals) {
                var tempArray = vals.toArray(null);
                for (var i = 0; i < tempArray.length; i++) {
                    this.internalArray.push(tempArray[i]);
                }
            };
            List.prototype.clear = function () {
                this.internalArray = [];
            };
            List.prototype.poll = function () {
                return this.internalArray.shift();
            };
            List.prototype.remove = function (val) {
                //TODO with filter
            };
            List.prototype.toArray = function (a) {
                //TODO
                var result = new Array(this.internalArray.length);
                this.internalArray.forEach(function (value, index, p1) {
                    result[index] = value;
                });
                return result;
            };
            List.prototype.size = function () {
                return this.internalArray.length;
            };
            List.prototype.add = function (val) {
                this.internalArray.push(val);
            };
            List.prototype.get = function (index) {
                return this.internalArray[index];
            };
            List.prototype.contains = function (val) {
                for (var i = 0; i < this.internalArray.length; i++) {
                    if (this.internalArray[i] == val) {
                        return true;
                    }
                }
                return false;
            };
            List.prototype.isEmpty = function () {
                return this.internalArray.length == 0;
            };
            return List;
        })(Collection);
        util.List = List;
        var ArrayList = (function (_super) {
            __extends(ArrayList, _super);
            function ArrayList() {
                _super.apply(this, arguments);
            }
            return ArrayList;
        })(List);
        util.ArrayList = ArrayList;
        var LinkedList = (function (_super) {
            __extends(LinkedList, _super);
            function LinkedList() {
                _super.apply(this, arguments);
            }
            return LinkedList;
        })(List);
        util.LinkedList = LinkedList;
        var Map = (function () {
            function Map() {
                this.internalMap = new TSMap();
            }
            Map.prototype.get = function (key) {
                return this.internalMap.get(key);
            };
            Map.prototype.put = function (key, value) {
                this.internalMap.set(key, value);
            };
            Map.prototype.containsKey = function (key) {
                return this.internalMap.has(key);
            };
            Map.prototype.remove = function (key) {
                var tmp = this.internalMap.get(key);
                this.internalMap.delete(key);
                return tmp;
            };
            Map.prototype.keySet = function () {
                var result = new HashSet();
                this.internalMap.forEach(function (value, index, p1) {
                    result.add(index);
                });
                return result;
            };
            Map.prototype.isEmpty = function () {
                return this.internalMap.size == 0;
            };
            Map.prototype.values = function () {
                var result = new HashSet();
                this.internalMap.forEach(function (value, index, p1) {
                    result.add(value);
                });
                return result;
            };
            Map.prototype.clear = function () {
                this.internalMap = new TSMap();
            };
            return Map;
        })();
        util.Map = Map;
        var HashMap = (function (_super) {
            __extends(HashMap, _super);
            function HashMap() {
                _super.apply(this, arguments);
            }
            return HashMap;
        })(Map);
        util.HashMap = HashMap;
        var Set = (function (_super) {
            __extends(Set, _super);
            function Set() {
                _super.apply(this, arguments);
                this.internalSet = new TSSet();
            }
            Set.prototype.add = function (val) {
                this.internalSet.add(val);
            };
            Set.prototype.clear = function () {
                this.internalSet = new TSSet();
            };
            Set.prototype.contains = function (val) {
                return this.internalSet.has(val);
            };
            Set.prototype.addAll = function (vals) {
                var tempArray = vals.toArray(null);
                for (var i = 0; i < tempArray.length; i++) {
                    this.internalSet.add(tempArray[i]);
                }
            };
            Set.prototype.remove = function (val) {
                this.internalSet.delete(val);
            };
            Set.prototype.size = function () {
                return this.internalSet.size;
            };
            Set.prototype.isEmpty = function () {
                return this.internalSet.size == 0;
            };
            Set.prototype.toArray = function (other) {
                var result = new Array(this.internalSet.size);
                var i = 0;
                this.internalSet.forEach(function (value, index, origin) {
                    result[i] = value;
                    i++;
                });
                return result;
            };
            return Set;
        })(Collection);
        util.Set = Set;
        var HashSet = (function (_super) {
            __extends(HashSet, _super);
            function HashSet() {
                _super.apply(this, arguments);
            }
            return HashSet;
        })(Set);
        util.HashSet = HashSet;
    })(util = java.util || (java.util = {}));
})(java || (java = {}));
var org;
(function (org) {
    var junit;
    (function (junit) {
        var Assert = (function () {
            function Assert() {
            }
            Assert.assertNotNull = function (p) {
                if (p == null) {
                    throw "Assert Error " + p + " must not be null";
                }
            };
            Assert.assertNull = function (p) {
                if (p != null) {
                    throw "Assert Error " + p + " must be null";
                }
            };
            Assert.assertEquals = function (p, p2) {
                if (p.equals !== undefined) {
                    if (!p.equals(p2)) {
                        throw "Assert Error \n" + p + "\n must be equal to \n" + p2 + "\n";
                    }
                }
                else {
                    if (p != p2) {
                        throw "Assert Error \n" + p + "\n must be equal to \n" + p2 + "\n";
                    }
                }
            };
            Assert.assertNotEquals = function (p, p2) {
                if (p.equals !== undefined) {
                    if (p.equals(p2)) {
                        throw "Assert Error \n" + p + "\n must not be equal to \n" + p2 + "\n";
                    }
                }
                else {
                    if (p == p2) {
                        throw "Assert Error \n" + p + "\n must not be equal to \n" + p2 + "\n";
                    }
                }
            };
            Assert.assertTrue = function (b) {
                if (!b) {
                    throw "Assert Error " + b + " must be true";
                }
            };
            return Assert;
        })();
        junit.Assert = Assert;
    })(junit = org.junit || (org.junit = {}));
})(org || (org = {}));
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
                    function InboundReference(reference, object) {
                        this.reference = reference;
                        this.object = object;
                    }
                    InboundReference.prototype.getReference = function () {
                        return this.reference;
                    };
                    InboundReference.prototype.getObject = function () {
                        return this.object;
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
                    KActionType.SET = new KActionType("SET");
                    KActionType.ADD = new KActionType("ADD");
                    KActionType.REMOVE = new KActionType("DEL");
                    KActionType.NEW = new KActionType("NEW");
                    KActionType._KActionTypeVALUES = [
                        KActionType.CALL,
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
                                return src.toString();
                            }
                            return "";
                        };
                        AbstractKDataType.prototype.load = function (payload) {
                            if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING) {
                                return payload;
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
                    var AbstractKDimension = (function () {
                        function AbstractKDimension(p_universe, p_key) {
                            this._universe = p_universe;
                            this._key = p_key;
                        }
                        AbstractKDimension.prototype.key = function () {
                            return this._key;
                        };
                        AbstractKDimension.prototype.universe = function () {
                            return this._universe;
                        };
                        AbstractKDimension.prototype.save = function (callback) {
                            this.universe().storage().save(this, callback);
                        };
                        AbstractKDimension.prototype.saveUnload = function (callback) {
                            this.universe().storage().saveUnload(this, callback);
                        };
                        AbstractKDimension.prototype.delete = function (callback) {
                            this.universe().storage().delete(this, callback);
                        };
                        AbstractKDimension.prototype.discard = function (callback) {
                            this.universe().storage().discard(this, callback);
                        };
                        AbstractKDimension.prototype.parent = function (callback) {
                        };
                        AbstractKDimension.prototype.children = function (callback) {
                        };
                        AbstractKDimension.prototype.fork = function (callback) {
                        };
                        AbstractKDimension.prototype.time = function (timePoint) {
                            return this.internal_create(timePoint);
                        };
                        AbstractKDimension.prototype.listen = function (listener) {
                            this.universe().storage().eventBroker().registerListener(this, listener, null);
                        };
                        AbstractKDimension.prototype.listenAllTimes = function (target, listener) {
                            this.universe().storage().eventBroker().registerListener(this, listener, target);
                        };
                        AbstractKDimension.prototype.internal_create = function (timePoint) {
                            throw "Abstract method";
                        };
                        AbstractKDimension.prototype.equals = function (obj) {
                            if (!(obj instanceof org.kevoree.modeling.api.abs.AbstractKDimension)) {
                                return false;
                            }
                            else {
                                var casted = obj;
                                return casted._key == this._key;
                            }
                        };
                        return AbstractKDimension;
                    })();
                    abs.AbstractKDimension = AbstractKDimension;
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
                            var raw = this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
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
                            var raw = this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
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
                        AbstractKObject.prototype.dimension = function () {
                            return this._view.dimension();
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
                                            callback(org.kevoree.modeling.api.util.Helper.path(parentPath, _this.referenceInParent(), _this));
                                        });
                                    }
                                });
                            }
                        };
                        AbstractKObject.prototype.parentUuid = function () {
                            var raw = this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
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
                            var raw = this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                            if (raw == null) {
                                return null;
                            }
                            else {
                                return raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX];
                            }
                        };
                        AbstractKObject.prototype.delete = function (callback) {
                            var toRemove = this;
                            var rawPayload = this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.DELETE);
                            if (rawPayload == null) {
                                callback(null);
                            }
                            else {
                                var payload = rawPayload[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                if (payload != null) {
                                    var refs;
                                    try {
                                        refs = payload;
                                    }
                                    catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e = $ex$;
                                            refs = null;
                                            e.printStackTrace();
                                            if (callback != null) {
                                                callback(e);
                                            }
                                        }
                                    }
                                    if (refs != null) {
                                        var refArr = refs.keySet().toArray(new Array());
                                        var finalRefs = refs;
                                        this.view().lookupAll(refArr, function (resolved) {
                                            for (var i = 0; i < resolved.length; i++) {
                                                if (resolved[i] != null) {
                                                    resolved[i].internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, finalRefs.get(refArr[i]), toRemove, false, true);
                                                }
                                            }
                                            if (callback != null) {
                                                callback(null);
                                            }
                                        });
                                    }
                                }
                                else {
                                    if (callback != null) {
                                        callback(new java.lang.Exception("Out of cache error"));
                                    }
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
                                var roots = new Array();
                                roots[0] = this;
                                org.kevoree.modeling.api.select.KSelector.select(this.view(), roots, cleanedQuery, callback);
                            }
                            else {
                                if (query.startsWith("/")) {
                                    var finalCleanedQuery = cleanedQuery;
                                    this.dimension().universe().storage().getRoot(this.view(), function (rootObj) {
                                        if (rootObj == null) {
                                            callback(new Array());
                                        }
                                        else {
                                            var roots = new Array();
                                            roots[0] = rootObj;
                                            org.kevoree.modeling.api.select.KSelector.select(rootObj.view(), roots, finalCleanedQuery, callback);
                                        }
                                    });
                                }
                                else {
                                    var roots = new Array();
                                    roots[0] = this;
                                    org.kevoree.modeling.api.select.KSelector.select(this.view(), roots, query, callback);
                                }
                            }
                        };
                        AbstractKObject.prototype.listen = function (listener) {
                            this.dimension().universe().storage().eventBroker().registerListener(this, listener, null);
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
                                this.view().dimension().universe().storage().eventBroker().notify(new org.kevoree.modeling.api.event.DefaultKEvent(org.kevoree.modeling.api.KActionType.SET, this, transposed, payload));
                            }
                        };
                        AbstractKObject.prototype.getOrCreateInbounds = function (obj) {
                            var rawWrite = this.view().dimension().universe().storage().raw(obj, org.kevoree.modeling.api.data.AccessMode.WRITE);
                            if (rawWrite == null) {
                                return null;
                            }
                            else {
                                if (rawWrite[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null && rawWrite[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] instanceof java.util.HashMap) {
                                    return rawWrite[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                }
                                else {
                                    if (rawWrite[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null) {
                                        try {
                                            throw new java.lang.Exception("Bad cache values in KMF, " + rawWrite[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] + " is not an instance of Map for the inbounds reference ");
                                        }
                                        catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e = $ex$;
                                                e.printStackTrace();
                                            }
                                        }
                                    }
                                    var newRefs = new java.util.HashMap();
                                    rawWrite[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] = newRefs;
                                    return newRefs;
                                }
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
                                throw new java.lang.RuntimeException("Bad KMF usage, the attribute named " + metaReferenceP.metaName() + " is not part of " + this.metaClass().metaName());
                            }
                            if (actionType.equals(org.kevoree.modeling.api.KActionType.ADD)) {
                                if (metaReference.single()) {
                                    this.internal_mutate(org.kevoree.modeling.api.KActionType.SET, metaReference, param, setOpposite, inDelete);
                                }
                                else {
                                    var raw = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
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
                                    var inboundRefs = this.getOrCreateInbounds(param);
                                    inboundRefs.put(this.uuid(), metaReference);
                                    var event = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, param);
                                    this.view().dimension().universe().storage().eventBroker().notify(event);
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
                                            var payload = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                            var previous = payload[metaReference.index()];
                                            if (previous != null) {
                                                this.internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference, null, setOpposite, inDelete);
                                            }
                                            payload[metaReference.index()] = param.uuid();
                                            if (metaReference.contained()) {
                                                this.removeFromContainer(param);
                                                param.set_parent(this._uuid, metaReference);
                                            }
                                            var inboundRefs = this.getOrCreateInbounds(param);
                                            inboundRefs.put(this.uuid(), metaReference);
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
                                            this.view().dimension().universe().storage().eventBroker().notify(event);
                                        }
                                    }
                                }
                                else {
                                    if (actionType.equals(org.kevoree.modeling.api.KActionType.REMOVE)) {
                                        if (metaReference.single()) {
                                            var raw = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                            var previousKid = raw[metaReference.index()];
                                            raw[metaReference.index()] = null;
                                            if (previousKid != null) {
                                                var self = this;
                                                this._view.dimension().universe().storage().lookup(this._view, previousKid, function (resolvedParam) {
                                                    if (resolvedParam != null) {
                                                        if (metaReference.contained()) {
                                                            resolvedParam.set_parent(null, null);
                                                        }
                                                        if (metaReference.opposite() != null && setOpposite) {
                                                            resolvedParam.internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), self, false, inDelete);
                                                        }
                                                        var inboundRefs = _this.getOrCreateInbounds(resolvedParam);
                                                        inboundRefs.remove(_this.uuid());
                                                    }
                                                });
                                                var event = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, previousKid);
                                                this.view().dimension().universe().storage().eventBroker().notify(event);
                                            }
                                        }
                                        else {
                                            var payload = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
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
                                                this.view().dimension().universe().storage().eventBroker().notify(event);
                                            }
                                            if (!inDelete) {
                                                var inboundRefs = this.getOrCreateInbounds(param);
                                                if (inboundRefs != null) {
                                                    inboundRefs.remove(this.uuid());
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
                                var raw = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
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
                        AbstractKObject.prototype.single = function (p_metaReference, p_callback) {
                            var transposed = this.internal_transpose_ref(p_metaReference);
                            if (transposed == null) {
                                throw new java.lang.RuntimeException("Bad KMF usage, the reference named " + p_metaReference.metaName() + " is not part of " + this.metaClass().metaName());
                            }
                            else {
                                var raw = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                                if (raw == null || raw[transposed.index()] == null) {
                                    p_callback(null);
                                }
                                else {
                                    var o = raw[transposed.index()];
                                    var casted = null;
                                    try {
                                        casted = o;
                                    }
                                    catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e = $ex$;
                                            e.printStackTrace();
                                            p_callback(null);
                                        }
                                    }
                                    if (casted != null) {
                                        this.view().lookup(casted, function (resolved) {
                                            p_callback(resolved);
                                        });
                                    }
                                }
                            }
                        };
                        AbstractKObject.prototype.all = function (p_metaReference, p_callback) {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(p_callback)) {
                                return;
                            }
                            var transposed = this.internal_transpose_ref(p_metaReference);
                            if (transposed == null) {
                                throw new java.lang.RuntimeException("Bad KMF usage, the reference named " + p_metaReference.metaName() + " is not part of " + this.metaClass().metaName());
                            }
                            else {
                                var raw = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
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
                                            p_callback(new Array());
                                        }
                                    }
                                }
                            }
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
                        AbstractKObject.prototype.visit = function (visitor, end) {
                            this.internal_visit(visitor, end, false, false, null, null);
                        };
                        AbstractKObject.prototype.internal_visit = function (visitor, end, deep, containedOnly, visited, traversed) {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(visitor)) {
                                return;
                            }
                            if (traversed != null) {
                                traversed.add(this.uuid());
                            }
                            var toResolveIds = new java.util.HashSet();
                            for (var i = 0; i < this.metaClass().metaReferences().length; i++) {
                                var reference = this.metaClass().metaReferences()[i];
                                if (!(containedOnly && !reference.contained())) {
                                    var raw = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
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
                        AbstractKObject.prototype.graphVisit = function (visitor, end) {
                            this.internal_visit(visitor, end, true, false, new java.util.HashSet(), new java.util.HashSet());
                        };
                        AbstractKObject.prototype.treeVisit = function (visitor, end) {
                            this.internal_visit(visitor, end, true, true, null, null);
                        };
                        AbstractKObject.prototype.toJSON = function () {
                            var raw = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                            if (raw != null) {
                                return org.kevoree.modeling.api.data.JsonRaw.encode(raw, this._uuid, this._metaClass);
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
                                    var raw = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
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
                        AbstractKObject.prototype.inbounds = function (callback, end) {
                            var rawPayload = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                            if (rawPayload == null) {
                                end(new java.lang.Exception("Object not initialized."));
                            }
                            else {
                                var payload = rawPayload[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                if (payload != null) {
                                    if (payload instanceof java.util.Map) {
                                        var refs = payload;
                                        var oppositeKids = new java.util.HashSet();
                                        oppositeKids.addAll(refs.keySet());
                                        this._view.lookupAll(oppositeKids.toArray(new Array()), function (oppositeElements) {
                                            if (oppositeElements != null) {
                                                for (var k = 0; k < oppositeElements.length; k++) {
                                                    var opposite = oppositeElements[k];
                                                    var metaRef = refs.get(opposite.uuid());
                                                    if (metaRef != null) {
                                                        var reference = new org.kevoree.modeling.api.InboundReference(metaRef, opposite);
                                                        try {
                                                            if (callback != null) {
                                                                callback(reference);
                                                            }
                                                        }
                                                        catch ($ex$) {
                                                            if ($ex$ instanceof java.lang.Throwable) {
                                                                var t = $ex$;
                                                                if (end != null) {
                                                                    end(t);
                                                                }
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        if (end != null) {
                                                            end(new java.lang.Exception("MetaReference not found with index:" + metaRef + " in refs of " + opposite.metaClass().metaName()));
                                                        }
                                                    }
                                                }
                                                if (end != null) {
                                                    end(null);
                                                }
                                            }
                                            else {
                                                if (end != null) {
                                                    end(new java.lang.Exception("Could not resolve opposite objects"));
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        if (end != null) {
                                            end(new java.lang.Exception("Inbound refs payload is not a cset"));
                                        }
                                    }
                                }
                                else {
                                    if (end != null) {
                                        end(null);
                                    }
                                }
                            }
                        };
                        AbstractKObject.prototype.set_parent = function (p_parentKID, p_metaReference) {
                            var raw = this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
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
                        AbstractKObject.prototype.diff = function (target, callback) {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.diff(this, target, callback);
                        };
                        AbstractKObject.prototype.merge = function (target, callback) {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.merge(this, target, callback);
                        };
                        AbstractKObject.prototype.intersection = function (target, callback) {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.intersection(this, target, callback);
                        };
                        AbstractKObject.prototype.slice = function (callback) {
                            var params = new java.util.ArrayList();
                            params.add(this);
                            org.kevoree.modeling.api.operation.DefaultModelSlicer.slice(params, callback);
                        };
                        AbstractKObject.prototype.jump = function (time, callback) {
                            this.view().dimension().time(time).lookup(this.uuid(), function (kObject) {
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
                            return this.metaClass().metaOperation(p.metaName());
                        };
                        AbstractKObject.prototype.traverse = function (p_metaReference) {
                            return new org.kevoree.modeling.api.promise.DefaultKTraversalPromise(this, p_metaReference);
                        };
                        return AbstractKObject;
                    })();
                    abs.AbstractKObject = AbstractKObject;
                    var AbstractKObjectInfer = (function (_super) {
                        __extends(AbstractKObjectInfer, _super);
                        function AbstractKObjectInfer(p_view, p_uuid, p_timeTree, p_metaClass) {
                            _super.call(this, p_view, p_uuid, p_timeTree, p_metaClass);
                        }
                        AbstractKObjectInfer.prototype.infer = function (callback) {
                        };
                        AbstractKObjectInfer.prototype.learn = function (param, callback) {
                        };
                        return AbstractKObjectInfer;
                    })(org.kevoree.modeling.api.abs.AbstractKObject);
                    abs.AbstractKObjectInfer = AbstractKObjectInfer;
                    var AbstractKUniverse = (function () {
                        function AbstractKUniverse() {
                            this._storage = new org.kevoree.modeling.api.data.DefaultKStore();
                        }
                        AbstractKUniverse.prototype.metaModel = function () {
                            throw "Abstract method";
                        };
                        AbstractKUniverse.prototype.connect = function (callback) {
                            this._storage.connect(callback);
                        };
                        AbstractKUniverse.prototype.close = function (callback) {
                            this._storage.close(callback);
                        };
                        AbstractKUniverse.prototype.storage = function () {
                            return this._storage;
                        };
                        AbstractKUniverse.prototype.newDimension = function () {
                            var nextKey = this._storage.nextDimensionKey();
                            var newDimension = this.internal_create(nextKey);
                            this.storage().initDimension(newDimension);
                            return newDimension;
                        };
                        AbstractKUniverse.prototype.internal_create = function (key) {
                            throw "Abstract method";
                        };
                        AbstractKUniverse.prototype.dimension = function (key) {
                            var newDimension = this.internal_create(key);
                            this.storage().initDimension(newDimension);
                            return newDimension;
                        };
                        AbstractKUniverse.prototype.saveAll = function (callback) {
                        };
                        AbstractKUniverse.prototype.deleteAll = function (callback) {
                        };
                        AbstractKUniverse.prototype.unloadAll = function (callback) {
                        };
                        AbstractKUniverse.prototype.disable = function (listener) {
                        };
                        AbstractKUniverse.prototype.stream = function (query, callback) {
                        };
                        AbstractKUniverse.prototype.listen = function (listener) {
                            this.storage().eventBroker().registerListener(this, listener, null);
                        };
                        AbstractKUniverse.prototype.setEventBroker = function (eventBroker) {
                            this.storage().setEventBroker(eventBroker);
                            eventBroker.setMetaModel(this.metaModel());
                            return this;
                        };
                        AbstractKUniverse.prototype.setDataBase = function (dataBase) {
                            this.storage().setDataBase(dataBase);
                            return this;
                        };
                        AbstractKUniverse.prototype.setOperation = function (metaOperation, operation) {
                            this.storage().operationManager().registerOperation(metaOperation, operation);
                        };
                        return AbstractKUniverse;
                    })();
                    abs.AbstractKUniverse = AbstractKUniverse;
                    var AbstractKView = (function () {
                        function AbstractKView(p_now, p_dimension) {
                            this._now = p_now;
                            this._dimension = p_dimension;
                        }
                        AbstractKView.prototype.now = function () {
                            return this._now;
                        };
                        AbstractKView.prototype.dimension = function () {
                            return this._dimension;
                        };
                        AbstractKView.prototype.createFQN = function (metaClassName) {
                            return this.create(this.dimension().universe().metaModel().metaClass(metaClassName));
                        };
                        AbstractKView.prototype.setRoot = function (elem, callback) {
                            elem.set_parent(null, null);
                            elem.setRoot(true);
                            this.dimension().universe().storage().setRoot(elem, callback);
                        };
                        AbstractKView.prototype.select = function (query, callback) {
                            if (callback == null) {
                                return;
                            }
                            if (query == null) {
                                callback(new Array());
                                return;
                            }
                            this.dimension().universe().storage().getRoot(this, function (rootObj) {
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
                                        var roots = new Array();
                                        roots[0] = rootObj;
                                        org.kevoree.modeling.api.select.KSelector.select(rootObj.view(), roots, cleanedQuery, callback);
                                    }
                                }
                            });
                        };
                        AbstractKView.prototype.lookup = function (kid, callback) {
                            this.dimension().universe().storage().lookup(this, kid, callback);
                        };
                        AbstractKView.prototype.lookupAll = function (keys, callback) {
                            this.dimension().universe().storage().lookupAll(this, keys, callback);
                        };
                        AbstractKView.prototype.createProxy = function (clazz, timeTree, key) {
                            return this.internalCreate(clazz, timeTree, key);
                        };
                        AbstractKView.prototype.create = function (clazz) {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(clazz)) {
                                return null;
                            }
                            var newObj = this.internalCreate(clazz, new org.kevoree.modeling.api.time.DefaultTimeTree().insert(this.now()), this.dimension().universe().storage().nextObjectKey());
                            if (newObj != null) {
                                this.dimension().universe().storage().initKObject(newObj, this);
                                this.dimension().universe().storage().eventBroker().notify(new org.kevoree.modeling.api.event.DefaultKEvent(org.kevoree.modeling.api.KActionType.NEW, newObj, clazz, null));
                            }
                            return newObj;
                        };
                        AbstractKView.prototype.listen = function (listener) {
                            this.dimension().universe().storage().eventBroker().registerListener(this, listener, null);
                        };
                        AbstractKView.prototype.internalCreate = function (clazz, timeTree, key) {
                            throw "Abstract method";
                        };
                        AbstractKView.prototype.slice = function (elems, callback) {
                            org.kevoree.modeling.api.operation.DefaultModelSlicer.slice(elems, callback);
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
                                return (casted._now == this._now) && this._dimension.equals(casted._dimension);
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
                    var DynamicKObject = (function (_super) {
                        __extends(DynamicKObject, _super);
                        function DynamicKObject(p_view, p_uuid, p_timeTree, p_metaClass) {
                            _super.call(this, p_view, p_uuid, p_timeTree, p_metaClass);
                        }
                        return DynamicKObject;
                    })(org.kevoree.modeling.api.abs.AbstractKObject);
                    abs.DynamicKObject = DynamicKObject;
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
                        function DefaultKStore() {
                            this.caches = new java.util.HashMap();
                            this._objectKeyCalculator = null;
                            this._dimensionKeyCalculator = null;
                            this.isConnected = false;
                            this._db = new org.kevoree.modeling.api.data.MemoryKDataBase();
                            this._eventBroker = new org.kevoree.modeling.api.event.DefaultKBroker();
                            this._operationManager = new org.kevoree.modeling.api.util.DefaultOperationManager(this);
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
                        DefaultKStore.prototype.nextDimensionKey = function () {
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
                        DefaultKStore.prototype.initDimension = function (dimension) {
                        };
                        DefaultKStore.prototype.initKObject = function (obj, originView) {
                            this.write_tree(obj.dimension().key(), obj.uuid(), obj.timeTree());
                            var cacheEntry = new org.kevoree.modeling.api.data.CacheEntry();
                            cacheEntry.raw = new Array();
                            cacheEntry.raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = true;
                            cacheEntry.metaClass = obj.metaClass();
                            cacheEntry.timeTree = obj.timeTree();
                            this.write_cache(obj.dimension().key(), obj.now(), obj.uuid(), cacheEntry);
                        };
                        DefaultKStore.prototype.raw = function (origin, accessMode) {
                            var resolvedTime = origin.timeTree().resolve(origin.now());
                            var needCopy = accessMode.equals(org.kevoree.modeling.api.data.AccessMode.WRITE) && (resolvedTime != origin.now());
                            var dimensionCache = this.caches.get(origin.dimension().key());
                            if (dimensionCache == null) {
                                System.err.println(DefaultKStore.OUT_OF_CACHE_MESSAGE);
                            }
                            var timeCache = dimensionCache.timesCaches.get(resolvedTime);
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
                                    this.write_cache(origin.dimension().key(), origin.now(), origin.uuid(), clonedEntry);
                                    return clonedEntry.raw;
                                }
                            }
                        };
                        DefaultKStore.prototype.discard = function (dimension, callback) {
                            this.caches.remove(dimension.key());
                            if (callback != null) {
                                callback(null);
                            }
                        };
                        DefaultKStore.prototype.delete = function (dimension, callback) {
                            throw new java.lang.RuntimeException("Not implemented yet !");
                        };
                        DefaultKStore.prototype.save = function (dimension, callback) {
                            var dimensionCache = this.caches.get(dimension.key());
                            if (dimensionCache == null) {
                                if (callback != null) {
                                    callback(null);
                                }
                            }
                            else {
                                var times = dimensionCache.timesCaches.keySet().toArray(new Array());
                                var sizeCache = this.size_dirties(dimensionCache) + 2;
                                var payloads = new Array(new Array());
                                var i = 0;
                                for (var j = 0; j < times.length; j++) {
                                    var now = times[j];
                                    var timeCache = dimensionCache.timesCaches.get(now);
                                    var keys = timeCache.payload_cache.keySet().toArray(new Array());
                                    for (var k = 0; k < keys.length; k++) {
                                        var idObj = keys[k];
                                        var cached_entry = timeCache.payload_cache.get(idObj);
                                        var cached_raw = cached_entry.raw;
                                        if (cached_raw != null && cached_raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] != null && cached_raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX].toString().equals("true")) {
                                            var payloadA = new Array();
                                            payloadA[0] = this.keyPayload(dimension.key(), now, idObj);
                                            payloadA[1] = org.kevoree.modeling.api.data.JsonRaw.encode(cached_raw, idObj, cached_entry.metaClass);
                                            payloads[i] = payloadA;
                                            cached_raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = false;
                                            i++;
                                        }
                                    }
                                }
                                var keyArr = dimensionCache.timeTreeCache.keySet().toArray(new Array());
                                for (var l = 0; l < keyArr.length; l++) {
                                    var timeTreeKey = keyArr[l];
                                    var timeTree = dimensionCache.timeTreeCache.get(timeTreeKey);
                                    if (timeTree.isDirty()) {
                                        var payloadC = new Array();
                                        payloadC[0] = this.keyTree(dimension.key(), timeTreeKey);
                                        payloadC[1] = timeTree.toString();
                                        payloads[i] = payloadC;
                                        timeTree.setDirty(false);
                                        i++;
                                    }
                                }
                                if (dimensionCache.roots != null && dimensionCache.roots.dirty) {
                                    var payloadD = new Array();
                                    payloadD[0] = this.keyRootTree(dimension);
                                    payloadD[1] = dimensionCache.roots.serialize();
                                    payloads[i] = payloadD;
                                    dimensionCache.roots.dirty = false;
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
                                this._eventBroker.flush(dimension.key());
                            }
                        };
                        DefaultKStore.prototype.saveUnload = function (dimension, callback) {
                            var _this = this;
                            this.save(dimension, function (throwable) {
                                if (throwable == null) {
                                    _this.discard(dimension, callback);
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
                            var _this = this;
                            this.internal_resolve_dim_time(originView, keys, function (objects) {
                                var resolved = new Array();
                                var toLoadIndexes = new java.util.ArrayList();
                                for (var i = 0; i < objects.length; i++) {
                                    if (objects[i][DefaultKStore.INDEX_RESOLVED_TIME] != null) {
                                        var entry = _this.read_cache(objects[i][DefaultKStore.INDEX_RESOLVED_DIM], objects[i][DefaultKStore.INDEX_RESOLVED_TIME], keys[i]);
                                        if (entry == null) {
                                            toLoadIndexes.add(i);
                                        }
                                        else {
                                            resolved[i] = originView.createProxy(entry.metaClass, entry.timeTree, keys[i]);
                                        }
                                    }
                                }
                                if (toLoadIndexes.isEmpty()) {
                                    callback(resolved);
                                }
                                else {
                                    var toLoadKeys = new Array();
                                    for (var i = 0; i < toLoadIndexes.size(); i++) {
                                        var toLoadIndex = toLoadIndexes.get(i);
                                        toLoadKeys[i] = _this.keyPayload(objects[toLoadIndex][DefaultKStore.INDEX_RESOLVED_DIM], objects[toLoadIndex][DefaultKStore.INDEX_RESOLVED_TIME], keys[i]);
                                    }
                                    _this._db.get(toLoadKeys, function (strings, error) {
                                        if (error != null) {
                                            error.printStackTrace();
                                            callback(null);
                                        }
                                        else {
                                            for (var i = 0; i < strings.length; i++) {
                                                if (strings[i] != null) {
                                                    var index = toLoadIndexes.get(i);
                                                    var entry = org.kevoree.modeling.api.data.JsonRaw.decode(strings[i], originView, objects[i][DefaultKStore.INDEX_RESOLVED_TIME]);
                                                    if (entry != null) {
                                                        entry.timeTree = objects[i][DefaultKStore.INDEX_RESOLVED_TIMETREE];
                                                        resolved[index] = originView.createProxy(entry.metaClass, entry.timeTree, keys[i]);
                                                        _this.write_cache(objects[i][DefaultKStore.INDEX_RESOLVED_DIM], objects[i][DefaultKStore.INDEX_RESOLVED_TIME], keys[i], entry);
                                                    }
                                                }
                                            }
                                            callback(resolved);
                                        }
                                    });
                                }
                            });
                        };
                        DefaultKStore.prototype.getRoot = function (originView, callback) {
                            var _this = this;
                            this.resolve_roots(originView.dimension(), function (longRBTree) {
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
                            this.resolve_roots(newRoot.dimension(), function (longRBTree) {
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
                        };
                        DefaultKStore.prototype.dataBase = function () {
                            return this._db;
                        };
                        DefaultKStore.prototype.setDataBase = function (p_dataBase) {
                            this._db = p_dataBase;
                        };
                        DefaultKStore.prototype.operationManager = function () {
                            return this._operationManager;
                        };
                        DefaultKStore.prototype.read_cache = function (dimensionKey, timeKey, uuid) {
                            var dimensionCache = this.caches.get(dimensionKey);
                            if (dimensionCache != null) {
                                var timeCache = dimensionCache.timesCaches.get(timeKey);
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
                            var dimensionCache = this.caches.get(dimensionKey);
                            if (dimensionCache == null) {
                                dimensionCache = new org.kevoree.modeling.api.data.cache.DimensionCache();
                                this.caches.put(dimensionKey, dimensionCache);
                            }
                            var timeCache = dimensionCache.timesCaches.get(timeKey);
                            if (timeCache == null) {
                                timeCache = new org.kevoree.modeling.api.data.cache.TimeCache();
                                dimensionCache.timesCaches.put(timeKey, timeCache);
                            }
                            timeCache.payload_cache.put(uuid, cacheEntry);
                        };
                        DefaultKStore.prototype.write_tree = function (dimensionKey, uuid, timeTree) {
                            var dimensionCache = this.caches.get(dimensionKey);
                            if (dimensionCache == null) {
                                dimensionCache = new org.kevoree.modeling.api.data.cache.DimensionCache();
                                this.caches.put(dimensionKey, dimensionCache);
                            }
                            dimensionCache.timeTreeCache.put(uuid, timeTree);
                        };
                        DefaultKStore.prototype.write_roots = function (dimensionKey, timeTree) {
                            var dimensionCache = this.caches.get(dimensionKey);
                            if (dimensionCache == null) {
                                dimensionCache = new org.kevoree.modeling.api.data.cache.DimensionCache();
                                this.caches.put(dimensionKey, dimensionCache);
                            }
                            dimensionCache.roots = timeTree;
                        };
                        DefaultKStore.prototype.size_dirties = function (dimensionCache) {
                            var times = dimensionCache.timesCaches.keySet().toArray(new Array());
                            var sizeCache = 0;
                            for (var i = 0; i < times.length; i++) {
                                var timeCache = dimensionCache.timesCaches.get(times[i]);
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
                            var ids = dimensionCache.timeTreeCache.keySet().toArray(new Array());
                            for (var k = 0; k < ids.length; k++) {
                                var timeTree = dimensionCache.timeTreeCache.get(ids[k]);
                                if (timeTree != null && timeTree.isDirty()) {
                                    sizeCache++;
                                }
                            }
                            if (dimensionCache.roots != null && dimensionCache.roots.dirty) {
                                sizeCache++;
                            }
                            return sizeCache;
                        };
                        DefaultKStore.prototype.internal_resolve_dim_time = function (originView, uuids, callback) {
                            var result = new Array(new Array());
                            this.resolve_timeTrees(originView.dimension(), uuids, function (timeTrees) {
                                for (var i = 0; i < timeTrees.length; i++) {
                                    var resolved = new Array();
                                    resolved[DefaultKStore.INDEX_RESOLVED_DIM] = originView.dimension().key();
                                    resolved[DefaultKStore.INDEX_RESOLVED_TIME] = timeTrees[i].resolve(originView.now());
                                    resolved[DefaultKStore.INDEX_RESOLVED_TIMETREE] = timeTrees[i];
                                    result[i] = resolved;
                                }
                                callback(result);
                            });
                        };
                        DefaultKStore.prototype.resolve_timeTrees = function (dimension, keys, callback) {
                            var _this = this;
                            var toLoad = new java.util.ArrayList();
                            var result = new Array();
                            for (var i = 0; i < keys.length; i++) {
                                var dimensionCache = this.caches.get(dimension.key());
                                if (dimensionCache == null) {
                                    toLoad.add(i);
                                }
                                else {
                                    var cachedTree = dimensionCache.timeTreeCache.get(keys[i]);
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
                                    toLoadKeys[i] = this.keyTree(dimension.key(), keys[toLoad.get(i)]);
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
                                                newTree.insert(dimension.key());
                                            }
                                            _this.write_tree(dimension.key(), keys[toLoad.get(i)], newTree);
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
                        DefaultKStore.prototype.resolve_roots = function (dimension, callback) {
                            var _this = this;
                            var dimensionCache = this.caches.get(dimension.key());
                            if (dimensionCache != null && dimensionCache.roots != null) {
                                callback(dimensionCache.roots);
                            }
                            else {
                                var keys = new Array();
                                keys[0] = this.keyRoot(dimension.key());
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
                                    _this.write_roots(dimension.key(), tree);
                                    callback(tree);
                                });
                            }
                        };
                        DefaultKStore.KEY_SEP = ',';
                        DefaultKStore.OUT_OF_CACHE_MESSAGE = "KMF Error: your object is out of cache, you probably kept an old reference. Please reload it with a lookup";
                        DefaultKStore.DELETED_MESSAGE = "KMF Error: your object has been deleted. Please do not use object pointer after a call to delete method";
                        DefaultKStore.UNIVERSE_NOT_CONNECTED_ERROR = "Please connect your universe prior to create a dimension or an object";
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
                        Index.RESERVED_INDEXES = 5;
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
                                var metaModel = currentView.dimension().universe().metaModel();
                                entry.metaClass = metaModel.metaClass(content.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META).toString());
                                entry.raw = new Array();
                                entry.raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = false;
                                var metaKeys = content.keySet().toArray(new Array());
                                for (var i = 0; i < metaKeys.length; i++) {
                                    if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.INBOUNDS_META)) {
                                        var inbounds = new java.util.HashMap();
                                        entry.raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] = inbounds;
                                        var raw_payload = content.get(metaKeys[i]);
                                        try {
                                            var raw_keys = raw_payload;
                                            var raw_keys_p = raw_keys.toArray(new Array());
                                            for (var j = 0; j < raw_keys_p.length; j++) {
                                                var raw_elem = raw_keys_p[j];
                                                var tuple = raw_elem.split(JsonRaw.SEP);
                                                if (tuple.length == 3) {
                                                    var raw_k = java.lang.Long.parseLong(tuple[0]);
                                                    var foundMeta = metaModel.metaClass(tuple[1].trim());
                                                    if (foundMeta != null) {
                                                        var metaReference = foundMeta.metaReference(tuple[2].trim());
                                                        if (metaReference != null) {
                                                            inbounds.put(raw_k, metaReference);
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
                        JsonRaw.encode = function (raw, uuid, p_metaClass) {
                            var metaReferences = p_metaClass.metaReferences();
                            var metaAttributes = p_metaClass.metaAttributes();
                            var builder = new java.lang.StringBuilder();
                            builder.append("{\n");
                            builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META + "\" : \"");
                            builder.append(p_metaClass.metaName());
                            builder.append("\",\n");
                            builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID + "\" : \"");
                            builder.append(uuid);
                            if (raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] != null && raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX].toString().equals("true")) {
                                builder.append("\",\n");
                                builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_ROOT + "\" : \"");
                                builder.append("true");
                            }
                            if (raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX] != null) {
                                builder.append("\",\n");
                                builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_META + "\" : \"");
                                builder.append(raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX].toString());
                            }
                            if (raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX] != null) {
                                builder.append("\",\n");
                                builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_REF_META + "\" : \"");
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
                                builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.INBOUNDS_META + "\" : [");
                                try {
                                    var elemsInRaw = raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                    var elemsArr = elemsInRaw.keySet().toArray(new Array());
                                    var isFirst = true;
                                    for (var j = 0; j < elemsArr.length; j++) {
                                        if (!isFirst) {
                                            builder.append(",");
                                        }
                                        builder.append("\"");
                                        builder.append(elemsArr[j]);
                                        builder.append(JsonRaw.SEP);
                                        var ref = elemsInRaw.get(elemsArr[j]);
                                        builder.append(ref.origin().metaName());
                                        builder.append(JsonRaw.SEP);
                                        builder.append(ref.metaName());
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
                            for (var i = 0; i < metaAttributes.length; i++) {
                                var payload_res = raw[metaAttributes[i].index()];
                                if (payload_res != null) {
                                    var attrsPayload = metaAttributes[i].strategy().save(payload_res, metaAttributes[i]);
                                    if (attrsPayload != null) {
                                        builder.append("\t");
                                        builder.append("\"");
                                        builder.append(metaAttributes[i].metaName());
                                        builder.append("\":\"");
                                        builder.append(attrsPayload);
                                        builder.append("\",\n");
                                    }
                                }
                            }
                            for (var i = 0; i < metaReferences.length; i++) {
                                var refPayload = raw[metaReferences[i].index()];
                                if (refPayload != null) {
                                    builder.append("\t");
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
                                        var isFirst = true;
                                        builder.append(" [");
                                        for (var j = 0; j < elemsArr.length; j++) {
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
                            builder.append("}\n");
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
                        var DimensionCache = (function () {
                            function DimensionCache() {
                                this.timeTreeCache = new java.util.HashMap();
                                this.timesCaches = new java.util.HashMap();
                                this.roots = null;
                            }
                            return DimensionCache;
                        })();
                        cache.DimensionCache = DimensionCache;
                        var TimeCache = (function () {
                            function TimeCache() {
                                this.payload_cache = new java.util.HashMap();
                                this.root = null;
                                this.rootDirty = false;
                            }
                            return TimeCache;
                        })();
                        cache.TimeCache = TimeCache;
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
                            if (origin instanceof org.kevoree.modeling.api.abs.AbstractKDimension) {
                                tuple[DefaultKBroker.DIM_INDEX] = origin.key();
                            }
                            else {
                                if (origin instanceof org.kevoree.modeling.api.abs.AbstractKView) {
                                    tuple[DefaultKBroker.DIM_INDEX] = origin.dimension().key();
                                    tuple[DefaultKBroker.TIME_INDEX] = origin.now();
                                }
                                else {
                                    if (origin instanceof org.kevoree.modeling.api.abs.AbstractKObject) {
                                        var casted = origin;
                                        if (scope == null) {
                                            tuple[DefaultKBroker.DIM_INDEX] = casted.dimension().key();
                                            tuple[DefaultKBroker.TIME_INDEX] = casted.now();
                                            tuple[DefaultKBroker.UUID_INDEX] = casted.uuid();
                                        }
                                        else {
                                            tuple[DefaultKBroker.UUID_INDEX] = casted.uuid();
                                            if (scope instanceof org.kevoree.modeling.api.abs.AbstractKDimension) {
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
                                    if (!tuple[DefaultKBroker.DIM_INDEX].equals(event.dimension())) {
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
                        DefaultKBroker.prototype.flush = function (dimensionKey) {
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
                                this._dimensionKey = p_source.dimension().key();
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
                        DefaultKEvent.prototype.dimension = function () {
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
                            var payload = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ);
                            if (payload != null) {
                                return payload[attribute.index()];
                            }
                            else {
                                return null;
                            }
                        };
                        DiscreteExtrapolation.prototype.mutate = function (current, attribute, payload) {
                            var internalPayload = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE);
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
                            var pol = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[attribute.index()];
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
                            var raw = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ);
                            var previous = raw[attribute.index()];
                            if (previous == null) {
                                var pol = this.createPolynomialModel(current.now(), attribute.precision());
                                pol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()));
                                current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE)[attribute.index()] = pol;
                            }
                            else {
                                var previousPol = previous;
                                if (!previousPol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()))) {
                                    var pol = this.createPolynomialModel(previousPol.lastIndex(), attribute.precision());
                                    pol.insert(previousPol.lastIndex(), previousPol.extrapolate(previousPol.lastIndex()));
                                    pol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()));
                                    current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE)[attribute.index()] = pol;
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
                                var metaModel = factory.dimension().universe().metaModel();
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
                                            mappedKeys.put(kid, factory.dimension().universe().storage().nextObjectKey());
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
                                            factory.dimension().universe().storage().initKObject(current, factory);
                                            var raw = factory.dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                            var metaKeys = elem.keySet().toArray(new Array());
                                            for (var h = 0; h < metaKeys.length; h++) {
                                                var metaKey = metaKeys[h];
                                                var payload_content = elem.get(metaKey);
                                                if (metaKey.equals(org.kevoree.modeling.api.json.JsonModelSerializer.INBOUNDS_META)) {
                                                    var inbounds = new java.util.HashMap();
                                                    raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] = inbounds;
                                                    try {
                                                        var raw_keys = payload_content;
                                                        var raw_keys_p = raw_keys.toArray(new Array());
                                                        for (var hh = 0; hh < raw_keys_p.length; hh++) {
                                                            var raw_elem = raw_keys_p[hh];
                                                            var tuple = raw_elem.split(org.kevoree.modeling.api.data.JsonRaw.SEP);
                                                            if (tuple.length == 3) {
                                                                var raw_k = java.lang.Long.parseLong(tuple[0]);
                                                                if (mappedKeys.containsKey(raw_k)) {
                                                                    raw_k = mappedKeys.get(raw_k);
                                                                }
                                                                var foundMeta = metaModel.metaClass(tuple[1].trim());
                                                                if (foundMeta != null) {
                                                                    var metaReference = foundMeta.metaReference(tuple[2].trim());
                                                                    if (metaReference != null) {
                                                                        inbounds.put(raw_k, metaReference);
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
                            model.graphVisit(function (elem) {
                                builder.append(",");
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
                                builder.append("]\n");
                                callback(builder.toString(), throwable);
                            });
                        };
                        JsonModelSerializer.printJSON = function (elem, builder) {
                            if (elem != null) {
                                var raw = elem.view().dimension().universe().storage().raw(elem, org.kevoree.modeling.api.data.AccessMode.READ);
                                if (raw != null) {
                                    builder.append(org.kevoree.modeling.api.data.JsonRaw.encode(raw, elem.uuid(), elem.metaClass()));
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
                        JsonModelSerializer.DIM_META = "@dimension";
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
                            if (originalObject == null || originalObject.view() == null || originalObject.view().dimension() == null) {
                                callback(null);
                            }
                            else {
                                originalObject.view().dimension().fork(function (o) {
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
                            origin.treeVisit(function (elem) {
                                objectsMap.put(elem.uuid(), elem);
                                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            }, function (throwable) {
                                if (throwable != null) {
                                    throwable.printStackTrace();
                                    callback(null);
                                }
                                else {
                                    target.treeVisit(function (elem) {
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
                                    });
                                }
                            });
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
                                    var payload = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[reference.index()];
                                    valuesRef.put(reference, payload);
                                }
                                if (sibling != null) {
                                    for (var i = 0; i < sibling.metaClass().metaReferences().length; i++) {
                                        var reference = sibling.metaClass().metaReferences()[i];
                                        var payload2 = sibling.view().dimension().universe().storage().raw(sibling, org.kevoree.modeling.api.data.AccessMode.READ)[reference.index()];
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
                    var DefaultModelSlicer = (function () {
                        function DefaultModelSlicer() {
                        }
                        DefaultModelSlicer.internal_prune = function (elem, traces, cache, parentMap, callback) {
                            var parents = new java.util.ArrayList();
                            var parentExplorer = new java.util.ArrayList();
                            parentExplorer.add(function (currentParent) {
                                if (currentParent != null && parentMap.get(currentParent.uuid()) == null && cache.get(currentParent.uuid()) == null) {
                                    parents.add(currentParent);
                                    currentParent.parent(parentExplorer.get(0));
                                    callback(null);
                                }
                                else {
                                    java.util.Collections.reverse(parents);
                                    var parentsArr = parents.toArray(new Array());
                                    for (var k = 0; k < parentsArr.length; k++) {
                                        var parent = parentsArr[k];
                                        if (parent.parentUuid() != null) {
                                            traces.add(new org.kevoree.modeling.api.trace.ModelNewTrace(parent.uuid(), parent.metaClass()));
                                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(parent.parentUuid(), parent.referenceInParent(), parent.uuid()));
                                        }
                                        var toAdd = elem.traces(org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_ONLY);
                                        for (var i = 0; i < toAdd.length; i++) {
                                            traces.add(toAdd[i]);
                                        }
                                        parentMap.put(parent.uuid(), parent);
                                    }
                                    if (cache.get(elem.uuid()) == null && parentMap.get(elem.uuid()) == null) {
                                        if (elem.parentUuid() != null) {
                                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.parentUuid(), elem.referenceInParent(), elem.uuid()));
                                        }
                                        var toAdd = elem.traces(org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_ONLY);
                                        for (var i = 0; i < toAdd.length; i++) {
                                            traces.add(toAdd[i]);
                                        }
                                    }
                                    cache.put(elem.uuid(), elem);
                                    elem.graphVisit(function (elem) {
                                        if (cache.get(elem.uuid()) == null) {
                                            org.kevoree.modeling.api.operation.DefaultModelSlicer.internal_prune(elem, traces, cache, parentMap, function (throwable) {
                                            });
                                        }
                                        return org.kevoree.modeling.api.VisitResult.CONTINUE;
                                    }, function (throwable) {
                                        callback(null);
                                    });
                                }
                            });
                            traces.add(new org.kevoree.modeling.api.trace.ModelNewTrace(elem.uuid(), elem.metaClass()));
                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.uuid(), null, elem.uuid()));
                            elem.parent(parentExplorer.get(0));
                        };
                        DefaultModelSlicer.slice = function (elems, callback) {
                            var traces = new java.util.ArrayList();
                            var tempMap = new java.util.HashMap();
                            var parentMap = new java.util.HashMap();
                            var elemsArr = elems.toArray(new Array());
                            org.kevoree.modeling.api.util.Helper.forall(elemsArr, function (obj, next) {
                                org.kevoree.modeling.api.operation.DefaultModelSlicer.internal_prune(obj, traces, tempMap, parentMap, next);
                            }, function (throwable) {
                                var toLinkKeysArr = tempMap.keySet().toArray(new Array());
                                for (var k = 0; k < toLinkKeysArr.length; k++) {
                                    var toLink = tempMap.get(toLinkKeysArr[k]);
                                    var toAdd = toLink.traces(org.kevoree.modeling.api.TraceRequest.REFERENCES_ONLY);
                                    for (var i = 0; i < toAdd.length; i++) {
                                        traces.add(toAdd[i]);
                                    }
                                }
                                callback(new org.kevoree.modeling.api.trace.TraceSequence().populate(traces));
                            });
                        };
                        return DefaultModelSlicer;
                    })();
                    operation.DefaultModelSlicer = DefaultModelSlicer;
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
                var promise;
                (function (promise) {
                    var DefaultKTraversalPromise = (function () {
                        function DefaultKTraversalPromise(p_root, p_ref) {
                            this._terminated = false;
                            this._initAction = new org.kevoree.modeling.api.promise.actions.KTraverseAction(p_ref);
                            this._initObjs = new Array();
                            this._initObjs[0] = p_root;
                            this._lastAction = this._initAction;
                        }
                        DefaultKTraversalPromise.prototype.traverse = function (p_metaReference) {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
                            }
                            var tempAction = new org.kevoree.modeling.api.promise.actions.KTraverseAction(p_metaReference);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        };
                        DefaultKTraversalPromise.prototype.attribute = function (p_attribute, p_expectedValue) {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
                            }
                            var tempAction = new org.kevoree.modeling.api.promise.actions.KFilterAttributeAction(p_attribute, p_expectedValue);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        };
                        DefaultKTraversalPromise.prototype.filter = function (p_filter) {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
                            }
                            var tempAction = new org.kevoree.modeling.api.promise.actions.KFilterAction(p_filter);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        };
                        DefaultKTraversalPromise.prototype.then = function (callback) {
                            this._terminated = true;
                            this._lastAction.chain(new org.kevoree.modeling.api.promise.actions.KFinalAction(callback));
                            this._initAction.execute(this._initObjs);
                        };
                        DefaultKTraversalPromise.prototype.map = function (attribute, callback) {
                            this._terminated = true;
                            this._lastAction.chain(new org.kevoree.modeling.api.promise.actions.KMapAction(attribute, callback));
                            this._initAction.execute(this._initObjs);
                        };
                        return DefaultKTraversalPromise;
                    })();
                    promise.DefaultKTraversalPromise = DefaultKTraversalPromise;
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
                                var nextStep = new java.util.ArrayList();
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
                                    var nextStep = new java.util.ArrayList();
                                    for (var i = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj = p_inputs[i];
                                            var raw = currentView.dimension().universe().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
                                            if (raw != null) {
                                                if (this._attribute == null) {
                                                    if (this._expectedValue == null) {
                                                        nextStep.add(loopObj);
                                                    }
                                                    else {
                                                        for (var j = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                                            var ref = loopObj.metaClass().metaAttributes()[j];
                                                            var resolved = raw[ref.index()];
                                                            if (resolved == null) {
                                                                if (this._expectedValue.toString().equals("*")) {
                                                                    nextStep.add(loopObj);
                                                                }
                                                                else {
                                                                }
                                                            }
                                                            else {
                                                                if (resolved == this._expectedValue) {
                                                                    nextStep.add(loopObj);
                                                                }
                                                                else {
                                                                    if (resolved.toString().matches(this._expectedValue.toString().replace("*", ".*"))) {
                                                                        nextStep.add(loopObj);
                                                                    }
                                                                    else {
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                else {
                                                    var translatedAtt = loopObj.internal_transpose_att(this._attribute);
                                                    if (translatedAtt != null) {
                                                        var resolved = raw[translatedAtt.index()];
                                                        if (this._expectedValue == null) {
                                                            nextStep.add(loopObj);
                                                        }
                                                        else {
                                                            if (resolved == null) {
                                                                if (this._expectedValue.toString().equals("*")) {
                                                                    nextStep.add(loopObj);
                                                                }
                                                                else {
                                                                }
                                                            }
                                                            else {
                                                                if (resolved == this._expectedValue) {
                                                                    nextStep.add(loopObj);
                                                                }
                                                                else {
                                                                    if (resolved.toString().matches(this._expectedValue.toString().replace("*", ".*"))) {
                                                                        nextStep.add(loopObj);
                                                                    }
                                                                    else {
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
                                    var nextIds = new java.util.ArrayList();
                                    for (var i = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj = p_inputs[i];
                                            var raw = currentView.dimension().universe().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
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
                    })(actions = promise.actions || (promise.actions = {}));
                })(promise = api.promise || (api.promise = {}));
                var select;
                (function (select) {
                    var KQuery = (function () {
                        function KQuery(relationName, params, subQuery, oldString, previousIsDeep, previousIsRefDeep) {
                            this.relationName = relationName;
                            this.params = params;
                            this.subQuery = subQuery;
                            this.oldString = oldString;
                            this.previousIsDeep = previousIsDeep;
                            this.previousIsRefDeep = previousIsRefDeep;
                        }
                        KQuery.extractFirstQuery = function (query) {
                            if (query == null || query.length == 0) {
                                return null;
                            }
                            if (query.charAt(0) == KQuery.QUERY_SEP) {
                                var subQuery = null;
                                if (query.length > 1) {
                                    subQuery = query.substring(1);
                                }
                                var params = new java.util.HashMap();
                                return new org.kevoree.modeling.api.select.KQuery("", params, subQuery, "" + KQuery.QUERY_SEP, false, false);
                            }
                            if (query.startsWith("**/")) {
                                if (query.length > 3) {
                                    var next = org.kevoree.modeling.api.select.KQuery.extractFirstQuery(query.substring(3));
                                    if (next != null) {
                                        next.previousIsDeep = true;
                                        next.previousIsRefDeep = false;
                                    }
                                    return next;
                                }
                                else {
                                    return null;
                                }
                            }
                            if (query.startsWith("***/")) {
                                if (query.length > 4) {
                                    var next = org.kevoree.modeling.api.select.KQuery.extractFirstQuery(query.substring(4));
                                    if (next != null) {
                                        next.previousIsDeep = true;
                                        next.previousIsRefDeep = true;
                                    }
                                    return next;
                                }
                                else {
                                    return null;
                                }
                            }
                            var i = 0;
                            var relationNameEnd = 0;
                            var attsEnd = 0;
                            var escaped = false;
                            while (i < query.length && ((query.charAt(i) != KQuery.QUERY_SEP) || escaped)) {
                                if (escaped) {
                                    escaped = false;
                                }
                                if (query.charAt(i) == KQuery.OPEN_BRACKET) {
                                    relationNameEnd = i;
                                }
                                else {
                                    if (query.charAt(i) == KQuery.CLOSE_BRACKET) {
                                        attsEnd = i;
                                    }
                                    else {
                                        if (query.charAt(i) == '\\') {
                                            escaped = true;
                                        }
                                    }
                                }
                                i = i + 1;
                            }
                            if (i > 0 && relationNameEnd > 0) {
                                var oldString = query.substring(0, i);
                                var subQuery = null;
                                if (i + 1 < query.length) {
                                    subQuery = query.substring(i + 1);
                                }
                                var relName = query.substring(0, relationNameEnd);
                                var params = new java.util.HashMap();
                                relName = relName.replace("\\", "");
                                if (attsEnd != 0) {
                                    var paramString = query.substring(relationNameEnd + 1, attsEnd);
                                    var iParam = 0;
                                    var lastStart = iParam;
                                    escaped = false;
                                    while (iParam < paramString.length) {
                                        if (paramString.charAt(iParam) == ',' && !escaped) {
                                            var p = paramString.substring(lastStart, iParam).trim();
                                            if (p.equals("") && !p.equals("*")) {
                                                if (p.endsWith("=")) {
                                                    p = p + "*";
                                                }
                                                var pArray = p.split("=");
                                                var pObject;
                                                if (pArray.length > 1) {
                                                    var paramKey = pArray[0].trim();
                                                    var negative = paramKey.endsWith("!");
                                                    pObject = new org.kevoree.modeling.api.select.KQueryParam(paramKey.replace("!", ""), pArray[1].trim(), negative);
                                                    params.put(pObject.name(), pObject);
                                                }
                                                else {
                                                    pObject = new org.kevoree.modeling.api.select.KQueryParam(null, p, false);
                                                    params.put("@id", pObject);
                                                }
                                            }
                                            lastStart = iParam + 1;
                                        }
                                        else {
                                            if (paramString.charAt(iParam) == '\\') {
                                                escaped = true;
                                            }
                                            else {
                                                escaped = false;
                                            }
                                        }
                                        iParam = iParam + 1;
                                    }
                                    var lastParam = paramString.substring(lastStart, iParam).trim();
                                    if (!lastParam.equals("") && !lastParam.equals("*")) {
                                        if (lastParam.endsWith("=")) {
                                            lastParam = lastParam + "*";
                                        }
                                        var pArray = lastParam.split("=");
                                        var pObject;
                                        if (pArray.length > 1) {
                                            var paramKey = pArray[0].trim();
                                            var negative = paramKey.endsWith("!");
                                            pObject = new org.kevoree.modeling.api.select.KQueryParam(paramKey.replace("!", ""), pArray[1].trim(), negative);
                                            params.put(pObject.name(), pObject);
                                        }
                                        else {
                                            pObject = new org.kevoree.modeling.api.select.KQueryParam(null, lastParam, false);
                                            params.put("@id", pObject);
                                        }
                                    }
                                }
                                return new org.kevoree.modeling.api.select.KQuery(relName, params, subQuery, oldString, false, false);
                            }
                            return null;
                        };
                        KQuery.OPEN_BRACKET = '[';
                        KQuery.CLOSE_BRACKET = ']';
                        KQuery.QUERY_SEP = '/';
                        return KQuery;
                    })();
                    select.KQuery = KQuery;
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
                    select.KQueryParam = KQueryParam;
                    var KSelector = (function () {
                        function KSelector() {
                        }
                        KSelector.select = function (view, roots, query, callback) {
                            if (callback == null) {
                                return;
                            }
                            var extractedQuery = org.kevoree.modeling.api.select.KQuery.extractFirstQuery(query);
                            if (extractedQuery == null) {
                                callback(new Array());
                            }
                            else {
                                var relationNameRegex = extractedQuery.relationName.replace("*", ".*");
                                var collected = new java.util.HashSet();
                                for (var k = 0; k < roots.length; k++) {
                                    var root = roots[k];
                                    var raw = root.dimension().universe().storage().raw(root, org.kevoree.modeling.api.data.AccessMode.READ);
                                    if (raw != null) {
                                        for (var i = 0; i < root.metaClass().metaReferences().length; i++) {
                                            var reference = root.metaClass().metaReferences()[i];
                                            if (reference.metaName().matches(relationNameRegex)) {
                                                var refPayLoad = raw[reference.index()];
                                                if (refPayLoad != null) {
                                                    if (refPayLoad instanceof java.util.Set) {
                                                        var castedSet = refPayLoad;
                                                        collected.addAll(castedSet);
                                                    }
                                                    else {
                                                        var castedLong = refPayLoad;
                                                        collected.add(castedLong);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                view.lookupAll(collected.toArray(new Array()), function (resolveds) {
                                    var nextGeneration = new java.util.ArrayList();
                                    if (extractedQuery.params.isEmpty()) {
                                        for (var i = 0; i < resolveds.length; i++) {
                                            nextGeneration.add(resolveds[i]);
                                        }
                                    }
                                    else {
                                        for (var i = 0; i < resolveds.length; i++) {
                                            var resolved = resolveds[i];
                                            var selectedForNext = true;
                                            var paramKeys = extractedQuery.params.keySet().toArray(new Array());
                                            for (var h = 0; h < paramKeys.length; h++) {
                                                var param = extractedQuery.params.get(paramKeys[h]);
                                                for (var j = 0; j < resolved.metaClass().metaAttributes().length; j++) {
                                                    var metaAttribute = resolved.metaClass().metaAttributes()[j];
                                                    if (metaAttribute.metaName().matches(param.name().replace("*", ".*"))) {
                                                        var o_raw = resolved.get(metaAttribute);
                                                        if (o_raw != null) {
                                                            if (o_raw.toString().matches(param.value().replace("*", ".*"))) {
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
                                                        else {
                                                            if (!param.isNegative() && !param.value().equals("null")) {
                                                                selectedForNext = false;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            if (selectedForNext) {
                                                nextGeneration.add(resolved);
                                            }
                                        }
                                    }
                                    var nextArr = nextGeneration.toArray(new Array());
                                    if (extractedQuery.subQuery == null || extractedQuery.subQuery.isEmpty()) {
                                        callback(nextArr);
                                    }
                                    else {
                                        org.kevoree.modeling.api.select.KSelector.select(view, nextArr, extractedQuery.subQuery, callback);
                                    }
                                });
                            }
                        };
                        return KSelector;
                    })();
                    select.KSelector = KSelector;
                })(select = api.select || (api.select = {}));
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
                            this.operationCallbacks = new java.util.HashMap();
                            this._store = store;
                        }
                        DefaultOperationManager.prototype.registerOperation = function (operation, callback) {
                            var clazzOperations = this.operationCallbacks.get(operation.origin().index());
                            if (clazzOperations == null) {
                                clazzOperations = new java.util.HashMap();
                                this.operationCallbacks.put(operation.origin().index(), clazzOperations);
                            }
                            clazzOperations.put(operation.index(), callback);
                        };
                        DefaultOperationManager.prototype.call = function (source, operation, param, callback) {
                            var clazzOperations = this.operationCallbacks.get(source.metaClass().index());
                            if (clazzOperations != null) {
                                var operationCore = clazzOperations.get(operation.index());
                                if (callback != null) {
                                    operationCore(source, param, callback);
                                }
                                else {
                                }
                            }
                            else {
                            }
                        };
                        return DefaultOperationManager;
                    })();
                    util.DefaultOperationManager = DefaultOperationManager;
                    var Helper = (function () {
                        function Helper() {
                        }
                        Helper.forall = function (inputs, each, end) {
                            if (inputs == null) {
                                return;
                            }
                            org.kevoree.modeling.api.util.Helper.process(inputs, 0, each, end);
                        };
                        Helper.process = function (arr, index, each, end) {
                            if (index >= arr.length) {
                                if (end != null) {
                                    end(null);
                                }
                            }
                            else {
                                var obj = arr[index];
                                each(obj, function (err) {
                                    if (err != null) {
                                        if (end != null) {
                                            end(err);
                                        }
                                    }
                                    else {
                                        org.kevoree.modeling.api.util.Helper.process(arr, index + 1, each, end);
                                    }
                                });
                            }
                        };
                        Helper.parentPath = function (currentPath) {
                            if (currentPath == null || currentPath.length == 0) {
                                return null;
                            }
                            if (currentPath.length == 1) {
                                return null;
                            }
                            var lastIndex = currentPath.lastIndexOf(Helper.pathSep);
                            if (lastIndex != -1) {
                                if (lastIndex == 0) {
                                    return Helper.rootPath;
                                }
                                else {
                                    return currentPath.substring(0, lastIndex);
                                }
                            }
                            else {
                                return null;
                            }
                        };
                        Helper.attachedToRoot = function (path) {
                            return path.length > 0 && path.charAt(0) == Helper.pathSep;
                        };
                        Helper.isRoot = function (path) {
                            return path.length == 1 && path.charAt(0) == org.kevoree.modeling.api.util.Helper.pathSep;
                        };
                        Helper.path = function (parent, reference, target) {
                            if (org.kevoree.modeling.api.util.Helper.isRoot(parent)) {
                                return Helper.pathSep + reference.metaName() + Helper.pathIDOpen + target.domainKey() + Helper.pathIDClose;
                            }
                            else {
                                return parent + Helper.pathSep + reference.metaName() + Helper.pathIDOpen + target.domainKey() + Helper.pathIDClose;
                            }
                        };
                        Helper.pathSep = '/';
                        Helper.pathIDOpen = '[';
                        Helper.pathIDClose = ']';
                        Helper.rootPath = "/";
                        return Helper;
                    })();
                    util.Helper = Helper;
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
                                    this._previous.dimension().universe().storage().eventBroker().unregister(this._listener);
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
                                this._previous.dimension().universe().dimension(targetDimension).time(this._previous.now()).lookup(this._previous.uuid(), function (resolved) {
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
                            model.treeVisit(function (elem) {
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
                            }, function (throwable) {
                                if (throwable != null) {
                                    context.finishCallback(null, throwable);
                                }
                                else {
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
                                    org.kevoree.modeling.api.util.Helper.forall(context.model.metaClass().metaReferences(), function (metaReference, next) {
                                        org.kevoree.modeling.api.xmi.XMIModelSerializer.nonContainedReferencesCallbackChain(metaReference, next, context, context.model);
                                    }, function (err) {
                                        if (err == null) {
                                            context.printer.append(">\n");
                                            org.kevoree.modeling.api.util.Helper.forall(context.model.metaClass().metaReferences(), function (metaReference, next) {
                                                org.kevoree.modeling.api.xmi.XMIModelSerializer.containedReferencesCallbackChain(metaReference, next, context, context.model);
                                            }, function (containedRefsEnd) {
                                                if (containedRefsEnd == null) {
                                                    context.printer.append("</" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_") + ">\n");
                                                    context.finishCallback(context.printer.toString(), null);
                                                }
                                                else {
                                                    context.finishCallback(null, containedRefsEnd);
                                                }
                                            });
                                        }
                                        else {
                                            context.finishCallback(null, err);
                                        }
                                    });
                                }
                            });
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
                        XMIModelSerializer.nonContainedReferencesCallbackChain = function (ref, next, p_context, p_currentElement) {
                            if (!ref.contained()) {
                                var value = new Array();
                                p_currentElement.all(ref, function (objs) {
                                    for (var i = 0; i < objs.length; i++) {
                                        var adjustedAddress = p_context.addressTable.get(objs[i].uuid());
                                        p_context.printer.append(" " + ref.metaName() + "=\"" + adjustedAddress + "\"");
                                    }
                                    next(null);
                                });
                            }
                            else {
                                next(null);
                            }
                        };
                        XMIModelSerializer.containedReferencesCallbackChain = function (ref, nextReference, context, currentElement) {
                            if (ref.contained()) {
                                currentElement.all(ref, function (objs) {
                                    for (var i = 0; i < objs.length; i++) {
                                        var elem = objs[i];
                                        context.printer.append("<");
                                        context.printer.append(ref.metaName());
                                        context.printer.append(" xsi:type=\"" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(elem.metaClass().metaName()) + "\"");
                                        elem.visitAttributes(context.attributesVisitor);
                                        org.kevoree.modeling.api.util.Helper.forall(elem.metaClass().metaReferences(), function (metaReference, next) {
                                            org.kevoree.modeling.api.xmi.XMIModelSerializer.nonContainedReferencesCallbackChain(metaReference, next, context, elem);
                                        }, function (err) {
                                            if (err == null) {
                                                context.printer.append(">\n");
                                                org.kevoree.modeling.api.util.Helper.forall(elem.metaClass().metaReferences(), function (metaReference, next) {
                                                    org.kevoree.modeling.api.xmi.XMIModelSerializer.containedReferencesCallbackChain(metaReference, next, context, elem);
                                                }, function (containedRefsEnd) {
                                                    if (containedRefsEnd == null) {
                                                        context.printer.append("</");
                                                        context.printer.append(ref.metaName());
                                                        context.printer.append('>');
                                                        context.printer.append("\n");
                                                    }
                                                });
                                            }
                                            else {
                                                context.finishCallback(null, err);
                                            }
                                        });
                                    }
                                    nextReference(null);
                                });
                            }
                            else {
                                nextReference(null);
                            }
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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var org;
(function (org) {
    var KevoreeDimension = (function (_super) {
        __extends(KevoreeDimension, _super);
        function KevoreeDimension(universe, key) {
            _super.call(this, universe, key);
        }
        KevoreeDimension.prototype.internal_create = function (timePoint) {
            return new org.impl.KevoreeViewImpl(timePoint, this);
        };
        return KevoreeDimension;
    })(org.kevoree.modeling.api.abs.AbstractKDimension);
    org.KevoreeDimension = KevoreeDimension;
    var KevoreeUniverse = (function (_super) {
        __extends(KevoreeUniverse, _super);
        function KevoreeUniverse() {
            _super.call(this);
            this._metaModel = new org.kevoree.modeling.api.abs.AbstractMetaModel("Kevoree", -1);
            var tempMetaClasses = new Array();
            tempMetaClasses[0] = org.kevoree.meta.MetaComponentInstance.getInstance();
            tempMetaClasses[12] = org.kevoree.meta.MetaMBinding.getInstance();
            tempMetaClasses[16] = org.kevoree.meta.MetaPortType.getInstance();
            tempMetaClasses[25] = org.kevoree.meta.MetaOperation.getInstance();
            tempMetaClasses[1] = org.kevoree.meta.MetaPort.getInstance();
            tempMetaClasses[30] = org.kevoree.meta.MetaNodeType.getInstance();
            tempMetaClasses[8] = org.kevoree.meta.MetaNetworkInfo.getInstance();
            tempMetaClasses[29] = org.kevoree.meta.MetaGroupType.getInstance();
            tempMetaClasses[2] = org.kevoree.meta.MetaInstance.getInstance();
            tempMetaClasses[6] = org.kevoree.meta.MetaContainerNode.getInstance();
            tempMetaClasses[23] = org.kevoree.meta.MetaPortTypeMapping.getInstance();
            tempMetaClasses[10] = org.kevoree.meta.MetaRepository.getInstance();
            tempMetaClasses[18] = org.kevoree.meta.MetaValue.getInstance();
            tempMetaClasses[27] = org.kevoree.meta.MetaMessagePortType.getInstance();
            tempMetaClasses[14] = org.kevoree.meta.MetaDeployUnit.getInstance();
            tempMetaClasses[11] = org.kevoree.meta.MetaChannel.getInstance();
            tempMetaClasses[20] = org.kevoree.meta.MetaDictionaryType.getInstance();
            tempMetaClasses[7] = org.kevoree.meta.MetaGroup.getInstance();
            tempMetaClasses[21] = org.kevoree.meta.MetaDictionaryAttribute.getInstance();
            tempMetaClasses[9] = org.kevoree.meta.MetaContainerRoot.getInstance();
            tempMetaClasses[15] = org.kevoree.meta.MetaNamedElement.getInstance();
            tempMetaClasses[17] = org.kevoree.meta.MetaDictionary.getInstance();
            tempMetaClasses[19] = org.kevoree.meta.MetaFragmentDictionary.getInstance();
            tempMetaClasses[13] = org.kevoree.meta.MetaPackage.getInstance();
            tempMetaClasses[5] = org.kevoree.meta.MetaTypeDefinition.getInstance();
            tempMetaClasses[28] = org.kevoree.meta.MetaChannelType.getInstance();
            tempMetaClasses[24] = org.kevoree.meta.MetaServicePortType.getInstance();
            tempMetaClasses[3] = org.kevoree.meta.MetaComponentType.getInstance();
            tempMetaClasses[4] = org.kevoree.meta.MetaPortTypeRef.getInstance();
            tempMetaClasses[22] = org.kevoree.meta.MetaTypedElement.getInstance();
            tempMetaClasses[26] = org.kevoree.meta.MetaParameter.getInstance();
            this._metaModel.init(tempMetaClasses);
        }
        KevoreeUniverse.prototype.internal_create = function (key) {
            return new org.KevoreeDimension(this, key);
        };
        KevoreeUniverse.prototype.metaModel = function () {
            return this._metaModel;
        };
        return KevoreeUniverse;
    })(org.kevoree.modeling.api.abs.AbstractKUniverse);
    org.KevoreeUniverse = KevoreeUniverse;
    var impl;
    (function (impl) {
        var KevoreeViewImpl = (function (_super) {
            __extends(KevoreeViewImpl, _super);
            function KevoreeViewImpl(p_now, p_dimension) {
                _super.call(this, p_now, p_dimension);
            }
            KevoreeViewImpl.prototype.internalCreate = function (p_clazz, p_timeTree, p_key) {
                if (p_clazz == null) {
                    return null;
                }
                switch (p_clazz.index()) {
                    case 0:
                        return new org.kevoree.impl.ComponentInstanceImpl(this, p_key, p_timeTree, p_clazz);
                    case 12:
                        return new org.kevoree.impl.MBindingImpl(this, p_key, p_timeTree, p_clazz);
                    case 16:
                        return new org.kevoree.impl.PortTypeImpl(this, p_key, p_timeTree, p_clazz);
                    case 25:
                        return new org.kevoree.impl.OperationImpl(this, p_key, p_timeTree, p_clazz);
                    case 1:
                        return new org.kevoree.impl.PortImpl(this, p_key, p_timeTree, p_clazz);
                    case 30:
                        return new org.kevoree.impl.NodeTypeImpl(this, p_key, p_timeTree, p_clazz);
                    case 8:
                        return new org.kevoree.impl.NetworkInfoImpl(this, p_key, p_timeTree, p_clazz);
                    case 29:
                        return new org.kevoree.impl.GroupTypeImpl(this, p_key, p_timeTree, p_clazz);
                    case 2:
                        return new org.kevoree.impl.InstanceImpl(this, p_key, p_timeTree, p_clazz);
                    case 6:
                        return new org.kevoree.impl.ContainerNodeImpl(this, p_key, p_timeTree, p_clazz);
                    case 23:
                        return new org.kevoree.impl.PortTypeMappingImpl(this, p_key, p_timeTree, p_clazz);
                    case 10:
                        return new org.kevoree.impl.RepositoryImpl(this, p_key, p_timeTree, p_clazz);
                    case 18:
                        return new org.kevoree.impl.ValueImpl(this, p_key, p_timeTree, p_clazz);
                    case 27:
                        return new org.kevoree.impl.MessagePortTypeImpl(this, p_key, p_timeTree, p_clazz);
                    case 14:
                        return new org.kevoree.impl.DeployUnitImpl(this, p_key, p_timeTree, p_clazz);
                    case 11:
                        return new org.kevoree.impl.ChannelImpl(this, p_key, p_timeTree, p_clazz);
                    case 20:
                        return new org.kevoree.impl.DictionaryTypeImpl(this, p_key, p_timeTree, p_clazz);
                    case 7:
                        return new org.kevoree.impl.GroupImpl(this, p_key, p_timeTree, p_clazz);
                    case 21:
                        return new org.kevoree.impl.DictionaryAttributeImpl(this, p_key, p_timeTree, p_clazz);
                    case 9:
                        return new org.kevoree.impl.ContainerRootImpl(this, p_key, p_timeTree, p_clazz);
                    case 15:
                        return new org.kevoree.impl.NamedElementImpl(this, p_key, p_timeTree, p_clazz);
                    case 17:
                        return new org.kevoree.impl.DictionaryImpl(this, p_key, p_timeTree, p_clazz);
                    case 19:
                        return new org.kevoree.impl.FragmentDictionaryImpl(this, p_key, p_timeTree, p_clazz);
                    case 13:
                        return new org.kevoree.impl.PackageImpl(this, p_key, p_timeTree, p_clazz);
                    case 5:
                        return new org.kevoree.impl.TypeDefinitionImpl(this, p_key, p_timeTree, p_clazz);
                    case 28:
                        return new org.kevoree.impl.ChannelTypeImpl(this, p_key, p_timeTree, p_clazz);
                    case 24:
                        return new org.kevoree.impl.ServicePortTypeImpl(this, p_key, p_timeTree, p_clazz);
                    case 3:
                        return new org.kevoree.impl.ComponentTypeImpl(this, p_key, p_timeTree, p_clazz);
                    case 4:
                        return new org.kevoree.impl.PortTypeRefImpl(this, p_key, p_timeTree, p_clazz);
                    case 22:
                        return new org.kevoree.impl.TypedElementImpl(this, p_key, p_timeTree, p_clazz);
                    case 26:
                        return new org.kevoree.impl.ParameterImpl(this, p_key, p_timeTree, p_clazz);
                    default:
                        return new org.kevoree.modeling.api.abs.DynamicKObject(this, p_key, p_timeTree, p_clazz);
                }
            };
            KevoreeViewImpl.prototype.createComponentInstance = function () {
                return this.create(org.kevoree.meta.MetaComponentInstance.getInstance());
            };
            KevoreeViewImpl.prototype.createMBinding = function () {
                return this.create(org.kevoree.meta.MetaMBinding.getInstance());
            };
            KevoreeViewImpl.prototype.createPortType = function () {
                return this.create(org.kevoree.meta.MetaPortType.getInstance());
            };
            KevoreeViewImpl.prototype.createOperation = function () {
                return this.create(org.kevoree.meta.MetaOperation.getInstance());
            };
            KevoreeViewImpl.prototype.createPort = function () {
                return this.create(org.kevoree.meta.MetaPort.getInstance());
            };
            KevoreeViewImpl.prototype.createNodeType = function () {
                return this.create(org.kevoree.meta.MetaNodeType.getInstance());
            };
            KevoreeViewImpl.prototype.createNetworkInfo = function () {
                return this.create(org.kevoree.meta.MetaNetworkInfo.getInstance());
            };
            KevoreeViewImpl.prototype.createGroupType = function () {
                return this.create(org.kevoree.meta.MetaGroupType.getInstance());
            };
            KevoreeViewImpl.prototype.createInstance = function () {
                return this.create(org.kevoree.meta.MetaInstance.getInstance());
            };
            KevoreeViewImpl.prototype.createContainerNode = function () {
                return this.create(org.kevoree.meta.MetaContainerNode.getInstance());
            };
            KevoreeViewImpl.prototype.createPortTypeMapping = function () {
                return this.create(org.kevoree.meta.MetaPortTypeMapping.getInstance());
            };
            KevoreeViewImpl.prototype.createRepository = function () {
                return this.create(org.kevoree.meta.MetaRepository.getInstance());
            };
            KevoreeViewImpl.prototype.createValue = function () {
                return this.create(org.kevoree.meta.MetaValue.getInstance());
            };
            KevoreeViewImpl.prototype.createMessagePortType = function () {
                return this.create(org.kevoree.meta.MetaMessagePortType.getInstance());
            };
            KevoreeViewImpl.prototype.createDeployUnit = function () {
                return this.create(org.kevoree.meta.MetaDeployUnit.getInstance());
            };
            KevoreeViewImpl.prototype.createChannel = function () {
                return this.create(org.kevoree.meta.MetaChannel.getInstance());
            };
            KevoreeViewImpl.prototype.createDictionaryType = function () {
                return this.create(org.kevoree.meta.MetaDictionaryType.getInstance());
            };
            KevoreeViewImpl.prototype.createGroup = function () {
                return this.create(org.kevoree.meta.MetaGroup.getInstance());
            };
            KevoreeViewImpl.prototype.createDictionaryAttribute = function () {
                return this.create(org.kevoree.meta.MetaDictionaryAttribute.getInstance());
            };
            KevoreeViewImpl.prototype.createContainerRoot = function () {
                return this.create(org.kevoree.meta.MetaContainerRoot.getInstance());
            };
            KevoreeViewImpl.prototype.createNamedElement = function () {
                return this.create(org.kevoree.meta.MetaNamedElement.getInstance());
            };
            KevoreeViewImpl.prototype.createDictionary = function () {
                return this.create(org.kevoree.meta.MetaDictionary.getInstance());
            };
            KevoreeViewImpl.prototype.createFragmentDictionary = function () {
                return this.create(org.kevoree.meta.MetaFragmentDictionary.getInstance());
            };
            KevoreeViewImpl.prototype.createPackage = function () {
                return this.create(org.kevoree.meta.MetaPackage.getInstance());
            };
            KevoreeViewImpl.prototype.createTypeDefinition = function () {
                return this.create(org.kevoree.meta.MetaTypeDefinition.getInstance());
            };
            KevoreeViewImpl.prototype.createChannelType = function () {
                return this.create(org.kevoree.meta.MetaChannelType.getInstance());
            };
            KevoreeViewImpl.prototype.createServicePortType = function () {
                return this.create(org.kevoree.meta.MetaServicePortType.getInstance());
            };
            KevoreeViewImpl.prototype.createComponentType = function () {
                return this.create(org.kevoree.meta.MetaComponentType.getInstance());
            };
            KevoreeViewImpl.prototype.createPortTypeRef = function () {
                return this.create(org.kevoree.meta.MetaPortTypeRef.getInstance());
            };
            KevoreeViewImpl.prototype.createTypedElement = function () {
                return this.create(org.kevoree.meta.MetaTypedElement.getInstance());
            };
            KevoreeViewImpl.prototype.createParameter = function () {
                return this.create(org.kevoree.meta.MetaParameter.getInstance());
            };
            KevoreeViewImpl.prototype.dimension = function () {
                return _super.prototype.dimension.call(this);
            };
            return KevoreeViewImpl;
        })(org.kevoree.modeling.api.abs.AbstractKView);
        impl.KevoreeViewImpl = KevoreeViewImpl;
    })(impl = org.impl || (org.impl = {}));
    var kevoree;
    (function (kevoree) {
        var DataType = (function () {
            function DataType() {
            }
            DataType.prototype.equals = function (other) {
                return this == other;
            };
            DataType.values = function () {
                return DataType._DataTypeVALUES;
            };
            DataType.BOOLEAN = new DataType();
            DataType.BYTE = new DataType();
            DataType.CHAR = new DataType();
            DataType.DOUBLE = new DataType();
            DataType.FLOAT = new DataType();
            DataType.INT = new DataType();
            DataType.LONG = new DataType();
            DataType.SHORT = new DataType();
            DataType.STRING = new DataType();
            DataType._DataTypeVALUES = [
                DataType.BOOLEAN,
                DataType.BYTE,
                DataType.CHAR,
                DataType.DOUBLE,
                DataType.FLOAT,
                DataType.INT,
                DataType.LONG,
                DataType.SHORT,
                DataType.STRING
            ];
            return DataType;
        })();
        kevoree.DataType = DataType;
        var impl;
        (function (impl) {
            var ChannelImpl = (function (_super) {
                __extends(ChannelImpl, _super);
                function ChannelImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                ChannelImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaChannel.ATT_NAME);
                };
                ChannelImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaChannel.ATT_NAME, p_obj);
                    return this;
                };
                ChannelImpl.prototype.getStarted = function () {
                    return this.get(org.kevoree.meta.MetaChannel.ATT_STARTED);
                };
                ChannelImpl.prototype.setStarted = function (p_obj) {
                    this.set(org.kevoree.meta.MetaChannel.ATT_STARTED, p_obj);
                    return this;
                };
                ChannelImpl.prototype.addMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaChannel.REF_METADATA, p_obj);
                    return this;
                };
                ChannelImpl.prototype.removeMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaChannel.REF_METADATA, p_obj);
                    return this;
                };
                ChannelImpl.prototype.eachMetaData = function (p_callback) {
                    this.all(org.kevoree.meta.MetaChannel.REF_METADATA, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ChannelImpl.prototype.sizeOfMetaData = function () {
                    return this.size(org.kevoree.meta.MetaChannel.REF_METADATA);
                };
                ChannelImpl.prototype.setDictionary = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaChannel.REF_DICTIONARY, p_obj);
                    return this;
                };
                ChannelImpl.prototype.getDictionary = function (p_callback) {
                    this.single(org.kevoree.meta.MetaChannel.REF_DICTIONARY, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                ChannelImpl.prototype.setTypeDefinition = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaChannel.REF_TYPEDEFINITION, p_obj);
                    return this;
                };
                ChannelImpl.prototype.getTypeDefinition = function (p_callback) {
                    this.single(org.kevoree.meta.MetaChannel.REF_TYPEDEFINITION, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                ChannelImpl.prototype.addBindings = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaChannel.REF_BINDINGS, p_obj);
                    return this;
                };
                ChannelImpl.prototype.removeBindings = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaChannel.REF_BINDINGS, p_obj);
                    return this;
                };
                ChannelImpl.prototype.eachBindings = function (p_callback) {
                    this.all(org.kevoree.meta.MetaChannel.REF_BINDINGS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ChannelImpl.prototype.sizeOfBindings = function () {
                    return this.size(org.kevoree.meta.MetaChannel.REF_BINDINGS);
                };
                ChannelImpl.prototype.addFragmentDictionary = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaChannel.REF_FRAGMENTDICTIONARY, p_obj);
                    return this;
                };
                ChannelImpl.prototype.removeFragmentDictionary = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaChannel.REF_FRAGMENTDICTIONARY, p_obj);
                    return this;
                };
                ChannelImpl.prototype.eachFragmentDictionary = function (p_callback) {
                    this.all(org.kevoree.meta.MetaChannel.REF_FRAGMENTDICTIONARY, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ChannelImpl.prototype.sizeOfFragmentDictionary = function () {
                    return this.size(org.kevoree.meta.MetaChannel.REF_FRAGMENTDICTIONARY);
                };
                ChannelImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return ChannelImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.ChannelImpl = ChannelImpl;
            var ChannelTypeImpl = (function (_super) {
                __extends(ChannelTypeImpl, _super);
                function ChannelTypeImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                ChannelTypeImpl.prototype.getUpperFragments = function () {
                    return this.get(org.kevoree.meta.MetaChannelType.ATT_UPPERFRAGMENTS);
                };
                ChannelTypeImpl.prototype.setUpperFragments = function (p_obj) {
                    this.set(org.kevoree.meta.MetaChannelType.ATT_UPPERFRAGMENTS, p_obj);
                    return this;
                };
                ChannelTypeImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaChannelType.ATT_NAME);
                };
                ChannelTypeImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaChannelType.ATT_NAME, p_obj);
                    return this;
                };
                ChannelTypeImpl.prototype.getAbstract = function () {
                    return this.get(org.kevoree.meta.MetaChannelType.ATT_ABSTRACT);
                };
                ChannelTypeImpl.prototype.setAbstract = function (p_obj) {
                    this.set(org.kevoree.meta.MetaChannelType.ATT_ABSTRACT, p_obj);
                    return this;
                };
                ChannelTypeImpl.prototype.getLowerBindings = function () {
                    return this.get(org.kevoree.meta.MetaChannelType.ATT_LOWERBINDINGS);
                };
                ChannelTypeImpl.prototype.setLowerBindings = function (p_obj) {
                    this.set(org.kevoree.meta.MetaChannelType.ATT_LOWERBINDINGS, p_obj);
                    return this;
                };
                ChannelTypeImpl.prototype.getLowerFragments = function () {
                    return this.get(org.kevoree.meta.MetaChannelType.ATT_LOWERFRAGMENTS);
                };
                ChannelTypeImpl.prototype.setLowerFragments = function (p_obj) {
                    this.set(org.kevoree.meta.MetaChannelType.ATT_LOWERFRAGMENTS, p_obj);
                    return this;
                };
                ChannelTypeImpl.prototype.getVersion = function () {
                    return this.get(org.kevoree.meta.MetaChannelType.ATT_VERSION);
                };
                ChannelTypeImpl.prototype.setVersion = function (p_obj) {
                    this.set(org.kevoree.meta.MetaChannelType.ATT_VERSION, p_obj);
                    return this;
                };
                ChannelTypeImpl.prototype.getUpperBindings = function () {
                    return this.get(org.kevoree.meta.MetaChannelType.ATT_UPPERBINDINGS);
                };
                ChannelTypeImpl.prototype.setUpperBindings = function (p_obj) {
                    this.set(org.kevoree.meta.MetaChannelType.ATT_UPPERBINDINGS, p_obj);
                    return this;
                };
                ChannelTypeImpl.prototype.addSuperTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaChannelType.REF_SUPERTYPES, p_obj);
                    return this;
                };
                ChannelTypeImpl.prototype.removeSuperTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaChannelType.REF_SUPERTYPES, p_obj);
                    return this;
                };
                ChannelTypeImpl.prototype.eachSuperTypes = function (p_callback) {
                    this.all(org.kevoree.meta.MetaChannelType.REF_SUPERTYPES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ChannelTypeImpl.prototype.sizeOfSuperTypes = function () {
                    return this.size(org.kevoree.meta.MetaChannelType.REF_SUPERTYPES);
                };
                ChannelTypeImpl.prototype.addMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaChannelType.REF_METADATA, p_obj);
                    return this;
                };
                ChannelTypeImpl.prototype.removeMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaChannelType.REF_METADATA, p_obj);
                    return this;
                };
                ChannelTypeImpl.prototype.eachMetaData = function (p_callback) {
                    this.all(org.kevoree.meta.MetaChannelType.REF_METADATA, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ChannelTypeImpl.prototype.sizeOfMetaData = function () {
                    return this.size(org.kevoree.meta.MetaChannelType.REF_METADATA);
                };
                ChannelTypeImpl.prototype.addDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaChannelType.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                ChannelTypeImpl.prototype.removeDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaChannelType.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                ChannelTypeImpl.prototype.eachDeployUnits = function (p_callback) {
                    this.all(org.kevoree.meta.MetaChannelType.REF_DEPLOYUNITS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ChannelTypeImpl.prototype.sizeOfDeployUnits = function () {
                    return this.size(org.kevoree.meta.MetaChannelType.REF_DEPLOYUNITS);
                };
                ChannelTypeImpl.prototype.setDictionaryType = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaChannelType.REF_DICTIONARYTYPE, p_obj);
                    return this;
                };
                ChannelTypeImpl.prototype.getDictionaryType = function (p_callback) {
                    this.single(org.kevoree.meta.MetaChannelType.REF_DICTIONARYTYPE, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                ChannelTypeImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return ChannelTypeImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.ChannelTypeImpl = ChannelTypeImpl;
            var ComponentInstanceImpl = (function (_super) {
                __extends(ComponentInstanceImpl, _super);
                function ComponentInstanceImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                ComponentInstanceImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaComponentInstance.ATT_NAME);
                };
                ComponentInstanceImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaComponentInstance.ATT_NAME, p_obj);
                    return this;
                };
                ComponentInstanceImpl.prototype.getStarted = function () {
                    return this.get(org.kevoree.meta.MetaComponentInstance.ATT_STARTED);
                };
                ComponentInstanceImpl.prototype.setStarted = function (p_obj) {
                    this.set(org.kevoree.meta.MetaComponentInstance.ATT_STARTED, p_obj);
                    return this;
                };
                ComponentInstanceImpl.prototype.addMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaComponentInstance.REF_METADATA, p_obj);
                    return this;
                };
                ComponentInstanceImpl.prototype.removeMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaComponentInstance.REF_METADATA, p_obj);
                    return this;
                };
                ComponentInstanceImpl.prototype.eachMetaData = function (p_callback) {
                    this.all(org.kevoree.meta.MetaComponentInstance.REF_METADATA, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ComponentInstanceImpl.prototype.sizeOfMetaData = function () {
                    return this.size(org.kevoree.meta.MetaComponentInstance.REF_METADATA);
                };
                ComponentInstanceImpl.prototype.setDictionary = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaComponentInstance.REF_DICTIONARY, p_obj);
                    return this;
                };
                ComponentInstanceImpl.prototype.getDictionary = function (p_callback) {
                    this.single(org.kevoree.meta.MetaComponentInstance.REF_DICTIONARY, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                ComponentInstanceImpl.prototype.setTypeDefinition = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaComponentInstance.REF_TYPEDEFINITION, p_obj);
                    return this;
                };
                ComponentInstanceImpl.prototype.getTypeDefinition = function (p_callback) {
                    this.single(org.kevoree.meta.MetaComponentInstance.REF_TYPEDEFINITION, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                ComponentInstanceImpl.prototype.addProvided = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaComponentInstance.REF_PROVIDED, p_obj);
                    return this;
                };
                ComponentInstanceImpl.prototype.removeProvided = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaComponentInstance.REF_PROVIDED, p_obj);
                    return this;
                };
                ComponentInstanceImpl.prototype.eachProvided = function (p_callback) {
                    this.all(org.kevoree.meta.MetaComponentInstance.REF_PROVIDED, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ComponentInstanceImpl.prototype.sizeOfProvided = function () {
                    return this.size(org.kevoree.meta.MetaComponentInstance.REF_PROVIDED);
                };
                ComponentInstanceImpl.prototype.addFragmentDictionary = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaComponentInstance.REF_FRAGMENTDICTIONARY, p_obj);
                    return this;
                };
                ComponentInstanceImpl.prototype.removeFragmentDictionary = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaComponentInstance.REF_FRAGMENTDICTIONARY, p_obj);
                    return this;
                };
                ComponentInstanceImpl.prototype.eachFragmentDictionary = function (p_callback) {
                    this.all(org.kevoree.meta.MetaComponentInstance.REF_FRAGMENTDICTIONARY, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ComponentInstanceImpl.prototype.sizeOfFragmentDictionary = function () {
                    return this.size(org.kevoree.meta.MetaComponentInstance.REF_FRAGMENTDICTIONARY);
                };
                ComponentInstanceImpl.prototype.addRequired = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaComponentInstance.REF_REQUIRED, p_obj);
                    return this;
                };
                ComponentInstanceImpl.prototype.removeRequired = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaComponentInstance.REF_REQUIRED, p_obj);
                    return this;
                };
                ComponentInstanceImpl.prototype.eachRequired = function (p_callback) {
                    this.all(org.kevoree.meta.MetaComponentInstance.REF_REQUIRED, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ComponentInstanceImpl.prototype.sizeOfRequired = function () {
                    return this.size(org.kevoree.meta.MetaComponentInstance.REF_REQUIRED);
                };
                ComponentInstanceImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return ComponentInstanceImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.ComponentInstanceImpl = ComponentInstanceImpl;
            var ComponentTypeImpl = (function (_super) {
                __extends(ComponentTypeImpl, _super);
                function ComponentTypeImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                ComponentTypeImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaComponentType.ATT_NAME);
                };
                ComponentTypeImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaComponentType.ATT_NAME, p_obj);
                    return this;
                };
                ComponentTypeImpl.prototype.getAbstract = function () {
                    return this.get(org.kevoree.meta.MetaComponentType.ATT_ABSTRACT);
                };
                ComponentTypeImpl.prototype.setAbstract = function (p_obj) {
                    this.set(org.kevoree.meta.MetaComponentType.ATT_ABSTRACT, p_obj);
                    return this;
                };
                ComponentTypeImpl.prototype.getVersion = function () {
                    return this.get(org.kevoree.meta.MetaComponentType.ATT_VERSION);
                };
                ComponentTypeImpl.prototype.setVersion = function (p_obj) {
                    this.set(org.kevoree.meta.MetaComponentType.ATT_VERSION, p_obj);
                    return this;
                };
                ComponentTypeImpl.prototype.addSuperTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaComponentType.REF_SUPERTYPES, p_obj);
                    return this;
                };
                ComponentTypeImpl.prototype.removeSuperTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaComponentType.REF_SUPERTYPES, p_obj);
                    return this;
                };
                ComponentTypeImpl.prototype.eachSuperTypes = function (p_callback) {
                    this.all(org.kevoree.meta.MetaComponentType.REF_SUPERTYPES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ComponentTypeImpl.prototype.sizeOfSuperTypes = function () {
                    return this.size(org.kevoree.meta.MetaComponentType.REF_SUPERTYPES);
                };
                ComponentTypeImpl.prototype.addMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaComponentType.REF_METADATA, p_obj);
                    return this;
                };
                ComponentTypeImpl.prototype.removeMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaComponentType.REF_METADATA, p_obj);
                    return this;
                };
                ComponentTypeImpl.prototype.eachMetaData = function (p_callback) {
                    this.all(org.kevoree.meta.MetaComponentType.REF_METADATA, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ComponentTypeImpl.prototype.sizeOfMetaData = function () {
                    return this.size(org.kevoree.meta.MetaComponentType.REF_METADATA);
                };
                ComponentTypeImpl.prototype.addDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaComponentType.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                ComponentTypeImpl.prototype.removeDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaComponentType.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                ComponentTypeImpl.prototype.eachDeployUnits = function (p_callback) {
                    this.all(org.kevoree.meta.MetaComponentType.REF_DEPLOYUNITS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ComponentTypeImpl.prototype.sizeOfDeployUnits = function () {
                    return this.size(org.kevoree.meta.MetaComponentType.REF_DEPLOYUNITS);
                };
                ComponentTypeImpl.prototype.addProvided = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaComponentType.REF_PROVIDED, p_obj);
                    return this;
                };
                ComponentTypeImpl.prototype.removeProvided = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaComponentType.REF_PROVIDED, p_obj);
                    return this;
                };
                ComponentTypeImpl.prototype.eachProvided = function (p_callback) {
                    this.all(org.kevoree.meta.MetaComponentType.REF_PROVIDED, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ComponentTypeImpl.prototype.sizeOfProvided = function () {
                    return this.size(org.kevoree.meta.MetaComponentType.REF_PROVIDED);
                };
                ComponentTypeImpl.prototype.setDictionaryType = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaComponentType.REF_DICTIONARYTYPE, p_obj);
                    return this;
                };
                ComponentTypeImpl.prototype.getDictionaryType = function (p_callback) {
                    this.single(org.kevoree.meta.MetaComponentType.REF_DICTIONARYTYPE, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                ComponentTypeImpl.prototype.addRequired = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaComponentType.REF_REQUIRED, p_obj);
                    return this;
                };
                ComponentTypeImpl.prototype.removeRequired = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaComponentType.REF_REQUIRED, p_obj);
                    return this;
                };
                ComponentTypeImpl.prototype.eachRequired = function (p_callback) {
                    this.all(org.kevoree.meta.MetaComponentType.REF_REQUIRED, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ComponentTypeImpl.prototype.sizeOfRequired = function () {
                    return this.size(org.kevoree.meta.MetaComponentType.REF_REQUIRED);
                };
                ComponentTypeImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return ComponentTypeImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.ComponentTypeImpl = ComponentTypeImpl;
            var ContainerNodeImpl = (function (_super) {
                __extends(ContainerNodeImpl, _super);
                function ContainerNodeImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                ContainerNodeImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaContainerNode.ATT_NAME);
                };
                ContainerNodeImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaContainerNode.ATT_NAME, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.getStarted = function () {
                    return this.get(org.kevoree.meta.MetaContainerNode.ATT_STARTED);
                };
                ContainerNodeImpl.prototype.setStarted = function (p_obj) {
                    this.set(org.kevoree.meta.MetaContainerNode.ATT_STARTED, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.addNetworkInformation = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaContainerNode.REF_NETWORKINFORMATION, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.removeNetworkInformation = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaContainerNode.REF_NETWORKINFORMATION, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.eachNetworkInformation = function (p_callback) {
                    this.all(org.kevoree.meta.MetaContainerNode.REF_NETWORKINFORMATION, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ContainerNodeImpl.prototype.sizeOfNetworkInformation = function () {
                    return this.size(org.kevoree.meta.MetaContainerNode.REF_NETWORKINFORMATION);
                };
                ContainerNodeImpl.prototype.addMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaContainerNode.REF_METADATA, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.removeMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaContainerNode.REF_METADATA, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.eachMetaData = function (p_callback) {
                    this.all(org.kevoree.meta.MetaContainerNode.REF_METADATA, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ContainerNodeImpl.prototype.sizeOfMetaData = function () {
                    return this.size(org.kevoree.meta.MetaContainerNode.REF_METADATA);
                };
                ContainerNodeImpl.prototype.addComponents = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaContainerNode.REF_COMPONENTS, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.removeComponents = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaContainerNode.REF_COMPONENTS, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.eachComponents = function (p_callback) {
                    this.all(org.kevoree.meta.MetaContainerNode.REF_COMPONENTS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ContainerNodeImpl.prototype.sizeOfComponents = function () {
                    return this.size(org.kevoree.meta.MetaContainerNode.REF_COMPONENTS);
                };
                ContainerNodeImpl.prototype.setDictionary = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaContainerNode.REF_DICTIONARY, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.getDictionary = function (p_callback) {
                    this.single(org.kevoree.meta.MetaContainerNode.REF_DICTIONARY, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                ContainerNodeImpl.prototype.addHosts = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaContainerNode.REF_HOSTS, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.removeHosts = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaContainerNode.REF_HOSTS, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.eachHosts = function (p_callback) {
                    this.all(org.kevoree.meta.MetaContainerNode.REF_HOSTS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ContainerNodeImpl.prototype.sizeOfHosts = function () {
                    return this.size(org.kevoree.meta.MetaContainerNode.REF_HOSTS);
                };
                ContainerNodeImpl.prototype.setTypeDefinition = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaContainerNode.REF_TYPEDEFINITION, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.getTypeDefinition = function (p_callback) {
                    this.single(org.kevoree.meta.MetaContainerNode.REF_TYPEDEFINITION, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                ContainerNodeImpl.prototype.setHost = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaContainerNode.REF_HOST, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.getHost = function (p_callback) {
                    this.single(org.kevoree.meta.MetaContainerNode.REF_HOST, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                ContainerNodeImpl.prototype.addGroups = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaContainerNode.REF_GROUPS, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.removeGroups = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaContainerNode.REF_GROUPS, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.eachGroups = function (p_callback) {
                    this.all(org.kevoree.meta.MetaContainerNode.REF_GROUPS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ContainerNodeImpl.prototype.sizeOfGroups = function () {
                    return this.size(org.kevoree.meta.MetaContainerNode.REF_GROUPS);
                };
                ContainerNodeImpl.prototype.addFragmentDictionary = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaContainerNode.REF_FRAGMENTDICTIONARY, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.removeFragmentDictionary = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaContainerNode.REF_FRAGMENTDICTIONARY, p_obj);
                    return this;
                };
                ContainerNodeImpl.prototype.eachFragmentDictionary = function (p_callback) {
                    this.all(org.kevoree.meta.MetaContainerNode.REF_FRAGMENTDICTIONARY, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ContainerNodeImpl.prototype.sizeOfFragmentDictionary = function () {
                    return this.size(org.kevoree.meta.MetaContainerNode.REF_FRAGMENTDICTIONARY);
                };
                ContainerNodeImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return ContainerNodeImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.ContainerNodeImpl = ContainerNodeImpl;
            var ContainerRootImpl = (function (_super) {
                __extends(ContainerRootImpl, _super);
                function ContainerRootImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                ContainerRootImpl.prototype.addNodes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaContainerRoot.REF_NODES, p_obj);
                    return this;
                };
                ContainerRootImpl.prototype.removeNodes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaContainerRoot.REF_NODES, p_obj);
                    return this;
                };
                ContainerRootImpl.prototype.eachNodes = function (p_callback) {
                    this.all(org.kevoree.meta.MetaContainerRoot.REF_NODES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ContainerRootImpl.prototype.sizeOfNodes = function () {
                    return this.size(org.kevoree.meta.MetaContainerRoot.REF_NODES);
                };
                ContainerRootImpl.prototype.addRepositories = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaContainerRoot.REF_REPOSITORIES, p_obj);
                    return this;
                };
                ContainerRootImpl.prototype.removeRepositories = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaContainerRoot.REF_REPOSITORIES, p_obj);
                    return this;
                };
                ContainerRootImpl.prototype.eachRepositories = function (p_callback) {
                    this.all(org.kevoree.meta.MetaContainerRoot.REF_REPOSITORIES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ContainerRootImpl.prototype.sizeOfRepositories = function () {
                    return this.size(org.kevoree.meta.MetaContainerRoot.REF_REPOSITORIES);
                };
                ContainerRootImpl.prototype.addGroups = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaContainerRoot.REF_GROUPS, p_obj);
                    return this;
                };
                ContainerRootImpl.prototype.removeGroups = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaContainerRoot.REF_GROUPS, p_obj);
                    return this;
                };
                ContainerRootImpl.prototype.eachGroups = function (p_callback) {
                    this.all(org.kevoree.meta.MetaContainerRoot.REF_GROUPS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ContainerRootImpl.prototype.sizeOfGroups = function () {
                    return this.size(org.kevoree.meta.MetaContainerRoot.REF_GROUPS);
                };
                ContainerRootImpl.prototype.addPackages = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaContainerRoot.REF_PACKAGES, p_obj);
                    return this;
                };
                ContainerRootImpl.prototype.removePackages = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaContainerRoot.REF_PACKAGES, p_obj);
                    return this;
                };
                ContainerRootImpl.prototype.eachPackages = function (p_callback) {
                    this.all(org.kevoree.meta.MetaContainerRoot.REF_PACKAGES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ContainerRootImpl.prototype.sizeOfPackages = function () {
                    return this.size(org.kevoree.meta.MetaContainerRoot.REF_PACKAGES);
                };
                ContainerRootImpl.prototype.addMBindings = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaContainerRoot.REF_MBINDINGS, p_obj);
                    return this;
                };
                ContainerRootImpl.prototype.removeMBindings = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaContainerRoot.REF_MBINDINGS, p_obj);
                    return this;
                };
                ContainerRootImpl.prototype.eachMBindings = function (p_callback) {
                    this.all(org.kevoree.meta.MetaContainerRoot.REF_MBINDINGS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ContainerRootImpl.prototype.sizeOfMBindings = function () {
                    return this.size(org.kevoree.meta.MetaContainerRoot.REF_MBINDINGS);
                };
                ContainerRootImpl.prototype.addHubs = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaContainerRoot.REF_HUBS, p_obj);
                    return this;
                };
                ContainerRootImpl.prototype.removeHubs = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaContainerRoot.REF_HUBS, p_obj);
                    return this;
                };
                ContainerRootImpl.prototype.eachHubs = function (p_callback) {
                    this.all(org.kevoree.meta.MetaContainerRoot.REF_HUBS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ContainerRootImpl.prototype.sizeOfHubs = function () {
                    return this.size(org.kevoree.meta.MetaContainerRoot.REF_HUBS);
                };
                ContainerRootImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return ContainerRootImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.ContainerRootImpl = ContainerRootImpl;
            var DeployUnitImpl = (function (_super) {
                __extends(DeployUnitImpl, _super);
                function DeployUnitImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                DeployUnitImpl.prototype.getHashcode = function () {
                    return this.get(org.kevoree.meta.MetaDeployUnit.ATT_HASHCODE);
                };
                DeployUnitImpl.prototype.setHashcode = function (p_obj) {
                    this.set(org.kevoree.meta.MetaDeployUnit.ATT_HASHCODE, p_obj);
                    return this;
                };
                DeployUnitImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaDeployUnit.ATT_NAME);
                };
                DeployUnitImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaDeployUnit.ATT_NAME, p_obj);
                    return this;
                };
                DeployUnitImpl.prototype.getVersion = function () {
                    return this.get(org.kevoree.meta.MetaDeployUnit.ATT_VERSION);
                };
                DeployUnitImpl.prototype.setVersion = function (p_obj) {
                    this.set(org.kevoree.meta.MetaDeployUnit.ATT_VERSION, p_obj);
                    return this;
                };
                DeployUnitImpl.prototype.getUrl = function () {
                    return this.get(org.kevoree.meta.MetaDeployUnit.ATT_URL);
                };
                DeployUnitImpl.prototype.setUrl = function (p_obj) {
                    this.set(org.kevoree.meta.MetaDeployUnit.ATT_URL, p_obj);
                    return this;
                };
                DeployUnitImpl.prototype.addRequiredLibs = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaDeployUnit.REF_REQUIREDLIBS, p_obj);
                    return this;
                };
                DeployUnitImpl.prototype.removeRequiredLibs = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaDeployUnit.REF_REQUIREDLIBS, p_obj);
                    return this;
                };
                DeployUnitImpl.prototype.eachRequiredLibs = function (p_callback) {
                    this.all(org.kevoree.meta.MetaDeployUnit.REF_REQUIREDLIBS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                DeployUnitImpl.prototype.sizeOfRequiredLibs = function () {
                    return this.size(org.kevoree.meta.MetaDeployUnit.REF_REQUIREDLIBS);
                };
                DeployUnitImpl.prototype.addFilters = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaDeployUnit.REF_FILTERS, p_obj);
                    return this;
                };
                DeployUnitImpl.prototype.removeFilters = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaDeployUnit.REF_FILTERS, p_obj);
                    return this;
                };
                DeployUnitImpl.prototype.eachFilters = function (p_callback) {
                    this.all(org.kevoree.meta.MetaDeployUnit.REF_FILTERS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                DeployUnitImpl.prototype.sizeOfFilters = function () {
                    return this.size(org.kevoree.meta.MetaDeployUnit.REF_FILTERS);
                };
                DeployUnitImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return DeployUnitImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.DeployUnitImpl = DeployUnitImpl;
            var DictionaryAttributeImpl = (function (_super) {
                __extends(DictionaryAttributeImpl, _super);
                function DictionaryAttributeImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                DictionaryAttributeImpl.prototype.getDatatype = function () {
                    return this.get(org.kevoree.meta.MetaDictionaryAttribute.ATT_DATATYPE);
                };
                DictionaryAttributeImpl.prototype.setDatatype = function (p_obj) {
                    this.set(org.kevoree.meta.MetaDictionaryAttribute.ATT_DATATYPE, p_obj);
                    return this;
                };
                DictionaryAttributeImpl.prototype.getDefaultValue = function () {
                    return this.get(org.kevoree.meta.MetaDictionaryAttribute.ATT_DEFAULTVALUE);
                };
                DictionaryAttributeImpl.prototype.setDefaultValue = function (p_obj) {
                    this.set(org.kevoree.meta.MetaDictionaryAttribute.ATT_DEFAULTVALUE, p_obj);
                    return this;
                };
                DictionaryAttributeImpl.prototype.getFragmentDependant = function () {
                    return this.get(org.kevoree.meta.MetaDictionaryAttribute.ATT_FRAGMENTDEPENDANT);
                };
                DictionaryAttributeImpl.prototype.setFragmentDependant = function (p_obj) {
                    this.set(org.kevoree.meta.MetaDictionaryAttribute.ATT_FRAGMENTDEPENDANT, p_obj);
                    return this;
                };
                DictionaryAttributeImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaDictionaryAttribute.ATT_NAME);
                };
                DictionaryAttributeImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaDictionaryAttribute.ATT_NAME, p_obj);
                    return this;
                };
                DictionaryAttributeImpl.prototype.getOptional = function () {
                    return this.get(org.kevoree.meta.MetaDictionaryAttribute.ATT_OPTIONAL);
                };
                DictionaryAttributeImpl.prototype.setOptional = function (p_obj) {
                    this.set(org.kevoree.meta.MetaDictionaryAttribute.ATT_OPTIONAL, p_obj);
                    return this;
                };
                DictionaryAttributeImpl.prototype.getState = function () {
                    return this.get(org.kevoree.meta.MetaDictionaryAttribute.ATT_STATE);
                };
                DictionaryAttributeImpl.prototype.setState = function (p_obj) {
                    this.set(org.kevoree.meta.MetaDictionaryAttribute.ATT_STATE, p_obj);
                    return this;
                };
                DictionaryAttributeImpl.prototype.addGenericTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaDictionaryAttribute.REF_GENERICTYPES, p_obj);
                    return this;
                };
                DictionaryAttributeImpl.prototype.removeGenericTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaDictionaryAttribute.REF_GENERICTYPES, p_obj);
                    return this;
                };
                DictionaryAttributeImpl.prototype.eachGenericTypes = function (p_callback) {
                    this.all(org.kevoree.meta.MetaDictionaryAttribute.REF_GENERICTYPES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                DictionaryAttributeImpl.prototype.sizeOfGenericTypes = function () {
                    return this.size(org.kevoree.meta.MetaDictionaryAttribute.REF_GENERICTYPES);
                };
                DictionaryAttributeImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return DictionaryAttributeImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.DictionaryAttributeImpl = DictionaryAttributeImpl;
            var DictionaryImpl = (function (_super) {
                __extends(DictionaryImpl, _super);
                function DictionaryImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                DictionaryImpl.prototype.addValues = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaDictionary.REF_VALUES, p_obj);
                    return this;
                };
                DictionaryImpl.prototype.removeValues = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaDictionary.REF_VALUES, p_obj);
                    return this;
                };
                DictionaryImpl.prototype.eachValues = function (p_callback) {
                    this.all(org.kevoree.meta.MetaDictionary.REF_VALUES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                DictionaryImpl.prototype.sizeOfValues = function () {
                    return this.size(org.kevoree.meta.MetaDictionary.REF_VALUES);
                };
                DictionaryImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return DictionaryImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.DictionaryImpl = DictionaryImpl;
            var DictionaryTypeImpl = (function (_super) {
                __extends(DictionaryTypeImpl, _super);
                function DictionaryTypeImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                DictionaryTypeImpl.prototype.addAttributes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaDictionaryType.REF_ATTRIBUTES, p_obj);
                    return this;
                };
                DictionaryTypeImpl.prototype.removeAttributes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaDictionaryType.REF_ATTRIBUTES, p_obj);
                    return this;
                };
                DictionaryTypeImpl.prototype.eachAttributes = function (p_callback) {
                    this.all(org.kevoree.meta.MetaDictionaryType.REF_ATTRIBUTES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                DictionaryTypeImpl.prototype.sizeOfAttributes = function () {
                    return this.size(org.kevoree.meta.MetaDictionaryType.REF_ATTRIBUTES);
                };
                DictionaryTypeImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return DictionaryTypeImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.DictionaryTypeImpl = DictionaryTypeImpl;
            var FragmentDictionaryImpl = (function (_super) {
                __extends(FragmentDictionaryImpl, _super);
                function FragmentDictionaryImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                FragmentDictionaryImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaFragmentDictionary.ATT_NAME);
                };
                FragmentDictionaryImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaFragmentDictionary.ATT_NAME, p_obj);
                    return this;
                };
                FragmentDictionaryImpl.prototype.addValues = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaFragmentDictionary.REF_VALUES, p_obj);
                    return this;
                };
                FragmentDictionaryImpl.prototype.removeValues = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaFragmentDictionary.REF_VALUES, p_obj);
                    return this;
                };
                FragmentDictionaryImpl.prototype.eachValues = function (p_callback) {
                    this.all(org.kevoree.meta.MetaFragmentDictionary.REF_VALUES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                FragmentDictionaryImpl.prototype.sizeOfValues = function () {
                    return this.size(org.kevoree.meta.MetaFragmentDictionary.REF_VALUES);
                };
                FragmentDictionaryImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return FragmentDictionaryImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.FragmentDictionaryImpl = FragmentDictionaryImpl;
            var GroupImpl = (function (_super) {
                __extends(GroupImpl, _super);
                function GroupImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                GroupImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaGroup.ATT_NAME);
                };
                GroupImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaGroup.ATT_NAME, p_obj);
                    return this;
                };
                GroupImpl.prototype.getStarted = function () {
                    return this.get(org.kevoree.meta.MetaGroup.ATT_STARTED);
                };
                GroupImpl.prototype.setStarted = function (p_obj) {
                    this.set(org.kevoree.meta.MetaGroup.ATT_STARTED, p_obj);
                    return this;
                };
                GroupImpl.prototype.addMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaGroup.REF_METADATA, p_obj);
                    return this;
                };
                GroupImpl.prototype.removeMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaGroup.REF_METADATA, p_obj);
                    return this;
                };
                GroupImpl.prototype.eachMetaData = function (p_callback) {
                    this.all(org.kevoree.meta.MetaGroup.REF_METADATA, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                GroupImpl.prototype.sizeOfMetaData = function () {
                    return this.size(org.kevoree.meta.MetaGroup.REF_METADATA);
                };
                GroupImpl.prototype.setDictionary = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaGroup.REF_DICTIONARY, p_obj);
                    return this;
                };
                GroupImpl.prototype.getDictionary = function (p_callback) {
                    this.single(org.kevoree.meta.MetaGroup.REF_DICTIONARY, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                GroupImpl.prototype.setTypeDefinition = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaGroup.REF_TYPEDEFINITION, p_obj);
                    return this;
                };
                GroupImpl.prototype.getTypeDefinition = function (p_callback) {
                    this.single(org.kevoree.meta.MetaGroup.REF_TYPEDEFINITION, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                GroupImpl.prototype.addFragmentDictionary = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaGroup.REF_FRAGMENTDICTIONARY, p_obj);
                    return this;
                };
                GroupImpl.prototype.removeFragmentDictionary = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaGroup.REF_FRAGMENTDICTIONARY, p_obj);
                    return this;
                };
                GroupImpl.prototype.eachFragmentDictionary = function (p_callback) {
                    this.all(org.kevoree.meta.MetaGroup.REF_FRAGMENTDICTIONARY, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                GroupImpl.prototype.sizeOfFragmentDictionary = function () {
                    return this.size(org.kevoree.meta.MetaGroup.REF_FRAGMENTDICTIONARY);
                };
                GroupImpl.prototype.addSubNodes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaGroup.REF_SUBNODES, p_obj);
                    return this;
                };
                GroupImpl.prototype.removeSubNodes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaGroup.REF_SUBNODES, p_obj);
                    return this;
                };
                GroupImpl.prototype.eachSubNodes = function (p_callback) {
                    this.all(org.kevoree.meta.MetaGroup.REF_SUBNODES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                GroupImpl.prototype.sizeOfSubNodes = function () {
                    return this.size(org.kevoree.meta.MetaGroup.REF_SUBNODES);
                };
                GroupImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return GroupImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.GroupImpl = GroupImpl;
            var GroupTypeImpl = (function (_super) {
                __extends(GroupTypeImpl, _super);
                function GroupTypeImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                GroupTypeImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaGroupType.ATT_NAME);
                };
                GroupTypeImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaGroupType.ATT_NAME, p_obj);
                    return this;
                };
                GroupTypeImpl.prototype.getAbstract = function () {
                    return this.get(org.kevoree.meta.MetaGroupType.ATT_ABSTRACT);
                };
                GroupTypeImpl.prototype.setAbstract = function (p_obj) {
                    this.set(org.kevoree.meta.MetaGroupType.ATT_ABSTRACT, p_obj);
                    return this;
                };
                GroupTypeImpl.prototype.getVersion = function () {
                    return this.get(org.kevoree.meta.MetaGroupType.ATT_VERSION);
                };
                GroupTypeImpl.prototype.setVersion = function (p_obj) {
                    this.set(org.kevoree.meta.MetaGroupType.ATT_VERSION, p_obj);
                    return this;
                };
                GroupTypeImpl.prototype.addSuperTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaGroupType.REF_SUPERTYPES, p_obj);
                    return this;
                };
                GroupTypeImpl.prototype.removeSuperTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaGroupType.REF_SUPERTYPES, p_obj);
                    return this;
                };
                GroupTypeImpl.prototype.eachSuperTypes = function (p_callback) {
                    this.all(org.kevoree.meta.MetaGroupType.REF_SUPERTYPES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                GroupTypeImpl.prototype.sizeOfSuperTypes = function () {
                    return this.size(org.kevoree.meta.MetaGroupType.REF_SUPERTYPES);
                };
                GroupTypeImpl.prototype.addMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaGroupType.REF_METADATA, p_obj);
                    return this;
                };
                GroupTypeImpl.prototype.removeMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaGroupType.REF_METADATA, p_obj);
                    return this;
                };
                GroupTypeImpl.prototype.eachMetaData = function (p_callback) {
                    this.all(org.kevoree.meta.MetaGroupType.REF_METADATA, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                GroupTypeImpl.prototype.sizeOfMetaData = function () {
                    return this.size(org.kevoree.meta.MetaGroupType.REF_METADATA);
                };
                GroupTypeImpl.prototype.addDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaGroupType.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                GroupTypeImpl.prototype.removeDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaGroupType.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                GroupTypeImpl.prototype.eachDeployUnits = function (p_callback) {
                    this.all(org.kevoree.meta.MetaGroupType.REF_DEPLOYUNITS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                GroupTypeImpl.prototype.sizeOfDeployUnits = function () {
                    return this.size(org.kevoree.meta.MetaGroupType.REF_DEPLOYUNITS);
                };
                GroupTypeImpl.prototype.setDictionaryType = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaGroupType.REF_DICTIONARYTYPE, p_obj);
                    return this;
                };
                GroupTypeImpl.prototype.getDictionaryType = function (p_callback) {
                    this.single(org.kevoree.meta.MetaGroupType.REF_DICTIONARYTYPE, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                GroupTypeImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return GroupTypeImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.GroupTypeImpl = GroupTypeImpl;
            var InstanceImpl = (function (_super) {
                __extends(InstanceImpl, _super);
                function InstanceImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                InstanceImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaInstance.ATT_NAME);
                };
                InstanceImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaInstance.ATT_NAME, p_obj);
                    return this;
                };
                InstanceImpl.prototype.getStarted = function () {
                    return this.get(org.kevoree.meta.MetaInstance.ATT_STARTED);
                };
                InstanceImpl.prototype.setStarted = function (p_obj) {
                    this.set(org.kevoree.meta.MetaInstance.ATT_STARTED, p_obj);
                    return this;
                };
                InstanceImpl.prototype.addMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaInstance.REF_METADATA, p_obj);
                    return this;
                };
                InstanceImpl.prototype.removeMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaInstance.REF_METADATA, p_obj);
                    return this;
                };
                InstanceImpl.prototype.eachMetaData = function (p_callback) {
                    this.all(org.kevoree.meta.MetaInstance.REF_METADATA, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                InstanceImpl.prototype.sizeOfMetaData = function () {
                    return this.size(org.kevoree.meta.MetaInstance.REF_METADATA);
                };
                InstanceImpl.prototype.setDictionary = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaInstance.REF_DICTIONARY, p_obj);
                    return this;
                };
                InstanceImpl.prototype.getDictionary = function (p_callback) {
                    this.single(org.kevoree.meta.MetaInstance.REF_DICTIONARY, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                InstanceImpl.prototype.setTypeDefinition = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaInstance.REF_TYPEDEFINITION, p_obj);
                    return this;
                };
                InstanceImpl.prototype.getTypeDefinition = function (p_callback) {
                    this.single(org.kevoree.meta.MetaInstance.REF_TYPEDEFINITION, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                InstanceImpl.prototype.addFragmentDictionary = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaInstance.REF_FRAGMENTDICTIONARY, p_obj);
                    return this;
                };
                InstanceImpl.prototype.removeFragmentDictionary = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaInstance.REF_FRAGMENTDICTIONARY, p_obj);
                    return this;
                };
                InstanceImpl.prototype.eachFragmentDictionary = function (p_callback) {
                    this.all(org.kevoree.meta.MetaInstance.REF_FRAGMENTDICTIONARY, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                InstanceImpl.prototype.sizeOfFragmentDictionary = function () {
                    return this.size(org.kevoree.meta.MetaInstance.REF_FRAGMENTDICTIONARY);
                };
                InstanceImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return InstanceImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.InstanceImpl = InstanceImpl;
            var MBindingImpl = (function (_super) {
                __extends(MBindingImpl, _super);
                function MBindingImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                MBindingImpl.prototype.setHub = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaMBinding.REF_HUB, p_obj);
                    return this;
                };
                MBindingImpl.prototype.getHub = function (p_callback) {
                    this.single(org.kevoree.meta.MetaMBinding.REF_HUB, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                MBindingImpl.prototype.setPort = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaMBinding.REF_PORT, p_obj);
                    return this;
                };
                MBindingImpl.prototype.getPort = function (p_callback) {
                    this.single(org.kevoree.meta.MetaMBinding.REF_PORT, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                MBindingImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return MBindingImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.MBindingImpl = MBindingImpl;
            var MessagePortTypeImpl = (function (_super) {
                __extends(MessagePortTypeImpl, _super);
                function MessagePortTypeImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                MessagePortTypeImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaMessagePortType.ATT_NAME);
                };
                MessagePortTypeImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaMessagePortType.ATT_NAME, p_obj);
                    return this;
                };
                MessagePortTypeImpl.prototype.getSynchrone = function () {
                    return this.get(org.kevoree.meta.MetaMessagePortType.ATT_SYNCHRONE);
                };
                MessagePortTypeImpl.prototype.setSynchrone = function (p_obj) {
                    this.set(org.kevoree.meta.MetaMessagePortType.ATT_SYNCHRONE, p_obj);
                    return this;
                };
                MessagePortTypeImpl.prototype.getAbstract = function () {
                    return this.get(org.kevoree.meta.MetaMessagePortType.ATT_ABSTRACT);
                };
                MessagePortTypeImpl.prototype.setAbstract = function (p_obj) {
                    this.set(org.kevoree.meta.MetaMessagePortType.ATT_ABSTRACT, p_obj);
                    return this;
                };
                MessagePortTypeImpl.prototype.getVersion = function () {
                    return this.get(org.kevoree.meta.MetaMessagePortType.ATT_VERSION);
                };
                MessagePortTypeImpl.prototype.setVersion = function (p_obj) {
                    this.set(org.kevoree.meta.MetaMessagePortType.ATT_VERSION, p_obj);
                    return this;
                };
                MessagePortTypeImpl.prototype.addSuperTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaMessagePortType.REF_SUPERTYPES, p_obj);
                    return this;
                };
                MessagePortTypeImpl.prototype.removeSuperTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaMessagePortType.REF_SUPERTYPES, p_obj);
                    return this;
                };
                MessagePortTypeImpl.prototype.eachSuperTypes = function (p_callback) {
                    this.all(org.kevoree.meta.MetaMessagePortType.REF_SUPERTYPES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                MessagePortTypeImpl.prototype.sizeOfSuperTypes = function () {
                    return this.size(org.kevoree.meta.MetaMessagePortType.REF_SUPERTYPES);
                };
                MessagePortTypeImpl.prototype.addMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaMessagePortType.REF_METADATA, p_obj);
                    return this;
                };
                MessagePortTypeImpl.prototype.removeMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaMessagePortType.REF_METADATA, p_obj);
                    return this;
                };
                MessagePortTypeImpl.prototype.eachMetaData = function (p_callback) {
                    this.all(org.kevoree.meta.MetaMessagePortType.REF_METADATA, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                MessagePortTypeImpl.prototype.sizeOfMetaData = function () {
                    return this.size(org.kevoree.meta.MetaMessagePortType.REF_METADATA);
                };
                MessagePortTypeImpl.prototype.addDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaMessagePortType.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                MessagePortTypeImpl.prototype.removeDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaMessagePortType.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                MessagePortTypeImpl.prototype.eachDeployUnits = function (p_callback) {
                    this.all(org.kevoree.meta.MetaMessagePortType.REF_DEPLOYUNITS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                MessagePortTypeImpl.prototype.sizeOfDeployUnits = function () {
                    return this.size(org.kevoree.meta.MetaMessagePortType.REF_DEPLOYUNITS);
                };
                MessagePortTypeImpl.prototype.setDictionaryType = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaMessagePortType.REF_DICTIONARYTYPE, p_obj);
                    return this;
                };
                MessagePortTypeImpl.prototype.getDictionaryType = function (p_callback) {
                    this.single(org.kevoree.meta.MetaMessagePortType.REF_DICTIONARYTYPE, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                MessagePortTypeImpl.prototype.addFilters = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaMessagePortType.REF_FILTERS, p_obj);
                    return this;
                };
                MessagePortTypeImpl.prototype.removeFilters = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaMessagePortType.REF_FILTERS, p_obj);
                    return this;
                };
                MessagePortTypeImpl.prototype.eachFilters = function (p_callback) {
                    this.all(org.kevoree.meta.MetaMessagePortType.REF_FILTERS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                MessagePortTypeImpl.prototype.sizeOfFilters = function () {
                    return this.size(org.kevoree.meta.MetaMessagePortType.REF_FILTERS);
                };
                MessagePortTypeImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return MessagePortTypeImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.MessagePortTypeImpl = MessagePortTypeImpl;
            var NamedElementImpl = (function (_super) {
                __extends(NamedElementImpl, _super);
                function NamedElementImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                NamedElementImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaNamedElement.ATT_NAME);
                };
                NamedElementImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaNamedElement.ATT_NAME, p_obj);
                    return this;
                };
                NamedElementImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return NamedElementImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.NamedElementImpl = NamedElementImpl;
            var NetworkInfoImpl = (function (_super) {
                __extends(NetworkInfoImpl, _super);
                function NetworkInfoImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                NetworkInfoImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaNetworkInfo.ATT_NAME);
                };
                NetworkInfoImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaNetworkInfo.ATT_NAME, p_obj);
                    return this;
                };
                NetworkInfoImpl.prototype.addValues = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaNetworkInfo.REF_VALUES, p_obj);
                    return this;
                };
                NetworkInfoImpl.prototype.removeValues = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaNetworkInfo.REF_VALUES, p_obj);
                    return this;
                };
                NetworkInfoImpl.prototype.eachValues = function (p_callback) {
                    this.all(org.kevoree.meta.MetaNetworkInfo.REF_VALUES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                NetworkInfoImpl.prototype.sizeOfValues = function () {
                    return this.size(org.kevoree.meta.MetaNetworkInfo.REF_VALUES);
                };
                NetworkInfoImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return NetworkInfoImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.NetworkInfoImpl = NetworkInfoImpl;
            var NodeTypeImpl = (function (_super) {
                __extends(NodeTypeImpl, _super);
                function NodeTypeImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                NodeTypeImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaNodeType.ATT_NAME);
                };
                NodeTypeImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaNodeType.ATT_NAME, p_obj);
                    return this;
                };
                NodeTypeImpl.prototype.getAbstract = function () {
                    return this.get(org.kevoree.meta.MetaNodeType.ATT_ABSTRACT);
                };
                NodeTypeImpl.prototype.setAbstract = function (p_obj) {
                    this.set(org.kevoree.meta.MetaNodeType.ATT_ABSTRACT, p_obj);
                    return this;
                };
                NodeTypeImpl.prototype.getVersion = function () {
                    return this.get(org.kevoree.meta.MetaNodeType.ATT_VERSION);
                };
                NodeTypeImpl.prototype.setVersion = function (p_obj) {
                    this.set(org.kevoree.meta.MetaNodeType.ATT_VERSION, p_obj);
                    return this;
                };
                NodeTypeImpl.prototype.addSuperTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaNodeType.REF_SUPERTYPES, p_obj);
                    return this;
                };
                NodeTypeImpl.prototype.removeSuperTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaNodeType.REF_SUPERTYPES, p_obj);
                    return this;
                };
                NodeTypeImpl.prototype.eachSuperTypes = function (p_callback) {
                    this.all(org.kevoree.meta.MetaNodeType.REF_SUPERTYPES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                NodeTypeImpl.prototype.sizeOfSuperTypes = function () {
                    return this.size(org.kevoree.meta.MetaNodeType.REF_SUPERTYPES);
                };
                NodeTypeImpl.prototype.addMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaNodeType.REF_METADATA, p_obj);
                    return this;
                };
                NodeTypeImpl.prototype.removeMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaNodeType.REF_METADATA, p_obj);
                    return this;
                };
                NodeTypeImpl.prototype.eachMetaData = function (p_callback) {
                    this.all(org.kevoree.meta.MetaNodeType.REF_METADATA, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                NodeTypeImpl.prototype.sizeOfMetaData = function () {
                    return this.size(org.kevoree.meta.MetaNodeType.REF_METADATA);
                };
                NodeTypeImpl.prototype.addDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaNodeType.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                NodeTypeImpl.prototype.removeDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaNodeType.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                NodeTypeImpl.prototype.eachDeployUnits = function (p_callback) {
                    this.all(org.kevoree.meta.MetaNodeType.REF_DEPLOYUNITS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                NodeTypeImpl.prototype.sizeOfDeployUnits = function () {
                    return this.size(org.kevoree.meta.MetaNodeType.REF_DEPLOYUNITS);
                };
                NodeTypeImpl.prototype.setDictionaryType = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaNodeType.REF_DICTIONARYTYPE, p_obj);
                    return this;
                };
                NodeTypeImpl.prototype.getDictionaryType = function (p_callback) {
                    this.single(org.kevoree.meta.MetaNodeType.REF_DICTIONARYTYPE, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                NodeTypeImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return NodeTypeImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.NodeTypeImpl = NodeTypeImpl;
            var OperationImpl = (function (_super) {
                __extends(OperationImpl, _super);
                function OperationImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                OperationImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaOperation.ATT_NAME);
                };
                OperationImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaOperation.ATT_NAME, p_obj);
                    return this;
                };
                OperationImpl.prototype.addParameters = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaOperation.REF_PARAMETERS, p_obj);
                    return this;
                };
                OperationImpl.prototype.removeParameters = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaOperation.REF_PARAMETERS, p_obj);
                    return this;
                };
                OperationImpl.prototype.eachParameters = function (p_callback) {
                    this.all(org.kevoree.meta.MetaOperation.REF_PARAMETERS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                OperationImpl.prototype.sizeOfParameters = function () {
                    return this.size(org.kevoree.meta.MetaOperation.REF_PARAMETERS);
                };
                OperationImpl.prototype.setReturnType = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaOperation.REF_RETURNTYPE, p_obj);
                    return this;
                };
                OperationImpl.prototype.getReturnType = function (p_callback) {
                    this.single(org.kevoree.meta.MetaOperation.REF_RETURNTYPE, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                OperationImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return OperationImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.OperationImpl = OperationImpl;
            var PackageImpl = (function (_super) {
                __extends(PackageImpl, _super);
                function PackageImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                PackageImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaPackage.ATT_NAME);
                };
                PackageImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaPackage.ATT_NAME, p_obj);
                    return this;
                };
                PackageImpl.prototype.addTypeDefinitions = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaPackage.REF_TYPEDEFINITIONS, p_obj);
                    return this;
                };
                PackageImpl.prototype.removeTypeDefinitions = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaPackage.REF_TYPEDEFINITIONS, p_obj);
                    return this;
                };
                PackageImpl.prototype.eachTypeDefinitions = function (p_callback) {
                    this.all(org.kevoree.meta.MetaPackage.REF_TYPEDEFINITIONS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                PackageImpl.prototype.sizeOfTypeDefinitions = function () {
                    return this.size(org.kevoree.meta.MetaPackage.REF_TYPEDEFINITIONS);
                };
                PackageImpl.prototype.addDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaPackage.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                PackageImpl.prototype.removeDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaPackage.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                PackageImpl.prototype.eachDeployUnits = function (p_callback) {
                    this.all(org.kevoree.meta.MetaPackage.REF_DEPLOYUNITS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                PackageImpl.prototype.sizeOfDeployUnits = function () {
                    return this.size(org.kevoree.meta.MetaPackage.REF_DEPLOYUNITS);
                };
                PackageImpl.prototype.addPackages = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaPackage.REF_PACKAGES, p_obj);
                    return this;
                };
                PackageImpl.prototype.removePackages = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaPackage.REF_PACKAGES, p_obj);
                    return this;
                };
                PackageImpl.prototype.eachPackages = function (p_callback) {
                    this.all(org.kevoree.meta.MetaPackage.REF_PACKAGES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                PackageImpl.prototype.sizeOfPackages = function () {
                    return this.size(org.kevoree.meta.MetaPackage.REF_PACKAGES);
                };
                PackageImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return PackageImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.PackageImpl = PackageImpl;
            var ParameterImpl = (function (_super) {
                __extends(ParameterImpl, _super);
                function ParameterImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                ParameterImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaParameter.ATT_NAME);
                };
                ParameterImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaParameter.ATT_NAME, p_obj);
                    return this;
                };
                ParameterImpl.prototype.getOrder = function () {
                    return this.get(org.kevoree.meta.MetaParameter.ATT_ORDER);
                };
                ParameterImpl.prototype.setOrder = function (p_obj) {
                    this.set(org.kevoree.meta.MetaParameter.ATT_ORDER, p_obj);
                    return this;
                };
                ParameterImpl.prototype.setType = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaParameter.REF_TYPE, p_obj);
                    return this;
                };
                ParameterImpl.prototype.getType = function (p_callback) {
                    this.single(org.kevoree.meta.MetaParameter.REF_TYPE, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                ParameterImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return ParameterImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.ParameterImpl = ParameterImpl;
            var PortImpl = (function (_super) {
                __extends(PortImpl, _super);
                function PortImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                PortImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaPort.ATT_NAME);
                };
                PortImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaPort.ATT_NAME, p_obj);
                    return this;
                };
                PortImpl.prototype.addBindings = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaPort.REF_BINDINGS, p_obj);
                    return this;
                };
                PortImpl.prototype.removeBindings = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaPort.REF_BINDINGS, p_obj);
                    return this;
                };
                PortImpl.prototype.eachBindings = function (p_callback) {
                    this.all(org.kevoree.meta.MetaPort.REF_BINDINGS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                PortImpl.prototype.sizeOfBindings = function () {
                    return this.size(org.kevoree.meta.MetaPort.REF_BINDINGS);
                };
                PortImpl.prototype.setPortTypeRef = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaPort.REF_PORTTYPEREF, p_obj);
                    return this;
                };
                PortImpl.prototype.getPortTypeRef = function (p_callback) {
                    this.single(org.kevoree.meta.MetaPort.REF_PORTTYPEREF, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                PortImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return PortImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.PortImpl = PortImpl;
            var PortTypeImpl = (function (_super) {
                __extends(PortTypeImpl, _super);
                function PortTypeImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                PortTypeImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaPortType.ATT_NAME);
                };
                PortTypeImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaPortType.ATT_NAME, p_obj);
                    return this;
                };
                PortTypeImpl.prototype.getSynchrone = function () {
                    return this.get(org.kevoree.meta.MetaPortType.ATT_SYNCHRONE);
                };
                PortTypeImpl.prototype.setSynchrone = function (p_obj) {
                    this.set(org.kevoree.meta.MetaPortType.ATT_SYNCHRONE, p_obj);
                    return this;
                };
                PortTypeImpl.prototype.getAbstract = function () {
                    return this.get(org.kevoree.meta.MetaPortType.ATT_ABSTRACT);
                };
                PortTypeImpl.prototype.setAbstract = function (p_obj) {
                    this.set(org.kevoree.meta.MetaPortType.ATT_ABSTRACT, p_obj);
                    return this;
                };
                PortTypeImpl.prototype.getVersion = function () {
                    return this.get(org.kevoree.meta.MetaPortType.ATT_VERSION);
                };
                PortTypeImpl.prototype.setVersion = function (p_obj) {
                    this.set(org.kevoree.meta.MetaPortType.ATT_VERSION, p_obj);
                    return this;
                };
                PortTypeImpl.prototype.addSuperTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaPortType.REF_SUPERTYPES, p_obj);
                    return this;
                };
                PortTypeImpl.prototype.removeSuperTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaPortType.REF_SUPERTYPES, p_obj);
                    return this;
                };
                PortTypeImpl.prototype.eachSuperTypes = function (p_callback) {
                    this.all(org.kevoree.meta.MetaPortType.REF_SUPERTYPES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                PortTypeImpl.prototype.sizeOfSuperTypes = function () {
                    return this.size(org.kevoree.meta.MetaPortType.REF_SUPERTYPES);
                };
                PortTypeImpl.prototype.addMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaPortType.REF_METADATA, p_obj);
                    return this;
                };
                PortTypeImpl.prototype.removeMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaPortType.REF_METADATA, p_obj);
                    return this;
                };
                PortTypeImpl.prototype.eachMetaData = function (p_callback) {
                    this.all(org.kevoree.meta.MetaPortType.REF_METADATA, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                PortTypeImpl.prototype.sizeOfMetaData = function () {
                    return this.size(org.kevoree.meta.MetaPortType.REF_METADATA);
                };
                PortTypeImpl.prototype.addDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaPortType.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                PortTypeImpl.prototype.removeDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaPortType.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                PortTypeImpl.prototype.eachDeployUnits = function (p_callback) {
                    this.all(org.kevoree.meta.MetaPortType.REF_DEPLOYUNITS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                PortTypeImpl.prototype.sizeOfDeployUnits = function () {
                    return this.size(org.kevoree.meta.MetaPortType.REF_DEPLOYUNITS);
                };
                PortTypeImpl.prototype.setDictionaryType = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaPortType.REF_DICTIONARYTYPE, p_obj);
                    return this;
                };
                PortTypeImpl.prototype.getDictionaryType = function (p_callback) {
                    this.single(org.kevoree.meta.MetaPortType.REF_DICTIONARYTYPE, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                PortTypeImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return PortTypeImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.PortTypeImpl = PortTypeImpl;
            var PortTypeMappingImpl = (function (_super) {
                __extends(PortTypeMappingImpl, _super);
                function PortTypeMappingImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                PortTypeMappingImpl.prototype.getParamTypes = function () {
                    return this.get(org.kevoree.meta.MetaPortTypeMapping.ATT_PARAMTYPES);
                };
                PortTypeMappingImpl.prototype.setParamTypes = function (p_obj) {
                    this.set(org.kevoree.meta.MetaPortTypeMapping.ATT_PARAMTYPES, p_obj);
                    return this;
                };
                PortTypeMappingImpl.prototype.getBeanMethodName = function () {
                    return this.get(org.kevoree.meta.MetaPortTypeMapping.ATT_BEANMETHODNAME);
                };
                PortTypeMappingImpl.prototype.setBeanMethodName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaPortTypeMapping.ATT_BEANMETHODNAME, p_obj);
                    return this;
                };
                PortTypeMappingImpl.prototype.getServiceMethodName = function () {
                    return this.get(org.kevoree.meta.MetaPortTypeMapping.ATT_SERVICEMETHODNAME);
                };
                PortTypeMappingImpl.prototype.setServiceMethodName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaPortTypeMapping.ATT_SERVICEMETHODNAME, p_obj);
                    return this;
                };
                PortTypeMappingImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return PortTypeMappingImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.PortTypeMappingImpl = PortTypeMappingImpl;
            var PortTypeRefImpl = (function (_super) {
                __extends(PortTypeRefImpl, _super);
                function PortTypeRefImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                PortTypeRefImpl.prototype.getNoDependency = function () {
                    return this.get(org.kevoree.meta.MetaPortTypeRef.ATT_NODEPENDENCY);
                };
                PortTypeRefImpl.prototype.setNoDependency = function (p_obj) {
                    this.set(org.kevoree.meta.MetaPortTypeRef.ATT_NODEPENDENCY, p_obj);
                    return this;
                };
                PortTypeRefImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaPortTypeRef.ATT_NAME);
                };
                PortTypeRefImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaPortTypeRef.ATT_NAME, p_obj);
                    return this;
                };
                PortTypeRefImpl.prototype.getOptional = function () {
                    return this.get(org.kevoree.meta.MetaPortTypeRef.ATT_OPTIONAL);
                };
                PortTypeRefImpl.prototype.setOptional = function (p_obj) {
                    this.set(org.kevoree.meta.MetaPortTypeRef.ATT_OPTIONAL, p_obj);
                    return this;
                };
                PortTypeRefImpl.prototype.setRef = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaPortTypeRef.REF_REF, p_obj);
                    return this;
                };
                PortTypeRefImpl.prototype.getRef = function (p_callback) {
                    this.single(org.kevoree.meta.MetaPortTypeRef.REF_REF, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                PortTypeRefImpl.prototype.addMappings = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaPortTypeRef.REF_MAPPINGS, p_obj);
                    return this;
                };
                PortTypeRefImpl.prototype.removeMappings = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaPortTypeRef.REF_MAPPINGS, p_obj);
                    return this;
                };
                PortTypeRefImpl.prototype.eachMappings = function (p_callback) {
                    this.all(org.kevoree.meta.MetaPortTypeRef.REF_MAPPINGS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                PortTypeRefImpl.prototype.sizeOfMappings = function () {
                    return this.size(org.kevoree.meta.MetaPortTypeRef.REF_MAPPINGS);
                };
                PortTypeRefImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return PortTypeRefImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.PortTypeRefImpl = PortTypeRefImpl;
            var RepositoryImpl = (function (_super) {
                __extends(RepositoryImpl, _super);
                function RepositoryImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                RepositoryImpl.prototype.getUrl = function () {
                    return this.get(org.kevoree.meta.MetaRepository.ATT_URL);
                };
                RepositoryImpl.prototype.setUrl = function (p_obj) {
                    this.set(org.kevoree.meta.MetaRepository.ATT_URL, p_obj);
                    return this;
                };
                RepositoryImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return RepositoryImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.RepositoryImpl = RepositoryImpl;
            var ServicePortTypeImpl = (function (_super) {
                __extends(ServicePortTypeImpl, _super);
                function ServicePortTypeImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                ServicePortTypeImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaServicePortType.ATT_NAME);
                };
                ServicePortTypeImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaServicePortType.ATT_NAME, p_obj);
                    return this;
                };
                ServicePortTypeImpl.prototype.getSynchrone = function () {
                    return this.get(org.kevoree.meta.MetaServicePortType.ATT_SYNCHRONE);
                };
                ServicePortTypeImpl.prototype.setSynchrone = function (p_obj) {
                    this.set(org.kevoree.meta.MetaServicePortType.ATT_SYNCHRONE, p_obj);
                    return this;
                };
                ServicePortTypeImpl.prototype.getAbstract = function () {
                    return this.get(org.kevoree.meta.MetaServicePortType.ATT_ABSTRACT);
                };
                ServicePortTypeImpl.prototype.setAbstract = function (p_obj) {
                    this.set(org.kevoree.meta.MetaServicePortType.ATT_ABSTRACT, p_obj);
                    return this;
                };
                ServicePortTypeImpl.prototype.getInterface = function () {
                    return this.get(org.kevoree.meta.MetaServicePortType.ATT_INTERFACE);
                };
                ServicePortTypeImpl.prototype.setInterface = function (p_obj) {
                    this.set(org.kevoree.meta.MetaServicePortType.ATT_INTERFACE, p_obj);
                    return this;
                };
                ServicePortTypeImpl.prototype.getVersion = function () {
                    return this.get(org.kevoree.meta.MetaServicePortType.ATT_VERSION);
                };
                ServicePortTypeImpl.prototype.setVersion = function (p_obj) {
                    this.set(org.kevoree.meta.MetaServicePortType.ATT_VERSION, p_obj);
                    return this;
                };
                ServicePortTypeImpl.prototype.addSuperTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaServicePortType.REF_SUPERTYPES, p_obj);
                    return this;
                };
                ServicePortTypeImpl.prototype.removeSuperTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaServicePortType.REF_SUPERTYPES, p_obj);
                    return this;
                };
                ServicePortTypeImpl.prototype.eachSuperTypes = function (p_callback) {
                    this.all(org.kevoree.meta.MetaServicePortType.REF_SUPERTYPES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ServicePortTypeImpl.prototype.sizeOfSuperTypes = function () {
                    return this.size(org.kevoree.meta.MetaServicePortType.REF_SUPERTYPES);
                };
                ServicePortTypeImpl.prototype.addMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaServicePortType.REF_METADATA, p_obj);
                    return this;
                };
                ServicePortTypeImpl.prototype.removeMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaServicePortType.REF_METADATA, p_obj);
                    return this;
                };
                ServicePortTypeImpl.prototype.eachMetaData = function (p_callback) {
                    this.all(org.kevoree.meta.MetaServicePortType.REF_METADATA, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ServicePortTypeImpl.prototype.sizeOfMetaData = function () {
                    return this.size(org.kevoree.meta.MetaServicePortType.REF_METADATA);
                };
                ServicePortTypeImpl.prototype.addOperations = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaServicePortType.REF_OPERATIONS, p_obj);
                    return this;
                };
                ServicePortTypeImpl.prototype.removeOperations = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaServicePortType.REF_OPERATIONS, p_obj);
                    return this;
                };
                ServicePortTypeImpl.prototype.eachOperations = function (p_callback) {
                    this.all(org.kevoree.meta.MetaServicePortType.REF_OPERATIONS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ServicePortTypeImpl.prototype.sizeOfOperations = function () {
                    return this.size(org.kevoree.meta.MetaServicePortType.REF_OPERATIONS);
                };
                ServicePortTypeImpl.prototype.addDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaServicePortType.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                ServicePortTypeImpl.prototype.removeDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaServicePortType.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                ServicePortTypeImpl.prototype.eachDeployUnits = function (p_callback) {
                    this.all(org.kevoree.meta.MetaServicePortType.REF_DEPLOYUNITS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                ServicePortTypeImpl.prototype.sizeOfDeployUnits = function () {
                    return this.size(org.kevoree.meta.MetaServicePortType.REF_DEPLOYUNITS);
                };
                ServicePortTypeImpl.prototype.setDictionaryType = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaServicePortType.REF_DICTIONARYTYPE, p_obj);
                    return this;
                };
                ServicePortTypeImpl.prototype.getDictionaryType = function (p_callback) {
                    this.single(org.kevoree.meta.MetaServicePortType.REF_DICTIONARYTYPE, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                ServicePortTypeImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return ServicePortTypeImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.ServicePortTypeImpl = ServicePortTypeImpl;
            var TypeDefinitionImpl = (function (_super) {
                __extends(TypeDefinitionImpl, _super);
                function TypeDefinitionImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                TypeDefinitionImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaTypeDefinition.ATT_NAME);
                };
                TypeDefinitionImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaTypeDefinition.ATT_NAME, p_obj);
                    return this;
                };
                TypeDefinitionImpl.prototype.getAbstract = function () {
                    return this.get(org.kevoree.meta.MetaTypeDefinition.ATT_ABSTRACT);
                };
                TypeDefinitionImpl.prototype.setAbstract = function (p_obj) {
                    this.set(org.kevoree.meta.MetaTypeDefinition.ATT_ABSTRACT, p_obj);
                    return this;
                };
                TypeDefinitionImpl.prototype.getVersion = function () {
                    return this.get(org.kevoree.meta.MetaTypeDefinition.ATT_VERSION);
                };
                TypeDefinitionImpl.prototype.setVersion = function (p_obj) {
                    this.set(org.kevoree.meta.MetaTypeDefinition.ATT_VERSION, p_obj);
                    return this;
                };
                TypeDefinitionImpl.prototype.addSuperTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaTypeDefinition.REF_SUPERTYPES, p_obj);
                    return this;
                };
                TypeDefinitionImpl.prototype.removeSuperTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaTypeDefinition.REF_SUPERTYPES, p_obj);
                    return this;
                };
                TypeDefinitionImpl.prototype.eachSuperTypes = function (p_callback) {
                    this.all(org.kevoree.meta.MetaTypeDefinition.REF_SUPERTYPES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                TypeDefinitionImpl.prototype.sizeOfSuperTypes = function () {
                    return this.size(org.kevoree.meta.MetaTypeDefinition.REF_SUPERTYPES);
                };
                TypeDefinitionImpl.prototype.addMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaTypeDefinition.REF_METADATA, p_obj);
                    return this;
                };
                TypeDefinitionImpl.prototype.removeMetaData = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaTypeDefinition.REF_METADATA, p_obj);
                    return this;
                };
                TypeDefinitionImpl.prototype.eachMetaData = function (p_callback) {
                    this.all(org.kevoree.meta.MetaTypeDefinition.REF_METADATA, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                TypeDefinitionImpl.prototype.sizeOfMetaData = function () {
                    return this.size(org.kevoree.meta.MetaTypeDefinition.REF_METADATA);
                };
                TypeDefinitionImpl.prototype.addDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaTypeDefinition.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                TypeDefinitionImpl.prototype.removeDeployUnits = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaTypeDefinition.REF_DEPLOYUNITS, p_obj);
                    return this;
                };
                TypeDefinitionImpl.prototype.eachDeployUnits = function (p_callback) {
                    this.all(org.kevoree.meta.MetaTypeDefinition.REF_DEPLOYUNITS, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                TypeDefinitionImpl.prototype.sizeOfDeployUnits = function () {
                    return this.size(org.kevoree.meta.MetaTypeDefinition.REF_DEPLOYUNITS);
                };
                TypeDefinitionImpl.prototype.setDictionaryType = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.meta.MetaTypeDefinition.REF_DICTIONARYTYPE, p_obj);
                    return this;
                };
                TypeDefinitionImpl.prototype.getDictionaryType = function (p_callback) {
                    this.single(org.kevoree.meta.MetaTypeDefinition.REF_DICTIONARYTYPE, function (kObject) {
                        if (p_callback != null) {
                            p_callback(kObject);
                        }
                    });
                };
                TypeDefinitionImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return TypeDefinitionImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.TypeDefinitionImpl = TypeDefinitionImpl;
            var TypedElementImpl = (function (_super) {
                __extends(TypedElementImpl, _super);
                function TypedElementImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                TypedElementImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaTypedElement.ATT_NAME);
                };
                TypedElementImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaTypedElement.ATT_NAME, p_obj);
                    return this;
                };
                TypedElementImpl.prototype.addGenericTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.meta.MetaTypedElement.REF_GENERICTYPES, p_obj);
                    return this;
                };
                TypedElementImpl.prototype.removeGenericTypes = function (p_obj) {
                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.meta.MetaTypedElement.REF_GENERICTYPES, p_obj);
                    return this;
                };
                TypedElementImpl.prototype.eachGenericTypes = function (p_callback) {
                    this.all(org.kevoree.meta.MetaTypedElement.REF_GENERICTYPES, function (kObjects) {
                        if (p_callback != null) {
                            var casted = new Array();
                            for (var i = 0; i < kObjects.length; i++) {
                                casted[i] = kObjects[i];
                            }
                            p_callback(casted);
                        }
                    });
                };
                TypedElementImpl.prototype.sizeOfGenericTypes = function () {
                    return this.size(org.kevoree.meta.MetaTypedElement.REF_GENERICTYPES);
                };
                TypedElementImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return TypedElementImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.TypedElementImpl = TypedElementImpl;
            var ValueImpl = (function (_super) {
                __extends(ValueImpl, _super);
                function ValueImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                    _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
                }
                ValueImpl.prototype.getName = function () {
                    return this.get(org.kevoree.meta.MetaValue.ATT_NAME);
                };
                ValueImpl.prototype.setName = function (p_obj) {
                    this.set(org.kevoree.meta.MetaValue.ATT_NAME, p_obj);
                    return this;
                };
                ValueImpl.prototype.getValue = function () {
                    return this.get(org.kevoree.meta.MetaValue.ATT_VALUE);
                };
                ValueImpl.prototype.setValue = function (p_obj) {
                    this.set(org.kevoree.meta.MetaValue.ATT_VALUE, p_obj);
                    return this;
                };
                ValueImpl.prototype.view = function () {
                    return _super.prototype.view.call(this);
                };
                return ValueImpl;
            })(org.kevoree.modeling.api.abs.AbstractKObject);
            impl.ValueImpl = ValueImpl;
        })(impl = kevoree.impl || (kevoree.impl = {}));
        var meta;
        (function (meta) {
            var MetaChannel = (function (_super) {
                __extends(MetaChannel, _super);
                function MetaChannel() {
                    _super.call(this, "org.kevoree.Channel", 11);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaChannel.ATT_NAME;
                    temp_attributes[1] = MetaChannel.ATT_STARTED;
                    var temp_references = new Array();
                    temp_references[0] = MetaChannel.REF_METADATA;
                    temp_references[1] = MetaChannel.REF_DICTIONARY;
                    temp_references[2] = MetaChannel.REF_TYPEDEFINITION;
                    temp_references[3] = MetaChannel.REF_BINDINGS;
                    temp_references[4] = MetaChannel.REF_FRAGMENTDICTIONARY;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaChannel.getInstance = function () {
                    if (MetaChannel.INSTANCE == null) {
                        MetaChannel.INSTANCE = new org.kevoree.meta.MetaChannel();
                    }
                    return MetaChannel.INSTANCE;
                };
                MetaChannel.INSTANCE = null;
                MetaChannel.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaChannel.ATT_STARTED = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("started", 6, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaChannel.REF_METADATA = new org.kevoree.modeling.api.abs.AbstractMetaReference("metaData", 7, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaChannel.getInstance();
                });
                MetaChannel.REF_DICTIONARY = new org.kevoree.modeling.api.abs.AbstractMetaReference("dictionary", 8, true, true, function () {
                    return org.kevoree.meta.MetaDictionary.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaChannel.getInstance();
                });
                MetaChannel.REF_TYPEDEFINITION = new org.kevoree.modeling.api.abs.AbstractMetaReference("typeDefinition", 9, false, true, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaChannel.getInstance();
                });
                MetaChannel.REF_BINDINGS = new org.kevoree.modeling.api.abs.AbstractMetaReference("bindings", 10, false, false, function () {
                    return org.kevoree.meta.MetaMBinding.getInstance();
                }, function () {
                    return org.kevoree.meta.MetaMBinding.REF_HUB;
                }, function () {
                    return org.kevoree.meta.MetaChannel.getInstance();
                });
                MetaChannel.REF_FRAGMENTDICTIONARY = new org.kevoree.modeling.api.abs.AbstractMetaReference("fragmentDictionary", 11, true, false, function () {
                    return org.kevoree.meta.MetaFragmentDictionary.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaChannel.getInstance();
                });
                return MetaChannel;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaChannel = MetaChannel;
            var MetaChannelType = (function (_super) {
                __extends(MetaChannelType, _super);
                function MetaChannelType() {
                    _super.call(this, "org.kevoree.ChannelType", 28);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaChannelType.ATT_UPPERFRAGMENTS;
                    temp_attributes[1] = MetaChannelType.ATT_NAME;
                    temp_attributes[2] = MetaChannelType.ATT_ABSTRACT;
                    temp_attributes[3] = MetaChannelType.ATT_LOWERBINDINGS;
                    temp_attributes[4] = MetaChannelType.ATT_LOWERFRAGMENTS;
                    temp_attributes[5] = MetaChannelType.ATT_VERSION;
                    temp_attributes[6] = MetaChannelType.ATT_UPPERBINDINGS;
                    var temp_references = new Array();
                    temp_references[0] = MetaChannelType.REF_SUPERTYPES;
                    temp_references[1] = MetaChannelType.REF_METADATA;
                    temp_references[2] = MetaChannelType.REF_DEPLOYUNITS;
                    temp_references[3] = MetaChannelType.REF_DICTIONARYTYPE;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaChannelType.getInstance = function () {
                    if (MetaChannelType.INSTANCE == null) {
                        MetaChannelType.INSTANCE = new org.kevoree.meta.MetaChannelType();
                    }
                    return MetaChannelType.INSTANCE;
                };
                MetaChannelType.INSTANCE = null;
                MetaChannelType.ATT_UPPERFRAGMENTS = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("upperFragments", 5, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.INT, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaChannelType.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 6, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaChannelType.ATT_ABSTRACT = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("abstract", 7, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaChannelType.ATT_LOWERBINDINGS = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("lowerBindings", 8, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.INT, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaChannelType.ATT_LOWERFRAGMENTS = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("lowerFragments", 9, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.INT, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaChannelType.ATT_VERSION = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("version", 10, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaChannelType.ATT_UPPERBINDINGS = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("upperBindings", 11, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.INT, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaChannelType.REF_SUPERTYPES = new org.kevoree.modeling.api.abs.AbstractMetaReference("superTypes", 12, false, false, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaChannelType.getInstance();
                });
                MetaChannelType.REF_METADATA = new org.kevoree.modeling.api.abs.AbstractMetaReference("metaData", 13, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaChannelType.getInstance();
                });
                MetaChannelType.REF_DEPLOYUNITS = new org.kevoree.modeling.api.abs.AbstractMetaReference("deployUnits", 14, false, false, function () {
                    return org.kevoree.meta.MetaDeployUnit.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaChannelType.getInstance();
                });
                MetaChannelType.REF_DICTIONARYTYPE = new org.kevoree.modeling.api.abs.AbstractMetaReference("dictionaryType", 15, true, true, function () {
                    return org.kevoree.meta.MetaDictionaryType.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaChannelType.getInstance();
                });
                return MetaChannelType;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaChannelType = MetaChannelType;
            var MetaComponentInstance = (function (_super) {
                __extends(MetaComponentInstance, _super);
                function MetaComponentInstance() {
                    _super.call(this, "org.kevoree.ComponentInstance", 0);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaComponentInstance.ATT_NAME;
                    temp_attributes[1] = MetaComponentInstance.ATT_STARTED;
                    var temp_references = new Array();
                    temp_references[0] = MetaComponentInstance.REF_METADATA;
                    temp_references[1] = MetaComponentInstance.REF_DICTIONARY;
                    temp_references[2] = MetaComponentInstance.REF_TYPEDEFINITION;
                    temp_references[3] = MetaComponentInstance.REF_PROVIDED;
                    temp_references[4] = MetaComponentInstance.REF_FRAGMENTDICTIONARY;
                    temp_references[5] = MetaComponentInstance.REF_REQUIRED;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaComponentInstance.getInstance = function () {
                    if (MetaComponentInstance.INSTANCE == null) {
                        MetaComponentInstance.INSTANCE = new org.kevoree.meta.MetaComponentInstance();
                    }
                    return MetaComponentInstance.INSTANCE;
                };
                MetaComponentInstance.INSTANCE = null;
                MetaComponentInstance.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaComponentInstance.ATT_STARTED = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("started", 6, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaComponentInstance.REF_METADATA = new org.kevoree.modeling.api.abs.AbstractMetaReference("metaData", 7, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaComponentInstance.getInstance();
                });
                MetaComponentInstance.REF_DICTIONARY = new org.kevoree.modeling.api.abs.AbstractMetaReference("dictionary", 8, true, true, function () {
                    return org.kevoree.meta.MetaDictionary.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaComponentInstance.getInstance();
                });
                MetaComponentInstance.REF_TYPEDEFINITION = new org.kevoree.modeling.api.abs.AbstractMetaReference("typeDefinition", 9, false, true, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaComponentInstance.getInstance();
                });
                MetaComponentInstance.REF_PROVIDED = new org.kevoree.modeling.api.abs.AbstractMetaReference("provided", 10, true, false, function () {
                    return org.kevoree.meta.MetaPort.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaComponentInstance.getInstance();
                });
                MetaComponentInstance.REF_FRAGMENTDICTIONARY = new org.kevoree.modeling.api.abs.AbstractMetaReference("fragmentDictionary", 11, true, false, function () {
                    return org.kevoree.meta.MetaFragmentDictionary.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaComponentInstance.getInstance();
                });
                MetaComponentInstance.REF_REQUIRED = new org.kevoree.modeling.api.abs.AbstractMetaReference("required", 12, true, false, function () {
                    return org.kevoree.meta.MetaPort.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaComponentInstance.getInstance();
                });
                return MetaComponentInstance;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaComponentInstance = MetaComponentInstance;
            var MetaComponentType = (function (_super) {
                __extends(MetaComponentType, _super);
                function MetaComponentType() {
                    _super.call(this, "org.kevoree.ComponentType", 3);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaComponentType.ATT_NAME;
                    temp_attributes[1] = MetaComponentType.ATT_ABSTRACT;
                    temp_attributes[2] = MetaComponentType.ATT_VERSION;
                    var temp_references = new Array();
                    temp_references[0] = MetaComponentType.REF_SUPERTYPES;
                    temp_references[1] = MetaComponentType.REF_METADATA;
                    temp_references[2] = MetaComponentType.REF_DEPLOYUNITS;
                    temp_references[3] = MetaComponentType.REF_PROVIDED;
                    temp_references[4] = MetaComponentType.REF_DICTIONARYTYPE;
                    temp_references[5] = MetaComponentType.REF_REQUIRED;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaComponentType.getInstance = function () {
                    if (MetaComponentType.INSTANCE == null) {
                        MetaComponentType.INSTANCE = new org.kevoree.meta.MetaComponentType();
                    }
                    return MetaComponentType.INSTANCE;
                };
                MetaComponentType.INSTANCE = null;
                MetaComponentType.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaComponentType.ATT_ABSTRACT = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("abstract", 6, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaComponentType.ATT_VERSION = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("version", 7, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaComponentType.REF_SUPERTYPES = new org.kevoree.modeling.api.abs.AbstractMetaReference("superTypes", 8, false, false, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaComponentType.getInstance();
                });
                MetaComponentType.REF_METADATA = new org.kevoree.modeling.api.abs.AbstractMetaReference("metaData", 9, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaComponentType.getInstance();
                });
                MetaComponentType.REF_DEPLOYUNITS = new org.kevoree.modeling.api.abs.AbstractMetaReference("deployUnits", 10, false, false, function () {
                    return org.kevoree.meta.MetaDeployUnit.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaComponentType.getInstance();
                });
                MetaComponentType.REF_PROVIDED = new org.kevoree.modeling.api.abs.AbstractMetaReference("provided", 11, true, false, function () {
                    return org.kevoree.meta.MetaPortTypeRef.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaComponentType.getInstance();
                });
                MetaComponentType.REF_DICTIONARYTYPE = new org.kevoree.modeling.api.abs.AbstractMetaReference("dictionaryType", 12, true, true, function () {
                    return org.kevoree.meta.MetaDictionaryType.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaComponentType.getInstance();
                });
                MetaComponentType.REF_REQUIRED = new org.kevoree.modeling.api.abs.AbstractMetaReference("required", 13, true, false, function () {
                    return org.kevoree.meta.MetaPortTypeRef.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaComponentType.getInstance();
                });
                return MetaComponentType;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaComponentType = MetaComponentType;
            var MetaContainerNode = (function (_super) {
                __extends(MetaContainerNode, _super);
                function MetaContainerNode() {
                    _super.call(this, "org.kevoree.ContainerNode", 6);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaContainerNode.ATT_NAME;
                    temp_attributes[1] = MetaContainerNode.ATT_STARTED;
                    var temp_references = new Array();
                    temp_references[0] = MetaContainerNode.REF_NETWORKINFORMATION;
                    temp_references[1] = MetaContainerNode.REF_METADATA;
                    temp_references[2] = MetaContainerNode.REF_COMPONENTS;
                    temp_references[3] = MetaContainerNode.REF_DICTIONARY;
                    temp_references[4] = MetaContainerNode.REF_HOSTS;
                    temp_references[5] = MetaContainerNode.REF_TYPEDEFINITION;
                    temp_references[6] = MetaContainerNode.REF_HOST;
                    temp_references[7] = MetaContainerNode.REF_GROUPS;
                    temp_references[8] = MetaContainerNode.REF_FRAGMENTDICTIONARY;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaContainerNode.getInstance = function () {
                    if (MetaContainerNode.INSTANCE == null) {
                        MetaContainerNode.INSTANCE = new org.kevoree.meta.MetaContainerNode();
                    }
                    return MetaContainerNode.INSTANCE;
                };
                MetaContainerNode.INSTANCE = null;
                MetaContainerNode.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaContainerNode.ATT_STARTED = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("started", 6, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaContainerNode.REF_NETWORKINFORMATION = new org.kevoree.modeling.api.abs.AbstractMetaReference("networkInformation", 7, true, false, function () {
                    return org.kevoree.meta.MetaNetworkInfo.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaContainerNode.getInstance();
                });
                MetaContainerNode.REF_METADATA = new org.kevoree.modeling.api.abs.AbstractMetaReference("metaData", 8, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaContainerNode.getInstance();
                });
                MetaContainerNode.REF_COMPONENTS = new org.kevoree.modeling.api.abs.AbstractMetaReference("components", 9, true, false, function () {
                    return org.kevoree.meta.MetaComponentInstance.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaContainerNode.getInstance();
                });
                MetaContainerNode.REF_DICTIONARY = new org.kevoree.modeling.api.abs.AbstractMetaReference("dictionary", 10, true, true, function () {
                    return org.kevoree.meta.MetaDictionary.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaContainerNode.getInstance();
                });
                MetaContainerNode.REF_HOSTS = new org.kevoree.modeling.api.abs.AbstractMetaReference("hosts", 11, false, false, function () {
                    return org.kevoree.meta.MetaContainerNode.getInstance();
                }, function () {
                    return org.kevoree.meta.MetaContainerNode.REF_HOST;
                }, function () {
                    return org.kevoree.meta.MetaContainerNode.getInstance();
                });
                MetaContainerNode.REF_TYPEDEFINITION = new org.kevoree.modeling.api.abs.AbstractMetaReference("typeDefinition", 12, false, true, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaContainerNode.getInstance();
                });
                MetaContainerNode.REF_HOST = new org.kevoree.modeling.api.abs.AbstractMetaReference("host", 13, false, true, function () {
                    return org.kevoree.meta.MetaContainerNode.getInstance();
                }, function () {
                    return org.kevoree.meta.MetaContainerNode.REF_HOSTS;
                }, function () {
                    return org.kevoree.meta.MetaContainerNode.getInstance();
                });
                MetaContainerNode.REF_GROUPS = new org.kevoree.modeling.api.abs.AbstractMetaReference("groups", 14, false, false, function () {
                    return org.kevoree.meta.MetaGroup.getInstance();
                }, function () {
                    return org.kevoree.meta.MetaGroup.REF_SUBNODES;
                }, function () {
                    return org.kevoree.meta.MetaContainerNode.getInstance();
                });
                MetaContainerNode.REF_FRAGMENTDICTIONARY = new org.kevoree.modeling.api.abs.AbstractMetaReference("fragmentDictionary", 15, true, false, function () {
                    return org.kevoree.meta.MetaFragmentDictionary.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaContainerNode.getInstance();
                });
                return MetaContainerNode;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaContainerNode = MetaContainerNode;
            var MetaContainerRoot = (function (_super) {
                __extends(MetaContainerRoot, _super);
                function MetaContainerRoot() {
                    _super.call(this, "org.kevoree.ContainerRoot", 9);
                    var temp_attributes = new Array();
                    var temp_references = new Array();
                    temp_references[0] = MetaContainerRoot.REF_NODES;
                    temp_references[1] = MetaContainerRoot.REF_REPOSITORIES;
                    temp_references[2] = MetaContainerRoot.REF_GROUPS;
                    temp_references[3] = MetaContainerRoot.REF_PACKAGES;
                    temp_references[4] = MetaContainerRoot.REF_MBINDINGS;
                    temp_references[5] = MetaContainerRoot.REF_HUBS;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaContainerRoot.getInstance = function () {
                    if (MetaContainerRoot.INSTANCE == null) {
                        MetaContainerRoot.INSTANCE = new org.kevoree.meta.MetaContainerRoot();
                    }
                    return MetaContainerRoot.INSTANCE;
                };
                MetaContainerRoot.INSTANCE = null;
                MetaContainerRoot.REF_NODES = new org.kevoree.modeling.api.abs.AbstractMetaReference("nodes", 5, true, false, function () {
                    return org.kevoree.meta.MetaContainerNode.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaContainerRoot.getInstance();
                });
                MetaContainerRoot.REF_REPOSITORIES = new org.kevoree.modeling.api.abs.AbstractMetaReference("repositories", 6, true, false, function () {
                    return org.kevoree.meta.MetaRepository.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaContainerRoot.getInstance();
                });
                MetaContainerRoot.REF_GROUPS = new org.kevoree.modeling.api.abs.AbstractMetaReference("groups", 7, true, false, function () {
                    return org.kevoree.meta.MetaGroup.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaContainerRoot.getInstance();
                });
                MetaContainerRoot.REF_PACKAGES = new org.kevoree.modeling.api.abs.AbstractMetaReference("packages", 8, true, false, function () {
                    return org.kevoree.meta.MetaPackage.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaContainerRoot.getInstance();
                });
                MetaContainerRoot.REF_MBINDINGS = new org.kevoree.modeling.api.abs.AbstractMetaReference("mBindings", 9, true, false, function () {
                    return org.kevoree.meta.MetaMBinding.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaContainerRoot.getInstance();
                });
                MetaContainerRoot.REF_HUBS = new org.kevoree.modeling.api.abs.AbstractMetaReference("hubs", 10, true, false, function () {
                    return org.kevoree.meta.MetaChannel.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaContainerRoot.getInstance();
                });
                return MetaContainerRoot;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaContainerRoot = MetaContainerRoot;
            var MetaDataType = (function (_super) {
                __extends(MetaDataType, _super);
                function MetaDataType(p_name, p_isEnum) {
                    _super.call(this, p_name, p_isEnum);
                }
                MetaDataType.getInstance = function () {
                    if (MetaDataType.INSTANCE == null) {
                        MetaDataType.INSTANCE = new org.kevoree.meta.MetaDataType("org.kevoree.DataType", true);
                    }
                    return MetaDataType.INSTANCE;
                };
                MetaDataType.prototype.load = function (s) {
                    if (s.equals(MetaDataType._BOOLEAN)) {
                        return org.kevoree.DataType.BOOLEAN;
                    }
                    if (s.equals(MetaDataType._BYTE)) {
                        return org.kevoree.DataType.BYTE;
                    }
                    if (s.equals(MetaDataType._CHAR)) {
                        return org.kevoree.DataType.CHAR;
                    }
                    if (s.equals(MetaDataType._DOUBLE)) {
                        return org.kevoree.DataType.DOUBLE;
                    }
                    if (s.equals(MetaDataType._FLOAT)) {
                        return org.kevoree.DataType.FLOAT;
                    }
                    if (s.equals(MetaDataType._INT)) {
                        return org.kevoree.DataType.INT;
                    }
                    if (s.equals(MetaDataType._LONG)) {
                        return org.kevoree.DataType.LONG;
                    }
                    if (s.equals(MetaDataType._SHORT)) {
                        return org.kevoree.DataType.SHORT;
                    }
                    if (s.equals(MetaDataType._STRING)) {
                        return org.kevoree.DataType.STRING;
                    }
                    return null;
                };
                MetaDataType.prototype.save = function (value) {
                    if (value == org.kevoree.DataType.BOOLEAN) {
                        return MetaDataType._BOOLEAN;
                    }
                    if (value == org.kevoree.DataType.BYTE) {
                        return MetaDataType._BYTE;
                    }
                    if (value == org.kevoree.DataType.CHAR) {
                        return MetaDataType._CHAR;
                    }
                    if (value == org.kevoree.DataType.DOUBLE) {
                        return MetaDataType._DOUBLE;
                    }
                    if (value == org.kevoree.DataType.FLOAT) {
                        return MetaDataType._FLOAT;
                    }
                    if (value == org.kevoree.DataType.INT) {
                        return MetaDataType._INT;
                    }
                    if (value == org.kevoree.DataType.LONG) {
                        return MetaDataType._LONG;
                    }
                    if (value == org.kevoree.DataType.SHORT) {
                        return MetaDataType._SHORT;
                    }
                    if (value == org.kevoree.DataType.STRING) {
                        return MetaDataType._STRING;
                    }
                    return null;
                };
                MetaDataType._BOOLEAN = "BOOLEAN";
                MetaDataType._BYTE = "BYTE";
                MetaDataType._CHAR = "CHAR";
                MetaDataType._DOUBLE = "DOUBLE";
                MetaDataType._FLOAT = "FLOAT";
                MetaDataType._INT = "INT";
                MetaDataType._LONG = "LONG";
                MetaDataType._SHORT = "SHORT";
                MetaDataType._STRING = "STRING";
                return MetaDataType;
            })(org.kevoree.modeling.api.abs.AbstractKDataType);
            meta.MetaDataType = MetaDataType;
            var MetaDeployUnit = (function (_super) {
                __extends(MetaDeployUnit, _super);
                function MetaDeployUnit() {
                    _super.call(this, "org.kevoree.DeployUnit", 14);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaDeployUnit.ATT_HASHCODE;
                    temp_attributes[1] = MetaDeployUnit.ATT_NAME;
                    temp_attributes[2] = MetaDeployUnit.ATT_VERSION;
                    temp_attributes[3] = MetaDeployUnit.ATT_URL;
                    var temp_references = new Array();
                    temp_references[0] = MetaDeployUnit.REF_REQUIREDLIBS;
                    temp_references[1] = MetaDeployUnit.REF_FILTERS;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaDeployUnit.getInstance = function () {
                    if (MetaDeployUnit.INSTANCE == null) {
                        MetaDeployUnit.INSTANCE = new org.kevoree.meta.MetaDeployUnit();
                    }
                    return MetaDeployUnit.INSTANCE;
                };
                MetaDeployUnit.INSTANCE = null;
                MetaDeployUnit.ATT_HASHCODE = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("hashcode", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaDeployUnit.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 6, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaDeployUnit.ATT_VERSION = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("version", 7, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaDeployUnit.ATT_URL = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("url", 8, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaDeployUnit.REF_REQUIREDLIBS = new org.kevoree.modeling.api.abs.AbstractMetaReference("requiredLibs", 9, false, false, function () {
                    return org.kevoree.meta.MetaDeployUnit.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaDeployUnit.getInstance();
                });
                MetaDeployUnit.REF_FILTERS = new org.kevoree.modeling.api.abs.AbstractMetaReference("filters", 10, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaDeployUnit.getInstance();
                });
                return MetaDeployUnit;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaDeployUnit = MetaDeployUnit;
            var MetaDictionary = (function (_super) {
                __extends(MetaDictionary, _super);
                function MetaDictionary() {
                    _super.call(this, "org.kevoree.Dictionary", 17);
                    var temp_attributes = new Array();
                    var temp_references = new Array();
                    temp_references[0] = MetaDictionary.REF_VALUES;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaDictionary.getInstance = function () {
                    if (MetaDictionary.INSTANCE == null) {
                        MetaDictionary.INSTANCE = new org.kevoree.meta.MetaDictionary();
                    }
                    return MetaDictionary.INSTANCE;
                };
                MetaDictionary.INSTANCE = null;
                MetaDictionary.REF_VALUES = new org.kevoree.modeling.api.abs.AbstractMetaReference("values", 5, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaDictionary.getInstance();
                });
                return MetaDictionary;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaDictionary = MetaDictionary;
            var MetaDictionaryAttribute = (function (_super) {
                __extends(MetaDictionaryAttribute, _super);
                function MetaDictionaryAttribute() {
                    _super.call(this, "org.kevoree.DictionaryAttribute", 21);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaDictionaryAttribute.ATT_DATATYPE;
                    temp_attributes[1] = MetaDictionaryAttribute.ATT_DEFAULTVALUE;
                    temp_attributes[2] = MetaDictionaryAttribute.ATT_FRAGMENTDEPENDANT;
                    temp_attributes[3] = MetaDictionaryAttribute.ATT_NAME;
                    temp_attributes[4] = MetaDictionaryAttribute.ATT_OPTIONAL;
                    temp_attributes[5] = MetaDictionaryAttribute.ATT_STATE;
                    var temp_references = new Array();
                    temp_references[0] = MetaDictionaryAttribute.REF_GENERICTYPES;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaDictionaryAttribute.getInstance = function () {
                    if (MetaDictionaryAttribute.INSTANCE == null) {
                        MetaDictionaryAttribute.INSTANCE = new org.kevoree.meta.MetaDictionaryAttribute();
                    }
                    return MetaDictionaryAttribute.INSTANCE;
                };
                MetaDictionaryAttribute.INSTANCE = null;
                MetaDictionaryAttribute.ATT_DATATYPE = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("datatype", 5, 0, false, org.kevoree.meta.MetaDataType.getInstance(), org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaDictionaryAttribute.ATT_DEFAULTVALUE = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("defaultValue", 6, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaDictionaryAttribute.ATT_FRAGMENTDEPENDANT = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("fragmentDependant", 7, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaDictionaryAttribute.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 8, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaDictionaryAttribute.ATT_OPTIONAL = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("optional", 9, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaDictionaryAttribute.ATT_STATE = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("state", 10, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaDictionaryAttribute.REF_GENERICTYPES = new org.kevoree.modeling.api.abs.AbstractMetaReference("genericTypes", 11, false, false, function () {
                    return org.kevoree.meta.MetaTypedElement.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaDictionaryAttribute.getInstance();
                });
                return MetaDictionaryAttribute;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaDictionaryAttribute = MetaDictionaryAttribute;
            var MetaDictionaryType = (function (_super) {
                __extends(MetaDictionaryType, _super);
                function MetaDictionaryType() {
                    _super.call(this, "org.kevoree.DictionaryType", 20);
                    var temp_attributes = new Array();
                    var temp_references = new Array();
                    temp_references[0] = MetaDictionaryType.REF_ATTRIBUTES;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaDictionaryType.getInstance = function () {
                    if (MetaDictionaryType.INSTANCE == null) {
                        MetaDictionaryType.INSTANCE = new org.kevoree.meta.MetaDictionaryType();
                    }
                    return MetaDictionaryType.INSTANCE;
                };
                MetaDictionaryType.INSTANCE = null;
                MetaDictionaryType.REF_ATTRIBUTES = new org.kevoree.modeling.api.abs.AbstractMetaReference("attributes", 5, true, false, function () {
                    return org.kevoree.meta.MetaDictionaryAttribute.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaDictionaryType.getInstance();
                });
                return MetaDictionaryType;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaDictionaryType = MetaDictionaryType;
            var MetaFragmentDictionary = (function (_super) {
                __extends(MetaFragmentDictionary, _super);
                function MetaFragmentDictionary() {
                    _super.call(this, "org.kevoree.FragmentDictionary", 19);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaFragmentDictionary.ATT_NAME;
                    var temp_references = new Array();
                    temp_references[0] = MetaFragmentDictionary.REF_VALUES;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaFragmentDictionary.getInstance = function () {
                    if (MetaFragmentDictionary.INSTANCE == null) {
                        MetaFragmentDictionary.INSTANCE = new org.kevoree.meta.MetaFragmentDictionary();
                    }
                    return MetaFragmentDictionary.INSTANCE;
                };
                MetaFragmentDictionary.INSTANCE = null;
                MetaFragmentDictionary.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaFragmentDictionary.REF_VALUES = new org.kevoree.modeling.api.abs.AbstractMetaReference("values", 6, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaFragmentDictionary.getInstance();
                });
                return MetaFragmentDictionary;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaFragmentDictionary = MetaFragmentDictionary;
            var MetaGroup = (function (_super) {
                __extends(MetaGroup, _super);
                function MetaGroup() {
                    _super.call(this, "org.kevoree.Group", 7);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaGroup.ATT_NAME;
                    temp_attributes[1] = MetaGroup.ATT_STARTED;
                    var temp_references = new Array();
                    temp_references[0] = MetaGroup.REF_METADATA;
                    temp_references[1] = MetaGroup.REF_DICTIONARY;
                    temp_references[2] = MetaGroup.REF_TYPEDEFINITION;
                    temp_references[3] = MetaGroup.REF_FRAGMENTDICTIONARY;
                    temp_references[4] = MetaGroup.REF_SUBNODES;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaGroup.getInstance = function () {
                    if (MetaGroup.INSTANCE == null) {
                        MetaGroup.INSTANCE = new org.kevoree.meta.MetaGroup();
                    }
                    return MetaGroup.INSTANCE;
                };
                MetaGroup.INSTANCE = null;
                MetaGroup.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaGroup.ATT_STARTED = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("started", 6, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaGroup.REF_METADATA = new org.kevoree.modeling.api.abs.AbstractMetaReference("metaData", 7, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaGroup.getInstance();
                });
                MetaGroup.REF_DICTIONARY = new org.kevoree.modeling.api.abs.AbstractMetaReference("dictionary", 8, true, true, function () {
                    return org.kevoree.meta.MetaDictionary.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaGroup.getInstance();
                });
                MetaGroup.REF_TYPEDEFINITION = new org.kevoree.modeling.api.abs.AbstractMetaReference("typeDefinition", 9, false, true, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaGroup.getInstance();
                });
                MetaGroup.REF_FRAGMENTDICTIONARY = new org.kevoree.modeling.api.abs.AbstractMetaReference("fragmentDictionary", 10, true, false, function () {
                    return org.kevoree.meta.MetaFragmentDictionary.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaGroup.getInstance();
                });
                MetaGroup.REF_SUBNODES = new org.kevoree.modeling.api.abs.AbstractMetaReference("subNodes", 11, false, false, function () {
                    return org.kevoree.meta.MetaContainerNode.getInstance();
                }, function () {
                    return org.kevoree.meta.MetaContainerNode.REF_GROUPS;
                }, function () {
                    return org.kevoree.meta.MetaGroup.getInstance();
                });
                return MetaGroup;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaGroup = MetaGroup;
            var MetaGroupType = (function (_super) {
                __extends(MetaGroupType, _super);
                function MetaGroupType() {
                    _super.call(this, "org.kevoree.GroupType", 29);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaGroupType.ATT_NAME;
                    temp_attributes[1] = MetaGroupType.ATT_ABSTRACT;
                    temp_attributes[2] = MetaGroupType.ATT_VERSION;
                    var temp_references = new Array();
                    temp_references[0] = MetaGroupType.REF_SUPERTYPES;
                    temp_references[1] = MetaGroupType.REF_METADATA;
                    temp_references[2] = MetaGroupType.REF_DEPLOYUNITS;
                    temp_references[3] = MetaGroupType.REF_DICTIONARYTYPE;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaGroupType.getInstance = function () {
                    if (MetaGroupType.INSTANCE == null) {
                        MetaGroupType.INSTANCE = new org.kevoree.meta.MetaGroupType();
                    }
                    return MetaGroupType.INSTANCE;
                };
                MetaGroupType.INSTANCE = null;
                MetaGroupType.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaGroupType.ATT_ABSTRACT = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("abstract", 6, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaGroupType.ATT_VERSION = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("version", 7, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaGroupType.REF_SUPERTYPES = new org.kevoree.modeling.api.abs.AbstractMetaReference("superTypes", 8, false, false, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaGroupType.getInstance();
                });
                MetaGroupType.REF_METADATA = new org.kevoree.modeling.api.abs.AbstractMetaReference("metaData", 9, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaGroupType.getInstance();
                });
                MetaGroupType.REF_DEPLOYUNITS = new org.kevoree.modeling.api.abs.AbstractMetaReference("deployUnits", 10, false, false, function () {
                    return org.kevoree.meta.MetaDeployUnit.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaGroupType.getInstance();
                });
                MetaGroupType.REF_DICTIONARYTYPE = new org.kevoree.modeling.api.abs.AbstractMetaReference("dictionaryType", 11, true, true, function () {
                    return org.kevoree.meta.MetaDictionaryType.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaGroupType.getInstance();
                });
                return MetaGroupType;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaGroupType = MetaGroupType;
            var MetaInstance = (function (_super) {
                __extends(MetaInstance, _super);
                function MetaInstance() {
                    _super.call(this, "org.kevoree.Instance", 2);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaInstance.ATT_NAME;
                    temp_attributes[1] = MetaInstance.ATT_STARTED;
                    var temp_references = new Array();
                    temp_references[0] = MetaInstance.REF_METADATA;
                    temp_references[1] = MetaInstance.REF_DICTIONARY;
                    temp_references[2] = MetaInstance.REF_TYPEDEFINITION;
                    temp_references[3] = MetaInstance.REF_FRAGMENTDICTIONARY;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaInstance.getInstance = function () {
                    if (MetaInstance.INSTANCE == null) {
                        MetaInstance.INSTANCE = new org.kevoree.meta.MetaInstance();
                    }
                    return MetaInstance.INSTANCE;
                };
                MetaInstance.INSTANCE = null;
                MetaInstance.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaInstance.ATT_STARTED = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("started", 6, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaInstance.REF_METADATA = new org.kevoree.modeling.api.abs.AbstractMetaReference("metaData", 7, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaInstance.getInstance();
                });
                MetaInstance.REF_DICTIONARY = new org.kevoree.modeling.api.abs.AbstractMetaReference("dictionary", 8, true, true, function () {
                    return org.kevoree.meta.MetaDictionary.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaInstance.getInstance();
                });
                MetaInstance.REF_TYPEDEFINITION = new org.kevoree.modeling.api.abs.AbstractMetaReference("typeDefinition", 9, false, true, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaInstance.getInstance();
                });
                MetaInstance.REF_FRAGMENTDICTIONARY = new org.kevoree.modeling.api.abs.AbstractMetaReference("fragmentDictionary", 10, true, false, function () {
                    return org.kevoree.meta.MetaFragmentDictionary.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaInstance.getInstance();
                });
                return MetaInstance;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaInstance = MetaInstance;
            var MetaMBinding = (function (_super) {
                __extends(MetaMBinding, _super);
                function MetaMBinding() {
                    _super.call(this, "org.kevoree.MBinding", 12);
                    var temp_attributes = new Array();
                    var temp_references = new Array();
                    temp_references[0] = MetaMBinding.REF_HUB;
                    temp_references[1] = MetaMBinding.REF_PORT;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaMBinding.getInstance = function () {
                    if (MetaMBinding.INSTANCE == null) {
                        MetaMBinding.INSTANCE = new org.kevoree.meta.MetaMBinding();
                    }
                    return MetaMBinding.INSTANCE;
                };
                MetaMBinding.INSTANCE = null;
                MetaMBinding.REF_HUB = new org.kevoree.modeling.api.abs.AbstractMetaReference("hub", 5, false, true, function () {
                    return org.kevoree.meta.MetaChannel.getInstance();
                }, function () {
                    return org.kevoree.meta.MetaChannel.REF_BINDINGS;
                }, function () {
                    return org.kevoree.meta.MetaMBinding.getInstance();
                });
                MetaMBinding.REF_PORT = new org.kevoree.modeling.api.abs.AbstractMetaReference("port", 6, false, true, function () {
                    return org.kevoree.meta.MetaPort.getInstance();
                }, function () {
                    return org.kevoree.meta.MetaPort.REF_BINDINGS;
                }, function () {
                    return org.kevoree.meta.MetaMBinding.getInstance();
                });
                return MetaMBinding;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaMBinding = MetaMBinding;
            var MetaMessagePortType = (function (_super) {
                __extends(MetaMessagePortType, _super);
                function MetaMessagePortType() {
                    _super.call(this, "org.kevoree.MessagePortType", 27);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaMessagePortType.ATT_NAME;
                    temp_attributes[1] = MetaMessagePortType.ATT_SYNCHRONE;
                    temp_attributes[2] = MetaMessagePortType.ATT_ABSTRACT;
                    temp_attributes[3] = MetaMessagePortType.ATT_VERSION;
                    var temp_references = new Array();
                    temp_references[0] = MetaMessagePortType.REF_SUPERTYPES;
                    temp_references[1] = MetaMessagePortType.REF_METADATA;
                    temp_references[2] = MetaMessagePortType.REF_DEPLOYUNITS;
                    temp_references[3] = MetaMessagePortType.REF_DICTIONARYTYPE;
                    temp_references[4] = MetaMessagePortType.REF_FILTERS;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaMessagePortType.getInstance = function () {
                    if (MetaMessagePortType.INSTANCE == null) {
                        MetaMessagePortType.INSTANCE = new org.kevoree.meta.MetaMessagePortType();
                    }
                    return MetaMessagePortType.INSTANCE;
                };
                MetaMessagePortType.INSTANCE = null;
                MetaMessagePortType.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaMessagePortType.ATT_SYNCHRONE = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("synchrone", 6, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaMessagePortType.ATT_ABSTRACT = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("abstract", 7, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaMessagePortType.ATT_VERSION = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("version", 8, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaMessagePortType.REF_SUPERTYPES = new org.kevoree.modeling.api.abs.AbstractMetaReference("superTypes", 9, false, false, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaMessagePortType.getInstance();
                });
                MetaMessagePortType.REF_METADATA = new org.kevoree.modeling.api.abs.AbstractMetaReference("metaData", 10, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaMessagePortType.getInstance();
                });
                MetaMessagePortType.REF_DEPLOYUNITS = new org.kevoree.modeling.api.abs.AbstractMetaReference("deployUnits", 11, false, false, function () {
                    return org.kevoree.meta.MetaDeployUnit.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaMessagePortType.getInstance();
                });
                MetaMessagePortType.REF_DICTIONARYTYPE = new org.kevoree.modeling.api.abs.AbstractMetaReference("dictionaryType", 12, true, true, function () {
                    return org.kevoree.meta.MetaDictionaryType.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaMessagePortType.getInstance();
                });
                MetaMessagePortType.REF_FILTERS = new org.kevoree.modeling.api.abs.AbstractMetaReference("filters", 13, false, false, function () {
                    return org.kevoree.meta.MetaTypedElement.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaMessagePortType.getInstance();
                });
                return MetaMessagePortType;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaMessagePortType = MetaMessagePortType;
            var MetaNamedElement = (function (_super) {
                __extends(MetaNamedElement, _super);
                function MetaNamedElement() {
                    _super.call(this, "org.kevoree.NamedElement", 15);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaNamedElement.ATT_NAME;
                    var temp_references = new Array();
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaNamedElement.getInstance = function () {
                    if (MetaNamedElement.INSTANCE == null) {
                        MetaNamedElement.INSTANCE = new org.kevoree.meta.MetaNamedElement();
                    }
                    return MetaNamedElement.INSTANCE;
                };
                MetaNamedElement.INSTANCE = null;
                MetaNamedElement.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                return MetaNamedElement;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaNamedElement = MetaNamedElement;
            var MetaNetworkInfo = (function (_super) {
                __extends(MetaNetworkInfo, _super);
                function MetaNetworkInfo() {
                    _super.call(this, "org.kevoree.NetworkInfo", 8);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaNetworkInfo.ATT_NAME;
                    var temp_references = new Array();
                    temp_references[0] = MetaNetworkInfo.REF_VALUES;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaNetworkInfo.getInstance = function () {
                    if (MetaNetworkInfo.INSTANCE == null) {
                        MetaNetworkInfo.INSTANCE = new org.kevoree.meta.MetaNetworkInfo();
                    }
                    return MetaNetworkInfo.INSTANCE;
                };
                MetaNetworkInfo.INSTANCE = null;
                MetaNetworkInfo.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaNetworkInfo.REF_VALUES = new org.kevoree.modeling.api.abs.AbstractMetaReference("values", 6, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaNetworkInfo.getInstance();
                });
                return MetaNetworkInfo;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaNetworkInfo = MetaNetworkInfo;
            var MetaNodeType = (function (_super) {
                __extends(MetaNodeType, _super);
                function MetaNodeType() {
                    _super.call(this, "org.kevoree.NodeType", 30);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaNodeType.ATT_NAME;
                    temp_attributes[1] = MetaNodeType.ATT_ABSTRACT;
                    temp_attributes[2] = MetaNodeType.ATT_VERSION;
                    var temp_references = new Array();
                    temp_references[0] = MetaNodeType.REF_SUPERTYPES;
                    temp_references[1] = MetaNodeType.REF_METADATA;
                    temp_references[2] = MetaNodeType.REF_DEPLOYUNITS;
                    temp_references[3] = MetaNodeType.REF_DICTIONARYTYPE;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaNodeType.getInstance = function () {
                    if (MetaNodeType.INSTANCE == null) {
                        MetaNodeType.INSTANCE = new org.kevoree.meta.MetaNodeType();
                    }
                    return MetaNodeType.INSTANCE;
                };
                MetaNodeType.INSTANCE = null;
                MetaNodeType.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaNodeType.ATT_ABSTRACT = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("abstract", 6, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaNodeType.ATT_VERSION = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("version", 7, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaNodeType.REF_SUPERTYPES = new org.kevoree.modeling.api.abs.AbstractMetaReference("superTypes", 8, false, false, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaNodeType.getInstance();
                });
                MetaNodeType.REF_METADATA = new org.kevoree.modeling.api.abs.AbstractMetaReference("metaData", 9, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaNodeType.getInstance();
                });
                MetaNodeType.REF_DEPLOYUNITS = new org.kevoree.modeling.api.abs.AbstractMetaReference("deployUnits", 10, false, false, function () {
                    return org.kevoree.meta.MetaDeployUnit.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaNodeType.getInstance();
                });
                MetaNodeType.REF_DICTIONARYTYPE = new org.kevoree.modeling.api.abs.AbstractMetaReference("dictionaryType", 11, true, true, function () {
                    return org.kevoree.meta.MetaDictionaryType.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaNodeType.getInstance();
                });
                return MetaNodeType;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaNodeType = MetaNodeType;
            var MetaOperation = (function (_super) {
                __extends(MetaOperation, _super);
                function MetaOperation() {
                    _super.call(this, "org.kevoree.Operation", 25);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaOperation.ATT_NAME;
                    var temp_references = new Array();
                    temp_references[0] = MetaOperation.REF_PARAMETERS;
                    temp_references[1] = MetaOperation.REF_RETURNTYPE;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaOperation.getInstance = function () {
                    if (MetaOperation.INSTANCE == null) {
                        MetaOperation.INSTANCE = new org.kevoree.meta.MetaOperation();
                    }
                    return MetaOperation.INSTANCE;
                };
                MetaOperation.INSTANCE = null;
                MetaOperation.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaOperation.REF_PARAMETERS = new org.kevoree.modeling.api.abs.AbstractMetaReference("parameters", 6, true, false, function () {
                    return org.kevoree.meta.MetaParameter.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaOperation.getInstance();
                });
                MetaOperation.REF_RETURNTYPE = new org.kevoree.modeling.api.abs.AbstractMetaReference("returnType", 7, false, true, function () {
                    return org.kevoree.meta.MetaTypedElement.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaOperation.getInstance();
                });
                return MetaOperation;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaOperation = MetaOperation;
            var MetaPackage = (function (_super) {
                __extends(MetaPackage, _super);
                function MetaPackage() {
                    _super.call(this, "org.kevoree.Package", 13);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaPackage.ATT_NAME;
                    var temp_references = new Array();
                    temp_references[0] = MetaPackage.REF_TYPEDEFINITIONS;
                    temp_references[1] = MetaPackage.REF_DEPLOYUNITS;
                    temp_references[2] = MetaPackage.REF_PACKAGES;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaPackage.getInstance = function () {
                    if (MetaPackage.INSTANCE == null) {
                        MetaPackage.INSTANCE = new org.kevoree.meta.MetaPackage();
                    }
                    return MetaPackage.INSTANCE;
                };
                MetaPackage.INSTANCE = null;
                MetaPackage.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaPackage.REF_TYPEDEFINITIONS = new org.kevoree.modeling.api.abs.AbstractMetaReference("typeDefinitions", 6, true, false, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaPackage.getInstance();
                });
                MetaPackage.REF_DEPLOYUNITS = new org.kevoree.modeling.api.abs.AbstractMetaReference("deployUnits", 7, true, false, function () {
                    return org.kevoree.meta.MetaDeployUnit.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaPackage.getInstance();
                });
                MetaPackage.REF_PACKAGES = new org.kevoree.modeling.api.abs.AbstractMetaReference("packages", 8, true, false, function () {
                    return org.kevoree.meta.MetaPackage.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaPackage.getInstance();
                });
                return MetaPackage;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaPackage = MetaPackage;
            var MetaParameter = (function (_super) {
                __extends(MetaParameter, _super);
                function MetaParameter() {
                    _super.call(this, "org.kevoree.Parameter", 26);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaParameter.ATT_NAME;
                    temp_attributes[1] = MetaParameter.ATT_ORDER;
                    var temp_references = new Array();
                    temp_references[0] = MetaParameter.REF_TYPE;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaParameter.getInstance = function () {
                    if (MetaParameter.INSTANCE == null) {
                        MetaParameter.INSTANCE = new org.kevoree.meta.MetaParameter();
                    }
                    return MetaParameter.INSTANCE;
                };
                MetaParameter.INSTANCE = null;
                MetaParameter.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaParameter.ATT_ORDER = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("order", 6, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.INT, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaParameter.REF_TYPE = new org.kevoree.modeling.api.abs.AbstractMetaReference("type", 7, false, true, function () {
                    return org.kevoree.meta.MetaTypedElement.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaParameter.getInstance();
                });
                return MetaParameter;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaParameter = MetaParameter;
            var MetaPort = (function (_super) {
                __extends(MetaPort, _super);
                function MetaPort() {
                    _super.call(this, "org.kevoree.Port", 1);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaPort.ATT_NAME;
                    var temp_references = new Array();
                    temp_references[0] = MetaPort.REF_BINDINGS;
                    temp_references[1] = MetaPort.REF_PORTTYPEREF;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaPort.getInstance = function () {
                    if (MetaPort.INSTANCE == null) {
                        MetaPort.INSTANCE = new org.kevoree.meta.MetaPort();
                    }
                    return MetaPort.INSTANCE;
                };
                MetaPort.INSTANCE = null;
                MetaPort.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaPort.REF_BINDINGS = new org.kevoree.modeling.api.abs.AbstractMetaReference("bindings", 6, false, false, function () {
                    return org.kevoree.meta.MetaMBinding.getInstance();
                }, function () {
                    return org.kevoree.meta.MetaMBinding.REF_PORT;
                }, function () {
                    return org.kevoree.meta.MetaPort.getInstance();
                });
                MetaPort.REF_PORTTYPEREF = new org.kevoree.modeling.api.abs.AbstractMetaReference("portTypeRef", 7, false, true, function () {
                    return org.kevoree.meta.MetaPortTypeRef.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaPort.getInstance();
                });
                return MetaPort;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaPort = MetaPort;
            var MetaPortType = (function (_super) {
                __extends(MetaPortType, _super);
                function MetaPortType() {
                    _super.call(this, "org.kevoree.PortType", 16);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaPortType.ATT_NAME;
                    temp_attributes[1] = MetaPortType.ATT_SYNCHRONE;
                    temp_attributes[2] = MetaPortType.ATT_ABSTRACT;
                    temp_attributes[3] = MetaPortType.ATT_VERSION;
                    var temp_references = new Array();
                    temp_references[0] = MetaPortType.REF_SUPERTYPES;
                    temp_references[1] = MetaPortType.REF_METADATA;
                    temp_references[2] = MetaPortType.REF_DEPLOYUNITS;
                    temp_references[3] = MetaPortType.REF_DICTIONARYTYPE;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaPortType.getInstance = function () {
                    if (MetaPortType.INSTANCE == null) {
                        MetaPortType.INSTANCE = new org.kevoree.meta.MetaPortType();
                    }
                    return MetaPortType.INSTANCE;
                };
                MetaPortType.INSTANCE = null;
                MetaPortType.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaPortType.ATT_SYNCHRONE = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("synchrone", 6, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaPortType.ATT_ABSTRACT = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("abstract", 7, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaPortType.ATT_VERSION = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("version", 8, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaPortType.REF_SUPERTYPES = new org.kevoree.modeling.api.abs.AbstractMetaReference("superTypes", 9, false, false, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaPortType.getInstance();
                });
                MetaPortType.REF_METADATA = new org.kevoree.modeling.api.abs.AbstractMetaReference("metaData", 10, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaPortType.getInstance();
                });
                MetaPortType.REF_DEPLOYUNITS = new org.kevoree.modeling.api.abs.AbstractMetaReference("deployUnits", 11, false, false, function () {
                    return org.kevoree.meta.MetaDeployUnit.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaPortType.getInstance();
                });
                MetaPortType.REF_DICTIONARYTYPE = new org.kevoree.modeling.api.abs.AbstractMetaReference("dictionaryType", 12, true, true, function () {
                    return org.kevoree.meta.MetaDictionaryType.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaPortType.getInstance();
                });
                return MetaPortType;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaPortType = MetaPortType;
            var MetaPortTypeMapping = (function (_super) {
                __extends(MetaPortTypeMapping, _super);
                function MetaPortTypeMapping() {
                    _super.call(this, "org.kevoree.PortTypeMapping", 23);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaPortTypeMapping.ATT_PARAMTYPES;
                    temp_attributes[1] = MetaPortTypeMapping.ATT_BEANMETHODNAME;
                    temp_attributes[2] = MetaPortTypeMapping.ATT_SERVICEMETHODNAME;
                    var temp_references = new Array();
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaPortTypeMapping.getInstance = function () {
                    if (MetaPortTypeMapping.INSTANCE == null) {
                        MetaPortTypeMapping.INSTANCE = new org.kevoree.meta.MetaPortTypeMapping();
                    }
                    return MetaPortTypeMapping.INSTANCE;
                };
                MetaPortTypeMapping.INSTANCE = null;
                MetaPortTypeMapping.ATT_PARAMTYPES = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("paramTypes", 5, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaPortTypeMapping.ATT_BEANMETHODNAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("beanMethodName", 6, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaPortTypeMapping.ATT_SERVICEMETHODNAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("serviceMethodName", 7, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                return MetaPortTypeMapping;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaPortTypeMapping = MetaPortTypeMapping;
            var MetaPortTypeRef = (function (_super) {
                __extends(MetaPortTypeRef, _super);
                function MetaPortTypeRef() {
                    _super.call(this, "org.kevoree.PortTypeRef", 4);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaPortTypeRef.ATT_NODEPENDENCY;
                    temp_attributes[1] = MetaPortTypeRef.ATT_NAME;
                    temp_attributes[2] = MetaPortTypeRef.ATT_OPTIONAL;
                    var temp_references = new Array();
                    temp_references[0] = MetaPortTypeRef.REF_REF;
                    temp_references[1] = MetaPortTypeRef.REF_MAPPINGS;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaPortTypeRef.getInstance = function () {
                    if (MetaPortTypeRef.INSTANCE == null) {
                        MetaPortTypeRef.INSTANCE = new org.kevoree.meta.MetaPortTypeRef();
                    }
                    return MetaPortTypeRef.INSTANCE;
                };
                MetaPortTypeRef.INSTANCE = null;
                MetaPortTypeRef.ATT_NODEPENDENCY = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("noDependency", 5, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaPortTypeRef.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 6, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaPortTypeRef.ATT_OPTIONAL = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("optional", 7, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaPortTypeRef.REF_REF = new org.kevoree.modeling.api.abs.AbstractMetaReference("ref", 8, false, true, function () {
                    return org.kevoree.meta.MetaPortType.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaPortTypeRef.getInstance();
                });
                MetaPortTypeRef.REF_MAPPINGS = new org.kevoree.modeling.api.abs.AbstractMetaReference("mappings", 9, true, false, function () {
                    return org.kevoree.meta.MetaPortTypeMapping.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaPortTypeRef.getInstance();
                });
                return MetaPortTypeRef;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaPortTypeRef = MetaPortTypeRef;
            var MetaRepository = (function (_super) {
                __extends(MetaRepository, _super);
                function MetaRepository() {
                    _super.call(this, "org.kevoree.Repository", 10);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaRepository.ATT_URL;
                    var temp_references = new Array();
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaRepository.getInstance = function () {
                    if (MetaRepository.INSTANCE == null) {
                        MetaRepository.INSTANCE = new org.kevoree.meta.MetaRepository();
                    }
                    return MetaRepository.INSTANCE;
                };
                MetaRepository.INSTANCE = null;
                MetaRepository.ATT_URL = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("url", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                return MetaRepository;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaRepository = MetaRepository;
            var MetaServicePortType = (function (_super) {
                __extends(MetaServicePortType, _super);
                function MetaServicePortType() {
                    _super.call(this, "org.kevoree.ServicePortType", 24);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaServicePortType.ATT_NAME;
                    temp_attributes[1] = MetaServicePortType.ATT_SYNCHRONE;
                    temp_attributes[2] = MetaServicePortType.ATT_ABSTRACT;
                    temp_attributes[3] = MetaServicePortType.ATT_INTERFACE;
                    temp_attributes[4] = MetaServicePortType.ATT_VERSION;
                    var temp_references = new Array();
                    temp_references[0] = MetaServicePortType.REF_SUPERTYPES;
                    temp_references[1] = MetaServicePortType.REF_METADATA;
                    temp_references[2] = MetaServicePortType.REF_OPERATIONS;
                    temp_references[3] = MetaServicePortType.REF_DEPLOYUNITS;
                    temp_references[4] = MetaServicePortType.REF_DICTIONARYTYPE;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaServicePortType.getInstance = function () {
                    if (MetaServicePortType.INSTANCE == null) {
                        MetaServicePortType.INSTANCE = new org.kevoree.meta.MetaServicePortType();
                    }
                    return MetaServicePortType.INSTANCE;
                };
                MetaServicePortType.INSTANCE = null;
                MetaServicePortType.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaServicePortType.ATT_SYNCHRONE = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("synchrone", 6, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaServicePortType.ATT_ABSTRACT = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("abstract", 7, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaServicePortType.ATT_INTERFACE = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("interface", 8, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaServicePortType.ATT_VERSION = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("version", 9, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaServicePortType.REF_SUPERTYPES = new org.kevoree.modeling.api.abs.AbstractMetaReference("superTypes", 10, false, false, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaServicePortType.getInstance();
                });
                MetaServicePortType.REF_METADATA = new org.kevoree.modeling.api.abs.AbstractMetaReference("metaData", 11, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaServicePortType.getInstance();
                });
                MetaServicePortType.REF_OPERATIONS = new org.kevoree.modeling.api.abs.AbstractMetaReference("operations", 12, true, false, function () {
                    return org.kevoree.meta.MetaOperation.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaServicePortType.getInstance();
                });
                MetaServicePortType.REF_DEPLOYUNITS = new org.kevoree.modeling.api.abs.AbstractMetaReference("deployUnits", 13, false, false, function () {
                    return org.kevoree.meta.MetaDeployUnit.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaServicePortType.getInstance();
                });
                MetaServicePortType.REF_DICTIONARYTYPE = new org.kevoree.modeling.api.abs.AbstractMetaReference("dictionaryType", 14, true, true, function () {
                    return org.kevoree.meta.MetaDictionaryType.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaServicePortType.getInstance();
                });
                return MetaServicePortType;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaServicePortType = MetaServicePortType;
            var MetaTypeDefinition = (function (_super) {
                __extends(MetaTypeDefinition, _super);
                function MetaTypeDefinition() {
                    _super.call(this, "org.kevoree.TypeDefinition", 5);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaTypeDefinition.ATT_NAME;
                    temp_attributes[1] = MetaTypeDefinition.ATT_ABSTRACT;
                    temp_attributes[2] = MetaTypeDefinition.ATT_VERSION;
                    var temp_references = new Array();
                    temp_references[0] = MetaTypeDefinition.REF_SUPERTYPES;
                    temp_references[1] = MetaTypeDefinition.REF_METADATA;
                    temp_references[2] = MetaTypeDefinition.REF_DEPLOYUNITS;
                    temp_references[3] = MetaTypeDefinition.REF_DICTIONARYTYPE;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaTypeDefinition.getInstance = function () {
                    if (MetaTypeDefinition.INSTANCE == null) {
                        MetaTypeDefinition.INSTANCE = new org.kevoree.meta.MetaTypeDefinition();
                    }
                    return MetaTypeDefinition.INSTANCE;
                };
                MetaTypeDefinition.INSTANCE = null;
                MetaTypeDefinition.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaTypeDefinition.ATT_ABSTRACT = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("abstract", 6, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaTypeDefinition.ATT_VERSION = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("version", 7, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaTypeDefinition.REF_SUPERTYPES = new org.kevoree.modeling.api.abs.AbstractMetaReference("superTypes", 8, false, false, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                });
                MetaTypeDefinition.REF_METADATA = new org.kevoree.modeling.api.abs.AbstractMetaReference("metaData", 9, true, false, function () {
                    return org.kevoree.meta.MetaValue.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                });
                MetaTypeDefinition.REF_DEPLOYUNITS = new org.kevoree.modeling.api.abs.AbstractMetaReference("deployUnits", 10, false, false, function () {
                    return org.kevoree.meta.MetaDeployUnit.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                });
                MetaTypeDefinition.REF_DICTIONARYTYPE = new org.kevoree.modeling.api.abs.AbstractMetaReference("dictionaryType", 11, true, true, function () {
                    return org.kevoree.meta.MetaDictionaryType.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaTypeDefinition.getInstance();
                });
                return MetaTypeDefinition;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaTypeDefinition = MetaTypeDefinition;
            var MetaTypedElement = (function (_super) {
                __extends(MetaTypedElement, _super);
                function MetaTypedElement() {
                    _super.call(this, "org.kevoree.TypedElement", 22);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaTypedElement.ATT_NAME;
                    var temp_references = new Array();
                    temp_references[0] = MetaTypedElement.REF_GENERICTYPES;
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaTypedElement.getInstance = function () {
                    if (MetaTypedElement.INSTANCE == null) {
                        MetaTypedElement.INSTANCE = new org.kevoree.meta.MetaTypedElement();
                    }
                    return MetaTypedElement.INSTANCE;
                };
                MetaTypedElement.INSTANCE = null;
                MetaTypedElement.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaTypedElement.REF_GENERICTYPES = new org.kevoree.modeling.api.abs.AbstractMetaReference("genericTypes", 6, false, false, function () {
                    return org.kevoree.meta.MetaTypedElement.getInstance();
                }, null, function () {
                    return org.kevoree.meta.MetaTypedElement.getInstance();
                });
                return MetaTypedElement;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaTypedElement = MetaTypedElement;
            var MetaValue = (function (_super) {
                __extends(MetaValue, _super);
                function MetaValue() {
                    _super.call(this, "org.kevoree.Value", 18);
                    var temp_attributes = new Array();
                    temp_attributes[0] = MetaValue.ATT_NAME;
                    temp_attributes[1] = MetaValue.ATT_VALUE;
                    var temp_references = new Array();
                    var temp_operations = new Array();
                    this.init(temp_attributes, temp_references, temp_operations);
                }
                MetaValue.getInstance = function () {
                    if (MetaValue.INSTANCE == null) {
                        MetaValue.INSTANCE = new org.kevoree.meta.MetaValue();
                    }
                    return MetaValue.INSTANCE;
                };
                MetaValue.INSTANCE = null;
                MetaValue.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                MetaValue.ATT_VALUE = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("value", 6, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                return MetaValue;
            })(org.kevoree.modeling.api.abs.AbstractMetaClass);
            meta.MetaValue = MetaValue;
        })(meta = kevoree.meta || (kevoree.meta = {}));
    })(kevoree = org.kevoree || (org.kevoree = {}));
})(org || (org = {}));
