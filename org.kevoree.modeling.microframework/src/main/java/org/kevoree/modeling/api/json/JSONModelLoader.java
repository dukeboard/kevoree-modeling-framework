package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.time.TimeTree;

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

    //TODO optimize object creation
    public static KObject load(String payload, KView factory, Callback<KObject> callback) {
        ByteArrayInputStream st = new ByteArrayInputStream(payload.getBytes(StandardCharsets.UTF_8));
        Lexer lexer = new Lexer(st);
        final KObject[] loaded = new KObject[1];
        loadObjects(lexer, factory, new Callback<List<KObject>>() {
            @Override
            public void on(List<KObject> objs) {
                loaded[0] = objs.get(0);//we rely on the cache of TimeTree, ugly...
            }
        });
        return loaded[0];
    }

    private static void loadObjects(Lexer lexer, KView factory, Callback<List<KObject>> callback) {
        List<KObject> loaded = new ArrayList<KObject>();
        List<Map<String, Object>> alls = new ArrayList<Map<String, Object>>();
        Map<String, Object> content = new HashMap<String, Object>();
        String currentAttributeName = null;
        Set<String> arrayPayload = null;
        Token currentToken = lexer.nextToken();
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
        long[] keys = new long[alls.size()];
        for (int i = 0; i < keys.length; i++) {
            Long kid = Long.parseLong(alls.get(i).get(JSONModelSerializer.keyKid).toString());
            keys[i] = kid;
        }
        factory.dimension().timeTrees(keys, new Callback<TimeTree[]>() {
            @Override
            public void on(TimeTree[] timeTrees) {
                for (int i = 0; i < alls.size(); i++) {
                    Map<String, Object> elem = alls.get(i);
                    String meta = elem.get(JSONModelSerializer.keyMeta).toString();
                    Long kid = Long.parseLong(elem.get(JSONModelSerializer.keyKid).toString());
                    boolean isRoot = false;
                    Object root = elem.get(JSONModelSerializer.keyRoot);
                    if (root != null) {
                        isRoot = Boolean.parseBoolean(root.toString());
                    }
                    TimeTree timeTree = timeTrees[i];
                    timeTree.insert(factory.now());
                    KObject current = factory.createProxy(factory.metaClass(meta), timeTree, kid);
                    if (isRoot) {
                        ((AbstractKObject) current).setRoot(true);
                    }
                    loaded.add(current);
                    Object[] payloadObj = factory.dimension().universe().storage().raw(current, KStore.AccessMode.WRITE);
                    for (String k : elem.keySet()) {
                        MetaAttribute att = current.metaAttribute(k);
                        if (att != null) {
                            payloadObj[att.index()] = JSONModelLoader.convertRaw(att, elem.get(k));//TODO manage ARRAY for multiplicity 0..*
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
                if (callback != null) {
                    callback.on(loaded);
                }
            }
        });
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
            loadObjects(lexer, factory, new Callback<List<KObject>>() {
                @Override
                public void on(List<KObject> kObjects) {
                    callback.on(null);
                }
            });
        }
    }

    public static Object convertRaw(MetaAttribute attribute, Object raw) {
        try {
            switch (attribute.metaType()) {
                case STRING:
                    return raw.toString();
                case LONG:
                    return Long.parseLong(raw.toString());
                case INT:
                    return Integer.parseInt(raw.toString());
                case BOOL:
                    return Boolean.parseBoolean(raw.toString());
                case SHORT:
                    return Short.parseShort(raw.toString());
                case DOUBLE:
                    return Double.parseDouble(raw.toString());
                case FLOAT:
                    return Float.parseFloat(raw.toString());
                default:
                    return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}

