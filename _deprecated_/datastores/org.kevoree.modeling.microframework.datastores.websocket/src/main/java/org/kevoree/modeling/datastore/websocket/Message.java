package org.kevoree.modeling.datastore.websocket;

/**
 * Created by duke on 6/26/14.
 */


public class Message {

    public static final String GET = "get";
    public static final int GET_TYPE = 1;
    public static final String PUT = "put";
    public static final int PUT_TYPE = 1;
    public static final String SEP = "/";

    public Integer type;

    public String key;

    public String payload;

    @Override
    public String toString() {
        StringBuilder buffer = new StringBuilder();
        buffer.append(type);
        buffer.append(SEP);
        buffer.append(key);
        buffer.append(SEP);
        buffer.append(payload);
        return buffer.toString();
    }

    public static Message parse(String msg) {
        Message newMessage = new Message();
        String type = msg.substring(0,4);
        if(type.equals(GET)){
            newMessage.type = GET_TYPE;
        } else {
            if(type.equals(PUT)){
                newMessage.type = PUT_TYPE;
            }
        }
        String payload = msg.substring(4);
        int i = 0;
        char ch = payload.charAt(i);
        StringBuffer buffer = new StringBuffer();
        while (i < payload.length() && ch != "/".charAt(0)) {
            i++;
            buffer.append(ch);
            ch = payload.charAt(i);
        }
        if (ch != "/".charAt(0)) {
            buffer.append(ch);
        } else {
            i++;
        }
        newMessage.key = buffer.toString();
        if (i < payload.length()) {
            newMessage.payload = payload.substring(i, payload.length());
        }
        return newMessage;
    }

}
