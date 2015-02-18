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
                    getReference(): meta.MetaReference;
                    getSource(): number;
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
                interface KCurrentTask<A> extends KTask<any> {
                    resultKeys(): string[];
                    resultByName(name: string): any;
                    resultByTask(task: KTask<any>): any;
                    addTaskResult(result: A): void;
                    clearResults(): void;
                }
                interface KEvent {
                    universe(): number;
                    time(): number;
                    uuid(): number;
                    actionType(): KActionType;
                    metaClass(): meta.MetaClass;
                    metaElement(): meta.Meta;
                    value(): any;
                    toJSON(): string;
                    toTrace(): trace.ModelTrace;
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
                    run(currentTask: KCurrentTask<any>): void;
                }
                interface KMetaType {
                    name(): string;
                    isEnum(): boolean;
                    save(src: any): string;
                    load(payload: string): any;
                }
                interface KModel<A extends KUniverse<any, any, any>> {
                    newUniverse(): A;
                    universe(key: number): A;
                    disable(listener: (p: KEvent) => void): void;
                    storage(): data.KStore;
                    listen(listener: (p: KEvent) => void): void;
                    setEventBroker(eventBroker: event.KEventBroker): KModel<any>;
                    setDataBase(dataBase: data.KDataBase): KModel<any>;
                    setScheduler(scheduler: KScheduler): KModel<any>;
                    setOperation(metaOperation: meta.MetaOperation, operation: (p: KObject, p1: any[], p2: (p: any) => void) => void): void;
                    setInstanceOperation(metaOperation: meta.MetaOperation, target: KObject, operation: (p: KObject, p1: any[], p2: (p: any) => void) => void): void;
                    metaModel(): meta.MetaModel;
                    task(): KTask<any>;
                    save(callback: (p: java.lang.Throwable) => void): void;
                    discard(callback: (p: java.lang.Throwable) => void): void;
                    connect(callback: (p: java.lang.Throwable) => void): void;
                    close(callback: (p: java.lang.Throwable) => void): void;
                    taskSave(): KTask<any>;
                    taskDiscard(): KTask<any>;
                    taskConnect(): KTask<any>;
                    taskClose(): KTask<any>;
                }
                interface KObject {
                    universe(): KUniverse<any, any, any>;
                    isRoot(): boolean;
                    uuid(): number;
                    path(callback: (p: string) => void): void;
                    view(): KView;
                    delete(callback: (p: java.lang.Throwable) => void): void;
                    parent(callback: (p: KObject) => void): void;
                    parentUuid(): number;
                    select(query: string, callback: (p: KObject[]) => void): void;
                    listen(listener: (p: KEvent) => void): void;
                    visitAttributes(visitor: (p: meta.MetaAttribute, p1: any) => void): void;
                    visit(visitor: (p: KObject) => VisitResult, end: (p: java.lang.Throwable) => void, request: VisitRequest): void;
                    now(): number;
                    timeTree(): time.TimeTree;
                    referenceInParent(): meta.MetaReference;
                    domainKey(): string;
                    metaClass(): meta.MetaClass;
                    mutate(actionType: KActionType, metaReference: meta.MetaReference, param: KObject): void;
                    ref(metaReference: meta.MetaReference, callback: (p: KObject[]) => void): void;
                    inferRef(metaReference: meta.MetaReference, callback: (p: KObject[]) => void): void;
                    traverse(metaReference: meta.MetaReference): traversal.KTraversal;
                    traverseQuery(metaReferenceQuery: string): traversal.KTraversal;
                    traverseInbounds(metaReferenceQuery: string): traversal.KTraversal;
                    traverseParent(): traversal.KTraversal;
                    inbounds(callback: (p: KObject[]) => void): void;
                    traces(request: TraceRequest): trace.ModelTrace[];
                    get(attribute: meta.MetaAttribute): any;
                    set(attribute: meta.MetaAttribute, payload: any): void;
                    toJSON(): string;
                    equals(other: any): boolean;
                    diff(target: KObject, callback: (p: trace.TraceSequence) => void): void;
                    merge(target: KObject, callback: (p: trace.TraceSequence) => void): void;
                    intersection(target: KObject, callback: (p: trace.TraceSequence) => void): void;
                    jump<U extends KObject>(time: number, callback: (p: U) => void): void;
                    referencesWith(o: KObject): meta.MetaReference[];
                    taskPath(): KTask<any>;
                    taskDelete(): KTask<any>;
                    taskParent(): KTask<any>;
                    taskSelect(query: string): KTask<any>;
                    taskRef(metaReference: meta.MetaReference): KTask<any>;
                    taskInbounds(): KTask<any>;
                    taskDiff(target: KObject): KTask<any>;
                    taskMerge(target: KObject): KTask<any>;
                    taskIntersection(target: KObject): KTask<any>;
                    taskJump<U extends KObject>(time: number): KTask<any>;
                    taskVisit(visitor: (p: KObject) => VisitResult, request: VisitRequest): KTask<any>;
                    inferObjects(callback: (p: KInfer[]) => void): void;
                    taskInferObjects(): KTask<any>;
                    inferAttribute(attribute: meta.MetaAttribute): any;
                    call(operation: meta.MetaOperation, params: any[], callback: (p: any) => void): void;
                    taskCall(operation: meta.MetaOperation, params: any[]): KTask<any>;
                    inferCall(operation: meta.MetaOperation, params: any[], callback: (p: any) => void): void;
                }
                interface KOperation {
                    on(source: KObject, params: any[], result: (p: any) => void): void;
                }
                interface KScheduler {
                    dispatch(runnable: java.lang.Runnable): void;
                    stop(): void;
                }
                interface KTask<A> {
                    wait(previous: KTask<any>): KTask<any>;
                    getResult(): A;
                    isDone(): boolean;
                    setJob(kjob: (p: KCurrentTask<any>) => void): KTask<any>;
                    ready(): KTask<any>;
                    next(): KTask<any>;
                    then(callback: (p: A) => void): void;
                    setName(taskName: string): KTask<any>;
                    getName(): string;
                }
                interface KUniverse<A extends KView, B extends KUniverse<any, any, any>, C extends KModel<any>> {
                    key(): number;
                    time(timePoint: number): A;
                    model(): C;
                    equals(other: any): boolean;
                    listen(listener: (p: KEvent) => void): void;
                    listenAllTimes(target: KObject, listener: (p: KEvent) => void): void;
                    diverge(): B;
                    origin(): B;
                    descendants(): java.util.List<B>;
                    delete(callback: (p: java.lang.Throwable) => void): void;
                    discard(callback: (p: java.lang.Throwable) => void): void;
                    taskDelete(): KTask<any>;
                    taskDiscard(): KTask<any>;
                }
                interface KView {
                    createFQN(metaClassName: string): KObject;
                    create(clazz: meta.MetaClass): KObject;
                    select(query: string, callback: (p: KObject[]) => void): void;
                    lookup(key: number, callback: (p: KObject) => void): void;
                    lookupAll(keys: number[], callback: (p: KObject[]) => void): void;
                    universe(): KUniverse<any, any, any>;
                    now(): number;
                    listen(listener: (p: KEvent) => void): void;
                    json(): ModelFormat;
                    xmi(): ModelFormat;
                    equals(other: any): boolean;
                    setRoot(elem: KObject, callback: (p: java.lang.Throwable) => void): void;
                    taskLookup(key: number): KTask<any>;
                    taskLookupAll(keys: number[]): KTask<any>;
                    taskSelect(query: string): KTask<any>;
                    taskSetRoot(elem: KObject): KTask<any>;
                }
                interface ModelAttributeVisitor {
                    visit(metaAttribute: meta.MetaAttribute, value: any): void;
                }
                interface ModelFormat {
                    save(model: KObject, callback: (p: string, p1: java.lang.Throwable) => void): void;
                    saveRoot(callback: (p: string, p1: java.lang.Throwable) => void): void;
                    load(payload: string, callback: (p: java.lang.Throwable) => void): void;
                }
                interface ModelListener {
                    on(evt: KEvent): void;
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
                    class AbstractKDataType implements KMetaType {
                        private _name;
                        private _isEnum;
                        constructor(p_name: string, p_isEnum: boolean);
                        name(): string;
                        isEnum(): boolean;
                        save(src: any): string;
                        load(payload: string): any;
                    }
                    class AbstractKModel<A extends KUniverse<any, any, any>> implements KModel<any> {
                        private _storage;
                        metaModel(): meta.MetaModel;
                        constructor();
                        connect(callback: (p: java.lang.Throwable) => void): void;
                        close(callback: (p: java.lang.Throwable) => void): void;
                        storage(): data.KStore;
                        newUniverse(): A;
                        internal_create(key: number): A;
                        universe(key: number): A;
                        save(callback: (p: java.lang.Throwable) => void): void;
                        discard(callback: (p: java.lang.Throwable) => void): void;
                        disable(listener: (p: KEvent) => void): void;
                        listen(listener: (p: KEvent) => void): void;
                        setEventBroker(p_eventBroker: event.KEventBroker): KModel<any>;
                        setDataBase(p_dataBase: data.KDataBase): KModel<any>;
                        setScheduler(p_scheduler: KScheduler): KModel<any>;
                        setOperation(metaOperation: meta.MetaOperation, operation: (p: KObject, p1: any[], p2: (p: any) => void) => void): void;
                        setInstanceOperation(metaOperation: meta.MetaOperation, target: KObject, operation: (p: KObject, p1: any[], p2: (p: any) => void) => void): void;
                        task(): KTask<any>;
                        taskSave(): KTask<any>;
                        taskDiscard(): KTask<any>;
                        taskConnect(): KTask<any>;
                        taskClose(): KTask<any>;
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
                        universe(): KUniverse<any, any, any>;
                        path(callback: (p: string) => void): void;
                        parentUuid(): number;
                        parent(callback: (p: KObject) => void): void;
                        referenceInParent(): meta.MetaReference;
                        delete(callback: (p: java.lang.Throwable) => void): void;
                        select(query: string, callback: (p: KObject[]) => void): void;
                        listen(listener: (p: KEvent) => void): void;
                        domainKey(): string;
                        get(p_attribute: meta.MetaAttribute): any;
                        set(p_attribute: meta.MetaAttribute, payload: any): void;
                        private removeFromContainer(param);
                        mutate(actionType: KActionType, metaReference: meta.MetaReference, param: KObject): void;
                        internal_mutate(actionType: KActionType, metaReferenceP: meta.MetaReference, param: KObject, setOpposite: boolean, inDelete: boolean): void;
                        size(p_metaReference: meta.MetaReference): number;
                        ref(p_metaReference: meta.MetaReference, p_callback: (p: KObject[]) => void): void;
                        inferRef(p_metaReference: meta.MetaReference, p_callback: (p: KObject[]) => void): void;
                        visitAttributes(visitor: (p: meta.MetaAttribute, p1: any) => void): void;
                        visit(p_visitor: (p: KObject) => VisitResult, p_end: (p: java.lang.Throwable) => void, p_request: VisitRequest): void;
                        private internal_visit(visitor, end, deep, containedOnly, visited, traversed);
                        toJSON(): string;
                        toString(): string;
                        traces(request: TraceRequest): trace.ModelTrace[];
                        inbounds(callback: (p: KObject[]) => void): void;
                        set_parent(p_parentKID: number, p_metaReference: meta.MetaReference): void;
                        equals(obj: any): boolean;
                        hashCode(): number;
                        diff(target: KObject, callback: (p: trace.TraceSequence) => void): void;
                        merge(target: KObject, callback: (p: trace.TraceSequence) => void): void;
                        intersection(target: KObject, callback: (p: trace.TraceSequence) => void): void;
                        jump<U extends KObject>(time: number, callback: (p: U) => void): void;
                        internal_transpose_ref(p: meta.MetaReference): meta.MetaReference;
                        internal_transpose_att(p: meta.MetaAttribute): meta.MetaAttribute;
                        internal_transpose_op(p: meta.MetaOperation): meta.MetaOperation;
                        traverse(p_metaReference: meta.MetaReference): traversal.KTraversal;
                        traverseQuery(metaReferenceQuery: string): traversal.KTraversal;
                        traverseInbounds(metaReferenceQuery: string): traversal.KTraversal;
                        traverseParent(): traversal.KTraversal;
                        referencesWith(o: KObject): meta.MetaReference[];
                        taskVisit(p_visitor: (p: KObject) => VisitResult, p_request: VisitRequest): KTask<any>;
                        taskDelete(): KTask<any>;
                        taskParent(): KTask<any>;
                        taskSelect(p_query: string): KTask<any>;
                        taskRef(p_metaReference: meta.MetaReference): KTask<any>;
                        taskInbounds(): KTask<any>;
                        taskDiff(p_target: KObject): KTask<any>;
                        taskMerge(p_target: KObject): KTask<any>;
                        taskIntersection(p_target: KObject): KTask<any>;
                        taskJump<U extends KObject>(p_time: number): KTask<any>;
                        taskPath(): KTask<any>;
                        taskInferObjects(): KTask<any>;
                        inferObjects(p_callback: (p: KInfer[]) => void): void;
                        call(p_operation: meta.MetaOperation, p_params: any[], p_callback: (p: any) => void): void;
                        taskCall(p_operation: meta.MetaOperation, p_params: any[]): KTask<any>;
                        inferAttribute(attribute: meta.MetaAttribute): any;
                        inferCall(operation: meta.MetaOperation, params: any[], callback: (p: any) => void): void;
                    }
                    class AbstractKObjectInfer extends AbstractKObject implements KInfer {
                        constructor(p_view: KView, p_uuid: number, p_timeTree: time.TimeTree, p_metaClass: meta.MetaClass);
                        readOnlyState(): KInferState;
                        modifyState(): KInferState;
                        private internal_load(raw);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): KInferState;
                    }
                    class AbstractKTask<A> implements KCurrentTask<any> {
                        private _name;
                        private _isDone;
                        _isReady: boolean;
                        private _nbRecResult;
                        private _nbExpectedResult;
                        private _results;
                        private _nextTasks;
                        private _job;
                        private _result;
                        setDoneOrRegister(next: KTask<any>): boolean;
                        private informParentEnd(end);
                        wait(p_previous: KTask<any>): KTask<any>;
                        ready(): KTask<any>;
                        next(): KTask<any>;
                        then(p_callback: (p: A) => void): void;
                        setName(p_taskName: string): KTask<any>;
                        getName(): string;
                        resultKeys(): string[];
                        resultByName(p_name: string): any;
                        resultByTask(p_task: KTask<any>): any;
                        addTaskResult(p_result: A): void;
                        clearResults(): void;
                        getResult(): A;
                        isDone(): boolean;
                        setJob(p_kjob: (p: KCurrentTask<any>) => void): KTask<any>;
                    }
                    class AbstractKTaskWrapper<A> extends AbstractKTask<any> {
                        private _callback;
                        constructor();
                        initCallback(): (p: A) => void;
                        wait(previous: KTask<any>): KTask<any>;
                        setJob(p_kjob: (p: KCurrentTask<any>) => void): KTask<any>;
                        ready(): KTask<any>;
                    }
                    class AbstractKUniverse<A extends KView, B extends KUniverse<any, any, any>, C extends KModel<any>> implements KUniverse<any, any, any> {
                        private _model;
                        private _key;
                        constructor(p_model: KModel<any>, p_key: number);
                        key(): number;
                        model(): C;
                        delete(callback: (p: java.lang.Throwable) => void): void;
                        discard(callback: (p: java.lang.Throwable) => void): void;
                        time(timePoint: number): A;
                        listen(listener: (p: KEvent) => void): void;
                        listenAllTimes(target: KObject, listener: (p: KEvent) => void): void;
                        internal_create(timePoint: number): A;
                        equals(obj: any): boolean;
                        origin(): B;
                        diverge(): B;
                        descendants(): java.util.List<B>;
                        taskDelete(): KTask<any>;
                        taskDiscard(): KTask<any>;
                    }
                    class AbstractKView implements KView {
                        private _now;
                        private _universe;
                        constructor(p_now: number, p_universe: KUniverse<any, any, any>);
                        now(): number;
                        universe(): KUniverse<any, any, any>;
                        createFQN(metaClassName: string): KObject;
                        setRoot(elem: KObject, callback: (p: java.lang.Throwable) => void): void;
                        select(query: string, callback: (p: KObject[]) => void): void;
                        lookup(kid: number, callback: (p: KObject) => void): void;
                        lookupAll(keys: number[], callback: (p: KObject[]) => void): void;
                        createProxy(clazz: meta.MetaClass, timeTree: time.TimeTree, key: number): KObject;
                        create(clazz: meta.MetaClass): KObject;
                        listen(listener: (p: KEvent) => void): void;
                        internalCreate(clazz: meta.MetaClass, timeTree: time.TimeTree, key: number): KObject;
                        json(): ModelFormat;
                        xmi(): ModelFormat;
                        equals(obj: any): boolean;
                        taskLookup(key: number): KTask<any>;
                        taskLookupAll(keys: number[]): KTask<any>;
                        taskSelect(query: string): KTask<any>;
                        taskSetRoot(elem: KObject): KTask<any>;
                    }
                    class AbstractMetaAttribute implements meta.MetaAttribute {
                        private _name;
                        private _index;
                        private _precision;
                        private _key;
                        private _metaType;
                        private _extrapolation;
                        metaType(): KMetaType;
                        index(): number;
                        metaName(): string;
                        precision(): number;
                        key(): boolean;
                        strategy(): extrapolation.Extrapolation;
                        setExtrapolation(extrapolation: extrapolation.Extrapolation): void;
                        constructor(p_name: string, p_index: number, p_precision: number, p_key: boolean, p_metaType: KMetaType, p_extrapolation: extrapolation.Extrapolation);
                    }
                    class AbstractMetaClass implements meta.MetaClass {
                        private _name;
                        private _index;
                        private _atts;
                        private _refs;
                        private _operations;
                        private _atts_indexes;
                        private _refs_indexes;
                        private _ops_indexes;
                        index(): number;
                        metaName(): string;
                        constructor(p_name: string, p_index: number);
                        init(p_atts: meta.MetaAttribute[], p_refs: meta.MetaReference[], p_operations: meta.MetaOperation[]): void;
                        metaAttributes(): meta.MetaAttribute[];
                        metaReferences(): meta.MetaReference[];
                        metaOperations(): meta.MetaOperation[];
                        metaAttribute(name: string): meta.MetaAttribute;
                        metaReference(name: string): meta.MetaReference;
                        metaOperation(name: string): meta.MetaOperation;
                    }
                    class AbstractMetaModel implements meta.MetaModel {
                        private _name;
                        private _index;
                        private _metaClasses;
                        private _metaClasses_indexes;
                        index(): number;
                        metaName(): string;
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
                        metaType(): meta.MetaClass;
                        opposite(): meta.MetaReference;
                        origin(): meta.MetaClass;
                        index(): number;
                        metaName(): string;
                        contained(): boolean;
                        constructor(p_name: string, p_index: number, p_contained: boolean, p_single: boolean, p_lazyMetaType: () => meta.Meta, p_lazyMetaOpposite: () => meta.Meta, p_lazyMetaOrigin: () => meta.Meta);
                    }
                    interface LazyResolver {
                        meta(): meta.Meta;
                    }
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
                    class CacheEntry {
                        timeTree: time.TimeTree;
                        metaClass: meta.MetaClass;
                        raw: any[];
                    }
                    class DefaultKStore implements KStore {
                        static KEY_SEP: string;
                        private _db;
                        private caches;
                        private universeTree;
                        private _eventBroker;
                        private _operationManager;
                        private _scheduler;
                        private _model;
                        private _objectKeyCalculator;
                        private _dimensionKeyCalculator;
                        private static OUT_OF_CACHE_MESSAGE;
                        private static DELETED_MESSAGE;
                        private isConnected;
                        private static UNIVERSE_NOT_CONNECTED_ERROR;
                        static INDEX_RESOLVED_DIM: number;
                        static INDEX_RESOLVED_TIME: number;
                        static INDEX_RESOLVED_TIMETREE: number;
                        constructor(model: KModel<any>);
                        connect(callback: (p: java.lang.Throwable) => void): void;
                        close(callback: (p: java.lang.Throwable) => void): void;
                        private keyTree(uni, key);
                        private keyRoot(uni);
                        private keyRootTree(uni_key);
                        keyPayload(uni: number, time: number, key: number): string;
                        private keyLastPrefix();
                        private keyLastUniIndex(prefix);
                        private keyUniverseTree();
                        private keyLastObjIndex(prefix);
                        nextUniverseKey(): number;
                        nextObjectKey(): number;
                        initUniverse(p_universe: KUniverse<any, any, any>, p_parent: KUniverse<any, any, any>): void;
                        initKObject(obj: KObject, originView: KView): void;
                        raw(origin: KObject, accessMode: AccessMode): any[];
                        discard(p_universe: KUniverse<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        delete(p_universe: KUniverse<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        save(callback: (p: java.lang.Throwable) => void): void;
                        lookup(originView: KView, key: number, callback: (p: KObject) => void): void;
                        lookupAll(originView: KView, keys: number[], callback: (p: KObject[]) => void): void;
                        getRoot(originView: KView, callback: (p: KObject) => void): void;
                        setRoot(newRoot: KObject, callback: (p: java.lang.Throwable) => void): void;
                        eventBroker(): event.KEventBroker;
                        setEventBroker(p_eventBroker: event.KEventBroker): void;
                        dataBase(): KDataBase;
                        setDataBase(p_dataBase: KDataBase): void;
                        setScheduler(p_scheduler: KScheduler): void;
                        operationManager(): util.KOperationManager;
                        read_cache(dimensionKey: number, timeKey: number, uuid: number): CacheEntry;
                        write_cache(dimensionKey: number, timeKey: number, uuid: number, cacheEntry: CacheEntry): void;
                        private write_tree(dimensionKey, uuid, timeTree);
                        private write_roots(dimensionKey, timeTree);
                        private size_dirties(universeCache);
                        internal_resolve_dim_time(originView: KView, uuids: number[], callback: (p: any[][]) => void): void;
                        private resolve_timeTrees(p_universe, keys, callback);
                        private resolve_roots(p_universe, callback);
                        getModel(): KModel<any>;
                        parentUniverseKey(currentUniverseKey: number): number;
                        descendantsUniverseKeys(currentUniverseKey: number): number[];
                    }
                    class Index {
                        static PARENT_INDEX: number;
                        static INBOUNDS_INDEX: number;
                        static IS_DIRTY_INDEX: number;
                        static IS_ROOT_INDEX: number;
                        static REF_IN_PARENT_INDEX: number;
                        static INFER_CHILDREN: number;
                        static RESERVED_INDEXES: number;
                    }
                    class JsonRaw {
                        static SEP: string;
                        static decode(payload: string, currentView: KView, now: number): CacheEntry;
                        static encode(raw: any[], uuid: number, p_metaClass: meta.MetaClass, endline: boolean): string;
                    }
                    interface KDataBase {
                        get(keys: string[], callback: (p: string[], p1: java.lang.Throwable) => void): void;
                        put(payloads: string[][], error: (p: java.lang.Throwable) => void): void;
                        remove(keys: string[], error: (p: java.lang.Throwable) => void): void;
                        commit(error: (p: java.lang.Throwable) => void): void;
                        connect(callback: (p: java.lang.Throwable) => void): void;
                        close(callback: (p: java.lang.Throwable) => void): void;
                    }
                    interface KStore {
                        lookup(originView: KView, key: number, callback: (p: KObject) => void): void;
                        lookupAll(originView: KView, key: number[], callback: (p: KObject[]) => void): void;
                        raw(origin: KObject, accessMode: AccessMode): any[];
                        save(callback: (p: java.lang.Throwable) => void): void;
                        discard(universe: KUniverse<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        delete(universe: KUniverse<any, any, any>, callback: (p: java.lang.Throwable) => void): void;
                        initKObject(obj: KObject, originView: KView): void;
                        initUniverse(universe: KUniverse<any, any, any>, parent: KUniverse<any, any, any>): void;
                        nextUniverseKey(): number;
                        nextObjectKey(): number;
                        getRoot(originView: KView, callback: (p: KObject) => void): void;
                        setRoot(newRoot: KObject, callback: (p: java.lang.Throwable) => void): void;
                        eventBroker(): event.KEventBroker;
                        setEventBroker(broker: event.KEventBroker): void;
                        dataBase(): KDataBase;
                        setDataBase(dataBase: KDataBase): void;
                        setScheduler(scheduler: KScheduler): void;
                        operationManager(): util.KOperationManager;
                        connect(callback: (p: java.lang.Throwable) => void): void;
                        close(callback: (p: java.lang.Throwable) => void): void;
                        getModel(): KModel<any>;
                        parentUniverseKey(currentUniverseKey: number): number;
                        descendantsUniverseKeys(currentUniverseKey: number): number[];
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
                        constructor(p_originView: KView, p_keys: number[], p_callback: (p: KObject[]) => void, p_store: DefaultKStore);
                        run(): void;
                    }
                    class MemoryKDataBase implements KDataBase {
                        private backend;
                        static DEBUG: boolean;
                        put(payloads: string[][], callback: (p: java.lang.Throwable) => void): void;
                        get(keys: string[], callback: (p: string[], p1: java.lang.Throwable) => void): void;
                        remove(keys: string[], callback: (p: java.lang.Throwable) => void): void;
                        commit(callback: (p: java.lang.Throwable) => void): void;
                        connect(callback: (p: java.lang.Throwable) => void): void;
                        close(callback: (p: java.lang.Throwable) => void): void;
                    }
                    module cache {
                        class TimeCache {
                            payload_cache: java.util.Map<number, CacheEntry>;
                            root: KObject;
                            rootDirty: boolean;
                        }
                        class UniverseCache {
                            timeTreeCache: java.util.Map<number, time.TimeTree>;
                            timesCaches: java.util.Map<number, TimeCache>;
                            roots: time.rbtree.LongRBTree;
                            private _isDirty;
                            isDirty(): boolean;
                            setDirty(): void;
                        }
                    }
                }
                module event {
                    class DefaultKBroker implements KEventBroker {
                        private static DIM_INDEX;
                        private static TIME_INDEX;
                        private static UUID_INDEX;
                        private static TUPLE_SIZE;
                        private listeners;
                        private _metaModel;
                        private _store;
                        connect(callback: (p: java.lang.Throwable) => void): void;
                        close(callback: (p: java.lang.Throwable) => void): void;
                        registerListener(origin: any, listener: (p: KEvent) => void, scope: any): void;
                        notify(event: KEvent): void;
                        sendOperationEvent(eventk: KEvent): void;
                        flush(): void;
                        setKStore(store: data.KStore): void;
                        setMetaModel(p_metaModel: meta.MetaModel): void;
                        unregister(listener: (p: KEvent) => void): void;
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
                        universe(): number;
                        time(): number;
                        uuid(): number;
                        actionType(): KActionType;
                        metaClass(): meta.MetaClass;
                        metaElement(): meta.Meta;
                        value(): any;
                        toString(): string;
                        toJSON(): string;
                        static fromJSON(payload: string, metaModel: meta.MetaModel): KEvent;
                        private static setEventAttribute(event, currentAttributeName, value, metaModel);
                        toTrace(): trace.ModelTrace;
                    }
                    interface KEventBroker {
                        connect(callback: (p: java.lang.Throwable) => void): void;
                        close(callback: (p: java.lang.Throwable) => void): void;
                        registerListener(origin: any, listener: (p: KEvent) => void, scope: any): void;
                        unregister(listener: (p: KEvent) => void): void;
                        notify(event: KEvent): void;
                        flush(): void;
                        setKStore(store: data.KStore): void;
                        setMetaModel(metaModel: meta.MetaModel): void;
                        sendOperationEvent(operationEvent: KEvent): void;
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
                        constructor(p_view: KView, p_uuid: number, p_timeTree: time.TimeTree);
                        train(trainingSet: any[][], expectedResultSet: any[], callback: (p: java.lang.Throwable) => void): void;
                        infer(features: any[]): any;
                        accuracy(testSet: any[][], expectedResultSet: any[]): any;
                        clear(): void;
                        createEmptyState(): KInferState;
                    }
                    class GaussianClassificationKInfer extends abs.AbstractKObjectInfer {
                        private alpha;
                        constructor(p_view: KView, p_uuid: number, p_timeTree: time.TimeTree, p_metaClass: meta.MetaClass);
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
                        constructor(p_view: KView, p_uuid: number, p_timeTree: time.TimeTree, p_metaClass: meta.MetaClass);
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
                        constructor(p_view: KView, p_uuid: number, p_timeTree: time.TimeTree, p_metaClass: meta.MetaClass);
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
                        constructor(p_view: KView, p_uuid: number, p_timeTree: time.TimeTree, p_metaClass: meta.MetaClass);
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
                        constructor(p_view: KView, p_uuid: number, p_timeTree: time.TimeTree, p_metaClass: meta.MetaClass);
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
                        constructor(p_view: KView, p_uuid: number, p_timeTree: time.TimeTree, p_metaClass: meta.MetaClass);
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
                        save(model: KObject, callback: (p: string, p1: java.lang.Throwable) => void): void;
                        saveRoot(callback: (p: string, p1: java.lang.Throwable) => void): void;
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
                        static TIME_META: string;
                        static DIM_META: string;
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
                module meta {
                    interface Meta {
                        metaName(): string;
                        index(): number;
                    }
                    interface MetaAttribute extends Meta {
                        key(): boolean;
                        metaType(): KMetaType;
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
                    class MetaInferClass implements MetaClass {
                        private static _INSTANCE;
                        private _attributes;
                        private _references;
                        private _operations;
                        static getInstance(): MetaInferClass;
                        getRaw(): MetaAttribute;
                        getCache(): MetaAttribute;
                        constructor();
                        metaAttributes(): MetaAttribute[];
                        metaReferences(): MetaReference[];
                        metaOperations(): MetaOperation[];
                        metaAttribute(name: string): MetaAttribute;
                        metaReference(name: string): MetaReference;
                        metaOperation(name: string): MetaOperation;
                        metaName(): string;
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
                        metaType(): MetaClass;
                        opposite(): MetaReference;
                        origin(): MetaClass;
                    }
                    class PrimitiveMetaTypes {
                        static STRING: KMetaType;
                        static LONG: KMetaType;
                        static INT: KMetaType;
                        static BOOL: KMetaType;
                        static SHORT: KMetaType;
                        static DOUBLE: KMetaType;
                        static FLOAT: KMetaType;
                        static TRANSIENT: KMetaType;
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
                module reflexive {
                    class DynamicKModel extends abs.AbstractKModel<any> {
                        private _metaModel;
                        setMetaModel(p_metaModel: meta.MetaModel): void;
                        metaModel(): meta.MetaModel;
                        internal_create(key: number): KUniverse<any, any, any>;
                    }
                    class DynamicKObject extends abs.AbstractKObject {
                        constructor(p_view: KView, p_uuid: number, p_timeTree: time.TimeTree, p_metaClass: meta.MetaClass);
                    }
                    class DynamicKUniverse extends abs.AbstractKUniverse<any, any, any> {
                        constructor(p_universe: KModel<any>, p_key: number);
                        internal_create(timePoint: number): KView;
                    }
                    class DynamicKView extends abs.AbstractKView {
                        constructor(p_now: number, p_dimension: KUniverse<any, any, any>);
                        internalCreate(clazz: meta.MetaClass, timeTree: time.TimeTree, key: number): KObject;
                    }
                    class DynamicMetaClass extends abs.AbstractMetaClass {
                        private cached_attributes;
                        private cached_references;
                        private cached_methods;
                        private _globalIndex;
                        constructor(p_name: string, p_index: number);
                        addAttribute(p_name: string, p_type: KMetaType): DynamicMetaClass;
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
                        then(callback: (p: KObject[]) => void): void;
                        map(attribute: meta.MetaAttribute, callback: (p: any[]) => void): void;
                        taskThen(): KTask<any>;
                        taskMap(attribute: meta.MetaAttribute): KTask<any>;
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
                        then(callback: (p: KObject[]) => void): void;
                        map(attribute: meta.MetaAttribute, callback: (p: any[]) => void): void;
                        taskThen(): KTask<any>;
                        taskMap(attribute: meta.MetaAttribute): KTask<any>;
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
                        private _store;
                        private static DIM_INDEX;
                        private static TIME_INDEX;
                        private static UUID_INDEX;
                        private static OPERATION_INDEX;
                        private static TUPLE_SIZE;
                        private remoteCallCallbacks;
                        constructor(store: data.KStore);
                        registerOperation(operation: meta.MetaOperation, callback: (p: KObject, p1: any[], p2: (p: any) => void) => void, target: KObject): void;
                        private searchOperation(source, clazz, operation);
                        call(source: KObject, operation: meta.MetaOperation, param: any[], callback: (p: any) => void): void;
                        private sendToRemote(source, operation, param, callback);
                        private protectString(input);
                        private parseParams(inParams);
                        operationEventReceived(operationEvent: KEvent): void;
                    }
                    interface KOperationManager {
                        registerOperation(operation: meta.MetaOperation, callback: (p: KObject, p1: any[], p2: (p: any) => void) => void, target: KObject): void;
                        call(source: KObject, operation: meta.MetaOperation, param: any[], callback: (p: any) => void): void;
                        operationEventReceived(operationEvent: KEvent): void;
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
                        save(model: KObject, callback: (p: string, p1: java.lang.Throwable) => void): void;
                        saveRoot(callback: (p: string, p1: java.lang.Throwable) => void): void;
                        load(payload: string, callback: (p: java.lang.Throwable) => void): void;
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
