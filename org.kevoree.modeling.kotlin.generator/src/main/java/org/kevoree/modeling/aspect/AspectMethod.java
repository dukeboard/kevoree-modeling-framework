package org.kevoree.modeling.aspect;

import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 21/08/13
 * Time: 19:34
 */
public class AspectMethod {

    public String name;

    public List<AspectParam> params = new ArrayList<AspectParam>();

    public String returnType;

    public Integer startOffset = -1;

    public Integer endOffset = -1;

    public Boolean privateMethod = false;

    @Override
    public String toString() {
        StringBuffer buffer = new StringBuffer();
        buffer.append(name + "(");
        boolean isFirst = true;
        for (AspectParam p : params) {
            if (!isFirst) {
                buffer.append(",");
            }
            buffer.append(p.toString());
            isFirst = false;
        }
        buffer.append(")");
        if (returnType != null && returnType != "null") {
            buffer.append(":" + returnType);
        }
        return buffer.toString();
    }


}
