package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.meta.MetaReference;

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

        @Override
        public MetaAttribute[] metaAttributes() {
            if (_index == 0) {
                return Node.METAATTRIBUTES.values();
            }
            if (_index == 1) {
                return Element.METAATTRIBUTES.values();
            }
            return new MetaAttribute[0];
        }

        @Override
        public MetaReference[] metaReferences() {
            if (_index == 0) {
                return Node.METAREFERENCES.values();
            }
            return new MetaReference[0];
        }

        @Override
        public MetaOperation[] metaOperations() {
            if (_index == 0) {
                return Node.METAOPERATIONS.values();
            }
            return new MetaOperation[0];
        }

        @Override
        public MetaAttribute metaAttribute(String name) {
            MetaAttribute[] atts = metaAttributes();
            for (int i = 0; i < atts.length; i++) {
                if (atts[i].metaName().equals(name)) {
                    return atts[i];
                }
            }
            return null;
        }

        @Override
        public MetaReference metaReference(String name) {
            MetaReference[] refs = metaReferences();
            for (int i = 0; i < refs.length; i++) {
                if (refs[i].metaName().equals(name)) {
                    return refs[i];
                }
            }
            return null;
        }

        @Override
        public MetaOperation metaOperation(String name) {
            MetaOperation[] ops = metaOperations();
            for (int i = 0; i < ops.length; i++) {
                if (ops[i].metaName().equals(name)) {
                    return ops[i];
                }
            }
            return null;
        }

    }

    public Node createNode();

    public Element createElement();

}
