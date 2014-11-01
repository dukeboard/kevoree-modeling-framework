///<reference path="../KObject.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>

interface ExtrapolationStrategy {

  timedDependencies(current: KObject<any,any>): number[];

  extrapolate(current: KObject<any,any>, attribute: MetaAttribute, dependencies: KObject[]): any;

  mutate(current: KObject<any,any>, attribute: MetaAttribute, payload: any, dependencies: KObject[]): void;

}

