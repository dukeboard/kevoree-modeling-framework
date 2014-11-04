///<reference path="../../../api/abs/AbstractKUniverse.ts"/>
///<reference path="../../../api/data/KDataBase.ts"/>
///<reference path="../../../api/data/KStore.ts"/>

class CloudUniverse extends AbstractKUniverse<CloudDimension> {

  constructor(kDataBase: KDataBase) {
    super(kDataBase);
  }

  public internal_create(key: number): CloudDimension {
    return new CloudDimension(this, key);
  }

}

