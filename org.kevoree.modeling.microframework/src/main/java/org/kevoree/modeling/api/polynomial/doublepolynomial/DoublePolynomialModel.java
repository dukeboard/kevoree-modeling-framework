package org.kevoree.modeling.api.polynomial.doublepolynomial;

import org.kevoree.modeling.api.polynomial.PolynomialModel;
import org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml;
import org.kevoree.modeling.api.polynomial.util.Prioritization;

public class DoublePolynomialModel implements PolynomialModel {

    private static final String sep = "/";
    public static final String sepW = "%";

    private Prioritization _prioritization;
    private int _maxDegree;
    private double _toleratedError;
    private boolean _isDirty = false;

    /* State */
    private double[] _weights;
    /* State */
    private final TimePolynomial _polyTime;

    public DoublePolynomialModel(long p_timeOrigin, double p_toleratedError, int p_maxDegree, Prioritization p_prioritization) {
        _polyTime = new TimePolynomial(p_timeOrigin);
        this._prioritization = p_prioritization;
        this._maxDegree = p_maxDegree;
        this._toleratedError = p_toleratedError;
    }

    public int degree() {
        if (_weights == null) {
            return -1;
        } else {
            return _weights.length - 1;
        }
    }

    public long timeOrigin() {
        return _polyTime.timeOrigin();
    }

    public boolean comparePolynome(DoublePolynomialModel p2, double err) {
        if (_weights.length != p2._weights.length) {
            return false;
        }
        for (int i = 0; i < _weights.length; i++) {
            if (Math.abs(_weights[i] - _weights[i]) > err) {
                return false;
            }
        }
        return true;
    }

    @Override
    public double extrapolate(long time) {
        return test_extrapolate(_polyTime.denormalize(time), _weights);
    }

    @Override
    public boolean insert(long time, double value) {
        //If this is the first point in the set, add it and return
        if (_weights == null) {
            internal_feed(time, value);
            _isDirty = true;
            return true;
        }
        //Check if time fits first
        if (_polyTime.insert(time)) {
            double maxError = maxErr();
            //If the current model fits well the new value, return
            if (Math.abs(extrapolate(time) - value) <= maxError) {
                return true;
            }
            //If not, first check if we can increase the degree
            int deg = degree();
            int newMaxDegree = Math.min(_polyTime.nbSamples() - 1, _maxDegree);
            if (deg < newMaxDegree) {
                deg++;
                int ss = Math.min(deg * 2, _polyTime.nbSamples() - 1);
                double[] times = new double[ss + 1];
                double[] values = new double[ss + 1];
                int current = _polyTime.nbSamples() - 1;
                for (int i = 0; i < ss; i++) {
                    times[i] = _polyTime.getNormalizedTime((int) (i * current / ss));
                    values[i] = test_extrapolate(times[i], _weights);
                }
                times[ss] = _polyTime.denormalize(time);
                values[ss] = value;
                PolynomialFitEjml pf = new PolynomialFitEjml(deg);
                pf.fit(times, values);
                if (maxError(pf.getCoef(), time, value) <= maxError) {
                    _weights = new double[pf.getCoef().length];
                    for (int i = 0; i < pf.getCoef().length; i++) {
                        _weights[i] = pf.getCoef()[i];
                    }
                    _isDirty = true;
                    return true;
                }
            }
            _polyTime.removeLast();
            return false;
        } else {
            return false;
        }
    }

    @Override
    public long lastIndex() {
        return _polyTime.lastIndex();
    }

    @Override
    public String save() {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < _weights.length; i++) {
            if (i != 0) {
                builder.append(sepW);
            }
            builder.append(_weights[i] + "");
        }
        builder.append(sep);
        builder.append(_polyTime.save());
        _isDirty = false;
        return builder.toString();
    }

    @Override
    public void load(String payload) {
        String[] parts = payload.split(sep);
        if (parts.length == 2) {
            String[] welems = parts[0].split(sepW);
            _weights = new double[welems.length];
            for (int i = 0; i < welems.length; i++) {
                _weights[i] = Double.parseDouble(welems[i]);
            }
            _polyTime.load(parts[1]);
        } else {
            System.err.println("Bad Polynomial String " + payload);
        }
        _isDirty = false;
    }

    @Override
    public boolean isDirty() {
        return _isDirty || _polyTime.isDirty();
    }

    /* Private methods section */

    private double maxErr() {
        double tol = _toleratedError;
        if (_prioritization == Prioritization.HIGHDEGREES) {
            tol = _toleratedError / Math.pow(2, _maxDegree - degree());
        } else if (_prioritization == Prioritization.LOWDEGREES) {
            tol = _toleratedError / Math.pow(2, degree() + 0.5);
        } else if (_prioritization == Prioritization.SAMEPRIORITY) {
            tol = _toleratedError * degree() * 2 / (2 * _maxDegree);
        }
        return tol;
    }

    private void internal_feed(long time, double value) {
        //If this is the first point in the set, add it and return
        if (_weights == null) {
            _weights = new double[1];
            _weights[0] = value;
            _polyTime.insert(time);
        }
    }

    private double maxError(double[] computedWeights, long time, double value) {
        double maxErr = 0;
        double temp;
        double ds;
        for (int i = 0; i < _polyTime.nbSamples() - 1; i++) {
            ds = _polyTime.getNormalizedTime(i);
            double val = test_extrapolate(ds, computedWeights);
            temp = Math.abs(val - test_extrapolate(ds, _weights));
            if (temp > maxErr) {
                maxErr = temp;
            }
        }
        temp = Math.abs(test_extrapolate(_polyTime.denormalize(time), computedWeights) - value);
        if (temp > maxErr) {
            maxErr = temp;
        }
        return maxErr;
    }

    private double test_extrapolate(double time, double[] weights) {
        double result = 0;
        double power = 1;
        for (int j = 0; j < weights.length; j++) {
            result += weights[j] * power;
            power = power * time;
        }
        return result;
    }

}
