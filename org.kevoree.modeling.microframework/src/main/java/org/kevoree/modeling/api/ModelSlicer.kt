package org.kevoree.modeling.api

import org.kevoree.modeling.api.trace.TraceSequence;

/**
 * Created by duke on 9/30/14.
 */

public trait ModelSlicer {

    public fun slice(elems: List<KObject<*>>, callback: Callback<TraceSequence>);

}