package org.kevoree.modeling.generator;

import com.intellij.psi.PsiFile;
import org.kevoree.modeling.MetaModelLanguageType;
import org.kevoree.modeling.util.StandaloneParser;

import java.io.File;

public class Generator {

    private GenerationContext context;

    public void execute(GenerationContext context) throws Exception{
        this.context = context;

        if (!context.metaModel.exists()) {
            throw new Exception("Input file not found at: " + context.metaModel.getAbsolutePath() + " ! Generation aborted");
        }

        if (!context.metaModel.getAbsolutePath().endsWith(MetaModelLanguageType.DEFAULT_EXTENSION)) {
            throw new UnsupportedOperationException("Only *.mm files are currently supported.");
        }


        File output = context.kmfSrcGenerationDirectory;
        deleteDirectory(output);
        output.mkdirs();

        try {

            StandaloneParser parser = new StandaloneParser();
            PsiFile psi = parser.parser(context.metaModel);

            System.out.println("Indexing Enums");
            psi.acceptChildren(new EnumIndexesVisitor(context));
            ProcessorHelper.getInstance().consolidateEnumIndexes(context.classDeclarationsList);

            System.out.println("Generating Classes");
            psi.acceptChildren(new ClassGenerationVisitor(context));


        } catch (Exception e) {
            e.printStackTrace();
        }

    }



    private boolean deleteDirectory(File path) {
        if (path.exists()) {
            File[] files = path.listFiles();
            for (int i = 0; i < files.length; i++) {
                if (files[i].isDirectory()) {
                    deleteDirectory(files[i]);
                } else {
                    files[i].delete();
                }
            }
        }
        return (path.delete());
    }

}