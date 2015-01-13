package org.kevoree.modeling.api.promise.actions;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.data.AccessMode;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.promise.KTraversalAction;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by duke on 19/12/14.
 */
public class KFilterAttributeAction implements KTraversalAction {

    private KTraversalAction _next;

    private MetaAttribute _attribute;

    private Object _expectedValue;

    public KFilterAttributeAction(MetaAttribute p_attribute, Object p_expectedValue) {
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
            return;
        } else {
            KView currentView = p_inputs[0].view();
            List<KObject> nextStep = new ArrayList<KObject>();
            for (int i = 0; i < p_inputs.length; i++) {
                try {
                    AbstractKObject loopObj = (AbstractKObject) p_inputs[i];
                    Object[] raw = currentView.dimension().universe().storage().raw(loopObj, AccessMode.READ);
                    if (raw != null) {
                        if (_attribute == null) {
                            if (_expectedValue == null) {
                                nextStep.add(loopObj);
                            } else {
                                for (int j = 0; j < loopObj.metaClass().metaAttributes().length; j++) {
                                    MetaAttribute ref = loopObj.metaClass().metaAttributes()[j];
                                    Object resolved = raw[ref.index()];
                                    if (resolved == null) {
                                        if (_expectedValue.toString().equals("*")) {
                                            nextStep.add(loopObj);
                                        } else {
                                            //drop
                                        }
                                    } else {
                                        if (resolved == _expectedValue) {
                                            nextStep.add(loopObj);
                                        } else {
                                            if (resolved.toString().matches(_expectedValue.toString().replace("*", ".*"))) {
                                                nextStep.add(loopObj);
                                            } else {
                                                //drop
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            MetaAttribute translatedAtt = loopObj.internal_transpose_att(_attribute);
                            if (translatedAtt != null) {
                                Object resolved = raw[translatedAtt.index()];
                                if (_expectedValue == null) {
                                    nextStep.add(loopObj);
                                } else {
                                    if (resolved == null) {
                                        if (_expectedValue.toString().equals("*")) {
                                            nextStep.add(loopObj);
                                        } else {
                                            //drop
                                        }
                                    } else {
                                        if (resolved == _expectedValue) {
                                            nextStep.add(loopObj);
                                        } else {
                                            if (resolved.toString().matches(_expectedValue.toString().replace("*", ".*"))) {
                                                nextStep.add(loopObj);
                                            } else {
                                                //drop
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        System.err.println("WARN: Empty KObject "+loopObj.uuid());
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            _next.execute(nextStep.toArray(new KObject[nextStep.size()]));
        }
    }

}
