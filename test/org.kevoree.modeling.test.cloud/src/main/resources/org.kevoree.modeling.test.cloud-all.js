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
/*
 String.prototype.getBytes = function () {
 var res:number[] = new Number[this.length];
 for (var i = 0; i < this.length; i++) {
 res[i] = Number(this.charAt(i));
 }
 return res;
 };
 */
String.prototype.matches = function (regEx) {
    return this.match(regEx).length > 0;
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
            return Short;
        })();
        lang.Short = Short;
        var Throwable = (function () {
            function Throwable() {
            }
            Throwable.prototype.printStackTrace = function () {
                throw new Exception("Abstract implementation");
            };
            return Throwable;
        })();
        lang.Throwable = Throwable;
        var Exception = (function (_super) {
            __extends(Exception, _super);
            function Exception(message) {
                _super.call(this);
                this.message = message;
            }
            Exception.prototype.printStackTrace = function () {
                console.error(this.message);
            };
            return Exception;
        })(Throwable);
        lang.Exception = Exception;
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
                    throw new java.lang.Exception("Assert Error " + p + " must be null");
                }
            };
            Assert.assertNull = function (p) {
                if (p != null) {
                    throw new java.lang.Exception("Assert Error " + p + " must be null");
                }
            };
            Assert.assertEquals = function (p, p2) {
                if (p != p2) {
                    throw new java.lang.Exception("Assert Error " + p + " must be equals to " + p2);
                }
            };
            Assert.assertNotEquals = function (p, p2) {
                if (p == p2) {
                    throw new java.lang.Exception("Assert Error " + p + " must be equals to " + p2);
                }
            };
            Assert.assertTrue = function (b) {
                if (!b) {
                    throw new java.lang.Exception("Assert Error " + b + " must be true");
                }
            };
            return Assert;
        })();
        junit.Assert = Assert;
    })(junit = org.junit || (org.junit = {}));
})(org || (org = {}));
var org;
(function (org) {
    (function (kevoree) {
        (function (modeling) {
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

                (function (abs) {
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

                        AbstractKView.prototype.metaClass = function (fqName) {
                            var metaClasses = this.metaClasses();
                            for (var i = 0; i < metaClasses.length; i++) {
                                if (metaClasses[i].metaName().equals(fqName)) {
                                    return metaClasses[i];
                                }
                            }
                            return null;
                        };

                        AbstractKView.prototype.createFQN = function (metaClassName) {
                            return this.create(this.metaClass(metaClassName));
                        };

                        AbstractKView.prototype.manageCache = function (obj) {
                            this.dimension().universe().storage().initKObject(obj, this);
                            return obj;
                        };

                        AbstractKView.prototype.setRoot = function (elem) {
                            elem.set_referenceInParent(null);
                            elem.setRoot(true);
                            this.dimension().universe().storage().setRoot(elem);
                        };

                        AbstractKView.prototype.select = function (query, callback) {
                            this.dimension().universe().storage().getRoot(this, function (rootObj) {
                                var cleanedQuery = query;
                                if (cleanedQuery.equals("/")) {
                                    var res = new java.util.ArrayList();
                                    if (rootObj != null) {
                                        res.add(rootObj);
                                    }
                                    callback(res.toArray(new Array()));
                                } else {
                                    if (cleanedQuery.startsWith("/")) {
                                        cleanedQuery = cleanedQuery.substring(1);
                                    }
                                    org.kevoree.modeling.api.select.KSelector.select(rootObj, cleanedQuery, callback);
                                }
                            });
                        };

                        AbstractKView.prototype.lookup = function (kid, callback) {
                            this.dimension().universe().storage().lookup(this, kid, callback);
                        };

                        AbstractKView.prototype.lookupAll = function (keys, callback) {
                            this.dimension().universe().storage().lookupAll(this, keys, callback);
                        };

                        AbstractKView.prototype.stream = function (query, callback) {
                        };

                        AbstractKView.prototype.createProxy = function (clazz, timeTree, key) {
                            return this.internalCreate(clazz, timeTree, key);
                        };

                        AbstractKView.prototype.create = function (clazz) {
                            var newObj = this.internalCreate(clazz, new org.kevoree.modeling.api.time.DefaultTimeTree().insert(this.now()), this.dimension().universe().storage().nextObjectKey());
                            if (newObj != null) {
                                newObj.setDirty(true);
                                this.dimension().universe().storage().notify(new org.kevoree.modeling.api.event.DefaultKEvent(org.kevoree.modeling.api.KActionType.NEW, newObj, clazz, null));
                            }
                            return newObj;
                        };

                        AbstractKView.prototype.listen = function (listener) {
                            this.dimension().universe().storage().registerListener(this, listener);
                        };

                        AbstractKView.prototype.internalCreate = function (clazz, timeTree, key) {
                            throw "Abstract method";
                        };

                        AbstractKView.prototype.metaClasses = function () {
                            throw "Abstract method";
                        };

                        AbstractKView.prototype.diff = function (origin, target, callback) {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.diff(origin, target, callback);
                        };

                        AbstractKView.prototype.merge = function (origin, target, callback) {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.merge(origin, target, callback);
                        };

                        AbstractKView.prototype.intersection = function (origin, target, callback) {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.intersection(origin, target, callback);
                        };

                        AbstractKView.prototype.slice = function (elems, callback) {
                            org.kevoree.modeling.api.operation.DefaultModelSlicer.slice(elems, callback);
                        };

                        AbstractKView.prototype.clone = function (o, callback) {
                            org.kevoree.modeling.api.operation.DefaultModelCloner.clone(o, callback);
                        };

                        AbstractKView.prototype.json = function () {
                            return new org.kevoree.modeling.api.json.JsonFormat(this);
                        };

                        AbstractKView.prototype.xmi = function () {
                            return new org.kevoree.modeling.api.xmi.XmiFormat(this);
                        };
                        return AbstractKView;
                    })();
                    abs.AbstractKView = AbstractKView;

                    var AbstractKDimension = (function () {
                        function AbstractKDimension(p_universe, p_key) {
                            this._timesCache = new java.util.HashMap();
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

                        AbstractKDimension.prototype.timeTrees = function (keys, callback) {
                            this.universe().storage().timeTrees(this, keys, callback);
                        };

                        AbstractKDimension.prototype.timeTree = function (key, callback) {
                            this.universe().storage().timeTree(this, key, callback);
                        };

                        AbstractKDimension.prototype.parent = function (callback) {
                        };

                        AbstractKDimension.prototype.children = function (callback) {
                        };

                        AbstractKDimension.prototype.fork = function (callback) {
                        };

                        AbstractKDimension.prototype.time = function (timePoint) {
                            if (this._timesCache.containsKey(timePoint)) {
                                return this._timesCache.get(timePoint);
                            } else {
                                var newCreatedTime = this.internal_create(timePoint);
                                this._timesCache.put(timePoint, newCreatedTime);
                                return newCreatedTime;
                            }
                        };

                        AbstractKDimension.prototype.flushTimes = function () {
                            this._timesCache.clear();
                        };

                        AbstractKDimension.prototype.listen = function (listener) {
                            this.universe().storage().registerListener(this, listener);
                        };

                        AbstractKDimension.prototype.internal_create = function (timePoint) {
                            throw "Abstract method";
                        };
                        return AbstractKDimension;
                    })();
                    abs.AbstractKDimension = AbstractKDimension;

                    var AbstractKUniverse = (function () {
                        function AbstractKUniverse() {
                            this._storage = new org.kevoree.modeling.api.data.DefaultKStore();
                        }
                        AbstractKUniverse.prototype.storage = function () {
                            return this._storage;
                        };

                        AbstractKUniverse.prototype.newDimension = function (callback) {
                            var nextKey = this._storage.nextDimensionKey();
                            var newDimension = this.internal_create(nextKey);
                            this.storage().initDimension(newDimension, function (throwable) {
                                if (throwable != null) {
                                    callback(newDimension);
                                } else {
                                    throwable.printStackTrace();
                                    callback(null);
                                }
                            });
                        };

                        AbstractKUniverse.prototype.internal_create = function (key) {
                            throw "Abstract method";
                        };

                        AbstractKUniverse.prototype.dimension = function (key, callback) {
                            var existingDimension = this._storage.getDimension(key);
                            if (existingDimension != null) {
                                callback(existingDimension);
                            } else {
                                var newDimension = this.internal_create(key);
                                this.storage().initDimension(newDimension, function (throwable) {
                                    callback(newDimension);
                                });
                            }
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
                            this.storage().registerListener(this, listener);
                        };

                        AbstractKUniverse.prototype.setEventBroker = function (eventBroker) {
                            this.storage().setEventBroker(eventBroker);
                            return this;
                        };

                        AbstractKUniverse.prototype.setDataBase = function (dataBase) {
                            this.storage().setDataBase(dataBase);
                            return this;
                        };
                        return AbstractKUniverse;
                    })();
                    abs.AbstractKUniverse = AbstractKUniverse;

                    var AbstractKObject = (function () {
                        function AbstractKObject(p_view, p_metaClass, p_uuid, p_now, p_dimension, p_timeTree) {
                            this._isDirty = false;
                            this._isDeleted = false;
                            this._isRoot = false;
                            this._referenceInParent = null;
                            this._view = p_view;
                            this._metaClass = p_metaClass;
                            this._uuid = p_uuid;
                            this._now = p_now;
                            this._dimension = p_dimension;
                            this._timeTree = p_timeTree;
                        }
                        AbstractKObject.prototype.isDirty = function () {
                            return this._isDirty;
                        };

                        AbstractKObject.prototype.setDirty = function (isDirty) {
                            this._isDirty = isDirty;
                        };

                        AbstractKObject.prototype.view = function () {
                            return this._view;
                        };

                        AbstractKObject.prototype.uuid = function () {
                            return this._uuid;
                        };

                        AbstractKObject.prototype.metaClass = function () {
                            return this._metaClass;
                        };

                        AbstractKObject.prototype.isDeleted = function () {
                            return this._isDeleted;
                        };

                        AbstractKObject.prototype.isRoot = function () {
                            return this._isRoot;
                        };

                        AbstractKObject.prototype.setRoot = function (isRoot) {
                            this._isRoot = isRoot;
                        };

                        AbstractKObject.prototype.now = function () {
                            return this._now;
                        };

                        AbstractKObject.prototype.timeTree = function () {
                            return this._timeTree;
                        };

                        AbstractKObject.prototype.dimension = function () {
                            return this._dimension;
                        };

                        AbstractKObject.prototype.path = function (callback) {
                            var _this = this;
                            if (this._isRoot) {
                                callback("/");
                            } else {
                                this.parent(function (parent) {
                                    if (parent == null) {
                                        callback(null);
                                    } else {
                                        parent.path(function (parentPath) {
                                            callback(org.kevoree.modeling.api.util.Helper.path(parentPath, _this._referenceInParent, _this));
                                        });
                                    }
                                });
                            }
                        };

                        AbstractKObject.prototype.parentUuid = function () {
                            return this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ)[AbstractKObject.PARENT_INDEX];
                        };

                        AbstractKObject.prototype.setParentUuid = function (parentKID) {
                            this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE)[AbstractKObject.PARENT_INDEX] = parentKID;
                        };

                        AbstractKObject.prototype.parent = function (callback) {
                            var parentKID = this.parentUuid();
                            if (parentKID == null) {
                                callback(null);
                            } else {
                                this._view.lookup(parentKID, callback);
                            }
                        };

                        AbstractKObject.prototype.set_referenceInParent = function (_referenceInParent) {
                            this._referenceInParent = _referenceInParent;
                        };

                        AbstractKObject.prototype.referenceInParent = function () {
                            return this._referenceInParent;
                        };

                        AbstractKObject.prototype.delete = function (callback) {
                        };

                        AbstractKObject.prototype.select = function (query, callback) {
                            org.kevoree.modeling.api.select.KSelector.select(this, query, callback);
                        };

                        AbstractKObject.prototype.stream = function (query, callback) {
                        };

                        AbstractKObject.prototype.listen = function (listener) {
                            this.view().dimension().universe().storage().registerListener(this, listener);
                        };

                        AbstractKObject.prototype.jump = function (time, callback) {
                            this.view().dimension().time(time).lookup(this._uuid, function (kObject) {
                                callback(kObject);
                            });
                        };

                        AbstractKObject.prototype.domainKey = function () {
                            var builder = new java.lang.StringBuilder();
                            var atts = this.metaAttributes();
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
                            return builder.toString();
                        };

                        AbstractKObject.prototype.get = function (attribute) {
                            return attribute.strategy().extrapolate(this, attribute, this.cachedDependencies(attribute));
                        };

                        AbstractKObject.prototype.set = function (attribute, payload) {
                            attribute.strategy().mutate(this, attribute, payload, this.cachedDependencies(attribute));
                            this.view().dimension().universe().storage().notify(new org.kevoree.modeling.api.event.DefaultKEvent(org.kevoree.modeling.api.KActionType.SET, this, attribute, payload));
                        };

                        AbstractKObject.prototype.cachedDependencies = function (attribute) {
                            var timedDependencies = attribute.strategy().timedDependencies(this);
                            var cachedObjs = new Array();
                            for (var i = 0; i < timedDependencies.length; i++) {
                                if (timedDependencies[i] == this.now()) {
                                    cachedObjs[i] = this;
                                } else {
                                    cachedObjs[i] = this.view().dimension().universe().storage().cacheLookup(this.dimension(), timedDependencies[i], this.uuid());
                                }
                            }
                            return cachedObjs;
                        };

                        AbstractKObject.prototype.getCreateOrUpdatePayloadList = function (obj, payloadIndex) {
                            var previous = this.view().dimension().universe().storage().raw(obj, org.kevoree.modeling.api.data.AccessMode.WRITE)[payloadIndex];
                            if (previous == null) {
                                if (payloadIndex == AbstractKObject.INBOUNDS_INDEX) {
                                    previous = new java.util.HashMap();
                                } else {
                                    previous = new java.util.HashSet();
                                }
                                this.view().dimension().universe().storage().raw(obj, org.kevoree.modeling.api.data.AccessMode.WRITE)[payloadIndex] = previous;
                            }
                            return previous;
                        };

                        AbstractKObject.prototype.removeFromContainer = function (param) {
                            if (param != null && param.parentUuid() != null && param.parentUuid() != this._uuid) {
                                this.view().lookup(param.parentUuid(), function (parent) {
                                    parent.mutate(org.kevoree.modeling.api.KActionType.REMOVE, param.referenceInParent(), param, true);
                                });
                            }
                        };

                        AbstractKObject.prototype.mutate = function (actionType, metaReference, param, setOpposite) {
                            var _this = this;
                            if (actionType.equals(org.kevoree.modeling.api.KActionType.ADD)) {
                                if (metaReference.single()) {
                                    this.mutate(org.kevoree.modeling.api.KActionType.SET, metaReference, param, setOpposite);
                                } else {
                                    var previousList = this.getCreateOrUpdatePayloadList(this, metaReference.index());
                                    previousList.add(param.uuid());
                                    if (metaReference.opposite() != null && setOpposite) {
                                        param.mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference.opposite(), this, false);
                                    }
                                    if (metaReference.contained()) {
                                        this.removeFromContainer(param);
                                        param.set_referenceInParent(metaReference);
                                        param.setParentUuid(this._uuid);
                                    }
                                    var inboundRefs = this.getCreateOrUpdatePayloadList(param, AbstractKObject.INBOUNDS_INDEX);
                                    inboundRefs.put(this.uuid(), metaReference.index());
                                    var event = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, param);
                                    this.view().dimension().universe().storage().notify(event);
                                }
                            } else {
                                if (actionType.equals(org.kevoree.modeling.api.KActionType.SET)) {
                                    if (!metaReference.single()) {
                                        this.mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference, param, setOpposite);
                                    } else {
                                        if (param == null) {
                                            this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference, null, setOpposite);
                                        } else {
                                            var payload = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                            var previous = payload[metaReference.index()];
                                            if (previous != null) {
                                                this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference, null, setOpposite);
                                            }
                                            payload[metaReference.index()] = param.uuid();
                                            if (metaReference.contained()) {
                                                this.removeFromContainer(param);
                                                param.set_referenceInParent(metaReference);
                                                param.setParentUuid(this._uuid);
                                            }
                                            var inboundRefs = this.getCreateOrUpdatePayloadList(param, AbstractKObject.INBOUNDS_INDEX);
                                            inboundRefs.put(this.uuid(), metaReference.index());
                                            var self = this;
                                            if (metaReference.opposite() != null && setOpposite) {
                                                if (previous != null) {
                                                    this.view().lookup(previous, function (resolved) {
                                                        resolved.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), self, false);
                                                    });
                                                }
                                                param.mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference.opposite(), this, false);
                                            }
                                            var event = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, param);
                                            this.view().dimension().universe().storage().notify(event);
                                        }
                                    }
                                } else {
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
                                                            resolvedParam.set_referenceInParent(null);
                                                            resolvedParam.setParentUuid(null);
                                                        }
                                                        if (metaReference.opposite() != null && setOpposite) {
                                                            resolvedParam.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), self, false);
                                                        }
                                                        var inboundRefs = _this.getCreateOrUpdatePayloadList(resolvedParam, AbstractKObject.INBOUNDS_INDEX);
                                                        inboundRefs.remove(_this.uuid());
                                                    }
                                                });
                                                var event = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, previousKid);
                                                this.view().dimension().universe().storage().notify(event);
                                            }
                                        } else {
                                            var payload = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                            var previous = payload[metaReference.index()];
                                            if (previous != null) {
                                                var previousList = previous;
                                                if (this.now() != this._now) {
                                                    var previousListNew = new java.util.HashSet();
                                                    previousListNew.addAll(previousList);
                                                    previousList = previousListNew;
                                                    payload[metaReference.index()] = previousList;
                                                }
                                                previousList.remove(param.uuid());
                                                if (metaReference.contained()) {
                                                    param.set_referenceInParent(null);
                                                    param.setParentUuid(null);
                                                }
                                                if (metaReference.opposite() != null && setOpposite) {
                                                    param.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), this, false);
                                                }
                                                var event = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, param);
                                                this.view().dimension().universe().storage().notify(event);
                                            }
                                            var inboundRefs = this.getCreateOrUpdatePayloadList(param, AbstractKObject.INBOUNDS_INDEX);
                                            inboundRefs.remove(this.uuid());
                                        }
                                    }
                                }
                            }
                        };

                        AbstractKObject.prototype.size = function (metaReference) {
                            var raw = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                            var ref = raw[metaReference.index()];
                            if (ref == null) {
                                return 0;
                            } else {
                                var refSet = ref;
                                return refSet.size();
                            }
                        };

                        AbstractKObject.prototype.each = function (metaReference, callback, end) {
                            var o = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ)[metaReference.index()];
                            if (o == null) {
                                if (end != null) {
                                    end(null);
                                } else {
                                    callback(null);
                                }
                            } else {
                                if (o instanceof java.util.Set) {
                                    var objs = o;
                                    var setContent = objs.toArray(new Array());
                                    this.view().lookupAll(setContent, function (result) {
                                        var endAlreadyCalled = false;
                                        try  {
                                            for (var l = 0; l < result.length; l++) {
                                                callback(result[l]);
                                            }
                                            endAlreadyCalled = true;
                                            end(null);
                                        } catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Throwable) {
                                                var t = $ex$;
                                                if (!endAlreadyCalled) {
                                                    end(t);
                                                }
                                            }
                                        }
                                    });
                                } else {
                                    this.view().lookup(o, function (resolved) {
                                        if (callback != null) {
                                            callback(resolved);
                                        }
                                        if (end != null) {
                                            end(null);
                                        }
                                    });
                                }
                            }
                        };

                        AbstractKObject.prototype.visitAttributes = function (visitor) {
                            var metaAttributes = this.metaAttributes();
                            for (var i = 0; i < metaAttributes.length; i++) {
                                visitor(metaAttributes[i], this.get(metaAttributes[i]));
                            }
                        };

                        AbstractKObject.prototype.metaAttribute = function (name) {
                            for (var i = 0; i < this.metaAttributes().length; i++) {
                                if (this.metaAttributes()[i].metaName().equals(name)) {
                                    return this.metaAttributes()[i];
                                }
                            }
                            return null;
                        };

                        AbstractKObject.prototype.metaReference = function (name) {
                            for (var i = 0; i < this.metaReferences().length; i++) {
                                if (this.metaReferences()[i].metaName().equals(name)) {
                                    return this.metaReferences()[i];
                                }
                            }
                            return null;
                        };

                        AbstractKObject.prototype.metaOperation = function (name) {
                            for (var i = 0; i < this.metaOperations().length; i++) {
                                if (this.metaOperations()[i].metaName().equals(name)) {
                                    return this.metaOperations()[i];
                                }
                            }
                            return null;
                        };

                        AbstractKObject.prototype.visit = function (visitor, end) {
                            this.internal_visit(visitor, end, false, false, null);
                        };

                        AbstractKObject.prototype.internal_visit = function (visitor, end, deep, treeOnly, alreadyVisited) {
                            if (alreadyVisited != null) {
                                alreadyVisited.add(this.uuid());
                            }
                            var toResolveds = new java.util.HashSet();
                            for (var i = 0; i < this.metaReferences().length; i++) {
                                var reference = this.metaReferences()[i];
                                if (!(treeOnly && !reference.contained())) {
                                    var raw = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                                    var o = null;
                                    if (raw != null) {
                                        o = raw[reference.index()];
                                    }
                                    if (o != null) {
                                        if (o instanceof java.util.Set) {
                                            var ol = o;
                                            var olArr = ol.toArray(new Array());
                                            for (var k = 0; k < olArr.length; k++) {
                                                toResolveds.add(olArr[k]);
                                            }
                                        } else {
                                            toResolveds.add(o);
                                        }
                                    }
                                }
                            }
                            if (toResolveds.isEmpty()) {
                                end(null);
                            } else {
                                this.view().lookupAll(toResolveds.toArray(new Array()), function (resolveds) {
                                    var nextDeep = new java.util.ArrayList();
                                    for (var i = 0; i < resolveds.length; i++) {
                                        var resolved = resolveds[i];
                                        var result = visitor(resolved);
                                        if (result.equals(org.kevoree.modeling.api.VisitResult.STOP)) {
                                            end(null);
                                        } else {
                                            if (deep) {
                                                if (result.equals(org.kevoree.modeling.api.VisitResult.CONTINUE)) {
                                                    if (alreadyVisited == null || !alreadyVisited.contains(resolved.uuid())) {
                                                        nextDeep.add(resolved);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (!nextDeep.isEmpty()) {
                                        var ii = new Array();
                                        ii[0] = 0;
                                        var next = new java.util.ArrayList();
                                        next.add(function (throwable) {
                                            ii[0] = ii[0] + 1;
                                            if (ii[0] == nextDeep.size()) {
                                                end(null);
                                            } else {
                                                if (treeOnly) {
                                                    nextDeep.get(ii[0]).treeVisit(visitor, next.get(0));
                                                } else {
                                                    nextDeep.get(ii[0]).graphVisit(visitor, next.get(0));
                                                }
                                            }
                                        });
                                        if (treeOnly) {
                                            nextDeep.get(ii[0]).treeVisit(visitor, next.get(0));
                                        } else {
                                            nextDeep.get(ii[0]).graphVisit(visitor, next.get(0));
                                        }
                                    } else {
                                        end(null);
                                    }
                                });
                            }
                        };

                        AbstractKObject.prototype.graphVisit = function (visitor, end) {
                            this.internal_visit(visitor, end, true, false, new java.util.HashSet());
                        };

                        AbstractKObject.prototype.treeVisit = function (visitor, end) {
                            this.internal_visit(visitor, end, true, true, null);
                        };

                        AbstractKObject.prototype.toRawJSON = function () {
                            return this.internal_json(true);
                        };

                        AbstractKObject.prototype.toJSON = function () {
                            return this.internal_json(false);
                        };

                        AbstractKObject.prototype.internal_json = function (isRawJson) {
                            var builder = new java.lang.StringBuilder();
                            builder.append("{\n");
                            builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META + "\" : \"");
                            builder.append(this.metaClass().metaName());
                            builder.append("\",\n");
                            builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID + "\" : \"");
                            builder.append(this.uuid());
                            if (this.isRoot()) {
                                builder.append("\",\n");
                                builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_ROOT + "\" : \"");
                                builder.append("true");
                            }
                            builder.append("\",\n");
                            var raw = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                            for (var i = 0; i < this.metaAttributes().length; i++) {
                                var payload = null;
                                if (isRawJson) {
                                    var payload_res = raw[this.metaAttributes()[i].index()];
                                    if (payload_res instanceof org.kevoree.modeling.api.extrapolation.ExtrapolationModel) {
                                        payload = payload_res.save();
                                    } else {
                                        if (payload_res != null) {
                                            payload = payload_res.toString();
                                        }
                                    }
                                } else {
                                    var payload_res = this.get(this.metaAttributes()[i]);
                                    if (payload_res != null) {
                                        payload = payload_res.toString();
                                    }
                                }
                                if (payload != null) {
                                    builder.append("\t");
                                    builder.append("\"");
                                    builder.append(this.metaAttributes()[i].metaName());
                                    builder.append("\":\"");
                                    builder.append(payload);
                                    builder.append("\",\n");
                                }
                            }
                            for (var i = 0; i < this.metaReferences().length; i++) {
                                var payload = null;
                                if (raw != null) {
                                    payload = raw[this.metaReferences()[i].index()];
                                }
                                if (payload != null) {
                                    builder.append("\t");
                                    builder.append("\"");
                                    builder.append(this.metaReferences()[i].metaName());
                                    builder.append("\":");
                                    if (this.metaReferences()[i].single()) {
                                        builder.append("\"");
                                        builder.append(payload);
                                        builder.append("\"");
                                    } else {
                                        var elems = payload;
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

                        AbstractKObject.prototype.toString = function () {
                            return this.toJSON();
                        };

                        AbstractKObject.prototype.traces = function (request) {
                            var traces = new java.util.ArrayList();
                            if (org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_ONLY.equals(request) || org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
                                for (var i = 0; i < this.metaAttributes().length; i++) {
                                    var current = this.metaAttributes()[i];
                                    var payload = this.get(current);
                                    if (payload != null) {
                                        traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(this._uuid, current, payload));
                                    }
                                }
                            }
                            if (org.kevoree.modeling.api.TraceRequest.REFERENCES_ONLY.equals(request) || org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
                                for (var i = 0; i < this.metaReferences().length; i++) {
                                    var ref = this.metaReferences()[i];
                                    var raw = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                                    var o = null;
                                    if (raw != null) {
                                        o = raw[ref.index()];
                                    }
                                    if (o instanceof java.util.Set) {
                                        var contents = o;
                                        var contentsArr = contents.toArray(new Array());
                                        for (var j = 0; j < contentsArr.length; j++) {
                                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(this._uuid, ref, contentsArr[j], null));
                                        }
                                    } else {
                                        if (o != null) {
                                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(this._uuid, ref, o, null));
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
                            } else {
                                var payload = rawPayload[AbstractKObject.INBOUNDS_INDEX];
                                if (payload != null) {
                                    if (payload instanceof java.util.Map) {
                                        var refs = payload;
                                        var oppositeKids = new java.util.HashSet();
                                        oppositeKids.addAll(refs.keySet());
                                        this._view.lookupAll(oppositeKids.toArray(new Array()), function (oppositeElements) {
                                            if (oppositeElements != null) {
                                                for (var k = 0; k < oppositeElements.length; k++) {
                                                    var opposite = oppositeElements[k];
                                                    var inboundRef = refs.get(opposite.uuid());
                                                    var metaRef = null;
                                                    var metaReferences = opposite.metaReferences();
                                                    for (var i = 0; i < metaReferences.length; i++) {
                                                        if (metaReferences[i].index() == inboundRef) {
                                                            metaRef = metaReferences[i];
                                                            break;
                                                        }
                                                    }
                                                    if (metaRef != null) {
                                                        var reference = new org.kevoree.modeling.api.InboundReference(metaRef, opposite);
                                                        try  {
                                                            callback(reference);
                                                        } catch ($ex$) {
                                                            if ($ex$ instanceof java.lang.Throwable) {
                                                                var t = $ex$;
                                                                end(t);
                                                            }
                                                        }
                                                    } else {
                                                        end(new java.lang.Exception("MetaReference not found with index:" + inboundRef + " in refs of " + opposite.metaClass().metaName()));
                                                    }
                                                }
                                                end(null);
                                            } else {
                                                end(new java.lang.Exception("Could not resolve opposite objects"));
                                            }
                                        });
                                    } else {
                                        end(new java.lang.Exception("Inbound refs payload is not a cset"));
                                    }
                                } else {
                                    end(null);
                                }
                            }
                        };

                        AbstractKObject.prototype.metaAttributes = function () {
                            throw "Abstract method";
                        };

                        AbstractKObject.prototype.metaReferences = function () {
                            throw "Abstract method";
                        };

                        AbstractKObject.prototype.metaOperations = function () {
                            throw "Abstract method";
                        };
                        AbstractKObject.PARENT_INDEX = 0;
                        AbstractKObject.INBOUNDS_INDEX = 1;
                        return AbstractKObject;
                    })();
                    abs.AbstractKObject = AbstractKObject;
                })(api.abs || (api.abs = {}));
                var abs = api.abs;
                (function (operation) {
                    var DefaultModelCloner = (function () {
                        function DefaultModelCloner() {
                        }
                        DefaultModelCloner.clone = function (originalObject, callback) {
                            if (originalObject == null || originalObject.view() == null || originalObject.view().dimension() == null) {
                                callback(null);
                            } else {
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
                                } else {
                                    java.util.Collections.reverse(parents);
                                    var parentsArr = parents.toArray(new Array());
                                    for (var k = 0; k < parentsArr.length; k++) {
                                        var parent = parentsArr[k];
                                        if (parent.parentUuid() != null) {
                                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(parent.parentUuid(), parent.referenceInParent(), parent.uuid(), parent.metaClass()));
                                        }
                                        var toAdd = elem.traces(org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_ONLY);
                                        for (var i = 0; i < toAdd.length; i++) {
                                            traces.add(toAdd[i]);
                                        }
                                        parentMap.put(parent.uuid(), parent);
                                    }
                                    if (cache.get(elem.uuid()) == null && parentMap.get(elem.uuid()) == null) {
                                        if (elem.parentUuid() != null) {
                                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.parentUuid(), elem.referenceInParent(), elem.uuid(), elem.metaClass()));
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
                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.uuid(), null, elem.uuid(), elem.metaClass()));
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
                                } else {
                                    target.treeVisit(function (elem) {
                                        var childPath = elem.uuid();
                                        if (objectsMap.containsKey(childPath)) {
                                            if (inter) {
                                                var currentReference = null;
                                                traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.parentUuid(), currentReference, elem.uuid(), elem.metaClass()));
                                            }
                                            traces.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(objectsMap.get(childPath), elem, inter, merge, false, true));
                                            tracesRef.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(objectsMap.get(childPath), elem, inter, merge, true, false));
                                            objectsMap.remove(childPath);
                                        } else {
                                            if (!inter) {
                                                var currentReference = null;
                                                traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.parentUuid(), currentReference, elem.uuid(), elem.metaClass()));
                                                traces.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(elem, elem, true, merge, false, true));
                                                tracesRef.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(elem, elem, true, merge, true, false));
                                            }
                                        }
                                        return org.kevoree.modeling.api.VisitResult.CONTINUE;
                                    }, function (throwable) {
                                        if (throwable != null) {
                                            throwable.printStackTrace();
                                            callback(null);
                                        } else {
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
                                        } else {
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
                                            } else {
                                                isEquals = false;
                                            }
                                        } else {
                                            isEquals = flatAtt1.equals(flatAtt2);
                                        }
                                        if (isEquals) {
                                            if (inter) {
                                                traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(current.uuid(), metaAttribute, flatAtt2));
                                            }
                                        } else {
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
                                for (var i = 0; i < current.metaReferences().length; i++) {
                                    var reference = current.metaReferences()[i];
                                    var payload = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[reference.index()];
                                    valuesRef.put(reference, payload);
                                }
                                if (sibling != null) {
                                    for (var i = 0; i < sibling.metaReferences().length; i++) {
                                        var reference = sibling.metaReferences()[i];
                                        var payload2 = sibling.view().dimension().universe().storage().raw(sibling, org.kevoree.modeling.api.data.AccessMode.READ)[reference.index()];
                                        var payload1 = valuesRef.get(reference);
                                        if (reference.single()) {
                                            var isEquals = true;
                                            if (payload1 == null) {
                                                if (payload2 == null) {
                                                    isEquals = true;
                                                } else {
                                                    isEquals = false;
                                                }
                                            } else {
                                                isEquals = payload1.equals(payload2);
                                            }
                                            if (isEquals) {
                                                if (inter) {
                                                    if (payload2 != null) {
                                                        traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, payload2, null));
                                                    }
                                                }
                                            } else {
                                                if (!inter) {
                                                    traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, payload2, null));
                                                }
                                            }
                                        } else {
                                            if (payload1 == null && payload2 != null) {
                                                var siblingToAdd = payload2.toArray(new Array());
                                                for (var j = 0; j < siblingToAdd.length; j++) {
                                                    var siblingElem = siblingToAdd[j];
                                                    if (!inter) {
                                                        traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, siblingElem, null));
                                                    }
                                                }
                                            } else {
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
                                                                traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, currentPath, null));
                                                            }
                                                        } else {
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
                                                } else {
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
                })(api.operation || (api.operation = {}));
                var operation = api.operation;

                (function (_trace) {
                    var ModelTraceApplicator = (function () {
                        function ModelTraceApplicator(targetModel) {
                            this.pendingObj = null;
                            this.pendingParent = null;
                            this.pendingParentRef = null;
                            this.pendingObjKID = null;
                            this.targetModel = targetModel;
                        }
                        ModelTraceApplicator.prototype.tryClosePending = function (srcKID) {
                            if (this.pendingObj != null && !(this.pendingObjKID.equals(srcKID))) {
                                this.pendingParent.mutate(org.kevoree.modeling.api.KActionType.ADD, this.pendingParentRef, this.pendingObj, true);
                                this.pendingObj = null;
                                this.pendingObjKID = null;
                                this.pendingParentRef = null;
                                this.pendingParent = null;
                            }
                        };

                        ModelTraceApplicator.prototype.createOrAdd = function (previousPath, target, reference, metaClass, callback) {
                            var _this = this;
                            if (previousPath != null) {
                                this.targetModel.view().lookup(previousPath, function (targetElem) {
                                    if (targetElem != null) {
                                        target.mutate(org.kevoree.modeling.api.KActionType.ADD, reference, targetElem, true);
                                        callback(null);
                                    } else {
                                        if (metaClass == null) {
                                            callback(new java.lang.Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
                                        } else {
                                            _this.pendingObj = _this.targetModel.view().createFQN(metaClass.metaName());
                                            _this.pendingObjKID = previousPath;
                                            _this.pendingParentRef = reference;
                                            _this.pendingParent = target;
                                            callback(null);
                                        }
                                    }
                                });
                            } else {
                                if (metaClass == null) {
                                    callback(new java.lang.Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
                                } else {
                                    this.pendingObj = this.targetModel.view().createFQN(metaClass.metaName());
                                    this.pendingObjKID = previousPath;
                                    this.pendingParentRef = reference;
                                    this.pendingParent = target;
                                    callback(null);
                                }
                            }
                        };

                        ModelTraceApplicator.prototype.applyTraceSequence = function (traceSeq, callback) {
                            var _this = this;
                            org.kevoree.modeling.api.util.Helper.forall(traceSeq.traces(), function (modelTrace, next) {
                                _this.applyTrace(modelTrace, next);
                            }, function (throwable) {
                                if (throwable != null) {
                                    callback(throwable);
                                } else {
                                    _this.tryClosePending(null);
                                    callback(null);
                                }
                            });
                        };

                        ModelTraceApplicator.prototype.applyTrace = function (trace, callback) {
                            var _this = this;
                            if (trace instanceof org.kevoree.modeling.api.trace.ModelAddTrace) {
                                var addTrace = trace;
                                this.tryClosePending(null);
                                this.targetModel.view().lookup(trace.getSrcKID(), function (resolvedTarget) {
                                    if (resolvedTarget == null) {
                                        callback(new java.lang.Exception("Add Trace source not found for path : " + trace.getSrcKID() + " pending " + _this.pendingObjKID + "\n" + trace.toString()));
                                    } else {
                                        _this.createOrAdd(addTrace.getPreviousKID(), resolvedTarget, trace.getMeta(), addTrace.getMetaClass(), callback);
                                    }
                                });
                            } else {
                                if (trace instanceof org.kevoree.modeling.api.trace.ModelRemoveTrace) {
                                    var removeTrace = trace;
                                    this.tryClosePending(trace.getSrcKID());
                                    this.targetModel.view().lookup(trace.getSrcKID(), function (targetElem) {
                                        if (targetElem != null) {
                                            _this.targetModel.view().lookup(removeTrace.getObjKID(), function (remoteObj) {
                                                targetElem.mutate(org.kevoree.modeling.api.KActionType.REMOVE, trace.getMeta(), remoteObj, true);
                                                callback(null);
                                            });
                                        } else {
                                            callback(null);
                                        }
                                    });
                                } else {
                                    if (trace instanceof org.kevoree.modeling.api.trace.ModelSetTrace) {
                                        var setTrace = trace;
                                        this.tryClosePending(trace.getSrcKID());
                                        if (!trace.getSrcKID().equals(this.pendingObjKID)) {
                                            this.targetModel.view().lookup(trace.getSrcKID(), function (tempObject) {
                                                if (tempObject == null) {
                                                    callback(new java.lang.Exception("Set Trace source not found for path : " + trace.getSrcKID() + " pending " + _this.pendingObjKID + "\n" + trace.toString()));
                                                } else {
                                                    tempObject.set(setTrace.getMeta(), setTrace.getContent());
                                                    callback(null);
                                                }
                                            });
                                        } else {
                                            if (this.pendingObj == null) {
                                                callback(new java.lang.Exception("Set Trace source not found for path : " + trace.getSrcKID() + " pending " + this.pendingObjKID + "\n" + trace.toString()));
                                            } else {
                                                this.pendingObj.set(setTrace.getMeta(), setTrace.getContent());
                                                callback(null);
                                            }
                                        }
                                    } else {
                                        callback(new java.lang.Exception("Unknow trace " + trace));
                                    }
                                }
                            }
                        };
                        return ModelTraceApplicator;
                    })();
                    _trace.ModelTraceApplicator = ModelTraceApplicator;

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

                        TraceSequence.prototype.parse = function (addtracesTxt) {
                            var lexer = new org.kevoree.modeling.api.json.Lexer(addtracesTxt);
                            var currentToken = lexer.nextToken();
                            if (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.LEFT_BRACKET) {
                                throw new java.lang.Exception("Bad Format : expect [");
                            }
                            currentToken = lexer.nextToken();
                            var keys = new java.util.HashMap();
                            var previousName = null;
                            while (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.EOF && currentToken.tokenType() != org.kevoree.modeling.api.json.Type.RIGHT_BRACKET) {
                                if (currentToken.tokenType() == org.kevoree.modeling.api.json.Type.LEFT_BRACE) {
                                    keys.clear();
                                }
                                if (currentToken.tokenType() == org.kevoree.modeling.api.json.Type.VALUE) {
                                    if (previousName != null) {
                                        keys.put(previousName, currentToken.value().toString());
                                        previousName = null;
                                    } else {
                                        previousName = currentToken.value().toString();
                                    }
                                }
                                if (currentToken.tokenType() == org.kevoree.modeling.api.json.Type.RIGHT_BRACE) {
                                    var traceTypeRead = keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.traceType.toString());
                                    if (traceTypeRead.equals(org.kevoree.modeling.api.KActionType.SET.toString())) {
                                        var srcFound = keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.src.toString());
                                        srcFound = org.kevoree.modeling.api.json.JsonString.unescape(srcFound);
                                        this._traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(java.lang.Long.parseLong(srcFound), new org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaAttribute(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.meta.toString())), org.kevoree.modeling.api.json.JsonString.unescape(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.content.toString()))));
                                    }
                                    if (traceTypeRead.equals(org.kevoree.modeling.api.KActionType.ADD.toString())) {
                                        var srcFound = keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.src.toString());
                                        srcFound = org.kevoree.modeling.api.json.JsonString.unescape(srcFound);
                                        this._traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(java.lang.Long.parseLong(srcFound), new org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaReference(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.meta.toString())), java.lang.Long.parseLong(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.previouspath.toString())), new org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaClass(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.typename.toString()))));
                                    }
                                    if (traceTypeRead.equals(org.kevoree.modeling.api.KActionType.REMOVE.toString())) {
                                        var srcFound = keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.src.toString());
                                        srcFound = org.kevoree.modeling.api.json.JsonString.unescape(srcFound);
                                        this._traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(java.lang.Long.parseLong(srcFound), new org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaReference(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.meta.toString())), java.lang.Long.parseLong(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.objpath.toString()))));
                                    }
                                }
                                currentToken = lexer.nextToken();
                            }
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
                        return TraceSequence;
                    })();
                    _trace.TraceSequence = TraceSequence;

                    var ModelSetTrace = (function () {
                        function ModelSetTrace(srcKID, attribute, content) {
                            this.traceType = org.kevoree.modeling.api.KActionType.SET;
                            this.srcKID = srcKID;
                            this.attribute = attribute;
                            this.content = content;
                        }
                        ModelSetTrace.prototype.getTraceType = function () {
                            return this.traceType;
                        };

                        ModelSetTrace.prototype.getSrcKID = function () {
                            return this.srcKID;
                        };

                        ModelSetTrace.prototype.getMeta = function () {
                            return this.attribute;
                        };

                        ModelSetTrace.prototype.getContent = function () {
                            return this.content;
                        };

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
                            org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.srcKID + "");
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.meta);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(this.attribute.metaName());
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            if (this.content != null) {
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.content);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.content.toString());
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            }
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.closeJSON);
                            return buffer.toString();
                        };
                        return ModelSetTrace;
                    })();
                    _trace.ModelSetTrace = ModelSetTrace;

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
                            ModelTraceConstants.coma,
                            ModelTraceConstants.dp
                        ];
                        return ModelTraceConstants;
                    })();
                    _trace.ModelTraceConstants = ModelTraceConstants;

                    (function (unresolved) {
                        var UnresolvedMetaAttribute = (function () {
                            function UnresolvedMetaAttribute(p_metaName) {
                                this._metaName = p_metaName;
                            }
                            UnresolvedMetaAttribute.prototype.key = function () {
                                return false;
                            };

                            UnresolvedMetaAttribute.prototype.origin = function () {
                                return null;
                            };

                            UnresolvedMetaAttribute.prototype.metaType = function () {
                                return null;
                            };

                            UnresolvedMetaAttribute.prototype.strategy = function () {
                                return null;
                            };

                            UnresolvedMetaAttribute.prototype.precision = function () {
                                return 0;
                            };

                            UnresolvedMetaAttribute.prototype.setExtrapolation = function (extrapolation) {
                            };

                            UnresolvedMetaAttribute.prototype.metaName = function () {
                                return this._metaName;
                            };

                            UnresolvedMetaAttribute.prototype.index = function () {
                                return -1;
                            };
                            return UnresolvedMetaAttribute;
                        })();
                        unresolved.UnresolvedMetaAttribute = UnresolvedMetaAttribute;

                        var UnresolvedMetaClass = (function () {
                            function UnresolvedMetaClass(p_metaName) {
                                this._metaName = p_metaName;
                            }
                            UnresolvedMetaClass.prototype.metaName = function () {
                                return this._metaName;
                            };

                            UnresolvedMetaClass.prototype.index = function () {
                                return -1;
                            };
                            return UnresolvedMetaClass;
                        })();
                        unresolved.UnresolvedMetaClass = UnresolvedMetaClass;

                        var UnresolvedMetaReference = (function () {
                            function UnresolvedMetaReference(p_metaName) {
                                this._metaName = p_metaName;
                            }
                            UnresolvedMetaReference.prototype.contained = function () {
                                return false;
                            };

                            UnresolvedMetaReference.prototype.single = function () {
                                return false;
                            };

                            UnresolvedMetaReference.prototype.metaType = function () {
                                return null;
                            };

                            UnresolvedMetaReference.prototype.opposite = function () {
                                return null;
                            };

                            UnresolvedMetaReference.prototype.origin = function () {
                                return null;
                            };

                            UnresolvedMetaReference.prototype.metaName = function () {
                                return this._metaName;
                            };

                            UnresolvedMetaReference.prototype.index = function () {
                                return -1;
                            };
                            return UnresolvedMetaReference;
                        })();
                        unresolved.UnresolvedMetaReference = UnresolvedMetaReference;
                    })(_trace.unresolved || (_trace.unresolved = {}));
                    var unresolved = _trace.unresolved;
                    var ModelAddTrace = (function () {
                        function ModelAddTrace(srcKID, reference, previousKID, metaClass) {
                            this.traceType = org.kevoree.modeling.api.KActionType.ADD;
                            this.srcKID = srcKID;
                            this.reference = reference;
                            this.previousKID = previousKID;
                            this.metaClass = metaClass;
                        }
                        ModelAddTrace.prototype.getPreviousKID = function () {
                            return this.previousKID;
                        };

                        ModelAddTrace.prototype.getMetaClass = function () {
                            return this.metaClass;
                        };

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
                            org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.srcKID + "");
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            if (this.reference != null) {
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.meta);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(this.reference.metaName());
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            }
                            if (this.previousKID != null) {
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.previouspath);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.previousKID + "");
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            }
                            if (this.metaClass != null) {
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.typename);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.metaClass.metaName());
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            }
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.closeJSON);
                            return buffer.toString();
                        };

                        ModelAddTrace.prototype.getMeta = function () {
                            return this.reference;
                        };

                        ModelAddTrace.prototype.getTraceType = function () {
                            return this.traceType;
                        };

                        ModelAddTrace.prototype.getSrcKID = function () {
                            return this.srcKID;
                        };
                        return ModelAddTrace;
                    })();
                    _trace.ModelAddTrace = ModelAddTrace;

                    var ModelRemoveTrace = (function () {
                        function ModelRemoveTrace(srcKID, reference, objKID) {
                            this.traceType = org.kevoree.modeling.api.KActionType.REMOVE;
                            this.srcKID = srcKID;
                            this.reference = reference;
                            this.objKID = objKID;
                        }
                        ModelRemoveTrace.prototype.getObjKID = function () {
                            return this.objKID;
                        };

                        ModelRemoveTrace.prototype.getMeta = function () {
                            return this.reference;
                        };

                        ModelRemoveTrace.prototype.getTraceType = function () {
                            return this.traceType;
                        };

                        ModelRemoveTrace.prototype.getSrcKID = function () {
                            return this.srcKID;
                        };

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
                            org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.srcKID + "");
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.meta);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(this.reference.metaName());
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.objpath);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.objKID + "");
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.closeJSON);
                            return buffer.toString();
                        };
                        return ModelRemoveTrace;
                    })();
                    _trace.ModelRemoveTrace = ModelRemoveTrace;
                })(api.trace || (api.trace = {}));
                var trace = api.trace;
                (function (_event) {
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

                        DefaultKEvent.fromJSON = function (payload) {
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
                                        } else {
                                            org.kevoree.modeling.api.event.DefaultKEvent.setEventAttribute(event, currentAttributeName, currentToken.value().toString());
                                            currentAttributeName = null;
                                        }
                                    }
                                    currentToken = lexer.nextToken();
                                }
                                return event;
                            }
                            return null;
                        };

                        DefaultKEvent.setEventAttribute = function (event, currentAttributeName, value) {
                            if (currentAttributeName.equals(DefaultKEvent.DIMENSION_KEY)) {
                                event._dimensionKey = java.lang.Long.parseLong(value);
                            } else {
                                if (currentAttributeName.equals(DefaultKEvent.TIME_KEY)) {
                                    event._time = java.lang.Long.parseLong(value);
                                } else {
                                    if (currentAttributeName.equals(DefaultKEvent.UUID_KEY)) {
                                        event._uuid = java.lang.Long.parseLong(value);
                                    } else {
                                        if (currentAttributeName.equals(DefaultKEvent.TYPE_KEY)) {
                                            event._actionType = org.kevoree.modeling.api.KActionType.valueOf(value);
                                        } else {
                                            if (currentAttributeName.equals(DefaultKEvent.CLASS_KEY)) {
                                            } else {
                                                if (currentAttributeName.equals(DefaultKEvent.ELEMENT_KEY)) {
                                                } else {
                                                    if (currentAttributeName.equals(DefaultKEvent.VALUE_KEY)) {
                                                        event._value = org.kevoree.modeling.api.json.JsonString.unescape(value);
                                                    } else {
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
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

                    var DefaultKBroker = (function () {
                        function DefaultKBroker(pcaches) {
                            this.universeListeners = new java.util.ArrayList();
                            this.caches = pcaches;
                        }
                        DefaultKBroker.prototype.registerListener = function (origin, listener) {
                            if (origin instanceof org.kevoree.modeling.api.abs.AbstractKObject) {
                                var dimensionCache = this.caches.get(origin.dimension().key());
                                var timeCache = dimensionCache.timesCaches.get(origin.now());
                                var obj_listeners = timeCache.obj_listeners.get(origin.uuid());
                                if (obj_listeners == null) {
                                    obj_listeners = new java.util.ArrayList();
                                    timeCache.obj_listeners.put(origin.uuid(), obj_listeners);
                                }
                                obj_listeners.add(listener);
                            } else {
                                if (origin instanceof org.kevoree.modeling.api.abs.AbstractKView) {
                                    var dimensionCache = this.caches.get(origin.key());
                                    var timeCache = dimensionCache.timesCaches.get(origin.now());
                                    timeCache.listeners.add(listener);
                                } else {
                                    if (origin instanceof org.kevoree.modeling.api.abs.AbstractKDimension) {
                                        var dimensionCache = this.caches.get(origin.key());
                                        dimensionCache.listeners.add(listener);
                                    } else {
                                        if (origin instanceof org.kevoree.modeling.api.abs.AbstractKUniverse) {
                                            this.universeListeners.add(listener);
                                        }
                                    }
                                }
                            }
                        };

                        DefaultKBroker.prototype.notify = function (event) {
                            var dimensionCache = this.caches.get(event.dimension());
                            if (dimensionCache != null) {
                                var timeCache = dimensionCache.timesCaches.get(event.time());
                                if (timeCache != null) {
                                    var obj_listeners = timeCache.obj_listeners.get(event.uuid());
                                    if (obj_listeners != null) {
                                        for (var i = 0; i < obj_listeners.size(); i++) {
                                            var listener = obj_listeners.get(i);
                                            listener(event);
                                        }
                                    }
                                    for (var i = 0; i < timeCache.listeners.size(); i++) {
                                        var listener = timeCache.listeners.get(i);
                                        listener(event);
                                    }
                                }
                                for (var i = 0; i < dimensionCache.listeners.size(); i++) {
                                    var listener = dimensionCache.listeners.get(i);
                                    listener(event);
                                }
                            }
                            for (var i = 0; i < this.universeListeners.size(); i++) {
                                var listener = this.universeListeners.get(i);
                                listener(event);
                            }
                        };

                        DefaultKBroker.prototype.flush = function (dimensionKey) {
                        };
                        return DefaultKBroker;
                    })();
                    _event.DefaultKBroker = DefaultKBroker;
                })(api.event || (api.event = {}));
                var event = api.event;
                (function (data) {
                    (function (cache) {
                        var DimensionCache = (function () {
                            function DimensionCache(dimension) {
                                this.timeTreeCache = new java.util.HashMap();
                                this.timesCaches = new java.util.HashMap();
                                this.rootTimeTree = new org.kevoree.modeling.api.time.DefaultTimeTree();
                                this.listeners = new java.util.ArrayList();
                                this.dimension = dimension;
                            }
                            return DimensionCache;
                        })();
                        cache.DimensionCache = DimensionCache;

                        var TimeCache = (function () {
                            function TimeCache() {
                                this.obj_cache = new java.util.HashMap();
                                this.payload_cache = new java.util.HashMap();
                                this.root = null;
                                this.rootDirty = false;
                                this.listeners = new java.util.ArrayList();
                                this.obj_listeners = new java.util.HashMap();
                            }
                            return TimeCache;
                        })();
                        cache.TimeCache = TimeCache;
                    })(data.cache || (data.cache = {}));
                    var cache = data.cache;

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
                            callback(null);
                        };

                        MemoryKDataBase.prototype.get = function (keys, callback) {
                            var values = new Array();
                            for (var i = 0; i < keys.length; i++) {
                                values[i] = this.backend.get(keys[i]);
                                if (MemoryKDataBase.DEBUG) {
                                    System.out.println("GET " + keys[i] + "->" + values[i]);
                                }
                            }
                            callback(values, null);
                        };

                        MemoryKDataBase.prototype.remove = function (keys, callback) {
                            for (var i = 0; i < keys.length; i++) {
                                this.backend.remove(keys[i]);
                            }
                            callback(null);
                        };

                        MemoryKDataBase.prototype.commit = function (callback) {
                            callback(null);
                        };

                        MemoryKDataBase.prototype.close = function (callback) {
                            this.backend.clear();
                        };
                        MemoryKDataBase.DEBUG = false;
                        return MemoryKDataBase;
                    })();
                    data.MemoryKDataBase = MemoryKDataBase;

                    var DefaultKStore = (function () {
                        function DefaultKStore() {
                            this.caches = new java.util.HashMap();
                            this._db = new org.kevoree.modeling.api.data.MemoryKDataBase();
                            this._eventBroker = new org.kevoree.modeling.api.event.DefaultKBroker(this.caches);
                            this.initRange(DefaultKStore.UUID_DB_KEY);
                            this.initRange(DefaultKStore.DIM_DB_KEY);
                        }
                        DefaultKStore.prototype.keyTree = function (dim, key) {
                            return "" + dim.key() + DefaultKStore.KEY_SEP + key;
                        };

                        DefaultKStore.prototype.keyRoot = function (dim, time) {
                            return "" + dim.key() + DefaultKStore.KEY_SEP + time + DefaultKStore.KEY_SEP + "root";
                        };

                        DefaultKStore.prototype.keyRootTree = function (dim) {
                            return "" + dim.key() + DefaultKStore.KEY_SEP + "root";
                        };

                        DefaultKStore.prototype.keyPayload = function (dim, time, key) {
                            return "" + dim.key() + DefaultKStore.KEY_SEP + time + DefaultKStore.KEY_SEP + key;
                        };

                        DefaultKStore.prototype.initRange = function (key) {
                            var _this = this;
                            this._db.get([key], function (results, throwable) {
                                if (throwable != null) {
                                    throwable.printStackTrace();
                                } else {
                                    var min = 1;
                                    if (results[0] != null) {
                                        min = java.lang.Long.parseLong(results[0]);
                                    }
                                    if (key.equals(DefaultKStore.UUID_DB_KEY)) {
                                        _this.nextUUIDRange = new org.kevoree.modeling.api.data.IDRange(min, min + DefaultKStore.RANGE_LENGTH, DefaultKStore.RANGE_THRESHOLD);
                                    } else {
                                        _this.nextDimensionRange = new org.kevoree.modeling.api.data.IDRange(min, min + DefaultKStore.RANGE_LENGTH, DefaultKStore.RANGE_THRESHOLD);
                                    }
                                    _this._db.put([[key, "" + (min + DefaultKStore.RANGE_LENGTH)]], function (throwable) {
                                        if (throwable != null) {
                                            throwable.printStackTrace();
                                        }
                                    });
                                }
                            });
                        };

                        DefaultKStore.prototype.initDimension = function (dimension, callback) {
                            var dimensionCache = new org.kevoree.modeling.api.data.cache.DimensionCache(dimension);
                            this.caches.put(dimension.key(), dimensionCache);
                            var rootTreeKeys = new Array();
                            rootTreeKeys[0] = this.keyRootTree(dimension);
                            this._db.get(rootTreeKeys, function (res, error) {
                                if (error != null) {
                                    callback(error);
                                } else {
                                    try  {
                                        dimensionCache.rootTimeTree.load(res[0]);
                                        callback(null);
                                    } catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e = $ex$;
                                            callback(e);
                                        }
                                    }
                                }
                            });
                        };

                        DefaultKStore.prototype.initKObject = function (obj, originView) {
                            var dimensionCache = this.caches.get(originView.dimension().key());
                            if (dimensionCache == null) {
                                try  {
                                    throw new java.lang.Exception("UnConsistancy error, are you using a reference to a closed object ?");
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e = $ex$;
                                        e.printStackTrace();
                                    }
                                }
                            }
                            if (!dimensionCache.timeTreeCache.containsKey(obj.uuid())) {
                                dimensionCache.timeTreeCache.put(obj.uuid(), obj.timeTree());
                            }
                            var timeCache = dimensionCache.timesCaches.get(originView.now());
                            if (timeCache == null) {
                                timeCache = new org.kevoree.modeling.api.data.cache.TimeCache();
                                dimensionCache.timesCaches.put(originView.now(), timeCache);
                            }
                            timeCache.obj_cache.put(obj.uuid(), obj);
                        };

                        DefaultKStore.prototype.nextDimensionKey = function () {
                            if (this.currentDimensionRange == null || this.currentDimensionRange.isEmpty()) {
                                this.currentDimensionRange = this.nextDimensionRange;
                            }
                            if (this.currentDimensionRange.isThresholdReached()) {
                                this.initRange(DefaultKStore.DIM_DB_KEY);
                            }
                            return this.currentDimensionRange.newUuid();
                        };

                        DefaultKStore.prototype.nextObjectKey = function () {
                            if (this.currentUUIDRange == null || this.currentUUIDRange.isEmpty()) {
                                this.currentUUIDRange = this.nextUUIDRange;
                            }
                            if (this.currentUUIDRange.isThresholdReached()) {
                                this.initRange(DefaultKStore.UUID_DB_KEY);
                            }
                            return this.currentUUIDRange.newUuid();
                        };

                        DefaultKStore.prototype.cacheLookup = function (dimension, time, key) {
                            var dimensionCache = this.caches.get(dimension.key());
                            var timeCache = dimensionCache.timesCaches.get(time);
                            if (timeCache == null) {
                                return null;
                            } else {
                                return timeCache.obj_cache.get(key);
                            }
                        };

                        DefaultKStore.prototype.raw = function (origin, accessMode) {
                            if (accessMode.equals(org.kevoree.modeling.api.data.AccessMode.WRITE)) {
                                origin.setDirty(true);
                            }
                            var dimensionCache = this.caches.get(origin.dimension().key());
                            var resolvedTime = origin.timeTree().resolve(origin.now());
                            var needCopy = accessMode.equals(org.kevoree.modeling.api.data.AccessMode.WRITE) && resolvedTime != origin.now();
                            var timeCache = dimensionCache.timesCaches.get(resolvedTime);
                            if (timeCache == null) {
                                timeCache = new org.kevoree.modeling.api.data.cache.TimeCache();
                                dimensionCache.timesCaches.put(resolvedTime, timeCache);
                            }
                            var payload = timeCache.payload_cache.get(origin.uuid());
                            if (payload == null) {
                                payload = new Array();
                                if (accessMode.equals(org.kevoree.modeling.api.data.AccessMode.WRITE) && !needCopy) {
                                    timeCache.payload_cache.put(origin.uuid(), payload);
                                }
                            }
                            if (!needCopy) {
                                return payload;
                            } else {
                                var cloned = new Array();
                                for (var i = 0; i < payload.length; i++) {
                                    var resolved = payload[i];
                                    if (resolved != null) {
                                        if (resolved instanceof java.util.Set) {
                                            var clonedSet = new java.util.HashSet();
                                            clonedSet.addAll(resolved);
                                            cloned[i] = clonedSet;
                                        } else {
                                            if (resolved instanceof java.util.List) {
                                                var clonedList = new java.util.ArrayList();
                                                clonedList.addAll(resolved);
                                                cloned[i] = clonedList;
                                            } else {
                                                cloned[i] = resolved;
                                            }
                                        }
                                    }
                                }
                                var timeCacheCurrent = dimensionCache.timesCaches.get(origin.now());
                                if (timeCacheCurrent == null) {
                                    timeCacheCurrent = new org.kevoree.modeling.api.data.cache.TimeCache();
                                    dimensionCache.timesCaches.put(origin.view().now(), timeCacheCurrent);
                                }
                                timeCacheCurrent.payload_cache.put(origin.uuid(), cloned);
                                origin.timeTree().insert(origin.view().now());
                                return cloned;
                            }
                        };

                        DefaultKStore.prototype.discard = function (dimension, callback) {
                            this.caches.remove(dimension.key());
                            callback(null);
                        };

                        DefaultKStore.prototype.delete = function (dimension, callback) {
                            new java.lang.Exception("Not implemented yet !");
                        };

                        DefaultKStore.prototype.getSizeOfDirties = function (dimensionCache, timeCaches) {
                            var sizeCache = 0;
                            for (var i = 0; i < timeCaches.length; i++) {
                                var timeCache = timeCaches[i];
                                var valuesArr = timeCache.obj_cache.values().toArray(new Array());
                                for (var j = 0; j < valuesArr.length; j++) {
                                    var cached = valuesArr[j];
                                    if (cached.isDirty()) {
                                        sizeCache++;
                                    }
                                }
                                if (timeCache.rootDirty) {
                                    sizeCache++;
                                }
                            }
                            var timeTrees = dimensionCache.timeTreeCache.values().toArray(new Array());
                            for (var k = 0; k < timeTrees.length; k++) {
                                var timeTree = timeTrees[k];
                                if (timeTree.isDirty()) {
                                    sizeCache++;
                                }
                            }
                            if (dimensionCache.rootTimeTree.isDirty()) {
                                sizeCache++;
                            }
                            return sizeCache;
                        };

                        DefaultKStore.prototype.save = function (dimension, callback) {
                            var dimensionCache = this.caches.get(dimension.key());
                            if (dimensionCache == null) {
                                callback(null);
                            } else {
                                var timeCaches = dimensionCache.timesCaches.values().toArray(new Array());
                                var sizeCache = this.getSizeOfDirties(dimensionCache, timeCaches);
                                var payloads = new Array(new Array());
                                var i = 0;
                                for (var j = 0; j < timeCaches.length; j++) {
                                    var timeCache = timeCaches[j];
                                    var valuesArr = timeCache.obj_cache.values().toArray(new Array());
                                    for (var k = 0; k < valuesArr.length; k++) {
                                        var cached = valuesArr[k];
                                        if (cached.isDirty()) {
                                            var payloadA = new Array();
                                            payloadA[0] = this.keyPayload(dimension, cached.now(), cached.uuid());
                                            payloadA[1] = cached.toRawJSON();
                                            payloads[i] = payloadA;
                                            cached.setDirty(false);
                                            i++;
                                        }
                                    }
                                    if (timeCache.rootDirty) {
                                        var payloadB = new Array();
                                        payloadB[0] = this.keyRoot(dimension, timeCache.root.now());
                                        payloadB[1] = timeCache.root.uuid() + "";
                                        payloads[i] = payloadB;
                                        timeCache.rootDirty = false;
                                        i++;
                                    }
                                }
                                var keyArr = dimensionCache.timeTreeCache.keySet().toArray(new Array());
                                for (var l = 0; l < keyArr.length; l++) {
                                    var timeTreeKey = keyArr[l];
                                    var timeTree = dimensionCache.timeTreeCache.get(timeTreeKey);
                                    if (timeTree.isDirty()) {
                                        var payloadC = new Array();
                                        payloadC[0] = this.keyTree(dimension, timeTreeKey);
                                        payloadC[1] = timeTree.toString();
                                        payloads[i] = payloadC;
                                        timeTree.setDirty(false);
                                        i++;
                                    }
                                }
                                if (dimensionCache.rootTimeTree.isDirty()) {
                                    var payloadD = new Array();
                                    payloadD[0] = this.keyRootTree(dimension);
                                    payloadD[1] = dimensionCache.rootTimeTree.toString();
                                    payloads[i] = payloadD;
                                    dimensionCache.rootTimeTree.setDirty(false);
                                    i++;
                                }
                                this._db.put(payloads, callback);
                                this._eventBroker.flush(dimension.key());
                            }
                        };

                        DefaultKStore.prototype.saveUnload = function (dimension, callback) {
                            var _this = this;
                            this.save(dimension, function (throwable) {
                                dimension.flushTimes();
                                if (throwable == null) {
                                    _this.discard(dimension, callback);
                                } else {
                                    callback(throwable);
                                }
                            });
                        };

                        DefaultKStore.prototype.timeTree = function (dimension, key, callback) {
                            var keys = new Array();
                            keys[0] = key;
                            this.timeTrees(dimension, keys, function (timeTrees) {
                                if (timeTrees.length == 1) {
                                    callback(timeTrees[0]);
                                } else {
                                    callback(null);
                                }
                            });
                        };

                        DefaultKStore.prototype.timeTrees = function (dimension, keys, callback) {
                            var toLoad = new java.util.ArrayList();
                            var dimensionCache = this.caches.get(dimension.key());
                            var result = new Array();
                            for (var i = 0; i < keys.length; i++) {
                                var cachedTree = dimensionCache.timeTreeCache.get(keys[i]);
                                if (cachedTree != null) {
                                    result[i] = cachedTree;
                                } else {
                                    toLoad.add(i);
                                }
                            }
                            if (toLoad.isEmpty()) {
                                callback(result);
                            } else {
                                var toLoadKeys = new Array();
                                for (var i = 0; i < toLoad.size(); i++) {
                                    toLoadKeys[i] = this.keyTree(dimension, keys[toLoad.get(i)]);
                                }
                                this._db.get(toLoadKeys, function (res, error) {
                                    if (error != null) {
                                        error.printStackTrace();
                                    }
                                    for (var i = 0; i < res.length; i++) {
                                        var newTree = new org.kevoree.modeling.api.time.DefaultTimeTree();
                                        try  {
                                            if (res[i] != null) {
                                                newTree.load(res[i]);
                                            } else {
                                                newTree.insert(dimension.key());
                                            }
                                            dimensionCache.timeTreeCache.put(keys[toLoad.get(i)], newTree);
                                            result[toLoad.get(i)] = newTree;
                                        } catch ($ex$) {
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

                        DefaultKStore.prototype.lookup = function (originView, key, callback) {
                            var _this = this;
                            if (callback == null) {
                                return;
                            }
                            this.timeTree(originView.dimension(), key, function (timeTree) {
                                var resolvedTime = timeTree.resolve(originView.now());
                                if (resolvedTime == null) {
                                    callback(null);
                                } else {
                                    var resolved = _this.cacheLookup(originView.dimension(), resolvedTime, key);
                                    if (resolved != null) {
                                        if (originView.now() == resolvedTime) {
                                            callback(resolved);
                                        } else {
                                            var proxy = originView.createProxy(resolved.metaClass(), resolved.timeTree(), key);
                                            callback(proxy);
                                        }
                                    } else {
                                        var keys = new Array();
                                        keys[0] = key;
                                        _this.loadObjectInCache(originView, keys, function (dbResolved) {
                                            if (dbResolved.size() == 0) {
                                                callback(null);
                                            } else {
                                                var dbResolvedZero = dbResolved.get(0);
                                                if (resolvedTime != originView.now()) {
                                                    var proxy = originView.createProxy(dbResolvedZero.metaClass(), dbResolvedZero.timeTree(), key);
                                                    callback(proxy);
                                                } else {
                                                    callback(dbResolvedZero);
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        };

                        DefaultKStore.prototype.loadObjectInCache = function (originView, keys, callback) {
                            var _this = this;
                            this.timeTrees(originView.dimension(), keys, function (timeTrees) {
                                var objStringKeys = new Array();
                                var resolved = new Array();
                                for (var i = 0; i < keys.length; i++) {
                                    var resolvedTime = timeTrees[i].resolve(originView.now());
                                    resolved[i] = resolvedTime;
                                    objStringKeys[i] = _this.keyPayload(originView.dimension(), resolvedTime, keys[i]);
                                }
                                _this._db.get(objStringKeys, function (objectPayloads, error) {
                                    if (error != null) {
                                        callback(null);
                                    } else {
                                        var additionalLoad = new java.util.ArrayList();
                                        var objs = new java.util.ArrayList();
                                        for (var i = 0; i < objectPayloads.length; i++) {
                                            var obj = org.kevoree.modeling.api.json.JsonModelLoader.loadDirect(objectPayloads[i], originView.dimension().time(resolved[i]), null);
                                            if (obj != null) {
                                                objs.add(obj);
                                                var strategies = new java.util.HashSet();
                                                for (var h = 0; h < obj.metaAttributes().length; h++) {
                                                    var metaAttribute = obj.metaAttributes()[h];
                                                    strategies.add(metaAttribute.strategy());
                                                }
                                                var strategiesArr = strategies.toArray(new Array());
                                                for (var k = 0; k < strategiesArr.length; k++) {
                                                    var strategy = strategiesArr[k];
                                                    var additionalTimes = strategy.timedDependencies(obj);
                                                    for (var j = 0; j < additionalTimes.length; j++) {
                                                        if (additionalTimes[j] != obj.now()) {
                                                            if (_this.cacheLookup(originView.dimension(), additionalTimes[j], obj.uuid()) == null) {
                                                                var payload = [_this.keyPayload(originView.dimension(), additionalTimes[j], obj.uuid()), additionalTimes[j]];
                                                                additionalLoad.add(payload);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (additionalLoad.isEmpty()) {
                                            callback(objs);
                                        } else {
                                            var addtionalDBKeys = new Array();
                                            for (var i = 0; i < additionalLoad.size(); i++) {
                                                addtionalDBKeys[i] = additionalLoad.get(i)[0].toString();
                                            }
                                            _this._db.get(addtionalDBKeys, function (additionalPayloads, error) {
                                                for (var i = 0; i < objectPayloads.length; i++) {
                                                    org.kevoree.modeling.api.json.JsonModelLoader.loadDirect(additionalPayloads[i], originView.dimension().time(additionalLoad.get(i)[1]), null);
                                                }
                                                callback(objs);
                                            });
                                        }
                                    }
                                });
                            });
                        };

                        DefaultKStore.prototype.lookupAll = function (originView, keys, callback) {
                            var toLoad = new java.util.ArrayList();
                            for (var i = 0; i < keys.length; i++) {
                                toLoad.add(keys[i]);
                            }
                            var resolveds = new java.util.ArrayList();
                            for (var i = 0; i < keys.length; i++) {
                                var kid = keys[i];
                                var resolved = this.cacheLookup(originView.dimension(), originView.now(), kid);
                                if (resolved != null) {
                                    resolveds.add(resolved);
                                    toLoad.remove(kid);
                                }
                            }
                            if (toLoad.size() == 0) {
                                var proxies = new java.util.ArrayList();
                                var resolvedsArr = resolveds.toArray(new Array());
                                for (var i = 0; i < resolvedsArr.length; i++) {
                                    var res = resolvedsArr[i];
                                    if (res.now() != originView.now()) {
                                        var proxy = originView.createProxy(res.metaClass(), res.timeTree(), res.uuid());
                                        proxies.add(proxy);
                                    } else {
                                        proxies.add(res);
                                    }
                                }
                                callback(proxies.toArray(new Array()));
                            } else {
                                var toLoadKeys = new Array();
                                for (var i = 0; i < toLoad.size(); i++) {
                                    toLoadKeys[i] = toLoad.get(i);
                                }
                                this.loadObjectInCache(originView, toLoadKeys, function (additional) {
                                    resolveds.addAll(additional);
                                    var proxies = new java.util.ArrayList();
                                    var resolvedsArr = resolveds.toArray(new Array());
                                    for (var i = 0; i < resolvedsArr.length; i++) {
                                        var res = resolvedsArr[i];
                                        if (res.now() != originView.now()) {
                                            var proxy = originView.createProxy(res.metaClass(), res.timeTree(), res.uuid());
                                            proxies.add(proxy);
                                        } else {
                                            proxies.add(res);
                                        }
                                    }
                                    callback(proxies.toArray(new Array()));
                                });
                            }
                        };

                        DefaultKStore.prototype.getDimension = function (key) {
                            var dimensionCache = this.caches.get(key);
                            if (dimensionCache != null) {
                                return dimensionCache.dimension;
                            } else {
                                return null;
                            }
                        };

                        DefaultKStore.prototype.getRoot = function (originView, callback) {
                            var _this = this;
                            var dimensionCache = this.caches.get(originView.dimension().key());
                            var resolvedRoot = dimensionCache.rootTimeTree.resolve(originView.now());
                            if (resolvedRoot == null) {
                                callback(null);
                            } else {
                                var timeCache = dimensionCache.timesCaches.get(resolvedRoot);
                                if (timeCache == null) {
                                    timeCache = new org.kevoree.modeling.api.data.cache.TimeCache();
                                }
                                if (timeCache.root != null) {
                                    callback(timeCache.root);
                                } else {
                                    var timeCacheFinal = timeCache;
                                    var rootKeys = new Array();
                                    rootKeys[0] = this.keyRoot(dimensionCache.dimension, resolvedRoot);
                                    this._db.get(rootKeys, function (res, error) {
                                        if (error != null) {
                                            callback(null);
                                        } else {
                                            try  {
                                                var idRoot = java.lang.Long.parseLong(res[0]);
                                                _this.lookup(originView, idRoot, function (resolved) {
                                                    timeCacheFinal.root = resolved;
                                                    timeCacheFinal.rootDirty = false;
                                                    callback(resolved);
                                                });
                                            } catch ($ex$) {
                                                if ($ex$ instanceof java.lang.Exception) {
                                                    var e = $ex$;
                                                    e.printStackTrace();
                                                    callback(null);
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        };

                        DefaultKStore.prototype.setRoot = function (newRoot) {
                            var dimensionCache = this.caches.get(newRoot.dimension().key());
                            var timeCache = dimensionCache.timesCaches.get(newRoot.now());
                            timeCache.root = newRoot;
                            timeCache.rootDirty = true;
                            dimensionCache.rootTimeTree.insert(newRoot.now());
                        };

                        DefaultKStore.prototype.registerListener = function (origin, listener) {
                            this._eventBroker.registerListener(origin, listener);
                        };

                        DefaultKStore.prototype.notify = function (event) {
                            this._eventBroker.notify(event);
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
                            this.initRange(DefaultKStore.UUID_DB_KEY);
                            this.initRange(DefaultKStore.DIM_DB_KEY);
                        };
                        DefaultKStore.KEY_SEP = ',';
                        DefaultKStore.UUID_DB_KEY = "#UUID";
                        DefaultKStore.DIM_DB_KEY = "#DIMKEY";
                        DefaultKStore.RANGE_LENGTH = 500;
                        DefaultKStore.RANGE_THRESHOLD = 100;
                        return DefaultKStore;
                    })();
                    data.DefaultKStore = DefaultKStore;

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

                        AccessMode._AccessModeVALUES = [
                            AccessMode.READ,
                            AccessMode.WRITE
                        ];
                        return AccessMode;
                    })();
                    data.AccessMode = AccessMode;

                    var IDRange = (function () {
                        function IDRange(min, max, threshold) {
                            this.min = 0;
                            this.current = 0;
                            this.max = 0;
                            this.min = min;
                            this.current = min;
                            this.max = max;
                            this.threshold = threshold;
                        }
                        IDRange.prototype.newUuid = function () {
                            var res = this.current;
                            this.current++;
                            return res;
                        };

                        IDRange.prototype.isThresholdReached = function () {
                            return (this.max - this.min) <= this.threshold;
                        };

                        IDRange.prototype.isEmpty = function () {
                            return this.current > this.max;
                        };
                        return IDRange;
                    })();
                    data.IDRange = IDRange;
                })(api.data || (api.data = {}));
                var data = api.data;
                (function (select) {
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
                        KSelector.select = function (root, query, callback) {
                            var extractedQuery = org.kevoree.modeling.api.select.KQuery.extractFirstQuery(query);
                            if (extractedQuery == null) {
                                callback(new Array());
                            } else {
                                var relationNameRegex = extractedQuery.relationName.replace("*", ".*");
                                var collected = new java.util.HashSet();
                                var raw = root.dimension().universe().storage().raw(root, org.kevoree.modeling.api.data.AccessMode.READ);
                                for (var i = 0; i < root.metaReferences().length; i++) {
                                    var reference = root.metaReferences()[i];
                                    if (reference.metaName().matches(relationNameRegex)) {
                                        var refPayLoad = raw[reference.index()];
                                        if (refPayLoad != null) {
                                            if (refPayLoad instanceof java.util.Set) {
                                                var castedSet = refPayLoad;
                                                collected.addAll(castedSet);
                                            } else {
                                                var castedLong = refPayLoad;
                                                collected.add(castedLong);
                                            }
                                        }
                                    }
                                }
                                root.view().lookupAll(collected.toArray(new Array()), function (resolveds) {
                                    var nextGeneration = new java.util.ArrayList();
                                    if (extractedQuery.params.isEmpty()) {
                                        for (var i = 0; i < resolveds.length; i++) {
                                            nextGeneration.add(resolveds[i]);
                                        }
                                    } else {
                                        for (var i = 0; i < resolveds.length; i++) {
                                            var resolved = resolveds[i];
                                            var selectedForNext = true;

                                            //TODO resolve for-each cycle
                                            var paramKey;
                                            for (paramKey in extractedQuery.params.keySet()) {
                                                var param = extractedQuery.params.get(paramKey);
                                                for (var j = 0; j < resolved.metaAttributes().length; j++) {
                                                    var metaAttribute = resolved.metaAttributes()[i];
                                                    if (metaAttribute.metaName().matches(param.name().replace("*", ".*"))) {
                                                        var o_raw = resolved.get(metaAttribute);
                                                        if (o_raw != null) {
                                                            if (o_raw.toString().matches(param.value().replace("*", ".*"))) {
                                                                if (param.isNegative()) {
                                                                    selectedForNext = false;
                                                                }
                                                            } else {
                                                                if (!param.isNegative()) {
                                                                    selectedForNext = false;
                                                                }
                                                            }
                                                        } else {
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
                                    var childSelected = new java.util.ArrayList();
                                    if (extractedQuery.subQuery == null || extractedQuery.subQuery.isEmpty()) {
                                        childSelected.add(root);
                                        callback(nextGeneration.toArray(new Array()));
                                    } else {
                                        org.kevoree.modeling.api.util.Helper.forall(nextGeneration.toArray(new Array()), function (kObject, next) {
                                            org.kevoree.modeling.api.select.KSelector.select(kObject, extractedQuery.subQuery, function (kObjects) {
                                                childSelected.addAll(childSelected);
                                            });
                                        }, function (throwable) {
                                            callback(childSelected.toArray(new Array()));
                                        });
                                    }
                                });
                            }
                        };
                        return KSelector;
                    })();
                    select.KSelector = KSelector;

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
                                } else {
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
                                } else {
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
                                } else {
                                    if (query.charAt(i) == KQuery.CLOSE_BRACKET) {
                                        attsEnd = i;
                                    } else {
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
                                                } else {
                                                    pObject = new org.kevoree.modeling.api.select.KQueryParam(null, p, false);
                                                    params.put("@id", pObject);
                                                }
                                            }
                                            lastStart = iParam + 1;
                                        } else {
                                            if (paramString.charAt(iParam) == '\\') {
                                                escaped = true;
                                            } else {
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
                                        } else {
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
                })(api.select || (api.select = {}));
                var select = api.select;

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

                (function (meta) {
                    var MetaType = (function () {
                        function MetaType() {
                        }
                        MetaType.prototype.equals = function (other) {
                            return this == other;
                        };

                        MetaType.values = function () {
                            return MetaType._MetaTypeVALUES;
                        };
                        MetaType.STRING = new MetaType();
                        MetaType.LONG = new MetaType();
                        MetaType.INT = new MetaType();
                        MetaType.BOOL = new MetaType();
                        MetaType.SHORT = new MetaType();
                        MetaType.DOUBLE = new MetaType();
                        MetaType.FLOAT = new MetaType();

                        MetaType._MetaTypeVALUES = [
                            MetaType.STRING,
                            MetaType.LONG,
                            MetaType.INT,
                            MetaType.BOOL,
                            MetaType.SHORT,
                            MetaType.DOUBLE,
                            MetaType.FLOAT
                        ];
                        return MetaType;
                    })();
                    meta.MetaType = MetaType;
                })(api.meta || (api.meta = {}));
                var meta = api.meta;
                (function (xmi) {
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
                            } else {
                                if (this.currentChar == '!') {
                                    do {
                                        this.currentChar = this.readChar();
                                    } while(this.currentChar != '>');
                                    return org.kevoree.modeling.api.xmi.XmlToken.COMMENT;
                                } else {
                                    if (this.currentChar == '/') {
                                        this.currentChar = this.readChar();
                                        this.read_closingTag();
                                        return org.kevoree.modeling.api.xmi.XmlToken.END_TAG;
                                    } else {
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
                                } else {
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
                                    } else {
                                        this.attributeName.append(this.currentChar);
                                    }
                                    this.currentChar = this.readChar();
                                }
                                do {
                                    this.currentChar = this.readChar();
                                } while(this.currentChar != '"');
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
                                } while(!end_of_tag && this.currentChar == ' ');
                            }
                        };
                        return XmlParser;
                    })();
                    xmi.XmlParser = XmlParser;

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
                                this.target.mutate(this.mutatorType, this.target.metaReference(this.refName), referencedElement, true);
                                return;
                            }
                            referencedElement = this.context.map.get("/");
                            if (referencedElement != null) {
                                this.target.mutate(this.mutatorType, this.target.metaReference(this.refName), referencedElement, true);
                                return;
                            }
                            throw new java.lang.Exception("KMF Load error : reference " + this.ref + " not found in map when trying to  " + this.mutatorType + " " + this.refName + "  on " + this.target.metaClass().metaName() + "(uuid:" + this.target.uuid() + ")");
                        };
                        return XMIResolveCommand;
                    })();
                    xmi.XMIResolveCommand = XMIResolveCommand;

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
                                } else {
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
                                    org.kevoree.modeling.api.util.Helper.forall(context.model.metaReferences(), function (metaReference, next) {
                                        org.kevoree.modeling.api.xmi.XMIModelSerializer.nonContainedReferencesCallbackChain(metaReference, next, context, context.model);
                                    }, function (err) {
                                        if (err == null) {
                                            context.printer.append(">\n");
                                            org.kevoree.modeling.api.util.Helper.forall(context.model.metaReferences(), function (metaReference, next) {
                                                org.kevoree.modeling.api.xmi.XMIModelSerializer.containedReferencesCallbackChain(metaReference, next, context, context.model);
                                            }, function (containedRefsEnd) {
                                                if (containedRefsEnd == null) {
                                                    context.printer.append("</" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_") + ">\n");
                                                    context.finishCallback(context.printer.toString(), null);
                                                } else {
                                                    context.finishCallback(null, containedRefsEnd);
                                                }
                                            });
                                        } else {
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
                                } else {
                                    if (c == '&') {
                                        ostream.append("&amp;");
                                    } else {
                                        if (c == '\'') {
                                            ostream.append("&apos;");
                                        } else {
                                            if (c == '<') {
                                                ostream.append("&lt;");
                                            } else {
                                                if (c == '>') {
                                                    ostream.append("&gt;");
                                                } else {
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
                                value[0] = "";
                                p_currentElement.each(ref, function (o) {
                                    var adjustedAddress = p_context.addressTable.get(o.uuid());
                                    value[0] = (value[0].equals("") ? adjustedAddress : value[0] + " " + adjustedAddress);
                                }, function (end) {
                                    if (end == null) {
                                        if (value[0] != null) {
                                            p_context.printer.append(" " + ref.metaName() + "=\"" + value[0] + "\"");
                                        }
                                    }
                                    next(end);
                                });
                            } else {
                                next(null);
                            }
                        };

                        XMIModelSerializer.containedReferencesCallbackChain = function (ref, nextReference, context, currentElement) {
                            if (ref.contained()) {
                                currentElement.each(ref, function (o) {
                                    var elem = o;
                                    context.printer.append("<");
                                    context.printer.append(ref.metaName());
                                    context.printer.append(" xsi:type=\"" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(elem.metaClass().metaName()) + "\"");
                                    elem.visitAttributes(context.attributesVisitor);
                                    org.kevoree.modeling.api.util.Helper.forall(elem.metaReferences(), function (metaReference, next) {
                                        org.kevoree.modeling.api.xmi.XMIModelSerializer.nonContainedReferencesCallbackChain(metaReference, next, context, elem);
                                    }, function (err) {
                                        if (err == null) {
                                            context.printer.append(">\n");
                                            org.kevoree.modeling.api.util.Helper.forall(elem.metaReferences(), function (metaReference, next) {
                                                org.kevoree.modeling.api.xmi.XMIModelSerializer.containedReferencesCallbackChain(metaReference, next, context, elem);
                                            }, function (containedRefsEnd) {
                                                if (containedRefsEnd == null) {
                                                    context.printer.append("</");
                                                    context.printer.append(ref.metaName());
                                                    context.printer.append('>');
                                                    context.printer.append("\n");
                                                }
                                            });
                                        } else {
                                            context.finishCallback(null, err);
                                        }
                                    });
                                }, function (throwable) {
                                    nextReference(null);
                                });
                            } else {
                                nextReference(null);
                            }
                        };
                        return XMIModelSerializer;
                    })();
                    xmi.XMIModelSerializer = XMIModelSerializer;

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
                                        } else {
                                            if (src.charAt(i + 2) == 'p') {
                                                builder.append("'");
                                                i = i + 6;
                                            }
                                        }
                                    } else {
                                        if (src.charAt(i + 1) == 'q') {
                                            builder.append("\"");
                                            i = i + 6;
                                        } else {
                                            if (src.charAt(i + 1) == 'l') {
                                                builder.append("<");
                                                i = i + 4;
                                            } else {
                                                if (src.charAt(i + 1) == 'g') {
                                                    builder.append(">");
                                                    i = i + 4;
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (builder != null) {
                                        builder.append(c);
                                    }
                                    i++;
                                }
                            }
                            if (builder != null) {
                                return builder.toString();
                            } else {
                                return src;
                            }
                        };

                        XMIModelLoader.load = function (p_view, str, callback) {
                            var parser = new org.kevoree.modeling.api.xmi.XmlParser(str);
                            if (!parser.hasNext()) {
                                callback(null);
                            } else {
                                var context = new org.kevoree.modeling.api.xmi.XMILoadingContext();
                                context.successCallback = callback;
                                context.xmiReader = parser;
                                org.kevoree.modeling.api.xmi.XMIModelLoader.deserialize(p_view, context);
                            }
                        };

                        XMIModelLoader.deserialize = function (p_view, context) {
                            try  {
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
                                p_view.setRoot(context.loadedRoots);
                                context.successCallback(null);
                            } catch ($ex$) {
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
                            } else {
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
                                        var kAttribute = modelElem.metaAttribute(attrName);
                                        if (kAttribute != null) {
                                            modelElem.set(kAttribute, org.kevoree.modeling.api.xmi.XMIModelLoader.unescapeXml(valueAtt));
                                        } else {
                                            var kreference = modelElem.metaReference(attrName);
                                            if (kreference != null) {
                                                var referenceArray = valueAtt.split(" ");
                                                for (var j = 0; j < referenceArray.length; j++) {
                                                    var xmiRef = referenceArray[j];
                                                    var adjustedRef = (xmiRef.startsWith("#") ? xmiRef.substring(1) : xmiRef);
                                                    adjustedRef = adjustedRef.replace(".0", "");
                                                    var ref = ctx.map.get(adjustedRef);
                                                    if (ref != null) {
                                                        modelElem.mutate(org.kevoree.modeling.api.KActionType.ADD, kreference, ref, true);
                                                    } else {
                                                        ctx.resolvers.add(new org.kevoree.modeling.api.xmi.XMIResolveCommand(ctx, modelElem, org.kevoree.modeling.api.KActionType.ADD, attrName, adjustedRef));
                                                    }
                                                }
                                            } else {
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
                                        modelElem.mutate(org.kevoree.modeling.api.KActionType.ADD, modelElem.metaReference(subElemName), containedElement, true);
                                        ctx.elementsCount.put(xmiAddress + "/@" + subElemName, i + 1);
                                    } else {
                                        if (tok.equals(org.kevoree.modeling.api.xmi.XmlToken.END_TAG)) {
                                            if (ctx.xmiReader.getLocalName().equals(elementTagName)) {
                                                done = true;
                                            }
                                        }
                                    }
                                } else {
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
                })(api.xmi || (api.xmi = {}));
                var xmi = api.xmi;
                (function (json) {
                    var JsonFormat = (function () {
                        function JsonFormat(p_view) {
                            this._view = p_view;
                        }
                        JsonFormat.prototype.save = function (model, callback) {
                            org.kevoree.modeling.api.json.JsonModelSerializer.serialize(model, callback);
                        };

                        JsonFormat.prototype.load = function (payload, callback) {
                            org.kevoree.modeling.api.json.JsonModelLoader.load(this._view, payload, callback);
                        };
                        return JsonFormat;
                    })();
                    json.JsonFormat = JsonFormat;

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
                            } else {
                                if ('{' == c) {
                                    tokenType = org.kevoree.modeling.api.json.Type.LEFT_BRACE;
                                } else {
                                    if ('}' == c) {
                                        tokenType = org.kevoree.modeling.api.json.Type.RIGHT_BRACE;
                                    } else {
                                        if ('[' == c) {
                                            tokenType = org.kevoree.modeling.api.json.Type.LEFT_BRACKET;
                                        } else {
                                            if (']' == c) {
                                                tokenType = org.kevoree.modeling.api.json.Type.RIGHT_BRACKET;
                                            } else {
                                                if (':' == c) {
                                                    tokenType = org.kevoree.modeling.api.json.Type.COLON;
                                                } else {
                                                    if (',' == c) {
                                                        tokenType = org.kevoree.modeling.api.json.Type.COMMA;
                                                    } else {
                                                        if (!this.isDone()) {
                                                            while (this.isValueLetter(c)) {
                                                                currentValue.append(c);
                                                                if (!this.isValueLetter(this.peekChar())) {
                                                                    break;
                                                                } else {
                                                                    c = this.nextChar();
                                                                }
                                                            }
                                                            var v = currentValue.toString();
                                                            if ("true".equals(v.toLowerCase())) {
                                                                jsonValue = true;
                                                            } else {
                                                                if ("false".equals(v.toLowerCase())) {
                                                                    jsonValue = false;
                                                                } else {
                                                                    jsonValue = v.toLowerCase();
                                                                }
                                                            }
                                                            tokenType = org.kevoree.modeling.api.json.Type.VALUE;
                                                        } else {
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

                    var JsonToken = (function () {
                        function JsonToken(p_tokenType, p_value) {
                            this._tokenType = p_tokenType;
                            this._value = p_value;
                        }
                        JsonToken.prototype.toString = function () {
                            var v;
                            if (this._value != null) {
                                v = " (" + this._value + ")";
                            } else {
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

                    var JsonModelSerializer = (function () {
                        function JsonModelSerializer() {
                        }
                        JsonModelSerializer.serialize = function (model, callback) {
                            var builder = new java.lang.StringBuilder();
                            builder.append("[\n");
                            org.kevoree.modeling.api.json.JsonModelSerializer.printJSON(model, builder);
                            model.graphVisit(function (elem) {
                                builder.append(",");
                                org.kevoree.modeling.api.json.JsonModelSerializer.printJSON(elem, builder);
                                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            }, function (throwable) {
                                builder.append("]\n");
                                callback(builder.toString(), throwable);
                            });
                        };

                        JsonModelSerializer.printJSON = function (elem, builder) {
                            builder.append("{\n");
                            builder.append("\t\"" + JsonModelSerializer.KEY_META + "\" : \"");
                            builder.append(elem.metaClass().metaName());
                            builder.append("\",\n");
                            builder.append("\t\"" + JsonModelSerializer.KEY_UUID + "\" : \"");
                            builder.append(elem.uuid() + "");
                            if (elem.isRoot()) {
                                builder.append("\",\n");
                                builder.append("\t\"" + JsonModelSerializer.KEY_ROOT + "\" : \"");
                                builder.append("true");
                            }
                            builder.append("\",\n");
                            for (var i = 0; i < elem.metaAttributes().length; i++) {
                                var payload = elem.get(elem.metaAttributes()[i]);
                                if (payload != null) {
                                    builder.append("\t");
                                    builder.append("\"");
                                    builder.append(elem.metaAttributes()[i].metaName());
                                    builder.append("\" : \"");
                                    builder.append(payload.toString());
                                    builder.append("\",\n");
                                }
                            }
                            for (var i = 0; i < elem.metaReferences().length; i++) {
                                var raw = elem.view().dimension().universe().storage().raw(elem, org.kevoree.modeling.api.data.AccessMode.READ);
                                var payload = null;
                                if (raw != null) {
                                    payload = raw[elem.metaReferences()[i].index()];
                                }
                                if (payload != null) {
                                    builder.append("\t");
                                    builder.append("\"");
                                    builder.append(elem.metaReferences()[i].metaName());
                                    builder.append("\" :");
                                    if (elem.metaReferences()[i].single()) {
                                        builder.append("\"");
                                        builder.append(payload.toString());
                                        builder.append("\"");
                                    } else {
                                        var elems = payload;
                                        var elemsArr = elems.toArray(new Array());
                                        var isFirst = true;
                                        builder.append(" [");
                                        for (var j = 0; j < elemsArr.length; j++) {
                                            if (!isFirst) {
                                                builder.append(",");
                                            }
                                            builder.append("\"");
                                            builder.append(elemsArr[j] + "");
                                            builder.append("\"");
                                            isFirst = false;
                                        }
                                        builder.append("]");
                                    }
                                    builder.append(",\n");
                                }
                            }
                            builder.append("}\n");
                        };
                        JsonModelSerializer.KEY_META = "@meta";
                        JsonModelSerializer.KEY_UUID = "@uuid";
                        JsonModelSerializer.KEY_ROOT = "@root";
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
                                } else {
                                    if (ch == JsonString.ESCAPE_CHAR) {
                                        buffer.append(JsonString.ESCAPE_CHAR);
                                        buffer.append(JsonString.ESCAPE_CHAR);
                                    } else {
                                        if (ch == '\n') {
                                            buffer.append(JsonString.ESCAPE_CHAR);
                                            buffer.append('n');
                                        } else {
                                            if (ch == '\r') {
                                                buffer.append(JsonString.ESCAPE_CHAR);
                                                buffer.append('r');
                                            } else {
                                                if (ch == '\t') {
                                                    buffer.append(JsonString.ESCAPE_CHAR);
                                                    buffer.append('t');
                                                } else {
                                                    if (ch == '\u2028') {
                                                        buffer.append(JsonString.ESCAPE_CHAR);
                                                        buffer.append('u');
                                                        buffer.append('2');
                                                        buffer.append('0');
                                                        buffer.append('2');
                                                        buffer.append('8');
                                                    } else {
                                                        if (ch == '\u2029') {
                                                            buffer.append(JsonString.ESCAPE_CHAR);
                                                            buffer.append('u');
                                                            buffer.append('2');
                                                            buffer.append('0');
                                                            buffer.append('2');
                                                            buffer.append('9');
                                                        } else {
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
                                } else {
                                    if (builder != null) {
                                        builder = builder.append(current);
                                    }
                                }
                                i++;
                            }
                            if (builder != null) {
                                return builder.toString();
                            } else {
                                return src;
                            }
                        };
                        JsonString.ESCAPE_CHAR = '\\';
                        return JsonString;
                    })();
                    json.JsonString = JsonString;

                    var JsonModelLoader = (function () {
                        function JsonModelLoader() {
                        }
                        JsonModelLoader.loadDirect = function (payload, factory, callback) {
                            if (payload == null) {
                                return null;
                            } else {
                                var lexer = new org.kevoree.modeling.api.json.Lexer(payload);
                                var loaded = new Array();
                                org.kevoree.modeling.api.json.JsonModelLoader.loadObjects(lexer, factory, function (objs) {
                                    loaded[0] = objs.get(0);
                                });
                                return loaded[0];
                            }
                        };

                        JsonModelLoader.loadObjects = function (lexer, factory, callback) {
                            var loaded = new java.util.ArrayList();
                            var alls = new java.util.ArrayList();
                            var content = new java.util.HashMap();
                            var currentAttributeName = null;
                            var arrayPayload = null;
                            var currentToken = lexer.nextToken();
                            while (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.EOF) {
                                if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.LEFT_BRACKET)) {
                                    arrayPayload = new java.util.HashSet();
                                } else {
                                    if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.RIGHT_BRACKET)) {
                                        content.put(currentAttributeName, arrayPayload);
                                        arrayPayload = null;
                                        currentAttributeName = null;
                                    } else {
                                        if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.LEFT_BRACE)) {
                                            content = new java.util.HashMap();
                                        } else {
                                            if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.RIGHT_BRACE)) {
                                                alls.add(content);
                                                content = new java.util.HashMap();
                                            } else {
                                                if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.VALUE)) {
                                                    if (currentAttributeName == null) {
                                                        currentAttributeName = currentToken.value().toString();
                                                    } else {
                                                        if (arrayPayload == null) {
                                                            content.put(currentAttributeName, currentToken.value().toString());
                                                            currentAttributeName = null;
                                                        } else {
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
                            var keys = new Array();
                            for (var i = 0; i < alls.size(); i++) {
                                var kid = java.lang.Long.parseLong(alls.get(i).get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID).toString());
                                keys[i] = kid;
                            }
                            factory.dimension().timeTrees(keys, function (timeTrees) {
                                for (var i = 0; i < alls.size(); i++) {
                                    var elem = alls.get(i);
                                    var meta = elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META).toString();
                                    var kid = java.lang.Long.parseLong(elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID).toString());
                                    var isRoot = false;
                                    var root = elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_ROOT);
                                    if (root != null) {
                                        isRoot = root.toString().equals("true");
                                    }
                                    var timeTree = timeTrees[i];
                                    timeTree.insert(factory.now());
                                    var current = factory.createProxy(factory.metaClass(meta), timeTree, kid);
                                    if (isRoot) {
                                        current.setRoot(true);
                                    }
                                    loaded.add(current);
                                    var payloadObj = factory.dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                    var elemKeys = elem.keySet().toArray(new Array());
                                    for (var j = 0; j < elemKeys.length; j++) {
                                        var k = elemKeys[j];
                                        var att = current.metaAttribute(k);
                                        if (att != null) {
                                            payloadObj[att.index()] = org.kevoree.modeling.api.json.JsonModelLoader.convertRaw(att, elem.get(k));
                                        } else {
                                            var ref = current.metaReference(k);
                                            if (ref != null) {
                                                if (ref.single()) {
                                                    var refPayloadSingle;
                                                    try  {
                                                        refPayloadSingle = java.lang.Long.parseLong(elem.get(k).toString());
                                                        payloadObj[ref.index()] = refPayloadSingle;
                                                    } catch ($ex$) {
                                                        if ($ex$ instanceof java.lang.Exception) {
                                                            var e = $ex$;
                                                            e.printStackTrace();
                                                        }
                                                    }
                                                } else {
                                                    try  {
                                                        var convertedRaw = new java.util.HashSet();
                                                        var plainRawSet = elem.get(k);
                                                        var plainRawList = plainRawSet.toArray(new Array());
                                                        for (var l = 0; l < plainRawList.length; l++) {
                                                            var plainRaw = plainRawList[l];
                                                            try  {
                                                                var converted = java.lang.Long.parseLong(plainRaw);
                                                                convertedRaw.add(converted);
                                                            } catch ($ex$) {
                                                                if ($ex$ instanceof java.lang.Exception) {
                                                                    var e = $ex$;
                                                                    e.printStackTrace();
                                                                }
                                                            }
                                                        }
                                                        payloadObj[ref.index()] = convertedRaw;
                                                    } catch ($ex$) {
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
                                if (callback != null) {
                                    callback(loaded);
                                }
                            });
                        };

                        JsonModelLoader.load = function (_factory, payload, callback) {
                            if (payload == null) {
                                callback(null);
                            } else {
                                var lexer = new org.kevoree.modeling.api.json.Lexer(payload);
                                var currentToken = lexer.nextToken();
                                if (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.LEFT_BRACKET) {
                                    callback(null);
                                } else {
                                    org.kevoree.modeling.api.json.JsonModelLoader.loadObjects(lexer, _factory, function (kObjects) {
                                        callback(null);
                                    });
                                }
                            }
                        };

                        JsonModelLoader.convertRaw = function (attribute, raw) {
                            try  {
                                if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.STRING)) {
                                    return raw.toString();
                                } else {
                                    if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.LONG)) {
                                        return java.lang.Long.parseLong(raw.toString());
                                    } else {
                                        if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.INT)) {
                                            return java.lang.Integer.parseInt(raw.toString());
                                        } else {
                                            if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.BOOL)) {
                                                return raw.toString().equals("true");
                                            } else {
                                                if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.SHORT)) {
                                                    return java.lang.Short.parseShort(raw.toString());
                                                } else {
                                                    if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.DOUBLE)) {
                                                        return java.lang.Double.parseDouble(raw.toString());
                                                    } else {
                                                        if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.FLOAT)) {
                                                            return java.lang.Float.parseFloat(raw.toString());
                                                        } else {
                                                            return null;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e = $ex$;
                                    e.printStackTrace();
                                    return null;
                                }
                            }
                        };
                        return JsonModelLoader;
                    })();
                    json.JsonModelLoader = JsonModelLoader;
                })(api.json || (api.json = {}));
                var json = api.json;

                (function (polynomial) {
                    var DefaultPolynomialModel2 = (function () {
                        function DefaultPolynomialModel2(timeOrigin, toleratedError, maxDegree, degradeFactor, prioritization) {
                            this.timePoints = new java.util.ArrayList();
                            this.timeOrigin = timeOrigin;
                            this.degradeFactor = degradeFactor;
                            this.prioritization = prioritization;
                            this.maxDegree = maxDegree;
                            this.toleratedError = toleratedError;
                        }
                        DefaultPolynomialModel2.prototype.getSamples = function () {
                            return this.timePoints;
                        };

                        DefaultPolynomialModel2.prototype.getDegree = function () {
                            if (this.weights == null) {
                                return -1;
                            } else {
                                return this.weights.length - 1;
                            }
                        };

                        DefaultPolynomialModel2.prototype.getTimeOrigin = function () {
                            return this.timeOrigin;
                        };

                        DefaultPolynomialModel2.prototype.getMaxErr = function (degree, toleratedError, maxDegree, prioritization) {
                            var tol = toleratedError;
                            if (prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.HIGHDEGREES) {
                                tol = toleratedError / Math.pow(2, maxDegree - degree);
                            } else {
                                if (prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES) {
                                    tol = toleratedError / Math.pow(2, degree + 0.5);
                                } else {
                                    if (prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.SAMEPRIORITY) {
                                        tol = toleratedError * degree * 2 / (2 * maxDegree);
                                    }
                                }
                            }
                            return tol;
                        };

                        DefaultPolynomialModel2.prototype.internal_feed = function (time, value) {
                            if (this.weights == null) {
                                this.weights = new Array();
                                this.weights[0] = value;
                                this.timeOrigin = time;
                                this.timePoints.add(time);
                            }
                        };

                        DefaultPolynomialModel2.prototype.maxError = function (computedWeights, time, value) {
                            var maxErr = 0;
                            var temp = 0;
                            var ds;
                            for (var i = 0; i < this.timePoints.size(); i++) {
                                ds = this.timePoints.get(i);
                                var val = this.internal_extrapolate(ds, computedWeights);
                                temp = Math.abs(val - this.internal_extrapolate(ds, this.weights));
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

                        DefaultPolynomialModel2.prototype.comparePolynome = function (p2, err) {
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

                        DefaultPolynomialModel2.prototype.internal_extrapolate = function (time, weights) {
                            var result = 0;
                            var t = (time - this.timeOrigin) / this.degradeFactor;
                            var power = 1;
                            for (var j = 0; j < weights.length; j++) {
                                result += weights[j] * power;
                                power = power * t;
                            }
                            return result;
                        };

                        DefaultPolynomialModel2.prototype.extrapolate = function (time) {
                            return this.internal_extrapolate(time, this.weights);
                        };

                        DefaultPolynomialModel2.prototype.insert = function (time, value) {
                            if (this.weights == null) {
                                this.internal_feed(time, value);
                                return true;
                            }
                            var maxError = this.getMaxErr(this.getDegree(), this.toleratedError, this.maxDegree, this.prioritization);
                            if (Math.abs(this.extrapolate(time) - value) <= maxError) {
                                this.timePoints.add(time);
                                java.util.Collections.sort(this.timePoints);
                                return true;
                            }
                            var deg = this.getDegree();
                            if (deg < this.maxDegree) {
                                deg++;
                                var ss = Math.min(deg * 2, this.timePoints.size());
                                var times = new Array();
                                var values = new Array();
                                var current = this.timePoints.size();
                                for (var i = 0; i < ss; i++) {
                                    var index = Math.round(i * current / ss);
                                    var ds = this.timePoints.get(index);
                                    times[i] = (ds - this.timeOrigin) / this.degradeFactor;
                                    values[i] = this.internal_extrapolate(ds, this.weights);
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
                                    this.timePoints.add(time);
                                    java.util.Collections.sort(this.timePoints);
                                    return true;
                                }
                            }
                            return false;
                        };

                        DefaultPolynomialModel2.prototype.lastIndex = function () {
                            if (this.timePoints.size() != 0) {
                                return this.timePoints.get(this.timePoints.size() - 1);
                            } else {
                                return -1;
                            }
                        };

                        DefaultPolynomialModel2.prototype.indexBefore = function (time) {
                            if (this.timePoints.size() != 0) {
                                for (var i = 0; i < this.timePoints.size() - 1; i++) {
                                    if (this.timePoints.get(i) < time && this.timePoints.get(i + 1) > time) {
                                        return this.timePoints.get(i);
                                    }
                                }
                                return this.timePoints.get(this.timePoints.size() - 1);
                            }
                            return -1;
                        };

                        DefaultPolynomialModel2.prototype.timesAfter = function (time) {
                            if (this.timePoints.size() != 0) {
                                for (var i = 0; i < this.timePoints.size() - 1; i++) {
                                    if (this.timePoints.get(i) < time && this.timePoints.get(i + 1) > time) {
                                        var result = new Array();
                                        for (var j = i + 1; j < this.timePoints.size(); j++) {
                                            result[j - i - 1] = this.timePoints.get(j);
                                        }
                                        return result;
                                    }
                                }
                            }
                            return null;
                        };

                        DefaultPolynomialModel2.prototype.save = function () {
                            var builder = new java.lang.StringBuilder();
                            for (var i = 0; i < this.weights.length; i++) {
                                if (i != 0) {
                                    builder.append(DefaultPolynomialModel2.sep);
                                }
                                builder.append(this.weights[i]);
                            }
                            return builder.toString();
                        };

                        DefaultPolynomialModel2.prototype.load = function (payload) {
                            var elems = payload.split(DefaultPolynomialModel2.sep + "");
                            this.weights = new Array();
                            for (var i = 0; i < elems.length; i++) {
                                this.weights[i] = java.lang.Double.parseDouble(elems[i]);
                            }
                        };
                        DefaultPolynomialModel2.sep = '|';
                        return DefaultPolynomialModel2;
                    })();
                    polynomial.DefaultPolynomialModel2 = DefaultPolynomialModel2;

                    var DefaultPolynomialModel = (function () {
                        function DefaultPolynomialModel(timeOrigin, toleratedError, maxDegree, degradeFactor, prioritization) {
                            this.samples = new java.util.ArrayList();
                            this._lastIndex = -1;
                            this.timeOrigin = timeOrigin;
                            this.degradeFactor = degradeFactor;
                            this.prioritization = prioritization;
                            this.maxDegree = maxDegree;
                            this.toleratedError = toleratedError;
                        }
                        DefaultPolynomialModel.prototype.getSamples = function () {
                            return this.samples;
                        };

                        DefaultPolynomialModel.prototype.getDegree = function () {
                            if (this.weights == null) {
                                return -1;
                            } else {
                                return this.weights.length - 1;
                            }
                        };

                        DefaultPolynomialModel.prototype.getTimeOrigin = function () {
                            return this.timeOrigin;
                        };

                        DefaultPolynomialModel.prototype.getMaxErr = function (degree, toleratedError, maxDegree, prioritization) {
                            var tol = toleratedError;
                            if (prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.HIGHDEGREES) {
                                tol = toleratedError / Math.pow(2, maxDegree - degree);
                            } else {
                                if (prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES) {
                                    tol = toleratedError / Math.pow(2, degree + 0.5);
                                } else {
                                    if (prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.SAMEPRIORITY) {
                                        tol = toleratedError * degree * 2 / (2 * maxDegree);
                                    }
                                }
                            }
                            return tol;
                        };

                        DefaultPolynomialModel.prototype.internal_feed = function (time, value) {
                            if (this.weights == null) {
                                this.weights = new Array();
                                this.weights[0] = value;
                                this.timeOrigin = time;
                                this.samples.add(new org.kevoree.modeling.api.polynomial.util.DataSample(time, value));
                            }
                        };

                        DefaultPolynomialModel.prototype.maxError = function (computedWeights, time, value) {
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

                        DefaultPolynomialModel.prototype.comparePolynome = function (p2, err) {
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

                        DefaultPolynomialModel.prototype.internal_extrapolate = function (time, weights) {
                            var result = 0;
                            var t = (time - this.timeOrigin) / this.degradeFactor;
                            var power = 1;
                            for (var j = 0; j < weights.length; j++) {
                                result += weights[j] * power;
                                power = power * t;
                            }
                            return result;
                        };

                        DefaultPolynomialModel.prototype.extrapolate = function (time) {
                            return this.internal_extrapolate(time, this.weights);
                        };

                        DefaultPolynomialModel.prototype.insert = function (time, value) {
                            if (this.weights == null) {
                                this.internal_feed(time, value);
                                this._lastIndex = time;
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
                                    return true;
                                }
                            }
                            return false;
                        };

                        DefaultPolynomialModel.prototype.lastIndex = function () {
                            return this._lastIndex;
                        };

                        DefaultPolynomialModel.prototype.indexBefore = function (time) {
                            return this._lastIndex;
                        };

                        DefaultPolynomialModel.prototype.timesAfter = function (time) {
                            return null;
                        };

                        DefaultPolynomialModel.prototype.save = function () {
                            var builder = new java.lang.StringBuilder();
                            for (var i = 0; i < this.weights.length; i++) {
                                if (i != 0) {
                                    builder.append(DefaultPolynomialModel.sep);
                                }
                                builder.append(this.weights[i]);
                            }
                            return builder.toString();
                        };

                        DefaultPolynomialModel.prototype.load = function (payload) {
                            var elems = payload.split(DefaultPolynomialModel.sep + "");
                            this.weights = new Array();
                            for (var i = 0; i < elems.length; i++) {
                                this.weights[i] = java.lang.Double.parseDouble(elems[i]);
                            }
                        };
                        DefaultPolynomialModel.sep = '|';
                        return DefaultPolynomialModel;
                    })();
                    polynomial.DefaultPolynomialModel = DefaultPolynomialModel;

                    (function (util) {
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
                                    } else {
                                        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA_smallMV(a, b, c);
                                    }
                                } else {
                                    if (a.numCols >= org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH || b.numCols >= org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH) {
                                        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA_reorderMM(a, b, c);
                                    } else {
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
                                    } else {
                                        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.setIdentity(Q);
                                    }
                                } else {
                                    if (Q == null) {
                                        Q = org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.widentity(this.numRows);
                                    } else {
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
                                    } else {
                                        R = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(this.numRows, this.numCols);
                                    }
                                } else {
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
                                } else {
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
                    })(polynomial.util || (polynomial.util = {}));
                    var util = polynomial.util;
                })(api.polynomial || (api.polynomial = {}));
                var polynomial = api.polynomial;

                (function (_time) {
                    (function (rbtree) {
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
                                } else {
                                    return null;
                                }
                            };

                            TreeNode.prototype.sibling = function () {
                                if (this.parent == null) {
                                    return null;
                                } else {
                                    if (this == this.parent.left) {
                                        return this.parent.right;
                                    } else {
                                        return this.parent.left;
                                    }
                                }
                            };

                            TreeNode.prototype.uncle = function () {
                                if (this.parent != null) {
                                    return this.parent.sibling();
                                } else {
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
                                    } else {
                                        builder.append(TreeNode.RED_DELETE);
                                    }
                                } else {
                                    if (this.color == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                        builder.append(TreeNode.BLACK_EXISTS);
                                    } else {
                                        builder.append(TreeNode.RED_EXISTS);
                                    }
                                }
                                builder.append(this.key);
                                if (this.left == null && this.right == null) {
                                    builder.append("%");
                                } else {
                                    if (this.left != null) {
                                        this.left.serialize(builder);
                                    } else {
                                        builder.append("#");
                                    }
                                    if (this.right != null) {
                                        this.right.serialize(builder);
                                    } else {
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
                                } else {
                                    if (p.parent != null) {
                                        if (p == p.parent.left) {
                                            return p.parent;
                                        } else {
                                            while (p.parent != null && p == p.parent.right) {
                                                p = p.parent;
                                            }
                                            return p.parent;
                                        }
                                    } else {
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
                                } else {
                                    if (p.parent != null) {
                                        if (p == p.parent.right) {
                                            return p.parent;
                                        } else {
                                            while (p.parent != null && p == p.parent.left) {
                                                p = p.parent;
                                            }
                                            return p.parent;
                                        }
                                    } else {
                                        return null;
                                    }
                                }
                            };
                            TreeNode.BLACK_DELETE = '0';
                            TreeNode.BLACK_EXISTS = '1';
                            TreeNode.RED_DELETE = '2';
                            TreeNode.RED_EXISTS = '3';
                            return TreeNode;
                        })();
                        rbtree.TreeNode = TreeNode;

                        var ReaderContext = (function () {
                            function ReaderContext(offset, payload) {
                                this.offset = offset;
                                this.payload = payload;
                            }
                            ReaderContext.prototype.unserialize = function (rightBranch) {
                                if (this.offset >= this.payload.length) {
                                    return null;
                                }
                                var tokenBuild = new java.lang.StringBuilder();
                                var ch = this.payload.charAt(this.offset);
                                if (ch == '%') {
                                    if (rightBranch) {
                                        this.offset = this.offset + 1;
                                    }
                                    return null;
                                }
                                if (ch == '#') {
                                    this.offset = this.offset + 1;
                                    return null;
                                }
                                if (ch != '|') {
                                    throw new java.lang.Exception("Error while loading BTree");
                                }
                                this.offset = this.offset + 1;
                                ch = this.payload.charAt(this.offset);
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
                                this.offset = this.offset + 1;
                                ch = this.payload.charAt(this.offset);
                                while (this.offset + 1 < this.payload.length && ch != '|' && ch != '#' && ch != '%') {
                                    tokenBuild.append(ch);
                                    this.offset = this.offset + 1;
                                    ch = this.payload.charAt(this.offset);
                                }
                                if (ch != '|' && ch != '#' && ch != '%') {
                                    tokenBuild.append(ch);
                                }
                                var p = new org.kevoree.modeling.api.time.rbtree.TreeNode(java.lang.Long.parseLong(tokenBuild.toString()), state, color, null, null);
                                var left = this.unserialize(false);
                                if (left != null) {
                                    left.setParent(p);
                                }
                                var right = this.unserialize(true);
                                if (right != null) {
                                    right.setParent(p);
                                }
                                p.setLeft(left);
                                p.setRight(right);
                                return p;
                            };
                            return ReaderContext;
                        })();
                        rbtree.ReaderContext = ReaderContext;

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
                                this.root = new org.kevoree.modeling.api.time.rbtree.ReaderContext(i, payload).unserialize(true);
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
                                        } else {
                                            return p;
                                        }
                                    } else {
                                        if (p.getLeft() != null) {
                                            p = p.getLeft();
                                        } else {
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
                                        } else {
                                            return p;
                                        }
                                    } else {
                                        if (p.getRight() != null) {
                                            p = p.getRight();
                                        } else {
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
                                        } else {
                                            return p.previous();
                                        }
                                    } else {
                                        if (key > p.key) {
                                            if (p.getRight() != null) {
                                                p = p.getRight();
                                            } else {
                                                return p;
                                            }
                                        } else {
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
                                } else {
                                    if (elm.key == key) {
                                        elm = elm.previous();
                                    }
                                }
                                if (elm == null || elm.value.equals(until)) {
                                    return null;
                                } else {
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
                                        } else {
                                            return p;
                                        }
                                    } else {
                                        if (key > p.key) {
                                            if (p.getRight() != null) {
                                                p = p.getRight();
                                            } else {
                                                return p.next();
                                            }
                                        } else {
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
                                } else {
                                    if (elm.key == key) {
                                        elm = elm.next();
                                    }
                                }
                                if (elm == null || elm.value.equals(until)) {
                                    return null;
                                } else {
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
                                    } else {
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
                                    } else {
                                        return p;
                                    }
                                }
                                return null;
                            };

                            RBTree.prototype.firstWhileNot = function (key, until) {
                                var elm = this.previousOrEqual(key);
                                if (elm == null) {
                                    return null;
                                } else {
                                    if (elm.value.equals(until)) {
                                        return null;
                                    }
                                }
                                var prev = null;
                                do {
                                    prev = elm.previous();
                                    if (prev == null || prev.value.equals(until)) {
                                        return elm;
                                    } else {
                                        elm = prev;
                                    }
                                } while(elm != null);
                                return prev;
                            };

                            RBTree.prototype.lastWhileNot = function (key, until) {
                                var elm = this.previousOrEqual(key);
                                if (elm == null) {
                                    return null;
                                } else {
                                    if (elm.value.equals(until)) {
                                        return null;
                                    }
                                }
                                var next;
                                do {
                                    next = elm.next();
                                    if (next == null || next.value.equals(until)) {
                                        return elm;
                                    } else {
                                        elm = next;
                                    }
                                } while(elm != null);
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
                                    } else {
                                        if (key < n.key) {
                                            n = n.getLeft();
                                        } else {
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
                                } else {
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
                                } else {
                                    if (oldn == oldn.getParent().getLeft()) {
                                        oldn.getParent().setLeft(newn);
                                    } else {
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
                                } else {
                                    var n = this.root;
                                    while (true) {
                                        if (key == n.key) {
                                            n.value = value;
                                            return;
                                        } else {
                                            if (key < n.key) {
                                                if (n.getLeft() == null) {
                                                    n.setLeft(insertedNode);
                                                    this._size++;
                                                    break;
                                                } else {
                                                    n = n.getLeft();
                                                }
                                            } else {
                                                if (n.getRight() == null) {
                                                    n.setRight(insertedNode);
                                                    this._size++;
                                                    break;
                                                } else {
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
                                } else {
                                    this.insertCase2(n);
                                }
                            };

                            RBTree.prototype.insertCase2 = function (n) {
                                if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    return;
                                } else {
                                    this.insertCase3(n);
                                }
                            };

                            RBTree.prototype.insertCase3 = function (n) {
                                if (this.nodeColor(n.uncle()) == org.kevoree.modeling.api.time.rbtree.Color.RED) {
                                    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    n.uncle().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    n.grandparent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    this.insertCase1(n.grandparent());
                                } else {
                                    this.insertCase4(n);
                                }
                            };

                            RBTree.prototype.insertCase4 = function (n_n) {
                                var n = n_n;
                                if (n == n.getParent().getRight() && n.getParent() == n.grandparent().getLeft()) {
                                    this.rotateLeft(n.getParent());
                                    n = n.getLeft();
                                } else {
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
                                } else {
                                    this.rotateLeft(n.grandparent());
                                }
                            };

                            RBTree.prototype.delete = function (key) {
                                var n = this.lookupNode(key);
                                if (n == null) {
                                    return;
                                } else {
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
                                    } else {
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
                                } else {
                                    this.deleteCase2(n);
                                }
                            };

                            RBTree.prototype.deleteCase2 = function (n) {
                                if (this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.RED) {
                                    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    if (n == n.getParent().getLeft()) {
                                        this.rotateLeft(n.getParent());
                                    } else {
                                        this.rotateRight(n.getParent());
                                    }
                                }
                                this.deleteCase3(n);
                            };

                            RBTree.prototype.deleteCase3 = function (n) {
                                if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    this.deleteCase1(n.getParent());
                                } else {
                                    this.deleteCase4(n);
                                }
                            };

                            RBTree.prototype.deleteCase4 = function (n) {
                                if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                } else {
                                    this.deleteCase5(n);
                                }
                            };

                            RBTree.prototype.deleteCase5 = function (n) {
                                if (n == n.getParent().getLeft() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    n.sibling().getLeft().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    this.rotateRight(n.sibling());
                                } else {
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
                                } else {
                                    n.sibling().getLeft().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    this.rotateRight(n.getParent());
                                }
                            };

                            RBTree.prototype.nodeColor = function (n) {
                                if (n == null) {
                                    return org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                } else {
                                    return n.color;
                                }
                            };
                            return RBTree;
                        })();
                        rbtree.RBTree = RBTree;

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
                    })(_time.rbtree || (_time.rbtree = {}));
                    var rbtree = _time.rbtree;

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
                            } else {
                                return null;
                            }
                        };

                        DefaultTimeTree.prototype.last = function () {
                            var lastNode = this.versionTree.last();
                            if (lastNode != null) {
                                return lastNode.getKey();
                            } else {
                                return null;
                            }
                        };

                        DefaultTimeTree.prototype.next = function (from) {
                            var nextNode = this.versionTree.next(from);
                            if (nextNode != null) {
                                return nextNode.getKey();
                            } else {
                                return null;
                            }
                        };

                        DefaultTimeTree.prototype.previous = function (from) {
                            var previousNode = this.versionTree.previous(from);
                            if (previousNode != null) {
                                return previousNode.getKey();
                            } else {
                                return null;
                            }
                        };

                        DefaultTimeTree.prototype.resolve = function (time) {
                            var previousNode = this.versionTree.previousOrEqual(time);
                            if (previousNode != null) {
                                return previousNode.getKey();
                            } else {
                                return null;
                            }
                        };

                        DefaultTimeTree.prototype.insert = function (time) {
                            this.versionTree.insert(time, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
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
                })(api.time || (api.time = {}));
                var time = api.time;

                var KActionType = (function () {
                    function KActionType(code) {
                        this.code = "";
                        this.code = code;
                    }
                    KActionType.prototype.toString = function () {
                        return this.code;
                    };

                    KActionType.prototype.equals = function (other) {
                        return this == other;
                    };

                    KActionType.values = function () {
                        return KActionType._KActionTypeVALUES;
                    };
                    KActionType.SET = new KActionType("SET");
                    KActionType.ADD = new KActionType("ADD");
                    KActionType.REMOVE = new KActionType("DEL");
                    KActionType.NEW = new KActionType("NEW");

                    KActionType._KActionTypeVALUES = [
                        KActionType.SET,
                        KActionType.ADD,
                        KActionType.REMOVE,
                        KActionType.NEW
                    ];
                    return KActionType;
                })();
                api.KActionType = KActionType;

                (function (util) {
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
                            } else {
                                var obj = arr[index];
                                each(obj, function (err) {
                                    if (err != null) {
                                        if (end != null) {
                                            end(err);
                                        }
                                    } else {
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
                                } else {
                                    return currentPath.substring(0, lastIndex);
                                }
                            } else {
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
                            } else {
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
                })(api.util || (api.util = {}));
                var util = api.util;
                (function (extrapolation) {
                    var PolynomialExtrapolation = (function () {
                        function PolynomialExtrapolation() {
                        }
                        PolynomialExtrapolation.prototype.timedDependencies = function (current) {
                            var times = new Array();
                            times[0] = current.timeTree().resolve(current.now());
                            return times;
                        };

                        PolynomialExtrapolation.prototype.extrapolate = function (current, attribute, dependencies) {
                            var pol = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[attribute.index()];
                            if (pol != null) {
                                var extrapolatedValue = pol.extrapolate(current.now());
                                if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.DOUBLE)) {
                                    return extrapolatedValue;
                                } else {
                                    if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.LONG)) {
                                        return extrapolatedValue.longValue();
                                    } else {
                                        if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.FLOAT)) {
                                            return extrapolatedValue.floatValue();
                                        } else {
                                            if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.INT)) {
                                                return extrapolatedValue.intValue();
                                            } else {
                                                if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.SHORT)) {
                                                    return extrapolatedValue.shortValue();
                                                } else {
                                                    return null;
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                return null;
                            }
                        };

                        PolynomialExtrapolation.prototype.mutate = function (current, attribute, payload, dependencies) {
                            var previous = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[attribute.index()];
                            if (previous == null) {
                                var pol = new org.kevoree.modeling.api.polynomial.DefaultPolynomialModel(current.now(), attribute.precision(), 20, 1, org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES);
                                pol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()));
                                current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE)[attribute.index()] = pol;
                            } else {
                                var previousPol = previous;
                                if (!previousPol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()))) {
                                    var pol = new org.kevoree.modeling.api.polynomial.DefaultPolynomialModel(previousPol.lastIndex(), attribute.precision(), 20, 1, org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES);
                                    pol.insert(previousPol.lastIndex(), previousPol.extrapolate(previousPol.lastIndex()));
                                    pol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()));
                                    current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE)[attribute.index()] = pol;
                                }
                            }
                        };

                        PolynomialExtrapolation.instance = function () {
                            if (PolynomialExtrapolation.INSTANCE == null) {
                                PolynomialExtrapolation.INSTANCE = new org.kevoree.modeling.api.extrapolation.PolynomialExtrapolation();
                            }
                            return PolynomialExtrapolation.INSTANCE;
                        };
                        return PolynomialExtrapolation;
                    })();
                    extrapolation.PolynomialExtrapolation = PolynomialExtrapolation;

                    var PolynomialExtrapolation2 = (function () {
                        function PolynomialExtrapolation2() {
                        }
                        PolynomialExtrapolation2.prototype.timedDependencies = function (current) {
                            var times = new Array();
                            times[0] = current.timeTree().resolve(current.now());
                            return times;
                        };

                        PolynomialExtrapolation2.prototype.extrapolate = function (current, attribute, dependencies) {
                            var pol = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[attribute.index()];
                            if (pol != null) {
                                var extrapolatedValue = pol.extrapolate(current.now());
                                if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.DOUBLE)) {
                                    return extrapolatedValue;
                                } else {
                                    if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.LONG)) {
                                        return extrapolatedValue.longValue();
                                    } else {
                                        if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.FLOAT)) {
                                            return extrapolatedValue.floatValue();
                                        } else {
                                            if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.INT)) {
                                                return extrapolatedValue.intValue();
                                            } else {
                                                if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.SHORT)) {
                                                    return extrapolatedValue.shortValue();
                                                } else {
                                                    return null;
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                return null;
                            }
                        };

                        PolynomialExtrapolation2.prototype.mutate = function (current, attribute, payload, dependencies) {
                            var previous = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[attribute.index()];
                            if (previous == null) {
                                var pol = new org.kevoree.modeling.api.polynomial.DefaultPolynomialModel2(current.now(), attribute.precision(), 20, 1, org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES);
                                pol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()));
                                current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE)[attribute.index()] = pol;
                            } else {
                                var previousPol = previous;
                                if (!previousPol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()))) {
                                    var prevTime = previousPol.indexBefore(current.now());
                                    var pol = new org.kevoree.modeling.api.polynomial.DefaultPolynomialModel2(prevTime, attribute.precision(), 20, 1, org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES);
                                    pol.insert(prevTime, previousPol.extrapolate(prevTime));
                                    pol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()));
                                    current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE)[attribute.index()] = pol;
                                    var times = pol.timesAfter(current.now());
                                }
                            }
                        };

                        PolynomialExtrapolation2.instance = function () {
                            if (PolynomialExtrapolation2.INSTANCE == null) {
                                PolynomialExtrapolation2.INSTANCE = new org.kevoree.modeling.api.extrapolation.PolynomialExtrapolation2();
                            }
                            return PolynomialExtrapolation2.INSTANCE;
                        };
                        return PolynomialExtrapolation2;
                    })();
                    extrapolation.PolynomialExtrapolation2 = PolynomialExtrapolation2;

                    var DiscreteExtrapolation = (function () {
                        function DiscreteExtrapolation() {
                        }
                        DiscreteExtrapolation.prototype.timedDependencies = function (current) {
                            var times = new Array();
                            times[0] = current.timeTree().resolve(current.now());
                            return times;
                        };

                        DiscreteExtrapolation.prototype.extrapolate = function (current, attribute, dependencies) {
                            var payload = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ);
                            if (payload != null) {
                                return payload[attribute.index()];
                            } else {
                                return null;
                            }
                        };

                        DiscreteExtrapolation.prototype.mutate = function (current, attribute, payload, dependencies) {
                            var internalPayload = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE);
                            if (internalPayload != null) {
                                internalPayload[attribute.index()] = payload;
                            }
                        };

                        DiscreteExtrapolation.instance = function () {
                            if (DiscreteExtrapolation.INSTANCE == null) {
                                DiscreteExtrapolation.INSTANCE = new org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation();
                            }
                            return DiscreteExtrapolation.INSTANCE;
                        };
                        return DiscreteExtrapolation;
                    })();
                    extrapolation.DiscreteExtrapolation = DiscreteExtrapolation;

                    var LinearRegressionExtrapolation = (function () {
                        function LinearRegressionExtrapolation() {
                        }
                        LinearRegressionExtrapolation.prototype.timedDependencies = function (current) {
                            return new Array();
                        };

                        LinearRegressionExtrapolation.prototype.extrapolate = function (current, attribute, dependencies) {
                            return null;
                        };

                        LinearRegressionExtrapolation.prototype.mutate = function (current, attribute, payload, dependencies) {
                        };

                        LinearRegressionExtrapolation.instance = function () {
                            if (LinearRegressionExtrapolation.INSTANCE == null) {
                                LinearRegressionExtrapolation.INSTANCE = new org.kevoree.modeling.api.extrapolation.LinearRegressionExtrapolation();
                            }
                            return LinearRegressionExtrapolation.INSTANCE;
                        };
                        return LinearRegressionExtrapolation;
                    })();
                    extrapolation.LinearRegressionExtrapolation = LinearRegressionExtrapolation;
                })(api.extrapolation || (api.extrapolation = {}));
                var extrapolation = api.extrapolation;
            })(modeling.api || (modeling.api = {}));
            var api = modeling.api;
        })(kevoree.modeling || (kevoree.modeling = {}));
        var modeling = kevoree.modeling;
    })(org.kevoree || (org.kevoree = {}));
    var kevoree = org.kevoree;
})(org || (org = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cloud;
(function (cloud) {
    var CloudDimension = (function (_super) {
        __extends(CloudDimension, _super);
        function CloudDimension(universe, key) {
            _super.call(this, universe, key);
        }
        CloudDimension.prototype.internal_create = function (timePoint) {
            return new cloud.impl.CloudViewImpl(timePoint, this);
        };
        return CloudDimension;
    })(org.kevoree.modeling.api.abs.AbstractKDimension);
    cloud.CloudDimension = CloudDimension;
    var CloudUniverse = (function (_super) {
        __extends(CloudUniverse, _super);
        function CloudUniverse() {
            _super.call(this);
        }
        CloudUniverse.prototype.internal_create = function (key) {
            return new cloud.CloudDimension(this, key);
        };
        return CloudUniverse;
    })(org.kevoree.modeling.api.abs.AbstractKUniverse);
    cloud.CloudUniverse = CloudUniverse;
    var CloudView;
    (function (CloudView) {
        var METACLASSES = (function () {
            function METACLASSES(name, index) {
                this._name = name;
                this._index = index;
            }
            METACLASSES.prototype.index = function () {
                return this._index;
            };
            METACLASSES.prototype.metaName = function () {
                return this._name;
            };
            METACLASSES.prototype.metaAttributes = function () {
                if (this._index == 0) {
                    return cloud.Element.METAATTRIBUTES.values();
                }
                if (this._index == 1) {
                    return cloud.Node.METAATTRIBUTES.values();
                }
                return new Array();
            };
            METACLASSES.prototype.metaReferences = function () {
                if (this._index == 0) {
                    return cloud.Element.METAREFERENCES.values();
                }
                if (this._index == 1) {
                    return cloud.Node.METAREFERENCES.values();
                }
                return new Array();
            };
            METACLASSES.prototype.metaOperations = function () {
                if (this._index == 0) {
                    return cloud.Element.METAOPERATIONS.values();
                }
                if (this._index == 1) {
                    return cloud.Node.METAOPERATIONS.values();
                }
                return new Array();
            };
            METACLASSES.prototype.metaAttribute = function (name) {
                var atts = this.metaAttributes();
                for (var i = 0; i < atts.length; i++) {
                    if (atts[i].metaName().equals(name)) {
                        return atts[i];
                    }
                }
                return null;
            };
            METACLASSES.prototype.metaReference = function (name) {
                var refs = this.metaReferences();
                for (var i = 0; i < refs.length; i++) {
                    if (refs[i].metaName().equals(name)) {
                        return refs[i];
                    }
                }
                return null;
            };
            METACLASSES.prototype.metaOperation = function (name) {
                var ops = this.metaOperations();
                for (var i = 0; i < ops.length; i++) {
                    if (ops[i].metaName().equals(name)) {
                        return ops[i];
                    }
                }
                return null;
            };
            METACLASSES.prototype.equals = function (other) {
                return this == other;
            };
            METACLASSES.values = function () {
                return METACLASSES._METACLASSESVALUES;
            };
            METACLASSES.CLOUD_ELEMENT = new METACLASSES("cloud.Element", 0);
            METACLASSES.CLOUD_NODE = new METACLASSES("cloud.Node", 1);
            METACLASSES._METACLASSESVALUES = [
                METACLASSES.CLOUD_ELEMENT,
                METACLASSES.CLOUD_NODE
            ];
            return METACLASSES;
        })();
        CloudView.METACLASSES = METACLASSES;
    })(CloudView = cloud.CloudView || (cloud.CloudView = {}));
    var Element;
    (function (Element) {
        var METAATTRIBUTES = (function () {
            function METAATTRIBUTES(name, index, precision, key, metaType, extrapolation) {
                this._name = name;
                this._index = index;
                this._precision = precision;
                this._key = key;
                this._metaType = metaType;
                this._extrapolation = extrapolation;
            }
            METAATTRIBUTES.prototype.index = function () {
                return this._index;
            };
            METAATTRIBUTES.prototype.metaName = function () {
                return this._name;
            };
            METAATTRIBUTES.prototype.precision = function () {
                return this._precision;
            };
            METAATTRIBUTES.prototype.key = function () {
                return this._key;
            };
            METAATTRIBUTES.prototype.metaType = function () {
                return this._metaType;
            };
            METAATTRIBUTES.prototype.origin = function () {
                return cloud.CloudView.METACLASSES.CLOUD_ELEMENT;
            };
            METAATTRIBUTES.prototype.strategy = function () {
                return this._extrapolation;
            };
            METAATTRIBUTES.prototype.setExtrapolation = function (extrapolation) {
                this._extrapolation = extrapolation;
            };
            METAATTRIBUTES.prototype.equals = function (other) {
                return this == other;
            };
            METAATTRIBUTES.values = function () {
                return METAATTRIBUTES._METAATTRIBUTESVALUES;
            };
            METAATTRIBUTES.LOAD = new METAATTRIBUTES("load", 5, 2.2, false, org.kevoree.modeling.api.meta.MetaType.DOUBLE, org.kevoree.modeling.api.extrapolation.PolynomialExtrapolation.instance());
            METAATTRIBUTES.NAME = new METAATTRIBUTES("name", 6, 0, true, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
            METAATTRIBUTES.VALUE = new METAATTRIBUTES("value", 7, 0, false, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
            METAATTRIBUTES._METAATTRIBUTESVALUES = [
                METAATTRIBUTES.LOAD,
                METAATTRIBUTES.NAME,
                METAATTRIBUTES.VALUE
            ];
            return METAATTRIBUTES;
        })();
        Element.METAATTRIBUTES = METAATTRIBUTES;
        var METAREFERENCES = (function () {
            function METAREFERENCES(name, index, contained, single, metaType) {
                this._name = name;
                this._index = index;
                this._contained = contained;
                this._single = single;
                this._metaType = metaType;
            }
            METAREFERENCES.prototype.index = function () {
                return this._index;
            };
            METAREFERENCES.prototype.metaName = function () {
                return this._name;
            };
            METAREFERENCES.prototype.contained = function () {
                return this._contained;
            };
            METAREFERENCES.prototype.single = function () {
                return this._single;
            };
            METAREFERENCES.prototype.metaType = function () {
                return this._metaType;
            };
            METAREFERENCES.prototype.opposite = function () {
                switch (this) {
                    default:
                        return null;
                }
            };
            METAREFERENCES.prototype.origin = function () {
                return cloud.CloudView.METACLASSES.CLOUD_ELEMENT;
            };
            METAREFERENCES.prototype.equals = function (other) {
                return this == other;
            };
            METAREFERENCES.values = function () {
                return METAREFERENCES._METAREFERENCESVALUES;
            };
            METAREFERENCES._METAREFERENCESVALUES = [
            ];
            return METAREFERENCES;
        })();
        Element.METAREFERENCES = METAREFERENCES;
        var METAOPERATIONS = (function () {
            function METAOPERATIONS(name, index) {
                this._name = name;
                this._index = index;
            }
            METAOPERATIONS.prototype.index = function () {
                return this._index;
            };
            METAOPERATIONS.prototype.metaName = function () {
                return this._name;
            };
            METAOPERATIONS.prototype.origin = function () {
                return cloud.CloudView.METACLASSES.CLOUD_ELEMENT;
            };
            METAOPERATIONS.prototype.equals = function (other) {
                return this == other;
            };
            METAOPERATIONS.values = function () {
                return METAOPERATIONS._METAOPERATIONSVALUES;
            };
            METAOPERATIONS.TRIGGER = new METAOPERATIONS("trigger", 8);
            METAOPERATIONS._METAOPERATIONSVALUES = [
                METAOPERATIONS.TRIGGER
            ];
            return METAOPERATIONS;
        })();
        Element.METAOPERATIONS = METAOPERATIONS;
    })(Element = cloud.Element || (cloud.Element = {}));
    var impl;
    (function (impl) {
        var CloudViewImpl = (function (_super) {
            __extends(CloudViewImpl, _super);
            function CloudViewImpl(p_now, p_dimension) {
                _super.call(this, p_now, p_dimension);
            }
            CloudViewImpl.prototype.internalCreate = function (p_clazz, p_timeTree, p_key) {
                if (p_clazz == null) {
                    return null;
                }
                switch (p_clazz.index()) {
                    case 0:
                        return new cloud.impl.ElementImpl(this, p_key, p_timeTree, p_clazz);
                    case 1:
                        return new cloud.impl.NodeImpl(this, p_key, p_timeTree, p_clazz);
                    default:
                        return null;
                }
            };
            CloudViewImpl.prototype.metaClasses = function () {
                return cloud.CloudView.METACLASSES.values();
            };
            CloudViewImpl.prototype.createElement = function () {
                return this.create(cloud.CloudView.METACLASSES.CLOUD_ELEMENT);
            };
            CloudViewImpl.prototype.createNode = function () {
                return this.create(cloud.CloudView.METACLASSES.CLOUD_NODE);
            };
            return CloudViewImpl;
        })(org.kevoree.modeling.api.abs.AbstractKView);
        impl.CloudViewImpl = CloudViewImpl;
        var ElementImpl = (function (_super) {
            __extends(ElementImpl, _super);
            function ElementImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
            }
            ElementImpl.prototype.metaAttributes = function () {
                return cloud.Element.METAATTRIBUTES.values();
            };
            ElementImpl.prototype.metaReferences = function () {
                return cloud.Element.METAREFERENCES.values();
            };
            ElementImpl.prototype.metaOperations = function () {
                return cloud.Element.METAOPERATIONS.values();
            };
            ElementImpl.prototype.getLoad = function () {
                return this.get(cloud.Element.METAATTRIBUTES.LOAD);
            };
            ElementImpl.prototype.setLoad = function (p_obj) {
                this.set(cloud.Element.METAATTRIBUTES.LOAD, p_obj);
                return this;
            };
            ElementImpl.prototype.getName = function () {
                return this.get(cloud.Element.METAATTRIBUTES.NAME);
            };
            ElementImpl.prototype.setName = function (p_obj) {
                this.set(cloud.Element.METAATTRIBUTES.NAME, p_obj);
                return this;
            };
            ElementImpl.prototype.getValue = function () {
                return this.get(cloud.Element.METAATTRIBUTES.VALUE);
            };
            ElementImpl.prototype.setValue = function (p_obj) {
                this.set(cloud.Element.METAATTRIBUTES.VALUE, p_obj);
                return this;
            };
            ElementImpl.prototype.trigger = function (param, loop, result) {
                var trigger_params = new Array();
                trigger_params[0] = param;
                trigger_params[1] = loop;
                this.view().dimension().universe().storage().operationManager().call(this, cloud.Element.METAOPERATIONS.TRIGGER, trigger_params, function (o) {
                    result(o);
                });
            };
            return ElementImpl;
        })(org.kevoree.modeling.api.abs.AbstractKObject);
        impl.ElementImpl = ElementImpl;
        var NodeImpl = (function (_super) {
            __extends(NodeImpl, _super);
            function NodeImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
            }
            NodeImpl.prototype.metaAttributes = function () {
                return cloud.Node.METAATTRIBUTES.values();
            };
            NodeImpl.prototype.metaReferences = function () {
                return cloud.Node.METAREFERENCES.values();
            };
            NodeImpl.prototype.metaOperations = function () {
                return cloud.Node.METAOPERATIONS.values();
            };
            NodeImpl.prototype.getName = function () {
                return this.get(cloud.Node.METAATTRIBUTES.NAME);
            };
            NodeImpl.prototype.setName = function (p_obj) {
                this.set(cloud.Node.METAATTRIBUTES.NAME, p_obj);
                return this;
            };
            NodeImpl.prototype.getValue = function () {
                return this.get(cloud.Node.METAATTRIBUTES.VALUE);
            };
            NodeImpl.prototype.setValue = function (p_obj) {
                this.set(cloud.Node.METAATTRIBUTES.VALUE, p_obj);
                return this;
            };
            NodeImpl.prototype.addChildren = function (p_obj) {
                this.mutate(org.kevoree.modeling.api.KActionType.ADD, cloud.Node.METAREFERENCES.CHILDREN, p_obj, true);
                return this;
            };
            NodeImpl.prototype.removeChildren = function (p_obj) {
                this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, cloud.Node.METAREFERENCES.CHILDREN, p_obj, true);
                return this;
            };
            NodeImpl.prototype.eachChildren = function (p_callback, p_end) {
                this.each(cloud.Node.METAREFERENCES.CHILDREN, p_callback, p_end);
            };
            NodeImpl.prototype.sizeOfChildren = function () {
                return this.size(cloud.Node.METAREFERENCES.CHILDREN);
            };
            NodeImpl.prototype.setElement = function (p_obj) {
                this.mutate(org.kevoree.modeling.api.KActionType.SET, cloud.Node.METAREFERENCES.ELEMENT, p_obj, true);
                return this;
            };
            NodeImpl.prototype.getElement = function (p_callback) {
                this.each(cloud.Node.METAREFERENCES.ELEMENT, p_callback, null);
            };
            return NodeImpl;
        })(org.kevoree.modeling.api.abs.AbstractKObject);
        impl.NodeImpl = NodeImpl;
    })(impl = cloud.impl || (cloud.impl = {}));
    var Node;
    (function (Node) {
        var METAATTRIBUTES = (function () {
            function METAATTRIBUTES(name, index, precision, key, metaType, extrapolation) {
                this._name = name;
                this._index = index;
                this._precision = precision;
                this._key = key;
                this._metaType = metaType;
                this._extrapolation = extrapolation;
            }
            METAATTRIBUTES.prototype.index = function () {
                return this._index;
            };
            METAATTRIBUTES.prototype.metaName = function () {
                return this._name;
            };
            METAATTRIBUTES.prototype.precision = function () {
                return this._precision;
            };
            METAATTRIBUTES.prototype.key = function () {
                return this._key;
            };
            METAATTRIBUTES.prototype.metaType = function () {
                return this._metaType;
            };
            METAATTRIBUTES.prototype.origin = function () {
                return cloud.CloudView.METACLASSES.CLOUD_NODE;
            };
            METAATTRIBUTES.prototype.strategy = function () {
                return this._extrapolation;
            };
            METAATTRIBUTES.prototype.setExtrapolation = function (extrapolation) {
                this._extrapolation = extrapolation;
            };
            METAATTRIBUTES.prototype.equals = function (other) {
                return this == other;
            };
            METAATTRIBUTES.values = function () {
                return METAATTRIBUTES._METAATTRIBUTESVALUES;
            };
            METAATTRIBUTES.NAME = new METAATTRIBUTES("name", 5, 0, true, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
            METAATTRIBUTES.VALUE = new METAATTRIBUTES("value", 6, 0, false, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
            METAATTRIBUTES._METAATTRIBUTESVALUES = [
                METAATTRIBUTES.NAME,
                METAATTRIBUTES.VALUE
            ];
            return METAATTRIBUTES;
        })();
        Node.METAATTRIBUTES = METAATTRIBUTES;
        var METAREFERENCES = (function () {
            function METAREFERENCES(name, index, contained, single, metaType) {
                this._name = name;
                this._index = index;
                this._contained = contained;
                this._single = single;
                this._metaType = metaType;
            }
            METAREFERENCES.prototype.index = function () {
                return this._index;
            };
            METAREFERENCES.prototype.metaName = function () {
                return this._name;
            };
            METAREFERENCES.prototype.contained = function () {
                return this._contained;
            };
            METAREFERENCES.prototype.single = function () {
                return this._single;
            };
            METAREFERENCES.prototype.metaType = function () {
                return this._metaType;
            };
            METAREFERENCES.prototype.opposite = function () {
                switch (this) {
                    default:
                        return null;
                }
            };
            METAREFERENCES.prototype.origin = function () {
                return cloud.CloudView.METACLASSES.CLOUD_NODE;
            };
            METAREFERENCES.prototype.equals = function (other) {
                return this == other;
            };
            METAREFERENCES.values = function () {
                return METAREFERENCES._METAREFERENCESVALUES;
            };
            METAREFERENCES.CHILDREN = new METAREFERENCES("children", 7, true, false, cloud.CloudView.METACLASSES.CLOUD_NODE);
            METAREFERENCES.ELEMENT = new METAREFERENCES("element", 8, true, true, cloud.CloudView.METACLASSES.CLOUD_ELEMENT);
            METAREFERENCES._METAREFERENCESVALUES = [
                METAREFERENCES.CHILDREN,
                METAREFERENCES.ELEMENT
            ];
            return METAREFERENCES;
        })();
        Node.METAREFERENCES = METAREFERENCES;
        var METAOPERATIONS = (function () {
            function METAOPERATIONS(name, index) {
                this._name = name;
                this._index = index;
            }
            METAOPERATIONS.prototype.index = function () {
                return this._index;
            };
            METAOPERATIONS.prototype.metaName = function () {
                return this._name;
            };
            METAOPERATIONS.prototype.origin = function () {
                return cloud.CloudView.METACLASSES.CLOUD_NODE;
            };
            METAOPERATIONS.prototype.equals = function (other) {
                return this == other;
            };
            METAOPERATIONS.values = function () {
                return METAOPERATIONS._METAOPERATIONSVALUES;
            };
            METAOPERATIONS._METAOPERATIONSVALUES = [
            ];
            return METAOPERATIONS;
        })();
        Node.METAOPERATIONS = METAOPERATIONS;
    })(Node = cloud.Node || (cloud.Node = {}));
})(cloud || (cloud = {}));
