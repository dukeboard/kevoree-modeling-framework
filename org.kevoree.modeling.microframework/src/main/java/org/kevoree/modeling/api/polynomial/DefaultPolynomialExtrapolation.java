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
    private Long timeOrigin;
    private List<DataSample> samples = new ArrayList<DataSample>();
    private int degradeFactor;
    private Prioritization prioritization;
    private int maxDegree;
    private double toleratedError;
    //TODO add to save
    private long lastIndex = -1;

    public DefaultPolynomialExtrapolation(long timeOrigin, double toleratedError, int maxDegree, int degradeFactor, Prioritization prioritization) {
        this.timeOrigin = timeOrigin;
        this.degradeFactor = degradeFactor;
        this.prioritization = prioritization;
        this.maxDegree = maxDegree;
        this.toleratedError = toleratedError;
    }

    public List<DataSample> getSamples() {
        return samples;
    }

    public int getDegree() {
        if (weights == null) {
            return -1;
        } else {
            return weights.length - 1;
        }
    }

    public Long getTimeOrigin() {
        return timeOrigin;
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


    private void internal_feed(Long time, double value) {
        //If this is the first point in the set, add it and return
        if (weights == null) {
            weights = new double[1];
            weights[0] = value;
            timeOrigin = time;
            samples.add(new DataSample(time, value));
        }
    }

    private double maxError(double[] computedWeights, long time, double value) {
        double maxErr = 0;
        double temp = 0;
        DataSample ds;
        for (int i = 0; i < samples.size(); i++) {
            ds = samples.get(i);
            double val = internal_extrapolate(ds.time, computedWeights);
            temp = Math.abs(val - ds.value);
            if (temp > maxErr) {
                maxErr = temp;
            }
        }
        temp = Math.abs(internal_extrapolate(time, computedWeights) - value);
        if (temp > maxErr) {
            maxErr = temp;
        }
        return maxErr;
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

    private double internal_extrapolate(long time, double[] weights) {
        double result = 0;
        double t = ((double) (time - timeOrigin)) / degradeFactor;
        double power = 1;
        for (int j = 0; j < weights.length; j++) {
            result += weights[j] * power;
            power = power * t;
        }
        return result;
    }

    @Override
    public double extrapolate(long time) {
        return internal_extrapolate(time, weights);
    }


    @Override
    public boolean insert(long time, double value) {
        //If this is the first point in the set, add it and return
        if (weights == null) {
            internal_feed(time, value);
            lastIndex = time;
            return true;
        }
        double maxError = getMaxErr(this.getDegree(), toleratedError, maxDegree, prioritization);
        //If the current model fits well the new value, return
        if (Math.abs(extrapolate(time) - value) <= maxError) {
            samples.add(new DataSample(time, value));
            lastIndex = time;
            return true;
        }
        //If not, first check if we can increase the degree
        int deg = getDegree();
        if (deg < maxDegree) {
            deg++;
            int ss = Math.min(deg * 2, samples.size());
            double[] times = new double[ss + 1];
            double[] values = new double[ss + 1];
            int current = samples.size();
            for (int i = 0; i < ss; i++) {
                DataSample ds = samples.get(i * current / ss);
                times[i] = ((double) (ds.time - timeOrigin)) / degradeFactor;
                values[i] = ds.value;
            }
            times[ss] = ((double) (time - timeOrigin)) / degradeFactor;
            values[ss] = value;
            PolynomialFitEjml pf = new PolynomialFitEjml(deg);
            pf.fit(times, values);
            if (maxError(pf.getCoef(), time, value) <= maxError) {
                weights = new double[pf.getCoef().length];
                for (int i = 0; i < pf.getCoef().length; i++) {
                    weights[i] = pf.getCoef()[i];
                }
                samples.add(new DataSample(time, value));
                lastIndex = time;
                return true;
            }
        }
        return false;
    }

    @Override
    public long lastIndex() {
        return 0;
    }

    private static final char sep = '|';

    @Override
    public String save() {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < weights.length; i++) {
            if (i != 0) {
                builder.append(sep);
            }
            builder.append(weights[i]);
        }
        return builder.toString();
    }

    @Override
    public void load(String payload) {
        String[] elems = payload.split(sep + "");
        weights = new double[elems.length];
        for (int i = 0; i < elems.length; i++) {
            weights[i] = Long.parseLong(elems[i]);
        }
    }

}
