package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KOperation;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.event.DefaultKEvent;
import org.kevoree.modeling.api.json.JsonString;
import org.kevoree.modeling.api.json.JsonToken;
import org.kevoree.modeling.api.json.Lexer;
import org.kevoree.modeling.api.json.Type;
import org.kevoree.modeling.api.meta.MetaOperation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by gregory.nain on 28/11/14.
 */
public class DefaultOperationManager implements KOperationManager{

    private Map<Integer, Map<Integer, KOperation>> operationCallbacks = new HashMap<Integer, Map<Integer, KOperation>>();
    private KStore _store;

    private static int DIM_INDEX = 0;
    private static int TIME_INDEX = 1;
    private static int UUID_INDEX = 2;
    private static int OPERATION_INDEX = 3;
    private static int TUPLE_SIZE = 4;

    private HashMap<Long[], Callback<Object>> remoteCallCallbacks = new HashMap<Long[], Callback<Object>>();


    public DefaultOperationManager(KStore store) {
        this._store = store;
    }

    @Override
    public void registerOperation(MetaOperation operation, KOperation callback) {
        Map<Integer, KOperation> clazzOperations = operationCallbacks.get(operation.origin().index());
        if (clazzOperations == null) {
            clazzOperations = new HashMap<Integer, KOperation>();
            operationCallbacks.put(operation.origin().index(), clazzOperations);
        }
        clazzOperations.put(operation.index(), callback);
    }

    @Override
    public void call(KObject source, MetaOperation operation, Object[] param, Callback<Object> callback) {
        Map<Integer, KOperation> clazzOperations = operationCallbacks.get(source.metaClass().index());
        if (clazzOperations != null) {
            KOperation operationCore = clazzOperations.get(operation.index());
            if (operationCore != null){
                operationCore.on(source, param, callback);
            } else {
                sendToRemote(source, operation, param, callback);
            }
        } else {
            sendToRemote(source, operation, param, callback);
        }
    }

    private void sendToRemote(KObject source, MetaOperation operation, Object[] param, Callback<Object> callback) {

        Long[] tuple = new Long[TUPLE_SIZE];
        tuple[DIM_INDEX] = source.universe().key();
        tuple[TIME_INDEX] = source.now();
        tuple[UUID_INDEX] = source.uuid();
        tuple[OPERATION_INDEX] = (long)operation.index();

        remoteCallCallbacks.put(tuple, callback);

        StringBuilder sb =new StringBuilder();
        sb.append("[");
        if(param.length > 0) {
            sb.append("\"").append(protectString(param[0].toString())).append("\"");
            for(int i = 1; i < param.length; i++) {
                sb.append(",").append("\"").append(protectString(param[i].toString())).append("\"");
            }
        }
        sb.append("]");
        DefaultKEvent operationCallEvent = new DefaultKEvent(KActionType.CALL,source, operation, sb.toString());
        _store.eventBroker().sendOperationEvent(operationCallEvent);
    }

    private String protectString(String input) {
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            if (c == '{' || c == '}' || c == '[' || c == ']' || c == ',' || c == '\\' || c == '"') {
                sb.append('\\');
            }
            sb.append(c);
        }
        return sb.toString();
    }

    private Object[] parseParams (String inParams){
        ArrayList<Object> params = new ArrayList<Object>();
        StringBuilder sb = new StringBuilder();
        if(inParams.length() > 2) {
            if(inParams.charAt(0) == '[') {
                int i = 1;
                char c = inParams.charAt(i);
                boolean inParam = false;
                while(i < inParams.length() && c != ']') {
                    if (c == '\\') { //despecialize
                        i++;
                        sb.append(inParams.charAt(i));
                    } else if(c == '"') {
                        if(inParam) {
                            //END of param
                            params.add(sb.toString());
                            sb = new StringBuilder();
                        }
                        inParam = !inParam;
                    } else {
                        if(inParam) {
                            sb.append(c);
                        }
                    }
                    i++;
                    c = inParams.charAt(i);
                }
            }
        }

        return params.toArray(new Object[params.size()]);
    }

    public void operationEventReceived(KEvent operationEvent) {
        if(operationEvent.actionType() == KActionType.CALL_RESPONSE) {
            Long[][] keys = remoteCallCallbacks.keySet().toArray(new Long[remoteCallCallbacks.size()][]);
            for(int i = 0; i < keys.length; i++) {
                Long[] tuple = keys[i];
                if(tuple[DIM_INDEX].equals(operationEvent.universe())) {
                    if(tuple[TIME_INDEX].equals(operationEvent.time())) {
                        if(tuple[UUID_INDEX].equals(operationEvent.uuid())) {
                            if(tuple[OPERATION_INDEX].equals((long)operationEvent.metaElement().index())) {
                                Object[] returnParam = parseParams((String)operationEvent.value());
                                Callback<Object> cb = remoteCallCallbacks.get(tuple);
                                remoteCallCallbacks.remove(tuple);
                                cb.on(returnParam);
                            }
                        }
                    }
                }
            }
        } else if(operationEvent.actionType() == KActionType.CALL) {
            Map<Integer, KOperation> clazzOperations = operationCallbacks.get(operationEvent.metaClass().index());
            if (clazzOperations != null) {
                KOperation operationCore = clazzOperations.get(operationEvent.metaElement().index());
                if (operationCore != null){
                    KView view = _store.getModel().universe(operationEvent.universe()).time(operationEvent.time());
                    view.lookup(operationEvent.uuid(), new Callback<KObject>() {
                        public void on(KObject kObject) {
                            if(kObject != null) {
                                Object[] params = parseParams((String)operationEvent.value());
                                operationCore.on(kObject, params, new Callback<Object>() {
                                    public void on(Object o) {
                                        DefaultKEvent operationCallResponseEvent = new DefaultKEvent(KActionType.CALL_RESPONSE,kObject, operationEvent.metaElement(), "[\""+protectString(o.toString())+"\"]");
                                        _store.eventBroker().sendOperationEvent(operationCallResponseEvent);
                                    }
                                });
                            }

                        }
                    });
                }
            }
        } else {
            //Wrong routing.
        }
    }

}
