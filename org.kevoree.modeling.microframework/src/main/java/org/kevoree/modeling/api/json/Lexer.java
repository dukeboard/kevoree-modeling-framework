package org.kevoree.modeling.api.json;

import java.util.HashSet;


public class Lexer {

    private String bytes;
    private JsonToken EOF;
    private HashSet<Character> BOOLEAN_LETTERS = null;
    private HashSet<Character> DIGIT = null;

    private int index = 0;

    public Lexer(String payload) {
        this.bytes = payload;
        this.EOF = new JsonToken(Type.EOF, null);
    }

    public boolean isSpace(Character c) {
        return c == ' ' || c == '\r' || c == '\n' || c == '\t';
    }

    private Character nextChar() {
        return bytes.charAt(index++);
    }

    private Character peekChar() {
        return bytes.charAt(index);
    }

    private boolean isDone() {
        return index >= bytes.length();
    }

    private boolean isBooleanLetter(Character c) {
        if (BOOLEAN_LETTERS == null) {
            BOOLEAN_LETTERS = new HashSet<Character>();
            BOOLEAN_LETTERS.add('f');
            BOOLEAN_LETTERS.add('a');
            BOOLEAN_LETTERS.add('l');
            BOOLEAN_LETTERS.add('s');
            BOOLEAN_LETTERS.add('e');
            BOOLEAN_LETTERS.add('t');
            BOOLEAN_LETTERS.add('r');
            BOOLEAN_LETTERS.add('u');
        }
        return BOOLEAN_LETTERS.contains(c);
    }

    private boolean isDigit(Character c) {
        if (DIGIT == null) {
            DIGIT = new HashSet<Character>();
            DIGIT.add('0');
            DIGIT.add('1');
            DIGIT.add('2');
            DIGIT.add('3');
            DIGIT.add('4');
            DIGIT.add('5');
            DIGIT.add('6');
            DIGIT.add('7');
            DIGIT.add('8');
            DIGIT.add('9');
        }

        return DIGIT.contains(c);
    }

    private boolean isValueLetter(Character c) {
        return c == '-' || c == '+' || c == '.' || isDigit(c) || isBooleanLetter(c);
    }

    public JsonToken nextToken() {
        if (isDone()) {
            return EOF;
        }
        Type tokenType = Type.EOF;
        Character c = nextChar();
        StringBuilder currentValue = new StringBuilder();
        Object jsonValue = null;
        while (!isDone() && isSpace(c)) {
            c = nextChar();
        }
        if ('"' == c) {
            tokenType = Type.VALUE;
            if (!isDone()) {
                c = nextChar();
                while (index < bytes.length() && c != '"') {
                    currentValue.append(c);
                    if (c == '\\' && index < bytes.length()) {
                        c = nextChar();
                        currentValue.append(c);
                    }
                    c = nextChar();
                }
                jsonValue = currentValue.toString();
            }
        } else if ('{' == c) {
            tokenType = Type.LEFT_BRACE;
        } else if ('}' == c) {
            tokenType = Type.RIGHT_BRACE;
        } else if ('[' == c) {
            tokenType = Type.LEFT_BRACKET;
        } else if (']' == c) {
            tokenType = Type.RIGHT_BRACKET;
        } else if (':' == c) {
            tokenType = Type.COLON;
        } else if (',' == c) {
            tokenType = Type.COMMA;
        } else if (!isDone()) {
            while (isValueLetter(c)) {
                currentValue.append(c);
                if (!isValueLetter(peekChar())) {
                    break;
                } else {
                    c = nextChar();
                }
            }
            String v = currentValue.toString();
            if ("true".equals(v.toLowerCase())) {
                jsonValue = true;
            } else if ("false".equals(v.toLowerCase())) {
                jsonValue = false;
            } else {
                jsonValue = v.toLowerCase();
            }

            tokenType = Type.VALUE;
        } else {
            tokenType = Type.EOF;
        }

        return new JsonToken(tokenType, jsonValue);
    }

}
