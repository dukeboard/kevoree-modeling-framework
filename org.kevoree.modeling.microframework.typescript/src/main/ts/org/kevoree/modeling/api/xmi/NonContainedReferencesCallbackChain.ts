///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../util/CallBackChain.ts"/>

class NonContainedReferencesCallbackChain implements CallBackChain<MetaReference> {

  private _context: SerializationContext = null;
  private _currentElement: KObject = null;

  constructor(p_context: SerializationContext, p_currentElement: KObject) {
    this._context = p_context;
    this._currentElement = p_currentElement;
  }

  public on(ref: MetaReference, next: Callback<Throwable>): void {
    if (!ref.contained()) {
      var value: string[] = new Array();
      value[0] = "";
      this._currentElement.each(ref, {on:function(o: any){
      var adjustedAddress: string = this._context.addressTable.get((<KObject>o).uuid());
      value[0] = (value[0].equals("") ? adjustedAddress : value[0] + " " + adjustedAddress);
}}, {on:function(end: Throwable){
      if (end == null) {
        if (value[0] != null) {
          this._context.printer.append(" " + ref.metaName() + "=\"" + value[0] + "\"");
        }
      }
      next.on(end);
}});
    } else {
      next.on(null);
    }
  }

}

