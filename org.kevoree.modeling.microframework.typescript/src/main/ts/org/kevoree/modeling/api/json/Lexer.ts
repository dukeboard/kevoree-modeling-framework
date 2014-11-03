///<reference path="../util/Converters.ts"/>
///<reference path="../../../../../java/util/JUHashSet.ts"/>

class Lexer {

  private bytes: number[] = null;
  private EOF: JsonToken = null;
  private BOOLEAN_LETTERS: JUHashSet<string> = null;
  private DIGIT: JUHashSet<string> = null;
  private index: number = 0;
  private static DEFAULT_BUFFER_SIZE: number = 1024 * 4;

  constructor(payload: string) {
    this.bytes = payload.getBytes();
    this.EOF = new JsonToken(Type.EOF, null);
  }

  public isSpace(c: string): boolean {
    return c == ' ' || c == '\r' || c == '\n' || c == '\t';
  }

  private nextChar(): string {
    return new Converters().toChar(this.bytes[this.index++]);
  }

  private peekChar(): string {
    return new Converters().toChar(this.bytes[this.index]);
  }

  private isDone(): boolean {
    return this.index >= this.bytes.length;
  }

  private isBooleanLetter(c: string): boolean {
    if (this.BOOLEAN_LETTERS == null) {
      this.BOOLEAN_LETTERS = new JUHashSet<string>();
      this.BOOLEAN_LETTERS.add('f');
      this.BOOLEAN_LETTERS.add('a');
      this.BOOLEAN_LETTERS.add('l');
      this.BOOLEAN_LETTERS.add('s');
      this.BOOLEAN_LETTERS.add('e');
      this.BOOLEAN_LETTERS.add('t');
      this.BOOLEAN_LETTERS.add('r');
      this.BOOLEAN_LETTERS.add('u');
    }
    return this.BOOLEAN_LETTERS.contains(c);
  }

  private isDigit(c: string): boolean {
    if (this.DIGIT == null) {
      this.DIGIT = new JUHashSet<string>();
      this.DIGIT.add('0');
      this.DIGIT.add('1');
      this.DIGIT.add('2');
      this.DIGIT.add('3');
      this.DIGIT.add('4');
      this.DIGIT.add('5');
      this.DIGIT.add('6');
      this.DIGIT.add('7');
      this.DIGIT.add('8');
      this.DIGIT.add('9');
    }
    return this.DIGIT.contains(c);
  }

  private isValueLetter(c: string): boolean {
    return c == '-' || c == '+' || c == '.' || this.isDigit(c) || this.isBooleanLetter(c);
  }

  public nextToken(): JsonToken {
    if (this.isDone()) {
      return this.EOF;
    }
    var tokenType: Type = Type.EOF;
    var c: string = this.nextChar();
    var currentValue: StringBuilder = new StringBuilder();
    var jsonValue: any = null;
    while (!this.isDone() && this.isSpace(c)){
      c = this.nextChar();
    }
    if ('"' == c) {
      tokenType = Type.VALUE;
      if (!this.isDone()) {
        c = this.nextChar();
        while (this.index < this.bytes.length && c != '"'){
          currentValue.append(c);
          if (c == '\\' && this.index < this.bytes.length) {
            c = this.nextChar();
            currentValue.append(c);
          }
          c = this.nextChar();
        }
        jsonValue = currentValue.toString();
      }
    } else {
      if ('{' == c) {
        tokenType = Type.LEFT_BRACE;
      } else {
        if ('}' == c) {
          tokenType = Type.RIGHT_BRACE;
        } else {
          if ('[' == c) {
            tokenType = Type.LEFT_BRACKET;
          } else {
            if (']' == c) {
              tokenType = Type.RIGHT_BRACKET;
            } else {
              if (':' == c) {
                tokenType = Type.COLON;
              } else {
                if (',' == c) {
                  tokenType = Type.COMMA;
                } else {
                  if (!this.isDone()) {
                    while (this.isValueLetter(c)){
                      currentValue.append(c);
                      if (!this.isValueLetter(this.peekChar())) {
                        break;
                      } else {
                        c = this.nextChar();
                      }
                    }
                    var v: string = currentValue.toString();
                    if ("true".equals(v.toLowerCase())) {
                      jsonValue = true;
                    } else {
                      if ("false".equals(v.toLowerCase())) {
                        jsonValue = false;
                      } else {
                        jsonValue = v.toLowerCase();
                      }
                    }
                    tokenType = Type.VALUE;
                  } else {
                    tokenType = Type.EOF;
                  }
                }
              }
            }
          }
        }
      }
    }
    return new JsonToken(tokenType, jsonValue);
  }

}

