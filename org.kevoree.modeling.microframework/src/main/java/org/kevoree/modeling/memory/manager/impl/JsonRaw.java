package org.kevoree.modeling.memory.manager.impl;

import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.meta.impl.MetaAttribute;
import org.kevoree.modeling.meta.impl.MetaReference;
import org.kevoree.modeling.memory.struct.segment.KMemorySegment;
import org.kevoree.modeling.memory.struct.segment.impl.HeapMemorySegment;
import org.kevoree.modeling.format.json.JsonFormat;
import org.kevoree.modeling.format.json.JsonObjectReader;
import org.kevoree.modeling.meta.KMeta;
import org.kevoree.modeling.meta.KMetaAttribute;
import org.kevoree.modeling.meta.KMetaClass;
import org.kevoree.modeling.meta.KMetaModel;
import org.kevoree.modeling.meta.MetaType;
import org.kevoree.modeling.meta.KPrimitiveTypes;

public class JsonRaw {

    public static boolean decode(String payload, long now, KMetaModel metaModel, final HeapMemorySegment entry) {
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
            KMetaClass metaClass = metaModel.metaClassByName(objectReader.get(JsonFormat.KEY_META).toString());
            //Init the Raw manager
            entry.init(metaClass);
            //Now Fill the Raw Storage
            String[] metaKeys = objectReader.keys();
            for (int i = 0; i < metaKeys.length; i++) {
                KMeta metaElement = metaClass.metaByName(metaKeys[i]);
                Object insideContent = objectReader.get(metaKeys[i]);
                if (insideContent != null) {
                    if (metaElement != null && metaElement.metaType().equals(MetaType.ATTRIBUTE)) {
                        entry.set(metaElement.index(), ((MetaAttribute) metaElement).strategy().load(insideContent.toString(), (MetaAttribute) metaElement, now), metaClass);
                    } else if (metaElement != null && metaElement instanceof MetaReference) {

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
     * if(metaElements[i]['attributeType']() != org.kevoree.modeling.meta.KPrimitiveTypes.TRANSIENT){
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
    public static String encode(KMemorySegment raw, long uuid, KMetaClass p_metaClass, boolean isRoot) {
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
        KMeta[] metaElements = p_metaClass.metaElements();
        for (int i = 0; i < metaElements.length; i++) {
            KMeta loopMeta = metaElements[i];
            if (loopMeta != null && loopMeta.metaType().equals(MetaType.ATTRIBUTE)) {
                //check infer or not
                Object payload_res = raw.get(loopMeta.index(), p_metaClass);
                if (payload_res != null) {
                    if (((KMetaAttribute) loopMeta).attributeType() != KPrimitiveTypes.TRANSIENT) {
                        String attrsPayload = ((KMetaAttribute) loopMeta).strategy().save(payload_res, (KMetaAttribute) loopMeta);
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