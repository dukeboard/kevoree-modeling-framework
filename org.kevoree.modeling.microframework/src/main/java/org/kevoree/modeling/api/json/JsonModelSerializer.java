package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelVisitor;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.VisitResult;
import org.kevoree.modeling.api.data.AccessMode;
import java.util.Set;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 11:08
 */

public class JsonModelSerializer /*implements ModelSerializer*/ {

    public static final String KEY_META = "@meta";

    public static final String KEY_UUID = "@uuid";

    public static final String KEY_ROOT = "@root";

    public static final String PARENT_META = "@parent";

    public static final String PARENT_REF_META = "@ref";

    public static final String INBOUNDS_META = "@inbounds";

    //@Override
    public static void serialize(KObject model, final ThrowableCallback<String> callback) {
        final StringBuilder builder = new StringBuilder();
        builder.append("[\n");
        printJSON(model, builder);
        model.graphVisit(new ModelVisitor() {
            @Override
            public VisitResult visit(KObject elem) {
                builder.append(",");
                printJSON(elem, builder);
                return VisitResult.CONTINUE;
            }
        }, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                builder.append("]\n");
                callback.on(builder.toString(),throwable);
            }
        });
    }

    public static void printJSON(KObject elem, StringBuilder builder) {
        builder.append("{\n");
        builder.append("\t\"" + KEY_META + "\" : \"");
        builder.append(elem.metaClass().metaName());
        builder.append("\",\n");
        builder.append("\t\"" + KEY_UUID + "\" : \"");
        builder.append(elem.uuid() + "");
        if (elem.isRoot()) {
            builder.append("\",\n");
            builder.append("\t\"" + KEY_ROOT + "\" : \"");
            builder.append("true");
        }
        builder.append("\",\n");
        for (int i = 0; i < elem.metaClass().metaAttributes().length; i++) {
            Object payload = elem.get(elem.metaClass().metaAttributes()[i]);
            if (payload != null) {
                builder.append("\t");
                builder.append("\"");
                builder.append(elem.metaClass().metaAttributes()[i].metaName());
                builder.append("\" : \"");
                builder.append(payload.toString());
                builder.append("\",\n");
            }
        }
        for (int i = 0; i < elem.metaClass().metaReferences().length; i++) {
            Object[] raw = elem.view().dimension().universe().storage().raw(elem, AccessMode.READ);
            Object payload = null;
            if (raw != null) {
                payload = raw[elem.metaClass().metaReferences()[i].index()];
            }
            if (payload != null) {
                builder.append("\t");
                builder.append("\"");
                builder.append(elem.metaClass().metaReferences()[i].metaName());
                builder.append("\" :");
                if (elem.metaClass().metaReferences()[i].single()) {
                    builder.append("\"");
                    builder.append(payload.toString());
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
                        builder.append(elemsArr[j] + "");
                        builder.append("\"");
                        isFirst = false;
                    }
                    builder.append("]");
                }
                builder.append(",\n");
            }
        }
        builder.append("}\n");
    }

}

