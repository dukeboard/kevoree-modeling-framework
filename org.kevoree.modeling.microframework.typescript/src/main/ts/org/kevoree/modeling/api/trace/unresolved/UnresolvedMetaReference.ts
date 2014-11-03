///<reference path="../../meta/MetaClass.ts"/>
///<reference path="../../meta/MetaReference.ts"/>

class UnresolvedMetaReference implements MetaReference {

  private _metaName: string = null;

  constructor(p_metaName: string) {
    this._metaName = p_metaName;
  }

  public contained(): boolean {
    return false;
  }

  public single(): boolean {
    return false;
  }

  public metaType(): MetaClass {
    return null;
  }

  public opposite(): MetaReference {
    return null;
  }

  public origin(): MetaClass {
    return null;
  }

  public metaName(): string {
    return this._metaName;
  }

  public index(): number {
    return -1;
  }

}

