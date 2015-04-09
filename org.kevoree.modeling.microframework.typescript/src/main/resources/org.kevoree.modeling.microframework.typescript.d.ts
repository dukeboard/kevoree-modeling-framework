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
                    constructor(p_reference: org.kevoree.modeling.api.meta.MetaReference, p_source: number);
                    reference(): org.kevoree.modeling.api.meta.MetaReference;
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
                interface KCurrentDefer<A> extends org.kevoree.modeling.api.KDefer<any> {
                    resultKeys(): string[];
                    resultByName(name: string): any;
                    resultByDefer(defer: org.kevoree.modeling.api.KDefer<any>): any;
                    addDeferResult(result: A): void;
                    clearResults(): void;
                }
                interface KDefer<A> {
                    wait(previous: org.kevoree.modeling.api.KDefer<any>): org.kevoree.modeling.api.KDefer<any>;
                    getResult(): A;
                    isDone(): boolean;
                    setJob(kjob: (p: org.kevoree.modeling.api.KCurrentDefer<any>) => void): org.kevoree.modeling.api.KDefer<any>;
                    ready(): org.kevoree.modeling.api.KDefer<any>;
                    next(): org.kevoree.modeling.api.KDefer<any>;
                    then(callback: (p: A) => void): void;
                    setName(taskName: string): org.kevoree.modeling.api.KDefer<any>;
                    getName(): string;
                    chain(block: (p: org.kevoree.modeling.api.KDefer<any>) => org.kevoree.modeling.api.KDefer<any>): org.kevoree.modeling.api.KDefer<any>;
                }
                interface KDeferBlock {
                    exec(previous: org.kevoree.modeling.api.KDefer<any>): org.kevoree.modeling.api.KDefer<any>;
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
                interface KJob {
                    run(currentTask: org.kevoree.modeling.api.KCurrentDefer<any>): void;
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
                    defer(): org.kevoree.modeling.api.KDefer<any>;
                    save(): org.kevoree.modeling.api.KDefer<any>;
                    discard(): org.kevoree.modeling.api.KDefer<any>;
                    connect(): org.kevoree.modeling.api.KDefer<any>;
                    close(): org.kevoree.modeling.api.KDefer<any>;
                    clearListenerGroup(groupID: number): void;
                    nextGroup(): number;
                }
                interface KObject {
                    universe(): org.kevoree.modeling.api.KUniverse<any, any, any>;
                    uuid(): number;
                    path(): org.kevoree.modeling.api.KDefer<any>;
                    view(): org.kevoree.modeling.api.KView;
                    delete(): org.kevoree.modeling.api.KDefer<any>;
                    parent(): org.kevoree.modeling.api.KDefer<any>;
                    parentUuid(): number;
                    select(query: string): org.kevoree.modeling.api.KDefer<any>;
                    listen(groupId: number, listener: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.meta.Meta[]) => void): void;
                    visitAttributes(visitor: (p: org.kevoree.modeling.api.meta.MetaAttribute, p1: any) => void): void;
                    visit(request: org.kevoree.modeling.api.VisitRequest, visitor: (p: org.kevoree.modeling.api.KObject) => org.kevoree.modeling.api.VisitResult): org.kevoree.modeling.api.KDefer<any>;
                    now(): number;
                    timeWalker(): org.kevoree.modeling.api.KTimeWalker;
                    referenceInParent(): org.kevoree.modeling.api.meta.MetaReference;
                    domainKey(): string;
                    metaClass(): org.kevoree.modeling.api.meta.MetaClass;
                    mutate(actionType: org.kevoree.modeling.api.KActionType, metaReference: org.kevoree.modeling.api.meta.MetaReference, param: org.kevoree.modeling.api.KObject): void;
                    ref(metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.KDefer<any>;
                    inferRef(metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.KDefer<any>;
                    traversal(): org.kevoree.modeling.api.traversal.KTraversal;
                    inbounds(): org.kevoree.modeling.api.KDefer<any>;
                    get(attribute: org.kevoree.modeling.api.meta.MetaAttribute): any;
                    set(attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void;
                    toJSON(): string;
                    equals(other: any): boolean;
                    jump<U extends org.kevoree.modeling.api.KObject>(time: number): org.kevoree.modeling.api.KDefer<any>;
                    referencesWith(o: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.meta.MetaReference[];
                    inferObjects(): org.kevoree.modeling.api.KDefer<any>;
                    inferAttribute(attribute: org.kevoree.modeling.api.meta.MetaAttribute): any;
                    call(operation: org.kevoree.modeling.api.meta.MetaOperation, params: any[]): org.kevoree.modeling.api.KDefer<any>;
                    inferCall(operation: org.kevoree.modeling.api.meta.MetaOperation, params: any[]): org.kevoree.modeling.api.KDefer<any>;
                }
                interface KOperation {
                    on(source: org.kevoree.modeling.api.KObject, params: any[], result: (p: any) => void): void;
                }
                interface KScheduler {
                    dispatch(runnable: java.lang.Runnable): void;
                    stop(): void;
                }
                interface KTimeWalker {
                    allTimes(): org.kevoree.modeling.api.KDefer<any>;
                    timesBefore(endOfSearch: number): org.kevoree.modeling.api.KDefer<any>;
                    timesAfter(beginningOfSearch: number): org.kevoree.modeling.api.KDefer<any>;
                    timesBetween(beginningOfSearch: number, endOfSearch: number): org.kevoree.modeling.api.KDefer<any>;
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
                    delete(): org.kevoree.modeling.api.KDefer<any>;
                    lookupAllTimes(uuid: number, times: number[]): org.kevoree.modeling.api.KDefer<any>;
                    listenAll(groupId: number, objects: number[], multiListener: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                }
                interface KView {
                    createByName(metaClassName: string): org.kevoree.modeling.api.KObject;
                    create(clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject;
                    select(query: string): org.kevoree.modeling.api.KDefer<any>;
                    lookup(key: number): org.kevoree.modeling.api.KDefer<any>;
                    lookupAll(keys: number[]): org.kevoree.modeling.api.KDefer<any>;
                    universe(): org.kevoree.modeling.api.KUniverse<any, any, any>;
                    now(): number;
                    json(): org.kevoree.modeling.api.ModelFormat;
                    xmi(): org.kevoree.modeling.api.ModelFormat;
                    equals(other: any): boolean;
                    setRoot(elem: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any>;
                    getRoot(): org.kevoree.modeling.api.KDefer<any>;
                }
                interface ModelAttributeVisitor {
                    visit(metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute, value: any): void;
                }
                interface ModelFormat {
                    save(model: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any>;
                    saveRoot(): org.kevoree.modeling.api.KDefer<any>;
                    load(payload: string): org.kevoree.modeling.api.KDefer<any>;
                }
                interface ModelVisitor {
                    visit(elem: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.VisitResult;
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
                    class AbstractKDataType implements org.kevoree.modeling.api.KType {
                        private _name;
                        private _isEnum;
                        constructor(p_name: string, p_isEnum: boolean);
                        name(): string;
                        isEnum(): boolean;
                        save(src: any): string;
                        load(payload: string): any;
                    }
                    class AbstractKDefer<A> implements org.kevoree.modeling.api.KCurrentDefer<any> {
                        private _name;
                        private _isDone;
                        _isReady: boolean;
                        private _nbRecResult;
                        private _nbExpectedResult;
                        private _results;
                        private _nextTasks;
                        private _job;
                        private _result;
                        setDoneOrRegister(next: org.kevoree.modeling.api.KDefer<any>): boolean;
                        private informParentEnd(end);
                        wait(p_previous: org.kevoree.modeling.api.KDefer<any>): org.kevoree.modeling.api.KDefer<any>;
                        ready(): org.kevoree.modeling.api.KDefer<any>;
                        next(): org.kevoree.modeling.api.KDefer<any>;
                        then(p_callback: (p: A) => void): void;
                        setName(p_taskName: string): org.kevoree.modeling.api.KDefer<any>;
                        getName(): string;
                        chain(p_block: (p: org.kevoree.modeling.api.KDefer<any>) => org.kevoree.modeling.api.KDefer<any>): org.kevoree.modeling.api.KDefer<any>;
                        resultKeys(): string[];
                        resultByName(p_name: string): any;
                        resultByDefer(defer: org.kevoree.modeling.api.KDefer<any>): any;
                        addDeferResult(p_result: A): void;
                        clearResults(): void;
                        getResult(): A;
                        isDone(): boolean;
                        setJob(p_kjob: (p: org.kevoree.modeling.api.KCurrentDefer<any>) => void): org.kevoree.modeling.api.KDefer<any>;
                    }
                    class AbstractKDeferWrapper<A> extends org.kevoree.modeling.api.abs.AbstractKDefer<any> {
                        private _callback;
                        constructor();
                        initCallback(): (p: A) => void;
                        wait(previous: org.kevoree.modeling.api.KDefer<any>): org.kevoree.modeling.api.KDefer<any>;
                        setJob(p_kjob: (p: org.kevoree.modeling.api.KCurrentDefer<any>) => void): org.kevoree.modeling.api.KDefer<any>;
                        ready(): org.kevoree.modeling.api.KDefer<any>;
                    }
                    class AbstractKModel<A extends org.kevoree.modeling.api.KUniverse<any, any, any>> implements org.kevoree.modeling.api.KModel<any> {
                        private _manager;
                        private _key;
                        metaModel(): org.kevoree.modeling.api.meta.MetaModel;
                        constructor();
                        connect(): org.kevoree.modeling.api.KDefer<any>;
                        close(): org.kevoree.modeling.api.KDefer<any>;
                        manager(): org.kevoree.modeling.api.data.manager.KDataManager;
                        newUniverse(): A;
                        internal_create(key: number): A;
                        universe(key: number): A;
                        save(): org.kevoree.modeling.api.KDefer<any>;
                        discard(): org.kevoree.modeling.api.KDefer<any>;
                        setContentDeliveryDriver(p_driver: org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver): org.kevoree.modeling.api.KModel<any>;
                        setScheduler(p_scheduler: org.kevoree.modeling.api.KScheduler): org.kevoree.modeling.api.KModel<any>;
                        setOperation(metaOperation: org.kevoree.modeling.api.meta.MetaOperation, operation: (p: org.kevoree.modeling.api.KObject, p1: any[], p2: (p: any) => void) => void): void;
                        setInstanceOperation(metaOperation: org.kevoree.modeling.api.meta.MetaOperation, target: org.kevoree.modeling.api.KObject, operation: (p: org.kevoree.modeling.api.KObject, p1: any[], p2: (p: any) => void) => void): void;
                        defer(): org.kevoree.modeling.api.KDefer<any>;
                        key(): number;
                        clearListenerGroup(groupID: number): void;
                        nextGroup(): number;
                    }
                    class AbstractKObject implements org.kevoree.modeling.api.KObject {
                        private _view;
                        private _uuid;
                        private _metaClass;
                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass);
                        view(): org.kevoree.modeling.api.KView;
                        uuid(): number;
                        metaClass(): org.kevoree.modeling.api.meta.MetaClass;
                        now(): number;
                        universe(): org.kevoree.modeling.api.KUniverse<any, any, any>;
                        path(): org.kevoree.modeling.api.KDefer<any>;
                        parentUuid(): number;
                        timeWalker(): org.kevoree.modeling.api.KTimeWalker;
                        parent(): org.kevoree.modeling.api.KDefer<any>;
                        referenceInParent(): org.kevoree.modeling.api.meta.MetaReference;
                        delete(): org.kevoree.modeling.api.KDefer<any>;
                        select(query: string): org.kevoree.modeling.api.KDefer<any>;
                        listen(groupId: number, listener: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.meta.Meta[]) => void): void;
                        domainKey(): string;
                        get(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute): any;
                        set(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void;
                        private removeFromContainer(param);
                        mutate(actionType: org.kevoree.modeling.api.KActionType, metaReference: org.kevoree.modeling.api.meta.MetaReference, param: org.kevoree.modeling.api.KObject): void;
                        internal_mutate(actionType: org.kevoree.modeling.api.KActionType, metaReferenceP: org.kevoree.modeling.api.meta.MetaReference, param: org.kevoree.modeling.api.KObject, setOpposite: boolean, inDelete: boolean): void;
                        size(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): number;
                        internal_ref(p_metaReference: org.kevoree.modeling.api.meta.MetaReference, callback: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                        ref(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.KDefer<any>;
                        inferRef(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.KDefer<any>;
                        visitAttributes(visitor: (p: org.kevoree.modeling.api.meta.MetaAttribute, p1: any) => void): void;
                        visit(p_request: org.kevoree.modeling.api.VisitRequest, p_visitor: (p: org.kevoree.modeling.api.KObject) => org.kevoree.modeling.api.VisitResult): org.kevoree.modeling.api.KDefer<any>;
                        private internal_visit(visitor, end, deep, containedOnly, visited, traversed);
                        toJSON(): string;
                        toString(): string;
                        inbounds(): org.kevoree.modeling.api.KDefer<any>;
                        set_parent(p_parentKID: number, p_metaReference: org.kevoree.modeling.api.meta.MetaReference): void;
                        equals(obj: any): boolean;
                        hashCode(): number;
                        jump<U extends org.kevoree.modeling.api.KObject>(time: number): org.kevoree.modeling.api.KDefer<any>;
                        internal_transpose_ref(p: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.meta.MetaReference;
                        internal_transpose_att(p: org.kevoree.modeling.api.meta.MetaAttribute): org.kevoree.modeling.api.meta.MetaAttribute;
                        internal_transpose_op(p: org.kevoree.modeling.api.meta.MetaOperation): org.kevoree.modeling.api.meta.MetaOperation;
                        traversal(): org.kevoree.modeling.api.traversal.KTraversal;
                        referencesWith(o: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.meta.MetaReference[];
                        call(p_operation: org.kevoree.modeling.api.meta.MetaOperation, p_params: any[]): org.kevoree.modeling.api.KDefer<any>;
                        inferObjects(): org.kevoree.modeling.api.KDefer<any>;
                        inferAttribute(attribute: org.kevoree.modeling.api.meta.MetaAttribute): any;
                        inferCall(operation: org.kevoree.modeling.api.meta.MetaOperation, params: any[]): org.kevoree.modeling.api.KDefer<any>;
                    }
                    class AbstractKObjectInfer extends org.kevoree.modeling.api.abs.AbstractKObject implements org.kevoree.modeling.api.KInfer {
                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass);
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
                        private _model;
                        private _key;
                        constructor(p_model: org.kevoree.modeling.api.KModel<any>, p_key: number);
                        key(): number;
                        model(): C;
                        delete(): org.kevoree.modeling.api.KDefer<any>;
                        time(timePoint: number): A;
                        internal_create(timePoint: number): A;
                        equals(obj: any): boolean;
                        origin(): B;
                        diverge(): B;
                        descendants(): java.util.List<B>;
                        lookupAllTimes(uuid: number, times: number[]): org.kevoree.modeling.api.KDefer<any>;
                        listenAll(groupId: number, objects: number[], multiListener: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                    }
                    class AbstractKView implements org.kevoree.modeling.api.KView {
                        private _now;
                        private _universe;
                        constructor(p_now: number, p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>);
                        now(): number;
                        universe(): org.kevoree.modeling.api.KUniverse<any, any, any>;
                        createByName(metaClassName: string): org.kevoree.modeling.api.KObject;
                        setRoot(elem: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any>;
                        getRoot(): org.kevoree.modeling.api.KDefer<any>;
                        select(query: string): org.kevoree.modeling.api.KDefer<any>;
                        lookup(kid: number): org.kevoree.modeling.api.KDefer<any>;
                        lookupAll(keys: number[]): org.kevoree.modeling.api.KDefer<any>;
                        internalLookupAll(keys: number[], callback: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                        createProxy(clazz: org.kevoree.modeling.api.meta.MetaClass, key: number): org.kevoree.modeling.api.KObject;
                        create(clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject;
                        internalCreate(clazz: org.kevoree.modeling.api.meta.MetaClass, key: number): org.kevoree.modeling.api.KObject;
                        json(): org.kevoree.modeling.api.ModelFormat;
                        xmi(): org.kevoree.modeling.api.ModelFormat;
                        equals(obj: any): boolean;
                    }
                    class AbstractMetaAttribute implements org.kevoree.modeling.api.meta.MetaAttribute {
                        private _name;
                        private _index;
                        private _precision;
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
                        private _lazyMetaOpposite;
                        private _lazyMetaOrigin;
                        single(): boolean;
                        attributeType(): org.kevoree.modeling.api.meta.MetaClass;
                        opposite(): org.kevoree.modeling.api.meta.MetaReference;
                        origin(): org.kevoree.modeling.api.meta.MetaClass;
                        index(): number;
                        metaName(): string;
                        metaType(): org.kevoree.modeling.api.meta.MetaType;
                        contained(): boolean;
                        constructor(p_name: string, p_index: number, p_contained: boolean, p_single: boolean, p_lazyMetaType: () => org.kevoree.modeling.api.meta.Meta, p_lazyMetaOpposite: () => org.kevoree.modeling.api.meta.Meta, p_lazyMetaOrigin: () => org.kevoree.modeling.api.meta.Meta);
                    }
                    class AbstractTimeWalker implements org.kevoree.modeling.api.KTimeWalker {
                        private _origin;
                        constructor(p_origin: org.kevoree.modeling.api.KObject);
                        private internal_times(start, end);
                        allTimes(): org.kevoree.modeling.api.KDefer<any>;
                        timesBefore(endOfSearch: number): org.kevoree.modeling.api.KDefer<any>;
                        timesAfter(beginningOfSearch: number): org.kevoree.modeling.api.KDefer<any>;
                        timesBetween(beginningOfSearch: number, endOfSearch: number): org.kevoree.modeling.api.KDefer<any>;
                    }
                    interface LazyResolver {
                        meta(): org.kevoree.modeling.api.meta.Meta;
                    }
                }
                module data {
                    module cache {
                        interface KCache {
                            get(key: org.kevoree.modeling.api.data.cache.KContentKey): org.kevoree.modeling.api.data.cache.KCacheObject;
                            put(key: org.kevoree.modeling.api.data.cache.KContentKey, payload: org.kevoree.modeling.api.data.cache.KCacheObject): void;
                            dirties(): org.kevoree.modeling.api.data.cache.KCacheDirty[];
                            clearDataSegment(): void;
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
                        class KCacheLayer {
                            private _nestedLayers;
                            private _cachedObjects;
                            empty(): boolean;
                            resolve(p_key: org.kevoree.modeling.api.data.cache.KContentKey, current: number): org.kevoree.modeling.api.data.cache.KCacheObject;
                            decClean(p_key: org.kevoree.modeling.api.data.cache.KContentKey, current: number): void;
                            insert(p_key: org.kevoree.modeling.api.data.cache.KContentKey, current: number, p_obj_insert: org.kevoree.modeling.api.data.cache.KCacheObject): void;
                            private private_insert_object(p_key, current, p_obj_insert);
                            private private_nestedLayers_init();
                            private private_insert_nested(p_key, current, p_obj_insert);
                            dirties(result: java.util.List<org.kevoree.modeling.api.data.cache.KCacheDirty>, prefixKeys: number[], current: number): void;
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
                            private elem;
                            private static GLOBAL_SEGMENT_META;
                            static GLOBAL_SEGMENT_DATA_RAW: number;
                            static GLOBAL_SEGMENT_DATA_INDEX: number;
                            static GLOBAL_SEGMENT_DATA_HASH_INDEX: number;
                            static GLOBAL_SEGMENT_DATA_ROOT: number;
                            static GLOBAL_SEGMENT_DATA_ROOT_INDEX: number;
                            static GLOBAL_SEGMENT_UNIVERSE_TREE: number;
                            private static GLOBAL_SEGMENT_PREFIX;
                            private static GLOBAL_SUB_SEGMENT_PREFIX_OBJ;
                            private static GLOBAL_SUB_SEGMENT_PREFIX_UNI;
                            private static cached_global_universeTree;
                            private static cached_root_universeTree;
                            constructor(p_prefixID: number, p_universeID: number, p_timeID: number, p_objID: number);
                            segment(): number;
                            universe(): number;
                            time(): number;
                            obj(): number;
                            part(i: number): number;
                            static createGlobal(p_prefixID: number): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createGlobalUniverseTree(): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createUniverseTree(p_objectID: number): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createRootUniverseTree(): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createRootTimeTree(universeID: number): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createTimeTree(p_universeID: number, p_objectID: number): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createObject(p_universeID: number, p_quantaID: number, p_objectID: number): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createLastPrefix(): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createLastObjectIndexFromPrefix(prefix: number): org.kevoree.modeling.api.data.cache.KContentKey;
                            static createLastUniverseIndexFromPrefix(prefix: number): org.kevoree.modeling.api.data.cache.KContentKey;
                            static create(payload: string): org.kevoree.modeling.api.data.cache.KContentKey;
                            toString(): string;
                        }
                        class KObjectWeakReference extends java.lang.ref.WeakReference<org.kevoree.modeling.api.KObject> {
                        }
                        class MultiLayeredMemoryCache implements org.kevoree.modeling.api.data.cache.KCache {
                            static DEBUG: boolean;
                            private _nestedLayers;
                            private static prefixDebugGet;
                            private static prefixDebugPut;
                            private _manager;
                            private references;
                            constructor(p_manager: org.kevoree.modeling.api.data.manager.KDataManager);
                            get(key: org.kevoree.modeling.api.data.cache.KContentKey): org.kevoree.modeling.api.data.cache.KCacheObject;
                            put(key: org.kevoree.modeling.api.data.cache.KContentKey, payload: org.kevoree.modeling.api.data.cache.KCacheObject): void;
                            private internal_put(key, payload);
                            dirties(): org.kevoree.modeling.api.data.cache.KCacheDirty[];
                            clearDataSegment(): void;
                            monitor(origin: org.kevoree.modeling.api.KObject): void;
                            private decCleanKey(key);
                            clean(): void;
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
                            private _db;
                            private _operationManager;
                            private _scheduler;
                            private _model;
                            private _objectKeyCalculator;
                            private _universeKeyCalculator;
                            private _modelKeyCalculator;
                            private _groupKeyCalculator;
                            private isConnected;
                            private static OUT_OF_CACHE_MESSAGE;
                            private static UNIVERSE_NOT_CONNECTED_ERROR;
                            private UNIVERSE_INDEX;
                            private OBJ_INDEX;
                            private GLO_TREE_INDEX;
                            private _cache;
                            private static zeroPrefix;
                            private cachedGlobalUniverse;
                            constructor(model: org.kevoree.modeling.api.KModel<any>);
                            cache(): org.kevoree.modeling.api.data.cache.KCache;
                            model(): org.kevoree.modeling.api.KModel<any>;
                            close(callback: (p: java.lang.Throwable) => void): void;
                            nextUniverseKey(): number;
                            nextObjectKey(): number;
                            nextModelKey(): number;
                            nextGroupKey(): number;
                            globalUniverseOrder(): org.kevoree.modeling.api.map.LongLongHashMap;
                            private internal_load_global_universe();
                            initUniverse(p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>, p_parent: org.kevoree.modeling.api.KUniverse<any, any, any>): void;
                            parentUniverseKey(currentUniverseKey: number): number;
                            descendantsUniverseKeys(currentUniverseKey: number): number[];
                            save(callback: (p: java.lang.Throwable) => void): void;
                            initKObject(obj: org.kevoree.modeling.api.KObject, originView: org.kevoree.modeling.api.KView): void;
                            connect(connectCallback: (p: java.lang.Throwable) => void): void;
                            entry(origin: org.kevoree.modeling.api.KObject, accessMode: org.kevoree.modeling.api.data.manager.AccessMode): org.kevoree.modeling.api.data.cache.KCacheEntry;
                            discard(p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                            delete(p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                            lookup(originView: org.kevoree.modeling.api.KView, key: number, callback: (p: org.kevoree.modeling.api.KObject) => void): void;
                            lookupAll(originView: org.kevoree.modeling.api.KView, keys: number[], callback: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                            cdn(): org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
                            setContentDeliveryDriver(p_dataBase: org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver): void;
                            setScheduler(p_scheduler: org.kevoree.modeling.api.KScheduler): void;
                            operationManager(): org.kevoree.modeling.api.util.KOperationManager;
                            getRoot(originView: org.kevoree.modeling.api.KView, callback: (p: org.kevoree.modeling.api.KObject) => void): void;
                            setRoot(newRoot: org.kevoree.modeling.api.KObject, callback: (p: java.lang.Throwable) => void): void;
                            reload(keys: org.kevoree.modeling.api.data.cache.KContentKey[], callback: (p: java.lang.Throwable) => void): void;
                            bumpKeyToCache(contentKey: org.kevoree.modeling.api.data.cache.KContentKey, callback: (p: org.kevoree.modeling.api.data.cache.KCacheObject) => void): void;
                            bumpKeysToCache(contentKeys: org.kevoree.modeling.api.data.cache.KContentKey[], callback: (p: org.kevoree.modeling.api.data.cache.KCacheObject[]) => void): void;
                            private internal_unserialize(key, payload);
                            cleanObject(objectToClean: org.kevoree.modeling.api.KObject): void;
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
                            static decode(payload: string, now: number, metaModel: org.kevoree.modeling.api.meta.MetaModel, entry: org.kevoree.modeling.api.data.cache.KCacheEntry): boolean;
                            static encode(raw: org.kevoree.modeling.api.data.cache.KCacheEntry, uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, endline: boolean, isRoot: boolean): string;
                        }
                        interface KDataManager {
                            cdn(): org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
                            model(): org.kevoree.modeling.api.KModel<any>;
                            cache(): org.kevoree.modeling.api.data.cache.KCache;
                            lookup(originView: org.kevoree.modeling.api.KView, key: number, callback: (p: org.kevoree.modeling.api.KObject) => void): void;
                            lookupAll(originView: org.kevoree.modeling.api.KView, key: number[], callback: (p: org.kevoree.modeling.api.KObject[]) => void): void;
                            entry(origin: org.kevoree.modeling.api.KObject, accessMode: org.kevoree.modeling.api.data.manager.AccessMode): org.kevoree.modeling.api.data.cache.KCacheEntry;
                            save(callback: (p: java.lang.Throwable) => void): void;
                            discard(universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                            delete(universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                            initKObject(obj: org.kevoree.modeling.api.KObject, originView: org.kevoree.modeling.api.KView): void;
                            initUniverse(universe: org.kevoree.modeling.api.KUniverse<any, any, any>, parent: org.kevoree.modeling.api.KUniverse<any, any, any>): void;
                            nextUniverseKey(): number;
                            nextObjectKey(): number;
                            nextModelKey(): number;
                            nextGroupKey(): number;
                            getRoot(originView: org.kevoree.modeling.api.KView, callback: (p: org.kevoree.modeling.api.KObject) => void): void;
                            setRoot(newRoot: org.kevoree.modeling.api.KObject, callback: (p: java.lang.Throwable) => void): void;
                            setContentDeliveryDriver(driver: org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver): void;
                            setScheduler(scheduler: org.kevoree.modeling.api.KScheduler): void;
                            operationManager(): org.kevoree.modeling.api.util.KOperationManager;
                            connect(callback: (p: java.lang.Throwable) => void): void;
                            close(callback: (p: java.lang.Throwable) => void): void;
                            parentUniverseKey(currentUniverseKey: number): number;
                            descendantsUniverseKeys(currentUniverseKey: number): number[];
                            reload(keys: org.kevoree.modeling.api.data.cache.KContentKey[], callback: (p: java.lang.Throwable) => void): void;
                            cleanObject(objectToClean: org.kevoree.modeling.api.KObject): void;
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
                            private _originView;
                            private _keys;
                            private _callback;
                            private _store;
                            constructor(p_originView: org.kevoree.modeling.api.KView, p_keys: number[], p_callback: (p: org.kevoree.modeling.api.KObject[]) => void, p_store: org.kevoree.modeling.api.data.manager.DefaultKDataManager);
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
                        registerListenerAll(groupId: number, origin: org.kevoree.modeling.api.KUniverse<any, any, any>, objects: number[], listener: (p: org.kevoree.modeling.api.KObject[]) => void): void;
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
                        save(cache: any, attribute: org.kevoree.modeling.api.meta.MetaAttribute): string;
                        load(payload: string, attribute: org.kevoree.modeling.api.meta.MetaAttribute, now: number): any;
                        static instance(): org.kevoree.modeling.api.extrapolation.Extrapolation;
                        private createPolynomialModel(origin, precision);
                    }
                }
                module infer {
                    class AnalyticKInfer extends org.kevoree.modeling.api.abs.AbstractKObjectInfer {
                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): org.kevoree.modeling.api.KInferState;
                    }
                    class GaussianClassificationKInfer extends org.kevoree.modeling.api.abs.AbstractKObjectInfer {
                        private alpha;
                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass);
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
                        getAlpha(): number;
                        setAlpha(alpha: number): void;
                        getIterations(): number;
                        setIterations(iterations: number): void;
                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass);
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
                        getAlpha(): number;
                        setAlpha(alpha: number): void;
                        getIterations(): number;
                        setIterations(iterations: number): void;
                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass);
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
                        getToleratedErr(): number;
                        setToleratedErr(toleratedErr: number): void;
                        getMaxDegree(): number;
                        setMaxDegree(maxDegree: number): void;
                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass);
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
                        getToleratedErr(): number;
                        setToleratedErr(toleratedErr: number): void;
                        getMaxDegree(): number;
                        setMaxDegree(maxDegree: number): void;
                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass);
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
                        getAlpha(): number;
                        setAlpha(alpha: number): void;
                        getBeta(): number;
                        setBeta(beta: number): void;
                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass);
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
                    class JsonFormat implements org.kevoree.modeling.api.ModelFormat {
                        private _view;
                        constructor(p_view: org.kevoree.modeling.api.KView);
                        save(model: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any>;
                        saveRoot(): org.kevoree.modeling.api.KDefer<any>;
                        load(payload: string): org.kevoree.modeling.api.KDefer<any>;
                    }
                    class JsonModelLoader {
                        static load(factory: org.kevoree.modeling.api.KView, payload: string, callback: (p: java.lang.Throwable) => void): void;
                    }
                    class JsonModelSerializer {
                        static KEY_META: string;
                        static KEY_UUID: string;
                        static KEY_ROOT: string;
                        static PARENT_META: string;
                        static PARENT_REF_META: string;
                        static INBOUNDS_META: string;
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
                        static encode(chain: string): string;
                        static unescape(src: string): string;
                    }
                    class JsonToken {
                        private _tokenType;
                        private _value;
                        constructor(p_tokenType: org.kevoree.modeling.api.json.Type, p_value: any);
                        toString(): string;
                        tokenType(): org.kevoree.modeling.api.json.Type;
                        value(): any;
                    }
                    class Lexer {
                        private bytes;
                        private EOF;
                        private BOOLEAN_LETTERS;
                        private DIGIT;
                        private index;
                        constructor(payload: string);
                        isSpace(c: string): boolean;
                        private nextChar();
                        private peekChar();
                        private isDone();
                        private isBooleanLetter(c);
                        private isDigit(c);
                        private isValueLetter(c);
                        nextToken(): org.kevoree.modeling.api.json.JsonToken;
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
                module map {
                    class IntHashMap<V> {
                        elementCount: number;
                        elementData: org.kevoree.modeling.api.map.IntHashMap.Entry<any>[];
                        private elementDataSize;
                        threshold: number;
                        modCount: number;
                        reuseAfterDelete: org.kevoree.modeling.api.map.IntHashMap.Entry<any>;
                        private initalCapacity;
                        private loadFactor;
                        newElementArray(s: number): org.kevoree.modeling.api.map.IntHashMap.Entry<any>[];
                        constructor(p_initalCapacity: number, p_loadFactor: number);
                        clear(): void;
                        private computeMaxSize();
                        containsKey(key: number): boolean;
                        get(key: number): V;
                        findNonNullKeyEntry(key: number, index: number): org.kevoree.modeling.api.map.IntHashMap.Entry<any>;
                        each(callback: (p: number, p1: V) => void): void;
                        put(key: number, value: V): V;
                        createHashedEntry(key: number, index: number): org.kevoree.modeling.api.map.IntHashMap.Entry<any>;
                        rehashCapacity(capacity: number): void;
                        rehash(): void;
                        remove(key: number): V;
                        removeEntry(key: number): org.kevoree.modeling.api.map.IntHashMap.Entry<any>;
                        size(): number;
                    }
                    module IntHashMap {
                        class Entry<V> {
                            next: org.kevoree.modeling.api.map.IntHashMap.Entry<any>;
                            key: number;
                            value: V;
                            constructor(theKey: number, theValue: V);
                        }
                    }
                    interface IntHashMapCallBack<V> {
                        on(key: number, value: V): void;
                    }
                    class LongHashMap<V> {
                        elementCount: number;
                        elementData: org.kevoree.modeling.api.map.LongHashMap.Entry<any>[];
                        private elementDataSize;
                        threshold: number;
                        modCount: number;
                        reuseAfterDelete: org.kevoree.modeling.api.map.LongHashMap.Entry<any>;
                        private initalCapacity;
                        private loadFactor;
                        newElementArray(s: number): org.kevoree.modeling.api.map.LongHashMap.Entry<any>[];
                        constructor(p_initalCapacity: number, p_loadFactor: number);
                        clear(): void;
                        private computeMaxSize();
                        containsKey(key: number): boolean;
                        get(key: number): V;
                        findNonNullKeyEntry(key: number, index: number): org.kevoree.modeling.api.map.LongHashMap.Entry<any>;
                        each(callback: (p: number, p1: V) => void): void;
                        put(key: number, value: V): V;
                        createHashedEntry(key: number, index: number): org.kevoree.modeling.api.map.LongHashMap.Entry<any>;
                        rehashCapacity(capacity: number): void;
                        rehash(): void;
                        remove(key: number): V;
                        removeEntry(key: number): org.kevoree.modeling.api.map.LongHashMap.Entry<any>;
                        size(): number;
                    }
                    module LongHashMap {
                        class Entry<V> {
                            next: org.kevoree.modeling.api.map.LongHashMap.Entry<any>;
                            key: number;
                            value: V;
                            constructor(theKey: number, theValue: V);
                        }
                    }
                    interface LongHashMapCallBack<V> {
                        on(key: number, value: V): void;
                    }
                    class LongLongHashMap implements org.kevoree.modeling.api.data.cache.KCacheObject {
                        elementCount: number;
                        elementData: org.kevoree.modeling.api.map.LongLongHashMap.Entry[];
                        private elementDataSize;
                        threshold: number;
                        modCount: number;
                        reuseAfterDelete: org.kevoree.modeling.api.map.LongLongHashMap.Entry;
                        private initalCapacity;
                        private loadFactor;
                        private _isDirty;
                        private static ELEMENT_SEP;
                        private static CHUNK_SEP;
                        private _counter;
                        counter(): number;
                        inc(): void;
                        dec(): void;
                        isDirty(): boolean;
                        setClean(): void;
                        unserialize(key: org.kevoree.modeling.api.data.cache.KContentKey, payload: string, metaModel: org.kevoree.modeling.api.meta.MetaModel): void;
                        serialize(): string;
                        constructor(p_initalCapacity: number, p_loadFactor: number);
                        clear(): void;
                        private computeMaxSize();
                        containsKey(key: number): boolean;
                        get(key: number): number;
                        findNonNullKeyEntry(key: number, index: number): org.kevoree.modeling.api.map.LongLongHashMap.Entry;
                        each(callback: (p: number, p1: number) => void): void;
                        put(key: number, value: number): void;
                        createHashedEntry(key: number, index: number): org.kevoree.modeling.api.map.LongLongHashMap.Entry;
                        rehashCapacity(capacity: number): void;
                        rehash(): void;
                        remove(key: number): void;
                        removeEntry(key: number): org.kevoree.modeling.api.map.LongLongHashMap.Entry;
                        size(): number;
                    }
                    module LongLongHashMap {
                        class Entry {
                            next: org.kevoree.modeling.api.map.LongLongHashMap.Entry;
                            key: number;
                            value: number;
                            constructor(theKey: number, theValue: number);
                        }
                    }
                    interface LongLongHashMapCallBack<V> {
                        on(key: number, value: number): void;
                    }
                    class StringHashMap<V> {
                        elementCount: number;
                        elementData: org.kevoree.modeling.api.map.StringHashMap.Entry<any>[];
                        private elementDataSize;
                        threshold: number;
                        modCount: number;
                        reuseAfterDelete: org.kevoree.modeling.api.map.StringHashMap.Entry<any>;
                        private initalCapacity;
                        private loadFactor;
                        newElementArray(s: number): org.kevoree.modeling.api.map.StringHashMap.Entry<any>[];
                        constructor(p_initalCapacity: number, p_loadFactor: number);
                        clear(): void;
                        private computeMaxSize();
                        containsKey(key: string): boolean;
                        get(key: string): V;
                        findNonNullKeyEntry(key: string, index: number): org.kevoree.modeling.api.map.StringHashMap.Entry<any>;
                        each(callback: (p: string, p1: V) => void): void;
                        put(key: string, value: V): V;
                        createHashedEntry(key: string, index: number): org.kevoree.modeling.api.map.StringHashMap.Entry<any>;
                        rehashCapacity(capacity: number): void;
                        rehash(): void;
                        remove(key: string): V;
                        removeEntry(key: string): org.kevoree.modeling.api.map.StringHashMap.Entry<any>;
                        size(): number;
                    }
                    module StringHashMap {
                        class Entry<V> {
                            next: org.kevoree.modeling.api.map.StringHashMap.Entry<any>;
                            key: string;
                            value: V;
                            constructor(theKey: string, theValue: V);
                        }
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
                        attributeType(): org.kevoree.modeling.api.meta.MetaClass;
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
                            private samples;
                            private degradeFactor;
                            private prioritization;
                            private maxDegree;
                            private toleratedError;
                            private _lastIndex;
                            private static sep;
                            private _isDirty;
                            constructor(timeOrigin: number, toleratedError: number, maxDegree: number, prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization);
                            getSamples(): java.util.List<org.kevoree.modeling.api.polynomial.util.DataSample>;
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
                    class Color {
                        static RED: Color;
                        static BLACK: Color;
                        equals(other: any): boolean;
                        static _ColorVALUES: Color[];
                        static values(): Color[];
                    }
                    class IndexRBTree implements org.kevoree.modeling.api.data.cache.KCacheObject {
                        private root;
                        private _size;
                        private _dirty;
                        private _previousOrEqualsCacheKeys;
                        private _previousOrEqualsCacheValues;
                        private _nextCacheElem;
                        private _counter;
                        size(): number;
                        counter(): number;
                        inc(): void;
                        dec(): void;
                        private tryPreviousOrEqualsCache(key);
                        private resetCache();
                        private putInPreviousOrEqualsCache(key, resolved);
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
                        private _previousOrEqualsCacheKeys;
                        private _previousOrEqualsCacheValues;
                        private _nextCacheElem;
                        private _lookupCacheKeys;
                        private _lookupCacheValues;
                        private _lookupCacheElem;
                        size(): number;
                        counter(): number;
                        inc(): void;
                        dec(): void;
                        toString(): string;
                        isDirty(): boolean;
                        serialize(): string;
                        private tryPreviousOrEqualsCache(key);
                        private tryLookupCache(key);
                        private resetCache();
                        private putInPreviousOrEqualsCache(key, resolved);
                        private putInLookupCache(key, resolved);
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
                        color: org.kevoree.modeling.api.rbtree.Color;
                        private left;
                        private right;
                        private parent;
                        constructor(key: number, value: number, color: org.kevoree.modeling.api.rbtree.Color, left: org.kevoree.modeling.api.rbtree.LongTreeNode, right: org.kevoree.modeling.api.rbtree.LongTreeNode);
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
                        color: org.kevoree.modeling.api.rbtree.Color;
                        private left;
                        private right;
                        private parent;
                        getKey(): number;
                        constructor(key: number, color: org.kevoree.modeling.api.rbtree.Color, left: org.kevoree.modeling.api.rbtree.TreeNode, right: org.kevoree.modeling.api.rbtree.TreeNode);
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
                        internal_create(key: number): org.kevoree.modeling.api.KUniverse<any, any, any>;
                    }
                    class DynamicKObject extends org.kevoree.modeling.api.abs.AbstractKObject {
                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass);
                    }
                    class DynamicKUniverse extends org.kevoree.modeling.api.abs.AbstractKUniverse<any, any, any> {
                        constructor(p_universe: org.kevoree.modeling.api.KModel<any>, p_key: number);
                        internal_create(timePoint: number): org.kevoree.modeling.api.KView;
                    }
                    class DynamicKView extends org.kevoree.modeling.api.abs.AbstractKView {
                        constructor(p_now: number, p_dimension: org.kevoree.modeling.api.KUniverse<any, any, any>);
                        internalCreate(clazz: org.kevoree.modeling.api.meta.MetaClass, key: number): org.kevoree.modeling.api.KObject;
                    }
                    class DynamicMetaClass extends org.kevoree.modeling.api.abs.AbstractMetaClass {
                        private cached_meta;
                        private _globalIndex;
                        constructor(p_name: string, p_index: number);
                        addAttribute(p_name: string, p_type: org.kevoree.modeling.api.KType): org.kevoree.modeling.api.reflexive.DynamicMetaClass;
                        addReference(p_name: string, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, contained: boolean): org.kevoree.modeling.api.reflexive.DynamicMetaClass;
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
                        filter(p_filter: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.traversal.KTraversalHistory) => boolean): org.kevoree.modeling.api.traversal.KTraversal;
                        inbounds(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.traversal.KTraversal;
                        inboundsQuery(p_metaReferenceQuery: string): org.kevoree.modeling.api.traversal.KTraversal;
                        parents(): org.kevoree.modeling.api.traversal.KTraversal;
                        removeDuplicate(): org.kevoree.modeling.api.traversal.KTraversal;
                        deepTraverse(metaReference: org.kevoree.modeling.api.meta.MetaReference, continueCondition: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.traversal.KTraversalHistory) => boolean): org.kevoree.modeling.api.traversal.KTraversal;
                        deepCollect(metaReference: org.kevoree.modeling.api.meta.MetaReference, continueCondition: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.traversal.KTraversalHistory) => boolean): org.kevoree.modeling.api.traversal.KTraversal;
                        activateHistory(): org.kevoree.modeling.api.traversal.KTraversal;
                        reverse(): org.kevoree.modeling.api.traversal.KTraversal;
                        done(): org.kevoree.modeling.api.KDefer<any>;
                        map(attribute: org.kevoree.modeling.api.meta.MetaAttribute): org.kevoree.modeling.api.KDefer<any>;
                    }
                    interface KTraversal {
                        traverse(metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.traversal.KTraversal;
                        traverseQuery(metaReferenceQuery: string): org.kevoree.modeling.api.traversal.KTraversal;
                        attributeQuery(attributeQuery: string): org.kevoree.modeling.api.traversal.KTraversal;
                        withAttribute(attribute: org.kevoree.modeling.api.meta.MetaAttribute, expectedValue: any): org.kevoree.modeling.api.traversal.KTraversal;
                        withoutAttribute(attribute: org.kevoree.modeling.api.meta.MetaAttribute, expectedValue: any): org.kevoree.modeling.api.traversal.KTraversal;
                        filter(filter: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.traversal.KTraversalHistory) => boolean): org.kevoree.modeling.api.traversal.KTraversal;
                        inbounds(metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.traversal.KTraversal;
                        inboundsQuery(metaReferenceQuery: string): org.kevoree.modeling.api.traversal.KTraversal;
                        parents(): org.kevoree.modeling.api.traversal.KTraversal;
                        removeDuplicate(): org.kevoree.modeling.api.traversal.KTraversal;
                        done(): org.kevoree.modeling.api.KDefer<any>;
                        map(attribute: org.kevoree.modeling.api.meta.MetaAttribute): org.kevoree.modeling.api.KDefer<any>;
                        deepTraverse(metaReference: org.kevoree.modeling.api.meta.MetaReference, continueCondition: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.traversal.KTraversalHistory) => boolean): org.kevoree.modeling.api.traversal.KTraversal;
                        deepCollect(metaReference: org.kevoree.modeling.api.meta.MetaReference, continueCondition: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.traversal.KTraversalHistory) => boolean): org.kevoree.modeling.api.traversal.KTraversal;
                        activateHistory(): org.kevoree.modeling.api.traversal.KTraversal;
                        reverse(): org.kevoree.modeling.api.traversal.KTraversal;
                    }
                    interface KTraversalAction {
                        chain(next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                        execute(inputs: org.kevoree.modeling.api.KObject[], history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
                    }
                    interface KTraversalFilter {
                        filter(obj: org.kevoree.modeling.api.KObject, history: org.kevoree.modeling.api.traversal.KTraversalHistory): boolean;
                    }
                    class KTraversalHistory {
                        private _valuesHistory;
                        constructor();
                        addResult(resolved: org.kevoree.modeling.api.KObject[]): void;
                        remove(toDrop: number): void;
                        get(uuid: number): org.kevoree.modeling.api.KObject;
                        historySize(): number;
                    }
                    module actions {
                        class KActivateHistoryAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(inputs: org.kevoree.modeling.api.KObject[], p_history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
                        }
                        class KDeepCollectAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            private _reference;
                            private _continueCondition;
                            private _alreadyPassed;
                            private _finalElements;
                            private currentView;
                            constructor(p_reference: org.kevoree.modeling.api.meta.MetaReference, p_continueCondition: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.traversal.KTraversalHistory) => boolean);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[], p_history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
                            private executeStep(p_inputStep, private_callback);
                        }
                        class KDeepTraverseAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            private _reference;
                            private _continueCondition;
                            private _alreadyPassed;
                            private _finalElements;
                            constructor(p_reference: org.kevoree.modeling.api.meta.MetaReference, p_continueCondition: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.traversal.KTraversalHistory) => boolean);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[], p_history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
                            private executeStep(p_inputStep, private_callback, p_history);
                        }
                        class KFilterAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            private _filter;
                            constructor(p_filter: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.traversal.KTraversalHistory) => boolean);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[], p_history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
                        }
                        class KFilterAttributeAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            private _attribute;
                            private _expectedValue;
                            constructor(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_expectedValue: any);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[], p_history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
                        }
                        class KFilterAttributeQueryAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            private _attributeQuery;
                            constructor(p_attributeQuery: string);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[], p_history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
                            private buildParams(p_paramString);
                        }
                        class KFilterNotAttributeAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            private _attribute;
                            private _expectedValue;
                            constructor(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_expectedValue: any);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[], p_history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
                        }
                        class KFinalAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _finalCallback;
                            constructor(p_callback: (p: org.kevoree.modeling.api.KObject[]) => void);
                            chain(next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(inputs: org.kevoree.modeling.api.KObject[], p_history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
                        }
                        class KInboundsAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            private _reference;
                            constructor(p_reference: org.kevoree.modeling.api.meta.MetaReference);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[], p_history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
                        }
                        class KInboundsQueryAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            private _referenceQuery;
                            constructor(p_referenceQuery: string);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[], p_history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
                        }
                        class KMapAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _finalCallback;
                            private _attribute;
                            constructor(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_callback: (p: any[]) => void);
                            chain(next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(inputs: org.kevoree.modeling.api.KObject[], p_history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
                        }
                        class KParentsAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[], p_history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
                        }
                        class KRemoveDuplicateAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[], p_history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
                        }
                        class KReverseAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[], p_history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
                        }
                        class KTraverseAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private _next;
                            private _reference;
                            constructor(p_reference: org.kevoree.modeling.api.meta.MetaReference);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[], p_history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
                        }
                        class KTraverseQueryAction implements org.kevoree.modeling.api.traversal.KTraversalAction {
                            private SEP;
                            private _next;
                            private _referenceQuery;
                            constructor(p_referenceQuery: string);
                            chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void;
                            execute(p_inputs: org.kevoree.modeling.api.KObject[], p_history: org.kevoree.modeling.api.traversal.KTraversalHistory): void;
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
                    class PathHelper {
                        static pathSep: string;
                        private static pathIDOpen;
                        private static pathIDClose;
                        private static rootPath;
                        static parentPath(currentPath: string): string;
                        static isRoot(path: string): boolean;
                        static path(parent: string, reference: org.kevoree.modeling.api.meta.MetaReference, target: org.kevoree.modeling.api.KObject): string;
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
                        static load(p_view: org.kevoree.modeling.api.KView, str: string, callback: (p: java.lang.Throwable) => void): void;
                        private static deserialize(p_view, context);
                        private static callFactory(p_view, ctx, objectType);
                        private static loadObject(p_view, ctx, xmiAddress, objectType);
                    }
                    class XMIModelSerializer {
                        static save(model: org.kevoree.modeling.api.KObject, callback: (p: string) => void): void;
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
                        constructor(context: org.kevoree.modeling.api.xmi.XMILoadingContext, target: org.kevoree.modeling.api.KObject, mutatorType: org.kevoree.modeling.api.KActionType, refName: string, ref: string);
                        run(): void;
                    }
                    class XmiFormat implements org.kevoree.modeling.api.ModelFormat {
                        private _view;
                        constructor(p_view: org.kevoree.modeling.api.KView);
                        save(model: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any>;
                        saveRoot(): org.kevoree.modeling.api.KDefer<any>;
                        load(payload: string): org.kevoree.modeling.api.KDefer<any>;
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
