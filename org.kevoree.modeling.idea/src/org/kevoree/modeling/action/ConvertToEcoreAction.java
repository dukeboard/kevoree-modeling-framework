package org.kevoree.modeling.action;

import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;
import com.intellij.openapi.actionSystem.DataKeys;
import com.intellij.openapi.actionSystem.Presentation;
import com.intellij.openapi.project.DumbAware;
import com.intellij.openapi.vfs.VirtualFile;
import com.intellij.psi.PsiFile;
import org.kevoree.modeling.MetaModelLanguageType;
import org.kevoree.modeling.util.StandaloneParser;

import java.io.File;


/**
 * Created by duke on 7/14/14.
 */
public class ConvertToEcoreAction extends AnAction implements DumbAware {

    @Override
    public void update(AnActionEvent e) {
        super.update(e);
        VirtualFile currentFile = DataKeys.VIRTUAL_FILE.getData(e.getDataContext());
        final Presentation presentation = e.getPresentation();
        if (currentFile != null && currentFile.getName().endsWith(MetaModelLanguageType.DEFAULT_EXTENSION)) {
            presentation.setEnabledAndVisible(true);
        } else {
            presentation.setEnabledAndVisible(false);
        }
    }


    @Override
    public void actionPerformed(AnActionEvent anActionEvent) {
        StandaloneParser parser = new StandaloneParser(anActionEvent.getProject());
        VirtualFile currentFile = DataKeys.VIRTUAL_FILE.getData(anActionEvent.getDataContext());
        try {
            PsiFile psi = parser.parser(currentFile);
            String path = currentFile.getCanonicalPath();
            File target = new File(path.replace(".mm", ".ecore"));
            parser.convert2ecore(psi, target);
        } catch (Exception e) {
            e.printStackTrace();
        }

        currentFile.getParent().refresh(true, true);

    }
}
