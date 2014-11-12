///<reference path='java.d.ts'/>
///<reference path='org.kevoree.modeling.microframework.typescript.d.ts'/>
var org;
(function (org) {
    var kevoree;
    (function (kevoree) {
        var modeling;
        (function (modeling) {
            var database;
            (function (database) {
                var websocket;
                (function (websocket) {
                    var WebSocketKBroker = (function () {
                        function WebSocketKBroker(baseBroker, connectionUri) {
                            var _this = this;
                            this.storedEvents = new java.util.HashMap();
                            this._baseBroker = baseBroker;
                            this.clientConnection = new WebSocket(connectionUri);
                            this.clientConnection.onmessage = function (message) {
                                var json = JSON.parse(message.data);
                                for (var i = 0; i < json.events.length; i++) {
                                    var kEvent = org.kevoree.modeling.api.event.DefaultKEvent.fromJSON(json.events[i]);
                                    _this.notifyOnly(kEvent);
                                }
                            };
                        }
                        WebSocketKBroker.prototype.registerListener = function (origin, listener) {
                            this._baseBroker.registerListener(origin, listener);
                        };
                        WebSocketKBroker.prototype.notify = function (event) {
                            this._baseBroker.notify(event);
                            var dimEvents = this.storedEvents.get(event.getSourceDimension());
                            if (dimEvents == null) {
                                dimEvents = new java.util.ArrayList();
                                this.storedEvents.put(event.getSourceDimension(), dimEvents);
                            }
                            dimEvents.add(event);
                        };
                        WebSocketKBroker.prototype.notifyOnly = function (event) {
                            this._baseBroker.notify(event);
                        };
                        WebSocketKBroker.prototype.flush = function (dimensionKey) {
                            var eventList = this.storedEvents.remove(dimensionKey);
                            if (eventList != null) {
                                var serializedEventList = [];
                                for (var i = 0; i < eventList.size(); i++) {
                                    serializedEventList.push(eventList.get(i).toJSON());
                                }
                                var jsonMessage = { "dimKey": dimensionKey, "events": serializedEventList };
                                var message = jsonMessage.toString();
                                this.clientConnection.send(message);
                            }
                        };
                        return WebSocketKBroker;
                    })();
                    websocket.WebSocketKBroker = WebSocketKBroker;
                    var WebSocketDataBase = (function () {
                        function WebSocketDataBase(connectionUri) {
                            this.getCallbacks = new java.util.ArrayList();
                            this.putCallbacks = new java.util.ArrayList();
                            this.removeCallbacks = new java.util.ArrayList();
                            this.commitCallbacks = new java.util.ArrayList();
                            this.storedEvents = new java.util.HashMap();
                            this.connectionUri = connectionUri;
                        }
                        WebSocketDataBase.prototype.setAfterConnection = function (callback) {
                            this.afterConnectionCallback = callback;
                        };
                        WebSocketDataBase.prototype.connect = function () {
                            var _this = this;
                            this.clientConnection = new WebSocket(this.connectionUri);
                            this.clientConnection.onmessage = function (message) {
                                console.log("MessageReceived:", message);
                                var json = JSON.parse(message.data);
                                if (json.action == "get") {
                                    var callback = _this.getCallbacks.poll();
                                    if (json.status == "success") {
                                        callback(json.value, null);
                                    }
                                    else if (json.status == "error") {
                                        callback(null, new java.lang.Exception(json.value));
                                    }
                                    else {
                                        console.error("WebSocketDatabase: Status '" + json.action + "' of not supported yet.");
                                    }
                                }
                                else {
                                    console.error("WebSocketDatabase: Frame of type'" + json.action + "' not supported yet.");
                                }
                            };
                            this.clientConnection.onerror = function (error) {
                                console.error(error);
                            };
                            this.clientConnection.onclose = function (error) {
                                console.error(error);
                            };
                            this.clientConnection.onopen = function () {
                                if (_this.afterConnectionCallback != null) {
                                    _this.afterConnectionCallback();
                                }
                            };
                        };
                        WebSocketDataBase.prototype.get = function (keys, callback) {
                            var value = [];
                            for (var i = 0; i < keys.length; i++) {
                                value.push(keys[i]);
                            }
                            var jsonMessage = { "action": "get", "value": value };
                            this.getCallbacks.add(callback);
                            var stringified = JSON.stringify(jsonMessage);
                            console.log("Sending Request:", stringified);
                            this.clientConnection.send(stringified);
                        };
                        WebSocketDataBase.prototype.put = function (payloads, error) {
                        };
                        WebSocketDataBase.prototype.remove = function (keys, error) {
                        };
                        WebSocketDataBase.prototype.commit = function (error) {
                        };
                        WebSocketDataBase.prototype.close = function (error) {
                        };
                        WebSocketDataBase.prototype.registerListener = function (origin, listener) {
                            this._baseBroker.registerListener(origin, listener);
                        };
                        WebSocketDataBase.prototype.notify = function (event) {
                            this._baseBroker.notify(event);
                            var dimEvents = this.storedEvents.get(event.getSourceDimension());
                            if (dimEvents == null) {
                                dimEvents = new java.util.ArrayList();
                                this.storedEvents.put(event.getSourceDimension(), dimEvents);
                            }
                            dimEvents.add(event);
                        };
                        WebSocketDataBase.prototype.notifyOnly = function (event) {
                            this._baseBroker.notify(event);
                        };
                        WebSocketDataBase.prototype.flush = function (dimensionKey) {
                            var eventList = this.storedEvents.remove(dimensionKey);
                            if (eventList != null) {
                                var serializedEventList = [];
                                for (var i = 0; i < eventList.size(); i++) {
                                    serializedEventList.push(eventList.get(i).toJSON());
                                }
                                var jsonMessage = { "dimKey": dimensionKey, "events": serializedEventList };
                                var message = jsonMessage.toString();
                                this.clientConnection.send(message);
                            }
                        };
                        return WebSocketDataBase;
                    })();
                    websocket.WebSocketDataBase = WebSocketDataBase;
                })(websocket = database.websocket || (database.websocket = {}));
            })(database = modeling.database || (modeling.database = {}));
        })(modeling = kevoree.modeling || (kevoree.modeling = {}));
    })(kevoree = org.kevoree || (org.kevoree = {}));
})(org || (org = {}));
