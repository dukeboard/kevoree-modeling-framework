///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelLoader.ts"/>
///<reference path="../abs/AbstractKObject.ts"/>
///<reference path="../data/AccessMode.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../meta/MetaType.ts"/>
///<reference path="../time/TimeTree.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../java/util/JUHashSet.ts"/>
///<reference path="../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../java/util/JUMap.ts"/>
///<reference path="../../../../../java/util/JUSet.ts"/>

class JSONModelLoader implements ModelLoader {

  private _factory: KView = null;

  constructor(p_factory: KView) {
    this._factory = p_factory;
  }

  public static load(payload: string, factory: KView, callback: Callback<KObject<any,any>>): KObject<any,any> {
    var lexer: Lexer = new Lexer(payload);
    var loaded: KObject<any,any>[] = new Array();
    JSONModelLoader.loadObjects(lexer, factory, {on:function(objs: JUList<KObject<any,any>>){
    loaded[0] = objs.get(0);
}});
    return loaded[0];
  }

  private static loadObjects(lexer: Lexer, factory: KView, callback: Callback<JUList<KObject<any,any>>>): void {
    var loaded: JUList<KObject<any,any>> = new JUArrayList<KObject<any,any>>();
    var alls: JUList<JUMap<string, any>> = new JUArrayList<JUMap<string, any>>();
    var content: JUMap<string, any> = new JUHashMap<string, any>();
    var currentAttributeName: string = null;
    var arrayPayload: JUSet<string> = null;
    var currentToken: JsonToken = lexer.nextToken();
    while (currentToken.tokenType() != Type.EOF){
      if (currentToken.tokenType().equals(Type.LEFT_BRACKET)) {
        arrayPayload = new JUHashSet<string>();
      } else {
        if (currentToken.tokenType().equals(Type.RIGHT_BRACKET)) {
          content.put(currentAttributeName, arrayPayload);
          arrayPayload = null;
          currentAttributeName = null;
        } else {
          if (currentToken.tokenType().equals(Type.LEFT_BRACE)) {
            content = new JUHashMap<string, any>();
          } else {
            if (currentToken.tokenType().equals(Type.RIGHT_BRACE)) {
              alls.add(content);
              content = new JUHashMap<string, any>();
            } else {
              if (currentToken.tokenType().equals(Type.VALUE)) {
                if (currentAttributeName == null) {
                  currentAttributeName = currentToken.value().toString();
                } else {
                  if (arrayPayload == null) {
                    content.put(currentAttributeName, currentToken.value().toString());
                    currentAttributeName = null;
                  } else {
                    arrayPayload.add(currentToken.value().toString());
                  }
                }
              }
            }
          }
        }
      }
      currentToken = lexer.nextToken();
    }
    var keys: number[] = new Array();
    for (var i: number = 0; i < keys.length; i++) {
      var kid: number = Long.parseLong(alls.get(i).get(JSONModelSerializer.KEY_UUID).toString());
      keys[i] = kid;
    }
    factory.dimension().timeTrees(keys, {on:function(timeTrees: TimeTree[]){
    for (var i: number = 0; i < alls.size(); i++) {
      var elem: JUMap<string, any> = alls.get(i);
      var meta: string = elem.get(JSONModelSerializer.KEY_META).toString();
      var kid: number = Long.parseLong(elem.get(JSONModelSerializer.KEY_UUID).toString());
      var isRoot: boolean = false;
      var root: any = elem.get(JSONModelSerializer.KEY_ROOT);
      if (root != null) {
        isRoot = root.toString().equals("true");
      }
      var timeTree: TimeTree = timeTrees[i];
      timeTree.insert(factory.now());
      var current: KObject<any,any> = factory.createProxy(factory.metaClass(meta), timeTree, kid);
      if (isRoot) {
        (<AbstractKObject<any,any>>current).setRoot(true);
      }
      loaded.add(current);
      var payloadObj: any[] = factory.dimension().universe().storage().raw(current, AccessMode.WRITE);
      //TODO resolve for-each cycle
      var k: string;
      for (k in elem.keySet()) {
        var att: MetaAttribute = current.metaAttribute(k);
        if (att != null) {
          payloadObj[att.index()] = JSONModelLoader.convertRaw(att, elem.get(k));
        } else {
          var ref: MetaReference = current.metaReference(k);
          if (ref != null) {
            if (ref.single()) {
              var refPayloadSingle: number;
              try {
                refPayloadSingle = Long.parseLong(elem.get(k).toString());
                payloadObj[ref.index()] = refPayloadSingle;
              } catch ($ex$) {
                if ($ex$ instanceof Exception) {
                  var e: Exception = <Exception>$ex$;
                  e.printStackTrace();
                }
               }
            } else {
              try {
                var plainRawList: JUSet<string> = <JUSet<string>>elem.get(k);
                var convertedRaw: JUSet<number> = new JUHashSet<number>();
                //TODO resolve for-each cycle
                var plainRaw: string;
                for (plainRaw in plainRawList) {
                  try {
                    var converted: number = Long.parseLong(plainRaw);
                    convertedRaw.add(converted);
                  } catch ($ex$) {
                    if ($ex$ instanceof Exception) {
                      var e: Exception = <Exception>$ex$;
                      e.printStackTrace();
                    }
                   }
                }
                payloadObj[ref.index()] = convertedRaw;
              } catch ($ex$) {
                if ($ex$ instanceof Exception) {
                  var e: Exception = <Exception>$ex$;
                  e.printStackTrace();
                }
               }
            }
          }
        }
      }
    }
    if (callback != null) {
      callback.on(loaded);
    }
}});
  }

  public load(payload: string, callback: Callback<Throwable>): void {
    if (payload == null) {
      callback.on(null);
    } else {
      var lexer: Lexer = new Lexer(payload);
      var currentToken: JsonToken = lexer.nextToken();
      if (currentToken.tokenType() != Type.LEFT_BRACKET) {
        callback.on(null);
      } else {
        JSONModelLoader.loadObjects(lexer, this._factory, {on:function(kObjects: JUList<KObject<any,any>>){
        callback.on(null);
}});
      }
    }
  }

  public static convertRaw(attribute: MetaAttribute, raw: any): any {
    try {
      if (attribute.metaType().equals(MetaType.STRING)) {
        return raw.toString();
      } else {
        if (attribute.metaType().equals(MetaType.LONG)) {
          return Long.parseLong(raw.toString());
        } else {
          if (attribute.metaType().equals(MetaType.INT)) {
            return Integer.parseInt(raw.toString());
          } else {
            if (attribute.metaType().equals(MetaType.BOOL)) {
              return raw.toString().equals("true");
            } else {
              if (attribute.metaType().equals(MetaType.SHORT)) {
                return Short.parseShort(raw.toString());
              } else {
                if (attribute.metaType().equals(MetaType.DOUBLE)) {
                  return Double.parseDouble(raw.toString());
                } else {
                  if (attribute.metaType().equals(MetaType.FLOAT)) {
                    return Float.parseFloat(raw.toString());
                  } else {
                    return null;
                  }
                }
              }
            }
          }
        }
      }
    } catch ($ex$) {
      if ($ex$ instanceof Exception) {
        var e: Exception = <Exception>$ex$;
        e.printStackTrace();
        return null;
      }
     }
  }

}

