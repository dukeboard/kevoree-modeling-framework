<<<<<<< Local Changes
=======
/*  Prototype JavaScript framework, version 1.6.1
 *  (c) 2005-2009 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
 *--------------------------------------------------------------------------*/
var Kotlin = {};

(function () {
    "use strict";
    var emptyFunction = function () {
    };

    if (!Array.isArray) {
        Array.isArray = function (vArg) {
            return Object.prototype.toString.call(vArg) === "[object Array]";
        };
    }

    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {
                },
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis
                                             ? this
                                             : oThis,
                                         aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }

    Kotlin.keys = Object.keys || function (o) {
        var result = [];
        var i = 0;
        for (var p in o) {
            if (o.hasOwnProperty(p)) {
                result[i++] = p;
            }
        }
        return result;
    };

    function copyProperties(to, from) {
        for (var p in from) {
            if (from.hasOwnProperty(p)) {
                to[p] = from[p];
            }
        }
    }

    Kotlin.isType = function (object, klass) {
        if (object === null || object === undefined) {
            return false;
        }

        var current = object.get_class();
        while (current !== klass) {
            if (current === null || current === undefined) {
                return false;
            }
            current = current.superclass;
        }
        return true;
    };

    Kotlin.createTrait = function () {
        var n = arguments.length - 1;
        var result = arguments[n] || {};
        for (var i = 0; i < n; i++) {
            copyProperties(result, arguments[i]);
        }
        return result;
    };

    Kotlin.definePackage = function (members) {
        return members === null ? {} : members;
    };

    Kotlin.createClass = (function () {
        function subclass() {
        }

        function create(parent, properties, staticProperties) {
            var traits = null;
            if (parent instanceof Array) {
                traits = parent;
                parent = parent[0];
            }

            function klass() {
                this.initializing = klass;
                if (this.initialize) {
                    this.initialize.apply(this, arguments);
                }
            }

            klass.addMethods = addMethods;
            klass.superclass = parent || null;
            klass.subclasses = [];
            klass.object$ = object$;

            if (parent) {
                if (typeof (parent) == "function") {
                    subclass.prototype = parent.prototype;
                    klass.prototype = new subclass();
                    parent.subclasses.push(klass);
                }
                else {
                    // trait
                    klass.addMethods(parent);
                }
            }

            klass.addMethods({get_class: function () {
                return klass;
            }});

            if (parent !== null) {
                klass.addMethods({super_init: function () {
                    this.initializing = this.initializing.superclass;
                    this.initializing.prototype.initialize.apply(this, arguments);
                }});
            }

            if (traits !== null) {
                for (var i = 1, n = traits.length; i < n; i++) {
                    klass.addMethods(traits[i]);
                }
            }
            if (properties !== null && properties !== undefined) {
                klass.addMethods(properties);
            }

            if (!klass.prototype.initialize) {
                klass.prototype.initialize = emptyFunction;
            }

            klass.prototype.constructor = klass;
            if (staticProperties !== null && staticProperties !== undefined) {
                copyProperties(klass, staticProperties);
            }
            return klass;
        }

        function addMethods(source) {
            copyProperties(this.prototype, source);
            return this;
        }

        function object$() {
            if (typeof this.$object$ === "undefined") {
                this.$object$ = this.object_initializer$();
            }

            return this.$object$;
        }

        return create;
    })();

    Kotlin.$createClass = function (parent, properties) {
        if (parent !== null && typeof (parent) != "function") {
            properties = parent;
            parent = null;
        }
        return Kotlin.createClass(parent, properties, null);
    };

    Kotlin.createObjectWithPrototype = function (prototype) {
        function C() {}
        C.prototype = prototype;
        return new C();
    };

    Kotlin.$new = function (f) {
        var o = Kotlin.createObjectWithPrototype(f.prototype);
        return function () {
            f.apply(o, arguments);
            return o;
        };
    };

    Kotlin.createObject = function () {
        var singletonClass = Kotlin.createClass.apply(null, arguments);
        return new singletonClass();
    };

    Kotlin.defineModule = function (id, module) {
        if (id in Kotlin.modules) {
            throw Kotlin.$new(Kotlin.IllegalArgumentException)();
        }

        Kotlin.modules[id] = module;
    };
})();
/**
 * Copyright 2010 Tim Down.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

// todo inlined
String.prototype.startsWith = function (s) {
  return this.indexOf(s) === 0;
};

String.prototype.endsWith = function (s) {
  return this.indexOf(s, this.length - s.length) !== -1;
};

String.prototype.contains = function (s) {
  return this.indexOf(s) !== -1;
};

(function () {
    Kotlin.equals = function (obj1, obj2) {
        if (obj1 == null) {
            return obj2 == null;
        }

        if (Array.isArray(obj1)) {
            return Kotlin.arrayEquals(obj1, obj2);
        }

        if (typeof obj1 == "object" && obj1.equals !== undefined) {
            return obj1.equals(obj2);
        }

        return obj1 === obj2;
    };

    Kotlin.toString = function (o) {
        if (o == null) {
            return "null";
        }
        else if (Array.isArray(o)) {
            return Kotlin.arrayToString(o);
        }
        else {
            return o.toString();
        }
    };
    
    Kotlin.arrayToString = function(a) {
        return "[" + a.join(", ") + "]";
    };

    Kotlin.intUpto = function (from, to) {
        return Kotlin.$new(Kotlin.NumberRange)(from, to);
    };

    Kotlin.intDownto = function (from, to) {
        return Kotlin.$new(Kotlin.Progression)(from, to, -1);
    };

    Kotlin.modules = {};

    Kotlin.RuntimeException = Kotlin.$createClass();
    Kotlin.NullPointerException = Kotlin.$createClass();
    Kotlin.NoSuchElementException = Kotlin.$createClass();
    Kotlin.IllegalArgumentException = Kotlin.$createClass();
    Kotlin.IllegalStateException = Kotlin.$createClass();
    Kotlin.UnsupportedOperationException = Kotlin.$createClass();
    Kotlin.IOException = Kotlin.$createClass();

    Kotlin.throwNPE = function () {
        throw Kotlin.$new(Kotlin.NullPointerException)();
    };

    function throwAbstractFunctionInvocationError(funName) {
        return function() {
            var message;
            if (funName !== undefined) {
                message = "Function " + funName + " is abstract";
            } else {
                message = "Function is abstract";
            }
            throw new TypeError(message);
        };
    }

    Kotlin.Iterator = Kotlin.$createClass({
        initialize: function () {
        },
        next: throwAbstractFunctionInvocationError("Iterator#next"),
        hasNext: throwAbstractFunctionInvocationError("Iterator#hasNext")
    });

    var ArrayIterator = Kotlin.$createClass(Kotlin.Iterator, {
        initialize: function (array) {
            this.array = array;
            this.size = array.length;
            this.index = 0;
        },
        next: function () {
            return this.array[this.index++];
        },
        hasNext: function () {
            return this.index < this.size;
        }
    });

    var ListIterator = Kotlin.$createClass(ArrayIterator, {
        initialize: function (list) {
            this.list = list;
            this.size = list.size();
            this.index = 0;
        },
        next: function () {
            return this.list.get(this.index++);
        }
    });

    Kotlin.Collection = Kotlin.$createClass();

    Kotlin.Enum = Kotlin.$createClass(null, {
        initialize: function () {
            this.name$ = undefined;
            this.ordinal$ = undefined;
        },
        name: function () {
            return this.name$;
        },
        ordinal: function () {
            return this.ordinal$;
        },
        toString: function () {
            return this.name();
        }
    });
    (function (){
        function valueOf(name) {
            return this[name];
        }
        function getValues() {
            return this.values$;
        }

        Kotlin.createEnumEntries = function(enumEntryList) {
            var i = 0;
            var values = [];
            for (var entryName in enumEntryList) {
                if (enumEntryList.hasOwnProperty(entryName)) {
                    var entryObject = enumEntryList[entryName];
                    values[i] = entryObject;
                    entryObject.ordinal$ = i;
                    entryObject.name$ = entryName;
                    i++;
                }
            }
            enumEntryList.values$ = values;
            enumEntryList.valueOf = valueOf;
            enumEntryList.values = getValues;
            return enumEntryList;
        };
    })();

    Kotlin.AbstractCollection = Kotlin.$createClass(Kotlin.Collection, {
        size: function () {
            return this.$size;
        },
        addAll: function (collection) {
            var it = collection.iterator();
            var i = this.size();
            while (i-- > 0) {
                this.add(it.next());
            }
        },
        isEmpty: function () {
            return this.size() === 0;
        },
        iterator: function () {
            return Kotlin.$new(ArrayIterator)(this.toArray());
        },
        equals: function (o) {
            if (this.size() !== o.size()) return false;

            var iterator1 = this.iterator();
            var iterator2 = o.iterator();
            var i = this.size();
            while (i-- > 0) {
                if (!Kotlin.equals(iterator1.next(), iterator2.next())) {
                    return false;
                }
            }

            return true;
        },
        toString: function () {
            var builder = "[";
            var iterator = this.iterator();
            var first = true;
            var i = this.$size;
            while (i-- > 0) {
                if (first) {
                    first = false;
                }
                else {
                    builder += ", ";
                }
                builder += iterator.next();
            }
            builder += "]";
            return builder;
        },
        toJSON: function () {
            return this.toArray();
        }
    });

    Kotlin.AbstractList = Kotlin.$createClass(Kotlin.AbstractCollection, {
        iterator: function () {
            return Kotlin.$new(ListIterator)(this);
        },
        remove: function (o) {
            var index = this.indexOf(o);
            if (index !== -1) {
                this.removeAt(index);
            }
        },
        contains: function (o) {
            return this.indexOf(o) !== -1;
        }
    });

    //TODO: should be JS Array-like (https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Predefined_Core_Objects#Working_with_Array-like_objects)
    Kotlin.ArrayList = Kotlin.$createClass(Kotlin.AbstractList, {
        initialize: function () {
            this.array = [];
            this.$size = 0;
        },
        get: function (index) {
            this.checkRange(index);
            return this.array[index];
        },
        set: function (index, value) {
            this.checkRange(index);
            this.array[index] = value;
        },
        size: function () {
            return this.$size;
        },
        iterator: function () {
            return Kotlin.arrayIterator(this.array);
        },
        add: function (element) {
            this.array[this.$size++] = element;
        },
        addAt: function (index, element) {
            this.array.splice(index, 0, element);
            this.$size++;
        },
        addAll: function (collection) {
            var it = collection.iterator();
            for (var i = this.$size, n = collection.size(); n-- > 0;) {
                this.array[i++] = it.next();
            }

            this.$size += collection.size();
        },
        removeAt: function (index) {
            this.checkRange(index);
            this.$size--;
            return this.array.splice(index, 1)[0];
        },
        clear: function () {
            this.array.length = 0;
            this.$size = 0;
        },
        indexOf: function (o) {
            for (var i = 0, n = this.$size; i < n; ++i) {
                if (Kotlin.equals(this.array[i], o)) {
                    return i;
                }
            }
            return -1;
        },
        toArray: function () {
            return this.array.slice(0, this.$size);
        },
        toString: function () {
            return "[" + this.array.join(", ") + "]";
        },
        toJSON: function () {
            return this.array;
        },
        checkRange: function(index) {
            if (index < 0 || index >= this.$size) {
                throw new RangeError();
            }
        }
    });

    Kotlin.Runnable = Kotlin.$createClass({
        initialize: function () {
        },
        run: throwAbstractFunctionInvocationError("Runnable#run")
    });

    Kotlin.Comparable = Kotlin.$createClass({
        initialize: function () {
        },
        compareTo: throwAbstractFunctionInvocationError("Comparable#compareTo")
    });

    Kotlin.Appendable = Kotlin.$createClass({
        initialize: function () {
        },
        append: throwAbstractFunctionInvocationError("Appendable#append")
    });

    Kotlin.Closeable = Kotlin.$createClass({
        initialize: function () {
        },
        close: throwAbstractFunctionInvocationError("Closeable#close")
    });

    Kotlin.safeParseInt = function(str) {
        var r = parseInt(str, 10);
        return isNaN(r) ? null : r;
    };

    Kotlin.safeParseDouble = function(str) {
        var r = parseFloat(str);
        return isNaN(r) ? null : r;
    };

    Kotlin.arrayEquals = function (a, b) {
        if (a === b) {
            return true;
        }
        if (!Array.isArray(b) || a.length !== b.length) {
            return false;
        }

        for (var i = 0, n = a.length; i < n; i++) {
            if (!Kotlin.equals(a[i], b[i])) {
                return false;
            }
        }
        return true;
    };

    Kotlin.System = function () {
        var output = "";

        var print = function (obj) {
            if (obj !== undefined) {
                if (obj === null || typeof obj !== "object") {
                    output += obj;
                }
                else {
                    output += obj.toString();
                }
            }
        };
        var println = function (obj) {
            this.print(obj);
            output += "\n";
        };

        return {
            out: function () {
                return {
                    print: print,
                    println: println
                };
            },
            output: function () {
                return output;
            },
            flush: function () {
                output = "";
            }
        };
    }();

    Kotlin.println = function (s) {
        Kotlin.System.out().println(s);
    };

    Kotlin.print = function (s) {
        Kotlin.System.out().print(s);
    };

    Kotlin.RangeIterator = Kotlin.$createClass(Kotlin.Iterator, {
        initialize: function (start, end, increment) {
            this.$start = start;
            this.$end = end;
            this.$increment = increment;
            this.$i = start;
        },
        get_start: function () {
            return this.$start;
        },
        get_end: function () {
            return this.$end;
        },
        get_i: function () {
            return this.$i;
        },
        set_i: function (tmp$0) {
            this.$i = tmp$0;
        },
        next: function () {
            var value = this.$i;
            this.set_i(this.$i + this.$increment);
            return value;
        },
        hasNext: function () {
            return this.get_count() > 0;
        }
    });

    Kotlin.NumberRange = Kotlin.$createClass({
        initialize: function (start, end) {
            this.$start = start;
            this.$end = end;
        },
        get_start: function () {
            return this.$start;
        },
        get_end: function () {
            return this.$end;
        },
        get_increment: function () {
            return 1;
        },
        contains: function (number) {
            return this.$start <= number && number <= this.$end;
        },
        iterator: function () {
            return Kotlin.$new(Kotlin.RangeIterator)(this.get_start(), this.get_end());
        }
    });

    Kotlin.Progression = Kotlin.$createClass({
        initialize: function (start, end, increment) {
            this.$start = start;
            this.$end = end;
            this.$increment = increment;
        },
        get_start: function () {
            return this.$start;
        },
        get_end: function () {
            return this.$end;
        },
        get_increment: function () {
            return this.$increment;
        },
        iterator: function () {
            return Kotlin.$new(Kotlin.RangeIterator)(this.get_start(), this.get_end(), this.get_increment());
        }
    });

    Kotlin.Comparator = Kotlin.$createClass({
        initialize: function () {
        },
        compare: throwAbstractFunctionInvocationError("Comparator#compare")
    });

    var ComparatorImpl = Kotlin.$createClass(Kotlin.Comparator, {
        initialize: function (comparator) {
            this.compare = comparator;
        }
    });

    Kotlin.comparator = function (f) {
        return Kotlin.$new(ComparatorImpl)(f);
    };

    Kotlin.collectionsMax = function (c, comp) {
        if (c.isEmpty()) {
            //TODO: which exception?
            throw new Error();
        }
        var it = c.iterator();
        var max = it.next();
        while (it.hasNext()) {
            var el = it.next();
            if (comp.compare(max, el) < 0) {
                max = el;
            }
        }
        return max;
    };

    Kotlin.collectionsSort = function (mutableList, comparator) {
        var boundComparator = undefined;
        if (comparator !== undefined) {
            boundComparator = comparator.compare.bind(comparator);
        }

        if (mutableList instanceof Array) {
            mutableList.sort(boundComparator);
        }

        //TODO: should be deleted when List will be JS Array-like (https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Predefined_Core_Objects#Working_with_Array-like_objects)
        var array = [];
        var it = mutableList.iterator();
        while (it.hasNext()) {
            array.push(it.next());
        }

        array.sort(boundComparator);

        for (var i = 0, n = array.length; i < n; i++) {
            mutableList.set(i, array[i]);
        }
    };


    Kotlin.StringBuilder = Kotlin.$createClass(
            {
                initialize:function () {
                    this.string = "";
                },
                append:function (obj) {
                    this.string = this.string + obj.toString();
                },
                toString:function () {
                    return this.string;
                }
            }
    );

    Kotlin.splitString = function (str, regex, limit) {
        return str.split(new RegExp(regex), limit);
    };

    Kotlin.nullArray = function (size) {
        var res = [];
        var i = size;
        while (i > 0) {
            res[--i] = null;
        }
        return res;
    };

    Kotlin.numberArrayOfSize = function (size) {
        return Kotlin.arrayFromFun(size, function(){ return 0; });
    };

    Kotlin.charArrayOfSize = function (size) {
        return Kotlin.arrayFromFun(size, function(){ return '\0'; });
    };

    Kotlin.booleanArrayOfSize = function (size) {
        return Kotlin.arrayFromFun(size, function(){ return false; });
    };

    Kotlin.arrayFromFun = function (size, initFun) {
        var result = new Array(size);
        for (var i = 0; i < size; i++) {
            result[i] = initFun(i);
        }
        return result;
    };

    Kotlin.arrayIndices = function (arr) {
        return Kotlin.$new(Kotlin.NumberRange)(0, arr.length - 1);
    };

    Kotlin.arrayIterator = function (array) {
        return Kotlin.$new(ArrayIterator)(array);
    };

    Kotlin.jsonFromTuples = function (pairArr) {
        var i = pairArr.length;
        var res = {};
        while (i > 0) {
            --i;
            res[pairArr[i][0]] = pairArr[i][1];
        }
        return res;
    };

    Kotlin.jsonAddProperties = function (obj1, obj2) {
        for (var p in obj2) {
            if (obj2.hasOwnProperty(p)) {
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    };
})();

Kotlin.assignOwner = function(f, o) {
  f.o = o;
  return f;
};
/*
 * Copyright 2010-2013 JetBrains s.r.o.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";
(function () {
    var FUNCTION = "function";
    var arrayRemoveAt = (typeof Array.prototype.splice == FUNCTION) ?
                        function (arr, idx) {
                            arr.splice(idx, 1);
                        } :

                        function (arr, idx) {
                            var itemsAfterDeleted, i, len;
                            if (idx === arr.length - 1) {
                                arr.length = idx;
                            }
                            else {
                                itemsAfterDeleted = arr.slice(idx + 1);
                                arr.length = idx;
                                for (i = 0, len = itemsAfterDeleted.length; i < len; ++i) {
                                    arr[idx + i] = itemsAfterDeleted[i];
                                }
                            }
                        };

    function hashObject(obj) {
        var hashCode;
        if (typeof obj == "string") {
            return obj;
        }
        else if (typeof obj.hashCode == FUNCTION) {
            // Check the hashCode method really has returned a string
            hashCode = obj.hashCode();
            return (typeof hashCode == "string") ? hashCode : hashObject(hashCode);
        }
        else if (typeof obj.toString == FUNCTION) {
            return obj.toString();
        }
        else {
            try {
                return String(obj);
            }
            catch (ex) {
                // For host objects (such as ActiveObjects in IE) that have no toString() method and throw an error when
                // passed to String()
                return Object.prototype.toString.call(obj);
            }
        }
    }

    function equals_fixedValueHasEquals(fixedValue, variableValue) {
        return fixedValue.equals(variableValue);
    }

    function equals_fixedValueNoEquals(fixedValue, variableValue) {
        return (typeof variableValue.equals == FUNCTION) ?
               variableValue.equals(fixedValue) : (fixedValue === variableValue);
    }

    function createKeyValCheck(kvStr) {
        return function (kv) {
            if (kv === null) {
                throw new Error("null is not a valid " + kvStr);
            }
            else if (typeof kv == "undefined") {
                throw new Error(kvStr + " must not be undefined");
            }
        };
    }

    var checkKey = createKeyValCheck("key"), checkValue = createKeyValCheck("value");

    function Bucket(hash, firstKey, firstValue, equalityFunction) {
        this[0] = hash;
        this.entries = [];
        this.addEntry(firstKey, firstValue);

        if (equalityFunction !== null) {
            this.getEqualityFunction = function () {
                return equalityFunction;
            };
        }
    }

    var EXISTENCE = 0, ENTRY = 1, ENTRY_INDEX_AND_VALUE = 2;

    function createBucketSearcher(mode) {
        return function (key) {
            var i = this.entries.length, entry, equals = this.getEqualityFunction(key);
            while (i--) {
                entry = this.entries[i];
                if (equals(key, entry[0])) {
                    switch (mode) {
                        case EXISTENCE:
                            return true;
                        case ENTRY:
                            return entry;
                        case ENTRY_INDEX_AND_VALUE:
                            return [ i, entry[1] ];
                    }
                }
            }
            return false;
        };
    }

    function createBucketLister(entryProperty) {
        return function (aggregatedArr) {
            var startIndex = aggregatedArr.length;
            for (var i = 0, len = this.entries.length; i < len; ++i) {
                aggregatedArr[startIndex + i] = this.entries[i][entryProperty];
            }
        };
    }

    Bucket.prototype = {
        getEqualityFunction: function (searchValue) {
            return (typeof searchValue.equals == FUNCTION) ? equals_fixedValueHasEquals : equals_fixedValueNoEquals;
        },

        getEntryForKey: createBucketSearcher(ENTRY),

        getEntryAndIndexForKey: createBucketSearcher(ENTRY_INDEX_AND_VALUE),

        removeEntryForKey: function (key) {
            var result = this.getEntryAndIndexForKey(key);
            if (result) {
                arrayRemoveAt(this.entries, result[0]);
                return result[1];
            }
            return null;
        },

        addEntry: function (key, value) {
            this.entries[this.entries.length] = [key, value];
        },

        keys: createBucketLister(0),

        values: createBucketLister(1),

        getEntries: function (entries) {
            var startIndex = entries.length;
            for (var i = 0, len = this.entries.length; i < len; ++i) {
                // Clone the entry stored in the bucket before adding to array
                entries[startIndex + i] = this.entries[i].slice(0);
            }
        },

        containsKey: createBucketSearcher(EXISTENCE),

        containsValue: function (value) {
            var i = this.entries.length;
            while (i--) {
                if (value === this.entries[i][1]) {
                    return true;
                }
            }
            return false;
        }
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    // Supporting functions for searching hashtable buckets

    function searchBuckets(buckets, hash) {
        var i = buckets.length, bucket;
        while (i--) {
            bucket = buckets[i];
            if (hash === bucket[0]) {
                return i;
            }
        }
        return null;
    }

    function getBucketForHash(bucketsByHash, hash) {
        var bucket = bucketsByHash[hash];

        // Check that this is a genuine bucket and not something inherited from the bucketsByHash's prototype
        return ( bucket && (bucket instanceof Bucket) ) ? bucket : null;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    var Hashtable = function (hashingFunctionParam, equalityFunctionParam) {
        var that = this;
        var buckets = [];
        var bucketsByHash = {};

        var hashingFunction = (typeof hashingFunctionParam == FUNCTION) ? hashingFunctionParam : hashObject;
        var equalityFunction = (typeof equalityFunctionParam == FUNCTION) ? equalityFunctionParam : null;

        this.put = function (key, value) {
            checkKey(key);
            checkValue(value);
            var hash = hashingFunction(key), bucket, bucketEntry, oldValue = null;

            // Check if a bucket exists for the bucket key
            bucket = getBucketForHash(bucketsByHash, hash);
            if (bucket) {
                // Check this bucket to see if it already contains this key
                bucketEntry = bucket.getEntryForKey(key);
                if (bucketEntry) {
                    // This bucket entry is the current mapping of key to value, so replace old value and we're done.
                    oldValue = bucketEntry[1];
                    bucketEntry[1] = value;
                }
                else {
                    // The bucket does not contain an entry for this key, so add one
                    bucket.addEntry(key, value);
                }
            }
            else {
                // No bucket exists for the key, so create one and put our key/value mapping in
                bucket = new Bucket(hash, key, value, equalityFunction);
                buckets[buckets.length] = bucket;
                bucketsByHash[hash] = bucket;
            }
            return oldValue;
        };

        this.get = function (key) {
            checkKey(key);

            var hash = hashingFunction(key);

            // Check if a bucket exists for the bucket key
            var bucket = getBucketForHash(bucketsByHash, hash);
            if (bucket) {
                // Check this bucket to see if it contains this key
                var bucketEntry = bucket.getEntryForKey(key);
                if (bucketEntry) {
                    // This bucket entry is the current mapping of key to value, so return the value.
                    return bucketEntry[1];
                }
            }
            return null;
        };

        this.containsKey = function (key) {
            checkKey(key);
            var bucketKey = hashingFunction(key);

            // Check if a bucket exists for the bucket key
            var bucket = getBucketForHash(bucketsByHash, bucketKey);

            return bucket ? bucket.containsKey(key) : false;
        };

        this.containsValue = function (value) {
            checkValue(value);
            var i = buckets.length;
            while (i--) {
                if (buckets[i].containsValue(value)) {
                    return true;
                }
            }
            return false;
        };

        this.clear = function () {
            buckets.length = 0;
            bucketsByHash = {};
        };

        this.isEmpty = function () {
            return !buckets.length;
        };

        var createBucketAggregator = function (bucketFuncName) {
            return function () {
                var aggregated = [], i = buckets.length;
                while (i--) {
                    buckets[i][bucketFuncName](aggregated);
                }
                return aggregated;
            };
        };

        this._keys = createBucketAggregator("keys");
        this._values = createBucketAggregator("values");
        this._entries = createBucketAggregator("getEntries");

        this.values = function () {
            var values = this._values();
            var i = values.length;
            var result = Kotlin.$new(Kotlin.ArrayList)();
            while (i--) {
                result.add(values[i]);
            }
            return result;
        };

        this.remove = function (key) {
            checkKey(key);

            var hash = hashingFunction(key), bucketIndex, oldValue = null;

            // Check if a bucket exists for the bucket key
            var bucket = getBucketForHash(bucketsByHash, hash);

            if (bucket) {
                // Remove entry from this bucket for this key
                oldValue = bucket.removeEntryForKey(key);
                if (oldValue !== null) {
                    // Entry was removed, so check if bucket is empty
                    if (!bucket.entries.length) {
                        // Bucket is empty, so remove it from the bucket collections
                        bucketIndex = searchBuckets(buckets, hash);
                        arrayRemoveAt(buckets, bucketIndex);
                        delete bucketsByHash[hash];
                    }
                }
            }
            return oldValue;
        };

        this.size = function () {
            var total = 0, i = buckets.length;
            while (i--) {
                total += buckets[i].entries.length;
            }
            return total;
        };

        this.each = function (callback) {
            var entries = that._entries(), i = entries.length, entry;
            while (i--) {
                entry = entries[i];
                callback(entry[0], entry[1]);
            }
        };


        this.putAll = function (hashtable, conflictCallback) {
            var entries = hashtable._entries();
            var entry, key, value, thisValue, i = entries.length;
            var hasConflictCallback = (typeof conflictCallback == FUNCTION);
            while (i--) {
                entry = entries[i];
                key = entry[0];
                value = entry[1];

                // Check for a conflict. The default behaviour is to overwrite the value for an existing key
                if (hasConflictCallback && (thisValue = that.get(key))) {
                    value = conflictCallback(key, thisValue, value);
                }
                that.put(key, value);
            }
        };

        this.clone = function () {
            var clone = new Hashtable(hashingFunctionParam, equalityFunctionParam);
            clone.putAll(that);
            return clone;
        };

        this.keySet = function () {
            var res = Kotlin.$new(Kotlin.ComplexHashSet)();
            var keys = this._keys();
            var i = keys.length;
            while (i--) {
                res.add(keys[i]);
            }
            return res;
        };
    };


    Kotlin.HashTable = Hashtable;
})();

Kotlin.Map = Kotlin.$createClass();

Kotlin.HashMap = Kotlin.$createClass(Kotlin.Map, {initialize: function () {
    Kotlin.HashTable.call(this);
}});

Kotlin.ComplexHashMap = Kotlin.HashMap;

(function () {
    var PrimitiveHashMapValuesIterator = Kotlin.$createClass(Kotlin.Iterator, {
        initialize: function (map, keys) {
            this.map = map;
            this.keys = keys;
            this.size = keys.length;
            this.index = 0;
        },
        next: function () {
            return this.map[this.keys[this.index++]];
        },
        hasNext: function () {
            return this.index < this.size;
        }
    });

    var PrimitiveHashMapValues = Kotlin.$createClass(Kotlin.Collection, {
        initialize: function (map) {
            this.map = map;
        },
        iterator: function () {
            return Kotlin.$new(PrimitiveHashMapValuesIterator)(this.map.map, Kotlin.keys(this.map.map));
        },
        isEmpty: function () {
            return this.map.$size === 0;
        },
        contains: function (o) {
            return this.map.containsValue(o);
        }
    });

    Kotlin.PrimitiveHashMap = Kotlin.$createClass(Kotlin.Map, {
        initialize: function () {
            this.$size = 0;
            this.map = {};
        },
        size: function () {
            return this.$size;
        },
        isEmpty: function () {
            return this.$size === 0;
        },
        containsKey: function (key) {
            return this.map[key] !== undefined;
        },
        containsValue: function (value) {
            var map = this.map;
            for (var key in map) {
                if (map.hasOwnProperty(key) && map[key] === value) {
                    return true;
                }
            }

            return false;
        },
        get: function (key) {
            return this.map[key];
        },
        put: function (key, value) {
            var prevValue = this.map[key];
            this.map[key] = value === undefined ? null : value;
            if (prevValue === undefined) {
                this.$size++;
            }
            return prevValue;
        },
        remove: function (key) {
            var prevValue = this.map[key];
            if (prevValue !== undefined) {
                delete this.map[key];
                this.$size--;
            }
            return prevValue;
        },
        clear: function () {
            this.$size = 0;
            this.map = {};
        },
        putAll: function (fromMap) {
            var map = fromMap.map;
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    this.map[key] = map[key];
                    this.$size++;
                }
            }
        },
        keySet: function () {
            var result = Kotlin.$new(Kotlin.PrimitiveHashSet)();
            var map = this.map;
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    result.add(key);
                }
            }

            return result;
        },
        values: function () {
            return Kotlin.$new(PrimitiveHashMapValues)(this);
        },
        toJSON: function () {
            return this.map;
        }
    });
}());

Kotlin.Set = Kotlin.$createClass(Kotlin.Collection);

Kotlin.PrimitiveHashSet = Kotlin.$createClass(Kotlin.AbstractCollection, {
    initialize: function () {
        this.$size = 0;
        this.map = {};
    },
    contains: function (key) {
        return this.map[key] === true;
    },
    add: function (element) {
        var prevElement = this.map[element];
        this.map[element] = true;
        if (prevElement === true) {
            return false;
        }
        else {
            this.$size++;
            return true;
        }
    },
    remove: function (element) {
        if (this.map[element] === true) {
            delete this.map[element];
            this.$size--;
            return true;
        }
        else {
            return false;
        }
    },
    clear: function () {
        this.$size = 0;
        this.map = {};
    },
    toArray: function () {
        return Kotlin.keys(this.map);
    }
});

(function () {
    function HashSet(hashingFunction, equalityFunction) {
        var hashTable = new Kotlin.HashTable(hashingFunction, equalityFunction);

        this.add = function (o) {
            hashTable.put(o, true);
        };

        this.addAll = function (arr) {
            var i = arr.length;
            while (i--) {
                hashTable.put(arr[i], true);
            }
        };

        this.values = function () {
            return hashTable._keys();
        };

        this.iterator = function () {
            return Kotlin.arrayIterator(this.values());
        };

        this.remove = function (o) {
            return hashTable.remove(o) ? o : null;
        };

        this.contains = function (o) {
            return hashTable.containsKey(o);
        };

        this.clear = function () {
            hashTable.clear();
        };

        this.size = function () {
            return hashTable.size();
        };

        this.isEmpty = function () {
            return hashTable.isEmpty();
        };

        this.clone = function () {
            var h = new HashSet(hashingFunction, equalityFunction);
            h.addAll(hashTable.keys());
            return h;
        };

        this.equals = function (o) {
            if (o === null || o === undefined) return false;
            if (this.size() === o.size()) {
                var iter1 = this.iterator();
                var iter2 = o.iterator();
                while (true) {
                    var hn1 = iter1.hasNext();
                    var hn2 = iter2.hasNext();
                    if (hn1 != hn2) return false;
                    if (!hn2)
                        return true;
                    else {
                        var o1 = iter1.next();
                        var o2 = iter2.next();
                        if (!Kotlin.equals(o1, o2)) return false;
                    }
                }
            }
            return false;
        };

        this.toString = function() {
            var builder = "[";
            var iter = this.iterator();
            var first = true;
            while (iter.hasNext()) {
                if (first)
                    first = false;
                else
                    builder += ", ";
                builder += iter.next();
            }
            builder += "]";
            return builder;
        };

        this.intersection = function (hashSet) {
            var intersection = new HashSet(hashingFunction, equalityFunction);
            var values = hashSet.values(), i = values.length, val;
            while (i--) {
                val = values[i];
                if (hashTable.containsKey(val)) {
                    intersection.add(val);
                }
            }
            return intersection;
        };

        this.union = function (hashSet) {
            var union = this.clone();
            var values = hashSet.values(), i = values.length, val;
            while (i--) {
                val = values[i];
                if (!hashTable.containsKey(val)) {
                    union.add(val);
                }
            }
            return union;
        };

        this.isSubsetOf = function (hashSet) {
            var values = hashTable.keys(), i = values.length;
            while (i--) {
                if (!hashSet.contains(values[i])) {
                    return false;
                }
            }
            return true;
        };
    }

    Kotlin.HashSet = Kotlin.$createClass(Kotlin.Set, {initialize: function () {
        HashSet.call(this);
    }});

    Kotlin.ComplexHashSet = Kotlin.HashSet;
}());
(function () {
  'use strict';
  var classes = function () {
    var c0 = Kotlin.createTrait()
    , c1 = Kotlin.createTrait()
    , cc = Kotlin.createTrait()
    , c2 = Kotlin.createTrait(cc, /** @lends _.org.cloud.Cloud.prototype */ {
      get_generated_KMF_ID: function () {
        return this.$generated_KMF_ID;
      },
      set_generated_KMF_ID: function (tmp$0) {
        this.$generated_KMF_ID = tmp$0;
      },
      get_nodes: function () {
        return this.$nodes;
      },
      set_nodes: function (tmp$0) {
        this.$nodes = tmp$0;
      }
    })
    , cd = Kotlin.createTrait()
    , c3 = Kotlin.createTrait(cd)
    , c4 = Kotlin.createTrait(cc, /** @lends _.org.cloud.container.KMFContainerImpl.prototype */ {
      get_internal_eContainer: function () {
        return this.$internal_eContainer;
      },
      set_internal_eContainer: function (tmp$0) {
        this.$internal_eContainer = tmp$0;
      },
      get_internal_unsetCmd: function () {
        return this.$internal_unsetCmd;
      },
      set_internal_unsetCmd: function (tmp$0) {
        this.$internal_unsetCmd = tmp$0;
      },
      eContainer: function () {
        return this.get_internal_eContainer();
      },
      get_internal_containmentRefName: function () {
        return this.$internal_containmentRefName;
      },
      set_internal_containmentRefName: function (tmp$0) {
        this.$internal_containmentRefName = tmp$0;
      },
      get_internal_readOnlyElem: function () {
        return this.$internal_readOnlyElem;
      },
      set_internal_readOnlyElem: function (tmp$0) {
        this.$internal_readOnlyElem = tmp$0;
      },
      get_internal_recursive_readOnlyElem: function () {
        return this.$internal_recursive_readOnlyElem;
      },
      set_internal_recursive_readOnlyElem: function (tmp$0) {
        this.$internal_recursive_readOnlyElem = tmp$0;
      },
      setRecursiveReadOnly: function () {
        if (Kotlin.equals(this.get_internal_recursive_readOnlyElem(), true)) {
          return;
        }
        this.setInternalRecursiveReadOnly();
        var recVisitor = _.org.cloud.container.KMFContainerImpl.f0();
        this.visit(recVisitor, true, true, true);
        this.setInternalReadOnly();
      },
      setInternalReadOnly: function () {
        this.set_internal_readOnlyElem(true);
      },
      setInternalRecursiveReadOnly: function () {
        this.set_internal_recursive_readOnlyElem(true);
      },
      getRefInParent: function () {
        return this.get_internal_containmentRefName();
      },
      isReadOnly: function () {
        return this.get_internal_readOnlyElem();
      },
      isRecursiveReadOnly: function () {
        return this.get_internal_recursive_readOnlyElem();
      },
      setEContainer: function (container, unsetCmd, refNameInParent) {
        if (this.get_internal_readOnlyElem()) {
          return;
        }
        var tempUnsetCmd = this.get_internal_unsetCmd();
        this.set_internal_unsetCmd(null);
        if (tempUnsetCmd != null) {
          tempUnsetCmd.run();
        }
        this.set_internal_eContainer(container);
        this.set_internal_unsetCmd(unsetCmd);
        this.set_internal_containmentRefName(refNameInParent);
      },
      selectByQuery: function (query) {
        throw new Error('Not activated, please add selector option in KMF generation plugin');
      },
      get_internal_modelElementListeners: function () {
        return this.$internal_modelElementListeners;
      },
      set_internal_modelElementListeners: function (tmp$0) {
        this.$internal_modelElementListeners = tmp$0;
      },
      fireModelEvent: function (evt) {
        if (this.get_internal_modelElementListeners() != null) {
          var tmp$0;
          {
            var tmp$1 = ((tmp$0 = this.get_internal_modelElementListeners()) != null ? tmp$0 : Kotlin.throwNPE()).iterator();
            while (tmp$1.hasNext()) {
              var lst = tmp$1.next();
              lst.elementChanged(evt);
            }
          }
        }
        this.fireModelEventOnTree(evt);
      },
      addModelElementListener: function (lst) {
        if (this.get_internal_modelElementListeners() == null) {
          this.set_internal_modelElementListeners(new Kotlin.ArrayList(0));
        }
        var tmp$0;
        ((tmp$0 = this.get_internal_modelElementListeners()) != null ? tmp$0 : Kotlin.throwNPE()).add(lst);
      },
      removeModelElementListener: function (lst) {
        if (this.get_internal_modelElementListeners() != null) {
          var tmp$0, tmp$1;
          ((tmp$0 = this.get_internal_modelElementListeners()) != null ? tmp$0 : Kotlin.throwNPE()).remove(lst);
          if (((tmp$1 = this.get_internal_modelElementListeners()) != null ? tmp$1 : Kotlin.throwNPE()).isEmpty()) {
            this.set_internal_modelElementListeners(null);
          }
        }
      },
      removeAllModelElementListeners: function () {
        if (this.get_internal_modelElementListeners() != null) {
          var tmp$0;
          ((tmp$0 = this.get_internal_modelElementListeners()) != null ? tmp$0 : Kotlin.throwNPE()).clear();
          this.set_internal_modelElementListeners(null);
        }
      },
      get_internal_modelTreeListeners: function () {
        return this.$internal_modelTreeListeners;
      },
      set_internal_modelTreeListeners: function (tmp$0) {
        this.$internal_modelTreeListeners = tmp$0;
      },
      fireModelEventOnTree: function (evt) {
        if (this.get_internal_modelTreeListeners() != null) {
          var tmp$0;
          {
            var tmp$1 = ((tmp$0 = this.get_internal_modelTreeListeners()) != null ? tmp$0 : Kotlin.throwNPE()).iterator();
            while (tmp$1.hasNext()) {
              var lst = tmp$1.next();
              lst.elementChanged(evt);
            }
          }
        }
        if (this.eContainer() != null) {
          var tmp$2;
          ((tmp$2 = this.eContainer()) != null ? tmp$2 : Kotlin.throwNPE()).fireModelEventOnTree(evt);
        }
      },
      addModelTreeListener: function (lst) {
        if (this.get_internal_modelTreeListeners() == null) {
          this.set_internal_modelTreeListeners(new Kotlin.ArrayList(0));
        }
        var tmp$0;
        ((tmp$0 = this.get_internal_modelTreeListeners()) != null ? tmp$0 : Kotlin.throwNPE()).add(lst);
      },
      removeModelTreeListener: function (lst) {
        if (this.get_internal_modelTreeListeners() != null) {
          var tmp$0, tmp$1;
          ((tmp$0 = this.get_internal_modelTreeListeners()) != null ? tmp$0 : Kotlin.throwNPE()).remove(lst);
          if (((tmp$1 = this.get_internal_modelTreeListeners()) != null ? tmp$1 : Kotlin.throwNPE()).isEmpty()) {
            this.set_internal_modelTreeListeners(null);
          }
        }
      },
      removeAllModelTreeListeners: function () {
        if (this.get_internal_modelTreeListeners() != null) {
          var tmp$0;
          ((tmp$0 = this.get_internal_modelTreeListeners()) != null ? tmp$0 : Kotlin.throwNPE()).clear();
          this.set_internal_modelElementListeners(null);
        }
      },
      visit: function (visitor, recursive, containedReference, nonContainedReference) {
      },
      visit_0: function (visitor) {
      },
      internal_visit: function (visitor, internalElem, recursive, containedReference, nonContainedReference, refName) {
        if (internalElem != null) {
          if (nonContainedReference) {
            var tmp$0;
            var elemPath = (tmp$0 = internalElem.path()) != null ? tmp$0 : Kotlin.throwNPE();
            if (visitor.get_alreadyVisited().containsKey(elemPath)) {
              return;
            }
            visitor.get_alreadyVisited().put(elemPath, internalElem);
          }
          visitor.visit(internalElem, refName, this);
          if (!visitor.get_visitStopped()) {
            if (recursive && visitor.get_visitChildren()) {
              internalElem.visit(visitor, recursive, containedReference, nonContainedReference);
            }
            visitor.set_visitChildren(true);
          }
        }
      },
      path: function () {
        var container = this.eContainer();
        if (container != null) {
          var parentPath = container.path();
          if (parentPath == null) {
            return null;
          }
           else {
            var tmp$0;
            if (Kotlin.equals(parentPath, '')) {
              tmp$0 = '';
            }
             else {
              tmp$0 = parentPath + '/';
            }
            return tmp$0 + this.get_internal_containmentRefName() + '[' + this.internalGetKey() + ']';
          }
        }
         else {
          return '';
        }
      }
    }, /** @lends _.org.cloud.container.KMFContainerImpl */ {
      f0: function () {
        return Kotlin.createObject(_.org.kevoree.modeling.api.util.ModelVisitor, {
          initialize: function () {
            this.super_init();
          },
          visit: function (elem, refNameInParent, parent) {
            if (elem.isRecursiveReadOnly()) {
              this.noChildrenVisit();
            }
             else {
              (elem != null ? elem : Kotlin.throwNPE()).setInternalRecursiveReadOnly();
              elem.setInternalReadOnly();
            }
          }
        });
      }
    })
    , c5 = Kotlin.createTrait(cc, /** @lends _.org.cloud.Node.prototype */ {
      get_id: function () {
        return this.$id;
      },
      set_id: function (tmp$0) {
        this.$id = tmp$0;
      },
      get_softwares: function () {
        return this.$softwares;
      },
      set_softwares: function (tmp$0) {
        this.$softwares = tmp$0;
      }
    })
    , c6 = Kotlin.createTrait(cc, /** @lends _.org.cloud.Software.prototype */ {
      get_name: function () {
        return this.$name;
      },
      set_name: function (tmp$0) {
        this.$name = tmp$0;
      }
    })
    , c7 = Kotlin.createTrait()
    , c8 = Kotlin.createTrait()
    , c9 = Kotlin.createTrait(c8)
    , cf = Kotlin.createTrait()
    , ca = Kotlin.createClass(cf, /** @lends _.org.kevoree.modeling.api.json.JSONModelLoader.prototype */ {
      initialize: function () {
        this.$factory = null;
      },
      get_factory: function () {
        return this.$factory;
      },
      set_factory: function (tmp$0) {
        this.$factory = tmp$0;
      },
      loadModelFromString: function (str) {
        var bytes = Kotlin.numberArrayOfSize(str.length);
        var i = 0;
        while (i < str.length) {
          var tmp$0;
          bytes[i] = (tmp$0 = str.charAt(i)) != null ? tmp$0 : Kotlin.throwNPE();
          i = i + 1;
        }
        return this.deserialize(new _.java.io.ByteArrayInputStream(bytes));
      },
      loadModelFromStream: function (inputStream) {
        return this.deserialize(inputStream);
      },
      deserialize: function (instream) {
        var resolverCommands = new Kotlin.ArrayList(0);
        var roots = new Kotlin.ArrayList(0);
        var lexer = new _.org.kevoree.modeling.api.json.Lexer(instream);
        var currentToken = lexer.nextToken();
        if (currentToken.get_tokenType() === _.org.kevoree.modeling.api.json.Type.get_LEFT_BRACE()) {
          this.loadObject(lexer, null, null, roots, resolverCommands);
        }
         else {
          throw new Error('Bad Format / {\xA0expected');
        }
        {
          var tmp$0 = resolverCommands.iterator();
          while (tmp$0.hasNext()) {
            var resol = tmp$0.next();
            resol.run();
          }
        }
        return roots;
      },
      loadObject: function (lexer, nameInParent, parent, roots, commands) {
        var currentToken = lexer.nextToken();
        var currentObject = null;
        if (currentToken.get_tokenType() === _.org.kevoree.modeling.api.json.Type.get_VALUE()) {
          if (Kotlin.equals(currentToken.get_value(), 'eClass')) {
            lexer.nextToken();
            currentToken = lexer.nextToken();
            var tmp$0, tmp$1;
            var name = (tmp$0 = Kotlin.toString(currentToken.get_value())) != null ? tmp$0 : Kotlin.throwNPE();
            currentObject = (tmp$1 = this.get_factory()) != null ? tmp$1.create(name) : null;
            if (parent == null) {
              roots.add(currentObject != null ? currentObject : Kotlin.throwNPE());
            }
            var currentNameAttOrRef = null;
            var refModel = false;
            currentToken = lexer.nextToken();
            while (currentToken.get_tokenType() !== _.org.kevoree.modeling.api.json.Type.get_EOF()) {
              if (currentToken.get_tokenType() === _.org.kevoree.modeling.api.json.Type.get_LEFT_BRACE()) {
                this.loadObject(lexer, currentNameAttOrRef != null ? currentNameAttOrRef : Kotlin.throwNPE(), currentObject, roots, commands);
              }
              if (currentToken.get_tokenType() === _.org.kevoree.modeling.api.json.Type.get_COMMA()) {
              }
              if (currentToken.get_tokenType() === _.org.kevoree.modeling.api.json.Type.get_VALUE()) {
                if (currentNameAttOrRef == null) {
                  currentNameAttOrRef = Kotlin.toString(currentToken.get_value());
                }
                 else {
                  if (refModel) {
                    var tmp$2;
                    commands.add(new _.org.kevoree.modeling.api.json.ResolveCommand(roots, Kotlin.toString((tmp$2 = currentToken.get_value()) != null ? tmp$2 : Kotlin.throwNPE()), currentObject != null ? currentObject : Kotlin.throwNPE(), currentNameAttOrRef != null ? currentNameAttOrRef : Kotlin.throwNPE()));
                  }
                   else {
                    (currentObject != null ? currentObject : Kotlin.throwNPE()).reflexiveMutator(_.org.kevoree.modeling.api.util.ActionType.get_SET(), currentNameAttOrRef != null ? currentNameAttOrRef : Kotlin.throwNPE(), currentToken.get_value(), false);
                    currentNameAttOrRef = null;
                  }
                }
              }
              if (currentToken.get_tokenType() === _.org.kevoree.modeling.api.json.Type.get_LEFT_BRACKET()) {
                currentToken = lexer.nextToken();
                if (currentToken.get_tokenType() === _.org.kevoree.modeling.api.json.Type.get_LEFT_BRACE()) {
                  this.loadObject(lexer, currentNameAttOrRef != null ? currentNameAttOrRef : Kotlin.throwNPE(), currentObject, roots, commands);
                }
                 else {
                  refModel = true;
                }
              }
              if (currentToken.get_tokenType() === _.org.kevoree.modeling.api.json.Type.get_RIGHT_BRACKET()) {
                currentNameAttOrRef = null;
                refModel = false;
              }
              if (currentToken.get_tokenType() === _.org.kevoree.modeling.api.json.Type.get_RIGHT_BRACE()) {
                if (parent != null) {
                  parent.reflexiveMutator(_.org.kevoree.modeling.api.util.ActionType.get_ADD(), nameInParent != null ? nameInParent : Kotlin.throwNPE(), currentObject, false);
                }
                return;
              }
              currentToken = lexer.nextToken();
            }
          }
           else {
            throw new Error('Bad Format / eClass att must be first');
          }
        }
         else {
          throw new Error('Bad Format');
        }
      }
    })
    , cg = Kotlin.createTrait()
    , cb = Kotlin.createClass(cg, /** @lends _.org.kevoree.modeling.api.json.JSONModelSerializer.prototype */ {
      initialize: function () {
      },
      serialize: function (model) {
        var outstream = new _.java.io.ByteArrayOutputStream();
        this.serialize_0(model, outstream);
        outstream.close();
        return outstream.toString();
      },
      serialize_0: function (model, raw) {
        var out = new _.java.io.PrintStream(raw);
        var internalReferenceVisitor = new _.org.kevoree.modeling.api.json.ModelReferenceVisitor(out);
        var masterVisitor = _.org.kevoree.modeling.api.json.JSONModelSerializer.f0(this, out, internalReferenceVisitor);
        model.visit(masterVisitor, true, true, false);
        out.flush();
      },
      printAttName: function (elem, out) {
        out.print('\n{"eClass":"' + elem.metaClassName() + '"');
        var attributeVisitor = _.org.kevoree.modeling.api.json.JSONModelSerializer.f1(out);
        elem.visit_0(attributeVisitor);
      }
    }, /** @lends _.org.kevoree.modeling.api.json.JSONModelSerializer */ {
      f0: function ($outer, out, internalReferenceVisitor) {
        return Kotlin.createObject(_.org.kevoree.modeling.api.util.ModelVisitor, {
          initialize: function () {
            this.super_init();
            this.$isFirstInRef = true;
          },
          get_isFirstInRef: function () {
            return this.$isFirstInRef;
          },
          set_isFirstInRef: function (tmp$0) {
            this.$isFirstInRef = tmp$0;
          },
          beginVisitElem: function (elem) {
            if (!this.get_isFirstInRef()) {
              out.print(',');
              this.set_isFirstInRef(false);
            }
            $outer.printAttName(elem, out);
            elem.visit(internalReferenceVisitor, false, false, true);
          },
          endVisitElem: function (elem) {
            out.println('}');
            this.set_isFirstInRef(false);
          },
          beginVisitRef: function (refName) {
            out.print(',"' + refName + '":[');
            this.set_isFirstInRef(true);
          },
          endVisitRef: function (refName) {
            out.print(']');
            this.set_isFirstInRef(false);
          },
          visit: function (elem, refNameInParent, parent) {
          }
        });
      },
      f1: function (out) {
        return Kotlin.createObject(_.org.kevoree.modeling.api.util.ModelAttributeVisitor, {
          initialize: function () {
          },
          visit: function (value, name, parent) {
            if (value != null) {
              out.print(',"' + name + '":"' + Kotlin.toString(value) + '"');
            }
          }
        });
      }
    })
    , ce = Kotlin.createTrait()
    , ch = Kotlin.createTrait()
    , ci = Kotlin.createTrait()
    , cj = Kotlin.createTrait(/** @lends _.org.kevoree.modeling.api.trace.TraceSequence.prototype */ {
      get_traces: function () {
        return this.$traces;
      },
      set_traces: function (tmp$0) {
        this.$traces = tmp$0;
      },
      get_factory: function () {
        return this.$factory;
      },
      set_factory: function (tmp$0) {
        this.$factory = tmp$0;
      },
      populate: function (addtraces) {
        this.get_traces().addAll(addtraces);
        return this;
      },
      populateFromString: function (addtracesTxt) {
        var bytes = Kotlin.numberArrayOfSize(addtracesTxt.length);
        var i = 0;
        while (i < addtracesTxt.length) {
          var tmp$0;
          bytes[i] = (tmp$0 = addtracesTxt.charAt(i)) != null ? tmp$0 : Kotlin.throwNPE();
          i = i + 1;
        }
        return this.populateFromStream(new _.java.io.ByteArrayInputStream(bytes));
      },
      populateFromStream: function (inputStream) {
        var lexer = new _.org.kevoree.modeling.api.json.Lexer(inputStream);
        var currentToken = lexer.nextToken();
        if (currentToken.get_tokenType() !== _.org.kevoree.modeling.api.json.Type.get_LEFT_BRACKET()) {
          throw new Error('Bad Format : expect [');
        }
        currentToken = lexer.nextToken();
        var keys = new Kotlin.PrimitiveHashMap(0);
        var previousName = null;
        while (currentToken.get_tokenType() !== _.org.kevoree.modeling.api.json.Type.get_EOF() && currentToken.get_tokenType() !== _.org.kevoree.modeling.api.json.Type.get_RIGHT_BRACKET()) {
          if (currentToken.get_tokenType() !== _.org.kevoree.modeling.api.json.Type.get_LEFT_BRACE()) {
            keys.clear();
          }
          if (currentToken.get_tokenType() !== _.org.kevoree.modeling.api.json.Type.get_VALUE()) {
            if (previousName != null) {
              keys.put(previousName != null ? previousName : Kotlin.throwNPE(), Kotlin.toString(currentToken.get_value()));
            }
             else {
              previousName = Kotlin.toString(currentToken.get_value());
            }
          }
          if (currentToken.get_tokenType() !== _.org.kevoree.modeling.api.json.Type.get_RIGHT_BRACE()) {
            var tmp$0;
            var tmp$1 = (tmp$0 = keys.get('traceType')) != null ? tmp$0 : Kotlin.throwNPE();
            if (tmp$1 === Kotlin.toString(_.org.kevoree.modeling.api.util.ActionType.get_SET())) {
              var tmp$2, tmp$3;
              this.get_traces().add(new _.org.kevoree.modeling.api.trace.ModelSetTrace((tmp$2 = keys.get('src')) != null ? tmp$2 : Kotlin.throwNPE(), (tmp$3 = keys.get('refname')) != null ? tmp$3 : Kotlin.throwNPE(), keys.get('objpath'), keys.get('content'), keys.get('typename')));
            }
             else if (tmp$1 === Kotlin.toString(_.org.kevoree.modeling.api.util.ActionType.get_ADD())) {
              var tmp$4, tmp$5, tmp$6;
              this.get_traces().add(new _.org.kevoree.modeling.api.trace.ModelAddTrace((tmp$4 = keys.get('src')) != null ? tmp$4 : Kotlin.throwNPE(), (tmp$5 = keys.get('refname')) != null ? tmp$5 : Kotlin.throwNPE(), (tmp$6 = keys.get('previouspath')) != null ? tmp$6 : Kotlin.throwNPE(), keys.get('typename')));
            }
             else if (tmp$1 === Kotlin.toString(_.org.kevoree.modeling.api.util.ActionType.get_ADD_ALL())) {
              var tmp$7, tmp$8, tmp$9, tmp$10, tmp$11, tmp$12;
              this.get_traces().add(new _.org.kevoree.modeling.api.trace.ModelAddAllTrace((tmp$7 = keys.get('src')) != null ? tmp$7 : Kotlin.throwNPE(), (tmp$8 = keys.get('refname')) != null ? tmp$8 : Kotlin.throwNPE(), (tmp$10 = (tmp$9 = keys.get('content')) != null ? Kotlin.splitString(tmp$9, ';') : null) != null ? _.kotlin.toList_8(tmp$10) : null, (tmp$12 = (tmp$11 = keys.get('typename')) != null ? Kotlin.splitString(tmp$11, ';') : null) != null ? _.kotlin.toList_8(tmp$12) : null));
            }
             else if (tmp$1 === Kotlin.toString(_.org.kevoree.modeling.api.util.ActionType.get_REMOVE())) {
              var tmp$13, tmp$14, tmp$15;
              this.get_traces().add(new _.org.kevoree.modeling.api.trace.ModelRemoveTrace((tmp$13 = keys.get('src')) != null ? tmp$13 : Kotlin.throwNPE(), (tmp$14 = keys.get('refname')) != null ? tmp$14 : Kotlin.throwNPE(), (tmp$15 = keys.get('objpath')) != null ? tmp$15 : Kotlin.throwNPE()));
            }
             else if (tmp$1 === Kotlin.toString(_.org.kevoree.modeling.api.util.ActionType.get_REMOVE_ALL())) {
              var tmp$16, tmp$17;
              this.get_traces().add(new _.org.kevoree.modeling.api.trace.ModelRemoveAllTrace((tmp$16 = keys.get('src')) != null ? tmp$16 : Kotlin.throwNPE(), (tmp$17 = keys.get('refname')) != null ? tmp$17 : Kotlin.throwNPE()));
            }
             else if (tmp$1 === Kotlin.toString(_.org.kevoree.modeling.api.util.ActionType.get_RENEW_INDEX())) {
            }
             else {
            }
          }
          currentToken = lexer.nextToken();
        }
        return this;
      },
      exportToString: function () {
        var buffer = new _.java.lang.StringBuilder();
        buffer.append('[');
        var isFirst = true;
        {
          var tmp$0 = this.get_traces().iterator();
          while (tmp$0.hasNext()) {
            var trace = tmp$0.next();
            if (!isFirst) {
              buffer.append(',');
            }
            buffer.append(trace.toString());
            isFirst = false;
          }
        }
        buffer.append(']');
        return buffer.toString();
      },
      applyOn: function (target) {
        var tmp$0;
        var traceApplicator = new _.org.kevoree.modeling.api.trace.ModelTraceApplicator(target, (tmp$0 = this.get_factory()) != null ? tmp$0 : Kotlin.throwNPE());
        traceApplicator.applyTraceOnModel(this);
        return true;
      }
    })
    , ck = Kotlin.createTrait()
    , cl = Kotlin.createClass(null, /** @lends _.org.kevoree.modeling.api.util.ModelVisitor.prototype */ {
      initialize: function () {
        this.$visitStopped = false;
        this.$visitChildren = true;
        this.$alreadyVisited = new Kotlin.PrimitiveHashMap(0);
      },
      get_visitStopped: function () {
        return this.$visitStopped;
      },
      set_visitStopped: function (tmp$0) {
        this.$visitStopped = tmp$0;
      },
      stopVisit: function () {
        this.set_visitStopped(true);
      },
      get_visitChildren: function () {
        return this.$visitChildren;
      },
      set_visitChildren: function (tmp$0) {
        this.$visitChildren = tmp$0;
      },
      noChildrenVisit: function () {
        this.set_visitChildren(true);
      },
      get_alreadyVisited: function () {
        return this.$alreadyVisited;
      },
      set_alreadyVisited: function (tmp$0) {
        this.$alreadyVisited = tmp$0;
      },
      beginVisitElem: function (elem) {
      },
      endVisitElem: function (elem) {
      },
      beginVisitRef: function (refName) {
      },
      endVisitRef: function (refName) {
      }
    })
    , cm = Kotlin.createTrait(/** @lends _.org.w3c.dom.events.EventListener.prototype */ {
      handleEvent: function (arg1) {
        noImpl;
      }
    })
    , cn = Kotlin.createTrait()
    , co = Kotlin.createClass(Kotlin.Iterator, /** @lends _.kotlin.support.AbstractIterator.prototype */ {
      initialize: function () {
        this.$state = _.kotlin.support.State.get_NotReady();
        this.$nextValue = null;
      },
      get_state: function () {
        return this.$state;
      },
      set_state: function (tmp$0) {
        this.$state = tmp$0;
      },
      get_nextValue: function () {
        return this.$nextValue;
      },
      set_nextValue: function (tmp$0) {
        this.$nextValue = tmp$0;
      },
      hasNext: function () {
        _.kotlin.require(this.get_state() !== _.kotlin.support.State.get_Failed(), 'Failed requirement');
        var tmp$0 = this.get_state(), tmp$1;
        if (tmp$0 === _.kotlin.support.State.get_Done())
          tmp$1 = false;
        else if (tmp$0 === _.kotlin.support.State.get_Ready())
          tmp$1 = true;
        else
          tmp$1 = this.tryToComputeNext();
        return tmp$1;
      },
      next: function () {
        if (!this.hasNext())
          throw new Kotlin.NoSuchElementException();
        this.set_state(_.kotlin.support.State.get_NotReady());
        var tmp$0;
        return (tmp$0 = this.get_nextValue()) != null ? tmp$0 : Kotlin.throwNPE();
      },
      peek: function () {
        if (!this.hasNext())
          throw new Kotlin.NoSuchElementException();
        var tmp$0;
        return (tmp$0 = this.get_nextValue()) != null ? tmp$0 : Kotlin.throwNPE();
      },
      tryToComputeNext: function () {
        this.set_state(_.kotlin.support.State.get_Failed());
        this.computeNext();
        return this.get_state() === _.kotlin.support.State.get_Ready();
      },
      setNext: function (value) {
        this.set_nextValue(value);
        this.set_state(_.kotlin.support.State.get_Ready());
      },
      done: function () {
        this.set_state(_.kotlin.support.State.get_Done());
      }
    });
    return {c0: c0, c1: c1, cc: cc, c2: c2, cd: cd, c3: c3, c4: c4, c5: c5, c6: c6, c7: c7, c8: c8, c9: c9, cf: cf, ca: ca, cg: cg, cb: cb, ce: ce, ch: ch, ci: ci, cj: cj, ck: ck, cl: cl, cm: cm, cn: cn, co: co};
  }()
  , _ = {
    kotlin: Kotlin.definePackage({
      hashMap: function (values) {
        var answer = new Kotlin.ComplexHashMap(0);
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = values, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var v = tmp$0[tmp$2];
            {
              answer.put(v.get_first(), v.get_second());
            }
          }
        }
        return answer;
      },
      toString: function ($receiver) {
        return _.kotlin.makeString($receiver, ', ', '[', ']', -1, '...');
      },
      arrayList: function (values) {
        var list = new Kotlin.ArrayList(0);
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = values, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var value = tmp$0[tmp$2];
            {
              list.add(value);
            }
          }
        }
        return list;
      },
      hashSet: function (values) {
        var list = new Kotlin.ComplexHashSet();
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = values, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var value = tmp$0[tmp$2];
            {
              list.add(value);
            }
          }
        }
        return list;
      },
      map: function ($receiver, transform) {
        return _.kotlin.mapTo($receiver, new Kotlin.ArrayList(0), transform);
      },
      mapValues: function ($receiver, transform) {
        return _.kotlin.mapValuesTo($receiver, new Kotlin.ComplexHashMap(0), transform);
      },
      Pair: Kotlin.createClass(null, /** @lends _.kotlin.Pair.prototype */ {
        initialize: function (first, second) {
          this.$first = first;
          this.$second = second;
        },
        get_first: function () {
          return this.$first;
        },
        get_second: function () {
          return this.$second;
        },
        component1: function () {
          return this.get_first();
        },
        component2: function () {
          return this.get_second();
        },
        toString: function () {
          return '(' + this.get_first().toString() + ', ' + this.get_second().toString() + ')';
        }
      }),
      Triple: Kotlin.createClass(null, /** @lends _.kotlin.Triple.prototype */ {
        initialize: function (first, second, third) {
          this.$first = first;
          this.$second = second;
          this.$third = third;
        },
        get_first: function () {
          return this.$first;
        },
        get_second: function () {
          return this.$second;
        },
        get_third: function () {
          return this.$third;
        },
        component1: function () {
          return this.get_first();
        },
        component2: function () {
          return this.get_second();
        },
        component3: function () {
          return this.get_third();
        },
        toString: function () {
          return '(' + this.get_first().toString() + ', ' + this.get_second().toString() + ', ' + this.get_third().toString() + ')';
        }
      }),
      all: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              return false;
          }
        }
        return true;
      },
      any: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return true;
          }
        }
        return false;
      },
      count: function ($receiver, predicate) {
        var count = 0;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              count++;
          }
        }
        return count;
      },
      find: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return element;
          }
        }
        return null;
      },
      filter: function ($receiver, predicate) {
        return _.kotlin.filterTo($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterTo: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      filterNot: function ($receiver, predicate) {
        return _.kotlin.filterNotTo($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterNotTo: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      partition: function ($receiver, predicate) {
        var first = new Kotlin.ArrayList(0);
        var second = new Kotlin.ArrayList(0);
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element)) {
              first.add(element);
            }
             else {
              second.add(element);
            }
          }
        }
        return new _.kotlin.Pair(first, second);
      },
      map_0: function ($receiver, transform) {
        return _.kotlin.mapTo_0($receiver, new Kotlin.ArrayList(0), transform);
      },
      mapTo_0: function ($receiver, result, transform) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var item = tmp$0.next();
            result.add(transform(item));
          }
        }
        return result;
      },
      flatMap: function ($receiver, transform) {
        return _.kotlin.flatMapTo($receiver, new Kotlin.ArrayList(0), transform);
      },
      flatMapTo: function ($receiver, result, transform) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var list = transform(element);
            {
              var tmp$1 = list.iterator();
              while (tmp$1.hasNext()) {
                var r = tmp$1.next();
                result.add(r);
              }
            }
          }
        }
        return result;
      },
      forEach: function ($receiver, operation) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            operation(element);
          }
        }
      },
      fold: function ($receiver, initial, operation) {
        var answer = initial;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer = operation(answer, element);
          }
        }
        return answer;
      },
      foldRight: function ($receiver, initial, operation) {
        var r = initial;
        var index = $receiver.length - 1;
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      reduce: function ($receiver, operation) {
        var iterator = Kotlin.arrayIterator($receiver);
        if (!iterator.hasNext()) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var result = iterator.next();
        while (iterator.hasNext()) {
          result = operation(result, iterator.next());
        }
        return result;
      },
      reduceRight: function ($receiver, operation) {
        var index = $receiver.length - 1;
        if (index < 0) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var r = $receiver[index--];
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      groupBy: function ($receiver, toKey) {
        return _.kotlin.groupByTo($receiver, new Kotlin.ComplexHashMap(0), toKey);
      },
      f0: function () {
        return new Kotlin.ArrayList(0);
      },
      groupByTo: function ($receiver, result, toKey) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var key = toKey(element);
            var list = _.kotlin.getOrPut(result, key, _.kotlin.f0);
            list.add(element);
          }
        }
        return result;
      },
      drop: function ($receiver, n) {
        return _.kotlin.dropWhile($receiver, _.kotlin.countTo(n));
      },
      dropWhile: function ($receiver, predicate) {
        return _.kotlin.dropWhileTo($receiver, new Kotlin.ArrayList(0), predicate);
      },
      dropWhileTo: function ($receiver, result, predicate) {
        var start = true;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (start && predicate(element)) {
            }
             else {
              start = false;
              result.add(element);
            }
          }
        }
        return result;
      },
      take: function ($receiver, n) {
        return _.kotlin.takeWhile($receiver, _.kotlin.countTo(n));
      },
      takeWhile: function ($receiver, predicate) {
        return _.kotlin.takeWhileTo($receiver, new Kotlin.ArrayList(0), predicate);
      },
      takeWhileTo: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
            else
              break;
          }
        }
        return result;
      },
      toCollection: function ($receiver, result) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            result.add(element);
          }
        }
        return result;
      },
      reverse: function ($receiver) {
        var list = _.kotlin.toCollection($receiver, new Kotlin.ArrayList(0));
        Kotlin.reverse(list);
        return list;
      },
      toLinkedList: function ($receiver) {
        return _.kotlin.toCollection($receiver, new Kotlin.LinkedList());
      },
      toList: function ($receiver) {
        return _.kotlin.toCollection($receiver, new Kotlin.ArrayList(0));
      },
      toSet: function ($receiver) {
        return _.kotlin.toCollection($receiver, new Kotlin.LinkedHashSet());
      },
      toSortedSet: function ($receiver) {
        return _.kotlin.toCollection($receiver, new Kotlin.TreeSet());
      },
      plus: function ($receiver, element) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection($receiver, answer);
        answer.add(element);
        return answer;
      },
      plus_0: function ($receiver, iterator) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection($receiver, answer);
        {
          var tmp$0 = iterator;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer.add(element);
          }
        }
        return answer;
      },
      plus_1: function ($receiver, collection) {
        return _.kotlin.plus_0($receiver, collection.iterator());
      },
      withIndices: function ($receiver) {
        return new _.kotlin.IndexIterator(Kotlin.arrayIterator($receiver));
      },
      f1: function (f, x, y) {
        var xr = f(x);
        var yr = f(y);
        return xr.compareTo(yr);
      },
      sortBy: function ($receiver, f) {
        var sortedList = _.kotlin.toCollection($receiver, new Kotlin.ArrayList(0));
        var sortBy = Kotlin.comparator(_.kotlin.f1.bind(null, f));
        Kotlin.collectionsSort(sortedList, sortBy);
        return sortedList;
      },
      appendString: function ($receiver, buffer, separator, prefix, postfix, limit, truncated) {
        buffer.append(prefix);
        var count = 0;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (++count > 1)
              buffer.append(separator);
            if (limit < 0 || count <= limit) {
              var text = element == null ? 'null' : Kotlin.toString(element);
              buffer.append(text);
            }
             else
              break;
          }
        }
        if (limit >= 0 && count > limit)
          buffer.append(truncated);
        buffer.append(postfix);
      },
      makeString_0: function ($receiver, separator, prefix, postfix, limit, truncated) {
        var buffer = new Kotlin.StringBuilder();
        _.kotlin.appendString($receiver, buffer, separator, prefix, postfix, limit, truncated);
        return buffer.toString();
      },
      test: Kotlin.definePackage({
        todo: function (block) {
          Kotlin.println('TODO at ' + block);
        },
        get_asserter: function () {
          return this.$asserter;
        },
        set_asserter: function (tmp$0) {
          this.$asserter = tmp$0;
        },
        QUnitAsserter: Kotlin.createClass(classes.cn, /** @lends _.kotlin.test.QUnitAsserter.prototype */ {
          initialize: function () {
          },
          assertTrue: function (message, actual) {
            ok(actual, message);
          },
          assertEquals: function (message, expected, actual) {
            ok(Kotlin.equals(expected, actual), message + '. Expected <' + expected.toString() + '> actual <' + actual.toString() + '>');
          },
          assertNotNull: function (message, actual) {
            ok(actual != null, message);
          },
          assertNull: function (message, actual) {
            ok(actual == null, message);
          },
          fail: function (message) {
            ok(false, message);
          }
        }),
        assertTrue: function (message, block) {
          var actual = block();
          _.kotlin.test.get_asserter().assertTrue(message, actual);
        },
        assertTrue_0: function (block) {
          _.kotlin.test.assertTrue(Kotlin.toString(block), block);
        },
        f0: function (block) {
          return !block();
        },
        assertNot: function (message, block) {
          _.kotlin.test.assertTrue(message, _.kotlin.test.f0.bind(null, block));
        },
        assertNot_0: function (block) {
          _.kotlin.test.assertNot(Kotlin.toString(block), block);
        },
        assertTrue_1: function (actual, message) {
          return _.kotlin.test.assertEquals(true, actual, message);
        },
        assertFalse: function (actual, message) {
          return _.kotlin.test.assertEquals(false, actual, message);
        },
        assertEquals: function (expected, actual, message) {
          _.kotlin.test.get_asserter().assertEquals(message, expected, actual);
        },
        assertNotNull: function (actual, message) {
          _.kotlin.test.get_asserter().assertNotNull(message, actual);
          return actual != null ? actual : Kotlin.throwNPE();
        },
        assertNotNull_0: function (actual, message, block) {
          _.kotlin.test.get_asserter().assertNotNull(message, actual);
          if (actual != null) {
            block(actual);
          }
        },
        assertNull: function (actual, message) {
          _.kotlin.test.get_asserter().assertNull(message, actual);
        },
        fail: function (message) {
          _.kotlin.test.get_asserter().fail(message);
        },
        expect: function (expected, block) {
          _.kotlin.test.expect_0(expected, Kotlin.toString(block), block);
        },
        expect_0: function (expected, message, block) {
          var actual = block();
          _.kotlin.test.assertEquals(expected, actual, message);
        },
        fails: function (block) {
          try {
            block();
            _.kotlin.test.get_asserter().fail('Expected an exception to be thrown');
            return null;
          }
           catch (e) {
            return e;
          }
        },
        Asserter: classes.cn
      }),
      dom: Kotlin.definePackage({
        createDocument: function () {
          return document.implementation.createDocument(null, null, null);
        },
        toXmlString: function ($receiver) {
          return $receiver.outerHTML;
        },
        toXmlString_0: function ($receiver, xmlDeclaration) {
          return $receiver.outerHTML;
        },
        eventHandler: function (handler) {
          return new _.kotlin.dom.EventListenerHandler(handler);
        },
        EventListenerHandler: Kotlin.createClass(classes.cm, /** @lends _.kotlin.dom.EventListenerHandler.prototype */ {
          initialize: function (handler) {
            this.$handler = handler;
          },
          get_handler: function () {
            return this.$handler;
          },
          handleEvent: function (e) {
            if (e != null) {
              this.get_handler()(e);
            }
          }
        }),
        f0: function (handler, e) {
          if (Kotlin.isType(e, MouseEvent)) {
            handler(e);
          }
        },
        mouseEventHandler: function (handler) {
          return _.kotlin.dom.eventHandler(_.kotlin.dom.f0.bind(null, handler));
        },
        on: function ($receiver, name, capture, handler) {
          return _.kotlin.dom.on_0($receiver, name, capture, _.kotlin.dom.eventHandler(handler));
        },
        on_0: function ($receiver, name, capture, listener) {
          var tmp$0;
          if (Kotlin.isType($receiver, EventTarget)) {
            addEventListener(name, listener, capture);
            tmp$0 = new _.kotlin.dom.CloseableEventListener($receiver, listener, name, capture);
          }
           else {
            tmp$0 = null;
          }
          return tmp$0;
        },
        CloseableEventListener: Kotlin.createClass(Kotlin.Closeable, /** @lends _.kotlin.dom.CloseableEventListener.prototype */ {
          initialize: function (target, listener, name, capture) {
            this.$target = target;
            this.$listener = listener;
            this.$name = name;
            this.$capture = capture;
          },
          get_target: function () {
            return this.$target;
          },
          get_listener: function () {
            return this.$listener;
          },
          get_name: function () {
            return this.$name;
          },
          get_capture: function () {
            return this.$capture;
          },
          close: function () {
            this.get_target().removeEventListener(this.get_name(), this.get_listener(), this.get_capture());
          }
        }),
        onClick: function ($receiver, capture, handler) {
          return _.kotlin.dom.on_0($receiver, 'click', capture, _.kotlin.dom.mouseEventHandler(handler));
        },
        onDoubleClick: function ($receiver, capture, handler) {
          return _.kotlin.dom.on_0($receiver, 'dblclick', capture, _.kotlin.dom.mouseEventHandler(handler));
        },
        emptyElementList: function () {
          return Kotlin.emptyList();
        },
        emptyNodeList: function () {
          return Kotlin.emptyList();
        },
        get_text: function ($receiver) {
          return $receiver.textContent;
        },
        set_text: function ($receiver, value) {
          $receiver.textContent = value;
        },
        get_childrenText: function ($receiver) {
          var buffer = new Kotlin.StringBuilder();
          var nodeList = $receiver.childNodes;
          var i = 0;
          var size = nodeList.length;
          while (i < size) {
            var node = nodeList.item(i);
            if (node != null) {
              if (_.kotlin.dom.isText(node)) {
                buffer.append(node.nodeValue);
              }
            }
            i++;
          }
          return buffer.toString();
        },
        set_childrenText: function ($receiver, value) {
          var element = $receiver;
          {
            var tmp$0 = _.kotlin.dom.children(element).iterator();
            while (tmp$0.hasNext()) {
              var node = tmp$0.next();
              if (_.kotlin.dom.isText(node)) {
                $receiver.removeChild(node);
              }
            }
          }
          _.kotlin.dom.addText(element, value, null);
        },
        get_id: function ($receiver) {
          return $receiver.getAttribute('id') !== null ? $receiver.getAttribute('id') : '';
        },
        set_id: function ($receiver, value) {
          $receiver.setAttribute('id', value);
          $receiver.setIdAttribute('id', true);
        },
        get_style: function ($receiver) {
          return $receiver.getAttribute('style') !== null ? $receiver.getAttribute('style') : '';
        },
        set_style: function ($receiver, value) {
          $receiver.setAttribute('style', value);
        },
        get_classes: function ($receiver) {
          return $receiver.getAttribute('class') !== null ? $receiver.getAttribute('class') : '';
        },
        set_classes: function ($receiver, value) {
          $receiver.setAttribute('class', value);
        },
        hasClass: function ($receiver, cssClass) {
          var c = _.kotlin.dom.get_classes($receiver);
          return _.js.matches(c, '(^|.*' + '\\' + 's+)' + cssClass + '(' + '$' + '|' + '\\' + 's+.*)');
        },
        children: function ($receiver) {
          return _.kotlin.dom.toList($receiver != null ? $receiver.childNodes : null);
        },
        f1: function (it) {
          return it.nodeType === Node.ELEMENT_NODE;
        },
        f2: function (it) {
          return it != null ? it : Kotlin.throwNPE();
        },
        childElements: function ($receiver) {
          return _.kotlin.map_3(_.kotlin.filter_2(_.kotlin.dom.children($receiver), _.kotlin.dom.f1), _.kotlin.dom.f2);
        },
        f3: function (name, it) {
          return it.nodeType === Node.ELEMENT_NODE && Kotlin.equals(it.nodeName, name);
        },
        f4: function (it) {
          return it != null ? it : Kotlin.throwNPE();
        },
        childElements_0: function ($receiver, name) {
          return _.kotlin.map_3(_.kotlin.filter_2(_.kotlin.dom.children($receiver), _.kotlin.dom.f3.bind(null, name)), _.kotlin.dom.f4);
        },
        get_elements: function ($receiver) {
          return _.kotlin.dom.toElementList($receiver != null ? $receiver.getElementsByTagName('*') : null);
        },
        get_elements_0: function ($receiver) {
          return _.kotlin.dom.toElementList($receiver != null ? $receiver.getElementsByTagName('*') : null);
        },
        elements: function ($receiver, localName) {
          return _.kotlin.dom.toElementList($receiver != null ? $receiver.getElementsByTagName(localName) : null);
        },
        elements_0: function ($receiver, localName) {
          return _.kotlin.dom.toElementList($receiver != null ? $receiver.getElementsByTagName(localName) : null);
        },
        elements_1: function ($receiver, namespaceUri, localName) {
          return _.kotlin.dom.toElementList($receiver != null ? $receiver.getElementsByTagNameNS(namespaceUri, localName) : null);
        },
        elements_2: function ($receiver, namespaceUri, localName) {
          return _.kotlin.dom.toElementList($receiver != null ? $receiver.getElementsByTagNameNS(namespaceUri, localName) : null);
        },
        toList: function ($receiver) {
          var tmp$0;
          if ($receiver == null) {
            tmp$0 = _.kotlin.dom.emptyNodeList();
          }
           else {
            tmp$0 = new _.kotlin.dom.NodeListAsList($receiver);
          }
          return tmp$0;
        },
        toElementList: function ($receiver) {
          var tmp$0;
          if ($receiver == null) {
            tmp$0 = new Kotlin.ArrayList(0);
          }
           else {
            tmp$0 = new _.kotlin.dom.ElementListAsList($receiver);
          }
          return tmp$0;
        },
        f5: function (selector, it) {
          return _.kotlin.dom.hasClass(it, selector.substring(1));
        },
        get: function ($receiver, selector) {
          var root = $receiver != null ? $receiver.documentElement : null;
          var tmp$0;
          if (root != null) {
            if (Kotlin.equals(selector, '*')) {
              tmp$0 = _.kotlin.dom.get_elements($receiver);
            }
             else if (selector.startsWith('.')) {
              tmp$0 = _.kotlin.toList_2(_.kotlin.filter_2(_.kotlin.dom.get_elements($receiver), _.kotlin.dom.f5.bind(null, selector)));
            }
             else if (selector.startsWith('#')) {
              var id = selector.substring(1);
              var element = $receiver != null ? $receiver.getElementById(id) : null;
              return element != null ? _.kotlin.arrayList([element]) : _.kotlin.dom.emptyElementList();
            }
             else {
              tmp$0 = _.kotlin.dom.elements_0($receiver, selector);
            }
          }
           else {
            tmp$0 = _.kotlin.dom.emptyElementList();
          }
          return tmp$0;
        },
        f6: function (selector, it) {
          return _.kotlin.dom.hasClass(it, selector.substring(1));
        },
        get_0: function ($receiver, selector) {
          var tmp$1;
          if (Kotlin.equals(selector, '*')) {
            tmp$1 = _.kotlin.dom.get_elements_0($receiver);
          }
           else if (selector.startsWith('.')) {
            tmp$1 = _.kotlin.toList_2(_.kotlin.filter_2(_.kotlin.dom.get_elements_0($receiver), _.kotlin.dom.f6.bind(null, selector)));
          }
           else if (selector.startsWith('#')) {
            var tmp$0;
            var element = (tmp$0 = $receiver.ownerDocument) != null ? tmp$0.getElementById(selector.substring(1)) : null;
            return element != null ? _.kotlin.arrayList([element]) : _.kotlin.dom.emptyElementList();
          }
           else {
            tmp$1 = _.kotlin.dom.elements($receiver, selector);
          }
          return tmp$1;
        },
        NodeListAsList: Kotlin.createClass(Kotlin.AbstractList, /** @lends _.kotlin.dom.NodeListAsList.prototype */ {
          initialize: function (nodeList) {
            this.$nodeList = nodeList;
            this.super_init();
          },
          get_nodeList: function () {
            return this.$nodeList;
          },
          get: function (index) {
            var node = this.get_nodeList().item(index);
            if (node == null) {
              throw new RangeError('NodeList does not contain a node at index: ' + index);
            }
             else {
              return node;
            }
          },
          size: function () {
            return this.get_nodeList().length;
          }
        }),
        ElementListAsList: Kotlin.createClass(Kotlin.AbstractList, /** @lends _.kotlin.dom.ElementListAsList.prototype */ {
          initialize: function (nodeList) {
            this.$nodeList = nodeList;
            this.super_init();
          },
          get_nodeList: function () {
            return this.$nodeList;
          },
          get: function (index) {
            var node = this.get_nodeList().item(index);
            if (node == null) {
              throw new RangeError('NodeList does not contain a node at index: ' + index);
            }
             else if (node.nodeType === Node.ELEMENT_NODE) {
              return node != null ? node : Kotlin.throwNPE();
            }
             else {
              throw new Kotlin.IllegalArgumentException('Node is not an Element as expected but is ' + node.toString());
            }
          },
          size: function () {
            return this.get_nodeList().length;
          }
        }),
        clear: function ($receiver) {
          while (true) {
            var child = $receiver.firstChild;
            if (child == null) {
              return;
            }
             else {
              $receiver.removeChild(child);
            }
          }
        },
        nextSiblings: function ($receiver) {
          return new _.kotlin.dom.NextSiblingIterator($receiver);
        },
        NextSiblingIterator: Kotlin.createClass(classes.co, /** @lends _.kotlin.dom.NextSiblingIterator.prototype */ {
          initialize: function (node) {
            this.$node = node;
            this.super_init();
          },
          get_node: function () {
            return this.$node;
          },
          set_node: function (tmp$0) {
            this.$node = tmp$0;
          },
          computeNext: function () {
            var nextValue = this.get_node().nextSibling;
            if (nextValue != null) {
              this.setNext(nextValue);
              this.set_node(nextValue);
            }
             else {
              this.done();
            }
          }
        }),
        previousSiblings: function ($receiver) {
          return new _.kotlin.dom.PreviousSiblingIterator($receiver);
        },
        PreviousSiblingIterator: Kotlin.createClass(classes.co, /** @lends _.kotlin.dom.PreviousSiblingIterator.prototype */ {
          initialize: function (node) {
            this.$node = node;
            this.super_init();
          },
          get_node: function () {
            return this.$node;
          },
          set_node: function (tmp$0) {
            this.$node = tmp$0;
          },
          computeNext: function () {
            var nextValue = this.get_node().previousSibling;
            if (nextValue != null) {
              this.setNext(nextValue);
              this.set_node(nextValue);
            }
             else {
              this.done();
            }
          }
        }),
        isText: function ($receiver) {
          var nt = $receiver.nodeType;
          return nt === Node.TEXT_NODE || nt === Node.CDATA_SECTION_NODE;
        },
        attribute: function ($receiver, name) {
          return $receiver.getAttribute(name) !== null ? $receiver.getAttribute(name) : '';
        },
        get_head: function ($receiver) {
          return $receiver != null && $receiver.length > 0 ? $receiver.item(0) : null;
        },
        get_first: function ($receiver) {
          return _.kotlin.dom.get_head($receiver);
        },
        get_tail: function ($receiver) {
          if ($receiver == null) {
            return null;
          }
           else {
            var s = $receiver.length;
            return s > 0 ? $receiver.item(s - 1) : null;
          }
        },
        get_last: function ($receiver) {
          return _.kotlin.dom.get_tail($receiver);
        },
        toXmlString_1: function ($receiver, xmlDeclaration) {
          var tmp$0;
          if ($receiver == null)
            tmp$0 = '';
          else {
            tmp$0 = _.kotlin.dom.nodesToXmlString(_.kotlin.dom.toList($receiver), xmlDeclaration);
          }
          return tmp$0;
        },
        nodesToXmlString: function (nodes, xmlDeclaration) {
          var builder = new Kotlin.StringBuilder();
          {
            var tmp$0 = nodes.iterator();
            while (tmp$0.hasNext()) {
              var n = tmp$0.next();
              builder.append(_.kotlin.dom.toXmlString_0(n, xmlDeclaration));
            }
          }
          return builder.toString();
        },
        plus: function ($receiver, child) {
          if (child != null) {
            $receiver.appendChild(child);
          }
          return $receiver;
        },
        plus_0: function ($receiver, text) {
          return _.kotlin.dom.addText($receiver, text, null);
        },
        plusAssign: function ($receiver, text) {
          return _.kotlin.dom.addText($receiver, text, null);
        },
        createElement: function ($receiver, name, init) {
          var tmp$0;
          var elem = (tmp$0 = $receiver.createElement(name)) != null ? tmp$0 : Kotlin.throwNPE();
          init(elem);
          return elem;
        },
        createElement_0: function ($receiver, name, doc, init) {
          var tmp$0;
          var elem = (tmp$0 = _.kotlin.dom.ownerDocument($receiver, doc).createElement(name)) != null ? tmp$0 : Kotlin.throwNPE();
          init(elem);
          return elem;
        },
        ownerDocument: function ($receiver, doc) {
          var tmp$0;
          if ($receiver.nodeType === Node.DOCUMENT_NODE)
            tmp$0 = $receiver != null ? $receiver : Kotlin.throwNPE();
          else if (doc == null)
            tmp$0 = $receiver.ownerDocument;
          else
            tmp$0 = doc;
          var answer = tmp$0;
          if (answer == null) {
            throw new Kotlin.IllegalArgumentException('Element does not have an ownerDocument and none was provided for: ' + $receiver.toString());
          }
           else {
            return answer;
          }
        },
        addElement: function ($receiver, name, init) {
          var child = _.kotlin.dom.createElement($receiver, name, init);
          $receiver.appendChild(child);
          return child;
        },
        addElement_0: function ($receiver, name, doc, init) {
          var child = _.kotlin.dom.createElement_0($receiver, name, doc, init);
          $receiver.appendChild(child);
          return child;
        },
        addText: function ($receiver, text, doc) {
          if (text != null) {
            var tmp$0;
            var child = (tmp$0 = _.kotlin.dom.ownerDocument($receiver, doc).createTextNode(text)) != null ? tmp$0 : Kotlin.throwNPE();
            $receiver.appendChild(child);
          }
          return $receiver;
        }
      }),
      all_0: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              return false;
          }
        }
        return true;
      },
      any_0: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return true;
          }
        }
        return false;
      },
      count_0: function ($receiver, predicate) {
        var count = 0;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              count++;
          }
        }
        return count;
      },
      find_0: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return element;
          }
        }
        return null;
      },
      filter_0: function ($receiver, predicate) {
        return _.kotlin.filterTo_0($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterTo_0: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      filterNot_0: function ($receiver, predicate) {
        return _.kotlin.filterNotTo_0($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterNotTo_0: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      partition_0: function ($receiver, predicate) {
        var first = new Kotlin.ArrayList(0);
        var second = new Kotlin.ArrayList(0);
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element)) {
              first.add(element);
            }
             else {
              second.add(element);
            }
          }
        }
        return new _.kotlin.Pair(first, second);
      },
      map_1: function ($receiver, transform) {
        return _.kotlin.mapTo_1($receiver, new Kotlin.ArrayList(0), transform);
      },
      mapTo_1: function ($receiver, result, transform) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var item = tmp$0.next();
            result.add(transform(item));
          }
        }
        return result;
      },
      flatMap_0: function ($receiver, transform) {
        return _.kotlin.flatMapTo_0($receiver, new Kotlin.ArrayList(0), transform);
      },
      flatMapTo_0: function ($receiver, result, transform) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var list = transform(element);
            {
              var tmp$1 = list.iterator();
              while (tmp$1.hasNext()) {
                var r = tmp$1.next();
                result.add(r);
              }
            }
          }
        }
        return result;
      },
      forEach_0: function ($receiver, operation) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            operation(element);
          }
        }
      },
      fold_0: function ($receiver, initial, operation) {
        var answer = initial;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer = operation(answer, element);
          }
        }
        return answer;
      },
      foldRight_0: function ($receiver, initial, operation) {
        var r = initial;
        var index = $receiver.length - 1;
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      reduce_0: function ($receiver, operation) {
        var iterator = Kotlin.arrayIterator($receiver);
        if (!iterator.hasNext()) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var result = iterator.next();
        while (iterator.hasNext()) {
          result = operation(result, iterator.next());
        }
        return result;
      },
      reduceRight_0: function ($receiver, operation) {
        var index = $receiver.length - 1;
        if (index < 0) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var r = $receiver[index--];
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      groupBy_0: function ($receiver, toKey) {
        return _.kotlin.groupByTo_0($receiver, new Kotlin.ComplexHashMap(0), toKey);
      },
      f2: function () {
        return new Kotlin.ArrayList(0);
      },
      groupByTo_0: function ($receiver, result, toKey) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var key = toKey(element);
            var list = _.kotlin.getOrPut(result, key, _.kotlin.f2);
            list.add(element);
          }
        }
        return result;
      },
      drop_0: function ($receiver, n) {
        return _.kotlin.dropWhile_0($receiver, _.kotlin.countTo(n));
      },
      dropWhile_0: function ($receiver, predicate) {
        return _.kotlin.dropWhileTo_0($receiver, new Kotlin.ArrayList(0), predicate);
      },
      dropWhileTo_0: function ($receiver, result, predicate) {
        var start = true;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (start && predicate(element)) {
            }
             else {
              start = false;
              result.add(element);
            }
          }
        }
        return result;
      },
      take_0: function ($receiver, n) {
        return _.kotlin.takeWhile_0($receiver, _.kotlin.countTo(n));
      },
      takeWhile_0: function ($receiver, predicate) {
        return _.kotlin.takeWhileTo_0($receiver, new Kotlin.ArrayList(0), predicate);
      },
      takeWhileTo_0: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
            else
              break;
          }
        }
        return result;
      },
      toCollection_0: function ($receiver, result) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            result.add(element);
          }
        }
        return result;
      },
      reverse_0: function ($receiver) {
        var list = _.kotlin.toCollection_0($receiver, new Kotlin.ArrayList(0));
        Kotlin.reverse(list);
        return list;
      },
      toLinkedList_0: function ($receiver) {
        return _.kotlin.toCollection_0($receiver, new Kotlin.LinkedList());
      },
      toList_0: function ($receiver) {
        return _.kotlin.toCollection_0($receiver, new Kotlin.ArrayList(0));
      },
      toSet_0: function ($receiver) {
        return _.kotlin.toCollection_0($receiver, new Kotlin.LinkedHashSet());
      },
      toSortedSet_0: function ($receiver) {
        return _.kotlin.toCollection_0($receiver, new Kotlin.TreeSet());
      },
      plus_2: function ($receiver, element) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_0($receiver, answer);
        answer.add(element);
        return answer;
      },
      plus_3: function ($receiver, iterator) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_0($receiver, answer);
        {
          var tmp$0 = iterator;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer.add(element);
          }
        }
        return answer;
      },
      plus_4: function ($receiver, collection) {
        return _.kotlin.plus_3($receiver, collection.iterator());
      },
      withIndices_0: function ($receiver) {
        return new _.kotlin.IndexIterator(Kotlin.arrayIterator($receiver));
      },
      f3: function (f, x, y) {
        var xr = f(x);
        var yr = f(y);
        return xr.compareTo(yr);
      },
      sortBy_0: function ($receiver, f) {
        var sortedList = _.kotlin.toCollection_0($receiver, new Kotlin.ArrayList(0));
        var sortBy = Kotlin.comparator(_.kotlin.f3.bind(null, f));
        Kotlin.collectionsSort(sortedList, sortBy);
        return sortedList;
      },
      appendString_0: function ($receiver, buffer, separator, prefix, postfix, limit, truncated) {
        buffer.append(prefix);
        var count = 0;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (++count > 1)
              buffer.append(separator);
            if (limit < 0 || count <= limit) {
              var text = element == null ? 'null' : Kotlin.toString(element);
              buffer.append(text);
            }
             else
              break;
          }
        }
        if (limit >= 0 && count > limit)
          buffer.append(truncated);
        buffer.append(postfix);
      },
      makeString_1: function ($receiver, separator, prefix, postfix, limit, truncated) {
        var buffer = new Kotlin.StringBuilder();
        _.kotlin.appendString_0($receiver, buffer, separator, prefix, postfix, limit, truncated);
        return buffer.toString();
      },
      iterator: function ($receiver) {
        return Kotlin.createObject(Kotlin.Iterator, {
          initialize: function () {
          },
          hasNext: function () {
            return $receiver.hasMoreElements();
          },
          next: function () {
            return $receiver.nextElement();
          }
        });
      },
      toArrayList: function ($receiver) {
        return _.kotlin.toCollection_1($receiver, new Kotlin.ArrayList(0));
      },
      toHashSet: function ($receiver) {
        return _.kotlin.toCollection_1($receiver, new Kotlin.ComplexHashSet());
      },
      to: function ($receiver, that) {
        return new _.kotlin.Pair($receiver, that);
      },
      run: function (f) {
        return f();
      },
      with: function (receiver, f) {
        return f(receiver);
      },
      let: function ($receiver, f) {
        return f($receiver);
      },
      all_1: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              return false;
          }
        }
        return true;
      },
      any_1: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return true;
          }
        }
        return false;
      },
      count_1: function ($receiver, predicate) {
        var count = 0;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              count++;
          }
        }
        return count;
      },
      find_1: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return element;
          }
        }
        return null;
      },
      filter_1: function ($receiver, predicate) {
        return _.kotlin.filterTo_1($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterTo_1: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      filterNot_1: function ($receiver, predicate) {
        return _.kotlin.filterNotTo_1($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterNotTo_1: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      partition_1: function ($receiver, predicate) {
        var first = new Kotlin.ArrayList(0);
        var second = new Kotlin.ArrayList(0);
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element)) {
              first.add(element);
            }
             else {
              second.add(element);
            }
          }
        }
        return new _.kotlin.Pair(first, second);
      },
      map_2: function ($receiver, transform) {
        return _.kotlin.mapTo_2($receiver, new Kotlin.ArrayList(0), transform);
      },
      mapTo_2: function ($receiver, result, transform) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var item = tmp$0.next();
            result.add(transform(item));
          }
        }
        return result;
      },
      flatMap_1: function ($receiver, transform) {
        return _.kotlin.flatMapTo_1($receiver, new Kotlin.ArrayList(0), transform);
      },
      flatMapTo_1: function ($receiver, result, transform) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var list = transform(element);
            {
              var tmp$1 = list.iterator();
              while (tmp$1.hasNext()) {
                var r = tmp$1.next();
                result.add(r);
              }
            }
          }
        }
        return result;
      },
      forEach_1: function ($receiver, operation) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            operation(element);
          }
        }
      },
      fold_1: function ($receiver, initial, operation) {
        var answer = initial;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer = operation(answer, element);
          }
        }
        return answer;
      },
      foldRight_1: function ($receiver, initial, operation) {
        var r = initial;
        var index = $receiver.length - 1;
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      reduce_1: function ($receiver, operation) {
        var iterator = Kotlin.arrayIterator($receiver);
        if (!iterator.hasNext()) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var result = iterator.next();
        while (iterator.hasNext()) {
          result = operation(result, iterator.next());
        }
        return result;
      },
      reduceRight_1: function ($receiver, operation) {
        var index = $receiver.length - 1;
        if (index < 0) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var r = $receiver[index--];
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      groupBy_1: function ($receiver, toKey) {
        return _.kotlin.groupByTo_1($receiver, new Kotlin.ComplexHashMap(0), toKey);
      },
      f4: function () {
        return new Kotlin.ArrayList(0);
      },
      groupByTo_1: function ($receiver, result, toKey) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var key = toKey(element);
            var list = _.kotlin.getOrPut(result, key, _.kotlin.f4);
            list.add(element);
          }
        }
        return result;
      },
      drop_1: function ($receiver, n) {
        return _.kotlin.dropWhile_1($receiver, _.kotlin.countTo(n));
      },
      dropWhile_1: function ($receiver, predicate) {
        return _.kotlin.dropWhileTo_1($receiver, new Kotlin.ArrayList(0), predicate);
      },
      dropWhileTo_1: function ($receiver, result, predicate) {
        var start = true;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (start && predicate(element)) {
            }
             else {
              start = false;
              result.add(element);
            }
          }
        }
        return result;
      },
      take_1: function ($receiver, n) {
        return _.kotlin.takeWhile_1($receiver, _.kotlin.countTo(n));
      },
      takeWhile_1: function ($receiver, predicate) {
        return _.kotlin.takeWhileTo_1($receiver, new Kotlin.ArrayList(0), predicate);
      },
      takeWhileTo_1: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
            else
              break;
          }
        }
        return result;
      },
      toCollection_2: function ($receiver, result) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            result.add(element);
          }
        }
        return result;
      },
      reverse_1: function ($receiver) {
        var list = _.kotlin.toCollection_2($receiver, new Kotlin.ArrayList(0));
        Kotlin.reverse(list);
        return list;
      },
      toLinkedList_1: function ($receiver) {
        return _.kotlin.toCollection_2($receiver, new Kotlin.LinkedList());
      },
      toList_1: function ($receiver) {
        return _.kotlin.toCollection_2($receiver, new Kotlin.ArrayList(0));
      },
      toSet_1: function ($receiver) {
        return _.kotlin.toCollection_2($receiver, new Kotlin.LinkedHashSet());
      },
      toSortedSet_1: function ($receiver) {
        return _.kotlin.toCollection_2($receiver, new Kotlin.TreeSet());
      },
      plus_5: function ($receiver, element) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_2($receiver, answer);
        answer.add(element);
        return answer;
      },
      plus_6: function ($receiver, iterator) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_2($receiver, answer);
        {
          var tmp$0 = iterator;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer.add(element);
          }
        }
        return answer;
      },
      plus_7: function ($receiver, collection) {
        return _.kotlin.plus_6($receiver, collection.iterator());
      },
      withIndices_1: function ($receiver) {
        return new _.kotlin.IndexIterator(Kotlin.arrayIterator($receiver));
      },
      f5: function (f, x, y) {
        var xr = f(x);
        var yr = f(y);
        return xr.compareTo(yr);
      },
      sortBy_1: function ($receiver, f) {
        var sortedList = _.kotlin.toCollection_2($receiver, new Kotlin.ArrayList(0));
        var sortBy = Kotlin.comparator(_.kotlin.f5.bind(null, f));
        Kotlin.collectionsSort(sortedList, sortBy);
        return sortedList;
      },
      appendString_1: function ($receiver, buffer, separator, prefix, postfix, limit, truncated) {
        buffer.append(prefix);
        var count = 0;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (++count > 1)
              buffer.append(separator);
            if (limit < 0 || count <= limit) {
              var text = element == null ? 'null' : Kotlin.toString(element);
              buffer.append(text);
            }
             else
              break;
          }
        }
        if (limit >= 0 && count > limit)
          buffer.append(truncated);
        buffer.append(postfix);
      },
      makeString_2: function ($receiver, separator, prefix, postfix, limit, truncated) {
        var buffer = new Kotlin.StringBuilder();
        _.kotlin.appendString_1($receiver, buffer, separator, prefix, postfix, limit, truncated);
        return buffer.toString();
      },
      all_2: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              return false;
          }
        }
        return true;
      },
      any_2: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return true;
          }
        }
        return false;
      },
      count_2: function ($receiver, predicate) {
        var count = 0;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              count++;
          }
        }
        return count;
      },
      find_2: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return element;
          }
        }
        return null;
      },
      filter_3: function ($receiver, predicate) {
        return _.kotlin.filterTo_2($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterTo_2: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      filterNot_2: function ($receiver, predicate) {
        return _.kotlin.filterNotTo_2($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterNotTo_2: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      partition_2: function ($receiver, predicate) {
        var first = new Kotlin.ArrayList(0);
        var second = new Kotlin.ArrayList(0);
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element)) {
              first.add(element);
            }
             else {
              second.add(element);
            }
          }
        }
        return new _.kotlin.Pair(first, second);
      },
      map_4: function ($receiver, transform) {
        return _.kotlin.mapTo_3($receiver, new Kotlin.ArrayList(0), transform);
      },
      mapTo_3: function ($receiver, result, transform) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var item = tmp$0.next();
            result.add(transform(item));
          }
        }
        return result;
      },
      flatMap_2: function ($receiver, transform) {
        return _.kotlin.flatMapTo_2($receiver, new Kotlin.ArrayList(0), transform);
      },
      flatMapTo_2: function ($receiver, result, transform) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var list = transform(element);
            {
              var tmp$1 = list.iterator();
              while (tmp$1.hasNext()) {
                var r = tmp$1.next();
                result.add(r);
              }
            }
          }
        }
        return result;
      },
      forEach_2: function ($receiver, operation) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            operation(element);
          }
        }
      },
      fold_2: function ($receiver, initial, operation) {
        var answer = initial;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer = operation(answer, element);
          }
        }
        return answer;
      },
      foldRight_2: function ($receiver, initial, operation) {
        var r = initial;
        var index = $receiver.length - 1;
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      reduce_2: function ($receiver, operation) {
        var iterator = Kotlin.arrayIterator($receiver);
        if (!iterator.hasNext()) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var result = iterator.next();
        while (iterator.hasNext()) {
          result = operation(result, iterator.next());
        }
        return result;
      },
      reduceRight_2: function ($receiver, operation) {
        var index = $receiver.length - 1;
        if (index < 0) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var r = $receiver[index--];
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      groupBy_2: function ($receiver, toKey) {
        return _.kotlin.groupByTo_2($receiver, new Kotlin.ComplexHashMap(0), toKey);
      },
      f6: function () {
        return new Kotlin.ArrayList(0);
      },
      groupByTo_2: function ($receiver, result, toKey) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var key = toKey(element);
            var list = _.kotlin.getOrPut(result, key, _.kotlin.f6);
            list.add(element);
          }
        }
        return result;
      },
      drop_2: function ($receiver, n) {
        return _.kotlin.dropWhile_2($receiver, _.kotlin.countTo(n));
      },
      dropWhile_2: function ($receiver, predicate) {
        return _.kotlin.dropWhileTo_2($receiver, new Kotlin.ArrayList(0), predicate);
      },
      dropWhileTo_2: function ($receiver, result, predicate) {
        var start = true;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (start && predicate(element)) {
            }
             else {
              start = false;
              result.add(element);
            }
          }
        }
        return result;
      },
      take_2: function ($receiver, n) {
        return _.kotlin.takeWhile_2($receiver, _.kotlin.countTo(n));
      },
      takeWhile_2: function ($receiver, predicate) {
        return _.kotlin.takeWhileTo_2($receiver, new Kotlin.ArrayList(0), predicate);
      },
      takeWhileTo_2: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
            else
              break;
          }
        }
        return result;
      },
      toCollection_3: function ($receiver, result) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            result.add(element);
          }
        }
        return result;
      },
      reverse_2: function ($receiver) {
        var list = _.kotlin.toCollection_3($receiver, new Kotlin.ArrayList(0));
        Kotlin.reverse(list);
        return list;
      },
      toLinkedList_2: function ($receiver) {
        return _.kotlin.toCollection_3($receiver, new Kotlin.LinkedList());
      },
      toList_3: function ($receiver) {
        return _.kotlin.toCollection_3($receiver, new Kotlin.ArrayList(0));
      },
      toSet_2: function ($receiver) {
        return _.kotlin.toCollection_3($receiver, new Kotlin.LinkedHashSet());
      },
      toSortedSet_2: function ($receiver) {
        return _.kotlin.toCollection_3($receiver, new Kotlin.TreeSet());
      },
      plus_8: function ($receiver, element) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_3($receiver, answer);
        answer.add(element);
        return answer;
      },
      plus_9: function ($receiver, iterator) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_3($receiver, answer);
        {
          var tmp$0 = iterator;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer.add(element);
          }
        }
        return answer;
      },
      plus_10: function ($receiver, collection) {
        return _.kotlin.plus_9($receiver, collection.iterator());
      },
      withIndices_2: function ($receiver) {
        return new _.kotlin.IndexIterator(Kotlin.arrayIterator($receiver));
      },
      f7: function (f, x, y) {
        var xr = f(x);
        var yr = f(y);
        return xr.compareTo(yr);
      },
      sortBy_2: function ($receiver, f) {
        var sortedList = _.kotlin.toCollection_3($receiver, new Kotlin.ArrayList(0));
        var sortBy = Kotlin.comparator(_.kotlin.f7.bind(null, f));
        Kotlin.collectionsSort(sortedList, sortBy);
        return sortedList;
      },
      appendString_2: function ($receiver, buffer, separator, prefix, postfix, limit, truncated) {
        buffer.append(prefix);
        var count = 0;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (++count > 1)
              buffer.append(separator);
            if (limit < 0 || count <= limit) {
              var text = element == null ? 'null' : Kotlin.toString(element);
              buffer.append(text);
            }
             else
              break;
          }
        }
        if (limit >= 0 && count > limit)
          buffer.append(truncated);
        buffer.append(postfix);
      },
      makeString_3: function ($receiver, separator, prefix, postfix, limit, truncated) {
        var buffer = new Kotlin.StringBuilder();
        _.kotlin.appendString_2($receiver, buffer, separator, prefix, postfix, limit, truncated);
        return buffer.toString();
      },
      downTo: function ($receiver, to) {
        return new _.jet.ByteProgression($receiver, to, -1);
      },
      downTo_0: function ($receiver, to) {
        return new _.jet.CharProgression($receiver.toChar(), to, -1);
      },
      downTo_1: function ($receiver, to) {
        return new _.jet.ShortProgression($receiver, to, -1);
      },
      downTo_2: function ($receiver, to) {
        return new Kotlin.NumberProgression($receiver, to, -1);
      },
      downTo_3: function ($receiver, to) {
        return new _.jet.LongProgression($receiver.toLong(), to, -(1).toLong());
      },
      downTo_4: function ($receiver, to) {
        return new _.jet.FloatProgression($receiver, to, -1);
      },
      downTo_5: function ($receiver, to) {
        return new _.jet.DoubleProgression($receiver, to, -1.0);
      },
      downTo_6: function ($receiver, to) {
        return new _.jet.CharProgression($receiver, to.toChar(), -1);
      },
      downTo_7: function ($receiver, to) {
        return new _.jet.CharProgression($receiver, to, -1);
      },
      downTo_8: function ($receiver, to) {
        return new _.jet.ShortProgression($receiver.toShort(), to, -1);
      },
      downTo_9: function ($receiver, to) {
        return new Kotlin.NumberProgression($receiver.toInt(), to, -1);
      },
      downTo_10: function ($receiver, to) {
        return new _.jet.LongProgression($receiver.toLong(), to, -(1).toLong());
      },
      downTo_11: function ($receiver, to) {
        return new _.jet.FloatProgression($receiver.toFloat(), to, -1);
      },
      downTo_12: function ($receiver, to) {
        return new _.jet.DoubleProgression($receiver.toDouble(), to, -1.0);
      },
      downTo_13: function ($receiver, to) {
        return new _.jet.ShortProgression($receiver, to, -1);
      },
      downTo_14: function ($receiver, to) {
        return new _.jet.ShortProgression($receiver, to.toShort(), -1);
      },
      downTo_15: function ($receiver, to) {
        return new _.jet.ShortProgression($receiver, to, -1);
      },
      downTo_16: function ($receiver, to) {
        return new Kotlin.NumberProgression($receiver, to, -1);
      },
      downTo_17: function ($receiver, to) {
        return new _.jet.LongProgression($receiver.toLong(), to, -(1).toLong());
      },
      downTo_18: function ($receiver, to) {
        return new _.jet.FloatProgression($receiver, to, -1);
      },
      downTo_19: function ($receiver, to) {
        return new _.jet.DoubleProgression($receiver, to, -1.0);
      },
      downTo_20: function ($receiver, to) {
        return new Kotlin.NumberProgression($receiver, to, -1);
      },
      downTo_21: function ($receiver, to) {
        return new Kotlin.NumberProgression($receiver, to.toInt(), -1);
      },
      downTo_22: function ($receiver, to) {
        return new Kotlin.NumberProgression($receiver, to, -1);
      },
      downTo_23: function ($receiver, to) {
        return new Kotlin.NumberProgression($receiver, to, -1);
      },
      downTo_24: function ($receiver, to) {
        return new _.jet.LongProgression($receiver.toLong(), to, -(1).toLong());
      },
      downTo_25: function ($receiver, to) {
        return new _.jet.FloatProgression($receiver, to, -1);
      },
      downTo_26: function ($receiver, to) {
        return new _.jet.DoubleProgression($receiver, to, -1.0);
      },
      downTo_27: function ($receiver, to) {
        return new _.jet.LongProgression($receiver, to.toLong(), -(1).toLong());
      },
      downTo_28: function ($receiver, to) {
        return new _.jet.LongProgression($receiver, to.toLong(), -(1).toLong());
      },
      downTo_29: function ($receiver, to) {
        return new _.jet.LongProgression($receiver, to.toLong(), -(1).toLong());
      },
      downTo_30: function ($receiver, to) {
        return new _.jet.LongProgression($receiver, to.toLong(), -(1).toLong());
      },
      downTo_31: function ($receiver, to) {
        return new _.jet.LongProgression($receiver, to, -(1).toLong());
      },
      downTo_32: function ($receiver, to) {
        return new _.jet.FloatProgression($receiver.toFloat(), to, -1);
      },
      downTo_33: function ($receiver, to) {
        return new _.jet.DoubleProgression($receiver.toDouble(), to, -1.0);
      },
      downTo_34: function ($receiver, to) {
        return new _.jet.FloatProgression($receiver, to, -1);
      },
      downTo_35: function ($receiver, to) {
        return new _.jet.FloatProgression($receiver, to.toFloat(), -1);
      },
      downTo_36: function ($receiver, to) {
        return new _.jet.FloatProgression($receiver, to, -1);
      },
      downTo_37: function ($receiver, to) {
        return new _.jet.FloatProgression($receiver, to, -1);
      },
      downTo_38: function ($receiver, to) {
        return new _.jet.FloatProgression($receiver, to.toFloat(), -1);
      },
      downTo_39: function ($receiver, to) {
        return new _.jet.FloatProgression($receiver, to, -1);
      },
      downTo_40: function ($receiver, to) {
        return new _.jet.DoubleProgression($receiver, to, -1.0);
      },
      downTo_41: function ($receiver, to) {
        return new _.jet.DoubleProgression($receiver, to, -1.0);
      },
      downTo_42: function ($receiver, to) {
        return new _.jet.DoubleProgression($receiver, to.toDouble(), -1.0);
      },
      downTo_43: function ($receiver, to) {
        return new _.jet.DoubleProgression($receiver, to, -1.0);
      },
      downTo_44: function ($receiver, to) {
        return new _.jet.DoubleProgression($receiver, to, -1.0);
      },
      downTo_45: function ($receiver, to) {
        return new _.jet.DoubleProgression($receiver, to.toDouble(), -1.0);
      },
      downTo_46: function ($receiver, to) {
        return new _.jet.DoubleProgression($receiver, to, -1.0);
      },
      downTo_47: function ($receiver, to) {
        return new _.jet.DoubleProgression($receiver, to, -1.0);
      },
      all_3: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              return false;
          }
        }
        return true;
      },
      any_3: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return true;
          }
        }
        return false;
      },
      count_3: function ($receiver, predicate) {
        var count = 0;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              count++;
          }
        }
        return count;
      },
      find_3: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return element;
          }
        }
        return null;
      },
      filter_4: function ($receiver, predicate) {
        return _.kotlin.filterTo_3($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterTo_3: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      filterNot_3: function ($receiver, predicate) {
        return _.kotlin.filterNotTo_3($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterNotTo_3: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      partition_3: function ($receiver, predicate) {
        var first = new Kotlin.ArrayList(0);
        var second = new Kotlin.ArrayList(0);
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element)) {
              first.add(element);
            }
             else {
              second.add(element);
            }
          }
        }
        return new _.kotlin.Pair(first, second);
      },
      map_5: function ($receiver, transform) {
        return _.kotlin.mapTo_4($receiver, new Kotlin.ArrayList(0), transform);
      },
      mapTo_4: function ($receiver, result, transform) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var item = tmp$0.next();
            result.add(transform(item));
          }
        }
        return result;
      },
      flatMap_3: function ($receiver, transform) {
        return _.kotlin.flatMapTo_3($receiver, new Kotlin.ArrayList(0), transform);
      },
      flatMapTo_3: function ($receiver, result, transform) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var list = transform(element);
            {
              var tmp$1 = list.iterator();
              while (tmp$1.hasNext()) {
                var r = tmp$1.next();
                result.add(r);
              }
            }
          }
        }
        return result;
      },
      forEach_3: function ($receiver, operation) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            operation(element);
          }
        }
      },
      fold_3: function ($receiver, initial, operation) {
        var answer = initial;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer = operation(answer, element);
          }
        }
        return answer;
      },
      foldRight_3: function ($receiver, initial, operation) {
        var r = initial;
        var index = $receiver.length - 1;
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      reduce_3: function ($receiver, operation) {
        var iterator = Kotlin.arrayIterator($receiver);
        if (!iterator.hasNext()) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var result = iterator.next();
        while (iterator.hasNext()) {
          result = operation(result, iterator.next());
        }
        return result;
      },
      reduceRight_3: function ($receiver, operation) {
        var index = $receiver.length - 1;
        if (index < 0) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var r = $receiver[index--];
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      groupBy_3: function ($receiver, toKey) {
        return _.kotlin.groupByTo_3($receiver, new Kotlin.ComplexHashMap(0), toKey);
      },
      f8: function () {
        return new Kotlin.ArrayList(0);
      },
      groupByTo_3: function ($receiver, result, toKey) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var key = toKey(element);
            var list = _.kotlin.getOrPut(result, key, _.kotlin.f8);
            list.add(element);
          }
        }
        return result;
      },
      drop_3: function ($receiver, n) {
        return _.kotlin.dropWhile_3($receiver, _.kotlin.countTo(n));
      },
      dropWhile_3: function ($receiver, predicate) {
        return _.kotlin.dropWhileTo_3($receiver, new Kotlin.ArrayList(0), predicate);
      },
      dropWhileTo_3: function ($receiver, result, predicate) {
        var start = true;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (start && predicate(element)) {
            }
             else {
              start = false;
              result.add(element);
            }
          }
        }
        return result;
      },
      take_3: function ($receiver, n) {
        return _.kotlin.takeWhile_3($receiver, _.kotlin.countTo(n));
      },
      takeWhile_3: function ($receiver, predicate) {
        return _.kotlin.takeWhileTo_3($receiver, new Kotlin.ArrayList(0), predicate);
      },
      takeWhileTo_3: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
            else
              break;
          }
        }
        return result;
      },
      toCollection_4: function ($receiver, result) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            result.add(element);
          }
        }
        return result;
      },
      reverse_3: function ($receiver) {
        var list = _.kotlin.toCollection_4($receiver, new Kotlin.ArrayList(0));
        Kotlin.reverse(list);
        return list;
      },
      toLinkedList_3: function ($receiver) {
        return _.kotlin.toCollection_4($receiver, new Kotlin.LinkedList());
      },
      toList_4: function ($receiver) {
        return _.kotlin.toCollection_4($receiver, new Kotlin.ArrayList(0));
      },
      toSet_3: function ($receiver) {
        return _.kotlin.toCollection_4($receiver, new Kotlin.LinkedHashSet());
      },
      toSortedSet_3: function ($receiver) {
        return _.kotlin.toCollection_4($receiver, new Kotlin.TreeSet());
      },
      plus_11: function ($receiver, element) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_4($receiver, answer);
        answer.add(element);
        return answer;
      },
      plus_12: function ($receiver, iterator) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_4($receiver, answer);
        {
          var tmp$0 = iterator;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer.add(element);
          }
        }
        return answer;
      },
      plus_13: function ($receiver, collection) {
        return _.kotlin.plus_12($receiver, collection.iterator());
      },
      withIndices_3: function ($receiver) {
        return new _.kotlin.IndexIterator(Kotlin.arrayIterator($receiver));
      },
      f9: function (f, x, y) {
        var xr = f(x);
        var yr = f(y);
        return xr.compareTo(yr);
      },
      sortBy_3: function ($receiver, f) {
        var sortedList = _.kotlin.toCollection_4($receiver, new Kotlin.ArrayList(0));
        var sortBy = Kotlin.comparator(_.kotlin.f9.bind(null, f));
        Kotlin.collectionsSort(sortedList, sortBy);
        return sortedList;
      },
      appendString_3: function ($receiver, buffer, separator, prefix, postfix, limit, truncated) {
        buffer.append(prefix);
        var count = 0;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (++count > 1)
              buffer.append(separator);
            if (limit < 0 || count <= limit) {
              var text = element == null ? 'null' : Kotlin.toString(element);
              buffer.append(text);
            }
             else
              break;
          }
        }
        if (limit >= 0 && count > limit)
          buffer.append(truncated);
        buffer.append(postfix);
      },
      makeString_4: function ($receiver, separator, prefix, postfix, limit, truncated) {
        var buffer = new Kotlin.StringBuilder();
        _.kotlin.appendString_3($receiver, buffer, separator, prefix, postfix, limit, truncated);
        return buffer.toString();
      },
      trim: function ($receiver, text) {
        return _.kotlin.trimTrailing(_.kotlin.trimLeading($receiver, text), text);
      },
      trim_0: function ($receiver, prefix, postfix) {
        return _.kotlin.trimTrailing(_.kotlin.trimLeading($receiver, prefix), postfix);
      },
      trimLeading: function ($receiver, prefix) {
        var answer = $receiver;
        if (answer.startsWith(prefix)) {
          answer = answer.substring(prefix.length);
        }
        return answer;
      },
      trimTrailing: function ($receiver, postfix) {
        var answer = $receiver;
        if (answer.endsWith(postfix)) {
          answer = answer.substring(0, $receiver.length - postfix.length);
        }
        return answer;
      },
      notEmpty: function ($receiver) {
        return $receiver != null && $receiver.length > 0;
      },
      iterator_0: function ($receiver) {
        return Kotlin.createObject(_.jet.CharIterator, {
          initialize: function () {
            this.super_init();
            this.$index = 0;
          },
          get_index: function () {
            return this.$index;
          },
          set_index: function (tmp$0) {
            this.$index = tmp$0;
          },
          nextChar: function () {
            var tmp$0, tmp$1;
            return $receiver.get((tmp$0 = this.get_index(), tmp$1 = tmp$0, this.set_index(tmp$0 + 1), tmp$1));
          },
          hasNext: function () {
            return this.get_index() < $receiver.length;
          }
        });
      },
      orEmpty: function ($receiver) {
        return $receiver !== null ? $receiver : '';
      },
      get_size: function ($receiver) {
        return $receiver.length;
      },
      count_4: function ($receiver, predicate) {
        var answer = 0;
        {
          var tmp$0 = _.kotlin.iterator_0($receiver);
          while (tmp$0.hasNext()) {
            var c = tmp$0.next();
            if (predicate(c)) {
              answer++;
            }
          }
        }
        return answer;
      },
      count_5: function ($receiver) {
        if (Kotlin.isType($receiver, _.jet.Collection)) {
          return $receiver.size();
        }
        var number = 0;
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var elem = tmp$0.next();
            ++number;
          }
        }
        return number;
      },
      fa: function (count, n, it) {
        ++count.v;
        return count.v <= n;
      },
      countTo: function (n) {
        var count = {v: 0};
        return _.kotlin.fa.bind(null, count, n);
      },
      first: function ($receiver) {
        if (Kotlin.isType($receiver, _.jet.List)) {
          return _.kotlin.first($receiver);
        }
        return $receiver.iterator().next();
      },
      containsItem: function ($receiver, item) {
        if (Kotlin.isType($receiver, Kotlin.AbstractCollection)) {
          return $receiver.contains(item);
        }
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var elem = tmp$0.next();
            if (Kotlin.equals(elem, item)) {
              return true;
            }
          }
        }
        return false;
      },
      sort: function ($receiver) {
        var list = _.kotlin.toCollection_5($receiver, new Kotlin.ArrayList(0));
        Kotlin.collectionsSort(list);
        return list;
      },
      sort_0: function ($receiver, comparator) {
        var list = _.kotlin.toCollection_5($receiver, new Kotlin.ArrayList(0));
        Kotlin.collectionsSort(list, comparator);
        return list;
      },
      all_4: function ($receiver, predicate) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            if (!predicate(element))
              return false;
          }
        }
        return true;
      },
      any_4: function ($receiver, predicate) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            if (predicate(element))
              return true;
          }
        }
        return false;
      },
      count_6: function ($receiver, predicate) {
        var count = 0;
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            if (predicate(element))
              count++;
          }
        }
        return count;
      },
      find_4: function ($receiver, predicate) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            if (predicate(element))
              return element;
          }
        }
        return null;
      },
      filter_5: function ($receiver, predicate) {
        return _.kotlin.filterTo_4($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterTo_4: function ($receiver, result, predicate) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            if (predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      filterNot_4: function ($receiver, predicate) {
        return _.kotlin.filterNotTo_4($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterNotTo_4: function ($receiver, result, predicate) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            if (!predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      partition_4: function ($receiver, predicate) {
        var first = new Kotlin.ArrayList(0);
        var second = new Kotlin.ArrayList(0);
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            {
              if (predicate(element)) {
                first.add(element);
              }
               else {
                second.add(element);
              }
            }
          }
        }
        return new _.kotlin.Pair(first, second);
      },
      map_6: function ($receiver, transform) {
        return _.kotlin.mapTo_5($receiver, new Kotlin.ArrayList(0), transform);
      },
      mapTo_5: function ($receiver, result, transform) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var item = tmp$0[tmp$2];
            result.add(transform(item));
          }
        }
        return result;
      },
      flatMap_4: function ($receiver, transform) {
        return _.kotlin.flatMapTo_4($receiver, new Kotlin.ArrayList(0), transform);
      },
      flatMapTo_4: function ($receiver, result, transform) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            {
              var list = transform(element);
              {
                var tmp$3 = list.iterator();
                while (tmp$3.hasNext()) {
                  var r = tmp$3.next();
                  result.add(r);
                }
              }
            }
          }
        }
        return result;
      },
      forEach_4: function ($receiver, operation) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            operation(element);
          }
        }
      },
      fold_4: function ($receiver, initial, operation) {
        var answer = initial;
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            answer = operation(answer, element);
          }
        }
        return answer;
      },
      foldRight_4: function ($receiver, initial, operation) {
        var r = initial;
        var index = $receiver.length - 1;
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      reduce_4: function ($receiver, operation) {
        var iterator = Kotlin.arrayIterator($receiver);
        if (!iterator.hasNext()) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var result = iterator.next();
        while (iterator.hasNext()) {
          result = operation(result, iterator.next());
        }
        return result;
      },
      reduceRight_4: function ($receiver, operation) {
        var index = $receiver.length - 1;
        if (index < 0) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var r = $receiver[index--];
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      groupBy_4: function ($receiver, toKey) {
        return _.kotlin.groupByTo_4($receiver, new Kotlin.ComplexHashMap(0), toKey);
      },
      fb: function () {
        return new Kotlin.ArrayList(0);
      },
      groupByTo_4: function ($receiver, result, toKey) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            {
              var key = toKey(element);
              var list = _.kotlin.getOrPut(result, key, _.kotlin.fb);
              list.add(element);
            }
          }
        }
        return result;
      },
      drop_4: function ($receiver, n) {
        return _.kotlin.dropWhile_4($receiver, _.kotlin.countTo(n));
      },
      dropWhile_4: function ($receiver, predicate) {
        return _.kotlin.dropWhileTo_4($receiver, new Kotlin.ArrayList(0), predicate);
      },
      dropWhileTo_4: function ($receiver, result, predicate) {
        var start = true;
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            {
              if (start && predicate(element)) {
              }
               else {
                start = false;
                result.add(element);
              }
            }
          }
        }
        return result;
      },
      take_4: function ($receiver, n) {
        return _.kotlin.takeWhile_4($receiver, _.kotlin.countTo(n));
      },
      takeWhile_4: function ($receiver, predicate) {
        return _.kotlin.takeWhileTo_4($receiver, new Kotlin.ArrayList(0), predicate);
      },
      takeWhileTo_4: function ($receiver, result, predicate) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            if (predicate(element))
              result.add(element);
            else
              break;
          }
        }
        return result;
      },
      toCollection_6: function ($receiver, result) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            result.add(element);
          }
        }
        return result;
      },
      reverse_4: function ($receiver) {
        var list = _.kotlin.toCollection_6($receiver, new Kotlin.ArrayList(0));
        Kotlin.reverse(list);
        return list;
      },
      toLinkedList_4: function ($receiver) {
        return _.kotlin.toCollection_6($receiver, new Kotlin.LinkedList());
      },
      toList_5: function ($receiver) {
        return _.kotlin.toCollection_6($receiver, new Kotlin.ArrayList(0));
      },
      toSet_4: function ($receiver) {
        return _.kotlin.toCollection_6($receiver, new Kotlin.LinkedHashSet());
      },
      toSortedSet_4: function ($receiver) {
        return _.kotlin.toCollection_6($receiver, new Kotlin.TreeSet());
      },
      plus_14: function ($receiver, element) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_6($receiver, answer);
        answer.add(element);
        return answer;
      },
      plus_15: function ($receiver, iterator) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_6($receiver, answer);
        {
          var tmp$0 = iterator;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer.add(element);
          }
        }
        return answer;
      },
      plus_16: function ($receiver, collection) {
        return _.kotlin.plus_15($receiver, collection.iterator());
      },
      withIndices_4: function ($receiver) {
        return new _.kotlin.IndexIterator(Kotlin.arrayIterator($receiver));
      },
      fc: function (f, x, y) {
        var xr = f(x);
        var yr = f(y);
        return xr.compareTo(yr);
      },
      sortBy_4: function ($receiver, f) {
        var sortedList = _.kotlin.toCollection_6($receiver, new Kotlin.ArrayList(0));
        var sortBy = Kotlin.comparator(_.kotlin.fc.bind(null, f));
        Kotlin.collectionsSort(sortedList, sortBy);
        return sortedList;
      },
      appendString_4: function ($receiver, buffer, separator, prefix, postfix, limit, truncated) {
        buffer.append(prefix);
        var count = 0;
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            {
              if (++count > 1)
                buffer.append(separator);
              if (limit < 0 || count <= limit) {
                var text = element == null ? 'null' : Kotlin.toString(element);
                buffer.append(text);
              }
               else
                break;
            }
          }
        }
        if (limit >= 0 && count > limit)
          buffer.append(truncated);
        buffer.append(postfix);
      },
      makeString_5: function ($receiver, separator, prefix, postfix, limit, truncated) {
        var buffer = new Kotlin.StringBuilder();
        _.kotlin.appendString_4($receiver, buffer, separator, prefix, postfix, limit, truncated);
        return buffer.toString();
      },
      all_5: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              return false;
          }
        }
        return true;
      },
      any_5: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return true;
          }
        }
        return false;
      },
      count_7: function ($receiver, predicate) {
        var count = 0;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              count++;
          }
        }
        return count;
      },
      find_5: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return element;
          }
        }
        return null;
      },
      filter_6: function ($receiver, predicate) {
        return _.kotlin.filterTo_5($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterTo_5: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      filterNot_5: function ($receiver, predicate) {
        return _.kotlin.filterNotTo_5($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterNotTo_5: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      partition_5: function ($receiver, predicate) {
        var first = new Kotlin.ArrayList(0);
        var second = new Kotlin.ArrayList(0);
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element)) {
              first.add(element);
            }
             else {
              second.add(element);
            }
          }
        }
        return new _.kotlin.Pair(first, second);
      },
      map_7: function ($receiver, transform) {
        return _.kotlin.mapTo_6($receiver, new Kotlin.ArrayList(0), transform);
      },
      mapTo_6: function ($receiver, result, transform) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var item = tmp$0.next();
            result.add(transform(item));
          }
        }
        return result;
      },
      flatMap_5: function ($receiver, transform) {
        return _.kotlin.flatMapTo_5($receiver, new Kotlin.ArrayList(0), transform);
      },
      flatMapTo_5: function ($receiver, result, transform) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var list = transform(element);
            {
              var tmp$1 = list.iterator();
              while (tmp$1.hasNext()) {
                var r = tmp$1.next();
                result.add(r);
              }
            }
          }
        }
        return result;
      },
      forEach_5: function ($receiver, operation) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            operation(element);
          }
        }
      },
      fold_5: function ($receiver, initial, operation) {
        var answer = initial;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer = operation(answer, element);
          }
        }
        return answer;
      },
      foldRight_5: function ($receiver, initial, operation) {
        var r = initial;
        var index = $receiver.length - 1;
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      reduce_5: function ($receiver, operation) {
        var iterator = Kotlin.arrayIterator($receiver);
        if (!iterator.hasNext()) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var result = iterator.next();
        while (iterator.hasNext()) {
          result = operation(result, iterator.next());
        }
        return result;
      },
      reduceRight_5: function ($receiver, operation) {
        var index = $receiver.length - 1;
        if (index < 0) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var r = $receiver[index--];
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      groupBy_5: function ($receiver, toKey) {
        return _.kotlin.groupByTo_5($receiver, new Kotlin.ComplexHashMap(0), toKey);
      },
      fd: function () {
        return new Kotlin.ArrayList(0);
      },
      groupByTo_5: function ($receiver, result, toKey) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var key = toKey(element);
            var list = _.kotlin.getOrPut(result, key, _.kotlin.fd);
            list.add(element);
          }
        }
        return result;
      },
      drop_5: function ($receiver, n) {
        return _.kotlin.dropWhile_5($receiver, _.kotlin.countTo(n));
      },
      dropWhile_5: function ($receiver, predicate) {
        return _.kotlin.dropWhileTo_5($receiver, new Kotlin.ArrayList(0), predicate);
      },
      dropWhileTo_5: function ($receiver, result, predicate) {
        var start = true;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (start && predicate(element)) {
            }
             else {
              start = false;
              result.add(element);
            }
          }
        }
        return result;
      },
      take_5: function ($receiver, n) {
        return _.kotlin.takeWhile_5($receiver, _.kotlin.countTo(n));
      },
      takeWhile_5: function ($receiver, predicate) {
        return _.kotlin.takeWhileTo_5($receiver, new Kotlin.ArrayList(0), predicate);
      },
      takeWhileTo_5: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
            else
              break;
          }
        }
        return result;
      },
      toCollection_7: function ($receiver, result) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            result.add(element);
          }
        }
        return result;
      },
      reverse_5: function ($receiver) {
        var list = _.kotlin.toCollection_7($receiver, new Kotlin.ArrayList(0));
        Kotlin.reverse(list);
        return list;
      },
      toLinkedList_5: function ($receiver) {
        return _.kotlin.toCollection_7($receiver, new Kotlin.LinkedList());
      },
      toList_6: function ($receiver) {
        return _.kotlin.toCollection_7($receiver, new Kotlin.ArrayList(0));
      },
      toSet_5: function ($receiver) {
        return _.kotlin.toCollection_7($receiver, new Kotlin.LinkedHashSet());
      },
      toSortedSet_5: function ($receiver) {
        return _.kotlin.toCollection_7($receiver, new Kotlin.TreeSet());
      },
      plus_17: function ($receiver, element) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_7($receiver, answer);
        answer.add(element);
        return answer;
      },
      plus_18: function ($receiver, iterator) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_7($receiver, answer);
        {
          var tmp$0 = iterator;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer.add(element);
          }
        }
        return answer;
      },
      plus_19: function ($receiver, collection) {
        return _.kotlin.plus_18($receiver, collection.iterator());
      },
      withIndices_5: function ($receiver) {
        return new _.kotlin.IndexIterator(Kotlin.arrayIterator($receiver));
      },
      fe: function (f, x, y) {
        var xr = f(x);
        var yr = f(y);
        return xr.compareTo(yr);
      },
      sortBy_5: function ($receiver, f) {
        var sortedList = _.kotlin.toCollection_7($receiver, new Kotlin.ArrayList(0));
        var sortBy = Kotlin.comparator(_.kotlin.fe.bind(null, f));
        Kotlin.collectionsSort(sortedList, sortBy);
        return sortedList;
      },
      appendString_5: function ($receiver, buffer, separator, prefix, postfix, limit, truncated) {
        buffer.append(prefix);
        var count = 0;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (++count > 1)
              buffer.append(separator);
            if (limit < 0 || count <= limit) {
              var text = element == null ? 'null' : Kotlin.toString(element);
              buffer.append(text);
            }
             else
              break;
          }
        }
        if (limit >= 0 && count > limit)
          buffer.append(truncated);
        buffer.append(postfix);
      },
      makeString_6: function ($receiver, separator, prefix, postfix, limit, truncated) {
        var buffer = new Kotlin.StringBuilder();
        _.kotlin.appendString_5($receiver, buffer, separator, prefix, postfix, limit, truncated);
        return buffer.toString();
      },
      get_size_0: function ($receiver) {
        return $receiver.size();
      },
      get_empty: function ($receiver) {
        return $receiver.isEmpty();
      },
      set: function ($receiver, key, value) {
        return $receiver.put(key, value);
      },
      orEmpty_0: function ($receiver) {
        var tmp$0;
        return $receiver != null ? $receiver : (tmp$0 = Kotlin.emptyMap()) != null ? tmp$0 : Kotlin.throwNPE();
      },
      get_key: function ($receiver) {
        return $receiver.getKey();
      },
      get_value: function ($receiver) {
        return $receiver.getValue();
      },
      component1: function ($receiver) {
        return $receiver.getKey();
      },
      component2: function ($receiver) {
        return $receiver.getValue();
      },
      getOrElse: function ($receiver, key, defaultValue) {
        if ($receiver.containsKey(key)) {
          var tmp$0;
          return (tmp$0 = $receiver.get(key)) != null ? tmp$0 : Kotlin.throwNPE();
        }
         else {
          return defaultValue();
        }
      },
      getOrPut: function ($receiver, key, defaultValue) {
        if ($receiver.containsKey(key)) {
          var tmp$0;
          return (tmp$0 = $receiver.get(key)) != null ? tmp$0 : Kotlin.throwNPE();
        }
         else {
          var answer = defaultValue();
          $receiver.put(key, answer);
          return answer;
        }
      },
      iterator_1: function ($receiver) {
        var entrySet = $receiver.entrySet();
        return entrySet.iterator();
      },
      mapTo: function ($receiver, result, transform) {
        {
          var tmp$0 = _.kotlin.iterator_1($receiver);
          while (tmp$0.hasNext()) {
            var item = tmp$0.next();
            result.add(transform(item));
          }
        }
        return result;
      },
      mapValuesTo: function ($receiver, result, transform) {
        {
          var tmp$0 = _.kotlin.iterator_1($receiver);
          while (tmp$0.hasNext()) {
            var e = tmp$0.next();
            var newValue = transform(e);
            result.put(_.kotlin.get_key(e), newValue);
          }
        }
        return result;
      },
      putAll: function ($receiver, values) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = values, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var v = tmp$0[tmp$2];
            {
              $receiver.put(v.get_first(), v.get_second());
            }
          }
        }
      },
      toMap: function ($receiver, map) {
        map.putAll($receiver);
        return map;
      },
      map_8: function ($receiver, transform) {
        return _.kotlin.mapTo($receiver, new Kotlin.ArrayList(_.kotlin.get_size_0($receiver)), transform);
      },
      mapValues_0: function ($receiver, transform) {
        return _.kotlin.mapValuesTo($receiver, new Kotlin.ComplexHashMap(_.kotlin.get_size_0($receiver)), transform);
      },
      iterate: function (nextFunction) {
        return new _.kotlin.FunctionIterator(nextFunction);
      },
      FilterIterator: Kotlin.createClass(classes.co, /** @lends _.kotlin.FilterIterator.prototype */ {
        initialize: function (iterator, predicate) {
          this.$iterator = iterator;
          this.$predicate = predicate;
          this.super_init();
        },
        get_iterator: function () {
          return this.$iterator;
        },
        get_predicate: function () {
          return this.$predicate;
        },
        computeNext: function () {
          while (this.get_iterator().hasNext()) {
            var next = this.get_iterator().next();
            if (this.get_predicate()(next)) {
              this.setNext(next);
              return;
            }
          }
          this.done();
        }
      }),
      FilterNotNullIterator: Kotlin.createClass(classes.co, /** @lends _.kotlin.FilterNotNullIterator.prototype */ {
        initialize: function (iterator) {
          this.$iterator = iterator;
          this.super_init();
        },
        get_iterator: function () {
          return this.$iterator;
        },
        computeNext: function () {
          if (this.get_iterator() != null) {
            while (this.get_iterator().hasNext()) {
              var next = this.get_iterator().next();
              if (next != null) {
                this.setNext(next);
                return;
              }
            }
          }
          this.done();
        }
      }),
      MapIterator: Kotlin.createClass(classes.co, /** @lends _.kotlin.MapIterator.prototype */ {
        initialize: function (iterator, transform) {
          this.$iterator = iterator;
          this.$transform = transform;
          this.super_init();
        },
        get_iterator: function () {
          return this.$iterator;
        },
        get_transform: function () {
          return this.$transform;
        },
        computeNext: function () {
          if (this.get_iterator().hasNext()) {
            this.setNext(this.get_transform()(this.get_iterator().next()));
          }
           else {
            this.done();
          }
        }
      }),
      FlatMapIterator: Kotlin.createClass(classes.co, /** @lends _.kotlin.FlatMapIterator.prototype */ {
        initialize: function (iterator, transform) {
          this.$iterator = iterator;
          this.$transform = transform;
          this.super_init();
          this.$transformed = _.kotlin.iterate(function () {
            return null;
          });
        },
        get_iterator: function () {
          return this.$iterator;
        },
        get_transform: function () {
          return this.$transform;
        },
        get_transformed: function () {
          return this.$transformed;
        },
        set_transformed: function (tmp$0) {
          this.$transformed = tmp$0;
        },
        computeNext: function () {
          while (true) {
            if (this.get_transformed().hasNext()) {
              this.setNext(this.get_transformed().next());
              return;
            }
            if (this.get_iterator().hasNext()) {
              this.set_transformed(this.get_transform()(this.get_iterator().next()));
            }
             else {
              this.done();
              return;
            }
          }
        }
      }),
      TakeWhileIterator: Kotlin.createClass(classes.co, /** @lends _.kotlin.TakeWhileIterator.prototype */ {
        initialize: function (iterator, predicate) {
          this.$iterator = iterator;
          this.$predicate = predicate;
          this.super_init();
        },
        get_iterator: function () {
          return this.$iterator;
        },
        get_predicate: function () {
          return this.$predicate;
        },
        computeNext: function () {
          if (this.get_iterator().hasNext()) {
            var item = this.get_iterator().next();
            if (this.get_predicate()(item)) {
              this.setNext(item);
              return;
            }
          }
          this.done();
        }
      }),
      FunctionIterator: Kotlin.createClass(classes.co, /** @lends _.kotlin.FunctionIterator.prototype */ {
        initialize: function (nextFunction) {
          this.$nextFunction = nextFunction;
          this.super_init();
        },
        get_nextFunction: function () {
          return this.$nextFunction;
        },
        computeNext: function () {
          var next = this.get_nextFunction()();
          if (next == null) {
            this.done();
          }
           else {
            this.setNext(next);
          }
        }
      }),
      CompositeIterator: Kotlin.createClass(classes.co, /** @lends _.kotlin.CompositeIterator.prototype */ {
        initialize: function (iterators) {
          this.super_init();
          this.$iteratorsIter = Kotlin.arrayIterator(iterators);
          this.$currentIter = null;
        },
        get_iteratorsIter: function () {
          return this.$iteratorsIter;
        },
        get_currentIter: function () {
          return this.$currentIter;
        },
        set_currentIter: function (tmp$0) {
          this.$currentIter = tmp$0;
        },
        computeNext: function () {
          while (true) {
            if (this.get_currentIter() == null) {
              if (this.get_iteratorsIter().hasNext()) {
                this.set_currentIter(this.get_iteratorsIter().next());
              }
               else {
                this.done();
                return;
              }
            }
            var iter = this.get_currentIter();
            if (iter != null) {
              if (iter.hasNext()) {
                this.setNext(iter.next());
                return;
              }
               else {
                this.set_currentIter(null);
              }
            }
          }
        }
      }),
      SingleIterator: Kotlin.createClass(classes.co, /** @lends _.kotlin.SingleIterator.prototype */ {
        initialize: function (value) {
          this.$value = value;
          this.super_init();
          this.$first = true;
        },
        get_value: function () {
          return this.$value;
        },
        get_first: function () {
          return this.$first;
        },
        set_first: function (tmp$0) {
          this.$first = tmp$0;
        },
        computeNext: function () {
          if (this.get_first()) {
            this.set_first(false);
            this.setNext(this.get_value());
          }
           else {
            this.done();
          }
        }
      }),
      IndexIterator: Kotlin.createClass(Kotlin.Iterator, /** @lends _.kotlin.IndexIterator.prototype */ {
        initialize: function (iterator) {
          this.$iterator = iterator;
          this.$index = 0;
        },
        get_iterator: function () {
          return this.$iterator;
        },
        get_index: function () {
          return this.$index;
        },
        set_index: function (tmp$0) {
          this.$index = tmp$0;
        },
        next: function () {
          var tmp$0, tmp$1;
          return new _.kotlin.Pair((tmp$0 = this.get_index(), tmp$1 = tmp$0, this.set_index(tmp$0 + 1), tmp$1), this.get_iterator().next());
        },
        hasNext: function () {
          return this.get_iterator().hasNext();
        }
      }),
      all_6: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              return false;
          }
        }
        return true;
      },
      any_6: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return true;
          }
        }
        return false;
      },
      count_8: function ($receiver, predicate) {
        var count = 0;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              count++;
          }
        }
        return count;
      },
      find_6: function ($receiver, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return element;
          }
        }
        return null;
      },
      filter_7: function ($receiver, predicate) {
        return _.kotlin.filterTo_6($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterTo_6: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      filterNot_6: function ($receiver, predicate) {
        return _.kotlin.filterNotTo_6($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterNotTo_6: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      partition_6: function ($receiver, predicate) {
        var first = new Kotlin.ArrayList(0);
        var second = new Kotlin.ArrayList(0);
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element)) {
              first.add(element);
            }
             else {
              second.add(element);
            }
          }
        }
        return new _.kotlin.Pair(first, second);
      },
      map_9: function ($receiver, transform) {
        return _.kotlin.mapTo_7($receiver, new Kotlin.ArrayList(0), transform);
      },
      mapTo_7: function ($receiver, result, transform) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var item = tmp$0.next();
            result.add(transform(item));
          }
        }
        return result;
      },
      flatMap_6: function ($receiver, transform) {
        return _.kotlin.flatMapTo_6($receiver, new Kotlin.ArrayList(0), transform);
      },
      flatMapTo_6: function ($receiver, result, transform) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var list = transform(element);
            {
              var tmp$1 = list.iterator();
              while (tmp$1.hasNext()) {
                var r = tmp$1.next();
                result.add(r);
              }
            }
          }
        }
        return result;
      },
      forEach_6: function ($receiver, operation) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            operation(element);
          }
        }
      },
      fold_6: function ($receiver, initial, operation) {
        var answer = initial;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer = operation(answer, element);
          }
        }
        return answer;
      },
      foldRight_6: function ($receiver, initial, operation) {
        var r = initial;
        var index = $receiver.length - 1;
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      reduce_6: function ($receiver, operation) {
        var iterator = Kotlin.arrayIterator($receiver);
        if (!iterator.hasNext()) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var result = iterator.next();
        while (iterator.hasNext()) {
          result = operation(result, iterator.next());
        }
        return result;
      },
      reduceRight_6: function ($receiver, operation) {
        var index = $receiver.length - 1;
        if (index < 0) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var r = $receiver[index--];
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      groupBy_6: function ($receiver, toKey) {
        return _.kotlin.groupByTo_6($receiver, new Kotlin.ComplexHashMap(0), toKey);
      },
      ff: function () {
        return new Kotlin.ArrayList(0);
      },
      groupByTo_6: function ($receiver, result, toKey) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var key = toKey(element);
            var list = _.kotlin.getOrPut(result, key, _.kotlin.ff);
            list.add(element);
          }
        }
        return result;
      },
      drop_6: function ($receiver, n) {
        return _.kotlin.dropWhile_6($receiver, _.kotlin.countTo(n));
      },
      dropWhile_6: function ($receiver, predicate) {
        return _.kotlin.dropWhileTo_6($receiver, new Kotlin.ArrayList(0), predicate);
      },
      dropWhileTo_6: function ($receiver, result, predicate) {
        var start = true;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (start && predicate(element)) {
            }
             else {
              start = false;
              result.add(element);
            }
          }
        }
        return result;
      },
      take_6: function ($receiver, n) {
        return _.kotlin.takeWhile_6($receiver, _.kotlin.countTo(n));
      },
      takeWhile_6: function ($receiver, predicate) {
        return _.kotlin.takeWhileTo_6($receiver, new Kotlin.ArrayList(0), predicate);
      },
      takeWhileTo_6: function ($receiver, result, predicate) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
            else
              break;
          }
        }
        return result;
      },
      toCollection_8: function ($receiver, result) {
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            result.add(element);
          }
        }
        return result;
      },
      reverse_6: function ($receiver) {
        var list = _.kotlin.toCollection_8($receiver, new Kotlin.ArrayList(0));
        Kotlin.reverse(list);
        return list;
      },
      toLinkedList_6: function ($receiver) {
        return _.kotlin.toCollection_8($receiver, new Kotlin.LinkedList());
      },
      toList_7: function ($receiver) {
        return _.kotlin.toCollection_8($receiver, new Kotlin.ArrayList(0));
      },
      toSet_6: function ($receiver) {
        return _.kotlin.toCollection_8($receiver, new Kotlin.LinkedHashSet());
      },
      toSortedSet_6: function ($receiver) {
        return _.kotlin.toCollection_8($receiver, new Kotlin.TreeSet());
      },
      plus_20: function ($receiver, element) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_8($receiver, answer);
        answer.add(element);
        return answer;
      },
      plus_21: function ($receiver, iterator) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_8($receiver, answer);
        {
          var tmp$0 = iterator;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer.add(element);
          }
        }
        return answer;
      },
      plus_22: function ($receiver, collection) {
        return _.kotlin.plus_21($receiver, collection.iterator());
      },
      withIndices_6: function ($receiver) {
        return new _.kotlin.IndexIterator(Kotlin.arrayIterator($receiver));
      },
      fg: function (f, x, y) {
        var xr = f(x);
        var yr = f(y);
        return xr.compareTo(yr);
      },
      sortBy_6: function ($receiver, f) {
        var sortedList = _.kotlin.toCollection_8($receiver, new Kotlin.ArrayList(0));
        var sortBy = Kotlin.comparator(_.kotlin.fg.bind(null, f));
        Kotlin.collectionsSort(sortedList, sortBy);
        return sortedList;
      },
      appendString_6: function ($receiver, buffer, separator, prefix, postfix, limit, truncated) {
        buffer.append(prefix);
        var count = 0;
        {
          var tmp$0 = Kotlin.arrayIterator($receiver);
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (++count > 1)
              buffer.append(separator);
            if (limit < 0 || count <= limit) {
              var text = element == null ? 'null' : Kotlin.toString(element);
              buffer.append(text);
            }
             else
              break;
          }
        }
        if (limit >= 0 && count > limit)
          buffer.append(truncated);
        buffer.append(postfix);
      },
      makeString_7: function ($receiver, separator, prefix, postfix, limit, truncated) {
        var buffer = new Kotlin.StringBuilder();
        _.kotlin.appendString_6($receiver, buffer, separator, prefix, postfix, limit, truncated);
        return buffer.toString();
      },
      all_7: function ($receiver, predicate) {
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              return false;
          }
        }
        return true;
      },
      any_7: function ($receiver, predicate) {
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return true;
          }
        }
        return false;
      },
      count_9: function ($receiver, predicate) {
        var count = 0;
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              count++;
          }
        }
        return count;
      },
      find_7: function ($receiver, predicate) {
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return element;
          }
        }
        return null;
      },
      filterTo_7: function ($receiver, result, predicate) {
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      filterNotTo_7: function ($receiver, result, predicate) {
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      filterNotNullTo: function ($receiver, result) {
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (element != null)
              result.add(element);
          }
        }
        return result;
      },
      partition_7: function ($receiver, predicate) {
        var first = new Kotlin.ArrayList(0);
        var second = new Kotlin.ArrayList(0);
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element)) {
              first.add(element);
            }
             else {
              second.add(element);
            }
          }
        }
        return new _.kotlin.Pair(first, second);
      },
      mapTo_8: function ($receiver, result, transform) {
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var item = tmp$0.next();
            result.add(transform(item));
          }
        }
        return result;
      },
      flatMapTo_7: function ($receiver, result, transform) {
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var list = transform(element);
            {
              var tmp$1 = list.iterator();
              while (tmp$1.hasNext()) {
                var r = tmp$1.next();
                result.add(r);
              }
            }
          }
        }
        return result;
      },
      forEach_7: function ($receiver, operation) {
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            operation(element);
          }
        }
      },
      fold_7: function ($receiver, initial, operation) {
        var answer = initial;
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer = operation(answer, element);
          }
        }
        return answer;
      },
      reduce_7: function ($receiver, operation) {
        var iterator = $receiver.iterator();
        if (!iterator.hasNext()) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var result = iterator.next();
        while (iterator.hasNext()) {
          result = operation(result, iterator.next());
        }
        return result;
      },
      groupBy_7: function ($receiver, toKey) {
        return _.kotlin.groupByTo_7($receiver, new Kotlin.ComplexHashMap(0), toKey);
      },
      fh: function () {
        return new Kotlin.ArrayList(0);
      },
      groupByTo_7: function ($receiver, result, toKey) {
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var key = toKey(element);
            var list = _.kotlin.getOrPut(result, key, _.kotlin.fh);
            list.add(element);
          }
        }
        return result;
      },
      drop_7: function ($receiver, n) {
        return _.kotlin.dropWhile_7($receiver, _.kotlin.countTo(n));
      },
      dropWhile_7: function ($receiver, predicate) {
        return _.kotlin.dropWhileTo_7($receiver, new Kotlin.ArrayList(0), predicate);
      },
      dropWhileTo_7: function ($receiver, result, predicate) {
        var start = true;
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (start && predicate(element)) {
            }
             else {
              start = false;
              result.add(element);
            }
          }
        }
        return result;
      },
      takeWhileTo_7: function ($receiver, result, predicate) {
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
            else
              break;
          }
        }
        return result;
      },
      toCollection_5: function ($receiver, result) {
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            result.add(element);
          }
        }
        return result;
      },
      reverse_7: function ($receiver) {
        var list = _.kotlin.toCollection_5($receiver, new Kotlin.ArrayList(0));
        Kotlin.reverse(list);
        return list;
      },
      toLinkedList_7: function ($receiver) {
        return _.kotlin.toCollection_5($receiver, new Kotlin.LinkedList());
      },
      toList_2: function ($receiver) {
        return _.kotlin.toCollection_5($receiver, new Kotlin.ArrayList(0));
      },
      toSet_7: function ($receiver) {
        return _.kotlin.toCollection_5($receiver, new Kotlin.LinkedHashSet());
      },
      toSortedSet_7: function ($receiver) {
        return _.kotlin.toCollection_5($receiver, new Kotlin.TreeSet());
      },
      withIndices_7: function ($receiver) {
        return new _.kotlin.IndexIterator($receiver.iterator());
      },
      fi: function (f, x, y) {
        var xr = f(x);
        var yr = f(y);
        return xr.compareTo(yr);
      },
      sortBy_7: function ($receiver, f) {
        var sortedList = _.kotlin.toCollection_5($receiver, new Kotlin.ArrayList(0));
        var sortBy = Kotlin.comparator(_.kotlin.fi.bind(null, f));
        Kotlin.collectionsSort(sortedList, sortBy);
        return sortedList;
      },
      appendString_7: function ($receiver, buffer, separator, prefix, postfix, limit, truncated) {
        buffer.append(prefix);
        var count = 0;
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (++count > 1)
              buffer.append(separator);
            if (limit < 0 || count <= limit) {
              var text = element == null ? 'null' : Kotlin.toString(element);
              buffer.append(text);
            }
             else
              break;
          }
        }
        if (limit >= 0 && count > limit)
          buffer.append(truncated);
        buffer.append(postfix);
      },
      makeString: function ($receiver, separator, prefix, postfix, limit, truncated) {
        var buffer = new Kotlin.StringBuilder();
        _.kotlin.appendString_7($receiver, buffer, separator, prefix, postfix, limit, truncated);
        return buffer.toString();
      },
      notEmpty_0: function ($receiver) {
        return !_.kotlin.isEmpty($receiver);
      },
      isEmpty: function ($receiver) {
        return $receiver.length === 0;
      },
      orEmpty_1: function ($receiver) {
        return $receiver != null ? $receiver : [];
      },
      get_lastIndex: function ($receiver) {
        return $receiver.length - 1;
      },
      get_lastIndex_0: function ($receiver) {
        return $receiver.length - 1;
      },
      get_lastIndex_1: function ($receiver) {
        return $receiver.length - 1;
      },
      get_lastIndex_2: function ($receiver) {
        return $receiver.length - 1;
      },
      get_lastIndex_3: function ($receiver) {
        return $receiver.length - 1;
      },
      get_lastIndex_4: function ($receiver) {
        return $receiver.length - 1;
      },
      get_lastIndex_5: function ($receiver) {
        return $receiver.length - 1;
      },
      get_lastIndex_6: function ($receiver) {
        return $receiver.length - 1;
      },
      get_lastIndex_7: function ($receiver) {
        return $receiver.length - 1;
      },
      get_size_1: function ($receiver) {
        return $receiver.size();
      },
      get_empty_0: function ($receiver) {
        return $receiver.isEmpty();
      },
      get_indices: function ($receiver) {
        return new Kotlin.NumberRange(0, _.kotlin.get_size_1($receiver) - 1);
      },
      get_indices_0: function ($receiver) {
        return new Kotlin.NumberRange(0, $receiver - 1);
      },
      notEmpty_1: function ($receiver) {
        return !$receiver.isEmpty();
      },
      orEmpty_2: function ($receiver) {
        var tmp$0;
        return $receiver != null ? $receiver : (tmp$0 = Kotlin.emptyList()) != null ? tmp$0 : Kotlin.throwNPE();
      },
      toSortedList: function ($receiver) {
        return _.kotlin.sort(_.kotlin.toCollection_5($receiver, new Kotlin.ArrayList(0)));
      },
      toSortedList_0: function ($receiver, comparator) {
        return _.kotlin.sort_0(_.kotlin.toList_2($receiver), comparator);
      },
      orEmpty_3: function ($receiver) {
        var tmp$0;
        return $receiver != null ? $receiver : (tmp$0 = Kotlin.emptyList()) != null ? tmp$0 : Kotlin.throwNPE();
      },
      get_first: function ($receiver) {
        return _.kotlin.get_head($receiver);
      },
      get_last: function ($receiver) {
        var s = _.kotlin.get_size_1($receiver);
        return s > 0 ? $receiver.get(s - 1) : null;
      },
      get_lastIndex_8: function ($receiver) {
        return _.kotlin.get_size_1($receiver) - 1;
      },
      get_head: function ($receiver) {
        return $receiver.get(0);
      },
      get_tail: function ($receiver) {
        return _.kotlin.drop_7($receiver, 1);
      },
      require: function (value, message) {
        if (!value) {
          throw new Kotlin.IllegalArgumentException(Kotlin.toString(message));
        }
      },
      require_0: function (value, lazyMessage) {
        if (!value) {
          var message = lazyMessage();
          throw new Kotlin.IllegalArgumentException(message.toString());
        }
      },
      requireNotNull: function (value, message) {
        if (value == null) {
          throw new Kotlin.IllegalArgumentException(Kotlin.toString(message));
        }
         else {
          return value;
        }
      },
      check: function (value, message) {
        if (!value) {
          throw new Kotlin.IllegalStateException(Kotlin.toString(message));
        }
      },
      check_0: function (value, lazyMessage) {
        if (!value) {
          var message = lazyMessage();
          throw new Kotlin.IllegalStateException(message.toString());
        }
      },
      checkNotNull: function (value, message) {
        if (value == null) {
          throw new Kotlin.IllegalStateException(message);
        }
         else {
          return value;
        }
      },
      filter_8: function ($receiver, predicate) {
        return new _.kotlin.FilterIterator($receiver, predicate);
      },
      fj: function (predicate, it) {
        return !predicate(it);
      },
      filterNot_7: function ($receiver, predicate) {
        return _.kotlin.filter_8($receiver, _.kotlin.fj.bind(null, predicate));
      },
      filterNotNull: function ($receiver) {
        return new _.kotlin.FilterNotNullIterator($receiver);
      },
      map_10: function ($receiver, transform) {
        return new _.kotlin.MapIterator($receiver, transform);
      },
      flatMap_7: function ($receiver, transform) {
        return new _.kotlin.FlatMapIterator($receiver, transform);
      },
      fk: function (it) {
        if (it == null)
          throw new Kotlin.IllegalArgumentException('null element in iterator ' + $receiver.toString());
        else
          return it;
      },
      requireNoNulls: function ($receiver) {
        return _.kotlin.map_10($receiver, _.kotlin.fk);
      },
      fl: function (count, it) {
        return --count.v >= 0;
      },
      take_7: function ($receiver, n) {
        var count = {v: n};
        return _.kotlin.takeWhile_7($receiver, _.kotlin.fl.bind(null, count));
      },
      takeWhile_7: function ($receiver, predicate) {
        return new _.kotlin.TakeWhileIterator($receiver, predicate);
      },
      plus_23: function ($receiver, element) {
        return new _.kotlin.CompositeIterator([$receiver, new _.kotlin.SingleIterator(element)]);
      },
      plus_24: function ($receiver, iterator) {
        return new _.kotlin.CompositeIterator([$receiver, iterator]);
      },
      plus_25: function ($receiver, collection) {
        return _.kotlin.plus_24($receiver, collection.iterator());
      },
      all_8: function ($receiver, predicate) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            if (!predicate(element))
              return false;
          }
        }
        return true;
      },
      any_8: function ($receiver, predicate) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            if (predicate(element))
              return true;
          }
        }
        return false;
      },
      count_10: function ($receiver, predicate) {
        var count = 0;
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            if (predicate(element))
              count++;
          }
        }
        return count;
      },
      find_8: function ($receiver, predicate) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            if (predicate(element))
              return element;
          }
        }
        return null;
      },
      filter_9: function ($receiver, predicate) {
        return _.kotlin.filterTo_8($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterTo_8: function ($receiver, result, predicate) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            if (predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      filterNot_8: function ($receiver, predicate) {
        return _.kotlin.filterNotTo_8($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterNotTo_8: function ($receiver, result, predicate) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            if (!predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      filterNotNull_0: function ($receiver) {
        return _.kotlin.filterNotNullTo_0($receiver, new Kotlin.ArrayList(0));
      },
      filterNotNullTo_0: function ($receiver, result) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            if (element != null)
              result.add(element);
          }
        }
        return result;
      },
      partition_8: function ($receiver, predicate) {
        var first = new Kotlin.ArrayList(0);
        var second = new Kotlin.ArrayList(0);
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            {
              if (predicate(element)) {
                first.add(element);
              }
               else {
                second.add(element);
              }
            }
          }
        }
        return new _.kotlin.Pair(first, second);
      },
      map_11: function ($receiver, transform) {
        return _.kotlin.mapTo_9($receiver, new Kotlin.ArrayList(0), transform);
      },
      mapTo_9: function ($receiver, result, transform) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var item = tmp$0[tmp$2];
            result.add(transform(item));
          }
        }
        return result;
      },
      flatMap_8: function ($receiver, transform) {
        return _.kotlin.flatMapTo_8($receiver, new Kotlin.ArrayList(0), transform);
      },
      flatMapTo_8: function ($receiver, result, transform) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            {
              var list = transform(element);
              {
                var tmp$3 = list.iterator();
                while (tmp$3.hasNext()) {
                  var r = tmp$3.next();
                  result.add(r);
                }
              }
            }
          }
        }
        return result;
      },
      forEach_8: function ($receiver, operation) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            operation(element);
          }
        }
      },
      fold_8: function ($receiver, initial, operation) {
        var answer = initial;
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            answer = operation(answer, element);
          }
        }
        return answer;
      },
      foldRight_7: function ($receiver, initial, operation) {
        var r = initial;
        var index = $receiver.length - 1;
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      reduce_8: function ($receiver, operation) {
        var iterator = Kotlin.arrayIterator($receiver);
        if (!iterator.hasNext()) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var result = iterator.next();
        while (iterator.hasNext()) {
          result = operation(result, iterator.next());
        }
        return result;
      },
      reduceRight_7: function ($receiver, operation) {
        var index = $receiver.length - 1;
        if (index < 0) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var r = $receiver[index--];
        while (index >= 0) {
          r = operation($receiver[index--], r);
        }
        return r;
      },
      groupBy_8: function ($receiver, toKey) {
        return _.kotlin.groupByTo_8($receiver, new Kotlin.ComplexHashMap(0), toKey);
      },
      fm: function () {
        return new Kotlin.ArrayList(0);
      },
      groupByTo_8: function ($receiver, result, toKey) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            {
              var key = toKey(element);
              var list = _.kotlin.getOrPut(result, key, _.kotlin.fm);
              list.add(element);
            }
          }
        }
        return result;
      },
      drop_8: function ($receiver, n) {
        return _.kotlin.dropWhile_8($receiver, _.kotlin.countTo(n));
      },
      dropWhile_8: function ($receiver, predicate) {
        return _.kotlin.dropWhileTo_8($receiver, new Kotlin.ArrayList(0), predicate);
      },
      dropWhileTo_8: function ($receiver, result, predicate) {
        var start = true;
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            {
              if (start && predicate(element)) {
              }
               else {
                start = false;
                result.add(element);
              }
            }
          }
        }
        return result;
      },
      take_8: function ($receiver, n) {
        return _.kotlin.takeWhile_8($receiver, _.kotlin.countTo(n));
      },
      takeWhile_8: function ($receiver, predicate) {
        return _.kotlin.takeWhileTo_8($receiver, new Kotlin.ArrayList(0), predicate);
      },
      takeWhileTo_8: function ($receiver, result, predicate) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            if (predicate(element))
              result.add(element);
            else
              break;
          }
        }
        return result;
      },
      toCollection_9: function ($receiver, result) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            result.add(element);
          }
        }
        return result;
      },
      reverse_8: function ($receiver) {
        var list = _.kotlin.toCollection_9($receiver, new Kotlin.ArrayList(0));
        Kotlin.reverse(list);
        return list;
      },
      toLinkedList_8: function ($receiver) {
        return _.kotlin.toCollection_9($receiver, new Kotlin.LinkedList());
      },
      toList_8: function ($receiver) {
        return _.kotlin.toCollection_9($receiver, new Kotlin.ArrayList(0));
      },
      toSet_8: function ($receiver) {
        return _.kotlin.toCollection_9($receiver, new Kotlin.LinkedHashSet());
      },
      toSortedSet_8: function ($receiver) {
        return _.kotlin.toCollection_9($receiver, new Kotlin.TreeSet());
      },
      requireNoNulls_0: function ($receiver) {
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            {
              if (element == null) {
                throw new Kotlin.IllegalArgumentException('null element found in ' + $receiver.toString());
              }
            }
          }
        }
        return $receiver != null ? $receiver : Kotlin.throwNPE();
      },
      plus_26: function ($receiver, element) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_9($receiver, answer);
        answer.add(element);
        return answer;
      },
      plus_27: function ($receiver, iterator) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_9($receiver, answer);
        {
          var tmp$0 = iterator;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer.add(element);
          }
        }
        return answer;
      },
      plus_28: function ($receiver, collection) {
        return _.kotlin.plus_27($receiver, collection.iterator());
      },
      withIndices_8: function ($receiver) {
        return new _.kotlin.IndexIterator(Kotlin.arrayIterator($receiver));
      },
      fn: function (f, x, y) {
        var xr = f(x);
        var yr = f(y);
        return xr.compareTo(yr);
      },
      sortBy_8: function ($receiver, f) {
        var sortedList = _.kotlin.toCollection_9($receiver, new Kotlin.ArrayList(0));
        var sortBy = Kotlin.comparator(_.kotlin.fn.bind(null, f));
        Kotlin.collectionsSort(sortedList, sortBy);
        return sortedList;
      },
      appendString_8: function ($receiver, buffer, separator, prefix, postfix, limit, truncated) {
        buffer.append(prefix);
        var count = 0;
        var tmp$0, tmp$1, tmp$2;
        {
          tmp$0 = $receiver, tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
            var element = tmp$0[tmp$2];
            {
              if (++count > 1)
                buffer.append(separator);
              if (limit < 0 || count <= limit) {
                var text = element == null ? 'null' : Kotlin.toString(element);
                buffer.append(text);
              }
               else
                break;
            }
          }
        }
        if (limit >= 0 && count > limit)
          buffer.append(truncated);
        buffer.append(postfix);
      },
      makeString_8: function ($receiver, separator, prefix, postfix, limit, truncated) {
        var buffer = new Kotlin.StringBuilder();
        _.kotlin.appendString_8($receiver, buffer, separator, prefix, postfix, limit, truncated);
        return buffer.toString();
      },
      filter_2: function ($receiver, predicate) {
        return _.kotlin.filterTo_7($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterNot_9: function ($receiver, predicate) {
        return _.kotlin.filterNotTo_7($receiver, new Kotlin.ArrayList(0), predicate);
      },
      filterNotNull_1: function ($receiver) {
        return _.kotlin.filterNotNullTo($receiver, new Kotlin.ArrayList(0));
      },
      map_3: function ($receiver, transform) {
        return _.kotlin.mapTo_8($receiver, new Kotlin.ArrayList(0), transform);
      },
      flatMap_9: function ($receiver, transform) {
        return _.kotlin.flatMapTo_7($receiver, new Kotlin.ArrayList(0), transform);
      },
      take_9: function ($receiver, n) {
        return _.kotlin.takeWhile_9($receiver, _.kotlin.countTo(n));
      },
      takeWhile_9: function ($receiver, predicate) {
        return _.kotlin.takeWhileTo_7($receiver, new Kotlin.ArrayList(0), predicate);
      },
      requireNoNulls_1: function ($receiver) {
        {
          var tmp$0 = $receiver.iterator();
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (element == null) {
              throw new Kotlin.IllegalArgumentException('null element found in ' + $receiver.toString());
            }
          }
        }
        return $receiver != null ? $receiver : Kotlin.throwNPE();
      },
      plus_29: function ($receiver, element) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_5($receiver, answer);
        answer.add(element);
        return answer;
      },
      plus_30: function ($receiver, iterator) {
        var answer = new Kotlin.ArrayList(0);
        _.kotlin.toCollection_5($receiver, answer);
        {
          var tmp$0 = iterator;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer.add(element);
          }
        }
        return answer;
      },
      plus_31: function ($receiver, collection) {
        return _.kotlin.plus_30($receiver, collection.iterator());
      },
      all_9: function ($receiver, predicate) {
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              return false;
          }
        }
        return true;
      },
      any_9: function ($receiver, predicate) {
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return true;
          }
        }
        return false;
      },
      count_11: function ($receiver, predicate) {
        var count = 0;
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              count++;
          }
        }
        return count;
      },
      find_9: function ($receiver, predicate) {
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              return element;
          }
        }
        return null;
      },
      filterTo_9: function ($receiver, result, predicate) {
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      filterNotTo_9: function ($receiver, result, predicate) {
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (!predicate(element))
              result.add(element);
          }
        }
        return result;
      },
      filterNotNullTo_1: function ($receiver, result) {
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (element != null)
              result.add(element);
          }
        }
        return result;
      },
      partition_9: function ($receiver, predicate) {
        var first = new Kotlin.ArrayList(0);
        var second = new Kotlin.ArrayList(0);
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element)) {
              first.add(element);
            }
             else {
              second.add(element);
            }
          }
        }
        return new _.kotlin.Pair(first, second);
      },
      mapTo_10: function ($receiver, result, transform) {
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var item = tmp$0.next();
            result.add(transform(item));
          }
        }
        return result;
      },
      flatMapTo_9: function ($receiver, result, transform) {
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var list = transform(element);
            {
              var tmp$1 = list.iterator();
              while (tmp$1.hasNext()) {
                var r = tmp$1.next();
                result.add(r);
              }
            }
          }
        }
        return result;
      },
      forEach_9: function ($receiver, operation) {
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            operation(element);
          }
        }
      },
      fold_9: function ($receiver, initial, operation) {
        var answer = initial;
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            answer = operation(answer, element);
          }
        }
        return answer;
      },
      reduce_9: function ($receiver, operation) {
        var iterator = $receiver;
        if (!iterator.hasNext()) {
          throw new Kotlin.UnsupportedOperationException("Empty iterable can't be reduced");
        }
        var result = iterator.next();
        while (iterator.hasNext()) {
          result = operation(result, iterator.next());
        }
        return result;
      },
      groupBy_9: function ($receiver, toKey) {
        return _.kotlin.groupByTo_9($receiver, new Kotlin.ComplexHashMap(0), toKey);
      },
      fo: function () {
        return new Kotlin.ArrayList(0);
      },
      groupByTo_9: function ($receiver, result, toKey) {
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            var key = toKey(element);
            var list = _.kotlin.getOrPut(result, key, _.kotlin.fo);
            list.add(element);
          }
        }
        return result;
      },
      drop_9: function ($receiver, n) {
        return _.kotlin.dropWhile_9($receiver, _.kotlin.countTo(n));
      },
      dropWhile_9: function ($receiver, predicate) {
        return _.kotlin.dropWhileTo_9($receiver, new Kotlin.ArrayList(0), predicate);
      },
      dropWhileTo_9: function ($receiver, result, predicate) {
        var start = true;
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (start && predicate(element)) {
            }
             else {
              start = false;
              result.add(element);
            }
          }
        }
        return result;
      },
      takeWhileTo_9: function ($receiver, result, predicate) {
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (predicate(element))
              result.add(element);
            else
              break;
          }
        }
        return result;
      },
      toCollection_1: function ($receiver, result) {
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            result.add(element);
          }
        }
        return result;
      },
      reverse_9: function ($receiver) {
        var list = _.kotlin.toCollection_1($receiver, new Kotlin.ArrayList(0));
        Kotlin.reverse(list);
        return list;
      },
      toLinkedList_9: function ($receiver) {
        return _.kotlin.toCollection_1($receiver, new Kotlin.LinkedList());
      },
      toList_9: function ($receiver) {
        return _.kotlin.toCollection_1($receiver, new Kotlin.ArrayList(0));
      },
      toSet_9: function ($receiver) {
        return _.kotlin.toCollection_1($receiver, new Kotlin.LinkedHashSet());
      },
      toSortedSet_9: function ($receiver) {
        return _.kotlin.toCollection_1($receiver, new Kotlin.TreeSet());
      },
      withIndices_9: function ($receiver) {
        return new _.kotlin.IndexIterator($receiver);
      },
      fp: function (f, x, y) {
        var xr = f(x);
        var yr = f(y);
        return xr.compareTo(yr);
      },
      sortBy_9: function ($receiver, f) {
        var sortedList = _.kotlin.toCollection_1($receiver, new Kotlin.ArrayList(0));
        var sortBy = Kotlin.comparator(_.kotlin.fp.bind(null, f));
        Kotlin.collectionsSort(sortedList, sortBy);
        return sortedList;
      },
      appendString_9: function ($receiver, buffer, separator, prefix, postfix, limit, truncated) {
        buffer.append(prefix);
        var count = 0;
        {
          var tmp$0 = $receiver;
          while (tmp$0.hasNext()) {
            var element = tmp$0.next();
            if (++count > 1)
              buffer.append(separator);
            if (limit < 0 || count <= limit) {
              var text = element == null ? 'null' : Kotlin.toString(element);
              buffer.append(text);
            }
             else
              break;
          }
        }
        if (limit >= 0 && count > limit)
          buffer.append(truncated);
        buffer.append(postfix);
      },
      makeString_9: function ($receiver, separator, prefix, postfix, limit, truncated) {
        var buffer = new Kotlin.StringBuilder();
        _.kotlin.appendString_9($receiver, buffer, separator, prefix, postfix, limit, truncated);
        return buffer.toString();
      },
      support: Kotlin.definePackage({
        AbstractIterator: classes.co
      })
    }),
    java: Kotlin.definePackage({
      io: Kotlin.definePackage({
        InputStream: classes.c0,
        OutputStream: classes.c1,
        ByteArrayInputStream: Kotlin.createClass(classes.c0, /** @lends _.java.io.ByteArrayInputStream.prototype */ {
          initialize: function (inputBytes) {
            this.$inputBytes = inputBytes;
          },
          get_inputBytes: function () {
            return this.$inputBytes;
          },
          readBytes: function () {
            return this.get_inputBytes();
          }
        }),
        ByteArrayOutputStream: Kotlin.createClass(classes.c1, /** @lends _.java.io.ByteArrayOutputStream.prototype */ {
          initialize: function () {
            this.$result = '';
          },
          flush: function () {
          },
          close: function () {
          },
          toString: function () {
            return this.get_result();
          },
          get_result: function () {
            return this.$result;
          },
          set_result: function (tmp$0) {
            this.$result = tmp$0;
          }
        }),
        PrintStream: Kotlin.createClass(null, /** @lends _.java.io.PrintStream.prototype */ {
          initialize: function (oo) {
            this.$oo = oo;
            this.$result = '';
          },
          get_oo: function () {
            return this.$oo;
          },
          get_result: function () {
            return this.$result;
          },
          set_result: function (tmp$0) {
            this.$result = tmp$0;
          },
          println_0: function () {
            this.set_result(this.get_result() + '\n');
          },
          print: function (s) {
            this.set_result(this.get_result() + s);
          },
          println: function (s) {
            this.print(s);
            this.println_0();
          },
          print_0: function (s) {
            this.set_result(this.get_result() + s);
          },
          print_1: function (s) {
            this.set_result(this.get_result() + s);
          },
          print_2: function (s) {
            this.set_result(this.get_result() + s);
          },
          print_3: function (s) {
            if (s) {
              this.set_result(this.get_result() + 'true');
            }
             else {
              this.set_result(this.get_result() + 'false');
            }
          },
          println_1: function (s) {
            this.print_0(s);
            this.println_0();
          },
          flush: function () {
            var tmp$0;
            ((tmp$0 = this.get_oo()) != null ? tmp$0 : Kotlin.throwNPE()).set_result(this.get_result());
          },
          close: function () {
          }
        })
      }),
      lang: Kotlin.definePackage({
        StringBuilder: Kotlin.createClass(null, /** @lends _.java.lang.StringBuilder.prototype */ {
          initialize: function () {
            this.$content = '';
          },
          get_content: function () {
            return this.$content;
          },
          set_content: function (tmp$0) {
            this.$content = tmp$0;
          },
          append: function (sub) {
            this.set_content(this.get_content() + sub);
          },
          append_0: function (sub) {
            this.set_content(this.get_content() + sub);
          },
          toString: function () {
            return this.get_content();
          }
        })
      }),
      util: Kotlin.definePackage({
        Collections: Kotlin.definePackage({
        })
      })
    }),
    org: Kotlin.definePackage({
      cloud: Kotlin.definePackage({
        cloner: Kotlin.definePackage({
          DefaultModelCloner: Kotlin.createClass(classes.ce, /** @lends _.org.cloud.cloner.DefaultModelCloner.prototype */ {
            initialize: function () {
              this.$mainFactory = new _.org.cloud.factory.MainFactory();
            },
            clone: function (o) {
              return this.clone_0(o, false);
            },
            clone_0: function (o, readOnly) {
              return this.clone_1(o, readOnly, false);
            },
            cloneMutableOnly: function (o, readOnly) {
              return this.clone_1(o, readOnly, true);
            },
            clone_1: function (o, readOnly, mutableOnly) {
              var context = new Kotlin.ComplexHashMap(0);
              var clonedObject = (o != null ? o : Kotlin.throwNPE()).createClone(this.get_mainFactory());
              context.put(o, clonedObject);
              var cloneGraphVisitor = _.org.cloud.cloner.DefaultModelCloner.f0(this, mutableOnly, context);
              o.visit(cloneGraphVisitor, true, true, false);
              var resolveGraphVisitor = _.org.cloud.cloner.DefaultModelCloner.f1(context, readOnly, mutableOnly);
              o.visit(resolveGraphVisitor, true, true, false);
              (o != null ? o : Kotlin.throwNPE()).resolve(context, readOnly, mutableOnly);
              if (readOnly) {
                (clonedObject != null ? clonedObject : Kotlin.throwNPE()).setInternalReadOnly();
              }
              return clonedObject != null ? clonedObject : Kotlin.throwNPE();
            },
            get_mainFactory: function () {
              return this.$mainFactory;
            },
            set_mainFactory: function (tmp$0) {
              this.$mainFactory = tmp$0;
            },
            setCloudFactory: function (fct) {
              this.get_mainFactory().setCloudFactory(fct);
            }
          }, /** @lends _.org.cloud.cloner.DefaultModelCloner */ {
            f0: function ($outer, mutableOnly, context) {
              return Kotlin.createObject(_.org.kevoree.modeling.api.util.ModelVisitor, {
                initialize: function () {
                  this.super_init();
                },
                visit: function (elem, refNameInParent, parent) {
                  if (mutableOnly && elem.isRecursiveReadOnly()) {
                    this.noChildrenVisit();
                  }
                   else {
                    context.put(elem, (elem != null ? elem : Kotlin.throwNPE()).createClone($outer.get_mainFactory()));
                  }
                }
              });
            },
            f1: function (context, readOnly, mutableOnly) {
              return Kotlin.createObject(_.org.kevoree.modeling.api.util.ModelVisitor, {
                initialize: function () {
                  this.super_init();
                },
                visit: function (elem, refNameInParent, parent) {
                  (elem != null ? elem : Kotlin.throwNPE()).resolve(context, readOnly, mutableOnly);
                  if (readOnly) {
                    (elem != null ? elem : Kotlin.throwNPE()).setInternalReadOnly();
                  }
                }
              });
            }
          })
        }),
        Cloud: classes.c2,
        CloudFactory: classes.c3,
        Node: classes.c5,
        Software: classes.c6,
        compare: Kotlin.definePackage({
          DefaultModelCompare: Kotlin.createClass(classes.c7, /** @lends _.org.cloud.compare.DefaultModelCompare.prototype */ {
            initialize: function () {
            },
            createSequence: function () {
              return new _.org.cloud.trace.DefaultTraceSequence();
            },
            diff: function (origin, target) {
              return this.createSequence().populate(this.internal_diff(origin, target, false, false));
            },
            merge: function (origin, target) {
              return this.createSequence().populate(this.internal_diff(origin, target, false, true));
            },
            inter: function (origin, target) {
              return this.createSequence().populate(this.internal_diff(origin, target, true, false));
            },
            internal_diff: function (origin, target, inter, merge) {
              var traces = new Kotlin.ArrayList(0);
              var tracesRef = new Kotlin.ArrayList(0);
              var objectsMap = new Kotlin.PrimitiveHashMap(0);
              traces.addAll((origin != null ? origin : Kotlin.throwNPE()).generateDiffTraces(target, inter, false));
              tracesRef.addAll((origin != null ? origin : Kotlin.throwNPE()).generateDiffTraces(target, inter, true));
              var visitor = _.org.cloud.compare.DefaultModelCompare.f0(objectsMap);
              origin.visit(visitor, true, true, false);
              var visitor2 = _.org.cloud.compare.DefaultModelCompare.f1(objectsMap, inter, traces, tracesRef);
              target.visit(visitor2, true, true, false);
              if (!inter) {
                if (!merge) {
                  {
                    var tmp$0 = objectsMap.values().iterator();
                    while (tmp$0.hasNext()) {
                      var diffChild = tmp$0.next();
                      var tmp$1, tmp$2, tmp$3, tmp$4;
                      traces.add(new _.org.kevoree.modeling.api.trace.ModelRemoveTrace((tmp$2 = ((tmp$1 = diffChild.eContainer()) != null ? tmp$1 : Kotlin.throwNPE()).path()) != null ? tmp$2 : Kotlin.throwNPE(), (tmp$3 = diffChild.getRefInParent()) != null ? tmp$3 : Kotlin.throwNPE(), (tmp$4 = (diffChild != null ? diffChild : Kotlin.throwNPE()).path()) != null ? tmp$4 : Kotlin.throwNPE()));
                    }
                  }
                }
              }
              traces.addAll(tracesRef);
              return traces;
            }
          }, /** @lends _.org.cloud.compare.DefaultModelCompare */ {
            f0: function (objectsMap) {
              return Kotlin.createObject(_.org.kevoree.modeling.api.util.ModelVisitor, {
                initialize: function () {
                  this.super_init();
                },
                visit: function (elem, refNameInParent, parent) {
                  var childPath = elem.path();
                  if (childPath != null) {
                    objectsMap.put(childPath, elem != null ? elem : Kotlin.throwNPE());
                  }
                   else {
                    throw new Error('Null child path ' + elem);
                  }
                }
              });
            },
            f1: function (objectsMap, inter, traces, tracesRef) {
              return Kotlin.createObject(_.org.kevoree.modeling.api.util.ModelVisitor, {
                initialize: function () {
                  this.super_init();
                },
                visit: function (elem, refNameInParent, parent) {
                  var childPath = elem.path();
                  if (childPath != null) {
                    if (objectsMap.containsKey(childPath)) {
                      if (inter) {
                        var tmp$0;
                        traces.add(new _.org.kevoree.modeling.api.trace.ModelAddTrace((tmp$0 = parent.path()) != null ? tmp$0 : Kotlin.throwNPE(), refNameInParent, elem.path(), elem.metaClassName()));
                      }
                      var tmp$1, tmp$2;
                      traces.addAll(((tmp$1 = objectsMap.get(childPath)) != null ? tmp$1 : Kotlin.throwNPE()).generateDiffTraces(elem, inter, false));
                      tracesRef.addAll(((tmp$2 = objectsMap.get(childPath)) != null ? tmp$2 : Kotlin.throwNPE()).generateDiffTraces(elem, inter, true));
                      objectsMap.remove(childPath);
                    }
                     else {
                      if (!inter) {
                        var tmp$3;
                        traces.add(new _.org.kevoree.modeling.api.trace.ModelAddTrace((tmp$3 = parent.path()) != null ? tmp$3 : Kotlin.throwNPE(), refNameInParent, elem.path(), elem.metaClassName()));
                        traces.addAll((elem != null ? elem : Kotlin.throwNPE()).generateDiffTraces(elem != null ? elem : Kotlin.throwNPE(), true, false));
                        tracesRef.addAll((elem != null ? elem : Kotlin.throwNPE()).generateDiffTraces(elem != null ? elem : Kotlin.throwNPE(), true, true));
                      }
                    }
                  }
                   else {
                    throw new Error('Null child path ' + elem);
                  }
                }
              });
            }
          })
        }),
        container: Kotlin.definePackage({
          KMFContainerImpl: classes.c4,
          RemoveFromContainerCommand: Kotlin.createClass(null, /** @lends _.org.cloud.container.RemoveFromContainerCommand.prototype */ {
            initialize: function (target, mutatorType, refName, element) {
              this.$target = target;
              this.$mutatorType = mutatorType;
              this.$refName = refName;
              this.$element = element;
            },
            get_target: function () {
              return this.$target;
            },
            get_mutatorType: function () {
              return this.$mutatorType;
            },
            get_refName: function () {
              return this.$refName;
            },
            get_element: function () {
              return this.$element;
            },
            run: function () {
              this.get_target().reflexiveMutator(this.get_mutatorType(), this.get_refName(), this.get_element(), false);
            }
          })
        }),
        factory: Kotlin.definePackage({
          MainFactory: Kotlin.createClass(classes.cd, /** @lends _.org.cloud.factory.MainFactory.prototype */ {
            initialize: function () {
              this.$factories = Kotlin.arrayFromFun(1, function (i) {
                return null;
              });
              this.get_factories()[_.org.cloud.factory.Package.get_ORG_CLOUD()] = new _.org.cloud.impl.DefaultCloudFactory();
            },
            get_factories: function () {
              return this.$factories;
            },
            set_factories: function (tmp$0) {
              this.$factories = tmp$0;
            },
            getFactoryForPackage: function (pack) {
              return this.get_factories()[pack];
            },
            getCloudFactory: function () {
              var tmp$0;
              return (tmp$0 = this.get_factories()[_.org.cloud.factory.Package.get_ORG_CLOUD()]) != null ? tmp$0 : Kotlin.throwNPE();
            },
            setCloudFactory: function (fct) {
              this.get_factories()[_.org.cloud.factory.Package.get_ORG_CLOUD()] = fct;
            },
            create: function (metaClassName) {
              var tmp$0;
              return (tmp$0 = this.getFactoryForPackage(_.org.cloud.factory.Package.getPackageForName(metaClassName))) != null ? tmp$0.create(metaClassName) : null;
            }
          })
        }),
        impl: Kotlin.definePackage({
          CloudImpl: Kotlin.createClass([classes.c4, classes.c2], /** @lends _.org.cloud.impl.CloudImpl.prototype */ {
            initialize: function () {
              this.$internal_eContainer = null;
              this.$internal_containmentRefName = null;
              this.$internal_unsetCmd = null;
              this.$internal_readOnlyElem = false;
              this.$internal_recursive_readOnlyElem = false;
              this.$internal_modelElementListeners = null;
              this.$internal_modelTreeListeners = null;
              this.$generated_KMF_ID = '' + Math.random() + (new Date()).getTime();
              this.$_nodes = new Kotlin.PrimitiveHashMap(0);
              this.$removeAllNodesCurrentlyProcessing = false;
            },
            get_internal_eContainer: function () {
              return this.$internal_eContainer;
            },
            set_internal_eContainer: function (tmp$0) {
              this.$internal_eContainer = tmp$0;
            },
            get_internal_containmentRefName: function () {
              return this.$internal_containmentRefName;
            },
            set_internal_containmentRefName: function (tmp$0) {
              this.$internal_containmentRefName = tmp$0;
            },
            get_internal_unsetCmd: function () {
              return this.$internal_unsetCmd;
            },
            set_internal_unsetCmd: function (tmp$0) {
              this.$internal_unsetCmd = tmp$0;
            },
            get_internal_readOnlyElem: function () {
              return this.$internal_readOnlyElem;
            },
            set_internal_readOnlyElem: function (tmp$0) {
              this.$internal_readOnlyElem = tmp$0;
            },
            get_internal_recursive_readOnlyElem: function () {
              return this.$internal_recursive_readOnlyElem;
            },
            set_internal_recursive_readOnlyElem: function (tmp$0) {
              this.$internal_recursive_readOnlyElem = tmp$0;
            },
            get_internal_modelElementListeners: function () {
              return this.$internal_modelElementListeners;
            },
            set_internal_modelElementListeners: function (tmp$0) {
              this.$internal_modelElementListeners = tmp$0;
            },
            get_internal_modelTreeListeners: function () {
              return this.$internal_modelTreeListeners;
            },
            set_internal_modelTreeListeners: function (tmp$0) {
              this.$internal_modelTreeListeners = tmp$0;
            },
            delete: function () {
              var tmp$0;
              (tmp$0 = this.get__nodes()) != null ? tmp$0.clear() : null;
            },
            get_generated_KMF_ID: function () {
              return this.$generated_KMF_ID;
            },
            set_generated_KMF_ID: function (iP) {
              if (this.isReadOnly()) {
                throw new Error(_.org.cloud.util.Constants.get_READ_ONLY_EXCEPTION());
              }
              if (!Kotlin.equals(iP, this.get_generated_KMF_ID())) {
                var oldPath = this.path();
                var oldId = this.internalGetKey();
                var previousParent = this.eContainer();
                var previousRefNameInParent = this.getRefInParent();
                this.$generated_KMF_ID = iP;
                this.fireModelEvent(new _.org.kevoree.modeling.api.events.ModelEvent(oldPath, _.org.kevoree.modeling.api.util.ActionType.get_SET(), _.org.kevoree.modeling.api.util.ElementAttributeType.get_ATTRIBUTE(), _.org.cloud.util.Constants.get_Att_generated_KMF_ID(), this.get_generated_KMF_ID()));
                if (previousParent != null) {
                  previousParent.reflexiveMutator(_.org.kevoree.modeling.api.util.ActionType.get_RENEW_INDEX(), previousRefNameInParent != null ? previousRefNameInParent : Kotlin.throwNPE(), oldId, false);
                }
                this.fireModelEvent(new _.org.kevoree.modeling.api.events.ModelEvent(oldPath, _.org.kevoree.modeling.api.util.ActionType.get_RENEW_INDEX(), _.org.kevoree.modeling.api.util.ElementAttributeType.get_REFERENCE(), _.org.cloud.util.Constants.get_Att_generated_KMF_ID(), this.path()));
              }
            },
            get__nodes: function () {
              return this.$_nodes;
            },
            get_nodes: function () {
              return _.kotlin.toList_2(this.get__nodes().values());
            },
            set_nodes: function (nodesP) {
              if (this.isReadOnly()) {
                throw new Error(_.org.cloud.util.Constants.get_READ_ONLY_EXCEPTION());
              }
              if (nodesP == null) {
                throw new Kotlin.IllegalArgumentException(_.org.cloud.util.Constants.get_LIST_PARAMETER_OF_SET_IS_NULL_EXCEPTION());
              }
              if (!Kotlin.equals(this.get__nodes().values(), nodesP)) {
                this.get__nodes().clear();
                {
                  var tmp$0 = nodesP.iterator();
                  while (tmp$0.hasNext()) {
                    var el = tmp$0.next();
                    var elKey = (el != null ? el : Kotlin.throwNPE()).internalGetKey();
                    if (elKey == null) {
                      throw new Error(_.org.cloud.util.Constants.get_ELEMENT_HAS_NO_KEY_IN_COLLECTION());
                    }
                    this.get__nodes().put(elKey != null ? elKey : Kotlin.throwNPE(), el);
                  }
                }
                {
                  var tmp$1 = nodesP.iterator();
                  while (tmp$1.hasNext()) {
                    var elem = tmp$1.next();
                    (elem != null ? elem : Kotlin.throwNPE()).setEContainer(this, new _.org.cloud.container.RemoveFromContainerCommand(this, _.org.kevoree.modeling.api.util.ActionType.get_REMOVE(), _.org.cloud.util.Constants.get_Ref_nodes(), elem), _.org.cloud.util.Constants.get_Ref_nodes());
                  }
                }
                this.fireModelEvent(new _.org.kevoree.modeling.api.events.ModelEvent(this.path(), _.org.kevoree.modeling.api.util.ActionType.get_SET(), _.org.kevoree.modeling.api.util.ElementAttributeType.get_CONTAINMENT(), _.org.cloud.util.Constants.get_Ref_nodes(), nodesP));
              }
            },
            doAddNodes: function (nodesP) {
              var _key_ = (nodesP != null ? nodesP : Kotlin.throwNPE()).internalGetKey();
              if (Kotlin.equals(_key_, '') || _key_ == null) {
                throw new Error(_.org.cloud.util.Constants.get_EMPTY_KEY());
              }
              if (!this.get__nodes().containsKey(_key_)) {
                this.get__nodes().put(_key_, nodesP);
                (nodesP != null ? nodesP : Kotlin.throwNPE()).setEContainer(this, new _.org.cloud.container.RemoveFromContainerCommand(this, _.org.kevoree.modeling.api.util.ActionType.get_REMOVE(), _.org.cloud.util.Constants.get_Ref_nodes(), nodesP), _.org.cloud.util.Constants.get_Ref_nodes());
              }
            },
            addNodes: function (nodesP) {
              if (this.isReadOnly()) {
                throw new Error(_.org.cloud.util.Constants.get_READ_ONLY_EXCEPTION());
              }
              this.doAddNodes(nodesP);
              this.fireModelEvent(new _.org.kevoree.modeling.api.events.ModelEvent(this.path(), _.org.kevoree.modeling.api.util.ActionType.get_ADD(), _.org.kevoree.modeling.api.util.ElementAttributeType.get_CONTAINMENT(), _.org.cloud.util.Constants.get_Ref_nodes(), nodesP));
            },
            addAllNodes: function (nodesP) {
              if (this.isReadOnly()) {
                throw new Error(_.org.cloud.util.Constants.get_READ_ONLY_EXCEPTION());
              }
              {
                var tmp$0 = nodesP.iterator();
                while (tmp$0.hasNext()) {
                  var el = tmp$0.next();
                  this.doAddNodes(el);
                }
              }
              this.fireModelEvent(new _.org.kevoree.modeling.api.events.ModelEvent(this.path(), _.org.kevoree.modeling.api.util.ActionType.get_ADD_ALL(), _.org.kevoree.modeling.api.util.ElementAttributeType.get_CONTAINMENT(), _.org.cloud.util.Constants.get_Ref_nodes(), nodesP));
            },
            removeNodes: function (nodesP) {
              if (this.isReadOnly()) {
                throw new Error(_.org.cloud.util.Constants.get_READ_ONLY_EXCEPTION());
              }
              if (this.get__nodes().size() !== 0 && this.get__nodes().containsKey((nodesP != null ? nodesP : Kotlin.throwNPE()).internalGetKey())) {
                this.get__nodes().remove((nodesP != null ? nodesP : Kotlin.throwNPE()).internalGetKey());
                ((nodesP != null ? nodesP : Kotlin.throwNPE()) != null ? nodesP : Kotlin.throwNPE()).setEContainer(null, null, null);
                if (!this.get_removeAllNodesCurrentlyProcessing()) {
                  this.fireModelEvent(new _.org.kevoree.modeling.api.events.ModelEvent(this.path(), _.org.kevoree.modeling.api.util.ActionType.get_REMOVE(), _.org.kevoree.modeling.api.util.ElementAttributeType.get_CONTAINMENT(), _.org.cloud.util.Constants.get_Ref_nodes(), nodesP));
                }
              }
            },
            get_removeAllNodesCurrentlyProcessing: function () {
              return this.$removeAllNodesCurrentlyProcessing;
            },
            set_removeAllNodesCurrentlyProcessing: function (tmp$0) {
              this.$removeAllNodesCurrentlyProcessing = tmp$0;
            },
            removeAllNodes: function () {
              if (this.isReadOnly()) {
                throw new Error(_.org.cloud.util.Constants.get_READ_ONLY_EXCEPTION());
              }
              this.set_removeAllNodesCurrentlyProcessing(true);
              var tmp$0;
              var temp_els = (tmp$0 = this.get_nodes()) != null ? tmp$0 : Kotlin.throwNPE();
              {
                var tmp$1 = (temp_els != null ? temp_els : Kotlin.throwNPE()).iterator();
                while (tmp$1.hasNext()) {
                  var el = tmp$1.next();
                  (el != null ? el : Kotlin.throwNPE()).setEContainer(null, null, null);
                }
              }
              this.get__nodes().clear();
              this.fireModelEvent(new _.org.kevoree.modeling.api.events.ModelEvent(this.path(), _.org.kevoree.modeling.api.util.ActionType.get_REMOVE_ALL(), _.org.kevoree.modeling.api.util.ElementAttributeType.get_CONTAINMENT(), _.org.cloud.util.Constants.get_Ref_nodes(), temp_els));
              this.set_removeAllNodesCurrentlyProcessing(false);
            },
            createClone: function (_factories) {
              var selfObjectClone = _factories.getCloudFactory().createCloud();
              selfObjectClone.set_generated_KMF_ID(this.get_generated_KMF_ID());
              return selfObjectClone;
            },
            resolve: function (addrs, readOnly, mutableOnly) {
              if (mutableOnly && this.isRecursiveReadOnly()) {
                return;
              }
              var tmp$0;
              var clonedSelfObject = (tmp$0 = addrs.get(this)) != null ? tmp$0 : Kotlin.throwNPE();
              {
                var tmp$1 = this.get_nodes().iterator();
                while (tmp$1.hasNext()) {
                  var sub = tmp$1.next();
                  if (mutableOnly && sub.isRecursiveReadOnly()) {
                    clonedSelfObject.addNodes(sub);
                  }
                   else {
                    var interObj = addrs.get(sub);
                    if (interObj == null) {
                      throw new Error('Non contained nodes from Cloud : ' + this.get_nodes());
                    }
                    clonedSelfObject.addNodes(interObj != null ? interObj : Kotlin.throwNPE());
                  }
                }
              }
            },
            reflexiveMutator: function (mutationType, refName, value, noOpposite) {
              if (refName === _.org.cloud.util.Constants.get_Att_generated_KMF_ID()) {
                this.set_generated_KMF_ID(value);
              }
               else if (refName === _.org.cloud.util.Constants.get_Ref_nodes()) {
                if (mutationType === _.org.kevoree.modeling.api.util.ActionType.get_ADD()) {
                  this.addNodes(value != null ? value : Kotlin.throwNPE());
                }
                 else if (mutationType === _.org.kevoree.modeling.api.util.ActionType.get_ADD_ALL()) {
                  this.addAllNodes(value != null ? value : Kotlin.throwNPE());
                }
                 else if (mutationType === _.org.kevoree.modeling.api.util.ActionType.get_REMOVE()) {
                  this.removeNodes(value != null ? value : Kotlin.throwNPE());
                }
                 else if (mutationType === _.org.kevoree.modeling.api.util.ActionType.get_REMOVE_ALL()) {
                  this.removeAllNodes();
                }
                 else if (mutationType === _.org.kevoree.modeling.api.util.ActionType.get_RENEW_INDEX()) {
                  if (this.get__nodes().size() !== 0 && this.get__nodes().containsKey(value)) {
                    var obj = this.get__nodes().get(value);
                    var objNewKey = (obj != null ? obj : Kotlin.throwNPE()).internalGetKey();
                    if (objNewKey == null) {
                      throw new Error('Key newed to null ' + obj);
                    }
                    this.get__nodes().remove(value);
                    this.get__nodes().put(objNewKey, obj);
                  }
                }
                 else {
                  throw new Error(_.org.cloud.util.Constants.get_UNKNOWN_MUTATION_TYPE_EXCEPTION() + mutationType);
                }
              }
               else {
                throw new Error('Can reflexively ' + mutationType + ' for ' + refName + ' on ' + this);
              }
            },
            internalGetKey: function () {
              return this.get_generated_KMF_ID();
            },
            findNodesByID: function (key) {
              return this.get__nodes().get(key);
            },
            findByPath: function (query) {
              var firstSepIndex = _.js.indexOf(query, '[');
              var queryID = '';
              var extraReadChar = 2;
              var relationName = _.org.cloud.util.Constants.get_Ref_nodes();
              var optionalDetected = firstSepIndex !== 5;
              if (optionalDetected) {
                extraReadChar = extraReadChar - 2;
              }
              if (_.js.indexOf(query, '{') === 0) {
                queryID = query.substring(_.js.indexOf(query, '{') + 1, _.js.indexOf(query, '}'));
                extraReadChar = extraReadChar + 2;
              }
               else {
                if (optionalDetected) {
                  if (_.js.indexOf(query, '/') !== -1) {
                    queryID = query.substring(0, _.js.indexOf(query, '/'));
                  }
                   else {
                    queryID = query.substring(0, query.length);
                  }
                }
                 else {
                  queryID = query.substring(_.js.indexOf(query, '[') + 1, _.js.indexOf(query, ']'));
                }
              }
              var tmp$0 = query;
              var tmp$1;
              if (optionalDetected) {
                tmp$1 = 0;
              }
               else {
                tmp$1 = relationName.length;
              }
              var subquery = tmp$0.substring(tmp$1 + queryID.length + extraReadChar, query.length);
              if (_.js.indexOf(subquery, '/') !== -1) {
                subquery = subquery.substring(_.js.indexOf(subquery, '/') + 1, subquery.length);
              }
              var tmp$2;
              if (relationName === _.org.cloud.util.Constants.get_Ref_nodes()) {
                var objFound = this.findNodesByID(queryID);
                if (!Kotlin.equals(subquery, '') && objFound != null) {
                  tmp$2 = objFound.findByPath(subquery);
                }
                 else {
                  tmp$2 = objFound;
                }
              }
               else {
                tmp$2 = null;
              }
              return tmp$2;
            },
            deepModelEquals: function (similarObj) {
              if (!this.modelEquals(similarObj)) {
                return false;
              }
              var similarObjCasted = similarObj != null ? similarObj : Kotlin.throwNPE();
              {
                var tmp$0 = this.get__nodes().values().iterator();
                while (tmp$0.hasNext()) {
                  var subElement = tmp$0.next();
                  var foundedElement = similarObjCasted.findNodesByID(subElement.get_id());
                  if (foundedElement == null || !Kotlin.equals(foundedElement, subElement)) {
                    return false;
                  }
                }
              }
              return true;
            },
            modelEquals: function (similarObj) {
              if (similarObj == null || !Kotlin.isType(similarObj, _.org.cloud.Cloud) || !Kotlin.isType(similarObj, _.org.cloud.impl.CloudImpl)) {
                return false;
              }
              var similarObjCasted = similarObj != null ? similarObj : Kotlin.throwNPE();
              if (!Kotlin.equals(this.get_generated_KMF_ID(), similarObjCasted.get_generated_KMF_ID())) {
                return false;
              }
              if (this.get_nodes().size() !== similarObjCasted.get_nodes().size()) {
                return false;
              }
              return true;
            },
            visit: function (visitor, recursive, containedReference, nonContainedReference) {
              visitor.beginVisitElem(this);
              if (containedReference) {
                visitor.beginVisitRef(_.org.cloud.util.Constants.get_Ref_nodes());
                {
                  var tmp$0 = this.get__nodes().keySet().iterator();
                  while (tmp$0.hasNext()) {
                    var KMFLoopEntryKey = tmp$0.next();
                    this.internal_visit(visitor, this.get__nodes().get(KMFLoopEntryKey), recursive, containedReference, nonContainedReference, _.org.cloud.util.Constants.get_Ref_nodes());
                  }
                }
                visitor.endVisitRef(_.org.cloud.util.Constants.get_Ref_nodes());
              }
              visitor.endVisitElem(this);
            },
            visit_0: function (visitor) {
              visitor.visit(this.get_generated_KMF_ID(), _.org.cloud.util.Constants.get_Att_generated_KMF_ID(), this);
            },
            metaClassName: function () {
              return _.org.cloud.util.Constants.get_org_cloud_Cloud();
            },
            generateDiffTraces: function (similarObj, kmf_internal_inter, kmf_internal_ref) {
              var similarObjCasted = null;
              if (similarObj != null && (Kotlin.isType(similarObj, _.org.cloud.Cloud) || Kotlin.isType(similarObj, _.org.cloud.impl.CloudImpl))) {
                similarObjCasted = similarObj != null ? similarObj : Kotlin.throwNPE();
              }
              var traces = new Kotlin.ArrayList(0);
              var attVal = null;
              var attVal2 = null;
              var attVal2String = null;
              var hashLoop = null;
              var hashResult = null;
              if (!kmf_internal_ref) {
                attVal = this.get_generated_KMF_ID();
                attVal2 = similarObjCasted != null ? similarObjCasted.get_generated_KMF_ID() : null;
                if (attVal2 != null) {
                  attVal2String = Kotlin.toString(attVal2);
                }
                 else {
                  attVal2String = null;
                }
                if (!Kotlin.equals(attVal, attVal2)) {
                  if (!kmf_internal_inter) {
                    var tmp$0;
                    traces.add(new _.org.kevoree.modeling.api.trace.ModelSetTrace((tmp$0 = this.path()) != null ? tmp$0 : Kotlin.throwNPE(), _.org.cloud.util.Constants.get_Att_generated_KMF_ID(), null, attVal2String, null));
                  }
                }
                 else {
                  if (kmf_internal_inter) {
                    var tmp$1;
                    traces.add(new _.org.kevoree.modeling.api.trace.ModelSetTrace((tmp$1 = this.path()) != null ? tmp$1 : Kotlin.throwNPE(), _.org.cloud.util.Constants.get_Att_generated_KMF_ID(), null, attVal2String, null));
                  }
                }
              }
               else {
              }
              return traces;
            },
            getGenerated_KMF_ID: function () {
              return this.get_generated_KMF_ID();
            },
            setGenerated_KMF_ID: function (internal_p) {
              this.set_generated_KMF_ID(internal_p);
            },
            getNodes: function () {
              return this.get_nodes();
            },
            setNodes: function (internal_p) {
              this.set_nodes(internal_p);
            }
          }),
          DefaultCloudFactory: Kotlin.createClass(classes.c3, /** @lends _.org.cloud.impl.DefaultCloudFactory.prototype */ {
            initialize: function () {
            },
            getVersion: function () {
              return '1.0.0-SNAPSHOT';
            },
            createCloud: function () {
              return new _.org.cloud.impl.CloudImpl();
            },
            createNode: function () {
              return new _.org.cloud.impl.NodeImpl();
            },
            createSoftware: function () {
              return new _.org.cloud.impl.SoftwareImpl();
            },
            create: function (metaClassName) {
              if (metaClassName === 'org.cloud.Cloud') {
                return this.createCloud();
              }
               else if (metaClassName === 'Cloud') {
                return this.createCloud();
              }
               else if (metaClassName === 'org.cloud.Node') {
                return this.createNode();
              }
               else if (metaClassName === 'Node') {
                return this.createNode();
              }
               else if (metaClassName === 'org.cloud.Software') {
                return this.createSoftware();
              }
               else if (metaClassName === 'Software') {
                return this.createSoftware();
              }
               else {
                return null;
              }
            }
          }),
          NodeImpl: Kotlin.createClass([classes.c4, classes.c5], /** @lends _.org.cloud.impl.NodeImpl.prototype */ {
            initialize: function () {
              this.$internal_eContainer = null;
              this.$internal_containmentRefName = null;
              this.$internal_unsetCmd = null;
              this.$internal_readOnlyElem = false;
              this.$internal_recursive_readOnlyElem = false;
              this.$internal_modelElementListeners = null;
              this.$internal_modelTreeListeners = null;
              this.$id = null;
              this.$_softwares = new Kotlin.PrimitiveHashMap(0);
              this.$removeAllSoftwaresCurrentlyProcessing = false;
            },
            get_internal_eContainer: function () {
              return this.$internal_eContainer;
            },
            set_internal_eContainer: function (tmp$0) {
              this.$internal_eContainer = tmp$0;
            },
            get_internal_containmentRefName: function () {
              return this.$internal_containmentRefName;
            },
            set_internal_containmentRefName: function (tmp$0) {
              this.$internal_containmentRefName = tmp$0;
            },
            get_internal_unsetCmd: function () {
              return this.$internal_unsetCmd;
            },
            set_internal_unsetCmd: function (tmp$0) {
              this.$internal_unsetCmd = tmp$0;
            },
            get_internal_readOnlyElem: function () {
              return this.$internal_readOnlyElem;
            },
            set_internal_readOnlyElem: function (tmp$0) {
              this.$internal_readOnlyElem = tmp$0;
            },
            get_internal_recursive_readOnlyElem: function () {
              return this.$internal_recursive_readOnlyElem;
            },
            set_internal_recursive_readOnlyElem: function (tmp$0) {
              this.$internal_recursive_readOnlyElem = tmp$0;
            },
            get_internal_modelElementListeners: function () {
              return this.$internal_modelElementListeners;
            },
            set_internal_modelElementListeners: function (tmp$0) {
              this.$internal_modelElementListeners = tmp$0;
            },
            get_internal_modelTreeListeners: function () {
              return this.$internal_modelTreeListeners;
            },
            set_internal_modelTreeListeners: function (tmp$0) {
              this.$internal_modelTreeListeners = tmp$0;
            },
            delete: function () {
              var tmp$0;
              (tmp$0 = this.get__softwares()) != null ? tmp$0.clear() : null;
            },
            get_id: function () {
              return this.$id;
            },
            set_id: function (iP) {
              if (this.isReadOnly()) {
                throw new Error(_.org.cloud.util.Constants.get_READ_ONLY_EXCEPTION());
              }
              if (!Kotlin.equals(iP, this.get_id())) {
                var oldPath = this.path();
                var oldId = this.internalGetKey();
                var previousParent = this.eContainer();
                var previousRefNameInParent = this.getRefInParent();
                this.$id = iP;
                this.fireModelEvent(new _.org.kevoree.modeling.api.events.ModelEvent(oldPath, _.org.kevoree.modeling.api.util.ActionType.get_SET(), _.org.kevoree.modeling.api.util.ElementAttributeType.get_ATTRIBUTE(), _.org.cloud.util.Constants.get_Att_id(), this.get_id()));
                if (previousParent != null) {
                  previousParent.reflexiveMutator(_.org.kevoree.modeling.api.util.ActionType.get_RENEW_INDEX(), previousRefNameInParent != null ? previousRefNameInParent : Kotlin.throwNPE(), oldId, false);
                }
                this.fireModelEvent(new _.org.kevoree.modeling.api.events.ModelEvent(oldPath, _.org.kevoree.modeling.api.util.ActionType.get_RENEW_INDEX(), _.org.kevoree.modeling.api.util.ElementAttributeType.get_REFERENCE(), _.org.cloud.util.Constants.get_Att_id(), this.path()));
              }
            },
            get__softwares: function () {
              return this.$_softwares;
            },
            get_softwares: function () {
              return _.kotlin.toList_2(this.get__softwares().values());
            },
            set_softwares: function (softwaresP) {
              if (this.isReadOnly()) {
                throw new Error(_.org.cloud.util.Constants.get_READ_ONLY_EXCEPTION());
              }
              if (softwaresP == null) {
                throw new Kotlin.IllegalArgumentException(_.org.cloud.util.Constants.get_LIST_PARAMETER_OF_SET_IS_NULL_EXCEPTION());
              }
              if (!Kotlin.equals(this.get__softwares().values(), softwaresP)) {
                this.get__softwares().clear();
                {
                  var tmp$0 = softwaresP.iterator();
                  while (tmp$0.hasNext()) {
                    var el = tmp$0.next();
                    var elKey = (el != null ? el : Kotlin.throwNPE()).internalGetKey();
                    if (elKey == null) {
                      throw new Error(_.org.cloud.util.Constants.get_ELEMENT_HAS_NO_KEY_IN_COLLECTION());
                    }
                    this.get__softwares().put(elKey != null ? elKey : Kotlin.throwNPE(), el);
                  }
                }
                {
                  var tmp$1 = softwaresP.iterator();
                  while (tmp$1.hasNext()) {
                    var elem = tmp$1.next();
                    (elem != null ? elem : Kotlin.throwNPE()).setEContainer(this, new _.org.cloud.container.RemoveFromContainerCommand(this, _.org.kevoree.modeling.api.util.ActionType.get_REMOVE(), _.org.cloud.util.Constants.get_Ref_softwares(), elem), _.org.cloud.util.Constants.get_Ref_softwares());
                  }
                }
                this.fireModelEvent(new _.org.kevoree.modeling.api.events.ModelEvent(this.path(), _.org.kevoree.modeling.api.util.ActionType.get_SET(), _.org.kevoree.modeling.api.util.ElementAttributeType.get_CONTAINMENT(), _.org.cloud.util.Constants.get_Ref_softwares(), softwaresP));
              }
            },
            doAddSoftwares: function (softwaresP) {
              var _key_ = (softwaresP != null ? softwaresP : Kotlin.throwNPE()).internalGetKey();
              if (Kotlin.equals(_key_, '') || _key_ == null) {
                throw new Error(_.org.cloud.util.Constants.get_EMPTY_KEY());
              }
              if (!this.get__softwares().containsKey(_key_)) {
                this.get__softwares().put(_key_, softwaresP);
                (softwaresP != null ? softwaresP : Kotlin.throwNPE()).setEContainer(this, new _.org.cloud.container.RemoveFromContainerCommand(this, _.org.kevoree.modeling.api.util.ActionType.get_REMOVE(), _.org.cloud.util.Constants.get_Ref_softwares(), softwaresP), _.org.cloud.util.Constants.get_Ref_softwares());
              }
            },
            addSoftwares: function (softwaresP) {
              if (this.isReadOnly()) {
                throw new Error(_.org.cloud.util.Constants.get_READ_ONLY_EXCEPTION());
              }
              this.doAddSoftwares(softwaresP);
              this.fireModelEvent(new _.org.kevoree.modeling.api.events.ModelEvent(this.path(), _.org.kevoree.modeling.api.util.ActionType.get_ADD(), _.org.kevoree.modeling.api.util.ElementAttributeType.get_CONTAINMENT(), _.org.cloud.util.Constants.get_Ref_softwares(), softwaresP));
            },
            addAllSoftwares: function (softwaresP) {
              if (this.isReadOnly()) {
                throw new Error(_.org.cloud.util.Constants.get_READ_ONLY_EXCEPTION());
              }
              {
                var tmp$0 = softwaresP.iterator();
                while (tmp$0.hasNext()) {
                  var el = tmp$0.next();
                  this.doAddSoftwares(el);
                }
              }
              this.fireModelEvent(new _.org.kevoree.modeling.api.events.ModelEvent(this.path(), _.org.kevoree.modeling.api.util.ActionType.get_ADD_ALL(), _.org.kevoree.modeling.api.util.ElementAttributeType.get_CONTAINMENT(), _.org.cloud.util.Constants.get_Ref_softwares(), softwaresP));
            },
            removeSoftwares: function (softwaresP) {
              if (this.isReadOnly()) {
                throw new Error(_.org.cloud.util.Constants.get_READ_ONLY_EXCEPTION());
              }
              if (this.get__softwares().size() !== 0 && this.get__softwares().containsKey((softwaresP != null ? softwaresP : Kotlin.throwNPE()).internalGetKey())) {
                this.get__softwares().remove((softwaresP != null ? softwaresP : Kotlin.throwNPE()).internalGetKey());
                ((softwaresP != null ? softwaresP : Kotlin.throwNPE()) != null ? softwaresP : Kotlin.throwNPE()).setEContainer(null, null, null);
                if (!this.get_removeAllSoftwaresCurrentlyProcessing()) {
                  this.fireModelEvent(new _.org.kevoree.modeling.api.events.ModelEvent(this.path(), _.org.kevoree.modeling.api.util.ActionType.get_REMOVE(), _.org.kevoree.modeling.api.util.ElementAttributeType.get_CONTAINMENT(), _.org.cloud.util.Constants.get_Ref_softwares(), softwaresP));
                }
              }
            },
            get_removeAllSoftwaresCurrentlyProcessing: function () {
              return this.$removeAllSoftwaresCurrentlyProcessing;
            },
            set_removeAllSoftwaresCurrentlyProcessing: function (tmp$0) {
              this.$removeAllSoftwaresCurrentlyProcessing = tmp$0;
            },
            removeAllSoftwares: function () {
              if (this.isReadOnly()) {
                throw new Error(_.org.cloud.util.Constants.get_READ_ONLY_EXCEPTION());
              }
              this.set_removeAllSoftwaresCurrentlyProcessing(true);
              var tmp$0;
              var temp_els = (tmp$0 = this.get_softwares()) != null ? tmp$0 : Kotlin.throwNPE();
              {
                var tmp$1 = (temp_els != null ? temp_els : Kotlin.throwNPE()).iterator();
                while (tmp$1.hasNext()) {
                  var el = tmp$1.next();
                  (el != null ? el : Kotlin.throwNPE()).setEContainer(null, null, null);
                }
              }
              this.get__softwares().clear();
              this.fireModelEvent(new _.org.kevoree.modeling.api.events.ModelEvent(this.path(), _.org.kevoree.modeling.api.util.ActionType.get_REMOVE_ALL(), _.org.kevoree.modeling.api.util.ElementAttributeType.get_CONTAINMENT(), _.org.cloud.util.Constants.get_Ref_softwares(), temp_els));
              this.set_removeAllSoftwaresCurrentlyProcessing(false);
            },
            createClone: function (_factories) {
              var selfObjectClone = _factories.getCloudFactory().createNode();
              selfObjectClone.set_id(this.get_id());
              return selfObjectClone;
            },
            resolve: function (addrs, readOnly, mutableOnly) {
              if (mutableOnly && this.isRecursiveReadOnly()) {
                return;
              }
              var tmp$0;
              var clonedSelfObject = (tmp$0 = addrs.get(this)) != null ? tmp$0 : Kotlin.throwNPE();
              {
                var tmp$1 = this.get_softwares().iterator();
                while (tmp$1.hasNext()) {
                  var sub = tmp$1.next();
                  if (mutableOnly && sub.isRecursiveReadOnly()) {
                    clonedSelfObject.addSoftwares(sub);
                  }
                   else {
                    var interObj = addrs.get(sub);
                    if (interObj == null) {
                      throw new Error('Non contained softwares from Node : ' + this.get_softwares());
                    }
                    clonedSelfObject.addSoftwares(interObj != null ? interObj : Kotlin.throwNPE());
                  }
                }
              }
            },
            reflexiveMutator: function (mutationType, refName, value, noOpposite) {
              if (refName === _.org.cloud.util.Constants.get_Att_id()) {
                this.set_id(value);
              }
               else if (refName === _.org.cloud.util.Constants.get_Ref_softwares()) {
                if (mutationType === _.org.kevoree.modeling.api.util.ActionType.get_ADD()) {
                  this.addSoftwares(value != null ? value : Kotlin.throwNPE());
                }
                 else if (mutationType === _.org.kevoree.modeling.api.util.ActionType.get_ADD_ALL()) {
                  this.addAllSoftwares(value != null ? value : Kotlin.throwNPE());
                }
                 else if (mutationType === _.org.kevoree.modeling.api.util.ActionType.get_REMOVE()) {
                  this.removeSoftwares(value != null ? value : Kotlin.throwNPE());
                }
                 else if (mutationType === _.org.kevoree.modeling.api.util.ActionType.get_REMOVE_ALL()) {
                  this.removeAllSoftwares();
                }
                 else if (mutationType === _.org.kevoree.modeling.api.util.ActionType.get_RENEW_INDEX()) {
                  if (this.get__softwares().size() !== 0 && this.get__softwares().containsKey(value)) {
                    var obj = this.get__softwares().get(value);
                    var objNewKey = (obj != null ? obj : Kotlin.throwNPE()).internalGetKey();
                    if (objNewKey == null) {
                      throw new Error('Key newed to null ' + obj);
                    }
                    this.get__softwares().remove(value);
                    this.get__softwares().put(objNewKey, obj);
                  }
                }
                 else {
                  throw new Error(_.org.cloud.util.Constants.get_UNKNOWN_MUTATION_TYPE_EXCEPTION() + mutationType);
                }
              }
               else {
                throw new Error('Can reflexively ' + mutationType + ' for ' + refName + ' on ' + this);
              }
            },
            internalGetKey: function () {
              return this.get_id();
            },
            findSoftwaresByID: function (key) {
              return this.get__softwares().get(key);
            },
            findByPath: function (query) {
              var firstSepIndex = _.js.indexOf(query, '[');
              var queryID = '';
              var extraReadChar = 2;
              var relationName = _.org.cloud.util.Constants.get_Ref_softwares();
              var optionalDetected = firstSepIndex !== 9;
              if (optionalDetected) {
                extraReadChar = extraReadChar - 2;
              }
              if (_.js.indexOf(query, '{') === 0) {
                queryID = query.substring(_.js.indexOf(query, '{') + 1, _.js.indexOf(query, '}'));
                extraReadChar = extraReadChar + 2;
              }
               else {
                if (optionalDetected) {
                  if (_.js.indexOf(query, '/') !== -1) {
                    queryID = query.substring(0, _.js.indexOf(query, '/'));
                  }
                   else {
                    queryID = query.substring(0, query.length);
                  }
                }
                 else {
                  queryID = query.substring(_.js.indexOf(query, '[') + 1, _.js.indexOf(query, ']'));
                }
              }
              var tmp$0 = query;
              var tmp$1;
              if (optionalDetected) {
                tmp$1 = 0;
              }
               else {
                tmp$1 = relationName.length;
              }
              var subquery = tmp$0.substring(tmp$1 + queryID.length + extraReadChar, query.length);
              if (_.js.indexOf(subquery, '/') !== -1) {
                subquery = subquery.substring(_.js.indexOf(subquery, '/') + 1, subquery.length);
              }
              var tmp$2;
              if (relationName === _.org.cloud.util.Constants.get_Ref_softwares()) {
                var objFound = this.findSoftwaresByID(queryID);
                if (!Kotlin.equals(subquery, '') && objFound != null) {
                  tmp$2 = objFound.findByPath(subquery);
                }
                 else {
                  tmp$2 = objFound;
                }
              }
               else {
                tmp$2 = null;
              }
              return tmp$2;
            },
            deepModelEquals: function (similarObj) {
              if (!this.modelEquals(similarObj)) {
                return false;
              }
              var similarObjCasted = similarObj != null ? similarObj : Kotlin.throwNPE();
              {
                var tmp$0 = this.get__softwares().values().iterator();
                while (tmp$0.hasNext()) {
                  var subElement = tmp$0.next();
                  var foundedElement = similarObjCasted.findSoftwaresByID(subElement.get_name());
                  if (foundedElement == null || !Kotlin.equals(foundedElement, subElement)) {
                    return false;
                  }
                }
              }
              return true;
            },
            modelEquals: function (similarObj) {
              if (similarObj == null || !Kotlin.isType(similarObj, _.org.cloud.Node) || !Kotlin.isType(similarObj, _.org.cloud.impl.NodeImpl)) {
                return false;
              }
              var similarObjCasted = similarObj != null ? similarObj : Kotlin.throwNPE();
              if (!Kotlin.equals(this.get_id(), similarObjCasted.get_id())) {
                return false;
              }
              if (this.get_softwares().size() !== similarObjCasted.get_softwares().size()) {
                return false;
              }
              return true;
            },
            visit: function (visitor, recursive, containedReference, nonContainedReference) {
              visitor.beginVisitElem(this);
              if (containedReference) {
                visitor.beginVisitRef(_.org.cloud.util.Constants.get_Ref_softwares());
                {
                  var tmp$0 = this.get__softwares().keySet().iterator();
                  while (tmp$0.hasNext()) {
                    var KMFLoopEntryKey = tmp$0.next();
                    this.internal_visit(visitor, this.get__softwares().get(KMFLoopEntryKey), recursive, containedReference, nonContainedReference, _.org.cloud.util.Constants.get_Ref_softwares());
                  }
                }
                visitor.endVisitRef(_.org.cloud.util.Constants.get_Ref_softwares());
              }
              visitor.endVisitElem(this);
            },
            visit_0: function (visitor) {
              visitor.visit(this.get_id(), _.org.cloud.util.Constants.get_Att_id(), this);
            },
            metaClassName: function () {
              return _.org.cloud.util.Constants.get_org_cloud_Node();
            },
            generateDiffTraces: function (similarObj, kmf_internal_inter, kmf_internal_ref) {
              var similarObjCasted = null;
              if (similarObj != null && (Kotlin.isType(similarObj, _.org.cloud.Node) || Kotlin.isType(similarObj, _.org.cloud.impl.NodeImpl))) {
                similarObjCasted = similarObj != null ? similarObj : Kotlin.throwNPE();
              }
              var traces = new Kotlin.ArrayList(0);
              var attVal = null;
              var attVal2 = null;
              var attVal2String = null;
              var hashLoop = null;
              var hashResult = null;
              if (!kmf_internal_ref) {
                attVal = this.get_id();
                attVal2 = similarObjCasted != null ? similarObjCasted.get_id() : null;
                if (attVal2 != null) {
                  attVal2String = Kotlin.toString(attVal2);
                }
                 else {
                  attVal2String = null;
                }
                if (!Kotlin.equals(attVal, attVal2)) {
                  if (!kmf_internal_inter) {
                    var tmp$0;
                    traces.add(new _.org.kevoree.modeling.api.trace.ModelSetTrace((tmp$0 = this.path()) != null ? tmp$0 : Kotlin.throwNPE(), _.org.cloud.util.Constants.get_Att_id(), null, attVal2String, null));
                  }
                }
                 else {
                  if (kmf_internal_inter) {
                    var tmp$1;
                    traces.add(new _.org.kevoree.modeling.api.trace.ModelSetTrace((tmp$1 = this.path()) != null ? tmp$1 : Kotlin.throwNPE(), _.org.cloud.util.Constants.get_Att_id(), null, attVal2String, null));
                  }
                }
              }
               else {
              }
              return traces;
            },
            getId: function () {
              return this.get_id();
            },
            setId: function (internal_p) {
              this.set_id(internal_p);
            },
            getSoftwares: function () {
              return this.get_softwares();
            },
            setSoftwares: function (internal_p) {
              this.set_softwares(internal_p);
            }
          }),
          SoftwareImpl: Kotlin.createClass([classes.c4, classes.c6], /** @lends _.org.cloud.impl.SoftwareImpl.prototype */ {
            initialize: function () {
              this.$internal_eContainer = null;
              this.$internal_containmentRefName = null;
              this.$internal_unsetCmd = null;
              this.$internal_readOnlyElem = false;
              this.$internal_recursive_readOnlyElem = false;
              this.$internal_modelElementListeners = null;
              this.$internal_modelTreeListeners = null;
              this.$name = null;
            },
            get_internal_eContainer: function () {
              return this.$internal_eContainer;
            },
            set_internal_eContainer: function (tmp$0) {
              this.$internal_eContainer = tmp$0;
            },
            get_internal_containmentRefName: function () {
              return this.$internal_containmentRefName;
            },
            set_internal_containmentRefName: function (tmp$0) {
              this.$internal_containmentRefName = tmp$0;
            },
            get_internal_unsetCmd: function () {
              return this.$internal_unsetCmd;
            },
            set_internal_unsetCmd: function (tmp$0) {
              this.$internal_unsetCmd = tmp$0;
            },
            get_internal_readOnlyElem: function () {
              return this.$internal_readOnlyElem;
            },
            set_internal_readOnlyElem: function (tmp$0) {
              this.$internal_readOnlyElem = tmp$0;
            },
            get_internal_recursive_readOnlyElem: function () {
              return this.$internal_recursive_readOnlyElem;
            },
            set_internal_recursive_readOnlyElem: function (tmp$0) {
              this.$internal_recursive_readOnlyElem = tmp$0;
            },
            get_internal_modelElementListeners: function () {
              return this.$internal_modelElementListeners;
            },
            set_internal_modelElementListeners: function (tmp$0) {
              this.$internal_modelElementListeners = tmp$0;
            },
            get_internal_modelTreeListeners: function () {
              return this.$internal_modelTreeListeners;
            },
            set_internal_modelTreeListeners: function (tmp$0) {
              this.$internal_modelTreeListeners = tmp$0;
            },
            delete: function () {
            },
            get_name: function () {
              return this.$name;
            },
            set_name: function (iP) {
              if (this.isReadOnly()) {
                throw new Error(_.org.cloud.util.Constants.get_READ_ONLY_EXCEPTION());
              }
              if (!Kotlin.equals(iP, this.get_name())) {
                var oldPath = this.path();
                var oldId = this.internalGetKey();
                var previousParent = this.eContainer();
                var previousRefNameInParent = this.getRefInParent();
                this.$name = iP;
                this.fireModelEvent(new _.org.kevoree.modeling.api.events.ModelEvent(oldPath, _.org.kevoree.modeling.api.util.ActionType.get_SET(), _.org.kevoree.modeling.api.util.ElementAttributeType.get_ATTRIBUTE(), _.org.cloud.util.Constants.get_Att_name(), this.get_name()));
                if (previousParent != null) {
                  previousParent.reflexiveMutator(_.org.kevoree.modeling.api.util.ActionType.get_RENEW_INDEX(), previousRefNameInParent != null ? previousRefNameInParent : Kotlin.throwNPE(), oldId, false);
                }
                this.fireModelEvent(new _.org.kevoree.modeling.api.events.ModelEvent(oldPath, _.org.kevoree.modeling.api.util.ActionType.get_RENEW_INDEX(), _.org.kevoree.modeling.api.util.ElementAttributeType.get_REFERENCE(), _.org.cloud.util.Constants.get_Att_name(), this.path()));
              }
            },
            createClone: function (_factories) {
              var selfObjectClone = _factories.getCloudFactory().createSoftware();
              selfObjectClone.set_name(this.get_name());
              return selfObjectClone;
            },
            resolve: function (addrs, readOnly, mutableOnly) {
              if (mutableOnly && this.isRecursiveReadOnly()) {
                return;
              }
              var tmp$0;
              var clonedSelfObject = (tmp$0 = addrs.get(this)) != null ? tmp$0 : Kotlin.throwNPE();
            },
            reflexiveMutator: function (mutationType, refName, value, noOpposite) {
              if (refName === _.org.cloud.util.Constants.get_Att_name()) {
                this.set_name(value);
              }
               else {
                throw new Error('Can reflexively ' + mutationType + ' for ' + refName + ' on ' + this);
              }
            },
            internalGetKey: function () {
              return this.get_name();
            },
            findByPath: function (query) {
              return null;
            },
            deepModelEquals: function (similarObj) {
              if (!this.modelEquals(similarObj)) {
                return false;
              }
              var similarObjCasted = similarObj != null ? similarObj : Kotlin.throwNPE();
              return true;
            },
            modelEquals: function (similarObj) {
              if (similarObj == null || !Kotlin.isType(similarObj, _.org.cloud.Software) || !Kotlin.isType(similarObj, _.org.cloud.impl.SoftwareImpl)) {
                return false;
              }
              var similarObjCasted = similarObj != null ? similarObj : Kotlin.throwNPE();
              if (!Kotlin.equals(this.get_name(), similarObjCasted.get_name())) {
                return false;
              }
              return true;
            },
            visit: function (visitor, recursive, containedReference, nonContainedReference) {
              visitor.beginVisitElem(this);
              visitor.endVisitElem(this);
            },
            visit_0: function (visitor) {
              visitor.visit(this.get_name(), _.org.cloud.util.Constants.get_Att_name(), this);
            },
            metaClassName: function () {
              return _.org.cloud.util.Constants.get_org_cloud_Software();
            },
            generateDiffTraces: function (similarObj, kmf_internal_inter, kmf_internal_ref) {
              var similarObjCasted = null;
              if (similarObj != null && (Kotlin.isType(similarObj, _.org.cloud.Software) || Kotlin.isType(similarObj, _.org.cloud.impl.SoftwareImpl))) {
                similarObjCasted = similarObj != null ? similarObj : Kotlin.throwNPE();
              }
              var traces = new Kotlin.ArrayList(0);
              var attVal = null;
              var attVal2 = null;
              var attVal2String = null;
              var hashLoop = null;
              var hashResult = null;
              if (!kmf_internal_ref) {
                attVal = this.get_name();
                attVal2 = similarObjCasted != null ? similarObjCasted.get_name() : null;
                if (attVal2 != null) {
                  attVal2String = Kotlin.toString(attVal2);
                }
                 else {
                  attVal2String = null;
                }
                if (!Kotlin.equals(attVal, attVal2)) {
                  if (!kmf_internal_inter) {
                    var tmp$0;
                    traces.add(new _.org.kevoree.modeling.api.trace.ModelSetTrace((tmp$0 = this.path()) != null ? tmp$0 : Kotlin.throwNPE(), _.org.cloud.util.Constants.get_Att_name(), null, attVal2String, null));
                  }
                }
                 else {
                  if (kmf_internal_inter) {
                    var tmp$1;
                    traces.add(new _.org.kevoree.modeling.api.trace.ModelSetTrace((tmp$1 = this.path()) != null ? tmp$1 : Kotlin.throwNPE(), _.org.cloud.util.Constants.get_Att_name(), null, attVal2String, null));
                  }
                }
              }
               else {
              }
              return traces;
            },
            getName: function () {
              return this.get_name();
            },
            setName: function (internal_p) {
              this.set_name(internal_p);
            }
          })
        }),
        loader: Kotlin.definePackage({
          JSONModelLoader: Kotlin.createClass(classes.ca, /** @lends _.org.cloud.loader.JSONModelLoader.prototype */ {
            initialize: function () {
              this.super_init();
              this.$factory = new _.org.cloud.factory.MainFactory();
            },
            get_factory: function () {
              return this.$factory;
            },
            set_factory: function (tmp$0) {
              this.$factory = tmp$0;
            }
          })
        }),
        serializer: Kotlin.definePackage({
          JSONModelSerializer: Kotlin.createClass(classes.cb, /** @lends _.org.cloud.serializer.JSONModelSerializer.prototype */ {
            initialize: function () {
              this.super_init();
            }
          })
        }),
        trace: Kotlin.definePackage({
          DefaultTraceSequence: Kotlin.createClass(classes.cj, /** @lends _.org.cloud.trace.DefaultTraceSequence.prototype */ {
            initialize: function () {
              this.$traces = new Kotlin.ArrayList(0);
              this.$factory = new _.org.cloud.factory.MainFactory();
            },
            get_traces: function () {
              return this.$traces;
            },
            set_traces: function (tmp$0) {
              this.$traces = tmp$0;
            },
            get_factory: function () {
              return this.$factory;
            },
            set_factory: function (tmp$0) {
              this.$factory = tmp$0;
            }
          })
        }),
        util: Kotlin.definePackage({
        })
      }),
      kevoree: Kotlin.definePackage({
        log: Kotlin.definePackage({
          Logger: Kotlin.createClass(null, /** @lends _.org.kevoree.log.Logger.prototype */ {
            initialize: function () {
              this.$firstLogTime = (new Date()).getTime();
              this.$error_msg = ' ERROR: ';
              this.$warn_msg = ' WARN: ';
              this.$info_msg = ' INFO: ';
              this.$debug_msg = ' DEBUG: ';
              this.$trace_msg = ' TRACE: ';
              this.$category = null;
            },
            get_firstLogTime: function () {
              return this.$firstLogTime;
            },
            get_error_msg: function () {
              return this.$error_msg;
            },
            get_warn_msg: function () {
              return this.$warn_msg;
            },
            get_info_msg: function () {
              return this.$info_msg;
            },
            get_debug_msg: function () {
              return this.$debug_msg;
            },
            get_trace_msg: function () {
              return this.$trace_msg;
            },
            get_category: function () {
              return this.$category;
            },
            set_category: function (tmp$0) {
              this.$category = tmp$0;
            },
            setCategory: function (category) {
              this.set_category(category);
            },
            log: function (level, message, ex) {
              var builder = new _.java.lang.StringBuilder();
              var time = (new Date()).getTime() - this.get_firstLogTime();
              var minutes = time / (1000 * 60) | 0;
              var seconds = (time / 1000 | 0) % 60;
              if (minutes <= 9)
                builder.append_0('0');
              builder.append(Kotlin.toString(minutes));
              builder.append_0(':');
              if (seconds <= 9)
                builder.append_0('0');
              builder.append(Kotlin.toString(seconds));
              if (level === _.org.kevoree.log.Log.get_LEVEL_ERROR()) {
                builder.append(this.get_error_msg());
              }
               else if (level === _.org.kevoree.log.Log.get_LEVEL_WARN()) {
                builder.append(this.get_warn_msg());
              }
               else if (level === _.org.kevoree.log.Log.get_LEVEL_INFO()) {
                builder.append(this.get_info_msg());
              }
               else if (level === _.org.kevoree.log.Log.get_LEVEL_DEBUG()) {
                builder.append(this.get_debug_msg());
              }
               else if (level === _.org.kevoree.log.Log.get_LEVEL_TRACE()) {
                builder.append(this.get_trace_msg());
              }
               else {
              }
              if (this.get_category() != null) {
                builder.append_0('[');
                var tmp$0;
                builder.append(((tmp$0 = this.get_category()) != null ? tmp$0 : Kotlin.throwNPE()).toString());
                builder.append('] ');
              }
              builder.append(message);
              if (ex != null) {
                builder.append(Kotlin.toString(ex.getMessage()));
              }
              this.print(builder.toString());
            },
            print: function (message) {
              Kotlin.println(message);
            }
          })
        }),
        modeling: Kotlin.definePackage({
          api: Kotlin.definePackage({
            compare: Kotlin.definePackage({
              ModelCompare: classes.c7
            }),
            events: Kotlin.definePackage({
              ModelElementListener: classes.c8,
              ModelEvent: Kotlin.createClass(null, /** @lends _.org.kevoree.modeling.api.events.ModelEvent.prototype */ {
                initialize: function (internal_sourcePath, internal_etype, internal_elementAttributeType, internal_elementAttributeName, internal_value) {
                  this.$internal_sourcePath = internal_sourcePath;
                  this.$internal_etype = internal_etype;
                  this.$internal_elementAttributeType = internal_elementAttributeType;
                  this.$internal_elementAttributeName = internal_elementAttributeName;
                  this.$internal_value = internal_value;
                },
                get_internal_sourcePath: function () {
                  return this.$internal_sourcePath;
                },
                get_internal_etype: function () {
                  return this.$internal_etype;
                },
                get_internal_elementAttributeType: function () {
                  return this.$internal_elementAttributeType;
                },
                get_internal_elementAttributeName: function () {
                  return this.$internal_elementAttributeName;
                },
                get_internal_value: function () {
                  return this.$internal_value;
                },
                getSourcePath: function () {
                  return this.get_internal_sourcePath();
                },
                getType: function () {
                  return this.get_internal_etype();
                },
                getElementAttributeType: function () {
                  return this.get_internal_elementAttributeType();
                },
                getElementAttributeName: function () {
                  return this.get_internal_elementAttributeName();
                },
                getValue: function () {
                  return this.get_internal_value();
                },
                toString: function () {
                  return 'ModelEvent[src:' + this.getSourcePath() + ', type:' + this.getType() + ', elementAttributeType:' + this.getElementAttributeType() + ', elementAttributeName:' + this.getElementAttributeName() + ', value:' + this.getValue() + ']';
                }
              }),
              ModelTreeListener: classes.c9
            }),
            json: Kotlin.definePackage({
              JSONModelLoader: classes.ca,
              ResolveCommand: Kotlin.createClass(null, /** @lends _.org.kevoree.modeling.api.json.ResolveCommand.prototype */ {
                initialize: function (roots, ref, currentRootElem, refName) {
                  this.$roots = roots;
                  this.$ref = ref;
                  this.$currentRootElem = currentRootElem;
                  this.$refName = refName;
                },
                get_roots: function () {
                  return this.$roots;
                },
                get_ref: function () {
                  return this.$ref;
                },
                get_currentRootElem: function () {
                  return this.$currentRootElem;
                },
                get_refName: function () {
                  return this.$refName;
                },
                run: function () {
                  var referencedElement = null;
                  var i = 0;
                  while (referencedElement == null && i < this.get_roots().size()) {
                    referencedElement = this.get_roots().get(i++).findByPath(this.get_ref());
                  }
                  if (referencedElement != null) {
                    this.get_currentRootElem().reflexiveMutator(_.org.kevoree.modeling.api.util.ActionType.get_ADD(), this.get_refName(), referencedElement, false);
                  }
                }
              }),
              ModelReferenceVisitor: Kotlin.createClass(classes.cl, /** @lends _.org.kevoree.modeling.api.json.ModelReferenceVisitor.prototype */ {
                initialize: function (out) {
                  this.$out = out;
                  this.super_init();
                  this.$isFirst = true;
                },
                get_out: function () {
                  return this.$out;
                },
                beginVisitRef: function (refName) {
                  this.get_out().print(',"' + refName + '":[');
                  this.set_isFirst(true);
                },
                endVisitRef: function (refName) {
                  this.get_out().print(']');
                },
                get_isFirst: function () {
                  return this.$isFirst;
                },
                set_isFirst: function (tmp$0) {
                  this.$isFirst = tmp$0;
                },
                visit: function (elem, refNameInParent, parent) {
                  if (!this.get_isFirst()) {
                    this.get_out().print(',');
                  }
                   else {
                    this.set_isFirst(false);
                  }
                  this.get_out().print('"' + elem.path() + '"');
                }
              }),
              JSONModelSerializer: classes.cb,
              Token: Kotlin.createClass(null, /** @lends _.org.kevoree.modeling.api.json.Token.prototype */ {
                initialize: function (tokenType, value) {
                  this.$tokenType = tokenType;
                  this.$value = value;
                },
                get_tokenType: function () {
                  return this.$tokenType;
                },
                get_value: function () {
                  return this.$value;
                },
                toString: function () {
                  var tmp$0;
                  if (this.get_value() != null) {
                    tmp$0 = ' (' + this.get_value() + ')';
                  }
                   else {
                    tmp$0 = '';
                  }
                  var v = tmp$0;
                  var result = Kotlin.toString(this.get_tokenType()) + v;
                  return result;
                }
              }),
              Lexer: Kotlin.createClass(null, /** @lends _.org.kevoree.modeling.api.json.Lexer.prototype */ {
                initialize: function (inputStream) {
                  this.$inputStream = inputStream;
                  this.$bytes = this.get_inputStream().readBytes();
                  this.$EOF = new _.org.kevoree.modeling.api.json.Token(_.org.kevoree.modeling.api.json.Type.get_EOF(), null);
                  this.$index = 0;
                  this.$BOOLEAN_LETTERS = null;
                  this.$DIGIT = null;
                },
                get_inputStream: function () {
                  return this.$inputStream;
                },
                get_bytes: function () {
                  return this.$bytes;
                },
                get_EOF: function () {
                  return this.$EOF;
                },
                get_index: function () {
                  return this.$index;
                },
                set_index: function (tmp$0) {
                  this.$index = tmp$0;
                },
                isSpace: function (c) {
                  return c === ' ' || c === '\r' || c === '\n' || c === '\t';
                },
                nextChar: function () {
                  var tmp$0, tmp$1, tmp$2;
                  return (tmp$2 = this.get_bytes()[tmp$0 = this.get_index(), tmp$1 = tmp$0, this.set_index(tmp$0 + 1), tmp$1]) != null ? tmp$2 : Kotlin.throwNPE();
                },
                peekChar: function () {
                  var tmp$0;
                  return (tmp$0 = this.get_bytes()[this.get_index()]) != null ? tmp$0 : Kotlin.throwNPE();
                },
                isDone: function () {
                  return this.get_index() >= this.get_bytes().length;
                },
                get_BOOLEAN_LETTERS: function () {
                  return this.$BOOLEAN_LETTERS;
                },
                set_BOOLEAN_LETTERS: function (tmp$0) {
                  this.$BOOLEAN_LETTERS = tmp$0;
                },
                isBooleanLetter: function (c) {
                  if (this.get_BOOLEAN_LETTERS() == null) {
                    this.set_BOOLEAN_LETTERS(new Kotlin.PrimitiveHashSet());
                    var tmp$0, tmp$1, tmp$2, tmp$3, tmp$4, tmp$5, tmp$6, tmp$7;
                    ((tmp$0 = this.get_BOOLEAN_LETTERS()) != null ? tmp$0 : Kotlin.throwNPE()).add('f');
                    ((tmp$1 = this.get_BOOLEAN_LETTERS()) != null ? tmp$1 : Kotlin.throwNPE()).add('a');
                    ((tmp$2 = this.get_BOOLEAN_LETTERS()) != null ? tmp$2 : Kotlin.throwNPE()).add('l');
                    ((tmp$3 = this.get_BOOLEAN_LETTERS()) != null ? tmp$3 : Kotlin.throwNPE()).add('s');
                    ((tmp$4 = this.get_BOOLEAN_LETTERS()) != null ? tmp$4 : Kotlin.throwNPE()).add('e');
                    ((tmp$5 = this.get_BOOLEAN_LETTERS()) != null ? tmp$5 : Kotlin.throwNPE()).add('t');
                    ((tmp$6 = this.get_BOOLEAN_LETTERS()) != null ? tmp$6 : Kotlin.throwNPE()).add('r');
                    ((tmp$7 = this.get_BOOLEAN_LETTERS()) != null ? tmp$7 : Kotlin.throwNPE()).add('u');
                  }
                  var tmp$8;
                  return ((tmp$8 = this.get_BOOLEAN_LETTERS()) != null ? tmp$8 : Kotlin.throwNPE()).contains(c);
                },
                get_DIGIT: function () {
                  return this.$DIGIT;
                },
                set_DIGIT: function (tmp$0) {
                  this.$DIGIT = tmp$0;
                },
                isDigit: function (c) {
                  if (this.get_DIGIT() == null) {
                    this.set_DIGIT(new Kotlin.PrimitiveHashSet());
                    var tmp$0, tmp$1, tmp$2, tmp$3, tmp$4, tmp$5, tmp$6, tmp$7, tmp$8, tmp$9;
                    ((tmp$0 = this.get_DIGIT()) != null ? tmp$0 : Kotlin.throwNPE()).add('0');
                    ((tmp$1 = this.get_DIGIT()) != null ? tmp$1 : Kotlin.throwNPE()).add('1');
                    ((tmp$2 = this.get_DIGIT()) != null ? tmp$2 : Kotlin.throwNPE()).add('2');
                    ((tmp$3 = this.get_DIGIT()) != null ? tmp$3 : Kotlin.throwNPE()).add('3');
                    ((tmp$4 = this.get_DIGIT()) != null ? tmp$4 : Kotlin.throwNPE()).add('4');
                    ((tmp$5 = this.get_DIGIT()) != null ? tmp$5 : Kotlin.throwNPE()).add('5');
                    ((tmp$6 = this.get_DIGIT()) != null ? tmp$6 : Kotlin.throwNPE()).add('6');
                    ((tmp$7 = this.get_DIGIT()) != null ? tmp$7 : Kotlin.throwNPE()).add('7');
                    ((tmp$8 = this.get_DIGIT()) != null ? tmp$8 : Kotlin.throwNPE()).add('8');
                    ((tmp$9 = this.get_DIGIT()) != null ? tmp$9 : Kotlin.throwNPE()).add('9');
                  }
                  var tmp$10;
                  return ((tmp$10 = this.get_DIGIT()) != null ? tmp$10 : Kotlin.throwNPE()).contains(c);
                },
                isValueLetter: function (c) {
                  return c === '-' || c === '+' || c === '.' || this.isDigit(c) || this.isBooleanLetter(c);
                },
                nextToken: function () {
                  if (this.isDone()) {
                    return this.get_EOF();
                  }
                  var tokenType = _.org.kevoree.modeling.api.json.Type.get_EOF();
                  var c = this.nextChar();
                  var currentValue = new _.java.lang.StringBuilder();
                  var jsonValue = null;
                  while (!this.isDone() && this.isSpace(c)) {
                    c = this.nextChar();
                  }
                  if ('"' === c) {
                    tokenType = _.org.kevoree.modeling.api.json.Type.get_VALUE();
                    if (!this.isDone()) {
                      c = this.nextChar();
                      while (this.get_index() < this.get_bytes().length && c !== '"') {
                        currentValue.append_0(c);
                        if (c === '\\' && this.get_index() < this.get_bytes().length) {
                          c = this.nextChar();
                          currentValue.append_0(c);
                        }
                        c = this.nextChar();
                      }
                      jsonValue = currentValue.toString();
                    }
                     else {
                      throw new Kotlin.RuntimeException('Unterminated string');
                    }
                  }
                   else if ('{' === c) {
                    tokenType = _.org.kevoree.modeling.api.json.Type.get_LEFT_BRACE();
                  }
                   else if ('}' === c) {
                    tokenType = _.org.kevoree.modeling.api.json.Type.get_RIGHT_BRACE();
                  }
                   else if ('[' === c) {
                    tokenType = _.org.kevoree.modeling.api.json.Type.get_LEFT_BRACKET();
                  }
                   else if (']' === c) {
                    tokenType = _.org.kevoree.modeling.api.json.Type.get_RIGHT_BRACKET();
                  }
                   else if (':' === c) {
                    tokenType = _.org.kevoree.modeling.api.json.Type.get_COLON();
                  }
                   else if (',' === c) {
                    tokenType = _.org.kevoree.modeling.api.json.Type.get_COMMA();
                  }
                   else if (!this.isDone()) {
                    while (this.isValueLetter(c)) {
                      currentValue.append_0(c);
                      if (!this.isValueLetter(this.peekChar())) {
                        break;
                      }
                       else {
                        c = this.nextChar();
                      }
                    }
                    var v = currentValue.toString();
                    if (Kotlin.equals('true', v.toLowerCase())) {
                      jsonValue = true;
                    }
                     else if (Kotlin.equals('false', v.toLowerCase())) {
                      jsonValue = false;
                    }
                     else {
                      jsonValue = v.toLowerCase();
                    }
                    tokenType = _.org.kevoree.modeling.api.json.Type.get_VALUE();
                  }
                   else {
                    tokenType = _.org.kevoree.modeling.api.json.Type.get_EOF();
                  }
                  return new _.org.kevoree.modeling.api.json.Token(tokenType, jsonValue);
                }
              })
            }),
            KMFContainer: classes.cc,
            KMFFactory: classes.cd,
            ModelCloner: classes.ce,
            ModelLoader: classes.cf,
            ModelSerializer: classes.cg,
            trace: Kotlin.definePackage({
              DefaultTraceConverter: Kotlin.createClass(classes.ci, /** @lends _.org.kevoree.modeling.api.trace.DefaultTraceConverter.prototype */ {
                initialize: function () {
                  this.$metaClassNameEquivalence_1 = new Kotlin.PrimitiveHashMap(0);
                  this.$metaClassNameEquivalence_2 = new Kotlin.PrimitiveHashMap(0);
                  this.$attNameEquivalence_1 = new Kotlin.PrimitiveHashMap(0);
                  this.$attNameEquivalence_2 = new Kotlin.PrimitiveHashMap(0);
                },
                get_metaClassNameEquivalence_1: function () {
                  return this.$metaClassNameEquivalence_1;
                },
                set_metaClassNameEquivalence_1: function (tmp$0) {
                  this.$metaClassNameEquivalence_1 = tmp$0;
                },
                get_metaClassNameEquivalence_2: function () {
                  return this.$metaClassNameEquivalence_2;
                },
                set_metaClassNameEquivalence_2: function (tmp$0) {
                  this.$metaClassNameEquivalence_2 = tmp$0;
                },
                get_attNameEquivalence_1: function () {
                  return this.$attNameEquivalence_1;
                },
                set_attNameEquivalence_1: function (tmp$0) {
                  this.$attNameEquivalence_1 = tmp$0;
                },
                get_attNameEquivalence_2: function () {
                  return this.$attNameEquivalence_2;
                },
                set_attNameEquivalence_2: function (tmp$0) {
                  this.$attNameEquivalence_2 = tmp$0;
                },
                addMetaClassEquivalence: function (name1, name2) {
                  this.get_metaClassNameEquivalence_1().put(name1, name2);
                  this.get_metaClassNameEquivalence_2().put(name2, name2);
                },
                addAttEquivalence: function (name1, name2) {
                  var fqnArray_1 = Kotlin.splitString(name1, '#');
                  var fqnArray_2 = Kotlin.splitString(name1, '#');
                  this.get_attNameEquivalence_1().put(name1, name2);
                  this.get_attNameEquivalence_2().put(name2, name2);
                },
                convert: function (trace) {
                  if (Kotlin.isType(trace, _.org.kevoree.modeling.api.trace.ModelAddTrace)) {
                    var addTrace = trace != null ? trace : Kotlin.throwNPE();
                    var newTrace = new _.org.kevoree.modeling.api.trace.ModelAddTrace(addTrace.get_srcPath(), addTrace.get_refName(), addTrace.get_previousPath(), this.tryConvertClassName(addTrace.get_typeName()));
                    return newTrace;
                  }
                   else if (Kotlin.isType(trace, _.org.kevoree.modeling.api.trace.ModelSetTrace)) {
                    var setTrace = trace != null ? trace : Kotlin.throwNPE();
                    var newTrace_0 = new _.org.kevoree.modeling.api.trace.ModelSetTrace(setTrace.get_srcPath(), setTrace.get_refName(), setTrace.get_objPath(), setTrace.get_content(), this.tryConvertClassName(setTrace.get_typeName()));
                    return newTrace_0;
                  }
                   else {
                    return trace;
                  }
                },
                tryConvertPath: function (previousPath) {
                  if (previousPath == null) {
                    return null;
                  }
                  return previousPath;
                },
                tryConvertClassName: function (previousClassName) {
                  if (previousClassName == null) {
                    return null;
                  }
                  if (this.get_metaClassNameEquivalence_1().containsKey(previousClassName)) {
                    var tmp$0;
                    return (tmp$0 = this.get_metaClassNameEquivalence_1().get(previousClassName)) != null ? tmp$0 : Kotlin.throwNPE();
                  }
                  if (this.get_metaClassNameEquivalence_2().containsKey(previousClassName)) {
                    var tmp$1;
                    return (tmp$1 = this.get_metaClassNameEquivalence_2().get(previousClassName)) != null ? tmp$1 : Kotlin.throwNPE();
                  }
                  return previousClassName;
                },
                tryConvertAttName: function (previousAttName) {
                  if (previousAttName == null) {
                    return null;
                  }
                  var FQNattName = previousAttName;
                  if (this.get_attNameEquivalence_1().containsKey(FQNattName)) {
                    var tmp$0;
                    return (tmp$0 = this.get_attNameEquivalence_1().get(FQNattName)) != null ? tmp$0 : Kotlin.throwNPE();
                  }
                  if (this.get_attNameEquivalence_2().containsKey(FQNattName)) {
                    var tmp$1;
                    return (tmp$1 = this.get_attNameEquivalence_2().get(FQNattName)) != null ? tmp$1 : Kotlin.throwNPE();
                  }
                  return previousAttName;
                }
              }),
              Event2Trace: Kotlin.createClass(null, /** @lends _.org.kevoree.modeling.api.trace.Event2Trace.prototype */ {
                initialize: function (compare) {
                  this.$compare = compare;
                },
                get_compare: function () {
                  return this.$compare;
                },
                convert: function (event) {
                  var result = new Kotlin.ArrayList(0);
                  var tmp$0 = event.getType();
                  if (tmp$0 === _.org.kevoree.modeling.api.util.ActionType.get_REMOVE()) {
                    var tmp$1, tmp$2, tmp$3, tmp$4;
                    result.add(new _.org.kevoree.modeling.api.trace.ModelRemoveTrace((tmp$1 = event.getSourcePath()) != null ? tmp$1 : Kotlin.throwNPE(), (tmp$2 = event.getElementAttributeName()) != null ? tmp$2 : Kotlin.throwNPE(), (tmp$4 = ((tmp$3 = event.getValue()) != null ? tmp$3 : Kotlin.throwNPE()).path()) != null ? tmp$4 : Kotlin.throwNPE()));
                  }
                   else if (tmp$0 === _.org.kevoree.modeling.api.util.ActionType.get_REMOVE()) {
                    var tmp$5, tmp$6;
                    result.add(new _.org.kevoree.modeling.api.trace.ModelRemoveAllTrace((tmp$5 = event.getSourcePath()) != null ? tmp$5 : Kotlin.throwNPE(), (tmp$6 = event.getElementAttributeName()) != null ? tmp$6 : Kotlin.throwNPE()));
                  }
                   else if (tmp$0 === _.org.kevoree.modeling.api.util.ActionType.get_ADD()) {
                    var tmp$7, tmp$8, tmp$9;
                    var casted = (tmp$7 = event.getValue()) != null ? tmp$7 : Kotlin.throwNPE();
                    var traces = this.get_compare().inter(casted, casted);
                    result.add(new _.org.kevoree.modeling.api.trace.ModelAddTrace((tmp$8 = event.getSourcePath()) != null ? tmp$8 : Kotlin.throwNPE(), (tmp$9 = event.getElementAttributeName()) != null ? tmp$9 : Kotlin.throwNPE(), casted.path(), casted.metaClassName()));
                    result.addAll(traces.get_traces());
                  }
                   else if (tmp$0 === _.org.kevoree.modeling.api.util.ActionType.get_ADD_ALL()) {
                    var tmp$10;
                    var casted_0 = (tmp$10 = event.getValue()) != null ? tmp$10 : Kotlin.throwNPE();
                    {
                      var tmp$11 = (casted_0 != null ? casted_0 : Kotlin.throwNPE()).iterator();
                      while (tmp$11.hasNext()) {
                        var elem = tmp$11.next();
                        var elemCasted = elem != null ? elem : Kotlin.throwNPE();
                        var traces_0 = this.get_compare().inter(elemCasted, elemCasted);
                        var tmp$12, tmp$13;
                        result.add(new _.org.kevoree.modeling.api.trace.ModelAddTrace((tmp$12 = event.getSourcePath()) != null ? tmp$12 : Kotlin.throwNPE(), (tmp$13 = event.getElementAttributeName()) != null ? tmp$13 : Kotlin.throwNPE(), elemCasted.path(), elemCasted.metaClassName()));
                        result.addAll(traces_0.get_traces());
                      }
                    }
                  }
                   else if (tmp$0 === _.org.kevoree.modeling.api.util.ActionType.get_SET()) {
                    if (event.getElementAttributeType() === _.org.kevoree.modeling.api.util.ElementAttributeType.get_ATTRIBUTE()) {
                      var tmp$14, tmp$15;
                      result.add(new _.org.kevoree.modeling.api.trace.ModelSetTrace((tmp$14 = event.getSourcePath()) != null ? tmp$14 : Kotlin.throwNPE(), (tmp$15 = event.getElementAttributeName()) != null ? tmp$15 : Kotlin.throwNPE(), null, Kotlin.toString(event.getValue()), null));
                    }
                     else {
                      var tmp$16, tmp$17, tmp$18;
                      result.add(new _.org.kevoree.modeling.api.trace.ModelSetTrace((tmp$16 = event.getSourcePath()) != null ? tmp$16 : Kotlin.throwNPE(), (tmp$17 = event.getElementAttributeName()) != null ? tmp$17 : Kotlin.throwNPE(), ((tmp$18 = event.getValue()) != null ? tmp$18 : Kotlin.throwNPE()).path(), null, null));
                    }
                  }
                   else if (tmp$0 === _.org.kevoree.modeling.api.util.ActionType.get_RENEW_INDEX()) {
                  }
                   else {
                    throw new Error("Can't convert event : " + event);
                  }
                  return this.get_compare().createSequence().populate(result);
                }
              }),
              ModelTrace: classes.ch,
              ModelAddTrace: Kotlin.createClass(classes.ch, /** @lends _.org.kevoree.modeling.api.trace.ModelAddTrace.prototype */ {
                initialize: function (srcPath, refName, previousPath, typeName) {
                  this.$srcPath = srcPath;
                  this.$refName = refName;
                  this.$previousPath = previousPath;
                  this.$typeName = typeName;
                },
                get_srcPath: function () {
                  return this.$srcPath;
                },
                get_refName: function () {
                  return this.$refName;
                },
                get_previousPath: function () {
                  return this.$previousPath;
                },
                get_typeName: function () {
                  return this.$typeName;
                },
                toString: function () {
                  var buffer = new _.java.lang.StringBuilder();
                  buffer.append('{ "traceType" : ' + _.org.kevoree.modeling.api.util.ActionType.get_ADD() + ' , "src" : "' + this.get_srcPath() + '", "refname" : "' + this.get_refName() + '"');
                  if (this.get_previousPath() != null) {
                    buffer.append(', "previouspath" : "' + this.get_previousPath() + '"');
                  }
                  if (this.get_typeName() != null) {
                    buffer.append(', "typename" : "' + this.get_typeName() + '"');
                  }
                  buffer.append('}');
                  return buffer.toString();
                }
              }),
              ModelAddAllTrace: Kotlin.createClass(classes.ch, /** @lends _.org.kevoree.modeling.api.trace.ModelAddAllTrace.prototype */ {
                initialize: function (srcPath, refName, previousPath, typeName) {
                  this.$srcPath = srcPath;
                  this.$refName = refName;
                  this.$previousPath = previousPath;
                  this.$typeName = typeName;
                },
                get_srcPath: function () {
                  return this.$srcPath;
                },
                get_refName: function () {
                  return this.$refName;
                },
                get_previousPath: function () {
                  return this.$previousPath;
                },
                get_typeName: function () {
                  return this.$typeName;
                },
                mkString: function (ss) {
                  if (ss == null) {
                    return null;
                  }
                  var buffer = new _.java.lang.StringBuilder();
                  var isFirst = true;
                  {
                    var tmp$0 = ss.iterator();
                    while (tmp$0.hasNext()) {
                      var s = tmp$0.next();
                      if (!isFirst) {
                        buffer.append(',');
                      }
                      buffer.append(s);
                      isFirst = false;
                    }
                  }
                  return buffer.toString();
                },
                toString: function () {
                  var buffer = new _.java.lang.StringBuilder();
                  buffer.append('{ "traceType" : ' + _.org.kevoree.modeling.api.util.ActionType.get_ADD_ALL() + ' , "src" : "' + this.get_srcPath() + '", "refname" : "' + this.get_refName() + '"');
                  if (this.get_previousPath() != null) {
                    buffer.append(', "previouspath" : "' + this.mkString(this.get_previousPath()) + '"');
                  }
                  if (this.get_typeName() != null) {
                    buffer.append(', "typename" : "' + this.mkString(this.get_typeName()) + '"');
                  }
                  buffer.append('}');
                  return buffer.toString();
                }
              }),
              ModelRemoveTrace: Kotlin.createClass(classes.ch, /** @lends _.org.kevoree.modeling.api.trace.ModelRemoveTrace.prototype */ {
                initialize: function (srcPath, refName, objPath) {
                  this.$srcPath = srcPath;
                  this.$refName = refName;
                  this.$objPath = objPath;
                },
                get_srcPath: function () {
                  return this.$srcPath;
                },
                get_refName: function () {
                  return this.$refName;
                },
                get_objPath: function () {
                  return this.$objPath;
                },
                toString: function () {
                  return '{ "traceType" : ' + _.org.kevoree.modeling.api.util.ActionType.get_REMOVE() + ' , "src" : "' + this.get_srcPath() + '", "refname" : "' + this.get_refName() + '", "objpath" : "' + this.get_objPath() + '" }';
                }
              }),
              ModelRemoveAllTrace: Kotlin.createClass(classes.ch, /** @lends _.org.kevoree.modeling.api.trace.ModelRemoveAllTrace.prototype */ {
                initialize: function (srcPath, refName) {
                  this.$srcPath = srcPath;
                  this.$refName = refName;
                },
                get_srcPath: function () {
                  return this.$srcPath;
                },
                get_refName: function () {
                  return this.$refName;
                },
                toString: function () {
                  return '{ "traceType" : ' + _.org.kevoree.modeling.api.util.ActionType.get_REMOVE_ALL() + ' , "src" : "' + this.get_srcPath() + '", "refname" : "' + this.get_refName() + '" }';
                }
              }),
              ModelSetTrace: Kotlin.createClass(classes.ch, /** @lends _.org.kevoree.modeling.api.trace.ModelSetTrace.prototype */ {
                initialize: function (srcPath, refName, objPath, content, typeName) {
                  this.$srcPath = srcPath;
                  this.$refName = refName;
                  this.$objPath = objPath;
                  this.$content = content;
                  this.$typeName = typeName;
                },
                get_srcPath: function () {
                  return this.$srcPath;
                },
                get_refName: function () {
                  return this.$refName;
                },
                get_objPath: function () {
                  return this.$objPath;
                },
                get_content: function () {
                  return this.$content;
                },
                get_typeName: function () {
                  return this.$typeName;
                },
                toString: function () {
                  var buffer = new _.java.lang.StringBuilder();
                  buffer.append('{ "traceType" : ' + _.org.kevoree.modeling.api.util.ActionType.get_SET() + ' , "src" : "' + this.get_srcPath() + '", "refname" : "' + this.get_refName() + '"');
                  if (this.get_objPath() != null) {
                    buffer.append(', "objpath" : "' + this.get_objPath() + '"');
                  }
                  if (this.get_content() != null) {
                    buffer.append(', "content" : "' + this.get_content() + '"');
                  }
                  if (this.get_typeName() != null) {
                    buffer.append(', "typename" : "' + this.get_typeName() + '"');
                  }
                  buffer.append('}');
                  return buffer.toString();
                }
              }),
              ModelTraceApplicator: Kotlin.createClass(null, /** @lends _.org.kevoree.modeling.api.trace.ModelTraceApplicator.prototype */ {
                initialize: function (targetModel, factory) {
                  this.$targetModel = targetModel;
                  this.$factory = factory;
                  this.$pendingObj = null;
                  this.$pendingParent = null;
                  this.$pendingParentRefName = null;
                  this.$pendingObjPath = null;
                },
                get_targetModel: function () {
                  return this.$targetModel;
                },
                get_factory: function () {
                  return this.$factory;
                },
                get_pendingObj: function () {
                  return this.$pendingObj;
                },
                set_pendingObj: function (tmp$0) {
                  this.$pendingObj = tmp$0;
                },
                get_pendingParent: function () {
                  return this.$pendingParent;
                },
                set_pendingParent: function (tmp$0) {
                  this.$pendingParent = tmp$0;
                },
                get_pendingParentRefName: function () {
                  return this.$pendingParentRefName;
                },
                set_pendingParentRefName: function (tmp$0) {
                  this.$pendingParentRefName = tmp$0;
                },
                get_pendingObjPath: function () {
                  return this.$pendingObjPath;
                },
                set_pendingObjPath: function (tmp$0) {
                  this.$pendingObjPath = tmp$0;
                },
                tryClosePending: function (srcPath) {
                  if (this.get_pendingObj() != null && !Kotlin.equals(this.get_pendingObjPath(), srcPath)) {
                    var tmp$0, tmp$1;
                    ((tmp$0 = this.get_pendingParent()) != null ? tmp$0 : Kotlin.throwNPE()).reflexiveMutator(_.org.kevoree.modeling.api.util.ActionType.get_ADD(), (tmp$1 = this.get_pendingParentRefName()) != null ? tmp$1 : Kotlin.throwNPE(), this.get_pendingObj(), false);
                    this.set_pendingObj(null);
                    this.set_pendingObjPath(null);
                    this.set_pendingParentRefName(null);
                    this.set_pendingParent(null);
                  }
                },
                createOrAdd: function (previousPath, target, refName, potentialTypeName) {
                  var tmp$0;
                  if (previousPath != null) {
                    tmp$0 = this.get_targetModel().findByPath(previousPath);
                  }
                   else {
                    tmp$0 = null;
                  }
                  var targetElem = tmp$0;
                  if (targetElem != null) {
                    target.reflexiveMutator(_.org.kevoree.modeling.api.util.ActionType.get_ADD(), refName, targetElem, false);
                  }
                   else {
                    this.set_pendingObj(this.get_factory().create(potentialTypeName != null ? potentialTypeName : Kotlin.throwNPE()));
                    this.set_pendingObjPath(previousPath);
                    this.set_pendingParentRefName(refName);
                    this.set_pendingParent(target);
                  }
                },
                applyTraceOnModel: function (traceSeq) {
                  {
                    var tmp$0 = traceSeq.get_traces().iterator();
                    while (tmp$0.hasNext()) {
                      var trace = tmp$0.next();
                      var target = this.get_targetModel();
                      if (Kotlin.isType(trace, _.org.kevoree.modeling.api.trace.ModelAddTrace)) {
                        var castedTrace = trace != null ? trace : Kotlin.throwNPE();
                        this.tryClosePending('#Fake#Path');
                        if (!Kotlin.equals(trace.get_srcPath(), '')) {
                          var tmp$1;
                          target = (tmp$1 = this.get_targetModel().findByPath(castedTrace.get_srcPath())) != null ? tmp$1 : Kotlin.throwNPE();
                        }
                        this.createOrAdd(castedTrace.get_previousPath(), target, castedTrace.get_refName(), castedTrace.get_typeName());
                      }
                      if (Kotlin.isType(trace, _.org.kevoree.modeling.api.trace.ModelAddAllTrace)) {
                        var castedTrace_0 = trace != null ? trace : Kotlin.throwNPE();
                        this.tryClosePending('#Fake#Path');
                        var i = 0;
                        var tmp$2;
                        {
                          var tmp$3 = ((tmp$2 = castedTrace_0.get_previousPath()) != null ? tmp$2 : Kotlin.throwNPE()).iterator();
                          while (tmp$3.hasNext()) {
                            var path = tmp$3.next();
                            var tmp$4;
                            this.createOrAdd(path, target, castedTrace_0.get_refName(), ((tmp$4 = castedTrace_0.get_typeName()) != null ? tmp$4 : Kotlin.throwNPE()).get(i));
                            i++;
                          }
                        }
                      }
                      if (Kotlin.isType(trace, _.org.kevoree.modeling.api.trace.ModelRemoveTrace)) {
                        var castedTrace_1 = trace != null ? trace : Kotlin.throwNPE();
                        this.tryClosePending(trace.get_srcPath());
                        var tempTarget = this.get_targetModel();
                        if (!Kotlin.equals(trace.get_srcPath(), '')) {
                          tempTarget = this.get_targetModel().findByPath(castedTrace_1.get_srcPath());
                        }
                        if (tempTarget != null) {
                          (tempTarget != null ? tempTarget : Kotlin.throwNPE()).reflexiveMutator(_.org.kevoree.modeling.api.util.ActionType.get_REMOVE(), castedTrace_1.get_refName(), this.get_targetModel().findByPath(castedTrace_1.get_objPath()), false);
                        }
                      }
                      if (Kotlin.isType(trace, _.org.kevoree.modeling.api.trace.ModelRemoveAllTrace)) {
                        var castedTrace_2 = trace != null ? trace : Kotlin.throwNPE();
                        this.tryClosePending(trace.get_srcPath());
                        var tempTarget_0 = this.get_targetModel();
                        if (!Kotlin.equals(trace.get_srcPath(), '')) {
                          tempTarget_0 = this.get_targetModel().findByPath(castedTrace_2.get_srcPath());
                        }
                        if (tempTarget_0 != null) {
                          (tempTarget_0 != null ? tempTarget_0 : Kotlin.throwNPE()).reflexiveMutator(_.org.kevoree.modeling.api.util.ActionType.get_REMOVE_ALL(), castedTrace_2.get_refName(), null, false);
                        }
                      }
                      if (Kotlin.isType(trace, _.org.kevoree.modeling.api.trace.ModelSetTrace)) {
                        var castedTrace_3 = trace != null ? trace : Kotlin.throwNPE();
                        this.tryClosePending(trace.get_srcPath());
                        if (!Kotlin.equals(trace.get_srcPath(), '') && !Kotlin.equals(castedTrace_3.get_srcPath(), this.get_pendingObjPath())) {
                          var tempObject = this.get_targetModel().findByPath(castedTrace_3.get_srcPath());
                          if (tempObject == null) {
                            throw new Error('Set Trace source not found for path : ' + castedTrace_3.get_srcPath() + '/ pending ' + this.get_pendingObjPath() + '\n' + trace.toString());
                          }
                          target = tempObject != null ? tempObject : Kotlin.throwNPE();
                        }
                         else {
                          if (Kotlin.equals(castedTrace_3.get_srcPath(), this.get_pendingObjPath()) && this.get_pendingObj() != null) {
                            var tmp$5;
                            target = (tmp$5 = this.get_pendingObj()) != null ? tmp$5 : Kotlin.throwNPE();
                          }
                        }
                        if (castedTrace_3.get_content() != null) {
                          target.reflexiveMutator(_.org.kevoree.modeling.api.util.ActionType.get_SET(), castedTrace_3.get_refName(), castedTrace_3.get_content(), false);
                        }
                         else {
                          var tmp$7;
                          if (castedTrace_3.get_objPath() != null) {
                            var tmp$6;
                            tmp$7 = this.get_targetModel().findByPath((tmp$6 = castedTrace_3.get_objPath()) != null ? tmp$6 : Kotlin.throwNPE());
                          }
                           else {
                            tmp$7 = null;
                          }
                          var targetContentPath = tmp$7;
                          if (targetContentPath != null) {
                            target.reflexiveMutator(_.org.kevoree.modeling.api.util.ActionType.get_SET(), castedTrace_3.get_refName(), targetContentPath, false);
                          }
                           else {
                            if (castedTrace_3.get_typeName() != null && !Kotlin.equals(castedTrace_3.get_typeName(), '')) {
                              this.createOrAdd(castedTrace_3.get_objPath(), target, castedTrace_3.get_refName(), castedTrace_3.get_typeName());
                            }
                             else {
                              target.reflexiveMutator(_.org.kevoree.modeling.api.util.ActionType.get_SET(), castedTrace_3.get_refName(), targetContentPath, false);
                            }
                          }
                        }
                      }
                    }
                  }
                  this.tryClosePending('#Fake#Path');
                }
              }),
              TraceConverter: classes.ci,
              TraceSequence: classes.cj
            }),
            util: Kotlin.definePackage({
              ModelAttributeVisitor: classes.ck,
              ModelVisitor: classes.cl
            })
          })
        })
      }),
      w3c: Kotlin.definePackage({
        dom: Kotlin.definePackage({
          events: Kotlin.definePackage({
            EventListener: classes.cm
          })
        })
      })
    }),
    js: Kotlin.definePackage({
      lastIndexOf: function ($receiver, ch, fromIndex) {
        return $receiver.lastIndexOf(Kotlin.toString(ch), fromIndex);
      },
      lastIndexOf_0: function ($receiver, ch) {
        return $receiver.lastIndexOf(Kotlin.toString(ch));
      },
      indexOf: function ($receiver, ch) {
        return $receiver.indexOf(Kotlin.toString(ch));
      },
      indexOf_0: function ($receiver, ch, fromIndex) {
        return $receiver.indexOf(Kotlin.toString(ch), fromIndex);
      },
      matches: function ($receiver, regex) {
        var result = $receiver.match(regex);
        return result != null && result.length > 0;
      },
      capitalize: function ($receiver) {
        return _.kotlin.notEmpty($receiver) ? $receiver.substring(0, 1).toUpperCase() + $receiver.substring(1) : $receiver;
      },
      decapitalize: function ($receiver) {
        return _.kotlin.notEmpty($receiver) ? $receiver.substring(0, 1).toLowerCase() + $receiver.substring(1) : $receiver;
      }
    })
  };
  (function () {
    this.Package = Kotlin.createObject(null, {
      initialize: function () {
        this.$ORG_CLOUD = 0;
      },
      get_ORG_CLOUD: function () {
        return this.$ORG_CLOUD;
      },
      getPackageForName: function (metaClassName) {
        if (metaClassName.startsWith('org.cloud')) {
          return 0;
        }
        return -1;
      }
    });
  }.call(_.org.cloud.factory));
  (function () {
    this.Constants = Kotlin.createObject(null, {
      initialize: function () {
        this.$UNKNOWN_MUTATION_TYPE_EXCEPTION = 'Unknown mutation type: ';
        this.$READ_ONLY_EXCEPTION = 'This model is ReadOnly. Elements are not modifiable.';
        this.$LIST_PARAMETER_OF_SET_IS_NULL_EXCEPTION = 'The list in parameter of the setter cannot be null. Use removeAll to empty a collection.';
        this.$ELEMENT_HAS_NO_KEY_IN_COLLECTION = 'Cannot set the collection, because at least one element of it has no key!';
        this.$EMPTY_KEY = 'Key empty : please set the attribute key before adding the object.';
        this.$LOADER_XMI_LOCAL_NAME = 'type';
        this.$LOADER_XMI_XSI = 'xsi';
        this.$KMFQL_CONTAINED = 'contained';
        this.$Ref_nodes = 'nodes';
        this.$CN_Software = 'Software';
        this.$CN_Cloud = 'Cloud';
        this.$org_cloud_Software = 'org.cloud.Software';
        this.$Att_name = 'name';
        this.$org_cloud_Cloud = 'org.cloud.Cloud';
        this.$org_cloud_Node = 'org.cloud.Node';
        this.$CN_Node = 'Node';
        this.$Att_id = 'id';
        this.$Att_generated_KMF_ID = 'generated_KMF_ID';
        this.$Ref_softwares = 'softwares';
      },
      get_UNKNOWN_MUTATION_TYPE_EXCEPTION: function () {
        return this.$UNKNOWN_MUTATION_TYPE_EXCEPTION;
      },
      get_READ_ONLY_EXCEPTION: function () {
        return this.$READ_ONLY_EXCEPTION;
      },
      get_LIST_PARAMETER_OF_SET_IS_NULL_EXCEPTION: function () {
        return this.$LIST_PARAMETER_OF_SET_IS_NULL_EXCEPTION;
      },
      get_ELEMENT_HAS_NO_KEY_IN_COLLECTION: function () {
        return this.$ELEMENT_HAS_NO_KEY_IN_COLLECTION;
      },
      get_EMPTY_KEY: function () {
        return this.$EMPTY_KEY;
      },
      get_LOADER_XMI_LOCAL_NAME: function () {
        return this.$LOADER_XMI_LOCAL_NAME;
      },
      get_LOADER_XMI_XSI: function () {
        return this.$LOADER_XMI_XSI;
      },
      get_KMFQL_CONTAINED: function () {
        return this.$KMFQL_CONTAINED;
      },
      get_Ref_nodes: function () {
        return this.$Ref_nodes;
      },
      get_CN_Software: function () {
        return this.$CN_Software;
      },
      get_CN_Cloud: function () {
        return this.$CN_Cloud;
      },
      get_org_cloud_Software: function () {
        return this.$org_cloud_Software;
      },
      get_Att_name: function () {
        return this.$Att_name;
      },
      get_org_cloud_Cloud: function () {
        return this.$org_cloud_Cloud;
      },
      get_org_cloud_Node: function () {
        return this.$org_cloud_Node;
      },
      get_CN_Node: function () {
        return this.$CN_Node;
      },
      get_Att_id: function () {
        return this.$Att_id;
      },
      get_Att_generated_KMF_ID: function () {
        return this.$Att_generated_KMF_ID;
      },
      get_Ref_softwares: function () {
        return this.$Ref_softwares;
      }
    });
  }.call(_.org.cloud.util));
  (function () {
    this.Log = Kotlin.createObject(null, {
      initialize: function () {
        this.$LEVEL_NONE = 6;
        this.$LEVEL_ERROR = 5;
        this.$LEVEL_WARN = 4;
        this.$LEVEL_INFO = 3;
        this.$LEVEL_DEBUG = 2;
        this.$LEVEL_TRACE = 1;
        this.$level = this.get_LEVEL_INFO();
        this.$ERROR = this.get_level() <= this.get_LEVEL_ERROR();
        this.$WARN = this.get_level() <= this.get_LEVEL_WARN();
        this.$INFO = this.get_level() <= this.get_LEVEL_INFO();
        this.$DEBUG = this.get_level() <= this.get_LEVEL_DEBUG();
        this.$TRACE = this.get_level() <= this.get_LEVEL_TRACE();
        this.$logger = new _.org.kevoree.log.Logger();
        this.$beginParam = '{';
        this.$endParam = '}';
      },
      get_LEVEL_NONE: function () {
        return this.$LEVEL_NONE;
      },
      get_LEVEL_ERROR: function () {
        return this.$LEVEL_ERROR;
      },
      get_LEVEL_WARN: function () {
        return this.$LEVEL_WARN;
      },
      get_LEVEL_INFO: function () {
        return this.$LEVEL_INFO;
      },
      get_LEVEL_DEBUG: function () {
        return this.$LEVEL_DEBUG;
      },
      get_LEVEL_TRACE: function () {
        return this.$LEVEL_TRACE;
      },
      get_level: function () {
        return this.$level;
      },
      set_level: function (tmp$0) {
        this.$level = tmp$0;
      },
      get_ERROR: function () {
        return this.$ERROR;
      },
      set_ERROR: function (tmp$0) {
        this.$ERROR = tmp$0;
      },
      get_WARN: function () {
        return this.$WARN;
      },
      set_WARN: function (tmp$0) {
        this.$WARN = tmp$0;
      },
      get_INFO: function () {
        return this.$INFO;
      },
      set_INFO: function (tmp$0) {
        this.$INFO = tmp$0;
      },
      get_DEBUG: function () {
        return this.$DEBUG;
      },
      set_DEBUG: function (tmp$0) {
        this.$DEBUG = tmp$0;
      },
      get_TRACE: function () {
        return this.$TRACE;
      },
      set_TRACE: function (tmp$0) {
        this.$TRACE = tmp$0;
      },
      set: function (level) {
        _.org.kevoree.log.Log.set_level(level);
        this.set_ERROR(level <= this.get_LEVEL_ERROR());
        this.set_WARN(level <= this.get_LEVEL_WARN());
        this.set_INFO(level <= this.get_LEVEL_INFO());
        this.set_DEBUG(level <= this.get_LEVEL_DEBUG());
        this.set_TRACE(level <= this.get_LEVEL_TRACE());
      },
      NONE: function () {
        this.set(this.get_LEVEL_NONE());
      },
      ERROR: function () {
        this.set(this.get_LEVEL_ERROR());
      },
      WARN: function () {
        this.set(this.get_LEVEL_WARN());
      },
      INFO: function () {
        this.set(this.get_LEVEL_INFO());
      },
      DEBUG: function () {
        this.set(this.get_LEVEL_DEBUG());
      },
      TRACE: function () {
        this.set(this.get_LEVEL_TRACE());
      },
      setLogger: function (logger) {
        _.org.kevoree.log.Log.set_logger(logger);
      },
      get_logger: function () {
        return this.$logger;
      },
      set_logger: function (tmp$0) {
        this.$logger = tmp$0;
      },
      get_beginParam: function () {
        return this.$beginParam;
      },
      get_endParam: function () {
        return this.$endParam;
      },
      processMessage: function (message, p1, p2, p3, p4, p5) {
        if (p1 == null) {
          return message;
        }
        var buffer = new _.java.lang.StringBuilder();
        var previousCharfound = false;
        var param = 0;
        var i = 0;
        while (i < message.length) {
          var currentChar = message.charAt(i);
          if (previousCharfound) {
            if (currentChar === this.get_endParam()) {
              param++;
              if (param === 1) {
                buffer = new _.java.lang.StringBuilder();
                buffer.append(message.substring(0, i - 1));
                buffer.append(Kotlin.toString(p1 != null ? p1 : Kotlin.throwNPE()));
              }
               else if (param === 2) {
                buffer.append(Kotlin.toString(p2 != null ? p2 : Kotlin.throwNPE()));
              }
               else if (param === 3) {
                buffer.append(Kotlin.toString(p3 != null ? p3 : Kotlin.throwNPE()));
              }
               else if (param === 4) {
                buffer.append(Kotlin.toString(p4 != null ? p4 : Kotlin.throwNPE()));
              }
               else if (param === 5) {
                buffer.append(Kotlin.toString(p5 != null ? p5 : Kotlin.throwNPE()));
              }
               else {
              }
              previousCharfound = false;
            }
             else {
              if (buffer != null) {
                message.charAt(i - 1);
                buffer.append_0(currentChar);
              }
              previousCharfound = false;
            }
          }
           else {
            if (currentChar === this.get_beginParam()) {
              previousCharfound = true;
            }
             else {
              if (buffer != null) {
                buffer.append_0(currentChar);
              }
            }
          }
          i = i + 1;
        }
        if (buffer != null) {
          return buffer.toString();
        }
         else {
          return message;
        }
      },
      error: function (message) {
        if (this.get_ERROR())
          this.get_logger().log(this.get_LEVEL_ERROR(), message, null);
      },
      error_0: function (message, ex) {
        if (this.get_ERROR())
          this.get_logger().log(this.get_LEVEL_ERROR(), message, ex);
      },
      error_1: function (message, ex, p1) {
        if (this.get_ERROR()) {
          this.error_0(this.processMessage(message, p1, null, null, null, null), ex);
        }
      },
      error_2: function (message, ex, p1, p2) {
        if (this.get_ERROR()) {
          this.error_0(this.processMessage(message, p1, p2, null, null, null), ex);
        }
      },
      error_3: function (message, ex, p1, p2, p3) {
        if (this.get_ERROR()) {
          this.error_0(this.processMessage(message, p1, p2, p3, null, null), ex);
        }
      },
      error_4: function (message, ex, p1, p2, p3, p4) {
        if (this.get_ERROR()) {
          this.error_0(this.processMessage(message, p1, p2, p3, p4, null), ex);
        }
      },
      error_5: function (message, ex, p1, p2, p3, p4, p5) {
        if (this.get_ERROR()) {
          this.error_0(this.processMessage(message, p1, p2, p3, p4, p5), ex);
        }
      },
      error_6: function (message, p1) {
        if (this.get_ERROR()) {
          this.error_0(this.processMessage(message, p1, null, null, null, null), null);
        }
      },
      error_7: function (message, p1, p2) {
        if (this.get_ERROR()) {
          this.error_0(this.processMessage(message, p1, p2, null, null, null), null);
        }
      },
      error_8: function (message, p1, p2, p3) {
        if (this.get_ERROR()) {
          this.error_0(this.processMessage(message, p1, p2, p3, null, null), null);
        }
      },
      error_9: function (message, p1, p2, p3, p4) {
        if (this.get_ERROR()) {
          this.error_0(this.processMessage(message, p1, p2, p3, p4, null), null);
        }
      },
      error_10: function (message, p1, p2, p3, p4, p5) {
        if (this.get_ERROR()) {
          this.error_0(this.processMessage(message, p1, p2, p3, p4, p5), null);
        }
      },
      warn: function (message, ex) {
        if (this.get_WARN())
          this.get_logger().log(this.get_LEVEL_WARN(), message, ex);
      },
      warn_0: function (message) {
        if (this.get_WARN())
          this.get_logger().log(this.get_LEVEL_WARN(), message, null);
      },
      warn_1: function (message, ex, p1) {
        if (this.get_WARN()) {
          this.warn(this.processMessage(message, p1, null, null, null, null), ex);
        }
      },
      warn_2: function (message, ex, p1, p2) {
        if (this.get_WARN()) {
          this.warn(this.processMessage(message, p1, p2, null, null, null), ex);
        }
      },
      warn_3: function (message, ex, p1, p2, p3) {
        if (this.get_WARN()) {
          this.warn(this.processMessage(message, p1, p2, p3, null, null), ex);
        }
      },
      warn_4: function (message, ex, p1, p2, p3, p4) {
        if (this.get_WARN()) {
          this.warn(this.processMessage(message, p1, p2, p3, p4, null), ex);
        }
      },
      warn_5: function (message, ex, p1, p2, p3, p4, p5) {
        if (this.get_WARN()) {
          this.warn(this.processMessage(message, p1, p2, p3, p4, p5), ex);
        }
      },
      warn_6: function (message, p1) {
        if (this.get_WARN()) {
          this.warn(this.processMessage(message, p1, null, null, null, null), null);
        }
      },
      warn_7: function (message, p1, p2) {
        if (this.get_WARN()) {
          this.warn(this.processMessage(message, p1, p2, null, null, null), null);
        }
      },
      warn_8: function (message, p1, p2, p3) {
        if (this.get_WARN()) {
          this.warn(this.processMessage(message, p1, p2, p3, null, null), null);
        }
      },
      warn_9: function (message, p1, p2, p3, p4) {
        if (this.get_WARN()) {
          this.warn(this.processMessage(message, p1, p2, p3, p4, null), null);
        }
      },
      warn_10: function (message, p1, p2, p3, p4, p5) {
        if (this.get_WARN()) {
          this.warn(this.processMessage(message, p1, p2, p3, p4, p5), null);
        }
      },
      info: function (message, ex) {
        if (this.get_INFO())
          this.get_logger().log(this.get_LEVEL_INFO(), message, ex);
      },
      info_0: function (message) {
        if (this.get_INFO())
          this.get_logger().log(this.get_LEVEL_INFO(), message, null);
      },
      info_1: function (message, ex, p1) {
        if (this.get_INFO()) {
          this.info(this.processMessage(message, p1, null, null, null, null), ex);
        }
      },
      info_2: function (message, ex, p1, p2) {
        if (this.get_INFO()) {
          this.info(this.processMessage(message, p1, p2, null, null, null), ex);
        }
      },
      info_3: function (message, ex, p1, p2, p3) {
        if (this.get_INFO()) {
          this.info(this.processMessage(message, p1, p2, p3, null, null), ex);
        }
      },
      info_4: function (message, ex, p1, p2, p3, p4) {
        if (this.get_INFO()) {
          this.info(this.processMessage(message, p1, p2, p3, p4, null), ex);
        }
      },
      info_5: function (message, ex, p1, p2, p3, p4, p5) {
        if (this.get_INFO()) {
          this.info(this.processMessage(message, p1, p2, p3, p4, p5), ex);
        }
      },
      info_6: function (message, p1) {
        if (this.get_INFO()) {
          this.info(this.processMessage(message, p1, null, null, null, null), null);
        }
      },
      info_7: function (message, p1, p2) {
        if (this.get_INFO()) {
          this.info(this.processMessage(message, p1, p2, null, null, null), null);
        }
      },
      info_8: function (message, p1, p2, p3) {
        if (this.get_INFO()) {
          this.info(this.processMessage(message, p1, p2, p3, null, null), null);
        }
      },
      info_9: function (message, p1, p2, p3, p4) {
        if (this.get_INFO()) {
          this.info(this.processMessage(message, p1, p2, p3, p4, null), null);
        }
      },
      info_10: function (message, p1, p2, p3, p4, p5) {
        if (this.get_INFO()) {
          this.info(this.processMessage(message, p1, p2, p3, p4, p5), null);
        }
      },
      debug: function (message, ex) {
        if (this.get_DEBUG())
          this.get_logger().log(this.get_LEVEL_DEBUG(), message, ex);
      },
      debug_0: function (message) {
        if (this.get_DEBUG())
          this.get_logger().log(this.get_LEVEL_DEBUG(), message, null);
      },
      debug_1: function (message, ex, p1) {
        if (this.get_DEBUG()) {
          this.debug(this.processMessage(message, p1, null, null, null, null), ex);
        }
      },
      debug_2: function (message, ex, p1, p2) {
        if (this.get_DEBUG()) {
          this.debug(this.processMessage(message, p1, p2, null, null, null), ex);
        }
      },
      debug_3: function (message, ex, p1, p2, p3) {
        if (this.get_DEBUG()) {
          this.debug(this.processMessage(message, p1, p2, p3, null, null), ex);
        }
      },
      debug_4: function (message, ex, p1, p2, p3, p4) {
        if (this.get_DEBUG()) {
          this.debug(this.processMessage(message, p1, p2, p3, p4, null), ex);
        }
      },
      debug_5: function (message, ex, p1, p2, p3, p4, p5) {
        if (this.get_DEBUG()) {
          this.debug(this.processMessage(message, p1, p2, p3, p4, p5), ex);
        }
      },
      debug_6: function (message, p1) {
        if (this.get_DEBUG()) {
          this.debug(this.processMessage(message, p1, null, null, null, null), null);
        }
      },
      debug_7: function (message, p1, p2) {
        if (this.get_DEBUG()) {
          this.debug(this.processMessage(message, p1, p2, null, null, null), null);
        }
      },
      debug_8: function (message, p1, p2, p3) {
        if (this.get_DEBUG()) {
          this.debug(this.processMessage(message, p1, p2, p3, null, null), null);
        }
      },
      debug_9: function (message, p1, p2, p3, p4) {
        if (this.get_DEBUG()) {
          this.debug(this.processMessage(message, p1, p2, p3, p4, null), null);
        }
      },
      debug_10: function (message, p1, p2, p3, p4, p5) {
        if (this.get_DEBUG()) {
          this.debug(this.processMessage(message, p1, p2, p3, p4, p5), null);
        }
      },
      trace: function (message, ex) {
        if (this.get_TRACE())
          this.get_logger().log(this.get_LEVEL_TRACE(), message, ex);
      },
      trace_0: function (message) {
        if (this.get_TRACE())
          this.get_logger().log(this.get_LEVEL_TRACE(), message, null);
      },
      trace_1: function (message, ex, p1) {
        if (this.get_TRACE()) {
          this.trace(this.processMessage(message, p1, null, null, null, null), ex);
        }
      },
      trace_2: function (message, ex, p1, p2) {
        if (this.get_TRACE()) {
          this.trace(this.processMessage(message, p1, p2, null, null, null), ex);
        }
      },
      trace_3: function (message, ex, p1, p2, p3) {
        if (this.get_TRACE()) {
          this.trace(this.processMessage(message, p1, p2, p3, null, null), ex);
        }
      },
      trace_4: function (message, ex, p1, p2, p3, p4) {
        if (this.get_TRACE()) {
          this.trace(this.processMessage(message, p1, p2, p3, p4, null), ex);
        }
      },
      trace_5: function (message, ex, p1, p2, p3, p4, p5) {
        if (this.get_TRACE()) {
          this.trace(this.processMessage(message, p1, p2, p3, p4, p5), ex);
        }
      },
      trace_6: function (message, p1) {
        if (this.get_TRACE()) {
          this.trace(this.processMessage(message, p1, null, null, null, null), null);
        }
      },
      trace_7: function (message, p1, p2) {
        if (this.get_TRACE()) {
          this.trace(this.processMessage(message, p1, p2, null, null, null), null);
        }
      },
      trace_8: function (message, p1, p2, p3) {
        if (this.get_TRACE()) {
          this.trace(this.processMessage(message, p1, p2, p3, null, null), null);
        }
      },
      trace_9: function (message, p1, p2, p3, p4) {
        if (this.get_TRACE()) {
          this.trace(this.processMessage(message, p1, p2, p3, p4, null), null);
        }
      },
      trace_10: function (message, p1, p2, p3, p4, p5) {
        if (this.get_TRACE()) {
          this.trace(this.processMessage(message, p1, p2, p3, p4, p5), null);
        }
      }
    });
  }.call(_.org.kevoree.log));
  (function () {
    this.Type = Kotlin.createObject(null, {
      initialize: function () {
        this.$VALUE = 0;
        this.$LEFT_BRACE = 1;
        this.$RIGHT_BRACE = 2;
        this.$LEFT_BRACKET = 3;
        this.$RIGHT_BRACKET = 4;
        this.$COMMA = 5;
        this.$COLON = 6;
        this.$EOF = 42;
      },
      get_VALUE: function () {
        return this.$VALUE;
      },
      get_LEFT_BRACE: function () {
        return this.$LEFT_BRACE;
      },
      get_RIGHT_BRACE: function () {
        return this.$RIGHT_BRACE;
      },
      get_LEFT_BRACKET: function () {
        return this.$LEFT_BRACKET;
      },
      get_RIGHT_BRACKET: function () {
        return this.$RIGHT_BRACKET;
      },
      get_COMMA: function () {
        return this.$COMMA;
      },
      get_COLON: function () {
        return this.$COLON;
      },
      get_EOF: function () {
        return this.$EOF;
      }
    });
  }.call(_.org.kevoree.modeling.api.json));
  (function () {
    this.ActionType = Kotlin.createObject(null, {
      initialize: function () {
        this.$SET = 0;
        this.$ADD = 1;
        this.$REMOVE = 2;
        this.$ADD_ALL = 3;
        this.$REMOVE_ALL = 4;
        this.$RENEW_INDEX = 5;
      },
      get_SET: function () {
        return this.$SET;
      },
      get_ADD: function () {
        return this.$ADD;
      },
      get_REMOVE: function () {
        return this.$REMOVE;
      },
      get_ADD_ALL: function () {
        return this.$ADD_ALL;
      },
      get_REMOVE_ALL: function () {
        return this.$REMOVE_ALL;
      },
      get_RENEW_INDEX: function () {
        return this.$RENEW_INDEX;
      }
    });
    this.ElementAttributeType = Kotlin.createObject(null, {
      initialize: function () {
        this.$ATTRIBUTE = 0;
        this.$REFERENCE = 1;
        this.$CONTAINMENT = 2;
      },
      get_ATTRIBUTE: function () {
        return this.$ATTRIBUTE;
      },
      get_REFERENCE: function () {
        return this.$REFERENCE;
      },
      get_CONTAINMENT: function () {
        return this.$CONTAINMENT;
      }
    });
  }.call(_.org.kevoree.modeling.api.util));
  (function () {
    this.$asserter = new _.kotlin.test.QUnitAsserter();
  }.call(_.kotlin.test));
  (function () {
    this.State = Kotlin.createObject(null, {
      initialize: function () {
        this.$Ready = 0;
        this.$NotReady = 1;
        this.$Done = 2;
        this.$Failed = 3;
      },
      get_Ready: function () {
        return this.$Ready;
      },
      get_NotReady: function () {
        return this.$NotReady;
      },
      get_Done: function () {
        return this.$Done;
      },
      get_Failed: function () {
        return this.$Failed;
      }
    });
  }.call(_.kotlin.support));
  Kotlin.defineModule('org.kevoree.modeling.sample.cloud.js', _);
}());
if(typeof(module)!='undefined'){module.exports = Kotlin.modules['org.kevoree.modeling.sample.cloud.js'];}
>>>>>>> External Changes
