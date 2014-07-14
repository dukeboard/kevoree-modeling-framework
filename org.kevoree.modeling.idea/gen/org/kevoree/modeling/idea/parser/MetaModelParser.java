// This is a generated file. Not intended for manual editing.
package org.kevoree.modeling.idea.parser;

import com.intellij.lang.PsiBuilder;
import com.intellij.lang.PsiBuilder.Marker;
import com.intellij.openapi.diagnostic.Logger;
import static org.kevoree.modeling.idea.psi.MetaModelTypes.*;
import static org.kevoree.modeling.idea.parser.GeneratedParserUtilBase.*;
import com.intellij.psi.tree.IElementType;
import com.intellij.lang.ASTNode;
import com.intellij.psi.tree.TokenSet;
import com.intellij.lang.PsiParser;

@SuppressWarnings({"SimplifiableIfStatement", "UnusedAssignment"})
public class MetaModelParser implements PsiParser {

  public static final Logger LOG_ = Logger.getInstance("org.kevoree.modeling.idea.parser.MetaModelParser");

  public ASTNode parse(IElementType root_, PsiBuilder builder_) {
    boolean result_;
    builder_ = adapt_builder_(root_, builder_, this, null);
    Marker marker_ = enter_section_(builder_, 0, _COLLAPSE_, null);
    if (root_ == ANNOTATIONS) {
      result_ = ANNOTATIONS(builder_, 0);
    }
    else if (root_ == CLASS_DECLARATION) {
      result_ = CLASS_DECLARATION(builder_, 0);
    }
    else if (root_ == DECLARATION) {
      result_ = DECLARATION(builder_, 0);
    }
    else if (root_ == MULTIPLICITY_DECLARATION) {
      result_ = MULTIPLICITY_DECLARATION(builder_, 0);
    }
    else if (root_ == MULTIPLICITY_DECLARATION_LOWER) {
      result_ = MULTIPLICITY_DECLARATION_LOWER(builder_, 0);
    }
    else if (root_ == MULTIPLICITY_DECLARATION_UPPER) {
      result_ = MULTIPLICITY_DECLARATION_UPPER(builder_, 0);
    }
    else if (root_ == PARENTS_DECLARATION) {
      result_ = PARENTS_DECLARATION(builder_, 0);
    }
    else if (root_ == RELATION_DECLARATION) {
      result_ = RELATION_DECLARATION(builder_, 0);
    }
    else if (root_ == RELATION_NAME) {
      result_ = RELATION_NAME(builder_, 0);
    }
    else if (root_ == RELATION_OPPOSITE) {
      result_ = RELATION_OPPOSITE(builder_, 0);
    }
    else if (root_ == TYPE_DECLARATION) {
      result_ = TYPE_DECLARATION(builder_, 0);
    }
    else {
      result_ = parse_root_(root_, builder_, 0);
    }
    exit_section_(builder_, 0, marker_, root_, result_, true, TRUE_CONDITION);
    return builder_.getTreeBuilt();
  }

  protected boolean parse_root_(final IElementType root_, final PsiBuilder builder_, final int level_) {
    return METAMODEL(builder_, level_ + 1);
  }

