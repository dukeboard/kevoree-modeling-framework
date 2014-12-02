package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.data.AccessMode;
import org.kevoree.modeling.api.data.Index;
import org.kevoree.modeling.api.data.JsonRaw;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.time.DefaultTimeTree;
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

public class JsonModelLoader {

    public static void load(KView factory, String payload, final Callback<Throwable> callback) {
        if (payload == null) {
            callback.on(null);
        } else {
            Lexer lexer = new Lexer(payload);
            JsonToken currentToken = lexer.nextToken();
            if (currentToken.tokenType() != Type.LEFT_BRACKET) {
                callback.on(null);
            } else {
                final List<Map<String, Object>> alls = new ArrayList<Map<String, Object>>();
                Map<String, Object> content = new HashMap<String, Object>();
                String currentAttributeName = null;
                Set<String> arrayPayload = null;
                currentToken = lexer.nextToken();
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
                for (int i = 0; i < alls.size(); i++) {
                    Map<String, Object> elem = alls.get(i);
                    String meta = elem.get(JsonModelSerializer.KEY_META).toString();
                    Long kid = Long.parseLong(elem.get(JsonModelSerializer.KEY_UUID).toString());
                    boolean isRoot = false;
                    Object root = elem.get(JsonModelSerializer.KEY_ROOT);
                    if (root != null) {
                        isRoot = root.toString().equals("true");
                    }
                    TimeTree timeTree = new DefaultTimeTree();
                    timeTree.insert(factory.now());
                    MetaClass metaClass = factory.metaClass(meta);
                    KObject current = factory.createProxy(metaClass, timeTree, kid);
                    factory.dimension().universe().storage().initKObject(current, factory);
                    if (isRoot) {
                        factory.setRoot(current,null);//todo force the direct set
                    }
                    Object[] raw = factory.dimension().universe().storage().raw(current, AccessMode.WRITE);
                    String[] metaKeys = elem.keySet().toArray(new String[elem.size()]);
                    if (metaKeys[i].equals(JsonModelSerializer.INBOUNDS_META)) {
                        HashMap<Long, MetaReference> inbounds = new HashMap<Long, MetaReference>();
                        raw[Index.INBOUNDS_INDEX] = inbounds;
                        Object inbounds_payload = content.get(metaKeys[i]);
                        try {
                            HashSet<String> raw_keys = (HashSet<String>) inbounds_payload;
                            String[] raw_keys_p = raw_keys.toArray(new String[raw_keys.size()]);
                            for (int j = 0; j < raw_keys_p.length; j++) {
                                String raw_elem = raw_keys_p[j];
                                String[] tuple = raw_elem.split(JsonRaw.SEP);
                                if (tuple.length == 3) {
                                    Long raw_k = Long.parseLong(tuple[0]);
                                    MetaClass foundMeta = factory.metaClass(tuple[1].trim());
                                    if (foundMeta != null) {
                                        MetaReference metaReference = foundMeta.metaReference(tuple[2].trim());
                                        if (metaReference != null) {
                                            inbounds.put(raw_k, metaReference);
                                        }
                                    }
                                }
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    } else if (metaKeys[i].equals(JsonModelSerializer.PARENT_META)) {
                        try {
                            raw[Index.PARENT_INDEX] = Long.parseLong(content.get(metaKeys[i]).toString());
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    } else if (metaKeys[i].equals(JsonModelSerializer.PARENT_REF_META)) {
                        try {
                            String parentRef_payload = content.get(metaKeys[i]).toString();
                            String[] elems = parentRef_payload.split(JsonRaw.SEP);
                            if (elems.length == 2) {
                                MetaClass foundMeta = factory.metaClass(elems[0].trim());
                                if (foundMeta != null) {
                                    MetaReference metaReference = foundMeta.metaReference(elems[1].trim());
                                    if (metaReference != null) {
                                        raw[Index.REF_IN_PARENT_INDEX] = metaReference;
                                    }
                                }
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    } else if (metaKeys[i].equals(JsonModelSerializer.KEY_ROOT)) {
                        try {
                            if ("true".equals(content.get(metaKeys[i]))) {
                                raw[Index.IS_ROOT_INDEX] = true;
                            } else {
                                raw[Index.IS_ROOT_INDEX] = false;
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    } else if (metaKeys[i].equals(JsonModelSerializer.KEY_META)) {
                        //nothing metaClass is already set
                    } else {
                        MetaAttribute metaAttribute = metaClass.metaAttribute(metaKeys[i]);
                        MetaReference metaReference = metaClass.metaReference(metaKeys[i]);
                        Object insideContent = content.get(metaKeys[i]);
                        if (insideContent != null) {
                            if (metaAttribute != null) {
                                raw[metaAttribute.index()] = metaAttribute.strategy().load(insideContent.toString(), metaAttribute, factory.now());
                            } else if (metaReference != null) {
                                if (metaReference.single()) {
                                    try {
                                        raw[metaReference.index()] = Long.parseLong(insideContent.toString());
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                } else {
                                    try {
                                        Set<Long> convertedRaw = new HashSet<Long>();
                                        Set<String> plainRawSet = (Set<String>) insideContent;
                                        String[] plainRawList = plainRawSet.toArray(new String[plainRawSet.size()]);
                                        for (int l = 0; l < plainRawList.length; l++) {
                                            String plainRaw = plainRawList[l];
                                            try {
                                                Long converted = Long.parseLong(plainRaw);
                                                convertedRaw.add(converted);
                                            } catch (Exception e) {
                                                e.printStackTrace();
                                            }
                                        }
                                        raw[metaReference.index()] = convertedRaw;
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                }
                            }
                        }
                    }
                }
                if (callback != null) {
                    callback.on(null);
                }
            }
        }
    }

}

