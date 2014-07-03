package org.kevoree.modeling.idea.lexer;

import com.intellij.lexer.FlexAdapter;
import org.kevoree.modeling._MetaModelLexer;

/**
 * Created by duke on 6/28/14.
 */
public class MetaModelLexerAdapter extends FlexAdapter {
    public MetaModelLexerAdapter() {
        super(new _MetaModelLexer());
    }
}
