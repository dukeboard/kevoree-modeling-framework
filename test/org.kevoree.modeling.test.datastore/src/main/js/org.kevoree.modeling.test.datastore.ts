module geometry {
    export class GeometryDimension extends org.kevoree.modeling.api.abs.AbstractKDimension<any, any, any> {

        constructor(universe: org.kevoree.modeling.api.KUniverse<any>, key: number) {
            super(universe, key);
        }

        public internal_create(timePoint: number): geometry.GeometryView {
            return new geometry.impl.GeometryViewImpl(timePoint, <org.kevoree.modeling.api.abs.AbstractKDimension<any, any, any>>this);
        }

    }

    export class GeometryUniverse extends org.kevoree.modeling.api.abs.AbstractKUniverse<any> {

        private _metaModel: org.kevoree.modeling.api.meta.MetaModel;
        constructor() {
            super();
            this._metaModel = new org.kevoree.modeling.api.abs.AbstractMetaModel("Geometry", -1);
            var tempMetaClasses: org.kevoree.modeling.api.meta.MetaClass[] = new Array();
            tempMetaClasses[1] = geometry.meta.MetaShape.getInstance();
            tempMetaClasses[0] = geometry.meta.MetaLibrary.getInstance();
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

    export interface Library extends org.kevoree.modeling.api.KObject {

        addShapes(p_obj: geometry.Shape): geometry.Library;

        removeShapes(p_obj: geometry.Shape): geometry.Library;

        eachShapes(p_callback: (p : geometry.Shape[]) => void): void;

        sizeOfShapes(): number;

        view(): geometry.GeometryView;

    }

    export interface Shape extends org.kevoree.modeling.api.KObject {

        getColor(): string;

        setColor(p_obj: string): geometry.Shape;

        getName(): string;

        setName(p_obj: string): geometry.Shape;

        view(): geometry.GeometryView;

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
                return <geometry.Shape>this.create(geometry.meta.MetaShape.getInstance());
            }

            public createLibrary(): geometry.Library {
                return <geometry.Library>this.create(geometry.meta.MetaLibrary.getInstance());
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
                this.mutate(org.kevoree.modeling.api.KActionType.ADD, geometry.meta.MetaLibrary.REF_SHAPES, p_obj);
                return this;
            }

            public removeShapes(p_obj: geometry.Shape): geometry.Library {
                this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, geometry.meta.MetaLibrary.REF_SHAPES, p_obj);
                return this;
            }

            public eachShapes(p_callback: (p : geometry.Shape[]) => void): void {
                this.all(geometry.meta.MetaLibrary.REF_SHAPES,  (kObjects : org.kevoree.modeling.api.KObject[]) => {
                    if (p_callback != null) {
                        var casted: geometry.Shape[] = new Array();
                        for (var i: number = 0; i < kObjects.length; i++) {
                            casted[i] = <geometry.Shape>kObjects[i];
                        }
                        p_callback(casted);
                    }
                });
            }

            public sizeOfShapes(): number {
                return this.size(geometry.meta.MetaLibrary.REF_SHAPES);
            }

            public view(): geometry.GeometryView {
                return <geometry.GeometryView>super.view();
            }

        }

        export class ShapeImpl extends org.kevoree.modeling.api.abs.AbstractKObject implements geometry.Shape {

            constructor(p_factory: geometry.GeometryView, p_uuid: number, p_timeTree: org.kevoree.modeling.api.time.TimeTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
                super(p_factory, p_uuid, p_timeTree, p_metaClass);
            }

            public getColor(): string {
                return <string>this.get(geometry.meta.MetaShape.ATT_COLOR);
            }

            public setColor(p_obj: string): geometry.Shape {
                this.set(geometry.meta.MetaShape.ATT_COLOR, p_obj);
                return this;
            }

            public getName(): string {
                return <string>this.get(geometry.meta.MetaShape.ATT_NAME);
            }

            public setName(p_obj: string): geometry.Shape {
                this.set(geometry.meta.MetaShape.ATT_NAME, p_obj);
                return this;
            }

            public view(): geometry.GeometryView {
                return <geometry.GeometryView>super.view();
            }

        }

    }
    export module meta {
        export class MetaLibrary extends org.kevoree.modeling.api.abs.AbstractMetaClass {

            private static INSTANCE: geometry.meta.MetaLibrary = null;
            public static REF_SHAPES: org.kevoree.modeling.api.meta.MetaReference = new org.kevoree.modeling.api.abs.AbstractMetaReference("shapes", 5, true, false,  () => {
                return geometry.meta.MetaShape.getInstance();
            }, null,  () => {
                return geometry.meta.MetaLibrary.getInstance();
            });
            public static getInstance(): geometry.meta.MetaLibrary {
                if (MetaLibrary.INSTANCE == null) {
                    MetaLibrary.INSTANCE = new geometry.meta.MetaLibrary();
                }
                return MetaLibrary.INSTANCE;
            }

            constructor() {
                super("geometry.Library", 0);
                var temp_attributes: org.kevoree.modeling.api.meta.MetaAttribute[] = new Array();
                var temp_references: org.kevoree.modeling.api.meta.MetaReference[] = new Array();
                temp_references[0] = MetaLibrary.REF_SHAPES;
                var temp_operations: org.kevoree.modeling.api.meta.MetaOperation[] = new Array();
                this.init(temp_attributes, temp_references, temp_operations);
            }

        }

        export class MetaShape extends org.kevoree.modeling.api.abs.AbstractMetaClass {

            private static INSTANCE: geometry.meta.MetaShape = null;
            public static ATT_COLOR: org.kevoree.modeling.api.meta.MetaAttribute = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("color", 5, 0, false, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
            public static ATT_NAME: org.kevoree.modeling.api.meta.MetaAttribute = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 6, 0, true, org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
            public static getInstance(): geometry.meta.MetaShape {
                if (MetaShape.INSTANCE == null) {
                    MetaShape.INSTANCE = new geometry.meta.MetaShape();
                }
                return MetaShape.INSTANCE;
            }

            constructor() {
                super("geometry.Shape", 1);
                var temp_attributes: org.kevoree.modeling.api.meta.MetaAttribute[] = new Array();
                temp_attributes[0] = MetaShape.ATT_COLOR;
                temp_attributes[1] = MetaShape.ATT_NAME;
                var temp_references: org.kevoree.modeling.api.meta.MetaReference[] = new Array();
                var temp_operations: org.kevoree.modeling.api.meta.MetaOperation[] = new Array();
                this.init(temp_attributes, temp_references, temp_operations);
            }

        }

    }
}
