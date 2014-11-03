package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.*;
import org.kevoree.modeling.api.Extrapolations;
import org.kevoree.modeling.api.strategy.ExtrapolationStrategy;

/**
 * Created by duke on 10/9/14.
 */
public interface Node extends KObject<Node, CloudView> {

    /* Reflexive API Attributes */
    public enum METAATTRIBUTES implements MetaAttribute {

        NAME("name", 2, 5, true, MetaType.STRING, Extrapolations.DISCRETE.strategy()),
        VALUE("value", 3, 5, false, MetaType.STRING, Extrapolations.DISCRETE.strategy()); //lexicographic order

        private String name;

        private int index;

        private double precision;

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

        public double precision() {
            return precision;
        }

        public boolean key() {
            return key;
        }

        private ExtrapolationStrategy extrapolationStrategy;

        @Override
        public ExtrapolationStrategy strategy() {
            return extrapolationStrategy;
        }

        @Override
        public void setExtrapolationStrategy(ExtrapolationStrategy extrapolationStrategy) {
            this.extrapolationStrategy = extrapolationStrategy;
        }

        METAATTRIBUTES(String name, int index, double precision, boolean key, MetaType metaType, ExtrapolationStrategy extrapolationStrategy) {
            this.name = name;
            this.index = index;
            this.precision = precision;
            this.key = key;
            this.metaType = metaType;
            this.extrapolationStrategy = extrapolationStrategy;
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

    //analog to func trigger(param:STRING) : STRING in .mm
    public void trigger(String param, Callback<String> callback);

}
