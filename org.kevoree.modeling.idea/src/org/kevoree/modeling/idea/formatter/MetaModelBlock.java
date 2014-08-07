package org.kevoree.modeling.idea.formatter;

import com.intellij.formatting.*;
import com.intellij.lang.ASTNode;
import com.intellij.psi.TokenType;
import com.intellij.psi.formatter.common.AbstractBlock;
import com.intellij.psi.tree.IElementType;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.idea.parser.GeneratedParserUtilBase;
import org.kevoree.modeling.idea.psi.MetaModelTypes;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by duke on 7/3/14.
 */
public class MetaModelBlock extends AbstractBlock {

    public MetaModelBlock(@NotNull ASTNode astNode, @Nullable Alignment alignment, @Nullable Wrap wrap) {
        super(astNode, wrap, alignment);
    }

    @Override
    protected List<Block> buildChildren() {
        List<Block> blocks = new ArrayList<Block>();
        Alignment innerBodyAlignment = Alignment.createAlignment();

        ASTNode child = getNode().getFirstChildNode();

        while(child != null) {
            if(child.getElementType() != TokenType.WHITE_SPACE) {
                if(child.getElementType() == MetaModelTypes.RELATION_DECLARATION || child.getElementType() == MetaModelTypes.ENUM_ELEM_DECLARATION) {
                    blocks.add(new MetaModelBlock(child, innerBodyAlignment, getWrap()));
                } else if(child.getElementType() == MetaModelTypes.ANNOTATIONS) {
                    if(child.getFirstChildNode() != null) {
                        blocks.add(new MetaModelBlock(child, innerBodyAlignment, getWrap()));
                    }
                } else {
                    blocks.add(new MetaModelBlock(child, getAlignment(), getWrap()));
                }
            }
            child = child.getTreeNext();
        }

        return blocks;
    }


    @Override
    public Indent getIndent() {
        if(getNode().getElementType() == MetaModelTypes.RELATION_DECLARATION || getNode().getElementType() == MetaModelTypes.ENUM_ELEM_DECLARATION ) {
            return Indent.getNormalIndent();
        }
        return super.getIndent();
    }

