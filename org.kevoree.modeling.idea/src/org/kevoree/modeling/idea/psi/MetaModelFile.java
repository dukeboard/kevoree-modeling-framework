package org.kevoree.modeling.idea.psi;

import com.intellij.extapi.psi.PsiFileBase;
import com.intellij.openapi.fileTypes.FileType;
import com.intellij.psi.FileViewProvider;
import org.jetbrains.annotations.NotNull;
import org.kevoree.modeling.MetaModelLanguage;
import org.kevoree.modeling.MetaModelLanguageType;

import javax.swing.*;

/**
 * Created by duke on 17/01/2014.
 */
public class MetaModelFile extends PsiFileBase {

    public MetaModelFile(@NotNull FileViewProvider viewProvider) {
        super(viewProvider, MetaModelLanguage.INSTANCE);
    }

    @NotNull
    @Override
    public FileType getFileType() {
        return MetaModelLanguageType.INSTANCE;
    }

    @Override
    public String toString() {
        return "MetaModel File";
    }

    @Override
    public Icon getIcon(int flags) {
        return super.getIcon(flags);
    }

}
