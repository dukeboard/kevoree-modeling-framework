///<reference path="meta/MetaReference.ts"/>

class InboundReference {

  private reference: MetaReference = null;
  private object: KObject = null;

  constructor(reference: MetaReference, object: KObject) {
    this.reference = reference;
    this.object = object;
  }

  public getReference(): MetaReference {
    return this.reference;
  }

  public getObject(): KObject {
    return this.object;
  }

}

