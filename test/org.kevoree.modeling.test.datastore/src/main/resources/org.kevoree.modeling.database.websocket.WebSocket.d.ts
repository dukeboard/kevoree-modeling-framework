/// <reference path="../js/java.d.ts" />
/// <reference path="../js/org.kevoree.modeling.microframework.typescript.d.ts" />
declare module org {
    module kevoree {
        module modeling {
            module database {
                module websocket {
                    class WebSocketClient implements org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver {
                        private _callbackId;
                        private _reconnectionDelay;
                        private _clientConnection;
                        private _connectionUri;
                        private _manager;
                        private _localEventListeners;
                        private _getCallbacks;
                        private _putCallbacks;
                        private _atomicGetCallbacks;
                        constructor(connectionUri: any);
                        connect(callback: (p: java.lang.Throwable) => void): void;
                        close(callback: (p: java.lang.Throwable) => void): void;
                        private nextKey();
                        put(request: org.kevoree.modeling.api.data.cdn.KContentPutRequest, error: (p: java.lang.Throwable) => void): void;
                        get(keys: org.kevoree.modeling.api.data.cache.KContentKey[], callback: (p: string[], p1: java.lang.Throwable) => void): void;
                        atomicGetMutate(key: org.kevoree.modeling.api.data.cache.KContentKey, operation: org.kevoree.modeling.api.data.cdn.AtomicOperation, callback: (p: string, p1: java.lang.Throwable) => void): void;
                        remove(keys: string[], error: (p: java.lang.Throwable) => void): void;
                        registerListener(groupId: number, origin: org.kevoree.modeling.api.KObject, listener: (p: org.kevoree.modeling.api.KObject, p1: org.kevoree.modeling.api.meta.Meta[]) => void): void;
                        registerMultiListener(groupId: number, origin: org.kevoree.modeling.api.KUniverse<any, any, any>, objects: number[], listener: (objs: org.kevoree.modeling.api.KObject[]) => void): void;
                        unregisterGroup(groupId: number): void;
                        setManager(manager: org.kevoree.modeling.api.data.manager.KDataManager): void;
                        send(msg: org.kevoree.modeling.api.msg.KMessage): void;
                    }
                }
            }
        }
    }
}
