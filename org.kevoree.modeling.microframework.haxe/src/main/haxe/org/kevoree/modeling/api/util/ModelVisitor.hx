package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.KMFContainer;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 26/08/13
 * Time: 08:36
 */

@:keep
class ModelVisitor {

    var visitStopped : Bool = false;

    function stopVisit():Void{
        visitStopped = true;
    }

    var visitChildren : Bool = true;

    var visitReferences : Bool = true;

    function noChildrenVisit(){
        visitChildren = false;
    }

    function noReferencesVisit():Void{
        visitReferences = false;
    }

    function visit(elem : KMFContainer, refNameInParent : String, parent : KMFContainer) {

    }

    var alreadyVisited : Map<String,KMFContainer> = null;

    function beginVisitElem(elem : KMFContainer):Void{

    }

    function endVisitElem(elem : KMFContainer):Void{

    }

    function beginVisitRef(refName : String, refType : String):Void{

    }

    function endVisitRef(refName : String):Void{

    }

}