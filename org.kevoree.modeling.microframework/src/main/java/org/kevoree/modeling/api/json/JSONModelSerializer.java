package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelSerializer;
import org.kevoree.modeling.api.ModelVisitor;
import org.kevoree.modeling.api.data.KStore;

import java.io.*;
import java.util.Set;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 11:08
 */

public class JSONModelSerializer implements ModelSerializer {

    public static final String keyMeta = "@meta";

    public static final String keyKid = "@uuid";

    public static final String keyRoot = "@root";

    @Override
    public void serialize(KObject model, final Callback<String> callback) {
        final ByteArrayOutputStream outstream = new ByteArrayOutputStream();
        serializeToStream(model, outstream, new Callback<Throwable>() {
            @Override
            public void on(Throwable e) {
                try {
                    outstream.close();
                    if (e == null) {
                        callback.on(outstream.toString());
                    } else {
                        callback.on(null);
                    }
                } catch (IOException e2) {
                    callback.on(null);
                }
            }
        });
    }

    @Override
    public void serializeToStream(KObject model, OutputStream raw, Callback<Throwable> error) {
        final PrintStream out = new PrintStream(new BufferedOutputStream(raw), false);
        out.print("[\n");
        printJSON(model, out);
        model.graphVisit(new ModelVisitor() {
            @Override
            public VisitResult visit(KObject elem) {
                out.print(",");
                printJSON(elem, out);
                return ModelVisitor.VisitResult.CONTINUE;
            }
        }, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                out.print("]\n");
                out.flush();
                error.on(null);
            }
        });
    }


    public static void printJSON(KObject elem, PrintStream builder) {
        builder.append("{\n");
        builder.append("\t\"" + keyMeta + "\" : \"");
        builder.append(elem.metaClass().metaName());
        builder.append("\",\n");
        builder.append("\t\"" + keyKid + "\" : \"");
        builder.append(elem.uuid() + "");
        if (elem.isRoot()) {
            builder.append("\",\n");
            builder.append("\t\"" + keyRoot + "\" : \"");
            builder.append("true");
        }
        builder.append("\",\n");
        for (int i = 0; i < elem.metaAttributes().length; i++) {
            Object payload = elem.get(elem.metaAttributes()[i]);
            if (payload != null) {
                builder.append("\t");
                builder.append("\"");
                builder.append(elem.metaAttributes()[i].metaName());
                builder.append("\" : \"");
                builder.append(payload.toString());
                builder.append("\",\n");
            }
        }
        for (int i = 0; i < elem.metaReferences().length; i++) {
            Object[] raw = elem.view().dimension().universe().storage().raw(elem, KStore.AccessMode.READ);
            Object payload = null;
            if (raw != null) {
                payload = raw[elem.metaReferences()[i].index()];
            }
            if (payload != null) {
                builder.append("\t");
                builder.append("\"");
                builder.append(elem.metaReferences()[i].metaName());
                builder.append("\" :");
                if (elem.metaReferences()[i].single()) {
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
        // int lastcomma = builder.lastIndexOf(",");
        //  builder.setCharAt(lastcomma, ' ');
        builder.append("}\n");
    }

}

