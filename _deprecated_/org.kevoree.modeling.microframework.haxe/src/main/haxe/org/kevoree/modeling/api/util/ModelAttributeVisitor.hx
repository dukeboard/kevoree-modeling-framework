package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.KMFContainer;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 27/08/13
 * Time: 14:51
 */

@:keep
interface ModelAttributeVisitor {

    public function visit(value: Dynamic, name: String, parent: KMFContainer):Void;

}