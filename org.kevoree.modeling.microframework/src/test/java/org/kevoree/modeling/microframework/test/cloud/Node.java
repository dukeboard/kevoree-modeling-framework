package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.meta.MetaType;
import org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation;
import org.kevoree.modeling.api.extrapolation.Extrapolation;

/**
 * Created by duke on 10/9/14.
 */
public interface Node extends KObject {

    /* Reflexive API Attributes */
    public enum METAATTRIBUTES implements MetaAttribute {

        NAME("name", 5, 5, true, MetaType.STRING, DiscreteExtrapolation.instance()),
        VALUE("value", 6, 5, false, MetaType.STRING, DiscreteExtrapolation.instance()); //lexicographic order

        private String _name;

        private int _index;

        private double _precision;

        private boolean _key;

        private MetaType _metaType;

        public MetaType metaType() {
            return _metaType;
        }

        public MetaClass origin() {
            return CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE;
        }

        public int index() {
            return _index;
        }

        public String metaName() {
            return _name;
        }

        public double precision() {
            return _precision;
        }

        public boolean key() {
            return _key;
        }

        private Extrapolation extrapolation;

        @Override
        public Extrapolation strategy() {
            return extrapolation;
        }

        @Override
        public void setExtrapolation(Extrapolation extrapolation) {
            this.extrapolation = extrapolation;
        }

        METAATTRIBUTES(String name, int index, double precision, boolean key, MetaType metaType, Extrapolation extrapolation) {
            this._name = name;
            this._index = index;
            this._precision = precision;
            this._key = key;
            this._metaType = metaType;
            this.extrapolation = extrapolation;
        }
    }

    public enum METAREFERENCES implements MetaReference {

        CHILDREN("children", 7, true, false, CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE, null),
        ELEMENT("element", 8, true, true, CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT, null);

        private String _name;

        private int _index;

        private boolean _contained;

        private boolean _single;

        public boolean single() {
            return _single;
        }

        private MetaClass _metaType;

        public MetaClass metaType() {
            return _metaType;
        }

        private MetaReference _opposite;

        public MetaReference opposite() {
            return _opposite;
        }

        public int index() {
            return _index;
        }

        public String metaName() {
            return _name;
        }

        public boolean contained() {
            return _contained;
        }

        public MetaClass origin() {
            return CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE;
        }

        METAREFERENCES(String name, int index, boolean contained, boolean single, MetaClass metaType, MetaReference opposite) {
            this._name = name;
            this._index = index;
            this._contained = contained;
            this._single = single;
            this._metaType = metaType;
            this._opposite = opposite;
        }
    }

    public enum METAOPERATIONS implements MetaOperation {

        TRIGGER("trigger", 9);

        private String _name;

        private int _index;

        public int index() {
            return _index;
        }

        public String metaName() {
            return _name;
        }

        public MetaClass origin() {
            return CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE;
        }

        METAOPERATIONS(String name, int index) {
            this._name = name;
            this._index = index;
        }


    }

    public String getName();

    public Node setName(String name);

    public String getValue();

    public Node setValue(String name);

    public Node addChildren(Node obj);

    public Node removeChildren(Node obj);

    public void eachChildren(Callback<Node> callback, Callback<Throwable> end);

    public Node setElement(Element obj);

    public void getElement(Callback<Element> obj);

    public void trigger(String param, Callback<String> callback);

    @Override
    public CloudView view();

    public void jump(Long time, Callback<Node> callback);

}
