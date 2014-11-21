package org.kevoree.modeling.generator.mavenplugin;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.io.*;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

/**
 * Created by gregory.nain on 07/11/14.
 */
public class TscRunner {


    public void runTsc(String tscPath, Path sourceDir, Path targetFile) throws Exception {
        List<String> params = new ArrayList<String>();
        //params.add("--sourcemap");
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

        if (getOS().equals(OSType.Windows)) {
            params[0] = "node.exe";
        } else {
            params[0] = "node";
        }
        params[1] = tscPath;

        /*
        StringBuilder printer = new StringBuilder();
        for(String p : params){
            printer.append(p+" ");
        }
        System.out.println(printer.toString());
        */

        ProcessBuilder pb = new ProcessBuilder(params);
        pb.redirectError();
        pb.redirectOutput();


        int res = pb.start().waitFor();
        if (res != 0) {
            System.err.println("NodeJS not found, try Java embedded version ...");
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

    public enum OSType {
        Windows, MacOS, Linux, Other
    }

    ;

    public static OSType getOS() {
        String OS = System.getProperty("os.name", "generic").toLowerCase(Locale.ENGLISH);
        if ((OS.indexOf("mac") >= 0) || (OS.indexOf("darwin") >= 0)) {
            return OSType.MacOS;
        } else if (OS.indexOf("win") >= 0) {
            return OSType.Windows;
        } else if (OS.indexOf("nux") >= 0) {
            return OSType.Linux;
        } else {
            return OSType.Other;
        }
    }


}
