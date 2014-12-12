package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.event.ListenerScope;
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

    /* Set the object to monitor, additionally set the time and dimension */
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
                    ArrayList traces = new ArrayList();
                    ModelTrace[] tempTraces = target.traces(TraceRequest.ATTRIBUTES_REFERENCES);
                    for (int i = 0; i < tempTraces.length; i++) {
                        traces.add(tempTraces[i]);
                    }
                    sequence.populate(traces);
                    _syncCallback.on(sequence);
                }
            } else {
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
            target.listen(new ModelListener() {
                @Override
                public void on(KEvent evt) {

                }
            }, ListenerScope.TIME);

            //TODO drop listener

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
            _previous.dimension().universe().dimension(targetDimension).time(_previous.now()).lookup(_previous.uuid(), new Callback<KObject>() {
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
