package org.kevoree.modeling.idea.psi;

import com.intellij.psi.tree.IElementType;
import org.jetbrains.annotations.NonNls;
import org.jetbrains.annotations.NotNull;
import org.kevoree.modeling.MetaModelLanguage;

/**
 * Created by duke on 17/01/2014.
 */
public class MetaModelElementType extends IElementType {

    public MetaModelElementType(@NotNull @NonNls String debugName) {
        super(debugName, MetaModelLanguage.INSTANCE);
    }


}
