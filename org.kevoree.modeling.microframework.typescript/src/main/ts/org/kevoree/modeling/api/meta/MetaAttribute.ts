///<reference path="../strategy/ExtrapolationStrategy.ts"/>

interface MetaAttribute extends Meta {

  key(): boolean;

  origin(): MetaClass;

  metaType(): MetaType;

  strategy(): ExtrapolationStrategy;

  precision(): number;

  setExtrapolationStrategy(extrapolationStrategy: ExtrapolationStrategy): void;

}

