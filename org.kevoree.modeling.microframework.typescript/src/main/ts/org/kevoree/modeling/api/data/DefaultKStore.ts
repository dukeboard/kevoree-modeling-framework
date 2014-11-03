///<reference path="../Callback.ts"/>
///<reference path="../KDimension.ts"/>
///<reference path="../KEvent.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KUniverse.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelListener.ts"/>
///<reference path="../ThrowableCallback.ts"/>
///<reference path="../abs/AbstractKDimension.ts"/>
///<reference path="../abs/AbstractKObject.ts"/>
///<reference path="../abs/AbstractKUniverse.ts"/>
///<reference path="../abs/AbstractKView.ts"/>
///<reference path="cache/DimensionCache.ts"/>
///<reference path="cache/TimeCache.ts"/>
///<reference path="../strategy/ExtrapolationStrategy.ts"/>
///<reference path="../json/JSONModelLoader.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../time/TimeTree.ts"/>
///<reference path="../time/DefaultTimeTree.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../java/util/JUMap.ts"/>
///<reference path="../../../../../java/util/JUHashSet.ts"/>
///<reference path="../../../../../java/util/JUSet.ts"/>

class DefaultKStore implements KStore {

  public static KEY_SEP: string = ',';
  private _db: KDataBase = null;
  private universeListeners: JUList<ModelListener> = new JUArrayList<ModelListener>();
  private caches: JUMap<number, DimensionCache> = new JUHashMap<number, DimensionCache>();
  public dimKeyCounter: number = 0;
  public objectKey: number = 0;

  constructor(p_db: KDataBase) {
    this._db = p_db;
  }

  private keyTree(dim: KDimension<any,any,any>, key: number): string {
    return "" + dim.key() + DefaultKStore.KEY_SEP + key;
  }

  private keyRoot(dim: KDimension<any,any,any>, time: number): string {
    return dim.key() + DefaultKStore.KEY_SEP + time + DefaultKStore.KEY_SEP + "root";
  }

  private keyRootTree(dim: KDimension<any,any,any>): string {
    return dim.key() + DefaultKStore.KEY_SEP + "root";
  }

  private keyPayload(dim: KDimension<any,any,any>, time: number, key: number): string {
    return "" + dim.key() + DefaultKStore.KEY_SEP + time + DefaultKStore.KEY_SEP + key;
  }

  public initDimension(dimension: KDimension<any,any,any>, callback: Callback<Throwable>): void {
    var dimensionCache: DimensionCache = new DimensionCache(dimension);
    this.caches.put(dimension.key(), dimensionCache);
    var rootTreeKeys: string[] = new Array();
    rootTreeKeys[0] = this.keyRootTree(dimension);
    this._db.get(rootTreeKeys, {on:function(res: string[], error: Throwable){
    if (error != null) {
      callback.on(error);
    } else {
      try {
        (<DefaultTimeTree>dimensionCache.rootTimeTree).load(res[0]);
        callback.on(null);
      } catch ($ex$) {
        if ($ex$ instanceof Exception) {
          var e: Exception = <Exception>$ex$;
          callback.on(e);
        }
       }
    }
}});
  }

  public initKObject(obj: KObject<any,any>, originView: KView): void {
    var dimensionCache: DimensionCache = this.caches.get(originView.dimension().key());
    if (!dimensionCache.timeTreeCache.containsKey(obj.uuid())) {
      dimensionCache.timeTreeCache.put(obj.uuid(), obj.timeTree());
    }
    var timeCache: TimeCache = dimensionCache.timesCaches.get(originView.now());
    if (timeCache == null) {
      timeCache = new TimeCache();
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

  public cacheLookup(dimension: KDimension<any,any,any>, time: number, key: number): KObject<any,any> {
    var dimensionCache: DimensionCache = this.caches.get(dimension.key());
    var timeCache: TimeCache = dimensionCache.timesCaches.get(time);
    if (timeCache == null) {
      return null;
    } else {
      return timeCache.obj_cache.get(key);
    }
  }

  public raw(origin: KObject<any,any>, accessMode: AccessMode): any[] {
    if (accessMode.equals(AccessMode.WRITE)) {
      (<AbstractKObject<any,any>>origin).setDirty(true);
    }
    var dimensionCache: DimensionCache = this.caches.get(origin.dimension().key());
    var resolvedTime: number = origin.timeTree().resolve(origin.now());
    var needCopy: boolean = accessMode.equals(AccessMode.WRITE) && resolvedTime != origin.now();
    var timeCache: TimeCache = dimensionCache.timesCaches.get(resolvedTime);
    if (timeCache == null) {
      timeCache = new TimeCache();
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
          if (resolved instanceof JUSet) {
            var clonedSet: JUHashSet<number> = new JUHashSet<number>();
            clonedSet.addAll(<JUSet<number>>resolved);
            cloned[i] = clonedSet;
          } else {
            if (resolved instanceof JUList) {
              var clonedSet: JUArrayList<number> = new JUArrayList<number>();
              clonedSet.addAll(<JUList<number>>resolved);
              cloned[i] = clonedSet;
            } else {
              cloned[i] = resolved;
            }
          }
        }
      }
      var timeCacheCurrent: TimeCache = dimensionCache.timesCaches.get(origin.now());
      if (timeCacheCurrent == null) {
        timeCacheCurrent = new TimeCache();
        dimensionCache.timesCaches.put(origin.view().now(), timeCacheCurrent);
      }
      timeCacheCurrent.payload_cache.put(origin.uuid(), cloned);
      origin.timeTree().insert(origin.view().now());
      return cloned;
    }
  }

