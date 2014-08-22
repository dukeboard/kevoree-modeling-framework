package org.kevoree.modeling.idea.action;

import com.intellij.ide.IdeView;
import com.intellij.ide.actions.CreateFileFromTemplateDialog;
import com.intellij.ide.actions.CreateTemplateInPackageAction;
import com.intellij.openapi.actionSystem.CommonDataKeys;
import com.intellij.openapi.actionSystem.DataContext;
import com.intellij.openapi.actionSystem.LangDataKeys;
import com.intellij.openapi.project.DumbAware;
import com.intellij.openapi.project.Project;
import com.intellij.psi.PsiDirectory;
import com.intellij.psi.PsiElement;
import com.intellij.util.IncorrectOperationException;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.jetbrains.jps.model.java.JavaModuleSourceRootTypes;
import org.kevoree.modeling.MetaModelIcons;
import org.kevoree.modeling.idea.MetaModelTemplatesFactory;

/**
 * Created by duke on 16/01/2014.
 */
public class NewMetaModelFileAction extends CreateTemplateInPackageAction<PsiElement> implements DumbAware {

    public NewMetaModelFileAction() {
        super("Create MetaModel file",
                "This will create a new MetaModel file in the current project",
                MetaModelIcons.KEVS_ICON_16x16, JavaModuleSourceRootTypes.SOURCES);
    }

    @Nullable
    @Override
    protected PsiElement getNavigationElement(@NotNull PsiElement psiElement) {
        return psiElement;
    }

    @Override
    protected boolean checkPackageExists(PsiDirectory psiDirectory) {
        return true;
    }

    @Nullable
    @Override
    protected PsiElement doCreate(PsiDirectory psiDirectory, String parameterName, String typeName) throws IncorrectOperationException {
        MetaModelTemplatesFactory.Template template = MetaModelTemplatesFactory.Template.MetaModel;
        String fileName = fileNameFromTypeName(typeName, parameterName);
        return MetaModelTemplatesFactory.createFromTemplate(psiDirectory, fileName, template,"class kmf.Concept {\n" +
                "    @contained\n" +
                "    concepts : kmf.Concept2[0,*]\n" +
                "}\n" +
                "\n" +
                "class kmf.Concept2 {\n" +
                "    @id name : String\n" +
                "}\n");
    }


    String fileNameFromTypeName(String typeName, String parameterName) {
        return parameterName + ".mm";
    }

    @Override
    protected void buildDialog(Project project, PsiDirectory psiDirectory, CreateFileFromTemplateDialog.Builder builder) {
        builder.addKind("New MetaModel", MetaModelIcons.KEVS_ICON_16x16, "metamodel.mm");
    }

    @Override
    protected String getActionName(PsiDirectory psiDirectory, String s, String s2) {
        return "New MetaModel File";
    }

    protected boolean isAvailable(final DataContext dataContext) {
        final Project project = CommonDataKeys.PROJECT.getData(dataContext);
        final IdeView view = LangDataKeys.IDE_VIEW.getData(dataContext);
        if (project == null || view == null || view.getDirectories().length == 0) {
            return false;
        }
        return true;
    }

}
