///<reference path="../KObject.ts"/>
///<reference path="../ThrowableCallback.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>

class SerializationContext {

  public ignoreGeneratedID: boolean = false;
  public model: KObject<any,any> = null;
  public finishCallback: ThrowableCallback<string> = null;
  public printer: StringBuilder = null;
  public attributesVisitor: AttributesVisitor = null;
  public addressTable: JUHashMap<number, string> = new JUHashMap<number, string>();
  public elementsCount: JUHashMap<string, number> = new JUHashMap<string, number>();
  public packageList: JUArrayList<string> = new JUArrayList<string>();

}

