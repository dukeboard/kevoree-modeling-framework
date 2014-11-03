var Double = (function () {
    function Double() {
    }
    Double.parseDouble = function (val) {
        return Number(val);
    };
    return Double;
})();
var Throwable = (function () {
    function Throwable() {
    }
    Throwable.prototype.printStackTrace = function () {
        throw new Exception("Abstract implementation");
    };
    return Throwable;
})();
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="Throwable.ts"/>
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
var Float = (function () {
    function Float() {
    }
    Float.parseFloat = function (val) {
        return Number(val);
    };
    return Float;
})();
var Integer = (function () {
    function Integer() {
    }
    Integer.parseInt = function (val) {
        return Number(val);
    };
    return Integer;
})();
var Long = (function () {
    function Long() {
    }
    Long.parseLong = function (val) {
        return Number(val);
    };
    return Long;
})();
Number.prototype.equals = function (other) {
    return this == other;
};
var Short = (function () {
    function Short() {
    }
    Short.parseShort = function (val) {
        return Number(val);
    };
    return Short;
})();
String.prototype.getBytes = function () {
    var res = new Number[this.length];
    for (var i = 0; i < this.length; i++) {
        res[i] = Number(this.charAt(i));
    }
    return res;
};

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
var System = (function () {
    function System() {
    }
    System.arraycopy = function (data, number, d, number2, numElements) {
    };
    return System;
})();
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
var Collections = (function () {
    function Collections() {
    }
    Collections.reverse = function (p) {
        var temp = new JUList();
        for (var i = 0; i < p.size(); i++) {
            temp.add(p.get(i));
        }
        p.clear();
        for (var i = temp.size() - 1; i >= 0; i--) {
            p.add(temp.get(i));
        }
    };
    return Collections;
})();
var JUCollection = (function () {
    function JUCollection() {
    }
    JUCollection.prototype.add = function (val) {
        throw new Exception("Abstract implementation");
    };
    JUCollection.prototype.addAll = function (vals) {
        throw new Exception("Abstract implementation");
    };
    JUCollection.prototype.remove = function (val) {
        throw new Exception("Abstract implementation");
    };
    JUCollection.prototype.clear = function () {
        throw new Exception("Abstract implementation");
    };
    JUCollection.prototype.isEmpty = function () {
        throw new Exception("Abstract implementation");
    };
    JUCollection.prototype.size = function () {
        throw new Exception("Abstract implementation");
    };
    JUCollection.prototype.contains = function (val) {
        throw new Exception("Abstract implementation");
    };
    JUCollection.prototype.toArray = function (a) {
        throw new Exception("Abstract implementation");
    };
    return JUCollection;
})();
///<reference path="JUCollection.ts"/>
var JUList = (function (_super) {
    __extends(JUList, _super);
    function JUList() {
        _super.apply(this, arguments);
        this.internalArray = [];
    }
    JUList.prototype.addAll = function (vals) {
        var tempArray = vals.toArray(null);
        for (var i = 0; i < tempArray.length; i++) {
            this.internalArray.push(tempArray[i]);
        }
    };

    JUList.prototype.clear = function () {
        this.internalArray = [];
    };

    JUList.prototype.remove = function (val) {
        //TODO with filter
    };

    JUList.prototype.toArray = function (a) {
        //TODO
        var result = new Array(this.internalArray.length);
        this.internalArray.forEach(function (value, index, p1) {
            result[index] = value;
        });
        return result;
    };

    JUList.prototype.size = function () {
        return this.internalArray.length;
    };

    JUList.prototype.add = function (val) {
        this.internalArray.push(val);
    };

    JUList.prototype.get = function (index) {
        return this.internalArray[index];
    };

    JUList.prototype.contains = function (val) {
        for (var i = 0; i < this.internalArray.length; i++) {
            if (this.internalArray[i] == val) {
                return true;
            }
        }
        return false;
    };

    JUList.prototype.isEmpty = function () {
        return this.internalArray.length == 0;
    };
    return JUList;
})(JUCollection);
///<reference path="JUList.ts"/>
var JUArrayList = (function (_super) {
    __extends(JUArrayList, _super);
    function JUArrayList() {
        _super.apply(this, arguments);
    }
    return JUArrayList;
})(JUList);
var JUMap = (function () {
    function JUMap() {
        this.internalMap = new Map();
    }
    JUMap.prototype.get = function (key) {
        return this.internalMap.get(key);
    };

    JUMap.prototype.put = function (key, value) {
        this.internalMap.set(key, value);
    };

    JUMap.prototype.containsKey = function (key) {
        return this.internalMap.has(key);
    };

    JUMap.prototype.remove = function (key) {
        return this.remove(key);
    };

    JUMap.prototype.keySet = function () {
        var result = new JUHashSet();
        this.internalMap.forEach(function (value, index, p1) {
            result.add(index);
        });
        return result;
    };

    JUMap.prototype.isEmpty = function () {
        return this.internalMap.size == 0;
    };

    JUMap.prototype.values = function () {
        var result = new JUHashSet();
        this.internalMap.forEach(function (value, index, p1) {
            result.add(value);
        });
        return result;
    };

    JUMap.prototype.clear = function () {
        this.internalMap = new Map();
    };
    return JUMap;
})();
///<reference path="JUMap.ts"/>
var JUHashMap = (function (_super) {
    __extends(JUHashMap, _super);
    function JUHashMap() {
        _super.apply(this, arguments);
    }
    return JUHashMap;
})(JUMap);
///<reference path="JUCollection.ts"/>
var JUSet = (function (_super) {
    __extends(JUSet, _super);
    function JUSet() {
        _super.apply(this, arguments);
        this.internalSet = new Set();
    }
    JUSet.prototype.add = function (val) {
        this.internalSet.add(val);
    };

    JUSet.prototype.clear = function () {
        this.internalSet = new Set();
    };

    JUSet.prototype.contains = function (val) {
        return this.internalSet.has(val);
    };

    JUSet.prototype.addAll = function (vals) {
        var tempArray = vals.toArray(null);
        for (var i = 0; i < tempArray.length; i++) {
            this.internalSet.add(tempArray[i]);
        }
    };

    JUSet.prototype.remove = function (val) {
        this.internalSet.delete(val);
    };

    JUSet.prototype.size = function () {
        return this.internalSet.size;
    };

    JUSet.prototype.isEmpty = function () {
        return this.internalSet.size == 0;
    };

    JUSet.prototype.toArray = function (other) {
        var result = new Array(this.internalSet.size);
        var i = 0;
        this.internalSet.forEach(function (value, index, origin) {
            result[i] = value;
            i++;
        });
        return result;
    };
    return JUSet;
})(JUCollection);
///<reference path="JUSet.ts"/>
var JUHashSet = (function (_super) {
    __extends(JUHashSet, _super);
    function JUHashSet() {
        _super.apply(this, arguments);
    }
    return JUHashSet;
})(JUSet);
///<reference path="../KObject.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../strategy/ExtrapolationStrategy.ts"/>
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
    KActionType.SET = new KActionType("SET");
    KActionType.ADD = new KActionType("ADD");
    KActionType.REMOVE = new KActionType("DEL");
    KActionType.NEW = new KActionType("NEW");
    return KActionType;
})();
///<reference path="../KActionType.ts"/>
///<reference path="../meta/Meta.ts"/>
var JSONString = (function () {
    function JSONString() {
    }
    JSONString.encodeBuffer = function (buffer, chain) {
        if (chain == null) {
            return;
        }
        var i = 0;
        while (i < chain.length) {
            var ch = chain.charAt(i);
            if (ch == '"') {
                buffer.append(JSONString.ESCAPE_CHAR);
                buffer.append('"');
            } else {
                if (ch == JSONString.ESCAPE_CHAR) {
                    buffer.append(JSONString.ESCAPE_CHAR);
                    buffer.append(JSONString.ESCAPE_CHAR);
                } else {
                    if (ch == '\n') {
                        buffer.append(JSONString.ESCAPE_CHAR);
                        buffer.append('n');
                    } else {
                        if (ch == '\r') {
                            buffer.append(JSONString.ESCAPE_CHAR);
                            buffer.append('r');
                        } else {
                            if (ch == '\t') {
                                buffer.append(JSONString.ESCAPE_CHAR);
                                buffer.append('t');
                            } else {
                                if (ch == '\u2028') {
                                    buffer.append(JSONString.ESCAPE_CHAR);
                                    buffer.append('u');
                                    buffer.append('2');
                                    buffer.append('0');
                                    buffer.append('2');
                                    buffer.append('8');
                                } else {
                                    if (ch == '\u2029') {
                                        buffer.append(JSONString.ESCAPE_CHAR);
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

    JSONString.encode = function (buffer, chain) {
        if (chain == null) {
            return;
        }
        var i = 0;
        while (i < chain.length) {
            var ch = chain.charAt(i);
            if (ch == '"') {
                buffer.append(JSONString.ESCAPE_CHAR);
                buffer.append('"');
            } else {
                if (ch == JSONString.ESCAPE_CHAR) {
                    buffer.append(JSONString.ESCAPE_CHAR);
                    buffer.append(JSONString.ESCAPE_CHAR);
                } else {
                    if (ch == '\n') {
                        buffer.append(JSONString.ESCAPE_CHAR);
                        buffer.append('n');
                    } else {
                        if (ch == '\r') {
                            buffer.append(JSONString.ESCAPE_CHAR);
                            buffer.append('r');
                        } else {
                            if (ch == '\t') {
                                buffer.append(JSONString.ESCAPE_CHAR);
                                buffer.append('t');
                            } else {
                                if (ch == '\u2028') {
                                    buffer.append(JSONString.ESCAPE_CHAR);
                                    buffer.append('u');
                                    buffer.append('2');
                                    buffer.append('0');
                                    buffer.append('2');
                                    buffer.append('8');
                                } else {
                                    if (ch == '\u2029') {
                                        buffer.append(JSONString.ESCAPE_CHAR);
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

    JSONString.unescape = function (src) {
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
            if (current == JSONString.ESCAPE_CHAR) {
                if (builder == null) {
                    builder = new StringBuilder();
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
    JSONString.ESCAPE_CHAR = '\\';
    return JSONString;
})();
///<reference path="../../../../../java/util/JUHashSet.ts"/>
var Lexer = (function () {
    function Lexer(payload) {
        this.bytes = null;
        this.EOF = null;
        this.BOOLEAN_LETTERS = null;
        this.DIGIT = null;
        this.index = 0;
        this.bytes = payload;
        this.EOF = new JsonToken(Type.EOF, null);
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
            this.BOOLEAN_LETTERS = new JUHashSet();
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
            this.DIGIT = new JUHashSet();
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
        var tokenType = Type.EOF;
        var c = this.nextChar();
        var currentValue = new StringBuilder();
        var jsonValue = null;
        while (!this.isDone() && this.isSpace(c)) {
            c = this.nextChar();
        }
        if ('"' == c) {
            tokenType = Type.VALUE;
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
                tokenType = Type.LEFT_BRACE;
            } else {
                if ('}' == c) {
                    tokenType = Type.RIGHT_BRACE;
                } else {
                    if ('[' == c) {
                        tokenType = Type.LEFT_BRACKET;
                    } else {
                        if (']' == c) {
                            tokenType = Type.RIGHT_BRACKET;
                        } else {
                            if (':' == c) {
                                tokenType = Type.COLON;
                            } else {
                                if (',' == c) {
                                    tokenType = Type.COMMA;
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
                                        tokenType = Type.VALUE;
                                    } else {
                                        tokenType = Type.EOF;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return new JsonToken(tokenType, jsonValue);
    };
    Lexer.DEFAULT_BUFFER_SIZE = 1024 * 4;
    return Lexer;
})();
var JsonToken = (function () {
    function JsonToken(p_tokenType, p_value) {
        this._tokenType = null;
        this._value = null;
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
var Type = (function () {
    function Type(p_value) {
        this._value = 0;
        this._value = p_value;
    }
    Type.prototype.equals = function (other) {
        return this == other;
    };
    Type.VALUE = new Type(0);
    Type.LEFT_BRACE = new Type(1);
    Type.RIGHT_BRACE = new Type(2);
    Type.LEFT_BRACKET = new Type(3);
    Type.RIGHT_BRACKET = new Type(4);
    Type.COMMA = new Type(5);
    Type.COLON = new Type(6);
    Type.EOF = new Type(42);
    return Type;
})();
var MetaType = (function () {
    function MetaType() {
    }
    MetaType.prototype.equals = function (other) {
        return this == other;
    };
    MetaType.STRING = new MetaType();
    MetaType.LONG = new MetaType();
    MetaType.INT = new MetaType();
    MetaType.BOOL = new MetaType();
    MetaType.SHORT = new MetaType();
    MetaType.DOUBLE = new MetaType();
    MetaType.FLOAT = new MetaType();
    return MetaType;
})();
///<reference path="../../meta/MetaType.ts"/>
///<reference path="../../strategy/ExtrapolationStrategy.ts"/>
///<reference path="../../meta/MetaAttribute.ts"/>
///<reference path="../../meta/MetaClass.ts"/>
var UnresolvedMetaAttribute = (function () {
    function UnresolvedMetaAttribute(p_metaName) {
        this._metaName = null;
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

    UnresolvedMetaAttribute.prototype.setExtrapolationStrategy = function (extrapolationStrategy) {
    };

    UnresolvedMetaAttribute.prototype.metaName = function () {
        return this._metaName;
    };

    UnresolvedMetaAttribute.prototype.index = function () {
        return -1;
    };
    return UnresolvedMetaAttribute;
})();
///<reference path="../../meta/MetaClass.ts"/>
var UnresolvedMetaClass = (function () {
    function UnresolvedMetaClass(p_metaName) {
        this._metaName = null;
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
///<reference path="../../meta/MetaClass.ts"/>
///<reference path="../../meta/MetaReference.ts"/>
var UnresolvedMetaReference = (function () {
    function UnresolvedMetaReference(p_metaName) {
        this._metaName = null;
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
///<reference path="../Callback.ts"/>
///<reference path="../KActionType.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../json/JSONString.ts"/>
///<reference path="../json/Lexer.ts"/>
///<reference path="../json/JsonToken.ts"/>
///<reference path="../json/Type.ts"/>
///<reference path="unresolved/UnresolvedMetaAttribute.ts"/>
///<reference path="unresolved/UnresolvedMetaClass.ts"/>
///<reference path="unresolved/UnresolvedMetaReference.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/Collections.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../java/util/JUMap.ts"/>
var TraceSequence = (function () {
    function TraceSequence() {
        this._traces = new JUArrayList();
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
        var lexer = new Lexer(addtracesTxt);
        var currentToken = lexer.nextToken();
        if (currentToken.tokenType() != Type.LEFT_BRACKET) {
            throw new Exception("Bad Format : expect [");
        }
        currentToken = lexer.nextToken();
        var keys = new JUHashMap();
        var previousName = null;
        while (currentToken.tokenType() != Type.EOF && currentToken.tokenType() != Type.RIGHT_BRACKET) {
            if (currentToken.tokenType() == Type.LEFT_BRACE) {
                keys.clear();
            }
            if (currentToken.tokenType() == Type.VALUE) {
                if (previousName != null) {
                    keys.put(previousName, currentToken.value().toString());
                    previousName = null;
                } else {
                    previousName = currentToken.value().toString();
                }
            }
            if (currentToken.tokenType() == Type.RIGHT_BRACE) {
                var traceTypeRead = keys.get(ModelTraceConstants.traceType.toString());
                if (traceTypeRead.equals(KActionType.SET.toString())) {
                    var srcFound = keys.get(ModelTraceConstants.src.toString());
                    srcFound = JSONString.unescape(srcFound);
                    this._traces.add(new ModelSetTrace(Long.parseLong(srcFound), new UnresolvedMetaAttribute(keys.get(ModelTraceConstants.meta.toString())), JSONString.unescape(keys.get(ModelTraceConstants.content.toString()))));
                }
                if (traceTypeRead.equals(KActionType.ADD.toString())) {
                    var srcFound = keys.get(ModelTraceConstants.src.toString());
                    srcFound = JSONString.unescape(srcFound);
                    this._traces.add(new ModelAddTrace(Long.parseLong(srcFound), new UnresolvedMetaReference(keys.get(ModelTraceConstants.meta.toString())), Long.parseLong(keys.get(ModelTraceConstants.previouspath.toString())), new UnresolvedMetaClass(keys.get(ModelTraceConstants.typename.toString()))));
                }
                if (traceTypeRead.equals(KActionType.REMOVE.toString())) {
                    var srcFound = keys.get(ModelTraceConstants.src.toString());
                    srcFound = JSONString.unescape(srcFound);
                    this._traces.add(new ModelRemoveTrace(Long.parseLong(srcFound), new UnresolvedMetaReference(keys.get(ModelTraceConstants.meta.toString())), Long.parseLong(keys.get(ModelTraceConstants.objpath.toString()))));
                }
            }
            currentToken = lexer.nextToken();
        }
        return this;
    };

    TraceSequence.prototype.toString = function () {
        var buffer = new StringBuilder();
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
        var traceApplicator = new ModelTraceApplicator(target);
        traceApplicator.applyTraceSequence(this, callback);
        return true;
    };

    TraceSequence.prototype.reverse = function () {
        Collections.reverse(this._traces);
        return this;
    };
    return TraceSequence;
})();
///<reference path="meta/MetaAttribute.ts"/>
///<reference path="meta/MetaClass.ts"/>
///<reference path="meta/MetaOperation.ts"/>
///<reference path="meta/MetaReference.ts"/>
///<reference path="time/TimeTree.ts"/>
///<reference path="trace/ModelTrace.ts"/>
///<reference path="trace/TraceSequence.ts"/>
var AccessMode = (function () {
    function AccessMode() {
    }
    AccessMode.prototype.equals = function (other) {
        return this == other;
    };
    AccessMode.READ = new AccessMode();
    AccessMode.WRITE = new AccessMode();
    return AccessMode;
})();
///<reference path="../KObject.ts"/>
///<reference path="../data/AccessMode.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
var DiscreteExtrapolationStrategy = (function () {
    function DiscreteExtrapolationStrategy() {
    }
    DiscreteExtrapolationStrategy.prototype.timedDependencies = function (current) {
        var times = new Array();
        times[0] = current.timeTree().resolve(current.now());
        return times;
    };

    DiscreteExtrapolationStrategy.prototype.extrapolate = function (current, attribute, dependencies) {
        var payload = current.view().dimension().universe().storage().raw(current, AccessMode.READ);
        if (payload != null) {
            return payload[attribute.index()];
        } else {
            return null;
        }
    };

    DiscreteExtrapolationStrategy.prototype.mutate = function (current, attribute, payload, dependencies) {
        var internalPayload = current.view().dimension().universe().storage().raw(current, AccessMode.WRITE);
        if (internalPayload != null) {
            internalPayload[attribute.index()] = payload;
        }
    };
    return DiscreteExtrapolationStrategy;
})();
///<reference path="../KObject.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
var LinearRegressionExtrapolationStrategy = (function () {
    function LinearRegressionExtrapolationStrategy() {
    }
    LinearRegressionExtrapolationStrategy.prototype.timedDependencies = function (current) {
        return new Array();
    };

    LinearRegressionExtrapolationStrategy.prototype.extrapolate = function (current, attribute, dependencies) {
        return null;
    };

    LinearRegressionExtrapolationStrategy.prototype.mutate = function (current, attribute, payload, dependencies) {
    };
    return LinearRegressionExtrapolationStrategy;
})();
var DataSample = (function () {
    function DataSample(time, value) {
        this.time = 0;
        this.value = 0;
        this.time = time;
        this.value = value;
    }
    return DataSample;
})();
var PolynomialFitEjml = (function () {
    function PolynomialFitEjml(degree) {
        this.A = null;
        this.coef = null;
        this.y = null;
        this.solver = null;
        this.coef = new DenseMatrix64F(degree + 1, 1);
        this.A = new DenseMatrix64F(1, degree + 1);
        this.y = new DenseMatrix64F(1, 1);
        this.solver = new AdjLinearSolverQr();
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
var Prioritization = (function () {
    function Prioritization() {
    }
    Prioritization.prototype.equals = function (other) {
        return this == other;
    };
    Prioritization.SAMEPRIORITY = new Prioritization();
    Prioritization.HIGHDEGREES = new Prioritization();
    Prioritization.LOWDEGREES = new Prioritization();
    return Prioritization;
})();
///<reference path="util/DataSample.ts"/>
///<reference path="util/PolynomialFitEjml.ts"/>
///<reference path="util/Prioritization.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/JUList.ts"/>
var DefaultPolynomialExtrapolation = (function () {
    function DefaultPolynomialExtrapolation(timeOrigin, toleratedError, maxDegree, degradeFactor, prioritization) {
        this.weights = null;
        this.timeOrigin = null;
        this.samples = new JUArrayList();
        this.degradeFactor = 0;
        this.prioritization = null;
        this.maxDegree = 0;
        this.toleratedError = 0;
        this._lastIndex = -1;
        this.timeOrigin = timeOrigin;
        this.degradeFactor = degradeFactor;
        this.prioritization = prioritization;
        this.maxDegree = maxDegree;
        this.toleratedError = toleratedError;
    }
    DefaultPolynomialExtrapolation.prototype.getSamples = function () {
        return this.samples;
    };

    DefaultPolynomialExtrapolation.prototype.getDegree = function () {
        if (this.weights == null) {
            return -1;
        } else {
            return this.weights.length - 1;
        }
    };

    DefaultPolynomialExtrapolation.prototype.getTimeOrigin = function () {
        return this.timeOrigin;
    };

    DefaultPolynomialExtrapolation.prototype.getMaxErr = function (degree, toleratedError, maxDegree, prioritization) {
        var tol = toleratedError;
        if (prioritization == Prioritization.HIGHDEGREES) {
            tol = toleratedError / Math.pow(2, maxDegree - degree);
        } else {
            if (prioritization == Prioritization.LOWDEGREES) {
                tol = toleratedError / Math.pow(2, degree + 0.5);
            } else {
                if (prioritization == Prioritization.SAMEPRIORITY) {
                    tol = toleratedError * degree * 2 / (2 * maxDegree);
                }
            }
        }
        return tol;
    };

    DefaultPolynomialExtrapolation.prototype.internal_feed = function (time, value) {
        if (this.weights == null) {
            this.weights = new Array();
            this.weights[0] = value;
            this.timeOrigin = time;
            this.samples.add(new DataSample(time, value));
        }
    };

    DefaultPolynomialExtrapolation.prototype.maxError = function (computedWeights, time, value) {
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

    DefaultPolynomialExtrapolation.prototype.comparePolynome = function (p2, err) {
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

    DefaultPolynomialExtrapolation.prototype.internal_extrapolate = function (time, weights) {
        var result = 0;
        var t = (time - this.timeOrigin) / this.degradeFactor;
        var power = 1;
        for (var j = 0; j < weights.length; j++) {
            result += weights[j] * power;
            power = power * t;
        }
        return result;
    };

    DefaultPolynomialExtrapolation.prototype.extrapolate = function (time) {
        return this.internal_extrapolate(time, this.weights);
    };

    DefaultPolynomialExtrapolation.prototype.insert = function (time, value) {
        if (this.weights == null) {
            this.internal_feed(time, value);
            this._lastIndex = time;
            return true;
        }
        var maxError = this.getMaxErr(this.getDegree(), this.toleratedError, this.maxDegree, this.prioritization);
        if (Math.abs(this.extrapolate(time) - value) <= maxError) {
            this.samples.add(new DataSample(time, value));
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
                var ds = this.samples.get(i * current / ss);
                times[i] = (ds.time - this.timeOrigin) / this.degradeFactor;
                values[i] = ds.value;
            }
            times[ss] = (time - this.timeOrigin) / this.degradeFactor;
            values[ss] = value;
            var pf = new PolynomialFitEjml(deg);
            pf.fit(times, values);
            if (this.maxError(pf.getCoef(), time, value) <= maxError) {
                this.weights = new Array();
                for (var i = 0; i < pf.getCoef().length; i++) {
                    this.weights[i] = pf.getCoef()[i];
                }
                this.samples.add(new DataSample(time, value));
                this._lastIndex = time;
                return true;
            }
        }
        return false;
    };

    DefaultPolynomialExtrapolation.prototype.lastIndex = function () {
        return 0;
    };

    DefaultPolynomialExtrapolation.prototype.save = function () {
        var builder = new StringBuilder();
        for (var i = 0; i < this.weights.length; i++) {
            if (i != 0) {
                builder.append(DefaultPolynomialExtrapolation.sep);
            }
            builder.append(this.weights[i]);
        }
        return builder.toString();
    };

    DefaultPolynomialExtrapolation.prototype.load = function (payload) {
        var elems = payload.split(DefaultPolynomialExtrapolation.sep + "");
        this.weights = new Array();
        for (var i = 0; i < elems.length; i++) {
            this.weights[i] = Long.parseLong(elems[i]);
        }
    };
    DefaultPolynomialExtrapolation.sep = '|';
    return DefaultPolynomialExtrapolation;
})();
///<reference path="../KObject.ts"/>
///<reference path="../data/AccessMode.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../polynomial/DefaultPolynomialExtrapolation.ts"/>
///<reference path="../polynomial/PolynomialExtrapolation.ts"/>
///<reference path="../polynomial/util/Prioritization.ts"/>
var PolynomialExtrapolationStrategy = (function () {
    function PolynomialExtrapolationStrategy() {
    }
    PolynomialExtrapolationStrategy.prototype.timedDependencies = function (current) {
        var times = new Array();
        times[0] = current.timeTree().resolve(current.now());
        return times;
    };

    PolynomialExtrapolationStrategy.prototype.extrapolate = function (current, attribute, dependencies) {
        var pol = current.view().dimension().universe().storage().raw(current, AccessMode.READ)[attribute.index()];
        if (pol != null) {
            return pol.extrapolate(current.now());
        } else {
            return null;
        }
    };

    PolynomialExtrapolationStrategy.prototype.mutate = function (current, attribute, payload, dependencies) {
        var previous = current.view().dimension().universe().storage().raw(current, AccessMode.READ)[attribute.index()];
        if (previous == null) {
            var pol = new DefaultPolynomialExtrapolation(current.now(), attribute.precision(), 20, 1, Prioritization.LOWDEGREES);
            pol.insert(current.now(), Double.parseDouble(payload.toString()));
            current.view().dimension().universe().storage().raw(current, AccessMode.WRITE)[attribute.index()] = pol;
        } else {
            var previousPol = previous;
            if (!previousPol.insert(current.now(), Double.parseDouble(payload.toString()))) {
                var pol = new DefaultPolynomialExtrapolation(previousPol.lastIndex(), attribute.precision(), 20, 1, Prioritization.LOWDEGREES);
                pol.insert(previousPol.lastIndex(), previousPol.extrapolate(previousPol.lastIndex()));
                pol.insert(current.now(), Double.parseDouble(payload.toString()));
                current.view().dimension().universe().storage().raw(current, AccessMode.WRITE)[attribute.index()] = pol;
            }
        }
    };
    return PolynomialExtrapolationStrategy;
})();
///<reference path="strategy/DiscreteExtrapolationStrategy.ts"/>
///<reference path="strategy/ExtrapolationStrategy.ts"/>
///<reference path="strategy/LinearRegressionExtrapolationStrategy.ts"/>
///<reference path="strategy/PolynomialExtrapolationStrategy.ts"/>
var Extrapolations = (function () {
    function Extrapolations(wrappedStrategy) {
        this.extrapolationStrategy = null;
        this.extrapolationStrategy = wrappedStrategy;
    }
    Extrapolations.prototype.strategy = function () {
        return this.extrapolationStrategy;
    };

    Extrapolations.prototype.equals = function (other) {
        return this == other;
    };
    Extrapolations.DISCRETE = new Extrapolations(new DiscreteExtrapolationStrategy());
    Extrapolations.LINEAR_REGRESSION = new Extrapolations(new LinearRegressionExtrapolationStrategy());
    Extrapolations.POLYNOMIAL = new Extrapolations(new PolynomialExtrapolationStrategy());
    return Extrapolations;
})();
///<reference path="meta/MetaReference.ts"/>
var InboundReference = (function () {
    function InboundReference(reference, object) {
        this.reference = null;
        this.object = null;
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
///<reference path="time/TimeTree.ts"/>
///<reference path="meta/Meta.ts"/>
///<reference path="meta/MetaClass.ts"/>
///<reference path="time/TimeTree.ts"/>
///<reference path="../Callback.ts"/>
///<reference path="../KDimension.ts"/>
///<reference path="../KEvent.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelListener.ts"/>
///<reference path="../time/TimeTree.ts"/>
///<reference path="data/KStore.ts"/>
///<reference path="meta/MetaAttribute.ts"/>
///<reference path="trace/TraceSequence.ts"/>
///<reference path="trace/TraceSequence.ts"/>
///<reference path="../../../../java/util/JUList.ts"/>
var TraceRequest = (function () {
    function TraceRequest() {
    }
    TraceRequest.prototype.equals = function (other) {
        return this == other;
    };
    TraceRequest.ATTRIBUTES_ONLY = new TraceRequest();
    TraceRequest.REFERENCES_ONLY = new TraceRequest();
    TraceRequest.ATTRIBUTES_REFERENCES = new TraceRequest();
    return TraceRequest;
})();
var VisitResult = (function () {
    function VisitResult() {
    }
    VisitResult.prototype.equals = function (other) {
        return this == other;
    };
    VisitResult.CONTINUE = new VisitResult();
    VisitResult.SKIP = new VisitResult();
    VisitResult.STOP = new VisitResult();
    return VisitResult;
})();
///<reference path="../Callback.ts"/>
///<reference path="../KDimension.ts"/>
///<reference path="../KUniverse.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../time/TimeTree.ts"/>
///<reference path="../ModelListener.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../java/util/JUMap.ts"/>
///<reference path="../../../../../java/util/JUSet.ts"/>
var AbstractKDimension = (function () {
    function AbstractKDimension(p_universe, p_key) {
        this._universe = null;
        this._key = 0;
        this._timesCache = new JUHashMap();
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

    AbstractKDimension.prototype.listen = function (listener) {
        this.universe().storage().registerListener(this, listener);
    };

    AbstractKDimension.prototype.internal_create = function (timePoint) {
        throw "Abstract method";
    };
    return AbstractKDimension;
})();
///<reference path="../KEvent.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../meta/Meta.ts"/>
///<reference path="../KActionType.ts"/>
var DefaultKEvent = (function () {
    function DefaultKEvent(p_type, p_meta, p_source, p_pastValue, p_newValue) {
        this._type = null;
        this._meta = null;
        this._pastValue = null;
        this._newValue = null;
        this._source = null;
        this._type = p_type;
        this._meta = p_meta;
        this._source = p_source;
        this._pastValue = p_pastValue;
        this._newValue = p_newValue;
    }
    DefaultKEvent.prototype.toString = function () {
        var newValuePayload = "";
        if (this.newValue() != null) {
            newValuePayload = this.newValue().toString().replace("\n", "");
        }
        return "ModelEvent[src:[t=" + this._source.now() + "]uuid=" + this._source.uuid() + ", type:" + this._type + ", meta:" + this.meta() + ", pastValue:" + this.pastValue() + ", newValue:" + newValuePayload + "]";
    };

    DefaultKEvent.prototype.type = function () {
        return this._type;
    };

    DefaultKEvent.prototype.meta = function () {
        return this._meta;
    };

    DefaultKEvent.prototype.pastValue = function () {
        return this._pastValue;
    };

    DefaultKEvent.prototype.newValue = function () {
        return this._newValue;
    };

    DefaultKEvent.prototype.src = function () {
        return this._source;
    };
    return DefaultKEvent;
})();
///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../ModelSerializer.ts"/>
///<reference path="../ModelVisitor.ts"/>
///<reference path="../ThrowableCallback.ts"/>
///<reference path="../VisitResult.ts"/>
///<reference path="../data/AccessMode.ts"/>
///<reference path="../../../../../java/util/JUSet.ts"/>
var JSONModelSerializer = (function () {
    function JSONModelSerializer() {
    }
    JSONModelSerializer.prototype.serialize = function (model, callback) {
        var builder = new StringBuilder();
        builder.append("[\n");
        JSONModelSerializer.printJSON(model, builder);
        model.graphVisit({ visit: function (elem) {
                builder.append(",");
                JSONModelSerializer.printJSON(elem, builder);
                return VisitResult.CONTINUE;
            } }, { on: function (throwable) {
                builder.append("]\n");
                callback.on(builder.toString(), throwable);
            } });
    };

    JSONModelSerializer.printJSON = function (elem, builder) {
        builder.append("{\n");
        builder.append("\t\"" + JSONModelSerializer.KEY_META + "\" : \"");
        builder.append(elem.metaClass().metaName());
        builder.append("\",\n");
        builder.append("\t\"" + JSONModelSerializer.KEY_UUID + "\" : \"");
        builder.append(elem.uuid() + "");
        if (elem.isRoot()) {
            builder.append("\",\n");
            builder.append("\t\"" + JSONModelSerializer.KEY_ROOT + "\" : \"");
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
            var raw = elem.view().dimension().universe().storage().raw(elem, AccessMode.READ);
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
    JSONModelSerializer.KEY_META = "@meta";
    JSONModelSerializer.KEY_UUID = "@uuid";
    JSONModelSerializer.KEY_ROOT = "@root";
    return JSONModelSerializer;
})();
///<reference path="../Callback.ts"/>
///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../meta/MetaReference.ts"/>
var Helper = (function () {
    function Helper() {
    }
    Helper.forall = function (inputs, each, end) {
        if (inputs == null) {
            return;
        }
        Helper.process(inputs, 0, each, end);
    };

    Helper.process = function (arr, index, each, end) {
        if (index >= arr.length) {
            if (end != null) {
                end.on(null);
            }
        } else {
            var obj = arr[index];
            each.on(obj, { on: function (err) {
                    if (err != null) {
                        if (end != null) {
                            end.on(err);
                        }
                    } else {
                        Helper.process(arr, index + 1, each, end);
                    }
                } });
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
        return path.length == 1 && path.charAt(0) == Helper.pathSep;
    };

    Helper.path = function (parent, reference, target) {
        if (Helper.isRoot(parent)) {
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
///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../data/AccessMode.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../util/CallBackChain.ts"/>
///<reference path="../util/Helper.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/JUHashSet.ts"/>
///<reference path="../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../java/util/JUSet.ts"/>
var KSelector = (function () {
    function KSelector() {
    }
    KSelector.select = function (root, query, callback) {
        var extractedQuery = KQuery.extractFirstQuery(query);
        if (extractedQuery == null) {
            callback.on(new Array());
        } else {
            var relationNameRegex = extractedQuery.relationName.replace("*", ".*");
            var collected = new JUHashSet();
            var raw = root.dimension().universe().storage().raw(root, AccessMode.READ);
            for (var i = 0; i < root.metaReferences().length; i++) {
                var reference = root.metaReferences()[i];
                if (reference.metaName().matches(relationNameRegex)) {
                    var refPayLoad = raw[reference.index()];
                    if (refPayLoad != null) {
                        if (refPayLoad instanceof JUSet) {
                            var castedSet = refPayLoad;
                            collected.addAll(castedSet);
                        } else {
                            var castedLong = refPayLoad;
                            collected.add(castedLong);
                        }
                    }
                }
            }
            root.view().lookupAll(collected.toArray(new Array()), { on: function (resolveds) {
                    var nextGeneration = new JUArrayList();
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
                    var childSelected = new JUArrayList();
                    if (extractedQuery.subQuery == null || extractedQuery.subQuery.isEmpty()) {
                        childSelected.add(root);
                        callback.on(nextGeneration.toArray(new Array()));
                    } else {
                        Helper.forall(nextGeneration.toArray(new Array()), { on: function (kObject, next) {
                                KSelector.select(kObject, extractedQuery.subQuery, { on: function (kObjects) {
                                        childSelected.addAll(childSelected);
                                    } });
                            } }, { on: function (throwable) {
                                callback.on(childSelected.toArray(new Array()));
                            } });
                    }
                } });
        }
    };
    return KSelector;
})();
///<reference path="../KActionType.ts"/>
///<reference path="../json/JSONString.ts"/>
///<reference path="../meta/Meta.ts"/>
///<reference path="../meta/MetaClass.ts"/>
///<reference path="../meta/MetaReference.ts"/>
var ModelAddTrace = (function () {
    function ModelAddTrace(srcKID, reference, previousKID, metaClass) {
        this.reference = null;
        this.traceType = KActionType.ADD;
        this.srcKID = null;
        this.previousKID = null;
        this.metaClass = null;
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
        var buffer = new StringBuilder();
        buffer.append(ModelTraceConstants.openJSON);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.traceType);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(KActionType.ADD.toString());
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.coma);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.src);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        JSONString.encodeBuffer(buffer, this.srcKID + "");
        buffer.append(ModelTraceConstants.bb);
        if (this.reference != null) {
            buffer.append(ModelTraceConstants.coma);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.meta);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.dp);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(this.reference.metaName());
            buffer.append(ModelTraceConstants.bb);
        }
        if (this.previousKID != null) {
            buffer.append(ModelTraceConstants.coma);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.previouspath);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.dp);
            buffer.append(ModelTraceConstants.bb);
            JSONString.encodeBuffer(buffer, this.previousKID + "");
            buffer.append(ModelTraceConstants.bb);
        }
        if (this.metaClass != null) {
            buffer.append(ModelTraceConstants.coma);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.typename);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.dp);
            buffer.append(ModelTraceConstants.bb);
            JSONString.encodeBuffer(buffer, this.metaClass.metaName());
            buffer.append(ModelTraceConstants.bb);
        }
        buffer.append(ModelTraceConstants.closeJSON);
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
///<reference path="../KActionType.ts"/>
///<reference path="../json/JSONString.ts"/>
///<reference path="../meta/Meta.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
var ModelSetTrace = (function () {
    function ModelSetTrace(srcKID, attribute, content) {
        this.traceType = KActionType.SET;
        this.srcKID = null;
        this.attribute = null;
        this.content = null;
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
        var buffer = new StringBuilder();
        buffer.append(ModelTraceConstants.openJSON);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.traceType);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(KActionType.SET);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.coma);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.src);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        JSONString.encodeBuffer(buffer, this.srcKID + "");
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.coma);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.meta);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(this.attribute.metaName());
        buffer.append(ModelTraceConstants.bb);
        if (this.content != null) {
            buffer.append(ModelTraceConstants.coma);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.content);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.dp);
            buffer.append(ModelTraceConstants.bb);
            JSONString.encodeBuffer(buffer, this.content.toString());
            buffer.append(ModelTraceConstants.bb);
        }
        buffer.append(ModelTraceConstants.closeJSON);
        return buffer.toString();
    };
    return ModelSetTrace;
})();
///<reference path="../Callback.ts"/>
///<reference path="../InboundReference.ts"/>
///<reference path="../KActionType.ts"/>
///<reference path="../KDimension.ts"/>
///<reference path="../KEvent.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelAttributeVisitor.ts"/>
///<reference path="../ModelListener.ts"/>
///<reference path="../ModelVisitor.ts"/>
///<reference path="../TraceRequest.ts"/>
///<reference path="../VisitResult.ts"/>
///<reference path="../data/AccessMode.ts"/>
///<reference path="../event/DefaultKEvent.ts"/>
///<reference path="../json/JSONModelSerializer.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../meta/MetaClass.ts"/>
///<reference path="../meta/MetaOperation.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../select/KSelector.ts"/>
///<reference path="../time/TimeTree.ts"/>
///<reference path="../trace/ModelAddTrace.ts"/>
///<reference path="../trace/ModelSetTrace.ts"/>
///<reference path="../trace/ModelTrace.ts"/>
///<reference path="../util/Helper.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../java/util/JUHashSet.ts"/>
///<reference path="../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../java/util/JUMap.ts"/>
///<reference path="../../../../../java/util/JUSet.ts"/>
var AbstractKObject = (function () {
    function AbstractKObject(p_view, p_metaClass, p_uuid, p_now, p_dimension, p_timeTree) {
        this._isDirty = false;
        this._view = null;
        this._metaClass = null;
        this._uuid = 0;
        this._isDeleted = false;
        this._isRoot = false;
        this._now = 0;
        this._timeTree = null;
        this._referenceInParent = null;
        this._dimension = null;
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
        if (this._isRoot) {
            callback.on("/");
        } else {
            this.parent({ on: function (parent) {
                    if (parent == null) {
                        callback.on(null);
                    } else {
                        parent.path({ on: function (parentPath) {
                                callback.on(Helper.path(parentPath, this._referenceInParent, this));
                            } });
                    }
                } });
        }
    };

    AbstractKObject.prototype.parentUuid = function () {
        return this._view.dimension().universe().storage().raw(this, AccessMode.READ)[AbstractKObject.PARENT_INDEX];
    };

    AbstractKObject.prototype.setParentUuid = function (parentKID) {
        this._view.dimension().universe().storage().raw(this, AccessMode.WRITE)[AbstractKObject.PARENT_INDEX] = parentKID;
    };

    AbstractKObject.prototype.parent = function (callback) {
        var parentKID = this.parentUuid();
        if (parentKID == null) {
            callback.on(null);
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
        KSelector.select(this, query, callback);
    };

    AbstractKObject.prototype.stream = function (query, callback) {
    };

    AbstractKObject.prototype.listen = function (listener) {
        this.view().dimension().universe().storage().registerListener(this, listener);
    };

    AbstractKObject.prototype.jump = function (time, callback) {
        this.view().dimension().time(time).lookup(this._uuid, { on: function (kObject) {
                callback.on(kObject);
            } });
    };

    AbstractKObject.prototype.domainKey = function () {
        var builder = new StringBuilder();
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
        var event = new DefaultKEvent(KActionType.SET, attribute, this, null, payload);
        this.view().dimension().universe().storage().notify(event);
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
        var previous = this.view().dimension().universe().storage().raw(obj, AccessMode.WRITE)[payloadIndex];
        if (previous == null) {
            if (payloadIndex == AbstractKObject.INBOUNDS_INDEX) {
                previous = new JUHashMap();
            } else {
                previous = new JUHashSet();
            }
            this.view().dimension().universe().storage().raw(obj, AccessMode.WRITE)[payloadIndex] = previous;
        }
        return previous;
    };

    AbstractKObject.prototype.removeFromContainer = function (param) {
        if (param != null && param.parentUuid() != null && param.parentUuid() != this._uuid) {
            this.view().lookup(param.parentUuid(), { on: function (parent) {
                    parent.mutate(KActionType.REMOVE, param.referenceInParent(), param, true);
                } });
        }
    };

    AbstractKObject.prototype.mutate = function (actionType, metaReference, param, setOpposite) {
        if (actionType.equals(KActionType.ADD)) {
            if (metaReference.single()) {
                this.mutate(KActionType.SET, metaReference, param, setOpposite);
            } else {
                var previousList = this.getCreateOrUpdatePayloadList(this, metaReference.index());
                previousList.add(param.uuid());
                if (metaReference.opposite() != null && setOpposite) {
                    param.mutate(KActionType.ADD, metaReference.opposite(), this, false);
                }
                if (metaReference.contained()) {
                    this.removeFromContainer(param);
                    param.set_referenceInParent(metaReference);
                    param.setParentUuid(this._uuid);
                }
                var inboundRefs = this.getCreateOrUpdatePayloadList(param, AbstractKObject.INBOUNDS_INDEX);
                inboundRefs.put(this.uuid(), metaReference.index());
            }
        } else {
            if (actionType.equals(KActionType.SET)) {
                if (!metaReference.single()) {
                    this.mutate(KActionType.ADD, metaReference, param, setOpposite);
                } else {
                    if (param == null) {
                        this.mutate(KActionType.REMOVE, metaReference, null, setOpposite);
                    } else {
                        var payload = this.view().dimension().universe().storage().raw(this, AccessMode.WRITE);
                        var previous = payload[metaReference.index()];
                        if (previous != null) {
                            this.mutate(KActionType.REMOVE, metaReference, null, setOpposite);
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
                                this.view().lookup(previous, { on: function (resolved) {
                                        resolved.mutate(KActionType.REMOVE, metaReference.opposite(), self, false);
                                    } });
                            }
                            param.mutate(KActionType.ADD, metaReference.opposite(), this, false);
                        }
                    }
                }
            } else {
                if (actionType.equals(KActionType.REMOVE)) {
                    if (metaReference.single()) {
                        var raw = this.view().dimension().universe().storage().raw(this, AccessMode.WRITE);
                        var previousKid = raw[metaReference.index()];
                        raw[metaReference.index()] = null;
                        if (previousKid != null) {
                            var self = this;
                            this._view.dimension().universe().storage().lookup(this._view, previousKid, { on: function (resolvedParam) {
                                    if (resolvedParam != null) {
                                        if (metaReference.contained()) {
                                            resolvedParam.set_referenceInParent(null);
                                            resolvedParam.setParentUuid(null);
                                        }
                                        if (metaReference.opposite() != null && setOpposite) {
                                            resolvedParam.mutate(KActionType.REMOVE, metaReference.opposite(), self, false);
                                        }
                                        var inboundRefs = this.getCreateOrUpdatePayloadList(resolvedParam, AbstractKObject.INBOUNDS_INDEX);
                                        inboundRefs.remove(this.uuid());
                                    }
                                } });
                        }
                    } else {
                        var payload = this.view().dimension().universe().storage().raw(this, AccessMode.WRITE);
                        var previous = payload[metaReference.index()];
                        if (previous != null) {
                            var previousList = previous;
                            if (this.now() != this._now) {
                                var previousListNew = new JUHashSet();
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
                                param.mutate(KActionType.REMOVE, metaReference.opposite(), this, false);
                            }
                        }
                        var inboundRefs = this.getCreateOrUpdatePayloadList(param, AbstractKObject.INBOUNDS_INDEX);
                        inboundRefs.remove(this.uuid());
                    }
                }
            }
        }
        var event = new DefaultKEvent(actionType, metaReference, this, null, param);
        this.view().dimension().universe().storage().notify(event);
    };

    AbstractKObject.prototype.size = function (metaReference) {
        return this.view().dimension().universe().storage().raw(this, AccessMode.READ)[metaReference.index()].size();
    };

    AbstractKObject.prototype.each = function (metaReference, callback, end) {
        var o = this.view().dimension().universe().storage().raw(this, AccessMode.READ)[metaReference.index()];
        if (o == null) {
            if (end != null) {
                end.on(null);
            } else {
                callback.on(null);
            }
        } else {
            if (o instanceof JUSet) {
                var objs = o;
                this.view().lookupAll(objs.toArray(new Array()), { on: function (result) {
                        var endAlreadyCalled = false;
                        try  {
                            for (var l = 0; l < result.length; l++) {
                                callback.on(result[l]);
                            }
                            endAlreadyCalled = true;
                            end.on(null);
                        } catch ($ex$) {
                            if ($ex$ instanceof Throwable) {
                                var t = $ex$;
                                if (!endAlreadyCalled) {
                                    end.on(t);
                                }
                            }
                        }
                    } });
            } else {
                this.view().lookup(o, { on: function (resolved) {
                        if (callback != null) {
                            callback.on(resolved);
                        }
                        if (end != null) {
                            end.on(null);
                        }
                    } });
            }
        }
    };

    AbstractKObject.prototype.visitAttributes = function (visitor) {
        var metaAttributes = this.metaAttributes();
        for (var i = 0; i < metaAttributes.length; i++) {
            visitor.visit(metaAttributes[i], this.get(metaAttributes[i]));
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
        var toResolveds = new JUHashSet();
        for (var i = 0; i < this.metaReferences().length; i++) {
            var reference = this.metaReferences()[i];
            if (!(treeOnly && !reference.contained())) {
                var raw = this.view().dimension().universe().storage().raw(this, AccessMode.READ);
                var o = null;
                if (raw != null) {
                    o = raw[reference.index()];
                }
                if (o != null) {
                    if (o instanceof JUSet) {
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
            end.on(null);
        } else {
            this.view().lookupAll(toResolveds.toArray(new Array()), { on: function (resolveds) {
                    var nextDeep = new JUArrayList();
                    for (var i = 0; i < resolveds.length; i++) {
                        var resolved = resolveds[i];
                        var result = visitor.visit(resolved);
                        if (result.equals(VisitResult.STOP)) {
                            end.on(null);
                        } else {
                            if (deep) {
                                if (result.equals(VisitResult.CONTINUE)) {
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
                        var next = new Array();
                        next[0] = { on: function (throwable) {
                                ii[0] = ii[0] + 1;
                                if (ii[0] == nextDeep.size()) {
                                    end.on(null);
                                } else {
                                    if (treeOnly) {
                                        nextDeep.get(ii[0]).treeVisit(visitor, next[0]);
                                    } else {
                                        nextDeep.get(ii[0]).graphVisit(visitor, next[0]);
                                    }
                                }
                            } };
                        if (treeOnly) {
                            nextDeep.get(ii[0]).treeVisit(visitor, next[0]);
                        } else {
                            nextDeep.get(ii[0]).graphVisit(visitor, next[0]);
                        }
                    } else {
                        end.on(null);
                    }
                } });
        }
    };

    AbstractKObject.prototype.graphVisit = function (visitor, end) {
        this.internal_visit(visitor, end, true, false, new JUHashSet());
    };

    AbstractKObject.prototype.treeVisit = function (visitor, end) {
        this.internal_visit(visitor, end, true, true, null);
    };

    AbstractKObject.prototype.toJSON = function () {
        var builder = new StringBuilder();
        builder.append("{\n");
        builder.append("\t\"" + JSONModelSerializer.KEY_META + "\" : \"");
        builder.append(this.metaClass().metaName());
        builder.append("\",\n");
        builder.append("\t\"" + JSONModelSerializer.KEY_UUID + "\" : \"");
        builder.append(this.uuid());
        if (this.isRoot()) {
            builder.append("\",\n");
            builder.append("\t\"" + JSONModelSerializer.KEY_ROOT + "\" : \"");
            builder.append("true");
        }
        builder.append("\",\n");
        for (var i = 0; i < this.metaAttributes().length; i++) {
            var payload = this.get(this.metaAttributes()[i]);
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
            var raw = this.view().dimension().universe().storage().raw(this, AccessMode.READ);
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
        var traces = new JUArrayList();
        if (TraceRequest.ATTRIBUTES_ONLY.equals(request) || TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
            for (var i = 0; i < this.metaAttributes().length; i++) {
                var current = this.metaAttributes()[i];
                var payload = this.get(current);
                if (payload != null) {
                    traces.add(new ModelSetTrace(this._uuid, current, payload));
                }
            }
        }
        if (TraceRequest.REFERENCES_ONLY.equals(request) || TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
            for (var i = 0; i < this.metaReferences().length; i++) {
                var ref = this.metaReferences()[i];
                var raw = this.view().dimension().universe().storage().raw(this, AccessMode.READ);
                var o = null;
                if (raw != null) {
                    o = raw[ref.index()];
                }
                if (o instanceof JUSet) {
                    var contents = o;
                    var contentsArr = contents.toArray(new Array());
                    for (var j = 0; j < contentsArr.length; j++) {
                        traces.add(new ModelAddTrace(this._uuid, ref, contentsArr[j], null));
                    }
                } else {
                    if (o != null) {
                        traces.add(new ModelAddTrace(this._uuid, ref, o, null));
                    }
                }
            }
        }
        return traces.toArray(new Array());
    };

    AbstractKObject.prototype.inbounds = function (callback, end) {
        var rawPayload = this.view().dimension().universe().storage().raw(this, AccessMode.READ);
        if (rawPayload == null) {
            end.on(new Exception("Object not initialized."));
        } else {
            var payload = rawPayload[AbstractKObject.INBOUNDS_INDEX];
            if (payload != null) {
                if (payload instanceof JUMap) {
                    var refs = payload;
                    var oppositeKids = new JUHashSet();
                    oppositeKids.addAll(refs.keySet());
                    this._view.lookupAll(oppositeKids.toArray(new Array()), { on: function (oppositeElements) {
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
                                        var reference = new InboundReference(metaRef, opposite);
                                        try  {
                                            callback.on(reference);
                                        } catch ($ex$) {
                                            if ($ex$ instanceof Throwable) {
                                                var t = $ex$;
                                                end.on(t);
                                            }
                                        }
                                    } else {
                                        end.on(new Exception("MetaReference not found with index:" + inboundRef + " in refs of " + opposite.metaClass().metaName()));
                                    }
                                }
                                end.on(null);
                            } else {
                                end.on(new Exception("Could not resolve opposite objects"));
                            }
                        } });
                } else {
                    end.on(new Exception("Inbound refs payload is not a cset"));
                }
            } else {
                end.on(null);
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
///<reference path="../Callback.ts"/>
///<reference path="../KDimension.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelCloner.ts"/>
var DefaultModelCloner = (function () {
    function DefaultModelCloner(p_factory) {
        this._factory = null;
        this._factory = p_factory;
    }
    DefaultModelCloner.prototype.clone = function (originalObject, callback) {
        if (originalObject == null || originalObject.view() == null || originalObject.view().dimension() == null) {
            callback.on(null);
        } else {
            originalObject.view().dimension().fork({ on: function (o) {
                    o.time(originalObject.view().now()).lookup(originalObject.uuid(), { on: function (clonedObject) {
                            callback.on(clonedObject);
                        } });
                } });
        }
    };
    return DefaultModelCloner;
})();
///<reference path="../KActionType.ts"/>
///<reference path="../json/JSONString.ts"/>
///<reference path="../meta/Meta.ts"/>
///<reference path="../meta/MetaReference.ts"/>
var ModelRemoveTrace = (function () {
    function ModelRemoveTrace(srcKID, reference, objKID) {
        this.traceType = KActionType.REMOVE;
        this.srcKID = null;
        this.objKID = null;
        this.reference = null;
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
        var buffer = new StringBuilder();
        buffer.append(ModelTraceConstants.openJSON);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.traceType);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(KActionType.REMOVE);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.coma);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.src);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        JSONString.encodeBuffer(buffer, this.srcKID + "");
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.coma);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.meta);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(this.reference.metaName());
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.coma);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.objpath);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        JSONString.encodeBuffer(buffer, this.objKID + "");
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.closeJSON);
        return buffer.toString();
    };
    return ModelRemoveTrace;
})();
///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelAttributeVisitor.ts"/>
///<reference path="../ModelCompare.ts"/>
///<reference path="../ModelVisitor.ts"/>
///<reference path="../VisitResult.ts"/>
///<reference path="../data/AccessMode.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../trace/ModelAddTrace.ts"/>
///<reference path="../trace/ModelRemoveTrace.ts"/>
///<reference path="../trace/ModelSetTrace.ts"/>
///<reference path="../trace/ModelTrace.ts"/>
///<reference path="../trace/TraceSequence.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../java/util/JUMap.ts"/>
///<reference path="../../../../../java/util/JUSet.ts"/>
var DefaultModelCompare = (function () {
    function DefaultModelCompare(p_factory) {
        this._factory = null;
        this._factory = p_factory;
    }
    DefaultModelCompare.prototype.diff = function (origin, target, callback) {
        this.internal_diff(origin, target, false, false, callback);
    };

    DefaultModelCompare.prototype.union = function (origin, target, callback) {
        this.internal_diff(origin, target, false, true, callback);
    };

    DefaultModelCompare.prototype.intersection = function (origin, target, callback) {
        this.internal_diff(origin, target, true, false, callback);
    };

    DefaultModelCompare.prototype.internal_diff = function (origin, target, inter, merge, callback) {
        var traces = new JUArrayList();
        var tracesRef = new JUArrayList();
        var objectsMap = new JUHashMap();
        traces.addAll(this.internal_createTraces(origin, target, inter, merge, false, true));
        tracesRef.addAll(this.internal_createTraces(origin, target, inter, merge, true, false));
        origin.treeVisit({ visit: function (elem) {
                objectsMap.put(elem.uuid(), elem);
                return VisitResult.CONTINUE;
            } }, { on: function (throwable) {
                if (throwable != null) {
                    throwable.printStackTrace();
                    callback.on(null);
                } else {
                    target.treeVisit({ visit: function (elem) {
                            var childPath = elem.uuid();
                            if (objectsMap.containsKey(childPath)) {
                                if (inter) {
                                    var currentReference = null;
                                    traces.add(new ModelAddTrace(elem.parentUuid(), currentReference, elem.uuid(), elem.metaClass()));
                                }
                                traces.addAll(this.internal_createTraces(objectsMap.get(childPath), elem, inter, merge, false, true));
                                tracesRef.addAll(this.internal_createTraces(objectsMap.get(childPath), elem, inter, merge, true, false));
                                objectsMap.remove(childPath);
                            } else {
                                if (!inter) {
                                    var currentReference = null;
                                    traces.add(new ModelAddTrace(elem.parentUuid(), currentReference, elem.uuid(), elem.metaClass()));
                                    traces.addAll(this.internal_createTraces(elem, elem, true, merge, false, true));
                                    tracesRef.addAll(this.internal_createTraces(elem, elem, true, merge, true, false));
                                }
                            }
                            return VisitResult.CONTINUE;
                        } }, { on: function (throwable) {
                            if (throwable != null) {
                                throwable.printStackTrace();
                                callback.on(null);
                            } else {
                                traces.addAll(tracesRef);
                                if (!inter && !merge) {
                                    var diffChildKeys = objectsMap.keySet().toArray(new Array());
                                    for (var i = 0; i < diffChildKeys.length; i++) {
                                        var diffChildKey = diffChildKeys[i];
                                        var diffChild = objectsMap.get(diffChildKey);
                                        var src = diffChild.parentUuid();
                                        traces.add(new ModelRemoveTrace(src, diffChild.referenceInParent(), diffChild.uuid()));
                                    }
                                }
                                callback.on(new TraceSequence().populate(traces));
                            }
                        } });
                }
            } });
    };

    DefaultModelCompare.prototype.internal_createTraces = function (current, sibling, inter, merge, references, attributes) {
        var traces = new JUArrayList();
        var values = new JUHashMap();
        if (attributes) {
            if (current != null) {
                current.visitAttributes({ visit: function (metaAttribute, value) {
                        if (value == null) {
                            values.put(metaAttribute, null);
                        } else {
                            values.put(metaAttribute, value.toString());
                        }
                    } });
            }
            if (sibling != null) {
                sibling.visitAttributes({ visit: function (metaAttribute, value) {
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
                                traces.add(new ModelSetTrace(current.uuid(), metaAttribute, flatAtt2));
                            }
                        } else {
                            if (!inter) {
                                traces.add(new ModelSetTrace(current.uuid(), metaAttribute, flatAtt2));
                            }
                        }
                        values.remove(metaAttribute);
                    } });
            }
            if (!inter && !merge && !values.isEmpty()) {
                var mettaAttributes = values.keySet().toArray(new Array());
                for (var i = 0; i < mettaAttributes.length; i++) {
                    var hashLoopRes = mettaAttributes[i];
                    traces.add(new ModelSetTrace(current.uuid(), hashLoopRes, null));
                    values.remove(hashLoopRes);
                }
            }
        }
        var valuesRef = new JUHashMap();
        if (references) {
            for (var i = 0; i < current.metaReferences().length; i++) {
                var reference = current.metaReferences()[i];
                var payload = current.view().dimension().universe().storage().raw(current, AccessMode.READ)[reference.index()];
                valuesRef.put(reference, payload);
            }
            if (sibling != null) {
                for (var i = 0; i < sibling.metaReferences().length; i++) {
                    var reference = sibling.metaReferences()[i];
                    var payload2 = sibling.view().dimension().universe().storage().raw(sibling, AccessMode.READ)[reference.index()];
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
                                    traces.add(new ModelAddTrace(current.uuid(), reference, payload2, null));
                                }
                            }
                        } else {
                            if (!inter) {
                                traces.add(new ModelAddTrace(current.uuid(), reference, payload2, null));
                            }
                        }
                    } else {
                        if (payload1 == null && payload2 != null) {
                            var siblingToAdd = payload2.toArray(new Array());
                            for (var j = 0; j < siblingToAdd.length; j++) {
                                var siblingElem = siblingToAdd[j];
                                if (!inter) {
                                    traces.add(new ModelAddTrace(current.uuid(), reference, siblingElem, null));
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
                                            traces.add(new ModelAddTrace(current.uuid(), reference, currentPath, null));
                                        }
                                    } else {
                                        if (!inter) {
                                            traces.add(new ModelRemoveTrace(current.uuid(), reference, currentPath));
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
                            if (payload instanceof JUSet) {
                                var toRemoveSet = payload.toArray(new Array());
                                for (var j = 0; j < toRemoveSet.length; j++) {
                                    var toRemovePath = toRemoveSet[j];
                                    traces.add(new ModelRemoveTrace(current.uuid(), hashLoopResRef, toRemovePath));
                                }
                            } else {
                                traces.add(new ModelRemoveTrace(current.uuid(), hashLoopResRef, payload));
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
///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelLoader.ts"/>
///<reference path="../abs/AbstractKObject.ts"/>
///<reference path="../data/AccessMode.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../meta/MetaType.ts"/>
///<reference path="../time/TimeTree.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../java/util/JUHashSet.ts"/>
///<reference path="../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../java/util/JUMap.ts"/>
///<reference path="../../../../../java/util/JUSet.ts"/>
var JSONModelLoader = (function () {
    function JSONModelLoader(p_factory) {
        this._factory = null;
        this._factory = p_factory;
    }
    JSONModelLoader.load = function (payload, factory, callback) {
        var lexer = new Lexer(payload);
        var loaded = new Array();
        JSONModelLoader.loadObjects(lexer, factory, { on: function (objs) {
                loaded[0] = objs.get(0);
            } });
        return loaded[0];
    };

    JSONModelLoader.loadObjects = function (lexer, factory, callback) {
        var loaded = new JUArrayList();
        var alls = new JUArrayList();
        var content = new JUHashMap();
        var currentAttributeName = null;
        var arrayPayload = null;
        var currentToken = lexer.nextToken();
        while (currentToken.tokenType() != Type.EOF) {
            if (currentToken.tokenType().equals(Type.LEFT_BRACKET)) {
                arrayPayload = new JUHashSet();
            } else {
                if (currentToken.tokenType().equals(Type.RIGHT_BRACKET)) {
                    content.put(currentAttributeName, arrayPayload);
                    arrayPayload = null;
                    currentAttributeName = null;
                } else {
                    if (currentToken.tokenType().equals(Type.LEFT_BRACE)) {
                        content = new JUHashMap();
                    } else {
                        if (currentToken.tokenType().equals(Type.RIGHT_BRACE)) {
                            alls.add(content);
                            content = new JUHashMap();
                        } else {
                            if (currentToken.tokenType().equals(Type.VALUE)) {
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
        for (var i = 0; i < keys.length; i++) {
            var kid = Long.parseLong(alls.get(i).get(JSONModelSerializer.KEY_UUID).toString());
            keys[i] = kid;
        }
        factory.dimension().timeTrees(keys, { on: function (timeTrees) {
                for (var i = 0; i < alls.size(); i++) {
                    var elem = alls.get(i);
                    var meta = elem.get(JSONModelSerializer.KEY_META).toString();
                    var kid = Long.parseLong(elem.get(JSONModelSerializer.KEY_UUID).toString());
                    var isRoot = false;
                    var root = elem.get(JSONModelSerializer.KEY_ROOT);
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
                    var payloadObj = factory.dimension().universe().storage().raw(current, AccessMode.WRITE);

                    //TODO resolve for-each cycle
                    var k;
                    for (k in elem.keySet()) {
                        var att = current.metaAttribute(k);
                        if (att != null) {
                            payloadObj[att.index()] = JSONModelLoader.convertRaw(att, elem.get(k));
                        } else {
                            var ref = current.metaReference(k);
                            if (ref != null) {
                                if (ref.single()) {
                                    var refPayloadSingle;
                                    try  {
                                        refPayloadSingle = Long.parseLong(elem.get(k).toString());
                                        payloadObj[ref.index()] = refPayloadSingle;
                                    } catch ($ex$) {
                                        if ($ex$ instanceof Exception) {
                                            var e = $ex$;
                                            e.printStackTrace();
                                        }
                                    }
                                } else {
                                    try  {
                                        var plainRawList = elem.get(k);
                                        var convertedRaw = new JUHashSet();

                                        //TODO resolve for-each cycle
                                        var plainRaw;
                                        for (plainRaw in plainRawList) {
                                            try  {
                                                var converted = Long.parseLong(plainRaw);
                                                convertedRaw.add(converted);
                                            } catch ($ex$) {
                                                if ($ex$ instanceof Exception) {
                                                    var e = $ex$;
                                                    e.printStackTrace();
                                                }
                                            }
                                        }
                                        payloadObj[ref.index()] = convertedRaw;
                                    } catch ($ex$) {
                                        if ($ex$ instanceof Exception) {
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
                    callback.on(loaded);
                }
            } });
    };

    JSONModelLoader.prototype.load = function (payload, callback) {
        if (payload == null) {
            callback.on(null);
        } else {
            var lexer = new Lexer(payload);
            var currentToken = lexer.nextToken();
            if (currentToken.tokenType() != Type.LEFT_BRACKET) {
                callback.on(null);
            } else {
                JSONModelLoader.loadObjects(lexer, this._factory, { on: function (kObjects) {
                        callback.on(null);
                    } });
            }
        }
    };

    JSONModelLoader.convertRaw = function (attribute, raw) {
        try  {
            if (attribute.metaType().equals(MetaType.STRING)) {
                return raw.toString();
            } else {
                if (attribute.metaType().equals(MetaType.LONG)) {
                    return Long.parseLong(raw.toString());
                } else {
                    if (attribute.metaType().equals(MetaType.INT)) {
                        return Integer.parseInt(raw.toString());
                    } else {
                        if (attribute.metaType().equals(MetaType.BOOL)) {
                            return raw.toString().equals("true");
                        } else {
                            if (attribute.metaType().equals(MetaType.SHORT)) {
                                return Short.parseShort(raw.toString());
                            } else {
                                if (attribute.metaType().equals(MetaType.DOUBLE)) {
                                    return Double.parseDouble(raw.toString());
                                } else {
                                    if (attribute.metaType().equals(MetaType.FLOAT)) {
                                        return Float.parseFloat(raw.toString());
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
            if ($ex$ instanceof Exception) {
                var e = $ex$;
                e.printStackTrace();
                return null;
            }
        }
    };
    return JSONModelLoader;
})();
///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../ModelSlicer.ts"/>
///<reference path="../ModelVisitor.ts"/>
///<reference path="../TraceRequest.ts"/>
///<reference path="../VisitResult.ts"/>
///<reference path="../trace/ModelAddTrace.ts"/>
///<reference path="../trace/ModelTrace.ts"/>
///<reference path="../trace/TraceSequence.ts"/>
///<reference path="../util/CallBackChain.ts"/>
///<reference path="../util/Helper.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/Collections.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../java/util/JUMap.ts"/>
var DefaultModelSlicer = (function () {
    function DefaultModelSlicer() {
    }
    DefaultModelSlicer.prototype.internal_prune = function (elem, traces, cache, parentMap, callback) {
        var parents = new JUArrayList();
        var parentExplorer = new Array();
        parentExplorer[0] = { on: function (currentParent) {
                if (currentParent != null && parentMap.get(currentParent.uuid()) == null && cache.get(currentParent.uuid()) == null) {
                    parents.add(currentParent);
                    currentParent.parent(parentExplorer[0]);
                    callback.on(null);
                } else {
                    Collections.reverse(parents);
                    var parentsArr = parents.toArray(new Array());
                    for (var k = 0; k < parentsArr.length; k++) {
                        var parent = parentsArr[k];
                        if (parent.parentUuid() != null) {
                            traces.add(new ModelAddTrace(parent.parentUuid(), parent.referenceInParent(), parent.uuid(), parent.metaClass()));
                        }
                        var toAdd = elem.traces(TraceRequest.ATTRIBUTES_ONLY);
                        for (var i = 0; i < toAdd.length; i++) {
                            traces.add(toAdd[i]);
                        }
                        parentMap.put(parent.uuid(), parent);
                    }
                    if (cache.get(elem.uuid()) == null && parentMap.get(elem.uuid()) == null) {
                        if (elem.parentUuid() != null) {
                            traces.add(new ModelAddTrace(elem.parentUuid(), elem.referenceInParent(), elem.uuid(), elem.metaClass()));
                        }
                        var toAdd = elem.traces(TraceRequest.ATTRIBUTES_ONLY);
                        for (var i = 0; i < toAdd.length; i++) {
                            traces.add(toAdd[i]);
                        }
                    }
                    cache.put(elem.uuid(), elem);
                    elem.graphVisit({ visit: function (elem) {
                            if (cache.get(elem.uuid()) == null) {
                                this.internal_prune(elem, traces, cache, parentMap, { on: function (throwable) {
                                    } });
                            }
                            return VisitResult.CONTINUE;
                        } }, { on: function (throwable) {
                            callback.on(null);
                        } });
                }
            } };
        traces.add(new ModelAddTrace(elem.uuid(), null, elem.uuid(), elem.metaClass()));
        elem.parent(parentExplorer[0]);
    };

    DefaultModelSlicer.prototype.slice = function (elems, callback) {
        var traces = new JUArrayList();
        var tempMap = new JUHashMap();
        var parentMap = new JUHashMap();
        var elemsArr = elems.toArray(new Array());
        Helper.forall(elemsArr, { on: function (obj, next) {
                this.internal_prune(obj, traces, tempMap, parentMap, next);
            } }, { on: function (throwable) {
                var toLinkKeysArr = tempMap.keySet().toArray(new Array());
                for (var k = 0; k < toLinkKeysArr.length; k++) {
                    var toLink = tempMap.get(toLinkKeysArr[k]);
                    var toAdd = toLink.traces(TraceRequest.REFERENCES_ONLY);
                    for (var i = 0; i < toAdd.length; i++) {
                        traces.add(toAdd[i]);
                    }
                }
                callback.on(new TraceSequence().populate(traces));
            } });
    };
    return DefaultModelSlicer;
})();
var TreeNode = (function () {
    function TreeNode(key, value, color, left, right) {
        this.key = 0;
        this.value = null;
        this.color = null;
        this.left = null;
        this.right = null;
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
        if (this.value == State.DELETED) {
            if (this.color == Color.BLACK) {
                builder.append(TreeNode.BLACK_DELETE);
            } else {
                builder.append(TreeNode.RED_DELETE);
            }
        } else {
            if (this.color == Color.BLACK) {
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
var RBTree = (function () {
    function RBTree() {
        this.root = null;
        this._size = 0;
    }
    RBTree.prototype.size = function () {
        return this._size;
    };

    RBTree.prototype.serialize = function () {
        var builder = new StringBuilder();
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
        var buffer = new StringBuilder();
        var ch = payload.charAt(i);
        while (i < payload.length && ch != '|') {
            buffer.append(ch);
            i = i + 1;
            ch = payload.charAt(i);
        }
        this._size = Integer.parseInt(buffer.toString());
        this.root = new ReaderContext(i, payload).unserialize(true);
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
        var insertedNode = new TreeNode(key, value, Color.RED, null, null);
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
            n.color = Color.BLACK;
        } else {
            this.insertCase2(n);
        }
    };

    RBTree.prototype.insertCase2 = function (n) {
        if (this.nodeColor(n.getParent()) == Color.BLACK) {
            return;
        } else {
            this.insertCase3(n);
        }
    };

    RBTree.prototype.insertCase3 = function (n) {
        if (this.nodeColor(n.uncle()) == Color.RED) {
            n.getParent().color = Color.BLACK;
            n.uncle().color = Color.BLACK;
            n.grandparent().color = Color.RED;
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
        n.getParent().color = Color.BLACK;
        n.grandparent().color = Color.RED;
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
            if (this.nodeColor(n) == Color.BLACK) {
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
        if (this.nodeColor(n.sibling()) == Color.RED) {
            n.getParent().color = Color.RED;
            n.sibling().color = Color.BLACK;
            if (n == n.getParent().getLeft()) {
                this.rotateLeft(n.getParent());
            } else {
                this.rotateRight(n.getParent());
            }
        }
        this.deleteCase3(n);
    };

    RBTree.prototype.deleteCase3 = function (n) {
        if (this.nodeColor(n.getParent()) == Color.BLACK && this.nodeColor(n.sibling()) == Color.BLACK && this.nodeColor(n.sibling().getLeft()) == Color.BLACK && this.nodeColor(n.sibling().getRight()) == Color.BLACK) {
            n.sibling().color = Color.RED;
            this.deleteCase1(n.getParent());
        } else {
            this.deleteCase4(n);
        }
    };

    RBTree.prototype.deleteCase4 = function (n) {
        if (this.nodeColor(n.getParent()) == Color.RED && this.nodeColor(n.sibling()) == Color.BLACK && this.nodeColor(n.sibling().getLeft()) == Color.BLACK && this.nodeColor(n.sibling().getRight()) == Color.BLACK) {
            n.sibling().color = Color.RED;
            n.getParent().color = Color.BLACK;
        } else {
            this.deleteCase5(n);
        }
    };

    RBTree.prototype.deleteCase5 = function (n) {
        if (n == n.getParent().getLeft() && this.nodeColor(n.sibling()) == Color.BLACK && this.nodeColor(n.sibling().getLeft()) == Color.RED && this.nodeColor(n.sibling().getRight()) == Color.BLACK) {
            n.sibling().color = Color.RED;
            n.sibling().getLeft().color = Color.BLACK;
            this.rotateRight(n.sibling());
        } else {
            if (n == n.getParent().getRight() && this.nodeColor(n.sibling()) == Color.BLACK && this.nodeColor(n.sibling().getRight()) == Color.RED && this.nodeColor(n.sibling().getLeft()) == Color.BLACK) {
                n.sibling().color = Color.RED;
                n.sibling().getRight().color = Color.BLACK;
                this.rotateLeft(n.sibling());
            }
        }
        this.deleteCase6(n);
    };

    RBTree.prototype.deleteCase6 = function (n) {
        n.sibling().color = this.nodeColor(n.getParent());
        n.getParent().color = Color.BLACK;
        if (n == n.getParent().getLeft()) {
            n.sibling().getRight().color = Color.BLACK;
            this.rotateLeft(n.getParent());
        } else {
            n.sibling().getLeft().color = Color.BLACK;
            this.rotateRight(n.getParent());
        }
    };

    RBTree.prototype.nodeColor = function (n) {
        if (n == null) {
            return Color.BLACK;
        } else {
            return n.color;
        }
    };
    return RBTree;
})();
var State = (function () {
    function State() {
    }
    State.prototype.equals = function (other) {
        return this == other;
    };
    State.EXISTS = new State();
    State.DELETED = new State();
    return State;
})();
///<reference path="rbtree/TreeNode.ts"/>
///<reference path="rbtree/RBTree.ts"/>
///<reference path="rbtree/State.ts"/>
var DefaultTimeTree = (function () {
    function DefaultTimeTree() {
        this.dirty = true;
        this.versionTree = new RBTree();
    }
    DefaultTimeTree.prototype.walk = function (walker) {
        this.walkAsc(walker);
    };

    DefaultTimeTree.prototype.walkAsc = function (walker) {
        var elem = this.versionTree.first();
        while (elem != null) {
            walker.walk(elem.getKey());
            elem = elem.next();
        }
    };

    DefaultTimeTree.prototype.walkDesc = function (walker) {
        var elem = this.versionTree.last();
        while (elem != null) {
            walker.walk(elem.getKey());
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
            walker.walk(elem.getKey());
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
            walker.walk(elem.getKey());
            elem = elem.previous();
            if (elem != null) {
                if (elem.getKey() <= from2) {
                    walker.walk(elem.getKey());
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
        this.versionTree.insert(time, State.EXISTS);
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
///<reference path="../Callback.ts"/>
///<reference path="../KActionType.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelLoader.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>
var XMIModelLoader = (function () {
    function XMIModelLoader(p_factory) {
        this._factory = null;
        this._factory = p_factory;
    }
    XMIModelLoader.unescapeXml = function (src) {
        var builder = null;
        var i = 0;
        while (i < src.length) {
            var c = src.charAt(i);
            if (c == '&') {
                if (builder == null) {
                    builder = new StringBuilder();
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

    XMIModelLoader.prototype.load = function (str, callback) {
        var parser = new XmlParser(str);
        if (!parser.hasNext()) {
            callback.on(null);
        } else {
            var context = new XMILoadingContext();
            context.successCallback = callback;
            context.xmiReader = parser;
            this.deserialize(context);
        }
    };

    XMIModelLoader.prototype.deserialize = function (context) {
        try  {
            var nsURI;
            var reader = context.xmiReader;
            while (reader.hasNext()) {
                var nextTag = reader.next();
                if (nextTag.equals(XmlToken.START_TAG)) {
                    var localName = reader.getLocalName();
                    if (localName != null) {
                        var ns = new JUHashMap();
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
                        context.loadedRoots = this.loadObject(context, "/", xsiType + "." + localName);
                    }
                }
            }
            for (var i = 0; i < context.resolvers.size(); i++) {
                context.resolvers.get(i).run();
            }
            this._factory.setRoot(context.loadedRoots);
            context.successCallback.on(null);
        } catch ($ex$) {
            if ($ex$ instanceof Exception) {
                var e = $ex$;
                context.successCallback.on(e);
            }
        }
    };

    XMIModelLoader.prototype.callFactory = function (ctx, objectType) {
        var modelElem = null;
        if (objectType != null) {
            modelElem = this._factory.createFQN(objectType);
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
                    modelElem = this._factory.createFQN(realTypeName + "." + realName);
                }
            }
        } else {
            modelElem = this._factory.createFQN(ctx.xmiReader.getLocalName());
        }
        return modelElem;
    };

    XMIModelLoader.prototype.loadObject = function (ctx, xmiAddress, objectType) {
        var elementTagName = ctx.xmiReader.getLocalName();
        var modelElem = this.callFactory(ctx, objectType);
        if (modelElem == null) {
            throw new Exception("Could not create an object for local name " + elementTagName);
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
                        modelElem.set(kAttribute, XMIModelLoader.unescapeXml(valueAtt));
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
                                    modelElem.mutate(KActionType.ADD, kreference, ref, true);
                                } else {
                                    ctx.resolvers.add(new XMIResolveCommand(ctx, modelElem, KActionType.ADD, attrName, adjustedRef));
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
                if (tok.equals(XmlToken.START_TAG)) {
                    var subElemName = ctx.xmiReader.getLocalName();
                    var key = xmiAddress + "/@" + subElemName;
                    var i = ctx.elementsCount.get(key);
                    if (i == null) {
                        i = 0;
                        ctx.elementsCount.put(key, i);
                    }
                    var subElementId = xmiAddress + "/@" + subElemName + (i != 0 ? "." + i : "");
                    var containedElement = this.loadObject(ctx, subElementId, subElemName);
                    modelElem.mutate(KActionType.ADD, modelElem.metaReference(subElemName), containedElement, true);
                    ctx.elementsCount.put(xmiAddress + "/@" + subElemName, i + 1);
                } else {
                    if (tok.equals(XmlToken.END_TAG)) {
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
///<reference path="../KObject.ts"/>
///<reference path="../ModelSerializer.ts"/>
///<reference path="../ModelVisitor.ts"/>
///<reference path="../ThrowableCallback.ts"/>
///<reference path="../VisitResult.ts"/>
var XMIModelSerializer = (function () {
    function XMIModelSerializer() {
    }
    XMIModelSerializer.prototype.serialize = function (model, callback) {
        var context = new SerializationContext();
        context.model = model;
        context.finishCallback = callback;
        context.attributesVisitor = new AttributesVisitor(context);
        context.printer = new StringBuilder();
        context.addressTable.put(model.uuid(), "/");
        model.treeVisit({ visit: function (elem) {
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
                return VisitResult.CONTINUE;
            } }, new PrettyPrinter(context));
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
    return XMIModelSerializer;
})();
///<reference path="../Callback.ts"/>
///<reference path="../KActionType.ts"/>
///<reference path="../KDimension.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelCloner.ts"/>
///<reference path="../ModelCompare.ts"/>
///<reference path="../ModelListener.ts"/>
///<reference path="../ModelLoader.ts"/>
///<reference path="../ModelSerializer.ts"/>
///<reference path="../ModelSlicer.ts"/>
///<reference path="../clone/DefaultModelCloner.ts"/>
///<reference path="../compare/DefaultModelCompare.ts"/>
///<reference path="../event/DefaultKEvent.ts"/>
///<reference path="../json/JSONModelLoader.ts"/>
///<reference path="../json/JSONModelSerializer.ts"/>
///<reference path="../meta/MetaClass.ts"/>
///<reference path="../select/KSelector.ts"/>
///<reference path="../slice/DefaultModelSlicer.ts"/>
///<reference path="../time/TimeTree.ts"/>
///<reference path="../time/DefaultTimeTree.ts"/>
///<reference path="../xmi/XMIModelLoader.ts"/>
///<reference path="../xmi/XMIModelSerializer.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../java/util/JUSet.ts"/>
var AbstractKView = (function () {
    function AbstractKView(p_now, p_dimension) {
        this._now = 0;
        this._dimension = null;
        this._now = p_now;
        this._dimension = p_dimension;
    }
    AbstractKView.prototype.now = function () {
        return this._now;
    };

    AbstractKView.prototype.dimension = function () {
        return this._dimension;
    };

    AbstractKView.prototype.createJSONSerializer = function () {
        return new JSONModelSerializer();
    };

    AbstractKView.prototype.createJSONLoader = function () {
        return new JSONModelLoader(this);
    };

    AbstractKView.prototype.createXMISerializer = function () {
        return new XMIModelSerializer();
    };

    AbstractKView.prototype.createXMILoader = function () {
        return new XMIModelLoader(this);
    };

    AbstractKView.prototype.createModelCompare = function () {
        return new DefaultModelCompare(this);
    };

    AbstractKView.prototype.createModelCloner = function () {
        return new DefaultModelCloner(this);
    };

    AbstractKView.prototype.createModelSlicer = function () {
        return new DefaultModelSlicer();
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
        this.dimension().universe().storage().getRoot(this, { on: function (rootObj) {
                var cleanedQuery = query;
                if (cleanedQuery.equals("/")) {
                    var res = new JUArrayList();
                    if (rootObj != null) {
                        res.add(rootObj);
                    }
                    callback.on(res.toArray(new Array()));
                } else {
                    if (cleanedQuery.startsWith("/")) {
                        cleanedQuery = cleanedQuery.substring(1);
                    }
                    KSelector.select(rootObj, cleanedQuery, callback);
                }
            } });
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
        var newObj = this.internalCreate(clazz, new DefaultTimeTree().insert(this.now()), this.dimension().universe().storage().nextObjectKey());
        if (newObj != null) {
            this.dimension().universe().storage().notify(new DefaultKEvent(KActionType.NEW, null, newObj, null, newObj));
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
    return AbstractKView;
})();
///<reference path="../../KDimension.ts"/>
///<reference path="../../ModelListener.ts"/>
///<reference path="../../time/DefaultTimeTree.ts"/>
///<reference path="../../time/TimeTree.ts"/>
///<reference path="../../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../../java/util/JUMap.ts"/>
var DimensionCache = (function () {
    function DimensionCache(dimension) {
        this.timeTreeCache = new JUHashMap();
        this.timesCaches = new JUHashMap();
        this.dimension = null;
        this.rootTimeTree = new DefaultTimeTree();
        this.listeners = new JUArrayList();
        this.dimension = dimension;
    }
    return DimensionCache;
})();
///<reference path="../../KObject.ts"/>
///<reference path="../../ModelListener.ts"/>
///<reference path="../../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../../java/util/JUMap.ts"/>
var TimeCache = (function () {
    function TimeCache() {
        this.obj_cache = new JUHashMap();
        this.payload_cache = new JUHashMap();
        this.root = null;
        this.rootDirty = false;
        this.listeners = new JUArrayList();
        this.obj_listeners = new JUHashMap();
    }
    return TimeCache;
})();
///<reference path="../Callback.ts"/>
///<reference path="../KDimension.ts"/>
///<reference path="../KEvent.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KUniverse.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelListener.ts"/>
///<reference path="../ThrowableCallback.ts"/>
///<reference path="../abs/AbstractKDimension.ts"/>
///<reference path="../abs/AbstractKObject.ts"/>
///<reference path="../abs/AbstractKUniverse.ts"/>
///<reference path="../abs/AbstractKView.ts"/>
///<reference path="cache/DimensionCache.ts"/>
///<reference path="cache/TimeCache.ts"/>
///<reference path="../strategy/ExtrapolationStrategy.ts"/>
///<reference path="../json/JSONModelLoader.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../time/TimeTree.ts"/>
///<reference path="../time/DefaultTimeTree.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../java/util/JUMap.ts"/>
///<reference path="../../../../../java/util/JUHashSet.ts"/>
///<reference path="../../../../../java/util/JUSet.ts"/>
var DefaultKStore = (function () {
    function DefaultKStore(p_db) {
        this._db = null;
        this.universeListeners = new JUArrayList();
        this.caches = new JUHashMap();
        this.dimKeyCounter = 0;
        this.objectKey = 0;
        this._db = p_db;
    }
    DefaultKStore.prototype.keyTree = function (dim, key) {
        return "" + dim.key() + DefaultKStore.KEY_SEP + key;
    };

    DefaultKStore.prototype.keyRoot = function (dim, time) {
        return dim.key() + DefaultKStore.KEY_SEP + time + DefaultKStore.KEY_SEP + "root";
    };

    DefaultKStore.prototype.keyRootTree = function (dim) {
        return dim.key() + DefaultKStore.KEY_SEP + "root";
    };

    DefaultKStore.prototype.keyPayload = function (dim, time, key) {
        return "" + dim.key() + DefaultKStore.KEY_SEP + time + DefaultKStore.KEY_SEP + key;
    };

    DefaultKStore.prototype.initDimension = function (dimension, callback) {
        var dimensionCache = new DimensionCache(dimension);
        this.caches.put(dimension.key(), dimensionCache);
        var rootTreeKeys = new Array();
        rootTreeKeys[0] = this.keyRootTree(dimension);
        this._db.get(rootTreeKeys, { on: function (res, error) {
                if (error != null) {
                    callback.on(error);
                } else {
                    try  {
                        dimensionCache.rootTimeTree.load(res[0]);
                        callback.on(null);
                    } catch ($ex$) {
                        if ($ex$ instanceof Exception) {
                            var e = $ex$;
                            callback.on(e);
                        }
                    }
                }
            } });
    };

    DefaultKStore.prototype.initKObject = function (obj, originView) {
        var dimensionCache = this.caches.get(originView.dimension().key());
        if (!dimensionCache.timeTreeCache.containsKey(obj.uuid())) {
            dimensionCache.timeTreeCache.put(obj.uuid(), obj.timeTree());
        }
        var timeCache = dimensionCache.timesCaches.get(originView.now());
        if (timeCache == null) {
            timeCache = new TimeCache();
            dimensionCache.timesCaches.put(originView.now(), timeCache);
        }
        timeCache.obj_cache.put(obj.uuid(), obj);
    };

    DefaultKStore.prototype.nextDimensionKey = function () {
        this.dimKeyCounter++;
        return this.dimKeyCounter;
    };

    DefaultKStore.prototype.nextObjectKey = function () {
        this.objectKey++;
        return this.objectKey;
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
        if (accessMode.equals(AccessMode.WRITE)) {
            origin.setDirty(true);
        }
        var dimensionCache = this.caches.get(origin.dimension().key());
        var resolvedTime = origin.timeTree().resolve(origin.now());
        var needCopy = accessMode.equals(AccessMode.WRITE) && resolvedTime != origin.now();
        var timeCache = dimensionCache.timesCaches.get(resolvedTime);
        if (timeCache == null) {
            timeCache = new TimeCache();
            dimensionCache.timesCaches.put(resolvedTime, timeCache);
        }
        var payload = timeCache.payload_cache.get(origin.uuid());
        if (payload == null) {
            payload = new Array();
            if (accessMode.equals(AccessMode.WRITE) && !needCopy) {
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
                    if (resolved instanceof JUSet) {
                        var clonedSet = new JUHashSet();
                        clonedSet.addAll(resolved);
                        cloned[i] = clonedSet;
                    } else {
                        if (resolved instanceof JUList) {
                            var clonedList = new JUArrayList();
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
                timeCacheCurrent = new TimeCache();
                dimensionCache.timesCaches.put(origin.view().now(), timeCacheCurrent);
            }
            timeCacheCurrent.payload_cache.put(origin.uuid(), cloned);
            origin.timeTree().insert(origin.view().now());
            return cloned;
        }
    };

    DefaultKStore.prototype.discard = function (dimension, callback) {
        this.caches.remove(dimension.key());
        callback.on(null);
    };

    DefaultKStore.prototype.delete = function (dimension, callback) {
        new Exception("Not implemented yet !");
    };

    DefaultKStore.prototype.save = function (dimension, callback) {
        var dimensionCache = this.caches.get(dimension.key());
        if (dimensionCache == null) {
            callback.on(null);
        } else {
            var sizeCache = 0;
            var timeCaches = dimensionCache.timesCaches.values().toArray(new Array());
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
            for (var i = 0; i < timeTrees.length; i++) {
                var timeTree = timeTrees[i];
                if (timeTree.isDirty()) {
                    sizeCache++;
                }
            }
            if (dimensionCache.rootTimeTree.isDirty()) {
                sizeCache++;
            }
            var payloads = new Array(new Array());
            var i = 0;
            for (var j = 0; j < timeCaches.length; j++) {
                var timeCache = timeCaches[j];
                var valuesArr = timeCache.obj_cache.values().toArray(new Array());
                for (var k = 0; k < valuesArr.length; k++) {
                    var cached = valuesArr[k];
                    if (cached.isDirty()) {
                        payloads[i][0] = this.keyPayload(dimension, cached.now(), cached.uuid());
                        payloads[i][1] = cached.toJSON();
                        cached.setDirty(false);
                        i++;
                    }
                }
                if (timeCache.rootDirty) {
                    payloads[i][0] = this.keyRoot(dimension, timeCache.root.now());
                    payloads[i][1] = timeCache.root.uuid() + "";
                    timeCache.rootDirty = false;
                    i++;
                }
            }
            var keyArr = dimensionCache.timeTreeCache.keySet().toArray(new Array());
            for (var k = 0; k < keyArr.length; k++) {
                var timeTreeKey = keyArr[k];
                var timeTree = dimensionCache.timeTreeCache.get(timeTreeKey);
                if (timeTree.isDirty()) {
                    payloads[i][0] = this.keyTree(dimension, timeTreeKey);
                    payloads[i][1] = timeTree.toString();
                    timeTree.setDirty(false);
                    i++;
                }
            }
            if (dimensionCache.rootTimeTree.isDirty()) {
                payloads[i][0] = this.keyRootTree(dimension);
                payloads[i][1] = dimensionCache.rootTimeTree.toString();
                dimensionCache.rootTimeTree.setDirty(false);
                i++;
            }
            this._db.put(payloads, callback);
        }
    };

    DefaultKStore.prototype.saveUnload = function (dimension, callback) {
        this.save(dimension, { on: function (throwable) {
                if (throwable == null) {
                    this.discard(dimension, callback);
                } else {
                    callback.on(throwable);
                }
            } });
    };

    DefaultKStore.prototype.timeTree = function (dimension, key, callback) {
        var keys = new Array();
        keys[0] = key;
        this.timeTrees(dimension, keys, { on: function (timeTrees) {
                if (timeTrees.length == 1) {
                    callback.on(timeTrees[0]);
                } else {
                    callback.on(null);
                }
            } });
    };

    DefaultKStore.prototype.timeTrees = function (dimension, keys, callback) {
        var toLoad = new JUArrayList();
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
            callback.on(result);
        } else {
            var toLoadKeys = new Array();
            for (var i = 0; i < toLoadKeys.length; i++) {
                toLoadKeys[i] = this.keyTree(dimension, keys[toLoad.get(i)]);
            }
            this._db.get(toLoadKeys, { on: function (res, error) {
                    if (error != null) {
                        error.printStackTrace();
                    }
                    for (var i = 0; i < res.length; i++) {
                        var newTree = new DefaultTimeTree();
                        try  {
                            if (res[i] != null) {
                                newTree.load(res[i]);
                            } else {
                                newTree.insert(dimension.key());
                            }
                            dimensionCache.timeTreeCache.put(keys[toLoad.get(i)], newTree);
                            result[toLoad.get(i)] = newTree;
                        } catch ($ex$) {
                            if ($ex$ instanceof Exception) {
                                var e = $ex$;
                                e.printStackTrace();
                            }
                        }
                    }
                    callback.on(result);
                } });
        }
    };

    DefaultKStore.prototype.lookup = function (originView, key, callback) {
        if (callback == null) {
            return;
        }
        this.timeTree(originView.dimension(), key, { on: function (timeTree) {
                var resolvedTime = timeTree.resolve(originView.now());
                if (resolvedTime == null) {
                    callback.on(null);
                } else {
                    var resolved = this.cacheLookup(originView.dimension(), resolvedTime, key);
                    if (resolved != null) {
                        if (originView.now() == resolvedTime) {
                            callback.on(resolved);
                        } else {
                            var proxy = originView.createProxy(resolved.metaClass(), resolved.timeTree(), key);
                            callback.on(proxy);
                        }
                    } else {
                        var keys = new Array();
                        keys[0] = key;
                        this.loadObjectInCache(originView, keys, { on: function (dbResolved) {
                                if (dbResolved.size() == 0) {
                                    callback.on(null);
                                } else {
                                    var dbResolvedZero = dbResolved.get(0);
                                    if (resolvedTime != originView.now()) {
                                        var proxy = originView.createProxy(dbResolvedZero.metaClass(), dbResolvedZero.timeTree(), key);
                                        callback.on(proxy);
                                    } else {
                                        callback.on(dbResolvedZero);
                                    }
                                }
                            } });
                    }
                }
            } });
    };

    DefaultKStore.prototype.loadObjectInCache = function (originView, keys, callback) {
        this.timeTrees(originView.dimension(), keys, { on: function (timeTrees) {
                var objStringKeys = new Array();
                var resolved = new Array();
                for (var i = 0; i < keys.length; i++) {
                    var resolvedTime = timeTrees[i].resolve(originView.now());
                    resolved[i] = resolvedTime;
                    objStringKeys[i] = this.keyPayload(originView.dimension(), resolvedTime, keys[i]);
                }
                this._db.get(objStringKeys, { on: function (objectPayloads, error) {
                        if (error != null) {
                            callback.on(null);
                        } else {
                            var additionalLoad = new JUArrayList();
                            var objs = new JUArrayList();
                            for (var i = 0; i < objectPayloads.length; i++) {
                                var obj = JSONModelLoader.load(objectPayloads[i], originView.dimension().time(resolved[i]), null);
                                objs.add(obj);
                                var strategies = new JUHashSet();
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
                                            if (this.cacheLookup(originView.dimension(), additionalTimes[j], obj.uuid()) == null) {
                                                var payload = [this.keyPayload(originView.dimension(), additionalTimes[j], obj.uuid()), additionalTimes[j]];
                                                additionalLoad.add(payload);
                                            }
                                        }
                                    }
                                }
                            }
                            if (additionalLoad.isEmpty()) {
                                callback.on(objs);
                            } else {
                                var addtionalDBKeys = new Array();
                                for (var i = 0; i < additionalLoad.size(); i++) {
                                    addtionalDBKeys[i] = additionalLoad.get(i)[0].toString();
                                }
                                this._db.get(addtionalDBKeys, { on: function (additionalPayloads, error) {
                                        for (var i = 0; i < objectPayloads.length; i++) {
                                            JSONModelLoader.load(additionalPayloads[i], originView.dimension().time(additionalLoad.get(i)[1]), null);
                                        }
                                        callback.on(objs);
                                    } });
                            }
                        }
                    } });
            } });
    };

    DefaultKStore.prototype.lookupAll = function (originView, keys, callback) {
        var toLoad = new JUArrayList();
        for (var i = 0; i < keys.length; i++) {
            toLoad.add(keys[i]);
        }
        var resolveds = new JUArrayList();
        for (var i = 0; i < keys.length; i++) {
            var kid = keys[i];
            var resolved = this.cacheLookup(originView.dimension(), originView.now(), kid);
            if (resolved != null) {
                resolveds.add(resolved);
                toLoad.remove(kid);
            }
        }
        if (toLoad.size() == 0) {
            var proxies = new JUArrayList();
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
            callback.on(proxies.toArray(new Array()));
        } else {
            var toLoadKeys = new Array();
            for (var i = 0; i < toLoad.size(); i++) {
                toLoadKeys[i] = toLoad.get(i);
            }
            this.loadObjectInCache(originView, toLoadKeys, { on: function (additional) {
                    resolveds.addAll(additional);
                    var proxies = new JUArrayList();
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
                    callback.on(proxies.toArray(new Array()));
                } });
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
        var dimensionCache = this.caches.get(originView.dimension().key());
        var resolvedRoot = dimensionCache.rootTimeTree.resolve(originView.now());
        if (resolvedRoot == null) {
            callback.on(null);
        } else {
            var timeCache = dimensionCache.timesCaches.get(resolvedRoot);
            if (timeCache.root != null) {
                callback.on(timeCache.root);
            } else {
                var rootKeys = new Array();
                rootKeys[0] = this.keyRoot(dimensionCache.dimension, resolvedRoot);
                this._db.get(rootKeys, { on: function (res, error) {
                        if (error != null) {
                            callback.on(null);
                        } else {
                            try  {
                                var idRoot = Long.parseLong(res[0]);
                                this.lookup(originView, idRoot, { on: function (resolved) {
                                        timeCache.root = resolved;
                                        timeCache.rootDirty = false;
                                        callback.on(resolved);
                                    } });
                            } catch ($ex$) {
                                if ($ex$ instanceof Exception) {
                                    var e = $ex$;
                                    e.printStackTrace();
                                    callback.on(null);
                                }
                            }
                        }
                    } });
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
        if (origin instanceof AbstractKObject) {
            var dimensionCache = this.caches.get(origin.key());
            var timeCache = dimensionCache.timesCaches.get(origin.now());
            var obj_listeners = timeCache.obj_listeners.get(origin.uuid());
            if (obj_listeners == null) {
                obj_listeners = new JUArrayList();
                timeCache.obj_listeners.put(origin.uuid(), obj_listeners);
            }
            obj_listeners.add(listener);
        } else {
            if (origin instanceof AbstractKView) {
                var dimensionCache = this.caches.get(origin.key());
                var timeCache = dimensionCache.timesCaches.get(origin.now());
                timeCache.listeners.add(listener);
            } else {
                if (origin instanceof AbstractKDimension) {
                    var dimensionCache = this.caches.get(origin.key());
                    dimensionCache.listeners.add(listener);
                } else {
                    if (origin instanceof AbstractKUniverse) {
                        this.universeListeners.add(listener);
                    }
                }
            }
        }
    };

    DefaultKStore.prototype.notify = function (event) {
        var dimensionCache = this.caches.get(event.src().dimension().key());
        var timeCache = dimensionCache.timesCaches.get(event.src().now());
        var obj_listeners = timeCache.obj_listeners.get(event.src().uuid());
        if (obj_listeners != null) {
            for (var i = 0; i < obj_listeners.size(); i++) {
                obj_listeners.get(i).on(event);
            }
        }
        for (var i = 0; i < timeCache.listeners.size(); i++) {
            timeCache.listeners.get(i).on(event);
        }
        for (var i = 0; i < dimensionCache.listeners.size(); i++) {
            dimensionCache.listeners.get(i).on(event);
        }
        for (var i = 0; i < this.universeListeners.size(); i++) {
            this.universeListeners.get(i).on(event);
        }
    };
    DefaultKStore.KEY_SEP = ',';
    return DefaultKStore;
})();
///<reference path="../Callback.ts"/>
///<reference path="../ThrowableCallback.ts"/>
///<reference path="../Callback.ts"/>
///<reference path="../KDimension.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KUniverse.ts"/>
///<reference path="../data/DefaultKStore.ts"/>
///<reference path="../data/KDataBase.ts"/>
///<reference path="../data/KStore.ts"/>
///<reference path="../ModelListener.ts"/>
var AbstractKUniverse = (function () {
    function AbstractKUniverse(kDataBase) {
        this._storage = null;
        this._storage = new DefaultKStore(kDataBase);
    }
    AbstractKUniverse.prototype.storage = function () {
        return this._storage;
    };

    AbstractKUniverse.prototype.newDimension = function (callback) {
        var nextKey = this._storage.nextDimensionKey();
        var newDimension = this.internal_create(nextKey);
        this.storage().initDimension(newDimension, { on: function (throwable) {
                callback.on(newDimension);
            } });
    };

    AbstractKUniverse.prototype.internal_create = function (key) {
        throw "Abstract method";
    };

    AbstractKUniverse.prototype.dimension = function (key, callback) {
        var existingDimension = this._storage.getDimension(key);
        if (existingDimension != null) {
            callback.on(existingDimension);
        } else {
            var newDimension = this.internal_create(key);
            this.storage().initDimension(newDimension, { on: function (throwable) {
                    callback.on(newDimension);
                } });
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
    return AbstractKUniverse;
})();
///<reference path="../Callback.ts"/>
///<reference path="../ThrowableCallback.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>
var MemoryKDataBase = (function () {
    function MemoryKDataBase() {
        this.backend = new JUHashMap();
    }
    MemoryKDataBase.prototype.put = function (payloads, callback) {
        for (var i = 0; i < payloads.length; i++) {
            this.backend.put(payloads[i][0], payloads[i][1]);
        }
        callback.on(null);
    };

    MemoryKDataBase.prototype.get = function (keys, callback) {
        var values = new Array();
        for (var i = 0; i < keys.length; i++) {
            values[i] = this.backend.get(keys[i]);
        }
        callback.on(values, null);
    };

    MemoryKDataBase.prototype.remove = function (keys, callback) {
        for (var i = 0; i < keys.length; i++) {
            this.backend.remove(keys[i]);
        }
        callback.on(null);
    };

    MemoryKDataBase.prototype.commit = function (callback) {
    };

    MemoryKDataBase.prototype.close = function (callback) {
        this.backend.clear();
    };
    return MemoryKDataBase;
})();
var AdjLinearSolverQr = (function () {
    function AdjLinearSolverQr() {
        this.numRows = 0;
        this.numCols = 0;
        this.decomposer = null;
        this.maxRows = -1;
        this.maxCols = -1;
        this.Q = null;
        this.R = null;
        this.Y = null;
        this.Z = null;
        this.decomposer = new QRDecompositionHouseholderColumn_D64();
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
            DenseMatrix64F.multTransA(this.Q, this.Y, this.Z);
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
        this.Q = new DenseMatrix64F(maxRows, maxRows);
        this.R = new DenseMatrix64F(maxRows, maxCols);
        this.Y = new DenseMatrix64F(maxRows, 1);
        this.Z = new DenseMatrix64F(maxRows, 1);
    };
    return AdjLinearSolverQr;
})();
///<reference path="../../../../../../java/util/Arrays.ts"/>
var DenseMatrix64F = (function () {
    function DenseMatrix64F(numRows, numCols) {
        this.numRows = 0;
        this.numCols = 0;
        this.data = null;
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
            DenseMatrix64F.fill(C, 0);
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
            DenseMatrix64F.fill(c, 0);
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
            if (a.numCols >= DenseMatrix64F.MULT_COLUMN_SWITCH) {
                DenseMatrix64F.multTransA_reorderMV(a, b, c);
            } else {
                DenseMatrix64F.multTransA_smallMV(a, b, c);
            }
        } else {
            if (a.numCols >= DenseMatrix64F.MULT_COLUMN_SWITCH || b.numCols >= DenseMatrix64F.MULT_COLUMN_SWITCH) {
                DenseMatrix64F.multTransA_reorderMM(a, b, c);
            } else {
                DenseMatrix64F.multTransA_smallMM(a, b, c);
            }
        }
    };

    DenseMatrix64F.setIdentity = function (mat) {
        var width = mat.numRows < mat.numCols ? mat.numRows : mat.numCols;
        Arrays.fill(mat.data, 0, mat.getNumElements(), 0);
        var index = 0;
        for (var i = 0; i < width; i++) {
            mat.data[index] = 1;
            index += mat.numCols + 1;
        }
    };

    DenseMatrix64F.widentity = function (width) {
        var ret = new DenseMatrix64F(width, width);
        for (var i = 0; i < width; i++) {
            ret.cset(i, i, 1.0);
        }
        return ret;
    };

    DenseMatrix64F.identity = function (numRows, numCols) {
        var ret = new DenseMatrix64F(numRows, numCols);
        var small = numRows < numCols ? numRows : numCols;
        for (var i = 0; i < small; i++) {
            ret.cset(i, i, 1.0);
        }
        return ret;
    };

    DenseMatrix64F.fill = function (a, value) {
        Arrays.fill(a.data, 0, a.getNumElements(), value);
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
var QRDecompositionHouseholderColumn_D64 = (function () {
    function QRDecompositionHouseholderColumn_D64() {
        this.dataQR = null;
        this.v = null;
        this.numCols = 0;
        this.numRows = 0;
        this.minLength = 0;
        this.gammas = null;
        this.gamma = 0;
        this.tau = 0;
        this.error = null;
    }
    QRDecompositionHouseholderColumn_D64.prototype.setExpectedMaxSize = function (numRows, numCols) {
        this.numCols = numCols;
        this.numRows = numRows;
        this.minLength = Math.min(numCols, numRows);
        var maxLength = Math.max(numCols, numRows);
        if (this.dataQR == null || this.dataQR.length < numCols || this.dataQR[0].length < numRows) {
            this.dataQR = new Array(new Array());
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
                Q = DenseMatrix64F.identity(this.numRows, this.minLength);
            } else {
                DenseMatrix64F.setIdentity(Q);
            }
        } else {
            if (Q == null) {
                Q = DenseMatrix64F.widentity(this.numRows);
            } else {
                DenseMatrix64F.setIdentity(Q);
            }
        }
        for (var j = this.minLength - 1; j >= 0; j--) {
            var u = this.dataQR[j];
            var vv = u[j];
            u[j] = 1;
            QRDecompositionHouseholderColumn_D64.rank1UpdateMultR(Q, u, this.gammas[j], j, j, this.numRows, this.v);
            u[j] = vv;
        }
        return Q;
    };

    QRDecompositionHouseholderColumn_D64.prototype.getR = function (R, compact) {
        if (R == null) {
            if (compact) {
                R = new DenseMatrix64F(this.minLength, this.numCols);
            } else {
                R = new DenseMatrix64F(this.numRows, this.numCols);
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
        var max = QRDecompositionHouseholderColumn_D64.findMax(u, j, this.numRows - j);
        if (max == 0.0) {
            this.gamma = 0;
            this.error = true;
        } else {
            this.tau = QRDecompositionHouseholderColumn_D64.computeTauAndDivide(j, this.numRows, u, max);
            var u_0 = u[j] + this.tau;
            QRDecompositionHouseholderColumn_D64.divideElements(j + 1, this.numRows, u, u_0);
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
///<reference path="../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../java/util/JUMap.ts"/>
var KQuery = (function () {
    function KQuery(relationName, params, subQuery, oldString, previousIsDeep, previousIsRefDeep) {
        this.relationName = null;
        this.params = null;
        this.subQuery = null;
        this.oldString = null;
        this.previousIsDeep = null;
        this.previousIsRefDeep = null;
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
            var params = new JUHashMap();
            return new KQuery("", params, subQuery, "" + KQuery.QUERY_SEP, false, false);
        }
        if (query.startsWith("**/")) {
            if (query.length > 3) {
                var next = KQuery.extractFirstQuery(query.substring(3));
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
                var next = KQuery.extractFirstQuery(query.substring(4));
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
            var params = new JUHashMap();
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
                                pObject = new KQueryParam(paramKey.replace("!", ""), pArray[1].trim(), negative);
                                params.put(pObject.name(), pObject);
                            } else {
                                pObject = new KQueryParam(null, p, false);
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
                        pObject = new KQueryParam(paramKey.replace("!", ""), pArray[1].trim(), negative);
                        params.put(pObject.name(), pObject);
                    } else {
                        pObject = new KQueryParam(null, lastParam, false);
                        params.put("@id", pObject);
                    }
                }
            }
            return new KQuery(relName, params, subQuery, oldString, false, false);
        }
        return null;
    };
    KQuery.OPEN_BRACKET = '[';
    KQuery.CLOSE_BRACKET = ']';
    KQuery.QUERY_SEP = '/';
    return KQuery;
})();
var KQueryParam = (function () {
    function KQueryParam(p_name, p_value, p_negative) {
        this._name = null;
        this._value = null;
        this._negative = null;
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
var Color = (function () {
    function Color() {
    }
    Color.prototype.equals = function (other) {
        return this == other;
    };
    Color.RED = new Color();
    Color.BLACK = new Color();
    return Color;
})();
var ReaderContext = (function () {
    function ReaderContext(offset, payload) {
        this.payload = null;
        this.offset = 0;
        this.offset = offset;
        this.payload = payload;
    }
    ReaderContext.prototype.unserialize = function (rightBranch) {
        if (this.offset >= this.payload.length) {
            return null;
        }
        var tokenBuild = new StringBuilder();
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
            throw new Exception("Error while loading BTree");
        }
        this.offset = this.offset + 1;
        ch = this.payload.charAt(this.offset);
        var color = Color.BLACK;
        var state = State.EXISTS;
        switch (ch) {
            case TreeNode.BLACK_DELETE:
                color = Color.BLACK;
                state = State.DELETED;
                break;
            case TreeNode.BLACK_EXISTS:
                color = Color.BLACK;
                state = State.EXISTS;
                break;
            case TreeNode.RED_DELETE:
                color = Color.RED;
                state = State.DELETED;
                break;
            case TreeNode.RED_EXISTS:
                color = Color.RED;
                state = State.EXISTS;
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
        var p = new TreeNode(Long.parseLong(tokenBuild.toString()), state, color, null, null);
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
///<reference path="../Callback.ts"/>
///<reference path="../KActionType.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../meta/Meta.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../meta/MetaClass.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../util/CallBackChain.ts"/>
///<reference path="../util/Helper.ts"/>
var ModelTraceApplicator = (function () {
    function ModelTraceApplicator(targetModel) {
        this.targetModel = null;
        this.pendingObj = null;
        this.pendingParent = null;
        this.pendingParentRef = null;
        this.pendingObjKID = null;
        this.targetModel = targetModel;
    }
    ModelTraceApplicator.prototype.tryClosePending = function (srcKID) {
        if (this.pendingObj != null && !(this.pendingObjKID.equals(srcKID))) {
            this.pendingParent.mutate(KActionType.ADD, this.pendingParentRef, this.pendingObj, true);
            this.pendingObj = null;
            this.pendingObjKID = null;
            this.pendingParentRef = null;
            this.pendingParent = null;
        }
    };

    ModelTraceApplicator.prototype.createOrAdd = function (previousPath, target, reference, metaClass, callback) {
        if (previousPath != null) {
            this.targetModel.view().lookup(previousPath, { on: function (targetElem) {
                    if (targetElem != null) {
                        target.mutate(KActionType.ADD, reference, targetElem, true);
                        callback.on(null);
                    } else {
                        if (metaClass == null) {
                            callback.on(new Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
                        } else {
                            this.pendingObj = this.targetModel.view().createFQN(metaClass.metaName());
                            this.pendingObjKID = previousPath;
                            this.pendingParentRef = reference;
                            this.pendingParent = target;
                            callback.on(null);
                        }
                    }
                } });
        } else {
            if (metaClass == null) {
                callback.on(new Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
            } else {
                this.pendingObj = this.targetModel.view().createFQN(metaClass.metaName());
                this.pendingObjKID = previousPath;
                this.pendingParentRef = reference;
                this.pendingParent = target;
                callback.on(null);
            }
        }
    };

    ModelTraceApplicator.prototype.applyTraceSequence = function (traceSeq, callback) {
        Helper.forall(traceSeq.traces(), { on: function (modelTrace, next) {
                this.applyTrace(modelTrace, next);
            } }, { on: function (throwable) {
                if (throwable != null) {
                    callback.on(throwable);
                } else {
                    this.tryClosePending(null);
                    callback.on(null);
                }
            } });
    };

    ModelTraceApplicator.prototype.applyTrace = function (trace, callback) {
        if (trace instanceof ModelAddTrace) {
            var addTrace = trace;
            this.tryClosePending(null);
            this.targetModel.view().lookup(trace.getSrcKID(), { on: function (resolvedTarget) {
                    if (resolvedTarget == null) {
                        callback.on(new Exception("Add Trace source not found for path : " + trace.getSrcKID() + " pending " + this.pendingObjKID + "\n" + trace.toString()));
                    } else {
                        this.createOrAdd(addTrace.getPreviousKID(), resolvedTarget, trace.getMeta(), addTrace.getMetaClass(), callback);
                    }
                } });
        } else {
            if (trace instanceof ModelRemoveTrace) {
                var removeTrace = trace;
                this.tryClosePending(trace.getSrcKID());
                this.targetModel.view().lookup(trace.getSrcKID(), { on: function (targetElem) {
                        if (targetElem != null) {
                            this.targetModel.view().lookup(removeTrace.getObjKID(), { on: function (remoteObj) {
                                    targetElem.mutate(KActionType.REMOVE, trace.getMeta(), remoteObj, true);
                                    callback.on(null);
                                } });
                        } else {
                            callback.on(null);
                        }
                    } });
            } else {
                if (trace instanceof ModelSetTrace) {
                    var setTrace = trace;
                    this.tryClosePending(trace.getSrcKID());
                    if (!trace.getSrcKID().equals(this.pendingObjKID)) {
                        this.targetModel.view().lookup(trace.getSrcKID(), { on: function (tempObject) {
                                if (tempObject == null) {
                                    callback.on(new Exception("Set Trace source not found for path : " + trace.getSrcKID() + " pending " + this.pendingObjKID + "\n" + trace.toString()));
                                } else {
                                    tempObject.set(setTrace.getMeta(), setTrace.getContent());
                                    callback.on(null);
                                }
                            } });
                    } else {
                        if (this.pendingObj == null) {
                            callback.on(new Exception("Set Trace source not found for path : " + trace.getSrcKID() + " pending " + this.pendingObjKID + "\n" + trace.toString()));
                        } else {
                            this.pendingObj.set(setTrace.getMeta(), setTrace.getContent());
                            callback.on(null);
                        }
                    }
                } else {
                    callback.on(new Exception("Unknow trace " + trace));
                }
            }
        }
    };
    return ModelTraceApplicator;
})();
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
    return ModelTraceConstants;
})();
///<reference path="../ModelAttributeVisitor.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
var AttributesVisitor = (function () {
    function AttributesVisitor(context) {
        this.context = null;
        this.context = context;
    }
    AttributesVisitor.prototype.visit = function (metaAttribute, value) {
        if (value != null) {
            if (this.context.ignoreGeneratedID && metaAttribute.metaName().equals("generated_KMF_ID")) {
                return;
            }
            this.context.printer.append(" " + metaAttribute.metaName() + "=\"");
            XMIModelSerializer.escapeXml(this.context.printer, value.toString());
            this.context.printer.append("\"");
        }
    };
    return AttributesVisitor;
})();
///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../util/CallBackChain.ts"/>
///<reference path="../util/Helper.ts"/>
var ContainedReferencesCallbackChain = (function () {
    function ContainedReferencesCallbackChain(context, currentElement) {
        this.context = null;
        this.currentElement = null;
        this.context = context;
        this.currentElement = currentElement;
    }
    ContainedReferencesCallbackChain.prototype.on = function (ref, nextReference) {
        if (ref.contained()) {
            this.currentElement.each(ref, { on: function (o) {
                    var elem = o;
                    this.context.printer.append("<");
                    this.context.printer.append(ref.metaName());
                    this.context.printer.append(" xsi:type=\"" + XMIModelSerializer.formatMetaClassName(elem.metaClass().metaName()) + "\"");
                    elem.visitAttributes(this.context.attributesVisitor);
                    Helper.forall(elem.metaReferences(), new NonContainedReferencesCallbackChain(this.context, elem), { on: function (err) {
                            if (err == null) {
                                this.context.printer.append(">\n");
                                Helper.forall(elem.metaReferences(), new ContainedReferencesCallbackChain(this.context, elem), { on: function (containedRefsEnd) {
                                        if (containedRefsEnd == null) {
                                            this.context.printer.append("</");
                                            this.context.printer.append(ref.metaName());
                                            this.context.printer.append('>');
                                            this.context.printer.append("\n");
                                        }
                                    } });
                            } else {
                                this.context.finishCallback.on(null, err);
                            }
                        } });
                } }, { on: function (throwable) {
                    nextReference.on(null);
                } });
        } else {
            nextReference.on(null);
        }
    };
    return ContainedReferencesCallbackChain;
})();
///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../util/CallBackChain.ts"/>
var NonContainedReferencesCallbackChain = (function () {
    function NonContainedReferencesCallbackChain(p_context, p_currentElement) {
        this._context = null;
        this._currentElement = null;
        this._context = p_context;
        this._currentElement = p_currentElement;
    }
    NonContainedReferencesCallbackChain.prototype.on = function (ref, next) {
        if (!ref.contained()) {
            var value = new Array();
            value[0] = "";
            this._currentElement.each(ref, { on: function (o) {
                    var adjustedAddress = this._context.addressTable.get(o.uuid());
                    value[0] = (value[0].equals("") ? adjustedAddress : value[0] + " " + adjustedAddress);
                } }, { on: function (end) {
                    if (end == null) {
                        if (value[0] != null) {
                            this._context.printer.append(" " + ref.metaName() + "=\"" + value[0] + "\"");
                        }
                    }
                    next.on(end);
                } });
        } else {
            next.on(null);
        }
    };
    return NonContainedReferencesCallbackChain;
})();
///<reference path="../Callback.ts"/>
///<reference path="../util/Helper.ts"/>
var PrettyPrinter = (function () {
    function PrettyPrinter(context) {
        this.context = null;
        this.context = context;
    }
    PrettyPrinter.prototype.on = function (throwable) {
        if (throwable != null) {
            this.context.finishCallback.on(null, throwable);
        } else {
            this.context.printer.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
            this.context.printer.append("<" + XMIModelSerializer.formatMetaClassName(this.context.model.metaClass().metaName()).replace(".", "_"));
            this.context.printer.append(" xmlns:xsi=\"http://wwww.w3.org/2001/XMLSchema-instance\"");
            this.context.printer.append(" xmi:version=\"2.0\"");
            this.context.printer.append(" xmlns:xmi=\"http://www.omg.org/XMI\"");
            var index = 0;
            while (index < this.context.packageList.size()) {
                this.context.printer.append(" xmlns:" + this.context.packageList.get(index).replace(".", "_") + "=\"http://" + this.context.packageList.get(index) + "\"");
                index++;
            }
            this.context.model.visitAttributes(this.context.attributesVisitor);
            Helper.forall(this.context.model.metaReferences(), new NonContainedReferencesCallbackChain(this.context, this.context.model), { on: function (err) {
                    if (err == null) {
                        this.context.printer.append(">\n");
                        Helper.forall(this.context.model.metaReferences(), new ContainedReferencesCallbackChain(this.context, this.context.model), { on: function (containedRefsEnd) {
                                if (containedRefsEnd == null) {
                                    this.context.printer.append("</" + XMIModelSerializer.formatMetaClassName(this.context.model.metaClass().metaName()).replace(".", "_") + ">\n");
                                    this.context.finishCallback.on(this.context.printer.toString(), null);
                                } else {
                                    this.context.finishCallback.on(null, containedRefsEnd);
                                }
                            } });
                    } else {
                        this.context.finishCallback.on(null, err);
                    }
                } });
        }
    };
    return PrettyPrinter;
})();
///<reference path="../KObject.ts"/>
///<reference path="../ThrowableCallback.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>
var SerializationContext = (function () {
    function SerializationContext() {
        this.ignoreGeneratedID = false;
        this.model = null;
        this.finishCallback = null;
        this.printer = null;
        this.attributesVisitor = null;
        this.addressTable = new JUHashMap();
        this.elementsCount = new JUHashMap();
        this.packageList = new JUArrayList();
    }
    return SerializationContext;
})();
///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>
var XMILoadingContext = (function () {
    function XMILoadingContext() {
        this.xmiReader = null;
        this.loadedRoots = null;
        this.resolvers = new JUArrayList();
        this.map = new JUHashMap();
        this.elementsCount = new JUHashMap();
        this.stats = new JUHashMap();
        this.oppositesAlreadySet = new JUHashMap();
        this.successCallback = null;
    }
    XMILoadingContext.prototype.isOppositeAlreadySet = function (localRef, oppositeRef) {
        return (this.oppositesAlreadySet.get(oppositeRef + "_" + localRef) != null || (this.oppositesAlreadySet.get(localRef + "_" + oppositeRef) != null));
    };

    XMILoadingContext.prototype.storeOppositeRelation = function (localRef, oppositeRef) {
        this.oppositesAlreadySet.put(localRef + "_" + oppositeRef, true);
    };
    return XMILoadingContext;
})();
///<reference path="../KObject.ts"/>
///<reference path="../KActionType.ts"/>
var XMIResolveCommand = (function () {
    function XMIResolveCommand(context, target, mutatorType, refName, ref) {
        this.context = null;
        this.target = null;
        this.mutatorType = null;
        this.refName = null;
        this.ref = null;
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
        throw new Exception("KMF Load error : reference " + this.ref + " not found in map when trying to  " + this.mutatorType + " " + this.refName + "  on " + this.target.metaClass().metaName() + "(uuid:" + this.target.uuid() + ")");
    };
    return XMIResolveCommand;
})();
///<reference path="../../../../../java/util/JUArrayList.ts"/>
var XmlParser = (function () {
    function XmlParser(str) {
        this.payload = null;
        this.current = 0;
        this.currentChar = null;
        this.tagName = null;
        this.tagPrefix = null;
        this.attributePrefix = null;
        this.readSingleton = false;
        this.attributesNames = new JUArrayList();
        this.attributesPrefixes = new JUArrayList();
        this.attributesValues = new JUArrayList();
        this.attributeName = new StringBuilder();
        this.attributeValue = new StringBuilder();
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
            return XmlToken.END_TAG;
        }
        if (!this.hasNext()) {
            return XmlToken.END_DOCUMENT;
        }
        this.attributesNames.clear();
        this.attributesPrefixes.clear();
        this.attributesValues.clear();
        this.read_lessThan();
        this.currentChar = this.readChar();
        if (this.currentChar == '?') {
            this.currentChar = this.readChar();
            this.read_xmlHeader();
            return XmlToken.XML_HEADER;
        } else {
            if (this.currentChar == '!') {
                do {
                    this.currentChar = this.readChar();
                } while(this.currentChar != '>');
                return XmlToken.COMMENT;
            } else {
                if (this.currentChar == '/') {
                    this.currentChar = this.readChar();
                    this.read_closingTag();
                    return XmlToken.END_TAG;
                } else {
                    this.read_openTag();
                    if (this.currentChar == '/') {
                        this.read_upperThan();
                        this.readSingleton = true;
                    }
                    return XmlToken.START_TAG;
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
                    this.attributeName = new StringBuilder();
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
            this.attributeName = new StringBuilder();
            this.attributePrefix = null;
            this.attributeValue = new StringBuilder();
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
var XmlToken = (function () {
    function XmlToken() {
    }
    XmlToken.prototype.equals = function (other) {
        return this == other;
    };
    XmlToken.XML_HEADER = new XmlToken();
    XmlToken.END_DOCUMENT = new XmlToken();
    XmlToken.START_TAG = new XmlToken();
    XmlToken.END_TAG = new XmlToken();
    XmlToken.COMMENT = new XmlToken();
    XmlToken.SINGLETON_TAG = new XmlToken();
    return XmlToken;
})();
