package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaAttribute;

/**
 * Created by duke on 10/9/14.
 */
public interface Element extends KObject<Element, CloudView> {

    public enum METAATTRIBUTES implements MetaAttribute {

        NAME("name", 0, false, true),
        VALUE("value", 1, true, false); //lexicographic order

        private String name;

        private int index;

        private boolean learned;

        private boolean key;

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

    public String getName();

    public Element setName(String name);

    public String getValue();

    public Element setValue(String name);

}