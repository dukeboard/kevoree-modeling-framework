declare class System {
    static out: {
        println(obj?: any): void;
        print(obj: any): void;
    };
    static err: {
        println(obj?: any): void;
        print(obj: any): void;
    };
    static arraycopy(src: Number[], srcPos: number, dest: Number[], destPos: number, numElements: number): void;
}
declare var TSMap: new<K, V>() => Map<K, V>;
declare var TSSet: new<T>() => Set<T>;
interface Number {
    equals: (other: Number) => boolean;
}
interface String {
    equals: (other: String) => boolean;
    startsWith: (other: String) => boolean;
    endsWith: (other: String) => boolean;
    matches: (regEx: String) => boolean;
    getBytes: () => number[];
    isEmpty: () => boolean;
}
declare module java {
    module lang {
        class Double {
            static parseDouble(val: string): number;
        }
        class Float {
            static parseFloat(val: string): number;
        }
        class Integer {
            static parseInt(val: string): number;
        }
        class Long {
            static parseLong(val: string): number;
        }
        class Short {
            static parseShort(val: string): number;
        }
        class Throwable {
            public printStackTrace(): void;
        }
        class Exception extends Throwable {
            private message;
            constructor(message: string);
            public printStackTrace(): void;
        }
        class StringBuilder {
            public buffer: string;
            public length: number;
            public append(val: any): StringBuilder;
            public toString(): string;
        }
    }
    module util {
        class Random {
            public nextInt(max: number): number;
        }
        class Arrays {
            static fill(data: Number[], begin: number, nbElem: number, param: number): void;
        }
        class Collections {
            static reverse<A>(p: List<A>): void;
        }
        class Collection<T> {
            public add(val: T): void;
            public addAll(vals: Collection<T>): void;
            public remove(val: T): void;
            public clear(): void;
            public isEmpty(): boolean;
            public size(): number;
            public contains(val: T): boolean;
            public toArray(a: T[]): T[];
        }
        class List<T> extends Collection<T> {
            private internalArray;
            public addAll(vals: Collection<T>): void;
            public clear(): void;
            public poll(): T;
            public remove(val: T): void;
            public toArray(a: T[]): T[];
            public size(): number;
            public add(val: T): void;
            public get(index: number): T;
            public contains(val: T): boolean;
            public isEmpty(): boolean;
        }
        class ArrayList<T> extends List<T> {
        }
        class LinkedList<T> extends List<T> {
        }
        class Map<K, V> {
            public get(key: K): V;
            public put(key: K, value: V): void;
            public containsKey(key: K): boolean;
            public remove(key: K): void;
            public keySet(): Set<K>;
            public isEmpty(): boolean;
            public values(): Set<V>;
            private internalMap;
            public clear(): void;
        }
        class HashMap<K, V> extends Map<K, V> {
        }
        class Set<T> extends Collection<T> {
            private internalSet;
            public add(val: T): void;
            public clear(): void;
            public contains(val: T): boolean;
            public addAll(vals: Collection<T>): void;
            public remove(val: T): void;
            public size(): number;
            public isEmpty(): boolean;
            public toArray(other: T[]): T[];
        }
        class HashSet<T> extends Set<T> {
        }
    }
}
declare module org {
    module junit {
        class Assert {
            static assertNotNull(p: any): void;
            static assertNull(p: any): void;
            static assertEquals(p: any, p2: any): void;
            static assertNotEquals(p: any, p2: any): void;
            static assertTrue(b: boolean): void;
        }
    }
}
declare module org {
    module kevoree {
        module modeling {
            module api {
                module abs {
                    class AbstractKDimension<A extends KView, B extends KDimension<any, any, any>, C extends KUniverse<any>> implements KDimension<A, B, C> {
                        private _universe;
                        private _key;
                        private _timesCache;
                        constructor(p_universe: KUniverse<any>, p_key: number);
                        public key(): number;
                        public universe(): C;
                        public save(callback: Callback<java.lang.Throwable>): void;
                        public saveUnload(callback: Callback<java.lang.Throwable>): void;
                        public delete(callback: Callback<java.lang.Throwable>): void;
                        public discard(callback: Callback<java.lang.Throwable>): void;
                        public timeTrees(keys: number[], callback: Callback<time.TimeTree[]>): void;
                        public timeTree(key: number, callback: Callback<time.TimeTree>): void;
                        public parent(callback: Callback<B>): void;
                        public children(callback: Callback<B[]>): void;
                        public fork(callback: Callback<B>): void;
                        public time(timePoint: number): A;
                        public listen(listener: ModelListener): void;
                        public internal_create(timePoint: number): A;
                    }
                    class AbstractKObject<A extends KObject<any, any>, B extends KView> implements KObject<A, B> {
                        static PARENT_INDEX: number;
                        static INBOUNDS_INDEX: number;
                        private _isDirty;
                        private _view;
                        private _metaClass;
                        private _uuid;
                        private _isDeleted;
                        private _isRoot;
                        private _now;
                        private _timeTree;
                        private _referenceInParent;
                        private _dimension;
                        constructor(p_view: B, p_metaClass: meta.MetaClass, p_uuid: number, p_now: number, p_dimension: KDimension<any, any, any>, p_timeTree: time.TimeTree);
                        public isDirty(): boolean;
                        public setDirty(isDirty: boolean): void;
                        public view(): B;
                        public uuid(): number;
                        public metaClass(): meta.MetaClass;
                        public isDeleted(): boolean;
                        public isRoot(): boolean;
                        public setRoot(isRoot: boolean): void;
                        public now(): number;
                        public timeTree(): time.TimeTree;
                        public dimension(): KDimension<any, any, any>;
                        public path(callback: Callback<string>): void;
                        public parentUuid(): number;
                        public setParentUuid(parentKID: number): void;
                        public parent(callback: Callback<KObject<any, any>>): void;
                        public set_referenceInParent(_referenceInParent: meta.MetaReference): void;
                        public referenceInParent(): meta.MetaReference;
                        public delete(callback: Callback<boolean>): void;
                        public select(query: string, callback: Callback<KObject<any, any>[]>): void;
                        public stream(query: string, callback: Callback<KObject<any, any>>): void;
                        public listen(listener: ModelListener): void;
                        public jump(time: number, callback: Callback<A>): void;
                        public domainKey(): string;
                        public get(attribute: meta.MetaAttribute): any;
                        public set(attribute: meta.MetaAttribute, payload: any): void;
                        private cachedDependencies(attribute);
                        private getCreateOrUpdatePayloadList(obj, payloadIndex);
                        private removeFromContainer(param);
                        public mutate(actionType: KActionType, metaReference: meta.MetaReference, param: KObject<any, any>, setOpposite: boolean): void;
                        public size(metaReference: meta.MetaReference): number;
                        public each<C extends KObject<any, any>>(metaReference: meta.MetaReference, callback: Callback<C>, end: Callback<java.lang.Throwable>): void;
                        public visitAttributes(visitor: ModelAttributeVisitor): void;
                        public metaAttribute(name: string): meta.MetaAttribute;
                        public metaReference(name: string): meta.MetaReference;
                        public metaOperation(name: string): meta.MetaOperation;
                        public visit(visitor: ModelVisitor, end: Callback<java.lang.Throwable>): void;
                        private internal_visit(visitor, end, deep, treeOnly, alreadyVisited);
                        public graphVisit(visitor: ModelVisitor, end: Callback<java.lang.Throwable>): void;
                        public treeVisit(visitor: ModelVisitor, end: Callback<java.lang.Throwable>): void;
                        public toJSON(): string;
                        public toString(): string;
                        public traces(request: TraceRequest): trace.ModelTrace[];
                        public inbounds(callback: Callback<InboundReference>, end: Callback<java.lang.Throwable>): void;
                        public metaAttributes(): meta.MetaAttribute[];
                        public metaReferences(): meta.MetaReference[];
                        public metaOperations(): meta.MetaOperation[];
                    }
                    class AbstractKUniverse<A extends KDimension<any, any, any>> implements KUniverse<A> {
                        private _storage;
                        constructor(kDataBase: data.KDataBase);
                        public storage(): data.KStore;
                        public newDimension(callback: Callback<A>): void;
                        public internal_create(key: number): A;
                        public dimension(key: number, callback: Callback<A>): void;
                        public saveAll(callback: Callback<boolean>): void;
                        public deleteAll(callback: Callback<boolean>): void;
                        public unloadAll(callback: Callback<boolean>): void;
                        public disable(listener: ModelListener): void;
                        public stream(query: string, callback: Callback<KObject<any, any>>): void;
                        public listen(listener: ModelListener): void;
                    }
                    class AbstractKView implements KView {
                        private _now;
                        private _dimension;
                        constructor(p_now: number, p_dimension: KDimension<any, any, any>);
                        public now(): number;
                        public dimension(): KDimension<any, any, any>;
                        public createJSONSerializer(): ModelSerializer;
                        public createJSONLoader(): ModelLoader;
                        public createXMISerializer(): ModelSerializer;
                        public createXMILoader(): ModelLoader;
                        public createModelCompare(): ModelCompare;
                        public createModelCloner(): ModelCloner<any>;
                        public createModelSlicer(): ModelSlicer;
                        public metaClass(fqName: string): meta.MetaClass;
                        public createFQN(metaClassName: string): KObject<any, any>;
                        public manageCache(obj: KObject<any, any>): KObject<any, any>;
                        public setRoot(elem: KObject<any, any>): void;
                        public select(query: string, callback: Callback<KObject<any, any>[]>): void;
                        public lookup(kid: number, callback: Callback<KObject<any, any>>): void;
                        public lookupAll(keys: number[], callback: Callback<KObject<any, any>[]>): void;
                        public stream(query: string, callback: Callback<KObject<any, any>>): void;
                        public createProxy(clazz: meta.MetaClass, timeTree: time.TimeTree, key: number): KObject<any, any>;
                        public create(clazz: meta.MetaClass): KObject<any, any>;
                        public listen(listener: ModelListener): void;
                        public internalCreate(clazz: meta.MetaClass, timeTree: time.TimeTree, key: number): KObject<any, any>;
                        public metaClasses(): meta.MetaClass[];
                    }
                }
                interface Callback<A> {
                    on(a: A): void;
                }
                module clone {
                    class DefaultModelCloner implements ModelCloner<KObject<any, any>> {
                        private _factory;
                        constructor(p_factory: KView);
                        public clone(originalObject: KObject<any, any>, callback: Callback<KObject<any, any>>): void;
                    }
                }
                module compare {
                    class DefaultModelCompare implements ModelCompare {
                        private _factory;
                        constructor(p_factory: KView);
                        public diff(origin: KObject<any, any>, target: KObject<any, any>, callback: Callback<trace.TraceSequence>): void;
                        public union(origin: KObject<any, any>, target: KObject<any, any>, callback: Callback<trace.TraceSequence>): void;
                        public intersection(origin: KObject<any, any>, target: KObject<any, any>, callback: Callback<trace.TraceSequence>): void;
                        private internal_diff(origin, target, inter, merge, callback);
                        public internal_createTraces(current: KObject<any, any>, sibling: KObject<any, any>, inter: boolean, merge: boolean, references: boolean, attributes: boolean): java.util.List<trace.ModelTrace>;
                    }
                }
                module data {
                    class AccessMode {
                        static READ: AccessMode;
                        static WRITE: AccessMode;
                        public equals(other: any): boolean;
                        static _AccessModeVALUES: AccessMode[];
                        static values(): AccessMode[];
                    }
                    module cache {
                        class DimensionCache {
                            public timeTreeCache: java.util.Map<number, time.TimeTree>;
                            public timesCaches: java.util.Map<number, TimeCache>;
                            public dimension: KDimension<any, any, any>;
                            public rootTimeTree: time.TimeTree;
                            public listeners: java.util.List<ModelListener>;
                            constructor(dimension: KDimension<any, any, any>);
                        }
                        class TimeCache {
                            public obj_cache: java.util.Map<number, KObject<any, any>>;
                            public payload_cache: java.util.Map<number, any[]>;
                            public root: KObject<any, any>;
                            public rootDirty: boolean;
                            public listeners: java.util.List<ModelListener>;
                            public obj_listeners: java.util.Map<number, java.util.List<ModelListener>>;
                        }
                    }
                    class DefaultKStore implements KStore {
                        static KEY_SEP: string;
                        private _db;
                        private universeListeners;
                        private caches;
                        public dimKeyCounter: number;
                        public objectKey: number;
                        constructor(p_db: KDataBase);
                        private keyTree(dim, key);
                        private keyRoot(dim, time);
                        private keyRootTree(dim);
                        private keyPayload(dim, time, key);
                        public initDimension(dimension: KDimension<any, any, any>, callback: Callback<java.lang.Throwable>): void;
                        public initKObject(obj: KObject<any, any>, originView: KView): void;
                        public nextDimensionKey(): number;
                        public nextObjectKey(): number;
                        public cacheLookup(dimension: KDimension<any, any, any>, time: number, key: number): KObject<any, any>;
                        public raw(origin: KObject<any, any>, accessMode: AccessMode): any[];
                        public discard(dimension: KDimension<any, any, any>, callback: Callback<java.lang.Throwable>): void;
                        public delete(dimension: KDimension<any, any, any>, callback: Callback<java.lang.Throwable>): void;
                        public save(dimension: KDimension<any, any, any>, callback: Callback<java.lang.Throwable>): void;
                        public saveUnload(dimension: KDimension<any, any, any>, callback: Callback<java.lang.Throwable>): void;
                        public timeTree(dimension: KDimension<any, any, any>, key: number, callback: Callback<time.TimeTree>): void;
                        public timeTrees(dimension: KDimension<any, any, any>, keys: number[], callback: Callback<time.TimeTree[]>): void;
                        public lookup(originView: KView, key: number, callback: Callback<KObject<any, any>>): void;
                        private loadObjectInCache(originView, keys, callback);
                        public lookupAll(originView: KView, keys: number[], callback: Callback<KObject<any, any>[]>): void;
                        public getDimension(key: number): KDimension<any, any, any>;
                        public getRoot(originView: KView, callback: Callback<KObject<any, any>>): void;
                        public setRoot(newRoot: KObject<any, any>): void;
                        public registerListener(origin: any, listener: ModelListener): void;
                        public notify(event: KEvent): void;
                    }
                    interface KDataBase {
                        get(keys: string[], callback: ThrowableCallback<string[]>): void;
                        put(payloads: string[][], error: Callback<java.lang.Throwable>): void;
                        remove(keys: string[], error: Callback<java.lang.Throwable>): void;
                        commit(error: Callback<java.lang.Throwable>): void;
                        close(error: Callback<java.lang.Throwable>): void;
                    }
                    interface KStore {
                        lookup(originView: KView, key: number, callback: Callback<KObject<any, any>>): void;
                        lookupAll(originView: KView, key: number[], callback: Callback<KObject<any, any>[]>): void;
                        raw(origin: KObject<any, any>, accessMode: AccessMode): any[];
                        save(dimension: KDimension<any, any, any>, callback: Callback<java.lang.Throwable>): void;
                        saveUnload(dimension: KDimension<any, any, any>, callback: Callback<java.lang.Throwable>): void;
                        discard(dimension: KDimension<any, any, any>, callback: Callback<java.lang.Throwable>): void;
                        delete(dimension: KDimension<any, any, any>, callback: Callback<java.lang.Throwable>): void;
                        timeTree(dimension: KDimension<any, any, any>, key: number, callback: Callback<time.TimeTree>): void;
                        timeTrees(dimension: KDimension<any, any, any>, keys: number[], callback: Callback<time.TimeTree[]>): void;
                        initKObject(obj: KObject<any, any>, originView: KView): void;
                        initDimension(dimension: KDimension<any, any, any>, callback: Callback<java.lang.Throwable>): void;
                        nextDimensionKey(): number;
                        nextObjectKey(): number;
                        getDimension(key: number): KDimension<any, any, any>;
                        getRoot(originView: KView, callback: Callback<KObject<any, any>>): void;
                        setRoot(newRoot: KObject<any, any>): void;
                        cacheLookup(dimension: KDimension<any, any, any>, time: number, key: number): KObject<any, any>;
                        registerListener(origin: any, listener: ModelListener): void;
                        notify(event: KEvent): void;
                    }
                    class MemoryKDataBase implements KDataBase {
                        private backend;
                        public put(payloads: string[][], callback: Callback<java.lang.Throwable>): void;
                        public get(keys: string[], callback: ThrowableCallback<string[]>): void;
                        public remove(keys: string[], callback: Callback<java.lang.Throwable>): void;
                        public commit(callback: Callback<java.lang.Throwable>): void;
                        public close(callback: Callback<java.lang.Throwable>): void;
                    }
                }
                module event {
                    class DefaultKEvent implements KEvent {
                        private _type;
                        private _meta;
                        private _pastValue;
                        private _newValue;
                        private _source;
                        constructor(p_type: KActionType, p_meta: meta.Meta, p_source: KObject<any, any>, p_pastValue: any, p_newValue: any);
                        public toString(): string;
                        public type(): KActionType;
                        public meta(): meta.Meta;
                        public pastValue(): any;
                        public newValue(): any;
                        public src(): KObject<any, any>;
                    }
                }
                class Extrapolations {
                    static DISCRETE: Extrapolations;
                    static LINEAR_REGRESSION: Extrapolations;
                    static POLYNOMIAL: Extrapolations;
                    private extrapolationStrategy;
                    constructor(wrappedStrategy: strategy.ExtrapolationStrategy);
                    public strategy(): strategy.ExtrapolationStrategy;
                    public equals(other: any): boolean;
                    static _ExtrapolationsVALUES: Extrapolations[];
                    static values(): Extrapolations[];
                }
                class InboundReference {
                    private reference;
                    private object;
                    constructor(reference: meta.MetaReference, object: KObject<any, any>);
                    public getReference(): meta.MetaReference;
                    public getObject(): KObject<any, any>;
                }
                module json {
                    class JSONModelLoader implements ModelLoader {
                        private _factory;
                        constructor(p_factory: KView);
                        static load(payload: string, factory: KView, callback: Callback<KObject<any, any>>): KObject<any, any>;
                        private static loadObjects(lexer, factory, callback);
                        public load(payload: string, callback: Callback<java.lang.Throwable>): void;
                        static convertRaw(attribute: meta.MetaAttribute, raw: any): any;
                    }
                    class JSONModelSerializer implements ModelSerializer {
                        static KEY_META: string;
                        static KEY_UUID: string;
                        static KEY_ROOT: string;
                        public serialize(model: KObject<any, any>, callback: ThrowableCallback<string>): void;
                        static printJSON(elem: KObject<any, any>, builder: java.lang.StringBuilder): void;
                    }
                    class JSONString {
                        private static ESCAPE_CHAR;
                        static encodeBuffer(buffer: java.lang.StringBuilder, chain: string): void;
                        static encode(buffer: java.lang.StringBuilder, chain: string): void;
                        static unescape(src: string): string;
                    }
                    class JsonToken {
                        private _tokenType;
                        private _value;
                        constructor(p_tokenType: Type, p_value: any);
                        public toString(): string;
                        public tokenType(): Type;
                        public value(): any;
                    }
                    class Lexer {
                        private bytes;
                        private EOF;
                        private BOOLEAN_LETTERS;
                        private DIGIT;
                        private index;
                        private static DEFAULT_BUFFER_SIZE;
                        constructor(payload: string);
                        public isSpace(c: string): boolean;
                        private nextChar();
                        private peekChar();
                        private isDone();
                        private isBooleanLetter(c);
                        private isDigit(c);
                        private isValueLetter(c);
                        public nextToken(): JsonToken;
                    }
                    class Type {
                        static VALUE: Type;
                        static LEFT_BRACE: Type;
                        static RIGHT_BRACE: Type;
                        static LEFT_BRACKET: Type;
                        static RIGHT_BRACKET: Type;
                        static COMMA: Type;
                        static COLON: Type;
                        static EOF: Type;
                        private _value;
                        constructor(p_value: number);
                        public equals(other: any): boolean;
                        static _TypeVALUES: Type[];
                        static values(): Type[];
                    }
                }
                class KActionType {
                    static SET: KActionType;
                    static ADD: KActionType;
                    static REMOVE: KActionType;
                    static NEW: KActionType;
                    private code;
                    constructor(code: string);
                    public toString(): string;
                    public equals(other: any): boolean;
                    static _KActionTypeVALUES: KActionType[];
                    static values(): KActionType[];
                }
                interface KDimension<A extends KView, B extends KDimension<any, any, any>, C extends KUniverse<any>> {
                    key(): number;
                    parent(callback: Callback<B>): void;
                    children(callback: Callback<B[]>): void;
                    fork(callback: Callback<B>): void;
                    save(callback: Callback<java.lang.Throwable>): void;
                    saveUnload(callback: Callback<java.lang.Throwable>): void;
                    delete(callback: Callback<java.lang.Throwable>): void;
                    discard(callback: Callback<java.lang.Throwable>): void;
                    time(timePoint: number): A;
                    timeTrees(keys: number[], callback: Callback<time.TimeTree[]>): void;
                    timeTree(key: number, callback: Callback<time.TimeTree>): void;
                    universe(): C;
                }
                interface KEvent {
                    type(): KActionType;
                    meta(): meta.Meta;
                    pastValue(): any;
                    newValue(): any;
                    src(): KObject<any, any>;
                }
                interface KObject<A extends KObject<any, any>, B extends KView> {
                    isDirty(): boolean;
                    dimension(): KDimension<any, any, any>;
                    isDeleted(): boolean;
                    isRoot(): boolean;
                    uuid(): number;
                    path(callback: Callback<string>): void;
                    view(): B;
                    delete(callback: Callback<boolean>): void;
                    parent(callback: Callback<KObject<any, any>>): void;
                    parentUuid(): number;
                    select(query: string, callback: Callback<KObject<any, any>[]>): void;
                    stream(query: string, callback: Callback<KObject<any, any>>): void;
                    listen(listener: ModelListener): void;
                    visitAttributes(visitor: ModelAttributeVisitor): void;
                    visit(visitor: ModelVisitor, end: Callback<java.lang.Throwable>): void;
                    graphVisit(visitor: ModelVisitor, end: Callback<java.lang.Throwable>): void;
                    treeVisit(visitor: ModelVisitor, end: Callback<java.lang.Throwable>): void;
                    now(): number;
                    jump(time: number, callback: Callback<A>): void;
                    timeTree(): time.TimeTree;
                    referenceInParent(): meta.MetaReference;
                    domainKey(): string;
                    metaClass(): meta.MetaClass;
                    metaAttributes(): meta.MetaAttribute[];
                    metaReferences(): meta.MetaReference[];
                    metaOperations(): meta.MetaOperation[];
                    metaAttribute(name: string): meta.MetaAttribute;
                    metaReference(name: string): meta.MetaReference;
                    metaOperation(name: string): meta.MetaOperation;
                    mutate(actionType: KActionType, metaReference: meta.MetaReference, param: KObject<any, any>, setOpposite: boolean): void;
                    each<C extends KObject<any, any>>(metaReference: meta.MetaReference, callback: Callback<C>, end: Callback<java.lang.Throwable>): void;
                    inbounds(callback: Callback<InboundReference>, end: Callback<java.lang.Throwable>): void;
                    traces(request: TraceRequest): trace.ModelTrace[];
                    get(attribute: meta.MetaAttribute): any;
                    set(attribute: meta.MetaAttribute, payload: any): void;
                    toJSON(): string;
                }
                interface KUniverse<A extends KDimension<any, any, any>> {
                    newDimension(callback: Callback<A>): void;
                    dimension(key: number, callback: Callback<A>): void;
                    saveAll(callback: Callback<boolean>): void;
                    deleteAll(callback: Callback<boolean>): void;
                    unloadAll(callback: Callback<boolean>): void;
                    disable(listener: ModelListener): void;
                    stream(query: string, callback: Callback<KObject<any, any>>): void;
                    storage(): data.KStore;
                    listen(listener: ModelListener): void;
                }
                interface KView {
                    createFQN(metaClassName: string): KObject<any, any>;
                    create(clazz: meta.MetaClass): KObject<any, any>;
                    setRoot(elem: KObject<any, any>): void;
                    createJSONSerializer(): ModelSerializer;
                    createJSONLoader(): ModelLoader;
                    createXMISerializer(): ModelSerializer;
                    createXMILoader(): ModelLoader;
                    createModelCompare(): ModelCompare;
                    createModelCloner(): ModelCloner<any>;
                    createModelSlicer(): ModelSlicer;
                    select(query: string, callback: Callback<KObject<any, any>[]>): void;
                    lookup(key: number, callback: Callback<KObject<any, any>>): void;
                    lookupAll(keys: number[], callback: Callback<KObject<any, any>[]>): void;
                    stream(query: string, callback: Callback<KObject<any, any>>): void;
                    metaClasses(): meta.MetaClass[];
                    metaClass(fqName: string): meta.MetaClass;
                    dimension(): KDimension<any, any, any>;
                    now(): number;
                    createProxy(clazz: meta.MetaClass, timeTree: time.TimeTree, key: number): KObject<any, any>;
                    listen(listener: ModelListener): void;
                }
                module meta {
                    interface Meta {
                        metaName(): string;
                        index(): number;
                    }
                    interface MetaAttribute extends Meta {
                        key(): boolean;
                        origin(): MetaClass;
                        metaType(): MetaType;
                        strategy(): strategy.ExtrapolationStrategy;
                        precision(): number;
                        setExtrapolationStrategy(extrapolationStrategy: strategy.ExtrapolationStrategy): void;
                    }
                    interface MetaClass extends Meta {
                    }
                    interface MetaOperation extends Meta {
                    }
                    interface MetaReference extends Meta {
                        contained(): boolean;
                        single(): boolean;
                        metaType(): MetaClass;
                        opposite(): MetaReference;
                        origin(): MetaClass;
                    }
                    class MetaType {
                        static STRING: MetaType;
                        static LONG: MetaType;
                        static INT: MetaType;
                        static BOOL: MetaType;
                        static SHORT: MetaType;
                        static DOUBLE: MetaType;
                        static FLOAT: MetaType;
                        public equals(other: any): boolean;
                        static _MetaTypeVALUES: MetaType[];
                        static values(): MetaType[];
                    }
                }
                interface ModelAttributeVisitor {
                    visit(metaAttribute: meta.MetaAttribute, value: any): void;
                }
                interface ModelCloner<A extends KObject<any, any>> {
                    clone(o: A, callback: Callback<A>): void;
                }
                interface ModelCompare {
                    diff(origin: KObject<any, any>, target: KObject<any, any>, callback: Callback<trace.TraceSequence>): void;
                    union(origin: KObject<any, any>, target: KObject<any, any>, callback: Callback<trace.TraceSequence>): void;
                    intersection(origin: KObject<any, any>, target: KObject<any, any>, callback: Callback<trace.TraceSequence>): void;
                }
                interface ModelListener {
                    on(evt: KEvent): void;
                }
                interface ModelLoader {
                    load(payload: string, callback: Callback<java.lang.Throwable>): void;
                }
                interface ModelSerializer {
                    serialize(model: KObject<any, any>, callback: ThrowableCallback<string>): void;
                }
                interface ModelSlicer {
                    slice(elems: java.util.List<KObject<any, any>>, callback: Callback<trace.TraceSequence>): void;
                }
                interface ModelVisitor {
                    visit(elem: KObject<any, any>): VisitResult;
                }
                module polynomial {
                    class DefaultPolynomialExtrapolation implements PolynomialExtrapolation {
                        private weights;
                        private timeOrigin;
                        private samples;
                        private degradeFactor;
                        private prioritization;
                        private maxDegree;
                        private toleratedError;
                        private _lastIndex;
                        private static sep;
                        constructor(timeOrigin: number, toleratedError: number, maxDegree: number, degradeFactor: number, prioritization: util.Prioritization);
                        public getSamples(): java.util.List<util.DataSample>;
                        public getDegree(): number;
                        public getTimeOrigin(): number;
                        private getMaxErr(degree, toleratedError, maxDegree, prioritization);
                        private internal_feed(time, value);
                        private maxError(computedWeights, time, value);
                        public comparePolynome(p2: DefaultPolynomialExtrapolation, err: number): boolean;
                        private internal_extrapolate(time, weights);
                        public extrapolate(time: number): number;
                        public insert(time: number, value: number): boolean;
                        public lastIndex(): number;
                        public save(): string;
                        public load(payload: string): void;
                    }
                    interface PolynomialExtrapolation {
                        save(): string;
                        load(payload: string): void;
                        extrapolate(time: number): number;
                        insert(time: number, value: number): boolean;
                        lastIndex(): number;
                    }
                    module util {
                        class AdjLinearSolverQr {
                            public numRows: number;
                            public numCols: number;
                            private decomposer;
                            public maxRows: number;
                            public maxCols: number;
                            public Q: DenseMatrix64F;
                            public R: DenseMatrix64F;
                            private Y;
                            private Z;
                            public setA(A: DenseMatrix64F): boolean;
                            private solveU(U, b, n);
                            public solve(B: DenseMatrix64F, X: DenseMatrix64F): void;
                            constructor();
                            public setMaxSize(maxRows: number, maxCols: number): void;
                        }
                        class DataSample {
                            public time: number;
                            public value: number;
                            constructor(time: number, value: number);
                        }
                        class DenseMatrix64F {
                            public numRows: number;
                            public numCols: number;
                            public data: number[];
                            static MULT_COLUMN_SWITCH: number;
                            static multTransA_smallMV(A: DenseMatrix64F, B: DenseMatrix64F, C: DenseMatrix64F): void;
                            static multTransA_reorderMV(A: DenseMatrix64F, B: DenseMatrix64F, C: DenseMatrix64F): void;
                            static multTransA_reorderMM(a: DenseMatrix64F, b: DenseMatrix64F, c: DenseMatrix64F): void;
                            static multTransA_smallMM(a: DenseMatrix64F, b: DenseMatrix64F, c: DenseMatrix64F): void;
                            static multTransA(a: DenseMatrix64F, b: DenseMatrix64F, c: DenseMatrix64F): void;
                            static setIdentity(mat: DenseMatrix64F): void;
                            static widentity(width: number): DenseMatrix64F;
                            static identity(numRows: number, numCols: number): DenseMatrix64F;
                            static fill(a: DenseMatrix64F, value: number): void;
                            public get(index: number): number;
                            public set(index: number, val: number): number;
                            public plus(index: number, val: number): number;
                            constructor(numRows: number, numCols: number);
                            public reshape(numRows: number, numCols: number, saveValues: boolean): void;
                            public cset(row: number, col: number, value: number): void;
                            public unsafe_get(row: number, col: number): number;
                            public getNumElements(): number;
                        }
                        class PolynomialFitEjml {
                            public A: DenseMatrix64F;
                            public coef: DenseMatrix64F;
                            public y: DenseMatrix64F;
                            public solver: AdjLinearSolverQr;
                            constructor(degree: number);
                            public getCoef(): number[];
                            public fit(samplePoints: number[], observations: number[]): void;
                        }
                        class Prioritization {
                            static SAMEPRIORITY: Prioritization;
                            static HIGHDEGREES: Prioritization;
                            static LOWDEGREES: Prioritization;
                            public equals(other: any): boolean;
                            static _PrioritizationVALUES: Prioritization[];
                            static values(): Prioritization[];
                        }
                        class QRDecompositionHouseholderColumn_D64 {
                            public dataQR: number[][];
                            public v: number[];
                            public numCols: number;
                            public numRows: number;
                            public minLength: number;
                            public gammas: number[];
                            public gamma: number;
                            public tau: number;
                            public error: boolean;
                            public setExpectedMaxSize(numRows: number, numCols: number): void;
                            public getQ(Q: DenseMatrix64F, compact: boolean): DenseMatrix64F;
                            public getR(R: DenseMatrix64F, compact: boolean): DenseMatrix64F;
                            public decompose(A: DenseMatrix64F): boolean;
                            public convertToColumnMajor(A: DenseMatrix64F): void;
                            public householder(j: number): void;
                            public updateA(w: number): void;
                            static findMax(u: number[], startU: number, length: number): number;
                            static divideElements(j: number, numRows: number, u: number[], u_0: number): void;
                            static computeTauAndDivide(j: number, numRows: number, u: number[], max: number): number;
                            static rank1UpdateMultR(A: DenseMatrix64F, u: number[], gamma: number, colA0: number, w0: number, w1: number, _temp: number[]): void;
                        }
                    }
                }
                module select {
                    class KQuery {
                        static OPEN_BRACKET: string;
                        static CLOSE_BRACKET: string;
                        static QUERY_SEP: string;
                        public relationName: string;
                        public params: java.util.Map<string, KQueryParam>;
                        public subQuery: string;
                        public oldString: string;
                        public previousIsDeep: boolean;
                        public previousIsRefDeep: boolean;
                        constructor(relationName: string, params: java.util.Map<string, KQueryParam>, subQuery: string, oldString: string, previousIsDeep: boolean, previousIsRefDeep: boolean);
                        static extractFirstQuery(query: string): KQuery;
                    }
                    class KQueryParam {
                        private _name;
                        private _value;
                        private _negative;
                        constructor(p_name: string, p_value: string, p_negative: boolean);
                        public name(): string;
                        public value(): string;
                        public isNegative(): boolean;
                    }
                    class KSelector {
                        static select(root: KObject<any, any>, query: string, callback: Callback<KObject<any, any>[]>): void;
                    }
                }
                module slice {
                    class DefaultModelSlicer implements ModelSlicer {
                        private internal_prune(elem, traces, cache, parentMap, callback);
                        public slice(elems: java.util.List<KObject<any, any>>, callback: Callback<trace.TraceSequence>): void;
                    }
                }
                module strategy {
                    class DiscreteExtrapolationStrategy implements ExtrapolationStrategy {
                        public timedDependencies(current: KObject<any, any>): number[];
                        public extrapolate(current: KObject<any, any>, attribute: meta.MetaAttribute, dependencies: KObject<any, any>[]): any;
                        public mutate(current: KObject<any, any>, attribute: meta.MetaAttribute, payload: any, dependencies: KObject<any, any>[]): void;
                    }
                    interface ExtrapolationStrategy {
                        timedDependencies(current: KObject<any, any>): number[];
                        extrapolate(current: KObject<any, any>, attribute: meta.MetaAttribute, dependencies: KObject<any, any>[]): any;
                        mutate(current: KObject<any, any>, attribute: meta.MetaAttribute, payload: any, dependencies: KObject<any, any>[]): void;
                    }
                    class LinearRegressionExtrapolationStrategy implements ExtrapolationStrategy {
                        public timedDependencies(current: KObject<any, any>): number[];
                        public extrapolate(current: KObject<any, any>, attribute: meta.MetaAttribute, dependencies: KObject<any, any>[]): any;
                        public mutate(current: KObject<any, any>, attribute: meta.MetaAttribute, payload: any, dependencies: KObject<any, any>[]): void;
                    }
                    class PolynomialExtrapolationStrategy implements ExtrapolationStrategy {
                        public timedDependencies(current: KObject<any, any>): number[];
                        public extrapolate(current: KObject<any, any>, attribute: meta.MetaAttribute, dependencies: KObject<any, any>[]): any;
                        public mutate(current: KObject<any, any>, attribute: meta.MetaAttribute, payload: any, dependencies: KObject<any, any>[]): void;
                    }
                }
                interface ThrowableCallback<A> {
                    on(a: A, error: java.lang.Throwable): void;
                }
                module time {
                    class DefaultTimeTree implements TimeTree {
                        public dirty: boolean;
                        public versionTree: rbtree.RBTree;
                        public walk(walker: TimeWalker): void;
                        public walkAsc(walker: TimeWalker): void;
                        public walkDesc(walker: TimeWalker): void;
                        public walkRangeAsc(walker: TimeWalker, from: number, to: number): void;
                        public walkRangeDesc(walker: TimeWalker, from: number, to: number): void;
                        public first(): number;
                        public last(): number;
                        public next(from: number): number;
                        public previous(from: number): number;
                        public resolve(time: number): number;
                        public insert(time: number): TimeTree;
                        public isDirty(): boolean;
                        public size(): number;
                        public setDirty(state: boolean): void;
                        public toString(): string;
                        public load(payload: string): void;
                    }
                    module rbtree {
                        class Color {
                            static RED: Color;
                            static BLACK: Color;
                            public equals(other: any): boolean;
                            static _ColorVALUES: Color[];
                            static values(): Color[];
                        }
                        class RBTree {
                            public root: TreeNode;
                            private _size;
                            public size(): number;
                            public serialize(): string;
                            public unserialize(payload: string): void;
                            public previousOrEqual(key: number): TreeNode;
                            public nextOrEqual(key: number): TreeNode;
                            public previous(key: number): TreeNode;
                            public previousWhileNot(key: number, until: State): TreeNode;
                            public next(key: number): TreeNode;
                            public nextWhileNot(key: number, until: State): TreeNode;
                            public first(): TreeNode;
                            public last(): TreeNode;
                            public firstWhileNot(key: number, until: State): TreeNode;
                            public lastWhileNot(key: number, until: State): TreeNode;
                            private lookupNode(key);
                            public lookup(key: number): State;
                            private rotateLeft(n);
                            private rotateRight(n);
                            private replaceNode(oldn, newn);
                            public insert(key: number, value: State): void;
                            private insertCase1(n);
                            private insertCase2(n);
                            private insertCase3(n);
                            private insertCase4(n_n);
                            private insertCase5(n);
                            public delete(key: number): void;
                            private deleteCase1(n);
                            private deleteCase2(n);
                            private deleteCase3(n);
                            private deleteCase4(n);
                            private deleteCase5(n);
                            private deleteCase6(n);
                            private nodeColor(n);
                        }
                        class ReaderContext {
                            private payload;
                            private offset;
                            constructor(offset: number, payload: string);
                            public unserialize(rightBranch: boolean): TreeNode;
                        }
                        class State {
                            static EXISTS: State;
                            static DELETED: State;
                            public equals(other: any): boolean;
                            static _StateVALUES: State[];
                            static values(): State[];
                        }
                        class TreeNode {
                            static BLACK_DELETE: string;
                            static BLACK_EXISTS: string;
                            static RED_DELETE: string;
                            static RED_EXISTS: string;
                            public key: number;
                            public value: State;
                            public color: Color;
                            private left;
                            private right;
                            private parent;
                            public getKey(): number;
                            constructor(key: number, value: State, color: Color, left: TreeNode, right: TreeNode);
                            public grandparent(): TreeNode;
                            public sibling(): TreeNode;
                            public uncle(): TreeNode;
                            public getLeft(): TreeNode;
                            public setLeft(left: TreeNode): void;
                            public getRight(): TreeNode;
                            public setRight(right: TreeNode): void;
                            public getParent(): TreeNode;
                            public setParent(parent: TreeNode): void;
                            public serialize(builder: java.lang.StringBuilder): void;
                            public next(): TreeNode;
                            public previous(): TreeNode;
                        }
                    }
                    interface TimeTree {
                        walk(walker: TimeWalker): void;
                        walkAsc(walker: TimeWalker): void;
                        walkDesc(walker: TimeWalker): void;
                        walkRangeAsc(walker: TimeWalker, from: number, to: number): void;
                        walkRangeDesc(walker: TimeWalker, from: number, to: number): void;
                        first(): number;
                        last(): number;
                        next(from: number): number;
                        previous(from: number): number;
                        resolve(time: number): number;
                        insert(time: number): TimeTree;
                        isDirty(): boolean;
                        size(): number;
                    }
                    interface TimeWalker {
                        walk(timePoint: number): void;
                    }
                }
                module trace {
                    class ModelAddTrace implements ModelTrace {
                        private reference;
                        private traceType;
                        private srcKID;
                        private previousKID;
                        private metaClass;
                        public getPreviousKID(): number;
                        public getMetaClass(): meta.MetaClass;
                        constructor(srcKID: number, reference: meta.MetaReference, previousKID: number, metaClass: meta.MetaClass);
                        public toString(): string;
                        public getMeta(): meta.Meta;
                        public getTraceType(): KActionType;
                        public getSrcKID(): number;
                    }
                    class ModelRemoveTrace implements ModelTrace {
                        private traceType;
                        private srcKID;
                        private objKID;
                        private reference;
                        constructor(srcKID: number, reference: meta.MetaReference, objKID: number);
                        public getObjKID(): number;
                        public getMeta(): meta.Meta;
                        public getTraceType(): KActionType;
                        public getSrcKID(): number;
                        public toString(): string;
                    }
                    class ModelSetTrace implements ModelTrace {
                        private traceType;
                        private srcKID;
                        private attribute;
                        private content;
                        constructor(srcKID: number, attribute: meta.MetaAttribute, content: any);
                        public getTraceType(): KActionType;
                        public getSrcKID(): number;
                        public getMeta(): meta.Meta;
                        public getContent(): any;
                        public toString(): string;
                    }
                    interface ModelTrace {
                        getMeta(): meta.Meta;
                        getTraceType(): KActionType;
                        getSrcKID(): number;
                    }
                    class ModelTraceApplicator {
                        private targetModel;
                        private pendingObj;
                        private pendingParent;
                        private pendingParentRef;
                        private pendingObjKID;
                        constructor(targetModel: KObject<any, any>);
                        private tryClosePending(srcKID);
                        public createOrAdd(previousPath: number, target: KObject<any, any>, reference: meta.MetaReference, metaClass: meta.MetaClass, callback: Callback<java.lang.Throwable>): void;
                        public applyTraceSequence(traceSeq: TraceSequence, callback: Callback<java.lang.Throwable>): void;
                        public applyTrace(trace: ModelTrace, callback: Callback<java.lang.Throwable>): void;
                    }
                    class ModelTraceConstants {
                        static traceType: ModelTraceConstants;
                        static src: ModelTraceConstants;
                        static meta: ModelTraceConstants;
                        static previouspath: ModelTraceConstants;
                        static typename: ModelTraceConstants;
                        static objpath: ModelTraceConstants;
                        static content: ModelTraceConstants;
                        static openJSON: ModelTraceConstants;
                        static closeJSON: ModelTraceConstants;
                        static bb: ModelTraceConstants;
                        static coma: ModelTraceConstants;
                        static dp: ModelTraceConstants;
                        private _code;
                        constructor(p_code: string);
                        public toString(): string;
                        public equals(other: any): boolean;
                        static _ModelTraceConstantsVALUES: ModelTraceConstants[];
                        static values(): ModelTraceConstants[];
                    }
                    class TraceSequence {
                        private _traces;
                        public traces(): ModelTrace[];
                        public populate(addtraces: java.util.List<ModelTrace>): TraceSequence;
                        public append(seq: TraceSequence): TraceSequence;
                        public parse(addtracesTxt: string): TraceSequence;
                        public toString(): string;
                        public applyOn(target: KObject<any, any>, callback: Callback<java.lang.Throwable>): boolean;
                        public reverse(): TraceSequence;
                    }
                    module unresolved {
                        class UnresolvedMetaAttribute implements meta.MetaAttribute {
                            private _metaName;
                            constructor(p_metaName: string);
                            public key(): boolean;
                            public origin(): meta.MetaClass;
                            public metaType(): meta.MetaType;
                            public strategy(): strategy.ExtrapolationStrategy;
                            public precision(): number;
                            public setExtrapolationStrategy(extrapolationStrategy: strategy.ExtrapolationStrategy): void;
                            public metaName(): string;
                            public index(): number;
                        }
                        class UnresolvedMetaClass implements meta.MetaClass {
                            private _metaName;
                            constructor(p_metaName: string);
                            public metaName(): string;
                            public index(): number;
                        }
                        class UnresolvedMetaReference implements meta.MetaReference {
                            private _metaName;
                            constructor(p_metaName: string);
                            public contained(): boolean;
                            public single(): boolean;
                            public metaType(): meta.MetaClass;
                            public opposite(): meta.MetaReference;
                            public origin(): meta.MetaClass;
                            public metaName(): string;
                            public index(): number;
                        }
                    }
                }
                class TraceRequest {
                    static ATTRIBUTES_ONLY: TraceRequest;
                    static REFERENCES_ONLY: TraceRequest;
                    static ATTRIBUTES_REFERENCES: TraceRequest;
                    public equals(other: any): boolean;
                    static _TraceRequestVALUES: TraceRequest[];
                    static values(): TraceRequest[];
                }
                module util {
                    interface CallBackChain<A> {
                        on(a: A, next: Callback<java.lang.Throwable>): void;
                    }
                    class Helper {
                        static pathSep: string;
                        private static pathIDOpen;
                        private static pathIDClose;
                        private static rootPath;
                        static forall<A>(inputs: A[], each: CallBackChain<A>, end: Callback<java.lang.Throwable>): void;
                        private static process<A>(arr, index, each, end);
                        static parentPath(currentPath: string): string;
                        static attachedToRoot(path: string): boolean;
                        static isRoot(path: string): boolean;
                        static path(parent: string, reference: meta.MetaReference, target: KObject<any, any>): string;
                    }
                }
                class VisitResult {
                    static CONTINUE: VisitResult;
                    static SKIP: VisitResult;
                    static STOP: VisitResult;
                    public equals(other: any): boolean;
                    static _VisitResultVALUES: VisitResult[];
                    static values(): VisitResult[];
                }
                module xmi {
                    class AttributesVisitor implements ModelAttributeVisitor {
                        private context;
                        constructor(context: SerializationContext);
                        public visit(metaAttribute: meta.MetaAttribute, value: any): void;
                    }
                    class ContainedReferencesCallbackChain implements util.CallBackChain<meta.MetaReference> {
                        private context;
                        private currentElement;
                        constructor(context: SerializationContext, currentElement: KObject<any, any>);
                        public on(ref: meta.MetaReference, nextReference: Callback<java.lang.Throwable>): void;
                    }
                    class NonContainedReferencesCallbackChain implements util.CallBackChain<meta.MetaReference> {
                        private _context;
                        private _currentElement;
                        constructor(p_context: SerializationContext, p_currentElement: KObject<any, any>);
                        public on(ref: meta.MetaReference, next: Callback<java.lang.Throwable>): void;
                    }
                    class PrettyPrinter implements Callback<java.lang.Throwable> {
                        private context;
                        constructor(context: SerializationContext);
                        public on(throwable: java.lang.Throwable): void;
                    }
                    class SerializationContext {
                        public ignoreGeneratedID: boolean;
                        public model: KObject<any, any>;
                        public finishCallback: ThrowableCallback<string>;
                        public printer: java.lang.StringBuilder;
                        public attributesVisitor: AttributesVisitor;
                        public addressTable: java.util.HashMap<number, string>;
                        public elementsCount: java.util.HashMap<string, number>;
                        public packageList: java.util.ArrayList<string>;
                    }
                    class XMILoadingContext {
                        public xmiReader: XmlParser;
                        public loadedRoots: KObject<any, any>;
                        public resolvers: java.util.ArrayList<XMIResolveCommand>;
                        public map: java.util.HashMap<string, KObject<any, any>>;
                        public elementsCount: java.util.HashMap<string, number>;
                        public stats: java.util.HashMap<string, number>;
                        public oppositesAlreadySet: java.util.HashMap<string, boolean>;
                        public successCallback: Callback<java.lang.Throwable>;
                        public isOppositeAlreadySet(localRef: string, oppositeRef: string): boolean;
                        public storeOppositeRelation(localRef: string, oppositeRef: string): void;
                    }
                    class XMIModelLoader implements ModelLoader {
                        private _factory;
                        static LOADER_XMI_LOCAL_NAME: string;
                        static LOADER_XMI_XSI: string;
                        static LOADER_XMI_NS_URI: string;
                        constructor(p_factory: KView);
                        static unescapeXml(src: string): string;
                        public load(str: string, callback: Callback<java.lang.Throwable>): void;
                        private deserialize(context);
                        private callFactory(ctx, objectType);
                        private loadObject(ctx, xmiAddress, objectType);
                    }
                    class XMIModelSerializer implements ModelSerializer {
                        public serialize(model: KObject<any, any>, callback: ThrowableCallback<string>): void;
                        static escapeXml(ostream: java.lang.StringBuilder, chain: string): void;
                        static formatMetaClassName(metaClassName: string): string;
                    }
                    class XMIResolveCommand {
                        private context;
                        private target;
                        private mutatorType;
                        private refName;
                        private ref;
                        constructor(context: XMILoadingContext, target: KObject<any, any>, mutatorType: KActionType, refName: string, ref: string);
                        public run(): void;
                    }
                    class XmlParser {
                        private payload;
                        private current;
                        private currentChar;
                        private tagName;
                        private tagPrefix;
                        private attributePrefix;
                        private readSingleton;
                        private attributesNames;
                        private attributesPrefixes;
                        private attributesValues;
                        private attributeName;
                        private attributeValue;
                        constructor(str: string);
                        public getTagPrefix(): string;
                        public hasNext(): boolean;
                        public getLocalName(): string;
                        public getAttributeCount(): number;
                        public getAttributeLocalName(i: number): string;
                        public getAttributePrefix(i: number): string;
                        public getAttributeValue(i: number): string;
                        private readChar();
                        public next(): XmlToken;
                        private read_lessThan();
                        private read_upperThan();
                        private read_xmlHeader();
                        private read_closingTag();
                        private read_openTag();
                        private read_tagName();
                        private read_attributes();
                    }
                    class XmlToken {
                        static XML_HEADER: XmlToken;
                        static END_DOCUMENT: XmlToken;
                        static START_TAG: XmlToken;
                        static END_TAG: XmlToken;
                        static COMMENT: XmlToken;
                        static SINGLETON_TAG: XmlToken;
                        public equals(other: any): boolean;
                        static _XmlTokenVALUES: XmlToken[];
                        static values(): XmlToken[];
                    }
                }
            }
        }
    }
}
