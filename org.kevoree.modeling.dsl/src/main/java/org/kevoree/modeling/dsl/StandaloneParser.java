package org.kevoree.modeling.dsl;

import com.intellij.core.CoreApplicationEnvironment;
import com.intellij.core.CoreProjectEnvironment;
import com.intellij.openapi.Disposable;
import com.intellij.openapi.vfs.CharsetToolkit;
import com.intellij.openapi.vfs.VirtualFile;
import com.intellij.psi.PsiFile;
import com.intellij.psi.PsiFileFactory;
import com.intellij.psi.impl.PsiFileFactoryImpl;
import com.intellij.testFramework.LightVirtualFile;
import org.kevoree.modeling.MetaModelLanguage;
import org.kevoree.modeling.MetaModelLanguageType;
import org.kevoree.modeling.MetaModelParserDefinition;

import java.io.File;
import java.io.IOException;

/**
 * Created by duke on 7/3/14.
 */
public class StandaloneParser {

    CoreProjectEnvironment projectEnvironment;

    public StandaloneParser() {
        CoreApplicationEnvironment environment = new CoreApplicationEnvironment(new Disposable() {
            @Override
            public void dispose() {

            }
        });
        projectEnvironment = new CoreProjectEnvironment(environment.getParentDisposable(), environment);
        environment.registerParserDefinition(new MetaModelParserDefinition());
        environment.registerFileType(MetaModelLanguageType.INSTANCE, "mm");
    }

    public PsiFile parser(File f) throws IOException {

        VirtualFile input = projectEnvironment.getEnvironment().getLocalFileSystem().findFileByIoFile(f);








                LightVirtualFile virtualFile = new LightVirtualFile("hello.mm", MetaModelLanguage.INSTANCE, new String(input.contentsToByteArray()));
                virtualFile.setCharset(CharsetToolkit.UTF8_CHARSET);

        return ((PsiFileFactoryImpl) PsiFileFactory.getInstance(projectEnvironment.getProject())).trySetupPsiForFile(virtualFile, MetaModelLanguage.INSTANCE, true, false);
    }

}
