package org.kevoree.modeling.microframework.test.universe;

import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KModel;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.PrimitiveTypes;
import org.kevoree.modeling.api.reflexive.DynamicMetaClass;
import org.kevoree.modeling.api.reflexive.DynamicMetaModel;

/**
 * Created by assaad on 03/03/15.
 */
public class MultiUniverseTest {

    private DynamicMetaModel dynamicMetaModel;
    private DynamicMetaClass sensorMetaClass;
    private KModel model;
    private KObject object;

    private long[] uIds = new long[4];
    int count=0;


    @Test
    public void testMultiVerse() {
        long timeOrigine=1000l;


        dynamicMetaModel = new DynamicMetaModel("MyMetaModel");

        sensorMetaClass = dynamicMetaModel.createMetaClass("Sensor");

        sensorMetaClass
                .addAttribute("value", PrimitiveTypes.DOUBLE)
                .addReference("siblings", sensorMetaClass, false);

        model = dynamicMetaModel.model();
        model.connect();

        object= model.universe(0).time(timeOrigine).create(sensorMetaClass);



        long unit=1000;

        insert(0,timeOrigine,1);
        insert(0,timeOrigine+unit,5);
        insert(0,timeOrigine+4*unit,8);
        assert(get(0,timeOrigine+5*unit)==8);

        split(0,timeOrigine+2*unit);
        assert(get(0,timeOrigine+unit)==5);
        assert(get(1,timeOrigine+unit)==5);

        assert(get(0,timeOrigine+5*unit)==8);
        assert(get(1,timeOrigine+5*unit)==5);
        insert(0,timeOrigine+3*unit,-2);
        assert(get(0,timeOrigine+3*unit)==-2);
        assert(get(1,timeOrigine+3*unit)==5);
        insert(1,timeOrigine+3*unit,7);
        assert(get(0,timeOrigine+3*unit)==-2);
        assert(get(1,timeOrigine+3*unit)==7);

        split(1,timeOrigine+20*unit);
        split(2,timeOrigine+30*unit);

        assert(get(2,timeOrigine+40*unit)==7);
        insert(0,timeOrigine+10*unit,-20);
        insert(1,timeOrigine+4*unit,-15);

        assert(get(1,timeOrigine+4*unit)==-15);
        assert(get(2,timeOrigine+4*unit)==-15);
        assert(get(3,timeOrigine+4*unit)==-15);

        insert(3,timeOrigine+17*unit,80);

        assert(get(0,timeOrigine+17*unit)==-20);
        assert(get(1,timeOrigine+17*unit)==-15);
        assert(get(2,timeOrigine+17*unit)==-15);
        assert(get(3,timeOrigine+17*unit)==80);



        insert(1,timeOrigine+18*unit,100);

        assert(get(0,timeOrigine+18*unit)==-20);
        assert(get(1,timeOrigine+18*unit)==100);
        assert(get(2,timeOrigine+18*unit)==100);
        assert(get(3,timeOrigine+18*unit)==80);

        insert(3,timeOrigine+40*unit,78);

        assert(get(0,timeOrigine+40*unit)==-20);
        assert(get(1,timeOrigine+40*unit)==100);
        assert(get(2,timeOrigine+40*unit)==7);
        assert(get(3,timeOrigine+40*unit)==78);



        insert(2,timeOrigine+25*unit,-11);

        assert(get(0,timeOrigine+25*unit)==-20);
        assert(get(1,timeOrigine+25*unit)==100);
        assert(get(2,timeOrigine+25*unit)==-11);
        assert(get(3,timeOrigine+25*unit)==80);



        insert(2,timeOrigine+45*unit,35);

        assert(get(0,timeOrigine+45*unit)==-20);
        assert(get(1,timeOrigine+45*unit)==100);
        assert(get(2,timeOrigine+45*unit)==35);
        assert(get(3,timeOrigine+45*unit)==78);

        assert(get(3,timeOrigine+1*unit)==5);

    }

    private void split(int parent, long splitTime){
        KUniverse uni= model.universe(parent).diverge();
        double val = get(parent,splitTime);
        count++;
        uIds[count]=uni.key();
        insert(count,splitTime,val);
    }

    private void insert(int uId, long time, double value){

        model.universe(uIds[uId]).time(time).lookup(object.uuid()).then(new Callback<KObject>() {
            @Override
            public void on(KObject kObject) {
                kObject.set((MetaAttribute)kObject.metaClass().metaByName("value"),value);
            }
        });


    }

    public double get(int uId, long time){
        final Object[] myvalue = {null};
        model.universe(uIds[uId]).time(time).lookup(object.uuid()).then(new Callback<KObject>() {

            @Override
            public void on(KObject kObject) {
                myvalue[0] = kObject.get((MetaAttribute)kObject.metaClass().metaByName("value"));
            }
        });
        return (double) myvalue[0];


    }

}
