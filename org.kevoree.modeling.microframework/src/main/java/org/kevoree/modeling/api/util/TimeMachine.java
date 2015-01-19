package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.TraceRequest;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.trace.TraceSequence;

import java.util.ArrayList;

/**
 * Created by duke on 11/12/14.
 */
public class TimeMachine {

    private KObject _previous;

    private Callback<TraceSequence> _syncCallback;

    private Boolean _deepMonitoring;

    private ModelListener _listener = null;

    /* Set the object to monitor, additionally set the time and universe */
    public void set(KObject target) {
        if (_syncCallback != null) {
            //simply set previous
            //do check
            if (_previous == null) {
                if (_deepMonitoring) {
                    target.intersection(target, new Callback<TraceSequence>() {
                        @Override
                        public void on(TraceSequence traceSequence) {
                            if (_syncCallback != null) {
                                _syncCallback.on(traceSequence);
                            }
                        }
                    });
                } else {
                    TraceSequence sequence = new TraceSequence();
                    ArrayList<ModelTrace> traces = new ArrayList<ModelTrace>();
                    ModelTrace[] tempTraces = target.traces(TraceRequest.ATTRIBUTES_REFERENCES);
                    for (int i = 0; i < tempTraces.length; i++) {
                        traces.add(tempTraces[i]);
                    }
                    sequence.populate(traces);
                    _syncCallback.on(sequence);
                }
            } else {
                _previous.universe().model().storage().eventBroker().unregister(_listener);
                _previous.merge(target, new Callback<TraceSequence>() {
                    @Override
                    public void on(TraceSequence traceSequence) {
                        if (_syncCallback != null) {
                            _syncCallback.on(traceSequence);
                        }
                    }
                });
            }
            //init listener
            _listener = new ModelListener() {
                @Override
                public void on(KEvent evt) {
                    TraceSequence sequence = new TraceSequence();
                    ArrayList<ModelTrace> traces = new ArrayList<ModelTrace>();
                    traces.add(evt.toTrace());
                    sequence.populate(traces);
                    _syncCallback.on(sequence);
                }
            };
            target.listen(_listener);
        }
        //save as previous
        this._previous = target;
    }

    public void jumpTime(long targetTime) {
        if (_previous != null) {
            _previous.jump(targetTime, new Callback<KObject>() {
                @Override
                public void on(KObject resolved) {
                    set(resolved);
                }
            });
        }
    }

    public void jumpDimension(long targetDimension) {
        if (_previous != null) {
            _previous.universe().model().universe(targetDimension).time(_previous.now()).lookup(_previous.uuid(), new Callback<KObject>() {
                @Override
                public void on(KObject resolved) {
                    set(resolved);
                }
            });
        }
    }

    public TimeMachine init(boolean p_deepMonitoring, Callback<TraceSequence> p_callback) {
        this._syncCallback = p_callback;
        this._deepMonitoring = p_deepMonitoring;
        return this;
    }

}
