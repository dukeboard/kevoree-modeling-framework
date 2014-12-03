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
