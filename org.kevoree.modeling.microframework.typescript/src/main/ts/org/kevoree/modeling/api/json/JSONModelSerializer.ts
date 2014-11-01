///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../ModelSerializer.ts"/>
///<reference path="../ModelVisitor.ts"/>
///<reference path="../ThrowableCallback.ts"/>
///<reference path="../VisitResult.ts"/>
///<reference path="../data/AccessMode.ts"/>
///<reference path="../../../../../java/util/Set.ts"/>

class JSONModelSerializer implements ModelSerializer {

  public static KEY_META: string = "@meta";
  public static KEY_UUID: string = "@uuid";
  public static KEY_ROOT: string = "@root";

  public serialize(model: KObject<any,any>, callback: ThrowableCallback<string>): void {
    var builder: StringBuilder = new StringBuilder();
    builder.append("[\n");
    JSONModelSerializer.printJSON(model, builder);
    model.graphVisit(
      public visit(elem: KObject): VisitResult {
        builder.append(",");
        JSONModelSerializer.printJSON(elem, builder);
        return VisitResult.CONTINUE;
      }

, 
      public on(throwable: Throwable): void {
        builder.append("]\n");
        callback.on(builder.toString(), throwable);
      }

);
  }

  public static printJSON(elem: KObject<any,any>, builder: StringBuilder): void {
    builder.append("{\n");
    builder.append("\t\"" + JSONModelSerializer.KEY_META + "\" : \"");
    builder.append(elem.metaClass().metaName());
    builder.append("\",\n");
    builder.append("\t\"" + JSONModelSerializer.KEY_UUID + "\" : \"");
    builder.append(elem.uuid() + "");
    if (elem.isRoot()) {
      builder.append("\",\n");
      builder.append("\t\"" + JSONModelSerializer.KEY_ROOT + "\" : \"");
      builder.append("true");
    }
    builder.append("\",\n");
    for (var i: number = 0; i < elem.metaAttributes().length; i++) {
      var payload: any = elem.get(elem.metaAttributes()[i]);
      if (payload != null) {
        builder.append("\t");
        builder.append("\"");
        builder.append(elem.metaAttributes()[i].metaName());
        builder.append("\" : \"");
        builder.append(payload.toString());
        builder.append("\",\n");
      }
    }
    for (var i: number = 0; i < elem.metaReferences().length; i++) {
      var raw: any[] = elem.view().dimension().universe().storage().raw(elem, AccessMode.READ);
      var payload: any = null;
      if (raw != null) {
        payload = raw[elem.metaReferences()[i].index()];
      }
      if (payload != null) {
        builder.append("\t");
        builder.append("\"");
        builder.append(elem.metaReferences()[i].metaName());
        builder.append("\" :");
        if (elem.metaReferences()[i].single()) {
          builder.append("\"");
          builder.append(payload.toString());
          builder.append("\"");
        } else {
          var elems: Set<number> = <Set<number>>payload;
          var elemsArr: number[] = elems.toArray(new Array());
          var isFirst: boolean = true;
          builder.append(" [");
          for (var j: number = 0; j < elemsArr.length; j++) {
            if (!isFirst) {
              builder.append(",");
            }
            builder.append("\"");
            builder.append(elemsArr[j] + "");
            builder.append("\"");
            isFirst = false;
          }
          builder.append("]");
        }
        builder.append(",\n");
      }
    }
    builder.append("}\n");
  }

}

