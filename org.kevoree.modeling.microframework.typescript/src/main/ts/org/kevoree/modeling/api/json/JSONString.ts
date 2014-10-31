
class JSONString {

  private static ESCAPE_CHAR: string = '\\';

  public static encodeBuffer(buffer: StringBuilder, chain: string): void {
    if (chain == null) {
      return;
    }
    var i: number = 0;
    while (i < chain.length()){
      var ch: string = chain.charAt(i);
      if (ch == '"') {
        buffer.append(JSONString.ESCAPE_CHAR);
        buffer.append('"');
      } else {
        if (ch == JSONString.ESCAPE_CHAR) {
          buffer.append(JSONString.ESCAPE_CHAR);
          buffer.append(JSONString.ESCAPE_CHAR);
        } else {
          if (ch == '\n') {
            buffer.append(JSONString.ESCAPE_CHAR);
            buffer.append('n');
          } else {
            if (ch == '\r') {
              buffer.append(JSONString.ESCAPE_CHAR);
              buffer.append('r');
            } else {
              if (ch == '\t') {
                buffer.append(JSONString.ESCAPE_CHAR);
                buffer.append('t');
              } else {
                if (ch == '\u2028') {
                  buffer.append(JSONString.ESCAPE_CHAR);
                  buffer.append('u');
                  buffer.append('2');
                  buffer.append('0');
                  buffer.append('2');
                  buffer.append('8');
                } else {
                  if (ch == '\u2029') {
                    buffer.append(JSONString.ESCAPE_CHAR);
                    buffer.append('u');
                    buffer.append('2');
                    buffer.append('0');
                    buffer.append('2');
                    buffer.append('9');
                  } else {
                    buffer.append(ch);
                  }
                }
              }
            }
          }
        }
      }
      i = i + 1;
    }
  }

  public static encode(buffer: StringBuilder, chain: string): void {
    if (chain == null) {
      return;
    }
    var i: number = 0;
    while (i < chain.length()){
      var ch: string = chain.charAt(i);
      if (ch == '"') {
        buffer.append(JSONString.ESCAPE_CHAR);
        buffer.append('"');
      } else {
        if (ch == JSONString.ESCAPE_CHAR) {
          buffer.append(JSONString.ESCAPE_CHAR);
          buffer.append(JSONString.ESCAPE_CHAR);
        } else {
          if (ch == '\n') {
            buffer.append(JSONString.ESCAPE_CHAR);
            buffer.append('n');
          } else {
            if (ch == '\r') {
              buffer.append(JSONString.ESCAPE_CHAR);
              buffer.append('r');
            } else {
              if (ch == '\t') {
                buffer.append(JSONString.ESCAPE_CHAR);
                buffer.append('t');
              } else {
                if (ch == '\u2028') {
                  buffer.append(JSONString.ESCAPE_CHAR);
                  buffer.append('u');
                  buffer.append('2');
                  buffer.append('0');
                  buffer.append('2');
                  buffer.append('8');
                } else {
                  if (ch == '\u2029') {
                    buffer.append(JSONString.ESCAPE_CHAR);
                    buffer.append('u');
                    buffer.append('2');
                    buffer.append('0');
                    buffer.append('2');
                    buffer.append('9');
                  } else {
                    buffer.append(ch);
                  }
                }
              }
            }
          }
        }
      }
      i = i + 1;
    }
  }

  public static unescape(src: string): string {
    if (src == null) {
      return null;
    }
    if (src.length() == 0) {
      return src;
    }
    var builder: StringBuilder = null;
    var i: number = 0;
    while (i < src.length()){
      var current: string = src.charAt(i);
      if (current == JSONString.ESCAPE_CHAR) {
        if (builder == null) {
          builder = new StringBuilder();
          builder.append(src.substring(0, i));
        }
        i++;
        var current2: string = src.charAt(i);
        switch (current2) {
          case '"': 
          builder.append('\"');
          break;
          case '\\': 
          builder.append(current2);
          break;
          case '/': 
          builder.append(current2);
          break;
          case 'b': 
          builder.append('\b');
          break;
          case 'f': 
          builder.append('\f');
          break;
          case 'n': 
          builder.append('\n');
          break;
          case 'r': 
          builder.append('\r');
          break;
          case 't': 
          builder.append('\t');
          break;
        }
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