  public discard(dimension: KDimension<any,any,any>, callback: Callback<Throwable>): void {
    this.caches.remove(dimension.key());
    callback.on(null);
  }

  public delete(dimension: KDimension<any,any,any>, callback: Callback<Throwable>): void {
    new Exception("Not implemented yet !");
  }

  public save(dimension: KDimension<any,any,any>, callback: Callback<Throwable>): void {
    var dimensionCache: DimensionCache = this.caches.get(dimension.key());
    if (dimensionCache == null) {
      callback.on(null);
    } else {
      var sizeCache: number = 0;
      var timeCaches: TimeCache[] = dimensionCache.timesCaches.values().toArray(new Array());
      for (var i: number = 0; i < timeCaches.length; i++) {
        var timeCache: TimeCache = timeCaches[i];
        var valuesArr: KObject<any,any>[] = timeCache.obj_cache.values().toArray(new Array());
        for (var j: number = 0; j < valuesArr.length; j++) {
          var cached: KObject<any,any> = valuesArr[j];
          if (cached.isDirty()) {
            sizeCache++;
          }
        }
        if (timeCache.rootDirty) {
          sizeCache++;
        }
      }
      var timeTrees: TimeTree[] = dimensionCache.timeTreeCache.values().toArray(new Array());
      for (var i: number = 0; i < timeTrees.length; i++) {
        var timeTree: TimeTree = timeTrees[i];
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
        var timeCache: TimeCache = timeCaches[j];
        var valuesArr: KObject<any,any>[] = timeCache.obj_cache.values().toArray(new Array());
        for (var k: number = 0; k < valuesArr.length; k++) {
          var cached: KObject<any,any> = valuesArr[k];
          if (cached.isDirty()) {
            payloads[i][0] = this.keyPayload(dimension, cached.now(), cached.uuid());
            payloads[i][1] = cached.toJSON();
            (<AbstractKObject<any,any>>cached).setDirty(false);
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
        var timeTree: TimeTree = dimensionCache.timeTreeCache.get(timeTreeKey);
        if (timeTree.isDirty()) {
          payloads[i][0] = this.keyTree(dimension, timeTreeKey);
          payloads[i][1] = timeTree.toString();
          (<DefaultTimeTree>timeTree).setDirty(false);
          i++;
        }
      }
      if (dimensionCache.rootTimeTree.isDirty()) {
        payloads[i][0] = this.keyRootTree(dimension);
        payloads[i][1] = dimensionCache.rootTimeTree.toString();
        (<DefaultTimeTree>dimensionCache.rootTimeTree).setDirty(false);
        i++;
      }
      this._db.put(payloads, callback);
    }
  }

  public saveUnload(dimension: KDimension<any,any,any>, callback: Callback<Throwable>): void {
    this.save(dimension, {on:function(throwable: Throwable){
    if (throwable == null) {
      this.discard(dimension, callback);
    } else {
      callback.on(throwable);
    }
}});
  }

  public timeTree(dimension: KDimension<any,any,any>, key: number, callback: Callback<TimeTree>): void {
    var keys: number[] = new Array();
    keys[0] = key;
    this.timeTrees(dimension, keys, {on:function(timeTrees: TimeTree[]){
    if (timeTrees.length == 1) {
      callback.on(timeTrees[0]);
    } else {
      callback.on(null);
    }
}});
  }

  public timeTrees(dimension: KDimension<any,any,any>, keys: number[], callback: Callback<TimeTree[]>): void {
    var toLoad: JUList<number> = new JUArrayList<number>();
    var dimensionCache: DimensionCache = this.caches.get(dimension.key());
    var result: TimeTree[] = new Array();
    for (var i: number = 0; i < keys.length; i++) {
      var cachedTree: TimeTree = dimensionCache.timeTreeCache.get(keys[i]);
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
      this._db.get(toLoadKeys, {on:function(res: string[], error: Throwable){
      if (error != null) {
        error.printStackTrace();
      }
      for (var i: number = 0; i < res.length; i++) {
        var newTree: DefaultTimeTree = new DefaultTimeTree();
        try {
          if (res[i] != null) {
            newTree.load(res[i]);
          } else {
            newTree.insert(dimension.key());
          }
          dimensionCache.timeTreeCache.put(keys[toLoad.get(i)], newTree);
          result[toLoad.get(i)] = newTree;
        } catch ($ex$) {
          if ($ex$ instanceof Exception) {
            var e: Exception = <Exception>$ex$;
            e.printStackTrace();
          }
         }
      }
      callback.on(result);
}});
    }
  }

  public lookup(originView: KView, key: number, callback: Callback<KObject<any,any>>): void {
    if (callback == null) {
      return;
    }
    this.timeTree(originView.dimension(), key, {on:function(timeTree: TimeTree){
    var resolvedTime: number = timeTree.resolve(originView.now());
    if (resolvedTime == null) {
      callback.on(null);
    } else {
      var resolved: KObject<any,any> = this.cacheLookup(originView.dimension(), resolvedTime, key);
      if (resolved != null) {
        if (originView.now() == resolvedTime) {
          callback.on(resolved);
        } else {
          var proxy: KObject<any,any> = originView.createProxy(resolved.metaClass(), resolved.timeTree(), key);
          callback.on(proxy);
        }
      } else {
        var keys: number[] = new Array();
        keys[0] = key;
        this.loadObjectInCache(originView, keys, {on:function(dbResolved: JUList<KObject<any,any>>){
        if (dbResolved.size() == 0) {
          callback.on(null);
        } else {
          var dbResolvedZero: KObject<any,any> = dbResolved.get(0);
          if (resolvedTime != originView.now()) {
            var proxy: KObject<any,any> = originView.createProxy(dbResolvedZero.metaClass(), dbResolvedZero.timeTree(), key);
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

  private loadObjectInCache(originView: KView, keys: number[], callback: Callback<JUList<KObject<any,any>>>): void {
    this.timeTrees(originView.dimension(), keys, {on:function(timeTrees: TimeTree[]){
    var objStringKeys: string[] = new Array();
    var resolved: number[] = new Array();
    for (var i: number = 0; i < keys.length; i++) {
      var resolvedTime: number = timeTrees[i].resolve(originView.now());
      resolved[i] = resolvedTime;
      objStringKeys[i] = this.keyPayload(originView.dimension(), resolvedTime, keys[i]);
    }
    this._db.get(objStringKeys, {on:function(objectPayloads: string[], error: Throwable){
    if (error != null) {
      callback.on(null);
    } else {
      var additionalLoad: JUList<any[]> = new JUArrayList<any[]>();
      var objs: JUList<KObject<any,any>> = new JUArrayList<KObject<any,any>>();
      for (var i: number = 0; i < objectPayloads.length; i++) {
        var obj: KObject<any,any> = JSONModelLoader.load(objectPayloads[i], originView.dimension().time(resolved[i]), null);
        objs.add(obj);
        var strategies: JUSet<ExtrapolationStrategy> = new JUHashSet<ExtrapolationStrategy>();
        for (var h: number = 0; h < obj.metaAttributes().length; h++) {
          var metaAttribute: MetaAttribute = obj.metaAttributes()[h];
          strategies.add(metaAttribute.strategy());
        }
        var strategiesArr: ExtrapolationStrategy[] = strategies.toArray(new Array());
        for (var k: number = 0; k < strategiesArr.length; k++) {
          var strategy: ExtrapolationStrategy = strategiesArr[k];
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
        this._db.get(addtionalDBKeys, {on:function(additionalPayloads: string[], error: Throwable){
        for (var i: number = 0; i < objectPayloads.length; i++) {
          JSONModelLoader.load(additionalPayloads[i], originView.dimension().time(<number>additionalLoad.get(i)[1]), null);
        }
        callback.on(objs);
}});
      }
    }
}});
}});
  }

  public lookupAll(originView: KView, keys: number[], callback: Callback<KObject<any,any>[]>): void {
    var toLoad: JUList<number> = new JUArrayList<number>();
    for (var i: number = 0; i < keys.length; i++) {
      toLoad.add(keys[i]);
    }
    var resolveds: JUList<KObject<any,any>> = new JUArrayList<KObject<any,any>>();
    for (var i: number = 0; i < keys.length; i++) {
      var kid: number = keys[i];
      var resolved: KObject<any,any> = this.cacheLookup(originView.dimension(), originView.now(), kid);
      if (resolved != null) {
        resolveds.add(resolved);
        toLoad.remove(kid);
      }
    }
    if (toLoad.size() == 0) {
      var proxies: JUList<KObject<any,any>> = new JUArrayList<KObject<any,any>>();
      var resolvedsArr: KObject<any,any>[] = resolveds.toArray(new Array());
      for (var i: number = 0; i < resolvedsArr.length; i++) {
        var res: KObject<any,any> = resolvedsArr[i];
        if (res.now() != originView.now()) {
          var proxy: KObject<any,any> = originView.createProxy(res.metaClass(), res.timeTree(), res.uuid());
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
      this.loadObjectInCache(originView, toLoadKeys, {on:function(additional: JUList<KObject<any,any>>){
      resolveds.addAll(additional);
      var proxies: JUList<KObject<any,any>> = new JUArrayList<KObject<any,any>>();
      var resolvedsArr: KObject<any,any>[] = resolveds.toArray(new Array());
      for (var i: number = 0; i < resolvedsArr.length; i++) {
        var res: KObject<any,any> = resolvedsArr[i];
        if (res.now() != originView.now()) {
          var proxy: KObject<any,any> = originView.createProxy(res.metaClass(), res.timeTree(), res.uuid());
          proxies.add(proxy);
        } else {
          proxies.add(res);
        }
      }
      callback.on(proxies.toArray(new Array()));
}});
    }
  }

  public getDimension(key: number): KDimension<any,any,any> {
    var dimensionCache: DimensionCache = this.caches.get(key);
    if (dimensionCache != null) {
      return dimensionCache.dimension;
    } else {
      return null;
    }
  }

  public getRoot(originView: KView, callback: Callback<KObject<any,any>>): void {
    var dimensionCache: DimensionCache = this.caches.get(originView.dimension().key());
    var resolvedRoot: number = dimensionCache.rootTimeTree.resolve(originView.now());
    if (resolvedRoot == null) {
      callback.on(null);
    } else {
      var timeCache: TimeCache = dimensionCache.timesCaches.get(resolvedRoot);
      if (timeCache.root != null) {
        callback.on(timeCache.root);
      } else {
        var rootKeys: string[] = new Array();
        rootKeys[0] = this.keyRoot(dimensionCache.dimension, resolvedRoot);
        this._db.get(rootKeys, {on:function(res: string[], error: Throwable){
        if (error != null) {
          callback.on(null);
        } else {
          try {
            var idRoot: number = Long.parseLong(res[0]);
            this.lookup(originView, idRoot, {on:function(resolved: KObject<any,any>){
            timeCache.root = resolved;
            timeCache.rootDirty = false;
            callback.on(resolved);
}});
          } catch ($ex$) {
            if ($ex$ instanceof Exception) {
              var e: Exception = <Exception>$ex$;
              e.printStackTrace();
              callback.on(null);
            }
           }
        }
}});
      }
    }
  }

  public setRoot(newRoot: KObject<any,any>): void {
    var dimensionCache: DimensionCache = this.caches.get(newRoot.dimension().key());
    var timeCache: TimeCache = dimensionCache.timesCaches.get(newRoot.now());
    timeCache.root = newRoot;
    timeCache.rootDirty = true;
    dimensionCache.rootTimeTree.insert(newRoot.now());
  }

  public registerListener(origin: any, listener: ModelListener): void {
    if (origin instanceof AbstractKObject) {
      var dimensionCache: DimensionCache = this.caches.get((<KDimension<any,any,any>>origin).key());
      var timeCache: TimeCache = dimensionCache.timesCaches.get((<KView>origin).now());
      var obj_listeners: JUList<ModelListener> = timeCache.obj_listeners.get((<KObject<any,any>>origin).uuid());
      if (obj_listeners == null) {
        obj_listeners = new JUArrayList<ModelListener>();
        timeCache.obj_listeners.put((<KObject<any,any>>origin).uuid(), obj_listeners);
      }
      obj_listeners.add(listener);
    } else {
      if (origin instanceof AbstractKView) {
        var dimensionCache: DimensionCache = this.caches.get((<KDimension<any,any,any>>origin).key());
        var timeCache: TimeCache = dimensionCache.timesCaches.get((<KView>origin).now());
        timeCache.listeners.add(listener);
      } else {
        if (origin instanceof AbstractKDimension) {
          var dimensionCache: DimensionCache = this.caches.get((<KDimension<any,any,any>>origin).key());
          dimensionCache.listeners.add(listener);
        } else {
          if (origin instanceof AbstractKUniverse) {
            this.universeListeners.add(listener);
          }
        }
      }
    }
  }

  public notify(event: KEvent): void {
    var dimensionCache: DimensionCache = this.caches.get(event.src().dimension().key());
    var timeCache: TimeCache = dimensionCache.timesCaches.get(event.src().now());
    var obj_listeners: JUList<ModelListener> = timeCache.obj_listeners.get(event.src().uuid());
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

