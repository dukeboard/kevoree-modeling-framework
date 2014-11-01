///<reference path="meta/MetaReference.ts"/>

class InboundReference {

  private reference: MetaReference = null;
  private object: KObject<any,any> = null;

  constructor(reference: MetaReference, object: KObject<any,any>) {
    this.reference = reference;
    this.object = object;
  }

  public getReference(): MetaReference {
    return this.reference;
  }

  public getObject(): KObject<any,any> {
    return this.object;
  }

}

