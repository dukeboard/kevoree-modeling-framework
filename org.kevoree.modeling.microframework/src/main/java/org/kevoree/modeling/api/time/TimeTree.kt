package org.kevoree.modeling.api.time

/**
 * Created by duke on 8/1/14.
 */

trait TimeTree {

    fun walk(walker : TimeWalker)
    fun walkAsc(walker : TimeWalker)
    fun walkDesc(walker : TimeWalker)
    fun walkRangeAsc(walker : TimeWalker, from : Long, to : Long)
    fun walkRangeDesc(walker : TimeWalker, from : Long, to : Long)

    fun first() : Long?
    fun last() : Long?
    fun next(from : Long) : Long?
    fun previous(from : Long) : Long?

    //TODO nextGeneration
}