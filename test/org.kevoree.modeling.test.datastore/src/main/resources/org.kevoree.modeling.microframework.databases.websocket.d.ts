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
                        constructor(connectionUri: string);
                        public connect(callback: (p: java.lang.Throwable) => void): void;
                        public close(callback: (p: java.lang.Throwable) => void): void;
                        public setMetaModel(metaModel: api.meta.MetaModel): void;
                        public registerListener(origin: any, listener: (p: api.KEvent) => void, scope: any): void;
                        public unregister(listener: (p: api.KEvent) => void): void;
                        public notify(event: any): void;
                        public notifyOnly(event: any): void;
                        public flush(dimensionKey: any): void;
                    }
                    class WebSocketDataBaseClient implements api.data.KDataBase {
                        private clientConnection;
                        private connectionUri;
                        private getCallbacks;
                        private putCallbacks;
                        private removeCallbacks;
                        private commitCallbacks;
                        constructor(connectionUri: any);
                        public connect(callback: (p: java.lang.Throwable) => void): void;
                        public close(callback: (p: java.lang.Throwable) => void): void;
                        public get(keys: string[], callback: (p1: string[], p2: java.lang.Throwable) => void): void;
                        public put(payloads: string[][], error: (p1: java.lang.Throwable) => void): void;
                        public remove(keys: string[], error: (p1: java.lang.Throwable) => void): void;
                        public commit(error: (p1: java.lang.Throwable) => void): void;
                    }
                }
            }
        }
    }
}
