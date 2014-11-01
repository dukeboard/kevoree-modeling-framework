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

  lookup(originView: KView, key: number, callback: Callback<KObject<any,any>>): void;

  lookupAll(originView: KView, key: Set<number>, callback: Callback<List<KObject<any,any>>>): void;

  raw(origin: KObject<any,any>, accessMode: AccessMode): any[];

  save(dimension: KDimension<any,any,any>, callback: Callback<Throwable>): void;

  saveUnload(dimension: KDimension<any,any,any>, callback: Callback<Throwable>): void;

  discard(dimension: KDimension<any,any,any>, callback: Callback<Throwable>): void;

  delete(dimension: KDimension<any,any,any>, callback: Callback<Throwable>): void;

  timeTree(dimension: KDimension<any,any,any>, key: number, callback: Callback<TimeTree>): void;

  timeTrees(dimension: KDimension<any,any,any>, keys: number[], callback: Callback<TimeTree[]>): void;

  initKObject(obj: KObject<any,any>, originView: KView): void;

  initDimension(dimension: KDimension<any,any,any>, callback: Callback<Throwable>): void;

  nextDimensionKey(): number;

  nextObjectKey(): number;

  getDimension(key: number): KDimension<any,any,any>;

  getRoot(originView: KView, callback: Callback<KObject<any,any>>): void;

  setRoot(newRoot: KObject<any,any>): void;

  cacheLookup(dimension: KDimension<any,any,any>, time: number, key: number): KObject<any,any>;

  registerListener(origin: any, listener: ModelListener): void;

  notify(event: KEvent): void;

}

