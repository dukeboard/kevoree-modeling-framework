///<reference path="../KObject.ts"/>
///<reference path="../ThrowableCallback.ts"/>
///<reference path="../../../../../java/util/ArrayList.ts"/>
///<reference path="../../../../../java/util/HashMap.ts"/>

class SerializationContext {

  public ignoreGeneratedID: boolean = false;
  public model: KObject<any,any> = null;
  public finishCallback: ThrowableCallback<string> = null;
  public printer: StringBuilder = null;
  public attributesVisitor: AttributesVisitor = null;
  public addressTable: HashMap<number, string> = new HashMap<number, string>();
  public elementsCount: HashMap<string, number> = new HashMap<string, number>();
  public packageList: ArrayList<string> = new ArrayList<string>();

}

