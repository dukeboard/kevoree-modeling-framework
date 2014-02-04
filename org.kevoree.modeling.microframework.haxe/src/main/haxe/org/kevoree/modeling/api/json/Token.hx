package org.kevoree.modeling.api.json;

@:keep
class Token {

    var tokenType:Type;
    var value:Dynamic;

    public function new( tokenType: Type, value: Dynamic) {
        this.tokenType = tokenType;
        this.value = value;
    }

    function toString():String{
        var v:String = "";
        if (value != null) {
            v = " (" + value + ")";
        }
        var result = Std.string(tokenType) + v;
        return result;
    }
}