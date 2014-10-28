package org.kevoree.modeling.api.polynomial;

/**
 * Created by assaa_000 on 28/10/2014.
 */

import org.kevoree.modeling.api.polynomial.util.DataSample;
import org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml;
import org.kevoree.modeling.api.polynomial.util.Prioritization;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by assaa_000 on 23/10/2014.
 */
public class DefaultPolynomialExtrapolation implements PolynomialExtrapolation {

    private double[] weights;

    public double[] getWeights() {
        return weights;
    }

    private Long timeOrigin;

    public List<DataSample> getSamples() {
        return samples;
    }

    private ArrayList<DataSample> samples = new ArrayList<DataSample>();

    public void clearSamples() {
        samples.clear();
    }

    public int getDegree() {
        if (weights == null) {
            return -1;
        }
        return weights.length - 1;
    }

    public Long getTimeOrigin() {
        return timeOrigin;
    }

    public double reconstruct(double t) {
        double result = 0;
        double power = 1;
        if (weights != null) {
            for (int j = 0; j < weights.length; j++) {
                result += weights[j] * power;
                power = power * t;
            }
        }
        return result;
    }

    public DataSample getLastSample() {
        return samples.get(samples.size() - 1);
    }

    public DefaultPolynomialExtrapolation() {
    }

    public DefaultPolynomialExtrapolation(Long time, double value) {
        feed(time, value);
    }

    private double getMaxErr(int degree, double toleratedError, int maxDegree, Prioritization prioritization) {
        double tol = toleratedError;
        if (prioritization == Prioritization.HIGHDEGREES) {
            tol = toleratedError / Math.pow(2, maxDegree - degree);
        } else if (prioritization == Prioritization.LOWDEGREES) {
            tol = toleratedError / Math.pow(2, degree + 0.5);
        } else if (prioritization == Prioritization.SAMEPRIORITY) {
            tol = toleratedError * degree * 2 / (2 * maxDegree);
        }
        return tol;
    }

    public DefaultPolynomialExtrapolation(DataSample prev, Long time, double value, int degradeFactor) {
        timeOrigin = prev.time;
        double[] times = new double[2];
        double[] values = new double[2];
        times[0] = 0;
        times[1] = ((double) (time - timeOrigin)) / degradeFactor;
        values[0] = prev.value;
        values[1] = value;
        PolynomialFitEjml pf = new PolynomialFitEjml(1);
        pf.fit(times, values);
        samples.add(prev);
        samples.add(new DataSample(time, value));
        weights = new double[pf.getCoef().length];
        for (int i = 0; i < pf.getCoef().length; i++) {
            weights[i] = pf.getCoef()[i];
        }
    }

    private void feed(Long time, double value) {
        //If this is the first point in the set, add it and return
        if (weights == null) {
            weights = new double[1];
            weights[0] = value;
            timeOrigin = time;
            samples.add(new DataSample(time, value));
        }
    }

    public boolean feed(Long time, double value, int degradeFactor, int maxDegree, double toleratedError, Prioritization prioritization) {
        //If this is the first point in the set, add it and return
        if (weights == null) {
            feed(time, value);
            return true;
        }
        double maxError = getMaxErr(this.getDegree(), toleratedError, maxDegree, prioritization);
        //If the current model fits well the new value, return
        if (fitInModelTest(time, value, degradeFactor, maxError) == true) {
            samples.add(new DataSample(time, value));
            return true;
        }
        //If not, first check if we can increase the degree
        int deg = getDegree();
        if (deg < maxDegree) {
            deg++;
            int ss = Math.min(deg * 2, samples.size());
            double[] times = new double[ss + 1];
            double[] values = new double[ss + 1];
            for (int i = 0; i < ss; i++) {
                int current = samples.size();
                DataSample ds = samples.get(i * current / ss);
                times[i] = ((double) (ds.time - timeOrigin)) / degradeFactor;
                values[i] = ds.value;
            }
            times[ss] = ((double) (time - timeOrigin)) / degradeFactor;
            values[ss] = value;
            PolynomialFitEjml pf = new PolynomialFitEjml(deg);
            pf.fit(times, values);
            if (maxError(degradeFactor, pf.getCoef(), time, value) <= maxError) {
                weights = new double[pf.getCoef().length];
                for (int i = 0; i < pf.getCoef().length; i++) {
                    weights[i] = pf.getCoef()[i];
                }
                samples.add(new DataSample(time, value));
                return true;
            }
        }
        return false;
    }


    private boolean fitInModelTest(Long time, double value, int degradeFactor, double maxError) {
        return (Math.abs(reconstruct(time, degradeFactor) - value) <= maxError);
    }


    private double maxError(int degradeFactor, double[] weights, Long time, double value) {
        double maxErr = 0;
        double temp = 0;
        DataSample ds;
        for (int i = 0; i < samples.size(); i++) {
            ds = samples.get(i);
            double t = ((double) (ds.time - timeOrigin)) / degradeFactor;
            temp = Math.abs(reconstruct(t, weights) - ds.value);
            if (temp > maxErr) {
                maxErr = temp;
            }
        }
        double t = ((double) (time - timeOrigin)) / degradeFactor;
        temp = Math.abs(reconstruct(t, weights) - value);
        if (temp > maxErr) {
            maxErr = temp;
        }
        return maxErr;
    }

    private double reconstruct(double t, double[] weights) {
        double result = 0;
        double power = 1;
        if (weights != null) {
            for (int j = 0; j < weights.length; j++) {
                result += weights[j] * power;
                power = power * t;
            }
        }
        return result;
    }


    public double reconstruct(long time, int degradeFactor) {
        double result = 0;
        double t = ((double) (time - timeOrigin)) / degradeFactor;
        double power = 1;
        for (int j = 0; j < weights.length; j++) {
            result += weights[j] * power;
            power = power * t;
        }
        return result;
    }

    public boolean comparePolynome(DefaultPolynomialExtrapolation p2, double err) {
        if (weights.length != p2.weights.length) {
            return false;
        }
        for (int i = 0; i < weights.length; i++) {
            if (Math.abs(weights[i] - weights[i]) > err) {
                return false;
            }
        }
        return true;
    }

    @Override
    public String save() {
        return null;
    }

    @Override
    public void load(String payload) {

    }
}
