
package org.kevoree.modeling.api.events;

@:keep
interface ModelElementListener {
    function elementChanged(evt : ModelEvent):Void;
}
