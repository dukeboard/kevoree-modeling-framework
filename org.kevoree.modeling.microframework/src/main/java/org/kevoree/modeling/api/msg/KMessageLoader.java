package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.json.JsonString;
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

    public static final int EVENT_TYPE = 0;

    public static final int GET_REQ_TYPE = 1;

    public static final int GET_RES_TYPE = 2;

    public static final int PUT_REQ_TYPE = 3;

    public static final int PUT_RES_TYPE = 4;

    public static final int OPERATION_CALL_TYPE = 5;

    public static final int OPERATION_RESULT_TYPE = 6;

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
            if (parsedType == EVENT_TYPE) {
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
            } else if (parsedType == GET_REQ_TYPE) {
                KGetRequest getKeysRequest = new KGetRequest();
                if (content.get("id") != null) {
                    getKeysRequest.id = Long.parseLong(content.get("id").toString());
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
            } else if (parsedType == GET_RES_TYPE) {
                KGetResult getResult = new KGetResult();
                if (content.get("id") != null) {
                    getResult.id = Long.parseLong(content.get("id").toString());
                }
                if (content.get("values") != null) {
                    HashSet<String> metaInt = (HashSet<String>) content.get("values");
                    String[] toFlat = metaInt.toArray(new String[metaInt.size()]);
                    String[] values = new String[toFlat.length];
                    for (int i = 0; i < toFlat.length; i++) {
                        values[i] = JsonString.unescape(toFlat[i]);
                    }
                    getResult.values = values;
                }
                return getResult;
            } else if (parsedType == PUT_REQ_TYPE) {
                KPutRequest putRequest = new KPutRequest();
                if (content.get("id") != null) {
                    putRequest.id = Long.parseLong(content.get("id").toString());
                }
                String[] toFlatKeys = null;
                String[] toFlatValues = null;
                if (content.get("keys") != null) {
                    HashSet<String> metaKeys = (HashSet<String>) content.get("keys");
                    toFlatKeys = metaKeys.toArray(new String[metaKeys.size()]);
                }
                if (content.get("values") != null) {
                    HashSet<String> metaValues = (HashSet<String>) content.get("values");
                    toFlatValues = metaValues.toArray(new String[metaValues.size()]);
                }
                if (toFlatKeys != null && toFlatValues != null && toFlatKeys.length == toFlatValues.length) {
                    if (putRequest.request == null) {
                        putRequest.request = new KContentPutRequest(toFlatKeys.length);
                    }
                    for (int i = 0; i < toFlatKeys.length; i++) {
                        putRequest.request.put(KContentKey.create(toFlatKeys[i]), JsonString.unescape(toFlatValues[i]));
                    }
                }
                return putRequest;
            } else if (parsedType == PUT_RES_TYPE) {
                KPutResult putResult = new KPutResult();
                if (content.get("id") != null) {
                    putResult.id = Long.parseLong(content.get("id").toString());
                }
                return putResult;
            } else if (parsedType == OPERATION_CALL_TYPE) {
                KOperationCallMessage callMessage = new KOperationCallMessage();
                if (content.get("id") != null) {
                    callMessage.id = Long.parseLong(content.get("id").toString());
                }
                if (content.get("key") != null) {
                    callMessage.key = KContentKey.create(content.get("key").toString());
                }
                if (content.get("values") != null) {
                    HashSet<String> metaParams = (HashSet<String>) content.get("values");
                    String[] toFlat = metaParams.toArray(new String[metaParams.size()]);
                    callMessage.params = toFlat;
                }
                return callMessage;
            } else if (parsedType == OPERATION_RESULT_TYPE) {
                KOperationResultMessage resultMessage = new KOperationResultMessage();
                if (content.get("id") != null) {
                    resultMessage.id = Long.parseLong(content.get("id").toString());
                }
                if (content.get("result") != null) {
                    resultMessage.result = content.get("result").toString();
                }
                return resultMessage;
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
