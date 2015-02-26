/// <reference path="../js/java.d.ts" />
/// <reference path="../js/org.kevoree.modeling.microframework.typescript.d.ts" />
declare module org {
    module kevoree {
        module modeling {
            module database {
                module websocket {
                    class WebSocketClient implements api.data.cdn.KContentDeliveryDriver {
                        private _callbackId;
                        private _clientConnection;
                        private _connectionUri;
                        private _manager;
                        private _localEventListeners;
                        private _getCallbacks;
                        private _putCallbacks;
                        private _atomicGetCallbacks;
                        private _removeCallbacks;
                        private _commitCallbacks;
                        constructor(connectionUri: any);
                        connect(callback: (p: java.lang.Throwable) => void): void;
                        close(callback: (p: java.lang.Throwable) => void): void;
                        private nextKey();
                        put(request: api.data.cdn.KContentPutRequest, error: (p: java.lang.Throwable) => void): void;
                        get(keys: api.data.cache.KContentKey[], callback: (p: string[], p1: java.lang.Throwable) => void): void;
                        atomicGetMutate(key: api.data.cache.KContentKey, operation: api.data.cdn.AtomicOperation, callback: (p: string, p1: java.lang.Throwable) => void): void;
                        remove(keys: string[], error: (p: java.lang.Throwable) => void): void;
                        registerListener(origin: any, listener: (p: api.KObject, p1: api.meta.Meta[]) => void, scope: any): void;
                        unregister(listener: (p: api.KObject, p1: api.meta.Meta[]) => void): void;
                        setManager(manager: api.data.manager.KDataManager): void;
                        send(msgs: api.msg.KEventMessage[]): void;
                        private fireLocalMessages(msgs);
                    }
                }
            }
        }
    }
}
