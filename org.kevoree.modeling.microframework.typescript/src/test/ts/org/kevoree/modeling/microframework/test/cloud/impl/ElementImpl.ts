///<reference path="../../../../api/KDimension.ts"/>
///<reference path="../../../../api/abs/AbstractKObject.ts"/>
///<reference path="../../../../api/meta/MetaAttribute.ts"/>
///<reference path="../../../../api/meta/MetaClass.ts"/>
///<reference path="../../../../api/meta/MetaOperation.ts"/>
///<reference path="../../../../api/meta/MetaReference.ts"/>
///<reference path="../../../../api/time/TimeTree.ts"/>
///<reference path="../CloudView.ts"/>
///<reference path="../Element.ts"/>
///<reference path="../Node.ts"/>

class ElementImpl extends AbstractKObject<Element, CloudView> implements Element {

  private _mataReferences: MetaReference[] = new Array();

  constructor(factory: CloudView, metaClass: MetaClass, kid: number, now: number, dimension: KDimension, timeTree: TimeTree) {
    super(factory, metaClass, kid, now, dimension, timeTree);
  }

  public metaAttributes(): MetaAttribute[] {
    return Element.METAATTRIBUTES.values();
  }

  public metaReferences(): MetaReference[] {
    return this._mataReferences;
  }

  public metaOperations(): MetaOperation[] {
    return new Array();
  }

  public getName(): string {
    return <string>get(METAATTRIBUTES.NAME);
  }

  public setName(name: string): Element {
    set(METAATTRIBUTES.NAME, name);
    return this;
  }

  public getValue(): number {
    return <number>get(METAATTRIBUTES.VALUE);
  }

  public setValue(name: number): Element {
    set(METAATTRIBUTES.VALUE, name);
    return this;
  }

}

