package org.kevoree.modeling.idea.structure;

import com.intellij.icons.AllIcons;
import com.intellij.ide.structureView.StructureViewTreeElement;
import com.intellij.ide.util.treeView.smartTree.SortableTreeElement;
import com.intellij.ide.util.treeView.smartTree.TreeElement;
import com.intellij.navigation.ItemPresentation;
import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.editor.ScrollType;
import com.intellij.util.PlatformIcons;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.idea.psi.MetaModelRelationDeclaration;
import org.kevoree.modeling.util.PrimitiveTypes;

import javax.swing.*;

/**
 * Created by gregory.nain on 16/07/2014.
 */
public class MetaModelStructureViewReferenceElement implements StructureViewTreeElement, SortableTreeElement {

    private MetaModelRelationDeclaration refDecl;
    private Editor editor;
    private Icon myIcon = PlatformIcons.FIELD_ICON;
    private String simpleType;
    private boolean attribute = false;
    private boolean id = false;
    private boolean contained = false;


    public MetaModelStructureViewReferenceElement(MetaModelRelationDeclaration refDecl, Editor editor) {
        this.refDecl = refDecl;
        this.editor = editor;
        simpleType = refDecl.getTypeDeclaration().getName().substring(refDecl.getTypeDeclaration().getName().lastIndexOf(".")+1);

        setIcon();

    }


    private void setIcon() {
        for(PrimitiveTypes p : PrimitiveTypes.values()){
            if(refDecl.getTypeDeclaration().getName().equals(p.name())){
                    attribute = true;
                if(refDecl.getAnnotations().getText() != null && !refDecl.getAnnotations().getText().equals("")) {
                    id = true;
                    myIcon = AllIcons.Nodes.C_protected;
                } else {
                    myIcon = PlatformIcons.PROPERTY_ICON;
                }
                return;
            }
        }
        if(refDecl.getAnnotations().getText() != null && refDecl.getAnnotations().getText().equals("@contained")) {
            contained = true;
            myIcon = AllIcons.Actions.ShowWriteAccess;
        }
    }

    public boolean isAttribute() {
        return attribute;
    }

    public boolean isId() {
        return id;
    }

    public boolean isContained() {
        return contained;
    }

    @Override
    public Object getValue() {
        return refDecl;
    }

    @Override
    public void navigate(boolean b) {
        editor.getCaretModel().moveToOffset(refDecl.getTextOffset());
        editor.getScrollingModel().scrollToCaret(ScrollType.CENTER_UP);
    }


    @Override
    public boolean canNavigate() {
        return true;
    }

    @Override
    public boolean canNavigateToSource() {
        return true;
    }

    @NotNull
    @Override
    public ItemPresentation getPresentation() {
        return new ItemPresentation() {
            @Nullable
            @Override
            public String getPresentableText() {
                return refDecl.getRelationName().getText() + " : " + simpleType;
            }

            @Nullable
            @Override
            public String getLocationString() {
                return null;
            }

            @Nullable
            @Override
            public Icon getIcon(boolean b) {
                return myIcon;
            }
        };
    }

    @Override
    public TreeElement[] getChildren() {
        return EMPTY_ARRAY;
    }

    @NotNull
    @Override
    public String getAlphaSortKey() {
        return refDecl.getRelationName().getText();
    }
}
