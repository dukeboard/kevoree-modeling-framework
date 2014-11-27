package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaType;
import org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation;
import org.kevoree.modeling.api.extrapolation.Extrapolation;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.extrapolation.PolynomialExtrapolation;

/**
 * Created by duke on 10/9/14.
 */
public interface Element extends KObject<Element, CloudView> {

    public enum METAATTRIBUTES implements MetaAttribute {

        NAME("name", 5, 5, true, MetaType.STRING, DiscreteExtrapolation.instance()),
        VALUE("value", 6, 5, false, MetaType.DOUBLE, PolynomialExtrapolation.instance()); //lexicographic order

        private String _name;

        private int _index;

        private double _precision;

        private boolean _key;

        private MetaType _metaType;

        public MetaType metaType() {
            return _metaType;
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

        public MetaClass origin() {
            return CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT;
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

    public String getName();

    public Element setName(String name);

    public Double getValue();

    public Element setValue(Double name);

}
