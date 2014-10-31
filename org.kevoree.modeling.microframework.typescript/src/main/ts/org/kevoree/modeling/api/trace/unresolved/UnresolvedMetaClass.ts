///<reference path="../../meta/MetaClass.ts"/>

class UnresolvedMetaClass implements MetaClass {

  private metaName: string = null;

  constructor(metaName: string) {
    this.metaName = metaName;
  }

  public metaName(): string {
    return this.metaName;
  }

  public index(): number {
    return -1;
  }

}

