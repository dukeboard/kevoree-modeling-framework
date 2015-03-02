declare module org {
    module kevoree {
        module modeling {
            module api {
                interface Callback<A> {
                    on(a: A): void;
                }
                class InboundReference {
                    private _reference;
                    private _source;
                    constructor(p_reference: meta.MetaReference, p_source: number);
                    reference(): meta.MetaReference;
                    source(): number;
                }
                class KActionType {
                    static CALL: KActionType;
                    static CALL_RESPONSE: KActionType;
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
                interface KCurrentDefer<A> extends KDefer<any> {
                    resultKeys(): string[];
                    resultByName(name: string): any;
                    resultByDefer(defer: KDefer<any>): any;
                    addDeferResult(result: A): void;
                    clearResults(): void;
                }
                interface KDefer<A> {
                    wait(previous: KDefer<any>): KDefer<any>;
                    getResult(): A;
                    isDone(): boolean;
                    setJob(kjob: (p: KCurrentDefer<any>) => void): KDefer<any>;
                    ready(): KDefer<any>;
                    next(): KDefer<any>;
                    then(callback: (p: A) => void): void;
                    setName(taskName: string): KDefer<any>;
                    getName(): string;
                    chain(block: (p: KDefer<any>) => KDefer<any>): KDefer<any>;
                }
                interface KDeferBlock {
                    exec(previous: KDefer<any>): KDefer<any>;
                }
                interface KEventListener {
                    on(src: KObject, modifications: meta.Meta[]): void;
                }
                interface KInfer extends KObject {
                    train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                    infer(features: any[]): any;
                    accuracy(testSet: any[][], expectedResultSet: any[]): any;
                    clear(): void;
                }
                class KInferState {
                    save(): string;
                    load(payload: string): void;
                    isDirty(): boolean;
                    cloneState(): KInferState;
                }
                interface KJob {
                    run(currentTask: KCurrentDefer<any>): void;
                }
                interface KModel<A extends KUniverse<any, any, any>> {
                    newUniverse(): A;
                    universe(key: number): A;
                    manager(): data.manager.KDataManager;
                    disable(listener: (p: KObject, p1: meta.Meta[]) => void): void;
                    listen(listener: (p: KObject, p1: meta.Meta[]) => void): void;
                    setContentDeliveryDriver(dataBase: data.cdn.KContentDeliveryDriver): KModel<any>;
                    setScheduler(scheduler: KScheduler): KModel<any>;
                    setOperation(metaOperation: meta.MetaOperation, operation: (p: KObject, p1: any[], p2: (p: any) => void) => void): void;
                    setInstanceOperation(metaOperation: meta.MetaOperation, target: KObject, operation: (p: KObject, p1: any[], p2: (p: any) => void) => void): void;
                    metaModel(): meta.MetaModel;
                    defer(): KDefer<any>;
                    save(): KDefer<any>;
                    discard(): KDefer<any>;
                    connect(): KDefer<any>;
                    close(): KDefer<any>;
                }
                interface KObject {
                    universe(): KUniverse<any, any, any>;
                    uuid(): number;
                    path(): KDefer<any>;
                    view(): KView;
                    delete(): KDefer<any>;
                    parent(): KDefer<any>;
                    parentUuid(): number;
                    select(query: string): KDefer<any>;
                    listen(listener: (p: KObject, p1: meta.Meta[]) => void): void;
                    visitAttributes(visitor: (p: meta.MetaAttribute, p1: any) => void): void;
                    visit(visitor: (p: KObject) => VisitResult, request: VisitRequest): KDefer<any>;
                    now(): number;
                    universeTree(): rbtree.LongRBTree;
                    timeWalker(): util.TimeWalker;
                    referenceInParent(): meta.MetaReference;
                    domainKey(): string;
                    metaClass(): meta.MetaClass;
                    mutate(actionType: KActionType, metaReference: meta.MetaReference, param: KObject): void;
                    ref(metaReference: meta.MetaReference): KDefer<any>;
                    inferRef(metaReference: meta.MetaReference): KDefer<any>;
                    traverse(metaReference: meta.MetaReference): traversal.KTraversal;
                    traverseQuery(metaReferenceQuery: string): traversal.KTraversal;
                    traverseInbounds(metaReferenceQuery: string): traversal.KTraversal;
                    traverseParent(): traversal.KTraversal;
                    inbounds(): KDefer<any>;
                    traces(request: TraceRequest): trace.ModelTrace[];
                    get(attribute: meta.MetaAttribute): any;
                    set(attribute: meta.MetaAttribute, payload: any): void;
                    toJSON(): string;
                    equals(other: any): boolean;
                    diff(target: KObject): KDefer<any>;
                    merge(target: KObject): KDefer<any>;
                    intersection(target: KObject): KDefer<any>;
                    jump<U extends KObject>(time: number): KDefer<any>;
                    referencesWith(o: KObject): meta.MetaReference[];
                    inferObjects(): KDefer<any>;
                    inferAttribute(attribute: meta.MetaAttribute): any;
                    call(operation: meta.MetaOperation, params: any[]): KDefer<any>;
                    inferCall(operation: meta.MetaOperation, params: any[]): KDefer<any>;
                }
                interface KOperation {
                    on(source: KObject, params: any[], result: (p: any) => void): void;
                }
                interface KScheduler {
                    dispatch(runnable: java.lang.Runnable): void;
                    stop(): void;
                }
                interface KType {
                    name(): string;
                    isEnum(): boolean;
                    save(src: any): string;
                    load(payload: string): any;
                }
                interface KUniverse<A extends KView, B extends KUniverse<any, any, any>, C extends KModel<any>> {
                    key(): number;
                    time(timePoint: number): A;
                    model(): C;
                    equals(other: any): boolean;
                    listen(listener: (p: KObject, p1: meta.Meta[]) => void): void;
                    listenAllTimes(target: KObject, listener: (p: KObject, p1: meta.Meta[]) => void): void;
                    diverge(): B;
                    origin(): B;
                    descendants(): java.util.List<B>;
                    delete(): KDefer<any>;
                }
                interface KView {
                    createFQN(metaClassName: string): KObject;
                    create(clazz: meta.MetaClass): KObject;
                    select(query: string): KDefer<any>;
                    lookup(key: number): KDefer<any>;
                    lookupAll(keys: number[]): KDefer<any>;
                    universe(): KUniverse<any, any, any>;
                    now(): number;
                    listen(listener: (p: KObject, p1: meta.Meta[]) => void): void;
                    json(): ModelFormat;
                    xmi(): ModelFormat;
                    equals(other: any): boolean;
                    setRoot(elem: KObject): KDefer<any>;
                    getRoot(): KDefer<any>;
                }
                interface ModelAttributeVisitor {
                    visit(metaAttribute: meta.MetaAttribute, value: any): void;
                }
                interface ModelFormat {
                    save(model: KObject): KDefer<any>;
                    saveRoot(): KDefer<any>;
                    load(payload: string): KDefer<any>;
                }
                interface ModelVisitor {
                    visit(elem: KObject): VisitResult;
                }
                interface ThrowableCallback<A> {
                    on(a: A, error: java.lang.Throwable): void;
                }
                class TraceRequest {
                    static ATTRIBUTES_ONLY: TraceRequest;
                    static REFERENCES_ONLY: TraceRequest;
                    static ATTRIBUTES_REFERENCES: TraceRequest;
                    equals(other: any): boolean;
                    static _TraceRequestVALUES: TraceRequest[];
                    static values(): TraceRequest[];
                }
                class VisitRequest {
                    static CHILDREN: VisitRequest;
                    static CONTAINED: VisitRequest;
                    static ALL: VisitRequest;
                    equals(other: any): boolean;
                    static _VisitRequestVALUES: VisitRequest[];
                    static values(): VisitRequest[];
                }
                class VisitResult {
                    static CONTINUE: VisitResult;
                    static SKIP: VisitResult;
                    static STOP: VisitResult;
                    equals(other: any): boolean;
                    static _VisitResultVALUES: VisitResult[];
                    static values(): VisitResult[];
                }
                module abs {
                    class AbstractKDataType implements KType {
                        private _name;
                        private _isEnum;
                        constructor(p_name: string, p_isEnum: boolean);
                        name(): string;
                        isEnum(): boolean;
                        save(src: any): string;
                        load(payload: string): any;
                    }
                    class AbstractKDefer<A> implements KCurrentDefer<any> {
                        private _name;
                        private _isDone;
                        _isReady: boolean;
                        private _nbRecResult;
                        private _nbExpectedResult;
                        private _results;
                        private _nextTasks;
                        private _job;
                        private _result;
                        setDoneOrRegister(next: KDefer<any>): boolean;
                        private informParentEnd(end);
                        wait(p_previous: KDefer<any>): KDefer<any>;
                        ready(): KDefer<any>;
                        next(): KDefer<any>;
                        then(p_callback: (p: A) => void): void;
                        setName(p_taskName: string): KDefer<any>;
                        getName(): string;
                        chain(p_block: (p: KDefer<any>) => KDefer<any>): KDefer<any>;
                        resultKeys(): string[];
                        resultByName(p_name: string): any;
                        resultByDefer(defer: KDefer<any>): any;
                        addDeferResult(p_result: A): void;
                        clearResults(): void;
                        getResult(): A;
                        isDone(): boolean;
                        setJob(p_kjob: (p: KCurrentDefer<any>) => void): KDefer<any>;
                    }
                    class AbstractKDeferWrapper<A> extends AbstractKDefer<any> {
                        private _callback;
                        constructor();
                        initCallback(): (p: A) => void;
                        wait(previous: KDefer<any>): KDefer<any>;
                        setJob(p_kjob: (p: KCurrentDefer<any>) => void): KDefer<any>;
                        ready(): KDefer<any>;
                    }
                    class AbstractKModel<A extends KUniverse<any, any, any>> implements KModel<any> {
                        private _manager;
                        metaModel(): meta.MetaModel;
                        constructor();
                        connect(): KDefer<any>;
                        close(): KDefer<any>;
                        manager(): data.manager.KDataManager;
                        newUniverse(): A;
                        internal_create(key: number): A;
                        universe(key: number): A;
                        save(): KDefer<any>;
                        discard(): KDefer<any>;
                        disable(listener: (p: KObject, p1: meta.Meta[]) => void): void;
                        listen(listener: (p: KObject, p1: meta.Meta[]) => void): void;
                        setContentDeliveryDriver(p_driver: data.cdn.KContentDeliveryDriver): KModel<any>;
                        setScheduler(p_scheduler: KScheduler): KModel<any>;
                        setOperation(metaOperation: meta.MetaOperation, operation: (p: KObject, p1: any[], p2: (p: any) => void) => void): void;
                        setInstanceOperation(metaOperation: meta.MetaOperation, target: KObject, operation: (p: KObject, p1: any[], p2: (p: any) => void) => void): void;
                        defer(): KDefer<any>;
                    }
                    class AbstractKObject implements KObject {
                        private _view;
                        private _uuid;
                        private _universeTree;
                        private _metaClass;
                        constructor(p_view: KView, p_uuid: number, p_universeTree: rbtree.LongRBTree, p_metaClass: meta.MetaClass);
                        view(): KView;
                        uuid(): number;
                        metaClass(): meta.MetaClass;
                        now(): number;
                        universeTree(): rbtree.LongRBTree;
                        universe(): KUniverse<any, any, any>;
                        path(): KDefer<any>;
                        parentUuid(): number;
                        timeWalker(): util.TimeWalker;
                        parent(): KDefer<any>;
                        referenceInParent(): meta.MetaReference;
                        delete(): KDefer<any>;
                        select(query: string): KDefer<any>;
                        listen(listener: (p: KObject, p1: meta.Meta[]) => void): void;
                        domainKey(): string;
                        get(p_attribute: meta.MetaAttribute): any;
                        set(p_attribute: meta.MetaAttribute, payload: any): void;
                        private removeFromContainer(param);
                        mutate(actionType: KActionType, metaReference: meta.MetaReference, param: KObject): void;
                        internal_mutate(actionType: KActionType, metaReferenceP: meta.MetaReference, param: KObject, setOpposite: boolean, inDelete: boolean): void;
                        size(p_metaReference: meta.MetaReference): number;
                        internal_ref(p_metaReference: meta.MetaReference, callback: (p: KObject[]) => void): void;
                        ref(p_metaReference: meta.MetaReference): KDefer<any>;
                        inferRef(p_metaReference: meta.MetaReference): KDefer<any>;
                        visitAttributes(visitor: (p: meta.MetaAttribute, p1: any) => void): void;
                        visit(p_visitor: (p: KObject) => VisitResult, p_request: VisitRequest): KDefer<any>;
                        private internal_visit(visitor, end, deep, containedOnly, visited, traversed);
                        toJSON(): string;
                        toString(): string;
                        traces(request: TraceRequest): trace.ModelTrace[];
                        inbounds(): KDefer<any>;
                        set_parent(p_parentKID: number, p_metaReference: meta.MetaReference): void;
                        equals(obj: any): boolean;
                        hashCode(): number;
                        diff(target: KObject): KDefer<any>;
                        merge(target: KObject): KDefer<any>;
                        intersection(target: KObject): KDefer<any>;
                        jump<U extends KObject>(time: number): KDefer<any>;
                        internal_transpose_ref(p: meta.MetaReference): meta.MetaReference;
                        internal_transpose_att(p: meta.MetaAttribute): meta.MetaAttribute;
                        internal_transpose_op(p: meta.MetaOperation): meta.MetaOperation;
                        traverse(p_metaReference: meta.MetaReference): traversal.KTraversal;
                        traverseQuery(metaReferenceQuery: string): traversal.KTraversal;
                        traverseInbounds(metaReferenceQuery: string): traversal.KTraversal;
                        traverseParent(): traversal.KTraversal;
                        referencesWith(o: KObject): meta.MetaReference[];
                        call(p_operation: meta.MetaOperation, p_params: any[]): KDefer<any>;
                        inferObjects(): KDefer<any>;
                        inferAttribute(attribute: meta.MetaAttribute): any;
                        inferCall(operation: meta.MetaOperation, params: any[]): KDefer<any>;
                    }
                    class AbstractKObjectInfer extends AbstractKObject implements KInfer {
                        constructor(p_view: KView, p_uuid: number, p_universeTree: rbtree.LongRBTree, p_metaClass: meta.MetaClass);
                        readOnlyState(): KInferState;
                        modifyState(): KInferState;
                        private internal_load(raw);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): KInferState;
                    }
                    class AbstractKUniverse<A extends KView, B extends KUniverse<any, any, any>, C extends KModel<any>> implements KUniverse<any, any, any> {
                        private _model;
                        private _key;
                        constructor(p_model: KModel<any>, p_key: number);
                        key(): number;
                        model(): C;
                        delete(): KDefer<any>;
                        time(timePoint: number): A;
                        listen(listener: (p: KObject, p1: meta.Meta[]) => void): void;
                        listenAllTimes(target: KObject, listener: (p: KObject, p1: meta.Meta[]) => void): void;
                        internal_create(timePoint: number): A;
                        equals(obj: any): boolean;
                        origin(): B;
                        diverge(): B;
                        descendants(): java.util.List<B>;
                    }
                    class AbstractKView implements KView {
                        private _now;
                        private _universe;
                        constructor(p_now: number, p_universe: KUniverse<any, any, any>);
                        now(): number;
                        universe(): KUniverse<any, any, any>;
                        createFQN(metaClassName: string): KObject;
                        setRoot(elem: KObject): KDefer<any>;
                        getRoot(): KDefer<any>;
                        select(query: string): KDefer<any>;
                        lookup(kid: number): KDefer<any>;
                        lookupAll(keys: number[]): KDefer<any>;
                        internalLookupAll(keys: number[], callback: (p: KObject[]) => void): void;
                        createProxy(clazz: meta.MetaClass, universeTree: rbtree.LongRBTree, key: number): KObject;
                        create(clazz: meta.MetaClass): KObject;
                        listen(listener: (p: KObject, p1: meta.Meta[]) => void): void;
                        internalCreate(clazz: meta.MetaClass, universeTree: rbtree.LongRBTree, key: number): KObject;
                        json(): ModelFormat;
                        xmi(): ModelFormat;
                        equals(obj: any): boolean;
                    }
                    class AbstractMetaAttribute implements meta.MetaAttribute {
                        private _name;
                        private _index;
                        private _precision;
                        private _key;
                        private _metaType;
                        private _extrapolation;
                        attributeType(): KType;
                        index(): number;
                        metaName(): string;
                        metaType(): meta.MetaType;
                        precision(): number;
                        key(): boolean;
                        strategy(): extrapolation.Extrapolation;
                        setExtrapolation(extrapolation: extrapolation.Extrapolation): void;
                        constructor(p_name: string, p_index: number, p_precision: number, p_key: boolean, p_metaType: KType, p_extrapolation: extrapolation.Extrapolation);
                    }
                    class AbstractMetaClass implements meta.MetaClass {
                        private _name;
                        private _index;
                        private _meta;
                        private _atts;
                        private _refs;
                        private _indexes;
                        metaByName(name: string): meta.Meta;
                        metaElements(): meta.Meta[];
                        index(): number;
                        metaName(): string;
                        metaType(): meta.MetaType;
                        constructor(p_name: string, p_index: number);
                        init(p_meta: meta.Meta[]): void;
                        meta(index: number): meta.Meta;
                        metaAttributes(): meta.MetaAttribute[];
                        metaReferences(): meta.MetaReference[];
                    }
                    class AbstractMetaModel implements meta.MetaModel {
                        private _name;
                        private _index;
                        private _metaClasses;
                        private _metaClasses_indexes;
                        index(): number;
                        metaName(): string;
                        metaType(): meta.MetaType;
                        constructor(p_name: string, p_index: number);
                        metaClasses(): meta.MetaClass[];
                        metaClass(name: string): meta.MetaClass;
                        init(p_metaClasses: meta.MetaClass[]): void;
                    }
                    class AbstractMetaOperation implements meta.MetaOperation {
                        private _name;
                        private _index;
                        private _lazyMetaClass;
                        index(): number;
                        metaName(): string;
                        metaType(): meta.MetaType;
                        constructor(p_name: string, p_index: number, p_lazyMetaClass: () => meta.Meta);
                        origin(): meta.MetaClass;
                    }
                    class AbstractMetaReference implements meta.MetaReference {
                        private _name;
                        private _index;
                        private _contained;
                        private _single;
                        private _lazyMetaType;
                        private _lazyMetaOpposite;
                        private _lazyMetaOrigin;
                        single(): boolean;
                        attributeType(): meta.MetaClass;
                        opposite(): meta.MetaReference;
                        origin(): meta.MetaClass;
                        index(): number;
                        metaName(): string;
                        metaType(): meta.MetaType;
                        contained(): boolean;
                        constructor(p_name: string, p_index: number, p_contained: boolean, p_single: boolean, p_lazyMetaType: () => meta.Meta, p_lazyMetaOpposite: () => meta.Meta, p_lazyMetaOrigin: () => meta.Meta);
                    }
                    interface LazyResolver {
                        meta(): meta.Meta;
                    }
                }
                module data {
                    module cache {
                        interface KCache {
                            get(key: KContentKey): KCacheObject;
                            put(key: KContentKey, payload: KCacheObject): void;
                            dirties(): KCacheDirty[];
                            clearDataSegment(): void;
                        }
                        class KCacheDirty {
                            key: KContentKey;
                            object: KCacheObject;
                            constructor(key: KContentKey, object: KCacheObject);
                        }
                        class KCacheEntry implements KCacheObject {
                            metaClass: meta.MetaClass;
                            raw: any[];
                            _modifiedIndexes: boolean[];
                            _dirty: boolean;
                            isDirty(): boolean;
                            modifiedIndexes(): number[];
                            serialize(): string;
                            setClean(): void;
                            unserialize(key: KContentKey, payload: string, metaModel: meta.MetaModel): void;
                            get(index: number): any;
                            set(index: number, content: any): void;
                            sizeRaw(): number;
                            clone(): KCacheEntry;
                        }
                        class KCacheLayer {
                            private _nestedLayers;
                            private _cachedObjects;
                            private _cachedNullObject;
                            private _nestedNullLayer;
                            resolve(p_key: KContentKey, current: number): KCacheObject;
                            insert(p_key: KContentKey, current: number, p_obj_insert: KCacheObject): void;
                            dirties(result: java.util.List<KCacheDirty>, prefixKeys: number[], current: number): void;
                        }
                        interface KCacheObject {
                            isDirty(): boolean;
                            serialize(): string;
                            setClean(): void;
                            unserialize(key: KContentKey, payload: string, metaModel: meta.MetaModel): void;
                        }
                        class KContentKey {
                            static ELEM_SIZE: number;
                            private elem;
                            static KEY_SEP: string;
                            private static GLOBAL_SEGMENT_META;
                            static GLOBAL_SEGMENT_DATA_RAW: number;
                            static GLOBAL_SEGMENT_DATA_INDEX: number;
                            static GLOBAL_SEGMENT_DATA_LONG_INDEX: number;
                            static GLOBAL_SEGMENT_DATA_ROOT: number;
                            private static GLOBAL_SEGMENT_UNIVERSE_TREE;
                            private static GLOBAL_SEGMENT_PREFIX;
                            private static GLOBAL_SUB_SEGMENT_PREFIX_OBJ;
                            private static GLOBAL_SUB_SEGMENT_PREFIX_UNI;
                            constructor(p_prefixID: number, p_universeID: number, p_timeID: number, p_objID: number);
                            segment(): number;
                            universe(): number;
                            time(): number;
                            obj(): number;
                            part(i: number): number;
                            static createGlobal(p_prefixID: number): KContentKey;
                            static createGlobalUniverseTree(): KContentKey;
                            static createUniverseTree(p_objectID: number): KContentKey;
                            static createRootUniverseTree(): KContentKey;
                            static createRootTimeTree(universeID: number): KContentKey;
                            static createTimeTree(p_universeID: number, p_objectID: number): KContentKey;
                            static createObject(p_universeID: number, p_quantaID: number, p_objectID: number): KContentKey;
                            static createLastPrefix(): KContentKey;
                            static createLastObjectIndexFromPrefix(prefix: number): KContentKey;
                            static createLastUniverseIndexFromPrefix(prefix: number): KContentKey;
                            static create(payload: string): KContentKey;
                            toString(): string;
                        }
                        class MultiLayeredMemoryCache implements KCache {
                            static DEBUG: boolean;
                            private _nestedLayers;
                            get(key: KContentKey): KCacheObject;
                            put(key: KContentKey, payload: KCacheObject): void;
                            dirties(): KCacheDirty[];
                            clearDataSegment(): void;
                        }
                    }
                    module cdn {
                        interface AtomicOperation {
                            operationKey(): number;
                            mutate(previous: string): string;
                        }
                        class AtomicOperationFactory {
                            static PREFIX_MUTATE_OPERATION: number;
                            static getMutatePrefixOperation(): AtomicOperation;
                            static getOperationWithKey(key: number): AtomicOperation;
                        }
                        interface KContentDeliveryDriver {
                            atomicGetMutate(key: cache.KContentKey, operation: AtomicOperation, callback: (p: string, p1: java.lang.Throwable) => void): void;
                            get(keys: cache.KContentKey[], callback: (p: string[], p1: java.lang.Throwable) => void): void;
                            put(request: KContentPutRequest, error: (p: java.lang.Throwable) => void): void;
                            remove(keys: string[], error: (p: java.lang.Throwable) => void): void;
                            connect(callback: (p: java.lang.Throwable) => void): void;
                            close(callback: (p: java.lang.Throwable) => void): void;
                            registerListener(origin: any, listener: (p: KObject, p1: meta.Meta[]) => void, scope: any): void;
                            unregister(listener: (p: KObject, p1: meta.Meta[]) => void): void;
                            send(msgs: msg.KEventMessage[]): void;
                            setManager(manager: manager.KDataManager): void;
                        }
                        class KContentPutRequest {
                            private _content;
                            private static KEY_INDEX;
                            private static CONTENT_INDEX;
                            private static SIZE_INDEX;
                            private _size;
                            constructor(requestSize: number);
                            put(p_key: cache.KContentKey, p_payload: string): void;
                            getKey(index: number): cache.KContentKey;
                            getContent(index: number): string;
                            size(): number;
                        }
                        class MemoryKContentDeliveryDriver implements KContentDeliveryDriver {
                            private backend;
                            private _localEventListeners;
                            private _manager;
                            static DEBUG: boolean;
                            atomicGetMutate(key: cache.KContentKey, operation: AtomicOperation, callback: (p: string, p1: java.lang.Throwable) => void): void;
                            get(keys: cache.KContentKey[], callback: (p: string[], p1: java.lang.Throwable) => void): void;
                            put(p_request: KContentPutRequest, p_callback: (p: java.lang.Throwable) => void): void;
                            remove(keys: string[], callback: (p: java.lang.Throwable) => void): void;
                            connect(callback: (p: java.lang.Throwable) => void): void;
                            close(callback: (p: java.lang.Throwable) => void): void;
                            registerListener(p_origin: any, p_listener: (p: KObject, p1: meta.Meta[]) => void, p_scope: any): void;
                            unregister(p_listener: (p: KObject, p1: meta.Meta[]) => void): void;
                            send(msgs: msg.KEventMessage[]): void;
                            setManager(manager: manager.KDataManager): void;
                            private fireLocalMessages(msgs);
                        }
                    }
                    module manager {
                        class AccessMode {
                            static READ: AccessMode;
                            static WRITE: AccessMode;
                            static DELETE: AccessMode;
                            equals(other: any): boolean;
                            static _AccessModeVALUES: AccessMode[];
                            static values(): AccessMode[];
                        }
                        class DefaultKDataManager implements KDataManager {
                            private _db;
                            private _operationManager;
                            private _scheduler;
                            private _model;
                            private _objectKeyCalculator;
                            private _universeKeyCalculator;
                            private isConnected;
                            private static OUT_OF_CACHE_MESSAGE;
                            private static UNIVERSE_NOT_CONNECTED_ERROR;
                            private UNIVERSE_INDEX;
                            private OBJ_INDEX;
                            private GLO_TREE_INDEX;
                            private _cache;
                            constructor(model: KModel<any>);
                            model(): KModel<any>;
                            close(callback: (p: java.lang.Throwable) => void): void;
                            nextUniverseKey(): number;
                            nextObjectKey(): number;
                            initUniverse(p_universe: KUniverse<any, any, any>, p_parent: KUniverse<any, any, any>): void;
                            parentUniverseKey(currentUniverseKey: number): number;
                            descendantsUniverseKeys(currentUniverseKey: number): number[];
                            save(callback: (p: java.lang.Throwable) => void): void;
                            initKObject(obj: KObject, originView: KView): void;
                            connect(connectCallback: (p: java.lang.Throwable) => void): void;
                            entry(origin: KObject, accessMode: AccessMode): cache.KCacheEntry;
                            discard(p_universe: KUniverse<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                            delete(p_universe: KUniverse<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                            lookup(originView: KView, key: number, callback: (p: KObject) => void): void;
                            lookupAll(originView: KView, keys: number[], callback: (p: KObject[]) => void): void;
                            cdn(): cdn.KContentDeliveryDriver;
                            setContentDeliveryDriver(p_dataBase: cdn.KContentDeliveryDriver): void;
                            setScheduler(p_scheduler: KScheduler): void;
                            operationManager(): util.KOperationManager;
                            internal_resolve_universe_time(originView: KView, uuids: number[], callback: (p: ResolutionResult[]) => void): void;
                            private internal_resolve_times(originView, uuids, tempResult, callback);
                            internal_root_load(contentKey: cache.KContentKey, callback: (p: rbtree.LongRBTree) => void): void;
                            getRoot(originView: KView, callback: (p: KObject) => void): void;
                            setRoot(newRoot: KObject, callback: (p: java.lang.Throwable) => void): void;
                            cache(): cache.KCache;
                            reload(keys: cache.KContentKey[], callback: (p: java.lang.Throwable) => void): void;
                            timeTrees(p_origin: KObject, start: number, end: number, callback: (p: rbtree.IndexRBTree[]) => void): void;
                            private internal_resolve_universe(universeTree, timeToResolve, currentUniverse);
                            private internal_load(key, payload);
                        }
                        class Index {
                            static PARENT_INDEX: number;
                            static INBOUNDS_INDEX: number;
                            static REF_IN_PARENT_INDEX: number;
                            static INFER_CHILDREN: number;
                            static RESERVED_INDEXES: number;
                        }
                        class JsonRaw {
                            static SEP: string;
                            static decode(payload: string, now: number, metaModel: meta.MetaModel, entry: cache.KCacheEntry): void;
                            static encode(raw: cache.KCacheEntry, uuid: number, p_metaClass: meta.MetaClass, endline: boolean, isRoot: boolean): string;
                        }
                        interface KDataManager {
                            cdn(): cdn.KContentDeliveryDriver;
                            model(): KModel<any>;
                            cache(): cache.KCache;
                            lookup(originView: KView, key: number, callback: (p: KObject) => void): void;
                            lookupAll(originView: KView, key: number[], callback: (p: KObject[]) => void): void;
                            entry(origin: KObject, accessMode: AccessMode): cache.KCacheEntry;
                            timeTrees(origin: KObject, start: number, end: number, callback: (p: rbtree.IndexRBTree[]) => void): void;
                            save(callback: (p: java.lang.Throwable) => void): void;
                            discard(universe: KUniverse<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                            delete(universe: KUniverse<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                            initKObject(obj: KObject, originView: KView): void;
                            initUniverse(universe: KUniverse<any, any, any>, parent: KUniverse<any, any, any>): void;
                            nextUniverseKey(): number;
                            nextObjectKey(): number;
                            getRoot(originView: KView, callback: (p: KObject) => void): void;
                            setRoot(newRoot: KObject, callback: (p: java.lang.Throwable) => void): void;
                            setContentDeliveryDriver(driver: cdn.KContentDeliveryDriver): void;
                            setScheduler(scheduler: KScheduler): void;
                            operationManager(): util.KOperationManager;
                            connect(callback: (p: java.lang.Throwable) => void): void;
                            close(callback: (p: java.lang.Throwable) => void): void;
                            parentUniverseKey(currentUniverseKey: number): number;
                            descendantsUniverseKeys(currentUniverseKey: number): number[];
                            reload(keys: cache.KContentKey[], callback: (p: java.lang.Throwable) => void): void;
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
                        class LookupAllRunnable implements java.lang.Runnable {
                            private _originView;
                            private _keys;
                            private _callback;
                            private _store;
                            constructor(p_originView: KView, p_keys: number[], p_callback: (p: KObject[]) => void, p_store: DefaultKDataManager);
                            run(): void;
                        }
                        class ResolutionResult {
                            resolvedUniverse: number;
                            universeTree: rbtree.LongRBTree;
                            resolvedQuanta: number;
                            timeTree: rbtree.IndexRBTree;
                        }
                    }
                }
                module extrapolation {
                    class DiscreteExtrapolation implements Extrapolation {
                        private static INSTANCE;
                        static instance(): Extrapolation;
                        extrapolate(current: KObject, attribute: meta.MetaAttribute): any;
                        mutate(current: KObject, attribute: meta.MetaAttribute, payload: any): void;
                        save(cache: any, attribute: meta.MetaAttribute): string;
                        load(payload: string, attribute: meta.MetaAttribute, now: number): any;
                    }
                    interface Extrapolation {
                        extrapolate(current: KObject, attribute: meta.MetaAttribute): any;
                        mutate(current: KObject, attribute: meta.MetaAttribute, payload: any): void;
                        save(cache: any, attribute: meta.MetaAttribute): string;
                        load(payload: string, attribute: meta.MetaAttribute, now: number): any;
                    }
                    class PolynomialExtrapolation implements Extrapolation {
                        private static INSTANCE;
                        extrapolate(current: KObject, attribute: meta.MetaAttribute): any;
                        mutate(current: KObject, attribute: meta.MetaAttribute, payload: any): void;
                        save(cache: any, attribute: meta.MetaAttribute): string;
                        load(payload: string, attribute: meta.MetaAttribute, now: number): any;
                        static instance(): Extrapolation;
                        private createPolynomialModel(origin, precision);
                    }
                }
                module infer {
                    class AnalyticKInfer extends abs.AbstractKObjectInfer {
                        constructor(p_view: KView, p_uuid: number, p_universeTree: rbtree.LongRBTree);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): KInferState;
                    }
                    class GaussianClassificationKInfer extends abs.AbstractKObjectInfer {
                        private alpha;
                        constructor(p_view: KView, p_uuid: number, p_universeTree: rbtree.LongRBTree, p_metaClass: meta.MetaClass);
                        getAlpha(): number;
                        setAlpha(alpha: number): void;
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): KInferState;
                    }
                    class LinearRegressionKInfer extends abs.AbstractKObjectInfer {
                        private alpha;
                        private iterations;
                        getAlpha(): number;
                        setAlpha(alpha: number): void;
                        getIterations(): number;
                        setIterations(iterations: number): void;
                        constructor(p_view: KView, p_uuid: number, p_universeTree: rbtree.LongRBTree, p_metaClass: meta.MetaClass);
                        private calculate(weights, features);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): KInferState;
                    }
                    class PerceptronClassificationKInfer extends abs.AbstractKObjectInfer {
                        private alpha;
                        private iterations;
                        getAlpha(): number;
                        setAlpha(alpha: number): void;
                        getIterations(): number;
                        setIterations(iterations: number): void;
                        constructor(p_view: KView, p_uuid: number, p_universeTree: rbtree.LongRBTree, p_metaClass: meta.MetaClass);
                        private calculate(weights, features);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): KInferState;
                    }
                    class PolynomialOfflineKInfer extends abs.AbstractKObjectInfer {
                        maxDegree: number;
                        toleratedErr: number;
                        getToleratedErr(): number;
                        setToleratedErr(toleratedErr: number): void;
                        getMaxDegree(): number;
                        setMaxDegree(maxDegree: number): void;
                        constructor(p_view: KView, p_uuid: number, p_universeTree: rbtree.LongRBTree, p_metaClass: meta.MetaClass);
                        private calculateLong(time, weights, timeOrigin, unit);
                        private calculate(weights, t);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): KInferState;
                    }
                    class PolynomialOnlineKInfer extends abs.AbstractKObjectInfer {
                        maxDegree: number;
                        toleratedErr: number;
                        getToleratedErr(): number;
                        setToleratedErr(toleratedErr: number): void;
                        getMaxDegree(): number;
                        setMaxDegree(maxDegree: number): void;
                        constructor(p_view: KView, p_uuid: number, p_universeTree: rbtree.LongRBTree, p_metaClass: meta.MetaClass);
                        private calculateLong(time, weights, timeOrigin, unit);
                        private calculate(weights, t);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): KInferState;
                    }
                    class WinnowClassificationKInfer extends abs.AbstractKObjectInfer {
                        private alpha;
                        private beta;
                        getAlpha(): number;
                        setAlpha(alpha: number): void;
                        getBeta(): number;
                        setBeta(beta: number): void;
                        constructor(p_view: KView, p_uuid: number, p_universeTree: rbtree.LongRBTree, p_metaClass: meta.MetaClass);
                        private calculate(weights, features);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): KInferState;
                    }
                    module states {
                        class AnalyticKInferState extends KInferState {
                            private _isDirty;
                            private sumSquares;
                            private sum;
                            private nb;
                            private min;
                            private max;
                            getSumSquares(): number;
                            setSumSquares(sumSquares: number): void;
                            getMin(): number;
                            setMin(min: number): void;
                            getMax(): number;
                            setMax(max: number): void;
                            getNb(): number;
                            setNb(nb: number): void;
                            getSum(): number;
                            setSum(sum: number): void;
                            getAverage(): number;
                            train(value: number): void;
                            getVariance(): number;
                            clear(): void;
                            save(): string;
                            load(payload: string): void;
                            isDirty(): boolean;
                            cloneState(): KInferState;
                        }
                        class BayesianClassificationState extends KInferState {
                            private states;
                            private classStats;
                            private numOfFeatures;
                            private numOfClasses;
                            private static stateSep;
                            private static interStateSep;
                            initialize(metaFeatures: any[], MetaClassification: any): void;
                            predict(features: any[]): number;
                            train(features: any[], classNum: number): void;
                            save(): string;
                            load(payload: string): void;
                            isDirty(): boolean;
                            cloneState(): KInferState;
                        }
                        class DoubleArrayKInferState extends KInferState {
                            private _isDirty;
                            private weights;
                            save(): string;
                            load(payload: string): void;
                            isDirty(): boolean;
                            set_isDirty(value: boolean): void;
                            cloneState(): KInferState;
                            getWeights(): number[];
                            setWeights(weights: number[]): void;
                        }
                        class GaussianArrayKInferState extends KInferState {
                            private _isDirty;
                            private sumSquares;
                            private sum;
                            private epsilon;
                            private nb;
                            getSumSquares(): number[];
                            setSumSquares(sumSquares: number[]): void;
                            getNb(): number;
                            setNb(nb: number): void;
                            getSum(): number[];
                            setSum(sum: number[]): void;
                            calculateProbability(features: number[]): number;
                            infer(features: number[]): boolean;
                            getAverage(): number[];
                            train(features: number[], result: boolean, alpha: number): void;
                            getVariance(): number[];
                            clear(): void;
                            save(): string;
                            load(payload: string): void;
                            isDirty(): boolean;
                            cloneState(): KInferState;
                            getEpsilon(): number;
                        }
                        class PolynomialKInferState extends KInferState {
                            private _isDirty;
                            private timeOrigin;
                            private unit;
                            private weights;
                            getTimeOrigin(): number;
                            setTimeOrigin(timeOrigin: number): void;
                            is_isDirty(): boolean;
                            getUnit(): number;
                            setUnit(unit: number): void;
                            static maxError(coef: number[], normalizedTimes: number[], results: number[]): number;
                            private static internal_extrapolate(normalizedTime, coef);
                            save(): string;
                            load(payload: string): void;
                            isDirty(): boolean;
                            set_isDirty(value: boolean): void;
                            cloneState(): KInferState;
                            getWeights(): number[];
                            setWeights(weights: number[]): void;
                            infer(time: number): any;
                        }
                        module Bayesian {
                            class BayesianSubstate {
                                calculateProbability(feature: any): number;
                                train(feature: any): void;
                                save(separator: string): string;
                                load(payload: string, separator: string): void;
                                cloneState(): BayesianSubstate;
                            }
                            class EnumSubstate extends BayesianSubstate {
                                private counter;
                                private total;
                                getCounter(): number[];
                                setCounter(counter: number[]): void;
                                getTotal(): number;
                                setTotal(total: number): void;
                                initialize(number: number): void;
                                calculateProbability(feature: any): number;
                                train(feature: any): void;
                                save(separator: string): string;
                                load(payload: string, separator: string): void;
                                cloneState(): BayesianSubstate;
                            }
                            class GaussianSubState extends BayesianSubstate {
                                private sumSquares;
                                private sum;
                                private nb;
                                getSumSquares(): number;
                                setSumSquares(sumSquares: number): void;
                                getNb(): number;
                                setNb(nb: number): void;
                                getSum(): number;
                                setSum(sum: number): void;
                                calculateProbability(feature: any): number;
                                getAverage(): number;
                                train(feature: any): void;
                                getVariance(): number;
                                clear(): void;
                                save(separator: string): string;
                                load(payload: string, separator: string): void;
                                cloneState(): BayesianSubstate;
                            }
                        }
                    }
                }
                module json {
                    class JsonFormat implements ModelFormat {
                        private _view;
                        constructor(p_view: KView);
                        save(model: KObject): KDefer<any>;
                        saveRoot(): KDefer<any>;
                        load(payload: string): KDefer<any>;
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
                        static TIME_META: string;
                        static DIM_META: string;
                        static serialize(model: KObject, callback: (p: string) => void): void;
                        static printJSON(elem: KObject, builder: java.lang.StringBuilder, isRoot: boolean): void;
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
                module meta {
                    interface Meta {
                        index(): number;
                        metaName(): string;
                        metaType(): MetaType;
                    }
                    interface MetaAttribute extends Meta {
                        key(): boolean;
                        attributeType(): KType;
                        strategy(): extrapolation.Extrapolation;
                        precision(): number;
                        setExtrapolation(extrapolation: extrapolation.Extrapolation): void;
                    }
                    interface MetaClass extends Meta {
                        metaElements(): Meta[];
                        meta(index: number): Meta;
                        metaAttributes(): MetaAttribute[];
                        metaReferences(): MetaReference[];
                        metaByName(name: string): Meta;
                    }
                    class MetaInferClass implements MetaClass {
                        private static _INSTANCE;
                        private _attributes;
                        private _metaReferences;
                        static getInstance(): MetaInferClass;
                        getRaw(): MetaAttribute;
                        getCache(): MetaAttribute;
                        constructor();
                        metaElements(): Meta[];
                        meta(index: number): Meta;
                        metaAttributes(): MetaAttribute[];
                        metaReferences(): MetaReference[];
                        metaByName(name: string): Meta;
                        metaName(): string;
                        metaType(): MetaType;
                        index(): number;
                    }
                    interface MetaModel extends Meta {
                        metaClasses(): MetaClass[];
                        metaClass(name: string): MetaClass;
                    }
                    interface MetaOperation extends Meta {
                        origin(): Meta;
                    }
                    interface MetaReference extends Meta {
                        contained(): boolean;
                        single(): boolean;
                        attributeType(): MetaClass;
                        opposite(): MetaReference;
                        origin(): MetaClass;
                    }
                    class MetaType {
                        static ATTRIBUTE: MetaType;
                        static REFERENCE: MetaType;
                        static OPERATION: MetaType;
                        static CLASS: MetaType;
                        static MODEL: MetaType;
                        equals(other: any): boolean;
                        static _MetaTypeVALUES: MetaType[];
                        static values(): MetaType[];
                    }
                    class PrimitiveTypes {
                        static STRING: KType;
                        static LONG: KType;
                        static INT: KType;
                        static BOOL: KType;
                        static SHORT: KType;
                        static DOUBLE: KType;
                        static FLOAT: KType;
                        static TRANSIENT: KType;
                    }
                }
                module msg {
                    class KAtomicGetRequest implements KMessage {
                        id: number;
                        key: data.cache.KContentKey;
                        operation: data.cdn.AtomicOperation;
                        json(): string;
                        type(): number;
                    }
                    class KAtomicGetResult implements KMessage {
                        id: number;
                        value: string;
                        json(): string;
                        type(): number;
                    }
                    class KEventMessage implements KMessage {
                        key: data.cache.KContentKey;
                        meta: number[];
                        json(): string;
                        type(): number;
                    }
                    class KGetRequest implements KMessage {
                        id: number;
                        keys: data.cache.KContentKey[];
                        json(): string;
                        type(): number;
                    }
                    class KGetResult implements KMessage {
                        id: number;
                        values: string[];
                        json(): string;
                        type(): number;
                    }
                    interface KMessage {
                        json(): string;
                        type(): number;
                    }
                    class KMessageHelper {
                        static printJsonStart(builder: java.lang.StringBuilder): void;
                        static printJsonEnd(builder: java.lang.StringBuilder): void;
                        static printType(builder: java.lang.StringBuilder, type: number): void;
                        static printElem(elem: any, name: string, builder: java.lang.StringBuilder): void;
                    }
                    class KMessageLoader {
                        static TYPE_NAME: string;
                        static OPERATION_NAME: string;
                        static KEY_NAME: string;
                        static KEYS_NAME: string;
                        static ID_NAME: string;
                        static VALUE_NAME: string;
                        static VALUES_NAME: string;
                        static EVENT_TYPE: number;
                        static GET_REQ_TYPE: number;
                        static GET_RES_TYPE: number;
                        static PUT_REQ_TYPE: number;
                        static PUT_RES_TYPE: number;
                        static OPERATION_CALL_TYPE: number;
                        static OPERATION_RESULT_TYPE: number;
                        static ATOMIC_OPERATION_REQUEST_TYPE: number;
                        static ATOMIC_OPERATION_RESULT_TYPE: number;
                        static load(payload: string): KMessage;
                    }
                    class KOperationCallMessage implements KMessage {
                        id: number;
                        key: data.cache.KContentKey;
                        params: string[];
                        json(): string;
                        type(): number;
                    }
                    class KOperationResultMessage implements KMessage {
                        id: number;
                        value: string;
                        json(): string;
                        type(): number;
                    }
                    class KPutRequest implements KMessage {
                        request: data.cdn.KContentPutRequest;
                        id: number;
                        json(): string;
                        type(): number;
                    }
                    class KPutResult implements KMessage {
                        id: number;
                        json(): string;
                        type(): number;
                    }
                }
                module operation {
                    class DefaultModelCompare {
                        static diff(origin: KObject, target: KObject, callback: (p: trace.TraceSequence) => void): void;
                        static merge(origin: KObject, target: KObject, callback: (p: trace.TraceSequence) => void): void;
                        static intersection(origin: KObject, target: KObject, callback: (p: trace.TraceSequence) => void): void;
                        private static internal_diff(origin, target, inter, merge, callback);
                        private static internal_createTraces(current, sibling, inter, merge, references, attributes);
                    }
                }
                module polynomial {
                    interface PolynomialModel {
                        extrapolate(time: number): number;
                        insert(time: number, value: number): boolean;
                        lastIndex(): number;
                        save(): string;
                        load(payload: string): void;
                        isDirty(): boolean;
                    }
                    module doublepolynomial {
                        class DoublePolynomialModel implements PolynomialModel {
                            private static sep;
                            static sepW: string;
                            private _prioritization;
                            private _maxDegree;
                            private _toleratedError;
                            private _isDirty;
                            private _weights;
                            private _polyTime;
                            constructor(p_timeOrigin: number, p_toleratedError: number, p_maxDegree: number, p_prioritization: util.Prioritization);
                            degree(): number;
                            timeOrigin(): number;
                            comparePolynome(p2: DoublePolynomialModel, err: number): boolean;
                            extrapolate(time: number): number;
                            insert(time: number, value: number): boolean;
                            lastIndex(): number;
                            save(): string;
                            load(payload: string): void;
                            isDirty(): boolean;
                            private maxErr();
                            private internal_feed(time, value);
                            private maxError(computedWeights, time, value);
                            private test_extrapolate(time, weights);
                        }
                        class TimePolynomial {
                            private static toleratedErrorRatio;
                            private _timeOrigin;
                            private _isDirty;
                            private static maxTimeDegree;
                            private _weights;
                            private _nbSamples;
                            private _samplingPeriod;
                            constructor(p_timeOrigin: number);
                            timeOrigin(): number;
                            samplingPeriod(): number;
                            weights(): number[];
                            degree(): number;
                            denormalize(p_time: number): number;
                            getNormalizedTime(id: number): number;
                            extrapolate(id: number): number;
                            nbSamples(): number;
                            insert(time: number): boolean;
                            private maxError(computedWeights, lastId, newtime);
                            private test_extrapolate(id, newWeights);
                            removeLast(): void;
                            lastIndex(): number;
                            save(): string;
                            load(payload: string): void;
                            isDirty(): boolean;
                        }
                    }
                    module simplepolynomial {
                        class SimplePolynomialModel implements PolynomialModel {
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
                            constructor(timeOrigin: number, toleratedError: number, maxDegree: number, prioritization: util.Prioritization);
                            getSamples(): java.util.List<util.DataSample>;
                            getDegree(): number;
                            getTimeOrigin(): number;
                            private getMaxErr(degree, toleratedError, maxDegree, prioritization);
                            private internal_feed(time, value);
                            private maxError(computedWeights, time, value);
                            comparePolynome(p2: SimplePolynomialModel, err: number): boolean;
                            private internal_extrapolate(time, weights);
                            extrapolate(time: number): number;
                            insert(time: number, value: number): boolean;
                            lastIndex(): number;
                            save(): string;
                            load(payload: string): void;
                            isDirty(): boolean;
                        }
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
                module rbtree {
                    class Color {
                        static RED: Color;
                        static BLACK: Color;
                        equals(other: any): boolean;
                        static _ColorVALUES: Color[];
                        static values(): Color[];
                    }
                    class IndexRBTree implements data.cache.KCacheObject {
                        root: TreeNode;
                        private _size;
                        private _dirty;
                        size(): number;
                        isDirty(): boolean;
                        serialize(): string;
                        setClean(): void;
                        toString(): string;
                        unserialize(key: data.cache.KContentKey, payload: string, metaModel: meta.MetaModel): void;
                        previousOrEqual(key: number): TreeNode;
                        nextOrEqual(key: number): TreeNode;
                        previous(key: number): TreeNode;
                        next(key: number): TreeNode;
                        first(): TreeNode;
                        last(): TreeNode;
                        private lookupNode(key);
                        lookup(key: number): number;
                        private rotateLeft(n);
                        private rotateRight(n);
                        private replaceNode(oldn, newn);
                        insert(key: number): void;
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
                    class LongRBTree implements data.cache.KCacheObject {
                        root: LongTreeNode;
                        private _size;
                        _dirty: boolean;
                        size(): number;
                        toString(): string;
                        isDirty(): boolean;
                        serialize(): string;
                        setClean(): void;
                        unserialize(key: data.cache.KContentKey, payload: string, metaModel: meta.MetaModel): void;
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
                    interface RBTree {
                        first(): number;
                        last(): number;
                        next(from: number): number;
                        previous(from: number): number;
                        resolve(time: number): number;
                        size(): number;
                    }
                    class TreeNode {
                        static BLACK: string;
                        static RED: string;
                        key: number;
                        color: Color;
                        private left;
                        private right;
                        private parent;
                        getKey(): number;
                        constructor(key: number, color: Color, left: TreeNode, right: TreeNode);
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
                module reflexive {
                    class DynamicKModel extends abs.AbstractKModel<any> {
                        private _metaModel;
                        setMetaModel(p_metaModel: meta.MetaModel): void;
                        metaModel(): meta.MetaModel;
                        internal_create(key: number): KUniverse<any, any, any>;
                    }
                    class DynamicKObject extends abs.AbstractKObject {
                        constructor(p_view: KView, p_uuid: number, p_universeTree: rbtree.LongRBTree, p_metaClass: meta.MetaClass);
                    }
                    class DynamicKUniverse extends abs.AbstractKUniverse<any, any, any> {
                        constructor(p_universe: KModel<any>, p_key: number);
                        internal_create(timePoint: number): KView;
                    }
                    class DynamicKView extends abs.AbstractKView {
                        constructor(p_now: number, p_dimension: KUniverse<any, any, any>);
                        internalCreate(clazz: meta.MetaClass, p_universeTree: rbtree.LongRBTree, key: number): KObject;
                    }
                    class DynamicMetaClass extends abs.AbstractMetaClass {
                        private cached_meta;
                        private _globalIndex;
                        constructor(p_name: string, p_index: number);
                        addAttribute(p_name: string, p_type: KType): DynamicMetaClass;
                        addReference(p_name: string, p_metaClass: meta.MetaClass, contained: boolean): DynamicMetaClass;
                        addOperation(p_name: string): DynamicMetaClass;
                        private internalInit();
                    }
                    class DynamicMetaModel implements meta.MetaModel {
                        private _metaName;
                        private _classes;
                        constructor(p_metaName: string);
                        metaClasses(): meta.MetaClass[];
                        metaClass(name: string): meta.MetaClass;
                        metaName(): string;
                        metaType(): meta.MetaType;
                        index(): number;
                        createMetaClass(name: string): DynamicMetaClass;
                        model(): KModel<any>;
                    }
                }
                module scheduler {
                    class DirectScheduler implements KScheduler {
                        dispatch(runnable: java.lang.Runnable): void;
                        stop(): void;
                    }
                    class ExecutorServiceScheduler implements KScheduler {
                        dispatch(p_runnable: java.lang.Runnable): void;
                        stop(): void;
                    }
                }
                module trace {
                    class ModelAddTrace implements ModelTrace {
                        private _srcUUID;
                        private _reference;
                        private _paramUUID;
                        constructor(p_srcUUID: number, p_reference: meta.MetaReference, p_paramUUID: number);
                        toString(): string;
                        meta(): meta.Meta;
                        traceType(): KActionType;
                        sourceUUID(): number;
                        paramUUID(): number;
                    }
                    class ModelNewTrace implements ModelTrace {
                        private _srcUUID;
                        private _metaClass;
                        constructor(p_srcUUID: number, p_metaClass: meta.MetaClass);
                        meta(): meta.Meta;
                        traceType(): KActionType;
                        sourceUUID(): number;
                    }
                    class ModelRemoveTrace implements ModelTrace {
                        private _srcUUID;
                        private _reference;
                        private _paramUUID;
                        constructor(p_srcUUID: number, p_reference: meta.MetaReference, p_paramUUID: number);
                        toString(): string;
                        meta(): meta.Meta;
                        traceType(): KActionType;
                        sourceUUID(): number;
                        paramUUID(): number;
                    }
                    class ModelSetTrace implements ModelTrace {
                        private _srcUUID;
                        private _attribute;
                        private _content;
                        constructor(p_srcUUID: number, p_attribute: meta.MetaAttribute, p_content: any);
                        toString(): string;
                        meta(): meta.Meta;
                        traceType(): KActionType;
                        sourceUUID(): number;
                        content(): any;
                    }
                    interface ModelTrace {
                        meta(): meta.Meta;
                        traceType(): KActionType;
                        sourceUUID(): number;
                    }
                    class ModelTraceApplicator {
                        private _targetModel;
                        constructor(p_targetModel: KObject);
                        applyTraceSequence(traceSeq: TraceSequence, callback: (p: java.lang.Throwable) => void): void;
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
                        static sep: ModelTraceConstants;
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
                        toString(): string;
                        applyOn(target: KObject, callback: (p: java.lang.Throwable) => void): boolean;
                        reverse(): TraceSequence;
                        size(): number;
                    }
                }
                module traversal {
                    class DefaultKTraversal implements KTraversal {
                        private _initObjs;
                        private _initAction;
                        private _lastAction;
                        private _terminated;
                        private static TERMINATED_MESSAGE;
                        constructor(p_root: KObject, p_initAction: KTraversalAction);
                        traverse(p_metaReference: meta.MetaReference): KTraversal;
                        traverseQuery(p_metaReferenceQuery: string): KTraversal;
                        withAttribute(p_attribute: meta.MetaAttribute, p_expectedValue: any): KTraversal;
                        withoutAttribute(p_attribute: meta.MetaAttribute, p_expectedValue: any): KTraversal;
                        attributeQuery(p_attributeQuery: string): KTraversal;
                        filter(p_filter: (p: KObject) => boolean): KTraversal;
                        reverse(p_metaReference: meta.MetaReference): KTraversal;
                        reverseQuery(p_metaReferenceQuery: string): KTraversal;
                        parents(): KTraversal;
                        then(): KDefer<any>;
                        map(attribute: meta.MetaAttribute): KDefer<any>;
                    }
                    interface KTraversal {
                        traverse(metaReference: meta.MetaReference): KTraversal;
                        traverseQuery(metaReferenceQuery: string): KTraversal;
                        attributeQuery(attributeQuery: string): KTraversal;
                        withAttribute(attribute: meta.MetaAttribute, expectedValue: any): KTraversal;
                        withoutAttribute(attribute: meta.MetaAttribute, expectedValue: any): KTraversal;
                        filter(filter: (p: KObject) => boolean): KTraversal;
                        reverse(metaReference: meta.MetaReference): KTraversal;
                        reverseQuery(metaReferenceQuery: string): KTraversal;
                        parents(): KTraversal;
                        then(): KDefer<any>;
                        map(attribute: meta.MetaAttribute): KDefer<any>;
                    }
                    interface KTraversalAction {
                        chain(next: KTraversalAction): void;
                        execute(inputs: KObject[]): void;
                    }
                    interface KTraversalFilter {
                        filter(obj: KObject): boolean;
                    }
                    module actions {
                        class KFilterAction implements KTraversalAction {
                            private _next;
                            private _filter;
                            constructor(p_filter: (p: KObject) => boolean);
                            chain(p_next: KTraversalAction): void;
                            execute(p_inputs: KObject[]): void;
                        }
                        class KFilterAttributeAction implements KTraversalAction {
                            private _next;
                            private _attribute;
                            private _expectedValue;
                            constructor(p_attribute: meta.MetaAttribute, p_expectedValue: any);
                            chain(p_next: KTraversalAction): void;
                            execute(p_inputs: KObject[]): void;
                        }
                        class KFilterAttributeQueryAction implements KTraversalAction {
                            private _next;
                            private _attributeQuery;
                            constructor(p_attributeQuery: string);
                            chain(p_next: KTraversalAction): void;
                            execute(p_inputs: KObject[]): void;
                            private buildParams(p_paramString);
                        }
                        class KFilterNotAttributeAction implements KTraversalAction {
                            private _next;
                            private _attribute;
                            private _expectedValue;
                            constructor(p_attribute: meta.MetaAttribute, p_expectedValue: any);
                            chain(p_next: KTraversalAction): void;
                            execute(p_inputs: KObject[]): void;
                        }
                        class KFinalAction implements KTraversalAction {
                            private _finalCallback;
                            constructor(p_callback: (p: KObject[]) => void);
                            chain(next: KTraversalAction): void;
                            execute(inputs: KObject[]): void;
                        }
                        class KMapAction implements KTraversalAction {
                            private _finalCallback;
                            private _attribute;
                            constructor(p_attribute: meta.MetaAttribute, p_callback: (p: any[]) => void);
                            chain(next: KTraversalAction): void;
                            execute(inputs: KObject[]): void;
                        }
                        class KParentsAction implements KTraversalAction {
                            private _next;
                            constructor();
                            chain(p_next: KTraversalAction): void;
                            execute(p_inputs: KObject[]): void;
                        }
                        class KReverseAction implements KTraversalAction {
                            private _next;
                            private _reference;
                            constructor(p_reference: meta.MetaReference);
                            chain(p_next: KTraversalAction): void;
                            execute(p_inputs: KObject[]): void;
                        }
                        class KReverseQueryAction implements KTraversalAction {
                            private _next;
                            private _referenceQuery;
                            constructor(p_referenceQuery: string);
                            chain(p_next: KTraversalAction): void;
                            execute(p_inputs: KObject[]): void;
                        }
                        class KTraverseAction implements KTraversalAction {
                            private _next;
                            private _reference;
                            constructor(p_reference: meta.MetaReference);
                            chain(p_next: KTraversalAction): void;
                            execute(p_inputs: KObject[]): void;
                        }
                        class KTraverseQueryAction implements KTraversalAction {
                            private SEP;
                            private _next;
                            private _referenceQuery;
                            constructor(p_referenceQuery: string);
                            chain(p_next: KTraversalAction): void;
                            execute(p_inputs: KObject[]): void;
                        }
                    }
                    module selector {
                        class KQuery {
                            static OPEN_BRACKET: string;
                            static CLOSE_BRACKET: string;
                            static QUERY_SEP: string;
                            relationName: string;
                            params: string;
                            constructor(relationName: string, params: string);
                            toString(): string;
                            static buildChain(query: string): java.util.List<KQuery>;
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
                }
                module util {
                    class Checker {
                        static isDefined(param: any): boolean;
                    }
                    class DefaultOperationManager implements KOperationManager {
                        private staticOperations;
                        private instanceOperations;
                        private _manager;
                        private static DIM_INDEX;
                        private static TIME_INDEX;
                        private static UUID_INDEX;
                        private static OPERATION_INDEX;
                        private static TUPLE_SIZE;
                        private remoteCallCallbacks;
                        constructor(p_manager: data.manager.KDataManager);
                        registerOperation(operation: meta.MetaOperation, callback: (p: KObject, p1: any[], p2: (p: any) => void) => void, target: KObject): void;
                        private searchOperation(source, clazz, operation);
                        call(source: KObject, operation: meta.MetaOperation, param: any[], callback: (p: any) => void): void;
                        private sendToRemote(source, operation, param, callback);
                        private protectString(input);
                        private parseParams(inParams);
                    }
                    interface KOperationManager {
                        registerOperation(operation: meta.MetaOperation, callback: (p: KObject, p1: any[], p2: (p: any) => void) => void, target: KObject): void;
                        call(source: KObject, operation: meta.MetaOperation, param: any[], callback: (p: any) => void): void;
                    }
                    class LocalEventListeners {
                        private static DIM_INDEX;
                        private static TIME_INDEX;
                        private static UUID_INDEX;
                        private static TUPLE_SIZE;
                        private listeners;
                        registerListener(origin: any, listener: (p: KObject, p1: meta.Meta[]) => void, scope: any): void;
                        dispatch(src: KObject, modications: meta.Meta[]): void;
                        unregister(listener: (p: KObject, p1: meta.Meta[]) => void): void;
                        clear(): void;
                    }
                    class PathHelper {
                        static pathSep: string;
                        private static pathIDOpen;
                        private static pathIDClose;
                        private static rootPath;
                        static parentPath(currentPath: string): string;
                        static isRoot(path: string): boolean;
                        static path(parent: string, reference: meta.MetaReference, target: KObject): string;
                    }
                    class TimeWalker {
                        private _origin;
                        constructor(p_origin: KObject);
                        walk(walker: (p: number) => void): KDefer<any>;
                        walkAsc(walker: (p: number) => void): KDefer<any>;
                        walkDesc(walker: (p: number) => void): KDefer<any>;
                        private internal_walk(walker, asc);
                        private internal_walk_range(walker, asc, from, to);
                        walkRangeAsc(walker: (p: number) => void, from: number, to: number): KDefer<any>;
                        walkRangeDesc(walker: (p: number) => void, from: number, to: number): KDefer<any>;
                    }
                }
                module xmi {
                    class SerializationContext {
                        ignoreGeneratedID: boolean;
                        model: KObject;
                        finishCallback: (p: string) => void;
                        printer: java.lang.StringBuilder;
                        attributesVisitor: (p: meta.MetaAttribute, p1: any) => void;
                        addressTable: java.util.HashMap<number, string>;
                        elementsCount: java.util.HashMap<string, number>;
                        packageList: java.util.ArrayList<string>;
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
                        static save(model: KObject, callback: (p: string) => void): void;
                        static escapeXml(ostream: java.lang.StringBuilder, chain: string): void;
                        static formatMetaClassName(metaClassName: string): string;
                        private static nonContainedReferenceTaskMaker(ref, p_context, p_currentElement);
                        private static containedReferenceTaskMaker(ref, context, currentElement);
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
                    class XmiFormat implements ModelFormat {
                        private _view;
                        constructor(p_view: KView);
                        save(model: KObject): KDefer<any>;
                        saveRoot(): KDefer<any>;
                        load(payload: string): KDefer<any>;
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
