package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.traversal.KTraversalAction;
import org.kevoree.modeling.api.traversal.selector.KQueryParam;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 01/02/15.
 */
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
                        Map<String, KQueryParam> params = buildParams(_attributeQuery);
                        boolean selectedForNext = true;
                        String[] paramKeys = params.keySet().toArray(new String[params.keySet().size()]);
                        for (int h = 0; h < paramKeys.length; h++) {
                            KQueryParam param = params.get(paramKeys[h]);
                            for (int j = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                MetaAttribute metaAttribute = loopObj.metaClass().metaAttributes()[j];
                                if (metaAttribute.metaName().matches(param.name())) {
                                    Object o_raw = loopObj.get(metaAttribute);
                                    if (o_raw != null) {
                                        if (param.value().equals("null")) {
                                            if (!param.isNegative()) {
                                                selectedForNext = false;
                                            }
                                        } else if (o_raw.toString().matches(param.value())) {
                                            if (param.isNegative()) {
                                                selectedForNext = false;
                                            }
                                        } else {
                                            if (!param.isNegative()) {
                                                selectedForNext = false;
                                            }
                                        }
                                    } else {
                                        if (param.value().equals("null") || param.value().equals("*")) {
                                            if (param.isNegative()) {
                                                selectedForNext = false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (selectedForNext) {
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

    private Map<String, KQueryParam> buildParams(String p_paramString) {
        Map<String, KQueryParam> params = new HashMap<String, KQueryParam>();
        int iParam = 0;
        int lastStart = iParam;
        while (iParam < p_paramString.length()) {
            if (p_paramString.charAt(iParam) == ',') {
                String p = p_paramString.substring(lastStart, iParam).trim();
                if (p.equals("") && !p.equals("*")) {
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
