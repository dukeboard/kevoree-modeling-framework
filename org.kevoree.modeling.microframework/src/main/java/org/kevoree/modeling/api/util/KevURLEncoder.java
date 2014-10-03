package org.kevoree.modeling.api.util;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by duke on 8/25/14.
 */

public class KevURLEncoder {

    private static KevURLEncoder INSTANCE = null;

    public static KevURLEncoder getINSTANCE() {
        if (INSTANCE == null) {
            INSTANCE = new KevURLEncoder();
        }
        return INSTANCE;
    }


    private static final Map<Character, Boolean> nonEscaped = new HashMap<Character, Boolean>();
    private static final HashMap<Character, String> escaped = new HashMap<Character, String>();
    private static final Map<String, Character> rescaped = new HashMap<String, Character>();

    private KevURLEncoder() {
        char i = 'a';
        while (i < 'z') {
            nonEscaped.put(i, true);
            i++;
        }
        i = 'A';
        while (i < 'Z') {
            nonEscaped.put(i, true);
            i++;
        }
        i = '0';
        while (i < '9') {
            nonEscaped.put(i, true);
            i++;
        }
        //escaped.put(' ', "%20");
        escaped.put('!', "%21");
        escaped.put('"', "%22");
        escaped.put('#', "%23");
        escaped.put('$', "%24");
        escaped.put('%', "%25");
        escaped.put('&', "%26");
        //escaped.put('\'', "%27");
        //escaped.put('(', "%28");
        //escaped.put(')', "%29");
        escaped.put('*', "%2A");
        //escaped.put('+', "%2B");
        escaped.put(',', "%2C");
        //escaped.put('-', "%2D");
        //escaped.put('.', "%2E");
        escaped.put('/', "%2F");
        escaped.put(']', "%5B");
        escaped.put('\\', "%5c");
        escaped.put('[', "%5D");
        for (char c : escaped.keySet()) {
            rescaped.put(escaped.get(c), c);
        }
    }


    public String encode(String chain) {
        if (chain == null) {
            return null;
        }
        StringBuilder buffer = null;
        int i = 0;
        while (i < chain.length()) {
            Character ch = chain.charAt(i);
            if (nonEscaped.containsKey(ch)) {
                if (buffer != null) {
                    buffer.append(ch);
                }
            } else {
                String resolved = escaped.get(ch);
                if (resolved != null) {
                    if (buffer == null) {
                        buffer = new StringBuilder();
                        buffer.append(chain.substring(0, i));
                    }
                    buffer.append(resolved);
                }
            }
            i = i + 1;
        }
        if (buffer != null) {
            return buffer.toString();
        } else {
            return chain;
        }
    }

    public String decode(String src) {
        if (src == null) {
            return null;
        }
        if (src.length() == 0) {
            return src;
        }
        StringBuilder builder = null;
        int i = 0;
        while (i < src.length()) {
            int current = src.charAt(i);
            if (current == '%') {
                if (builder == null) {
                    builder = new StringBuilder();
                    builder.append(src.substring(0, i));
                }
                String key = "" + current + src.charAt(i + 1) + src.charAt(i + 2);
                Character resolved = rescaped.get(key);
                if (resolved == null) {
                    builder = builder.append(key);
                } else {
                    builder = builder.append(resolved);
                }
                i = i + 2;
            } else {
                if (builder != null) {
                    builder = builder.append(current);
                }
            }
            i++;
        }
        if (builder != null) {
            return builder.toString();
        } else {
            return src;
        }
    }

}
