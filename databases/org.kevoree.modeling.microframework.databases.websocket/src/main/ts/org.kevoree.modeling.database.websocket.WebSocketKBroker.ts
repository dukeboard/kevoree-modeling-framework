///<reference path='java.d.ts'/>
///<reference path='org.kevoree.modeling.microframework.typescript.d.ts'/>

module org {
    export module kevoree {
        export module modeling {
            export module database {
                export module websocket {
                    export class WebSocketKBroker implements org.kevoree.modeling.api.event.KEventBroker {

                        private  _baseBroker;
                        private storedEvents = new java.util.HashMap<java.lang.Long, java.util.ArrayList<org.kevoree.modeling.api.KEvent>>();

                        private clientConnection : WebSocket;
                        constructor(baseBroker, connectionUri) {
                            this._baseBroker = baseBroker;
                            this.clientConnection = new WebSocket(connectionUri);
                            this.clientConnection.onmessage = (message : MessageEvent) => {
                                var json = JSON.parse(message.data);
                                for(var i = 0; i < json.events.length; i++) {
                                    var kEvent = org.kevoree.modeling.api.event.DefaultKEvent.fromJSON(json.events[i]);
                                    this.notifyOnly(kEvent);
                                }
                            };
                        }

                        public registerListener(origin: any, listener: (p : org.kevoree.modeling.api.KEvent) => void): void {
                            this._baseBroker.registerListener(origin, listener);
                        }

                        public  notify( event) : void {
                            this._baseBroker.notify(event);
                            var dimEvents : java.util.ArrayList<org.kevoree.modeling.api.KEvent> = this.storedEvents.get(event.getSourceDimension());
                            if(dimEvents == null) {
                                dimEvents = new java.util.ArrayList<org.kevoree.modeling.api.KEvent>();
                                this.storedEvents.put(event.getSourceDimension(), dimEvents);
                            }
                            dimEvents.add(event);
                        }

                        public notifyOnly(event) {
                            this._baseBroker.notify(event);
                        }

                        public flush(dimensionKey) {
                            var eventList:java.util.ArrayList<org.kevoree.modeling.api.KEvent> = this.storedEvents.remove(dimensionKey);
                            if(eventList != null) {
                                var serializedEventList = [];
                                for(var i = 0; i < eventList.size(); i++) {
                                    serializedEventList.push(eventList.get(i).toJSON());
                                }
                                var jsonMessage = {"dimKey":dimensionKey, "events": serializedEventList};
                                var message = jsonMessage.toString();
                                this.clientConnection.send(message);
                            }
                        }
                    }
                }
            }
        }
    }
}