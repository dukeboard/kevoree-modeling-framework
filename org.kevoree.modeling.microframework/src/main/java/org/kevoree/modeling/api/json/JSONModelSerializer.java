package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.*;
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
    public boolean beginVisitRef(String refName, String refType) {
        out.print(",\"" + refName + "\":[");
        isFirst = true;
        return true;
    }

    @Override
    public void endVisitRef(String refName) {
        out.print("]");
    }

    @Override
    public void visit(KObject elem, String refNameInParent, KObject parent) {
        if (!isFirst) {
            out.print(",");
        } else {
            isFirst = false;
        }
        out.print("\"" + elem.path() + "\"");
    }
}

public class JSONModelSerializer implements ModelSerializer {

    @Override
    public void serialize(KObject model, final Callback<String> callback, final Callback<Exception> error) {
        final ByteArrayOutputStream outstream = new ByteArrayOutputStream();
        serializeToStream(model, outstream, new Callback<Boolean>() {
            @Override
            public void on(Boolean p) {
                try {
                    outstream.close();
                    if (p) {
                        callback.on(outstream.toString());
                    } else {
                        error.on(new Exception("Unknown error while model serialization !"));
                    }

                } catch (IOException e) {
                    error.on(e);
                }
            }
        }, error);
    }

    @Override
    public void serializeToStream(KObject model, OutputStream raw, Callback<Boolean> callback, Callback<Exception> error) {
        final PrintStream out = new PrintStream(new BufferedOutputStream(raw), false);

        //visitor for printing reference
        final ModelReferenceVisitor internalReferenceVisitor = new ModelReferenceVisitor(out);
        //Visitor for Model navigation
        ModelVisitor masterVisitor = new ModelVisitor() {
            boolean isFirstInRef = true;

            @Override
            public void visit(KObject elem, String refNameInParent, KObject parent) {

            }

            @Override
            public void beginVisitElem(KObject elem) {
                if (!isFirstInRef) {
                    out.print(",");
                    isFirstInRef = false;
                }
                printAttName(elem, out);
                internalReferenceVisitor.alreadyVisited.clear();
                elem.visitNotContained(internalReferenceVisitor);
            }

            @Override
            public void endVisitElem(KObject elem) {
                out.println("}");
                isFirstInRef = false;
            }

            @Override
            public boolean beginVisitRef(String refName, String refType) {
                out.print(",\"" + refName + "\":[");
                isFirstInRef = true;
                return true;
            }

            @Override
            public void endVisitRef(String refName) {
                out.print("]");
                isFirstInRef = false;
            }
        };
        model.deepVisitContained(masterVisitor);
        out.flush();
    }

    private void printAttName(KObject elem, final PrintStream out) {
        String isRoot = "";
        if (elem.path().equals("/")) {
            isRoot = "root:";
        }
        out.print("\n{\"class\":\"" + isRoot + elem.metaClassName() + "@" + elem.key() + "\"");
        ModelAttributeVisitor attributeVisitor = new ModelAttributeVisitor() {

            @Override
            public void visit(String name, Object value) {
                if (value != null) {
                    out.print(",\"" + name + "\":\"");
                    if (value instanceof java.util.Date) {
                        JSONString.encode(out, "" + ((java.util.Date) value).getTime());
                    } else {
                        JSONString.encode(out, new Converters().convFlatAtt(value));
                    }
                    out.print("\"");
                }
            }
        };
        elem.visitAttributes(attributeVisitor);
    }

}

