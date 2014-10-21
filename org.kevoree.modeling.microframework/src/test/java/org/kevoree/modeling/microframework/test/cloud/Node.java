package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.meta.MetaReference;

/**
 * Created by duke on 10/9/14.
 */
public interface Node extends KObject<Node, CloudView> {

    /* Reflexive API Attributes */
    public enum METAATTRIBUTES implements MetaAttribute {

        NAME("name", 2, false, true, MetaType.String),
        VALUE("value", 3, true, false, MetaType.String); //lexicographic order

        private String name;

        private int index;

        private boolean learned;

        private boolean key;

        private MetaType metaType;

        public MetaType metaType() {
            return metaType;
        }

        public MetaClass origin() {
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

        METAATTRIBUTES(String name, int index, boolean learned, boolean key, MetaType metaType) {
            this.name = name;
            this.index = index;
            this.learned = learned;
            this.key = key;
            this.metaType = metaType;
        }
    }

    public enum METAREFERENCES implements MetaReference {

        CHILDREN("children", 4, true, false, CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE, null),
        ELEMENT("element", 5, true, true, CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT, null);

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

        public MetaClass origin() {
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

    public enum METAOPERATION implements MetaOperation {

        TRIGGER("trigger", 6);

        private String name;

        private int index;

        public int index() {
            return index;
        }

        public String metaName() {
            return name;
        }

        public MetaClass origin() {
            return CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE;
        }

        METAOPERATION(String name, int index) {
            this.name = name;
            this.index = index;
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

    //analog to func trigger(param:String) : String in .mm
    public void trigger(String param, Callback<String> callback);

}
