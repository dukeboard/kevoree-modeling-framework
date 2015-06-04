
///<reference path='java.d.ts'/>
///<reference path='org.kevoree.modeling.microframework.typescript.d.ts'/>

module org {
    export module kevoree {
        export module modeling {
            export module database {
                export module websocket {
                    export class WebSocketClient implements org.kevoree.modeling.memory.KContentDeliveryDriver {

                        private _callbackId = 0;
                        private _reconnectionDelay = 3000;
                        private _clientConnection:WebSocket;
                        private _connectionUri:string;
                        private _manager:org.kevoree.modeling.memory.KMemoryManager;
                        private _localEventListeners = new org.kevoree.modeling.util.LocalEventListeners();

                        private _getCallbacks:java.util.HashMap<number, (p1:string[], p2:java.lang.Throwable) => void> = new java.util.HashMap<number, (p1:string[], p2:java.lang.Throwable) => void>();
                        private _putCallbacks:java.util.HashMap<number, (p:java.lang.Throwable) => void> = new java.util.HashMap<number, (p1:java.lang.Throwable) => void>();
                        private _atomicGetCallbacks:java.util.HashMap<number, (p:any, p1:java.lang.Throwable) => void> = new java.util.HashMap<number, (p:any, p1:java.lang.Throwable) => void>();

                        constructor(connectionUri) {
                            this._connectionUri = connectionUri;
                        }

                        public connect(callback:(p:java.lang.Throwable) => void):void {
                            var self = this;
                            this._clientConnection = new WebSocket(this._connectionUri);
                            this._clientConnection.onmessage = (message) => {
                                var msg = org.kevoree.modeling.msg.KMessageLoader.load(message.data);
                                switch (msg.type()) {
                                    case org.kevoree.modeling.msg.KMessageLoader.GET_RES_TYPE:
                                    {
                                        var getResult = <org.kevoree.modeling.msg.KGetResult>msg;
                                        this._getCallbacks.remove(getResult.id)(getResult.values, null);
                                    }
                                        break;
                                    case org.kevoree.modeling.msg.KMessageLoader.PUT_RES_TYPE:
                                    {
                                        var putResult = <org.kevoree.modeling.msg.KPutResult>msg;
                                        this._putCallbacks.remove(putResult.id)(null);
                                    }
                                        break;
                                    case org.kevoree.modeling.msg.KMessageLoader.ATOMIC_GET_INC_RESULT_TYPE:
                                    {
                                        var atomicGetResult = <org.kevoree.modeling.msg.KAtomicGetIncrementResult>msg;
                                        this._atomicGetCallbacks.remove(atomicGetResult.id)(atomicGetResult.value, null);
                                    }
                                        break;
                                    case org.kevoree.modeling.msg.KMessageLoader.OPERATION_CALL_TYPE:
                                    case org.kevoree.modeling.msg.KMessageLoader.OPERATION_RESULT_TYPE:
                                    {
                                        this._manager.operationManager().operationEventReceived(<org.kevoree.modeling.msg.KMessage>msg);
                                    }
                                        break;
                                    case org.kevoree.modeling.msg.KMessageLoader.EVENTS_TYPE:
                                    {
                                        var eventsMsg = <org.kevoree.modeling.msg.KEvents>msg;
                                        this._manager.reload(eventsMsg.allKeys(), (function (error) {
                                            if (error != null) {
                                                error.printStackTrace();
                                            } else {
                                                this._localEventListeners.dispatch(eventsMsg);
                                            }
                                        }).bind(this));
                                    }
                                        break;
                                    default:
                                    {
                                        console.log("MessageType not supported:" + msg.type())
                                    }
                                }
                            };
                            this._clientConnection.onerror = function (error) {
                                //console.log(error);
                            };
                            this._clientConnection.onclose = function (error) {
                                console.log("Try reconnection in " + self._reconnectionDelay + " milliseconds.");
                                //try to reconnect
                                setTimeout(function () {
                                    self.connect(null)
                                }, self._reconnectionDelay);
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
                            if (this._callbackId == 1000000) {
                                this._callbackId = 0;
                            } else {
                                this._callbackId = this._callbackId + 1;
                            }
                            return this._callbackId;
                        }

                        public put(request:org.kevoree.modeling.memory.cdn.KContentPutRequest, error:(p:java.lang.Throwable) => void):void {
                            var putRequest = new org.kevoree.modeling.msg.KPutRequest();
                            putRequest.id = this.nextKey();
                            putRequest.request = request;
                            this._putCallbacks.put(putRequest.id, error);
                            this._clientConnection.send(putRequest.json());
                        }

                        public get(keys:org.kevoree.modeling.memory.KContentKey[], callback:(p:string[], p1:java.lang.Throwable) => void):void {
                            var getRequest = new org.kevoree.modeling.msg.KGetRequest();
                            getRequest.id = this.nextKey();
                            getRequest.keys = keys;
                            this._getCallbacks.put(getRequest.id, callback);
                            this._clientConnection.send(getRequest.json());
                        }

                        public atomicGetIncrement(key:org.kevoree.modeling.memory.KContentKey, callback:(p:number, p1:java.lang.Throwable) => void):void {
                            var atomicGetRequest = new org.kevoree.modeling.msg.KAtomicGetIncrementRequest();
                            atomicGetRequest.id = this.nextKey();
                            atomicGetRequest.key = key;
                            this._atomicGetCallbacks.put(atomicGetRequest.id, callback);
                            this._clientConnection.send(atomicGetRequest.json());
                        }

                        public remove(keys:string[], error:(p:java.lang.Throwable) => void):void {
                            console.error("Not implemented yet");
                        }

                        public registerListener(groupId:number, origin:org.kevoree.modeling.KObject, listener:(p:org.kevoree.modeling.KObject, p1:org.kevoree.modeling.meta.Meta[]) => void):void {
                            this._localEventListeners.registerListener(groupId, origin, listener);
                        }

                        public registerMultiListener(groupId:number, origin:org.kevoree.modeling.KUniverse<any,any,any>, objects:number[], listener:(objs:org.kevoree.modeling.KObject[])=>void) {
                            this._localEventListeners.registerListenerAll(groupId, origin.key(), objects, listener);
                        }

                        public unregisterGroup(groupId:number) {
                            this._localEventListeners.unregister(groupId);
                        }

                        public setManager(manager:org.kevoree.modeling.memory.KMemoryManager):void {
                            this._manager = manager;
                            this._localEventListeners.setManager(manager);
                        }

                        public send(msg:org.kevoree.modeling.msg.KMessage):void {
                            //Send to remote
                            this._localEventListeners.dispatch(msg);
                            this._clientConnection.send(msg.json());
                        }
                    }
                }
            }
        }
    }
}