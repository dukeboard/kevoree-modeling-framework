package org.kevoree.modeling.api.util

import org.kevoree.modeling.api.events.ModelElementListener
import org.kevoree.modeling.api.events.ModelEvent
import org.kevoree.modeling.api.compare.ModelCompare
import org.kevoree.modeling.api.trace.Event2Trace
import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.trace.TraceSequence

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 18/10/13
 * Time: 20:24
 */

public class ModelTracker(val compare: ModelCompare) : ModelElementListener {

    val convertor = Event2Trace(compare)
    var currentModel: KMFContainer? = null

    var invertedTraceSequence: TraceSequence? = null
    var traceSequence: TraceSequence? = null

    var activated = true

    override fun elementChanged(evt: ModelEvent) {
        if(activated){
            traceSequence!!.append(convertor.convert(evt))
            invertedTraceSequence!!.append(convertor.inverse(evt))
        }
    }

    fun track(model: KMFContainer) {
        currentModel = model
        currentModel!!.addModelTreeListener(this)
        traceSequence = TraceSequence(compare.factory)
        invertedTraceSequence = TraceSequence(compare.factory)
    }

    fun untrack() {
        currentModel?.removeModelTreeListener(this)
    }

    fun redo() {
        if(currentModel != null && traceSequence != null){
            activated = false
            try {
                traceSequence!!.applyOn(currentModel!!)
            } finally {
                activated = true
            }
        }
    }

    fun undo() {
        if(currentModel != null && invertedTraceSequence != null){
            activated = false
            invertedTraceSequence!!.reverse()
            try {
                invertedTraceSequence!!.applyOn(currentModel!!)
            } finally {
                invertedTraceSequence!!.reverse()
                activated = true
            }
        }
    }

    fun reset() {
        traceSequence = TraceSequence(compare.factory)
        invertedTraceSequence = TraceSequence(compare.factory)
    }

}
