package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.json.*;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaModel;
import org.kevoree.modeling.api.meta.MetaReference;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 11/25/14.
 */
public class JsonRaw {

    public static final String SEP = "@";

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
            MetaModel metaModel = currentView.dimension().universe().metaModel();
            //Init metaClass before everything
            entry.metaClass = metaModel.metaClass(content.get(JsonModelSerializer.KEY_META).toString());
            //Init the Raw storage
            entry.raw = new Object[Index.RESERVED_INDEXES + entry.metaClass.metaAttributes().length + entry.metaClass.metaReferences().length];
            entry.raw[Index.IS_DIRTY_INDEX] = false;
            //Now Fill the Raw Storage
            String[] metaKeys = content.keySet().toArray(new String[content.size()]);
            for (int i = 0; i < metaKeys.length; i++) {
                if (metaKeys[i].equals(JsonModelSerializer.INBOUNDS_META)) {
                    HashMap<Long, MetaReference> inbounds = new HashMap<Long, MetaReference>();
                    entry.raw[Index.INBOUNDS_INDEX] = inbounds;
                    Object raw_payload = content.get(metaKeys[i]);
                    try {
                        HashSet<String> raw_keys = (HashSet<String>) raw_payload;
                        String[] raw_keys_p = raw_keys.toArray(new String[raw_keys.size()]);
                        for (int j = 0; j < raw_keys_p.length; j++) {
                            String raw_elem = raw_keys_p[j];
                            String[] tuple = raw_elem.split(SEP);
                            if (tuple.length == 3) {
                                Long raw_k = Long.parseLong(tuple[0]);
                                MetaClass foundMeta = metaModel.metaClass(tuple[1].trim());
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
                        entry.raw[Index.PARENT_INDEX] = Long.parseLong(content.get(metaKeys[i]).toString());
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else if (metaKeys[i].equals(JsonModelSerializer.PARENT_REF_META)) {
                    try {
                        String raw_payload_ref = content.get(metaKeys[i]).toString();
                        String[] elemsRefs = raw_payload_ref.split(SEP);
                        if (elemsRefs.length == 2) {
                            MetaClass foundMeta = metaModel.metaClass(elemsRefs[0].trim());
                            if (foundMeta != null) {
                                MetaReference metaReference = foundMeta.metaReference(elemsRefs[1].trim());
                                if (metaReference != null) {
                                    entry.raw[Index.REF_IN_PARENT_INDEX] = metaReference;
                                }
                            }
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else if (metaKeys[i].equals(JsonModelSerializer.KEY_ROOT)) {
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
        if (raw[Index.PARENT_INDEX] != null) {
            builder.append("\",\n");
            builder.append("\t\"" + JsonModelSerializer.PARENT_META + "\" : \"");
            builder.append(raw[Index.PARENT_INDEX].toString());
        }
        if (raw[Index.REF_IN_PARENT_INDEX] != null) {
            builder.append("\",\n");
            builder.append("\t\"" + JsonModelSerializer.PARENT_REF_META + "\" : \"");
            try {
                builder.append(((MetaReference) raw[Index.REF_IN_PARENT_INDEX]).origin().metaName());
                builder.append(SEP);
                builder.append(((MetaReference) raw[Index.REF_IN_PARENT_INDEX]).metaName());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if (raw[Index.INBOUNDS_INDEX] != null) {
            builder.append("\",\n");
            builder.append("\t\"" + JsonModelSerializer.INBOUNDS_META + "\" : [");
            try {
                Map<Long, MetaReference> elemsInRaw = (Map<Long, MetaReference>) raw[Index.INBOUNDS_INDEX];
                Long[] elemsArr = elemsInRaw.keySet().toArray(new Long[elemsInRaw.size()]);
                boolean isFirst = true;
                for (int j = 0; j < elemsArr.length; j++) {
                    if (!isFirst) {
                        builder.append(",");
                    }
                    builder.append("\"");
                    builder.append(elemsArr[j]);
                    builder.append(SEP);
                    MetaReference ref = elemsInRaw.get(elemsArr[j]);
                    builder.append(ref.origin().metaName());
                    builder.append(SEP);
                    builder.append(ref.metaName());
                    builder.append("\"");
                    isFirst = false;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            builder.append("]");
            builder.append(",\n");
        } else {
            builder.append("\",\n");
        }
        for (int i = 0; i < metaAttributes.length; i++) {
            Object payload_res = raw[metaAttributes[i].index()];
            if(payload_res != null) {
                String attrsPayload = metaAttributes[i].strategy().save(payload_res,metaAttributes[i]);
                if (attrsPayload != null) {
                    builder.append("\t");
                    builder.append("\"");
                    builder.append(metaAttributes[i].metaName());
                    builder.append("\":\"");
                    builder.append(attrsPayload);
                    builder.append("\",\n");
                }
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
