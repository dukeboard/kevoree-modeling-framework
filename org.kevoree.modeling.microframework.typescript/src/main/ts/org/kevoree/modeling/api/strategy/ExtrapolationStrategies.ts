
class ExtrapolationStrategies {

  public static DISCRETE: ExtrapolationStrategies = new ExtrapolationStrategies(new DiscreteExtrapolationStrategy());
  public static LINEAR_REGRESSION: ExtrapolationStrategies = new ExtrapolationStrategies(new LinearRegressionExtrapolationStrategy());
  public static POLYNOMIAL: ExtrapolationStrategies = new ExtrapolationStrategies(new PolynomialExtrapolationStrategy());
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

