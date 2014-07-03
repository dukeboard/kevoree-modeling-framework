package org.kevoree.modeling;

import com.intellij.lang.Language;

/**
 * Created by duke on 04/12/2013.
 */
public class MetaModelLanguage extends Language {

    public static final MetaModelLanguage INSTANCE = new MetaModelLanguage();

    private MetaModelLanguage() {
        super("MetaModel", "text/mm", "text/x-mm", "application/x-mm");
    }

    @Override
    public boolean isCaseSensitive() {
        return true;
    }

}
