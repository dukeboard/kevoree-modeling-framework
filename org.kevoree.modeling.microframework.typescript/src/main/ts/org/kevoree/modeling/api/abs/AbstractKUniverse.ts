///<reference path="../Callback.ts"/>
///<reference path="../KDimension.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KUniverse.ts"/>
///<reference path="../data/DefaultKStore.ts"/>
///<reference path="../data/KDataBase.ts"/>
///<reference path="../data/KStore.ts"/>
///<reference path="../ModelListener.ts"/>

class AbstractKUniverse<A extends KDimension<any,any,any>> implements KUniverse<A> {

  private _storage: KStore = null;

  constructor(kDataBase: KDataBase) {
    this._storage = new DefaultKStore(kDataBase);
  }

  public storage(): KStore {
    return this._storage;
  }

  public newDimension(callback: Callback<A>): void {
    var nextKey: number = this._storage.nextDimensionKey();
    var newDimension: A = this.internal_create(nextKey);
    this.storage().initDimension(newDimension, 
      public on(throwable: Throwable): void {
        callback.on(newDimension);
      }

);
  }

  public internal_create(key: number): A {
    throw "Abstract method";
  }

  public dimension(key: number, callback: Callback<A>): void {
    var existingDimension: A = <A>this._storage.getDimension(key);
    if (existingDimension != null) {
      callback.on(existingDimension);
    } else {
      var newDimension: A = this.internal_create(key);
      this.storage().initDimension(newDimension, 
        public on(throwable: Throwable): void {
          callback.on(newDimension);
        }

);
    }
  }

  public saveAll(callback: Callback<boolean>): void {
  }

  public deleteAll(callback: Callback<boolean>): void {
  }

  public unloadAll(callback: Callback<boolean>): void {
  }

  public disable(listener: ModelListener): void {
  }

  public stream(query: string, callback: Callback<KObject>): void {
  }

  public listen(listener: ModelListener): void {
    this.storage().registerListener(this, listener);
  }

}

