package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.json.JSONString;
import org.kevoree.modeling.api.json.Lexer;
import org.kevoree.modeling.api.json.Token;
import org.kevoree.modeling.api.json.Type;
import org.kevoree.modeling.api.util.ActionType;
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

    List<ModelTrace> traces = new ArrayList<ModelTrace>();

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

        String previousControlSrc = null;
        String previousControlTypeName = null;
        Lexer lexer = new Lexer(inputStream);
        Token currentToken = lexer.nextToken();
        if (currentToken.getTokenType() != Type.LEFT_BRACKET) {
            throw new Exception("Bad Format : expect [");
        }
        currentToken = lexer.nextToken();
        Map<String, String> keys = new HashMap<String, String>();
        String previousName = null;
        while (currentToken.getTokenType() != Type.EOF && currentToken.getTokenType() != Type.RIGHT_BRACKET) {
            if (currentToken.getTokenType() == Type.LEFT_BRACE) {
                keys.clear();
            }
            if (currentToken.getTokenType() == Type.VALUE) {
                if (previousName != null) {
                    keys.put(previousName, currentToken.getValue().toString());
                    previousName = null;
                } else {
                    previousName = currentToken.getValue().toString();
                }
            }

            if (currentToken.getTokenType() == Type.RIGHT_BRACE) {
                String traceTypeRead = keys.get(ModelTraceConstants.traceType.toString());
                if (traceTypeRead == null) {
                    traceTypeRead = previousControlTypeName;
                }
                if (traceTypeRead.equals(ActionType.CONTROL.toString())) {
                    String src = keys.get(ModelTraceConstants.src.toString());
                    if (src != null) {
                        previousControlSrc = JSONString.unescape(src);
                    }
                    String globalTypeName = keys.get(ModelTraceConstants.refname.toString());
                    if (globalTypeName != null) {
                        previousControlTypeName = globalTypeName;
                    }
                }
                if (traceTypeRead.equals(ActionType.SET.toString())) {
                    String srcFound = keys.get(ModelTraceConstants.src.toString());
                    if (srcFound == null) {
                        srcFound = previousControlSrc;
                    } else {
                        srcFound = JSONString.unescape(srcFound);
                    }
                    traces.add(new ModelSetTrace(srcFound, keys.get(ModelTraceConstants.refname.toString()), JSONString.unescape(keys.get(ModelTraceConstants.objpath.toString())), JSONString.unescape(keys.get(ModelTraceConstants.content.toString())), JSONString.unescape(keys.get(ModelTraceConstants.typename.toString()))));
                }
                if (traceTypeRead.equals(ActionType.ADD.toString())) {
                    String srcFound = keys.get(ModelTraceConstants.src.toString());
                    if (srcFound == null) {
                        srcFound = previousControlSrc;
                    } else {
                        srcFound = JSONString.unescape(srcFound);
                    }
                    traces.add(new ModelAddTrace(srcFound, keys.get(ModelTraceConstants.refname.toString()), JSONString.unescape(keys.get(ModelTraceConstants.previouspath.toString())), keys.get(ModelTraceConstants.typename.toString())));
                }
                /*
                if (traceTypeRead.equals(ActionType.ADD_ALL.toString())) {
                    String srcFound = keys.get(ModelTraceConstants.src.toString());
                    if (srcFound == null) {
                        srcFound = previousControlSrc;
                    } else {
                        srcFound = JSONString.unescape(srcFound);
                    }
                    traces.add(new ModelAddAllTrace(srcFound, keys.get(ModelTraceConstants.refname.toString()), JSONString.unescape(keys.get(ModelTraceConstants.content.toString())).split(";"), JSONString.unescape(keys.get(ModelTraceConstants.typename.toString())).split(";")));
                }
                */
                if (traceTypeRead.equals(ActionType.RENEW_INDEX.toString())) {
                }
                /*
                if (traceTypeRead.equals(ActionType.REMOVE_ALL.toString())) {
                    String srcFound = keys.get(ModelTraceConstants.src.toString());
                    if (srcFound == null) {
                        srcFound = previousControlSrc;
                    } else {
                        srcFound = JSONString.unescape(srcFound);
                    }
                    traces.add(new ModelRemoveAllTrace(srcFound, keys.get(ModelTraceConstants.refname.toString())));
                }
                */
                if (traceTypeRead.equals(ActionType.REMOVE.toString())) {
                    String srcFound = keys.get(ModelTraceConstants.src.toString());
                    if (srcFound == null) {
                        srcFound = previousControlSrc;
                    } else {
                        srcFound = JSONString.unescape(srcFound);
                    }
                    traces.add(new ModelRemoveTrace(srcFound, keys.get(ModelTraceConstants.refname.toString()), JSONString.unescape(keys.get(ModelTraceConstants.objpath.toString()))));
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
        String previousSrc = null;
        String previousType = null;
        for (ModelTrace trace : traces) {
            if (!isFirst) {
                buffer.append(",\n");
            }
            if (previousSrc == null || !(previousSrc.equals(trace.getSrcPath()))) {
                buffer.append(new ModelControlTrace(trace.getSrcPath(), null).toString());
                buffer.append(",\n");
                previousSrc = trace.getSrcPath();
            }
            if (previousType == null || !(previousType.equals(trace.getTraceType().toString()))) {
                buffer.append(new ModelControlTrace("", trace.getTraceType().toString()).toString());
                buffer.append(",\n");
                previousType = trace.getTraceType().toString();
            }
            buffer.append(trace.toCString(false, false));
            isFirst = false;
        }
        buffer.append("]");
        return buffer.toString();
    }

    public String toVerboseString() {
        StringBuilder buffer = new StringBuilder();
        buffer.append("[");
        boolean isFirst = true;
        for (ModelTrace trace : traces) {
            if (!isFirst) {
                buffer.append(",\n");
            }
            buffer.append(trace.toString());
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

    public boolean silentlyApplyOn(KObject target, Callback<Throwable> callback) {
        ModelTraceApplicator traceApplicator = new ModelTraceApplicator(target);
        traceApplicator.setFireEvents(false);
        traceApplicator.applyTraceSequence(this, callback);
        return true;
    }

    public TraceSequence reverse() {
        Collections.reverse(traces);
        return this;
    }

}