  /* ********************************************************** */
  // ANNOTATION*
  public static boolean ANNOTATIONS(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "ANNOTATIONS")) return false;
    Marker marker_ = enter_section_(builder_, level_, _NONE_, "<annotations>");
    int pos_ = current_position_(builder_);
    while (true) {
      if (!consumeToken(builder_, ANNOTATION)) break;
      if (!empty_element_parsed_guard_(builder_, "ANNOTATIONS", pos_)) break;
      pos_ = current_position_(builder_);
    }
    exit_section_(builder_, level_, marker_, ANNOTATIONS, true, false, null);
    return true;
  }

  /* ********************************************************** */
  // CLASS TYPE_DECLARATION PARENTS_DECLARATION? BODY_OPEN RELATION_DECLARATION* BODY_CLOSE
  public static boolean CLASS_DECLARATION(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "CLASS_DECLARATION")) return false;
    boolean result_ = false;
    boolean pinned_ = false;
    Marker marker_ = enter_section_(builder_, level_, _NONE_, "<class declaration>");
    result_ = consumeToken(builder_, CLASS);
    pinned_ = result_; // pin = 1
    result_ = result_ && report_error_(builder_, TYPE_DECLARATION(builder_, level_ + 1));
    result_ = pinned_ && report_error_(builder_, CLASS_DECLARATION_2(builder_, level_ + 1)) && result_;
    result_ = pinned_ && report_error_(builder_, consumeToken(builder_, BODY_OPEN)) && result_;
    result_ = pinned_ && report_error_(builder_, CLASS_DECLARATION_4(builder_, level_ + 1)) && result_;
    result_ = pinned_ && consumeToken(builder_, BODY_CLOSE) && result_;
    exit_section_(builder_, level_, marker_, CLASS_DECLARATION, result_, pinned_, rule_start_parser_);
    return result_ || pinned_;
  }

  // PARENTS_DECLARATION?
  private static boolean CLASS_DECLARATION_2(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "CLASS_DECLARATION_2")) return false;
    PARENTS_DECLARATION(builder_, level_ + 1);
    return true;
  }

  // RELATION_DECLARATION*
  private static boolean CLASS_DECLARATION_4(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "CLASS_DECLARATION_4")) return false;
    int pos_ = current_position_(builder_);
    while (true) {
      if (!RELATION_DECLARATION(builder_, level_ + 1)) break;
      if (!empty_element_parsed_guard_(builder_, "CLASS_DECLARATION_4", pos_)) break;
      pos_ = current_position_(builder_);
    }
    return true;
  }

  /* ********************************************************** */
  // CLASS_DECLARATION | eof | newline | CRLF
  public static boolean DECLARATION(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "DECLARATION")) return false;
    boolean result_ = false;
    Marker marker_ = enter_section_(builder_, level_, _NONE_, "<declaration>");
    result_ = CLASS_DECLARATION(builder_, level_ + 1);
    if (!result_) result_ = consumeToken(builder_, EOF);
    if (!result_) result_ = consumeToken(builder_, NEWLINE);
    if (!result_) result_ = consumeToken(builder_, CRLF);
    exit_section_(builder_, level_, marker_, DECLARATION, result_, false, null);
    return result_;
  }

  /* ********************************************************** */
  // DECLARATION*
  static boolean METAMODEL(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "METAMODEL")) return false;
    int pos_ = current_position_(builder_);
    while (true) {
      if (!DECLARATION(builder_, level_ + 1)) break;
      if (!empty_element_parsed_guard_(builder_, "METAMODEL", pos_)) break;
      pos_ = current_position_(builder_);
    }
    return true;
  }

  /* ********************************************************** */
  // MULT_OPEN MULTIPLICITY_DECLARATION_LOWER COMMA MULTIPLICITY_DECLARATION_UPPER MULT_CLOSE
  public static boolean MULTIPLICITY_DECLARATION(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "MULTIPLICITY_DECLARATION")) return false;
    if (!nextTokenIs(builder_, MULT_OPEN)) return false;
    boolean result_ = false;
    Marker marker_ = enter_section_(builder_);
    result_ = consumeToken(builder_, MULT_OPEN);
    result_ = result_ && MULTIPLICITY_DECLARATION_LOWER(builder_, level_ + 1);
    result_ = result_ && consumeToken(builder_, COMMA);
    result_ = result_ && MULTIPLICITY_DECLARATION_UPPER(builder_, level_ + 1);
    result_ = result_ && consumeToken(builder_, MULT_CLOSE);
    exit_section_(builder_, marker_, MULTIPLICITY_DECLARATION, result_);
    return result_;
  }

  /* ********************************************************** */
  // STAR_OR_NB
  public static boolean MULTIPLICITY_DECLARATION_LOWER(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "MULTIPLICITY_DECLARATION_LOWER")) return false;
    if (!nextTokenIs(builder_, "<multiplicity declaration lower>", NUMBER, STAR)) return false;
    boolean result_ = false;
    Marker marker_ = enter_section_(builder_, level_, _NONE_, "<multiplicity declaration lower>");
    result_ = STAR_OR_NB(builder_, level_ + 1);
    exit_section_(builder_, level_, marker_, MULTIPLICITY_DECLARATION_LOWER, result_, false, null);
    return result_;
  }

  /* ********************************************************** */
  // STAR_OR_NB
  public static boolean MULTIPLICITY_DECLARATION_UPPER(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "MULTIPLICITY_DECLARATION_UPPER")) return false;
    if (!nextTokenIs(builder_, "<multiplicity declaration upper>", NUMBER, STAR)) return false;
    boolean result_ = false;
    Marker marker_ = enter_section_(builder_, level_, _NONE_, "<multiplicity declaration upper>");
    result_ = STAR_OR_NB(builder_, level_ + 1);
    exit_section_(builder_, level_, marker_, MULTIPLICITY_DECLARATION_UPPER, result_, false, null);
    return result_;
  }

  /* ********************************************************** */
  // COLON TYPE_DECLARATION (COMMA TYPE_DECLARATION)*
  public static boolean PARENTS_DECLARATION(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "PARENTS_DECLARATION")) return false;
    if (!nextTokenIs(builder_, COLON)) return false;
    boolean result_ = false;
    Marker marker_ = enter_section_(builder_);
    result_ = consumeToken(builder_, COLON);
    result_ = result_ && TYPE_DECLARATION(builder_, level_ + 1);
    result_ = result_ && PARENTS_DECLARATION_2(builder_, level_ + 1);
    exit_section_(builder_, marker_, PARENTS_DECLARATION, result_);
    return result_;
  }

  // (COMMA TYPE_DECLARATION)*
  private static boolean PARENTS_DECLARATION_2(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "PARENTS_DECLARATION_2")) return false;
    int pos_ = current_position_(builder_);
    while (true) {
      if (!PARENTS_DECLARATION_2_0(builder_, level_ + 1)) break;
      if (!empty_element_parsed_guard_(builder_, "PARENTS_DECLARATION_2", pos_)) break;
      pos_ = current_position_(builder_);
    }
    return true;
  }

  // COMMA TYPE_DECLARATION
  private static boolean PARENTS_DECLARATION_2_0(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "PARENTS_DECLARATION_2_0")) return false;
    boolean result_ = false;
    Marker marker_ = enter_section_(builder_);
    result_ = consumeToken(builder_, COMMA);
    result_ = result_ && TYPE_DECLARATION(builder_, level_ + 1);
    exit_section_(builder_, marker_, null, result_);
    return result_;
  }

  /* ********************************************************** */
  // ANNOTATIONS RELATION_NAME COLON TYPE_DECLARATION MULTIPLICITY_DECLARATION? RELATION_OPPOSITE?
  public static boolean RELATION_DECLARATION(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "RELATION_DECLARATION")) return false;
    if (!nextTokenIs(builder_, "<relation declaration>", ANNOTATION, IDENT)) return false;
    boolean result_ = false;
    Marker marker_ = enter_section_(builder_, level_, _NONE_, "<relation declaration>");
    result_ = ANNOTATIONS(builder_, level_ + 1);
    result_ = result_ && RELATION_NAME(builder_, level_ + 1);
    result_ = result_ && consumeToken(builder_, COLON);
    result_ = result_ && TYPE_DECLARATION(builder_, level_ + 1);
    result_ = result_ && RELATION_DECLARATION_4(builder_, level_ + 1);
    result_ = result_ && RELATION_DECLARATION_5(builder_, level_ + 1);
    exit_section_(builder_, level_, marker_, RELATION_DECLARATION, result_, false, null);
    return result_;
  }

  // MULTIPLICITY_DECLARATION?
  private static boolean RELATION_DECLARATION_4(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "RELATION_DECLARATION_4")) return false;
    MULTIPLICITY_DECLARATION(builder_, level_ + 1);
    return true;
  }

  // RELATION_OPPOSITE?
  private static boolean RELATION_DECLARATION_5(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "RELATION_DECLARATION_5")) return false;
    RELATION_OPPOSITE(builder_, level_ + 1);
    return true;
  }

  /* ********************************************************** */
  // IDENT
  public static boolean RELATION_NAME(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "RELATION_NAME")) return false;
    if (!nextTokenIs(builder_, IDENT)) return false;
    boolean result_ = false;
    Marker marker_ = enter_section_(builder_);
    result_ = consumeToken(builder_, IDENT);
    exit_section_(builder_, marker_, RELATION_NAME, result_);
    return result_;
  }

  /* ********************************************************** */
  // OPPOSITE IDENT
  public static boolean RELATION_OPPOSITE(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "RELATION_OPPOSITE")) return false;
    if (!nextTokenIs(builder_, OPPOSITE)) return false;
    boolean result_ = false;
    Marker marker_ = enter_section_(builder_);
    result_ = consumeTokens(builder_, 0, OPPOSITE, IDENT);
    exit_section_(builder_, marker_, RELATION_OPPOSITE, result_);
    return result_;
  }

  /* ********************************************************** */
  // NUMBER | STAR
  static boolean STAR_OR_NB(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "STAR_OR_NB")) return false;
    if (!nextTokenIs(builder_, "", NUMBER, STAR)) return false;
    boolean result_ = false;
    Marker marker_ = enter_section_(builder_);
    result_ = consumeToken(builder_, NUMBER);
    if (!result_) result_ = consumeToken(builder_, STAR);
    exit_section_(builder_, marker_, null, result_);
    return result_;
  }

  /* ********************************************************** */
  // IDENT
  public static boolean TYPE_DECLARATION(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "TYPE_DECLARATION")) return false;
    if (!nextTokenIs(builder_, IDENT)) return false;
    boolean result_ = false;
    Marker marker_ = enter_section_(builder_);
    result_ = consumeToken(builder_, IDENT);
    exit_section_(builder_, marker_, TYPE_DECLARATION, result_);
    return result_;
  }

  /* ********************************************************** */
  // !(CLASS)
  static boolean rule_start(PsiBuilder builder_, int level_) {
    if (!recursion_guard_(builder_, level_, "rule_start")) return false;
    boolean result_ = false;
    Marker marker_ = enter_section_(builder_, level_, _NOT_, null);
    result_ = !consumeToken(builder_, CLASS);
    exit_section_(builder_, level_, marker_, null, result_, false, null);
    return result_;
  }

  final static Parser rule_start_parser_ = new Parser() {
    public boolean parse(PsiBuilder builder_, int level_) {
      return rule_start(builder_, level_ + 1);
    }
  };
}
