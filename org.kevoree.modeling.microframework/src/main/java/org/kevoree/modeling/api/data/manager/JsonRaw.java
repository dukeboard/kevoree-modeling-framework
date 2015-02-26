package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.abs.AbstractMetaAttribute;
import org.kevoree.modeling.api.abs.AbstractMetaReference;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.json.*;
import org.kevoree.modeling.api.meta.*;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 11/25/14.
 */
public class JsonRaw {

    public static final String SEP = "@";

    public static void decode(String payload, long now, MetaModel metaModel, final KCacheEntry entry) {
        if (payload == null) {
            return;
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
            return;
        } else {
            //Init metaClass before everything
            entry.metaClass = metaModel.metaClass(content.get(JsonModelSerializer.KEY_META).toString());
            //Init the Raw manager
            entry.raw = new Object[Index.RESERVED_INDEXES + entry.metaClass.metaElements().length];
            entry._dirty = false;
            //Now Fill the Raw Storage
            String[] metaKeys = content.keySet().toArray(new String[content.size()]);
            for (int i = 0; i < metaKeys.length; i++) {
                if (metaKeys[i].equals(JsonModelSerializer.INBOUNDS_META)) {
                    Set<Long> inbounds = new HashSet<Long>();
                    entry.raw[Index.INBOUNDS_INDEX] = inbounds;
                    Object raw_payload = content.get(metaKeys[i]);
                    try {
                        HashSet<String> raw_keys = (HashSet<String>) raw_payload;
                        String[] raw_keys_p = raw_keys.toArray(new String[raw_keys.size()]);
                        for (int j = 0; j < raw_keys_p.length; j++) {
                            try {
                                Long parsed = Long.parseLong(raw_keys_p[j]);
                                inbounds.add(parsed);
                            } catch (Exception e) {
                                e.printStackTrace();
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
                                Meta metaReference = foundMeta.metaByName(elemsRefs[1].trim());
                                if (metaReference != null && metaReference instanceof AbstractMetaReference) {
                                    entry.raw[Index.REF_IN_PARENT_INDEX] = metaReference;
                                }
                            }
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else if (metaKeys[i].equals(JsonModelSerializer.KEY_ROOT)) {
                    try {
                        /*
                        if ("true".equals(content.get(metaKeys[i]))) {
                            entry.raw[Index.IS_ROOT_INDEX] = true;
                        } else {
                            entry.raw[Index.IS_ROOT_INDEX] = false;
                        }
                        */
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else if (metaKeys[i].equals(JsonModelSerializer.KEY_META)) {
                    //nothing metaClass is already set
                } else {
                    Meta metaElement = entry.metaClass.metaByName(metaKeys[i]);
                    Object insideContent = content.get(metaKeys[i]);
                    if (insideContent != null) {
                        if (metaElement != null && metaElement.metaType().equals(MetaType.ATTRIBUTE)) {
                            entry.raw[metaElement.index()] = ((AbstractMetaAttribute) metaElement).strategy().load(insideContent.toString(), (AbstractMetaAttribute) metaElement, now);
                        } else if (metaElement != null && metaElement instanceof AbstractMetaReference) {
                            if (((MetaReference) metaElement).single()) {
                                try {
                                    entry.raw[metaElement.index()] = Long.parseLong(insideContent.toString());
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
                                    entry.raw[metaElement.index()] = convertedRaw;
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    public static String encode(KCacheEntry raw, Long uuid, MetaClass p_metaClass, boolean endline, boolean isRoot) {
        Meta[] metaElements = p_metaClass.metaElements();
        StringBuilder builder = new StringBuilder();
        builder.append("\t{\n");
        builder.append("\t\t\"" + JsonModelSerializer.KEY_META + "\": \"");
        builder.append(p_metaClass.metaName());
        if (uuid != null) {
            builder.append("\",\n");
            builder.append("\t\t\"" + JsonModelSerializer.KEY_UUID + "\": \"");
            builder.append(uuid);
        }
        if (isRoot) {
            builder.append("\",\n");
            builder.append("\t\t\"" + JsonModelSerializer.KEY_ROOT + "\": \"");
            builder.append("true");
        }
        if (raw.get(Index.PARENT_INDEX) != null) {
            builder.append("\",\n");
            builder.append("\t\t\"" + JsonModelSerializer.PARENT_META + "\": \"");
            builder.append(raw.get(Index.PARENT_INDEX).toString());
        }
        if (raw.get(Index.REF_IN_PARENT_INDEX) != null) {
            builder.append("\",\n");
            builder.append("\t\t\"" + JsonModelSerializer.PARENT_REF_META + "\": \"");
            try {
                builder.append(((MetaReference) raw.get(Index.REF_IN_PARENT_INDEX)).origin().metaName());
                builder.append(SEP);
                builder.append(((MetaReference) raw.get(Index.REF_IN_PARENT_INDEX)).metaName());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if (raw.get(Index.INBOUNDS_INDEX) != null) {
            builder.append("\",\n");
            builder.append("\t\t\"" + JsonModelSerializer.INBOUNDS_META + "\": [");
            try {
                Set<Long> elemsInRaw = (Set<Long>) raw.get(Index.INBOUNDS_INDEX);
                Long[] elemsArr = elemsInRaw.toArray(new Long[elemsInRaw.size()]);
                boolean isFirst = true;
                for (int j = 0; j < elemsArr.length; j++) {
                    if (!isFirst) {
                        builder.append(",");
                    }
                    builder.append("\"");
                    builder.append(elemsArr[j]);
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

        int nbElemToPrint = 0;
        for (int i = Index.RESERVED_INDEXES; i < raw.sizeRaw(); i++) {
            if (raw.get(i) != null) {
                nbElemToPrint++;
            }
        }
        int nbElemPrinted = 0;
        for (int i = 0; i < metaElements.length; i++) {
            if (metaElements[i] != null && metaElements[i].metaType().equals(MetaType.ATTRIBUTE)) {
                Object payload_res = raw.get(metaElements[i].index());
                if (payload_res != null) {
                    if (((MetaAttribute) metaElements[i]).attributeType() != PrimitiveTypes.TRANSIENT) {
                        String attrsPayload = ((MetaAttribute) metaElements[i]).strategy().save(payload_res, (MetaAttribute) metaElements[i]);
                        if (attrsPayload != null) {
                            builder.append("\t\t");
                            builder.append("\"");
                            builder.append(metaElements[i].metaName());
                            builder.append("\": \"");
                            builder.append(attrsPayload);
                            builder.append("\"");
                            nbElemPrinted++;
                            if (nbElemPrinted < nbElemToPrint) {
                                builder.append(",");
                            }
                            builder.append("\n");
                        }
                    }
                }
            } else if (metaElements[i]!=null && metaElements[i].metaType().equals(MetaType.REFERENCE)) {
                Object refPayload = raw.get(metaElements[i].index());
                if (refPayload != null) {
                    builder.append("\t\t");
                    builder.append("\"");
                    builder.append(metaElements[i].metaName());
                    builder.append("\":");
                    if (((MetaReference) metaElements[i]).single()) {
                        builder.append("\"");
                        builder.append(refPayload);
                        builder.append("\"");
                    } else {
                        Set<Long> elems = (Set<Long>) refPayload;
                        Long[] elemsArr = elems.toArray(new Long[elems.size()]);
                        builder.append(" [");
                        for (int j = 0; j < elemsArr.length; j++) {
                            builder.append("\"");
                            builder.append(elemsArr[j]);
                            builder.append("\"");
                            if (j != elemsArr.length - 1) {
                                builder.append(",");
                            }
                        }
                        builder.append("]");
                    }
                    nbElemPrinted++;
                    if (nbElemPrinted < nbElemToPrint) {
                        builder.append(",");
                    }
                    builder.append("\n");
                }
            }
        }
        if (endline) {
            builder.append("\t}\n");
        } else {
            builder.append("\t}");
        }

        return builder.toString();
    }


}
