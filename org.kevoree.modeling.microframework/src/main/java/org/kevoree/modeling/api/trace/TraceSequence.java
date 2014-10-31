package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.json.JSONString;
import org.kevoree.modeling.api.json.Lexer;
import org.kevoree.modeling.api.json.Token;
import org.kevoree.modeling.api.json.Type;
import org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaAttribute;
import org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaClass;
import org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaReference;
import org.kevoree.modeling.api.util.Converters;

import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/08/13
 * Time: 19:52
 */

public class TraceSequence {

    public TraceSequence() {
    }

    public ModelTrace[] traces() {
        return traces.toArray(new ModelTrace[traces.size()]);
    }

    private List<ModelTrace> traces = new ArrayList<ModelTrace>();

    public TraceSequence populate(List<ModelTrace> addtraces) {
        traces.addAll(addtraces);
        return this;
    }

    public TraceSequence append(TraceSequence seq) {
        traces.addAll(seq.traces);
        return this;
    }

    public TraceSequence populateFromString(String addtracesTxt) throws Exception {
        return populateFromStream(Converters.byteArrayInputStreamFromString(addtracesTxt));
    }

    public TraceSequence populateFromStream(java.io.InputStream inputStream) throws Exception {
        Lexer lexer = new Lexer(inputStream);
        Token currentToken = lexer.nextToken();
        if (currentToken.tokenType() != Type.LEFT_BRACKET) {
            throw new Exception("Bad Format : expect [");
        }
        currentToken = lexer.nextToken();
        Map<String, String> keys = new HashMap<String, String>();
        String previousName = null;
        while (currentToken.tokenType() != Type.EOF && currentToken.tokenType() != Type.RIGHT_BRACKET) {
            if (currentToken.tokenType() == Type.LEFT_BRACE) {
                keys.clear();
            }
            if (currentToken.tokenType() == Type.VALUE) {
                if (previousName != null) {
                    keys.put(previousName, currentToken.value().toString());
                    previousName = null;
                } else {
                    previousName = currentToken.value().toString();
                }
            }
            if (currentToken.tokenType() == Type.RIGHT_BRACE) {
                String traceTypeRead = keys.get(ModelTraceConstants.traceType.toString());
                if (traceTypeRead.equals(KActionType.SET.toString())) {
                    String srcFound = keys.get(ModelTraceConstants.src.toString());
                    srcFound = JSONString.unescape(srcFound);
                    traces.add(new ModelSetTrace(Long.parseLong(srcFound), new UnresolvedMetaAttribute(keys.get(ModelTraceConstants.meta.toString())), JSONString.unescape(keys.get(ModelTraceConstants.content.toString()))));
                }
                if (traceTypeRead.equals(KActionType.ADD.toString())) {
                    String srcFound = keys.get(ModelTraceConstants.src.toString());
                    srcFound = JSONString.unescape(srcFound);
                    traces.add(new ModelAddTrace(Long.parseLong(srcFound), new UnresolvedMetaReference(keys.get(ModelTraceConstants.meta.toString())), Long.parseLong(keys.get(ModelTraceConstants.previouspath.toString())), new UnresolvedMetaClass(keys.get(ModelTraceConstants.typename.toString()))));
                }
                if (traceTypeRead.equals(KActionType.REMOVE.toString())) {
                    String srcFound = keys.get(ModelTraceConstants.src.toString());
                    srcFound = JSONString.unescape(srcFound);
                    traces.add(new ModelRemoveTrace(Long.parseLong(srcFound), new UnresolvedMetaReference(keys.get(ModelTraceConstants.meta.toString())), Long.parseLong(keys.get(ModelTraceConstants.objpath.toString()))));
                }
            }
            currentToken = lexer.nextToken();
        }
        return this;
    }

    @Override
    public String toString() {
        StringBuilder buffer = new StringBuilder();
        buffer.append("[");
        boolean isFirst = true;
        for (ModelTrace trace : traces) {
            if (!isFirst) {
                buffer.append(",\n");
            }
            buffer.append(trace);
            isFirst = false;
        }
        buffer.append("]");
        return buffer.toString();
    }

    public boolean applyOn(KObject target, Callback<Throwable> callback) {
        ModelTraceApplicator traceApplicator = new ModelTraceApplicator(target);
        traceApplicator.applyTraceSequence(this, callback);
        //TODO implements the result
        return true;
    }

    public TraceSequence reverse() {
        Collections.reverse(traces);
        return this;
    }

}