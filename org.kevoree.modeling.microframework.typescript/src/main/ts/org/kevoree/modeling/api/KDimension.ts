///<reference path="time/TimeTree.ts"/>
///<reference path="../../../../java/util/Set.ts"/>

interface KDimension<A extends KView, B extends KDimension<any,any,any>, C extends KUniverse<any>> {

  key(): number;

  parent(callback: Callback<B>): void;

  children(callback: Callback<Set<B>>): void;

  fork(callback: Callback<B>): void;

  save(callback: Callback<Throwable>): void;

  saveUnload(callback: Callback<Throwable>): void;

  delete(callback: Callback<Throwable>): void;

  discard(callback: Callback<Throwable>): void;

  time(timePoint: number): A;

  timeTrees(keys: number[], callback: Callback<TimeTree[]>): void;

  timeTree(key: number, callback: Callback<TimeTree>): void;

  universe(): C;

}

