///<reference path="../../../api/KUniverse.ts"/>
///<reference path="../../../api/abs/AbstractKDimension.ts"/>
///<reference path="impl/CloudViewImpl.ts"/>

class CloudDimension extends AbstractKDimension<CloudView, CloudDimension, CloudUniverse> {

  constructor(univers: KUniverse, key: number) {
    super(univers, key);
  }

  public internal_create(timePoint: number): CloudView {
    return new CloudViewImpl(timePoint, this);
  }

}

