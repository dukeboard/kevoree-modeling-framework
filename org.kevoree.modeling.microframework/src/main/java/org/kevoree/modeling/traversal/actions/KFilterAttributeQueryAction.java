package org.kevoree.modeling.traversal.actions;

import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.KObject;
import org.kevoree.modeling.abs.AbstractKObject;
import org.kevoree.modeling.memory.struct.map.StringHashMap;
import org.kevoree.modeling.memory.struct.map.StringHashMapCallBack;
import org.kevoree.modeling.meta.MetaAttribute;
import org.kevoree.modeling.traversal.KTraversalAction;
import org.kevoree.modeling.traversal.selector.KQueryParam;

public class KFilterAttributeQueryAction implements KTraversalAction {

    private KTraversalAction _next;

    private String _attributeQuery;

    public KFilterAttributeQueryAction(String p_attributeQuery) {
        this._attributeQuery = p_attributeQuery;
    }

    @Override
    public void chain(KTraversalAction p_next) {
        _next = p_next;
    }

    @Override
    public void execute(KObject[] p_inputs) {
        if (p_inputs == null || p_inputs.length == 0) {
            _next.execute(p_inputs);
            return;
        } else {
            boolean[] selectedIndexes = new boolean[p_inputs.length];
            int nbSelected = 0;
            for (int i = 0; i < p_inputs.length; i++) {
                try {
                    AbstractKObject loopObj = (AbstractKObject) p_inputs[i];
                    if (_attributeQuery == null) {
                        selectedIndexes[i] = true;
                        nbSelected++;
                    } else {
                        StringHashMap<KQueryParam> params = buildParams(_attributeQuery);
                        final boolean[] selectedForNext = {true};
                        params.each(new StringHashMapCallBack<KQueryParam>() {
                            @Override
                            public void on(String key, KQueryParam param) {
                                for (int j = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                    MetaAttribute metaAttribute = loopObj.metaClass().metaAttributes()[j];
                                    if (metaAttribute.metaName().matches(param.name())) {
                                        Object o_raw = loopObj.get(metaAttribute);
                                        if (o_raw != null) {
                                            if (param.value().equals("null")) {
                                                if (!param.isNegative()) {
                                                    selectedForNext[0] = false;
                                                }
                                            } else if (o_raw.toString().matches(param.value())) {
                                                if (param.isNegative()) {
                                                    selectedForNext[0] = false;
                                                }
                                            } else {
                                                if (!param.isNegative()) {
                                                    selectedForNext[0] = false;
                                                }
                                            }
                                        } else {
                                            if (param.value().equals("null") || param.value().equals("*")) {
                                                if (param.isNegative()) {
                                                    selectedForNext[0] = false;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        if (selectedForNext[0]) {
                            selectedIndexes[i] = true;
                            nbSelected++;
                        }
                    }

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            KObject[] nextStepElement = new KObject[nbSelected];
            int inserted = 0;
            for (int i = 0; i < p_inputs.length; i++) {
                if (selectedIndexes[i]) {
                    nextStepElement[inserted] = p_inputs[i];
                    inserted++;
                }
            }
            _next.execute(nextStepElement);
        }
    }

    private StringHashMap<KQueryParam> buildParams(String p_paramString) {
        StringHashMap<KQueryParam> params = new StringHashMap<KQueryParam>(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);
        int iParam = 0;
        int lastStart = iParam;
        while (iParam < p_paramString.length()) {
            if (p_paramString.charAt(iParam) == ',') {
                String p = p_paramString.substring(lastStart, iParam).trim();
                if (!p.equals("") && !p.equals("*")) {
                    if (p.endsWith("=")) {
                        p = p + "*";
                    }
                    String[] pArray = p.split("=");
                    KQueryParam pObject;
                    if (pArray.length > 1) {
                        String paramKey = pArray[0].trim();
                        boolean negative = paramKey.endsWith("!");
                        pObject = new KQueryParam(paramKey.replace("!", "").replace("*", ".*"), pArray[1].trim().replace("*", ".*"), negative);
                        params.put(pObject.name(), pObject);
                    }
                }
                lastStart = iParam + 1;
            }
            iParam = iParam + 1;
        }
        String lastParam = p_paramString.substring(lastStart, iParam).trim();
        if (!lastParam.equals("") && !lastParam.equals("*")) {
            if (lastParam.endsWith("=")) {
                lastParam = lastParam + "*";
            }
            String[] pArray = lastParam.split("=");
            KQueryParam pObject;
            if (pArray.length > 1) {
                String paramKey = pArray[0].trim();
                boolean negative = paramKey.endsWith("!");
                pObject = new KQueryParam(paramKey.replace("!", "").replace("*", ".*"), pArray[1].trim().replace("*", ".*"), negative);
                params.put(pObject.name(), pObject);
            }
        }
        return params;
    }

}
