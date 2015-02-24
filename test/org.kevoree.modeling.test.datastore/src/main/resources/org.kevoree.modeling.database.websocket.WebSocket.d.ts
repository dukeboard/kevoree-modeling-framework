/// <reference path="../js/java.d.ts" />
/// <reference path="../js/org.kevoree.modeling.microframework.typescript.d.ts" />
declare module org {
    module kevoree {
        module modeling {
            module database {
                module websocket {
                    class WebSocketBrokerClient implements api.event.KEventBroker {
                        private _baseBroker;
                        private storedEvents;
                        private _connectionUri;
                        private clientConnection;
                        private _metaModel;
                        private _store;
                        constructor(connectionUri: string);
                        setKStore(st: api.data.KStore): void;
                        connect(callback: (p: java.lang.Throwable) => void): void;
                        close(callback: (p: java.lang.Throwable) => void): void;
                        setMetaModel(metaModel: api.meta.MetaModel): void;
                        registerListener(origin: any, listener: (p: api.KEvent) => void, scope: any): void;
                        unregister(listener: (p: api.KEvent) => void): void;
                        notify(event: api.KEvent): void;
                        notifyOnly(event: api.KEvent): void;
                        flush(): void;
                        sendOperationEvent(operationEvent: api.KEvent): void;
                    }
                    class WebSocketDataBaseClient implements api.data.KDataBase {
                        private callbackId;
                        private clientConnection;
                        private connectionUri;
                        private getCallbacks;
                        private putCallbacks;
                        private removeCallbacks;
                        private commitCallbacks;
                        constructor(connectionUri: any);
                        connect(callback: (p: java.lang.Throwable) => void): void;
                        close(callback: (p: java.lang.Throwable) => void): void;
                        private getCallbackId();
                        get(keys: string[], callback: (p1: string[], p2: java.lang.Throwable) => void): void;
                        put(payloads: string[][], error: (p1: java.lang.Throwable) => void): void;
                        remove(keys: string[], error: (p1: java.lang.Throwable) => void): void;
                        commit(error: (p1: java.lang.Throwable) => void): void;
                    }
                }
            }
        }
    }
}
