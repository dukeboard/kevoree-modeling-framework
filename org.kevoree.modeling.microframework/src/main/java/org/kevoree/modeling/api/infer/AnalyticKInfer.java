package org.kevoree.modeling.api.infer;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KInferState;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.abs.AbstractKObjectInfer;
import org.kevoree.modeling.api.infer.states.AnalyticKInferState;
import org.kevoree.modeling.api.infer.states.DoubleArrayKInferState;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.time.rbtree.LongRBTree;

/**
 * This class is a basic live learning of the average of a field.
 * Training this class does not take any features.
 * it takes only results (the field to be learned).
 * The state is an accumulator (Sum of values) and a counter (number of valeus).
 * The prediction is a a fixed result of the average value learned.
 * It is calculated by dividing the accumulator by the counter;
 * Created by assaad on 10/02/15.
 */
public class AnalyticKInfer extends AbstractKObjectInfer {

    public AnalyticKInfer(KView p_view, long p_uuid, TimeTree p_timeTree, LongRBTree p_universeTree) {
        super(p_view, p_uuid, p_timeTree,p_universeTree, null);
    }

    @Override
    public void train(Object[][] trainingSet, Object[] expectedResultSet, Callback<Throwable> callback) {
        AnalyticKInferState currentState = (AnalyticKInferState) modifyState();

        for (int i = 0; i < expectedResultSet.length; i++) {
            double value=Double.parseDouble(expectedResultSet[i].toString());
            currentState.train(value);
        }
    }

    @Override
    public Object infer(Object[] features) {
        AnalyticKInferState currentState = (AnalyticKInferState) readOnlyState();
        return currentState.getAverage();
    }

    @Override
    public Object accuracy(Object[][] testSet, Object[] expectedResultSet) {
        return null;
    }

    @Override
    public void clear() {
        AnalyticKInferState currentState = (AnalyticKInferState) modifyState();
        currentState.clear();
    }

    @Override
    public KInferState createEmptyState() {
        return new AnalyticKInferState();
    }

}
