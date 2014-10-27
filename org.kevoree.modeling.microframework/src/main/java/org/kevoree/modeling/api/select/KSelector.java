package org.kevoree.modeling.api.select;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.util.CallBackChain;
import org.kevoree.modeling.api.util.Helper;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by duke on 10/24/14.
 */
public class KSelector {

    public static void select(KObject root, String query, Callback<List<KObject>> callback) {

        final KQuery extractedQuery = KQuery.extractFirstQuery(query);

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
            public void on(List<KObject> resolveds) {
                List<KObject> nextGeneration = new ArrayList<KObject>();
                if (extractedQuery.params.isEmpty()) {
                    nextGeneration.addAll(resolveds);
                } else {
                    for (int i = 0; i < resolveds.size(); i++) {
                        KObject resolved = resolveds.get(i);
                        boolean selectedForNext = true;
                        for (String paramKey : extractedQuery.params.keySet()) {
                            KQueryParam param = extractedQuery.params.get(paramKey);
                            for (int j = 0; j < resolved.metaAttributes().length; j++) {
                                MetaAttribute metaAttribute = resolved.metaAttributes()[i];
                                if (metaAttribute.metaName().matches(param.getName().replace("*", ".*"))) {
                                    Object o_raw = resolved.get(metaAttribute);
                                    if (o_raw != null) {
                                        if (o_raw.toString().matches(param.getValue().replace("*", ".*"))) {
                                            if (param.isNegative()) {
                                                selectedForNext = false;
                                            }
                                        } else {
                                            if (!param.isNegative()) {
                                                selectedForNext = false;
                                            }
                                        }
                                    } else {
                                        if (!param.isNegative() && !param.getValue().equals("null")) {
                                            selectedForNext = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (selectedForNext) {
                            nextGeneration.add(resolved);
                        }
                    }
                }
                List<KObject> childSelected = new ArrayList<KObject>();
                if (extractedQuery.subQuery == null || extractedQuery.subQuery.isEmpty()) {
                    childSelected.add(root);
                    callback.on(nextGeneration);
                } else {
                    //Recursive call
                    Helper.forall(nextGeneration.toArray(new KObject[nextGeneration.size()]), new CallBackChain<KObject>() {
                        @Override
                        public void on(KObject kObject, Callback<Throwable> next) {
                            select(kObject, extractedQuery.subQuery, (subs) -> {
                                childSelected.addAll(childSelected);
                            });
                        }
                    }, new Callback<Throwable>() {
                        @Override
                        public void on(Throwable throwable) {
                            callback.on(childSelected);
                        }
                    });
                }
            }
        });

    }

}
