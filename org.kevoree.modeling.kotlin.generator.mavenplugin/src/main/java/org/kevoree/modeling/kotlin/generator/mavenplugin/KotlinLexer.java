package org.kevoree.modeling.kotlin.generator.mavenplugin;

import com.intellij.lang.ASTNode;
import com.intellij.openapi.vfs.CharsetToolkit;
import com.intellij.psi.*;
import com.intellij.psi.impl.PsiFileFactoryImpl;
import com.intellij.testFramework.LightVirtualFile;
import org.jetbrains.jet.lang.parsing.JetParser;
import org.jetbrains.jet.plugin.JetLanguage;

/**
 * Created by duke on 6/26/14.
 */
public class KotlinLexer {

    public static void main(String[] args){


        KotlinEnvironment en = new KotlinEnvironment();
        LightVirtualFile virtualFile = new LightVirtualFile("hello.kt", JetLanguage.INSTANCE, "class Hell { }");
        virtualFile.setCharset(CharsetToolkit.UTF8_CHARSET);
        PsiFile file = ((PsiFileFactoryImpl) PsiFileFactory.getInstance(en.getProject())).trySetupPsiForFile(virtualFile, JetLanguage.INSTANCE, true, false);

        System.out.println(file.getNode().isParsed());


        System.out.println(file.getFileType().getDescription());

       System.out.println(file.getChildren()[1].getNode().getText());

    }

}
