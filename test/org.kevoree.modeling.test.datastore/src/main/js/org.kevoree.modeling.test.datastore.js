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
            this._metaModel = new org.kevoree.modeling.api.abs.AbstractMetaModel("Geometry", -1);
            var tempMetaClasses = new Array();
            tempMetaClasses[1] = geometry.meta.MetaShape.getInstance();
            tempMetaClasses[0] = geometry.meta.MetaLibrary.getInstance();
            this._metaModel.init(tempMetaClasses);
        }
        GeometryUniverse.prototype.internal_create = function (key) {
            return new geometry.GeometryDimension(this, key);
        };
        GeometryUniverse.prototype.metaModel = function () {
            return this._metaModel;
        };
        return GeometryUniverse;
    })(org.kevoree.modeling.api.abs.AbstractKUniverse);
    geometry.GeometryUniverse = GeometryUniverse;
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
                    case 1:
                        return new geometry.impl.ShapeImpl(this, p_key, p_timeTree, p_clazz);
                    case 0:
                        return new geometry.impl.LibraryImpl(this, p_key, p_timeTree, p_clazz);
                    default:
                        return new org.kevoree.modeling.api.abs.DynamicKObject(this, p_key, p_timeTree, p_clazz);
                }
            };
            GeometryViewImpl.prototype.createShape = function () {
                return this.create(geometry.meta.MetaShape.getInstance());
            };
            GeometryViewImpl.prototype.createLibrary = function () {
                return this.create(geometry.meta.MetaLibrary.getInstance());
            };
            GeometryViewImpl.prototype.dimension = function () {
                return _super.prototype.dimension.call(this);
            };
            return GeometryViewImpl;
        })(org.kevoree.modeling.api.abs.AbstractKView);
        impl.GeometryViewImpl = GeometryViewImpl;
        var LibraryImpl = (function (_super) {
            __extends(LibraryImpl, _super);
            function LibraryImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
            }
            LibraryImpl.prototype.addShapes = function (p_obj) {
                this.mutate(org.kevoree.modeling.api.KActionType.ADD, geometry.meta.MetaLibrary.REF_SHAPES, p_obj);
                return this;
            };
            LibraryImpl.prototype.removeShapes = function (p_obj) {
                this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, geometry.meta.MetaLibrary.REF_SHAPES, p_obj);
                return this;
            };
            LibraryImpl.prototype.eachShapes = function (p_callback) {
                this.all(geometry.meta.MetaLibrary.REF_SHAPES, function (kObjects) {
                    if (p_callback != null) {
                        var casted = new Array();
                        for (var i = 0; i < kObjects.length; i++) {
                            casted[i] = kObjects[i];
                        }
                        p_callback(casted);
                    }
                });
            };
            LibraryImpl.prototype.sizeOfShapes = function () {
                return this.size(geometry.meta.MetaLibrary.REF_SHAPES);
            };
            LibraryImpl.prototype.view = function () {
                return _super.prototype.view.call(this);
            };
            return LibraryImpl;
        })(org.kevoree.modeling.api.abs.AbstractKObject);
        impl.LibraryImpl = LibraryImpl;
        var ShapeImpl = (function (_super) {
            __extends(ShapeImpl, _super);
            function ShapeImpl(p_factory, p_uuid, p_timeTree, p_metaClass) {
                _super.call(this, p_factory, p_uuid, p_timeTree, p_metaClass);
            }
            ShapeImpl.prototype.getColor = function () {
                return this.get(geometry.meta.MetaShape.ATT_COLOR);
            };
            ShapeImpl.prototype.setColor = function (p_obj) {
                this.set(geometry.meta.MetaShape.ATT_COLOR, p_obj);
                return this;
            };
            ShapeImpl.prototype.getName = function () {
                return this.get(geometry.meta.MetaShape.ATT_NAME);
            };
            ShapeImpl.prototype.setName = function (p_obj) {
                this.set(geometry.meta.MetaShape.ATT_NAME, p_obj);
                return this;
            };
            ShapeImpl.prototype.view = function () {
                return _super.prototype.view.call(this);
            };
            return ShapeImpl;
        })(org.kevoree.modeling.api.abs.AbstractKObject);
        impl.ShapeImpl = ShapeImpl;
    })(impl = geometry.impl || (geometry.impl = {}));
    var meta;
    (function (meta) {
        var MetaLibrary = (function (_super) {
            __extends(MetaLibrary, _super);
            function MetaLibrary() {
                _super.call(this, "geometry.Library", 0);
                var temp_attributes = new Array();
                var temp_references = new Array();
                temp_references[0] = MetaLibrary.REF_SHAPES;
                var temp_operations = new Array();
                this.init(temp_attributes, temp_references, temp_operations);
            }
            MetaLibrary.getInstance = function () {
                if (MetaLibrary.INSTANCE == null) {
                    MetaLibrary.INSTANCE = new geometry.meta.MetaLibrary();
                }
                return MetaLibrary.INSTANCE;
            };
            MetaLibrary.INSTANCE = null;
            MetaLibrary.REF_SHAPES = new org.kevoree.modeling.api.abs.AbstractMetaReference("shapes", 5, true, false, function () {
                return geometry.meta.MetaShape.getInstance();
            }, null, function () {
                return geometry.meta.MetaLibrary.getInstance();
            });
            return MetaLibrary;
        })(org.kevoree.modeling.api.abs.AbstractMetaClass);
        meta.MetaLibrary = MetaLibrary;
        var MetaShape = (function (_super) {
            __extends(MetaShape, _super);
            function MetaShape() {
                _super.call(this, "geometry.Shape", 1);
                var temp_attributes = new Array();
                temp_attributes[0] = MetaShape.ATT_COLOR;
                temp_attributes[1] = MetaShape.ATT_NAME;
                var temp_references = new Array();
                var temp_operations = new Array();
                this.init(temp_attributes, temp_references, temp_operations);
            }
            MetaShape.getInstance = function () {
                if (MetaShape.INSTANCE == null) {
                    MetaShape.INSTANCE = new geometry.meta.MetaShape();
                }
                return MetaShape.INSTANCE;
            };
            MetaShape.INSTANCE = null;
            MetaShape.ATT_COLOR = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("color", 5, 0, false, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
            MetaShape.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 6, 0, true, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
            return MetaShape;
        })(org.kevoree.modeling.api.abs.AbstractMetaClass);
        meta.MetaShape = MetaShape;
    })(meta = geometry.meta || (geometry.meta = {}));
})(geometry || (geometry = {}));
