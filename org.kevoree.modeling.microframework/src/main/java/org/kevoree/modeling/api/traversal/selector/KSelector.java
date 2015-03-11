package org.kevoree.modeling.api.traversal.selector;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.traversal.KTraversal;

import java.util.List;

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
        if(extracted != null){
            for (int i = 0; i < extracted.size(); i++) {
                if (current == null) {
                    if (extracted.get(i).relationName.equals("..")) {
                        current = root.traversal().inboundsQuery("*");
                    } else if (extracted.get(i).relationName.startsWith("..")) {
                        current = root.traversal().inboundsQuery(extracted.get(i).relationName.substring(2));
                    } else if (extracted.get(i).relationName.equals("@parent")) {
                        current = root.traversal().parents();
                    } else {
                        current = root.traversal().traverseQuery(extracted.get(i).relationName);
                    }
                } else {
                    if (extracted.get(i).relationName.equals("..")) {
                        current = current.inboundsQuery("*");
                    } else if (extracted.get(i).relationName.startsWith("..")) {
                        current = current.inboundsQuery(extracted.get(i).relationName.substring(2));
                    } else if (extracted.get(i).relationName.equals("@parent")) {
                        current = current.parents();
                    } else {
                        current = current.traverseQuery(extracted.get(i).relationName);
                    }
                }
                current = current.attributeQuery(extracted.get(i).params);
            }
        }
        if (current != null) {
            current.done().then(callback);
        } else {
            callback.on(new KObject[0]);
        }
    }

}
