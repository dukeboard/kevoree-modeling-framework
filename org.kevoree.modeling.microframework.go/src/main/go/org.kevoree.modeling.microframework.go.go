type Callback interface {
    on(a : A) : void
}
type InboundReference struct {
    private _reference: org.kevoree.modeling.api.meta.MetaReference;
    private _source: int64;
}
constructor(p_reference: org.kevoree.modeling.api.meta.MetaReference, p_source: int64) {
    this._reference = p_reference;
    this._source = p_source;
}

public getReference(): org.kevoree.modeling.api.meta.MetaReference {
    return this._reference;
}

public getSource(): int64 {
    return this._source;
}


type KActionType struct {

    public static CALL: KActionType = new KActionType("CALL");
    public static SET: KActionType = new KActionType("SET");
    public static ADD: KActionType = new KActionType("ADD");
    public static REMOVE: KActionType = new KActionType("DEL");
    public static NEW: KActionType = new KActionType("NEW");
    private _code: string = "";
}
constructor(code: string) {
    this._code = code;
}

public toString(): string {
    return this._code;
}

public code(): string {
    return this._code;
}

public static parse(s: string): org.kevoree.modeling.api.KActionType {
    for (var i: int = 0; i < org.kevoree.modeling.api.KActionType.values().length; i++) {
        var current: org.kevoree.modeling.api.KActionType = org.kevoree.modeling.api.KActionType.values()[i];
        if (current.code().equals(s)) {
            return current;
        }
    }
    return null;
}

public equals(other: any): boolean {
    return this == other;
}
public static _KActionTypeVALUES : KActionType[] = [
    KActionType.CALL
    ,KActionType.SET
    ,KActionType.ADD
    ,KActionType.REMOVE
    ,KActionType.NEW
];
public static values():KActionType[]{
    return KActionType._KActionTypeVALUES;
}

type KCurrentTask interface {
    results() : java.util.Map<org.kevoree.modeling.api.KTask<any>, interface{}>
    setResult(result : A) : void
    wait(p : org.kevoree.modeling.api.KTask<any>) : void
    getResult() : A
    isDone() : bool
    setJob(p : (p : org.kevoree.modeling.api.KCurrentTask<any>) => void) : void
    ready() : void
}
type KEvent interface {
    universe() : int64
    time() : int64
    uuid() : int64
    actionType() : org.kevoree.modeling.api.KActionType
    metaClass() : org.kevoree.modeling.api.meta.MetaClass
    metaElement() : org.kevoree.modeling.api.meta.Meta
    value() : interface{}
    toJSON() : string
    toTrace() : org.kevoree.modeling.api.trace.ModelTrace
}
type KInfer interface {
    type() : org.kevoree.modeling.api.meta.Meta
    trainingSet() : org.kevoree.modeling.api.KObject[]
    train(trainingSet : org.kevoree.modeling.api.KObject[],callback : (p : java.lang.Throwable) => void) : void
    learn() : void
    infer(origin : org.kevoree.modeling.api.KObject) : interface{}
    universe() : org.kevoree.modeling.api.KUniverse<any, any, any>
    isRoot() : bool
    uuid() : int64
    path(p : (p : string) => void) : void
    view() : org.kevoree.modeling.api.KView
    delete(p : (p : java.lang.Throwable) => void) : void
    parent(p : (p : org.kevoree.modeling.api.KObject) => void) : void
    parentUuid() : int64
    select(p : string,p1 : (p : org.kevoree.modeling.api.KObject[]) => void) : void
    listen(p : (p : org.kevoree.modeling.api.KEvent) => void) : void
    visitAttributes(p : (p : org.kevoree.modeling.api.meta.MetaAttribute, p1 : interface{}) => void) : void
    visit(p : (p : org.kevoree.modeling.api.KObject) => org.kevoree.modeling.api.VisitResult,p1 : (p : java.lang.Throwable) => void,p2 : org.kevoree.modeling.api.VisitRequest) : void
    now() : int64
    timeTree() : org.kevoree.modeling.api.time.TimeTree
    referenceInParent() : org.kevoree.modeling.api.meta.MetaReference
    domainKey() : string
    metaClass() : org.kevoree.modeling.api.meta.MetaClass
    mutate(p : org.kevoree.modeling.api.KActionType,p1 : org.kevoree.modeling.api.meta.MetaReference,p2 : org.kevoree.modeling.api.KObject) : void
    all(p : org.kevoree.modeling.api.meta.MetaReference,p1 : (p : org.kevoree.modeling.api.KObject[]) => void) : void
    traverse(p : org.kevoree.modeling.api.meta.MetaReference) : org.kevoree.modeling.api.traversal.KTraversal
    traverseQuery(p : string) : org.kevoree.modeling.api.traversal.KTraversal
    inbounds(p : (p : org.kevoree.modeling.api.KObject[]) => void) : void
    traces(p : org.kevoree.modeling.api.TraceRequest) : org.kevoree.modeling.api.trace.ModelTrace[]
    get(p : org.kevoree.modeling.api.meta.MetaAttribute) : interface{}
    set(p : org.kevoree.modeling.api.meta.MetaAttribute,p1 : interface{}) : void
    toJSON() : string
    equals(p : interface{}) : bool
    diff(p : org.kevoree.modeling.api.KObject,p1 : (p : org.kevoree.modeling.api.trace.TraceSequence) => void) : void
    merge(p : org.kevoree.modeling.api.KObject,p1 : (p : org.kevoree.modeling.api.trace.TraceSequence) => void) : void
    intersection(p : org.kevoree.modeling.api.KObject,p1 : (p : org.kevoree.modeling.api.trace.TraceSequence) => void) : void
    jump(p : int64,p1 : (p : U) => void) : void
    referencesWith(p : org.kevoree.modeling.api.KObject) : org.kevoree.modeling.api.meta.MetaReference[]
    taskPath() : org.kevoree.modeling.api.KTask<any>
    taskDelete() : org.kevoree.modeling.api.KTask<any>
    taskParent() : org.kevoree.modeling.api.KTask<any>
    taskSelect(p : string) : org.kevoree.modeling.api.KTask<any>
    taskAll(p : org.kevoree.modeling.api.meta.MetaReference) : org.kevoree.modeling.api.KTask<any>
    taskInbounds() : org.kevoree.modeling.api.KTask<any>
    taskDiff(p : org.kevoree.modeling.api.KObject) : org.kevoree.modeling.api.KTask<any>
    taskMerge(p : org.kevoree.modeling.api.KObject) : org.kevoree.modeling.api.KTask<any>
    taskIntersection(p : org.kevoree.modeling.api.KObject) : org.kevoree.modeling.api.KTask<any>
    taskJump(p : int64) : org.kevoree.modeling.api.KTask<any>
    taskVisit(p : (p : org.kevoree.modeling.api.KObject) => org.kevoree.modeling.api.VisitResult,p1 : org.kevoree.modeling.api.VisitRequest) : org.kevoree.modeling.api.KTask<any>
    inferChildren(p : (p : org.kevoree.modeling.api.KInfer[]) => void) : void
    taskInferChildren() : org.kevoree.modeling.api.KTask<any>
}
type KJob interface {
    run(currentTask : org.kevoree.modeling.api.KCurrentTask<any>) : void
}
type KMetaType interface {
    name() : string
    isEnum() : bool
    save(src : interface{}) : string
    load(payload : string) : interface{}
}
type KModel interface {
    newUniverse() : A
    universe(key : int64) : A
    disable(listener : (p : org.kevoree.modeling.api.KEvent) => void) : void
    storage() : org.kevoree.modeling.api.data.KStore
    listen(listener : (p : org.kevoree.modeling.api.KEvent) => void) : void
    setEventBroker(eventBroker : org.kevoree.modeling.api.event.KEventBroker) : org.kevoree.modeling.api.KModel<any>
    setDataBase(dataBase : org.kevoree.modeling.api.data.KDataBase) : org.kevoree.modeling.api.KModel<any>
    setScheduler(scheduler : org.kevoree.modeling.api.KScheduler) : org.kevoree.modeling.api.KModel<any>
    setOperation(metaOperation : org.kevoree.modeling.api.meta.MetaOperation,operation : (p : org.kevoree.modeling.api.KObject, p1 : interface{}[], p2 : (p : interface{}) => void) => void) : void
    metaModel() : org.kevoree.modeling.api.meta.MetaModel
    task() : org.kevoree.modeling.api.KTask<any>
    save(callback : (p : bool) => void) : void
    discard(callback : (p : bool) => void) : void
    unload(callback : (p : bool) => void) : void
    connect(callback : (p : java.lang.Throwable) => void) : void
    close(callback : (p : java.lang.Throwable) => void) : void
    taskSave() : org.kevoree.modeling.api.KTask<any>
    taskDiscard() : org.kevoree.modeling.api.KTask<any>
    taskUnload() : org.kevoree.modeling.api.KTask<any>
    taskConnect() : org.kevoree.modeling.api.KTask<any>
    taskClose() : org.kevoree.modeling.api.KTask<any>
}
type KObject interface {
    universe() : org.kevoree.modeling.api.KUniverse<any, any, any>
    isRoot() : bool
    uuid() : int64
    path(callback : (p : string) => void) : void
    view() : org.kevoree.modeling.api.KView
    delete(callback : (p : java.lang.Throwable) => void) : void
    parent(callback : (p : org.kevoree.modeling.api.KObject) => void) : void
    parentUuid() : int64
    select(query : string,callback : (p : org.kevoree.modeling.api.KObject[]) => void) : void
    listen(listener : (p : org.kevoree.modeling.api.KEvent) => void) : void
    visitAttributes(visitor : (p : org.kevoree.modeling.api.meta.MetaAttribute, p1 : interface{}) => void) : void
    visit(visitor : (p : org.kevoree.modeling.api.KObject) => org.kevoree.modeling.api.VisitResult,end : (p : java.lang.Throwable) => void,request : org.kevoree.modeling.api.VisitRequest) : void
    now() : int64
    timeTree() : org.kevoree.modeling.api.time.TimeTree
    referenceInParent() : org.kevoree.modeling.api.meta.MetaReference
    domainKey() : string
    metaClass() : org.kevoree.modeling.api.meta.MetaClass
    mutate(actionType : org.kevoree.modeling.api.KActionType,metaReference : org.kevoree.modeling.api.meta.MetaReference,param : org.kevoree.modeling.api.KObject) : void
    all(metaReference : org.kevoree.modeling.api.meta.MetaReference,callback : (p : org.kevoree.modeling.api.KObject[]) => void) : void
    traverse(metaReference : org.kevoree.modeling.api.meta.MetaReference) : org.kevoree.modeling.api.traversal.KTraversal
    traverseQuery(metaReferenceQuery : string) : org.kevoree.modeling.api.traversal.KTraversal
    inbounds(callback : (p : org.kevoree.modeling.api.KObject[]) => void) : void
    traces(request : org.kevoree.modeling.api.TraceRequest) : org.kevoree.modeling.api.trace.ModelTrace[]
    get(attribute : org.kevoree.modeling.api.meta.MetaAttribute) : interface{}
    set(attribute : org.kevoree.modeling.api.meta.MetaAttribute,payload : interface{}) : void
    toJSON() : string
    equals(other : interface{}) : bool
    diff(target : org.kevoree.modeling.api.KObject,callback : (p : org.kevoree.modeling.api.trace.TraceSequence) => void) : void
    merge(target : org.kevoree.modeling.api.KObject,callback : (p : org.kevoree.modeling.api.trace.TraceSequence) => void) : void
    intersection(target : org.kevoree.modeling.api.KObject,callback : (p : org.kevoree.modeling.api.trace.TraceSequence) => void) : void
    jump(time : int64,callback : (p : U) => void) : void
    referencesWith(o : org.kevoree.modeling.api.KObject) : org.kevoree.modeling.api.meta.MetaReference[]
    taskPath() : org.kevoree.modeling.api.KTask<any>
    taskDelete() : org.kevoree.modeling.api.KTask<any>
    taskParent() : org.kevoree.modeling.api.KTask<any>
    taskSelect(query : string) : org.kevoree.modeling.api.KTask<any>
    taskAll(metaReference : org.kevoree.modeling.api.meta.MetaReference) : org.kevoree.modeling.api.KTask<any>
    taskInbounds() : org.kevoree.modeling.api.KTask<any>
    taskDiff(target : org.kevoree.modeling.api.KObject) : org.kevoree.modeling.api.KTask<any>
    taskMerge(target : org.kevoree.modeling.api.KObject) : org.kevoree.modeling.api.KTask<any>
    taskIntersection(target : org.kevoree.modeling.api.KObject) : org.kevoree.modeling.api.KTask<any>
    taskJump(time : int64) : org.kevoree.modeling.api.KTask<any>
    taskVisit(visitor : (p : org.kevoree.modeling.api.KObject) => org.kevoree.modeling.api.VisitResult,request : org.kevoree.modeling.api.VisitRequest) : org.kevoree.modeling.api.KTask<any>
    inferChildren(callback : (p : org.kevoree.modeling.api.KInfer[]) => void) : void
    taskInferChildren() : org.kevoree.modeling.api.KTask<any>
}
type KOperation interface {
    on(source : org.kevoree.modeling.api.KObject,params : interface{}[],result : (p : interface{}) => void) : void
}
type KScheduler interface {
    dispatch(runnable : Runnable) : void
    stop() : void
}
type KTask interface {
    wait(previous : org.kevoree.modeling.api.KTask<any>) : void
    getResult() : A
    isDone() : bool
    setJob(kjob : (p : org.kevoree.modeling.api.KCurrentTask<any>) => void) : void
    ready() : void
}
type KUniverse interface {
    key() : int64
    time(timePoint : int64) : A
    model() : C
    equals(other : interface{}) : bool
    listen(listener : (p : org.kevoree.modeling.api.KEvent) => void) : void
    listenAllTimes(target : org.kevoree.modeling.api.KObject,listener : (p : org.kevoree.modeling.api.KEvent) => void) : void
    split(callback : (p : B) => void) : void
    origin(callback : (p : B) => void) : void
    descendants(callback : (p : B[]) => void) : void
    save(callback : (p : java.lang.Throwable) => void) : void
    unload(callback : (p : java.lang.Throwable) => void) : void
    delete(callback : (p : java.lang.Throwable) => void) : void
    discard(callback : (p : java.lang.Throwable) => void) : void
    taskSplit() : org.kevoree.modeling.api.KTask<any>
    taskOrigin() : org.kevoree.modeling.api.KTask<any>
    taskDescendants() : org.kevoree.modeling.api.KTask<any>
    taskSave() : org.kevoree.modeling.api.KTask<any>
    taskUnload() : org.kevoree.modeling.api.KTask<any>
    taskDelete() : org.kevoree.modeling.api.KTask<any>
    taskDiscard() : org.kevoree.modeling.api.KTask<any>
}
type KView interface {
    createFQN(metaClassName : string) : org.kevoree.modeling.api.KObject
    create(clazz : org.kevoree.modeling.api.meta.MetaClass) : org.kevoree.modeling.api.KObject
    select(query : string,callback : (p : org.kevoree.modeling.api.KObject[]) => void) : void
    lookup(key : int64,callback : (p : org.kevoree.modeling.api.KObject) => void) : void
    lookupAll(keys : int64[],callback : (p : org.kevoree.modeling.api.KObject[]) => void) : void
    universe() : org.kevoree.modeling.api.KUniverse<any, any, any>
    now() : int64
    listen(listener : (p : org.kevoree.modeling.api.KEvent) => void) : void
    json() : org.kevoree.modeling.api.ModelFormat
    xmi() : org.kevoree.modeling.api.ModelFormat
    equals(other : interface{}) : bool
    setRoot(elem : org.kevoree.modeling.api.KObject,callback : (p : java.lang.Throwable) => void) : void
    taskLookup(key : int64) : org.kevoree.modeling.api.KTask<any>
    taskLookupAll(keys : int64[]) : org.kevoree.modeling.api.KTask<any>
    taskSelect(query : string) : org.kevoree.modeling.api.KTask<any>
    taskSetRoot(elem : org.kevoree.modeling.api.KObject) : org.kevoree.modeling.api.KTask<any>
}
type ModelAttributeVisitor interface {
    visit(metaAttribute : org.kevoree.modeling.api.meta.MetaAttribute,value : interface{}) : void
}
type ModelFormat interface {
    save(model : org.kevoree.modeling.api.KObject,callback : (p : string, p1 : java.lang.Throwable) => void) : void
    saveRoot(callback : (p : string, p1 : java.lang.Throwable) => void) : void
    load(payload : string,callback : (p : java.lang.Throwable) => void) : void
}
type ModelListener interface {
    on(evt : org.kevoree.modeling.api.KEvent) : void
}
type ModelVisitor interface {
    visit(elem : org.kevoree.modeling.api.KObject) : org.kevoree.modeling.api.VisitResult
}
type ThrowableCallback interface {
    on(a : A,error : java.lang.Throwable) : void
}
type TraceRequest struct {

    public static ATTRIBUTES_ONLY: TraceRequest = new TraceRequest();
    public static REFERENCES_ONLY: TraceRequest = new TraceRequest();
    public static ATTRIBUTES_REFERENCES: TraceRequest = new TraceRequest();
}
public equals(other: any): boolean {
    return this == other;
}
public static _TraceRequestVALUES : TraceRequest[] = [
    TraceRequest.ATTRIBUTES_ONLY
    ,TraceRequest.REFERENCES_ONLY
    ,TraceRequest.ATTRIBUTES_REFERENCES
];
public static values():TraceRequest[]{
    return TraceRequest._TraceRequestVALUES;
}

type VisitRequest struct {

    public static CHILDREN: VisitRequest = new VisitRequest();
    public static CONTAINED: VisitRequest = new VisitRequest();
    public static ALL: VisitRequest = new VisitRequest();
}
public equals(other: any): boolean {
    return this == other;
}
public static _VisitRequestVALUES : VisitRequest[] = [
    VisitRequest.CHILDREN
    ,VisitRequest.CONTAINED
    ,VisitRequest.ALL
];
public static values():VisitRequest[]{
    return VisitRequest._VisitRequestVALUES;
}

type VisitResult struct {

    public static CONTINUE: VisitResult = new VisitResult();
    public static SKIP: VisitResult = new VisitResult();
    public static STOP: VisitResult = new VisitResult();
}
public equals(other: any): boolean {
    return this == other;
}
public static _VisitResultVALUES : VisitResult[] = [
    VisitResult.CONTINUE
    ,VisitResult.SKIP
    ,VisitResult.STOP
];
public static values():VisitResult[]{
    return VisitResult._VisitResultVALUES;
}

type AbstractKDataType struct implements org.kevoree.modeling.api.KMetaType {

    private _name: string;
    private _isEnum: bool = false;
}
constructor(p_name: string, p_isEnum: bool) {
    this._name = p_name;
    this._isEnum = p_isEnum;
}

public name(): string {
    return this._name;
}

public isEnum(): bool {
    return this._isEnum;
}

public save(src: interface{}): string {
    if (src != null) {
        if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING) {
            return org.kevoree.modeling.api.json.JsonString.encode(src.toString());
        } else {
            return src.toString();
        }
    }
    return "";
}

public load(payload: string): interface{} {
    if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.STRING) {
        return org.kevoree.modeling.api.json.JsonString.unescape(payload);
    }
    if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.LONG) {
        return java.lang.Long.parseLong(payload);
    }
    if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.INT) {
        return java.lang.Integer.parseInt(payload);
    }
    if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.BOOL) {
        return payload.equals("true");
    }
    if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.SHORT) {
        return java.lang.Short.parseShort(payload);
    }
    if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.DOUBLE) {
        return java.lang.Double.parseDouble(payload);
    }
    if (this == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.FLOAT) {
        return java.lang.Float.parseFloat(payload);
    }
    return null;
}


type AbstractKModel struct<A extends org.kevoree.modeling.api.KUniverse<any, any, any>> implements org.kevoree.modeling.api.KModel<any> {

    private _storage: org.kevoree.modeling.api.data.KStore;
}
public metaModel(): org.kevoree.modeling.api.meta.MetaModel {
    throw "Abstract method";
}

constructor() {
    this._storage = new org.kevoree.modeling.api.data.DefaultKStore();
}

public connect(callback: (p : java.lang.Throwable) => void): void {
    this._storage.connect(callback);
}

public close(callback: (p : java.lang.Throwable) => void): void {
    this._storage.close(callback);
}

public storage(): org.kevoree.modeling.api.data.KStore {
    return this._storage;
}

public newUniverse(): A {
    var nextKey: int64 = this._storage.nextUniverseKey();
    var newDimension: A = this.internal_create(nextKey);
    this.storage().initUniverse(newDimension);
    return newDimension;
}

public internal_create(key: int64): A {
    throw "Abstract method";
}

public universe(key: int64): A {
    var newDimension: A = this.internal_create(key);
    this.storage().initUniverse(newDimension);
    return newDimension;
}

public save(callback: (p : bool) => void): void {
}

public discard(callback: (p : bool) => void): void {
}

public unload(callback: (p : bool) => void): void {
}

public disable(listener: (p : org.kevoree.modeling.api.KEvent) => void): void {
}

public listen(listener: (p : org.kevoree.modeling.api.KEvent) => void): void {
    this.storage().eventBroker().registerListener(this, listener, null);
}

public setEventBroker(p_eventBroker: org.kevoree.modeling.api.event.KEventBroker): org.kevoree.modeling.api.KModel<any> {
    this.storage().setEventBroker(p_eventBroker);
    p_eventBroker.setMetaModel(this.metaModel());
    return this;
}

public setDataBase(p_dataBase: org.kevoree.modeling.api.data.KDataBase): org.kevoree.modeling.api.KModel<any> {
    this.storage().setDataBase(p_dataBase);
    return this;
}

public setScheduler(p_scheduler: org.kevoree.modeling.api.KScheduler): org.kevoree.modeling.api.KModel<any> {
    this.storage().setScheduler(p_scheduler);
    return this;
}

public setOperation(metaOperation: org.kevoree.modeling.api.meta.MetaOperation, operation: (p : org.kevoree.modeling.api.KObject, p1 : interface{}[], p2 : (p : interface{}) => void) => void): void {
    this.storage().operationManager().registerOperation(metaOperation, operation);
}

public task(): org.kevoree.modeling.api.KTask<any> {
    return new org.kevoree.modeling.api.abs.AbstractKTask<any>();
}

public taskSave(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.save(task.initCallback());
    return task;
}

public taskDiscard(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.discard(task.initCallback());
    return task;
}

public taskUnload(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.unload(task.initCallback());
    return task;
}

public taskConnect(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.connect(task.initCallback());
    return task;
}

public taskClose(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.close(task.initCallback());
    return task;
}


type AbstractKObject struct implements org.kevoree.modeling.api.KObject {

    private _view: org.kevoree.modeling.api.KView;
    private _uuid: int64;
    private _timeTree: org.kevoree.modeling.api.time.TimeTree;
    private _metaClass: org.kevoree.modeling.api.meta.MetaClass;
}
constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: int64, p_timeTree: org.kevoree.modeling.api.time.TimeTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
    this._view = p_view;
    this._uuid = p_uuid;
    this._timeTree = p_timeTree;
    this._metaClass = p_metaClass;
}

public view(): org.kevoree.modeling.api.KView {
    return this._view;
}

public uuid(): int64 {
    return this._uuid;
}

public metaClass(): org.kevoree.modeling.api.meta.MetaClass {
    return this._metaClass;
}

public isRoot(): bool {
    var raw: interface{}[] = this._view.universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
    if (raw != null) {
        var isRoot: bool = raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX].(bool);
        if (isRoot == null) {
            return false;
        } else {
            return isRoot;
        }
    } else {
        return false;
    }
}

public setRoot(isRoot: bool): void {
    var raw: interface{}[] = this._view.universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
    if (raw != null) {
        raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = isRoot;
    }
}

public now(): int64 {
    return this._view.now();
}

public timeTree(): org.kevoree.modeling.api.time.TimeTree {
    return this._timeTree;
}

public universe(): org.kevoree.modeling.api.KUniverse<any, any, any> {
    return this._view.universe();
}

public path(callback: (p : string) => void): void {
    if (!org.kevoree.modeling.api.util.Checker.isDefined(callback)) {
        return;
    }
    if (this.isRoot()) {
        callback("/");
    } else {
        this.parent( (parent : org.kevoree.modeling.api.KObject) => {
            if (parent == null) {
                callback(null);
            } else {
                parent.path( (parentPath : string) => {
                    callback(org.kevoree.modeling.api.util.PathHelper.path(parentPath, this.referenceInParent(), this));
                });
            }
        });
    }
}

public parentUuid(): int64 {
    var raw: interface{}[] = this._view.universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
    if (raw == null) {
        return null;
    } else {
        return raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX].(int64);
    }
}

public parent(callback: (p : org.kevoree.modeling.api.KObject) => void): void {
    if (!org.kevoree.modeling.api.util.Checker.isDefined(callback)) {
        return;
    }
    var parentKID: int64 = this.parentUuid();
    if (parentKID == null) {
        callback(null);
    } else {
        this._view.lookup(parentKID, callback);
    }
}

public referenceInParent(): org.kevoree.modeling.api.meta.MetaReference {
    var raw: interface{}[] = this._view.universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
    if (raw == null) {
        return null;
    } else {
        return raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX].(org.kevoree.modeling.api.meta.MetaReference);
    }
}

public delete(callback: (p : java.lang.Throwable) => void): void {
    var toRemove: org.kevoree.modeling.api.KObject = this;
    var rawPayload: interface{}[] = this._view.universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.DELETE);
    if (rawPayload == null) {
        callback(new java.lang.Exception("Out of cache Error"));
    } else {
        var payload: interface{} = rawPayload[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
        if (payload != null) {
            var inboundsKeys: java.util.Set<int64> = payload.(java.util.Set<int64>);
            var refArr: int64[] = inboundsKeys.toArray(new Array());
            this.view().lookupAll(refArr,  (resolved : org.kevoree.modeling.api.KObject[]) => {
                for (var i: int = 0; i < resolved.length; i++) {
                    if (resolved[i] != null) {
                        var linkedReferences: org.kevoree.modeling.api.meta.MetaReference[] = resolved[i].referencesWith(toRemove);
                        for (var j: int = 0; j < linkedReferences.length; j++) {
                            (resolved[i].(org.kevoree.modeling.api.abs.AbstractKObject)).internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, linkedReferences[j], toRemove, false, true);
                        }
                    }
                }
                if (callback != null) {
                    callback(null);
                }
            });
        } else {
            callback(new java.lang.Exception("Out of cache error"));
        }
    }
}

public select(query: string, callback: (p : org.kevoree.modeling.api.KObject[]) => void): void {
    if (!org.kevoree.modeling.api.util.Checker.isDefined(callback)) {
        return;
    }
    if (!org.kevoree.modeling.api.util.Checker.isDefined(query)) {
        callback(new Array());
        return;
    }
    var cleanedQuery: string = query;
    if (cleanedQuery.startsWith("/")) {
        cleanedQuery = cleanedQuery.substring(1);
    }
    if (this.isRoot()) {
        var roots: org.kevoree.modeling.api.KObject[] = new Array();
        roots[0] = this;
        org.kevoree.modeling.api.traversal.selector.KSelector.select(this.view(), roots, cleanedQuery, callback);
    } else {
        if (query.startsWith("/")) {
            var finalCleanedQuery: string = cleanedQuery;
            this.universe().model().storage().getRoot(this.view(),  (rootObj : org.kevoree.modeling.api.KObject) => {
                if (rootObj == null) {
                    callback(new Array());
                } else {
                    var roots: org.kevoree.modeling.api.KObject[] = new Array();
                    roots[0] = rootObj;
                    org.kevoree.modeling.api.traversal.selector.KSelector.select(rootObj.view(), roots, finalCleanedQuery, callback);
                }
            });
        } else {
            var roots: org.kevoree.modeling.api.KObject[] = new Array();
            roots[0] = this;
            org.kevoree.modeling.api.traversal.selector.KSelector.select(this.view(), roots, query, callback);
        }
    }
}

public listen(listener: (p : org.kevoree.modeling.api.KEvent) => void): void {
    this.universe().model().storage().eventBroker().registerListener(this, listener, null);
}

public domainKey(): string {
    var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
    var atts: org.kevoree.modeling.api.meta.MetaAttribute[] = this.metaClass().metaAttributes();
    for (var i: int = 0; i < atts.length; i++) {
        var att: org.kevoree.modeling.api.meta.MetaAttribute = atts[i];
        if (att.key()) {
            if (builder.length != 0) {
                builder.append(",");
            }
            builder.append(att.metaName());
            builder.append("=");
            var payload: interface{} = this.get(att);
            if (payload != null) {
                builder.append(payload.toString());
            }
        }
    }
    var result: string = builder.toString();
    if (result.equals("")) {
        return this.uuid() + "";
    } else {
        return result;
    }
}

public get(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute): interface{} {
    var transposed: org.kevoree.modeling.api.meta.MetaAttribute = this.internal_transpose_att(p_attribute);
    if (transposed == null) {
        throw new java.lang.RuntimeException("Bad KMF usage, the attribute named " + p_attribute.metaName() + " is not part of " + this.metaClass().metaName());
    } else {
        return transposed.strategy().extrapolate(this, transposed);
    }
}

public set(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: interface{}): void {
    var transposed: org.kevoree.modeling.api.meta.MetaAttribute = this.internal_transpose_att(p_attribute);
    if (transposed == null) {
        throw new java.lang.RuntimeException("Bad KMF usage, the attribute named " + p_attribute.metaName() + " is not part of " + this.metaClass().metaName());
    } else {
        transposed.strategy().mutate(this, transposed, payload);
        this.view().universe().model().storage().eventBroker().notify(new org.kevoree.modeling.api.event.DefaultKEvent(org.kevoree.modeling.api.KActionType.SET, this, transposed, payload));
    }
}

private removeFromContainer(param: org.kevoree.modeling.api.KObject): void {
    if (param != null && param.parentUuid() != null && param.parentUuid() != this._uuid) {
        this.view().lookup(param.parentUuid(),  (parent : org.kevoree.modeling.api.KObject) => {
            (parent.(org.kevoree.modeling.api.abs.AbstractKObject)).internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, param.referenceInParent(), param, true, false);
        });
    }
}

public mutate(actionType: org.kevoree.modeling.api.KActionType, metaReference: org.kevoree.modeling.api.meta.MetaReference, param: org.kevoree.modeling.api.KObject): void {
    this.internal_mutate(actionType, metaReference, param, true, false);
}

public internal_mutate(actionType: org.kevoree.modeling.api.KActionType, metaReferenceP: org.kevoree.modeling.api.meta.MetaReference, param: org.kevoree.modeling.api.KObject, setOpposite: bool, inDelete: bool): void {
    var metaReference: org.kevoree.modeling.api.meta.MetaReference = this.internal_transpose_ref(metaReferenceP);
    if (metaReference == null) {
        if (metaReferenceP == null) {
            throw new java.lang.RuntimeException("Bad KMF usage, the reference " + " is null in metaClass named " + this.metaClass().metaName());
        } else {
            throw new java.lang.RuntimeException("Bad KMF usage, the reference named " + metaReferenceP.metaName() + " is not part of " + this.metaClass().metaName());
        }
    }
    if (actionType.equals(org.kevoree.modeling.api.KActionType.ADD)) {
        if (metaReference.single()) {
            this.internal_mutate(org.kevoree.modeling.api.KActionType.SET, metaReference, param, setOpposite, inDelete);
        } else {
            var raw: interface{}[] = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
            var previousList: java.util.Set<int64>;
            if (raw[metaReference.index()] != null && raw[metaReference.index()] instanceof java.util.Set) {
                previousList = raw[metaReference.index()].(java.util.Set<int64>);
            } else {
                if (raw[metaReference.index()] != null) {
                    try {
                        throw new java.lang.Exception("Bad cache values in KMF, " + raw[metaReference.index()] + " is not an instance of Set for the reference " + metaReference.metaName() + ", index:" + metaReference.index());
                    } catch ($ex$) {
                        if ($ex$ instanceof java.lang.Exception) {
                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                            e.printStackTrace();
                        }
                     }
                }
                previousList = new java.util.HashSet<int64>();
                raw[metaReference.index()] = previousList;
            }
            previousList.add(param.uuid());
            if (metaReference.opposite() != null && setOpposite) {
                (param.(org.kevoree.modeling.api.abs.AbstractKObject)).internal_mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference.opposite(), this, false, inDelete);
            }
            if (metaReference.contained()) {
                this.removeFromContainer(param);
                (param.(org.kevoree.modeling.api.abs.AbstractKObject)).set_parent(this._uuid, metaReference);
            }
            var rawParam: interface{}[] = this.view().universe().model().storage().raw(param, org.kevoree.modeling.api.data.AccessMode.WRITE);
            var previousInbounds: java.util.Set<int64>;
            if (rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null && rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] instanceof java.util.Set) {
                previousInbounds = rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX].(java.util.Set<int64>);
            } else {
                if (rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null) {
                    try {
                        throw new java.lang.Exception("Bad cache values in KMF, " + rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] + " is not an instance of Set for the INBOUNDS storage");
                    } catch ($ex$) {
                        if ($ex$ instanceof java.lang.Exception) {
                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                            e.printStackTrace();
                        }
                     }
                }
                previousInbounds = new java.util.HashSet<int64>();
                rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] = previousInbounds;
            }
            previousInbounds.add(this.uuid());
            var event: org.kevoree.modeling.api.KEvent = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, param);
            this.view().universe().model().storage().eventBroker().notify(event);
        }
    } else {
        if (actionType.equals(org.kevoree.modeling.api.KActionType.SET)) {
            if (!metaReference.single()) {
                this.internal_mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference, param, setOpposite, inDelete);
            } else {
                if (param == null) {
                    this.internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference, null, setOpposite, inDelete);
                } else {
                    var payload: interface{}[] = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                    var previous: interface{} = payload[metaReference.index()];
                    if (previous != null) {
                        this.internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference, null, setOpposite, inDelete);
                    }
                    payload[metaReference.index()] = param.uuid();
                    if (metaReference.contained()) {
                        this.removeFromContainer(param);
                        (param.(org.kevoree.modeling.api.abs.AbstractKObject)).set_parent(this._uuid, metaReference);
                    }
                    var rawParam: interface{}[] = this.view().universe().model().storage().raw(param, org.kevoree.modeling.api.data.AccessMode.WRITE);
                    var previousInbounds: java.util.Set<int64>;
                    if (rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null && rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] instanceof java.util.Set) {
                        previousInbounds = rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX].(java.util.Set<int64>);
                    } else {
                        if (rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null) {
                            try {
                                throw new java.lang.Exception("Bad cache values in KMF, " + rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] + " is not an instance of Set for the INBOUNDS storage");
                            } catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                    e.printStackTrace();
                                }
                             }
                        }
                        previousInbounds = new java.util.HashSet<int64>();
                        rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] = previousInbounds;
                    }
                    previousInbounds.add(this.uuid());
                    var self: org.kevoree.modeling.api.KObject = this;
                    if (metaReference.opposite() != null && setOpposite) {
                        if (previous != null) {
                            this.view().lookup(previous.(int64),  (resolved : org.kevoree.modeling.api.KObject) => {
                                (resolved.(org.kevoree.modeling.api.abs.AbstractKObject)).internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), self, false, inDelete);
                            });
                        }
                        (param.(org.kevoree.modeling.api.abs.AbstractKObject)).internal_mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference.opposite(), this, false, inDelete);
                    }
                    var event: org.kevoree.modeling.api.KEvent = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, param);
                    this.view().universe().model().storage().eventBroker().notify(event);
                }
            }
        } else {
            if (actionType.equals(org.kevoree.modeling.api.KActionType.REMOVE)) {
                if (metaReference.single()) {
                    var raw: interface{}[] = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                    var previousKid: interface{} = raw[metaReference.index()];
                    raw[metaReference.index()] = null;
                    if (previousKid != null) {
                        var self: org.kevoree.modeling.api.KObject = this;
                        this._view.universe().model().storage().lookup(this._view, previousKid.(int64),  (resolvedParam : org.kevoree.modeling.api.KObject) => {
                            if (resolvedParam != null) {
                                if (metaReference.contained()) {
                                    (resolvedParam.(org.kevoree.modeling.api.abs.AbstractKObject)).set_parent(null, null);
                                }
                                if (metaReference.opposite() != null && setOpposite) {
                                    (resolvedParam.(org.kevoree.modeling.api.abs.AbstractKObject)).internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), self, false, inDelete);
                                }
                                var rawParam: interface{}[] = this.view().universe().model().storage().raw(resolvedParam, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                var previousInbounds: java.util.Set<int64>;
                                if (rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null && rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] instanceof java.util.Set) {
                                    previousInbounds = rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX].(java.util.Set<int64>);
                                } else {
                                    if (rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null) {
                                        try {
                                            throw new java.lang.Exception("Bad cache values in KMF, " + rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] + " is not an instance of Set for the INBOUNDS storage");
                                        } catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                e.printStackTrace();
                                            }
                                         }
                                    }
                                    previousInbounds = new java.util.HashSet<int64>();
                                    rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] = previousInbounds;
                                }
                                previousInbounds.remove(this._uuid);
                            }
                        });
                        var event: org.kevoree.modeling.api.KEvent = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, previousKid);
                        this.view().universe().model().storage().eventBroker().notify(event);
                    }
                } else {
                    var payload: interface{}[] = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                    var previous: interface{} = payload[metaReference.index()];
                    if (previous != null) {
                        var previousList: java.util.Set<int64> = previous.(java.util.Set<int64>);
                        previousList.remove(param.uuid());
                        if (!inDelete && metaReference.contained()) {
                            (param.(org.kevoree.modeling.api.abs.AbstractKObject)).set_parent(null, null);
                        }
                        if (metaReference.opposite() != null && setOpposite) {
                            (param.(org.kevoree.modeling.api.abs.AbstractKObject)).internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), this, false, inDelete);
                        }
                        var event: org.kevoree.modeling.api.KEvent = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, param);
                        this.view().universe().model().storage().eventBroker().notify(event);
                    }
                    if (!inDelete) {
                        var rawParam: interface{}[] = this.view().universe().model().storage().raw(param, org.kevoree.modeling.api.data.AccessMode.WRITE);
                        if (rawParam != null && rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null && rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] instanceof java.util.Set) {
                            var previousInbounds: java.util.Set<int64> = rawParam[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX].(java.util.Set<int64>);
                            previousInbounds.remove(this._uuid);
                        }
                    }
                }
            }
        }
    }
}

public size(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): int {
    var transposed: org.kevoree.modeling.api.meta.MetaReference = this.internal_transpose_ref(p_metaReference);
    if (transposed == null) {
        throw new java.lang.RuntimeException("Bad KMF usage, the attribute named " + p_metaReference.metaName() + " is not part of " + this.metaClass().metaName());
    } else {
        var raw: interface{}[] = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
        if (raw != null) {
            var ref: interface{} = raw[transposed.index()];
            if (ref == null) {
                return 0;
            } else {
                var refSet: java.util.Set<interface{}> = ref.(java.util.Set<interface{}>);
                return refSet.size();
            }
        } else {
            return 0;
        }
    }
}

public all(p_metaReference: org.kevoree.modeling.api.meta.MetaReference, p_callback: (p : org.kevoree.modeling.api.KObject[]) => void): void {
    if (!org.kevoree.modeling.api.util.Checker.isDefined(p_callback)) {
        return;
    }
    var transposed: org.kevoree.modeling.api.meta.MetaReference = this.internal_transpose_ref(p_metaReference);
    if (transposed == null) {
        throw new java.lang.RuntimeException("Bad KMF usage, the reference named " + p_metaReference.metaName() + " is not part of " + this.metaClass().metaName());
    } else {
        var raw: interface{}[] = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
        if (raw == null) {
            p_callback(new Array());
        } else {
            var o: interface{} = raw[transposed.index()];
            if (o == null) {
                p_callback(new Array());
            } else {
                if (o instanceof java.util.Set) {
                    var objs: java.util.Set<int64> = o.(java.util.Set<int64>);
                    var setContent: int64[] = objs.toArray(new Array());
                    this.view().lookupAll(setContent,  (result : org.kevoree.modeling.api.KObject[]) => {
                        try {
                            p_callback(result);
                        } catch ($ex$) {
                            if ($ex$ instanceof java.lang.Throwable) {
                                var t: java.lang.Throwable = <java.lang.Throwable>$ex$;
                                t.printStackTrace();
                                p_callback(null);
                            }
                         }
                    });
                } else {
                    var content: int64[] = [o.(int64)];
                    this.view().lookupAll(content,  (result : org.kevoree.modeling.api.KObject[]) => {
                        try {
                            p_callback(result);
                        } catch ($ex$) {
                            if ($ex$ instanceof java.lang.Throwable) {
                                var t: java.lang.Throwable = <java.lang.Throwable>$ex$;
                                t.printStackTrace();
                                p_callback(null);
                            }
                         }
                    });
                }
            }
        }
    }
}

public visitAttributes(visitor: (p : org.kevoree.modeling.api.meta.MetaAttribute, p1 : interface{}) => void): void {
    if (!org.kevoree.modeling.api.util.Checker.isDefined(visitor)) {
        return;
    }
    var metaAttributes: org.kevoree.modeling.api.meta.MetaAttribute[] = this.metaClass().metaAttributes();
    for (var i: int = 0; i < metaAttributes.length; i++) {
        visitor(metaAttributes[i], this.get(metaAttributes[i]));
    }
}

public visit(p_visitor: (p : org.kevoree.modeling.api.KObject) => org.kevoree.modeling.api.VisitResult, p_end: (p : java.lang.Throwable) => void, p_request: org.kevoree.modeling.api.VisitRequest): void {
    if (p_request.equals(org.kevoree.modeling.api.VisitRequest.CHILDREN)) {
        this.internal_visit(p_visitor, p_end, false, false, null, null);
    } else {
        if (p_request.equals(org.kevoree.modeling.api.VisitRequest.ALL)) {
            this.internal_visit(p_visitor, p_end, true, false, new java.util.HashSet<int64>(), new java.util.HashSet<int64>());
        } else {
            if (p_request.equals(org.kevoree.modeling.api.VisitRequest.CONTAINED)) {
                this.internal_visit(p_visitor, p_end, true, true, null, null);
            }
        }
    }
}

private internal_visit(visitor: (p : org.kevoree.modeling.api.KObject) => org.kevoree.modeling.api.VisitResult, end: (p : java.lang.Throwable) => void, deep: bool, containedOnly: bool, visited: java.util.HashSet<int64>, traversed: java.util.HashSet<int64>): void {
    if (!org.kevoree.modeling.api.util.Checker.isDefined(visitor)) {
        return;
    }
    if (traversed != null) {
        traversed.add(this._uuid);
    }
    var toResolveIds: java.util.Set<int64> = new java.util.HashSet<int64>();
    for (var i: int = 0; i < this.metaClass().metaReferences().length; i++) {
        var reference: org.kevoree.modeling.api.meta.MetaReference = this.metaClass().metaReferences()[i];
        if (!(containedOnly && !reference.contained())) {
            var raw: interface{}[] = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
            var obj: interface{} = null;
            if (raw != null) {
                obj = raw[reference.index()];
            }
            if (obj != null) {
                if (obj instanceof java.util.Set) {
                    var ids: java.util.Set<int64> = obj.(java.util.Set<int64>);
                    var idArr: int64[] = ids.toArray(new Array());
                    for (var k: int = 0; k < idArr.length; k++) {
                        if (traversed == null || !traversed.contains(idArr[k])) {
                            toResolveIds.add(idArr[k]);
                        }
                    }
                } else {
                    if (traversed == null || !traversed.contains(obj)) {
                        toResolveIds.add(obj.(int64));
                    }
                }
            }
        }
    }
    if (toResolveIds.isEmpty()) {
        if (org.kevoree.modeling.api.util.Checker.isDefined(end)) {
            end(null);
        }
    } else {
        var toResolveIdsArr: int64[] = toResolveIds.toArray(new Array());
        this.view().lookupAll(toResolveIdsArr,  (resolvedArr : org.kevoree.modeling.api.KObject[]) => {
            var nextDeep: java.util.List<org.kevoree.modeling.api.KObject> = new java.util.ArrayList<org.kevoree.modeling.api.KObject>();
            for (var i: int = 0; i < resolvedArr.length; i++) {
                var resolved: org.kevoree.modeling.api.KObject = resolvedArr[i];
                var result: org.kevoree.modeling.api.VisitResult = org.kevoree.modeling.api.VisitResult.CONTINUE;
                if (visitor != null && (visited == null || !visited.contains(resolved.uuid()))) {
                    result = visitor(resolved);
                }
                if (visited != null) {
                    visited.add(resolved.uuid());
                }
                if (result != null && result.equals(org.kevoree.modeling.api.VisitResult.STOP)) {
                    if (org.kevoree.modeling.api.util.Checker.isDefined(end)) {
                        end(null);
                    }
                } else {
                    if (deep) {
                        if (result.equals(org.kevoree.modeling.api.VisitResult.CONTINUE)) {
                            if (traversed == null || !traversed.contains(resolved.uuid())) {
                                nextDeep.add(resolved);
                            }
                        }
                    }
                }
            }
            if (!nextDeep.isEmpty()) {
                var index: int[] = new Array();
                index[0] = 0;
                var next: java.util.List<(p : java.lang.Throwable) => void> = new java.util.ArrayList<(p : java.lang.Throwable) => void>();
                next.add( (throwable : java.lang.Throwable) => {
                    index[0] = index[0] + 1;
                    if (index[0] == nextDeep.size()) {
                        if (org.kevoree.modeling.api.util.Checker.isDefined(end)) {
                            end(null);
                        }
                    } else {
                        var abstractKObject: org.kevoree.modeling.api.abs.AbstractKObject = nextDeep.get(index[0]).(org.kevoree.modeling.api.abs.AbstractKObject);
                        if (containedOnly) {
                            abstractKObject.internal_visit(visitor, next.get(0), true, true, visited, traversed);
                        } else {
                            abstractKObject.internal_visit(visitor, next.get(0), true, false, visited, traversed);
                        }
                    }
                });
                var abstractKObject: org.kevoree.modeling.api.abs.AbstractKObject = nextDeep.get(index[0]).(org.kevoree.modeling.api.abs.AbstractKObject);
                if (containedOnly) {
                    abstractKObject.internal_visit(visitor, next.get(0), true, true, visited, traversed);
                } else {
                    abstractKObject.internal_visit(visitor, next.get(0), true, false, visited, traversed);
                }
            } else {
                if (org.kevoree.modeling.api.util.Checker.isDefined(end)) {
                    end(null);
                }
            }
        });
    }
}

public toJSON(): string {
    var raw: interface{}[] = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
    if (raw != null) {
        return org.kevoree.modeling.api.data.JsonRaw.encode(raw, this._uuid, this._metaClass, true);
    } else {
        return "";
    }
}

public toString(): string {
    return this.toJSON();
}

public traces(request: org.kevoree.modeling.api.TraceRequest): org.kevoree.modeling.api.trace.ModelTrace[] {
    if (!org.kevoree.modeling.api.util.Checker.isDefined(request)) {
        return null;
    }
    var traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
    if (org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_ONLY.equals(request) || org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
        for (var i: int = 0; i < this.metaClass().metaAttributes().length; i++) {
            var current: org.kevoree.modeling.api.meta.MetaAttribute = this.metaClass().metaAttributes()[i];
            var payload: interface{} = this.get(current);
            if (payload != null) {
                traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(this._uuid, current, payload));
            }
        }
    }
    if (org.kevoree.modeling.api.TraceRequest.REFERENCES_ONLY.equals(request) || org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
        for (var i: int = 0; i < this.metaClass().metaReferences().length; i++) {
            var ref: org.kevoree.modeling.api.meta.MetaReference = this.metaClass().metaReferences()[i];
            var raw: interface{}[] = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
            var o: interface{} = null;
            if (raw != null) {
                o = raw[ref.index()];
            }
            if (o instanceof java.util.Set) {
                var contents: java.util.Set<int64> = o.(java.util.Set<int64>);
                var contentsArr: int64[] = contents.toArray(new Array());
                for (var j: int = 0; j < contentsArr.length; j++) {
                    traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(this._uuid, ref, contentsArr[j]));
                }
            } else {
                if (o != null) {
                    traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(this._uuid, ref, o.(int64)));
                }
            }
        }
    }
    return traces.toArray(new Array());
}

public inbounds(callback: (p : org.kevoree.modeling.api.KObject[]) => void): void {
    var rawPayload: interface{}[] = this.view().universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
    if (rawPayload != null) {
        var payload: interface{} = rawPayload[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
        if (payload != null) {
            var inboundsKeys: java.util.Set<int64> = payload.(java.util.Set<int64>);
            var keysArr: int64[] = inboundsKeys.toArray(new Array());
            this._view.lookupAll(keysArr, callback);
        } else {
            callback(new Array());
        }
    } else {
        callback(new Array());
    }
}

public set_parent(p_parentKID: int64, p_metaReference: org.kevoree.modeling.api.meta.MetaReference): void {
    var raw: interface{}[] = this._view.universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
    if (raw != null) {
        raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX] = p_parentKID;
        raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX] = p_metaReference;
    }
}

public equals(obj: interface{}): bool {
    if (!(obj instanceof org.kevoree.modeling.api.abs.AbstractKObject)) {
        return false;
    } else {
        var casted: org.kevoree.modeling.api.abs.AbstractKObject = obj.(org.kevoree.modeling.api.abs.AbstractKObject);
        return (casted.uuid() == this._uuid) && this._view.equals(casted._view);
    }
}

public hashCode(): int {
    var hashString: string = this.uuid() + "-" + this.view().now() + "-" + this.view().universe().key();
    return hashString.hashCode();
}

public diff(target: org.kevoree.modeling.api.KObject, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
    org.kevoree.modeling.api.operation.DefaultModelCompare.diff(this, target, callback);
}

public merge(target: org.kevoree.modeling.api.KObject, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
    org.kevoree.modeling.api.operation.DefaultModelCompare.merge(this, target, callback);
}

public intersection(target: org.kevoree.modeling.api.KObject, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
    org.kevoree.modeling.api.operation.DefaultModelCompare.intersection(this, target, callback);
}

public jump<U extends org.kevoree.modeling.api.KObject> (time: int64, callback: (p : U) => void): void {
    this.view().universe().time(time).lookup(this._uuid,  (kObject : org.kevoree.modeling.api.KObject) => {
        if (callback != null) {
            try {
                callback(kObject.(U));
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Throwable) {
                    var e: java.lang.Throwable = <java.lang.Throwable>$ex$;
                    e.printStackTrace();
                    callback(null);
                }
             }
        }
    });
}

public internal_transpose_ref(p: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.meta.MetaReference {
    if (!org.kevoree.modeling.api.util.Checker.isDefined(p)) {
        return null;
    } else {
        return this.metaClass().metaReference(p.metaName());
    }
}

public internal_transpose_att(p: org.kevoree.modeling.api.meta.MetaAttribute): org.kevoree.modeling.api.meta.MetaAttribute {
    if (!org.kevoree.modeling.api.util.Checker.isDefined(p)) {
        return null;
    } else {
        return this.metaClass().metaAttribute(p.metaName());
    }
}

public internal_transpose_op(p: org.kevoree.modeling.api.meta.MetaOperation): org.kevoree.modeling.api.meta.MetaOperation {
    if (!org.kevoree.modeling.api.util.Checker.isDefined(p)) {
        return null;
    } else {
        return this.metaClass().metaOperation(p.metaName());
    }
}

public traverse(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.traversal.KTraversal {
    return new org.kevoree.modeling.api.traversal.DefaultKTraversal(this, p_metaReference, null);
}

public traverseQuery(metaReferenceQuery: string): org.kevoree.modeling.api.traversal.KTraversal {
    return new org.kevoree.modeling.api.traversal.DefaultKTraversal(this, null, metaReferenceQuery);
}

public referencesWith(o: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.meta.MetaReference[] {
    if (org.kevoree.modeling.api.util.Checker.isDefined(o)) {
        var raw: interface{}[] = this._view.universe().model().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
        if (raw != null) {
            var allReferences: org.kevoree.modeling.api.meta.MetaReference[] = this.metaClass().metaReferences();
            var selected: java.util.List<org.kevoree.modeling.api.meta.MetaReference> = new java.util.ArrayList<org.kevoree.modeling.api.meta.MetaReference>();
            for (var i: int = 0; i < allReferences.length; i++) {
                var rawI: interface{} = raw[allReferences[i].index()];
                if (rawI instanceof java.util.Set) {
                    try {
                        var castedSet: java.util.Set<int64> = rawI.(java.util.Set<int64>);
                        if (castedSet.contains(o.uuid())) {
                            selected.add(allReferences[i]);
                        }
                    } catch ($ex$) {
                        if ($ex$ instanceof java.lang.Exception) {
                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                            e.printStackTrace();
                        }
                     }
                } else {
                    if (rawI != null) {
                        try {
                            var casted: int64 = rawI.(int64);
                            if (casted == o.uuid()) {
                                selected.add(allReferences[i]);
                            }
                        } catch ($ex$) {
                            if ($ex$ instanceof java.lang.Exception) {
                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                e.printStackTrace();
                            }
                         }
                    }
                }
            }
            return selected.toArray(new Array());
        } else {
            return new Array();
        }
    } else {
        return new Array();
    }
}

public taskVisit(p_visitor: (p : org.kevoree.modeling.api.KObject) => org.kevoree.modeling.api.VisitResult, p_request: org.kevoree.modeling.api.VisitRequest): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.visit(p_visitor, task.initCallback(), p_request);
    return task;
}

public taskDelete(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.delete(task.initCallback());
    return task;
}

public taskParent(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.parent(task.initCallback());
    return task;
}

public taskSelect(p_query: string): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.select(p_query, task.initCallback());
    return task;
}

public taskAll(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.all(p_metaReference, task.initCallback());
    return task;
}

public taskInbounds(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.inbounds(task.initCallback());
    return task;
}

public taskDiff(p_target: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.diff(p_target, task.initCallback());
    return task;
}

public taskMerge(p_target: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.merge(p_target, task.initCallback());
    return task;
}

public taskIntersection(p_target: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.intersection(p_target, task.initCallback());
    return task;
}

public taskJump<U extends org.kevoree.modeling.api.KObject> (p_time: int64): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.jump(p_time, task.initCallback());
    return task;
}

public taskPath(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.path(task.initCallback());
    return task;
}

public taskInferChildren(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.inferChildren(task.initCallback());
    return task;
}

public inferChildren(p_callback: (p : org.kevoree.modeling.api.KInfer[]) => void): void {
}


type AbstractKObjectInfer struct<A> extends org.kevoree.modeling.api.abs.AbstractKObject implements org.kevoree.modeling.api.KInfer {

}
constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: int64, p_timeTree: org.kevoree.modeling.api.time.TimeTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
    super(p_view, p_uuid, p_timeTree, p_metaClass);
}

public type(): org.kevoree.modeling.api.meta.Meta {
    return null;
}

public trainingSet(): org.kevoree.modeling.api.KObject[] {
    return new Array();
}

public train(trainingSet: org.kevoree.modeling.api.KObject[], callback: (p : java.lang.Throwable) => void): void {
}

public learn(): void {
}

public infer(origin: org.kevoree.modeling.api.KObject): interface{} {
    return null;
}


type AbstractKTask struct<A> implements org.kevoree.modeling.api.KCurrentTask<any> {

    private _isDone: bool = false;
    public _isReady: bool = false;
    private _nbRecResult: int = 0;
    private _nbExpectedResult: int = 0;
    private _results: java.util.Map<org.kevoree.modeling.api.KTask<any>, interface{}> = new java.util.HashMap<org.kevoree.modeling.api.KTask<any>, interface{}>();
    private _previousTasks: java.util.Set<org.kevoree.modeling.api.KTask<any>> = new java.util.HashSet<org.kevoree.modeling.api.KTask<any>>();
    private _nextTasks: java.util.Set<org.kevoree.modeling.api.KTask<any>> = new java.util.HashSet<org.kevoree.modeling.api.KTask<any>>();
    private _job: (p : org.kevoree.modeling.api.KCurrentTask<any>) => void;
    private _result: A = null;
}
public setDoneOrRegister(next: org.kevoree.modeling.api.KTask<any>): bool {
    if (next != null) {
        this._nextTasks.add(next);
        return this._isDone;
    } else {
        this._isDone = true;
        var childrenTasks: org.kevoree.modeling.api.KTask<any>[] = this._nextTasks.toArray(new Array());
        for (var i: int = 0; i < childrenTasks.length; i++) {
            (childrenTasks[i].(org.kevoree.modeling.api.abs.AbstractKTask<any>)).informParentEnd(this);
        }
        return this._isDone;
    }
}

private informParentEnd(end: org.kevoree.modeling.api.KTask<any>): void {
    if (end == null) {
        this._nbRecResult = this._nbRecResult + this._nbExpectedResult;
    } else {
        if (end != this) {
            var castedEnd: org.kevoree.modeling.api.abs.AbstractKTask<any> = end.(org.kevoree.modeling.api.abs.AbstractKTask<any>);
            var keys: org.kevoree.modeling.api.KTask<any>[] = castedEnd._results.keySet().toArray(new Array()).(org.kevoree.modeling.api.KTask<any>[]);
            for (var i: int = 0; i < keys.length; i++) {
                this._results.put(keys[i], castedEnd._results.get(keys[i]));
            }
            this._results.put(end, castedEnd._result);
            this._nbRecResult--;
        }
    }
    if (this._nbRecResult == 0 && this._isReady) {
        if (this._job != null) {
            this._job(this);
        }
        this.setDoneOrRegister(null);
    }
}

public wait(p_previous: org.kevoree.modeling.api.KTask<any>): void {
    if (p_previous != this) {
        this._previousTasks.add(p_previous);
        if (!(p_previous.(org.kevoree.modeling.api.abs.AbstractKTask<any>)).setDoneOrRegister(this)) {
            this._nbExpectedResult++;
        } else {
            var castedEnd: org.kevoree.modeling.api.abs.AbstractKTask<any> = p_previous.(org.kevoree.modeling.api.abs.AbstractKTask<any>);
            var keys: org.kevoree.modeling.api.KTask<any>[] = castedEnd._results.keySet().toArray(new Array()).(org.kevoree.modeling.api.KTask<any>[]);
            for (var i: int = 0; i < keys.length; i++) {
                this._results.put(keys[i], castedEnd._results.get(keys[i]));
            }
            this._results.put(p_previous, castedEnd._result);
        }
    }
}

public ready(): void {
    if (!this._isReady) {
        this._isReady = true;
        this.informParentEnd(null);
    }
}

public results(): java.util.Map<org.kevoree.modeling.api.KTask<any>, interface{}> {
    return this._results;
}

public setResult(p_result: A): void {
    this._result = p_result;
}

public getResult(): A {
    if (this._isDone) {
        return this._result;
    } else {
        throw new java.lang.Exception("Task is not executed yet !");
    }
}

public isDone(): bool {
    return this._isDone;
}

public setJob(p_kjob: (p : org.kevoree.modeling.api.KCurrentTask<any>) => void): void {
    this._job = p_kjob;
}


type AbstractKTaskWrapper struct<A> extends org.kevoree.modeling.api.abs.AbstractKTask<any> {

    private _callback: (p : A) => void = null;
}
constructor() {
    super();
    var selfPointer: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = this;
    this._callback =  (a : A) => {
        selfPointer._isReady = true;
        selfPointer.setResult(a);
        selfPointer.setDoneOrRegister(null);
    };
}

public initCallback(): (p : A) => void {
    return this._callback;
}

public wait(previous: org.kevoree.modeling.api.KTask<any>): void {
    throw new java.lang.RuntimeException("Wait action is forbidden on wrapped tasks, please create a sub task");
}

public setJob(p_kjob: (p : org.kevoree.modeling.api.KCurrentTask<any>) => void): void {
    throw new java.lang.RuntimeException("setJob action is forbidden on wrapped tasks, please create a sub task");
}

public ready(): void {
}


type AbstractKUniverse struct<A extends org.kevoree.modeling.api.KView, B extends org.kevoree.modeling.api.KUniverse<any, any, any>, C extends org.kevoree.modeling.api.KModel<any>> implements org.kevoree.modeling.api.KUniverse<any, any, any> {

    private _model: org.kevoree.modeling.api.KModel<any>;
    private _key: int64;
}
constructor(p_model: org.kevoree.modeling.api.KModel<any>, p_key: int64) {
    this._model = p_model;
    this._key = p_key;
}

public key(): int64 {
    return this._key;
}

public model(): C {
    return this._model.(C);
}

public save(callback: (p : java.lang.Throwable) => void): void {
    this.model().storage().save(this, callback);
}

public unload(callback: (p : java.lang.Throwable) => void): void {
    this.model().storage().saveUnload(this, callback);
}

public delete(callback: (p : java.lang.Throwable) => void): void {
    this.model().storage().delete(this, callback);
}

public discard(callback: (p : java.lang.Throwable) => void): void {
    this.model().storage().discard(this, callback);
}

public time(timePoint: int64): A {
    return this.internal_create(timePoint);
}

public listen(listener: (p : org.kevoree.modeling.api.KEvent) => void): void {
    this.model().storage().eventBroker().registerListener(this, listener, null);
}

public listenAllTimes(target: org.kevoree.modeling.api.KObject, listener: (p : org.kevoree.modeling.api.KEvent) => void): void {
    this.model().storage().eventBroker().registerListener(this, listener, target);
}

public internal_create(timePoint: int64): A {
    throw "Abstract method";
}

public equals(obj: interface{}): bool {
    if (!(obj instanceof org.kevoree.modeling.api.abs.AbstractKUniverse)) {
        return false;
    } else {
        var casted: org.kevoree.modeling.api.abs.AbstractKUniverse<any, any, any> = obj.(org.kevoree.modeling.api.abs.AbstractKUniverse<any, any, any>);
        return casted._key == this._key;
    }
}

public origin(callback: (p : B) => void): void {
}

public split(callback: (p : B) => void): void {
}

public descendants(callback: (p : B[]) => void): void {
}

public taskSplit(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.split(task.initCallback());
    return task;
}

public taskOrigin(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.origin(task.initCallback());
    return task;
}

public taskDescendants(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.descendants(task.initCallback());
    return task;
}

public taskSave(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.save(task.initCallback());
    return task;
}

public taskUnload(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.unload(task.initCallback());
    return task;
}

public taskDelete(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.delete(task.initCallback());
    return task;
}

public taskDiscard(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.discard(task.initCallback());
    return task;
}


type AbstractKView struct implements org.kevoree.modeling.api.KView {

    private _now: int64;
    private _universe: org.kevoree.modeling.api.KUniverse<any, any, any>;
}
constructor(p_now: int64, p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>) {
    this._now = p_now;
    this._universe = p_universe;
}

public now(): int64 {
    return this._now;
}

public universe(): org.kevoree.modeling.api.KUniverse<any, any, any> {
    return this._universe;
}

public createFQN(metaClassName: string): org.kevoree.modeling.api.KObject {
    return this.create(this.universe().model().metaModel().metaClass(metaClassName));
}

public setRoot(elem: org.kevoree.modeling.api.KObject, callback: (p : java.lang.Throwable) => void): void {
    (elem.(org.kevoree.modeling.api.abs.AbstractKObject)).set_parent(null, null);
    (elem.(org.kevoree.modeling.api.abs.AbstractKObject)).setRoot(true);
    this.universe().model().storage().setRoot(elem, callback);
}

public select(query: string, callback: (p : org.kevoree.modeling.api.KObject[]) => void): void {
    if (callback == null) {
        return;
    }
    if (query == null) {
        callback(new Array());
        return;
    }
    this.universe().model().storage().getRoot(this,  (rootObj : org.kevoree.modeling.api.KObject) => {
        if (rootObj == null) {
            callback(new Array());
        } else {
            var cleanedQuery: string = query;
            if (cleanedQuery.equals("/")) {
                var param: org.kevoree.modeling.api.KObject[] = new Array();
                param[0] = rootObj;
                callback(param);
            } else {
                if (cleanedQuery.startsWith("/")) {
                    cleanedQuery = cleanedQuery.substring(1);
                }
                var roots: org.kevoree.modeling.api.KObject[] = new Array();
                roots[0] = rootObj;
                org.kevoree.modeling.api.traversal.selector.KSelector.select(rootObj.view(), roots, cleanedQuery, callback);
            }
        }
    });
}

public lookup(kid: int64, callback: (p : org.kevoree.modeling.api.KObject) => void): void {
    this.universe().model().storage().lookup(this, kid, callback);
}

public lookupAll(keys: int64[], callback: (p : org.kevoree.modeling.api.KObject[]) => void): void {
    this.universe().model().storage().lookupAll(this, keys, callback);
}

public createProxy(clazz: org.kevoree.modeling.api.meta.MetaClass, timeTree: org.kevoree.modeling.api.time.TimeTree, key: int64): org.kevoree.modeling.api.KObject {
    return this.internalCreate(clazz, timeTree, key);
}

public create(clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject {
    if (!org.kevoree.modeling.api.util.Checker.isDefined(clazz)) {
        return null;
    }
    var newObj: org.kevoree.modeling.api.KObject = this.internalCreate(clazz, new org.kevoree.modeling.api.time.DefaultTimeTree().insert(this.now()), this.universe().model().storage().nextObjectKey());
    if (newObj != null) {
        this.universe().model().storage().initKObject(newObj, this);
        this.universe().model().storage().eventBroker().notify(new org.kevoree.modeling.api.event.DefaultKEvent(org.kevoree.modeling.api.KActionType.NEW, newObj, clazz, null));
    }
    return newObj;
}

public listen(listener: (p : org.kevoree.modeling.api.KEvent) => void): void {
    this.universe().model().storage().eventBroker().registerListener(this, listener, null);
}

public internalCreate(clazz: org.kevoree.modeling.api.meta.MetaClass, timeTree: org.kevoree.modeling.api.time.TimeTree, key: int64): org.kevoree.modeling.api.KObject {
    throw "Abstract method";
}

public json(): org.kevoree.modeling.api.ModelFormat {
    return new org.kevoree.modeling.api.json.JsonFormat(this);
}

public xmi(): org.kevoree.modeling.api.ModelFormat {
    return new org.kevoree.modeling.api.xmi.XmiFormat(this);
}

public equals(obj: interface{}): bool {
    if (!org.kevoree.modeling.api.util.Checker.isDefined(obj)) {
        return false;
    }
    if (!(obj instanceof org.kevoree.modeling.api.abs.AbstractKView)) {
        return false;
    } else {
        var casted: org.kevoree.modeling.api.abs.AbstractKView = obj.(org.kevoree.modeling.api.abs.AbstractKView);
        return (casted._now == this._now) && this._universe.equals(casted._universe);
    }
}

public taskLookup(key: int64): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.lookup(key, task.initCallback());
    return task;
}

public taskLookupAll(keys: int64[]): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.lookupAll(keys, task.initCallback());
    return task;
}

public taskSelect(query: string): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.select(query, task.initCallback());
    return task;
}

public taskSetRoot(elem: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.setRoot(elem, task.initCallback());
    return task;
}


type AbstractMetaAttribute struct implements org.kevoree.modeling.api.meta.MetaAttribute {

    private _name: string;
    private _index: int;
    private _precision: double;
    private _key: bool;
    private _metaType: org.kevoree.modeling.api.KMetaType;
    private _extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation;
}
public metaType(): org.kevoree.modeling.api.KMetaType {
    return this._metaType;
}

public index(): int {
    return this._index;
}

public metaName(): string {
    return this._name;
}

public precision(): double {
    return this._precision;
}

public key(): bool {
    return this._key;
}

public strategy(): org.kevoree.modeling.api.extrapolation.Extrapolation {
    return this._extrapolation;
}

public setExtrapolation(extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation): void {
    this._extrapolation = extrapolation;
}

constructor(p_name: string, p_index: int, p_precision: double, p_key: bool, p_metaType: org.kevoree.modeling.api.KMetaType, p_extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation) {
    this._name = p_name;
    this._index = p_index;
    this._precision = p_precision;
    this._key = p_key;
    this._metaType = p_metaType;
    this._extrapolation = p_extrapolation;
}


type AbstractMetaClass struct implements org.kevoree.modeling.api.meta.MetaClass {

    private _name: string;
    private _index: int;
    private _atts: org.kevoree.modeling.api.meta.MetaAttribute[];
    private _refs: org.kevoree.modeling.api.meta.MetaReference[];
    private _operations: org.kevoree.modeling.api.meta.MetaOperation[];
    private _atts_indexes: java.util.HashMap<string, int> = new java.util.HashMap<string, int>();
    private _refs_indexes: java.util.HashMap<string, int> = new java.util.HashMap<string, int>();
    private _ops_indexes: java.util.HashMap<string, int> = new java.util.HashMap<string, int>();
}
public index(): int {
    return this._index;
}

public metaName(): string {
    return this._name;
}

constructor(p_name: string, p_index: int) {
    this._name = p_name;
    this._index = p_index;
}

public init(p_atts: org.kevoree.modeling.api.meta.MetaAttribute[], p_refs: org.kevoree.modeling.api.meta.MetaReference[], p_operations: org.kevoree.modeling.api.meta.MetaOperation[]): void {
    this._atts = p_atts;
    for (var i: int = 0; i < this._atts.length; i++) {
        this._atts_indexes.put(this._atts[i].metaName(), i);
    }
    this._refs = p_refs;
    for (var i: int = 0; i < this._refs.length; i++) {
        this._refs_indexes.put(this._refs[i].metaName(), i);
    }
    this._operations = p_operations;
    for (var i: int = 0; i < this._operations.length; i++) {
        this._ops_indexes.put(this._operations[i].metaName(), i);
    }
}

public metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[] {
    return this._atts;
}

public metaReferences(): org.kevoree.modeling.api.meta.MetaReference[] {
    return this._refs;
}

public metaOperations(): org.kevoree.modeling.api.meta.MetaOperation[] {
    return this._operations;
}

public metaAttribute(name: string): org.kevoree.modeling.api.meta.MetaAttribute {
    var resolved: int = this._atts_indexes.get(name);
    if (resolved == null) {
        return null;
    } else {
        return this._atts[resolved];
    }
}

public metaReference(name: string): org.kevoree.modeling.api.meta.MetaReference {
    var resolved: int = this._refs_indexes.get(name);
    if (resolved == null) {
        return null;
    } else {
        return this._refs[resolved];
    }
}

public metaOperation(name: string): org.kevoree.modeling.api.meta.MetaOperation {
    var resolved: int = this._ops_indexes.get(name);
    if (resolved == null) {
        return null;
    } else {
        return this._operations[resolved];
    }
}


type AbstractMetaModel struct implements org.kevoree.modeling.api.meta.MetaModel {

    private _name: string;
    private _index: int;
    private _metaClasses: org.kevoree.modeling.api.meta.MetaClass[];
    private _metaClasses_indexes: java.util.HashMap<string, int> = new java.util.HashMap<string, int>();
}
public index(): int {
    return this._index;
}

public metaName(): string {
    return this._name;
}

constructor(p_name: string, p_index: int) {
    this._name = p_name;
    this._index = p_index;
}

public metaClasses(): org.kevoree.modeling.api.meta.MetaClass[] {
    return this._metaClasses;
}

public metaClass(name: string): org.kevoree.modeling.api.meta.MetaClass {
    var resolved: int = this._metaClasses_indexes.get(name);
    if (resolved == null) {
        return null;
    } else {
        return this._metaClasses[resolved];
    }
}

public init(p_metaClasses: org.kevoree.modeling.api.meta.MetaClass[]): void {
    this._metaClasses_indexes.clear();
    this._metaClasses = p_metaClasses;
    for (var i: int = 0; i < this._metaClasses.length; i++) {
        this._metaClasses_indexes.put(this._metaClasses[i].metaName(), i);
    }
}


type AbstractMetaOperation struct implements org.kevoree.modeling.api.meta.MetaOperation {

    private _name: string;
    private _index: int;
    private _lazyMetaClass: () => org.kevoree.modeling.api.meta.Meta;
}
public index(): int {
    return this._index;
}

public metaName(): string {
    return this._name;
}

constructor(p_name: string, p_index: int, p_lazyMetaClass: () => org.kevoree.modeling.api.meta.Meta) {
    this._name = p_name;
    this._index = p_index;
    this._lazyMetaClass = p_lazyMetaClass;
}

public origin(): org.kevoree.modeling.api.meta.MetaClass {
    if (this._lazyMetaClass != null) {
        return this._lazyMetaClass().(org.kevoree.modeling.api.meta.MetaClass);
    }
    return null;
}


type AbstractMetaReference struct implements org.kevoree.modeling.api.meta.MetaReference {

    private _name: string;
    private _index: int;
    private _contained: bool;
    private _single: bool;
    private _lazyMetaType: () => org.kevoree.modeling.api.meta.Meta;
    private _lazyMetaOpposite: () => org.kevoree.modeling.api.meta.Meta;
    private _lazyMetaOrigin: () => org.kevoree.modeling.api.meta.Meta;
}
public single(): bool {
    return this._single;
}

public metaType(): org.kevoree.modeling.api.meta.MetaClass {
    if (this._lazyMetaType != null) {
        return this._lazyMetaType().(org.kevoree.modeling.api.meta.MetaClass);
    } else {
        return null;
    }
}

public opposite(): org.kevoree.modeling.api.meta.MetaReference {
    if (this._lazyMetaOpposite != null) {
        return this._lazyMetaOpposite().(org.kevoree.modeling.api.meta.MetaReference);
    }
    return null;
}

public origin(): org.kevoree.modeling.api.meta.MetaClass {
    if (this._lazyMetaOrigin != null) {
        return this._lazyMetaOrigin().(org.kevoree.modeling.api.meta.MetaClass);
    }
    return null;
}

public index(): int {
    return this._index;
}

public metaName(): string {
    return this._name;
}

public contained(): bool {
    return this._contained;
}

constructor(p_name: string, p_index: int, p_contained: bool, p_single: bool, p_lazyMetaType: () => org.kevoree.modeling.api.meta.Meta, p_lazyMetaOpposite: () => org.kevoree.modeling.api.meta.Meta, p_lazyMetaOrigin: () => org.kevoree.modeling.api.meta.Meta) {
    this._name = p_name;
    this._index = p_index;
    this._contained = p_contained;
    this._single = p_single;
    this._lazyMetaType = p_lazyMetaType;
    this._lazyMetaOpposite = p_lazyMetaOpposite;
    this._lazyMetaOrigin = p_lazyMetaOrigin;
}


type LazyResolver interface {
    meta() : org.kevoree.modeling.api.meta.Meta
}
type AccessMode struct {

    public static READ: AccessMode = new AccessMode();
    public static WRITE: AccessMode = new AccessMode();
    public static DELETE: AccessMode = new AccessMode();
}
public equals(other: any): boolean {
    return this == other;
}
public static _AccessModeVALUES : AccessMode[] = [
    AccessMode.READ
    ,AccessMode.WRITE
    ,AccessMode.DELETE
];
public static values():AccessMode[]{
    return AccessMode._AccessModeVALUES;
}

type CacheEntry struct {

    public timeTree: org.kevoree.modeling.api.time.TimeTree;
    public metaClass: org.kevoree.modeling.api.meta.MetaClass;
    public raw: interface{}[];
}

type DefaultKStore struct implements org.kevoree.modeling.api.data.KStore {

    public static KEY_SEP: char = ',';
    private _db: org.kevoree.modeling.api.data.KDataBase;
    private caches: java.util.Map<int64, org.kevoree.modeling.api.data.cache.UniverseCache> = new java.util.HashMap<int64, org.kevoree.modeling.api.data.cache.UniverseCache>();
    private _eventBroker: org.kevoree.modeling.api.event.KEventBroker;
    private _operationManager: org.kevoree.modeling.api.util.KOperationManager;
    private _scheduler: org.kevoree.modeling.api.KScheduler;
    private _objectKeyCalculator: org.kevoree.modeling.api.data.KeyCalculator = null;
    private _dimensionKeyCalculator: org.kevoree.modeling.api.data.KeyCalculator = null;
    private static OUT_OF_CACHE_MESSAGE: string = "KMF Error: your object is out of cache, you probably kept an old reference. Please reload it with a lookup";
    private static DELETED_MESSAGE: string = "KMF Error: your object has been deleted. Please do not use object pointer after a call to delete method";
    private isConnected: bool = false;
    private static UNIVERSE_NOT_CONNECTED_ERROR: string = "Please connect your model prior to create a universe or an object";
    private static INDEX_RESOLVED_DIM: int = 0;
    private static INDEX_RESOLVED_TIME: int = 1;
    private static INDEX_RESOLVED_TIMETREE: int = 2;
}
constructor() {
    this._db = new org.kevoree.modeling.api.data.MemoryKDataBase();
    this._eventBroker = new org.kevoree.modeling.api.event.DefaultKBroker();
    this._operationManager = new org.kevoree.modeling.api.util.DefaultOperationManager(this);
    this._scheduler = new org.kevoree.modeling.api.scheduler.DirectScheduler();
}

public connect(callback: (p : java.lang.Throwable) => void): void {
    if (this.isConnected) {
        if (callback != null) {
            callback(null);
        }
        return;
    }
    if (this._db == null || this._eventBroker == null) {
        if (callback != null) {
            callback(new java.lang.Exception("Please attach a KDataBase AND a KBroker first !"));
        }
    } else {
        this._eventBroker.connect( (throwable : java.lang.Throwable) => {
            if (throwable == null) {
                this._db.connect( (throwable : java.lang.Throwable) => {
                    if (throwable == null) {
                        var keys: string[] = new Array();
                        keys[0] = this.keyLastPrefix();
                        this._db.get(keys,  (strings : string[], error : java.lang.Throwable) => {
                            if (error != null) {
                                if (callback != null) {
                                    callback(error);
                                }
                            } else {
                                if (strings.length == 1) {
                                    try {
                                        var payloadPrefix: string = strings[0];
                                        if (payloadPrefix == null || payloadPrefix.equals("")) {
                                            payloadPrefix = "0";
                                        }
                                        var newPrefix: java.lang.Short = java.lang.Short.parseShort(payloadPrefix);
                                        var keys2: string[] = new Array();
                                        keys2[0] = this.keyLastDimIndex(payloadPrefix);
                                        keys2[1] = this.keyLastObjIndex(payloadPrefix);
                                        this._db.get(keys2,  (strings : string[], error : java.lang.Throwable) => {
                                            if (error != null) {
                                                if (callback != null) {
                                                    callback(error);
                                                }
                                            } else {
                                                if (strings.length == 2) {
                                                    try {
                                                        var dimIndexPayload: string = strings[0];
                                                        if (dimIndexPayload == null || dimIndexPayload.equals("")) {
                                                            dimIndexPayload = "0";
                                                        }
                                                        var objIndexPayload: string = strings[1];
                                                        if (objIndexPayload == null || objIndexPayload.equals("")) {
                                                            objIndexPayload = "0";
                                                        }
                                                        var newDimIndex: int64 = java.lang.Long.parseLong(dimIndexPayload);
                                                        var newObjIndex: int64 = java.lang.Long.parseLong(objIndexPayload);
                                                        var keys3: string[][] = new Array(new Array());
                                                        var payloadKeys3: string[] = new Array();
                                                        payloadKeys3[0] = this.keyLastPrefix();
                                                        if (newPrefix == java.lang.Short.MAX_VALUE) {
                                                            payloadKeys3[1] = "" + java.lang.Short.MIN_VALUE;
                                                        } else {
                                                            payloadKeys3[1] = "" + (newPrefix + 1);
                                                        }
                                                        keys3[0] = payloadKeys3;
                                                        this._db.put(keys3,  (throwable : java.lang.Throwable) => {
                                                            this._dimensionKeyCalculator = new org.kevoree.modeling.api.data.KeyCalculator(newPrefix, newDimIndex);
                                                            this._objectKeyCalculator = new org.kevoree.modeling.api.data.KeyCalculator(newPrefix, newObjIndex);
                                                            this.isConnected = true;
                                                            if (callback != null) {
                                                                callback(null);
                                                            }
                                                        });
                                                    } catch ($ex$) {
                                                        if ($ex$ instanceof java.lang.Exception) {
                                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                            if (callback != null) {
                                                                callback(e);
                                                            }
                                                        }
                                                     }
                                                } else {
                                                    if (callback != null) {
                                                        callback(new java.lang.Exception("Error while connecting the KDataStore..."));
                                                    }
                                                }
                                            }
                                        });
                                    } catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                            if (callback != null) {
                                                callback(e);
                                            }
                                        }
                                     }
                                } else {
                                    if (callback != null) {
                                        callback(new java.lang.Exception("Error while connecting the KDataStore..."));
                                    }
                                }
                            }
                        });
                    } else {
                        callback(throwable);
                    }
                });
            } else {
                callback(throwable);
            }
        });
    }
}

public close(callback: (p : java.lang.Throwable) => void): void {
    this.isConnected = false;
    if (this._db != null) {
        this._db.close( (throwable : java.lang.Throwable) => {
            if (this._eventBroker != null) {
                this._eventBroker.close(callback);
            } else {
                callback(null);
            }
        });
    }
}

private keyTree(dim: int64, key: int64): string {
    return "" + dim + DefaultKStore.KEY_SEP + key;
}

private keyRoot(dim: int64): string {
    return "" + dim + DefaultKStore.KEY_SEP + "root";
}

private keyRootTree(dim: org.kevoree.modeling.api.KUniverse<any, any, any>): string {
    return "" + dim.key() + DefaultKStore.KEY_SEP + "root";
}

private keyPayload(dim: int64, time: int64, key: int64): string {
    return "" + dim + DefaultKStore.KEY_SEP + time + DefaultKStore.KEY_SEP + key;
}

private keyLastPrefix(): string {
    return "ring_prefix";
}

private keyLastDimIndex(prefix: string): string {
    return "index_dim_" + prefix;
}

private keyLastObjIndex(prefix: string): string {
    return "index_obj_" + prefix;
}

public nextUniverseKey(): int64 {
    if (this._dimensionKeyCalculator == null) {
        throw new java.lang.RuntimeException(DefaultKStore.UNIVERSE_NOT_CONNECTED_ERROR);
    }
    return this._dimensionKeyCalculator.nextKey();
}

public nextObjectKey(): int64 {
    if (this._objectKeyCalculator == null) {
        throw new java.lang.RuntimeException(DefaultKStore.UNIVERSE_NOT_CONNECTED_ERROR);
    }
    return this._objectKeyCalculator.nextKey();
}

public initUniverse(p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>): void {
}

public initKObject(obj: org.kevoree.modeling.api.KObject, originView: org.kevoree.modeling.api.KView): void {
    this.write_tree(obj.universe().key(), obj.uuid(), obj.timeTree());
    var cacheEntry: org.kevoree.modeling.api.data.CacheEntry = new org.kevoree.modeling.api.data.CacheEntry();
    cacheEntry.raw = new Array();
    cacheEntry.raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = true;
    cacheEntry.metaClass = obj.metaClass();
    cacheEntry.timeTree = obj.timeTree();
    this.write_cache(obj.universe().key(), obj.now(), obj.uuid(), cacheEntry);
}

public raw(origin: org.kevoree.modeling.api.KObject, accessMode: org.kevoree.modeling.api.data.AccessMode): interface{}[] {
    var resolvedTime: int64 = origin.timeTree().resolve(origin.now());
    var needCopy: bool = accessMode.equals(org.kevoree.modeling.api.data.AccessMode.WRITE) && (resolvedTime != origin.now());
    var universeCache: org.kevoree.modeling.api.data.cache.UniverseCache = this.caches.get(origin.universe().key());
    if (universeCache == null) {
        System.err.println(DefaultKStore.OUT_OF_CACHE_MESSAGE);
    }
    var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = universeCache.timesCaches.get(resolvedTime);
    if (timeCache == null) {
        System.err.println(DefaultKStore.OUT_OF_CACHE_MESSAGE);
        return null;
    }
    var entry: org.kevoree.modeling.api.data.CacheEntry = timeCache.payload_cache.get(origin.uuid());
    if (entry == null) {
        System.err.println(DefaultKStore.OUT_OF_CACHE_MESSAGE);
        return null;
    }
    var payload: interface{}[] = entry.raw;
    if (accessMode.equals(org.kevoree.modeling.api.data.AccessMode.DELETE)) {
        entry.timeTree.delete(origin.now());
        entry.raw = null;
        return payload;
    }
    if (payload == null) {
        System.err.println(DefaultKStore.DELETED_MESSAGE);
        return null;
    } else {
        if (!needCopy) {
            if (accessMode.equals(org.kevoree.modeling.api.data.AccessMode.WRITE)) {
                payload[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = true;
            }
            return payload;
        } else {
            var cloned: interface{}[] = new Array();
            for (var i: int = 0; i < payload.length; i++) {
                var resolved: interface{} = payload[i];
                if (resolved != null) {
                    if (resolved instanceof java.util.Set) {
                        var clonedSet: java.util.HashSet<int64> = new java.util.HashSet<int64>();
                        clonedSet.addAll(resolved.(java.util.Set<int64>));
                        cloned[i] = clonedSet;
                    } else {
                        if (resolved instanceof java.util.List) {
                            var clonedList: java.util.ArrayList<int64> = new java.util.ArrayList<int64>();
                            clonedList.addAll(resolved.(java.util.List<int64>));
                            cloned[i] = clonedList;
                        } else {
                            cloned[i] = resolved;
                        }
                    }
                }
            }
            cloned[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = true;
            var clonedEntry: org.kevoree.modeling.api.data.CacheEntry = new org.kevoree.modeling.api.data.CacheEntry();
            clonedEntry.raw = cloned;
            clonedEntry.metaClass = entry.metaClass;
            clonedEntry.timeTree = entry.timeTree;
            entry.timeTree.insert(origin.now());
            this.write_cache(origin.universe().key(), origin.now(), origin.uuid(), clonedEntry);
            return clonedEntry.raw;
        }
    }
}

public discard(p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p : java.lang.Throwable) => void): void {
    this.caches.remove(p_universe.key());
    if (callback != null) {
        callback(null);
    }
}

public delete(p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p : java.lang.Throwable) => void): void {
    throw new java.lang.RuntimeException("Not implemented yet !");
}

public save(p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p : java.lang.Throwable) => void): void {
    var universeCache: org.kevoree.modeling.api.data.cache.UniverseCache = this.caches.get(p_universe.key());
    if (universeCache == null) {
        if (callback != null) {
            callback(null);
        }
    } else {
        var times: int64[] = universeCache.timesCaches.keySet().toArray(new Array());
        var sizeCache: int = this.size_dirties(universeCache) + 2;
        var payloads: string[][] = new Array(new Array());
        var i: int = 0;
        for (var j: int = 0; j < times.length; j++) {
            var now: int64 = times[j];
            var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = universeCache.timesCaches.get(now);
            var keys: int64[] = timeCache.payload_cache.keySet().toArray(new Array());
            for (var k: int = 0; k < keys.length; k++) {
                var idObj: int64 = keys[k];
                var cached_entry: org.kevoree.modeling.api.data.CacheEntry = timeCache.payload_cache.get(idObj);
                var cached_raw: interface{}[] = cached_entry.raw;
                if (cached_raw != null && cached_raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] != null && cached_raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX].toString().equals("true")) {
                    var payloadA: string[] = new Array();
                    payloadA[0] = this.keyPayload(p_universe.key(), now, idObj);
                    payloadA[1] = org.kevoree.modeling.api.data.JsonRaw.encode(cached_raw, idObj, cached_entry.metaClass, true);
                    payloads[i] = payloadA;
                    cached_raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = false;
                    i++;
                }
            }
        }
        var keyArr: int64[] = universeCache.timeTreeCache.keySet().toArray(new Array());
        for (var l: int = 0; l < keyArr.length; l++) {
            var timeTreeKey: int64 = keyArr[l];
            var timeTree: org.kevoree.modeling.api.time.TimeTree = universeCache.timeTreeCache.get(timeTreeKey);
            if (timeTree.isDirty()) {
                var payloadC: string[] = new Array();
                payloadC[0] = this.keyTree(p_universe.key(), timeTreeKey);
                payloadC[1] = timeTree.toString();
                payloads[i] = payloadC;
                (timeTree.(org.kevoree.modeling.api.time.DefaultTimeTree)).setDirty(false);
                i++;
            }
        }
        if (universeCache.roots != null && universeCache.roots.dirty) {
            var payloadD: string[] = new Array();
            payloadD[0] = this.keyRootTree(p_universe);
            payloadD[1] = universeCache.roots.serialize();
            payloads[i] = payloadD;
            universeCache.roots.dirty = false;
            i++;
        }
        var payloadDim: string[] = new Array();
        payloadDim[0] = this.keyLastDimIndex("" + this._dimensionKeyCalculator.prefix());
        payloadDim[1] = "" + this._dimensionKeyCalculator.lastComputedIndex();
        payloads[i] = payloadDim;
        i++;
        var payloadObj: string[] = new Array();
        payloadObj[0] = this.keyLastDimIndex("" + this._objectKeyCalculator.prefix());
        payloadObj[1] = "" + this._objectKeyCalculator.lastComputedIndex();
        payloads[i] = payloadObj;
        this._db.put(payloads, callback);
        this._eventBroker.flush(p_universe.key());
    }
}

public saveUnload(p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p : java.lang.Throwable) => void): void {
    this.save(p_universe,  (throwable : java.lang.Throwable) => {
        if (throwable == null) {
            this.discard(p_universe, callback);
        } else {
            if (callback != null) {
                callback(throwable);
            }
        }
    });
}

public lookup(originView: org.kevoree.modeling.api.KView, key: int64, callback: (p : org.kevoree.modeling.api.KObject) => void): void {
    var keys: int64[] = new Array();
    keys[0] = key;
    this.lookupAll(originView, keys,  (kObjects : org.kevoree.modeling.api.KObject[]) => {
        if (kObjects.length == 1) {
            if (callback != null) {
                callback(kObjects[0]);
            }
        } else {
            if (callback != null) {
                callback(null);
            }
        }
    });
}

public lookupAll(originView: org.kevoree.modeling.api.KView, keys: int64[], callback: (p : org.kevoree.modeling.api.KObject[]) => void): void {
    this._scheduler.dispatch({run:function(){
        this.internal_resolve_dim_time(originView, keys,  (objects : interface{}[][]) => {
            var resolved: org.kevoree.modeling.api.KObject[] = new Array();
            var toLoadIndexes: java.util.List<int> = new java.util.ArrayList<int>();
            for (var i: int = 0; i < objects.length; i++) {
                if (objects[i][DefaultKStore.INDEX_RESOLVED_TIME] != null) {
                    var entry: org.kevoree.modeling.api.data.CacheEntry = this.read_cache(objects[i][DefaultKStore.INDEX_RESOLVED_DIM].(int64), objects[i][DefaultKStore.INDEX_RESOLVED_TIME].(int64), keys[i]);
                    if (entry == null) {
                        toLoadIndexes.add(i);
                    } else {
                        resolved[i] = (originView.(org.kevoree.modeling.api.abs.AbstractKView)).createProxy(entry.metaClass, entry.timeTree, keys[i]);
                    }
                }
            }
            if (toLoadIndexes.isEmpty()) {
                callback(resolved);
            } else {
                var toLoadKeys: string[] = new Array();
                for (var i: int = 0; i < toLoadIndexes.size(); i++) {
                    var toLoadIndex: int = toLoadIndexes.get(i);
                    toLoadKeys[i] = this.keyPayload(objects[toLoadIndex][DefaultKStore.INDEX_RESOLVED_DIM].(int64), objects[toLoadIndex][DefaultKStore.INDEX_RESOLVED_TIME].(int64), keys[i]);
                }
                this._db.get(toLoadKeys,  (strings : string[], error : java.lang.Throwable) => {
                    if (error != null) {
                        error.printStackTrace();
                        callback(null);
                    } else {
                        for (var i: int = 0; i < strings.length; i++) {
                            if (strings[i] != null) {
                                var index: int = toLoadIndexes.get(i);
                                var entry: org.kevoree.modeling.api.data.CacheEntry = org.kevoree.modeling.api.data.JsonRaw.decode(strings[i], originView, objects[i][DefaultKStore.INDEX_RESOLVED_TIME].(int64));
                                if (entry != null) {
                                    entry.timeTree = objects[i][DefaultKStore.INDEX_RESOLVED_TIMETREE].(org.kevoree.modeling.api.time.TimeTree);
                                    resolved[index] = (originView.(org.kevoree.modeling.api.abs.AbstractKView)).createProxy(entry.metaClass, entry.timeTree, keys[i]);
                                    this.write_cache(objects[i][DefaultKStore.INDEX_RESOLVED_DIM].(int64), objects[i][DefaultKStore.INDEX_RESOLVED_TIME].(int64), keys[i], entry);
                                }
                            }
                        }
                        callback(resolved);
                    }
                });
            }
        });
}    });
}

public getRoot(originView: org.kevoree.modeling.api.KView, callback: (p : org.kevoree.modeling.api.KObject) => void): void {
    this.resolve_roots(originView.universe(),  (longRBTree : org.kevoree.modeling.api.time.rbtree.LongRBTree) => {
        if (longRBTree == null) {
            callback(null);
        } else {
            var resolved: org.kevoree.modeling.api.time.rbtree.LongTreeNode = longRBTree.previousOrEqual(originView.now());
            if (resolved == null) {
                callback(null);
            } else {
                this.lookup(originView, resolved.value, callback);
            }
        }
    });
}

public setRoot(newRoot: org.kevoree.modeling.api.KObject, callback: (p : java.lang.Throwable) => void): void {
    this.resolve_roots(newRoot.universe(),  (longRBTree : org.kevoree.modeling.api.time.rbtree.LongRBTree) => {
        longRBTree.insert(newRoot.now(), newRoot.uuid());
        (newRoot.(org.kevoree.modeling.api.abs.AbstractKObject)).setRoot(true);
        if (callback != null) {
            callback(null);
        }
    });
}

public eventBroker(): org.kevoree.modeling.api.event.KEventBroker {
    return this._eventBroker;
}

public setEventBroker(p_eventBroker: org.kevoree.modeling.api.event.KEventBroker): void {
    this._eventBroker = p_eventBroker;
}

public dataBase(): org.kevoree.modeling.api.data.KDataBase {
    return this._db;
}

public setDataBase(p_dataBase: org.kevoree.modeling.api.data.KDataBase): void {
    this._db = p_dataBase;
}

public setScheduler(p_scheduler: org.kevoree.modeling.api.KScheduler): void {
    if (p_scheduler != null) {
        this._scheduler = p_scheduler;
    }
}

public operationManager(): org.kevoree.modeling.api.util.KOperationManager {
    return this._operationManager;
}

private read_cache(dimensionKey: int64, timeKey: int64, uuid: int64): org.kevoree.modeling.api.data.CacheEntry {
    var universeCache: org.kevoree.modeling.api.data.cache.UniverseCache = this.caches.get(dimensionKey);
    if (universeCache != null) {
        var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = universeCache.timesCaches.get(timeKey);
        if (timeCache == null) {
            return null;
        } else {
            return timeCache.payload_cache.get(uuid);
        }
    } else {
        return null;
    }
}

private write_cache(dimensionKey: int64, timeKey: int64, uuid: int64, cacheEntry: org.kevoree.modeling.api.data.CacheEntry): void {
    var universeCache: org.kevoree.modeling.api.data.cache.UniverseCache = this.caches.get(dimensionKey);
    if (universeCache == null) {
        universeCache = new org.kevoree.modeling.api.data.cache.UniverseCache();
        this.caches.put(dimensionKey, universeCache);
    }
    var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = universeCache.timesCaches.get(timeKey);
    if (timeCache == null) {
        timeCache = new org.kevoree.modeling.api.data.cache.TimeCache();
        universeCache.timesCaches.put(timeKey, timeCache);
    }
    timeCache.payload_cache.put(uuid, cacheEntry);
}

private write_tree(dimensionKey: int64, uuid: int64, timeTree: org.kevoree.modeling.api.time.TimeTree): void {
    var universeCache: org.kevoree.modeling.api.data.cache.UniverseCache = this.caches.get(dimensionKey);
    if (universeCache == null) {
        universeCache = new org.kevoree.modeling.api.data.cache.UniverseCache();
        this.caches.put(dimensionKey, universeCache);
    }
    universeCache.timeTreeCache.put(uuid, timeTree);
}

private write_roots(dimensionKey: int64, timeTree: org.kevoree.modeling.api.time.rbtree.LongRBTree): void {
    var universeCache: org.kevoree.modeling.api.data.cache.UniverseCache = this.caches.get(dimensionKey);
    if (universeCache == null) {
        universeCache = new org.kevoree.modeling.api.data.cache.UniverseCache();
        this.caches.put(dimensionKey, universeCache);
    }
    universeCache.roots = timeTree;
}

private size_dirties(universeCache: org.kevoree.modeling.api.data.cache.UniverseCache): int {
    var times: int64[] = universeCache.timesCaches.keySet().toArray(new Array());
    var sizeCache: int = 0;
    for (var i: int = 0; i < times.length; i++) {
        var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = universeCache.timesCaches.get(times[i]);
        if (timeCache != null) {
            var keys: int64[] = timeCache.payload_cache.keySet().toArray(new Array());
            for (var k: int = 0; k < keys.length; k++) {
                var idObj: int64 = keys[k];
                var cachedEntry: org.kevoree.modeling.api.data.CacheEntry = timeCache.payload_cache.get(idObj);
                if (cachedEntry != null && cachedEntry.raw != null && cachedEntry.raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] != null && cachedEntry.raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX].toString().equals("true")) {
                    sizeCache++;
                }
            }
            if (timeCache.rootDirty) {
                sizeCache++;
            }
        }
    }
    var ids: int64[] = universeCache.timeTreeCache.keySet().toArray(new Array());
    for (var k: int = 0; k < ids.length; k++) {
        var timeTree: org.kevoree.modeling.api.time.TimeTree = universeCache.timeTreeCache.get(ids[k]);
        if (timeTree != null && timeTree.isDirty()) {
            sizeCache++;
        }
    }
    if (universeCache.roots != null && universeCache.roots.dirty) {
        sizeCache++;
    }
    return sizeCache;
}

private internal_resolve_dim_time(originView: org.kevoree.modeling.api.KView, uuids: int64[], callback: (p : interface{}[][]) => void): void {
    var result: interface{}[][] = new Array(new Array());
    this.resolve_timeTrees(originView.universe(), uuids,  (timeTrees : org.kevoree.modeling.api.time.TimeTree[]) => {
        for (var i: int = 0; i < timeTrees.length; i++) {
            var resolved: interface{}[] = new Array();
            resolved[DefaultKStore.INDEX_RESOLVED_DIM] = originView.universe().key();
            resolved[DefaultKStore.INDEX_RESOLVED_TIME] = timeTrees[i].resolve(originView.now());
            resolved[DefaultKStore.INDEX_RESOLVED_TIMETREE] = timeTrees[i];
            result[i] = resolved;
        }
        callback(result);
    });
}

private resolve_timeTrees(p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>, keys: int64[], callback: (p : org.kevoree.modeling.api.time.TimeTree[]) => void): void {
    var toLoad: java.util.List<int> = new java.util.ArrayList<int>();
    var result: org.kevoree.modeling.api.time.TimeTree[] = new Array();
    for (var i: int = 0; i < keys.length; i++) {
        var universeCache: org.kevoree.modeling.api.data.cache.UniverseCache = this.caches.get(p_universe.key());
        if (universeCache == null) {
            toLoad.add(i);
        } else {
            var cachedTree: org.kevoree.modeling.api.time.TimeTree = universeCache.timeTreeCache.get(keys[i]);
            if (cachedTree != null) {
                result[i] = cachedTree;
            } else {
                toLoad.add(i);
            }
        }
    }
    if (toLoad.isEmpty()) {
        callback(result);
    } else {
        var toLoadKeys: string[] = new Array();
        for (var i: int = 0; i < toLoad.size(); i++) {
            toLoadKeys[i] = this.keyTree(p_universe.key(), keys[toLoad.get(i)]);
        }
        this._db.get(toLoadKeys,  (res : string[], error : java.lang.Throwable) => {
            if (error != null) {
                error.printStackTrace();
            }
            for (var i: int = 0; i < res.length; i++) {
                var newTree: org.kevoree.modeling.api.time.DefaultTimeTree = new org.kevoree.modeling.api.time.DefaultTimeTree();
                try {
                    if (res[i] != null) {
                        newTree.load(res[i]);
                    } else {
                        newTree.insert(p_universe.key());
                    }
                    this.write_tree(p_universe.key(), keys[toLoad.get(i)], newTree);
                    result[toLoad.get(i)] = newTree;
                } catch ($ex$) {
                    if ($ex$ instanceof java.lang.Exception) {
                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                        e.printStackTrace();
                    }
                 }
            }
            callback(result);
        });
    }
}

private resolve_roots(p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p : org.kevoree.modeling.api.time.rbtree.LongRBTree) => void): void {
    var universeCache: org.kevoree.modeling.api.data.cache.UniverseCache = this.caches.get(p_universe.key());
    if (universeCache != null && universeCache.roots != null) {
        callback(universeCache.roots);
    } else {
        var keys: string[] = new Array();
        keys[0] = this.keyRoot(p_universe.key());
        this._db.get(keys,  (res : string[], error : java.lang.Throwable) => {
            var tree: org.kevoree.modeling.api.time.rbtree.LongRBTree = new org.kevoree.modeling.api.time.rbtree.LongRBTree();
            if (error != null) {
                error.printStackTrace();
            } else {
                if (res != null && res.length == 1 && res[0] != null && !res[0].equals("")) {
                    try {
                        tree.unserialize(res[0]);
                    } catch ($ex$) {
                        if ($ex$ instanceof java.lang.Exception) {
                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                            e.printStackTrace();
                        }
                     }
                }
            }
            this.write_roots(p_universe.key(), tree);
            callback(tree);
        });
    }
}


type Index struct {

    public static PARENT_INDEX: int = 0;
    public static INBOUNDS_INDEX: int = 1;
    public static IS_DIRTY_INDEX: int = 2;
    public static IS_ROOT_INDEX: int = 3;
    public static REF_IN_PARENT_INDEX: int = 4;
    public static INFER_CHILDREN: int = 5;
    public static RESERVED_INDEXES: int = 6;
}

type JsonRaw struct {

    public static SEP: string = "@";
}
public static decode(payload: string, currentView: org.kevoree.modeling.api.KView, now: int64): org.kevoree.modeling.api.data.CacheEntry {
    if (payload == null) {
        return null;
    }
    var lexer: org.kevoree.modeling.api.json.Lexer = new org.kevoree.modeling.api.json.Lexer(payload);
    var currentAttributeName: string = null;
    var arrayPayload: java.util.Set<string> = null;
    var content: java.util.Map<string, interface{}> = new java.util.HashMap<string, interface{}>();
    var currentToken: org.kevoree.modeling.api.json.JsonToken = lexer.nextToken();
    while (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.EOF){
        if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.LEFT_BRACKET)) {
            arrayPayload = new java.util.HashSet<string>();
        } else {
            if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.RIGHT_BRACKET)) {
                content.put(currentAttributeName, arrayPayload);
                arrayPayload = null;
                currentAttributeName = null;
            } else {
                if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.LEFT_BRACE)) {
                } else {
                    if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.RIGHT_BRACE)) {
                    } else {
                        if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.VALUE)) {
                            if (currentAttributeName == null) {
                                currentAttributeName = currentToken.value().toString();
                            } else {
                                if (arrayPayload == null) {
                                    content.put(currentAttributeName, currentToken.value().toString());
                                    currentAttributeName = null;
                                } else {
                                    arrayPayload.add(currentToken.value().toString());
                                }
                            }
                        }
                    }
                }
            }
        }
        currentToken = lexer.nextToken();
    }
    if (content.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META) == null) {
        return null;
    } else {
        var entry: org.kevoree.modeling.api.data.CacheEntry = new org.kevoree.modeling.api.data.CacheEntry();
        var metaModel: org.kevoree.modeling.api.meta.MetaModel = currentView.universe().model().metaModel();
        entry.metaClass = metaModel.metaClass(content.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META).toString());
        entry.raw = new Array();
        entry.raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = false;
        var metaKeys: string[] = content.keySet().toArray(new Array());
        for (var i: int = 0; i < metaKeys.length; i++) {
            if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.INBOUNDS_META)) {
                var inbounds: java.util.Set<int64> = new java.util.HashSet<int64>();
                entry.raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] = inbounds;
                var raw_payload: interface{} = content.get(metaKeys[i]);
                try {
                    var raw_keys: java.util.HashSet<string> = raw_payload.(java.util.HashSet<string>);
                    var raw_keys_p: string[] = raw_keys.toArray(new Array());
                    for (var j: int = 0; j < raw_keys_p.length; j++) {
                        try {
                            var parsed: int64 = java.lang.Long.parseLong(raw_keys_p[j]);
                            inbounds.add(parsed);
                        } catch ($ex$) {
                            if ($ex$ instanceof java.lang.Exception) {
                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                e.printStackTrace();
                            }
                         }
                    }
                } catch ($ex$) {
                    if ($ex$ instanceof java.lang.Exception) {
                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                        e.printStackTrace();
                    }
                 }
            } else {
                if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_META)) {
                    try {
                        entry.raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX] = java.lang.Long.parseLong(content.get(metaKeys[i]).toString());
                    } catch ($ex$) {
                        if ($ex$ instanceof java.lang.Exception) {
                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                            e.printStackTrace();
                        }
                     }
                } else {
                    if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_REF_META)) {
                        try {
                            var raw_payload_ref: string = content.get(metaKeys[i]).toString();
                            var elemsRefs: string[] = raw_payload_ref.split(JsonRaw.SEP);
                            if (elemsRefs.length == 2) {
                                var foundMeta: org.kevoree.modeling.api.meta.MetaClass = metaModel.metaClass(elemsRefs[0].trim());
                                if (foundMeta != null) {
                                    var metaReference: org.kevoree.modeling.api.meta.MetaReference = foundMeta.metaReference(elemsRefs[1].trim());
                                    if (metaReference != null) {
                                        entry.raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX] = metaReference;
                                    }
                                }
                            }
                        } catch ($ex$) {
                            if ($ex$ instanceof java.lang.Exception) {
                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                e.printStackTrace();
                            }
                         }
                    } else {
                        if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_ROOT)) {
                            try {
                                if ("true".equals(content.get(metaKeys[i]))) {
                                    entry.raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = true;
                                } else {
                                    entry.raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = false;
                                }
                            } catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                    e.printStackTrace();
                                }
                             }
                        } else {
                            if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META)) {
                            } else {
                                var metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute = entry.metaClass.metaAttribute(metaKeys[i]);
                                var metaReference: org.kevoree.modeling.api.meta.MetaReference = entry.metaClass.metaReference(metaKeys[i]);
                                var insideContent: interface{} = content.get(metaKeys[i]);
                                if (insideContent != null) {
                                    if (metaAttribute != null) {
                                        entry.raw[metaAttribute.index()] = metaAttribute.strategy().load(insideContent.toString(), metaAttribute, now);
                                    } else {
                                        if (metaReference != null) {
                                            if (metaReference.single()) {
                                                try {
                                                    entry.raw[metaReference.index()] = java.lang.Long.parseLong(insideContent.toString());
                                                } catch ($ex$) {
                                                    if ($ex$ instanceof java.lang.Exception) {
                                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                        e.printStackTrace();
                                                    }
                                                 }
                                            } else {
                                                try {
                                                    var convertedRaw: java.util.Set<int64> = new java.util.HashSet<int64>();
                                                    var plainRawSet: java.util.Set<string> = insideContent.(java.util.Set<string>);
                                                    var plainRawList: string[] = plainRawSet.toArray(new Array());
                                                    for (var l: int = 0; l < plainRawList.length; l++) {
                                                        var plainRaw: string = plainRawList[l];
                                                        try {
                                                            var converted: int64 = java.lang.Long.parseLong(plainRaw);
                                                            convertedRaw.add(converted);
                                                        } catch ($ex$) {
                                                            if ($ex$ instanceof java.lang.Exception) {
                                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                e.printStackTrace();
                                                            }
                                                         }
                                                    }
                                                    entry.raw[metaReference.index()] = convertedRaw;
                                                } catch ($ex$) {
                                                    if ($ex$ instanceof java.lang.Exception) {
                                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                        e.printStackTrace();
                                                    }
                                                 }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return entry;
    }
}

public static encode(raw: interface{}[], uuid: int64, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, endline: bool): string {
    var metaReferences: org.kevoree.modeling.api.meta.MetaReference[] = p_metaClass.metaReferences();
    var metaAttributes: org.kevoree.modeling.api.meta.MetaAttribute[] = p_metaClass.metaAttributes();
    var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
    builder.append("\t{\n");
    builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META + "\": \"");
    builder.append(p_metaClass.metaName());
    builder.append("\",\n");
    builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID + "\": \"");
    builder.append(uuid);
    if (raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] != null && raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX].toString().equals("true")) {
        builder.append("\",\n");
        builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_ROOT + "\": \"");
        builder.append("true");
    }
    if (raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX] != null) {
        builder.append("\",\n");
        builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_META + "\": \"");
        builder.append(raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX].toString());
    }
    if (raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX] != null) {
        builder.append("\",\n");
        builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_REF_META + "\": \"");
        try {
            builder.append((raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX].(org.kevoree.modeling.api.meta.MetaReference)).origin().metaName());
            builder.append(JsonRaw.SEP);
            builder.append((raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX].(org.kevoree.modeling.api.meta.MetaReference)).metaName());
        } catch ($ex$) {
            if ($ex$ instanceof java.lang.Exception) {
                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                e.printStackTrace();
            }
         }
    }
    if (raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null) {
        builder.append("\",\n");
        builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.INBOUNDS_META + "\": [");
        try {
            var elemsInRaw: java.util.Set<int64> = raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX].(java.util.Set<int64>);
            var elemsArr: int64[] = elemsInRaw.toArray(new Array());
            var isFirst: bool = true;
            for (var j: int = 0; j < elemsArr.length; j++) {
                if (!isFirst) {
                    builder.append(",");
                }
                builder.append("\"");
                builder.append(elemsArr[j]);
                builder.append("\"");
                isFirst = false;
            }
        } catch ($ex$) {
            if ($ex$ instanceof java.lang.Exception) {
                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                e.printStackTrace();
            }
         }
        builder.append("]");
        builder.append(",\n");
    } else {
        builder.append("\",\n");
    }
    var nbElemToPrint: int = 0;
    for (var i: int = org.kevoree.modeling.api.data.Index.RESERVED_INDEXES; i < raw.length; i++) {
        if (raw[i] != null) {
            nbElemToPrint++;
        }
    }
    var nbElemPrinted: int = 0;
    for (var i: int = 0; i < metaAttributes.length; i++) {
        var payload_res: interface{} = raw[metaAttributes[i].index()];
        if (payload_res != null) {
            var attrsPayload: string = metaAttributes[i].strategy().save(payload_res, metaAttributes[i]);
            if (attrsPayload != null) {
                builder.append("\t\t");
                builder.append("\"");
                builder.append(metaAttributes[i].metaName());
                builder.append("\": \"");
                builder.append(attrsPayload);
                builder.append("\"");
                nbElemPrinted++;
                if (nbElemPrinted < nbElemToPrint) {
                    builder.append(",");
                }
                builder.append("\n");
            }
        }
    }
    for (var i: int = 0; i < metaReferences.length; i++) {
        var refPayload: interface{} = raw[metaReferences[i].index()];
        if (refPayload != null) {
            builder.append("\t\t");
            builder.append("\"");
            builder.append(metaReferences[i].metaName());
            builder.append("\":");
            if (metaReferences[i].single()) {
                builder.append("\"");
                builder.append(refPayload);
                builder.append("\"");
            } else {
                var elems: java.util.Set<int64> = refPayload.(java.util.Set<int64>);
                var elemsArr: int64[] = elems.toArray(new Array());
                builder.append(" [");
                for (var j: int = 0; j < elemsArr.length; j++) {
                    builder.append("\"");
                    builder.append(elemsArr[j]);
                    builder.append("\"");
                    if (j != elemsArr.length - 1) {
                        builder.append(",");
                    }
                }
                builder.append("]");
            }
            nbElemPrinted++;
            if (nbElemPrinted < nbElemToPrint) {
                builder.append(",");
            }
            builder.append("\n");
        }
    }
    if (endline) {
        builder.append("\t}\n");
    } else {
        builder.append("\t}");
    }
    return builder.toString();
}


type KDataBase interface {
    get(keys : string[],callback : (p : string[], p1 : java.lang.Throwable) => void) : void
    put(payloads : string[][],error : (p : java.lang.Throwable) => void) : void
    remove(keys : string[],error : (p : java.lang.Throwable) => void) : void
    commit(error : (p : java.lang.Throwable) => void) : void
    connect(callback : (p : java.lang.Throwable) => void) : void
    close(callback : (p : java.lang.Throwable) => void) : void
}
type KeyCalculator struct {

    public static LONG_LIMIT_JS: int64 = 0x001FFFFFFFFFFFFF;
    public static INDEX_LIMIT: int64 = 0x0000001FFFFFFFFF;
    private _prefix: int64;
    private _currentIndex: int64;
}
constructor(prefix: short, currentIndex: int64) {
    this._prefix = (prefix.(int64)) << 53 - 16;
    this._currentIndex = currentIndex;
}

public nextKey(): int64 {
    if (this._currentIndex == KeyCalculator.INDEX_LIMIT) {
        throw new java.lang.IndexOutOfBoundsException("Object Index could not be created because it exceeded the capacity of the current prefix. Ask for a new prefix.");
    }
    this._currentIndex++;
    var objectKey: int64 = this._prefix + this._currentIndex;
    if (objectKey > KeyCalculator.LONG_LIMIT_JS) {
        throw new java.lang.IndexOutOfBoundsException("Object Index exceeds teh maximum JavaScript number capacity. (2^53)");
    }
    return objectKey;
}

public lastComputedIndex(): int64 {
    return this._currentIndex;
}

public prefix(): short {
    return (this._prefix >> 53 - 16).(short);
}


type KStore interface {
    lookup(originView : org.kevoree.modeling.api.KView,key : int64,callback : (p : org.kevoree.modeling.api.KObject) => void) : void
    lookupAll(originView : org.kevoree.modeling.api.KView,key : int64[],callback : (p : org.kevoree.modeling.api.KObject[]) => void) : void
    raw(origin : org.kevoree.modeling.api.KObject,accessMode : org.kevoree.modeling.api.data.AccessMode) : interface{}[]
    save(universe : org.kevoree.modeling.api.KUniverse<any, any, any>,callback : (p : java.lang.Throwable) => void) : void
    saveUnload(universe : org.kevoree.modeling.api.KUniverse<any, any, any>,callback : (p : java.lang.Throwable) => void) : void
    discard(universe : org.kevoree.modeling.api.KUniverse<any, any, any>,callback : (p : java.lang.Throwable) => void) : void
    delete(universe : org.kevoree.modeling.api.KUniverse<any, any, any>,callback : (p : java.lang.Throwable) => void) : void
    initKObject(obj : org.kevoree.modeling.api.KObject,originView : org.kevoree.modeling.api.KView) : void
    initUniverse(universe : org.kevoree.modeling.api.KUniverse<any, any, any>) : void
    nextUniverseKey() : int64
    nextObjectKey() : int64
    getRoot(originView : org.kevoree.modeling.api.KView,callback : (p : org.kevoree.modeling.api.KObject) => void) : void
    setRoot(newRoot : org.kevoree.modeling.api.KObject,callback : (p : java.lang.Throwable) => void) : void
    eventBroker() : org.kevoree.modeling.api.event.KEventBroker
    setEventBroker(broker : org.kevoree.modeling.api.event.KEventBroker) : void
    dataBase() : org.kevoree.modeling.api.data.KDataBase
    setDataBase(dataBase : org.kevoree.modeling.api.data.KDataBase) : void
    setScheduler(scheduler : org.kevoree.modeling.api.KScheduler) : void
    operationManager() : org.kevoree.modeling.api.util.KOperationManager
    connect(callback : (p : java.lang.Throwable) => void) : void
    close(callback : (p : java.lang.Throwable) => void) : void
}
type MemoryKDataBase struct implements org.kevoree.modeling.api.data.KDataBase {

    private backend: java.util.HashMap<string, string> = new java.util.HashMap<string, string>();
    public static DEBUG: bool = false;
}
public put(payloads: string[][], callback: (p : java.lang.Throwable) => void): void {
    for (var i: int = 0; i < payloads.length; i++) {
        this.backend.put(payloads[i][0], payloads[i][1]);
        if (MemoryKDataBase.DEBUG) {
            System.out.println("PUT " + payloads[i][0] + "->" + payloads[i][1]);
        }
    }
    if (callback != null) {
        callback(null);
    }
}

public get(keys: string[], callback: (p : string[], p1 : java.lang.Throwable) => void): void {
    var values: string[] = new Array();
    for (var i: int = 0; i < keys.length; i++) {
        values[i] = this.backend.get(keys[i]);
        if (MemoryKDataBase.DEBUG) {
            System.out.println("GET " + keys[i] + "->" + values[i]);
        }
    }
    if (callback != null) {
        callback(values, null);
    }
}

public remove(keys: string[], callback: (p : java.lang.Throwable) => void): void {
    for (var i: int = 0; i < keys.length; i++) {
        this.backend.remove(keys[i]);
    }
    if (callback != null) {
        callback(null);
    }
}

public commit(callback: (p : java.lang.Throwable) => void): void {
    if (callback != null) {
        callback(null);
    }
}

public connect(callback: (p : java.lang.Throwable) => void): void {
    if (callback != null) {
        callback(null);
    }
}

public close(callback: (p : java.lang.Throwable) => void): void {
    this.backend.clear();
}


type TimeCache struct {

    public payload_cache: java.util.Map<int64, org.kevoree.modeling.api.data.CacheEntry> = new java.util.HashMap<int64, org.kevoree.modeling.api.data.CacheEntry>();
    public root: org.kevoree.modeling.api.KObject = null;
    public rootDirty: bool = false;
}

type UniverseCache struct {

    public timeTreeCache: java.util.Map<int64, org.kevoree.modeling.api.time.TimeTree> = new java.util.HashMap<int64, org.kevoree.modeling.api.time.TimeTree>();
    public timesCaches: java.util.Map<int64, org.kevoree.modeling.api.data.cache.TimeCache> = new java.util.HashMap<int64, org.kevoree.modeling.api.data.cache.TimeCache>();
    public roots: org.kevoree.modeling.api.time.rbtree.LongRBTree = null;
}

type DefaultKBroker struct implements org.kevoree.modeling.api.event.KEventBroker {

    private static DIM_INDEX: int = 0;
    private static TIME_INDEX: int = 1;
    private static UUID_INDEX: int = 2;
    private static TUPLE_SIZE: int = 3;
    private listeners: java.util.HashMap<(p : org.kevoree.modeling.api.KEvent) => void, int64[]> = new java.util.HashMap<(p : org.kevoree.modeling.api.KEvent) => void, int64[]>();
    private _metaModel: org.kevoree.modeling.api.meta.MetaModel;
}
public connect(callback: (p : java.lang.Throwable) => void): void {
    if (callback != null) {
        callback(null);
    }
}

public close(callback: (p : java.lang.Throwable) => void): void {
    this.listeners.clear();
    if (callback != null) {
        callback(null);
    }
}

public registerListener(origin: interface{}, listener: (p : org.kevoree.modeling.api.KEvent) => void, scope: interface{}): void {
    var tuple: int64[] = new Array();
    if (origin instanceof org.kevoree.modeling.api.abs.AbstractKUniverse) {
        tuple[DefaultKBroker.DIM_INDEX] = (origin.(org.kevoree.modeling.api.abs.AbstractKUniverse<any, any, any>)).key();
    } else {
        if (origin instanceof org.kevoree.modeling.api.abs.AbstractKView) {
            tuple[DefaultKBroker.DIM_INDEX] = (origin.(org.kevoree.modeling.api.abs.AbstractKView)).universe().key();
            tuple[DefaultKBroker.TIME_INDEX] = (origin.(org.kevoree.modeling.api.abs.AbstractKView)).now();
        } else {
            if (origin instanceof org.kevoree.modeling.api.abs.AbstractKObject) {
                var casted: org.kevoree.modeling.api.abs.AbstractKObject = origin.(org.kevoree.modeling.api.abs.AbstractKObject);
                if (scope == null) {
                    tuple[DefaultKBroker.DIM_INDEX] = casted.universe().key();
                    tuple[DefaultKBroker.TIME_INDEX] = casted.now();
                    tuple[DefaultKBroker.UUID_INDEX] = casted.uuid();
                } else {
                    tuple[DefaultKBroker.UUID_INDEX] = casted.uuid();
                    if (scope instanceof org.kevoree.modeling.api.abs.AbstractKUniverse) {
                        tuple[DefaultKBroker.DIM_INDEX] = (scope.(org.kevoree.modeling.api.abs.AbstractKUniverse<any, any, any>)).key();
                    }
                }
            }
        }
    }
    this.listeners.put(listener, tuple);
}

public notify(event: org.kevoree.modeling.api.KEvent): void {
    var keys: {(p : org.kevoree.modeling.api.KEvent) : void;}[] = this.listeners.keySet().toArray(new Array());
    for (var i: int = 0; i < keys.length; i++) {
        var tuple: interface{}[] = this.listeners.get(keys[i]);
        var match: bool = true;
        if (tuple[DefaultKBroker.DIM_INDEX] != null) {
            if (!tuple[DefaultKBroker.DIM_INDEX].equals(event.universe())) {
                match = false;
            }
        }
        if (tuple[DefaultKBroker.TIME_INDEX] != null) {
            if (!tuple[DefaultKBroker.TIME_INDEX].equals(event.time())) {
                match = false;
            }
        }
        if (tuple[DefaultKBroker.UUID_INDEX] != null) {
            if (!tuple[DefaultKBroker.UUID_INDEX].equals(event.uuid())) {
                match = false;
            }
        }
        if (match) {
            keys[i](event);
        }
    }
}

public flush(dimensionKey: int64): void {
}

public setMetaModel(p_metaModel: org.kevoree.modeling.api.meta.MetaModel): void {
    this._metaModel = p_metaModel;
}

public unregister(listener: (p : org.kevoree.modeling.api.KEvent) => void): void {
    this.listeners.remove(listener);
}


type DefaultKEvent struct implements org.kevoree.modeling.api.KEvent {

    private _dimensionKey: int64;
    private _time: int64;
    private _uuid: int64;
    private _actionType: org.kevoree.modeling.api.KActionType;
    private _metaClass: org.kevoree.modeling.api.meta.MetaClass;
    private _metaElement: org.kevoree.modeling.api.meta.Meta;
    private _value: interface{};
    private static LEFT_BRACE: string = "{";
    private static RIGHT_BRACE: string = "}";
    private static DIMENSION_KEY: string = "dim";
    private static TIME_KEY: string = "time";
    private static UUID_KEY: string = "uuid";
    private static TYPE_KEY: string = "type";
    private static CLASS_KEY: string = "class";
    private static ELEMENT_KEY: string = "elem";
    private static VALUE_KEY: string = "value";
}
constructor(p_type: org.kevoree.modeling.api.KActionType, p_source: org.kevoree.modeling.api.KObject, p_meta: org.kevoree.modeling.api.meta.Meta, p_newValue: interface{}) {
    if (p_source != null) {
        this._dimensionKey = p_source.universe().key();
        this._time = p_source.now();
        this._uuid = p_source.uuid();
        this._metaClass = p_source.metaClass();
    }
    if (p_type != null) {
        this._actionType = p_type;
    }
    if (p_meta != null) {
        this._metaElement = p_meta;
    }
    if (p_newValue != null) {
        this._value = p_newValue;
    }
}

public universe(): int64 {
    return this._dimensionKey;
}

public time(): int64 {
    return this._time;
}

public uuid(): int64 {
    return this._uuid;
}

public actionType(): org.kevoree.modeling.api.KActionType {
    return this._actionType;
}

public metaClass(): org.kevoree.modeling.api.meta.MetaClass {
    return this._metaClass;
}

public metaElement(): org.kevoree.modeling.api.meta.Meta {
    return this._metaElement;
}

public value(): interface{} {
    return this._value;
}

public toString(): string {
    return this.toJSON();
}

public toJSON(): string {
    var sb: java.lang.StringBuilder = new java.lang.StringBuilder();
    sb.append(DefaultKEvent.LEFT_BRACE);
    sb.append("\"").append(DefaultKEvent.DIMENSION_KEY).append("\":\"").append(this._dimensionKey).append("\",");
    sb.append("\"").append(DefaultKEvent.TIME_KEY).append("\":\"").append(this._time).append("\",");
    sb.append("\"").append(DefaultKEvent.UUID_KEY).append("\":\"").append(this._uuid).append("\",");
    sb.append("\"").append(DefaultKEvent.TYPE_KEY).append("\":\"").append(this._actionType.toString()).append("\",");
    sb.append("\"").append(DefaultKEvent.CLASS_KEY).append("\":\"").append(this._metaClass.metaName()).append("\"");
    if (this._metaElement != null) {
        sb.append(",\"").append(DefaultKEvent.ELEMENT_KEY).append("\":\"").append(this._metaElement.metaName()).append("\"");
    }
    if (this._value != null) {
        sb.append(",\"").append(DefaultKEvent.VALUE_KEY).append("\":\"").append(org.kevoree.modeling.api.json.JsonString.encode(this._value.toString())).append("\"");
    }
    sb.append(DefaultKEvent.RIGHT_BRACE);
    return sb.toString();
}

public static fromJSON(payload: string, metaModel: org.kevoree.modeling.api.meta.MetaModel): org.kevoree.modeling.api.KEvent {
    var lexer: org.kevoree.modeling.api.json.Lexer = new org.kevoree.modeling.api.json.Lexer(payload);
    var currentToken: org.kevoree.modeling.api.json.JsonToken = lexer.nextToken();
    if (currentToken.tokenType() == org.kevoree.modeling.api.json.Type.LEFT_BRACE) {
        var currentAttributeName: string = null;
        var event: org.kevoree.modeling.api.event.DefaultKEvent = new org.kevoree.modeling.api.event.DefaultKEvent(null, null, null, null);
        currentToken = lexer.nextToken();
        while (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.EOF){
            if (currentToken.tokenType() == org.kevoree.modeling.api.json.Type.VALUE) {
                if (currentAttributeName == null) {
                    currentAttributeName = currentToken.value().toString();
                } else {
                    org.kevoree.modeling.api.event.DefaultKEvent.setEventAttribute(event, currentAttributeName, currentToken.value().toString(), metaModel);
                    currentAttributeName = null;
                }
            }
            currentToken = lexer.nextToken();
        }
        return event;
    }
    return null;
}

private static setEventAttribute(event: org.kevoree.modeling.api.event.DefaultKEvent, currentAttributeName: string, value: string, metaModel: org.kevoree.modeling.api.meta.MetaModel): void {
    if (currentAttributeName.equals(DefaultKEvent.DIMENSION_KEY)) {
        event._dimensionKey = java.lang.Long.parseLong(value);
    } else {
        if (currentAttributeName.equals(DefaultKEvent.TIME_KEY)) {
            event._time = java.lang.Long.parseLong(value);
        } else {
            if (currentAttributeName.equals(DefaultKEvent.UUID_KEY)) {
                event._uuid = java.lang.Long.parseLong(value);
            } else {
                if (currentAttributeName.equals(DefaultKEvent.TYPE_KEY)) {
                    event._actionType = org.kevoree.modeling.api.KActionType.parse(value);
                } else {
                    if (currentAttributeName.equals(DefaultKEvent.CLASS_KEY)) {
                        event._metaClass = metaModel.metaClass(value);
                    } else {
                        if (currentAttributeName.equals(DefaultKEvent.ELEMENT_KEY)) {
                            if (event._metaClass != null) {
                                event._metaElement = event._metaClass.metaAttribute(value);
                                if (event._metaElement == null) {
                                    event._metaElement = event._metaClass.metaReference(value);
                                }
                            }
                        } else {
                            if (currentAttributeName.equals(DefaultKEvent.VALUE_KEY)) {
                                event._value = org.kevoree.modeling.api.json.JsonString.unescape(value);
                            } else {
                            }
                        }
                    }
                }
            }
        }
    }
}

public toTrace(): org.kevoree.modeling.api.trace.ModelTrace {
    if (this._actionType.equals(org.kevoree.modeling.api.KActionType.ADD)) {
        return new org.kevoree.modeling.api.trace.ModelAddTrace(this._uuid, this._metaElement.(org.kevoree.modeling.api.meta.MetaReference), (this._value.(org.kevoree.modeling.api.KObject)).uuid());
    }
    if (this._actionType.equals(org.kevoree.modeling.api.KActionType.NEW)) {
        return new org.kevoree.modeling.api.trace.ModelNewTrace(this._uuid, this._metaElement.(org.kevoree.modeling.api.meta.MetaClass));
    }
    if (this._actionType.equals(org.kevoree.modeling.api.KActionType.REMOVE)) {
        return new org.kevoree.modeling.api.trace.ModelAddTrace(this._uuid, this._metaElement.(org.kevoree.modeling.api.meta.MetaReference), (this._value.(org.kevoree.modeling.api.KObject)).uuid());
    }
    if (this._actionType.equals(org.kevoree.modeling.api.KActionType.SET)) {
        return new org.kevoree.modeling.api.trace.ModelSetTrace(this._uuid, this._metaElement.(org.kevoree.modeling.api.meta.MetaAttribute), this._value);
    }
    return null;
}


type KEventBroker interface {
    connect(callback : (p : java.lang.Throwable) => void) : void
    close(callback : (p : java.lang.Throwable) => void) : void
    registerListener(origin : interface{},listener : (p : org.kevoree.modeling.api.KEvent) => void,scope : interface{}) : void
    unregister(listener : (p : org.kevoree.modeling.api.KEvent) => void) : void
    notify(event : org.kevoree.modeling.api.KEvent) : void
    flush(dimensionKey : int64) : void
    setMetaModel(metaModel : org.kevoree.modeling.api.meta.MetaModel) : void
}
type DiscreteExtrapolation struct implements org.kevoree.modeling.api.extrapolation.Extrapolation {

    private static INSTANCE: org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation;
}
public static instance(): org.kevoree.modeling.api.extrapolation.Extrapolation {
    if (DiscreteExtrapolation.INSTANCE == null) {
        DiscreteExtrapolation.INSTANCE = new org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation();
    }
    return DiscreteExtrapolation.INSTANCE;
}

public extrapolate(current: org.kevoree.modeling.api.KObject, attribute: org.kevoree.modeling.api.meta.MetaAttribute): interface{} {
    var payload: interface{}[] = current.view().universe().model().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ);
    if (payload != null) {
        return payload[attribute.index()];
    } else {
        return null;
    }
}

public mutate(current: org.kevoree.modeling.api.KObject, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: interface{}): void {
    var internalPayload: interface{}[] = current.view().universe().model().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE);
    if (internalPayload != null) {
        internalPayload[attribute.index()] = payload;
    }
}

public save(cache: interface{}, attribute: org.kevoree.modeling.api.meta.MetaAttribute): string {
    if (cache != null) {
        return attribute.metaType().save(cache);
    } else {
        return null;
    }
}

public load(payload: string, attribute: org.kevoree.modeling.api.meta.MetaAttribute, now: int64): interface{} {
    if (payload != null) {
        return attribute.metaType().load(payload);
    }
    return null;
}


type Extrapolation interface {
    extrapolate(current : org.kevoree.modeling.api.KObject,attribute : org.kevoree.modeling.api.meta.MetaAttribute) : interface{}
    mutate(current : org.kevoree.modeling.api.KObject,attribute : org.kevoree.modeling.api.meta.MetaAttribute,payload : interface{}) : void
    save(cache : interface{},attribute : org.kevoree.modeling.api.meta.MetaAttribute) : string
    load(payload : string,attribute : org.kevoree.modeling.api.meta.MetaAttribute,now : int64) : interface{}
}
type PolynomialExtrapolation struct implements org.kevoree.modeling.api.extrapolation.Extrapolation {

    private static INSTANCE: org.kevoree.modeling.api.extrapolation.PolynomialExtrapolation;
}
public extrapolate(current: org.kevoree.modeling.api.KObject, attribute: org.kevoree.modeling.api.meta.MetaAttribute): interface{} {
    var pol: org.kevoree.modeling.api.polynomial.PolynomialModel = current.view().universe().model().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[attribute.index()].(org.kevoree.modeling.api.polynomial.PolynomialModel);
    if (pol != null) {
        var extrapolatedValue: java.lang.Double = pol.extrapolate(current.now());
        if (attribute.metaType() == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.DOUBLE) {
            return extrapolatedValue;
        } else {
            if (attribute.metaType() == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.LONG) {
                return extrapolatedValue.longValue();
            } else {
                if (attribute.metaType() == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.FLOAT) {
                    return extrapolatedValue.floatValue();
                } else {
                    if (attribute.metaType() == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.INT) {
                        return extrapolatedValue.intValue();
                    } else {
                        if (attribute.metaType() == org.kevoree.modeling.api.meta.PrimitiveMetaTypes.SHORT) {
                            return extrapolatedValue.shortValue();
                        } else {
                            return null;
                        }
                    }
                }
            }
        }
    } else {
        return null;
    }
}

public mutate(current: org.kevoree.modeling.api.KObject, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: interface{}): void {
    var raw: interface{}[] = current.view().universe().model().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ);
    var previous: interface{} = raw[attribute.index()];
    if (previous == null) {
        var pol: org.kevoree.modeling.api.polynomial.PolynomialModel = this.createPolynomialModel(current.now(), attribute.precision());
        pol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()));
        current.view().universe().model().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE)[attribute.index()] = pol;
    } else {
        var previousPol: org.kevoree.modeling.api.polynomial.PolynomialModel = previous.(org.kevoree.modeling.api.polynomial.PolynomialModel);
        if (!previousPol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()))) {
            var pol: org.kevoree.modeling.api.polynomial.PolynomialModel = this.createPolynomialModel(previousPol.lastIndex(), attribute.precision());
            pol.insert(previousPol.lastIndex(), previousPol.extrapolate(previousPol.lastIndex()));
            pol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()));
            current.view().universe().model().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE)[attribute.index()] = pol;
        } else {
            if (previousPol.isDirty()) {
                raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = true;
            }
        }
    }
}

public save(cache: interface{}, attribute: org.kevoree.modeling.api.meta.MetaAttribute): string {
    try {
        return (cache.(org.kevoree.modeling.api.polynomial.PolynomialModel)).save();
    } catch ($ex$) {
        if ($ex$ instanceof java.lang.Exception) {
            var e: java.lang.Exception = <java.lang.Exception>$ex$;
            e.printStackTrace();
            return null;
        }
     }
}

public load(payload: string, attribute: org.kevoree.modeling.api.meta.MetaAttribute, now: int64): interface{} {
    var pol: org.kevoree.modeling.api.polynomial.PolynomialModel = this.createPolynomialModel(now, attribute.precision());
    pol.load(payload);
    return pol;
}

public static instance(): org.kevoree.modeling.api.extrapolation.Extrapolation {
    if (PolynomialExtrapolation.INSTANCE == null) {
        PolynomialExtrapolation.INSTANCE = new org.kevoree.modeling.api.extrapolation.PolynomialExtrapolation();
    }
    return PolynomialExtrapolation.INSTANCE;
}

private createPolynomialModel(origin: int64, precision: double): org.kevoree.modeling.api.polynomial.PolynomialModel {
    return new org.kevoree.modeling.api.polynomial.doublepolynomial.DoublePolynomialModel(origin, precision, 20, org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES);
}


type KInferAlg interface {
    learn(inputs : interface{}[],results : interface{}[],callback : (p : java.lang.Throwable) => void) : void
    infer(inputs : interface{}[],callback : (p : interface{}[]) => void) : void
    save() : string
    load(payload : string) : void
    isDirty() : bool
}
type KInferClustering interface {
    classify(callback : (p : int) => void) : void
    learn(callback : (p : java.lang.Throwable) => void) : void
}
type KInferDecision interface {
}
type KInferExtrapolation interface {
}
type KInferRanking interface {
    propose(callback : (p : int) => void) : void
    learn(callback : (p : java.lang.Throwable) => void) : void
    setTrainingQuery(query : string) : void
    setExtrapolationQuery(query : string) : void
}
type JsonFormat struct implements org.kevoree.modeling.api.ModelFormat {

    private _view: org.kevoree.modeling.api.KView;
}
constructor(p_view: org.kevoree.modeling.api.KView) {
    this._view = p_view;
}

public save(model: org.kevoree.modeling.api.KObject, callback: (p : string, p1 : java.lang.Throwable) => void): void {
    if (org.kevoree.modeling.api.util.Checker.isDefined(model) && org.kevoree.modeling.api.util.Checker.isDefined(callback)) {
        org.kevoree.modeling.api.json.JsonModelSerializer.serialize(model, callback);
    } else {
        throw new java.lang.RuntimeException("one parameter is null");
    }
}

public saveRoot(callback: (p : string, p1 : java.lang.Throwable) => void): void {
    if (org.kevoree.modeling.api.util.Checker.isDefined(callback)) {
        this._view.universe().model().storage().getRoot(this._view,  (root : org.kevoree.modeling.api.KObject) => {
            if (root == null) {
                callback("", new java.lang.Exception("Root not set yet !"));
            } else {
                org.kevoree.modeling.api.json.JsonModelSerializer.serialize(root, callback);
            }
        });
    } else {
        throw new java.lang.RuntimeException("one parameter is null");
    }
}

public load(payload: string, callback: (p : java.lang.Throwable) => void): void {
    if (org.kevoree.modeling.api.util.Checker.isDefined(payload) && org.kevoree.modeling.api.util.Checker.isDefined(callback)) {
        org.kevoree.modeling.api.json.JsonModelLoader.load(this._view, payload, callback);
    } else {
        throw new java.lang.RuntimeException("one parameter is null");
    }
}


type JsonModelLoader struct {

}
public static load(factory: org.kevoree.modeling.api.KView, payload: string, callback: (p : java.lang.Throwable) => void): void {
    if (payload == null) {
        callback(null);
    } else {
        var metaModel: org.kevoree.modeling.api.meta.MetaModel = factory.universe().model().metaModel();
        var lexer: org.kevoree.modeling.api.json.Lexer = new org.kevoree.modeling.api.json.Lexer(payload);
        var currentToken: org.kevoree.modeling.api.json.JsonToken = lexer.nextToken();
        if (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.LEFT_BRACKET) {
            callback(null);
        } else {
            var alls: java.util.List<java.util.Map<string, interface{}>> = new java.util.ArrayList<java.util.Map<string, interface{}>>();
            var content: java.util.Map<string, interface{}> = new java.util.HashMap<string, interface{}>();
            var currentAttributeName: string = null;
            var arrayPayload: java.util.Set<string> = null;
            currentToken = lexer.nextToken();
            while (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.EOF){
                if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.LEFT_BRACKET)) {
                    arrayPayload = new java.util.HashSet<string>();
                } else {
                    if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.RIGHT_BRACKET)) {
                        content.put(currentAttributeName, arrayPayload);
                        arrayPayload = null;
                        currentAttributeName = null;
                    } else {
                        if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.LEFT_BRACE)) {
                            content = new java.util.HashMap<string, interface{}>();
                        } else {
                            if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.RIGHT_BRACE)) {
                                alls.add(content);
                                content = new java.util.HashMap<string, interface{}>();
                            } else {
                                if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.VALUE)) {
                                    if (currentAttributeName == null) {
                                        currentAttributeName = currentToken.value().toString();
                                    } else {
                                        if (arrayPayload == null) {
                                            content.put(currentAttributeName, currentToken.value().toString());
                                            currentAttributeName = null;
                                        } else {
                                            arrayPayload.add(currentToken.value().toString());
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                currentToken = lexer.nextToken();
            }
            var mappedKeys: java.util.Map<int64, int64> = new java.util.HashMap<int64, int64>();
            for (var i: int = 0; i < alls.size(); i++) {
                try {
                    var elem: java.util.Map<string, interface{}> = alls.get(i);
                    var kid: int64 = java.lang.Long.parseLong(elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID).toString());
                    mappedKeys.put(kid, factory.universe().model().storage().nextObjectKey());
                } catch ($ex$) {
                    if ($ex$ instanceof java.lang.Exception) {
                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                        e.printStackTrace();
                    }
                 }
            }
            for (var i: int = 0; i < alls.size(); i++) {
                try {
                    var elem: java.util.Map<string, interface{}> = alls.get(i);
                    var kid: int64 = java.lang.Long.parseLong(elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID).toString());
                    var meta: string = elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META).toString();
                    var timeTree: org.kevoree.modeling.api.time.TimeTree = new org.kevoree.modeling.api.time.DefaultTimeTree();
                    timeTree.insert(factory.now());
                    var metaClass: org.kevoree.modeling.api.meta.MetaClass = metaModel.metaClass(meta);
                    var current: org.kevoree.modeling.api.KObject = (factory.(org.kevoree.modeling.api.abs.AbstractKView)).createProxy(metaClass, timeTree, mappedKeys.get(kid));
                    factory.universe().model().storage().initKObject(current, factory);
                    var raw: interface{}[] = factory.universe().model().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE);
                    var metaKeys: string[] = elem.keySet().toArray(new Array());
                    for (var h: int = 0; h < metaKeys.length; h++) {
                        var metaKey: string = metaKeys[h];
                        var payload_content: interface{} = elem.get(metaKey);
                        if (metaKey.equals(org.kevoree.modeling.api.json.JsonModelSerializer.INBOUNDS_META)) {
                            var inbounds: java.util.Set<int64> = new java.util.HashSet<int64>();
                            raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] = inbounds;
                            try {
                                var raw_keys: java.util.HashSet<string> = payload_content.(java.util.HashSet<string>);
                                var raw_keys_p: string[] = raw_keys.toArray(new Array());
                                for (var hh: int = 0; hh < raw_keys_p.length; hh++) {
                                    try {
                                        var converted: int64 = java.lang.Long.parseLong(raw_keys_p[hh]);
                                        if (mappedKeys.containsKey(converted)) {
                                            converted = mappedKeys.get(converted);
                                        }
                                        inbounds.add(converted);
                                    } catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                            e.printStackTrace();
                                        }
                                     }
                                }
                            } catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                    e.printStackTrace();
                                }
                             }
                        } else {
                            if (metaKey.equals(org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_META)) {
                                try {
                                    var raw_k: int64 = java.lang.Long.parseLong(payload_content.toString());
                                    if (mappedKeys.containsKey(raw_k)) {
                                        raw_k = mappedKeys.get(raw_k);
                                    }
                                    raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX] = raw_k;
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                        e.printStackTrace();
                                    }
                                 }
                            } else {
                                if (metaKey.equals(org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_REF_META)) {
                                    try {
                                        var parentRef_payload: string = payload_content.toString();
                                        var elems: string[] = parentRef_payload.split(org.kevoree.modeling.api.data.JsonRaw.SEP);
                                        if (elems.length == 2) {
                                            var foundMeta: org.kevoree.modeling.api.meta.MetaClass = metaModel.metaClass(elems[0].trim());
                                            if (foundMeta != null) {
                                                var metaReference: org.kevoree.modeling.api.meta.MetaReference = foundMeta.metaReference(elems[1].trim());
                                                if (metaReference != null) {
                                                    raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX] = metaReference;
                                                }
                                            }
                                        }
                                    } catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                            e.printStackTrace();
                                        }
                                     }
                                } else {
                                    if (metaKey.equals(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_ROOT)) {
                                        try {
                                            if ("true".equals(payload_content)) {
                                                raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = true;
                                            } else {
                                                raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = false;
                                            }
                                        } catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                e.printStackTrace();
                                            }
                                         }
                                    } else {
                                        if (metaKey.equals(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META)) {
                                        } else {
                                            var metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute = metaClass.metaAttribute(metaKey);
                                            var metaReference: org.kevoree.modeling.api.meta.MetaReference = metaClass.metaReference(metaKey);
                                            if (payload_content != null) {
                                                if (metaAttribute != null) {
                                                    raw[metaAttribute.index()] = metaAttribute.strategy().load(payload_content.toString(), metaAttribute, factory.now());
                                                } else {
                                                    if (metaReference != null) {
                                                        if (metaReference.single()) {
                                                            try {
                                                                var converted: int64 = java.lang.Long.parseLong(payload_content.toString());
                                                                if (mappedKeys.containsKey(converted)) {
                                                                    converted = mappedKeys.get(converted);
                                                                }
                                                                raw[metaReference.index()] = converted;
                                                            } catch ($ex$) {
                                                                if ($ex$ instanceof java.lang.Exception) {
                                                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                    e.printStackTrace();
                                                                }
                                                             }
                                                        } else {
                                                            try {
                                                                var convertedRaw: java.util.Set<int64> = new java.util.HashSet<int64>();
                                                                var plainRawSet: java.util.Set<string> = payload_content.(java.util.Set<string>);
                                                                var plainRawList: string[] = plainRawSet.toArray(new Array());
                                                                for (var l: int = 0; l < plainRawList.length; l++) {
                                                                    var plainRaw: string = plainRawList[l];
                                                                    try {
                                                                        var converted: int64 = java.lang.Long.parseLong(plainRaw);
                                                                        if (mappedKeys.containsKey(converted)) {
                                                                            converted = mappedKeys.get(converted);
                                                                        }
                                                                        convertedRaw.add(converted);
                                                                    } catch ($ex$) {
                                                                        if ($ex$ instanceof java.lang.Exception) {
                                                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                            e.printStackTrace();
                                                                        }
                                                                     }
                                                                }
                                                                raw[metaReference.index()] = convertedRaw;
                                                            } catch ($ex$) {
                                                                if ($ex$ instanceof java.lang.Exception) {
                                                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                    e.printStackTrace();
                                                                }
                                                             }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] == null) {
                        raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = false;
                    }
                    if (raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX].equals(true)) {
                        factory.setRoot(current, null);
                    }
                } catch ($ex$) {
                    if ($ex$ instanceof java.lang.Exception) {
                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                        e.printStackTrace();
                    }
                 }
            }
            if (callback != null) {
                callback(null);
            }
        }
    }
}


type JsonModelSerializer struct {

    public static KEY_META: string = "@meta";
    public static KEY_UUID: string = "@uuid";
    public static KEY_ROOT: string = "@root";
    public static PARENT_META: string = "@parent";
    public static PARENT_REF_META: string = "@ref";
    public static INBOUNDS_META: string = "@inbounds";
    public static TIME_META: string = "@time";
    public static DIM_META: string = "@universe";
}
public static serialize(model: org.kevoree.modeling.api.KObject, callback: (p : string, p1 : java.lang.Throwable) => void): void {
    var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
    builder.append("[\n");
    org.kevoree.modeling.api.json.JsonModelSerializer.printJSON(model, builder);
    model.visit( (elem : org.kevoree.modeling.api.KObject) => {
        builder.append(",\n");
        try {
            org.kevoree.modeling.api.json.JsonModelSerializer.printJSON(elem, builder);
        } catch ($ex$) {
            if ($ex$ instanceof java.lang.Exception) {
                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                e.printStackTrace();
                builder.append("{}");
            }
         }
        return org.kevoree.modeling.api.VisitResult.CONTINUE;
    },  (throwable : java.lang.Throwable) => {
        builder.append("\n]\n");
        callback(builder.toString(), throwable);
    }, org.kevoree.modeling.api.VisitRequest.ALL);
}

public static printJSON(elem: org.kevoree.modeling.api.KObject, builder: java.lang.StringBuilder): void {
    if (elem != null) {
        var raw: interface{}[] = elem.view().universe().model().storage().raw(elem, org.kevoree.modeling.api.data.AccessMode.READ);
        if (raw != null) {
            builder.append(org.kevoree.modeling.api.data.JsonRaw.encode(raw, elem.uuid(), elem.metaClass(), false));
        }
    }
}


type JsonString struct {

    private static ESCAPE_CHAR: char = '\\';
}
public static encodeBuffer(buffer: java.lang.StringBuilder, chain: string): void {
    if (chain == null) {
        return;
    }
    var i: int = 0;
    while (i < chain.length){
        var ch: char = chain.charAt(i);
        if (ch == '"') {
            buffer.append(JsonString.ESCAPE_CHAR);
            buffer.append('"');
        } else {
            if (ch == JsonString.ESCAPE_CHAR) {
                buffer.append(JsonString.ESCAPE_CHAR);
                buffer.append(JsonString.ESCAPE_CHAR);
            } else {
                if (ch == '\n') {
                    buffer.append(JsonString.ESCAPE_CHAR);
                    buffer.append('n');
                } else {
                    if (ch == '\r') {
                        buffer.append(JsonString.ESCAPE_CHAR);
                        buffer.append('r');
                    } else {
                        if (ch == '\t') {
                            buffer.append(JsonString.ESCAPE_CHAR);
                            buffer.append('t');
                        } else {
                            if (ch == '\u2028') {
                                buffer.append(JsonString.ESCAPE_CHAR);
                                buffer.append('u');
                                buffer.append('2');
                                buffer.append('0');
                                buffer.append('2');
                                buffer.append('8');
                            } else {
                                if (ch == '\u2029') {
                                    buffer.append(JsonString.ESCAPE_CHAR);
                                    buffer.append('u');
                                    buffer.append('2');
                                    buffer.append('0');
                                    buffer.append('2');
                                    buffer.append('9');
                                } else {
                                    buffer.append(ch);
                                }
                            }
                        }
                    }
                }
            }
        }
        i = i + 1;
    }
}

public static encode(chain: string): string {
    var sb: java.lang.StringBuilder = new java.lang.StringBuilder();
    org.kevoree.modeling.api.json.JsonString.encodeBuffer(sb, chain);
    return sb.toString();
}

public static unescape(src: string): string {
    if (src == null) {
        return null;
    }
    if (src.length == 0) {
        return src;
    }
    var builder: java.lang.StringBuilder = null;
    var i: int = 0;
    while (i < src.length){
        var current: char = src.charAt(i);
        if (current == JsonString.ESCAPE_CHAR) {
            if (builder == null) {
                builder = new java.lang.StringBuilder();
                builder.append(src.substring(0, i));
            }
            i++;
            var current2: char = src.charAt(i);
            switch (current2) {
                case '"': 
                builder.append('\"');
                break;
                case '\\': 
                builder.append(current2);
                break;
                case '/': 
                builder.append(current2);
                break;
                case 'b': 
                builder.append('\b');
                break;
                case 'f': 
                builder.append('\f');
                break;
                case 'n': 
                builder.append('\n');
                break;
                case 'r': 
                builder.append('\r');
                break;
                case 't': 
                builder.append('\t');
                break;
            }
        } else {
            if (builder != null) {
                builder = builder.append(current);
            }
        }
        i++;
    }
    if (builder != null) {
        return builder.toString();
    } else {
        return src;
    }
}


type JsonToken struct {

    private _tokenType: org.kevoree.modeling.api.json.Type;
    private _value: interface{};
}
constructor(p_tokenType: org.kevoree.modeling.api.json.Type, p_value: interface{}) {
    this._tokenType = p_tokenType;
    this._value = p_value;
}

public toString(): string {
    var v: string;
    if (this._value != null) {
        v = " (" + this._value + ")";
    } else {
        v = "";
    }
    var result: string = this._tokenType.toString() + v;
    return result;
}

public tokenType(): org.kevoree.modeling.api.json.Type {
    return this._tokenType;
}

public value(): interface{} {
    return this._value;
}


type Lexer struct {

    private bytes: string;
    private EOF: org.kevoree.modeling.api.json.JsonToken;
    private BOOLEAN_LETTERS: java.util.HashSet<char> = null;
    private DIGIT: java.util.HashSet<char> = null;
    private index: int = 0;
    private static DEFAULT_BUFFER_SIZE: int = 1024 * 4;
}
constructor(payload: string) {
    this.bytes = payload;
    this.EOF = new org.kevoree.modeling.api.json.JsonToken(org.kevoree.modeling.api.json.Type.EOF, null);
}

public isSpace(c: char): bool {
    return c == ' ' || c == '\r' || c == '\n' || c == '\t';
}

private nextChar(): char {
    return this.bytes.charAt(this.index++);
}

private peekChar(): char {
    return this.bytes.charAt(this.index);
}

private isDone(): bool {
    return this.index >= this.bytes.length;
}

private isBooleanLetter(c: char): bool {
    if (this.BOOLEAN_LETTERS == null) {
        this.BOOLEAN_LETTERS = new java.util.HashSet<char>();
        this.BOOLEAN_LETTERS.add('f');
        this.BOOLEAN_LETTERS.add('a');
        this.BOOLEAN_LETTERS.add('l');
        this.BOOLEAN_LETTERS.add('s');
        this.BOOLEAN_LETTERS.add('e');
        this.BOOLEAN_LETTERS.add('t');
        this.BOOLEAN_LETTERS.add('r');
        this.BOOLEAN_LETTERS.add('u');
    }
    return this.BOOLEAN_LETTERS.contains(c);
}

private isDigit(c: char): bool {
    if (this.DIGIT == null) {
        this.DIGIT = new java.util.HashSet<char>();
        this.DIGIT.add('0');
        this.DIGIT.add('1');
        this.DIGIT.add('2');
        this.DIGIT.add('3');
        this.DIGIT.add('4');
        this.DIGIT.add('5');
        this.DIGIT.add('6');
        this.DIGIT.add('7');
        this.DIGIT.add('8');
        this.DIGIT.add('9');
    }
    return this.DIGIT.contains(c);
}

private isValueLetter(c: char): bool {
    return c == '-' || c == '+' || c == '.' || this.isDigit(c) || this.isBooleanLetter(c);
}

public nextToken(): org.kevoree.modeling.api.json.JsonToken {
    if (this.isDone()) {
        return this.EOF;
    }
    var tokenType: org.kevoree.modeling.api.json.Type = org.kevoree.modeling.api.json.Type.EOF;
    var c: char = this.nextChar();
    var currentValue: java.lang.StringBuilder = new java.lang.StringBuilder();
    var jsonValue: interface{} = null;
    while (!this.isDone() && this.isSpace(c)){
        c = this.nextChar();
    }
    if ('"' == c) {
        tokenType = org.kevoree.modeling.api.json.Type.VALUE;
        if (!this.isDone()) {
            c = this.nextChar();
            while (this.index < this.bytes.length && c != '"'){
                currentValue.append(c);
                if (c == '\\' && this.index < this.bytes.length) {
                    c = this.nextChar();
                    currentValue.append(c);
                }
                c = this.nextChar();
            }
            jsonValue = currentValue.toString();
        }
    } else {
        if ('{' == c) {
            tokenType = org.kevoree.modeling.api.json.Type.LEFT_BRACE;
        } else {
            if ('}' == c) {
                tokenType = org.kevoree.modeling.api.json.Type.RIGHT_BRACE;
            } else {
                if ('[' == c) {
                    tokenType = org.kevoree.modeling.api.json.Type.LEFT_BRACKET;
                } else {
                    if (']' == c) {
                        tokenType = org.kevoree.modeling.api.json.Type.RIGHT_BRACKET;
                    } else {
                        if (':' == c) {
                            tokenType = org.kevoree.modeling.api.json.Type.COLON;
                        } else {
                            if (',' == c) {
                                tokenType = org.kevoree.modeling.api.json.Type.COMMA;
                            } else {
                                if (!this.isDone()) {
                                    while (this.isValueLetter(c)){
                                        currentValue.append(c);
                                        if (!this.isValueLetter(this.peekChar())) {
                                            break;
                                        } else {
                                            c = this.nextChar();
                                        }
                                    }
                                    var v: string = currentValue.toString();
                                    if ("true".equals(v.toLowerCase())) {
                                        jsonValue = true;
                                    } else {
                                        if ("false".equals(v.toLowerCase())) {
                                            jsonValue = false;
                                        } else {
                                            jsonValue = v.toLowerCase();
                                        }
                                    }
                                    tokenType = org.kevoree.modeling.api.json.Type.VALUE;
                                } else {
                                    tokenType = org.kevoree.modeling.api.json.Type.EOF;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return new org.kevoree.modeling.api.json.JsonToken(tokenType, jsonValue);
}


type Type struct {

    public static VALUE: Type = new Type(0);
    public static LEFT_BRACE: Type = new Type(1);
    public static RIGHT_BRACE: Type = new Type(2);
    public static LEFT_BRACKET: Type = new Type(3);
    public static RIGHT_BRACKET: Type = new Type(4);
    public static COMMA: Type = new Type(5);
    public static COLON: Type = new Type(6);
    public static EOF: Type = new Type(42);
    private _value: int;
}
constructor(p_value: int) {
    this._value = p_value;
}

public equals(other: any): boolean {
    return this == other;
}
public static _TypeVALUES : Type[] = [
    Type.VALUE
    ,Type.LEFT_BRACE
    ,Type.RIGHT_BRACE
    ,Type.LEFT_BRACKET
    ,Type.RIGHT_BRACKET
    ,Type.COMMA
    ,Type.COLON
    ,Type.EOF
];
public static values():Type[]{
    return Type._TypeVALUES;
}

type Meta interface {
    metaName() : string
    index() : int
}
type MetaAttribute interface {
    key() : bool
    metaType() : org.kevoree.modeling.api.KMetaType
    strategy() : org.kevoree.modeling.api.extrapolation.Extrapolation
    precision() : double
    setExtrapolation(extrapolation : org.kevoree.modeling.api.extrapolation.Extrapolation) : void
    metaName() : string
    index() : int
}
type MetaClass interface {
    metaAttributes() : org.kevoree.modeling.api.meta.MetaAttribute[]
    metaReferences() : org.kevoree.modeling.api.meta.MetaReference[]
    metaOperations() : org.kevoree.modeling.api.meta.MetaOperation[]
    metaAttribute(name : string) : org.kevoree.modeling.api.meta.MetaAttribute
    metaReference(name : string) : org.kevoree.modeling.api.meta.MetaReference
    metaOperation(name : string) : org.kevoree.modeling.api.meta.MetaOperation
    metaName() : string
    index() : int
}
type MetaModel interface {
    metaClasses() : org.kevoree.modeling.api.meta.MetaClass[]
    metaClass(name : string) : org.kevoree.modeling.api.meta.MetaClass
    metaName() : string
    index() : int
}
type MetaOperation interface {
    origin() : org.kevoree.modeling.api.meta.Meta
    metaName() : string
    index() : int
}
type MetaReference interface {
    contained() : bool
    single() : bool
    metaType() : org.kevoree.modeling.api.meta.MetaClass
    opposite() : org.kevoree.modeling.api.meta.MetaReference
    origin() : org.kevoree.modeling.api.meta.MetaClass
    metaName() : string
    index() : int
}
type PrimitiveMetaTypes struct {

    public static STRING: org.kevoree.modeling.api.KMetaType = new org.kevoree.modeling.api.abs.AbstractKDataType("STRING", false);
    public static LONG: org.kevoree.modeling.api.KMetaType = new org.kevoree.modeling.api.abs.AbstractKDataType("LONG", false);
    public static INT: org.kevoree.modeling.api.KMetaType = new org.kevoree.modeling.api.abs.AbstractKDataType("INT", false);
    public static BOOL: org.kevoree.modeling.api.KMetaType = new org.kevoree.modeling.api.abs.AbstractKDataType("BOOL", false);
    public static SHORT: org.kevoree.modeling.api.KMetaType = new org.kevoree.modeling.api.abs.AbstractKDataType("SHORT", false);
    public static DOUBLE: org.kevoree.modeling.api.KMetaType = new org.kevoree.modeling.api.abs.AbstractKDataType("DOUBLE", false);
    public static FLOAT: org.kevoree.modeling.api.KMetaType = new org.kevoree.modeling.api.abs.AbstractKDataType("FLOAT", false);
}

type DefaultModelCloner struct {

}
public static clone<A extends org.kevoree.modeling.api.KObject> (originalObject: A, callback: (p : A) => void): void {
    if (originalObject == null || originalObject.view() == null || originalObject.view().universe() == null) {
        callback(null);
    } else {
        originalObject.view().universe().split( (o : org.kevoree.modeling.api.KUniverse<any, any, any>) => {
            o.time(originalObject.view().now()).lookup(originalObject.uuid(),  (clonedObject : org.kevoree.modeling.api.KObject) => {
                callback(clonedObject.(A));
            });
        });
    }
}


type DefaultModelCompare struct {

}
public static diff(origin: org.kevoree.modeling.api.KObject, target: org.kevoree.modeling.api.KObject, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
    org.kevoree.modeling.api.operation.DefaultModelCompare.internal_diff(origin, target, false, false, callback);
}

public static merge(origin: org.kevoree.modeling.api.KObject, target: org.kevoree.modeling.api.KObject, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
    org.kevoree.modeling.api.operation.DefaultModelCompare.internal_diff(origin, target, false, true, callback);
}

public static intersection(origin: org.kevoree.modeling.api.KObject, target: org.kevoree.modeling.api.KObject, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
    org.kevoree.modeling.api.operation.DefaultModelCompare.internal_diff(origin, target, true, false, callback);
}

private static internal_diff(origin: org.kevoree.modeling.api.KObject, target: org.kevoree.modeling.api.KObject, inter: bool, merge: bool, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
    var traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
    var tracesRef: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
    var objectsMap: java.util.Map<int64, org.kevoree.modeling.api.KObject> = new java.util.HashMap<int64, org.kevoree.modeling.api.KObject>();
    traces.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(origin, target, inter, merge, false, true));
    tracesRef.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(origin, target, inter, merge, true, false));
    origin.visit( (elem : org.kevoree.modeling.api.KObject) => {
        objectsMap.put(elem.uuid(), elem);
        return org.kevoree.modeling.api.VisitResult.CONTINUE;
    },  (throwable : java.lang.Throwable) => {
        if (throwable != null) {
            throwable.printStackTrace();
            callback(null);
        } else {
            target.visit( (elem : org.kevoree.modeling.api.KObject) => {
                var childUUID: int64 = elem.uuid();
                if (objectsMap.containsKey(childUUID)) {
                    if (inter) {
                        traces.add(new org.kevoree.modeling.api.trace.ModelNewTrace(elem.uuid(), elem.metaClass()));
                        traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.parentUuid(), elem.referenceInParent(), elem.uuid()));
                    }
                    traces.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(objectsMap.get(childUUID), elem, inter, merge, false, true));
                    tracesRef.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(objectsMap.get(childUUID), elem, inter, merge, true, false));
                    objectsMap.remove(childUUID);
                } else {
                    if (!inter) {
                        traces.add(new org.kevoree.modeling.api.trace.ModelNewTrace(elem.uuid(), elem.metaClass()));
                        traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.parentUuid(), elem.referenceInParent(), elem.uuid()));
                        traces.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(elem, elem, true, merge, false, true));
                        tracesRef.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(elem, elem, true, merge, true, false));
                    }
                }
                return org.kevoree.modeling.api.VisitResult.CONTINUE;
            },  (throwable : java.lang.Throwable) => {
                if (throwable != null) {
                    throwable.printStackTrace();
                    callback(null);
                } else {
                    traces.addAll(tracesRef);
                    if (!inter && !merge) {
                        var diffChildKeys: int64[] = objectsMap.keySet().toArray(new Array());
                        for (var i: int = 0; i < diffChildKeys.length; i++) {
                            var diffChildKey: int64 = diffChildKeys[i];
                            var diffChild: org.kevoree.modeling.api.KObject = objectsMap.get(diffChildKey);
                            var src: int64 = diffChild.parentUuid();
                            traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(src, diffChild.referenceInParent(), diffChild.uuid()));
                        }
                    }
                    callback(new org.kevoree.modeling.api.trace.TraceSequence().populate(traces));
                }
            }, org.kevoree.modeling.api.VisitRequest.CONTAINED);
        }
    }, org.kevoree.modeling.api.VisitRequest.CONTAINED);
}

private static internal_createTraces(current: org.kevoree.modeling.api.KObject, sibling: org.kevoree.modeling.api.KObject, inter: bool, merge: bool, references: bool, attributes: bool): java.util.List<org.kevoree.modeling.api.trace.ModelTrace> {
    var traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
    var values: java.util.Map<org.kevoree.modeling.api.meta.MetaAttribute, string> = new java.util.HashMap<org.kevoree.modeling.api.meta.MetaAttribute, string>();
    if (attributes) {
        if (current != null) {
            current.visitAttributes( (metaAttribute : org.kevoree.modeling.api.meta.MetaAttribute, value : interface{}) => {
                if (value == null) {
                    values.put(metaAttribute, null);
                } else {
                    values.put(metaAttribute, value.toString());
                }
            });
        }
        if (sibling != null) {
            sibling.visitAttributes( (metaAttribute : org.kevoree.modeling.api.meta.MetaAttribute, value : interface{}) => {
                var flatAtt2: string = null;
                if (value != null) {
                    flatAtt2 = value.toString();
                }
                var flatAtt1: string = values.get(metaAttribute);
                var isEquals: bool = true;
                if (flatAtt1 == null) {
                    if (flatAtt2 == null) {
                        isEquals = true;
                    } else {
                        isEquals = false;
                    }
                } else {
                    isEquals = flatAtt1.equals(flatAtt2);
                }
                if (isEquals) {
                    if (inter) {
                        traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(current.uuid(), metaAttribute, flatAtt2));
                    }
                } else {
                    if (!inter) {
                        traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(current.uuid(), metaAttribute, flatAtt2));
                    }
                }
                values.remove(metaAttribute);
            });
        }
        if (!inter && !merge && !values.isEmpty()) {
            var mettaAttributes: org.kevoree.modeling.api.meta.MetaAttribute[] = values.keySet().toArray(new Array());
            for (var i: int = 0; i < mettaAttributes.length; i++) {
                var hashLoopRes: org.kevoree.modeling.api.meta.MetaAttribute = mettaAttributes[i];
                traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(current.uuid(), hashLoopRes, null));
                values.remove(hashLoopRes);
            }
        }
    }
    var valuesRef: java.util.Map<org.kevoree.modeling.api.meta.MetaReference, interface{}> = new java.util.HashMap<org.kevoree.modeling.api.meta.MetaReference, interface{}>();
    if (references) {
        for (var i: int = 0; i < current.metaClass().metaReferences().length; i++) {
            var reference: org.kevoree.modeling.api.meta.MetaReference = current.metaClass().metaReferences()[i];
            var payload: interface{} = current.view().universe().model().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[reference.index()];
            valuesRef.put(reference, payload);
        }
        if (sibling != null) {
            for (var i: int = 0; i < sibling.metaClass().metaReferences().length; i++) {
                var reference: org.kevoree.modeling.api.meta.MetaReference = sibling.metaClass().metaReferences()[i];
                var payload2: interface{} = sibling.view().universe().model().storage().raw(sibling, org.kevoree.modeling.api.data.AccessMode.READ)[reference.index()];
                var payload1: interface{} = valuesRef.get(reference);
                if (reference.single()) {
                    var isEquals: bool = true;
                    if (payload1 == null) {
                        if (payload2 == null) {
                            isEquals = true;
                        } else {
                            isEquals = false;
                        }
                    } else {
                        isEquals = payload1.equals(payload2);
                    }
                    if (isEquals) {
                        if (inter) {
                            if (payload2 != null) {
                                traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, payload2.(int64)));
                            }
                        }
                    } else {
                        if (!inter) {
                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, payload2.(int64)));
                        }
                    }
                } else {
                    if (payload1 == null && payload2 != null) {
                        var siblingToAdd: int64[] = (payload2.(java.util.Set<int64>)).toArray(new Array());
                        for (var j: int = 0; j < siblingToAdd.length; j++) {
                            var siblingElem: int64 = siblingToAdd[j];
                            if (!inter) {
                                traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, siblingElem));
                            }
                        }
                    } else {
                        if (payload1 != null) {
                            var currentPaths: int64[] = (payload1.(java.util.Set<int64>)).toArray(new Array());
                            for (var j: int = 0; j < currentPaths.length; j++) {
                                var currentPath: int64 = currentPaths[j];
                                var isFound: bool = false;
                                if (payload2 != null) {
                                    var siblingPaths: java.util.Set<int64> = payload2.(java.util.Set<int64>);
                                    isFound = siblingPaths.contains(currentPath);
                                }
                                if (isFound) {
                                    if (inter) {
                                        traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, currentPath));
                                    }
                                } else {
                                    if (!inter) {
                                        traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(current.uuid(), reference, currentPath));
                                    }
                                }
                            }
                        }
                    }
                }
                valuesRef.remove(reference);
            }
            if (!inter && !merge && !valuesRef.isEmpty()) {
                var metaReferences: org.kevoree.modeling.api.meta.MetaReference[] = valuesRef.keySet().toArray(new Array());
                for (var i: int = 0; i < metaReferences.length; i++) {
                    var hashLoopResRef: org.kevoree.modeling.api.meta.MetaReference = metaReferences[i];
                    var payload: interface{} = valuesRef.get(hashLoopResRef);
                    if (payload != null) {
                        if (payload instanceof java.util.Set) {
                            var toRemoveSet: int64[] = (payload.(java.util.Set<int64>)).toArray(new Array());
                            for (var j: int = 0; j < toRemoveSet.length; j++) {
                                var toRemovePath: int64 = toRemoveSet[j];
                                traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(current.uuid(), hashLoopResRef, toRemovePath));
                            }
                        } else {
                            traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(current.uuid(), hashLoopResRef, payload.(int64)));
                        }
                    }
                }
            }
        }
    }
    return traces;
}


type PolynomialModel interface {
    extrapolate(time : int64) : double
    insert(time : int64,value : double) : bool
    lastIndex() : int64
    save() : string
    load(payload : string) : void
    isDirty() : bool
}
type DoublePolynomialModel struct implements org.kevoree.modeling.api.polynomial.PolynomialModel {

    private static sep: string = "/";
    public static sepW: string = "%";
    private _prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization;
    private _maxDegree: int;
    private _toleratedError: double;
    private _isDirty: bool = false;
    private _weights: double[];
    private _polyTime: org.kevoree.modeling.api.polynomial.doublepolynomial.TimePolynomial;
}
constructor(p_timeOrigin: int64, p_toleratedError: double, p_maxDegree: int, p_prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization) {
    this._polyTime = new org.kevoree.modeling.api.polynomial.doublepolynomial.TimePolynomial(p_timeOrigin);
    this._prioritization = p_prioritization;
    this._maxDegree = p_maxDegree;
    this._toleratedError = p_toleratedError;
}

public degree(): int {
    if (this._weights == null) {
        return -1;
    } else {
        return this._weights.length - 1;
    }
}

public timeOrigin(): int64 {
    return this._polyTime.timeOrigin();
}

public comparePolynome(p2: org.kevoree.modeling.api.polynomial.doublepolynomial.DoublePolynomialModel, err: double): bool {
    if (this._weights.length != p2._weights.length) {
        return false;
    }
    for (var i: int = 0; i < this._weights.length; i++) {
        if (Math.abs(this._weights[i] - this._weights[i]) > err) {
            return false;
        }
    }
    return true;
}

public extrapolate(time: int64): double {
    return this.test_extrapolate(this._polyTime.denormalize(time), this._weights);
}

public insert(time: int64, value: double): bool {
    if (this._weights == null) {
        this.internal_feed(time, value);
        this._isDirty = true;
        return true;
    }
    if (this._polyTime.insert(time)) {
        var maxError: double = this.maxErr();
        if (Math.abs(this.extrapolate(time) - value) <= maxError) {
            return true;
        }
        var deg: int = this.degree();
        var newMaxDegree: int = Math.min(this._polyTime.nbSamples() - 1, this._maxDegree);
        if (deg < newMaxDegree) {
            deg++;
            var ss: int = Math.min(deg * 2, this._polyTime.nbSamples() - 1);
            var times: double[] = new Array();
            var values: double[] = new Array();
            var current: int = this._polyTime.nbSamples() - 1;
            for (var i: int = 0; i < ss; i++) {
                times[i] = this._polyTime.getNormalizedTime((i * current / ss).(int));
                values[i] = this.test_extrapolate(times[i], this._weights);
            }
            times[ss] = this._polyTime.denormalize(time);
            values[ss] = value;
            var pf: org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml = new org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml(deg);
            pf.fit(times, values);
            if (this.maxError(pf.getCoef(), time, value) <= maxError) {
                this._weights = new Array();
                for (var i: int = 0; i < pf.getCoef().length; i++) {
                    this._weights[i] = pf.getCoef()[i];
                }
                this._isDirty = true;
                return true;
            }
        }
        this._polyTime.removeLast();
        return false;
    } else {
        return false;
    }
}

public lastIndex(): int64 {
    return this._polyTime.lastIndex();
}

public save(): string {
    var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
    for (var i: int = 0; i < this._weights.length; i++) {
        if (i != 0) {
            builder.append(DoublePolynomialModel.sepW);
        }
        builder.append(this._weights[i] + "");
    }
    builder.append(DoublePolynomialModel.sep);
    builder.append(this._polyTime.save());
    this._isDirty = false;
    return builder.toString();
}

public load(payload: string): void {
    var parts: string[] = payload.split(DoublePolynomialModel.sep);
    if (parts.length == 2) {
        var welems: string[] = parts[0].split(DoublePolynomialModel.sepW);
        this._weights = new Array();
        for (var i: int = 0; i < welems.length; i++) {
            this._weights[i] = java.lang.Double.parseDouble(welems[i]);
        }
        this._polyTime.load(parts[1]);
    } else {
        System.err.println("Bad Polynomial String " + payload);
    }
    this._isDirty = false;
}

public isDirty(): bool {
    return this._isDirty || this._polyTime.isDirty();
}

private maxErr(): double {
    var tol: double = this._toleratedError;
    if (this._prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.HIGHDEGREES) {
        tol = this._toleratedError / Math.pow(2, this._maxDegree - this.degree());
    } else {
        if (this._prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES) {
            tol = this._toleratedError / Math.pow(2, this.degree() + 0.5);
        } else {
            if (this._prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.SAMEPRIORITY) {
                tol = this._toleratedError * this.degree() * 2 / (2 * this._maxDegree);
            }
        }
    }
    return tol;
}

private internal_feed(time: int64, value: double): void {
    if (this._weights == null) {
        this._weights = new Array();
        this._weights[0] = value;
        this._polyTime.insert(time);
    }
}

private maxError(computedWeights: double[], time: int64, value: double): double {
    var maxErr: double = 0;
    var temp: double;
    var ds: double;
    for (var i: int = 0; i < this._polyTime.nbSamples() - 1; i++) {
        ds = this._polyTime.getNormalizedTime(i);
        var val: double = this.test_extrapolate(ds, computedWeights);
        temp = Math.abs(val - this.test_extrapolate(ds, this._weights));
        if (temp > maxErr) {
            maxErr = temp;
        }
    }
    temp = Math.abs(this.test_extrapolate(this._polyTime.denormalize(time), computedWeights) - value);
    if (temp > maxErr) {
        maxErr = temp;
    }
    return maxErr;
}

private test_extrapolate(time: double, weights: double[]): double {
    var result: double = 0;
    var power: double = 1;
    for (var j: int = 0; j < weights.length; j++) {
        result += weights[j] * power;
        power = power * time;
    }
    return result;
}


type TimePolynomial struct {

    private static toleratedErrorRatio: int = 10;
    private _timeOrigin: int64;
    private _isDirty: bool = false;
    private static maxTimeDegree: int = 20;
    private _weights: double[];
    private _nbSamples: int;
    private _samplingPeriod: int64;
}
constructor(p_timeOrigin: int64) {
    this._timeOrigin = p_timeOrigin;
}

public timeOrigin(): int64 {
    return this._timeOrigin;
}

public samplingPeriod(): int64 {
    return this._samplingPeriod;
}

public weights(): double[] {
    return this._weights;
}

public degree(): int {
    if (this._weights == null) {
        return -1;
    } else {
        return this._weights.length - 1;
    }
}

public denormalize(p_time: int64): double {
    return ((p_time - this._timeOrigin).(double)) / this._samplingPeriod;
}

public getNormalizedTime(id: int): double {
    var result: double = 0;
    var power: double = 1;
    for (var j: int = 0; j < this._weights.length; j++) {
        result += this._weights[j] * power;
        power = power * id;
    }
    return result;
}

public extrapolate(id: int): int64 {
    return this.test_extrapolate(id, this._weights);
}

public nbSamples(): int {
    return this._nbSamples;
}

public insert(time: int64): bool {
    if (this._weights == null) {
        this._timeOrigin = time;
        this._weights = new Array();
        this._weights[0] = 0;
        this._nbSamples = 1;
        this._isDirty = true;
        return true;
    }
    if (this._nbSamples == 1) {
        this._samplingPeriod = time - this._timeOrigin;
        this._weights = new Array();
        this._weights[0] = 0;
        this._weights[1] = 1;
        this._nbSamples = 2;
        this._isDirty = true;
        return true;
    }
    if (time > this.extrapolate(this._nbSamples - 1)) {
        var maxError: double = this._samplingPeriod / TimePolynomial.toleratedErrorRatio;
        if (Math.abs(this.extrapolate(this._nbSamples) - time) <= maxError) {
            this._nbSamples++;
            this._isDirty = true;
            return true;
        }
        var deg: int = this.degree();
        var newMaxDegree: int = Math.min(this._nbSamples, TimePolynomial.maxTimeDegree);
        while (deg < newMaxDegree){
            deg++;
            var ss: int = Math.min(deg * 2, this._nbSamples);
            var ids: double[] = new Array();
            var times: double[] = new Array();
            var idtemp: int;
            for (var i: int = 0; i < ss; i++) {
                idtemp = (i * this._nbSamples / ss).(int);
                ids[i] = idtemp;
                times[i] = (this.extrapolate(idtemp) - this._timeOrigin) / (this._samplingPeriod);
            }
            ids[ss] = this._nbSamples;
            times[ss] = (time - this._timeOrigin) / (this._samplingPeriod);
            var pf: org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml = new org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml(deg);
            pf.fit(ids, times);
            if (this.maxError(pf.getCoef(), this._nbSamples, time) <= maxError) {
                this._weights = new Array();
                for (var i: int = 0; i < pf.getCoef().length; i++) {
                    this._weights[i] = pf.getCoef()[i];
                }
                this._nbSamples++;
                this._isDirty = true;
                return true;
            }
        }
        return false;
    } else {
    }
    return false;
}

private maxError(computedWeights: double[], lastId: int, newtime: int64): int64 {
    var maxErr: int64 = 0;
    var time: int64;
    var temp: int64;
    for (var i: int = 0; i < lastId; i++) {
        time = this.test_extrapolate(i, computedWeights);
        temp = Math.abs(time - this.extrapolate(i));
        if (temp > maxErr) {
            maxErr = temp;
        }
    }
    temp = Math.abs(this.test_extrapolate(this._nbSamples, computedWeights) - newtime);
    if (temp > maxErr) {
        maxErr = temp;
    }
    return maxErr;
}

private test_extrapolate(id: int, newWeights: double[]): int64 {
    var result: double = 0;
    var power: double = 1;
    for (var j: int = 0; j < newWeights.length; j++) {
        result += newWeights[j] * power;
        power = power * id;
    }
    result = result * (this._samplingPeriod) + this._timeOrigin;
    return result.(int64);
}

public removeLast(): void {
    this._nbSamples = this._nbSamples - 1;
}

public lastIndex(): int64 {
    if (this._nbSamples > 0) {
        return this.extrapolate(this._nbSamples - 1);
    }
    return -1;
}

public save(): string {
    var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
    for (var i: int = 0; i < this._weights.length; i++) {
        if (i != 0) {
            builder.append(org.kevoree.modeling.api.polynomial.doublepolynomial.DoublePolynomialModel.sepW);
        }
        builder.append(this._weights[i] + "");
    }
    builder.append(org.kevoree.modeling.api.polynomial.doublepolynomial.DoublePolynomialModel.sepW);
    builder.append(this._nbSamples);
    builder.append(org.kevoree.modeling.api.polynomial.doublepolynomial.DoublePolynomialModel.sepW);
    builder.append(this._samplingPeriod);
    this._isDirty = false;
    return builder.toString();
}

public load(payload: string): void {
    var parts: string[] = payload.split(org.kevoree.modeling.api.polynomial.doublepolynomial.DoublePolynomialModel.sepW);
    this._weights = new Array();
    for (var i: int = 0; i < parts.length - 2; i++) {
        this._weights[i] = java.lang.Double.parseDouble(parts[i]);
    }
    this._nbSamples = java.lang.Integer.parseInt(parts[parts.length - 1]);
    this._samplingPeriod = java.lang.Integer.parseInt(parts[parts.length - 2]);
    this._isDirty = false;
}

public isDirty(): bool {
    return this._isDirty;
}


type SimplePolynomialModel struct implements org.kevoree.modeling.api.polynomial.PolynomialModel {

    private weights: double[];
    private timeOrigin: int64;
    private samples: java.util.List<org.kevoree.modeling.api.polynomial.util.DataSample> = new java.util.ArrayList<org.kevoree.modeling.api.polynomial.util.DataSample>();
    private degradeFactor: int;
    private prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization;
    private maxDegree: int;
    private toleratedError: double;
    private _lastIndex: int64 = -1;
    private static sep: string = "/";
    private _isDirty: bool = false;
}
constructor(timeOrigin: int64, toleratedError: double, maxDegree: int, prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization) {
    this.timeOrigin = timeOrigin;
    this.degradeFactor = 1;
    this.prioritization = prioritization;
    this.maxDegree = maxDegree;
    this.toleratedError = toleratedError;
}

public getSamples(): java.util.List<org.kevoree.modeling.api.polynomial.util.DataSample> {
    return this.samples;
}

public getDegree(): int {
    if (this.weights == null) {
        return -1;
    } else {
        return this.weights.length - 1;
    }
}

public getTimeOrigin(): int64 {
    return this.timeOrigin;
}

private getMaxErr(degree: int, toleratedError: double, maxDegree: int, prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization): double {
    var tol: double = toleratedError;
    if (prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.HIGHDEGREES) {
        tol = toleratedError / Math.pow(2, maxDegree - degree);
    } else {
        if (prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES) {
            tol = toleratedError / Math.pow(2, degree + 0.5);
        } else {
            if (prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.SAMEPRIORITY) {
                tol = toleratedError * degree * 2 / (2 * maxDegree);
            }
        }
    }
    return tol;
}

private internal_feed(time: int64, value: double): void {
    if (this.weights == null) {
        this.weights = new Array();
        this.weights[0] = value;
        this.timeOrigin = time;
        this.samples.add(new org.kevoree.modeling.api.polynomial.util.DataSample(time, value));
    }
}

private maxError(computedWeights: double[], time: int64, value: double): double {
    var maxErr: double = 0;
    var temp: double = 0;
    var ds: org.kevoree.modeling.api.polynomial.util.DataSample;
    for (var i: int = 0; i < this.samples.size(); i++) {
        ds = this.samples.get(i);
        var val: double = this.internal_extrapolate(ds.time, computedWeights);
        temp = Math.abs(val - ds.value);
        if (temp > maxErr) {
            maxErr = temp;
        }
    }
    temp = Math.abs(this.internal_extrapolate(time, computedWeights) - value);
    if (temp > maxErr) {
        maxErr = temp;
    }
    return maxErr;
}

public comparePolynome(p2: org.kevoree.modeling.api.polynomial.simplepolynomial.SimplePolynomialModel, err: double): bool {
    if (this.weights.length != p2.weights.length) {
        return false;
    }
    for (var i: int = 0; i < this.weights.length; i++) {
        if (Math.abs(this.weights[i] - this.weights[i]) > err) {
            return false;
        }
    }
    return true;
}

private internal_extrapolate(time: int64, weights: double[]): double {
    var result: double = 0;
    var t: double = ((time - this.timeOrigin).(double)) / this.degradeFactor;
    var power: double = 1;
    for (var j: int = 0; j < weights.length; j++) {
        result += weights[j] * power;
        power = power * t;
    }
    return result;
}

public extrapolate(time: int64): double {
    return this.internal_extrapolate(time, this.weights);
}

public insert(time: int64, value: double): bool {
    if (this.weights == null) {
        this.internal_feed(time, value);
        this._lastIndex = time;
        this._isDirty = true;
        return true;
    }
    var maxError: double = this.getMaxErr(this.getDegree(), this.toleratedError, this.maxDegree, this.prioritization);
    if (Math.abs(this.extrapolate(time) - value) <= maxError) {
        this.samples.add(new org.kevoree.modeling.api.polynomial.util.DataSample(time, value));
        this._lastIndex = time;
        return true;
    }
    var deg: int = this.getDegree();
    if (deg < this.maxDegree) {
        deg++;
        var ss: int = Math.min(deg * 2, this.samples.size());
        var times: double[] = new Array();
        var values: double[] = new Array();
        var current: int = this.samples.size();
        for (var i: int = 0; i < ss; i++) {
            var index: int = Math.round(i * current / ss);
            var ds: org.kevoree.modeling.api.polynomial.util.DataSample = this.samples.get(index);
            times[i] = ((ds.time - this.timeOrigin).(double)) / this.degradeFactor;
            values[i] = ds.value;
        }
        times[ss] = ((time - this.timeOrigin).(double)) / this.degradeFactor;
        values[ss] = value;
        var pf: org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml = new org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml(deg);
        pf.fit(times, values);
        if (this.maxError(pf.getCoef(), time, value) <= maxError) {
            this.weights = new Array();
            for (var i: int = 0; i < pf.getCoef().length; i++) {
                this.weights[i] = pf.getCoef()[i];
            }
            this.samples.add(new org.kevoree.modeling.api.polynomial.util.DataSample(time, value));
            this._lastIndex = time;
            this._isDirty = true;
            return true;
        }
    }
    return false;
}

public lastIndex(): int64 {
    return this._lastIndex;
}

public save(): string {
    var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
    for (var i: int = 0; i < this.weights.length; i++) {
        if (i != 0) {
            builder.append(SimplePolynomialModel.sep);
        }
        builder.append(this.weights[i] + "");
    }
    this._isDirty = false;
    return builder.toString();
}

public load(payload: string): void {
    var elems: string[] = payload.split(SimplePolynomialModel.sep);
    this.weights = new Array();
    for (var i: int = 0; i < elems.length; i++) {
        this.weights[i] = java.lang.Double.parseDouble(elems[i]);
    }
    this._isDirty = false;
}

public isDirty(): bool {
    return this._isDirty;
}


type AdjLinearSolverQr struct {

    public numRows: int;
    public numCols: int;
    private decomposer: org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64;
    public maxRows: int = -1;
    public maxCols: int = -1;
    public Q: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
    public R: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
    private Y: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
    private Z: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
}
public setA(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): bool {
    if (A.numRows > this.maxRows || A.numCols > this.maxCols) {
        this.setMaxSize(A.numRows, A.numCols);
    }
    this.numRows = A.numRows;
    this.numCols = A.numCols;
    if (!this.decomposer.decompose(A)) {
        return false;
    }
    this.Q.reshape(this.numRows, this.numRows, false);
    this.R.reshape(this.numRows, this.numCols, false);
    this.decomposer.getQ(this.Q, false);
    this.decomposer.getR(this.R, false);
    return true;
}

private solveU(U: double[], b: double[], n: int): void {
    for (var i: int = n - 1; i >= 0; i--) {
        var sum: double = b[i];
        var indexU: int = i * n + i + 1;
        for (var j: int = i + 1; j < n; j++) {
            sum -= U[indexU++] * b[j];
        }
        b[i] = sum / U[i * n + i];
    }
}

public solve(B: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, X: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
    var BnumCols: int = B.numCols;
    this.Y.reshape(this.numRows, 1, false);
    this.Z.reshape(this.numRows, 1, false);
    for (var colB: int = 0; colB < BnumCols; colB++) {
        for (var i: int = 0; i < this.numRows; i++) {
            this.Y.data[i] = B.unsafe_get(i, colB);
        }
        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA(this.Q, this.Y, this.Z);
        this.solveU(this.R.data, this.Z.data, this.numCols);
        for (var i: int = 0; i < this.numCols; i++) {
            X.cset(i, colB, this.Z.data[i]);
        }
    }
}

constructor() {
    this.decomposer = new org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64();
}

public setMaxSize(maxRows: int, maxCols: int): void {
    maxRows += 5;
    this.maxRows = maxRows;
    this.maxCols = maxCols;
    this.Q = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(maxRows, maxRows);
    this.R = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(maxRows, maxCols);
    this.Y = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(maxRows, 1);
    this.Z = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(maxRows, 1);
}


type DataSample struct {

    public time: int64;
    public value: double;
}
constructor(time: int64, value: double) {
    this.time = time;
    this.value = value;
}


type DenseMatrix64F struct {

    public numRows: int;
    public numCols: int;
    public data: double[];
    public static MULT_COLUMN_SWITCH: int = 15;
}
public static multTransA_smallMV(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, B: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, C: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
    var cIndex: int = 0;
    for (var i: int = 0; i < A.numCols; i++) {
        var total: double = 0.0;
        var indexA: int = i;
        for (var j: int = 0; j < A.numRows; j++) {
            total += A.get(indexA) * B.get(j);
            indexA += A.numCols;
        }
        C.set(cIndex++, total);
    }
}

public static multTransA_reorderMV(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, B: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, C: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
    if (A.numRows == 0) {
        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.fill(C, 0);
        return;
    }
    var B_val: double = B.get(0);
    for (var i: int = 0; i < A.numCols; i++) {
        C.set(i, A.get(i) * B_val);
    }
    var indexA: int = A.numCols;
    for (var i: int = 1; i < A.numRows; i++) {
        B_val = B.get(i);
        for (var j: int = 0; j < A.numCols; j++) {
            C.plus(j, A.get(indexA++) * B_val);
        }
    }
}

public static multTransA_reorderMM(a: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, b: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, c: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
    if (a.numCols == 0 || a.numRows == 0) {
        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.fill(c, 0);
        return;
    }
    var valA: double;
    for (var i: int = 0; i < a.numCols; i++) {
        var indexC_start: int = i * c.numCols;
        valA = a.get(i);
        var indexB: int = 0;
        var end: int = indexB + b.numCols;
        var indexC: int = indexC_start;
        while (indexB < end){
            c.set(indexC++, valA * b.get(indexB++));
        }
        for (var k: int = 1; k < a.numRows; k++) {
            valA = a.unsafe_get(k, i);
            end = indexB + b.numCols;
            indexC = indexC_start;
            while (indexB < end){
                c.plus(indexC++, valA * b.get(indexB++));
            }
        }
    }
}

public static multTransA_smallMM(a: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, b: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, c: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
    var cIndex: int = 0;
    for (var i: int = 0; i < a.numCols; i++) {
        for (var j: int = 0; j < b.numCols; j++) {
            var indexA: int = i;
            var indexB: int = j;
            var end: int = indexB + b.numRows * b.numCols;
            var total: double = 0;
            for (; indexB < end; indexB += b.numCols) {
                total += a.get(indexA) * b.get(indexB);
                indexA += a.numCols;
            }
            c.set(cIndex++, total);
        }
    }
}

public static multTransA(a: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, b: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, c: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
    if (b.numCols == 1) {
        if (a.numCols >= org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH) {
            org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA_reorderMV(a, b, c);
        } else {
            org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA_smallMV(a, b, c);
        }
    } else {
        if (a.numCols >= org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH || b.numCols >= org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH) {
            org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA_reorderMM(a, b, c);
        } else {
            org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA_smallMM(a, b, c);
        }
    }
}

public static setIdentity(mat: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
    var width: int = mat.numRows < mat.numCols ? mat.numRows : mat.numCols;
    java.util.Arrays.fill(mat.data, 0, mat.getNumElements(), 0);
    var index: int = 0;
    for (var i: int = 0; i < width; i++) {
        mat.data[index] = 1;
        index += mat.numCols + 1;
    }
}

public static widentity(width: int): org.kevoree.modeling.api.polynomial.util.DenseMatrix64F {
    var ret: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(width, width);
    for (var i: int = 0; i < width; i++) {
        ret.cset(i, i, 1.0);
    }
    return ret;
}

public static identity(numRows: int, numCols: int): org.kevoree.modeling.api.polynomial.util.DenseMatrix64F {
    var ret: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(numRows, numCols);
    var small: int = numRows < numCols ? numRows : numCols;
    for (var i: int = 0; i < small; i++) {
        ret.cset(i, i, 1.0);
    }
    return ret;
}

public static fill(a: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, value: double): void {
    java.util.Arrays.fill(a.data, 0, a.getNumElements(), value);
}

public get(index: int): double {
    return this.data[index];
}

public set(index: int, val: double): double {
    return this.data[index] = val;
}

public plus(index: int, val: double): double {
    return this.data[index] += val;
}

constructor(numRows: int, numCols: int) {
    this.data = new Array();
    this.numRows = numRows;
    this.numCols = numCols;
}

public reshape(numRows: int, numCols: int, saveValues: bool): void {
    if (this.data.length < numRows * numCols) {
        var d: double[] = new Array();
        if (saveValues) {
            System.arraycopy(this.data, 0, d, 0, this.getNumElements());
        }
        this.data = d;
    }
    this.numRows = numRows;
    this.numCols = numCols;
}

public cset(row: int, col: int, value: double): void {
    this.data[row * this.numCols + col] = value;
}

public unsafe_get(row: int, col: int): double {
    return this.data[row * this.numCols + col];
}

public getNumElements(): int {
    return this.numRows * this.numCols;
}


type PolynomialFitEjml struct {

    public A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
    public coef: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
    public y: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
    public solver: org.kevoree.modeling.api.polynomial.util.AdjLinearSolverQr;
}
constructor(degree: int) {
    this.coef = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(degree + 1, 1);
    this.A = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(1, degree + 1);
    this.y = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(1, 1);
    this.solver = new org.kevoree.modeling.api.polynomial.util.AdjLinearSolverQr();
}

public getCoef(): double[] {
    return this.coef.data;
}

public fit(samplePoints: double[], observations: double[]): void {
    this.y.reshape(observations.length, 1, false);
    System.arraycopy(observations, 0, this.y.data, 0, observations.length);
    this.A.reshape(this.y.numRows, this.coef.numRows, false);
    for (var i: int = 0; i < observations.length; i++) {
        var obs: double = 1;
        for (var j: int = 0; j < this.coef.numRows; j++) {
            this.A.cset(i, j, obs);
            obs *= samplePoints[i];
        }
    }
    this.solver.setA(this.A);
    this.solver.solve(this.y, this.coef);
}


type Prioritization struct {

    public static SAMEPRIORITY: Prioritization = new Prioritization();
    public static HIGHDEGREES: Prioritization = new Prioritization();
    public static LOWDEGREES: Prioritization = new Prioritization();
}
public equals(other: any): boolean {
    return this == other;
}
public static _PrioritizationVALUES : Prioritization[] = [
    Prioritization.SAMEPRIORITY
    ,Prioritization.HIGHDEGREES
    ,Prioritization.LOWDEGREES
];
public static values():Prioritization[]{
    return Prioritization._PrioritizationVALUES;
}

type QRDecompositionHouseholderColumn_D64 struct {

    public dataQR: double[][];
    public v: double[];
    public numCols: int;
    public numRows: int;
    public minLength: int;
    public gammas: double[];
    public gamma: double;
    public tau: double;
    public error: bool;
}
public setExpectedMaxSize(numRows: int, numCols: int): void {
    this.numCols = numCols;
    this.numRows = numRows;
    this.minLength = Math.min(numCols, numRows);
    var maxLength: int = Math.max(numCols, numRows);
    if (this.dataQR == null || this.dataQR.length < numCols || this.dataQR[0].length < numRows) {
        this.dataQR = new Array(new Array());
        for (var i: int = 0; i < numCols; i++) {
            this.dataQR[i] = new Array();
        }
        this.v = new Array();
        this.gammas = new Array();
    }
    if (this.v.length < maxLength) {
        this.v = new Array();
    }
    if (this.gammas.length < this.minLength) {
        this.gammas = new Array();
    }
}

public getQ(Q: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, compact: bool): org.kevoree.modeling.api.polynomial.util.DenseMatrix64F {
    if (compact) {
        if (Q == null) {
            Q = org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.identity(this.numRows, this.minLength);
        } else {
            org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.setIdentity(Q);
        }
    } else {
        if (Q == null) {
            Q = org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.widentity(this.numRows);
        } else {
            org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.setIdentity(Q);
        }
    }
    for (var j: int = this.minLength - 1; j >= 0; j--) {
        var u: double[] = this.dataQR[j];
        var vv: double = u[j];
        u[j] = 1;
        org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64.rank1UpdateMultR(Q, u, this.gammas[j], j, j, this.numRows, this.v);
        u[j] = vv;
    }
    return Q;
}

public getR(R: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, compact: bool): org.kevoree.modeling.api.polynomial.util.DenseMatrix64F {
    if (R == null) {
        if (compact) {
            R = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(this.minLength, this.numCols);
        } else {
            R = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(this.numRows, this.numCols);
        }
    } else {
        for (var i: int = 0; i < R.numRows; i++) {
            var min: int = Math.min(i, R.numCols);
            for (var j: int = 0; j < min; j++) {
                R.cset(i, j, 0);
            }
        }
    }
    for (var j: int = 0; j < this.numCols; j++) {
        var colR: double[] = this.dataQR[j];
        var l: int = Math.min(j, this.numRows - 1);
        for (var i: int = 0; i <= l; i++) {
            var val: double = colR[i];
            R.cset(i, j, val);
        }
    }
    return R;
}

public decompose(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): bool {
    this.setExpectedMaxSize(A.numRows, A.numCols);
    this.convertToColumnMajor(A);
    this.error = false;
    for (var j: int = 0; j < this.minLength; j++) {
        this.householder(j);
        this.updateA(j);
    }
    return !this.error;
}

public convertToColumnMajor(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
    for (var x: int = 0; x < this.numCols; x++) {
        var colQ: double[] = this.dataQR[x];
        for (var y: int = 0; y < this.numRows; y++) {
            colQ[y] = A.data[y * this.numCols + x];
        }
    }
}

public householder(j: int): void {
    var u: double[] = this.dataQR[j];
    var max: double = org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64.findMax(u, j, this.numRows - j);
    if (max == 0.0) {
        this.gamma = 0;
        this.error = true;
    } else {
        this.tau = org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64.computeTauAndDivide(j, this.numRows, u, max);
        var u_0: double = u[j] + this.tau;
        org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64.divideElements(j + 1, this.numRows, u, u_0);
        this.gamma = u_0 / this.tau;
        this.tau *= max;
        u[j] = -this.tau;
    }
    this.gammas[j] = this.gamma;
}

public updateA(w: int): void {
    var u: double[] = this.dataQR[w];
    for (var j: int = w + 1; j < this.numCols; j++) {
        var colQ: double[] = this.dataQR[j];
        var val: double = colQ[w];
        for (var k: int = w + 1; k < this.numRows; k++) {
            val += u[k] * colQ[k];
        }
        val *= this.gamma;
        colQ[w] -= val;
        for (var i: int = w + 1; i < this.numRows; i++) {
            colQ[i] -= u[i] * val;
        }
    }
}

public static findMax(u: double[], startU: int, length: int): double {
    var max: double = -1;
    var index: int = startU;
    var stopIndex: int = startU + length;
    for (; index < stopIndex; index++) {
        var val: double = u[index];
        val = (val < 0.0) ? -val : val;
        if (val > max) {
            max = val;
        }
    }
    return max;
}

public static divideElements(j: int, numRows: int, u: double[], u_0: double): void {
    for (var i: int = j; i < numRows; i++) {
        u[i] /= u_0;
    }
}

public static computeTauAndDivide(j: int, numRows: int, u: double[], max: double): double {
    var tau: double = 0;
    for (var i: int = j; i < numRows; i++) {
        var d: double = u[i] /= max;
        tau += d * d;
    }
    tau = Math.sqrt(tau);
    if (u[j] < 0) {
        tau = -tau;
    }
    return tau;
}

public static rank1UpdateMultR(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, u: double[], gamma: double, colA0: int, w0: int, w1: int, _temp: double[]): void {
    for (var i: int = colA0; i < A.numCols; i++) {
        _temp[i] = u[w0] * A.data[w0 * A.numCols + i];
    }
    for (var k: int = w0 + 1; k < w1; k++) {
        var indexA: int = k * A.numCols + colA0;
        var valU: double = u[k];
        for (var i: int = colA0; i < A.numCols; i++) {
            _temp[i] += valU * A.data[indexA++];
        }
    }
    for (var i: int = colA0; i < A.numCols; i++) {
        _temp[i] *= gamma;
    }
    for (var i: int = w0; i < w1; i++) {
        var valU: double = u[i];
        var indexA: int = i * A.numCols + colA0;
        for (var j: int = colA0; j < A.numCols; j++) {
            A.data[indexA++] -= valU * _temp[j];
        }
    }
}


type DynamicKModel struct extends org.kevoree.modeling.api.abs.AbstractKModel<any> {

    private _metaModel: org.kevoree.modeling.api.meta.MetaModel = null;
}
public setMetaModel(p_metaModel: org.kevoree.modeling.api.meta.MetaModel): void {
    this._metaModel = p_metaModel;
}

public metaModel(): org.kevoree.modeling.api.meta.MetaModel {
    return this._metaModel;
}

public internal_create(key: int64): org.kevoree.modeling.api.KUniverse<any, any, any> {
    return new org.kevoree.modeling.api.reflexive.DynamicKUniverse(this, key);
}


type DynamicKObject struct extends org.kevoree.modeling.api.abs.AbstractKObject {

}
constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: int64, p_timeTree: org.kevoree.modeling.api.time.TimeTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
    super(p_view, p_uuid, p_timeTree, p_metaClass);
}


type DynamicKUniverse struct extends org.kevoree.modeling.api.abs.AbstractKUniverse<any, any, any> {

}
constructor(p_universe: org.kevoree.modeling.api.KModel<any>, p_key: int64) {
    super(p_universe, p_key);
}

public internal_create(timePoint: int64): org.kevoree.modeling.api.KView {
    return new org.kevoree.modeling.api.reflexive.DynamicKView(timePoint, this);
}


type DynamicKView struct extends org.kevoree.modeling.api.abs.AbstractKView {

}
constructor(p_now: int64, p_dimension: org.kevoree.modeling.api.KUniverse<any, any, any>) {
    super(p_now, p_dimension);
}

public internalCreate(clazz: org.kevoree.modeling.api.meta.MetaClass, timeTree: org.kevoree.modeling.api.time.TimeTree, key: int64): org.kevoree.modeling.api.KObject {
    return new org.kevoree.modeling.api.reflexive.DynamicKObject(this, key, timeTree, clazz);
}


type DynamicMetaClass struct extends org.kevoree.modeling.api.abs.AbstractMetaClass {

    private cached_attributes: java.util.HashMap<string, org.kevoree.modeling.api.meta.MetaAttribute> = new java.util.HashMap<string, org.kevoree.modeling.api.meta.MetaAttribute>();
    private cached_references: java.util.HashMap<string, org.kevoree.modeling.api.meta.MetaReference> = new java.util.HashMap<string, org.kevoree.modeling.api.meta.MetaReference>();
    private cached_methods: java.util.HashMap<string, org.kevoree.modeling.api.meta.MetaOperation> = new java.util.HashMap<string, org.kevoree.modeling.api.meta.MetaOperation>();
    private _globalIndex: int = -1;
}
constructor(p_name: string, p_index: int) {
    super(p_name, p_index);
    this._globalIndex = org.kevoree.modeling.api.data.Index.RESERVED_INDEXES;
}

public addAttribute(p_name: string, p_type: org.kevoree.modeling.api.KMetaType): org.kevoree.modeling.api.reflexive.DynamicMetaClass {
    var tempAttribute: org.kevoree.modeling.api.abs.AbstractMetaAttribute = new org.kevoree.modeling.api.abs.AbstractMetaAttribute(p_name, this._globalIndex, -1, false, p_type, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
    this.cached_attributes.put(tempAttribute.metaName(), tempAttribute);
    this._globalIndex = this._globalIndex + 1;
    this.internalInit();
    return this;
}

public addReference(p_name: string, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, contained: bool): org.kevoree.modeling.api.reflexive.DynamicMetaClass {
    var tempOrigin: org.kevoree.modeling.api.meta.MetaClass = this;
    var tempReference: org.kevoree.modeling.api.abs.AbstractMetaReference = new org.kevoree.modeling.api.abs.AbstractMetaReference(p_name, this._globalIndex, contained, false,  () => {
        return p_metaClass;
    }, null,  () => {
        return tempOrigin;
    });
    this.cached_references.put(tempReference.metaName(), tempReference);
    this._globalIndex = this._globalIndex + 1;
    this.internalInit();
    return this;
}

public addOperation(p_name: string): org.kevoree.modeling.api.reflexive.DynamicMetaClass {
    var tempOrigin: org.kevoree.modeling.api.meta.MetaClass = this;
    var tempOperation: org.kevoree.modeling.api.abs.AbstractMetaOperation = new org.kevoree.modeling.api.abs.AbstractMetaOperation(p_name, this._globalIndex,  () => {
        return tempOrigin;
    });
    this.cached_methods.put(tempOperation.metaName(), tempOperation);
    this._globalIndex = this._globalIndex + 1;
    this.internalInit();
    return this;
}

private internalInit(): void {
    var tempAttributes: org.kevoree.modeling.api.meta.MetaAttribute[] = new Array();
    var tempReference: org.kevoree.modeling.api.meta.MetaReference[] = new Array();
    var tempOperation: org.kevoree.modeling.api.meta.MetaOperation[] = new Array();
    var keysAttributes: string[] = this.cached_attributes.keySet().toArray(new Array());
    for (var i: int = 0; i < keysAttributes.length; i++) {
        var resAtt: org.kevoree.modeling.api.meta.MetaAttribute = this.cached_attributes.get(keysAttributes[i]);
        tempAttributes[i] = resAtt;
    }
    var keysReferences: string[] = this.cached_references.keySet().toArray(new Array());
    for (var i: int = 0; i < keysReferences.length; i++) {
        var resRef: org.kevoree.modeling.api.meta.MetaReference = this.cached_references.get(keysReferences[i]);
        tempReference[i] = resRef;
    }
    var keysOperations: string[] = this.cached_methods.keySet().toArray(new Array());
    for (var i: int = 0; i < keysOperations.length; i++) {
        var resOp: org.kevoree.modeling.api.meta.MetaOperation = this.cached_methods.get(keysOperations[i]);
        tempOperation[i] = resOp;
    }
    this.init(tempAttributes, tempReference, tempOperation);
}


type DynamicMetaModel struct implements org.kevoree.modeling.api.meta.MetaModel {

    private _metaName: string = null;
    private _classes: java.util.HashMap<string, org.kevoree.modeling.api.meta.MetaClass> = new java.util.HashMap<string, org.kevoree.modeling.api.meta.MetaClass>();
}
constructor(p_metaName: string) {
    this._metaName = p_metaName;
}

public metaClasses(): org.kevoree.modeling.api.meta.MetaClass[] {
    var tempResult: org.kevoree.modeling.api.meta.MetaClass[] = new Array();
    var keys: string[] = this._classes.keySet().toArray(new Array());
    for (var i: int = 0; i < keys.length; i++) {
        var res: org.kevoree.modeling.api.meta.MetaClass = this._classes.get(keys[i]);
        tempResult[res.index()] = res;
    }
    return tempResult;
}

public metaClass(name: string): org.kevoree.modeling.api.meta.MetaClass {
    return this._classes.get(name);
}

public metaName(): string {
    return this._metaName;
}

public index(): int {
    return -1;
}

public createMetaClass(name: string): org.kevoree.modeling.api.reflexive.DynamicMetaClass {
    if (this._classes.containsKey(name)) {
        return this._classes.get(name).(org.kevoree.modeling.api.reflexive.DynamicMetaClass);
    } else {
        var dynamicMetaClass: org.kevoree.modeling.api.reflexive.DynamicMetaClass = new org.kevoree.modeling.api.reflexive.DynamicMetaClass(name, this._classes.keySet().size());
        this._classes.put(name, dynamicMetaClass);
        return dynamicMetaClass;
    }
}

public model(): org.kevoree.modeling.api.KModel<any> {
    var universe: org.kevoree.modeling.api.reflexive.DynamicKModel = new org.kevoree.modeling.api.reflexive.DynamicKModel();
    universe.setMetaModel(this);
    return universe;
}


type DirectScheduler struct implements org.kevoree.modeling.api.KScheduler {

}
public dispatch(runnable: Runnable): void {
    runnable.run();
}

public stop(): void {
}


type ExecutorServiceScheduler struct implements org.kevoree.modeling.api.KScheduler {

    private _service: ExecutorService = Executors.newCachedThreadPool();
}
public dispatch(p_runnable: Runnable): void {
    this._service.submit(p_runnable);
}

public stop(): void {
    this._service.shutdown();
}


type DefaultTimeTree struct implements org.kevoree.modeling.api.time.TimeTree {

    public dirty: bool = true;
    public versionTree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
}
public walk(walker: (p : int64) => void): void {
    this.walkAsc(walker);
}

public walkAsc(walker: (p : int64) => void): void {
    var elem: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.first();
    while (elem != null){
        walker(elem.getKey());
        elem = elem.next();
    }
}

public walkDesc(walker: (p : int64) => void): void {
    var elem: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.last();
    while (elem != null){
        walker(elem.getKey());
        elem = elem.previous();
    }
}

public walkRangeAsc(walker: (p : int64) => void, from: int64, to: int64): void {
    var from2: int64 = from;
    var to2: int64 = to;
    if (from > to) {
        from2 = to;
        to2 = from;
    }
    var elem: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.previousOrEqual(from2);
    while (elem != null){
        walker(elem.getKey());
        elem = elem.next();
        if (elem != null) {
            if (elem.getKey() >= to2) {
                return;
            }
        }
    }
}

public walkRangeDesc(walker: (p : int64) => void, from: int64, to: int64): void {
    var from2: int64 = from;
    var to2: int64 = to;
    if (from > to) {
        from2 = to;
        to2 = from;
    }
    var elem: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.previousOrEqual(to2);
    while (elem != null){
        walker(elem.getKey());
        elem = elem.previous();
        if (elem != null) {
            if (elem.getKey() <= from2) {
                walker(elem.getKey());
                return;
            }
        }
    }
}

public first(): int64 {
    var firstNode: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.first();
    if (firstNode != null) {
        return firstNode.getKey();
    } else {
        return null;
    }
}

public last(): int64 {
    var lastNode: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.last();
    if (lastNode != null) {
        return lastNode.getKey();
    } else {
        return null;
    }
}

public next(from: int64): int64 {
    var nextNode: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.next(from);
    if (nextNode != null) {
        return nextNode.getKey();
    } else {
        return null;
    }
}

public previous(from: int64): int64 {
    var previousNode: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.previous(from);
    if (previousNode != null) {
        return previousNode.getKey();
    } else {
        return null;
    }
}

public resolve(time: int64): int64 {
    var previousNode: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.previousOrEqual(time);
    if (previousNode != null) {
        return previousNode.getKey();
    } else {
        return null;
    }
}

public insert(time: int64): org.kevoree.modeling.api.time.TimeTree {
    this.versionTree.insert(time, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
    this.dirty = true;
    return this;
}

public delete(time: int64): org.kevoree.modeling.api.time.TimeTree {
    this.versionTree.insert(time, org.kevoree.modeling.api.time.rbtree.State.DELETED);
    this.dirty = true;
    return this;
}

public isDirty(): bool {
    return this.dirty;
}

public size(): int {
    return this.versionTree.size();
}

public setDirty(state: bool): void {
    this.dirty = state;
}

public toString(): string {
    return this.versionTree.serialize();
}

public load(payload: string): void {
    this.versionTree.unserialize(payload);
    this.dirty = false;
}


type TimeTree interface {
    walk(walker : (p : int64) => void) : void
    walkAsc(walker : (p : int64) => void) : void
    walkDesc(walker : (p : int64) => void) : void
    walkRangeAsc(walker : (p : int64) => void,from : int64,to : int64) : void
    walkRangeDesc(walker : (p : int64) => void,from : int64,to : int64) : void
    first() : int64
    last() : int64
    next(from : int64) : int64
    previous(from : int64) : int64
    resolve(time : int64) : int64
    insert(time : int64) : org.kevoree.modeling.api.time.TimeTree
    delete(time : int64) : org.kevoree.modeling.api.time.TimeTree
    isDirty() : bool
    size() : int
}
type TimeWalker interface {
    walk(timePoint : int64) : void
}
type Color struct {

    public static RED: Color = new Color();
    public static BLACK: Color = new Color();
}
public equals(other: any): boolean {
    return this == other;
}
public static _ColorVALUES : Color[] = [
    Color.RED
    ,Color.BLACK
];
public static values():Color[]{
    return Color._ColorVALUES;
}

type LongRBTree struct {

    public root: org.kevoree.modeling.api.time.rbtree.LongTreeNode = null;
    private _size: int = 0;
    public dirty: bool = false;
}
public size(): int {
    return this._size;
}

public serialize(): string {
    var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
    builder.append(this._size);
    if (this.root != null) {
        this.root.serialize(builder);
    }
    return builder.toString();
}

public unserialize(payload: string): void {
    if (payload == null || payload.length == 0) {
        return;
    }
    var i: int = 0;
    var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
    var ch: char = payload.charAt(i);
    while (i < payload.length && ch != '|'){
        buffer.append(ch);
        i = i + 1;
        ch = payload.charAt(i);
    }
    this._size = java.lang.Integer.parseInt(buffer.toString());
    var ctx: org.kevoree.modeling.api.time.rbtree.TreeReaderContext = new org.kevoree.modeling.api.time.rbtree.TreeReaderContext();
    ctx.index = i;
    ctx.payload = payload;
    ctx.buffer = new Array();
    this.root = org.kevoree.modeling.api.time.rbtree.LongTreeNode.unserialize(ctx);
    this.dirty = false;
}

public previousOrEqual(key: int64): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.root;
    if (p == null) {
        return null;
    }
    while (p != null){
        if (key == p.key) {
            return p;
        }
        if (key > p.key) {
            if (p.getRight() != null) {
                p = p.getRight();
            } else {
                return p;
            }
        } else {
            if (p.getLeft() != null) {
                p = p.getLeft();
            } else {
                var parent: org.kevoree.modeling.api.time.rbtree.LongTreeNode = p.getParent();
                var ch: org.kevoree.modeling.api.time.rbtree.LongTreeNode = p;
                while (parent != null && ch == parent.getLeft()){
                    ch = parent;
                    parent = parent.getParent();
                }
                return parent;
            }
        }
    }
    return null;
}

public nextOrEqual(key: int64): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.root;
    if (p == null) {
        return null;
    }
    while (p != null){
        if (key == p.key) {
            return p;
        }
        if (key < p.key) {
            if (p.getLeft() != null) {
                p = p.getLeft();
            } else {
                return p;
            }
        } else {
            if (p.getRight() != null) {
                p = p.getRight();
            } else {
                var parent: org.kevoree.modeling.api.time.rbtree.LongTreeNode = p.getParent();
                var ch: org.kevoree.modeling.api.time.rbtree.LongTreeNode = p;
                while (parent != null && ch == parent.getRight()){
                    ch = parent;
                    parent = parent.getParent();
                }
                return parent;
            }
        }
    }
    return null;
}

public previous(key: int64): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.root;
    if (p == null) {
        return null;
    }
    while (p != null){
        if (key < p.key) {
            if (p.getLeft() != null) {
                p = p.getLeft();
            } else {
                return p.previous();
            }
        } else {
            if (key > p.key) {
                if (p.getRight() != null) {
                    p = p.getRight();
                } else {
                    return p;
                }
            } else {
                return p.previous();
            }
        }
    }
    return null;
}

public previousWhileNot(key: int64, until: int64): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    var elm: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.previousOrEqual(key);
    if (elm.value == until) {
        return null;
    } else {
        if (elm.key == key) {
            elm = elm.previous();
        }
    }
    if (elm == null || elm.value == until) {
        return null;
    } else {
        return elm;
    }
}

public next(key: int64): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.root;
    if (p == null) {
        return null;
    }
    while (p != null){
        if (key < p.key) {
            if (p.getLeft() != null) {
                p = p.getLeft();
            } else {
                return p;
            }
        } else {
            if (key > p.key) {
                if (p.getRight() != null) {
                    p = p.getRight();
                } else {
                    return p.next();
                }
            } else {
                return p.next();
            }
        }
    }
    return null;
}

public nextWhileNot(key: int64, until: int64): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    var elm: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.nextOrEqual(key);
    if (elm.value == until) {
        return null;
    } else {
        if (elm.key == key) {
            elm = elm.next();
        }
    }
    if (elm == null || elm.value == until) {
        return null;
    } else {
        return elm;
    }
}

public first(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.root;
    if (p == null) {
        return null;
    }
    while (p != null){
        if (p.getLeft() != null) {
            p = p.getLeft();
        } else {
            return p;
        }
    }
    return null;
}

public last(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.root;
    if (p == null) {
        return null;
    }
    while (p != null){
        if (p.getRight() != null) {
            p = p.getRight();
        } else {
            return p;
        }
    }
    return null;
}

public firstWhileNot(key: int64, until: int64): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    var elm: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.previousOrEqual(key);
    if (elm == null) {
        return null;
    } else {
        if (elm.value == until) {
            return null;
        }
    }
    var prev: org.kevoree.modeling.api.time.rbtree.LongTreeNode = null;
    do {
        prev = elm.previous();
        if (prev == null || prev.value == until) {
            return elm;
        } else {
            elm = prev;
        }
    } while (elm != null)
    return prev;
}

public lastWhileNot(key: int64, until: int64): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    var elm: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.previousOrEqual(key);
    if (elm == null) {
        return null;
    } else {
        if (elm.value == until) {
            return null;
        }
    }
    var next: org.kevoree.modeling.api.time.rbtree.LongTreeNode;
    do {
        next = elm.next();
        if (next == null || next.value == until) {
            return elm;
        } else {
            elm = next;
        }
    } while (elm != null)
    return next;
}

private lookupNode(key: int64): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    var n: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.root;
    if (n == null) {
        return null;
    }
    while (n != null){
        if (key == n.key) {
            return n;
        } else {
            if (key < n.key) {
                n = n.getLeft();
            } else {
                n = n.getRight();
            }
        }
    }
    return n;
}

public lookup(key: int64): int64 {
    var n: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.lookupNode(key);
    if (n == null) {
        return null;
    } else {
        return n.value;
    }
}

private rotateLeft(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    var r: org.kevoree.modeling.api.time.rbtree.LongTreeNode = n.getRight();
    this.replaceNode(n, r);
    n.setRight(r.getLeft());
    if (r.getLeft() != null) {
        r.getLeft().setParent(n);
    }
    r.setLeft(n);
    n.setParent(r);
}

private rotateRight(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    var l: org.kevoree.modeling.api.time.rbtree.LongTreeNode = n.getLeft();
    this.replaceNode(n, l);
    n.setLeft(l.getRight());
    if (l.getRight() != null) {
        l.getRight().setParent(n);
    }
    l.setRight(n);
    n.setParent(l);
}

private replaceNode(oldn: org.kevoree.modeling.api.time.rbtree.LongTreeNode, newn: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    if (oldn.getParent() == null) {
        this.root = newn;
    } else {
        if (oldn == oldn.getParent().getLeft()) {
            oldn.getParent().setLeft(newn);
        } else {
            oldn.getParent().setRight(newn);
        }
    }
    if (newn != null) {
        newn.setParent(oldn.getParent());
    }
}

public insert(key: int64, value: int64): void {
    this.dirty = true;
    var insertedNode: org.kevoree.modeling.api.time.rbtree.LongTreeNode = new org.kevoree.modeling.api.time.rbtree.LongTreeNode(key, value, org.kevoree.modeling.api.time.rbtree.Color.RED, null, null);
    if (this.root == null) {
        this._size++;
        this.root = insertedNode;
    } else {
        var n: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.root;
        while (true){
            if (key == n.key) {
                n.value = value;
                return;
            } else {
                if (key < n.key) {
                    if (n.getLeft() == null) {
                        n.setLeft(insertedNode);
                        this._size++;
                        break;
                    } else {
                        n = n.getLeft();
                    }
                } else {
                    if (n.getRight() == null) {
                        n.setRight(insertedNode);
                        this._size++;
                        break;
                    } else {
                        n = n.getRight();
                    }
                }
            }
        }
        insertedNode.setParent(n);
    }
    this.insertCase1(insertedNode);
}

private insertCase1(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    if (n.getParent() == null) {
        n.color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
    } else {
        this.insertCase2(n);
    }
}

private insertCase2(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
        return;
    } else {
        this.insertCase3(n);
    }
}

private insertCase3(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    if (this.nodeColor(n.uncle()) == org.kevoree.modeling.api.time.rbtree.Color.RED) {
        n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
        n.uncle().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
        n.grandparent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
        this.insertCase1(n.grandparent());
    } else {
        this.insertCase4(n);
    }
}

private insertCase4(n_n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    var n: org.kevoree.modeling.api.time.rbtree.LongTreeNode = n_n;
    if (n == n.getParent().getRight() && n.getParent() == n.grandparent().getLeft()) {
        this.rotateLeft(n.getParent());
        n = n.getLeft();
    } else {
        if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getRight()) {
            this.rotateRight(n.getParent());
            n = n.getRight();
        }
    }
    this.insertCase5(n);
}

private insertCase5(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
    n.grandparent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
    if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getLeft()) {
        this.rotateRight(n.grandparent());
    } else {
        this.rotateLeft(n.grandparent());
    }
}

public delete(key: int64): void {
    var n: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.lookupNode(key);
    if (n == null) {
        return;
    } else {
        this._size--;
        if (n.getLeft() != null && n.getRight() != null) {
            var pred: org.kevoree.modeling.api.time.rbtree.LongTreeNode = n.getLeft();
            while (pred.getRight() != null){
                pred = pred.getRight();
            }
            n.key = pred.key;
            n.value = pred.value;
            n = pred;
        }
        var child: org.kevoree.modeling.api.time.rbtree.LongTreeNode;
        if (n.getRight() == null) {
            child = n.getLeft();
        } else {
            child = n.getRight();
        }
        if (this.nodeColor(n) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
            n.color = this.nodeColor(child);
            this.deleteCase1(n);
        }
        this.replaceNode(n, child);
    }
}

private deleteCase1(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    if (n.getParent() == null) {
        return;
    } else {
        this.deleteCase2(n);
    }
}

private deleteCase2(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    if (this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.RED) {
        n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
        n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
        if (n == n.getParent().getLeft()) {
            this.rotateLeft(n.getParent());
        } else {
            this.rotateRight(n.getParent());
        }
    }
    this.deleteCase3(n);
}

private deleteCase3(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
        n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
        this.deleteCase1(n.getParent());
    } else {
        this.deleteCase4(n);
    }
}

private deleteCase4(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
        n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
        n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
    } else {
        this.deleteCase5(n);
    }
}

private deleteCase5(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    if (n == n.getParent().getLeft() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
        n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
        n.sibling().getLeft().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
        this.rotateRight(n.sibling());
    } else {
        if (n == n.getParent().getRight() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
            n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
            n.sibling().getRight().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
            this.rotateLeft(n.sibling());
        }
    }
    this.deleteCase6(n);
}

private deleteCase6(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    n.sibling().color = this.nodeColor(n.getParent());
    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
    if (n == n.getParent().getLeft()) {
        n.sibling().getRight().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
        this.rotateLeft(n.getParent());
    } else {
        n.sibling().getLeft().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
        this.rotateRight(n.getParent());
    }
}

private nodeColor(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): org.kevoree.modeling.api.time.rbtree.Color {
    if (n == null) {
        return org.kevoree.modeling.api.time.rbtree.Color.BLACK;
    } else {
        return n.color;
    }
}


type LongTreeNode struct {

    public static BLACK: char = '0';
    public static RED: char = '2';
    public key: int64;
    public value: int64;
    public color: org.kevoree.modeling.api.time.rbtree.Color;
    private left: org.kevoree.modeling.api.time.rbtree.LongTreeNode;
    private right: org.kevoree.modeling.api.time.rbtree.LongTreeNode;
    private parent: org.kevoree.modeling.api.time.rbtree.LongTreeNode = null;
}
constructor(key: int64, value: int64, color: org.kevoree.modeling.api.time.rbtree.Color, left: org.kevoree.modeling.api.time.rbtree.LongTreeNode, right: org.kevoree.modeling.api.time.rbtree.LongTreeNode) {
    this.key = key;
    this.value = value;
    this.color = color;
    this.left = left;
    this.right = right;
    if (left != null) {
        left.parent = this;
    }
    if (right != null) {
        right.parent = this;
    }
    this.parent = null;
}

public grandparent(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    if (this.parent != null) {
        return this.parent.parent;
    } else {
        return null;
    }
}

public sibling(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    if (this.parent == null) {
        return null;
    } else {
        if (this == this.parent.left) {
            return this.parent.right;
        } else {
            return this.parent.left;
        }
    }
}

public uncle(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    if (this.parent != null) {
        return this.parent.sibling();
    } else {
        return null;
    }
}

public getLeft(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    return this.left;
}

public setLeft(left: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    this.left = left;
}

public getRight(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    return this.right;
}

public setRight(right: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    this.right = right;
}

public getParent(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    return this.parent;
}

public setParent(parent: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
    this.parent = parent;
}

public serialize(builder: java.lang.StringBuilder): void {
    builder.append("|");
    if (this.color == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
        builder.append(LongTreeNode.BLACK);
    } else {
        builder.append(LongTreeNode.RED);
    }
    builder.append(this.key);
    builder.append("@");
    builder.append(this.value);
    if (this.left == null && this.right == null) {
        builder.append("%");
    } else {
        if (this.left != null) {
            this.left.serialize(builder);
        } else {
            builder.append("#");
        }
        if (this.right != null) {
            this.right.serialize(builder);
        } else {
            builder.append("#");
        }
    }
}

public next(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this;
    if (p.right != null) {
        p = p.right;
        while (p.left != null){
            p = p.left;
        }
        return p;
    } else {
        if (p.parent != null) {
            if (p == p.parent.left) {
                return p.parent;
            } else {
                while (p.parent != null && p == p.parent.right){
                    p = p.parent;
                }
                return p.parent;
            }
        } else {
            return null;
        }
    }
}

public previous(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this;
    if (p.left != null) {
        p = p.left;
        while (p.right != null){
            p = p.right;
        }
        return p;
    } else {
        if (p.parent != null) {
            if (p == p.parent.right) {
                return p.parent;
            } else {
                while (p.parent != null && p == p.parent.left){
                    p = p.parent;
                }
                return p.parent;
            }
        } else {
            return null;
        }
    }
}

public static unserialize(ctx: org.kevoree.modeling.api.time.rbtree.TreeReaderContext): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    return org.kevoree.modeling.api.time.rbtree.LongTreeNode.internal_unserialize(true, ctx);
}

public static internal_unserialize(rightBranch: bool, ctx: org.kevoree.modeling.api.time.rbtree.TreeReaderContext): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
    if (ctx.index >= ctx.payload.length) {
        return null;
    }
    var ch: char = ctx.payload.charAt(ctx.index);
    if (ch == '%') {
        if (rightBranch) {
            ctx.index = ctx.index + 1;
        }
        return null;
    }
    if (ch == '#') {
        ctx.index = ctx.index + 1;
        return null;
    }
    if (ch != '|') {
        throw new java.lang.Exception("Error while loading BTree");
    }
    ctx.index = ctx.index + 1;
    ch = ctx.payload.charAt(ctx.index);
    var color: org.kevoree.modeling.api.time.rbtree.Color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
    if (ch == LongTreeNode.RED) {
        color = org.kevoree.modeling.api.time.rbtree.Color.RED;
    }
    ctx.index = ctx.index + 1;
    ch = ctx.payload.charAt(ctx.index);
    var i: int = 0;
    while (ctx.index + 1 < ctx.payload.length && ch != '|' && ch != '#' && ch != '%' && ch != '@'){
        ctx.buffer[i] = ch;
        i++;
        ctx.index = ctx.index + 1;
        ch = ctx.payload.charAt(ctx.index);
    }
    if (ch != '|' && ch != '#' && ch != '%' && ch != '@') {
        ctx.buffer[i] = ch;
        i++;
    }
    var key: int64 = java.lang.Long.parseLong(StringUtils.copyValueOf(ctx.buffer, 0, i));
    i = 0;
    ctx.index = ctx.index + 1;
    ch = ctx.payload.charAt(ctx.index);
    while (ctx.index + 1 < ctx.payload.length && ch != '|' && ch != '#' && ch != '%' && ch != '@'){
        ctx.buffer[i] = ch;
        i++;
        ctx.index = ctx.index + 1;
        ch = ctx.payload.charAt(ctx.index);
    }
    if (ch != '|' && ch != '#' && ch != '%' && ch != '@') {
        ctx.buffer[i] = ch;
        i++;
    }
    var value: int64 = java.lang.Long.parseLong(StringUtils.copyValueOf(ctx.buffer, 0, i));
    var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = new org.kevoree.modeling.api.time.rbtree.LongTreeNode(key, value, color, null, null);
    var left: org.kevoree.modeling.api.time.rbtree.LongTreeNode = org.kevoree.modeling.api.time.rbtree.LongTreeNode.internal_unserialize(false, ctx);
    if (left != null) {
        left.setParent(p);
    }
    var right: org.kevoree.modeling.api.time.rbtree.LongTreeNode = org.kevoree.modeling.api.time.rbtree.LongTreeNode.internal_unserialize(true, ctx);
    if (right != null) {
        right.setParent(p);
    }
    p.setLeft(left);
    p.setRight(right);
    return p;
}


type RBTree struct {

    public root: org.kevoree.modeling.api.time.rbtree.TreeNode = null;
    private _size: int = 0;
}
public size(): int {
    return this._size;
}

public serialize(): string {
    var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
    builder.append(this._size);
    if (this.root != null) {
        this.root.serialize(builder);
    }
    return builder.toString();
}

public unserialize(payload: string): void {
    if (payload == null || payload.length == 0) {
        return;
    }
    var i: int = 0;
    var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
    var ch: char = payload.charAt(i);
    while (i < payload.length && ch != '|'){
        buffer.append(ch);
        i = i + 1;
        ch = payload.charAt(i);
    }
    this._size = java.lang.Integer.parseInt(buffer.toString());
    var ctx: org.kevoree.modeling.api.time.rbtree.TreeReaderContext = new org.kevoree.modeling.api.time.rbtree.TreeReaderContext();
    ctx.index = i;
    ctx.payload = payload;
    this.root = org.kevoree.modeling.api.time.rbtree.TreeNode.unserialize(ctx);
}

public previousOrEqual(key: int64): org.kevoree.modeling.api.time.rbtree.TreeNode {
    var p: org.kevoree.modeling.api.time.rbtree.TreeNode = this.root;
    if (p == null) {
        return null;
    }
    while (p != null){
        if (key == p.key) {
            return p;
        }
        if (key > p.key) {
            if (p.getRight() != null) {
                p = p.getRight();
            } else {
                return p;
            }
        } else {
            if (p.getLeft() != null) {
                p = p.getLeft();
            } else {
                var parent: org.kevoree.modeling.api.time.rbtree.TreeNode = p.getParent();
                var ch: org.kevoree.modeling.api.time.rbtree.TreeNode = p;
                while (parent != null && ch == parent.getLeft()){
                    ch = parent;
                    parent = parent.getParent();
                }
                return parent;
            }
        }
    }
    return null;
}

public nextOrEqual(key: int64): org.kevoree.modeling.api.time.rbtree.TreeNode {
    var p: org.kevoree.modeling.api.time.rbtree.TreeNode = this.root;
    if (p == null) {
        return null;
    }
    while (p != null){
        if (key == p.key) {
            return p;
        }
        if (key < p.key) {
            if (p.getLeft() != null) {
                p = p.getLeft();
            } else {
                return p;
            }
        } else {
            if (p.getRight() != null) {
                p = p.getRight();
            } else {
                var parent: org.kevoree.modeling.api.time.rbtree.TreeNode = p.getParent();
                var ch: org.kevoree.modeling.api.time.rbtree.TreeNode = p;
                while (parent != null && ch == parent.getRight()){
                    ch = parent;
                    parent = parent.getParent();
                }
                return parent;
            }
        }
    }
    return null;
}

public previous(key: int64): org.kevoree.modeling.api.time.rbtree.TreeNode {
    var p: org.kevoree.modeling.api.time.rbtree.TreeNode = this.root;
    if (p == null) {
        return null;
    }
    while (p != null){
        if (key < p.key) {
            if (p.getLeft() != null) {
                p = p.getLeft();
            } else {
                return p.previous();
            }
        } else {
            if (key > p.key) {
                if (p.getRight() != null) {
                    p = p.getRight();
                } else {
                    return p;
                }
            } else {
                return p.previous();
            }
        }
    }
    return null;
}

public previousWhileNot(key: int64, until: org.kevoree.modeling.api.time.rbtree.State): org.kevoree.modeling.api.time.rbtree.TreeNode {
    var elm: org.kevoree.modeling.api.time.rbtree.TreeNode = this.previousOrEqual(key);
    if (elm.value.equals(until)) {
        return null;
    } else {
        if (elm.key == key) {
            elm = elm.previous();
        }
    }
    if (elm == null || elm.value.equals(until)) {
        return null;
    } else {
        return elm;
    }
}

public next(key: int64): org.kevoree.modeling.api.time.rbtree.TreeNode {
    var p: org.kevoree.modeling.api.time.rbtree.TreeNode = this.root;
    if (p == null) {
        return null;
    }
    while (p != null){
        if (key < p.key) {
            if (p.getLeft() != null) {
                p = p.getLeft();
            } else {
                return p;
            }
        } else {
            if (key > p.key) {
                if (p.getRight() != null) {
                    p = p.getRight();
                } else {
                    return p.next();
                }
            } else {
                return p.next();
            }
        }
    }
    return null;
}

public nextWhileNot(key: int64, until: org.kevoree.modeling.api.time.rbtree.State): org.kevoree.modeling.api.time.rbtree.TreeNode {
    var elm: org.kevoree.modeling.api.time.rbtree.TreeNode = this.nextOrEqual(key);
    if (elm.value.equals(until)) {
        return null;
    } else {
        if (elm.key == key) {
            elm = elm.next();
        }
    }
    if (elm == null || elm.value.equals(until)) {
        return null;
    } else {
        return elm;
    }
}

public first(): org.kevoree.modeling.api.time.rbtree.TreeNode {
    var p: org.kevoree.modeling.api.time.rbtree.TreeNode = this.root;
    if (p == null) {
        return null;
    }
    while (p != null){
        if (p.getLeft() != null) {
            p = p.getLeft();
        } else {
            return p;
        }
    }
    return null;
}

public last(): org.kevoree.modeling.api.time.rbtree.TreeNode {
    var p: org.kevoree.modeling.api.time.rbtree.TreeNode = this.root;
    if (p == null) {
        return null;
    }
    while (p != null){
        if (p.getRight() != null) {
            p = p.getRight();
        } else {
            return p;
        }
    }
    return null;
}

public firstWhileNot(key: int64, until: org.kevoree.modeling.api.time.rbtree.State): org.kevoree.modeling.api.time.rbtree.TreeNode {
    var elm: org.kevoree.modeling.api.time.rbtree.TreeNode = this.previousOrEqual(key);
    if (elm == null) {
        return null;
    } else {
        if (elm.value.equals(until)) {
            return null;
        }
    }
    var prev: org.kevoree.modeling.api.time.rbtree.TreeNode = null;
    do {
        prev = elm.previous();
        if (prev == null || prev.value.equals(until)) {
            return elm;
        } else {
            elm = prev;
        }
    } while (elm != null)
    return prev;
}

public lastWhileNot(key: int64, until: org.kevoree.modeling.api.time.rbtree.State): org.kevoree.modeling.api.time.rbtree.TreeNode {
    var elm: org.kevoree.modeling.api.time.rbtree.TreeNode = this.previousOrEqual(key);
    if (elm == null) {
        return null;
    } else {
        if (elm.value.equals(until)) {
            return null;
        }
    }
    var next: org.kevoree.modeling.api.time.rbtree.TreeNode;
    do {
        next = elm.next();
        if (next == null || next.value.equals(until)) {
            return elm;
        } else {
            elm = next;
        }
    } while (elm != null)
    return next;
}

private lookupNode(key: int64): org.kevoree.modeling.api.time.rbtree.TreeNode {
    var n: org.kevoree.modeling.api.time.rbtree.TreeNode = this.root;
    if (n == null) {
        return null;
    }
    while (n != null){
        if (key == n.key) {
            return n;
        } else {
            if (key < n.key) {
                n = n.getLeft();
            } else {
                n = n.getRight();
            }
        }
    }
    return n;
}

public lookup(key: int64): org.kevoree.modeling.api.time.rbtree.State {
    var n: org.kevoree.modeling.api.time.rbtree.TreeNode = this.lookupNode(key);
    if (n == null) {
        return null;
    } else {
        return n.value;
    }
}

private rotateLeft(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    var r: org.kevoree.modeling.api.time.rbtree.TreeNode = n.getRight();
    this.replaceNode(n, r);
    n.setRight(r.getLeft());
    if (r.getLeft() != null) {
        r.getLeft().setParent(n);
    }
    r.setLeft(n);
    n.setParent(r);
}

private rotateRight(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    var l: org.kevoree.modeling.api.time.rbtree.TreeNode = n.getLeft();
    this.replaceNode(n, l);
    n.setLeft(l.getRight());
    if (l.getRight() != null) {
        l.getRight().setParent(n);
    }
    l.setRight(n);
    n.setParent(l);
}

private replaceNode(oldn: org.kevoree.modeling.api.time.rbtree.TreeNode, newn: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    if (oldn.getParent() == null) {
        this.root = newn;
    } else {
        if (oldn == oldn.getParent().getLeft()) {
            oldn.getParent().setLeft(newn);
        } else {
            oldn.getParent().setRight(newn);
        }
    }
    if (newn != null) {
        newn.setParent(oldn.getParent());
    }
}

public insert(key: int64, value: org.kevoree.modeling.api.time.rbtree.State): void {
    var insertedNode: org.kevoree.modeling.api.time.rbtree.TreeNode = new org.kevoree.modeling.api.time.rbtree.TreeNode(key, value, org.kevoree.modeling.api.time.rbtree.Color.RED, null, null);
    if (this.root == null) {
        this._size++;
        this.root = insertedNode;
    } else {
        var n: org.kevoree.modeling.api.time.rbtree.TreeNode = this.root;
        while (true){
            if (key == n.key) {
                n.value = value;
                return;
            } else {
                if (key < n.key) {
                    if (n.getLeft() == null) {
                        n.setLeft(insertedNode);
                        this._size++;
                        break;
                    } else {
                        n = n.getLeft();
                    }
                } else {
                    if (n.getRight() == null) {
                        n.setRight(insertedNode);
                        this._size++;
                        break;
                    } else {
                        n = n.getRight();
                    }
                }
            }
        }
        insertedNode.setParent(n);
    }
    this.insertCase1(insertedNode);
}

private insertCase1(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    if (n.getParent() == null) {
        n.color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
    } else {
        this.insertCase2(n);
    }
}

private insertCase2(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
        return;
    } else {
        this.insertCase3(n);
    }
}

private insertCase3(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    if (this.nodeColor(n.uncle()) == org.kevoree.modeling.api.time.rbtree.Color.RED) {
        n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
        n.uncle().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
        n.grandparent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
        this.insertCase1(n.grandparent());
    } else {
        this.insertCase4(n);
    }
}

private insertCase4(n_n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    var n: org.kevoree.modeling.api.time.rbtree.TreeNode = n_n;
    if (n == n.getParent().getRight() && n.getParent() == n.grandparent().getLeft()) {
        this.rotateLeft(n.getParent());
        n = n.getLeft();
    } else {
        if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getRight()) {
            this.rotateRight(n.getParent());
            n = n.getRight();
        }
    }
    this.insertCase5(n);
}

private insertCase5(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
    n.grandparent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
    if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getLeft()) {
        this.rotateRight(n.grandparent());
    } else {
        this.rotateLeft(n.grandparent());
    }
}

public delete(key: int64): void {
    var n: org.kevoree.modeling.api.time.rbtree.TreeNode = this.lookupNode(key);
    if (n == null) {
        return;
    } else {
        this._size--;
        if (n.getLeft() != null && n.getRight() != null) {
            var pred: org.kevoree.modeling.api.time.rbtree.TreeNode = n.getLeft();
            while (pred.getRight() != null){
                pred = pred.getRight();
            }
            n.key = pred.key;
            n.value = pred.value;
            n = pred;
        }
        var child: org.kevoree.modeling.api.time.rbtree.TreeNode;
        if (n.getRight() == null) {
            child = n.getLeft();
        } else {
            child = n.getRight();
        }
        if (this.nodeColor(n) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
            n.color = this.nodeColor(child);
            this.deleteCase1(n);
        }
        this.replaceNode(n, child);
    }
}

private deleteCase1(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    if (n.getParent() == null) {
        return;
    } else {
        this.deleteCase2(n);
    }
}

private deleteCase2(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    if (this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.RED) {
        n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
        n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
        if (n == n.getParent().getLeft()) {
            this.rotateLeft(n.getParent());
        } else {
            this.rotateRight(n.getParent());
        }
    }
    this.deleteCase3(n);
}

private deleteCase3(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
        n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
        this.deleteCase1(n.getParent());
    } else {
        this.deleteCase4(n);
    }
}

private deleteCase4(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
        n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
        n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
    } else {
        this.deleteCase5(n);
    }
}

private deleteCase5(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    if (n == n.getParent().getLeft() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
        n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
        n.sibling().getLeft().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
        this.rotateRight(n.sibling());
    } else {
        if (n == n.getParent().getRight() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
            n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
            n.sibling().getRight().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
            this.rotateLeft(n.sibling());
        }
    }
    this.deleteCase6(n);
}

private deleteCase6(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    n.sibling().color = this.nodeColor(n.getParent());
    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
    if (n == n.getParent().getLeft()) {
        n.sibling().getRight().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
        this.rotateLeft(n.getParent());
    } else {
        n.sibling().getLeft().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
        this.rotateRight(n.getParent());
    }
}

private nodeColor(n: org.kevoree.modeling.api.time.rbtree.TreeNode): org.kevoree.modeling.api.time.rbtree.Color {
    if (n == null) {
        return org.kevoree.modeling.api.time.rbtree.Color.BLACK;
    } else {
        return n.color;
    }
}


type State struct {

    public static EXISTS: State = new State();
    public static DELETED: State = new State();
}
public equals(other: any): boolean {
    return this == other;
}
public static _StateVALUES : State[] = [
    State.EXISTS
    ,State.DELETED
];
public static values():State[]{
    return State._StateVALUES;
}

type TreeNode struct {

    public static BLACK_DELETE: char = '0';
    public static BLACK_EXISTS: char = '1';
    public static RED_DELETE: char = '2';
    public static RED_EXISTS: char = '3';
    public key: int64;
    public value: org.kevoree.modeling.api.time.rbtree.State;
    public color: org.kevoree.modeling.api.time.rbtree.Color;
    private left: org.kevoree.modeling.api.time.rbtree.TreeNode;
    private right: org.kevoree.modeling.api.time.rbtree.TreeNode;
    private parent: org.kevoree.modeling.api.time.rbtree.TreeNode = null;
}
public getKey(): int64 {
    return this.key;
}

constructor(key: int64, value: org.kevoree.modeling.api.time.rbtree.State, color: org.kevoree.modeling.api.time.rbtree.Color, left: org.kevoree.modeling.api.time.rbtree.TreeNode, right: org.kevoree.modeling.api.time.rbtree.TreeNode) {
    this.key = key;
    this.value = value;
    this.color = color;
    this.left = left;
    this.right = right;
    if (left != null) {
        left.parent = this;
    }
    if (right != null) {
        right.parent = this;
    }
    this.parent = null;
}

public grandparent(): org.kevoree.modeling.api.time.rbtree.TreeNode {
    if (this.parent != null) {
        return this.parent.parent;
    } else {
        return null;
    }
}

public sibling(): org.kevoree.modeling.api.time.rbtree.TreeNode {
    if (this.parent == null) {
        return null;
    } else {
        if (this == this.parent.left) {
            return this.parent.right;
        } else {
            return this.parent.left;
        }
    }
}

public uncle(): org.kevoree.modeling.api.time.rbtree.TreeNode {
    if (this.parent != null) {
        return this.parent.sibling();
    } else {
        return null;
    }
}

public getLeft(): org.kevoree.modeling.api.time.rbtree.TreeNode {
    return this.left;
}

public setLeft(left: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    this.left = left;
}

public getRight(): org.kevoree.modeling.api.time.rbtree.TreeNode {
    return this.right;
}

public setRight(right: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    this.right = right;
}

public getParent(): org.kevoree.modeling.api.time.rbtree.TreeNode {
    return this.parent;
}

public setParent(parent: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
    this.parent = parent;
}

public serialize(builder: java.lang.StringBuilder): void {
    builder.append("|");
    if (this.value == org.kevoree.modeling.api.time.rbtree.State.DELETED) {
        if (this.color == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
            builder.append(TreeNode.BLACK_DELETE);
        } else {
            builder.append(TreeNode.RED_DELETE);
        }
    } else {
        if (this.color == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
            builder.append(TreeNode.BLACK_EXISTS);
        } else {
            builder.append(TreeNode.RED_EXISTS);
        }
    }
    builder.append(this.key);
    if (this.left == null && this.right == null) {
        builder.append("%");
    } else {
        if (this.left != null) {
            this.left.serialize(builder);
        } else {
            builder.append("#");
        }
        if (this.right != null) {
            this.right.serialize(builder);
        } else {
            builder.append("#");
        }
    }
}

public next(): org.kevoree.modeling.api.time.rbtree.TreeNode {
    var p: org.kevoree.modeling.api.time.rbtree.TreeNode = this;
    if (p.right != null) {
        p = p.right;
        while (p.left != null){
            p = p.left;
        }
        return p;
    } else {
        if (p.parent != null) {
            if (p == p.parent.left) {
                return p.parent;
            } else {
                while (p.parent != null && p == p.parent.right){
                    p = p.parent;
                }
                return p.parent;
            }
        } else {
            return null;
        }
    }
}

public previous(): org.kevoree.modeling.api.time.rbtree.TreeNode {
    var p: org.kevoree.modeling.api.time.rbtree.TreeNode = this;
    if (p.left != null) {
        p = p.left;
        while (p.right != null){
            p = p.right;
        }
        return p;
    } else {
        if (p.parent != null) {
            if (p == p.parent.right) {
                return p.parent;
            } else {
                while (p.parent != null && p == p.parent.left){
                    p = p.parent;
                }
                return p.parent;
            }
        } else {
            return null;
        }
    }
}

public static unserialize(ctx: org.kevoree.modeling.api.time.rbtree.TreeReaderContext): org.kevoree.modeling.api.time.rbtree.TreeNode {
    return org.kevoree.modeling.api.time.rbtree.TreeNode.internal_unserialize(true, ctx);
}

public static internal_unserialize(rightBranch: bool, ctx: org.kevoree.modeling.api.time.rbtree.TreeReaderContext): org.kevoree.modeling.api.time.rbtree.TreeNode {
    if (ctx.index >= ctx.payload.length) {
        return null;
    }
    var tokenBuild: java.lang.StringBuilder = new java.lang.StringBuilder();
    var ch: char = ctx.payload.charAt(ctx.index);
    if (ch == '%') {
        if (rightBranch) {
            ctx.index = ctx.index + 1;
        }
        return null;
    }
    if (ch == '#') {
        ctx.index = ctx.index + 1;
        return null;
    }
    if (ch != '|') {
        throw new java.lang.Exception("Error while loading BTree");
    }
    ctx.index = ctx.index + 1;
    ch = ctx.payload.charAt(ctx.index);
    var color: org.kevoree.modeling.api.time.rbtree.Color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
    var state: org.kevoree.modeling.api.time.rbtree.State = org.kevoree.modeling.api.time.rbtree.State.EXISTS;
    switch (ch) {
        case org.kevoree.modeling.api.time.rbtree.TreeNode.BLACK_DELETE: 
        color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
        state = org.kevoree.modeling.api.time.rbtree.State.DELETED;
        break;
        case org.kevoree.modeling.api.time.rbtree.TreeNode.BLACK_EXISTS: 
        color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
        state = org.kevoree.modeling.api.time.rbtree.State.EXISTS;
        break;
        case org.kevoree.modeling.api.time.rbtree.TreeNode.RED_DELETE: 
        color = org.kevoree.modeling.api.time.rbtree.Color.RED;
        state = org.kevoree.modeling.api.time.rbtree.State.DELETED;
        break;
        case org.kevoree.modeling.api.time.rbtree.TreeNode.RED_EXISTS: 
        color = org.kevoree.modeling.api.time.rbtree.Color.RED;
        state = org.kevoree.modeling.api.time.rbtree.State.EXISTS;
        break;
    }
    ctx.index = ctx.index + 1;
    ch = ctx.payload.charAt(ctx.index);
    while (ctx.index + 1 < ctx.payload.length && ch != '|' && ch != '#' && ch != '%'){
        tokenBuild.append(ch);
        ctx.index = ctx.index + 1;
        ch = ctx.payload.charAt(ctx.index);
    }
    if (ch != '|' && ch != '#' && ch != '%') {
        tokenBuild.append(ch);
    }
    var p: org.kevoree.modeling.api.time.rbtree.TreeNode = new org.kevoree.modeling.api.time.rbtree.TreeNode(java.lang.Long.parseLong(tokenBuild.toString()), state, color, null, null);
    var left: org.kevoree.modeling.api.time.rbtree.TreeNode = org.kevoree.modeling.api.time.rbtree.TreeNode.internal_unserialize(false, ctx);
    if (left != null) {
        left.setParent(p);
    }
    var right: org.kevoree.modeling.api.time.rbtree.TreeNode = org.kevoree.modeling.api.time.rbtree.TreeNode.internal_unserialize(true, ctx);
    if (right != null) {
        right.setParent(p);
    }
    p.setLeft(left);
    p.setRight(right);
    return p;
}


type TreeReaderContext struct {

    public payload: string;
    public index: int;
    public buffer: char[];
}

type ModelAddTrace struct implements org.kevoree.modeling.api.trace.ModelTrace {

    private _srcUUID: int64;
    private _reference: org.kevoree.modeling.api.meta.MetaReference;
    private _paramUUID: int64;
}
constructor(p_srcUUID: int64, p_reference: org.kevoree.modeling.api.meta.MetaReference, p_paramUUID: int64) {
    this._srcUUID = p_srcUUID;
    this._reference = p_reference;
    this._paramUUID = p_paramUUID;
}

public toString(): string {
    var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.openJSON);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.traceType);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.KActionType.ADD.toString());
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.src);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this._srcUUID + "");
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    if (this._reference != null) {
        buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
        buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
        buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.meta);
        buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
        buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
        buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
        buffer.append(this._reference.origin().metaName());
        buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.sep);
        buffer.append(this._reference.metaName());
        buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    }
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.previouspath);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this._paramUUID + "");
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.closeJSON);
    return buffer.toString();
}

public meta(): org.kevoree.modeling.api.meta.Meta {
    return this._reference;
}

public traceType(): org.kevoree.modeling.api.KActionType {
    return org.kevoree.modeling.api.KActionType.ADD;
}

public sourceUUID(): int64 {
    return null;
}

public paramUUID(): int64 {
    return this._paramUUID;
}


type ModelNewTrace struct implements org.kevoree.modeling.api.trace.ModelTrace {

    private _srcUUID: int64;
    private _metaClass: org.kevoree.modeling.api.meta.MetaClass;
}
constructor(p_srcUUID: int64, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
    this._srcUUID = p_srcUUID;
    this._metaClass = p_metaClass;
}

public meta(): org.kevoree.modeling.api.meta.Meta {
    return this._metaClass;
}

public traceType(): org.kevoree.modeling.api.KActionType {
    return org.kevoree.modeling.api.KActionType.NEW;
}

public sourceUUID(): int64 {
    return this._srcUUID;
}


type ModelRemoveTrace struct implements org.kevoree.modeling.api.trace.ModelTrace {

    private _srcUUID: int64;
    private _reference: org.kevoree.modeling.api.meta.MetaReference;
    private _paramUUID: int64;
}
constructor(p_srcUUID: int64, p_reference: org.kevoree.modeling.api.meta.MetaReference, p_paramUUID: int64) {
    this._srcUUID = p_srcUUID;
    this._reference = p_reference;
    this._paramUUID = p_paramUUID;
}

public toString(): string {
    var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.openJSON);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.traceType);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.KActionType.REMOVE);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.src);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this._srcUUID + "");
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.meta);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(this._reference.metaName());
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.objpath);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this._paramUUID + "");
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.closeJSON);
    return buffer.toString();
}

public meta(): org.kevoree.modeling.api.meta.Meta {
    return this._reference;
}

public traceType(): org.kevoree.modeling.api.KActionType {
    return org.kevoree.modeling.api.KActionType.REMOVE;
}

public sourceUUID(): int64 {
    return this._srcUUID;
}

public paramUUID(): int64 {
    return this._paramUUID;
}


type ModelSetTrace struct implements org.kevoree.modeling.api.trace.ModelTrace {

    private _srcUUID: int64;
    private _attribute: org.kevoree.modeling.api.meta.MetaAttribute;
    private _content: interface{};
}
constructor(p_srcUUID: int64, p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_content: interface{}) {
    this._srcUUID = p_srcUUID;
    this._attribute = p_attribute;
    this._content = p_content;
}

public toString(): string {
    var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.openJSON);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.traceType);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.KActionType.SET);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.src);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this._srcUUID + "");
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.meta);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    buffer.append(this._attribute.metaName());
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    if (this._content != null) {
        buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
        buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
        buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.content);
        buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
        buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
        buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
        org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this._content.toString());
        buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
    }
    buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.closeJSON);
    return buffer.toString();
}

public meta(): org.kevoree.modeling.api.meta.Meta {
    return this._attribute;
}

public traceType(): org.kevoree.modeling.api.KActionType {
    return org.kevoree.modeling.api.KActionType.SET;
}

public sourceUUID(): int64 {
    return this._srcUUID;
}

public content(): interface{} {
    return this._content;
}


type ModelTrace interface {
    meta() : org.kevoree.modeling.api.meta.Meta
    traceType() : org.kevoree.modeling.api.KActionType
    sourceUUID() : int64
}
type ModelTraceApplicator struct {

    private _targetModel: org.kevoree.modeling.api.KObject;
}
constructor(p_targetModel: org.kevoree.modeling.api.KObject) {
    this._targetModel = p_targetModel;
}

public applyTraceSequence(traceSeq: org.kevoree.modeling.api.trace.TraceSequence, callback: (p : java.lang.Throwable) => void): void {
    try {
        var traces: org.kevoree.modeling.api.trace.ModelTrace[] = traceSeq.traces();
        var dependencies: java.util.HashSet<int64> = new java.util.HashSet<int64>();
        for (var i: int = 0; i < traces.length; i++) {
            if (traces[i] instanceof org.kevoree.modeling.api.trace.ModelAddTrace) {
                dependencies.add((traces[i].(org.kevoree.modeling.api.trace.ModelAddTrace)).paramUUID());
                dependencies.add(traces[i].sourceUUID());
            }
            if (traces[i] instanceof org.kevoree.modeling.api.trace.ModelRemoveTrace) {
                dependencies.add((traces[i].(org.kevoree.modeling.api.trace.ModelRemoveTrace)).paramUUID());
                dependencies.add(traces[i].sourceUUID());
            }
            if (traces[i] instanceof org.kevoree.modeling.api.trace.ModelSetTrace) {
                if (traces[i].meta() instanceof org.kevoree.modeling.api.abs.AbstractMetaAttribute) {
                    dependencies.add(traces[i].sourceUUID());
                } else {
                    try {
                        var paramUUID: int64 = java.lang.Long.parseLong((traces[i].(org.kevoree.modeling.api.trace.ModelSetTrace)).content().toString());
                        dependencies.add(paramUUID);
                        dependencies.add(traces[i].sourceUUID());
                    } catch ($ex$) {
                        if ($ex$ instanceof java.lang.Exception) {
                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                            e.printStackTrace();
                        }
                     }
                }
            }
        }
        var dependenciesArray: int64[] = dependencies.toArray(new Array());
        this._targetModel.view().lookupAll(dependenciesArray,  (kObjects : org.kevoree.modeling.api.KObject[]) => {
            var cached: java.util.HashMap<int64, org.kevoree.modeling.api.KObject> = new java.util.HashMap<int64, org.kevoree.modeling.api.KObject>();
            for (var i: int = 0; i < traces.length; i++) {
                try {
                    var trace: org.kevoree.modeling.api.trace.ModelTrace = traces[i];
                    var sourceObject: org.kevoree.modeling.api.KObject = cached.get(trace.sourceUUID());
                    if (sourceObject != null) {
                        if (trace instanceof org.kevoree.modeling.api.trace.ModelRemoveTrace) {
                            var removeTrace: org.kevoree.modeling.api.trace.ModelRemoveTrace = trace.(org.kevoree.modeling.api.trace.ModelRemoveTrace);
                            var param: org.kevoree.modeling.api.KObject = cached.get(removeTrace.paramUUID());
                            if (param != null) {
                                sourceObject.mutate(org.kevoree.modeling.api.KActionType.REMOVE, removeTrace.meta().(org.kevoree.modeling.api.meta.MetaReference), param);
                            }
                        } else {
                            if (trace instanceof org.kevoree.modeling.api.trace.ModelAddTrace) {
                                var addTrace: org.kevoree.modeling.api.trace.ModelAddTrace = trace.(org.kevoree.modeling.api.trace.ModelAddTrace);
                                var param: org.kevoree.modeling.api.KObject = cached.get(addTrace.paramUUID());
                                if (param != null) {
                                    sourceObject.mutate(org.kevoree.modeling.api.KActionType.ADD, addTrace.meta().(org.kevoree.modeling.api.meta.MetaReference), param);
                                }
                            } else {
                                if (trace instanceof org.kevoree.modeling.api.trace.ModelSetTrace) {
                                    var setTrace: org.kevoree.modeling.api.trace.ModelSetTrace = trace.(org.kevoree.modeling.api.trace.ModelSetTrace);
                                    if (trace.meta() instanceof org.kevoree.modeling.api.abs.AbstractMetaAttribute) {
                                        sourceObject.set(trace.meta().(org.kevoree.modeling.api.meta.MetaAttribute), setTrace.content());
                                    } else {
                                        try {
                                            var paramUUID: int64 = java.lang.Long.parseLong((traces[i].(org.kevoree.modeling.api.trace.ModelSetTrace)).content().toString());
                                            var param: org.kevoree.modeling.api.KObject = cached.get(paramUUID);
                                            if (param != null) {
                                                sourceObject.mutate(org.kevoree.modeling.api.KActionType.SET, trace.meta().(org.kevoree.modeling.api.meta.MetaReference), param);
                                            }
                                        } catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                e.printStackTrace();
                                            }
                                         }
                                    }
                                } else {
                                    if (trace instanceof org.kevoree.modeling.api.trace.ModelNewTrace) {
                                        var tree: org.kevoree.modeling.api.time.DefaultTimeTree = new org.kevoree.modeling.api.time.DefaultTimeTree();
                                        tree.insert(this._targetModel.now());
                                        var newCreated: org.kevoree.modeling.api.KObject = (this._targetModel.view().(org.kevoree.modeling.api.abs.AbstractKView)).createProxy(trace.meta().(org.kevoree.modeling.api.meta.MetaClass), tree, trace.sourceUUID());
                                        cached.put(newCreated.uuid(), newCreated);
                                    } else {
                                        System.err.println("Unknow traceType: " + trace);
                                    }
                                }
                            }
                        }
                    } else {
                        System.err.println("Unknow object: " + trace);
                    }
                } catch ($ex$) {
                    if ($ex$ instanceof java.lang.Exception) {
                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                        e.printStackTrace();
                        System.err.println("Error " + e);
                    }
                 }
            }
            callback(null);
        });
    } catch ($ex$) {
        if ($ex$ instanceof java.lang.Exception) {
            var e: java.lang.Exception = <java.lang.Exception>$ex$;
            callback(e);
        }
     }
}


type ModelTraceConstants struct {

    public static traceType: ModelTraceConstants = new ModelTraceConstants("type");
    public static src: ModelTraceConstants = new ModelTraceConstants("src");
    public static meta: ModelTraceConstants = new ModelTraceConstants("meta");
    public static previouspath: ModelTraceConstants = new ModelTraceConstants("prev");
    public static typename: ModelTraceConstants = new ModelTraceConstants("class");
    public static objpath: ModelTraceConstants = new ModelTraceConstants("orig");
    public static content: ModelTraceConstants = new ModelTraceConstants("val");
    public static openJSON: ModelTraceConstants = new ModelTraceConstants("{");
    public static closeJSON: ModelTraceConstants = new ModelTraceConstants("}");
    public static bb: ModelTraceConstants = new ModelTraceConstants("\"");
    public static sep: ModelTraceConstants = new ModelTraceConstants("@");
    public static coma: ModelTraceConstants = new ModelTraceConstants(",");
    public static dp: ModelTraceConstants = new ModelTraceConstants(":");
    private _code: string = "";
}
constructor(p_code: string) {
    this._code = p_code;
}

public toString(): string {
    return this._code;
}

public equals(other: any): boolean {
    return this == other;
}
public static _ModelTraceConstantsVALUES : ModelTraceConstants[] = [
    ModelTraceConstants.traceType
    ,ModelTraceConstants.src
    ,ModelTraceConstants.meta
    ,ModelTraceConstants.previouspath
    ,ModelTraceConstants.typename
    ,ModelTraceConstants.objpath
    ,ModelTraceConstants.content
    ,ModelTraceConstants.openJSON
    ,ModelTraceConstants.closeJSON
    ,ModelTraceConstants.bb
    ,ModelTraceConstants.sep
    ,ModelTraceConstants.coma
    ,ModelTraceConstants.dp
];
public static values():ModelTraceConstants[]{
    return ModelTraceConstants._ModelTraceConstantsVALUES;
}

type TraceSequence struct {

    private _traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
}
public traces(): org.kevoree.modeling.api.trace.ModelTrace[] {
    return this._traces.toArray(new Array());
}

public populate(addtraces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace>): org.kevoree.modeling.api.trace.TraceSequence {
    this._traces.addAll(addtraces);
    return this;
}

public append(seq: org.kevoree.modeling.api.trace.TraceSequence): org.kevoree.modeling.api.trace.TraceSequence {
    this._traces.addAll(seq._traces);
    return this;
}

public toString(): string {
    var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
    buffer.append("[");
    var isFirst: bool = true;
    for (var i: int = 0; i < this._traces.size(); i++) {
        var trace: org.kevoree.modeling.api.trace.ModelTrace = this._traces.get(i);
        if (!isFirst) {
            buffer.append(",\n");
        }
        buffer.append(trace);
        isFirst = false;
    }
    buffer.append("]");
    return buffer.toString();
}

public applyOn(target: org.kevoree.modeling.api.KObject, callback: (p : java.lang.Throwable) => void): bool {
    var traceApplicator: org.kevoree.modeling.api.trace.ModelTraceApplicator = new org.kevoree.modeling.api.trace.ModelTraceApplicator(target);
    traceApplicator.applyTraceSequence(this, callback);
    return true;
}

public reverse(): org.kevoree.modeling.api.trace.TraceSequence {
    java.util.Collections.reverse(this._traces);
    return this;
}

public size(): int {
    return this._traces.size();
}


type DefaultKTraversal struct implements org.kevoree.modeling.api.traversal.KTraversal {

    private _initObjs: org.kevoree.modeling.api.KObject[];
    private _initAction: org.kevoree.modeling.api.traversal.KTraversalAction;
    private _lastAction: org.kevoree.modeling.api.traversal.KTraversalAction;
    private _terminated: bool = false;
}
constructor(p_root: org.kevoree.modeling.api.KObject, p_ref: org.kevoree.modeling.api.meta.MetaReference, p_ref_query: string) {
    if (p_ref_query != null) {
        this._initAction = new org.kevoree.modeling.api.traversal.actions.KTraverseQueryAction(p_ref_query);
    } else {
        this._initAction = new org.kevoree.modeling.api.traversal.actions.KTraverseAction(p_ref);
    }
    this._initObjs = new Array();
    this._initObjs[0] = p_root;
    this._lastAction = this._initAction;
}

public traverse(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.traversal.KTraversal {
    if (this._terminated) {
        throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
    }
    var tempAction: org.kevoree.modeling.api.traversal.actions.KTraverseAction = new org.kevoree.modeling.api.traversal.actions.KTraverseAction(p_metaReference);
    this._lastAction.chain(tempAction);
    this._lastAction = tempAction;
    return this;
}

public traverseQuery(p_metaReferenceQuery: string): org.kevoree.modeling.api.traversal.KTraversal {
    if (this._terminated) {
        throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
    }
    var tempAction: org.kevoree.modeling.api.traversal.actions.KTraverseQueryAction = new org.kevoree.modeling.api.traversal.actions.KTraverseQueryAction(p_metaReferenceQuery);
    this._lastAction.chain(tempAction);
    this._lastAction = tempAction;
    return this;
}

public withAttribute(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_expectedValue: interface{}): org.kevoree.modeling.api.traversal.KTraversal {
    if (this._terminated) {
        throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
    }
    var tempAction: org.kevoree.modeling.api.traversal.actions.KFilterAttributeAction = new org.kevoree.modeling.api.traversal.actions.KFilterAttributeAction(p_attribute, p_expectedValue);
    this._lastAction.chain(tempAction);
    this._lastAction = tempAction;
    return this;
}

public withoutAttribute(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_expectedValue: interface{}): org.kevoree.modeling.api.traversal.KTraversal {
    if (this._terminated) {
        throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
    }
    var tempAction: org.kevoree.modeling.api.traversal.actions.KFilterNotAttributeAction = new org.kevoree.modeling.api.traversal.actions.KFilterNotAttributeAction(p_attribute, p_expectedValue);
    this._lastAction.chain(tempAction);
    this._lastAction = tempAction;
    return this;
}

public attributeQuery(p_attributeQuery: string): org.kevoree.modeling.api.traversal.KTraversal {
    if (this._terminated) {
        throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
    }
    var tempAction: org.kevoree.modeling.api.traversal.actions.KFilterAttributeQueryAction = new org.kevoree.modeling.api.traversal.actions.KFilterAttributeQueryAction(p_attributeQuery);
    this._lastAction.chain(tempAction);
    this._lastAction = tempAction;
    return this;
}

public filter(p_filter: (p : org.kevoree.modeling.api.KObject) => bool): org.kevoree.modeling.api.traversal.KTraversal {
    if (this._terminated) {
        throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
    }
    var tempAction: org.kevoree.modeling.api.traversal.actions.KFilterAction = new org.kevoree.modeling.api.traversal.actions.KFilterAction(p_filter);
    this._lastAction.chain(tempAction);
    this._lastAction = tempAction;
    return this;
}

public reverse(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.traversal.KTraversal {
    if (this._terminated) {
        throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
    }
    var tempAction: org.kevoree.modeling.api.traversal.actions.KReverseAction = new org.kevoree.modeling.api.traversal.actions.KReverseAction(p_metaReference);
    this._lastAction.chain(tempAction);
    this._lastAction = tempAction;
    return this;
}

public parents(): org.kevoree.modeling.api.traversal.KTraversal {
    if (this._terminated) {
        throw new java.lang.RuntimeException("Promise is terminated by the call of then method, please create another promise");
    }
    var tempAction: org.kevoree.modeling.api.traversal.actions.KParentsAction = new org.kevoree.modeling.api.traversal.actions.KParentsAction();
    this._lastAction.chain(tempAction);
    this._lastAction = tempAction;
    return this;
}

public then(callback: (p : org.kevoree.modeling.api.KObject[]) => void): void {
    this._terminated = true;
    this._lastAction.chain(new org.kevoree.modeling.api.traversal.actions.KFinalAction(callback));
    this._initAction.execute(this._initObjs);
}

public map(attribute: org.kevoree.modeling.api.meta.MetaAttribute, callback: (p : interface{}[]) => void): void {
    this._terminated = true;
    this._lastAction.chain(new org.kevoree.modeling.api.traversal.actions.KMapAction(attribute, callback));
    this._initAction.execute(this._initObjs);
}

public taskThen(): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.then(task.initCallback());
    return task;
}

public taskMap(attribute: org.kevoree.modeling.api.meta.MetaAttribute): org.kevoree.modeling.api.KTask<any> {
    var task: org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKTaskWrapper<any>();
    this.map(attribute, task.initCallback());
    return task;
}


type KTraversal interface {
    traverse(metaReference : org.kevoree.modeling.api.meta.MetaReference) : org.kevoree.modeling.api.traversal.KTraversal
    traverseQuery(metaReferenceQuery : string) : org.kevoree.modeling.api.traversal.KTraversal
    attributeQuery(attributeQuery : string) : org.kevoree.modeling.api.traversal.KTraversal
    withAttribute(attribute : org.kevoree.modeling.api.meta.MetaAttribute,expectedValue : interface{}) : org.kevoree.modeling.api.traversal.KTraversal
    withoutAttribute(attribute : org.kevoree.modeling.api.meta.MetaAttribute,expectedValue : interface{}) : org.kevoree.modeling.api.traversal.KTraversal
    filter(filter : (p : org.kevoree.modeling.api.KObject) => bool) : org.kevoree.modeling.api.traversal.KTraversal
    reverse(metaReference : org.kevoree.modeling.api.meta.MetaReference) : org.kevoree.modeling.api.traversal.KTraversal
    parents() : org.kevoree.modeling.api.traversal.KTraversal
    then(callback : (p : org.kevoree.modeling.api.KObject[]) => void) : void
    map(attribute : org.kevoree.modeling.api.meta.MetaAttribute,callback : (p : interface{}[]) => void) : void
    taskThen() : org.kevoree.modeling.api.KTask<any>
    taskMap(attribute : org.kevoree.modeling.api.meta.MetaAttribute) : org.kevoree.modeling.api.KTask<any>
}
type KTraversalAction interface {
    chain(next : org.kevoree.modeling.api.traversal.KTraversalAction) : void
    execute(inputs : org.kevoree.modeling.api.KObject[]) : void
}
type KTraversalFilter interface {
    filter(obj : org.kevoree.modeling.api.KObject) : bool
}
type KFilterAction struct implements org.kevoree.modeling.api.traversal.KTraversalAction {

    private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
    private _filter: (p : org.kevoree.modeling.api.KObject) => bool;
}
constructor(p_filter: (p : org.kevoree.modeling.api.KObject) => bool) {
    this._filter = p_filter;
}

public chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void {
    this._next = p_next;
}

public execute(p_inputs: org.kevoree.modeling.api.KObject[]): void {
    var nextStep: java.util.Set<org.kevoree.modeling.api.KObject> = new java.util.HashSet<org.kevoree.modeling.api.KObject>();
    for (var i: int = 0; i < p_inputs.length; i++) {
        try {
            if (this._filter(p_inputs[i])) {
                nextStep.add(p_inputs[i]);
            }
        } catch ($ex$) {
            if ($ex$ instanceof java.lang.Exception) {
                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                e.printStackTrace();
            }
         }
    }
    this._next.execute(nextStep.toArray(new Array()));
}


type KFilterAttributeAction struct implements org.kevoree.modeling.api.traversal.KTraversalAction {

    private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
    private _attribute: org.kevoree.modeling.api.meta.MetaAttribute;
    private _expectedValue: interface{};
}
constructor(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_expectedValue: interface{}) {
    this._attribute = p_attribute;
    this._expectedValue = p_expectedValue;
}

public chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void {
    this._next = p_next;
}

public execute(p_inputs: org.kevoree.modeling.api.KObject[]): void {
    if (p_inputs == null || p_inputs.length == 0) {
        this._next.execute(p_inputs);
        return;
    } else {
        var currentView: org.kevoree.modeling.api.KView = p_inputs[0].view();
        var nextStep: java.util.Set<org.kevoree.modeling.api.KObject> = new java.util.HashSet<org.kevoree.modeling.api.KObject>();
        for (var i: int = 0; i < p_inputs.length; i++) {
            try {
                var loopObj: org.kevoree.modeling.api.abs.AbstractKObject = p_inputs[i].(org.kevoree.modeling.api.abs.AbstractKObject);
                var raw: interface{}[] = currentView.universe().model().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
                if (raw != null) {
                    if (this._attribute == null) {
                        if (this._expectedValue == null) {
                            nextStep.add(loopObj);
                        } else {
                            var addToNext: bool = false;
                            for (var j: int = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                var ref: org.kevoree.modeling.api.meta.MetaAttribute = loopObj.metaClass().metaAttributes()[j];
                                var resolved: interface{} = raw[ref.index()];
                                if (resolved == null) {
                                    if (this._expectedValue.toString().equals("*")) {
                                        addToNext = true;
                                    }
                                } else {
                                    if (resolved.equals(this._expectedValue)) {
                                        addToNext = true;
                                    } else {
                                        if (resolved.toString().matches(this._expectedValue.toString().replace("*", ".*"))) {
                                            addToNext = true;
                                        }
                                    }
                                }
                            }
                            if (addToNext) {
                                nextStep.add(loopObj);
                            }
                        }
                    } else {
                        var translatedAtt: org.kevoree.modeling.api.meta.MetaAttribute = loopObj.internal_transpose_att(this._attribute);
                        if (translatedAtt != null) {
                            var resolved: interface{} = raw[translatedAtt.index()];
                            if (this._expectedValue == null) {
                                if (resolved == null) {
                                    nextStep.add(loopObj);
                                }
                            } else {
                                if (resolved == null) {
                                    if (this._expectedValue.toString().equals("*")) {
                                        nextStep.add(loopObj);
                                    }
                                } else {
                                    if (resolved.equals(this._expectedValue)) {
                                        nextStep.add(loopObj);
                                    } else {
                                        if (resolved.toString().matches(this._expectedValue.toString().replace("*", ".*"))) {
                                            nextStep.add(loopObj);
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    System.err.println("WARN: Empty KObject " + loopObj.uuid());
                }
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
        }
        this._next.execute(nextStep.toArray(new Array()));
    }
}


type KFilterAttributeQueryAction struct implements org.kevoree.modeling.api.traversal.KTraversalAction {

    private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
    private _attributeQuery: string;
}
constructor(p_attributeQuery: string) {
    this._attributeQuery = p_attributeQuery;
}

public chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void {
    this._next = p_next;
}

public execute(p_inputs: org.kevoree.modeling.api.KObject[]): void {
    if (p_inputs == null || p_inputs.length == 0) {
        this._next.execute(p_inputs);
        return;
    } else {
        var currentView: org.kevoree.modeling.api.KView = p_inputs[0].view();
        var nextStep: java.util.Set<org.kevoree.modeling.api.KObject> = new java.util.HashSet<org.kevoree.modeling.api.KObject>();
        for (var i: int = 0; i < p_inputs.length; i++) {
            try {
                var loopObj: org.kevoree.modeling.api.abs.AbstractKObject = p_inputs[i].(org.kevoree.modeling.api.abs.AbstractKObject);
                var raw: interface{}[] = currentView.universe().model().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
                if (raw != null) {
                    if (this._attributeQuery == null) {
                        nextStep.add(loopObj);
                    } else {
                        var params: java.util.Map<string, org.kevoree.modeling.api.traversal.selector.KQueryParam> = this.buildParams(this._attributeQuery);
                        var selectedForNext: bool = true;
                        var paramKeys: string[] = params.keySet().toArray(new Array());
                        for (var h: int = 0; h < paramKeys.length; h++) {
                            var param: org.kevoree.modeling.api.traversal.selector.KQueryParam = params.get(paramKeys[h]);
                            for (var j: int = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                var metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute = loopObj.metaClass().metaAttributes()[j];
                                if (metaAttribute.metaName().matches(param.name())) {
                                    var o_raw: interface{} = loopObj.get(metaAttribute);
                                    if (o_raw != null) {
                                        if (param.value().equals("null")) {
                                            if (!param.isNegative()) {
                                                selectedForNext = false;
                                            }
                                        } else {
                                            if (o_raw.toString().matches(param.value())) {
                                                if (param.isNegative()) {
                                                    selectedForNext = false;
                                                }
                                            } else {
                                                if (!param.isNegative()) {
                                                    selectedForNext = false;
                                                }
                                            }
                                        }
                                    } else {
                                        if (param.value().equals("null") || param.value().equals("*")) {
                                            if (param.isNegative()) {
                                                selectedForNext = false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (selectedForNext) {
                            nextStep.add(loopObj);
                        }
                    }
                } else {
                    System.err.println("WARN: Empty KObject " + loopObj.uuid());
                }
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
        }
        this._next.execute(nextStep.toArray(new Array()));
    }
}

private buildParams(p_paramString: string): java.util.Map<string, org.kevoree.modeling.api.traversal.selector.KQueryParam> {
    var params: java.util.Map<string, org.kevoree.modeling.api.traversal.selector.KQueryParam> = new java.util.HashMap<string, org.kevoree.modeling.api.traversal.selector.KQueryParam>();
    var iParam: int = 0;
    var lastStart: int = iParam;
    while (iParam < p_paramString.length){
        if (p_paramString.charAt(iParam) == ',') {
            var p: string = p_paramString.substring(lastStart, iParam).trim();
            if (p.equals("") && !p.equals("*")) {
                if (p.endsWith("=")) {
                    p = p + "*";
                }
                var pArray: string[] = p.split("=");
                var pObject: org.kevoree.modeling.api.traversal.selector.KQueryParam;
                if (pArray.length > 1) {
                    var paramKey: string = pArray[0].trim();
                    var negative: bool = paramKey.endsWith("!");
                    pObject = new org.kevoree.modeling.api.traversal.selector.KQueryParam(paramKey.replace("!", "").replace("*", ".*"), pArray[1].trim().replace("*", ".*"), negative);
                    params.put(pObject.name(), pObject);
                }
            }
            lastStart = iParam + 1;
        }
        iParam = iParam + 1;
    }
    var lastParam: string = p_paramString.substring(lastStart, iParam).trim();
    if (!lastParam.equals("") && !lastParam.equals("*")) {
        if (lastParam.endsWith("=")) {
            lastParam = lastParam + "*";
        }
        var pArray: string[] = lastParam.split("=");
        var pObject: org.kevoree.modeling.api.traversal.selector.KQueryParam;
        if (pArray.length > 1) {
            var paramKey: string = pArray[0].trim();
            var negative: bool = paramKey.endsWith("!");
            pObject = new org.kevoree.modeling.api.traversal.selector.KQueryParam(paramKey.replace("!", "").replace("*", ".*"), pArray[1].trim().replace("*", ".*"), negative);
            params.put(pObject.name(), pObject);
        }
    }
    return params;
}


type KFilterNotAttributeAction struct implements org.kevoree.modeling.api.traversal.KTraversalAction {

    private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
    private _attribute: org.kevoree.modeling.api.meta.MetaAttribute;
    private _expectedValue: interface{};
}
constructor(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_expectedValue: interface{}) {
    this._attribute = p_attribute;
    this._expectedValue = p_expectedValue;
}

public chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void {
    this._next = p_next;
}

public execute(p_inputs: org.kevoree.modeling.api.KObject[]): void {
    if (p_inputs == null || p_inputs.length == 0) {
        this._next.execute(p_inputs);
    } else {
        var currentView: org.kevoree.modeling.api.KView = p_inputs[0].view();
        var nextStep: java.util.Set<org.kevoree.modeling.api.KObject> = new java.util.HashSet<org.kevoree.modeling.api.KObject>();
        for (var i: int = 0; i < p_inputs.length; i++) {
            try {
                var loopObj: org.kevoree.modeling.api.abs.AbstractKObject = p_inputs[i].(org.kevoree.modeling.api.abs.AbstractKObject);
                var raw: interface{}[] = currentView.universe().model().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
                if (raw != null) {
                    if (this._attribute == null) {
                        if (this._expectedValue == null) {
                            nextStep.add(loopObj);
                        } else {
                            var addToNext: bool = true;
                            for (var j: int = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                var ref: org.kevoree.modeling.api.meta.MetaAttribute = loopObj.metaClass().metaAttributes()[j];
                                var resolved: interface{} = raw[ref.index()];
                                if (resolved == null) {
                                    if (this._expectedValue.toString().equals("*")) {
                                        addToNext = false;
                                    }
                                } else {
                                    if (resolved.equals(this._expectedValue)) {
                                        addToNext = false;
                                    } else {
                                        if (resolved.toString().matches(this._expectedValue.toString().replace("*", ".*"))) {
                                            addToNext = false;
                                        }
                                    }
                                }
                            }
                            if (addToNext) {
                                nextStep.add(loopObj);
                            }
                        }
                    } else {
                        var translatedAtt: org.kevoree.modeling.api.meta.MetaAttribute = loopObj.internal_transpose_att(this._attribute);
                        if (translatedAtt != null) {
                            var resolved: interface{} = raw[translatedAtt.index()];
                            if (this._expectedValue == null) {
                                if (resolved != null) {
                                    nextStep.add(loopObj);
                                }
                            } else {
                                if (resolved == null) {
                                    if (!this._expectedValue.toString().equals("*")) {
                                        nextStep.add(loopObj);
                                    }
                                } else {
                                    if (resolved.equals(this._expectedValue)) {
                                    } else {
                                        if (resolved.toString().matches(this._expectedValue.toString().replace("*", ".*"))) {
                                        } else {
                                            nextStep.add(loopObj);
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    System.err.println("WARN: Empty KObject " + loopObj.uuid());
                }
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
        }
        this._next.execute(nextStep.toArray(new Array()));
    }
}


type KFinalAction struct implements org.kevoree.modeling.api.traversal.KTraversalAction {

    private _finalCallback: (p : org.kevoree.modeling.api.KObject[]) => void;
}
constructor(p_callback: (p : org.kevoree.modeling.api.KObject[]) => void) {
    this._finalCallback = p_callback;
}

public chain(next: org.kevoree.modeling.api.traversal.KTraversalAction): void {
}

public execute(inputs: org.kevoree.modeling.api.KObject[]): void {
    this._finalCallback(inputs);
}


type KMapAction struct implements org.kevoree.modeling.api.traversal.KTraversalAction {

    private _finalCallback: (p : interface{}[]) => void;
    private _attribute: org.kevoree.modeling.api.meta.MetaAttribute;
}
constructor(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_callback: (p : interface{}[]) => void) {
    this._finalCallback = p_callback;
    this._attribute = p_attribute;
}

public chain(next: org.kevoree.modeling.api.traversal.KTraversalAction): void {
}

public execute(inputs: org.kevoree.modeling.api.KObject[]): void {
    var collected: java.util.List<interface{}> = new java.util.ArrayList<interface{}>();
    for (var i: int = 0; i < inputs.length; i++) {
        if (inputs[i] != null) {
            var resolved: interface{} = inputs[i].get(this._attribute);
            if (resolved != null) {
                collected.add(resolved);
            }
        }
    }
    this._finalCallback(collected.toArray(new Array()));
}


type KParentsAction struct implements org.kevoree.modeling.api.traversal.KTraversalAction {

    private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
}
constructor() {
}

public chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void {
    this._next = p_next;
}

public execute(p_inputs: org.kevoree.modeling.api.KObject[]): void {
    if (p_inputs == null || p_inputs.length == 0) {
        this._next.execute(p_inputs);
        return;
    } else {
        var currentView: org.kevoree.modeling.api.KView = p_inputs[0].view();
        var nextIds: java.util.Set<int64> = new java.util.HashSet<int64>();
        for (var i: int = 0; i < p_inputs.length; i++) {
            try {
                var loopObj: org.kevoree.modeling.api.abs.AbstractKObject = p_inputs[i].(org.kevoree.modeling.api.abs.AbstractKObject);
                var raw: interface{}[] = currentView.universe().model().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
                var resolved: interface{} = raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX];
                if (resolved != null) {
                    try {
                        nextIds.add(resolved.(int64));
                    } catch ($ex$) {
                        if ($ex$ instanceof java.lang.Exception) {
                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                            e.printStackTrace();
                        }
                     }
                }
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
        }
        currentView.lookupAll(nextIds.toArray(new Array()),  (kObjects : org.kevoree.modeling.api.KObject[]) => {
            this._next.execute(kObjects);
        });
    }
}


type KReverseAction struct implements org.kevoree.modeling.api.traversal.KTraversalAction {

    private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
    private _reference: org.kevoree.modeling.api.meta.MetaReference;
}
constructor(p_reference: org.kevoree.modeling.api.meta.MetaReference) {
    this._reference = p_reference;
}

public chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void {
    this._next = p_next;
}

public execute(p_inputs: org.kevoree.modeling.api.KObject[]): void {
    if (p_inputs == null || p_inputs.length == 0) {
        this._next.execute(p_inputs);
        return;
    } else {
        var currentView: org.kevoree.modeling.api.KView = p_inputs[0].view();
        var nextIds: java.util.Set<int64> = new java.util.HashSet<int64>();
        var toFilter: java.util.Map<int64, org.kevoree.modeling.api.KObject> = new java.util.HashMap<int64, org.kevoree.modeling.api.KObject>();
        for (var i: int = 0; i < p_inputs.length; i++) {
            try {
                var loopObj: org.kevoree.modeling.api.abs.AbstractKObject = p_inputs[i].(org.kevoree.modeling.api.abs.AbstractKObject);
                var raw: interface{}[] = currentView.universe().model().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
                if (this._reference == null) {
                    if (raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null && raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] instanceof java.util.Set) {
                        var casted: java.util.Set<int64> = raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX].(java.util.Set<int64>);
                        var castedArr: int64[] = casted.toArray(new Array());
                        for (var j: int = 0; j < castedArr.length; j++) {
                            nextIds.add(castedArr[j]);
                        }
                    }
                } else {
                    if (raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null && raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] instanceof java.util.Set) {
                        var casted: java.util.Set<int64> = raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX].(java.util.Set<int64>);
                        var castedArr: int64[] = casted.toArray(new Array());
                        for (var j: int = 0; j < castedArr.length; j++) {
                            toFilter.put(castedArr[j], p_inputs[i]);
                        }
                    }
                }
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
        }
        if (toFilter.keySet().size() == 0) {
            currentView.lookupAll(nextIds.toArray(new Array()),  (kObjects : org.kevoree.modeling.api.KObject[]) => {
                this._next.execute(kObjects);
            });
        } else {
            var toFilterKeys: int64[] = toFilter.keySet().toArray(new Array());
            currentView.lookupAll(toFilterKeys,  (kObjects : org.kevoree.modeling.api.KObject[]) => {
                for (var i: int = 0; i < toFilterKeys.length; i++) {
                    if (kObjects[i] != null) {
                        var references: org.kevoree.modeling.api.meta.MetaReference[] = kObjects[i].referencesWith(toFilter.get(toFilterKeys[i]));
                        for (var h: int = 0; h < references.length; h++) {
                            if (references[h].metaName().equals(this._reference.metaName())) {
                                nextIds.add(kObjects[i].uuid());
                            }
                        }
                    }
                }
                currentView.lookupAll(nextIds.toArray(new Array()),  (kObjects : org.kevoree.modeling.api.KObject[]) => {
                    this._next.execute(kObjects);
                });
            });
        }
    }
}


type KTraverseAction struct implements org.kevoree.modeling.api.traversal.KTraversalAction {

    private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
    private _reference: org.kevoree.modeling.api.meta.MetaReference;
}
constructor(p_reference: org.kevoree.modeling.api.meta.MetaReference) {
    this._reference = p_reference;
}

public chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void {
    this._next = p_next;
}

public execute(p_inputs: org.kevoree.modeling.api.KObject[]): void {
    if (p_inputs == null || p_inputs.length == 0) {
        this._next.execute(p_inputs);
        return;
    } else {
        var currentView: org.kevoree.modeling.api.KView = p_inputs[0].view();
        var nextIds: java.util.Set<int64> = new java.util.HashSet<int64>();
        for (var i: int = 0; i < p_inputs.length; i++) {
            try {
                var loopObj: org.kevoree.modeling.api.abs.AbstractKObject = p_inputs[i].(org.kevoree.modeling.api.abs.AbstractKObject);
                var raw: interface{}[] = currentView.universe().model().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
                if (this._reference == null) {
                    for (var j: int = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                        var ref: org.kevoree.modeling.api.meta.MetaReference = loopObj.metaClass().metaReferences()[j];
                        var resolved: interface{} = raw[ref.index()];
                        if (resolved != null) {
                            if (resolved instanceof java.util.Set) {
                                var resolvedCasted: java.util.Set<int64> = resolved.(java.util.Set<int64>);
                                var resolvedArr: int64[] = resolvedCasted.toArray(new Array());
                                for (var k: int = 0; k < resolvedArr.length; k++) {
                                    var idResolved: int64 = resolvedArr[k];
                                    if (idResolved != null) {
                                        nextIds.add(idResolved);
                                    }
                                }
                            } else {
                                try {
                                    nextIds.add(resolved.(int64));
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                        e.printStackTrace();
                                    }
                                 }
                            }
                        }
                    }
                } else {
                    var translatedRef: org.kevoree.modeling.api.meta.MetaReference = loopObj.internal_transpose_ref(this._reference);
                    if (translatedRef != null) {
                        var resolved: interface{} = raw[translatedRef.index()];
                        if (resolved != null) {
                            if (resolved instanceof java.util.Set) {
                                var resolvedCasted: java.util.Set<int64> = resolved.(java.util.Set<int64>);
                                var resolvedArr: int64[] = resolvedCasted.toArray(new Array());
                                for (var j: int = 0; j < resolvedArr.length; j++) {
                                    var idResolved: int64 = resolvedArr[j];
                                    if (idResolved != null) {
                                        nextIds.add(idResolved);
                                    }
                                }
                            } else {
                                try {
                                    nextIds.add(resolved.(int64));
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                        e.printStackTrace();
                                    }
                                 }
                            }
                        }
                    }
                }
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
        }
        currentView.lookupAll(nextIds.toArray(new Array()),  (kObjects : org.kevoree.modeling.api.KObject[]) => {
            this._next.execute(kObjects);
        });
    }
}


type KTraverseQueryAction struct implements org.kevoree.modeling.api.traversal.KTraversalAction {

    private SEP: string = ",";
    private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
    private _referenceQuery: string;
}
constructor(p_referenceQuery: string) {
    this._referenceQuery = p_referenceQuery;
}

public chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void {
    this._next = p_next;
}

public execute(p_inputs: org.kevoree.modeling.api.KObject[]): void {
    if (p_inputs == null || p_inputs.length == 0) {
        this._next.execute(p_inputs);
        return;
    } else {
        var currentView: org.kevoree.modeling.api.KView = p_inputs[0].view();
        var nextIds: java.util.Set<int64> = new java.util.HashSet<int64>();
        for (var i: int = 0; i < p_inputs.length; i++) {
            try {
                var loopObj: org.kevoree.modeling.api.abs.AbstractKObject = p_inputs[i].(org.kevoree.modeling.api.abs.AbstractKObject);
                var raw: interface{}[] = currentView.universe().model().storage().raw(loopObj, org.kevoree.modeling.api.data.AccessMode.READ);
                if (this._referenceQuery == null) {
                    for (var j: int = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                        var ref: org.kevoree.modeling.api.meta.MetaReference = loopObj.metaClass().metaReferences()[j];
                        var resolved: interface{} = raw[ref.index()];
                        if (resolved != null) {
                            if (resolved instanceof java.util.Set) {
                                var resolvedCasted: java.util.Set<int64> = resolved.(java.util.Set<int64>);
                                var resolvedArr: int64[] = resolvedCasted.toArray(new Array());
                                for (var k: int = 0; k < resolvedArr.length; k++) {
                                    var idResolved: int64 = resolvedArr[k];
                                    if (idResolved != null) {
                                        nextIds.add(idResolved);
                                    }
                                }
                            } else {
                                try {
                                    nextIds.add(resolved.(int64));
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                        e.printStackTrace();
                                    }
                                 }
                            }
                        }
                    }
                } else {
                    var queries: string[] = this._referenceQuery.split(this.SEP);
                    for (var k: int = 0; k < queries.length; k++) {
                        queries[k] = queries[k].replace("*", ".*");
                    }
                    var loopRefs: org.kevoree.modeling.api.meta.MetaReference[] = loopObj.metaClass().metaReferences();
                    for (var h: int = 0; h < loopRefs.length; h++) {
                        var ref: org.kevoree.modeling.api.meta.MetaReference = loopRefs[h];
                        var selected: bool = false;
                        for (var k: int = 0; k < queries.length; k++) {
                            if (ref.metaName().matches(queries[k])) {
                                selected = true;
                                break;
                            }
                        }
                        if (selected) {
                            var resolved: interface{} = raw[ref.index()];
                            if (resolved != null) {
                                if (resolved instanceof java.util.Set) {
                                    var resolvedCasted: java.util.Set<int64> = resolved.(java.util.Set<int64>);
                                    var resolvedArr: int64[] = resolvedCasted.toArray(new Array());
                                    for (var j: int = 0; j < resolvedArr.length; j++) {
                                        var idResolved: int64 = resolvedArr[j];
                                        if (idResolved != null) {
                                            nextIds.add(idResolved);
                                        }
                                    }
                                } else {
                                    try {
                                        nextIds.add(resolved.(int64));
                                    } catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                            e.printStackTrace();
                                        }
                                     }
                                }
                            }
                        }
                    }
                }
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
        }
        currentView.lookupAll(nextIds.toArray(new Array()),  (kObjects : org.kevoree.modeling.api.KObject[]) => {
            this._next.execute(kObjects);
        });
    }
}


type KQuery struct {

    public static OPEN_BRACKET: char = '[';
    public static CLOSE_BRACKET: char = ']';
    public static QUERY_SEP: char = '/';
    public relationName: string;
    public params: java.util.Map<string, org.kevoree.modeling.api.traversal.selector.KQueryParam>;
    public subQuery: string;
    public oldString: string;
    public previousIsDeep: bool;
    public previousIsRefDeep: bool;
}
constructor(relationName: string, params: java.util.Map<string, org.kevoree.modeling.api.traversal.selector.KQueryParam>, subQuery: string, oldString: string, previousIsDeep: bool, previousIsRefDeep: bool) {
    this.relationName = relationName;
    this.params = params;
    this.subQuery = subQuery;
    this.oldString = oldString;
    this.previousIsDeep = previousIsDeep;
    this.previousIsRefDeep = previousIsRefDeep;
}

public static extractFirstQuery(query: string): org.kevoree.modeling.api.traversal.selector.KQuery {
    if (query == null || query.length == 0) {
        return null;
    }
    if (query.charAt(0) == KQuery.QUERY_SEP) {
        var subQuery: string = null;
        if (query.length > 1) {
            subQuery = query.substring(1);
        }
        var params: java.util.Map<string, org.kevoree.modeling.api.traversal.selector.KQueryParam> = new java.util.HashMap<string, org.kevoree.modeling.api.traversal.selector.KQueryParam>();
        return new org.kevoree.modeling.api.traversal.selector.KQuery("", params, subQuery, "" + KQuery.QUERY_SEP, false, false);
    }
    if (query.startsWith("**/")) {
        if (query.length > 3) {
            var next: org.kevoree.modeling.api.traversal.selector.KQuery = org.kevoree.modeling.api.traversal.selector.KQuery.extractFirstQuery(query.substring(3));
            if (next != null) {
                next.previousIsDeep = true;
                next.previousIsRefDeep = false;
            }
            return next;
        } else {
            return null;
        }
    }
    if (query.startsWith("***/")) {
        if (query.length > 4) {
            var next: org.kevoree.modeling.api.traversal.selector.KQuery = org.kevoree.modeling.api.traversal.selector.KQuery.extractFirstQuery(query.substring(4));
            if (next != null) {
                next.previousIsDeep = true;
                next.previousIsRefDeep = true;
            }
            return next;
        } else {
            return null;
        }
    }
    var i: int = 0;
    var relationNameEnd: int = 0;
    var attsEnd: int = 0;
    var escaped: bool = false;
    while (i < query.length && ((query.charAt(i) != KQuery.QUERY_SEP) || escaped)){
        if (escaped) {
            escaped = false;
        }
        if (query.charAt(i) == KQuery.OPEN_BRACKET) {
            relationNameEnd = i;
        } else {
            if (query.charAt(i) == KQuery.CLOSE_BRACKET) {
                attsEnd = i;
            } else {
                if (query.charAt(i) == '\\') {
                    escaped = true;
                }
            }
        }
        i = i + 1;
    }
    if (i > 0 && relationNameEnd > 0) {
        var oldString: string = query.substring(0, i);
        var subQuery: string = null;
        if (i + 1 < query.length) {
            subQuery = query.substring(i + 1);
        }
        var relName: string = query.substring(0, relationNameEnd);
        var params: java.util.Map<string, org.kevoree.modeling.api.traversal.selector.KQueryParam> = new java.util.HashMap<string, org.kevoree.modeling.api.traversal.selector.KQueryParam>();
        relName = relName.replace("\\", "");
        if (attsEnd != 0) {
            var paramString: string = query.substring(relationNameEnd + 1, attsEnd);
            var iParam: int = 0;
            var lastStart: int = iParam;
            escaped = false;
            while (iParam < paramString.length){
                if (paramString.charAt(iParam) == ',' && !escaped) {
                    var p: string = paramString.substring(lastStart, iParam).trim();
                    if (p.equals("") && !p.equals("*")) {
                        if (p.endsWith("=")) {
                            p = p + "*";
                        }
                        var pArray: string[] = p.split("=");
                        var pObject: org.kevoree.modeling.api.traversal.selector.KQueryParam;
                        if (pArray.length > 1) {
                            var paramKey: string = pArray[0].trim();
                            var negative: bool = paramKey.endsWith("!");
                            pObject = new org.kevoree.modeling.api.traversal.selector.KQueryParam(paramKey.replace("!", ""), pArray[1].trim(), negative);
                            params.put(pObject.name(), pObject);
                        } else {
                            pObject = new org.kevoree.modeling.api.traversal.selector.KQueryParam(null, p, false);
                            params.put("@id", pObject);
                        }
                    }
                    lastStart = iParam + 1;
                } else {
                    if (paramString.charAt(iParam) == '\\') {
                        escaped = true;
                    } else {
                        escaped = false;
                    }
                }
                iParam = iParam + 1;
            }
            var lastParam: string = paramString.substring(lastStart, iParam).trim();
            if (!lastParam.equals("") && !lastParam.equals("*")) {
                if (lastParam.endsWith("=")) {
                    lastParam = lastParam + "*";
                }
                var pArray: string[] = lastParam.split("=");
                var pObject: org.kevoree.modeling.api.traversal.selector.KQueryParam;
                if (pArray.length > 1) {
                    var paramKey: string = pArray[0].trim();
                    var negative: bool = paramKey.endsWith("!");
                    pObject = new org.kevoree.modeling.api.traversal.selector.KQueryParam(paramKey.replace("!", ""), pArray[1].trim(), negative);
                    params.put(pObject.name(), pObject);
                } else {
                    pObject = new org.kevoree.modeling.api.traversal.selector.KQueryParam(null, lastParam, false);
                    params.put("@id", pObject);
                }
            }
        }
        return new org.kevoree.modeling.api.traversal.selector.KQuery(relName, params, subQuery, oldString, false, false);
    }
    return null;
}


type KQueryParam struct {

    private _name: string;
    private _value: string;
    private _negative: bool;
}
constructor(p_name: string, p_value: string, p_negative: bool) {
    this._name = p_name;
    this._value = p_value;
    this._negative = p_negative;
}

public name(): string {
    return this._name;
}

public value(): string {
    return this._value;
}

public isNegative(): bool {
    return this._negative;
}


type KSelector struct {

}
public static select(view: org.kevoree.modeling.api.KView, roots: org.kevoree.modeling.api.KObject[], query: string, callback: (p : org.kevoree.modeling.api.KObject[]) => void): void {
    if (callback == null) {
        return;
    }
    var extractedQuery: org.kevoree.modeling.api.traversal.selector.KQuery = org.kevoree.modeling.api.traversal.selector.KQuery.extractFirstQuery(query);
    if (extractedQuery == null) {
        callback(new Array());
    } else {
        var relationNameRegex: string = extractedQuery.relationName.replace("*", ".*");
        var collected: java.util.Set<int64> = new java.util.HashSet<int64>();
        for (var k: int = 0; k < roots.length; k++) {
            var root: org.kevoree.modeling.api.KObject = roots[k];
            var raw: interface{}[] = root.universe().model().storage().raw(root, org.kevoree.modeling.api.data.AccessMode.READ);
            if (raw != null) {
                for (var i: int = 0; i < root.metaClass().metaReferences().length; i++) {
                    var reference: org.kevoree.modeling.api.meta.MetaReference = root.metaClass().metaReferences()[i];
                    if (reference.metaName().matches(relationNameRegex)) {
                        var refPayLoad: interface{} = raw[reference.index()];
                        if (refPayLoad != null) {
                            if (refPayLoad instanceof java.util.Set) {
                                var castedSet: java.util.Set<int64> = refPayLoad.(java.util.Set<int64>);
                                collected.addAll(castedSet);
                            } else {
                                var castedLong: int64 = refPayLoad.(int64);
                                collected.add(castedLong);
                            }
                        }
                    }
                }
            }
        }
        view.lookupAll(collected.toArray(new Array()),  (resolveds : org.kevoree.modeling.api.KObject[]) => {
            var nextGeneration: java.util.List<org.kevoree.modeling.api.KObject> = new java.util.ArrayList<org.kevoree.modeling.api.KObject>();
            if (extractedQuery.params.isEmpty()) {
                for (var i: int = 0; i < resolveds.length; i++) {
                    nextGeneration.add(resolveds[i]);
                }
            } else {
                for (var i: int = 0; i < resolveds.length; i++) {
                    var resolved: org.kevoree.modeling.api.KObject = resolveds[i];
                    var selectedForNext: bool = true;
                    var paramKeys: string[] = extractedQuery.params.keySet().toArray(new Array());
                    for (var h: int = 0; h < paramKeys.length; h++) {
                        var param: org.kevoree.modeling.api.traversal.selector.KQueryParam = extractedQuery.params.get(paramKeys[h]);
                        for (var j: int = 0; j < resolved.metaClass().metaAttributes().length; j++) {
                            var metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute = resolved.metaClass().metaAttributes()[j];
                            if (metaAttribute.metaName().matches(param.name().replace("*", ".*"))) {
                                var o_raw: interface{} = resolved.get(metaAttribute);
                                if (o_raw != null) {
                                    if (o_raw.toString().matches(param.value().replace("*", ".*"))) {
                                        if (param.isNegative()) {
                                            selectedForNext = false;
                                        }
                                    } else {
                                        if (!param.isNegative()) {
                                            selectedForNext = false;
                                        }
                                    }
                                } else {
                                    if (!param.isNegative() && !param.value().equals("null")) {
                                        selectedForNext = false;
                                    }
                                }
                            }
                        }
                    }
                    if (selectedForNext) {
                        nextGeneration.add(resolved);
                    }
                }
            }
            var nextArr: org.kevoree.modeling.api.KObject[] = nextGeneration.toArray(new Array());
            if (extractedQuery.subQuery == null || extractedQuery.subQuery.isEmpty()) {
                callback(nextArr);
            } else {
                org.kevoree.modeling.api.traversal.selector.KSelector.select(view, nextArr, extractedQuery.subQuery, callback);
            }
        });
    }
}


type Checker struct {

}
public static isDefined(param: interface{}): bool {
    return param != null;
}


type DefaultOperationManager struct implements org.kevoree.modeling.api.util.KOperationManager {

    private operationCallbacks: java.util.Map<int, java.util.Map<int, (p : org.kevoree.modeling.api.KObject, p1 : interface{}[], p2 : (p : interface{}) => void) => void>> = new java.util.HashMap<int, java.util.Map<int, (p : org.kevoree.modeling.api.KObject, p1 : interface{}[], p2 : (p : interface{}) => void) => void>>();
    private _store: org.kevoree.modeling.api.data.KStore;
}
constructor(store: org.kevoree.modeling.api.data.KStore) {
    this._store = store;
}

public registerOperation(operation: org.kevoree.modeling.api.meta.MetaOperation, callback: (p : org.kevoree.modeling.api.KObject, p1 : interface{}[], p2 : (p : interface{}) => void) => void): void {
    var clazzOperations: java.util.Map<int, (p : org.kevoree.modeling.api.KObject, p1 : interface{}[], p2 : (p : interface{}) => void) => void> = this.operationCallbacks.get(operation.origin().index());
    if (clazzOperations == null) {
        clazzOperations = new java.util.HashMap<int, (p : org.kevoree.modeling.api.KObject, p1 : interface{}[], p2 : (p : interface{}) => void) => void>();
        this.operationCallbacks.put(operation.origin().index(), clazzOperations);
    }
    clazzOperations.put(operation.index(), callback);
}

public call(source: org.kevoree.modeling.api.KObject, operation: org.kevoree.modeling.api.meta.MetaOperation, param: interface{}[], callback: (p : interface{}) => void): void {
    var clazzOperations: java.util.Map<int, (p : org.kevoree.modeling.api.KObject, p1 : interface{}[], p2 : (p : interface{}) => void) => void> = this.operationCallbacks.get(source.metaClass().index());
    if (clazzOperations != null) {
        var operationCore: (p : org.kevoree.modeling.api.KObject, p1 : interface{}[], p2 : (p : interface{}) => void) => void = clazzOperations.get(operation.index());
        if (callback != null) {
            operationCore(source, param, callback);
        } else {
        }
    } else {
    }
}


type KOperationManager interface {
    registerOperation(operation : org.kevoree.modeling.api.meta.MetaOperation,callback : (p : org.kevoree.modeling.api.KObject, p1 : interface{}[], p2 : (p : interface{}) => void) => void) : void
    call(source : org.kevoree.modeling.api.KObject,operation : org.kevoree.modeling.api.meta.MetaOperation,param : interface{}[],callback : (p : interface{}) => void) : void
}
type PathHelper struct {

    public static pathSep: char = '/';
    private static pathIDOpen: char = '[';
    private static pathIDClose: char = ']';
    private static rootPath: string = "/";
}
public static parentPath(currentPath: string): string {
    if (currentPath == null || currentPath.length == 0) {
        return null;
    }
    if (currentPath.length == 1) {
        return null;
    }
    var lastIndex: int = currentPath.lastIndexOf(PathHelper.pathSep);
    if (lastIndex != -1) {
        if (lastIndex == 0) {
            return PathHelper.rootPath;
        } else {
            return currentPath.substring(0, lastIndex);
        }
    } else {
        return null;
    }
}

public static isRoot(path: string): bool {
    return path.length == 1 && path.charAt(0) == org.kevoree.modeling.api.util.PathHelper.pathSep;
}

public static path(parent: string, reference: org.kevoree.modeling.api.meta.MetaReference, target: org.kevoree.modeling.api.KObject): string {
    if (org.kevoree.modeling.api.util.PathHelper.isRoot(parent)) {
        return PathHelper.pathSep + reference.metaName() + PathHelper.pathIDOpen + target.domainKey() + PathHelper.pathIDClose;
    } else {
        return parent + PathHelper.pathSep + reference.metaName() + PathHelper.pathIDOpen + target.domainKey() + PathHelper.pathIDClose;
    }
}


type TimeMachine struct {

    private _previous: org.kevoree.modeling.api.KObject;
    private _syncCallback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void;
    private _deepMonitoring: bool;
    private _listener: (p : org.kevoree.modeling.api.KEvent) => void = null;
}
public set(target: org.kevoree.modeling.api.KObject): void {
    if (this._syncCallback != null) {
        if (this._previous == null) {
            if (this._deepMonitoring) {
                target.intersection(target,  (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
                    if (this._syncCallback != null) {
                        this._syncCallback(traceSequence);
                    }
                });
            } else {
                var sequence: org.kevoree.modeling.api.trace.TraceSequence = new org.kevoree.modeling.api.trace.TraceSequence();
                var traces: java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
                var tempTraces: org.kevoree.modeling.api.trace.ModelTrace[] = target.traces(org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_REFERENCES);
                for (var i: int = 0; i < tempTraces.length; i++) {
                    traces.add(tempTraces[i]);
                }
                sequence.populate(traces);
                this._syncCallback(sequence);
            }
        } else {
            this._previous.universe().model().storage().eventBroker().unregister(this._listener);
            this._previous.merge(target,  (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
                if (this._syncCallback != null) {
                    this._syncCallback(traceSequence);
                }
            });
        }
        this._listener =  (evt : org.kevoree.modeling.api.KEvent) => {
            var sequence: org.kevoree.modeling.api.trace.TraceSequence = new org.kevoree.modeling.api.trace.TraceSequence();
            var traces: java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
            traces.add(evt.toTrace());
            sequence.populate(traces);
            this._syncCallback(sequence);
        };
        target.listen(this._listener);
    }
    this._previous = target;
}

public jumpTime(targetTime: int64): void {
    if (this._previous != null) {
        this._previous.jump(targetTime,  (resolved : org.kevoree.modeling.api.KObject) => {
            this.set(resolved);
        });
    }
}

public jumpDimension(targetDimension: int64): void {
    if (this._previous != null) {
        this._previous.universe().model().universe(targetDimension).time(this._previous.now()).lookup(this._previous.uuid(),  (resolved : org.kevoree.modeling.api.KObject) => {
            this.set(resolved);
        });
    }
}

public init(p_deepMonitoring: bool, p_callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): org.kevoree.modeling.api.util.TimeMachine {
    this._syncCallback = p_callback;
    this._deepMonitoring = p_deepMonitoring;
    return this;
}


type SerializationContext struct {

    public ignoreGeneratedID: bool = false;
    public model: org.kevoree.modeling.api.KObject;
    public finishCallback: (p : string, p1 : java.lang.Throwable) => void;
    public printer: java.lang.StringBuilder;
    public attributesVisitor: (p : org.kevoree.modeling.api.meta.MetaAttribute, p1 : interface{}) => void;
    public addressTable: java.util.HashMap<int64, string> = new java.util.HashMap<int64, string>();
    public elementsCount: java.util.HashMap<string, int> = new java.util.HashMap<string, int>();
    public packageList: java.util.ArrayList<string> = new java.util.ArrayList<string>();
}

type XmiFormat struct implements org.kevoree.modeling.api.ModelFormat {

    private _view: org.kevoree.modeling.api.KView;
}
constructor(p_view: org.kevoree.modeling.api.KView) {
    this._view = p_view;
}

public save(model: org.kevoree.modeling.api.KObject, callback: (p : string, p1 : java.lang.Throwable) => void): void {
    org.kevoree.modeling.api.xmi.XMIModelSerializer.save(model, callback);
}

public saveRoot(callback: (p : string, p1 : java.lang.Throwable) => void): void {
    if (org.kevoree.modeling.api.util.Checker.isDefined(callback)) {
        this._view.universe().model().storage().getRoot(this._view,  (root : org.kevoree.modeling.api.KObject) => {
            if (root == null) {
                callback("", new java.lang.Exception("Root not set yet !"));
            } else {
                org.kevoree.modeling.api.xmi.XMIModelSerializer.save(root, callback);
            }
        });
    } else {
        throw new java.lang.RuntimeException("one parameter is null");
    }
}

public load(payload: string, callback: (p : java.lang.Throwable) => void): void {
    org.kevoree.modeling.api.xmi.XMIModelLoader.load(this._view, payload, callback);
}


type XMILoadingContext struct {

    public xmiReader: org.kevoree.modeling.api.xmi.XmlParser;
    public loadedRoots: org.kevoree.modeling.api.KObject = null;
    public resolvers: java.util.ArrayList<org.kevoree.modeling.api.xmi.XMIResolveCommand> = new java.util.ArrayList<org.kevoree.modeling.api.xmi.XMIResolveCommand>();
    public map: java.util.HashMap<string, org.kevoree.modeling.api.KObject> = new java.util.HashMap<string, org.kevoree.modeling.api.KObject>();
    public elementsCount: java.util.HashMap<string, int> = new java.util.HashMap<string, int>();
    public stats: java.util.HashMap<string, int> = new java.util.HashMap<string, int>();
    public oppositesAlreadySet: java.util.HashMap<string, bool> = new java.util.HashMap<string, bool>();
    public successCallback: (p : java.lang.Throwable) => void;
}
public isOppositeAlreadySet(localRef: string, oppositeRef: string): bool {
    return (this.oppositesAlreadySet.get(oppositeRef + "_" + localRef) != null || (this.oppositesAlreadySet.get(localRef + "_" + oppositeRef) != null));
}

public storeOppositeRelation(localRef: string, oppositeRef: string): void {
    this.oppositesAlreadySet.put(localRef + "_" + oppositeRef, true);
}


type XMIModelLoader struct {

    private _factory: org.kevoree.modeling.api.KView;
    public static LOADER_XMI_LOCAL_NAME: string = "type";
    public static LOADER_XMI_XSI: string = "xsi";
    public static LOADER_XMI_NS_URI: string = "nsURI";
}
constructor(p_factory: org.kevoree.modeling.api.KView) {
    this._factory = p_factory;
}

public static unescapeXml(src: string): string {
    var builder: java.lang.StringBuilder = null;
    var i: int = 0;
    while (i < src.length){
        var c: char = src.charAt(i);
        if (c == '&') {
            if (builder == null) {
                builder = new java.lang.StringBuilder();
                builder.append(src.substring(0, i));
            }
            if (src.charAt(i + 1) == 'a') {
                if (src.charAt(i + 2) == 'm') {
                    builder.append("&");
                    i = i + 5;
                } else {
                    if (src.charAt(i + 2) == 'p') {
                        builder.append("'");
                        i = i + 6;
                    }
                }
            } else {
                if (src.charAt(i + 1) == 'q') {
                    builder.append("\"");
                    i = i + 6;
                } else {
                    if (src.charAt(i + 1) == 'l') {
                        builder.append("<");
                        i = i + 4;
                    } else {
                        if (src.charAt(i + 1) == 'g') {
                            builder.append(">");
                            i = i + 4;
                        }
                    }
                }
            }
        } else {
            if (builder != null) {
                builder.append(c);
            }
            i++;
        }
    }
    if (builder != null) {
        return builder.toString();
    } else {
        return src;
    }
}

public static load(p_view: org.kevoree.modeling.api.KView, str: string, callback: (p : java.lang.Throwable) => void): void {
    var parser: org.kevoree.modeling.api.xmi.XmlParser = new org.kevoree.modeling.api.xmi.XmlParser(str);
    if (!parser.hasNext()) {
        callback(null);
    } else {
        var context: org.kevoree.modeling.api.xmi.XMILoadingContext = new org.kevoree.modeling.api.xmi.XMILoadingContext();
        context.successCallback = callback;
        context.xmiReader = parser;
        org.kevoree.modeling.api.xmi.XMIModelLoader.deserialize(p_view, context);
    }
}

private static deserialize(p_view: org.kevoree.modeling.api.KView, context: org.kevoree.modeling.api.xmi.XMILoadingContext): void {
    try {
        var nsURI: string;
        var reader: org.kevoree.modeling.api.xmi.XmlParser = context.xmiReader;
        while (reader.hasNext()){
            var nextTag: org.kevoree.modeling.api.xmi.XmlToken = reader.next();
            if (nextTag.equals(org.kevoree.modeling.api.xmi.XmlToken.START_TAG)) {
                var localName: string = reader.getLocalName();
                if (localName != null) {
                    var ns: java.util.HashMap<string, string> = new java.util.HashMap<string, string>();
                    for (var i: int = 0; i < reader.getAttributeCount() - 1; i++) {
                        var attrLocalName: string = reader.getAttributeLocalName(i);
                        var attrLocalValue: string = reader.getAttributeValue(i);
                        if (attrLocalName.equals(XMIModelLoader.LOADER_XMI_NS_URI)) {
                            nsURI = attrLocalValue;
                        }
                        ns.put(attrLocalName, attrLocalValue);
                    }
                    var xsiType: string = reader.getTagPrefix();
                    var realTypeName: string = ns.get(xsiType);
                    if (realTypeName == null) {
                        realTypeName = xsiType;
                    }
                    context.loadedRoots = org.kevoree.modeling.api.xmi.XMIModelLoader.loadObject(p_view, context, "/", xsiType + "." + localName);
                }
            }
        }
        for (var i: int = 0; i < context.resolvers.size(); i++) {
            context.resolvers.get(i).run();
        }
        p_view.setRoot(context.loadedRoots, null);
        context.successCallback(null);
    } catch ($ex$) {
        if ($ex$ instanceof java.lang.Exception) {
            var e: java.lang.Exception = <java.lang.Exception>$ex$;
            context.successCallback(e);
        }
     }
}

private static callFactory(p_view: org.kevoree.modeling.api.KView, ctx: org.kevoree.modeling.api.xmi.XMILoadingContext, objectType: string): org.kevoree.modeling.api.KObject {
    var modelElem: org.kevoree.modeling.api.KObject = null;
    if (objectType != null) {
        modelElem = p_view.createFQN(objectType);
        if (modelElem == null) {
            var xsiType: string = null;
            for (var i: int = 0; i < (ctx.xmiReader.getAttributeCount() - 1); i++) {
                var localName: string = ctx.xmiReader.getAttributeLocalName(i);
                var xsi: string = ctx.xmiReader.getAttributePrefix(i);
                if (localName.equals(XMIModelLoader.LOADER_XMI_LOCAL_NAME) && xsi.equals(XMIModelLoader.LOADER_XMI_XSI)) {
                    xsiType = ctx.xmiReader.getAttributeValue(i);
                    break;
                }
            }
            if (xsiType != null) {
                var realTypeName: string = xsiType.substring(0, xsiType.lastIndexOf(":"));
                var realName: string = xsiType.substring(xsiType.lastIndexOf(":") + 1, xsiType.length);
                modelElem = p_view.createFQN(realTypeName + "." + realName);
            }
        }
    } else {
        modelElem = p_view.createFQN(ctx.xmiReader.getLocalName());
    }
    return modelElem;
}

private static loadObject(p_view: org.kevoree.modeling.api.KView, ctx: org.kevoree.modeling.api.xmi.XMILoadingContext, xmiAddress: string, objectType: string): org.kevoree.modeling.api.KObject {
    var elementTagName: string = ctx.xmiReader.getLocalName();
    var modelElem: org.kevoree.modeling.api.KObject = org.kevoree.modeling.api.xmi.XMIModelLoader.callFactory(p_view, ctx, objectType);
    if (modelElem == null) {
        throw new java.lang.Exception("Could not create an object for local name " + elementTagName);
    }
    ctx.map.put(xmiAddress, modelElem);
    for (var i: int = 0; i < ctx.xmiReader.getAttributeCount(); i++) {
        var prefix: string = ctx.xmiReader.getAttributePrefix(i);
        if (prefix == null || prefix.equals("")) {
            var attrName: string = ctx.xmiReader.getAttributeLocalName(i).trim();
            var valueAtt: string = ctx.xmiReader.getAttributeValue(i).trim();
            if (valueAtt != null) {
                var kAttribute: org.kevoree.modeling.api.meta.MetaAttribute = modelElem.metaClass().metaAttribute(attrName);
                if (kAttribute != null) {
                    modelElem.set(kAttribute, org.kevoree.modeling.api.xmi.XMIModelLoader.unescapeXml(valueAtt));
                } else {
                    var kreference: org.kevoree.modeling.api.meta.MetaReference = modelElem.metaClass().metaReference(attrName);
                    if (kreference != null) {
                        var referenceArray: string[] = valueAtt.split(" ");
                        for (var j: int = 0; j < referenceArray.length; j++) {
                            var xmiRef: string = referenceArray[j];
                            var adjustedRef: string = (xmiRef.startsWith("#") ? xmiRef.substring(1) : xmiRef);
                            adjustedRef = adjustedRef.replace(".0", "");
                            var ref: org.kevoree.modeling.api.KObject = ctx.map.get(adjustedRef);
                            if (ref != null) {
                                modelElem.mutate(org.kevoree.modeling.api.KActionType.ADD, kreference, ref);
                            } else {
                                ctx.resolvers.add(new org.kevoree.modeling.api.xmi.XMIResolveCommand(ctx, modelElem, org.kevoree.modeling.api.KActionType.ADD, attrName, adjustedRef));
                            }
                        }
                    } else {
                    }
                }
            }
        }
    }
    var done: bool = false;
    while (!done){
        if (ctx.xmiReader.hasNext()) {
            var tok: org.kevoree.modeling.api.xmi.XmlToken = ctx.xmiReader.next();
            if (tok.equals(org.kevoree.modeling.api.xmi.XmlToken.START_TAG)) {
                var subElemName: string = ctx.xmiReader.getLocalName();
                var key: string = xmiAddress + "/@" + subElemName;
                var i: int = ctx.elementsCount.get(key);
                if (i == null) {
                    i = 0;
                    ctx.elementsCount.put(key, i);
                }
                var subElementId: string = xmiAddress + "/@" + subElemName + (i != 0 ? "." + i : "");
                var containedElement: org.kevoree.modeling.api.KObject = org.kevoree.modeling.api.xmi.XMIModelLoader.loadObject(p_view, ctx, subElementId, subElemName);
                modelElem.mutate(org.kevoree.modeling.api.KActionType.ADD, modelElem.metaClass().metaReference(subElemName), containedElement);
                ctx.elementsCount.put(xmiAddress + "/@" + subElemName, i + 1);
            } else {
                if (tok.equals(org.kevoree.modeling.api.xmi.XmlToken.END_TAG)) {
                    if (ctx.xmiReader.getLocalName().equals(elementTagName)) {
                        done = true;
                    }
                }
            }
        } else {
            done = true;
        }
    }
    return modelElem;
}


type XMIModelSerializer struct {

}
public static save(model: org.kevoree.modeling.api.KObject, callback: (p : string, p1 : java.lang.Throwable) => void): void {
    var context: org.kevoree.modeling.api.xmi.SerializationContext = new org.kevoree.modeling.api.xmi.SerializationContext();
    context.model = model;
    context.finishCallback = callback;
    context.attributesVisitor =  (metaAttribute : org.kevoree.modeling.api.meta.MetaAttribute, value : interface{}) => {
        if (value != null) {
            if (context.ignoreGeneratedID && metaAttribute.metaName().equals("generated_KMF_ID")) {
                return;
            }
            context.printer.append(" " + metaAttribute.metaName() + "=\"");
            org.kevoree.modeling.api.xmi.XMIModelSerializer.escapeXml(context.printer, value.toString());
            context.printer.append("\"");
        }
    };
    context.printer = new java.lang.StringBuilder();
    context.addressTable.put(model.uuid(), "/");
    var addressCreationTask: org.kevoree.modeling.api.KTask<any> = context.model.taskVisit( (elem : org.kevoree.modeling.api.KObject) => {
        var parentXmiAddress: string = context.addressTable.get(elem.parentUuid());
        var key: string = parentXmiAddress + "/@" + elem.referenceInParent().metaName();
        var i: int = context.elementsCount.get(key);
        if (i == null) {
            i = 0;
            context.elementsCount.put(key, i);
        }
        context.addressTable.put(elem.uuid(), parentXmiAddress + "/@" + elem.referenceInParent().metaName() + "." + i);
        context.elementsCount.put(parentXmiAddress + "/@" + elem.referenceInParent().metaName(), i + 1);
        var pack: string = elem.metaClass().metaName().substring(0, elem.metaClass().metaName().lastIndexOf('.'));
        if (!context.packageList.contains(pack)) {
            context.packageList.add(pack);
        }
        return org.kevoree.modeling.api.VisitResult.CONTINUE;
    }, org.kevoree.modeling.api.VisitRequest.CONTAINED);
    var serializationTask: org.kevoree.modeling.api.KTask<any> = context.model.universe().model().task();
    serializationTask.wait(addressCreationTask);
    serializationTask.setJob( (currentTask : org.kevoree.modeling.api.KCurrentTask<any>) => {
        context.printer.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        context.printer.append("<" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_"));
        context.printer.append(" xmlns:xsi=\"http://wwww.w3.org/2001/XMLSchema-instance\"");
        context.printer.append(" xmi:version=\"2.0\"");
        context.printer.append(" xmlns:xmi=\"http://www.omg.org/XMI\"");
        var index: int = 0;
        while (index < context.packageList.size()){
            context.printer.append(" xmlns:" + context.packageList.get(index).replace(".", "_") + "=\"http://" + context.packageList.get(index) + "\"");
            index++;
        }
        context.model.visitAttributes(context.attributesVisitor);
        var nonContainedRefsTasks: org.kevoree.modeling.api.KTask<any> = context.model.universe().model().task();
        for (var i: int = 0; i < context.model.metaClass().metaReferences().length; i++) {
            if (!context.model.metaClass().metaReferences()[i].contained()) {
                nonContainedRefsTasks.wait(org.kevoree.modeling.api.xmi.XMIModelSerializer.nonContainedReferenceTaskMaker(context.model.metaClass().metaReferences()[i], context, context.model));
            }
        }
        nonContainedRefsTasks.setJob( (currentTask : org.kevoree.modeling.api.KCurrentTask<any>) => {
            context.printer.append(">\n");
            var containedRefsTasks: org.kevoree.modeling.api.KTask<any> = context.model.universe().model().task();
            for (var i: int = 0; i < context.model.metaClass().metaReferences().length; i++) {
                if (context.model.metaClass().metaReferences()[i].contained()) {
                    containedRefsTasks.wait(org.kevoree.modeling.api.xmi.XMIModelSerializer.containedReferenceTaskMaker(context.model.metaClass().metaReferences()[i], context, context.model));
                }
            }
            containedRefsTasks.setJob( (currentTask : org.kevoree.modeling.api.KCurrentTask<any>) => {
                context.printer.append("</" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_") + ">\n");
                context.finishCallback(context.printer.toString(), null);
            });
            containedRefsTasks.ready();
        });
        nonContainedRefsTasks.ready();
    });
    serializationTask.ready();
}

public static escapeXml(ostream: java.lang.StringBuilder, chain: string): void {
    if (chain == null) {
        return;
    }
    var i: int = 0;
    var max: int = chain.length;
    while (i < max){
        var c: char = chain.charAt(i);
        if (c == '"') {
            ostream.append("&quot;");
        } else {
            if (c == '&') {
                ostream.append("&amp;");
            } else {
                if (c == '\'') {
                    ostream.append("&apos;");
                } else {
                    if (c == '<') {
                        ostream.append("&lt;");
                    } else {
                        if (c == '>') {
                            ostream.append("&gt;");
                        } else {
                            ostream.append(c);
                        }
                    }
                }
            }
        }
        i = i + 1;
    }
}

public static formatMetaClassName(metaClassName: string): string {
    var lastPoint: int = metaClassName.lastIndexOf('.');
    var pack: string = metaClassName.substring(0, lastPoint);
    var cls: string = metaClassName.substring(lastPoint + 1);
    return pack + ":" + cls;
}

private static nonContainedReferenceTaskMaker(ref: org.kevoree.modeling.api.meta.MetaReference, p_context: org.kevoree.modeling.api.xmi.SerializationContext, p_currentElement: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KTask<any> {
    var allTask: org.kevoree.modeling.api.KTask<any> = p_currentElement.taskAll(ref);
    var thisTask: org.kevoree.modeling.api.KTask<any> = p_context.model.universe().model().task();
    thisTask.wait(allTask);
    thisTask.setJob( (currentTask : org.kevoree.modeling.api.KCurrentTask<any>) => {
        try {
            var objects: org.kevoree.modeling.api.KObject[] = (currentTask.results().get(allTask).(org.kevoree.modeling.api.KObject[]));
            for (var i: int = 0; i < objects.length; i++) {
                var adjustedAddress: string = p_context.addressTable.get(objects[i].uuid());
                p_context.printer.append(" " + ref.metaName() + "=\"" + adjustedAddress + "\"");
            }
        } catch ($ex$) {
            if ($ex$ instanceof java.lang.Exception) {
                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                e.printStackTrace();
            }
         }
    });
    thisTask.ready();
    return thisTask;
}

private static containedReferenceTaskMaker(ref: org.kevoree.modeling.api.meta.MetaReference, context: org.kevoree.modeling.api.xmi.SerializationContext, currentElement: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KTask<any> {
    var allTask: org.kevoree.modeling.api.KTask<any> = currentElement.taskAll(ref);
    var thisTask: org.kevoree.modeling.api.KTask<any> = context.model.universe().model().task();
    thisTask.wait(allTask);
    thisTask.setJob( (currentTask : org.kevoree.modeling.api.KCurrentTask<any>) => {
        try {
            if (currentTask.results().get(allTask) != null) {
                var objs: org.kevoree.modeling.api.KObject[] = (currentTask.results().get(allTask).(org.kevoree.modeling.api.KObject[]));
                for (var i: int = 0; i < objs.length; i++) {
                    var elem: org.kevoree.modeling.api.KObject = objs[i];
                    context.printer.append("<");
                    context.printer.append(ref.metaName());
                    context.printer.append(" xsi:type=\"" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(elem.metaClass().metaName()) + "\"");
                    elem.visitAttributes(context.attributesVisitor);
                    var nonContainedRefsTasks: org.kevoree.modeling.api.KTask<any> = context.model.universe().model().task();
                    for (var j: int = 0; j < elem.metaClass().metaReferences().length; j++) {
                        if (!elem.metaClass().metaReferences()[i].contained()) {
                            nonContainedRefsTasks.wait(org.kevoree.modeling.api.xmi.XMIModelSerializer.nonContainedReferenceTaskMaker(elem.metaClass().metaReferences()[i], context, elem));
                        }
                    }
                    nonContainedRefsTasks.setJob( (currentTask : org.kevoree.modeling.api.KCurrentTask<any>) => {
                        context.printer.append(">\n");
                        var containedRefsTasks: org.kevoree.modeling.api.KTask<any> = context.model.universe().model().task();
                        for (var i: int = 0; i < elem.metaClass().metaReferences().length; i++) {
                            if (elem.metaClass().metaReferences()[i].contained()) {
                                containedRefsTasks.wait(org.kevoree.modeling.api.xmi.XMIModelSerializer.containedReferenceTaskMaker(elem.metaClass().metaReferences()[i], context, elem));
                            }
                        }
                        containedRefsTasks.setJob( (currentTask : org.kevoree.modeling.api.KCurrentTask<any>) => {
                            context.printer.append("</");
                            context.printer.append(ref.metaName());
                            context.printer.append('>');
                            context.printer.append("\n");
                        });
                        containedRefsTasks.ready();
                    });
                    nonContainedRefsTasks.ready();
                }
            }
        } catch ($ex$) {
            if ($ex$ instanceof java.lang.Exception) {
                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                e.printStackTrace();
            }
         }
    });
    thisTask.ready();
    return thisTask;
}


type XMIResolveCommand struct {

    private context: org.kevoree.modeling.api.xmi.XMILoadingContext;
    private target: org.kevoree.modeling.api.KObject;
    private mutatorType: org.kevoree.modeling.api.KActionType;
    private refName: string;
    private ref: string;
}
constructor(context: org.kevoree.modeling.api.xmi.XMILoadingContext, target: org.kevoree.modeling.api.KObject, mutatorType: org.kevoree.modeling.api.KActionType, refName: string, ref: string) {
    this.context = context;
    this.target = target;
    this.mutatorType = mutatorType;
    this.refName = refName;
    this.ref = ref;
}

public run(): void {
    var referencedElement: org.kevoree.modeling.api.KObject = this.context.map.get(this.ref);
    if (referencedElement != null) {
        this.target.mutate(this.mutatorType, this.target.metaClass().metaReference(this.refName), referencedElement);
        return;
    }
    referencedElement = this.context.map.get("/");
    if (referencedElement != null) {
        this.target.mutate(this.mutatorType, this.target.metaClass().metaReference(this.refName), referencedElement);
        return;
    }
    throw new java.lang.Exception("KMF Load error : reference " + this.ref + " not found in map when trying to  " + this.mutatorType + " " + this.refName + "  on " + this.target.metaClass().metaName() + "(uuid:" + this.target.uuid() + ")");
}


type XmlParser struct {

    private payload: string;
    private current: int = 0;
    private currentChar: char;
    private tagName: string;
    private tagPrefix: string;
    private attributePrefix: string;
    private readSingleton: bool = false;
    private attributesNames: java.util.ArrayList<string> = new java.util.ArrayList<string>();
    private attributesPrefixes: java.util.ArrayList<string> = new java.util.ArrayList<string>();
    private attributesValues: java.util.ArrayList<string> = new java.util.ArrayList<string>();
    private attributeName: java.lang.StringBuilder = new java.lang.StringBuilder();
    private attributeValue: java.lang.StringBuilder = new java.lang.StringBuilder();
}
constructor(str: string) {
    this.payload = str;
    this.currentChar = this.readChar();
}

public getTagPrefix(): string {
    return this.tagPrefix;
}

public hasNext(): bool {
    this.read_lessThan();
    return this.current < this.payload.length;
}

public getLocalName(): string {
    return this.tagName;
}

public getAttributeCount(): int {
    return this.attributesNames.size();
}

public getAttributeLocalName(i: int): string {
    return this.attributesNames.get(i);
}

public getAttributePrefix(i: int): string {
    return this.attributesPrefixes.get(i);
}

public getAttributeValue(i: int): string {
    return this.attributesValues.get(i);
}

private readChar(): char {
    if (this.current < this.payload.length) {
        var re: char = this.payload.charAt(this.current);
        this.current++;
        return re;
    }
    return '\0';
}

public next(): org.kevoree.modeling.api.xmi.XmlToken {
    if (this.readSingleton) {
        this.readSingleton = false;
        return org.kevoree.modeling.api.xmi.XmlToken.END_TAG;
    }
    if (!this.hasNext()) {
        return org.kevoree.modeling.api.xmi.XmlToken.END_DOCUMENT;
    }
    this.attributesNames.clear();
    this.attributesPrefixes.clear();
    this.attributesValues.clear();
    this.read_lessThan();
    this.currentChar = this.readChar();
    if (this.currentChar == '?') {
        this.currentChar = this.readChar();
        this.read_xmlHeader();
        return org.kevoree.modeling.api.xmi.XmlToken.XML_HEADER;
    } else {
        if (this.currentChar == '!') {
            do {
                this.currentChar = this.readChar();
            } while (this.currentChar != '>')
            return org.kevoree.modeling.api.xmi.XmlToken.COMMENT;
        } else {
            if (this.currentChar == '/') {
                this.currentChar = this.readChar();
                this.read_closingTag();
                return org.kevoree.modeling.api.xmi.XmlToken.END_TAG;
            } else {
                this.read_openTag();
                if (this.currentChar == '/') {
                    this.read_upperThan();
                    this.readSingleton = true;
                }
                return org.kevoree.modeling.api.xmi.XmlToken.START_TAG;
            }
        }
    }
}

private read_lessThan(): void {
    while (this.currentChar != '<' && this.currentChar != '\0'){
        this.currentChar = this.readChar();
    }
}

private read_upperThan(): void {
    while (this.currentChar != '>'){
        this.currentChar = this.readChar();
    }
}

private read_xmlHeader(): void {
    this.read_tagName();
    this.read_attributes();
    this.read_upperThan();
}

private read_closingTag(): void {
    this.read_tagName();
    this.read_upperThan();
}

private read_openTag(): void {
    this.read_tagName();
    if (this.currentChar != '>' && this.currentChar != '/') {
        this.read_attributes();
    }
}

private read_tagName(): void {
    this.tagName = "" + this.currentChar;
    this.tagPrefix = null;
    this.currentChar = this.readChar();
    while (this.currentChar != ' ' && this.currentChar != '>' && this.currentChar != '/'){
        if (this.currentChar == ':') {
            this.tagPrefix = this.tagName;
            this.tagName = "";
        } else {
            this.tagName += this.currentChar;
        }
        this.currentChar = this.readChar();
    }
}

private read_attributes(): void {
    var end_of_tag: bool = false;
    while (this.currentChar == ' '){
        this.currentChar = this.readChar();
    }
    while (!end_of_tag){
        while (this.currentChar != '='){
            if (this.currentChar == ':') {
                this.attributePrefix = this.attributeName.toString();
                this.attributeName = new java.lang.StringBuilder();
            } else {
                this.attributeName.append(this.currentChar);
            }
            this.currentChar = this.readChar();
        }
        do {
            this.currentChar = this.readChar();
        } while (this.currentChar != '"')
        this.currentChar = this.readChar();
        while (this.currentChar != '"'){
            this.attributeValue.append(this.currentChar);
            this.currentChar = this.readChar();
        }
        this.attributesNames.add(this.attributeName.toString());
        this.attributesPrefixes.add(this.attributePrefix);
        this.attributesValues.add(this.attributeValue.toString());
        this.attributeName = new java.lang.StringBuilder();
        this.attributePrefix = null;
        this.attributeValue = new java.lang.StringBuilder();
        do {
            this.currentChar = this.readChar();
            if (this.currentChar == '?' || this.currentChar == '/' || this.currentChar == '-' || this.currentChar == '>') {
                end_of_tag = true;
            }
        } while (!end_of_tag && this.currentChar == ' ')
    }
}


type XmlToken struct {

    public static XML_HEADER: XmlToken = new XmlToken();
    public static END_DOCUMENT: XmlToken = new XmlToken();
    public static START_TAG: XmlToken = new XmlToken();
    public static END_TAG: XmlToken = new XmlToken();
    public static COMMENT: XmlToken = new XmlToken();
    public static SINGLETON_TAG: XmlToken = new XmlToken();
}
public equals(other: any): boolean {
    return this == other;
}
public static _XmlTokenVALUES : XmlToken[] = [
    XmlToken.XML_HEADER
    ,XmlToken.END_DOCUMENT
    ,XmlToken.START_TAG
    ,XmlToken.END_TAG
    ,XmlToken.COMMENT
    ,XmlToken.SINGLETON_TAG
];
public static values():XmlToken[]{
    return XmlToken._XmlTokenVALUES;
}

