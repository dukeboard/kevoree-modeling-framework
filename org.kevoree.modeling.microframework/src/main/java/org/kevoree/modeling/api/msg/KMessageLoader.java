package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.AtomicOperationFactory;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.json.JsonString;
import org.kevoree.modeling.api.json.JsonToken;
import org.kevoree.modeling.api.json.Lexer;
import org.kevoree.modeling.api.json.Type;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 23/02/15.
 */
public class KMessageLoader {

    public static String TYPE_NAME = "type";
    public static String OPERATION_NAME = "op";
    public static String KEY_NAME = "key";
    public static String KEYS_NAME = "keys";
    public static String ID_NAME = "id";
    public static String VALUE_NAME = "value";
    public static String VALUES_NAME = "values";

    public static final int EVENT_TYPE = 0;

    public static final int GET_REQ_TYPE = 1;

    public static final int GET_RES_TYPE = 2;

    public static final int PUT_REQ_TYPE = 3;

    public static final int PUT_RES_TYPE = 4;

    public static final int OPERATION_CALL_TYPE = 5;

    public static final int OPERATION_RESULT_TYPE = 6;

    public static final int ATOMIC_OPERATION_REQUEST_TYPE = 7;

    public static final int ATOMIC_OPERATION_RESULT_TYPE = 8;

    public static KMessage load(String payload) {
        Lexer lexer = new Lexer(payload);
        Map<String, Object> content = new HashMap<String, Object>();
        String currentAttributeName = null;
        ArrayList<String> arrayPayload = null;
        JsonToken currentToken = lexer.nextToken();
        while (currentToken.tokenType() != Type.EOF) {
            if (currentToken.tokenType().equals(Type.LEFT_BRACKET)) {
                arrayPayload = new ArrayList<String>();
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
            Integer parsedType = Integer.parseInt(content.get(TYPE_NAME).toString());
            if (parsedType == EVENT_TYPE) {
                KEventMessage eventMessage = new KEventMessage();
                if (content.get(KEY_NAME) != null) {
                    eventMessage.key = KContentKey.create(content.get(KEY_NAME).toString());
                }
                if (content.get(VALUES_NAME) != null) {
                    ArrayList<String> metaInt = (ArrayList<String>) content.get(VALUES_NAME);
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
                if (content.get(ID_NAME) != null) {
                    getKeysRequest.id = Long.parseLong(content.get(ID_NAME).toString());
                }
                if (content.get(KEYS_NAME) != null) {
                    ArrayList<String> metaInt = (ArrayList<String>) content.get(KEYS_NAME);
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
                if (content.get(ID_NAME) != null) {
                    getResult.id = Long.parseLong(content.get(ID_NAME).toString());
                }
                if (content.get(VALUES_NAME) != null) {
                    ArrayList<String> metaInt = (ArrayList<String>) content.get(VALUES_NAME);
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
                if (content.get(ID_NAME) != null) {
                    putRequest.id = Long.parseLong(content.get(ID_NAME).toString());
                }
                String[] toFlatKeys = null;
                String[] toFlatValues = null;
                if (content.get(KEYS_NAME) != null) {
                    ArrayList<String> metaKeys = (ArrayList<String>) content.get(KEYS_NAME);
                    toFlatKeys = metaKeys.toArray(new String[metaKeys.size()]);
                }
                if (content.get(VALUES_NAME) != null) {
                    ArrayList<String> metaValues = (ArrayList<String>) content.get(VALUES_NAME);
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
                if (content.get(ID_NAME) != null) {
                    putResult.id = Long.parseLong(content.get(ID_NAME).toString());
                }
                return putResult;
            } else if (parsedType == OPERATION_CALL_TYPE) {
                KOperationCallMessage callMessage = new KOperationCallMessage();
                if (content.get(ID_NAME) != null) {
                    callMessage.id = Long.parseLong(content.get(ID_NAME).toString());
                }
                if (content.get(KEY_NAME) != null) {
                    callMessage.key = KContentKey.create(content.get(KEY_NAME).toString());
                }
                if (content.get(VALUES_NAME) != null) {
                    ArrayList<String> metaParams = (ArrayList<String>) content.get(VALUES_NAME);
                    String[] toFlat = metaParams.toArray(new String[metaParams.size()]);
                    callMessage.params = toFlat;
                }
                return callMessage;
            } else if (parsedType == OPERATION_RESULT_TYPE) {
                KOperationResultMessage resultMessage = new KOperationResultMessage();
                if (content.get(ID_NAME) != null) {
                    resultMessage.id = Long.parseLong(content.get(ID_NAME).toString());
                }
                if (content.get(VALUE_NAME) != null) {
                    resultMessage.value = content.get(VALUE_NAME).toString();
                }
                return resultMessage;
            } else if (parsedType == ATOMIC_OPERATION_REQUEST_TYPE) {
                KAtomicGetRequest atomicGetMessage = new KAtomicGetRequest();
                if (content.get(ID_NAME) != null) {
                    atomicGetMessage.id = Long.parseLong(content.get(ID_NAME).toString());
                }
                if (content.get(KEY_NAME) != null) {
                    atomicGetMessage.key = KContentKey.create(content.get(KEY_NAME).toString());
                }
                if (content.get(OPERATION_NAME) != null) {
                    atomicGetMessage.operation = AtomicOperationFactory.getOperationWithKey(Integer.parseInt((String) content.get(OPERATION_NAME)));
                }
                return atomicGetMessage;
            } else if (parsedType == ATOMIC_OPERATION_RESULT_TYPE) {
                KAtomicGetResult atomicGetResultMessage = new KAtomicGetResult();
                if (content.get(ID_NAME) != null) {
                    atomicGetResultMessage.id = Long.parseLong(content.get(ID_NAME).toString());
                }
                if (content.get(VALUE_NAME) != null) {
                    atomicGetResultMessage.value = content.get(VALUE_NAME).toString();
                }
                return atomicGetResultMessage;
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
