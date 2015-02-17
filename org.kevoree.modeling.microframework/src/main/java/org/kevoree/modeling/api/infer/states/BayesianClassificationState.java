package org.kevoree.modeling.api.infer.states;

import org.kevoree.modeling.api.KInferState;
import org.kevoree.modeling.api.infer.states.Bayesian.BayesianSubstate;
import org.kevoree.modeling.api.infer.states.Bayesian.EnumSubstate;
import org.kevoree.modeling.api.infer.states.Bayesian.GaussianSubState;

/**
 * Created by assaad on 17/02/15.
 */
public class BayesianClassificationState extends KInferState{
    private BayesianSubstate[][] states; //BayesianSubstate[numOfClasses+1][numOfFeatures];
    private EnumSubstate classStats;
    private int numOfFeatures;
    private int numOfClasses;

    public void initialize (Object[] metaFeatures, Object MetaClassification){
        //TODO write cases

        numOfFeatures=metaFeatures.length;
        numOfClasses=0; //TODO fill the number of possible classes

        states=new BayesianSubstate[numOfClasses+1][numOfFeatures];
        classStats=new EnumSubstate();
        classStats.initialize(numOfClasses);

        for(int i=0;i<numOfFeatures;i++){
            //TODO according to meta-information get the attribute type here
            /*For all classes and total, create sub states
            Case 1: Gaussian
            for(int j=0;j<numOfClasses+1;j++){
                states[j][i] = new GaussianSubState();
            }
            Case 2: Enum
            for(int j=0;j<numOfClasses+1;j++){
                states[j][i] = new EnumSubstate();
                states[j][i].initialize(numOfPossibleFields);
            }
            ...*/
        }

    }

    public int predict(Object[] features){
        double temp;
        int prediction=-1;
        double max=0;

        for(int i=0;i<numOfClasses;i++){
            temp=classStats.calculateProbability(i);
            for(int j=0;j<numOfFeatures;j++) {
                temp= temp*states[i][j].calculateProbability(features[j]);
            }
            if(temp>=max){
                max=temp;
                prediction=i;
            }
        }
        return prediction;
    }

    public void train(Object[] features, int classNum){
        for(int i=0;i<numOfFeatures;i++){
            states[classNum][i].train(features[i]);     //Train the class
            states[numOfClasses][i].train(features[i]); //Train the total
        }
        classStats.train(classNum);

    }


    @Override
    public String save() {
        return null;
    }

    @Override
    public void load(String payload) {

    }

    @Override
    public boolean isDirty() {
        return false;
    }

    @Override
    public KInferState cloneState() {
        return null;
    }
}
