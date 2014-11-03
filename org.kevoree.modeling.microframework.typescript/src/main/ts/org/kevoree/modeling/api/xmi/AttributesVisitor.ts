///<reference path="../ModelAttributeVisitor.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>

class AttributesVisitor implements ModelAttributeVisitor {

  private context: SerializationContext = null;

  constructor(context: SerializationContext) {
    this.context = context;
  }

  public visit(metaAttribute: MetaAttribute, value: any): void {
    if (value != null) {
      if (this.context.ignoreGeneratedID && metaAttribute.metaName().equals("generated_KMF_ID")) {
        return;
      }
      this.context.printer.append(" " + metaAttribute.metaName() + "=\"");
      XMIModelSerializer.escapeXml(this.context.printer, value.toString());
      this.context.printer.append("\"");
    }
  }

}

