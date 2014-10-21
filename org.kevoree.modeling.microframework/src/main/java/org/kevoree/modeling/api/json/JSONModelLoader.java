package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 13:08
 */


public class JSONModelLoader implements ModelLoader {

    private KView factory;

    public JSONModelLoader(KView factory) {
        this.factory = factory;
    }

    @Override
    public void loadModelFromString(String str, Callback<Throwable> callback) {
        if (str == null) {
            callback.on(null);
        }
        loadModelFromStream(new ByteArrayInputStream(str.getBytes(StandardCharsets.UTF_8)), callback);
    }

    @Override
    public void loadModelFromStream(InputStream inputStream, Callback<Throwable> callback) {
        if (inputStream == null) {
            throw new RuntimeException("Null input Stream");
        }
        Lexer lexer = new Lexer(inputStream);
        Token currentToken = lexer.nextToken();
        if (currentToken.getTokenType() != Type.LEFT_BRACKET) {
            callback.on(null);
        } else {
            List<Map<String, Object>> alls = new ArrayList<Map<String, Object>>();
            Map<String, Object> content = new HashMap<String, Object>();
            String currentAttributeName = null;
            Set<String> arrayPayload = null;
            currentToken = lexer.nextToken();
            while (currentToken.getTokenType() != org.kevoree.modeling.api.json.Type.EOF) {
                switch (currentToken.getTokenType()) {
                    case LEFT_BRACKET:
                        arrayPayload = new HashSet<String>();
                        break;
                    case RIGHT_BRACKET:
                        content.put(currentAttributeName, arrayPayload);
                        arrayPayload = null;
                        currentAttributeName = null;
                        break;
                    case LEFT_BRACE:
                        content = new HashMap<String, Object>();
                        break;
                    case RIGHT_BRACE:
                        alls.add(content);
                        content = new HashMap<String, Object>();
                        break;
                    case VALUE:
                        if (currentAttributeName == null) {
                            currentAttributeName = currentToken.getValue().toString();
                        } else {
                            if (arrayPayload == null) {
                                content.put(currentAttributeName, currentToken.getValue().toString());
                                currentAttributeName = null;
                            } else {
                                arrayPayload.add(currentToken.getValue().toString());
                            }
                        }
                        break;
                }
                currentToken = lexer.nextToken();
            }
            for (Map<String, Object> elem : alls) {
                String meta = elem.get(JSONModelSerializer.keyMeta).toString();
                Long kid = Long.parseLong(elem.get(JSONModelSerializer.keyKid).toString());
                KObject current = factory.createProxy(factory.metaClass(meta), factory.dimension().timeTree(kid), kid);
                Object[] payloadObj = factory.dimension().universe().storage().raw(current, true);
                for (String k : elem.keySet()) {
                    MetaAttribute att = current.metaAttribute(k);
                    if (att != null) {
                        payloadObj[att.index()] = elem.get(k);//TODO manage ARRAY for multiplicity 0..*
                    } else {
                        MetaReference ref = current.metaReference(k);
                        if (ref != null) {
                            if (ref.single()) {
                                Long refPayloadSingle;
                                try {
                                    refPayloadSingle = Long.parseLong(elem.get(k).toString());
                                    payloadObj[ref.index()] = refPayloadSingle;
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            } else {
                                try {
                                    Set<String> plainRawList = (Set<String>) elem.get(k);
                                    Set<Long> convertedRaw = new HashSet<Long>();
                                    for (String plainRaw : plainRawList) {
                                        try {
                                            Long converted = Long.parseLong(plainRaw);
                                            convertedRaw.add(converted);
                                        } catch (Exception e) {
                                            e.printStackTrace();
                                        }
                                    }
                                    payloadObj[ref.index()] = convertedRaw;
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                    }
                }
            }
            callback.on(null);
        }
    }

    public static Object convertRaw(MetaAttribute attribute, Object raw){
        switch (attribute.metaType()){
           case STRING:
               break;

        }
    }

}

