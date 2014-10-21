package org.kevoree.modeling.api.time.impl;

import java.util.HashSet;

/**
 * Created by duke on 6/4/14.
 */

/*
 *  domainKey : path
  * */

public class EntitiesMeta {

    boolean isDirty = false;

    private static final String sep = "#";

    HashSet<String> list = new HashSet<String>();

    @Override
    public String toString() {
        StringBuilder stringBuilder = new StringBuilder();
        boolean isFirst = true;
        for (String p : list) {
            if (!isFirst) {
                stringBuilder.append(sep);
            }
            stringBuilder.append(p);
            isFirst = false;
        }
        return stringBuilder.toString();
    }

    public void load(String payload) {
        if (payload.equals("")) {
            return;
        }
        //TODO refactor this code for efficiency
        String[] elements = payload.split(sep);
        for (int i = 0; i < elements.length; i++) {
            list.add(elements[i]);
        }
        isDirty = false;
    }

}
