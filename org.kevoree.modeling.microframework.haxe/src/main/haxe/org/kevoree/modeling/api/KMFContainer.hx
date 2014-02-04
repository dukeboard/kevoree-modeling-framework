package org.kevoree.modeling.api;

import org.kevoree.modeling.api.util.ActionType;
import org.kevoree.modeling.api.events.ModelElementListener;

@:keep
interface KMFContainer {
    function setRecursiveReadOnly():Void;
    function eContainer():KMFContainer;
    function isReadOnly():Bool;
    function isRecursiveReadOnly():Bool;
    function setInternalReadOnly():Void;
    function delete():Void;
    function modelEquals(similarObj:KMFContainer):Bool;
    function deepModelEquals(similarObj:KMFContainer):Bool;
    function getRefInParent():String;
    function findByPath(query:String):KMFContainer;
    function findByID(relationName:String, idP:String):KMFContainer;
    function path():String;
    function metaClassName():String;
    function reflexiveMutator(mutatorType:ActionType, refName:String, value:Dynamic, setOpposite:Bool, fireEvent:Bool):Void;
    function selectByQuery(query:String):List<Dynamic>;
    function addModelElementListener(lst:ModelElementListener):Void;
    function removeModelElementListener(lst:ModelElementListener ):Void;
    function removeAllModelElementListeners():Void;
    function addModelTreeListener(lst:ModelElementListener):Void;
    function removeModelTreeListener(lst:ModelElementListener):Void;
    function removeAllModelTreeListeners():Void;

    function visit(visitor:org.kevoree.modeling.api.util.ModelVisitor, recursive:Bool, containedReference:Bool, nonContainedReference:Bool):Void;
    function visitAttributes(visitor:org.kevoree.modeling.api.util.ModelAttributeVisitor):Void;

    function createTraces(similarObj:org.kevoree.modeling.api.KMFContainer, isInter:Bool, isMerge:Bool, onlyReferences:Bool, onlyAttributes:Bool):List<org.kevoree.modeling.api.trace.ModelTrace>;
    function toTraces(attributes:Bool, references:Bool):List<org.kevoree.modeling.api.trace.ModelTrace>;

}