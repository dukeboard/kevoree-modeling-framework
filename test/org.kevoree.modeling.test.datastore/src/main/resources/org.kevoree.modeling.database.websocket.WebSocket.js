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
                    var WebSocketClient = (function () {
                        function WebSocketClient(connectionUri) {
                            this._callbackId = 0;
                            this._localEventListeners = new org.kevoree.modeling.api.util.LocalEventListeners();
                            this._getCallbacks = new java.util.HashMap();
                            this._putCallbacks = new java.util.HashMap();
                            this._atomicGetCallbacks = new java.util.HashMap();
                            this._removeCallbacks = new java.util.HashMap();
                            this._commitCallbacks = new java.util.HashMap();
                            this._connectionUri = connectionUri;
                        }
                        WebSocketClient.prototype.connect = function (callback) {
                            var _this = this;
                            this._clientConnection = new WebSocket(this._connectionUri);
                            this._clientConnection.onmessage = function (message) {
                                var parsed = JSON.parse(message.data);
                                var messagesToSendLocally = [];
                                var keysToReload = [];
                                for (var i = 0; i < parsed.length; i++) {
                                    var rawMessage = parsed[i];
                                    var msg = org.kevoree.modeling.api.msg.KMessageLoader.load(JSON.stringify(rawMessage));
                                    switch (msg.type()) {
                                        case org.kevoree.modeling.api.msg.KMessageLoader.GET_RES_TYPE:
                                            {
                                                var getResult = msg;
                                                _this._getCallbacks.remove(getResult.id)(getResult.values, null);
                                            }
                                            break;
                                        case org.kevoree.modeling.api.msg.KMessageLoader.PUT_RES_TYPE:
                                            {
                                                var putResult = msg;
                                                _this._putCallbacks.remove(putResult.id)(null);
                                            }
                                            break;
                                        case org.kevoree.modeling.api.msg.KMessageLoader.ATOMIC_OPERATION_RESULT_TYPE:
                                            {
                                                var atomicGetResult = msg;
                                                _this._atomicGetCallbacks.remove(atomicGetResult.id)(atomicGetResult.value, null);
                                            }
                                            break;
                                        case org.kevoree.modeling.api.msg.KMessageLoader.OPERATION_CALL_TYPE:
                                        case org.kevoree.modeling.api.msg.KMessageLoader.OPERATION_RESULT_TYPE:
                                            {
                                                _this._manager.operationManager().operationEventReceived(msg);
                                            }
                                            break;
                                        case org.kevoree.modeling.api.msg.KMessageLoader.EVENT_TYPE:
                                            {
                                                var key = msg.key;
                                                keysToReload.push(key);
                                                if (key.segment() == org.kevoree.modeling.api.data.cache.KContentKey.GLOBAL_SEGMENT_DATA_RAW) {
                                                    messagesToSendLocally.push(msg);
                                                }
                                            }
                                            break;
                                        default: {
                                            console.log("MessageType not supported:" + msg.type());
                                        }
                                    }
                                }
                                if (messagesToSendLocally.length > 0) {
                                    _this._manager.reload(keysToReload, (function (error) {
                                        if (error != null) {
                                            error.printStackTrace();
                                        }
                                        else {
                                            this._localEventListeners.dispatch(messagesToSendLocally);
                                        }
                                    }).bind(_this));
                                }
                            };
                            this._clientConnection.onerror = function (error) {
                                console.error(error);
                            };
                            this._clientConnection.onclose = function (error) {
                                console.error(error);
                            };
                            this._clientConnection.onopen = function () {
                                if (callback != null) {
                                    callback(null);
                                }
                            };
                        };
                        WebSocketClient.prototype.close = function (callback) {
                            this._clientConnection.close();
                            if (callback != null) {
                                callback(null);
                            }
                        };
                        WebSocketClient.prototype.nextKey = function () {
                            if (this._callbackId == 1000) {
                                this._callbackId = 0;
                            }
                            else {
                                this._callbackId = this._callbackId + 1;
                            }
                            return this._callbackId;
                        };
                        WebSocketClient.prototype.put = function (request, error) {
                            var putRequest = new org.kevoree.modeling.api.msg.KPutRequest();
                            putRequest.id = this.nextKey();
                            putRequest.request = request;
                            this._putCallbacks.put(putRequest.id, error);
                            var payload = [];
                            payload.push(putRequest.json());
                            this._clientConnection.send(JSON.stringify(payload));
                        };
                        WebSocketClient.prototype.get = function (keys, callback) {
                            var getRequest = new org.kevoree.modeling.api.msg.KGetRequest();
                            getRequest.id = this.nextKey();
                            getRequest.keys = keys;
                            this._getCallbacks.put(getRequest.id, callback);
                            var payload = [];
                            payload.push(getRequest.json());
                            this._clientConnection.send(JSON.stringify(payload));
                        };
                        WebSocketClient.prototype.atomicGetMutate = function (key, operation, callback) {
                            var atomicGetRequest = new org.kevoree.modeling.api.msg.KAtomicGetRequest();
                            atomicGetRequest.id = this.nextKey();
                            atomicGetRequest.key = key;
                            atomicGetRequest.operation = operation;
                            this._atomicGetCallbacks.put(atomicGetRequest.id, callback);
                            var payload = [];
                            payload.push(atomicGetRequest.json());
                            this._clientConnection.send(JSON.stringify(payload));
                        };
                        WebSocketClient.prototype.remove = function (keys, error) {
                            console.error("Not implemented yet");
                        };
                        WebSocketClient.prototype.registerListener = function (origin, listener, subTree) {
                            this._localEventListeners.registerListener(origin, listener, subTree);
                        };
                        WebSocketClient.prototype.unregister = function (origin, listener, subTree) {
                            this._localEventListeners.unregister(origin, listener, subTree);
                        };
                        WebSocketClient.prototype.setManager = function (manager) {
                            this._manager = manager;
                            this._localEventListeners.setManager(manager);
                        };
                        WebSocketClient.prototype.send = function (msgs) {
                            //Send to remote
                            var payload = [];
                            var messagesToFire = [];
                            for (var i = 0; i < msgs.length; i++) {
                                payload.push(msgs[i].json());
                                var key = msgs[i].key;
                                if (key.segment() == org.kevoree.modeling.api.data.cache.KContentKey.GLOBAL_SEGMENT_DATA_RAW) {
                                    if (msgs[i].type() != org.kevoree.modeling.api.msg.KMessageLoader.OPERATION_CALL_TYPE || msgs[i].type() != org.kevoree.modeling.api.msg.KMessageLoader.OPERATION_RESULT_TYPE) {
                                        messagesToFire.push(msgs[i]);
                                    }
                                }
                            }
                            this._localEventListeners.dispatch(messagesToFire);
                            this._clientConnection.send(JSON.stringify(payload));
                        };
                        WebSocketClient.prototype.sendOperation = function (operation) {
                            //Send to remote
                            var payload = [];
                            payload.push(operation.json());
                            this._clientConnection.send(JSON.stringify(payload));
                        };
                        return WebSocketClient;
                    })();
                    websocket.WebSocketClient = WebSocketClient;
                })(websocket = database.websocket || (database.websocket = {}));
            })(database = modeling.database || (modeling.database = {}));
        })(modeling = kevoree.modeling || (kevoree.modeling = {}));
    })(kevoree = org.kevoree || (org.kevoree = {}));
})(org || (org = {}));
