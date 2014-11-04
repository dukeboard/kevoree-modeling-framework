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

        private String _name;

        private int _index;

        public int index() {
            return _index;
        }

        public String metaName() {
            return _name;
        }

        METACLASSES(String name, int index) {
            this._name = name;
            this._index = index;
        }

    }

    public Node createNode();

    public Element createElement();

}
