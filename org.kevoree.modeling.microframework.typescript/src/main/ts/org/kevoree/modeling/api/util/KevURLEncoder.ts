///<reference path="../../../../../java/util/HashMap.ts"/>
///<reference path="../../../../../java/util/Map.ts"/>

class KevURLEncoder {

  private static INSTANCE: KevURLEncoder = null;
  private static nonEscaped: Map<string, boolean> = new HashMap<string, boolean>();
  private static escaped: HashMap<string, string> = new HashMap<string, string>();
  private static rescaped: Map<string, string> = new HashMap<string, string>();

  public static getINSTANCE(): KevURLEncoder {
    if (KevURLEncoder.INSTANCE == null) {
      KevURLEncoder.INSTANCE = new KevURLEncoder();
    }
    return KevURLEncoder.INSTANCE;
  }

  constructor() {
    var i: string = 'a';
    while (i < 'z'){
      KevURLEncoder.nonEscaped.put(i, true);
      i++;
    }
    i = 'A';
    while (i < 'Z'){
      KevURLEncoder.nonEscaped.put(i, true);
      i++;
    }
    i = '0';
    while (i < '9'){
      KevURLEncoder.nonEscaped.put(i, true);
      i++;
    }
    KevURLEncoder.escaped.put('!', "%21");
    KevURLEncoder.escaped.put('"', "%22");
    KevURLEncoder.escaped.put('#', "%23");
    KevURLEncoder.escaped.put('$', "%24");
    KevURLEncoder.escaped.put('%', "%25");
    KevURLEncoder.escaped.put('&', "%26");
    KevURLEncoder.escaped.put('*', "%2A");
    KevURLEncoder.escaped.put(',', "%2C");
    KevURLEncoder.escaped.put('/', "%2F");
    KevURLEncoder.escaped.put(']', "%5B");
    KevURLEncoder.escaped.put('\\', "%5c");
    KevURLEncoder.escaped.put('[', "%5D");
    //TODO resolve for-each cycle
    var c: string;
    for (c in KevURLEncoder.escaped.keySet()) {
      KevURLEncoder.rescaped.put(KevURLEncoder.escaped.get(c), c);
    }
  }

  public encode(chain: string): string {
    if (chain == null) {
      return null;
    }
    var buffer: StringBuilder = null;
    var i: number = 0;
    while (i < chain.length){
      var ch: string = chain.charAt(i);
      if (KevURLEncoder.nonEscaped.containsKey(ch)) {
        if (buffer != null) {
          buffer.append(ch);
        }
      } else {
        var resolved: string = KevURLEncoder.escaped.get(ch);
        if (resolved != null) {
          if (buffer == null) {
            buffer = new StringBuilder();
            buffer.append(chain.substring(0, i));
          }
          buffer.append(resolved);
        }
      }
      i = i + 1;
    }
    if (buffer != null) {
      return buffer.toString();
    } else {
      return chain;
    }
  }

  public decode(src: string): string {
    if (src == null) {
      return null;
    }
    if (src.length == 0) {
      return src;
    }
    var builder: StringBuilder = null;
    var i: number = 0;
    while (i < src.length){
      var current: number = <number>src.charAt(i);
      if (current == '%') {
        if (builder == null) {
          builder = new StringBuilder();
          builder.append(src.substring(0, i));
        }
        var key: string = "" + current + src.charAt(i + 1) + src.charAt(i + 2);
        var resolved: string = KevURLEncoder.rescaped.get(key);
        if (resolved == null) {
          builder = builder.append(key);
        } else {
          builder = builder.append(resolved);
        }
        i = i + 2;
      } else {
        if (builder != null) {
          builder = builder.append(current);
        }
      }
      i++;
    }
    if (builder != null) {
      return builder.toString();
    } else {
      return src;
    }
  }

}

