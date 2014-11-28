var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var geometry;
(function (geometry) {
    var GeometryDimension = (function (_super) {
        __extends(GeometryDimension, _super);
        function GeometryDimension(universe, key) {
            _super.call(this, universe, key);
        }
        GeometryDimension.prototype.internal_create = function (timePoint) {
            return new geometry.impl.GeometryViewImpl(timePoint, this);
        };
        return GeometryDimension;
    })(org.kevoree.modeling.api.abs.AbstractKDimension);
    geometry.GeometryDimension = GeometryDimension;
    var GeometryUniverse = (function (_super) {
        __extends(GeometryUniverse, _super);
        function GeometryUniverse() {
            _super.call(this);
        }
        GeometryUniverse.prototype.internal_create = function (key) {
            return new geometry.GeometryDimension(this, key);
        };
        return GeometryUniverse;
    })(org.kevoree.modeling.api.abs.AbstractKUniverse);
    geometry.GeometryUniverse = GeometryUniverse;
    var GeometryView;
    (function (GeometryView) {
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
                    return geometry.Shape.METAATTRIBUTES.values();
                }
                if (this._index == 1) {
                    return geometry.Library.METAATTRIBUTES.values();
                }
                return new Array();
            };
            METACLASSES.prototype.metaReferences = function () {
                if (this._index == 0) {
                    return geometry.Shape.METAREFERENCES.values();
                }
                if (this._index == 1) {
                    return geometry.Library.METAREFERENCES.values();
                }
                return new Array();
            };
            METACLASSES.prototype.metaOperations = function () {
                if (this._index == 0) {
                    return geometry.Shape.METAOPERATIONS.values();
                }
                if (this._index == 1) {
                    return geometry.Library.METAOPERATIONS.values();
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
            METACLASSES.GEOMETRY_SHAPE = new METACLASSES("geometry.Shape", 0);
            METACLASSES.GEOMETRY_LIBRARY = new METACLASSES("geometry.Library", 1);
            METACLASSES._METACLASSESVALUES = [
                METACLASSES.GEOMETRY_SHAPE,
                METACLASSES.GEOMETRY_LIBRARY
            ];
            return METACLASSES;
        })();
        GeometryView.METACLASSES = METACLASSES;
    })(GeometryView = geometry.GeometryView || (geometry.GeometryView = {}));
    var impl;
    (function (impl) {
        var GeometryViewImpl = (function (_super) {
            __extends(GeometryViewImpl, _super);
            function GeometryViewImpl(p_now, p_dimension) {
                _super.call(this, p_now, p_dimension);
            }
            GeometryViewImpl.prototype.internalCreate = function (p_clazz, p_timeTree, p_key) {
                if (p_clazz == null) {
                    return null;
                }
                switch (p_clazz.index()) {
                    case 0:
                        return new geometry.impl.ShapeImpl(this, p_key, p_timeTree, p_clazz);
                    case 1:
                        return new geometry.impl.LibraryImpl(this, p_key, p_timeTree, p_clazz);
                    default:
                        return null;
                }
            };
            GeometryViewImpl.prototype.metaClasses = function () {
                return geometry.GeometryView.METACLASSES.values();
            };
            GeometryViewImpl.prototype.createShape = function () {
                return this.create(geometry.GeometryView.METACLASSES.GEOMETRY_SHAPE);
            };
            GeometryViewImpl.prototype.createLibrary = function () {
                return this.create(geometry.GeometryView.METACLASSES.GEOMETRY_LIBRARY);
            };
            return GeometryViewImpl;
        })(org.kevoree.modeling.api.abs.AbstractKView);
        impl.GeometryViewImpl = GeometryViewImpl;
        var LibraryImpl = (function (_super) {
            __extends(LibraryImpl, _super);
            function LibraryImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
            }
            LibraryImpl.prototype.metaAttributes = function () {
                return geometry.Library.METAATTRIBUTES.values();
            };
            LibraryImpl.prototype.metaReferences = function () {
                return geometry.Library.METAREFERENCES.values();
            };
            LibraryImpl.prototype.metaOperations = function () {
                return geometry.Library.METAOPERATIONS.values();
            };
            LibraryImpl.prototype.addShapes = function (p_obj) {
                this.mutate(org.kevoree.modeling.api.KActionType.ADD, geometry.Library.METAREFERENCES.SHAPES, p_obj, true);
                return this;
            };
            LibraryImpl.prototype.removeShapes = function (p_obj) {
                this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, geometry.Library.METAREFERENCES.SHAPES, p_obj, true);
                return this;
            };
            LibraryImpl.prototype.eachShapes = function (p_callback, p_end) {
                this.each(geometry.Library.METAREFERENCES.SHAPES, p_callback, p_end);
            };
            LibraryImpl.prototype.sizeOfShapes = function () {
                return this.size(geometry.Library.METAREFERENCES.SHAPES);
            };
            return LibraryImpl;
        })(org.kevoree.modeling.api.abs.AbstractKObject);
        impl.LibraryImpl = LibraryImpl;
        var ShapeImpl = (function (_super) {
            __extends(ShapeImpl, _super);
            function ShapeImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
            }
            ShapeImpl.prototype.metaAttributes = function () {
                return geometry.Shape.METAATTRIBUTES.values();
            };
            ShapeImpl.prototype.metaReferences = function () {
                return geometry.Shape.METAREFERENCES.values();
            };
            ShapeImpl.prototype.metaOperations = function () {
                return geometry.Shape.METAOPERATIONS.values();
            };
            ShapeImpl.prototype.getColor = function () {
                return this.get(geometry.Shape.METAATTRIBUTES.COLOR);
            };
            ShapeImpl.prototype.setColor = function (p_obj) {
                this.set(geometry.Shape.METAATTRIBUTES.COLOR, p_obj);
                return this;
            };
            ShapeImpl.prototype.getName = function () {
                return this.get(geometry.Shape.METAATTRIBUTES.NAME);
            };
            ShapeImpl.prototype.setName = function (p_obj) {
                this.set(geometry.Shape.METAATTRIBUTES.NAME, p_obj);
                return this;
            };
            return ShapeImpl;
        })(org.kevoree.modeling.api.abs.AbstractKObject);
        impl.ShapeImpl = ShapeImpl;
    })(impl = geometry.impl || (geometry.impl = {}));
    var Library;
    (function (Library) {
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
                return geometry.GeometryView.METACLASSES.GEOMETRY_LIBRARY;
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
            METAATTRIBUTES._METAATTRIBUTESVALUES = [
            ];
            return METAATTRIBUTES;
        })();
        Library.METAATTRIBUTES = METAATTRIBUTES;
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
                return geometry.GeometryView.METACLASSES.GEOMETRY_LIBRARY;
            };
            METAREFERENCES.prototype.equals = function (other) {
                return this == other;
            };
            METAREFERENCES.values = function () {
                return METAREFERENCES._METAREFERENCESVALUES;
            };
            METAREFERENCES.SHAPES = new METAREFERENCES("shapes", 5, true, false, geometry.GeometryView.METACLASSES.GEOMETRY_SHAPE);
            METAREFERENCES._METAREFERENCESVALUES = [
                METAREFERENCES.SHAPES
            ];
            return METAREFERENCES;
        })();
        Library.METAREFERENCES = METAREFERENCES;
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
                return geometry.GeometryView.METACLASSES.GEOMETRY_LIBRARY;
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
        Library.METAOPERATIONS = METAOPERATIONS;
    })(Library = geometry.Library || (geometry.Library = {}));
    var Shape;
    (function (Shape) {
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
                return geometry.GeometryView.METACLASSES.GEOMETRY_SHAPE;
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
            METAATTRIBUTES.COLOR = new METAATTRIBUTES("color", 5, 0, false, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
            METAATTRIBUTES.NAME = new METAATTRIBUTES("name", 6, 0, true, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
            METAATTRIBUTES._METAATTRIBUTESVALUES = [
                METAATTRIBUTES.COLOR,
                METAATTRIBUTES.NAME
            ];
            return METAATTRIBUTES;
        })();
        Shape.METAATTRIBUTES = METAATTRIBUTES;
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
                return geometry.GeometryView.METACLASSES.GEOMETRY_SHAPE;
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
        Shape.METAREFERENCES = METAREFERENCES;
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
                return geometry.GeometryView.METACLASSES.GEOMETRY_SHAPE;
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
        Shape.METAOPERATIONS = METAOPERATIONS;
    })(Shape = geometry.Shape || (geometry.Shape = {}));
})(geometry || (geometry = {}));
