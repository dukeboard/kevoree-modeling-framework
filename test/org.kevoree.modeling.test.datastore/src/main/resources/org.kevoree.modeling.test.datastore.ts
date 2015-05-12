module geometry {
    export class GeometryModel extends org.kevoree.modeling.api.abs.AbstractKModel<any> {

        private _metaModel: org.kevoree.modeling.api.meta.MetaModel;
        constructor() {
            super();
            this._metaModel = new org.kevoree.modeling.api.abs.AbstractMetaModel("Geometry", -1);
            var tempMetaClasses: org.kevoree.modeling.api.meta.MetaClass[] = new Array();
            tempMetaClasses[1] = geometry.meta.MetaShape.getInstance();
            tempMetaClasses[0] = geometry.meta.MetaLibrary.getInstance();
            (<org.kevoree.modeling.api.abs.AbstractMetaModel>this._metaModel).init(tempMetaClasses);
        }

        public internalCreateUniverse(key: number): geometry.GeometryUniverse {
            return new geometry.GeometryUniverse(key, this._manager);
        }

        public metaModel(): org.kevoree.modeling.api.meta.MetaModel {
            return this._metaModel;
        }

        public internalCreateObject(universe: number, time: number, uuid: number, p_clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject {
            if (p_clazz == null) {
                return null;
            }
            switch (p_clazz.index()) {
                case 1: 
                return new geometry.impl.ShapeImpl(universe, time, uuid, p_clazz, this._manager);
                case 0: 
                return new geometry.impl.LibraryImpl(universe, time, uuid, p_clazz, this._manager);
                default: 
                return new org.kevoree.modeling.api.reflexive.DynamicKObject(universe, time, uuid, p_clazz, this._manager);
            }
        }

        public createShape(universe: number, time: number): geometry.Shape {
            return <geometry.Shape>this.create(geometry.meta.MetaShape.getInstance(), universe, time);
        }

        public createLibrary(universe: number, time: number): geometry.Library {
            return <geometry.Library>this.create(geometry.meta.MetaLibrary.getInstance(), universe, time);
        }

    }

    export class GeometryUniverse extends org.kevoree.modeling.api.abs.AbstractKUniverse<any, any, any> {

        constructor(p_key: number, p_manager: org.kevoree.modeling.api.data.manager.KDataManager) {
            super(p_key, p_manager);
        }

        public internal_create(timePoint: number): geometry.GeometryView {
            return new geometry.impl.GeometryViewImpl(this._universe, timePoint, this._manager);
        }

    }

    export interface GeometryView extends org.kevoree.modeling.api.KView {

        createShape(): geometry.Shape;

        createLibrary(): geometry.Library;

    }

    export interface Library extends org.kevoree.modeling.api.KObject {

        addShapes(p_obj: geometry.Shape): geometry.Library;

        removeShapes(p_obj: geometry.Shape): geometry.Library;

        getShapes(): org.kevoree.modeling.api.KDefer<any>;

        sizeOfShapes(): number;

        addShape(shapeName: string, result: (p : boolean) => void): void;

    }

    export interface Shape extends org.kevoree.modeling.api.KObject {

        getColor(): string;

        setColor(p_obj: string): geometry.Shape;

        getName(): string;

        setName(p_obj: string): geometry.Shape;

    }

    export module impl {
        export class GeometryViewImpl extends org.kevoree.modeling.api.abs.AbstractKView implements geometry.GeometryView {

            constructor(p_universe: number, _time: number, p_manager: org.kevoree.modeling.api.data.manager.KDataManager) {
                super(p_universe, _time, p_manager);
            }

            public createShape(): geometry.Shape {
                return <geometry.Shape>this.create(geometry.meta.MetaShape.getInstance());
            }

            public createLibrary(): geometry.Library {
                return <geometry.Library>this.create(geometry.meta.MetaLibrary.getInstance());
            }

        }

        export class LibraryImpl extends org.kevoree.modeling.api.abs.AbstractKObject implements geometry.Library {

            constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_manager: org.kevoree.modeling.api.data.manager.KDataManager) {
                super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
            }

            public addShapes(p_obj: geometry.Shape): geometry.Library {
                this.mutate(org.kevoree.modeling.api.KActionType.ADD, geometry.meta.MetaLibrary.REF_SHAPES, p_obj);
                return this;
            }

            public removeShapes(p_obj: geometry.Shape): geometry.Library {
                this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, geometry.meta.MetaLibrary.REF_SHAPES, p_obj);
                return this;
            }

            public getShapes(): org.kevoree.modeling.api.KDefer<any> {
                var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                this.internal_ref(geometry.meta.MetaLibrary.REF_SHAPES,  (kObjects : org.kevoree.modeling.api.KObject[]) => {
                    var casted: geometry.Shape[] = new Array();
                    for (var i: number = 0; i < kObjects.length; i++) {
                        casted[i] = <geometry.Shape>kObjects[i];
                    }
                    task.initCallback()(casted);
                });
                return task;
            }

            public sizeOfShapes(): number {
                return this.size(geometry.meta.MetaLibrary.REF_SHAPES);
            }

            public addShape(p_shapeName: string, p_result: (p : boolean) => void): void {
                var addShape_params: any[] = new Array();
                addShape_params[0] = p_shapeName;
                this._manager.operationManager().call(this, geometry.meta.MetaLibrary.OP_ADDSHAPE, addShape_params,  (o : any) => {
                    p_result(<boolean>o);
                });
            }

        }

        export class ShapeImpl extends org.kevoree.modeling.api.abs.AbstractKObject implements geometry.Shape {

            constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_manager: org.kevoree.modeling.api.data.manager.KDataManager) {
                super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
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

        }

    }
    export module meta {
        export class MetaLibrary extends org.kevoree.modeling.api.abs.AbstractMetaClass {

            private static INSTANCE: geometry.meta.MetaLibrary = null;
            public static REF_SHAPES: org.kevoree.modeling.api.meta.MetaReference = new org.kevoree.modeling.api.abs.AbstractMetaReference("shapes", 4, true, false,  () => {
                return geometry.meta.MetaShape.getInstance();
            }, null,  () => {
                return geometry.meta.MetaLibrary.getInstance();
            });
            public static OP_ADDSHAPE: org.kevoree.modeling.api.meta.MetaOperation = new org.kevoree.modeling.api.abs.AbstractMetaOperation("addShape", 5,  () => {
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
                var temp_all: org.kevoree.modeling.api.meta.Meta[] = new Array();
                var temp_references: org.kevoree.modeling.api.meta.MetaReference[] = new Array();
                temp_all[0] = MetaLibrary.REF_SHAPES;
                var temp_operations: org.kevoree.modeling.api.meta.MetaOperation[] = new Array();
                temp_all[1] = MetaLibrary.OP_ADDSHAPE;
                this.init(temp_all);
            }

        }

        export class MetaShape extends org.kevoree.modeling.api.abs.AbstractMetaClass {

            private static INSTANCE: geometry.meta.MetaShape = null;
            public static ATT_COLOR: org.kevoree.modeling.api.meta.MetaAttribute = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("color", 4, 0, false, org.kevoree.modeling.api.meta.PrimitiveTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
            public static ATT_NAME: org.kevoree.modeling.api.meta.MetaAttribute = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("name", 5, 0, true, org.kevoree.modeling.api.meta.PrimitiveTypes.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
            public static getInstance(): geometry.meta.MetaShape {
                if (MetaShape.INSTANCE == null) {
                    MetaShape.INSTANCE = new geometry.meta.MetaShape();
                }
                return MetaShape.INSTANCE;
            }

            constructor() {
                super("geometry.Shape", 1);
                var temp_all: org.kevoree.modeling.api.meta.Meta[] = new Array();
                temp_all[0] = MetaShape.ATT_COLOR;
                temp_all[1] = MetaShape.ATT_NAME;
                var temp_references: org.kevoree.modeling.api.meta.MetaReference[] = new Array();
                var temp_operations: org.kevoree.modeling.api.meta.MetaOperation[] = new Array();
                this.init(temp_all);
            }

        }

    }
}
