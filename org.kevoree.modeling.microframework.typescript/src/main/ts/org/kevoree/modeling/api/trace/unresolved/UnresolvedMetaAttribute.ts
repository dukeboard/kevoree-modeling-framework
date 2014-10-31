///<reference path="../../meta/MetaType.ts"/>
///<reference path="../../strategy/ExtrapolationStrategy.ts"/>
///<reference path="../../meta/MetaAttribute.ts"/>
///<reference path="../../meta/MetaClass.ts"/>

class UnresolvedMetaAttribute implements MetaAttribute {

  private metaName: string = null;

  constructor(metaName: string) {
    this.metaName = metaName;
  }

  public key(): boolean {
    return false;
  }

  public origin(): MetaClass {
    return null;
  }

  public metaType(): MetaType {
    return null;
  }

  public strategy(): ExtrapolationStrategy {
    return null;
  }

  public precision(): number {
    return 0;
  }

  public setExtrapolationStrategy(extrapolationStrategy: ExtrapolationStrategy): void {
  }

  public metaName(): string {
    return this.metaName;
  }

  public index(): number {
    return -1;
  }

}

