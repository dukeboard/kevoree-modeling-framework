///<reference path="../KObject.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>

class LinearRegressionExtrapolationStrategy implements ExtrapolationStrategy {

  public timedDependencies(current: KObject<any,any>): number[] {
    return new Array();
  }

  public extrapolate(current: KObject<any,any>, attribute: MetaAttribute, dependencies: KObject<any,any>[]): any {
    return null;
  }

  public mutate(current: KObject<any,any>, attribute: MetaAttribute, payload: any, dependencies: KObject<any,any>[]): void {
  }

}

