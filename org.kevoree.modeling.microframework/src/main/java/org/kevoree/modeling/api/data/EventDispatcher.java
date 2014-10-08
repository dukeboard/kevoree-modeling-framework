package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.events.ModelElementListener;
import org.kevoree.modeling.api.events.ModelEvent;

import java.util.HashMap;

/**
 * Created by duke on 10/8/14.
 */
public class EventDispatcher {

    private HashMap<ModelElementListener, TimedRegistration> listeners = new HashMap<ModelElementListener, TimedRegistration>();

    public void register(ModelElementListener listener, long from, long to, String pathRegex) {
        listeners.put(listener, new TimedRegistration(from, to, pathRegex));
    }

    public void unregister(ModelElementListener listener) {
        listeners.remove(listener);
    }

    public void dispatch(ModelEvent event) {
        for (ModelElementListener l : listeners.keySet()) {
            TimedRegistration registration = listeners.get(l);
            if (registration.covered(event)) {
                l.elementChanged(event);
            }
        }
    }

    public void clear() {
        listeners.clear();
    }


    private class TimedRegistration {

        private Long from;
        private Long to;
        private String pathRegex;

        private TimedRegistration(Long from, Long to, String pathRegex) {
            this.from = from;
            this.to = to;
            this.pathRegex = pathRegex;
        }

        public boolean covered(ModelEvent event) {
            if (from != null) {
                if (from < event.getSource().now()) {
                    return false;
                }
            }
            if (to != null) {
                if (to < event.getSource().now()) {
                    return false;
                }
            }
            if (event.getSource() != null) {
                if (pathRegex.contains("*")) {
                    String regexPath = pathRegex.replace("*", ".*");
                    return event.getSource().path().matches(regexPath);
                } else {
                    return event.getSource().path().equals(pathRegex);
                }
            } else {
                return false;
            }
        }

    }


}


