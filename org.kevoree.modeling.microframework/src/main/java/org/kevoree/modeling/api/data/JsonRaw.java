package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.json.*;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 11/25/14.
 */
public class JsonRaw {

    public static CacheEntry decode(String payload, KView currentView, long now) {
        if (payload == null) {
            return null;
        }
        Lexer lexer = new Lexer(payload);
        String currentAttributeName = null;
        Set<String> arrayPayload = null;
        Map<String, Object> content = new HashMap<String, Object>();
        JsonToken currentToken = lexer.nextToken();
        while (currentToken.tokenType() != Type.EOF) {
            if (currentToken.tokenType().equals(Type.LEFT_BRACKET)) {
                arrayPayload = new HashSet<String>();
            } else if (currentToken.tokenType().equals(Type.RIGHT_BRACKET)) {
                content.put(currentAttributeName, arrayPayload);
                arrayPayload = null;
                currentAttributeName = null;
            } else if (currentToken.tokenType().equals(Type.LEFT_BRACE)) {
                //content = new HashMap<String, Object>();
            } else if (currentToken.tokenType().equals(Type.RIGHT_BRACE)) {
                //content = new HashMap<String, Object>(); //RESET should not appear here //
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
        //Consistency check
        if (content.get(JsonModelSerializer.KEY_META) == null) {
            return null;
        } else {
            CacheEntry entry = new CacheEntry();
            //Init metaClass before everything
            entry.metaClass = currentView.metaClass(content.get(JsonModelSerializer.KEY_META).toString());
            //Init the Raw storage
            entry.raw = new Object[Index.RESERVED_INDEXES + entry.metaClass.metaAttributes().length + entry.metaClass.metaReferences().length];
            entry.raw[Index.IS_DIRTY_INDEX] = false;
            //Now Fill the Raw Storage
            String[] metaKeys = content.keySet().toArray(new String[content.size()]);
            for (int i = 0; i < metaKeys.length; i++) {
                if (metaKeys[i].equals(JsonModelSerializer.KEY_ROOT)) {
                    try {
                        if ("true".equals(content.get(metaKeys[i]))) {
                            entry.raw[Index.IS_ROOT_INDEX] = true;
                        } else {
                            entry.raw[Index.IS_ROOT_INDEX] = false;
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else if (metaKeys[i].equals(JsonModelSerializer.KEY_META)) {
                    //nothing metaClass is already set
                } else {
                    MetaAttribute metaAttribute = entry.metaClass.metaAttribute(metaKeys[i]);
                    MetaReference metaReference = entry.metaClass.metaReference(metaKeys[i]);
                    Object insideContent = content.get(metaKeys[i]);
                    if (insideContent != null) {
                        if (metaAttribute != null) {
                            entry.raw[metaAttribute.index()] = metaAttribute.strategy().load(insideContent.toString(), metaAttribute, now);
                        } else if (metaReference != null) {
                            if (metaReference.single()) {
                                try {
                                    entry.raw[metaReference.index()] = Long.parseLong(insideContent.toString());
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
                                    entry.raw[metaReference.index()] = convertedRaw;
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                    }
                }
            }
            return entry;
        }
    }

    public static String encode(Object[] raw, long uuid, MetaClass p_metaClass) {
        MetaReference[] metaReferences = p_metaClass.metaReferences();
        MetaAttribute[] metaAttributes = p_metaClass.metaAttributes();
        StringBuilder builder = new StringBuilder();
        builder.append("{\n");
        builder.append("\t\"" + JsonModelSerializer.KEY_META + "\" : \"");
        builder.append(p_metaClass.metaName());
        builder.append("\",\n");
        builder.append("\t\"" + JsonModelSerializer.KEY_UUID + "\" : \"");
        builder.append(uuid);
        if (raw[Index.IS_ROOT_INDEX] != null && raw[Index.IS_ROOT_INDEX].toString().equals("true")) {
            builder.append("\",\n");
            builder.append("\t\"" + JsonModelSerializer.KEY_ROOT + "\" : \"");
            builder.append("true");
        }
        builder.append("\",\n");
        for (int i = 0; i < metaAttributes.length; i++) {
            Object payload_res = raw[metaAttributes[i].index()];
            String attrsPayload = metaAttributes[i].strategy().save(payload_res);
            if (attrsPayload != null) {
                builder.append("\t");
                builder.append("\"");
                builder.append(metaAttributes[i].metaName());
                builder.append("\":\"");
                builder.append(attrsPayload);
                builder.append("\",\n");
            }
        }
        for (int i = 0; i < metaReferences.length; i++) {
            Object refPayload = raw[metaReferences[i].index()];
            if (refPayload != null) {
                builder.append("\t");
                builder.append("\"");
                builder.append(metaReferences[i].metaName());
                builder.append("\":");
                if (metaReferences[i].single()) {
                    builder.append("\"");
                    builder.append(refPayload);
                    builder.append("\"");
                } else {
                    Set<Long> elems = (Set<Long>) refPayload;
                    Long[] elemsArr = elems.toArray(new Long[elems.size()]);
                    boolean isFirst = true;
                    builder.append(" [");
                    for (int j = 0; j < elemsArr.length; j++) {
                        if (!isFirst) {
                            builder.append(",");
                        }
                        builder.append("\"");
                        builder.append(elemsArr[j]);
                        builder.append("\"");
                        isFirst = false;
                    }
                    builder.append("]");
                }
                builder.append(",\n");
            }
        }
        builder.append("}\n");
        return builder.toString();
    }


}
