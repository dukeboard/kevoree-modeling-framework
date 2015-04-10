package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.map.StringHashMap;
import org.kevoree.modeling.api.map.StringHashMapCallBack;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 10/03/15.
 */

/**
 * @native ts
 * private readObject:any;
 * public parseObject(payload:string):void {
 * this.readObject = JSON.parse(payload);
 * }
 * public get(name:string):any {
 * return this.readObject[name];
 * }
 * public getAsStringArray(name:string):string[] {
 * return <string[]> this.readObject[name];
 * }
 * public keys():string[] {
 * var keysArr = []
 * for (var key in this.readObject) {
 * keysArr.push(key);
 * }
 * return keysArr;
 * }
 */
public class JsonObjectReader {

    private StringHashMap<Object> content = new StringHashMap<Object>(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);

    private String[] keys = null;

    public void parseObject(String payload) {
        Lexer lexer = new Lexer(payload);
        String currentAttributeName = null;
        ArrayList<String> arrayPayload = null;
        //TODO replace by indexBaseStructure
        JsonToken currentToken = lexer.nextToken();
        while (currentToken.tokenType() != Type.EOF) {
            if (currentToken.tokenType().equals(Type.LEFT_BRACKET)) {
                arrayPayload = new ArrayList<String>();
            } else if (currentToken.tokenType().equals(Type.RIGHT_BRACKET)) {
                content.put(currentAttributeName, arrayPayload);
                arrayPayload = null;
                currentAttributeName = null;
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
    }

    public Object get(String name) {
        return content.get(name);
    }

    public String[] getAsStringArray(String name) {
        Object result = content.get(name);
        if (result instanceof ArrayList) {
            ArrayList<String> casted = (ArrayList<String>) result;
            return casted.toArray(new String[casted.size()]);
        }
        return null;
    }

    public String[] keys() {
        if (keys == null) {
            keys = new String[content.size()];
            int[] nbLoop = new int[1];
            nbLoop[0] = 0;
            content.each(new StringHashMapCallBack<Object>() {
                @Override
                public void on(String key, Object value) {
                    keys[nbLoop[0]] = key;
                    nbLoop[0]++;
                }
            });
        }
        return keys;
    }

}
