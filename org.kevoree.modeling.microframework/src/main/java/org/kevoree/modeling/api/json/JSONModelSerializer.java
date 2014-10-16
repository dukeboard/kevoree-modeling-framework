package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelSerializer;
import org.kevoree.modeling.api.ModelVisitor;

import java.io.*;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 11:08
 */

public class JSONModelSerializer implements ModelSerializer {

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
        out.print(model.toJSON());
        model.graphVisit((elem, visitor) -> {
            out.print(",");
            out.print(elem.toJSON());
            visitor.on(ModelVisitor.Result.CONTINUE);
        }, (t) -> {
            out.print("]\n");
            out.flush();
            error.on(null);
        });
    }

}

