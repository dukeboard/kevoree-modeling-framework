package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.KFactory;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.json.Lexer;
import org.kevoree.modeling.api.json.Token;
import org.kevoree.modeling.api.json.Type;
import org.kevoree.modeling.api.util.Converters;

import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/08/13
 * Time: 19:52
 */

public class TraceSequence {

    private KFactory factory;

    public TraceSequence(KFactory factory) {
        this.factory = factory;
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
                String traceTypeRead = keys.get(ModelTraceConstants.traceType);
                if (traceTypeRead == null) {
                    traceTypeRead = previousControlTypeName;
                }
                when(traceTypeRead) {
                    ActionType.CONTROL.code->{
                        val src = keys.get(ModelTraceConstants.src)
                        if (src != null) {
                            previousControlSrc = JSONString.unescape(src) !!
                        }
                        val globalTypeName = keys.get(ModelTraceConstants.refname)
                        if (globalTypeName != null) {
                            previousControlTypeName = globalTypeName;
                        }
                    }
                    ActionType.SET.code->{
                        var srcFound = keys.get(ModelTraceConstants.src)
                        if (srcFound == null) {
                            srcFound = previousControlSrc
                        } else {
                            srcFound = JSONString.unescape(srcFound)
                        }
                        traces.add(ModelSetTrace(srcFound !!, keys.get(ModelTraceConstants.refname)
                        !!, JSONString.unescape(keys.get(ModelTraceConstants.objpath)), JSONString.unescape(keys.get(ModelTraceConstants.content)), JSONString.unescape(keys.get(ModelTraceConstants.typename))))
                        ;
                    }
                    ActionType.ADD.code->{
                        var srcFound = keys.get(ModelTraceConstants.src)
                        if (srcFound == null) {
                            srcFound = previousControlSrc
                        } else {
                            srcFound = JSONString.unescape(srcFound)
                        }
                        traces.add(ModelAddTrace(srcFound !!, keys.get(ModelTraceConstants.refname)
                        !!, JSONString.unescape(keys.get(ModelTraceConstants.previouspath) !!),
                        keys.get(ModelTraceConstants.typename)));
                    }
                    ActionType.ADD_ALL.code->{
                        var srcFound = keys.get(ModelTraceConstants.src)
                        if (srcFound == null) {
                            srcFound = previousControlSrc
                        } else {
                            srcFound = JSONString.unescape(srcFound)
                        }
                        traces.add(ModelAddAllTrace(srcFound !!, keys.get(ModelTraceConstants.refname)
                        !!, JSONString.unescape(keys.get(ModelTraceConstants.content)) ?.split(";") ?.
                        toList(), JSONString.unescape(keys.get(ModelTraceConstants.typename)) ?.split(";") ?.toList()));
                    }
                    ActionType.REMOVE.code->{
                        var srcFound = keys.get(ModelTraceConstants.src)
                        if (srcFound == null) {
                            srcFound = previousControlSrc
                        } else {
                            srcFound = JSONString.unescape(srcFound)
                        }
                        traces.add(ModelRemoveTrace(srcFound !!, keys.get(ModelTraceConstants.refname)
                        !!, JSONString.unescape(keys.get(ModelTraceConstants.objpath) !!)!!));
                    }
                    ActionType.REMOVE_ALL.code->{
                        var srcFound = keys.get(ModelTraceConstants.src)
                        if (srcFound == null) {
                            srcFound = previousControlSrc
                        } else {
                            srcFound = JSONString.unescape(srcFound)
                        }
                        traces.add(ModelRemoveAllTrace(srcFound !!, keys.get(ModelTraceConstants.refname) !!));
                    }
                    ActionType.RENEW_INDEX.code->{
                    }
                    else->{
                        println("Trace lost !!!")
                    }
                }
            }
            currentToken = lexer.nextToken()
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

    public boolean applyOn(KObject target) {
        KFactory bestFactory = factory;
        if (target is KObjectProxy){
            if (target.originFactory != null) {
                bestFactory = target.originFactory;
            }
        }
        ModelTraceApplicator traceApplicator = new ModelTraceApplicator(target, bestFactory);
        traceApplicator.applyTraceOnModel(this);
        //TODO implements the result
        return true;
    }

    public boolean silentlyApplyOn(KObject target) {
        KFactory bestFactory = factory;
        if (target instanceof KObjectProxy) {
            if (target.originFactory != null) {
                bestFactory = target.originFactory;
            }
        }
        ModelTraceApplicator traceApplicator = new ModelTraceApplicator(target, bestFactory);
        traceApplicator.setFireEvents(false);
        traceApplicator.applyTraceOnModel(this);
        return true;
    }

    public TraceSequence reverse() {
        Collections.reverse(traces);
        return this;
    }

}