///<reference path="strategy/DiscreteExtrapolationStrategy.ts"/>
///<reference path="strategy/ExtrapolationStrategy.ts"/>
///<reference path="strategy/LinearRegressionExtrapolationStrategy.ts"/>
///<reference path="strategy/PolynomialExtrapolationStrategy.ts"/>

class Extrapolations {

  public static DISCRETE: Extrapolations = new Extrapolations(new DiscreteExtrapolationStrategy());
  public static LINEAR_REGRESSION: Extrapolations = new Extrapolations(new LinearRegressionExtrapolationStrategy());
  public static POLYNOMIAL: Extrapolations = new Extrapolations(new PolynomialExtrapolationStrategy());
  private extrapolationStrategy: ExtrapolationStrategy = null;

  constructor(wrappedStrategy: ExtrapolationStrategy) {
    this.extrapolationStrategy = wrappedStrategy;
  }

  public strategy(): ExtrapolationStrategy {
    return this.extrapolationStrategy;
  }

  public equals(other: AccessMode): boolean {
        return this == other;
    }

}

