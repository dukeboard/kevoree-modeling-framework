
class Type {

  public static VALUE: Type = new Type(0);
  public static LEFT_BRACE: Type = new Type(1);
  public static RIGHT_BRACE: Type = new Type(2);
  public static LEFT_BRACKET: Type = new Type(3);
  public static RIGHT_BRACKET: Type = new Type(4);
  public static COMMA: Type = new Type(5);
  public static COLON: Type = new Type(6);
  public static EOF: Type = new Type(42);
  private _value: number = 0;

  constructor(p_value: number) {
    this._value = p_value;
  }

  public equals(other: AccessMode): boolean {
        return this == other;
    }

}

