///<reference path="../KObject.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>

class LinearRegressionExtrapolationStrategy implements ExtrapolationStrategy {

  public timedDependencies(current: KObject): number[] {
    return new Array();
  }

  public extrapolate(current: KObject, attribute: MetaAttribute, dependencies: KObject[]): any {
    return null;
  }

  public mutate(current: KObject, attribute: MetaAttribute, payload: any, dependencies: KObject[]): void {
  }

}

