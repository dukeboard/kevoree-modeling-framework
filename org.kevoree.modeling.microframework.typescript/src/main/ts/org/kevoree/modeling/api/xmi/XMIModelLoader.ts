///<reference path="../Callback.ts"/>
///<reference path="../KActionType.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelLoader.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../../../../../java/util/HashMap.ts"/>

class XMIModelLoader implements ModelLoader {

  private _factory: KView = null;
  public static LOADER_XMI_LOCAL_NAME: string = "type";
  public static LOADER_XMI_XSI: string = "xsi";
  public static LOADER_XMI_NS_URI: string = "nsURI";

  constructor(p_factory: KView) {
    this._factory = p_factory;
  }

  public static unescapeXml(src: string): string {
    var builder: StringBuilder = null;
    var i: number = 0;
    while (i < src.length()){
      var c: string = src.charAt(i);
      if (c == '&') {
        if (builder == null) {
          builder = new StringBuilder();
          builder.append(src.substring(0, i));
        }
        if (src.charAt(i + 1) == 'a') {
          if (src.charAt(i + 2) == 'm') {
            builder.append("&");
            i = i + 5;
          } else {
            if (src.charAt(i + 2) == 'p') {
              builder.append("'");
              i = i + 6;
            }
          }
        } else {
          if (src.charAt(i + 1) == 'q') {
            builder.append("\"");
            i = i + 6;
          } else {
            if (src.charAt(i + 1) == 'l') {
              builder.append("<");
              i = i + 4;
            } else {
              if (src.charAt(i + 1) == 'g') {
                builder.append(">");
                i = i + 4;
              }
            }
          }
        }
      } else {
        if (builder != null) {
          builder.append(c);
        }
        i++;
      }
    }
    if (builder != null) {
      return builder.toString();
    } else {
      return src;
    }
  }

  public load(str: string, callback: Callback<Throwable>): void {
    var parser: XmlParser = new XmlParser(str);
    if (!parser.hasNext()) {
      callback.on(null);
    } else {
      var context: XMILoadingContext = new XMILoadingContext();
      context.successCallback = callback;
      context.xmiReader = parser;
      this.deserialize(context);
    }
  }

  private deserialize(context: XMILoadingContext): void {
    try {
      var nsURI: string;
      var reader: XmlParser = context.xmiReader;
      while (reader.hasNext()){
        var nextTag: XmlToken = reader.next();
        if (nextTag.equals(XmlToken.START_TAG)) {
          var localName: string = reader.getLocalName();
          if (localName != null) {
            var ns: HashMap<string, string> = new HashMap<string, string>();
            for (var i: number = 0; i < reader.getAttributeCount() - 1; i++) {
              var attrLocalName: string = reader.getAttributeLocalName(i);
              var attrLocalValue: string = reader.getAttributeValue(i);
              if (attrLocalName.equals(XMIModelLoader.LOADER_XMI_NS_URI)) {
                nsURI = attrLocalValue;
              }
              ns.put(attrLocalName, attrLocalValue);
            }
            var xsiType: string = reader.getTagPrefix();
            var realTypeName: string = ns.get(xsiType);
            if (realTypeName == null) {
              realTypeName = xsiType;
            }
            context.loadedRoots = this.loadObject(context, "/", xsiType + "." + localName);
          }
        }
      }
      //TODO resolve for-each cycle
      var res: XMIResolveCommand;
      for (res in context.resolvers) {
        res.run();
      }
      this._factory.setRoot(context.loadedRoots);
      context.successCallback.on(null);
    } catch ($ex$) {
      if ($ex$ instanceof Exception) {
        var e: Exception = <Exception>$ex$;
        context.successCallback.on(e);
      }
     }
  }

