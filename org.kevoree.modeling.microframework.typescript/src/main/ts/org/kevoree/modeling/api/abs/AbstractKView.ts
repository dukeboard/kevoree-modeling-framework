///<reference path="../Callback.ts"/>
///<reference path="../KActionType.ts"/>
///<reference path="../KDimension.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelCloner.ts"/>
///<reference path="../ModelCompare.ts"/>
///<reference path="../ModelListener.ts"/>
///<reference path="../ModelLoader.ts"/>
///<reference path="../ModelSerializer.ts"/>
///<reference path="../ModelSlicer.ts"/>
///<reference path="../clone/DefaultModelCloner.ts"/>
///<reference path="../compare/DefaultModelCompare.ts"/>
///<reference path="../event/DefaultKEvent.ts"/>
///<reference path="../json/JSONModelLoader.ts"/>
///<reference path="../json/JSONModelSerializer.ts"/>
///<reference path="../meta/MetaClass.ts"/>
///<reference path="../select/KSelector.ts"/>
///<reference path="../slice/DefaultModelSlicer.ts"/>
///<reference path="../time/TimeTree.ts"/>
///<reference path="../time/DefaultTimeTree.ts"/>
///<reference path="../xmi/XMIModelLoader.ts"/>
///<reference path="../xmi/XMIModelSerializer.ts"/>
//TODO Resolve multi-import
///<reference path="../../../../../java/util/"/>

class AbstractKView implements KView {

  private _now: number = 0;
  private _dimension: KDimension = null;

  constructor(p_now: number, p_dimension: KDimension) {
    this._now = p_now;
    this._dimension = p_dimension;
  }

  public now(): number {
    return this._now;
  }

  public dimension(): KDimension {
    return this._dimension;
  }

  public createJSONSerializer(): ModelSerializer {
    return new JSONModelSerializer();
  }

  public createJSONLoader(): ModelLoader {
    return new JSONModelLoader(this);
  }

  public createXMISerializer(): ModelSerializer {
    return new XMIModelSerializer();
  }

  public createXMILoader(): ModelLoader {
    return new XMIModelLoader(this);
  }

  public createModelCompare(): ModelCompare {
    return new DefaultModelCompare(this);
  }

  public createModelCloner(): ModelCloner {
    return new DefaultModelCloner(this);
  }

  public createModelSlicer(): ModelSlicer {
    return new DefaultModelSlicer();
  }

  public metaClass(fqName: string): MetaClass {
    var metaClasses: MetaClass[] = this.metaClasses();
    for (var i: number = 0; i < metaClasses.length; i++) {
      if (metaClasses[i].metaName().equals(fqName)) {
        return metaClasses[i];
      }
    }
    return null;
  }

  public createFQN(metaClassName: string): KObject {
    return this.create(this.metaClass(metaClassName));
  }

  public manageCache(obj: KObject): KObject {
    this.dimension().universe().storage().initKObject(obj, this);
    return obj;
  }

  public setRoot(elem: KObject): void {
    (<AbstractKObject>elem).set_referenceInParent(null);
    (<AbstractKObject>elem).setRoot(true);
    this.dimension().universe().storage().setRoot(elem);
  }

  public select(query: string, callback: Callback<List<KObject>>): void {
    this.dimension().universe().storage().getRoot(this, {on:function(rootObj: KObject){
    var cleanedQuery: string = query;
    if (cleanedQuery.equals("/")) {
      var res: ArrayList<KObject> = new ArrayList<KObject>();
      if (rootObj != null) {
        res.add(rootObj);
      }
      callback.on(res);
    } else {
      if (cleanedQuery.startsWith("/")) {
        cleanedQuery = cleanedQuery.substring(1);
      }
      KSelector.select(rootObj, cleanedQuery, callback);
    }
}});
  }

  public lookup(kid: number, callback: Callback<KObject>): void {
    this.dimension().universe().storage().lookup(this, kid, callback);
  }

  public lookupAll(keys: Set<number>, callback: Callback<List<KObject>>): void {
    this.dimension().universe().storage().lookupAll(this, keys, callback);
  }

  public stream(query: string, callback: Callback<KObject>): void {
  }

  public createProxy(clazz: MetaClass, timeTree: TimeTree, key: number): KObject {
    return this.internalCreate(clazz, timeTree, key);
  }

  public create(clazz: MetaClass): KObject {
    var newObj: KObject = this.internalCreate(clazz, new DefaultTimeTree().insert(this.now()), this.dimension().universe().storage().nextObjectKey());
    if (newObj != null) {
      this.dimension().universe().storage().notify(new DefaultKEvent(KActionType.NEW, null, newObj, null, newObj));
    }
    return newObj;
  }

  public listen(listener: ModelListener): void {
    this.dimension().universe().storage().registerListener(this, listener);
  }

  public internalCreate(clazz: MetaClass, timeTree: TimeTree, key: number): KObject {
    throw "Abstract method";
  }

  public metaClasses(): MetaClass[] {
    throw "Abstract method";
  }

}

