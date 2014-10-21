package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;

/**
 * Created by duke on 10/9/14.
 */
public interface Element extends KObject<Element, CloudView> {

    public enum METAATTRIBUTES implements MetaAttribute {

        NAME("name", 2, false, true, MetaType.STRING),
        VALUE("value", 3, true, false, MetaType.LONG); //lexicographic order

        private String name;

        private int index;

        private boolean learned;

        private boolean key;

        private MetaType metaType;

        public MetaType metaType() {
            return metaType;
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

        public MetaClass origin(){
            return CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT;
        }

        METAATTRIBUTES(String name, int index, boolean learned, boolean key,MetaType metaType) {
            this.name = name;
            this.index = index;
            this.learned = learned;
            this.key = key;
            this.metaType = metaType;
        }

    }

    public String getName();

    public Element setName(String name);

    public Long getValue();

    public Element setValue(Long name);

}
