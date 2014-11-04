package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaType;
import org.kevoree.modeling.api.Extrapolations;
import org.kevoree.modeling.api.strategy.ExtrapolationStrategy;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;

/**
 * Created by duke on 10/9/14.
 */
public interface Element extends KObject<Element, CloudView> {

    public enum METAATTRIBUTES implements MetaAttribute {

        NAME("name", 2, 5, true, MetaType.STRING, Extrapolations.DISCRETE.strategy()),
        VALUE("value", 3, 5, false, MetaType.LONG, Extrapolations.POLYNOMIAL.strategy()); //lexicographic order

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
            this._name = name;
            this._index = index;
            this._precision = precision;
            this._key = key;
            this._metaType = metaType;
            this.extrapolationStrategy = extrapolationStrategy;
        }

    }

    public String getName();

    public Element setName(String name);

    public Long getValue();

    public Element setValue(Long name);

}
