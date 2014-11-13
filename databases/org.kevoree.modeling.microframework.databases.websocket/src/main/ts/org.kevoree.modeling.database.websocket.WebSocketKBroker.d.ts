/// <reference path="java.d.ts" />
/// <reference path="org.kevoree.modeling.microframework.typescript.d.ts" />
declare module org {
    module kevoree {
        module modeling {
            module database {
                module websocket {
                    class WebSocketKBroker implements api.event.KEventBroker {
                        private _baseBroker;
                        private storedEvents;
                        private clientConnection;
                        constructor(baseBroker: any, connectionUri: any);
                        registerListener(origin: any, listener: (p: api.KEvent) => void): void;
                        notify(event: any): void;
                        notifyOnly(event: any): void;
                        flush(dimensionKey: any): void;
                    }
                    class WebSocketDataBase implements api.data.KDataBase {
                        private clientConnection;
                        private afterConnectionCallback;
                        private connectionUri;
                        private getCallbacks;
                        private putCallbacks;
                        private removeCallbacks;
                        private commitCallbacks;
                        constructor(connectionUri: any);
                        setAfterConnection(callback: () => void): void;
                        connect(): void;
                        get(keys: string[], callback: (p1: string[], p2: java.lang.Throwable) => void): void;
                        put(payloads: string[][], error: (p1: java.lang.Throwable) => void): void;
                        remove(keys: string[], error: (p1: java.lang.Throwable) => void): void;
                        commit(error: (p1: java.lang.Throwable) => void): void;
                        close(error: (p1: java.lang.Throwable) => void): void;
                    }
                }
            }
        }
    }
}
