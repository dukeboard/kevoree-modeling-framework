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
                    var WebSocketKBroker = (function () {
                        function WebSocketKBroker(baseBroker, connectionUri) {
                            var _this = this;
                            this.storedEvents = new java.util.HashMap();
                            this._baseBroker = baseBroker;
                            this.clientConnection = new WebSocket(connectionUri);
                            this.clientConnection.onmessage = function (message) {
                                var json = JSON.parse(message.data);
                                for (var i = 0; i < json.events.length; i++) {
                                    var kEvent = org.kevoree.modeling.api.event.DefaultKEvent.fromJSON(json.events[i]);
                                    _this.notifyOnly(kEvent);
                                }
                            };
                        }
                        WebSocketKBroker.prototype.registerListener = function (origin, listener) {
                            this._baseBroker.registerListener(origin, listener);
                        };
                        WebSocketKBroker.prototype.notify = function (event) {
                            this._baseBroker.notify(event);
                            var dimEvents = this.storedEvents.get(event.getSourceDimension());
                            if (dimEvents == null) {
                                dimEvents = new java.util.ArrayList();
                                this.storedEvents.put(event.getSourceDimension(), dimEvents);
                            }
                            dimEvents.add(event);
                        };
                        WebSocketKBroker.prototype.notifyOnly = function (event) {
                            this._baseBroker.notify(event);
                        };
                        WebSocketKBroker.prototype.flush = function (dimensionKey) {
                            var eventList = this.storedEvents.remove(dimensionKey);
                            if (eventList != null) {
                                var serializedEventList = [];
                                for (var i = 0; i < eventList.size(); i++) {
                                    serializedEventList.push(eventList.get(i).toJSON());
                                }
                                var jsonMessage = { "dimKey": dimensionKey, "events": serializedEventList };
                                var message = jsonMessage.toString();
                                this.clientConnection.send(message);
                            }
                        };
                        return WebSocketKBroker;
                    })();
                    websocket.WebSocketKBroker = WebSocketKBroker;
                })(websocket = database.websocket || (database.websocket = {}));
            })(database = modeling.database || (modeling.database = {}));
        })(modeling = kevoree.modeling || (kevoree.modeling = {}));
    })(kevoree = org.kevoree || (org.kevoree = {}));
})(org || (org = {}));
