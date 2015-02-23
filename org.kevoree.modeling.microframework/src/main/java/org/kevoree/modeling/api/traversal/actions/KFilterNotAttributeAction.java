package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.traversal.KTraversalAction;

import java.util.HashSet;
import java.util.Set;

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
    public void execute(KObject[] p_inputs) {
        if (p_inputs == null || p_inputs.length == 0) {
            _next.execute(p_inputs);
        } else {
            KView currentView = p_inputs[0].view();
            Set<KObject> nextStep = new HashSet<KObject>();
            for (int i = 0; i < p_inputs.length; i++) {
                try {
                    AbstractKObject loopObj = (AbstractKObject) p_inputs[i];
                    KCacheEntry raw = currentView.universe().model().storage().entry(loopObj, AccessMode.READ);
                    if (raw != null) {
                        if (_attribute == null) {
                            if (_expectedValue == null) {
                                nextStep.add(loopObj);
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
                                    nextStep.add(loopObj);
                                }
                            }
                        } else {
                            MetaAttribute translatedAtt = loopObj.internal_transpose_att(_attribute);
                            if (translatedAtt != null) {
                                Object resolved = raw.get(translatedAtt.index());
                                if (_expectedValue == null) {
                                    if (resolved != null) {
                                        nextStep.add(loopObj);
                                    }
                                } else {
                                    if (resolved == null) {
                                        if (!_expectedValue.toString().equals("*")) {
                                            nextStep.add(loopObj);
                                        }
                                    } else {

                                        if (resolved.equals(_expectedValue)) {
                                            //noop
                                        } else {
                                            if (resolved.toString().matches(_expectedValue.toString().replace("*", ".*"))) {
                                                //noop
                                            } else {
                                                nextStep.add(loopObj);
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
            _next.execute(nextStep.toArray(new KObject[nextStep.size()]));
        }
    }

}
