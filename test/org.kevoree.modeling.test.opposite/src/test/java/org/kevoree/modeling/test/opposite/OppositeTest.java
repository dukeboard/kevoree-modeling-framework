package org.kevoree.modeling.test.opposite;

import junit.framework.Assert;
import junit.framework.TestCase;
import kmf.opposite.test.OppositeDimension;
import kmf.opposite.test.OppositeUniverse;
import kmf.opposite.test.OppositeView;
import kmf.opposite.test.A;
import kmf.opposite.test.B;
import org.junit.BeforeClass;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.api.meta.MetaReference;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertTrue;
import static junit.framework.TestCase.assertNotNull;
import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertNull;

public class OppositeTest {

    private static OppositeUniverse universe;
    private static OppositeDimension localDimension;
    private static OppositeView factory;

    @BeforeClass
    public static void setUp() {
        universe = new OppositeUniverse();
        universe.connect(null);
        localDimension = universe.newDimension();
        factory = localDimension.time(0l);
    }



    @Test
    public void A_singleRef() { // single ref, not contained, no apposite

        A a = factory.createA();
        B b = factory.createB();
        B b2 = factory.createB();

        a.setSingleRef(b);
        a.getSingleRef((b_cb)->{
            assertNotNull(b_cb);
            assertEquals(b_cb, b);
        });

        a.setSingleRef(b);
        a.getSingleRef((b_cb)->{
            assertNotNull(b_cb);
            assertEquals(b_cb, b);
        });

        a.setSingleRef(b2);
        a.getSingleRef((b2_cb)->{
            assertNotNull(b2_cb);
            assertEquals(b2_cb, b2);
        });

        a.setSingleRef(null);
        a.getSingleRef(org.junit.Assert::assertNull);

    }

    @Test
    public void A_multiRef() { // multi ref, not contained, no apposite
        A a = factory.createA();
        B b = factory.createB();
        B b2 = factory.createB();

        a.addMultiRef(b);
        a.eachMultiRef((ref)->{
            assertEquals(ref, b);
        },(end)->{
            assertEquals(1, a.sizeOfMultiRef());
        });

        a.addMultiRef(b);
        a.eachMultiRef((ref)->{
            assertEquals(ref, b);
        },(end)->{
            assertEquals(1, a.sizeOfMultiRef());
        });

        a.addMultiRef(b2);
        a.eachMultiRef((ref)->{
        },(end)->{
            assertEquals(2, a.sizeOfMultiRef());
        });

        a.addMultiRef(b2);
        a.eachMultiRef((ref)->{

        },(end)->{
            assertEquals(2, a.sizeOfMultiRef());
        });

        a.removeMultiRef(b);
        a.eachMultiRef((ref)->{
            assertEquals(ref, b2);
        },(end)->{
            assertEquals(1, a.sizeOfMultiRef());
        });

        a.removeMultiRef(b);
        a.eachMultiRef((ref)->{
            assertEquals(ref, b2);
        },(end)->{
            assertEquals(1, a.sizeOfMultiRef());
        });

        a.removeMultiRef(b2);
        a.eachMultiRef((ref)->{
        },(end)->{
            assertEquals(0, a.sizeOfMultiRef());
        });

        a.removeMultiRef(b2);
        a.eachMultiRef((ref)->{
        },(end)->{
            assertEquals(0, a.sizeOfMultiRef());
        });

    }


    @Test
    public void B_singleRef() { // single ref, contained, no opposite
        B b = factory.createB();
        A a = factory.createA();
        A a2 = factory.createA();

        b.setSingleRef(a);
        b.getSingleRef((a_cb)->{
            assertNotNull(a_cb);
            assertEquals(a_cb, a);
            a_cb.parent((parent)->{
                assertNotNull(parent);
                assertEquals(parent, b);
            });
        });

        b.setSingleRef(a);
        b.getSingleRef((a_cb)->{
            assertNotNull(a_cb);
            assertEquals(a_cb, a);
            a_cb.parent((parent)->{
                assertNotNull(parent);
                assertEquals(parent, b);
            });
        });

        b.setSingleRef(a2);
        b.getSingleRef((a_cb)->{
            assertNotNull(a_cb);
            assertEquals(a_cb, a2);
            a_cb.parent((parent)->{
                assertNotNull(parent);
                assertEquals(parent, b);
            });
            a.parent(TestCase::assertNull);
        });

        b.setSingleRef(null);
        b.getSingleRef(TestCase::assertNull);
        a.parent(TestCase::assertNull);
        a2.parent(TestCase::assertNull);

    }




