package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.data.Index;
import org.kevoree.modeling.api.extrapolation.ExtrapolationModel;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;

import java.util.Set;

/**
 * Created by duke on 11/25/14.
 */
public class JsonRaw {

    public static String encode(boolean isRawJson, Object[] raw, long uuid) {
        MetaClass metaClass = (MetaClass) raw[Index.META_CLASS_INDEX];
        MetaReference[] metaReferences = metaClass.metaReferences();
        MetaAttribute[] metaAttributes = metaClass.metaAttributes();

        StringBuilder builder = new StringBuilder();
        builder.append("{\n");
        builder.append("\t\"" + JsonModelSerializer.KEY_META + "\" : \"");
        builder.append(metaClass.metaName());
        builder.append("\",\n");
        builder.append("\t\"" + JsonModelSerializer.KEY_UUID + "\" : \"");
        builder.append(uuid);
        if (raw[Index.IS_ROOT_INDEX] instanceof Boolean && (Boolean) raw[Index.IS_ROOT_INDEX]) {
            builder.append("\",\n");
            builder.append("\t\"" + JsonModelSerializer.KEY_ROOT + "\" : \"");
            builder.append("true");
        }
        builder.append("\",\n");
        for (int i = 0; i < metaAttributes.length; i++) {
            String payload = null;
            Object payload_res = raw[metaAttributes[i].index()];
            if (payload_res instanceof ExtrapolationModel) {
                payload = ((ExtrapolationModel) payload_res).save();
            } else {
                if (payload_res != null) {
                    payload = payload_res.toString();
                }
            }
            if (payload != null) {
                builder.append("\t");
                builder.append("\"");
                builder.append(metaAttributes[i].metaName());
                builder.append("\":\"");
                builder.append(payload);
                builder.append("\",\n");
            }
        }
        for (int i = 0; i < metaReferences.length; i++) {
            Object payload = raw[metaReferences[i].index()];
            if (payload != null) {
                builder.append("\t");
                builder.append("\"");
                builder.append(metaReferences[i].metaName());
                builder.append("\":");
                if (metaReferences[i].single()) {
                    builder.append("\"");
                    builder.append(payload);
                    builder.append("\"");
                } else {
                    Set<Long> elems = (Set<Long>) payload;
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
