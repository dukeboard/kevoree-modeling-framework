package org.kevoree.modeling.test.opposite;

import junit.framework.Assert;
import junit.framework.TestCase;
import kmf.opposite.test.OppositeDimension;
import kmf.opposite.test.OppositeUniverse;
import kmf.opposite.test.OppositeView;
import kmf.opposite.test.A;
import kmf.opposite.test.B;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.api.meta.MetaReference;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertTrue;
import static junit.framework.TestCase.assertNotNull;

public class OppositeTest {

    private static OppositeUniverse universe = new OppositeUniverse(new MemoryKDataBase());
    private static OppositeDimension localDimension = universe.create();
    private static OppositeView factory = localDimension.time(0l);


    @Test
    public void enumTest() {

    }


    @Test
    public void optionalSingleA_optionalSingleB_Test() {
        //val container = TestFactory.createContainer
        B b = factory.createB();
        A a = factory.createA();

        //Set a in B
        b.setOptionalSingleA_optionalSingleB(a);
        b.getOptionalSingleA_optionalSingleB((a_cb)-> assertEquals(a_cb, a));
        a.getOptionalSingleA_optionalSingleB((b_cb)->{
            assertNotNull(b_cb);
            assertEquals(b_cb, b);
            a.parent((parent)-> assertEquals(parent, b));
        });

        //Again, should be equivalent to noop
        b.setOptionalSingleA_optionalSingleB(a);
        b.getOptionalSingleA_optionalSingleB((a_cb) -> assertEquals(a_cb, a));
        a.getOptionalSingleA_optionalSingleB((b_cb)->{
            assertNotNull(b_cb);
            assertEquals(b_cb, b);
            a.parent((parent)-> assertEquals(parent, b));
        });

        //Remove A from B
        b.setOptionalSingleA_optionalSingleB(null);
        a.getOptionalSingleA_optionalSingleB(TestCase::assertNull);
        a.parent(TestCase::assertNull);

        //Set B in A
        a.setOptionalSingleA_optionalSingleB(b);
        a.getOptionalSingleA_optionalSingleB((b_cb) -> assertEquals(b_cb, b));
        b.getOptionalSingleA_optionalSingleB((a_cb)->{
            assertNotNull(a_cb);
            assertEquals(a_cb, a);
        });
        a.parent((parent) -> assertEquals(parent, b));

        //Again, should be equivalent to noop
        a.setOptionalSingleA_optionalSingleB(b);
        a.getOptionalSingleA_optionalSingleB((b_cb) -> assertEquals(b_cb, b));
        b.getOptionalSingleA_optionalSingleB((a_cb)->{
            assertNotNull(a_cb);
            assertEquals(a_cb, a);
        });
        a.parent((parent)-> assertEquals(parent, b));

        //Remove B from A
        a.setOptionalSingleA_optionalSingleB(null);
        b.getOptionalSingleA_optionalSingleB(TestCase::assertNull);
        a.parent(TestCase::assertNull);

    }

/*
    @Test     public void mandatorySingleA_mandatorySingleB_Test() {
        //val container = TestFactory.createContainer
        val b = factory.createB();
        val a = factory.createA();

        //Set a in B
        b.mandatorySingleA_mandatorySingleB = a
        assert(a.mandatorySingleA_mandatorySingleB == b);
        assert(a.eContainer() == b, "eContainer:" + a.eContainer().javaClass);

        b.mandatorySingleA_mandatorySingleB = a
        assert(a.mandatorySingleA_mandatorySingleB == b);
        assert(a.eContainer() == b, "eContainer:" + a.eContainer().javaClass);


        //Remove A from B
        b.mandatorySingleA_mandatorySingleB = null;
        assert(a.mandatorySingleA_mandatorySingleB == null);
        assert(a.eContainer() == null, "eContainer:" + a.eContainer().toString());

        b.mandatorySingleA_mandatorySingleB = null;
        assert(a.mandatorySingleA_mandatorySingleB == null);
        assert(a.eContainer() == null, "eContainer:" + a.eContainer().toString());

        //Set B in A
        a.mandatorySingleA_mandatorySingleB = b
        assert(b.mandatorySingleA_mandatorySingleB == a);
        assert(a.eContainer() == b);

        //Set B in A
        a.mandatorySingleA_mandatorySingleB = b
        assert(b.mandatorySingleA_mandatorySingleB == a);
        assert(a.eContainer() == b);

        //Remove B from A
        a.mandatorySingleA_mandatorySingleB = null;
        assert(b.mandatorySingleA_mandatorySingleB == null);
        assert(a.eContainer() == null);

    }




    @Test 
 public void optionalSingleA_MandatorySingleB_Test() {
        //val container = TestFactory.createContainer
        val b = factory.createB();
        val a = factory.createA();

        //Set a in B
        b.optionalSingleA_MandatorySingleB = a
        assert(a.optionalSingleA_MandatorySingleB != null && a.optionalSingleA_MandatorySingleB == b);
        assert(a.eContainer() == b, "eContainer:" + a.eContainer().javaClass);

        //Set a in B
        b.optionalSingleA_MandatorySingleB = a
        assert(a.optionalSingleA_MandatorySingleB != null && a.optionalSingleA_MandatorySingleB == b);
        assert(a.eContainer() == b, "eContainer:" + a.eContainer().javaClass);


        //Remove A from B
        b.optionalSingleA_MandatorySingleB = null;
        assert(a.optionalSingleA_MandatorySingleB == null);
        assert(a.eContainer() == null, "eContainer:" + a.eContainer().toString());

        //Remove A from B
        b.optionalSingleA_MandatorySingleB = null;
        assert(a.optionalSingleA_MandatorySingleB == null);
        assert(a.eContainer() == null, "eContainer:" + a.eContainer().toString());

        //Set B in A
        a.optionalSingleA_MandatorySingleB = b
        assert(b.optionalSingleA_MandatorySingleB == a);
        assert(a.eContainer() == b);

        //Set B in A
        a.optionalSingleA_MandatorySingleB = b
        assert(b.optionalSingleA_MandatorySingleB == a);
        assert(a.eContainer() == b);

        //Remove B from A
        a.optionalSingleA_MandatorySingleB = null;
        assert(b.optionalSingleA_MandatorySingleB == null);
        assert(a.eContainer() == null);

    }


    @Test 
 public void optionalSingleA_StarListB_Test() {
        //val container = TestFactory.createContainer
        val b = factory.createB();
        val a = factory.createA();
        val a2 = factory.createA();

        //add a in B
        b.addOptionalSingleA_StarListB(a);
        assert(b.optionalSingleA_StarListB.size == 1);
        assert(a.optionalSingleA_StarListB != null && a.optionalSingleA_StarListB == b);
        assert(a.eContainer() == b, "eContainer:" + a.eContainer().javaClass);

        //add a2 in B
        b.addOptionalSingleA_StarListB(a2);
        assert(b.optionalSingleA_StarListB.size == 2);
        assert(a2.optionalSingleA_StarListB != null && a2.optionalSingleA_StarListB == b);
        assert(a2.eContainer() == b, "eContainer:" + a2.eContainer().javaClass);
        b.addOptionalSingleA_StarListB(a2);
        assert(b.optionalSingleA_StarListB.size == 2, "Size:" + b.optionalSingleA_StarListB.size);

        //Remove A from B
        b.removeOptionalSingleA_StarListB(a);
        assert(b.optionalSingleA_StarListB.size == 1);
        assert(a.optionalSingleA_StarListB == null);
        assert(a.eContainer() == null, "eContainer:" + a.eContainer().toString());

        b.removeOptionalSingleA_StarListB(a);
        assert(b.optionalSingleA_StarListB.size == 1);

        b.removeOptionalSingleA_StarListB(a2);
        assert(b.optionalSingleA_StarListB.size == 0);
        assert(a2.optionalSingleA_StarListB == null);
        assert(a2.eContainer() == null, "eContainer:" + a2.eContainer().toString());

        val aList = ArrayList<A>();
        aList.add(a);
        aList.add(a2);
        b.optionalSingleA_StarListB = aList
        assert(b.optionalSingleA_StarListB.size == 2);
        assert(a.optionalSingleA_StarListB != null && a.optionalSingleA_StarListB == b);
        assert(a.eContainer() == b, "eContainer:" + a.eContainer().javaClass);
        assert(a2.optionalSingleA_StarListB != null && a2.optionalSingleA_StarListB == b);
        assert(a2.eContainer() == b, "eContainer:" + a2.eContainer().javaClass);

        b.removeAllOptionalSingleA_StarListB();
        assert(b.optionalSingleA_StarListB.size == 0);
        assert(a.optionalSingleA_StarListB == null);
        assert(a.eContainer() == null, "eContainer:" + a.eContainer().toString());
        assert(a2.optionalSingleA_StarListB == null);
        assert(a2.eContainer() == null, "eContainer:" + a2.eContainer().toString());

        b.addAllOptionalSingleA_StarListB(aList);
        assert(b.optionalSingleA_StarListB.size == 2);
        assert(a.optionalSingleA_StarListB != null && a.optionalSingleA_StarListB == b);
        assert(a.eContainer() == b, "eContainer:" + a.eContainer().javaClass);
        assert(a2.optionalSingleA_StarListB != null && a2.optionalSingleA_StarListB == b);
        assert(a2.eContainer() == b, "eContainer:" + a2.eContainer().javaClass);

        b.removeAllOptionalSingleA_StarListB();
        assert(b.optionalSingleA_StarListB.size == 0);
        assert(a.optionalSingleA_StarListB == null);
        assert(a.eContainer() == null, "eContainer:" + a.eContainer().toString());
        assert(a2.optionalSingleA_StarListB == null);
        assert(a2.eContainer() == null, "eContainer:" + a2.eContainer().toString());


        a.optionalSingleA_StarListB = b
        assert(b.optionalSingleA_StarListB.size == 1);
        assert(a.optionalSingleA_StarListB != null && a.optionalSingleA_StarListB == b);
        assert(a.eContainer() == b);

        //Remove B from A
        a.optionalSingleA_StarListB = null;
        assert(b.optionalSingleA_StarListB.size == 0);
        assert(a.optionalSingleA_StarListB == null);
        assert(a.eContainer() == null);

    }



    @Test 
 public void starListA_StarListB_Test() {

        val b = factory.createB();
        val b2 = factory.createB();
        val a = factory.createA();
        val a2 = factory.createA();
        val listA = ArrayList<A>();
        listA.add(a);
        listA.add(a2);
        val listB = ArrayList<B>();
        listB.add(b);
        listB.add(b2);

        a.addStarListA_StarListB(b);
        assert(b.starListA_StarListB.size == 1);
        assert(a.starListA_StarListB.size == 1);
        assert(a.eContainer() == b);

        a.addStarListA_StarListB(b2);
        assert(b2.starListA_StarListB.size == 1);
        assert(b.starListA_StarListB.size == 0);
        assert(a.starListA_StarListB.size == 1);
        assert(a.eContainer() == b2);

        b.addStarListA_StarListB(a);
        assert(b.starListA_StarListB.size == 1);
        assert(b2.starListA_StarListB.size == 0);
        assert(a.starListA_StarListB.size == 1);
        assert(a.eContainer() == b);

        b.addStarListA_StarListB(a2);
        assert(b.starListA_StarListB.size == 2);
        assert(b2.starListA_StarListB.size == 0);
        assert(a.starListA_StarListB.size == 1);
        assert(a2.starListA_StarListB.size == 1);
        assert(a.eContainer() == b);
        assert(a2.eContainer() == b);

        b2.addStarListA_StarListB(a2);
        assert(b.starListA_StarListB.size == 1);
        assert(b2.starListA_StarListB.size == 1);
        assert(a.starListA_StarListB.size == 1);
        assert(a2.starListA_StarListB.size == 1);
        assert(a.eContainer() == b);
        assert(a2.eContainer() == b2);

        b2.addStarListA_StarListB(a2);
        assert(b.starListA_StarListB.size == 1);
        assert(b2.starListA_StarListB.size == 1, "Size:" + b2.starListA_StarListB.size);
        assert(a.starListA_StarListB.size == 1);
        assert(a2.starListA_StarListB.size == 1);
        assert(a.eContainer() == b);
        assert(a2.eContainer() == b2);


        b.removeStarListA_StarListB(a);
        assert(b.starListA_StarListB.size == 0);
        assert(b2.starListA_StarListB.size == 1);
        assert(a.starListA_StarListB.size == 0);
        assert(a2.starListA_StarListB.size == 1);
        assert(a.eContainer() == null);
        assert(a2.eContainer() == b2);

        b.addAllStarListA_StarListB(listA);
        assert(b.starListA_StarListB.size == 2);
        assert(b2.starListA_StarListB.size == 0);
        assert(a.starListA_StarListB.size == 1);
        assert(a2.starListA_StarListB.size == 1);
        assert(a.eContainer() == b);
        assert(a2.eContainer() == b);

        b2.addAllStarListA_StarListB(listA);
        assert(b.starListA_StarListB.size == 0);
        assert(b2.starListA_StarListB.size == 2);
        assert(a.starListA_StarListB.size == 1);
        assert(a2.starListA_StarListB.size == 1);
        assert(a.eContainer() == b2);
        assert(a2.eContainer() == b2);

        b2.removeAllStarListA_StarListB();
        assert(b.starListA_StarListB.size == 0);
        assert(b2.starListA_StarListB.size == 0);
        assert(a.starListA_StarListB.size == 0);
        assert(a2.starListA_StarListB.size == 0);
        assert(a.eContainer() == null);
        assert(a2.eContainer() == null);

        a.addAllStarListA_StarListB(listB);
        assert(b.starListA_StarListB.size == 0);
        assert(b2.starListA_StarListB.size == 1);
        assert(a.starListA_StarListB.size == 1);
        assert(a.eContainer() == b2);


        a2.addAllStarListA_StarListB(listB);
        assert(b.starListA_StarListB.size == 0);
        assert(b2.starListA_StarListB.size == 2);
        assert(a.starListA_StarListB.size == 1);
        assert(a2.starListA_StarListB.size == 1);
        assert(a.eContainer() == b2);
        assert(a2.eContainer() == b2);

    }

    @Test 
 public void mandatorySingleA_StarListB_Test() {
        //val container = TestFactory.createContainer
        val b = factory.createB();
        val a = factory.createA();
        val a2 = factory.createA();

        //add a in B
        b.addMandatorySingleA_StarListB(a);
        assert(b.mandatorySingleA_StarListB.size == 1);
        assert(a.mandatorySingleA_StartListB == b);
        assert(a.eContainer() == b, "eContainer:" + a.eContainer().javaClass);

        //add a2 in B
        b.addMandatorySingleA_StarListB(a2);
        assert(b.mandatorySingleA_StarListB.size == 2);
        assert(a2.mandatorySingleA_StartListB == b);
        assert(a2.eContainer() == b, "eContainer:" + a2.eContainer().javaClass);
        b.addMandatorySingleA_StarListB(a2);
        assert(b.mandatorySingleA_StarListB.size == 2, "Size:" + b.mandatorySingleA_StarListB.size);
        assert(a2.mandatorySingleA_StartListB == b);
        assert(a2.eContainer() == b, "eContainer:" + a2.eContainer().javaClass);

        //Remove A from B
        b.removeMandatorySingleA_StarListB(a);
        assert(b.mandatorySingleA_StarListB.size == 1);
        assert(a.mandatorySingleA_StartListB == null);
        assert(a.eContainer() == null, "eContainer:" + a.eContainer().toString());

        b.removeMandatorySingleA_StarListB(a);
        assert(b.mandatorySingleA_StarListB.size == 1);

        b.removeMandatorySingleA_StarListB(a2);
        assert(b.mandatorySingleA_StarListB.size == 0);
        assert(a2.mandatorySingleA_StartListB == null);
        assert(a2.eContainer() == null, "eContainer:" + a2.eContainer().toString());

        val aList = ArrayList<A>();
        aList.add(a);
        aList.add(a2);

        b.mandatorySingleA_StarListB = aList
        assert(b.mandatorySingleA_StarListB.size == 2);
        assert(a.mandatorySingleA_StartListB == b);
        assert(a.eContainer() == b, "eContainer:" + a.eContainer().javaClass);
        assert(a2.mandatorySingleA_StartListB == b);
        assert(a2.eContainer() == b, "eContainer:" + a2.eContainer().javaClass);

        b.removeAllMandatorySingleA_StarListB();
        assert(b.mandatorySingleA_StarListB.size == 0);
        assert(a.mandatorySingleA_StartListB == null);
        assert(a.eContainer() == null, "eContainer:" + a.eContainer().toString());
        assert(a2.mandatorySingleA_StartListB == null);
        assert(a2.eContainer() == null, "eContainer:" + a2.eContainer().toString());

        b.addAllMandatorySingleA_StarListB(aList);
        assert(b.mandatorySingleA_StarListB.size == 2);
        assert(a.mandatorySingleA_StartListB == b);
        assert(a.eContainer() == b, "eContainer:" + a.eContainer().javaClass);
        assert(a2.mandatorySingleA_StartListB == b);
        assert(a2.eContainer() == b, "eContainer:" + a2.eContainer().javaClass);

        b.removeAllMandatorySingleA_StarListB();
        assert(b.mandatorySingleA_StarListB.size == 0);
        assert(a.mandatorySingleA_StartListB == null);
        assert(a.eContainer() == null, "eContainer:" + a.eContainer().toString());
        assert(a2.mandatorySingleA_StartListB == null);
        assert(a2.eContainer() == null, "eContainer:" + a2.eContainer().toString());


        a.mandatorySingleA_StartListB = b
        assert(b.mandatorySingleA_StarListB.size == 1);
        assert(a.mandatorySingleA_StartListB == b);
        assert(a.eContainer() == b);

        //Remove B from A
        a.mandatorySingleA_StartListB = null;
        assert(b.mandatorySingleA_StarListB.size == 0);
        assert(a.mandatorySingleA_StartListB == null);
        assert(a.eContainer() == null);

    }


    @Test 
 public void A_optionalSingleRef() {

        val a = factory.createA();
        val b = factory.createB();
        val b2 = factory.createB();

        a.optionalSingleRef = b
        assert(a.optionalSingleRef != null && a.optionalSingleRef == b);

        a.optionalSingleRef = b
        assert(a.optionalSingleRef != null && a.optionalSingleRef == b);

        a.optionalSingleRef = b2
        assert(a.optionalSingleRef != null && a.optionalSingleRef == b2);

        a.optionalSingleRef = null;
        assert(a.optionalSingleRef == null);

    }

    @Test 
 public void A_mendatorySingleRef() {
        val a = factory.createA();
        val b = factory.createB();
        val b2 = factory.createB();

        a.mandatorySingleRef = b
        assert(a.mandatorySingleRef == b);

        a.mandatorySingleRef = b
        assert(a.mandatorySingleRef == b);

        a.mandatorySingleRef = b2
        assert(a.mandatorySingleRef == b2);

        a.mandatorySingleRef = null;
        assert(a.mandatorySingleRef == null);

        a.mandatorySingleRef = null;
        assert(a.mandatorySingleRef == null);
    }

    @Test 
 public void A_StarList() {
        val a = factory.createA();
        val b = factory.createB();
        val b2 = factory.createB();
        val listB = ArrayList<B>();
        listB.add(b);
        listB.add(b2);

        a.addStarList(b);
        assert(a.starList.size == 1, "Size:" + a.starList.size);

        a.addStarList(b2);
        assert(a.starList.size == 2, "Size:" + a.starList.size);

        a.addStarList(b2);
        assert(a.starList.size == 2, "Size:" + a.starList.size);

        a.removeStarList(b);
        assert(a.starList.size == 1, "Size:" + a.starList.size);

        a.removeStarList(b2);
        assert(a.starList.size == 0, "Size:" + a.starList.size);

        a.removeStarList(b2);
        assert(a.starList.size == 0, "Size:" + a.starList.size);

        a.addAllStarList(listB);
        assert(a.starList.size == 2, "Size:" + a.starList.size);

        a.addAllStarList(listB);
        assert(a.starList.size == 2, "Size:" + a.starList.size);

        a.removeAllStarList();
        assert(a.starList.size == 0, "Size:" + a.starList.size);

        a.removeAllStarList();
        assert(a.starList.size == 0, "Size:" + a.starList.size);
    }


    @Test 
 public void B_optionalSingleRef() {
        val b = factory.createB();
        val a = factory.createA();
        val a2 = factory.createA();

        b.optionalSingleRef = a
        assert(a.eContainer() == b);
        assert(b.optionalSingleRef != null && b.optionalSingleRef == a);

        b.optionalSingleRef = a
        assert(a.eContainer() == b);
        assert(b.optionalSingleRef != null && b.optionalSingleRef == a);

        b.optionalSingleRef =a2
        assert(a.eContainer() == null);
        assert(a2.eContainer() == b);
        assert(b.optionalSingleRef != null && b.optionalSingleRef == a2);

        b.optionalSingleRef = null;
        assert(a.eContainer() == null);
        assert(a2.eContainer() == null);
        assert(b.optionalSingleRef == null);
    }

    @Test 
 public void B_mendatorySingleRef() {
        val b = factory.createB();
        val a = factory.createA();
        val a2 = factory.createA();

        b.mandatorySingleRef = a
        assert(a.eContainer() == b);
        assert(b.mandatorySingleRef == a);

        b.mandatorySingleRef = a
        assert(a.eContainer() == b);
        assert(b.mandatorySingleRef == a);

        b.mandatorySingleRef = a2
        assert(a.eContainer() == null);
        assert(a2.eContainer() == b);
        assert(b.mandatorySingleRef == a2);

        b.mandatorySingleRef = null;
        assert(a2.eContainer() == null);
        assert(b.mandatorySingleRef == null);

        b.mandatorySingleRef = null;
        assert(b.mandatorySingleRef == null);
    }

    @Test 
 public void B_StarList() {
        val b = factory.createB();
        val a = factory.createA();
        val a2 = factory.createA();
        val listA = ArrayList<A>();
        listA.add(a);
        listA.add(a2);

        b.addStarList(a);
        assert(a.eContainer() == b);
        assert(b.starList.size == 1, "Size:" + a.starList.size);

        b.addStarList(a2);
        assert(a.eContainer() == b);
        assert(a2.eContainer() == b);
        assert(b.starList.size == 2, "Size:" + a.starList.size);

        b.addStarList(a2);
        assert(a.eContainer() == b);
        assert(a2.eContainer() == b);
        assert(b.starList.size == 2, "Size:" + a.starList.size);

        b.removeStarList(a);
        assert(a.eContainer() == null);
        assert(a2.eContainer() == b);
        assert(b.starList.size == 1, "Size:" + a.starList.size);

        b.removeStarList(a2);
        assert(a.eContainer() == null);
        assert(a2.eContainer() == null);
        assert(b.starList.size == 0, "Size:" + a.starList.size);

        b.removeStarList(a2);
        assert(b.starList.size == 0, "Size:" + a.starList.size);

        b.addAllStarList(listA);
        assert(a.eContainer() == b);
        assert(a2.eContainer() == b);
        assert(b.starList.size == 2, "Size:" + a.starList.size);

        b.addAllStarList(listA);
        assert(b.starList.size == 2, "Size:" + a.starList.size);

        b.removeAllStarList();
        assert(a.eContainer() == null);
        assert(a2.eContainer() == null);
        assert(b.starList.size == 0, "Size:" + a.starList.size);

        b.removeAllStarList();
        assert(b.starList.size == 0, "Size:" + a.starList.size);
    }
    */

}