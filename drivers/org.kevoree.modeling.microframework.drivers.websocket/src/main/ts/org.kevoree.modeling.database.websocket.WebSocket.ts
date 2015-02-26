///<reference path='java.d.ts'/>
///<reference path='org.kevoree.modeling.microframework.typescript.d.ts'/>

module org {
    export module kevoree {
        export module modeling {
            export module database {
                export module websocket {
                    export class WebSocketClient implements org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver {

                        private _callbackId = 0;
                        private _clientConnection:WebSocket;
                        private _connectionUri:string;
                        private _manager: org.kevoree.modeling.api.data.manager.KDataManager;
                        private _localEventListeners = new org.kevoree.modeling.api.util.LocalEventListeners();

                        private _getCallbacks:java.util.HashMap<number, (p1:string[], p2:java.lang.Throwable) => void> = new java.util.HashMap<number, (p1:string[], p2:java.lang.Throwable) => void>();
                        private _putCallbacks:java.util.HashMap<number, (p: java.lang.Throwable) => void> = new java.util.HashMap<number, (p1:java.lang.Throwable) => void>();
                        private _atomicGetCallbacks:java.util.HashMap<number, (p: string, p1: java.lang.Throwable) => void> = new java.util.HashMap<number, (p: string, p1: java.lang.Throwable) => void>();


                        private _removeCallbacks:java.util.HashMap<string, (p1:java.lang.Throwable) => void> = new java.util.HashMap<string, (p1:java.lang.Throwable) => void>();
                        private _commitCallbacks:java.util.HashMap<string, (p1:java.lang.Throwable) => void> = new java.util.HashMap<string, (p1:java.lang.Throwable) => void>();

                        constructor(connectionUri) {
                            this._connectionUri = connectionUri;
                        }

