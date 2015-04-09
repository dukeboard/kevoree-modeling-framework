package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.traversal.KTraversalAction;
import org.kevoree.modeling.api.traversal.KTraversalHistory;

/**
 * Created by duke on 19/12/14.
 */
public class KFilterNotAttributeAction implements KTraversalAction {

    private KTraversalAction _next;

    private MetaAttribute _attribute;

    private Object _expectedValue;

    public KFilterNotAttributeAction(MetaAttribute p_attribute, Object p_expectedValue) {
        this._attribute = p_attribute;
        this._expectedValue = p_expectedValue;
    }

    @Override
    public void chain(KTraversalAction p_next) {
        _next = p_next;
    }

    @Override
    public void execute(KObject[] p_inputs, KTraversalHistory p_history) {
        if (p_inputs == null || p_inputs.length == 0) {
            if (p_history != null) {
                p_history.addResult(p_inputs);
            }
            _next.execute(p_inputs, p_history);
        } else {
            boolean[] selectedIndexes = new boolean[p_inputs.length];
            int nbSelected = 0;
            for (int i = 0; i < p_inputs.length; i++) {
                try {
                    AbstractKObject loopObj = (AbstractKObject) p_inputs[i];
                    KCacheEntry raw = loopObj.universe().model().manager().entry(loopObj, AccessMode.READ);
                    if (raw != null) {
                        if (_attribute == null) {
                            if (_expectedValue == null) {
                                selectedIndexes[i] = true;
                                nbSelected++;
                            } else {
                                boolean addToNext = true;
                                for (int j = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                    MetaAttribute ref = loopObj.metaClass().metaAttributes()[j];
                                    Object resolved = raw.get(ref.index());
                                    if (resolved == null) {
                                        if (_expectedValue.toString().equals("*")) {
                                            addToNext = false;
                                        }
                                    } else {
                                        if (resolved.equals(_expectedValue)) {
                                            addToNext = false;
                                        } else {
                                            if (resolved.toString().matches(_expectedValue.toString().replace("*", ".*"))) {
                                                addToNext = false;
                                            }
                                        }
                                    }
                                }
                                if (addToNext) {
                                    selectedIndexes[i] = true;
                                    nbSelected++;
                                }
                            }
                        } else {
                            MetaAttribute translatedAtt = loopObj.internal_transpose_att(_attribute);
                            if (translatedAtt != null) {
                                Object resolved = raw.get(translatedAtt.index());
                                if (_expectedValue == null) {
                                    if (resolved != null) {
                                        selectedIndexes[i] = true;
                                        nbSelected++;
                                    }
                                } else {
                                    if (resolved == null) {
                                        if (!_expectedValue.toString().equals("*")) {
                                            selectedIndexes[i] = true;
                                            nbSelected++;
                                        }
                                    } else {

                                        if (resolved.equals(_expectedValue)) {
                                            //noop
                                        } else {
                                            if (resolved.toString().matches(_expectedValue.toString().replace("*", ".*"))) {
                                                //noop
                                            } else {
                                                selectedIndexes[i] = true;
                                                nbSelected++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        System.err.println("WARN: Empty KObject " + loopObj.uuid());
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
            if (p_history != null) {
                p_history.addResult(nextStepElement);
            }
            _next.execute(nextStepElement, p_history);
        }
    }

}
