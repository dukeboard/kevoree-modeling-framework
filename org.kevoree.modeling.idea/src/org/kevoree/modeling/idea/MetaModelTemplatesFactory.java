package org.kevoree.modeling.idea;

import com.intellij.ide.fileTemplates.*;
import com.intellij.psi.PsiDirectory;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiFile;
import com.intellij.psi.PsiFileFactory;
import org.kevoree.modeling.MetaModelIcons;
import org.kevoree.modeling.MetaModelLanguageType;

import java.io.File;
import java.util.Properties;

/**
 * Created by duke on 16/01/2014.
 */
public class MetaModelTemplatesFactory implements FileTemplateGroupDescriptorFactory {

    public enum Template {
        MetaModel("MetaModel");
        final String file;

        Template(String file) {
            this.file = file;
        }

        public String getFile() {
            return file;
        }
    }

    public FileTemplateGroupDescriptor getFileTemplatesDescriptor() {
        String title = "MetaModel file templates";
        final FileTemplateGroupDescriptor group =
                new FileTemplateGroupDescriptor(title, MetaModelIcons.KEVS_ICON_16x16);

        for (Template template : Template.values()) {
            group.addTemplate(new FileTemplateDescriptor(template.getFile(), MetaModelIcons.KEVS_ICON_16x16));
        }

        return group;
    }

    public static PsiElement createFromTemplate(PsiDirectory directory,String fileName, Template template, String text2) {

        final FileTemplate fileTemplate = FileTemplateManager.getInstance().getInternalTemplate(template.getFile());
        Properties properties = new Properties(FileTemplateManager.getInstance().getDefaultProperties());
       /*
        String text;
        try {
            text = fileTemplate.getText(properties);
        } catch (Exception e) {
            throw new RuntimeException("Unable to load template for " + template.getFile(), e);
        }  */

        final PsiFileFactory factory = PsiFileFactory.getInstance(directory.getProject());

        if ((new File(fileName)).exists()) {
            throw new RuntimeException("File already exists");
        }

        final PsiFile file = factory.createFileFromText(fileName, MetaModelLanguageType.INSTANCE, text2);

        return directory.add(file);
    }
}
