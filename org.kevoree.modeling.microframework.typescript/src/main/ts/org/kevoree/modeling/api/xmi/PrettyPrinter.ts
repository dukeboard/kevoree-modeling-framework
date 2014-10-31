///<reference path="../Callback.ts"/>
///<reference path="../util/Helper.ts"/>

class PrettyPrinter implements Callback<Throwable> {

  private context: SerializationContext = null;

  constructor(context: SerializationContext) {
    this.context = context;
  }

  public on(throwable: Throwable): void {
    if (throwable != null) {
      this.context.finishCallback.on(null, throwable);
    } else {
      this.context.printer.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
      this.context.printer.append("<" + XMIModelSerializer.formatMetaClassName(this.context.model.metaClass().metaName()).replace(".", "_"));
      this.context.printer.append(" xmlns:xsi=\"http://wwww.w3.org/2001/XMLSchema-instance\"");
      this.context.printer.append(" xmi:version=\"2.0\"");
      this.context.printer.append(" xmlns:xmi=\"http://www.omg.org/XMI\"");
      var index: number = 0;
      while (index < this.context.packageList.size()){
        this.context.printer.append(" xmlns:" + this.context.packageList.get(index).replace(".", "_") + "=\"http://" + this.context.packageList.get(index) + "\"");
        index++;
      }
      this.context.model.visitAttributes(this.context.attributesVisitor);
      Helper.forall(this.context.model.metaReferences(), new NonContainedReferencesCallbackChain(this.context, this.context.model), 
        public on(err: Throwable): void {
          if (err == null) {
            this.context.printer.append(">\n");
            Helper.forall(this.context.model.metaReferences(), new ContainedReferencesCallbackChain(this.context, this.context.model), 
              public on(containedRefsEnd: Throwable): void {
                if (containedRefsEnd == null) {
                  this.context.printer.append("</" + XMIModelSerializer.formatMetaClassName(this.context.model.metaClass().metaName()).replace(".", "_") + ">\n");
                  this.context.finishCallback.on(this.context.printer.toString(), null);
                } else {
                  this.context.finishCallback.on(null, containedRefsEnd);
                }
              }

);
          } else {
            this.context.finishCallback.on(null, err);
          }
        }

);
    }
  }

}

