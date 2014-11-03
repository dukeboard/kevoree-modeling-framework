///<reference path="../KObject.ts"/>
///<reference path="../KActionType.ts"/>

class XMIResolveCommand {

  private context: XMILoadingContext = null;
  private target: KObject<any,any> = null;
  private mutatorType: KActionType = null;
  private refName: string = null;
  private ref: string = null;

  constructor(context: XMILoadingContext, target: KObject<any,any>, mutatorType: KActionType, refName: string, ref: string) {
    this.context = context;
    this.target = target;
    this.mutatorType = mutatorType;
    this.refName = refName;
    this.ref = ref;
  }

  public run(): void {
    var referencedElement: KObject<any,any> = this.context.map.get(this.ref);
    if (referencedElement != null) {
      this.target.mutate(this.mutatorType, this.target.metaReference(this.refName), referencedElement, true);
      return;
    }
    referencedElement = this.context.map.get("/");
    if (referencedElement != null) {
      this.target.mutate(this.mutatorType, this.target.metaReference(this.refName), referencedElement, true);
      return;
    }
    throw new Exception("KMF Load error : reference " + this.ref + " not found in map when trying to  " + this.mutatorType + " " + this.refName + "  on " + this.target.metaClass().metaName() + "(uuid:" + this.target.uuid() + ")");
  }

}

