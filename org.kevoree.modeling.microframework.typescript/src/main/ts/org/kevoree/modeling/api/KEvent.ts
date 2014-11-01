///<reference path="meta/Meta.ts"/>

interface KEvent {

  type(): KActionType;

  meta(): Meta;

  pastValue(): any;

  newValue(): any;

  src(): KObject<any,any>;

}

