package org.kevoree.modeling.api.extrapolation;

/**
 * Created by duke on 10/28/14.
 */
public enum DefaultExtrapolationStrategies {

    DISCRETE(new DiscreteExtrapolationStrategy()), LINEAR_REGRESSION(new LinearRegressionExtrapolationStrategy());

    private DefaultExtrapolationStrategies(ExtrapolationStrategy wrappedStrategy) {
        this.extrapolationStrategy = wrappedStrategy;
    }

    private ExtrapolationStrategy extrapolationStrategy;

    public ExtrapolationStrategy strategy() {
        return extrapolationStrategy;
    }

}
