package org.kevoree.modeling.action;

import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;
import com.intellij.openapi.actionSystem.DataKeys;
import com.intellij.openapi.actionSystem.Presentation;
import com.intellij.openapi.progress.ProgressIndicator;
import com.intellij.openapi.progress.ProgressManager;
import com.intellij.openapi.progress.Task;
import com.intellij.openapi.project.DumbAware;
import com.intellij.openapi.vfs.VirtualFile;
import org.jetbrains.annotations.NotNull;

import java.io.File;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;

/**
 * Created by duke on 7/17/14.
 */
public class GenerateJavaAction extends AnAction implements DumbAware {


    @Override
    public void update(AnActionEvent e) {
        super.update(e);
        VirtualFile currentFile = DataKeys.VIRTUAL_FILE.getData(e.getDataContext());
        final Presentation presentation = e.getPresentation();
        if (currentFile != null && (currentFile.getName().endsWith(".mm") || currentFile.getName().endsWith(".ecore"))) {
            presentation.setEnabledAndVisible(true);
        } else {
            presentation.setEnabledAndVisible(false);
        }
    }

    @Override
    public void actionPerformed(final AnActionEvent anActionEvent) {

        ProgressManager.getInstance().run(new Task.Backgroundable(anActionEvent.getProject(), "KMF Compiler 2 JAR"){
            public void run(@NotNull ProgressIndicator progressIndicator) {
                progressIndicator.setFraction(0.10);
                progressIndicator.setText("downloading compiler file...");
                final File compiler = KMFCompilerResolver.resolveCompiler();
                progressIndicator.setFraction(0.20);
                progressIndicator.setText("compile KMF code...");
                try {
                    URL[] urls = {new URL("file:///" + compiler.getAbsolutePath())};
                    final URLClassLoader urlClassLoader = new InvertedURLClassLoader(urls);
                    final Class cls = urlClassLoader.loadClass("org.kevoree.modeling.kotlin.standalone.App");

                    VirtualFile currentFile = DataKeys.VIRTUAL_FILE.getData(anActionEvent.getDataContext());
                    final String path = currentFile.getCanonicalPath();

                    Thread t = new Thread(new Runnable() {
                        @Override
                        public void run() {
                            try {
                                Thread.currentThread().setContextClassLoader(urlClassLoader);
                                Method meth = cls.getMethod("main", String[].class);
                                String[] params = {path};
                                meth.invoke(null, (Object) params); // static method doesn't have an instance
                            } catch (Exception e) {
                                e.printStackTrace();
                            }


                        }
                    });
                    t.start();
                    t.join();

                    // Finished
                    progressIndicator.setFraction(1.0);
                    progressIndicator.setText("finished");
                    currentFile.getParent().refresh(true, true);

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }});
    }

}
