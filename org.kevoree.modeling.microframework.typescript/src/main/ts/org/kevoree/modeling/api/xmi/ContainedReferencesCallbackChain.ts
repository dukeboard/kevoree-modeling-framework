///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../util/CallBackChain.ts"/>
///<reference path="../util/Helper.ts"/>

class ContainedReferencesCallbackChain implements CallBackChain<MetaReference> {

  private context: SerializationContext = null;
  private currentElement: KObject<any,any> = null;

  constructor(context: SerializationContext, currentElement: KObject) {
    this.context = context;
    this.currentElement = currentElement;
  }

  public on(ref: MetaReference, nextReference: Callback<Throwable>): void {
    if (ref.contained()) {
      this.currentElement.each(ref, 
        public on(o: any): void {
          var elem: KObject = <KObject>o;
          this.context.printer.append("<");
          this.context.printer.append(ref.metaName());
          this.context.printer.append(" xsi:type=\"" + XMIModelSerializer.formatMetaClassName(elem.metaClass().metaName()) + "\"");
          elem.visitAttributes(this.context.attributesVisitor);
          Helper.forall(elem.metaReferences(), new NonContainedReferencesCallbackChain(this.context, elem), 
            public on(err: Throwable): void {
              if (err == null) {
                this.context.printer.append(">\n");
                Helper.forall(elem.metaReferences(), new ContainedReferencesCallbackChain(this.context, elem), 
                  public on(containedRefsEnd: Throwable): void {
                    if (containedRefsEnd == null) {
                      this.context.printer.append("</");
                      this.context.printer.append(ref.metaName());
                      this.context.printer.append('>');
                      this.context.printer.append("\n");
                    }
                  }

);
              } else {
                this.context.finishCallback.on(null, err);
              }
            }

);
        }

, 
        public on(throwable: Throwable): void {
          nextReference.on(null);
        }

);
    } else {
      nextReference.on(null);
    }
  }

}

