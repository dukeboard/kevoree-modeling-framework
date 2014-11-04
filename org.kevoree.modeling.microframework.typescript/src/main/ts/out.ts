class System {
    static out = {
        println(obj?:any) {
            console.log(obj);
        },
        print(obj:any) {
            console.log(obj);
        }
    };
    
    static err = {
        println(obj?:any) {
            console.log(obj);
        },
        print(obj:any) {
            console.log(obj);
        }
    };

    static arraycopy(src:Number[], srcPos:number, dest:Number[], destPos:number, numElements:number):void {
        for (var i = 0; i < numElements; i++) {
            dest[destPos + i] = src[srcPos + i];
        }
    }
}

var TSMap = Map;
var TSSet = Set;

interface Number {
    equals : (other:Number) => boolean;
}

Number.prototype.equals = function (other) {
    return this == other;
};

interface String {
    equals : (other:String) => boolean;
    startsWith : (other:String) => boolean;
    endsWith : (other:String) => boolean;
    matches :  (regEx:String) => boolean;
    getBytes : () => number[];
    isEmpty : () => boolean;
}

String.prototype.getBytes = function () {
    var res:number[] = new Number[this.length];
    for (var i = 0; i < this.length; i++) {
        res[i] = Number(this.charAt(i));
    }
    return res;
};

String.prototype.matches = function (regEx) {
    return this.match(regEx).length > 0;
};

String.prototype.isEmpty = function () {
    return this.length == 0;
};

String.prototype.equals = function (other) {
    return this == other;
};


String.prototype.startsWith = function (other) {
    for (var i = 0; i < other.length; i++) {
        if (other.charAt(i) != this.charAt(i)) {
            return false;
        }
    }
    return true;
};

String.prototype.endsWith = function (other) {
    for (var i = other.length - 1; i >= 0; i--) {
        if (other.charAt(i) != this.charAt(i)) {
            return false;
        }
    }
    return true;
};

module java {

    export module lang {

        export class Double {
            public static parseDouble(val:string):number {
                return Number(val);
            }
        }

        export class Float {
            public static parseFloat(val:string):number {
                return Number(val);
            }
        }

        export class Integer {
            public static parseInt(val:string):number {
                return Number(val);
            }
        }

        export class Long {
            public static parseLong(val:string):number {
                return Number(val);
            }
        }

        export class Short {
            public static parseShort(val:string):number {
                return Number(val);
            }
        }

        export class Throwable {
            printStackTrace() {
                throw new Exception("Abstract implementation");
            }
        }

        export class Exception extends Throwable {

            private message:string;

            constructor(message:string) {
                super();
                this.message = message;
            }

            printStackTrace() {
                console.error(this.message);
            }
        }

        export class StringBuilder {

            buffer = "";

            public length = 0;

            append(val:any):StringBuilder {
                this.buffer = this.buffer + val;
                length = this.buffer.length;
                return this;
            }

            toString():string {
                return this.buffer;
            }

        }
    }

    export module util {

        export class Random {
            public nextInt(max:number):number{
                return Math.random() * max;
            }
        }

        export class Arrays {
            static fill(data:Number[], begin:number, nbElem:number, param:number):void {
                var max = begin + nbElem;
                for (var i = begin; i < max; i++) {
                    data[i] = param;
                }
            }
        }

        export class Collections {

            public static reverse<A>(p:List<A>):void {
                var temp = new List<A>();
                for (var i = 0; i < p.size(); i++) {
                    temp.add(p.get(i));
                }
                p.clear();
                for (var i = temp.size() - 1; i >= 0; i--) {
                    p.add(temp.get(i));
                }
            }

        }

        export class Collection<T> {
            add(val:T):void {
                throw new java.lang.Exception("Abstract implementation");
            }

            addAll(vals:Collection<T>):void {
                throw new java.lang.Exception("Abstract implementation");
            }

            remove(val:T):void {
                throw new java.lang.Exception("Abstract implementation");
            }

            clear():void {
                throw new java.lang.Exception("Abstract implementation");
            }

            isEmpty():boolean {
                throw new java.lang.Exception("Abstract implementation");
            }

            size():number {
                throw new java.lang.Exception("Abstract implementation");
            }

            contains(val:T):boolean {
                throw new java.lang.Exception("Abstract implementation");
            }

            toArray(a:Array<T>):T[] {
                throw new java.lang.Exception("Abstract implementation");
            }
        }

        export class List<T> extends Collection<T> {
            private internalArray:Array<T> = [];

            addAll(vals:Collection<T>) {
                var tempArray = vals.toArray(null);
                for (var i = 0; i < tempArray.length; i++) {
                    this.internalArray.push(tempArray[i]);
                }
            }

            clear() {
                this.internalArray = [];
            }

            public poll():T{
                return this.internalArray.pop();
            }

            remove(val:T) {
                //TODO with filter
            }

            toArray(a:Array<T>):T[] {
                //TODO
                var result = new Array<T>(this.internalArray.length);
                this.internalArray.forEach((value:T, index:number, p1:T[])=> {
                    result[index] = value;
                });
                return result;
            }

            size():number {
                return this.internalArray.length;
            }

            add(val:T):void {
                this.internalArray.push(val);
            }

            get(index:number):T {
                return this.internalArray[index];
            }

            contains(val:T):boolean {
                for (var i = 0; i < this.internalArray.length; i++) {
                    if (this.internalArray[i] == val) {
                        return true;
                    }
                }
                return false;
            }

            isEmpty():boolean {
                return this.internalArray.length == 0;
            }
        }

        export class ArrayList<T> extends List<T> {

        }

        export class LinkedList<T> extends List<T> {

        }

        export class Map<K, V> {
            get(key:K):V {
                return this.internalMap.get(key);
            }

            put(key:K, value:V):void {
                this.internalMap.set(key, value);
            }

            containsKey(key:K):boolean {
                return this.internalMap.has(key);
            }

            remove(key:K):void {
                return this.remove(key);
            }

            keySet():Set<K> {
                var result = new HashSet<K>();
                this.internalMap.forEach((value:V, index:K, p1)=> {
                    result.add(index);
                });
                return result;
            }

            isEmpty():boolean {
                return this.internalMap.size == 0;
            }

            values():Set<V> {
                var result = new HashSet<V>();
                this.internalMap.forEach((value:V, index:K, p1)=> {
                    result.add(value);
                });
                return result;
            }

            private internalMap = new TSMap<K,V>();

            clear():void {
                this.internalMap = new TSMap<K,V>();
            }

        }

        export class HashMap<K, V> extends Map<K,V> {

        }

        export class Set<T> extends Collection<T> {

            private internalSet = new TSSet<T>();

            add(val:T) {
                this.internalSet.add(val);
            }

            clear() {
                this.internalSet = new TSSet<T>();
            }

            contains(val:T):boolean {
                return this.internalSet.has(val);
            }

            addAll(vals:Collection<T>) {
                var tempArray = vals.toArray(null);
                for (var i = 0; i < tempArray.length; i++) {
                    this.internalSet.add(tempArray[i]);
                }
            }

            remove(val:T) {
                this.internalSet.delete(val);
            }

            size():number {
                return this.internalSet.size;
            }

            isEmpty():boolean {
                return this.internalSet.size == 0;
            }

            toArray(other:Array<T>):T[] {
                var result = new Array<T>(this.internalSet.size);
                var i = 0;
                this.internalSet.forEach((value:T, index:T, origin)=> {
                    result[i] = value;
                    i++;
                });
                return result;
            }
        }

        export class HashSet<T> extends Set<T> {

        }

    }

}

module org {

    export module junit {

        export class Assert {
            public static assertNotNull(p:any):void {
                if (p == null) {
                    throw new java.lang.Exception("Assert Error " + p + " must be null");
                }
            }

            public static assertNull(p:any):void {
                if (p != null) {
                    throw new java.lang.Exception("Assert Error " + p + " must be null");
                }
            }

            public static assertEquals(p:any, p2:any):void {
                if (p != p2) {
                    throw new java.lang.Exception("Assert Error " + p + " must be equals to " + p2);
                }
            }

            public static assertNotEquals(p:any, p2:any):void {
                if (p == p2) {
                    throw new java.lang.Exception("Assert Error " + p + " must be equals to " + p2);
                }
            }

            public static assertTrue(b:boolean):void {
                if (!b) {
                    throw new java.lang.Exception("Assert Error " + b + " must be true");
                }
            }
        }

    }

}

module org {
	export module kevoree {
		export module modeling {
			export module api {
				export module abs {
					
					export class AbstractKDimension<A extends org.kevoree.modeling.api.KView, B extends org.kevoree.modeling.api.KDimension<any,any,any>, C extends org.kevoree.modeling.api.KUniverse<any>> implements org.kevoree.modeling.api.KDimension<A, B, C> {
					
					  private _universe: org.kevoree.modeling.api.KUniverse<any> = null;
					  private _key: number = 0;
					  private _timesCache: java.util.Map<number, A> = new java.util.HashMap<number, A>();
					
					  constructor(p_universe: org.kevoree.modeling.api.KUniverse<any>, p_key: number) {
					    this._universe = p_universe;
					    this._key = p_key;
					  }
					
					  public key(): number {
					    return this._key;
					  }
					
					  public universe(): C {
					    return <C>this._universe;
					  }
					
					  public save(callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    this.universe().storage().save(this, callback);
					  }
					
					  public saveUnload(callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    this.universe().storage().saveUnload(this, callback);
					  }
					
					  public delete(callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    this.universe().storage().delete(this, callback);
					  }
					
					  public discard(callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    this.universe().storage().discard(this, callback);
					  }
					
					  public timeTrees(keys: number[], callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.time.TimeTree[]>): void {
					    this.universe().storage().timeTrees(this, keys, callback);
					  }
					
					  public timeTree(key: number, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.time.TimeTree>): void {
					    this.universe().storage().timeTree(this, key, callback);
					  }
					
					  public parent(callback: org.kevoree.modeling.api.Callback<B>): void {
					  }
					
					  public children(callback: org.kevoree.modeling.api.Callback<B[]>): void {
					  }
					
					  public fork(callback: org.kevoree.modeling.api.Callback<B>): void {
					  }
					
					  public time(timePoint: number): A {
					    if (this._timesCache.containsKey(timePoint)) {
					      return this._timesCache.get(timePoint);
					    } else {
					      var newCreatedTime: A = this.internal_create(timePoint);
					      this._timesCache.put(timePoint, newCreatedTime);
					      return newCreatedTime;
					    }
					  }
					
					  public listen(listener: org.kevoree.modeling.api.ModelListener): void {
					    this.universe().storage().registerListener(this, listener);
					  }
					
					  public internal_create(timePoint: number): A {
					    throw "Abstract method";
					  }
					
					}
					
					export class AbstractKObject<A extends org.kevoree.modeling.api.KObject<any,any>, B extends org.kevoree.modeling.api.KView> implements org.kevoree.modeling.api.KObject<A, B> {
					
					  public static PARENT_INDEX: number = 0;
					  public static INBOUNDS_INDEX: number = 1;
					  private _isDirty: boolean = false;
					  private _view: B = null;
					  private _metaClass: org.kevoree.modeling.api.meta.MetaClass = null;
					  private _uuid: number = 0;
					  private _isDeleted: boolean = false;
					  private _isRoot: boolean = false;
					  private _now: number = 0;
					  private _timeTree: org.kevoree.modeling.api.time.TimeTree = null;
					  private _referenceInParent: org.kevoree.modeling.api.meta.MetaReference = null;
					  private _dimension: org.kevoree.modeling.api.KDimension<any,any,any> = null;
					
					  constructor(p_view: B, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_uuid: number, p_now: number, p_dimension: org.kevoree.modeling.api.KDimension<any,any,any>, p_timeTree: org.kevoree.modeling.api.time.TimeTree) {
					    this._view = p_view;
					    this._metaClass = p_metaClass;
					    this._uuid = p_uuid;
					    this._now = p_now;
					    this._dimension = p_dimension;
					    this._timeTree = p_timeTree;
					  }
					
					  public isDirty(): boolean {
					    return this._isDirty;
					  }
					
					  public setDirty(isDirty: boolean): void {
					    this._isDirty = isDirty;
					  }
					
					  public view(): B {
					    return this._view;
					  }
					
					  public uuid(): number {
					    return this._uuid;
					  }
					
					  public metaClass(): org.kevoree.modeling.api.meta.MetaClass {
					    return this._metaClass;
					  }
					
					  public isDeleted(): boolean {
					    return this._isDeleted;
					  }
					
					  public isRoot(): boolean {
					    return this._isRoot;
					  }
					
					  public setRoot(isRoot: boolean): void {
					    this._isRoot = isRoot;
					  }
					
					  public now(): number {
					    return this._now;
					  }
					
					  public timeTree(): org.kevoree.modeling.api.time.TimeTree {
					    return this._timeTree;
					  }
					
					  public dimension(): org.kevoree.modeling.api.KDimension<any,any,any> {
					    return this._dimension;
					  }
					
					  public path(callback: org.kevoree.modeling.api.Callback<string>): void {
					    if (this._isRoot) {
					      callback.on("/");
					    } else {
					      this.parent({on:function(parent: org.kevoree.modeling.api.KObject<any,any>){
					      if (parent == null) {
					        callback.on(null);
					      } else {
					        parent.path({on:function(parentPath: string){
					        callback.on(org.kevoree.modeling.api.util.Helper.path(parentPath, this._referenceInParent, this));
					}});
					      }
					}});
					    }
					  }
					
					  public parentUuid(): number {
					    return <number>this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ)[AbstractKObject.PARENT_INDEX];
					  }
					
					  public setParentUuid(parentKID: number): void {
					    this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE)[AbstractKObject.PARENT_INDEX] = parentKID;
					  }
					
					  public parent(callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>>): void {
					    var parentKID: number = this.parentUuid();
					    if (parentKID == null) {
					      callback.on(null);
					    } else {
					      this._view.lookup(parentKID, callback);
					    }
					  }
					
					  public set_referenceInParent(_referenceInParent: org.kevoree.modeling.api.meta.MetaReference): void {
					    this._referenceInParent = _referenceInParent;
					  }
					
					  public referenceInParent(): org.kevoree.modeling.api.meta.MetaReference {
					    return this._referenceInParent;
					  }
					
					  public delete(callback: org.kevoree.modeling.api.Callback<boolean>): void {
					  }
					
					  public select(query: string, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>[]>): void {
					    org.kevoree.modeling.api.select.KSelector.select(this, query, callback);
					  }
					
					  public stream(query: string, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>>): void {
					  }
					
					  public listen(listener: org.kevoree.modeling.api.ModelListener): void {
					    this.view().dimension().universe().storage().registerListener(this, listener);
					  }
					
					  public jump(time: number, callback: org.kevoree.modeling.api.Callback<A>): void {
					    this.view().dimension().time(time).lookup(this._uuid, {on:function(kObject: org.kevoree.modeling.api.KObject<any,any>){
					    callback.on(<A>kObject);
					}});
					  }
					
					  public domainKey(): string {
					    var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
					    var atts: org.kevoree.modeling.api.meta.MetaAttribute[] = this.metaAttributes();
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
					    return builder.toString();
					  }
					
					  public get(attribute: org.kevoree.modeling.api.meta.MetaAttribute): any {
					    return attribute.strategy().extrapolate(this, attribute, this.cachedDependencies(attribute));
					  }
					
