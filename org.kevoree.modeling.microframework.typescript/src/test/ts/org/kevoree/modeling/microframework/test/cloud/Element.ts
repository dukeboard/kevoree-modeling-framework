///<reference path="../../../api/KObject.ts"/>
///<reference path="../../../api/meta/MetaType.ts"/>
///<reference path="../../../api/Extrapolations.ts"/>
///<reference path="../../../api/strategy/ExtrapolationStrategy.ts"/>
///<reference path="../../../api/meta/MetaAttribute.ts"/>
///<reference path="../../../api/meta/MetaClass.ts"/>

interface Element extends KObject<Element, CloudView> {

  getName(): string;

  setName(name: string): Element;

  getValue(): number;

  setValue(name: number): Element;

}

module Element { 

  class METAATTRIBUTES implements MetaAttribute {

    public static NAME: METAATTRIBUTES = new METAATTRIBUTES("name", 2, 5, true, MetaType.STRING, Extrapolations.DISCRETE.strategy());
    public static VALUE: METAATTRIBUTES = new METAATTRIBUTES("value", 3, 5, false, MetaType.LONG, Extrapolations.POLYNOMIAL.strategy());
    private _name: string = null;
    private _index: number = 0;
    private _precision: number = 0;
    private _key: boolean = null;
    private _metaType: MetaType = null;
    private extrapolationStrategy: ExtrapolationStrategy = null;

    public metaType(): MetaType {
      return this._metaType;
    }

    public index(): number {
      return this._index;
    }

    public metaName(): string {
      return this._name;
    }

    public precision(): number {
      return this._precision;
    }

    public key(): boolean {
      return this._key;
    }

    public origin(): MetaClass {
      return CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT;
    }

    public strategy(): ExtrapolationStrategy {
      return this.extrapolationStrategy;
    }

    public setExtrapolationStrategy(extrapolationStrategy: ExtrapolationStrategy): void {
      this.extrapolationStrategy = extrapolationStrategy;
    }

    constructor(name: string, index: number, precision: number, key: boolean, metaType: MetaType, extrapolationStrategy: ExtrapolationStrategy) {
      this._name = name;
      this._index = index;
      this._precision = precision;
      this._key = key;
      this._metaType = metaType;
      this.extrapolationStrategy = extrapolationStrategy;
    }

    public equals(other: AccessMode): boolean {
        return this == other;
    }

  }


}
