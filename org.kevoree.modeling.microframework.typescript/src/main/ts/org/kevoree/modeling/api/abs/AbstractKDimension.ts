///<reference path="../Callback.ts"/>
///<reference path="../KDimension.ts"/>
///<reference path="../KUniverse.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../time/TimeTree.ts"/>
///<reference path="../ModelListener.ts"/>
///<reference path="../../../../../java/util/HashMap.ts"/>
///<reference path="../../../../../java/util/Map.ts"/>
///<reference path="../../../../../java/util/Set.ts"/>

class AbstractKDimension<A, B, C> implements KDimension<A, B, C> {

  private _universe: KUniverse<any> = null;
  private _key: number = 0;
  private _timesCache: Map<number, A> = new HashMap<number, A>();

  constructor(p_universe: KUniverse, p_key: number) {
    this._universe = p_universe;
    this._key = p_key;
  }

  public key(): number {
    return this._key;
  }

  public universe(): C {
    return <C>this._universe;
  }

  public save(callback: Callback<Throwable>): void {
    this.universe().storage().save(this, callback);
  }

  public saveUnload(callback: Callback<Throwable>): void {
    this.universe().storage().saveUnload(this, callback);
  }

  public delete(callback: Callback<Throwable>): void {
    this.universe().storage().delete(this, callback);
  }

  public discard(callback: Callback<Throwable>): void {
    this.universe().storage().discard(this, callback);
  }

  public timeTrees(keys: number[], callback: Callback<TimeTree[]>): void {
    this.universe().storage().timeTrees(this, keys, callback);
  }

  public timeTree(key: number, callback: Callback<TimeTree>): void {
    this.universe().storage().timeTree(this, key, callback);
  }

  public parent(callback: Callback<B>): void {
  }

  public children(callback: Callback<Set<B>>): void {
  }

  public fork(callback: Callback<B>): void {
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

  public listen(listener: ModelListener): void {
    this.universe().storage().registerListener(this, listener);
  }

  public internal_create(timePoint: number): A {
    throw "Abstract method";
  }

}

