package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;

/**
 * Created by duke on 10/9/14.
 */
public interface Node extends KObject<Node, CloudView> {

    /* Reflexive API Attributes */
    public enum METAATTRIBUTES implements MetaAttribute {

        NAME("name", 0, false, true),
        VALUE("value", 1, true, false); //lexicographic order

        private String name;

        private int index;

        private boolean learned;

        private boolean key;

        public MetaClass origin(){
            return CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE;
        }

        public int index() {
            return index;
        }

        public String metaName() {
            return name;
        }

        public boolean learned() {
            return learned;
        }

        public boolean key() {
            return key;
        }

        METAATTRIBUTES(String name, int index, boolean learned, boolean key) {
            this.name = name;
            this.index = index;
            this.learned = learned;
            this.key = key;
        }
    }

    public enum METAREFERENCES implements MetaReference {

        CHILDREN("children", 2, true, false, CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE, null),
        ELEMENT("element", 3, true, true, CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT, null);

        private String name;

        private int index;

        private boolean contained;

        private boolean single;

        public boolean single() {
            return single;
        }

        private MetaClass metaType;

        public MetaClass metaType() {
            return metaType;
        }

        private MetaReference opposite;

        public MetaReference opposite() {
            return opposite;
        }

        public int index() {
            return index;
        }

        public String metaName() {
            return name;
        }

        public boolean contained() {
            return contained;
        }

        public MetaClass origin(){
            return CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE;
        }

        METAREFERENCES(String name, int index, boolean contained, boolean single, MetaClass metaType, MetaReference opposite) {
            this.name = name;
            this.index = index;
            this.contained = contained;
            this.single = single;
            this.metaType = metaType;
            this.opposite = opposite;
        }
    }

    public String getName();

    public Node setName(String name);

    public String getValue();

    public Node setValue(String name);

    public void addChildren(Node obj);

    public void removeChildren(Node obj);

    public void eachChildren(Callback<Node> callback, Callback<Throwable> end);

    public void setElement(Element obj);

    public void getElement(Callback<Element> obj);
}
