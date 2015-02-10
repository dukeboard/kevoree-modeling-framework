package org.kevoree.modeling.api.infer;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KInferState;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.abs.AbstractKObjectInfer;
import org.kevoree.modeling.api.infer.states.AverageKInferState;
import org.kevoree.modeling.api.time.TimeTree;

/**
 * Created by duke on 10/02/15.
 */
public class AverageKInfer extends AbstractKObjectInfer {

    public AverageKInfer(KView p_view, long p_uuid, TimeTree p_timeTree) {
        super(p_view, p_uuid, p_timeTree, null);
    }

    @Override
    public void train(Object[][] trainingSet, Object[] expectedResultSet, Callback<Throwable> callback) {
        AverageKInferState currentState = (AverageKInferState) modifyState();
        for (int i = 0; i < expectedResultSet.length; i++) {
            currentState.setSum(currentState.getSum() + Double.parseDouble(expectedResultSet[i].toString()));
            currentState.setNb(currentState.getNb() + 1);
        }
    }

    @Override
    public Object infer(Object[] features) {
        AverageKInferState currentState = (AverageKInferState) readOnlyState();
        if (currentState.getNb() != 0) {
            return currentState.getSum() / currentState.getNb();
        } else {
            return null;
        }
    }

    @Override
    public Object accuracy(Object[][] testSet, Object[] expectedResultSet) {
        return null;
    }

    @Override
    public void clear() {
        AverageKInferState currentState = (AverageKInferState) modifyState();
        currentState.setSum(0);
        currentState.setNb(0);
    }

    @Override
    public KInferState createEmptyState() {
        return new AverageKInferState();
    }

}
