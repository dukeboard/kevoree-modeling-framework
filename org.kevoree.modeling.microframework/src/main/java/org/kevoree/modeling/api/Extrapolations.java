package org.kevoree.modeling.api;

import org.kevoree.modeling.api.strategy.DiscreteExtrapolationStrategy;
import org.kevoree.modeling.api.strategy.ExtrapolationStrategy;
import org.kevoree.modeling.api.strategy.LinearRegressionExtrapolationStrategy;
import org.kevoree.modeling.api.strategy.PolynomialExtrapolationStrategy;

/**
 * Created by duke on 10/28/14.
 */
public enum Extrapolations {

    DISCRETE(new DiscreteExtrapolationStrategy()), LINEAR_REGRESSION(new LinearRegressionExtrapolationStrategy()), POLYNOMIAL(new PolynomialExtrapolationStrategy());

    private Extrapolations(ExtrapolationStrategy wrappedStrategy) {
        this.extrapolationStrategy = wrappedStrategy;
    }

    private ExtrapolationStrategy extrapolationStrategy;

    public ExtrapolationStrategy strategy() {
        return extrapolationStrategy;
    }

}