					  public set(attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void {
					    attribute.strategy().mutate(this, attribute, payload, this.cachedDependencies(attribute));
					    var event: org.kevoree.modeling.api.KEvent = new org.kevoree.modeling.api.event.DefaultKEvent(org.kevoree.modeling.api.KActionType.SET, attribute, this, null, payload);
					    this.view().dimension().universe().storage().notify(event);
					  }
					
					  private cachedDependencies(attribute: org.kevoree.modeling.api.meta.MetaAttribute): org.kevoree.modeling.api.KObject<any,any>[] {
					    var timedDependencies: number[] = attribute.strategy().timedDependencies(this);
					    var cachedObjs: org.kevoree.modeling.api.KObject<any,any>[] = new Array();
					    for (var i: number = 0; i < timedDependencies.length; i++) {
					      if (timedDependencies[i] == this.now()) {
					        cachedObjs[i] = this;
					      } else {
					        cachedObjs[i] = this.view().dimension().universe().storage().cacheLookup(this.dimension(), timedDependencies[i], this.uuid());
					      }
					    }
					    return cachedObjs;
					  }
					
					  private getCreateOrUpdatePayloadList(obj: org.kevoree.modeling.api.KObject<any,any>, payloadIndex: number): any {
					    var previous: any = this.view().dimension().universe().storage().raw(obj, org.kevoree.modeling.api.data.AccessMode.WRITE)[payloadIndex];
					    if (previous == null) {
					      if (payloadIndex == AbstractKObject.INBOUNDS_INDEX) {
					        previous = new java.util.HashMap<number, number>();
					      } else {
					        previous = new java.util.HashSet<number>();
					      }
					      this.view().dimension().universe().storage().raw(obj, org.kevoree.modeling.api.data.AccessMode.WRITE)[payloadIndex] = previous;
					    }
					    return previous;
					  }
					
					  private removeFromContainer(param: org.kevoree.modeling.api.KObject<any,any>): void {
					    if (param != null && param.parentUuid() != null && param.parentUuid() != this._uuid) {
					      this.view().lookup(param.parentUuid(), {on:function(parent: org.kevoree.modeling.api.KObject<any,any>){
					      parent.mutate(org.kevoree.modeling.api.KActionType.REMOVE, param.referenceInParent(), param, true);
					}});
					    }
					  }
					
					  public mutate(actionType: org.kevoree.modeling.api.KActionType, metaReference: org.kevoree.modeling.api.meta.MetaReference, param: org.kevoree.modeling.api.KObject<any,any>, setOpposite: boolean): void {
					    if (actionType.equals(org.kevoree.modeling.api.KActionType.ADD)) {
					      if (metaReference.single()) {
					        this.mutate(org.kevoree.modeling.api.KActionType.SET, metaReference, param, setOpposite);
					      } else {
					        var previousList: java.util.Set<number> = <java.util.Set<number>>this.getCreateOrUpdatePayloadList(this, metaReference.index());
					        previousList.add(param.uuid());
					        if (metaReference.opposite() != null && setOpposite) {
					          param.mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference.opposite(), this, false);
					        }
					        if (metaReference.contained()) {
					          this.removeFromContainer(param);
					          (<AbstractKObject<any,any>>param).set_referenceInParent(metaReference);
					          (<AbstractKObject<any,any>>param).setParentUuid(this._uuid);
					        }
					        var inboundRefs: java.util.Map<number, number> = <java.util.Map<number, number>>this.getCreateOrUpdatePayloadList(param, AbstractKObject.INBOUNDS_INDEX);
					        inboundRefs.put(this.uuid(), metaReference.index());
					      }
					    } else {
					      if (actionType.equals(org.kevoree.modeling.api.KActionType.SET)) {
					        if (!metaReference.single()) {
					          this.mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference, param, setOpposite);
					        } else {
					          if (param == null) {
					            this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference, null, setOpposite);
					          } else {
					            var payload: any[] = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
					            var previous: any = payload[metaReference.index()];
					            if (previous != null) {
					              this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference, null, setOpposite);
					            }
					            payload[metaReference.index()] = param.uuid();
					            if (metaReference.contained()) {
					              this.removeFromContainer(param);
					              (<AbstractKObject<any,any>>param).set_referenceInParent(metaReference);
					              (<AbstractKObject<any,any>>param).setParentUuid(this._uuid);
					            }
					            var inboundRefs: java.util.Map<number, number> = <java.util.Map<number, number>>this.getCreateOrUpdatePayloadList(param, AbstractKObject.INBOUNDS_INDEX);
					            inboundRefs.put(this.uuid(), metaReference.index());
					            var self: org.kevoree.modeling.api.KObject<any,any> = this;
					            if (metaReference.opposite() != null && setOpposite) {
					              if (previous != null) {
					                this.view().lookup(<number>previous, {on:function(resolved: org.kevoree.modeling.api.KObject<any,any>){
					                resolved.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), self, false);
					}});
					              }
					              param.mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference.opposite(), this, false);
					            }
					          }
					        }
					      } else {
					        if (actionType.equals(org.kevoree.modeling.api.KActionType.REMOVE)) {
					          if (metaReference.single()) {
					            var raw: any[] = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
					            var previousKid: any = raw[metaReference.index()];
					            raw[metaReference.index()] = null;
					            if (previousKid != null) {
					              var self: org.kevoree.modeling.api.KObject<any,any> = this;
					              this._view.dimension().universe().storage().lookup(this._view, <number>previousKid, {on:function(resolvedParam: org.kevoree.modeling.api.KObject<any,any>){
					              if (resolvedParam != null) {
					                if (metaReference.contained()) {
					                  (<AbstractKObject<any,any>>resolvedParam).set_referenceInParent(null);
					                  (<AbstractKObject<any,any>>resolvedParam).setParentUuid(null);
					                }
					                if (metaReference.opposite() != null && setOpposite) {
					                  resolvedParam.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), self, false);
					                }
					                var inboundRefs: java.util.Map<number, number> = <java.util.Map<number, number>>this.getCreateOrUpdatePayloadList(resolvedParam, AbstractKObject.INBOUNDS_INDEX);
					                inboundRefs.remove(this.uuid());
					              }
					}});
					            }
					          } else {
					            var payload: any[] = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
					            var previous: any = payload[metaReference.index()];
					            if (previous != null) {
					              var previousList: java.util.Set<number> = <java.util.Set<number>>previous;
					              if (this.now() != this._now) {
					                var previousListNew: java.util.Set<number> = new java.util.HashSet<number>();
					                previousListNew.addAll(previousList);
					                previousList = previousListNew;
					                payload[metaReference.index()] = previousList;
					              }
					              previousList.remove(param.uuid());
					              if (metaReference.contained()) {
					                (<AbstractKObject<any,any>>param).set_referenceInParent(null);
					                (<AbstractKObject<any,any>>param).setParentUuid(null);
					              }
					              if (metaReference.opposite() != null && setOpposite) {
					                param.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), this, false);
					              }
					            }
					            var inboundRefs: java.util.Map<number, number> = <java.util.Map<number, number>>this.getCreateOrUpdatePayloadList(param, AbstractKObject.INBOUNDS_INDEX);
					            inboundRefs.remove(this.uuid());
					          }
					        }
					      }
					    }
					    var event: org.kevoree.modeling.api.KEvent = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, metaReference, this, null, param);
					    this.view().dimension().universe().storage().notify(event);
					  }
					
					  public size(metaReference: org.kevoree.modeling.api.meta.MetaReference): number {
					    return (<java.util.Set<any>>this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ)[metaReference.index()]).size();
					  }
					
					  public each<C extends org.kevoree.modeling.api.KObject<any,any>> (metaReference: org.kevoree.modeling.api.meta.MetaReference, callback: org.kevoree.modeling.api.Callback<C>, end: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    var o: any = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ)[metaReference.index()];
					    if (o == null) {
					      if (end != null) {
					        end.on(null);
					      } else {
					        callback.on(null);
					      }
					    } else {
					      if (o instanceof java.util.Set) {
					        var objs: java.util.Set<number> = <java.util.Set<number>>o;
					        this.view().lookupAll(objs.toArray(new Array()), {on:function(result: org.kevoree.modeling.api.KObject<any,any>[]){
					        var endAlreadyCalled: boolean = false;
					        try {
					          for (var l: number = 0; l < result.length; l++) {
					            callback.on(<C>result[l]);
					          }
					          endAlreadyCalled = true;
					          end.on(null);
					        } catch ($ex$) {
					          if ($ex$ instanceof java.lang.Throwable) {
					            var t: java.lang.Throwable = <java.lang.Throwable>$ex$;
					            if (!endAlreadyCalled) {
					              end.on(t);
					            }
					          }
					         }
					}});
					      } else {
					        this.view().lookup(<number>o, {on:function(resolved: org.kevoree.modeling.api.KObject<any,any>){
					        if (callback != null) {
					          callback.on(<C>resolved);
					        }
					        if (end != null) {
					          end.on(null);
					        }
					}});
					      }
					    }
					  }
					
					  public visitAttributes(visitor: org.kevoree.modeling.api.ModelAttributeVisitor): void {
					    var metaAttributes: org.kevoree.modeling.api.meta.MetaAttribute[] = this.metaAttributes();
					    for (var i: number = 0; i < metaAttributes.length; i++) {
					      visitor.visit(metaAttributes[i], this.get(metaAttributes[i]));
					    }
					  }
					
					  public metaAttribute(name: string): org.kevoree.modeling.api.meta.MetaAttribute {
					    for (var i: number = 0; i < this.metaAttributes().length; i++) {
					      if (this.metaAttributes()[i].metaName().equals(name)) {
					        return this.metaAttributes()[i];
					      }
					    }
					    return null;
					  }
					
					  public metaReference(name: string): org.kevoree.modeling.api.meta.MetaReference {
					    for (var i: number = 0; i < this.metaReferences().length; i++) {
					      if (this.metaReferences()[i].metaName().equals(name)) {
					        return this.metaReferences()[i];
					      }
					    }
					    return null;
					  }
					
					  public metaOperation(name: string): org.kevoree.modeling.api.meta.MetaOperation {
					    for (var i: number = 0; i < this.metaOperations().length; i++) {
					      if (this.metaOperations()[i].metaName().equals(name)) {
					        return this.metaOperations()[i];
					      }
					    }
					    return null;
					  }
					
					  public visit(visitor: org.kevoree.modeling.api.ModelVisitor, end: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    this.internal_visit(visitor, end, false, false, null);
					  }
					
					  private internal_visit(visitor: org.kevoree.modeling.api.ModelVisitor, end: org.kevoree.modeling.api.Callback<java.lang.Throwable>, deep: boolean, treeOnly: boolean, alreadyVisited: java.util.HashSet<number>): void {
					    if (alreadyVisited != null) {
					      alreadyVisited.add(this.uuid());
					    }
					    var toResolveds: java.util.Set<number> = new java.util.HashSet<number>();
					    for (var i: number = 0; i < this.metaReferences().length; i++) {
					      var reference: org.kevoree.modeling.api.meta.MetaReference = this.metaReferences()[i];
					      if (!(treeOnly && !reference.contained())) {
					        var raw: any[] = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
					        var o: any = null;
					        if (raw != null) {
					          o = raw[reference.index()];
					        }
					        if (o != null) {
					          if (o instanceof java.util.Set) {
					            var ol: java.util.Set<number> = <java.util.Set<number>>o;
					            var olArr: number[] = ol.toArray(new Array());
					            for (var k: number = 0; k < olArr.length; k++) {
					              toResolveds.add(olArr[k]);
					            }
					          } else {
					            toResolveds.add(<number>o);
					          }
					        }
					      }
					    }
					    if (toResolveds.isEmpty()) {
					      end.on(null);
					    } else {
					      this.view().lookupAll(toResolveds.toArray(new Array()), {on:function(resolveds: org.kevoree.modeling.api.KObject<any,any>[]){
					      var nextDeep: java.util.List<org.kevoree.modeling.api.KObject<any,any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any,any>>();
					      for (var i: number = 0; i < resolveds.length; i++) {
					        var resolved: org.kevoree.modeling.api.KObject<any,any> = resolveds[i];
					        var result: org.kevoree.modeling.api.VisitResult = visitor.visit(resolved);
					        if (result.equals(org.kevoree.modeling.api.VisitResult.STOP)) {
					          end.on(null);
					        } else {
					          if (deep) {
					            if (result.equals(org.kevoree.modeling.api.VisitResult.CONTINUE)) {
					              if (alreadyVisited == null || !alreadyVisited.contains(resolved.uuid())) {
					                nextDeep.add(resolved);
					              }
					            }
					          }
					        }
					      }
					      if (!nextDeep.isEmpty()) {
					        var ii: number[] = new Array();
					        ii[0] = 0;
					        var next: org.kevoree.modeling.api.Callback<java.lang.Throwable>[] = new Array();
					        next[0] = {on:function(throwable: java.lang.Throwable){
					        ii[0] = ii[0] + 1;
					        if (ii[0] == nextDeep.size()) {
					          end.on(null);
					        } else {
					          if (treeOnly) {
					            nextDeep.get(ii[0]).treeVisit(visitor, next[0]);
					          } else {
					            nextDeep.get(ii[0]).graphVisit(visitor, next[0]);
					          }
					        }
					}};
					        if (treeOnly) {
					          nextDeep.get(ii[0]).treeVisit(visitor, next[0]);
					        } else {
					          nextDeep.get(ii[0]).graphVisit(visitor, next[0]);
					        }
					      } else {
					        end.on(null);
					      }
					}});
					    }
					  }
					
					  public graphVisit(visitor: org.kevoree.modeling.api.ModelVisitor, end: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    this.internal_visit(visitor, end, true, false, new java.util.HashSet<number>());
					  }
					
					  public treeVisit(visitor: org.kevoree.modeling.api.ModelVisitor, end: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    this.internal_visit(visitor, end, true, true, null);
					  }
					
					  public toJSON(): string {
					    var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
					    builder.append("{\n");
					    builder.append("\t\"" + org.kevoree.modeling.api.json.JSONModelSerializer.KEY_META + "\" : \"");
					    builder.append(this.metaClass().metaName());
					    builder.append("\",\n");
					    builder.append("\t\"" + org.kevoree.modeling.api.json.JSONModelSerializer.KEY_UUID + "\" : \"");
					    builder.append(this.uuid());
					    if (this.isRoot()) {
					      builder.append("\",\n");
					      builder.append("\t\"" + org.kevoree.modeling.api.json.JSONModelSerializer.KEY_ROOT + "\" : \"");
					      builder.append("true");
					    }
					    builder.append("\",\n");
					    for (var i: number = 0; i < this.metaAttributes().length; i++) {
					      var payload: any = this.get(this.metaAttributes()[i]);
					      if (payload != null) {
					        builder.append("\t");
					        builder.append("\"");
					        builder.append(this.metaAttributes()[i].metaName());
					        builder.append("\":\"");
					        builder.append(payload);
					        builder.append("\",\n");
					      }
					    }
					    for (var i: number = 0; i < this.metaReferences().length; i++) {
					      var raw: any[] = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
					      var payload: any = null;
					      if (raw != null) {
					        payload = raw[this.metaReferences()[i].index()];
					      }
					      if (payload != null) {
					        builder.append("\t");
					        builder.append("\"");
					        builder.append(this.metaReferences()[i].metaName());
					        builder.append("\":");
					        if (this.metaReferences()[i].single()) {
					          builder.append("\"");
					          builder.append(payload);
					          builder.append("\"");
					        } else {
					          var elems: java.util.Set<number> = <java.util.Set<number>>payload;
					          var elemsArr: number[] = elems.toArray(new Array());
					          var isFirst: boolean = true;
					          builder.append(" [");
					          for (var j: number = 0; j < elemsArr.length; j++) {
					            if (!isFirst) {
					              builder.append(",");
					            }
					            builder.append("\"");
					            builder.append(elemsArr[j]);
					            builder.append("\"");
					            isFirst = false;
					          }
					          builder.append("]");
					        }
					        builder.append(",\n");
					      }
					    }
					    builder.append("}\n");
					    return builder.toString();
					  }
					
					  public toString(): string {
					    return this.toJSON();
					  }
					
					  public traces(request: org.kevoree.modeling.api.TraceRequest): org.kevoree.modeling.api.trace.ModelTrace[] {
					    var traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
					    if (org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_ONLY.equals(request) || org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
					      for (var i: number = 0; i < this.metaAttributes().length; i++) {
					        var current: org.kevoree.modeling.api.meta.MetaAttribute = this.metaAttributes()[i];
					        var payload: any = this.get(current);
					        if (payload != null) {
					          traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(this._uuid, current, payload));
					        }
					      }
					    }
					    if (org.kevoree.modeling.api.TraceRequest.REFERENCES_ONLY.equals(request) || org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
					      for (var i: number = 0; i < this.metaReferences().length; i++) {
					        var ref: org.kevoree.modeling.api.meta.MetaReference = this.metaReferences()[i];
					        var raw: any[] = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
					        var o: any = null;
					        if (raw != null) {
					          o = raw[ref.index()];
					        }
					        if (o instanceof java.util.Set) {
					          var contents: java.util.Set<number> = <java.util.Set<number>>o;
					          var contentsArr: number[] = contents.toArray(new Array());
					          for (var j: number = 0; j < contentsArr.length; j++) {
					            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(this._uuid, ref, contentsArr[j], null));
					          }
					        } else {
					          if (o != null) {
					            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(this._uuid, ref, <number>o, null));
					          }
					        }
					      }
					    }
					    return traces.toArray(new Array());
					  }
					
					  public inbounds(callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.InboundReference>, end: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    var rawPayload: any[] = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
					    if (rawPayload == null) {
					      end.on(new java.lang.Exception("Object not initialized."));
					    } else {
					      var payload: any = rawPayload[AbstractKObject.INBOUNDS_INDEX];
					      if (payload != null) {
					        if (payload instanceof java.util.Map) {
					          var refs: java.util.Map<number, number> = <java.util.Map<number, number>>payload;
					          var oppositeKids: java.util.Set<number> = new java.util.HashSet<number>();
					          oppositeKids.addAll(refs.keySet());
					          this._view.lookupAll(oppositeKids.toArray(new Array()), {on:function(oppositeElements: org.kevoree.modeling.api.KObject<any,any>[]){
					          if (oppositeElements != null) {
					            for (var k: number = 0; k < oppositeElements.length; k++) {
					              var opposite: org.kevoree.modeling.api.KObject<any,any> = oppositeElements[k];
					              var inboundRef: number = refs.get(opposite.uuid());
					              var metaRef: org.kevoree.modeling.api.meta.MetaReference = null;
					              var metaReferences: org.kevoree.modeling.api.meta.MetaReference[] = opposite.metaReferences();
					              for (var i: number = 0; i < metaReferences.length; i++) {
					                if (metaReferences[i].index() == inboundRef) {
					                  metaRef = metaReferences[i];
					                  break;
					                }
					              }
					              if (metaRef != null) {
					                var reference: org.kevoree.modeling.api.InboundReference = new org.kevoree.modeling.api.InboundReference(metaRef, opposite);
					                try {
					                  callback.on(reference);
					                } catch ($ex$) {
					                  if ($ex$ instanceof java.lang.Throwable) {
					                    var t: java.lang.Throwable = <java.lang.Throwable>$ex$;
					                    end.on(t);
					                  }
					                 }
					              } else {
					                end.on(new java.lang.Exception("MetaReference not found with index:" + inboundRef + " in refs of " + opposite.metaClass().metaName()));
					              }
					            }
					            end.on(null);
					          } else {
					            end.on(new java.lang.Exception("Could not resolve opposite objects"));
					          }
					}});
					        } else {
					          end.on(new java.lang.Exception("Inbound refs payload is not a cset"));
					        }
					      } else {
					        end.on(null);
					      }
					    }
					  }
					
					  public metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[] {
					    throw "Abstract method";
					  }
					
					  public metaReferences(): org.kevoree.modeling.api.meta.MetaReference[] {
					    throw "Abstract method";
					  }
					
					  public metaOperations(): org.kevoree.modeling.api.meta.MetaOperation[] {
					    throw "Abstract method";
					  }
					
					}
					
					export class AbstractKUniverse<A extends org.kevoree.modeling.api.KDimension<any,any,any>> implements org.kevoree.modeling.api.KUniverse<A> {
					
					  private _storage: org.kevoree.modeling.api.data.KStore = null;
					
					  constructor(kDataBase: org.kevoree.modeling.api.data.KDataBase) {
					    this._storage = new org.kevoree.modeling.api.data.DefaultKStore(kDataBase);
					  }
					
					  public storage(): org.kevoree.modeling.api.data.KStore {
					    return this._storage;
					  }
					
					  public newDimension(callback: org.kevoree.modeling.api.Callback<A>): void {
					    var nextKey: number = this._storage.nextDimensionKey();
					    var newDimension: A = this.internal_create(nextKey);
					    this.storage().initDimension(newDimension, {on:function(throwable: java.lang.Throwable){
					    callback.on(newDimension);
					}});
					  }
					
					  public internal_create(key: number): A {
					    throw "Abstract method";
					  }
					
					  public dimension(key: number, callback: org.kevoree.modeling.api.Callback<A>): void {
					    var existingDimension: A = <A>this._storage.getDimension(key);
					    if (existingDimension != null) {
					      callback.on(existingDimension);
					    } else {
					      var newDimension: A = this.internal_create(key);
					      this.storage().initDimension(newDimension, {on:function(throwable: java.lang.Throwable){
					      callback.on(newDimension);
					}});
					    }
					  }
					
					  public saveAll(callback: org.kevoree.modeling.api.Callback<boolean>): void {
					  }
					
					  public deleteAll(callback: org.kevoree.modeling.api.Callback<boolean>): void {
					  }
					
					  public unloadAll(callback: org.kevoree.modeling.api.Callback<boolean>): void {
					  }
					
					  public disable(listener: org.kevoree.modeling.api.ModelListener): void {
					  }
					
					  public stream(query: string, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>>): void {
					  }
					
					  public listen(listener: org.kevoree.modeling.api.ModelListener): void {
					    this.storage().registerListener(this, listener);
					  }
					
					}
					
					export class AbstractKView implements org.kevoree.modeling.api.KView {
					
					  private _now: number = 0;
					  private _dimension: org.kevoree.modeling.api.KDimension<any,any,any> = null;
					
					  constructor(p_now: number, p_dimension: org.kevoree.modeling.api.KDimension<any,any,any>) {
					    this._now = p_now;
					    this._dimension = p_dimension;
					  }
					
					  public now(): number {
					    return this._now;
					  }
					
					  public dimension(): org.kevoree.modeling.api.KDimension<any,any,any> {
					    return this._dimension;
					  }
					
					  public createJSONSerializer(): org.kevoree.modeling.api.ModelSerializer {
					    return new org.kevoree.modeling.api.json.JSONModelSerializer();
					  }
					
					  public createJSONLoader(): org.kevoree.modeling.api.ModelLoader {
					    return new org.kevoree.modeling.api.json.JSONModelLoader(this);
					  }
					
					  public createXMISerializer(): org.kevoree.modeling.api.ModelSerializer {
					    return new org.kevoree.modeling.api.xmi.XMIModelSerializer();
					  }
					
					  public createXMILoader(): org.kevoree.modeling.api.ModelLoader {
					    return new org.kevoree.modeling.api.xmi.XMIModelLoader(this);
					  }
					
					  public createModelCompare(): org.kevoree.modeling.api.ModelCompare {
					    return new org.kevoree.modeling.api.compare.DefaultModelCompare(this);
					  }
					
					  public createModelCloner(): org.kevoree.modeling.api.ModelCloner<any> {
					    return new org.kevoree.modeling.api.clone.DefaultModelCloner(this);
					  }
					
					  public createModelSlicer(): org.kevoree.modeling.api.ModelSlicer {
					    return new org.kevoree.modeling.api.slice.DefaultModelSlicer();
					  }
					
					  public metaClass(fqName: string): org.kevoree.modeling.api.meta.MetaClass {
					    var metaClasses: org.kevoree.modeling.api.meta.MetaClass[] = this.metaClasses();
					    for (var i: number = 0; i < metaClasses.length; i++) {
					      if (metaClasses[i].metaName().equals(fqName)) {
					        return metaClasses[i];
					      }
					    }
					    return null;
					  }
					
					  public createFQN(metaClassName: string): org.kevoree.modeling.api.KObject<any,any> {
					    return this.create(this.metaClass(metaClassName));
					  }
					
					  public manageCache(obj: org.kevoree.modeling.api.KObject<any,any>): org.kevoree.modeling.api.KObject<any,any> {
					    this.dimension().universe().storage().initKObject(obj, this);
					    return obj;
					  }
					
					  public setRoot(elem: org.kevoree.modeling.api.KObject<any,any>): void {
					    (<AbstractKObject<any,any>>elem).set_referenceInParent(null);
					    (<AbstractKObject<any,any>>elem).setRoot(true);
					    this.dimension().universe().storage().setRoot(elem);
					  }
					
					  public select(query: string, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>[]>): void {
					    this.dimension().universe().storage().getRoot(this, {on:function(rootObj: org.kevoree.modeling.api.KObject<any,any>){
					    var cleanedQuery: string = query;
					    if (cleanedQuery.equals("/")) {
					      var res: java.util.ArrayList<org.kevoree.modeling.api.KObject<any,any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any,any>>();
					      if (rootObj != null) {
					        res.add(rootObj);
					      }
					      callback.on(res.toArray(new Array()));
					    } else {
					      if (cleanedQuery.startsWith("/")) {
					        cleanedQuery = cleanedQuery.substring(1);
					      }
					      org.kevoree.modeling.api.select.KSelector.select(rootObj, cleanedQuery, callback);
					    }
					}});
					  }
					
					  public lookup(kid: number, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>>): void {
					    this.dimension().universe().storage().lookup(this, kid, callback);
					  }
					
					  public lookupAll(keys: number[], callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>[]>): void {
					    this.dimension().universe().storage().lookupAll(this, keys, callback);
					  }
					
					  public stream(query: string, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>>): void {
					  }
					
					  public createProxy(clazz: org.kevoree.modeling.api.meta.MetaClass, timeTree: org.kevoree.modeling.api.time.TimeTree, key: number): org.kevoree.modeling.api.KObject<any,any> {
					    return this.internalCreate(clazz, timeTree, key);
					  }
					
					  public create(clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject<any,any> {
					    var newObj: org.kevoree.modeling.api.KObject<any,any> = this.internalCreate(clazz, new org.kevoree.modeling.api.time.DefaultTimeTree().insert(this.now()), this.dimension().universe().storage().nextObjectKey());
					    if (newObj != null) {
					      this.dimension().universe().storage().notify(new org.kevoree.modeling.api.event.DefaultKEvent(org.kevoree.modeling.api.KActionType.NEW, null, newObj, null, newObj));
					    }
					    return newObj;
					  }
					
					  public listen(listener: org.kevoree.modeling.api.ModelListener): void {
					    this.dimension().universe().storage().registerListener(this, listener);
					  }
					
					  public internalCreate(clazz: org.kevoree.modeling.api.meta.MetaClass, timeTree: org.kevoree.modeling.api.time.TimeTree, key: number): org.kevoree.modeling.api.KObject<any,any> {
					    throw "Abstract method";
					  }
					
					  public metaClasses(): org.kevoree.modeling.api.meta.MetaClass[] {
					    throw "Abstract method";
					  }
					
					}
				}
				
				export interface Callback<A> {
				
				  on(a: A): void;
				
				}
				export module clone {
					
					export class DefaultModelCloner implements org.kevoree.modeling.api.ModelCloner<org.kevoree.modeling.api.KObject<any,any>> {
					
					  private _factory: org.kevoree.modeling.api.KView = null;
					
					  constructor(p_factory: org.kevoree.modeling.api.KView) {
					    this._factory = p_factory;
					  }
					
					  public clone(originalObject: org.kevoree.modeling.api.KObject<any,any>, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>>): void {
					    if (originalObject == null || originalObject.view() == null || originalObject.view().dimension() == null) {
					      callback.on(null);
					    } else {
					      originalObject.view().dimension().fork({on:function(o: org.kevoree.modeling.api.KDimension<any,any,any>){
					      o.time(originalObject.view().now()).lookup(originalObject.uuid(), {on:function(clonedObject: org.kevoree.modeling.api.KObject<any,any>){
					      callback.on(clonedObject);
					}});
					}});
					    }
					  }
					
					}
				}
				export module compare {
					
					export class DefaultModelCompare implements org.kevoree.modeling.api.ModelCompare {
					
					  private _factory: org.kevoree.modeling.api.KView = null;
					
					  constructor(p_factory: org.kevoree.modeling.api.KView) {
					    this._factory = p_factory;
					  }
					
					  public diff(origin: org.kevoree.modeling.api.KObject<any,any>, target: org.kevoree.modeling.api.KObject<any,any>, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.trace.TraceSequence>): void {
					    this.internal_diff(origin, target, false, false, callback);
					  }
					
					  public union(origin: org.kevoree.modeling.api.KObject<any,any>, target: org.kevoree.modeling.api.KObject<any,any>, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.trace.TraceSequence>): void {
					    this.internal_diff(origin, target, false, true, callback);
					  }
					
					  public intersection(origin: org.kevoree.modeling.api.KObject<any,any>, target: org.kevoree.modeling.api.KObject<any,any>, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.trace.TraceSequence>): void {
					    this.internal_diff(origin, target, true, false, callback);
					  }
					
					  private internal_diff(origin: org.kevoree.modeling.api.KObject<any,any>, target: org.kevoree.modeling.api.KObject<any,any>, inter: boolean, merge: boolean, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.trace.TraceSequence>): void {
					    var traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
					    var tracesRef: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
					    var objectsMap: java.util.Map<number, org.kevoree.modeling.api.KObject<any,any>> = new java.util.HashMap<number, org.kevoree.modeling.api.KObject<any,any>>();
					    traces.addAll(this.internal_createTraces(origin, target, inter, merge, false, true));
					    tracesRef.addAll(this.internal_createTraces(origin, target, inter, merge, true, false));
					    origin.treeVisit({visit:function(elem: org.kevoree.modeling.api.KObject<any,any>){
					    objectsMap.put(elem.uuid(), elem);
					    return org.kevoree.modeling.api.VisitResult.CONTINUE;
					}}, {on:function(throwable: java.lang.Throwable){
					    if (throwable != null) {
					      throwable.printStackTrace();
					      callback.on(null);
					    } else {
					      target.treeVisit({visit:function(elem: org.kevoree.modeling.api.KObject<any,any>){
					      var childPath: number = elem.uuid();
					      if (objectsMap.containsKey(childPath)) {
					        if (inter) {
					          var currentReference: org.kevoree.modeling.api.meta.MetaReference = null;
					          traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.parentUuid(), currentReference, elem.uuid(), elem.metaClass()));
					        }
					        traces.addAll(this.internal_createTraces(objectsMap.get(childPath), elem, inter, merge, false, true));
					        tracesRef.addAll(this.internal_createTraces(objectsMap.get(childPath), elem, inter, merge, true, false));
					        objectsMap.remove(childPath);
					      } else {
					        if (!inter) {
					          var currentReference: org.kevoree.modeling.api.meta.MetaReference = null;
					          traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.parentUuid(), currentReference, elem.uuid(), elem.metaClass()));
					          traces.addAll(this.internal_createTraces(elem, elem, true, merge, false, true));
					          tracesRef.addAll(this.internal_createTraces(elem, elem, true, merge, true, false));
					        }
					      }
					      return org.kevoree.modeling.api.VisitResult.CONTINUE;
					}}, {on:function(throwable: java.lang.Throwable){
					      if (throwable != null) {
					        throwable.printStackTrace();
					        callback.on(null);
					      } else {
					        traces.addAll(tracesRef);
					        if (!inter && !merge) {
					          var diffChildKeys: number[] = objectsMap.keySet().toArray(new Array());
					          for (var i: number = 0; i < diffChildKeys.length; i++) {
					            var diffChildKey: number = diffChildKeys[i];
					            var diffChild: org.kevoree.modeling.api.KObject<any,any> = objectsMap.get(diffChildKey);
					            var src: number = diffChild.parentUuid();
					            traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(src, diffChild.referenceInParent(), diffChild.uuid()));
					          }
					        }
					        callback.on(new org.kevoree.modeling.api.trace.TraceSequence().populate(traces));
					      }
					}});
					    }
					}});
					  }
					
					  public internal_createTraces(current: org.kevoree.modeling.api.KObject<any,any>, sibling: org.kevoree.modeling.api.KObject<any,any>, inter: boolean, merge: boolean, references: boolean, attributes: boolean): java.util.List<org.kevoree.modeling.api.trace.ModelTrace> {
					    var traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
					    var values: java.util.Map<org.kevoree.modeling.api.meta.MetaAttribute, string> = new java.util.HashMap<org.kevoree.modeling.api.meta.MetaAttribute, string>();
					    if (attributes) {
					      if (current != null) {
					        current.visitAttributes({visit:function(metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute, value: any){
					        if (value == null) {
					          values.put(metaAttribute, null);
					        } else {
					          values.put(metaAttribute, value.toString());
					        }
					}});
					      }
					      if (sibling != null) {
					        sibling.visitAttributes({visit:function(metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute, value: any){
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
					}});
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
					      for (var i: number = 0; i < current.metaReferences().length; i++) {
					        var reference: org.kevoree.modeling.api.meta.MetaReference = current.metaReferences()[i];
					        var payload: any = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[reference.index()];
					        valuesRef.put(reference, payload);
					      }
					      if (sibling != null) {
					        for (var i: number = 0; i < sibling.metaReferences().length; i++) {
					          var reference: org.kevoree.modeling.api.meta.MetaReference = sibling.metaReferences()[i];
					          var payload2: any = sibling.view().dimension().universe().storage().raw(sibling, org.kevoree.modeling.api.data.AccessMode.READ)[reference.index()];
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
					                  traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, <number>payload2, null));
					                }
					              }
					            } else {
					              if (!inter) {
					                traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, <number>payload2, null));
					              }
					            }
					          } else {
					            if (payload1 == null && payload2 != null) {
					              var siblingToAdd: number[] = (<java.util.Set<number>>payload2).toArray(new Array());
					              for (var j: number = 0; j < siblingToAdd.length; j++) {
					                var siblingElem: number = siblingToAdd[j];
					                if (!inter) {
					                  traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, siblingElem, null));
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
					                      traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, currentPath, null));
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
				export module data {
					
					export class AccessMode {
					
					  public static READ: AccessMode = new AccessMode();
					  public static WRITE: AccessMode = new AccessMode();
					  public equals(other: any): boolean {
					        return this == other;
					    }
					
					}
					export module cache {
						
						export class DimensionCache {
						
						  public timeTreeCache: java.util.Map<number, org.kevoree.modeling.api.time.TimeTree> = new java.util.HashMap<number, org.kevoree.modeling.api.time.TimeTree>();
						  public timesCaches: java.util.Map<number, TimeCache> = new java.util.HashMap<number, TimeCache>();
						  public dimension: org.kevoree.modeling.api.KDimension<any,any,any> = null;
						  public rootTimeTree: org.kevoree.modeling.api.time.TimeTree = new org.kevoree.modeling.api.time.DefaultTimeTree();
						  public listeners: java.util.List<org.kevoree.modeling.api.ModelListener> = new java.util.ArrayList<org.kevoree.modeling.api.ModelListener>();
						
						  constructor(dimension: org.kevoree.modeling.api.KDimension<any,any,any>) {
						    this.dimension = dimension;
						  }
						
						}
						
						export class TimeCache {
						
						  public obj_cache: java.util.Map<number, org.kevoree.modeling.api.KObject<any,any>> = new java.util.HashMap<number, org.kevoree.modeling.api.KObject<any,any>>();
						  public payload_cache: java.util.Map<number, any[]> = new java.util.HashMap<number, any[]>();
						  public root: org.kevoree.modeling.api.KObject<any,any> = null;
						  public rootDirty: boolean = false;
						  public listeners: java.util.List<org.kevoree.modeling.api.ModelListener> = new java.util.ArrayList<org.kevoree.modeling.api.ModelListener>();
						  public obj_listeners: java.util.Map<number, java.util.List<org.kevoree.modeling.api.ModelListener>> = new java.util.HashMap<number, java.util.List<org.kevoree.modeling.api.ModelListener>>();
						
						}
					}
					
					export class DefaultKStore implements KStore {
					
					  public static KEY_SEP: string = ',';
					  private _db: KDataBase = null;
					  private universeListeners: java.util.List<org.kevoree.modeling.api.ModelListener> = new java.util.ArrayList<org.kevoree.modeling.api.ModelListener>();
					  private caches: java.util.Map<number, org.kevoree.modeling.api.data.cache.DimensionCache> = new java.util.HashMap<number, org.kevoree.modeling.api.data.cache.DimensionCache>();
					  public dimKeyCounter: number = 0;
					  public objectKey: number = 0;
					
					  constructor(p_db: KDataBase) {
					    this._db = p_db;
					  }
					
					  private keyTree(dim: org.kevoree.modeling.api.KDimension<any,any,any>, key: number): string {
					    return "" + dim.key() + DefaultKStore.KEY_SEP + key;
					  }
					
					  private keyRoot(dim: org.kevoree.modeling.api.KDimension<any,any,any>, time: number): string {
					    return dim.key() + DefaultKStore.KEY_SEP + time + DefaultKStore.KEY_SEP + "root";
					  }
					
					  private keyRootTree(dim: org.kevoree.modeling.api.KDimension<any,any,any>): string {
					    return dim.key() + DefaultKStore.KEY_SEP + "root";
					  }
					
					  private keyPayload(dim: org.kevoree.modeling.api.KDimension<any,any,any>, time: number, key: number): string {
					    return "" + dim.key() + DefaultKStore.KEY_SEP + time + DefaultKStore.KEY_SEP + key;
					  }
					
					  public initDimension(dimension: org.kevoree.modeling.api.KDimension<any,any,any>, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = new org.kevoree.modeling.api.data.cache.DimensionCache(dimension);
					    this.caches.put(dimension.key(), dimensionCache);
					    var rootTreeKeys: string[] = new Array();
					    rootTreeKeys[0] = this.keyRootTree(dimension);
					    this._db.get(rootTreeKeys, {on:function(res: string[], error: java.lang.Throwable){
					    if (error != null) {
					      callback.on(error);
					    } else {
					      try {
					        (<org.kevoree.modeling.api.time.DefaultTimeTree>dimensionCache.rootTimeTree).load(res[0]);
					        callback.on(null);
					      } catch ($ex$) {
					        if ($ex$ instanceof java.lang.Exception) {
					          var e: java.lang.Exception = <java.lang.Exception>$ex$;
					          callback.on(e);
					        }
					       }
					    }
					}});
					  }
					
					  public initKObject(obj: org.kevoree.modeling.api.KObject<any,any>, originView: org.kevoree.modeling.api.KView): void {
					    var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(originView.dimension().key());
					    if (!dimensionCache.timeTreeCache.containsKey(obj.uuid())) {
					      dimensionCache.timeTreeCache.put(obj.uuid(), obj.timeTree());
					    }
					    var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get(originView.now());
					    if (timeCache == null) {
					      timeCache = new org.kevoree.modeling.api.data.cache.TimeCache();
					      dimensionCache.timesCaches.put(originView.now(), timeCache);
					    }
					    timeCache.obj_cache.put(obj.uuid(), obj);
					  }
					
					  public nextDimensionKey(): number {
					    this.dimKeyCounter++;
					    return this.dimKeyCounter;
					  }
					
					  public nextObjectKey(): number {
					    this.objectKey++;
					    return this.objectKey;
					  }
					
					  public cacheLookup(dimension: org.kevoree.modeling.api.KDimension<any,any,any>, time: number, key: number): org.kevoree.modeling.api.KObject<any,any> {
					    var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(dimension.key());
					    var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get(time);
					    if (timeCache == null) {
					      return null;
					    } else {
					      return timeCache.obj_cache.get(key);
					    }
					  }
					
					  public raw(origin: org.kevoree.modeling.api.KObject<any,any>, accessMode: AccessMode): any[] {
					    if (accessMode.equals(AccessMode.WRITE)) {
					      (<org.kevoree.modeling.api.abs.AbstractKObject<any,any>>origin).setDirty(true);
					    }
					    var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(origin.dimension().key());
					    var resolvedTime: number = origin.timeTree().resolve(origin.now());
					    var needCopy: boolean = accessMode.equals(AccessMode.WRITE) && resolvedTime != origin.now();
					    var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get(resolvedTime);
					    if (timeCache == null) {
					      timeCache = new org.kevoree.modeling.api.data.cache.TimeCache();
					      dimensionCache.timesCaches.put(resolvedTime, timeCache);
					    }
					    var payload: any[] = timeCache.payload_cache.get(origin.uuid());
					    if (payload == null) {
					      payload = new Array();
					      if (accessMode.equals(AccessMode.WRITE) && !needCopy) {
					        timeCache.payload_cache.put(origin.uuid(), payload);
					      }
					    }
					    if (!needCopy) {
					      return payload;
					    } else {
					      var cloned: any[] = new Array();
					      for (var i: number = 0; i < payload.length; i++) {
					        var resolved: any = payload[i];
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
					              cloned[i] = resolved;
					            }
					          }
					        }
					      }
					      var timeCacheCurrent: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get(origin.now());
					      if (timeCacheCurrent == null) {
					        timeCacheCurrent = new org.kevoree.modeling.api.data.cache.TimeCache();
					        dimensionCache.timesCaches.put(origin.view().now(), timeCacheCurrent);
					      }
					      timeCacheCurrent.payload_cache.put(origin.uuid(), cloned);
					      origin.timeTree().insert(origin.view().now());
					      return cloned;
					    }
					  }
					
					  public discard(dimension: org.kevoree.modeling.api.KDimension<any,any,any>, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    this.caches.remove(dimension.key());
					    callback.on(null);
					  }
					
					  public delete(dimension: org.kevoree.modeling.api.KDimension<any,any,any>, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    new java.lang.Exception("Not implemented yet !");
					  }
					
					  public save(dimension: org.kevoree.modeling.api.KDimension<any,any,any>, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(dimension.key());
					    if (dimensionCache == null) {
					      callback.on(null);
					    } else {
					      var sizeCache: number = 0;
					      var timeCaches: org.kevoree.modeling.api.data.cache.TimeCache[] = dimensionCache.timesCaches.values().toArray(new Array());
					      for (var i: number = 0; i < timeCaches.length; i++) {
					        var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = timeCaches[i];
					        var valuesArr: org.kevoree.modeling.api.KObject<any,any>[] = timeCache.obj_cache.values().toArray(new Array());
					        for (var j: number = 0; j < valuesArr.length; j++) {
					          var cached: org.kevoree.modeling.api.KObject<any,any> = valuesArr[j];
					          if (cached.isDirty()) {
					            sizeCache++;
					          }
					        }
					        if (timeCache.rootDirty) {
					          sizeCache++;
					        }
					      }
					      var timeTrees: org.kevoree.modeling.api.time.TimeTree[] = dimensionCache.timeTreeCache.values().toArray(new Array());
					      for (var i: number = 0; i < timeTrees.length; i++) {
					        var timeTree: org.kevoree.modeling.api.time.TimeTree = timeTrees[i];
					        if (timeTree.isDirty()) {
					          sizeCache++;
					        }
					      }
					      if (dimensionCache.rootTimeTree.isDirty()) {
					        sizeCache++;
					      }
					      var payloads: string[][] = new Array(new Array());
					      var i: number = 0;
					      for (var j: number = 0; j < timeCaches.length; j++) {
					        var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = timeCaches[j];
					        var valuesArr: org.kevoree.modeling.api.KObject<any,any>[] = timeCache.obj_cache.values().toArray(new Array());
					        for (var k: number = 0; k < valuesArr.length; k++) {
					          var cached: org.kevoree.modeling.api.KObject<any,any> = valuesArr[k];
					          if (cached.isDirty()) {
					            payloads[i][0] = this.keyPayload(dimension, cached.now(), cached.uuid());
					            payloads[i][1] = cached.toJSON();
					            (<org.kevoree.modeling.api.abs.AbstractKObject<any,any>>cached).setDirty(false);
					            i++;
					          }
					        }
					        if (timeCache.rootDirty) {
					          payloads[i][0] = this.keyRoot(dimension, timeCache.root.now());
					          payloads[i][1] = timeCache.root.uuid() + "";
					          timeCache.rootDirty = false;
					          i++;
					        }
					      }
					      var keyArr: number[] = dimensionCache.timeTreeCache.keySet().toArray(new Array());
					      for (var k: number = 0; k < keyArr.length; k++) {
					        var timeTreeKey: number = keyArr[k];
					        var timeTree: org.kevoree.modeling.api.time.TimeTree = dimensionCache.timeTreeCache.get(timeTreeKey);
					        if (timeTree.isDirty()) {
					          payloads[i][0] = this.keyTree(dimension, timeTreeKey);
					          payloads[i][1] = timeTree.toString();
					          (<org.kevoree.modeling.api.time.DefaultTimeTree>timeTree).setDirty(false);
					          i++;
					        }
					      }
					      if (dimensionCache.rootTimeTree.isDirty()) {
					        payloads[i][0] = this.keyRootTree(dimension);
					        payloads[i][1] = dimensionCache.rootTimeTree.toString();
					        (<org.kevoree.modeling.api.time.DefaultTimeTree>dimensionCache.rootTimeTree).setDirty(false);
					        i++;
					      }
					      this._db.put(payloads, callback);
					    }
					  }
					
					  public saveUnload(dimension: org.kevoree.modeling.api.KDimension<any,any,any>, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    this.save(dimension, {on:function(throwable: java.lang.Throwable){
					    if (throwable == null) {
					      this.discard(dimension, callback);
					    } else {
					      callback.on(throwable);
					    }
					}});
					  }
					
					  public timeTree(dimension: org.kevoree.modeling.api.KDimension<any,any,any>, key: number, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.time.TimeTree>): void {
					    var keys: number[] = new Array();
					    keys[0] = key;
					    this.timeTrees(dimension, keys, {on:function(timeTrees: org.kevoree.modeling.api.time.TimeTree[]){
					    if (timeTrees.length == 1) {
					      callback.on(timeTrees[0]);
					    } else {
					      callback.on(null);
					    }
					}});
					  }
					
					  public timeTrees(dimension: org.kevoree.modeling.api.KDimension<any,any,any>, keys: number[], callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.time.TimeTree[]>): void {
					    var toLoad: java.util.List<number> = new java.util.ArrayList<number>();
					    var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(dimension.key());
					    var result: org.kevoree.modeling.api.time.TimeTree[] = new Array();
					    for (var i: number = 0; i < keys.length; i++) {
					      var cachedTree: org.kevoree.modeling.api.time.TimeTree = dimensionCache.timeTreeCache.get(keys[i]);
					      if (cachedTree != null) {
					        result[i] = cachedTree;
					      } else {
					        toLoad.add(i);
					      }
					    }
					    if (toLoad.isEmpty()) {
					      callback.on(result);
					    } else {
					      var toLoadKeys: string[] = new Array();
					      for (var i: number = 0; i < toLoadKeys.length; i++) {
					        toLoadKeys[i] = this.keyTree(dimension, keys[toLoad.get(i)]);
					      }
					      this._db.get(toLoadKeys, {on:function(res: string[], error: java.lang.Throwable){
					      if (error != null) {
					        error.printStackTrace();
					      }
					      for (var i: number = 0; i < res.length; i++) {
					        var newTree: org.kevoree.modeling.api.time.DefaultTimeTree = new org.kevoree.modeling.api.time.DefaultTimeTree();
					        try {
					          if (res[i] != null) {
					            newTree.load(res[i]);
					          } else {
					            newTree.insert(dimension.key());
					          }
					          dimensionCache.timeTreeCache.put(keys[toLoad.get(i)], newTree);
					          result[toLoad.get(i)] = newTree;
					        } catch ($ex$) {
					          if ($ex$ instanceof java.lang.Exception) {
					            var e: java.lang.Exception = <java.lang.Exception>$ex$;
					            e.printStackTrace();
					          }
					         }
					      }
					      callback.on(result);
					}});
					    }
					  }
					
					  public lookup(originView: org.kevoree.modeling.api.KView, key: number, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>>): void {
					    if (callback == null) {
					      return;
					    }
					    this.timeTree(originView.dimension(), key, {on:function(timeTree: org.kevoree.modeling.api.time.TimeTree){
					    var resolvedTime: number = timeTree.resolve(originView.now());
					    if (resolvedTime == null) {
					      callback.on(null);
					    } else {
					      var resolved: org.kevoree.modeling.api.KObject<any,any> = this.cacheLookup(originView.dimension(), resolvedTime, key);
					      if (resolved != null) {
					        if (originView.now() == resolvedTime) {
					          callback.on(resolved);
					        } else {
					          var proxy: org.kevoree.modeling.api.KObject<any,any> = originView.createProxy(resolved.metaClass(), resolved.timeTree(), key);
					          callback.on(proxy);
					        }
					      } else {
					        var keys: number[] = new Array();
					        keys[0] = key;
					        this.loadObjectInCache(originView, keys, {on:function(dbResolved: java.util.List<org.kevoree.modeling.api.KObject<any,any>>){
					        if (dbResolved.size() == 0) {
					          callback.on(null);
					        } else {
					          var dbResolvedZero: org.kevoree.modeling.api.KObject<any,any> = dbResolved.get(0);
					          if (resolvedTime != originView.now()) {
					            var proxy: org.kevoree.modeling.api.KObject<any,any> = originView.createProxy(dbResolvedZero.metaClass(), dbResolvedZero.timeTree(), key);
					            callback.on(proxy);
					          } else {
					            callback.on(dbResolvedZero);
					          }
					        }
					}});
					      }
					    }
					}});
					  }
					
					  private loadObjectInCache(originView: org.kevoree.modeling.api.KView, keys: number[], callback: org.kevoree.modeling.api.Callback<java.util.List<org.kevoree.modeling.api.KObject<any,any>>>): void {
					    this.timeTrees(originView.dimension(), keys, {on:function(timeTrees: org.kevoree.modeling.api.time.TimeTree[]){
					    var objStringKeys: string[] = new Array();
					    var resolved: number[] = new Array();
					    for (var i: number = 0; i < keys.length; i++) {
					      var resolvedTime: number = timeTrees[i].resolve(originView.now());
					      resolved[i] = resolvedTime;
					      objStringKeys[i] = this.keyPayload(originView.dimension(), resolvedTime, keys[i]);
					    }
					    this._db.get(objStringKeys, {on:function(objectPayloads: string[], error: java.lang.Throwable){
					    if (error != null) {
					      callback.on(null);
					    } else {
					      var additionalLoad: java.util.List<any[]> = new java.util.ArrayList<any[]>();
					      var objs: java.util.List<org.kevoree.modeling.api.KObject<any,any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any,any>>();
					      for (var i: number = 0; i < objectPayloads.length; i++) {
					        var obj: org.kevoree.modeling.api.KObject<any,any> = org.kevoree.modeling.api.json.JSONModelLoader.load(objectPayloads[i], originView.dimension().time(resolved[i]), null);
					        objs.add(obj);
					        var strategies: java.util.Set<org.kevoree.modeling.api.strategy.ExtrapolationStrategy> = new java.util.HashSet<org.kevoree.modeling.api.strategy.ExtrapolationStrategy>();
					        for (var h: number = 0; h < obj.metaAttributes().length; h++) {
					          var metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute = obj.metaAttributes()[h];
					          strategies.add(metaAttribute.strategy());
					        }
					        var strategiesArr: org.kevoree.modeling.api.strategy.ExtrapolationStrategy[] = strategies.toArray(new Array());
					        for (var k: number = 0; k < strategiesArr.length; k++) {
					          var strategy: org.kevoree.modeling.api.strategy.ExtrapolationStrategy = strategiesArr[k];
					          var additionalTimes: number[] = strategy.timedDependencies(obj);
					          for (var j: number = 0; j < additionalTimes.length; j++) {
					            if (additionalTimes[j] != obj.now()) {
					              if (this.cacheLookup(originView.dimension(), additionalTimes[j], obj.uuid()) == null) {
					                var payload: any[] = [this.keyPayload(originView.dimension(), additionalTimes[j], obj.uuid()), additionalTimes[j]];
					                additionalLoad.add(payload);
					              }
					            }
					          }
					        }
					      }
					      if (additionalLoad.isEmpty()) {
					        callback.on(objs);
					      } else {
					        var addtionalDBKeys: string[] = new Array();
					        for (var i: number = 0; i < additionalLoad.size(); i++) {
					          addtionalDBKeys[i] = additionalLoad.get(i)[0].toString();
					        }
					        this._db.get(addtionalDBKeys, {on:function(additionalPayloads: string[], error: java.lang.Throwable){
					        for (var i: number = 0; i < objectPayloads.length; i++) {
					          org.kevoree.modeling.api.json.JSONModelLoader.load(additionalPayloads[i], originView.dimension().time(<number>additionalLoad.get(i)[1]), null);
					        }
					        callback.on(objs);
					}});
					      }
					    }
					}});
					}});
					  }
					
					  public lookupAll(originView: org.kevoree.modeling.api.KView, keys: number[], callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>[]>): void {
					    var toLoad: java.util.List<number> = new java.util.ArrayList<number>();
					    for (var i: number = 0; i < keys.length; i++) {
					      toLoad.add(keys[i]);
					    }
					    var resolveds: java.util.List<org.kevoree.modeling.api.KObject<any,any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any,any>>();
					    for (var i: number = 0; i < keys.length; i++) {
					      var kid: number = keys[i];
					      var resolved: org.kevoree.modeling.api.KObject<any,any> = this.cacheLookup(originView.dimension(), originView.now(), kid);
					      if (resolved != null) {
					        resolveds.add(resolved);
					        toLoad.remove(kid);
					      }
					    }
					    if (toLoad.size() == 0) {
					      var proxies: java.util.List<org.kevoree.modeling.api.KObject<any,any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any,any>>();
					      var resolvedsArr: org.kevoree.modeling.api.KObject<any,any>[] = resolveds.toArray(new Array());
					      for (var i: number = 0; i < resolvedsArr.length; i++) {
					        var res: org.kevoree.modeling.api.KObject<any,any> = resolvedsArr[i];
					        if (res.now() != originView.now()) {
					          var proxy: org.kevoree.modeling.api.KObject<any,any> = originView.createProxy(res.metaClass(), res.timeTree(), res.uuid());
					          proxies.add(proxy);
					        } else {
					          proxies.add(res);
					        }
					      }
					      callback.on(proxies.toArray(new Array()));
					    } else {
					      var toLoadKeys: number[] = new Array();
					      for (var i: number = 0; i < toLoad.size(); i++) {
					        toLoadKeys[i] = toLoad.get(i);
					      }
					      this.loadObjectInCache(originView, toLoadKeys, {on:function(additional: java.util.List<org.kevoree.modeling.api.KObject<any,any>>){
					      resolveds.addAll(additional);
					      var proxies: java.util.List<org.kevoree.modeling.api.KObject<any,any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any,any>>();
					      var resolvedsArr: org.kevoree.modeling.api.KObject<any,any>[] = resolveds.toArray(new Array());
					      for (var i: number = 0; i < resolvedsArr.length; i++) {
					        var res: org.kevoree.modeling.api.KObject<any,any> = resolvedsArr[i];
					        if (res.now() != originView.now()) {
					          var proxy: org.kevoree.modeling.api.KObject<any,any> = originView.createProxy(res.metaClass(), res.timeTree(), res.uuid());
					          proxies.add(proxy);
					        } else {
					          proxies.add(res);
					        }
					      }
					      callback.on(proxies.toArray(new Array()));
					}});
					    }
					  }
					
					  public getDimension(key: number): org.kevoree.modeling.api.KDimension<any,any,any> {
					    var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(key);
					    if (dimensionCache != null) {
					      return dimensionCache.dimension;
					    } else {
					      return null;
					    }
					  }
					
					  public getRoot(originView: org.kevoree.modeling.api.KView, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>>): void {
					    var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(originView.dimension().key());
					    var resolvedRoot: number = dimensionCache.rootTimeTree.resolve(originView.now());
					    if (resolvedRoot == null) {
					      callback.on(null);
					    } else {
					      var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get(resolvedRoot);
					      if (timeCache.root != null) {
					        callback.on(timeCache.root);
					      } else {
					        var rootKeys: string[] = new Array();
					        rootKeys[0] = this.keyRoot(dimensionCache.dimension, resolvedRoot);
					        this._db.get(rootKeys, {on:function(res: string[], error: java.lang.Throwable){
					        if (error != null) {
					          callback.on(null);
					        } else {
					          try {
					            var idRoot: number = java.lang.Long.parseLong(res[0]);
					            this.lookup(originView, idRoot, {on:function(resolved: org.kevoree.modeling.api.KObject<any,any>){
					            timeCache.root = resolved;
					            timeCache.rootDirty = false;
					            callback.on(resolved);
					}});
					          } catch ($ex$) {
					            if ($ex$ instanceof java.lang.Exception) {
					              var e: java.lang.Exception = <java.lang.Exception>$ex$;
					              e.printStackTrace();
					              callback.on(null);
					            }
					           }
					        }
					}});
					      }
					    }
					  }
					
					  public setRoot(newRoot: org.kevoree.modeling.api.KObject<any,any>): void {
					    var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(newRoot.dimension().key());
					    var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get(newRoot.now());
					    timeCache.root = newRoot;
					    timeCache.rootDirty = true;
					    dimensionCache.rootTimeTree.insert(newRoot.now());
					  }
					
					  public registerListener(origin: any, listener: org.kevoree.modeling.api.ModelListener): void {
					    if (origin instanceof org.kevoree.modeling.api.abs.AbstractKObject) {
					      var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get((<org.kevoree.modeling.api.KDimension<any,any,any>>origin).key());
					      var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get((<org.kevoree.modeling.api.KView>origin).now());
					      var obj_listeners: java.util.List<org.kevoree.modeling.api.ModelListener> = timeCache.obj_listeners.get((<org.kevoree.modeling.api.KObject<any,any>>origin).uuid());
					      if (obj_listeners == null) {
					        obj_listeners = new java.util.ArrayList<org.kevoree.modeling.api.ModelListener>();
					        timeCache.obj_listeners.put((<org.kevoree.modeling.api.KObject<any,any>>origin).uuid(), obj_listeners);
					      }
					      obj_listeners.add(listener);
					    } else {
					      if (origin instanceof org.kevoree.modeling.api.abs.AbstractKView) {
					        var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get((<org.kevoree.modeling.api.KDimension<any,any,any>>origin).key());
					        var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get((<org.kevoree.modeling.api.KView>origin).now());
					        timeCache.listeners.add(listener);
					      } else {
					        if (origin instanceof org.kevoree.modeling.api.abs.AbstractKDimension) {
					          var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get((<org.kevoree.modeling.api.KDimension<any,any,any>>origin).key());
					          dimensionCache.listeners.add(listener);
					        } else {
					          if (origin instanceof org.kevoree.modeling.api.abs.AbstractKUniverse) {
					            this.universeListeners.add(listener);
					          }
					        }
					      }
					    }
					  }
					
					  public notify(event: org.kevoree.modeling.api.KEvent): void {
					    var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(event.src().dimension().key());
					    var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get(event.src().now());
					    var obj_listeners: java.util.List<org.kevoree.modeling.api.ModelListener> = timeCache.obj_listeners.get(event.src().uuid());
					    if (obj_listeners != null) {
					      for (var i: number = 0; i < obj_listeners.size(); i++) {
					        obj_listeners.get(i).on(event);
					      }
					    }
					    for (var i: number = 0; i < timeCache.listeners.size(); i++) {
					      timeCache.listeners.get(i).on(event);
					    }
					    for (var i: number = 0; i < dimensionCache.listeners.size(); i++) {
					      dimensionCache.listeners.get(i).on(event);
					    }
					    for (var i: number = 0; i < this.universeListeners.size(); i++) {
					      this.universeListeners.get(i).on(event);
					    }
					  }
					
					}
					
					export interface KDataBase {
					
					  get(keys: string[], callback: org.kevoree.modeling.api.ThrowableCallback<string[]>): void;
					
					  put(payloads: string[][], error: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void;
					
					  remove(keys: string[], error: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void;
					
					  commit(error: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void;
					
					  close(error: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void;
					
					}
					
					export interface KStore {
					
					  lookup(originView: org.kevoree.modeling.api.KView, key: number, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>>): void;
					
					  lookupAll(originView: org.kevoree.modeling.api.KView, key: number[], callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>[]>): void;
					
					  raw(origin: org.kevoree.modeling.api.KObject<any,any>, accessMode: AccessMode): any[];
					
					  save(dimension: org.kevoree.modeling.api.KDimension<any,any,any>, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void;
					
					  saveUnload(dimension: org.kevoree.modeling.api.KDimension<any,any,any>, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void;
					
					  discard(dimension: org.kevoree.modeling.api.KDimension<any,any,any>, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void;
					
					  delete(dimension: org.kevoree.modeling.api.KDimension<any,any,any>, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void;
					
					  timeTree(dimension: org.kevoree.modeling.api.KDimension<any,any,any>, key: number, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.time.TimeTree>): void;
					
					  timeTrees(dimension: org.kevoree.modeling.api.KDimension<any,any,any>, keys: number[], callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.time.TimeTree[]>): void;
					
					  initKObject(obj: org.kevoree.modeling.api.KObject<any,any>, originView: org.kevoree.modeling.api.KView): void;
					
					  initDimension(dimension: org.kevoree.modeling.api.KDimension<any,any,any>, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void;
					
					  nextDimensionKey(): number;
					
					  nextObjectKey(): number;
					
					  getDimension(key: number): org.kevoree.modeling.api.KDimension<any,any,any>;
					
					  getRoot(originView: org.kevoree.modeling.api.KView, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>>): void;
					
					  setRoot(newRoot: org.kevoree.modeling.api.KObject<any,any>): void;
					
					  cacheLookup(dimension: org.kevoree.modeling.api.KDimension<any,any,any>, time: number, key: number): org.kevoree.modeling.api.KObject<any,any>;
					
					  registerListener(origin: any, listener: org.kevoree.modeling.api.ModelListener): void;
					
					  notify(event: org.kevoree.modeling.api.KEvent): void;
					
					}
					
					export class MemoryKDataBase implements KDataBase {
					
					  private backend: java.util.HashMap<string, string> = new java.util.HashMap<string, string>();
					
					  public put(payloads: string[][], callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    for (var i: number = 0; i < payloads.length; i++) {
					      this.backend.put(payloads[i][0], payloads[i][1]);
					    }
					    callback.on(null);
					  }
					
					  public get(keys: string[], callback: org.kevoree.modeling.api.ThrowableCallback<string[]>): void {
					    var values: string[] = new Array();
					    for (var i: number = 0; i < keys.length; i++) {
					      values[i] = this.backend.get(keys[i]);
					    }
					    callback.on(values, null);
					  }
					
					  public remove(keys: string[], callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    for (var i: number = 0; i < keys.length; i++) {
					      this.backend.remove(keys[i]);
					    }
					    callback.on(null);
					  }
					
					  public commit(callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					  }
					
					  public close(callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    this.backend.clear();
					  }
					
					}
				}
				export module event {
					
					export class DefaultKEvent implements org.kevoree.modeling.api.KEvent {
					
					  private _type: org.kevoree.modeling.api.KActionType = null;
					  private _meta: org.kevoree.modeling.api.meta.Meta = null;
					  private _pastValue: any = null;
					  private _newValue: any = null;
					  private _source: org.kevoree.modeling.api.KObject<any,any> = null;
					
					  constructor(p_type: org.kevoree.modeling.api.KActionType, p_meta: org.kevoree.modeling.api.meta.Meta, p_source: org.kevoree.modeling.api.KObject<any,any>, p_pastValue: any, p_newValue: any) {
					    this._type = p_type;
					    this._meta = p_meta;
					    this._source = p_source;
					    this._pastValue = p_pastValue;
					    this._newValue = p_newValue;
					  }
					
					  public toString(): string {
					    var newValuePayload: string = "";
					    if (this.newValue() != null) {
					      newValuePayload = this.newValue().toString().replace("\n", "");
					    }
					    return "ModelEvent[src:[t=" + this._source.now() + "]uuid=" + this._source.uuid() + ", type:" + this._type + ", meta:" + this.meta() + ", pastValue:" + this.pastValue() + ", newValue:" + newValuePayload + "]";
					  }
					
					  public type(): org.kevoree.modeling.api.KActionType {
					    return this._type;
					  }
					
					  public meta(): org.kevoree.modeling.api.meta.Meta {
					    return this._meta;
					  }
					
					  public pastValue(): any {
					    return this._pastValue;
					  }
					
					  public newValue(): any {
					    return this._newValue;
					  }
					
					  public src(): org.kevoree.modeling.api.KObject<any,any> {
					    return this._source;
					  }
					
					}
				}
				
				export class Extrapolations {
				
				  public static DISCRETE: Extrapolations = new Extrapolations(new org.kevoree.modeling.api.strategy.DiscreteExtrapolationStrategy());
				  public static LINEAR_REGRESSION: Extrapolations = new Extrapolations(new org.kevoree.modeling.api.strategy.LinearRegressionExtrapolationStrategy());
				  public static POLYNOMIAL: Extrapolations = new Extrapolations(new org.kevoree.modeling.api.strategy.PolynomialExtrapolationStrategy());
				  private extrapolationStrategy: org.kevoree.modeling.api.strategy.ExtrapolationStrategy = null;
				
				  constructor(wrappedStrategy: org.kevoree.modeling.api.strategy.ExtrapolationStrategy) {
				    this.extrapolationStrategy = wrappedStrategy;
				  }
				
				  public strategy(): org.kevoree.modeling.api.strategy.ExtrapolationStrategy {
				    return this.extrapolationStrategy;
				  }
				
				  public equals(other: any): boolean {
				        return this == other;
				    }
				
				}
				
				export class InboundReference {
				
				  private reference: org.kevoree.modeling.api.meta.MetaReference = null;
				  private object: KObject<any,any> = null;
				
				  constructor(reference: org.kevoree.modeling.api.meta.MetaReference, object: KObject<any,any>) {
				    this.reference = reference;
				    this.object = object;
				  }
				
				  public getReference(): org.kevoree.modeling.api.meta.MetaReference {
				    return this.reference;
				  }
				
				  public getObject(): KObject<any,any> {
				    return this.object;
				  }
				
				}
				export module json {
					
					export class JSONModelLoader implements org.kevoree.modeling.api.ModelLoader {
					
					  private _factory: org.kevoree.modeling.api.KView = null;
					
					  constructor(p_factory: org.kevoree.modeling.api.KView) {
					    this._factory = p_factory;
					  }
					
					  public static load(payload: string, factory: org.kevoree.modeling.api.KView, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>>): org.kevoree.modeling.api.KObject<any,any> {
					    var lexer: Lexer = new Lexer(payload);
					    var loaded: org.kevoree.modeling.api.KObject<any,any>[] = new Array();
					    JSONModelLoader.loadObjects(lexer, factory, {on:function(objs: java.util.List<org.kevoree.modeling.api.KObject<any,any>>){
					    loaded[0] = objs.get(0);
					}});
					    return loaded[0];
					  }
					
					  private static loadObjects(lexer: Lexer, factory: org.kevoree.modeling.api.KView, callback: org.kevoree.modeling.api.Callback<java.util.List<org.kevoree.modeling.api.KObject<any,any>>>): void {
					    var loaded: java.util.List<org.kevoree.modeling.api.KObject<any,any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any,any>>();
					    var alls: java.util.List<java.util.Map<string, any>> = new java.util.ArrayList<java.util.Map<string, any>>();
					    var content: java.util.Map<string, any> = new java.util.HashMap<string, any>();
					    var currentAttributeName: string = null;
					    var arrayPayload: java.util.Set<string> = null;
					    var currentToken: JsonToken = lexer.nextToken();
					    while (currentToken.tokenType() != Type.EOF){
					      if (currentToken.tokenType().equals(Type.LEFT_BRACKET)) {
					        arrayPayload = new java.util.HashSet<string>();
					      } else {
					        if (currentToken.tokenType().equals(Type.RIGHT_BRACKET)) {
					          content.put(currentAttributeName, arrayPayload);
					          arrayPayload = null;
					          currentAttributeName = null;
					        } else {
					          if (currentToken.tokenType().equals(Type.LEFT_BRACE)) {
					            content = new java.util.HashMap<string, any>();
					          } else {
					            if (currentToken.tokenType().equals(Type.RIGHT_BRACE)) {
					              alls.add(content);
					              content = new java.util.HashMap<string, any>();
					            } else {
					              if (currentToken.tokenType().equals(Type.VALUE)) {
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
					    var keys: number[] = new Array();
					    for (var i: number = 0; i < keys.length; i++) {
					      var kid: number = java.lang.Long.parseLong(alls.get(i).get(JSONModelSerializer.KEY_UUID).toString());
					      keys[i] = kid;
					    }
					    factory.dimension().timeTrees(keys, {on:function(timeTrees: org.kevoree.modeling.api.time.TimeTree[]){
					    for (var i: number = 0; i < alls.size(); i++) {
					      var elem: java.util.Map<string, any> = alls.get(i);
					      var meta: string = elem.get(JSONModelSerializer.KEY_META).toString();
					      var kid: number = java.lang.Long.parseLong(elem.get(JSONModelSerializer.KEY_UUID).toString());
					      var isRoot: boolean = false;
					      var root: any = elem.get(JSONModelSerializer.KEY_ROOT);
					      if (root != null) {
					        isRoot = root.toString().equals("true");
					      }
					      var timeTree: org.kevoree.modeling.api.time.TimeTree = timeTrees[i];
					      timeTree.insert(factory.now());
					      var current: org.kevoree.modeling.api.KObject<any,any> = factory.createProxy(factory.metaClass(meta), timeTree, kid);
					      if (isRoot) {
					        (<org.kevoree.modeling.api.abs.AbstractKObject<any,any>>current).setRoot(true);
					      }
					      loaded.add(current);
					      var payloadObj: any[] = factory.dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE);
					      //TODO resolve for-each cycle
					      var k: string;
					      for (k in elem.keySet()) {
					        var att: org.kevoree.modeling.api.meta.MetaAttribute = current.metaAttribute(k);
					        if (att != null) {
					          payloadObj[att.index()] = JSONModelLoader.convertRaw(att, elem.get(k));
					        } else {
					          var ref: org.kevoree.modeling.api.meta.MetaReference = current.metaReference(k);
					          if (ref != null) {
					            if (ref.single()) {
					              var refPayloadSingle: number;
					              try {
					                refPayloadSingle = java.lang.Long.parseLong(elem.get(k).toString());
					                payloadObj[ref.index()] = refPayloadSingle;
					              } catch ($ex$) {
					                if ($ex$ instanceof java.lang.Exception) {
					                  var e: java.lang.Exception = <java.lang.Exception>$ex$;
					                  e.printStackTrace();
					                }
					               }
					            } else {
					              try {
					                var plainRawList: java.util.Set<string> = <java.util.Set<string>>elem.get(k);
					                var convertedRaw: java.util.Set<number> = new java.util.HashSet<number>();
					                //TODO resolve for-each cycle
					                var plainRaw: string;
					                for (plainRaw in plainRawList) {
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
					                payloadObj[ref.index()] = convertedRaw;
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
					    if (callback != null) {
					      callback.on(loaded);
					    }
					}});
					  }
					
					  public load(payload: string, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    if (payload == null) {
					      callback.on(null);
					    } else {
					      var lexer: Lexer = new Lexer(payload);
					      var currentToken: JsonToken = lexer.nextToken();
					      if (currentToken.tokenType() != Type.LEFT_BRACKET) {
					        callback.on(null);
					      } else {
					        JSONModelLoader.loadObjects(lexer, this._factory, {on:function(kObjects: java.util.List<org.kevoree.modeling.api.KObject<any,any>>){
					        callback.on(null);
					}});
					      }
					    }
					  }
					
					  public static convertRaw(attribute: org.kevoree.modeling.api.meta.MetaAttribute, raw: any): any {
					    try {
					      if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.STRING)) {
					        return raw.toString();
					      } else {
					        if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.LONG)) {
					          return java.lang.Long.parseLong(raw.toString());
					        } else {
					          if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.INT)) {
					            return java.lang.Integer.parseInt(raw.toString());
					          } else {
					            if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.BOOL)) {
					              return raw.toString().equals("true");
					            } else {
					              if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.SHORT)) {
					                return java.lang.Short.parseShort(raw.toString());
					              } else {
					                if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.DOUBLE)) {
					                  return java.lang.Double.parseDouble(raw.toString());
					                } else {
					                  if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.FLOAT)) {
					                    return java.lang.Float.parseFloat(raw.toString());
					                  } else {
					                    return null;
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
					        return null;
					      }
					     }
					  }
					
					}
					
					export class JSONModelSerializer implements org.kevoree.modeling.api.ModelSerializer {
					
					  public static KEY_META: string = "@meta";
					  public static KEY_UUID: string = "@uuid";
					  public static KEY_ROOT: string = "@root";
					
					  public serialize(model: org.kevoree.modeling.api.KObject<any,any>, callback: org.kevoree.modeling.api.ThrowableCallback<string>): void {
					    var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
					    builder.append("[\n");
					    JSONModelSerializer.printJSON(model, builder);
					    model.graphVisit({visit:function(elem: org.kevoree.modeling.api.KObject<any,any>){
					    builder.append(",");
					    JSONModelSerializer.printJSON(elem, builder);
					    return org.kevoree.modeling.api.VisitResult.CONTINUE;
					}}, {on:function(throwable: java.lang.Throwable){
					    builder.append("]\n");
					    callback.on(builder.toString(), throwable);
					}});
					  }
					
					  public static printJSON(elem: org.kevoree.modeling.api.KObject<any,any>, builder: java.lang.StringBuilder): void {
					    builder.append("{\n");
					    builder.append("\t\"" + JSONModelSerializer.KEY_META + "\" : \"");
					    builder.append(elem.metaClass().metaName());
					    builder.append("\",\n");
					    builder.append("\t\"" + JSONModelSerializer.KEY_UUID + "\" : \"");
					    builder.append(elem.uuid() + "");
					    if (elem.isRoot()) {
					      builder.append("\",\n");
					      builder.append("\t\"" + JSONModelSerializer.KEY_ROOT + "\" : \"");
					      builder.append("true");
					    }
					    builder.append("\",\n");
					    for (var i: number = 0; i < elem.metaAttributes().length; i++) {
					      var payload: any = elem.get(elem.metaAttributes()[i]);
					      if (payload != null) {
					        builder.append("\t");
					        builder.append("\"");
					        builder.append(elem.metaAttributes()[i].metaName());
					        builder.append("\" : \"");
					        builder.append(payload.toString());
					        builder.append("\",\n");
					      }
					    }
					    for (var i: number = 0; i < elem.metaReferences().length; i++) {
					      var raw: any[] = elem.view().dimension().universe().storage().raw(elem, org.kevoree.modeling.api.data.AccessMode.READ);
					      var payload: any = null;
					      if (raw != null) {
					        payload = raw[elem.metaReferences()[i].index()];
					      }
					      if (payload != null) {
					        builder.append("\t");
					        builder.append("\"");
					        builder.append(elem.metaReferences()[i].metaName());
					        builder.append("\" :");
					        if (elem.metaReferences()[i].single()) {
					          builder.append("\"");
					          builder.append(payload.toString());
					          builder.append("\"");
					        } else {
					          var elems: java.util.Set<number> = <java.util.Set<number>>payload;
					          var elemsArr: number[] = elems.toArray(new Array());
					          var isFirst: boolean = true;
					          builder.append(" [");
					          for (var j: number = 0; j < elemsArr.length; j++) {
					            if (!isFirst) {
					              builder.append(",");
					            }
					            builder.append("\"");
					            builder.append(elemsArr[j] + "");
					            builder.append("\"");
					            isFirst = false;
					          }
					          builder.append("]");
					        }
					        builder.append(",\n");
					      }
					    }
					    builder.append("}\n");
					  }
					
					}
					
					export class JSONString {
					
					  private static ESCAPE_CHAR: string = '\\';
					
					  public static encodeBuffer(buffer: java.lang.StringBuilder, chain: string): void {
					    if (chain == null) {
					      return;
					    }
					    var i: number = 0;
					    while (i < chain.length){
					      var ch: string = chain.charAt(i);
					      if (ch == '"') {
					        buffer.append(JSONString.ESCAPE_CHAR);
					        buffer.append('"');
					      } else {
					        if (ch == JSONString.ESCAPE_CHAR) {
					          buffer.append(JSONString.ESCAPE_CHAR);
					          buffer.append(JSONString.ESCAPE_CHAR);
					        } else {
					          if (ch == '\n') {
					            buffer.append(JSONString.ESCAPE_CHAR);
					            buffer.append('n');
					          } else {
					            if (ch == '\r') {
					              buffer.append(JSONString.ESCAPE_CHAR);
					              buffer.append('r');
					            } else {
					              if (ch == '\t') {
					                buffer.append(JSONString.ESCAPE_CHAR);
					                buffer.append('t');
					              } else {
					                if (ch == '\u2028') {
					                  buffer.append(JSONString.ESCAPE_CHAR);
					                  buffer.append('u');
					                  buffer.append('2');
					                  buffer.append('0');
					                  buffer.append('2');
					                  buffer.append('8');
					                } else {
					                  if (ch == '\u2029') {
					                    buffer.append(JSONString.ESCAPE_CHAR);
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
					
					  public static encode(buffer: java.lang.StringBuilder, chain: string): void {
					    if (chain == null) {
					      return;
					    }
					    var i: number = 0;
					    while (i < chain.length){
					      var ch: string = chain.charAt(i);
					      if (ch == '"') {
					        buffer.append(JSONString.ESCAPE_CHAR);
					        buffer.append('"');
					      } else {
					        if (ch == JSONString.ESCAPE_CHAR) {
					          buffer.append(JSONString.ESCAPE_CHAR);
					          buffer.append(JSONString.ESCAPE_CHAR);
					        } else {
					          if (ch == '\n') {
					            buffer.append(JSONString.ESCAPE_CHAR);
					            buffer.append('n');
					          } else {
					            if (ch == '\r') {
					              buffer.append(JSONString.ESCAPE_CHAR);
					              buffer.append('r');
					            } else {
					              if (ch == '\t') {
					                buffer.append(JSONString.ESCAPE_CHAR);
					                buffer.append('t');
					              } else {
					                if (ch == '\u2028') {
					                  buffer.append(JSONString.ESCAPE_CHAR);
					                  buffer.append('u');
					                  buffer.append('2');
					                  buffer.append('0');
					                  buffer.append('2');
					                  buffer.append('8');
					                } else {
					                  if (ch == '\u2029') {
					                    buffer.append(JSONString.ESCAPE_CHAR);
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
					      if (current == JSONString.ESCAPE_CHAR) {
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
					
					  private _tokenType: Type = null;
					  private _value: any = null;
					
					  constructor(p_tokenType: Type, p_value: any) {
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
					
					  public tokenType(): Type {
					    return this._tokenType;
					  }
					
					  public value(): any {
					    return this._value;
					  }
					
					}
					
					export class Lexer {
					
					  private bytes: string = null;
					  private EOF: JsonToken = null;
					  private BOOLEAN_LETTERS: java.util.HashSet<string> = null;
					  private DIGIT: java.util.HashSet<string> = null;
					  private index: number = 0;
					  private static DEFAULT_BUFFER_SIZE: number = 1024 * 4;
					
					  constructor(payload: string) {
					    this.bytes = payload;
					    this.EOF = new JsonToken(Type.EOF, null);
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
					
					  public nextToken(): JsonToken {
					    if (this.isDone()) {
					      return this.EOF;
					    }
					    var tokenType: Type = Type.EOF;
					    var c: string = this.nextChar();
					    var currentValue: java.lang.StringBuilder = new java.lang.StringBuilder();
					    var jsonValue: any = null;
					    while (!this.isDone() && this.isSpace(c)){
					      c = this.nextChar();
					    }
					    if ('"' == c) {
					      tokenType = Type.VALUE;
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
					        tokenType = Type.LEFT_BRACE;
					      } else {
					        if ('}' == c) {
					          tokenType = Type.RIGHT_BRACE;
					        } else {
					          if ('[' == c) {
					            tokenType = Type.LEFT_BRACKET;
					          } else {
					            if (']' == c) {
					              tokenType = Type.RIGHT_BRACKET;
					            } else {
					              if (':' == c) {
					                tokenType = Type.COLON;
					              } else {
					                if (',' == c) {
					                  tokenType = Type.COMMA;
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
					                    tokenType = Type.VALUE;
					                  } else {
					                    tokenType = Type.EOF;
					                  }
					                }
					              }
					            }
					          }
					        }
					      }
					    }
					    return new JsonToken(tokenType, jsonValue);
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
					  private _value: number = 0;
					
					  constructor(p_value: number) {
					    this._value = p_value;
					  }
					
					  public equals(other: any): boolean {
					        return this == other;
					    }
					
					}
				}
				
				export class KActionType {
				
				  public static SET: KActionType = new KActionType("SET");
				  public static ADD: KActionType = new KActionType("ADD");
				  public static REMOVE: KActionType = new KActionType("DEL");
				  public static NEW: KActionType = new KActionType("NEW");
				  private code: string = "";
				
				  constructor(code: string) {
				    this.code = code;
				  }
				
				  public toString(): string {
				    return this.code;
				  }
				
				  public equals(other: any): boolean {
				        return this == other;
				    }
				
				}
				
				export interface KDimension<A extends KView, B extends KDimension<any,any,any>, C extends KUniverse<any>> {
				
				  key(): number;
				
				  parent(callback: Callback<B>): void;
				
				  children(callback: Callback<B[]>): void;
				
				  fork(callback: Callback<B>): void;
				
				  save(callback: Callback<java.lang.Throwable>): void;
				
				  saveUnload(callback: Callback<java.lang.Throwable>): void;
				
				  delete(callback: Callback<java.lang.Throwable>): void;
				
				  discard(callback: Callback<java.lang.Throwable>): void;
				
				  time(timePoint: number): A;
				
				  timeTrees(keys: number[], callback: Callback<org.kevoree.modeling.api.time.TimeTree[]>): void;
				
				  timeTree(key: number, callback: Callback<org.kevoree.modeling.api.time.TimeTree>): void;
				
				  universe(): C;
				
				}
				
				export interface KEvent {
				
				  type(): KActionType;
				
				  meta(): org.kevoree.modeling.api.meta.Meta;
				
				  pastValue(): any;
				
				  newValue(): any;
				
				  src(): KObject<any,any>;
				
				}
				
				export interface KObject<A extends KObject<any,any>, B extends KView> {
				
				  isDirty(): boolean;
				
				  dimension(): KDimension<any,any,any>;
				
				  isDeleted(): boolean;
				
				  isRoot(): boolean;
				
				  uuid(): number;
				
				  path(callback: Callback<string>): void;
				
				  view(): B;
				
				  delete(callback: Callback<boolean>): void;
				
				  parent(callback: Callback<KObject<any,any>>): void;
				
				  parentUuid(): number;
				
				  select(query: string, callback: Callback<KObject<any,any>[]>): void;
				
				  stream(query: string, callback: Callback<KObject<any,any>>): void;
				
				  listen(listener: ModelListener): void;
				
				  visitAttributes(visitor: ModelAttributeVisitor): void;
				
				  visit(visitor: ModelVisitor, end: Callback<java.lang.Throwable>): void;
				
				  graphVisit(visitor: ModelVisitor, end: Callback<java.lang.Throwable>): void;
				
				  treeVisit(visitor: ModelVisitor, end: Callback<java.lang.Throwable>): void;
				
				  now(): number;
				
				  jump(time: number, callback: Callback<A>): void;
				
				  timeTree(): org.kevoree.modeling.api.time.TimeTree;
				
				  referenceInParent(): org.kevoree.modeling.api.meta.MetaReference;
				
				  domainKey(): string;
				
				  metaClass(): org.kevoree.modeling.api.meta.MetaClass;
				
				  metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[];
				
				  metaReferences(): org.kevoree.modeling.api.meta.MetaReference[];
				
				  metaOperations(): org.kevoree.modeling.api.meta.MetaOperation[];
				
				  metaAttribute(name: string): org.kevoree.modeling.api.meta.MetaAttribute;
				
				  metaReference(name: string): org.kevoree.modeling.api.meta.MetaReference;
				
				  metaOperation(name: string): org.kevoree.modeling.api.meta.MetaOperation;
				
				  mutate(actionType: KActionType, metaReference: org.kevoree.modeling.api.meta.MetaReference, param: KObject<any,any>, setOpposite: boolean): void;
				
				  each<C extends KObject<any,any>> (metaReference: org.kevoree.modeling.api.meta.MetaReference, callback: Callback<C>, end: Callback<java.lang.Throwable>): void;
				
				  inbounds(callback: Callback<InboundReference>, end: Callback<java.lang.Throwable>): void;
				
				  traces(request: TraceRequest): org.kevoree.modeling.api.trace.ModelTrace[];
				
				  get(attribute: org.kevoree.modeling.api.meta.MetaAttribute): any;
				
				  set(attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void;
				
				  toJSON(): string;
				
				}
				
				export interface KUniverse<A extends KDimension<any,any,any>> {
				
				  newDimension(callback: Callback<A>): void;
				
				  dimension(key: number, callback: Callback<A>): void;
				
				  saveAll(callback: Callback<boolean>): void;
				
				  deleteAll(callback: Callback<boolean>): void;
				
				  unloadAll(callback: Callback<boolean>): void;
				
				  disable(listener: ModelListener): void;
				
				  stream(query: string, callback: Callback<KObject<any,any>>): void;
				
				  storage(): org.kevoree.modeling.api.data.KStore;
				
				  listen(listener: ModelListener): void;
				
				}
				
				export interface KView {
				
				  createFQN(metaClassName: string): KObject<any,any>;
				
				  create(clazz: org.kevoree.modeling.api.meta.MetaClass): KObject<any,any>;
				
				  setRoot(elem: KObject<any,any>): void;
				
				  createJSONSerializer(): ModelSerializer;
				
				  createJSONLoader(): ModelLoader;
				
				  createXMISerializer(): ModelSerializer;
				
				  createXMILoader(): ModelLoader;
				
				  createModelCompare(): ModelCompare;
				
				  createModelCloner(): ModelCloner<any>;
				
				  createModelSlicer(): ModelSlicer;
				
				  select(query: string, callback: Callback<KObject<any,any>[]>): void;
				
				  lookup(key: number, callback: Callback<KObject<any,any>>): void;
				
				  lookupAll(keys: number[], callback: Callback<KObject<any,any>[]>): void;
				
				  stream(query: string, callback: Callback<KObject<any,any>>): void;
				
				  metaClasses(): org.kevoree.modeling.api.meta.MetaClass[];
				
				  metaClass(fqName: string): org.kevoree.modeling.api.meta.MetaClass;
				
				  dimension(): KDimension<any,any,any>;
				
				  now(): number;
				
				  createProxy(clazz: org.kevoree.modeling.api.meta.MetaClass, timeTree: org.kevoree.modeling.api.time.TimeTree, key: number): KObject<any,any>;
				
				  listen(listener: ModelListener): void;
				
				}
				export module meta {
					
					export interface Meta {
					
					  metaName(): string;
					
					  index(): number;
					
					}
					
					export interface MetaAttribute extends Meta {
					
					  key(): boolean;
					
					  origin(): MetaClass;
					
					  metaType(): MetaType;
					
					  strategy(): org.kevoree.modeling.api.strategy.ExtrapolationStrategy;
					
					  precision(): number;
					
					  setExtrapolationStrategy(extrapolationStrategy: org.kevoree.modeling.api.strategy.ExtrapolationStrategy): void;
					
					}
					
					export interface MetaClass extends Meta {
					
					}
					
					export interface MetaOperation extends Meta {
					
					}
					
					export interface MetaReference extends Meta {
					
					  contained(): boolean;
					
					  single(): boolean;
					
					  metaType(): MetaClass;
					
					  opposite(): MetaReference;
					
					  origin(): MetaClass;
					
					}
					
					export class MetaType {
					
					  public static STRING: MetaType = new MetaType();
					  public static LONG: MetaType = new MetaType();
					  public static INT: MetaType = new MetaType();
					  public static BOOL: MetaType = new MetaType();
					  public static SHORT: MetaType = new MetaType();
					  public static DOUBLE: MetaType = new MetaType();
					  public static FLOAT: MetaType = new MetaType();
					  public equals(other: any): boolean {
					        return this == other;
					    }
					
					}
				}
				
				export interface ModelAttributeVisitor {
				
				  visit(metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute, value: any): void;
				
				}
				
				export interface ModelCloner<A extends KObject<any,any>> {
				
				  clone(o: A, callback: Callback<A>): void;
				
				}
				
				export interface ModelCompare {
				
				  diff(origin: KObject<any,any>, target: KObject<any,any>, callback: Callback<org.kevoree.modeling.api.trace.TraceSequence>): void;
				
				  union(origin: KObject<any,any>, target: KObject<any,any>, callback: Callback<org.kevoree.modeling.api.trace.TraceSequence>): void;
				
				  intersection(origin: KObject<any,any>, target: KObject<any,any>, callback: Callback<org.kevoree.modeling.api.trace.TraceSequence>): void;
				
				}
				
				export interface ModelListener {
				
				  on(evt: KEvent): void;
				
				}
				
				export interface ModelLoader {
				
				  load(payload: string, callback: Callback<java.lang.Throwable>): void;
				
				}
				
				export interface ModelSerializer {
				
				  serialize(model: KObject<any,any>, callback: ThrowableCallback<string>): void;
				
				}
				
				export interface ModelSlicer {
				
				  slice(elems: java.util.List<KObject<any,any>>, callback: Callback<org.kevoree.modeling.api.trace.TraceSequence>): void;
				
				}
				
				export interface ModelVisitor {
				
				  visit(elem: KObject<any,any>): VisitResult;
				
				}
				export module polynomial {
					
					export class DefaultPolynomialExtrapolation implements PolynomialExtrapolation {
					
					  private weights: number[] = null;
					  private timeOrigin: number = null;
					  private samples: java.util.List<org.kevoree.modeling.api.polynomial.util.DataSample> = new java.util.ArrayList<org.kevoree.modeling.api.polynomial.util.DataSample>();
					  private degradeFactor: number = 0;
					  private prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization = null;
					  private maxDegree: number = 0;
					  private toleratedError: number = 0;
					  private _lastIndex: number = -1;
					  private static sep: string = '|';
					
					  constructor(timeOrigin: number, toleratedError: number, maxDegree: number, degradeFactor: number, prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization) {
					    this.timeOrigin = timeOrigin;
					    this.degradeFactor = degradeFactor;
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
					
					  public comparePolynome(p2: DefaultPolynomialExtrapolation, err: number): boolean {
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
					        var ds: org.kevoree.modeling.api.polynomial.util.DataSample = this.samples.get(i * current / ss);
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
					        return true;
					      }
					    }
					    return false;
					  }
					
					  public lastIndex(): number {
					    return 0;
					  }
					
					  public save(): string {
					    var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
					    for (var i: number = 0; i < this.weights.length; i++) {
					      if (i != 0) {
					        builder.append(DefaultPolynomialExtrapolation.sep);
					      }
					      builder.append(this.weights[i]);
					    }
					    return builder.toString();
					  }
					
					  public load(payload: string): void {
					    var elems: string[] = payload.split(DefaultPolynomialExtrapolation.sep + "");
					    this.weights = new Array();
					    for (var i: number = 0; i < elems.length; i++) {
					      this.weights[i] = java.lang.Long.parseLong(elems[i]);
					    }
					  }
					
					}
					
					export interface PolynomialExtrapolation {
					
					  save(): string;
					
					  load(payload: string): void;
					
					  extrapolate(time: number): number;
					
					  insert(time: number, value: number): boolean;
					
					  lastIndex(): number;
					
					}
					export module util {
						
						export class AdjLinearSolverQr {
						
						  public numRows: number = 0;
						  public numCols: number = 0;
						  private decomposer: QRDecompositionHouseholderColumn_D64 = null;
						  public maxRows: number = -1;
						  public maxCols: number = -1;
						  public Q: DenseMatrix64F = null;
						  public R: DenseMatrix64F = null;
						  private Y: DenseMatrix64F = null;
						  private Z: DenseMatrix64F = null;
						
						  public setA(A: DenseMatrix64F): boolean {
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
						
						  public solve(B: DenseMatrix64F, X: DenseMatrix64F): void {
						    var BnumCols: number = B.numCols;
						    this.Y.reshape(this.numRows, 1, false);
						    this.Z.reshape(this.numRows, 1, false);
						    for (var colB: number = 0; colB < BnumCols; colB++) {
						      for (var i: number = 0; i < this.numRows; i++) {
						        this.Y.data[i] = B.unsafe_get(i, colB);
						      }
						      DenseMatrix64F.multTransA(this.Q, this.Y, this.Z);
						      this.solveU(this.R.data, this.Z.data, this.numCols);
						      for (var i: number = 0; i < this.numCols; i++) {
						        X.cset(i, colB, this.Z.data[i]);
						      }
						    }
						  }
						
						  constructor() {
						    this.decomposer = new QRDecompositionHouseholderColumn_D64();
						  }
						
						  public setMaxSize(maxRows: number, maxCols: number): void {
						    maxRows += 5;
						    this.maxRows = maxRows;
						    this.maxCols = maxCols;
						    this.Q = new DenseMatrix64F(maxRows, maxRows);
						    this.R = new DenseMatrix64F(maxRows, maxCols);
						    this.Y = new DenseMatrix64F(maxRows, 1);
						    this.Z = new DenseMatrix64F(maxRows, 1);
						  }
						
						}
						
						export class DataSample {
						
						  public time: number = 0;
						  public value: number = 0;
						
						  constructor(time: number, value: number) {
						    this.time = time;
						    this.value = value;
						  }
						
						}
						
						export class DenseMatrix64F {
						
						  public numRows: number = 0;
						  public numCols: number = 0;
						  public data: number[] = null;
						  public static MULT_COLUMN_SWITCH: number = 15;
						
						  public static multTransA_smallMV(A: DenseMatrix64F, B: DenseMatrix64F, C: DenseMatrix64F): void {
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
						
						  public static multTransA_reorderMV(A: DenseMatrix64F, B: DenseMatrix64F, C: DenseMatrix64F): void {
						    if (A.numRows == 0) {
						      DenseMatrix64F.fill(C, 0);
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
						
						  public static multTransA_reorderMM(a: DenseMatrix64F, b: DenseMatrix64F, c: DenseMatrix64F): void {
						    if (a.numCols == 0 || a.numRows == 0) {
						      DenseMatrix64F.fill(c, 0);
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
						
						  public static multTransA_smallMM(a: DenseMatrix64F, b: DenseMatrix64F, c: DenseMatrix64F): void {
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
						
						  public static multTransA(a: DenseMatrix64F, b: DenseMatrix64F, c: DenseMatrix64F): void {
						    if (b.numCols == 1) {
						      if (a.numCols >= DenseMatrix64F.MULT_COLUMN_SWITCH) {
						        DenseMatrix64F.multTransA_reorderMV(a, b, c);
						      } else {
						        DenseMatrix64F.multTransA_smallMV(a, b, c);
						      }
						    } else {
						      if (a.numCols >= DenseMatrix64F.MULT_COLUMN_SWITCH || b.numCols >= DenseMatrix64F.MULT_COLUMN_SWITCH) {
						        DenseMatrix64F.multTransA_reorderMM(a, b, c);
						      } else {
						        DenseMatrix64F.multTransA_smallMM(a, b, c);
						      }
						    }
						  }
						
						  public static setIdentity(mat: DenseMatrix64F): void {
						    var width: number = mat.numRows < mat.numCols ? mat.numRows : mat.numCols;
						    java.util.Arrays.fill(mat.data, 0, mat.getNumElements(), 0);
						    var index: number = 0;
						    for (var i: number = 0; i < width; i++) {
						      mat.data[index] = 1;
						      index += mat.numCols + 1;
						    }
						  }
						
						  public static widentity(width: number): DenseMatrix64F {
						    var ret: DenseMatrix64F = new DenseMatrix64F(width, width);
						    for (var i: number = 0; i < width; i++) {
						      ret.cset(i, i, 1.0);
						    }
						    return ret;
						  }
						
						  public static identity(numRows: number, numCols: number): DenseMatrix64F {
						    var ret: DenseMatrix64F = new DenseMatrix64F(numRows, numCols);
						    var small: number = numRows < numCols ? numRows : numCols;
						    for (var i: number = 0; i < small; i++) {
						      ret.cset(i, i, 1.0);
						    }
						    return ret;
						  }
						
						  public static fill(a: DenseMatrix64F, value: number): void {
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
						
						  public A: DenseMatrix64F = null;
						  public coef: DenseMatrix64F = null;
						  public y: DenseMatrix64F = null;
						  public solver: AdjLinearSolverQr = null;
						
						  constructor(degree: number) {
						    this.coef = new DenseMatrix64F(degree + 1, 1);
						    this.A = new DenseMatrix64F(1, degree + 1);
						    this.y = new DenseMatrix64F(1, 1);
						    this.solver = new AdjLinearSolverQr();
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
						
						}
						
						export class QRDecompositionHouseholderColumn_D64 {
						
						  public dataQR: number[][] = null;
						  public v: number[] = null;
						  public numCols: number = 0;
						  public numRows: number = 0;
						  public minLength: number = 0;
						  public gammas: number[] = null;
						  public gamma: number = 0;
						  public tau: number = 0;
						  public error: boolean = null;
						
						  public setExpectedMaxSize(numRows: number, numCols: number): void {
						    this.numCols = numCols;
						    this.numRows = numRows;
						    this.minLength = Math.min(numCols, numRows);
						    var maxLength: number = Math.max(numCols, numRows);
						    if (this.dataQR == null || this.dataQR.length < numCols || this.dataQR[0].length < numRows) {
						      this.dataQR = new Array(new Array());
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
						
						  public getQ(Q: DenseMatrix64F, compact: boolean): DenseMatrix64F {
						    if (compact) {
						      if (Q == null) {
						        Q = DenseMatrix64F.identity(this.numRows, this.minLength);
						      } else {
						        DenseMatrix64F.setIdentity(Q);
						      }
						    } else {
						      if (Q == null) {
						        Q = DenseMatrix64F.widentity(this.numRows);
						      } else {
						        DenseMatrix64F.setIdentity(Q);
						      }
						    }
						    for (var j: number = this.minLength - 1; j >= 0; j--) {
						      var u: number[] = this.dataQR[j];
						      var vv: number = u[j];
						      u[j] = 1;
						      QRDecompositionHouseholderColumn_D64.rank1UpdateMultR(Q, u, this.gammas[j], j, j, this.numRows, this.v);
						      u[j] = vv;
						    }
						    return Q;
						  }
						
						  public getR(R: DenseMatrix64F, compact: boolean): DenseMatrix64F {
						    if (R == null) {
						      if (compact) {
						        R = new DenseMatrix64F(this.minLength, this.numCols);
						      } else {
						        R = new DenseMatrix64F(this.numRows, this.numCols);
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
						
						  public decompose(A: DenseMatrix64F): boolean {
						    this.setExpectedMaxSize(A.numRows, A.numCols);
						    this.convertToColumnMajor(A);
						    this.error = false;
						    for (var j: number = 0; j < this.minLength; j++) {
						      this.householder(j);
						      this.updateA(j);
						    }
						    return !this.error;
						  }
						
						  public convertToColumnMajor(A: DenseMatrix64F): void {
						    for (var x: number = 0; x < this.numCols; x++) {
						      var colQ: number[] = this.dataQR[x];
						      for (var y: number = 0; y < this.numRows; y++) {
						        colQ[y] = A.data[y * this.numCols + x];
						      }
						    }
						  }
						
						  public householder(j: number): void {
						    var u: number[] = this.dataQR[j];
						    var max: number = QRDecompositionHouseholderColumn_D64.findMax(u, j, this.numRows - j);
						    if (max == 0.0) {
						      this.gamma = 0;
						      this.error = true;
						    } else {
						      this.tau = QRDecompositionHouseholderColumn_D64.computeTauAndDivide(j, this.numRows, u, max);
						      var u_0: number = u[j] + this.tau;
						      QRDecompositionHouseholderColumn_D64.divideElements(j + 1, this.numRows, u, u_0);
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
						
						  public static rank1UpdateMultR(A: DenseMatrix64F, u: number[], gamma: number, colA0: number, w0: number, w1: number, _temp: number[]): void {
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
				export module select {
					
					export class KQuery {
					
					  public static OPEN_BRACKET: string = '[';
					  public static CLOSE_BRACKET: string = ']';
					  public static QUERY_SEP: string = '/';
					  public relationName: string = null;
					  public params: java.util.Map<string, KQueryParam> = null;
					  public subQuery: string = null;
					  public oldString: string = null;
					  public previousIsDeep: boolean = null;
					  public previousIsRefDeep: boolean = null;
					
					  constructor(relationName: string, params: java.util.Map<string, KQueryParam>, subQuery: string, oldString: string, previousIsDeep: boolean, previousIsRefDeep: boolean) {
					    this.relationName = relationName;
					    this.params = params;
					    this.subQuery = subQuery;
					    this.oldString = oldString;
					    this.previousIsDeep = previousIsDeep;
					    this.previousIsRefDeep = previousIsRefDeep;
					  }
					
					  public static extractFirstQuery(query: string): KQuery {
					    if (query == null || query.length == 0) {
					      return null;
					    }
					    if (query.charAt(0) == KQuery.QUERY_SEP) {
					      var subQuery: string = null;
					      if (query.length > 1) {
					        subQuery = query.substring(1);
					      }
					      var params: java.util.Map<string, KQueryParam> = new java.util.HashMap<string, KQueryParam>();
					      return new KQuery("", params, subQuery, "" + KQuery.QUERY_SEP, false, false);
					    }
					    if (query.startsWith("**/")) {
					      if (query.length > 3) {
					        var next: KQuery = KQuery.extractFirstQuery(query.substring(3));
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
					        var next: KQuery = KQuery.extractFirstQuery(query.substring(4));
					        if (next != null) {
					          next.previousIsDeep = true;
					          next.previousIsRefDeep = true;
					        }
					        return next;
					      } else {
					        return null;
					      }
					    }
					    var i: number = 0;
					    var relationNameEnd: number = 0;
					    var attsEnd: number = 0;
					    var escaped: boolean = false;
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
					      var params: java.util.Map<string, KQueryParam> = new java.util.HashMap<string, KQueryParam>();
					      relName = relName.replace("\\", "");
					      if (attsEnd != 0) {
					        var paramString: string = query.substring(relationNameEnd + 1, attsEnd);
					        var iParam: number = 0;
					        var lastStart: number = iParam;
					        escaped = false;
					        while (iParam < paramString.length){
					          if (paramString.charAt(iParam) == ',' && !escaped) {
					            var p: string = paramString.substring(lastStart, iParam).trim();
					            if (p.equals("") && !p.equals("*")) {
					              if (p.endsWith("=")) {
					                p = p + "*";
					              }
					              var pArray: string[] = p.split("=");
					              var pObject: KQueryParam;
					              if (pArray.length > 1) {
					                var paramKey: string = pArray[0].trim();
					                var negative: boolean = paramKey.endsWith("!");
					                pObject = new KQueryParam(paramKey.replace("!", ""), pArray[1].trim(), negative);
					                params.put(pObject.name(), pObject);
					              } else {
					                pObject = new KQueryParam(null, p, false);
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
					          var pObject: KQueryParam;
					          if (pArray.length > 1) {
					            var paramKey: string = pArray[0].trim();
					            var negative: boolean = paramKey.endsWith("!");
					            pObject = new KQueryParam(paramKey.replace("!", ""), pArray[1].trim(), negative);
					            params.put(pObject.name(), pObject);
					          } else {
					            pObject = new KQueryParam(null, lastParam, false);
					            params.put("@id", pObject);
					          }
					        }
					      }
					      return new KQuery(relName, params, subQuery, oldString, false, false);
					    }
					    return null;
					  }
					
					}
					
					export class KQueryParam {
					
					  private _name: string = null;
					  private _value: string = null;
					  private _negative: boolean = null;
					
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
					
					  public static select(root: org.kevoree.modeling.api.KObject<any,any>, query: string, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>[]>): void {
					    var extractedQuery: KQuery = KQuery.extractFirstQuery(query);
					    if (extractedQuery == null) {
					      callback.on(new Array());
					    } else {
					      var relationNameRegex: string = extractedQuery.relationName.replace("*", ".*");
					      var collected: java.util.Set<number> = new java.util.HashSet<number>();
					      var raw: any[] = root.dimension().universe().storage().raw(root, org.kevoree.modeling.api.data.AccessMode.READ);
					      for (var i: number = 0; i < root.metaReferences().length; i++) {
					        var reference: org.kevoree.modeling.api.meta.MetaReference = root.metaReferences()[i];
					        if (reference.metaName().matches(relationNameRegex)) {
					          var refPayLoad: any = raw[reference.index()];
					          if (refPayLoad != null) {
					            if (refPayLoad instanceof java.util.Set) {
					              var castedSet: java.util.Set<number> = <java.util.Set<number>>refPayLoad;
					              collected.addAll(castedSet);
					            } else {
					              var castedLong: number = <number>refPayLoad;
					              collected.add(castedLong);
					            }
					          }
					        }
					      }
					      root.view().lookupAll(collected.toArray(new Array()), {on:function(resolveds: org.kevoree.modeling.api.KObject<any,any>[]){
					      var nextGeneration: java.util.List<org.kevoree.modeling.api.KObject<any,any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any,any>>();
					      if (extractedQuery.params.isEmpty()) {
					        for (var i: number = 0; i < resolveds.length; i++) {
					          nextGeneration.add(resolveds[i]);
					        }
					      } else {
					        for (var i: number = 0; i < resolveds.length; i++) {
					          var resolved: org.kevoree.modeling.api.KObject<any,any> = resolveds[i];
					          var selectedForNext: boolean = true;
					          //TODO resolve for-each cycle
					          var paramKey: string;
					          for (paramKey in extractedQuery.params.keySet()) {
					            var param: KQueryParam = extractedQuery.params.get(paramKey);
					            for (var j: number = 0; j < resolved.metaAttributes().length; j++) {
					              var metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute = resolved.metaAttributes()[i];
					              if (metaAttribute.metaName().matches(param.name().replace("*", ".*"))) {
					                var o_raw: any = resolved.get(metaAttribute);
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
					      var childSelected: java.util.List<org.kevoree.modeling.api.KObject<any,any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any,any>>();
					      if (extractedQuery.subQuery == null || extractedQuery.subQuery.isEmpty()) {
					        childSelected.add(root);
					        callback.on(nextGeneration.toArray(new Array()));
					      } else {
					        org.kevoree.modeling.api.util.Helper.forall(nextGeneration.toArray(new Array()), {on:function(kObject: org.kevoree.modeling.api.KObject<any,any>, next: org.kevoree.modeling.api.Callback<java.lang.Throwable>){
					        KSelector.select(kObject, extractedQuery.subQuery, {on:function(kObjects: org.kevoree.modeling.api.KObject<any,any>[]){
					        childSelected.addAll(childSelected);
					}});
					}}, {on:function(throwable: java.lang.Throwable){
					        callback.on(childSelected.toArray(new Array()));
					}});
					      }
					}});
					    }
					  }
					
					}
				}
				export module slice {
					
					export class DefaultModelSlicer implements org.kevoree.modeling.api.ModelSlicer {
					
					  private internal_prune(elem: org.kevoree.modeling.api.KObject<any,any>, traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace>, cache: java.util.Map<number, org.kevoree.modeling.api.KObject<any,any>>, parentMap: java.util.Map<number, org.kevoree.modeling.api.KObject<any,any>>, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    var parents: java.util.List<org.kevoree.modeling.api.KObject<any,any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any,any>>();
					    var parentExplorer: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.KObject<any,any>>[] = new Array();
					    parentExplorer[0] = {on:function(currentParent: org.kevoree.modeling.api.KObject<any,any>){
					    if (currentParent != null && parentMap.get(currentParent.uuid()) == null && cache.get(currentParent.uuid()) == null) {
					      parents.add(currentParent);
					      currentParent.parent(parentExplorer[0]);
					      callback.on(null);
					    } else {
					      java.util.Collections.reverse(parents);
					      var parentsArr: org.kevoree.modeling.api.KObject<any,any>[] = parents.toArray(new Array());
					      for (var k: number = 0; k < parentsArr.length; k++) {
					        var parent: org.kevoree.modeling.api.KObject<any,any> = parentsArr[k];
					        if (parent.parentUuid() != null) {
					          traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(parent.parentUuid(), parent.referenceInParent(), parent.uuid(), parent.metaClass()));
					        }
					        var toAdd: org.kevoree.modeling.api.trace.ModelTrace[] = elem.traces(org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_ONLY);
					        for (var i: number = 0; i < toAdd.length; i++) {
					          traces.add(toAdd[i]);
					        }
					        parentMap.put(parent.uuid(), parent);
					      }
					      if (cache.get(elem.uuid()) == null && parentMap.get(elem.uuid()) == null) {
					        if (elem.parentUuid() != null) {
					          traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.parentUuid(), elem.referenceInParent(), elem.uuid(), elem.metaClass()));
					        }
					        var toAdd: org.kevoree.modeling.api.trace.ModelTrace[] = elem.traces(org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_ONLY);
					        for (var i: number = 0; i < toAdd.length; i++) {
					          traces.add(toAdd[i]);
					        }
					      }
					      cache.put(elem.uuid(), elem);
					      elem.graphVisit({visit:function(elem: org.kevoree.modeling.api.KObject<any,any>){
					      if (cache.get(elem.uuid()) == null) {
					        this.internal_prune(elem, traces, cache, parentMap, {on:function(throwable: java.lang.Throwable){
					}});
					      }
					      return org.kevoree.modeling.api.VisitResult.CONTINUE;
					}}, {on:function(throwable: java.lang.Throwable){
					      callback.on(null);
					}});
					    }
					}};
					    traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.uuid(), null, elem.uuid(), elem.metaClass()));
					    elem.parent(parentExplorer[0]);
					  }
					
					  public slice(elems: java.util.List<org.kevoree.modeling.api.KObject<any,any>>, callback: org.kevoree.modeling.api.Callback<org.kevoree.modeling.api.trace.TraceSequence>): void {
					    var traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
					    var tempMap: java.util.Map<number, org.kevoree.modeling.api.KObject<any,any>> = new java.util.HashMap<number, org.kevoree.modeling.api.KObject<any,any>>();
					    var parentMap: java.util.Map<number, org.kevoree.modeling.api.KObject<any,any>> = new java.util.HashMap<number, org.kevoree.modeling.api.KObject<any,any>>();
					    var elemsArr: org.kevoree.modeling.api.KObject<any,any>[] = elems.toArray(new Array());
					    org.kevoree.modeling.api.util.Helper.forall(elemsArr, {on:function(obj: org.kevoree.modeling.api.KObject<any,any>, next: org.kevoree.modeling.api.Callback<java.lang.Throwable>){
					    this.internal_prune(obj, traces, tempMap, parentMap, next);
					}}, {on:function(throwable: java.lang.Throwable){
					    var toLinkKeysArr: number[] = tempMap.keySet().toArray(new Array());
					    for (var k: number = 0; k < toLinkKeysArr.length; k++) {
					      var toLink: org.kevoree.modeling.api.KObject<any,any> = tempMap.get(toLinkKeysArr[k]);
					      var toAdd: org.kevoree.modeling.api.trace.ModelTrace[] = toLink.traces(org.kevoree.modeling.api.TraceRequest.REFERENCES_ONLY);
					      for (var i: number = 0; i < toAdd.length; i++) {
					        traces.add(toAdd[i]);
					      }
					    }
					    callback.on(new org.kevoree.modeling.api.trace.TraceSequence().populate(traces));
					}});
					  }
					
					}
				}
				export module strategy {
					
					export class DiscreteExtrapolationStrategy implements ExtrapolationStrategy {
					
					  public timedDependencies(current: org.kevoree.modeling.api.KObject<any,any>): number[] {
					    var times: number[] = new Array();
					    times[0] = current.timeTree().resolve(current.now());
					    return times;
					  }
					
					  public extrapolate(current: org.kevoree.modeling.api.KObject<any,any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, dependencies: org.kevoree.modeling.api.KObject<any,any>[]): any {
					    var payload: any[] = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ);
					    if (payload != null) {
					      return payload[attribute.index()];
					    } else {
					      return null;
					    }
					  }
					
					  public mutate(current: org.kevoree.modeling.api.KObject<any,any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any, dependencies: org.kevoree.modeling.api.KObject<any,any>[]): void {
					    var internalPayload: any[] = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE);
					    if (internalPayload != null) {
					      internalPayload[attribute.index()] = payload;
					    }
					  }
					
					}
					
					export interface ExtrapolationStrategy {
					
					  timedDependencies(current: org.kevoree.modeling.api.KObject<any,any>): number[];
					
					  extrapolate(current: org.kevoree.modeling.api.KObject<any,any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, dependencies: org.kevoree.modeling.api.KObject<any,any>[]): any;
					
					  mutate(current: org.kevoree.modeling.api.KObject<any,any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any, dependencies: org.kevoree.modeling.api.KObject<any,any>[]): void;
					
					}
					
					export class LinearRegressionExtrapolationStrategy implements ExtrapolationStrategy {
					
					  public timedDependencies(current: org.kevoree.modeling.api.KObject<any,any>): number[] {
					    return new Array();
					  }
					
					  public extrapolate(current: org.kevoree.modeling.api.KObject<any,any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, dependencies: org.kevoree.modeling.api.KObject<any,any>[]): any {
					    return null;
					  }
					
					  public mutate(current: org.kevoree.modeling.api.KObject<any,any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any, dependencies: org.kevoree.modeling.api.KObject<any,any>[]): void {
					  }
					
					}
					
					export class PolynomialExtrapolationStrategy implements ExtrapolationStrategy {
					
					  public timedDependencies(current: org.kevoree.modeling.api.KObject<any,any>): number[] {
					    var times: number[] = new Array();
					    times[0] = current.timeTree().resolve(current.now());
					    return times;
					  }
					
					  public extrapolate(current: org.kevoree.modeling.api.KObject<any,any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, dependencies: org.kevoree.modeling.api.KObject<any,any>[]): any {
					    var pol: org.kevoree.modeling.api.polynomial.PolynomialExtrapolation = <org.kevoree.modeling.api.polynomial.PolynomialExtrapolation>current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[attribute.index()];
					    if (pol != null) {
					      return pol.extrapolate(current.now());
					    } else {
					      return null;
					    }
					  }
					
					  public mutate(current: org.kevoree.modeling.api.KObject<any,any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any, dependencies: org.kevoree.modeling.api.KObject<any,any>[]): void {
					    var previous: any = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[attribute.index()];
					    if (previous == null) {
					      var pol: org.kevoree.modeling.api.polynomial.PolynomialExtrapolation = new org.kevoree.modeling.api.polynomial.DefaultPolynomialExtrapolation(current.now(), attribute.precision(), 20, 1, org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES);
					      pol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()));
					      current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE)[attribute.index()] = pol;
					    } else {
					      var previousPol: org.kevoree.modeling.api.polynomial.PolynomialExtrapolation = <org.kevoree.modeling.api.polynomial.PolynomialExtrapolation>previous;
					      if (!previousPol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()))) {
					        var pol: org.kevoree.modeling.api.polynomial.PolynomialExtrapolation = new org.kevoree.modeling.api.polynomial.DefaultPolynomialExtrapolation(previousPol.lastIndex(), attribute.precision(), 20, 1, org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES);
					        pol.insert(previousPol.lastIndex(), previousPol.extrapolate(previousPol.lastIndex()));
					        pol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()));
					        current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE)[attribute.index()] = pol;
					      }
					    }
					  }
					
					}
				}
				
				export interface ThrowableCallback<A> {
				
				  on(a: A, error: java.lang.Throwable): void;
				
				}
				export module time {
					
					export class DefaultTimeTree implements TimeTree {
					
					  public dirty: boolean = true;
					  public versionTree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
					
					  public walk(walker: TimeWalker): void {
					    this.walkAsc(walker);
					  }
					
					  public walkAsc(walker: TimeWalker): void {
					    var elem: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.first();
					    while (elem != null){
					      walker.walk(elem.getKey());
					      elem = elem.next();
					    }
					  }
					
					  public walkDesc(walker: TimeWalker): void {
					    var elem: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.last();
					    while (elem != null){
					      walker.walk(elem.getKey());
					      elem = elem.previous();
					    }
					  }
					
					  public walkRangeAsc(walker: TimeWalker, from: number, to: number): void {
					    var from2: number = from;
					    var to2: number = to;
					    if (from > to) {
					      from2 = to;
					      to2 = from;
					    }
					    var elem: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.previousOrEqual(from2);
					    while (elem != null){
					      walker.walk(elem.getKey());
					      elem = elem.next();
					      if (elem != null) {
					        if (elem.getKey() >= to2) {
					          return;
					        }
					      }
					    }
					  }
					
					  public walkRangeDesc(walker: TimeWalker, from: number, to: number): void {
					    var from2: number = from;
					    var to2: number = to;
					    if (from > to) {
					      from2 = to;
					      to2 = from;
					    }
					    var elem: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.previousOrEqual(to2);
					    while (elem != null){
					      walker.walk(elem.getKey());
					      elem = elem.previous();
					      if (elem != null) {
					        if (elem.getKey() <= from2) {
					          walker.walk(elem.getKey());
					          return;
					        }
					      }
					    }
					  }
					
					  public first(): number {
					    var firstNode: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.first();
					    if (firstNode != null) {
					      return firstNode.getKey();
					    } else {
					      return null;
					    }
					  }
					
					  public last(): number {
					    var lastNode: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.last();
					    if (lastNode != null) {
					      return lastNode.getKey();
					    } else {
					      return null;
					    }
					  }
					
					  public next(from: number): number {
					    var nextNode: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.next(from);
					    if (nextNode != null) {
					      return nextNode.getKey();
					    } else {
					      return null;
					    }
					  }
					
					  public previous(from: number): number {
					    var previousNode: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.previous(from);
					    if (previousNode != null) {
					      return previousNode.getKey();
					    } else {
					      return null;
					    }
					  }
					
					  public resolve(time: number): number {
					    var previousNode: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.previousOrEqual(time);
					    if (previousNode != null) {
					      return previousNode.getKey();
					    } else {
					      return null;
					    }
					  }
					
					  public insert(time: number): TimeTree {
					    this.versionTree.insert(time, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
					    this.dirty = true;
					    return this;
					  }
					
					  public isDirty(): boolean {
					    return this.dirty;
					  }
					
					  public size(): number {
					    return this.versionTree.size();
					  }
					
					  public setDirty(state: boolean): void {
					    this.dirty = state;
					  }
					
					  public toString(): string {
					    return this.versionTree.serialize();
					  }
					
					  public load(payload: string): void {
					    this.versionTree.unserialize(payload);
					    this.dirty = false;
					  }
					
					}
					export module rbtree {
						
						export class Color {
						
						  public static RED: Color = new Color();
						  public static BLACK: Color = new Color();
						  public equals(other: any): boolean {
						        return this == other;
						    }
						
						}
						
						export class RBTree {
						
						  public root: TreeNode = null;
						  private _size: number = 0;
						
						  public size(): number {
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
						    var i: number = 0;
						    var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
						    var ch: string = payload.charAt(i);
						    while (i < payload.length && ch != '|'){
						      buffer.append(ch);
						      i = i + 1;
						      ch = payload.charAt(i);
						    }
						    this._size = java.lang.Integer.parseInt(buffer.toString());
						    this.root = new ReaderContext(i, payload).unserialize(true);
						  }
						
						  public previousOrEqual(key: number): TreeNode {
						    var p: TreeNode = this.root;
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
						          var parent: TreeNode = p.getParent();
						          var ch: TreeNode = p;
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
						
						  public nextOrEqual(key: number): TreeNode {
						    var p: TreeNode = this.root;
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
						          var parent: TreeNode = p.getParent();
						          var ch: TreeNode = p;
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
						
						  public previous(key: number): TreeNode {
						    var p: TreeNode = this.root;
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
						
						  public previousWhileNot(key: number, until: State): TreeNode {
						    var elm: TreeNode = this.previousOrEqual(key);
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
						
						  public next(key: number): TreeNode {
						    var p: TreeNode = this.root;
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
						
						  public nextWhileNot(key: number, until: State): TreeNode {
						    var elm: TreeNode = this.nextOrEqual(key);
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
						
						  public first(): TreeNode {
						    var p: TreeNode = this.root;
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
						
						  public last(): TreeNode {
						    var p: TreeNode = this.root;
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
						
						  public firstWhileNot(key: number, until: State): TreeNode {
						    var elm: TreeNode = this.previousOrEqual(key);
						    if (elm == null) {
						      return null;
						    } else {
						      if (elm.value.equals(until)) {
						        return null;
						      }
						    }
						    var prev: TreeNode = null;
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
						
						  public lastWhileNot(key: number, until: State): TreeNode {
						    var elm: TreeNode = this.previousOrEqual(key);
						    if (elm == null) {
						      return null;
						    } else {
						      if (elm.value.equals(until)) {
						        return null;
						      }
						    }
						    var next: TreeNode;
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
						
						  private lookupNode(key: number): TreeNode {
						    var n: TreeNode = this.root;
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
						
						  public lookup(key: number): State {
						    var n: TreeNode = this.lookupNode(key);
						    if (n == null) {
						      return null;
						    } else {
						      return n.value;
						    }
						  }
						
						  private rotateLeft(n: TreeNode): void {
						    var r: TreeNode = n.getRight();
						    this.replaceNode(n, r);
						    n.setRight(r.getLeft());
						    if (r.getLeft() != null) {
						      r.getLeft().setParent(n);
						    }
						    r.setLeft(n);
						    n.setParent(r);
						  }
						
						  private rotateRight(n: TreeNode): void {
						    var l: TreeNode = n.getLeft();
						    this.replaceNode(n, l);
						    n.setLeft(l.getRight());
						    if (l.getRight() != null) {
						      l.getRight().setParent(n);
						    }
						    l.setRight(n);
						    n.setParent(l);
						  }
						
						  private replaceNode(oldn: TreeNode, newn: TreeNode): void {
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
						
						  public insert(key: number, value: State): void {
						    var insertedNode: TreeNode = new TreeNode(key, value, Color.RED, null, null);
						    if (this.root == null) {
						      this._size++;
						      this.root = insertedNode;
						    } else {
						      var n: TreeNode = this.root;
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
						
						  private insertCase1(n: TreeNode): void {
						    if (n.getParent() == null) {
						      n.color = Color.BLACK;
						    } else {
						      this.insertCase2(n);
						    }
						  }
						
						  private insertCase2(n: TreeNode): void {
						    if (this.nodeColor(n.getParent()) == Color.BLACK) {
						      return;
						    } else {
						      this.insertCase3(n);
						    }
						  }
						
						  private insertCase3(n: TreeNode): void {
						    if (this.nodeColor(n.uncle()) == Color.RED) {
						      n.getParent().color = Color.BLACK;
						      n.uncle().color = Color.BLACK;
						      n.grandparent().color = Color.RED;
						      this.insertCase1(n.grandparent());
						    } else {
						      this.insertCase4(n);
						    }
						  }
						
						  private insertCase4(n_n: TreeNode): void {
						    var n: TreeNode = n_n;
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
						
						  private insertCase5(n: TreeNode): void {
						    n.getParent().color = Color.BLACK;
						    n.grandparent().color = Color.RED;
						    if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getLeft()) {
						      this.rotateRight(n.grandparent());
						    } else {
						      this.rotateLeft(n.grandparent());
						    }
						  }
						
						  public delete(key: number): void {
						    var n: TreeNode = this.lookupNode(key);
						    if (n == null) {
						      return;
						    } else {
						      this._size--;
						      if (n.getLeft() != null && n.getRight() != null) {
						        var pred: TreeNode = n.getLeft();
						        while (pred.getRight() != null){
						          pred = pred.getRight();
						        }
						        n.key = pred.key;
						        n.value = pred.value;
						        n = pred;
						      }
						      var child: TreeNode;
						      if (n.getRight() == null) {
						        child = n.getLeft();
						      } else {
						        child = n.getRight();
						      }
						      if (this.nodeColor(n) == Color.BLACK) {
						        n.color = this.nodeColor(child);
						        this.deleteCase1(n);
						      }
						      this.replaceNode(n, child);
						    }
						  }
						
						  private deleteCase1(n: TreeNode): void {
						    if (n.getParent() == null) {
						      return;
						    } else {
						      this.deleteCase2(n);
						    }
						  }
						
						  private deleteCase2(n: TreeNode): void {
						    if (this.nodeColor(n.sibling()) == Color.RED) {
						      n.getParent().color = Color.RED;
						      n.sibling().color = Color.BLACK;
						      if (n == n.getParent().getLeft()) {
						        this.rotateLeft(n.getParent());
						      } else {
						        this.rotateRight(n.getParent());
						      }
						    }
						    this.deleteCase3(n);
						  }
						
						  private deleteCase3(n: TreeNode): void {
						    if (this.nodeColor(n.getParent()) == Color.BLACK && this.nodeColor(n.sibling()) == Color.BLACK && this.nodeColor(n.sibling().getLeft()) == Color.BLACK && this.nodeColor(n.sibling().getRight()) == Color.BLACK) {
						      n.sibling().color = Color.RED;
						      this.deleteCase1(n.getParent());
						    } else {
						      this.deleteCase4(n);
						    }
						  }
						
						  private deleteCase4(n: TreeNode): void {
						    if (this.nodeColor(n.getParent()) == Color.RED && this.nodeColor(n.sibling()) == Color.BLACK && this.nodeColor(n.sibling().getLeft()) == Color.BLACK && this.nodeColor(n.sibling().getRight()) == Color.BLACK) {
						      n.sibling().color = Color.RED;
						      n.getParent().color = Color.BLACK;
						    } else {
						      this.deleteCase5(n);
						    }
						  }
						
						  private deleteCase5(n: TreeNode): void {
						    if (n == n.getParent().getLeft() && this.nodeColor(n.sibling()) == Color.BLACK && this.nodeColor(n.sibling().getLeft()) == Color.RED && this.nodeColor(n.sibling().getRight()) == Color.BLACK) {
						      n.sibling().color = Color.RED;
						      n.sibling().getLeft().color = Color.BLACK;
						      this.rotateRight(n.sibling());
						    } else {
						      if (n == n.getParent().getRight() && this.nodeColor(n.sibling()) == Color.BLACK && this.nodeColor(n.sibling().getRight()) == Color.RED && this.nodeColor(n.sibling().getLeft()) == Color.BLACK) {
						        n.sibling().color = Color.RED;
						        n.sibling().getRight().color = Color.BLACK;
						        this.rotateLeft(n.sibling());
						      }
						    }
						    this.deleteCase6(n);
						  }
						
						  private deleteCase6(n: TreeNode): void {
						    n.sibling().color = this.nodeColor(n.getParent());
						    n.getParent().color = Color.BLACK;
						    if (n == n.getParent().getLeft()) {
						      n.sibling().getRight().color = Color.BLACK;
						      this.rotateLeft(n.getParent());
						    } else {
						      n.sibling().getLeft().color = Color.BLACK;
						      this.rotateRight(n.getParent());
						    }
						  }
						
						  private nodeColor(n: TreeNode): Color {
						    if (n == null) {
						      return Color.BLACK;
						    } else {
						      return n.color;
						    }
						  }
						
						}
						
						export class ReaderContext {
						
						  private payload: string = null;
						  private offset: number = 0;
						
						  constructor(offset: number, payload: string) {
						    this.offset = offset;
						    this.payload = payload;
						  }
						
						  public unserialize(rightBranch: boolean): TreeNode {
						    if (this.offset >= this.payload.length) {
						      return null;
						    }
						    var tokenBuild: java.lang.StringBuilder = new java.lang.StringBuilder();
						    var ch: string = this.payload.charAt(this.offset);
						    if (ch == '%') {
						      if (rightBranch) {
						        this.offset = this.offset + 1;
						      }
						      return null;
						    }
						    if (ch == '#') {
						      this.offset = this.offset + 1;
						      return null;
						    }
						    if (ch != '|') {
						      throw new java.lang.Exception("Error while loading BTree");
						    }
						    this.offset = this.offset + 1;
						    ch = this.payload.charAt(this.offset);
						    var color: Color = Color.BLACK;
						    var state: State = State.EXISTS;
						    switch (ch) {
						      case TreeNode.BLACK_DELETE: 
						      color = Color.BLACK;
						      state = State.DELETED;
						      break;
						      case TreeNode.BLACK_EXISTS: 
						      color = Color.BLACK;
						      state = State.EXISTS;
						      break;
						      case TreeNode.RED_DELETE: 
						      color = Color.RED;
						      state = State.DELETED;
						      break;
						      case TreeNode.RED_EXISTS: 
						      color = Color.RED;
						      state = State.EXISTS;
						      break;
						    }
						    this.offset = this.offset + 1;
						    ch = this.payload.charAt(this.offset);
						    while (this.offset + 1 < this.payload.length && ch != '|' && ch != '#' && ch != '%'){
						      tokenBuild.append(ch);
						      this.offset = this.offset + 1;
						      ch = this.payload.charAt(this.offset);
						    }
						    if (ch != '|' && ch != '#' && ch != '%') {
						      tokenBuild.append(ch);
						    }
						    var p: TreeNode = new TreeNode(java.lang.Long.parseLong(tokenBuild.toString()), state, color, null, null);
						    var left: TreeNode = this.unserialize(false);
						    if (left != null) {
						      left.setParent(p);
						    }
						    var right: TreeNode = this.unserialize(true);
						    if (right != null) {
						      right.setParent(p);
						    }
						    p.setLeft(left);
						    p.setRight(right);
						    return p;
						  }
						
						}
						
						export class State {
						
						  public static EXISTS: State = new State();
						  public static DELETED: State = new State();
						  public equals(other: any): boolean {
						        return this == other;
						    }
						
						}
						
						export class TreeNode {
						
						  public static BLACK_DELETE: string = '0';
						  public static BLACK_EXISTS: string = '1';
						  public static RED_DELETE: string = '2';
						  public static RED_EXISTS: string = '3';
						  public key: number = 0;
						  public value: State = null;
						  public color: Color = null;
						  private left: TreeNode = null;
						  private right: TreeNode = null;
						  private parent: TreeNode = null;
						
						  public getKey(): number {
						    return this.key;
						  }
						
						  constructor(key: number, value: State, color: Color, left: TreeNode, right: TreeNode) {
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
						
						  public grandparent(): TreeNode {
						    if (this.parent != null) {
						      return this.parent.parent;
						    } else {
						      return null;
						    }
						  }
						
						  public sibling(): TreeNode {
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
						
						  public uncle(): TreeNode {
						    if (this.parent != null) {
						      return this.parent.sibling();
						    } else {
						      return null;
						    }
						  }
						
						  public getLeft(): TreeNode {
						    return this.left;
						  }
						
						  public setLeft(left: TreeNode): void {
						    this.left = left;
						  }
						
						  public getRight(): TreeNode {
						    return this.right;
						  }
						
						  public setRight(right: TreeNode): void {
						    this.right = right;
						  }
						
						  public getParent(): TreeNode {
						    return this.parent;
						  }
						
						  public setParent(parent: TreeNode): void {
						    this.parent = parent;
						  }
						
						  public serialize(builder: java.lang.StringBuilder): void {
						    builder.append("|");
						    if (this.value == State.DELETED) {
						      if (this.color == Color.BLACK) {
						        builder.append(TreeNode.BLACK_DELETE);
						      } else {
						        builder.append(TreeNode.RED_DELETE);
						      }
						    } else {
						      if (this.color == Color.BLACK) {
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
						
						  public next(): TreeNode {
						    var p: TreeNode = this;
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
						
						  public previous(): TreeNode {
						    var p: TreeNode = this;
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
						
						}
					}
					
					export interface TimeTree {
					
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
					
					export interface TimeWalker {
					
					  walk(timePoint: number): void;
					
					}
				}
				export module trace {
					
					export class ModelAddTrace implements ModelTrace {
					
					  private reference: org.kevoree.modeling.api.meta.MetaReference = null;
					  private traceType: org.kevoree.modeling.api.KActionType = org.kevoree.modeling.api.KActionType.ADD;
					  private srcKID: number = null;
					  private previousKID: number = null;
					  private metaClass: org.kevoree.modeling.api.meta.MetaClass = null;
					
					  public getPreviousKID(): number {
					    return this.previousKID;
					  }
					
					  public getMetaClass(): org.kevoree.modeling.api.meta.MetaClass {
					    return this.metaClass;
					  }
					
					  constructor(srcKID: number, reference: org.kevoree.modeling.api.meta.MetaReference, previousKID: number, metaClass: org.kevoree.modeling.api.meta.MetaClass) {
					    this.srcKID = srcKID;
					    this.reference = reference;
					    this.previousKID = previousKID;
					    this.metaClass = metaClass;
					  }
					
					  public toString(): string {
					    var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
					    buffer.append(ModelTraceConstants.openJSON);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.traceType);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.dp);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(org.kevoree.modeling.api.KActionType.ADD.toString());
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.coma);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.src);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.dp);
					    buffer.append(ModelTraceConstants.bb);
					    org.kevoree.modeling.api.json.JSONString.encodeBuffer(buffer, this.srcKID + "");
					    buffer.append(ModelTraceConstants.bb);
					    if (this.reference != null) {
					      buffer.append(ModelTraceConstants.coma);
					      buffer.append(ModelTraceConstants.bb);
					      buffer.append(ModelTraceConstants.meta);
					      buffer.append(ModelTraceConstants.bb);
					      buffer.append(ModelTraceConstants.dp);
					      buffer.append(ModelTraceConstants.bb);
					      buffer.append(this.reference.metaName());
					      buffer.append(ModelTraceConstants.bb);
					    }
					    if (this.previousKID != null) {
					      buffer.append(ModelTraceConstants.coma);
					      buffer.append(ModelTraceConstants.bb);
					      buffer.append(ModelTraceConstants.previouspath);
					      buffer.append(ModelTraceConstants.bb);
					      buffer.append(ModelTraceConstants.dp);
					      buffer.append(ModelTraceConstants.bb);
					      org.kevoree.modeling.api.json.JSONString.encodeBuffer(buffer, this.previousKID + "");
					      buffer.append(ModelTraceConstants.bb);
					    }
					    if (this.metaClass != null) {
					      buffer.append(ModelTraceConstants.coma);
					      buffer.append(ModelTraceConstants.bb);
					      buffer.append(ModelTraceConstants.typename);
					      buffer.append(ModelTraceConstants.bb);
					      buffer.append(ModelTraceConstants.dp);
					      buffer.append(ModelTraceConstants.bb);
					      org.kevoree.modeling.api.json.JSONString.encodeBuffer(buffer, this.metaClass.metaName());
					      buffer.append(ModelTraceConstants.bb);
					    }
					    buffer.append(ModelTraceConstants.closeJSON);
					    return buffer.toString();
					  }
					
					  public getMeta(): org.kevoree.modeling.api.meta.Meta {
					    return this.reference;
					  }
					
					  public getTraceType(): org.kevoree.modeling.api.KActionType {
					    return this.traceType;
					  }
					
					  public getSrcKID(): number {
					    return this.srcKID;
					  }
					
					}
					
					export class ModelRemoveTrace implements ModelTrace {
					
					  private traceType: org.kevoree.modeling.api.KActionType = org.kevoree.modeling.api.KActionType.REMOVE;
					  private srcKID: number = null;
					  private objKID: number = null;
					  private reference: org.kevoree.modeling.api.meta.MetaReference = null;
					
					  constructor(srcKID: number, reference: org.kevoree.modeling.api.meta.MetaReference, objKID: number) {
					    this.srcKID = srcKID;
					    this.reference = reference;
					    this.objKID = objKID;
					  }
					
					  public getObjKID(): number {
					    return this.objKID;
					  }
					
					  public getMeta(): org.kevoree.modeling.api.meta.Meta {
					    return this.reference;
					  }
					
					  public getTraceType(): org.kevoree.modeling.api.KActionType {
					    return this.traceType;
					  }
					
					  public getSrcKID(): number {
					    return this.srcKID;
					  }
					
					  public toString(): string {
					    var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
					    buffer.append(ModelTraceConstants.openJSON);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.traceType);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.dp);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(org.kevoree.modeling.api.KActionType.REMOVE);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.coma);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.src);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.dp);
					    buffer.append(ModelTraceConstants.bb);
					    org.kevoree.modeling.api.json.JSONString.encodeBuffer(buffer, this.srcKID + "");
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.coma);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.meta);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.dp);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(this.reference.metaName());
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.coma);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.objpath);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.dp);
					    buffer.append(ModelTraceConstants.bb);
					    org.kevoree.modeling.api.json.JSONString.encodeBuffer(buffer, this.objKID + "");
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.closeJSON);
					    return buffer.toString();
					  }
					
					}
					
					export class ModelSetTrace implements ModelTrace {
					
					  private traceType: org.kevoree.modeling.api.KActionType = org.kevoree.modeling.api.KActionType.SET;
					  private srcKID: number = null;
					  private attribute: org.kevoree.modeling.api.meta.MetaAttribute = null;
					  private content: any = null;
					
					  constructor(srcKID: number, attribute: org.kevoree.modeling.api.meta.MetaAttribute, content: any) {
					    this.srcKID = srcKID;
					    this.attribute = attribute;
					    this.content = content;
					  }
					
					  public getTraceType(): org.kevoree.modeling.api.KActionType {
					    return this.traceType;
					  }
					
					  public getSrcKID(): number {
					    return this.srcKID;
					  }
					
					  public getMeta(): org.kevoree.modeling.api.meta.Meta {
					    return this.attribute;
					  }
					
					  public getContent(): any {
					    return this.content;
					  }
					
					  public toString(): string {
					    var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
					    buffer.append(ModelTraceConstants.openJSON);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.traceType);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.dp);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(org.kevoree.modeling.api.KActionType.SET);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.coma);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.src);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.dp);
					    buffer.append(ModelTraceConstants.bb);
					    org.kevoree.modeling.api.json.JSONString.encodeBuffer(buffer, this.srcKID + "");
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.coma);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.meta);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(ModelTraceConstants.dp);
					    buffer.append(ModelTraceConstants.bb);
					    buffer.append(this.attribute.metaName());
					    buffer.append(ModelTraceConstants.bb);
					    if (this.content != null) {
					      buffer.append(ModelTraceConstants.coma);
					      buffer.append(ModelTraceConstants.bb);
					      buffer.append(ModelTraceConstants.content);
					      buffer.append(ModelTraceConstants.bb);
					      buffer.append(ModelTraceConstants.dp);
					      buffer.append(ModelTraceConstants.bb);
					      org.kevoree.modeling.api.json.JSONString.encodeBuffer(buffer, this.content.toString());
					      buffer.append(ModelTraceConstants.bb);
					    }
					    buffer.append(ModelTraceConstants.closeJSON);
					    return buffer.toString();
					  }
					
					}
					
					export interface ModelTrace {
					
					  getMeta(): org.kevoree.modeling.api.meta.Meta;
					
					  getTraceType(): org.kevoree.modeling.api.KActionType;
					
					  getSrcKID(): number;
					
					}
					
					export class ModelTraceApplicator {
					
					  private targetModel: org.kevoree.modeling.api.KObject<any,any> = null;
					  private pendingObj: org.kevoree.modeling.api.KObject<any,any> = null;
					  private pendingParent: org.kevoree.modeling.api.KObject<any,any> = null;
					  private pendingParentRef: org.kevoree.modeling.api.meta.MetaReference = null;
					  private pendingObjKID: number = null;
					
					  constructor(targetModel: org.kevoree.modeling.api.KObject<any,any>) {
					    this.targetModel = targetModel;
					  }
					
					  private tryClosePending(srcKID: number): void {
					    if (this.pendingObj != null && !(this.pendingObjKID.equals(srcKID))) {
					      this.pendingParent.mutate(org.kevoree.modeling.api.KActionType.ADD, this.pendingParentRef, this.pendingObj, true);
					      this.pendingObj = null;
					      this.pendingObjKID = null;
					      this.pendingParentRef = null;
					      this.pendingParent = null;
					    }
					  }
					
					  public createOrAdd(previousPath: number, target: org.kevoree.modeling.api.KObject<any,any>, reference: org.kevoree.modeling.api.meta.MetaReference, metaClass: org.kevoree.modeling.api.meta.MetaClass, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    if (previousPath != null) {
					      this.targetModel.view().lookup(previousPath, {on:function(targetElem: org.kevoree.modeling.api.KObject<any,any>){
					      if (targetElem != null) {
					        target.mutate(org.kevoree.modeling.api.KActionType.ADD, reference, targetElem, true);
					        callback.on(null);
					      } else {
					        if (metaClass == null) {
					          callback.on(new java.lang.Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
					        } else {
					          this.pendingObj = this.targetModel.view().createFQN(metaClass.metaName());
					          this.pendingObjKID = previousPath;
					          this.pendingParentRef = reference;
					          this.pendingParent = target;
					          callback.on(null);
					        }
					      }
					}});
					    } else {
					      if (metaClass == null) {
					        callback.on(new java.lang.Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
					      } else {
					        this.pendingObj = this.targetModel.view().createFQN(metaClass.metaName());
					        this.pendingObjKID = previousPath;
					        this.pendingParentRef = reference;
					        this.pendingParent = target;
					        callback.on(null);
					      }
					    }
					  }
					
					  public applyTraceSequence(traceSeq: TraceSequence, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    org.kevoree.modeling.api.util.Helper.forall(traceSeq.traces(), {on:function(modelTrace: ModelTrace, next: org.kevoree.modeling.api.Callback<java.lang.Throwable>){
					    this.applyTrace(modelTrace, next);
					}}, {on:function(throwable: java.lang.Throwable){
					    if (throwable != null) {
					      callback.on(throwable);
					    } else {
					      this.tryClosePending(null);
					      callback.on(null);
					    }
					}});
					  }
					
					  public applyTrace(trace: ModelTrace, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    if (trace instanceof ModelAddTrace) {
					      var addTrace: ModelAddTrace = <ModelAddTrace>trace;
					      this.tryClosePending(null);
					      this.targetModel.view().lookup(trace.getSrcKID(), {on:function(resolvedTarget: org.kevoree.modeling.api.KObject<any,any>){
					      if (resolvedTarget == null) {
					        callback.on(new java.lang.Exception("Add Trace source not found for path : " + trace.getSrcKID() + " pending " + this.pendingObjKID + "\n" + trace.toString()));
					      } else {
					        this.createOrAdd(addTrace.getPreviousKID(), resolvedTarget, <org.kevoree.modeling.api.meta.MetaReference>trace.getMeta(), addTrace.getMetaClass(), callback);
					      }
					}});
					    } else {
					      if (trace instanceof ModelRemoveTrace) {
					        var removeTrace: ModelRemoveTrace = <ModelRemoveTrace>trace;
					        this.tryClosePending(trace.getSrcKID());
					        this.targetModel.view().lookup(trace.getSrcKID(), {on:function(targetElem: org.kevoree.modeling.api.KObject<any,any>){
					        if (targetElem != null) {
					          this.targetModel.view().lookup(removeTrace.getObjKID(), {on:function(remoteObj: org.kevoree.modeling.api.KObject<any,any>){
					          targetElem.mutate(org.kevoree.modeling.api.KActionType.REMOVE, <org.kevoree.modeling.api.meta.MetaReference>trace.getMeta(), remoteObj, true);
					          callback.on(null);
					}});
					        } else {
					          callback.on(null);
					        }
					}});
					      } else {
					        if (trace instanceof ModelSetTrace) {
					          var setTrace: ModelSetTrace = <ModelSetTrace>trace;
					          this.tryClosePending(trace.getSrcKID());
					          if (!trace.getSrcKID().equals(this.pendingObjKID)) {
					            this.targetModel.view().lookup(trace.getSrcKID(), {on:function(tempObject: org.kevoree.modeling.api.KObject<any,any>){
					            if (tempObject == null) {
					              callback.on(new java.lang.Exception("Set Trace source not found for path : " + trace.getSrcKID() + " pending " + this.pendingObjKID + "\n" + trace.toString()));
					            } else {
					              tempObject.set(<org.kevoree.modeling.api.meta.MetaAttribute>setTrace.getMeta(), setTrace.getContent());
					              callback.on(null);
					            }
					}});
					          } else {
					            if (this.pendingObj == null) {
					              callback.on(new java.lang.Exception("Set Trace source not found for path : " + trace.getSrcKID() + " pending " + this.pendingObjKID + "\n" + trace.toString()));
					            } else {
					              this.pendingObj.set(<org.kevoree.modeling.api.meta.MetaAttribute>setTrace.getMeta(), setTrace.getContent());
					              callback.on(null);
					            }
					          }
					        } else {
					          callback.on(new java.lang.Exception("Unknow trace " + trace));
					        }
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
					
					}
					
					export class TraceSequence {
					
					  private _traces: java.util.List<ModelTrace> = new java.util.ArrayList<ModelTrace>();
					
					  public traces(): ModelTrace[] {
					    return this._traces.toArray(new Array());
					  }
					
					  public populate(addtraces: java.util.List<ModelTrace>): TraceSequence {
					    this._traces.addAll(addtraces);
					    return this;
					  }
					
					  public append(seq: TraceSequence): TraceSequence {
					    this._traces.addAll(seq._traces);
					    return this;
					  }
					
					  public parse(addtracesTxt: string): TraceSequence {
					    var lexer: org.kevoree.modeling.api.json.Lexer = new org.kevoree.modeling.api.json.Lexer(addtracesTxt);
					    var currentToken: org.kevoree.modeling.api.json.JsonToken = lexer.nextToken();
					    if (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.LEFT_BRACKET) {
					      throw new java.lang.Exception("Bad Format : expect [");
					    }
					    currentToken = lexer.nextToken();
					    var keys: java.util.Map<string, string> = new java.util.HashMap<string, string>();
					    var previousName: string = null;
					    while (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.EOF && currentToken.tokenType() != org.kevoree.modeling.api.json.Type.RIGHT_BRACKET){
					      if (currentToken.tokenType() == org.kevoree.modeling.api.json.Type.LEFT_BRACE) {
					        keys.clear();
					      }
					      if (currentToken.tokenType() == org.kevoree.modeling.api.json.Type.VALUE) {
					        if (previousName != null) {
					          keys.put(previousName, currentToken.value().toString());
					          previousName = null;
					        } else {
					          previousName = currentToken.value().toString();
					        }
					      }
					      if (currentToken.tokenType() == org.kevoree.modeling.api.json.Type.RIGHT_BRACE) {
					        var traceTypeRead: string = keys.get(ModelTraceConstants.traceType.toString());
					        if (traceTypeRead.equals(org.kevoree.modeling.api.KActionType.SET.toString())) {
					          var srcFound: string = keys.get(ModelTraceConstants.src.toString());
					          srcFound = org.kevoree.modeling.api.json.JSONString.unescape(srcFound);
					          this._traces.add(new ModelSetTrace(java.lang.Long.parseLong(srcFound), new org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaAttribute(keys.get(ModelTraceConstants.meta.toString())), org.kevoree.modeling.api.json.JSONString.unescape(keys.get(ModelTraceConstants.content.toString()))));
					        }
					        if (traceTypeRead.equals(org.kevoree.modeling.api.KActionType.ADD.toString())) {
					          var srcFound: string = keys.get(ModelTraceConstants.src.toString());
					          srcFound = org.kevoree.modeling.api.json.JSONString.unescape(srcFound);
					          this._traces.add(new ModelAddTrace(java.lang.Long.parseLong(srcFound), new org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaReference(keys.get(ModelTraceConstants.meta.toString())), java.lang.Long.parseLong(keys.get(ModelTraceConstants.previouspath.toString())), new org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaClass(keys.get(ModelTraceConstants.typename.toString()))));
					        }
					        if (traceTypeRead.equals(org.kevoree.modeling.api.KActionType.REMOVE.toString())) {
					          var srcFound: string = keys.get(ModelTraceConstants.src.toString());
					          srcFound = org.kevoree.modeling.api.json.JSONString.unescape(srcFound);
					          this._traces.add(new ModelRemoveTrace(java.lang.Long.parseLong(srcFound), new org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaReference(keys.get(ModelTraceConstants.meta.toString())), java.lang.Long.parseLong(keys.get(ModelTraceConstants.objpath.toString()))));
					        }
					      }
					      currentToken = lexer.nextToken();
					    }
					    return this;
					  }
					
					  public toString(): string {
					    var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
					    buffer.append("[");
					    var isFirst: boolean = true;
					    for (var i: number = 0; i < this._traces.size(); i++) {
					      var trace: ModelTrace = this._traces.get(i);
					      if (!isFirst) {
					        buffer.append(",\n");
					      }
					      buffer.append(trace);
					      isFirst = false;
					    }
					    buffer.append("]");
					    return buffer.toString();
					  }
					
					  public applyOn(target: org.kevoree.modeling.api.KObject<any,any>, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): boolean {
					    var traceApplicator: ModelTraceApplicator = new ModelTraceApplicator(target);
					    traceApplicator.applyTraceSequence(this, callback);
					    return true;
					  }
					
					  public reverse(): TraceSequence {
					    java.util.Collections.reverse(this._traces);
					    return this;
					  }
					
					}
					export module unresolved {
						
						export class UnresolvedMetaAttribute implements org.kevoree.modeling.api.meta.MetaAttribute {
						
						  private _metaName: string = null;
						
						  constructor(p_metaName: string) {
						    this._metaName = p_metaName;
						  }
						
						  public key(): boolean {
						    return false;
						  }
						
						  public origin(): org.kevoree.modeling.api.meta.MetaClass {
						    return null;
						  }
						
						  public metaType(): org.kevoree.modeling.api.meta.MetaType {
						    return null;
						  }
						
						  public strategy(): org.kevoree.modeling.api.strategy.ExtrapolationStrategy {
						    return null;
						  }
						
						  public precision(): number {
						    return 0;
						  }
						
						  public setExtrapolationStrategy(extrapolationStrategy: org.kevoree.modeling.api.strategy.ExtrapolationStrategy): void {
						  }
						
						  public metaName(): string {
						    return this._metaName;
						  }
						
						  public index(): number {
						    return -1;
						  }
						
						}
						
						export class UnresolvedMetaClass implements org.kevoree.modeling.api.meta.MetaClass {
						
						  private _metaName: string = null;
						
						  constructor(p_metaName: string) {
						    this._metaName = p_metaName;
						  }
						
						  public metaName(): string {
						    return this._metaName;
						  }
						
						  public index(): number {
						    return -1;
						  }
						
						}
						
						export class UnresolvedMetaReference implements org.kevoree.modeling.api.meta.MetaReference {
						
						  private _metaName: string = null;
						
						  constructor(p_metaName: string) {
						    this._metaName = p_metaName;
						  }
						
						  public contained(): boolean {
						    return false;
						  }
						
						  public single(): boolean {
						    return false;
						  }
						
						  public metaType(): org.kevoree.modeling.api.meta.MetaClass {
						    return null;
						  }
						
						  public opposite(): org.kevoree.modeling.api.meta.MetaReference {
						    return null;
						  }
						
						  public origin(): org.kevoree.modeling.api.meta.MetaClass {
						    return null;
						  }
						
						  public metaName(): string {
						    return this._metaName;
						  }
						
						  public index(): number {
						    return -1;
						  }
						
						}
					}
				}
				
				export class TraceRequest {
				
				  public static ATTRIBUTES_ONLY: TraceRequest = new TraceRequest();
				  public static REFERENCES_ONLY: TraceRequest = new TraceRequest();
				  public static ATTRIBUTES_REFERENCES: TraceRequest = new TraceRequest();
				  public equals(other: any): boolean {
				        return this == other;
				    }
				
				}
				export module util {
					
					export interface CallBackChain<A> {
					
					  on(a: A, next: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void;
					
					}
					
					export class Helper {
					
					  public static pathSep: string = '/';
					  private static pathIDOpen: string = '[';
					  private static pathIDClose: string = ']';
					  private static rootPath: string = "/";
					
					  public static forall<A> (inputs: A[], each: CallBackChain<A>, end: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    if (inputs == null) {
					      return;
					    }
					    Helper.process(inputs, 0, each, end);
					  }
					
					  private static process<A> (arr: A[], index: number, each: CallBackChain<A>, end: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    if (index >= arr.length) {
					      if (end != null) {
					        end.on(null);
					      }
					    } else {
					      var obj: A = arr[index];
					      each.on(obj, {on:function(err: java.lang.Throwable){
					      if (err != null) {
					        if (end != null) {
					          end.on(err);
					        }
					      } else {
					        Helper.process(arr, index + 1, each, end);
					      }
					}});
					    }
					  }
					
					  public static parentPath(currentPath: string): string {
					    if (currentPath == null || currentPath.length == 0) {
					      return null;
					    }
					    if (currentPath.length == 1) {
					      return null;
					    }
					    var lastIndex: number = currentPath.lastIndexOf(Helper.pathSep);
					    if (lastIndex != -1) {
					      if (lastIndex == 0) {
					        return Helper.rootPath;
					      } else {
					        return currentPath.substring(0, lastIndex);
					      }
					    } else {
					      return null;
					    }
					  }
					
					  public static attachedToRoot(path: string): boolean {
					    return path.length > 0 && path.charAt(0) == Helper.pathSep;
					  }
					
					  public static isRoot(path: string): boolean {
					    return path.length == 1 && path.charAt(0) == Helper.pathSep;
					  }
					
					  public static path(parent: string, reference: org.kevoree.modeling.api.meta.MetaReference, target: org.kevoree.modeling.api.KObject<any,any>): string {
					    if (Helper.isRoot(parent)) {
					      return Helper.pathSep + reference.metaName() + Helper.pathIDOpen + target.domainKey() + Helper.pathIDClose;
					    } else {
					      return parent + Helper.pathSep + reference.metaName() + Helper.pathIDOpen + target.domainKey() + Helper.pathIDClose;
					    }
					  }
					
					}
				}
				
				export class VisitResult {
				
				  public static CONTINUE: VisitResult = new VisitResult();
				  public static SKIP: VisitResult = new VisitResult();
				  public static STOP: VisitResult = new VisitResult();
				  public equals(other: any): boolean {
				        return this == other;
				    }
				
				}
				export module xmi {
					
					export class AttributesVisitor implements org.kevoree.modeling.api.ModelAttributeVisitor {
					
					  private context: SerializationContext = null;
					
					  constructor(context: SerializationContext) {
					    this.context = context;
					  }
					
					  public visit(metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute, value: any): void {
					    if (value != null) {
					      if (this.context.ignoreGeneratedID && metaAttribute.metaName().equals("generated_KMF_ID")) {
					        return;
					      }
					      this.context.printer.append(" " + metaAttribute.metaName() + "=\"");
					      XMIModelSerializer.escapeXml(this.context.printer, value.toString());
					      this.context.printer.append("\"");
					    }
					  }
					
					}
					
					export class ContainedReferencesCallbackChain implements org.kevoree.modeling.api.util.CallBackChain<org.kevoree.modeling.api.meta.MetaReference> {
					
					  private context: SerializationContext = null;
					  private currentElement: org.kevoree.modeling.api.KObject<any,any> = null;
					
					  constructor(context: SerializationContext, currentElement: org.kevoree.modeling.api.KObject<any,any>) {
					    this.context = context;
					    this.currentElement = currentElement;
					  }
					
					  public on(ref: org.kevoree.modeling.api.meta.MetaReference, nextReference: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    if (ref.contained()) {
					      this.currentElement.each(ref, {on:function(o: any){
					      var elem: org.kevoree.modeling.api.KObject<any,any> = <org.kevoree.modeling.api.KObject<any,any>>o;
					      this.context.printer.append("<");
					      this.context.printer.append(ref.metaName());
					      this.context.printer.append(" xsi:type=\"" + XMIModelSerializer.formatMetaClassName(elem.metaClass().metaName()) + "\"");
					      elem.visitAttributes(this.context.attributesVisitor);
					      org.kevoree.modeling.api.util.Helper.forall(elem.metaReferences(), new NonContainedReferencesCallbackChain(this.context, elem), {on:function(err: java.lang.Throwable){
					      if (err == null) {
					        this.context.printer.append(">\n");
					        org.kevoree.modeling.api.util.Helper.forall(elem.metaReferences(), new ContainedReferencesCallbackChain(this.context, elem), {on:function(containedRefsEnd: java.lang.Throwable){
					        if (containedRefsEnd == null) {
					          this.context.printer.append("</");
					          this.context.printer.append(ref.metaName());
					          this.context.printer.append('>');
					          this.context.printer.append("\n");
					        }
					}});
					      } else {
					        this.context.finishCallback.on(null, err);
					      }
					}});
					}}, {on:function(throwable: java.lang.Throwable){
					      nextReference.on(null);
					}});
					    } else {
					      nextReference.on(null);
					    }
					  }
					
					}
					
					export class NonContainedReferencesCallbackChain implements org.kevoree.modeling.api.util.CallBackChain<org.kevoree.modeling.api.meta.MetaReference> {
					
					  private _context: SerializationContext = null;
					  private _currentElement: org.kevoree.modeling.api.KObject<any,any> = null;
					
					  constructor(p_context: SerializationContext, p_currentElement: org.kevoree.modeling.api.KObject<any,any>) {
					    this._context = p_context;
					    this._currentElement = p_currentElement;
					  }
					
					  public on(ref: org.kevoree.modeling.api.meta.MetaReference, next: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    if (!ref.contained()) {
					      var value: string[] = new Array();
					      value[0] = "";
					      this._currentElement.each(ref, {on:function(o: any){
					      var adjustedAddress: string = this._context.addressTable.get((<org.kevoree.modeling.api.KObject<any,any>>o).uuid());
					      value[0] = (value[0].equals("") ? adjustedAddress : value[0] + " " + adjustedAddress);
					}}, {on:function(end: java.lang.Throwable){
					      if (end == null) {
					        if (value[0] != null) {
					          this._context.printer.append(" " + ref.metaName() + "=\"" + value[0] + "\"");
					        }
					      }
					      next.on(end);
					}});
					    } else {
					      next.on(null);
					    }
					  }
					
					}
					
					export class PrettyPrinter implements org.kevoree.modeling.api.Callback<java.lang.Throwable> {
					
					  private context: SerializationContext = null;
					
					  constructor(context: SerializationContext) {
					    this.context = context;
					  }
					
					  public on(throwable: java.lang.Throwable): void {
					    if (throwable != null) {
					      this.context.finishCallback.on(null, throwable);
					    } else {
					      this.context.printer.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
					      this.context.printer.append("<" + XMIModelSerializer.formatMetaClassName(this.context.model.metaClass().metaName()).replace(".", "_"));
					      this.context.printer.append(" xmlns:xsi=\"http://wwww.w3.org/2001/XMLSchema-instance\"");
					      this.context.printer.append(" xmi:version=\"2.0\"");
					      this.context.printer.append(" xmlns:xmi=\"http://www.omg.org/XMI\"");
					      var index: number = 0;
					      while (index < this.context.packageList.size()){
					        this.context.printer.append(" xmlns:" + this.context.packageList.get(index).replace(".", "_") + "=\"http://" + this.context.packageList.get(index) + "\"");
					        index++;
					      }
					      this.context.model.visitAttributes(this.context.attributesVisitor);
					      org.kevoree.modeling.api.util.Helper.forall(this.context.model.metaReferences(), new NonContainedReferencesCallbackChain(this.context, this.context.model), {on:function(err: java.lang.Throwable){
					      if (err == null) {
					        this.context.printer.append(">\n");
					        org.kevoree.modeling.api.util.Helper.forall(this.context.model.metaReferences(), new ContainedReferencesCallbackChain(this.context, this.context.model), {on:function(containedRefsEnd: java.lang.Throwable){
					        if (containedRefsEnd == null) {
					          this.context.printer.append("</" + XMIModelSerializer.formatMetaClassName(this.context.model.metaClass().metaName()).replace(".", "_") + ">\n");
					          this.context.finishCallback.on(this.context.printer.toString(), null);
					        } else {
					          this.context.finishCallback.on(null, containedRefsEnd);
					        }
					}});
					      } else {
					        this.context.finishCallback.on(null, err);
					      }
					}});
					    }
					  }
					
					}
					
					export class SerializationContext {
					
					  public ignoreGeneratedID: boolean = false;
					  public model: org.kevoree.modeling.api.KObject<any,any> = null;
					  public finishCallback: org.kevoree.modeling.api.ThrowableCallback<string> = null;
					  public printer: java.lang.StringBuilder = null;
					  public attributesVisitor: AttributesVisitor = null;
					  public addressTable: java.util.HashMap<number, string> = new java.util.HashMap<number, string>();
					  public elementsCount: java.util.HashMap<string, number> = new java.util.HashMap<string, number>();
					  public packageList: java.util.ArrayList<string> = new java.util.ArrayList<string>();
					
					}
					
					export class XMILoadingContext {
					
					  public xmiReader: XmlParser = null;
					  public loadedRoots: org.kevoree.modeling.api.KObject<any,any> = null;
					  public resolvers: java.util.ArrayList<XMIResolveCommand> = new java.util.ArrayList<XMIResolveCommand>();
					  public map: java.util.HashMap<string, org.kevoree.modeling.api.KObject<any,any>> = new java.util.HashMap<string, org.kevoree.modeling.api.KObject<any,any>>();
					  public elementsCount: java.util.HashMap<string, number> = new java.util.HashMap<string, number>();
					  public stats: java.util.HashMap<string, number> = new java.util.HashMap<string, number>();
					  public oppositesAlreadySet: java.util.HashMap<string, boolean> = new java.util.HashMap<string, boolean>();
					  public successCallback: org.kevoree.modeling.api.Callback<java.lang.Throwable> = null;
					
					  public isOppositeAlreadySet(localRef: string, oppositeRef: string): boolean {
					    return (this.oppositesAlreadySet.get(oppositeRef + "_" + localRef) != null || (this.oppositesAlreadySet.get(localRef + "_" + oppositeRef) != null));
					  }
					
					  public storeOppositeRelation(localRef: string, oppositeRef: string): void {
					    this.oppositesAlreadySet.put(localRef + "_" + oppositeRef, true);
					  }
					
					}
					
					export class XMIModelLoader implements org.kevoree.modeling.api.ModelLoader {
					
					  private _factory: org.kevoree.modeling.api.KView = null;
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
					
					  public load(str: string, callback: org.kevoree.modeling.api.Callback<java.lang.Throwable>): void {
					    var parser: XmlParser = new XmlParser(str);
					    if (!parser.hasNext()) {
					      callback.on(null);
					    } else {
					      var context: XMILoadingContext = new XMILoadingContext();
					      context.successCallback = callback;
					      context.xmiReader = parser;
					      this.deserialize(context);
					    }
					  }
					
					  private deserialize(context: XMILoadingContext): void {
					    try {
					      var nsURI: string;
					      var reader: XmlParser = context.xmiReader;
					      while (reader.hasNext()){
					        var nextTag: XmlToken = reader.next();
					        if (nextTag.equals(XmlToken.START_TAG)) {
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
					            context.loadedRoots = this.loadObject(context, "/", xsiType + "." + localName);
					          }
					        }
					      }
					      for (var i: number = 0; i < context.resolvers.size(); i++) {
					        context.resolvers.get(i).run();
					      }
					      this._factory.setRoot(context.loadedRoots);
					      context.successCallback.on(null);
					    } catch ($ex$) {
					      if ($ex$ instanceof java.lang.Exception) {
					        var e: java.lang.Exception = <java.lang.Exception>$ex$;
					        context.successCallback.on(e);
					      }
					     }
					  }
					
					  private callFactory(ctx: XMILoadingContext, objectType: string): org.kevoree.modeling.api.KObject<any,any> {
					    var modelElem: org.kevoree.modeling.api.KObject<any,any> = null;
					    if (objectType != null) {
					      modelElem = this._factory.createFQN(objectType);
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
					          modelElem = this._factory.createFQN(realTypeName + "." + realName);
					        }
					      }
					    } else {
					      modelElem = this._factory.createFQN(ctx.xmiReader.getLocalName());
					    }
					    return modelElem;
					  }
					
					  private loadObject(ctx: XMILoadingContext, xmiAddress: string, objectType: string): org.kevoree.modeling.api.KObject<any,any> {
					    var elementTagName: string = ctx.xmiReader.getLocalName();
					    var modelElem: org.kevoree.modeling.api.KObject<any,any> = this.callFactory(ctx, objectType);
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
					          var kAttribute: org.kevoree.modeling.api.meta.MetaAttribute = modelElem.metaAttribute(attrName);
					          if (kAttribute != null) {
					            modelElem.set(kAttribute, XMIModelLoader.unescapeXml(valueAtt));
					          } else {
					            var kreference: org.kevoree.modeling.api.meta.MetaReference = modelElem.metaReference(attrName);
					            if (kreference != null) {
					              var referenceArray: string[] = valueAtt.split(" ");
					              for (var j: number = 0; j < referenceArray.length; j++) {
					                var xmiRef: string = referenceArray[j];
					                var adjustedRef: string = (xmiRef.startsWith("#") ? xmiRef.substring(1) : xmiRef);
					                adjustedRef = adjustedRef.replace(".0", "");
					                var ref: org.kevoree.modeling.api.KObject<any,any> = ctx.map.get(adjustedRef);
					                if (ref != null) {
					                  modelElem.mutate(org.kevoree.modeling.api.KActionType.ADD, kreference, ref, true);
					                } else {
					                  ctx.resolvers.add(new XMIResolveCommand(ctx, modelElem, org.kevoree.modeling.api.KActionType.ADD, attrName, adjustedRef));
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
					        var tok: XmlToken = ctx.xmiReader.next();
					        if (tok.equals(XmlToken.START_TAG)) {
					          var subElemName: string = ctx.xmiReader.getLocalName();
					          var key: string = xmiAddress + "/@" + subElemName;
					          var i: number = ctx.elementsCount.get(key);
					          if (i == null) {
					            i = 0;
					            ctx.elementsCount.put(key, i);
					          }
					          var subElementId: string = xmiAddress + "/@" + subElemName + (i != 0 ? "." + i : "");
					          var containedElement: org.kevoree.modeling.api.KObject<any,any> = this.loadObject(ctx, subElementId, subElemName);
					          modelElem.mutate(org.kevoree.modeling.api.KActionType.ADD, modelElem.metaReference(subElemName), containedElement, true);
					          ctx.elementsCount.put(xmiAddress + "/@" + subElemName, i + 1);
					        } else {
					          if (tok.equals(XmlToken.END_TAG)) {
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
					
					export class XMIModelSerializer implements org.kevoree.modeling.api.ModelSerializer {
					
					  public serialize(model: org.kevoree.modeling.api.KObject<any,any>, callback: org.kevoree.modeling.api.ThrowableCallback<string>): void {
					    var context: SerializationContext = new SerializationContext();
					    context.model = model;
					    context.finishCallback = callback;
					    context.attributesVisitor = new AttributesVisitor(context);
					    context.printer = new java.lang.StringBuilder();
					    context.addressTable.put(model.uuid(), "/");
					    model.treeVisit({visit:function(elem: org.kevoree.modeling.api.KObject<any,any>){
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
					}}, new PrettyPrinter(context));
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
					
					}
					
					export class XMIResolveCommand {
					
					  private context: XMILoadingContext = null;
					  private target: org.kevoree.modeling.api.KObject<any,any> = null;
					  private mutatorType: org.kevoree.modeling.api.KActionType = null;
					  private refName: string = null;
					  private ref: string = null;
					
					  constructor(context: XMILoadingContext, target: org.kevoree.modeling.api.KObject<any,any>, mutatorType: org.kevoree.modeling.api.KActionType, refName: string, ref: string) {
					    this.context = context;
					    this.target = target;
					    this.mutatorType = mutatorType;
					    this.refName = refName;
					    this.ref = ref;
					  }
					
					  public run(): void {
					    var referencedElement: org.kevoree.modeling.api.KObject<any,any> = this.context.map.get(this.ref);
					    if (referencedElement != null) {
					      this.target.mutate(this.mutatorType, this.target.metaReference(this.refName), referencedElement, true);
					      return;
					    }
					    referencedElement = this.context.map.get("/");
					    if (referencedElement != null) {
					      this.target.mutate(this.mutatorType, this.target.metaReference(this.refName), referencedElement, true);
					      return;
					    }
					    throw new java.lang.Exception("KMF Load error : reference " + this.ref + " not found in map when trying to  " + this.mutatorType + " " + this.refName + "  on " + this.target.metaClass().metaName() + "(uuid:" + this.target.uuid() + ")");
					  }
					
					}
					
					export class XmlParser {
					
					  private payload: string = null;
					  private current: number = 0;
					  private currentChar: string = null;
					  private tagName: string = null;
					  private tagPrefix: string = null;
					  private attributePrefix: string = null;
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
					
					  public next(): XmlToken {
					    if (this.readSingleton) {
					      this.readSingleton = false;
					      return XmlToken.END_TAG;
					    }
					    if (!this.hasNext()) {
					      return XmlToken.END_DOCUMENT;
					    }
					    this.attributesNames.clear();
					    this.attributesPrefixes.clear();
					    this.attributesValues.clear();
					    this.read_lessThan();
					    this.currentChar = this.readChar();
					    if (this.currentChar == '?') {
					      this.currentChar = this.readChar();
					      this.read_xmlHeader();
					      return XmlToken.XML_HEADER;
					    } else {
					      if (this.currentChar == '!') {
					        do {
					          this.currentChar = this.readChar();
					        } while (this.currentChar != '>')
					        return XmlToken.COMMENT;
					      } else {
					        if (this.currentChar == '/') {
					          this.currentChar = this.readChar();
					          this.read_closingTag();
					          return XmlToken.END_TAG;
					        } else {
					          this.read_openTag();
					          if (this.currentChar == '/') {
					            this.read_upperThan();
					            this.readSingleton = true;
					          }
					          return XmlToken.START_TAG;
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
					
					}
				}
			}
		}
	}
}
