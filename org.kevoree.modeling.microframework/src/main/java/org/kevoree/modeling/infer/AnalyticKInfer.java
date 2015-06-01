package org.kevoree.modeling.infer;

import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KInferState;
import org.kevoree.modeling.abs.AbstractKObjectInfer;
import org.kevoree.modeling.memory.KDataManager;
import org.kevoree.modeling.infer.states.AnalyticKInferState;
import org.kevoree.modeling.meta.MetaClass;

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

    public AnalyticKInfer(long p_universe, long p_time, long p_uuid, MetaClass p_metaClass, KDataManager p_manager) {
        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
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
