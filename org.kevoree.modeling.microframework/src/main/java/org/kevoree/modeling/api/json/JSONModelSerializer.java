package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.util.Converters;

import java.io.*;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 11:08
 */


class ModelReferenceVisitor extends ModelVisitor {
    private PrintStream out;
    boolean isFirst = true;

    public ModelReferenceVisitor(PrintStream out) {
        this.out = out;
    }


    @Override
    public void visit(KObject elem, MetaReference currentReference, KObject parent, Callback<Throwable> continueVisit) {
        if (!isFirst) {
            out.print(",");
        } else {
            isFirst = false;
        }
        out.print("\"" + elem.path() + "\"");
        continueVisit.on(null);
    }

    @Override
    public void beginVisitRef(MetaReference currentreference, Callback<Throwable> continueVisit, Callback<Boolean> skipElem) {
        out.print(",\"" + currentreference.metaName() + "\":[");
        isFirst = true;
        continueVisit.on(null);
    }

    @Override
    public void endVisitRef(String refName, Callback<Throwable> continueVisit) {
        out.print("]");
        continueVisit.on(null);
    }

}

public class JSONModelSerializer implements ModelSerializer {

    @Override
    public void serialize(KObject model, final Callback<String> callback, final Callback<Throwable> error) {
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
    }

    @Override
    public void serializeToStream(KObject model, OutputStream raw, Callback<Throwable> error) {
        final PrintStream out = new PrintStream(new BufferedOutputStream(raw), false);

        //visitor for printing reference
        final ModelReferenceVisitor internalReferenceVisitor = new ModelReferenceVisitor(out);
        //Visitor for Model navigation
        ModelVisitor masterVisitor = new ModelVisitor() {
            boolean isFirstInRef = true;

            @Override
            public void beginVisitElem(KObject elem, Callback<Throwable> continueVisit, Callback<Boolean> skipElem) {
                if (!isFirstInRef) {
                    out.print(",");
                    isFirstInRef = false;
                }
                printAttName(elem, out);
                elem.visitNotContained(internalReferenceVisitor,continueVisit);
            }

            @Override
            public void endVisitElem(KObject elem, Callback<Throwable> continueVisit) {
                out.println("}");
                isFirstInRef = false;
                continueVisit.on(null);
            }

            @Override
            public void beginVisitRef(MetaReference currentreference, Callback<Throwable> continueVisit, Callback<Boolean> skipElem) {
                out.print(",\"" + currentreference.metaName() + "\":[");
                isFirstInRef = true;
                continueVisit.on(null);
            }

            @Override
            public void endVisitRef(String refName, Callback<Throwable> continueVisit) {
                out.print("]");
                isFirstInRef = false;
            }

            @Override
            public void visit(KObject elem, MetaReference currentReference, KObject parent, Callback<Throwable> continueVisit) {

            }
        };
        model.deepVisitContained(masterVisitor,new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                out.flush();
                error.on(throwable);
            }
        });
    }

    private void printAttName(KObject elem, final PrintStream out) {
        String isRoot = "";
        if (elem.path().equals("/")) {
            isRoot = "root:";
        }
        out.print("\n{\"class\":\"" + isRoot + elem.metaClass().metaName() + "@" + elem.key() + "\"");
        elem.visitAttributes((name,value)->{
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

