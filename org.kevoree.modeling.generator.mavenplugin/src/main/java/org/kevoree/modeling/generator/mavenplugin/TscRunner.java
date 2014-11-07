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


    public void runTsc(String tscPath, Path sourceDir, Path targetFile) throws Exception {
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
        tsc(tscPath, params.toArray(new String[params.size()]));
    }

    private void tsc(String tscPath, String... args) throws Exception {
        String[] params = new String[args.length + 2];
        for (int i = 0; i < args.length; i++) {
            params[i + 2] = args[i];
        }
        params[0] = "node";
        params[1] = tscPath;

        ProcessBuilder pb = new ProcessBuilder(params);
        pb.redirectError();
        pb.redirectOutput();
        int res = pb.start().waitFor();
        if (res != 0) {
            ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
            engine.eval(new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream("node.js")));
            StringBuilder param = new StringBuilder();
            param.append("process.argv = [\"node\",\"node\"");
            for (String p : args) {
                param.append(",\"" + p + "\"");
            }
            param.append("];\n");
            engine.eval(param.toString());
            engine.eval(new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream("tsc.js")));
        }
    }

}
