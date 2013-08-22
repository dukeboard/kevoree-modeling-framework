
package org.kevoree.modeling.api.compare

import java.util.HashMap
import java.util.ArrayList
import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.trace.TraceSequence
import org.kevoree.modeling.api.trace.ModelTrace

/**
 * Created by duke on 26/07/13.
 */

trait ModelCompare {

 fun diff(origin: KMFContainer, target: KMFContainer): TraceSequence

 fun inter(origin: KMFContainer, target: KMFContainer): TraceSequence

 fun merge(origin: KMFContainer, target: KMFContainer) : TraceSequence

 fun createSequence() : TraceSequence

}
