package org.kevoree.modeling.api.polynomial.test;

import org.kevoree.modeling.api.polynomial.DataSample;
import org.kevoree.modeling.api.polynomial.Polynom;
import org.kevoree.modeling.api.polynomial.Prioritization;
import org.kevoree.modeling.api.polynomial.StatClass;

import java.util.ArrayList;
import java.util.TreeMap;

/**
 * Created by assaa_000 on 28/10/2014.
 */
public class PolynomialModel {
    private int degradeFactor;
    private double toleratedError;
    private int maxDegree;
    private Prioritization prioritization=Prioritization.LOWDEGREES;
    private boolean continous=true;
    private int counter=0;
    private TreeMap<Long, Polynom> polynomTree = new TreeMap<Long, Polynom>();
    private Polynom polynom;




    public PolynomialModel(int degradeFactor, double toleratedError, int maxDegree){
        if(degradeFactor==0)
            degradeFactor=1;
        this.degradeFactor=degradeFactor;
        this.toleratedError=toleratedError;
        this.maxDegree=maxDegree;
        counter=0;
    }


    public void feed(long time, double value){
        if(polynom==null){

            polynom=new Polynom(time,value);
            return;
        }

        if(polynom.feed(time,value,degradeFactor,maxDegree,toleratedError,prioritization)==true){
            return;
        }
        DataSample prev= polynom.getLastSample();
        DataSample newPrev= new DataSample(prev.time,polynom.reconstruct(prev.time,degradeFactor));
        polynomTree.put(polynom.getTimeOrigin(),polynom);

        if(continous==true)
            polynom=new Polynom(newPrev,time,value,degradeFactor);
        else
            polynom=new Polynom(time,value);
    }

    public void finalSave(){
        if(polynom!=null) {
            polynomTree.put(polynom.getTimeOrigin(), polynom);
        }
    }

    public double reconstruct(long time){
        long timeO = polynomTree.floorKey(time);
        Polynom p= polynomTree.get(timeO);
        return p.reconstruct(time,degradeFactor);
    }



    private Polynom fast=null;
    private long timeE;
    public double fastReconstruct(long time){
        if(fast!=null){
            if(time<timeE||timeE==-1)
                return fast.reconstruct(time,degradeFactor);
        }
        long timeO = polynomTree.floorKey(time);
        fast= polynomTree.get(timeO);
        try {
            timeE = polynomTree.ceilingKey(time);
        }
        catch (Exception ex){
            timeE=-1;
        }
        return fast.reconstruct(time,degradeFactor);
    }

    public StatClass displayStatistics(boolean display){
        double max=0;
        StatClass global = new StatClass();
        StatClass temp = new StatClass();
        ArrayList<StatClass> debug = new ArrayList<StatClass>();
        long pol = 0;

        for(Long t: polynomTree.keySet()){
            pol++;
            temp = polynomTree.get(t).calculateError(degradeFactor);
            debug.add(temp);
            if(temp.maxErr>global.maxErr){
                global.maxErr=temp.maxErr;
                global.time=temp.time;
                global.value=temp.value;
                global.calculatedValue=temp.calculatedValue;
            }
            global.avgError+=temp.avgError*temp.samples;
            global.samples+=temp.samples;
            global.degree+=temp.degree;
        }
        global.avgError=global.avgError/global.samples;
        global.polynoms=pol;
        global.storage=(global.degree + pol);
        global.avgDegree=((double) global.degree) / pol;
        global.timeCompression=(1 - ((double) pol) / global.samples)*100;
        global.diskCompression= (1 - ((double) global.degree + 2 * pol) / (global.samples * 2)) * 100;
        if(display) {
            System.out.println("Total number of samples: " + global.samples);
            System.out.println("Total number of Polynoms: " + global.polynoms);
            System.out.println("Total doubles in polynoms: " +  global.storage);
            System.out.println("Average degrees in polynoms: " + global.avgDegree);
            System.out.println("Time points compression: " +  global.timeCompression+ " %");
            System.out.println("Disk compression: " + global.diskCompression + " %");
            System.out.println("Maximum error: " + global.maxErr + " at time: " + global.time + " original value was: " + global.value + " calculated value: " + global.calculatedValue);
            System.out.println("Average error: " + global.avgError);
        }

        return global;
    }


}

