module geometry {
    export class GeometryDimension extends org.kevoree.modeling.api.abs.AbstractKDimension<any, any, any> {

        constructor(universe: org.kevoree.modeling.api.KUniverse<any>, key: number) {
            super(universe, key);
        }

        public internal_create(timePoint: number): geometry.GeometryView {
            return new geometry.impl.GeometryViewImpl(timePoint, this);
        }

    }

    export class GeometryUniverse extends org.kevoree.modeling.api.abs.AbstractKUniverse<any> {

        private _metaModel: org.kevoree.modeling.api.meta.MetaModel;
        public META_GEOMETRY_SHAPE: geometry.meta.MetaShape;
        public META_GEOMETRY_LIBRARY: geometry.meta.MetaLibrary;
        constructor() {
            super();
            this._metaModel = new org.kevoree.modeling.api.abs.AbstractMetaModel("Geometry", -1);
            var tempMetaClasses: org.kevoree.modeling.api.meta.MetaClass[] = new Array();
            this.META_GEOMETRY_SHAPE = geometry.meta.MetaShape.build(this._metaModel);
            tempMetaClasses[1] = this.META_GEOMETRY_SHAPE;
            this.META_GEOMETRY_LIBRARY = geometry.meta.MetaLibrary.build(this._metaModel);
            tempMetaClasses[0] = this.META_GEOMETRY_LIBRARY;
            (<org.kevoree.modeling.api.abs.AbstractMetaModel>this._metaModel).init(tempMetaClasses);
        }

        public internal_create(key: number): geometry.GeometryDimension {
            return new geometry.GeometryDimension(this, key);
        }

        public metaModel(): org.kevoree.modeling.api.meta.MetaModel {
            return this._metaModel;
        }

    }

    export interface GeometryView extends org.kevoree.modeling.api.KView {

        createShape(): geometry.Shape;

        createLibrary(): geometry.Library;

        dimension(): geometry.GeometryDimension;

    }

    export module impl {
        export class GeometryViewImpl extends org.kevoree.modeling.api.abs.AbstractKView implements geometry.GeometryView {

            constructor(p_now: number, p_dimension: org.kevoree.modeling.api.KDimension<any, any, any>) {
                super(p_now, p_dimension);
            }

            public internalCreate(p_clazz: org.kevoree.modeling.api.meta.MetaClass, p_timeTree: org.kevoree.modeling.api.time.TimeTree, p_key: number): org.kevoree.modeling.api.KObject {
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
            }

            public createShape(): geometry.Shape {
                return <geometry.Shape>this.create(this.dimension().universe().META_GEOMETRY_SHAPE);
            }

            public createLibrary(): geometry.Library {
                return <geometry.Library>this.create(this.dimension().universe().META_GEOMETRY_LIBRARY);
            }

            public dimension(): geometry.GeometryDimension {
                return <geometry.GeometryDimension>super.dimension();
            }

        }

        export class LibraryImpl extends org.kevoree.modeling.api.abs.AbstractKObject implements geometry.Library {

            constructor(p_factory: geometry.GeometryView, p_uuid: number, p_timeTree: org.kevoree.modeling.api.time.TimeTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
                super(p_factory, p_uuid, p_timeTree, p_metaClass);
            }

            public addShapes(p_obj: geometry.Shape): geometry.Library {
                this.mutate(org.kevoree.modeling.api.KActionType.ADD, this.metaClass().REF_SHAPES, p_obj);
                return this;
            }

            public removeShapes(p_obj: geometry.Shape): geometry.Library {
                this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, this.metaClass().REF_SHAPES, p_obj);
                return this;
            }

            public eachShapes(p_callback: (p : geometry.Shape) => void, p_end: (p : java.lang.Throwable) => void): void {
                this.each(this.metaClass().REF_SHAPES, p_callback, p_end);
            }

            public sizeOfShapes(): number {
                return this.size(this.metaClass().REF_SHAPES);
            }

            public view(): geometry.GeometryView {
                return <geometry.GeometryView>super.view();
            }

            public metaClass(): geometry.meta.MetaLibrary {
                return <geometry.meta.MetaLibrary>super.metaClass();
            }

        }

