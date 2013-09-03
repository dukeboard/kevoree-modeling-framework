package org.kevoree.modeling.sample.js;

import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebConsole;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.util.LinkedList;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 30/07/13
 * Time: 09:23
 */
public class SimpleJSTest {

    @Test
    public void testSimpleJSTest() throws IOException {
        System.out.println("Hello");
        final WebClient webClient = new WebClient(BrowserVersion.CHROME);

        final LinkedList<String> traces = new LinkedList<String>();
        webClient.getWebConsole().setLogger(new WebConsole.Logger() {
            @Override
            public void trace(Object o) {
                traces.add(o.toString());
                System.out.println(o);
            }

            @Override
            public void debug(Object o) {
                traces.add(o.toString());
                System.out.println(o);
            }

            @Override
            public void info(Object o) {
                traces.add(o.toString());
                System.out.println(o);
            }

            @Override
            public void warn(Object o) {
                traces.add(o.toString());
                System.out.println(o);
            }

            @Override
            public void error(Object o) {
                traces.add(o.toString());
                System.out.println(o);
            }
        });

        File html = new File("tester.html");
        final HtmlPage page = webClient.getPage("file:///" + html.getAbsolutePath());

        assert (traces.contains("4.0"));

        webClient.closeAllWindows();

    }

}
