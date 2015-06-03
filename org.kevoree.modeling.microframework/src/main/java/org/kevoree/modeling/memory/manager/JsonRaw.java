package org.kevoree.modeling.memory.manager;

import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.abs.AbstractMetaAttribute;
import org.kevoree.modeling.abs.AbstractMetaReference;
import org.kevoree.modeling.memory.KCacheElementSegment;
import org.kevoree.modeling.memory.struct.segment.HeapCacheSegment;
import org.kevoree.modeling.format.json.JsonFormat;
import org.kevoree.modeling.format.json.JsonObjectReader;
import org.kevoree.modeling.meta.Meta;
import org.kevoree.modeling.meta.MetaAttribute;
import org.kevoree.modeling.meta.MetaClass;
import org.kevoree.modeling.meta.MetaModel;
import org.kevoree.modeling.meta.MetaType;
import org.kevoree.modeling.meta.PrimitiveTypes;

public class JsonRaw {

    public static boolean decode(String payload, long now, MetaModel metaModel, final HeapCacheSegment entry) {
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
            MetaClass metaClass = metaModel.metaClassByName(objectReader.get(JsonFormat.KEY_META).toString());
            //Init the Raw manager
            entry.init(metaClass);
            //Now Fill the Raw Storage
            String[] metaKeys = objectReader.keys();
            for (int i = 0; i < metaKeys.length; i++) {
                Meta metaElement = metaClass.metaByName(metaKeys[i]);
                Object insideContent = objectReader.get(metaKeys[i]);
                if (insideContent != null) {
                    if (metaElement != null && metaElement.metaType().equals(MetaType.ATTRIBUTE)) {
                        entry.set(metaElement.index(), ((AbstractMetaAttribute) metaElement).strategy().load(insideContent.toString(), (AbstractMetaAttribute) metaElement, now), metaClass);
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
                            entry.set(metaElement.index(), convertedRaw, metaClass);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }

            }
            entry.setClean(metaModel);
            return true;
        }
    }

    /**
     * @native ts
     * var builder = {};
     * builder[org.kevoree.modeling.format.json.JsonFormat.KEY_META] = p_metaClass.metaName();
     * if(uuid != null){ builder[org.kevoree.modeling.format.json.JsonFormat.KEY_UUID] = uuid; }
     * if(isRoot){ builder[org.kevoree.modeling.format.json.JsonFormat.KEY_ROOT] = true; }
     * var metaElements = p_metaClass.metaElements();
     * var payload_res;
     * for (var i = 0; i < metaElements.length; i++) {
     * payload_res = raw.get(metaElements[i].index(),p_metaClass);
     * if(payload_res != null && payload_res !== undefined){
     * if (metaElements[i] != null && metaElements[i].metaType() === org.kevoree.modeling.meta.MetaType.ATTRIBUTE) {
     * if(metaElements[i]['attributeType']() != org.kevoree.modeling.meta.PrimitiveTypes.TRANSIENT){
     * var attrsPayload = metaElements[i]['strategy']().save(payload_res, metaElements[i]);
     * builder[metaElements[i].metaName()] = attrsPayload;
     * }
     * } else {
     * builder[metaElements[i].metaName()] = payload_res;
     * }
     * }
     * }
     * return JSON.stringify(builder);
     */
    public static String encode(KCacheElementSegment raw, long uuid, MetaClass p_metaClass, boolean isRoot) {
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
        Meta[] metaElements = p_metaClass.metaElements();
        for (int i = 0; i < metaElements.length; i++) {
            Meta loopMeta = metaElements[i];
            if (loopMeta != null && loopMeta.metaType().equals(MetaType.ATTRIBUTE)) {
                //check infer or not
                Object payload_res = raw.get(loopMeta.index(), p_metaClass);
                if (payload_res != null) {
                    if (((MetaAttribute) loopMeta).attributeType() != PrimitiveTypes.TRANSIENT) {
                        String attrsPayload = ((MetaAttribute) loopMeta).strategy().save(payload_res, (MetaAttribute) loopMeta);
                        if (attrsPayload != null) {
                            builder.append(",\"");
                            builder.append(loopMeta.metaName());
                            builder.append("\":\"");
                            builder.append(attrsPayload);
                            builder.append("\"");
                        }
                    }
                }
            } else if (loopMeta != null && loopMeta.metaType().equals(MetaType.REFERENCE)) {
                long[] refPayload = raw.getRef(loopMeta.index(), p_metaClass);
                if (refPayload != null) {
                    builder.append(",\"");
                    builder.append(loopMeta.metaName());
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