    @Test
    public void B_StarList() { // multi ref, contained, no opposite
        B b = factory.createB();
        A a = factory.createA();
        A a2 = factory.createA();

        b.addMultiRef(a);
        b.eachMultiRef((ref)->{
            assertEquals(ref, a);
            a.parent((parent)->{assertEquals(parent, b);});
        },(end)->{
            assertEquals(1, b.sizeOfMultiRef());
        });

        b.addMultiRef(a);
        b.eachMultiRef((ref)->{
            assertEquals(ref, a);
            a.parent((parent)->{assertEquals(parent, b);});
        },(end)->{
            assertEquals(1, b.sizeOfMultiRef());
        });

        b.addMultiRef(a2);
        b.eachMultiRef((ref)->{
            ref.parent((parent)->{assertEquals(parent, b);});
        },(end)->{
            assertEquals(2, b.sizeOfMultiRef());
        });

        b.addMultiRef(a2);
        b.eachMultiRef((ref)->{
            ref.parent((parent)->{assertEquals(parent, b);});
        },(end)->{
            assertEquals(2, b.sizeOfMultiRef());
        });

        b.removeMultiRef(a);
        b.eachMultiRef((ref)->{
            assertEquals(ref, a2);
            a2.parent((parent)->{assertEquals(parent, b);});
        },(end)->{
            assertEquals(1, b.sizeOfMultiRef());
        });
        a.parent(TestCase::assertNull);

        b.removeMultiRef(a);
        b.eachMultiRef((ref)->{
            assertEquals(ref, a2);
            a2.parent((parent)->{assertEquals(parent, b);});
        },(end)->{
            assertEquals(1, b.sizeOfMultiRef());
        });
        a.parent(TestCase::assertNull);

        b.removeMultiRef(a2);
        b.eachMultiRef((ref)->{
        },(end)->{
            assertEquals(0, b.sizeOfMultiRef());
        });
        a.parent(TestCase::assertNull);
        a2.parent(TestCase::assertNull);

        b.removeMultiRef(a2);
        b.eachMultiRef((ref)->{
        },(end)->{
            assertEquals(0, b.sizeOfMultiRef());
        });
        a.parent(TestCase::assertNull);
        a2.parent(TestCase::assertNull);
    }


    @Test
    public void singleA_singleB_Test() {  // single ref, contained, opposite
        //val container = TestFactory.createContainer
        B b = factory.createB();
        A a = factory.createA();

        //Set a in B
        b.setSingleA_singleB(a);
        b.getSingleA_singleB((a_cb)-> assertEquals(a_cb, a));
        a.getSingleA_singleB((b_cb)->{
            assertNotNull(b_cb);
            assertEquals(b_cb, b);
            a.parent((parent)-> assertEquals(parent, b));
        });

        //Again, should be equivalent to noop
        b.setSingleA_singleB(a);
        b.getSingleA_singleB((a_cb) -> assertEquals(a_cb, a));
        a.getSingleA_singleB((b_cb)->{
            assertNotNull(b_cb);
            assertEquals(b_cb, b);
            a.parent((parent)-> assertEquals(parent, b));
        });

        //Remove A from B
        b.setSingleA_singleB(null);
        a.getSingleA_singleB(TestCase::assertNull);
        a.parent(TestCase::assertNull);

        //Set B in A
        a.setSingleA_singleB(b);
        a.getSingleA_singleB((b_cb) -> assertEquals(b_cb, b));
        b.getSingleA_singleB((a_cb)->{
            assertNotNull(a_cb);
            assertEquals(a_cb, a);
        });
        a.parent((parent) -> assertEquals(parent, b));

        //Again, should be equivalent to noop
        a.setSingleA_singleB(b);
        a.getSingleA_singleB((b_cb) -> assertEquals(b_cb, b));
        b.getSingleA_singleB((a_cb)->{
            assertNotNull(a_cb);
            assertEquals(a_cb, a);
        });
        a.parent((parent)-> assertEquals(parent, b));

        //Remove B from A
        a.setSingleA_singleB(null);
        b.getSingleA_singleB(TestCase::assertNull);
        a.parent(TestCase::assertNull);
    }



