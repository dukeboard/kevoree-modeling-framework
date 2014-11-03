///<reference path="../../meta/MetaClass.ts"/>

class UnresolvedMetaClass implements MetaClass {

  private _metaName: string = null;

  constructor(p_metaName: string) {
    this._metaName = p_metaName;
  }

  public metaName(): string {
    return this._metaName;
  }

  public index(): number {
    return -1;
  }

}

