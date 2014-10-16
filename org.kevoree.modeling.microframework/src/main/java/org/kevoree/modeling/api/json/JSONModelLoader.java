package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.util.CallBackChain;
import org.kevoree.modeling.api.util.Helper;

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
    public void loadModelFromString(String str, Callback<KObject> callback) {
        if (str == null) {
            callback.on(null);
        }
        loadModelFromStream(new ByteArrayInputStream(str.getBytes(StandardCharsets.UTF_8)), callback);
    }

    @Override
    public void loadModelFromStream(InputStream inputStream, Callback<KObject> callback) {
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
            Set<String> arrayPayload=null;
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

            Helper.forall(alls.toArray(new Map[alls.size()]), new CallBackChain<Map>() {
                @Override
                public void on(Map map, Callback<Throwable> next) {

                    Map<String, Object> payloads = map;
                    factory.lookup(payloads.get("@meta").toString(), (r) -> {
                        KObject resolved = null;
                        if (r == null) {
                            resolved = factory.createFQN(payloads.get("@meta").toString());
                        } else {
                            resolved = r;
                        }
                        ((AbstractKObject) resolved).setPath(payloads.get("@path").toString());
                        Object[] payloadObj = factory.dimension().universe().dataCache().getAllPayload(resolved.dimension(), resolved.now(), resolved.path());
                        for (String k : payloads.keySet()) {
                            MetaAttribute att = resolved.metaAttribute(k);
                            if (att != null) {
                                payloadObj[att.index()] = payloads.get(k).toString();//TODO manage ARRAY for multiplicity 0..*
                            } else {
                                MetaReference ref = resolved.metaReference(k);
                                if (ref != null) {
                                    payloadObj[ref.index()] = payloads.get(k);
                                }
                            }
                        }
                        next.on(null);
                    });
                }
            }, new Callback<Throwable>() {

                @Override
                public void on(Throwable throwable) {
                    callback.on(null);//TODO
                }
            });
        }
    }

}

