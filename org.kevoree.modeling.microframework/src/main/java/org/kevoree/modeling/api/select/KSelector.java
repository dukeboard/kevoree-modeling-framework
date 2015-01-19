package org.kevoree.modeling.api.select;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.data.AccessMode;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by duke on 10/24/14.
 */
public class KSelector {

    public static void select(final KView view, final KObject[] roots, String query, final Callback<KObject[]> callback) {
        if (callback == null) {
            return;
        }
        final KQuery extractedQuery = KQuery.extractFirstQuery(query);
        if (extractedQuery == null) {
            callback.on(new KObject[0]);
        } else {
            String relationNameRegex = extractedQuery.relationName.replace("*", ".*");
            Set<Long> collected = new HashSet<Long>();
            for (int k = 0; k < roots.length; k++) {
                KObject root = roots[k];
                Object[] raw = root.dimension().model().storage().raw(root, AccessMode.READ);
                if (raw != null) {
                    for (int i = 0; i < root.metaClass().metaReferences().length; i++) {
                        MetaReference reference = root.metaClass().metaReferences()[i];
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
                }
            }
            view.lookupAll(collected.toArray(new Long[collected.size()]), new Callback<KObject[]>() {
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
                            String[] paramKeys = extractedQuery.params.keySet().toArray(new String[extractedQuery.params.keySet().size()]);
                            for (int h = 0; h < paramKeys.length; h++) {
                                KQueryParam param = extractedQuery.params.get(paramKeys[h]);
                                for (int j = 0; j < resolved.metaClass().metaAttributes().length; j++) {
                                    MetaAttribute metaAttribute = resolved.metaClass().metaAttributes()[j];
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
                    KObject[] nextArr = nextGeneration.toArray(new KObject[nextGeneration.size()]);
                    if (extractedQuery.subQuery == null || extractedQuery.subQuery.isEmpty()) {
                        callback.on(nextArr);
                    } else {
                        select(view, nextArr, extractedQuery.subQuery, callback);
                    }
                }
            });
        }
    }

}
