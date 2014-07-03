package org.kevoree.modeling.kotlin.generator.mavenplugin;

import com.intellij.openapi.vfs.CharsetToolkit;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiFile;
import com.intellij.psi.PsiFileFactory;
import com.intellij.psi.impl.PsiFileFactoryImpl;
import com.intellij.testFramework.LightVirtualFile;
import org.jetbrains.jet.lang.psi.JetProperty;
import org.jetbrains.jet.plugin.JetLanguage;

/**
 * Created by duke on 6/26/14.
 */
public class KotlinLexer {

    public static void main(String[] args) {


        KotlinEnvironment en = new KotlinEnvironment();
        LightVirtualFile virtualFile = new LightVirtualFile("hello.kt", JetLanguage.INSTANCE, "class Hell { var t : String = \"\" }");
        virtualFile.setCharset(CharsetToolkit.UTF8_CHARSET);
        PsiFile file = ((PsiFileFactoryImpl) PsiFileFactory.getInstance(en.getProject())).trySetupPsiForFile(virtualFile, JetLanguage.INSTANCE, true, false);

        System.out.println(file.getNode().isParsed());


        for(PsiElement element : file.getChildren()){
            System.out.println(element.getClass());
            if(element instanceof org.jetbrains.jet.lang.psi.JetClass){
                org.jetbrains.jet.lang.psi.JetClass clazz = (org.jetbrains.jet.lang.psi.JetClass) element;
                System.out.println(clazz.getName());
                for(JetProperty property : clazz.getProperties()){
                    System.out.println(property.getName()+"->"+property.getTypeRef().getText());
                }
            }

        }


       // System.out.println(file.getFileType().getDescription());

        //System.out.println(file.getChildren()[1].getNode().getText());

    }

}
