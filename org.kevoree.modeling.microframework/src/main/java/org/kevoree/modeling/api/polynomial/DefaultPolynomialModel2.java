package org.kevoree.modeling.api.polynomial;

/**
 * Created by assaa_000 on 28/10/2014.
 */

import org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml;
import org.kevoree.modeling.api.polynomial.util.Prioritization;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by assaa_000 on 23/10/2014.
 */
public class DefaultPolynomialModel2 implements PolynomialModel {

    private double[] weights;
    private Long timeOrigin;
    private List<Long> timePoints = new ArrayList<Long>();
    private int degradeFactor;
    private Prioritization prioritization;
    private int maxDegree;
    private double toleratedError;


    public DefaultPolynomialModel2(long timeOrigin, double toleratedError, int maxDegree, int degradeFactor, Prioritization prioritization) {
        this.timeOrigin = timeOrigin;
        this.degradeFactor = degradeFactor;
        this.prioritization = prioritization;
        this.maxDegree = maxDegree;
        this.toleratedError = toleratedError;
    }

    public List<Long> getSamples() {
        return timePoints;
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
        //If this is the first point in the cset, add it and return
        if (weights == null) {
            weights = new double[1];
            weights[0] = value;
            timeOrigin = time;
            timePoints.add(time);
        }
    }

    private double maxError(double[] computedWeights, long time, double value) {
        double maxErr = 0;
        double temp = 0;
        Long ds;
        for (int i = 0; i < timePoints.size(); i++) {
            ds = timePoints.get(i);
            double val = internal_extrapolate(ds, computedWeights);
            temp = Math.abs(val - internal_extrapolate(ds, weights));
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

    public boolean comparePolynome(DefaultPolynomialModel2 p2, double err) {
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
        //If this is the first point in the cset, add it and return

        if (weights == null) {
            internal_feed(time, value);
            return true;
        }
        double maxError = getMaxErr(this.getDegree(), toleratedError, maxDegree, prioritization);
        //If the current model fits well the new value, return
        if (Math.abs(extrapolate(time) - value) <= maxError) {
            timePoints.add(time);
            Collections.sort(timePoints);
            return true;
        }
        //If not, first check if we can increase the degree
        int deg = getDegree();
        if (deg < maxDegree) {
            deg++;
            int ss = Math.min(deg * 2, timePoints.size());
            double[] times = new double[ss + 1];
            double[] values = new double[ss + 1];
            int current = timePoints.size();
            for (int i = 0; i < ss; i++) {
                int index = Math.round(i * current / ss);
                Long ds = timePoints.get(index);
                times[i] = ((double) (ds - timeOrigin)) / degradeFactor;
                values[i] = internal_extrapolate(ds, weights);
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
                timePoints.add(time);
                Collections.sort(timePoints);
                return true;
            }
        }
        return false;
    }

    @Override
    public long lastIndex() {
        if (timePoints.size() != 0) {
            return timePoints.get(timePoints.size() - 1);
        } else {
            return -1;
        }
    }

    public long indexBefore(long time) {
        if (timePoints.size() != 0) {
            for (int i = 0; i < timePoints.size() - 1; i++) {
                if (timePoints.get(i) < time && timePoints.get(i + 1) > time)
                    return timePoints.get(i);
            }
            return timePoints.get(timePoints.size() - 1);
        }
        return -1;
    }

    @Override
    public long[] timesAfter(long time) {
        if (timePoints.size() != 0) {
            for (int i = 0; i < timePoints.size() - 1; i++) {
                if (timePoints.get(i) < time && timePoints.get(i + 1) > time) {
                    long[] result = new long[timePoints.size() - i - 1];
                    for (int j = i + 1; j < timePoints.size(); j++) {
                        result[j - i - 1] = timePoints.get(j);
                    }
                    return result;
                }
            }
        }
        return null;
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
            weights[i] = Double.parseDouble(elems[i]);
        }
    }

}
