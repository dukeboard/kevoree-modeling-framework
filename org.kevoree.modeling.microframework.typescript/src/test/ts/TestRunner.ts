module gentest {
    export class FlatJUnitTest {

        public run(): void {
            try {
                var p_comparetest: org.kevoree.modeling.microframework.test.CompareTest = new org.kevoree.modeling.microframework.test.CompareTest();
                p_comparetest.diffTest();
                p_comparetest.intersectionTest();
                p_comparetest.unionTest();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_deletetest: org.kevoree.modeling.microframework.test.DeleteTest = new org.kevoree.modeling.microframework.test.DeleteTest();
                p_deletetest.basicDeleteTest();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_hellotest: org.kevoree.modeling.microframework.test.HelloTest = new org.kevoree.modeling.microframework.test.HelloTest();
                p_hellotest.helloTest();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_helpertest: org.kevoree.modeling.microframework.test.HelperTest = new org.kevoree.modeling.microframework.test.HelperTest();
                p_helpertest.helperTest();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_jsonloadtest: org.kevoree.modeling.microframework.test.json.JSONLoadTest = new org.kevoree.modeling.microframework.test.json.JSONLoadTest();
                p_jsonloadtest.jsonTest();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_jsonsavetest: org.kevoree.modeling.microframework.test.json.JSONSaveTest = new org.kevoree.modeling.microframework.test.json.JSONSaveTest();
                p_jsonsavetest.jsonTest();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_lookuptest: org.kevoree.modeling.microframework.test.LookupTest = new org.kevoree.modeling.microframework.test.LookupTest();
                p_lookuptest.lookupTest();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_polynomialextrapolationtest: org.kevoree.modeling.microframework.test.polynomial.PolynomialExtrapolationTest = new org.kevoree.modeling.microframework.test.polynomial.PolynomialExtrapolationTest();
                p_polynomialextrapolationtest.test();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_polynomialkmftest: org.kevoree.modeling.microframework.test.polynomial.PolynomialKMFTest = new org.kevoree.modeling.microframework.test.polynomial.PolynomialKMFTest();
                p_polynomialkmftest.test();
                p_polynomialkmftest.test2();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_polynomialsaveloadtest: org.kevoree.modeling.microframework.test.polynomial.PolynomialSaveLoadTest = new org.kevoree.modeling.microframework.test.polynomial.PolynomialSaveLoadTest();
                p_polynomialsaveloadtest.test();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_basicselecttest: org.kevoree.modeling.microframework.test.selector.BasicSelectTest = new org.kevoree.modeling.microframework.test.selector.BasicSelectTest();
                p_basicselecttest.rootSelectTest();
                p_basicselecttest.selectTest();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_slicetest: org.kevoree.modeling.microframework.test.SliceTest = new org.kevoree.modeling.microframework.test.SliceTest();
                p_slicetest.slideTest();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_parentstoragetest: org.kevoree.modeling.microframework.test.storage.ParentStorageTest = new org.kevoree.modeling.microframework.test.storage.ParentStorageTest();
                p_parentstoragetest.discardTest();
                p_parentstoragetest.parentTest();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_timetest: org.kevoree.modeling.microframework.test.TimeTest = new org.kevoree.modeling.microframework.test.TimeTest();
                p_timetest.timeCreationTest();
                p_timetest.simpleTimeNavigationTest();
                p_timetest.distortedTimeNavigationTest();
                p_timetest.objectModificationTest();
                p_timetest.timeUpdateWithLookupTest();
                p_timetest.timeUpdateWithSelectTest();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_tracetest: org.kevoree.modeling.microframework.test.TraceTest = new org.kevoree.modeling.microframework.test.TraceTest();
                p_tracetest.traceTest();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_longrbtreetest: org.kevoree.modeling.microframework.test.tree.LongRBTreeTest = new org.kevoree.modeling.microframework.test.tree.LongRBTreeTest();
                p_longrbtreetest.saveLoad0();
                p_longrbtreetest.saveLoad();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_rbtreetest: org.kevoree.modeling.microframework.test.tree.RBTreeTest = new org.kevoree.modeling.microframework.test.tree.RBTreeTest();
                p_rbtreetest.printTest();
                p_rbtreetest.nextTest();
                p_rbtreetest.previousTest();
                p_rbtreetest.nextWhileNotTest();
                p_rbtreetest.previousWhileNotTest();
                p_rbtreetest.firstTest();
                p_rbtreetest.lastTest();
                p_rbtreetest.firstWhileNot();
                p_rbtreetest.lastWhileNot();
                p_rbtreetest.previousOrEqualTest();
                p_rbtreetest.nextOrEqualTest();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
            try {
                var p_serializertest: org.kevoree.modeling.microframework.test.xmi.SerializerTest = new org.kevoree.modeling.microframework.test.xmi.SerializerTest();
                p_serializertest.serializeTest();
            } catch ($ex$) {
                if ($ex$ instanceof java.lang.Exception) {
                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                    e.printStackTrace();
                }
             }
        }

    }

}
