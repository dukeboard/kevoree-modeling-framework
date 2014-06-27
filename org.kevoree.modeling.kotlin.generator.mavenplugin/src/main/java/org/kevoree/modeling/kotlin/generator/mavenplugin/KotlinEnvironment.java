
package org.kevoree.modeling.kotlin.generator.mavenplugin;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.jetbrains.jet.CompilerModeProvider;
import org.jetbrains.jet.OperationModeProvider;
import org.jetbrains.jet.cli.jvm.compiler.ClassPath;
import org.jetbrains.jet.cli.jvm.compiler.CliVirtualFileFinder;
import org.jetbrains.jet.cli.jvm.compiler.CoreExternalAnnotationsManager;
import org.jetbrains.jet.lang.parsing.JetParserDefinition;
import org.jetbrains.jet.lang.psi.JetFile;
import org.jetbrains.jet.lang.resolve.kotlin.KotlinBinaryClassCache;
import org.jetbrains.jet.lang.resolve.kotlin.VirtualFileFinder;
import org.jetbrains.jet.plugin.JetFileType;
import org.jetbrains.jet.utils.PathUtil;

import com.intellij.codeInsight.ExternalAnnotationsManager;
import com.intellij.core.CoreApplicationEnvironment;
import com.intellij.core.CoreJavaFileManager;
import com.intellij.core.JavaCoreApplicationEnvironment;
import com.intellij.core.JavaCoreProjectEnvironment;
import com.intellij.mock.MockProject;
import com.intellij.openapi.Disposable;
import com.intellij.openapi.components.ServiceManager;
import com.intellij.openapi.extensions.Extensions;
import com.intellij.openapi.fileTypes.PlainTextFileType;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.vfs.VirtualFile;
import com.intellij.psi.PsiFile;
import com.intellij.psi.PsiManager;
import com.intellij.psi.compiled.ClassFileDecompilers;
import com.intellij.psi.impl.compiled.ClsCustomNavigationPolicy;
import com.intellij.psi.impl.file.impl.JavaFileManager;

public class KotlinEnvironment {

    private static final Disposable DISPOSABLE = new Disposable() {
        @Override
        public void dispose() {
        }
    };


    private final JavaCoreApplicationEnvironment applicationEnvironment;
    private final JavaCoreProjectEnvironment projectEnvironment;
    private final MockProject project;

    private final ClassPath classPath = new ClassPath();

    public KotlinEnvironment() {

        applicationEnvironment = createJavaCoreApplicationEnvironment();
        projectEnvironment = new JavaCoreProjectEnvironment(DISPOSABLE, applicationEnvironment);
        project = projectEnvironment.getProject();

        CoreExternalAnnotationsManager annotationsManager = new CoreExternalAnnotationsManager(project.getComponent(PsiManager.class));
        project.registerService(ExternalAnnotationsManager.class, annotationsManager);
        project.registerService(CoreJavaFileManager.class, (CoreJavaFileManager) ServiceManager.getService(project, JavaFileManager.class));



        project.registerService(VirtualFileFinder.class, new CliVirtualFileFinder(classPath));

        CoreApplicationEnvironment.registerExtensionPoint(Extensions.getRootArea(), ClsCustomNavigationPolicy.EP_NAME,
                ClsCustomNavigationPolicy.class);
        CoreApplicationEnvironment.registerExtensionPoint(Extensions.getRootArea(), ClassFileDecompilers.EP_NAME,
                ClassFileDecompilers.Decompiler.class);

    }
    /*

    @NotNull
    public static KotlinEnvironment getEnvironment(IJavaProject javaProject) {
        if (!cachedEnvironment.containsKey(javaProject)) {
            cachedEnvironment.put(javaProject, new KotlinEnvironment(javaProject));
        }

        return cachedEnvironment.get(javaProject);
    }

    public static void updateKotlinEnvironment(IJavaProject javaProject) {
        cachedEnvironment.put(javaProject, new KotlinEnvironment(javaProject));
    }

    @Nullable
    public JetFile getJetFile(@NotNull IFile file) {
        return getJetFile(new File(file.getRawLocation().toOSString()));
    } */

    @Nullable
    public JetFile getJetFile(@NotNull File file) {
        String path = file.getAbsolutePath();
        VirtualFile virtualFile = applicationEnvironment.getLocalFileSystem().findFileByPath(path);

        PsiFile psiFile = PsiManager.getInstance(project).findFile(virtualFile);
        if (psiFile != null && psiFile instanceof JetFile) {
            return (JetFile) psiFile;
        }

        return null;
    }

