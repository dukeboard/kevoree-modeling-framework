package org.kevoree.modeling.dsl;

/**
 * Created by duke on 7/3/14.
 */
public class ParserTester {

    public static void main(String[] args){

/*
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

        System.out.println("Yop");
*/
    }

}
