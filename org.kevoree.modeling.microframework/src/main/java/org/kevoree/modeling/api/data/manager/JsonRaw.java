package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.abs.AbstractMetaAttribute;
import org.kevoree.modeling.api.abs.AbstractMetaReference;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.json.JsonFormat;
import org.kevoree.modeling.api.json.JsonObjectReader;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaModel;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.meta.MetaType;
import org.kevoree.modeling.api.meta.PrimitiveTypes;

public class JsonRaw {

    public static final String SEP = "@";

    public static boolean decode(String payload, long now, MetaModel metaModel, final KCacheEntry entry) {
        if (payload == null) {
            return false;
        }
        JsonObjectReader objectReader = new JsonObjectReader();
        objectReader.parseObject(payload);
        //Consistency check
        if (objectReader.get(JsonFormat.KEY_META) == null) {
            return false;
        } else {
            //Init metaClass before everything
            entry.metaClass = metaModel.metaClass(objectReader.get(JsonFormat.KEY_META).toString());
            //Init the Raw manager
            entry.initRaw(Index.RESERVED_INDEXES + entry.metaClass.metaElements().length);
            //Now Fill the Raw Storage
            String[] metaKeys = objectReader.keys();
            for (int i = 0; i < metaKeys.length; i++) {
                if (metaKeys[i].equals(JsonFormat.INBOUNDS_META)) {
                    try {
                        String[] raw_keys = objectReader.getAsStringArray(metaKeys[i]);
                        long[] inbounds = new long[raw_keys.length];
                        for (int j = 0; j < raw_keys.length; j++) {
                            try {
                                inbounds[j] = Long.parseLong(raw_keys[j]);
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                        entry.set(Index.INBOUNDS_INDEX, inbounds);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else if (metaKeys[i].equals(JsonFormat.PARENT_META)) {
                    try {
                        String[] parentKeyStrings = objectReader.getAsStringArray(metaKeys[i]);
                        long[] parentKey = new long[1];
                        for (int k = 0; k < parentKeyStrings.length; k++) {
                            parentKey[0] = Long.parseLong(parentKeyStrings[k]);
                        }
                        entry.set(Index.PARENT_INDEX, parentKey);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else if (metaKeys[i].equals(JsonFormat.PARENT_REF_META)) {
                    try {
                        String raw_payload_ref = objectReader.get(metaKeys[i]).toString();
                        String[] elemsRefs = raw_payload_ref.split(SEP);
                        if (elemsRefs.length == 2) {
                            MetaClass foundMeta = metaModel.metaClass(elemsRefs[0].trim());
                            if (foundMeta != null) {
                                Meta metaReference = foundMeta.metaByName(elemsRefs[1].trim());
                                if (metaReference != null && metaReference instanceof AbstractMetaReference) {
                                    entry.set(Index.REF_IN_PARENT_INDEX, metaReference);
                                }
                            }
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else {
                    Meta metaElement = entry.metaClass.metaByName(metaKeys[i]);
                    Object insideContent = objectReader.get(metaKeys[i]);
                    if (insideContent != null) {
                        if (metaElement != null && metaElement.metaType().equals(MetaType.ATTRIBUTE)) {
                            entry.set(metaElement.index(), ((AbstractMetaAttribute) metaElement).strategy().load(insideContent.toString(), (AbstractMetaAttribute) metaElement, now));
                        } else if (metaElement != null && metaElement instanceof AbstractMetaReference) {

                            try {
                                String[] plainRawSet = objectReader.getAsStringArray(metaKeys[i]);
                                long[] convertedRaw = new long[plainRawSet.length];
                                for (int l = 0; l < plainRawSet.length; l++) {
                                    try {
                                        convertedRaw[l] = Long.parseLong(plainRawSet[l]);
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                }
                                entry.set(metaElement.index(), convertedRaw);
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                    }
                }
            }
            entry.setClean();
            return true;
        }
    }

    /**
     * @native ts
     * var builder = {};
     * builder[org.kevoree.modeling.api.json.JsonFormat.KEY_META] = p_metaClass.metaName();
     * if(uuid != null){ builder[org.kevoree.modeling.api.json.JsonFormat.KEY_UUID] = uuid; }
     * if(isRoot){ builder[org.kevoree.modeling.api.json.JsonFormat.KEY_ROOT] = true; }
     * var parentKey = raw.getRef(org.kevoree.modeling.api.data.manager.Index.PARENT_INDEX);
     * if(parentKey != null){ builder[org.kevoree.modeling.api.json.JsonFormat.PARENT_META] = parentKey; }
     * var refInParent = raw.get(org.kevoree.modeling.api.data.manager.Index.REF_IN_PARENT_INDEX);
     * if(refInParent != null){ builder[org.kevoree.modeling.api.json.JsonFormat.PARENT_REF_META] = refInParent.origin().metaName()+'@'+refInParent.metaName(); }
     * var inboundsKeys = raw.getRef(org.kevoree.modeling.api.data.manager.Index.INBOUNDS_INDEX);
     * if(inboundsKeys != null){ builder[org.kevoree.modeling.api.json.JsonFormat.INBOUNDS_META] = inboundsKeys; }
     * var metaElements = p_metaClass.metaElements();
     * var payload_res;
     * for (var i = 0; i < metaElements.length; i++) {
     * if (metaElements[i] != null && metaElements[i].metaType().equals(org.kevoree.modeling.api.meta.MetaType.ATTRIBUTE)) {
     * if(metaElements[i]['attributeType']() != org.kevoree.modeling.api.meta.PrimitiveTypes.TRANSIENT){
     *    var attrsPayload = metaElements[i]['strategy']().save(payload_res, metaElements[i]);
     *    builder[metaElements[i].metaName()] = attrsPayload;
     * }
     * } else {
     *    builder[metaElements[i].metaName()] = payload_res;
     * }
     * }
     * return JSON.stringify(builder);
     */
    public static String encode(KCacheEntry raw, long uuid, MetaClass p_metaClass, boolean isRoot) {
        StringBuilder builder = new StringBuilder();
        builder.append("{");
        builder.append("\"" + JsonFormat.KEY_META + "\":\"");
        builder.append(p_metaClass.metaName());
        builder.append("\"");
        if (uuid != KConfig.NULL_LONG) {
            builder.append(",\"" + JsonFormat.KEY_UUID + "\":");
            builder.append(uuid);
        }
        if (isRoot) {
            builder.append(",\"" + JsonFormat.KEY_ROOT + "\":true");
        }
        long[] parentKey = raw.getRef(Index.PARENT_INDEX);
        if (parentKey != null) {
            builder.append(",\"" + JsonFormat.PARENT_META + "\":[");
            boolean isFirst = true;
            for (int j = 0; j < parentKey.length; j++) {
                if (!isFirst) {
                    builder.append(",");
                }
                builder.append(parentKey[j]);
                isFirst = false;
            }
            builder.append("]");
        }
        Object refInParent = raw.get(Index.REF_IN_PARENT_INDEX);
        if (refInParent != null) {
            builder.append(",\"" + JsonFormat.PARENT_REF_META + "\":\"");
            try {
                builder.append(((MetaReference) refInParent).origin().metaName());
                builder.append(SEP);
                builder.append(((MetaReference) refInParent).metaName());
            } catch (Exception e) {
                e.printStackTrace();
            }
            builder.append("\"");
        }
        long[] inboundsKeys = raw.getRef(Index.INBOUNDS_INDEX);
        if (inboundsKeys != null) {
            builder.append(",\"" + JsonFormat.INBOUNDS_META + "\":[");
            try {
                boolean isFirst = true;
                for (int j = 0; j < inboundsKeys.length; j++) {
                    if (!isFirst) {
                        builder.append(",");
                    }
                    builder.append(inboundsKeys[j]);
                    isFirst = false;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            builder.append("]");
        }
        Meta[] metaElements = p_metaClass.metaElements();
        for (int i = 0; i < metaElements.length; i++) {
            if (metaElements[i] != null && metaElements[i].metaType().equals(MetaType.ATTRIBUTE)) {
                Object payload_res = raw.get(metaElements[i].index());
                if (payload_res != null) {
                    if (((MetaAttribute) metaElements[i]).attributeType() != PrimitiveTypes.TRANSIENT) {
                        String attrsPayload = ((MetaAttribute) metaElements[i]).strategy().save(payload_res, (MetaAttribute) metaElements[i]);
                        if (attrsPayload != null) {
                            builder.append(",\"");
                            builder.append(metaElements[i].metaName());
                            builder.append("\":\"");
                            builder.append(attrsPayload);
                            builder.append("\"");
                        }
                    }
                }
            } else if (metaElements[i] != null && metaElements[i].metaType().equals(MetaType.REFERENCE)) {
                long[] refPayload = raw.getRef(metaElements[i].index());
                if (refPayload != null) {
                    builder.append(",\"");
                    builder.append(metaElements[i].metaName());
                    builder.append("\":");
                    builder.append("[");
                    for (int j = 0; j < refPayload.length; j++) {
                        builder.append(refPayload[j]);
                        if (j != refPayload.length - 1) {
                            builder.append(",");
                        }
                    }
                    builder.append("]");
                }
            }
        }
        builder.append("}");
        return builder.toString();
    }


}
