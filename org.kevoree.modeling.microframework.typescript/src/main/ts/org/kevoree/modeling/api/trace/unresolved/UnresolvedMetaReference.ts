///<reference path="../../meta/MetaClass.ts"/>
///<reference path="../../meta/MetaReference.ts"/>

class UnresolvedMetaReference implements MetaReference {

  private metaName: string = null;

  constructor(metaName: string) {
    this.metaName = metaName;
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
    return this.metaName;
  }

  public index(): number {
    return -1;
  }

}

