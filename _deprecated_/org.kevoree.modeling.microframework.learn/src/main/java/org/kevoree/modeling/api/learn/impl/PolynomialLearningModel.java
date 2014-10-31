package org.kevoree.modeling.api.learn.impl;

import org.kevoree.modeling.api.learn.LearningModel;

/**
 * Created by duke on 8/25/14.
 */

public class PolynomialLearningModel implements LearningModel {

    //TODO add to state
    private double[] weights = null;

    //TODO add to state
    private int counter = 0;

    //TODO add to state
    private double lastValue;

    private double delta;

    private int maxDegree;

    private long origin;

    private Prioritization prioritization = Prioritization.LOWDEGREES;

    private double degradeFactor = 1;

    public PolynomialLearningModel(double delta, int maxDegree, long origin) {
        this.delta = delta;
        this.maxDegree = maxDegree;
        this.origin = origin;
    }

    @Override
    public double getLastValue() {
        return lastValue;
    }

    @Override
    public void setLastValue(double newVal) {
        this.lastValue = newVal;
    }

    @Override
    public double evaluate(long time) {
        double result = 0;
        double t = ((double) (time - origin)) / degradeFactor;
        double power = 1;
        for (int j = 0; j < weights.length; j++) {
            result += weights[j] * power;
            power = power * t;
        }
        return result;
    }

    @Override
    public byte[] save() {
        return new byte[0];
    }

    @Override
    public void load(byte[] payload) {

    }

    public boolean errorTest(double reconstruction, double value, int degree) {
        double tol = delta;
        if (prioritization == Prioritization.HIGHDEGREES) {
            tol = delta / Math.pow(2, maxDegree - degree);
        } else if (prioritization == Prioritization.LOWDEGREES) {
            tol = delta / Math.pow(2, degree + 0.5);
        } else if (prioritization == Prioritization.SAMEPRIORITY) {
            tol = delta * degree / (2 * maxDegree);
        }
        /*
        if (continous == false) {
            tol = tol / 2;
        }*/
        if (Math.abs(reconstruction - value) <= tol) {
            return true;
        } else {
            return false;
        }
    }

    private double normalizeEvaluate(double t) {
        double result = 0;
        double power = 1;
        for (int j = 0; j < weights.length; j++) {
            result += weights[j] * power;
            power = power * t;
        }
        return result;
    }

    @Override
    public boolean feed(double value, long time) {
        double t = ((double) (time - origin)) / degradeFactor;
        //If this is the first point in the set, add it and return
        if (counter == 0) {
            weights = new double[1];
            weights[0] = value;
            counter++;
            lastValue = value;
            return true;
        }
        //If the current model fits well the new value, return
        if (errorTest(normalizeEvaluate(t), value, weights.length - 1)) {
            counter++;
            lastValue = value;
            return true;
        }
        //If not, first check if we can increase the degree
        if (counter < weights.length * degradeFactor * 10 && weights.length <= maxDegree) {
            int deg = weights.length;
            //This value affects a lot on the maximum error and average error and on the number of polynoms
            // int val =Math.min(counter,deg);
            int val = Math.min(counter, deg) * 2;
            // int val =Math.min(counter,deg)*4;
            // int val =Math.min(counter,deg)+1;
            double[] times = new double[val + 1];
            double[] values = new double[val + 1];
            //fill values synthetically
            for (int i = 0; i < val; i++) {
                times[i] = i * t / (val);
                values[i] = normalizeEvaluate(times[i]);
            }
            times[val] = t;
            values[val] = value;
            PolynomialFitEjml pf = new PolynomialFitEjml(deg);
            pf.fit(times, values);
            boolean tag = true;
            for (int i = 0; i < times.length; i++) {
                if (!errorTest(pf.calculate(times[i]), values[i], deg)) {
                    tag = false;
                    break;
                }
            }
            if (tag) {
                weights = pf.getCoef();
                counter++;
                lastValue = value;
                return true;
            }
        }
        //No polynomial with acceptable error was found
        return false;
    }

}
