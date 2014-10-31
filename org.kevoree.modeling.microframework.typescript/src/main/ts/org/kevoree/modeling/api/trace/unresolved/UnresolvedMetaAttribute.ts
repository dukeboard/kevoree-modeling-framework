///<reference path="../../meta/MetaType.ts"/>
///<reference path="../../strategy/ExtrapolationStrategy.ts"/>
///<reference path="../../meta/MetaAttribute.ts"/>
///<reference path="../../meta/MetaClass.ts"/>

class UnresolvedMetaAttribute implements MetaAttribute {

  private _metaName: string = null;

  constructor(p_metaName: string) {
    this._metaName = p_metaName;
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
    return this._metaName;
  }

  public index(): number {
    return -1;
  }

}

