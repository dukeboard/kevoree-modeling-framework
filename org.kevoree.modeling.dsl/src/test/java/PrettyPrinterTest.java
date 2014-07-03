import org.junit.Test;
import org.kevoree.modeling.dsl.PrettyPrinter;

import java.io.File;

/**
 * Created by gregory.nain on 03/07/2014.
 */
public class PrettyPrinterTest {


    @Test
    public void prettyPrintKevoree() {
        PrettyPrinter prettyPrinter = new PrettyPrinter();
        System.out.println(prettyPrinter.prettyPrint(new File("src/test/resources/kevoree.ecore")));
    }


}
