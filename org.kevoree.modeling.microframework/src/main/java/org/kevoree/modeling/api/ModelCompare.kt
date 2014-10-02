package org.kevoree.modeling.api

import org.kevoree.modeling.api.trace.TraceSequence

/**
 * Created by duke on 9/30/14.
 */

public trait ModelCompare {

    public fun diff(origin: KObject<*>, target: KObject<*>, callback: Callback<TraceSequence>)

    public fun merge(origin: KObject<*>, target: KObject<*>, callback: Callback<TraceSequence>)

    public fun inter(origin: KObject<*>, target: KObject<*>, callback: Callback<TraceSequence>)

}