module org {
    export module kevoree {
        export module modeling {
            export module api {
                export interface Callback<A> {

                    on(a: A): void;

                }

                export class InboundReference {

                    private _reference: org.kevoree.modeling.api.meta.MetaReference;
                    private _source: number;
                    constructor(p_reference: org.kevoree.modeling.api.meta.MetaReference, p_source: number) {
                        this._reference = p_reference;
                        this._source = p_source;
                    }

                    public reference(): org.kevoree.modeling.api.meta.MetaReference {
                        return this._reference;
                    }

                    public source(): number {
                        return this._source;
                    }

                }

                export class KActionType {

                    public static CALL: KActionType = new KActionType("CALL");
                    public static CALL_RESPONSE: KActionType = new KActionType("CALL_RESPONSE");
                    public static SET: KActionType = new KActionType("SET");
                    public static ADD: KActionType = new KActionType("ADD");
                    public static REMOVE: KActionType = new KActionType("DEL");
                    public static NEW: KActionType = new KActionType("NEW");
                    private _code: string = "";
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
                        for (var i: number = 0; i < org.kevoree.modeling.api.KActionType.values().length; i++) {
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
                        ,KActionType.CALL_RESPONSE
                        ,KActionType.SET
                        ,KActionType.ADD
                        ,KActionType.REMOVE
                        ,KActionType.NEW
                    ];
                    public static values():KActionType[]{
                        return KActionType._KActionTypeVALUES;
                    }
                }

                export interface KCurrentDefer<A> extends org.kevoree.modeling.api.KDefer<any> {

                    resultKeys(): string[];

                    resultByName(name: string): any;

                    resultByDefer(defer: org.kevoree.modeling.api.KDefer<any>): any;

                    addDeferResult(result: A): void;

                    clearResults(): void;

                }

                export interface KDefer<A> {

                    wait(previous: org.kevoree.modeling.api.KDefer<any>): org.kevoree.modeling.api.KDefer<any>;

                    getResult(): A;

                    isDone(): boolean;

                    setJob(kjob: (p : org.kevoree.modeling.api.KCurrentDefer<any>) => void): org.kevoree.modeling.api.KDefer<any>;

                    ready(): org.kevoree.modeling.api.KDefer<any>;

                    next(): org.kevoree.modeling.api.KDefer<any>;

                    then(callback: (p : A) => void): void;

                    setName(taskName: string): org.kevoree.modeling.api.KDefer<any>;

                    getName(): string;

                    chain(block: (p : org.kevoree.modeling.api.KDefer<any>) => org.kevoree.modeling.api.KDefer<any>): org.kevoree.modeling.api.KDefer<any>;

                }

                export interface KDeferBlock {

                    exec(previous: org.kevoree.modeling.api.KDefer<any>): org.kevoree.modeling.api.KDefer<any>;

                }

                export interface KEventListener {

                    on(src: org.kevoree.modeling.api.KObject, modifications: org.kevoree.modeling.api.meta.Meta[]): void;

                }

                export interface KInfer extends org.kevoree.modeling.api.KObject {

                    train(trainingSet: any[][], expectedResultSet: any[], callback: (p : java.lang.Throwable) => void): void;

                    infer(features: any[]): any;

                    accuracy(testSet: any[][], expectedResultSet: any[]): any;

                    clear(): void;

                }

                export class KInferState {

                    public save(): string {
                        throw "Abstract method";
                    }

                    public load(payload: string): void {
                        throw "Abstract method";
                    }

                    public isDirty(): boolean {
                        throw "Abstract method";
                    }

                    public cloneState(): org.kevoree.modeling.api.KInferState {
                        throw "Abstract method";
                    }

                }

                export interface KJob {

                    run(currentTask: org.kevoree.modeling.api.KCurrentDefer<any>): void;

                }

                export interface KModel<A extends org.kevoree.modeling.api.KUniverse<any, any, any>> {

                    newUniverse(): A;

                    universe(key: number): A;

                    manager(): org.kevoree.modeling.api.data.manager.KDataManager;

                    disable(listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void): void;

                    listen(listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void): void;

                    setContentDeliveryDriver(dataBase: org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver): org.kevoree.modeling.api.KModel<any>;

                    setScheduler(scheduler: org.kevoree.modeling.api.KScheduler): org.kevoree.modeling.api.KModel<any>;

                    setOperation(metaOperation: org.kevoree.modeling.api.meta.MetaOperation, operation: (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void): void;

                    setInstanceOperation(metaOperation: org.kevoree.modeling.api.meta.MetaOperation, target: org.kevoree.modeling.api.KObject, operation: (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void): void;

                    metaModel(): org.kevoree.modeling.api.meta.MetaModel;

                    defer(): org.kevoree.modeling.api.KDefer<any>;

                    save(): org.kevoree.modeling.api.KDefer<any>;

                    discard(): org.kevoree.modeling.api.KDefer<any>;

                    connect(): org.kevoree.modeling.api.KDefer<any>;

                    close(): org.kevoree.modeling.api.KDefer<any>;

                }

                export interface KObject {

                    universe(): org.kevoree.modeling.api.KUniverse<any, any, any>;

                    uuid(): number;

                    path(): org.kevoree.modeling.api.KDefer<any>;

                    view(): org.kevoree.modeling.api.KView;

                    delete(): org.kevoree.modeling.api.KDefer<any>;

                    parent(): org.kevoree.modeling.api.KDefer<any>;

                    parentUuid(): number;

                    select(query: string): org.kevoree.modeling.api.KDefer<any>;

                    listen(listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void): void;

                    visitAttributes(visitor: (p : org.kevoree.modeling.api.meta.MetaAttribute, p1 : any) => void): void;

                    visit(visitor: (p : org.kevoree.modeling.api.KObject) => org.kevoree.modeling.api.VisitResult, request: org.kevoree.modeling.api.VisitRequest): org.kevoree.modeling.api.KDefer<any>;

                    now(): number;

                    universeTree(): org.kevoree.modeling.api.rbtree.LongRBTree;

                    timeWalker(): org.kevoree.modeling.api.util.TimeWalker;

                    referenceInParent(): org.kevoree.modeling.api.meta.MetaReference;

                    domainKey(): string;

                    metaClass(): org.kevoree.modeling.api.meta.MetaClass;

                    mutate(actionType: org.kevoree.modeling.api.KActionType, metaReference: org.kevoree.modeling.api.meta.MetaReference, param: org.kevoree.modeling.api.KObject): void;

                    ref(metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.KDefer<any>;

                    inferRef(metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.KDefer<any>;

                    traverse(metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.traversal.KTraversal;

                    traverseQuery(metaReferenceQuery: string): org.kevoree.modeling.api.traversal.KTraversal;

                    traverseInbounds(metaReferenceQuery: string): org.kevoree.modeling.api.traversal.KTraversal;

                    traverseParent(): org.kevoree.modeling.api.traversal.KTraversal;

                    inbounds(): org.kevoree.modeling.api.KDefer<any>;

                    traces(request: org.kevoree.modeling.api.TraceRequest): org.kevoree.modeling.api.trace.ModelTrace[];

                    get(attribute: org.kevoree.modeling.api.meta.MetaAttribute): any;

                    set(attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void;

                    toJSON(): string;

                    equals(other: any): boolean;

                    diff(target: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any>;

                    merge(target: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any>;

                    intersection(target: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any>;

                    jump<U extends org.kevoree.modeling.api.KObject> (time: number): org.kevoree.modeling.api.KDefer<any>;

                    referencesWith(o: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.meta.MetaReference[];

                    inferObjects(): org.kevoree.modeling.api.KDefer<any>;

                    inferAttribute(attribute: org.kevoree.modeling.api.meta.MetaAttribute): any;

                    call(operation: org.kevoree.modeling.api.meta.MetaOperation, params: any[]): org.kevoree.modeling.api.KDefer<any>;

                    inferCall(operation: org.kevoree.modeling.api.meta.MetaOperation, params: any[]): org.kevoree.modeling.api.KDefer<any>;

                }

                export interface KOperation {

                    on(source: org.kevoree.modeling.api.KObject, params: any[], result: (p : any) => void): void;

                }

                export interface KScheduler {

                    dispatch(runnable: java.lang.Runnable): void;

                    stop(): void;

                }

                export interface KType {

                    name(): string;

                    isEnum(): boolean;

                    save(src: any): string;

                    load(payload: string): any;

                }

                export interface KUniverse<A extends org.kevoree.modeling.api.KView, B extends org.kevoree.modeling.api.KUniverse<any, any, any>, C extends org.kevoree.modeling.api.KModel<any>> {

                    key(): number;

                    time(timePoint: number): A;

                    model(): C;

                    equals(other: any): boolean;

                    listen(listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void): void;

                    listenAllTimes(target: org.kevoree.modeling.api.KObject, listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void): void;

                    diverge(): B;

                    origin(): B;

                    descendants(): java.util.List<B>;

                    delete(): org.kevoree.modeling.api.KDefer<any>;

                }

                export interface KView {

                    createFQN(metaClassName: string): org.kevoree.modeling.api.KObject;

                    create(clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject;

                    select(query: string): org.kevoree.modeling.api.KDefer<any>;

                    lookup(key: number): org.kevoree.modeling.api.KDefer<any>;

                    lookupAll(keys: number[]): org.kevoree.modeling.api.KDefer<any>;

                    universe(): org.kevoree.modeling.api.KUniverse<any, any, any>;

                    now(): number;

                    listen(listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void): void;

                    json(): org.kevoree.modeling.api.ModelFormat;

                    xmi(): org.kevoree.modeling.api.ModelFormat;

                    equals(other: any): boolean;

                    setRoot(elem: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any>;

                    getRoot(): org.kevoree.modeling.api.KDefer<any>;

                }

                export interface ModelAttributeVisitor {

                    visit(metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute, value: any): void;

                }

                export interface ModelFormat {

                    save(model: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any>;

                    saveRoot(): org.kevoree.modeling.api.KDefer<any>;

                    load(payload: string): org.kevoree.modeling.api.KDefer<any>;

                }

                export interface ModelVisitor {

                    visit(elem: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.VisitResult;

                }

                export interface ThrowableCallback<A> {

                    on(a: A, error: java.lang.Throwable): void;

                }

                export class TraceRequest {

                    public static ATTRIBUTES_ONLY: TraceRequest = new TraceRequest();
                    public static REFERENCES_ONLY: TraceRequest = new TraceRequest();
                    public static ATTRIBUTES_REFERENCES: TraceRequest = new TraceRequest();
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
                }

                export class VisitRequest {

                    public static CHILDREN: VisitRequest = new VisitRequest();
                    public static CONTAINED: VisitRequest = new VisitRequest();
                    public static ALL: VisitRequest = new VisitRequest();
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
                }

                export class VisitResult {

                    public static CONTINUE: VisitResult = new VisitResult();
                    public static SKIP: VisitResult = new VisitResult();
                    public static STOP: VisitResult = new VisitResult();
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
                }

                export module abs {
                    export class AbstractKDataType implements org.kevoree.modeling.api.KType {

                        private _name: string;
                        private _isEnum: boolean = false;
                        constructor(p_name: string, p_isEnum: boolean) {
                            this._name = p_name;
                            this._isEnum = p_isEnum;
                        }

                        public name(): string {
                            return this._name;
                        }

                        public isEnum(): boolean {
                            return this._isEnum;
                        }

                        public save(src: any): string {
                            if (src != null && this != org.kevoree.modeling.api.meta.PrimitiveTypes.TRANSIENT) {
                                if (this == org.kevoree.modeling.api.meta.PrimitiveTypes.STRING) {
                                    return org.kevoree.modeling.api.json.JsonString.encode(src.toString());
                                } else {
                                    return src.toString();
                                }
                            }
                            return "";
                        }

                        public load(payload: string): any {
                            if (this == org.kevoree.modeling.api.meta.PrimitiveTypes.TRANSIENT) {
                                return null;
                            }
                            if (this == org.kevoree.modeling.api.meta.PrimitiveTypes.STRING) {
                                return org.kevoree.modeling.api.json.JsonString.unescape(payload);
                            }
                            if (this == org.kevoree.modeling.api.meta.PrimitiveTypes.LONG) {
                                return java.lang.Long.parseLong(payload);
                            }
                            if (this == org.kevoree.modeling.api.meta.PrimitiveTypes.INT) {
                                return java.lang.Integer.parseInt(payload);
                            }
                            if (this == org.kevoree.modeling.api.meta.PrimitiveTypes.BOOL) {
                                return payload.equals("true");
                            }
                            if (this == org.kevoree.modeling.api.meta.PrimitiveTypes.SHORT) {
                                return java.lang.Short.parseShort(payload);
                            }
                            if (this == org.kevoree.modeling.api.meta.PrimitiveTypes.DOUBLE) {
                                return java.lang.Double.parseDouble(payload);
                            }
                            if (this == org.kevoree.modeling.api.meta.PrimitiveTypes.FLOAT) {
                                return java.lang.Float.parseFloat(payload);
                            }
                            return null;
                        }

                    }

                    export class AbstractKDefer<A> implements org.kevoree.modeling.api.KCurrentDefer<any> {

                        private _name: string = null;
                        private _isDone: boolean = false;
                        public _isReady: boolean = false;
                        private _nbRecResult: number = 0;
                        private _nbExpectedResult: number = 0;
                        private _results: java.util.Map<string, any> = new java.util.HashMap<string, any>();
                        private _nextTasks: java.util.Set<org.kevoree.modeling.api.KDefer<any>> = new java.util.HashSet<org.kevoree.modeling.api.KDefer<any>>();
                        private _job: (p : org.kevoree.modeling.api.KCurrentDefer<any>) => void;
                        private _result: A = null;
                        public setDoneOrRegister(next: org.kevoree.modeling.api.KDefer<any>): boolean {
                            if (next != null) {
                                this._nextTasks.add(next);
                                return this._isDone;
                            } else {
                                this._isDone = true;
                                var childrenTasks: org.kevoree.modeling.api.KDefer<any>[] = this._nextTasks.toArray(new Array());
                                for (var i: number = 0; i < childrenTasks.length; i++) {
                                    (<org.kevoree.modeling.api.abs.AbstractKDefer<any>>childrenTasks[i]).informParentEnd(this);
                                }
                                return this._isDone;
                            }
                        }

                        private informParentEnd(end: org.kevoree.modeling.api.KDefer<any>): void {
                            if (end == null) {
                                this._nbRecResult = this._nbRecResult + this._nbExpectedResult;
                            } else {
                                if (end != this) {
                                    var castedEnd: org.kevoree.modeling.api.abs.AbstractKDefer<any> = <org.kevoree.modeling.api.abs.AbstractKDefer<any>>end;
                                    var keys: string[] = <string[]>castedEnd._results.keySet().toArray(new Array());
                                    for (var i: number = 0; i < keys.length; i++) {
                                        this._results.put(keys[i], castedEnd._results.get(keys[i]));
                                    }
                                    this._results.put(end.getName(), castedEnd._result);
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

                        public wait(p_previous: org.kevoree.modeling.api.KDefer<any>): org.kevoree.modeling.api.KDefer<any> {
                            if (p_previous != this) {
                                if (!(<org.kevoree.modeling.api.abs.AbstractKDefer<any>>p_previous).setDoneOrRegister(this)) {
                                    this._nbExpectedResult++;
                                } else {
                                    var castedEnd: org.kevoree.modeling.api.abs.AbstractKDefer<any> = <org.kevoree.modeling.api.abs.AbstractKDefer<any>>p_previous;
                                    var keys: string[] = <string[]>castedEnd._results.keySet().toArray(new Array());
                                    for (var i: number = 0; i < keys.length; i++) {
                                        this._results.put(keys[i], castedEnd._results.get(keys[i]));
                                    }
                                    this._results.put(p_previous.getName(), castedEnd._result);
                                }
                            }
                            return this;
                        }

                        public ready(): org.kevoree.modeling.api.KDefer<any> {
                            if (!this._isReady) {
                                this._isReady = true;
                                this.informParentEnd(null);
                            }
                            return this;
                        }

                        public next(): org.kevoree.modeling.api.KDefer<any> {
                            var nextTask: org.kevoree.modeling.api.abs.AbstractKDefer<any> = new org.kevoree.modeling.api.abs.AbstractKDefer<any>();
                            nextTask.wait(this);
                            return nextTask;
                        }

                        public then(p_callback: (p : A) => void): void {
                            this.next().setJob( (currentTask : org.kevoree.modeling.api.KCurrentDefer<any>) => {
                                if (p_callback != null) {
                                    try {
                                        p_callback(this.getResult());
                                    } catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                            e.printStackTrace();
                                            p_callback(null);
                                        }
                                     }
                                }
                            }).ready();
                        }

                        public setName(p_taskName: string): org.kevoree.modeling.api.KDefer<any> {
                            this._name = p_taskName;
                            return this;
                        }

                        public getName(): string {
                            if (this._name == null) {
                                return this.toString();
                            } else {
                                return this._name;
                            }
                        }

                        public chain(p_block: (p : org.kevoree.modeling.api.KDefer<any>) => org.kevoree.modeling.api.KDefer<any>): org.kevoree.modeling.api.KDefer<any> {
                            var nextDefer: org.kevoree.modeling.api.KDefer<any> = this.next();
                            var potentialNext: org.kevoree.modeling.api.KDefer<any> = new org.kevoree.modeling.api.abs.AbstractKDefer<any>();
                            nextDefer.setJob( (currentTask : org.kevoree.modeling.api.KCurrentDefer<any>) => {
                                var nextNextDefer: org.kevoree.modeling.api.KDefer<any> = p_block(currentTask);
                                potentialNext.wait(nextNextDefer);
                                potentialNext.ready();
                                nextNextDefer.ready();
                            });
                            nextDefer.ready();
                            return potentialNext;
                        }

                        public resultKeys(): string[] {
                            return this._results.keySet().toArray(new Array());
                        }

                        public resultByName(p_name: string): any {
                            return this._results.get(p_name);
                        }

                        public resultByDefer(defer: org.kevoree.modeling.api.KDefer<any>): any {
                            return this._results.get(defer.getName());
                        }

                        public addDeferResult(p_result: A): void {
                            this._result = p_result;
                        }

                        public clearResults(): void {
                            this._results.clear();
                        }

                        public getResult(): A {
                            if (this._isDone) {
                                return this._result;
                            } else {
                                throw new java.lang.Exception("Task is not executed yet !");
                            }
                        }

                        public isDone(): boolean {
                            return this._isDone;
                        }

                        public setJob(p_kjob: (p : org.kevoree.modeling.api.KCurrentDefer<any>) => void): org.kevoree.modeling.api.KDefer<any> {
                            this._job = p_kjob;
                            return this;
                        }

                    }

                    export class AbstractKDeferWrapper<A> extends org.kevoree.modeling.api.abs.AbstractKDefer<any> {

                        private _callback: (p : A) => void = null;
                        constructor() {
                            super();
                            var selfPointer: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = this;
                            this._callback =  (a : A) => {
                                selfPointer._isReady = true;
                                selfPointer.addDeferResult(a);
                                selfPointer.setDoneOrRegister(null);
                            };
                        }

                        public initCallback(): (p : A) => void {
                            return this._callback;
                        }

                        public wait(previous: org.kevoree.modeling.api.KDefer<any>): org.kevoree.modeling.api.KDefer<any> {
                            throw new java.lang.RuntimeException("Wait action is forbidden on wrapped tasks, please create a sub defer");
                        }

                        public setJob(p_kjob: (p : org.kevoree.modeling.api.KCurrentDefer<any>) => void): org.kevoree.modeling.api.KDefer<any> {
                            throw new java.lang.RuntimeException("setJob action is forbidden on wrapped tasks, please create a sub defer");
                        }

                        public ready(): org.kevoree.modeling.api.KDefer<any> {
                            return this;
                        }

                    }

                    export class AbstractKModel<A extends org.kevoree.modeling.api.KUniverse<any, any, any>> implements org.kevoree.modeling.api.KModel<any> {

                        private _manager: org.kevoree.modeling.api.data.manager.KDataManager;
                        public metaModel(): org.kevoree.modeling.api.meta.MetaModel {
                            throw "Abstract method";
                        }

                        constructor() {
                            this._manager = new org.kevoree.modeling.api.data.manager.DefaultKDataManager(this);
                        }

                        public connect(): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this._manager.connect(task.initCallback());
                            return task;
                        }

                        public close(): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this._manager.close(task.initCallback());
                            return task;
                        }

                        public manager(): org.kevoree.modeling.api.data.manager.KDataManager {
                            return this._manager;
                        }

                        public newUniverse(): A {
                            var nextKey: number = this._manager.nextUniverseKey();
                            var newDimension: A = this.internal_create(nextKey);
                            this.manager().initUniverse(newDimension, null);
                            return newDimension;
                        }

                        public internal_create(key: number): A {
                            throw "Abstract method";
                        }

                        public universe(key: number): A {
                            var newDimension: A = this.internal_create(key);
                            this.manager().initUniverse(newDimension, null);
                            return newDimension;
                        }

                        public save(): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this._manager.save(task.initCallback());
                            return task;
                        }

                        public discard(): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this._manager.discard(null, task.initCallback());
                            return task;
                        }

                        public disable(listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void): void {
                            this.manager().cdn().unregister(listener);
                        }

                        public listen(listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void): void {
                            this.manager().cdn().registerListener(this, listener, null);
                        }

                        public setContentDeliveryDriver(p_driver: org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver): org.kevoree.modeling.api.KModel<any> {
                            this.manager().setContentDeliveryDriver(p_driver);
                            return this;
                        }

                        public setScheduler(p_scheduler: org.kevoree.modeling.api.KScheduler): org.kevoree.modeling.api.KModel<any> {
                            this.manager().setScheduler(p_scheduler);
                            return this;
                        }

                        public setOperation(metaOperation: org.kevoree.modeling.api.meta.MetaOperation, operation: (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void): void {
                            this.manager().operationManager().registerOperation(metaOperation, operation, null);
                        }

                        public setInstanceOperation(metaOperation: org.kevoree.modeling.api.meta.MetaOperation, target: org.kevoree.modeling.api.KObject, operation: (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void): void {
                            this.manager().operationManager().registerOperation(metaOperation, operation, target);
                        }

                        public defer(): org.kevoree.modeling.api.KDefer<any> {
                            return new org.kevoree.modeling.api.abs.AbstractKDefer<any>();
                        }

                    }

                    export class AbstractKObject implements org.kevoree.modeling.api.KObject {

                        private _view: org.kevoree.modeling.api.KView;
                        private _uuid: number;
                        private _universeTree: org.kevoree.modeling.api.rbtree.LongRBTree;
                        private _metaClass: org.kevoree.modeling.api.meta.MetaClass;
                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
                            this._view = p_view;
                            this._uuid = p_uuid;
                            this._metaClass = p_metaClass;
                            this._universeTree = p_universeTree;
                        }

                        public view(): org.kevoree.modeling.api.KView {
                            return this._view;
                        }

                        public uuid(): number {
                            return this._uuid;
                        }

                        public metaClass(): org.kevoree.modeling.api.meta.MetaClass {
                            return this._metaClass;
                        }

                        public now(): number {
                            return this._view.now();
                        }

                        public universeTree(): org.kevoree.modeling.api.rbtree.LongRBTree {
                            return this._universeTree;
                        }

                        public universe(): org.kevoree.modeling.api.KUniverse<any, any, any> {
                            return this._view.universe();
                        }

                        public path(): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this.parent().then( (parent : org.kevoree.modeling.api.KObject) => {
                                if (parent == null) {
                                    task.initCallback()("/");
                                } else {
                                    parent.path().then( (parentPath : string) => {
                                        task.initCallback()(org.kevoree.modeling.api.util.PathHelper.path(parentPath, this.referenceInParent(), this));
                                    });
                                }
                            });
                            return task;
                        }

                        public parentUuid(): number {
                            var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = this._view.universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                            if (raw == null) {
                                return null;
                            } else {
                                return <number>raw.get(org.kevoree.modeling.api.data.manager.Index.PARENT_INDEX);
                            }
                        }

                        public timeWalker(): org.kevoree.modeling.api.util.TimeWalker {
                            return new org.kevoree.modeling.api.util.TimeWalker(this);
                        }

                        public parent(): org.kevoree.modeling.api.KDefer<any> {
                            var parentKID: number = this.parentUuid();
                            if (parentKID == null) {
                                var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                                task.initCallback()(null);
                                return task;
                            } else {
                                return this._view.lookup(parentKID);
                            }
                        }

                        public referenceInParent(): org.kevoree.modeling.api.meta.MetaReference {
                            var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = this._view.universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                            if (raw == null) {
                                return null;
                            } else {
                                return <org.kevoree.modeling.api.meta.MetaReference>raw.get(org.kevoree.modeling.api.data.manager.Index.REF_IN_PARENT_INDEX);
                            }
                        }

                        public delete(): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            var toRemove: org.kevoree.modeling.api.KObject = this;
                            var rawPayload: org.kevoree.modeling.api.data.cache.KCacheEntry = this._view.universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.DELETE);
                            if (rawPayload == null) {
                                task.initCallback()(new java.lang.Exception("Out of cache Error"));
                            } else {
                                var payload: any = rawPayload.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX);
                                if (payload != null) {
                                    var inboundsKeys: java.util.Set<number> = <java.util.Set<number>>payload;
                                    var refArr: number[] = inboundsKeys.toArray(new Array());
                                    (<org.kevoree.modeling.api.abs.AbstractKView>this.view()).internalLookupAll(refArr,  (resolved : org.kevoree.modeling.api.KObject[]) => {
                                        for (var i: number = 0; i < resolved.length; i++) {
                                            if (resolved[i] != null) {
                                                var linkedReferences: org.kevoree.modeling.api.meta.MetaReference[] = resolved[i].referencesWith(toRemove);
                                                for (var j: number = 0; j < linkedReferences.length; j++) {
                                                    (<org.kevoree.modeling.api.abs.AbstractKObject>resolved[i]).internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, linkedReferences[j], toRemove, false, true);
                                                }
                                            }
                                        }
                                        task.initCallback()(null);
                                    });
                                } else {
                                    task.initCallback()(new java.lang.Exception("Out of cache error"));
                                }
                            }
                            return task;
                        }

                        public select(query: string): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(query)) {
                                task.initCallback()(new Array());
                            } else {
                                var cleanedQuery: string = query;
                                if (cleanedQuery.startsWith("/")) {
                                    cleanedQuery = cleanedQuery.substring(1);
                                }
                                if (query.startsWith("/")) {
                                    var finalCleanedQuery: string = cleanedQuery;
                                    this.universe().model().manager().getRoot(this.view(),  (rootObj : org.kevoree.modeling.api.KObject) => {
                                        if (rootObj == null) {
                                            task.initCallback()(new Array());
                                        } else {
                                            org.kevoree.modeling.api.traversal.selector.KSelector.select(rootObj, finalCleanedQuery, task.initCallback());
                                        }
                                    });
                                } else {
                                    org.kevoree.modeling.api.traversal.selector.KSelector.select(this, query, task.initCallback());
                                }
                            }
                            return task;
                        }

                        public listen(listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void): void {
                            this.universe().model().manager().cdn().registerListener(this, listener, null);
                        }

                        public domainKey(): string {
                            var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                            var atts: org.kevoree.modeling.api.meta.MetaAttribute[] = this.metaClass().metaAttributes();
                            for (var i: number = 0; i < atts.length; i++) {
                                var att: org.kevoree.modeling.api.meta.MetaAttribute = atts[i];
                                if (att.key()) {
                                    if (builder.length != 0) {
                                        builder.append(",");
                                    }
                                    builder.append(att.metaName());
                                    builder.append("=");
                                    var payload: any = this.get(att);
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

                        public get(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute): any {
                            var transposed: org.kevoree.modeling.api.meta.MetaAttribute = this.internal_transpose_att(p_attribute);
                            if (transposed == null) {
                                throw new java.lang.RuntimeException("Bad KMF usage, the attribute named " + p_attribute.metaName() + " is not part of " + this.metaClass().metaName());
                            } else {
                                return transposed.strategy().extrapolate(this, transposed);
                            }
                        }

                        public set(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void {
                            var transposed: org.kevoree.modeling.api.meta.MetaAttribute = this.internal_transpose_att(p_attribute);
                            if (transposed == null) {
                                throw new java.lang.RuntimeException("Bad KMF usage, the attribute named " + p_attribute.metaName() + " is not part of " + this.metaClass().metaName());
                            } else {
                                transposed.strategy().mutate(this, transposed, payload);
                            }
                        }

                        private removeFromContainer(param: org.kevoree.modeling.api.KObject): void {
                            if (param != null && param.parentUuid() != null && param.parentUuid() != this._uuid) {
                                this.view().lookup(param.parentUuid()).then( (parent : org.kevoree.modeling.api.KObject) => {
                                    (<org.kevoree.modeling.api.abs.AbstractKObject>parent).internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, param.referenceInParent(), param, true, false);
                                });
                            }
                        }

                        public mutate(actionType: org.kevoree.modeling.api.KActionType, metaReference: org.kevoree.modeling.api.meta.MetaReference, param: org.kevoree.modeling.api.KObject): void {
                            this.internal_mutate(actionType, metaReference, param, true, false);
                        }

                        public internal_mutate(actionType: org.kevoree.modeling.api.KActionType, metaReferenceP: org.kevoree.modeling.api.meta.MetaReference, param: org.kevoree.modeling.api.KObject, setOpposite: boolean, inDelete: boolean): void {
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
                                    var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = this.view().universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.WRITE);
                                    var previousList: java.util.Set<number>;
                                    if (raw.get(metaReference.index()) != null && raw.get(metaReference.index()) instanceof java.util.Set) {
                                        previousList = <java.util.Set<number>>raw.get(metaReference.index());
                                    } else {
                                        if (raw.get(metaReference.index()) != null) {
                                            try {
                                                throw new java.lang.Exception("Bad cache values in KMF, " + raw.get(metaReference.index()) + " is not an instance of Set for the reference " + metaReference.metaName() + ", index:" + metaReference.index());
                                            } catch ($ex$) {
                                                if ($ex$ instanceof java.lang.Exception) {
                                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                    e.printStackTrace();
                                                }
                                             }
                                        }
                                        previousList = new java.util.HashSet<number>();
                                        raw.set(metaReference.index(), previousList);
                                    }
                                    previousList.add(param.uuid());
                                    if (metaReference.opposite() != null && setOpposite) {
                                        (<org.kevoree.modeling.api.abs.AbstractKObject>param).internal_mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference.opposite(), this, false, inDelete);
                                    }
                                    if (metaReference.contained()) {
                                        this.removeFromContainer(param);
                                        (<org.kevoree.modeling.api.abs.AbstractKObject>param).set_parent(this._uuid, metaReference);
                                    }
                                    var rawParam: org.kevoree.modeling.api.data.cache.KCacheEntry = this.view().universe().model().manager().entry(param, org.kevoree.modeling.api.data.manager.AccessMode.WRITE);
                                    var previousInbounds: java.util.Set<number>;
                                    if (rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) != null && rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) instanceof java.util.Set) {
                                        previousInbounds = <java.util.Set<number>>rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX);
                                    } else {
                                        if (rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) != null) {
                                            try {
                                                throw new java.lang.Exception("Bad cache values in KMF, " + rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) + " is not an instance of Set for the INBOUNDS manager");
                                            } catch ($ex$) {
                                                if ($ex$ instanceof java.lang.Exception) {
                                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                    e.printStackTrace();
                                                }
                                             }
                                        }
                                        previousInbounds = new java.util.HashSet<number>();
                                        rawParam.set(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX, previousInbounds);
                                    }
                                    previousInbounds.add(this.uuid());
                                }
                            } else {
                                if (actionType.equals(org.kevoree.modeling.api.KActionType.SET)) {
                                    if (!metaReference.single()) {
                                        this.internal_mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference, param, setOpposite, inDelete);
                                    } else {
                                        if (param == null) {
                                            this.internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference, null, setOpposite, inDelete);
                                        } else {
                                            var payload: org.kevoree.modeling.api.data.cache.KCacheEntry = this.view().universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.WRITE);
                                            var previous: any = payload.get(metaReference.index());
                                            if (previous != null) {
                                                this.internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference, null, setOpposite, inDelete);
                                            }
                                            payload.set(metaReference.index(), param.uuid());
                                            if (metaReference.contained()) {
                                                this.removeFromContainer(param);
                                                (<org.kevoree.modeling.api.abs.AbstractKObject>param).set_parent(this._uuid, metaReference);
                                            }
                                            var rawParam: org.kevoree.modeling.api.data.cache.KCacheEntry = this.view().universe().model().manager().entry(param, org.kevoree.modeling.api.data.manager.AccessMode.WRITE);
                                            var previousInbounds: java.util.Set<number>;
                                            if (rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) != null && rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) instanceof java.util.Set) {
                                                previousInbounds = <java.util.Set<number>>rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX);
                                            } else {
                                                if (rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) != null) {
                                                    try {
                                                        throw new java.lang.Exception("Bad cache values in KMF, " + rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) + " is not an instance of Set for the INBOUNDS manager");
                                                    } catch ($ex$) {
                                                        if ($ex$ instanceof java.lang.Exception) {
                                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                            e.printStackTrace();
                                                        }
                                                     }
                                                }
                                                previousInbounds = new java.util.HashSet<number>();
                                                rawParam.set(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX, previousInbounds);
                                            }
                                            previousInbounds.add(this.uuid());
                                            var self: org.kevoree.modeling.api.KObject = this;
                                            if (metaReference.opposite() != null && setOpposite) {
                                                if (previous != null) {
                                                    this.view().lookup(<number>previous).then( (resolved : org.kevoree.modeling.api.KObject) => {
                                                        (<org.kevoree.modeling.api.abs.AbstractKObject>resolved).internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), self, false, inDelete);
                                                    });
                                                }
                                                (<org.kevoree.modeling.api.abs.AbstractKObject>param).internal_mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference.opposite(), this, false, inDelete);
                                            }
                                        }
                                    }
                                } else {
                                    if (actionType.equals(org.kevoree.modeling.api.KActionType.REMOVE)) {
                                        if (metaReference.single()) {
                                            var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = this.view().universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.WRITE);
                                            var previousKid: any = raw.get(metaReference.index());
                                            raw.set(metaReference.index(), null);
                                            if (previousKid != null) {
                                                var self: org.kevoree.modeling.api.KObject = this;
                                                this._view.universe().model().manager().lookup(this._view, <number>previousKid,  (resolvedParam : org.kevoree.modeling.api.KObject) => {
                                                    if (resolvedParam != null) {
                                                        if (metaReference.contained()) {
                                                            (<org.kevoree.modeling.api.abs.AbstractKObject>resolvedParam).set_parent(null, null);
                                                        }
                                                        if (metaReference.opposite() != null && setOpposite) {
                                                            (<org.kevoree.modeling.api.abs.AbstractKObject>resolvedParam).internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), self, false, inDelete);
                                                        }
                                                        var rawParam: org.kevoree.modeling.api.data.cache.KCacheEntry = this.view().universe().model().manager().entry(resolvedParam, org.kevoree.modeling.api.data.manager.AccessMode.WRITE);
                                                        var previousInbounds: java.util.Set<number> = null;
                                                        if (rawParam != null && rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) != null && rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) instanceof java.util.Set) {
                                                            previousInbounds = <java.util.Set<number>>rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX);
                                                        } else {
                                                            if (rawParam != null) {
                                                                if (rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) != null) {
                                                                    try {
                                                                        throw new java.lang.Exception("Bad cache values in KMF, " + rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) + " is not an instance of Set for the INBOUNDS manager");
                                                                    } catch ($ex$) {
                                                                        if ($ex$ instanceof java.lang.Exception) {
                                                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                            e.printStackTrace();
                                                                        }
                                                                     }
                                                                }
                                                                previousInbounds = new java.util.HashSet<number>();
                                                                rawParam.set(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX, previousInbounds);
                                                            }
                                                        }
                                                        if (previousInbounds != null) {
                                                            previousInbounds.remove(this._uuid);
                                                        }
                                                    }
                                                });
                                            }
                                        } else {
                                            var payload: org.kevoree.modeling.api.data.cache.KCacheEntry = this.view().universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.WRITE);
                                            var previous: any = payload.get(metaReference.index());
                                            if (previous != null) {
                                                var previousList: java.util.Set<number> = <java.util.Set<number>>previous;
                                                previousList.remove(param.uuid());
                                                if (!inDelete && metaReference.contained()) {
                                                    (<org.kevoree.modeling.api.abs.AbstractKObject>param).set_parent(null, null);
                                                }
                                                if (metaReference.opposite() != null && setOpposite) {
                                                    (<org.kevoree.modeling.api.abs.AbstractKObject>param).internal_mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), this, false, inDelete);
                                                }
                                            }
                                            if (!inDelete) {
                                                var rawParam: org.kevoree.modeling.api.data.cache.KCacheEntry = this.view().universe().model().manager().entry(param, org.kevoree.modeling.api.data.manager.AccessMode.WRITE);
                                                if (rawParam != null && rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) != null && rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) instanceof java.util.Set) {
                                                    var previousInbounds: java.util.Set<number> = <java.util.Set<number>>rawParam.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX);
                                                    previousInbounds.remove(this._uuid);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        public size(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): number {
                            var transposed: org.kevoree.modeling.api.meta.MetaReference = this.internal_transpose_ref(p_metaReference);
                            if (transposed == null) {
                                throw new java.lang.RuntimeException("Bad KMF usage, the attribute named " + p_metaReference.metaName() + " is not part of " + this.metaClass().metaName());
                            } else {
                                var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = this.view().universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                                if (raw != null) {
                                    var ref: any = raw.get(transposed.index());
                                    if (ref == null) {
                                        return 0;
                                    } else {
                                        var refSet: java.util.Set<any> = <java.util.Set<any>>ref;
                                        return refSet.size();
                                    }
                                } else {
                                    return 0;
                                }
                            }
                        }

                        public internal_ref(p_metaReference: org.kevoree.modeling.api.meta.MetaReference, callback: (p : org.kevoree.modeling.api.KObject[]) => void): void {
                            var transposed: org.kevoree.modeling.api.meta.MetaReference = this.internal_transpose_ref(p_metaReference);
                            if (transposed == null) {
                                throw new java.lang.RuntimeException("Bad KMF usage, the reference named " + p_metaReference.metaName() + " is not part of " + this.metaClass().metaName());
                            } else {
                                var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = this.view().universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                                if (raw == null) {
                                    callback(new Array());
                                } else {
                                    var o: any = raw.get(transposed.index());
                                    if (o == null) {
                                        callback(new Array());
                                    } else {
                                        if (o instanceof java.util.Set) {
                                            var objs: java.util.Set<number> = <java.util.Set<number>>o;
                                            var setContent: number[] = objs.toArray(new Array());
                                            (<org.kevoree.modeling.api.abs.AbstractKView>this.view()).internalLookupAll(setContent, callback);
                                        } else {
                                            var content: number[] = [<number>o];
                                            (<org.kevoree.modeling.api.abs.AbstractKView>this.view()).internalLookupAll(content, callback);
                                        }
                                    }
                                }
                            }
                        }

                        public ref(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this.internal_ref(p_metaReference, task.initCallback());
                            return task;
                        }

                        public inferRef(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            return task;
                        }

                        public visitAttributes(visitor: (p : org.kevoree.modeling.api.meta.MetaAttribute, p1 : any) => void): void {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(visitor)) {
                                return;
                            }
                            var metaAttributes: org.kevoree.modeling.api.meta.MetaAttribute[] = this.metaClass().metaAttributes();
                            for (var i: number = 0; i < metaAttributes.length; i++) {
                                visitor(metaAttributes[i], this.get(metaAttributes[i]));
                            }
                        }

                        public visit(p_visitor: (p : org.kevoree.modeling.api.KObject) => org.kevoree.modeling.api.VisitResult, p_request: org.kevoree.modeling.api.VisitRequest): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            if (p_request.equals(org.kevoree.modeling.api.VisitRequest.CHILDREN)) {
                                this.internal_visit(p_visitor, task.initCallback(), false, false, null, null);
                            } else {
                                if (p_request.equals(org.kevoree.modeling.api.VisitRequest.ALL)) {
                                    this.internal_visit(p_visitor, task.initCallback(), true, false, new java.util.HashSet<number>(), new java.util.HashSet<number>());
                                } else {
                                    if (p_request.equals(org.kevoree.modeling.api.VisitRequest.CONTAINED)) {
                                        this.internal_visit(p_visitor, task.initCallback(), true, true, null, null);
                                    }
                                }
                            }
                            return task;
                        }

                        private internal_visit(visitor: (p : org.kevoree.modeling.api.KObject) => org.kevoree.modeling.api.VisitResult, end: (p : java.lang.Throwable) => void, deep: boolean, containedOnly: boolean, visited: java.util.HashSet<number>, traversed: java.util.HashSet<number>): void {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(visitor)) {
                                return;
                            }
                            if (traversed != null) {
                                traversed.add(this._uuid);
                            }
                            var toResolveIds: java.util.Set<number> = new java.util.HashSet<number>();
                            for (var i: number = 0; i < this.metaClass().metaReferences().length; i++) {
                                var reference: org.kevoree.modeling.api.meta.MetaReference = this.metaClass().metaReferences()[i];
                                if (!(containedOnly && !reference.contained())) {
                                    var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = this.view().universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                                    var obj: any = null;
                                    if (raw != null) {
                                        obj = raw.get(reference.index());
                                    }
                                    if (obj != null) {
                                        if (obj instanceof java.util.Set) {
                                            var ids: java.util.Set<number> = <java.util.Set<number>>obj;
                                            var idArr: number[] = ids.toArray(new Array());
                                            for (var k: number = 0; k < idArr.length; k++) {
                                                if (traversed == null || !traversed.contains(idArr[k])) {
                                                    toResolveIds.add(idArr[k]);
                                                }
                                            }
                                        } else {
                                            if (traversed == null || !traversed.contains(obj)) {
                                                toResolveIds.add(<number>obj);
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
                                var toResolveIdsArr: number[] = toResolveIds.toArray(new Array());
                                (<org.kevoree.modeling.api.abs.AbstractKView>this.view()).internalLookupAll(toResolveIdsArr,  (resolvedArr : org.kevoree.modeling.api.KObject[]) => {
                                    var nextDeep: java.util.List<org.kevoree.modeling.api.KObject> = new java.util.ArrayList<org.kevoree.modeling.api.KObject>();
                                    for (var i: number = 0; i < resolvedArr.length; i++) {
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
                                        var index: number[] = new Array();
                                        index[0] = 0;
                                        var next: java.util.List<(p : java.lang.Throwable) => void> = new java.util.ArrayList<(p : java.lang.Throwable) => void>();
                                        next.add( (throwable : java.lang.Throwable) => {
                                            index[0] = index[0] + 1;
                                            if (index[0] == nextDeep.size()) {
                                                if (org.kevoree.modeling.api.util.Checker.isDefined(end)) {
                                                    end(null);
                                                }
                                            } else {
                                                var abstractKObject: org.kevoree.modeling.api.abs.AbstractKObject = <org.kevoree.modeling.api.abs.AbstractKObject>nextDeep.get(index[0]);
                                                if (containedOnly) {
                                                    abstractKObject.internal_visit(visitor, next.get(0), true, true, visited, traversed);
                                                } else {
                                                    abstractKObject.internal_visit(visitor, next.get(0), true, false, visited, traversed);
                                                }
                                            }
                                        });
                                        var abstractKObject: org.kevoree.modeling.api.abs.AbstractKObject = <org.kevoree.modeling.api.abs.AbstractKObject>nextDeep.get(index[0]);
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
                            var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = this.view().universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                            if (raw != null) {
                                return org.kevoree.modeling.api.data.manager.JsonRaw.encode(raw, this._uuid, this._metaClass, true, false);
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
                                for (var i: number = 0; i < this.metaClass().metaAttributes().length; i++) {
                                    var current: org.kevoree.modeling.api.meta.MetaAttribute = this.metaClass().metaAttributes()[i];
                                    var payload: any = this.get(current);
                                    if (payload != null) {
                                        traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(this._uuid, current, payload));
                                    }
                                }
                            }
                            if (org.kevoree.modeling.api.TraceRequest.REFERENCES_ONLY.equals(request) || org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
                                for (var i: number = 0; i < this.metaClass().metaReferences().length; i++) {
                                    var ref: org.kevoree.modeling.api.meta.MetaReference = this.metaClass().metaReferences()[i];
                                    var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = this.view().universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                                    var o: any = null;
                                    if (raw != null) {
                                        o = raw.get(ref.index());
                                    }
                                    if (o instanceof java.util.Set) {
                                        var contents: java.util.Set<number> = <java.util.Set<number>>o;
                                        var contentsArr: number[] = contents.toArray(new Array());
                                        for (var j: number = 0; j < contentsArr.length; j++) {
                                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(this._uuid, ref, contentsArr[j]));
                                        }
                                    } else {
                                        if (o != null) {
                                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(this._uuid, ref, <number>o));
                                        }
                                    }
                                }
                            }
                            return traces.toArray(new Array());
                        }

                        public inbounds(): org.kevoree.modeling.api.KDefer<any> {
                            var rawPayload: org.kevoree.modeling.api.data.cache.KCacheEntry = this.view().universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                            if (rawPayload != null) {
                                var payload: any = rawPayload.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX);
                                if (payload != null) {
                                    var inboundsKeys: java.util.Set<number> = <java.util.Set<number>>payload;
                                    var keysArr: number[] = inboundsKeys.toArray(new Array());
                                    return this._view.lookupAll(keysArr);
                                } else {
                                    var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                                    task.initCallback()(new Array());
                                    return task;
                                }
                            } else {
                                var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                                task.initCallback()(new Array());
                                return task;
                            }
                        }

                        public set_parent(p_parentKID: number, p_metaReference: org.kevoree.modeling.api.meta.MetaReference): void {
                            var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = this._view.universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.WRITE);
                            if (raw != null) {
                                raw.set(org.kevoree.modeling.api.data.manager.Index.PARENT_INDEX, p_parentKID);
                                raw.set(org.kevoree.modeling.api.data.manager.Index.REF_IN_PARENT_INDEX, p_metaReference);
                            }
                        }

                        public equals(obj: any): boolean {
                            if (!(obj instanceof org.kevoree.modeling.api.abs.AbstractKObject)) {
                                return false;
                            } else {
                                var casted: org.kevoree.modeling.api.abs.AbstractKObject = <org.kevoree.modeling.api.abs.AbstractKObject>obj;
                                return (casted.uuid() == this._uuid) && this._view.equals(casted._view);
                            }
                        }

                        public hashCode(): number {
                            var hashString: string = this.uuid() + "-" + this.view().now() + "-" + this.view().universe().key();
                            return hashString.hashCode();
                        }

                        public diff(target: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            org.kevoree.modeling.api.operation.DefaultModelCompare.diff(this, target, task.initCallback());
                            return task;
                        }

                        public merge(target: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            org.kevoree.modeling.api.operation.DefaultModelCompare.merge(this, target, task.initCallback());
                            return task;
                        }

                        public intersection(target: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            org.kevoree.modeling.api.operation.DefaultModelCompare.intersection(this, target, task.initCallback());
                            return task;
                        }

                        public jump<U extends org.kevoree.modeling.api.KObject> (time: number): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this.view().universe().time(time).lookup(this._uuid).then( (kObject : org.kevoree.modeling.api.KObject) => {
                                var casted: U = null;
                                try {
                                    casted = <U>kObject;
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Throwable) {
                                        var e: java.lang.Throwable = <java.lang.Throwable>$ex$;
                                        e.printStackTrace();
                                    }
                                 }
                                task.initCallback()(casted);
                            });
                            return task;
                        }

                        public internal_transpose_ref(p: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.meta.MetaReference {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(p)) {
                                return null;
                            } else {
                                return <org.kevoree.modeling.api.meta.MetaReference>this.metaClass().metaByName(p.metaName());
                            }
                        }

                        public internal_transpose_att(p: org.kevoree.modeling.api.meta.MetaAttribute): org.kevoree.modeling.api.meta.MetaAttribute {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(p)) {
                                return null;
                            } else {
                                return <org.kevoree.modeling.api.meta.MetaAttribute>this.metaClass().metaByName(p.metaName());
                            }
                        }

                        public internal_transpose_op(p: org.kevoree.modeling.api.meta.MetaOperation): org.kevoree.modeling.api.meta.MetaOperation {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(p)) {
                                return null;
                            } else {
                                return <org.kevoree.modeling.api.meta.MetaOperation>this.metaClass().metaByName(p.metaName());
                            }
                        }

                        public traverse(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.traversal.KTraversal {
                            return new org.kevoree.modeling.api.traversal.DefaultKTraversal(this, new org.kevoree.modeling.api.traversal.actions.KTraverseAction(p_metaReference));
                        }

                        public traverseQuery(metaReferenceQuery: string): org.kevoree.modeling.api.traversal.KTraversal {
                            return new org.kevoree.modeling.api.traversal.DefaultKTraversal(this, new org.kevoree.modeling.api.traversal.actions.KTraverseQueryAction(metaReferenceQuery));
                        }

                        public traverseInbounds(metaReferenceQuery: string): org.kevoree.modeling.api.traversal.KTraversal {
                            return new org.kevoree.modeling.api.traversal.DefaultKTraversal(this, new org.kevoree.modeling.api.traversal.actions.KReverseQueryAction(metaReferenceQuery));
                        }

                        public traverseParent(): org.kevoree.modeling.api.traversal.KTraversal {
                            return new org.kevoree.modeling.api.traversal.DefaultKTraversal(this, new org.kevoree.modeling.api.traversal.actions.KParentsAction());
                        }

                        public referencesWith(o: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.meta.MetaReference[] {
                            if (org.kevoree.modeling.api.util.Checker.isDefined(o)) {
                                var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = this._view.universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                                if (raw != null) {
                                    var allReferences: org.kevoree.modeling.api.meta.MetaReference[] = this.metaClass().metaReferences();
                                    var selected: java.util.List<org.kevoree.modeling.api.meta.MetaReference> = new java.util.ArrayList<org.kevoree.modeling.api.meta.MetaReference>();
                                    for (var i: number = 0; i < allReferences.length; i++) {
                                        var rawI: any = raw.get(allReferences[i].index());
                                        if (rawI instanceof java.util.Set) {
                                            try {
                                                var castedSet: java.util.Set<number> = <java.util.Set<number>>rawI;
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
                                                    var casted: number = <number>rawI;
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

                        public call(p_operation: org.kevoree.modeling.api.meta.MetaOperation, p_params: any[]): org.kevoree.modeling.api.KDefer<any> {
                            var temp_task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this.view().universe().model().manager().operationManager().call(this, p_operation, p_params, temp_task.initCallback());
                            return temp_task;
                        }

                        public inferObjects(): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            return task;
                        }

                        public inferAttribute(attribute: org.kevoree.modeling.api.meta.MetaAttribute): any {
                            return null;
                        }

                        public inferCall(operation: org.kevoree.modeling.api.meta.MetaOperation, params: any[]): org.kevoree.modeling.api.KDefer<any> {
                            var temp_task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            return temp_task;
                        }

                    }

                    export class AbstractKObjectInfer extends org.kevoree.modeling.api.abs.AbstractKObject implements org.kevoree.modeling.api.KInfer {

                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
                            super(p_view, p_uuid, p_universeTree, p_metaClass);
                        }

                        public readOnlyState(): org.kevoree.modeling.api.KInferState {
                            var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = this.view().universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                            if (raw != null) {
                                if (raw.get(org.kevoree.modeling.api.meta.MetaInferClass.getInstance().getCache().index()) == null) {
                                    this.internal_load(raw);
                                }
                                return <org.kevoree.modeling.api.KInferState>raw.get(org.kevoree.modeling.api.meta.MetaInferClass.getInstance().getCache().index());
                            } else {
                                return null;
                            }
                        }

                        public modifyState(): org.kevoree.modeling.api.KInferState {
                            var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = this.view().universe().model().manager().entry(this, org.kevoree.modeling.api.data.manager.AccessMode.WRITE);
                            if (raw != null) {
                                if (raw.get(org.kevoree.modeling.api.meta.MetaInferClass.getInstance().getCache().index()) == null) {
                                    this.internal_load(raw);
                                }
                                return <org.kevoree.modeling.api.KInferState>raw.get(org.kevoree.modeling.api.meta.MetaInferClass.getInstance().getCache().index());
                            } else {
                                return null;
                            }
                        }

                        private internal_load(raw: org.kevoree.modeling.api.data.cache.KCacheEntry): void {
                            if (raw.get(org.kevoree.modeling.api.meta.MetaInferClass.getInstance().getCache().index()) == null) {
                                var currentState: org.kevoree.modeling.api.KInferState = this.createEmptyState();
                                currentState.load(raw.get(org.kevoree.modeling.api.meta.MetaInferClass.getInstance().getRaw().index()).toString());
                                raw.set(org.kevoree.modeling.api.meta.MetaInferClass.getInstance().getCache().index(), currentState);
                            }
                        }

                        public train(trainingSet: any[][], expectedResultSet: any[], callback: (p : java.lang.Throwable) => void): void {
                            throw "Abstract method";
                        }

                        public infer(features: any[]): any {
                            throw "Abstract method";
                        }

                        public accuracy(testSet: any[][], expectedResultSet: any[]): any {
                            throw "Abstract method";
                        }

                        public clear(): void {
                            throw "Abstract method";
                        }

                        public createEmptyState(): org.kevoree.modeling.api.KInferState {
                            throw "Abstract method";
                        }

                    }

                    export class AbstractKUniverse<A extends org.kevoree.modeling.api.KView, B extends org.kevoree.modeling.api.KUniverse<any, any, any>, C extends org.kevoree.modeling.api.KModel<any>> implements org.kevoree.modeling.api.KUniverse<any, any, any> {

                        private _model: org.kevoree.modeling.api.KModel<any>;
                        private _key: number;
                        constructor(p_model: org.kevoree.modeling.api.KModel<any>, p_key: number) {
                            this._model = p_model;
                            this._key = p_key;
                        }

                        public key(): number {
                            return this._key;
                        }

                        public model(): C {
                            return <C>this._model;
                        }

                        public delete(): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this.model().manager().delete(this, task.initCallback());
                            return task;
                        }

                        public time(timePoint: number): A {
                            return this.internal_create(timePoint);
                        }

                        public listen(listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void): void {
                            this.model().manager().cdn().registerListener(this, listener, null);
                        }

                        public listenAllTimes(target: org.kevoree.modeling.api.KObject, listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void): void {
                            this.model().manager().cdn().registerListener(this, listener, target);
                        }

                        public internal_create(timePoint: number): A {
                            throw "Abstract method";
                        }

                        public equals(obj: any): boolean {
                            if (!(obj instanceof org.kevoree.modeling.api.abs.AbstractKUniverse)) {
                                return false;
                            } else {
                                var casted: org.kevoree.modeling.api.abs.AbstractKUniverse<any, any, any> = <org.kevoree.modeling.api.abs.AbstractKUniverse<any, any, any>>obj;
                                return casted._key == this._key;
                            }
                        }

                        public origin(): B {
                            return <B>this._model.universe(this._model.manager().parentUniverseKey(this._key));
                        }

                        public diverge(): B {
                            var casted: org.kevoree.modeling.api.abs.AbstractKModel<any> = <org.kevoree.modeling.api.abs.AbstractKModel<any>>this._model;
                            var nextKey: number = this._model.manager().nextUniverseKey();
                            var newUniverse: B = <B>casted.internal_create(nextKey);
                            this._model.manager().initUniverse(newUniverse, this);
                            return newUniverse;
                        }

                        public descendants(): java.util.List<B> {
                            var descendentsKey: number[] = this._model.manager().descendantsUniverseKeys(this._key);
                            var childs: java.util.List<B> = new java.util.ArrayList<B>();
                            for (var i: number = 0; i < descendentsKey.length; i++) {
                                childs.add(<B>this._model.universe(descendentsKey[i]));
                            }
                            return childs;
                        }

                    }

                    export class AbstractKView implements org.kevoree.modeling.api.KView {

                        private _now: number;
                        private _universe: org.kevoree.modeling.api.KUniverse<any, any, any>;
                        constructor(p_now: number, p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>) {
                            this._now = p_now;
                            this._universe = p_universe;
                        }

                        public now(): number {
                            return this._now;
                        }

                        public universe(): org.kevoree.modeling.api.KUniverse<any, any, any> {
                            return this._universe;
                        }

                        public createFQN(metaClassName: string): org.kevoree.modeling.api.KObject {
                            return this.create(this.universe().model().metaModel().metaClass(metaClassName));
                        }

                        public setRoot(elem: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            (<org.kevoree.modeling.api.abs.AbstractKObject>elem).set_parent(null, null);
                            this.universe().model().manager().setRoot(elem, task.initCallback());
                            return task;
                        }

                        public getRoot(): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this.universe().model().manager().getRoot(this, task.initCallback());
                            return task;
                        }

                        public select(query: string): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            if (query == null) {
                                task.initCallback()(new Array());
                            }
                            this.universe().model().manager().getRoot(this,  (rootObj : org.kevoree.modeling.api.KObject) => {
                                if (rootObj == null) {
                                    task.initCallback()(new Array());
                                } else {
                                    var cleanedQuery: string = query;
                                    if (cleanedQuery.equals("/")) {
                                        var param: org.kevoree.modeling.api.KObject[] = new Array();
                                        param[0] = rootObj;
                                        task.initCallback()(param);
                                    } else {
                                        if (cleanedQuery.startsWith("/")) {
                                            cleanedQuery = cleanedQuery.substring(1);
                                        }
                                        org.kevoree.modeling.api.traversal.selector.KSelector.select(rootObj, cleanedQuery, task.initCallback());
                                    }
                                }
                            });
                            return task;
                        }

                        public lookup(kid: number): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this.universe().model().manager().lookup(this, kid, task.initCallback());
                            return task;
                        }

                        public lookupAll(keys: number[]): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this.universe().model().manager().lookupAll(this, keys, task.initCallback());
                            return task;
                        }

                        public internalLookupAll(keys: number[], callback: (p : org.kevoree.modeling.api.KObject[]) => void): void {
                            this.universe().model().manager().lookupAll(this, keys, callback);
                        }

                        public createProxy(clazz: org.kevoree.modeling.api.meta.MetaClass, universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, key: number): org.kevoree.modeling.api.KObject {
                            return this.internalCreate(clazz, universeTree, key);
                        }

                        public create(clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(clazz)) {
                                return null;
                            }
                            var newUniverseTree: org.kevoree.modeling.api.rbtree.LongRBTree = new org.kevoree.modeling.api.rbtree.LongRBTree();
                            newUniverseTree.insert(this.universe().key(), this.now());
                            var newObj: org.kevoree.modeling.api.KObject = this.internalCreate(clazz, newUniverseTree, this.universe().model().manager().nextObjectKey());
                            if (newObj != null) {
                                this.universe().model().manager().initKObject(newObj, this);
                            }
                            return newObj;
                        }

                        public listen(listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void): void {
                            this.universe().model().manager().cdn().registerListener(this, listener, null);
                        }

                        public internalCreate(clazz: org.kevoree.modeling.api.meta.MetaClass, universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, key: number): org.kevoree.modeling.api.KObject {
                            throw "Abstract method";
                        }

                        public json(): org.kevoree.modeling.api.ModelFormat {
                            return new org.kevoree.modeling.api.json.JsonFormat(this);
                        }

                        public xmi(): org.kevoree.modeling.api.ModelFormat {
                            return new org.kevoree.modeling.api.xmi.XmiFormat(this);
                        }

                        public equals(obj: any): boolean {
                            if (!org.kevoree.modeling.api.util.Checker.isDefined(obj)) {
                                return false;
                            }
                            if (!(obj instanceof org.kevoree.modeling.api.abs.AbstractKView)) {
                                return false;
                            } else {
                                var casted: org.kevoree.modeling.api.abs.AbstractKView = <org.kevoree.modeling.api.abs.AbstractKView>obj;
                                return (casted._now == this._now) && this._universe.equals(casted._universe);
                            }
                        }

                    }

                    export class AbstractMetaAttribute implements org.kevoree.modeling.api.meta.MetaAttribute {

                        private _name: string;
                        private _index: number;
                        private _precision: number;
                        private _key: boolean;
                        private _metaType: org.kevoree.modeling.api.KType;
                        private _extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation;
                        public attributeType(): org.kevoree.modeling.api.KType {
                            return this._metaType;
                        }

                        public index(): number {
                            return this._index;
                        }

                        public metaName(): string {
                            return this._name;
                        }

                        public metaType(): org.kevoree.modeling.api.meta.MetaType {
                            return org.kevoree.modeling.api.meta.MetaType.ATTRIBUTE;
                        }

                        public precision(): number {
                            return this._precision;
                        }

                        public key(): boolean {
                            return this._key;
                        }

                        public strategy(): org.kevoree.modeling.api.extrapolation.Extrapolation {
                            return this._extrapolation;
                        }

                        public setExtrapolation(extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation): void {
                            this._extrapolation = extrapolation;
                        }

                        constructor(p_name: string, p_index: number, p_precision: number, p_key: boolean, p_metaType: org.kevoree.modeling.api.KType, p_extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation) {
                            this._name = p_name;
                            this._index = p_index;
                            this._precision = p_precision;
                            this._key = p_key;
                            this._metaType = p_metaType;
                            this._extrapolation = p_extrapolation;
                        }

                    }

                    export class AbstractMetaClass implements org.kevoree.modeling.api.meta.MetaClass {

                        private _name: string;
                        private _index: number;
                        private _meta: org.kevoree.modeling.api.meta.Meta[];
                        private _atts: org.kevoree.modeling.api.meta.MetaAttribute[];
                        private _refs: org.kevoree.modeling.api.meta.MetaReference[];
                        private _indexes: java.util.HashMap<string, org.kevoree.modeling.api.meta.Meta> = new java.util.HashMap<string, org.kevoree.modeling.api.meta.Meta>();
                        public metaByName(name: string): org.kevoree.modeling.api.meta.Meta {
                            return this._indexes.get(name);
                        }

                        public metaElements(): org.kevoree.modeling.api.meta.Meta[] {
                            return this._meta;
                        }

                        public index(): number {
                            return this._index;
                        }

                        public metaName(): string {
                            return this._name;
                        }

                        public metaType(): org.kevoree.modeling.api.meta.MetaType {
                            return org.kevoree.modeling.api.meta.MetaType.CLASS;
                        }

                        constructor(p_name: string, p_index: number) {
                            this._name = p_name;
                            this._index = p_index;
                        }

                        public init(p_meta: org.kevoree.modeling.api.meta.Meta[]): void {
                            this._meta = p_meta;
                            var nbAtt: number = 0;
                            var nbRef: number = 0;
                            for (var i: number = 0; i < p_meta.length; i++) {
                                if (p_meta[i].metaType().equals(org.kevoree.modeling.api.meta.MetaType.ATTRIBUTE)) {
                                    nbAtt++;
                                } else {
                                    if (p_meta[i].metaType().equals(org.kevoree.modeling.api.meta.MetaType.REFERENCE)) {
                                        nbRef++;
                                    }
                                }
                                this._indexes.put(p_meta[i].metaName(), p_meta[i]);
                            }
                            this._atts = new Array();
                            this._refs = new Array();
                            nbAtt = 0;
                            nbRef = 0;
                            for (var i: number = 0; i < p_meta.length; i++) {
                                if (p_meta[i].metaType().equals(org.kevoree.modeling.api.meta.MetaType.ATTRIBUTE)) {
                                    this._atts[nbAtt] = <org.kevoree.modeling.api.meta.MetaAttribute>p_meta[i];
                                    nbAtt++;
                                } else {
                                    if (p_meta[i].metaType().equals(org.kevoree.modeling.api.meta.MetaType.REFERENCE)) {
                                        this._refs[nbRef] = <org.kevoree.modeling.api.meta.MetaReference>p_meta[i];
                                        nbRef++;
                                    }
                                }
                                this._indexes.put(p_meta[i].metaName(), p_meta[i]);
                            }
                        }

                        public meta(index: number): org.kevoree.modeling.api.meta.Meta {
                            var transposedIndex: number = index - org.kevoree.modeling.api.data.manager.Index.RESERVED_INDEXES;
                            if (transposedIndex >= 0 && transposedIndex < this._meta.length) {
                                return this._meta[index];
                            } else {
                                return null;
                            }
                        }

                        public metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[] {
                            return this._atts;
                        }

                        public metaReferences(): org.kevoree.modeling.api.meta.MetaReference[] {
                            return this._refs;
                        }

                    }

                    export class AbstractMetaModel implements org.kevoree.modeling.api.meta.MetaModel {

                        private _name: string;
                        private _index: number;
                        private _metaClasses: org.kevoree.modeling.api.meta.MetaClass[];
                        private _metaClasses_indexes: java.util.HashMap<string, number> = new java.util.HashMap<string, number>();
                        public index(): number {
                            return this._index;
                        }

                        public metaName(): string {
                            return this._name;
                        }

                        public metaType(): org.kevoree.modeling.api.meta.MetaType {
                            return org.kevoree.modeling.api.meta.MetaType.MODEL;
                        }

                        constructor(p_name: string, p_index: number) {
                            this._name = p_name;
                            this._index = p_index;
                        }

                        public metaClasses(): org.kevoree.modeling.api.meta.MetaClass[] {
                            return this._metaClasses;
                        }

                        public metaClass(name: string): org.kevoree.modeling.api.meta.MetaClass {
                            var resolved: number = this._metaClasses_indexes.get(name);
                            if (resolved == null) {
                                return null;
                            } else {
                                return this._metaClasses[resolved];
                            }
                        }

                        public init(p_metaClasses: org.kevoree.modeling.api.meta.MetaClass[]): void {
                            this._metaClasses_indexes.clear();
                            this._metaClasses = p_metaClasses;
                            for (var i: number = 0; i < this._metaClasses.length; i++) {
                                this._metaClasses_indexes.put(this._metaClasses[i].metaName(), i);
                            }
                        }

                    }

                    export class AbstractMetaOperation implements org.kevoree.modeling.api.meta.MetaOperation {

                        private _name: string;
                        private _index: number;
                        private _lazyMetaClass: () => org.kevoree.modeling.api.meta.Meta;
                        public index(): number {
                            return this._index;
                        }

                        public metaName(): string {
                            return this._name;
                        }

                        public metaType(): org.kevoree.modeling.api.meta.MetaType {
                            return org.kevoree.modeling.api.meta.MetaType.OPERATION;
                        }

                        constructor(p_name: string, p_index: number, p_lazyMetaClass: () => org.kevoree.modeling.api.meta.Meta) {
                            this._name = p_name;
                            this._index = p_index;
                            this._lazyMetaClass = p_lazyMetaClass;
                        }

                        public origin(): org.kevoree.modeling.api.meta.MetaClass {
                            if (this._lazyMetaClass != null) {
                                return <org.kevoree.modeling.api.meta.MetaClass>this._lazyMetaClass();
                            }
                            return null;
                        }

                    }

                    export class AbstractMetaReference implements org.kevoree.modeling.api.meta.MetaReference {

                        private _name: string;
                        private _index: number;
                        private _contained: boolean;
                        private _single: boolean;
                        private _lazyMetaType: () => org.kevoree.modeling.api.meta.Meta;
                        private _lazyMetaOpposite: () => org.kevoree.modeling.api.meta.Meta;
                        private _lazyMetaOrigin: () => org.kevoree.modeling.api.meta.Meta;
                        public single(): boolean {
                            return this._single;
                        }

                        public attributeType(): org.kevoree.modeling.api.meta.MetaClass {
                            if (this._lazyMetaType != null) {
                                return <org.kevoree.modeling.api.meta.MetaClass>this._lazyMetaType();
                            } else {
                                return null;
                            }
                        }

                        public opposite(): org.kevoree.modeling.api.meta.MetaReference {
                            if (this._lazyMetaOpposite != null) {
                                return <org.kevoree.modeling.api.meta.MetaReference>this._lazyMetaOpposite();
                            }
                            return null;
                        }

                        public origin(): org.kevoree.modeling.api.meta.MetaClass {
                            if (this._lazyMetaOrigin != null) {
                                return <org.kevoree.modeling.api.meta.MetaClass>this._lazyMetaOrigin();
                            }
                            return null;
                        }

                        public index(): number {
                            return this._index;
                        }

                        public metaName(): string {
                            return this._name;
                        }

                        public metaType(): org.kevoree.modeling.api.meta.MetaType {
                            return org.kevoree.modeling.api.meta.MetaType.REFERENCE;
                        }

                        public contained(): boolean {
                            return this._contained;
                        }

                        constructor(p_name: string, p_index: number, p_contained: boolean, p_single: boolean, p_lazyMetaType: () => org.kevoree.modeling.api.meta.Meta, p_lazyMetaOpposite: () => org.kevoree.modeling.api.meta.Meta, p_lazyMetaOrigin: () => org.kevoree.modeling.api.meta.Meta) {
                            this._name = p_name;
                            this._index = p_index;
                            this._contained = p_contained;
                            this._single = p_single;
                            this._lazyMetaType = p_lazyMetaType;
                            this._lazyMetaOpposite = p_lazyMetaOpposite;
                            this._lazyMetaOrigin = p_lazyMetaOrigin;
                        }

                    }

                    export interface LazyResolver {

                        meta(): org.kevoree.modeling.api.meta.Meta;

                    }

                }
                export module data {
                    export module cache {
                        export interface KCache {

                            get(key: org.kevoree.modeling.api.data.cache.KContentKey): org.kevoree.modeling.api.data.cache.KCacheObject;

                            put(key: org.kevoree.modeling.api.data.cache.KContentKey, payload: org.kevoree.modeling.api.data.cache.KCacheObject): void;

                            dirties(): org.kevoree.modeling.api.data.cache.KCacheDirty[];

                            clearDataSegment(): void;

                        }

                        export class KCacheDirty {

                            public key: org.kevoree.modeling.api.data.cache.KContentKey;
                            public object: org.kevoree.modeling.api.data.cache.KCacheObject;
                            constructor(key: org.kevoree.modeling.api.data.cache.KContentKey, object: org.kevoree.modeling.api.data.cache.KCacheObject) {
                                this.key = key;
                                this.object = object;
                            }

                        }

                        export class KCacheEntry implements org.kevoree.modeling.api.data.cache.KCacheObject {

                            public universeTree: org.kevoree.modeling.api.rbtree.LongRBTree;
                            public metaClass: org.kevoree.modeling.api.meta.MetaClass;
                            public raw: any[];
                            public _modifiedIndexes: boolean[] = null;
                            public _dirty: boolean = false;
                            public isDirty(): boolean {
                                return this._dirty;
                            }

                            public modifiedIndexes(): number[] {
                                if (this._modifiedIndexes == null) {
                                    return new Array();
                                } else {
                                    var nbModified: number = 0;
                                    for (var i: number = 0; i < this._modifiedIndexes.length; i++) {
                                        if (this._modifiedIndexes[i]) {
                                            nbModified = nbModified + 1;
                                        }
                                    }
                                    var result: number[] = new Array();
                                    var inserted: number = 0;
                                    for (var i: number = 0; i < this._modifiedIndexes.length; i++) {
                                        if (this._modifiedIndexes[i]) {
                                            result[inserted] = i;
                                            inserted = inserted + 1;
                                        }
                                    }
                                    return result;
                                }
                            }

                            public serialize(): string {
                                return org.kevoree.modeling.api.data.manager.JsonRaw.encode(this, null, this.metaClass, true, false);
                            }

                            public setClean(): void {
                                this._dirty = false;
                                this._modifiedIndexes = null;
                            }

                            public unserialize(key: org.kevoree.modeling.api.data.cache.KContentKey, payload: string, metaModel: org.kevoree.modeling.api.meta.MetaModel): void {
                                org.kevoree.modeling.api.data.manager.JsonRaw.decode(payload, key.part2(), metaModel, this);
                            }

                            public get(index: number): any {
                                if (this.raw != null) {
                                    return this.raw[index];
                                } else {
                                    return null;
                                }
                            }

                            public set(index: number, content: any): void {
                                this.raw[index] = content;
                                this._dirty = true;
                                if (this._modifiedIndexes == null) {
                                    this._modifiedIndexes = new Array();
                                }
                                this._modifiedIndexes[index] = true;
                            }

                            public sizeRaw(): number {
                                return this.raw.length;
                            }

                            public clone(): org.kevoree.modeling.api.data.cache.KCacheEntry {
                                var cloned: any[] = new Array();
                                for (var i: number = 0; i < this.raw.length; i++) {
                                    var resolved: any = this.raw[i];
                                    if (resolved != null) {
                                        if (resolved instanceof java.util.Set) {
                                            var clonedSet: java.util.HashSet<number> = new java.util.HashSet<number>();
                                            clonedSet.addAll(<java.util.Set<number>>resolved);
                                            cloned[i] = clonedSet;
                                        } else {
                                            if (resolved instanceof java.util.List) {
                                                var clonedList: java.util.ArrayList<number> = new java.util.ArrayList<number>();
                                                clonedList.addAll(<java.util.List<number>>resolved);
                                                cloned[i] = clonedList;
                                            } else {
                                                if (resolved instanceof org.kevoree.modeling.api.KInferState) {
                                                    cloned[i] = (<org.kevoree.modeling.api.KInferState>resolved).cloneState();
                                                } else {
                                                    cloned[i] = resolved;
                                                }
                                            }
                                        }
                                    }
                                }
                                var clonedEntry: org.kevoree.modeling.api.data.cache.KCacheEntry = new org.kevoree.modeling.api.data.cache.KCacheEntry();
                                clonedEntry._dirty = true;
                                clonedEntry.raw = cloned;
                                clonedEntry.metaClass = this.metaClass;
                                clonedEntry.universeTree = this.universeTree;
                                return clonedEntry;
                            }

                        }

                        export class KCacheLayer {

                            private _nestedLayers: java.util.HashMap<number, org.kevoree.modeling.api.data.cache.KCacheLayer>;
                            private _cachedObjects: java.util.HashMap<number, org.kevoree.modeling.api.data.cache.KCacheObject>;
                            private _cachedNullObject: org.kevoree.modeling.api.data.cache.KCacheObject;
                            private _nestedNullLayer: org.kevoree.modeling.api.data.cache.KCacheLayer;
                            public resolve(p_key: org.kevoree.modeling.api.data.cache.KContentKey, current: number): org.kevoree.modeling.api.data.cache.KCacheObject {
                                if (p_key.part(current) == null) {
                                    if (current == org.kevoree.modeling.api.data.cache.KContentKey.ELEM_SIZE - 1) {
                                        return this._cachedNullObject;
                                    } else {
                                        if (this._nestedNullLayer != null) {
                                            return this._nestedNullLayer.resolve(p_key, current + 1);
                                        } else {
                                            return null;
                                        }
                                    }
                                } else {
                                    if (current == org.kevoree.modeling.api.data.cache.KContentKey.ELEM_SIZE - 1) {
                                        return this._cachedObjects.get(p_key.part(current));
                                    } else {
                                        if (this._nestedLayers != null) {
                                            var nextLayer: org.kevoree.modeling.api.data.cache.KCacheLayer = this._nestedLayers.get(p_key.part(current));
                                            if (nextLayer != null) {
                                                return nextLayer.resolve(p_key, current + 1);
                                            } else {
                                                return null;
                                            }
                                        } else {
                                            return null;
                                        }
                                    }
                                }
                            }

                            public insert(p_key: org.kevoree.modeling.api.data.cache.KContentKey, current: number, p_obj_insert: org.kevoree.modeling.api.data.cache.KCacheObject): void {
                                if (p_key.part(current) == null) {
                                    if (current == org.kevoree.modeling.api.data.cache.KContentKey.ELEM_SIZE - 1) {
                                        this._cachedNullObject = p_obj_insert;
                                    } else {
                                        if (this._nestedNullLayer == null) {
                                            this._nestedNullLayer = new org.kevoree.modeling.api.data.cache.KCacheLayer();
                                        }
                                        this._nestedNullLayer.insert(p_key, current + 1, p_obj_insert);
                                    }
                                } else {
                                    if (current == org.kevoree.modeling.api.data.cache.KContentKey.ELEM_SIZE - 1) {
                                        if (this._cachedObjects == null) {
                                            this._cachedObjects = new java.util.HashMap<number, org.kevoree.modeling.api.data.cache.KCacheObject>();
                                        }
                                        this._cachedObjects.put(p_key.part(current), p_obj_insert);
                                    } else {
                                        if (this._nestedLayers == null) {
                                            this._nestedLayers = new java.util.HashMap<number, org.kevoree.modeling.api.data.cache.KCacheLayer>();
                                        }
                                        var previousLayer: org.kevoree.modeling.api.data.cache.KCacheLayer = this._nestedLayers.get(p_key.part(current));
                                        if (previousLayer == null) {
                                            previousLayer = new org.kevoree.modeling.api.data.cache.KCacheLayer();
                                            this._nestedLayers.put(p_key.part(current), previousLayer);
                                        }
                                        previousLayer.insert(p_key, current + 1, p_obj_insert);
                                    }
                                }
                            }

                            public dirties(result: java.util.List<org.kevoree.modeling.api.data.cache.KCacheDirty>, prefixKeys: number[], current: number): void {
                                if (current == org.kevoree.modeling.api.data.cache.KContentKey.ELEM_SIZE - 1) {
                                    if (this._cachedNullObject != null && this._cachedNullObject.isDirty()) {
                                        var nullKey: org.kevoree.modeling.api.data.cache.KContentKey = new org.kevoree.modeling.api.data.cache.KContentKey(prefixKeys[0], prefixKeys[1], prefixKeys[2], null);
                                        result.add(new org.kevoree.modeling.api.data.cache.KCacheDirty(nullKey, this._cachedNullObject));
                                    }
                                    if (this._cachedObjects != null) {
                                        var objKeys: number[] = this._cachedObjects.keySet().toArray(new Array());
                                        for (var i: number = 0; i < objKeys.length; i++) {
                                            var loopCached: org.kevoree.modeling.api.data.cache.KCacheObject = this._cachedObjects.get(objKeys[i]);
                                            if (loopCached.isDirty()) {
                                                var loopKey: org.kevoree.modeling.api.data.cache.KContentKey = new org.kevoree.modeling.api.data.cache.KContentKey(prefixKeys[0], prefixKeys[1], prefixKeys[2], objKeys[i]);
                                                result.add(new org.kevoree.modeling.api.data.cache.KCacheDirty(loopKey, loopCached));
                                            }
                                        }
                                    }
                                } else {
                                    if (this._nestedNullLayer != null) {
                                        this._nestedNullLayer.dirties(result, prefixKeys, current + 1);
                                    }
                                    if (this._nestedLayers != null) {
                                        var nestedKeys: number[] = this._nestedLayers.keySet().toArray(new Array());
                                        for (var i: number = 0; i < nestedKeys.length; i++) {
                                            var prefixKeysCloned: number[] = new Array();
                                            for (var j: number = 0; j < current; j++) {
                                                prefixKeysCloned[j] = prefixKeys[j];
                                            }
                                            prefixKeysCloned[current] = nestedKeys[i];
                                            this._nestedLayers.get(nestedKeys[i]).dirties(result, prefixKeysCloned, current + 1);
                                        }
                                    }
                                }
                            }

                        }

                        export interface KCacheObject {

                            isDirty(): boolean;

                            serialize(): string;

                            setClean(): void;

                            unserialize(key: org.kevoree.modeling.api.data.cache.KContentKey, payload: string, metaModel: org.kevoree.modeling.api.meta.MetaModel): void;

                        }

                        export class KContentKey {

                            public static ELEM_SIZE: number = 4;
                            private elem: number[] = new Array();
                            public static KEY_SEP: string = '/';
                            private static GLOBAL_SEGMENT_META: number = 0;
                            public static GLOBAL_SEGMENT_DATA: number = 1;
                            private static GLOBAL_SEGMENT_UNIVERSE_TREE: number = 2;
                            private static GLOBAL_SEGMENT_PREFIX: number = 3;
                            private static GLOBAL_SEGMENT_ROOT: number = 4;
                            private static GLOBAL_SUB_SEGMENT_PREFIX_OBJ: number = 0;
                            private static GLOBAL_SUB_SEGMENT_PREFIX_UNI: number = 1;
                            constructor(p_prefixID: number, p_universeID: number, p_timeID: number, p_objID: number) {
                                this.elem[0] = p_prefixID;
                                this.elem[1] = p_universeID;
                                this.elem[2] = p_timeID;
                                this.elem[3] = p_objID;
                            }

                            public part0(): number {
                                return this.elem[0];
                            }

                            public part1(): number {
                                return this.elem[1];
                            }

                            public part2(): number {
                                return this.elem[2];
                            }

                            public part3(): number {
                                return this.elem[3];
                            }

                            public part(i: number): number {
                                if (i >= 0 && i < KContentKey.ELEM_SIZE) {
                                    return this.elem[i];
                                } else {
                                    return null;
                                }
                            }

                            public static createGlobal(p_prefixID: number): org.kevoree.modeling.api.data.cache.KContentKey {
                                return new org.kevoree.modeling.api.data.cache.KContentKey(p_prefixID, null, null, null);
                            }

                            public static createGlobalUniverseTree(): org.kevoree.modeling.api.data.cache.KContentKey {
                                return new org.kevoree.modeling.api.data.cache.KContentKey(KContentKey.GLOBAL_SEGMENT_UNIVERSE_TREE, null, null, null);
                            }

                            public static createUniverseTree(p_objectID: number): org.kevoree.modeling.api.data.cache.KContentKey {
                                return new org.kevoree.modeling.api.data.cache.KContentKey(KContentKey.GLOBAL_SEGMENT_DATA, null, null, p_objectID);
                            }

                            public static createRootUniverseTree(): org.kevoree.modeling.api.data.cache.KContentKey {
                                return new org.kevoree.modeling.api.data.cache.KContentKey(KContentKey.GLOBAL_SEGMENT_ROOT, null, null, null);
                            }

                            public static createRootTimeTree(universeID: number): org.kevoree.modeling.api.data.cache.KContentKey {
                                return new org.kevoree.modeling.api.data.cache.KContentKey(KContentKey.GLOBAL_SEGMENT_ROOT, universeID, null, null);
                            }

                            public static createTimeTree(p_universeID: number, p_objectID: number): org.kevoree.modeling.api.data.cache.KContentKey {
                                return new org.kevoree.modeling.api.data.cache.KContentKey(KContentKey.GLOBAL_SEGMENT_DATA, p_universeID, null, p_objectID);
                            }

                            public static createObject(p_universeID: number, p_quantaID: number, p_objectID: number): org.kevoree.modeling.api.data.cache.KContentKey {
                                return new org.kevoree.modeling.api.data.cache.KContentKey(KContentKey.GLOBAL_SEGMENT_DATA, p_universeID, p_quantaID, p_objectID);
                            }

                            public static createLastPrefix(): org.kevoree.modeling.api.data.cache.KContentKey {
                                return new org.kevoree.modeling.api.data.cache.KContentKey(KContentKey.GLOBAL_SEGMENT_PREFIX, null, null, null);
                            }

                            public static createLastObjectIndexFromPrefix(prefix: number): org.kevoree.modeling.api.data.cache.KContentKey {
                                return new org.kevoree.modeling.api.data.cache.KContentKey(KContentKey.GLOBAL_SEGMENT_PREFIX, KContentKey.GLOBAL_SUB_SEGMENT_PREFIX_OBJ, null, java.lang.Long.parseLong(prefix.toString()));
                            }

                            public static createLastUniverseIndexFromPrefix(prefix: number): org.kevoree.modeling.api.data.cache.KContentKey {
                                return new org.kevoree.modeling.api.data.cache.KContentKey(KContentKey.GLOBAL_SEGMENT_PREFIX, KContentKey.GLOBAL_SUB_SEGMENT_PREFIX_UNI, null, java.lang.Long.parseLong(prefix.toString()));
                            }

                            public static create(payload: string): org.kevoree.modeling.api.data.cache.KContentKey {
                                if (payload == null || payload.length == 0) {
                                    return null;
                                } else {
                                    var temp: number[] = new Array();
                                    var maxRead: number = payload.length;
                                    var indexStartElem: number = -1;
                                    var indexElem: number = 0;
                                    for (var i: number = 0; i < maxRead; i++) {
                                        if (payload.charAt(i) == KContentKey.KEY_SEP) {
                                            if (indexStartElem != -1) {
                                                try {
                                                    temp[indexElem] = java.lang.Long.parseLong(payload.substring(indexStartElem, i));
                                                } catch ($ex$) {
                                                    if ($ex$ instanceof java.lang.Exception) {
                                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                        e.printStackTrace();
                                                    }
                                                 }
                                            }
                                            indexStartElem = -1;
                                            indexElem = indexElem + 1;
                                        } else {
                                            if (indexStartElem == -1) {
                                                indexStartElem = i;
                                            }
                                        }
                                    }
                                    if (indexStartElem != -1) {
                                        try {
                                            temp[indexElem] = java.lang.Long.parseLong(payload.substring(indexStartElem, maxRead));
                                        } catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                e.printStackTrace();
                                            }
                                         }
                                    }
                                    return new org.kevoree.modeling.api.data.cache.KContentKey(temp[0], temp[1], temp[2], temp[3]);
                                }
                            }

                            public toString(): string {
                                var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                                for (var i: number = 0; i < KContentKey.ELEM_SIZE; i++) {
                                    if (i != 0) {
                                        buffer.append(KContentKey.KEY_SEP);
                                    }
                                    if (this.elem[i] != null) {
                                        buffer.append(this.elem[i]);
                                    }
                                }
                                return buffer.toString();
                            }

                        }

                        export class MultiLayeredMemoryCache implements org.kevoree.modeling.api.data.cache.KCache {

                            public static DEBUG: boolean = false;
                            private _nestedLayers: java.util.HashMap<number, org.kevoree.modeling.api.data.cache.KCacheLayer> = new java.util.HashMap<number, org.kevoree.modeling.api.data.cache.KCacheLayer>();
                            public get(key: org.kevoree.modeling.api.data.cache.KContentKey): org.kevoree.modeling.api.data.cache.KCacheObject {
                                if (key == null) {
                                    if (MultiLayeredMemoryCache.DEBUG) {
                                        System.out.println("KMF_DEBUG_CACHE_GET:NULL->NULL)");
                                    }
                                    return null;
                                } else {
                                    var nextLayer: org.kevoree.modeling.api.data.cache.KCacheLayer = this._nestedLayers.get(key.part(0));
                                    if (nextLayer != null) {
                                        var resolved: org.kevoree.modeling.api.data.cache.KCacheObject = nextLayer.resolve(key, 1);
                                        if (MultiLayeredMemoryCache.DEBUG) {
                                            System.out.println("KMF_DEBUG_CACHE_GET:" + key + "->" + resolved + ")");
                                        }
                                        return resolved;
                                    } else {
                                        if (MultiLayeredMemoryCache.DEBUG) {
                                            System.out.println("KMF_DEBUG_CACHE_GET:" + key + "->NULL)");
                                        }
                                        return null;
                                    }
                                }
                            }

                            public put(key: org.kevoree.modeling.api.data.cache.KContentKey, payload: org.kevoree.modeling.api.data.cache.KCacheObject): void {
                                if (key == null) {
                                    if (MultiLayeredMemoryCache.DEBUG) {
                                        System.out.println("KMF_DEBUG_CACHE_PUT:NULL->" + payload + ")");
                                    }
                                } else {
                                    var nextLayer: org.kevoree.modeling.api.data.cache.KCacheLayer = this._nestedLayers.get(key.part(0));
                                    if (nextLayer == null) {
                                        nextLayer = new org.kevoree.modeling.api.data.cache.KCacheLayer();
                                        this._nestedLayers.put(key.part(0), nextLayer);
                                    }
                                    nextLayer.insert(key, 1, payload);
                                    if (MultiLayeredMemoryCache.DEBUG) {
                                        System.out.println("KMF_DEBUG_CACHE_PUT:" + key + "->" + payload + ")");
                                    }
                                }
                            }

                            public dirties(): org.kevoree.modeling.api.data.cache.KCacheDirty[] {
                                var result: java.util.List<org.kevoree.modeling.api.data.cache.KCacheDirty> = new java.util.ArrayList<org.kevoree.modeling.api.data.cache.KCacheDirty>();
                                var L0_KEYS: number[] = this._nestedLayers.keySet().toArray(new Array());
                                for (var i: number = 0; i < L0_KEYS.length; i++) {
                                    var layer: org.kevoree.modeling.api.data.cache.KCacheLayer = this._nestedLayers.get(L0_KEYS[i]);
                                    if (layer != null) {
                                        var prefixKey: number[] = new Array();
                                        prefixKey[0] = L0_KEYS[i];
                                        layer.dirties(result, prefixKey, 1);
                                    }
                                }
                                if (MultiLayeredMemoryCache.DEBUG) {
                                    System.out.println("KMF_DEBUG_CACHE_DIRTIES:" + result.size());
                                }
                                return result.toArray(new Array());
                            }

                            public clearDataSegment(): void {
                                this._nestedLayers.remove(org.kevoree.modeling.api.data.cache.KContentKey.GLOBAL_SEGMENT_DATA);
                            }

                        }

                    }
                    export module cdn {
                        export interface AtomicOperation {

                            operationKey(): number;

                            mutate(previous: string): string;

                        }

                        export class AtomicOperationFactory {

                            public static PREFIX_MUTATE_OPERATION: number = 0;
                            public static getMutatePrefixOperation(): org.kevoree.modeling.api.data.cdn.AtomicOperation {
                                return {operationKey:function(){
                                    return AtomicOperationFactory.PREFIX_MUTATE_OPERATION;
}, mutate:function(previous: string){
                                    try {
                                        var previousPrefix: number;
                                        if (previous != null) {
                                            previousPrefix = java.lang.Short.parseShort(previous);
                                        } else {
                                            previousPrefix = java.lang.Short.parseShort("0");
                                        }
                                        if (previousPrefix == java.lang.Short.MAX_VALUE) {
                                            return "" + java.lang.Short.MIN_VALUE;
                                        } else {
                                            return "" + (previousPrefix + 1);
                                        }
                                    } catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                            e.printStackTrace();
                                            return "" + java.lang.Short.MIN_VALUE;
                                        }
                                     }
}                                };
                            }

                            public static getOperationWithKey(key: number): org.kevoree.modeling.api.data.cdn.AtomicOperation {
                                switch (key) {
                                    case AtomicOperationFactory.PREFIX_MUTATE_OPERATION: 
                                    return org.kevoree.modeling.api.data.cdn.AtomicOperationFactory.getMutatePrefixOperation();
                                }
                                return null;
                            }

                        }

                        export interface KContentDeliveryDriver {

                            atomicGetMutate(key: org.kevoree.modeling.api.data.cache.KContentKey, operation: org.kevoree.modeling.api.data.cdn.AtomicOperation, callback: (p : string, p1 : java.lang.Throwable) => void): void;

                            get(keys: org.kevoree.modeling.api.data.cache.KContentKey[], callback: (p : string[], p1 : java.lang.Throwable) => void): void;

                            put(request: org.kevoree.modeling.api.data.cdn.KContentPutRequest, error: (p : java.lang.Throwable) => void): void;

                            remove(keys: string[], error: (p : java.lang.Throwable) => void): void;

                            connect(callback: (p : java.lang.Throwable) => void): void;

                            close(callback: (p : java.lang.Throwable) => void): void;

                            registerListener(origin: any, listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void, scope: any): void;

                            unregister(listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void): void;

                            send(msgs: org.kevoree.modeling.api.msg.KEventMessage[]): void;

                            setManager(manager: org.kevoree.modeling.api.data.manager.KDataManager): void;

                        }

                        export class KContentPutRequest {

                            private _content: any[][];
                            private static KEY_INDEX: number = 0;
                            private static CONTENT_INDEX: number = 1;
                            private static SIZE_INDEX: number = 2;
                            private _size: number = 0;
                            constructor(requestSize: number) {
                                this._content = new Array();
                            }

                            public put(p_key: org.kevoree.modeling.api.data.cache.KContentKey, p_payload: string): void {
                                var newLine: any[] = new Array();
                                newLine[KContentPutRequest.KEY_INDEX] = p_key;
                                newLine[KContentPutRequest.CONTENT_INDEX] = p_payload;
                                this._content[this._size] = newLine;
                                this._size = this._size + 1;
                            }

                            public getKey(index: number): org.kevoree.modeling.api.data.cache.KContentKey {
                                if (index < this._content.length) {
                                    return <org.kevoree.modeling.api.data.cache.KContentKey>this._content[index][0];
                                } else {
                                    return null;
                                }
                            }

                            public getContent(index: number): string {
                                if (index < this._content.length) {
                                    return <string>this._content[index][1];
                                } else {
                                    return null;
                                }
                            }

                            public size(): number {
                                return this._size;
                            }

                        }

                        export class MemoryKContentDeliveryDriver implements org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver {

                            private backend: java.util.HashMap<string, string> = new java.util.HashMap<string, string>();
                            public static DEBUG: boolean = false;
                            private localEventListeners: org.kevoree.modeling.api.util.LocalEventListeners = new org.kevoree.modeling.api.util.LocalEventListeners();
                            public atomicGetMutate(key: org.kevoree.modeling.api.data.cache.KContentKey, operation: org.kevoree.modeling.api.data.cdn.AtomicOperation, callback: (p : string, p1 : java.lang.Throwable) => void): void {
                                var result: string = this.backend.get(key.toString());
                                var mutated: string = operation.mutate(result);
                                if (MemoryKContentDeliveryDriver.DEBUG) {
                                    System.out.println("ATOMIC GET " + key + "->" + result);
                                    System.out.println("ATOMIC PUT " + key + "->" + mutated);
                                }
                                this.backend.put(key.toString(), mutated);
                                callback(result, null);
                            }

                            public get(keys: org.kevoree.modeling.api.data.cache.KContentKey[], callback: (p : string[], p1 : java.lang.Throwable) => void): void {
                                var values: string[] = new Array();
                                for (var i: number = 0; i < keys.length; i++) {
                                    values[i] = this.backend.get(keys[i].toString());
                                    if (MemoryKContentDeliveryDriver.DEBUG) {
                                        System.out.println("GET " + keys[i] + "->" + values[i]);
                                    }
                                }
                                if (callback != null) {
                                    callback(values, null);
                                }
                            }

                            public put(p_request: org.kevoree.modeling.api.data.cdn.KContentPutRequest, p_callback: (p : java.lang.Throwable) => void): void {
                                for (var i: number = 0; i < p_request.size(); i++) {
                                    this.backend.put(p_request.getKey(i).toString(), p_request.getContent(i));
                                    if (MemoryKContentDeliveryDriver.DEBUG) {
                                        System.out.println("PUT " + p_request.getKey(i).toString() + "->" + p_request.getContent(i));
                                    }
                                }
                                if (p_callback != null) {
                                    p_callback(null);
                                }
                            }

                            public remove(keys: string[], callback: (p : java.lang.Throwable) => void): void {
                                for (var i: number = 0; i < keys.length; i++) {
                                    this.backend.remove(keys[i]);
                                }
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
                                this.localEventListeners.clear();
                                this.backend.clear();
                            }

                            public registerListener(p_origin: any, p_listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void, p_scope: any): void {
                                this.localEventListeners.registerListener(p_origin, p_listener, p_scope);
                            }

                            public unregister(p_listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void): void {
                                this.localEventListeners.unregister(p_listener);
                            }

                            public send(msgs: org.kevoree.modeling.api.msg.KEventMessage[]): void {
                            }

                            public setManager(manager: org.kevoree.modeling.api.data.manager.KDataManager): void {
                            }

                        }

                    }
                    export module manager {
                        export class AccessMode {

                            public static READ: AccessMode = new AccessMode();
                            public static WRITE: AccessMode = new AccessMode();
                            public static DELETE: AccessMode = new AccessMode();
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
                        }

                        export class DefaultKDataManager implements org.kevoree.modeling.api.data.manager.KDataManager {

                            private _db: org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
                            private _operationManager: org.kevoree.modeling.api.util.KOperationManager;
                            private _scheduler: org.kevoree.modeling.api.KScheduler;
                            private _model: org.kevoree.modeling.api.KModel<any>;
                            private _objectKeyCalculator: org.kevoree.modeling.api.data.manager.KeyCalculator = null;
                            private _universeKeyCalculator: org.kevoree.modeling.api.data.manager.KeyCalculator = null;
                            private isConnected: boolean = false;
                            private static OUT_OF_CACHE_MESSAGE: string = "KMF Error: your object is out of cache, you probably kept an old reference. Please reload it with a lookup";
                            private static UNIVERSE_NOT_CONNECTED_ERROR: string = "Please connect your model prior to create a universe or an object";
                            private UNIVERSE_INDEX: number = 0;
                            private OBJ_INDEX: number = 1;
                            private GLO_TREE_INDEX: number = 2;
                            private _cache: org.kevoree.modeling.api.data.cache.MultiLayeredMemoryCache = new org.kevoree.modeling.api.data.cache.MultiLayeredMemoryCache();
                            constructor(model: org.kevoree.modeling.api.KModel<any>) {
                                this._db = new org.kevoree.modeling.api.data.cdn.MemoryKContentDeliveryDriver();
                                this._operationManager = new org.kevoree.modeling.api.util.DefaultOperationManager(this);
                                this._scheduler = new org.kevoree.modeling.api.scheduler.DirectScheduler();
                                this._model = model;
                            }

                            public model(): org.kevoree.modeling.api.KModel<any> {
                                return this._model;
                            }

                            public close(callback: (p : java.lang.Throwable) => void): void {
                                this.isConnected = false;
                                if (this._db != null) {
                                    this._db.close(callback);
                                } else {
                                    callback(null);
                                }
                            }

                            public nextUniverseKey(): number {
                                if (this._universeKeyCalculator == null) {
                                    throw new java.lang.RuntimeException(DefaultKDataManager.UNIVERSE_NOT_CONNECTED_ERROR);
                                }
                                return this._universeKeyCalculator.nextKey();
                            }

                            public nextObjectKey(): number {
                                if (this._objectKeyCalculator == null) {
                                    throw new java.lang.RuntimeException(DefaultKDataManager.UNIVERSE_NOT_CONNECTED_ERROR);
                                }
                                return this._objectKeyCalculator.nextKey();
                            }

                            public initUniverse(p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>, p_parent: org.kevoree.modeling.api.KUniverse<any, any, any>): void {
                                var key: org.kevoree.modeling.api.data.cache.KContentKey = org.kevoree.modeling.api.data.cache.KContentKey.createGlobalUniverseTree();
                                var cachedTree: org.kevoree.modeling.api.rbtree.LongRBTree = <org.kevoree.modeling.api.rbtree.LongRBTree>this._cache.get(key);
                                if (cachedTree != null && cachedTree.lookup(p_universe.key()) == null) {
                                    if (p_parent == null) {
                                        cachedTree.insert(p_universe.key(), p_universe.key());
                                    } else {
                                        cachedTree.insert(p_universe.key(), p_parent.key());
                                    }
                                }
                            }

                            public parentUniverseKey(currentUniverseKey: number): number {
                                var key: org.kevoree.modeling.api.data.cache.KContentKey = org.kevoree.modeling.api.data.cache.KContentKey.createGlobalUniverseTree();
                                var cachedTree: org.kevoree.modeling.api.rbtree.LongRBTree = <org.kevoree.modeling.api.rbtree.LongRBTree>this._cache.get(key);
                                if (cachedTree != null) {
                                    return cachedTree.lookup(currentUniverseKey);
                                } else {
                                    return null;
                                }
                            }

                            public descendantsUniverseKeys(currentUniverseKey: number): number[] {
                                var key: org.kevoree.modeling.api.data.cache.KContentKey = org.kevoree.modeling.api.data.cache.KContentKey.createGlobalUniverseTree();
                                var cachedTree: org.kevoree.modeling.api.rbtree.LongRBTree = <org.kevoree.modeling.api.rbtree.LongRBTree>this._cache.get(key);
                                if (cachedTree != null) {
                                    var nextElems: java.util.List<number> = new java.util.ArrayList<number>();
                                    var elem: org.kevoree.modeling.api.rbtree.LongTreeNode = cachedTree.first();
                                    while (elem != null){
                                        if (elem.value == currentUniverseKey && elem.key != currentUniverseKey) {
                                            nextElems.add(elem.key);
                                        }
                                        elem = elem.next();
                                    }
                                    return nextElems.toArray(new Array());
                                } else {
                                    return new Array();
                                }
                            }

                            public save(callback: (p : java.lang.Throwable) => void): void {
                                var dirtiesEntries: org.kevoree.modeling.api.data.cache.KCacheDirty[] = this._cache.dirties();
                                var request: org.kevoree.modeling.api.data.cdn.KContentPutRequest = new org.kevoree.modeling.api.data.cdn.KContentPutRequest(dirtiesEntries.length + 2);
                                var nbCacheEntry: number = 0;
                                for (var i: number = 0; i < dirtiesEntries.length; i++) {
                                    if (dirtiesEntries[i].object instanceof org.kevoree.modeling.api.data.cache.KCacheEntry) {
                                        nbCacheEntry = nbCacheEntry + 1;
                                    }
                                }
                                var notificationMessages: org.kevoree.modeling.api.msg.KEventMessage[] = new Array();
                                var nbInsertedMsg: number = 0;
                                for (var i: number = 0; i < dirtiesEntries.length; i++) {
                                    var cachedObject: org.kevoree.modeling.api.data.cache.KCacheObject = dirtiesEntries[i].object;
                                    if (dirtiesEntries[i].object instanceof org.kevoree.modeling.api.data.cache.KCacheEntry) {
                                        var newMessage: org.kevoree.modeling.api.msg.KEventMessage = new org.kevoree.modeling.api.msg.KEventMessage();
                                        newMessage.meta = (<org.kevoree.modeling.api.data.cache.KCacheEntry>dirtiesEntries[i].object).modifiedIndexes();
                                        newMessage.key = dirtiesEntries[i].key;
                                        notificationMessages[nbInsertedMsg] = newMessage;
                                        nbInsertedMsg = nbInsertedMsg + 1;
                                    }
                                    cachedObject.setClean();
                                    request.put(dirtiesEntries[i].key, cachedObject.serialize());
                                }
                                request.put(org.kevoree.modeling.api.data.cache.KContentKey.createLastObjectIndexFromPrefix(this._objectKeyCalculator.prefix()), "" + this._objectKeyCalculator.lastComputedIndex());
                                request.put(org.kevoree.modeling.api.data.cache.KContentKey.createLastUniverseIndexFromPrefix(this._universeKeyCalculator.prefix()), "" + this._universeKeyCalculator.lastComputedIndex());
                                this._db.put(request,  (throwable : java.lang.Throwable) => {
                                    if (throwable != null) {
                                        this._db.send(notificationMessages);
                                    }
                                    callback(throwable);
                                });
                            }

                            public initKObject(obj: org.kevoree.modeling.api.KObject, originView: org.kevoree.modeling.api.KView): void {
                                var cacheEntry: org.kevoree.modeling.api.data.cache.KCacheEntry = new org.kevoree.modeling.api.data.cache.KCacheEntry();
                                cacheEntry.raw = new Array();
                                cacheEntry._dirty = true;
                                cacheEntry.metaClass = obj.metaClass();
                                cacheEntry.universeTree = obj.universeTree();
                                var timeTree: org.kevoree.modeling.api.rbtree.IndexRBTree = new org.kevoree.modeling.api.rbtree.IndexRBTree();
                                timeTree.insert(obj.now());
                                this._cache.put(org.kevoree.modeling.api.data.cache.KContentKey.createTimeTree(obj.universe().key(), obj.uuid()), timeTree);
                                this._cache.put(org.kevoree.modeling.api.data.cache.KContentKey.createUniverseTree(obj.uuid()), cacheEntry.universeTree);
                                this._cache.put(org.kevoree.modeling.api.data.cache.KContentKey.createObject(obj.universe().key(), obj.now(), obj.uuid()), cacheEntry);
                            }

                            public connect(connectCallback: (p : java.lang.Throwable) => void): void {
                                if (this.isConnected) {
                                    if (connectCallback != null) {
                                        connectCallback(null);
                                    }
                                }
                                if (this._db == null) {
                                    if (connectCallback != null) {
                                        connectCallback(new java.lang.Exception("Please attach a KDataBase AND a KBroker first !"));
                                    }
                                } else {
                                    this._db.connect( (throwable : java.lang.Throwable) => {
                                        if (throwable == null) {
                                            this._db.atomicGetMutate(org.kevoree.modeling.api.data.cache.KContentKey.createLastPrefix(), org.kevoree.modeling.api.data.cdn.AtomicOperationFactory.getMutatePrefixOperation(),  (payloadPrefix : string, error : java.lang.Throwable) => {
                                                if (error != null) {
                                                    if (connectCallback != null) {
                                                        connectCallback(error);
                                                    }
                                                } else {
                                                    var cleanedPrefixPayload: string = payloadPrefix;
                                                    if (cleanedPrefixPayload == null || cleanedPrefixPayload.equals("")) {
                                                        cleanedPrefixPayload = "0";
                                                    }
                                                    var newPrefix: number;
                                                    try {
                                                        newPrefix = java.lang.Short.parseShort(cleanedPrefixPayload);
                                                    } catch ($ex$) {
                                                        if ($ex$ instanceof java.lang.Exception) {
                                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                            newPrefix = java.lang.Short.parseShort("0");
                                                        }
                                                     }
                                                    var connectionElemKeys: org.kevoree.modeling.api.data.cache.KContentKey[] = new Array();
                                                    connectionElemKeys[this.UNIVERSE_INDEX] = org.kevoree.modeling.api.data.cache.KContentKey.createLastUniverseIndexFromPrefix(newPrefix);
                                                    connectionElemKeys[this.OBJ_INDEX] = org.kevoree.modeling.api.data.cache.KContentKey.createLastObjectIndexFromPrefix(newPrefix);
                                                    connectionElemKeys[this.GLO_TREE_INDEX] = org.kevoree.modeling.api.data.cache.KContentKey.createGlobalUniverseTree();
                                                    var finalNewPrefix: number = newPrefix;
                                                    this._db.get(connectionElemKeys,  (strings : string[], errorL2 : java.lang.Throwable) => {
                                                        if (errorL2 != null) {
                                                            if (connectCallback != null) {
                                                                connectCallback(errorL2);
                                                            }
                                                        } else {
                                                            if (strings.length == 3) {
                                                                var detected: java.lang.Exception = null;
                                                                try {
                                                                    var uniIndexPayload: string = strings[this.UNIVERSE_INDEX];
                                                                    if (uniIndexPayload == null || uniIndexPayload.equals("")) {
                                                                        uniIndexPayload = "0";
                                                                    }
                                                                    var objIndexPayload: string = strings[this.OBJ_INDEX];
                                                                    if (objIndexPayload == null || objIndexPayload.equals("")) {
                                                                        objIndexPayload = "0";
                                                                    }
                                                                    var globalUniverseTreePayload: string = strings[this.GLO_TREE_INDEX];
                                                                    var globalUniverseTree: org.kevoree.modeling.api.rbtree.LongRBTree = new org.kevoree.modeling.api.rbtree.LongRBTree();
                                                                    if (globalUniverseTreePayload != null) {
                                                                        try {
                                                                            globalUniverseTree.unserialize(org.kevoree.modeling.api.data.cache.KContentKey.createGlobalUniverseTree(), globalUniverseTreePayload, this.model().metaModel());
                                                                        } catch ($ex$) {
                                                                            if ($ex$ instanceof java.lang.Exception) {
                                                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                                e.printStackTrace();
                                                                            }
                                                                         }
                                                                    }
                                                                    this._cache.put(org.kevoree.modeling.api.data.cache.KContentKey.createGlobalUniverseTree(), globalUniverseTree);
                                                                    var newUniIndex: number = java.lang.Long.parseLong(uniIndexPayload);
                                                                    var newObjIndex: number = java.lang.Long.parseLong(objIndexPayload);
                                                                    this._universeKeyCalculator = new org.kevoree.modeling.api.data.manager.KeyCalculator(finalNewPrefix, newUniIndex);
                                                                    this._objectKeyCalculator = new org.kevoree.modeling.api.data.manager.KeyCalculator(finalNewPrefix, newObjIndex);
                                                                    this.isConnected = true;
                                                                } catch ($ex$) {
                                                                    if ($ex$ instanceof java.lang.Exception) {
                                                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                        detected = e;
                                                                    }
                                                                 }
                                                                if (connectCallback != null) {
                                                                    connectCallback(detected);
                                                                }
                                                            } else {
                                                                if (connectCallback != null) {
                                                                    connectCallback(new java.lang.Exception("Error while connecting the KDataStore..."));
                                                                }
                                                            }
                                                        }
                                                    });
                                                }
                                            });
                                        } else {
                                            connectCallback(throwable);
                                        }
                                    });
                                }
                            }

                            public entry(origin: org.kevoree.modeling.api.KObject, accessMode: org.kevoree.modeling.api.data.manager.AccessMode): org.kevoree.modeling.api.data.cache.KCacheEntry {
                                var dimensionTree: org.kevoree.modeling.api.rbtree.LongRBTree = origin.universeTree();
                                var resolvedUniverse: number = this.internal_resolve_universe(dimensionTree, origin.now(), origin.view().universe().key());
                                var timeTree: org.kevoree.modeling.api.rbtree.IndexRBTree = <org.kevoree.modeling.api.rbtree.IndexRBTree>this._cache.get(org.kevoree.modeling.api.data.cache.KContentKey.createTimeTree(resolvedUniverse, origin.uuid()));
                                if (timeTree == null) {
                                    throw new java.lang.RuntimeException(DefaultKDataManager.OUT_OF_CACHE_MESSAGE + " : TimeTree not found for " + org.kevoree.modeling.api.data.cache.KContentKey.createTimeTree(resolvedUniverse, origin.uuid()) + " from " + origin.universe().key() + "/" + resolvedUniverse);
                                }
                                var resolvedNode: org.kevoree.modeling.api.rbtree.TreeNode = timeTree.previousOrEqual(origin.now());
                                var resolvedTime: number;
                                if (resolvedNode != null) {
                                    resolvedTime = resolvedNode.getKey();
                                } else {
                                    System.err.println(DefaultKDataManager.OUT_OF_CACHE_MESSAGE + " Time not resolved " + origin.now());
                                    return null;
                                }
                                var needTimeCopy: boolean = accessMode.equals(org.kevoree.modeling.api.data.manager.AccessMode.WRITE) && (resolvedTime != origin.now());
                                var needUniverseCopy: boolean = accessMode.equals(org.kevoree.modeling.api.data.manager.AccessMode.WRITE) && (resolvedUniverse != origin.universe().key());
                                var entry: org.kevoree.modeling.api.data.cache.KCacheEntry = <org.kevoree.modeling.api.data.cache.KCacheEntry>this._cache.get(org.kevoree.modeling.api.data.cache.KContentKey.createObject(resolvedUniverse, resolvedTime, origin.uuid()));
                                if (entry == null) {
                                    System.err.println(DefaultKDataManager.OUT_OF_CACHE_MESSAGE);
                                    return null;
                                }
                                var payload: any[] = entry.raw;
                                if (accessMode.equals(org.kevoree.modeling.api.data.manager.AccessMode.DELETE)) {
                                    timeTree.delete(origin.now());
                                    var clonedEntry: org.kevoree.modeling.api.data.cache.KCacheEntry = entry.clone();
                                    entry.raw = null;
                                    return clonedEntry;
                                }
                                if (payload == null) {
                                    return null;
                                } else {
                                    if (!needTimeCopy && !needUniverseCopy) {
                                        if (accessMode.equals(org.kevoree.modeling.api.data.manager.AccessMode.WRITE)) {
                                            entry._dirty = true;
                                        }
                                        return entry;
                                    } else {
                                        var clonedEntry: org.kevoree.modeling.api.data.cache.KCacheEntry = entry.clone();
                                        clonedEntry._dirty = true;
                                        if (!needUniverseCopy) {
                                            timeTree.insert(origin.now());
                                        } else {
                                            var newTemporalTree: org.kevoree.modeling.api.rbtree.IndexRBTree = new org.kevoree.modeling.api.rbtree.IndexRBTree();
                                            newTemporalTree.insert(origin.now());
                                            this._cache.put(org.kevoree.modeling.api.data.cache.KContentKey.createTimeTree(origin.universe().key(), origin.uuid()), newTemporalTree);
                                            dimensionTree.insert(origin.universe().key(), origin.now());
                                        }
                                        this._cache.put(org.kevoree.modeling.api.data.cache.KContentKey.createObject(origin.universe().key(), origin.now(), origin.uuid()), clonedEntry);
                                        return clonedEntry;
                                    }
                                }
                            }

                            public discard(p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p : java.lang.Throwable) => void): void {
                                this._cache.clearDataSegment();
                                if (callback != null) {
                                    callback(null);
                                }
                            }

                            public delete(p_universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p : java.lang.Throwable) => void): void {
                                throw new java.lang.RuntimeException("Not implemented yet !");
                            }

                            public lookup(originView: org.kevoree.modeling.api.KView, key: number, callback: (p : org.kevoree.modeling.api.KObject) => void): void {
                                var keys: number[] = new Array();
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

                            public lookupAll(originView: org.kevoree.modeling.api.KView, keys: number[], callback: (p : org.kevoree.modeling.api.KObject[]) => void): void {
                                this._scheduler.dispatch(new org.kevoree.modeling.api.data.manager.LookupAllRunnable(originView, keys, callback, this));
                            }

                            public cdn(): org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver {
                                return this._db;
                            }

                            public setContentDeliveryDriver(p_dataBase: org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver): void {
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

                            public internal_resolve_universe_time(originView: org.kevoree.modeling.api.KView, uuids: number[], callback: (p : org.kevoree.modeling.api.data.manager.ResolutionResult[]) => void): void {
                                var tempResult: org.kevoree.modeling.api.data.manager.ResolutionResult[] = new Array();
                                var toLoadIndexUniverse: java.util.List<number> = null;
                                var toLoadUniverseTrees: java.util.List<org.kevoree.modeling.api.data.cache.KContentKey> = null;
                                for (var i: number = 0; i < uuids.length; i++) {
                                    if (tempResult[i] == null) {
                                        tempResult[i] = new org.kevoree.modeling.api.data.manager.ResolutionResult();
                                    }
                                    var universeObjectTreeKey: org.kevoree.modeling.api.data.cache.KContentKey = org.kevoree.modeling.api.data.cache.KContentKey.createUniverseTree(uuids[i]);
                                    var cachedUniverseTree: org.kevoree.modeling.api.rbtree.LongRBTree = <org.kevoree.modeling.api.rbtree.LongRBTree>this._cache.get(universeObjectTreeKey);
                                    if (cachedUniverseTree != null) {
                                        tempResult[i].universeTree = cachedUniverseTree;
                                    } else {
                                        if (toLoadIndexUniverse == null) {
                                            toLoadIndexUniverse = new java.util.ArrayList<number>();
                                        }
                                        if (toLoadUniverseTrees == null) {
                                            toLoadUniverseTrees = new java.util.ArrayList<org.kevoree.modeling.api.data.cache.KContentKey>();
                                        }
                                        toLoadIndexUniverse.add(i);
                                        toLoadUniverseTrees.add(universeObjectTreeKey);
                                    }
                                }
                                if (toLoadUniverseTrees != null) {
                                    var toLoadKeys: org.kevoree.modeling.api.data.cache.KContentKey[] = toLoadUniverseTrees.toArray(new Array());
                                    var finalToLoadIndexUniverse: java.util.List<number> = toLoadIndexUniverse;
                                    var finalToLoadUniverseTrees: java.util.List<org.kevoree.modeling.api.data.cache.KContentKey> = toLoadUniverseTrees;
                                    this._db.get(toLoadKeys,  (resolvedContents : string[], error : java.lang.Throwable) => {
                                        if (error != null) {
                                            error.printStackTrace();
                                            callback(tempResult);
                                        } else {
                                            for (var i: number = 0; i < resolvedContents.length; i++) {
                                                var newLoadedTree: org.kevoree.modeling.api.rbtree.LongRBTree = new org.kevoree.modeling.api.rbtree.LongRBTree();
                                                if (resolvedContents[i] != null) {
                                                    try {
                                                        newLoadedTree.unserialize(finalToLoadUniverseTrees.get(i), resolvedContents[i], this.model().metaModel());
                                                    } catch ($ex$) {
                                                        if ($ex$ instanceof java.lang.Exception) {
                                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                            e.printStackTrace();
                                                        }
                                                     }
                                                }
                                                tempResult[finalToLoadIndexUniverse.get(i)].universeTree = newLoadedTree;
                                                this._cache.put(finalToLoadUniverseTrees.get(i), newLoadedTree);
                                            }
                                            this.internal_resolve_times(originView, uuids, tempResult, callback);
                                        }
                                    });
                                } else {
                                    this.internal_resolve_times(originView, uuids, tempResult, callback);
                                }
                            }

                            private internal_resolve_times(originView: org.kevoree.modeling.api.KView, uuids: number[], tempResult: org.kevoree.modeling.api.data.manager.ResolutionResult[], callback: (p : org.kevoree.modeling.api.data.manager.ResolutionResult[]) => void): void {
                                var toLoadIndexTimes: java.util.List<number> = null;
                                var toLoadTimeTrees: java.util.List<org.kevoree.modeling.api.data.cache.KContentKey> = null;
                                for (var i: number = 0; i < uuids.length; i++) {
                                    if (tempResult[i].universeTree != null) {
                                        var closestUniverse: number = this.internal_resolve_universe(tempResult[i].universeTree, originView.now(), originView.universe().key());
                                        if (closestUniverse != null) {
                                            tempResult[i].resolvedUniverse = closestUniverse;
                                            var timeObjectTreeKey: org.kevoree.modeling.api.data.cache.KContentKey = org.kevoree.modeling.api.data.cache.KContentKey.createTimeTree(closestUniverse, uuids[i]);
                                            var cachedIndexTree: org.kevoree.modeling.api.rbtree.IndexRBTree = <org.kevoree.modeling.api.rbtree.IndexRBTree>this._cache.get(timeObjectTreeKey);
                                            if (cachedIndexTree != null) {
                                                tempResult[i].timeTree = cachedIndexTree;
                                                var resolvedNode: org.kevoree.modeling.api.rbtree.TreeNode = cachedIndexTree.previousOrEqual(originView.now());
                                                if (resolvedNode != null) {
                                                    tempResult[i].resolvedQuanta = resolvedNode.getKey();
                                                }
                                            } else {
                                                if (toLoadIndexTimes == null) {
                                                    toLoadIndexTimes = new java.util.ArrayList<number>();
                                                }
                                                if (toLoadTimeTrees == null) {
                                                    toLoadTimeTrees = new java.util.ArrayList<org.kevoree.modeling.api.data.cache.KContentKey>();
                                                }
                                                toLoadIndexTimes.add(i);
                                                toLoadTimeTrees.add(timeObjectTreeKey);
                                            }
                                        } else {
                                            System.err.println("KMF ERROR on object:" + uuids[i]);
                                        }
                                    }
                                }
                                if (toLoadTimeTrees != null) {
                                    var toLoadKeys: org.kevoree.modeling.api.data.cache.KContentKey[] = toLoadTimeTrees.toArray(new Array());
                                    var finalToLoadIndexTimes: java.util.List<number> = toLoadIndexTimes;
                                    var finalToLoadTimeTrees: java.util.List<org.kevoree.modeling.api.data.cache.KContentKey> = toLoadTimeTrees;
                                    this._db.get(toLoadKeys,  (resolvedContents : string[], error : java.lang.Throwable) => {
                                        if (error != null) {
                                            error.printStackTrace();
                                            callback(tempResult);
                                        } else {
                                            for (var i: number = 0; i < resolvedContents.length; i++) {
                                                var newLoadedTree: org.kevoree.modeling.api.rbtree.IndexRBTree = new org.kevoree.modeling.api.rbtree.IndexRBTree();
                                                if (resolvedContents[i] != null) {
                                                    try {
                                                        newLoadedTree.unserialize(finalToLoadTimeTrees.get(i), resolvedContents[i], this.model().metaModel());
                                                    } catch ($ex$) {
                                                        if ($ex$ instanceof java.lang.Exception) {
                                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                            e.printStackTrace();
                                                        }
                                                     }
                                                }
                                                var initialIndex: number = finalToLoadIndexTimes.get(i);
                                                tempResult[initialIndex].timeTree = newLoadedTree;
                                                var resolvedNode: org.kevoree.modeling.api.rbtree.TreeNode = newLoadedTree.previousOrEqual(originView.now());
                                                if (resolvedNode != null) {
                                                    tempResult[initialIndex].resolvedQuanta = resolvedNode.getKey();
                                                }
                                                this._cache.put(finalToLoadTimeTrees.get(i), newLoadedTree);
                                            }
                                            callback(tempResult);
                                        }
                                    });
                                } else {
                                    callback(tempResult);
                                }
                            }

                            public internal_root_load(contentKey: org.kevoree.modeling.api.data.cache.KContentKey, callback: (p : org.kevoree.modeling.api.rbtree.LongRBTree) => void): void {
                                var rootUniverseTree: org.kevoree.modeling.api.rbtree.LongRBTree = <org.kevoree.modeling.api.rbtree.LongRBTree>this._cache.get(contentKey);
                                if (rootUniverseTree == null) {
                                    var requestKeys: org.kevoree.modeling.api.data.cache.KContentKey[] = new Array();
                                    requestKeys[0] = contentKey;
                                    this._db.get(requestKeys,  (strings : string[], error : java.lang.Throwable) => {
                                        if (error != null) {
                                            error.printStackTrace();
                                            callback(null);
                                        } else {
                                            var newRootUniverseTree: org.kevoree.modeling.api.rbtree.LongRBTree = new org.kevoree.modeling.api.rbtree.LongRBTree();
                                            try {
                                                newRootUniverseTree.unserialize(contentKey, strings[0], this.model().metaModel());
                                            } catch ($ex$) {
                                                if ($ex$ instanceof java.lang.Exception) {
                                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                    e.printStackTrace();
                                                }
                                             }
                                            this._cache.put(contentKey, newRootUniverseTree);
                                            callback(newRootUniverseTree);
                                        }
                                    });
                                } else {
                                    callback(rootUniverseTree);
                                }
                            }

                            public getRoot(originView: org.kevoree.modeling.api.KView, callback: (p : org.kevoree.modeling.api.KObject) => void): void {
                                var universeTreeRootKey: org.kevoree.modeling.api.data.cache.KContentKey = org.kevoree.modeling.api.data.cache.KContentKey.createRootUniverseTree();
                                this.internal_root_load(universeTreeRootKey,  (longRBTree : org.kevoree.modeling.api.rbtree.LongRBTree) => {
                                    if (longRBTree == null) {
                                        callback(null);
                                    } else {
                                        var closestUniverse: number = this.internal_resolve_universe(longRBTree, originView.now(), originView.universe().key());
                                        if (closestUniverse == null) {
                                            callback(null);
                                        } else {
                                            var universeTreeRootKey: org.kevoree.modeling.api.data.cache.KContentKey = org.kevoree.modeling.api.data.cache.KContentKey.createRootTimeTree(closestUniverse);
                                            this.internal_root_load(universeTreeRootKey,  (longRBTree : org.kevoree.modeling.api.rbtree.LongRBTree) => {
                                                if (longRBTree == null) {
                                                    callback(null);
                                                } else {
                                                    var resolvedNode: org.kevoree.modeling.api.rbtree.LongTreeNode = longRBTree.previousOrEqual(originView.now());
                                                    if (resolvedNode == null) {
                                                        callback(null);
                                                    } else {
                                                        this.lookup(originView, resolvedNode.value, callback);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }

                            public setRoot(newRoot: org.kevoree.modeling.api.KObject, callback: (p : java.lang.Throwable) => void): void {
                                var universeTreeRootKey: org.kevoree.modeling.api.data.cache.KContentKey = org.kevoree.modeling.api.data.cache.KContentKey.createRootUniverseTree();
                                this.internal_root_load(universeTreeRootKey,  (longRBTree : org.kevoree.modeling.api.rbtree.LongRBTree) => {
                                    if (longRBTree == null) {
                                        callback(new java.lang.Exception("KMF ERROR, ROOT TREE CANNOT BE CREATED"));
                                    } else {
                                        var closestUniverse: number = this.internal_resolve_universe(longRBTree, newRoot.now(), newRoot.universe().key());
                                        if (closestUniverse != newRoot.universe().key()) {
                                            longRBTree.insert(newRoot.universe().key(), newRoot.now());
                                            var newTimeTree: org.kevoree.modeling.api.rbtree.LongRBTree = new org.kevoree.modeling.api.rbtree.LongRBTree();
                                            newTimeTree.insert(newRoot.now(), newRoot.uuid());
                                            var universeTreeRootKey: org.kevoree.modeling.api.data.cache.KContentKey = org.kevoree.modeling.api.data.cache.KContentKey.createRootTimeTree(newRoot.universe().key());
                                            this._cache.put(universeTreeRootKey, newTimeTree);
                                            if (callback != null) {
                                                callback(null);
                                            }
                                        } else {
                                            var universeTreeRootKey: org.kevoree.modeling.api.data.cache.KContentKey = org.kevoree.modeling.api.data.cache.KContentKey.createRootTimeTree(closestUniverse);
                                            this.internal_root_load(universeTreeRootKey,  (longRBTree : org.kevoree.modeling.api.rbtree.LongRBTree) => {
                                                if (longRBTree == null) {
                                                    if (callback != null) {
                                                        callback(new java.lang.Exception("KMF ERROR, ROOT TREE CANNOT BE CREATED"));
                                                    }
                                                } else {
                                                    longRBTree.insert(newRoot.now(), newRoot.uuid());
                                                    if (callback != null) {
                                                        callback(null);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }

                            public cache(): org.kevoree.modeling.api.data.cache.KCache {
                                return this._cache;
                            }

                            public reload(keys: org.kevoree.modeling.api.data.cache.KContentKey[]): void {
                                this._db.get(keys,  (strings : string[], error : java.lang.Throwable) => {
                                    if (error != null) {
                                        error.printStackTrace();
                                    } else {
                                        for (var i: number = 0; i < strings.length; i++) {
                                            if (strings[i] != null) {
                                                var cachedObject: org.kevoree.modeling.api.data.cache.KCacheObject = this.internal_load(keys[i], strings[i]);
                                                if (cachedObject != null) {
                                                    this._cache.put(keys[i], cachedObject);
                                                }
                                            }
                                        }
                                    }
                                });
                            }

                            public timeTrees(p_origin: org.kevoree.modeling.api.KObject, start: number, end: number, callback: (p : org.kevoree.modeling.api.rbtree.IndexRBTree[]) => void): void {
                                var uuid: number[] = new Array();
                                uuid[0] = p_origin.uuid();
                                this.internal_resolve_universe_time(p_origin.view(), uuid,  (resolutionResults : org.kevoree.modeling.api.data.manager.ResolutionResult[]) => {
                                    var trees: org.kevoree.modeling.api.rbtree.IndexRBTree[] = new Array();
                                    trees[0] = resolutionResults[0].timeTree;
                                    callback(trees);
                                });
                            }

                            private internal_resolve_universe(universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, timeToResolve: number, currentUniverse: number): number {
                                return currentUniverse;
                            }

                            private internal_load(key: org.kevoree.modeling.api.data.cache.KContentKey, payload: string): org.kevoree.modeling.api.data.cache.KCacheObject {
                                var result: org.kevoree.modeling.api.data.cache.KCacheObject;
                                if (key.part2() == null) {
                                    result = new org.kevoree.modeling.api.rbtree.IndexRBTree();
                                } else {
                                    if (key.part3() != null && key.part1() != null) {
                                        result = new org.kevoree.modeling.api.data.cache.KCacheEntry();
                                    } else {
                                        result = new org.kevoree.modeling.api.rbtree.LongRBTree();
                                    }
                                }
                                try {
                                    result.unserialize(key, payload, this.model().metaModel());
                                    return result;
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                        e.printStackTrace();
                                        return null;
                                    }
                                 }
                            }

                        }

                        export class Index {

                            public static PARENT_INDEX: number = 0;
                            public static INBOUNDS_INDEX: number = 1;
                            public static REF_IN_PARENT_INDEX: number = 2;
                            public static INFER_CHILDREN: number = 3;
                            public static RESERVED_INDEXES: number = 4;
                        }

                        export class JsonRaw {

                            public static SEP: string = "@";
                            public static decode(payload: string, now: number, metaModel: org.kevoree.modeling.api.meta.MetaModel, entry: org.kevoree.modeling.api.data.cache.KCacheEntry): void {
                                if (payload == null) {
                                    return;
                                }
                                var lexer: org.kevoree.modeling.api.json.Lexer = new org.kevoree.modeling.api.json.Lexer(payload);
                                var currentAttributeName: string = null;
                                var arrayPayload: java.util.Set<string> = null;
                                var content: java.util.Map<string, any> = new java.util.HashMap<string, any>();
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
                                    return;
                                } else {
                                    entry.metaClass = metaModel.metaClass(content.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META).toString());
                                    entry.raw = new Array();
                                    entry._dirty = false;
                                    var metaKeys: string[] = content.keySet().toArray(new Array());
                                    for (var i: number = 0; i < metaKeys.length; i++) {
                                        if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.INBOUNDS_META)) {
                                            var inbounds: java.util.Set<number> = new java.util.HashSet<number>();
                                            entry.raw[org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX] = inbounds;
                                            var raw_payload: any = content.get(metaKeys[i]);
                                            try {
                                                var raw_keys: java.util.HashSet<string> = <java.util.HashSet<string>>raw_payload;
                                                var raw_keys_p: string[] = raw_keys.toArray(new Array());
                                                for (var j: number = 0; j < raw_keys_p.length; j++) {
                                                    try {
                                                        var parsed: number = java.lang.Long.parseLong(raw_keys_p[j]);
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
                                                    entry.raw[org.kevoree.modeling.api.data.manager.Index.PARENT_INDEX] = java.lang.Long.parseLong(content.get(metaKeys[i]).toString());
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
                                                                var metaReference: org.kevoree.modeling.api.meta.Meta = foundMeta.metaByName(elemsRefs[1].trim());
                                                                if (metaReference != null && metaReference instanceof org.kevoree.modeling.api.abs.AbstractMetaReference) {
                                                                    entry.raw[org.kevoree.modeling.api.data.manager.Index.REF_IN_PARENT_INDEX] = metaReference;
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
                                                        } catch ($ex$) {
                                                            if ($ex$ instanceof java.lang.Exception) {
                                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                e.printStackTrace();
                                                            }
                                                         }
                                                    } else {
                                                        if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META)) {
                                                        } else {
                                                            var metaElement: org.kevoree.modeling.api.meta.Meta = entry.metaClass.metaByName(metaKeys[i]);
                                                            var insideContent: any = content.get(metaKeys[i]);
                                                            if (insideContent != null) {
                                                                if (metaElement != null && metaElement.metaType().equals(org.kevoree.modeling.api.meta.MetaType.ATTRIBUTE)) {
                                                                    entry.raw[metaElement.index()] = (<org.kevoree.modeling.api.abs.AbstractMetaAttribute>metaElement).strategy().load(insideContent.toString(), <org.kevoree.modeling.api.abs.AbstractMetaAttribute>metaElement, now);
                                                                } else {
                                                                    if (metaElement != null && metaElement instanceof org.kevoree.modeling.api.abs.AbstractMetaReference) {
                                                                        if ((<org.kevoree.modeling.api.meta.MetaReference>metaElement).single()) {
                                                                            try {
                                                                                entry.raw[metaElement.index()] = java.lang.Long.parseLong(insideContent.toString());
                                                                            } catch ($ex$) {
                                                                                if ($ex$ instanceof java.lang.Exception) {
                                                                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                                    e.printStackTrace();
                                                                                }
                                                                             }
                                                                        } else {
                                                                            try {
                                                                                var convertedRaw: java.util.Set<number> = new java.util.HashSet<number>();
                                                                                var plainRawSet: java.util.Set<string> = <java.util.Set<string>>insideContent;
                                                                                var plainRawList: string[] = plainRawSet.toArray(new Array());
                                                                                for (var l: number = 0; l < plainRawList.length; l++) {
                                                                                    var plainRaw: string = plainRawList[l];
                                                                                    try {
                                                                                        var converted: number = java.lang.Long.parseLong(plainRaw);
                                                                                        convertedRaw.add(converted);
                                                                                    } catch ($ex$) {
                                                                                        if ($ex$ instanceof java.lang.Exception) {
                                                                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                                            e.printStackTrace();
                                                                                        }
                                                                                     }
                                                                                }
                                                                                entry.raw[metaElement.index()] = convertedRaw;
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
                                }
                            }

                            public static encode(raw: org.kevoree.modeling.api.data.cache.KCacheEntry, uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, endline: boolean, isRoot: boolean): string {
                                var metaElements: org.kevoree.modeling.api.meta.Meta[] = p_metaClass.metaElements();
                                var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                                builder.append("\t{\n");
                                builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META + "\": \"");
                                builder.append(p_metaClass.metaName());
                                if (uuid != null) {
                                    builder.append("\",\n");
                                    builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID + "\": \"");
                                    builder.append(uuid);
                                }
                                if (isRoot) {
                                    builder.append("\",\n");
                                    builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_ROOT + "\": \"");
                                    builder.append("true");
                                }
                                if (raw.get(org.kevoree.modeling.api.data.manager.Index.PARENT_INDEX) != null) {
                                    builder.append("\",\n");
                                    builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_META + "\": \"");
                                    builder.append(raw.get(org.kevoree.modeling.api.data.manager.Index.PARENT_INDEX).toString());
                                }
                                if (raw.get(org.kevoree.modeling.api.data.manager.Index.REF_IN_PARENT_INDEX) != null) {
                                    builder.append("\",\n");
                                    builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_REF_META + "\": \"");
                                    try {
                                        builder.append((<org.kevoree.modeling.api.meta.MetaReference>raw.get(org.kevoree.modeling.api.data.manager.Index.REF_IN_PARENT_INDEX)).origin().metaName());
                                        builder.append(JsonRaw.SEP);
                                        builder.append((<org.kevoree.modeling.api.meta.MetaReference>raw.get(org.kevoree.modeling.api.data.manager.Index.REF_IN_PARENT_INDEX)).metaName());
                                    } catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                            e.printStackTrace();
                                        }
                                     }
                                }
                                if (raw.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) != null) {
                                    builder.append("\",\n");
                                    builder.append("\t\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.INBOUNDS_META + "\": [");
                                    try {
                                        var elemsInRaw: java.util.Set<number> = <java.util.Set<number>>raw.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX);
                                        var elemsArr: number[] = elemsInRaw.toArray(new Array());
                                        var isFirst: boolean = true;
                                        for (var j: number = 0; j < elemsArr.length; j++) {
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
                                var nbElemToPrint: number = 0;
                                for (var i: number = org.kevoree.modeling.api.data.manager.Index.RESERVED_INDEXES; i < raw.sizeRaw(); i++) {
                                    if (raw.get(i) != null) {
                                        nbElemToPrint++;
                                    }
                                }
                                var nbElemPrinted: number = 0;
                                for (var i: number = 0; i < metaElements.length; i++) {
                                    if (metaElements[i] != null && metaElements[i].metaType().equals(org.kevoree.modeling.api.meta.MetaType.ATTRIBUTE)) {
                                        var payload_res: any = raw.get(metaElements[i].index());
                                        if (payload_res != null) {
                                            if ((<org.kevoree.modeling.api.meta.MetaAttribute>metaElements[i]).attributeType() != org.kevoree.modeling.api.meta.PrimitiveTypes.TRANSIENT) {
                                                var attrsPayload: string = (<org.kevoree.modeling.api.meta.MetaAttribute>metaElements[i]).strategy().save(payload_res, <org.kevoree.modeling.api.meta.MetaAttribute>metaElements[i]);
                                                if (attrsPayload != null) {
                                                    builder.append("\t\t");
                                                    builder.append("\"");
                                                    builder.append(metaElements[i].metaName());
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
                                    } else {
                                        if (metaElements[i] != null && metaElements[i].metaType().equals(org.kevoree.modeling.api.meta.MetaType.REFERENCE)) {
                                            var refPayload: any = raw.get(metaElements[i].index());
                                            if (refPayload != null) {
                                                builder.append("\t\t");
                                                builder.append("\"");
                                                builder.append(metaElements[i].metaName());
                                                builder.append("\":");
                                                if ((<org.kevoree.modeling.api.meta.MetaReference>metaElements[i]).single()) {
                                                    builder.append("\"");
                                                    builder.append(refPayload);
                                                    builder.append("\"");
                                                } else {
                                                    var elems: java.util.Set<number> = <java.util.Set<number>>refPayload;
                                                    var elemsArr: number[] = elems.toArray(new Array());
                                                    builder.append(" [");
                                                    for (var j: number = 0; j < elemsArr.length; j++) {
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
                                    }
                                }
                                if (endline) {
                                    builder.append("\t}\n");
                                } else {
                                    builder.append("\t}");
                                }
                                return builder.toString();
                            }

                        }

                        export interface KDataManager {

                            cdn(): org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;

                            model(): org.kevoree.modeling.api.KModel<any>;

                            cache(): org.kevoree.modeling.api.data.cache.KCache;

                            lookup(originView: org.kevoree.modeling.api.KView, key: number, callback: (p : org.kevoree.modeling.api.KObject) => void): void;

                            lookupAll(originView: org.kevoree.modeling.api.KView, key: number[], callback: (p : org.kevoree.modeling.api.KObject[]) => void): void;

                            entry(origin: org.kevoree.modeling.api.KObject, accessMode: org.kevoree.modeling.api.data.manager.AccessMode): org.kevoree.modeling.api.data.cache.KCacheEntry;

                            timeTrees(origin: org.kevoree.modeling.api.KObject, start: number, end: number, callback: (p : org.kevoree.modeling.api.rbtree.IndexRBTree[]) => void): void;

                            save(callback: (p : java.lang.Throwable) => void): void;

                            discard(universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p : java.lang.Throwable) => void): void;

                            delete(universe: org.kevoree.modeling.api.KUniverse<any, any, any>, callback: (p : java.lang.Throwable) => void): void;

                            initKObject(obj: org.kevoree.modeling.api.KObject, originView: org.kevoree.modeling.api.KView): void;

                            initUniverse(universe: org.kevoree.modeling.api.KUniverse<any, any, any>, parent: org.kevoree.modeling.api.KUniverse<any, any, any>): void;

                            nextUniverseKey(): number;

                            nextObjectKey(): number;

                            getRoot(originView: org.kevoree.modeling.api.KView, callback: (p : org.kevoree.modeling.api.KObject) => void): void;

                            setRoot(newRoot: org.kevoree.modeling.api.KObject, callback: (p : java.lang.Throwable) => void): void;

                            setContentDeliveryDriver(driver: org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver): void;

                            setScheduler(scheduler: org.kevoree.modeling.api.KScheduler): void;

                            operationManager(): org.kevoree.modeling.api.util.KOperationManager;

                            connect(callback: (p : java.lang.Throwable) => void): void;

                            close(callback: (p : java.lang.Throwable) => void): void;

                            parentUniverseKey(currentUniverseKey: number): number;

                            descendantsUniverseKeys(currentUniverseKey: number): number[];

                            reload(keys: org.kevoree.modeling.api.data.cache.KContentKey[]): void;

                        }

                        export class KeyCalculator {

                            public static LONG_LIMIT_JS: number = 0x001FFFFFFFFFFFFF;
                            public static INDEX_LIMIT: number = 0x0000001FFFFFFFFF;
                            private _prefix: string;
                            private _currentIndex: number;
                            constructor(prefix: number, currentIndex: number) {
                                this._prefix = "0x" + prefix.toString(16);
                                 this._currentIndex = currentIndex;
                            }

                            public nextKey(): number {
                                if (this._currentIndex == KeyCalculator.INDEX_LIMIT)  {
                                 throw new java.lang.IndexOutOfBoundsException("Object Index could not be created because it exceeded the capacity of the current prefix. Ask for a new prefix.");
                                }
                                 this._currentIndex++;
                                 var indexHex = this._currentIndex.toString(16);
                                 var objectKey = parseInt(this._prefix + "000000000".substring(0,9-indexHex.length) + indexHex, 16);
                                 if (objectKey > KeyCalculator.LONG_LIMIT_JS) 
                                {
                                 throw new java.lang.IndexOutOfBoundsException("Object Index exceeds teh maximum JavaScript number capacity. (2^53)");
                                }
                                 return objectKey;
                            }

                            public lastComputedIndex(): number {
                                return this._currentIndex;
                            }

                            public prefix(): number {
                                return parseInt(this._prefix,16);
                            }

                        }

                        export class LookupAllRunnable implements java.lang.Runnable {

                            private _originView: org.kevoree.modeling.api.KView;
                            private _keys: number[];
                            private _callback: (p : org.kevoree.modeling.api.KObject[]) => void;
                            private _store: org.kevoree.modeling.api.data.manager.DefaultKDataManager;
                            constructor(p_originView: org.kevoree.modeling.api.KView, p_keys: number[], p_callback: (p : org.kevoree.modeling.api.KObject[]) => void, p_store: org.kevoree.modeling.api.data.manager.DefaultKDataManager) {
                                this._originView = p_originView;
                                this._keys = p_keys;
                                this._callback = p_callback;
                                this._store = p_store;
                            }

                            public run(): void {
                                this._store.internal_resolve_universe_time(this._originView, this._keys,  (objects : org.kevoree.modeling.api.data.manager.ResolutionResult[]) => {
                                    var resolved: org.kevoree.modeling.api.KObject[] = new Array();
                                    var toLoadIndexes: java.util.List<number> = new java.util.ArrayList<number>();
                                    for (var i: number = 0; i < objects.length; i++) {
                                        if (objects[i] != null && objects[i].resolvedQuanta != null && objects[i].resolvedUniverse != null) {
                                            var contentKey: org.kevoree.modeling.api.data.cache.KContentKey = org.kevoree.modeling.api.data.cache.KContentKey.createObject(objects[i].resolvedUniverse, objects[i].resolvedQuanta, this._keys[i]);
                                            var entry: org.kevoree.modeling.api.data.cache.KCacheEntry = <org.kevoree.modeling.api.data.cache.KCacheEntry>this._store.cache().get(contentKey);
                                            if (entry == null) {
                                                toLoadIndexes.add(i);
                                            } else {
                                                resolved[i] = (<org.kevoree.modeling.api.abs.AbstractKView>this._originView).createProxy(entry.metaClass, entry.universeTree, this._keys[i]);
                                            }
                                        }
                                    }
                                    if (toLoadIndexes.isEmpty()) {
                                        this._callback(resolved);
                                    } else {
                                        var toLoadKeys: org.kevoree.modeling.api.data.cache.KContentKey[] = new Array();
                                        for (var i: number = 0; i < toLoadIndexes.size(); i++) {
                                            var toLoadIndex: number = toLoadIndexes.get(i);
                                            toLoadKeys[i] = org.kevoree.modeling.api.data.cache.KContentKey.createObject(objects[toLoadIndex].resolvedUniverse, objects[toLoadIndex].resolvedQuanta, this._keys[i]);
                                        }
                                        this._store.cdn().get(toLoadKeys,  (strings : string[], error : java.lang.Throwable) => {
                                            if (error != null) {
                                                error.printStackTrace();
                                                this._callback(null);
                                            } else {
                                                for (var i: number = 0; i < strings.length; i++) {
                                                    if (strings[i] != null) {
                                                        var index: number = toLoadIndexes.get(i);
                                                        var entry: org.kevoree.modeling.api.data.cache.KCacheEntry = new org.kevoree.modeling.api.data.cache.KCacheEntry();
                                                        org.kevoree.modeling.api.data.manager.JsonRaw.decode(strings[i], objects[i].resolvedQuanta, this._originView.universe().model().metaModel(), entry);
                                                        if (entry.raw != null) {
                                                            entry.universeTree = objects[i].universeTree;
                                                            resolved[index] = (<org.kevoree.modeling.api.abs.AbstractKView>this._originView).createProxy(entry.metaClass, entry.universeTree, this._keys[i]);
                                                            this._store.cache().put(org.kevoree.modeling.api.data.cache.KContentKey.createObject(objects[i].resolvedUniverse, <number>objects[i].resolvedQuanta, this._keys[i]), entry);
                                                        }
                                                    }
                                                }
                                                this._callback(resolved);
                                            }
                                        });
                                    }
                                });
                            }

                        }

                        export class ResolutionResult {

                            public resolvedUniverse: number = null;
                            public universeTree: org.kevoree.modeling.api.rbtree.LongRBTree = null;
                            public resolvedQuanta: number = null;
                            public timeTree: org.kevoree.modeling.api.rbtree.IndexRBTree = null;
                        }

                    }
                }
                export module extrapolation {
                    export class DiscreteExtrapolation implements org.kevoree.modeling.api.extrapolation.Extrapolation {

                        private static INSTANCE: org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation;
                        public static instance(): org.kevoree.modeling.api.extrapolation.Extrapolation {
                            if (DiscreteExtrapolation.INSTANCE == null) {
                                DiscreteExtrapolation.INSTANCE = new org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation();
                            }
                            return DiscreteExtrapolation.INSTANCE;
                        }

                        public extrapolate(current: org.kevoree.modeling.api.KObject, attribute: org.kevoree.modeling.api.meta.MetaAttribute): any {
                            var payload: org.kevoree.modeling.api.data.cache.KCacheEntry = current.view().universe().model().manager().entry(current, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                            if (payload != null) {
                                return payload.get(attribute.index());
                            } else {
                                return null;
                            }
                        }

                        public mutate(current: org.kevoree.modeling.api.KObject, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void {
                            var internalPayload: org.kevoree.modeling.api.data.cache.KCacheEntry = current.view().universe().model().manager().entry(current, org.kevoree.modeling.api.data.manager.AccessMode.WRITE);
                            if (internalPayload != null) {
                                internalPayload.set(attribute.index(), payload);
                            }
                        }

                        public save(cache: any, attribute: org.kevoree.modeling.api.meta.MetaAttribute): string {
                            if (cache != null) {
                                return attribute.attributeType().save(cache);
                            } else {
                                return null;
                            }
                        }

                        public load(payload: string, attribute: org.kevoree.modeling.api.meta.MetaAttribute, now: number): any {
                            if (payload != null) {
                                return attribute.attributeType().load(payload);
                            }
                            return null;
                        }

                    }

                    export interface Extrapolation {

                        extrapolate(current: org.kevoree.modeling.api.KObject, attribute: org.kevoree.modeling.api.meta.MetaAttribute): any;

                        mutate(current: org.kevoree.modeling.api.KObject, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void;

                        save(cache: any, attribute: org.kevoree.modeling.api.meta.MetaAttribute): string;

                        load(payload: string, attribute: org.kevoree.modeling.api.meta.MetaAttribute, now: number): any;

                    }

                    export class PolynomialExtrapolation implements org.kevoree.modeling.api.extrapolation.Extrapolation {

                        private static INSTANCE: org.kevoree.modeling.api.extrapolation.PolynomialExtrapolation;
                        public extrapolate(current: org.kevoree.modeling.api.KObject, attribute: org.kevoree.modeling.api.meta.MetaAttribute): any {
                            var pol: org.kevoree.modeling.api.polynomial.PolynomialModel = <org.kevoree.modeling.api.polynomial.PolynomialModel>current.view().universe().model().manager().entry(current, org.kevoree.modeling.api.data.manager.AccessMode.READ).get(attribute.index());
                            if (pol != null) {
                                var extrapolatedValue: number = pol.extrapolate(current.now());
                                if (attribute.attributeType() == org.kevoree.modeling.api.meta.PrimitiveTypes.DOUBLE) {
                                    return extrapolatedValue;
                                } else {
                                    if (attribute.attributeType() == org.kevoree.modeling.api.meta.PrimitiveTypes.LONG) {
                                        return extrapolatedValue.longValue();
                                    } else {
                                        if (attribute.attributeType() == org.kevoree.modeling.api.meta.PrimitiveTypes.FLOAT) {
                                            return extrapolatedValue.floatValue();
                                        } else {
                                            if (attribute.attributeType() == org.kevoree.modeling.api.meta.PrimitiveTypes.INT) {
                                                return extrapolatedValue.intValue();
                                            } else {
                                                if (attribute.attributeType() == org.kevoree.modeling.api.meta.PrimitiveTypes.SHORT) {
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

                        public mutate(current: org.kevoree.modeling.api.KObject, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void {
                            var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = current.view().universe().model().manager().entry(current, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                            var previous: any = raw.get(attribute.index());
                            if (previous == null) {
                                var pol: org.kevoree.modeling.api.polynomial.PolynomialModel = this.createPolynomialModel(current.now(), attribute.precision());
                                pol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()));
                                current.view().universe().model().manager().entry(current, org.kevoree.modeling.api.data.manager.AccessMode.WRITE).set(attribute.index(), pol);
                            } else {
                                var previousPol: org.kevoree.modeling.api.polynomial.PolynomialModel = <org.kevoree.modeling.api.polynomial.PolynomialModel>previous;
                                if (!previousPol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()))) {
                                    var pol: org.kevoree.modeling.api.polynomial.PolynomialModel = this.createPolynomialModel(previousPol.lastIndex(), attribute.precision());
                                    pol.insert(previousPol.lastIndex(), previousPol.extrapolate(previousPol.lastIndex()));
                                    pol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()));
                                    current.view().universe().model().manager().entry(current, org.kevoree.modeling.api.data.manager.AccessMode.WRITE).set(attribute.index(), pol);
                                } else {
                                    if (previousPol.isDirty()) {
                                        raw.set(attribute.index(), previousPol);
                                    }
                                }
                            }
                        }

                        public save(cache: any, attribute: org.kevoree.modeling.api.meta.MetaAttribute): string {
                            try {
                                return (<org.kevoree.modeling.api.polynomial.PolynomialModel>cache).save();
                            } catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                    e.printStackTrace();
                                    return null;
                                }
                             }
                        }

                        public load(payload: string, attribute: org.kevoree.modeling.api.meta.MetaAttribute, now: number): any {
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

                        private createPolynomialModel(origin: number, precision: number): org.kevoree.modeling.api.polynomial.PolynomialModel {
                            return new org.kevoree.modeling.api.polynomial.doublepolynomial.DoublePolynomialModel(origin, precision, 20, org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES);
                        }

                    }

                }
                export module infer {
                    export class AnalyticKInfer extends org.kevoree.modeling.api.abs.AbstractKObjectInfer {

                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree) {
                            super(p_view, p_uuid, p_universeTree, null);
                        }

                        public train(trainingSet: any[][], expectedResultSet: any[], callback: (p : java.lang.Throwable) => void): void {
                            var currentState: org.kevoree.modeling.api.infer.states.AnalyticKInferState = <org.kevoree.modeling.api.infer.states.AnalyticKInferState>this.modifyState();
                            for (var i: number = 0; i < expectedResultSet.length; i++) {
                                var value: number = java.lang.Double.parseDouble(expectedResultSet[i].toString());
                                currentState.train(value);
                            }
                        }

                        public infer(features: any[]): any {
                            var currentState: org.kevoree.modeling.api.infer.states.AnalyticKInferState = <org.kevoree.modeling.api.infer.states.AnalyticKInferState>this.readOnlyState();
                            return currentState.getAverage();
                        }

                        public accuracy(testSet: any[][], expectedResultSet: any[]): any {
                            return null;
                        }

                        public clear(): void {
                            var currentState: org.kevoree.modeling.api.infer.states.AnalyticKInferState = <org.kevoree.modeling.api.infer.states.AnalyticKInferState>this.modifyState();
                            currentState.clear();
                        }

                        public createEmptyState(): org.kevoree.modeling.api.KInferState {
                            return new org.kevoree.modeling.api.infer.states.AnalyticKInferState();
                        }

                    }

                    export class GaussianClassificationKInfer extends org.kevoree.modeling.api.abs.AbstractKObjectInfer {

                        private alpha: number = 0.05;
                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
                            super(p_view, p_uuid, p_universeTree, p_metaClass);
                        }

                        public getAlpha(): number {
                            return this.alpha;
                        }

                        public setAlpha(alpha: number): void {
                            this.alpha = alpha;
                        }

                        public train(trainingSet: any[][], expectedResultSet: any[], callback: (p : java.lang.Throwable) => void): void {
                            var currentState: org.kevoree.modeling.api.infer.states.GaussianArrayKInferState = <org.kevoree.modeling.api.infer.states.GaussianArrayKInferState>this.modifyState();
                            var featuresize: number = trainingSet[0].length;
                            var features: number[][] = new Array();
                            var results: boolean[] = new Array();
                            for (var i: number = 0; i < trainingSet.length; i++) {
                                features[i] = new Array();
                                for (var j: number = 0; j < featuresize; j++) {
                                    features[i][j] = <number>trainingSet[i][j];
                                }
                                results[i] = <boolean>expectedResultSet[i];
                                currentState.train(features[i], results[i], this.alpha);
                            }
                        }

                        public infer(features: any[]): any {
                            var currentState: org.kevoree.modeling.api.infer.states.GaussianArrayKInferState = <org.kevoree.modeling.api.infer.states.GaussianArrayKInferState>this.readOnlyState();
                            var ft: number[] = new Array();
                            for (var i: number = 0; i < features.length; i++) {
                                ft[i] = <number>features[i];
                            }
                            return currentState.infer(ft);
                        }

                        public accuracy(testSet: any[][], expectedResultSet: any[]): any {
                            return null;
                        }

                        public clear(): void {
                        }

                        public createEmptyState(): org.kevoree.modeling.api.KInferState {
                            return null;
                        }

                    }

                    export class LinearRegressionKInfer extends org.kevoree.modeling.api.abs.AbstractKObjectInfer {

                        private alpha: number = 0.0001;
                        private iterations: number = 100;
                        public getAlpha(): number {
                            return this.alpha;
                        }

                        public setAlpha(alpha: number): void {
                            this.alpha = alpha;
                        }

                        public getIterations(): number {
                            return this.iterations;
                        }

                        public setIterations(iterations: number): void {
                            this.iterations = iterations;
                        }

                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
                            super(p_view, p_uuid, p_universeTree, p_metaClass);
                        }

                        private calculate(weights: number[], features: number[]): number {
                            var result: number = 0;
                            for (var i: number = 0; i < features.length; i++) {
                                result += weights[i] * features[i];
                            }
                            result += weights[features.length];
                            return result;
                        }

                        public train(trainingSet: any[][], expectedResultSet: any[], callback: (p : java.lang.Throwable) => void): void {
                            var currentState: org.kevoree.modeling.api.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.api.infer.states.DoubleArrayKInferState>this.modifyState();
                            var weights: number[] = currentState.getWeights();
                            var featuresize: number = trainingSet[0].length;
                            if (weights == null) {
                                weights = new Array();
                            }
                            var features: number[][] = new Array();
                            var results: number[] = new Array();
                            for (var i: number = 0; i < trainingSet.length; i++) {
                                features[i] = new Array();
                                for (var j: number = 0; j < featuresize; j++) {
                                    features[i][j] = <number>trainingSet[i][j];
                                }
                                results[i] = <number>expectedResultSet[i];
                            }
                            for (var j: number = 0; j < this.iterations; j++) {
                                for (var i: number = 0; i < trainingSet.length; i++) {
                                    var h: number = this.calculate(weights, features[i]);
                                    var err: number = -this.alpha * (h - results[i]);
                                    for (var k: number = 0; k < featuresize; k++) {
                                        weights[k] = weights[k] + err * features[i][k];
                                    }
                                    weights[featuresize] = weights[featuresize] + err;
                                }
                            }
                            currentState.setWeights(weights);
                        }

                        public infer(features: any[]): any {
                            var currentState: org.kevoree.modeling.api.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.api.infer.states.DoubleArrayKInferState>this.readOnlyState();
                            var weights: number[] = currentState.getWeights();
                            var ft: number[] = new Array();
                            for (var i: number = 0; i < features.length; i++) {
                                ft[i] = <number>features[i];
                            }
                            return this.calculate(weights, ft);
                        }

                        public accuracy(testSet: any[][], expectedResultSet: any[]): any {
                            return null;
                        }

                        public clear(): void {
                            var currentState: org.kevoree.modeling.api.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.api.infer.states.DoubleArrayKInferState>this.modifyState();
                            currentState.setWeights(null);
                        }

                        public createEmptyState(): org.kevoree.modeling.api.KInferState {
                            return new org.kevoree.modeling.api.infer.states.DoubleArrayKInferState();
                        }

                    }

                    export class PerceptronClassificationKInfer extends org.kevoree.modeling.api.abs.AbstractKObjectInfer {

                        private alpha: number = 0.001;
                        private iterations: number = 100;
                        public getAlpha(): number {
                            return this.alpha;
                        }

                        public setAlpha(alpha: number): void {
                            this.alpha = alpha;
                        }

                        public getIterations(): number {
                            return this.iterations;
                        }

                        public setIterations(iterations: number): void {
                            this.iterations = iterations;
                        }

                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
                            super(p_view, p_uuid, p_universeTree, p_metaClass);
                        }

                        private calculate(weights: number[], features: number[]): number {
                            var res: number = 0;
                            for (var i: number = 0; i < features.length; i++) {
                                res = res + weights[i] * (features[i]);
                            }
                            res = res + weights[features.length];
                            if (res >= 0) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }

                        public train(trainingSet: any[][], expectedResultSet: any[], callback: (p : java.lang.Throwable) => void): void {
                            var currentState: org.kevoree.modeling.api.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.api.infer.states.DoubleArrayKInferState>this.modifyState();
                            var weights: number[] = currentState.getWeights();
                            var featuresize: number = trainingSet[0].length;
                            if (weights == null) {
                                weights = new Array();
                            }
                            var features: number[][] = new Array();
                            var results: number[] = new Array();
                            for (var i: number = 0; i < trainingSet.length; i++) {
                                features[i] = new Array();
                                for (var j: number = 0; j < featuresize; j++) {
                                    features[i][j] = <number>trainingSet[i][j];
                                }
                                results[i] = <number>expectedResultSet[i];
                                if (results[i] == 0) {
                                    results[i] = -1;
                                }
                            }
                            for (var j: number = 0; j < this.iterations; j++) {
                                for (var i: number = 0; i < trainingSet.length; i++) {
                                    var h: number = this.calculate(weights, features[i]);
                                    if (h == 0) {
                                        h = -1;
                                    }
                                    if (h * results[i] <= 0) {
                                        for (var k: number = 0; k < featuresize; k++) {
                                            weights[k] = weights[k] + this.alpha * (results[i] * features[i][k]);
                                        }
                                        weights[featuresize] = weights[featuresize] + this.alpha * (results[i]);
                                    }
                                }
                            }
                            currentState.setWeights(weights);
                        }

                        public infer(features: any[]): any {
                            var currentState: org.kevoree.modeling.api.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.api.infer.states.DoubleArrayKInferState>this.readOnlyState();
                            var weights: number[] = currentState.getWeights();
                            var ft: number[] = new Array();
                            for (var i: number = 0; i < features.length; i++) {
                                ft[i] = <number>features[i];
                            }
                            return this.calculate(weights, ft);
                        }

                        public accuracy(testSet: any[][], expectedResultSet: any[]): any {
                            return null;
                        }

                        public clear(): void {
                            var currentState: org.kevoree.modeling.api.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.api.infer.states.DoubleArrayKInferState>this.modifyState();
                            currentState.setWeights(null);
                        }

                        public createEmptyState(): org.kevoree.modeling.api.KInferState {
                            return new org.kevoree.modeling.api.infer.states.DoubleArrayKInferState();
                        }

                    }

                    export class PolynomialOfflineKInfer extends org.kevoree.modeling.api.abs.AbstractKObjectInfer {

                        public maxDegree: number = 20;
                        public toleratedErr: number = 0.01;
                        public getToleratedErr(): number {
                            return this.toleratedErr;
                        }

                        public setToleratedErr(toleratedErr: number): void {
                            this.toleratedErr = toleratedErr;
                        }

                        public getMaxDegree(): number {
                            return this.maxDegree;
                        }

                        public setMaxDegree(maxDegree: number): void {
                            this.maxDegree = maxDegree;
                        }

                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
                            super(p_view, p_uuid, p_universeTree, p_metaClass);
                        }

                        private calculateLong(time: number, weights: number[], timeOrigin: number, unit: number): number {
                            var t: number = (<number>(time - timeOrigin)) / unit;
                            return this.calculate(weights, t);
                        }

                        private calculate(weights: number[], t: number): number {
                            var result: number = 0;
                            var power: number = 1;
                            for (var j: number = 0; j < weights.length; j++) {
                                result += weights[j] * power;
                                power = power * t;
                            }
                            return result;
                        }

                        public train(trainingSet: any[][], expectedResultSet: any[], callback: (p : java.lang.Throwable) => void): void {
                            var currentState: org.kevoree.modeling.api.infer.states.PolynomialKInferState = <org.kevoree.modeling.api.infer.states.PolynomialKInferState>this.modifyState();
                            var weights: number[];
                            var featuresize: number = trainingSet[0].length;
                            var times: number[] = new Array();
                            var results: number[] = new Array();
                            for (var i: number = 0; i < trainingSet.length; i++) {
                                times[i] = <number>trainingSet[i][0];
                                results[i] = <number>expectedResultSet[i];
                            }
                            if (times.length == 0) {
                                return;
                            }
                            if (times.length == 1) {
                                weights = new Array();
                                weights[0] = results[0];
                                currentState.setWeights(weights);
                                return;
                            }
                            var maxcurdeg: number = Math.min(times.length, this.maxDegree);
                            var timeOrigin: number = times[0];
                            var unit: number = times[1] - times[0];
                            var normalizedTimes: number[] = new Array();
                            for (var i: number = 0; i < times.length; i++) {
                                normalizedTimes[i] = (<number>(times[i] - times[0])) / unit;
                            }
                            for (var deg: number = 0; deg < maxcurdeg; deg++) {
                                var pf: org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml = new org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml(deg);
                                pf.fit(normalizedTimes, results);
                                if (org.kevoree.modeling.api.infer.states.PolynomialKInferState.maxError(pf.getCoef(), normalizedTimes, results) <= this.toleratedErr) {
                                    currentState.setUnit(unit);
                                    currentState.setTimeOrigin(timeOrigin);
                                    currentState.setWeights(pf.getCoef());
                                    return;
                                }
                            }
                        }

                        public infer(features: any[]): any {
                            var currentState: org.kevoree.modeling.api.infer.states.PolynomialKInferState = <org.kevoree.modeling.api.infer.states.PolynomialKInferState>this.readOnlyState();
                            var time: number = <number>features[0];
                            return currentState.infer(time);
                        }

                        public accuracy(testSet: any[][], expectedResultSet: any[]): any {
                            return null;
                        }

                        public clear(): void {
                            var currentState: org.kevoree.modeling.api.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.api.infer.states.DoubleArrayKInferState>this.modifyState();
                            currentState.setWeights(null);
                        }

                        public createEmptyState(): org.kevoree.modeling.api.KInferState {
                            return new org.kevoree.modeling.api.infer.states.DoubleArrayKInferState();
                        }

                    }

                    export class PolynomialOnlineKInfer extends org.kevoree.modeling.api.abs.AbstractKObjectInfer {

                        public maxDegree: number = 20;
                        public toleratedErr: number = 0.01;
                        public getToleratedErr(): number {
                            return this.toleratedErr;
                        }

                        public setToleratedErr(toleratedErr: number): void {
                            this.toleratedErr = toleratedErr;
                        }

                        public getMaxDegree(): number {
                            return this.maxDegree;
                        }

                        public setMaxDegree(maxDegree: number): void {
                            this.maxDegree = maxDegree;
                        }

                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
                            super(p_view, p_uuid, p_universeTree, p_metaClass);
                        }

                        private calculateLong(time: number, weights: number[], timeOrigin: number, unit: number): number {
                            var t: number = (<number>(time - timeOrigin)) / unit;
                            return this.calculate(weights, t);
                        }

                        private calculate(weights: number[], t: number): number {
                            var result: number = 0;
                            var power: number = 1;
                            for (var j: number = 0; j < weights.length; j++) {
                                result += weights[j] * power;
                                power = power * t;
                            }
                            return result;
                        }

                        public train(trainingSet: any[][], expectedResultSet: any[], callback: (p : java.lang.Throwable) => void): void {
                            var currentState: org.kevoree.modeling.api.infer.states.PolynomialKInferState = <org.kevoree.modeling.api.infer.states.PolynomialKInferState>this.modifyState();
                            var weights: number[];
                            var featuresize: number = trainingSet[0].length;
                            var times: number[] = new Array();
                            var results: number[] = new Array();
                            for (var i: number = 0; i < trainingSet.length; i++) {
                                times[i] = <number>trainingSet[i][0];
                                results[i] = <number>expectedResultSet[i];
                            }
                            if (times.length == 0) {
                                return;
                            }
                            if (times.length == 1) {
                                weights = new Array();
                                weights[0] = results[0];
                                currentState.setWeights(weights);
                                return;
                            }
                            var maxcurdeg: number = Math.min(times.length, this.maxDegree);
                            var timeOrigin: number = times[0];
                            var unit: number = times[1] - times[0];
                            var normalizedTimes: number[] = new Array();
                            for (var i: number = 0; i < times.length; i++) {
                                normalizedTimes[i] = (<number>(times[i] - times[0])) / unit;
                            }
                            for (var deg: number = 0; deg < maxcurdeg; deg++) {
                                var pf: org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml = new org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml(deg);
                                pf.fit(normalizedTimes, results);
                                if (org.kevoree.modeling.api.infer.states.PolynomialKInferState.maxError(pf.getCoef(), normalizedTimes, results) <= this.toleratedErr) {
                                    currentState.setUnit(unit);
                                    currentState.setTimeOrigin(timeOrigin);
                                    currentState.setWeights(pf.getCoef());
                                    return;
                                }
                            }
                        }

                        public infer(features: any[]): any {
                            var currentState: org.kevoree.modeling.api.infer.states.PolynomialKInferState = <org.kevoree.modeling.api.infer.states.PolynomialKInferState>this.readOnlyState();
                            var time: number = <number>features[0];
                            return currentState.infer(time);
                        }

                        public accuracy(testSet: any[][], expectedResultSet: any[]): any {
                            return null;
                        }

                        public clear(): void {
                            var currentState: org.kevoree.modeling.api.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.api.infer.states.DoubleArrayKInferState>this.modifyState();
                            currentState.setWeights(null);
                        }

                        public createEmptyState(): org.kevoree.modeling.api.KInferState {
                            return new org.kevoree.modeling.api.infer.states.DoubleArrayKInferState();
                        }

                    }

                    export class WinnowClassificationKInfer extends org.kevoree.modeling.api.abs.AbstractKObjectInfer {

                        private alpha: number = 2;
                        private beta: number = 2;
                        public getAlpha(): number {
                            return this.alpha;
                        }

                        public setAlpha(alpha: number): void {
                            this.alpha = alpha;
                        }

                        public getBeta(): number {
                            return this.beta;
                        }

                        public setBeta(beta: number): void {
                            this.beta = beta;
                        }

                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
                            super(p_view, p_uuid, p_universeTree, p_metaClass);
                        }

                        private calculate(weights: number[], features: number[]): number {
                            var result: number = 0;
                            for (var i: number = 0; i < features.length; i++) {
                                result += weights[i] * features[i];
                            }
                            if (result >= features.length) {
                                return 1.0;
                            } else {
                                return 0.0;
                            }
                        }

                        public train(trainingSet: any[][], expectedResultSet: any[], callback: (p : java.lang.Throwable) => void): void {
                            var currentState: org.kevoree.modeling.api.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.api.infer.states.DoubleArrayKInferState>this.modifyState();
                            var weights: number[] = currentState.getWeights();
                            var featuresize: number = trainingSet[0].length;
                            if (weights == null) {
                                weights = new Array();
                                for (var i: number = 0; i < weights.length; i++) {
                                    weights[i] = 2;
                                }
                            }
                            var features: number[][] = new Array();
                            var results: number[] = new Array();
                            for (var i: number = 0; i < trainingSet.length; i++) {
                                features[i] = new Array();
                                for (var j: number = 0; j < featuresize; j++) {
                                    features[i][j] = <number>trainingSet[i][j];
                                }
                                results[i] = <number>expectedResultSet[i];
                            }
                            for (var i: number = 0; i < trainingSet.length; i++) {
                                if (this.calculate(weights, features[i]) == results[i]) {
                                    continue;
                                }
                                if (results[i] == 0) {
                                    for (var j: number = 0; j < features[i].length; j++) {
                                        if (features[i][j] != 0) {
                                            weights[j] = weights[j] / this.beta;
                                        }
                                    }
                                } else {
                                    for (var j: number = 0; i < features[i].length; j++) {
                                        if (features[i][j] != 0) {
                                            weights[j] = weights[j] * this.alpha;
                                        }
                                    }
                                }
                            }
                            currentState.setWeights(weights);
                        }

                        public infer(features: any[]): any {
                            var currentState: org.kevoree.modeling.api.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.api.infer.states.DoubleArrayKInferState>this.readOnlyState();
                            var weights: number[] = currentState.getWeights();
                            var ft: number[] = new Array();
                            for (var i: number = 0; i < features.length; i++) {
                                ft[i] = <number>features[i];
                            }
                            return this.calculate(weights, ft);
                        }

                        public accuracy(testSet: any[][], expectedResultSet: any[]): any {
                            return null;
                        }

                        public clear(): void {
                            var currentState: org.kevoree.modeling.api.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.api.infer.states.DoubleArrayKInferState>this.modifyState();
                            currentState.setWeights(null);
                        }

                        public createEmptyState(): org.kevoree.modeling.api.KInferState {
                            return new org.kevoree.modeling.api.infer.states.DoubleArrayKInferState();
                        }

                    }

                    export module states {
                        export class AnalyticKInferState extends org.kevoree.modeling.api.KInferState {

                            private _isDirty: boolean = false;
                            private sumSquares: number = 0;
                            private sum: number = 0;
                            private nb: number = 0;
                            private min: number;
                            private max: number;
                            public getSumSquares(): number {
                                return this.sumSquares;
                            }

                            public setSumSquares(sumSquares: number): void {
                                this.sumSquares = sumSquares;
                            }

                            public getMin(): number {
                                return this.min;
                            }

                            public setMin(min: number): void {
                                this._isDirty = true;
                                this.min = min;
                            }

                            public getMax(): number {
                                return this.max;
                            }

                            public setMax(max: number): void {
                                this._isDirty = true;
                                this.max = max;
                            }

                            public getNb(): number {
                                return this.nb;
                            }

                            public setNb(nb: number): void {
                                this._isDirty = true;
                                this.nb = nb;
                            }

                            public getSum(): number {
                                return this.sum;
                            }

                            public setSum(sum: number): void {
                                this._isDirty = true;
                                this.sum = sum;
                            }

                            public getAverage(): number {
                                if (this.nb != 0) {
                                    return this.sum / this.nb;
                                } else {
                                    return null;
                                }
                            }

                            public train(value: number): void {
                                if (this.nb == 0) {
                                    this.max = value;
                                    this.min = value;
                                } else {
                                    if (value < this.min) {
                                        this.min = value;
                                    }
                                    if (value > this.max) {
                                        this.max = value;
                                    }
                                }
                                this.sum += value;
                                this.sumSquares += value * value;
                                this.nb++;
                                this._isDirty = true;
                            }

                            public getVariance(): number {
                                if (this.nb != 0) {
                                    var avg: number = this.sum / this.nb;
                                    var newvar: number = this.sumSquares / this.nb - avg * avg;
                                    return newvar;
                                } else {
                                    return null;
                                }
                            }

                            public clear(): void {
                                this.nb = 0;
                                this.sum = 0;
                                this.sumSquares = 0;
                                this._isDirty = true;
                            }

                            public save(): string {
                                return this.sum + "/" + this.nb + "/" + this.min + "/" + this.max + "/" + this.sumSquares;
                            }

                            public load(payload: string): void {
                                try {
                                    var previousState: string[] = payload.split("/");
                                    this.sum = java.lang.Double.parseDouble(previousState[0]);
                                    this.nb = java.lang.Integer.parseInt(previousState[1]);
                                    this.min = java.lang.Double.parseDouble(previousState[2]);
                                    this.max = java.lang.Double.parseDouble(previousState[3]);
                                    this.sumSquares = java.lang.Double.parseDouble(previousState[4]);
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                        this.sum = 0;
                                        this.nb = 0;
                                    }
                                 }
                                this._isDirty = false;
                            }

                            public isDirty(): boolean {
                                return this._isDirty;
                            }

                            public cloneState(): org.kevoree.modeling.api.KInferState {
                                var cloned: org.kevoree.modeling.api.infer.states.AnalyticKInferState = new org.kevoree.modeling.api.infer.states.AnalyticKInferState();
                                cloned.setSumSquares(this.getSumSquares());
                                cloned.setNb(this.getNb());
                                cloned.setSum(this.getSum());
                                cloned.setMax(this.getMax());
                                cloned.setMin(this.getMin());
                                return cloned;
                            }

                        }

                        export class BayesianClassificationState extends org.kevoree.modeling.api.KInferState {

                            private states: org.kevoree.modeling.api.infer.states.Bayesian.BayesianSubstate[][];
                            private classStats: org.kevoree.modeling.api.infer.states.Bayesian.EnumSubstate;
                            private numOfFeatures: number;
                            private numOfClasses: number;
                            private static stateSep: string = "/";
                            private static interStateSep: string = "|";
                            public initialize(metaFeatures: any[], MetaClassification: any): void {
                                this.numOfFeatures = metaFeatures.length;
                                this.numOfClasses = 0;
                                this.states = new Array(new Array());
                                this.classStats = new org.kevoree.modeling.api.infer.states.Bayesian.EnumSubstate();
                                this.classStats.initialize(this.numOfClasses);
                                for (var i: number = 0; i < this.numOfFeatures; i++) {
                                }
                            }

                            public predict(features: any[]): number {
                                var temp: number;
                                var prediction: number = -1;
                                var max: number = 0;
                                for (var i: number = 0; i < this.numOfClasses; i++) {
                                    temp = this.classStats.calculateProbability(i);
                                    for (var j: number = 0; j < this.numOfFeatures; j++) {
                                        temp = temp * this.states[i][j].calculateProbability(features[j]);
                                    }
                                    if (temp >= max) {
                                        max = temp;
                                        prediction = i;
                                    }
                                }
                                return prediction;
                            }

                            public train(features: any[], classNum: number): void {
                                for (var i: number = 0; i < this.numOfFeatures; i++) {
                                    this.states[classNum][i].train(features[i]);
                                    this.states[this.numOfClasses][i].train(features[i]);
                                }
                                this.classStats.train(classNum);
                            }

                            public save(): string {
                                var sb: java.lang.StringBuilder = new java.lang.StringBuilder();
                                sb.append(this.numOfClasses + BayesianClassificationState.interStateSep);
                                sb.append(this.numOfFeatures + BayesianClassificationState.interStateSep);
                                for (var i: number = 0; i < this.numOfClasses + 1; i++) {
                                    for (var j: number = 0; j < this.numOfFeatures; j++) {
                                        sb.append(this.states[i][j].save(BayesianClassificationState.stateSep));
                                        sb.append(BayesianClassificationState.interStateSep);
                                    }
                                }
                                sb.append(this.classStats.save(BayesianClassificationState.stateSep));
                                return sb.toString();
                            }

                            public load(payload: string): void {
                                var st: string[] = payload.split(BayesianClassificationState.interStateSep);
                                this.numOfClasses = java.lang.Integer.parseInt(st[0]);
                                this.numOfFeatures = java.lang.Integer.parseInt(st[1]);
                                this.states = new Array(new Array());
                                var counter: number = 2;
                                for (var i: number = 0; i < this.numOfClasses + 1; i++) {
                                    for (var j: number = 0; j < this.numOfFeatures; j++) {
                                        var s: string = st[counter].split(BayesianClassificationState.stateSep)[0];
                                        if (s.equals("EnumSubstate")) {
                                            this.states[i][j] = new org.kevoree.modeling.api.infer.states.Bayesian.EnumSubstate();
                                        } else {
                                            if (s.equals("GaussianSubState")) {
                                                this.states[i][j] = new org.kevoree.modeling.api.infer.states.Bayesian.GaussianSubState();
                                            }
                                        }
                                        s = st[counter].substring(s.length + 1);
                                        this.states[i][j].load(s, BayesianClassificationState.stateSep);
                                        counter++;
                                    }
                                }
                                var s: string = st[counter].split(BayesianClassificationState.stateSep)[0];
                                s = st[counter].substring(s.length + 1);
                                this.classStats = new org.kevoree.modeling.api.infer.states.Bayesian.EnumSubstate();
                                this.classStats.load(s, BayesianClassificationState.stateSep);
                            }

                            public isDirty(): boolean {
                                return false;
                            }

                            public cloneState(): org.kevoree.modeling.api.KInferState {
                                return null;
                            }

                        }

                        export class DoubleArrayKInferState extends org.kevoree.modeling.api.KInferState {

                            private _isDirty: boolean = false;
                            private weights: number[];
                            public save(): string {
                                var s: string = "";
                                var sb: java.lang.StringBuilder = new java.lang.StringBuilder();
                                if (this.weights != null) {
                                    for (var i: number = 0; i < this.weights.length; i++) {
                                        sb.append(this.weights[i] + "/");
                                    }
                                    s = sb.toString();
                                }
                                return s;
                            }

                            public load(payload: string): void {
                                try {
                                    var previousState: string[] = payload.split("/");
                                    if (previousState.length > 0) {
                                        this.weights = new Array();
                                        for (var i: number = 0; i < previousState.length; i++) {
                                            this.weights[i] = java.lang.Double.parseDouble(previousState[i]);
                                        }
                                    }
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                    }
                                 }
                                this._isDirty = false;
                            }

                            public isDirty(): boolean {
                                return this._isDirty;
                            }

                            public set_isDirty(value: boolean): void {
                                this._isDirty = value;
                            }

                            public cloneState(): org.kevoree.modeling.api.KInferState {
                                var cloned: org.kevoree.modeling.api.infer.states.DoubleArrayKInferState = new org.kevoree.modeling.api.infer.states.DoubleArrayKInferState();
                                var clonearray: number[] = new Array();
                                for (var i: number = 0; i < this.weights.length; i++) {
                                    clonearray[i] = this.weights[i];
                                }
                                cloned.setWeights(clonearray);
                                return cloned;
                            }

                            public getWeights(): number[] {
                                return this.weights;
                            }

                            public setWeights(weights: number[]): void {
                                this.weights = weights;
                                this._isDirty = true;
                            }

                        }

                        export class GaussianArrayKInferState extends org.kevoree.modeling.api.KInferState {

                            private _isDirty: boolean = false;
                            private sumSquares: number[] = null;
                            private sum: number[] = null;
                            private epsilon: number = 0;
                            private nb: number = 0;
                            public getSumSquares(): number[] {
                                return this.sumSquares;
                            }

                            public setSumSquares(sumSquares: number[]): void {
                                this.sumSquares = sumSquares;
                            }

                            public getNb(): number {
                                return this.nb;
                            }

                            public setNb(nb: number): void {
                                this._isDirty = true;
                                this.nb = nb;
                            }

                            public getSum(): number[] {
                                return this.sum;
                            }

                            public setSum(sum: number[]): void {
                                this._isDirty = true;
                                this.sum = sum;
                            }

                            public calculateProbability(features: number[]): number {
                                var size: number = this.sum.length;
                                var avg: number[] = new Array();
                                var variances: number[] = new Array();
                                var p: number = 1;
                                for (var i: number = 0; i < size; i++) {
                                    avg[i] = this.sum[i] / this.nb;
                                    variances[i] = this.sumSquares[i] / this.nb - avg[i] * avg[i];
                                    p = p * (1 / Math.sqrt(2 * Math.PI * variances[i])) * Math.exp(-((features[i] - avg[i]) * (features[i] - avg[i])) / (2 * variances[i]));
                                }
                                return p;
                            }

                            public infer(features: number[]): boolean {
                                return (this.calculateProbability(features) <= this.epsilon);
                            }

                            public getAverage(): number[] {
                                if (this.nb != 0) {
                                    var size: number = this.sum.length;
                                    var avg: number[] = new Array();
                                    for (var i: number = 0; i < size; i++) {
                                        avg[i] = this.sum[i] / this.nb;
                                    }
                                    return avg;
                                } else {
                                    return null;
                                }
                            }

                            public train(features: number[], result: boolean, alpha: number): void {
                                var size: number = features.length;
                                if (this.nb == 0) {
                                    this.sumSquares = new Array();
                                    this.sum = new Array();
                                }
                                for (var i: number = 0; i < size; i++) {
                                    this.sum[i] += features[i];
                                    this.sumSquares[i] += features[i] * features[i];
                                }
                                this.nb++;
                                var proba: number = this.calculateProbability(features);
                                var diff: number = proba - this.epsilon;
                                if ((proba < this.epsilon && result == false) || (proba > this.epsilon && result == true)) {
                                    this.epsilon = this.epsilon + alpha * diff;
                                }
                                this._isDirty = true;
                            }

                            public getVariance(): number[] {
                                if (this.nb != 0) {
                                    var size: number = this.sum.length;
                                    var avg: number[] = new Array();
                                    var newvar: number[] = new Array();
                                    for (var i: number = 0; i < size; i++) {
                                        avg[i] = this.sum[i] / this.nb;
                                        newvar[i] = this.sumSquares[i] / this.nb - avg[i] * avg[i];
                                    }
                                    return newvar;
                                } else {
                                    return null;
                                }
                            }

                            public clear(): void {
                                this.nb = 0;
                                this.sum = null;
                                this.sumSquares = null;
                                this._isDirty = true;
                            }

                            public save(): string {
                                var sb: java.lang.StringBuilder = new java.lang.StringBuilder();
                                sb.append(this.nb + "/");
                                sb.append(this.epsilon + "/");
                                var size: number = this.sumSquares.length;
                                for (var i: number = 0; i < size; i++) {
                                    sb.append(this.sum[i] + "/");
                                }
                                for (var i: number = 0; i < size; i++) {
                                    sb.append(this.sumSquares[i] + "/");
                                }
                                return sb.toString();
                            }

                            public load(payload: string): void {
                                try {
                                    var previousState: string[] = payload.split("/");
                                    this.nb = java.lang.Integer.parseInt(previousState[0]);
                                    this.epsilon = java.lang.Double.parseDouble(previousState[1]);
                                    var size: number = (previousState.length - 2) / 2;
                                    this.sum = new Array();
                                    this.sumSquares = new Array();
                                    for (var i: number = 0; i < size; i++) {
                                        this.sum[i] = java.lang.Double.parseDouble(previousState[i + 2]);
                                    }
                                    for (var i: number = 0; i < size; i++) {
                                        this.sumSquares[i] = java.lang.Double.parseDouble(previousState[i + 2 + size]);
                                    }
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                        this.sum = null;
                                        this.sumSquares = null;
                                        this.nb = 0;
                                    }
                                 }
                                this._isDirty = false;
                            }

                            public isDirty(): boolean {
                                return this._isDirty;
                            }

                            public cloneState(): org.kevoree.modeling.api.KInferState {
                                var cloned: org.kevoree.modeling.api.infer.states.GaussianArrayKInferState = new org.kevoree.modeling.api.infer.states.GaussianArrayKInferState();
                                cloned.setNb(this.getNb());
                                if (this.nb != 0) {
                                    var newSum: number[] = new Array();
                                    var newSumSquares: number[] = new Array();
                                    for (var i: number = 0; i < this.sum.length; i++) {
                                        newSum[i] = this.sum[i];
                                        newSumSquares[i] = this.sumSquares[i];
                                    }
                                    cloned.setSum(newSum);
                                    cloned.setSumSquares(newSumSquares);
                                }
                                return cloned;
                            }

                            public getEpsilon(): number {
                                return this.epsilon;
                            }

                        }

                        export class PolynomialKInferState extends org.kevoree.modeling.api.KInferState {

                            private _isDirty: boolean = false;
                            private timeOrigin: number;
                            private unit: number;
                            private weights: number[];
                            public getTimeOrigin(): number {
                                return this.timeOrigin;
                            }

                            public setTimeOrigin(timeOrigin: number): void {
                                this.timeOrigin = timeOrigin;
                            }

                            public is_isDirty(): boolean {
                                return this._isDirty;
                            }

                            public getUnit(): number {
                                return this.unit;
                            }

                            public setUnit(unit: number): void {
                                this.unit = unit;
                            }

                            public static maxError(coef: number[], normalizedTimes: number[], results: number[]): number {
                                var maxErr: number = 0;
                                var temp: number = 0;
                                for (var i: number = 0; i < normalizedTimes.length; i++) {
                                    var val: number = org.kevoree.modeling.api.infer.states.PolynomialKInferState.internal_extrapolate(normalizedTimes[i], coef);
                                    temp = Math.abs(val - results[i]);
                                    if (temp > maxErr) {
                                        maxErr = temp;
                                    }
                                }
                                return maxErr;
                            }

                            private static internal_extrapolate(normalizedTime: number, coef: number[]): number {
                                var result: number = 0;
                                var power: number = 1;
                                for (var j: number = 0; j < coef.length; j++) {
                                    result += coef[j] * power;
                                    power = power * normalizedTime;
                                }
                                return result;
                            }

                            public save(): string {
                                var s: string = "";
                                var sb: java.lang.StringBuilder = new java.lang.StringBuilder();
                                sb.append(this.timeOrigin + "/");
                                sb.append(this.unit + "/");
                                if (this.weights != null) {
                                    for (var i: number = 0; i < this.weights.length; i++) {
                                        sb.append(this.weights[i] + "/");
                                    }
                                    s = sb.toString();
                                }
                                return s;
                            }

                            public load(payload: string): void {
                                try {
                                    var previousState: string[] = payload.split("/");
                                    if (previousState.length > 0) {
                                        this.timeOrigin = java.lang.Long.parseLong(previousState[0]);
                                        this.unit = java.lang.Long.parseLong(previousState[1]);
                                        var size: number = previousState.length - 2;
                                        this.weights = new Array();
                                        for (var i: number = 0; i < size; i++) {
                                            this.weights[i] = java.lang.Double.parseDouble(previousState[i - 2]);
                                        }
                                    }
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                    }
                                 }
                                this._isDirty = false;
                            }

                            public isDirty(): boolean {
                                return this._isDirty;
                            }

                            public set_isDirty(value: boolean): void {
                                this._isDirty = value;
                            }

                            public cloneState(): org.kevoree.modeling.api.KInferState {
                                var cloned: org.kevoree.modeling.api.infer.states.PolynomialKInferState = new org.kevoree.modeling.api.infer.states.PolynomialKInferState();
                                var clonearray: number[] = new Array();
                                for (var i: number = 0; i < this.weights.length; i++) {
                                    clonearray[i] = this.weights[i];
                                }
                                cloned.setWeights(clonearray);
                                cloned.setTimeOrigin(this.getTimeOrigin());
                                cloned.setUnit(this.getUnit());
                                return cloned;
                            }

                            public getWeights(): number[] {
                                return this.weights;
                            }

                            public setWeights(weights: number[]): void {
                                this.weights = weights;
                                this._isDirty = true;
                            }

                            public infer(time: number): any {
                                var t: number = (<number>(time - this.timeOrigin)) / this.unit;
                                return org.kevoree.modeling.api.infer.states.PolynomialKInferState.internal_extrapolate(t, this.weights);
                            }

                        }

                        export module Bayesian {
                            export class BayesianSubstate {

                                public calculateProbability(feature: any): number {
                                    throw "Abstract method";
                                }

                                public train(feature: any): void {
                                    throw "Abstract method";
                                }

                                public save(separator: string): string {
                                    throw "Abstract method";
                                }

                                public load(payload: string, separator: string): void {
                                    throw "Abstract method";
                                }

                                public cloneState(): org.kevoree.modeling.api.infer.states.Bayesian.BayesianSubstate {
                                    throw "Abstract method";
                                }

                            }

                            export class EnumSubstate extends org.kevoree.modeling.api.infer.states.Bayesian.BayesianSubstate {

                                private counter: number[];
                                private total: number = 0;
                                public getCounter(): number[] {
                                    return this.counter;
                                }

                                public setCounter(counter: number[]): void {
                                    this.counter = counter;
                                }

                                public getTotal(): number {
                                    return this.total;
                                }

                                public setTotal(total: number): void {
                                    this.total = total;
                                }

                                public initialize(number: number): void {
                                    this.counter = new Array();
                                }

                                public calculateProbability(feature: any): number {
                                    var res: number = <number>feature;
                                    var p: number = this.counter[res];
                                    if (this.total != 0) {
                                        return p / this.total;
                                    } else {
                                        return 0;
                                    }
                                }

                                public train(feature: any): void {
                                    var res: number = <number>feature;
                                    this.counter[res]++;
                                    this.total++;
                                }

                                public save(separator: string): string {
                                    if (this.counter == null || this.counter.length == 0) {
                                        return "EnumSubstate" + separator;
                                    }
                                    var sb: java.lang.StringBuilder = new java.lang.StringBuilder();
                                    sb.append("EnumSubstate" + separator);
                                    for (var i: number = 0; i < this.counter.length; i++) {
                                        sb.append(this.counter[i] + separator);
                                    }
                                    return sb.toString();
                                }

                                public load(payload: string, separator: string): void {
                                    var res: string[] = payload.split(separator);
                                    this.counter = new Array();
                                    this.total = 0;
                                    for (var i: number = 0; i < res.length; i++) {
                                        this.counter[i] = java.lang.Integer.parseInt(res[i]);
                                        this.total += this.counter[i];
                                    }
                                }

                                public cloneState(): org.kevoree.modeling.api.infer.states.Bayesian.BayesianSubstate {
                                    var cloned: org.kevoree.modeling.api.infer.states.Bayesian.EnumSubstate = new org.kevoree.modeling.api.infer.states.Bayesian.EnumSubstate();
                                    var newCounter: number[] = new Array();
                                    for (var i: number = 0; i < this.counter.length; i++) {
                                        newCounter[i] = this.counter[i];
                                    }
                                    cloned.setCounter(newCounter);
                                    cloned.setTotal(this.total);
                                    return cloned;
                                }

                            }

                            export class GaussianSubState extends org.kevoree.modeling.api.infer.states.Bayesian.BayesianSubstate {

                                private sumSquares: number = 0;
                                private sum: number = 0;
                                private nb: number = 0;
                                public getSumSquares(): number {
                                    return this.sumSquares;
                                }

                                public setSumSquares(sumSquares: number): void {
                                    this.sumSquares = sumSquares;
                                }

                                public getNb(): number {
                                    return this.nb;
                                }

                                public setNb(nb: number): void {
                                    this.nb = nb;
                                }

                                public getSum(): number {
                                    return this.sum;
                                }

                                public setSum(sum: number): void {
                                    this.sum = sum;
                                }

                                public calculateProbability(feature: any): number {
                                    var fet: number = <number>feature;
                                    var avg: number = this.sum / this.nb;
                                    var variances: number = this.sumSquares / this.nb - avg * avg;
                                    return (1 / Math.sqrt(2 * Math.PI * variances)) * Math.exp(-((fet - avg) * (fet - avg)) / (2 * variances));
                                }

                                public getAverage(): number {
                                    if (this.nb != 0) {
                                        var avg: number = this.sum / this.nb;
                                        return avg;
                                    } else {
                                        return null;
                                    }
                                }

                                public train(feature: any): void {
                                    var fet: number = <number>feature;
                                    this.sum += fet;
                                    this.sumSquares += fet * fet;
                                    this.nb++;
                                }

                                public getVariance(): number {
                                    if (this.nb != 0) {
                                        var avg: number = this.sum / this.nb;
                                        var newvar: number = this.sumSquares / this.nb - avg * avg;
                                        return newvar;
                                    } else {
                                        return null;
                                    }
                                }

                                public clear(): void {
                                    this.nb = 0;
                                    this.sum = 0;
                                    this.sumSquares = 0;
                                }

                                public save(separator: string): string {
                                    var sb: java.lang.StringBuilder = new java.lang.StringBuilder();
                                    sb.append("GaussianSubState" + separator);
                                    sb.append(this.nb + separator);
                                    sb.append(this.sum + separator);
                                    sb.append(this.sumSquares);
                                    return sb.toString();
                                }

                                public load(payload: string, separator: string): void {
                                    try {
                                        var previousState: string[] = payload.split(separator);
                                        this.nb = java.lang.Integer.parseInt(previousState[0]);
                                        this.sum = java.lang.Double.parseDouble(previousState[1]);
                                        this.sumSquares = java.lang.Double.parseDouble(previousState[2]);
                                    } catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                            this.sum = 0;
                                            this.sumSquares = 0;
                                            this.nb = 0;
                                        }
                                     }
                                }

                                public cloneState(): org.kevoree.modeling.api.infer.states.Bayesian.BayesianSubstate {
                                    var cloned: org.kevoree.modeling.api.infer.states.Bayesian.GaussianSubState = new org.kevoree.modeling.api.infer.states.Bayesian.GaussianSubState();
                                    cloned.setNb(this.getNb());
                                    cloned.setSum(this.getSum());
                                    cloned.setSumSquares(this.getSumSquares());
                                    return cloned;
                                }

                            }

                        }
                    }
                }
                export module json {
                    export class JsonFormat implements org.kevoree.modeling.api.ModelFormat {

                        private _view: org.kevoree.modeling.api.KView;
                        constructor(p_view: org.kevoree.modeling.api.KView) {
                            this._view = p_view;
                        }

                        public save(model: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any> {
                            if (org.kevoree.modeling.api.util.Checker.isDefined(model)) {
                                var wrapper: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                                org.kevoree.modeling.api.json.JsonModelSerializer.serialize(model, wrapper.initCallback());
                                return wrapper;
                            } else {
                                throw new java.lang.RuntimeException("one parameter is null");
                            }
                        }

                        public saveRoot(): org.kevoree.modeling.api.KDefer<any> {
                            var wrapper: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this._view.universe().model().manager().getRoot(this._view,  (root : org.kevoree.modeling.api.KObject) => {
                                if (root == null) {
                                    wrapper.initCallback()(null);
                                } else {
                                    org.kevoree.modeling.api.json.JsonModelSerializer.serialize(root, wrapper.initCallback());
                                }
                            });
                            return wrapper;
                        }

                        public load(payload: string): org.kevoree.modeling.api.KDefer<any> {
                            if (org.kevoree.modeling.api.util.Checker.isDefined(payload)) {
                                var wrapper: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                                org.kevoree.modeling.api.json.JsonModelLoader.load(this._view, payload, wrapper.initCallback());
                                return wrapper;
                            } else {
                                throw new java.lang.RuntimeException("one parameter is null");
                            }
                        }

                    }

                    export class JsonModelLoader {

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
                                    var alls: java.util.List<java.util.Map<string, any>> = new java.util.ArrayList<java.util.Map<string, any>>();
                                    var content: java.util.Map<string, any> = new java.util.HashMap<string, any>();
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
                                                    content = new java.util.HashMap<string, any>();
                                                } else {
                                                    if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.RIGHT_BRACE)) {
                                                        alls.add(content);
                                                        content = new java.util.HashMap<string, any>();
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
                                    var rootElem: org.kevoree.modeling.api.KObject = null;
                                    var mappedKeys: java.util.Map<number, number> = new java.util.HashMap<number, number>();
                                    for (var i: number = 0; i < alls.size(); i++) {
                                        try {
                                            var elem: java.util.Map<string, any> = alls.get(i);
                                            var kid: number = java.lang.Long.parseLong(elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID).toString());
                                            mappedKeys.put(kid, factory.universe().model().manager().nextObjectKey());
                                        } catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                e.printStackTrace();
                                            }
                                         }
                                    }
                                    for (var i: number = 0; i < alls.size(); i++) {
                                        try {
                                            var elem: java.util.Map<string, any> = alls.get(i);
                                            var kid: number = java.lang.Long.parseLong(elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID).toString());
                                            var meta: string = elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META).toString();
                                            var universeTree: org.kevoree.modeling.api.rbtree.LongRBTree = new org.kevoree.modeling.api.rbtree.LongRBTree();
                                            universeTree.insert(factory.universe().key(), factory.now());
                                            var metaClass: org.kevoree.modeling.api.meta.MetaClass = metaModel.metaClass(meta);
                                            var current: org.kevoree.modeling.api.KObject = (<org.kevoree.modeling.api.abs.AbstractKView>factory).createProxy(metaClass, universeTree, mappedKeys.get(kid));
                                            factory.universe().model().manager().initKObject(current, factory);
                                            var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = factory.universe().model().manager().entry(current, org.kevoree.modeling.api.data.manager.AccessMode.WRITE);
                                            var metaKeys: string[] = elem.keySet().toArray(new Array());
                                            for (var h: number = 0; h < metaKeys.length; h++) {
                                                var metaKey: string = metaKeys[h];
                                                var payload_content: any = elem.get(metaKey);
                                                if (metaKey.equals(org.kevoree.modeling.api.json.JsonModelSerializer.INBOUNDS_META)) {
                                                    var inbounds: java.util.Set<number> = new java.util.HashSet<number>();
                                                    raw.set(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX, inbounds);
                                                    try {
                                                        var raw_keys: java.util.HashSet<string> = <java.util.HashSet<string>>payload_content;
                                                        var raw_keys_p: string[] = raw_keys.toArray(new Array());
                                                        for (var hh: number = 0; hh < raw_keys_p.length; hh++) {
                                                            try {
                                                                var converted: number = java.lang.Long.parseLong(raw_keys_p[hh]);
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
                                                            var raw_k: number = java.lang.Long.parseLong(payload_content.toString());
                                                            if (mappedKeys.containsKey(raw_k)) {
                                                                raw_k = mappedKeys.get(raw_k);
                                                            }
                                                            raw.set(org.kevoree.modeling.api.data.manager.Index.PARENT_INDEX, raw_k);
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
                                                                var elems: string[] = parentRef_payload.split(org.kevoree.modeling.api.data.manager.JsonRaw.SEP);
                                                                if (elems.length == 2) {
                                                                    var foundMeta: org.kevoree.modeling.api.meta.MetaClass = metaModel.metaClass(elems[0].trim());
                                                                    if (foundMeta != null) {
                                                                        var metaReference: org.kevoree.modeling.api.meta.Meta = foundMeta.metaByName(elems[1].trim());
                                                                        if (metaReference != null && metaReference instanceof org.kevoree.modeling.api.abs.AbstractMetaReference) {
                                                                            raw.set(org.kevoree.modeling.api.data.manager.Index.REF_IN_PARENT_INDEX, metaReference);
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
                                                                if ("true".equals(payload_content)) {
                                                                    rootElem = current;
                                                                }
                                                            } else {
                                                                if (metaKey.equals(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META)) {
                                                                } else {
                                                                    var metaElement: org.kevoree.modeling.api.meta.Meta = metaClass.metaByName(metaKey);
                                                                    if (payload_content != null) {
                                                                        if (metaElement != null && metaElement.metaType().equals(org.kevoree.modeling.api.meta.MetaType.ATTRIBUTE)) {
                                                                            raw.set(metaElement.index(), (<org.kevoree.modeling.api.meta.MetaAttribute>metaElement).strategy().load(payload_content.toString(), <org.kevoree.modeling.api.meta.MetaAttribute>metaElement, factory.now()));
                                                                        } else {
                                                                            if (metaElement != null && metaElement instanceof org.kevoree.modeling.api.abs.AbstractMetaReference) {
                                                                                if ((<org.kevoree.modeling.api.meta.MetaReference>metaElement).single()) {
                                                                                    try {
                                                                                        var converted: number = java.lang.Long.parseLong(payload_content.toString());
                                                                                        if (mappedKeys.containsKey(converted)) {
                                                                                            converted = mappedKeys.get(converted);
                                                                                        }
                                                                                        raw.set(metaElement.index(), converted);
                                                                                    } catch ($ex$) {
                                                                                        if ($ex$ instanceof java.lang.Exception) {
                                                                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                                            e.printStackTrace();
                                                                                        }
                                                                                     }
                                                                                } else {
                                                                                    try {
                                                                                        var convertedRaw: java.util.Set<number> = new java.util.HashSet<number>();
                                                                                        var plainRawSet: java.util.Set<string> = <java.util.Set<string>>payload_content;
                                                                                        var plainRawList: string[] = plainRawSet.toArray(new Array());
                                                                                        for (var l: number = 0; l < plainRawList.length; l++) {
                                                                                            var plainRaw: string = plainRawList[l];
                                                                                            try {
                                                                                                var converted: number = java.lang.Long.parseLong(plainRaw);
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
                                                                                        raw.set(metaElement.index(), convertedRaw);
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
                                        } catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                e.printStackTrace();
                                            }
                                         }
                                    }
                                    if (rootElem != null) {
                                        factory.setRoot(rootElem).then( (throwable : java.lang.Throwable) => {
                                            if (callback != null) {
                                                callback(throwable);
                                            }
                                        });
                                    } else {
                                        if (callback != null) {
                                            callback(null);
                                        }
                                    }
                                }
                            }
                        }

                    }

                    export class JsonModelSerializer {

                        public static KEY_META: string = "@meta";
                        public static KEY_UUID: string = "@uuid";
                        public static KEY_ROOT: string = "@root";
                        public static PARENT_META: string = "@parent";
                        public static PARENT_REF_META: string = "@ref";
                        public static INBOUNDS_META: string = "@inbounds";
                        public static TIME_META: string = "@time";
                        public static DIM_META: string = "@universe";
                        public static serialize(model: org.kevoree.modeling.api.KObject, callback: (p : string) => void): void {
                            model.view().getRoot().then( (rootObj : org.kevoree.modeling.api.KObject) => {
                                var isRoot: boolean = false;
                                if (rootObj != null) {
                                    isRoot = rootObj.uuid() == model.uuid();
                                }
                                var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                                builder.append("[\n");
                                org.kevoree.modeling.api.json.JsonModelSerializer.printJSON(model, builder, isRoot);
                                model.visit( (elem : org.kevoree.modeling.api.KObject) => {
                                    var isRoot2: boolean = false;
                                    if (rootObj != null) {
                                        isRoot2 = rootObj.uuid() == elem.uuid();
                                    }
                                    builder.append(",\n");
                                    try {
                                        org.kevoree.modeling.api.json.JsonModelSerializer.printJSON(elem, builder, isRoot2);
                                    } catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                            e.printStackTrace();
                                            builder.append("{}");
                                        }
                                     }
                                    return org.kevoree.modeling.api.VisitResult.CONTINUE;
                                }, org.kevoree.modeling.api.VisitRequest.ALL).then( (throwable : java.lang.Throwable) => {
                                    builder.append("\n]\n");
                                    callback(builder.toString());
                                });
                            });
                        }

                        public static printJSON(elem: org.kevoree.modeling.api.KObject, builder: java.lang.StringBuilder, isRoot: boolean): void {
                            if (elem != null) {
                                var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = elem.view().universe().model().manager().entry(elem, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                                if (raw != null) {
                                    builder.append(org.kevoree.modeling.api.data.manager.JsonRaw.encode(raw, elem.uuid(), elem.metaClass(), false, isRoot));
                                }
                            }
                        }

                    }

                    export class JsonString {

                        private static ESCAPE_CHAR: string = '\\';
                        public static encodeBuffer(buffer: java.lang.StringBuilder, chain: string): void {
                            if (chain == null) {
                                return;
                            }
                            var i: number = 0;
                            while (i < chain.length){
                                var ch: string = chain.charAt(i);
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
                            var i: number = 0;
                            while (i < src.length){
                                var current: string = src.charAt(i);
                                if (current == JsonString.ESCAPE_CHAR) {
                                    if (builder == null) {
                                        builder = new java.lang.StringBuilder();
                                        builder.append(src.substring(0, i));
                                    }
                                    i++;
                                    var current2: string = src.charAt(i);
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
                                        case '{': 
                                        builder.append("\\{");
                                        break;
                                        case '}': 
                                        builder.append("\\}");
                                        break;
                                        case '[': 
                                        builder.append("\\[");
                                        break;
                                        case ']': 
                                        builder.append("\\]");
                                        break;
                                        case ',': 
                                        builder.append("\\,");
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

                    }

                    export class JsonToken {

                        private _tokenType: org.kevoree.modeling.api.json.Type;
                        private _value: any;
                        constructor(p_tokenType: org.kevoree.modeling.api.json.Type, p_value: any) {
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

                        public value(): any {
                            return this._value;
                        }

                    }

                    export class Lexer {

                        private bytes: string;
                        private EOF: org.kevoree.modeling.api.json.JsonToken;
                        private BOOLEAN_LETTERS: java.util.HashSet<string> = null;
                        private DIGIT: java.util.HashSet<string> = null;
                        private index: number = 0;
                        private static DEFAULT_BUFFER_SIZE: number = 1024 * 4;
                        constructor(payload: string) {
                            this.bytes = payload;
                            this.EOF = new org.kevoree.modeling.api.json.JsonToken(org.kevoree.modeling.api.json.Type.EOF, null);
                        }

                        public isSpace(c: string): boolean {
                            return c == ' ' || c == '\r' || c == '\n' || c == '\t';
                        }

                        private nextChar(): string {
                            return this.bytes.charAt(this.index++);
                        }

                        private peekChar(): string {
                            return this.bytes.charAt(this.index);
                        }

                        private isDone(): boolean {
                            return this.index >= this.bytes.length;
                        }

                        private isBooleanLetter(c: string): boolean {
                            if (this.BOOLEAN_LETTERS == null) {
                                this.BOOLEAN_LETTERS = new java.util.HashSet<string>();
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

                        private isDigit(c: string): boolean {
                            if (this.DIGIT == null) {
                                this.DIGIT = new java.util.HashSet<string>();
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

                        private isValueLetter(c: string): boolean {
                            return c == '-' || c == '+' || c == '.' || this.isDigit(c) || this.isBooleanLetter(c);
                        }

                        public nextToken(): org.kevoree.modeling.api.json.JsonToken {
                            if (this.isDone()) {
                                return this.EOF;
                            }
                            var tokenType: org.kevoree.modeling.api.json.Type = org.kevoree.modeling.api.json.Type.EOF;
                            var c: string = this.nextChar();
                            var currentValue: java.lang.StringBuilder = new java.lang.StringBuilder();
                            var jsonValue: any = null;
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

                    }

                    export class Type {

                        public static VALUE: Type = new Type(0);
                        public static LEFT_BRACE: Type = new Type(1);
                        public static RIGHT_BRACE: Type = new Type(2);
                        public static LEFT_BRACKET: Type = new Type(3);
                        public static RIGHT_BRACKET: Type = new Type(4);
                        public static COMMA: Type = new Type(5);
                        public static COLON: Type = new Type(6);
                        public static EOF: Type = new Type(42);
                        private _value: number;
                        constructor(p_value: number) {
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
                    }

                }
                export module meta {
                    export interface Meta {

                        index(): number;

                        metaName(): string;

                        metaType(): org.kevoree.modeling.api.meta.MetaType;

                    }

                    export interface MetaAttribute extends org.kevoree.modeling.api.meta.Meta {

                        key(): boolean;

                        attributeType(): org.kevoree.modeling.api.KType;

                        strategy(): org.kevoree.modeling.api.extrapolation.Extrapolation;

                        precision(): number;

                        setExtrapolation(extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation): void;

                    }

                    export interface MetaClass extends org.kevoree.modeling.api.meta.Meta {

                        metaElements(): org.kevoree.modeling.api.meta.Meta[];

                        meta(index: number): org.kevoree.modeling.api.meta.Meta;

                        metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[];

                        metaReferences(): org.kevoree.modeling.api.meta.MetaReference[];

                        metaByName(name: string): org.kevoree.modeling.api.meta.Meta;

                    }

                    export class MetaInferClass implements org.kevoree.modeling.api.meta.MetaClass {

                        private static _INSTANCE: org.kevoree.modeling.api.meta.MetaInferClass = null;
                        private _attributes: org.kevoree.modeling.api.meta.MetaAttribute[] = null;
                        private _metaReferences: org.kevoree.modeling.api.meta.MetaReference[] = new Array();
                        public static getInstance(): org.kevoree.modeling.api.meta.MetaInferClass {
                            if (MetaInferClass._INSTANCE == null) {
                                MetaInferClass._INSTANCE = new org.kevoree.modeling.api.meta.MetaInferClass();
                            }
                            return MetaInferClass._INSTANCE;
                        }

                        public getRaw(): org.kevoree.modeling.api.meta.MetaAttribute {
                            return this._attributes[0];
                        }

                        public getCache(): org.kevoree.modeling.api.meta.MetaAttribute {
                            return this._attributes[1];
                        }

                        constructor() {
                            this._attributes = new Array();
                            this._attributes[0] = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("RAW", org.kevoree.modeling.api.data.manager.Index.RESERVED_INDEXES, -1, false, org.kevoree.modeling.api.meta.PrimitiveTypes.STRING, new org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation());
                            this._attributes[1] = new org.kevoree.modeling.api.abs.AbstractMetaAttribute("CACHE", org.kevoree.modeling.api.data.manager.Index.RESERVED_INDEXES + 1, -1, false, org.kevoree.modeling.api.meta.PrimitiveTypes.TRANSIENT, new org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation());
                        }

                        public metaElements(): org.kevoree.modeling.api.meta.Meta[] {
                            return new Array();
                        }

                        public meta(index: number): org.kevoree.modeling.api.meta.Meta {
                            var offset: number = index - org.kevoree.modeling.api.data.manager.Index.RESERVED_INDEXES;
                            if (offset == 0 || offset == 1) {
                                return this._attributes[offset];
                            } else {
                                return null;
                            }
                        }

                        public metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[] {
                            return this._attributes;
                        }

                        public metaReferences(): org.kevoree.modeling.api.meta.MetaReference[] {
                            return this._metaReferences;
                        }

                        public metaByName(name: string): org.kevoree.modeling.api.meta.Meta {
                            return null;
                        }

                        public metaName(): string {
                            return "KInfer";
                        }

                        public metaType(): org.kevoree.modeling.api.meta.MetaType {
                            return org.kevoree.modeling.api.meta.MetaType.CLASS;
                        }

                        public index(): number {
                            return -1;
                        }

                    }

                    export interface MetaModel extends org.kevoree.modeling.api.meta.Meta {

                        metaClasses(): org.kevoree.modeling.api.meta.MetaClass[];

                        metaClass(name: string): org.kevoree.modeling.api.meta.MetaClass;

                    }

                    export interface MetaOperation extends org.kevoree.modeling.api.meta.Meta {

                        origin(): org.kevoree.modeling.api.meta.Meta;

                    }

                    export interface MetaReference extends org.kevoree.modeling.api.meta.Meta {

                        contained(): boolean;

                        single(): boolean;

                        attributeType(): org.kevoree.modeling.api.meta.MetaClass;

                        opposite(): org.kevoree.modeling.api.meta.MetaReference;

                        origin(): org.kevoree.modeling.api.meta.MetaClass;

                    }

                    export class MetaType {

                        public static ATTRIBUTE: MetaType = new MetaType();
                        public static REFERENCE: MetaType = new MetaType();
                        public static OPERATION: MetaType = new MetaType();
                        public static CLASS: MetaType = new MetaType();
                        public static MODEL: MetaType = new MetaType();
                        public equals(other: any): boolean {
                            return this == other;
                        }
                        public static _MetaTypeVALUES : MetaType[] = [
                            MetaType.ATTRIBUTE
                            ,MetaType.REFERENCE
                            ,MetaType.OPERATION
                            ,MetaType.CLASS
                            ,MetaType.MODEL
                        ];
                        public static values():MetaType[]{
                            return MetaType._MetaTypeVALUES;
                        }
                    }

                    export class PrimitiveTypes {

                        public static STRING: org.kevoree.modeling.api.KType = new org.kevoree.modeling.api.abs.AbstractKDataType("STRING", false);
                        public static LONG: org.kevoree.modeling.api.KType = new org.kevoree.modeling.api.abs.AbstractKDataType("LONG", false);
                        public static INT: org.kevoree.modeling.api.KType = new org.kevoree.modeling.api.abs.AbstractKDataType("INT", false);
                        public static BOOL: org.kevoree.modeling.api.KType = new org.kevoree.modeling.api.abs.AbstractKDataType("BOOL", false);
                        public static SHORT: org.kevoree.modeling.api.KType = new org.kevoree.modeling.api.abs.AbstractKDataType("SHORT", false);
                        public static DOUBLE: org.kevoree.modeling.api.KType = new org.kevoree.modeling.api.abs.AbstractKDataType("DOUBLE", false);
                        public static FLOAT: org.kevoree.modeling.api.KType = new org.kevoree.modeling.api.abs.AbstractKDataType("FLOAT", false);
                        public static TRANSIENT: org.kevoree.modeling.api.KType = new org.kevoree.modeling.api.abs.AbstractKDataType("TRANSIENT", false);
                    }

                }
                export module msg {
                    export class KAtomicGetRequest implements org.kevoree.modeling.api.msg.KMessage {

                        public id: number;
                        public key: org.kevoree.modeling.api.data.cache.KContentKey;
                        public operation: org.kevoree.modeling.api.data.cdn.AtomicOperation;
                        public json(): string {
                            var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonStart(buffer);
                            org.kevoree.modeling.api.msg.KMessageHelper.printType(buffer, this.type());
                            org.kevoree.modeling.api.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.api.msg.KMessageLoader.ID_NAME, buffer);
                            org.kevoree.modeling.api.msg.KMessageHelper.printElem(this.key, org.kevoree.modeling.api.msg.KMessageLoader.KEY_NAME, buffer);
                            if (this.operation != null) {
                                org.kevoree.modeling.api.msg.KMessageHelper.printElem(this.operation.operationKey(), org.kevoree.modeling.api.msg.KMessageLoader.OPERATION_NAME, buffer);
                            }
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonEnd(buffer);
                            return buffer.toString();
                        }

                        public type(): number {
                            return org.kevoree.modeling.api.msg.KMessageLoader.GET_REQ_TYPE;
                        }

                    }

                    export class KAtomicGetResult implements org.kevoree.modeling.api.msg.KMessage {

                        public id: number;
                        public value: string;
                        public json(): string {
                            var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonStart(buffer);
                            org.kevoree.modeling.api.msg.KMessageHelper.printType(buffer, this.type());
                            org.kevoree.modeling.api.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.api.msg.KMessageLoader.ID_NAME, buffer);
                            org.kevoree.modeling.api.msg.KMessageHelper.printElem(this.value, org.kevoree.modeling.api.msg.KMessageLoader.VALUE_NAME, buffer);
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonEnd(buffer);
                            return buffer.toString();
                        }

                        public type(): number {
                            return org.kevoree.modeling.api.msg.KMessageLoader.GET_REQ_TYPE;
                        }

                    }

                    export class KEventMessage implements org.kevoree.modeling.api.msg.KMessage {

                        public key: org.kevoree.modeling.api.data.cache.KContentKey;
                        public meta: number[];
                        public json(): string {
                            var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonStart(buffer);
                            org.kevoree.modeling.api.msg.KMessageHelper.printType(buffer, this.type());
                            org.kevoree.modeling.api.msg.KMessageHelper.printElem(this.key, org.kevoree.modeling.api.msg.KMessageLoader.KEY_NAME, buffer);
                            if (this.meta != null) {
                                buffer.append(",");
                                buffer.append("\"");
                                buffer.append(org.kevoree.modeling.api.msg.KMessageLoader.VALUES_NAME).append("\":[");
                                for (var i: number = 0; i < this.meta.length; i++) {
                                    if (i != 0) {
                                        buffer.append(",");
                                    }
                                    buffer.append("\"");
                                    buffer.append(this.meta[i]);
                                    buffer.append("\"");
                                }
                                buffer.append("]\n");
                            }
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonEnd(buffer);
                            return buffer.toString();
                        }

                        public type(): number {
                            return org.kevoree.modeling.api.msg.KMessageLoader.EVENT_TYPE;
                        }

                    }

                    export class KGetRequest implements org.kevoree.modeling.api.msg.KMessage {

                        public id: number;
                        public keys: org.kevoree.modeling.api.data.cache.KContentKey[];
                        public json(): string {
                            var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonStart(buffer);
                            org.kevoree.modeling.api.msg.KMessageHelper.printType(buffer, this.type());
                            org.kevoree.modeling.api.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.api.msg.KMessageLoader.ID_NAME, buffer);
                            if (this.keys != null) {
                                buffer.append(",");
                                buffer.append("\"");
                                buffer.append(org.kevoree.modeling.api.msg.KMessageLoader.KEYS_NAME).append("\":[");
                                for (var i: number = 0; i < this.keys.length; i++) {
                                    if (i != 0) {
                                        buffer.append(",");
                                    }
                                    buffer.append("\"");
                                    buffer.append(this.keys[i].toString());
                                    buffer.append("\"");
                                }
                                buffer.append("]\n");
                            }
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonEnd(buffer);
                            return buffer.toString();
                        }

                        public type(): number {
                            return org.kevoree.modeling.api.msg.KMessageLoader.GET_REQ_TYPE;
                        }

                    }

                    export class KGetResult implements org.kevoree.modeling.api.msg.KMessage {

                        public id: number;
                        public values: string[];
                        public json(): string {
                            var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonStart(buffer);
                            org.kevoree.modeling.api.msg.KMessageHelper.printType(buffer, this.type());
                            org.kevoree.modeling.api.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.api.msg.KMessageLoader.ID_NAME, buffer);
                            if (this.values != null) {
                                buffer.append(",");
                                buffer.append("\"");
                                buffer.append(org.kevoree.modeling.api.msg.KMessageLoader.VALUES_NAME).append("\":[");
                                for (var i: number = 0; i < this.values.length; i++) {
                                    if (i != 0) {
                                        buffer.append(",");
                                    }
                                    buffer.append("\"");
                                    buffer.append(org.kevoree.modeling.api.json.JsonString.encode(this.values[i]));
                                    buffer.append("\"");
                                }
                                buffer.append("]\n");
                            }
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonEnd(buffer);
                            return buffer.toString();
                        }

                        public type(): number {
                            return org.kevoree.modeling.api.msg.KMessageLoader.GET_RES_TYPE;
                        }

                    }

                    export interface KMessage {

                        json(): string;

                        type(): number;

                    }

                    export class KMessageHelper {

                        public static printJsonStart(builder: java.lang.StringBuilder): void {
                            builder.append("{\n");
                        }

                        public static printJsonEnd(builder: java.lang.StringBuilder): void {
                            builder.append("}\n");
                        }

                        public static printType(builder: java.lang.StringBuilder, type: number): void {
                            builder.append("\"");
                            builder.append(org.kevoree.modeling.api.msg.KMessageLoader.TYPE_NAME);
                            builder.append("\":\"");
                            builder.append(type);
                            builder.append("\"\n");
                        }

                        public static printElem(elem: any, name: string, builder: java.lang.StringBuilder): void {
                            if (elem != null) {
                                builder.append(",");
                                builder.append("\"");
                                builder.append(name);
                                builder.append("\":\"");
                                builder.append(elem.toString());
                                builder.append("\"\n");
                            }
                        }

                    }

                    export class KMessageLoader {

                        public static TYPE_NAME: string = "type";
                        public static OPERATION_NAME: string = "op";
                        public static KEY_NAME: string = "key";
                        public static KEYS_NAME: string = "keys";
                        public static ID_NAME: string = "id";
                        public static VALUE_NAME: string = "value";
                        public static VALUES_NAME: string = "values";
                        public static EVENT_TYPE: number = 0;
                        public static GET_REQ_TYPE: number = 1;
                        public static GET_RES_TYPE: number = 2;
                        public static PUT_REQ_TYPE: number = 3;
                        public static PUT_RES_TYPE: number = 4;
                        public static OPERATION_CALL_TYPE: number = 5;
                        public static OPERATION_RESULT_TYPE: number = 6;
                        public static ATOMIC_OPERATION_REQUEST_TYPE: number = 7;
                        public static ATOMIC_OPERATION_RESULT_TYPE: number = 8;
                        public static load(payload: string): org.kevoree.modeling.api.msg.KMessage {
                            var lexer: org.kevoree.modeling.api.json.Lexer = new org.kevoree.modeling.api.json.Lexer(payload);
                            var content: java.util.Map<string, any> = new java.util.HashMap<string, any>();
                            var currentAttributeName: string = null;
                            var arrayPayload: java.util.Set<string> = null;
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
                                            content = new java.util.HashMap<string, any>();
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
                            try {
                                var parsedType: number = java.lang.Integer.parseInt(content.get(KMessageLoader.TYPE_NAME).toString());
                                if (parsedType == KMessageLoader.EVENT_TYPE) {
                                    var eventMessage: org.kevoree.modeling.api.msg.KEventMessage = new org.kevoree.modeling.api.msg.KEventMessage();
                                    if (content.get(KMessageLoader.KEY_NAME) != null) {
                                        eventMessage.key = org.kevoree.modeling.api.data.cache.KContentKey.create(content.get(KMessageLoader.KEY_NAME).toString());
                                    }
                                    if (content.get(KMessageLoader.VALUES_NAME) != null) {
                                        var metaInt: java.util.HashSet<string> = <java.util.HashSet<string>>content.get(KMessageLoader.VALUES_NAME);
                                        var toFlat: string[] = metaInt.toArray(new Array());
                                        var nbElem: number[] = new Array();
                                        for (var i: number = 0; i < toFlat.length; i++) {
                                            nbElem[i] = java.lang.Integer.parseInt(toFlat[i]);
                                        }
                                        eventMessage.meta = nbElem;
                                    }
                                    return eventMessage;
                                } else {
                                    if (parsedType == KMessageLoader.GET_REQ_TYPE) {
                                        var getKeysRequest: org.kevoree.modeling.api.msg.KGetRequest = new org.kevoree.modeling.api.msg.KGetRequest();
                                        if (content.get(KMessageLoader.ID_NAME) != null) {
                                            getKeysRequest.id = java.lang.Long.parseLong(content.get(KMessageLoader.ID_NAME).toString());
                                        }
                                        if (content.get(KMessageLoader.KEYS_NAME) != null) {
                                            var metaInt: java.util.HashSet<string> = <java.util.HashSet<string>>content.get(KMessageLoader.KEYS_NAME);
                                            var toFlat: string[] = metaInt.toArray(new Array());
                                            var keys: org.kevoree.modeling.api.data.cache.KContentKey[] = new Array();
                                            for (var i: number = 0; i < toFlat.length; i++) {
                                                keys[i] = org.kevoree.modeling.api.data.cache.KContentKey.create(toFlat[i]);
                                            }
                                            getKeysRequest.keys = keys;
                                        }
                                        return getKeysRequest;
                                    } else {
                                        if (parsedType == KMessageLoader.GET_RES_TYPE) {
                                            var getResult: org.kevoree.modeling.api.msg.KGetResult = new org.kevoree.modeling.api.msg.KGetResult();
                                            if (content.get(KMessageLoader.ID_NAME) != null) {
                                                getResult.id = java.lang.Long.parseLong(content.get(KMessageLoader.ID_NAME).toString());
                                            }
                                            if (content.get(KMessageLoader.VALUES_NAME) != null) {
                                                var metaInt: java.util.HashSet<string> = <java.util.HashSet<string>>content.get(KMessageLoader.VALUES_NAME);
                                                var toFlat: string[] = metaInt.toArray(new Array());
                                                var values: string[] = new Array();
                                                for (var i: number = 0; i < toFlat.length; i++) {
                                                    values[i] = org.kevoree.modeling.api.json.JsonString.unescape(toFlat[i]);
                                                }
                                                getResult.values = values;
                                            }
                                            return getResult;
                                        } else {
                                            if (parsedType == KMessageLoader.PUT_REQ_TYPE) {
                                                var putRequest: org.kevoree.modeling.api.msg.KPutRequest = new org.kevoree.modeling.api.msg.KPutRequest();
                                                if (content.get(KMessageLoader.ID_NAME) != null) {
                                                    putRequest.id = java.lang.Long.parseLong(content.get(KMessageLoader.ID_NAME).toString());
                                                }
                                                var toFlatKeys: string[] = null;
                                                var toFlatValues: string[] = null;
                                                if (content.get(KMessageLoader.KEYS_NAME) != null) {
                                                    var metaKeys: java.util.HashSet<string> = <java.util.HashSet<string>>content.get(KMessageLoader.KEYS_NAME);
                                                    toFlatKeys = metaKeys.toArray(new Array());
                                                }
                                                if (content.get(KMessageLoader.VALUES_NAME) != null) {
                                                    var metaValues: java.util.HashSet<string> = <java.util.HashSet<string>>content.get(KMessageLoader.VALUES_NAME);
                                                    toFlatValues = metaValues.toArray(new Array());
                                                }
                                                if (toFlatKeys != null && toFlatValues != null && toFlatKeys.length == toFlatValues.length) {
                                                    if (putRequest.request == null) {
                                                        putRequest.request = new org.kevoree.modeling.api.data.cdn.KContentPutRequest(toFlatKeys.length);
                                                    }
                                                    for (var i: number = 0; i < toFlatKeys.length; i++) {
                                                        putRequest.request.put(org.kevoree.modeling.api.data.cache.KContentKey.create(toFlatKeys[i]), org.kevoree.modeling.api.json.JsonString.unescape(toFlatValues[i]));
                                                    }
                                                }
                                                return putRequest;
                                            } else {
                                                if (parsedType == KMessageLoader.PUT_RES_TYPE) {
                                                    var putResult: org.kevoree.modeling.api.msg.KPutResult = new org.kevoree.modeling.api.msg.KPutResult();
                                                    if (content.get(KMessageLoader.ID_NAME) != null) {
                                                        putResult.id = java.lang.Long.parseLong(content.get(KMessageLoader.ID_NAME).toString());
                                                    }
                                                    return putResult;
                                                } else {
                                                    if (parsedType == KMessageLoader.OPERATION_CALL_TYPE) {
                                                        var callMessage: org.kevoree.modeling.api.msg.KOperationCallMessage = new org.kevoree.modeling.api.msg.KOperationCallMessage();
                                                        if (content.get(KMessageLoader.ID_NAME) != null) {
                                                            callMessage.id = java.lang.Long.parseLong(content.get(KMessageLoader.ID_NAME).toString());
                                                        }
                                                        if (content.get(KMessageLoader.KEY_NAME) != null) {
                                                            callMessage.key = org.kevoree.modeling.api.data.cache.KContentKey.create(content.get(KMessageLoader.KEY_NAME).toString());
                                                        }
                                                        if (content.get(KMessageLoader.VALUES_NAME) != null) {
                                                            var metaParams: java.util.HashSet<string> = <java.util.HashSet<string>>content.get(KMessageLoader.VALUES_NAME);
                                                            var toFlat: string[] = metaParams.toArray(new Array());
                                                            callMessage.params = toFlat;
                                                        }
                                                        return callMessage;
                                                    } else {
                                                        if (parsedType == KMessageLoader.OPERATION_RESULT_TYPE) {
                                                            var resultMessage: org.kevoree.modeling.api.msg.KOperationResultMessage = new org.kevoree.modeling.api.msg.KOperationResultMessage();
                                                            if (content.get(KMessageLoader.ID_NAME) != null) {
                                                                resultMessage.id = java.lang.Long.parseLong(content.get(KMessageLoader.ID_NAME).toString());
                                                            }
                                                            if (content.get(KMessageLoader.VALUE_NAME) != null) {
                                                                resultMessage.value = content.get(KMessageLoader.VALUE_NAME).toString();
                                                            }
                                                            return resultMessage;
                                                        } else {
                                                            if (parsedType == KMessageLoader.ATOMIC_OPERATION_REQUEST_TYPE) {
                                                                var atomicGetMessage: org.kevoree.modeling.api.msg.KAtomicGetRequest = new org.kevoree.modeling.api.msg.KAtomicGetRequest();
                                                                if (content.get(KMessageLoader.ID_NAME) != null) {
                                                                    atomicGetMessage.id = java.lang.Long.parseLong(content.get(KMessageLoader.ID_NAME).toString());
                                                                }
                                                                if (content.get(KMessageLoader.KEY_NAME) != null) {
                                                                    atomicGetMessage.key = org.kevoree.modeling.api.data.cache.KContentKey.create(content.get(KMessageLoader.KEY_NAME).toString());
                                                                }
                                                                if (content.get(KMessageLoader.OPERATION_NAME) != null) {
                                                                    atomicGetMessage.operation = org.kevoree.modeling.api.data.cdn.AtomicOperationFactory.getOperationWithKey(java.lang.Integer.parseInt(<string>content.get(KMessageLoader.OPERATION_NAME)));
                                                                }
                                                                return atomicGetMessage;
                                                            } else {
                                                                if (parsedType == KMessageLoader.ATOMIC_OPERATION_RESULT_TYPE) {
                                                                    var atomicGetResultMessage: org.kevoree.modeling.api.msg.KAtomicGetResult = new org.kevoree.modeling.api.msg.KAtomicGetResult();
                                                                    if (content.get(KMessageLoader.ID_NAME) != null) {
                                                                        atomicGetResultMessage.id = java.lang.Long.parseLong(content.get(KMessageLoader.ID_NAME).toString());
                                                                    }
                                                                    if (content.get(KMessageLoader.VALUE_NAME) != null) {
                                                                        atomicGetResultMessage.value = content.get(KMessageLoader.VALUE_NAME).toString();
                                                                    }
                                                                    return atomicGetResultMessage;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                return null;
                            } catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                    e.printStackTrace();
                                    return null;
                                }
                             }
                        }

                    }

                    export class KOperationCallMessage implements org.kevoree.modeling.api.msg.KMessage {

                        public id: number;
                        public key: org.kevoree.modeling.api.data.cache.KContentKey;
                        public params: string[];
                        public json(): string {
                            var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonStart(buffer);
                            org.kevoree.modeling.api.msg.KMessageHelper.printType(buffer, this.type());
                            org.kevoree.modeling.api.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.api.msg.KMessageLoader.ID_NAME, buffer);
                            org.kevoree.modeling.api.msg.KMessageHelper.printElem(this.key, org.kevoree.modeling.api.msg.KMessageLoader.KEY_NAME, buffer);
                            if (this.params != null) {
                                buffer.append(",\"");
                                buffer.append(org.kevoree.modeling.api.msg.KMessageLoader.VALUES_NAME).append("\":[");
                                for (var i: number = 0; i < this.params.length; i++) {
                                    if (i != 0) {
                                        buffer.append(",");
                                    }
                                    buffer.append("\"");
                                    buffer.append(this.params[i]);
                                    buffer.append("\"");
                                }
                                buffer.append("]\n");
                            }
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonEnd(buffer);
                            return buffer.toString();
                        }

                        public type(): number {
                            return org.kevoree.modeling.api.msg.KMessageLoader.OPERATION_CALL_TYPE;
                        }

                    }

                    export class KOperationResultMessage implements org.kevoree.modeling.api.msg.KMessage {

                        public id: number;
                        public value: string;
                        public json(): string {
                            var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonStart(buffer);
                            org.kevoree.modeling.api.msg.KMessageHelper.printType(buffer, this.type());
                            org.kevoree.modeling.api.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.api.msg.KMessageLoader.ID_NAME, buffer);
                            org.kevoree.modeling.api.msg.KMessageHelper.printElem(this.value, org.kevoree.modeling.api.msg.KMessageLoader.VALUE_NAME, buffer);
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonEnd(buffer);
                            return buffer.toString();
                        }

                        public type(): number {
                            return org.kevoree.modeling.api.msg.KMessageLoader.OPERATION_RESULT_TYPE;
                        }

                    }

                    export class KPutRequest implements org.kevoree.modeling.api.msg.KMessage {

                        public request: org.kevoree.modeling.api.data.cdn.KContentPutRequest;
                        public id: number;
                        public json(): string {
                            var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonStart(buffer);
                            org.kevoree.modeling.api.msg.KMessageHelper.printType(buffer, this.type());
                            org.kevoree.modeling.api.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.api.msg.KMessageLoader.ID_NAME, buffer);
                            if (this.request != null) {
                                buffer.append(",\"");
                                buffer.append(org.kevoree.modeling.api.msg.KMessageLoader.KEYS_NAME).append("\":[");
                                for (var i: number = 0; i < this.request.size(); i++) {
                                    if (i != 0) {
                                        buffer.append(",");
                                    }
                                    buffer.append("\"");
                                    buffer.append(this.request.getKey(i));
                                    buffer.append("\"");
                                }
                                buffer.append("]\n");
                                buffer.append(",\"");
                                buffer.append(org.kevoree.modeling.api.msg.KMessageLoader.VALUES_NAME).append("\":[");
                                for (var i: number = 0; i < this.request.size(); i++) {
                                    if (i != 0) {
                                        buffer.append(",");
                                    }
                                    buffer.append("\"");
                                    buffer.append(org.kevoree.modeling.api.json.JsonString.encode(this.request.getContent(i)));
                                    buffer.append("\"");
                                }
                                buffer.append("]\n");
                            }
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonEnd(buffer);
                            return buffer.toString();
                        }

                        public type(): number {
                            return org.kevoree.modeling.api.msg.KMessageLoader.PUT_REQ_TYPE;
                        }

                    }

                    export class KPutResult implements org.kevoree.modeling.api.msg.KMessage {

                        public id: number;
                        public json(): string {
                            var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonStart(buffer);
                            org.kevoree.modeling.api.msg.KMessageHelper.printType(buffer, this.type());
                            org.kevoree.modeling.api.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.api.msg.KMessageLoader.ID_NAME, buffer);
                            org.kevoree.modeling.api.msg.KMessageHelper.printJsonEnd(buffer);
                            return buffer.toString();
                        }

                        public type(): number {
                            return org.kevoree.modeling.api.msg.KMessageLoader.PUT_RES_TYPE;
                        }

                    }

                }
                export module operation {
                    export class DefaultModelCompare {

                        public static diff(origin: org.kevoree.modeling.api.KObject, target: org.kevoree.modeling.api.KObject, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.internal_diff(origin, target, false, false, callback);
                        }

                        public static merge(origin: org.kevoree.modeling.api.KObject, target: org.kevoree.modeling.api.KObject, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.internal_diff(origin, target, false, true, callback);
                        }

                        public static intersection(origin: org.kevoree.modeling.api.KObject, target: org.kevoree.modeling.api.KObject, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.internal_diff(origin, target, true, false, callback);
                        }

                        private static internal_diff(origin: org.kevoree.modeling.api.KObject, target: org.kevoree.modeling.api.KObject, inter: boolean, merge: boolean, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
                            var traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
                            var tracesRef: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
                            var objectsMap: java.util.Map<number, org.kevoree.modeling.api.KObject> = new java.util.HashMap<number, org.kevoree.modeling.api.KObject>();
                            traces.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(origin, target, inter, merge, false, true));
                            tracesRef.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(origin, target, inter, merge, true, false));
                            origin.visit( (elem : org.kevoree.modeling.api.KObject) => {
                                objectsMap.put(elem.uuid(), elem);
                                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            }, org.kevoree.modeling.api.VisitRequest.CONTAINED).then( (throwable : java.lang.Throwable) => {
                                if (throwable != null) {
                                    throwable.printStackTrace();
                                    callback(null);
                                } else {
                                    target.visit( (elem : org.kevoree.modeling.api.KObject) => {
                                        var childUUID: number = elem.uuid();
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
                                    }, org.kevoree.modeling.api.VisitRequest.CONTAINED).then( (throwable : java.lang.Throwable) => {
                                        if (throwable != null) {
                                            throwable.printStackTrace();
                                            callback(null);
                                        } else {
                                            traces.addAll(tracesRef);
                                            if (!inter && !merge) {
                                                var diffChildKeys: number[] = objectsMap.keySet().toArray(new Array());
                                                for (var i: number = 0; i < diffChildKeys.length; i++) {
                                                    var diffChildKey: number = diffChildKeys[i];
                                                    var diffChild: org.kevoree.modeling.api.KObject = objectsMap.get(diffChildKey);
                                                    var src: number = diffChild.parentUuid();
                                                    traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(src, diffChild.referenceInParent(), diffChild.uuid()));
                                                }
                                            }
                                            callback(new org.kevoree.modeling.api.trace.TraceSequence().populate(traces));
                                        }
                                    });
                                }
                            });
                        }

                        private static internal_createTraces(current: org.kevoree.modeling.api.KObject, sibling: org.kevoree.modeling.api.KObject, inter: boolean, merge: boolean, references: boolean, attributes: boolean): java.util.List<org.kevoree.modeling.api.trace.ModelTrace> {
                            var traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
                            var values: java.util.Map<org.kevoree.modeling.api.meta.MetaAttribute, string> = new java.util.HashMap<org.kevoree.modeling.api.meta.MetaAttribute, string>();
                            if (attributes) {
                                if (current != null) {
                                    current.visitAttributes( (metaAttribute : org.kevoree.modeling.api.meta.MetaAttribute, value : any) => {
                                        if (value == null) {
                                            values.put(metaAttribute, null);
                                        } else {
                                            values.put(metaAttribute, value.toString());
                                        }
                                    });
                                }
                                if (sibling != null) {
                                    sibling.visitAttributes( (metaAttribute : org.kevoree.modeling.api.meta.MetaAttribute, value : any) => {
                                        var flatAtt2: string = null;
                                        if (value != null) {
                                            flatAtt2 = value.toString();
                                        }
                                        var flatAtt1: string = values.get(metaAttribute);
                                        var isEquals: boolean = true;
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
                                    for (var i: number = 0; i < mettaAttributes.length; i++) {
                                        var hashLoopRes: org.kevoree.modeling.api.meta.MetaAttribute = mettaAttributes[i];
                                        traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(current.uuid(), hashLoopRes, null));
                                        values.remove(hashLoopRes);
                                    }
                                }
                            }
                            var valuesRef: java.util.Map<org.kevoree.modeling.api.meta.MetaReference, any> = new java.util.HashMap<org.kevoree.modeling.api.meta.MetaReference, any>();
                            if (references) {
                                for (var i: number = 0; i < current.metaClass().metaReferences().length; i++) {
                                    var reference: org.kevoree.modeling.api.meta.MetaReference = current.metaClass().metaReferences()[i];
                                    var payload: any = current.view().universe().model().manager().entry(current, org.kevoree.modeling.api.data.manager.AccessMode.READ).get(reference.index());
                                    valuesRef.put(reference, payload);
                                }
                                if (sibling != null) {
                                    for (var i: number = 0; i < sibling.metaClass().metaReferences().length; i++) {
                                        var reference: org.kevoree.modeling.api.meta.MetaReference = sibling.metaClass().metaReferences()[i];
                                        var payload2: any = sibling.view().universe().model().manager().entry(sibling, org.kevoree.modeling.api.data.manager.AccessMode.READ).get(reference.index());
                                        var payload1: any = valuesRef.get(reference);
                                        if (reference.single()) {
                                            var isEquals: boolean = true;
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
                                                        traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, <number>payload2));
                                                    }
                                                }
                                            } else {
                                                if (!inter) {
                                                    traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, <number>payload2));
                                                }
                                            }
                                        } else {
                                            if (payload1 == null && payload2 != null) {
                                                var siblingToAdd: number[] = (<java.util.Set<number>>payload2).toArray(new Array());
                                                for (var j: number = 0; j < siblingToAdd.length; j++) {
                                                    var siblingElem: number = siblingToAdd[j];
                                                    if (!inter) {
                                                        traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, siblingElem));
                                                    }
                                                }
                                            } else {
                                                if (payload1 != null) {
                                                    var currentPaths: number[] = (<java.util.Set<number>>payload1).toArray(new Array());
                                                    for (var j: number = 0; j < currentPaths.length; j++) {
                                                        var currentPath: number = currentPaths[j];
                                                        var isFound: boolean = false;
                                                        if (payload2 != null) {
                                                            var siblingPaths: java.util.Set<number> = <java.util.Set<number>>payload2;
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
                                        for (var i: number = 0; i < metaReferences.length; i++) {
                                            var hashLoopResRef: org.kevoree.modeling.api.meta.MetaReference = metaReferences[i];
                                            var payload: any = valuesRef.get(hashLoopResRef);
                                            if (payload != null) {
                                                if (payload instanceof java.util.Set) {
                                                    var toRemoveSet: number[] = (<java.util.Set<number>>payload).toArray(new Array());
                                                    for (var j: number = 0; j < toRemoveSet.length; j++) {
                                                        var toRemovePath: number = toRemoveSet[j];
                                                        traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(current.uuid(), hashLoopResRef, toRemovePath));
                                                    }
                                                } else {
                                                    traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(current.uuid(), hashLoopResRef, <number>payload));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            return traces;
                        }

                    }

                }
                export module polynomial {
                    export interface PolynomialModel {

                        extrapolate(time: number): number;

                        insert(time: number, value: number): boolean;

                        lastIndex(): number;

                        save(): string;

                        load(payload: string): void;

                        isDirty(): boolean;

                    }

                    export module doublepolynomial {
                        export class DoublePolynomialModel implements org.kevoree.modeling.api.polynomial.PolynomialModel {

                            private static sep: string = "/";
                            public static sepW: string = "%";
                            private _prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization;
                            private _maxDegree: number;
                            private _toleratedError: number;
                            private _isDirty: boolean = false;
                            private _weights: number[];
                            private _polyTime: org.kevoree.modeling.api.polynomial.doublepolynomial.TimePolynomial;
                            constructor(p_timeOrigin: number, p_toleratedError: number, p_maxDegree: number, p_prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization) {
                                this._polyTime = new org.kevoree.modeling.api.polynomial.doublepolynomial.TimePolynomial(p_timeOrigin);
                                this._prioritization = p_prioritization;
                                this._maxDegree = p_maxDegree;
                                this._toleratedError = p_toleratedError;
                            }

                            public degree(): number {
                                if (this._weights == null) {
                                    return -1;
                                } else {
                                    return this._weights.length - 1;
                                }
                            }

                            public timeOrigin(): number {
                                return this._polyTime.timeOrigin();
                            }

                            public comparePolynome(p2: org.kevoree.modeling.api.polynomial.doublepolynomial.DoublePolynomialModel, err: number): boolean {
                                if (this._weights.length != p2._weights.length) {
                                    return false;
                                }
                                for (var i: number = 0; i < this._weights.length; i++) {
                                    if (Math.abs(this._weights[i] - this._weights[i]) > err) {
                                        return false;
                                    }
                                }
                                return true;
                            }

                            public extrapolate(time: number): number {
                                return this.test_extrapolate(this._polyTime.denormalize(time), this._weights);
                            }

                            public insert(time: number, value: number): boolean {
                                if (this._weights == null) {
                                    this.internal_feed(time, value);
                                    this._isDirty = true;
                                    return true;
                                }
                                if (this._polyTime.insert(time)) {
                                    var maxError: number = this.maxErr();
                                    if (Math.abs(this.extrapolate(time) - value) <= maxError) {
                                        return true;
                                    }
                                    var deg: number = this.degree();
                                    var newMaxDegree: number = Math.min(this._polyTime.nbSamples() - 1, this._maxDegree);
                                    if (deg < newMaxDegree) {
                                        deg++;
                                        var ss: number = Math.min(deg * 2, this._polyTime.nbSamples() - 1);
                                        var times: number[] = new Array();
                                        var values: number[] = new Array();
                                        var current: number = this._polyTime.nbSamples() - 1;
                                        for (var i: number = 0; i < ss; i++) {
                                            times[i] = this._polyTime.getNormalizedTime(<number>(i * current / ss));
                                            values[i] = this.test_extrapolate(times[i], this._weights);
                                        }
                                        times[ss] = this._polyTime.denormalize(time);
                                        values[ss] = value;
                                        var pf: org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml = new org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml(deg);
                                        pf.fit(times, values);
                                        if (this.maxError(pf.getCoef(), time, value) <= maxError) {
                                            this._weights = new Array();
                                            for (var i: number = 0; i < pf.getCoef().length; i++) {
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

                            public lastIndex(): number {
                                return this._polyTime.lastIndex();
                            }

                            public save(): string {
                                var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                                for (var i: number = 0; i < this._weights.length; i++) {
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
                                    for (var i: number = 0; i < welems.length; i++) {
                                        this._weights[i] = java.lang.Double.parseDouble(welems[i]);
                                    }
                                    this._polyTime.load(parts[1]);
                                } else {
                                    System.err.println("Bad Polynomial String " + payload);
                                }
                                this._isDirty = false;
                            }

                            public isDirty(): boolean {
                                return this._isDirty || this._polyTime.isDirty();
                            }

                            private maxErr(): number {
                                var tol: number = this._toleratedError;
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

                            private internal_feed(time: number, value: number): void {
                                if (this._weights == null) {
                                    this._weights = new Array();
                                    this._weights[0] = value;
                                    this._polyTime.insert(time);
                                }
                            }

                            private maxError(computedWeights: number[], time: number, value: number): number {
                                var maxErr: number = 0;
                                var temp: number;
                                var ds: number;
                                for (var i: number = 0; i < this._polyTime.nbSamples() - 1; i++) {
                                    ds = this._polyTime.getNormalizedTime(i);
                                    var val: number = this.test_extrapolate(ds, computedWeights);
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

                            private test_extrapolate(time: number, weights: number[]): number {
                                var result: number = 0;
                                var power: number = 1;
                                for (var j: number = 0; j < weights.length; j++) {
                                    result += weights[j] * power;
                                    power = power * time;
                                }
                                return result;
                            }

                        }

                        export class TimePolynomial {

                            private static toleratedErrorRatio: number = 10;
                            private _timeOrigin: number;
                            private _isDirty: boolean = false;
                            private static maxTimeDegree: number = 20;
                            private _weights: number[];
                            private _nbSamples: number;
                            private _samplingPeriod: number;
                            constructor(p_timeOrigin: number) {
                                this._timeOrigin = p_timeOrigin;
                            }

                            public timeOrigin(): number {
                                return this._timeOrigin;
                            }

                            public samplingPeriod(): number {
                                return this._samplingPeriod;
                            }

                            public weights(): number[] {
                                return this._weights;
                            }

                            public degree(): number {
                                if (this._weights == null) {
                                    return -1;
                                } else {
                                    return this._weights.length - 1;
                                }
                            }

                            public denormalize(p_time: number): number {
                                return (<number>(p_time - this._timeOrigin)) / this._samplingPeriod;
                            }

                            public getNormalizedTime(id: number): number {
                                var result: number = 0;
                                var power: number = 1;
                                for (var j: number = 0; j < this._weights.length; j++) {
                                    result += this._weights[j] * power;
                                    power = power * id;
                                }
                                return result;
                            }

                            public extrapolate(id: number): number {
                                return this.test_extrapolate(id, this._weights);
                            }

                            public nbSamples(): number {
                                return this._nbSamples;
                            }

                            public insert(time: number): boolean {
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
                                    var maxError: number = this._samplingPeriod / TimePolynomial.toleratedErrorRatio;
                                    if (Math.abs(this.extrapolate(this._nbSamples) - time) <= maxError) {
                                        this._nbSamples++;
                                        this._isDirty = true;
                                        return true;
                                    }
                                    var deg: number = this.degree();
                                    var newMaxDegree: number = Math.min(this._nbSamples, TimePolynomial.maxTimeDegree);
                                    while (deg < newMaxDegree){
                                        deg++;
                                        var ss: number = Math.min(deg * 2, this._nbSamples);
                                        var ids: number[] = new Array();
                                        var times: number[] = new Array();
                                        var idtemp: number;
                                        for (var i: number = 0; i < ss; i++) {
                                            idtemp = <number>(i * this._nbSamples / ss);
                                            ids[i] = idtemp;
                                            times[i] = (this.extrapolate(idtemp) - this._timeOrigin) / (this._samplingPeriod);
                                        }
                                        ids[ss] = this._nbSamples;
                                        times[ss] = (time - this._timeOrigin) / (this._samplingPeriod);
                                        var pf: org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml = new org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml(deg);
                                        pf.fit(ids, times);
                                        if (this.maxError(pf.getCoef(), this._nbSamples, time) <= maxError) {
                                            this._weights = new Array();
                                            for (var i: number = 0; i < pf.getCoef().length; i++) {
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

                            private maxError(computedWeights: number[], lastId: number, newtime: number): number {
                                var maxErr: number = 0;
                                var time: number;
                                var temp: number;
                                for (var i: number = 0; i < lastId; i++) {
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

                            private test_extrapolate(id: number, newWeights: number[]): number {
                                var result: number = 0;
                                var power: number = 1;
                                for (var j: number = 0; j < newWeights.length; j++) {
                                    result += newWeights[j] * power;
                                    power = power * id;
                                }
                                result = result * (this._samplingPeriod) + this._timeOrigin;
                                return <number>result;
                            }

                            public removeLast(): void {
                                this._nbSamples = this._nbSamples - 1;
                            }

                            public lastIndex(): number {
                                if (this._nbSamples > 0) {
                                    return this.extrapolate(this._nbSamples - 1);
                                }
                                return -1;
                            }

                            public save(): string {
                                var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                                for (var i: number = 0; i < this._weights.length; i++) {
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
                                for (var i: number = 0; i < parts.length - 2; i++) {
                                    this._weights[i] = java.lang.Double.parseDouble(parts[i]);
                                }
                                this._nbSamples = java.lang.Integer.parseInt(parts[parts.length - 1]);
                                this._samplingPeriod = java.lang.Integer.parseInt(parts[parts.length - 2]);
                                this._isDirty = false;
                            }

                            public isDirty(): boolean {
                                return this._isDirty;
                            }

                        }

                    }
                    export module simplepolynomial {
                        export class SimplePolynomialModel implements org.kevoree.modeling.api.polynomial.PolynomialModel {

                            private weights: number[];
                            private timeOrigin: number;
                            private samples: java.util.List<org.kevoree.modeling.api.polynomial.util.DataSample> = new java.util.ArrayList<org.kevoree.modeling.api.polynomial.util.DataSample>();
                            private degradeFactor: number;
                            private prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization;
                            private maxDegree: number;
                            private toleratedError: number;
                            private _lastIndex: number = -1;
                            private static sep: string = "/";
                            private _isDirty: boolean = false;
                            constructor(timeOrigin: number, toleratedError: number, maxDegree: number, prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization) {
                                this.timeOrigin = timeOrigin;
                                this.degradeFactor = 1;
                                this.prioritization = prioritization;
                                this.maxDegree = maxDegree;
                                this.toleratedError = toleratedError;
                            }

                            public getSamples(): java.util.List<org.kevoree.modeling.api.polynomial.util.DataSample> {
                                return this.samples;
                            }

                            public getDegree(): number {
                                if (this.weights == null) {
                                    return -1;
                                } else {
                                    return this.weights.length - 1;
                                }
                            }

                            public getTimeOrigin(): number {
                                return this.timeOrigin;
                            }

                            private getMaxErr(degree: number, toleratedError: number, maxDegree: number, prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization): number {
                                var tol: number = toleratedError;
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

                            private internal_feed(time: number, value: number): void {
                                if (this.weights == null) {
                                    this.weights = new Array();
                                    this.weights[0] = value;
                                    this.timeOrigin = time;
                                    this.samples.add(new org.kevoree.modeling.api.polynomial.util.DataSample(time, value));
                                }
                            }

                            private maxError(computedWeights: number[], time: number, value: number): number {
                                var maxErr: number = 0;
                                var temp: number = 0;
                                var ds: org.kevoree.modeling.api.polynomial.util.DataSample;
                                for (var i: number = 0; i < this.samples.size(); i++) {
                                    ds = this.samples.get(i);
                                    var val: number = this.internal_extrapolate(ds.time, computedWeights);
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

                            public comparePolynome(p2: org.kevoree.modeling.api.polynomial.simplepolynomial.SimplePolynomialModel, err: number): boolean {
                                if (this.weights.length != p2.weights.length) {
                                    return false;
                                }
                                for (var i: number = 0; i < this.weights.length; i++) {
                                    if (Math.abs(this.weights[i] - this.weights[i]) > err) {
                                        return false;
                                    }
                                }
                                return true;
                            }

                            private internal_extrapolate(time: number, weights: number[]): number {
                                var result: number = 0;
                                var t: number = (<number>(time - this.timeOrigin)) / this.degradeFactor;
                                var power: number = 1;
                                for (var j: number = 0; j < weights.length; j++) {
                                    result += weights[j] * power;
                                    power = power * t;
                                }
                                return result;
                            }

                            public extrapolate(time: number): number {
                                return this.internal_extrapolate(time, this.weights);
                            }

                            public insert(time: number, value: number): boolean {
                                if (this.weights == null) {
                                    this.internal_feed(time, value);
                                    this._lastIndex = time;
                                    this._isDirty = true;
                                    return true;
                                }
                                var maxError: number = this.getMaxErr(this.getDegree(), this.toleratedError, this.maxDegree, this.prioritization);
                                if (Math.abs(this.extrapolate(time) - value) <= maxError) {
                                    this.samples.add(new org.kevoree.modeling.api.polynomial.util.DataSample(time, value));
                                    this._lastIndex = time;
                                    return true;
                                }
                                var deg: number = this.getDegree();
                                if (deg < this.maxDegree) {
                                    deg++;
                                    var ss: number = Math.min(deg * 2, this.samples.size());
                                    var times: number[] = new Array();
                                    var values: number[] = new Array();
                                    var current: number = this.samples.size();
                                    for (var i: number = 0; i < ss; i++) {
                                        var index: number = Math.round(i * current / ss);
                                        var ds: org.kevoree.modeling.api.polynomial.util.DataSample = this.samples.get(index);
                                        times[i] = (<number>(ds.time - this.timeOrigin)) / this.degradeFactor;
                                        values[i] = ds.value;
                                    }
                                    times[ss] = (<number>(time - this.timeOrigin)) / this.degradeFactor;
                                    values[ss] = value;
                                    var pf: org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml = new org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml(deg);
                                    pf.fit(times, values);
                                    if (this.maxError(pf.getCoef(), time, value) <= maxError) {
                                        this.weights = new Array();
                                        for (var i: number = 0; i < pf.getCoef().length; i++) {
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

                            public lastIndex(): number {
                                return this._lastIndex;
                            }

                            public save(): string {
                                var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                                for (var i: number = 0; i < this.weights.length; i++) {
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
                                for (var i: number = 0; i < elems.length; i++) {
                                    this.weights[i] = java.lang.Double.parseDouble(elems[i]);
                                }
                                this._isDirty = false;
                            }

                            public isDirty(): boolean {
                                return this._isDirty;
                            }

                        }

                    }
                    export module util {
                        export class AdjLinearSolverQr {

                            public numRows: number;
                            public numCols: number;
                            private decomposer: org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64;
                            public maxRows: number = -1;
                            public maxCols: number = -1;
                            public Q: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            public R: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            private Y: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            private Z: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            public setA(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): boolean {
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

                            private solveU(U: number[], b: number[], n: number): void {
                                for (var i: number = n - 1; i >= 0; i--) {
                                    var sum: number = b[i];
                                    var indexU: number = i * n + i + 1;
                                    for (var j: number = i + 1; j < n; j++) {
                                        sum -= U[indexU++] * b[j];
                                    }
                                    b[i] = sum / U[i * n + i];
                                }
                            }

                            public solve(B: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, X: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
                                var BnumCols: number = B.numCols;
                                this.Y.reshape(this.numRows, 1, false);
                                this.Z.reshape(this.numRows, 1, false);
                                for (var colB: number = 0; colB < BnumCols; colB++) {
                                    for (var i: number = 0; i < this.numRows; i++) {
                                        this.Y.data[i] = B.unsafe_get(i, colB);
                                    }
                                    org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA(this.Q, this.Y, this.Z);
                                    this.solveU(this.R.data, this.Z.data, this.numCols);
                                    for (var i: number = 0; i < this.numCols; i++) {
                                        X.cset(i, colB, this.Z.data[i]);
                                    }
                                }
                            }

                            constructor() {
                                this.decomposer = new org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64();
                            }

                            public setMaxSize(maxRows: number, maxCols: number): void {
                                maxRows += 5;
                                this.maxRows = maxRows;
                                this.maxCols = maxCols;
                                this.Q = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(maxRows, maxRows);
                                this.R = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(maxRows, maxCols);
                                this.Y = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(maxRows, 1);
                                this.Z = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(maxRows, 1);
                            }

                        }

                        export class DataSample {

                            public time: number;
                            public value: number;
                            constructor(time: number, value: number) {
                                this.time = time;
                                this.value = value;
                            }

                        }

                        export class DenseMatrix64F {

                            public numRows: number;
                            public numCols: number;
                            public data: number[];
                            public static MULT_COLUMN_SWITCH: number = 15;
                            public static multTransA_smallMV(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, B: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, C: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
                                var cIndex: number = 0;
                                for (var i: number = 0; i < A.numCols; i++) {
                                    var total: number = 0.0;
                                    var indexA: number = i;
                                    for (var j: number = 0; j < A.numRows; j++) {
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
                                var B_val: number = B.get(0);
                                for (var i: number = 0; i < A.numCols; i++) {
                                    C.set(i, A.get(i) * B_val);
                                }
                                var indexA: number = A.numCols;
                                for (var i: number = 1; i < A.numRows; i++) {
                                    B_val = B.get(i);
                                    for (var j: number = 0; j < A.numCols; j++) {
                                        C.plus(j, A.get(indexA++) * B_val);
                                    }
                                }
                            }

                            public static multTransA_reorderMM(a: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, b: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, c: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
                                if (a.numCols == 0 || a.numRows == 0) {
                                    org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.fill(c, 0);
                                    return;
                                }
                                var valA: number;
                                for (var i: number = 0; i < a.numCols; i++) {
                                    var indexC_start: number = i * c.numCols;
                                    valA = a.get(i);
                                    var indexB: number = 0;
                                    var end: number = indexB + b.numCols;
                                    var indexC: number = indexC_start;
                                    while (indexB < end){
                                        c.set(indexC++, valA * b.get(indexB++));
                                    }
                                    for (var k: number = 1; k < a.numRows; k++) {
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
                                var cIndex: number = 0;
                                for (var i: number = 0; i < a.numCols; i++) {
                                    for (var j: number = 0; j < b.numCols; j++) {
                                        var indexA: number = i;
                                        var indexB: number = j;
                                        var end: number = indexB + b.numRows * b.numCols;
                                        var total: number = 0;
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
                                var width: number = mat.numRows < mat.numCols ? mat.numRows : mat.numCols;
                                java.util.Arrays.fill(mat.data, 0, mat.getNumElements(), 0);
                                var index: number = 0;
                                for (var i: number = 0; i < width; i++) {
                                    mat.data[index] = 1;
                                    index += mat.numCols + 1;
                                }
                            }

                            public static widentity(width: number): org.kevoree.modeling.api.polynomial.util.DenseMatrix64F {
                                var ret: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(width, width);
                                for (var i: number = 0; i < width; i++) {
                                    ret.cset(i, i, 1.0);
                                }
                                return ret;
                            }

                            public static identity(numRows: number, numCols: number): org.kevoree.modeling.api.polynomial.util.DenseMatrix64F {
                                var ret: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(numRows, numCols);
                                var small: number = numRows < numCols ? numRows : numCols;
                                for (var i: number = 0; i < small; i++) {
                                    ret.cset(i, i, 1.0);
                                }
                                return ret;
                            }

                            public static fill(a: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, value: number): void {
                                java.util.Arrays.fill(a.data, 0, a.getNumElements(), value);
                            }

                            public get(index: number): number {
                                return this.data[index];
                            }

                            public set(index: number, val: number): number {
                                return this.data[index] = val;
                            }

                            public plus(index: number, val: number): number {
                                return this.data[index] += val;
                            }

                            constructor(numRows: number, numCols: number) {
                                this.data = new Array();
                                this.numRows = numRows;
                                this.numCols = numCols;
                            }

                            public reshape(numRows: number, numCols: number, saveValues: boolean): void {
                                if (this.data.length < numRows * numCols) {
                                    var d: number[] = new Array();
                                    if (saveValues) {
                                        System.arraycopy(this.data, 0, d, 0, this.getNumElements());
                                    }
                                    this.data = d;
                                }
                                this.numRows = numRows;
                                this.numCols = numCols;
                            }

                            public cset(row: number, col: number, value: number): void {
                                this.data[row * this.numCols + col] = value;
                            }

                            public unsafe_get(row: number, col: number): number {
                                return this.data[row * this.numCols + col];
                            }

                            public getNumElements(): number {
                                return this.numRows * this.numCols;
                            }

                        }

                        export class PolynomialFitEjml {

                            public A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            public coef: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            public y: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            public solver: org.kevoree.modeling.api.polynomial.util.AdjLinearSolverQr;
                            constructor(degree: number) {
                                this.coef = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(degree + 1, 1);
                                this.A = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(1, degree + 1);
                                this.y = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(1, 1);
                                this.solver = new org.kevoree.modeling.api.polynomial.util.AdjLinearSolverQr();
                            }

                            public getCoef(): number[] {
                                return this.coef.data;
                            }

                            public fit(samplePoints: number[], observations: number[]): void {
                                this.y.reshape(observations.length, 1, false);
                                System.arraycopy(observations, 0, this.y.data, 0, observations.length);
                                this.A.reshape(this.y.numRows, this.coef.numRows, false);
                                for (var i: number = 0; i < observations.length; i++) {
                                    var obs: number = 1;
                                    for (var j: number = 0; j < this.coef.numRows; j++) {
                                        this.A.cset(i, j, obs);
                                        obs *= samplePoints[i];
                                    }
                                }
                                this.solver.setA(this.A);
                                this.solver.solve(this.y, this.coef);
                            }

                        }

                        export class Prioritization {

                            public static SAMEPRIORITY: Prioritization = new Prioritization();
                            public static HIGHDEGREES: Prioritization = new Prioritization();
                            public static LOWDEGREES: Prioritization = new Prioritization();
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
                        }

                        export class QRDecompositionHouseholderColumn_D64 {

                            public dataQR: number[][];
                            public v: number[];
                            public numCols: number;
                            public numRows: number;
                            public minLength: number;
                            public gammas: number[];
                            public gamma: number;
                            public tau: number;
                            public error: boolean;
                            public setExpectedMaxSize(numRows: number, numCols: number): void {
                                this.numCols = numCols;
                                this.numRows = numRows;
                                this.minLength = Math.min(numCols, numRows);
                                var maxLength: number = Math.max(numCols, numRows);
                                if (this.dataQR == null || this.dataQR.length < numCols || this.dataQR[0].length < numRows) {
                                    this.dataQR = new Array(new Array());
                                    for (var i: number = 0; i < numCols; i++) {
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

                            public getQ(Q: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, compact: boolean): org.kevoree.modeling.api.polynomial.util.DenseMatrix64F {
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
                                for (var j: number = this.minLength - 1; j >= 0; j--) {
                                    var u: number[] = this.dataQR[j];
                                    var vv: number = u[j];
                                    u[j] = 1;
                                    org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64.rank1UpdateMultR(Q, u, this.gammas[j], j, j, this.numRows, this.v);
                                    u[j] = vv;
                                }
                                return Q;
                            }

                            public getR(R: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, compact: boolean): org.kevoree.modeling.api.polynomial.util.DenseMatrix64F {
                                if (R == null) {
                                    if (compact) {
                                        R = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(this.minLength, this.numCols);
                                    } else {
                                        R = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(this.numRows, this.numCols);
                                    }
                                } else {
                                    for (var i: number = 0; i < R.numRows; i++) {
                                        var min: number = Math.min(i, R.numCols);
                                        for (var j: number = 0; j < min; j++) {
                                            R.cset(i, j, 0);
                                        }
                                    }
                                }
                                for (var j: number = 0; j < this.numCols; j++) {
                                    var colR: number[] = this.dataQR[j];
                                    var l: number = Math.min(j, this.numRows - 1);
                                    for (var i: number = 0; i <= l; i++) {
                                        var val: number = colR[i];
                                        R.cset(i, j, val);
                                    }
                                }
                                return R;
                            }

                            public decompose(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): boolean {
                                this.setExpectedMaxSize(A.numRows, A.numCols);
                                this.convertToColumnMajor(A);
                                this.error = false;
                                for (var j: number = 0; j < this.minLength; j++) {
                                    this.householder(j);
                                    this.updateA(j);
                                }
                                return !this.error;
                            }

                            public convertToColumnMajor(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
                                for (var x: number = 0; x < this.numCols; x++) {
                                    var colQ: number[] = this.dataQR[x];
                                    for (var y: number = 0; y < this.numRows; y++) {
                                        colQ[y] = A.data[y * this.numCols + x];
                                    }
                                }
                            }

                            public householder(j: number): void {
                                var u: number[] = this.dataQR[j];
                                var max: number = org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64.findMax(u, j, this.numRows - j);
                                if (max == 0.0) {
                                    this.gamma = 0;
                                    this.error = true;
                                } else {
                                    this.tau = org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64.computeTauAndDivide(j, this.numRows, u, max);
                                    var u_0: number = u[j] + this.tau;
                                    org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64.divideElements(j + 1, this.numRows, u, u_0);
                                    this.gamma = u_0 / this.tau;
                                    this.tau *= max;
                                    u[j] = -this.tau;
                                }
                                this.gammas[j] = this.gamma;
                            }

                            public updateA(w: number): void {
                                var u: number[] = this.dataQR[w];
                                for (var j: number = w + 1; j < this.numCols; j++) {
                                    var colQ: number[] = this.dataQR[j];
                                    var val: number = colQ[w];
                                    for (var k: number = w + 1; k < this.numRows; k++) {
                                        val += u[k] * colQ[k];
                                    }
                                    val *= this.gamma;
                                    colQ[w] -= val;
                                    for (var i: number = w + 1; i < this.numRows; i++) {
                                        colQ[i] -= u[i] * val;
                                    }
                                }
                            }

                            public static findMax(u: number[], startU: number, length: number): number {
                                var max: number = -1;
                                var index: number = startU;
                                var stopIndex: number = startU + length;
                                for (; index < stopIndex; index++) {
                                    var val: number = u[index];
                                    val = (val < 0.0) ? -val : val;
                                    if (val > max) {
                                        max = val;
                                    }
                                }
                                return max;
                            }

                            public static divideElements(j: number, numRows: number, u: number[], u_0: number): void {
                                for (var i: number = j; i < numRows; i++) {
                                    u[i] /= u_0;
                                }
                            }

                            public static computeTauAndDivide(j: number, numRows: number, u: number[], max: number): number {
                                var tau: number = 0;
                                for (var i: number = j; i < numRows; i++) {
                                    var d: number = u[i] /= max;
                                    tau += d * d;
                                }
                                tau = Math.sqrt(tau);
                                if (u[j] < 0) {
                                    tau = -tau;
                                }
                                return tau;
                            }

                            public static rank1UpdateMultR(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, u: number[], gamma: number, colA0: number, w0: number, w1: number, _temp: number[]): void {
                                for (var i: number = colA0; i < A.numCols; i++) {
                                    _temp[i] = u[w0] * A.data[w0 * A.numCols + i];
                                }
                                for (var k: number = w0 + 1; k < w1; k++) {
                                    var indexA: number = k * A.numCols + colA0;
                                    var valU: number = u[k];
                                    for (var i: number = colA0; i < A.numCols; i++) {
                                        _temp[i] += valU * A.data[indexA++];
                                    }
                                }
                                for (var i: number = colA0; i < A.numCols; i++) {
                                    _temp[i] *= gamma;
                                }
                                for (var i: number = w0; i < w1; i++) {
                                    var valU: number = u[i];
                                    var indexA: number = i * A.numCols + colA0;
                                    for (var j: number = colA0; j < A.numCols; j++) {
                                        A.data[indexA++] -= valU * _temp[j];
                                    }
                                }
                            }

                        }

                    }
                }
                export module rbtree {
                    export class Color {

                        public static RED: Color = new Color();
                        public static BLACK: Color = new Color();
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
                    }

                    export class IndexRBTree implements org.kevoree.modeling.api.data.cache.KCacheObject {

                        public root: org.kevoree.modeling.api.rbtree.TreeNode = null;
                        private _size: number = 0;
                        private _dirty: boolean = false;
                        public size(): number {
                            return this._size;
                        }

                        public isDirty(): boolean {
                            return this._dirty;
                        }

                        public serialize(): string {
                            var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                            builder.append(this._size);
                            if (this.root != null) {
                                this.root.serialize(builder);
                            }
                            return builder.toString();
                        }

                        public setClean(): void {
                            this._dirty = false;
                        }

                        public toString(): string {
                            return this.serialize();
                        }

                        public unserialize(key: org.kevoree.modeling.api.data.cache.KContentKey, payload: string, metaModel: org.kevoree.modeling.api.meta.MetaModel): void {
                            if (payload == null || payload.length == 0) {
                                return;
                            }
                            var i: number = 0;
                            var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                            var ch: string = payload.charAt(i);
                            while (i < payload.length && ch != '|'){
                                buffer.append(ch);
                                i = i + 1;
                                ch = payload.charAt(i);
                            }
                            this._size = java.lang.Integer.parseInt(buffer.toString());
                            var ctx: org.kevoree.modeling.api.rbtree.TreeReaderContext = new org.kevoree.modeling.api.rbtree.TreeReaderContext();
                            ctx.index = i;
                            ctx.payload = payload;
                            this.root = org.kevoree.modeling.api.rbtree.TreeNode.unserialize(ctx);
                        }

                        public previousOrEqual(key: number): org.kevoree.modeling.api.rbtree.TreeNode {
                            var p: org.kevoree.modeling.api.rbtree.TreeNode = this.root;
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
                                        var parent: org.kevoree.modeling.api.rbtree.TreeNode = p.getParent();
                                        var ch: org.kevoree.modeling.api.rbtree.TreeNode = p;
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

                        public nextOrEqual(key: number): org.kevoree.modeling.api.rbtree.TreeNode {
                            var p: org.kevoree.modeling.api.rbtree.TreeNode = this.root;
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
                                        var parent: org.kevoree.modeling.api.rbtree.TreeNode = p.getParent();
                                        var ch: org.kevoree.modeling.api.rbtree.TreeNode = p;
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

                        public previous(key: number): org.kevoree.modeling.api.rbtree.TreeNode {
                            var p: org.kevoree.modeling.api.rbtree.TreeNode = this.root;
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

                        public next(key: number): org.kevoree.modeling.api.rbtree.TreeNode {
                            var p: org.kevoree.modeling.api.rbtree.TreeNode = this.root;
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

                        public first(): org.kevoree.modeling.api.rbtree.TreeNode {
                            var p: org.kevoree.modeling.api.rbtree.TreeNode = this.root;
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

                        public last(): org.kevoree.modeling.api.rbtree.TreeNode {
                            var p: org.kevoree.modeling.api.rbtree.TreeNode = this.root;
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

                        private lookupNode(key: number): org.kevoree.modeling.api.rbtree.TreeNode {
                            var n: org.kevoree.modeling.api.rbtree.TreeNode = this.root;
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

                        public lookup(key: number): number {
                            var n: org.kevoree.modeling.api.rbtree.TreeNode = this.lookupNode(key);
                            if (n == null) {
                                return null;
                            } else {
                                return n.key;
                            }
                        }

                        private rotateLeft(n: org.kevoree.modeling.api.rbtree.TreeNode): void {
                            var r: org.kevoree.modeling.api.rbtree.TreeNode = n.getRight();
                            this.replaceNode(n, r);
                            n.setRight(r.getLeft());
                            if (r.getLeft() != null) {
                                r.getLeft().setParent(n);
                            }
                            r.setLeft(n);
                            n.setParent(r);
                        }

                        private rotateRight(n: org.kevoree.modeling.api.rbtree.TreeNode): void {
                            var l: org.kevoree.modeling.api.rbtree.TreeNode = n.getLeft();
                            this.replaceNode(n, l);
                            n.setLeft(l.getRight());
                            if (l.getRight() != null) {
                                l.getRight().setParent(n);
                            }
                            l.setRight(n);
                            n.setParent(l);
                        }

                        private replaceNode(oldn: org.kevoree.modeling.api.rbtree.TreeNode, newn: org.kevoree.modeling.api.rbtree.TreeNode): void {
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

                        public insert(key: number): void {
                            this._dirty = true;
                            var insertedNode: org.kevoree.modeling.api.rbtree.TreeNode = new org.kevoree.modeling.api.rbtree.TreeNode(key, org.kevoree.modeling.api.rbtree.Color.RED, null, null);
                            if (this.root == null) {
                                this._size++;
                                this.root = insertedNode;
                            } else {
                                var n: org.kevoree.modeling.api.rbtree.TreeNode = this.root;
                                while (true){
                                    if (key == n.key) {
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

                        private insertCase1(n: org.kevoree.modeling.api.rbtree.TreeNode): void {
                            if (n.getParent() == null) {
                                n.color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                            } else {
                                this.insertCase2(n);
                            }
                        }

                        private insertCase2(n: org.kevoree.modeling.api.rbtree.TreeNode): void {
                            if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.rbtree.Color.BLACK) {
                                return;
                            } else {
                                this.insertCase3(n);
                            }
                        }

                        private insertCase3(n: org.kevoree.modeling.api.rbtree.TreeNode): void {
                            if (this.nodeColor(n.uncle()) == org.kevoree.modeling.api.rbtree.Color.RED) {
                                n.getParent().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                                n.uncle().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                                n.grandparent().color = org.kevoree.modeling.api.rbtree.Color.RED;
                                this.insertCase1(n.grandparent());
                            } else {
                                this.insertCase4(n);
                            }
                        }

                        private insertCase4(n_n: org.kevoree.modeling.api.rbtree.TreeNode): void {
                            var n: org.kevoree.modeling.api.rbtree.TreeNode = n_n;
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

                        private insertCase5(n: org.kevoree.modeling.api.rbtree.TreeNode): void {
                            n.getParent().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                            n.grandparent().color = org.kevoree.modeling.api.rbtree.Color.RED;
                            if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getLeft()) {
                                this.rotateRight(n.grandparent());
                            } else {
                                this.rotateLeft(n.grandparent());
                            }
                        }

                        public delete(key: number): void {
                            var n: org.kevoree.modeling.api.rbtree.TreeNode = this.lookupNode(key);
                            if (n == null) {
                                return;
                            } else {
                                this._size--;
                                if (n.getLeft() != null && n.getRight() != null) {
                                    var pred: org.kevoree.modeling.api.rbtree.TreeNode = n.getLeft();
                                    while (pred.getRight() != null){
                                        pred = pred.getRight();
                                    }
                                    n.key = pred.key;
                                    n = pred;
                                }
                                var child: org.kevoree.modeling.api.rbtree.TreeNode;
                                if (n.getRight() == null) {
                                    child = n.getLeft();
                                } else {
                                    child = n.getRight();
                                }
                                if (this.nodeColor(n) == org.kevoree.modeling.api.rbtree.Color.BLACK) {
                                    n.color = this.nodeColor(child);
                                    this.deleteCase1(n);
                                }
                                this.replaceNode(n, child);
                            }
                        }

                        private deleteCase1(n: org.kevoree.modeling.api.rbtree.TreeNode): void {
                            if (n.getParent() == null) {
                                return;
                            } else {
                                this.deleteCase2(n);
                            }
                        }

                        private deleteCase2(n: org.kevoree.modeling.api.rbtree.TreeNode): void {
                            if (this.nodeColor(n.sibling()) == org.kevoree.modeling.api.rbtree.Color.RED) {
                                n.getParent().color = org.kevoree.modeling.api.rbtree.Color.RED;
                                n.sibling().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                                if (n == n.getParent().getLeft()) {
                                    this.rotateLeft(n.getParent());
                                } else {
                                    this.rotateRight(n.getParent());
                                }
                            }
                            this.deleteCase3(n);
                        }

                        private deleteCase3(n: org.kevoree.modeling.api.rbtree.TreeNode): void {
                            if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.rbtree.Color.BLACK && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.rbtree.Color.BLACK) {
                                n.sibling().color = org.kevoree.modeling.api.rbtree.Color.RED;
                                this.deleteCase1(n.getParent());
                            } else {
                                this.deleteCase4(n);
                            }
                        }

                        private deleteCase4(n: org.kevoree.modeling.api.rbtree.TreeNode): void {
                            if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.rbtree.Color.RED && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.rbtree.Color.BLACK) {
                                n.sibling().color = org.kevoree.modeling.api.rbtree.Color.RED;
                                n.getParent().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                            } else {
                                this.deleteCase5(n);
                            }
                        }

                        private deleteCase5(n: org.kevoree.modeling.api.rbtree.TreeNode): void {
                            if (n == n.getParent().getLeft() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.rbtree.Color.RED && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.rbtree.Color.BLACK) {
                                n.sibling().color = org.kevoree.modeling.api.rbtree.Color.RED;
                                n.sibling().getLeft().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                                this.rotateRight(n.sibling());
                            } else {
                                if (n == n.getParent().getRight() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.rbtree.Color.RED && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.rbtree.Color.RED;
                                    n.sibling().getRight().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                                    this.rotateLeft(n.sibling());
                                }
                            }
                            this.deleteCase6(n);
                        }

                        private deleteCase6(n: org.kevoree.modeling.api.rbtree.TreeNode): void {
                            n.sibling().color = this.nodeColor(n.getParent());
                            n.getParent().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                            if (n == n.getParent().getLeft()) {
                                n.sibling().getRight().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                                this.rotateLeft(n.getParent());
                            } else {
                                n.sibling().getLeft().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                                this.rotateRight(n.getParent());
                            }
                        }

                        private nodeColor(n: org.kevoree.modeling.api.rbtree.TreeNode): org.kevoree.modeling.api.rbtree.Color {
                            if (n == null) {
                                return org.kevoree.modeling.api.rbtree.Color.BLACK;
                            } else {
                                return n.color;
                            }
                        }

                    }

                    export class LongRBTree implements org.kevoree.modeling.api.data.cache.KCacheObject {

                        public root: org.kevoree.modeling.api.rbtree.LongTreeNode = null;
                        private _size: number = 0;
                        public _dirty: boolean = false;
                        public size(): number {
                            return this._size;
                        }

                        public toString(): string {
                            return this.serialize();
                        }

                        public isDirty(): boolean {
                            return this._dirty;
                        }

                        public serialize(): string {
                            var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                            builder.append(this._size);
                            if (this.root != null) {
                                this.root.serialize(builder);
                            }
                            return builder.toString();
                        }

                        public setClean(): void {
                            this._dirty = false;
                        }

                        public unserialize(key: org.kevoree.modeling.api.data.cache.KContentKey, payload: string, metaModel: org.kevoree.modeling.api.meta.MetaModel): void {
                            if (payload == null || payload.length == 0) {
                                return;
                            }
                            var i: number = 0;
                            var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                            var ch: string = payload.charAt(i);
                            while (i < payload.length && ch != '|'){
                                buffer.append(ch);
                                i = i + 1;
                                ch = payload.charAt(i);
                            }
                            this._size = java.lang.Integer.parseInt(buffer.toString());
                            var ctx: org.kevoree.modeling.api.rbtree.TreeReaderContext = new org.kevoree.modeling.api.rbtree.TreeReaderContext();
                            ctx.index = i;
                            ctx.payload = payload;
                            ctx.buffer = new Array();
                            this.root = org.kevoree.modeling.api.rbtree.LongTreeNode.unserialize(ctx);
                            this._dirty = false;
                        }

                        public previousOrEqual(key: number): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            var p: org.kevoree.modeling.api.rbtree.LongTreeNode = this.root;
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
                                        var parent: org.kevoree.modeling.api.rbtree.LongTreeNode = p.getParent();
                                        var ch: org.kevoree.modeling.api.rbtree.LongTreeNode = p;
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

                        public nextOrEqual(key: number): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            var p: org.kevoree.modeling.api.rbtree.LongTreeNode = this.root;
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
                                        var parent: org.kevoree.modeling.api.rbtree.LongTreeNode = p.getParent();
                                        var ch: org.kevoree.modeling.api.rbtree.LongTreeNode = p;
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

                        public previous(key: number): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            var p: org.kevoree.modeling.api.rbtree.LongTreeNode = this.root;
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

                        public previousWhileNot(key: number, until: number): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            var elm: org.kevoree.modeling.api.rbtree.LongTreeNode = this.previousOrEqual(key);
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

                        public next(key: number): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            var p: org.kevoree.modeling.api.rbtree.LongTreeNode = this.root;
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

                        public nextWhileNot(key: number, until: number): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            var elm: org.kevoree.modeling.api.rbtree.LongTreeNode = this.nextOrEqual(key);
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

                        public first(): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            var p: org.kevoree.modeling.api.rbtree.LongTreeNode = this.root;
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

                        public last(): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            var p: org.kevoree.modeling.api.rbtree.LongTreeNode = this.root;
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

                        public firstWhileNot(key: number, until: number): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            var elm: org.kevoree.modeling.api.rbtree.LongTreeNode = this.previousOrEqual(key);
                            if (elm == null) {
                                return null;
                            } else {
                                if (elm.value == until) {
                                    return null;
                                }
                            }
                            var prev: org.kevoree.modeling.api.rbtree.LongTreeNode = null;
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

                        public lastWhileNot(key: number, until: number): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            var elm: org.kevoree.modeling.api.rbtree.LongTreeNode = this.previousOrEqual(key);
                            if (elm == null) {
                                return null;
                            } else {
                                if (elm.value == until) {
                                    return null;
                                }
                            }
                            var next: org.kevoree.modeling.api.rbtree.LongTreeNode;
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

                        private lookupNode(key: number): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            var n: org.kevoree.modeling.api.rbtree.LongTreeNode = this.root;
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

                        public lookup(key: number): number {
                            var n: org.kevoree.modeling.api.rbtree.LongTreeNode = this.lookupNode(key);
                            if (n == null) {
                                return null;
                            } else {
                                return n.value;
                            }
                        }

                        private rotateLeft(n: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
                            var r: org.kevoree.modeling.api.rbtree.LongTreeNode = n.getRight();
                            this.replaceNode(n, r);
                            n.setRight(r.getLeft());
                            if (r.getLeft() != null) {
                                r.getLeft().setParent(n);
                            }
                            r.setLeft(n);
                            n.setParent(r);
                        }

                        private rotateRight(n: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
                            var l: org.kevoree.modeling.api.rbtree.LongTreeNode = n.getLeft();
                            this.replaceNode(n, l);
                            n.setLeft(l.getRight());
                            if (l.getRight() != null) {
                                l.getRight().setParent(n);
                            }
                            l.setRight(n);
                            n.setParent(l);
                        }

                        private replaceNode(oldn: org.kevoree.modeling.api.rbtree.LongTreeNode, newn: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
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

                        public insert(key: number, value: number): void {
                            this._dirty = true;
                            var insertedNode: org.kevoree.modeling.api.rbtree.LongTreeNode = new org.kevoree.modeling.api.rbtree.LongTreeNode(key, value, org.kevoree.modeling.api.rbtree.Color.RED, null, null);
                            if (this.root == null) {
                                this._size++;
                                this.root = insertedNode;
                            } else {
                                var n: org.kevoree.modeling.api.rbtree.LongTreeNode = this.root;
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

                        private insertCase1(n: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
                            if (n.getParent() == null) {
                                n.color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                            } else {
                                this.insertCase2(n);
                            }
                        }

                        private insertCase2(n: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
                            if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.rbtree.Color.BLACK) {
                                return;
                            } else {
                                this.insertCase3(n);
                            }
                        }

                        private insertCase3(n: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
                            if (this.nodeColor(n.uncle()) == org.kevoree.modeling.api.rbtree.Color.RED) {
                                n.getParent().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                                n.uncle().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                                n.grandparent().color = org.kevoree.modeling.api.rbtree.Color.RED;
                                this.insertCase1(n.grandparent());
                            } else {
                                this.insertCase4(n);
                            }
                        }

                        private insertCase4(n_n: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
                            var n: org.kevoree.modeling.api.rbtree.LongTreeNode = n_n;
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

                        private insertCase5(n: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
                            n.getParent().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                            n.grandparent().color = org.kevoree.modeling.api.rbtree.Color.RED;
                            if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getLeft()) {
                                this.rotateRight(n.grandparent());
                            } else {
                                this.rotateLeft(n.grandparent());
                            }
                        }

                        public delete(key: number): void {
                            var n: org.kevoree.modeling.api.rbtree.LongTreeNode = this.lookupNode(key);
                            if (n == null) {
                                return;
                            } else {
                                this._size--;
                                if (n.getLeft() != null && n.getRight() != null) {
                                    var pred: org.kevoree.modeling.api.rbtree.LongTreeNode = n.getLeft();
                                    while (pred.getRight() != null){
                                        pred = pred.getRight();
                                    }
                                    n.key = pred.key;
                                    n.value = pred.value;
                                    n = pred;
                                }
                                var child: org.kevoree.modeling.api.rbtree.LongTreeNode;
                                if (n.getRight() == null) {
                                    child = n.getLeft();
                                } else {
                                    child = n.getRight();
                                }
                                if (this.nodeColor(n) == org.kevoree.modeling.api.rbtree.Color.BLACK) {
                                    n.color = this.nodeColor(child);
                                    this.deleteCase1(n);
                                }
                                this.replaceNode(n, child);
                            }
                        }

                        private deleteCase1(n: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
                            if (n.getParent() == null) {
                                return;
                            } else {
                                this.deleteCase2(n);
                            }
                        }

                        private deleteCase2(n: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
                            if (this.nodeColor(n.sibling()) == org.kevoree.modeling.api.rbtree.Color.RED) {
                                n.getParent().color = org.kevoree.modeling.api.rbtree.Color.RED;
                                n.sibling().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                                if (n == n.getParent().getLeft()) {
                                    this.rotateLeft(n.getParent());
                                } else {
                                    this.rotateRight(n.getParent());
                                }
                            }
                            this.deleteCase3(n);
                        }

                        private deleteCase3(n: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
                            if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.rbtree.Color.BLACK && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.rbtree.Color.BLACK) {
                                n.sibling().color = org.kevoree.modeling.api.rbtree.Color.RED;
                                this.deleteCase1(n.getParent());
                            } else {
                                this.deleteCase4(n);
                            }
                        }

                        private deleteCase4(n: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
                            if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.rbtree.Color.RED && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.rbtree.Color.BLACK) {
                                n.sibling().color = org.kevoree.modeling.api.rbtree.Color.RED;
                                n.getParent().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                            } else {
                                this.deleteCase5(n);
                            }
                        }

                        private deleteCase5(n: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
                            if (n == n.getParent().getLeft() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.rbtree.Color.RED && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.rbtree.Color.BLACK) {
                                n.sibling().color = org.kevoree.modeling.api.rbtree.Color.RED;
                                n.sibling().getLeft().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                                this.rotateRight(n.sibling());
                            } else {
                                if (n == n.getParent().getRight() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.rbtree.Color.RED && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.rbtree.Color.RED;
                                    n.sibling().getRight().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                                    this.rotateLeft(n.sibling());
                                }
                            }
                            this.deleteCase6(n);
                        }

                        private deleteCase6(n: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
                            n.sibling().color = this.nodeColor(n.getParent());
                            n.getParent().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                            if (n == n.getParent().getLeft()) {
                                n.sibling().getRight().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                                this.rotateLeft(n.getParent());
                            } else {
                                n.sibling().getLeft().color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                                this.rotateRight(n.getParent());
                            }
                        }

                        private nodeColor(n: org.kevoree.modeling.api.rbtree.LongTreeNode): org.kevoree.modeling.api.rbtree.Color {
                            if (n == null) {
                                return org.kevoree.modeling.api.rbtree.Color.BLACK;
                            } else {
                                return n.color;
                            }
                        }

                    }

                    export class LongTreeNode {

                        public static BLACK: string = '0';
                        public static RED: string = '2';
                        public key: number;
                        public value: number;
                        public color: org.kevoree.modeling.api.rbtree.Color;
                        private left: org.kevoree.modeling.api.rbtree.LongTreeNode;
                        private right: org.kevoree.modeling.api.rbtree.LongTreeNode;
                        private parent: org.kevoree.modeling.api.rbtree.LongTreeNode = null;
                        constructor(key: number, value: number, color: org.kevoree.modeling.api.rbtree.Color, left: org.kevoree.modeling.api.rbtree.LongTreeNode, right: org.kevoree.modeling.api.rbtree.LongTreeNode) {
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

                        public grandparent(): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            if (this.parent != null) {
                                return this.parent.parent;
                            } else {
                                return null;
                            }
                        }

                        public sibling(): org.kevoree.modeling.api.rbtree.LongTreeNode {
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

                        public uncle(): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            if (this.parent != null) {
                                return this.parent.sibling();
                            } else {
                                return null;
                            }
                        }

                        public getLeft(): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            return this.left;
                        }

                        public setLeft(left: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
                            this.left = left;
                        }

                        public getRight(): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            return this.right;
                        }

                        public setRight(right: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
                            this.right = right;
                        }

                        public getParent(): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            return this.parent;
                        }

                        public setParent(parent: org.kevoree.modeling.api.rbtree.LongTreeNode): void {
                            this.parent = parent;
                        }

                        public serialize(builder: java.lang.StringBuilder): void {
                            builder.append("|");
                            if (this.color == org.kevoree.modeling.api.rbtree.Color.BLACK) {
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

                        public next(): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            var p: org.kevoree.modeling.api.rbtree.LongTreeNode = this;
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

                        public previous(): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            var p: org.kevoree.modeling.api.rbtree.LongTreeNode = this;
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

                        public static unserialize(ctx: org.kevoree.modeling.api.rbtree.TreeReaderContext): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            return org.kevoree.modeling.api.rbtree.LongTreeNode.internal_unserialize(true, ctx);
                        }

                        public static internal_unserialize(rightBranch: boolean, ctx: org.kevoree.modeling.api.rbtree.TreeReaderContext): org.kevoree.modeling.api.rbtree.LongTreeNode {
                            if (ctx.index >= ctx.payload.length) {
                                return null;
                            }
                            var ch: string = ctx.payload.charAt(ctx.index);
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
                            var color: org.kevoree.modeling.api.rbtree.Color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                            if (ch == LongTreeNode.RED) {
                                color = org.kevoree.modeling.api.rbtree.Color.RED;
                            }
                            ctx.index = ctx.index + 1;
                            ch = ctx.payload.charAt(ctx.index);
                            var i: number = 0;
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
                            var key: number = java.lang.Long.parseLong(StringUtils.copyValueOf(ctx.buffer, 0, i));
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
                            var value: number = java.lang.Long.parseLong(StringUtils.copyValueOf(ctx.buffer, 0, i));
                            var p: org.kevoree.modeling.api.rbtree.LongTreeNode = new org.kevoree.modeling.api.rbtree.LongTreeNode(key, value, color, null, null);
                            var left: org.kevoree.modeling.api.rbtree.LongTreeNode = org.kevoree.modeling.api.rbtree.LongTreeNode.internal_unserialize(false, ctx);
                            if (left != null) {
                                left.setParent(p);
                            }
                            var right: org.kevoree.modeling.api.rbtree.LongTreeNode = org.kevoree.modeling.api.rbtree.LongTreeNode.internal_unserialize(true, ctx);
                            if (right != null) {
                                right.setParent(p);
                            }
                            p.setLeft(left);
                            p.setRight(right);
                            return p;
                        }

                    }

                    export interface RBTree {

                        first(): number;

                        last(): number;

                        next(from: number): number;

                        previous(from: number): number;

                        resolve(time: number): number;

                        size(): number;

                    }

                    export class TreeNode {

                        public static BLACK: string = '0';
                        public static RED: string = '1';
                        public key: number;
                        public color: org.kevoree.modeling.api.rbtree.Color;
                        private left: org.kevoree.modeling.api.rbtree.TreeNode;
                        private right: org.kevoree.modeling.api.rbtree.TreeNode;
                        private parent: org.kevoree.modeling.api.rbtree.TreeNode = null;
                        public getKey(): number {
                            return this.key;
                        }

                        constructor(key: number, color: org.kevoree.modeling.api.rbtree.Color, left: org.kevoree.modeling.api.rbtree.TreeNode, right: org.kevoree.modeling.api.rbtree.TreeNode) {
                            this.key = key;
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

                        public grandparent(): org.kevoree.modeling.api.rbtree.TreeNode {
                            if (this.parent != null) {
                                return this.parent.parent;
                            } else {
                                return null;
                            }
                        }

                        public sibling(): org.kevoree.modeling.api.rbtree.TreeNode {
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

                        public uncle(): org.kevoree.modeling.api.rbtree.TreeNode {
                            if (this.parent != null) {
                                return this.parent.sibling();
                            } else {
                                return null;
                            }
                        }

                        public getLeft(): org.kevoree.modeling.api.rbtree.TreeNode {
                            return this.left;
                        }

                        public setLeft(left: org.kevoree.modeling.api.rbtree.TreeNode): void {
                            this.left = left;
                        }

                        public getRight(): org.kevoree.modeling.api.rbtree.TreeNode {
                            return this.right;
                        }

                        public setRight(right: org.kevoree.modeling.api.rbtree.TreeNode): void {
                            this.right = right;
                        }

                        public getParent(): org.kevoree.modeling.api.rbtree.TreeNode {
                            return this.parent;
                        }

                        public setParent(parent: org.kevoree.modeling.api.rbtree.TreeNode): void {
                            this.parent = parent;
                        }

                        public serialize(builder: java.lang.StringBuilder): void {
                            builder.append("|");
                            if (this.color == org.kevoree.modeling.api.rbtree.Color.BLACK) {
                                builder.append(TreeNode.BLACK);
                            } else {
                                builder.append(TreeNode.RED);
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

                        public next(): org.kevoree.modeling.api.rbtree.TreeNode {
                            var p: org.kevoree.modeling.api.rbtree.TreeNode = this;
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

                        public previous(): org.kevoree.modeling.api.rbtree.TreeNode {
                            var p: org.kevoree.modeling.api.rbtree.TreeNode = this;
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

                        public static unserialize(ctx: org.kevoree.modeling.api.rbtree.TreeReaderContext): org.kevoree.modeling.api.rbtree.TreeNode {
                            return org.kevoree.modeling.api.rbtree.TreeNode.internal_unserialize(true, ctx);
                        }

                        public static internal_unserialize(rightBranch: boolean, ctx: org.kevoree.modeling.api.rbtree.TreeReaderContext): org.kevoree.modeling.api.rbtree.TreeNode {
                            if (ctx.index >= ctx.payload.length) {
                                return null;
                            }
                            var tokenBuild: java.lang.StringBuilder = new java.lang.StringBuilder();
                            var ch: string = ctx.payload.charAt(ctx.index);
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
                            var color: org.kevoree.modeling.api.rbtree.Color;
                            if (ch == org.kevoree.modeling.api.rbtree.TreeNode.BLACK) {
                                color = org.kevoree.modeling.api.rbtree.Color.BLACK;
                            } else {
                                color = org.kevoree.modeling.api.rbtree.Color.RED;
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
                            var p: org.kevoree.modeling.api.rbtree.TreeNode = new org.kevoree.modeling.api.rbtree.TreeNode(java.lang.Long.parseLong(tokenBuild.toString()), color, null, null);
                            var left: org.kevoree.modeling.api.rbtree.TreeNode = org.kevoree.modeling.api.rbtree.TreeNode.internal_unserialize(false, ctx);
                            if (left != null) {
                                left.setParent(p);
                            }
                            var right: org.kevoree.modeling.api.rbtree.TreeNode = org.kevoree.modeling.api.rbtree.TreeNode.internal_unserialize(true, ctx);
                            if (right != null) {
                                right.setParent(p);
                            }
                            p.setLeft(left);
                            p.setRight(right);
                            return p;
                        }

                    }

                    export class TreeReaderContext {

                        public payload: string;
                        public index: number;
                        public buffer: string[];
                    }

                }
                export module reflexive {
                    export class DynamicKModel extends org.kevoree.modeling.api.abs.AbstractKModel<any> {

                        private _metaModel: org.kevoree.modeling.api.meta.MetaModel = null;
                        public setMetaModel(p_metaModel: org.kevoree.modeling.api.meta.MetaModel): void {
                            this._metaModel = p_metaModel;
                        }

                        public metaModel(): org.kevoree.modeling.api.meta.MetaModel {
                            return this._metaModel;
                        }

                        public internal_create(key: number): org.kevoree.modeling.api.KUniverse<any, any, any> {
                            return new org.kevoree.modeling.api.reflexive.DynamicKUniverse(this, key);
                        }

                    }

                    export class DynamicKObject extends org.kevoree.modeling.api.abs.AbstractKObject {

                        constructor(p_view: org.kevoree.modeling.api.KView, p_uuid: number, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
                            super(p_view, p_uuid, p_universeTree, p_metaClass);
                        }

                    }

                    export class DynamicKUniverse extends org.kevoree.modeling.api.abs.AbstractKUniverse<any, any, any> {

                        constructor(p_universe: org.kevoree.modeling.api.KModel<any>, p_key: number) {
                            super(p_universe, p_key);
                        }

                        public internal_create(timePoint: number): org.kevoree.modeling.api.KView {
                            return new org.kevoree.modeling.api.reflexive.DynamicKView(timePoint, this);
                        }

                    }

                    export class DynamicKView extends org.kevoree.modeling.api.abs.AbstractKView {

                        constructor(p_now: number, p_dimension: org.kevoree.modeling.api.KUniverse<any, any, any>) {
                            super(p_now, p_dimension);
                        }

                        public internalCreate(clazz: org.kevoree.modeling.api.meta.MetaClass, p_universeTree: org.kevoree.modeling.api.rbtree.LongRBTree, key: number): org.kevoree.modeling.api.KObject {
                            return new org.kevoree.modeling.api.reflexive.DynamicKObject(this, key, p_universeTree, clazz);
                        }

                    }

                    export class DynamicMetaClass extends org.kevoree.modeling.api.abs.AbstractMetaClass {

                        private cached_meta: java.util.HashMap<string, org.kevoree.modeling.api.meta.Meta> = new java.util.HashMap<string, org.kevoree.modeling.api.meta.Meta>();
                        private _globalIndex: number = -1;
                        constructor(p_name: string, p_index: number) {
                            super(p_name, p_index);
                            this._globalIndex = org.kevoree.modeling.api.data.manager.Index.RESERVED_INDEXES;
                        }

                        public addAttribute(p_name: string, p_type: org.kevoree.modeling.api.KType): org.kevoree.modeling.api.reflexive.DynamicMetaClass {
                            var tempAttribute: org.kevoree.modeling.api.abs.AbstractMetaAttribute = new org.kevoree.modeling.api.abs.AbstractMetaAttribute(p_name, this._globalIndex, -1, false, p_type, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                            this.cached_meta.put(tempAttribute.metaName(), tempAttribute);
                            this._globalIndex = this._globalIndex + 1;
                            this.internalInit();
                            return this;
                        }

                        public addReference(p_name: string, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, contained: boolean): org.kevoree.modeling.api.reflexive.DynamicMetaClass {
                            var tempOrigin: org.kevoree.modeling.api.meta.MetaClass = this;
                            var tempReference: org.kevoree.modeling.api.abs.AbstractMetaReference = new org.kevoree.modeling.api.abs.AbstractMetaReference(p_name, this._globalIndex, contained, false,  () => {
                                return p_metaClass;
                            }, null,  () => {
                                return tempOrigin;
                            });
                            this.cached_meta.put(tempReference.metaName(), tempReference);
                            this._globalIndex = this._globalIndex + 1;
                            this.internalInit();
                            return this;
                        }

                        public addOperation(p_name: string): org.kevoree.modeling.api.reflexive.DynamicMetaClass {
                            var tempOrigin: org.kevoree.modeling.api.meta.MetaClass = this;
                            var tempOperation: org.kevoree.modeling.api.abs.AbstractMetaOperation = new org.kevoree.modeling.api.abs.AbstractMetaOperation(p_name, this._globalIndex,  () => {
                                return tempOrigin;
                            });
                            this.cached_meta.put(tempOperation.metaName(), tempOperation);
                            this._globalIndex = this._globalIndex + 1;
                            this.internalInit();
                            return this;
                        }

                        private internalInit(): void {
                            var tempMeta: org.kevoree.modeling.api.meta.Meta[] = new Array();
                            var keysMeta: string[] = this.cached_meta.keySet().toArray(new Array());
                            for (var i: number = 0; i < keysMeta.length; i++) {
                                var resAtt: org.kevoree.modeling.api.meta.Meta = this.cached_meta.get(keysMeta[i]);
                                tempMeta[i] = resAtt;
                            }
                            this.init(tempMeta);
                        }

                    }

                    export class DynamicMetaModel implements org.kevoree.modeling.api.meta.MetaModel {

                        private _metaName: string = null;
                        private _classes: java.util.HashMap<string, org.kevoree.modeling.api.meta.MetaClass> = new java.util.HashMap<string, org.kevoree.modeling.api.meta.MetaClass>();
                        constructor(p_metaName: string) {
                            this._metaName = p_metaName;
                        }

                        public metaClasses(): org.kevoree.modeling.api.meta.MetaClass[] {
                            var tempResult: org.kevoree.modeling.api.meta.MetaClass[] = new Array();
                            var keys: string[] = this._classes.keySet().toArray(new Array());
                            for (var i: number = 0; i < keys.length; i++) {
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

                        public metaType(): org.kevoree.modeling.api.meta.MetaType {
                            return org.kevoree.modeling.api.meta.MetaType.MODEL;
                        }

                        public index(): number {
                            return -1;
                        }

                        public createMetaClass(name: string): org.kevoree.modeling.api.reflexive.DynamicMetaClass {
                            if (this._classes.containsKey(name)) {
                                return <org.kevoree.modeling.api.reflexive.DynamicMetaClass>this._classes.get(name);
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

                    }

                }
                export module scheduler {
                    export class DirectScheduler implements org.kevoree.modeling.api.KScheduler {

                        public dispatch(runnable: java.lang.Runnable): void {
                            runnable.run();
                        }

                        public stop(): void {
                        }

                    }

                    export class ExecutorServiceScheduler implements org.kevoree.modeling.api.KScheduler {

                        public dispatch(p_runnable: java.lang.Runnable): void {
                            p_runnable.run() ;
                        }

                        public stop(): void {
                        }

                    }

                }
                export module trace {
                    export class ModelAddTrace implements org.kevoree.modeling.api.trace.ModelTrace {

                        private _srcUUID: number;
                        private _reference: org.kevoree.modeling.api.meta.MetaReference;
                        private _paramUUID: number;
                        constructor(p_srcUUID: number, p_reference: org.kevoree.modeling.api.meta.MetaReference, p_paramUUID: number) {
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

                        public sourceUUID(): number {
                            return null;
                        }

                        public paramUUID(): number {
                            return this._paramUUID;
                        }

                    }

                    export class ModelNewTrace implements org.kevoree.modeling.api.trace.ModelTrace {

                        private _srcUUID: number;
                        private _metaClass: org.kevoree.modeling.api.meta.MetaClass;
                        constructor(p_srcUUID: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
                            this._srcUUID = p_srcUUID;
                            this._metaClass = p_metaClass;
                        }

                        public meta(): org.kevoree.modeling.api.meta.Meta {
                            return this._metaClass;
                        }

                        public traceType(): org.kevoree.modeling.api.KActionType {
                            return org.kevoree.modeling.api.KActionType.NEW;
                        }

                        public sourceUUID(): number {
                            return this._srcUUID;
                        }

                    }

                    export class ModelRemoveTrace implements org.kevoree.modeling.api.trace.ModelTrace {

                        private _srcUUID: number;
                        private _reference: org.kevoree.modeling.api.meta.MetaReference;
                        private _paramUUID: number;
                        constructor(p_srcUUID: number, p_reference: org.kevoree.modeling.api.meta.MetaReference, p_paramUUID: number) {
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

                        public sourceUUID(): number {
                            return this._srcUUID;
                        }

                        public paramUUID(): number {
                            return this._paramUUID;
                        }

                    }

                    export class ModelSetTrace implements org.kevoree.modeling.api.trace.ModelTrace {

                        private _srcUUID: number;
                        private _attribute: org.kevoree.modeling.api.meta.MetaAttribute;
                        private _content: any;
                        constructor(p_srcUUID: number, p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_content: any) {
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

                        public sourceUUID(): number {
                            return this._srcUUID;
                        }

                        public content(): any {
                            return this._content;
                        }

                    }

                    export interface ModelTrace {

                        meta(): org.kevoree.modeling.api.meta.Meta;

                        traceType(): org.kevoree.modeling.api.KActionType;

                        sourceUUID(): number;

                    }

                    export class ModelTraceApplicator {

                        private _targetModel: org.kevoree.modeling.api.KObject;
                        constructor(p_targetModel: org.kevoree.modeling.api.KObject) {
                            this._targetModel = p_targetModel;
                        }

                        public applyTraceSequence(traceSeq: org.kevoree.modeling.api.trace.TraceSequence, callback: (p : java.lang.Throwable) => void): void {
                            try {
                                var traces: org.kevoree.modeling.api.trace.ModelTrace[] = traceSeq.traces();
                                var dependencies: java.util.HashSet<number> = new java.util.HashSet<number>();
                                for (var i: number = 0; i < traces.length; i++) {
                                    if (traces[i] instanceof org.kevoree.modeling.api.trace.ModelAddTrace) {
                                        dependencies.add((<org.kevoree.modeling.api.trace.ModelAddTrace>traces[i]).paramUUID());
                                        dependencies.add(traces[i].sourceUUID());
                                    }
                                    if (traces[i] instanceof org.kevoree.modeling.api.trace.ModelRemoveTrace) {
                                        dependencies.add((<org.kevoree.modeling.api.trace.ModelRemoveTrace>traces[i]).paramUUID());
                                        dependencies.add(traces[i].sourceUUID());
                                    }
                                    if (traces[i] instanceof org.kevoree.modeling.api.trace.ModelSetTrace) {
                                        if (traces[i].meta() != null && traces[i].meta().metaType().equals(org.kevoree.modeling.api.meta.MetaType.ATTRIBUTE)) {
                                            dependencies.add(traces[i].sourceUUID());
                                        } else {
                                            try {
                                                var paramUUID: number = java.lang.Long.parseLong((<org.kevoree.modeling.api.trace.ModelSetTrace>traces[i]).content().toString());
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
                                var dependenciesArray: number[] = dependencies.toArray(new Array());
                                this._targetModel.view().lookupAll(dependenciesArray).then( (kObjects : org.kevoree.modeling.api.KObject[]) => {
                                    var cached: java.util.HashMap<number, org.kevoree.modeling.api.KObject> = new java.util.HashMap<number, org.kevoree.modeling.api.KObject>();
                                    for (var i: number = 0; i < traces.length; i++) {
                                        try {
                                            var trace: org.kevoree.modeling.api.trace.ModelTrace = traces[i];
                                            var sourceObject: org.kevoree.modeling.api.KObject = cached.get(trace.sourceUUID());
                                            if (sourceObject != null) {
                                                if (trace instanceof org.kevoree.modeling.api.trace.ModelRemoveTrace) {
                                                    var removeTrace: org.kevoree.modeling.api.trace.ModelRemoveTrace = <org.kevoree.modeling.api.trace.ModelRemoveTrace>trace;
                                                    var param: org.kevoree.modeling.api.KObject = cached.get(removeTrace.paramUUID());
                                                    if (param != null) {
                                                        sourceObject.mutate(org.kevoree.modeling.api.KActionType.REMOVE, <org.kevoree.modeling.api.meta.MetaReference>removeTrace.meta(), param);
                                                    }
                                                } else {
                                                    if (trace instanceof org.kevoree.modeling.api.trace.ModelAddTrace) {
                                                        var addTrace: org.kevoree.modeling.api.trace.ModelAddTrace = <org.kevoree.modeling.api.trace.ModelAddTrace>trace;
                                                        var param: org.kevoree.modeling.api.KObject = cached.get(addTrace.paramUUID());
                                                        if (param != null) {
                                                            sourceObject.mutate(org.kevoree.modeling.api.KActionType.ADD, <org.kevoree.modeling.api.meta.MetaReference>addTrace.meta(), param);
                                                        }
                                                    } else {
                                                        if (trace instanceof org.kevoree.modeling.api.trace.ModelSetTrace) {
                                                            var setTrace: org.kevoree.modeling.api.trace.ModelSetTrace = <org.kevoree.modeling.api.trace.ModelSetTrace>trace;
                                                            if (trace.meta() != null && trace.meta().metaType().equals(org.kevoree.modeling.api.meta.MetaType.ATTRIBUTE)) {
                                                                sourceObject.set(<org.kevoree.modeling.api.meta.MetaAttribute>trace.meta(), setTrace.content());
                                                            } else {
                                                                try {
                                                                    var paramUUID: number = java.lang.Long.parseLong((<org.kevoree.modeling.api.trace.ModelSetTrace>traces[i]).content().toString());
                                                                    var param: org.kevoree.modeling.api.KObject = cached.get(paramUUID);
                                                                    if (param != null) {
                                                                        sourceObject.mutate(org.kevoree.modeling.api.KActionType.SET, <org.kevoree.modeling.api.meta.MetaReference>trace.meta(), param);
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
                                                                var universeTree: org.kevoree.modeling.api.rbtree.LongRBTree = new org.kevoree.modeling.api.rbtree.LongRBTree();
                                                                universeTree.insert(this._targetModel.universe().key(), this._targetModel.now());
                                                                var newCreated: org.kevoree.modeling.api.KObject = (<org.kevoree.modeling.api.abs.AbstractKView>this._targetModel.view()).createProxy(<org.kevoree.modeling.api.meta.MetaClass>trace.meta(), universeTree, trace.sourceUUID());
                                                                this._targetModel.universe().model().manager().initKObject(newCreated, this._targetModel.view());
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

                    }

                    export class ModelTraceConstants {

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
                    }

                    export class TraceSequence {

                        private _traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
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
                            var isFirst: boolean = true;
                            for (var i: number = 0; i < this._traces.size(); i++) {
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

                        public applyOn(target: org.kevoree.modeling.api.KObject, callback: (p : java.lang.Throwable) => void): boolean {
                            var traceApplicator: org.kevoree.modeling.api.trace.ModelTraceApplicator = new org.kevoree.modeling.api.trace.ModelTraceApplicator(target);
                            traceApplicator.applyTraceSequence(this, callback);
                            return true;
                        }

                        public reverse(): org.kevoree.modeling.api.trace.TraceSequence {
                            java.util.Collections.reverse(this._traces);
                            return this;
                        }

                        public size(): number {
                            return this._traces.size();
                        }

                    }

                }
                export module traversal {
                    export class DefaultKTraversal implements org.kevoree.modeling.api.traversal.KTraversal {

                        private _initObjs: org.kevoree.modeling.api.KObject[];
                        private _initAction: org.kevoree.modeling.api.traversal.KTraversalAction;
                        private _lastAction: org.kevoree.modeling.api.traversal.KTraversalAction;
                        private _terminated: boolean = false;
                        private static TERMINATED_MESSAGE: string = "Promise is terminated by the call of then method, please create another promise";
                        constructor(p_root: org.kevoree.modeling.api.KObject, p_initAction: org.kevoree.modeling.api.traversal.KTraversalAction) {
                            this._initAction = p_initAction;
                            this._initObjs = new Array();
                            this._initObjs[0] = p_root;
                            this._lastAction = this._initAction;
                        }

                        public traverse(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.traversal.KTraversal {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException(DefaultKTraversal.TERMINATED_MESSAGE);
                            }
                            var tempAction: org.kevoree.modeling.api.traversal.actions.KTraverseAction = new org.kevoree.modeling.api.traversal.actions.KTraverseAction(p_metaReference);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        }

                        public traverseQuery(p_metaReferenceQuery: string): org.kevoree.modeling.api.traversal.KTraversal {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException(DefaultKTraversal.TERMINATED_MESSAGE);
                            }
                            var tempAction: org.kevoree.modeling.api.traversal.actions.KTraverseQueryAction = new org.kevoree.modeling.api.traversal.actions.KTraverseQueryAction(p_metaReferenceQuery);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        }

                        public withAttribute(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_expectedValue: any): org.kevoree.modeling.api.traversal.KTraversal {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException(DefaultKTraversal.TERMINATED_MESSAGE);
                            }
                            var tempAction: org.kevoree.modeling.api.traversal.actions.KFilterAttributeAction = new org.kevoree.modeling.api.traversal.actions.KFilterAttributeAction(p_attribute, p_expectedValue);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        }

                        public withoutAttribute(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_expectedValue: any): org.kevoree.modeling.api.traversal.KTraversal {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException(DefaultKTraversal.TERMINATED_MESSAGE);
                            }
                            var tempAction: org.kevoree.modeling.api.traversal.actions.KFilterNotAttributeAction = new org.kevoree.modeling.api.traversal.actions.KFilterNotAttributeAction(p_attribute, p_expectedValue);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        }

                        public attributeQuery(p_attributeQuery: string): org.kevoree.modeling.api.traversal.KTraversal {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException(DefaultKTraversal.TERMINATED_MESSAGE);
                            }
                            var tempAction: org.kevoree.modeling.api.traversal.actions.KFilterAttributeQueryAction = new org.kevoree.modeling.api.traversal.actions.KFilterAttributeQueryAction(p_attributeQuery);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        }

                        public filter(p_filter: (p : org.kevoree.modeling.api.KObject) => boolean): org.kevoree.modeling.api.traversal.KTraversal {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException(DefaultKTraversal.TERMINATED_MESSAGE);
                            }
                            var tempAction: org.kevoree.modeling.api.traversal.actions.KFilterAction = new org.kevoree.modeling.api.traversal.actions.KFilterAction(p_filter);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        }

                        public reverse(p_metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.traversal.KTraversal {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException(DefaultKTraversal.TERMINATED_MESSAGE);
                            }
                            var tempAction: org.kevoree.modeling.api.traversal.actions.KReverseAction = new org.kevoree.modeling.api.traversal.actions.KReverseAction(p_metaReference);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        }

                        public reverseQuery(p_metaReferenceQuery: string): org.kevoree.modeling.api.traversal.KTraversal {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException(DefaultKTraversal.TERMINATED_MESSAGE);
                            }
                            var tempAction: org.kevoree.modeling.api.traversal.actions.KReverseQueryAction = new org.kevoree.modeling.api.traversal.actions.KReverseQueryAction(p_metaReferenceQuery);
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        }

                        public parents(): org.kevoree.modeling.api.traversal.KTraversal {
                            if (this._terminated) {
                                throw new java.lang.RuntimeException(DefaultKTraversal.TERMINATED_MESSAGE);
                            }
                            var tempAction: org.kevoree.modeling.api.traversal.actions.KParentsAction = new org.kevoree.modeling.api.traversal.actions.KParentsAction();
                            this._lastAction.chain(tempAction);
                            this._lastAction = tempAction;
                            return this;
                        }

                        public then(): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this._terminated = true;
                            this._lastAction.chain(new org.kevoree.modeling.api.traversal.actions.KFinalAction(task.initCallback()));
                            this._initAction.execute(this._initObjs);
                            return task;
                        }

                        public map(attribute: org.kevoree.modeling.api.meta.MetaAttribute): org.kevoree.modeling.api.KDefer<any> {
                            var task: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this._terminated = true;
                            this._lastAction.chain(new org.kevoree.modeling.api.traversal.actions.KMapAction(attribute, task.initCallback()));
                            this._initAction.execute(this._initObjs);
                            return task;
                        }

                    }

                    export interface KTraversal {

                        traverse(metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.traversal.KTraversal;

                        traverseQuery(metaReferenceQuery: string): org.kevoree.modeling.api.traversal.KTraversal;

                        attributeQuery(attributeQuery: string): org.kevoree.modeling.api.traversal.KTraversal;

                        withAttribute(attribute: org.kevoree.modeling.api.meta.MetaAttribute, expectedValue: any): org.kevoree.modeling.api.traversal.KTraversal;

                        withoutAttribute(attribute: org.kevoree.modeling.api.meta.MetaAttribute, expectedValue: any): org.kevoree.modeling.api.traversal.KTraversal;

                        filter(filter: (p : org.kevoree.modeling.api.KObject) => boolean): org.kevoree.modeling.api.traversal.KTraversal;

                        reverse(metaReference: org.kevoree.modeling.api.meta.MetaReference): org.kevoree.modeling.api.traversal.KTraversal;

                        reverseQuery(metaReferenceQuery: string): org.kevoree.modeling.api.traversal.KTraversal;

                        parents(): org.kevoree.modeling.api.traversal.KTraversal;

                        then(): org.kevoree.modeling.api.KDefer<any>;

                        map(attribute: org.kevoree.modeling.api.meta.MetaAttribute): org.kevoree.modeling.api.KDefer<any>;

                    }

                    export interface KTraversalAction {

                        chain(next: org.kevoree.modeling.api.traversal.KTraversalAction): void;

                        execute(inputs: org.kevoree.modeling.api.KObject[]): void;

                    }

                    export interface KTraversalFilter {

                        filter(obj: org.kevoree.modeling.api.KObject): boolean;

                    }

                    export module actions {
                        export class KFilterAction implements org.kevoree.modeling.api.traversal.KTraversalAction {

                            private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
                            private _filter: (p : org.kevoree.modeling.api.KObject) => boolean;
                            constructor(p_filter: (p : org.kevoree.modeling.api.KObject) => boolean) {
                                this._filter = p_filter;
                            }

                            public chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void {
                                this._next = p_next;
                            }

                            public execute(p_inputs: org.kevoree.modeling.api.KObject[]): void {
                                var nextStep: java.util.Set<org.kevoree.modeling.api.KObject> = new java.util.HashSet<org.kevoree.modeling.api.KObject>();
                                for (var i: number = 0; i < p_inputs.length; i++) {
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

                        }

                        export class KFilterAttributeAction implements org.kevoree.modeling.api.traversal.KTraversalAction {

                            private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
                            private _attribute: org.kevoree.modeling.api.meta.MetaAttribute;
                            private _expectedValue: any;
                            constructor(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_expectedValue: any) {
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
                                    for (var i: number = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj: org.kevoree.modeling.api.abs.AbstractKObject = <org.kevoree.modeling.api.abs.AbstractKObject>p_inputs[i];
                                            var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = currentView.universe().model().manager().entry(loopObj, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                                            if (raw != null) {
                                                if (this._attribute == null) {
                                                    if (this._expectedValue == null) {
                                                        nextStep.add(loopObj);
                                                    } else {
                                                        var addToNext: boolean = false;
                                                        for (var j: number = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                                            var ref: org.kevoree.modeling.api.meta.MetaAttribute = loopObj.metaClass().metaAttributes()[j];
                                                            var resolved: any = raw.get(ref.index());
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
                                                        var resolved: any = raw.get(translatedAtt.index());
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

                        }

                        export class KFilterAttributeQueryAction implements org.kevoree.modeling.api.traversal.KTraversalAction {

                            private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
                            private _attributeQuery: string;
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
                                    var nextStep: java.util.Set<org.kevoree.modeling.api.KObject> = new java.util.HashSet<org.kevoree.modeling.api.KObject>();
                                    for (var i: number = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj: org.kevoree.modeling.api.abs.AbstractKObject = <org.kevoree.modeling.api.abs.AbstractKObject>p_inputs[i];
                                            if (this._attributeQuery == null) {
                                                nextStep.add(loopObj);
                                            } else {
                                                var params: java.util.Map<string, org.kevoree.modeling.api.traversal.selector.KQueryParam> = this.buildParams(this._attributeQuery);
                                                var selectedForNext: boolean = true;
                                                var paramKeys: string[] = params.keySet().toArray(new Array());
                                                for (var h: number = 0; h < paramKeys.length; h++) {
                                                    var param: org.kevoree.modeling.api.traversal.selector.KQueryParam = params.get(paramKeys[h]);
                                                    for (var j: number = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                                        var metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute = loopObj.metaClass().metaAttributes()[j];
                                                        if (metaAttribute.metaName().matches(param.name())) {
                                                            var o_raw: any = loopObj.get(metaAttribute);
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
                                var iParam: number = 0;
                                var lastStart: number = iParam;
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
                                                var negative: boolean = paramKey.endsWith("!");
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
                                        var negative: boolean = paramKey.endsWith("!");
                                        pObject = new org.kevoree.modeling.api.traversal.selector.KQueryParam(paramKey.replace("!", "").replace("*", ".*"), pArray[1].trim().replace("*", ".*"), negative);
                                        params.put(pObject.name(), pObject);
                                    }
                                }
                                return params;
                            }

                        }

                        export class KFilterNotAttributeAction implements org.kevoree.modeling.api.traversal.KTraversalAction {

                            private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
                            private _attribute: org.kevoree.modeling.api.meta.MetaAttribute;
                            private _expectedValue: any;
                            constructor(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_expectedValue: any) {
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
                                    for (var i: number = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj: org.kevoree.modeling.api.abs.AbstractKObject = <org.kevoree.modeling.api.abs.AbstractKObject>p_inputs[i];
                                            var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = currentView.universe().model().manager().entry(loopObj, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                                            if (raw != null) {
                                                if (this._attribute == null) {
                                                    if (this._expectedValue == null) {
                                                        nextStep.add(loopObj);
                                                    } else {
                                                        var addToNext: boolean = true;
                                                        for (var j: number = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                                            var ref: org.kevoree.modeling.api.meta.MetaAttribute = loopObj.metaClass().metaAttributes()[j];
                                                            var resolved: any = raw.get(ref.index());
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
                                                        var resolved: any = raw.get(translatedAtt.index());
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

                        }

                        export class KFinalAction implements org.kevoree.modeling.api.traversal.KTraversalAction {

                            private _finalCallback: (p : org.kevoree.modeling.api.KObject[]) => void;
                            constructor(p_callback: (p : org.kevoree.modeling.api.KObject[]) => void) {
                                this._finalCallback = p_callback;
                            }

                            public chain(next: org.kevoree.modeling.api.traversal.KTraversalAction): void {
                            }

                            public execute(inputs: org.kevoree.modeling.api.KObject[]): void {
                                this._finalCallback(inputs);
                            }

                        }

                        export class KMapAction implements org.kevoree.modeling.api.traversal.KTraversalAction {

                            private _finalCallback: (p : any[]) => void;
                            private _attribute: org.kevoree.modeling.api.meta.MetaAttribute;
                            constructor(p_attribute: org.kevoree.modeling.api.meta.MetaAttribute, p_callback: (p : any[]) => void) {
                                this._finalCallback = p_callback;
                                this._attribute = p_attribute;
                            }

                            public chain(next: org.kevoree.modeling.api.traversal.KTraversalAction): void {
                            }

                            public execute(inputs: org.kevoree.modeling.api.KObject[]): void {
                                var collected: java.util.List<any> = new java.util.ArrayList<any>();
                                for (var i: number = 0; i < inputs.length; i++) {
                                    if (inputs[i] != null) {
                                        var resolved: any = inputs[i].get(this._attribute);
                                        if (resolved != null) {
                                            collected.add(resolved);
                                        }
                                    }
                                }
                                this._finalCallback(collected.toArray(new Array()));
                            }

                        }

                        export class KParentsAction implements org.kevoree.modeling.api.traversal.KTraversalAction {

                            private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
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
                                    var currentView: org.kevoree.modeling.api.abs.AbstractKView = <org.kevoree.modeling.api.abs.AbstractKView>p_inputs[0].view();
                                    var nextIds: java.util.Set<number> = new java.util.HashSet<number>();
                                    for (var i: number = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj: org.kevoree.modeling.api.abs.AbstractKObject = <org.kevoree.modeling.api.abs.AbstractKObject>p_inputs[i];
                                            var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = currentView.universe().model().manager().entry(loopObj, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                                            var resolved: any = raw.get(org.kevoree.modeling.api.data.manager.Index.PARENT_INDEX);
                                            if (resolved != null) {
                                                try {
                                                    nextIds.add(<number>resolved);
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
                                    currentView.internalLookupAll(nextIds.toArray(new Array()),  (kObjects : org.kevoree.modeling.api.KObject[]) => {
                                        this._next.execute(kObjects);
                                    });
                                }
                            }

                        }

                        export class KReverseAction implements org.kevoree.modeling.api.traversal.KTraversalAction {

                            private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
                            private _reference: org.kevoree.modeling.api.meta.MetaReference;
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
                                    var currentView: org.kevoree.modeling.api.abs.AbstractKView = <org.kevoree.modeling.api.abs.AbstractKView>p_inputs[0].view();
                                    var nextIds: java.util.Set<number> = new java.util.HashSet<number>();
                                    var toFilter: java.util.Map<number, org.kevoree.modeling.api.KObject> = new java.util.HashMap<number, org.kevoree.modeling.api.KObject>();
                                    for (var i: number = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj: org.kevoree.modeling.api.abs.AbstractKObject = <org.kevoree.modeling.api.abs.AbstractKObject>p_inputs[i];
                                            var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = currentView.universe().model().manager().entry(loopObj, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                                            if (raw != null) {
                                                if (this._reference == null) {
                                                    if (raw.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) != null && raw.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) instanceof java.util.Set) {
                                                        var casted: java.util.Set<number> = <java.util.Set<number>>raw.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX);
                                                        var castedArr: number[] = casted.toArray(new Array());
                                                        for (var j: number = 0; j < castedArr.length; j++) {
                                                            nextIds.add(castedArr[j]);
                                                        }
                                                    }
                                                } else {
                                                    if (raw.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) != null && raw.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) instanceof java.util.Set) {
                                                        var casted: java.util.Set<number> = <java.util.Set<number>>raw.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX);
                                                        var castedArr: number[] = casted.toArray(new Array());
                                                        for (var j: number = 0; j < castedArr.length; j++) {
                                                            toFilter.put(castedArr[j], p_inputs[i]);
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
                                    if (toFilter.keySet().size() == 0) {
                                        currentView.internalLookupAll(nextIds.toArray(new Array()),  (kObjects : org.kevoree.modeling.api.KObject[]) => {
                                            this._next.execute(kObjects);
                                        });
                                    } else {
                                        var toFilterKeys: number[] = toFilter.keySet().toArray(new Array());
                                        currentView.internalLookupAll(toFilterKeys,  (kObjects : org.kevoree.modeling.api.KObject[]) => {
                                            for (var i: number = 0; i < toFilterKeys.length; i++) {
                                                if (kObjects[i] != null) {
                                                    var references: org.kevoree.modeling.api.meta.MetaReference[] = kObjects[i].referencesWith(toFilter.get(toFilterKeys[i]));
                                                    for (var h: number = 0; h < references.length; h++) {
                                                        if (references[h].metaName().equals(this._reference.metaName())) {
                                                            nextIds.add(kObjects[i].uuid());
                                                        }
                                                    }
                                                }
                                            }
                                            currentView.internalLookupAll(nextIds.toArray(new Array()),  (kObjects : org.kevoree.modeling.api.KObject[]) => {
                                                this._next.execute(kObjects);
                                            });
                                        });
                                    }
                                }
                            }

                        }

                        export class KReverseQueryAction implements org.kevoree.modeling.api.traversal.KTraversalAction {

                            private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
                            private _referenceQuery: string;
                            constructor(p_referenceQuery: string) {
                                if (this._referenceQuery != null) {
                                    this._referenceQuery = p_referenceQuery.replace("*", ".*");
                                }
                            }

                            public chain(p_next: org.kevoree.modeling.api.traversal.KTraversalAction): void {
                                this._next = p_next;
                            }

                            public execute(p_inputs: org.kevoree.modeling.api.KObject[]): void {
                                if (p_inputs == null || p_inputs.length == 0) {
                                    this._next.execute(p_inputs);
                                    return;
                                } else {
                                    var currentView: org.kevoree.modeling.api.abs.AbstractKView = <org.kevoree.modeling.api.abs.AbstractKView>p_inputs[0].view();
                                    var nextIds: java.util.Set<number> = new java.util.HashSet<number>();
                                    var toFilter: java.util.Map<number, org.kevoree.modeling.api.KObject> = new java.util.HashMap<number, org.kevoree.modeling.api.KObject>();
                                    for (var i: number = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj: org.kevoree.modeling.api.abs.AbstractKObject = <org.kevoree.modeling.api.abs.AbstractKObject>p_inputs[i];
                                            var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = currentView.universe().model().manager().entry(loopObj, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                                            if (raw != null) {
                                                if (this._referenceQuery == null) {
                                                    if (raw.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) != null && raw.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) instanceof java.util.Set) {
                                                        var casted: java.util.Set<number> = <java.util.Set<number>>raw.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX);
                                                        var castedArr: number[] = casted.toArray(new Array());
                                                        for (var j: number = 0; j < castedArr.length; j++) {
                                                            nextIds.add(castedArr[j]);
                                                        }
                                                    }
                                                } else {
                                                    if (raw.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) != null && raw.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX) instanceof java.util.Set) {
                                                        var casted: java.util.Set<number> = <java.util.Set<number>>raw.get(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX);
                                                        var castedArr: number[] = casted.toArray(new Array());
                                                        for (var j: number = 0; j < castedArr.length; j++) {
                                                            toFilter.put(castedArr[j], p_inputs[i]);
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
                                    if (toFilter.keySet().size() == 0) {
                                        currentView.internalLookupAll(nextIds.toArray(new Array()),  (kObjects : org.kevoree.modeling.api.KObject[]) => {
                                            this._next.execute(kObjects);
                                        });
                                    } else {
                                        var toFilterKeys: number[] = toFilter.keySet().toArray(new Array());
                                        currentView.internalLookupAll(toFilterKeys,  (kObjects : org.kevoree.modeling.api.KObject[]) => {
                                            for (var i: number = 0; i < toFilterKeys.length; i++) {
                                                if (kObjects[i] != null) {
                                                    var references: org.kevoree.modeling.api.meta.MetaReference[] = kObjects[i].referencesWith(toFilter.get(toFilterKeys[i]));
                                                    for (var h: number = 0; h < references.length; h++) {
                                                        if (references[h].metaName().matches(this._referenceQuery)) {
                                                            nextIds.add(kObjects[i].uuid());
                                                        }
                                                    }
                                                }
                                            }
                                            currentView.internalLookupAll(nextIds.toArray(new Array()),  (kObjects : org.kevoree.modeling.api.KObject[]) => {
                                                this._next.execute(kObjects);
                                            });
                                        });
                                    }
                                }
                            }

                        }

                        export class KTraverseAction implements org.kevoree.modeling.api.traversal.KTraversalAction {

                            private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
                            private _reference: org.kevoree.modeling.api.meta.MetaReference;
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
                                    var currentView: org.kevoree.modeling.api.abs.AbstractKView = <org.kevoree.modeling.api.abs.AbstractKView>p_inputs[0].view();
                                    var nextIds: java.util.Set<number> = new java.util.HashSet<number>();
                                    for (var i: number = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj: org.kevoree.modeling.api.abs.AbstractKObject = <org.kevoree.modeling.api.abs.AbstractKObject>p_inputs[i];
                                            var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = currentView.universe().model().manager().entry(loopObj, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                                            if (raw != null) {
                                                if (this._reference == null) {
                                                    for (var j: number = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                                                        var ref: org.kevoree.modeling.api.meta.MetaReference = loopObj.metaClass().metaReferences()[j];
                                                        var resolved: any = raw.get(ref.index());
                                                        if (resolved != null) {
                                                            if (resolved instanceof java.util.Set) {
                                                                var resolvedCasted: java.util.Set<number> = <java.util.Set<number>>resolved;
                                                                var resolvedArr: number[] = resolvedCasted.toArray(new Array());
                                                                for (var k: number = 0; k < resolvedArr.length; k++) {
                                                                    var idResolved: number = resolvedArr[k];
                                                                    if (idResolved != null) {
                                                                        nextIds.add(idResolved);
                                                                    }
                                                                }
                                                            } else {
                                                                try {
                                                                    nextIds.add(<number>resolved);
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
                                                        var resolved: any = raw.get(translatedRef.index());
                                                        if (resolved != null) {
                                                            if (resolved instanceof java.util.Set) {
                                                                var resolvedCasted: java.util.Set<number> = <java.util.Set<number>>resolved;
                                                                var resolvedArr: number[] = resolvedCasted.toArray(new Array());
                                                                for (var j: number = 0; j < resolvedArr.length; j++) {
                                                                    var idResolved: number = resolvedArr[j];
                                                                    if (idResolved != null) {
                                                                        nextIds.add(idResolved);
                                                                    }
                                                                }
                                                            } else {
                                                                try {
                                                                    nextIds.add(<number>resolved);
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
                                    currentView.internalLookupAll(nextIds.toArray(new Array()),  (kObjects : org.kevoree.modeling.api.KObject[]) => {
                                        this._next.execute(kObjects);
                                    });
                                }
                            }

                        }

                        export class KTraverseQueryAction implements org.kevoree.modeling.api.traversal.KTraversalAction {

                            private SEP: string = ",";
                            private _next: org.kevoree.modeling.api.traversal.KTraversalAction;
                            private _referenceQuery: string;
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
                                    var currentView: org.kevoree.modeling.api.abs.AbstractKView = <org.kevoree.modeling.api.abs.AbstractKView>p_inputs[0].view();
                                    var nextIds: java.util.Set<number> = new java.util.HashSet<number>();
                                    for (var i: number = 0; i < p_inputs.length; i++) {
                                        try {
                                            var loopObj: org.kevoree.modeling.api.abs.AbstractKObject = <org.kevoree.modeling.api.abs.AbstractKObject>p_inputs[i];
                                            var raw: org.kevoree.modeling.api.data.cache.KCacheEntry = currentView.universe().model().manager().entry(loopObj, org.kevoree.modeling.api.data.manager.AccessMode.READ);
                                            if (raw != null) {
                                                if (this._referenceQuery == null) {
                                                    for (var j: number = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                                                        var ref: org.kevoree.modeling.api.meta.MetaReference = loopObj.metaClass().metaReferences()[j];
                                                        var resolved: any = raw.get(ref.index());
                                                        if (resolved != null) {
                                                            if (resolved instanceof java.util.Set) {
                                                                var resolvedCasted: java.util.Set<number> = <java.util.Set<number>>resolved;
                                                                var resolvedArr: number[] = resolvedCasted.toArray(new Array());
                                                                for (var k: number = 0; k < resolvedArr.length; k++) {
                                                                    var idResolved: number = resolvedArr[k];
                                                                    if (idResolved != null) {
                                                                        nextIds.add(idResolved);
                                                                    }
                                                                }
                                                            } else {
                                                                try {
                                                                    nextIds.add(<number>resolved);
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
                                                    for (var k: number = 0; k < queries.length; k++) {
                                                        queries[k] = queries[k].replace("*", ".*");
                                                    }
                                                    var loopRefs: org.kevoree.modeling.api.meta.MetaReference[] = loopObj.metaClass().metaReferences();
                                                    for (var h: number = 0; h < loopRefs.length; h++) {
                                                        var ref: org.kevoree.modeling.api.meta.MetaReference = loopRefs[h];
                                                        var selected: boolean = false;
                                                        for (var k: number = 0; k < queries.length; k++) {
                                                            if (ref.metaName().matches(queries[k])) {
                                                                selected = true;
                                                                break;
                                                            }
                                                        }
                                                        if (selected) {
                                                            var resolved: any = raw.get(ref.index());
                                                            if (resolved != null) {
                                                                if (resolved instanceof java.util.Set) {
                                                                    var resolvedCasted: java.util.Set<number> = <java.util.Set<number>>resolved;
                                                                    var resolvedArr: number[] = resolvedCasted.toArray(new Array());
                                                                    for (var j: number = 0; j < resolvedArr.length; j++) {
                                                                        var idResolved: number = resolvedArr[j];
                                                                        if (idResolved != null) {
                                                                            nextIds.add(idResolved);
                                                                        }
                                                                    }
                                                                } else {
                                                                    try {
                                                                        nextIds.add(<number>resolved);
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
                                        } catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                e.printStackTrace();
                                            }
                                         }
                                    }
                                    currentView.internalLookupAll(nextIds.toArray(new Array()),  (kObjects : org.kevoree.modeling.api.KObject[]) => {
                                        this._next.execute(kObjects);
                                    });
                                }
                            }

                        }

                    }
                    export module selector {
                        export class KQuery {

                            public static OPEN_BRACKET: string = '[';
                            public static CLOSE_BRACKET: string = ']';
                            public static QUERY_SEP: string = '/';
                            public relationName: string;
                            public params: string;
                            constructor(relationName: string, params: string) {
                                this.relationName = relationName;
                                this.params = params;
                            }

                            public toString(): string {
                                return "KQuery{" + "relationName='" + this.relationName + '\'' + ", params='" + this.params + '\'' + '}';
                            }

                            public static buildChain(query: string): java.util.List<org.kevoree.modeling.api.traversal.selector.KQuery> {
                                var result: java.util.List<org.kevoree.modeling.api.traversal.selector.KQuery> = new java.util.ArrayList<org.kevoree.modeling.api.traversal.selector.KQuery>();
                                if (query == null || query.length == 0) {
                                    return null;
                                }
                                var i: number = 0;
                                var escaped: boolean = false;
                                var previousKQueryStart: number = 0;
                                var previousKQueryNameEnd: number = -1;
                                var previousKQueryAttributesEnd: number = -1;
                                var previousKQueryAttributesStart: number = 0;
                                while (i < query.length){
                                    var notLastElem: boolean = (i + 1) != query.length;
                                    if (escaped && notLastElem) {
                                        escaped = false;
                                    } else {
                                        var currentChar: string = query.charAt(i);
                                        if (currentChar == KQuery.CLOSE_BRACKET && notLastElem) {
                                            previousKQueryAttributesEnd = i;
                                        } else {
                                            if (currentChar == '\\' && notLastElem) {
                                                escaped = true;
                                            } else {
                                                if (currentChar == KQuery.OPEN_BRACKET && notLastElem) {
                                                    previousKQueryNameEnd = i;
                                                    previousKQueryAttributesStart = i + 1;
                                                } else {
                                                    if (currentChar == KQuery.QUERY_SEP || !notLastElem) {
                                                        var relationName: string;
                                                        var atts: string = null;
                                                        if (previousKQueryNameEnd == -1) {
                                                            if (notLastElem) {
                                                                previousKQueryNameEnd = i;
                                                            } else {
                                                                previousKQueryNameEnd = i + 1;
                                                            }
                                                        } else {
                                                            if (previousKQueryAttributesStart != -1) {
                                                                if (previousKQueryAttributesEnd == -1) {
                                                                    if (notLastElem || currentChar == KQuery.QUERY_SEP || currentChar == KQuery.CLOSE_BRACKET) {
                                                                        previousKQueryAttributesEnd = i;
                                                                    } else {
                                                                        previousKQueryAttributesEnd = i + 1;
                                                                    }
                                                                }
                                                                atts = query.substring(previousKQueryAttributesStart, previousKQueryAttributesEnd);
                                                                if (atts.length == 0) {
                                                                    atts = null;
                                                                }
                                                            }
                                                        }
                                                        relationName = query.substring(previousKQueryStart, previousKQueryNameEnd);
                                                        var additionalQuery: org.kevoree.modeling.api.traversal.selector.KQuery = new org.kevoree.modeling.api.traversal.selector.KQuery(relationName, atts);
                                                        result.add(additionalQuery);
                                                        previousKQueryStart = i + 1;
                                                        previousKQueryNameEnd = -1;
                                                        previousKQueryAttributesEnd = -1;
                                                        previousKQueryAttributesStart = -1;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    i = i + 1;
                                }
                                return result;
                            }

                        }

                        export class KQueryParam {

                            private _name: string;
                            private _value: string;
                            private _negative: boolean;
                            constructor(p_name: string, p_value: string, p_negative: boolean) {
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

                            public isNegative(): boolean {
                                return this._negative;
                            }

                        }

                        export class KSelector {

                            public static select(root: org.kevoree.modeling.api.KObject, query: string, callback: (p : org.kevoree.modeling.api.KObject[]) => void): void {
                                if (callback == null) {
                                    return;
                                }
                                var current: org.kevoree.modeling.api.traversal.KTraversal = null;
                                var extracted: java.util.List<org.kevoree.modeling.api.traversal.selector.KQuery> = org.kevoree.modeling.api.traversal.selector.KQuery.buildChain(query);
                                if (extracted != null) {
                                    for (var i: number = 0; i < extracted.size(); i++) {
                                        if (current == null) {
                                            if (extracted.get(i).relationName.equals("..")) {
                                                current = root.traverseInbounds("*");
                                            } else {
                                                if (extracted.get(i).relationName.startsWith("..")) {
                                                    current = root.traverseInbounds(extracted.get(i).relationName.substring(2));
                                                } else {
                                                    if (extracted.get(i).relationName.equals("@parent")) {
                                                        current = root.traverseParent();
                                                    } else {
                                                        current = root.traverseQuery(extracted.get(i).relationName);
                                                    }
                                                }
                                            }
                                        } else {
                                            if (extracted.get(i).relationName.equals("..")) {
                                                current = current.reverseQuery("*");
                                            } else {
                                                if (extracted.get(i).relationName.startsWith("..")) {
                                                    current = current.reverseQuery(extracted.get(i).relationName.substring(2));
                                                } else {
                                                    if (extracted.get(i).relationName.equals("@parent")) {
                                                        current = current.parents();
                                                    } else {
                                                        current = current.traverseQuery(extracted.get(i).relationName);
                                                    }
                                                }
                                            }
                                        }
                                        current = current.attributeQuery(extracted.get(i).params);
                                    }
                                }
                                if (current != null) {
                                    current.then().then(callback);
                                } else {
                                    callback(new Array());
                                }
                            }

                        }

                    }
                }
                export module util {
                    export class Checker {

                        public static isDefined(param: any): boolean {
                            return param != undefined && param != null;
                        }

                    }

                    export class DefaultOperationManager implements org.kevoree.modeling.api.util.KOperationManager {

                        private staticOperations: java.util.Map<number, java.util.Map<number, (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void>> = new java.util.HashMap<number, java.util.Map<number, (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void>>();
                        private instanceOperations: java.util.Map<number, java.util.Map<number, (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void>> = new java.util.HashMap<number, java.util.Map<number, (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void>>();
                        private _manager: org.kevoree.modeling.api.data.manager.KDataManager;
                        private static DIM_INDEX: number = 0;
                        private static TIME_INDEX: number = 1;
                        private static UUID_INDEX: number = 2;
                        private static OPERATION_INDEX: number = 3;
                        private static TUPLE_SIZE: number = 4;
                        private remoteCallCallbacks: java.util.HashMap<number[], (p : any) => void> = new java.util.HashMap<number[], (p : any) => void>();
                        constructor(p_manager: org.kevoree.modeling.api.data.manager.KDataManager) {
                            this._manager = p_manager;
                        }

                        public registerOperation(operation: org.kevoree.modeling.api.meta.MetaOperation, callback: (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void, target: org.kevoree.modeling.api.KObject): void {
                            if (target == null) {
                                var clazzOperations: java.util.Map<number, (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void> = this.staticOperations.get(operation.origin().index());
                                if (clazzOperations == null) {
                                    clazzOperations = new java.util.HashMap<number, (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void>();
                                    this.staticOperations.put(operation.origin().index(), clazzOperations);
                                }
                                clazzOperations.put(operation.index(), callback);
                            } else {
                                var objectOperations: java.util.Map<number, (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void> = this.instanceOperations.get(target.uuid());
                                if (objectOperations == null) {
                                    objectOperations = new java.util.HashMap<number, (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void>();
                                    this.instanceOperations.put(target.uuid(), objectOperations);
                                }
                                objectOperations.put(operation.index(), callback);
                            }
                        }

                        private searchOperation(source: number, clazz: number, operation: number): (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void {
                            var objectOperations: java.util.Map<number, (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void> = this.instanceOperations.get(source);
                            if (objectOperations != null) {
                                return objectOperations.get(operation);
                            }
                            var clazzOperations: java.util.Map<number, (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void> = this.staticOperations.get(clazz);
                            if (clazzOperations != null) {
                                return clazzOperations.get(operation);
                            }
                            return null;
                        }

                        public call(source: org.kevoree.modeling.api.KObject, operation: org.kevoree.modeling.api.meta.MetaOperation, param: any[], callback: (p : any) => void): void {
                            var operationCore: (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void = this.searchOperation(source.uuid(), operation.origin().index(), operation.index());
                            if (operationCore != null) {
                                operationCore(source, param, callback);
                            } else {
                                this.sendToRemote(source, operation, param, callback);
                            }
                        }

                        private sendToRemote(source: org.kevoree.modeling.api.KObject, operation: org.kevoree.modeling.api.meta.MetaOperation, param: any[], callback: (p : any) => void): void {
                            var tuple: number[] = new Array();
                            tuple[DefaultOperationManager.DIM_INDEX] = source.universe().key();
                            tuple[DefaultOperationManager.TIME_INDEX] = source.now();
                            tuple[DefaultOperationManager.UUID_INDEX] = source.uuid();
                            tuple[DefaultOperationManager.OPERATION_INDEX] = <number>operation.index();
                            this.remoteCallCallbacks.put(tuple, callback);
                            var sb: java.lang.StringBuilder = new java.lang.StringBuilder();
                            sb.append("[");
                            if (param.length > 0) {
                                sb.append("\"").append(this.protectString(param[0].toString())).append("\"");
                                for (var i: number = 1; i < param.length; i++) {
                                    sb.append(",").append("\"").append(this.protectString(param[i].toString())).append("\"");
                                }
                            }
                            sb.append("]");
                        }

                        private protectString(input: string): string {
                            var sb: java.lang.StringBuilder = new java.lang.StringBuilder();
                            for (var i: number = 0; i < input.length; i++) {
                                var c: string = input.charAt(i);
                                if (c == '{' || c == '}' || c == '[' || c == ']' || c == ',' || c == '\\' || c == '"') {
                                    sb.append('\\');
                                }
                                sb.append(c);
                            }
                            return sb.toString();
                        }

                        private parseParams(inParams: string): any[] {
                            var params: java.util.ArrayList<any> = new java.util.ArrayList<any>();
                            var sb: java.lang.StringBuilder = new java.lang.StringBuilder();
                            if (inParams.length > 2) {
                                if (inParams.charAt(0) == '[') {
                                    var i: number = 1;
                                    var c: string = inParams.charAt(i);
                                    var inParam: boolean = false;
                                    while (i < inParams.length && c != ']'){
                                        if (c == '\\') {
                                            i++;
                                            sb.append(inParams.charAt(i));
                                        } else {
                                            if (c == '"') {
                                                if (inParam) {
                                                    params.add(sb.toString());
                                                    sb = new java.lang.StringBuilder();
                                                }
                                                inParam = !inParam;
                                            } else {
                                                if (inParam) {
                                                    sb.append(c);
                                                }
                                            }
                                        }
                                        i++;
                                        c = inParams.charAt(i);
                                    }
                                }
                            }
                            return params.toArray(new Array());
                        }

                    }

                    export interface KOperationManager {

                        registerOperation(operation: org.kevoree.modeling.api.meta.MetaOperation, callback: (p : org.kevoree.modeling.api.KObject, p1 : any[], p2 : (p : any) => void) => void, target: org.kevoree.modeling.api.KObject): void;

                        call(source: org.kevoree.modeling.api.KObject, operation: org.kevoree.modeling.api.meta.MetaOperation, param: any[], callback: (p : any) => void): void;

                    }

                    export class LocalEventListeners {

                        private static DIM_INDEX: number = 0;
                        private static TIME_INDEX: number = 1;
                        private static UUID_INDEX: number = 2;
                        private static TUPLE_SIZE: number = 3;
                        private listeners: java.util.HashMap<(p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void, number[]> = new java.util.HashMap<(p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void, number[]>();
                        public registerListener(origin: any, listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void, scope: any): void {
                            var tuple: number[] = new Array();
                            if (origin instanceof org.kevoree.modeling.api.abs.AbstractKUniverse) {
                                tuple[LocalEventListeners.DIM_INDEX] = (<org.kevoree.modeling.api.abs.AbstractKUniverse<any, any, any>>origin).key();
                            } else {
                                if (origin instanceof org.kevoree.modeling.api.abs.AbstractKView) {
                                    tuple[LocalEventListeners.DIM_INDEX] = (<org.kevoree.modeling.api.abs.AbstractKView>origin).universe().key();
                                    tuple[LocalEventListeners.TIME_INDEX] = (<org.kevoree.modeling.api.abs.AbstractKView>origin).now();
                                } else {
                                    if (origin instanceof org.kevoree.modeling.api.abs.AbstractKObject) {
                                        var casted: org.kevoree.modeling.api.abs.AbstractKObject = <org.kevoree.modeling.api.abs.AbstractKObject>origin;
                                        if (scope == null) {
                                            tuple[LocalEventListeners.DIM_INDEX] = casted.universe().key();
                                            tuple[LocalEventListeners.TIME_INDEX] = casted.now();
                                            tuple[LocalEventListeners.UUID_INDEX] = casted.uuid();
                                        } else {
                                            tuple[LocalEventListeners.UUID_INDEX] = casted.uuid();
                                            if (scope instanceof org.kevoree.modeling.api.abs.AbstractKUniverse) {
                                                tuple[LocalEventListeners.DIM_INDEX] = (<org.kevoree.modeling.api.abs.AbstractKUniverse<any, any, any>>scope).key();
                                            }
                                        }
                                    }
                                }
                            }
                            this.listeners.put(listener, tuple);
                        }

                        public dispatch(src: org.kevoree.modeling.api.KObject, modications: org.kevoree.modeling.api.meta.Meta[]): void {
                            var keys: {(p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) : void;}[] = this.listeners.keySet().toArray(new Array());
                            for (var i: number = 0; i < keys.length; i++) {
                                var tuple: any[] = this.listeners.get(keys[i]);
                                var match: boolean = true;
                                if (tuple[LocalEventListeners.DIM_INDEX] != null) {
                                    if (!tuple[LocalEventListeners.DIM_INDEX].equals(src.universe().key())) {
                                        match = false;
                                    }
                                }
                                if (tuple[LocalEventListeners.TIME_INDEX] != null) {
                                    if (!tuple[LocalEventListeners.TIME_INDEX].equals(src.view().now())) {
                                        match = false;
                                    }
                                }
                                if (tuple[LocalEventListeners.UUID_INDEX] != null) {
                                    if (!tuple[LocalEventListeners.UUID_INDEX].equals(src.uuid())) {
                                        match = false;
                                    }
                                }
                                if (match) {
                                    keys[i](src, modications);
                                }
                            }
                        }

                        public unregister(listener: (p : org.kevoree.modeling.api.KObject, p1 : org.kevoree.modeling.api.meta.Meta[]) => void): void {
                            this.listeners.remove(listener);
                        }

                        public clear(): void {
                            this.listeners.clear();
                        }

                    }

                    export class PathHelper {

                        public static pathSep: string = '/';
                        private static pathIDOpen: string = '[';
                        private static pathIDClose: string = ']';
                        private static rootPath: string = "/";
                        public static parentPath(currentPath: string): string {
                            if (currentPath == null || currentPath.length == 0) {
                                return null;
                            }
                            if (currentPath.length == 1) {
                                return null;
                            }
                            var lastIndex: number = currentPath.lastIndexOf(PathHelper.pathSep);
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

                        public static isRoot(path: string): boolean {
                            return path.length == 1 && path.charAt(0) == org.kevoree.modeling.api.util.PathHelper.pathSep;
                        }

                        public static path(parent: string, reference: org.kevoree.modeling.api.meta.MetaReference, target: org.kevoree.modeling.api.KObject): string {
                            if (org.kevoree.modeling.api.util.PathHelper.isRoot(parent)) {
                                return PathHelper.pathSep + reference.metaName() + PathHelper.pathIDOpen + target.domainKey() + PathHelper.pathIDClose;
                            } else {
                                return parent + PathHelper.pathSep + reference.metaName() + PathHelper.pathIDOpen + target.domainKey() + PathHelper.pathIDClose;
                            }
                        }

                    }

                    export class TimeWalker {

                        private _origin: org.kevoree.modeling.api.KObject = null;
                        constructor(p_origin: org.kevoree.modeling.api.KObject) {
                            this._origin = p_origin;
                        }

                        public walk(walker: (p : number) => void): org.kevoree.modeling.api.KDefer<any> {
                            return this.walkAsc(walker);
                        }

                        public walkAsc(walker: (p : number) => void): org.kevoree.modeling.api.KDefer<any> {
                            return this.internal_walk(walker, true);
                        }

                        public walkDesc(walker: (p : number) => void): org.kevoree.modeling.api.KDefer<any> {
                            return this.internal_walk(walker, false);
                        }

                        private internal_walk(walker: (p : number) => void, asc: boolean): org.kevoree.modeling.api.KDefer<any> {
                            var wrapper: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this._origin.view().universe().model().manager().timeTrees(this._origin, null, null,  (indexRBTrees : org.kevoree.modeling.api.rbtree.IndexRBTree[]) => {
                                for (var i: number = 0; i < indexRBTrees.length; i++) {
                                    var elem: org.kevoree.modeling.api.rbtree.TreeNode;
                                    if (asc) {
                                        elem = indexRBTrees[i].first();
                                    } else {
                                        elem = indexRBTrees[i].last();
                                    }
                                    while (elem != null){
                                        walker(elem.getKey());
                                        if (asc) {
                                            elem = elem.next();
                                        } else {
                                            elem = elem.previous();
                                        }
                                    }
                                }
                                wrapper.initCallback()(null);
                            });
                            return wrapper;
                        }

                        private internal_walk_range(walker: (p : number) => void, asc: boolean, from: number, to: number): org.kevoree.modeling.api.KDefer<any> {
                            var wrapper: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this._origin.view().universe().model().manager().timeTrees(this._origin, from, to,  (indexRBTrees : org.kevoree.modeling.api.rbtree.IndexRBTree[]) => {
                                var from2: number = from;
                                var to2: number = to;
                                if (from > to) {
                                    from2 = to;
                                    to2 = from;
                                }
                                for (var i: number = 0; i < indexRBTrees.length; i++) {
                                    var elem: org.kevoree.modeling.api.rbtree.TreeNode;
                                    if (asc) {
                                        elem = indexRBTrees[i].previousOrEqual(from2);
                                    } else {
                                        elem = indexRBTrees[i].previousOrEqual(to2);
                                    }
                                    while (elem != null){
                                        walker(elem.getKey());
                                        if (asc) {
                                            elem = elem.next();
                                        } else {
                                            elem = elem.previous();
                                        }
                                        if (elem != null) {
                                            if (elem.getKey() <= from2) {
                                                walker(elem.getKey());
                                            }
                                        }
                                    }
                                }
                                wrapper.initCallback()(null);
                            });
                            return wrapper;
                        }

                        public walkRangeAsc(walker: (p : number) => void, from: number, to: number): org.kevoree.modeling.api.KDefer<any> {
                            return this.internal_walk_range(walker, true, from, to);
                        }

                        public walkRangeDesc(walker: (p : number) => void, from: number, to: number): org.kevoree.modeling.api.KDefer<any> {
                            return this.internal_walk_range(walker, false, from, to);
                        }

                    }

                }
                export module xmi {
                    export class SerializationContext {

                        public ignoreGeneratedID: boolean = false;
                        public model: org.kevoree.modeling.api.KObject;
                        public finishCallback: (p : string) => void;
                        public printer: java.lang.StringBuilder;
                        public attributesVisitor: (p : org.kevoree.modeling.api.meta.MetaAttribute, p1 : any) => void;
                        public addressTable: java.util.HashMap<number, string> = new java.util.HashMap<number, string>();
                        public elementsCount: java.util.HashMap<string, number> = new java.util.HashMap<string, number>();
                        public packageList: java.util.ArrayList<string> = new java.util.ArrayList<string>();
                    }

                    export class XMILoadingContext {

                        public xmiReader: org.kevoree.modeling.api.xmi.XmlParser;
                        public loadedRoots: org.kevoree.modeling.api.KObject = null;
                        public resolvers: java.util.ArrayList<org.kevoree.modeling.api.xmi.XMIResolveCommand> = new java.util.ArrayList<org.kevoree.modeling.api.xmi.XMIResolveCommand>();
                        public map: java.util.HashMap<string, org.kevoree.modeling.api.KObject> = new java.util.HashMap<string, org.kevoree.modeling.api.KObject>();
                        public elementsCount: java.util.HashMap<string, number> = new java.util.HashMap<string, number>();
                        public stats: java.util.HashMap<string, number> = new java.util.HashMap<string, number>();
                        public oppositesAlreadySet: java.util.HashMap<string, boolean> = new java.util.HashMap<string, boolean>();
                        public successCallback: (p : java.lang.Throwable) => void;
                        public isOppositeAlreadySet(localRef: string, oppositeRef: string): boolean {
                            return (this.oppositesAlreadySet.get(oppositeRef + "_" + localRef) != null || (this.oppositesAlreadySet.get(localRef + "_" + oppositeRef) != null));
                        }

                        public storeOppositeRelation(localRef: string, oppositeRef: string): void {
                            this.oppositesAlreadySet.put(localRef + "_" + oppositeRef, true);
                        }

                    }

                    export class XMIModelLoader {

                        private _factory: org.kevoree.modeling.api.KView;
                        public static LOADER_XMI_LOCAL_NAME: string = "type";
                        public static LOADER_XMI_XSI: string = "xsi";
                        public static LOADER_XMI_NS_URI: string = "nsURI";
                        constructor(p_factory: org.kevoree.modeling.api.KView) {
                            this._factory = p_factory;
                        }

                        public static unescapeXml(src: string): string {
                            var builder: java.lang.StringBuilder = null;
                            var i: number = 0;
                            while (i < src.length){
                                var c: string = src.charAt(i);
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
                                            for (var i: number = 0; i < reader.getAttributeCount() - 1; i++) {
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
                                for (var i: number = 0; i < context.resolvers.size(); i++) {
                                    context.resolvers.get(i).run();
                                }
                                p_view.setRoot(context.loadedRoots);
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
                                    for (var i: number = 0; i < (ctx.xmiReader.getAttributeCount() - 1); i++) {
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
                            for (var i: number = 0; i < ctx.xmiReader.getAttributeCount(); i++) {
                                var prefix: string = ctx.xmiReader.getAttributePrefix(i);
                                if (prefix == null || prefix.equals("")) {
                                    var attrName: string = ctx.xmiReader.getAttributeLocalName(i).trim();
                                    var valueAtt: string = ctx.xmiReader.getAttributeValue(i).trim();
                                    if (valueAtt != null) {
                                        var metaElement: org.kevoree.modeling.api.meta.Meta = modelElem.metaClass().metaByName(attrName);
                                        if (metaElement != null && metaElement.metaType().equals(org.kevoree.modeling.api.meta.MetaType.ATTRIBUTE)) {
                                            modelElem.set(<org.kevoree.modeling.api.meta.MetaAttribute>metaElement, org.kevoree.modeling.api.xmi.XMIModelLoader.unescapeXml(valueAtt));
                                        } else {
                                            if (metaElement != null && metaElement instanceof org.kevoree.modeling.api.abs.AbstractMetaReference) {
                                                var referenceArray: string[] = valueAtt.split(" ");
                                                for (var j: number = 0; j < referenceArray.length; j++) {
                                                    var xmiRef: string = referenceArray[j];
                                                    var adjustedRef: string = (xmiRef.startsWith("#") ? xmiRef.substring(1) : xmiRef);
                                                    adjustedRef = adjustedRef.replace(".0", "");
                                                    var ref: org.kevoree.modeling.api.KObject = ctx.map.get(adjustedRef);
                                                    if (ref != null) {
                                                        modelElem.mutate(org.kevoree.modeling.api.KActionType.ADD, <org.kevoree.modeling.api.meta.MetaReference>metaElement, ref);
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
                            var done: boolean = false;
                            while (!done){
                                if (ctx.xmiReader.hasNext()) {
                                    var tok: org.kevoree.modeling.api.xmi.XmlToken = ctx.xmiReader.next();
                                    if (tok.equals(org.kevoree.modeling.api.xmi.XmlToken.START_TAG)) {
                                        var subElemName: string = ctx.xmiReader.getLocalName();
                                        var key: string = xmiAddress + "/@" + subElemName;
                                        var i: number = ctx.elementsCount.get(key);
                                        if (i == null) {
                                            i = 0;
                                            ctx.elementsCount.put(key, i);
                                        }
                                        var subElementId: string = xmiAddress + "/@" + subElemName + (i != 0 ? "." + i : "");
                                        var containedElement: org.kevoree.modeling.api.KObject = org.kevoree.modeling.api.xmi.XMIModelLoader.loadObject(p_view, ctx, subElementId, subElemName);
                                        modelElem.mutate(org.kevoree.modeling.api.KActionType.ADD, <org.kevoree.modeling.api.meta.MetaReference>modelElem.metaClass().metaByName(subElemName), containedElement);
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

                    }

                    export class XMIModelSerializer {

                        public static save(model: org.kevoree.modeling.api.KObject, callback: (p : string) => void): void {
                            var context: org.kevoree.modeling.api.xmi.SerializationContext = new org.kevoree.modeling.api.xmi.SerializationContext();
                            context.model = model;
                            context.finishCallback = callback;
                            context.attributesVisitor =  (metaAttribute : org.kevoree.modeling.api.meta.MetaAttribute, value : any) => {
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
                            var addressCreationTask: org.kevoree.modeling.api.KDefer<any> = context.model.visit( (elem : org.kevoree.modeling.api.KObject) => {
                                var parentXmiAddress: string = context.addressTable.get(elem.parentUuid());
                                var key: string = parentXmiAddress + "/@" + elem.referenceInParent().metaName();
                                var i: number = context.elementsCount.get(key);
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
                            var serializationTask: org.kevoree.modeling.api.KDefer<any> = context.model.universe().model().defer();
                            serializationTask.wait(addressCreationTask);
                            serializationTask.setJob( (currentTask : org.kevoree.modeling.api.KCurrentDefer<any>) => {
                                context.printer.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
                                context.printer.append("<" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_"));
                                context.printer.append(" xmlns:xsi=\"http://wwww.w3.org/2001/XMLSchema-instance\"");
                                context.printer.append(" xmi:version=\"2.0\"");
                                context.printer.append(" xmlns:xmi=\"http://www.omg.org/XMI\"");
                                var index: number = 0;
                                while (index < context.packageList.size()){
                                    context.printer.append(" xmlns:" + context.packageList.get(index).replace(".", "_") + "=\"http://" + context.packageList.get(index) + "\"");
                                    index++;
                                }
                                context.model.visitAttributes(context.attributesVisitor);
                                var nonContainedRefsTasks: org.kevoree.modeling.api.KDefer<any> = context.model.universe().model().defer();
                                for (var i: number = 0; i < context.model.metaClass().metaReferences().length; i++) {
                                    if (!context.model.metaClass().metaReferences()[i].contained()) {
                                        nonContainedRefsTasks.wait(org.kevoree.modeling.api.xmi.XMIModelSerializer.nonContainedReferenceTaskMaker(context.model.metaClass().metaReferences()[i], context, context.model));
                                    }
                                }
                                nonContainedRefsTasks.setJob( (currentTask : org.kevoree.modeling.api.KCurrentDefer<any>) => {
                                    context.printer.append(">\n");
                                    var containedRefsTasks: org.kevoree.modeling.api.KDefer<any> = context.model.universe().model().defer();
                                    for (var i: number = 0; i < context.model.metaClass().metaReferences().length; i++) {
                                        if (context.model.metaClass().metaReferences()[i].contained()) {
                                            containedRefsTasks.wait(org.kevoree.modeling.api.xmi.XMIModelSerializer.containedReferenceTaskMaker(context.model.metaClass().metaReferences()[i], context, context.model));
                                        }
                                    }
                                    containedRefsTasks.setJob( (currentTask : org.kevoree.modeling.api.KCurrentDefer<any>) => {
                                        context.printer.append("</" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_") + ">\n");
                                        context.finishCallback(context.printer.toString());
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
                            var i: number = 0;
                            var max: number = chain.length;
                            while (i < max){
                                var c: string = chain.charAt(i);
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
                            var lastPoint: number = metaClassName.lastIndexOf('.');
                            var pack: string = metaClassName.substring(0, lastPoint);
                            var cls: string = metaClassName.substring(lastPoint + 1);
                            return pack + ":" + cls;
                        }

                        private static nonContainedReferenceTaskMaker(ref: org.kevoree.modeling.api.meta.MetaReference, p_context: org.kevoree.modeling.api.xmi.SerializationContext, p_currentElement: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any> {
                            var allTask: org.kevoree.modeling.api.KDefer<any> = p_currentElement.ref(ref);
                            var thisTask: org.kevoree.modeling.api.KDefer<any> = p_context.model.universe().model().defer();
                            thisTask.wait(allTask);
                            thisTask.setJob( (currentTask : org.kevoree.modeling.api.KCurrentDefer<any>) => {
                                try {
                                    var objects: org.kevoree.modeling.api.KObject[] = (<org.kevoree.modeling.api.KObject[]>currentTask.resultByDefer(allTask));
                                    for (var i: number = 0; i < objects.length; i++) {
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

                        private static containedReferenceTaskMaker(ref: org.kevoree.modeling.api.meta.MetaReference, context: org.kevoree.modeling.api.xmi.SerializationContext, currentElement: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any> {
                            var allTask: org.kevoree.modeling.api.KDefer<any> = currentElement.ref(ref);
                            var thisTask: org.kevoree.modeling.api.KDefer<any> = context.model.universe().model().defer();
                            thisTask.wait(allTask);
                            thisTask.setJob( (currentTask : org.kevoree.modeling.api.KCurrentDefer<any>) => {
                                try {
                                    if (currentTask.resultByDefer(allTask) != null) {
                                        var objs: org.kevoree.modeling.api.KObject[] = (<org.kevoree.modeling.api.KObject[]>currentTask.resultByDefer(allTask));
                                        for (var i: number = 0; i < objs.length; i++) {
                                            var elem: org.kevoree.modeling.api.KObject = objs[i];
                                            context.printer.append("<");
                                            context.printer.append(ref.metaName());
                                            context.printer.append(" xsi:type=\"" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(elem.metaClass().metaName()) + "\"");
                                            elem.visitAttributes(context.attributesVisitor);
                                            var nonContainedRefsTasks: org.kevoree.modeling.api.KDefer<any> = context.model.universe().model().defer();
                                            for (var j: number = 0; j < elem.metaClass().metaReferences().length; j++) {
                                                if (!elem.metaClass().metaReferences()[i].contained()) {
                                                    nonContainedRefsTasks.wait(org.kevoree.modeling.api.xmi.XMIModelSerializer.nonContainedReferenceTaskMaker(elem.metaClass().metaReferences()[i], context, elem));
                                                }
                                            }
                                            nonContainedRefsTasks.setJob( (currentTask : org.kevoree.modeling.api.KCurrentDefer<any>) => {
                                                context.printer.append(">\n");
                                                var containedRefsTasks: org.kevoree.modeling.api.KDefer<any> = context.model.universe().model().defer();
                                                for (var i: number = 0; i < elem.metaClass().metaReferences().length; i++) {
                                                    if (elem.metaClass().metaReferences()[i].contained()) {
                                                        containedRefsTasks.wait(org.kevoree.modeling.api.xmi.XMIModelSerializer.containedReferenceTaskMaker(elem.metaClass().metaReferences()[i], context, elem));
                                                    }
                                                }
                                                containedRefsTasks.setJob( (currentTask : org.kevoree.modeling.api.KCurrentDefer<any>) => {
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

                    }

                    export class XMIResolveCommand {

                        private context: org.kevoree.modeling.api.xmi.XMILoadingContext;
                        private target: org.kevoree.modeling.api.KObject;
                        private mutatorType: org.kevoree.modeling.api.KActionType;
                        private refName: string;
                        private ref: string;
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
                                this.target.mutate(this.mutatorType, <org.kevoree.modeling.api.meta.MetaReference>this.target.metaClass().metaByName(this.refName), referencedElement);
                                return;
                            }
                            referencedElement = this.context.map.get("/");
                            if (referencedElement != null) {
                                this.target.mutate(this.mutatorType, <org.kevoree.modeling.api.meta.MetaReference>this.target.metaClass().metaByName(this.refName), referencedElement);
                                return;
                            }
                            throw new java.lang.Exception("KMF Load error : reference " + this.ref + " not found in map when trying to  " + this.mutatorType + " " + this.refName + "  on " + this.target.metaClass().metaName() + "(uuid:" + this.target.uuid() + ")");
                        }

                    }

                    export class XmiFormat implements org.kevoree.modeling.api.ModelFormat {

                        private _view: org.kevoree.modeling.api.KView;
                        constructor(p_view: org.kevoree.modeling.api.KView) {
                            this._view = p_view;
                        }

                        public save(model: org.kevoree.modeling.api.KObject): org.kevoree.modeling.api.KDefer<any> {
                            var wrapper: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            org.kevoree.modeling.api.xmi.XMIModelSerializer.save(model, wrapper.initCallback());
                            return wrapper;
                        }

                        public saveRoot(): org.kevoree.modeling.api.KDefer<any> {
                            var wrapper: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            this._view.universe().model().manager().getRoot(this._view,  (root : org.kevoree.modeling.api.KObject) => {
                                if (root == null) {
                                    wrapper.initCallback()(null);
                                } else {
                                    org.kevoree.modeling.api.xmi.XMIModelSerializer.save(root, wrapper.initCallback());
                                }
                            });
                            return wrapper;
                        }

                        public load(payload: string): org.kevoree.modeling.api.KDefer<any> {
                            var wrapper: org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any> = new org.kevoree.modeling.api.abs.AbstractKDeferWrapper<any>();
                            org.kevoree.modeling.api.xmi.XMIModelLoader.load(this._view, payload, wrapper.initCallback());
                            return wrapper;
                        }

                    }

                    export class XmlParser {

                        private payload: string;
                        private current: number = 0;
                        private currentChar: string;
                        private tagName: string;
                        private tagPrefix: string;
                        private attributePrefix: string;
                        private readSingleton: boolean = false;
                        private attributesNames: java.util.ArrayList<string> = new java.util.ArrayList<string>();
                        private attributesPrefixes: java.util.ArrayList<string> = new java.util.ArrayList<string>();
                        private attributesValues: java.util.ArrayList<string> = new java.util.ArrayList<string>();
                        private attributeName: java.lang.StringBuilder = new java.lang.StringBuilder();
                        private attributeValue: java.lang.StringBuilder = new java.lang.StringBuilder();
                        constructor(str: string) {
                            this.payload = str;
                            this.currentChar = this.readChar();
                        }

                        public getTagPrefix(): string {
                            return this.tagPrefix;
                        }

                        public hasNext(): boolean {
                            this.read_lessThan();
                            return this.current < this.payload.length;
                        }

                        public getLocalName(): string {
                            return this.tagName;
                        }

                        public getAttributeCount(): number {
                            return this.attributesNames.size();
                        }

                        public getAttributeLocalName(i: number): string {
                            return this.attributesNames.get(i);
                        }

                        public getAttributePrefix(i: number): string {
                            return this.attributesPrefixes.get(i);
                        }

                        public getAttributeValue(i: number): string {
                            return this.attributesValues.get(i);
                        }

                        private readChar(): string {
                            if (this.current < this.payload.length) {
                                var re: string = this.payload.charAt(this.current);
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
                            var end_of_tag: boolean = false;
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

                    }

                    export class XmlToken {

                        public static XML_HEADER: XmlToken = new XmlToken();
                        public static END_DOCUMENT: XmlToken = new XmlToken();
                        public static START_TAG: XmlToken = new XmlToken();
                        public static END_TAG: XmlToken = new XmlToken();
                        public static COMMENT: XmlToken = new XmlToken();
                        public static SINGLETON_TAG: XmlToken = new XmlToken();
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
                    }

                }
            }
        }
    }
}
