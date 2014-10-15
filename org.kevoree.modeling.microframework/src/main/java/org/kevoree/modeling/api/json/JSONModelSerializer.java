package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelSerializer;
import org.kevoree.modeling.api.ModelVisitor;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.util.Converters;

import java.io.*;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 11:08
 */


/*
class ModelReferenceVisitor extends ModelVisitor {
    private PrintStream out;
    boolean isFirst = true;

    public ModelReferenceVisitor(PrintStream out) {
        this.out = out;
    }


    @Override
    public void visit(KObject elem, MetaReference currentReference, KObject parent, Callback<Result> visitor) {
        if (!isFirst) {
            out.print(",");
        } else {
            isFirst = false;
        }
        out.print("\"" + elem.path() + "\"");
        visitor.on(Result.CONTINUE);
    }

    @Override
    public void beginVisitRef(MetaReference currentreference, Callback<Result> visitor) {
        out.print(",\"" + currentreference.metaName() + "\":[");
        isFirst = true;
        visitor.on(Result.CONTINUE);
    }

    @Override
    public void endVisitRef(MetaReference currentreference, Callback<Result> visitor) {
        out.print("]");
        visitor.on(Result.CONTINUE);
    }

}*/

public class JSONModelSerializer implements ModelSerializer {

    @Override
    public void serialize(KObject model, final Callback<String> callback, final Callback<Throwable> error) {
        /*

        final ByteArrayOutputStream outstream = new ByteArrayOutputStream();
        serializeToStream(model, outstream, new Callback<Throwable>() {
            @Override
            public void on(Throwable e) {
                try {
                    outstream.close();
                    if (e == null) {
                        callback.on(outstream.toString());
                    } else {
                        error.on(e);
                    }
                } catch (IOException e2) {
                    error.on(e2);
                }
            }
        });
        */
    }

    @Override
    public void serializeToStream(KObject model, OutputStream raw, Callback<Throwable> error) {

        /*
        final PrintStream out = new PrintStream(new BufferedOutputStream(raw), false);

        //visitor for printing reference
        final ModelReferenceVisitor internalReferenceVisitor = new ModelReferenceVisitor(out);
        //Visitor for Model navigation
        ModelVisitor masterVisitor = new ModelVisitor() {
            boolean isFirstInRef = true;

            @Override
            public void beginVisitElem(KObject elem, Callback<Result> visitor) {
                if (!isFirstInRef) {
                    out.print(",");
                    isFirstInRef = false;
                }
                printAttName(elem, out);
                elem.visitNotContained(internalReferenceVisitor, visitor);
            }

            @Override
            public void endVisitElem(KObject elem, Callback<Result> visitor) {
                out.println("}");
                isFirstInRef = false;
                visitor.on(Result.CONTINUE);
            }

            @Override
            public void beginVisitRef(MetaReference currentreference, Callback<Result> visitor) {
                out.print(",\"" + currentreference.metaName() + "\":[");
                isFirstInRef = true;
                visitor.on(Result.CONTINUE);
            }

            @Override
            public void endVisitRef(MetaReference currentreference, Callback<Result> visitor) {
                out.print("]");
                isFirstInRef = false;
            }

            @Override
            public void visit(KObject elem, MetaReference currentReference, KObject parent, Callback<Result> visitor) {
                visitor.on(Result.CONTINUE);
            }
        };
        model.deepVisitContained(masterVisitor, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                out.flush();
                error.on(throwable);
            }
        });
        */
    }

    private void printAttName(KObject elem, final PrintStream out) {
        String isRoot = "";
        if (elem.path().equals("/")) {
            isRoot = "root:";
        }
        out.print("\n{\"class\":\"" + isRoot + elem.metaClass().metaName() + "@" + elem.key() + "\"");
        elem.visitAttributes((name, value) -> {
            if (value != null) {
                out.print(",\"" + name + "\":\"");
                if (value instanceof java.util.Date) {
                    JSONString.encode(out, "" + ((java.util.Date) value).getTime());
                } else {
                    JSONString.encode(out, Converters.convFlatAtt(value));
                }
                out.print("\"");
            }
        });
    }

}

