package org.kevoree.modeling.api.time.impl;


import org.kevoree.modeling.api.KObject;

import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 6/12/14.
 */

public class MetaHelper {

    private static final String sep = "#";
    private static final String sep2 = "%";

    public static String serialize(Map<KObject, Set<String>> p) {
        StringBuilder buffer = new StringBuilder();
        boolean isFirst = true;
        for (KObject key : p.keySet()) {
            Set<String> v = p.get(key);
            if (!isFirst) {
                buffer.append(sep);
            }
            buffer.append(key.uuid());
            if (v.size() != 0) {
                for (String v2 : v) {
                    buffer.append(sep2);
                    buffer.append(v2);
                }
            }
            isFirst = false;
        }
        return buffer.toString();
    }

    /*
    public static Map<KObject, Set<STRING>> unserialize(STRING p, KView factory) {
        HashMap<KObject, Set<STRING>> result = new HashMap<KObject, Set<STRING>>();
        STRING[] lines = p.split(sep);
        for (int i=0;i<lines.length;i++) {
            STRING[] elems = lines[i].split(sep2);
            if (elems.length > 1) {
                HashSet<STRING> payload = new HashSet<STRING>();
                for (int j=1;j< elems.length;j++) {
                    payload.add(elems[j]);
                }
                result.put(factory.lookup(elems[0]), payload);
            }
        }
        return result;
    }
    */

}