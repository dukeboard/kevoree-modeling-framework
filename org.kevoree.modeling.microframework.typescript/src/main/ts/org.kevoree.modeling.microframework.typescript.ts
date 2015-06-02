module org {
    export module kevoree {
        export module modeling {
            export interface Callback<A> {

                on(a: A): void;

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

                public static parse(s: string): org.kevoree.modeling.KActionType {
                    for (var i: number = 0; i < org.kevoree.modeling.KActionType.values().length; i++) {
                        var current: org.kevoree.modeling.KActionType = org.kevoree.modeling.KActionType.values()[i];
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

            export class KConfig {

                public static TREE_CACHE_SIZE: number = 3;
                public static CALLBACK_HISTORY: number = 1000;
                public static LONG_SIZE: number = 53;
                public static PREFIX_SIZE: number = 16;
                public static BEGINNING_OF_TIME: number = -0x001FFFFFFFFFFFFE;
                public static END_OF_TIME: number = 0x001FFFFFFFFFFFFE;
                public static NULL_LONG: number = 0x001FFFFFFFFFFFFF;
                public static KEY_PREFIX_MASK: number = 0x0000001FFFFFFFFF;
                public static KEY_SEP: string = '/';
                public static KEY_SIZE: number = 3;
                public static CACHE_INIT_SIZE: number = 16;
                public static CACHE_LOAD_FACTOR: number = (<number>75 / <number>100);
            }

            export interface KDefer {

                wait(resultName: string): (p : any) => void;

                waitDefer(previous: org.kevoree.modeling.KDefer): org.kevoree.modeling.KDefer;

                isDone(): boolean;

                getResult(resultName: string): any;

                then(cb: (p : any) => void): void;

                next(): org.kevoree.modeling.KDefer;

            }

            export interface KEventListener {

                on(src: org.kevoree.modeling.KObject, modifications: org.kevoree.modeling.meta.Meta[]): void;

            }

            export interface KEventMultiListener {

                on(objects: org.kevoree.modeling.KObject[]): void;

            }

            export interface KInfer extends org.kevoree.modeling.KObject {

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

                public cloneState(): org.kevoree.modeling.KInferState {
                    throw "Abstract method";
                }

            }

            export interface KModel<A extends org.kevoree.modeling.KUniverse<any, any, any>> {

                key(): number;

                newUniverse(): A;

                universe(key: number): A;

                manager(): org.kevoree.modeling.memory.KDataManager;

                setContentDeliveryDriver(dataBase: org.kevoree.modeling.memory.KContentDeliveryDriver): org.kevoree.modeling.KModel<any>;

                setScheduler(scheduler: org.kevoree.modeling.KScheduler): org.kevoree.modeling.KModel<any>;

                setOperation(metaOperation: org.kevoree.modeling.meta.MetaOperation, operation: (p : org.kevoree.modeling.KObject, p1 : any[], p2 : (p : any) => void) => void): void;

                setInstanceOperation(metaOperation: org.kevoree.modeling.meta.MetaOperation, target: org.kevoree.modeling.KObject, operation: (p : org.kevoree.modeling.KObject, p1 : any[], p2 : (p : any) => void) => void): void;

                metaModel(): org.kevoree.modeling.meta.MetaModel;

                defer(): org.kevoree.modeling.KDefer;

                save(cb: (p : any) => void): void;

                discard(cb: (p : any) => void): void;

                connect(cb: (p : any) => void): void;

                close(cb: (p : any) => void): void;

                clearListenerGroup(groupID: number): void;

                nextGroup(): number;

                createByName(metaClassName: string, universe: number, time: number): org.kevoree.modeling.KObject;

                create(clazz: org.kevoree.modeling.meta.MetaClass, universe: number, time: number): org.kevoree.modeling.KObject;

            }

            export interface KModelAttributeVisitor {

                visit(metaAttribute: org.kevoree.modeling.meta.MetaAttribute, value: any): void;

            }

            export interface KModelFormat {

                save(model: org.kevoree.modeling.KObject, cb: (p : string) => void): void;

                saveRoot(cb: (p : string) => void): void;

                load(payload: string, cb: (p : any) => void): void;

            }

            export interface KModelVisitor {

                visit(elem: org.kevoree.modeling.KObject): org.kevoree.modeling.KVisitResult;

            }

            export interface KObject {

                universe(): number;

                now(): number;

                uuid(): number;

                delete(cb: (p : any) => void): void;

                select(query: string, cb: (p : org.kevoree.modeling.KObject[]) => void): void;

                listen(groupId: number, listener: (p : org.kevoree.modeling.KObject, p1 : org.kevoree.modeling.meta.Meta[]) => void): void;

                visitAttributes(visitor: (p : org.kevoree.modeling.meta.MetaAttribute, p1 : any) => void): void;

                visit(visitor: (p : org.kevoree.modeling.KObject) => org.kevoree.modeling.KVisitResult, cb: (p : any) => void): void;

                timeWalker(): org.kevoree.modeling.KTimeWalker;

                domainKey(): string;

                metaClass(): org.kevoree.modeling.meta.MetaClass;

                mutate(actionType: org.kevoree.modeling.KActionType, metaReference: org.kevoree.modeling.meta.MetaReference, param: org.kevoree.modeling.KObject): void;

                ref(metaReference: org.kevoree.modeling.meta.MetaReference, cb: (p : org.kevoree.modeling.KObject[]) => void): void;

                traversal(): org.kevoree.modeling.traversal.KTraversal;

                get(attribute: org.kevoree.modeling.meta.MetaAttribute): any;

                getByName(atributeName: string): any;

                set(attribute: org.kevoree.modeling.meta.MetaAttribute, payload: any): void;

                setByName(atributeName: string, payload: any): void;

                toJSON(): string;

                equals(other: any): boolean;

                jump(time: number, callback: (p : org.kevoree.modeling.KObject) => void): void;

                referencesWith(o: org.kevoree.modeling.KObject): org.kevoree.modeling.meta.MetaReference[];

                call(operation: org.kevoree.modeling.meta.MetaOperation, params: any[], cb: (p : any) => void): void;

                manager(): org.kevoree.modeling.memory.KDataManager;

            }

            export interface KOperation {

                on(source: org.kevoree.modeling.KObject, params: any[], result: (p : any) => void): void;

            }

            export interface KScheduler {

                dispatch(runnable: java.lang.Runnable): void;

                stop(): void;

            }

            export interface KTimeWalker {

                allTimes(cb: (p : number[]) => void): void;

                timesBefore(endOfSearch: number, cb: (p : number[]) => void): void;

                timesAfter(beginningOfSearch: number, cb: (p : number[]) => void): void;

                timesBetween(beginningOfSearch: number, endOfSearch: number, cb: (p : number[]) => void): void;

            }

            export interface KType {

                name(): string;

                isEnum(): boolean;

                save(src: any): string;

                load(payload: string): any;

            }

            export interface KUniverse<A extends org.kevoree.modeling.KView, B extends org.kevoree.modeling.KUniverse<any, any, any>, C extends org.kevoree.modeling.KModel<any>> {

                key(): number;

                time(timePoint: number): A;

                model(): C;

                equals(other: any): boolean;

                diverge(): B;

                origin(): B;

                descendants(): java.util.List<B>;

                delete(cb: (p : any) => void): void;

                lookupAllTimes(uuid: number, times: number[], cb: (p : org.kevoree.modeling.KObject[]) => void): void;

                listenAll(groupId: number, objects: number[], multiListener: (p : org.kevoree.modeling.KObject[]) => void): void;

            }

            export interface KView {

                createByName(metaClassName: string): org.kevoree.modeling.KObject;

                create(clazz: org.kevoree.modeling.meta.MetaClass): org.kevoree.modeling.KObject;

                select(query: string, cb: (p : org.kevoree.modeling.KObject[]) => void): void;

                lookup(key: number, cb: (p : org.kevoree.modeling.KObject) => void): void;

                lookupAll(keys: number[], cb: (p : org.kevoree.modeling.KObject[]) => void): void;

                universe(): number;

                now(): number;

                json(): org.kevoree.modeling.KModelFormat;

                xmi(): org.kevoree.modeling.KModelFormat;

                equals(other: any): boolean;

                setRoot(elem: org.kevoree.modeling.KObject, cb: (p : any) => void): void;

                getRoot(cb: (p : org.kevoree.modeling.KObject) => void): void;

            }

            export class KVisitResult {

                public static CONTINUE: KVisitResult = new KVisitResult();
                public static SKIP: KVisitResult = new KVisitResult();
                public static STOP: KVisitResult = new KVisitResult();
                public equals(other: any): boolean {
                    return this == other;
                }
                public static _KVisitResultVALUES : KVisitResult[] = [
                    KVisitResult.CONTINUE
                    ,KVisitResult.SKIP
                    ,KVisitResult.STOP
                ];
                public static values():KVisitResult[]{
                    return KVisitResult._KVisitResultVALUES;
                }
            }

            export interface ThrowableCallback<A> {

                on(a: A, error: java.lang.Throwable): void;

            }

            export module abs {
                export class AbstractKDataType implements org.kevoree.modeling.KType {

                    private _name: string;
                    private _isEnum: boolean;
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
                        if (src != null && this != org.kevoree.modeling.meta.PrimitiveTypes.TRANSIENT) {
                            if (this == org.kevoree.modeling.meta.PrimitiveTypes.STRING) {
                                return org.kevoree.modeling.format.json.JsonString.encode(src.toString());
                            } else {
                                return src.toString();
                            }
                        }
                        return null;
                    }

                    public load(payload: string): any {
                        if (this == org.kevoree.modeling.meta.PrimitiveTypes.TRANSIENT) {
                            return null;
                        }
                        if (this == org.kevoree.modeling.meta.PrimitiveTypes.STRING) {
                            return org.kevoree.modeling.format.json.JsonString.unescape(payload);
                        }
                        if (this == org.kevoree.modeling.meta.PrimitiveTypes.LONG) {
                            return java.lang.Long.parseLong(payload);
                        }
                        if (this == org.kevoree.modeling.meta.PrimitiveTypes.INT) {
                            return java.lang.Integer.parseInt(payload);
                        }
                        if (this == org.kevoree.modeling.meta.PrimitiveTypes.BOOL) {
                            return java.lang.Boolean.parseBoolean(payload);
                        }
                        if (this == org.kevoree.modeling.meta.PrimitiveTypes.SHORT) {
                            return java.lang.Short.parseShort(payload);
                        }
                        if (this == org.kevoree.modeling.meta.PrimitiveTypes.DOUBLE) {
                            return java.lang.Double.parseDouble(payload);
                        }
                        if (this == org.kevoree.modeling.meta.PrimitiveTypes.FLOAT) {
                            return java.lang.Float.parseFloat(payload);
                        }
                        return null;
                    }

                }

                export class AbstractKDefer implements org.kevoree.modeling.KDefer {

                    private _isDone: boolean = false;
                    public _isReady: boolean = false;
                    private _nbRecResult: number = 0;
                    private _nbExpectedResult: number = 0;
                    private _nextTasks: java.util.ArrayList<org.kevoree.modeling.KDefer> = null;
                    private _results: org.kevoree.modeling.memory.struct.map.StringHashMap<any> = null;
                    private _thenCB: (p : any) => void = null;
                    constructor() {
                        this._results = new org.kevoree.modeling.memory.struct.map.StringHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                    }

                    public setDoneOrRegister(next: org.kevoree.modeling.KDefer): boolean {
                        if (next != null) {
                            if (this._nextTasks == null) {
                                this._nextTasks = new java.util.ArrayList<org.kevoree.modeling.KDefer>();
                            }
                            this._nextTasks.add(next);
                            return this._isDone;
                        } else {
                            this._isDone = true;
                            if (this._nextTasks != null) {
                                for (var i: number = 0; i < this._nextTasks.size(); i++) {
                                    (<org.kevoree.modeling.abs.AbstractKDefer>this._nextTasks.get(i)).informParentEnd(this);
                                }
                            }
                            return this._isDone;
                        }
                    }

                    public equals(obj: any): boolean {
                        return obj == this;
                    }

                    private informParentEnd(end: org.kevoree.modeling.KDefer): void {
                        if (end == null) {
                            this._nbRecResult = this._nbRecResult + this._nbExpectedResult;
                        } else {
                            if (end != this) {
                                this._nbRecResult--;
                            }
                        }
                        if (this._nbRecResult == 0 && this._isReady) {
                            this.setDoneOrRegister(null);
                            if (this._thenCB != null) {
                                this._thenCB(null);
                            }
                        }
                    }

                    public waitDefer(p_previous: org.kevoree.modeling.KDefer): org.kevoree.modeling.KDefer {
                        if (p_previous != this) {
                            if (!(<org.kevoree.modeling.abs.AbstractKDefer>p_previous).setDoneOrRegister(this)) {
                                this._nbExpectedResult++;
                            }
                        }
                        return this;
                    }

                    public next(): org.kevoree.modeling.KDefer {
                        var nextTask: org.kevoree.modeling.abs.AbstractKDefer = new org.kevoree.modeling.abs.AbstractKDefer();
                        nextTask.waitDefer(this);
                        return nextTask;
                    }

                    public wait(resultName: string): (p : any) => void {
                        return  (o : any) => {
                            this._results.put(resultName, o);
                        };
                    }

                    public isDone(): boolean {
                        return this._isDone;
                    }

                    public getResult(resultName: string): any {
                        if (this._isDone) {
                            return this._results.get(resultName);
                        } else {
                            throw new java.lang.Exception("Task is not executed yet !");
                        }
                    }

                    public then(cb: (p : any) => void): void {
                        this._thenCB = cb;
                        this._isReady = true;
                        this.informParentEnd(null);
                    }

                }

                export class AbstractKModel<A extends org.kevoree.modeling.KUniverse<any, any, any>> implements org.kevoree.modeling.KModel<any> {

                    public _manager: org.kevoree.modeling.memory.KDataManager;
                    private _key: number;
                    constructor() {
                        this._manager = new org.kevoree.modeling.memory.manager.DefaultKDataManager(this);
                        this._key = this._manager.nextModelKey();
                    }

                    public metaModel(): org.kevoree.modeling.meta.MetaModel {
                        throw "Abstract method";
                    }

                    public connect(cb: (p : any) => void): void {
                        this._manager.connect(cb);
                    }

                    public close(cb: (p : any) => void): void {
                        this._manager.close(cb);
                    }

                    public manager(): org.kevoree.modeling.memory.KDataManager {
                        return this._manager;
                    }

                    public newUniverse(): A {
                        var nextKey: number = this._manager.nextUniverseKey();
                        var newDimension: A = this.internalCreateUniverse(nextKey);
                        this.manager().initUniverse(newDimension, null);
                        return newDimension;
                    }

                    public internalCreateUniverse(universe: number): A {
                        throw "Abstract method";
                    }

                    public internalCreateObject(universe: number, time: number, uuid: number, clazz: org.kevoree.modeling.meta.MetaClass): org.kevoree.modeling.KObject {
                        throw "Abstract method";
                    }

                    public createProxy(universe: number, time: number, uuid: number, clazz: org.kevoree.modeling.meta.MetaClass): org.kevoree.modeling.KObject {
                        return this.internalCreateObject(universe, time, uuid, clazz);
                    }

                    public universe(key: number): A {
                        var newDimension: A = this.internalCreateUniverse(key);
                        this.manager().initUniverse(newDimension, null);
                        return newDimension;
                    }

                    public save(cb: (p : any) => void): void {
                        this._manager.save(cb);
                    }

                    public discard(cb: (p : any) => void): void {
                        this._manager.discard(null, cb);
                    }

                    public setContentDeliveryDriver(p_driver: org.kevoree.modeling.memory.KContentDeliveryDriver): org.kevoree.modeling.KModel<any> {
                        this.manager().setContentDeliveryDriver(p_driver);
                        return this;
                    }

                    public setScheduler(p_scheduler: org.kevoree.modeling.KScheduler): org.kevoree.modeling.KModel<any> {
                        this.manager().setScheduler(p_scheduler);
                        return this;
                    }

                    public setOperation(metaOperation: org.kevoree.modeling.meta.MetaOperation, operation: (p : org.kevoree.modeling.KObject, p1 : any[], p2 : (p : any) => void) => void): void {
                        this.manager().operationManager().registerOperation(metaOperation, operation, null);
                    }

                    public setInstanceOperation(metaOperation: org.kevoree.modeling.meta.MetaOperation, target: org.kevoree.modeling.KObject, operation: (p : org.kevoree.modeling.KObject, p1 : any[], p2 : (p : any) => void) => void): void {
                        this.manager().operationManager().registerOperation(metaOperation, operation, target);
                    }

                    public defer(): org.kevoree.modeling.KDefer {
                        return new org.kevoree.modeling.abs.AbstractKDefer();
                    }

                    public key(): number {
                        return this._key;
                    }

                    public clearListenerGroup(groupID: number): void {
                        this.manager().cdn().unregisterGroup(groupID);
                    }

                    public nextGroup(): number {
                        return this.manager().nextGroupKey();
                    }

                    public create(clazz: org.kevoree.modeling.meta.MetaClass, universe: number, time: number): org.kevoree.modeling.KObject {
                        if (!org.kevoree.modeling.util.Checker.isDefined(clazz)) {
                            return null;
                        }
                        var newObj: org.kevoree.modeling.KObject = this.internalCreateObject(universe, time, this._manager.nextObjectKey(), clazz);
                        if (newObj != null) {
                            this._manager.initKObject(newObj);
                        }
                        return newObj;
                    }

                    public createByName(metaClassName: string, universe: number, time: number): org.kevoree.modeling.KObject {
                        return this.create(this._manager.model().metaModel().metaClassByName(metaClassName), universe, time);
                    }

                }

                export class AbstractKObject implements org.kevoree.modeling.KObject {

                    public _uuid: number;
                    public _time: number;
                    public _universe: number;
                    private _metaClass: org.kevoree.modeling.meta.MetaClass;
                    public _manager: org.kevoree.modeling.memory.KDataManager;
                    private static OUT_OF_CACHE_MSG: string = "Out of cache Error";
                    constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.MetaClass, p_manager: org.kevoree.modeling.memory.KDataManager) {
                        this._universe = p_universe;
                        this._time = p_time;
                        this._uuid = p_uuid;
                        this._metaClass = p_metaClass;
                        this._manager = p_manager;
                        this._manager.cache().monitor(this);
                    }

                    public uuid(): number {
                        return this._uuid;
                    }

                    public metaClass(): org.kevoree.modeling.meta.MetaClass {
                        return this._metaClass;
                    }

                    public now(): number {
                        return this._time;
                    }

                    public universe(): number {
                        return this._universe;
                    }

                    public timeWalker(): org.kevoree.modeling.KTimeWalker {
                        return new org.kevoree.modeling.abs.AbstractTimeWalker(this);
                    }

                    public delete(cb: (p : any) => void): void {
                        var selfPointer: org.kevoree.modeling.KObject = this;
                        var rawPayload: org.kevoree.modeling.memory.KCacheElementSegment = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.DELETE);
                        if (rawPayload == null) {
                            cb(new java.lang.Exception(AbstractKObject.OUT_OF_CACHE_MSG));
                        } else {
                            var collector: org.kevoree.modeling.memory.struct.map.LongLongHashMap = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            for (var i: number = 0; i < this._metaClass.metaReferences().length; i++) {
                                var inboundsKeys: number[] = rawPayload.getRef(this._metaClass.metaReferences()[i].index(), this._metaClass);
                                for (var j: number = 0; j < inboundsKeys.length; j++) {
                                    collector.put(inboundsKeys[j], inboundsKeys[j]);
                                }
                            }
                            var flatCollected: number[] = new Array();
                            var indexI: number[] = new Array();
                            indexI[0] = 0;
                            collector.each( (key : number, value : number) => {
                                flatCollected[indexI[0]] = key;
                                indexI[0]++;
                            });
                            this._manager.lookupAllobjects(this._universe, this._time, flatCollected,  (resolved : org.kevoree.modeling.KObject[]) => {
                                for (var i: number = 0; i < resolved.length; i++) {
                                    if (resolved[i] != null) {
                                        var linkedReferences: org.kevoree.modeling.meta.MetaReference[] = resolved[i].referencesWith(selfPointer);
                                        for (var j: number = 0; j < linkedReferences.length; j++) {
                                            (<org.kevoree.modeling.abs.AbstractKObject>resolved[i]).internal_mutate(org.kevoree.modeling.KActionType.REMOVE, linkedReferences[j], selfPointer, false);
                                        }
                                    }
                                }
                                if (cb != null) {
                                    cb(null);
                                }
                            });
                        }
                    }

                    public select(query: string, cb: (p : org.kevoree.modeling.KObject[]) => void): void {
                        if (!org.kevoree.modeling.util.Checker.isDefined(query)) {
                            cb(new Array());
                        } else {
                            var cleanedQuery: string = query;
                            if (cleanedQuery.startsWith("/")) {
                                cleanedQuery = cleanedQuery.substring(1);
                            }
                            if (query.startsWith("/")) {
                                var finalCleanedQuery: string = cleanedQuery;
                                this._manager.getRoot(this._universe, this._time,  (rootObj : org.kevoree.modeling.KObject) => {
                                    if (rootObj == null) {
                                        cb(new Array());
                                    } else {
                                        org.kevoree.modeling.traversal.selector.KSelector.select(rootObj, finalCleanedQuery, cb);
                                    }
                                });
                            } else {
                                org.kevoree.modeling.traversal.selector.KSelector.select(this, query, cb);
                            }
                        }
                    }

                    public listen(groupId: number, listener: (p : org.kevoree.modeling.KObject, p1 : org.kevoree.modeling.meta.Meta[]) => void): void {
                        this._manager.cdn().registerListener(groupId, this, listener);
                    }

                    public domainKey(): string {
                        var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                        var atts: org.kevoree.modeling.meta.MetaAttribute[] = this.metaClass().metaAttributes();
                        for (var i: number = 0; i < atts.length; i++) {
                            var att: org.kevoree.modeling.meta.MetaAttribute = atts[i];
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

                    public get(p_attribute: org.kevoree.modeling.meta.MetaAttribute): any {
                        var transposed: org.kevoree.modeling.meta.MetaAttribute = this.internal_transpose_att(p_attribute);
                        if (transposed == null) {
                            throw new java.lang.RuntimeException("Bad KMF usage, the attribute named " + p_attribute.metaName() + " is not part of " + this.metaClass().metaName());
                        } else {
                            return transposed.strategy().extrapolate(this, transposed);
                        }
                    }

                    public getByName(atributeName: string): any {
                        var transposed: org.kevoree.modeling.meta.MetaAttribute = this._metaClass.attribute(atributeName);
                        if (transposed != null) {
                            return transposed.strategy().extrapolate(this, transposed);
                        } else {
                            return null;
                        }
                    }

                    public set(p_attribute: org.kevoree.modeling.meta.MetaAttribute, payload: any): void {
                        var transposed: org.kevoree.modeling.meta.MetaAttribute = this.internal_transpose_att(p_attribute);
                        if (transposed == null) {
                            throw new java.lang.RuntimeException("Bad KMF usage, the attribute named " + p_attribute.metaName() + " is not part of " + this.metaClass().metaName());
                        } else {
                            transposed.strategy().mutate(this, transposed, payload);
                        }
                    }

                    public setByName(atributeName: string, payload: any): void {
                        var transposed: org.kevoree.modeling.meta.MetaAttribute = this._metaClass.attribute(atributeName);
                        if (transposed != null) {
                            transposed.strategy().mutate(this, transposed, payload);
                        }
                    }

                    public mutate(actionType: org.kevoree.modeling.KActionType, metaReference: org.kevoree.modeling.meta.MetaReference, param: org.kevoree.modeling.KObject): void {
                        this.internal_mutate(actionType, metaReference, param, true);
                    }

                    public internal_mutate(actionType: org.kevoree.modeling.KActionType, metaReferenceP: org.kevoree.modeling.meta.MetaReference, param: org.kevoree.modeling.KObject, setOpposite: boolean): void {
                        var metaReference: org.kevoree.modeling.meta.MetaReference = this.internal_transpose_ref(metaReferenceP);
                        if (metaReference == null) {
                            if (metaReferenceP == null) {
                                throw new java.lang.RuntimeException("Bad KMF usage, the reference " + " is null in metaClass named " + this.metaClass().metaName());
                            } else {
                                throw new java.lang.RuntimeException("Bad KMF usage, the reference named " + metaReferenceP.metaName() + " is not part of " + this.metaClass().metaName());
                            }
                        }
                        if (actionType.equals(org.kevoree.modeling.KActionType.ADD)) {
                            if (metaReference.single()) {
                                this.internal_mutate(org.kevoree.modeling.KActionType.SET, metaReference, param, setOpposite);
                            } else {
                                var raw: org.kevoree.modeling.memory.KCacheElementSegment = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.WRITE);
                                if (raw != null) {
                                    if (raw.addRef(metaReference.index(), param.uuid(), this._metaClass)) {
                                        if (setOpposite) {
                                            (<org.kevoree.modeling.abs.AbstractKObject>param).internal_mutate(org.kevoree.modeling.KActionType.ADD, metaReference.opposite(), this, false);
                                        }
                                    }
                                }
                            }
                        } else {
                            if (actionType.equals(org.kevoree.modeling.KActionType.SET)) {
                                if (!metaReference.single()) {
                                    this.internal_mutate(org.kevoree.modeling.KActionType.ADD, metaReference, param, setOpposite);
                                } else {
                                    if (param == null) {
                                        this.internal_mutate(org.kevoree.modeling.KActionType.REMOVE, metaReference, null, setOpposite);
                                    } else {
                                        var payload: org.kevoree.modeling.memory.KCacheElementSegment = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.WRITE);
                                        var previous: number[] = payload.getRef(metaReference.index(), this._metaClass);
                                        var singleValue: number[] = new Array();
                                        singleValue[0] = param.uuid();
                                        payload.set(metaReference.index(), singleValue, this._metaClass);
                                        if (setOpposite) {
                                            if (previous != null) {
                                                var self: org.kevoree.modeling.KObject = this;
                                                this._manager.lookupAllobjects(this._universe, this._time, previous,  (kObjects : org.kevoree.modeling.KObject[]) => {
                                                    for (var i: number = 0; i < kObjects.length; i++) {
                                                        (<org.kevoree.modeling.abs.AbstractKObject>kObjects[i]).internal_mutate(org.kevoree.modeling.KActionType.REMOVE, metaReference.opposite(), self, false);
                                                    }
                                                    (<org.kevoree.modeling.abs.AbstractKObject>param).internal_mutate(org.kevoree.modeling.KActionType.ADD, metaReference.opposite(), self, false);
                                                });
                                            } else {
                                                (<org.kevoree.modeling.abs.AbstractKObject>param).internal_mutate(org.kevoree.modeling.KActionType.ADD, metaReference.opposite(), this, false);
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (actionType.equals(org.kevoree.modeling.KActionType.REMOVE)) {
                                    if (metaReference.single()) {
                                        var raw: org.kevoree.modeling.memory.KCacheElementSegment = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.WRITE);
                                        var previousKid: number[] = raw.getRef(metaReference.index(), this._metaClass);
                                        raw.set(metaReference.index(), null, this._metaClass);
                                        if (setOpposite) {
                                            if (previousKid != null) {
                                                var self: org.kevoree.modeling.KObject = this;
                                                this._manager.lookupAllobjects(this._universe, this._time, previousKid,  (resolvedParams : org.kevoree.modeling.KObject[]) => {
                                                    if (resolvedParams != null) {
                                                        for (var dd: number = 0; dd < resolvedParams.length; dd++) {
                                                            if (resolvedParams[dd] != null) {
                                                                (<org.kevoree.modeling.abs.AbstractKObject>resolvedParams[dd]).internal_mutate(org.kevoree.modeling.KActionType.REMOVE, metaReference.opposite(), self, false);
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    } else {
                                        var payload: org.kevoree.modeling.memory.KCacheElementSegment = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.WRITE);
                                        if (payload != null) {
                                            if (payload.removeRef(metaReference.index(), param.uuid(), this._metaClass)) {
                                                if (setOpposite) {
                                                    (<org.kevoree.modeling.abs.AbstractKObject>param).internal_mutate(org.kevoree.modeling.KActionType.REMOVE, metaReference.opposite(), this, false);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    public size(p_metaReference: org.kevoree.modeling.meta.MetaReference): number {
                        var transposed: org.kevoree.modeling.meta.MetaReference = this.internal_transpose_ref(p_metaReference);
                        if (transposed == null) {
                            throw new java.lang.RuntimeException("Bad KMF usage, the attribute named " + p_metaReference.metaName() + " is not part of " + this.metaClass().metaName());
                        } else {
                            var raw: org.kevoree.modeling.memory.KCacheElementSegment = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.READ);
                            if (raw != null) {
                                var ref: any = raw.get(transposed.index(), this._metaClass);
                                if (ref == null) {
                                    return 0;
                                } else {
                                    try {
                                        var castedRefArray: number[] = <number[]>ref;
                                        return castedRefArray.length;
                                    } catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                            e.printStackTrace();
                                            return 0;
                                        }
                                     }
                                }
                            } else {
                                return 0;
                            }
                        }
                    }

                    public ref(p_metaReference: org.kevoree.modeling.meta.MetaReference, cb: (p : org.kevoree.modeling.KObject[]) => void): void {
                        var transposed: org.kevoree.modeling.meta.MetaReference = this.internal_transpose_ref(p_metaReference);
                        if (transposed == null) {
                            throw new java.lang.RuntimeException("Bad KMF usage, the reference named " + p_metaReference.metaName() + " is not part of " + this.metaClass().metaName());
                        } else {
                            var raw: org.kevoree.modeling.memory.KCacheElementSegment = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.READ);
                            if (raw == null) {
                                cb(new Array());
                            } else {
                                var o: number[] = raw.getRef(transposed.index(), this._metaClass);
                                if (o == null) {
                                    cb(new Array());
                                } else {
                                    this._manager.lookupAllobjects(this._universe, this._time, o, cb);
                                }
                            }
                        }
                    }

                    public visitAttributes(visitor: (p : org.kevoree.modeling.meta.MetaAttribute, p1 : any) => void): void {
                        if (!org.kevoree.modeling.util.Checker.isDefined(visitor)) {
                            return;
                        }
                        var metaAttributes: org.kevoree.modeling.meta.MetaAttribute[] = this.metaClass().metaAttributes();
                        for (var i: number = 0; i < metaAttributes.length; i++) {
                            visitor(metaAttributes[i], this.get(metaAttributes[i]));
                        }
                    }

                    public visit(p_visitor: (p : org.kevoree.modeling.KObject) => org.kevoree.modeling.KVisitResult, cb: (p : any) => void): void {
                        this.internal_visit(p_visitor, cb, new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR), new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR));
                    }

                    private internal_visit(visitor: (p : org.kevoree.modeling.KObject) => org.kevoree.modeling.KVisitResult, end: (p : any) => void, visited: org.kevoree.modeling.memory.struct.map.LongLongHashMap, traversed: org.kevoree.modeling.memory.struct.map.LongLongHashMap): void {
                        if (!org.kevoree.modeling.util.Checker.isDefined(visitor)) {
                            return;
                        }
                        if (traversed != null) {
                            traversed.put(this._uuid, this._uuid);
                        }
                        var toResolveIds: org.kevoree.modeling.memory.struct.map.LongLongHashMap = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        for (var i: number = 0; i < this.metaClass().metaReferences().length; i++) {
                            var reference: org.kevoree.modeling.meta.MetaReference = this.metaClass().metaReferences()[i];
                            var raw: org.kevoree.modeling.memory.KCacheElementSegment = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.READ);
                            if (raw != null) {
                                var obj: any = raw.get(reference.index(), this._metaClass);
                                if (obj != null) {
                                    try {
                                        var idArr: number[] = <number[]>obj;
                                        for (var k: number = 0; k < idArr.length; k++) {
                                            if (traversed == null || !traversed.containsKey(idArr[k])) {
                                                toResolveIds.put(idArr[k], idArr[k]);
                                            }
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
                        if (toResolveIds.size() == 0) {
                            if (org.kevoree.modeling.util.Checker.isDefined(end)) {
                                end(null);
                            }
                        } else {
                            var trimmed: number[] = new Array();
                            var inserted: number[] = [0];
                            toResolveIds.each( (key : number, value : number) => {
                                trimmed[inserted[0]] = key;
                                inserted[0]++;
                            });
                            this._manager.lookupAllobjects(this._universe, this._time, trimmed,  (resolvedArr : org.kevoree.modeling.KObject[]) => {
                                var nextDeep: java.util.List<org.kevoree.modeling.KObject> = new java.util.ArrayList<org.kevoree.modeling.KObject>();
                                for (var i: number = 0; i < resolvedArr.length; i++) {
                                    var resolved: org.kevoree.modeling.KObject = resolvedArr[i];
                                    var result: org.kevoree.modeling.KVisitResult = org.kevoree.modeling.KVisitResult.CONTINUE;
                                    if (resolved != null) {
                                        if (visitor != null && (visited == null || !visited.containsKey(resolved.uuid()))) {
                                            result = visitor(resolved);
                                        }
                                        if (visited != null) {
                                            visited.put(resolved.uuid(), resolved.uuid());
                                        }
                                    }
                                    if (result != null && result.equals(org.kevoree.modeling.KVisitResult.STOP)) {
                                        if (org.kevoree.modeling.util.Checker.isDefined(end)) {
                                            end(null);
                                        }
                                    } else {
                                        if (result.equals(org.kevoree.modeling.KVisitResult.CONTINUE)) {
                                            if (traversed == null || !traversed.containsKey(resolved.uuid())) {
                                                nextDeep.add(resolved);
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
                                            if (org.kevoree.modeling.util.Checker.isDefined(end)) {
                                                end(null);
                                            }
                                        } else {
                                            var abstractKObject: org.kevoree.modeling.abs.AbstractKObject = <org.kevoree.modeling.abs.AbstractKObject>nextDeep.get(index[0]);
                                            abstractKObject.internal_visit(visitor, next.get(0), visited, traversed);
                                        }
                                    });
                                    var abstractKObject: org.kevoree.modeling.abs.AbstractKObject = <org.kevoree.modeling.abs.AbstractKObject>nextDeep.get(index[0]);
                                    abstractKObject.internal_visit(visitor, next.get(0), visited, traversed);
                                } else {
                                    if (org.kevoree.modeling.util.Checker.isDefined(end)) {
                                        end(null);
                                    }
                                }
                            });
                        }
                    }

                    public toJSON(): string {
                        var raw: org.kevoree.modeling.memory.KCacheElementSegment = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.READ);
                        if (raw != null) {
                            return org.kevoree.modeling.memory.manager.JsonRaw.encode(raw, this._uuid, this._metaClass, false);
                        } else {
                            return null;
                        }
                    }

                    public toString(): string {
                        return this.toJSON();
                    }

                    public equals(obj: any): boolean {
                        if (!(obj instanceof org.kevoree.modeling.abs.AbstractKObject)) {
                            return false;
                        } else {
                            var casted: org.kevoree.modeling.abs.AbstractKObject = <org.kevoree.modeling.abs.AbstractKObject>obj;
                            return casted._uuid == this._uuid && casted._time == this._time && casted._universe == this._universe;
                        }
                    }

                    public hashCode(): number {
                        return <number>(this._universe ^ this._time ^ this._uuid);
                    }

                    public jump(p_time: number, p_callback: (p : org.kevoree.modeling.KObject) => void): void {
                        var resolve_entry: org.kevoree.modeling.memory.struct.segment.HeapCacheSegment = <org.kevoree.modeling.memory.struct.segment.HeapCacheSegment>this._manager.cache().get(this._universe, p_time, this._uuid);
                        if (resolve_entry != null) {
                            var timeTree: org.kevoree.modeling.memory.struct.tree.KLongTree = <org.kevoree.modeling.memory.struct.tree.KLongTree>this._manager.cache().get(this._universe, org.kevoree.modeling.KConfig.NULL_LONG, this._uuid);
                            timeTree.inc();
                            var universeTree: org.kevoree.modeling.memory.struct.map.LongLongHashMap = <org.kevoree.modeling.memory.struct.map.LongLongHashMap>this._manager.cache().get(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, this._uuid);
                            universeTree.inc();
                            resolve_entry.inc();
                            p_callback((<org.kevoree.modeling.abs.AbstractKModel<any>>this._manager.model()).createProxy(this._universe, p_time, this._uuid, this._metaClass));
                        } else {
                            var timeTree: org.kevoree.modeling.memory.struct.tree.KLongTree = <org.kevoree.modeling.memory.struct.tree.KLongTree>this._manager.cache().get(this._universe, org.kevoree.modeling.KConfig.NULL_LONG, this._uuid);
                            if (timeTree != null) {
                                var resolvedTime: number = timeTree.previousOrEqual(p_time);
                                if (resolvedTime != org.kevoree.modeling.KConfig.NULL_LONG) {
                                    var entry: org.kevoree.modeling.memory.struct.segment.HeapCacheSegment = <org.kevoree.modeling.memory.struct.segment.HeapCacheSegment>this._manager.cache().get(this._universe, resolvedTime, this._uuid);
                                    if (entry != null) {
                                        var universeTree: org.kevoree.modeling.memory.struct.map.LongLongHashMap = <org.kevoree.modeling.memory.struct.map.LongLongHashMap>this._manager.cache().get(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, this._uuid);
                                        universeTree.inc();
                                        timeTree.inc();
                                        entry.inc();
                                        p_callback((<org.kevoree.modeling.abs.AbstractKModel<any>>this._manager.model()).createProxy(this._universe, p_time, this._uuid, this._metaClass));
                                    } else {
                                        this._manager.lookup(this._universe, p_time, this._uuid, p_callback);
                                    }
                                }
                            } else {
                                this._manager.lookup(this._universe, p_time, this._uuid, p_callback);
                            }
                        }
                    }

                    public internal_transpose_ref(p: org.kevoree.modeling.meta.MetaReference): org.kevoree.modeling.meta.MetaReference {
                        if (!org.kevoree.modeling.util.Checker.isDefined(p)) {
                            return null;
                        } else {
                            return <org.kevoree.modeling.meta.MetaReference>this.metaClass().metaByName(p.metaName());
                        }
                    }

                    public internal_transpose_att(p: org.kevoree.modeling.meta.MetaAttribute): org.kevoree.modeling.meta.MetaAttribute {
                        if (!org.kevoree.modeling.util.Checker.isDefined(p)) {
                            return null;
                        } else {
                            return <org.kevoree.modeling.meta.MetaAttribute>this.metaClass().metaByName(p.metaName());
                        }
                    }

                    public internal_transpose_op(p: org.kevoree.modeling.meta.MetaOperation): org.kevoree.modeling.meta.MetaOperation {
                        if (!org.kevoree.modeling.util.Checker.isDefined(p)) {
                            return null;
                        } else {
                            return <org.kevoree.modeling.meta.MetaOperation>this.metaClass().metaByName(p.metaName());
                        }
                    }

                    public traversal(): org.kevoree.modeling.traversal.KTraversal {
                        return new org.kevoree.modeling.traversal.DefaultKTraversal(this);
                    }

                    public referencesWith(o: org.kevoree.modeling.KObject): org.kevoree.modeling.meta.MetaReference[] {
                        if (org.kevoree.modeling.util.Checker.isDefined(o)) {
                            var raw: org.kevoree.modeling.memory.KCacheElementSegment = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.READ);
                            if (raw != null) {
                                var allReferences: org.kevoree.modeling.meta.MetaReference[] = this.metaClass().metaReferences();
                                var selected: java.util.List<org.kevoree.modeling.meta.MetaReference> = new java.util.ArrayList<org.kevoree.modeling.meta.MetaReference>();
                                for (var i: number = 0; i < allReferences.length; i++) {
                                    var rawI: number[] = raw.getRef(allReferences[i].index(), this._metaClass);
                                    if (rawI != null) {
                                        var oUUID: number = o.uuid();
                                        for (var h: number = 0; h < rawI.length; h++) {
                                            if (rawI[h] == oUUID) {
                                                selected.add(allReferences[i]);
                                                break;
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

                    public call(p_operation: org.kevoree.modeling.meta.MetaOperation, p_params: any[], cb: (p : any) => void): void {
                        this._manager.operationManager().call(this, p_operation, p_params, cb);
                    }

                    public manager(): org.kevoree.modeling.memory.KDataManager {
                        return this._manager;
                    }

                }

                export class AbstractKObjectInfer extends org.kevoree.modeling.abs.AbstractKObject implements org.kevoree.modeling.KInfer {

                    constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.MetaClass, p_manager: org.kevoree.modeling.memory.KDataManager) {
                        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
                    }

                    public readOnlyState(): org.kevoree.modeling.KInferState {
                        var raw: org.kevoree.modeling.memory.KCacheElementSegment = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.READ);
                        if (raw != null) {
                            if (raw.get(org.kevoree.modeling.meta.MetaInferClass.getInstance().getCache().index(), this.metaClass()) == null) {
                                this.internal_load(raw);
                            }
                            return <org.kevoree.modeling.KInferState>raw.get(org.kevoree.modeling.meta.MetaInferClass.getInstance().getCache().index(), this.metaClass());
                        } else {
                            return null;
                        }
                    }

                    public modifyState(): org.kevoree.modeling.KInferState {
                        var raw: org.kevoree.modeling.memory.KCacheElementSegment = this._manager.segment(this, org.kevoree.modeling.memory.AccessMode.WRITE);
                        if (raw != null) {
                            if (raw.get(org.kevoree.modeling.meta.MetaInferClass.getInstance().getCache().index(), this.metaClass()) == null) {
                                this.internal_load(raw);
                            }
                            return <org.kevoree.modeling.KInferState>raw.get(org.kevoree.modeling.meta.MetaInferClass.getInstance().getCache().index(), this.metaClass());
                        } else {
                            return null;
                        }
                    }

                    private internal_load(raw: org.kevoree.modeling.memory.KCacheElementSegment): void {
                        if (raw.get(org.kevoree.modeling.meta.MetaInferClass.getInstance().getCache().index(), this.metaClass()) == null) {
                            var currentState: org.kevoree.modeling.KInferState = this.createEmptyState();
                            currentState.load(raw.get(org.kevoree.modeling.meta.MetaInferClass.getInstance().getRaw().index(), this.metaClass()).toString());
                            raw.set(org.kevoree.modeling.meta.MetaInferClass.getInstance().getCache().index(), currentState, this.metaClass());
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

                    public createEmptyState(): org.kevoree.modeling.KInferState {
                        throw "Abstract method";
                    }

                }

                export class AbstractKUniverse<A extends org.kevoree.modeling.KView, B extends org.kevoree.modeling.KUniverse<any, any, any>, C extends org.kevoree.modeling.KModel<any>> implements org.kevoree.modeling.KUniverse<any, any, any> {

                    public _universe: number;
                    public _manager: org.kevoree.modeling.memory.KDataManager;
                    constructor(p_key: number, p_manager: org.kevoree.modeling.memory.KDataManager) {
                        this._universe = p_key;
                        this._manager = p_manager;
                    }

                    public key(): number {
                        return this._universe;
                    }

                    public model(): C {
                        return <C>this._manager.model();
                    }

                    public delete(cb: (p : any) => void): void {
                        this.model().manager().delete(this, cb);
                    }

                    public time(timePoint: number): A {
                        if (timePoint <= org.kevoree.modeling.KConfig.END_OF_TIME && timePoint >= org.kevoree.modeling.KConfig.BEGINNING_OF_TIME) {
                            return this.internal_create(timePoint);
                        } else {
                            throw new java.lang.RuntimeException("The selected Time " + timePoint + " is out of the range of KMF managed time");
                        }
                    }

                    public internal_create(timePoint: number): A {
                        throw "Abstract method";
                    }

                    public equals(obj: any): boolean {
                        if (!(obj instanceof org.kevoree.modeling.abs.AbstractKUniverse)) {
                            return false;
                        } else {
                            var casted: org.kevoree.modeling.abs.AbstractKUniverse<any, any, any> = <org.kevoree.modeling.abs.AbstractKUniverse<any, any, any>>obj;
                            return casted._universe == this._universe;
                        }
                    }

                    public origin(): B {
                        return <B>this._manager.model().universe(this._manager.parentUniverseKey(this._universe));
                    }

                    public diverge(): B {
                        var casted: org.kevoree.modeling.abs.AbstractKModel<any> = <org.kevoree.modeling.abs.AbstractKModel<any>>this._manager.model();
                        var nextKey: number = this._manager.nextUniverseKey();
                        var newUniverse: B = <B>casted.internalCreateUniverse(nextKey);
                        this._manager.initUniverse(newUniverse, this);
                        return newUniverse;
                    }

                    public descendants(): java.util.List<B> {
                        var descendentsKey: number[] = this._manager.descendantsUniverseKeys(this._universe);
                        var childs: java.util.List<B> = new java.util.ArrayList<B>();
                        for (var i: number = 0; i < descendentsKey.length; i++) {
                            childs.add(<B>this._manager.model().universe(descendentsKey[i]));
                        }
                        return childs;
                    }

                    public lookupAllTimes(uuid: number, times: number[], cb: (p : org.kevoree.modeling.KObject[]) => void): void {
                        throw new java.lang.RuntimeException("Not implemented Yet !");
                    }

                    public listenAll(groupId: number, objects: number[], multiListener: (p : org.kevoree.modeling.KObject[]) => void): void {
                        this.model().manager().cdn().registerMultiListener(groupId, this, objects, multiListener);
                    }

                }

                export class AbstractKView implements org.kevoree.modeling.KView {

                    public _time: number;
                    public _universe: number;
                    public _manager: org.kevoree.modeling.memory.KDataManager;
                    constructor(p_universe: number, _time: number, p_manager: org.kevoree.modeling.memory.KDataManager) {
                        this._universe = p_universe;
                        this._time = _time;
                        this._manager = p_manager;
                    }

                    public now(): number {
                        return this._time;
                    }

                    public universe(): number {
                        return this._universe;
                    }

                    public setRoot(elem: org.kevoree.modeling.KObject, cb: (p : any) => void): void {
                        this._manager.setRoot(elem, cb);
                    }

                    public getRoot(cb: (p : any) => void): void {
                        this._manager.getRoot(this._universe, this._time, cb);
                    }

                    public select(query: string, cb: (p : org.kevoree.modeling.KObject[]) => void): void {
                        if (org.kevoree.modeling.util.Checker.isDefined(cb)) {
                            if (query == null || query.length == 0) {
                                cb(new Array());
                            } else {
                                this._manager.getRoot(this._universe, this._time,  (rootObj : org.kevoree.modeling.KObject) => {
                                    if (rootObj == null) {
                                        cb(new Array());
                                    } else {
                                        var cleanedQuery: string = query;
                                        if (query.length == 1 && query.charAt(0) == '/') {
                                            var param: org.kevoree.modeling.KObject[] = new Array();
                                            param[0] = rootObj;
                                            cb(param);
                                        } else {
                                            if (cleanedQuery.charAt(0) == '/') {
                                                cleanedQuery = cleanedQuery.substring(1);
                                            }
                                            org.kevoree.modeling.traversal.selector.KSelector.select(rootObj, cleanedQuery, cb);
                                        }
                                    }
                                });
                            }
                        }
                    }

                    public lookup(kid: number, cb: (p : org.kevoree.modeling.KObject) => void): void {
                        this._manager.lookup(this._universe, this._time, kid, cb);
                    }

                    public lookupAll(keys: number[], cb: (p : org.kevoree.modeling.KObject[]) => void): void {
                        this._manager.lookupAllobjects(this._universe, this._time, keys, cb);
                    }

                    public create(clazz: org.kevoree.modeling.meta.MetaClass): org.kevoree.modeling.KObject {
                        return this._manager.model().create(clazz, this._universe, this._time);
                    }

                    public createByName(metaClassName: string): org.kevoree.modeling.KObject {
                        return this.create(this._manager.model().metaModel().metaClassByName(metaClassName));
                    }

                    public json(): org.kevoree.modeling.KModelFormat {
                        return new org.kevoree.modeling.format.json.JsonFormat(this._universe, this._time, this._manager);
                    }

                    public xmi(): org.kevoree.modeling.KModelFormat {
                        return new org.kevoree.modeling.format.xmi.XmiFormat(this._universe, this._time, this._manager);
                    }

                    public equals(obj: any): boolean {
                        if (!org.kevoree.modeling.util.Checker.isDefined(obj)) {
                            return false;
                        }
                        if (!(obj instanceof org.kevoree.modeling.abs.AbstractKView)) {
                            return false;
                        } else {
                            var casted: org.kevoree.modeling.abs.AbstractKView = <org.kevoree.modeling.abs.AbstractKView>obj;
                            return casted._time == this._time && casted._universe == this._universe;
                        }
                    }

                }

                export class AbstractMetaAttribute implements org.kevoree.modeling.meta.MetaAttribute {

                    private _name: string;
                    private _index: number;
                    public _precision: number;
                    private _key: boolean;
                    private _metaType: org.kevoree.modeling.KType;
                    private _extrapolation: org.kevoree.modeling.extrapolation.Extrapolation;
                    public attributeType(): org.kevoree.modeling.KType {
                        return this._metaType;
                    }

                    public index(): number {
                        return this._index;
                    }

                    public metaName(): string {
                        return this._name;
                    }

                    public metaType(): org.kevoree.modeling.meta.MetaType {
                        return org.kevoree.modeling.meta.MetaType.ATTRIBUTE;
                    }

                    public precision(): number {
                        return this._precision;
                    }

                    public key(): boolean {
                        return this._key;
                    }

                    public strategy(): org.kevoree.modeling.extrapolation.Extrapolation {
                        return this._extrapolation;
                    }

                    public setExtrapolation(extrapolation: org.kevoree.modeling.extrapolation.Extrapolation): void {
                        this._extrapolation = extrapolation;
                    }

                    constructor(p_name: string, p_index: number, p_precision: number, p_key: boolean, p_metaType: org.kevoree.modeling.KType, p_extrapolation: org.kevoree.modeling.extrapolation.Extrapolation) {
                        this._name = p_name;
                        this._index = p_index;
                        this._precision = p_precision;
                        this._key = p_key;
                        this._metaType = p_metaType;
                        this._extrapolation = p_extrapolation;
                    }

                }

                export class AbstractMetaClass implements org.kevoree.modeling.meta.MetaClass {

                    private _name: string;
                    private _index: number;
                    private _meta: org.kevoree.modeling.meta.Meta[];
                    private _atts: org.kevoree.modeling.meta.MetaAttribute[];
                    private _refs: org.kevoree.modeling.meta.MetaReference[];
                    private _indexes: org.kevoree.modeling.memory.struct.map.StringHashMap<any> = null;
                    public metaByName(name: string): org.kevoree.modeling.meta.Meta {
                        return this._indexes.get(name);
                    }

                    public attribute(name: string): org.kevoree.modeling.meta.MetaAttribute {
                        if (this._indexes == null) {
                            return null;
                        } else {
                            var resolved: org.kevoree.modeling.meta.Meta = this._indexes.get(name);
                            if (resolved != null && resolved instanceof org.kevoree.modeling.abs.AbstractMetaAttribute) {
                                return <org.kevoree.modeling.meta.MetaAttribute>resolved;
                            }
                            return null;
                        }
                    }

                    public reference(name: string): org.kevoree.modeling.meta.MetaReference {
                        if (this._indexes == null) {
                            return null;
                        } else {
                            var resolved: org.kevoree.modeling.meta.Meta = this._indexes.get(name);
                            if (resolved != null && resolved instanceof org.kevoree.modeling.abs.AbstractMetaReference) {
                                return <org.kevoree.modeling.meta.MetaReference>resolved;
                            }
                            return null;
                        }
                    }

                    public operation(name: string): org.kevoree.modeling.meta.MetaOperation {
                        if (this._indexes == null) {
                            return null;
                        } else {
                            var resolved: org.kevoree.modeling.meta.Meta = this._indexes.get(name);
                            if (resolved != null && resolved instanceof org.kevoree.modeling.abs.AbstractMetaOperation) {
                                return <org.kevoree.modeling.meta.MetaOperation>resolved;
                            }
                            return null;
                        }
                    }

                    public metaElements(): org.kevoree.modeling.meta.Meta[] {
                        return this._meta;
                    }

                    public index(): number {
                        return this._index;
                    }

                    public metaName(): string {
                        return this._name;
                    }

                    public metaType(): org.kevoree.modeling.meta.MetaType {
                        return org.kevoree.modeling.meta.MetaType.CLASS;
                    }

                    constructor(p_name: string, p_index: number) {
                        this._name = p_name;
                        this._index = p_index;
                    }

                    public init(p_meta: org.kevoree.modeling.meta.Meta[]): void {
                        this._indexes = new org.kevoree.modeling.memory.struct.map.StringHashMap<any>(p_meta.length, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._meta = p_meta;
                        var nbAtt: number = 0;
                        var nbRef: number = 0;
                        for (var i: number = 0; i < p_meta.length; i++) {
                            if (p_meta[i].metaType().equals(org.kevoree.modeling.meta.MetaType.ATTRIBUTE)) {
                                nbAtt++;
                            } else {
                                if (p_meta[i].metaType().equals(org.kevoree.modeling.meta.MetaType.REFERENCE)) {
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
                            if (p_meta[i].metaType().equals(org.kevoree.modeling.meta.MetaType.ATTRIBUTE)) {
                                this._atts[nbAtt] = <org.kevoree.modeling.meta.MetaAttribute>p_meta[i];
                                nbAtt++;
                            } else {
                                if (p_meta[i].metaType().equals(org.kevoree.modeling.meta.MetaType.REFERENCE)) {
                                    this._refs[nbRef] = <org.kevoree.modeling.meta.MetaReference>p_meta[i];
                                    nbRef++;
                                }
                            }
                            this._indexes.put(p_meta[i].metaName(), p_meta[i]);
                        }
                    }

                    public meta(index: number): org.kevoree.modeling.meta.Meta {
                        if (index >= 0 && index < this._meta.length) {
                            return this._meta[index];
                        } else {
                            return null;
                        }
                    }

                    public metaAttributes(): org.kevoree.modeling.meta.MetaAttribute[] {
                        return this._atts;
                    }

                    public metaReferences(): org.kevoree.modeling.meta.MetaReference[] {
                        return this._refs;
                    }

                }

                export class AbstractMetaModel implements org.kevoree.modeling.meta.MetaModel {

                    private _name: string;
                    private _index: number;
                    private _metaClasses: org.kevoree.modeling.meta.MetaClass[];
                    private _metaClasses_indexes: org.kevoree.modeling.memory.struct.map.StringHashMap<any> = null;
                    public index(): number {
                        return this._index;
                    }

                    public metaName(): string {
                        return this._name;
                    }

                    public metaType(): org.kevoree.modeling.meta.MetaType {
                        return org.kevoree.modeling.meta.MetaType.MODEL;
                    }

                    constructor(p_name: string, p_index: number) {
                        this._name = p_name;
                        this._index = p_index;
                    }

                    public metaClasses(): org.kevoree.modeling.meta.MetaClass[] {
                        return this._metaClasses;
                    }

                    public metaClassByName(name: string): org.kevoree.modeling.meta.MetaClass {
                        if (this._metaClasses_indexes == null) {
                            return null;
                        }
                        var resolved: number = this._metaClasses_indexes.get(name);
                        if (resolved == null) {
                            return null;
                        } else {
                            return this._metaClasses[resolved];
                        }
                    }

                    public metaClass(index: number): org.kevoree.modeling.meta.MetaClass {
                        if (index >= 0 && index < this._metaClasses.length) {
                            return this._metaClasses[index];
                        }
                        return null;
                    }

                    public init(p_metaClasses: org.kevoree.modeling.meta.MetaClass[]): void {
                        this._metaClasses_indexes = new org.kevoree.modeling.memory.struct.map.StringHashMap<any>(p_metaClasses.length, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._metaClasses = p_metaClasses;
                        for (var i: number = 0; i < this._metaClasses.length; i++) {
                            this._metaClasses_indexes.put(this._metaClasses[i].metaName(), i);
                        }
                    }

                }

                export class AbstractMetaOperation implements org.kevoree.modeling.meta.MetaOperation {

                    private _name: string;
                    private _index: number;
                    private _lazyMetaClass: () => org.kevoree.modeling.meta.Meta;
                    public index(): number {
                        return this._index;
                    }

                    public metaName(): string {
                        return this._name;
                    }

                    public metaType(): org.kevoree.modeling.meta.MetaType {
                        return org.kevoree.modeling.meta.MetaType.OPERATION;
                    }

                    constructor(p_name: string, p_index: number, p_lazyMetaClass: () => org.kevoree.modeling.meta.Meta) {
                        this._name = p_name;
                        this._index = p_index;
                        this._lazyMetaClass = p_lazyMetaClass;
                    }

                    public origin(): org.kevoree.modeling.meta.MetaClass {
                        if (this._lazyMetaClass != null) {
                            return <org.kevoree.modeling.meta.MetaClass>this._lazyMetaClass();
                        }
                        return null;
                    }

                }

                export class AbstractMetaReference implements org.kevoree.modeling.meta.MetaReference {

                    private _name: string;
                    private _index: number;
                    private _visible: boolean;
                    private _single: boolean;
                    private _lazyMetaType: () => org.kevoree.modeling.meta.Meta;
                    private _op_name: string;
                    private _lazyMetaOrigin: () => org.kevoree.modeling.meta.Meta;
                    public single(): boolean {
                        return this._single;
                    }

                    public type(): org.kevoree.modeling.meta.MetaClass {
                        if (this._lazyMetaType != null) {
                            return <org.kevoree.modeling.meta.MetaClass>this._lazyMetaType();
                        } else {
                            return null;
                        }
                    }

                    public opposite(): org.kevoree.modeling.meta.MetaReference {
                        if (this._op_name != null) {
                            return this.type().reference(this._op_name);
                        }
                        return null;
                    }

                    public origin(): org.kevoree.modeling.meta.MetaClass {
                        if (this._lazyMetaOrigin != null) {
                            return <org.kevoree.modeling.meta.MetaClass>this._lazyMetaOrigin();
                        }
                        return null;
                    }

                    public index(): number {
                        return this._index;
                    }

                    public metaName(): string {
                        return this._name;
                    }

                    public metaType(): org.kevoree.modeling.meta.MetaType {
                        return org.kevoree.modeling.meta.MetaType.REFERENCE;
                    }

                    public visible(): boolean {
                        return this._visible;
                    }

                    constructor(p_name: string, p_index: number, p_visible: boolean, p_single: boolean, p_lazyMetaType: () => org.kevoree.modeling.meta.Meta, op_name: string, p_lazyMetaOrigin: () => org.kevoree.modeling.meta.Meta) {
                        this._name = p_name;
                        this._index = p_index;
                        this._visible = p_visible;
                        this._single = p_single;
                        this._lazyMetaType = p_lazyMetaType;
                        this._op_name = op_name;
                        this._lazyMetaOrigin = p_lazyMetaOrigin;
                    }

                }

                export class AbstractTimeWalker implements org.kevoree.modeling.KTimeWalker {

                    private _origin: org.kevoree.modeling.abs.AbstractKObject = null;
                    constructor(p_origin: org.kevoree.modeling.abs.AbstractKObject) {
                        this._origin = p_origin;
                    }

                    private internal_times(start: number, end: number, cb: (p : number[]) => void): void {
                        var keys: org.kevoree.modeling.memory.KContentKey[] = new Array();
                        keys[0] = org.kevoree.modeling.memory.KContentKey.createGlobalUniverseTree();
                        keys[1] = org.kevoree.modeling.memory.KContentKey.createUniverseTree(this._origin.uuid());
                        var manager: org.kevoree.modeling.memory.manager.DefaultKDataManager = <org.kevoree.modeling.memory.manager.DefaultKDataManager>this._origin._manager;
                        manager.bumpKeysToCache(keys,  (kCacheElements : org.kevoree.modeling.memory.KCacheElement[]) => {
                            var objUniverse: org.kevoree.modeling.memory.struct.map.LongLongHashMap = <org.kevoree.modeling.memory.struct.map.LongLongHashMap>kCacheElements[1];
                            if (kCacheElements[0] == null || kCacheElements[1] == null) {
                                cb(null);
                            } else {
                                var collectedUniverse: number[] = org.kevoree.modeling.memory.manager.ResolutionHelper.universeSelectByRange(<org.kevoree.modeling.memory.struct.map.LongLongHashMap>kCacheElements[0], <org.kevoree.modeling.memory.struct.map.LongLongHashMap>kCacheElements[1], start, end, this._origin.universe());
                                var timeTreeToLoad: org.kevoree.modeling.memory.KContentKey[] = new Array();
                                for (var i: number = 0; i < collectedUniverse.length; i++) {
                                    timeTreeToLoad[i] = org.kevoree.modeling.memory.KContentKey.createTimeTree(collectedUniverse[i], this._origin.uuid());
                                }
                                manager.bumpKeysToCache(timeTreeToLoad,  (timeTrees : org.kevoree.modeling.memory.KCacheElement[]) => {
                                    var collector: org.kevoree.modeling.memory.struct.map.LongLongHashMap = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                    var previousDivergenceTime: number = end;
                                    for (var i: number = 0; i < collectedUniverse.length; i++) {
                                        var timeTree: org.kevoree.modeling.memory.struct.tree.KLongTree = <org.kevoree.modeling.memory.struct.tree.KLongTree>timeTrees[i];
                                        if (timeTree != null) {
                                            var currentDivergenceTime: number = objUniverse.get(collectedUniverse[i]);
                                            var finalI: number = i;
                                            var finalPreviousDivergenceTime: number = previousDivergenceTime;
                                            timeTree.range(currentDivergenceTime, previousDivergenceTime,  (t : number) => {
                                                if (collector.size() == 0) {
                                                    collector.put(collector.size(), t);
                                                } else {
                                                    if (t != finalPreviousDivergenceTime) {
                                                        collector.put(collector.size(), t);
                                                    }
                                                }
                                            });
                                            previousDivergenceTime = currentDivergenceTime;
                                        }
                                    }
                                    var orderedTime: number[] = new Array();
                                    for (var i: number = 0; i < collector.size(); i++) {
                                        orderedTime[i] = collector.get(i);
                                    }
                                    cb(orderedTime);
                                });
                            }
                        });
                    }

                    public allTimes(cb: (p : number[]) => void): void {
                        this.internal_times(org.kevoree.modeling.KConfig.BEGINNING_OF_TIME, org.kevoree.modeling.KConfig.END_OF_TIME, cb);
                    }

                    public timesBefore(endOfSearch: number, cb: (p : number[]) => void): void {
                        this.internal_times(org.kevoree.modeling.KConfig.BEGINNING_OF_TIME, endOfSearch, cb);
                    }

                    public timesAfter(beginningOfSearch: number, cb: (p : number[]) => void): void {
                        this.internal_times(beginningOfSearch, org.kevoree.modeling.KConfig.END_OF_TIME, cb);
                    }

                    public timesBetween(beginningOfSearch: number, endOfSearch: number, cb: (p : number[]) => void): void {
                        this.internal_times(beginningOfSearch, endOfSearch, cb);
                    }

                }

                export interface LazyResolver {

                    meta(): org.kevoree.modeling.meta.Meta;

                }

            }
            export module extrapolation {
                export class DiscreteExtrapolation implements org.kevoree.modeling.extrapolation.Extrapolation {

                    private static INSTANCE: org.kevoree.modeling.extrapolation.DiscreteExtrapolation;
                    public static instance(): org.kevoree.modeling.extrapolation.Extrapolation {
                        if (DiscreteExtrapolation.INSTANCE == null) {
                            DiscreteExtrapolation.INSTANCE = new org.kevoree.modeling.extrapolation.DiscreteExtrapolation();
                        }
                        return DiscreteExtrapolation.INSTANCE;
                    }

                    public extrapolate(current: org.kevoree.modeling.KObject, attribute: org.kevoree.modeling.meta.MetaAttribute): any {
                        var payload: org.kevoree.modeling.memory.KCacheElementSegment = (<org.kevoree.modeling.abs.AbstractKObject>current)._manager.segment(current, org.kevoree.modeling.memory.AccessMode.READ);
                        if (payload != null) {
                            return payload.get(attribute.index(), current.metaClass());
                        } else {
                            return null;
                        }
                    }

                    public mutate(current: org.kevoree.modeling.KObject, attribute: org.kevoree.modeling.meta.MetaAttribute, payload: any): void {
                        var internalPayload: org.kevoree.modeling.memory.KCacheElementSegment = (<org.kevoree.modeling.abs.AbstractKObject>current)._manager.segment(current, org.kevoree.modeling.memory.AccessMode.WRITE);
                        if (internalPayload != null) {
                            internalPayload.set(attribute.index(), payload, current.metaClass());
                        }
                    }

                    public save(cache: any, attribute: org.kevoree.modeling.meta.MetaAttribute): string {
                        if (cache != null) {
                            return attribute.attributeType().save(cache);
                        } else {
                            return null;
                        }
                    }

                    public load(payload: string, attribute: org.kevoree.modeling.meta.MetaAttribute, now: number): any {
                        if (payload != null) {
                            return attribute.attributeType().load(payload);
                        }
                        return null;
                    }

                }

                export interface Extrapolation {

                    extrapolate(current: org.kevoree.modeling.KObject, attribute: org.kevoree.modeling.meta.MetaAttribute): any;

                    mutate(current: org.kevoree.modeling.KObject, attribute: org.kevoree.modeling.meta.MetaAttribute, payload: any): void;

                    save(cache: any, attribute: org.kevoree.modeling.meta.MetaAttribute): string;

                    load(payload: string, attribute: org.kevoree.modeling.meta.MetaAttribute, now: number): any;

                }

                export class PolynomialExtrapolation implements org.kevoree.modeling.extrapolation.Extrapolation {

                    private static INSTANCE: org.kevoree.modeling.extrapolation.PolynomialExtrapolation;
                    public extrapolate(current: org.kevoree.modeling.KObject, attribute: org.kevoree.modeling.meta.MetaAttribute): any {
                        var pol: org.kevoree.modeling.extrapolation.polynomial.PolynomialModel = <org.kevoree.modeling.extrapolation.polynomial.PolynomialModel>(<org.kevoree.modeling.abs.AbstractKObject>current)._manager.segment(current, org.kevoree.modeling.memory.AccessMode.READ).get(attribute.index(), current.metaClass());
                        if (pol != null) {
                            var extrapolatedValue: number = pol.extrapolate(current.now());
                            if (attribute.attributeType() == org.kevoree.modeling.meta.PrimitiveTypes.DOUBLE) {
                                return extrapolatedValue;
                            } else {
                                if (attribute.attributeType() == org.kevoree.modeling.meta.PrimitiveTypes.LONG) {
                                    return extrapolatedValue.longValue();
                                } else {
                                    if (attribute.attributeType() == org.kevoree.modeling.meta.PrimitiveTypes.FLOAT) {
                                        return extrapolatedValue.floatValue();
                                    } else {
                                        if (attribute.attributeType() == org.kevoree.modeling.meta.PrimitiveTypes.INT) {
                                            return extrapolatedValue.intValue();
                                        } else {
                                            if (attribute.attributeType() == org.kevoree.modeling.meta.PrimitiveTypes.SHORT) {
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

                    public mutate(current: org.kevoree.modeling.KObject, attribute: org.kevoree.modeling.meta.MetaAttribute, payload: any): void {
                        var raw: org.kevoree.modeling.memory.KCacheElementSegment = (<org.kevoree.modeling.abs.AbstractKObject>current)._manager.segment(current, org.kevoree.modeling.memory.AccessMode.READ);
                        var previous: any = raw.get(attribute.index(), current.metaClass());
                        if (previous == null) {
                            var pol: org.kevoree.modeling.extrapolation.polynomial.PolynomialModel = this.createPolynomialModel(current.now(), attribute.precision());
                            pol.insert(current.now(), this.castNumber(payload));
                            (<org.kevoree.modeling.abs.AbstractKObject>current)._manager.segment(current, org.kevoree.modeling.memory.AccessMode.WRITE).set(attribute.index(), pol, current.metaClass());
                        } else {
                            var previousPol: org.kevoree.modeling.extrapolation.polynomial.PolynomialModel = <org.kevoree.modeling.extrapolation.polynomial.PolynomialModel>previous;
                            if (!previousPol.insert(current.now(), this.castNumber(payload))) {
                                var pol: org.kevoree.modeling.extrapolation.polynomial.PolynomialModel = this.createPolynomialModel(previousPol.lastIndex(), attribute.precision());
                                pol.insert(previousPol.lastIndex(), previousPol.extrapolate(previousPol.lastIndex()));
                                pol.insert(current.now(), this.castNumber(payload));
                                (<org.kevoree.modeling.abs.AbstractKObject>current)._manager.segment(current, org.kevoree.modeling.memory.AccessMode.WRITE).set(attribute.index(), pol, current.metaClass());
                            } else {
                                if (previousPol.isDirty()) {
                                    raw.set(attribute.index(), previousPol, current.metaClass());
                                }
                            }
                        }
                    }

                    private castNumber(payload: any): number {
                         return +payload;
                    }

                    public save(cache: any, attribute: org.kevoree.modeling.meta.MetaAttribute): string {
                        try {
                            return (<org.kevoree.modeling.extrapolation.polynomial.PolynomialModel>cache).save();
                        } catch ($ex$) {
                            if ($ex$ instanceof java.lang.Exception) {
                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                e.printStackTrace();
                                return null;
                            }
                         }
                    }

                    public load(payload: string, attribute: org.kevoree.modeling.meta.MetaAttribute, now: number): any {
                        var pol: org.kevoree.modeling.extrapolation.polynomial.PolynomialModel = this.createPolynomialModel(now, attribute.precision());
                        pol.load(payload);
                        return pol;
                    }

                    public static instance(): org.kevoree.modeling.extrapolation.Extrapolation {
                        if (PolynomialExtrapolation.INSTANCE == null) {
                            PolynomialExtrapolation.INSTANCE = new org.kevoree.modeling.extrapolation.PolynomialExtrapolation();
                        }
                        return PolynomialExtrapolation.INSTANCE;
                    }

                    private createPolynomialModel(origin: number, precision: number): org.kevoree.modeling.extrapolation.polynomial.PolynomialModel {
                        return new org.kevoree.modeling.extrapolation.polynomial.doublepolynomial.DoublePolynomialModel(origin, precision, 20, org.kevoree.modeling.extrapolation.polynomial.util.Prioritization.LOWDEGREES);
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
                        export class DoublePolynomialModel implements org.kevoree.modeling.extrapolation.polynomial.PolynomialModel {

                            private static sep: string = "/";
                            public static sepW: string = "%";
                            private _prioritization: org.kevoree.modeling.extrapolation.polynomial.util.Prioritization;
                            private _maxDegree: number;
                            private _toleratedError: number;
                            private _isDirty: boolean = false;
                            private _weights: number[];
                            private _polyTime: org.kevoree.modeling.extrapolation.polynomial.doublepolynomial.TimePolynomial;
                            constructor(p_timeOrigin: number, p_toleratedError: number, p_maxDegree: number, p_prioritization: org.kevoree.modeling.extrapolation.polynomial.util.Prioritization) {
                                this._polyTime = new org.kevoree.modeling.extrapolation.polynomial.doublepolynomial.TimePolynomial(p_timeOrigin);
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

                            public comparePolynome(p2: org.kevoree.modeling.extrapolation.polynomial.doublepolynomial.DoublePolynomialModel, err: number): boolean {
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
                                        var pf: org.kevoree.modeling.extrapolation.polynomial.util.PolynomialFitEjml = new org.kevoree.modeling.extrapolation.polynomial.util.PolynomialFitEjml(deg);
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
                                if (this._prioritization == org.kevoree.modeling.extrapolation.polynomial.util.Prioritization.HIGHDEGREES) {
                                    tol = this._toleratedError / Math.pow(2, this._maxDegree - this.degree());
                                } else {
                                    if (this._prioritization == org.kevoree.modeling.extrapolation.polynomial.util.Prioritization.LOWDEGREES) {
                                        tol = this._toleratedError / Math.pow(2, this.degree() + 0.5);
                                    } else {
                                        if (this._prioritization == org.kevoree.modeling.extrapolation.polynomial.util.Prioritization.SAMEPRIORITY) {
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
                                        var pf: org.kevoree.modeling.extrapolation.polynomial.util.PolynomialFitEjml = new org.kevoree.modeling.extrapolation.polynomial.util.PolynomialFitEjml(deg);
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
                                        builder.append(org.kevoree.modeling.extrapolation.polynomial.doublepolynomial.DoublePolynomialModel.sepW);
                                    }
                                    builder.append(this._weights[i] + "");
                                }
                                builder.append(org.kevoree.modeling.extrapolation.polynomial.doublepolynomial.DoublePolynomialModel.sepW);
                                builder.append(this._nbSamples);
                                builder.append(org.kevoree.modeling.extrapolation.polynomial.doublepolynomial.DoublePolynomialModel.sepW);
                                builder.append(this._samplingPeriod);
                                this._isDirty = false;
                                return builder.toString();
                            }

                            public load(payload: string): void {
                                var parts: string[] = payload.split(org.kevoree.modeling.extrapolation.polynomial.doublepolynomial.DoublePolynomialModel.sepW);
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
                        export class SimplePolynomialModel implements org.kevoree.modeling.extrapolation.polynomial.PolynomialModel {

                            private weights: number[];
                            private timeOrigin: number;
                            private degradeFactor: number;
                            private prioritization: org.kevoree.modeling.extrapolation.polynomial.util.Prioritization;
                            private maxDegree: number;
                            private toleratedError: number;
                            private _lastIndex: number = -1;
                            private static sep: string = "/";
                            private _isDirty: boolean = false;
                            constructor(timeOrigin: number, toleratedError: number, maxDegree: number, prioritization: org.kevoree.modeling.extrapolation.polynomial.util.Prioritization) {
                                this.timeOrigin = timeOrigin;
                                this.degradeFactor = 1;
                                this.prioritization = prioritization;
                                this.maxDegree = maxDegree;
                                this.toleratedError = toleratedError;
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

                            private getMaxErr(degree: number, toleratedError: number, maxDegree: number, prioritization: org.kevoree.modeling.extrapolation.polynomial.util.Prioritization): number {
                                return toleratedError;
                            }

                            private internal_feed(time: number, value: number): void {
                                if (this.weights == null) {
                                    this.weights = new Array();
                                    this.weights[0] = value;
                                    this.timeOrigin = time;
                                }
                            }

                            private maxError(computedWeights: number[], time: number, value: number): number {
                                var maxErr: number = 0;
                                var temp: number = 0;
                                var ds: org.kevoree.modeling.extrapolation.polynomial.util.DataSample;
                                temp = Math.abs(this.internal_extrapolate(time, computedWeights) - value);
                                if (temp > maxErr) {
                                    maxErr = temp;
                                }
                                return maxErr;
                            }

                            public comparePolynome(p2: org.kevoree.modeling.extrapolation.polynomial.simplepolynomial.SimplePolynomialModel, err: number): boolean {
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
                                if (true) {
                                    return true;
                                }
                                if (this.weights == null) {
                                    this.internal_feed(time, value);
                                    this._lastIndex = time;
                                    this._isDirty = true;
                                    return true;
                                }
                                var maxError: number = this.getMaxErr(this.getDegree(), this.toleratedError, this.maxDegree, this.prioritization);
                                if (Math.abs(this.extrapolate(time) - value) <= maxError) {
                                    this._lastIndex = time;
                                    return true;
                                }
                                var deg: number = this.getDegree();
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
                            private decomposer: org.kevoree.modeling.extrapolation.polynomial.util.QRDecompositionHouseholderColumn_D64;
                            public maxRows: number = -1;
                            public maxCols: number = -1;
                            public Q: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F;
                            public R: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F;
                            private Y: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F;
                            private Z: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F;
                            public setA(A: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F): boolean {
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

                            public solve(B: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F, X: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F): void {
                                var BnumCols: number = B.numCols;
                                this.Y.reshape(this.numRows, 1, false);
                                this.Z.reshape(this.numRows, 1, false);
                                for (var colB: number = 0; colB < BnumCols; colB++) {
                                    for (var i: number = 0; i < this.numRows; i++) {
                                        this.Y.data[i] = B.unsafe_get(i, colB);
                                    }
                                    org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.multTransA(this.Q, this.Y, this.Z);
                                    this.solveU(this.R.data, this.Z.data, this.numCols);
                                    for (var i: number = 0; i < this.numCols; i++) {
                                        X.cset(i, colB, this.Z.data[i]);
                                    }
                                }
                            }

                            constructor() {
                                this.decomposer = new org.kevoree.modeling.extrapolation.polynomial.util.QRDecompositionHouseholderColumn_D64();
                            }

                            public setMaxSize(maxRows: number, maxCols: number): void {
                                maxRows += 5;
                                this.maxRows = maxRows;
                                this.maxCols = maxCols;
                                this.Q = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(maxRows, maxRows);
                                this.R = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(maxRows, maxCols);
                                this.Y = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(maxRows, 1);
                                this.Z = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(maxRows, 1);
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
                            public static multTransA_smallMV(A: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F, B: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F, C: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F): void {
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

                            public static multTransA_reorderMV(A: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F, B: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F, C: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F): void {
                                if (A.numRows == 0) {
                                    org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.fill(C, 0);
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

                            public static multTransA_reorderMM(a: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F, b: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F, c: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F): void {
                                if (a.numCols == 0 || a.numRows == 0) {
                                    org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.fill(c, 0);
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

                            public static multTransA_smallMM(a: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F, b: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F, c: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F): void {
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

                            public static multTransA(a: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F, b: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F, c: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F): void {
                                if (b.numCols == 1) {
                                    if (a.numCols >= org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH) {
                                        org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.multTransA_reorderMV(a, b, c);
                                    } else {
                                        org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.multTransA_smallMV(a, b, c);
                                    }
                                } else {
                                    if (a.numCols >= org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH || b.numCols >= org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH) {
                                        org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.multTransA_reorderMM(a, b, c);
                                    } else {
                                        org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.multTransA_smallMM(a, b, c);
                                    }
                                }
                            }

                            public static setIdentity(mat: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F): void {
                                var width: number = mat.numRows < mat.numCols ? mat.numRows : mat.numCols;
                                java.util.Arrays.fill(mat.data, 0, mat.getNumElements(), 0);
                                var index: number = 0;
                                for (var i: number = 0; i < width; i++) {
                                    mat.data[index] = 1;
                                    index += mat.numCols + 1;
                                }
                            }

                            public static widentity(width: number): org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F {
                                var ret: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(width, width);
                                for (var i: number = 0; i < width; i++) {
                                    ret.cset(i, i, 1.0);
                                }
                                return ret;
                            }

                            public static identity(numRows: number, numCols: number): org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F {
                                var ret: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(numRows, numCols);
                                var small: number = numRows < numCols ? numRows : numCols;
                                for (var i: number = 0; i < small; i++) {
                                    ret.cset(i, i, 1.0);
                                }
                                return ret;
                            }

                            public static fill(a: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F, value: number): void {
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

                            public A: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F;
                            public coef: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F;
                            public y: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F;
                            public solver: org.kevoree.modeling.extrapolation.polynomial.util.AdjLinearSolverQr;
                            constructor(degree: number) {
                                this.coef = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(degree + 1, 1);
                                this.A = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(1, degree + 1);
                                this.y = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(1, 1);
                                this.solver = new org.kevoree.modeling.extrapolation.polynomial.util.AdjLinearSolverQr();
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

                            public getQ(Q: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F, compact: boolean): org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F {
                                if (compact) {
                                    if (Q == null) {
                                        Q = org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.identity(this.numRows, this.minLength);
                                    } else {
                                        org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.setIdentity(Q);
                                    }
                                } else {
                                    if (Q == null) {
                                        Q = org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.widentity(this.numRows);
                                    } else {
                                        org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F.setIdentity(Q);
                                    }
                                }
                                for (var j: number = this.minLength - 1; j >= 0; j--) {
                                    var u: number[] = this.dataQR[j];
                                    var vv: number = u[j];
                                    u[j] = 1;
                                    org.kevoree.modeling.extrapolation.polynomial.util.QRDecompositionHouseholderColumn_D64.rank1UpdateMultR(Q, u, this.gammas[j], j, j, this.numRows, this.v);
                                    u[j] = vv;
                                }
                                return Q;
                            }

                            public getR(R: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F, compact: boolean): org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F {
                                if (R == null) {
                                    if (compact) {
                                        R = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(this.minLength, this.numCols);
                                    } else {
                                        R = new org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F(this.numRows, this.numCols);
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

                            public decompose(A: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F): boolean {
                                this.setExpectedMaxSize(A.numRows, A.numCols);
                                this.convertToColumnMajor(A);
                                this.error = false;
                                for (var j: number = 0; j < this.minLength; j++) {
                                    this.householder(j);
                                    this.updateA(j);
                                }
                                return !this.error;
                            }

                            public convertToColumnMajor(A: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F): void {
                                for (var x: number = 0; x < this.numCols; x++) {
                                    var colQ: number[] = this.dataQR[x];
                                    for (var y: number = 0; y < this.numRows; y++) {
                                        colQ[y] = A.data[y * this.numCols + x];
                                    }
                                }
                            }

                            public householder(j: number): void {
                                var u: number[] = this.dataQR[j];
                                var max: number = org.kevoree.modeling.extrapolation.polynomial.util.QRDecompositionHouseholderColumn_D64.findMax(u, j, this.numRows - j);
                                if (max == 0.0) {
                                    this.gamma = 0;
                                    this.error = true;
                                } else {
                                    this.tau = org.kevoree.modeling.extrapolation.polynomial.util.QRDecompositionHouseholderColumn_D64.computeTauAndDivide(j, this.numRows, u, max);
                                    var u_0: number = u[j] + this.tau;
                                    org.kevoree.modeling.extrapolation.polynomial.util.QRDecompositionHouseholderColumn_D64.divideElements(j + 1, this.numRows, u, u_0);
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

                            public static rank1UpdateMultR(A: org.kevoree.modeling.extrapolation.polynomial.util.DenseMatrix64F, u: number[], gamma: number, colA0: number, w0: number, w1: number, _temp: number[]): void {
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
            }
            export module format {
                export module json {
                    export class JsonFormat implements org.kevoree.modeling.KModelFormat {

                        public static KEY_META: string = "@class";
                        public static KEY_UUID: string = "@uuid";
                        public static KEY_ROOT: string = "@root";
                        private _manager: org.kevoree.modeling.memory.KDataManager;
                        private _universe: number;
                        private _time: number;
                        private static NULL_PARAM_MSG: string = "one parameter is null";
                        constructor(p_universe: number, p_time: number, p_manager: org.kevoree.modeling.memory.KDataManager) {
                            this._manager = p_manager;
                            this._universe = p_universe;
                            this._time = p_time;
                        }

                        public save(model: org.kevoree.modeling.KObject, cb: (p : string) => void): void {
                            if (org.kevoree.modeling.util.Checker.isDefined(model) && org.kevoree.modeling.util.Checker.isDefined(cb)) {
                                org.kevoree.modeling.format.json.JsonModelSerializer.serialize(model, cb);
                            } else {
                                throw new java.lang.RuntimeException(JsonFormat.NULL_PARAM_MSG);
                            }
                        }

                        public saveRoot(cb: (p : string) => void): void {
                            if (org.kevoree.modeling.util.Checker.isDefined(cb)) {
                                this._manager.getRoot(this._universe, this._time,  (root : org.kevoree.modeling.KObject) => {
                                    if (root == null) {
                                        cb(null);
                                    } else {
                                        org.kevoree.modeling.format.json.JsonModelSerializer.serialize(root, cb);
                                    }
                                });
                            }
                        }

                        public load(payload: string, cb: (p : any) => void): void {
                            if (org.kevoree.modeling.util.Checker.isDefined(payload)) {
                                org.kevoree.modeling.format.json.JsonModelLoader.load(this._manager, this._universe, this._time, payload, cb);
                            } else {
                                throw new java.lang.RuntimeException(JsonFormat.NULL_PARAM_MSG);
                            }
                        }

                    }

                    export class JsonModelLoader {

                        public static load(manager: org.kevoree.modeling.memory.KDataManager, universe: number, time: number, payload: string, callback: (p : java.lang.Throwable) => void): void {
                             if (payload == null) {
                             callback(null);
                             } else {
                             var toLoadObj = JSON.parse(payload);
                             var rootElem = [];
                             var mappedKeys: org.kevoree.modeling.memory.struct.map.LongLongHashMap = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(toLoadObj.length, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                             for(var i = 0; i < toLoadObj.length; i++) {
                             var elem = toLoadObj[i];
                             var kid = elem[org.kevoree.modeling.format.json.JsonFormat.KEY_UUID];
                             mappedKeys.put(<number>kid, manager.nextObjectKey());
                             }
                             for(var i = 0; i < toLoadObj.length; i++) {
                             var elemRaw = toLoadObj[i];
                             var elem2 = new org.kevoree.modeling.memory.struct.map.StringHashMap<any>(Object.keys(elemRaw).length, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                             for(var ik in elemRaw){ elem2[ik] = elemRaw[ik]; }
                             try {
                             org.kevoree.modeling.format.json.JsonModelLoader.loadObj(elem2, manager, universe, time, mappedKeys, rootElem);
                             } catch(e){ console.error(e); }
                             }
                             if (rootElem[0] != null) { manager.setRoot(rootElem[0], (throwable : java.lang.Throwable) => { if (callback != null) { callback(throwable); }}); } else { if (callback != null) { callback(null); } }
                             }
                        }

                        private static loadObj(p_param: org.kevoree.modeling.memory.struct.map.StringHashMap<any>, manager: org.kevoree.modeling.memory.KDataManager, universe: number, time: number, p_mappedKeys: org.kevoree.modeling.memory.struct.map.LongLongHashMap, p_rootElem: org.kevoree.modeling.KObject[]): void {
                            var kid: number = java.lang.Long.parseLong(p_param.get(org.kevoree.modeling.format.json.JsonFormat.KEY_UUID).toString());
                            var meta: string = p_param.get(org.kevoree.modeling.format.json.JsonFormat.KEY_META).toString();
                            var metaClass: org.kevoree.modeling.meta.MetaClass = manager.model().metaModel().metaClassByName(meta);
                            var current: org.kevoree.modeling.KObject = (<org.kevoree.modeling.abs.AbstractKModel<any>>manager.model()).createProxy(universe, time, p_mappedKeys.get(kid), metaClass);
                            manager.initKObject(current);
                            var raw: org.kevoree.modeling.memory.KCacheElementSegment = manager.segment(current, org.kevoree.modeling.memory.AccessMode.WRITE);
                            p_param.each( (metaKey : string, payload_content : any) => {
                                if (metaKey.equals(org.kevoree.modeling.format.json.JsonFormat.KEY_ROOT)) {
                                    p_rootElem[0] = current;
                                } else {
                                    var metaElement: org.kevoree.modeling.meta.Meta = metaClass.metaByName(metaKey);
                                    if (payload_content != null) {
                                        if (metaElement != null && metaElement.metaType().equals(org.kevoree.modeling.meta.MetaType.ATTRIBUTE)) {
                                            raw.set(metaElement.index(), (<org.kevoree.modeling.meta.MetaAttribute>metaElement).strategy().load(payload_content.toString(), <org.kevoree.modeling.meta.MetaAttribute>metaElement, time), current.metaClass());
                                        } else {
                                            if (metaElement != null && metaElement instanceof org.kevoree.modeling.abs.AbstractMetaReference) {
                                                try {
                                                    raw.set(metaElement.index(), org.kevoree.modeling.format.json.JsonModelLoader.transposeArr(<java.util.ArrayList<string>>payload_content, p_mappedKeys), current.metaClass());
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
                            });
                        }

                        private static transposeArr(plainRawSet: java.util.ArrayList<string>, p_mappedKeys: org.kevoree.modeling.memory.struct.map.LongLongHashMap): number[] {
                             if (plainRawSet == null) { return null; }
                             var convertedRaw: number[] = new Array();
                             for (var l in plainRawSet) {
                             try {
                             var converted: number = java.lang.Long.parseLong(plainRawSet[l]);
                             if (p_mappedKeys.containsKey(converted)) { converted = p_mappedKeys.get(converted); }
                             convertedRaw[l] = converted;
                             } catch ($ex$) {
                             if ($ex$ instanceof java.lang.Exception) {
                             var e: java.lang.Exception = <java.lang.Exception>$ex$;
                             e.printStackTrace();
                             }
                             }
                             }
                             return convertedRaw;
                        }

                    }

                    export class JsonModelSerializer {

                        public static serialize(model: org.kevoree.modeling.KObject, callback: (p : string) => void): void {
                            (<org.kevoree.modeling.abs.AbstractKObject>model)._manager.getRoot(model.universe(), model.now(),  (rootObj : org.kevoree.modeling.KObject) => {
                                var isRoot: boolean = false;
                                if (rootObj != null) {
                                    isRoot = rootObj.uuid() == model.uuid();
                                }
                                var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                                builder.append("[\n");
                                org.kevoree.modeling.format.json.JsonModelSerializer.printJSON(model, builder, isRoot);
                                model.visit( (elem : org.kevoree.modeling.KObject) => {
                                    var isRoot2: boolean = false;
                                    if (rootObj != null) {
                                        isRoot2 = rootObj.uuid() == elem.uuid();
                                    }
                                    builder.append(",\n");
                                    try {
                                        org.kevoree.modeling.format.json.JsonModelSerializer.printJSON(elem, builder, isRoot2);
                                    } catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                            e.printStackTrace();
                                            builder.append("{}");
                                        }
                                     }
                                    return org.kevoree.modeling.KVisitResult.CONTINUE;
                                },  (throwable : java.lang.Throwable) => {
                                    builder.append("\n]\n");
                                    callback(builder.toString());
                                });
                            });
                        }

                        public static printJSON(elem: org.kevoree.modeling.KObject, builder: java.lang.StringBuilder, isRoot: boolean): void {
                            if (elem != null) {
                                var raw: org.kevoree.modeling.memory.KCacheElementSegment = (<org.kevoree.modeling.abs.AbstractKObject>elem)._manager.segment(elem, org.kevoree.modeling.memory.AccessMode.READ);
                                if (raw != null) {
                                    builder.append(org.kevoree.modeling.memory.manager.JsonRaw.encode(raw, elem.uuid(), elem.metaClass(), isRoot));
                                }
                            }
                        }

                    }

                    export class JsonObjectReader {

                         private readObject:any;
                         public parseObject(payload:string):void {
                         this.readObject = JSON.parse(payload);
                         }
                         public get(name:string):any {
                         return this.readObject[name];
                         }
                         public getAsStringArray(name:string):string[] {
                         return <string[]> this.readObject[name];
                         }
                         public keys():string[] {
                         var keysArr = []
                         for (var key in this.readObject) {
                         keysArr.push(key);
                         }
                         return keysArr;
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

                        public static encode(p_chain: string): string {
                            var sb: java.lang.StringBuilder = new java.lang.StringBuilder();
                            org.kevoree.modeling.format.json.JsonString.encodeBuffer(sb, p_chain);
                            return sb.toString();
                        }

                        public static unescape(p_src: string): string {
                            if (p_src == null) {
                                return null;
                            }
                            if (p_src.length == 0) {
                                return p_src;
                            }
                            var builder: java.lang.StringBuilder = null;
                            var i: number = 0;
                            while (i < p_src.length){
                                var current: string = p_src.charAt(i);
                                if (current == JsonString.ESCAPE_CHAR) {
                                    if (builder == null) {
                                        builder = new java.lang.StringBuilder();
                                        builder.append(p_src.substring(0, i));
                                    }
                                    i++;
                                    var current2: string = p_src.charAt(i);
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
                                return p_src;
                            }
                        }

                    }

                }
                export module xmi {
                    export class SerializationContext {

                        public ignoreGeneratedID: boolean = false;
                        public model: org.kevoree.modeling.KObject;
                        public finishCallback: (p : string) => void;
                        public printer: java.lang.StringBuilder;
                        public attributesVisitor: (p : org.kevoree.modeling.meta.MetaAttribute, p1 : any) => void;
                        public addressTable: org.kevoree.modeling.memory.struct.map.LongHashMap<any> = new org.kevoree.modeling.memory.struct.map.LongHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        public elementsCount: org.kevoree.modeling.memory.struct.map.StringHashMap<any> = new org.kevoree.modeling.memory.struct.map.StringHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        public packageList: java.util.ArrayList<string> = new java.util.ArrayList<string>();
                    }

                    export class XMILoadingContext {

                        public xmiReader: org.kevoree.modeling.format.xmi.XmlParser;
                        public loadedRoots: org.kevoree.modeling.KObject = null;
                        public resolvers: java.util.ArrayList<org.kevoree.modeling.format.xmi.XMIResolveCommand> = new java.util.ArrayList<org.kevoree.modeling.format.xmi.XMIResolveCommand>();
                        public map: org.kevoree.modeling.memory.struct.map.StringHashMap<any> = new org.kevoree.modeling.memory.struct.map.StringHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        public elementsCount: org.kevoree.modeling.memory.struct.map.StringHashMap<any> = new org.kevoree.modeling.memory.struct.map.StringHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        public successCallback: (p : java.lang.Throwable) => void;
                    }

                    export class XMIModelLoader {

                        public static LOADER_XMI_LOCAL_NAME: string = "type";
                        public static LOADER_XMI_XSI: string = "xsi";
                        public static LOADER_XMI_NS_URI: string = "nsURI";
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

                        public static load(manager: org.kevoree.modeling.memory.KDataManager, universe: number, time: number, str: string, callback: (p : java.lang.Throwable) => void): void {
                            var parser: org.kevoree.modeling.format.xmi.XmlParser = new org.kevoree.modeling.format.xmi.XmlParser(str);
                            if (!parser.hasNext()) {
                                callback(null);
                            } else {
                                var context: org.kevoree.modeling.format.xmi.XMILoadingContext = new org.kevoree.modeling.format.xmi.XMILoadingContext();
                                context.successCallback = callback;
                                context.xmiReader = parser;
                                org.kevoree.modeling.format.xmi.XMIModelLoader.deserialize(manager, universe, time, context);
                            }
                        }

                        private static deserialize(manager: org.kevoree.modeling.memory.KDataManager, universe: number, time: number, context: org.kevoree.modeling.format.xmi.XMILoadingContext): void {
                            try {
                                var nsURI: string;
                                var reader: org.kevoree.modeling.format.xmi.XmlParser = context.xmiReader;
                                while (reader.hasNext()){
                                    var nextTag: org.kevoree.modeling.format.xmi.XmlToken = reader.next();
                                    if (nextTag.equals(org.kevoree.modeling.format.xmi.XmlToken.START_TAG)) {
                                        var localName: string = reader.getLocalName();
                                        if (localName != null) {
                                            var ns: org.kevoree.modeling.memory.struct.map.StringHashMap<any> = new org.kevoree.modeling.memory.struct.map.StringHashMap<any>(reader.getAttributeCount(), org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
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
                                            context.loadedRoots = org.kevoree.modeling.format.xmi.XMIModelLoader.loadObject(manager, universe, time, context, "/", xsiType + "." + localName);
                                        }
                                    }
                                }
                                for (var i: number = 0; i < context.resolvers.size(); i++) {
                                    context.resolvers.get(i).run();
                                }
                                manager.setRoot(context.loadedRoots, null);
                                context.successCallback(null);
                            } catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                    context.successCallback(e);
                                }
                             }
                        }

                        private static callFactory(manager: org.kevoree.modeling.memory.KDataManager, universe: number, time: number, ctx: org.kevoree.modeling.format.xmi.XMILoadingContext, objectType: string): org.kevoree.modeling.KObject {
                            var modelElem: org.kevoree.modeling.KObject = null;
                            if (objectType != null) {
                                modelElem = manager.model().createByName(objectType, universe, time);
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
                                        modelElem = manager.model().createByName(realTypeName + "." + realName, universe, time);
                                    }
                                }
                            } else {
                                modelElem = manager.model().createByName(ctx.xmiReader.getLocalName(), universe, time);
                            }
                            return modelElem;
                        }

                        private static loadObject(manager: org.kevoree.modeling.memory.KDataManager, universe: number, time: number, ctx: org.kevoree.modeling.format.xmi.XMILoadingContext, xmiAddress: string, objectType: string): org.kevoree.modeling.KObject {
                            var elementTagName: string = ctx.xmiReader.getLocalName();
                            var modelElem: org.kevoree.modeling.KObject = org.kevoree.modeling.format.xmi.XMIModelLoader.callFactory(manager, universe, time, ctx, objectType);
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
                                        var metaElement: org.kevoree.modeling.meta.Meta = modelElem.metaClass().metaByName(attrName);
                                        if (metaElement != null && metaElement.metaType().equals(org.kevoree.modeling.meta.MetaType.ATTRIBUTE)) {
                                            modelElem.set(<org.kevoree.modeling.meta.MetaAttribute>metaElement, org.kevoree.modeling.format.xmi.XMIModelLoader.unescapeXml(valueAtt));
                                        } else {
                                            if (metaElement != null && metaElement instanceof org.kevoree.modeling.abs.AbstractMetaReference) {
                                                var referenceArray: string[] = valueAtt.split(" ");
                                                for (var j: number = 0; j < referenceArray.length; j++) {
                                                    var xmiRef: string = referenceArray[j];
                                                    var adjustedRef: string = (xmiRef.startsWith("#") ? xmiRef.substring(1) : xmiRef);
                                                    adjustedRef = adjustedRef.replace(".0", "");
                                                    var ref: org.kevoree.modeling.KObject = ctx.map.get(adjustedRef);
                                                    if (ref != null) {
                                                        modelElem.mutate(org.kevoree.modeling.KActionType.ADD, <org.kevoree.modeling.meta.MetaReference>metaElement, ref);
                                                    } else {
                                                        ctx.resolvers.add(new org.kevoree.modeling.format.xmi.XMIResolveCommand(ctx, modelElem, org.kevoree.modeling.KActionType.ADD, attrName, adjustedRef));
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
                                    var tok: org.kevoree.modeling.format.xmi.XmlToken = ctx.xmiReader.next();
                                    if (tok.equals(org.kevoree.modeling.format.xmi.XmlToken.START_TAG)) {
                                        var subElemName: string = ctx.xmiReader.getLocalName();
                                        var key: string = xmiAddress + "/@" + subElemName;
                                        var i: number = ctx.elementsCount.get(key);
                                        if (i == null) {
                                            i = 0;
                                            ctx.elementsCount.put(key, i);
                                        }
                                        var subElementId: string = xmiAddress + "/@" + subElemName + (i != 0 ? "." + i : "");
                                        var containedElement: org.kevoree.modeling.KObject = org.kevoree.modeling.format.xmi.XMIModelLoader.loadObject(manager, universe, time, ctx, subElementId, subElemName);
                                        modelElem.mutate(org.kevoree.modeling.KActionType.ADD, <org.kevoree.modeling.meta.MetaReference>modelElem.metaClass().metaByName(subElemName), containedElement);
                                        ctx.elementsCount.put(xmiAddress + "/@" + subElemName, i + 1);
                                    } else {
                                        if (tok.equals(org.kevoree.modeling.format.xmi.XmlToken.END_TAG)) {
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

                        public static save(model: org.kevoree.modeling.KObject, callback: (p : string) => void): void {
                            callback(null);
                        }

                    }

                    export class XMIResolveCommand {

                        private context: org.kevoree.modeling.format.xmi.XMILoadingContext;
                        private target: org.kevoree.modeling.KObject;
                        private mutatorType: org.kevoree.modeling.KActionType;
                        private refName: string;
                        private ref: string;
                        constructor(context: org.kevoree.modeling.format.xmi.XMILoadingContext, target: org.kevoree.modeling.KObject, mutatorType: org.kevoree.modeling.KActionType, refName: string, ref: string) {
                            this.context = context;
                            this.target = target;
                            this.mutatorType = mutatorType;
                            this.refName = refName;
                            this.ref = ref;
                        }

                        public run(): void {
                            var referencedElement: org.kevoree.modeling.KObject = this.context.map.get(this.ref);
                            if (referencedElement != null) {
                                this.target.mutate(this.mutatorType, <org.kevoree.modeling.meta.MetaReference>this.target.metaClass().metaByName(this.refName), referencedElement);
                                return;
                            }
                            referencedElement = this.context.map.get("/");
                            if (referencedElement != null) {
                                this.target.mutate(this.mutatorType, <org.kevoree.modeling.meta.MetaReference>this.target.metaClass().metaByName(this.refName), referencedElement);
                                return;
                            }
                            throw new java.lang.Exception("KMF Load error : reference " + this.ref + " not found in map when trying to  " + this.mutatorType + " " + this.refName + "  on " + this.target.metaClass().metaName() + "(uuid:" + this.target.uuid() + ")");
                        }

                    }

                    export class XmiFormat implements org.kevoree.modeling.KModelFormat {

                        private _manager: org.kevoree.modeling.memory.KDataManager;
                        private _universe: number;
                        private _time: number;
                        constructor(p_universe: number, p_time: number, p_manager: org.kevoree.modeling.memory.KDataManager) {
                            this._universe = p_universe;
                            this._time = p_time;
                            this._manager = p_manager;
                        }

                        public save(model: org.kevoree.modeling.KObject, cb: (p : string) => void): void {
                            org.kevoree.modeling.format.xmi.XMIModelSerializer.save(model, cb);
                        }

                        public saveRoot(cb: (p : string) => void): void {
                            this._manager.getRoot(this._universe, this._time,  (root : org.kevoree.modeling.KObject) => {
                                if (root == null) {
                                    if (cb != null) {
                                        cb(null);
                                    }
                                } else {
                                    org.kevoree.modeling.format.xmi.XMIModelSerializer.save(root, cb);
                                }
                            });
                        }

                        public load(payload: string, cb: (p : any) => void): void {
                            org.kevoree.modeling.format.xmi.XMIModelLoader.load(this._manager, this._universe, this._time, payload, cb);
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

                        public next(): org.kevoree.modeling.format.xmi.XmlToken {
                            if (this.readSingleton) {
                                this.readSingleton = false;
                                return org.kevoree.modeling.format.xmi.XmlToken.END_TAG;
                            }
                            if (!this.hasNext()) {
                                return org.kevoree.modeling.format.xmi.XmlToken.END_DOCUMENT;
                            }
                            this.attributesNames.clear();
                            this.attributesPrefixes.clear();
                            this.attributesValues.clear();
                            this.read_lessThan();
                            this.currentChar = this.readChar();
                            if (this.currentChar == '?') {
                                this.currentChar = this.readChar();
                                this.read_xmlHeader();
                                return org.kevoree.modeling.format.xmi.XmlToken.XML_HEADER;
                            } else {
                                if (this.currentChar == '!') {
                                    do {
                                        this.currentChar = this.readChar();
                                    } while (this.currentChar != '>')
                                    return org.kevoree.modeling.format.xmi.XmlToken.COMMENT;
                                } else {
                                    if (this.currentChar == '/') {
                                        this.currentChar = this.readChar();
                                        this.read_closingTag();
                                        return org.kevoree.modeling.format.xmi.XmlToken.END_TAG;
                                    } else {
                                        this.read_openTag();
                                        if (this.currentChar == '/') {
                                            this.read_upperThan();
                                            this.readSingleton = true;
                                        }
                                        return org.kevoree.modeling.format.xmi.XmlToken.START_TAG;
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
            export module infer {
                export class AnalyticKInfer extends org.kevoree.modeling.abs.AbstractKObjectInfer {

                    constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.MetaClass, p_manager: org.kevoree.modeling.memory.KDataManager) {
                        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
                    }

                    public train(trainingSet: any[][], expectedResultSet: any[], callback: (p : java.lang.Throwable) => void): void {
                        var currentState: org.kevoree.modeling.infer.states.AnalyticKInferState = <org.kevoree.modeling.infer.states.AnalyticKInferState>this.modifyState();
                        for (var i: number = 0; i < expectedResultSet.length; i++) {
                            var value: number = java.lang.Double.parseDouble(expectedResultSet[i].toString());
                            currentState.train(value);
                        }
                    }

                    public infer(features: any[]): any {
                        var currentState: org.kevoree.modeling.infer.states.AnalyticKInferState = <org.kevoree.modeling.infer.states.AnalyticKInferState>this.readOnlyState();
                        return currentState.getAverage();
                    }

                    public accuracy(testSet: any[][], expectedResultSet: any[]): any {
                        return null;
                    }

                    public clear(): void {
                        var currentState: org.kevoree.modeling.infer.states.AnalyticKInferState = <org.kevoree.modeling.infer.states.AnalyticKInferState>this.modifyState();
                        currentState.clear();
                    }

                    public createEmptyState(): org.kevoree.modeling.KInferState {
                        return new org.kevoree.modeling.infer.states.AnalyticKInferState();
                    }

                }

                export class GaussianClassificationKInfer extends org.kevoree.modeling.abs.AbstractKObjectInfer {

                    private alpha: number = 0.05;
                    constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.MetaClass, p_manager: org.kevoree.modeling.memory.KDataManager) {
                        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
                    }

                    public getAlpha(): number {
                        return this.alpha;
                    }

                    public setAlpha(alpha: number): void {
                        this.alpha = alpha;
                    }

                    public train(trainingSet: any[][], expectedResultSet: any[], callback: (p : java.lang.Throwable) => void): void {
                        var currentState: org.kevoree.modeling.infer.states.GaussianArrayKInferState = <org.kevoree.modeling.infer.states.GaussianArrayKInferState>this.modifyState();
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
                        var currentState: org.kevoree.modeling.infer.states.GaussianArrayKInferState = <org.kevoree.modeling.infer.states.GaussianArrayKInferState>this.readOnlyState();
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

                    public createEmptyState(): org.kevoree.modeling.KInferState {
                        return null;
                    }

                }

                export class LinearRegressionKInfer extends org.kevoree.modeling.abs.AbstractKObjectInfer {

                    private alpha: number = 0.0001;
                    private iterations: number = 100;
                    constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.MetaClass, p_manager: org.kevoree.modeling.memory.KDataManager) {
                        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
                    }

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

                    private calculate(weights: number[], features: number[]): number {
                        var result: number = 0;
                        for (var i: number = 0; i < features.length; i++) {
                            result += weights[i] * features[i];
                        }
                        result += weights[features.length];
                        return result;
                    }

                    public train(trainingSet: any[][], expectedResultSet: any[], callback: (p : java.lang.Throwable) => void): void {
                        var currentState: org.kevoree.modeling.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.infer.states.DoubleArrayKInferState>this.modifyState();
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
                        var currentState: org.kevoree.modeling.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.infer.states.DoubleArrayKInferState>this.readOnlyState();
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
                        var currentState: org.kevoree.modeling.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.infer.states.DoubleArrayKInferState>this.modifyState();
                        currentState.setWeights(null);
                    }

                    public createEmptyState(): org.kevoree.modeling.KInferState {
                        return new org.kevoree.modeling.infer.states.DoubleArrayKInferState();
                    }

                }

                export class PerceptronClassificationKInfer extends org.kevoree.modeling.abs.AbstractKObjectInfer {

                    private alpha: number = 0.001;
                    private iterations: number = 100;
                    constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.MetaClass, p_manager: org.kevoree.modeling.memory.KDataManager) {
                        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
                    }

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
                        var currentState: org.kevoree.modeling.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.infer.states.DoubleArrayKInferState>this.modifyState();
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
                        var currentState: org.kevoree.modeling.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.infer.states.DoubleArrayKInferState>this.readOnlyState();
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
                        var currentState: org.kevoree.modeling.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.infer.states.DoubleArrayKInferState>this.modifyState();
                        currentState.setWeights(null);
                    }

                    public createEmptyState(): org.kevoree.modeling.KInferState {
                        return new org.kevoree.modeling.infer.states.DoubleArrayKInferState();
                    }

                }

                export class PolynomialOfflineKInfer extends org.kevoree.modeling.abs.AbstractKObjectInfer {

                    public maxDegree: number = 20;
                    public toleratedErr: number = 0.01;
                    constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.MetaClass, p_manager: org.kevoree.modeling.memory.KDataManager) {
                        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
                    }

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
                        var currentState: org.kevoree.modeling.infer.states.PolynomialKInferState = <org.kevoree.modeling.infer.states.PolynomialKInferState>this.modifyState();
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
                            var pf: org.kevoree.modeling.extrapolation.polynomial.util.PolynomialFitEjml = new org.kevoree.modeling.extrapolation.polynomial.util.PolynomialFitEjml(deg);
                            pf.fit(normalizedTimes, results);
                            if (org.kevoree.modeling.infer.states.PolynomialKInferState.maxError(pf.getCoef(), normalizedTimes, results) <= this.toleratedErr) {
                                currentState.setUnit(unit);
                                currentState.setTimeOrigin(timeOrigin);
                                currentState.setWeights(pf.getCoef());
                                return;
                            }
                        }
                    }

                    public infer(features: any[]): any {
                        var currentState: org.kevoree.modeling.infer.states.PolynomialKInferState = <org.kevoree.modeling.infer.states.PolynomialKInferState>this.readOnlyState();
                        var time: number = <number>features[0];
                        return currentState.infer(time);
                    }

                    public accuracy(testSet: any[][], expectedResultSet: any[]): any {
                        return null;
                    }

                    public clear(): void {
                        var currentState: org.kevoree.modeling.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.infer.states.DoubleArrayKInferState>this.modifyState();
                        currentState.setWeights(null);
                    }

                    public createEmptyState(): org.kevoree.modeling.KInferState {
                        return new org.kevoree.modeling.infer.states.DoubleArrayKInferState();
                    }

                }

                export class PolynomialOnlineKInfer extends org.kevoree.modeling.abs.AbstractKObjectInfer {

                    public maxDegree: number = 20;
                    public toleratedErr: number = 0.01;
                    constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.MetaClass, p_manager: org.kevoree.modeling.memory.KDataManager) {
                        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
                    }

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
                        var currentState: org.kevoree.modeling.infer.states.PolynomialKInferState = <org.kevoree.modeling.infer.states.PolynomialKInferState>this.modifyState();
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
                            var pf: org.kevoree.modeling.extrapolation.polynomial.util.PolynomialFitEjml = new org.kevoree.modeling.extrapolation.polynomial.util.PolynomialFitEjml(deg);
                            pf.fit(normalizedTimes, results);
                            if (org.kevoree.modeling.infer.states.PolynomialKInferState.maxError(pf.getCoef(), normalizedTimes, results) <= this.toleratedErr) {
                                currentState.setUnit(unit);
                                currentState.setTimeOrigin(timeOrigin);
                                currentState.setWeights(pf.getCoef());
                                return;
                            }
                        }
                    }

                    public infer(features: any[]): any {
                        var currentState: org.kevoree.modeling.infer.states.PolynomialKInferState = <org.kevoree.modeling.infer.states.PolynomialKInferState>this.readOnlyState();
                        var time: number = <number>features[0];
                        return currentState.infer(time);
                    }

                    public accuracy(testSet: any[][], expectedResultSet: any[]): any {
                        return null;
                    }

                    public clear(): void {
                        var currentState: org.kevoree.modeling.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.infer.states.DoubleArrayKInferState>this.modifyState();
                        currentState.setWeights(null);
                    }

                    public createEmptyState(): org.kevoree.modeling.KInferState {
                        return new org.kevoree.modeling.infer.states.DoubleArrayKInferState();
                    }

                }

                export class WinnowClassificationKInfer extends org.kevoree.modeling.abs.AbstractKObjectInfer {

                    private alpha: number = 2;
                    private beta: number = 2;
                    constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.MetaClass, p_manager: org.kevoree.modeling.memory.KDataManager) {
                        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
                    }

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
                        var currentState: org.kevoree.modeling.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.infer.states.DoubleArrayKInferState>this.modifyState();
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
                        var currentState: org.kevoree.modeling.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.infer.states.DoubleArrayKInferState>this.readOnlyState();
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
                        var currentState: org.kevoree.modeling.infer.states.DoubleArrayKInferState = <org.kevoree.modeling.infer.states.DoubleArrayKInferState>this.modifyState();
                        currentState.setWeights(null);
                    }

                    public createEmptyState(): org.kevoree.modeling.KInferState {
                        return new org.kevoree.modeling.infer.states.DoubleArrayKInferState();
                    }

                }

                export module states {
                    export class AnalyticKInferState extends org.kevoree.modeling.KInferState {

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

                        public cloneState(): org.kevoree.modeling.KInferState {
                            var cloned: org.kevoree.modeling.infer.states.AnalyticKInferState = new org.kevoree.modeling.infer.states.AnalyticKInferState();
                            cloned.setSumSquares(this.getSumSquares());
                            cloned.setNb(this.getNb());
                            cloned.setSum(this.getSum());
                            cloned.setMax(this.getMax());
                            cloned.setMin(this.getMin());
                            return cloned;
                        }

                    }

                    export class BayesianClassificationState extends org.kevoree.modeling.KInferState {

                        private states: org.kevoree.modeling.infer.states.Bayesian.BayesianSubstate[][];
                        private classStats: org.kevoree.modeling.infer.states.Bayesian.EnumSubstate;
                        private numOfFeatures: number;
                        private numOfClasses: number;
                        private static stateSep: string = "/";
                        private static interStateSep: string = "|";
                        public initialize(metaFeatures: any[], MetaClassification: any): void {
                            this.numOfFeatures = metaFeatures.length;
                            this.numOfClasses = 0;
                            this.states = new Array(new Array());
                            this.classStats = new org.kevoree.modeling.infer.states.Bayesian.EnumSubstate();
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
                                        this.states[i][j] = new org.kevoree.modeling.infer.states.Bayesian.EnumSubstate();
                                    } else {
                                        if (s.equals("GaussianSubState")) {
                                            this.states[i][j] = new org.kevoree.modeling.infer.states.Bayesian.GaussianSubState();
                                        }
                                    }
                                    s = st[counter].substring(s.length + 1);
                                    this.states[i][j].load(s, BayesianClassificationState.stateSep);
                                    counter++;
                                }
                            }
                            var s: string = st[counter].split(BayesianClassificationState.stateSep)[0];
                            s = st[counter].substring(s.length + 1);
                            this.classStats = new org.kevoree.modeling.infer.states.Bayesian.EnumSubstate();
                            this.classStats.load(s, BayesianClassificationState.stateSep);
                        }

                        public isDirty(): boolean {
                            return false;
                        }

                        public cloneState(): org.kevoree.modeling.KInferState {
                            return null;
                        }

                    }

                    export class DoubleArrayKInferState extends org.kevoree.modeling.KInferState {

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

                        public cloneState(): org.kevoree.modeling.KInferState {
                            var cloned: org.kevoree.modeling.infer.states.DoubleArrayKInferState = new org.kevoree.modeling.infer.states.DoubleArrayKInferState();
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

                    export class GaussianArrayKInferState extends org.kevoree.modeling.KInferState {

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

                        public cloneState(): org.kevoree.modeling.KInferState {
                            var cloned: org.kevoree.modeling.infer.states.GaussianArrayKInferState = new org.kevoree.modeling.infer.states.GaussianArrayKInferState();
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

                    export class PolynomialKInferState extends org.kevoree.modeling.KInferState {

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
                                var val: number = org.kevoree.modeling.infer.states.PolynomialKInferState.internal_extrapolate(normalizedTimes[i], coef);
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

                        public cloneState(): org.kevoree.modeling.KInferState {
                            var cloned: org.kevoree.modeling.infer.states.PolynomialKInferState = new org.kevoree.modeling.infer.states.PolynomialKInferState();
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
                            return org.kevoree.modeling.infer.states.PolynomialKInferState.internal_extrapolate(t, this.weights);
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

                            public cloneState(): org.kevoree.modeling.infer.states.Bayesian.BayesianSubstate {
                                throw "Abstract method";
                            }

                        }

                        export class EnumSubstate extends org.kevoree.modeling.infer.states.Bayesian.BayesianSubstate {

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

                            public cloneState(): org.kevoree.modeling.infer.states.Bayesian.BayesianSubstate {
                                var cloned: org.kevoree.modeling.infer.states.Bayesian.EnumSubstate = new org.kevoree.modeling.infer.states.Bayesian.EnumSubstate();
                                var newCounter: number[] = new Array();
                                for (var i: number = 0; i < this.counter.length; i++) {
                                    newCounter[i] = this.counter[i];
                                }
                                cloned.setCounter(newCounter);
                                cloned.setTotal(this.total);
                                return cloned;
                            }

                        }

                        export class GaussianSubState extends org.kevoree.modeling.infer.states.Bayesian.BayesianSubstate {

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

                            public cloneState(): org.kevoree.modeling.infer.states.Bayesian.BayesianSubstate {
                                var cloned: org.kevoree.modeling.infer.states.Bayesian.GaussianSubState = new org.kevoree.modeling.infer.states.Bayesian.GaussianSubState();
                                cloned.setNb(this.getNb());
                                cloned.setSum(this.getSum());
                                cloned.setSumSquares(this.getSumSquares());
                                return cloned;
                            }

                        }

                    }
                }
            }
            export module memory {
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

                export interface KCache {

                    get(universe: number, time: number, obj: number): org.kevoree.modeling.memory.KCacheElement;

                    put(universe: number, time: number, obj: number, payload: org.kevoree.modeling.memory.KCacheElement): void;

                    dirties(): org.kevoree.modeling.memory.cache.KCacheDirty[];

                    clear(metaModel: org.kevoree.modeling.meta.MetaModel): void;

                    clean(metaModel: org.kevoree.modeling.meta.MetaModel): void;

                    monitor(origin: org.kevoree.modeling.KObject): void;

                    size(): number;

                }

                export interface KCacheElement {

                    isDirty(): boolean;

                    serialize(metaModel: org.kevoree.modeling.meta.MetaModel): string;

                    setClean(metaModel: org.kevoree.modeling.meta.MetaModel): void;

                    setDirty(): void;

                    unserialize(key: org.kevoree.modeling.memory.KContentKey, payload: string, metaModel: org.kevoree.modeling.meta.MetaModel): void;

                    counter(): number;

                    inc(): void;

                    dec(): void;

                    free(metaModel: org.kevoree.modeling.meta.MetaModel): void;

                }

                export interface KCacheElementSegment extends org.kevoree.modeling.memory.KCacheElement {

                    clone(newtimeOrigin: number, metaClass: org.kevoree.modeling.meta.MetaClass): org.kevoree.modeling.memory.KCacheElementSegment;

                    set(index: number, content: any, metaClass: org.kevoree.modeling.meta.MetaClass): void;

                    get(index: number, metaClass: org.kevoree.modeling.meta.MetaClass): any;

                    getRef(index: number, metaClass: org.kevoree.modeling.meta.MetaClass): number[];

                    addRef(index: number, newRef: number, metaClass: org.kevoree.modeling.meta.MetaClass): boolean;

                    removeRef(index: number, previousRef: number, metaClass: org.kevoree.modeling.meta.MetaClass): boolean;

                    getInfer(index: number, metaClass: org.kevoree.modeling.meta.MetaClass): number[];

                    getInferElem(index: number, arrayIndex: number, metaClass: org.kevoree.modeling.meta.MetaClass): number;

                    setInferElem(index: number, arrayIndex: number, valueToInsert: number, metaClass: org.kevoree.modeling.meta.MetaClass): void;

                    extendInfer(index: number, newSize: number, metaClass: org.kevoree.modeling.meta.MetaClass): void;

                    modifiedIndexes(metaClass: org.kevoree.modeling.meta.MetaClass): number[];

                    init(metaClass: org.kevoree.modeling.meta.MetaClass): void;

                    metaClassIndex(): number;

                    originTime(): number;

                }

                export interface KContentDeliveryDriver {

                    get(keys: org.kevoree.modeling.memory.KContentKey[], callback: (p : string[], p1 : java.lang.Throwable) => void): void;

                    atomicGetIncrement(key: org.kevoree.modeling.memory.KContentKey, cb: (p : number, p1 : java.lang.Throwable) => void): void;

                    put(request: org.kevoree.modeling.memory.cdn.KContentPutRequest, error: (p : java.lang.Throwable) => void): void;

                    remove(keys: string[], error: (p : java.lang.Throwable) => void): void;

                    connect(callback: (p : java.lang.Throwable) => void): void;

                    close(callback: (p : java.lang.Throwable) => void): void;

                    registerListener(groupId: number, origin: org.kevoree.modeling.KObject, listener: (p : org.kevoree.modeling.KObject, p1 : org.kevoree.modeling.meta.Meta[]) => void): void;

                    registerMultiListener(groupId: number, origin: org.kevoree.modeling.KUniverse<any, any, any>, objects: number[], listener: (p : org.kevoree.modeling.KObject[]) => void): void;

                    unregisterGroup(groupId: number): void;

                    send(msgs: org.kevoree.modeling.msg.KMessage): void;

                    setManager(manager: org.kevoree.modeling.memory.KDataManager): void;

                }

                export class KContentKey {

                    public universe: number;
                    public time: number;
                    public obj: number;
                    constructor(p_universeID: number, p_timeID: number, p_objID: number) {
                        this.universe = p_universeID;
                        this.time = p_timeID;
                        this.obj = p_objID;
                    }

                    public static createUniverseTree(p_objectID: number): org.kevoree.modeling.memory.KContentKey {
                        return new org.kevoree.modeling.memory.KContentKey(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, p_objectID);
                    }

                    public static createTimeTree(p_universeID: number, p_objectID: number): org.kevoree.modeling.memory.KContentKey {
                        return new org.kevoree.modeling.memory.KContentKey(p_universeID, org.kevoree.modeling.KConfig.NULL_LONG, p_objectID);
                    }

                    public static createObject(p_universeID: number, p_quantaID: number, p_objectID: number): org.kevoree.modeling.memory.KContentKey {
                        return new org.kevoree.modeling.memory.KContentKey(p_universeID, p_quantaID, p_objectID);
                    }

                    public static createGlobalUniverseTree(): org.kevoree.modeling.memory.KContentKey {
                        return new org.kevoree.modeling.memory.KContentKey(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG);
                    }

                    public static createRootUniverseTree(): org.kevoree.modeling.memory.KContentKey {
                        return new org.kevoree.modeling.memory.KContentKey(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.END_OF_TIME);
                    }

                    public static createRootTimeTree(universeID: number): org.kevoree.modeling.memory.KContentKey {
                        return new org.kevoree.modeling.memory.KContentKey(universeID, org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.END_OF_TIME);
                    }

                    public static createLastPrefix(): org.kevoree.modeling.memory.KContentKey {
                        return new org.kevoree.modeling.memory.KContentKey(org.kevoree.modeling.KConfig.END_OF_TIME, org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG);
                    }

                    public static createLastObjectIndexFromPrefix(prefix: number): org.kevoree.modeling.memory.KContentKey {
                        return new org.kevoree.modeling.memory.KContentKey(org.kevoree.modeling.KConfig.END_OF_TIME, org.kevoree.modeling.KConfig.NULL_LONG, java.lang.Long.parseLong(prefix.toString()));
                    }

                    public static createLastUniverseIndexFromPrefix(prefix: number): org.kevoree.modeling.memory.KContentKey {
                        return new org.kevoree.modeling.memory.KContentKey(org.kevoree.modeling.KConfig.END_OF_TIME, org.kevoree.modeling.KConfig.NULL_LONG, java.lang.Long.parseLong(prefix.toString()));
                    }

                    public static create(payload: string): org.kevoree.modeling.memory.KContentKey {
                        if (payload == null || payload.length == 0) {
                            return null;
                        } else {
                            var temp: number[] = new Array();
                            for (var i: number = 0; i < org.kevoree.modeling.KConfig.KEY_SIZE; i++) {
                                temp[i] = org.kevoree.modeling.KConfig.NULL_LONG;
                            }
                            var maxRead: number = payload.length;
                            var indexStartElem: number = -1;
                            var indexElem: number = 0;
                            for (var i: number = 0; i < maxRead; i++) {
                                if (payload.charAt(i) == org.kevoree.modeling.KConfig.KEY_SEP) {
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
                            return new org.kevoree.modeling.memory.KContentKey(temp[0], temp[1], temp[2]);
                        }
                    }

                    public toString(): string {
                        var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                        if (this.universe != org.kevoree.modeling.KConfig.NULL_LONG) {
                            buffer.append(this.universe);
                        }
                        buffer.append(org.kevoree.modeling.KConfig.KEY_SEP);
                        if (this.time != org.kevoree.modeling.KConfig.NULL_LONG) {
                            buffer.append(this.time);
                        }
                        buffer.append(org.kevoree.modeling.KConfig.KEY_SEP);
                        if (this.obj != org.kevoree.modeling.KConfig.NULL_LONG) {
                            buffer.append(this.obj);
                        }
                        return buffer.toString();
                    }

                    public equals(param: any): boolean {
                        if (param instanceof org.kevoree.modeling.memory.KContentKey) {
                            var remote: org.kevoree.modeling.memory.KContentKey = <org.kevoree.modeling.memory.KContentKey>param;
                            return remote.universe == this.universe && remote.time == this.time && remote.obj == this.obj;
                        } else {
                            return false;
                        }
                    }

                }

                export interface KDataManager {

                    cdn(): org.kevoree.modeling.memory.KContentDeliveryDriver;

                    model(): org.kevoree.modeling.KModel<any>;

                    cache(): org.kevoree.modeling.memory.KCache;

                    lookup(universe: number, time: number, uuid: number, callback: (p : org.kevoree.modeling.KObject) => void): void;

                    lookupAllobjects(universe: number, time: number, uuid: number[], callback: (p : org.kevoree.modeling.KObject[]) => void): void;

                    lookupAlltimes(universe: number, time: number[], uuid: number, callback: (p : org.kevoree.modeling.KObject[]) => void): void;

                    segment(origin: org.kevoree.modeling.KObject, accessMode: org.kevoree.modeling.memory.AccessMode): org.kevoree.modeling.memory.KCacheElementSegment;

                    save(callback: (p : java.lang.Throwable) => void): void;

                    discard(universe: org.kevoree.modeling.KUniverse<any, any, any>, callback: (p : java.lang.Throwable) => void): void;

                    delete(universe: org.kevoree.modeling.KUniverse<any, any, any>, callback: (p : java.lang.Throwable) => void): void;

                    initKObject(obj: org.kevoree.modeling.KObject): void;

                    initUniverse(universe: org.kevoree.modeling.KUniverse<any, any, any>, parent: org.kevoree.modeling.KUniverse<any, any, any>): void;

                    nextUniverseKey(): number;

                    nextObjectKey(): number;

                    nextModelKey(): number;

                    nextGroupKey(): number;

                    getRoot(universe: number, time: number, callback: (p : org.kevoree.modeling.KObject) => void): void;

                    setRoot(newRoot: org.kevoree.modeling.KObject, callback: (p : java.lang.Throwable) => void): void;

                    setContentDeliveryDriver(driver: org.kevoree.modeling.memory.KContentDeliveryDriver): void;

                    setScheduler(scheduler: org.kevoree.modeling.KScheduler): void;

                    operationManager(): org.kevoree.modeling.util.KOperationManager;

                    connect(callback: (p : java.lang.Throwable) => void): void;

                    close(callback: (p : java.lang.Throwable) => void): void;

                    parentUniverseKey(currentUniverseKey: number): number;

                    descendantsUniverseKeys(currentUniverseKey: number): number[];

                    reload(keys: org.kevoree.modeling.memory.KContentKey[], callback: (p : java.lang.Throwable) => void): void;

                    cleanCache(): void;

                }

                export module cache {
                    export class HashMemoryCache implements org.kevoree.modeling.memory.KCache {

                        private elementData: org.kevoree.modeling.memory.cache.HashMemoryCache.Entry[];
                        private elementCount: number;
                        private elementDataSize: number;
                        private loadFactor: number;
                        private initalCapacity: number;
                        private threshold: number;
                        public get(universe: number, time: number, obj: number): org.kevoree.modeling.memory.KCacheElement {
                            if (this.elementDataSize == 0) {
                                return null;
                            }
                            var index: number = ((<number>(universe ^ time ^ obj)) & 0x7FFFFFFF) % this.elementDataSize;
                            var m: org.kevoree.modeling.memory.cache.HashMemoryCache.Entry = this.elementData[index];
                            while (m != null){
                                if (m.universe == universe && m.time == time && m.obj == obj) {
                                    return m.value;
                                }
                                m = m.next;
                            }
                            return null;
                        }

                        public put(universe: number, time: number, obj: number, payload: org.kevoree.modeling.memory.KCacheElement): void {
                            var entry: org.kevoree.modeling.memory.cache.HashMemoryCache.Entry = null;
                            var hash: number = <number>(universe ^ time ^ obj);
                            var index: number = (hash & 0x7FFFFFFF) % this.elementDataSize;
                            if (this.elementDataSize != 0) {
                                var m: org.kevoree.modeling.memory.cache.HashMemoryCache.Entry = this.elementData[index];
                                while (m != null){
                                    if (m.universe == universe && m.time == time && m.obj == obj) {
                                        entry = m;
                                        break;
                                    }
                                    m = m.next;
                                }
                            }
                            if (entry == null) {
                                entry = this.complex_insert(index, hash, universe, time, obj);
                            }
                            entry.value = payload;
                        }

                        private complex_insert(previousIndex: number, hash: number, universe: number, time: number, obj: number): org.kevoree.modeling.memory.cache.HashMemoryCache.Entry {
                            var index: number = previousIndex;
                            if (++this.elementCount > this.threshold) {
                                var length: number = (this.elementDataSize == 0 ? 1 : this.elementDataSize << 1);
                                var newData: org.kevoree.modeling.memory.cache.HashMemoryCache.Entry[] = new Array();
                                for (var i: number = 0; i < this.elementDataSize; i++) {
                                    var entry: org.kevoree.modeling.memory.cache.HashMemoryCache.Entry = this.elementData[i];
                                    while (entry != null){
                                        index = (<number>(entry.universe ^ entry.time ^ entry.obj) & 0x7FFFFFFF) % length;
                                        var next: org.kevoree.modeling.memory.cache.HashMemoryCache.Entry = entry.next;
                                        entry.next = newData[index];
                                        newData[index] = entry;
                                        entry = next;
                                    }
                                }
                                this.elementData = newData;
                                this.elementDataSize = length;
                                this.threshold = <number>(this.elementDataSize * this.loadFactor);
                                index = (hash & 0x7FFFFFFF) % this.elementDataSize;
                            }
                            var entry: org.kevoree.modeling.memory.cache.HashMemoryCache.Entry = new org.kevoree.modeling.memory.cache.HashMemoryCache.Entry();
                            entry.universe = universe;
                            entry.time = time;
                            entry.obj = obj;
                            entry.next = this.elementData[index];
                            this.elementData[index] = entry;
                            return entry;
                        }

                        public dirties(): org.kevoree.modeling.memory.cache.KCacheDirty[] {
                            var nbDirties: number = 0;
                            for (var i: number = 0; i < this.elementDataSize; i++) {
                                if (this.elementData[i] != null) {
                                    var current: org.kevoree.modeling.memory.cache.HashMemoryCache.Entry = this.elementData[i];
                                    if (this.elementData[i].value.isDirty()) {
                                        nbDirties++;
                                    }
                                    while (current.next != null){
                                        current = current.next;
                                        if (current.value.isDirty()) {
                                            nbDirties++;
                                        }
                                    }
                                }
                            }
                            var collectedDirties: org.kevoree.modeling.memory.cache.KCacheDirty[] = new Array();
                            nbDirties = 0;
                            for (var i: number = 0; i < this.elementDataSize; i++) {
                                if (nbDirties < collectedDirties.length) {
                                    if (this.elementData[i] != null) {
                                        var current: org.kevoree.modeling.memory.cache.HashMemoryCache.Entry = this.elementData[i];
                                        if (this.elementData[i].value.isDirty()) {
                                            var dirty: org.kevoree.modeling.memory.cache.KCacheDirty = new org.kevoree.modeling.memory.cache.KCacheDirty(new org.kevoree.modeling.memory.KContentKey(current.universe, current.time, current.obj), this.elementData[i].value);
                                            collectedDirties[nbDirties] = dirty;
                                            nbDirties++;
                                        }
                                        while (current.next != null){
                                            current = current.next;
                                            if (current.value.isDirty()) {
                                                var dirty: org.kevoree.modeling.memory.cache.KCacheDirty = new org.kevoree.modeling.memory.cache.KCacheDirty(new org.kevoree.modeling.memory.KContentKey(current.universe, current.time, current.obj), current.value);
                                                collectedDirties[nbDirties] = dirty;
                                                nbDirties++;
                                            }
                                        }
                                    }
                                }
                            }
                            return collectedDirties;
                        }

                        public clean(metaModel: org.kevoree.modeling.meta.MetaModel): void {
                        }

                        public monitor(origin: org.kevoree.modeling.KObject): void {
                        }

                        public size(): number {
                            return this.elementCount;
                        }

                        private remove(universe: number, time: number, obj: number, p_metaModel: org.kevoree.modeling.meta.MetaModel): void {
                            var hash: number = <number>(universe ^ time ^ obj);
                            var index: number = (hash & 0x7FFFFFFF) % this.elementDataSize;
                            if (this.elementDataSize != 0) {
                                var previous: org.kevoree.modeling.memory.cache.HashMemoryCache.Entry = null;
                                var m: org.kevoree.modeling.memory.cache.HashMemoryCache.Entry = this.elementData[index];
                                while (m != null){
                                    if (m.universe == universe && m.time == time && m.obj == obj) {
                                        this.elementCount--;
                                        try {
                                            m.value.free(p_metaModel);
                                        } catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                e.printStackTrace();
                                            }
                                         }
                                        if (previous == null) {
                                            this.elementData[index] = m.next;
                                        } else {
                                            previous.next = m.next;
                                        }
                                    }
                                    previous = m;
                                    m = m.next;
                                }
                            }
                        }

                        constructor() {
                            this.initalCapacity = org.kevoree.modeling.KConfig.CACHE_INIT_SIZE;
                            this.loadFactor = org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR;
                            this.elementCount = 0;
                            this.elementData = new Array();
                            this.elementDataSize = this.initalCapacity;
                            this.threshold = <number>(this.elementDataSize * this.loadFactor);
                        }

                        public clear(metaModel: org.kevoree.modeling.meta.MetaModel): void {
                            for (var i: number = 0; i < this.elementData.length; i++) {
                                var e: org.kevoree.modeling.memory.cache.HashMemoryCache.Entry = this.elementData[i];
                                while (e != null){
                                    e.value.free(metaModel);
                                    e = e.next;
                                }
                            }
                            if (this.elementCount > 0) {
                                this.elementCount = 0;
                                this.elementData = new Array();
                                this.elementDataSize = this.initalCapacity;
                            }
                        }

                    }

                    export module HashMemoryCache { 
                        export class Entry {

                            public next: org.kevoree.modeling.memory.cache.HashMemoryCache.Entry;
                            public universe: number;
                            public time: number;
                            public obj: number;
                            public value: org.kevoree.modeling.memory.KCacheElement;
                        }


                    }
                    export class KCacheDirty {

                        public key: org.kevoree.modeling.memory.KContentKey;
                        public object: org.kevoree.modeling.memory.KCacheElement;
                        constructor(key: org.kevoree.modeling.memory.KContentKey, object: org.kevoree.modeling.memory.KCacheElement) {
                            this.key = key;
                            this.object = object;
                        }

                    }

                }
                export module cdn {
                    export class KContentPutRequest {

                        private _content: any[][];
                        private static KEY_INDEX: number = 0;
                        private static CONTENT_INDEX: number = 1;
                        private static SIZE_INDEX: number = 2;
                        private _size: number = 0;
                        constructor(requestSize: number) {
                            this._content = new Array();
                        }

                        public put(p_key: org.kevoree.modeling.memory.KContentKey, p_payload: string): void {
                            var newLine: any[] = new Array();
                            newLine[KContentPutRequest.KEY_INDEX] = p_key;
                            newLine[KContentPutRequest.CONTENT_INDEX] = p_payload;
                            this._content[this._size] = newLine;
                            this._size = this._size + 1;
                        }

                        public getKey(index: number): org.kevoree.modeling.memory.KContentKey {
                            if (index < this._content.length) {
                                return <org.kevoree.modeling.memory.KContentKey>this._content[index][0];
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

                    export class MemoryKContentDeliveryDriver implements org.kevoree.modeling.memory.KContentDeliveryDriver {

                        private backend: org.kevoree.modeling.memory.struct.map.StringHashMap<any> = new org.kevoree.modeling.memory.struct.map.StringHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        private _localEventListeners: org.kevoree.modeling.util.LocalEventListeners = new org.kevoree.modeling.util.LocalEventListeners();
                        public static DEBUG: boolean = false;
                        public atomicGetIncrement(key: org.kevoree.modeling.memory.KContentKey, cb: (p : number, p1 : java.lang.Throwable) => void): void {
                            var result: string = this.backend.get(key.toString());
                            var nextV: number;
                            var previousV: number;
                            if (result != null) {
                                try {
                                    previousV = java.lang.Short.parseShort(result);
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                        e.printStackTrace();
                                        previousV = java.lang.Short.MIN_VALUE;
                                    }
                                 }
                            } else {
                                previousV = 0;
                            }
                            if (previousV == java.lang.Short.MAX_VALUE) {
                                nextV = java.lang.Short.MIN_VALUE;
                            } else {
                                nextV = <number>(previousV + 1);
                            }
                            this.backend.put(key.toString(), "" + nextV);
                            cb(previousV, null);
                        }

                        public get(keys: org.kevoree.modeling.memory.KContentKey[], callback: (p : string[], p1 : java.lang.Throwable) => void): void {
                            var values: string[] = new Array();
                            for (var i: number = 0; i < keys.length; i++) {
                                if (keys[i] != null) {
                                    values[i] = this.backend.get(keys[i].toString());
                                }
                                if (MemoryKContentDeliveryDriver.DEBUG) {
                                    System.out.println("GET " + keys[i] + "->" + values[i]);
                                }
                            }
                            if (callback != null) {
                                callback(values, null);
                            }
                        }

                        public put(p_request: org.kevoree.modeling.memory.cdn.KContentPutRequest, p_callback: (p : java.lang.Throwable) => void): void {
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
                            this._localEventListeners.clear();
                            this.backend.clear();
                            callback(null);
                        }

                        public registerListener(groupId: number, p_origin: org.kevoree.modeling.KObject, p_listener: (p : org.kevoree.modeling.KObject, p1 : org.kevoree.modeling.meta.Meta[]) => void): void {
                            this._localEventListeners.registerListener(groupId, p_origin, p_listener);
                        }

                        public unregisterGroup(groupId: number): void {
                            this._localEventListeners.unregister(groupId);
                        }

                        public registerMultiListener(groupId: number, origin: org.kevoree.modeling.KUniverse<any, any, any>, objects: number[], listener: (p : org.kevoree.modeling.KObject[]) => void): void {
                            this._localEventListeners.registerListenerAll(groupId, origin.key(), objects, listener);
                        }

                        public send(msgs: org.kevoree.modeling.msg.KMessage): void {
                            this._localEventListeners.dispatch(msgs);
                        }

                        public setManager(manager: org.kevoree.modeling.memory.KDataManager): void {
                            this._localEventListeners.setManager(manager);
                        }

                    }

                }
                export module manager {
                    export class DefaultKDataManager implements org.kevoree.modeling.memory.KDataManager {

                        private static OUT_OF_CACHE_MESSAGE: string = "KMF Error: your object is out of cache, you probably kept an old reference. Please reload it with a lookup";
                        private static UNIVERSE_NOT_CONNECTED_ERROR: string = "Please connect your model prior to create a universe or an object";
                        private _db: org.kevoree.modeling.memory.KContentDeliveryDriver;
                        private _operationManager: org.kevoree.modeling.util.KOperationManager;
                        private _scheduler: org.kevoree.modeling.KScheduler;
                        private _model: org.kevoree.modeling.KModel<any>;
                        private _objectKeyCalculator: org.kevoree.modeling.memory.manager.KeyCalculator = null;
                        private _universeKeyCalculator: org.kevoree.modeling.memory.manager.KeyCalculator = null;
                        private _modelKeyCalculator: org.kevoree.modeling.memory.manager.KeyCalculator;
                        private _groupKeyCalculator: org.kevoree.modeling.memory.manager.KeyCalculator;
                        private isConnected: boolean = false;
                        private UNIVERSE_INDEX: number = 0;
                        private OBJ_INDEX: number = 1;
                        private GLO_TREE_INDEX: number = 2;
                        private _cache: org.kevoree.modeling.memory.KCache;
                        private static zeroPrefix: number = 0;
                        constructor(model: org.kevoree.modeling.KModel<any>) {
                            this._cache = new org.kevoree.modeling.memory.cache.HashMemoryCache();
                            this._modelKeyCalculator = new org.kevoree.modeling.memory.manager.KeyCalculator(DefaultKDataManager.zeroPrefix, 0);
                            this._groupKeyCalculator = new org.kevoree.modeling.memory.manager.KeyCalculator(DefaultKDataManager.zeroPrefix, 0);
                            this._db = new org.kevoree.modeling.memory.cdn.MemoryKContentDeliveryDriver();
                            this._db.setManager(this);
                            this._operationManager = new org.kevoree.modeling.util.DefaultOperationManager(this);
                            this._scheduler = new org.kevoree.modeling.scheduler.DirectScheduler();
                            this._model = model;
                        }

                        public cache(): org.kevoree.modeling.memory.KCache {
                            return this._cache;
                        }

                        public model(): org.kevoree.modeling.KModel<any> {
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
                            var nextGeneratedKey: number = this._universeKeyCalculator.nextKey();
                            if (nextGeneratedKey == org.kevoree.modeling.KConfig.NULL_LONG || nextGeneratedKey == org.kevoree.modeling.KConfig.END_OF_TIME) {
                                nextGeneratedKey = this._universeKeyCalculator.nextKey();
                            }
                            return nextGeneratedKey;
                        }

                        public nextObjectKey(): number {
                            if (this._objectKeyCalculator == null) {
                                throw new java.lang.RuntimeException(DefaultKDataManager.UNIVERSE_NOT_CONNECTED_ERROR);
                            }
                            var nextGeneratedKey: number = this._objectKeyCalculator.nextKey();
                            if (nextGeneratedKey == org.kevoree.modeling.KConfig.NULL_LONG || nextGeneratedKey == org.kevoree.modeling.KConfig.END_OF_TIME) {
                                nextGeneratedKey = this._objectKeyCalculator.nextKey();
                            }
                            return nextGeneratedKey;
                        }

                        public nextModelKey(): number {
                            return this._modelKeyCalculator.nextKey();
                        }

                        public nextGroupKey(): number {
                            return this._groupKeyCalculator.nextKey();
                        }

                        public globalUniverseOrder(): org.kevoree.modeling.memory.struct.map.LongLongHashMap {
                            return <org.kevoree.modeling.memory.struct.map.LongLongHashMap>this._cache.get(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG);
                        }

                        public initUniverse(p_universe: org.kevoree.modeling.KUniverse<any, any, any>, p_parent: org.kevoree.modeling.KUniverse<any, any, any>): void {
                            var cached: org.kevoree.modeling.memory.struct.map.LongLongHashMap = this.globalUniverseOrder();
                            if (cached != null && cached.get(p_universe.key()) == org.kevoree.modeling.KConfig.NULL_LONG) {
                                if (p_parent == null) {
                                    cached.put(p_universe.key(), p_universe.key());
                                } else {
                                    cached.put(p_universe.key(), p_parent.key());
                                }
                            }
                        }

                        public parentUniverseKey(currentUniverseKey: number): number {
                            var cached: org.kevoree.modeling.memory.struct.map.LongLongHashMap = this.globalUniverseOrder();
                            if (cached != null) {
                                return cached.get(currentUniverseKey);
                            } else {
                                return org.kevoree.modeling.KConfig.NULL_LONG;
                            }
                        }

                        public descendantsUniverseKeys(currentUniverseKey: number): number[] {
                            var cached: org.kevoree.modeling.memory.struct.map.LongLongHashMap = this.globalUniverseOrder();
                            if (cached != null) {
                                var temp: org.kevoree.modeling.memory.struct.map.LongLongHashMap = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                cached.each( (key : number, value : number) => {
                                    if (value == currentUniverseKey && key != currentUniverseKey) {
                                        temp.put(key, value);
                                    }
                                });
                                var result: number[] = new Array();
                                var insertIndex: number[] = [0];
                                temp.each( (key : number, value : number) => {
                                    result[insertIndex[0]] = key;
                                    insertIndex[0]++;
                                });
                                return result;
                            } else {
                                return new Array();
                            }
                        }

                        public save(callback: (p : java.lang.Throwable) => void): void {
                            var dirtiesEntries: org.kevoree.modeling.memory.cache.KCacheDirty[] = this._cache.dirties();
                            var request: org.kevoree.modeling.memory.cdn.KContentPutRequest = new org.kevoree.modeling.memory.cdn.KContentPutRequest(dirtiesEntries.length + 2);
                            var notificationMessages: org.kevoree.modeling.msg.KEvents = new org.kevoree.modeling.msg.KEvents(dirtiesEntries.length);
                            for (var i: number = 0; i < dirtiesEntries.length; i++) {
                                var cachedObject: org.kevoree.modeling.memory.KCacheElement = dirtiesEntries[i].object;
                                var meta: number[];
                                if (dirtiesEntries[i].object instanceof org.kevoree.modeling.memory.struct.segment.HeapCacheSegment) {
                                    var segment: org.kevoree.modeling.memory.struct.segment.HeapCacheSegment = <org.kevoree.modeling.memory.struct.segment.HeapCacheSegment>dirtiesEntries[i].object;
                                    meta = segment.modifiedIndexes(this._model.metaModel().metaClasses()[segment.metaClassIndex()]);
                                } else {
                                    meta = null;
                                }
                                notificationMessages.setEvent(i, dirtiesEntries[i].key, meta);
                                request.put(dirtiesEntries[i].key, cachedObject.serialize(this._model.metaModel()));
                                cachedObject.setClean(this._model.metaModel());
                            }
                            request.put(org.kevoree.modeling.memory.KContentKey.createLastObjectIndexFromPrefix(this._objectKeyCalculator.prefix()), "" + this._objectKeyCalculator.lastComputedIndex());
                            request.put(org.kevoree.modeling.memory.KContentKey.createLastUniverseIndexFromPrefix(this._universeKeyCalculator.prefix()), "" + this._universeKeyCalculator.lastComputedIndex());
                            this._db.put(request,  (throwable : java.lang.Throwable) => {
                                if (throwable == null) {
                                    this._db.send(notificationMessages);
                                }
                                if (callback != null) {
                                    callback(throwable);
                                }
                            });
                        }

                        public initKObject(obj: org.kevoree.modeling.KObject): void {
                            var cacheEntry: org.kevoree.modeling.memory.KCacheElementSegment = new org.kevoree.modeling.memory.struct.segment.HeapCacheSegment(obj.now());
                            cacheEntry.init(obj.metaClass());
                            cacheEntry.setDirty();
                            cacheEntry.inc();
                            var timeTree: org.kevoree.modeling.memory.struct.tree.ooheap.OOKLongTree = new org.kevoree.modeling.memory.struct.tree.ooheap.OOKLongTree();
                            timeTree.inc();
                            timeTree.insert(obj.now());
                            var universeTree: org.kevoree.modeling.memory.struct.map.LongLongHashMap = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            universeTree.inc();
                            universeTree.put(obj.universe(), obj.now());
                            this._cache.put(obj.universe(), org.kevoree.modeling.KConfig.NULL_LONG, obj.uuid(), timeTree);
                            this._cache.put(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, obj.uuid(), universeTree);
                            this._cache.put(obj.universe(), obj.now(), obj.uuid(), cacheEntry);
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
                                        this._db.atomicGetIncrement(org.kevoree.modeling.memory.KContentKey.createLastPrefix(),  (newPrefix : number, error : java.lang.Throwable) => {
                                            if (error != null) {
                                                if (connectCallback != null) {
                                                    connectCallback(error);
                                                }
                                            } else {
                                                var connectionElemKeys: org.kevoree.modeling.memory.KContentKey[] = new Array();
                                                connectionElemKeys[this.UNIVERSE_INDEX] = org.kevoree.modeling.memory.KContentKey.createLastUniverseIndexFromPrefix(newPrefix);
                                                connectionElemKeys[this.OBJ_INDEX] = org.kevoree.modeling.memory.KContentKey.createLastObjectIndexFromPrefix(newPrefix);
                                                connectionElemKeys[this.GLO_TREE_INDEX] = org.kevoree.modeling.memory.KContentKey.createGlobalUniverseTree();
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
                                                                var globalUniverseTree: org.kevoree.modeling.memory.struct.map.LongLongHashMap;
                                                                if (globalUniverseTreePayload != null) {
                                                                    globalUniverseTree = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(0, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                                                    try {
                                                                        globalUniverseTree.unserialize(org.kevoree.modeling.memory.KContentKey.createGlobalUniverseTree(), globalUniverseTreePayload, this.model().metaModel());
                                                                    } catch ($ex$) {
                                                                        if ($ex$ instanceof java.lang.Exception) {
                                                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                            e.printStackTrace();
                                                                        }
                                                                     }
                                                                } else {
                                                                    globalUniverseTree = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                                                }
                                                                this._cache.put(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, globalUniverseTree);
                                                                var newUniIndex: number = java.lang.Long.parseLong(uniIndexPayload);
                                                                var newObjIndex: number = java.lang.Long.parseLong(objIndexPayload);
                                                                this._universeKeyCalculator = new org.kevoree.modeling.memory.manager.KeyCalculator(finalNewPrefix, newUniIndex);
                                                                this._objectKeyCalculator = new org.kevoree.modeling.memory.manager.KeyCalculator(finalNewPrefix, newObjIndex);
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
                                        if (connectCallback != null) {
                                            connectCallback(throwable);
                                        }
                                    }
                                });
                            }
                        }

                        public segment(origin: org.kevoree.modeling.KObject, accessMode: org.kevoree.modeling.memory.AccessMode): org.kevoree.modeling.memory.KCacheElementSegment {
                            var currentEntry: org.kevoree.modeling.memory.struct.segment.HeapCacheSegment = <org.kevoree.modeling.memory.struct.segment.HeapCacheSegment>this._cache.get(origin.universe(), origin.now(), origin.uuid());
                            if (currentEntry != null) {
                                return currentEntry;
                            }
                            var objectUniverseTree: org.kevoree.modeling.memory.struct.map.LongLongHashMap = <org.kevoree.modeling.memory.struct.map.LongLongHashMap>this._cache.get(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, origin.uuid());
                            var resolvedUniverse: number = org.kevoree.modeling.memory.manager.ResolutionHelper.resolve_universe(this.globalUniverseOrder(), objectUniverseTree, origin.now(), origin.universe());
                            var timeTree: org.kevoree.modeling.memory.struct.tree.KLongTree = <org.kevoree.modeling.memory.struct.tree.KLongTree>this._cache.get(resolvedUniverse, org.kevoree.modeling.KConfig.NULL_LONG, origin.uuid());
                            if (timeTree == null) {
                                throw new java.lang.RuntimeException(DefaultKDataManager.OUT_OF_CACHE_MESSAGE + " : TimeTree not found for " + org.kevoree.modeling.memory.KContentKey.createTimeTree(resolvedUniverse, origin.uuid()) + " from " + origin.universe() + "/" + resolvedUniverse);
                            }
                            var resolvedTime: number = timeTree.previousOrEqual(origin.now());
                            if (resolvedTime != org.kevoree.modeling.KConfig.NULL_LONG) {
                                var needTimeCopy: boolean = accessMode.equals(org.kevoree.modeling.memory.AccessMode.WRITE) && (resolvedTime != origin.now());
                                var needUniverseCopy: boolean = accessMode.equals(org.kevoree.modeling.memory.AccessMode.WRITE) && (resolvedUniverse != origin.universe());
                                var entry: org.kevoree.modeling.memory.struct.segment.HeapCacheSegment = <org.kevoree.modeling.memory.struct.segment.HeapCacheSegment>this._cache.get(resolvedUniverse, resolvedTime, origin.uuid());
                                if (entry == null) {
                                    return null;
                                }
                                if (accessMode.equals(org.kevoree.modeling.memory.AccessMode.DELETE)) {
                                    timeTree.delete(origin.now());
                                    return entry;
                                }
                                if (!needTimeCopy && !needUniverseCopy) {
                                    if (accessMode.equals(org.kevoree.modeling.memory.AccessMode.WRITE)) {
                                        entry.setDirty();
                                    }
                                    return entry;
                                } else {
                                    var clonedEntry: org.kevoree.modeling.memory.KCacheElementSegment = entry.clone(origin.now(), origin.metaClass());
                                    this._cache.put(origin.universe(), origin.now(), origin.uuid(), clonedEntry);
                                    if (!needUniverseCopy) {
                                        timeTree.insert(origin.now());
                                    } else {
                                        var newTemporalTree: org.kevoree.modeling.memory.struct.tree.KLongTree = new org.kevoree.modeling.memory.struct.tree.ooheap.OOKLongTree();
                                        newTemporalTree.insert(origin.now());
                                        newTemporalTree.inc();
                                        timeTree.dec();
                                        this._cache.put(origin.universe(), org.kevoree.modeling.KConfig.NULL_LONG, origin.uuid(), newTemporalTree);
                                        objectUniverseTree.put(origin.universe(), origin.now());
                                    }
                                    entry.dec();
                                    clonedEntry.inc();
                                    return clonedEntry;
                                }
                            } else {
                                System.err.println(DefaultKDataManager.OUT_OF_CACHE_MESSAGE + " Time not resolved " + origin.now());
                                return null;
                            }
                        }

                        public discard(p_universe: org.kevoree.modeling.KUniverse<any, any, any>, callback: (p : java.lang.Throwable) => void): void {
                            this._cache.clear(this._model.metaModel());
                            var globalUniverseTree: org.kevoree.modeling.memory.KContentKey[] = new Array();
                            globalUniverseTree[0] = org.kevoree.modeling.memory.KContentKey.createGlobalUniverseTree();
                            this.reload(globalUniverseTree,  (throwable : java.lang.Throwable) => {
                                callback(throwable);
                            });
                        }

                        public delete(p_universe: org.kevoree.modeling.KUniverse<any, any, any>, callback: (p : java.lang.Throwable) => void): void {
                            throw new java.lang.RuntimeException("Not implemented yet !");
                        }

                        public lookup(universe: number, time: number, uuid: number, callback: (p : org.kevoree.modeling.KObject) => void): void {
                            var keys: number[] = new Array();
                            keys[0] = uuid;
                            this.lookupAllobjects(universe, time, keys,  (kObjects : org.kevoree.modeling.KObject[]) => {
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

                        public lookupAllobjects(universe: number, time: number, uuids: number[], callback: (p : org.kevoree.modeling.KObject[]) => void): void {
                            this._scheduler.dispatch(new org.kevoree.modeling.memory.manager.LookupAllRunnable(universe, time, uuids, callback, this));
                        }

                        public lookupAlltimes(universe: number, time: number[], uuid: number, callback: (p : org.kevoree.modeling.KObject[]) => void): void {
                            throw new java.lang.RuntimeException("Not Implemented Yet !");
                        }

                        public cdn(): org.kevoree.modeling.memory.KContentDeliveryDriver {
                            return this._db;
                        }

                        public setContentDeliveryDriver(p_dataBase: org.kevoree.modeling.memory.KContentDeliveryDriver): void {
                            this._db = p_dataBase;
                            p_dataBase.setManager(this);
                        }

                        public setScheduler(p_scheduler: org.kevoree.modeling.KScheduler): void {
                            if (p_scheduler != null) {
                                this._scheduler = p_scheduler;
                            }
                        }

                        public operationManager(): org.kevoree.modeling.util.KOperationManager {
                            return this._operationManager;
                        }

                        public getRoot(universe: number, time: number, callback: (p : org.kevoree.modeling.KObject) => void): void {
                            this.bumpKeyToCache(org.kevoree.modeling.memory.KContentKey.createRootUniverseTree(),  (rootGlobalUniverseIndex : org.kevoree.modeling.memory.KCacheElement) => {
                                if (rootGlobalUniverseIndex == null) {
                                    callback(null);
                                } else {
                                    var closestUniverse: number = org.kevoree.modeling.memory.manager.ResolutionHelper.resolve_universe(this.globalUniverseOrder(), <org.kevoree.modeling.memory.struct.map.LongLongHashMap>rootGlobalUniverseIndex, time, universe);
                                    var universeTreeRootKey: org.kevoree.modeling.memory.KContentKey = org.kevoree.modeling.memory.KContentKey.createRootTimeTree(closestUniverse);
                                    this.bumpKeyToCache(universeTreeRootKey,  (universeTree : org.kevoree.modeling.memory.KCacheElement) => {
                                        if (universeTree == null) {
                                            callback(null);
                                        } else {
                                            var resolvedVal: number = (<org.kevoree.modeling.memory.struct.tree.ooheap.OOKLongLongTree>universeTree).previousOrEqualValue(time);
                                            if (resolvedVal == org.kevoree.modeling.KConfig.NULL_LONG) {
                                                callback(null);
                                            } else {
                                                this.lookup(universe, time, resolvedVal, callback);
                                            }
                                        }
                                    });
                                }
                            });
                        }

                        public setRoot(newRoot: org.kevoree.modeling.KObject, callback: (p : java.lang.Throwable) => void): void {
                            this.bumpKeyToCache(org.kevoree.modeling.memory.KContentKey.createRootUniverseTree(),  (globalRootTree : org.kevoree.modeling.memory.KCacheElement) => {
                                var cleanedTree: org.kevoree.modeling.memory.struct.map.LongLongHashMap = <org.kevoree.modeling.memory.struct.map.LongLongHashMap>globalRootTree;
                                if (cleanedTree == null) {
                                    cleanedTree = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                    this._cache.put(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.END_OF_TIME, cleanedTree);
                                }
                                var closestUniverse: number = org.kevoree.modeling.memory.manager.ResolutionHelper.resolve_universe(this.globalUniverseOrder(), cleanedTree, newRoot.now(), newRoot.universe());
                                cleanedTree.put(newRoot.universe(), newRoot.now());
                                if (closestUniverse != newRoot.universe()) {
                                    var newTimeTree: org.kevoree.modeling.memory.struct.tree.KLongLongTree = new org.kevoree.modeling.memory.struct.tree.ooheap.OOKLongLongTree();
                                    newTimeTree.insert(newRoot.now(), newRoot.uuid());
                                    var universeTreeRootKey: org.kevoree.modeling.memory.KContentKey = org.kevoree.modeling.memory.KContentKey.createRootTimeTree(newRoot.universe());
                                    this._cache.put(universeTreeRootKey.universe, universeTreeRootKey.time, universeTreeRootKey.obj, <org.kevoree.modeling.memory.KCacheElement>newTimeTree);
                                    if (callback != null) {
                                        callback(null);
                                    }
                                } else {
                                    var universeTreeRootKey: org.kevoree.modeling.memory.KContentKey = org.kevoree.modeling.memory.KContentKey.createRootTimeTree(closestUniverse);
                                    this.bumpKeyToCache(universeTreeRootKey,  (resolvedRootTimeTree : org.kevoree.modeling.memory.KCacheElement) => {
                                        var initializedTree: org.kevoree.modeling.memory.struct.tree.KLongLongTree = <org.kevoree.modeling.memory.struct.tree.KLongLongTree>resolvedRootTimeTree;
                                        if (initializedTree == null) {
                                            initializedTree = new org.kevoree.modeling.memory.struct.tree.ooheap.OOKLongLongTree();
                                            this._cache.put(universeTreeRootKey.universe, universeTreeRootKey.time, universeTreeRootKey.obj, <org.kevoree.modeling.memory.KCacheElement>initializedTree);
                                        }
                                        initializedTree.insert(newRoot.now(), newRoot.uuid());
                                        if (callback != null) {
                                            callback(null);
                                        }
                                    });
                                }
                            });
                        }

                        public reload(keys: org.kevoree.modeling.memory.KContentKey[], callback: (p : java.lang.Throwable) => void): void {
                            var toReload: java.util.List<org.kevoree.modeling.memory.KContentKey> = new java.util.ArrayList<org.kevoree.modeling.memory.KContentKey>();
                            for (var i: number = 0; i < keys.length; i++) {
                                var cached: org.kevoree.modeling.memory.KCacheElement = this._cache.get(keys[i].universe, keys[i].time, keys[i].obj);
                                if (cached != null && !cached.isDirty()) {
                                    toReload.add(keys[i]);
                                }
                            }
                            var toReload_flat: org.kevoree.modeling.memory.KContentKey[] = toReload.toArray(new Array());
                            this._db.get(toReload_flat,  (strings : string[], error : java.lang.Throwable) => {
                                if (error != null) {
                                    error.printStackTrace();
                                    if (callback != null) {
                                        callback(null);
                                    }
                                } else {
                                    for (var i: number = 0; i < strings.length; i++) {
                                        if (strings[i] != null) {
                                            var correspondingKey: org.kevoree.modeling.memory.KContentKey = toReload_flat[i];
                                            var cachedObj: org.kevoree.modeling.memory.KCacheElement = this._cache.get(correspondingKey.universe, correspondingKey.time, correspondingKey.obj);
                                            if (cachedObj != null && !cachedObj.isDirty()) {
                                                cachedObj = this.internal_unserialize(correspondingKey, strings[i]);
                                                if (cachedObj != null) {
                                                    this._cache.put(correspondingKey.universe, correspondingKey.time, correspondingKey.obj, cachedObj);
                                                }
                                            }
                                        }
                                    }
                                    if (callback != null) {
                                        callback(null);
                                    }
                                }
                            });
                        }

                        public cleanCache(): void {
                            if (this._cache != null) {
                                this._cache.clean(this._model.metaModel());
                            }
                        }

                        public bumpKeyToCache(contentKey: org.kevoree.modeling.memory.KContentKey, callback: (p : org.kevoree.modeling.memory.KCacheElement) => void): void {
                            var cached: org.kevoree.modeling.memory.KCacheElement = this._cache.get(contentKey.universe, contentKey.time, contentKey.obj);
                            if (cached != null) {
                                callback(cached);
                            } else {
                                var keys: org.kevoree.modeling.memory.KContentKey[] = new Array();
                                keys[0] = contentKey;
                                this._db.get(keys,  (strings : string[], error : java.lang.Throwable) => {
                                    if (strings[0] != null) {
                                        var newObject: org.kevoree.modeling.memory.KCacheElement = this.internal_unserialize(contentKey, strings[0]);
                                        if (newObject != null) {
                                            this._cache.put(contentKey.universe, contentKey.time, contentKey.obj, newObject);
                                        }
                                        callback(newObject);
                                    } else {
                                        callback(null);
                                    }
                                });
                            }
                        }

                        public bumpKeysToCache(contentKeys: org.kevoree.modeling.memory.KContentKey[], callback: (p : org.kevoree.modeling.memory.KCacheElement[]) => void): void {
                            var toLoadIndexes: boolean[] = null;
                            var nbElem: number = 0;
                            var result: org.kevoree.modeling.memory.KCacheElement[] = new Array();
                            for (var i: number = 0; i < contentKeys.length; i++) {
                                if (contentKeys[i] != null) {
                                    result[i] = this._cache.get(contentKeys[i].universe, contentKeys[i].time, contentKeys[i].obj);
                                    if (result[i] == null) {
                                        if (toLoadIndexes == null) {
                                            toLoadIndexes = new Array();
                                        }
                                        toLoadIndexes[i] = true;
                                        nbElem++;
                                    }
                                }
                            }
                            if (toLoadIndexes == null) {
                                callback(result);
                            } else {
                                var toLoadDbKeys: org.kevoree.modeling.memory.KContentKey[] = new Array();
                                var originIndexes: number[] = new Array();
                                var toLoadIndex: number = 0;
                                for (var i: number = 0; i < contentKeys.length; i++) {
                                    if (toLoadIndexes[i]) {
                                        toLoadDbKeys[toLoadIndex] = contentKeys[i];
                                        originIndexes[toLoadIndex] = i;
                                        toLoadIndex++;
                                    }
                                }
                                this._db.get(toLoadDbKeys,  (payloads : string[], error : java.lang.Throwable) => {
                                    for (var i: number = 0; i < payloads.length; i++) {
                                        if (payloads[i] != null) {
                                            var newObjKey: org.kevoree.modeling.memory.KContentKey = toLoadDbKeys[i];
                                            var newObject: org.kevoree.modeling.memory.KCacheElement = this.internal_unserialize(newObjKey, payloads[i]);
                                            if (newObject != null) {
                                                this._cache.put(newObjKey.universe, newObjKey.time, newObjKey.obj, newObject);
                                                var originIndex: number = originIndexes[i];
                                                result[originIndex] = newObject;
                                            }
                                        }
                                    }
                                    callback(result);
                                });
                            }
                        }

                        private internal_unserialize(key: org.kevoree.modeling.memory.KContentKey, payload: string): org.kevoree.modeling.memory.KCacheElement {
                            var result: org.kevoree.modeling.memory.KCacheElement;
                            var isUniverseNotNull: boolean = key.universe != org.kevoree.modeling.KConfig.NULL_LONG;
                            if (org.kevoree.modeling.KConfig.END_OF_TIME == key.obj) {
                                if (isUniverseNotNull) {
                                    result = new org.kevoree.modeling.memory.struct.tree.ooheap.OOKLongLongTree();
                                } else {
                                    result = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(0, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                }
                            } else {
                                var isTimeNotNull: boolean = key.time != org.kevoree.modeling.KConfig.NULL_LONG;
                                var isObjNotNull: boolean = key.obj != org.kevoree.modeling.KConfig.NULL_LONG;
                                if (isUniverseNotNull && isTimeNotNull && isObjNotNull) {
                                    result = new org.kevoree.modeling.memory.struct.segment.HeapCacheSegment(key.time);
                                } else {
                                    if (isUniverseNotNull && !isTimeNotNull && isObjNotNull) {
                                        result = new org.kevoree.modeling.memory.struct.tree.ooheap.OOKLongTree();
                                    } else {
                                        result = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(0, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                    }
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

                    export class JsonRaw {

                        public static decode(payload: string, now: number, metaModel: org.kevoree.modeling.meta.MetaModel, entry: org.kevoree.modeling.memory.struct.segment.HeapCacheSegment): boolean {
                            if (payload == null) {
                                return false;
                            }
                            var objectReader: org.kevoree.modeling.format.json.JsonObjectReader = new org.kevoree.modeling.format.json.JsonObjectReader();
                            objectReader.parseObject(payload);
                            if (objectReader.get(org.kevoree.modeling.format.json.JsonFormat.KEY_META) == null) {
                                return false;
                            } else {
                                var metaClass: org.kevoree.modeling.meta.MetaClass = metaModel.metaClassByName(objectReader.get(org.kevoree.modeling.format.json.JsonFormat.KEY_META).toString());
                                entry.init(metaClass);
                                var metaKeys: string[] = objectReader.keys();
                                for (var i: number = 0; i < metaKeys.length; i++) {
                                    var metaElement: org.kevoree.modeling.meta.Meta = metaClass.metaByName(metaKeys[i]);
                                    var insideContent: any = objectReader.get(metaKeys[i]);
                                    if (insideContent != null) {
                                        if (metaElement != null && metaElement.metaType().equals(org.kevoree.modeling.meta.MetaType.ATTRIBUTE)) {
                                            entry.set(metaElement.index(), (<org.kevoree.modeling.abs.AbstractMetaAttribute>metaElement).strategy().load(insideContent.toString(), <org.kevoree.modeling.abs.AbstractMetaAttribute>metaElement, now), metaClass);
                                        } else {
                                            if (metaElement != null && metaElement instanceof org.kevoree.modeling.abs.AbstractMetaReference) {
                                                try {
                                                    var plainRawSet: string[] = objectReader.getAsStringArray(metaKeys[i]);
                                                    var convertedRaw: number[] = new Array();
                                                    for (var l: number = 0; l < plainRawSet.length; l++) {
                                                        try {
                                                            convertedRaw[l] = java.lang.Long.parseLong(plainRawSet[l]);
                                                        } catch ($ex$) {
                                                            if ($ex$ instanceof java.lang.Exception) {
                                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                e.printStackTrace();
                                                            }
                                                         }
                                                    }
                                                    entry.set(metaElement.index(), convertedRaw, metaClass);
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
                                entry.setClean(metaModel);
                                return true;
                            }
                        }

                        public static encode(raw: org.kevoree.modeling.memory.KCacheElementSegment, uuid: number, p_metaClass: org.kevoree.modeling.meta.MetaClass, isRoot: boolean): string {
                             var builder = {};
                             builder[org.kevoree.modeling.format.json.JsonFormat.KEY_META] = p_metaClass.metaName();
                             if(uuid != null){ builder[org.kevoree.modeling.format.json.JsonFormat.KEY_UUID] = uuid; }
                             if(isRoot){ builder[org.kevoree.modeling.format.json.JsonFormat.KEY_ROOT] = true; }
                             var metaElements = p_metaClass.metaElements();
                             var payload_res;
                             for (var i = 0; i < metaElements.length; i++) {
                             payload_res = raw.get(metaElements[i].index(),p_metaClass);
                             if(payload_res != null && payload_res !== undefined){
                             if (metaElements[i] != null && metaElements[i].metaType() === org.kevoree.modeling.meta.MetaType.ATTRIBUTE) {
                             if(metaElements[i]['attributeType']() != org.kevoree.modeling.meta.PrimitiveTypes.TRANSIENT){
                             var attrsPayload = metaElements[i]['strategy']().save(payload_res, metaElements[i]);
                             builder[metaElements[i].metaName()] = attrsPayload;
                             }
                             } else {
                             builder[metaElements[i].metaName()] = payload_res;
                             }
                             }
                             }
                             return JSON.stringify(builder);
                        }

                    }

                    export class KeyCalculator {

                         private _prefix: string;
                        private _currentIndex: number;
                        constructor(prefix: number, currentIndex: number) {
                             this._prefix = "0x" + prefix.toString(org.kevoree.modeling.KConfig.PREFIX_SIZE);
                             this._currentIndex = currentIndex;
                        }

                        public nextKey(): number {
                             if (this._currentIndex == org.kevoree.modeling.KConfig.KEY_PREFIX_MASK) {
                             throw new java.lang.IndexOutOfBoundsException("Object Index could not be created because it exceeded the capacity of the current prefix. Ask for a new prefix.");
                             }
                             this._currentIndex++;
                             var indexHex = this._currentIndex.toString(org.kevoree.modeling.KConfig.PREFIX_SIZE);
                             var objectKey = parseInt(this._prefix + "000000000".substring(0,9-indexHex.length) + indexHex, org.kevoree.modeling.KConfig.PREFIX_SIZE);
                             if (objectKey >= org.kevoree.modeling.KConfig.NULL_LONG) {
                             throw new java.lang.IndexOutOfBoundsException("Object Index exceeds teh maximum JavaScript number capacity. (2^"+org.kevoree.modeling.KConfig.LONG_SIZE+")");
                             }
                             return objectKey;
                        }

                        public lastComputedIndex(): number {
                            return this._currentIndex;
                        }

                        public prefix(): number {
                             return parseInt(this._prefix,org.kevoree.modeling.KConfig.PREFIX_SIZE);
                        }

                    }

                    export class LookupAllRunnable implements java.lang.Runnable {

                        private _universe: number;
                        private _time: number;
                        private _keys: number[];
                        private _callback: (p : org.kevoree.modeling.KObject[]) => void;
                        private _store: org.kevoree.modeling.memory.manager.DefaultKDataManager;
                        constructor(p_universe: number, p_time: number, p_keys: number[], p_callback: (p : org.kevoree.modeling.KObject[]) => void, p_store: org.kevoree.modeling.memory.manager.DefaultKDataManager) {
                            this._universe = p_universe;
                            this._time = p_time;
                            this._keys = p_keys;
                            this._callback = p_callback;
                            this._store = p_store;
                        }

                        public run(): void {
                            var tempKeys: org.kevoree.modeling.memory.KContentKey[] = new Array();
                            for (var i: number = 0; i < this._keys.length; i++) {
                                if (this._keys[i] != org.kevoree.modeling.KConfig.NULL_LONG) {
                                    tempKeys[i] = org.kevoree.modeling.memory.KContentKey.createUniverseTree(this._keys[i]);
                                }
                            }
                            this._store.bumpKeysToCache(tempKeys,  (universeIndexes : org.kevoree.modeling.memory.KCacheElement[]) => {
                                for (var i: number = 0; i < this._keys.length; i++) {
                                    var toLoadKey: org.kevoree.modeling.memory.KContentKey = null;
                                    if (universeIndexes[i] != null) {
                                        var closestUniverse: number = org.kevoree.modeling.memory.manager.ResolutionHelper.resolve_universe(this._store.globalUniverseOrder(), <org.kevoree.modeling.memory.struct.map.LongLongHashMap>universeIndexes[i], this._time, this._universe);
                                        toLoadKey = org.kevoree.modeling.memory.KContentKey.createTimeTree(closestUniverse, this._keys[i]);
                                    }
                                    tempKeys[i] = toLoadKey;
                                }
                                this._store.bumpKeysToCache(tempKeys,  (timeIndexes : org.kevoree.modeling.memory.KCacheElement[]) => {
                                    for (var i: number = 0; i < this._keys.length; i++) {
                                        var resolvedContentKey: org.kevoree.modeling.memory.KContentKey = null;
                                        if (timeIndexes[i] != null) {
                                            var cachedIndexTree: org.kevoree.modeling.memory.struct.tree.KLongTree = <org.kevoree.modeling.memory.struct.tree.KLongTree>timeIndexes[i];
                                            var resolvedNode: number = cachedIndexTree.previousOrEqual(this._time);
                                            if (resolvedNode != org.kevoree.modeling.KConfig.NULL_LONG) {
                                                resolvedContentKey = org.kevoree.modeling.memory.KContentKey.createObject(tempKeys[i].universe, resolvedNode, this._keys[i]);
                                            }
                                        }
                                        tempKeys[i] = resolvedContentKey;
                                    }
                                    this._store.bumpKeysToCache(tempKeys,  (cachedObjects : org.kevoree.modeling.memory.KCacheElement[]) => {
                                        var proxies: org.kevoree.modeling.KObject[] = new Array();
                                        for (var i: number = 0; i < this._keys.length; i++) {
                                            if (cachedObjects[i] != null && cachedObjects[i] instanceof org.kevoree.modeling.memory.struct.segment.HeapCacheSegment) {
                                                proxies[i] = (<org.kevoree.modeling.abs.AbstractKModel<any>>this._store.model()).createProxy(this._universe, this._time, this._keys[i], this._store.model().metaModel().metaClasses()[(<org.kevoree.modeling.memory.struct.segment.HeapCacheSegment>cachedObjects[i]).metaClassIndex()]);
                                                if (proxies[i] != null) {
                                                    var cachedIndexTree: org.kevoree.modeling.memory.struct.tree.KLongTree = <org.kevoree.modeling.memory.struct.tree.KLongTree>timeIndexes[i];
                                                    cachedIndexTree.inc();
                                                    var universeTree: org.kevoree.modeling.memory.struct.map.LongLongHashMap = <org.kevoree.modeling.memory.struct.map.LongLongHashMap>universeIndexes[i];
                                                    universeTree.inc();
                                                    cachedObjects[i].inc();
                                                }
                                            }
                                        }
                                        this._callback(proxies);
                                    });
                                });
                            });
                        }

                    }

                    export class ResolutionHelper {

                        public static resolve_trees(universe: number, time: number, uuid: number, cache: org.kevoree.modeling.memory.KCache): org.kevoree.modeling.memory.manager.ResolutionResult {
                            var result: org.kevoree.modeling.memory.manager.ResolutionResult = new org.kevoree.modeling.memory.manager.ResolutionResult();
                            var objectUniverseTree: org.kevoree.modeling.memory.struct.map.LongLongHashMap = <org.kevoree.modeling.memory.struct.map.LongLongHashMap>cache.get(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, uuid);
                            var globalUniverseOrder: org.kevoree.modeling.memory.struct.map.LongLongHashMap = <org.kevoree.modeling.memory.struct.map.LongLongHashMap>cache.get(org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG, org.kevoree.modeling.KConfig.NULL_LONG);
                            result.universeTree = objectUniverseTree;
                            var resolvedUniverse: number = org.kevoree.modeling.memory.manager.ResolutionHelper.resolve_universe(globalUniverseOrder, objectUniverseTree, time, universe);
                            result.universe = resolvedUniverse;
                            var timeTree: org.kevoree.modeling.memory.struct.tree.KLongTree = <org.kevoree.modeling.memory.struct.tree.KLongTree>cache.get(resolvedUniverse, org.kevoree.modeling.KConfig.NULL_LONG, uuid);
                            if (timeTree != null) {
                                result.timeTree = timeTree;
                                var resolvedTime: number = timeTree.previousOrEqual(time);
                                result.time = resolvedTime;
                                result.segment = <org.kevoree.modeling.memory.struct.segment.HeapCacheSegment>cache.get(resolvedUniverse, resolvedTime, uuid);
                            }
                            result.uuid = uuid;
                            return result;
                        }

                        public static resolve_universe(globalTree: org.kevoree.modeling.memory.struct.map.LongLongHashMap, objUniverseTree: org.kevoree.modeling.memory.struct.map.LongLongHashMap, timeToResolve: number, originUniverseId: number): number {
                            if (globalTree == null || objUniverseTree == null) {
                                return originUniverseId;
                            }
                            var currentUniverse: number = originUniverseId;
                            var previousUniverse: number = org.kevoree.modeling.KConfig.NULL_LONG;
                            var divergenceTime: number = objUniverseTree.get(currentUniverse);
                            while (currentUniverse != previousUniverse){
                                if (divergenceTime != org.kevoree.modeling.KConfig.NULL_LONG && divergenceTime <= timeToResolve) {
                                    return currentUniverse;
                                }
                                previousUniverse = currentUniverse;
                                currentUniverse = globalTree.get(currentUniverse);
                                divergenceTime = objUniverseTree.get(currentUniverse);
                            }
                            return originUniverseId;
                        }

                        public static universeSelectByRange(globalTree: org.kevoree.modeling.memory.struct.map.LongLongHashMap, objUniverseTree: org.kevoree.modeling.memory.struct.map.LongLongHashMap, rangeMin: number, rangeMax: number, originUniverseId: number): number[] {
                            var collected: org.kevoree.modeling.memory.struct.map.LongLongHashMap = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            var currentUniverse: number = originUniverseId;
                            var previousUniverse: number = org.kevoree.modeling.KConfig.NULL_LONG;
                            var divergenceTime: number = objUniverseTree.get(currentUniverse);
                            while (currentUniverse != previousUniverse){
                                if (divergenceTime != org.kevoree.modeling.KConfig.NULL_LONG) {
                                    if (divergenceTime <= rangeMin) {
                                        collected.put(collected.size(), currentUniverse);
                                        break;
                                    } else {
                                        if (divergenceTime <= rangeMax) {
                                            collected.put(collected.size(), currentUniverse);
                                        }
                                    }
                                }
                                previousUniverse = currentUniverse;
                                currentUniverse = globalTree.get(currentUniverse);
                                divergenceTime = objUniverseTree.get(currentUniverse);
                            }
                            var trimmed: number[] = new Array();
                            for (var i: number = 0; i < collected.size(); i++) {
                                trimmed[<number>i] = collected.get(i);
                            }
                            return trimmed;
                        }

                    }

                    export class ResolutionResult {

                        public universeTree: org.kevoree.modeling.memory.struct.map.LongLongHashMap;
                        public timeTree: org.kevoree.modeling.memory.struct.tree.KLongTree;
                        public segment: org.kevoree.modeling.memory.KCacheElementSegment;
                        public universe: number;
                        public time: number;
                        public uuid: number;
                    }

                }
                export module struct {
                    export module map {
                        export class IntHashMap<V> {

                             constructor(initalCapacity: number, loadFactor : number) { }
                             public clear():void { for(var p in this){if(this.hasOwnProperty(p)){delete this[p];}} }
                             public get(key:number):V { return this[key]; }
                             public put(key:number, pval : V):V { var previousVal = this[key];this[key] = pval;return previousVal;}
                             public containsKey(key:number):boolean { return this.hasOwnProperty(<any>key);}
                             public remove(key:number):V { var tmp = this[key]; delete this[key]; return tmp; }
                             public size():number { return Object.keys(this).length; }
                             public each(callback: (p : number, p1 : V) => void): void { for(var p in this){ if(this.hasOwnProperty(p)){ callback(<number>p,this[p]); } } }
                        }

                        export interface IntHashMapCallBack<V> {

                            on(key: number, value: V): void;

                        }

                        export class LongHashMap<V> {

                             constructor(initalCapacity: number, loadFactor : number) { }
                             public clear():void { for(var p in this){if(this.hasOwnProperty(p)){delete this[p];} } }
                             public get(key:number):V { return this[key]; }
                             public put(key:number, pval : V):V { var previousVal = this[key];this[key] = pval;return previousVal;}
                             public containsKey(key:number):boolean { return this.hasOwnProperty(<any>key);}
                             public remove(key:number):V { var tmp = this[key]; delete this[key]; return tmp; }
                             public size():number { return Object.keys(this).length; }
                             public each(callback: (p : number, p1 : V) => void): void { for(var p in this){ if(this.hasOwnProperty(p)){ callback(<number>p,this[p]); } } }
                        }

                        export interface LongHashMapCallBack<V> {

                            on(key: number, value: V): void;

                        }

                        export class LongLongHashMap implements org.kevoree.modeling.memory.KCacheElement {

                             private _counter = 0;
                             private _isDirty = false;
                             static ELEMENT_SEP = ',';
                             static CHUNK_SEP = '/';
                             constructor(initalCapacity: number, loadFactor : number) { }
                             public clear():void { for(var p in this){ if(this.hasOwnProperty(p) && p.indexOf('_') != 0){ delete this[p];}} }
                             public get(key:number):number { return this[key]; }
                             public put(key:number, pval : number):number { this._isDirty=false; var previousVal = this[key];this[key] = pval;return previousVal;}
                             public containsKey(key:number):boolean { return this.hasOwnProperty(<any>key);}
                             public remove(key:number):number { var tmp = this[key]; delete this[key]; return tmp; }
                             public size():number { return Object.keys(this).length -2; }
                             public each(callback: (p : number, p1 : number) => void): void { for(var p in this){ if(this.hasOwnProperty(p) && p.indexOf('_') != 0){ callback(<number>p,this[p]); } } }
                             public counter():number { return this._counter; }
                             public inc():void { this._counter++; }
                             public dec():void { this._counter--; }
                             public free():void { }
                             public isDirty():boolean { return this._isDirty; }
                             public setClean(mm):void { this._isDirty = false; }
                             public setDirty():void { this._isDirty = true; }
                             public serialize(m): string { var buffer = ""+this.size(); this.each( (key : number, value : number) => { buffer = buffer + LongLongHashMap.CHUNK_SEP + key + LongLongHashMap.ELEMENT_SEP + value; }); return buffer; }
                             public unserialize(key: org.kevoree.modeling.memory.KContentKey, payload: string, metaModel: org.kevoree.modeling.meta.MetaModel): void {
                             if (payload == null || payload.length == 0) { return; }
                             var cursor: number = 0;
                             while (cursor < payload.length && payload.charAt(cursor) != LongLongHashMap.CHUNK_SEP){ cursor++; }
                             var nbElement: number = java.lang.Integer.parseInt(payload.substring(0, cursor));
                             while (cursor < payload.length){
                             cursor++;
                             var beginChunk: number = cursor;
                             while (cursor < payload.length && payload.charAt(cursor) != LongLongHashMap.ELEMENT_SEP){ cursor++; }
                             var middleChunk: number = cursor;
                             while (cursor < payload.length && payload.charAt(cursor) != LongLongHashMap.CHUNK_SEP){ cursor++; }
                             var loopKey: number = java.lang.Long.parseLong(payload.substring(beginChunk, middleChunk));
                             var loopVal: number = java.lang.Long.parseLong(payload.substring(middleChunk + 1, cursor));
                             this.put(loopKey, loopVal);
                             }
                             this._isDirty = false;
                             }
                        }

                        export interface LongLongHashMapCallBack<V> {

                            on(key: number, value: number): void;

                        }

                        export class StringHashMap<V> {

                             constructor(initalCapacity: number, loadFactor : number) { }
                             public clear():void { for(var p in this){ if(this.hasOwnProperty(p)){ delete this[p];} } }
                             public get(key:string):V { return this[key]; }
                             public put(key:string, pval : V):V { var previousVal = this[key];this[key] = pval;return previousVal;}
                             public containsKey(key:string):boolean { return this.hasOwnProperty(key);}
                             public remove(key:string):V { var tmp = this[key]; delete this[key]; return tmp; }
                             public size():number { return Object.keys(this).length; }
                             public each(callback: (p : string, p1 : V) => void): void { for(var p in this){ if(this.hasOwnProperty(p)){ callback(<string>p,this[p]); } } }
                        }

                        export interface StringHashMapCallBack<V> {

                            on(key: string, value: V): void;

                        }

                    }
                    export module segment {
                        export class HeapCacheSegment implements org.kevoree.modeling.memory.KCacheElementSegment {

                            private raw: any[];
                            private _counter: number = 0;
                            private _metaClassIndex: number = -1;
                            private _modifiedIndexes: boolean[] = null;
                            private _dirty: boolean = false;
                            private _timeOrigin: number;
                            constructor(p_timeOrigin: number) {
                                this._timeOrigin = p_timeOrigin;
                            }

                            public init(p_metaClass: org.kevoree.modeling.meta.MetaClass): void {
                                this.raw = new Array();
                                this._metaClassIndex = p_metaClass.index();
                            }

                            public metaClassIndex(): number {
                                return this._metaClassIndex;
                            }

                            public originTime(): number {
                                return this._timeOrigin;
                            }

                            public isDirty(): boolean {
                                return this._dirty;
                            }

                            public serialize(metaModel: org.kevoree.modeling.meta.MetaModel): string {
                                return org.kevoree.modeling.memory.manager.JsonRaw.encode(this, org.kevoree.modeling.KConfig.NULL_LONG, metaModel.metaClasses()[this._metaClassIndex], false);
                            }

                            public modifiedIndexes(p_metaClass: org.kevoree.modeling.meta.MetaClass): number[] {
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

                            public setClean(metaModel: org.kevoree.modeling.meta.MetaModel): void {
                                this._dirty = false;
                                this._modifiedIndexes = null;
                            }

                            public setDirty(): void {
                                this._dirty = true;
                            }

                            public unserialize(key: org.kevoree.modeling.memory.KContentKey, payload: string, metaModel: org.kevoree.modeling.meta.MetaModel): void {
                                org.kevoree.modeling.memory.manager.JsonRaw.decode(payload, key.time, metaModel, this);
                            }

                            public counter(): number {
                                return this._counter;
                            }

                            public inc(): void {
                                this._counter++;
                            }

                            public dec(): void {
                                this._counter--;
                            }

                            public free(metaModel: org.kevoree.modeling.meta.MetaModel): void {
                            }

                            public get(index: number, p_metaClass: org.kevoree.modeling.meta.MetaClass): any {
                                if (this.raw != null) {
                                    return this.raw[index];
                                } else {
                                    return null;
                                }
                            }

                            public getRef(index: number, p_metaClass: org.kevoree.modeling.meta.MetaClass): number[] {
                                if (this.raw != null) {
                                    var previousObj: any = this.raw[index];
                                    if (previousObj != null) {
                                        try {
                                            return <number[]>previousObj;
                                        } catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                e.printStackTrace();
                                                this.raw[index] = null;
                                                return null;
                                            }
                                         }
                                    } else {
                                        return null;
                                    }
                                } else {
                                    return null;
                                }
                            }

                            public addRef(index: number, newRef: number, metaClass: org.kevoree.modeling.meta.MetaClass): boolean {
                                if (this.raw != null) {
                                    var previous: number[] = <number[]>this.raw[index];
                                    if (previous == null) {
                                        previous = new Array();
                                        previous[0] = newRef;
                                    } else {
                                        for (var i: number = 0; i < previous.length; i++) {
                                            if (previous[i] == newRef) {
                                                return false;
                                            }
                                        }
                                        var incArray: number[] = new Array();
                                        System.arraycopy(previous, 0, incArray, 0, previous.length);
                                        incArray[previous.length] = newRef;
                                        previous = incArray;
                                    }
                                    this.raw[index] = previous;
                                    if (this._modifiedIndexes == null) {
                                        this._modifiedIndexes = new Array();
                                    }
                                    this._modifiedIndexes[index] = true;
                                    this._dirty = true;
                                    return true;
                                }
                                return false;
                            }

                            public removeRef(index: number, newRef: number, metaClass: org.kevoree.modeling.meta.MetaClass): boolean {
                                if (this.raw != null) {
                                    var previous: number[] = <number[]>this.raw[index];
                                    if (previous != null) {
                                        var indexToRemove: number = -1;
                                        for (var i: number = 0; i < previous.length; i++) {
                                            if (previous[i] == newRef) {
                                                indexToRemove = i;
                                                break;
                                            }
                                        }
                                        if (indexToRemove != -1) {
                                            var newArray: number[] = new Array();
                                            System.arraycopy(previous, 0, newArray, 0, indexToRemove);
                                            System.arraycopy(previous, indexToRemove + 1, newArray, indexToRemove, previous.length - indexToRemove - 1);
                                            this.raw[index] = newArray;
                                            if (this._modifiedIndexes == null) {
                                                this._modifiedIndexes = new Array();
                                            }
                                            this._modifiedIndexes[index] = true;
                                            this._dirty = true;
                                        }
                                    }
                                }
                                return false;
                            }

                            public getInfer(index: number, metaClass: org.kevoree.modeling.meta.MetaClass): number[] {
                                if (this.raw != null) {
                                    var previousObj: any = this.raw[index];
                                    if (previousObj != null) {
                                        try {
                                            return <number[]>previousObj;
                                        } catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                e.printStackTrace();
                                                this.raw[index] = null;
                                                return null;
                                            }
                                         }
                                    } else {
                                        return null;
                                    }
                                } else {
                                    return null;
                                }
                            }

                            public getInferElem(index: number, arrayIndex: number, metaClass: org.kevoree.modeling.meta.MetaClass): number {
                                var res: number[] = this.getInfer(index, metaClass);
                                if (res != null && arrayIndex > 0 && arrayIndex < res.length) {
                                    return res[arrayIndex];
                                }
                                return 0;
                            }

                            public setInferElem(index: number, arrayIndex: number, valueToInsert: number, metaClass: org.kevoree.modeling.meta.MetaClass): void {
                                var res: number[] = this.getInfer(index, metaClass);
                                if (res != null && arrayIndex > 0 && arrayIndex < res.length) {
                                    res[arrayIndex] = valueToInsert;
                                }
                            }

                            public extendInfer(index: number, newSize: number, metaClass: org.kevoree.modeling.meta.MetaClass): void {
                                if (this.raw != null) {
                                    var previous: number[] = <number[]>this.raw[index];
                                    if (previous == null) {
                                        previous = new Array();
                                    } else {
                                        var incArray: number[] = new Array();
                                        System.arraycopy(previous, 0, incArray, 0, previous.length);
                                        previous = incArray;
                                    }
                                    this.raw[index] = previous;
                                    if (this._modifiedIndexes == null) {
                                        this._modifiedIndexes = new Array();
                                    }
                                    this._modifiedIndexes[index] = true;
                                    this._dirty = true;
                                }
                            }

                            public set(index: number, content: any, p_metaClass: org.kevoree.modeling.meta.MetaClass): void {
                                this.raw[index] = content;
                                this._dirty = true;
                                if (this._modifiedIndexes == null) {
                                    this._modifiedIndexes = new Array();
                                }
                                this._modifiedIndexes[index] = true;
                            }

                            public clone(newTimeOrigin: number, p_metaClass: org.kevoree.modeling.meta.MetaClass): org.kevoree.modeling.memory.KCacheElementSegment {
                                if (this.raw == null) {
                                    return new org.kevoree.modeling.memory.struct.segment.HeapCacheSegment(newTimeOrigin);
                                } else {
                                    var cloned: any[] = new Array();
                                    for (var i: number = 0; i < this.raw.length; i++) {
                                        var resolved: any = this.raw[i];
                                        if (resolved != null) {
                                            if (resolved instanceof org.kevoree.modeling.KInferState) {
                                                cloned[i] = (<org.kevoree.modeling.KInferState>resolved).cloneState();
                                            } else {
                                                cloned[i] = resolved;
                                            }
                                        }
                                    }
                                    var clonedEntry: org.kevoree.modeling.memory.struct.segment.HeapCacheSegment = new org.kevoree.modeling.memory.struct.segment.HeapCacheSegment(newTimeOrigin);
                                    clonedEntry._dirty = true;
                                    clonedEntry.raw = cloned;
                                    clonedEntry._metaClassIndex = this._metaClassIndex;
                                    return clonedEntry;
                                }
                            }

                        }

                    }
                    export module tree {
                        export interface KLongLongTree extends org.kevoree.modeling.memory.struct.tree.KTree {

                            insert(key: number, value: number): void;

                            previousOrEqualValue(key: number): number;

                            lookupValue(key: number): number;

                        }

                        export interface KLongTree extends org.kevoree.modeling.memory.struct.tree.KTree {

                            insert(key: number): void;

                            previousOrEqual(key: number): number;

                            lookup(key: number): number;

                            range(startKey: number, endKey: number, walker: (p : number) => void): void;

                            delete(key: number): void;

                        }

                        export interface KTree extends org.kevoree.modeling.memory.KCacheElement {

                            size(): number;

                        }

                        export interface KTreeWalker {

                            elem(t: number): void;

                        }

                        export module ooheap {
                            export class LongTreeNode {

                                public static BLACK: string = '0';
                                public static RED: string = '2';
                                public key: number;
                                public value: number;
                                public color: boolean;
                                private left: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode;
                                private right: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode;
                                private parent: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = null;
                                constructor(key: number, value: number, color: boolean, left: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode, right: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode) {
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

                                public grandparent(): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    if (this.parent != null) {
                                        return this.parent.parent;
                                    } else {
                                        return null;
                                    }
                                }

                                public sibling(): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
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

                                public uncle(): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    if (this.parent != null) {
                                        return this.parent.sibling();
                                    } else {
                                        return null;
                                    }
                                }

                                public getLeft(): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    return this.left;
                                }

                                public setLeft(left: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    this.left = left;
                                }

                                public getRight(): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    return this.right;
                                }

                                public setRight(right: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    this.right = right;
                                }

                                public getParent(): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    return this.parent;
                                }

                                public setParent(parent: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    this.parent = parent;
                                }

                                public serialize(builder: java.lang.StringBuilder): void {
                                    builder.append("|");
                                    if (this.color == true) {
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

                                public next(): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = this;
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

                                public previous(): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = this;
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

                                public static unserialize(ctx: org.kevoree.modeling.memory.struct.tree.ooheap.TreeReaderContext): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    return org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode.internal_unserialize(true, ctx);
                                }

                                public static internal_unserialize(rightBranch: boolean, ctx: org.kevoree.modeling.memory.struct.tree.ooheap.TreeReaderContext): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
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
                                    var colorLoaded: boolean = true;
                                    if (ch == LongTreeNode.RED) {
                                        colorLoaded = false;
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
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = new org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode(key, value, colorLoaded, null, null);
                                    var left: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode.internal_unserialize(false, ctx);
                                    if (left != null) {
                                        left.setParent(p);
                                    }
                                    var right: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode.internal_unserialize(true, ctx);
                                    if (right != null) {
                                        right.setParent(p);
                                    }
                                    p.setLeft(left);
                                    p.setRight(right);
                                    return p;
                                }

                            }

                            export class OOKLongLongTree implements org.kevoree.modeling.memory.KCacheElement, org.kevoree.modeling.memory.struct.tree.KLongLongTree {

                                private root: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = null;
                                private _size: number = 0;
                                public _dirty: boolean = false;
                                private _counter: number = 0;
                                private _previousOrEqualsCacheValues: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode[] = null;
                                private _previousOrEqualsNextCacheElem: number;
                                private _lookupCacheValues: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode[] = null;
                                private _lookupNextCacheElem: number;
                                public size(): number {
                                    return this._size;
                                }

                                public counter(): number {
                                    return this._counter;
                                }

                                public inc(): void {
                                    this._counter++;
                                }

                                public dec(): void {
                                    this._counter--;
                                }

                                public free(metaModel: org.kevoree.modeling.meta.MetaModel): void {
                                }

                                public toString(): string {
                                    return this.serialize(null);
                                }

                                public isDirty(): boolean {
                                    return this._dirty;
                                }

                                public setDirty(): void {
                                    this._dirty = true;
                                }

                                public serialize(metaModel: org.kevoree.modeling.meta.MetaModel): string {
                                    var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                                    builder.append(this._size);
                                    if (this.root != null) {
                                        this.root.serialize(builder);
                                    }
                                    return builder.toString();
                                }

                                constructor() {
                                    this._lookupCacheValues = new Array();
                                    this._previousOrEqualsCacheValues = new Array();
                                    this._previousOrEqualsNextCacheElem = 0;
                                    this._lookupNextCacheElem = 0;
                                }

                                private tryPreviousOrEqualsCache(key: number): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    if (this._previousOrEqualsCacheValues != null) {
                                        for (var i: number = 0; i < this._previousOrEqualsNextCacheElem; i++) {
                                            if (this._previousOrEqualsCacheValues[i] != null && key == this._previousOrEqualsCacheValues[i].key) {
                                                return this._previousOrEqualsCacheValues[i];
                                            }
                                        }
                                    }
                                    return null;
                                }

                                private tryLookupCache(key: number): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    if (this._lookupCacheValues != null) {
                                        for (var i: number = 0; i < this._lookupNextCacheElem; i++) {
                                            if (this._lookupCacheValues[i] != null && key == this._lookupCacheValues[i].key) {
                                                return this._lookupCacheValues[i];
                                            }
                                        }
                                    }
                                    return null;
                                }

                                private resetCache(): void {
                                    this._previousOrEqualsNextCacheElem = 0;
                                    this._lookupNextCacheElem = 0;
                                }

                                private putInPreviousOrEqualsCache(resolved: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    if (this._previousOrEqualsNextCacheElem == org.kevoree.modeling.KConfig.TREE_CACHE_SIZE) {
                                        this._previousOrEqualsNextCacheElem = 0;
                                    }
                                    this._previousOrEqualsCacheValues[this._previousOrEqualsNextCacheElem] = resolved;
                                    this._previousOrEqualsNextCacheElem++;
                                }

                                private putInLookupCache(resolved: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    if (this._lookupNextCacheElem == org.kevoree.modeling.KConfig.TREE_CACHE_SIZE) {
                                        this._lookupNextCacheElem = 0;
                                    }
                                    this._lookupCacheValues[this._lookupNextCacheElem] = resolved;
                                    this._lookupNextCacheElem++;
                                }

                                public setClean(metaModel: org.kevoree.modeling.meta.MetaModel): void {
                                    this._dirty = false;
                                }

                                public unserialize(key: org.kevoree.modeling.memory.KContentKey, payload: string, metaModel: org.kevoree.modeling.meta.MetaModel): void {
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
                                    var ctx: org.kevoree.modeling.memory.struct.tree.ooheap.TreeReaderContext = new org.kevoree.modeling.memory.struct.tree.ooheap.TreeReaderContext();
                                    ctx.index = i;
                                    ctx.payload = payload;
                                    ctx.buffer = new Array();
                                    this.root = org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode.unserialize(ctx);
                                    this._dirty = false;
                                    this.resetCache();
                                }

                                public lookupValue(key: number): number {
                                    var result: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = this.internal_lookup(key);
                                    if (result != null) {
                                        return result.value;
                                    } else {
                                        return org.kevoree.modeling.KConfig.NULL_LONG;
                                    }
                                }

                                private internal_lookup(key: number): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    var n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = this.tryLookupCache(key);
                                    if (n != null) {
                                        return n;
                                    }
                                    n = this.root;
                                    if (n == null) {
                                        return null;
                                    }
                                    while (n != null){
                                        if (key == n.key) {
                                            this.putInLookupCache(n);
                                            return n;
                                        } else {
                                            if (key < n.key) {
                                                n = n.getLeft();
                                            } else {
                                                n = n.getRight();
                                            }
                                        }
                                    }
                                    this.putInLookupCache(null);
                                    return n;
                                }

                                public previousOrEqualValue(key: number): number {
                                    var result: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = this.internal_previousOrEqual(key);
                                    if (result != null) {
                                        return result.value;
                                    } else {
                                        return org.kevoree.modeling.KConfig.NULL_LONG;
                                    }
                                }

                                private internal_previousOrEqual(key: number): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = this.tryPreviousOrEqualsCache(key);
                                    if (p != null) {
                                        return p;
                                    }
                                    p = this.root;
                                    if (p == null) {
                                        return null;
                                    }
                                    while (p != null){
                                        if (key == p.key) {
                                            this.putInPreviousOrEqualsCache(p);
                                            return p;
                                        }
                                        if (key > p.key) {
                                            if (p.getRight() != null) {
                                                p = p.getRight();
                                            } else {
                                                this.putInPreviousOrEqualsCache(p);
                                                return p;
                                            }
                                        } else {
                                            if (p.getLeft() != null) {
                                                p = p.getLeft();
                                            } else {
                                                var parent: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = p.getParent();
                                                var ch: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = p;
                                                while (parent != null && ch == parent.getLeft()){
                                                    ch = parent;
                                                    parent = parent.getParent();
                                                }
                                                this.putInPreviousOrEqualsCache(parent);
                                                return parent;
                                            }
                                        }
                                    }
                                    return null;
                                }

                                public nextOrEqual(key: number): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = this.root;
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
                                                var parent: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = p.getParent();
                                                var ch: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = p;
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

                                public previous(key: number): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = this.root;
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

                                public next(key: number): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = this.root;
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

                                public first(): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = this.root;
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

                                public last(): org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode {
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = this.root;
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

                                private rotateLeft(n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    var r: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = n.getRight();
                                    this.replaceNode(n, r);
                                    n.setRight(r.getLeft());
                                    if (r.getLeft() != null) {
                                        r.getLeft().setParent(n);
                                    }
                                    r.setLeft(n);
                                    n.setParent(r);
                                }

                                private rotateRight(n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    var l: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = n.getLeft();
                                    this.replaceNode(n, l);
                                    n.setLeft(l.getRight());
                                    if (l.getRight() != null) {
                                        l.getRight().setParent(n);
                                    }
                                    l.setRight(n);
                                    n.setParent(l);
                                }

                                private replaceNode(oldn: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode, newn: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
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
                                    this.resetCache();
                                    this._dirty = true;
                                    var insertedNode: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = new org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode(key, value, false, null, null);
                                    if (this.root == null) {
                                        this._size++;
                                        this.root = insertedNode;
                                    } else {
                                        var n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = this.root;
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

                                private insertCase1(n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    if (n.getParent() == null) {
                                        n.color = true;
                                    } else {
                                        this.insertCase2(n);
                                    }
                                }

                                private insertCase2(n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    if (this.nodeColor(n.getParent()) == true) {
                                        return;
                                    } else {
                                        this.insertCase3(n);
                                    }
                                }

                                private insertCase3(n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    if (this.nodeColor(n.uncle()) == false) {
                                        n.getParent().color = true;
                                        n.uncle().color = true;
                                        n.grandparent().color = false;
                                        this.insertCase1(n.grandparent());
                                    } else {
                                        this.insertCase4(n);
                                    }
                                }

                                private insertCase4(n_n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    var n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = n_n;
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

                                private insertCase5(n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    n.getParent().color = true;
                                    n.grandparent().color = false;
                                    if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getLeft()) {
                                        this.rotateRight(n.grandparent());
                                    } else {
                                        this.rotateLeft(n.grandparent());
                                    }
                                }

                                public delete(key: number): void {
                                    var n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = this.internal_lookup(key);
                                    if (n == null) {
                                        return;
                                    } else {
                                        this._size--;
                                        if (n.getLeft() != null && n.getRight() != null) {
                                            var pred: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode = n.getLeft();
                                            while (pred.getRight() != null){
                                                pred = pred.getRight();
                                            }
                                            n.key = pred.key;
                                            n.value = pred.value;
                                            n = pred;
                                        }
                                        var child: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode;
                                        if (n.getRight() == null) {
                                            child = n.getLeft();
                                        } else {
                                            child = n.getRight();
                                        }
                                        if (this.nodeColor(n) == true) {
                                            n.color = this.nodeColor(child);
                                            this.deleteCase1(n);
                                        }
                                        this.replaceNode(n, child);
                                    }
                                }

                                private deleteCase1(n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    if (n.getParent() == null) {
                                        return;
                                    } else {
                                        this.deleteCase2(n);
                                    }
                                }

                                private deleteCase2(n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    if (this.nodeColor(n.sibling()) == false) {
                                        n.getParent().color = false;
                                        n.sibling().color = true;
                                        if (n == n.getParent().getLeft()) {
                                            this.rotateLeft(n.getParent());
                                        } else {
                                            this.rotateRight(n.getParent());
                                        }
                                    }
                                    this.deleteCase3(n);
                                }

                                private deleteCase3(n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    if (this.nodeColor(n.getParent()) == true && this.nodeColor(n.sibling()) == true && this.nodeColor(n.sibling().getLeft()) == true && this.nodeColor(n.sibling().getRight()) == true) {
                                        n.sibling().color = false;
                                        this.deleteCase1(n.getParent());
                                    } else {
                                        this.deleteCase4(n);
                                    }
                                }

                                private deleteCase4(n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    if (this.nodeColor(n.getParent()) == false && this.nodeColor(n.sibling()) == true && this.nodeColor(n.sibling().getLeft()) == true && this.nodeColor(n.sibling().getRight()) == true) {
                                        n.sibling().color = false;
                                        n.getParent().color = true;
                                    } else {
                                        this.deleteCase5(n);
                                    }
                                }

                                private deleteCase5(n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    if (n == n.getParent().getLeft() && this.nodeColor(n.sibling()) == true && this.nodeColor(n.sibling().getLeft()) == false && this.nodeColor(n.sibling().getRight()) == true) {
                                        n.sibling().color = false;
                                        n.sibling().getLeft().color = true;
                                        this.rotateRight(n.sibling());
                                    } else {
                                        if (n == n.getParent().getRight() && this.nodeColor(n.sibling()) == true && this.nodeColor(n.sibling().getRight()) == false && this.nodeColor(n.sibling().getLeft()) == true) {
                                            n.sibling().color = false;
                                            n.sibling().getRight().color = true;
                                            this.rotateLeft(n.sibling());
                                        }
                                    }
                                    this.deleteCase6(n);
                                }

                                private deleteCase6(n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): void {
                                    n.sibling().color = this.nodeColor(n.getParent());
                                    n.getParent().color = true;
                                    if (n == n.getParent().getLeft()) {
                                        n.sibling().getRight().color = true;
                                        this.rotateLeft(n.getParent());
                                    } else {
                                        n.sibling().getLeft().color = true;
                                        this.rotateRight(n.getParent());
                                    }
                                }

                                private nodeColor(n: org.kevoree.modeling.memory.struct.tree.ooheap.LongTreeNode): boolean {
                                    if (n == null) {
                                        return true;
                                    } else {
                                        return n.color;
                                    }
                                }

                            }

                            export class OOKLongTree implements org.kevoree.modeling.memory.KCacheElement, org.kevoree.modeling.memory.struct.tree.KLongTree {

                                private _size: number = 0;
                                private root: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = null;
                                private _previousOrEqualsCacheValues: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode[] = null;
                                private _nextCacheElem: number;
                                private _counter: number = 0;
                                private _dirty: boolean = false;
                                constructor() {
                                    this._previousOrEqualsCacheValues = new Array();
                                    this._nextCacheElem = 0;
                                }

                                public size(): number {
                                    return this._size;
                                }

                                public counter(): number {
                                    return this._counter;
                                }

                                public inc(): void {
                                    this._counter++;
                                }

                                public dec(): void {
                                    this._counter--;
                                }

                                public free(metaModel: org.kevoree.modeling.meta.MetaModel): void {
                                }

                                private tryPreviousOrEqualsCache(key: number): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
                                    if (this._previousOrEqualsCacheValues != null) {
                                        for (var i: number = 0; i < this._nextCacheElem; i++) {
                                            if (this._previousOrEqualsCacheValues[i] != null && this._previousOrEqualsCacheValues[i].key == key) {
                                                return this._previousOrEqualsCacheValues[i];
                                            }
                                        }
                                        return null;
                                    } else {
                                        return null;
                                    }
                                }

                                private resetCache(): void {
                                    this._nextCacheElem = 0;
                                }

                                private putInPreviousOrEqualsCache(resolved: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    if (this._nextCacheElem == org.kevoree.modeling.KConfig.TREE_CACHE_SIZE) {
                                        this._nextCacheElem = 0;
                                    }
                                    this._previousOrEqualsCacheValues[this._nextCacheElem] = resolved;
                                    this._nextCacheElem++;
                                }

                                public isDirty(): boolean {
                                    return this._dirty;
                                }

                                public setClean(metaModel: org.kevoree.modeling.meta.MetaModel): void {
                                    this._dirty = false;
                                }

                                public setDirty(): void {
                                    this._dirty = true;
                                }

                                public serialize(metaModel: org.kevoree.modeling.meta.MetaModel): string {
                                    var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                                    builder.append(this._size);
                                    if (this.root != null) {
                                        this.root.serialize(builder);
                                    }
                                    return builder.toString();
                                }

                                public toString(): string {
                                    return this.serialize(null);
                                }

                                public unserialize(key: org.kevoree.modeling.memory.KContentKey, payload: string, metaModel: org.kevoree.modeling.meta.MetaModel): void {
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
                                    var ctx: org.kevoree.modeling.memory.struct.tree.ooheap.TreeReaderContext = new org.kevoree.modeling.memory.struct.tree.ooheap.TreeReaderContext();
                                    ctx.index = i;
                                    ctx.payload = payload;
                                    this.root = org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode.unserialize(ctx);
                                    this.resetCache();
                                }

                                public previousOrEqual(key: number): number {
                                    var resolvedNode: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = this.internal_previousOrEqual(key);
                                    if (resolvedNode != null) {
                                        return resolvedNode.key;
                                    }
                                    return org.kevoree.modeling.KConfig.NULL_LONG;
                                }

                                public internal_previousOrEqual(key: number): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
                                    var cachedVal: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = this.tryPreviousOrEqualsCache(key);
                                    if (cachedVal != null) {
                                        return cachedVal;
                                    }
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = this.root;
                                    if (p == null) {
                                        return null;
                                    }
                                    while (p != null){
                                        if (key == p.key) {
                                            this.putInPreviousOrEqualsCache(p);
                                            return p;
                                        }
                                        if (key > p.key) {
                                            if (p.getRight() != null) {
                                                p = p.getRight();
                                            } else {
                                                this.putInPreviousOrEqualsCache(p);
                                                return p;
                                            }
                                        } else {
                                            if (p.getLeft() != null) {
                                                p = p.getLeft();
                                            } else {
                                                var parent: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = p.getParent();
                                                var ch: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = p;
                                                while (parent != null && ch == parent.getLeft()){
                                                    ch = parent;
                                                    parent = parent.getParent();
                                                }
                                                this.putInPreviousOrEqualsCache(parent);
                                                return parent;
                                            }
                                        }
                                    }
                                    return null;
                                }

                                public nextOrEqual(key: number): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = this.root;
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
                                                var parent: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = p.getParent();
                                                var ch: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = p;
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

                                public previous(key: number): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = this.root;
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

                                public next(key: number): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = this.root;
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

                                public first(): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = this.root;
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

                                public last(): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = this.root;
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

                                public lookup(key: number): number {
                                    var n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = this.root;
                                    if (n == null) {
                                        return org.kevoree.modeling.KConfig.NULL_LONG;
                                    }
                                    while (n != null){
                                        if (key == n.key) {
                                            return n.key;
                                        } else {
                                            if (key < n.key) {
                                                n = n.getLeft();
                                            } else {
                                                n = n.getRight();
                                            }
                                        }
                                    }
                                    return org.kevoree.modeling.KConfig.NULL_LONG;
                                }

                                public range(start: number, end: number, walker: (p : number) => void): void {
                                    var it: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = this.internal_previousOrEqual(end);
                                    while (it != null && it.key >= start){
                                        walker(it.key);
                                        it = it.previous();
                                    }
                                }

                                private rotateLeft(n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    var r: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = n.getRight();
                                    this.replaceNode(n, r);
                                    n.setRight(r.getLeft());
                                    if (r.getLeft() != null) {
                                        r.getLeft().setParent(n);
                                    }
                                    r.setLeft(n);
                                    n.setParent(r);
                                }

                                private rotateRight(n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    var l: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = n.getLeft();
                                    this.replaceNode(n, l);
                                    n.setLeft(l.getRight());
                                    if (l.getRight() != null) {
                                        l.getRight().setParent(n);
                                    }
                                    l.setRight(n);
                                    n.setParent(l);
                                }

                                private replaceNode(oldn: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode, newn: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
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
                                    var insertedNode: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode;
                                    if (this.root == null) {
                                        this._size++;
                                        insertedNode = new org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode(key, false, null, null);
                                        this.root = insertedNode;
                                    } else {
                                        var n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = this.root;
                                        while (true){
                                            if (key == n.key) {
                                                this.putInPreviousOrEqualsCache(n);
                                                return;
                                            } else {
                                                if (key < n.key) {
                                                    if (n.getLeft() == null) {
                                                        insertedNode = new org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode(key, false, null, null);
                                                        n.setLeft(insertedNode);
                                                        this._size++;
                                                        break;
                                                    } else {
                                                        n = n.getLeft();
                                                    }
                                                } else {
                                                    if (n.getRight() == null) {
                                                        insertedNode = new org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode(key, false, null, null);
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
                                    this.putInPreviousOrEqualsCache(insertedNode);
                                }

                                private insertCase1(n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    if (n.getParent() == null) {
                                        n.color = true;
                                    } else {
                                        this.insertCase2(n);
                                    }
                                }

                                private insertCase2(n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    if (this.nodeColor(n.getParent()) == true) {
                                        return;
                                    } else {
                                        this.insertCase3(n);
                                    }
                                }

                                private insertCase3(n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    if (this.nodeColor(n.uncle()) == false) {
                                        n.getParent().color = true;
                                        n.uncle().color = true;
                                        n.grandparent().color = false;
                                        this.insertCase1(n.grandparent());
                                    } else {
                                        this.insertCase4(n);
                                    }
                                }

                                private insertCase4(n_n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    var n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = n_n;
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

                                private insertCase5(n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    n.getParent().color = true;
                                    n.grandparent().color = false;
                                    if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getLeft()) {
                                        this.rotateRight(n.grandparent());
                                    } else {
                                        this.rotateLeft(n.grandparent());
                                    }
                                }

                                public delete(key: number): void {
                                    var n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = null;
                                    var nn: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = this.root;
                                    while (nn != null){
                                        if (key == nn.key) {
                                            n = nn;
                                        } else {
                                            if (key < nn.key) {
                                                nn = nn.getLeft();
                                            } else {
                                                nn = nn.getRight();
                                            }
                                        }
                                    }
                                    if (n == null) {
                                        return;
                                    } else {
                                        this._size--;
                                        if (n.getLeft() != null && n.getRight() != null) {
                                            var pred: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = n.getLeft();
                                            while (pred.getRight() != null){
                                                pred = pred.getRight();
                                            }
                                            n.key = pred.key;
                                            n = pred;
                                        }
                                        var child: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode;
                                        if (n.getRight() == null) {
                                            child = n.getLeft();
                                        } else {
                                            child = n.getRight();
                                        }
                                        if (this.nodeColor(n) == true) {
                                            n.color = this.nodeColor(child);
                                            this.deleteCase1(n);
                                        }
                                        this.replaceNode(n, child);
                                    }
                                }

                                private deleteCase1(n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    if (n.getParent() == null) {
                                        return;
                                    } else {
                                        this.deleteCase2(n);
                                    }
                                }

                                private deleteCase2(n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    if (this.nodeColor(n.sibling()) == false) {
                                        n.getParent().color = false;
                                        n.sibling().color = true;
                                        if (n == n.getParent().getLeft()) {
                                            this.rotateLeft(n.getParent());
                                        } else {
                                            this.rotateRight(n.getParent());
                                        }
                                    }
                                    this.deleteCase3(n);
                                }

                                private deleteCase3(n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    if (this.nodeColor(n.getParent()) == true && this.nodeColor(n.sibling()) == true && this.nodeColor(n.sibling().getLeft()) == true && this.nodeColor(n.sibling().getRight()) == true) {
                                        n.sibling().color = false;
                                        this.deleteCase1(n.getParent());
                                    } else {
                                        this.deleteCase4(n);
                                    }
                                }

                                private deleteCase4(n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    if (this.nodeColor(n.getParent()) == false && this.nodeColor(n.sibling()) == true && this.nodeColor(n.sibling().getLeft()) == true && this.nodeColor(n.sibling().getRight()) == true) {
                                        n.sibling().color = false;
                                        n.getParent().color = true;
                                    } else {
                                        this.deleteCase5(n);
                                    }
                                }

                                private deleteCase5(n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    if (n == n.getParent().getLeft() && this.nodeColor(n.sibling()) == true && this.nodeColor(n.sibling().getLeft()) == false && this.nodeColor(n.sibling().getRight()) == true) {
                                        n.sibling().color = false;
                                        n.sibling().getLeft().color = true;
                                        this.rotateRight(n.sibling());
                                    } else {
                                        if (n == n.getParent().getRight() && this.nodeColor(n.sibling()) == true && this.nodeColor(n.sibling().getRight()) == false && this.nodeColor(n.sibling().getLeft()) == true) {
                                            n.sibling().color = false;
                                            n.sibling().getRight().color = true;
                                            this.rotateLeft(n.sibling());
                                        }
                                    }
                                    this.deleteCase6(n);
                                }

                                private deleteCase6(n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    n.sibling().color = this.nodeColor(n.getParent());
                                    n.getParent().color = true;
                                    if (n == n.getParent().getLeft()) {
                                        n.sibling().getRight().color = true;
                                        this.rotateLeft(n.getParent());
                                    } else {
                                        n.sibling().getLeft().color = true;
                                        this.rotateRight(n.getParent());
                                    }
                                }

                                private nodeColor(n: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): boolean {
                                    if (n == null) {
                                        return true;
                                    } else {
                                        return n.color;
                                    }
                                }

                            }

                            export class TreeNode {

                                public static BLACK: string = '0';
                                public static RED: string = '1';
                                public key: number;
                                public color: boolean;
                                private left: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode;
                                private right: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode;
                                private parent: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = null;
                                constructor(key: number, color: boolean, left: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode, right: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode) {
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

                                public getKey(): number {
                                    return this.key;
                                }

                                public grandparent(): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
                                    if (this.parent != null) {
                                        return this.parent.parent;
                                    } else {
                                        return null;
                                    }
                                }

                                public sibling(): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
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

                                public uncle(): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
                                    if (this.parent != null) {
                                        return this.parent.sibling();
                                    } else {
                                        return null;
                                    }
                                }

                                public getLeft(): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
                                    return this.left;
                                }

                                public setLeft(left: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    this.left = left;
                                }

                                public getRight(): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
                                    return this.right;
                                }

                                public setRight(right: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    this.right = right;
                                }

                                public getParent(): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
                                    return this.parent;
                                }

                                public setParent(parent: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode): void {
                                    this.parent = parent;
                                }

                                public serialize(builder: java.lang.StringBuilder): void {
                                    builder.append("|");
                                    if (this.color == true) {
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

                                public next(): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = this;
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

                                public previous(): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = this;
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

                                public static unserialize(ctx: org.kevoree.modeling.memory.struct.tree.ooheap.TreeReaderContext): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
                                    return org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode.internal_unserialize(true, ctx);
                                }

                                public static internal_unserialize(rightBranch: boolean, ctx: org.kevoree.modeling.memory.struct.tree.ooheap.TreeReaderContext): org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode {
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
                                    var colorLoaded: boolean;
                                    if (ch == org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode.BLACK) {
                                        colorLoaded = true;
                                    } else {
                                        colorLoaded = false;
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
                                    var p: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = new org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode(java.lang.Long.parseLong(tokenBuild.toString()), colorLoaded, null, null);
                                    var left: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode.internal_unserialize(false, ctx);
                                    if (left != null) {
                                        left.setParent(p);
                                    }
                                    var right: org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode = org.kevoree.modeling.memory.struct.tree.ooheap.TreeNode.internal_unserialize(true, ctx);
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
                    }
                }
            }
            export module meta {
                export interface Meta {

                    index(): number;

                    metaName(): string;

                    metaType(): org.kevoree.modeling.meta.MetaType;

                }

                export interface MetaAttribute extends org.kevoree.modeling.meta.Meta {

                    key(): boolean;

                    attributeType(): org.kevoree.modeling.KType;

                    strategy(): org.kevoree.modeling.extrapolation.Extrapolation;

                    precision(): number;

                    setExtrapolation(extrapolation: org.kevoree.modeling.extrapolation.Extrapolation): void;

                }

                export interface MetaClass extends org.kevoree.modeling.meta.Meta {

                    metaElements(): org.kevoree.modeling.meta.Meta[];

                    meta(index: number): org.kevoree.modeling.meta.Meta;

                    metaAttributes(): org.kevoree.modeling.meta.MetaAttribute[];

                    metaReferences(): org.kevoree.modeling.meta.MetaReference[];

                    metaByName(name: string): org.kevoree.modeling.meta.Meta;

                    attribute(name: string): org.kevoree.modeling.meta.MetaAttribute;

                    reference(name: string): org.kevoree.modeling.meta.MetaReference;

                    operation(name: string): org.kevoree.modeling.meta.MetaOperation;

                }

                export class MetaInferClass implements org.kevoree.modeling.meta.MetaClass {

                    private static _INSTANCE: org.kevoree.modeling.meta.MetaInferClass = null;
                    private _attributes: org.kevoree.modeling.meta.MetaAttribute[] = null;
                    private _metaReferences: org.kevoree.modeling.meta.MetaReference[] = new Array();
                    public static getInstance(): org.kevoree.modeling.meta.MetaInferClass {
                        if (MetaInferClass._INSTANCE == null) {
                            MetaInferClass._INSTANCE = new org.kevoree.modeling.meta.MetaInferClass();
                        }
                        return MetaInferClass._INSTANCE;
                    }

                    public getRaw(): org.kevoree.modeling.meta.MetaAttribute {
                        return this._attributes[0];
                    }

                    public getCache(): org.kevoree.modeling.meta.MetaAttribute {
                        return this._attributes[1];
                    }

                    constructor() {
                        this._attributes = new Array();
                        this._attributes[0] = new org.kevoree.modeling.abs.AbstractMetaAttribute("RAW", 0, -1, false, org.kevoree.modeling.meta.PrimitiveTypes.STRING, new org.kevoree.modeling.extrapolation.DiscreteExtrapolation());
                        this._attributes[1] = new org.kevoree.modeling.abs.AbstractMetaAttribute("CACHE", 1, -1, false, org.kevoree.modeling.meta.PrimitiveTypes.TRANSIENT, new org.kevoree.modeling.extrapolation.DiscreteExtrapolation());
                    }

                    public metaElements(): org.kevoree.modeling.meta.Meta[] {
                        return new Array();
                    }

                    public meta(index: number): org.kevoree.modeling.meta.Meta {
                        if (index == 0 || index == 1) {
                            return this._attributes[index];
                        } else {
                            return null;
                        }
                    }

                    public metaAttributes(): org.kevoree.modeling.meta.MetaAttribute[] {
                        return this._attributes;
                    }

                    public metaReferences(): org.kevoree.modeling.meta.MetaReference[] {
                        return this._metaReferences;
                    }

                    public metaByName(name: string): org.kevoree.modeling.meta.Meta {
                        return this.attribute(name);
                    }

                    public attribute(name: string): org.kevoree.modeling.meta.MetaAttribute {
                        if (name == null) {
                            return null;
                        } else {
                            if (name.equals(this._attributes[0].metaName())) {
                                return this._attributes[0];
                            } else {
                                if (name.equals(this._attributes[1].metaName())) {
                                    return this._attributes[1];
                                } else {
                                    return null;
                                }
                            }
                        }
                    }

                    public reference(name: string): org.kevoree.modeling.meta.MetaReference {
                        return null;
                    }

                    public operation(name: string): org.kevoree.modeling.meta.MetaOperation {
                        return null;
                    }

                    public metaName(): string {
                        return "KInfer";
                    }

                    public metaType(): org.kevoree.modeling.meta.MetaType {
                        return org.kevoree.modeling.meta.MetaType.CLASS;
                    }

                    public index(): number {
                        return -1;
                    }

                }

                export interface MetaModel extends org.kevoree.modeling.meta.Meta {

                    metaClasses(): org.kevoree.modeling.meta.MetaClass[];

                    metaClassByName(name: string): org.kevoree.modeling.meta.MetaClass;

                    metaClass(index: number): org.kevoree.modeling.meta.MetaClass;

                }

                export interface MetaOperation extends org.kevoree.modeling.meta.Meta {

                    origin(): org.kevoree.modeling.meta.Meta;

                }

                export interface MetaReference extends org.kevoree.modeling.meta.Meta {

                    visible(): boolean;

                    single(): boolean;

                    type(): org.kevoree.modeling.meta.MetaClass;

                    opposite(): org.kevoree.modeling.meta.MetaReference;

                    origin(): org.kevoree.modeling.meta.MetaClass;

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

                    public static STRING: org.kevoree.modeling.KType = new org.kevoree.modeling.abs.AbstractKDataType("STRING", false);
                    public static LONG: org.kevoree.modeling.KType = new org.kevoree.modeling.abs.AbstractKDataType("LONG", false);
                    public static INT: org.kevoree.modeling.KType = new org.kevoree.modeling.abs.AbstractKDataType("INT", false);
                    public static BOOL: org.kevoree.modeling.KType = new org.kevoree.modeling.abs.AbstractKDataType("BOOL", false);
                    public static SHORT: org.kevoree.modeling.KType = new org.kevoree.modeling.abs.AbstractKDataType("SHORT", false);
                    public static DOUBLE: org.kevoree.modeling.KType = new org.kevoree.modeling.abs.AbstractKDataType("DOUBLE", false);
                    public static FLOAT: org.kevoree.modeling.KType = new org.kevoree.modeling.abs.AbstractKDataType("FLOAT", false);
                    public static TRANSIENT: org.kevoree.modeling.KType = new org.kevoree.modeling.abs.AbstractKDataType("TRANSIENT", false);
                }

                export module reflexive {
                    export class DynamicKModel extends org.kevoree.modeling.abs.AbstractKModel<any> {

                        private _metaModel: org.kevoree.modeling.meta.MetaModel = null;
                        public setMetaModel(p_metaModel: org.kevoree.modeling.meta.MetaModel): void {
                            this._metaModel = p_metaModel;
                        }

                        public metaModel(): org.kevoree.modeling.meta.MetaModel {
                            return this._metaModel;
                        }

                        public internalCreateUniverse(universe: number): org.kevoree.modeling.KUniverse<any, any, any> {
                            return new org.kevoree.modeling.meta.reflexive.DynamicKUniverse(universe, this._manager);
                        }

                        public internalCreateObject(universe: number, time: number, uuid: number, clazz: org.kevoree.modeling.meta.MetaClass): org.kevoree.modeling.KObject {
                            return new org.kevoree.modeling.meta.reflexive.DynamicKObject(universe, time, uuid, clazz, this._manager);
                        }

                    }

                    export class DynamicKObject extends org.kevoree.modeling.abs.AbstractKObject {

                        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: org.kevoree.modeling.meta.MetaClass, p_manager: org.kevoree.modeling.memory.KDataManager) {
                            super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
                        }

                    }

                    export class DynamicKUniverse extends org.kevoree.modeling.abs.AbstractKUniverse<any, any, any> {

                        constructor(p_key: number, p_manager: org.kevoree.modeling.memory.KDataManager) {
                            super(p_key, p_manager);
                        }

                        public internal_create(timePoint: number): org.kevoree.modeling.KView {
                            return new org.kevoree.modeling.meta.reflexive.DynamicKView(this._universe, timePoint, this._manager);
                        }

                    }

                    export class DynamicKView extends org.kevoree.modeling.abs.AbstractKView {

                        constructor(p_universe: number, _time: number, p_manager: org.kevoree.modeling.memory.KDataManager) {
                            super(p_universe, _time, p_manager);
                        }

                    }

                    export class DynamicMetaClass extends org.kevoree.modeling.abs.AbstractMetaClass {

                        private cached_meta: org.kevoree.modeling.memory.struct.map.StringHashMap<any> = new org.kevoree.modeling.memory.struct.map.StringHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        private _globalIndex: number = 0;
                        constructor(p_name: string, p_index: number) {
                            super(p_name, p_index);
                            this.internalInit();
                        }

                        public addAttribute(p_name: string, p_type: org.kevoree.modeling.KType): org.kevoree.modeling.meta.reflexive.DynamicMetaClass {
                            var tempAttribute: org.kevoree.modeling.abs.AbstractMetaAttribute = new org.kevoree.modeling.abs.AbstractMetaAttribute(p_name, this._globalIndex, -1, false, p_type, org.kevoree.modeling.extrapolation.DiscreteExtrapolation.instance());
                            this.cached_meta.put(tempAttribute.metaName(), tempAttribute);
                            this._globalIndex = this._globalIndex + 1;
                            this.internalInit();
                            return this;
                        }

                        private getOrCreate(p_name: string, p_oppositeName: string, p_oppositeClass: org.kevoree.modeling.meta.MetaClass, p_visible: boolean, p_single: boolean): org.kevoree.modeling.abs.AbstractMetaReference {
                            var previous: org.kevoree.modeling.abs.AbstractMetaReference = <org.kevoree.modeling.abs.AbstractMetaReference>this.reference(p_name);
                            if (previous != null) {
                                return previous;
                            }
                            var tempOrigin: org.kevoree.modeling.meta.MetaClass = this;
                            var tempReference: org.kevoree.modeling.abs.AbstractMetaReference = new org.kevoree.modeling.abs.AbstractMetaReference(p_name, this._globalIndex, p_visible, p_single,  () => {
                                return p_oppositeClass;
                            }, p_oppositeName,  () => {
                                return tempOrigin;
                            });
                            this.cached_meta.put(tempReference.metaName(), tempReference);
                            this._globalIndex = this._globalIndex + 1;
                            this.internalInit();
                            return tempReference;
                        }

                        public addReference(p_name: string, p_metaClass: org.kevoree.modeling.meta.MetaClass, oppositeName: string): org.kevoree.modeling.meta.reflexive.DynamicMetaClass {
                            var tempOrigin: org.kevoree.modeling.meta.MetaClass = this;
                            var opName: string = oppositeName;
                            if (opName == null) {
                                opName = "op_" + p_name;
                                (<org.kevoree.modeling.meta.reflexive.DynamicMetaClass>p_metaClass).getOrCreate(opName, p_name, this, false, false);
                            } else {
                                (<org.kevoree.modeling.meta.reflexive.DynamicMetaClass>p_metaClass).getOrCreate(opName, p_name, this, true, false);
                            }
                            var tempReference: org.kevoree.modeling.abs.AbstractMetaReference = new org.kevoree.modeling.abs.AbstractMetaReference(p_name, this._globalIndex, false, false,  () => {
                                return p_metaClass;
                            }, opName,  () => {
                                return tempOrigin;
                            });
                            this.cached_meta.put(tempReference.metaName(), tempReference);
                            this._globalIndex = this._globalIndex + 1;
                            this.internalInit();
                            return this;
                        }

                        public addOperation(p_name: string): org.kevoree.modeling.meta.reflexive.DynamicMetaClass {
                            var tempOrigin: org.kevoree.modeling.meta.MetaClass = this;
                            var tempOperation: org.kevoree.modeling.abs.AbstractMetaOperation = new org.kevoree.modeling.abs.AbstractMetaOperation(p_name, this._globalIndex,  () => {
                                return tempOrigin;
                            });
                            this.cached_meta.put(tempOperation.metaName(), tempOperation);
                            this._globalIndex = this._globalIndex + 1;
                            this.internalInit();
                            return this;
                        }

                        private internalInit(): void {
                            var tempMeta: org.kevoree.modeling.meta.Meta[] = new Array();
                            var loopKey: number[] = new Array();
                            this.cached_meta.each( (key : string, value : org.kevoree.modeling.meta.Meta) => {
                                tempMeta[value.index()] = value;
                            });
                            this.init(tempMeta);
                        }

                    }

                    export class DynamicMetaModel implements org.kevoree.modeling.meta.MetaModel {

                        private _metaName: string = null;
                        private _classes: org.kevoree.modeling.memory.struct.map.StringHashMap<any> = null;
                        constructor(p_metaName: string) {
                            this._metaName = p_metaName;
                            this._classes = new org.kevoree.modeling.memory.struct.map.StringHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        }

                        public metaClasses(): org.kevoree.modeling.meta.MetaClass[] {
                            var tempResult: org.kevoree.modeling.meta.MetaClass[] = new Array();
                            var loopI: number[] = new Array();
                            this._classes.each( (key : string, value : org.kevoree.modeling.meta.MetaClass) => {
                                tempResult[value.index()] = value;
                                loopI[0]++;
                            });
                            return tempResult;
                        }

                        public metaClassByName(name: string): org.kevoree.modeling.meta.MetaClass {
                            return this._classes.get(name);
                        }

                        public metaClass(index: number): org.kevoree.modeling.meta.MetaClass {
                            return this.metaClasses()[index];
                        }

                        public metaName(): string {
                            return this._metaName;
                        }

                        public metaType(): org.kevoree.modeling.meta.MetaType {
                            return org.kevoree.modeling.meta.MetaType.MODEL;
                        }

                        public index(): number {
                            return -1;
                        }

                        public createMetaClass(name: string): org.kevoree.modeling.meta.reflexive.DynamicMetaClass {
                            if (this._classes.containsKey(name)) {
                                return <org.kevoree.modeling.meta.reflexive.DynamicMetaClass>this._classes.get(name);
                            } else {
                                var dynamicMetaClass: org.kevoree.modeling.meta.reflexive.DynamicMetaClass = new org.kevoree.modeling.meta.reflexive.DynamicMetaClass(name, this._classes.size());
                                this._classes.put(name, dynamicMetaClass);
                                return dynamicMetaClass;
                            }
                        }

                        public model(): org.kevoree.modeling.KModel<any> {
                            var universe: org.kevoree.modeling.meta.reflexive.DynamicKModel = new org.kevoree.modeling.meta.reflexive.DynamicKModel();
                            universe.setMetaModel(this);
                            return universe;
                        }

                    }

                }
            }
            export module msg {
                export class KAtomicGetIncrementRequest implements org.kevoree.modeling.msg.KMessage {

                    public id: number;
                    public key: org.kevoree.modeling.memory.KContentKey;
                    public json(): string {
                        var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.msg.KMessageLoader.ID_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.key, org.kevoree.modeling.msg.KMessageLoader.KEY_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    }

                    public type(): number {
                        return org.kevoree.modeling.msg.KMessageLoader.ATOMIC_GET_INC_REQUEST_TYPE;
                    }

                }

                export class KAtomicGetIncrementResult implements org.kevoree.modeling.msg.KMessage {

                    public id: number;
                    public value: number;
                    public json(): string {
                        var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.msg.KMessageLoader.ID_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.value, org.kevoree.modeling.msg.KMessageLoader.VALUE_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    }

                    public type(): number {
                        return org.kevoree.modeling.msg.KMessageLoader.ATOMIC_GET_INC_RESULT_TYPE;
                    }

                }

                export class KEvents implements org.kevoree.modeling.msg.KMessage {

                    public _objIds: org.kevoree.modeling.memory.KContentKey[];
                    public _metaindexes: number[][];
                    private _size: number;
                    public allKeys(): org.kevoree.modeling.memory.KContentKey[] {
                        return this._objIds;
                    }

                    constructor(nbObject: number) {
                        this._objIds = new Array();
                        this._metaindexes = new Array();
                        this._size = nbObject;
                    }

                    public json(): string {
                        var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        buffer.append(",");
                        buffer.append("\"");
                        buffer.append(org.kevoree.modeling.msg.KMessageLoader.KEYS_NAME).append("\":[");
                        for (var i: number = 0; i < this._objIds.length; i++) {
                            if (i != 0) {
                                buffer.append(",");
                            }
                            buffer.append("\"");
                            buffer.append(this._objIds[i]);
                            buffer.append("\"");
                        }
                        buffer.append("]\n");
                        if (this._metaindexes != null) {
                            buffer.append(",");
                            buffer.append("\"");
                            buffer.append(org.kevoree.modeling.msg.KMessageLoader.VALUES_NAME).append("\":[");
                            for (var i: number = 0; i < this._metaindexes.length; i++) {
                                if (i != 0) {
                                    buffer.append(",");
                                }
                                buffer.append("\"");
                                var metaModified: number[] = this._metaindexes[i];
                                if (metaModified != null) {
                                    for (var j: number = 0; j < metaModified.length; j++) {
                                        if (j != 0) {
                                            buffer.append("%");
                                        }
                                        buffer.append(metaModified[j]);
                                    }
                                }
                                buffer.append("\"");
                            }
                            buffer.append("]\n");
                        }
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    }

                    public type(): number {
                        return org.kevoree.modeling.msg.KMessageLoader.EVENTS_TYPE;
                    }

                    public size(): number {
                        return this._size;
                    }

                    public setEvent(index: number, p_objId: org.kevoree.modeling.memory.KContentKey, p_metaIndexes: number[]): void {
                        this._objIds[index] = p_objId;
                        this._metaindexes[index] = p_metaIndexes;
                    }

                    public getKey(index: number): org.kevoree.modeling.memory.KContentKey {
                        return this._objIds[index];
                    }

                    public getIndexes(index: number): number[] {
                        return this._metaindexes[index];
                    }

                }

                export class KGetRequest implements org.kevoree.modeling.msg.KMessage {

                    public id: number;
                    public keys: org.kevoree.modeling.memory.KContentKey[];
                    public json(): string {
                        var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.msg.KMessageLoader.ID_NAME, buffer);
                        if (this.keys != null) {
                            buffer.append(",");
                            buffer.append("\"");
                            buffer.append(org.kevoree.modeling.msg.KMessageLoader.KEYS_NAME).append("\":[");
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
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    }

                    public type(): number {
                        return org.kevoree.modeling.msg.KMessageLoader.GET_REQ_TYPE;
                    }

                }

                export class KGetResult implements org.kevoree.modeling.msg.KMessage {

                    public id: number;
                    public values: string[];
                    public json(): string {
                        var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.msg.KMessageLoader.ID_NAME, buffer);
                        if (this.values != null) {
                            buffer.append(",");
                            buffer.append("\"");
                            buffer.append(org.kevoree.modeling.msg.KMessageLoader.VALUES_NAME).append("\":[");
                            for (var i: number = 0; i < this.values.length; i++) {
                                if (i != 0) {
                                    buffer.append(",");
                                }
                                buffer.append("\"");
                                buffer.append(org.kevoree.modeling.format.json.JsonString.encode(this.values[i]));
                                buffer.append("\"");
                            }
                            buffer.append("]\n");
                        }
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    }

                    public type(): number {
                        return org.kevoree.modeling.msg.KMessageLoader.GET_RES_TYPE;
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
                        builder.append(org.kevoree.modeling.msg.KMessageLoader.TYPE_NAME);
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
                    public static CLASS_IDX_NAME: string = "class";
                    public static PARAMETERS_NAME: string = "params";
                    public static EVENTS_TYPE: number = 0;
                    public static GET_REQ_TYPE: number = 1;
                    public static GET_RES_TYPE: number = 2;
                    public static PUT_REQ_TYPE: number = 3;
                    public static PUT_RES_TYPE: number = 4;
                    public static OPERATION_CALL_TYPE: number = 5;
                    public static OPERATION_RESULT_TYPE: number = 6;
                    public static ATOMIC_GET_INC_REQUEST_TYPE: number = 7;
                    public static ATOMIC_GET_INC_RESULT_TYPE: number = 8;
                    public static load(payload: string): org.kevoree.modeling.msg.KMessage {
                        if (payload == null) {
                            return null;
                        }
                        var objectReader: org.kevoree.modeling.format.json.JsonObjectReader = new org.kevoree.modeling.format.json.JsonObjectReader();
                        objectReader.parseObject(payload);
                        try {
                            var parsedType: number = java.lang.Integer.parseInt(objectReader.get(KMessageLoader.TYPE_NAME).toString());
                            if (parsedType == KMessageLoader.EVENTS_TYPE) {
                                var eventsMessage: org.kevoree.modeling.msg.KEvents = null;
                                if (objectReader.get(KMessageLoader.KEYS_NAME) != null) {
                                    var objIdsRaw: string[] = objectReader.getAsStringArray(KMessageLoader.KEYS_NAME);
                                    eventsMessage = new org.kevoree.modeling.msg.KEvents(objIdsRaw.length);
                                    var keys: org.kevoree.modeling.memory.KContentKey[] = new Array();
                                    for (var i: number = 0; i < objIdsRaw.length; i++) {
                                        try {
                                            keys[i] = org.kevoree.modeling.memory.KContentKey.create(objIdsRaw[i]);
                                        } catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                e.printStackTrace();
                                            }
                                         }
                                    }
                                    eventsMessage._objIds = keys;
                                    if (objectReader.get(KMessageLoader.VALUES_NAME) != null) {
                                        var metaInt: string[] = objectReader.getAsStringArray(KMessageLoader.VALUES_NAME);
                                        var metaIndexes: number[][] = new Array();
                                        for (var i: number = 0; i < metaInt.length; i++) {
                                            try {
                                                if (metaInt[i] != null) {
                                                    var splitted: string[] = metaInt[i].split("%");
                                                    var newMeta: number[] = new Array();
                                                    for (var h: number = 0; h < splitted.length; h++) {
                                                        if (splitted[h] != null && !splitted[h].isEmpty()) {
                                                            newMeta[h] = java.lang.Integer.parseInt(splitted[h]);
                                                        }
                                                    }
                                                    metaIndexes[i] = newMeta;
                                                }
                                            } catch ($ex$) {
                                                if ($ex$ instanceof java.lang.Exception) {
                                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                    e.printStackTrace();
                                                }
                                             }
                                        }
                                        eventsMessage._metaindexes = metaIndexes;
                                    }
                                }
                                return eventsMessage;
                            } else {
                                if (parsedType == KMessageLoader.GET_REQ_TYPE) {
                                    var getKeysRequest: org.kevoree.modeling.msg.KGetRequest = new org.kevoree.modeling.msg.KGetRequest();
                                    if (objectReader.get(KMessageLoader.ID_NAME) != null) {
                                        getKeysRequest.id = java.lang.Long.parseLong(objectReader.get(KMessageLoader.ID_NAME).toString());
                                    }
                                    if (objectReader.get(KMessageLoader.KEYS_NAME) != null) {
                                        var metaInt: string[] = objectReader.getAsStringArray(KMessageLoader.KEYS_NAME);
                                        var keys: org.kevoree.modeling.memory.KContentKey[] = new Array();
                                        for (var i: number = 0; i < metaInt.length; i++) {
                                            keys[i] = org.kevoree.modeling.memory.KContentKey.create(metaInt[i]);
                                        }
                                        getKeysRequest.keys = keys;
                                    }
                                    return getKeysRequest;
                                } else {
                                    if (parsedType == KMessageLoader.GET_RES_TYPE) {
                                        var getResult: org.kevoree.modeling.msg.KGetResult = new org.kevoree.modeling.msg.KGetResult();
                                        if (objectReader.get(KMessageLoader.ID_NAME) != null) {
                                            getResult.id = java.lang.Long.parseLong(objectReader.get(KMessageLoader.ID_NAME).toString());
                                        }
                                        if (objectReader.get(KMessageLoader.VALUES_NAME) != null) {
                                            var metaInt: string[] = objectReader.getAsStringArray(KMessageLoader.VALUES_NAME);
                                            var values: string[] = new Array();
                                            for (var i: number = 0; i < metaInt.length; i++) {
                                                values[i] = org.kevoree.modeling.format.json.JsonString.unescape(metaInt[i]);
                                            }
                                            getResult.values = values;
                                        }
                                        return getResult;
                                    } else {
                                        if (parsedType == KMessageLoader.PUT_REQ_TYPE) {
                                            var putRequest: org.kevoree.modeling.msg.KPutRequest = new org.kevoree.modeling.msg.KPutRequest();
                                            if (objectReader.get(KMessageLoader.ID_NAME) != null) {
                                                putRequest.id = java.lang.Long.parseLong(objectReader.get(KMessageLoader.ID_NAME).toString());
                                            }
                                            var toFlatKeys: string[] = null;
                                            var toFlatValues: string[] = null;
                                            if (objectReader.get(KMessageLoader.KEYS_NAME) != null) {
                                                toFlatKeys = objectReader.getAsStringArray(KMessageLoader.KEYS_NAME);
                                            }
                                            if (objectReader.get(KMessageLoader.VALUES_NAME) != null) {
                                                toFlatValues = objectReader.getAsStringArray(KMessageLoader.VALUES_NAME);
                                            }
                                            if (toFlatKeys != null && toFlatValues != null && toFlatKeys.length == toFlatValues.length) {
                                                if (putRequest.request == null) {
                                                    putRequest.request = new org.kevoree.modeling.memory.cdn.KContentPutRequest(toFlatKeys.length);
                                                }
                                                for (var i: number = 0; i < toFlatKeys.length; i++) {
                                                    putRequest.request.put(org.kevoree.modeling.memory.KContentKey.create(toFlatKeys[i]), org.kevoree.modeling.format.json.JsonString.unescape(toFlatValues[i]));
                                                }
                                            }
                                            return putRequest;
                                        } else {
                                            if (parsedType == KMessageLoader.PUT_RES_TYPE) {
                                                var putResult: org.kevoree.modeling.msg.KPutResult = new org.kevoree.modeling.msg.KPutResult();
                                                if (objectReader.get(KMessageLoader.ID_NAME) != null) {
                                                    putResult.id = java.lang.Long.parseLong(objectReader.get(KMessageLoader.ID_NAME).toString());
                                                }
                                                return putResult;
                                            } else {
                                                if (parsedType == KMessageLoader.OPERATION_CALL_TYPE) {
                                                    var callMessage: org.kevoree.modeling.msg.KOperationCallMessage = new org.kevoree.modeling.msg.KOperationCallMessage();
                                                    if (objectReader.get(KMessageLoader.ID_NAME) != null) {
                                                        callMessage.id = java.lang.Long.parseLong(objectReader.get(KMessageLoader.ID_NAME).toString());
                                                    }
                                                    if (objectReader.get(KMessageLoader.KEY_NAME) != null) {
                                                        callMessage.key = org.kevoree.modeling.memory.KContentKey.create(objectReader.get(KMessageLoader.KEY_NAME).toString());
                                                    }
                                                    if (objectReader.get(KMessageLoader.CLASS_IDX_NAME) != null) {
                                                        callMessage.classIndex = java.lang.Integer.parseInt(objectReader.get(KMessageLoader.CLASS_IDX_NAME).toString());
                                                    }
                                                    if (objectReader.get(KMessageLoader.OPERATION_NAME) != null) {
                                                        callMessage.opIndex = java.lang.Integer.parseInt(objectReader.get(KMessageLoader.OPERATION_NAME).toString());
                                                    }
                                                    if (objectReader.get(KMessageLoader.PARAMETERS_NAME) != null) {
                                                        var params: string[] = objectReader.getAsStringArray(KMessageLoader.PARAMETERS_NAME);
                                                        var toFlat: string[] = new Array();
                                                        for (var i: number = 0; i < params.length; i++) {
                                                            toFlat[i] = org.kevoree.modeling.format.json.JsonString.unescape(params[i]);
                                                        }
                                                        callMessage.params = toFlat;
                                                    }
                                                    return callMessage;
                                                } else {
                                                    if (parsedType == KMessageLoader.OPERATION_RESULT_TYPE) {
                                                        var resultMessage: org.kevoree.modeling.msg.KOperationResultMessage = new org.kevoree.modeling.msg.KOperationResultMessage();
                                                        if (objectReader.get(KMessageLoader.ID_NAME) != null) {
                                                            resultMessage.id = java.lang.Long.parseLong(objectReader.get(KMessageLoader.ID_NAME).toString());
                                                        }
                                                        if (objectReader.get(KMessageLoader.KEY_NAME) != null) {
                                                            resultMessage.key = org.kevoree.modeling.memory.KContentKey.create(objectReader.get(KMessageLoader.KEY_NAME).toString());
                                                        }
                                                        if (objectReader.get(KMessageLoader.VALUE_NAME) != null) {
                                                            resultMessage.value = objectReader.get(KMessageLoader.VALUE_NAME).toString();
                                                        }
                                                        return resultMessage;
                                                    } else {
                                                        if (parsedType == KMessageLoader.ATOMIC_GET_INC_REQUEST_TYPE) {
                                                            var atomicGetMessage: org.kevoree.modeling.msg.KAtomicGetIncrementRequest = new org.kevoree.modeling.msg.KAtomicGetIncrementRequest();
                                                            if (objectReader.get(KMessageLoader.ID_NAME) != null) {
                                                                atomicGetMessage.id = java.lang.Long.parseLong(objectReader.get(KMessageLoader.ID_NAME).toString());
                                                            }
                                                            if (objectReader.get(KMessageLoader.KEY_NAME) != null) {
                                                                atomicGetMessage.key = org.kevoree.modeling.memory.KContentKey.create(objectReader.get(KMessageLoader.KEY_NAME).toString());
                                                            }
                                                            return atomicGetMessage;
                                                        } else {
                                                            if (parsedType == KMessageLoader.ATOMIC_GET_INC_RESULT_TYPE) {
                                                                var atomicGetResultMessage: org.kevoree.modeling.msg.KAtomicGetIncrementResult = new org.kevoree.modeling.msg.KAtomicGetIncrementResult();
                                                                if (objectReader.get(KMessageLoader.ID_NAME) != null) {
                                                                    atomicGetResultMessage.id = java.lang.Long.parseLong(objectReader.get(KMessageLoader.ID_NAME).toString());
                                                                }
                                                                if (objectReader.get(KMessageLoader.VALUE_NAME) != null) {
                                                                    try {
                                                                        atomicGetResultMessage.value = java.lang.Short.parseShort(objectReader.get(KMessageLoader.VALUE_NAME).toString());
                                                                    } catch ($ex$) {
                                                                        if ($ex$ instanceof java.lang.Exception) {
                                                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                            e.printStackTrace();
                                                                        }
                                                                     }
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

                export class KOperationCallMessage implements org.kevoree.modeling.msg.KMessage {

                    public id: number;
                    public classIndex: number;
                    public opIndex: number;
                    public params: string[];
                    public key: org.kevoree.modeling.memory.KContentKey;
                    public json(): string {
                        var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.msg.KMessageLoader.ID_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.key, org.kevoree.modeling.msg.KMessageLoader.KEY_NAME, buffer);
                        buffer.append(",\"").append(org.kevoree.modeling.msg.KMessageLoader.CLASS_IDX_NAME).append("\":\"").append(this.classIndex).append("\"");
                        buffer.append(",\"").append(org.kevoree.modeling.msg.KMessageLoader.OPERATION_NAME).append("\":\"").append(this.opIndex).append("\"");
                        if (this.params != null) {
                            buffer.append(",\"");
                            buffer.append(org.kevoree.modeling.msg.KMessageLoader.PARAMETERS_NAME).append("\":[");
                            for (var i: number = 0; i < this.params.length; i++) {
                                if (i != 0) {
                                    buffer.append(",");
                                }
                                buffer.append("\"");
                                buffer.append(org.kevoree.modeling.format.json.JsonString.encode(this.params[i]));
                                buffer.append("\"");
                            }
                            buffer.append("]\n");
                        }
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    }

                    public type(): number {
                        return org.kevoree.modeling.msg.KMessageLoader.OPERATION_CALL_TYPE;
                    }

                }

                export class KOperationResultMessage implements org.kevoree.modeling.msg.KMessage {

                    public id: number;
                    public value: string;
                    public key: org.kevoree.modeling.memory.KContentKey;
                    public json(): string {
                        var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.msg.KMessageLoader.ID_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.key, org.kevoree.modeling.msg.KMessageLoader.KEY_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.value, org.kevoree.modeling.msg.KMessageLoader.VALUE_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    }

                    public type(): number {
                        return org.kevoree.modeling.msg.KMessageLoader.OPERATION_RESULT_TYPE;
                    }

                }

                export class KPutRequest implements org.kevoree.modeling.msg.KMessage {

                    public request: org.kevoree.modeling.memory.cdn.KContentPutRequest;
                    public id: number;
                    public json(): string {
                        var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.msg.KMessageLoader.ID_NAME, buffer);
                        if (this.request != null) {
                            buffer.append(",\"");
                            buffer.append(org.kevoree.modeling.msg.KMessageLoader.KEYS_NAME).append("\":[");
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
                            buffer.append(org.kevoree.modeling.msg.KMessageLoader.VALUES_NAME).append("\":[");
                            for (var i: number = 0; i < this.request.size(); i++) {
                                if (i != 0) {
                                    buffer.append(",");
                                }
                                buffer.append("\"");
                                buffer.append(org.kevoree.modeling.format.json.JsonString.encode(this.request.getContent(i)));
                                buffer.append("\"");
                            }
                            buffer.append("]\n");
                        }
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    }

                    public type(): number {
                        return org.kevoree.modeling.msg.KMessageLoader.PUT_REQ_TYPE;
                    }

                }

                export class KPutResult implements org.kevoree.modeling.msg.KMessage {

                    public id: number;
                    public json(): string {
                        var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                        org.kevoree.modeling.msg.KMessageHelper.printJsonStart(buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printType(buffer, this.type());
                        org.kevoree.modeling.msg.KMessageHelper.printElem(this.id, org.kevoree.modeling.msg.KMessageLoader.ID_NAME, buffer);
                        org.kevoree.modeling.msg.KMessageHelper.printJsonEnd(buffer);
                        return buffer.toString();
                    }

                    public type(): number {
                        return org.kevoree.modeling.msg.KMessageLoader.PUT_RES_TYPE;
                    }

                }

            }
            export module scheduler {
                export class DirectScheduler implements org.kevoree.modeling.KScheduler {

                    public dispatch(runnable: java.lang.Runnable): void {
                        runnable.run();
                    }

                    public stop(): void {
                    }

                }

                export class ExecutorServiceScheduler implements org.kevoree.modeling.KScheduler {

                    public dispatch(p_runnable: java.lang.Runnable): void {
                         p_runnable.run();
                    }

                    public stop(): void {
                    }

                }

            }
            export module traversal {
                export class DefaultKTraversal implements org.kevoree.modeling.traversal.KTraversal {

                    private static TERMINATED_MESSAGE: string = "Promise is terminated by the call of done method, please create another promise";
                    private _initObjs: org.kevoree.modeling.KObject[];
                    private _initAction: org.kevoree.modeling.traversal.KTraversalAction;
                    private _lastAction: org.kevoree.modeling.traversal.KTraversalAction;
                    private _terminated: boolean = false;
                    constructor(p_root: org.kevoree.modeling.KObject) {
                        this._initObjs = new Array();
                        this._initObjs[0] = p_root;
                    }

                    private internal_chain_action(p_action: org.kevoree.modeling.traversal.KTraversalAction): org.kevoree.modeling.traversal.KTraversal {
                        if (this._terminated) {
                            throw new java.lang.RuntimeException(DefaultKTraversal.TERMINATED_MESSAGE);
                        }
                        if (this._initAction == null) {
                            this._initAction = p_action;
                        }
                        if (this._lastAction != null) {
                            this._lastAction.chain(p_action);
                        }
                        this._lastAction = p_action;
                        return this;
                    }

                    public traverse(p_metaReference: org.kevoree.modeling.meta.MetaReference): org.kevoree.modeling.traversal.KTraversal {
                        return this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KTraverseAction(p_metaReference));
                    }

                    public traverseQuery(p_metaReferenceQuery: string): org.kevoree.modeling.traversal.KTraversal {
                        return this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KTraverseQueryAction(p_metaReferenceQuery));
                    }

                    public withAttribute(p_attribute: org.kevoree.modeling.meta.MetaAttribute, p_expectedValue: any): org.kevoree.modeling.traversal.KTraversal {
                        return this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KFilterAttributeAction(p_attribute, p_expectedValue));
                    }

                    public withoutAttribute(p_attribute: org.kevoree.modeling.meta.MetaAttribute, p_expectedValue: any): org.kevoree.modeling.traversal.KTraversal {
                        return this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KFilterNotAttributeAction(p_attribute, p_expectedValue));
                    }

                    public attributeQuery(p_attributeQuery: string): org.kevoree.modeling.traversal.KTraversal {
                        return this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KFilterAttributeQueryAction(p_attributeQuery));
                    }

                    public filter(p_filter: (p : org.kevoree.modeling.KObject) => boolean): org.kevoree.modeling.traversal.KTraversal {
                        return this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KFilterAction(p_filter));
                    }

                    public collect(metaReference: org.kevoree.modeling.meta.MetaReference, continueCondition: (p : org.kevoree.modeling.KObject) => boolean): org.kevoree.modeling.traversal.KTraversal {
                        return this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KDeepCollectAction(metaReference, continueCondition));
                    }

                    public then(cb: (p : org.kevoree.modeling.KObject[]) => void): void {
                        this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KFinalAction(cb));
                        this._terminated = true;
                        this._initAction.execute(this._initObjs);
                    }

                    public map(attribute: org.kevoree.modeling.meta.MetaAttribute, cb: (p : any[]) => void): void {
                        this.internal_chain_action(new org.kevoree.modeling.traversal.actions.KMapAction(attribute, cb));
                        this._terminated = true;
                        this._initAction.execute(this._initObjs);
                    }

                }

                export interface KTraversal {

                    traverse(metaReference: org.kevoree.modeling.meta.MetaReference): org.kevoree.modeling.traversal.KTraversal;

                    traverseQuery(metaReferenceQuery: string): org.kevoree.modeling.traversal.KTraversal;

                    attributeQuery(attributeQuery: string): org.kevoree.modeling.traversal.KTraversal;

                    withAttribute(attribute: org.kevoree.modeling.meta.MetaAttribute, expectedValue: any): org.kevoree.modeling.traversal.KTraversal;

                    withoutAttribute(attribute: org.kevoree.modeling.meta.MetaAttribute, expectedValue: any): org.kevoree.modeling.traversal.KTraversal;

                    filter(filter: (p : org.kevoree.modeling.KObject) => boolean): org.kevoree.modeling.traversal.KTraversal;

                    then(cb: (p : org.kevoree.modeling.KObject[]) => void): void;

                    map(attribute: org.kevoree.modeling.meta.MetaAttribute, cb: (p : any[]) => void): void;

                    collect(metaReference: org.kevoree.modeling.meta.MetaReference, continueCondition: (p : org.kevoree.modeling.KObject) => boolean): org.kevoree.modeling.traversal.KTraversal;

                }

                export interface KTraversalAction {

                    chain(next: org.kevoree.modeling.traversal.KTraversalAction): void;

                    execute(inputs: org.kevoree.modeling.KObject[]): void;

                }

                export interface KTraversalFilter {

                    filter(obj: org.kevoree.modeling.KObject): boolean;

                }

                export module actions {
                    export class KDeepCollectAction implements org.kevoree.modeling.traversal.KTraversalAction {

                        private _next: org.kevoree.modeling.traversal.KTraversalAction;
                        private _reference: org.kevoree.modeling.meta.MetaReference;
                        private _continueCondition: (p : org.kevoree.modeling.KObject) => boolean;
                        private _alreadyPassed: org.kevoree.modeling.memory.struct.map.LongHashMap<any> = null;
                        private _finalElements: org.kevoree.modeling.memory.struct.map.LongHashMap<any> = null;
                        constructor(p_reference: org.kevoree.modeling.meta.MetaReference, p_continueCondition: (p : org.kevoree.modeling.KObject) => boolean) {
                            this._reference = p_reference;
                            this._continueCondition = p_continueCondition;
                        }

                        public chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void {
                            this._next = p_next;
                        }

                        public execute(p_inputs: org.kevoree.modeling.KObject[]): void {
                            if (p_inputs == null || p_inputs.length == 0) {
                                this._next.execute(p_inputs);
                                return;
                            } else {
                                this._alreadyPassed = new org.kevoree.modeling.memory.struct.map.LongHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                this._finalElements = new org.kevoree.modeling.memory.struct.map.LongHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                var filtered_inputs: org.kevoree.modeling.KObject[] = new Array();
                                for (var i: number = 0; i < p_inputs.length; i++) {
                                    if (this._continueCondition == null || this._continueCondition(p_inputs[i])) {
                                        filtered_inputs[i] = p_inputs[i];
                                        this._alreadyPassed.put(p_inputs[i].uuid(), p_inputs[i]);
                                    }
                                }
                                var iterationCallbacks: {(p : org.kevoree.modeling.KObject[]) : void;}[] = new Array();
                                iterationCallbacks[0] =  (traversed : org.kevoree.modeling.KObject[]) => {
                                    var filtered_inputs2: org.kevoree.modeling.KObject[] = new Array();
                                    var nbSize: number = 0;
                                    for (var i: number = 0; i < traversed.length; i++) {
                                        if ((this._continueCondition == null || this._continueCondition(traversed[i])) && !this._alreadyPassed.containsKey(traversed[i].uuid())) {
                                            filtered_inputs2[i] = traversed[i];
                                            this._alreadyPassed.put(traversed[i].uuid(), traversed[i]);
                                            this._finalElements.put(traversed[i].uuid(), traversed[i]);
                                            nbSize++;
                                        }
                                    }
                                    if (nbSize > 0) {
                                        this.executeStep(filtered_inputs2, iterationCallbacks[0]);
                                    } else {
                                        var trimmed: org.kevoree.modeling.KObject[] = new Array();
                                        var nbInserted: number[] = [0];
                                        this._finalElements.each( (key : number, value : org.kevoree.modeling.KObject) => {
                                            trimmed[nbInserted[0]] = value;
                                            nbInserted[0]++;
                                        });
                                        this._next.execute(trimmed);
                                    }
                                };
                                this.executeStep(filtered_inputs, iterationCallbacks[0]);
                            }
                        }

                        private executeStep(p_inputStep: org.kevoree.modeling.KObject[], private_callback: (p : org.kevoree.modeling.KObject[]) => void): void {
                            var currentObject: org.kevoree.modeling.abs.AbstractKObject = null;
                            var nextIds: org.kevoree.modeling.memory.struct.map.LongLongHashMap = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            for (var i: number = 0; i < p_inputStep.length; i++) {
                                if (p_inputStep[i] != null) {
                                    try {
                                        var loopObj: org.kevoree.modeling.abs.AbstractKObject = <org.kevoree.modeling.abs.AbstractKObject>p_inputStep[i];
                                        currentObject = loopObj;
                                        var raw: org.kevoree.modeling.memory.KCacheElementSegment = loopObj._manager.segment(loopObj, org.kevoree.modeling.memory.AccessMode.READ);
                                        if (raw != null) {
                                            if (this._reference == null) {
                                                for (var j: number = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                                                    var ref: org.kevoree.modeling.meta.MetaReference = loopObj.metaClass().metaReferences()[j];
                                                    var resolved: number[] = raw.getRef(ref.index(), loopObj.metaClass());
                                                    if (resolved != null) {
                                                        for (var k: number = 0; k < resolved.length; k++) {
                                                            nextIds.put(resolved[k], resolved[k]);
                                                        }
                                                    }
                                                }
                                            } else {
                                                var translatedRef: org.kevoree.modeling.meta.MetaReference = loopObj.internal_transpose_ref(this._reference);
                                                if (translatedRef != null) {
                                                    var resolved: number[] = raw.getRef(translatedRef.index(), loopObj.metaClass());
                                                    if (resolved != null) {
                                                        for (var j: number = 0; j < resolved.length; j++) {
                                                            nextIds.put(resolved[j], resolved[j]);
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
                            }
                            var trimmed: number[] = new Array();
                            var inserted: number[] = [0];
                            nextIds.each( (key : number, value : number) => {
                                trimmed[inserted[0]] = key;
                                inserted[0]++;
                            });
                            currentObject._manager.lookupAllobjects(currentObject.universe(), currentObject.now(), trimmed,  (kObjects : org.kevoree.modeling.KObject[]) => {
                                private_callback(kObjects);
                            });
                        }

                    }

                    export class KFilterAction implements org.kevoree.modeling.traversal.KTraversalAction {

                        private _next: org.kevoree.modeling.traversal.KTraversalAction;
                        private _filter: (p : org.kevoree.modeling.KObject) => boolean;
                        constructor(p_filter: (p : org.kevoree.modeling.KObject) => boolean) {
                            this._filter = p_filter;
                        }

                        public chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void {
                            this._next = p_next;
                        }

                        public execute(p_inputs: org.kevoree.modeling.KObject[]): void {
                            var selectedIndex: boolean[] = new Array();
                            var selected: number = 0;
                            for (var i: number = 0; i < p_inputs.length; i++) {
                                try {
                                    if (this._filter(p_inputs[i])) {
                                        selectedIndex[i] = true;
                                        selected++;
                                    }
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                        e.printStackTrace();
                                    }
                                 }
                            }
                            var nextStepElement: org.kevoree.modeling.KObject[] = new Array();
                            var inserted: number = 0;
                            for (var i: number = 0; i < p_inputs.length; i++) {
                                if (selectedIndex[i]) {
                                    nextStepElement[inserted] = p_inputs[i];
                                    inserted++;
                                }
                            }
                            this._next.execute(nextStepElement);
                        }

                    }

                    export class KFilterAttributeAction implements org.kevoree.modeling.traversal.KTraversalAction {

                        private _next: org.kevoree.modeling.traversal.KTraversalAction;
                        private _attribute: org.kevoree.modeling.meta.MetaAttribute;
                        private _expectedValue: any;
                        constructor(p_attribute: org.kevoree.modeling.meta.MetaAttribute, p_expectedValue: any) {
                            this._attribute = p_attribute;
                            this._expectedValue = p_expectedValue;
                        }

                        public chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void {
                            this._next = p_next;
                        }

                        public execute(p_inputs: org.kevoree.modeling.KObject[]): void {
                            if (p_inputs == null || p_inputs.length == 0) {
                                this._next.execute(p_inputs);
                                return;
                            } else {
                                var selectedIndexes: boolean[] = new Array();
                                var nbSelected: number = 0;
                                for (var i: number = 0; i < p_inputs.length; i++) {
                                    try {
                                        var loopObj: org.kevoree.modeling.abs.AbstractKObject = <org.kevoree.modeling.abs.AbstractKObject>p_inputs[i];
                                        var raw: org.kevoree.modeling.memory.KCacheElementSegment = (loopObj)._manager.segment(loopObj, org.kevoree.modeling.memory.AccessMode.READ);
                                        if (raw != null) {
                                            if (this._attribute == null) {
                                                if (this._expectedValue == null) {
                                                    selectedIndexes[i] = true;
                                                    nbSelected++;
                                                } else {
                                                    var addToNext: boolean = false;
                                                    for (var j: number = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                                        var ref: org.kevoree.modeling.meta.MetaAttribute = loopObj.metaClass().metaAttributes()[j];
                                                        var resolved: any = raw.get(ref.index(), loopObj.metaClass());
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
                                                        selectedIndexes[i] = true;
                                                        nbSelected++;
                                                    }
                                                }
                                            } else {
                                                var translatedAtt: org.kevoree.modeling.meta.MetaAttribute = loopObj.internal_transpose_att(this._attribute);
                                                if (translatedAtt != null) {
                                                    var resolved: any = raw.get(translatedAtt.index(), loopObj.metaClass());
                                                    if (this._expectedValue == null) {
                                                        if (resolved == null) {
                                                            selectedIndexes[i] = true;
                                                            nbSelected++;
                                                        }
                                                    } else {
                                                        if (resolved == null) {
                                                            if (this._expectedValue.toString().equals("*")) {
                                                                selectedIndexes[i] = true;
                                                                nbSelected++;
                                                            }
                                                        } else {
                                                            if (resolved.equals(this._expectedValue)) {
                                                                selectedIndexes[i] = true;
                                                                nbSelected++;
                                                            } else {
                                                                if (resolved.toString().matches(this._expectedValue.toString().replace("*", ".*"))) {
                                                                    selectedIndexes[i] = true;
                                                                    nbSelected++;
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
                                var nextStepElement: org.kevoree.modeling.KObject[] = new Array();
                                var inserted: number = 0;
                                for (var i: number = 0; i < p_inputs.length; i++) {
                                    if (selectedIndexes[i]) {
                                        nextStepElement[inserted] = p_inputs[i];
                                        inserted++;
                                    }
                                }
                                this._next.execute(nextStepElement);
                            }
                        }

                    }

                    export class KFilterAttributeQueryAction implements org.kevoree.modeling.traversal.KTraversalAction {

                        private _next: org.kevoree.modeling.traversal.KTraversalAction;
                        private _attributeQuery: string;
                        constructor(p_attributeQuery: string) {
                            this._attributeQuery = p_attributeQuery;
                        }

                        public chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void {
                            this._next = p_next;
                        }

                        public execute(p_inputs: org.kevoree.modeling.KObject[]): void {
                            if (p_inputs == null || p_inputs.length == 0) {
                                this._next.execute(p_inputs);
                                return;
                            } else {
                                var selectedIndexes: boolean[] = new Array();
                                var nbSelected: number = 0;
                                for (var i: number = 0; i < p_inputs.length; i++) {
                                    try {
                                        var loopObj: org.kevoree.modeling.abs.AbstractKObject = <org.kevoree.modeling.abs.AbstractKObject>p_inputs[i];
                                        if (this._attributeQuery == null) {
                                            selectedIndexes[i] = true;
                                            nbSelected++;
                                        } else {
                                            var params: org.kevoree.modeling.memory.struct.map.StringHashMap<any> = this.buildParams(this._attributeQuery);
                                            var selectedForNext: boolean[] = [true];
                                            params.each( (key : string, param : org.kevoree.modeling.traversal.selector.KQueryParam) => {
                                                for (var j: number = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                                    var metaAttribute: org.kevoree.modeling.meta.MetaAttribute = loopObj.metaClass().metaAttributes()[j];
                                                    if (metaAttribute.metaName().matches(param.name())) {
                                                        var o_raw: any = loopObj.get(metaAttribute);
                                                        if (o_raw != null) {
                                                            if (param.value().equals("null")) {
                                                                if (!param.isNegative()) {
                                                                    selectedForNext[0] = false;
                                                                }
                                                            } else {
                                                                if (o_raw.toString().matches(param.value())) {
                                                                    if (param.isNegative()) {
                                                                        selectedForNext[0] = false;
                                                                    }
                                                                } else {
                                                                    if (!param.isNegative()) {
                                                                        selectedForNext[0] = false;
                                                                    }
                                                                }
                                                            }
                                                        } else {
                                                            if (param.value().equals("null") || param.value().equals("*")) {
                                                                if (param.isNegative()) {
                                                                    selectedForNext[0] = false;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            });
                                            if (selectedForNext[0]) {
                                                selectedIndexes[i] = true;
                                                nbSelected++;
                                            }
                                        }
                                    } catch ($ex$) {
                                        if ($ex$ instanceof java.lang.Exception) {
                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                            e.printStackTrace();
                                        }
                                     }
                                }
                                var nextStepElement: org.kevoree.modeling.KObject[] = new Array();
                                var inserted: number = 0;
                                for (var i: number = 0; i < p_inputs.length; i++) {
                                    if (selectedIndexes[i]) {
                                        nextStepElement[inserted] = p_inputs[i];
                                        inserted++;
                                    }
                                }
                                this._next.execute(nextStepElement);
                            }
                        }

                        private buildParams(p_paramString: string): org.kevoree.modeling.memory.struct.map.StringHashMap<any> {
                            var params: org.kevoree.modeling.memory.struct.map.StringHashMap<any> = new org.kevoree.modeling.memory.struct.map.StringHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            var iParam: number = 0;
                            var lastStart: number = iParam;
                            while (iParam < p_paramString.length){
                                if (p_paramString.charAt(iParam) == ',') {
                                    var p: string = p_paramString.substring(lastStart, iParam).trim();
                                    if (!p.equals("") && !p.equals("*")) {
                                        if (p.endsWith("=")) {
                                            p = p + "*";
                                        }
                                        var pArray: string[] = p.split("=");
                                        var pObject: org.kevoree.modeling.traversal.selector.KQueryParam;
                                        if (pArray.length > 1) {
                                            var paramKey: string = pArray[0].trim();
                                            var negative: boolean = paramKey.endsWith("!");
                                            pObject = new org.kevoree.modeling.traversal.selector.KQueryParam(paramKey.replace("!", "").replace("*", ".*"), pArray[1].trim().replace("*", ".*"), negative);
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
                                var pObject: org.kevoree.modeling.traversal.selector.KQueryParam;
                                if (pArray.length > 1) {
                                    var paramKey: string = pArray[0].trim();
                                    var negative: boolean = paramKey.endsWith("!");
                                    pObject = new org.kevoree.modeling.traversal.selector.KQueryParam(paramKey.replace("!", "").replace("*", ".*"), pArray[1].trim().replace("*", ".*"), negative);
                                    params.put(pObject.name(), pObject);
                                }
                            }
                            return params;
                        }

                    }

                    export class KFilterNotAttributeAction implements org.kevoree.modeling.traversal.KTraversalAction {

                        private _next: org.kevoree.modeling.traversal.KTraversalAction;
                        private _attribute: org.kevoree.modeling.meta.MetaAttribute;
                        private _expectedValue: any;
                        constructor(p_attribute: org.kevoree.modeling.meta.MetaAttribute, p_expectedValue: any) {
                            this._attribute = p_attribute;
                            this._expectedValue = p_expectedValue;
                        }

                        public chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void {
                            this._next = p_next;
                        }

                        public execute(p_inputs: org.kevoree.modeling.KObject[]): void {
                            if (p_inputs == null || p_inputs.length == 0) {
                                this._next.execute(p_inputs);
                            } else {
                                var selectedIndexes: boolean[] = new Array();
                                var nbSelected: number = 0;
                                for (var i: number = 0; i < p_inputs.length; i++) {
                                    try {
                                        var loopObj: org.kevoree.modeling.abs.AbstractKObject = <org.kevoree.modeling.abs.AbstractKObject>p_inputs[i];
                                        var raw: org.kevoree.modeling.memory.KCacheElementSegment = loopObj._manager.segment(loopObj, org.kevoree.modeling.memory.AccessMode.READ);
                                        if (raw != null) {
                                            if (this._attribute == null) {
                                                if (this._expectedValue == null) {
                                                    selectedIndexes[i] = true;
                                                    nbSelected++;
                                                } else {
                                                    var addToNext: boolean = true;
                                                    for (var j: number = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                                        var ref: org.kevoree.modeling.meta.MetaAttribute = loopObj.metaClass().metaAttributes()[j];
                                                        var resolved: any = raw.get(ref.index(), loopObj.metaClass());
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
                                                        selectedIndexes[i] = true;
                                                        nbSelected++;
                                                    }
                                                }
                                            } else {
                                                var translatedAtt: org.kevoree.modeling.meta.MetaAttribute = loopObj.internal_transpose_att(this._attribute);
                                                if (translatedAtt != null) {
                                                    var resolved: any = raw.get(translatedAtt.index(), loopObj.metaClass());
                                                    if (this._expectedValue == null) {
                                                        if (resolved != null) {
                                                            selectedIndexes[i] = true;
                                                            nbSelected++;
                                                        }
                                                    } else {
                                                        if (resolved == null) {
                                                            if (!this._expectedValue.toString().equals("*")) {
                                                                selectedIndexes[i] = true;
                                                                nbSelected++;
                                                            }
                                                        } else {
                                                            if (resolved.equals(this._expectedValue)) {
                                                            } else {
                                                                if (resolved.toString().matches(this._expectedValue.toString().replace("*", ".*"))) {
                                                                } else {
                                                                    selectedIndexes[i] = true;
                                                                    nbSelected++;
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
                                var nextStepElement: org.kevoree.modeling.KObject[] = new Array();
                                var inserted: number = 0;
                                for (var i: number = 0; i < p_inputs.length; i++) {
                                    if (selectedIndexes[i]) {
                                        nextStepElement[inserted] = p_inputs[i];
                                        inserted++;
                                    }
                                }
                                this._next.execute(nextStepElement);
                            }
                        }

                    }

                    export class KFinalAction implements org.kevoree.modeling.traversal.KTraversalAction {

                        private _finalCallback: (p : org.kevoree.modeling.KObject[]) => void;
                        constructor(p_callback: (p : org.kevoree.modeling.KObject[]) => void) {
                            this._finalCallback = p_callback;
                        }

                        public chain(next: org.kevoree.modeling.traversal.KTraversalAction): void {
                        }

                        public execute(inputs: org.kevoree.modeling.KObject[]): void {
                            this._finalCallback(inputs);
                        }

                    }

                    export class KMapAction implements org.kevoree.modeling.traversal.KTraversalAction {

                        private _finalCallback: (p : any[]) => void;
                        private _attribute: org.kevoree.modeling.meta.MetaAttribute;
                        constructor(p_attribute: org.kevoree.modeling.meta.MetaAttribute, p_callback: (p : any[]) => void) {
                            this._finalCallback = p_callback;
                            this._attribute = p_attribute;
                        }

                        public chain(next: org.kevoree.modeling.traversal.KTraversalAction): void {
                        }

                        public execute(inputs: org.kevoree.modeling.KObject[]): void {
                            var selected: any[] = new Array();
                            var nbElem: number = 0;
                            for (var i: number = 0; i < inputs.length; i++) {
                                if (inputs[i] != null) {
                                    var resolved: any = inputs[i].get(this._attribute);
                                    if (resolved != null) {
                                        selected[i] = resolved;
                                        nbElem++;
                                    }
                                }
                            }
                            var trimmed: any[] = new Array();
                            var nbInserted: number = 0;
                            for (var i: number = 0; i < inputs.length; i++) {
                                if (selected[i] != null) {
                                    trimmed[nbInserted] = selected[i];
                                    nbInserted++;
                                }
                            }
                            this._finalCallback(trimmed);
                        }

                    }

                    export class KRemoveDuplicateAction implements org.kevoree.modeling.traversal.KTraversalAction {

                        private _next: org.kevoree.modeling.traversal.KTraversalAction;
                        public chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void {
                            this._next = p_next;
                        }

                        public execute(p_inputs: org.kevoree.modeling.KObject[]): void {
                            var elems: org.kevoree.modeling.memory.struct.map.LongHashMap<any> = new org.kevoree.modeling.memory.struct.map.LongHashMap<any>(p_inputs.length, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            for (var i: number = 0; i < p_inputs.length; i++) {
                                elems.put(p_inputs[i].uuid(), p_inputs[i]);
                            }
                            var trimmed: org.kevoree.modeling.KObject[] = new Array();
                            var nbInserted: number[] = [0];
                            elems.each( (key : number, value : org.kevoree.modeling.KObject) => {
                                trimmed[nbInserted[0]] = value;
                                nbInserted[0]++;
                            });
                            this._next.execute(trimmed);
                        }

                    }

                    export class KTraverseAction implements org.kevoree.modeling.traversal.KTraversalAction {

                        private _next: org.kevoree.modeling.traversal.KTraversalAction;
                        private _reference: org.kevoree.modeling.meta.MetaReference;
                        constructor(p_reference: org.kevoree.modeling.meta.MetaReference) {
                            this._reference = p_reference;
                        }

                        public chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void {
                            this._next = p_next;
                        }

                        public execute(p_inputs: org.kevoree.modeling.KObject[]): void {
                            if (p_inputs == null || p_inputs.length == 0) {
                                this._next.execute(p_inputs);
                                return;
                            } else {
                                var currentObject: org.kevoree.modeling.abs.AbstractKObject = <org.kevoree.modeling.abs.AbstractKObject>p_inputs[0];
                                var nextIds: org.kevoree.modeling.memory.struct.map.LongLongHashMap = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                for (var i: number = 0; i < p_inputs.length; i++) {
                                    try {
                                        var loopObj: org.kevoree.modeling.abs.AbstractKObject = <org.kevoree.modeling.abs.AbstractKObject>p_inputs[i];
                                        var raw: org.kevoree.modeling.memory.KCacheElementSegment = currentObject._manager.segment(loopObj, org.kevoree.modeling.memory.AccessMode.READ);
                                        if (raw != null) {
                                            if (this._reference == null) {
                                                for (var j: number = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                                                    var ref: org.kevoree.modeling.meta.MetaReference = loopObj.metaClass().metaReferences()[j];
                                                    var resolved: number[] = raw.getRef(ref.index(), currentObject.metaClass());
                                                    if (resolved != null) {
                                                        for (var k: number = 0; k < resolved.length; k++) {
                                                            nextIds.put(resolved[k], resolved[k]);
                                                        }
                                                    }
                                                }
                                            } else {
                                                var translatedRef: org.kevoree.modeling.meta.MetaReference = loopObj.internal_transpose_ref(this._reference);
                                                if (translatedRef != null) {
                                                    var resolved: number[] = raw.getRef(translatedRef.index(), currentObject.metaClass());
                                                    if (resolved != null) {
                                                        for (var j: number = 0; j < resolved.length; j++) {
                                                            nextIds.put(resolved[j], resolved[j]);
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
                                var trimmed: number[] = new Array();
                                var inserted: number[] = [0];
                                nextIds.each( (key : number, value : number) => {
                                    trimmed[inserted[0]] = key;
                                    inserted[0]++;
                                });
                                currentObject._manager.lookupAllobjects(currentObject.universe(), currentObject.now(), trimmed,  (kObjects : org.kevoree.modeling.KObject[]) => {
                                    this._next.execute(kObjects);
                                });
                            }
                        }

                    }

                    export class KTraverseQueryAction implements org.kevoree.modeling.traversal.KTraversalAction {

                        private SEP: string = ",";
                        private _next: org.kevoree.modeling.traversal.KTraversalAction;
                        private _referenceQuery: string;
                        constructor(p_referenceQuery: string) {
                            this._referenceQuery = p_referenceQuery;
                        }

                        public chain(p_next: org.kevoree.modeling.traversal.KTraversalAction): void {
                            this._next = p_next;
                        }

                        public execute(p_inputs: org.kevoree.modeling.KObject[]): void {
                            if (p_inputs == null || p_inputs.length == 0) {
                                this._next.execute(p_inputs);
                                return;
                            } else {
                                var currentFirstObject: org.kevoree.modeling.abs.AbstractKObject = <org.kevoree.modeling.abs.AbstractKObject>p_inputs[0];
                                var nextIds: org.kevoree.modeling.memory.struct.map.LongLongHashMap = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                for (var i: number = 0; i < p_inputs.length; i++) {
                                    try {
                                        var loopObj: org.kevoree.modeling.abs.AbstractKObject = <org.kevoree.modeling.abs.AbstractKObject>p_inputs[i];
                                        var raw: org.kevoree.modeling.memory.KCacheElementSegment = loopObj._manager.segment(loopObj, org.kevoree.modeling.memory.AccessMode.READ);
                                        if (raw != null) {
                                            if (this._referenceQuery == null) {
                                                for (var j: number = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                                                    var ref: org.kevoree.modeling.meta.MetaReference = loopObj.metaClass().metaReferences()[j];
                                                    var resolved: any = raw.get(ref.index(), loopObj.metaClass());
                                                    if (resolved != null) {
                                                        var resolvedArr: number[] = <number[]>resolved;
                                                        for (var k: number = 0; k < resolvedArr.length; k++) {
                                                            var idResolved: number = resolvedArr[k];
                                                            nextIds.put(idResolved, idResolved);
                                                        }
                                                    }
                                                }
                                            } else {
                                                var queries: string[] = this._referenceQuery.split(this.SEP);
                                                for (var k: number = 0; k < queries.length; k++) {
                                                    queries[k] = queries[k].replace("*", ".*");
                                                }
                                                var loopRefs: org.kevoree.modeling.meta.MetaReference[] = loopObj.metaClass().metaReferences();
                                                for (var h: number = 0; h < loopRefs.length; h++) {
                                                    var ref: org.kevoree.modeling.meta.MetaReference = loopRefs[h];
                                                    var selected: boolean = false;
                                                    for (var k: number = 0; k < queries.length; k++) {
                                                        if (queries[k] != null && queries[k].startsWith("#")) {
                                                            if (ref.opposite().metaName().matches(queries[k].substring(1))) {
                                                                selected = true;
                                                                break;
                                                            }
                                                        } else {
                                                            if (ref.metaName().matches(queries[k])) {
                                                                selected = true;
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    if (selected) {
                                                        var resolved: any = raw.get(ref.index(), loopObj.metaClass());
                                                        if (resolved != null) {
                                                            var resolvedCasted: number[] = <number[]>resolved;
                                                            for (var j: number = 0; j < resolvedCasted.length; j++) {
                                                                nextIds.put(resolvedCasted[j], resolvedCasted[j]);
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
                                var trimmed: number[] = new Array();
                                var inserted: number[] = [0];
                                nextIds.each( (key : number, value : number) => {
                                    trimmed[inserted[0]] = key;
                                    inserted[0]++;
                                });
                                currentFirstObject._manager.lookupAllobjects(currentFirstObject.universe(), currentFirstObject.now(), trimmed,  (kObjects : org.kevoree.modeling.KObject[]) => {
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

                        public static buildChain(query: string): java.util.List<org.kevoree.modeling.traversal.selector.KQuery> {
                            var result: java.util.List<org.kevoree.modeling.traversal.selector.KQuery> = new java.util.ArrayList<org.kevoree.modeling.traversal.selector.KQuery>();
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
                                                    var additionalQuery: org.kevoree.modeling.traversal.selector.KQuery = new org.kevoree.modeling.traversal.selector.KQuery(relationName, atts);
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

                        public static select(root: org.kevoree.modeling.KObject, query: string, callback: (p : org.kevoree.modeling.KObject[]) => void): void {
                            if (callback == null) {
                                return;
                            }
                            var current: org.kevoree.modeling.traversal.KTraversal = null;
                            var extracted: java.util.List<org.kevoree.modeling.traversal.selector.KQuery> = org.kevoree.modeling.traversal.selector.KQuery.buildChain(query);
                            if (extracted != null) {
                                for (var i: number = 0; i < extracted.size(); i++) {
                                    if (current == null) {
                                        current = root.traversal().traverseQuery(extracted.get(i).relationName);
                                    } else {
                                        current = current.traverseQuery(extracted.get(i).relationName);
                                    }
                                    current = current.attributeQuery(extracted.get(i).params);
                                }
                            }
                            if (current != null) {
                                current.then(callback);
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

                export class DefaultOperationManager implements org.kevoree.modeling.util.KOperationManager {

                    private staticOperations: org.kevoree.modeling.memory.struct.map.IntHashMap<any>;
                    private instanceOperations: org.kevoree.modeling.memory.struct.map.LongHashMap<any>;
                    private remoteCallCallbacks: org.kevoree.modeling.memory.struct.map.LongHashMap<any> = new org.kevoree.modeling.memory.struct.map.LongHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                    private _manager: org.kevoree.modeling.memory.KDataManager;
                    private _callbackId: number = 0;
                    constructor(p_manager: org.kevoree.modeling.memory.KDataManager) {
                        this.staticOperations = new org.kevoree.modeling.memory.struct.map.IntHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this.instanceOperations = new org.kevoree.modeling.memory.struct.map.LongHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._manager = p_manager;
                    }

                    public registerOperation(operation: org.kevoree.modeling.meta.MetaOperation, callback: (p : org.kevoree.modeling.KObject, p1 : any[], p2 : (p : any) => void) => void, target: org.kevoree.modeling.KObject): void {
                        if (target == null) {
                            var clazzOperations: org.kevoree.modeling.memory.struct.map.IntHashMap<any> = this.staticOperations.get(operation.origin().index());
                            if (clazzOperations == null) {
                                clazzOperations = new org.kevoree.modeling.memory.struct.map.IntHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                this.staticOperations.put(operation.origin().index(), clazzOperations);
                            }
                            clazzOperations.put(operation.index(), callback);
                        } else {
                            var objectOperations: org.kevoree.modeling.memory.struct.map.IntHashMap<any> = this.instanceOperations.get(target.uuid());
                            if (objectOperations == null) {
                                objectOperations = new org.kevoree.modeling.memory.struct.map.IntHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                this.instanceOperations.put(target.uuid(), objectOperations);
                            }
                            objectOperations.put(operation.index(), callback);
                        }
                    }

                    private searchOperation(source: number, clazz: number, operation: number): (p : org.kevoree.modeling.KObject, p1 : any[], p2 : (p : any) => void) => void {
                        var objectOperations: org.kevoree.modeling.memory.struct.map.IntHashMap<any> = this.instanceOperations.get(source);
                        if (objectOperations != null) {
                            return objectOperations.get(operation);
                        }
                        var clazzOperations: org.kevoree.modeling.memory.struct.map.IntHashMap<any> = this.staticOperations.get(clazz);
                        if (clazzOperations != null) {
                            return clazzOperations.get(operation);
                        }
                        return null;
                    }

                    public call(source: org.kevoree.modeling.KObject, operation: org.kevoree.modeling.meta.MetaOperation, param: any[], callback: (p : any) => void): void {
                        var operationCore: (p : org.kevoree.modeling.KObject, p1 : any[], p2 : (p : any) => void) => void = this.searchOperation(source.uuid(), operation.origin().index(), operation.index());
                        if (operationCore != null) {
                            operationCore(source, param, callback);
                        } else {
                            this.sendToRemote(source, operation, param, callback);
                        }
                    }

                    private sendToRemote(source: org.kevoree.modeling.KObject, operation: org.kevoree.modeling.meta.MetaOperation, param: any[], callback: (p : any) => void): void {
                        var stringParams: string[] = new Array();
                        for (var i: number = 0; i < param.length; i++) {
                            stringParams[i] = param[i].toString();
                        }
                        var contentKey: org.kevoree.modeling.memory.KContentKey = new org.kevoree.modeling.memory.KContentKey(source.universe(), source.now(), source.uuid());
                        var operationCall: org.kevoree.modeling.msg.KOperationCallMessage = new org.kevoree.modeling.msg.KOperationCallMessage();
                        operationCall.id = this.nextKey();
                        operationCall.key = contentKey;
                        operationCall.classIndex = source.metaClass().index();
                        operationCall.opIndex = operation.index();
                        operationCall.params = stringParams;
                        this.remoteCallCallbacks.put(operationCall.id, callback);
                        this._manager.cdn().send(operationCall);
                    }

                    public nextKey(): number {
                        if (this._callbackId == org.kevoree.modeling.KConfig.CALLBACK_HISTORY) {
                            this._callbackId = 0;
                        } else {
                            this._callbackId++;
                        }
                        return this._callbackId;
                    }

                    public operationEventReceived(operationEvent: org.kevoree.modeling.msg.KMessage): void {
                        if (operationEvent.type() == org.kevoree.modeling.msg.KMessageLoader.OPERATION_RESULT_TYPE) {
                            var operationResult: org.kevoree.modeling.msg.KOperationResultMessage = <org.kevoree.modeling.msg.KOperationResultMessage>operationEvent;
                            var cb: (p : any) => void = this.remoteCallCallbacks.get(operationResult.id);
                            if (cb != null) {
                                cb(operationResult.value);
                            }
                        } else {
                            if (operationEvent.type() == org.kevoree.modeling.msg.KMessageLoader.OPERATION_CALL_TYPE) {
                                var operationCall: org.kevoree.modeling.msg.KOperationCallMessage = <org.kevoree.modeling.msg.KOperationCallMessage>operationEvent;
                                var sourceKey: org.kevoree.modeling.memory.KContentKey = operationCall.key;
                                var operationCore: (p : org.kevoree.modeling.KObject, p1 : any[], p2 : (p : any) => void) => void = this.searchOperation(sourceKey.obj, operationCall.classIndex, operationCall.opIndex);
                                if (operationCore != null) {
                                    var view: org.kevoree.modeling.KView = this._manager.model().universe(sourceKey.universe).time(sourceKey.time);
                                    view.lookup(sourceKey.obj,  (kObject : org.kevoree.modeling.KObject) => {
                                        if (kObject != null) {
                                            operationCore(kObject, operationCall.params,  (o : any) => {
                                                var operationResultMessage: org.kevoree.modeling.msg.KOperationResultMessage = new org.kevoree.modeling.msg.KOperationResultMessage();
                                                operationResultMessage.key = operationCall.key;
                                                operationResultMessage.id = operationCall.id;
                                                operationResultMessage.value = o.toString();
                                                this._manager.cdn().send(operationResultMessage);
                                            });
                                        }
                                    });
                                }
                            } else {
                                System.err.println("BAD ROUTING !");
                            }
                        }
                    }

                }

                export interface KOperationManager {

                    registerOperation(operation: org.kevoree.modeling.meta.MetaOperation, callback: (p : org.kevoree.modeling.KObject, p1 : any[], p2 : (p : any) => void) => void, target: org.kevoree.modeling.KObject): void;

                    call(source: org.kevoree.modeling.KObject, operation: org.kevoree.modeling.meta.MetaOperation, param: any[], callback: (p : any) => void): void;

                    operationEventReceived(operationEvent: org.kevoree.modeling.msg.KMessage): void;

                }

                export class LocalEventListeners {

                    private _manager: org.kevoree.modeling.memory.KDataManager;
                    private _internalListenerKeyGen: org.kevoree.modeling.memory.manager.KeyCalculator;
                    private _simpleListener: org.kevoree.modeling.memory.struct.map.LongHashMap<any>;
                    private _multiListener: org.kevoree.modeling.memory.struct.map.LongHashMap<any>;
                    private _listener2Object: org.kevoree.modeling.memory.struct.map.LongLongHashMap;
                    private _listener2Objects: org.kevoree.modeling.memory.struct.map.LongHashMap<any>;
                    private _obj2Listener: org.kevoree.modeling.memory.struct.map.LongHashMap<any>;
                    private _group2Listener: org.kevoree.modeling.memory.struct.map.LongHashMap<any>;
                    constructor() {
                        this._internalListenerKeyGen = new org.kevoree.modeling.memory.manager.KeyCalculator(<number>0, 0);
                        this._simpleListener = new org.kevoree.modeling.memory.struct.map.LongHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._multiListener = new org.kevoree.modeling.memory.struct.map.LongHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._obj2Listener = new org.kevoree.modeling.memory.struct.map.LongHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._listener2Object = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._listener2Objects = new org.kevoree.modeling.memory.struct.map.LongHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                        this._group2Listener = new org.kevoree.modeling.memory.struct.map.LongHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                    }

                    public registerListener(groupId: number, origin: org.kevoree.modeling.KObject, listener: (p : org.kevoree.modeling.KObject, p1 : org.kevoree.modeling.meta.Meta[]) => void): void {
                        var generateNewID: number = this._internalListenerKeyGen.nextKey();
                        this._simpleListener.put(generateNewID, listener);
                        this._listener2Object.put(generateNewID, origin.universe());
                        var subLayer: org.kevoree.modeling.memory.struct.map.LongLongHashMap = this._obj2Listener.get(origin.uuid());
                        if (subLayer == null) {
                            subLayer = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            this._obj2Listener.put(origin.uuid(), subLayer);
                        }
                        subLayer.put(generateNewID, origin.universe());
                        subLayer = this._group2Listener.get(groupId);
                        if (subLayer == null) {
                            subLayer = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            this._group2Listener.put(groupId, subLayer);
                        }
                        subLayer.put(generateNewID, 1);
                    }

                    public registerListenerAll(groupId: number, universe: number, objects: number[], listener: (p : org.kevoree.modeling.KObject[]) => void): void {
                        var generateNewID: number = this._internalListenerKeyGen.nextKey();
                        this._multiListener.put(generateNewID, listener);
                        this._listener2Objects.put(generateNewID, objects);
                        var subLayer: org.kevoree.modeling.memory.struct.map.LongLongHashMap;
                        for (var i: number = 0; i < objects.length; i++) {
                            subLayer = this._obj2Listener.get(objects[i]);
                            if (subLayer == null) {
                                subLayer = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                this._obj2Listener.put(objects[i], subLayer);
                            }
                            subLayer.put(generateNewID, universe);
                        }
                        subLayer = this._group2Listener.get(groupId);
                        if (subLayer == null) {
                            subLayer = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            this._group2Listener.put(groupId, subLayer);
                        }
                        subLayer.put(generateNewID, 2);
                    }

                    public unregister(groupId: number): void {
                        var groupLayer: org.kevoree.modeling.memory.struct.map.LongLongHashMap = this._group2Listener.get(groupId);
                        if (groupLayer != null) {
                            groupLayer.each( (listenerID : number, value : number) => {
                                if (value == 1) {
                                    this._simpleListener.remove(listenerID);
                                    var previousObject: number = this._listener2Object.get(listenerID);
                                    this._listener2Object.remove(listenerID);
                                    var _obj2ListenerLayer: org.kevoree.modeling.memory.struct.map.LongLongHashMap = this._obj2Listener.get(previousObject);
                                    if (_obj2ListenerLayer != null) {
                                        _obj2ListenerLayer.remove(listenerID);
                                    }
                                } else {
                                    this._multiListener.remove(listenerID);
                                    var previousObjects: number[] = this._listener2Objects.get(listenerID);
                                    for (var i: number = 0; i < previousObjects.length; i++) {
                                        var _obj2ListenerLayer: org.kevoree.modeling.memory.struct.map.LongLongHashMap = this._obj2Listener.get(previousObjects[i]);
                                        if (_obj2ListenerLayer != null) {
                                            _obj2ListenerLayer.remove(listenerID);
                                        }
                                    }
                                    this._listener2Objects.remove(listenerID);
                                }
                            });
                            this._group2Listener.remove(groupId);
                        }
                    }

                    public clear(): void {
                        this._simpleListener.clear();
                        this._multiListener.clear();
                        this._obj2Listener.clear();
                        this._group2Listener.clear();
                        this._listener2Object.clear();
                        this._listener2Objects.clear();
                    }

                    public setManager(manager: org.kevoree.modeling.memory.KDataManager): void {
                        this._manager = manager;
                    }

                    public dispatch(param: org.kevoree.modeling.msg.KMessage): void {
                        if (this._manager != null) {
                            var _cacheUniverse: org.kevoree.modeling.memory.struct.map.LongHashMap<any> = new org.kevoree.modeling.memory.struct.map.LongHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                            if (param instanceof org.kevoree.modeling.msg.KEvents) {
                                var messages: org.kevoree.modeling.msg.KEvents = <org.kevoree.modeling.msg.KEvents>param;
                                var toLoad: org.kevoree.modeling.memory.KContentKey[] = new Array();
                                var multiCounters: org.kevoree.modeling.memory.struct.map.LongLongHashMap[] = new Array();
                                for (var i: number = 0; i < messages.size(); i++) {
                                    var loopKey: org.kevoree.modeling.memory.KContentKey = messages.getKey(i);
                                    var listeners: org.kevoree.modeling.memory.struct.map.LongLongHashMap = this._obj2Listener.get(loopKey.obj);
                                    var isSelect: boolean[] = [false];
                                    if (listeners != null) {
                                        listeners.each( (listenerKey : number, universeKey : number) => {
                                            if (universeKey == loopKey.universe) {
                                                isSelect[0] = true;
                                                if (this._multiListener.containsKey(listenerKey)) {
                                                    if (multiCounters[0] == null) {
                                                        multiCounters[0] = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                                    }
                                                    var previous: number = 0;
                                                    if (multiCounters[0].containsKey(listenerKey)) {
                                                        previous = multiCounters[0].get(listenerKey);
                                                    }
                                                    previous++;
                                                    multiCounters[0].put(listenerKey, previous);
                                                }
                                            }
                                        });
                                    }
                                    if (isSelect[0]) {
                                        toLoad[i] = loopKey;
                                    }
                                }
                                (<org.kevoree.modeling.memory.manager.DefaultKDataManager>this._manager).bumpKeysToCache(toLoad,  (kCacheElements : org.kevoree.modeling.memory.KCacheElement[]) => {
                                    var multiObjectSets: org.kevoree.modeling.memory.struct.map.LongHashMap<any>[] = new Array();
                                    var multiObjectIndexes: org.kevoree.modeling.memory.struct.map.LongLongHashMap[] = new Array();
                                    if (multiCounters[0] != null) {
                                        multiObjectSets[0] = new org.kevoree.modeling.memory.struct.map.LongHashMap<any>(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                        multiObjectIndexes[0] = new org.kevoree.modeling.memory.struct.map.LongLongHashMap(org.kevoree.modeling.KConfig.CACHE_INIT_SIZE, org.kevoree.modeling.KConfig.CACHE_LOAD_FACTOR);
                                        multiCounters[0].each( (listenerKey : number, value : number) => {
                                            multiObjectSets[0].put(listenerKey, new Array());
                                            multiObjectIndexes[0].put(listenerKey, 0);
                                        });
                                    }
                                    var listeners: org.kevoree.modeling.memory.struct.map.LongLongHashMap;
                                    for (var i: number = 0; i < messages.size(); i++) {
                                        if (kCacheElements[i] != null && kCacheElements[i] instanceof org.kevoree.modeling.memory.struct.segment.HeapCacheSegment) {
                                            var correspondingKey: org.kevoree.modeling.memory.KContentKey = toLoad[i];
                                            listeners = this._obj2Listener.get(correspondingKey.obj);
                                            if (listeners != null) {
                                                var cachedUniverse: org.kevoree.modeling.KUniverse<any, any, any> = _cacheUniverse.get(correspondingKey.universe);
                                                if (cachedUniverse == null) {
                                                    cachedUniverse = this._manager.model().universe(correspondingKey.universe);
                                                    _cacheUniverse.put(correspondingKey.universe, cachedUniverse);
                                                }
                                                var segment: org.kevoree.modeling.memory.struct.segment.HeapCacheSegment = <org.kevoree.modeling.memory.struct.segment.HeapCacheSegment>kCacheElements[i];
                                                var toDispatch: org.kevoree.modeling.KObject = (<org.kevoree.modeling.abs.AbstractKModel<any>>this._manager.model()).createProxy(correspondingKey.universe, correspondingKey.time, correspondingKey.obj, this._manager.model().metaModel().metaClasses()[segment.metaClassIndex()]);
                                                if (toDispatch != null) {
                                                    kCacheElements[i].inc();
                                                }
                                                var meta: org.kevoree.modeling.meta.Meta[] = new Array();
                                                for (var j: number = 0; j < messages.getIndexes(i).length; j++) {
                                                    meta[j] = toDispatch.metaClass().meta(messages.getIndexes(i)[j]);
                                                }
                                                listeners.each( (listenerKey : number, value : number) => {
                                                    var listener: (p : org.kevoree.modeling.KObject, p1 : org.kevoree.modeling.meta.Meta[]) => void = this._simpleListener.get(listenerKey);
                                                    if (listener != null) {
                                                        listener(toDispatch, meta);
                                                    } else {
                                                        var multiListener: (p : org.kevoree.modeling.KObject[]) => void = this._multiListener.get(listenerKey);
                                                        if (multiListener != null) {
                                                            if (multiObjectSets[0] != null && multiObjectIndexes[0] != null) {
                                                                var index: number = multiObjectIndexes[0].get(listenerKey);
                                                                multiObjectSets[0].get(listenerKey)[<number>index] = toDispatch;
                                                                index = index + 1;
                                                                multiObjectIndexes[0].put(listenerKey, index);
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                    if (multiObjectSets[0] != null) {
                                        multiObjectSets[0].each( (key : number, value : org.kevoree.modeling.KObject[]) => {
                                            var multiListener: (p : org.kevoree.modeling.KObject[]) => void = this._multiListener.get(key);
                                            if (multiListener != null) {
                                                multiListener(value);
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }

                }

            }
        }
    }
}
