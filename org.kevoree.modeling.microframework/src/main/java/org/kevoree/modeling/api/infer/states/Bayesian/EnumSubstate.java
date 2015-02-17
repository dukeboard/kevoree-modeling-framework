package org.kevoree.modeling.api.infer.states.Bayesian;

/**
 * Created by assaad on 17/02/15.
 */
public class EnumSubstate extends BayesianSubstate{

    private int[] counter;
    private int total=0;

    public void initialize(int number){
        counter=new int[number];
    }




    @Override
    public double calculateProbability(Object feature) {
        Integer res=(Integer) feature;
        double p=counter[res];
        if(total!=0){
            return p/total;
        }
        else {
            return 0;
        }
    }

    @Override
    public void train(Object feature) {
        Integer res=(Integer) feature;
        counter[res]++;
        total++;
    }

    @Override
    public String save(String separator) {
        if(counter==null||counter.length==0){
            return "";
        }
        StringBuilder sb=new StringBuilder();
        for(int i=0;i<counter.length;i++){
            sb.append(counter[i]+separator);
        }
        return sb.toString();
    }

    @Override
    public void load(String payload, String separator) {
        String[]res=payload.split(separator);
        counter=new int[res.length];
        total=0;
        for(int i=0;i<res.length;i++){
            counter[i]=Integer.parseInt(res[i]);
            total+=counter[i];
        }

    }

    //TODO ugly clone to re-implement
    @Override
    public BayesianSubstate cloneState() {
        EnumSubstate cloned =new EnumSubstate();
        cloned.load(save("/"),"/");
        return cloned;
    }
}
