
class KQueryParam {

  private _name: string = null;
  private _value: string = null;
  private _negative: boolean = null;

  constructor(p_name: string, p_value: string, p_negative: boolean) {
    this._name = p_name;
    this._value = p_value;
    this._negative = p_negative;
  }

  public name(): string {
    return this._name;
  }

  public value(): string {
    return this._value;
  }

  public isNegative(): boolean {
    return this._negative;
  }

}

