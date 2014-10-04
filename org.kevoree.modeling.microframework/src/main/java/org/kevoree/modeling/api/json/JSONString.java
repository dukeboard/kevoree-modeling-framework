package org.kevoree.modeling.api.json;

/**
 * Created by thomas on 10/3/14.
 */
public class JSONString {
    private final static Character escapeChar = '\\';

    public static void encodeBuffer(StringBuilder buffer, String chain) {
        if (chain == null) {
            return;
        }
        int i = 0;
        while (i < chain.length()) {
            Character ch = chain.charAt(i);
            if (ch == '"') {
                buffer.append(escapeChar);
                buffer.append('"');
            } else if (ch == escapeChar) {
                buffer.append(escapeChar);
                buffer.append(escapeChar);
            } else if (ch == '\n') {
                buffer.append(escapeChar);
                buffer.append('n');
            } else if (ch == '\r') {
                buffer.append(escapeChar);
                buffer.append('r');
            } else if (ch == '\t') {
                buffer.append(escapeChar);
                buffer.append('t');
            } else if (ch == '\u2028') {
                buffer.append(escapeChar);
                buffer.append('u');
                buffer.append('2');
                buffer.append('0');
                buffer.append('2');
                buffer.append('8');
            } else if (ch == '\u2029') {
                buffer.append(escapeChar);
                buffer.append('u');
                buffer.append('2');
                buffer.append('0');
                buffer.append('2');
                buffer.append('9');
            } else {
                buffer.append(ch);
            }
            i = i + 1;
        }
    }

    public static void encode(java.io.PrintStream ostream, String chain) {
        if (chain == null) {
            return;
        }
        int i = 0;
        while (i < chain.length()) {
            Character ch = chain.charAt(i);
            if (ch == '"') {
                ostream.print(escapeChar);
                ostream.print('"');
            } else if (ch == escapeChar) {
                ostream.print(escapeChar);
                ostream.print(escapeChar);
            } else if (ch == '\n') {
                ostream.print(escapeChar);
                ostream.print('n');
            } else if (ch == '\r') {
                ostream.print(escapeChar);
                ostream.print('r');
            } else if (ch == '\t') {
                ostream.print(escapeChar);
                ostream.print('t');
            } else if (ch == '\u2028') {
                ostream.print(escapeChar);
                ostream.print('u');
                ostream.print('2');
                ostream.print('0');
                ostream.print('2');
                ostream.print('8');
            } else if (ch == '\u2029') {
                ostream.print(escapeChar);
                ostream.print('u');
                ostream.print('2');
                ostream.print('0');
                ostream.print('2');
                ostream.print('9');
            } else {
                ostream.print(ch);
            }
            i = i + 1;
        }
    }

    public static String unescape(String src) {
        if (src == null) {
            return null;
        }
        if (src.length() == 0) {
            return src;
        }
        StringBuilder builder = null;
        int i = 0;
        while (i < src.length()) {
            Character current = src.charAt(i);
            if (current == escapeChar) {
                if (builder == null) {
                    builder = new StringBuilder();
                    builder.append(src.substring(0, i));
                }
                i++;
                Character current2 = src.charAt(i);
                switch (current2) {
                    case '"':
                        builder.append('\"');
                        break;
                    case '\\':
                        builder.append(current2);
                        break;
                    case '/':
                        builder.append(current2);
                        break;
                    case 'b':
                        builder.append('\b');
                        break;
                    case 'f':
                        builder.append(Character.toChars(12));
                        break;
                    case 'n':
                        builder.append('\n');
                        break;
                    case 'r':
                        builder.append('\r');
                        break;
                    case 't':
                        builder.append('\t');
                        break;
                    case 'u':
                        throw new RuntimeException("Bad char to escape ");
                }

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
