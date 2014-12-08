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
            this.META_GEOMETRY_SHAPE = geometry.meta.MetaShape.build(this._metaModel);
            tempMetaClasses[1] = this.META_GEOMETRY_SHAPE;
            this.META_GEOMETRY_LIBRARY = geometry.meta.MetaLibrary.build(this._metaModel);
            tempMetaClasses[0] = this.META_GEOMETRY_LIBRARY;
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
                return this.create(this.dimension().universe().META_GEOMETRY_SHAPE);
            };
            GeometryViewImpl.prototype.createLibrary = function () {
                return this.create(this.dimension().universe().META_GEOMETRY_LIBRARY);
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
                this.mutate(org.kevoree.modeling.api.KActionType.ADD, this.metaClass().REF_SHAPES, p_obj);
                return this;
            };
            LibraryImpl.prototype.removeShapes = function (p_obj) {
                this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, this.metaClass().REF_SHAPES, p_obj);
                return this;
            };
            LibraryImpl.prototype.eachShapes = function (p_callback, p_end) {
                this.each(this.metaClass().REF_SHAPES, p_callback, p_end);
            };
            LibraryImpl.prototype.sizeOfShapes = function () {
                return this.size(this.metaClass().REF_SHAPES);
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
                return this.get(this.metaClass().ATT_COLOR);
            };
            ShapeImpl.prototype.setColor = function (p_obj) {
                this.set(this.metaClass().ATT_COLOR, p_obj);
                return this;
            };
            ShapeImpl.prototype.getName = function () {
                return this.get(this.metaClass().ATT_NAME);
            };
            ShapeImpl.prototype.setName = function (p_obj) {
                this.set(this.metaClass().ATT_NAME, p_obj);
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
            function MetaLibrary(p_origin) {
                _super.call(this, "geometry.Library", 0, p_origin);
                var temp_attributes = new Array();
                var temp_references = new Array();
                this.REF_SHAPES = new org.kevoree.modeling.api.abs.AbstractMetaReference("shapes", 5, true, false, 1, null, null, this);
                temp_references[0] = this.REF_SHAPES;
                var temp_operations = new Array();
                this.init(temp_attributes, temp_references, temp_operations);
            }
            MetaLibrary.build = function (p_origin) {
                return new geometry.meta.MetaLibrary(p_origin);
            };
            return MetaLibrary;
        })(org.kevoree.modeling.api.abs.AbstractMetaClass);
        meta.MetaLibrary = MetaLibrary;
        var MetaShape = (function (_super) {
            __extends(MetaShape, _super);
            function MetaShape(p_origin) {
                _super.call(this, "geometry.Shape", 1, p_origin);
                var temp_attributes = new Array();
                this.ATT_COLOR = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("color", 5, 0, false, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance(), this);
                temp_attributes[0] = this.ATT_COLOR;
                this.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 6, 0, true, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance(), this);
                temp_attributes[1] = this.ATT_NAME;
                var temp_references = new Array();
                var temp_operations = new Array();
                this.init(temp_attributes, temp_references, temp_operations);
            }
            MetaShape.build = function (p_origin) {
                return new geometry.meta.MetaShape(p_origin);
            };
            return MetaShape;
        })(org.kevoree.modeling.api.abs.AbstractMetaClass);
        meta.MetaShape = MetaShape;
    })(meta = geometry.meta || (geometry.meta = {}));
})(geometry || (geometry = {}));
