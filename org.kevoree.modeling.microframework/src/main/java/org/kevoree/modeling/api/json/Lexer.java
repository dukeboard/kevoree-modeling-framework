package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.util.Converters;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashSet;

enum Type {
    VALUE(0),
    LEFT_BRACE(1),
    RIGHT_BRACE(2),
    LEFT_BRACKET(3),
    RIGHT_BRACKET(4),
    COMMA(5),
    COLON(6),
    EOF(42);

    private final int value;

    private Type(int value) {
        this.value = value;
    }
}

class Token {
    private Type tokenType;
    private Object value;

    public Token(Type tokenType, Object value) {
        this.tokenType = tokenType;
        this.value = value;
    }

    @Override
    public String toString() {
        String v;
        if (value != null) {
            v = " (" + value + ")";
        } else {
            v = "";
        }
        String result = tokenType.toString() + v;
        return result;
    }
}

class Lexer {
    private InputStream inputStream;
    private byte[] bytes;
    private Token EOF;
    private HashSet<Character> BOOLEAN_LETTERS = null;
    private HashSet<Character> DIGIT = null;

    private int index = 0;


    public Lexer(InputStream inputStream) {
        this.inputStream = inputStream;
        try {
            this.bytes = toByteArray(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        this.EOF = new Token(Type.EOF, null);
    }

    public boolean isSpace(Character c) {
        return c == ' ' || c == '\r' || c == '\n' || c == '\t';
    }

    private Character nextChar() {
        return new Converters().toChar(bytes[index++]);
    }

    private Character peekChar() {
        return new Converters().toChar(bytes[index]);
    }

    private boolean isDone() {
        return index >= bytes.length;
    }

    private boolean isBooleanLetter(Character c) {
        if (BOOLEAN_LETTERS == null) {
            BOOLEAN_LETTERS = new java.util.HashSet<Character>();
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
            DIGIT = new java.util.HashSet<Character>();
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

    private Token nextToken() {
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
                while (index < bytes.length && c != '"') {
                    currentValue.append(c);
                    if (c == '\\' && index < bytes.length) {
                        c = nextChar();
                        currentValue.append(c);
                    }
                    c = nextChar();
                }
                jsonValue = currentValue.toString();
            } else {
                throw new RuntimeException("Unterminated string");
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

        return new Token(tokenType, jsonValue);
    }

    private static final int DEFAULT_BUFFER_SIZE = 1024 * 4;

    public byte[] toByteArray(InputStream input) throws IOException {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        copy(input, output);
        return output.toByteArray();
    }

    public int copy(InputStream input, OutputStream output) throws IOException {
        long count = copyLarge(input, output);
        if (count > Integer.MAX_VALUE) {
            return -1;
        }
        return (int) count;
    }

    public long copyLarge(InputStream input, OutputStream output)
            throws IOException {
        byte[] buffer = new byte[DEFAULT_BUFFER_SIZE];
        long count = 0;
        int n = 0;
        while (-1 != (n = input.read(buffer))) {
            output.write(buffer, 0, n);
            count += n;
        }
        return count;
    }

}
