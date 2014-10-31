
class Token {

  private _tokenType: Type = null;
  private _value: any = null;

  constructor(p_tokenType: Type, p_value: any) {
    this._tokenType = p_tokenType;
    this._value = p_value;
  }

  public toString(): string {
    var v: string;
    if (this._value != null) {
      v = " (" + this._value + ")";
    } else {
      v = "";
    }
    var result: string = this._tokenType.toString() + v;
    return result;
  }

  public tokenType(): Type {
    return this._tokenType;
  }

  public value(): any {
    return this._value;
  }

}

