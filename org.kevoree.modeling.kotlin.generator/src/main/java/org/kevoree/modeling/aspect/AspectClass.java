package org.kevoree.modeling.aspect;

import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 21/08/13
 * Time: 10:17
 */
public class AspectClass {

    public String name;

    public String packageName;

    public String aspectedClass;

    public List<String> methods = new ArrayList<String>();

    @Override
    public String toString() {
        StringBuffer buffer = new StringBuffer();
        buffer.append("Aspect " + packageName + "." + name +" for "+ aspectedClass + " [");
        boolean isFirst = true;
        for (String me : methods) {
            if (!isFirst) {
                buffer.append(",");
            }
            buffer.append(me);
            isFirst = false;
        }
        buffer.append("]");
        return buffer.toString();
    }

}
