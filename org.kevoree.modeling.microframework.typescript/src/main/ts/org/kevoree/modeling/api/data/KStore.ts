///<reference path="../Callback.ts"/>
///<reference path="../KDimension.ts"/>
///<reference path="../KEvent.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelListener.ts"/>
///<reference path="../time/TimeTree.ts"/>
///<reference path="../../../../../java/util/List.ts"/>
///<reference path="../../../../../java/util/Set.ts"/>

interface KStore {

  lookup(originView: KView, key: number, callback: Callback<KObject>): void;

  lookupAll(originView: KView, key: Set<number>, callback: Callback<List<KObject>>): void;

  raw(origin: KObject, accessMode: AccessMode): any[];

  save(dimension: KDimension, callback: Callback<Throwable>): void;

  saveUnload(dimension: KDimension, callback: Callback<Throwable>): void;

  discard(dimension: KDimension, callback: Callback<Throwable>): void;

  delete(dimension: KDimension, callback: Callback<Throwable>): void;

  timeTree(dimension: KDimension, key: number, callback: Callback<TimeTree>): void;

  timeTrees(dimension: KDimension, keys: number[], callback: Callback<TimeTree[]>): void;

  initKObject(obj: KObject, originView: KView): void;

  initDimension(dimension: KDimension, callback: Callback<Throwable>): void;

  nextDimensionKey(): number;

  nextObjectKey(): number;

  getDimension(key: number): KDimension;

  getRoot(originView: KView, callback: Callback<KObject>): void;

  setRoot(newRoot: KObject): void;

  cacheLookup(dimension: KDimension, time: number, key: number): KObject;

  registerListener(origin: any, listener: ModelListener): void;

  notify(event: KEvent): void;

}