                        public connect(callback:(p:java.lang.Throwable) => void):void {
                            this._clientConnection = new WebSocket(this._connectionUri);
                            this._clientConnection.onmessage = (message) => {
                                var parsed = JSON.parse(message.data);
                                var messagesToSendLocally = [];
                                var keysToReload = [];
                                for(var i = 0; i < parsed.length; i++) {
                                    var rawMessage = parsed[i];
                                    var msg = org.kevoree.modeling.api.msg.KMessageLoader.load(JSON.stringify(rawMessage));
                                    switch (msg.type()) {
                                        case org.kevoree.modeling.api.msg.KMessageLoader.GET_RES_TYPE:{
                                            var getResult = <org.kevoree.modeling.api.msg.KGetResult>msg;
                                            this._getCallbacks.remove(getResult.id)(getResult.values, null);
                                        }break;
                                        case org.kevoree.modeling.api.msg.KMessageLoader.PUT_RES_TYPE:{
                                            var putResult = <org.kevoree.modeling.api.msg.KPutResult>msg;
                                            this._putCallbacks.remove(putResult.id)(null);
                                        }break;
                                        case org.kevoree.modeling.api.msg.KMessageLoader.ATOMIC_OPERATION_RESULT_TYPE:{
                                            var atomicGetResult = <org.kevoree.modeling.api.msg.KAtomicGetResult>msg;
                                            this._atomicGetCallbacks.remove(atomicGetResult.id)(atomicGetResult.value, null);
                                        }break;
                                        case org.kevoree.modeling.api.msg.KMessageLoader.EVENT_TYPE:{
                                            keysToReload.push((<org.kevoree.modeling.api.msg.KEventMessage>msg).key);
                                            messagesToSendLocally.push(msg);
                                        }break;
                                        default:{
                                            console.log("MessageType not supported:" + msg.type())
                                        }
                                    }
                                    if(messagesToSendLocally.length > 0) {
                                        this._manager.reload(keysToReload);
                                        this.fireLocalMessages(messagesToSendLocally);
                                    }
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
                        }

                        public close(callback:(p:java.lang.Throwable) => void):void {
                            this._clientConnection.close();
                            if (callback != null) {
                                callback(null);
                            }
                        }

                        private nextKey():number {
                            if (this._callbackId == 1000) {
                                this._callbackId = 0;
                            } else {
                                this._callbackId = this._callbackId + 1;
                            }
                            return this._callbackId;
                        }

                        public put(request: org.kevoree.modeling.api.data.cdn.KContentPutRequest, error: (p: java.lang.Throwable) => void): void {
                            var putRequest = new org.kevoree.modeling.api.msg.KPutRequest();
                            putRequest.id = this.nextKey();
                            putRequest.request = request;
                            this._putCallbacks.put(putRequest.id, error);
                            var payload = [];
                            payload.push(putRequest.json());
                            this._clientConnection.send(JSON.stringify(payload));
                        }

                        public get(keys: org.kevoree.modeling.api.data.cache.KContentKey[], callback: (p: string[], p1: java.lang.Throwable) => void): void {
                            var getRequest = new org.kevoree.modeling.api.msg.KGetRequest();
                            getRequest.id = this.nextKey();
                            getRequest.keys = keys;
                            this._getCallbacks.put(getRequest.id, callback);
                            var payload = [];
                            payload.push(getRequest.json());
                            this._clientConnection.send(JSON.stringify(payload));
                        }

                        public atomicGetMutate(key: org.kevoree.modeling.api.data.cache.KContentKey, operation: org.kevoree.modeling.api.data.cdn.AtomicOperation, callback: (p: string, p1: java.lang.Throwable) => void): void {
                            var atomicGetRequest = new org.kevoree.modeling.api.msg.KAtomicGetRequest();
                            atomicGetRequest.id = this.nextKey();
                            atomicGetRequest.key = key;
                            atomicGetRequest.operation = operation;
                            this._atomicGetCallbacks.put(atomicGetRequest.id, callback);
                            var payload = [];
                            payload.push(atomicGetRequest.json());
                            this._clientConnection.send(JSON.stringify(payload));
                        }

                        public remove(keys: string[], error: (p: java.lang.Throwable) => void): void {
                            console.error("Not implemented yet");
                        }


                        public registerListener(origin: any, listener: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.meta.Meta[]) => void, scope: any): void{
                            this._localEventListeners.registerListener(origin, listener, scope);
                        }
                        public unregister(listener: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.meta.Meta[]) => void): void {
                            this._localEventListeners.unregister(listener);
                        }

                        public setManager(manager: org.kevoree.modeling.api.data.manager.KDataManager): void {
                            this._manager = manager;
                        }

                        public send(msgs: org.kevoree.modeling.api.msg.KEventMessage[]): void {

                            this.fireLocalMessages(msgs);

                            //Send to remote
                            var payload = [];
                            for(var i = 0; i < msgs.length; i++) {
                                payload.push(msgs[i].json());
                            }
                            this._clientConnection.send(JSON.stringify(payload));
                        }

                        private fireLocalMessages(msgs : org.kevoree.modeling.api.msg.KEventMessage[]) {
                            var _previousKey : org.kevoree.modeling.api.data.cache.KContentKey = null;
                            var _currentView : org.kevoree.modeling.api.KView = null;
                            var self = this;
                            for(var i = 0; i < msgs.length; i++) {
                                var sourceKey = msgs[i].key;
                                if(_previousKey == null || sourceKey.part1() != _previousKey.part1() || sourceKey.part2() != _previousKey.part2()) {
                                    _currentView = this._manager.model().universe(sourceKey.part1()).time(sourceKey.part2());
                                    _previousKey = sourceKey;
                                }
                                var tempIndex = i;
                                _currentView.lookup(sourceKey.part3()).then(function(kObject) {
                                    if (kObject != null) {
                                        var modifiedMetas  = [];
                                        for(var j = 0; j < msgs[tempIndex].meta.length; j++) {
                                            modifiedMetas.push(kObject.metaClass().meta(msgs[tempIndex].meta[j]));
                                        }
                                        self._localEventListeners.dispatch(kObject, modifiedMetas);
                                    }
                                });
                            }
                        }
                    }
                }
            }
        }
    }
}