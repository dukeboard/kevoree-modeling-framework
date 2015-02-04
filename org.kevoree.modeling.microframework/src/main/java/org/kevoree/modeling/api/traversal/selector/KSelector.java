package org.kevoree.modeling.api.traversal.selector;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KTask;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.data.AccessMode;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.traversal.KTraversal;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by duke on 10/24/14.
 */
public class KSelector {

    public static void select(final KObject root, String query, final Callback<KObject[]> callback) {
        if (callback == null) {
            return;
        }
        KTraversal current = null;
        List<KQuery> extracted = KQuery.buildChain(query);
        for (int i = 0; i < extracted.size(); i++) {
            if (current == null) {
                current = root.traverseQuery(extracted.get(i).relationName);
            } else {
                current = current.traverseQuery(extracted.get(i).relationName);
            }
            current = current.attributeQuery(extracted.get(i).params);
        }
        if (current != null) {
            current.then(callback);
        } else {
            callback.on(new KObject[0]);
        }
    }

}