    @Nullable
    @Override
    public Spacing getSpacing(Block child1, @NotNull Block child2) {
        if(child1 != null) {
            IElementType type1 = ((AbstractBlock) child1).getNode().getElementType();
            IElementType type2 = ((AbstractBlock) child2).getNode().getElementType();

            if (type1 == MetaModelTypes.CLASS && type2 == MetaModelTypes.TYPE_DECLARATION) {
                return Spacing.createSpacing(1, 1, 0, false, 0);
            }

            if (type1 == MetaModelTypes.ENUM && type2 == MetaModelTypes.TYPE_DECLARATION) {
                return Spacing.createSpacing(1, 1, 0, false, 0);
            }

            if (type1 == MetaModelTypes.TYPE_DECLARATION && type2 == MetaModelTypes.PARENTS_DECLARATION) {
                return Spacing.createSpacing(1, 1, 0, false, 0);
            }

            if (type1 == MetaModelTypes.COLON && type2 == MetaModelTypes.TYPE_DECLARATION) {
                return Spacing.createSpacing(1, 1, 0, false, 0);
            }

            if (type1 == MetaModelTypes.TYPE_DECLARATION && type2 == MetaModelTypes.BODY_OPEN) {
                return Spacing.createSpacing(1, 1, 0, false, 0);
            }

            if (type1 == MetaModelTypes.PARENTS_DECLARATION && type2 == MetaModelTypes.BODY_OPEN) {
                return Spacing.createSpacing(1, 1, 0, false, 0);
            }

            if (type1 == MetaModelTypes.ANNOTATIONS && type2 == MetaModelTypes.RELATION_NAME) {
                return Spacing.createSpacing(1, 1, 1, false, 1);
            }

            if (type1 == MetaModelTypes.RELATION_NAME && type2 == MetaModelTypes.COLON) {
                return Spacing.createSpacing(1, 1, 0, false, 0);
            }

            if (type1 == MetaModelTypes.TYPE_DECLARATION && type2 == MetaModelTypes.MULTIPLICITY_DECLARATION) {
                return Spacing.createSpacing(0, 0, 0, false, 0);
            }

            if (type1 == MetaModelTypes.MULT_OPEN && type2 == MetaModelTypes.MULTIPLICITY_DECLARATION_LOWER) {
                return Spacing.createSpacing(0, 0, 0, false, 0);
            }

            if (type1 == MetaModelTypes.MULTIPLICITY_DECLARATION_LOWER && type2 == MetaModelTypes.COMMA) {
                return Spacing.createSpacing(0, 0, 0, false, 0);
            }

            if (type1 == MetaModelTypes.COMMA && type2 == MetaModelTypes.MULTIPLICITY_DECLARATION_UPPER) {
                return Spacing.createSpacing(0, 0, 0, false, 0);
            }

            if (type1 == MetaModelTypes.MULTIPLICITY_DECLARATION_UPPER && type2 == MetaModelTypes.MULT_CLOSE) {
                return Spacing.createSpacing(0, 0, 0, false, 0);
            }

            if (type1 == MetaModelTypes.MULTIPLICITY_DECLARATION && type2 == MetaModelTypes.RELATION_OPPOSITE) {
                return Spacing.createSpacing(1, 1, 0, false, 0);
            }

            if (type1 == MetaModelTypes.TYPE_DECLARATION && type2 == MetaModelTypes.RELATION_OPPOSITE) {
                return Spacing.createSpacing(1, 1, 0, false, 0);
            }

            if (type1 == MetaModelTypes.OPPOSITE && type2 == MetaModelTypes.IDENT) {
                return Spacing.createSpacing(1, 1, 0, false, 0);
            }

            if (type1 == MetaModelTypes.RELATION_DECLARATION && type2 == MetaModelTypes.BODY_CLOSE) {
                return Spacing.createSpacing(1, 1, 1, false, 0);
            }

            if (type1 == MetaModelTypes.RELATION_DECLARATION && type2 == MetaModelTypes.RELATION_DECLARATION) {
                return Spacing.createSpacing(1, 1, 1, false, 1);
            }

            if (type1 == MetaModelTypes.DECLARATION && type2 == MetaModelTypes.DECLARATION) {
                return Spacing.createSpacing(1, 1, 2, false, 1);
            }

            if (type1 == MetaModelTypes.ENUM_ELEM_DECLARATION && type2 == MetaModelTypes.BODY_CLOSE) {
                return newLine();
            }

            if (type1 == MetaModelTypes.ENUM_ELEM_DECLARATION && type2 == MetaModelTypes.ENUM_ELEM_DECLARATION) {
                return newLine();
            }

            if (type1 == MetaModelTypes.IDENT) {
                return Spacing.createSpacing(1, 1, 0, false, 0);
            }
            if (type1 == MetaModelTypes.BODY_OPEN) {
                return Spacing.createSpacing(1, 1, 1, false, 1);
            }
            if (type1 == MetaModelTypes.BODY_CLOSE) {
                return Spacing.createSpacing(1, 1, 1, false, 1);
            }
            if(type1 == TokenType.ERROR_ELEMENT || type2 == TokenType.ERROR_ELEMENT || type1 == GeneratedParserUtilBase.DUMMY_BLOCK || type2 == GeneratedParserUtilBase.DUMMY_BLOCK)  {
                return Spacing.createSpacing(1, 1, 0, false, 0);
            }

            System.out.println("Formatting Warning. Spacing unspecified between t1:" + type1 + " type2:" + type2);
        }
        return Spacing.createSpacing(0, 0, 0, false, 0);
    }

    private Spacing noSpace() {
        return Spacing.createSpacing(0, 0, 0, false, 0);
    }
    private Spacing newLine() {
        return Spacing.createSpacing(1, 1, 1, false, 0);
    }
    private Spacing singleSpace() {
        return Spacing.createSpacing(1, 1, 0, false, 0);
    }

    @Override
    public boolean isLeaf() {
        return myNode.getFirstChildNode() == null;
    }
}
