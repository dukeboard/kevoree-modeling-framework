package org.kevoree.modeling.idea.highlighter;

import com.intellij.openapi.editor.colors.TextAttributesKey;
import com.intellij.openapi.fileTypes.SyntaxHighlighter;
import com.intellij.openapi.options.colors.AttributesDescriptor;
import com.intellij.openapi.options.colors.ColorDescriptor;
import com.intellij.openapi.options.colors.ColorSettingsPage;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.MetaModelIcons;

import javax.swing.*;
import java.util.Map;

/**
 * Created by duke on 21/01/2014.
 */
public class MetaModelColorSettingsPage implements ColorSettingsPage {

    private static final AttributesDescriptor[] DESCRIPTORS = new AttributesDescriptor[]{
            new AttributesDescriptor("KEYWORD", MetaModelSyntaxHighlighter.KEYWORD),
            new AttributesDescriptor("STRING", MetaModelSyntaxHighlighter.STRING),
            new AttributesDescriptor("SEPARATOR", MetaModelSyntaxHighlighter.SEPARATOR),
            new AttributesDescriptor("COMMENT", MetaModelSyntaxHighlighter.COMMENT),
            new AttributesDescriptor("IDENT", MetaModelSyntaxHighlighter.IDENT),
            new AttributesDescriptor("ANNOTATION", MetaModelSyntaxHighlighter.ANNOTATION),
            new AttributesDescriptor("BAD_CHARACTER", MetaModelSyntaxHighlighter.BAD_CHARACTER),
    };

    @Nullable
    @Override
    public Icon getIcon() {
        return MetaModelIcons.KEVS_ICON_16x16;
    }

    @NotNull
    @Override
    public SyntaxHighlighter getHighlighter() {
        return new MetaModelSyntaxHighlighter();
    }

    @NotNull
    @Override
    public String getDemoText() {
        return "class TypeDefinition {\n" +
                "    @id name : String\n" +
                "    @contained properties : Property[0,*]\n" +
                "}\n" +
                "class ComponentType : TypeDefinition {\n" +
                "    portNumber : Integer\n" +
                "}\n" +
                "class Property {\n" +
                "       @id name : String\n" +
                "       value : String\n" +
                "}";
    }

    @Nullable
    @Override
    public Map<String, TextAttributesKey> getAdditionalHighlightingTagToDescriptorMap() {
        return null;
    }

    @NotNull
    @Override
    public AttributesDescriptor[] getAttributeDescriptors() {
        return DESCRIPTORS;
    }

    @NotNull
    @Override
    public ColorDescriptor[] getColorDescriptors() {
        return ColorDescriptor.EMPTY_ARRAY;
    }

    @NotNull
    @Override
    public String getDisplayName() {
        return "MetaModel";
    }

}
