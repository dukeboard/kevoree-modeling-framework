package org.kevoree.modeling.api.polynomial.doublepolynomial;

import org.kevoree.modeling.api.polynomial.PolynomialModel;
import org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml;
import org.kevoree.modeling.api.polynomial.util.Prioritization;


/**
 * Created by assaad on 19/12/14.
 */
public class DoublePolynomialModel implements PolynomialModel {


    private double[] weights;
    private TimePolynomial polyTime ;
    private Prioritization prioritization;
    private int maxDegree;
    private double toleratedError;



    public DoublePolynomialModel(double toleratedError, int maxDegree, Prioritization prioritization) {
        this.prioritization = prioritization;
        this.maxDegree = maxDegree;
        this.toleratedError = toleratedError;
        polyTime = new TimePolynomial();
    }


    public int getDegree() {
        if (weights == null) {
            return -1;
        } else {
            return weights.length - 1;
        }
    }

    public Long getTimeOrigin() {
        return polyTime.getTimeOrigin();
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
            polyTime.insert(time);


        }
    }

    private double maxError(double[] computedWeights, long time, double value) {
        double maxErr = 0;
        double temp = 0;
        double ds;
        for (int i = 0; i < polyTime.getSamples()-1; i++) {
            ds = polyTime.getNormalizedTime(i);
            double val=internal_extrapolate(ds, computedWeights);
            temp = Math.abs(val - internal_extrapolate(ds, weights));
            if (temp > maxErr) {
                maxErr = temp;
            }
        }
        temp = Math.abs(internal_extrapolate(polyTime.convertLongToDouble(time), computedWeights) - value);
        if (temp > maxErr) {
            maxErr = temp;
        }
        return maxErr;
    }

    public boolean comparePolynome(DoublePolynomialModel p2, double err) {
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

    private double internal_extrapolate(double time, double[] weights) {
        double result = 0;
        double power = 1;
        for (int j = 0; j < weights.length; j++) {
            result += weights[j] * power;
            power = power * time;
        }
        return result;
    }

    @Override
    public double extrapolate(long time) {
        double t = polyTime.convertLongToDouble(time);
        return internal_extrapolate(t, weights);
    }


    @Override
    public boolean insert(long time, double value) {
        //If this is the first point in the set, add it and return
        if (weights == null) {
            internal_feed(time, value);
            return true;
        }


        //Check if time fits first
        if(polyTime.insert(time)==true) {
            double maxError = getMaxErr(this.getDegree(), toleratedError, maxDegree, prioritization);
            //If the current model fits well the new value, return
            if (Math.abs(extrapolate(time) - value) <= maxError) {
                return true;
            }
            //If not, first check if we can increase the degree
            int deg = getDegree();
            int newMaxDegree = Math.min(polyTime.getSamples()-1, maxDegree);
            if (deg < newMaxDegree) {
                deg++;
                int ss = Math.min(deg * 2, polyTime.getSamples()-1);
                double[] times = new double[ss + 1];
                double[] values = new double[ss + 1];
                int current = polyTime.getSamples()-1;
                for (int i = 0; i < ss; i++) {


                    times[i] = polyTime.getNormalizedTime((int) (i * current / ss));
                    values[i] = internal_extrapolate(times[i],weights);
                }
                times[ss] = polyTime.convertLongToDouble(time);
                values[ss] = value;
                PolynomialFitEjml pf = new PolynomialFitEjml(deg);
                pf.fit(times, values);
                if (maxError(pf.getCoef(), time, value) <= maxError) {
                    weights = new double[pf.getCoef().length];
                    for (int i = 0; i < pf.getCoef().length; i++) {
                        weights[i] = pf.getCoef()[i];
                    }
                    return true;
                }
            }
            polyTime.removeLast();
            return false;
        }
        else{
            return false;
        }
    }


    @Override
    public long lastIndex() {
        return polyTime.getLastIndex(); //TODO: load and save lastIndex
    }

    @Override
    public long indexBefore(long time) {
        return 0;
    }


    @Override
    public long[] timesAfter(long time) {
        return null;
    }

    private static final String sep = "/";

    @Override
    public String save() {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < weights.length; i++) {
            if (i != 0) {
                builder.append(sep);
            }
            builder.append(weights[i] + "");
        }
        _isDirty = false;
        return builder.toString();
    }

    @Override
    public void load(String payload) {
        String[] elems = payload.split(sep);
        weights = new double[elems.length];
        for (int i = 0; i < elems.length; i++) {
            weights[i] = Double.parseDouble(elems[i]);
        }
        _isDirty = false;
    }

    private boolean _isDirty = false;

    @Override
    public boolean isDirty() {
        return _isDirty;
    }
}
