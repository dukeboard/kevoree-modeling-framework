// This is a generated file. Not intended for manual editing.
package org.kevoree.modeling.idea.psi;

import com.intellij.psi.tree.IElementType;
import com.intellij.psi.PsiElement;
import com.intellij.lang.ASTNode;
import org.kevoree.modeling.idea.psi.impl.*;

public interface MetaModelTypes {

  IElementType ANNOTATIONS = new MetaModelElementType("ANNOTATIONS");
  IElementType CLASS_DECLARATION = new MetaModelElementType("CLASS_DECLARATION");
  IElementType DECLARATION = new MetaModelElementType("DECLARATION");
  IElementType MULTIPLICITY_DECLARATION = new MetaModelElementType("MULTIPLICITY_DECLARATION");
  IElementType MULTIPLICITY_DECLARATION_LOWER = new MetaModelElementType("MULTIPLICITY_DECLARATION_LOWER");
  IElementType MULTIPLICITY_DECLARATION_UPPER = new MetaModelElementType("MULTIPLICITY_DECLARATION_UPPER");
  IElementType PARENTS_DECLARATION = new MetaModelElementType("PARENTS_DECLARATION");
  IElementType RELATION_DECLARATION = new MetaModelElementType("RELATION_DECLARATION");
  IElementType RELATION_NAME = new MetaModelElementType("RELATION_NAME");
  IElementType TYPE_DECLARATION = new MetaModelElementType("TYPE_DECLARATION");

  IElementType ANNOTATION = new MetaModelTokenType("ANNOTATION");
  IElementType BODY_CLOSE = new MetaModelTokenType("}");
  IElementType BODY_OPEN = new MetaModelTokenType("{");
  IElementType CLASS = new MetaModelTokenType("class");
  IElementType COLON = new MetaModelTokenType(":");
  IElementType COMMA = new MetaModelTokenType(",");
  IElementType COMMENT = new MetaModelTokenType("comment");
  IElementType CRLF = new MetaModelTokenType("CRLF");
  IElementType EOF = new MetaModelTokenType("<<EOF>>");
  IElementType EQ = new MetaModelTokenType("=");
  IElementType IDENT = new MetaModelTokenType("IDENT");
  IElementType MULT_CLOSE = new MetaModelTokenType("]");
  IElementType MULT_OPEN = new MetaModelTokenType("[");
  IElementType MULT_SEP = new MetaModelTokenType(".");
  IElementType NEWLINE = new MetaModelTokenType("newline");
  IElementType NUMBER = new MetaModelTokenType("NUMBER");
  IElementType OPPOSITE = new MetaModelTokenType("oppositeOf");
  IElementType STAR = new MetaModelTokenType("*");
  IElementType STRING = new MetaModelTokenType("string");
  IElementType SUB = new MetaModelTokenType("/");

  class Factory {
    public static PsiElement createElement(ASTNode node) {
      IElementType type = node.getElementType();
       if (type == ANNOTATIONS) {
        return new MetaModelAnnotationsImpl(node);
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
      else if (type == MULTIPLICITY_DECLARATION_LOWER) {
        return new MetaModelMultiplicityDeclarationLowerImpl(node);
      }
      else if (type == MULTIPLICITY_DECLARATION_UPPER) {
        return new MetaModelMultiplicityDeclarationUpperImpl(node);
      }
      else if (type == PARENTS_DECLARATION) {
        return new MetaModelParentsDeclarationImpl(node);
      }
      else if (type == RELATION_DECLARATION) {
        return new MetaModelRelationDeclarationImpl(node);
      }
      else if (type == RELATION_NAME) {
        return new MetaModelRelationNameImpl(node);
      }
      else if (type == TYPE_DECLARATION) {
        return new MetaModelTypeDeclarationImpl(node);
      }
      throw new AssertionError("Unknown element type: " + type);
    }
  }
}
