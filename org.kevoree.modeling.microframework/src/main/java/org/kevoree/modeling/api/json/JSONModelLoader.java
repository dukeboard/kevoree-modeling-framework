package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelLoader;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.data.AccessMode;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.meta.MetaType;
import org.kevoree.modeling.api.time.TimeTree;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 13:08
 */


public class JSONModelLoader implements ModelLoader {

    private KView _factory;

    public JSONModelLoader(KView p_factory) {
        this._factory = p_factory;
    }

    //TODO optimize object creation
    public static KObject load(String payload, KView factory, Callback<KObject> callback) {
        Lexer lexer = new Lexer(payload);
        final KObject[] loaded = new KObject[1];
        loadObjects(lexer, factory, new Callback<List<KObject>>() {
            @Override
            public void on(List<KObject> objs) {
                loaded[0] = objs.get(0);//we rely on the cache of TimeTree, ugly...
            }
        });
        return loaded[0];
    }

    private static void loadObjects(Lexer lexer, final KView factory, final Callback<List<KObject>> callback) {
        final List<KObject> loaded = new ArrayList<KObject>();
        final List<Map<String, Object>> alls = new ArrayList<Map<String, Object>>();
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
                alls.add(content);
                content = new HashMap<String, Object>();
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
        long[] keys = new long[alls.size()];
        for (int i = 0; i < keys.length; i++) {
            Long kid = Long.parseLong(alls.get(i).get(JSONModelSerializer.KEY_UUID).toString());
            keys[i] = kid;
        }
        factory.dimension().timeTrees(keys, new Callback<TimeTree[]>() {
            @Override
            public void on(TimeTree[] timeTrees) {
                for (int i = 0; i < alls.size(); i++) {
                    Map<String, Object> elem = alls.get(i);
                    String meta = elem.get(JSONModelSerializer.KEY_META).toString();
                    Long kid = Long.parseLong(elem.get(JSONModelSerializer.KEY_UUID).toString());
                    boolean isRoot = false;
                    Object root = elem.get(JSONModelSerializer.KEY_ROOT);
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
                    Object[] payloadObj = factory.dimension().universe().storage().raw(current, AccessMode.WRITE);
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
    public void load(String payload, Callback<Throwable> callback) {
        if (payload == null) {
            callback.on(null);
        } else {
            Lexer lexer = new Lexer(payload);
            JsonToken currentToken = lexer.nextToken();
            if (currentToken.tokenType() != Type.LEFT_BRACKET) {
                callback.on(null);
            } else {
                loadObjects(lexer, _factory, new Callback<List<KObject>>() {
                    @Override
                    public void on(List<KObject> kObjects) {
                        callback.on(null);
                    }
                });
            }
        }
    }

    public static Object convertRaw(MetaAttribute attribute, Object raw) {
        try {
            if (attribute.metaType().equals(MetaType.STRING)) {
                return raw.toString();
            } else if (attribute.metaType().equals(MetaType.LONG)) {
                return Long.parseLong(raw.toString());
            } else if (attribute.metaType().equals(MetaType.INT)) {
                return Integer.parseInt(raw.toString());
            } else if (attribute.metaType().equals(MetaType.BOOL)) {
                return Boolean.parseBoolean(raw.toString());
            } else if (attribute.metaType().equals(MetaType.SHORT)) {
                return Short.parseShort(raw.toString());
            } else if (attribute.metaType().equals(MetaType.DOUBLE)) {
                return Double.parseDouble(raw.toString());
            } else if (attribute.metaType().equals(MetaType.FLOAT)) {
                return Float.parseFloat(raw.toString());
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}

