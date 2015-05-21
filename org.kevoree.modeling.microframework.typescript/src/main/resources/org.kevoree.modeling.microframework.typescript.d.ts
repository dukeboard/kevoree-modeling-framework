declare module org {
    module kevoree {
        module modeling {
            module api {
                interface Callback<A> {
                    on(a: A): void;
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
                    static parse(s: string): org.kevoree.modeling.api.KActionType;
                    equals(other: any): boolean;
                    static _KActionTypeVALUES: KActionType[];
                    static values(): KActionType[];
                }
                class KConfig {
                    static TREE_CACHE_SIZE: number;
                    static CALLBACK_HISTORY: number;
                    static LONG_SIZE: number;
                    static PREFIX_SIZE: number;
                    static BEGINNING_OF_TIME: number;
                    static END_OF_TIME: number;
                    static NULL_LONG: number;
                    static KEY_PREFIX_MASK: number;
                    static KEY_SEP: string;
                    static KEY_SIZE: number;
                    static CACHE_INIT_SIZE: number;
                    static CACHE_LOAD_FACTOR: number;
                }
                interface KDefer {
                    wait(resultName: string): (p: any) => void;
                    waitDefer(previous: org.kevoree.modeling.api.KDefer): org.kevoree.modeling.api.KDefer;
                    isDone(): boolean;
                    getResult(resultName: string): any;
                    then(cb: (p: any) => void): void;
                    next(): org.kevoree.modeling.api.KDefer;
                }
                interface KEventListener {
                    on(src: org.kevoree.modeling.api.KObject, modifications: org.kevoree.modeling.api.meta.Meta[]): void;
                }
                interface KEventMultiListener {
                    on(objects: org.kevoree.modeling.api.KObject[]): void;
                }
                interface KInfer extends org.kevoree.modeling.api.KObject {
                    train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                    infer(features: any[]): any;
                    accuracy(testSet: any[][], expectedResultSet: any[]): any;
                    clear(): void;
                }
                class KInferState {
                    save(): string;
                    load(payload: string): void;
                    isDirty(): boolean;
                    cloneState(): org.kevoree.modeling.api.KInferState;
                }
                interface KModel<A extends org.kevoree.modeling.api.KUniverse<any, any, any>> {
                    key(): number;
                    newUniverse(): A;
                    universe(key: number): A;
                    manager(): org.kevoree.modeling.api.data.manager.KDataManager;
                    setContentDeliveryDriver(dataBase: org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver): org.kevoree.modeling.api.KModel<any>;
                    setScheduler(scheduler: org.kevoree.modeling.api.KScheduler): org.kevoree.modeling.api.KModel<any>;
                    setOperation(metaOperation: org.kevoree.modeling.api.meta.MetaOperation, operation: (p: org.kevoree.modeling.api.KObject, p1: any[], p2: (p: any) => void) => void): void;
                    setInstanceOperation(metaOperation: org.kevoree.modeling.api.meta.MetaOperation, target: org.kevoree.modeling.api.KObject, operation: (p: org.kevoree.modeling.api.KObject, p1: any[], p2: (p: any) => void) => void): void;
                    metaModel(): org.kevoree.modeling.api.meta.MetaModel;
                    defer(): org.kevoree.modeling.api.KDefer;
                    save(cb: (p: any) => void): void;
                    discard(cb: (p: any) => void): void;
                    connect(cb: (p: any) => void): void;
                    close(cb: (p: any) => void): void;
                    clearListenerGroup(groupID: number): void;
                    nextGroup(): number;
                    createByName(metaClassName: string, universe: number, time: number): org.kevoree.modeling.api.KObject;
                    create(clazz: org.kevoree.modeling.api.meta.MetaClass, universe: number, time: number): org.kevoree.modeling.api.KObject;
                }
                interface KModelAttributeVisitor {
                    visit(metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute, value: any): void;
                }
                interface KModelFormat {
                    save(model: org.kevoree.modeling.api.KObject, cb: (p: string) => void): void;
                    saveRoot(cb: (p: string) => void): void;
                    load(payload: string, cb: (p: any) => void): void;
                }
                interface KModelVisitor {
                    visit(elem: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KVisitResult;
                }
                interface KObject {
                    universe(): number;
                    now(): number;
                    uuid(): number;
                    delete(cb: (p: any) => void): void;
                    select(query: string, cb: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                    listen(groupId: number, listener: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.meta.Meta[]) => void): void;
                    visitAttributes(visitor: (p: org.kevoree.modeling.api.meta.MetaAttribute, p1: any) => void): void;
                    visit(visitor: (p: org.kevoree.modeling.api.KObject) => org.kevoree.modeling.api.KVisitResult, cb: (p: any) => void): void;
                    timeWalker(): org.kevoree.modeling.api.KTimeWalker;
                    domainKey(): string;
                    metaClass(): org.kevoree.modeling.api.meta.MetaClass;
                    mutate(actionType: org.kevoree.modeling.api.KActionType, metaReference: org.kevoree.modeling.api.meta.MetaReference, param: org.kevoree.modeling.api.KObject): void;
                    ref(metaReference: org.kevoree.modeling.api.meta.MetaReference, cb: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                    traversal(): org.kevoree.modeling.api.traversal.KTraversal;
                    get(attribute: org.kevoree.modeling.api.meta.MetaAttribute): any;
                    getByName(atributeName: string): any;
                    set(attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void;
                    setByName(atributeName: string, payload: any): void;
                    toJSON(): string;
                    equals(other: any): boolean;
                    jump(time: number, callback: (p: org.kevoree.modeling.api.KObject) => void): void;
                    referencesWith(o: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.meta.MetaReference[];
                    call(operation: org.kevoree.modeling.api.meta.MetaOperation, params: any[], cb: (p: any) => void): void;
                }
                interface KOperation {
                    on(source: org.kevoree.modeling.api.KObject, params: any[], result: (p: any) => void): void;
                }
                interface KScheduler {
                    dispatch(runnable: java.lang.Runnable): void;
                    stop(): void;
                }
                interface KTimeWalker {
                    allTimes(cb: (p: number[]) => void): void;
                    timesBefore(endOfSearch: number, cb: (p: number[]) => void): void;
                    timesAfter(beginningOfSearch: number, cb: (p: number[]) => void): void;
                    timesBetween(beginningOfSearch: number, endOfSearch: number, cb: (p: number[]) => void): void;
                }
                interface KType {
                    name(): string;
                    isEnum(): boolean;
                    save(src: any): string;
                    load(payload: string): any;
                }
                interface KUniverse<A extends org.kevoree.modeling.api.KView, B extends org.kevoree.modeling.api.KUniverse<any, any, any>, C extends org.kevoree.modeling.api.KModel<any>> {
                    key(): number;
                    time(timePoint: number): A;
                    model(): C;
                    equals(other: any): boolean;
                    diverge(): B;
                    origin(): B;
                    descendants(): java.util.List<B>;
                    delete(cb: (p: any) => void): void;
                    lookupAllTimes(uuid: number, times: number[], cb: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                    listenAll(groupId: number, objects: number[], multiListener: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                }
                interface KView {
                    createByName(metaClassName: string): org.kevoree.modeling.api.KObject;
                    create(clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject;
                    select(query: string, cb: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                    lookup(key: number, cb: (p: org.kevoree.modeling.api.KObject) => void): void;
                    lookupAll(keys: number[], cb: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                    universe(): number;
                    now(): number;
                    json(): org.kevoree.modeling.api.KModelFormat;
                    xmi(): org.kevoree.modeling.api.KModelFormat;
                    equals(other: any): boolean;
                    setRoot(elem: org.kevoree.modeling.api.KObject, cb: (p: any) => void): void;
                    getRoot(cb: (p: org.kevoree.modeling.api.KObject) => void): void;
                }
                class KVisitResult {
                    static CONTINUE: KVisitResult;
                    static SKIP: KVisitResult;
                    static STOP: KVisitResult;
                    equals(other: any): boolean;
                    static _KVisitResultVALUES: KVisitResult[];
                    static values(): KVisitResult[];
                }
                interface ThrowableCallback<A> {
                    on(a: A, error: java.lang.Throwable): void;
                }
                module abs {
                    class AbstractKDataType implements org.kevoree.modeling.api.KType {
                        private _name;
                        private _isEnum;
                        constructor(p_name: string, p_isEnum: boolean);
                        name(): string;
                        isEnum(): boolean;
                        save(src: any): string;
                        load(payload: string): any;
                    }
                    class AbstractKDefer implements org.kevoree.modeling.api.KDefer {
                        private _isDone;
                        _isReady: boolean;
                        private _nbRecResult;
                        private _nbExpectedResult;
                        private _nextTasks;
                        private _results;
                        private _thenCB;
                        constructor();
                        setDoneOrRegister(next: org.kevoree.modeling.api.KDefer): boolean;
                        equals(obj: any): boolean;
                        private informParentEnd(end);
                        waitDefer(p_previous: org.kevoree.modeling.api.KDefer): org.kevoree.modeling.api.KDefer;
                        next(): org.kevoree.modeling.api.KDefer;
                        wait(resultName: string): (p: any) => void;
                        isDone(): boolean;
                        getResult(resultName: string): any;
                        then(cb: (p: any) => void): void;
                    }
                    class AbstractKModel<A extends org.kevoree.modeling.api.KUniverse<any, any, any>> implements org.kevoree.modeling.api.KModel<any> {
                        _manager: org.kevoree.modeling.api.data.manager.KDataManager;
                        private _key;
                        constructor();
                        metaModel(): org.kevoree.modeling.api.meta.MetaModel;
                        connect(cb: (p: any) => void): void;
                        close(cb: (p: any) => void): void;
                        manager(): org.kevoree.modeling.api.data.manager.KDataManager;
                        newUniverse(): A;
                        internalCreateUniverse(universe: number): A;
                        internalCreateObject(universe: number, time: number, uuid: number, clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject;
                        createProxy(universe: number, time: number, uuid: number, clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject;
                        universe(key: number): A;
                        save(cb: (p: any) => void): void;
                        discard(cb: (p: any) => void): void;
                        setContentDeliveryDriver(p_driver: org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver): org.kevoree.modeling.api.KModel<any>;
                        setScheduler(p_scheduler: org.kevoree.modeling.api.KScheduler): org.kevoree.modeling.api.KModel<any>;
                        setOperation(metaOperation: org.kevoree.modeling.api.meta.MetaOperation, operation: (p: org.kevoree.modeling.api.KObject, p1: any[], p2: (p: any) => void) => void): void;
                        setInstanceOperation(metaOperation: org.kevoree.modeling.api.meta.MetaOperation, target: org.kevoree.modeling.api.KObject, operation: (p: org.kevoree.modeling.api.KObject, p1: any[], p2: (p: any) => void) => void): void;
                        defer(): org.kevoree.modeling.api.KDefer;
                        key(): number;
                        clearListenerGroup(groupID: number): void;
                        nextGroup(): number;
                        create(clazz: org.kevoree.modeling.api.meta.MetaClass, universe: number, time: number): org.kevoree.modeling.api.KObject;
                        createByName(metaClassName: string, universe: number, time: number): org.kevoree.modeling.api.KObject;
                    }
                    class AbstractKObject implements org.kevoree.modeling.api.KObject {
                        _uuid: number;
                        _time: number;
                        _universe: number;
                        private _metaClass;
                        _manager: org.kevoree.modeling.api.data.manager.KDataManager;
                        private static OUT_OF_CACHE_MSG;
                        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                        uuid(): number;
                        metaClass(): org.kevoree.modeling.api.meta.MetaClass;
                        now(): number;
                        universe(): number;
                        timeWalker(): org.kevoree.modeling.api.KTimeWalker;
                        delete(cb: (p: any) => void): void;
                        select(query: string, cb: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                        listen(groupId: number, listener: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.meta.Meta[]) => void): void;
                        domainKey(): string;
                        get(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute): any;
                        getByName(atributeName: string): any;
                        set(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void;
                        setByName(atributeName: string, payload: any): void;
                        mutate(actionType: org.kevoree.modeling.api.KActionType, metaReference: org.kevoree.modeling.api.meta.MetaReference, param: org.kevoree.modeling.api.KObject): void;
                        internal_mutate(actionType: org.kevoree.modeling.api.KActionType, metaReferenceP: org.kevoree.modeling.api.meta.MetaReference, param: org.kevoree.modeling.api.KObject, setOpposite: boolean): void;
                        size(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): number;
                        internal_ref(p_metaReference: org.kevoree.modeling.api.meta.MetaReference, callback: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                        ref(p_metaReference: org.kevoree.modeling.api.meta.MetaReference, cb: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                        visitAttributes(visitor: (p: org.kevoree.modeling.api.meta.MetaAttribute, p1: any) => void): void;
                        visit(p_visitor: (p: org.kevoree.modeling.api.KObject) => org.kevoree.modeling.api.KVisitResult, cb: (p: any) => void): void;
                        private internal_visit(visitor, end, visited, traversed);
                        toJSON(): string;
                        toString(): string;
                        equals(obj: any): boolean;
                        hashCode(): number;
                        jump(p_time: number, p_callback: (p: org.kevoree.modeling.api.KObject) => void): void;
                        internal_transpose_ref(p: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.meta.MetaReference;
                        internal_transpose_att(p: org.kevoree.modeling.api.meta.MetaAttribute): org.kevoree.modeling.api.meta.MetaAttribute;
                        internal_transpose_op(p: org.kevoree.modeling.api.meta.MetaOperation): org.kevoree.modeling.api.meta.MetaOperation;
                        traversal(): org.kevoree.modeling.api.traversal.KTraversal;
                        referencesWith(o: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.meta.MetaReference[];
                        call(p_operation: org.kevoree.modeling.api.meta.MetaOperation, p_params: any[], cb: (p: any) => void): void;
                    }
                    class AbstractKObjectInfer extends org.kevoree.modeling.api.abs.AbstractKObject implements org.kevoree.modeling.api.KInfer {
                        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                        readOnlyState(): org.kevoree.modeling.api.KInferState;
                        modifyState(): org.kevoree.modeling.api.KInferState;
                        private internal_load(raw);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): org.kevoree.modeling.api.KInferState;
                    }
                    class AbstractKUniverse<A extends org.kevoree.modeling.api.KView, B extends org.kevoree.modeling.api.KUniverse<any, any, any>, C extends org.kevoree.modeling.api.KModel<any>> implements org.kevoree.modeling.api.KUniverse<any, any, any> {
                        _universe: number;
                        _manager: org.kevoree.modeling.api.data.manager.KDataManager;
                        constructor(p_key: number, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                        key(): number;
                        model(): C;
                        delete(cb: (p: any) => void): void;
                        time(timePoint: number): A;
                        internal_create(timePoint: number): A;
                        equals(obj: any): boolean;
                        origin(): B;
                        diverge(): B;
                        descendants(): java.util.List<B>;
                        lookupAllTimes(uuid: number, times: number[], cb: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                        listenAll(groupId: number, objects: number[], multiListener: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                    }
                    class AbstractKView implements org.kevoree.modeling.api.KView {
                        _time: number;
                        _universe: number;
                        _manager: org.kevoree.modeling.api.data.manager.KDataManager;
                        constructor(p_universe: number, _time: number, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                        now(): number;
                        universe(): number;
                        setRoot(elem: org.kevoree.modeling.api.KObject, cb: (p: any) => void): void;
                        getRoot(cb: (p: any) => void): void;
                        select(query: string, cb: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                        lookup(kid: number, cb: (p: org.kevoree.modeling.api.KObject) => void): void;
                        lookupAll(keys: number[], cb: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                        create(clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject;
                        createByName(metaClassName: string): org.kevoree.modeling.api.KObject;
                        json(): org.kevoree.modeling.api.KModelFormat;
                        xmi(): org.kevoree.modeling.api.KModelFormat;
                        equals(obj: any): boolean;
                    }
                    class AbstractMetaAttribute implements org.kevoree.modeling.api.meta.MetaAttribute {
                        private _name;
                        private _index;
                        _precision: number;
                        private _key;
                        private _metaType;
                        private _extrapolation;
                        attributeType(): org.kevoree.modeling.api.KType;
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.api.meta.MetaType;
                        precision(): number;
                        key(): boolean;
                        strategy(): org.kevoree.modeling.api.extrapolation.Extrapolation;
                        setExtrapolation(extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation): void;
                        constructor(p_name: string, p_index: number, p_precision: number, p_key: boolean, p_metaType: org.kevoree.modeling.api.KType, p_extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation);
                    }
                    class AbstractMetaClass implements org.kevoree.modeling.api.meta.MetaClass {
                        private _name;
                        private _index;
                        private _meta;
                        private _atts;
                        private _refs;
                        private _indexes;
                        metaByName(name: string): org.kevoree.modeling.api.meta.Meta;
                        attribute(name: string): org.kevoree.modeling.api.meta.MetaAttribute;
                        reference(name: string): org.kevoree.modeling.api.meta.MetaReference;
                        operation(name: string): org.kevoree.modeling.api.meta.MetaOperation;
                        metaElements(): org.kevoree.modeling.api.meta.Meta[];
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.api.meta.MetaType;
                        constructor(p_name: string, p_index: number);
                        init(p_meta: org.kevoree.modeling.api.meta.Meta[]): void;
                        meta(index: number): org.kevoree.modeling.api.meta.Meta;
                        metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[];
                        metaReferences(): org.kevoree.modeling.api.meta.MetaReference[];
                    }
                    class AbstractMetaModel implements org.kevoree.modeling.api.meta.MetaModel {
                        private _name;
                        private _index;
                        private _metaClasses;
                        private _metaClasses_indexes;
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.api.meta.MetaType;
                        constructor(p_name: string, p_index: number);
                        metaClasses(): org.kevoree.modeling.api.meta.MetaClass[];
                        metaClass(name: string): org.kevoree.modeling.api.meta.MetaClass;
                        init(p_metaClasses: org.kevoree.modeling.api.meta.MetaClass[]): void;
                    }
                    class AbstractMetaOperation implements org.kevoree.modeling.api.meta.MetaOperation {
                        private _name;
                        private _index;
                        private _lazyMetaClass;
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.api.meta.MetaType;
                        constructor(p_name: string, p_index: number, p_lazyMetaClass: () => org.kevoree.modeling.api.meta.Meta);
                        origin(): org.kevoree.modeling.api.meta.MetaClass;
                    }
                    class AbstractMetaReference implements org.kevoree.modeling.api.meta.MetaReference {
                        private _name;
                        private _index;
                        private _contained;
                        private _single;
                        private _lazyMetaType;
                        private _op_name;
                        private _lazyMetaOrigin;
                        single(): boolean;
                        type(): org.kevoree.modeling.api.meta.MetaClass;
                        opposite(): org.kevoree.modeling.api.meta.MetaReference;
                        origin(): org.kevoree.modeling.api.meta.MetaClass;
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.api.meta.MetaType;
                        contained(): boolean;
                        constructor(p_name: string, p_index: number, p_contained: boolean, p_single: boolean, p_lazyMetaType: () => org.kevoree.modeling.api.meta.Meta, op_name: string, p_lazyMetaOrigin: () => org.kevoree.modeling.api.meta.Meta);
                    }
                    class AbstractTimeWalker implements org.kevoree.modeling.api.KTimeWalker {
                        private _origin;
                        constructor(p_origin: org.kevoree.modeling.api.abs.AbstractKObject);
                        private internal_times(start, end, cb);
                        allTimes(cb: (p: number[]) => void): void;
                        timesBefore(endOfSearch: number, cb: (p: number[]) => void): void;
                        timesAfter(beginningOfSearch: number, cb: (p: number[]) => void): void;
                        timesBetween(beginningOfSearch: number, endOfSearch: number, cb: (p: number[]) => void): void;
                    }
                    interface LazyResolver {
                        meta(): org.kevoree.modeling.api.meta.Meta;
                    }
                }
                module data {
                    module cache {
                        class HashMemoryCache implements org.kevoree.modeling.api.data.cache.KCache {
                            elementData: org.kevoree.modeling.api.data.cache.HashMemoryCache.Entry[];
                            private elementCount;
                            private elementDataSize;
                            private loadFactor;
                            private initalCapacity;
                            private threshold;
                            modCount: number;
                            get(universe: number, time: number, obj: number): org.kevoree.modeling.api.data.cache.KCacheObject;
                            put(universe: number, time: number, obj: number, payload: org.kevoree.modeling.api.data.cache.KCacheObject): void;
                            private complex_insert(previousIndex, hash, universe, time, obj);
                            dirties(): org.kevoree.modeling.api.data.cache.KCacheDirty[];
                            clean(): void;
                            monitor(origin: org.kevoree.modeling.api.KObject): void;
                            constructor();
                            clear(): void;
                        }
                        module HashMemoryCache {
                            class Entry {
                                next: org.kevoree.modeling.api.data.cache.HashMemoryCache.Entry;
                                universe: number;
                                time: number;
                                obj: number;
                                value: org.kevoree.modeling.api.data.cache.KCacheObject;
                            }
                        }
                        interface KCache {
                            get(universe: number, time: number, obj: number): org.kevoree.modeling.api.data.cache.KCacheObject;
                            put(universe: number, time: number, obj: number, payload: org.kevoree.modeling.api.data.cache.KCacheObject): void;
                            dirties(): org.kevoree.modeling.api.data.cache.KCacheDirty[];
                            clear(): void;
                            clean(): void;
                            monitor(origin: org.kevoree.modeling.api.KObject): void;
                        }
                        class KCacheDirty {
                            key: org.kevoree.modeling.api.data.cache.KContentKey;
                            object: org.kevoree.modeling.api.data.cache.KCacheObject;
                            constructor(key: org.kevoree.modeling.api.data.cache.KContentKey, object: org.kevoree.modeling.api.data.cache.KCacheObject);
                        }
                        class KCacheEntry implements org.kevoree.modeling.api.data.cache.KCacheObject {
                            metaClass: org.kevoree.modeling.api.meta.MetaClass;
                            private raw;
                            _modifiedIndexes: boolean[];
                            _dirty: boolean;
                            private _counter;
                            initRaw(p_size: number): void;
                            isDirty(): boolean;
                            modifiedIndexes(): number[];
                            serialize(): string;
                            setClean(): void;
                            unserialize(key: org.kevoree.modeling.api.data.cache.KContentKey, payload: string, metaModel: org.kevoree.modeling.api.meta.MetaModel): void;
                            counter(): number;
                            inc(): void;
                            dec(): void;
                            get(index: number): any;
                            getRef(index: number): number[];
                            set(index: number, content: any): void;
                            sizeRaw(): number;
                            clone(): org.kevoree.modeling.api.data.cache.KCacheEntry;
                        }
                        interface KCacheObject {
                            isDirty(): boolean;
                            serialize(): string;
                            setClean(): void;
                            unserialize(key: org.kevoree.modeling.api.data.cache.KContentKey, payload: string, metaModel: org.kevoree.modeling.api.meta.MetaModel): void;
                            counter(): number;
                            inc(): void;
                            dec(): void;
                        }
                        class KContentKey {
                            universe: number;
                            time: number;
                            obj: number;
                            constructor(p_universeID: number, p_timeID: number, p_objID: number);
                            static createUniverseTree(p_objectID: number): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createTimeTree(p_universeID: number, p_objectID: number): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createObject(p_universeID: number, p_quantaID: number, p_objectID: number): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createGlobalUniverseTree(): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createRootUniverseTree(): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createRootTimeTree(universeID: number): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createLastPrefix(): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createLastObjectIndexFromPrefix(prefix: number): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createLastUniverseIndexFromPrefix(prefix: number): org.kevoree.modeling.api.data.cache.KContentKey;
                            static create(payload: string): org.kevoree.modeling.api.data.cache.KContentKey;
                            toString(): string;
                            equals(param: any): boolean;
                        }
                    }
                    module cdn {
                        interface AtomicOperation {
                            operationKey(): number;
                            mutate(previous: string): string;
                        }
                        class AtomicOperationFactory {
                            static PREFIX_MUTATE_OPERATION: number;
                            static getMutatePrefixOperation(): org.kevoree.modeling.api.data.cdn.AtomicOperation;
                            static getOperationWithKey(key: number): org.kevoree.modeling.api.data.cdn.AtomicOperation;
                        }
                        interface KContentDeliveryDriver {
                            atomicGetMutate(key: org.kevoree.modeling.api.data.cache.KContentKey, operation: org.kevoree.modeling.api.data.cdn.AtomicOperation, callback: (p: string, p1: java.lang.Throwable) => void): void;
                            get(keys: org.kevoree.modeling.api.data.cache.KContentKey[], callback: (p: string[], p1: java.lang.Throwable) => void): void;
                            put(request: org.kevoree.modeling.api.data.cdn.KContentPutRequest, error: (p: java.lang.Throwable) => void): void;
                            remove(keys: string[], error: (p: java.lang.Throwable) => void): void;
                            connect(callback: (p: java.lang.Throwable) => void): void;
                            close(callback: (p: java.lang.Throwable) => void): void;
                            registerListener(groupId: number, origin: org.kevoree.modeling.api.KObject, listener: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.meta.Meta[]) => void): void;
                            registerMultiListener(groupId: number, origin: org.kevoree.modeling.api.KUniverse<any, any, any>, objects: number[], listener: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                            unregisterGroup(groupId: number): void;
                            send(msgs: org.kevoree.modeling.api.msg.KMessage): void;
                            setManager(manager: org.kevoree.modeling.api.data.manager.KDataManager): void;
                        }
                        class KContentPutRequest {
                            private _content;
                            private static KEY_INDEX;
                            private static CONTENT_INDEX;
                            private static SIZE_INDEX;
                            private _size;
                            constructor(requestSize: number);
                            put(p_key: org.kevoree.modeling.api.data.cache.KContentKey, p_payload: string): void;
                            getKey(index: number): org.kevoree.modeling.api.data.cache.KContentKey;
                            getContent(index: number): string;
                            size(): number;
                        }
                        class MemoryKContentDeliveryDriver implements org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver {
                            private backend;
                            private _localEventListeners;
                            static DEBUG: boolean;
                            atomicGetMutate(key: org.kevoree.modeling.api.data.cache.KContentKey, operation: org.kevoree.modeling.api.data.cdn.AtomicOperation, callback: (p: string, p1: java.lang.Throwable) => void): void;
                            get(keys: org.kevoree.modeling.api.data.cache.KContentKey[], callback: (p: string[], p1: java.lang.Throwable) => void): void;
                            put(p_request: org.kevoree.modeling.api.data.cdn.KContentPutRequest, p_callback: (p: java.lang.Throwable) => void): void;
                            remove(keys: string[], callback: (p: java.lang.Throwable) => void): void;
                            connect(callback: (p: java.lang.Throwable) => void): void;
                            close(callback: (p: java.lang.Throwable) => void): void;
                            registerListener(groupId: number, p_origin: org.kevoree.modeling.api.KObject, p_listener: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.meta.Meta[]) => void): void;
                            unregisterGroup(groupId: number): void;
                            registerMultiListener(groupId: number, origin: org.kevoree.modeling.api.KUniverse<any, any, any>, objects: number[], listener: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                            send(msgs: org.kevoree.modeling.api.msg.KMessage): void;
                            setManager(manager: org.kevoree.modeling.api.data.manager.KDataManager): void;
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
                        class DefaultKDataManager implements org.kevoree.modeling.api.data.manager.KDataManager {
                            private static OUT_OF_CACHE_MESSAGE;
                            private static UNIVERSE_NOT_CONNECTED_ERROR;
                            private _db;
                            private _operationManager;
                            private _scheduler;
                            private _model;
                            private _objectKeyCalculator;
                            private _universeKeyCalculator;
                            private _modelKeyCalculator;
                            private _groupKeyCalculator;
                            private isConnected;
                            private UNIVERSE_INDEX;
                            private OBJ_INDEX;
                            private GLO_TREE_INDEX;
                            private _cache;
                            private static zeroPrefix;
                            constructor(model: org.kevoree.modeling.api.KModel<any>);
                            cache(): org.kevoree.modeling.api.data.cache.KCache;
                            model(): org.kevoree.modeling.api.KModel<any>;
                            close(callback: (p: java.lang.Throwable) => void): void;
                            nextUniverseKey(): number;
                            nextObjectKey(): number;
                            nextModelKey(): number;
                            nextGroupKey(): number;
                            globalUniverseOrder(): org.kevoree.modeling.api.map.LongLongHashMap;
                            initUniverse(p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>, p_parent: org.kevoree.modeling.api.KUniverse<any, any, any>): void;
                            parentUniverseKey(currentUniverseKey: number): number;
                            descendantsUniverseKeys(currentUniverseKey: number): number[];
                            save(callback: (p: java.lang.Throwable) => void): void;
                            initKObject(obj: org.kevoree.modeling.api.KObject): void;
                            connect(connectCallback: (p: java.lang.Throwable) => void): void;
                            entry(origin: org.kevoree.modeling.api.KObject, accessMode: org.kevoree.modeling.api.data.manager.AccessMode): org.kevoree.modeling.api.data.cache.KCacheEntry;
                            discard(p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                            delete(p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                            lookup(universe: number, time: number, uuid: number, callback: (p: org.kevoree.modeling.api.KObject) => void): void;
                            lookupAllobjects(universe: number, time: number, uuids: number[], callback: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                            lookupAlltimes(universe: number, time: number[], uuid: number, callback: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                            cdn(): org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
                            setContentDeliveryDriver(p_dataBase: org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver): void;
                            setScheduler(p_scheduler: org.kevoree.modeling.api.KScheduler): void;
                            operationManager(): org.kevoree.modeling.api.util.KOperationManager;
                            getRoot(universe: number, time: number, callback: (p: org.kevoree.modeling.api.KObject) => void): void;
                            setRoot(newRoot: org.kevoree.modeling.api.KObject, callback: (p: java.lang.Throwable) => void): void;
                            reload(keys: org.kevoree.modeling.api.data.cache.KContentKey[], callback: (p: java.lang.Throwable) => void): void;
                            bumpKeyToCache(contentKey: org.kevoree.modeling.api.data.cache.KContentKey, callback: (p: org.kevoree.modeling.api.data.cache.KCacheObject) => void): void;
                            bumpKeysToCache(contentKeys: org.kevoree.modeling.api.data.cache.KContentKey[], callback: (p: org.kevoree.modeling.api.data.cache.KCacheObject[]) => void): void;
                            private internal_unserialize(key, payload);
                        }
                        class JsonRaw {
                            static decode(payload: string, now: number, metaModel: org.kevoree.modeling.api.meta.MetaModel, entry: org.kevoree.modeling.api.data.cache.KCacheEntry): boolean;
                            static encode(raw: org.kevoree.modeling.api.data.cache.KCacheEntry, uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, isRoot: boolean): string;
                        }
                        interface KDataManager {
                            cdn(): org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
                            model(): org.kevoree.modeling.api.KModel<any>;
                            cache(): org.kevoree.modeling.api.data.cache.KCache;
                            lookup(universe: number, time: number, uuid: number, callback: (p: org.kevoree.modeling.api.KObject) => void): void;
                            lookupAllobjects(universe: number, time: number, uuid: number[], callback: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                            lookupAlltimes(universe: number, time: number[], uuid: number, callback: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                            entry(origin: org.kevoree.modeling.api.KObject, accessMode: org.kevoree.modeling.api.data.manager.AccessMode): org.kevoree.modeling.api.data.cache.KCacheEntry;
                            save(callback: (p: java.lang.Throwable) => void): void;
                            discard(universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                            delete(universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                            initKObject(obj: org.kevoree.modeling.api.KObject): void;
                            initUniverse(universe: org.kevoree.modeling.api.KUniverse<any, any, any>, parent: org.kevoree.modeling.api.KUniverse<any, any, any>): void;
                            nextUniverseKey(): number;
                            nextObjectKey(): number;
                            nextModelKey(): number;
                            nextGroupKey(): number;
                            getRoot(universe: number, time: number, callback: (p: org.kevoree.modeling.api.KObject) => void): void;
                            setRoot(newRoot: org.kevoree.modeling.api.KObject, callback: (p: java.lang.Throwable) => void): void;
                            setContentDeliveryDriver(driver: org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver): void;
                            setScheduler(scheduler: org.kevoree.modeling.api.KScheduler): void;
                            operationManager(): org.kevoree.modeling.api.util.KOperationManager;
                            connect(callback: (p: java.lang.Throwable) => void): void;
                            close(callback: (p: java.lang.Throwable) => void): void;
                            parentUniverseKey(currentUniverseKey: number): number;
                            descendantsUniverseKeys(currentUniverseKey: number): number[];
                            reload(keys: org.kevoree.modeling.api.data.cache.KContentKey[], callback: (p: java.lang.Throwable) => void): void;
                        }
                        class KeyCalculator {
                            private _prefix;
                            private _currentIndex;
                            constructor(prefix: number, currentIndex: number);
                            nextKey(): number;
                            lastComputedIndex(): number;
                            prefix(): number;
                        }
                        class LookupAllRunnable implements java.lang.Runnable {
                            private _universe;
                            private _time;
                            private _keys;
                            private _callback;
                            private _store;
                            constructor(p_universe: number, p_time: number, p_keys: number[], p_callback: (p: org.kevoree.modeling.api.KObject[]) => void, p_store: org.kevoree.modeling.api.data.manager.DefaultKDataManager);
                            run(): void;
                        }
                        class ResolutionHelper {
                            static resolve_universe(globalTree: org.kevoree.modeling.api.map.LongLongHashMap, objUniverseTree: org.kevoree.modeling.api.map.LongLongHashMap, timeToResolve: number, originUniverseId: number): number;
                            static universeSelectByRange(globalTree: org.kevoree.modeling.api.map.LongLongHashMap, objUniverseTree: org.kevoree.modeling.api.map.LongLongHashMap, rangeMin: number, rangeMax: number, originUniverseId: number): number[];
                        }
                    }
                }
                module event {
                    class LocalEventListeners {
                        private _manager;
                        private _internalListenerKeyGen;
                        private _simpleListener;
                        private _multiListener;
                        private _listener2Object;
                        private _listener2Objects;
                        private _obj2Listener;
                        private _group2Listener;
                        constructor();
                        registerListener(groupId: number, origin: org.kevoree.modeling.api.KObject, listener: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.meta.Meta[]) => void): void;
                        registerListenerAll(groupId: number, universe: number, objects: number[], listener: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                        unregister(groupId: number): void;
                        clear(): void;
                        setManager(manager: org.kevoree.modeling.api.data.manager.KDataManager): void;
                        dispatch(param: org.kevoree.modeling.api.msg.KMessage): void;
                    }
                }
                module extrapolation {
                    class DiscreteExtrapolation implements org.kevoree.modeling.api.extrapolation.Extrapolation {
                        private static INSTANCE;
                        static instance(): org.kevoree.modeling.api.extrapolation.Extrapolation;
                        extrapolate(current: org.kevoree.modeling.api.KObject, attribute: org.kevoree.modeling.api.meta.MetaAttribute): any;
                        mutate(current: org.kevoree.modeling.api.KObject, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void;
                        save(cache: any, attribute: org.kevoree.modeling.api.meta.MetaAttribute): string;
                        load(payload: string, attribute: org.kevoree.modeling.api.meta.MetaAttribute, now: number): any;
                    }
                    interface Extrapolation {
                        extrapolate(current: org.kevoree.modeling.api.KObject, attribute: org.kevoree.modeling.api.meta.MetaAttribute): any;
                        mutate(current: org.kevoree.modeling.api.KObject, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void;
                        save(cache: any, attribute: org.kevoree.modeling.api.meta.MetaAttribute): string;
                        load(payload: string, attribute: org.kevoree.modeling.api.meta.MetaAttribute, now: number): any;
                    }
                    class PolynomialExtrapolation implements org.kevoree.modeling.api.extrapolation.Extrapolation {
                        private static INSTANCE;
                        extrapolate(current: org.kevoree.modeling.api.KObject, attribute: org.kevoree.modeling.api.meta.MetaAttribute): any;
                        mutate(current: org.kevoree.modeling.api.KObject, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void;
                        private castNumber(payload);
                        save(cache: any, attribute: org.kevoree.modeling.api.meta.MetaAttribute): string;
                        load(payload: string, attribute: org.kevoree.modeling.api.meta.MetaAttribute, now: number): any;
                        static instance(): org.kevoree.modeling.api.extrapolation.Extrapolation;
                        private createPolynomialModel(origin, precision);
                    }
                }
                module infer {
                    class AnalyticKInfer extends org.kevoree.modeling.api.abs.AbstractKObjectInfer {
                        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): org.kevoree.modeling.api.KInferState;
                    }
                    class GaussianClassificationKInfer extends org.kevoree.modeling.api.abs.AbstractKObjectInfer {
                        private alpha;
                        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                        getAlpha(): number;
                        setAlpha(alpha: number): void;
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): org.kevoree.modeling.api.KInferState;
                    }
                    class LinearRegressionKInfer extends org.kevoree.modeling.api.abs.AbstractKObjectInfer {
                        private alpha;
                        private iterations;
                        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                        getAlpha(): number;
                        setAlpha(alpha: number): void;
                        getIterations(): number;
                        setIterations(iterations: number): void;
                        private calculate(weights, features);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): org.kevoree.modeling.api.KInferState;
                    }
                    class PerceptronClassificationKInfer extends org.kevoree.modeling.api.abs.AbstractKObjectInfer {
                        private alpha;
                        private iterations;
                        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                        getAlpha(): number;
                        setAlpha(alpha: number): void;
                        getIterations(): number;
                        setIterations(iterations: number): void;
                        private calculate(weights, features);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): org.kevoree.modeling.api.KInferState;
                    }
                    class PolynomialOfflineKInfer extends org.kevoree.modeling.api.abs.AbstractKObjectInfer {
                        maxDegree: number;
                        toleratedErr: number;
                        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                        getToleratedErr(): number;
                        setToleratedErr(toleratedErr: number): void;
                        getMaxDegree(): number;
                        setMaxDegree(maxDegree: number): void;
                        private calculateLong(time, weights, timeOrigin, unit);
                        private calculate(weights, t);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): org.kevoree.modeling.api.KInferState;
                    }
                    class PolynomialOnlineKInfer extends org.kevoree.modeling.api.abs.AbstractKObjectInfer {
                        maxDegree: number;
                        toleratedErr: number;
                        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                        getToleratedErr(): number;
                        setToleratedErr(toleratedErr: number): void;
                        getMaxDegree(): number;
                        setMaxDegree(maxDegree: number): void;
                        private calculateLong(time, weights, timeOrigin, unit);
                        private calculate(weights, t);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): org.kevoree.modeling.api.KInferState;
                    }
                    class WinnowClassificationKInfer extends org.kevoree.modeling.api.abs.AbstractKObjectInfer {
                        private alpha;
                        private beta;
                        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                        getAlpha(): number;
                        setAlpha(alpha: number): void;
                        getBeta(): number;
                        setBeta(beta: number): void;
                        private calculate(weights, features);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): org.kevoree.modeling.api.KInferState;
                    }
                    module states {
                        class AnalyticKInferState extends org.kevoree.modeling.api.KInferState {
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
                            cloneState(): org.kevoree.modeling.api.KInferState;
                        }
                        class BayesianClassificationState extends org.kevoree.modeling.api.KInferState {
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
                            cloneState(): org.kevoree.modeling.api.KInferState;
                        }
                        class DoubleArrayKInferState extends org.kevoree.modeling.api.KInferState {
                            private _isDirty;
                            private weights;
                            save(): string;
                            load(payload: string): void;
                            isDirty(): boolean;
                            set_isDirty(value: boolean): void;
                            cloneState(): org.kevoree.modeling.api.KInferState;
                            getWeights(): number[];
                            setWeights(weights: number[]): void;
                        }
                        class GaussianArrayKInferState extends org.kevoree.modeling.api.KInferState {
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
                            cloneState(): org.kevoree.modeling.api.KInferState;
                            getEpsilon(): number;
                        }
                        class PolynomialKInferState extends org.kevoree.modeling.api.KInferState {
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
                            cloneState(): org.kevoree.modeling.api.KInferState;
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
                                cloneState(): org.kevoree.modeling.api.infer.states.Bayesian.BayesianSubstate;
                            }
                            class EnumSubstate extends org.kevoree.modeling.api.infer.states.Bayesian.BayesianSubstate {
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
                                cloneState(): org.kevoree.modeling.api.infer.states.Bayesian.BayesianSubstate;
                            }
                            class GaussianSubState extends org.kevoree.modeling.api.infer.states.Bayesian.BayesianSubstate {
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
                                cloneState(): org.kevoree.modeling.api.infer.states.Bayesian.BayesianSubstate;
                            }
                        }
                    }
                }
                module json {
                    class JsonFormat implements org.kevoree.modeling.api.KModelFormat {
                        static KEY_META: string;
                        static KEY_UUID: string;
                        static KEY_ROOT: string;
                        private _manager;
                        private _universe;
                        private _time;
                        private static NULL_PARAM_MSG;
                        constructor(p_universe: number, p_time: number, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                        save(model: org.kevoree.modeling.api.KObject, cb: (p: string) => void): void;
                        saveRoot(cb: (p: string) => void): void;
                        load(payload: string, cb: (p: any) => void): void;
                    }
                    class JsonModelLoader {
                        static load(manager: org.kevoree.modeling.api.data.manager.KDataManager, universe: number, time: number, payload: string, callback: (p: java.lang.Throwable) => void): void;
                        private static loadObj(p_param, manager, universe, time, p_mappedKeys, p_rootElem);
                        private static transposeArr(plainRawSet, p_mappedKeys);
                    }
                    class JsonModelSerializer {
                        static serialize(model: org.kevoree.modeling.api.KObject, callback: (p: string) => void): void;
                        static printJSON(elem: org.kevoree.modeling.api.KObject, builder: java.lang.StringBuilder, isRoot: boolean): void;
                    }
                    class JsonObjectReader {
                        private readObject;
                        parseObject(payload: string): void;
                        get(name: string): any;
                        getAsStringArray(name: string): string[];
                        keys(): string[];
                    }
                    class JsonString {
                        private static ESCAPE_CHAR;
                        static encodeBuffer(buffer: java.lang.StringBuilder, chain: string): void;
                        static encode(p_chain: string): string;
                        static unescape(p_src: string): string;
                    }
                }
                module map {
                    class IntHashMap<V> {
                        constructor(initalCapacity: number, loadFactor: number);
                        clear(): void;
                        get(key: number): V;
                        put(key: number, pval: V): V;
                        containsKey(key: number): boolean;
                        remove(key: number): V;
                        size(): number;
                        each(callback: (p: number, p1: V) => void): void;
                    }
                    interface IntHashMapCallBack<V> {
                        on(key: number, value: V): void;
                    }
                    class LongHashMap<V> {
                        constructor(initalCapacity: number, loadFactor: number);
                        clear(): void;
                        get(key: number): V;
                        put(key: number, pval: V): V;
                        containsKey(key: number): boolean;
                        remove(key: number): V;
                        size(): number;
                        each(callback: (p: number, p1: V) => void): void;
                    }
                    interface LongHashMapCallBack<V> {
                        on(key: number, value: V): void;
                    }
                    class LongLongHashMap implements org.kevoree.modeling.api.data.cache.KCacheObject {
                        private _counter;
                        private _isDirty;
                        static ELEMENT_SEP: string;
                        static CHUNK_SEP: string;
                        constructor(initalCapacity: number, loadFactor: number);
                        clear(): void;
                        get(key: number): number;
                        put(key: number, pval: number): number;
                        containsKey(key: number): boolean;
                        remove(key: number): number;
                        size(): number;
                        each(callback: (p: number, p1: number) => void): void;
                        counter(): number;
                        inc(): void;
                        dec(): void;
                        isDirty(): boolean;
                        setClean(): void;
                        serialize(): string;
                        unserialize(key: org.kevoree.modeling.api.data.cache.KContentKey, payload: string, metaModel: org.kevoree.modeling.api.meta.MetaModel): void;
                    }
                    interface LongLongHashMapCallBack<V> {
                        on(key: number, value: number): void;
                    }
                    class StringHashMap<V> {
                        constructor(initalCapacity: number, loadFactor: number);
                        clear(): void;
                        get(key: string): V;
                        put(key: string, pval: V): V;
                        containsKey(key: string): boolean;
                        remove(key: string): V;
                        size(): number;
                        each(callback: (p: string, p1: V) => void): void;
                    }
                    interface StringHashMapCallBack<V> {
                        on(key: string, value: V): void;
                    }
                }
                module meta {
                    interface Meta {
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.api.meta.MetaType;
                    }
                    interface MetaAttribute extends org.kevoree.modeling.api.meta.Meta {
                        key(): boolean;
                        attributeType(): org.kevoree.modeling.api.KType;
                        strategy(): org.kevoree.modeling.api.extrapolation.Extrapolation;
                        precision(): number;
                        setExtrapolation(extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation): void;
                    }
                    interface MetaClass extends org.kevoree.modeling.api.meta.Meta {
                        metaElements(): org.kevoree.modeling.api.meta.Meta[];
                        meta(index: number): org.kevoree.modeling.api.meta.Meta;
                        metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[];
                        metaReferences(): org.kevoree.modeling.api.meta.MetaReference[];
                        metaByName(name: string): org.kevoree.modeling.api.meta.Meta;
                        attribute(name: string): org.kevoree.modeling.api.meta.MetaAttribute;
                        reference(name: string): org.kevoree.modeling.api.meta.MetaReference;
                        operation(name: string): org.kevoree.modeling.api.meta.MetaOperation;
                    }
                    class MetaInferClass implements org.kevoree.modeling.api.meta.MetaClass {
                        private static _INSTANCE;
                        private _attributes;
                        private _metaReferences;
                        static getInstance(): org.kevoree.modeling.api.meta.MetaInferClass;
                        getRaw(): org.kevoree.modeling.api.meta.MetaAttribute;
                        getCache(): org.kevoree.modeling.api.meta.MetaAttribute;
                        constructor();
                        metaElements(): org.kevoree.modeling.api.meta.Meta[];
                        meta(index: number): org.kevoree.modeling.api.meta.Meta;
                        metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[];
                        metaReferences(): org.kevoree.modeling.api.meta.MetaReference[];
                        metaByName(name: string): org.kevoree.modeling.api.meta.Meta;
                        attribute(name: string): org.kevoree.modeling.api.meta.MetaAttribute;
                        reference(name: string): org.kevoree.modeling.api.meta.MetaReference;
                        operation(name: string): org.kevoree.modeling.api.meta.MetaOperation;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.api.meta.MetaType;
                        index(): number;
                    }
                    interface MetaModel extends org.kevoree.modeling.api.meta.Meta {
                        metaClasses(): org.kevoree.modeling.api.meta.MetaClass[];
                        metaClass(name: string): org.kevoree.modeling.api.meta.MetaClass;
                    }
                    interface MetaOperation extends org.kevoree.modeling.api.meta.Meta {
                        origin(): org.kevoree.modeling.api.meta.Meta;
                    }
                    interface MetaReference extends org.kevoree.modeling.api.meta.Meta {
                        contained(): boolean;
                        single(): boolean;
                        type(): org.kevoree.modeling.api.meta.MetaClass;
                        opposite(): org.kevoree.modeling.api.meta.MetaReference;
                        origin(): org.kevoree.modeling.api.meta.MetaClass;
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
                        static STRING: org.kevoree.modeling.api.KType;
                        static LONG: org.kevoree.modeling.api.KType;
                        static INT: org.kevoree.modeling.api.KType;
                        static BOOL: org.kevoree.modeling.api.KType;
                        static SHORT: org.kevoree.modeling.api.KType;
                        static DOUBLE: org.kevoree.modeling.api.KType;
                        static FLOAT: org.kevoree.modeling.api.KType;
                        static TRANSIENT: org.kevoree.modeling.api.KType;
                    }
                }
                module msg {
                    class KAtomicGetRequest implements org.kevoree.modeling.api.msg.KMessage {
                        id: number;
                        key: org.kevoree.modeling.api.data.cache.KContentKey;
                        operation: org.kevoree.modeling.api.data.cdn.AtomicOperation;
                        json(): string;
                        type(): number;
                    }
                    class KAtomicGetResult implements org.kevoree.modeling.api.msg.KMessage {
                        id: number;
                        value: string;
                        json(): string;
                        type(): number;
                    }
                    class KEvents implements org.kevoree.modeling.api.msg.KMessage {
                        _objIds: org.kevoree.modeling.api.data.cache.KContentKey[];
                        _metaindexes: number[][];
                        private _size;
                        allKeys(): org.kevoree.modeling.api.data.cache.KContentKey[];
                        constructor(nbObject: number);
                        json(): string;
                        type(): number;
                        size(): number;
                        setEvent(index: number, p_objId: org.kevoree.modeling.api.data.cache.KContentKey, p_metaIndexes: number[]): void;
                        getKey(index: number): org.kevoree.modeling.api.data.cache.KContentKey;
                        getIndexes(index: number): number[];
                    }
                    class KGetRequest implements org.kevoree.modeling.api.msg.KMessage {
                        id: number;
                        keys: org.kevoree.modeling.api.data.cache.KContentKey[];
                        json(): string;
                        type(): number;
                    }
                    class KGetResult implements org.kevoree.modeling.api.msg.KMessage {
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
                        static CLASS_IDX_NAME: string;
                        static PARAMETERS_NAME: string;
                        static EVENTS_TYPE: number;
                        static GET_REQ_TYPE: number;
                        static GET_RES_TYPE: number;
                        static PUT_REQ_TYPE: number;
                        static PUT_RES_TYPE: number;
                        static OPERATION_CALL_TYPE: number;
                        static OPERATION_RESULT_TYPE: number;
                        static ATOMIC_OPERATION_REQUEST_TYPE: number;
                        static ATOMIC_OPERATION_RESULT_TYPE: number;
                        static load(payload: string): org.kevoree.modeling.api.msg.KMessage;
                    }
                    class KOperationCallMessage implements org.kevoree.modeling.api.msg.KMessage {
                        id: number;
                        classIndex: number;
                        opIndex: number;
                        params: string[];
                        key: org.kevoree.modeling.api.data.cache.KContentKey;
                        json(): string;
                        type(): number;
                    }
                    class KOperationResultMessage implements org.kevoree.modeling.api.msg.KMessage {
                        id: number;
                        value: string;
                        key: org.kevoree.modeling.api.data.cache.KContentKey;
                        json(): string;
                        type(): number;
                    }
                    class KPutRequest implements org.kevoree.modeling.api.msg.KMessage {
                        request: org.kevoree.modeling.api.data.cdn.KContentPutRequest;
                        id: number;
                        json(): string;
                        type(): number;
                    }
                    class KPutResult implements org.kevoree.modeling.api.msg.KMessage {
                        id: number;
                        json(): string;
                        type(): number;
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
                        class DoublePolynomialModel implements org.kevoree.modeling.api.polynomial.PolynomialModel {
                            private static sep;
                            static sepW: string;
                            private _prioritization;
                            private _maxDegree;
                            private _toleratedError;
                            private _isDirty;
                            private _weights;
                            private _polyTime;
                            constructor(p_timeOrigin: number, p_toleratedError: number, p_maxDegree: number, p_prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization);
                            degree(): number;
                            timeOrigin(): number;
                            comparePolynome(p2: org.kevoree.modeling.api.polynomial.doublepolynomial.DoublePolynomialModel, err: number): boolean;
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
                        class SimplePolynomialModel implements org.kevoree.modeling.api.polynomial.PolynomialModel {
                            private weights;
                            private timeOrigin;
                            private degradeFactor;
                            private prioritization;
                            private maxDegree;
                            private toleratedError;
                            private _lastIndex;
                            private static sep;
                            private _isDirty;
                            constructor(timeOrigin: number, toleratedError: number, maxDegree: number, prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization);
                            getDegree(): number;
                            getTimeOrigin(): number;
                            private getMaxErr(degree, toleratedError, maxDegree, prioritization);
                            private internal_feed(time, value);
                            private maxError(computedWeights, time, value);
                            comparePolynome(p2: org.kevoree.modeling.api.polynomial.simplepolynomial.SimplePolynomialModel, err: number): boolean;
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
                            Q: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            R: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            private Y;
                            private Z;
                            setA(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): boolean;
                            private solveU(U, b, n);
                            solve(B: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, X: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void;
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
                            static multTransA_smallMV(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, B: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, C: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void;
                            static multTransA_reorderMV(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, B: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, C: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void;
                            static multTransA_reorderMM(a: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, b: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, c: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void;
                            static multTransA_smallMM(a: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, b: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, c: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void;
                            static multTransA(a: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, b: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, c: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void;
                            static setIdentity(mat: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void;
                            static widentity(width: number): org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            static identity(numRows: number, numCols: number): org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            static fill(a: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, value: number): void;
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
                            A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            coef: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            y: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            solver: org.kevoree.modeling.api.polynomial.util.AdjLinearSolverQr;
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
                            getQ(Q: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, compact: boolean): org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            getR(R: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, compact: boolean): org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            decompose(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): boolean;
                            convertToColumnMajor(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void;
                            householder(j: number): void;
                            updateA(w: number): void;
                            static findMax(u: number[], startU: number, length: number): number;
                            static divideElements(j: number, numRows: number, u: number[], u_0: number): void;
                            static computeTauAndDivide(j: number, numRows: number, u: number[], max: number): number;
                            static rank1UpdateMultR(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, u: number[], gamma: number, colA0: number, w0: number, w1: number, _temp: number[]): void;
                        }
                    }
                }
                module rbtree {
                    class IndexRBTree implements org.kevoree.modeling.api.data.cache.KCacheObject {
                        private _size;
                        private root;
                        private _previousOrEqualsCacheValues;
                        private _nextCacheElem;
                        private _counter;
                        private _dirty;
                        constructor();
                        size(): number;
                        counter(): number;
                        inc(): void;
                        dec(): void;
                        private tryPreviousOrEqualsCache(key);
                        private resetCache();
                        private putInPreviousOrEqualsCache(resolved);
                        isDirty(): boolean;
                        setClean(): void;
                        serialize(): string;
                        toString(): string;
                        unserialize(key: org.kevoree.modeling.api.data.cache.KContentKey, payload: string, metaModel: org.kevoree.modeling.api.meta.MetaModel): void;
                        previousOrEqual(key: number): org.kevoree.modeling.api.rbtree.TreeNode;
                        nextOrEqual(key: number): org.kevoree.modeling.api.rbtree.TreeNode;
                        previous(key: number): org.kevoree.modeling.api.rbtree.TreeNode;
                        next(key: number): org.kevoree.modeling.api.rbtree.TreeNode;
                        first(): org.kevoree.modeling.api.rbtree.TreeNode;
                        last(): org.kevoree.modeling.api.rbtree.TreeNode;
                        private lookup(key);
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
                    class LongRBTree implements org.kevoree.modeling.api.data.cache.KCacheObject {
                        private root;
                        private _size;
                        _dirty: boolean;
                        private _counter;
                        private _previousOrEqualsCacheValues;
                        private _previousOrEqualsNextCacheElem;
                        private _lookupCacheValues;
                        private _lookupNextCacheElem;
                        size(): number;
                        counter(): number;
                        inc(): void;
                        dec(): void;
                        toString(): string;
                        isDirty(): boolean;
                        serialize(): string;
                        constructor();
                        private tryPreviousOrEqualsCache(key);
                        private tryLookupCache(key);
                        private resetCache();
                        private putInPreviousOrEqualsCache(resolved);
                        private putInLookupCache(resolved);
                        setClean(): void;
                        unserialize(key: org.kevoree.modeling.api.data.cache.KContentKey, payload: string, metaModel: org.kevoree.modeling.api.meta.MetaModel): void;
                        lookup(key: number): org.kevoree.modeling.api.rbtree.LongTreeNode;
                        previousOrEqual(key: number): org.kevoree.modeling.api.rbtree.LongTreeNode;
                        nextOrEqual(key: number): org.kevoree.modeling.api.rbtree.LongTreeNode;
                        previous(key: number): org.kevoree.modeling.api.rbtree.LongTreeNode;
                        next(key: number): org.kevoree.modeling.api.rbtree.LongTreeNode;
                        first(): org.kevoree.modeling.api.rbtree.LongTreeNode;
                        last(): org.kevoree.modeling.api.rbtree.LongTreeNode;
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
                        color: boolean;
                        private left;
                        private right;
                        private parent;
                        constructor(key: number, value: number, color: boolean, left: org.kevoree.modeling.api.rbtree.LongTreeNode, right: org.kevoree.modeling.api.rbtree.LongTreeNode);
                        grandparent(): org.kevoree.modeling.api.rbtree.LongTreeNode;
                        sibling(): org.kevoree.modeling.api.rbtree.LongTreeNode;
                        uncle(): org.kevoree.modeling.api.rbtree.LongTreeNode;
                        getLeft(): org.kevoree.modeling.api.rbtree.LongTreeNode;
                        setLeft(left: org.kevoree.modeling.api.rbtree.LongTreeNode): void;
                        getRight(): org.kevoree.modeling.api.rbtree.LongTreeNode;
                        setRight(right: org.kevoree.modeling.api.rbtree.LongTreeNode): void;
                        getParent(): org.kevoree.modeling.api.rbtree.LongTreeNode;
                        setParent(parent: org.kevoree.modeling.api.rbtree.LongTreeNode): void;
                        serialize(builder: java.lang.StringBuilder): void;
                        next(): org.kevoree.modeling.api.rbtree.LongTreeNode;
                        previous(): org.kevoree.modeling.api.rbtree.LongTreeNode;
                        static unserialize(ctx: org.kevoree.modeling.api.rbtree.TreeReaderContext): org.kevoree.modeling.api.rbtree.LongTreeNode;
                        static internal_unserialize(rightBranch: boolean, ctx: org.kevoree.modeling.api.rbtree.TreeReaderContext): org.kevoree.modeling.api.rbtree.LongTreeNode;
                    }
                    class TreeNode {
                        static BLACK: string;
                        static RED: string;
                        key: number;
                        color: boolean;
                        private left;
                        private right;
                        private parent;
                        constructor(key: number, color: boolean, left: org.kevoree.modeling.api.rbtree.TreeNode, right: org.kevoree.modeling.api.rbtree.TreeNode);
                        getKey(): number;
                        grandparent(): org.kevoree.modeling.api.rbtree.TreeNode;
                        sibling(): org.kevoree.modeling.api.rbtree.TreeNode;
                        uncle(): org.kevoree.modeling.api.rbtree.TreeNode;
                        getLeft(): org.kevoree.modeling.api.rbtree.TreeNode;
                        setLeft(left: org.kevoree.modeling.api.rbtree.TreeNode): void;
                        getRight(): org.kevoree.modeling.api.rbtree.TreeNode;
                        setRight(right: org.kevoree.modeling.api.rbtree.TreeNode): void;
                        getParent(): org.kevoree.modeling.api.rbtree.TreeNode;
                        setParent(parent: org.kevoree.modeling.api.rbtree.TreeNode): void;
                        serialize(builder: java.lang.StringBuilder): void;
                        next(): org.kevoree.modeling.api.rbtree.TreeNode;
                        previous(): org.kevoree.modeling.api.rbtree.TreeNode;
                        static unserialize(ctx: org.kevoree.modeling.api.rbtree.TreeReaderContext): org.kevoree.modeling.api.rbtree.TreeNode;
                        static internal_unserialize(rightBranch: boolean, ctx: org.kevoree.modeling.api.rbtree.TreeReaderContext): org.kevoree.modeling.api.rbtree.TreeNode;
                    }
                    class TreeReaderContext {
                        payload: string;
                        index: number;
                        buffer: string[];
                    }
                }
                module reflexive {
                    class DynamicKModel extends org.kevoree.modeling.api.abs.AbstractKModel<any> {
                        private _metaModel;
                        setMetaModel(p_metaModel: org.kevoree.modeling.api.meta.MetaModel): void;
                        metaModel(): org.kevoree.modeling.api.meta.MetaModel;
                        internalCreateUniverse(universe: number): org.kevoree.modeling.api.KUniverse<any, any, any>;
                        internalCreateObject(universe: number, time: number, uuid: number, clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject;
                    }
                    class DynamicKObject extends org.kevoree.modeling.api.abs.AbstractKObject {
                        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                    }
                    class DynamicKUniverse extends org.kevoree.modeling.api.abs.AbstractKUniverse<any, any, any> {
                        constructor(p_key: number, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                        internal_create(timePoint: number): org.kevoree.modeling.api.KView;
                    }
                    class DynamicKView extends org.kevoree.modeling.api.abs.AbstractKView {
                        constructor(p_universe: number, _time: number, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                    }
                    class DynamicMetaClass extends org.kevoree.modeling.api.abs.AbstractMetaClass {
                        private cached_meta;
                        private _globalIndex;
                        constructor(p_name: string, p_index: number);
                        addAttribute(p_name: string, p_type: org.kevoree.modeling.api.KType): org.kevoree.modeling.api.reflexive.DynamicMetaClass;
                        private getOrCreate(p_name, p_oppositeName, p_oppositeClass, p_contained, p_single);
                        addReference(p_name: string, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, contained: boolean, oppositeName: string): org.kevoree.modeling.api.reflexive.DynamicMetaClass;
                        addOperation(p_name: string): org.kevoree.modeling.api.reflexive.DynamicMetaClass;
                        private internalInit();
                    }
                    class DynamicMetaModel implements org.kevoree.modeling.api.meta.MetaModel {
                        private _metaName;
                        private _classes;
                        constructor(p_metaName: string);
                        metaClasses(): org.kevoree.modeling.api.meta.MetaClass[];
                        metaClass(name: string): org.kevoree.modeling.api.meta.MetaClass;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.api.meta.MetaType;
                        index(): number;
                        createMetaClass(name: string): org.kevoree.modeling.api.reflexive.DynamicMetaClass;
                        model(): org.kevoree.modeling.api.KModel<any>;
                    }
                }
                module scheduler {
                    class DirectScheduler implements org.kevoree.modeling.api.KScheduler {
                        dispatch(runnable: java.lang.Runnable): void;
                        stop(): void;
                    }
                    class ExecutorServiceScheduler implements org.kevoree.modeling.api.KScheduler {
                        dispatch(p_runnable: java.lang.Runnable): void;
                        stop(): void;
                    }
                }
                module traversal {
                    class DefaultKTraversal implements org.kevoree.modeling.api.traversal.KTraversal {
                        private static TERMINATED_MESSAGE;
                        private _initObjs;
                        private _initAction;
                        private _lastAction;
                        private _terminated;
                        constructor(p_root: org.kevoree.modeling.api.KObject);
                        private internal_chain_action(p_action);
                        traverse(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.traversal.KTraversal;
                        traverseQuery(p_metaReferenceQuery: string): org.kevoree.modeling.api.traversal.KTraversal;
                        withAttribute(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_expectedValue: any): org.kevoree.modeling.api.traversal.KTraversal;
                        withoutAttribute(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_expectedValue: any): org.kevoree.modeling.api.traversal.KTraversal;
                        attributeQuery(p_attributeQuery: string): org.kevoree.modeling.api.traversal.KTraversal;
                        filter(p_filter: (p: org.kevoree.modeling.api.KObject) => boolean): org.kevoree.modeling.api.traversal.KTraversal;
                        collect(metaReference: org.kevoree.modeling.api.meta.MetaReference, continueCondition: (p: org.kevoree.modeling.api.KObject) => boolean): org.kevoree.modeling.api.traversal.KTraversal;
                        then(cb: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                        map(attribute: org.kevoree.modeling.api.meta.MetaAttribute, cb: (p: any[]) => void): void;
                    }
                    interface KTraversal {
                        traverse(metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.traversal.KTraversal;
                        traverseQuery(metaReferenceQuery: string): org.kevoree.modeling.api.traversal.KTraversal;
                        attributeQuery(attributeQuery: string): org.kevoree.modeling.api.traversal.KTraversal;
                        withAttribute(attribute: org.kevoree.modeling.api.meta.MetaAttribute, expectedValue: any): org.kevoree.modeling.api.traversal.KTraversal;
                        withoutAttribute(attribute: org.kevoree.modeling.api.meta.MetaAttribute, expectedValue: any): org.kevoree.modeling.api.traversal.KTraversal;
                        filter(filter: (p: org.kevoree.modeling.api.KObject) => boolean): org.kevoree.modeling.api.traversal.KTraversal;
                        then(cb: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                        map(attribute: org.kevoree.modeling.api.meta.MetaAttribute, cb: (p: any[]) => void): void;
                        collect(metaReference: org.kevoree.modeling.api.meta.MetaReference, continueCondition: (p: org.kevoree.modeling.api.KObject) => boolean): org.kevoree.modeling.api.traversal.KTraversal;
                    }
                    interface KTraversalAction {
                        chain(next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                        execute(inputs: org.kevoree.modeling.api.KObject[]): void;
                    }
                    interface KTraversalFilter {
                        filter(obj: org.kevoree.modeling.api.KObject): boolean;
                    }
                    module actions {
                        class KDeepCollectAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            private _reference;
                            private _continueCondition;
                            private _alreadyPassed;
                            private _finalElements;
                            constructor(p_reference: org.kevoree.modeling.api.meta.MetaReference, p_continueCondition: (p: org.kevoree.modeling.api.KObject) => boolean);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[]): void;
                            private executeStep(p_inputStep, private_callback);
                        }
                        class KFilterAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            private _filter;
                            constructor(p_filter: (p: org.kevoree.modeling.api.KObject) => boolean);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[]): void;
                        }
                        class KFilterAttributeAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            private _attribute;
                            private _expectedValue;
                            constructor(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_expectedValue: any);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[]): void;
                        }
                        class KFilterAttributeQueryAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            private _attributeQuery;
                            constructor(p_attributeQuery: string);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[]): void;
                            private buildParams(p_paramString);
                        }
                        class KFilterNotAttributeAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            private _attribute;
                            private _expectedValue;
                            constructor(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_expectedValue: any);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[]): void;
                        }
                        class KFinalAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _finalCallback;
                            constructor(p_callback: (p: org.kevoree.modeling.api.KObject[]) => void);
                            chain(next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(inputs: org.kevoree.modeling.api.KObject[]): void;
                        }
                        class KMapAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _finalCallback;
                            private _attribute;
                            constructor(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_callback: (p: any[]) => void);
                            chain(next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(inputs: org.kevoree.modeling.api.KObject[]): void;
                        }
                        class KRemoveDuplicateAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[]): void;
                        }
                        class KTraverseAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            private _reference;
                            constructor(p_reference: org.kevoree.modeling.api.meta.MetaReference);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[]): void;
                        }
                        class KTraverseQueryAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private SEP;
                            private _next;
                            private _referenceQuery;
                            constructor(p_referenceQuery: string);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[]): void;
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
                            static buildChain(query: string): java.util.List<org.kevoree.modeling.api.traversal.selector.KQuery>;
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
                            static select(root: org.kevoree.modeling.api.KObject, query: string, callback: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                        }
                    }
                }
                module util {
                    class ArrayUtils {
                        static add(previous: number[], toAdd: number): number[];
                        static remove(previous: number[], toAdd: number): number[];
                        static clone(previous: number[]): number[];
                        static contains(previous: number[], value: number): number;
                    }
                    class Checker {
                        static isDefined(param: any): boolean;
                    }
                    class DefaultOperationManager implements org.kevoree.modeling.api.util.KOperationManager {
                        private staticOperations;
                        private instanceOperations;
                        private remoteCallCallbacks;
                        private _manager;
                        private _callbackId;
                        constructor(p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                        registerOperation(operation: org.kevoree.modeling.api.meta.MetaOperation, callback: (p: org.kevoree.modeling.api.KObject, p1: any[], p2: (p: any) => void) => void, target: org.kevoree.modeling.api.KObject): void;
                        private searchOperation(source, clazz, operation);
                        call(source: org.kevoree.modeling.api.KObject, operation: org.kevoree.modeling.api.meta.MetaOperation, param: any[], callback: (p: any) => void): void;
                        private sendToRemote(source, operation, param, callback);
                        nextKey(): number;
                        operationEventReceived(operationEvent: org.kevoree.modeling.api.msg.KMessage): void;
                    }
                    interface KOperationManager {
                        registerOperation(operation: org.kevoree.modeling.api.meta.MetaOperation, callback: (p: org.kevoree.modeling.api.KObject, p1: any[], p2: (p: any) => void) => void, target: org.kevoree.modeling.api.KObject): void;
                        call(source: org.kevoree.modeling.api.KObject, operation: org.kevoree.modeling.api.meta.MetaOperation, param: any[], callback: (p: any) => void): void;
                        operationEventReceived(operationEvent: org.kevoree.modeling.api.msg.KMessage): void;
                    }
                }
                module xmi {
                    class SerializationContext {
                        ignoreGeneratedID: boolean;
                        model: org.kevoree.modeling.api.KObject;
                        finishCallback: (p: string) => void;
                        printer: java.lang.StringBuilder;
                        attributesVisitor: (p: org.kevoree.modeling.api.meta.MetaAttribute, p1: any) => void;
                        addressTable: org.kevoree.modeling.api.map.LongHashMap<any>;
                        elementsCount: org.kevoree.modeling.api.map.StringHashMap<any>;
                        packageList: java.util.ArrayList<string>;
                    }
                    class XMILoadingContext {
                        xmiReader: org.kevoree.modeling.api.xmi.XmlParser;
                        loadedRoots: org.kevoree.modeling.api.KObject;
                        resolvers: java.util.ArrayList<org.kevoree.modeling.api.xmi.XMIResolveCommand>;
                        map: org.kevoree.modeling.api.map.StringHashMap<any>;
                        elementsCount: org.kevoree.modeling.api.map.StringHashMap<any>;
                        successCallback: (p: java.lang.Throwable) => void;
                    }
                    class XMIModelLoader {
                        static LOADER_XMI_LOCAL_NAME: string;
                        static LOADER_XMI_XSI: string;
                        static LOADER_XMI_NS_URI: string;
                        static unescapeXml(src: string): string;
                        static load(manager: org.kevoree.modeling.api.data.manager.KDataManager, universe: number, time: number, str: string, callback: (p: java.lang.Throwable) => void): void;
                        private static deserialize(manager, universe, time, context);
                        private static callFactory(manager, universe, time, ctx, objectType);
                        private static loadObject(manager, universe, time, ctx, xmiAddress, objectType);
                    }
                    class XMIModelSerializer {
                        static save(model: org.kevoree.modeling.api.KObject, callback: (p: string) => void): void;
                    }
                    class XMIResolveCommand {
                        private context;
                        private target;
                        private mutatorType;
                        private refName;
                        private ref;
                        constructor(context: org.kevoree.modeling.api.xmi.XMILoadingContext, target: org.kevoree.modeling.api.KObject, mutatorType: org.kevoree.modeling.api.KActionType, refName: string, ref: string);
                        run(): void;
                    }
                    class XmiFormat implements org.kevoree.modeling.api.KModelFormat {
                        private _manager;
                        private _universe;
                        private _time;
                        constructor(p_universe: number, p_time: number, p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                        save(model: org.kevoree.modeling.api.KObject, cb: (p: string) => void): void;
                        saveRoot(cb: (p: string) => void): void;
                        load(payload: string, cb: (p: any) => void): void;
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
                        next(): org.kevoree.modeling.api.xmi.XmlToken;
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
