///<reference path="../Callback.ts"/>
///<reference path="../KDimension.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelCloner.ts"/>

class DefaultModelCloner implements ModelCloner<KObject<any,any>> {

  private _factory: KView = null;

  constructor(p_factory: KView) {
    this._factory = p_factory;
  }

  public clone(originalObject: KObject<any,any>, callback: Callback<KObject<any,any>>): void {
    if (originalObject == null || originalObject.view() == null || originalObject.view().dimension() == null) {
      callback.on(null);
    } else {
      originalObject.view().dimension().fork({on:function(o: KDimension<any,any,any>){
      o.time(originalObject.view().now()).lookup(originalObject.uuid(), {on:function(clonedObject: KObject<any,any>){
      callback.on(clonedObject);
}});
}});
    }
  }

}