        export class ShapeImpl extends org.kevoree.modeling.api.abs.AbstractKObject implements geometry.Shape {

            constructor(p_factory: geometry.GeometryView, p_uuid: number, p_timeTree: org.kevoree.modeling.api.time.TimeTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
                super(p_factory, p_uuid, p_timeTree, p_metaClass);
            }

            public getColor(): string {
                return <string>this.get(this.metaClass().ATT_COLOR);
            }

            public setColor(p_obj: string): geometry.Shape {
                this.set(this.metaClass().ATT_COLOR, p_obj);
                return this;
            }

            public getName(): string {
                return <string>this.get(this.metaClass().ATT_NAME);
            }

            public setName(p_obj: string): geometry.Shape {
                this.set(this.metaClass().ATT_NAME, p_obj);
                return this;
            }

            public view(): geometry.GeometryView {
                return <geometry.GeometryView>super.view();
            }

            public metaClass(): geometry.meta.MetaShape {
                return <geometry.meta.MetaShape>super.metaClass();
            }

        }

    }
    export interface Library extends org.kevoree.modeling.api.KObject {

        addShapes(p_obj: geometry.Shape): geometry.Library;

        removeShapes(p_obj: geometry.Shape): geometry.Library;

        eachShapes(p_callback: (p : geometry.Shape) => void, p_end: (p : java.lang.Throwable) => void): void;

        sizeOfShapes(): number;

        view(): geometry.GeometryView;

        metaClass(): geometry.meta.MetaLibrary;

    }

    export module meta {
        export class MetaLibrary extends org.kevoree.modeling.api.abs.AbstractMetaClass {

            public REF_SHAPES: org.kevoree.modeling.api.meta.MetaReference;
            public static build(p_origin: org.kevoree.modeling.api.meta.MetaModel): geometry.meta.MetaLibrary {
                return new geometry.meta.MetaLibrary(p_origin);
            }

            constructor(p_origin: org.kevoree.modeling.api.meta.MetaModel) {
                super("geometry.Library", 0, p_origin);
                var temp_attributes: org.kevoree.modeling.api.meta.MetaAttribute[] = new Array();
                var temp_references: org.kevoree.modeling.api.meta.MetaReference[] = new Array();
                this.REF_SHAPES = new org.kevoree.modeling.api.abs.AbstractMetaReference("shapes", 5, true, false, 1, null, null, this);
                temp_references[0] = this.REF_SHAPES;
                var temp_operations: org.kevoree.modeling.api.meta.MetaOperation[] = new Array();
                this.init(temp_attributes, temp_references, temp_operations);
            }

        }

        export class MetaShape extends org.kevoree.modeling.api.abs.AbstractMetaClass {

            public ATT_COLOR: org.kevoree.modeling.api.meta.MetaAttribute;
            public ATT_NAME: org.kevoree.modeling.api.meta.MetaAttribute;
            public static build(p_origin: org.kevoree.modeling.api.meta.MetaModel): geometry.meta.MetaShape {
                return new geometry.meta.MetaShape(p_origin);
            }

            constructor(p_origin: org.kevoree.modeling.api.meta.MetaModel) {
                super("geometry.Shape", 1, p_origin);
                var temp_attributes: org.kevoree.modeling.api.meta.MetaAttribute[] = new Array();
                this.ATT_COLOR = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("color", 5, 0, false, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance(), this);
                temp_attributes[0] = this.ATT_COLOR;
                this.ATT_NAME = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 6, 0, true, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance(), this);
                temp_attributes[1] = this.ATT_NAME;
                var temp_references: org.kevoree.modeling.api.meta.MetaReference[] = new Array();
                var temp_operations: org.kevoree.modeling.api.meta.MetaOperation[] = new Array();
                this.init(temp_attributes, temp_references, temp_operations);
            }

        }

    }
    export interface Shape extends org.kevoree.modeling.api.KObject {

        getColor(): string;

        setColor(p_obj: string): geometry.Shape;

        getName(): string;

        setName(p_obj: string): geometry.Shape;

        view(): geometry.GeometryView;

        metaClass(): geometry.meta.MetaShape;

    }

}
