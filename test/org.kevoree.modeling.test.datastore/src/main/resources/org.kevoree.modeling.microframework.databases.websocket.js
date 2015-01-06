///<reference path='java.d.ts'/>
///<reference path='org.kevoree.modeling.microframework.typescript.d.ts'/>
var org;
(function (org) {
    (function (kevoree) {
        (function (modeling) {
            (function (database) {
                (function (websocket) {
                    var WebSocketBrokerClient = (function () {
                        function WebSocketBrokerClient(connectionUri) {
                            this.storedEvents = new java.util.HashMap();
                            this._baseBroker = new org.kevoree.modeling.api.event.DefaultKBroker();
                            this._connectionUri = connectionUri;
                        }
                        WebSocketBrokerClient.prototype.connect = function (callback) {
                            var _this = this;
                            this.clientConnection = new WebSocket(this._connectionUri);
                            this.clientConnection.onmessage = function (message) {
                                var json = JSON.parse(message.data);
                                for (var i = 0; i < json.events.length; i++) {
                                    var kEvent = org.kevoree.modeling.api.event.DefaultKEvent.fromJSON(json.events[i], _this._metaModel);
                                    _this.notifyOnly(kEvent);
                                }
                            };
                            if (callback != null) {
                                callback(null);
                            }
                        };

                        WebSocketBrokerClient.prototype.close = function (callback) {
                            var _this = this;
                            this._baseBroker.close(function (e) {
                                _this.clientConnection.close();
                                if (callback != null) {
                                    callback(e);
                                }
                            });
                        };

                        WebSocketBrokerClient.prototype.setMetaModel = function (metaModel) {
                            this._metaModel = metaModel;
                        };

                        WebSocketBrokerClient.prototype.registerListener = function (origin, listener, scope) {
                            this._baseBroker.registerListener(origin, listener, scope);
                        };

                        WebSocketBrokerClient.prototype.unregister = function (listener) {
                            this._baseBroker.unregister(listener);
                        };

                        WebSocketBrokerClient.prototype.notify = function (event) {
                            this._baseBroker.notify(event);
                            var dimEvents = this.storedEvents.get(event.dimension());
                            if (dimEvents == null) {
                                dimEvents = new java.util.ArrayList();
                                this.storedEvents.put(event.dimension(), dimEvents);
                            }
                            dimEvents.add(event);
                        };

                        WebSocketBrokerClient.prototype.notifyOnly = function (event) {
                            this._baseBroker.notify(event);
                        };

                        WebSocketBrokerClient.prototype.flush = function (dimensionKey) {
                            var eventList = this.storedEvents.remove(dimensionKey);
                            if (eventList != null) {
                                var serializedEventList = [];
                                for (var i = 0; i < eventList.size(); i++) {
                                    serializedEventList.push(eventList.get(i).toJSON());
                                }
                                var jsonMessage = { "dimKey": dimensionKey, "events": serializedEventList };
                                this.clientConnection.send(JSON.stringify(jsonMessage));
                            }
                        };
                        return WebSocketBrokerClient;
                    })();
                    websocket.WebSocketBrokerClient = WebSocketBrokerClient;

                    var WebSocketDataBaseClient = (function () {
                        function WebSocketDataBaseClient(connectionUri) {
                            this.getCallbacks = new java.util.ArrayList();
                            this.putCallbacks = new java.util.ArrayList();
                            this.removeCallbacks = new java.util.ArrayList();
                            this.commitCallbacks = new java.util.ArrayList();
                            this.connectionUri = connectionUri;
                        }
                        WebSocketDataBaseClient.prototype.connect = function (callback) {
                            var _this = this;
                            this.clientConnection = new WebSocket(this.connectionUri);
                            this.clientConnection.onmessage = function (message) {
                                var json = JSON.parse(message.data);
                                if (json.action == "get") {
                                    var getCallback = _this.getCallbacks.poll();
                                    if (json.status == "success") {
                                        getCallback(json.value, null);
                                    } else if (json.status == "error") {
                                        getCallback(null, new java.lang.Exception(json.value));
                                    } else {
                                        console.error("WebSocketDatabase: Status '" + json.action + "' of not supported yet.");
                                    }
                                } else if (json.action == "put") {
                                    var putCallback = _this.putCallbacks.poll();
                                    if (json.status == "success") {
                                        putCallback(null);
                                    } else if (json.status == "error") {
                                        putCallback(new java.lang.Exception(json.value));
                                    } else {
                                        console.error("WebSocketDatabase: Status '" + json.action + "' of not supported yet.");
                                    }
                                } else {
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
                                if (callback != null) {
                                    callback(null);
                                }
                            };
                        };

                        WebSocketDataBaseClient.prototype.close = function (callback) {
                            this.clientConnection.close();
                            if (callback != null) {
                                callback(null);
                            }
                        };

                        WebSocketDataBaseClient.prototype.get = function (keys, callback) {
                            var value = [];
                            for (var i = 0; i < keys.length; i++) {
                                value.push(keys[i]);
                            }
                            var jsonMessage = { "action": "get", "value": value };
                            this.getCallbacks.add(callback);
                            var stringified = JSON.stringify(jsonMessage);
                            this.clientConnection.send(stringified);
                        };

                        WebSocketDataBaseClient.prototype.put = function (payloads, error) {
                            var payloadList = [];
                            for (var i = 0; i < payloads.length; i++) {
                                var keyValue = [];
                                keyValue[0] = payloads[i][0];
                                keyValue[1] = payloads[i][1];
                                payloadList.push(keyValue);
                            }
                            var jsonMessage = { "action": "put", "value": payloadList };
                            this.putCallbacks.add(error);
                            var stringified = JSON.stringify(jsonMessage);
                            this.clientConnection.send(stringified);
                        };

                        WebSocketDataBaseClient.prototype.remove = function (keys, error) {
                        };

                        WebSocketDataBaseClient.prototype.commit = function (error) {
                        };
                        return WebSocketDataBaseClient;
                    })();
                    websocket.WebSocketDataBaseClient = WebSocketDataBaseClient;
                })(database.websocket || (database.websocket = {}));
                var websocket = database.websocket;
            })(modeling.database || (modeling.database = {}));
            var database = modeling.database;
        })(kevoree.modeling || (kevoree.modeling = {}));
        var modeling = kevoree.modeling;
    })(org.kevoree || (org.kevoree = {}));
    var kevoree = org.kevoree;
})(org || (org = {}));
