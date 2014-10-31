package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.meta.MetaClass;

/**
 * Created by duke on 10/9/14.
 */
public interface CloudView extends KView {

    public enum METACLASSES implements MetaClass {

        ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE("org.kevoree.modeling.microframework.test.cloud.Node", 0),
        ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT("org.kevoree.modeling.microframework.test.cloud.Element", 1);

        private String name;

        private int index;

        public int index() {
            return index;
        }

        public String metaName() {
            return name;
        }

        METACLASSES(String name, int index) {
            this.name = name;
            this.index = index;
        }

    }

    public Node createNode();

    public Element createElement();

}
