package org.kevoree.modeling.sosym.eval.fsm.test;

import org.junit.Test;
import org.kevoree.modeling.sosym.eval.fsm.KMFKotlinTest;

import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/06/13
 * Time: 11:06
 */
public class KMFKotlinFSMTest extends KMFKotlinTest {

    @Test
    public void test() {
        try {
            doTest(1000, false);
        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }


}
