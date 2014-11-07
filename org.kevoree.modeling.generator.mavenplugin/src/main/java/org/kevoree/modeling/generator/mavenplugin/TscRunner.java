package org.kevoree.modeling.generator.mavenplugin;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.io.*;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by gregory.nain on 07/11/14.
 */
public class TscRunner {

    public void runTsc(Path sourceDir, Path targetFile) throws Exception {
        List<String> params = new ArrayList<String>();
        params.add("--out");
        params.add(targetFile.toFile().getAbsolutePath());

        File[] selected = sourceDir.toFile().listFiles(new FileFilter() {
            @Override
            public boolean accept(File pathname) {
                if (pathname.getName().endsWith(".ts")) {
                    return true;
                } else {
                    return false;
                }
            }
        });
        for (File f : selected) {
            params.add(f.getAbsolutePath());
        }
        tsc(params.toArray(new String[params.size()]));
    }

    public static void main(String[] args) throws Exception {
        new TscRunner().tsc("");
    }

    private void tsc(String... args) throws Exception {
        ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
        engine.eval(new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream("node.js")));
        StringBuilder param = new StringBuilder();
        param.append("process.argv = [\"node\",\"node\"");
        for (String p : args) {
            param.append(",\"" + p + "\"");
        }
        param.append("];\n");
       // engine.eval(param.toString());

       // System.err.println(param.toString());

        engine.eval("process.argv = [\"node\",\"node\",\"--out\",\"/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/test/org.kevoree.modeling.test.cloud/target/js/org.kevoree.modeling.test.cloud.js\",\"/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/test/org.kevoree.modeling.test.cloud/target/js/java.d.ts\",\"/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/test/org.kevoree.modeling.test.cloud/target/js/lib.d.ts\",\"/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/test/org.kevoree.modeling.test.cloud/target/js/org.kevoree.modeling.microframework.typescript.d.ts\",\"/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/test/org.kevoree.modeling.test.cloud/target/js/org.kevoree.modeling.test.cloud.ts\"];\n");

        engine.eval(new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream("tsc.js")));
    }

}
