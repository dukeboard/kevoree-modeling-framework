interface Number {
    equals : (other:Number) => boolean;
}

Number.prototype.equals = function (other) {
    return this == other;
};