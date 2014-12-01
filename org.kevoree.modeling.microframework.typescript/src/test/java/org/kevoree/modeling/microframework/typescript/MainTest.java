package org.kevoree.modeling.microframework.typescript;

import org.junit.Assert;
import org.junit.Test;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Locale;

/**
 * Created by gregory.nain on 28/11/14.
 */
public class MainTest {
    public enum OSType {
        Windows, MacOS, Linux, Other
    }

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

    private static int launchRunner(String file) {
        String[] params = new String[2];

        if (getOS().equals(OSType.Windows)) {
            params[0] = "node.exe";
        } else {
            params[0] = "node";
        }

        params[1] = MainTest.class.getClassLoader().getResource(file).getFile();

        ProcessBuilder pb = new ProcessBuilder(params);
        pb.redirectError(ProcessBuilder.Redirect.INHERIT);
        pb.redirectOutput(ProcessBuilder.Redirect.INHERIT);
        try {
            Process p = pb.start();
            int res = p.waitFor();
            Thread.sleep(200);
            return res;
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return -1;
    }


    @Test
    public void baseTest() {
        Assert.assertEquals(0,launchRunner("test.js"));
    }

}
