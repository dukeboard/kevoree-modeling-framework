package org.kevoree.modeling.api.polynomial.doublepolynomial;

import org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml;

/**
 * Created by assaad on 19/12/14.
 */
public class TimePolynomial {

    //TODO change for live detectoin
    private static int toleratedErrorRatio = 10;

    private long _timeOrigin;
    private boolean _isDirty = false;
    //TODO change for param value
    private static int maxTimeDegree = 20;

    /* State to Save/Load */
    private double[] _weights;
    private int _nbSamples;
    private long _samplingPeriod;

    public TimePolynomial(long p_timeOrigin) {
        this._timeOrigin = p_timeOrigin;
    }

    public long timeOrigin() {
        return _timeOrigin;
    }

    public long samplingPeriod() {
        return _samplingPeriod;
    }

    public double[] weights() {
        return _weights;
    }

    public int degree() {
        if (_weights == null) {
            return -1;
        } else {
            return _weights.length - 1;
        }
    }

    public double denormalize(long p_time) {
        return ((double) (p_time - _timeOrigin)) / _samplingPeriod;
    }

    public double getNormalizedTime(int id) {
        double result = 0;
        double power = 1;
        for (int j = 0; j < _weights.length; j++) {
            result += _weights[j] * power;
            power = power * id;
        }
        return result;
    }

    public long extrapolate(int id) {
        return test_extrapolate(id, _weights);
    }

    public int nbSamples() {
        return _nbSamples;
    }

    public boolean insert(Long time) {
        //If this is the first point in the set, add it and return
        if (_weights == null) {
            _timeOrigin = time;
            _weights = new double[1];
            _weights[0] = 0;
            _nbSamples = 1;
            _isDirty = true;
            return true;
        }
        if (_nbSamples == 1) {
            _samplingPeriod = time - _timeOrigin;
            _weights = new double[2];
            _weights[0] = 0;
            _weights[1] = 1;
            _nbSamples = 2;
            _isDirty = true;
            return true;
        }
        if (time > extrapolate(_nbSamples - 1)) {
            //List is ordered
            //First evaluate if it fits in the current model
            double maxError = _samplingPeriod / toleratedErrorRatio;
            if (Math.abs(extrapolate(_nbSamples) - time) <= maxError) {
                _nbSamples++;
                _isDirty = true;
                return true;
            }
            //Else increase the degree till maxDegree
            int deg = degree();
            int newMaxDegree = Math.min(_nbSamples, maxTimeDegree);
            while (deg < newMaxDegree) {
                deg++;
                int ss = Math.min(deg * 2, _nbSamples);
                double[] ids = new double[ss + 1];
                double[] times = new double[ss + 1];
                int idtemp;
                for (int i = 0; i < ss; i++) {
                    idtemp = (int) (i * _nbSamples / ss);
                    ids[i] = idtemp;
                    times[i] = (extrapolate(idtemp) - _timeOrigin) / (_samplingPeriod);
                }
                ids[ss] = _nbSamples;
                times[ss] = (time - _timeOrigin) / (_samplingPeriod);
                PolynomialFitEjml pf = new PolynomialFitEjml(deg);
                pf.fit(ids, times);
                if (maxError(pf.getCoef(), _nbSamples, time) <= maxError) {
                    _weights = new double[pf.getCoef().length];
                    for (int i = 0; i < pf.getCoef().length; i++) {
                        _weights[i] = pf.getCoef()[i];
                    }
                    _nbSamples++;
                    _isDirty = true;
                    return true;
                }
            }
            return false;
        } else {
            //TODO trying to insert in past
        }
        return false;
    }

    //Not suitable for non-sequential timePoints
    private long maxError(double[] computedWeights, int lastId, long newtime) {
        long maxErr = 0l;
        long time;
        long temp;
        for (int i = 0; i < lastId; i++) {
            time = test_extrapolate(i, computedWeights);
            temp = Math.abs(time - extrapolate(i));
            if (temp > maxErr) {
                maxErr = temp;
            }
        }
        temp = Math.abs(test_extrapolate(_nbSamples, computedWeights) - newtime);
        if (temp > maxErr) {
            maxErr = temp;
        }
        return maxErr;
    }

    private long test_extrapolate(int id, double[] newWeights) {
        double result = 0;
        double power = 1;
        for (int j = 0; j < newWeights.length; j++) {
            result += newWeights[j] * power;
            power = power * id;
        }
        result = result * (_samplingPeriod) + _timeOrigin;
        return (long) result;
    }

    //need to be modified for random access
    public void removeLast() {
        _nbSamples = _nbSamples - 1;
    }

    public long lastIndex() {
        if (_nbSamples > 0) {
            return extrapolate(_nbSamples - 1);
        }
        return -1;
    }

    public String save() {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < _weights.length; i++) {
            if (i != 0) {
                builder.append(DoublePolynomialModel.sepW);
            }
            builder.append(_weights[i] + "");
        }
        builder.append(DoublePolynomialModel.sepW);
        builder.append(_nbSamples);
        builder.append(DoublePolynomialModel.sepW);
        builder.append(_samplingPeriod);
        _isDirty = false;
        return builder.toString();
    }

    public void load(String payload) {
        String[] parts = payload.split(DoublePolynomialModel.sepW);
        _weights = new double[parts.length - 2];
        for (int i = 0; i < parts.length - 2; i++) {
            _weights[i] = Double.parseDouble(parts[i]);
        }
        _nbSamples = Integer.parseInt(parts[parts.length - 1]);
        _samplingPeriod = Integer.parseInt(parts[parts.length - 2]);
        _isDirty = false;
    }

    public boolean isDirty() {
        return _isDirty;
    }

}
