package org.kevoree.modeling.api.data.cdn;

/**
 * Created by gregory.nain on 24/02/15.
 */
public class AtomicOperationFactory {

    public static final int PREFIX_MUTATE_OPERATION = 0;


    public static AtomicOperation getMutatePrefixOperation() {
        return new AtomicOperation() {

            @Override
            public int getOperationKey() {
                return PREFIX_MUTATE_OPERATION;
            }

            @Override
            public String mutate(String previous) {
                try {
                    Short previousPrefix;
                    if (previous != null) {
                        previousPrefix = Short.parseShort(previous);
                    } else {
                        previousPrefix = Short.parseShort("0");
                    }
                    if (previousPrefix == Short.MAX_VALUE) {
                        return "" + Short.MIN_VALUE;
                    } else {
                        return "" + (previousPrefix + 1);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    return "" + Short.MIN_VALUE;
                }
            }
        };
    }

    public static AtomicOperation getOperationWithKey(int key) {
        switch (key) {
            case PREFIX_MUTATE_OPERATION: return getMutatePrefixOperation();
        }
        return null;
    }



}