    @Nullable
    public JetFile parseTopLevelDeclaration(@NotNull String text) {
        try {
            File tempFile;
            tempFile = File.createTempFile("temp", "." + JetFileType.INSTANCE.getDefaultExtension());
            BufferedWriter bw = new BufferedWriter(new FileWriter(tempFile));
            bw.write(text);
            bw.close();

            return getJetFile(tempFile);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    @NotNull
    public Project getProject() {
        return project;
    }

    private JavaCoreApplicationEnvironment createJavaCoreApplicationEnvironment() {
        JavaCoreApplicationEnvironment javaApplicationEnvironment = new JavaCoreApplicationEnvironment(DISPOSABLE);
        javaApplicationEnvironment.registerFileType(PlainTextFileType.INSTANCE, "xml");
        javaApplicationEnvironment.registerFileType(JetFileType.INSTANCE, "kt");
        javaApplicationEnvironment.registerFileType(JetFileType.INSTANCE, "jet");
        javaApplicationEnvironment.registerFileType(JetFileType.INSTANCE, "ktm");
        javaApplicationEnvironment.registerParserDefinition(new JetParserDefinition());
        javaApplicationEnvironment.getApplication().registerService(OperationModeProvider.class, new CompilerModeProvider());
        javaApplicationEnvironment.getApplication().registerService(KotlinBinaryClassCache.class, new KotlinBinaryClassCache());
        return javaApplicationEnvironment;
    }

    /*
    private void addLibsToClasspath() {
        try {
            List<File> libDirectories = ProjectUtils.getLibDirectories(javaProject);
            for (File libDirectory : libDirectories) {
                addToClasspath(libDirectory);
            }
        } catch (JavaModelException e) {
            KotlinLogger.logAndThrow(e);
        } catch (CoreException e) {
            KotlinLogger.logAndThrow(e);
        }
    }

    private void addSourcesToClasspath() {
        try {
            List<File> srcDirectories = ProjectUtils.getSrcDirectories(javaProject);
            for (File srcDirectory : srcDirectories) {
                addToClasspath(srcDirectory);
            }
        } catch (JavaModelException e) {
            KotlinLogger.logAndThrow(e);
        } catch (CoreException e) {
            KotlinLogger.logAndThrow(e);
        }
    }

    private void addKotlinRuntime() {
        try {
            addToClasspath(new File(LaunchConfigurationDelegate.KT_RUNTIME_PATH));
        } catch (CoreException e) {
            KotlinLogger.logAndThrow(e);
        }
    }

    private void addJreClasspath() {
        try {
            IRuntimeClasspathEntry computeJREEntry = JavaRuntime.computeJREEntry(javaProject);
            if (computeJREEntry == null) {
                return;
            }

            IRuntimeClasspathEntry[] jreEntries = JavaRuntime.resolveRuntimeClasspathEntry(computeJREEntry,
                    javaProject);

            if (jreEntries.length != 0) {
                for (IRuntimeClasspathEntry jreEntry : jreEntries) {
                    addToClasspath(jreEntry.getClasspathEntry().getPath().toFile());
                }

                return;
            }
        } catch (JavaModelException e) {
            KotlinLogger.logAndThrow(e);
        } catch (CoreException e) {
            KotlinLogger.logAndThrow(e);
        }
    }




    public JavaCoreProjectEnvironment getProjectEnvironment() {
        return projectEnvironment;
    }

    @NotNull
    public JavaCoreApplicationEnvironment getJavaApplicationEnvironment() {
        return applicationEnvironment;
    }

    private void addToClasspath(File path) throws CoreException {
        if (path.isFile()) {
            VirtualFile jarFile = applicationEnvironment.getJarFileSystem().findFileByPath(path + "!/");
            if (jarFile == null) {
                throw new CoreException(new Status(IStatus.ERROR, Activator.PLUGIN_ID, "Can't find jar: " + path));
            }
            projectEnvironment.addJarToClassPath(path);
            classPath.add(jarFile);
        }
        else {
            VirtualFile root = applicationEnvironment.getLocalFileSystem().findFileByPath(path.getAbsolutePath());
            if (root == null) {
                throw new CoreException(new Status(IStatus.ERROR, Activator.PLUGIN_ID, "Can't find jar: " + path));
            }
            projectEnvironment.addSourcesToClasspath(root);
            classPath.add(root);
        }
    }
    */
}