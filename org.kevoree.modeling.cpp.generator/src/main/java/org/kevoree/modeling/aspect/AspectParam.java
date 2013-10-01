package org.kevoree.modeling.aspect;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 21/08/13
 * Time: 19:35
 */
public class AspectParam {

    public String name;

    public String type;

    @Override
    public String toString() {
        return name + ":" + type;
    }

}
