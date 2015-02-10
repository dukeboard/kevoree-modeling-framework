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
                    var WebSocketBrokerClient = (function () {
                        function WebSocketBrokerClient(connectionUri) {
                            this.storedEvents = new java.util.HashMap();
                            this._baseBroker = new org.kevoree.modeling.api.event.DefaultKBroker();
                            this._connectionUri = connectionUri;
                        }
                        WebSocketBrokerClient.prototype.setKStore = function (st) {
                            this._store = st;
                        };
                        WebSocketBrokerClient.prototype.connect = function (callback) {
                            var _this = this;
                            this.clientConnection = new WebSocket(this._connectionUri);
                            this.clientConnection.onmessage = function (message) {
                                var json = JSON.parse(message.data);
                                for (var i = 0; i < json.events.length; i++) {
                                    var kEvent = org.kevoree.modeling.api.event.DefaultKEvent.fromJSON(json.events[i], _this._metaModel);
                                    if (kEvent.actionType() == org.kevoree.modeling.api.KActionType.CALL || kEvent.actionType() == org.kevoree.modeling.api.KActionType.CALL_RESPONSE) {
                                        _this._store.operationManager().operationEventReceived(kEvent);
                                    }
                                    else {
                                        _this.notifyOnly(kEvent);
                                    }
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
                            var dimEvents = this.storedEvents.get(event.universe());
                            if (dimEvents == null) {
                                dimEvents = new java.util.ArrayList();
                                this.storedEvents.put(event.universe(), dimEvents);
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
                        WebSocketBrokerClient.prototype.sendOperationEvent = function (operationEvent) {
                            var serializedEventList = [];
                            serializedEventList.push(operationEvent.toJSON());
                            var jsonMessage = { "events": serializedEventList };
                            this.clientConnection.send(JSON.stringify(jsonMessage));
                        };
                        return WebSocketBrokerClient;
                    })();
                    websocket.WebSocketBrokerClient = WebSocketBrokerClient;
                    var WebSocketDataBaseClient = (function () {
                        function WebSocketDataBaseClient(connectionUri) {
                            this.callbackId = 0;
                            this.getCallbacks = new java.util.HashMap();
                            this.putCallbacks = new java.util.HashMap();
                            this.removeCallbacks = new java.util.HashMap();
                            this.commitCallbacks = new java.util.HashMap();
                            this.connectionUri = connectionUri;
                        }
                        WebSocketDataBaseClient.prototype.connect = function (callback) {
                            var _this = this;
                            this.clientConnection = new WebSocket(this.connectionUri);
                            this.clientConnection.onmessage = function (message) {
                                var json = JSON.parse(message.data);
                                if (json.action == "get") {
                                    var getCallback = _this.getCallbacks.get(json.id);
                                    if (getCallback !== undefined && getCallback != null) {
                                        if (json.status == "success") {
                                            getCallback(json.value, null);
                                        }
                                        else if (json.status == "error") {
                                            getCallback(null, new java.lang.Exception(json.value));
                                        }
                                        else {
                                            console.error("WebSocketDatabase: Status '" + json.action + "' of not supported yet.");
                                        }
                                    }
                                    else {
                                        console.error("No callback registered for message:", json);
                                    }
                                }
                                else if (json.action == "put") {
                                    var putCallback = _this.putCallbacks.get(json.id);
                                    if (putCallback !== undefined && putCallback != null) {
                                        if (json.status == "success") {
                                            putCallback(null);
                                        }
                                        else if (json.status == "error") {
                                            putCallback(new java.lang.Exception(json.value));
                                        }
                                        else {
                                            console.error("WebSocketDatabase: Status '" + json.action + "' of not supported yet.");
                                        }
                                    }
                                    else {
                                        console.error("No callback registered for message:", json);
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
                        WebSocketDataBaseClient.prototype.getCallbackId = function () {
                            if (this.callbackId == 1000) {
                                this.callbackId = 0;
                            }
                            else {
                                this.callbackId = this.callbackId + 1;
                            }
                            return this.callbackId;
                        };
                        WebSocketDataBaseClient.prototype.get = function (keys, callback) {
                            var value = [];
                            for (var i = 0; i < keys.length; i++) {
                                value.push(keys[i]);
                            }
                            var jsonMessage = { "action": "get", "value": value, "id": this.getCallbackId() };
                            this.getCallbacks.put(jsonMessage.id, callback);
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
                            var jsonMessage = { "action": "put", "value": payloadList, "id": this.getCallbackId() };
                            this.putCallbacks.put(jsonMessage.id, error);
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
                })(websocket = database.websocket || (database.websocket = {}));
            })(database = modeling.database || (modeling.database = {}));
        })(modeling = kevoree.modeling || (kevoree.modeling = {}));
    })(kevoree = org.kevoree || (org.kevoree = {}));
})(org || (org = {}));
