declare module geometry {
    class GeometryModel extends org.kevoree.modeling.api.abs.AbstractKModel<any> {
        private _metaModel;
        constructor();
        internalCreateUniverse(key: number): geometry.GeometryUniverse;
        metaModel(): org.kevoree.modeling.api.meta.MetaModel;
        internalCreateObject(universe: number, time: number, uuid: number, p_clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject;
        createShape(universe: number, time: number): geometry.Shape;
        createLibrary(universe: number, time: number): geometry.Library;
    }
    class GeometryUniverse extends org.kevoree.modeling.api.abs.AbstractKUniverse<any, any, any> {
        constructor(p_key: number, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
        internal_create(timePoint: number): geometry.GeometryView;
    }
    interface GeometryView extends org.kevoree.modeling.api.KView {
        createShape(): geometry.Shape;
        createLibrary(): geometry.Library;
    }
    interface Library extends org.kevoree.modeling.api.KObject {
        addShapes(p_obj: geometry.Shape): geometry.Library;
        removeShapes(p_obj: geometry.Shape): geometry.Library;
        getShapes(cb: (p: geometry.Shape[]) => void): void;
        sizeOfShapes(): number;
        addShape(shapeName: string, result: (p: boolean) => void): void;
    }
    interface Shape extends org.kevoree.modeling.api.KObject {
        getColor(): string;
        setColor(p_obj: string): geometry.Shape;
        getName(): string;
        setName(p_obj: string): geometry.Shape;
    }
    module impl {
        class GeometryViewImpl extends org.kevoree.modeling.api.abs.AbstractKView implements geometry.GeometryView {
            constructor(p_universe: number, _time: number, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
            createShape(): geometry.Shape;
            createLibrary(): geometry.Library;
        }
        class LibraryImpl extends org.kevoree.modeling.api.abs.AbstractKObject implements geometry.Library {
            constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
            addShapes(p_obj: geometry.Shape): geometry.Library;
            removeShapes(p_obj: geometry.Shape): geometry.Library;
            getShapes(cb: (p: geometry.Shape[]) => void): void;
            sizeOfShapes(): number;
            addShape(p_shapeName: string, p_result: (p: boolean) => void): void;
        }
        class ShapeImpl extends org.kevoree.modeling.api.abs.AbstractKObject implements geometry.Shape {
            constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
            getColor(): string;
            setColor(p_obj: string): geometry.Shape;
            getName(): string;
            setName(p_obj: string): geometry.Shape;
            addOp_shapes(p_obj: geometry.Library): geometry.Shape;
            removeOp_shapes(p_obj: geometry.Library): geometry.Shape;
            getOp_shapes(cb: (p: geometry.Library[]) => void): void;
            sizeOfOp_shapes(): number;
        }
    }
    module meta {
        class MetaLibrary extends org.kevoree.modeling.api.abs.AbstractMetaClass {
            private static INSTANCE;
            static REF_SHAPES: org.kevoree.modeling.api.meta.MetaReference;
            static OP_ADDSHAPE: org.kevoree.modeling.api.meta.MetaOperation;
            static getInstance(): geometry.meta.MetaLibrary;
            constructor();
        }
        class MetaShape extends org.kevoree.modeling.api.abs.AbstractMetaClass {
            private static INSTANCE;
            static ATT_COLOR: org.kevoree.modeling.api.meta.MetaAttribute;
            static ATT_NAME: org.kevoree.modeling.api.meta.MetaAttribute;
            static REF_OP_SHAPES: org.kevoree.modeling.api.meta.MetaReference;
            static getInstance(): geometry.meta.MetaShape;
            constructor();
        }
    }
}
