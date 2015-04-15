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

public class JsonModelLoader {

    /**
     * @native ts
     * if (payload == null) {
     * callback(null);
     * } else {
     * var metaModel: org.kevoree.modeling.api.meta.MetaModel = factory.universe().model().metaModel();
     * var toLoadObj = JSON.parse(payload);
     * var rootElem = [];
     * var mappedKeys: org.kevoree.modeling.api.map.LongLongHashMap = new org.kevoree.modeling.api.map.LongLongHashMap(toLoadObj.length, org.kevoree.modeling.api.KConfig.CACHE_LOAD_FACTOR);
     * for(var i = 0; i < toLoadObj.length; i++) {
     * var elem = toLoadObj[i];
     * var kid = elem[org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID];
     * mappedKeys.put(<number>kid, factory.universe().model().manager().nextObjectKey());
     * }
     * for(var i = 0; i < toLoadObj.length; i++) {
     * var elemRaw = toLoadObj[i];
     * var elem2 = new org.kevoree.modeling.api.map.StringHashMap<any>(Object.keys(elemRaw).length, org.kevoree.modeling.api.KConfig.CACHE_LOAD_FACTOR);
     * for(var ik in elemRaw){ elem2[ik] = elemRaw[ik]; }
     * try {
     * org.kevoree.modeling.api.json.JsonModelLoader.loadObj(elem2, metaModel, factory, mappedKeys, rootElem);
     * } catch(e){ console.error(e); }
     * }
     * if (rootElem[0] != null) { factory.setRoot(rootElem[0]).then( (throwable : java.lang.Throwable) => { if (callback != null) { callback(throwable); }}); } else { if (callback != null) { callback(null); } }
     * }
     */
    public static void load(KView factory, String payload, final Callback<Throwable> callback) {
        if (payload == null) {
            callback.on(null);
        } else {
            MetaModel metaModel = factory.universe().model().metaModel();
            Lexer lexer = new Lexer(payload);
            JsonType currentToken = lexer.nextToken();
            if (currentToken != JsonType.LEFT_BRACKET) {
                callback.on(null);
            } else {
                final List<StringHashMap<Object>> alls = new ArrayList<StringHashMap<Object>>();
                StringHashMap<Object> content = new StringHashMap<Object>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
                String currentAttributeName = null;
                ArrayList<String> arrayPayload = null;
                currentToken = lexer.nextToken();
                while (currentToken != JsonType.EOF) {
                    if (currentToken.equals(JsonType.LEFT_BRACKET)) {
                        arrayPayload = new ArrayList<String>();
                    } else if (currentToken.equals(JsonType.RIGHT_BRACKET)) {
                        content.put(currentAttributeName, arrayPayload);
                        arrayPayload = null;
                        currentAttributeName = null;
                    } else if (currentToken.equals(JsonType.LEFT_BRACE)) {
                        content = new StringHashMap<Object>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
                    } else if (currentToken.equals(JsonType.RIGHT_BRACE)) {
                        alls.add(content);
                        content = new StringHashMap<Object>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
                    } else if (currentToken.equals(JsonType.VALUE)) {
                        if (currentAttributeName == null) {
                            currentAttributeName = lexer.lastValue();
                        } else {
                            if (arrayPayload == null) {
                                content.put(currentAttributeName, lexer.lastValue());
                                currentAttributeName = null;
                            } else {
                                arrayPayload.add(lexer.lastValue());
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
                        loadObj(elem, metaModel, factory, mappedKeys, rootElem);
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

    private static void loadObj(StringHashMap<Object> p_param, MetaModel p_metaModel, KView p_factory, LongLongHashMap p_mappedKeys, KObject[] p_rootElem) {
        long kid = Long.parseLong(p_param.get(JsonModelSerializer.KEY_UUID).toString());
        String meta = p_param.get(JsonModelSerializer.KEY_META).toString();
        MetaClass metaClass = p_metaModel.metaClass(meta);
        KObject current = ((AbstractKView) p_factory).createProxy(metaClass, p_mappedKeys.get(kid));
        p_factory.universe().model().manager().initKObject(current, p_factory);
        KCacheEntry raw = p_factory.universe().model().manager().entry(current, AccessMode.WRITE);
        p_param.each(new StringHashMapCallBack<Object>() {
            @Override
            public void on(String metaKey, Object payload_content) {
                if (metaKey.equals(JsonModelSerializer.INBOUNDS_META)) {
                    try {
                        raw.set(Index.INBOUNDS_INDEX, transposeArr((ArrayList<String>) payload_content, p_mappedKeys));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else if (metaKey.equals(JsonModelSerializer.PARENT_META)) {
                    try {
                        ArrayList<String> parentKeys = (ArrayList<String>) payload_content;
                        long[] parentTransposed = transposeArr(parentKeys,p_mappedKeys);
                        if(parentTransposed != null && parentTransposed.length >0 && parentTransposed[0]!=KConfig.NULL_LONG){
                            long[] parentKey = new long[1];
                            parentKey[0] = parentTransposed[0];
                            raw.set(Index.PARENT_INDEX, parentKey);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else if (metaKey.equals(JsonModelSerializer.PARENT_REF_META)) {
                    try {
                        String parentRef_payload = payload_content.toString();
                        String[] elems = parentRef_payload.split(JsonRaw.SEP);
                        if (elems.length == 2) {
                            MetaClass foundMeta = p_metaModel.metaClass(elems[0].trim());
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
                        p_rootElem[0] = current;
                    }
                } else {
                    Meta metaElement = metaClass.metaByName(metaKey);
                    if (payload_content != null) {
                        if (metaElement != null && metaElement.metaType().equals(MetaType.ATTRIBUTE)) {
                            raw.set(metaElement.index(), ((MetaAttribute) metaElement).strategy().load(payload_content.toString(), (MetaAttribute) metaElement, p_factory.now()));
                        } else if (metaElement != null && metaElement instanceof AbstractMetaReference) {
                            try {
                                raw.set(metaElement.index(), transposeArr((ArrayList<String>) payload_content, p_mappedKeys));
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * @native ts
     * if (plainRawSet == null) { return null; }
     * var convertedRaw: number[] = new Array();
     * for (var l in plainRawSet) {
     * try {
     * var converted: number = java.lang.Long.parseLong(plainRawSet[l]);
     * if (p_mappedKeys.containsKey(converted)) { converted = p_mappedKeys.get(converted); }
     * convertedRaw[l] = converted;
     * } catch ($ex$) {
     * if ($ex$ instanceof java.lang.Exception) {
     * var e: java.lang.Exception = <java.lang.Exception>$ex$;
     * e.printStackTrace();
     * }
     * }
     * }
     * return convertedRaw;
     */
    private static long[] transposeArr(ArrayList<String> plainRawSet, LongLongHashMap p_mappedKeys) {
        if (plainRawSet == null) {
            return null;
        }
        long[] convertedRaw = new long[plainRawSet.size()];
        for (int l = 0; l < plainRawSet.size(); l++) {
            try {
                long converted = Long.parseLong(plainRawSet.get(l));
                if (p_mappedKeys.containsKey(converted)) {
                    converted = p_mappedKeys.get(converted);
                }
                convertedRaw[l] = converted;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return convertedRaw;
    }

}

