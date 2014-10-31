///<reference path="../KObject.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>

interface ExtrapolationStrategy {

  timedDependencies(current: KObject): number[];

  extrapolate(current: KObject, attribute: MetaAttribute, dependencies: KObject[]): any;

  mutate(current: KObject, attribute: MetaAttribute, payload: any, dependencies: KObject[]): void;

}

