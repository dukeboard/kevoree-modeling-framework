package org.kevoree.modeling.api;

@:keep
interface KMFFactory {
    function create(metaClassName:String):KMFContainer;
}
