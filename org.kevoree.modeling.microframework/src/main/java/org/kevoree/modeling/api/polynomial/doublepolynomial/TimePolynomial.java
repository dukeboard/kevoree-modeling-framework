package org.kevoree.modeling.api.polynomial.doublepolynomial;

import org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml;

/**
 * Created by assaad on 19/12/14.
 */
public class TimePolynomial {
    //Todo to save and to load
    private long timeOrigin;
    private double[] weights;
    private int samples;
    private long samplingPeriod;

    //hard-coded
    private static int maxTimeDegree=20;
    private static int toleratedErrorRatio=10;


    public TimePolynomial() {
    }

    public Long getTimeOrigin(){
        return timeOrigin;
    }



    public double convertLongToDouble(Long time){
        return ((double)(time-timeOrigin))/samplingPeriod;
    }

    public long getSamplingPeriod(){
        return samplingPeriod;
    }

    private int getDegree() {
        if (weights == null) {
            return -1;
        } else {
            return weights.length - 1;
        }
    }

    public double[] getWeights(){
        return weights;
    }

    public void setWeights(double [] weights){
        this.weights=weights;
    }



    public Long internal_extrapolate(int id, double[] newWeights){
        double result = 0;
        double t = id;
        double power = 1;
        for (int j = 0; j < newWeights.length; j++) {
            result += newWeights[j] * power;
            power = power * t;
        }
        result=result*(samplingPeriod)+timeOrigin;
        return (long) result;
    }

    public int getSamples(){
        return samples;
    }

    //Not suitable for non-sequential timepoints
    private Long maxError(double[] computedWeights, int lastId, Long newtime) {
        Long maxErr = 0l;

        Long time;
        Long temp;

        for (int i = 0; i < lastId; i++) {
            time= internal_extrapolate(i,computedWeights);
            temp = Math.abs(time - getTime(i));
            if (temp > maxErr) {
                maxErr = temp;
            }
        }
        temp = Math.abs(internal_extrapolate(samples, computedWeights) - newtime);
        if (temp > maxErr) {
            maxErr = temp;
        }
        return maxErr;
    }




    public boolean insert(Long time) {
        //If this is the first point in the set, add it and return
        if (weights == null) {
            timeOrigin=time;
            weights = new double[1];
            weights[0]=0;
            samples=1;
            return true;
        }
        if(samples==1){
            samplingPeriod=time-timeOrigin;
            weights = new double[2];
            weights[0]=0;
            weights[1]=1;
            samples=2;
            return true;
        }


        if(time> getTime(samples-1)){
            //List is ordered
            //First evaluate if it fits in the current model
            double maxError = samplingPeriod/toleratedErrorRatio;
            if (Math.abs(getTime(samples) - time) <= maxError) {
                samples++;
                return true;
            }

            //Else increase the degree till maxDegree
            int deg = getDegree();
            int newMaxDegree= Math.min(samples,maxTimeDegree);
            while (deg < newMaxDegree) {
                deg++;
                int ss = Math.min(deg * 2, samples);
                double[] ids = new double[ss + 1];
                double[] times = new double[ss + 1];
                int idtemp;
                for (int i = 0; i < ss; i++) {
                    idtemp= (int) (i*samples/ss);
                    ids[i]= idtemp;
                    times[i]=(getTime(idtemp)-timeOrigin)/(samplingPeriod);
                }
                ids[ss]=samples;
                times[ss]=(time-timeOrigin)/(samplingPeriod);

                PolynomialFitEjml pf = new PolynomialFitEjml(deg);
                pf.fit(ids, times);
                if (maxError(pf.getCoef(), samples, time) <= maxError) {
                    weights = new double[pf.getCoef().length];
                    for (int i = 0; i < pf.getCoef().length; i++) {
                        weights[i] = pf.getCoef()[i];
                    }
                    samples++;
                    return true;
                }
            }
            return false;
        }
        else{
            //trying to insert in past

        }
        return false;

    }

    public double getNormalizedTime(int id){
        double result = 0;
        double t = id;
        double power = 1;
        for (int j = 0; j < weights.length; j++) {
            result += weights[j] * power;
            power = power * t;
        }
        return result;
    }

    public Long getTime( int id){
        double result = 0;
        double t = id;
        double power = 1;
        for (int j = 0; j < weights.length; j++) {
            result += weights[j] * power;
            power = power * t;
        }
        result=result*(samplingPeriod)+timeOrigin;
        return (long) result;
    }


    //need to be modified for random access
    public void removeLast() {
        samples--;
    }

    public long getLastIndex() {
        if(samples>0) {
            return getTime(samples - 1);
        }
        return -1;
    }
}
