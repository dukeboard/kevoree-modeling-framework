package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.json.JsonToken;
import org.kevoree.modeling.api.json.Lexer;
import org.kevoree.modeling.api.json.Type;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 23/02/15.
 */
public class KMessageLoader {

    public static KMessage load(String payload) {
        Lexer lexer = new Lexer(payload);
        Map<String, Object> content = new HashMap<String, Object>();
        String currentAttributeName = null;
        Set<String> arrayPayload = null;
        JsonToken currentToken = lexer.nextToken();
        while (currentToken.tokenType() != Type.EOF) {
            if (currentToken.tokenType().equals(Type.LEFT_BRACKET)) {
                arrayPayload = new HashSet<String>();
            } else if (currentToken.tokenType().equals(Type.RIGHT_BRACKET)) {
                content.put(currentAttributeName, arrayPayload);
                arrayPayload = null;
                currentAttributeName = null;
            } else if (currentToken.tokenType().equals(Type.LEFT_BRACE)) {
                content = new HashMap<String, Object>();
            } else if (currentToken.tokenType().equals(Type.RIGHT_BRACE)) {
                //alls.add(content);
                //content = new HashMap<String, Object>();
            } else if (currentToken.tokenType().equals(Type.VALUE)) {
                if (currentAttributeName == null) {
                    currentAttributeName = currentToken.value().toString();
                } else {
                    if (arrayPayload == null) {
                        content.put(currentAttributeName, currentToken.value().toString());
                        currentAttributeName = null;
                    } else {
                        arrayPayload.add(currentToken.value().toString());
                    }
                }
            }
            currentToken = lexer.nextToken();
        }
        try {
            Integer parsedType = Integer.parseInt(content.get("type").toString());
            if (parsedType == KMessage.EVENT_TYPE) {
                KEventMessage eventMessage = new KEventMessage();
                if (content.get("key") != null) {
                    eventMessage.key = KContentKey.create(content.get("key").toString());
                }
                if (content.get("values") != null) {
                    HashSet<String> metaInt = (HashSet<String>) content.get("values");
                    String[] toFlat = metaInt.toArray(new String[metaInt.size()]);
                    int[] nbElem = new int[metaInt.size()];
                    for (int i = 0; i < toFlat.length; i++) {
                        nbElem[i] = Integer.parseInt(toFlat[i]);
                    }
                    eventMessage.meta = nbElem;
                }
                return eventMessage;
            } else if (parsedType == KMessage.GET_KEYS_TYPE) {
                KGetKeysRequest getKeysRequest = new KGetKeysRequest();
                if (content.get("id") != null) {
                    getKeysRequest.id = Integer.parseInt(content.get("id").toString());
                }
                if (content.get("keys") != null) {
                    HashSet<String> metaInt = (HashSet<String>) content.get("keys");
                    String[] toFlat = metaInt.toArray(new String[metaInt.size()]);
                    KContentKey[] keys = new KContentKey[toFlat.length];
                    for (int i = 0; i < toFlat.length; i++) {
                        keys[i] = KContentKey.create(toFlat[i]);
                    }
                    getKeysRequest.keys = keys;
                }
                return getKeysRequest;
            } else if (parsedType == KMessage.PUT_TYPE) {
                KPutRequest putRequest = new KPutRequest();
                if (content.get("id") != null) {
                    putRequest.id = Integer.parseInt(content.get("id").toString());
                }
                String[] toFlatKeys = null;
                String[] toFlatValues = null;
                if (content.get("keys") != null) {
                    HashSet<String> metaInt = (HashSet<String>) content.get("keys");
                    toFlatKeys = metaInt.toArray(new String[metaInt.size()]);
                }
                if (content.get("values") != null) {
                    HashSet<String> metaInt = (HashSet<String>) content.get("values");
                    toFlatKeys = metaInt.toArray(new String[metaInt.size()]);
                }
                    if (putRequest.request == null) {
                        putRequest.request = new KContentPutRequest(toFlat.length);
                    }

                    KContentKey[] keys = new KContentKey[toFlat.length];
                    for (int i = 0; i < toFlat.length; i++) {
                        keys[i] = KContentKey.create(toFlat[i]);
                    }
                    putRequest. = keys;
                }
                return getKeysRequest;
            } else if (parsedType == KMessage.OPERATION_CALL_TYPE) {

            } else if (parsedType == KMessage.OPERATION_RESULT_TYPE) {

            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
