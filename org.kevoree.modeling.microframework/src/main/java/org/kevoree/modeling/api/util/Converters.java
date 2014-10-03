package org.kevoree.modeling.api.util;


import java.io.ByteArrayInputStream;
import java.util.List;

/**
 * Created by duke on 10/3/14.
 */
public class Converters {

    public String convFlatAtt(Object value) {
        if (value == null) {
            return null;
        }
        if (value instanceof List) {
            boolean isF = true;
            StringBuilder buffer = new StringBuilder();
            for (Object v : (List) value) {
                if (!isF) {
                    buffer.append("$");
                }
                buffer.append(v.toString());
                isF = false;
            }
            return buffer.toString();
        } else {
            return value.toString();
        }
    }

    public String[] convAttFlat(String value) {
        return value.split("$");
    }

    public char toChar(byte b) {
        return (char) b;
    }

    public byte fromChar(char c) {
        return (byte) c;
    }

    public ByteArrayInputStream byteArrayInputStreamFromString(String s) {
        return new ByteArrayInputStream(s.getBytes());
    }


}
