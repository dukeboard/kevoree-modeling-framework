package org.kevoree.modeling.microframework.test.polynomial;

import org.kevoree.modeling.api.polynomial.util.DataSample;
import org.kevoree.modeling.api.polynomial.DefaultPolynomialExtrapolation;
import org.kevoree.modeling.api.polynomial.util.Prioritization;

import java.util.ArrayList;
import java.util.TreeMap;

/**
 * Created by assaa_000 on 28/10/2014.
 */
public class PolynomialModel {
    private int degradeFactor;
    private double toleratedError;
    private int maxDegree;
    private Prioritization prioritization = Prioritization.LOWDEGREES;
    private boolean continous = true;
    private int counter = 0;
    private TreeMap<Long, DefaultPolynomialExtrapolation> polynomTree = new TreeMap<Long, DefaultPolynomialExtrapolation>();
    private DefaultPolynomialExtrapolation defaultPolynomialExtrapolation;

    public PolynomialModel(int degradeFactor, double toleratedError, int maxDegree) {
        if (degradeFactor == 0) {
            degradeFactor = 1;
        }
        this.degradeFactor = degradeFactor;
        this.toleratedError = toleratedError;
        this.maxDegree = maxDegree;
        counter = 0;
    }

    public void feed(long time, double value) {
        if (defaultPolynomialExtrapolation == null) {
            defaultPolynomialExtrapolation = new DefaultPolynomialExtrapolation(time, value);
            return;
        }
        if (defaultPolynomialExtrapolation.feed(time, value, degradeFactor, maxDegree, toleratedError, prioritization) == true) {
            return;
        }
        DataSample prev = defaultPolynomialExtrapolation.getLastSample();
        DataSample newPrev = new DataSample(prev.time, defaultPolynomialExtrapolation.reconstruct(prev.time, degradeFactor));
        polynomTree.put(defaultPolynomialExtrapolation.getTimeOrigin(), defaultPolynomialExtrapolation);
        if (continous) {
            defaultPolynomialExtrapolation = new DefaultPolynomialExtrapolation(newPrev, time, value, degradeFactor);
        } else {
            defaultPolynomialExtrapolation = new DefaultPolynomialExtrapolation(time, value);
        }
    }

    public void finalSave() {
        if (defaultPolynomialExtrapolation != null) {
            polynomTree.put(defaultPolynomialExtrapolation.getTimeOrigin(), defaultPolynomialExtrapolation);
        }
    }

    public double reconstruct(long time) {
        long timeO = polynomTree.floorKey(time);
        DefaultPolynomialExtrapolation p = polynomTree.get(timeO);
        return p.reconstruct(time, degradeFactor);
    }

    private DefaultPolynomialExtrapolation fast = null;
    private long timeE;

    public double fastReconstruct(long time) {
        if (fast != null) {
            if (time < timeE || timeE == -1)
                return fast.reconstruct(time, degradeFactor);
        }
        long timeO = polynomTree.floorKey(time);
        fast = polynomTree.get(timeO);
        try {
            timeE = polynomTree.ceilingKey(time);
        } catch (Exception ex) {
            timeE = -1;
        }
        return fast.reconstruct(time, degradeFactor);
    }

    public StatClass displayStatistics(boolean display) {
        double max = 0;
        StatClass global = new StatClass();
        StatClass temp = new StatClass();
        ArrayList<StatClass> debug = new ArrayList<StatClass>();
        long pol = 0;

        for (Long t : polynomTree.keySet()) {
            pol++;
            temp = calculateError(polynomTree.get(t), degradeFactor);
            debug.add(temp);
            if (temp.maxErr > global.maxErr) {
                global.maxErr = temp.maxErr;
                global.time = temp.time;
                global.value = temp.value;
                global.calculatedValue = temp.calculatedValue;
            }
            global.avgError += temp.avgError * temp.samples;
            global.samples += temp.samples;
            global.degree += temp.degree;
        }
        global.avgError = global.avgError / global.samples;
        global.polynoms = pol;
        global.storage = (global.degree + pol);
        global.avgDegree = ((double) global.degree) / pol;
        global.timeCompression = (1 - ((double) pol) / global.samples) * 100;
        global.diskCompression = (1 - ((double) global.degree + 2 * pol) / (global.samples * 2)) * 100;
        if (display) {
            System.out.println("Total number of samples: " + global.samples);
            System.out.println("Total number of Polynoms: " + global.polynoms);
            System.out.println("Total doubles in polynoms: " + global.storage);
            System.out.println("Average degrees in polynoms: " + global.avgDegree);
            System.out.println("Time points compression: " + global.timeCompression + " %");
            System.out.println("Disk compression: " + global.diskCompression + " %");
            System.out.println("Maximum error: " + global.maxErr + " at time: " + global.time + " original value was: " + global.value + " calculated value: " + global.calculatedValue);
            System.out.println("Average error: " + global.avgError);
        }
        return global;
    }

    public StatClass calculateError(DefaultPolynomialExtrapolation pol, int degradeFactor) {
        StatClass ec = new StatClass();
        double temp = 0;
        double err = 0;
        DataSample ds;
        ec.degree = pol.getDegree();
        ec.samples = pol.getSamples().size();
        for (int i = 0; i < pol.getSamples().size(); i++) {
            ds = pol.getSamples().get(i);
            double t = ((double) (ds.time - pol.getTimeOrigin())) / degradeFactor;
            temp = pol.reconstruct(t);
            err = Math.abs(temp - ds.value);
            ec.avgError += err;
            if (err > ec.maxErr) {
                ec.time = ds.time;
                ec.value = ds.value;
                ec.calculatedValue = temp;
                ec.maxErr = err;
            }
        }
        ec.avgError = ec.avgError / pol.getSamples().size();
        return ec;
    }

}

