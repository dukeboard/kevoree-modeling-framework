package org.kevoree.modeling.standalone;

import com.intellij.core.CoreApplicationEnvironment;
import com.intellij.core.CoreProjectEnvironment;
import com.intellij.openapi.Disposable;
import com.intellij.openapi.vfs.CharsetToolkit;
import com.intellij.psi.PsiFile;
import com.intellij.psi.PsiFileFactory;
import com.intellij.psi.impl.PsiFileFactoryImpl;
import com.intellij.testFramework.LightVirtualFile;
import org.kevoree.modeling.MetaModelLanguage;
import org.kevoree.modeling.MetaModelLanguageType;
import org.kevoree.modeling.MetaModelParserDefinition;

/**
 * Created by duke on 7/3/14.
 */
public class Transformation {

    public static void main(String[] args) {

        CoreApplicationEnvironment environment = new CoreApplicationEnvironment(new Disposable() {
            @Override
            public void dispose() {

            }
        });
        CoreProjectEnvironment projectEnvironment = new CoreProjectEnvironment(environment.getParentDisposable(), environment);
        environment.registerParserDefinition(new MetaModelParserDefinition());
        environment.registerFileType(MetaModelLanguageType.INSTANCE, "mm");

        LightVirtualFile virtualFile = new LightVirtualFile("hello.mm", MetaModelLanguage.INSTANCE, "class Concept {  }");
        virtualFile.setCharset(CharsetToolkit.UTF8_CHARSET);
        PsiFile file = ((PsiFileFactoryImpl) PsiFileFactory.getInstance(projectEnvironment.getProject())).trySetupPsiForFile(virtualFile, MetaModelLanguage.INSTANCE, true, false);

        System.out.println(file);
        System.out.println(file.getNode().isParsed());
        System.out.println("Elem");


    }

}
