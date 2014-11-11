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
                }
            }
        }
    }
}
