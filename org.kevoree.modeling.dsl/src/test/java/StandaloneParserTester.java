import com.intellij.psi.PsiFile;
import org.junit.Test;
import org.kevoree.modeling.dsl.StandaloneParser;

import java.io.File;

/**
 * Created by duke on 7/3/14.
 */
public class StandaloneParserTester {

    @Test
    public void test() throws Exception {
        StandaloneParser parser = new StandaloneParser();
        File input = new File("/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/org.kevoree.modeling.dsl/src/main/resources/HelloWorld.mm");

        PsiFile psi = parser.parser(input);
        parser.convert2ecore(psi);

    }

}
