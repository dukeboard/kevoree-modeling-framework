package org.kevoree.modeling.microframework.test.polynomial;


import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.polynomial.DefaultPolynomialExtrapolation;
import org.kevoree.modeling.api.polynomial.util.Prioritization;

/**
 * Created by assaa_000 on 07/11/2014.
 */
public class PolynomialExtrapolationTest {
    @Test
    public void test() {
        int toleratedError = 5;
        DefaultPolynomialExtrapolation pe = new DefaultPolynomialExtrapolation(0, toleratedError, 10, 1, Prioritization.LOWDEGREES);
        final double[] val = new double[1000];
        double[] coef = {2, 2, 3};
        for (int i = 200; i < 1000; i++) {
            long temp = 1;
            val[i]=0;
            for (int j = 0; j < coef.length; j++) {
                val[i] = val[i] + coef[j] * temp;
                temp = temp * i;
            }
            Assert.assertTrue(pe.insert(i, val[i]));
        }
        for (int i = 200; i < 1000; i++) {
            Assert.assertTrue((pe.extrapolate(i) - val[i]) < toleratedError);
        }
    }


}