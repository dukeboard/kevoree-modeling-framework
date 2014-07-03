package org.kevoree.modeling;

import com.intellij.openapi.fileTypes.LanguageFileType;
import com.intellij.openapi.vfs.CharsetToolkit;
import com.intellij.openapi.vfs.VirtualFile;
import org.jetbrains.annotations.NonNls;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import javax.swing.*;

/**
 * Created by duke on 04/12/2013.
 */
public class MetaModelLanguageType extends LanguageFileType {

    public static final MetaModelLanguageType INSTANCE = new MetaModelLanguageType();

    protected MetaModelLanguageType() {
        super(MetaModelLanguage.INSTANCE);
    }

    @NotNull
    @Override
    public String getName() {
        return "MetaModel";
    }

    @NonNls
    public static final String DEFAULT_EXTENSION = "mm";

    @NotNull
    @Override
    public String getDescription() {
        return "MetaModel is a DSL dedicated to manipulate easily metamodels";
    }

    @NotNull
    @NonNls
    public String getDefaultExtension() {
        return DEFAULT_EXTENSION;
    }

    @Nullable
    @Override
    public Icon getIcon() {
        return MetaModelIcons.KEVS_ICON_16x16;
    }

    @Override
    public String getCharset(@NotNull VirtualFile file, byte[] content) {
        return CharsetToolkit.UTF8;
    }

    public boolean isJVMDebuggingSupported() {
        return false;
    }

}
