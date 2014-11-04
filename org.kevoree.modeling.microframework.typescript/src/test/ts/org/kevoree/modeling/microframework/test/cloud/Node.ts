///<reference path="../../../api/Callback.ts"/>
///<reference path="../../../api/KObject.ts"/>
///<reference path="../../../api/Extrapolations.ts"/>
///<reference path="../../../api/meta/MetaAttribute.ts"/>
///<reference path="../../../api/meta/MetaClass.ts"/>
///<reference path="../../../api/meta/MetaReference.ts"/>
///<reference path="../../../api/meta/MetaOperation.ts"/>
///<reference path="../../../api/meta/MetaType.ts"/>
///<reference path="../../../api/strategy/ExtrapolationStrategy.ts"/>

interface Node extends KObject<Node, CloudView> {

  getName(): string;

  setName(name: string): Node;

  getValue(): string;

  setValue(name: string): Node;

  addChildren(obj: Node): void;

  removeChildren(obj: Node): void;

  eachChildren(callback: Callback<Node>, end: Callback<Throwable>): void;

  setElement(obj: Element): void;

  getElement(obj: Callback<Element>): void;

  trigger(param: string, callback: Callback<string>): void;

}

module Node { 

  class METAATTRIBUTES implements MetaAttribute {

    public static NAME: METAATTRIBUTES = new METAATTRIBUTES("name", 2, 5, true, MetaType.STRING, Extrapolations.DISCRETE.strategy());
    public static VALUE: METAATTRIBUTES = new METAATTRIBUTES("value", 3, 5, false, MetaType.STRING, Extrapolations.DISCRETE.strategy());
    private _name: string = null;
    private _index: number = 0;
    private _precision: number = 0;
    private _key: boolean = null;
    private _metaType: MetaType = null;
    private extrapolationStrategy: ExtrapolationStrategy = null;

    public metaType(): MetaType {
      return this._metaType;
    }

    public origin(): MetaClass {
      return CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE;
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


  class METAREFERENCES implements MetaReference {

    public static CHILDREN: METAREFERENCES = new METAREFERENCES("children", 4, true, false, CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE, null);
    public static ELEMENT: METAREFERENCES = new METAREFERENCES("element", 5, true, true, CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT, null);
    private _name: string = null;
    private _index: number = 0;
    private _contained: boolean = null;
    private _single: boolean = null;
    private _metaType: MetaClass = null;
    private _opposite: MetaReference = null;

    public single(): boolean {
      return this._single;
    }

    public metaType(): MetaClass {
      return this._metaType;
    }

    public opposite(): MetaReference {
      return this._opposite;
    }

    public index(): number {
      return this._index;
    }

    public metaName(): string {
      return this._name;
    }

    public contained(): boolean {
      return this._contained;
    }

    public origin(): MetaClass {
      return CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE;
    }

    constructor(name: string, index: number, contained: boolean, single: boolean, metaType: MetaClass, opposite: MetaReference) {
      this._name = name;
      this._index = index;
      this._contained = contained;
      this._single = single;
      this._metaType = metaType;
      this._opposite = opposite;
    }

    public equals(other: AccessMode): boolean {
        return this == other;
    }

  }


  class METAOPERATION implements MetaOperation {

    public static TRIGGER: METAOPERATION = new METAOPERATION("trigger", 6);
    private _name: string = null;
    private _index: number = 0;

    public index(): number {
      return this._index;
    }

    public metaName(): string {
      return this._name;
    }

    public origin(): MetaClass {
      return CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE;
    }

    constructor(name: string, index: number) {
      this._name = name;
      this._index = index;
    }

    public equals(other: AccessMode): boolean {
        return this == other;
    }

  }


}
