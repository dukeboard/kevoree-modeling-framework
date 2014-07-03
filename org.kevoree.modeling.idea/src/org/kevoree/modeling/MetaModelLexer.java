package org.kevoree.modeling;

import com.intellij.lexer.FlexAdapter;

/**
 * Created by duke on 7/2/14.
 */
public class MetaModelLexer extends FlexAdapter {
    public MetaModelLexer() {
        super(new _MetaModelLexer());
    }
}
