declare module org {
    module kevoree {
        module modeling {
            module api {
                module abs {
                    class AbstractKDimension<A extends KView, B extends KDimension<any, any, any>, C extends KUniverse<any>> implements KDimension<any, any, any> {
                        private _universe;
                        private _key;
                        constructor(p_universe: KUniverse<any>, p_key: number);
                        public key(): number;
                        public universe(): C;
                        public save(callback: (p: java.lang.Throwable) => void): void;
                        public saveUnload(callback: (p: java.lang.Throwable) => void): void;
                        public delete(callback: (p: java.lang.Throwable) => void): void;
                        public discard(callback: (p: java.lang.Throwable) => void): void;
                        public parent(callback: (p: B) => void): void;
                        public children(callback: (p: B[]) => void): void;
                        public fork(callback: (p: B) => void): void;
                        public time(timePoint: number): A;
                        public listen(listener: (p: KEvent) => void, scope: event.ListenerScope): void;
                        public internal_create(timePoint: number): A;
                        public equals(obj: any): boolean;
                    }
                    class AbstractKObject<A extends KObject<any, any>, B extends KView> implements KObject<any, any> {
                        private _view;
                        private _uuid;
                        private _timeTree;
                        private _metaClass;
                        constructor(p_view: B, p_uuid: number, p_timeTree: time.TimeTree, p_metaClass: meta.MetaClass);
                        public view(): B;
                        public uuid(): number;
                        public metaClass(): meta.MetaClass;
                        public isRoot(): boolean;
                        public setRoot(isRoot: boolean): void;
                        public now(): number;
                        public timeTree(): time.TimeTree;
                        public dimension(): KDimension<any, any, any>;
                        public path(callback: (p: string) => void): void;
                        public parentUuid(): number;
                        public parent(callback: (p: KObject<any, any>) => void): void;
                        public referenceInParent(): meta.MetaReference;
                        public delete(callback: (p: java.lang.Throwable) => void): void;
                        public select(query: string, callback: (p: KObject<any, any>[]) => void): void;
                        public stream(query: string, callback: (p: KObject<any, any>) => void): void;
                        public listen(listener: (p: KEvent) => void, scope: event.ListenerScope): void;
                        public jump(time: number, callback: (p: A) => void): void;
                        public domainKey(): string;
                        public get(attribute: meta.MetaAttribute): any;
                        public set(attribute: meta.MetaAttribute, payload: any): void;
                        private getCreateOrUpdatePayloadList(obj, payloadIndex);
                        private removeFromContainer(param);
                        public mutate(actionType: KActionType, metaReference: meta.MetaReference, param: KObject<any, any>, setOpposite: boolean): void;
                        public size(metaReference: meta.MetaReference): number;
                        public each<C extends KObject<any, any>>(metaReference: meta.MetaReference, callback: (p: C) => void, end: (p: java.lang.Throwable) => void): void;
                        public visitAttributes(visitor: (p: meta.MetaAttribute, p1: any) => void): void;
                        public metaAttribute(name: string): meta.MetaAttribute;
                        public metaReference(name: string): meta.MetaReference;
                        public metaOperation(name: string): meta.MetaOperation;
                        public visit(visitor: (p: KObject<any, any>) => VisitResult, end: (p: java.lang.Throwable) => void): void;
                        private internal_visit(visitor, end, deep, treeOnly, alreadyVisited);
                        public graphVisit(visitor: (p: KObject<any, any>) => VisitResult, end: (p: java.lang.Throwable) => void): void;
                        public treeVisit(visitor: (p: KObject<any, any>) => VisitResult, end: (p: java.lang.Throwable) => void): void;
                        public toJSON(): string;
                        public toString(): string;
                        public traces(request: TraceRequest): trace.ModelTrace[];
                        public inbounds(callback: (p: InboundReference) => void, end: (p: java.lang.Throwable) => void): void;
                        public set_parent(p_parentKID: number, p_metaReference: meta.MetaReference): void;
                        public metaAttributes(): meta.MetaAttribute[];
                        public metaReferences(): meta.MetaReference[];
                        public metaOperations(): meta.MetaOperation[];
                        public equals(obj: any): boolean;
                        public diff(target: KObject<any, any>, callback: (p: trace.TraceSequence) => void): void;
                        public merge(target: KObject<any, any>, callback: (p: trace.TraceSequence) => void): void;
                        public intersection(target: KObject<any, any>, callback: (p: trace.TraceSequence) => void): void;
                        public clone(callback: (p: A) => void): void;
                    }
                    class AbstractKUniverse<A extends KDimension<any, any, any>> implements KUniverse<any> {
                        private _storage;
                        constructor();
                        public connect(callback: (p: java.lang.Throwable) => void): void;
                        public close(callback: (p: java.lang.Throwable) => void): void;
                        public storage(): data.KStore;
                        public newDimension(): A;
                        public internal_create(key: number): A;
                        public dimension(key: number): A;
                        public saveAll(callback: (p: boolean) => void): void;
                        public deleteAll(callback: (p: boolean) => void): void;
                        public unloadAll(callback: (p: boolean) => void): void;
                        public disable(listener: (p: KEvent) => void): void;
                        public stream(query: string, callback: (p: KObject<any, any>) => void): void;
                        public listen(listener: (p: KEvent) => void, scope: event.ListenerScope): void;
                        public setEventBroker(eventBroker: event.KEventBroker): KUniverse<any>;
                        public setDataBase(dataBase: data.KDataBase): KUniverse<any>;
                        public setOperation(metaOperation: meta.MetaOperation, operation: (p: KObject<any, any>, p1: any[], p2: (p: any) => void) => void): void;
                    }
                    class AbstractKView implements KView {
                        private _now;
                        private _dimension;
                        constructor(p_now: number, p_dimension: KDimension<any, any, any>);
                        public now(): number;
                        public dimension(): KDimension<any, any, any>;
                        public metaClass(fqName: string): meta.MetaClass;
                        public createFQN(metaClassName: string): KObject<any, any>;
                        public setRoot(elem: KObject<any, any>, callback: (p: java.lang.Throwable) => void): void;
                        public select(query: string, callback: (p: KObject<any, any>[]) => void): void;
                        public lookup(kid: number, callback: (p: KObject<any, any>) => void): void;
                        public lookupAll(keys: number[], callback: (p: KObject<any, any>[]) => void): void;
                        public stream(query: string, callback: (p: KObject<any, any>) => void): void;
                        public createProxy(clazz: meta.MetaClass, timeTree: time.TimeTree, key: number): KObject<any, any>;
                        public create(clazz: meta.MetaClass): KObject<any, any>;
                        public listen(listener: (p: KEvent) => void, scope: event.ListenerScope): void;
                        public internalCreate(clazz: meta.MetaClass, timeTree: time.TimeTree, key: number): KObject<any, any>;
                        public metaClasses(): meta.MetaClass[];
                        public slice(elems: java.util.List<KObject<any, any>>, callback: (p: trace.TraceSequence) => void): void;
                        public json(): ModelFormat;
                        public xmi(): ModelFormat;
                        public equals(obj: any): boolean;
                    }
                }
                interface Callback<A> {
                    on(a: A): void;
                }
                module data {
                    class AccessMode {
                        static READ: AccessMode;
                        static WRITE: AccessMode;
                        static DELETE: AccessMode;
                        public equals(other: any): boolean;
                        static _AccessModeVALUES: AccessMode[];
                        static values(): AccessMode[];
                    }
                    module cache {
                        class DimensionCache {
                            public timeTreeCache: java.util.Map<number, time.TimeTree>;
                            public timesCaches: java.util.Map<number, TimeCache>;
                            public roots: time.rbtree.LongRBTree;
                        }
                        class TimeCache {
                            public payload_cache: java.util.Map<number, CacheEntry>;
                            public root: KObject<any, any>;
                            public rootDirty: boolean;
                        }
                    }
                    class CacheEntry {
                        public timeTree: time.TimeTree;
                        public metaClass: meta.MetaClass;
                        public raw: any[];
                    }
                    class DefaultKStore implements KStore {
                        static KEY_SEP: string;
                        private _db;
                        private caches;
                        private _eventBroker;
                        private _operationManager;
                        private _objectKeyCalculator;
                        private _dimensionKeyCalculator;
                        private isConnected;
                        private static UNIVERSE_NOT_CONNECTED_ERROR;
                        private static OUT_OF_CACHE_MESSAGE;
                        private static INDEX_RESOLVED_DIM;
                        private static INDEX_RESOLVED_TIME;
                        private static INDEX_RESOLVED_TIMETREE;
                        constructor();
                        public connect(callback: (p: java.lang.Throwable) => void): void;
                        public close(callback: (p: java.lang.Throwable) => void): void;
                        private keyTree(dim, key);
                        private keyRoot(dim);
                        private keyRootTree(dim);
                        private keyPayload(dim, time, key);
                        private keyLastPrefix();
                        private keyLastDimIndex(prefix);
                        private keyLastObjIndex(prefix);
                        public nextDimensionKey(): number;
                        public nextObjectKey(): number;
                        public initDimension(dimension: KDimension<any, any, any>): void;
                        public initKObject(obj: KObject<any, any>, originView: KView): void;
                        public raw(origin: KObject<any, any>, accessMode: AccessMode): any[];
                        public discard(dimension: KDimension<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        public delete(dimension: KDimension<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        public save(dimension: KDimension<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        public saveUnload(dimension: KDimension<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        public lookup(originView: KView, key: number, callback: (p: KObject<any, any>) => void): void;
                        public lookupAll(originView: KView, keys: number[], callback: (p: KObject<any, any>[]) => void): void;
                        public getRoot(originView: KView, callback: (p: KObject<any, any>) => void): void;
                        public setRoot(newRoot: KObject<any, any>, callback: (p: java.lang.Throwable) => void): void;
                        public eventBroker(): event.KEventBroker;
                        public setEventBroker(p_eventBroker: event.KEventBroker): void;
                        public dataBase(): KDataBase;
                        public setDataBase(p_dataBase: KDataBase): void;
                        public operationManager(): util.KOperationManager;
                        private read_cache(dimensionKey, timeKey, uuid);
                        private write_cache(dimensionKey, timeKey, uuid, cacheEntry);
                        private write_tree(dimensionKey, uuid, timeTree);
                        private write_roots(dimensionKey, timeTree);
                        private size_dirties(dimensionCache);
                        private internal_resolve_dim_time(originView, uuids, callback);
                        private resolve_timeTrees(dimension, keys, callback);
                        private resolve_roots(dimension, callback);
                    }
                    class IDRange {
                        private min;
                        private current;
                        private max;
                        private threshold;
                        constructor(min: number, max: number, threshold: number);
                        public newUuid(): number;
                        public isThresholdReached(): boolean;
                        public isEmpty(): boolean;
                    }
                    class Index {
                        static PARENT_INDEX: number;
                        static INBOUNDS_INDEX: number;
                        static IS_DIRTY_INDEX: number;
                        static IS_ROOT_INDEX: number;
                        static REF_IN_PARENT_INDEX: number;
                        static RESERVED_INDEXES: number;
                    }
                    class JsonRaw {
                        static SEP: string;
                        static decode(payload: string, currentView: KView, now: number): CacheEntry;
                        static encode(raw: any[], uuid: number, p_metaClass: meta.MetaClass): string;
                    }
                    interface KDataBase {
                        get(keys: string[], callback: (p: string[], p1: java.lang.Throwable) => void): void;
                        put(payloads: string[][], error: (p: java.lang.Throwable) => void): void;
                        remove(keys: string[], error: (p: java.lang.Throwable) => void): void;
                        commit(error: (p: java.lang.Throwable) => void): void;
                        close(error: (p: java.lang.Throwable) => void): void;
                    }
                    class KeyCalculator {
                        static LONG_LIMIT_JS: number;
                        static INDEX_LIMIT: number;
                        private _prefix;
                        private _currentIndex;
                        constructor(prefix: number, currentIndex: number);
                        public nextKey(): number;
                        public lastComputedIndex(): number;
                        public prefix(): number;
                    }
                    interface KStore {
                        lookup(originView: KView, key: number, callback: (p: KObject<any, any>) => void): void;
                        lookupAll(originView: KView, key: number[], callback: (p: KObject<any, any>[]) => void): void;
                        raw(origin: KObject<any, any>, accessMode: AccessMode): any[];
                        save(dimension: KDimension<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        saveUnload(dimension: KDimension<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        discard(dimension: KDimension<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        delete(dimension: KDimension<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        initKObject(obj: KObject<any, any>, originView: KView): void;
                        initDimension(dimension: KDimension<any, any, any>): void;
                        nextDimensionKey(): number;
                        nextObjectKey(): number;
                        getRoot(originView: KView, callback: (p: KObject<any, any>) => void): void;
                        setRoot(newRoot: KObject<any, any>, callback: (p: java.lang.Throwable) => void): void;
                        eventBroker(): event.KEventBroker;
                        setEventBroker(broker: event.KEventBroker): void;
                        dataBase(): KDataBase;
                        setDataBase(dataBase: KDataBase): void;
                        operationManager(): util.KOperationManager;
                        connect(callback: (p: java.lang.Throwable) => void): void;
                        close(callback: (p: java.lang.Throwable) => void): void;
                    }
                    class MemoryKDataBase implements KDataBase {
                        private backend;
                        static DEBUG: boolean;
                        public put(payloads: string[][], callback: (p: java.lang.Throwable) => void): void;
                        public get(keys: string[], callback: (p: string[], p1: java.lang.Throwable) => void): void;
                        public remove(keys: string[], callback: (p: java.lang.Throwable) => void): void;
                        public commit(callback: (p: java.lang.Throwable) => void): void;
                        public close(callback: (p: java.lang.Throwable) => void): void;
                    }
                }
                module event {
                    class DefaultKBroker implements KEventBroker {
                        private universeListeners;
                        private dimensionListeners;
                        private timeListeners;
                        private objectListeners;
                        constructor();
                        public registerListener(origin: any, listener: (p: KEvent) => void, scope: ListenerScope): void;
                        public notify(event: KEvent): void;
                        public flush(dimensionKey: number): void;
                    }
                    class DefaultKEvent implements KEvent {
                        private _dimensionKey;
                        private _time;
                        private _uuid;
                        private _actionType;
                        private _metaClass;
                        private _metaElement;
                        private _value;
                        private static LEFT_BRACE;
                        private static RIGHT_BRACE;
                        private static DIMENSION_KEY;
                        private static TIME_KEY;
                        private static UUID_KEY;
                        private static TYPE_KEY;
                        private static CLASS_KEY;
                        private static ELEMENT_KEY;
                        private static VALUE_KEY;
                        constructor(p_type: KActionType, p_source: KObject<any, any>, p_meta: meta.Meta, p_newValue: any);
                        public dimension(): number;
                        public time(): number;
                        public uuid(): number;
                        public actionType(): KActionType;
                        public metaClass(): meta.MetaClass;
                        public metaElement(): meta.Meta;
                        public value(): any;
                        public toString(): string;
                        public toJSON(): string;
                        static fromJSON(payload: string): KEvent;
                        private static setEventAttribute(event, currentAttributeName, value);
                    }
                    interface KEventBroker {
                        registerListener(origin: any, listener: (p: KEvent) => void, scope: ListenerScope): void;
                        notify(event: KEvent): void;
                        flush(dimensionKey: number): void;
                    }
                    class ListenerRegistration {
                        public _scope: ListenerScope;
                        public _listener: (p: KEvent) => void;
                        public _dim: number;
                        public _time: number;
                        public _uuid: number;
                        constructor(plistener: (p: KEvent) => void, pscope: ListenerScope, pdim: number, ptime: number, puuid: number);
                        public scope(): ListenerScope;
                        public listener(): (p: KEvent) => void;
                        public dimension(): number;
                        public time(): number;
                        public uuid(): number;
                    }
                    class ListenerScope {
                        static TIME: ListenerScope;
                        static DIMENSION: ListenerScope;
                        static UNIVERSE: ListenerScope;
                        private _value;
                        constructor(pvalue: number);
                        public value(): number;
                        public equals(other: any): boolean;
                        static _ListenerScopeVALUES: ListenerScope[];
                        static values(): ListenerScope[];
                    }
                }
                module extrapolation {
                    class DiscreteExtrapolation implements Extrapolation {
                        private static INSTANCE;
                        static instance(): Extrapolation;
                        public extrapolate(current: KObject<any, any>, attribute: meta.MetaAttribute): any;
                        public mutate(current: KObject<any, any>, attribute: meta.MetaAttribute, payload: any): void;
                        public save(cache: any): string;
                        public load(payload: string, attribute: meta.MetaAttribute, now: number): any;
                        static convertRaw(attribute: meta.MetaAttribute, raw: any): any;
                    }
                    interface Extrapolation {
                        extrapolate(current: KObject<any, any>, attribute: meta.MetaAttribute): any;
                        mutate(current: KObject<any, any>, attribute: meta.MetaAttribute, payload: any): void;
                        save(cache: any): string;
                        load(payload: string, attribute: meta.MetaAttribute, now: number): any;
                    }
                    class PolynomialExtrapolation implements Extrapolation {
                        private static INSTANCE;
                        public extrapolate(current: KObject<any, any>, attribute: meta.MetaAttribute): any;
                        public mutate(current: KObject<any, any>, attribute: meta.MetaAttribute, payload: any): void;
                        public save(cache: any): string;
                        public load(payload: string, attribute: meta.MetaAttribute, now: number): any;
                        static instance(): Extrapolation;
                    }
                }
                class InboundReference {
                    private reference;
                    private object;
                    constructor(reference: meta.MetaReference, object: KObject<any, any>);
                    public getReference(): meta.MetaReference;
                    public getObject(): KObject<any, any>;
                }
                module json {
                    class JsonFormat implements ModelFormat {
                        private _view;
                        constructor(p_view: KView);
                        public save(model: KObject<any, any>, callback: (p: string, p1: java.lang.Throwable) => void): void;
                        public load(payload: string, callback: (p: java.lang.Throwable) => void): void;
                    }
                    class JsonModelLoader {
                        static load(factory: KView, payload: string, callback: (p: java.lang.Throwable) => void): void;
                    }
                    class JsonModelSerializer {
                        static KEY_META: string;
                        static KEY_UUID: string;
                        static KEY_ROOT: string;
                        static PARENT_META: string;
                        static PARENT_REF_META: string;
                        static INBOUNDS_META: string;
                        static serialize(model: KObject<any, any>, callback: (p: string, p1: java.lang.Throwable) => void): void;
                        static printJSON(elem: KObject<any, any>, builder: java.lang.StringBuilder): void;
                    }
                    class JsonString {
                        private static ESCAPE_CHAR;
                        static encodeBuffer(buffer: java.lang.StringBuilder, chain: string): void;
                        static encode(chain: string): string;
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
                    static CALL: KActionType;
                    static SET: KActionType;
                    static ADD: KActionType;
                    static REMOVE: KActionType;
                    static NEW: KActionType;
                    private _code;
                    constructor(code: string);
                    public toString(): string;
                    public code(): string;
                    static parse(s: string): KActionType;
                    public equals(other: any): boolean;
                    static _KActionTypeVALUES: KActionType[];
                    static values(): KActionType[];
                }
                interface KDimension<A extends KView, B extends KDimension<any, any, any>, C extends KUniverse<any>> {
                    key(): number;
                    parent(callback: (p: B) => void): void;
                    children(callback: (p: B[]) => void): void;
                    fork(callback: (p: B) => void): void;
                    save(callback: (p: java.lang.Throwable) => void): void;
                    saveUnload(callback: (p: java.lang.Throwable) => void): void;
                    delete(callback: (p: java.lang.Throwable) => void): void;
                    discard(callback: (p: java.lang.Throwable) => void): void;
                    time(timePoint: number): A;
                    universe(): C;
                    equals(other: any): boolean;
                }
                interface KEvent {
                    dimension(): number;
                    time(): number;
                    uuid(): number;
                    actionType(): KActionType;
                    metaClass(): meta.MetaClass;
                    metaElement(): meta.Meta;
                    value(): any;
                    toJSON(): string;
                }
                interface KObject<A extends KObject<any, any>, B extends KView> {
                    dimension(): KDimension<any, any, any>;
                    isRoot(): boolean;
                    uuid(): number;
                    path(callback: (p: string) => void): void;
                    view(): B;
                    delete(callback: (p: java.lang.Throwable) => void): void;
                    parent(callback: (p: KObject<any, any>) => void): void;
                    parentUuid(): number;
                    select(query: string, callback: (p: KObject<any, any>[]) => void): void;
                    stream(query: string, callback: (p: KObject<any, any>) => void): void;
                    listen(listener: (p: KEvent) => void, scope: event.ListenerScope): void;
                    visitAttributes(visitor: (p: meta.MetaAttribute, p1: any) => void): void;
                    visit(visitor: (p: KObject<any, any>) => VisitResult, end: (p: java.lang.Throwable) => void): void;
                    graphVisit(visitor: (p: KObject<any, any>) => VisitResult, end: (p: java.lang.Throwable) => void): void;
                    treeVisit(visitor: (p: KObject<any, any>) => VisitResult, end: (p: java.lang.Throwable) => void): void;
                    now(): number;
                    jump(time: number, callback: (p: A) => void): void;
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
                    each<C extends KObject<any, any>>(metaReference: meta.MetaReference, callback: (p: C) => void, end: (p: java.lang.Throwable) => void): void;
                    inbounds(callback: (p: InboundReference) => void, end: (p: java.lang.Throwable) => void): void;
                    traces(request: TraceRequest): trace.ModelTrace[];
                    get(attribute: meta.MetaAttribute): any;
                    set(attribute: meta.MetaAttribute, payload: any): void;
                    toJSON(): string;
                    equals(other: any): boolean;
                    diff(target: KObject<any, any>, callback: (p: trace.TraceSequence) => void): void;
                    merge(target: KObject<any, any>, callback: (p: trace.TraceSequence) => void): void;
                    intersection(target: KObject<any, any>, callback: (p: trace.TraceSequence) => void): void;
                    clone(callback: (p: A) => void): void;
                }
                interface KOperation {
                    on(source: KObject<any, any>, params: any[], result: (p: any) => void): void;
                }
                interface KUniverse<A extends KDimension<any, any, any>> {
                    connect(callback: (p: java.lang.Throwable) => void): void;
                    close(callback: (p: java.lang.Throwable) => void): void;
                    newDimension(): A;
                    dimension(key: number): A;
                    saveAll(callback: (p: boolean) => void): void;
                    deleteAll(callback: (p: boolean) => void): void;
                    unloadAll(callback: (p: boolean) => void): void;
                    disable(listener: (p: KEvent) => void): void;
                    stream(query: string, callback: (p: KObject<any, any>) => void): void;
                    storage(): data.KStore;
                    listen(listener: (p: KEvent) => void, scope: event.ListenerScope): void;
                    setEventBroker(eventBroker: event.KEventBroker): KUniverse<any>;
                    setDataBase(dataBase: data.KDataBase): KUniverse<any>;
                    setOperation(metaOperation: meta.MetaOperation, operation: (p: KObject<any, any>, p1: any[], p2: (p: any) => void) => void): void;
                }
                interface KView {
                    createFQN(metaClassName: string): KObject<any, any>;
                    create(clazz: meta.MetaClass): KObject<any, any>;
                    setRoot(elem: KObject<any, any>, callback: (p: java.lang.Throwable) => void): void;
                    select(query: string, callback: (p: KObject<any, any>[]) => void): void;
                    lookup(key: number, callback: (p: KObject<any, any>) => void): void;
                    lookupAll(keys: number[], callback: (p: KObject<any, any>[]) => void): void;
                    stream(query: string, callback: (p: KObject<any, any>) => void): void;
                    metaClasses(): meta.MetaClass[];
                    metaClass(fqName: string): meta.MetaClass;
                    dimension(): KDimension<any, any, any>;
                    now(): number;
                    createProxy(clazz: meta.MetaClass, timeTree: time.TimeTree, key: number): KObject<any, any>;
                    listen(listener: (p: KEvent) => void, scope: event.ListenerScope): void;
                    slice(elems: java.util.List<KObject<any, any>>, callback: (p: trace.TraceSequence) => void): void;
                    json(): ModelFormat;
                    xmi(): ModelFormat;
                    equals(other: any): boolean;
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
                        strategy(): extrapolation.Extrapolation;
                        precision(): number;
                        setExtrapolation(extrapolation: extrapolation.Extrapolation): void;
                    }
                    interface MetaClass extends Meta {
                        metaAttributes(): MetaAttribute[];
                        metaReferences(): MetaReference[];
                        metaOperations(): MetaOperation[];
                        metaAttribute(name: string): MetaAttribute;
                        metaReference(name: string): MetaReference;
                        metaOperation(name: string): MetaOperation;
                    }
                    interface MetaOperation extends Meta {
                        origin(): MetaClass;
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
                interface ModelFormat {
                    save(model: KObject<any, any>, callback: (p: string, p1: java.lang.Throwable) => void): void;
                    load(payload: string, callback: (p: java.lang.Throwable) => void): void;
                }
                interface ModelListener {
                    on(evt: KEvent): void;
                }
                interface ModelVisitor {
                    visit(elem: KObject<any, any>): VisitResult;
                }
                module operation {
                    class DefaultModelCloner {
                        static clone<A extends KObject<any, any>>(originalObject: A, callback: (p: A) => void): void;
                    }
                    class DefaultModelCompare {
                        static diff(origin: KObject<any, any>, target: KObject<any, any>, callback: (p: trace.TraceSequence) => void): void;
                        static merge(origin: KObject<any, any>, target: KObject<any, any>, callback: (p: trace.TraceSequence) => void): void;
                        static intersection(origin: KObject<any, any>, target: KObject<any, any>, callback: (p: trace.TraceSequence) => void): void;
                        private static internal_diff(origin, target, inter, merge, callback);
                        private static internal_createTraces(current, sibling, inter, merge, references, attributes);
                    }
                    class DefaultModelSlicer {
                        private static internal_prune(elem, traces, cache, parentMap, callback);
                        static slice(elems: java.util.List<KObject<any, any>>, callback: (p: trace.TraceSequence) => void): void;
                    }
                }
                module polynomial {
                    class DefaultPolynomialModel implements PolynomialModel {
                        private weights;
                        private timeOrigin;
                        private samples;
                        private degradeFactor;
                        private prioritization;
                        private maxDegree;
                        private toleratedError;
                        private _lastIndex;
                        private static sep;
                        private _isDirty;
                        constructor(timeOrigin: number, toleratedError: number, maxDegree: number, degradeFactor: number, prioritization: util.Prioritization);
                        public getSamples(): java.util.List<util.DataSample>;
                        public getDegree(): number;
                        public getTimeOrigin(): number;
                        private getMaxErr(degree, toleratedError, maxDegree, prioritization);
                        private internal_feed(time, value);
                        private maxError(computedWeights, time, value);
                        public comparePolynome(p2: DefaultPolynomialModel, err: number): boolean;
                        private internal_extrapolate(time, weights);
                        public extrapolate(time: number): number;
                        public insert(time: number, value: number): boolean;
                        public lastIndex(): number;
                        public indexBefore(time: number): number;
                        public timesAfter(time: number): number[];
                        public save(): string;
                        public load(payload: string): void;
                        public isDirty(): boolean;
                    }
                    interface PolynomialModel {
                        extrapolate(time: number): number;
                        insert(time: number, value: number): boolean;
                        lastIndex(): number;
                        indexBefore(time: number): number;
                        timesAfter(time: number): number[];
                        save(): string;
                        load(payload: string): void;
                        isDirty(): boolean;
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
                        static select(root: KObject<any, any>, query: string, callback: (p: KObject<any, any>[]) => void): void;
                    }
                }
                interface ThrowableCallback<A> {
                    on(a: A, error: java.lang.Throwable): void;
                }
                module time {
                    class DefaultTimeTree implements TimeTree {
                        public dirty: boolean;
                        public versionTree: rbtree.RBTree;
                        public walk(walker: (p: number) => void): void;
                        public walkAsc(walker: (p: number) => void): void;
                        public walkDesc(walker: (p: number) => void): void;
                        public walkRangeAsc(walker: (p: number) => void, from: number, to: number): void;
                        public walkRangeDesc(walker: (p: number) => void, from: number, to: number): void;
                        public first(): number;
                        public last(): number;
                        public next(from: number): number;
                        public previous(from: number): number;
                        public resolve(time: number): number;
                        public insert(time: number): TimeTree;
                        public delete(time: number): TimeTree;
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
                        class LongRBTree {
                            public root: LongTreeNode;
                            private _size;
                            public dirty: boolean;
                            public size(): number;
                            public serialize(): string;
                            public unserialize(payload: string): void;
                            public previousOrEqual(key: number): LongTreeNode;
                            public nextOrEqual(key: number): LongTreeNode;
                            public previous(key: number): LongTreeNode;
                            public previousWhileNot(key: number, until: number): LongTreeNode;
                            public next(key: number): LongTreeNode;
                            public nextWhileNot(key: number, until: number): LongTreeNode;
                            public first(): LongTreeNode;
                            public last(): LongTreeNode;
                            public firstWhileNot(key: number, until: number): LongTreeNode;
                            public lastWhileNot(key: number, until: number): LongTreeNode;
                            private lookupNode(key);
                            public lookup(key: number): number;
                            private rotateLeft(n);
                            private rotateRight(n);
                            private replaceNode(oldn, newn);
                            public insert(key: number, value: number): void;
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
                        class LongTreeNode {
                            static BLACK: string;
                            static RED: string;
                            public key: number;
                            public value: number;
                            public color: Color;
                            private left;
                            private right;
                            private parent;
                            constructor(key: number, value: number, color: Color, left: LongTreeNode, right: LongTreeNode);
                            public grandparent(): LongTreeNode;
                            public sibling(): LongTreeNode;
                            public uncle(): LongTreeNode;
                            public getLeft(): LongTreeNode;
                            public setLeft(left: LongTreeNode): void;
                            public getRight(): LongTreeNode;
                            public setRight(right: LongTreeNode): void;
                            public getParent(): LongTreeNode;
                            public setParent(parent: LongTreeNode): void;
                            public serialize(builder: java.lang.StringBuilder): void;
                            public next(): LongTreeNode;
                            public previous(): LongTreeNode;
                            static unserialize(ctx: TreeReaderContext): LongTreeNode;
                            static internal_unserialize(rightBranch: boolean, ctx: TreeReaderContext): LongTreeNode;
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
                            static unserialize(ctx: TreeReaderContext): TreeNode;
                            static internal_unserialize(rightBranch: boolean, ctx: TreeReaderContext): TreeNode;
                        }
                        class TreeReaderContext {
                            public payload: string;
                            public index: number;
                            public buffer: string[];
                        }
                    }
                    interface TimeTree {
                        walk(walker: (p: number) => void): void;
                        walkAsc(walker: (p: number) => void): void;
                        walkDesc(walker: (p: number) => void): void;
                        walkRangeAsc(walker: (p: number) => void, from: number, to: number): void;
                        walkRangeDesc(walker: (p: number) => void, from: number, to: number): void;
                        first(): number;
                        last(): number;
                        next(from: number): number;
                        previous(from: number): number;
                        resolve(time: number): number;
                        insert(time: number): TimeTree;
                        delete(time: number): TimeTree;
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
                        public createOrAdd(previousPath: number, target: KObject<any, any>, reference: meta.MetaReference, metaClass: meta.MetaClass, callback: (p: java.lang.Throwable) => void): void;
                        public applyTraceSequence(traceSeq: TraceSequence, callback: (p: java.lang.Throwable) => void): void;
                        public applyTrace(trace: ModelTrace, callback: (p: java.lang.Throwable) => void): void;
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
                        public applyOn(target: KObject<any, any>, callback: (p: java.lang.Throwable) => void): boolean;
                        public reverse(): TraceSequence;
                    }
                    module unresolved {
                        class UnresolvedMetaAttribute implements meta.MetaAttribute {
                            private _metaName;
                            constructor(p_metaName: string);
                            public key(): boolean;
                            public origin(): meta.MetaClass;
                            public metaType(): meta.MetaType;
                            public strategy(): extrapolation.Extrapolation;
                            public precision(): number;
                            public setExtrapolation(extrapolation: extrapolation.Extrapolation): void;
                            public metaName(): string;
                            public index(): number;
                        }
                        class UnresolvedMetaClass implements meta.MetaClass {
                            private _metaName;
                            constructor(p_metaName: string);
                            public metaName(): string;
                            public index(): number;
                            public metaAttributes(): meta.MetaAttribute[];
                            public metaReferences(): meta.MetaReference[];
                            public metaOperations(): meta.MetaOperation[];
                            public metaAttribute(name: string): meta.MetaAttribute;
                            public metaReference(name: string): meta.MetaReference;
                            public metaOperation(name: string): meta.MetaOperation;
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
                        on(a: A, next: (p: java.lang.Throwable) => void): void;
                    }
                    class DefaultOperationManager implements KOperationManager {
                        private operationCallbacks;
                        private _store;
                        constructor(store: data.KStore);
                        public registerOperation(operation: meta.MetaOperation, callback: (p: KObject<any, any>, p1: any[], p2: (p: any) => void) => void): void;
                        public call(source: KObject<any, any>, operation: meta.MetaOperation, param: any[], callback: (p: any) => void): void;
                    }
                    class Helper {
                        static pathSep: string;
                        private static pathIDOpen;
                        private static pathIDClose;
                        private static rootPath;
                        static forall<A>(inputs: A[], each: (p: A, p1: (p: java.lang.Throwable) => void) => void, end: (p: java.lang.Throwable) => void): void;
                        private static process<A>(arr, index, each, end);
                        static parentPath(currentPath: string): string;
                        static attachedToRoot(path: string): boolean;
                        static isRoot(path: string): boolean;
                        static path(parent: string, reference: meta.MetaReference, target: KObject<any, any>): string;
                    }
                    interface KOperationManager {
                        registerOperation(operation: meta.MetaOperation, callback: (p: KObject<any, any>, p1: any[], p2: (p: any) => void) => void): void;
                        call(source: KObject<any, any>, operation: meta.MetaOperation, param: any[], callback: (p: any) => void): void;
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
                    class SerializationContext {
                        public ignoreGeneratedID: boolean;
                        public model: KObject<any, any>;
                        public finishCallback: (p: string, p1: java.lang.Throwable) => void;
                        public printer: java.lang.StringBuilder;
                        public attributesVisitor: (p: meta.MetaAttribute, p1: any) => void;
                        public addressTable: java.util.HashMap<number, string>;
                        public elementsCount: java.util.HashMap<string, number>;
                        public packageList: java.util.ArrayList<string>;
                    }
                    class XmiFormat implements ModelFormat {
                        private _view;
                        constructor(p_view: KView);
                        public save(model: KObject<any, any>, callback: (p: string, p1: java.lang.Throwable) => void): void;
                        public load(payload: string, callback: (p: java.lang.Throwable) => void): void;
                    }
                    class XMILoadingContext {
                        public xmiReader: XmlParser;
                        public loadedRoots: KObject<any, any>;
                        public resolvers: java.util.ArrayList<XMIResolveCommand>;
                        public map: java.util.HashMap<string, KObject<any, any>>;
                        public elementsCount: java.util.HashMap<string, number>;
                        public stats: java.util.HashMap<string, number>;
                        public oppositesAlreadySet: java.util.HashMap<string, boolean>;
                        public successCallback: (p: java.lang.Throwable) => void;
                        public isOppositeAlreadySet(localRef: string, oppositeRef: string): boolean;
                        public storeOppositeRelation(localRef: string, oppositeRef: string): void;
                    }
                    class XMIModelLoader {
                        private _factory;
                        static LOADER_XMI_LOCAL_NAME: string;
                        static LOADER_XMI_XSI: string;
                        static LOADER_XMI_NS_URI: string;
                        constructor(p_factory: KView);
                        static unescapeXml(src: string): string;
                        static load(p_view: KView, str: string, callback: (p: java.lang.Throwable) => void): void;
                        private static deserialize(p_view, context);
                        private static callFactory(p_view, ctx, objectType);
                        private static loadObject(p_view, ctx, xmiAddress, objectType);
                    }
                    class XMIModelSerializer {
                        static save(model: KObject<any, any>, callback: (p: string, p1: java.lang.Throwable) => void): void;
                        static escapeXml(ostream: java.lang.StringBuilder, chain: string): void;
                        static formatMetaClassName(metaClassName: string): string;
                        private static nonContainedReferencesCallbackChain(ref, next, p_context, p_currentElement);
                        private static containedReferencesCallbackChain(ref, nextReference, context, currentElement);
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
