declare module org {
    module kevoree {
        module modeling {
            module api {
                module abs {
                    class AbstractKDimension<A extends KView, B extends KDimension<any, any, any>, C extends KUniverse<any>> implements KDimension<any, any, any> {
                        private _universe;
                        private _key;
                        constructor(p_universe: KUniverse<any>, p_key: number);
                        key(): number;
                        universe(): C;
                        save(callback: (p: java.lang.Throwable) => void): void;
                        saveUnload(callback: (p: java.lang.Throwable) => void): void;
                        delete(callback: (p: java.lang.Throwable) => void): void;
                        discard(callback: (p: java.lang.Throwable) => void): void;
                        parent(callback: (p: B) => void): void;
                        children(callback: (p: B[]) => void): void;
                        fork(callback: (p: B) => void): void;
                        time(timePoint: number): A;
                        listen(listener: (p: KEvent) => void, scope: event.ListenerScope): void;
                        internal_create(timePoint: number): A;
                        equals(obj: any): boolean;
                    }
                    class AbstractKObject implements KObject {
                        private _view;
                        private _uuid;
                        private _timeTree;
                        private _metaClass;
                        constructor(p_view: KView, p_uuid: number, p_timeTree: time.TimeTree, p_metaClass: meta.MetaClass);
                        view(): KView;
                        uuid(): number;
                        metaClass(): meta.MetaClass;
                        isRoot(): boolean;
                        setRoot(isRoot: boolean): void;
                        now(): number;
                        timeTree(): time.TimeTree;
                        dimension(): KDimension<any, any, any>;
                        path(callback: (p: string) => void): void;
                        parentUuid(): number;
                        parent(callback: (p: KObject) => void): void;
                        referenceInParent(): meta.MetaReference;
                        delete(callback: (p: java.lang.Throwable) => void): void;
                        select(query: string, callback: (p: KObject[]) => void): void;
                        stream(query: string, callback: (p: KObject) => void): void;
                        listen(listener: (p: KEvent) => void, scope: event.ListenerScope): void;
                        domainKey(): string;
                        get(attribute: meta.MetaAttribute): any;
                        set(attribute: meta.MetaAttribute, payload: any): void;
                        private getCreateOrUpdatePayloadList(obj, payloadIndex);
                        private removeFromContainer(param);
                        mutate(actionType: KActionType, metaReference: meta.MetaReference, param: KObject, setOpposite: boolean): void;
                        size(metaReference: meta.MetaReference): number;
                        each<C extends KObject>(metaReference: meta.MetaReference, callback: (p: C) => void, end: (p: java.lang.Throwable) => void): void;
                        visitAttributes(visitor: (p: meta.MetaAttribute, p1: any) => void): void;
                        metaAttribute(name: string): meta.MetaAttribute;
                        metaReference(name: string): meta.MetaReference;
                        metaOperation(name: string): meta.MetaOperation;
                        visit(visitor: (p: KObject) => VisitResult, end: (p: java.lang.Throwable) => void): void;
                        private internal_visit(visitor, end, deep, treeOnly, alreadyVisited);
                        graphVisit(visitor: (p: KObject) => VisitResult, end: (p: java.lang.Throwable) => void): void;
                        treeVisit(visitor: (p: KObject) => VisitResult, end: (p: java.lang.Throwable) => void): void;
                        toJSON(): string;
                        toString(): string;
                        traces(request: TraceRequest): trace.ModelTrace[];
                        inbounds(callback: (p: InboundReference) => void, end: (p: java.lang.Throwable) => void): void;
                        set_parent(p_parentKID: number, p_metaReference: meta.MetaReference): void;
                        metaAttributes(): meta.MetaAttribute[];
                        metaReferences(): meta.MetaReference[];
                        metaOperations(): meta.MetaOperation[];
                        equals(obj: any): boolean;
                        diff(target: KObject, callback: (p: trace.TraceSequence) => void): void;
                        merge(target: KObject, callback: (p: trace.TraceSequence) => void): void;
                        intersection(target: KObject, callback: (p: trace.TraceSequence) => void): void;
                        slice(callback: (p: trace.TraceSequence) => void): void;
                        jump<U extends KObject>(time: number, callback: (p: U) => void): void;
                    }
                    class AbstractKUniverse<A extends KDimension<any, any, any>> implements KUniverse<any> {
                        private _storage;
                        constructor();
                        connect(callback: (p: java.lang.Throwable) => void): void;
                        close(callback: (p: java.lang.Throwable) => void): void;
                        storage(): data.KStore;
                        newDimension(): A;
                        internal_create(key: number): A;
                        dimension(key: number): A;
                        saveAll(callback: (p: boolean) => void): void;
                        deleteAll(callback: (p: boolean) => void): void;
                        unloadAll(callback: (p: boolean) => void): void;
                        disable(listener: (p: KEvent) => void): void;
                        stream(query: string, callback: (p: KObject) => void): void;
                        listen(listener: (p: KEvent) => void, scope: event.ListenerScope): void;
                        setEventBroker(eventBroker: event.KEventBroker): KUniverse<any>;
                        setDataBase(dataBase: data.KDataBase): KUniverse<any>;
                        setOperation(metaOperation: meta.MetaOperation, operation: (p: KObject, p1: any[], p2: (p: any) => void) => void): void;
                    }
                    class AbstractKView implements KView {
                        private _now;
                        private _dimension;
                        constructor(p_now: number, p_dimension: KDimension<any, any, any>);
                        now(): number;
                        dimension(): KDimension<any, any, any>;
                        metaClass(fqName: string): meta.MetaClass;
                        createFQN(metaClassName: string): KObject;
                        setRoot(elem: KObject, callback: (p: java.lang.Throwable) => void): void;
                        select(query: string, callback: (p: KObject[]) => void): void;
                        lookup(kid: number, callback: (p: KObject) => void): void;
                        lookupAll(keys: number[], callback: (p: KObject[]) => void): void;
                        stream(query: string, callback: (p: KObject) => void): void;
                        createProxy(clazz: meta.MetaClass, timeTree: time.TimeTree, key: number): KObject;
                        create(clazz: meta.MetaClass): KObject;
                        listen(listener: (p: KEvent) => void, scope: event.ListenerScope): void;
                        internalCreate(clazz: meta.MetaClass, timeTree: time.TimeTree, key: number): KObject;
                        metaClasses(): meta.MetaClass[];
                        slice(elems: java.util.List<KObject>, callback: (p: trace.TraceSequence) => void): void;
                        json(): ModelFormat;
                        xmi(): ModelFormat;
                        equals(obj: any): boolean;
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
                        equals(other: any): boolean;
                        static _AccessModeVALUES: AccessMode[];
                        static values(): AccessMode[];
                    }
                    module cache {
                        class DimensionCache {
                            timeTreeCache: java.util.Map<number, time.TimeTree>;
                            timesCaches: java.util.Map<number, TimeCache>;
                            roots: time.rbtree.LongRBTree;
                        }
                        class TimeCache {
                            payload_cache: java.util.Map<number, CacheEntry>;
                            root: KObject;
                            rootDirty: boolean;
                        }
                    }
                    class CacheEntry {
                        timeTree: time.TimeTree;
                        metaClass: meta.MetaClass;
                        raw: any[];
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
                        connect(callback: (p: java.lang.Throwable) => void): void;
                        close(callback: (p: java.lang.Throwable) => void): void;
                        private keyTree(dim, key);
                        private keyRoot(dim);
                        private keyRootTree(dim);
                        private keyPayload(dim, time, key);
                        private keyLastPrefix();
                        private keyLastDimIndex(prefix);
                        private keyLastObjIndex(prefix);
                        nextDimensionKey(): number;
                        nextObjectKey(): number;
                        initDimension(dimension: KDimension<any, any, any>): void;
                        initKObject(obj: KObject, originView: KView): void;
                        raw(origin: KObject, accessMode: AccessMode): any[];
                        discard(dimension: KDimension<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        delete(dimension: KDimension<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        save(dimension: KDimension<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        saveUnload(dimension: KDimension<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        lookup(originView: KView, key: number, callback: (p: KObject) => void): void;
                        lookupAll(originView: KView, keys: number[], callback: (p: KObject[]) => void): void;
                        getRoot(originView: KView, callback: (p: KObject) => void): void;
                        setRoot(newRoot: KObject, callback: (p: java.lang.Throwable) => void): void;
                        eventBroker(): event.KEventBroker;
                        setEventBroker(p_eventBroker: event.KEventBroker): void;
                        dataBase(): KDataBase;
                        setDataBase(p_dataBase: KDataBase): void;
                        operationManager(): util.KOperationManager;
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
                        newUuid(): number;
                        isThresholdReached(): boolean;
                        isEmpty(): boolean;
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
                        nextKey(): number;
                        lastComputedIndex(): number;
                        prefix(): number;
                    }
                    interface KStore {
                        lookup(originView: KView, key: number, callback: (p: KObject) => void): void;
                        lookupAll(originView: KView, key: number[], callback: (p: KObject[]) => void): void;
                        raw(origin: KObject, accessMode: AccessMode): any[];
                        save(dimension: KDimension<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        saveUnload(dimension: KDimension<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        discard(dimension: KDimension<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        delete(dimension: KDimension<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        initKObject(obj: KObject, originView: KView): void;
                        initDimension(dimension: KDimension<any, any, any>): void;
                        nextDimensionKey(): number;
                        nextObjectKey(): number;
                        getRoot(originView: KView, callback: (p: KObject) => void): void;
                        setRoot(newRoot: KObject, callback: (p: java.lang.Throwable) => void): void;
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
                        put(payloads: string[][], callback: (p: java.lang.Throwable) => void): void;
                        get(keys: string[], callback: (p: string[], p1: java.lang.Throwable) => void): void;
                        remove(keys: string[], callback: (p: java.lang.Throwable) => void): void;
                        commit(callback: (p: java.lang.Throwable) => void): void;
                        close(callback: (p: java.lang.Throwable) => void): void;
                    }
                }
                module event {
                    class DefaultKBroker implements KEventBroker {
                        private universeListeners;
                        private dimensionListeners;
                        private timeListeners;
                        private objectListeners;
                        constructor();
                        registerListener(origin: any, listener: (p: KEvent) => void, scope: ListenerScope): void;
                        notify(event: KEvent): void;
                        flush(dimensionKey: number): void;
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
                        constructor(p_type: KActionType, p_source: KObject, p_meta: meta.Meta, p_newValue: any);
                        dimension(): number;
                        time(): number;
                        uuid(): number;
                        actionType(): KActionType;
                        metaClass(): meta.MetaClass;
                        metaElement(): meta.Meta;
                        value(): any;
                        toString(): string;
                        toJSON(): string;
                        static fromJSON(payload: string): KEvent;
                        private static setEventAttribute(event, currentAttributeName, value);
                    }
                    interface KEventBroker {
                        registerListener(origin: any, listener: (p: KEvent) => void, scope: ListenerScope): void;
                        notify(event: KEvent): void;
                        flush(dimensionKey: number): void;
                    }
                    class ListenerRegistration {
                        _scope: ListenerScope;
                        _listener: (p: KEvent) => void;
                        _dim: number;
                        _time: number;
                        _uuid: number;
                        constructor(plistener: (p: KEvent) => void, pscope: ListenerScope, pdim: number, ptime: number, puuid: number);
                        scope(): ListenerScope;
                        listener(): (p: KEvent) => void;
                        dimension(): number;
                        time(): number;
                        uuid(): number;
                    }
                    class ListenerScope {
                        static TIME: ListenerScope;
                        static DIMENSION: ListenerScope;
                        static UNIVERSE: ListenerScope;
                        private _value;
                        constructor(pvalue: number);
                        value(): number;
                        equals(other: any): boolean;
                        static _ListenerScopeVALUES: ListenerScope[];
                        static values(): ListenerScope[];
                    }
                }
                module extrapolation {
                    class DiscreteExtrapolation implements Extrapolation {
                        private static INSTANCE;
                        static instance(): Extrapolation;
                        extrapolate(current: KObject, attribute: meta.MetaAttribute): any;
                        mutate(current: KObject, attribute: meta.MetaAttribute, payload: any): void;
                        save(cache: any): string;
                        load(payload: string, attribute: meta.MetaAttribute, now: number): any;
                        static convertRaw(attribute: meta.MetaAttribute, raw: any): any;
                    }
                    interface Extrapolation {
                        extrapolate(current: KObject, attribute: meta.MetaAttribute): any;
                        mutate(current: KObject, attribute: meta.MetaAttribute, payload: any): void;
                        save(cache: any): string;
                        load(payload: string, attribute: meta.MetaAttribute, now: number): any;
                    }
                    class PolynomialExtrapolation implements Extrapolation {
                        private static INSTANCE;
                        extrapolate(current: KObject, attribute: meta.MetaAttribute): any;
                        mutate(current: KObject, attribute: meta.MetaAttribute, payload: any): void;
                        save(cache: any): string;
                        load(payload: string, attribute: meta.MetaAttribute, now: number): any;
                        static instance(): Extrapolation;
                    }
                }
                class InboundReference {
                    private reference;
                    private object;
                    constructor(reference: meta.MetaReference, object: KObject);
                    getReference(): meta.MetaReference;
                    getObject(): KObject;
                }
                module json {
                    class JsonFormat implements ModelFormat {
                        private _view;
                        constructor(p_view: KView);
                        save(model: KObject, callback: (p: string, p1: java.lang.Throwable) => void): void;
                        load(payload: string, callback: (p: java.lang.Throwable) => void): void;
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
                        static serialize(model: KObject, callback: (p: string, p1: java.lang.Throwable) => void): void;
                        static printJSON(elem: KObject, builder: java.lang.StringBuilder): void;
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
                        toString(): string;
                        tokenType(): Type;
                        value(): any;
                    }
                    class Lexer {
                        private bytes;
                        private EOF;
                        private BOOLEAN_LETTERS;
                        private DIGIT;
                        private index;
                        private static DEFAULT_BUFFER_SIZE;
                        constructor(payload: string);
                        isSpace(c: string): boolean;
                        private nextChar();
                        private peekChar();
                        private isDone();
                        private isBooleanLetter(c);
                        private isDigit(c);
                        private isValueLetter(c);
                        nextToken(): JsonToken;
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
                        equals(other: any): boolean;
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
                    toString(): string;
                    code(): string;
                    static parse(s: string): KActionType;
                    equals(other: any): boolean;
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
                interface KObject {
                    dimension(): KDimension<any, any, any>;
                    isRoot(): boolean;
                    uuid(): number;
                    path(callback: (p: string) => void): void;
                    view(): KView;
                    delete(callback: (p: java.lang.Throwable) => void): void;
                    parent(callback: (p: KObject) => void): void;
                    parentUuid(): number;
                    select(query: string, callback: (p: KObject[]) => void): void;
                    stream(query: string, callback: (p: KObject) => void): void;
                    listen(listener: (p: KEvent) => void, scope: event.ListenerScope): void;
                    visitAttributes(visitor: (p: meta.MetaAttribute, p1: any) => void): void;
                    visit(visitor: (p: KObject) => VisitResult, end: (p: java.lang.Throwable) => void): void;
                    graphVisit(visitor: (p: KObject) => VisitResult, end: (p: java.lang.Throwable) => void): void;
                    treeVisit(visitor: (p: KObject) => VisitResult, end: (p: java.lang.Throwable) => void): void;
                    now(): number;
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
                    mutate(actionType: KActionType, metaReference: meta.MetaReference, param: KObject, setOpposite: boolean): void;
                    each<C extends KObject>(metaReference: meta.MetaReference, callback: (p: C) => void, end: (p: java.lang.Throwable) => void): void;
                    inbounds(callback: (p: InboundReference) => void, end: (p: java.lang.Throwable) => void): void;
                    traces(request: TraceRequest): trace.ModelTrace[];
                    get(attribute: meta.MetaAttribute): any;
                    set(attribute: meta.MetaAttribute, payload: any): void;
                    toJSON(): string;
                    equals(other: any): boolean;
                    diff(target: KObject, callback: (p: trace.TraceSequence) => void): void;
                    merge(target: KObject, callback: (p: trace.TraceSequence) => void): void;
                    intersection(target: KObject, callback: (p: trace.TraceSequence) => void): void;
                    slice(callback: (p: trace.TraceSequence) => void): void;
                    jump<U extends KObject>(time: number, callback: (p: U) => void): void;
                }
                interface KOperation {
                    on(source: KObject, params: any[], result: (p: any) => void): void;
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
                    stream(query: string, callback: (p: KObject) => void): void;
                    storage(): data.KStore;
                    listen(listener: (p: KEvent) => void, scope: event.ListenerScope): void;
                    setEventBroker(eventBroker: event.KEventBroker): KUniverse<any>;
                    setDataBase(dataBase: data.KDataBase): KUniverse<any>;
                    setOperation(metaOperation: meta.MetaOperation, operation: (p: KObject, p1: any[], p2: (p: any) => void) => void): void;
                }
                interface KView {
                    createFQN(metaClassName: string): KObject;
                    create(clazz: meta.MetaClass): KObject;
                    setRoot(elem: KObject, callback: (p: java.lang.Throwable) => void): void;
                    select(query: string, callback: (p: KObject[]) => void): void;
                    lookup(key: number, callback: (p: KObject) => void): void;
                    lookupAll(keys: number[], callback: (p: KObject[]) => void): void;
                    stream(query: string, callback: (p: KObject) => void): void;
                    metaClasses(): meta.MetaClass[];
                    metaClass(fqName: string): meta.MetaClass;
                    dimension(): KDimension<any, any, any>;
                    now(): number;
                    createProxy(clazz: meta.MetaClass, timeTree: time.TimeTree, key: number): KObject;
                    listen(listener: (p: KEvent) => void, scope: event.ListenerScope): void;
                    slice(elems: java.util.List<KObject>, callback: (p: trace.TraceSequence) => void): void;
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
                        equals(other: any): boolean;
                        static _MetaTypeVALUES: MetaType[];
                        static values(): MetaType[];
                    }
                }
                interface ModelAttributeVisitor {
                    visit(metaAttribute: meta.MetaAttribute, value: any): void;
                }
                interface ModelFormat {
                    save(model: KObject, callback: (p: string, p1: java.lang.Throwable) => void): void;
                    load(payload: string, callback: (p: java.lang.Throwable) => void): void;
                }
                interface ModelListener {
                    on(evt: KEvent): void;
                }
                interface ModelVisitor {
                    visit(elem: KObject): VisitResult;
                }
                module operation {
                    class DefaultModelCloner {
                        static clone<A extends KObject>(originalObject: A, callback: (p: A) => void): void;
                    }
                    class DefaultModelCompare {
                        static diff(origin: KObject, target: KObject, callback: (p: trace.TraceSequence) => void): void;
                        static merge(origin: KObject, target: KObject, callback: (p: trace.TraceSequence) => void): void;
                        static intersection(origin: KObject, target: KObject, callback: (p: trace.TraceSequence) => void): void;
                        private static internal_diff(origin, target, inter, merge, callback);
                        private static internal_createTraces(current, sibling, inter, merge, references, attributes);
                    }
                    class DefaultModelSlicer {
                        private static internal_prune(elem, traces, cache, parentMap, callback);
                        static slice(elems: java.util.List<KObject>, callback: (p: trace.TraceSequence) => void): void;
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
                        getSamples(): java.util.List<util.DataSample>;
                        getDegree(): number;
                        getTimeOrigin(): number;
                        private getMaxErr(degree, toleratedError, maxDegree, prioritization);
                        private internal_feed(time, value);
                        private maxError(computedWeights, time, value);
                        comparePolynome(p2: DefaultPolynomialModel, err: number): boolean;
                        private internal_extrapolate(time, weights);
                        extrapolate(time: number): number;
                        insert(time: number, value: number): boolean;
                        lastIndex(): number;
                        indexBefore(time: number): number;
                        timesAfter(time: number): number[];
                        save(): string;
                        load(payload: string): void;
                        isDirty(): boolean;
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
                            numRows: number;
                            numCols: number;
                            private decomposer;
                            maxRows: number;
                            maxCols: number;
                            Q: DenseMatrix64F;
                            R: DenseMatrix64F;
                            private Y;
                            private Z;
                            setA(A: DenseMatrix64F): boolean;
                            private solveU(U, b, n);
                            solve(B: DenseMatrix64F, X: DenseMatrix64F): void;
                            constructor();
                            setMaxSize(maxRows: number, maxCols: number): void;
                        }
                        class DataSample {
                            time: number;
                            value: number;
                            constructor(time: number, value: number);
                        }
                        class DenseMatrix64F {
                            numRows: number;
                            numCols: number;
                            data: number[];
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
                            get(index: number): number;
                            set(index: number, val: number): number;
                            plus(index: number, val: number): number;
                            constructor(numRows: number, numCols: number);
                            reshape(numRows: number, numCols: number, saveValues: boolean): void;
                            cset(row: number, col: number, value: number): void;
                            unsafe_get(row: number, col: number): number;
                            getNumElements(): number;
                        }
                        class PolynomialFitEjml {
                            A: DenseMatrix64F;
                            coef: DenseMatrix64F;
                            y: DenseMatrix64F;
                            solver: AdjLinearSolverQr;
                            constructor(degree: number);
                            getCoef(): number[];
                            fit(samplePoints: number[], observations: number[]): void;
                        }
                        class Prioritization {
                            static SAMEPRIORITY: Prioritization;
                            static HIGHDEGREES: Prioritization;
                            static LOWDEGREES: Prioritization;
                            equals(other: any): boolean;
                            static _PrioritizationVALUES: Prioritization[];
                            static values(): Prioritization[];
                        }
                        class QRDecompositionHouseholderColumn_D64 {
                            dataQR: number[][];
                            v: number[];
                            numCols: number;
                            numRows: number;
                            minLength: number;
                            gammas: number[];
                            gamma: number;
                            tau: number;
                            error: boolean;
                            setExpectedMaxSize(numRows: number, numCols: number): void;
                            getQ(Q: DenseMatrix64F, compact: boolean): DenseMatrix64F;
                            getR(R: DenseMatrix64F, compact: boolean): DenseMatrix64F;
                            decompose(A: DenseMatrix64F): boolean;
                            convertToColumnMajor(A: DenseMatrix64F): void;
                            householder(j: number): void;
                            updateA(w: number): void;
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
                        relationName: string;
                        params: java.util.Map<string, KQueryParam>;
                        subQuery: string;
                        oldString: string;
                        previousIsDeep: boolean;
                        previousIsRefDeep: boolean;
                        constructor(relationName: string, params: java.util.Map<string, KQueryParam>, subQuery: string, oldString: string, previousIsDeep: boolean, previousIsRefDeep: boolean);
                        static extractFirstQuery(query: string): KQuery;
                    }
                    class KQueryParam {
                        private _name;
                        private _value;
                        private _negative;
                        constructor(p_name: string, p_value: string, p_negative: boolean);
                        name(): string;
                        value(): string;
                        isNegative(): boolean;
                    }
                    class KSelector {
                        static select(root: KObject, query: string, callback: (p: KObject[]) => void): void;
                    }
                }
                interface ThrowableCallback<A> {
                    on(a: A, error: java.lang.Throwable): void;
                }
                module time {
                    class DefaultTimeTree implements TimeTree {
                        dirty: boolean;
                        versionTree: rbtree.RBTree;
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
                        setDirty(state: boolean): void;
                        toString(): string;
                        load(payload: string): void;
                    }
                    module rbtree {
                        class Color {
                            static RED: Color;
                            static BLACK: Color;
                            equals(other: any): boolean;
                            static _ColorVALUES: Color[];
                            static values(): Color[];
                        }
                        class LongRBTree {
                            root: LongTreeNode;
                            private _size;
                            dirty: boolean;
                            size(): number;
                            serialize(): string;
                            unserialize(payload: string): void;
                            previousOrEqual(key: number): LongTreeNode;
                            nextOrEqual(key: number): LongTreeNode;
                            previous(key: number): LongTreeNode;
                            previousWhileNot(key: number, until: number): LongTreeNode;
                            next(key: number): LongTreeNode;
                            nextWhileNot(key: number, until: number): LongTreeNode;
                            first(): LongTreeNode;
                            last(): LongTreeNode;
                            firstWhileNot(key: number, until: number): LongTreeNode;
                            lastWhileNot(key: number, until: number): LongTreeNode;
                            private lookupNode(key);
                            lookup(key: number): number;
                            private rotateLeft(n);
                            private rotateRight(n);
                            private replaceNode(oldn, newn);
                            insert(key: number, value: number): void;
                            private insertCase1(n);
                            private insertCase2(n);
                            private insertCase3(n);
                            private insertCase4(n_n);
                            private insertCase5(n);
                            delete(key: number): void;
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
                            key: number;
                            value: number;
                            color: Color;
                            private left;
                            private right;
                            private parent;
                            constructor(key: number, value: number, color: Color, left: LongTreeNode, right: LongTreeNode);
                            grandparent(): LongTreeNode;
                            sibling(): LongTreeNode;
                            uncle(): LongTreeNode;
                            getLeft(): LongTreeNode;
                            setLeft(left: LongTreeNode): void;
                            getRight(): LongTreeNode;
                            setRight(right: LongTreeNode): void;
                            getParent(): LongTreeNode;
                            setParent(parent: LongTreeNode): void;
                            serialize(builder: java.lang.StringBuilder): void;
                            next(): LongTreeNode;
                            previous(): LongTreeNode;
                            static unserialize(ctx: TreeReaderContext): LongTreeNode;
                            static internal_unserialize(rightBranch: boolean, ctx: TreeReaderContext): LongTreeNode;
                        }
                        class RBTree {
                            root: TreeNode;
                            private _size;
                            size(): number;
                            serialize(): string;
                            unserialize(payload: string): void;
                            previousOrEqual(key: number): TreeNode;
                            nextOrEqual(key: number): TreeNode;
                            previous(key: number): TreeNode;
                            previousWhileNot(key: number, until: State): TreeNode;
                            next(key: number): TreeNode;
                            nextWhileNot(key: number, until: State): TreeNode;
                            first(): TreeNode;
                            last(): TreeNode;
                            firstWhileNot(key: number, until: State): TreeNode;
                            lastWhileNot(key: number, until: State): TreeNode;
                            private lookupNode(key);
                            lookup(key: number): State;
                            private rotateLeft(n);
                            private rotateRight(n);
                            private replaceNode(oldn, newn);
                            insert(key: number, value: State): void;
                            private insertCase1(n);
                            private insertCase2(n);
                            private insertCase3(n);
                            private insertCase4(n_n);
                            private insertCase5(n);
                            delete(key: number): void;
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
                            equals(other: any): boolean;
                            static _StateVALUES: State[];
                            static values(): State[];
                        }
                        class TreeNode {
                            static BLACK_DELETE: string;
                            static BLACK_EXISTS: string;
                            static RED_DELETE: string;
                            static RED_EXISTS: string;
                            key: number;
                            value: State;
                            color: Color;
                            private left;
                            private right;
                            private parent;
                            getKey(): number;
                            constructor(key: number, value: State, color: Color, left: TreeNode, right: TreeNode);
                            grandparent(): TreeNode;
                            sibling(): TreeNode;
                            uncle(): TreeNode;
                            getLeft(): TreeNode;
                            setLeft(left: TreeNode): void;
                            getRight(): TreeNode;
                            setRight(right: TreeNode): void;
                            getParent(): TreeNode;
                            setParent(parent: TreeNode): void;
                            serialize(builder: java.lang.StringBuilder): void;
                            next(): TreeNode;
                            previous(): TreeNode;
                            static unserialize(ctx: TreeReaderContext): TreeNode;
                            static internal_unserialize(rightBranch: boolean, ctx: TreeReaderContext): TreeNode;
                        }
                        class TreeReaderContext {
                            payload: string;
                            index: number;
                            buffer: string[];
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
                        getPreviousKID(): number;
                        getMetaClass(): meta.MetaClass;
                        constructor(srcKID: number, reference: meta.MetaReference, previousKID: number, metaClass: meta.MetaClass);
                        toString(): string;
                        getMeta(): meta.Meta;
                        getTraceType(): KActionType;
                        getSrcKID(): number;
                    }
                    class ModelRemoveTrace implements ModelTrace {
                        private traceType;
                        private srcKID;
                        private objKID;
                        private reference;
                        constructor(srcKID: number, reference: meta.MetaReference, objKID: number);
                        getObjKID(): number;
                        getMeta(): meta.Meta;
                        getTraceType(): KActionType;
                        getSrcKID(): number;
                        toString(): string;
                    }
                    class ModelSetTrace implements ModelTrace {
                        private traceType;
                        private srcKID;
                        private attribute;
                        private content;
                        constructor(srcKID: number, attribute: meta.MetaAttribute, content: any);
                        getTraceType(): KActionType;
                        getSrcKID(): number;
                        getMeta(): meta.Meta;
                        getContent(): any;
                        toString(): string;
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
                        constructor(targetModel: KObject);
                        private tryClosePending(srcKID);
                        createOrAdd(previousPath: number, target: KObject, reference: meta.MetaReference, metaClass: meta.MetaClass, callback: (p: java.lang.Throwable) => void): void;
                        applyTraceSequence(traceSeq: TraceSequence, callback: (p: java.lang.Throwable) => void): void;
                        applyTrace(trace: ModelTrace, callback: (p: java.lang.Throwable) => void): void;
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
                        toString(): string;
                        equals(other: any): boolean;
                        static _ModelTraceConstantsVALUES: ModelTraceConstants[];
                        static values(): ModelTraceConstants[];
                    }
                    class TraceSequence {
                        private _traces;
                        traces(): ModelTrace[];
                        populate(addtraces: java.util.List<ModelTrace>): TraceSequence;
                        append(seq: TraceSequence): TraceSequence;
                        parse(addtracesTxt: string): TraceSequence;
                        toString(): string;
                        applyOn(target: KObject, callback: (p: java.lang.Throwable) => void): boolean;
                        reverse(): TraceSequence;
                    }
                    module unresolved {
                        class UnresolvedMetaAttribute implements meta.MetaAttribute {
                            private _metaName;
                            constructor(p_metaName: string);
                            key(): boolean;
                            origin(): meta.MetaClass;
                            metaType(): meta.MetaType;
                            strategy(): extrapolation.Extrapolation;
                            precision(): number;
                            setExtrapolation(extrapolation: extrapolation.Extrapolation): void;
                            metaName(): string;
                            index(): number;
                        }
                        class UnresolvedMetaClass implements meta.MetaClass {
                            private _metaName;
                            constructor(p_metaName: string);
                            metaName(): string;
                            index(): number;
                            metaAttributes(): meta.MetaAttribute[];
                            metaReferences(): meta.MetaReference[];
                            metaOperations(): meta.MetaOperation[];
                            metaAttribute(name: string): meta.MetaAttribute;
                            metaReference(name: string): meta.MetaReference;
                            metaOperation(name: string): meta.MetaOperation;
                        }
                        class UnresolvedMetaReference implements meta.MetaReference {
                            private _metaName;
                            constructor(p_metaName: string);
                            contained(): boolean;
                            single(): boolean;
                            metaType(): meta.MetaClass;
                            opposite(): meta.MetaReference;
                            origin(): meta.MetaClass;
                            metaName(): string;
                            index(): number;
                        }
                    }
                }
                class TraceRequest {
                    static ATTRIBUTES_ONLY: TraceRequest;
                    static REFERENCES_ONLY: TraceRequest;
                    static ATTRIBUTES_REFERENCES: TraceRequest;
                    equals(other: any): boolean;
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
                        registerOperation(operation: meta.MetaOperation, callback: (p: KObject, p1: any[], p2: (p: any) => void) => void): void;
                        call(source: KObject, operation: meta.MetaOperation, param: any[], callback: (p: any) => void): void;
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
                        static path(parent: string, reference: meta.MetaReference, target: KObject): string;
                    }
                    interface KOperationManager {
                        registerOperation(operation: meta.MetaOperation, callback: (p: KObject, p1: any[], p2: (p: any) => void) => void): void;
                        call(source: KObject, operation: meta.MetaOperation, param: any[], callback: (p: any) => void): void;
                    }
                }
                class VisitResult {
                    static CONTINUE: VisitResult;
                    static SKIP: VisitResult;
                    static STOP: VisitResult;
                    equals(other: any): boolean;
                    static _VisitResultVALUES: VisitResult[];
                    static values(): VisitResult[];
                }
                module xmi {
                    class SerializationContext {
                        ignoreGeneratedID: boolean;
                        model: KObject;
                        finishCallback: (p: string, p1: java.lang.Throwable) => void;
                        printer: java.lang.StringBuilder;
                        attributesVisitor: (p: meta.MetaAttribute, p1: any) => void;
                        addressTable: java.util.HashMap<number, string>;
                        elementsCount: java.util.HashMap<string, number>;
                        packageList: java.util.ArrayList<string>;
                    }
                    class XmiFormat implements ModelFormat {
                        private _view;
                        constructor(p_view: KView);
                        save(model: KObject, callback: (p: string, p1: java.lang.Throwable) => void): void;
                        load(payload: string, callback: (p: java.lang.Throwable) => void): void;
                    }
                    class XMILoadingContext {
                        xmiReader: XmlParser;
                        loadedRoots: KObject;
                        resolvers: java.util.ArrayList<XMIResolveCommand>;
                        map: java.util.HashMap<string, KObject>;
                        elementsCount: java.util.HashMap<string, number>;
                        stats: java.util.HashMap<string, number>;
                        oppositesAlreadySet: java.util.HashMap<string, boolean>;
                        successCallback: (p: java.lang.Throwable) => void;
                        isOppositeAlreadySet(localRef: string, oppositeRef: string): boolean;
                        storeOppositeRelation(localRef: string, oppositeRef: string): void;
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
                        static save(model: KObject, callback: (p: string, p1: java.lang.Throwable) => void): void;
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
                        constructor(context: XMILoadingContext, target: KObject, mutatorType: KActionType, refName: string, ref: string);
                        run(): void;
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
                        getTagPrefix(): string;
                        hasNext(): boolean;
                        getLocalName(): string;
                        getAttributeCount(): number;
                        getAttributeLocalName(i: number): string;
                        getAttributePrefix(i: number): string;
                        getAttributeValue(i: number): string;
                        private readChar();
                        next(): XmlToken;
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
                        equals(other: any): boolean;
                        static _XmlTokenVALUES: XmlToken[];
                        static values(): XmlToken[];
                    }
                }
            }
        }
    }
}
