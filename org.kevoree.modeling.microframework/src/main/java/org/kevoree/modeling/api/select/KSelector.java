package org.kevoree.modeling.api.select;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.meta.MetaReference;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by duke on 10/24/14.
 */
public class KSelector {

    public static void select(KObject root, String query, Callback<KObject> callback) {

        KQuery extractedQuery = KQuery.extractFirstQuery(query);
        String relationNameRegex = extractedQuery.relationName.replace("*", ".*");
        Set<Long> collected = new HashSet<Long>();
        Object[] raw = root.dimension().universe().storage().raw(root, KStore.AccessMode.READ);
        for (int i = 0; i < root.metaReferences().length; i++) {
            MetaReference reference = root.metaReferences()[i];
            if (reference.metaName().matches(relationNameRegex)) {
                Object refPayLoad = raw[reference.index()];
                if (refPayLoad != null) {
                    if (refPayLoad instanceof Set) {
                        Set<Long> casted = (Set<Long>) refPayLoad;
                        collected.addAll(casted);
                    } else if (refPayLoad instanceof Long) {
                        Long casted = (Long) refPayLoad;
                        collected.add(casted);
                    }
                }
            }
        }
        root.view().lookupAll(collected, new Callback<List<KObject>>() {
            @Override
            public void on(List<KObject> kObjects) {
                List<KObject> nextGeneration = new ArrayList<KObject>();
                if (!extractedQuery.params.isEmpty()) {
                    boolean selected = true;
                    //o.visitAttributes((metaAttribute, value) -> {

                    //});
                } else {
                   // nextGeneration.add(o);
                }
            }
        });

    }

}
