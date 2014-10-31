///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../util/CallBackChain.ts"/>

class NonContainedReferencesCallbackChain implements CallBackChain<MetaReference> {

  private context: SerializationContext = null;
  private currentElement: KObject = null;

  constructor(context: SerializationContext, currentElement: KObject) {
    this.context = context;
    this.currentElement = currentElement;
  }

  public on(ref: MetaReference, next: Callback<Throwable>): void {
    if (!ref.contained()) {
      var value: string[] = new Array();
      value[0] = "";
      this.currentElement.each(ref, {on:function(o: any){
      var adjustedAddress: string = this.context.addressTable.get((<KObject>o).uuid());
      value[0] = (value[0].equals("") ? adjustedAddress : value[0] + " " + adjustedAddress);
}}, {on:function(end: Throwable){
      if (end == null) {
        if (value[0] != null) {
          this.context.printer.append(" " + ref.metaName() + "=\"" + value[0] + "\"");
        }
      }
      next.on(end);
}});
    } else {
      next.on(null);
    }
  }

}

