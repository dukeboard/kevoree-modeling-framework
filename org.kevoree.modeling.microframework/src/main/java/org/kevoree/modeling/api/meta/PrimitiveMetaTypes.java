package org.kevoree.modeling.api.meta;

import org.kevoree.modeling.api.KMetaType;
import org.kevoree.modeling.api.abs.AbstractKDataType;

public class PrimitiveMetaTypes {

    public static final KMetaType STRING = new AbstractKDataType("STRING", false) {
        @Override
        public String save(Object src) {
            if(src != null){
                return src.toString();
            }
            return "";
        }

        @Override
        public Object load(String payload) {
            return payload;
        }
    };

    public static final KMetaType LONG = new AbstractKDataType("LONG", false) {
        @Override
        public String save(Object src) {
            if(src != null){
                return src.toString();
            }
            return "";
        }

        @Override
        public Object load(String payload) {
            return Long.parseLong(payload);
        }
    };
    public static final KMetaType INT = new AbstractKDataType("INT", false) {
        @Override
        public String save(Object src) {
            if(src != null){
                return src.toString();
            }
            return "";
        }

        @Override
        public Object load(String payload) {
            return Integer.parseInt(payload);
        }
    };
    public static final KMetaType BOOL = new AbstractKDataType("BOOL", false) {
        @Override
        public String save(Object src) {
            if(src != null){
                return src.toString();
            }
            return "";
        }

        @Override
        public Object load(String payload) {
            return payload.equals("true");
        }
    };
    public static final KMetaType SHORT = new AbstractKDataType("SHORT", false) {
        @Override
        public String save(Object src) {
            if(src != null){
                return src.toString();
            }
            return "";
        }

        @Override
        public Object load(String payload) {
            return Short.parseShort(payload);
        }
    };
    public static final KMetaType DOUBLE = new AbstractKDataType("DOUBLE", false) {
        @Override
        public String save(Object src) {
            if(src != null){
                return src.toString();
            }
            return "";
        }

        @Override
        public Object load(String payload) {
            return Double.parseDouble(payload);
        }
    };
    public static final KMetaType FLOAT = new AbstractKDataType("FLOAT", false) {
        @Override
        public String save(Object src) {
            if(src != null){
                return src.toString();
            }
            return "";
        }

        @Override
        public Object load(String payload) {
            return Float.parseFloat(payload);
        }
    };
}