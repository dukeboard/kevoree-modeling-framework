package org.kevoree.modeling.api.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 10/03/15.
 */

/**
 * @native:ts
 * {@code
        private readObject:any;

        public parseObject(payload:string):void {
            this.readObject = JSON.parse(payload);
        }

        public get(name:string):any {
            return this.readObject[name];
        }

        public keys():string[] {
            var keysArr = []
            for (var key in this.readObject) {
                keysArr.push(key);
            }
            return keysArr;
        }

 * }
 */
public class JsonObjectReader {

    private Map<String, Object> content = new HashMap<String, Object>();

    private String[] keys= null;

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

    public String[] keys(){
        if(keys == null){
            Set<String> keySet = content.keySet();
            keys = keySet.toArray(new String[keySet.size()]);
        }
        return keys;
    }

}
