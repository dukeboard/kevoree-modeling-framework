///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../../../../../java/util/ArrayList.ts"/>
///<reference path="../../../../../java/util/HashMap.ts"/>

class XMILoadingContext {

  public xmiReader: XmlParser = null;
  public loadedRoots: KObject<any,any> = null;
  public resolvers: ArrayList<XMIResolveCommand> = new ArrayList<XMIResolveCommand>();
  public map: HashMap<string, KObject> = new HashMap<string, KObject>();
  public elementsCount: HashMap<string, number> = new HashMap<string, number>();
  public stats: HashMap<string, number> = new HashMap<string, number>();
  public oppositesAlreadySet: HashMap<string, boolean> = new HashMap<string, boolean>();
  public successCallback: Callback<Throwable> = null;

  public isOppositeAlreadySet(localRef: string, oppositeRef: string): boolean {
    return (this.oppositesAlreadySet.get(oppositeRef + "_" + localRef) != null || (this.oppositesAlreadySet.get(localRef + "_" + oppositeRef) != null));
  }

  public storeOppositeRelation(localRef: string, oppositeRef: string): void {
    this.oppositesAlreadySet.put(localRef + "_" + oppositeRef, true);
  }

}

