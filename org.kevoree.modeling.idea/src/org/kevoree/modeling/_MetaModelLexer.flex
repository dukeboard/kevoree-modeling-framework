package org.kevoree.modeling;
import com.intellij.lexer.*;
import com.intellij.psi.tree.IElementType;
import static org.kevoree.modeling.idea.psi.MetaModelTypes.*;

%%

%{
  public _MetaModelLexer() {
    this((java.io.Reader)null);
  }
%}

%public
%class _MetaModelLexer
%implements FlexLexer
%function advance
%type IElementType
%unicode

EOL="\r"|"\n"|"\r\n"
LINE_WS=[\ \t\f]
WHITE_SPACE=({LINE_WS}|{EOL})+

COMMENT="//".*
NUMBER=[\-]?[0-9]+[.]?[0-9]*
IDENT=[\*\.a-zA-Z0-9_\-]+
TANNOTATION=[@][\.a-zA-Z0-9_\-]+
STRING=('([^'\\]|\\.)*'|\"([^\"\\]|\\.)*\")

%%
<YYINITIAL> {
  {WHITE_SPACE}      { return com.intellij.psi.TokenType.WHITE_SPACE; }

  "class"            { return CLASS; }
  "enum"             { return ENUM; }
  "func"             { return FUNC; }
  "oppositeOf"       { return OPPOSITE; }
  ":"                { return COLON; }
  ","                { return COMMA; }
  "/"                { return SUB; }
  "="                { return EQ; }
  "["                { return MULT_OPEN; }
  "{"                { return BODY_OPEN; }
  "]"                { return MULT_CLOSE; }
  "}"                { return BODY_CLOSE; }
  "("                { return ANNOT_PARAM_OPEN; }
  ")"                { return ANNOT_PARAM_CLOSE; }
  "."                { return MULT_SEP; }
  "*"                { return STAR; }
  "<<EOF>>"          { return EOF; }
  "newline"          { return NEWLINE; }
  "CRLF"             { return CRLF; }

  {COMMENT}          { return COMMENT; }
  {NUMBER}           { return NUMBER; }
  {IDENT}            { return IDENT; }
  {TANNOTATION}      { return TANNOTATION; }
  {STRING}           { return STRING; }

  [^] { return com.intellij.psi.TokenType.BAD_CHARACTER; }
}
