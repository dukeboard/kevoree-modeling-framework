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

        constructor(kDataBase: org.kevoree.modeling.api.data.KDataBase) {
            super(kDataBase);
        }

        public internal_create(key: number): geometry.GeometryDimension {
            return new geometry.GeometryDimension(this, key);
        }

    }

    export interface GeometryView extends org.kevoree.modeling.api.KView {

        createShape(): geometry.Shape;

        createLibrary(): geometry.Library;

    }

    export module GeometryView { 
        export class METACLASSES implements org.kevoree.modeling.api.meta.MetaClass {

            public static GEOMETRY_SHAPE: METACLASSES = new METACLASSES("geometry.Shape", 0);
            public static GEOMETRY_LIBRARY: METACLASSES = new METACLASSES("geometry.Library", 1);
            private _name: string;
            private _index: number;
            public index(): number {
                return this._index;
            }

            public metaName(): string {
                return this._name;
            }

            constructor(name: string, index: number) {
                this._name = name;
                this._index = index;
            }

            public equals(other: any): boolean {
                return this == other;
            }
            public static _METACLASSESVALUES : METACLASSES[] = [
                METACLASSES.GEOMETRY_SHAPE
                ,METACLASSES.GEOMETRY_LIBRARY
            ];
            public static values():METACLASSES[]{
                return METACLASSES._METACLASSESVALUES;
            }
        }


    }
    export module impl {
        export class GeometryViewImpl extends org.kevoree.modeling.api.abs.AbstractKView implements geometry.GeometryView {

            constructor(p_now: number, p_dimension: org.kevoree.modeling.api.KDimension<any, any, any>) {
                super(p_now, p_dimension);
            }

            public internalCreate(p_clazz: org.kevoree.modeling.api.meta.MetaClass, p_timeTree: org.kevoree.modeling.api.time.TimeTree, p_key: number): org.kevoree.modeling.api.KObject<any, any> {
                if (p_clazz == null) {
                    return null;
                }
                switch (p_clazz.index()) {
                    case 0: 
                    return this.manageCache(new geometry.impl.ShapeImpl(this, geometry.GeometryView.METACLASSES.GEOMETRY_SHAPE, p_key, this.now(), this.dimension(), p_timeTree));
                    case 1: 
                    return this.manageCache(new geometry.impl.LibraryImpl(this, geometry.GeometryView.METACLASSES.GEOMETRY_LIBRARY, p_key, this.now(), this.dimension(), p_timeTree));
                    default: 
                    return null;
                }
            }

            public metaClasses(): org.kevoree.modeling.api.meta.MetaClass[] {
                return geometry.GeometryView.METACLASSES.values();
            }

            public createShape(): geometry.Shape {
                return <geometry.Shape>this.create(geometry.GeometryView.METACLASSES.GEOMETRY_SHAPE);
            }

            public createLibrary(): geometry.Library {
                return <geometry.Library>this.create(geometry.GeometryView.METACLASSES.GEOMETRY_LIBRARY);
            }

        }

        export class LibraryImpl extends org.kevoree.modeling.api.abs.AbstractKObject<any, any> implements geometry.Library {

            constructor(p_factory: geometry.GeometryView, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_uuid: number, p_now: number, p_dimension: org.kevoree.modeling.api.KDimension<any, any, any>, p_timeTree: org.kevoree.modeling.api.time.TimeTree) {
                super(p_factory, p_metaClass, p_uuid, p_now, p_dimension, p_timeTree);
            }

            public metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[] {
                return geometry.Library.METAATTRIBUTES.values();
            }

            public metaReferences(): org.kevoree.modeling.api.meta.MetaReference[] {
                return geometry.Library.METAREFERENCES.values();
            }

            public metaOperations(): org.kevoree.modeling.api.meta.MetaOperation[] {
                return geometry.Library.METAOPERATION.values();
            }

            public addShapes(p_obj: geometry.Shape): geometry.Library {
                this.mutate(org.kevoree.modeling.api.KActionType.ADD, geometry.Library.METAREFERENCES.SHAPES, p_obj, true);
                return this;
            }

            public removeShapes(p_obj: geometry.Shape): geometry.Library {
                this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, geometry.Library.METAREFERENCES.SHAPES, p_obj, true);
                return this;
            }

            public eachShapes(p_callback: (p : geometry.Shape) => void, p_end: (p : java.lang.Throwable) => void): void {
                this.each(geometry.Library.METAREFERENCES.SHAPES, p_callback, p_end);
            }

            public sizeOfShapes(): number {
                return this.size(geometry.Library.METAREFERENCES.SHAPES);
            }

        }

        export class ShapeImpl extends org.kevoree.modeling.api.abs.AbstractKObject<any, any> implements geometry.Shape {

            constructor(p_factory: geometry.GeometryView, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_uuid: number, p_now: number, p_dimension: org.kevoree.modeling.api.KDimension<any, any, any>, p_timeTree: org.kevoree.modeling.api.time.TimeTree) {
                super(p_factory, p_metaClass, p_uuid, p_now, p_dimension, p_timeTree);
            }

            public metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[] {
                return geometry.Shape.METAATTRIBUTES.values();
            }

            public metaReferences(): org.kevoree.modeling.api.meta.MetaReference[] {
                return geometry.Shape.METAREFERENCES.values();
            }

            public metaOperations(): org.kevoree.modeling.api.meta.MetaOperation[] {
                return geometry.Shape.METAOPERATION.values();
            }

            public getColor(): string {
                return <string>this.get(geometry.Shape.METAATTRIBUTES.COLOR);
            }

            public setColor(p_obj: string): geometry.Shape {
                this.set(geometry.Shape.METAATTRIBUTES.COLOR, p_obj);
                return this;
            }

            public getName(): string {
                return <string>this.get(geometry.Shape.METAATTRIBUTES.NAME);
            }

            public setName(p_obj: string): geometry.Shape {
                this.set(geometry.Shape.METAATTRIBUTES.NAME, p_obj);
                return this;
            }

        }

    }
    export interface Library extends org.kevoree.modeling.api.KObject<any, any> {

        addShapes(p_obj: geometry.Shape): geometry.Library;

        removeShapes(p_obj: geometry.Shape): geometry.Library;

        eachShapes(p_callback: (p : geometry.Shape) => void, p_end: (p : java.lang.Throwable) => void): void;

        sizeOfShapes(): number;

    }

    export module Library { 
        export class METAATTRIBUTES implements org.kevoree.modeling.api.meta.MetaAttribute {

            private _name: string;
            private _index: number;
            private _precision: number;
            private _key: boolean;
            private _metaType: org.kevoree.modeling.api.meta.MetaType;
            private _extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation;
            public index(): number {
                return this._index;
            }

            public metaName(): string {
                return this._name;
            }

            public precision(): number {
                return this._precision;
            }

            public key(): boolean {
                return this._key;
            }

            public metaType(): org.kevoree.modeling.api.meta.MetaType {
                return this._metaType;
            }

            public origin(): org.kevoree.modeling.api.meta.MetaClass {
                return geometry.GeometryView.METACLASSES.GEOMETRY_LIBRARY;
            }

            public strategy(): org.kevoree.modeling.api.extrapolation.Extrapolation {
                return this._extrapolation;
            }

            public setExtrapolation(extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation): void {
                this._extrapolation = extrapolation;
            }

            constructor(name: string, index: number, precision: number, key: boolean, metaType: org.kevoree.modeling.api.meta.MetaType, extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation) {
                this._name = name;
                this._index = index;
                this._precision = precision;
                this._key = key;
                this._metaType = metaType;
                this._extrapolation = extrapolation;
            }

            public equals(other: any): boolean {
                return this == other;
            }
            public static _METAATTRIBUTESVALUES : METAATTRIBUTES[] = [
            ];
            public static values():METAATTRIBUTES[]{
                return METAATTRIBUTES._METAATTRIBUTESVALUES;
            }
        }


        export class METAREFERENCES implements org.kevoree.modeling.api.meta.MetaReference {

            public static SHAPES: METAREFERENCES = new METAREFERENCES("shapes", 2, true, false, geometry.GeometryView.METACLASSES.GEOMETRY_SHAPE);
            private _name: string;
            private _index: number;
            private _contained: boolean;
            private _single: boolean;
            private _metaType: org.kevoree.modeling.api.meta.MetaClass;
            public index(): number {
                return this._index;
            }

            public metaName(): string {
                return this._name;
            }

            public contained(): boolean {
                return this._contained;
            }

            public single(): boolean {
                return this._single;
            }

            public metaType(): org.kevoree.modeling.api.meta.MetaClass {
                return this._metaType;
            }

            public opposite(): org.kevoree.modeling.api.meta.MetaReference {
                switch (this) {
                    default: 
                    return null;
                }
            }

            public origin(): org.kevoree.modeling.api.meta.MetaClass {
                return geometry.GeometryView.METACLASSES.GEOMETRY_LIBRARY;
            }

            constructor(name: string, index: number, contained: boolean, single: boolean, metaType: org.kevoree.modeling.api.meta.MetaClass) {
                this._name = name;
                this._index = index;
                this._contained = contained;
                this._single = single;
                this._metaType = metaType;
            }

            public equals(other: any): boolean {
                return this == other;
            }
            public static _METAREFERENCESVALUES : METAREFERENCES[] = [
                METAREFERENCES.SHAPES
            ];
            public static values():METAREFERENCES[]{
                return METAREFERENCES._METAREFERENCESVALUES;
            }
        }


        export class METAOPERATION implements org.kevoree.modeling.api.meta.MetaOperation {

            private _name: string;
            private _index: number;
            public index(): number {
                return this._index;
            }

            public metaName(): string {
                return this._name;
            }

            public origin(): org.kevoree.modeling.api.meta.MetaClass {
                return geometry.GeometryView.METACLASSES.GEOMETRY_LIBRARY;
            }

            constructor(name: string, index: number) {
                this._name = name;
                this._index = index;
            }

            public equals(other: any): boolean {
                return this == other;
            }
            public static _METAOPERATIONVALUES : METAOPERATION[] = [
            ];
            public static values():METAOPERATION[]{
                return METAOPERATION._METAOPERATIONVALUES;
            }
        }


    }
    export interface Shape extends org.kevoree.modeling.api.KObject<any, any> {

        getColor(): string;

        setColor(p_obj: string): geometry.Shape;

        getName(): string;

        setName(p_obj: string): geometry.Shape;

    }

    export module Shape { 
        export class METAATTRIBUTES implements org.kevoree.modeling.api.meta.MetaAttribute {

            public static COLOR: METAATTRIBUTES = new METAATTRIBUTES("color", 2, 0, false, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
            public static NAME: METAATTRIBUTES = new METAATTRIBUTES("name", 3, 0, true, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
            private _name: string;
            private _index: number;
            private _precision: number;
            private _key: boolean;
            private _metaType: org.kevoree.modeling.api.meta.MetaType;
            private _extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation;
            public index(): number {
                return this._index;
            }

            public metaName(): string {
                return this._name;
            }

            public precision(): number {
                return this._precision;
            }

            public key(): boolean {
                return this._key;
            }

            public metaType(): org.kevoree.modeling.api.meta.MetaType {
                return this._metaType;
            }

            public origin(): org.kevoree.modeling.api.meta.MetaClass {
                return geometry.GeometryView.METACLASSES.GEOMETRY_SHAPE;
            }

            public strategy(): org.kevoree.modeling.api.extrapolation.Extrapolation {
                return this._extrapolation;
            }

            public setExtrapolation(extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation): void {
                this._extrapolation = extrapolation;
            }

            constructor(name: string, index: number, precision: number, key: boolean, metaType: org.kevoree.modeling.api.meta.MetaType, extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation) {
                this._name = name;
                this._index = index;
                this._precision = precision;
                this._key = key;
                this._metaType = metaType;
                this._extrapolation = extrapolation;
            }

            public equals(other: any): boolean {
                return this == other;
            }
            public static _METAATTRIBUTESVALUES : METAATTRIBUTES[] = [
                METAATTRIBUTES.COLOR
                ,METAATTRIBUTES.NAME
            ];
            public static values():METAATTRIBUTES[]{
                return METAATTRIBUTES._METAATTRIBUTESVALUES;
            }
        }


        export class METAREFERENCES implements org.kevoree.modeling.api.meta.MetaReference {

            private _name: string;
            private _index: number;
            private _contained: boolean;
            private _single: boolean;
            private _metaType: org.kevoree.modeling.api.meta.MetaClass;
            public index(): number {
                return this._index;
            }

            public metaName(): string {
                return this._name;
            }

            public contained(): boolean {
                return this._contained;
            }

            public single(): boolean {
                return this._single;
            }

            public metaType(): org.kevoree.modeling.api.meta.MetaClass {
                return this._metaType;
            }

            public opposite(): org.kevoree.modeling.api.meta.MetaReference {
                switch (this) {
                    default: 
                    return null;
                }
            }

            public origin(): org.kevoree.modeling.api.meta.MetaClass {
                return geometry.GeometryView.METACLASSES.GEOMETRY_SHAPE;
            }

            constructor(name: string, index: number, contained: boolean, single: boolean, metaType: org.kevoree.modeling.api.meta.MetaClass) {
                this._name = name;
                this._index = index;
                this._contained = contained;
                this._single = single;
                this._metaType = metaType;
            }

            public equals(other: any): boolean {
                return this == other;
            }
            public static _METAREFERENCESVALUES : METAREFERENCES[] = [
            ];
            public static values():METAREFERENCES[]{
                return METAREFERENCES._METAREFERENCESVALUES;
            }
        }


        export class METAOPERATION implements org.kevoree.modeling.api.meta.MetaOperation {

            private _name: string;
            private _index: number;
            public index(): number {
                return this._index;
            }

            public metaName(): string {
                return this._name;
            }

            public origin(): org.kevoree.modeling.api.meta.MetaClass {
                return geometry.GeometryView.METACLASSES.GEOMETRY_SHAPE;
            }

            constructor(name: string, index: number) {
                this._name = name;
                this._index = index;
            }

            public equals(other: any): boolean {
                return this == other;
            }
            public static _METAOPERATIONVALUES : METAOPERATION[] = [
            ];
            public static values():METAOPERATION[]{
                return METAOPERATION._METAOPERATIONVALUES;
            }
        }


    }
}
