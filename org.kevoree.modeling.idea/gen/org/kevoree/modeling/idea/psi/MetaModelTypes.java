// This is a generated file. Not intended for manual editing.
package org.kevoree.modeling.idea.psi;

import com.intellij.psi.tree.IElementType;
import com.intellij.psi.PsiElement;
import com.intellij.lang.ASTNode;
import org.kevoree.modeling.idea.psi.impl.*;

public interface MetaModelTypes {

  IElementType ANNOTATION = new MetaModelElementType("ANNOTATION");
  IElementType ANNOTATIONS = new MetaModelElementType("ANNOTATIONS");
  IElementType ANNOTATION_PARAM = new MetaModelElementType("ANNOTATION_PARAM");
  IElementType CLASS_DECLARATION = new MetaModelElementType("CLASS_DECLARATION");
  IElementType CLASS_ELEM_DECLARATION = new MetaModelElementType("CLASS_ELEM_DECLARATION");
  IElementType DECLARATION = new MetaModelElementType("DECLARATION");
  IElementType ENUM_DECLARATION = new MetaModelElementType("ENUM_DECLARATION");
  IElementType ENUM_ELEM_DECLARATION = new MetaModelElementType("ENUM_ELEM_DECLARATION");
  IElementType MULTIPLICITY_DECLARATION = new MetaModelElementType("MULTIPLICITY_DECLARATION");
  IElementType MULTIPLICITY_DECLARATION_LOWER = new MetaModelElementType("MULTIPLICITY_DECLARATION_LOWER");
  IElementType MULTIPLICITY_DECLARATION_UPPER = new MetaModelElementType("MULTIPLICITY_DECLARATION_UPPER");
  IElementType OPERATION_DECLARATION = new MetaModelElementType("OPERATION_DECLARATION");
  IElementType OPERATION_NAME = new MetaModelElementType("OPERATION_NAME");
  IElementType OPERATION_PARAM = new MetaModelElementType("OPERATION_PARAM");
  IElementType OPERATION_PARAMS = new MetaModelElementType("OPERATION_PARAMS");
  IElementType OPERATION_RETURN = new MetaModelElementType("OPERATION_RETURN");
  IElementType PARENTS_DECLARATION = new MetaModelElementType("PARENTS_DECLARATION");
  IElementType RELATION_DECLARATION = new MetaModelElementType("RELATION_DECLARATION");
  IElementType RELATION_NAME = new MetaModelElementType("RELATION_NAME");
  IElementType RELATION_OPPOSITE = new MetaModelElementType("RELATION_OPPOSITE");
  IElementType TYPE_DECLARATION = new MetaModelElementType("TYPE_DECLARATION");

  IElementType ANNOT_PARAM_CLOSE = new MetaModelTokenType(")");
  IElementType ANNOT_PARAM_OPEN = new MetaModelTokenType("(");
  IElementType BODY_CLOSE = new MetaModelTokenType("}");
  IElementType BODY_OPEN = new MetaModelTokenType("{");
  IElementType CLASS = new MetaModelTokenType("class");
  IElementType COLON = new MetaModelTokenType(":");
  IElementType COMMA = new MetaModelTokenType(",");
  IElementType COMMENT = new MetaModelTokenType("comment");
  IElementType CRLF = new MetaModelTokenType("CRLF");
  IElementType ENUM = new MetaModelTokenType("enum");
  IElementType EOF = new MetaModelTokenType("<<EOF>>");
  IElementType EQ = new MetaModelTokenType("=");
  IElementType FUNC = new MetaModelTokenType("func");
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
  IElementType TANNOTATION = new MetaModelTokenType("TANNOTATION");

  class Factory {
    public static PsiElement createElement(ASTNode node) {
      IElementType type = node.getElementType();
       if (type == ANNOTATION) {
        return new MetaModelAnnotationImpl(node);
      }
      else if (type == ANNOTATIONS) {
        return new MetaModelAnnotationsImpl(node);
      }
      else if (type == ANNOTATION_PARAM) {
        return new MetaModelAnnotationParamImpl(node);
      }
      else if (type == CLASS_DECLARATION) {
        return new MetaModelClassDeclarationImpl(node);
      }
      else if (type == CLASS_ELEM_DECLARATION) {
        return new MetaModelClassElemDeclarationImpl(node);
      }
      else if (type == DECLARATION) {
        return new MetaModelDeclarationImpl(node);
      }
      else if (type == ENUM_DECLARATION) {
        return new MetaModelEnumDeclarationImpl(node);
      }
      else if (type == ENUM_ELEM_DECLARATION) {
        return new MetaModelEnumElemDeclarationImpl(node);
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
      else if (type == OPERATION_DECLARATION) {
        return new MetaModelOperationDeclarationImpl(node);
      }
      else if (type == OPERATION_NAME) {
        return new MetaModelOperationNameImpl(node);
      }
      else if (type == OPERATION_PARAM) {
        return new MetaModelOperationParamImpl(node);
      }
      else if (type == OPERATION_PARAMS) {
        return new MetaModelOperationParamsImpl(node);
      }
      else if (type == OPERATION_RETURN) {
        return new MetaModelOperationReturnImpl(node);
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
      else if (type == RELATION_OPPOSITE) {
        return new MetaModelRelationOppositeImpl(node);
      }
      else if (type == TYPE_DECLARATION) {
        return new MetaModelTypeDeclarationImpl(node);
      }
      throw new AssertionError("Unknown element type: " + type);
    }
  }
}
