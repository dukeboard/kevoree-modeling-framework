///<reference path="../../../../api/Callback.ts"/>
///<reference path="../../../../api/KActionType.ts"/>
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

class NodeImpl extends AbstractKObject<Node, CloudView> implements Node {

  constructor(factory: CloudView, metaClass: MetaClass, kid: number, now: number, dimension: KDimension, timeTree: TimeTree) {
    super(factory, metaClass, kid, now, dimension, timeTree);
  }

  public metaAttributes(): MetaAttribute[] {
    return Node.METAATTRIBUTES.values();
  }

  public metaReferences(): MetaReference[] {
    return Node.METAREFERENCES.values();
  }

  public metaOperations(): MetaOperation[] {
    return Node.METAOPERATION.values();
  }

  public getName(): string {
    return <string>get(METAATTRIBUTES.NAME);
  }

  public setName(name: string): Node {
    set(METAATTRIBUTES.NAME, name);
    return this;
  }

  public getValue(): string {
    return <string>get(METAATTRIBUTES.VALUE);
  }

  public setValue(name: string): Node {
    set(METAATTRIBUTES.VALUE, name);
    return this;
  }

  public addChildren(obj: Node): void {
    mutate(KActionType.ADD, METAREFERENCES.CHILDREN, obj, true);
  }

  public removeChildren(obj: Node): void {
    mutate(KActionType.REMOVE, METAREFERENCES.CHILDREN, obj, true);
  }

  public eachChildren(callback: Callback<Node>, end: Callback<Throwable>): void {
    each(METAREFERENCES.CHILDREN, callback, end);
  }

  public setElement(obj: Element): void {
    mutate(KActionType.SET, METAREFERENCES.ELEMENT, obj, true);
  }

  public getElement(callback: Callback<Element>): void {
    each(METAREFERENCES.ELEMENT, callback, null);
  }

  public trigger(param: string, callback: Callback<string>): void {
  }

}

