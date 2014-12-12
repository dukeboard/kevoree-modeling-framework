package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/08/13
 * Time: 19:52
 */

public class TraceSequence {

    private List<ModelTrace> _traces = new ArrayList<ModelTrace>();

    public ModelTrace[] traces() {
        return _traces.toArray(new ModelTrace[_traces.size()]);
    }

    public TraceSequence populate(List<ModelTrace> addtraces) {
        _traces.addAll(addtraces);
        return this;
    }

    public TraceSequence append(TraceSequence seq) {
        _traces.addAll(seq._traces);
        return this;
    }

    /*
    public TraceSequence parse(String addtracesTxt) throws Exception {
        Lexer lexer = new Lexer(addtracesTxt);
        JsonToken currentToken = lexer.nextToken();
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
                    srcFound = JsonString.unescape(srcFound);
                    _traces.add(new ModelSetTrace(Long.parseLong(srcFound), new UnresolvedMetaAttribute(keys.get(ModelTraceConstants.meta.toString())), JsonString.unescape(keys.get(ModelTraceConstants.content.toString()))));
                }
                if (traceTypeRead.equals(KActionType.ADD.toString())) {
                    String srcFound = keys.get(ModelTraceConstants.src.toString());
                    srcFound = JsonString.unescape(srcFound);
                    _traces.add(new ModelAddTrace(Long.parseLong(srcFound), new UnresolvedMetaReference(keys.get(ModelTraceConstants.meta.toString())), Long.parseLong(keys.get(ModelTraceConstants.previouspath.toString())), new UnresolvedMetaClass(keys.get(ModelTraceConstants.typename.toString()))));
                }
                if (traceTypeRead.equals(KActionType.REMOVE.toString())) {
                    String srcFound = keys.get(ModelTraceConstants.src.toString());
                    srcFound = JsonString.unescape(srcFound);
                    _traces.add(new ModelRemoveTrace(Long.parseLong(srcFound), new UnresolvedMetaReference(keys.get(ModelTraceConstants.meta.toString())), Long.parseLong(keys.get(ModelTraceConstants.objpath.toString()))));
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
        for (int i = 0; i < _traces.size(); i++) {
            ModelTrace trace = _traces.get(i);
            if (!isFirst) {
                buffer.append(",\n");
            }
            buffer.append(trace);
            isFirst = false;
        }
        buffer.append("]");
        return buffer.toString();
    }*/

    public boolean applyOn(KObject target, Callback<Throwable> callback) {
        ModelTraceApplicator traceApplicator = new ModelTraceApplicator(target);
        traceApplicator.applyTraceSequence(this, callback);
        //TODO implements the result
        return true;
    }

    public TraceSequence reverse() {
        Collections.reverse(_traces);
        return this;
    }

    public int size() {
        return _traces.size();
    }

}