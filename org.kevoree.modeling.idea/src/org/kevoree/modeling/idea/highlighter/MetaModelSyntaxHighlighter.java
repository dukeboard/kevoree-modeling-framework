package org.kevoree.modeling.idea.highlighter;

import com.intellij.lexer.FlexAdapter;
import com.intellij.lexer.Lexer;
import com.intellij.openapi.editor.DefaultLanguageHighlighterColors;
import com.intellij.openapi.editor.colors.TextAttributesKey;
import com.intellij.openapi.editor.markup.TextAttributes;
import com.intellij.openapi.fileTypes.SyntaxHighlighterBase;
import com.intellij.psi.TokenType;
import com.intellij.psi.tree.IElementType;
import org.jetbrains.annotations.NotNull;
import org.kevoree.modeling._MetaModelLexer;
import org.kevoree.modeling.idea.psi.MetaModelTypes;

import java.awt.*;

import static com.intellij.openapi.editor.colors.TextAttributesKey.createTextAttributesKey;

/**
 * Created by duke on 18/01/2014.
 */
public class MetaModelSyntaxHighlighter extends SyntaxHighlighterBase {

    public static final TextAttributesKey KEYWORD = createTextAttributesKey("MM_KEYWORD", DefaultLanguageHighlighterColors.KEYWORD);
    public static final TextAttributesKey STRING = createTextAttributesKey("MM_STRING", DefaultLanguageHighlighterColors.STRING);
    public static final TextAttributesKey SEPARATOR = createTextAttributesKey("MM_SEPARATOR", DefaultLanguageHighlighterColors.INSTANCE_FIELD);
    public static final TextAttributesKey COMMENT = createTextAttributesKey("MM_COMMENT", DefaultLanguageHighlighterColors.LINE_COMMENT);
    public static final TextAttributesKey IDENT = createTextAttributesKey("MM_IDENT", DefaultLanguageHighlighterColors.STATIC_METHOD);
    public static final TextAttributesKey ANNOTATION = createTextAttributesKey("MM_ANNOTATION", DefaultLanguageHighlighterColors.NUMBER);
    public static final TextAttributesKey BAD_CHARACTER = createTextAttributesKey("MM_BAD_CHARACTER", new TextAttributes(Color.RED, null, null, null, Font.BOLD));

    private static final TextAttributesKey[] BAD_CHAR_KEYS = new TextAttributesKey[]{BAD_CHARACTER};
    private static final TextAttributesKey[] ANNOTATION_KEYS = new TextAttributesKey[]{ANNOTATION};
    private static final TextAttributesKey[] KEYWORD_KEYS = new TextAttributesKey[]{KEYWORD};

    private static final TextAttributesKey[] IDENT_KEYS = new TextAttributesKey[]{IDENT};
    private static final TextAttributesKey[] STRING_KEYS = new TextAttributesKey[]{STRING};
    private static final TextAttributesKey[] COMMENT_KEYS = new TextAttributesKey[]{COMMENT};
    private static final TextAttributesKey[] EMPTY_KEYS = new TextAttributesKey[0];
    private static final TextAttributesKey[] SEPARATOR_KEYS = new TextAttributesKey[]{SEPARATOR};

    @NotNull
    @Override
    public Lexer getHighlightingLexer() {
        return new FlexAdapter(new _MetaModelLexer());
    }

    @NotNull
    @Override
    public TextAttributesKey[] getTokenHighlights(IElementType tokenType) {
        /* Entities OPERATIONS */
        if (tokenType.equals(MetaModelTypes.CLASS)) {
            return KEYWORD_KEYS;
        }
        if (tokenType.equals(MetaModelTypes.ENUM)) {
            return KEYWORD_KEYS;
        }
        if (tokenType.equals(MetaModelTypes.FUNC)) {
            return KEYWORD_KEYS;
        }
        if (tokenType.equals(MetaModelTypes.OPPOSITE)) {
            return KEYWORD_KEYS;
        }
        if (tokenType.equals(MetaModelTypes.TANNOTATION)) {
            return ANNOTATION_KEYS;
        }
        if (tokenType.equals(MetaModelTypes.ANNOTATION)) {
            return ANNOTATION_KEYS;
        }
        /* Separator */
        if (tokenType.equals(MetaModelTypes.COLON)) {
            return SEPARATOR_KEYS;
        }
        if (tokenType.equals(MetaModelTypes.COMMA)) {
            return SEPARATOR_KEYS;
        }
        if (tokenType.equals(MetaModelTypes.BODY_OPEN)) {
            return SEPARATOR_KEYS;
        }
        if (tokenType.equals(MetaModelTypes.BODY_CLOSE)) {
            return SEPARATOR_KEYS;
        }
        if (tokenType.equals(MetaModelTypes.MULT_OPEN)) {
            return SEPARATOR_KEYS;
        }
        if (tokenType.equals(MetaModelTypes.MULT_CLOSE)) {
            return SEPARATOR_KEYS;
        }
        if (tokenType.equals(MetaModelTypes.MULT_SEP)) {
            return SEPARATOR_KEYS;
        }
        if (tokenType.equals(MetaModelTypes.ANNOT_PARAM_OPEN)) {
            return SEPARATOR_KEYS;
        }
        if (tokenType.equals(MetaModelTypes.ANNOT_PARAM_CLOSE)) {
            return SEPARATOR_KEYS;
        }

        /* Basic elem */
        if (tokenType.equals(MetaModelTypes.IDENT)) {
            return IDENT_KEYS;
        }
        if (tokenType.equals(MetaModelTypes.COMMENT)) {
            return COMMENT_KEYS;
        }
        if (tokenType.equals(MetaModelTypes.STRING)) {
            return STRING_KEYS;
        }
        if (tokenType.equals(TokenType.BAD_CHARACTER)) {
            return BAD_CHAR_KEYS;
        }
        return EMPTY_KEYS;

    }

}
