package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.abs.AbstractMetaReference;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.data.manager.Index;
import org.kevoree.modeling.api.data.manager.JsonRaw;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.map.StringHashMap;
import org.kevoree.modeling.api.map.StringHashMapCallBack;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaModel;
import org.kevoree.modeling.api.meta.MetaType;

import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 13:08
 */

public class JsonModelLoader {

    public static void load(KView factory, String payload, final Callback<Throwable> callback) {
        if (payload == null) {
            callback.on(null);
        } else {
            MetaModel metaModel = factory.universe().model().metaModel();
            Lexer lexer = new Lexer(payload);
            JsonToken currentToken = lexer.nextToken();
            if (currentToken.tokenType() != Type.LEFT_BRACKET) {
                callback.on(null);
            } else {
                final List<StringHashMap<Object>> alls = new ArrayList<StringHashMap<Object>>();
                StringHashMap<Object> content = new StringHashMap<Object>(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);
                String currentAttributeName = null;
                ArrayList<String> arrayPayload = null;
                currentToken = lexer.nextToken();
                while (currentToken.tokenType() != Type.EOF) {
                    if (currentToken.tokenType().equals(Type.LEFT_BRACKET)) {
                        arrayPayload = new ArrayList<String>();
                    } else if (currentToken.tokenType().equals(Type.RIGHT_BRACKET)) {
                        content.put(currentAttributeName, arrayPayload);
                        arrayPayload = null;
                        currentAttributeName = null;
                    } else if (currentToken.tokenType().equals(Type.LEFT_BRACE)) {
                        content = new StringHashMap<Object>(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);
                    } else if (currentToken.tokenType().equals(Type.RIGHT_BRACE)) {
                        alls.add(content);
                        content = new StringHashMap<Object>(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);
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
                final KObject[] rootElem = {null};
                LongLongHashMap mappedKeys = new LongLongHashMap(alls.size(), KConfig.CACHE_LOAD_FACTOR);
                for (int i = 0; i < alls.size(); i++) {
                    try {
                        StringHashMap<Object> elem = alls.get(i);
                        long kid = Long.parseLong(elem.get(JsonModelSerializer.KEY_UUID).toString());
                        mappedKeys.put(kid, factory.universe().model().manager().nextObjectKey());
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                for (int i = 0; i < alls.size(); i++) {
                    try {
                        StringHashMap<Object> elem = alls.get(i);
                        long kid = Long.parseLong(elem.get(JsonModelSerializer.KEY_UUID).toString());
                        String meta = elem.get(JsonModelSerializer.KEY_META).toString();
                        MetaClass metaClass = metaModel.metaClass(meta);
                        KObject current = ((AbstractKView) factory).createProxy(metaClass, mappedKeys.get(kid));
                        factory.universe().model().manager().initKObject(current, factory);
                        KCacheEntry raw = factory.universe().model().manager().entry(current, AccessMode.WRITE);
                        elem.each(new StringHashMapCallBack<Object>() {
                            @Override
                            public void on(String metaKey, Object payload_content) {
                                if (metaKey.equals(JsonModelSerializer.INBOUNDS_META)) {
                                    try {
                                        ArrayList<String> raw_keys = (ArrayList<String>) payload_content;
                                        long[] inbounds = new long[raw_keys.size()];
                                        for (int hh = 0; hh < raw_keys.size(); hh++) {
                                            try {
                                                long converted = Long.parseLong(raw_keys.get(hh));
                                                if (mappedKeys.containsKey(converted)) {
                                                    converted = mappedKeys.get(converted);
                                                }
                                                inbounds[hh] = converted;
                                            } catch (Exception e) {
                                                e.printStackTrace();
                                            }
                                        }
                                        raw.set(Index.INBOUNDS_INDEX, inbounds);
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                } else if (metaKey.equals(JsonModelSerializer.PARENT_META)) {
                                    try {
                                        ArrayList<String> parentKeys = (ArrayList<String>) payload_content;
                                        for (int l = 0; l < parentKeys.size(); l++) {
                                            long raw_k = Long.parseLong(parentKeys.get(l));
                                            if (mappedKeys.containsKey(raw_k)) {
                                                raw_k = mappedKeys.get(raw_k);
                                            }
                                            if (raw_k != KConfig.NULL_LONG) {
                                                long[] parentKey = new long[1];
                                                parentKey[0] = raw_k;
                                                raw.set(Index.PARENT_INDEX, parentKey);
                                            }
                                        }
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                } else if (metaKey.equals(JsonModelSerializer.PARENT_REF_META)) {
                                    try {
                                        String parentRef_payload = payload_content.toString();
                                        String[] elems = parentRef_payload.split(JsonRaw.SEP);
                                        if (elems.length == 2) {
                                            MetaClass foundMeta = metaModel.metaClass(elems[0].trim());
                                            if (foundMeta != null) {
                                                Meta metaReference = foundMeta.metaByName(elems[1].trim());
                                                if (metaReference != null && metaReference instanceof AbstractMetaReference) {
                                                    raw.set(Index.REF_IN_PARENT_INDEX, metaReference);
                                                }
                                            }
                                        }
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                } else if (metaKey.equals(JsonModelSerializer.KEY_ROOT)) {
                                    if ("true".equals(payload_content)) {
                                        rootElem[0] = current;
                                    }
                                } else {
                                    Meta metaElement = metaClass.metaByName(metaKey);
                                    if (payload_content != null) {
                                        if (metaElement != null && metaElement.metaType().equals(MetaType.ATTRIBUTE)) {
                                            raw.set(metaElement.index(), ((MetaAttribute) metaElement).strategy().load(payload_content.toString(), (MetaAttribute) metaElement, factory.now()));
                                        } else if (metaElement != null && metaElement instanceof AbstractMetaReference) {
                                            try {
                                                ArrayList<String> plainRawSet = (ArrayList<String>) payload_content;
                                                long[] convertedRaw = new long[plainRawSet.size()];
                                                for (int l = 0; l < plainRawSet.size(); l++) {
                                                    try {
                                                        long converted = Long.parseLong(plainRawSet.get(l));
                                                        if (mappedKeys.containsKey(converted)) {
                                                            converted = mappedKeys.get(converted);
                                                        }
                                                        convertedRaw[l] = converted;
                                                    } catch (Exception e) {
                                                        e.printStackTrace();
                                                    }
                                                }
                                                raw.set(metaElement.index(), convertedRaw);
                                            } catch (Exception e) {
                                                e.printStackTrace();
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                if (rootElem[0] != null) {
                    factory.setRoot(rootElem[0]).then(new Callback<Throwable>() {
                        @Override
                        public void on(Throwable throwable) {
                            if (callback != null) {
                                callback.on(throwable);
                            }
                        }
                    });
                } else {
                    if (callback != null) {
                        callback.on(null);
                    }
                }
            }
        }
    }

}

