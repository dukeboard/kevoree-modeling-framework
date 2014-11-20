/// <reference path="../js/java.d.ts" />
/// <reference path="../js/org.kevoree.modeling.microframework.typescript.d.ts" />
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
                        public registerListener(origin: any, listener: (p: api.KEvent) => void): void;
                        public notify(event: any): void;
                        public notifyOnly(event: any): void;
                        public flush(dimensionKey: any): void;
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
                        public setAfterConnection(callback: () => void): void;
                        public connect(): void;
                        public get(keys: string[], callback: (p1: string[], p2: java.lang.Throwable) => void): void;
                        public put(payloads: string[][], error: (p1: java.lang.Throwable) => void): void;
                        public remove(keys: string[], error: (p1: java.lang.Throwable) => void): void;
                        public commit(error: (p1: java.lang.Throwable) => void): void;
                        public close(error: (p1: java.lang.Throwable) => void): void;
                    }
                }
            }
        }
    }
}
