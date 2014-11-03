///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>

class XMILoadingContext {

  public xmiReader: XmlParser = null;
  public loadedRoots: KObject<any,any> = null;
  public resolvers: JUArrayList<XMIResolveCommand> = new JUArrayList<XMIResolveCommand>();
  public map: JUHashMap<string, KObject<any,any>> = new JUHashMap<string, KObject<any,any>>();
  public elementsCount: JUHashMap<string, number> = new JUHashMap<string, number>();
  public stats: JUHashMap<string, number> = new JUHashMap<string, number>();
  public oppositesAlreadySet: JUHashMap<string, boolean> = new JUHashMap<string, boolean>();
  public successCallback: Callback<Throwable> = null;

  public isOppositeAlreadySet(localRef: string, oppositeRef: string): boolean {
    return (this.oppositesAlreadySet.get(oppositeRef + "_" + localRef) != null || (this.oppositesAlreadySet.get(localRef + "_" + oppositeRef) != null));
  }

  public storeOppositeRelation(localRef: string, oppositeRef: string): void {
    this.oppositesAlreadySet.put(localRef + "_" + oppositeRef, true);
  }

}

