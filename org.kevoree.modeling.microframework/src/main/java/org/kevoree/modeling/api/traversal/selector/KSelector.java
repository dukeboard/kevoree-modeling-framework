package org.kevoree.modeling.api.traversal.selector;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.traversal.KTraversal;

import java.util.List;

public class KSelector {

    public static void select(final KObject root, String query, final Callback<KObject[]> callback) {
        if (callback == null) {
            return;
        }
        KTraversal current = null;
        List<KQuery> extracted = KQuery.buildChain(query);
        if(extracted != null){
            for (int i = 0; i < extracted.size(); i++) {
                if (current == null) {
                    current = root.traversal().traverseQuery(extracted.get(i).relationName);
                } else {
                    current = current.traverseQuery(extracted.get(i).relationName);
                }
                current = current.attributeQuery(extracted.get(i).params);
            }
        }
        if (current != null) {
            current.then(callback);
        } else {
            callback.on(new KObject[0]);
        }
    }

}
