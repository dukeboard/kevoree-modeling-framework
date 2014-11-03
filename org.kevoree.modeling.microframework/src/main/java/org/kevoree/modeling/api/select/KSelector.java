package org.kevoree.modeling.api.select;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.AccessMode;
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

    public static void select(final KObject root, String query, final Callback<KObject[]> callback) {

        final KQuery extractedQuery = KQuery.extractFirstQuery(query);
        if (extractedQuery == null) {
            callback.on(new KObject[0]);
        } else {

            String relationNameRegex = extractedQuery.relationName.replace("*", ".*");
            Set<Long> collected = new HashSet<Long>();
            Object[] raw = root.dimension().universe().storage().raw(root, AccessMode.READ);
            for (int i = 0; i < root.metaReferences().length; i++) {
                MetaReference reference = root.metaReferences()[i];
                if (reference.metaName().matches(relationNameRegex)) {
                    Object refPayLoad = raw[reference.index()];
                    if (refPayLoad != null) {
                        if (refPayLoad instanceof Set) {
                            Set<Long> castedSet = (Set<Long>) refPayLoad;
                            collected.addAll(castedSet);
                        } else {
                            Long castedLong = (Long) refPayLoad;
                            collected.add(castedLong);
                        }
                    }
                }
            }
            root.view().lookupAll(collected.toArray(new Long[collected.size()]), new Callback<KObject[]>() {
                @Override
                public void on(KObject[] resolveds) {
                    List<KObject> nextGeneration = new ArrayList<KObject>();
                    if (extractedQuery.params.isEmpty()) {
                        for (int i = 0; i < resolveds.length; i++) {
                            nextGeneration.add(resolveds[i]);
                        }
                    } else {
                        for (int i = 0; i < resolveds.length; i++) {
                            KObject resolved = resolveds[i];
                            boolean selectedForNext = true;
                            for (String paramKey : extractedQuery.params.keySet()) {
                                KQueryParam param = extractedQuery.params.get(paramKey);
                                for (int j = 0; j < resolved.metaAttributes().length; j++) {
                                    MetaAttribute metaAttribute = resolved.metaAttributes()[i];
                                    if (metaAttribute.metaName().matches(param.name().replace("*", ".*"))) {
                                        Object o_raw = resolved.get(metaAttribute);
                                        if (o_raw != null) {
                                            if (o_raw.toString().matches(param.value().replace("*", ".*"))) {
                                                if (param.isNegative()) {
                                                    selectedForNext = false;
                                                }
                                            } else {
                                                if (!param.isNegative()) {
                                                    selectedForNext = false;
                                                }
                                            }
                                        } else {
                                            if (!param.isNegative() && !param.value().equals("null")) {
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
                    final List<KObject> childSelected = new ArrayList<KObject>();
                    if (extractedQuery.subQuery == null || extractedQuery.subQuery.isEmpty()) {
                        childSelected.add(root);
                        callback.on(nextGeneration.toArray(new KObject[nextGeneration.size()]));
                    } else {
                        //Recursive call
                        Helper.forall(nextGeneration.toArray(new KObject[nextGeneration.size()]), new CallBackChain<KObject>() {
                            @Override
                            public void on(KObject kObject, Callback<Throwable> next) {
                                select(kObject, extractedQuery.subQuery, new Callback<KObject[]>() {
                                    @Override
                                    public void on(KObject[] kObjects) {
                                        childSelected.addAll(childSelected);
                                    }
                                });
                            }
                        }, new Callback<Throwable>() {
                            @Override
                            public void on(Throwable throwable) {
                                callback.on(childSelected.toArray(new KObject[childSelected.size()]));
                            }
                        });
                    }
                }
            });
        }

    }

}