    @Test
    public void singleA_multiB_Test() {
        //val container = TestFactory.createContainer
        B b = factory.createB();
        A a = factory.createA();
        A a2 = factory.createA();

        b.addSingleA_multiB(a);
        b.eachSingleA_multiB((ref)->{
            assertEquals(ref, a);
            a.parent((parent)->{assertEquals(parent, b);});
        },(end)->{
            assertEquals(1, b.sizeOfSingleA_multiB());
        });
        a.getSingleA_multiB((b_cb)->{
            assertNotNull(b_cb);
            assertEquals(b_cb, b);
        });

        b.addSingleA_multiB(a2);
        b.eachSingleA_multiB((ref)->{
            ref.parent((parent)->{assertEquals(parent, b);});
            ref.getSingleA_multiB((b_cb)->{
                assertNotNull(b_cb);
                assertEquals(b_cb, b);
            });
        },(end)->{
            assertEquals(2, b.sizeOfSingleA_multiB());
        });

        b.addSingleA_multiB(a2);
        b.eachSingleA_multiB((ref)->{
            ref.parent((parent)->{assertEquals(parent, b);});
            ref.getSingleA_multiB((b_cb)->{
                assertNotNull(b_cb);
                assertEquals(b_cb, b);
            });
        },(end)->{
            assertEquals(2, b.sizeOfSingleA_multiB());
        });

        b.removeSingleA_multiB(a);
        b.eachSingleA_multiB((ref)->{
            assertEquals(ref, a2);
            a2.parent((parent)->{assertEquals(parent, b);});
        },(end)->{
            assertEquals(1, b.sizeOfSingleA_multiB());
        });
        a.getSingleA_multiB(TestCase::assertNull);
        a.parent(TestCase::assertNull);

        b.removeSingleA_multiB(a);
        b.eachSingleA_multiB((ref)->{
            assertEquals(ref, a2);
            a2.parent((parent)->{assertEquals(parent, b);});
        },(end)->{
            assertEquals(1, b.sizeOfSingleA_multiB());
        });
        a.getSingleA_multiB(TestCase::assertNull);
        a.parent(TestCase::assertNull);


        b.removeSingleA_multiB(a2);
        b.eachSingleA_multiB((ref)->{
        },(end)->{
            assertEquals(0, b.sizeOfSingleA_multiB());
        });
        a.getSingleA_multiB(TestCase::assertNull);
        a2.getSingleA_multiB(TestCase::assertNull);
        a.parent(TestCase::assertNull);
        a2.parent(TestCase::assertNull);

    }



    @Test
    public void multiA_multiB_Test() {

        B b = factory.createB();
        B b2 = factory.createB();
        A a = factory.createA();
        A a2 = factory.createA();

        a.addMultiA_multiB(b);
        assert(b.sizeOfMultiA_multiB() == 1);
        assert(a.sizeOfMultiA_multiB() == 1);
        a.parent((parent)->{assertEquals(b, parent);});

        a.addMultiA_multiB(b2);
        assert(b2.sizeOfMultiA_multiB() == 1);
        assert(b.sizeOfMultiA_multiB() == 0);
        assert(a.sizeOfMultiA_multiB() == 1);
        a.parent((parent)->{assertEquals(b2, parent);});

        b.addMultiA_multiB(a);
        assert(b.sizeOfMultiA_multiB() == 1);
        assert(b2.sizeOfMultiA_multiB() == 0);
        assert(a.sizeOfMultiA_multiB() == 1);
        a.parent((parent)->{assertEquals(b, parent);});

        b.addMultiA_multiB(a2);
        assertEquals(2, b.sizeOfMultiA_multiB());
        assertEquals(0, b2.sizeOfMultiA_multiB());
        assertEquals(1, a.sizeOfMultiA_multiB());
        assertEquals(1, a2.sizeOfMultiA_multiB());
        a.parent((parent)->{assertEquals(b, parent);});
        a2.parent((parent)->{assertEquals(b, parent);});

        b2.addMultiA_multiB(a2);
        assertEquals(1, b.sizeOfMultiA_multiB());
        assertEquals(1, b2.sizeOfMultiA_multiB());
        assertEquals(1, a.sizeOfMultiA_multiB());
        assertEquals(1, a2.sizeOfMultiA_multiB());
        a.parent((parent)->{assertEquals(b, parent);});
        a2.parent((parent)->{assertEquals(b2, parent);});

        b2.addMultiA_multiB(a2);
        assertEquals(1, b.sizeOfMultiA_multiB());
        assertEquals(1, b2.sizeOfMultiA_multiB());
        assertEquals(1, a.sizeOfMultiA_multiB());
        assertEquals(1, a2.sizeOfMultiA_multiB());
        a.parent((parent)->{assertEquals(b, parent);});
        a2.parent((parent)->{assertEquals(b2, parent);});


        b.removeMultiA_multiB(a);
        assert(b.sizeOfMultiA_multiB() == 0);
        assert(b2.sizeOfMultiA_multiB() == 1);
        assert(a.sizeOfMultiA_multiB() == 0);
        assert(a2.sizeOfMultiA_multiB() == 1);
        a.parent(TestCase::assertNull);
        a2.parent((parent)-> assertEquals(b2, parent));

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







    */

}