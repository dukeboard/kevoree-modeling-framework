// This is a generated file. Not intended for manual editing.
package org.kevoree.modeling.idea.psi;

import com.intellij.psi.tree.IElementType;
import com.intellij.psi.PsiElement;
import com.intellij.lang.ASTNode;
import org.kevoree.modeling.idea.psi.impl.*;

public interface MetaModelTypes {

  IElementType BODY_ELEM_ANNOT = new MetaModelElementType("BODY_ELEM_ANNOT");
  IElementType CLASS_DECLARATION = new MetaModelElementType("CLASS_DECLARATION");
  IElementType DECLARATION = new MetaModelElementType("DECLARATION");
  IElementType MULTIPLICITY_DECLARATION = new MetaModelElementType("MULTIPLICITY_DECLARATION");
  IElementType RELATION_DECLARATION = new MetaModelElementType("RELATION_DECLARATION");

  IElementType BODY_CLOSE = new MetaModelTokenType("}");
  IElementType BODY_OPEN = new MetaModelTokenType("{");
  IElementType CLASS = new MetaModelTokenType("class");
  IElementType COLON = new MetaModelTokenType(":");
  IElementType COMMA = new MetaModelTokenType(",");
  IElementType COMMENT = new MetaModelTokenType("comment");
  IElementType CONT_ANNOT = new MetaModelTokenType("@contained");
  IElementType CRLF = new MetaModelTokenType("CRLF");
  IElementType EOF = new MetaModelTokenType("<<EOF>>");
  IElementType EQ = new MetaModelTokenType("=");
  IElementType IDENT = new MetaModelTokenType("IDENT");
  IElementType ID_ANNOT = new MetaModelTokenType("@id");
  IElementType MULT_CLOSE = new MetaModelTokenType("]");
  IElementType MULT_OPEN = new MetaModelTokenType("[");
  IElementType MULT_SEP = new MetaModelTokenType(".");
  IElementType NEWLINE = new MetaModelTokenType("newline");
  IElementType NUMBER = new MetaModelTokenType("NUMBER");
  IElementType STAR = new MetaModelTokenType("*");
  IElementType STRING = new MetaModelTokenType("string");
  IElementType SUB = new MetaModelTokenType("/");

  class Factory {
    public static PsiElement createElement(ASTNode node) {
      IElementType type = node.getElementType();
       if (type == BODY_ELEM_ANNOT) {
        return new MetaModelBodyElemAnnotImpl(node);
      }
      else if (type == CLASS_DECLARATION) {
        return new MetaModelClassDeclarationImpl(node);
      }
      else if (type == DECLARATION) {
        return new MetaModelDeclarationImpl(node);
      }
      else if (type == MULTIPLICITY_DECLARATION) {
        return new MetaModelMultiplicityDeclarationImpl(node);
      }
      else if (type == RELATION_DECLARATION) {
        return new MetaModelRelationDeclarationImpl(node);
      }
      throw new AssertionError("Unknown element type: " + type);
    }
  }
}
