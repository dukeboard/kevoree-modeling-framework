package org.kevoree.modeling.generator.mavenplugin;

import com.ppedregal.typescript.maven.ClasspathModuleSourceProvider;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.JavaScriptException;
import org.mozilla.javascript.NativeArray;
import org.mozilla.javascript.NativeJavaObject;
import org.mozilla.javascript.NativeObject;
import org.mozilla.javascript.RhinoException;
import org.mozilla.javascript.Script;
import org.mozilla.javascript.ScriptableObject;
import org.mozilla.javascript.commonjs.module.RequireBuilder;
import org.mozilla.javascript.commonjs.module.provider.SoftCachingModuleScriptProvider;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Path;

/**
 * Created by gregory.nain on 07/11/14.
 */
public class TscRunner {

    private Script nodeScript;
    private Script tscScript;
    private ScriptableObject globalScope;
    private Path libDts;

    public void runTsc(Path sourceFile, Path targetFile, Path libDts) throws Exception {

        this.libDts = libDts;

        compileScripts();

        doCompileSingleFile(sourceFile, targetFile);

/*
        doCompileFiles(false);

        if (watch) {
            watching = true;
            getLog().info("Waiting for changes to " + sourceDirectory + " polling every " + pollTime + " millis");
            checkForChangesEvery(pollTime);
        }
*/
    }


    private void compileScripts() throws Exception {
        try {
            Context.enter();
            Context ctx = Context.getCurrentContext();
            ctx.setOptimizationLevel(-1);
            globalScope = ctx.initStandardObjects();
            RequireBuilder require = new RequireBuilder();
            require.setSandboxed(false);
            require.setModuleScriptProvider(new SoftCachingModuleScriptProvider(new ClasspathModuleSourceProvider()));
            require.createRequire(ctx, globalScope).install(globalScope);
            System.out.println("Compiling Node.js");
            nodeScript = compile(ctx, "node.js");
            System.out.println("Compiling Tsc.js");
            tscScript = compile(ctx, "tsc.js");
        } finally {
            Context.exit();
        }
        Context.enter();
    }

    private Script compile(Context context, String resource) throws Exception {
        InputStream stream = getClass().getClassLoader().getResourceAsStream(resource);
        if (stream == null) {
            throw new FileNotFoundException("Resource open error: " + resource);
        }
        try {
            return context.compileReader(new InputStreamReader(stream), resource, 1, null);
        } catch (IOException e) {
            throw new IOException("Resource read error: " + resource);
        } finally {
            try {
                stream.close();
            } catch (IOException e) {
                throw new IOException("Resource close error: " + resource);
            }
            stream = null;
        }
    }

    private void doCompileSingleFile(Path source, Path target) throws Exception{
        String sourceFilePath = source.toAbsolutePath().toString();
        String targetFilePath = target.toAbsolutePath().toString();
        System.out.println(String.format("Compiling: %s", sourceFilePath));
        tsc("--out", targetFilePath, sourceFilePath);
        System.out.println(String.format("Generated: %s", targetFilePath));
    }


    private void tsc(String... args) throws Exception {

        try {
            Context.enter();
            Context ctx = Context.getCurrentContext();

            nodeScript.exec(ctx, globalScope);

            NativeObject proc = (NativeObject) globalScope.get("process");
            NativeArray argv = (NativeArray) proc.get("argv");
            argv.defineProperty("length", 0, ScriptableObject.EMPTY);
            int i = 0;
            argv.put(i++, argv, "node");
            argv.put(i++, argv, "tsc.js");

            //argv.put(i++, argv, "--nolib");
           // argv.put(i++, argv, libDts);


            for (String s : args) {
                argv.put(i++, argv, s);
            }

            proc.defineProperty("encoding", "UTF-8", ScriptableObject.READONLY);

            NativeObject mainModule = (NativeObject) proc.get("mainModule");
            mainModule.defineProperty("filename", new File("tsc.js").getAbsolutePath(), ScriptableObject.READONLY);

            tscScript.exec(ctx, globalScope);
        } catch (JavaScriptException e) {
            if (e.getValue() instanceof NativeJavaObject) {
                NativeJavaObject njo = (NativeJavaObject) e.getValue();
                Object o = njo.unwrap();
                System.err.println("unwrap Return::" + o + "->"+o.getClass());
            } else {
                throw new Exception("Javascript Error", e);
            }
        } catch (RhinoException e) {
            throw new Exception("Rhino Error", e);
        } finally {
            org.mozilla.javascript.Context.exit();
        }
    }

}
