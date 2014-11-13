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
                            var dimEvents : java.util.ArrayList<org.kevoree.modeling.api.KEvent> = this.storedEvents.get(event.dimension());
                            if(dimEvents == null) {
                                dimEvents = new java.util.ArrayList<org.kevoree.modeling.api.KEvent>();
                                this.storedEvents.put(event.dimension(), dimEvents);
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
                                this.clientConnection.send(JSON.stringify(jsonMessage));
                            }
                        }
                    }



                    export class WebSocketDataBase implements org.kevoree.modeling.api.data.KDataBase {

                        private clientConnection : WebSocket;
                        private afterConnectionCallback : () => void;
                        private connectionUri : string;
                        private getCallbacks : java.util.ArrayList<(p1:string[], p2:java.lang.Throwable) => void> = new java.util.ArrayList<(p1:string[], p2:java.lang.Throwable) => void>();
                        private putCallbacks : java.util.ArrayList<(p1:java.lang.Throwable) => void> = new java.util.ArrayList<(p1:java.lang.Throwable) => void>();
                        private removeCallbacks : java.util.ArrayList<(p1:java.lang.Throwable) => void> = new java.util.ArrayList<(p1:java.lang.Throwable) => void>();
                        private commitCallbacks : java.util.ArrayList<(p1:java.lang.Throwable) => void> = new java.util.ArrayList<(p1:java.lang.Throwable) => void>();

                        constructor(connectionUri) {
                            this.connectionUri = connectionUri;
                        }

                        public setAfterConnection(callback:()=>void) {
                            this.afterConnectionCallback = callback;
                        }

                        public connect() : void {
                            this.clientConnection = new WebSocket(this.connectionUri);
                            this.clientConnection.onmessage = (message : MessageEvent) => {
                                console.log("MessageReceived:", message);
                                var json = JSON.parse(message.data);
                                if(json.action == "get") {
                                    var getCallback = this.getCallbacks.poll();
                                    if(json.status == "success") {
                                        getCallback(json.value, null);
                                    } else if(json.status == "error") {
                                        getCallback(null, new java.lang.Exception(json.value));
                                    } else {
                                        console.error("WebSocketDatabase: Status '"+json.action+"' of not supported yet." )
                                    }
                                } else if(json.action == "put") {
                                    var putCallback = this.putCallbacks.poll();
                                    if(json.status == "success") {
                                        putCallback(null);
                                    } else if(json.status == "error") {
                                        putCallback(new java.lang.Exception(json.value));
                                    } else {
                                        console.error("WebSocketDatabase: Status '"+json.action+"' of not supported yet." )
                                    }
                                } else {
                                    console.error("WebSocketDatabase: Frame of type'" + json.action + "' not supported yet.")
                                }
                            };
                            this.clientConnection.onerror = function(error){console.error(error);};
                            this.clientConnection.onclose = function(error){console.error(error);};
                            this.clientConnection.onopen = () => {
                                if (this.afterConnectionCallback != null) {
                                    this.afterConnectionCallback();
                                }
                            };
                        }

                        public get(keys:string[], callback:(p1:string[], p2:java.lang.Throwable) => void) : void {
                            var value = [];
                            for(var i = 0; i < keys.length; i++) {
                                value.push(keys[i]);
                            }
                            var jsonMessage = {"action":"get", "value":value};
                            this.getCallbacks.add(callback);
                            var stringified = JSON.stringify(jsonMessage);
                            console.log("Sending Request:", stringified);
                            this.clientConnection.send(stringified);
                        }

                        public put(payloads:string[][], error:(p1:java.lang.Throwable) => void) : void {
                            var payloadList = [];
                            for(var i = 0; i < payloads.length; i++) {
                                var keyValue = [];
                                keyValue[0] = payloads[i][0];
                                keyValue[1] = payloads[i][1];
                                payloadList.push(keyValue);
                            }
                            var jsonMessage = {"action":"put", "value":payloadList};
                            this.putCallbacks.add(error);
                            var stringified = JSON.stringify(jsonMessage);
                            console.log("Sending Request:", stringified);
                            this.clientConnection.send(stringified);
                        }

                        public remove(keys:string[], error:(p1:java.lang.Throwable) => void) : void {

                        }

                        public commit(error:(p1:java.lang.Throwable) => void) : void {

                        }

                        public close(error:(p1:java.lang.Throwable) => void) : void {

                        }
                    }
                }
            }
        }
    }
}