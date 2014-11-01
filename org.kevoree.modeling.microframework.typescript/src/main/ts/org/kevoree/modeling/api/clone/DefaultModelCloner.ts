///<reference path="../Callback.ts"/>
///<reference path="../KDimension.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelCloner.ts"/>

class DefaultModelCloner implements ModelCloner<KObject> {

  private _factory: KView = null;

  constructor(p_factory: KView) {
    this._factory = p_factory;
  }

  public clone(originalObject: KObject<any,any>, callback: Callback<KObject>): void {
    if (originalObject == null || originalObject.view() == null || originalObject.view().dimension() == null) {
      callback.on(null);
    } else {
      originalObject.view().dimension().fork(
        public on(o: KDimension): void {
          o.time(originalObject.view().now()).lookup(originalObject.uuid(), 
            public on(clonedObject: KObject): void {
              callback.on(clonedObject);
            }

);
        }

);
    }
  }

}

