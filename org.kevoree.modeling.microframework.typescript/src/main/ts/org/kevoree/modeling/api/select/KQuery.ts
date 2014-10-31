///<reference path="../../../../../java/util/HashMap.ts"/>
///<reference path="../../../../../java/util/Map.ts"/>

class KQuery {

  public static OPEN_BRACKET: string = '[';
  public static CLOSE_BRACKET: string = ']';
  public static QUERY_SEP: string = '/';
  public relationName: string = null;
  public params: Map<string, KQueryParam> = null;
  public subQuery: string = null;
  public oldString: string = null;
  public previousIsDeep: boolean = null;
  public previousIsRefDeep: boolean = null;

  constructor(relationName: string, params: Map<string, KQueryParam>, subQuery: string, oldString: string, previousIsDeep: boolean, previousIsRefDeep: boolean) {
    this.relationName = relationName;
    this.params = params;
    this.subQuery = subQuery;
    this.oldString = oldString;
    this.previousIsDeep = previousIsDeep;
    this.previousIsRefDeep = previousIsRefDeep;
  }

  public static extractFirstQuery(query: string): KQuery {
    if (query == null || query.length() == 0) {
      return null;
    }
    if (query.charAt(0) == KQuery.QUERY_SEP) {
      var subQuery: string = null;
      if (query.length() > 1) {
        subQuery = query.substring(1);
      }
      var params: Map<string, KQueryParam> = new HashMap<string, KQueryParam>();
      return new KQuery("", params, subQuery, "" + KQuery.QUERY_SEP, false, false);
    }
    if (query.startsWith("**/")) {
      if (query.length() > 3) {
        var next: KQuery = KQuery.extractFirstQuery(query.substring(3));
        if (next != null) {
          next.previousIsDeep = true;
          next.previousIsRefDeep = false;
        }
        return next;
      } else {
        return null;
      }
    }
    if (query.startsWith("***/")) {
      if (query.length() > 4) {
        var next: KQuery = KQuery.extractFirstQuery(query.substring(4));
        if (next != null) {
          next.previousIsDeep = true;
          next.previousIsRefDeep = true;
        }
        return next;
      } else {
        return null;
      }
    }
    var i: number = 0;
    var relationNameEnd: number = 0;
    var attsEnd: number = 0;
    var escaped: boolean = false;
    while (i < query.length() && ((query.charAt(i) != KQuery.QUERY_SEP) || escaped)){
      if (escaped) {
        escaped = false;
      }
      if (query.charAt(i) == KQuery.OPEN_BRACKET) {
        relationNameEnd = i;
      } else {
        if (query.charAt(i) == KQuery.CLOSE_BRACKET) {
          attsEnd = i;
        } else {
          if (query.charAt(i) == '\\') {
            escaped = true;
          }
        }
      }
      i = i + 1;
    }
    if (i > 0 && relationNameEnd > 0) {
      var oldString: string = query.substring(0, i);
      var subQuery: string = null;
      if (i + 1 < query.length()) {
        subQuery = query.substring(i + 1);
      }
      var relName: string = query.substring(0, relationNameEnd);
      var params: HashMap<string, KQueryParam> = new HashMap<string, KQueryParam>();
      relName = relName.replace("\\", "");
      if (attsEnd != 0) {
        var paramString: string = query.substring(relationNameEnd + 1, attsEnd);
        var iParam: number = 0;
        var lastStart: number = iParam;
        escaped = false;
        while (iParam < paramString.length()){
          if (paramString.charAt(iParam) == ',' && !escaped) {
            var p: string = paramString.substring(lastStart, iParam).trim();
            if (p.equals("") && !p.equals("*")) {
              if (p.endsWith("=")) {
                p = p + "*";
              }
              var pArray: string[] = p.split("=");
              var pObject: KQueryParam;
              if (pArray.length > 1) {
                var paramKey: string = pArray[0].trim();
                var negative: boolean = paramKey.endsWith("!");
                pObject = new KQueryParam(paramKey.replace("!", ""), pArray[1].trim(), negative);
                params.put(pObject.name(), pObject);
              } else {
                pObject = new KQueryParam(null, p, false);
                params.put("@id", pObject);
              }
            }
            lastStart = iParam + 1;
          } else {
            if (paramString.charAt(iParam) == '\\') {
              escaped = true;
            } else {
              escaped = false;
            }
          }
          iParam = iParam + 1;
        }
        var lastParam: string = paramString.substring(lastStart, iParam).trim();
        if (!lastParam.equals("") && !lastParam.equals("*")) {
          if (lastParam.endsWith("=")) {
            lastParam = lastParam + "*";
          }
          var pArray: string[] = lastParam.split("=");
          var pObject: KQueryParam;
          if (pArray.length > 1) {
            var paramKey: string = pArray[0].trim();
            var negative: boolean = paramKey.endsWith("!");
            pObject = new KQueryParam(paramKey.replace("!", ""), pArray[1].trim(), negative);
            params.put(pObject.name(), pObject);
          } else {
            pObject = new KQueryParam(null, lastParam, false);
            params.put("@id", pObject);
          }
        }
      }
      return new KQuery(relName, params, subQuery, oldString, false, false);
    }
    return null;
  }

}

