package org.kevoree.modeling.api.trace;

@:keep
interface ModelTrace {
    function getSrcPath():String;
    function getRefName():String;
    function toString():String;
}