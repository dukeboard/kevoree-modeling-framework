
interface String {
    equals : (other:String) => boolean;
    startsWith : (other:String) => boolean;
    length : () => number;
}

String.prototype.equals = function (other) {
    return this == other;
};


String.prototype.startsWith = function (other) {
    for(var i = 0; i < other.length; i++) {
        if(other.charAt(i) != this.charAt(i)) {
            return false;
        }
    }
    return true;
};