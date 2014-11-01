///<reference path="../KObject.ts"/>
///<reference path="../ModelSerializer.ts"/>
///<reference path="../ModelVisitor.ts"/>
///<reference path="../ThrowableCallback.ts"/>
///<reference path="../VisitResult.ts"/>

class XMIModelSerializer implements ModelSerializer {

  public serialize(model: KObject<any,any>, callback: ThrowableCallback<string>): void {
    var context: SerializationContext = new SerializationContext();
    context.model = model;
    context.finishCallback = callback;
    context.attributesVisitor = new AttributesVisitor(context);
    context.printer = new StringBuilder();
    context.addressTable.put(model.uuid(), "/");
    model.treeVisit(
      public visit(elem: KObject): VisitResult {
        var parentXmiAddress: string = context.addressTable.get(elem.parentUuid());
        var key: string = parentXmiAddress + "/@" + elem.referenceInParent().metaName();
        var i: number = context.elementsCount.get(key);
        if (i == null) {
          i = 0;
          context.elementsCount.put(key, i);
        }
        context.addressTable.put(elem.uuid(), parentXmiAddress + "/@" + elem.referenceInParent().metaName() + "." + i);
        context.elementsCount.put(parentXmiAddress + "/@" + elem.referenceInParent().metaName(), i + 1);
        var pack: string = elem.metaClass().metaName().substring(0, elem.metaClass().metaName().lastIndexOf('.'));
        if (!context.packageList.contains(pack)) {
          context.packageList.add(pack);
        }
        return VisitResult.CONTINUE;
      }

, new PrettyPrinter(context));
  }

  public static escapeXml(ostream: StringBuilder, chain: string): void {
    if (chain == null) {
      return;
    }
    var i: number = 0;
    var max: number = chain.length();
    while (i < max){
      var c: string = chain.charAt(i);
      if (c == '"') {
        ostream.append("&quot;");
      } else {
        if (c == '&') {
          ostream.append("&amp;");
        } else {
          if (c == '\'') {
            ostream.append("&apos;");
          } else {
            if (c == '<') {
              ostream.append("&lt;");
            } else {
              if (c == '>') {
                ostream.append("&gt;");
              } else {
                ostream.append(c);
              }
            }
          }
        }
      }
      i = i + 1;
    }
  }

  public static formatMetaClassName(metaClassName: string): string {
    var lastPoint: number = metaClassName.lastIndexOf('.');
    var pack: string = metaClassName.substring(0, lastPoint);
    var cls: string = metaClassName.substring(lastPoint + 1);
    return pack + ":" + cls;
  }

}

