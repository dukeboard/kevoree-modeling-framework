///<reference path="../KEvent.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../meta/Meta.ts"/>
///<reference path="../KActionType.ts"/>

class DefaultKEvent implements KEvent {

  private _type: KActionType = null;
  private _meta: Meta = null;
  private _pastValue: any = null;
  private _newValue: any = null;
  private _source: KObject<any,any> = null;

  constructor(p_type: KActionType, p_meta: Meta, p_source: KObject<any,any>, p_pastValue: any, p_newValue: any) {
    this._type = p_type;
    this._meta = p_meta;
    this._source = p_source;
    this._pastValue = p_pastValue;
    this._newValue = p_newValue;
  }

  public toString(): string {
    var newValuePayload: string = "";
    if (this.newValue() != null) {
      newValuePayload = this.newValue().toString().replace("\n", "");
    }
    return "ModelEvent[src:[t=" + this._source.now() + "]uuid=" + this._source.uuid() + ", type:" + this._type + ", meta:" + this.meta() + ", pastValue:" + this.pastValue() + ", newValue:" + newValuePayload + "]";
  }

  public type(): KActionType {
    return this._type;
  }

  public meta(): Meta {
    return this._meta;
  }

  public pastValue(): any {
    return this._pastValue;
  }

  public newValue(): any {
    return this._newValue;
  }

  public src(): KObject<any,any> {
    return this._source;
  }

}

