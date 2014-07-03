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

NEWLINE=\n\t
COMMENT="//".*
NUMBER=[0-9\-]+
IDENT=[\*\.a-zA-Z0-9_\-]+
STRING=('([^'\\]|\\.)*'|\"([^\"\\]|\\.)*\")

%%
<YYINITIAL> {
  {WHITE_SPACE}      { return com.intellij.psi.TokenType.WHITE_SPACE; }

  "class"            { return CLASS; }
  ":"                { return COLON; }
  ","                { return COMMA; }
  "/"                { return SUB; }
  "="                { return EQ; }
  "@id"              { return ID_ANNOT; }
  "@contained"       { return CONT_ANNOT; }
  "["                { return MULT_OPEN; }
  "{"                { return BODY_OPEN; }
  "]"                { return MULT_CLOSE; }
  "}"                { return BODY_CLOSE; }
  "."                { return MULT_SEP; }
  "*"                { return STAR; }
  "<<EOF>>"          { return EOF; }
  "CRLF"             { return CRLF; }

  {NEWLINE}          { return NEWLINE; }
  {COMMENT}          { return COMMENT; }
  {NUMBER}           { return NUMBER; }
  {IDENT}            { return IDENT; }
  {STRING}           { return STRING; }

  [^] { return com.intellij.psi.TokenType.BAD_CHARACTER; }
}
