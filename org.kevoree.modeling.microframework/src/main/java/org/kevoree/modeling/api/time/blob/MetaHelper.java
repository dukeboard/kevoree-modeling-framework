package org.kevoree.modeling.api.time.blob;


import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.KObject;

import java.util.HashMap;
import java.util.HashSet;
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
            buffer.append(key.path());
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
    public static Map<KObject, Set<String>> unserialize(String p, KView factory) {
        HashMap<KObject, Set<String>> result = new HashMap<KObject, Set<String>>();
        String[] lines = p.split(sep);
        for (int i=0;i<lines.length;i++) {
            String[] elems = lines[i].split(sep2);
            if (elems.length > 1) {
                HashSet<String> payload = new HashSet<String>();
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