  private callFactory(ctx: XMILoadingContext, objectType: string): KObject<any,any> {
    var modelElem: KObject<any,any> = null;
    if (objectType != null) {
      modelElem = this._factory.createFQN(objectType);
      if (modelElem == null) {
        var xsiType: string = null;
        for (var i: number = 0; i < (ctx.xmiReader.getAttributeCount() - 1); i++) {
          var localName: string = ctx.xmiReader.getAttributeLocalName(i);
          var xsi: string = ctx.xmiReader.getAttributePrefix(i);
          if (localName.equals(XMIModelLoader.LOADER_XMI_LOCAL_NAME) && xsi.equals(XMIModelLoader.LOADER_XMI_XSI)) {
            xsiType = ctx.xmiReader.getAttributeValue(i);
            break;
          }
        }
        if (xsiType != null) {
          var realTypeName: string = xsiType.substring(0, xsiType.lastIndexOf(":"));
          var realName: string = xsiType.substring(xsiType.lastIndexOf(":") + 1, xsiType.length());
          modelElem = this._factory.createFQN(realTypeName + "." + realName);
        }
      }
    } else {
      modelElem = this._factory.createFQN(ctx.xmiReader.getLocalName());
    }
    return modelElem;
  }

  private loadObject(ctx: XMILoadingContext, xmiAddress: string, objectType: string): KObject<any,any> {
    var elementTagName: string = ctx.xmiReader.getLocalName();
    var modelElem: KObject<any,any> = this.callFactory(ctx, objectType);
    if (modelElem == null) {
      throw new Exception("Could not create an object for local name " + elementTagName);
    }
    ctx.map.put(xmiAddress, modelElem);
    for (var i: number = 0; i < ctx.xmiReader.getAttributeCount(); i++) {
      var prefix: string = ctx.xmiReader.getAttributePrefix(i);
      if (prefix == null || prefix.equals("")) {
        var attrName: string = ctx.xmiReader.getAttributeLocalName(i).trim();
        var valueAtt: string = ctx.xmiReader.getAttributeValue(i).trim();
        if (valueAtt != null) {
          var kAttribute: MetaAttribute = modelElem.metaAttribute(attrName);
          if (kAttribute != null) {
            modelElem.set(kAttribute, XMIModelLoader.unescapeXml(valueAtt));
          } else {
            var kreference: MetaReference = modelElem.metaReference(attrName);
            if (kreference != null) {
              var referenceArray: string[] = valueAtt.split(" ");
              for (var j: number = 0; j < referenceArray.length; j++) {
                var xmiRef: string = referenceArray[j];
                var adjustedRef: string = (xmiRef.startsWith("#") ? xmiRef.substring(1) : xmiRef);
                adjustedRef = adjustedRef.replace(".0", "");
                var ref: KObject<any,any> = ctx.map.get(adjustedRef);
                if (ref != null) {
                  modelElem.mutate(KActionType.ADD, kreference, ref, true);
                } else {
                  ctx.resolvers.add(new XMIResolveCommand(ctx, modelElem, KActionType.ADD, attrName, adjustedRef));
                }
              }
            } else {
            }
          }
        }
      }
    }
    var done: boolean = false;
    while (!done){
      if (ctx.xmiReader.hasNext()) {
        var tok: XmlToken = ctx.xmiReader.next();
        if (tok.equals(XmlToken.START_TAG)) {
          var subElemName: string = ctx.xmiReader.getLocalName();
          var key: string = xmiAddress + "/@" + subElemName;
          var i: number = ctx.elementsCount.get(key);
          if (i == null) {
            i = 0;
            ctx.elementsCount.put(key, i);
          }
          var subElementId: string = xmiAddress + "/@" + subElemName + (i != 0 ? "." + i : "");
          var containedElement: KObject<any,any> = this.loadObject(ctx, subElementId, subElemName);
          modelElem.mutate(KActionType.ADD, modelElem.metaReference(subElemName), containedElement, true);
          ctx.elementsCount.put(xmiAddress + "/@" + subElemName, i + 1);
        } else {
          if (tok.equals(XmlToken.END_TAG)) {
            if (ctx.xmiReader.getLocalName().equals(elementTagName)) {
              done = true;
            }
          }
        }
      } else {
        done = true;
      }
    }
    return modelElem;
  }

}

