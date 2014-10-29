package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.event.DefaultKEvent;

import java.util.HashMap;

/**
 * Created by duke on 10/8/14.
 */
public class EventDispatcher {

    private HashMap<ModelListener, TimedRegistration> listeners = new HashMap<ModelListener, TimedRegistration>();

    public void register(ModelListener listener, long from, long to, String pathRegex) {
        listeners.put(listener, new TimedRegistration(from, to, pathRegex));
    }

    public void unregister(ModelListener listener) {
        listeners.remove(listener);
    }

    public void dispatch(DefaultKEvent event) {
        for (ModelListener l : listeners.keySet()) {
            TimedRegistration registration = listeners.get(l);
            if (registration.covered(event)) {
                l.on(event);
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

        public boolean covered(KEvent event) {
            if (from != null) {
                if (from < event.src().now()) {
                    return false;
                }
            }
            if (to != null) {
                if (to < event.src().now()) {
                    return false;
                }
            }
            /*
            if (event.getSource() != null) {
                if (pathRegex.contains("*")) {
                    STRING regexPath = pathRegex.replace("*", ".*");
                    return event.getSource().uuid().matches(regexPath);
                } else {
                    return event.getSource().uuid().equals(pathRegex);
                }
            } else {
                return false;
            }*/

            return false;
        }

    }


}


