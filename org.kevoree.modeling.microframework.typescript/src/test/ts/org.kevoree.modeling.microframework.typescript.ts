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
    longValue() : number;
    floatValue() : number;
    intValue() : number;
    shortValue() : number;
}

Number.prototype.equals = function (other) {
    return this == other;
};

interface String {
    equals : (other:String) => boolean;
    startsWith : (other:String) => boolean;
    endsWith : (other:String) => boolean;
    matches :  (regEx:String) => boolean;
    //getBytes : () => number[];
    isEmpty : () => boolean;
}

/*
String.prototype.getBytes = function () {
    var res:number[] = new Number[this.length];
    for (var i = 0; i < this.length; i++) {
        res[i] = Number(this.charAt(i));
    }
    return res;
};
*/

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
                return +val;
            }
        }

        export class Float {
            public static parseFloat(val:string):number {
                return +val;
            }
        }

        export class Integer {
            public static parseInt(val:string):number {
                return +val;
            }
        }

        export class Long {
            public static parseLong(val:string):number {
                return +val;
            }
        }

        export class Short {
            public static parseShort(val:string):number {
                return +val;
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
          export class AbstractKDimension<A extends org.kevoree.modeling.api.KView, B extends org.kevoree.modeling.api.KDimension<any, any, any>, C extends org.kevoree.modeling.api.KUniverse<any>> implements org.kevoree.modeling.api.KDimension<any, any, any> {

            private _universe: org.kevoree.modeling.api.KUniverse<any>;
            private _key: number;
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

            public save(callback: (a : java.lang.Throwable) => void): void {
              this.universe().storage().save(this, callback);
            }

            public saveUnload(callback: (a : java.lang.Throwable) => void): void {
              this.universe().storage().saveUnload(this, callback);
            }

            public delete(callback: (a : java.lang.Throwable) => void): void {
              this.universe().storage().delete(this, callback);
            }

            public discard(callback: (a : java.lang.Throwable) => void): void {
              this.universe().storage().discard(this, callback);
            }

            public timeTrees(keys: number[], callback: (a : org.kevoree.modeling.api.time.TimeTree[]) => void): void {
              this.universe().storage().timeTrees(this, keys, callback);
            }

            public timeTree(key: number, callback: (a : org.kevoree.modeling.api.time.TimeTree) => void): void {
              this.universe().storage().timeTree(this, key, callback);
            }

            public parent(callback: (a : B) => void): void {
            }

            public children(callback: (a : B[]) => void): void {
            }

            public fork(callback: (a : B) => void): void {
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

            public listen(listener: (evt : org.kevoree.modeling.api.KEvent) => void): void {
              this.universe().storage().registerListener(this, listener);
            }

            public internal_create(timePoint: number): A {
              throw "Abstract method";
            }

          }

          export class AbstractKObject<A extends org.kevoree.modeling.api.KObject<any, any>, B extends org.kevoree.modeling.api.KView> implements org.kevoree.modeling.api.KObject<any, any> {

            public static PARENT_INDEX: number = 0;
            public static INBOUNDS_INDEX: number = 1;
            private _isDirty: boolean = false;
            private _view: B;
            private _metaClass: org.kevoree.modeling.api.meta.MetaClass;
            private _uuid: number;
            private _isDeleted: boolean = false;
            private _isRoot: boolean = false;
            private _now: number;
            private _timeTree: org.kevoree.modeling.api.time.TimeTree;
            private _referenceInParent: org.kevoree.modeling.api.meta.MetaReference = null;
            private _dimension: org.kevoree.modeling.api.KDimension<any, any, any>;
            constructor(p_view: B, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_uuid: number, p_now: number, p_dimension: org.kevoree.modeling.api.KDimension<any, any, any>, p_timeTree: org.kevoree.modeling.api.time.TimeTree) {
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

            public dimension(): org.kevoree.modeling.api.KDimension<any, any, any> {
              return this._dimension;
            }

            public path(callback: (a : string) => void): void {
              if (this._isRoot) {
                callback("/");
              } else {
                this.parent(                 (parent : org.kevoree.modeling.api.KObject<any, any>) => {
                if (parent == null) {
                  callback(null);
                } else {
                  parent.path(                   (parentPath : string) => {
                  callback(org.kevoree.modeling.api.util.Helper.path(parentPath, this._referenceInParent, this));
                  }
);
                }
                }
);
              }
            }

            public parentUuid(): number {
              return <number>this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ)[AbstractKObject.PARENT_INDEX];
            }

            public setParentUuid(parentKID: number): void {
              this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE)[AbstractKObject.PARENT_INDEX] = parentKID;
            }

            public parent(callback: (a : org.kevoree.modeling.api.KObject<any, any>) => void): void {
              var parentKID: number = this.parentUuid();
              if (parentKID == null) {
                callback(null);
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

            public delete(callback: (a : boolean) => void): void {
            }

            public select(query: string, callback: (a : org.kevoree.modeling.api.KObject<any, any>[]) => void): void {
              org.kevoree.modeling.api.select.KSelector.select(this, query, callback);
            }

            public stream(query: string, callback: (a : org.kevoree.modeling.api.KObject<any, any>) => void): void {
            }

            public listen(listener: (evt : org.kevoree.modeling.api.KEvent) => void): void {
              this.view().dimension().universe().storage().registerListener(this, listener);
            }

            public jump(time: number, callback: (a : A) => void): void {
              this.view().dimension().time(time).lookup(this._uuid,                (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
              callback(<A>kObject);
              }
);
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

            private cachedDependencies(attribute: org.kevoree.modeling.api.meta.MetaAttribute): org.kevoree.modeling.api.KObject<any, any>[] {
              var timedDependencies: number[] = attribute.strategy().timedDependencies(this);
              var cachedObjs: org.kevoree.modeling.api.KObject<any, any>[] = new Array();
              for (var i: number = 0; i < timedDependencies.length; i++) {
                if (timedDependencies[i] == this.now()) {
                  cachedObjs[i] = this;
                } else {
                  cachedObjs[i] = this.view().dimension().universe().storage().cacheLookup(this.dimension(), timedDependencies[i], this.uuid());
                }
              }
              return cachedObjs;
            }

            private getCreateOrUpdatePayloadList(obj: org.kevoree.modeling.api.KObject<any, any>, payloadIndex: number): any {
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

            private removeFromContainer(param: org.kevoree.modeling.api.KObject<any, any>): void {
              if (param != null && param.parentUuid() != null && param.parentUuid() != this._uuid) {
                this.view().lookup(param.parentUuid(),                  (parent : org.kevoree.modeling.api.KObject<any, any>) => {
                parent.mutate(org.kevoree.modeling.api.KActionType.REMOVE, param.referenceInParent(), param, true);
                }
);
              }
            }

            public mutate(actionType: org.kevoree.modeling.api.KActionType, metaReference: org.kevoree.modeling.api.meta.MetaReference, param: org.kevoree.modeling.api.KObject<any, any>, setOpposite: boolean): void {
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
                    (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>param).set_referenceInParent(metaReference);
                    (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>param).setParentUuid(this._uuid);
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
                        (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>param).set_referenceInParent(metaReference);
                        (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>param).setParentUuid(this._uuid);
                      }
                      var inboundRefs: java.util.Map<number, number> = <java.util.Map<number, number>>this.getCreateOrUpdatePayloadList(param, AbstractKObject.INBOUNDS_INDEX);
                      inboundRefs.put(this.uuid(), metaReference.index());
                      var self: org.kevoree.modeling.api.KObject<any, any> = this;
                      if (metaReference.opposite() != null && setOpposite) {
                        if (previous != null) {
                          this.view().lookup(<number>previous,                            (resolved : org.kevoree.modeling.api.KObject<any, any>) => {
                          resolved.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), self, false);
                          }
);
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
                        var self: org.kevoree.modeling.api.KObject<any, any> = this;
                        this._view.dimension().universe().storage().lookup(this._view, <number>previousKid,                          (resolvedParam : org.kevoree.modeling.api.KObject<any, any>) => {
                        if (resolvedParam != null) {
                          if (metaReference.contained()) {
                            (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>resolvedParam).set_referenceInParent(null);
                            (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>resolvedParam).setParentUuid(null);
                          }
                          if (metaReference.opposite() != null && setOpposite) {
                            resolvedParam.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), self, false);
                          }
                          var inboundRefs: java.util.Map<number, number> = <java.util.Map<number, number>>this.getCreateOrUpdatePayloadList(resolvedParam, AbstractKObject.INBOUNDS_INDEX);
                          inboundRefs.remove(this.uuid());
                        }
                        }
);
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
                          (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>param).set_referenceInParent(null);
                          (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>param).setParentUuid(null);
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

            public each<C extends org.kevoree.modeling.api.KObject<any, any>> (metaReference: org.kevoree.modeling.api.meta.MetaReference, callback: (a : C) => void, end: (a : java.lang.Throwable) => void): void {
              var o: any = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ)[metaReference.index()];
              if (o == null) {
                if (end != null) {
                  end(null);
                } else {
                  callback(null);
                }
              } else {
                if (o instanceof java.util.Set) {
                  var objs: java.util.Set<number> = <java.util.Set<number>>o;
                  this.view().lookupAll(objs.toArray(new Array()),                    (result : org.kevoree.modeling.api.KObject<any, any>[]) => {
                  var endAlreadyCalled: boolean = false;
                  try {
                    for (var l: number = 0; l < result.length; l++) {
                      callback(<C>result[l]);
                    }
                    endAlreadyCalled = true;
                    end(null);
                  } catch ($ex$) {
                    if ($ex$ instanceof java.lang.Throwable) {
                      var t: java.lang.Throwable = <java.lang.Throwable>$ex$;
                      if (!endAlreadyCalled) {
                        end(t);
                      }
                    }
                   }
                  }
);
                } else {
                  this.view().lookup(<number>o,                    (resolved : org.kevoree.modeling.api.KObject<any, any>) => {
                  if (callback != null) {
                    callback(<C>resolved);
                  }
                  if (end != null) {
                    end(null);
                  }
                  }
);
                }
              }
            }

            public visitAttributes(visitor: (metaAttribute : org.kevoree.modeling.api.meta.MetaAttribute, value : any) => void): void {
              var metaAttributes: org.kevoree.modeling.api.meta.MetaAttribute[] = this.metaAttributes();
              for (var i: number = 0; i < metaAttributes.length; i++) {
                visitor(metaAttributes[i], this.get(metaAttributes[i]));
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

            public visit(visitor: (elem : org.kevoree.modeling.api.KObject<any, any>) => org.kevoree.modeling.api.VisitResult, end: (a : java.lang.Throwable) => void): void {
              this.internal_visit(visitor, end, false, false, null);
            }

            private internal_visit(visitor: (elem : org.kevoree.modeling.api.KObject<any, any>) => org.kevoree.modeling.api.VisitResult, end: (a : java.lang.Throwable) => void, deep: boolean, treeOnly: boolean, alreadyVisited: java.util.HashSet<number>): void {
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
                end(null);
              } else {
                this.view().lookupAll(toResolveds.toArray(new Array()),                  (resolveds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                var nextDeep: java.util.List<org.kevoree.modeling.api.KObject<any, any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>>();
                for (var i: number = 0; i < resolveds.length; i++) {
                  var resolved: org.kevoree.modeling.api.KObject<any, any> = resolveds[i];
                  var result: org.kevoree.modeling.api.VisitResult = visitor(resolved);
                  if (result.equals(org.kevoree.modeling.api.VisitResult.STOP)) {
                    end(null);
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
                  var next: java.util.List<(a : java.lang.Throwable) => void> = new java.util.ArrayList<(a : java.lang.Throwable) => void>();
                  next.add(                   (throwable : java.lang.Throwable) => {
                  ii[0] = ii[0] + 1;
                  if (ii[0] == nextDeep.size()) {
                    end(null);
                  } else {
                    if (treeOnly) {
                      nextDeep.get(ii[0]).treeVisit(visitor, next.get(0));
                    } else {
                      nextDeep.get(ii[0]).graphVisit(visitor, next.get(0));
                    }
                  }
                  }
);
                  if (treeOnly) {
                    nextDeep.get(ii[0]).treeVisit(visitor, next.get(0));
                  } else {
                    nextDeep.get(ii[0]).graphVisit(visitor, next.get(0));
                  }
                } else {
                  end(null);
                }
                }
);
              }
            }

            public graphVisit(visitor: (elem : org.kevoree.modeling.api.KObject<any, any>) => org.kevoree.modeling.api.VisitResult, end: (a : java.lang.Throwable) => void): void {
              this.internal_visit(visitor, end, true, false, new java.util.HashSet<number>());
            }

            public treeVisit(visitor: (elem : org.kevoree.modeling.api.KObject<any, any>) => org.kevoree.modeling.api.VisitResult, end: (a : java.lang.Throwable) => void): void {
              this.internal_visit(visitor, end, true, true, null);
            }

            public toJSON(): string {
              var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
              builder.append("{\n");
              builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META + "\" : \"");
              builder.append(this.metaClass().metaName());
              builder.append("\",\n");
              builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID + "\" : \"");
              builder.append(this.uuid());
              if (this.isRoot()) {
                builder.append("\",\n");
                builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_ROOT + "\" : \"");
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

            public inbounds(callback: (a : org.kevoree.modeling.api.InboundReference) => void, end: (a : java.lang.Throwable) => void): void {
              var rawPayload: any[] = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
              if (rawPayload == null) {
                end(new java.lang.Exception("Object not initialized."));
              } else {
                var payload: any = rawPayload[AbstractKObject.INBOUNDS_INDEX];
                if (payload != null) {
                  if (payload instanceof java.util.Map) {
                    var refs: java.util.Map<number, number> = <java.util.Map<number, number>>payload;
                    var oppositeKids: java.util.Set<number> = new java.util.HashSet<number>();
                    oppositeKids.addAll(refs.keySet());
                    this._view.lookupAll(oppositeKids.toArray(new Array()),                      (oppositeElements : org.kevoree.modeling.api.KObject<any, any>[]) => {
                    if (oppositeElements != null) {
                      for (var k: number = 0; k < oppositeElements.length; k++) {
                        var opposite: org.kevoree.modeling.api.KObject<any, any> = oppositeElements[k];
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
                            callback(reference);
                          } catch ($ex$) {
                            if ($ex$ instanceof java.lang.Throwable) {
                              var t: java.lang.Throwable = <java.lang.Throwable>$ex$;
                              end(t);
                            }
                           }
                        } else {
                          end(new java.lang.Exception("MetaReference not found with index:" + inboundRef + " in refs of " + opposite.metaClass().metaName()));
                        }
                      }
                      end(null);
                    } else {
                      end(new java.lang.Exception("Could not resolve opposite objects"));
                    }
                    }
);
                  } else {
                    end(new java.lang.Exception("Inbound refs payload is not a cset"));
                  }
                } else {
                  end(null);
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

          export class AbstractKUniverse<A extends org.kevoree.modeling.api.KDimension<any, any, any>> implements org.kevoree.modeling.api.KUniverse<any> {

            private _storage: org.kevoree.modeling.api.data.KStore;
            constructor(kDataBase: org.kevoree.modeling.api.data.KDataBase) {
              this._storage = new org.kevoree.modeling.api.data.DefaultKStore(kDataBase);
            }

            public storage(): org.kevoree.modeling.api.data.KStore {
              return this._storage;
            }

            public newDimension(callback: (a : A) => void): void {
              var nextKey: number = this._storage.nextDimensionKey();
              var newDimension: A = this.internal_create(nextKey);
              this.storage().initDimension(newDimension,                (throwable : java.lang.Throwable) => {
              callback(newDimension);
              }
);
            }

            public internal_create(key: number): A {
              throw "Abstract method";
            }

            public dimension(key: number, callback: (a : A) => void): void {
              var existingDimension: A = <A>this._storage.getDimension(key);
              if (existingDimension != null) {
                callback(existingDimension);
              } else {
                var newDimension: A = this.internal_create(key);
                this.storage().initDimension(newDimension,                  (throwable : java.lang.Throwable) => {
                callback(newDimension);
                }
);
              }
            }

            public saveAll(callback: (a : boolean) => void): void {
            }

            public deleteAll(callback: (a : boolean) => void): void {
            }

            public unloadAll(callback: (a : boolean) => void): void {
            }

            public disable(listener: (evt : org.kevoree.modeling.api.KEvent) => void): void {
            }

            public stream(query: string, callback: (a : org.kevoree.modeling.api.KObject<any, any>) => void): void {
            }

            public listen(listener: (evt : org.kevoree.modeling.api.KEvent) => void): void {
              this.storage().registerListener(this, listener);
            }

          }

          export class AbstractKView implements org.kevoree.modeling.api.KView {

            private _now: number;
            private _dimension: org.kevoree.modeling.api.KDimension<any, any, any>;
            constructor(p_now: number, p_dimension: org.kevoree.modeling.api.KDimension<any, any, any>) {
              this._now = p_now;
              this._dimension = p_dimension;
            }

            public now(): number {
              return this._now;
            }

            public dimension(): org.kevoree.modeling.api.KDimension<any, any, any> {
              return this._dimension;
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

            public createFQN(metaClassName: string): org.kevoree.modeling.api.KObject<any, any> {
              return this.create(this.metaClass(metaClassName));
            }

            public manageCache(obj: org.kevoree.modeling.api.KObject<any, any>): org.kevoree.modeling.api.KObject<any, any> {
              this.dimension().universe().storage().initKObject(obj, this);
              return obj;
            }

            public setRoot(elem: org.kevoree.modeling.api.KObject<any, any>): void {
              (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>elem).set_referenceInParent(null);
              (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>elem).setRoot(true);
              this.dimension().universe().storage().setRoot(elem);
            }

            public select(query: string, callback: (a : org.kevoree.modeling.api.KObject<any, any>[]) => void): void {
              this.dimension().universe().storage().getRoot(this,                (rootObj : org.kevoree.modeling.api.KObject<any, any>) => {
              var cleanedQuery: string = query;
              if (cleanedQuery.equals("/")) {
                var res: java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>>();
                if (rootObj != null) {
                  res.add(rootObj);
                }
                callback(res.toArray(new Array()));
              } else {
                if (cleanedQuery.startsWith("/")) {
                  cleanedQuery = cleanedQuery.substring(1);
                }
                org.kevoree.modeling.api.select.KSelector.select(rootObj, cleanedQuery, callback);
              }
              }
);
            }

            public lookup(kid: number, callback: (a : org.kevoree.modeling.api.KObject<any, any>) => void): void {
              this.dimension().universe().storage().lookup(this, kid, callback);
            }

            public lookupAll(keys: number[], callback: (a : org.kevoree.modeling.api.KObject<any, any>[]) => void): void {
              this.dimension().universe().storage().lookupAll(this, keys, callback);
            }

            public stream(query: string, callback: (a : org.kevoree.modeling.api.KObject<any, any>) => void): void {
            }

            public createProxy(clazz: org.kevoree.modeling.api.meta.MetaClass, timeTree: org.kevoree.modeling.api.time.TimeTree, key: number): org.kevoree.modeling.api.KObject<any, any> {
              return this.internalCreate(clazz, timeTree, key);
            }

            public create(clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject<any, any> {
              var newObj: org.kevoree.modeling.api.KObject<any, any> = this.internalCreate(clazz, new org.kevoree.modeling.api.time.DefaultTimeTree().insert(this.now()), this.dimension().universe().storage().nextObjectKey());
              if (newObj != null) {
                this.dimension().universe().storage().notify(new org.kevoree.modeling.api.event.DefaultKEvent(org.kevoree.modeling.api.KActionType.NEW, null, newObj, null, newObj));
              }
              return newObj;
            }

            public listen(listener: (evt : org.kevoree.modeling.api.KEvent) => void): void {
              this.dimension().universe().storage().registerListener(this, listener);
            }

            public internalCreate(clazz: org.kevoree.modeling.api.meta.MetaClass, timeTree: org.kevoree.modeling.api.time.TimeTree, key: number): org.kevoree.modeling.api.KObject<any, any> {
              throw "Abstract method";
            }

            public metaClasses(): org.kevoree.modeling.api.meta.MetaClass[] {
              throw "Abstract method";
            }

            public diff(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (a : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
              org.kevoree.modeling.api.operation.DefaultModelCompare.diff(origin, target, callback);
            }

            public merge(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (a : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
              org.kevoree.modeling.api.operation.DefaultModelCompare.merge(origin, target, callback);
            }

            public intersection(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (a : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
              org.kevoree.modeling.api.operation.DefaultModelCompare.intersection(origin, target, callback);
            }

            public slice(elems: java.util.List<org.kevoree.modeling.api.KObject<any, any>>, callback: (a : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
              org.kevoree.modeling.api.operation.DefaultModelSlicer.slice(elems, callback);
            }

            public clone<A extends org.kevoree.modeling.api.KObject<any, any>> (o: A, callback: (a : A) => void): void {
              org.kevoree.modeling.api.operation.DefaultModelCloner.clone(o, callback);
            }

            public json(): org.kevoree.modeling.api.ModelFormat {
              return new org.kevoree.modeling.api.json.JsonFormat(this);
            }

            public xmi(): org.kevoree.modeling.api.ModelFormat {
              return new org.kevoree.modeling.api.xmi.XmiFormat(this);
            }

          }

        }
        export interface Callback<A> {

          on(a: A): void;

        }

        export module data {
          export class AccessMode {

            public static READ: AccessMode = new AccessMode();
            public static WRITE: AccessMode = new AccessMode();
            public equals(other: any): boolean {
              return this == other;
            }
            public static _AccessModeVALUES : AccessMode[] = [
              AccessMode.READ
              ,AccessMode.WRITE
            ];
            public static values():AccessMode[]{
              return AccessMode._AccessModeVALUES;
            }
          }

          export module cache {
            export class DimensionCache {

              public timeTreeCache: java.util.Map<number, org.kevoree.modeling.api.time.TimeTree> = new java.util.HashMap<number, org.kevoree.modeling.api.time.TimeTree>();
              public timesCaches: java.util.Map<number, org.kevoree.modeling.api.data.cache.TimeCache> = new java.util.HashMap<number, org.kevoree.modeling.api.data.cache.TimeCache>();
              public dimension: org.kevoree.modeling.api.KDimension<any, any, any>;
              public rootTimeTree: org.kevoree.modeling.api.time.TimeTree = new org.kevoree.modeling.api.time.DefaultTimeTree();
              public listeners: java.util.List<(evt : org.kevoree.modeling.api.KEvent) => void> = new java.util.ArrayList<(evt : org.kevoree.modeling.api.KEvent) => void>();
              constructor(dimension: org.kevoree.modeling.api.KDimension<any, any, any>) {
                this.dimension = dimension;
              }

            }

            export class TimeCache {

              public obj_cache: java.util.Map<number, org.kevoree.modeling.api.KObject<any, any>> = new java.util.HashMap<number, org.kevoree.modeling.api.KObject<any, any>>();
              public payload_cache: java.util.Map<number, any[]> = new java.util.HashMap<number, any[]>();
              public root: org.kevoree.modeling.api.KObject<any, any> = null;
              public rootDirty: boolean = false;
              public listeners: java.util.List<(evt : org.kevoree.modeling.api.KEvent) => void> = new java.util.ArrayList<(evt : org.kevoree.modeling.api.KEvent) => void>();
              public obj_listeners: java.util.Map<number, java.util.List<(evt : org.kevoree.modeling.api.KEvent) => void>> = new java.util.HashMap<number, java.util.List<(evt : org.kevoree.modeling.api.KEvent) => void>>();
            }

          }
          export class DefaultKStore implements org.kevoree.modeling.api.data.KStore {

            public static KEY_SEP: string = ',';
            private _db: org.kevoree.modeling.api.data.KDataBase;
            private universeListeners: java.util.List<(evt : org.kevoree.modeling.api.KEvent) => void> = new java.util.ArrayList<(evt : org.kevoree.modeling.api.KEvent) => void>();
            private caches: java.util.Map<number, org.kevoree.modeling.api.data.cache.DimensionCache> = new java.util.HashMap<number, org.kevoree.modeling.api.data.cache.DimensionCache>();
            public dimKeyCounter: number = 0;
            public objectKey: number = 0;
            constructor(p_db: org.kevoree.modeling.api.data.KDataBase) {
              this._db = p_db;
            }

            private keyTree(dim: org.kevoree.modeling.api.KDimension<any, any, any>, key: number): string {
              return "" + dim.key() + DefaultKStore.KEY_SEP + key;
            }

            private keyRoot(dim: org.kevoree.modeling.api.KDimension<any, any, any>, time: number): string {
              return dim.key() + DefaultKStore.KEY_SEP + time + DefaultKStore.KEY_SEP + "root";
            }

            private keyRootTree(dim: org.kevoree.modeling.api.KDimension<any, any, any>): string {
              return dim.key() + DefaultKStore.KEY_SEP + "root";
            }

            private keyPayload(dim: org.kevoree.modeling.api.KDimension<any, any, any>, time: number, key: number): string {
              return "" + dim.key() + DefaultKStore.KEY_SEP + time + DefaultKStore.KEY_SEP + key;
            }

            public initDimension(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (a : java.lang.Throwable) => void): void {
              var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = new org.kevoree.modeling.api.data.cache.DimensionCache(dimension);
              this.caches.put(dimension.key(), dimensionCache);
              var rootTreeKeys: string[] = new Array();
              rootTreeKeys[0] = this.keyRootTree(dimension);
              this._db.get(rootTreeKeys,                (res : string[], error : java.lang.Throwable) => {
              if (error != null) {
                callback(error);
              } else {
                try {
                  (<org.kevoree.modeling.api.time.DefaultTimeTree>dimensionCache.rootTimeTree).load(res[0]);
                  callback(null);
                } catch ($ex$) {
                  if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    callback(e);
                  }
                 }
              }
              }
);
            }

            public initKObject(obj: org.kevoree.modeling.api.KObject<any, any>, originView: org.kevoree.modeling.api.KView): void {
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

            public cacheLookup(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, time: number, key: number): org.kevoree.modeling.api.KObject<any, any> {
              var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(dimension.key());
              var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get(time);
              if (timeCache == null) {
                return null;
              } else {
                return timeCache.obj_cache.get(key);
              }
            }

            public raw(origin: org.kevoree.modeling.api.KObject<any, any>, accessMode: org.kevoree.modeling.api.data.AccessMode): any[] {
              if (accessMode.equals(org.kevoree.modeling.api.data.AccessMode.WRITE)) {
                (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>origin).setDirty(true);
              }
              var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(origin.dimension().key());
              var resolvedTime: number = origin.timeTree().resolve(origin.now());
              var needCopy: boolean = accessMode.equals(org.kevoree.modeling.api.data.AccessMode.WRITE) && resolvedTime != origin.now();
              var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get(resolvedTime);
              if (timeCache == null) {
                timeCache = new org.kevoree.modeling.api.data.cache.TimeCache();
                dimensionCache.timesCaches.put(resolvedTime, timeCache);
              }
              var payload: any[] = timeCache.payload_cache.get(origin.uuid());
              if (payload == null) {
                payload = new Array();
                if (accessMode.equals(org.kevoree.modeling.api.data.AccessMode.WRITE) && !needCopy) {
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

            public discard(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (a : java.lang.Throwable) => void): void {
              this.caches.remove(dimension.key());
              callback(null);
            }

            public delete(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (a : java.lang.Throwable) => void): void {
              new java.lang.Exception("Not implemented yet !");
            }

            public save(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (a : java.lang.Throwable) => void): void {
              var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(dimension.key());
              if (dimensionCache == null) {
                callback(null);
              } else {
                var sizeCache: number = 0;
                var timeCaches: org.kevoree.modeling.api.data.cache.TimeCache[] = dimensionCache.timesCaches.values().toArray(new Array());
                for (var i: number = 0; i < timeCaches.length; i++) {
                  var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = timeCaches[i];
                  var valuesArr: org.kevoree.modeling.api.KObject<any, any>[] = timeCache.obj_cache.values().toArray(new Array());
                  for (var j: number = 0; j < valuesArr.length; j++) {
                    var cached: org.kevoree.modeling.api.KObject<any, any> = valuesArr[j];
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
                  var valuesArr: org.kevoree.modeling.api.KObject<any, any>[] = timeCache.obj_cache.values().toArray(new Array());
                  for (var k: number = 0; k < valuesArr.length; k++) {
                    var cached: org.kevoree.modeling.api.KObject<any, any> = valuesArr[k];
                    if (cached.isDirty()) {
                      payloads[i][0] = this.keyPayload(dimension, cached.now(), cached.uuid());
                      payloads[i][1] = cached.toJSON();
                      (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>cached).setDirty(false);
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

            public saveUnload(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (a : java.lang.Throwable) => void): void {
              this.save(dimension,                (throwable : java.lang.Throwable) => {
              if (throwable == null) {
                this.discard(dimension, callback);
              } else {
                callback(throwable);
              }
              }
);
            }

            public timeTree(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, key: number, callback: (a : org.kevoree.modeling.api.time.TimeTree) => void): void {
              var keys: number[] = new Array();
              keys[0] = key;
              this.timeTrees(dimension, keys,                (timeTrees : org.kevoree.modeling.api.time.TimeTree[]) => {
              if (timeTrees.length == 1) {
                callback(timeTrees[0]);
              } else {
                callback(null);
              }
              }
);
            }

            public timeTrees(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, keys: number[], callback: (a : org.kevoree.modeling.api.time.TimeTree[]) => void): void {
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
                callback(result);
              } else {
                var toLoadKeys: string[] = new Array();
                for (var i: number = 0; i < toLoadKeys.length; i++) {
                  toLoadKeys[i] = this.keyTree(dimension, keys[toLoad.get(i)]);
                }
                this._db.get(toLoadKeys,                  (res : string[], error : java.lang.Throwable) => {
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
                callback(result);
                }
);
              }
            }

            public lookup(originView: org.kevoree.modeling.api.KView, key: number, callback: (a : org.kevoree.modeling.api.KObject<any, any>) => void): void {
              if (callback == null) {
                return;
              }
              this.timeTree(originView.dimension(), key,                (timeTree : org.kevoree.modeling.api.time.TimeTree) => {
              var resolvedTime: number = timeTree.resolve(originView.now());
              if (resolvedTime == null) {
                callback(null);
              } else {
                var resolved: org.kevoree.modeling.api.KObject<any, any> = this.cacheLookup(originView.dimension(), resolvedTime, key);
                if (resolved != null) {
                  if (originView.now() == resolvedTime) {
                    callback(resolved);
                  } else {
                    var proxy: org.kevoree.modeling.api.KObject<any, any> = originView.createProxy(resolved.metaClass(), resolved.timeTree(), key);
                    callback(proxy);
                  }
                } else {
                  var keys: number[] = new Array();
                  keys[0] = key;
                  this.loadObjectInCache(originView, keys,                    (dbResolved : java.util.List<org.kevoree.modeling.api.KObject<any, any>>) => {
                  if (dbResolved.size() == 0) {
                    callback(null);
                  } else {
                    var dbResolvedZero: org.kevoree.modeling.api.KObject<any, any> = dbResolved.get(0);
                    if (resolvedTime != originView.now()) {
                      var proxy: org.kevoree.modeling.api.KObject<any, any> = originView.createProxy(dbResolvedZero.metaClass(), dbResolvedZero.timeTree(), key);
                      callback(proxy);
                    } else {
                      callback(dbResolvedZero);
                    }
                  }
                  }
);
                }
              }
              }
);
            }

            private loadObjectInCache(originView: org.kevoree.modeling.api.KView, keys: number[], callback: (a : java.util.List<org.kevoree.modeling.api.KObject<any, any>>) => void): void {
              this.timeTrees(originView.dimension(), keys,                (timeTrees : org.kevoree.modeling.api.time.TimeTree[]) => {
              var objStringKeys: string[] = new Array();
              var resolved: number[] = new Array();
              for (var i: number = 0; i < keys.length; i++) {
                var resolvedTime: number = timeTrees[i].resolve(originView.now());
                resolved[i] = resolvedTime;
                objStringKeys[i] = this.keyPayload(originView.dimension(), resolvedTime, keys[i]);
              }
              this._db.get(objStringKeys,                (objectPayloads : string[], error : java.lang.Throwable) => {
              if (error != null) {
                callback(null);
              } else {
                var additionalLoad: java.util.List<any[]> = new java.util.ArrayList<any[]>();
                var objs: java.util.List<org.kevoree.modeling.api.KObject<any, any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>>();
                for (var i: number = 0; i < objectPayloads.length; i++) {
                  var obj: org.kevoree.modeling.api.KObject<any, any> = org.kevoree.modeling.api.json.JsonModelLoader.loadDirect(objectPayloads[i], originView.dimension().time(resolved[i]), null);
                  objs.add(obj);
                  var strategies: java.util.Set<org.kevoree.modeling.api.extrapolation.Extrapolation> = new java.util.HashSet<org.kevoree.modeling.api.extrapolation.Extrapolation>();
                  for (var h: number = 0; h < obj.metaAttributes().length; h++) {
                    var metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute = obj.metaAttributes()[h];
                    strategies.add(metaAttribute.strategy());
                  }
                  var strategiesArr: org.kevoree.modeling.api.extrapolation.Extrapolation[] = strategies.toArray(new Array());
                  for (var k: number = 0; k < strategiesArr.length; k++) {
                    var strategy: org.kevoree.modeling.api.extrapolation.Extrapolation = strategiesArr[k];
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
                  callback(objs);
                } else {
                  var addtionalDBKeys: string[] = new Array();
                  for (var i: number = 0; i < additionalLoad.size(); i++) {
                    addtionalDBKeys[i] = additionalLoad.get(i)[0].toString();
                  }
                  this._db.get(addtionalDBKeys,                    (additionalPayloads : string[], error : java.lang.Throwable) => {
                  for (var i: number = 0; i < objectPayloads.length; i++) {
                    org.kevoree.modeling.api.json.JsonModelLoader.loadDirect(additionalPayloads[i], originView.dimension().time(<number>additionalLoad.get(i)[1]), null);
                  }
                  callback(objs);
                  }
);
                }
              }
              }
);
              }
);
            }

            public lookupAll(originView: org.kevoree.modeling.api.KView, keys: number[], callback: (a : org.kevoree.modeling.api.KObject<any, any>[]) => void): void {
              var toLoad: java.util.List<number> = new java.util.ArrayList<number>();
              for (var i: number = 0; i < keys.length; i++) {
                toLoad.add(keys[i]);
              }
              var resolveds: java.util.List<org.kevoree.modeling.api.KObject<any, any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>>();
              for (var i: number = 0; i < keys.length; i++) {
                var kid: number = keys[i];
                var resolved: org.kevoree.modeling.api.KObject<any, any> = this.cacheLookup(originView.dimension(), originView.now(), kid);
                if (resolved != null) {
                  resolveds.add(resolved);
                  toLoad.remove(kid);
                }
              }
              if (toLoad.size() == 0) {
                var proxies: java.util.List<org.kevoree.modeling.api.KObject<any, any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>>();
                var resolvedsArr: org.kevoree.modeling.api.KObject<any, any>[] = resolveds.toArray(new Array());
                for (var i: number = 0; i < resolvedsArr.length; i++) {
                  var res: org.kevoree.modeling.api.KObject<any, any> = resolvedsArr[i];
                  if (res.now() != originView.now()) {
                    var proxy: org.kevoree.modeling.api.KObject<any, any> = originView.createProxy(res.metaClass(), res.timeTree(), res.uuid());
                    proxies.add(proxy);
                  } else {
                    proxies.add(res);
                  }
                }
                callback(proxies.toArray(new Array()));
              } else {
                var toLoadKeys: number[] = new Array();
                for (var i: number = 0; i < toLoad.size(); i++) {
                  toLoadKeys[i] = toLoad.get(i);
                }
                this.loadObjectInCache(originView, toLoadKeys,                  (additional : java.util.List<org.kevoree.modeling.api.KObject<any, any>>) => {
                resolveds.addAll(additional);
                var proxies: java.util.List<org.kevoree.modeling.api.KObject<any, any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>>();
                var resolvedsArr: org.kevoree.modeling.api.KObject<any, any>[] = resolveds.toArray(new Array());
                for (var i: number = 0; i < resolvedsArr.length; i++) {
                  var res: org.kevoree.modeling.api.KObject<any, any> = resolvedsArr[i];
                  if (res.now() != originView.now()) {
                    var proxy: org.kevoree.modeling.api.KObject<any, any> = originView.createProxy(res.metaClass(), res.timeTree(), res.uuid());
                    proxies.add(proxy);
                  } else {
                    proxies.add(res);
                  }
                }
                callback(proxies.toArray(new Array()));
                }
);
              }
            }

            public getDimension(key: number): org.kevoree.modeling.api.KDimension<any, any, any> {
              var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(key);
              if (dimensionCache != null) {
                return dimensionCache.dimension;
              } else {
                return null;
              }
            }

            public getRoot(originView: org.kevoree.modeling.api.KView, callback: (a : org.kevoree.modeling.api.KObject<any, any>) => void): void {
              var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(originView.dimension().key());
              var resolvedRoot: number = dimensionCache.rootTimeTree.resolve(originView.now());
              if (resolvedRoot == null) {
                callback(null);
              } else {
                var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get(resolvedRoot);
                if (timeCache.root != null) {
                  callback(timeCache.root);
                } else {
                  var rootKeys: string[] = new Array();
                  rootKeys[0] = this.keyRoot(dimensionCache.dimension, resolvedRoot);
                  this._db.get(rootKeys,                    (res : string[], error : java.lang.Throwable) => {
                  if (error != null) {
                    callback(null);
                  } else {
                    try {
                      var idRoot: number = java.lang.Long.parseLong(res[0]);
                      this.lookup(originView, idRoot,                        (resolved : org.kevoree.modeling.api.KObject<any, any>) => {
                      timeCache.root = resolved;
                      timeCache.rootDirty = false;
                      callback(resolved);
                      }
);
                    } catch ($ex$) {
                      if ($ex$ instanceof java.lang.Exception) {
                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                        e.printStackTrace();
                        callback(null);
                      }
                     }
                  }
                  }
);
                }
              }
            }

            public setRoot(newRoot: org.kevoree.modeling.api.KObject<any, any>): void {
              var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(newRoot.dimension().key());
              var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get(newRoot.now());
              timeCache.root = newRoot;
              timeCache.rootDirty = true;
              dimensionCache.rootTimeTree.insert(newRoot.now());
            }

            public registerListener(origin: any, listener: (evt : org.kevoree.modeling.api.KEvent) => void): void {
              if (origin instanceof org.kevoree.modeling.api.abs.AbstractKObject) {
                var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get((<org.kevoree.modeling.api.KDimension<any, any, any>>origin).key());
                var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get((<org.kevoree.modeling.api.KView>origin).now());
                var obj_listeners: java.util.List<(evt : org.kevoree.modeling.api.KEvent) => void> = timeCache.obj_listeners.get((<org.kevoree.modeling.api.KObject<any, any>>origin).uuid());
                if (obj_listeners == null) {
                  obj_listeners = new java.util.ArrayList<(evt : org.kevoree.modeling.api.KEvent) => void>();
                  timeCache.obj_listeners.put((<org.kevoree.modeling.api.KObject<any, any>>origin).uuid(), obj_listeners);
                }
                obj_listeners.add(listener);
              } else {
                if (origin instanceof org.kevoree.modeling.api.abs.AbstractKView) {
                  var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get((<org.kevoree.modeling.api.KDimension<any, any, any>>origin).key());
                  var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get((<org.kevoree.modeling.api.KView>origin).now());
                  timeCache.listeners.add(listener);
                } else {
                  if (origin instanceof org.kevoree.modeling.api.abs.AbstractKDimension) {
                    var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get((<org.kevoree.modeling.api.KDimension<any, any, any>>origin).key());
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
              var obj_listeners: java.util.List<(evt : org.kevoree.modeling.api.KEvent) => void> = timeCache.obj_listeners.get(event.src().uuid());
              if (obj_listeners != null) {
                for (var i: number = 0; i < obj_listeners.size(); i++) {
                  var listener: (evt : org.kevoree.modeling.api.KEvent) => void = obj_listeners.get(i);
                  listener(event);
                }
              }
              for (var i: number = 0; i < timeCache.listeners.size(); i++) {
                var listener: (evt : org.kevoree.modeling.api.KEvent) => void = timeCache.listeners.get(i);
                listener(event);
              }
              for (var i: number = 0; i < dimensionCache.listeners.size(); i++) {
                var listener: (evt : org.kevoree.modeling.api.KEvent) => void = dimensionCache.listeners.get(i);
                listener(event);
              }
              for (var i: number = 0; i < this.universeListeners.size(); i++) {
                var listener: (evt : org.kevoree.modeling.api.KEvent) => void = this.universeListeners.get(i);
                listener(event);
              }
            }

          }

          export interface KDataBase {

            get(keys: string[], callback: (a : string[], error : java.lang.Throwable) => void): void;

            put(payloads: string[][], error: (a : java.lang.Throwable) => void): void;

            remove(keys: string[], error: (a : java.lang.Throwable) => void): void;

            commit(error: (a : java.lang.Throwable) => void): void;

            close(error: (a : java.lang.Throwable) => void): void;

          }

          export interface KStore {

            lookup(originView: org.kevoree.modeling.api.KView, key: number, callback: (a : org.kevoree.modeling.api.KObject<any, any>) => void): void;

            lookupAll(originView: org.kevoree.modeling.api.KView, key: number[], callback: (a : org.kevoree.modeling.api.KObject<any, any>[]) => void): void;

            raw(origin: org.kevoree.modeling.api.KObject<any, any>, accessMode: org.kevoree.modeling.api.data.AccessMode): any[];

            save(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (a : java.lang.Throwable) => void): void;

            saveUnload(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (a : java.lang.Throwable) => void): void;

            discard(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (a : java.lang.Throwable) => void): void;

            delete(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (a : java.lang.Throwable) => void): void;

            timeTree(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, key: number, callback: (a : org.kevoree.modeling.api.time.TimeTree) => void): void;

            timeTrees(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, keys: number[], callback: (a : org.kevoree.modeling.api.time.TimeTree[]) => void): void;

            initKObject(obj: org.kevoree.modeling.api.KObject<any, any>, originView: org.kevoree.modeling.api.KView): void;

            initDimension(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (a : java.lang.Throwable) => void): void;

            nextDimensionKey(): number;

            nextObjectKey(): number;

            getDimension(key: number): org.kevoree.modeling.api.KDimension<any, any, any>;

            getRoot(originView: org.kevoree.modeling.api.KView, callback: (a : org.kevoree.modeling.api.KObject<any, any>) => void): void;

            setRoot(newRoot: org.kevoree.modeling.api.KObject<any, any>): void;

            cacheLookup(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, time: number, key: number): org.kevoree.modeling.api.KObject<any, any>;

            registerListener(origin: any, listener: (evt : org.kevoree.modeling.api.KEvent) => void): void;

            notify(event: org.kevoree.modeling.api.KEvent): void;

          }

          export class MemoryKDataBase implements org.kevoree.modeling.api.data.KDataBase {

            private backend: java.util.HashMap<string, string> = new java.util.HashMap<string, string>();
            public put(payloads: string[][], callback: (a : java.lang.Throwable) => void): void {
              for (var i: number = 0; i < payloads.length; i++) {
                this.backend.put(payloads[i][0], payloads[i][1]);
              }
              callback(null);
            }

            public get(keys: string[], callback: (a : string[], error : java.lang.Throwable) => void): void {
              var values: string[] = new Array();
              for (var i: number = 0; i < keys.length; i++) {
                values[i] = this.backend.get(keys[i]);
              }
              callback(values, null);
            }

            public remove(keys: string[], callback: (a : java.lang.Throwable) => void): void {
              for (var i: number = 0; i < keys.length; i++) {
                this.backend.remove(keys[i]);
              }
              callback(null);
            }

            public commit(callback: (a : java.lang.Throwable) => void): void {
            }

            public close(callback: (a : java.lang.Throwable) => void): void {
              this.backend.clear();
            }

          }

        }
        export module event {
          export class DefaultKEvent implements org.kevoree.modeling.api.KEvent {

            private _type: org.kevoree.modeling.api.KActionType;
            private _meta: org.kevoree.modeling.api.meta.Meta;
            private _pastValue: any;
            private _newValue: any;
            private _source: org.kevoree.modeling.api.KObject<any, any>;
            constructor(p_type: org.kevoree.modeling.api.KActionType, p_meta: org.kevoree.modeling.api.meta.Meta, p_source: org.kevoree.modeling.api.KObject<any, any>, p_pastValue: any, p_newValue: any) {
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

            public src(): org.kevoree.modeling.api.KObject<any, any> {
              return this._source;
            }

          }

        }
        export module extrapolation {
          export class DiscreteExtrapolation implements org.kevoree.modeling.api.extrapolation.Extrapolation {

            private static INSTANCE: org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation;
            public timedDependencies(current: org.kevoree.modeling.api.KObject<any, any>): number[] {
              var times: number[] = new Array();
              times[0] = current.timeTree().resolve(current.now());
              return times;
            }

            public extrapolate(current: org.kevoree.modeling.api.KObject<any, any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, dependencies: org.kevoree.modeling.api.KObject<any, any>[]): any {
              var payload: any[] = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ);
              if (payload != null) {
                return payload[attribute.index()];
              } else {
                return null;
              }
            }

            public mutate(current: org.kevoree.modeling.api.KObject<any, any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any, dependencies: org.kevoree.modeling.api.KObject<any, any>[]): void {
              var internalPayload: any[] = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE);
              if (internalPayload != null) {
                internalPayload[attribute.index()] = payload;
              }
            }

            public static instance(): org.kevoree.modeling.api.extrapolation.Extrapolation {
              if (DiscreteExtrapolation.INSTANCE == null) {
                DiscreteExtrapolation.INSTANCE = new org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation();
              }
              return DiscreteExtrapolation.INSTANCE;
            }

          }

          export interface Extrapolation {

            timedDependencies(current: org.kevoree.modeling.api.KObject<any, any>): number[];

            extrapolate(current: org.kevoree.modeling.api.KObject<any, any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, dependencies: org.kevoree.modeling.api.KObject<any, any>[]): any;

            mutate(current: org.kevoree.modeling.api.KObject<any, any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any, dependencies: org.kevoree.modeling.api.KObject<any, any>[]): void;

          }

          export class LinearRegressionExtrapolation implements org.kevoree.modeling.api.extrapolation.Extrapolation {

            private static INSTANCE: org.kevoree.modeling.api.extrapolation.LinearRegressionExtrapolation;
            public timedDependencies(current: org.kevoree.modeling.api.KObject<any, any>): number[] {
              return new Array();
            }

            public extrapolate(current: org.kevoree.modeling.api.KObject<any, any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, dependencies: org.kevoree.modeling.api.KObject<any, any>[]): any {
              return null;
            }

            public mutate(current: org.kevoree.modeling.api.KObject<any, any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any, dependencies: org.kevoree.modeling.api.KObject<any, any>[]): void {
            }

            public static instance(): org.kevoree.modeling.api.extrapolation.Extrapolation {
              if (LinearRegressionExtrapolation.INSTANCE == null) {
                LinearRegressionExtrapolation.INSTANCE = new org.kevoree.modeling.api.extrapolation.LinearRegressionExtrapolation();
              }
              return LinearRegressionExtrapolation.INSTANCE;
            }

          }

          export class PolynomialExtrapolation implements org.kevoree.modeling.api.extrapolation.Extrapolation {

            private static INSTANCE: org.kevoree.modeling.api.extrapolation.PolynomialExtrapolation;
            public timedDependencies(current: org.kevoree.modeling.api.KObject<any, any>): number[] {
              var times: number[] = new Array();
              times[0] = current.timeTree().resolve(current.now());
              return times;
            }

            public extrapolate(current: org.kevoree.modeling.api.KObject<any, any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, dependencies: org.kevoree.modeling.api.KObject<any, any>[]): any {
              var pol: org.kevoree.modeling.api.polynomial.PolynomialExtrapolation = <org.kevoree.modeling.api.polynomial.PolynomialExtrapolation>current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[attribute.index()];
              if (pol != null) {
                var extrapolatedValue: number = pol.extrapolate(current.now());
                if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.DOUBLE)) {
                  return extrapolatedValue;
                } else {
                  if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.LONG)) {
                    return extrapolatedValue.longValue();
                  } else {
                    if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.FLOAT)) {
                      return extrapolatedValue.floatValue();
                    } else {
                      if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.INT)) {
                        return extrapolatedValue.intValue();
                      } else {
                        if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.SHORT)) {
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

            public mutate(current: org.kevoree.modeling.api.KObject<any, any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any, dependencies: org.kevoree.modeling.api.KObject<any, any>[]): void {
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

            public static instance(): org.kevoree.modeling.api.extrapolation.Extrapolation {
              if (PolynomialExtrapolation.INSTANCE == null) {
                PolynomialExtrapolation.INSTANCE = new org.kevoree.modeling.api.extrapolation.PolynomialExtrapolation();
              }
              return PolynomialExtrapolation.INSTANCE;
            }

          }

        }
        export class InboundReference {

          private reference: org.kevoree.modeling.api.meta.MetaReference;
          private object: org.kevoree.modeling.api.KObject<any, any>;
          constructor(reference: org.kevoree.modeling.api.meta.MetaReference, object: org.kevoree.modeling.api.KObject<any, any>) {
            this.reference = reference;
            this.object = object;
          }

          public getReference(): org.kevoree.modeling.api.meta.MetaReference {
            return this.reference;
          }

          public getObject(): org.kevoree.modeling.api.KObject<any, any> {
            return this.object;
          }

        }

        export module json {
          export class JsonFormat implements org.kevoree.modeling.api.ModelFormat {

            private _view: org.kevoree.modeling.api.KView;
            constructor(p_view: org.kevoree.modeling.api.KView) {
              this._view = p_view;
            }

            public save(model: org.kevoree.modeling.api.KObject<any, any>, callback: (a : string, error : java.lang.Throwable) => void): void {
              org.kevoree.modeling.api.json.JsonModelSerializer.serialize(model, callback);
            }

            public load(payload: string, callback: (a : java.lang.Throwable) => void): void {
              org.kevoree.modeling.api.json.JsonModelLoader.load(this._view, payload, callback);
            }

          }

          export class JsonModelLoader {

            public static loadDirect(payload: string, factory: org.kevoree.modeling.api.KView, callback: (a : org.kevoree.modeling.api.KObject<any, any>) => void): org.kevoree.modeling.api.KObject<any, any> {
              var lexer: org.kevoree.modeling.api.json.Lexer = new org.kevoree.modeling.api.json.Lexer(payload);
              var loaded: org.kevoree.modeling.api.KObject<any, any>[] = new Array();
              org.kevoree.modeling.api.json.JsonModelLoader.loadObjects(lexer, factory,                (objs : java.util.List<org.kevoree.modeling.api.KObject<any, any>>) => {
              loaded[0] = objs.get(0);
              }
);
              return loaded[0];
            }

            private static loadObjects(lexer: org.kevoree.modeling.api.json.Lexer, factory: org.kevoree.modeling.api.KView, callback: (a : java.util.List<org.kevoree.modeling.api.KObject<any, any>>) => void): void {
              var loaded: java.util.List<org.kevoree.modeling.api.KObject<any, any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>>();
              var alls: java.util.List<java.util.Map<string, any>> = new java.util.ArrayList<java.util.Map<string, any>>();
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
              var keys: number[] = new Array();
              for (var i: number = 0; i < keys.length; i++) {
                var kid: number = java.lang.Long.parseLong(alls.get(i).get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID).toString());
                keys[i] = kid;
              }
              factory.dimension().timeTrees(keys,                (timeTrees : org.kevoree.modeling.api.time.TimeTree[]) => {
              for (var i: number = 0; i < alls.size(); i++) {
                var elem: java.util.Map<string, any> = alls.get(i);
                var meta: string = elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META).toString();
                var kid: number = java.lang.Long.parseLong(elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID).toString());
                var isRoot: boolean = false;
                var root: any = elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_ROOT);
                if (root != null) {
                  isRoot = root.toString().equals("true");
                }
                var timeTree: org.kevoree.modeling.api.time.TimeTree = timeTrees[i];
                timeTree.insert(factory.now());
                var current: org.kevoree.modeling.api.KObject<any, any> = factory.createProxy(factory.metaClass(meta), timeTree, kid);
                if (isRoot) {
                  (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>current).setRoot(true);
                }
                loaded.add(current);
                var payloadObj: any[] = factory.dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE);
                //TODO resolve for-each cycle
                var k: string;
                for (k in elem.keySet()) {
                  var att: org.kevoree.modeling.api.meta.MetaAttribute = current.metaAttribute(k);
                  if (att != null) {
                    payloadObj[att.index()] = org.kevoree.modeling.api.json.JsonModelLoader.convertRaw(att, elem.get(k));
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
                callback(loaded);
              }
              }
);
            }

            public static load(_factory: org.kevoree.modeling.api.KView, payload: string, callback: (a : java.lang.Throwable) => void): void {
              if (payload == null) {
                callback(null);
              } else {
                var lexer: org.kevoree.modeling.api.json.Lexer = new org.kevoree.modeling.api.json.Lexer(payload);
                var currentToken: org.kevoree.modeling.api.json.JsonToken = lexer.nextToken();
                if (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.LEFT_BRACKET) {
                  callback(null);
                } else {
                  org.kevoree.modeling.api.json.JsonModelLoader.loadObjects(lexer, _factory,                    (kObjects : java.util.List<org.kevoree.modeling.api.KObject<any, any>>) => {
                  callback(null);
                  }
);
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

          export class JsonModelSerializer {

            public static KEY_META: string = "@meta";
            public static KEY_UUID: string = "@uuid";
            public static KEY_ROOT: string = "@root";
            public static serialize(model: org.kevoree.modeling.api.KObject<any, any>, callback: (a : string, error : java.lang.Throwable) => void): void {
              var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
              builder.append("[\n");
              org.kevoree.modeling.api.json.JsonModelSerializer.printJSON(model, builder);
              model.graphVisit(               (elem : org.kevoree.modeling.api.KObject<any, any>) => {
              builder.append(",");
              org.kevoree.modeling.api.json.JsonModelSerializer.printJSON(elem, builder);
              return org.kevoree.modeling.api.VisitResult.CONTINUE;
              }
,                (throwable : java.lang.Throwable) => {
              builder.append("]\n");
              callback(builder.toString(), throwable);
              }
);
            }

            public static printJSON(elem: org.kevoree.modeling.api.KObject<any, any>, builder: java.lang.StringBuilder): void {
              builder.append("{\n");
              builder.append("\t\"" + JsonModelSerializer.KEY_META + "\" : \"");
              builder.append(elem.metaClass().metaName());
              builder.append("\",\n");
              builder.append("\t\"" + JsonModelSerializer.KEY_UUID + "\" : \"");
              builder.append(elem.uuid() + "");
              if (elem.isRoot()) {
                builder.append("\",\n");
                builder.append("\t\"" + JsonModelSerializer.KEY_ROOT + "\" : \"");
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

            public static encode(buffer: java.lang.StringBuilder, chain: string): void {
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
          public static _KActionTypeVALUES : KActionType[] = [
            KActionType.SET
            ,KActionType.ADD
            ,KActionType.REMOVE
            ,KActionType.NEW
          ];
          public static values():KActionType[]{
            return KActionType._KActionTypeVALUES;
          }
        }

        export interface KDimension<A extends org.kevoree.modeling.api.KView, B extends org.kevoree.modeling.api.KDimension<any, any, any>, C extends org.kevoree.modeling.api.KUniverse<any>> {

          key(): number;

          parent(callback: (a : B) => void): void;

          children(callback: (a : B[]) => void): void;

          fork(callback: (a : B) => void): void;

          save(callback: (a : java.lang.Throwable) => void): void;

          saveUnload(callback: (a : java.lang.Throwable) => void): void;

          delete(callback: (a : java.lang.Throwable) => void): void;

          discard(callback: (a : java.lang.Throwable) => void): void;

          time(timePoint: number): A;

          timeTrees(keys: number[], callback: (a : org.kevoree.modeling.api.time.TimeTree[]) => void): void;

          timeTree(key: number, callback: (a : org.kevoree.modeling.api.time.TimeTree) => void): void;

          universe(): C;

        }

        export interface KEvent {

          type(): org.kevoree.modeling.api.KActionType;

          meta(): org.kevoree.modeling.api.meta.Meta;

          pastValue(): any;

          newValue(): any;

          src(): org.kevoree.modeling.api.KObject<any, any>;

        }

        export interface KObject<A extends org.kevoree.modeling.api.KObject<any, any>, B extends org.kevoree.modeling.api.KView> {

          isDirty(): boolean;

          dimension(): org.kevoree.modeling.api.KDimension<any, any, any>;

          isDeleted(): boolean;

          isRoot(): boolean;

          uuid(): number;

          path(callback: (a : string) => void): void;

          view(): B;

          delete(callback: (a : boolean) => void): void;

          parent(callback: (a : org.kevoree.modeling.api.KObject<any, any>) => void): void;

          parentUuid(): number;

          select(query: string, callback: (a : org.kevoree.modeling.api.KObject<any, any>[]) => void): void;

          stream(query: string, callback: (a : org.kevoree.modeling.api.KObject<any, any>) => void): void;

          listen(listener: (evt : org.kevoree.modeling.api.KEvent) => void): void;

          visitAttributes(visitor: (metaAttribute : org.kevoree.modeling.api.meta.MetaAttribute, value : any) => void): void;

          visit(visitor: (elem : org.kevoree.modeling.api.KObject<any, any>) => org.kevoree.modeling.api.VisitResult, end: (a : java.lang.Throwable) => void): void;

          graphVisit(visitor: (elem : org.kevoree.modeling.api.KObject<any, any>) => org.kevoree.modeling.api.VisitResult, end: (a : java.lang.Throwable) => void): void;

          treeVisit(visitor: (elem : org.kevoree.modeling.api.KObject<any, any>) => org.kevoree.modeling.api.VisitResult, end: (a : java.lang.Throwable) => void): void;

          now(): number;

          jump(time: number, callback: (a : A) => void): void;

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

          mutate(actionType: org.kevoree.modeling.api.KActionType, metaReference: org.kevoree.modeling.api.meta.MetaReference, param: org.kevoree.modeling.api.KObject<any, any>, setOpposite: boolean): void;

          each<C extends org.kevoree.modeling.api.KObject<any, any>> (metaReference: org.kevoree.modeling.api.meta.MetaReference, callback: (a : C) => void, end: (a : java.lang.Throwable) => void): void;

          inbounds(callback: (a : org.kevoree.modeling.api.InboundReference) => void, end: (a : java.lang.Throwable) => void): void;

          traces(request: org.kevoree.modeling.api.TraceRequest): org.kevoree.modeling.api.trace.ModelTrace[];

          get(attribute: org.kevoree.modeling.api.meta.MetaAttribute): any;

          set(attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void;

          toJSON(): string;

        }

        export interface KUniverse<A extends org.kevoree.modeling.api.KDimension<any, any, any>> {

          newDimension(callback: (a : A) => void): void;

          dimension(key: number, callback: (a : A) => void): void;

          saveAll(callback: (a : boolean) => void): void;

          deleteAll(callback: (a : boolean) => void): void;

          unloadAll(callback: (a : boolean) => void): void;

          disable(listener: (evt : org.kevoree.modeling.api.KEvent) => void): void;

          stream(query: string, callback: (a : org.kevoree.modeling.api.KObject<any, any>) => void): void;

          storage(): org.kevoree.modeling.api.data.KStore;

          listen(listener: (evt : org.kevoree.modeling.api.KEvent) => void): void;

        }

        export interface KView {

          createFQN(metaClassName: string): org.kevoree.modeling.api.KObject<any, any>;

          create(clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject<any, any>;

          setRoot(elem: org.kevoree.modeling.api.KObject<any, any>): void;

          select(query: string, callback: (a : org.kevoree.modeling.api.KObject<any, any>[]) => void): void;

          lookup(key: number, callback: (a : org.kevoree.modeling.api.KObject<any, any>) => void): void;

          lookupAll(keys: number[], callback: (a : org.kevoree.modeling.api.KObject<any, any>[]) => void): void;

          stream(query: string, callback: (a : org.kevoree.modeling.api.KObject<any, any>) => void): void;

          metaClasses(): org.kevoree.modeling.api.meta.MetaClass[];

          metaClass(fqName: string): org.kevoree.modeling.api.meta.MetaClass;

          dimension(): org.kevoree.modeling.api.KDimension<any, any, any>;

          now(): number;

          createProxy(clazz: org.kevoree.modeling.api.meta.MetaClass, timeTree: org.kevoree.modeling.api.time.TimeTree, key: number): org.kevoree.modeling.api.KObject<any, any>;

          listen(listener: (evt : org.kevoree.modeling.api.KEvent) => void): void;

          diff(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (a : org.kevoree.modeling.api.trace.TraceSequence) => void): void;

          merge(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (a : org.kevoree.modeling.api.trace.TraceSequence) => void): void;

          intersection(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (a : org.kevoree.modeling.api.trace.TraceSequence) => void): void;

          slice(elems: java.util.List<org.kevoree.modeling.api.KObject<any, any>>, callback: (a : org.kevoree.modeling.api.trace.TraceSequence) => void): void;

          clone<A extends org.kevoree.modeling.api.KObject<any, any>> (o: A, callback: (a : A) => void): void;

          json(): org.kevoree.modeling.api.ModelFormat;

          xmi(): org.kevoree.modeling.api.ModelFormat;

        }

        export module meta {
          export interface Meta {

            metaName(): string;

            index(): number;

          }

          export interface MetaAttribute extends org.kevoree.modeling.api.meta.Meta {

            key(): boolean;

            origin(): org.kevoree.modeling.api.meta.MetaClass;

            metaType(): org.kevoree.modeling.api.meta.MetaType;

            strategy(): org.kevoree.modeling.api.extrapolation.Extrapolation;

            precision(): number;

            setExtrapolation(extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation): void;

          }

          export interface MetaClass extends org.kevoree.modeling.api.meta.Meta {

          }

          export interface MetaOperation extends org.kevoree.modeling.api.meta.Meta {

          }

          export interface MetaReference extends org.kevoree.modeling.api.meta.Meta {

            contained(): boolean;

            single(): boolean;

            metaType(): org.kevoree.modeling.api.meta.MetaClass;

            opposite(): org.kevoree.modeling.api.meta.MetaReference;

            origin(): org.kevoree.modeling.api.meta.MetaClass;

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
            public static _MetaTypeVALUES : MetaType[] = [
              MetaType.STRING
              ,MetaType.LONG
              ,MetaType.INT
              ,MetaType.BOOL
              ,MetaType.SHORT
              ,MetaType.DOUBLE
              ,MetaType.FLOAT
            ];
            public static values():MetaType[]{
              return MetaType._MetaTypeVALUES;
            }
          }

        }
        export interface ModelAttributeVisitor {

          visit(metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute, value: any): void;

        }

        export interface ModelFormat {

          save(model: org.kevoree.modeling.api.KObject<any, any>, callback: (a : string, error : java.lang.Throwable) => void): void;

          load(payload: string, callback: (a : java.lang.Throwable) => void): void;

        }

        export interface ModelListener {

          on(evt: org.kevoree.modeling.api.KEvent): void;

        }

        export interface ModelVisitor {

          visit(elem: org.kevoree.modeling.api.KObject<any, any>): org.kevoree.modeling.api.VisitResult;

        }

        export module operation {
          export class DefaultModelCloner {

            public static clone<A extends org.kevoree.modeling.api.KObject<any, any>> (originalObject: A, callback: (a : A) => void): void {
              if (originalObject == null || originalObject.view() == null || originalObject.view().dimension() == null) {
                callback(null);
              } else {
                originalObject.view().dimension().fork(                 (o : org.kevoree.modeling.api.KDimension<any, any, any>) => {
                o.time(originalObject.view().now()).lookup(originalObject.uuid(),                  (clonedObject : org.kevoree.modeling.api.KObject<any, any>) => {
                callback(<A>clonedObject);
                }
);
                }
);
              }
            }

          }

          export class DefaultModelCompare {

            public static diff(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (a : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
              org.kevoree.modeling.api.operation.DefaultModelCompare.internal_diff(origin, target, false, false, callback);
            }

            public static merge(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (a : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
              org.kevoree.modeling.api.operation.DefaultModelCompare.internal_diff(origin, target, false, true, callback);
            }

            public static intersection(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (a : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
              org.kevoree.modeling.api.operation.DefaultModelCompare.internal_diff(origin, target, true, false, callback);
            }

            private static internal_diff(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, inter: boolean, merge: boolean, callback: (a : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
              var traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
              var tracesRef: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
              var objectsMap: java.util.Map<number, org.kevoree.modeling.api.KObject<any, any>> = new java.util.HashMap<number, org.kevoree.modeling.api.KObject<any, any>>();
              traces.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(origin, target, inter, merge, false, true));
              tracesRef.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(origin, target, inter, merge, true, false));
              origin.treeVisit(               (elem : org.kevoree.modeling.api.KObject<any, any>) => {
              objectsMap.put(elem.uuid(), elem);
              return org.kevoree.modeling.api.VisitResult.CONTINUE;
              }
,                (throwable : java.lang.Throwable) => {
              if (throwable != null) {
                throwable.printStackTrace();
                callback(null);
              } else {
                target.treeVisit(                 (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                var childPath: number = elem.uuid();
                if (objectsMap.containsKey(childPath)) {
                  if (inter) {
                    var currentReference: org.kevoree.modeling.api.meta.MetaReference = null;
                    traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.parentUuid(), currentReference, elem.uuid(), elem.metaClass()));
                  }
                  traces.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(objectsMap.get(childPath), elem, inter, merge, false, true));
                  tracesRef.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(objectsMap.get(childPath), elem, inter, merge, true, false));
                  objectsMap.remove(childPath);
                } else {
                  if (!inter) {
                    var currentReference: org.kevoree.modeling.api.meta.MetaReference = null;
                    traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.parentUuid(), currentReference, elem.uuid(), elem.metaClass()));
                    traces.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(elem, elem, true, merge, false, true));
                    tracesRef.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(elem, elem, true, merge, true, false));
                  }
                }
                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                }
,                  (throwable : java.lang.Throwable) => {
                if (throwable != null) {
                  throwable.printStackTrace();
                  callback(null);
                } else {
                  traces.addAll(tracesRef);
                  if (!inter && !merge) {
                    var diffChildKeys: number[] = objectsMap.keySet().toArray(new Array());
                    for (var i: number = 0; i < diffChildKeys.length; i++) {
                      var diffChildKey: number = diffChildKeys[i];
                      var diffChild: org.kevoree.modeling.api.KObject<any, any> = objectsMap.get(diffChildKey);
                      var src: number = diffChild.parentUuid();
                      traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(src, diffChild.referenceInParent(), diffChild.uuid()));
                    }
                  }
                  callback(new org.kevoree.modeling.api.trace.TraceSequence().populate(traces));
                }
                }
);
              }
              }
);
            }

            private static internal_createTraces(current: org.kevoree.modeling.api.KObject<any, any>, sibling: org.kevoree.modeling.api.KObject<any, any>, inter: boolean, merge: boolean, references: boolean, attributes: boolean): java.util.List<org.kevoree.modeling.api.trace.ModelTrace> {
              var traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
              var values: java.util.Map<org.kevoree.modeling.api.meta.MetaAttribute, string> = new java.util.HashMap<org.kevoree.modeling.api.meta.MetaAttribute, string>();
              if (attributes) {
                if (current != null) {
                  current.visitAttributes(                   (metaAttribute : org.kevoree.modeling.api.meta.MetaAttribute, value : any) => {
                  if (value == null) {
                    values.put(metaAttribute, null);
                  } else {
                    values.put(metaAttribute, value.toString());
                  }
                  }
);
                }
                if (sibling != null) {
                  sibling.visitAttributes(                   (metaAttribute : org.kevoree.modeling.api.meta.MetaAttribute, value : any) => {
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
                  }
);
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

          export class DefaultModelSlicer {

            private static internal_prune(elem: org.kevoree.modeling.api.KObject<any, any>, traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace>, cache: java.util.Map<number, org.kevoree.modeling.api.KObject<any, any>>, parentMap: java.util.Map<number, org.kevoree.modeling.api.KObject<any, any>>, callback: (a : java.lang.Throwable) => void): void {
              var parents: java.util.List<org.kevoree.modeling.api.KObject<any, any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>>();
              var parentExplorer: java.util.List<(a : org.kevoree.modeling.api.KObject<any, any>) => void> = new java.util.ArrayList<(a : org.kevoree.modeling.api.KObject<any, any>) => void>();
              parentExplorer.add(               (currentParent : org.kevoree.modeling.api.KObject<any, any>) => {
              if (currentParent != null && parentMap.get(currentParent.uuid()) == null && cache.get(currentParent.uuid()) == null) {
                parents.add(currentParent);
                currentParent.parent(parentExplorer.get(0));
                callback(null);
              } else {
                java.util.Collections.reverse(parents);
                var parentsArr: org.kevoree.modeling.api.KObject<any, any>[] = parents.toArray(new Array());
                for (var k: number = 0; k < parentsArr.length; k++) {
                  var parent: org.kevoree.modeling.api.KObject<any, any> = parentsArr[k];
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
                elem.graphVisit(                 (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                if (cache.get(elem.uuid()) == null) {
                  org.kevoree.modeling.api.operation.DefaultModelSlicer.internal_prune(elem, traces, cache, parentMap,                    (throwable : java.lang.Throwable) => {
                  }
);
                }
                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                }
,                  (throwable : java.lang.Throwable) => {
                callback(null);
                }
);
              }
              }
);
              traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.uuid(), null, elem.uuid(), elem.metaClass()));
              elem.parent(parentExplorer.get(0));
            }

            public static slice(elems: java.util.List<org.kevoree.modeling.api.KObject<any, any>>, callback: (a : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
              var traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
              var tempMap: java.util.Map<number, org.kevoree.modeling.api.KObject<any, any>> = new java.util.HashMap<number, org.kevoree.modeling.api.KObject<any, any>>();
              var parentMap: java.util.Map<number, org.kevoree.modeling.api.KObject<any, any>> = new java.util.HashMap<number, org.kevoree.modeling.api.KObject<any, any>>();
              var elemsArr: org.kevoree.modeling.api.KObject<any, any>[] = elems.toArray(new Array());
              org.kevoree.modeling.api.util.Helper.forall(elemsArr,                (obj : org.kevoree.modeling.api.KObject<any, any>, next : (a : java.lang.Throwable) => void) => {
              org.kevoree.modeling.api.operation.DefaultModelSlicer.internal_prune(obj, traces, tempMap, parentMap, next);
              }
,                (throwable : java.lang.Throwable) => {
              var toLinkKeysArr: number[] = tempMap.keySet().toArray(new Array());
              for (var k: number = 0; k < toLinkKeysArr.length; k++) {
                var toLink: org.kevoree.modeling.api.KObject<any, any> = tempMap.get(toLinkKeysArr[k]);
                var toAdd: org.kevoree.modeling.api.trace.ModelTrace[] = toLink.traces(org.kevoree.modeling.api.TraceRequest.REFERENCES_ONLY);
                for (var i: number = 0; i < toAdd.length; i++) {
                  traces.add(toAdd[i]);
                }
              }
              callback(new org.kevoree.modeling.api.trace.TraceSequence().populate(traces));
              }
);
            }

          }

        }
        export module polynomial {
          export class DefaultPolynomialExtrapolation implements org.kevoree.modeling.api.polynomial.PolynomialExtrapolation {

            private weights: number[];
            private timeOrigin: number;
            private samples: java.util.List<org.kevoree.modeling.api.polynomial.util.DataSample> = new java.util.ArrayList<org.kevoree.modeling.api.polynomial.util.DataSample>();
            private degradeFactor: number;
            private prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization;
            private maxDegree: number;
            private toleratedError: number;
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

            public comparePolynome(p2: org.kevoree.modeling.api.polynomial.DefaultPolynomialExtrapolation, err: number): boolean {
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
        export module select {
          export class KQuery {

            public static OPEN_BRACKET: string = '[';
            public static CLOSE_BRACKET: string = ']';
            public static QUERY_SEP: string = '/';
            public relationName: string;
            public params: java.util.Map<string, org.kevoree.modeling.api.select.KQueryParam>;
            public subQuery: string;
            public oldString: string;
            public previousIsDeep: boolean;
            public previousIsRefDeep: boolean;
            constructor(relationName: string, params: java.util.Map<string, org.kevoree.modeling.api.select.KQueryParam>, subQuery: string, oldString: string, previousIsDeep: boolean, previousIsRefDeep: boolean) {
              this.relationName = relationName;
              this.params = params;
              this.subQuery = subQuery;
              this.oldString = oldString;
              this.previousIsDeep = previousIsDeep;
              this.previousIsRefDeep = previousIsRefDeep;
            }

            public static extractFirstQuery(query: string): org.kevoree.modeling.api.select.KQuery {
              if (query == null || query.length == 0) {
                return null;
              }
              if (query.charAt(0) == KQuery.QUERY_SEP) {
                var subQuery: string = null;
                if (query.length > 1) {
                  subQuery = query.substring(1);
                }
                var params: java.util.Map<string, org.kevoree.modeling.api.select.KQueryParam> = new java.util.HashMap<string, org.kevoree.modeling.api.select.KQueryParam>();
                return new org.kevoree.modeling.api.select.KQuery("", params, subQuery, "" + KQuery.QUERY_SEP, false, false);
              }
              if (query.startsWith("**/")) {
                if (query.length > 3) {
                  var next: org.kevoree.modeling.api.select.KQuery = org.kevoree.modeling.api.select.KQuery.extractFirstQuery(query.substring(3));
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
                  var next: org.kevoree.modeling.api.select.KQuery = org.kevoree.modeling.api.select.KQuery.extractFirstQuery(query.substring(4));
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
                var params: java.util.Map<string, org.kevoree.modeling.api.select.KQueryParam> = new java.util.HashMap<string, org.kevoree.modeling.api.select.KQueryParam>();
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
                        var pObject: org.kevoree.modeling.api.select.KQueryParam;
                        if (pArray.length > 1) {
                          var paramKey: string = pArray[0].trim();
                          var negative: boolean = paramKey.endsWith("!");
                          pObject = new org.kevoree.modeling.api.select.KQueryParam(paramKey.replace("!", ""), pArray[1].trim(), negative);
                          params.put(pObject.name(), pObject);
                        } else {
                          pObject = new org.kevoree.modeling.api.select.KQueryParam(null, p, false);
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
                    var pObject: org.kevoree.modeling.api.select.KQueryParam;
                    if (pArray.length > 1) {
                      var paramKey: string = pArray[0].trim();
                      var negative: boolean = paramKey.endsWith("!");
                      pObject = new org.kevoree.modeling.api.select.KQueryParam(paramKey.replace("!", ""), pArray[1].trim(), negative);
                      params.put(pObject.name(), pObject);
                    } else {
                      pObject = new org.kevoree.modeling.api.select.KQueryParam(null, lastParam, false);
                      params.put("@id", pObject);
                    }
                  }
                }
                return new org.kevoree.modeling.api.select.KQuery(relName, params, subQuery, oldString, false, false);
              }
              return null;
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

            public static select(root: org.kevoree.modeling.api.KObject<any, any>, query: string, callback: (a : org.kevoree.modeling.api.KObject<any, any>[]) => void): void {
              var extractedQuery: org.kevoree.modeling.api.select.KQuery = org.kevoree.modeling.api.select.KQuery.extractFirstQuery(query);
              if (extractedQuery == null) {
                callback(new Array());
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
                root.view().lookupAll(collected.toArray(new Array()),                  (resolveds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                var nextGeneration: java.util.List<org.kevoree.modeling.api.KObject<any, any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>>();
                if (extractedQuery.params.isEmpty()) {
                  for (var i: number = 0; i < resolveds.length; i++) {
                    nextGeneration.add(resolveds[i]);
                  }
                } else {
                  for (var i: number = 0; i < resolveds.length; i++) {
                    var resolved: org.kevoree.modeling.api.KObject<any, any> = resolveds[i];
                    var selectedForNext: boolean = true;
                    //TODO resolve for-each cycle
                    var paramKey: string;
                    for (paramKey in extractedQuery.params.keySet()) {
                      var param: org.kevoree.modeling.api.select.KQueryParam = extractedQuery.params.get(paramKey);
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
                var childSelected: java.util.List<org.kevoree.modeling.api.KObject<any, any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>>();
                if (extractedQuery.subQuery == null || extractedQuery.subQuery.isEmpty()) {
                  childSelected.add(root);
                  callback(nextGeneration.toArray(new Array()));
                } else {
                  org.kevoree.modeling.api.util.Helper.forall(nextGeneration.toArray(new Array()),                    (kObject : org.kevoree.modeling.api.KObject<any, any>, next : (a : java.lang.Throwable) => void) => {
                  org.kevoree.modeling.api.select.KSelector.select(kObject, extractedQuery.subQuery,                    (kObjects : org.kevoree.modeling.api.KObject<any, any>[]) => {
                  childSelected.addAll(childSelected);
                  }
);
                  }
,                    (throwable : java.lang.Throwable) => {
                  callback(childSelected.toArray(new Array()));
                  }
);
                }
                }
);
              }
            }

          }

        }
        export interface ThrowableCallback<A> {

          on(a: A, error: java.lang.Throwable): void;

        }

        export module time {
          export class DefaultTimeTree implements org.kevoree.modeling.api.time.TimeTree {

            public dirty: boolean = true;
            public versionTree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
            public walk(walker: (timePoint : number) => void): void {
              this.walkAsc(walker);
            }

            public walkAsc(walker: (timePoint : number) => void): void {
              var elem: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.first();
              while (elem != null){
                walker(elem.getKey());
                elem = elem.next();
              }
            }

            public walkDesc(walker: (timePoint : number) => void): void {
              var elem: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.last();
              while (elem != null){
                walker(elem.getKey());
                elem = elem.previous();
              }
            }

            public walkRangeAsc(walker: (timePoint : number) => void, from: number, to: number): void {
              var from2: number = from;
              var to2: number = to;
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

            public walkRangeDesc(walker: (timePoint : number) => void, from: number, to: number): void {
              var from2: number = from;
              var to2: number = to;
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

            public insert(time: number): org.kevoree.modeling.api.time.TimeTree {
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
              public static _ColorVALUES : Color[] = [
                Color.RED
                ,Color.BLACK
              ];
              public static values():Color[]{
                return Color._ColorVALUES;
              }
            }

            export class RBTree {

              public root: org.kevoree.modeling.api.time.rbtree.TreeNode = null;
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
                this.root = new org.kevoree.modeling.api.time.rbtree.ReaderContext(i, payload).unserialize(true);
              }

              public previousOrEqual(key: number): org.kevoree.modeling.api.time.rbtree.TreeNode {
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

              public nextOrEqual(key: number): org.kevoree.modeling.api.time.rbtree.TreeNode {
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

              public previous(key: number): org.kevoree.modeling.api.time.rbtree.TreeNode {
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

              public previousWhileNot(key: number, until: org.kevoree.modeling.api.time.rbtree.State): org.kevoree.modeling.api.time.rbtree.TreeNode {
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

              public next(key: number): org.kevoree.modeling.api.time.rbtree.TreeNode {
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

              public nextWhileNot(key: number, until: org.kevoree.modeling.api.time.rbtree.State): org.kevoree.modeling.api.time.rbtree.TreeNode {
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

              public firstWhileNot(key: number, until: org.kevoree.modeling.api.time.rbtree.State): org.kevoree.modeling.api.time.rbtree.TreeNode {
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

              public lastWhileNot(key: number, until: org.kevoree.modeling.api.time.rbtree.State): org.kevoree.modeling.api.time.rbtree.TreeNode {
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

              private lookupNode(key: number): org.kevoree.modeling.api.time.rbtree.TreeNode {
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

              public lookup(key: number): org.kevoree.modeling.api.time.rbtree.State {
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

              public insert(key: number, value: org.kevoree.modeling.api.time.rbtree.State): void {
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

              public delete(key: number): void {
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

            }

            export class ReaderContext {

              private payload: string;
              private offset: number;
              constructor(offset: number, payload: string) {
                this.offset = offset;
                this.payload = payload;
              }

              public unserialize(rightBranch: boolean): org.kevoree.modeling.api.time.rbtree.TreeNode {
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
                var p: org.kevoree.modeling.api.time.rbtree.TreeNode = new org.kevoree.modeling.api.time.rbtree.TreeNode(java.lang.Long.parseLong(tokenBuild.toString()), state, color, null, null);
                var left: org.kevoree.modeling.api.time.rbtree.TreeNode = this.unserialize(false);
                if (left != null) {
                  left.setParent(p);
                }
                var right: org.kevoree.modeling.api.time.rbtree.TreeNode = this.unserialize(true);
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
              public static _StateVALUES : State[] = [
                State.EXISTS
                ,State.DELETED
              ];
              public static values():State[]{
                return State._StateVALUES;
              }
            }

            export class TreeNode {

              public static BLACK_DELETE: string = '0';
              public static BLACK_EXISTS: string = '1';
              public static RED_DELETE: string = '2';
              public static RED_EXISTS: string = '3';
              public key: number;
              public value: org.kevoree.modeling.api.time.rbtree.State;
              public color: org.kevoree.modeling.api.time.rbtree.Color;
              private left: org.kevoree.modeling.api.time.rbtree.TreeNode;
              private right: org.kevoree.modeling.api.time.rbtree.TreeNode;
              private parent: org.kevoree.modeling.api.time.rbtree.TreeNode = null;
              public getKey(): number {
                return this.key;
              }

              constructor(key: number, value: org.kevoree.modeling.api.time.rbtree.State, color: org.kevoree.modeling.api.time.rbtree.Color, left: org.kevoree.modeling.api.time.rbtree.TreeNode, right: org.kevoree.modeling.api.time.rbtree.TreeNode) {
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

            }

          }
          export interface TimeTree {

            walk(walker: (timePoint : number) => void): void;

            walkAsc(walker: (timePoint : number) => void): void;

            walkDesc(walker: (timePoint : number) => void): void;

            walkRangeAsc(walker: (timePoint : number) => void, from: number, to: number): void;

            walkRangeDesc(walker: (timePoint : number) => void, from: number, to: number): void;

            first(): number;

            last(): number;

            next(from: number): number;

            previous(from: number): number;

            resolve(time: number): number;

            insert(time: number): org.kevoree.modeling.api.time.TimeTree;

            isDirty(): boolean;

            size(): number;

          }

          export interface TimeWalker {

            walk(timePoint: number): void;

          }

        }
        export module trace {
          export class ModelAddTrace implements org.kevoree.modeling.api.trace.ModelTrace {

            private reference: org.kevoree.modeling.api.meta.MetaReference;
            private traceType: org.kevoree.modeling.api.KActionType = org.kevoree.modeling.api.KActionType.ADD;
            private srcKID: number;
            private previousKID: number;
            private metaClass: org.kevoree.modeling.api.meta.MetaClass;
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
              org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.srcKID + "");
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              if (this.reference != null) {
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.meta);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                buffer.append(this.reference.metaName());
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              }
              if (this.previousKID != null) {
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.previouspath);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.previousKID + "");
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              }
              if (this.metaClass != null) {
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.typename);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.metaClass.metaName());
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              }
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.closeJSON);
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

          export class ModelRemoveTrace implements org.kevoree.modeling.api.trace.ModelTrace {

            private traceType: org.kevoree.modeling.api.KActionType = org.kevoree.modeling.api.KActionType.REMOVE;
            private srcKID: number;
            private objKID: number;
            private reference: org.kevoree.modeling.api.meta.MetaReference;
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
              org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.srcKID + "");
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.meta);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              buffer.append(this.reference.metaName());
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.objpath);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.objKID + "");
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.closeJSON);
              return buffer.toString();
            }

          }

          export class ModelSetTrace implements org.kevoree.modeling.api.trace.ModelTrace {

            private traceType: org.kevoree.modeling.api.KActionType = org.kevoree.modeling.api.KActionType.SET;
            private srcKID: number;
            private attribute: org.kevoree.modeling.api.meta.MetaAttribute;
            private content: any;
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
              org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.srcKID + "");
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.meta);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              buffer.append(this.attribute.metaName());
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              if (this.content != null) {
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.content);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.content.toString());
                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
              }
              buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.closeJSON);
              return buffer.toString();
            }

          }

          export interface ModelTrace {

            getMeta(): org.kevoree.modeling.api.meta.Meta;

            getTraceType(): org.kevoree.modeling.api.KActionType;

            getSrcKID(): number;

          }

          export class ModelTraceApplicator {

            private targetModel: org.kevoree.modeling.api.KObject<any, any>;
            private pendingObj: org.kevoree.modeling.api.KObject<any, any> = null;
            private pendingParent: org.kevoree.modeling.api.KObject<any, any> = null;
            private pendingParentRef: org.kevoree.modeling.api.meta.MetaReference = null;
            private pendingObjKID: number = null;
            constructor(targetModel: org.kevoree.modeling.api.KObject<any, any>) {
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

            public createOrAdd(previousPath: number, target: org.kevoree.modeling.api.KObject<any, any>, reference: org.kevoree.modeling.api.meta.MetaReference, metaClass: org.kevoree.modeling.api.meta.MetaClass, callback: (a : java.lang.Throwable) => void): void {
              if (previousPath != null) {
                this.targetModel.view().lookup(previousPath,                  (targetElem : org.kevoree.modeling.api.KObject<any, any>) => {
                if (targetElem != null) {
                  target.mutate(org.kevoree.modeling.api.KActionType.ADD, reference, targetElem, true);
                  callback(null);
                } else {
                  if (metaClass == null) {
                    callback(new java.lang.Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
                  } else {
                    this.pendingObj = this.targetModel.view().createFQN(metaClass.metaName());
                    this.pendingObjKID = previousPath;
                    this.pendingParentRef = reference;
                    this.pendingParent = target;
                    callback(null);
                  }
                }
                }
);
              } else {
                if (metaClass == null) {
                  callback(new java.lang.Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
                } else {
                  this.pendingObj = this.targetModel.view().createFQN(metaClass.metaName());
                  this.pendingObjKID = previousPath;
                  this.pendingParentRef = reference;
                  this.pendingParent = target;
                  callback(null);
                }
              }
            }

            public applyTraceSequence(traceSeq: org.kevoree.modeling.api.trace.TraceSequence, callback: (a : java.lang.Throwable) => void): void {
              org.kevoree.modeling.api.util.Helper.forall(traceSeq.traces(),                (modelTrace : org.kevoree.modeling.api.trace.ModelTrace, next : (a : java.lang.Throwable) => void) => {
              this.applyTrace(modelTrace, next);
              }
,                (throwable : java.lang.Throwable) => {
              if (throwable != null) {
                callback(throwable);
              } else {
                this.tryClosePending(null);
                callback(null);
              }
              }
);
            }

            public applyTrace(trace: org.kevoree.modeling.api.trace.ModelTrace, callback: (a : java.lang.Throwable) => void): void {
              if (trace instanceof org.kevoree.modeling.api.trace.ModelAddTrace) {
                var addTrace: org.kevoree.modeling.api.trace.ModelAddTrace = <org.kevoree.modeling.api.trace.ModelAddTrace>trace;
                this.tryClosePending(null);
                this.targetModel.view().lookup(trace.getSrcKID(),                  (resolvedTarget : org.kevoree.modeling.api.KObject<any, any>) => {
                if (resolvedTarget == null) {
                  callback(new java.lang.Exception("Add Trace source not found for path : " + trace.getSrcKID() + " pending " + this.pendingObjKID + "\n" + trace.toString()));
                } else {
                  this.createOrAdd(addTrace.getPreviousKID(), resolvedTarget, <org.kevoree.modeling.api.meta.MetaReference>trace.getMeta(), addTrace.getMetaClass(), callback);
                }
                }
);
              } else {
                if (trace instanceof org.kevoree.modeling.api.trace.ModelRemoveTrace) {
                  var removeTrace: org.kevoree.modeling.api.trace.ModelRemoveTrace = <org.kevoree.modeling.api.trace.ModelRemoveTrace>trace;
                  this.tryClosePending(trace.getSrcKID());
                  this.targetModel.view().lookup(trace.getSrcKID(),                    (targetElem : org.kevoree.modeling.api.KObject<any, any>) => {
                  if (targetElem != null) {
                    this.targetModel.view().lookup(removeTrace.getObjKID(),                      (remoteObj : org.kevoree.modeling.api.KObject<any, any>) => {
                    targetElem.mutate(org.kevoree.modeling.api.KActionType.REMOVE, <org.kevoree.modeling.api.meta.MetaReference>trace.getMeta(), remoteObj, true);
                    callback(null);
                    }
);
                  } else {
                    callback(null);
                  }
                  }
);
                } else {
                  if (trace instanceof org.kevoree.modeling.api.trace.ModelSetTrace) {
                    var setTrace: org.kevoree.modeling.api.trace.ModelSetTrace = <org.kevoree.modeling.api.trace.ModelSetTrace>trace;
                    this.tryClosePending(trace.getSrcKID());
                    if (!trace.getSrcKID().equals(this.pendingObjKID)) {
                      this.targetModel.view().lookup(trace.getSrcKID(),                        (tempObject : org.kevoree.modeling.api.KObject<any, any>) => {
                      if (tempObject == null) {
                        callback(new java.lang.Exception("Set Trace source not found for path : " + trace.getSrcKID() + " pending " + this.pendingObjKID + "\n" + trace.toString()));
                      } else {
                        tempObject.set(<org.kevoree.modeling.api.meta.MetaAttribute>setTrace.getMeta(), setTrace.getContent());
                        callback(null);
                      }
                      }
);
                    } else {
                      if (this.pendingObj == null) {
                        callback(new java.lang.Exception("Set Trace source not found for path : " + trace.getSrcKID() + " pending " + this.pendingObjKID + "\n" + trace.toString()));
                      } else {
                        this.pendingObj.set(<org.kevoree.modeling.api.meta.MetaAttribute>setTrace.getMeta(), setTrace.getContent());
                        callback(null);
                      }
                    }
                  } else {
                    callback(new java.lang.Exception("Unknow trace " + trace));
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

            public parse(addtracesTxt: string): org.kevoree.modeling.api.trace.TraceSequence {
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
                  var traceTypeRead: string = keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.traceType.toString());
                  if (traceTypeRead.equals(org.kevoree.modeling.api.KActionType.SET.toString())) {
                    var srcFound: string = keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.src.toString());
                    srcFound = org.kevoree.modeling.api.json.JsonString.unescape(srcFound);
                    this._traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(java.lang.Long.parseLong(srcFound), new org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaAttribute(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.meta.toString())), org.kevoree.modeling.api.json.JsonString.unescape(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.content.toString()))));
                  }
                  if (traceTypeRead.equals(org.kevoree.modeling.api.KActionType.ADD.toString())) {
                    var srcFound: string = keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.src.toString());
                    srcFound = org.kevoree.modeling.api.json.JsonString.unescape(srcFound);
                    this._traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(java.lang.Long.parseLong(srcFound), new org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaReference(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.meta.toString())), java.lang.Long.parseLong(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.previouspath.toString())), new org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaClass(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.typename.toString()))));
                  }
                  if (traceTypeRead.equals(org.kevoree.modeling.api.KActionType.REMOVE.toString())) {
                    var srcFound: string = keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.src.toString());
                    srcFound = org.kevoree.modeling.api.json.JsonString.unescape(srcFound);
                    this._traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(java.lang.Long.parseLong(srcFound), new org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaReference(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.meta.toString())), java.lang.Long.parseLong(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.objpath.toString()))));
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

            public applyOn(target: org.kevoree.modeling.api.KObject<any, any>, callback: (a : java.lang.Throwable) => void): boolean {
              var traceApplicator: org.kevoree.modeling.api.trace.ModelTraceApplicator = new org.kevoree.modeling.api.trace.ModelTraceApplicator(target);
              traceApplicator.applyTraceSequence(this, callback);
              return true;
            }

            public reverse(): org.kevoree.modeling.api.trace.TraceSequence {
              java.util.Collections.reverse(this._traces);
              return this;
            }

          }

          export module unresolved {
            export class UnresolvedMetaAttribute implements org.kevoree.modeling.api.meta.MetaAttribute {

              private _metaName: string;
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

              public strategy(): org.kevoree.modeling.api.extrapolation.Extrapolation {
                return null;
              }

              public precision(): number {
                return 0;
              }

              public setExtrapolation(extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation): void {
              }

              public metaName(): string {
                return this._metaName;
              }

              public index(): number {
                return -1;
              }

            }

            export class UnresolvedMetaClass implements org.kevoree.modeling.api.meta.MetaClass {

              private _metaName: string;
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

              private _metaName: string;
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
          public static _TraceRequestVALUES : TraceRequest[] = [
            TraceRequest.ATTRIBUTES_ONLY
            ,TraceRequest.REFERENCES_ONLY
            ,TraceRequest.ATTRIBUTES_REFERENCES
          ];
          public static values():TraceRequest[]{
            return TraceRequest._TraceRequestVALUES;
          }
        }

        export module util {
          export interface CallBackChain<A> {

            on(a: A, next: (a : java.lang.Throwable) => void): void;

          }

          export class Helper {

            public static pathSep: string = '/';
            private static pathIDOpen: string = '[';
            private static pathIDClose: string = ']';
            private static rootPath: string = "/";
            public static forall<A> (inputs: A[], each: (a : A, next : (a : java.lang.Throwable) => void) => void, end: (a : java.lang.Throwable) => void): void {
              if (inputs == null) {
                return;
              }
              org.kevoree.modeling.api.util.Helper.process(inputs, 0, each, end);
            }

            private static process<A> (arr: A[], index: number, each: (a : A, next : (a : java.lang.Throwable) => void) => void, end: (a : java.lang.Throwable) => void): void {
              if (index >= arr.length) {
                if (end != null) {
                  end(null);
                }
              } else {
                var obj: A = arr[index];
                each(obj,                  (err : java.lang.Throwable) => {
                if (err != null) {
                  if (end != null) {
                    end(err);
                  }
                } else {
                  org.kevoree.modeling.api.util.Helper.process(arr, index + 1, each, end);
                }
                }
);
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
              return path.length == 1 && path.charAt(0) == org.kevoree.modeling.api.util.Helper.pathSep;
            }

            public static path(parent: string, reference: org.kevoree.modeling.api.meta.MetaReference, target: org.kevoree.modeling.api.KObject<any, any>): string {
              if (org.kevoree.modeling.api.util.Helper.isRoot(parent)) {
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
          public static _VisitResultVALUES : VisitResult[] = [
            VisitResult.CONTINUE
            ,VisitResult.SKIP
            ,VisitResult.STOP
          ];
          public static values():VisitResult[]{
            return VisitResult._VisitResultVALUES;
          }
        }

        export module xmi {
          export class SerializationContext {

            public ignoreGeneratedID: boolean = false;
            public model: org.kevoree.modeling.api.KObject<any, any>;
            public finishCallback: (a : string, error : java.lang.Throwable) => void;
            public printer: java.lang.StringBuilder;
            public attributesVisitor: (metaAttribute : org.kevoree.modeling.api.meta.MetaAttribute, value : any) => void;
            public addressTable: java.util.HashMap<number, string> = new java.util.HashMap<number, string>();
            public elementsCount: java.util.HashMap<string, number> = new java.util.HashMap<string, number>();
            public packageList: java.util.ArrayList<string> = new java.util.ArrayList<string>();
          }

          export class XmiFormat implements org.kevoree.modeling.api.ModelFormat {

            private _view: org.kevoree.modeling.api.KView;
            constructor(p_view: org.kevoree.modeling.api.KView) {
              this._view = p_view;
            }

            public save(model: org.kevoree.modeling.api.KObject<any, any>, callback: (a : string, error : java.lang.Throwable) => void): void {
              org.kevoree.modeling.api.xmi.XMIModelSerializer.save(model, callback);
            }

            public load(payload: string, callback: (a : java.lang.Throwable) => void): void {
              org.kevoree.modeling.api.xmi.XMIModelLoader.load(this._view, payload, callback);
            }

          }

          export class XMILoadingContext {

            public xmiReader: org.kevoree.modeling.api.xmi.XmlParser;
            public loadedRoots: org.kevoree.modeling.api.KObject<any, any> = null;
            public resolvers: java.util.ArrayList<org.kevoree.modeling.api.xmi.XMIResolveCommand> = new java.util.ArrayList<org.kevoree.modeling.api.xmi.XMIResolveCommand>();
            public map: java.util.HashMap<string, org.kevoree.modeling.api.KObject<any, any>> = new java.util.HashMap<string, org.kevoree.modeling.api.KObject<any, any>>();
            public elementsCount: java.util.HashMap<string, number> = new java.util.HashMap<string, number>();
            public stats: java.util.HashMap<string, number> = new java.util.HashMap<string, number>();
            public oppositesAlreadySet: java.util.HashMap<string, boolean> = new java.util.HashMap<string, boolean>();
            public successCallback: (a : java.lang.Throwable) => void;
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

            public static load(p_view: org.kevoree.modeling.api.KView, str: string, callback: (a : java.lang.Throwable) => void): void {
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

            private static callFactory(p_view: org.kevoree.modeling.api.KView, ctx: org.kevoree.modeling.api.xmi.XMILoadingContext, objectType: string): org.kevoree.modeling.api.KObject<any, any> {
              var modelElem: org.kevoree.modeling.api.KObject<any, any> = null;
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

            private static loadObject(p_view: org.kevoree.modeling.api.KView, ctx: org.kevoree.modeling.api.xmi.XMILoadingContext, xmiAddress: string, objectType: string): org.kevoree.modeling.api.KObject<any, any> {
              var elementTagName: string = ctx.xmiReader.getLocalName();
              var modelElem: org.kevoree.modeling.api.KObject<any, any> = org.kevoree.modeling.api.xmi.XMIModelLoader.callFactory(p_view, ctx, objectType);
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
                      modelElem.set(kAttribute, org.kevoree.modeling.api.xmi.XMIModelLoader.unescapeXml(valueAtt));
                    } else {
                      var kreference: org.kevoree.modeling.api.meta.MetaReference = modelElem.metaReference(attrName);
                      if (kreference != null) {
                        var referenceArray: string[] = valueAtt.split(" ");
                        for (var j: number = 0; j < referenceArray.length; j++) {
                          var xmiRef: string = referenceArray[j];
                          var adjustedRef: string = (xmiRef.startsWith("#") ? xmiRef.substring(1) : xmiRef);
                          adjustedRef = adjustedRef.replace(".0", "");
                          var ref: org.kevoree.modeling.api.KObject<any, any> = ctx.map.get(adjustedRef);
                          if (ref != null) {
                            modelElem.mutate(org.kevoree.modeling.api.KActionType.ADD, kreference, ref, true);
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
                    var containedElement: org.kevoree.modeling.api.KObject<any, any> = org.kevoree.modeling.api.xmi.XMIModelLoader.loadObject(p_view, ctx, subElementId, subElemName);
                    modelElem.mutate(org.kevoree.modeling.api.KActionType.ADD, modelElem.metaReference(subElemName), containedElement, true);
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

            public static save(model: org.kevoree.modeling.api.KObject<any, any>, callback: (a : string, error : java.lang.Throwable) => void): void {
              var context: org.kevoree.modeling.api.xmi.SerializationContext = new org.kevoree.modeling.api.xmi.SerializationContext();
              context.model = model;
              context.finishCallback = callback;
              context.attributesVisitor =                (metaAttribute : org.kevoree.modeling.api.meta.MetaAttribute, value : any) => {
              if (value != null) {
                if (context.ignoreGeneratedID && metaAttribute.metaName().equals("generated_KMF_ID")) {
                  return;
                }
                context.printer.append(" " + metaAttribute.metaName() + "=\"");
                org.kevoree.modeling.api.xmi.XMIModelSerializer.escapeXml(context.printer, value.toString());
                context.printer.append("\"");
              }
              }
;
              context.printer = new java.lang.StringBuilder();
              context.addressTable.put(model.uuid(), "/");
              model.treeVisit(               (elem : org.kevoree.modeling.api.KObject<any, any>) => {
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
              }
,                (throwable : java.lang.Throwable) => {
              if (throwable != null) {
                context.finishCallback(null, throwable);
              } else {
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
                org.kevoree.modeling.api.util.Helper.forall(context.model.metaReferences(),                  (metaReference : org.kevoree.modeling.api.meta.MetaReference, next : (a : java.lang.Throwable) => void) => {
                org.kevoree.modeling.api.xmi.XMIModelSerializer.nonContainedReferencesCallbackChain(metaReference, next, context, context.model);
                }
,                  (err : java.lang.Throwable) => {
                if (err == null) {
                  context.printer.append(">\n");
                  org.kevoree.modeling.api.util.Helper.forall(context.model.metaReferences(),                    (metaReference : org.kevoree.modeling.api.meta.MetaReference, next : (a : java.lang.Throwable) => void) => {
                  org.kevoree.modeling.api.xmi.XMIModelSerializer.containedReferencesCallbackChain(metaReference, next, context, context.model);
                  }
,                    (containedRefsEnd : java.lang.Throwable) => {
                  if (containedRefsEnd == null) {
                    context.printer.append("</" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_") + ">\n");
                    context.finishCallback(context.printer.toString(), null);
                  } else {
                    context.finishCallback(null, containedRefsEnd);
                  }
                  }
);
                } else {
                  context.finishCallback(null, err);
                }
                }
);
              }
              }
);
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

            private static nonContainedReferencesCallbackChain(ref: org.kevoree.modeling.api.meta.MetaReference, next: (a : java.lang.Throwable) => void, p_context: org.kevoree.modeling.api.xmi.SerializationContext, p_currentElement: org.kevoree.modeling.api.KObject<any, any>): void {
              if (!ref.contained()) {
                var value: string[] = new Array();
                value[0] = "";
                p_currentElement.each(ref,                  (o : any) => {
                var adjustedAddress: string = p_context.addressTable.get((<org.kevoree.modeling.api.KObject<any, any>>o).uuid());
                value[0] = (value[0].equals("") ? adjustedAddress : value[0] + " " + adjustedAddress);
                }
,                  (end : java.lang.Throwable) => {
                if (end == null) {
                  if (value[0] != null) {
                    p_context.printer.append(" " + ref.metaName() + "=\"" + value[0] + "\"");
                  }
                }
                next(end);
                }
);
              } else {
                next(null);
              }
            }

            private static containedReferencesCallbackChain(ref: org.kevoree.modeling.api.meta.MetaReference, nextReference: (a : java.lang.Throwable) => void, context: org.kevoree.modeling.api.xmi.SerializationContext, currentElement: org.kevoree.modeling.api.KObject<any, any>): void {
              if (ref.contained()) {
                currentElement.each(ref,                  (o : any) => {
                var elem: org.kevoree.modeling.api.KObject<any, any> = <org.kevoree.modeling.api.KObject<any, any>>o;
                context.printer.append("<");
                context.printer.append(ref.metaName());
                context.printer.append(" xsi:type=\"" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(elem.metaClass().metaName()) + "\"");
                elem.visitAttributes(context.attributesVisitor);
                org.kevoree.modeling.api.util.Helper.forall(elem.metaReferences(),                  (metaReference : org.kevoree.modeling.api.meta.MetaReference, next : (a : java.lang.Throwable) => void) => {
                org.kevoree.modeling.api.xmi.XMIModelSerializer.nonContainedReferencesCallbackChain(metaReference, next, context, elem);
                }
,                  (err : java.lang.Throwable) => {
                if (err == null) {
                  context.printer.append(">\n");
                  org.kevoree.modeling.api.util.Helper.forall(elem.metaReferences(),                    (metaReference : org.kevoree.modeling.api.meta.MetaReference, next : (a : java.lang.Throwable) => void) => {
                  org.kevoree.modeling.api.xmi.XMIModelSerializer.containedReferencesCallbackChain(metaReference, next, context, elem);
                  }
,                    (containedRefsEnd : java.lang.Throwable) => {
                  if (containedRefsEnd == null) {
                    context.printer.append("</");
                    context.printer.append(ref.metaName());
                    context.printer.append('>');
                    context.printer.append("\n");
                  }
                  }
);
                } else {
                  context.finishCallback(null, err);
                }
                }
);
                }
,                  (throwable : java.lang.Throwable) => {
                nextReference(null);
                }
);
              } else {
                nextReference(null);
              }
            }

          }

          export class XMIResolveCommand {

            private context: org.kevoree.modeling.api.xmi.XMILoadingContext;
            private target: org.kevoree.modeling.api.KObject<any, any>;
            private mutatorType: org.kevoree.modeling.api.KActionType;
            private refName: string;
            private ref: string;
            constructor(context: org.kevoree.modeling.api.xmi.XMILoadingContext, target: org.kevoree.modeling.api.KObject<any, any>, mutatorType: org.kevoree.modeling.api.KActionType, refName: string, ref: string) {
              this.context = context;
              this.target = target;
              this.mutatorType = mutatorType;
              this.refName = refName;
              this.ref = ref;
            }

            public run(): void {
              var referencedElement: org.kevoree.modeling.api.KObject<any, any> = this.context.map.get(this.ref);
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
      export module microframework {
        export module test {
          export class CallbackTester {

            public callbackTest(): void {
              var big: string[] = new Array();
              for (var i: number = 0; i < big.length; i++) {
                big[i] = "say_" + i;
              }
              org.kevoree.modeling.api.util.Helper.forall(big,                (s : string, next : (a : java.lang.Throwable) => void) => {
              System.out.println(s);
              next(null);
              }
,                (t : java.lang.Throwable) => {
              System.out.println("End !");
              }
);
            }

          }

          export module cloud {
            export class CloudDimension extends org.kevoree.modeling.api.abs.AbstractKDimension<any, any, any> {

              constructor(univers: org.kevoree.modeling.api.KUniverse<any>, key: number) {
                super(univers, key);
              }

              public internal_create(timePoint: number): org.kevoree.modeling.microframework.test.cloud.CloudView {
                return new org.kevoree.modeling.microframework.test.cloud.impl.CloudViewImpl(timePoint, this);
              }

            }

            export class CloudUniverse extends org.kevoree.modeling.api.abs.AbstractKUniverse<any> {

              constructor(kDataBase: org.kevoree.modeling.api.data.KDataBase) {
                super(kDataBase);
              }

              public internal_create(key: number): org.kevoree.modeling.microframework.test.cloud.CloudDimension {
                return new org.kevoree.modeling.microframework.test.cloud.CloudDimension(this, key);
              }

            }

            export interface CloudView extends org.kevoree.modeling.api.KView {

              createNode(): org.kevoree.modeling.microframework.test.cloud.Node;

              createElement(): org.kevoree.modeling.microframework.test.cloud.Element;

            }

            export module CloudView { 
              export class METACLASSES implements org.kevoree.modeling.api.meta.MetaClass {

                public static ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE: METACLASSES = new METACLASSES("org.kevoree.modeling.microframework.test.cloud.Node", 0);
                public static ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT: METACLASSES = new METACLASSES("org.kevoree.modeling.microframework.test.cloud.Element", 1);
                private _name: string;
                private _index: number;
                public index(): number {
                  return this._index;
                }

                public metaName(): string {
                  return this._name;
                }

                constructor(name: string, index: number) {
                  this._name = name;
                  this._index = index;
                }

                public equals(other: any): boolean {
                  return this == other;
                }
                public static _METACLASSESVALUES : METACLASSES[] = [
                  METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE
                  ,METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT
                ];
                public static values():METACLASSES[]{
                  return METACLASSES._METACLASSESVALUES;
                }
              }


            }
            export interface Element extends org.kevoree.modeling.api.KObject<any, any> {

              getName(): string;

              setName(name: string): org.kevoree.modeling.microframework.test.cloud.Element;

              getValue(): number;

              setValue(name: number): org.kevoree.modeling.microframework.test.cloud.Element;

            }

            export module Element { 
              export class METAATTRIBUTES implements org.kevoree.modeling.api.meta.MetaAttribute {

                public static NAME: METAATTRIBUTES = new METAATTRIBUTES("name", 2, 5, true, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                public static VALUE: METAATTRIBUTES = new METAATTRIBUTES("value", 3, 5, false, org.kevoree.modeling.api.meta.MetaType.DOUBLE, org.kevoree.modeling.api.extrapolation.PolynomialExtrapolation.instance());
                private _name: string;
                private _index: number;
                private _precision: number;
                private _key: boolean;
                private _metaType: org.kevoree.modeling.api.meta.MetaType;
                private extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation;
                public metaType(): org.kevoree.modeling.api.meta.MetaType {
                  return this._metaType;
                }

                public index(): number {
                  return this._index;
                }

                public metaName(): string {
                  return this._name;
                }

                public precision(): number {
                  return this._precision;
                }

                public key(): boolean {
                  return this._key;
                }

                public origin(): org.kevoree.modeling.api.meta.MetaClass {
                  return org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT;
                }

                public strategy(): org.kevoree.modeling.api.extrapolation.Extrapolation {
                  return this.extrapolation;
                }

                public setExtrapolation(extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation): void {
                  this.extrapolation = extrapolation;
                }

                constructor(name: string, index: number, precision: number, key: boolean, metaType: org.kevoree.modeling.api.meta.MetaType, extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation) {
                  this._name = name;
                  this._index = index;
                  this._precision = precision;
                  this._key = key;
                  this._metaType = metaType;
                  this.extrapolation = extrapolation;
                }

                public equals(other: any): boolean {
                  return this == other;
                }
                public static _METAATTRIBUTESVALUES : METAATTRIBUTES[] = [
                  METAATTRIBUTES.NAME
                  ,METAATTRIBUTES.VALUE
                ];
                public static values():METAATTRIBUTES[]{
                  return METAATTRIBUTES._METAATTRIBUTESVALUES;
                }
              }


            }
            export module impl {
              export class CloudViewImpl extends org.kevoree.modeling.api.abs.AbstractKView implements org.kevoree.modeling.microframework.test.cloud.CloudView {

                constructor(now: number, dimension: org.kevoree.modeling.api.KDimension<any, any, any>) {
                  super(now, dimension);
                }

                public internalCreate(p_clazz: org.kevoree.modeling.api.meta.MetaClass, p_timeTree: org.kevoree.modeling.api.time.TimeTree, p_key: number): org.kevoree.modeling.api.KObject<any, any> {
                  if (p_clazz == null) {
                    return null;
                  }
                  switch (p_clazz.index()) {
                    case 0: 
                    return this.manageCache(new org.kevoree.modeling.microframework.test.cloud.impl.NodeImpl(this, org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE, p_key, this.now(), this.dimension(), p_timeTree));
                    case 1: 
                    return this.manageCache(new org.kevoree.modeling.microframework.test.cloud.impl.ElementImpl(this, org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT, p_key, this.now(), this.dimension(), p_timeTree));
                    default: 
                    return null;
                  }
                }

                public metaClasses(): org.kevoree.modeling.api.meta.MetaClass[] {
                  return org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.values();
                }

                public createNode(): org.kevoree.modeling.microframework.test.cloud.Node {
                  return <org.kevoree.modeling.microframework.test.cloud.Node>this.create(org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE);
                }

                public createElement(): org.kevoree.modeling.microframework.test.cloud.Element {
                  return <org.kevoree.modeling.microframework.test.cloud.Element>this.create(org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT);
                }

              }

              export class ElementImpl extends org.kevoree.modeling.api.abs.AbstractKObject<any, any> implements org.kevoree.modeling.microframework.test.cloud.Element {

                private _mataReferences: org.kevoree.modeling.api.meta.MetaReference[] = new Array();
                constructor(factory: org.kevoree.modeling.microframework.test.cloud.CloudView, metaClass: org.kevoree.modeling.api.meta.MetaClass, kid: number, now: number, dimension: org.kevoree.modeling.api.KDimension<any, any, any>, timeTree: org.kevoree.modeling.api.time.TimeTree) {
                  super(factory, metaClass, kid, now, dimension, timeTree);
                }

                public metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[] {
                  return org.kevoree.modeling.microframework.test.cloud.Element.METAATTRIBUTES.values();
                }

                public metaReferences(): org.kevoree.modeling.api.meta.MetaReference[] {
                  return this._mataReferences;
                }

                public metaOperations(): org.kevoree.modeling.api.meta.MetaOperation[] {
                  return new Array();
                }

                public getName(): string {
                  return <string>this.get(org.kevoree.modeling.microframework.test.cloud.Element.METAATTRIBUTES.NAME);
                }

                public setName(p_name: string): org.kevoree.modeling.microframework.test.cloud.Element {
                  this.set(org.kevoree.modeling.microframework.test.cloud.Element.METAATTRIBUTES.NAME, p_name);
                  return this;
                }

                public getValue(): number {
                  return <number>this.get(org.kevoree.modeling.microframework.test.cloud.Element.METAATTRIBUTES.VALUE);
                }

                public setValue(p_name: number): org.kevoree.modeling.microframework.test.cloud.Element {
                  this.set(org.kevoree.modeling.microframework.test.cloud.Element.METAATTRIBUTES.VALUE, p_name);
                  return this;
                }

              }

              export class NodeImpl extends org.kevoree.modeling.api.abs.AbstractKObject<any, any> implements org.kevoree.modeling.microframework.test.cloud.Node {

                constructor(p_factory: org.kevoree.modeling.microframework.test.cloud.CloudView, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_uuid: number, p_now: number, p_dimension: org.kevoree.modeling.api.KDimension<any, any, any>, p_timeTree: org.kevoree.modeling.api.time.TimeTree) {
                  super(p_factory, p_metaClass, p_uuid, p_now, p_dimension, p_timeTree);
                }

                public metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[] {
                  return org.kevoree.modeling.microframework.test.cloud.Node.METAATTRIBUTES.values();
                }

                public metaReferences(): org.kevoree.modeling.api.meta.MetaReference[] {
                  return org.kevoree.modeling.microframework.test.cloud.Node.METAREFERENCES.values();
                }

                public metaOperations(): org.kevoree.modeling.api.meta.MetaOperation[] {
                  return org.kevoree.modeling.microframework.test.cloud.Node.METAOPERATION.values();
                }

                public getName(): string {
                  return <string>this.get(org.kevoree.modeling.microframework.test.cloud.Node.METAATTRIBUTES.NAME);
                }

                public setName(p_name: string): org.kevoree.modeling.microframework.test.cloud.Node {
                  this.set(org.kevoree.modeling.microframework.test.cloud.Node.METAATTRIBUTES.NAME, p_name);
                  return this;
                }

                public getValue(): string {
                  return <string>this.get(org.kevoree.modeling.microframework.test.cloud.Node.METAATTRIBUTES.VALUE);
                }

                public setValue(p_value: string): org.kevoree.modeling.microframework.test.cloud.Node {
                  this.set(org.kevoree.modeling.microframework.test.cloud.Node.METAATTRIBUTES.VALUE, p_value);
                  return this;
                }

                public addChildren(p_obj: org.kevoree.modeling.microframework.test.cloud.Node): org.kevoree.modeling.microframework.test.cloud.Node {
                  this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.modeling.microframework.test.cloud.Node.METAREFERENCES.CHILDREN, p_obj, true);
                  return this;
                }

                public removeChildren(p_obj: org.kevoree.modeling.microframework.test.cloud.Node): org.kevoree.modeling.microframework.test.cloud.Node {
                  this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.modeling.microframework.test.cloud.Node.METAREFERENCES.CHILDREN, p_obj, true);
                  return this;
                }

                public eachChildren(p_callback: (a : org.kevoree.modeling.microframework.test.cloud.Node) => void, p_end: (a : java.lang.Throwable) => void): void {
                  this.each(org.kevoree.modeling.microframework.test.cloud.Node.METAREFERENCES.CHILDREN, p_callback, p_end);
                }

                public setElement(p_obj: org.kevoree.modeling.microframework.test.cloud.Element): org.kevoree.modeling.microframework.test.cloud.Node {
                  this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.modeling.microframework.test.cloud.Node.METAREFERENCES.ELEMENT, p_obj, true);
                  return this;
                }

                public getElement(p_callback: (a : org.kevoree.modeling.microframework.test.cloud.Element) => void): void {
                  this.each(org.kevoree.modeling.microframework.test.cloud.Node.METAREFERENCES.ELEMENT, p_callback, null);
                }

                public trigger(param: string, callback: (a : string) => void): void {
                }

              }

            }
            export interface Node extends org.kevoree.modeling.api.KObject<any, any> {

              getName(): string;

              setName(name: string): org.kevoree.modeling.microframework.test.cloud.Node;

              getValue(): string;

              setValue(name: string): org.kevoree.modeling.microframework.test.cloud.Node;

              addChildren(obj: org.kevoree.modeling.microframework.test.cloud.Node): org.kevoree.modeling.microframework.test.cloud.Node;

              removeChildren(obj: org.kevoree.modeling.microframework.test.cloud.Node): org.kevoree.modeling.microframework.test.cloud.Node;

              eachChildren(callback: (a : org.kevoree.modeling.microframework.test.cloud.Node) => void, end: (a : java.lang.Throwable) => void): void;

              setElement(obj: org.kevoree.modeling.microframework.test.cloud.Element): org.kevoree.modeling.microframework.test.cloud.Node;

              getElement(obj: (a : org.kevoree.modeling.microframework.test.cloud.Element) => void): void;

              trigger(param: string, callback: (a : string) => void): void;

            }

            export module Node { 
              export class METAATTRIBUTES implements org.kevoree.modeling.api.meta.MetaAttribute {

                public static NAME: METAATTRIBUTES = new METAATTRIBUTES("name", 2, 5, true, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                public static VALUE: METAATTRIBUTES = new METAATTRIBUTES("value", 3, 5, false, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                private _name: string;
                private _index: number;
                private _precision: number;
                private _key: boolean;
                private _metaType: org.kevoree.modeling.api.meta.MetaType;
                private extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation;
                public metaType(): org.kevoree.modeling.api.meta.MetaType {
                  return this._metaType;
                }

                public origin(): org.kevoree.modeling.api.meta.MetaClass {
                  return org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE;
                }

                public index(): number {
                  return this._index;
                }

                public metaName(): string {
                  return this._name;
                }

                public precision(): number {
                  return this._precision;
                }

                public key(): boolean {
                  return this._key;
                }

                public strategy(): org.kevoree.modeling.api.extrapolation.Extrapolation {
                  return this.extrapolation;
                }

                public setExtrapolation(extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation): void {
                  this.extrapolation = extrapolation;
                }

                constructor(name: string, index: number, precision: number, key: boolean, metaType: org.kevoree.modeling.api.meta.MetaType, extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation) {
                  this._name = name;
                  this._index = index;
                  this._precision = precision;
                  this._key = key;
                  this._metaType = metaType;
                  this.extrapolation = extrapolation;
                }

                public equals(other: any): boolean {
                  return this == other;
                }
                public static _METAATTRIBUTESVALUES : METAATTRIBUTES[] = [
                  METAATTRIBUTES.NAME
                  ,METAATTRIBUTES.VALUE
                ];
                public static values():METAATTRIBUTES[]{
                  return METAATTRIBUTES._METAATTRIBUTESVALUES;
                }
              }


              export class METAREFERENCES implements org.kevoree.modeling.api.meta.MetaReference {

                public static CHILDREN: METAREFERENCES = new METAREFERENCES("children", 4, true, false, org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE, null);
                public static ELEMENT: METAREFERENCES = new METAREFERENCES("element", 5, true, true, org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT, null);
                private _name: string;
                private _index: number;
                private _contained: boolean;
                private _single: boolean;
                private _metaType: org.kevoree.modeling.api.meta.MetaClass;
                private _opposite: org.kevoree.modeling.api.meta.MetaReference;
                public single(): boolean {
                  return this._single;
                }

                public metaType(): org.kevoree.modeling.api.meta.MetaClass {
                  return this._metaType;
                }

                public opposite(): org.kevoree.modeling.api.meta.MetaReference {
                  return this._opposite;
                }

                public index(): number {
                  return this._index;
                }

                public metaName(): string {
                  return this._name;
                }

                public contained(): boolean {
                  return this._contained;
                }

                public origin(): org.kevoree.modeling.api.meta.MetaClass {
                  return org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE;
                }

                constructor(name: string, index: number, contained: boolean, single: boolean, metaType: org.kevoree.modeling.api.meta.MetaClass, opposite: org.kevoree.modeling.api.meta.MetaReference) {
                  this._name = name;
                  this._index = index;
                  this._contained = contained;
                  this._single = single;
                  this._metaType = metaType;
                  this._opposite = opposite;
                }

                public equals(other: any): boolean {
                  return this == other;
                }
                public static _METAREFERENCESVALUES : METAREFERENCES[] = [
                  METAREFERENCES.CHILDREN
                  ,METAREFERENCES.ELEMENT
                ];
                public static values():METAREFERENCES[]{
                  return METAREFERENCES._METAREFERENCESVALUES;
                }
              }


              export class METAOPERATION implements org.kevoree.modeling.api.meta.MetaOperation {

                public static TRIGGER: METAOPERATION = new METAOPERATION("trigger", 6);
                private _name: string;
                private _index: number;
                public index(): number {
                  return this._index;
                }

                public metaName(): string {
                  return this._name;
                }

                public origin(): org.kevoree.modeling.api.meta.MetaClass {
                  return org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE;
                }

                constructor(name: string, index: number) {
                  this._name = name;
                  this._index = index;
                }

                public equals(other: any): boolean {
                  return this == other;
                }
                public static _METAOPERATIONVALUES : METAOPERATION[] = [
                  METAOPERATION.TRIGGER
                ];
                public static values():METAOPERATION[]{
                  return METAOPERATION._METAOPERATIONVALUES;
                }
              }


            }
          }
          export class CompareTest {

            public diffTest(): void {
              var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
              universe.newDimension(               (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
              org.junit.Assert.assertNotNull(dimension0);
              var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
              var node0_0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
              node0_0.setName("node0_0");
              node0_0.setValue("0_0");
              var node0_1: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
              node0_1.setName("node0_1");
              node0_1.setValue("0_1");
              t0.diff(node0_0, node0_1,                (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
              org.junit.Assert.assertNotEquals(traceSequence.traces().length, 0);
              org.junit.Assert.assertEquals("[{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"name\",\"val\":\"node0_1\"},\n" + "{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"value\",\"val\":\"0_1\"}]", traceSequence.toString());
              }
);
              t0.diff(node0_0, node0_1,                (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
              new org.kevoree.modeling.api.trace.ModelTraceApplicator(node0_0).applyTraceSequence(traceSequence,                (throwable : java.lang.Throwable) => {
              org.junit.Assert.assertNull(throwable);
              t0.diff(node0_0, node0_1,                (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
              org.junit.Assert.assertEquals(traceSequence.traces().length, 0);
              }
);
              }
);
              }
);
              }
);
            }

            public intersectionTest(): void {
              var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
              universe.newDimension(               (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
              org.junit.Assert.assertNotNull(dimension0);
              var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
              var node0_0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
              node0_0.setName("node0_0");
              node0_0.setValue("0_0");
              var node0_1: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
              node0_1.setName("node0_1");
              node0_1.setValue("0_1");
              t0.intersection(node0_0, node0_1,                (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
              org.junit.Assert.assertEquals(traceSequence.traces().length, 0);
              }
);
              var node0_2: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
              node0_2.setName("node0_2");
              node0_2.setValue("0_1");
              t0.intersection(node0_2, node0_1,                (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
              org.junit.Assert.assertEquals(traceSequence.traces().length, 1);
              org.junit.Assert.assertEquals("[{\"type\":\"SET\",\"src\":\"3\",\"meta\":\"value\",\"val\":\"0_1\"}]", traceSequence.toString());
              }
);
              }
);
            }

            public unionTest(): void {
              var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
              universe.newDimension(               (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
              org.junit.Assert.assertNotNull(dimension0);
              var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
              var node0_0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
              node0_0.setName("node0_0");
              node0_0.setValue("0_0");
              var elem0_0: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
              elem0_0.setName("elem0_0");
              node0_0.setElement(elem0_0);
              var node0_1: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
              node0_1.setName("node0_1");
              node0_1.setValue("0_1");
              t0.merge(node0_0, node0_1,                (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
              org.junit.Assert.assertEquals("{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"name\",\"val\":\"node0_1\"}", traceSequence.traces()[0].toString());
              org.junit.Assert.assertEquals("{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"value\",\"val\":\"0_1\"}", traceSequence.traces()[1].toString());
              org.junit.Assert.assertEquals("{\"type\":\"ADD\",\"src\":\"1\",\"meta\":\"element\"}", traceSequence.traces()[2].toString());
              new org.kevoree.modeling.api.trace.ModelTraceApplicator(node0_0).applyTraceSequence(traceSequence,                (throwable : java.lang.Throwable) => {
              node0_0.getElement(               (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
              org.junit.Assert.assertEquals(elem0_0, element);
              }
);
              }
);
              }
);
              }
);
            }

          }

          export class HelloTest {

            public helloTest(): void {
              var univers: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
              univers.listen(               (evt : org.kevoree.modeling.api.KEvent) => {
              System.err.println(evt);
              }
);
              univers.newDimension(               (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
              org.junit.Assert.assertNotNull(dimension0);
              var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
              org.junit.Assert.assertNotNull(t0);
              org.junit.Assert.assertEquals(t0.now(), 0);
              var nodeT0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
              org.junit.Assert.assertNotNull(nodeT0);
              org.junit.Assert.assertNotNull(nodeT0.uuid());
              org.junit.Assert.assertNull(nodeT0.getName());
              org.junit.Assert.assertEquals("name=", nodeT0.domainKey());
              nodeT0.setName("node0");
              org.junit.Assert.assertEquals("node0", nodeT0.getName());
              org.junit.Assert.assertEquals("name=node0", nodeT0.domainKey());
              org.junit.Assert.assertEquals(0, nodeT0.now());
              var child0: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
              org.junit.Assert.assertNotNull(child0.timeTree());
              org.junit.Assert.assertTrue(child0.timeTree().last().equals(0));
              org.junit.Assert.assertTrue(child0.timeTree().first().equals(0));
              var nodeT1: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
              nodeT1.setName("n1");
              nodeT0.addChildren(nodeT1);
              var refs: java.util.Map<number, number> = <java.util.Map<number, number>>t0.dimension().universe().storage().raw(nodeT1, org.kevoree.modeling.api.data.AccessMode.READ)[1];
              org.junit.Assert.assertTrue(refs.containsKey(nodeT0.uuid()));
              var i: number[] = [0];
              nodeT0.eachChildren(               (n : org.kevoree.modeling.microframework.test.cloud.Node) => {
              i[0]++;
              }
, null);
              org.junit.Assert.assertEquals(1, i[0]);
              var nodeT3: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
              nodeT3.setName("n3");
              nodeT1.addChildren(nodeT3);
              i[0] = 0;
              var j: number[] = [0];
              nodeT0.visit(               (elem : org.kevoree.modeling.api.KObject<any, any>) => {
              i[0]++;
              return org.kevoree.modeling.api.VisitResult.CONTINUE;
              }
,                (t : java.lang.Throwable) => {
              j[0]++;
              }
);
              org.junit.Assert.assertEquals(1, i[0]);
              org.junit.Assert.assertEquals(1, j[0]);
              i[0] = 0;
              j[0] = 0;
              nodeT1.visit(               (elem : org.kevoree.modeling.api.KObject<any, any>) => {
              i[0]++;
              return org.kevoree.modeling.api.VisitResult.CONTINUE;
              }
,                (t : java.lang.Throwable) => {
              j[0]++;
              }
);
              org.junit.Assert.assertEquals(1, i[0]);
              org.junit.Assert.assertEquals(1, j[0]);
              i[0] = 0;
              j[0] = 0;
              nodeT3.visit(               (elem : org.kevoree.modeling.api.KObject<any, any>) => {
              i[0]++;
              return org.kevoree.modeling.api.VisitResult.CONTINUE;
              }
,                (t : java.lang.Throwable) => {
              j[0]++;
              }
);
              org.junit.Assert.assertEquals(0, i[0]);
              org.junit.Assert.assertEquals(1, j[0]);
              i[0] = 0;
              j[0] = 0;
              nodeT0.treeVisit(               (elem : org.kevoree.modeling.api.KObject<any, any>) => {
              i[0]++;
              return org.kevoree.modeling.api.VisitResult.CONTINUE;
              }
,                (t : java.lang.Throwable) => {
              j[0]++;
              }
);
              org.junit.Assert.assertEquals(2, i[0]);
              org.junit.Assert.assertEquals(1, j[0]);
              i[0] = 0;
              j[0] = 0;
              nodeT0.graphVisit(               (elem : org.kevoree.modeling.api.KObject<any, any>) => {
              i[0]++;
              return org.kevoree.modeling.api.VisitResult.CONTINUE;
              }
,                (t : java.lang.Throwable) => {
              j[0]++;
              }
);
              org.junit.Assert.assertEquals(2, i[0]);
              org.junit.Assert.assertEquals(1, j[0]);
              i[0] = 0;
              j[0] = 0;
              nodeT0.graphVisit(               (elem : org.kevoree.modeling.api.KObject<any, any>) => {
              i[0]++;
              return org.kevoree.modeling.api.VisitResult.CONTINUE;
              }
,                (t : java.lang.Throwable) => {
              j[0]++;
              }
);
              org.junit.Assert.assertEquals(2, i[0]);
              org.junit.Assert.assertEquals(1, j[0]);
              System.err.println(nodeT0);
              }
);
            }

          }

          export class HelperTest {

            public helperTest(): void {
              org.junit.Assert.assertNull(org.kevoree.modeling.api.util.Helper.parentPath("/"));
              org.junit.Assert.assertNull(org.kevoree.modeling.api.util.Helper.parentPath(null));
              org.junit.Assert.assertNull(org.kevoree.modeling.api.util.Helper.parentPath(""));
              org.junit.Assert.assertEquals("/", org.kevoree.modeling.api.util.Helper.parentPath("/nodes[name=n0]"));
              org.junit.Assert.assertEquals("/nodes[name=n0]", org.kevoree.modeling.api.util.Helper.parentPath("/nodes[name=n0]/children[name=c4]"));
            }

          }

          export module json {
            export class JSONLoadTest {

              public jsonTest(): void {
                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
                universe.newDimension(                 (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                var time0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                time0.json().load("[\n" + "{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"1\",\n" + "\t\"name\":\"root\",\n" + "\t\"children\": [\"2\",\"3\"],\n" + "}\n" + ",{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"2\",\n" + "\t\"name\":\"n1\",\n" + "}\n" + ",{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"3\",\n" + "\t\"name\":\"n2\",\n" + "}\n" + "]",                  (res : java.lang.Throwable) => {
                time0.lookup(1,                  (r : org.kevoree.modeling.api.KObject<any, any>) => {
                System.err.println(r);
                }
);
                }
);
                }
);
              }

            }

            export class JSONSaveTest {

              public jsonTest(): void {
                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
                universe.newDimension(                 (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                var time0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                var root: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                time0.setRoot(root);
                root.setName("root");
                var n1: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                n1.setName("n1");
                var n2: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                n2.setName("n2");
                root.addChildren(n1);
                root.addChildren(n2);
                var result: string[] = new Array();
                time0.json().save(root,                  (model : string, err : java.lang.Throwable) => {
                result[0] = model;
                if (err != null) {
                  err.printStackTrace();
                }
                }
);
                var payloadResult: string = "[\n" + "{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"1\",\n" + "\t\"@root\" : \"true\",\n" + "\t\"name\" : \"root\",\n" + "\t\"children\" : [\"2\",\"3\"],\n" + "}\n" + ",{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"2\",\n" + "\t\"name\" : \"n1\",\n" + "}\n" + ",{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"3\",\n" + "\t\"name\" : \"n2\",\n" + "}\n" + "]\n";
                org.junit.Assert.assertEquals(result[0], payloadResult);
                var pathN2: string[] = [null];
                n2.path(                 (p : string) => {
                pathN2[0] = p;
                }
);
                org.junit.Assert.assertEquals("/children[name=n2]", pathN2[0]);
                var pathN1: string[] = [null];
                n1.path(                 (p : string) => {
                pathN1[0] = p;
                }
);
                org.junit.Assert.assertEquals("/children[name=n1]", pathN1[0]);
                var pathR: string[] = [null];
                root.path(                 (p : string) => {
                pathR[0] = p;
                }
);
                org.junit.Assert.assertEquals("/", pathR[0]);
                }
);
              }

            }

          }
          export class LookupTest {

            public lookupTest(): void {
              var dataBase: org.kevoree.modeling.api.data.MemoryKDataBase = new org.kevoree.modeling.api.data.MemoryKDataBase();
              var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(dataBase);
              universe.newDimension(               (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
              var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
              var node: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
              node.setName("n0");
              t0.setRoot(node);
              org.junit.Assert.assertTrue(node.isRoot());
              universe.storage().getRoot(t0,                (resolvedRoot : org.kevoree.modeling.api.KObject<any, any>) => {
              org.junit.Assert.assertEquals(node, resolvedRoot);
              }
);
              org.junit.Assert.assertTrue(node.isRoot());
              dimension0.save(               (e : java.lang.Throwable) => {
              var universe2: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(dataBase);
              universe2.dimension(dimension0.key(),                (dimension0_2 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
              var t0_2: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0_2.time(0);
              t0_2.lookup(node.uuid(),                (resolved : org.kevoree.modeling.api.KObject<any, any>) => {
              t0_2.lookup(node.uuid(),                (resolved2 : org.kevoree.modeling.api.KObject<any, any>) => {
              org.junit.Assert.assertEquals(resolved, resolved2);
              }
);
              universe2.storage().getRoot(t0_2,                (resolvedRoot : org.kevoree.modeling.api.KObject<any, any>) => {
              org.junit.Assert.assertEquals(resolved, resolvedRoot);
              }
);
              org.junit.Assert.assertTrue(resolved.isRoot());
              }
);
              }
);
              }
);
              }
);
            }

          }

          export module polynomial {
            export class PolynomialKMFTest {

              public test(): void {
                var dataBase: org.kevoree.modeling.api.data.MemoryKDataBase = new org.kevoree.modeling.api.data.MemoryKDataBase();
                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(dataBase);
                universe.newDimension(                 (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                var val: number[] = new Array();
                var coef: number[] = [2, 2, 3];
                var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                var node: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                node.setName("n0");
                t0.setRoot(node);
                var element: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
                element.setName("e0");
                node.setElement(element);
                element.setValue(0.0);
                for (var i: number = 0; i < 1000; i++) {
                  var temp: number = 1;
                  for (var j: number = 0; j < coef.length; j++) {
                    val[i] = val[i] + coef[j] * temp;
                    temp = temp * i;
                  }
                  var vv: number = val[i];
                  var finalI: number = i;
                  dimension0.time(finalI).lookup(element.uuid(),                    (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                  var casted: org.kevoree.modeling.microframework.test.cloud.Element = <org.kevoree.modeling.microframework.test.cloud.Element>kObject;
                  casted.setValue(vv);
                  }
);
                }
                System.out.println(element.timeTree().size());
                element.timeTree().walk(                 (timePoint : number) => {
                element.jump(timePoint,                  (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                org.junit.Assert.assertTrue((element.getValue() - val[<number>timePoint]) < 5);
                }
);
                }
);
                }
);
              }

              public test2(): void {
                var dataBase: org.kevoree.modeling.api.data.MemoryKDataBase = new org.kevoree.modeling.api.data.MemoryKDataBase();
                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(dataBase);
                universe.newDimension(                 (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                var node: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                node.setName("n0");
                t0.setRoot(node);
                var element: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
                element.setName("e0");
                node.setElement(element);
                element.setValue(0.0);
                for (var i: number = 1; i <= 10000; i++) {
                  var finalI: number = i;
                  dimension0.time(finalI).lookup(element.uuid(),                    (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                  var casted: org.kevoree.modeling.microframework.test.cloud.Element = <org.kevoree.modeling.microframework.test.cloud.Element>kObject;
                  casted.setValue(<number>new java.util.Random().nextInt(100000));
                  }
);
                }
                System.out.println(element.timeTree().size());
                }
);
              }

            }

          }
          export class RBTreeTest {

            public printTest(): void {
              var MIN: number = 0;
              var MAX: number = 99;
              for (var j: number = MIN; j <= MAX; j++) {
                var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                for (var i: number = MIN; i <= j; i++) {
                  if ((i % 3) == 0) {
                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                  } else {
                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                  }
                }
                this.printTree(tree.root);
              }
            }

            public nextTest(): void {
              var MIN: number = 0;
              var MAX: number = 99;
              for (var j: number = MIN; j <= MAX; j++) {
                var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                for (var i: number = MIN; i <= j; i++) {
                  if ((i % 3) == 0) {
                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                  } else {
                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                  }
                }
                for (var i: number = MIN; i < j - 1; i++) {
                  org.junit.Assert.assertTrue(tree.next(i).getKey() == i + 1);
                }
                org.junit.Assert.assertTrue(tree.next(j) == null);
              }
            }

            private printTree(root: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
              var queue: java.util.LinkedList<org.kevoree.modeling.api.time.rbtree.TreeNode> = new java.util.LinkedList<org.kevoree.modeling.api.time.rbtree.TreeNode>();
              queue.add(root);
              queue.add(null);
              while (!queue.isEmpty()){
                var current: org.kevoree.modeling.api.time.rbtree.TreeNode = queue.poll();
                while (current != null){
                  System.out.print("| " + current.getKey() + " ");
                  if (current.getLeft() != null) {
                    queue.add(current.getLeft());
                  }
                  if (current.getRight() != null) {
                    queue.add(current.getRight());
                  }
                  current = queue.poll();
                }
                System.out.println();
                if (!queue.isEmpty()) {
                  queue.add(null);
                }
              }
            }

            public previousTest(): void {
              var MIN: number = 0;
              var MAX: number = 99;
              for (var j: number = MIN + 1; j <= MAX; j++) {
                var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                for (var i: number = MIN; i <= j; i++) {
                  if ((i % 7) == 0) {
                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                  } else {
                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                  }
                }
                for (var i: number = j; i > MIN; i--) {
                  org.junit.Assert.assertTrue(tree.previous(i).getKey() == i - 1);
                }
                org.junit.Assert.assertTrue(tree.previous(MIN) == null);
              }
            }

            public nextWhileNotTest(): void {
              var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
              for (var i: number = 0; i <= 6; i++) {
                tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              }
              tree.insert(8, org.kevoree.modeling.api.time.rbtree.State.DELETED);
              tree.insert(10, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              tree.insert(11, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              tree.insert(13, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              for (var i: number = 0; i < 5; i++) {
                org.junit.Assert.assertTrue(tree.nextWhileNot(i, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == (i + 1));
              }
              org.junit.Assert.assertTrue(tree.nextWhileNot(5, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.nextWhileNot(5, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 6);
              org.junit.Assert.assertNull(tree.nextWhileNot(6, org.kevoree.modeling.api.time.rbtree.State.DELETED));
              org.junit.Assert.assertNull(tree.nextWhileNot(7, org.kevoree.modeling.api.time.rbtree.State.DELETED));
              org.junit.Assert.assertNull(tree.nextWhileNot(8, org.kevoree.modeling.api.time.rbtree.State.DELETED));
              org.junit.Assert.assertTrue(tree.nextWhileNot(9, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.nextWhileNot(9, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 10);
              org.junit.Assert.assertTrue(tree.nextWhileNot(10, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.nextWhileNot(10, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 11);
            }

            public previousWhileNotTest(): void {
              var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
              for (var i: number = 0; i <= 6; i++) {
                tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              }
              tree.insert(8, org.kevoree.modeling.api.time.rbtree.State.DELETED);
              tree.insert(10, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              tree.insert(11, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              tree.insert(13, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              org.junit.Assert.assertTrue(tree.previousWhileNot(14, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.previousWhileNot(14, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 13);
              org.junit.Assert.assertTrue(tree.previousWhileNot(13, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.previousWhileNot(13, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 11);
              org.junit.Assert.assertTrue(tree.previousWhileNot(12, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.previousWhileNot(12, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 11);
              org.junit.Assert.assertTrue(tree.previousWhileNot(11, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.previousWhileNot(11, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 10);
              org.junit.Assert.assertNull(tree.previousWhileNot(10, org.kevoree.modeling.api.time.rbtree.State.DELETED));
              org.junit.Assert.assertNull(tree.previousWhileNot(9, org.kevoree.modeling.api.time.rbtree.State.DELETED));
              org.junit.Assert.assertNull(tree.previousWhileNot(8, org.kevoree.modeling.api.time.rbtree.State.DELETED));
              org.junit.Assert.assertTrue(tree.previousWhileNot(7, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.previousWhileNot(7, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 6);
              org.junit.Assert.assertTrue(tree.previousWhileNot(6, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.previousWhileNot(6, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 5);
            }

            public firstTest(): void {
              var MIN: number = 0;
              var MAX: number = 99;
              for (var j: number = MIN + 1; j <= MAX; j++) {
                var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                for (var i: number = MIN; i <= j; i++) {
                  if ((i % 3) == 0) {
                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                  } else {
                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                  }
                }
                org.junit.Assert.assertTrue(tree.first().getKey() == MIN);
              }
            }

            public lastTest(): void {
              var MIN: number = 0;
              var MAX: number = 99;
              for (var j: number = MIN + 1; j <= MAX; j++) {
                var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                for (var i: number = MIN; i <= j; i++) {
                  if ((i % 3) == 0) {
                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                  } else {
                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                  }
                }
                org.junit.Assert.assertTrue(tree.last().getKey() == j);
              }
            }

            public firstWhileNot(): void {
              var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
              for (var i: number = 0; i <= 6; i++) {
                tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              }
              tree.insert(8, org.kevoree.modeling.api.time.rbtree.State.DELETED);
              tree.insert(10, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              tree.insert(11, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              tree.insert(13, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              org.junit.Assert.assertTrue(tree.firstWhileNot(14, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 10);
              org.junit.Assert.assertTrue(tree.firstWhileNot(13, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 10);
              org.junit.Assert.assertTrue(tree.firstWhileNot(12, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 10);
              org.junit.Assert.assertTrue(tree.firstWhileNot(11, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 10);
              org.junit.Assert.assertTrue(tree.firstWhileNot(10, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 10);
              org.junit.Assert.assertNull(tree.firstWhileNot(9, org.kevoree.modeling.api.time.rbtree.State.DELETED));
              org.junit.Assert.assertNull(tree.firstWhileNot(8, org.kevoree.modeling.api.time.rbtree.State.DELETED));
              org.junit.Assert.assertTrue(tree.firstWhileNot(7, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 0);
              org.junit.Assert.assertTrue(tree.firstWhileNot(6, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 0);
            }

            public lastWhileNot(): void {
              var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
              for (var i: number = 0; i <= 6; i++) {
                tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              }
              tree.insert(8, org.kevoree.modeling.api.time.rbtree.State.DELETED);
              tree.insert(10, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              tree.insert(11, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              tree.insert(13, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              org.junit.Assert.assertTrue(tree.lastWhileNot(0, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 6);
              org.junit.Assert.assertTrue(tree.lastWhileNot(5, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 6);
              org.junit.Assert.assertTrue(tree.lastWhileNot(6, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 6);
              org.junit.Assert.assertTrue(tree.lastWhileNot(7, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 6);
              org.junit.Assert.assertNull(tree.lastWhileNot(8, org.kevoree.modeling.api.time.rbtree.State.DELETED));
              org.junit.Assert.assertNull(tree.lastWhileNot(9, org.kevoree.modeling.api.time.rbtree.State.DELETED));
              org.junit.Assert.assertTrue(tree.lastWhileNot(10, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 13);
              org.junit.Assert.assertTrue(tree.lastWhileNot(11, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 13);
              org.junit.Assert.assertTrue(tree.lastWhileNot(12, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 13);
              org.junit.Assert.assertTrue(tree.lastWhileNot(13, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 13);
              org.junit.Assert.assertTrue(tree.lastWhileNot(14, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 13);
            }

            public previousOrEqualTest(): void {
              var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
              for (var i: number = 0; i <= 6; i++) {
                tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              }
              tree.insert(8, org.kevoree.modeling.api.time.rbtree.State.DELETED);
              tree.insert(10, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              tree.insert(11, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              tree.insert(13, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              org.junit.Assert.assertNull(tree.previousOrEqual(-1));
              org.junit.Assert.assertEquals(tree.previousOrEqual(0).getKey(), 0);
              org.junit.Assert.assertEquals(tree.previousOrEqual(1).getKey(), 1);
              org.junit.Assert.assertEquals(tree.previousOrEqual(7).getKey(), 6);
              org.junit.Assert.assertEquals(tree.previousOrEqual(8).getKey(), 8);
              org.junit.Assert.assertEquals(tree.previousOrEqual(9).getKey(), 8);
              org.junit.Assert.assertEquals(tree.previousOrEqual(10).getKey(), 10);
              org.junit.Assert.assertEquals(tree.previousOrEqual(13).getKey(), 13);
              org.junit.Assert.assertEquals(tree.previousOrEqual(14).getKey(), 13);
            }

            public nextOrEqualTest(): void {
              var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
              for (var i: number = 0; i <= 6; i++) {
                tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              }
              tree.insert(8, org.kevoree.modeling.api.time.rbtree.State.DELETED);
              tree.insert(10, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              tree.insert(11, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              tree.insert(13, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
              org.junit.Assert.assertTrue(tree.nextOrEqual(-1).getKey() == 0);
              org.junit.Assert.assertTrue(tree.nextOrEqual(0).getKey() == 0);
              org.junit.Assert.assertTrue(tree.nextOrEqual(1).getKey() == 1);
              org.junit.Assert.assertTrue(tree.nextOrEqual(7).getKey() == 8);
              org.junit.Assert.assertTrue(tree.nextOrEqual(8).getKey() == 8);
              org.junit.Assert.assertTrue(tree.nextOrEqual(9).getKey() == 10);
              org.junit.Assert.assertTrue(tree.nextOrEqual(10).getKey() == 10);
              org.junit.Assert.assertTrue(tree.nextOrEqual(13).getKey() == 13);
              org.junit.Assert.assertNull(tree.nextOrEqual(14));
            }

          }

          export module selector {
            export class BasicSelectTest {

              public selectTest(): void {
                var dataBase: org.kevoree.modeling.api.data.MemoryKDataBase = new org.kevoree.modeling.api.data.MemoryKDataBase();
                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(dataBase);
                universe.newDimension(                 (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                var node: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                node.setName("n0");
                t0.setRoot(node);
                var node2: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                node2.setName("n1");
                node.addChildren(node2);
                var node3: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                node3.setName("n2");
                node2.addChildren(node3);
                var node4: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                node4.setName("n4");
                node3.addChildren(node4);
                var node5: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                node5.setName("n5");
                node3.addChildren(node5);
                t0.select("children[]",                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                org.junit.Assert.assertEquals(1, selecteds.length);
                org.junit.Assert.assertEquals(node2, selecteds[0]);
                }
);
                t0.select("children[name=*]",                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                org.junit.Assert.assertEquals(1, selecteds.length);
                org.junit.Assert.assertEquals(node2, selecteds[0]);
                }
);
                t0.select("children[name=n*]",                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                org.junit.Assert.assertEquals(1, selecteds.length);
                org.junit.Assert.assertEquals(node2, selecteds[0]);
                }
);
                t0.select("children[name=n1]",                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                org.junit.Assert.assertEquals(1, selecteds.length);
                org.junit.Assert.assertEquals(node2, selecteds[0]);
                }
);
                t0.select("children[name=!n1]",                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                org.junit.Assert.assertEquals(0, selecteds.length);
                }
);
                t0.select("children[name!=n1]",                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                org.junit.Assert.assertEquals(0, selecteds.length);
                }
);
                t0.select("children[name=n1]/children[name=n2]",                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                org.junit.Assert.assertEquals(1, selecteds.length);
                org.junit.Assert.assertEquals(node3, selecteds[0]);
                }
);
                t0.select("/children[name=n1]/children[name=n2]",                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                org.junit.Assert.assertEquals(1, selecteds.length);
                org.junit.Assert.assertEquals(node3, selecteds[0]);
                }
);
                node.select("children[name=n1]/children[name=n2]",                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                org.junit.Assert.assertEquals(1, selecteds.length);
                org.junit.Assert.assertEquals(node3, selecteds[0]);
                }
);
                node.select("/children[name=n1]/children[name=n2]",                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                org.junit.Assert.assertEquals(0, selecteds.length);
                }
);
                node.select("children[name=n1]/children[name=n2]/children[name=*]",                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                org.junit.Assert.assertEquals(2, selecteds.length);
                }
);
                }
);
              }

            }

          }
          export class SliceTest {

            public slideTest(): void {
              var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
              universe.newDimension(               (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
              var time0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
              var root: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
              time0.setRoot(root);
              root.setName("root");
              var n1: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
              n1.setName("n1");
              var n2: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
              n2.setName("n2");
              root.addChildren(n1);
              root.addChildren(n2);
              }
);
            }

          }

          export class TimeTest {

            public timeCreationTest(): void {
              var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
              universe.newDimension(               (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
              org.junit.Assert.assertNotNull(dimension0);
              var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
              org.junit.Assert.assertNotNull(t0);
              org.junit.Assert.assertEquals(t0.now(), 0);
              var t1: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(1);
              org.junit.Assert.assertNotNull(t1);
              org.junit.Assert.assertEquals(t1.now(), 1);
              }
);
            }

            public simpleTimeNavigationTest(): void {
              var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
              universe.newDimension(               (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
              org.junit.Assert.assertNotNull(dimension0);
              var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
              var node0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
              var element0: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
              node0.setElement(element0);
              node0.getElement(               (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
              org.junit.Assert.assertEquals(element, element0);
              org.junit.Assert.assertEquals(element.now(), t0.now());
              }
);
              t0.lookup(node0.uuid(),                (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
              (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getElement(               (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
              org.junit.Assert.assertEquals(element, element0);
              org.junit.Assert.assertEquals(element.now(), t0.now());
              }
);
              }
);
              }
);
            }

            public distortedTimeNavigationTest(): void {
              var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
              universe.newDimension(               (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
              org.junit.Assert.assertNotNull(dimension0);
              var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
              var node0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
              node0.getElement(               (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
              org.junit.Assert.assertNull(element);
              }
);
              t0.lookup(node0.uuid(),                (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
              (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getElement(               (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
              org.junit.Assert.assertNull(element);
              }
);
              }
);
              var t1: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(1);
              var elem1: org.kevoree.modeling.microframework.test.cloud.Element = t1.createElement();
              node0.setElement(elem1);
              t0.lookup(node0.uuid(),                (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
              (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getElement(               (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
              org.junit.Assert.assertNull(element);
              }
);
              }
);
              t1.lookup(node0.uuid(),                (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
              (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getElement(               (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
              org.junit.Assert.assertNotNull(element);
              org.junit.Assert.assertEquals(element, elem1);
              org.junit.Assert.assertEquals(element.now(), t1.now());
              }
);
              }
);
              }
);
            }

            public objectModificationTest(): void {
              var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
              universe.newDimension(               (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
              org.junit.Assert.assertNotNull(dimension0);
              var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
              var node0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
              node0.setName("node at 0");
              node0.setValue("0");
              var elem0: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
              node0.setElement(elem0);
              var t1: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(1);
              t1.lookup(node0.uuid(),                (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
              (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).setName("node at 1");
              (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).setValue("1");
              }
);
              t0.lookup(node0.uuid(),                (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
              org.junit.Assert.assertEquals((<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getName(), "node at 0");
              org.junit.Assert.assertEquals((<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getValue(), "0");
              }
);
              t1.lookup(node0.uuid(),                (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
              org.junit.Assert.assertEquals((<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getName(), "node at 1");
              org.junit.Assert.assertEquals((<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getValue(), "1");
              }
);
              }
);
            }

          }

          export class TraceTest {

            public traceTest(): void {
              var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
              universe.newDimension(               (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
              var time0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
              var root: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
              time0.setRoot(root);
              root.setName("root");
              var n1: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
              n1.setName("n1");
              var n2: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
              n2.setName("n2");
              root.addChildren(n1);
              root.addChildren(n2);
              }
);
            }

          }

          export module xmi {
            export class Serializer {

              public serializeTest(): void {
                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
                universe.newDimension(                 (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                var nodeT0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                nodeT0.setName("node0");
                t0.setRoot(nodeT0);
                var child0: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
                nodeT0.setElement(child0);
                var nodeT1: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                nodeT1.setName("n1");
                nodeT0.addChildren(nodeT1);
                t0.lookup(nodeT0.uuid(),                  (root : org.kevoree.modeling.api.KObject<any, any>) => {
                t0.xmi().save(root,                  (result : string, error : java.lang.Throwable) => {
                if (error != null) {
                  error.printStackTrace();
                }
                }
);
                }
);
                }
);
              }

            }

          }
        }
      }
    }
  }
}
